import React, { createRef } from "react";
import "antd/dist/reset.css";
// import { BuildTwoTone } from "@ant-design/icons";
import { SaveObj } from "../TechPlanBuilder/metafns";
// import { Button } from "antd";
import { Avatar, List, message, Modal } from "antd";
import { MainPage } from "../MainInterface";
import { invoke } from "@tauri-apps/api";
import {
    writeTextFile,
    writeBinaryFile,
    exists,
    BaseDirectory,
} from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { writeText } from "@tauri-apps/api/clipboard";
import Saver from "./Saver/Saver";
import * as XLSX from "xlsx";
import { CopyToClipboardModal } from "./Modals";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CopyOutlined, CopyTwoTone } from "@ant-design/icons";
import { sum } from "lodash";
import Uploader from "./UpLoader/Uploader";

interface Props {
    style?: React.CSSProperties;
    parentSpinning: (setting: boolean) => void;
    saveDataPath: () => SaveObj[] | undefined;
    uploadDataPath: (v: SaveObj[]) => void;
}

interface State {
    saveData: SaveObj[];
    ctc: {
        open: boolean;
        text: string | React.ReactNode;
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stringToArrayBuffer = (s: string) => {
    const buffer = new ArrayBuffer(s.length);
    const view = new Uint8Array(buffer);
    for (let i: number = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff;
    }
    return buffer;
};

class TechPlanSaver extends React.Component<Props, State> implements MainPage {
    save_ref: React.RefObject<Saver>;
    uploader_ref: React.RefObject<Uploader>;
    constructor(props: Props) {
        super(props);
        this.save_ref = createRef<Saver>();
        this.uploader_ref = createRef<Uploader>();
        this.state = {
            saveData: this.props.saveDataPath() ?? [],
            ctc: {
                open: false,
                text: "",
            },
        };
    }
    startView() {
        this.setAllowDrag(true);
    }
    endView() {
        this.setAllowDrag(false);
    }
    setAllowDrag(b: boolean) {
        this.uploader_ref.current?.setAllowDrag(b);
    }
    update() {
        this.setState({
            saveData: this.props.saveDataPath() ?? [],
        });
        this.save_ref.current?.update();
    }
    closeCtcModal() {
        this.setState({
            ctc: {
                open: false,
                text: "",
            },
        });
    }
    upload(s: SaveObj[]) {
        this.props.uploadDataPath(s);
        this.update();
        message.success("????????????~");
    }
    save(s: "json" | "xlsx" | "clipboard") {
        switch (s) {
            case "json":
                this.saveAsJson()
                    .then()
                    .catch((e) => {
                        message.error("???????????????~");
                        console.error(e);
                    });
                break;
            case "xlsx":
                this.saveAsXlsx()
                    .then()
                    .catch((e) => {
                        message.error("???????????????~");
                        console.error(e);
                    });
                break;
            case "clipboard":
                // message.warning("??????????????????");
                this.saveAsText().then();
                break;
        }
    }
    async saveAsText() {
        let data = this.save_ref.current?.getSelected();
        if (data === undefined) return;
        let r: SaveObj[] = [];
        for (let i = 0; i < data?.length; i++) {
            let key = data[i];
            let res = this.state.saveData.find(
                (v) => v.title.match(key) !== null
            );
            if (res === undefined) continue;
            r.push(res);
        }
        let rks = (
            <List
                itemLayout="horizontal"
                dataSource={r}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor: "white",
                                    }}
                                    icon={
                                        <CopyTwoTone
                                            onClick={() =>
                                                writeText(
                                                    `[${item.title}]  ` +
                                                        sum(
                                                            item.dataset.map(
                                                                (v, idx) => {
                                                                    return `${idx}-${v.name}`;
                                                                }
                                                            )
                                                        )
                                                )
                                                    .then(() =>
                                                        message.info(
                                                            "????????????~"
                                                        )
                                                    )
                                                    .catch((err) => {
                                                        console.error(err);
                                                        message.error(
                                                            "??????????????????"
                                                        );
                                                    })
                                            }
                                        />
                                    }
                                />
                            }
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        );
        this.setState({
            ctc: {
                open: true,
                text: rks,
            },
        });
        // this.forceUpdate();
    }
    async saveAsJson() {
        let data = this.save_ref.current?.getSelected();
        if (data === undefined) return;
        let r: SaveObj[] = [];
        for (let i = 0; i < data?.length; i++) {
            let key = data[i];
            let res = this.state.saveData.find(
                (v) => v.title.match(key) !== null
            );
            if (res === undefined) continue;
            r.push(res);
        }
        const date = new Date();
        let filename = `ProjectResult-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        if (
            await exists(filename + ".azurproj", { dir: BaseDirectory.Desktop })
        ) {
            filename += `-f${date.getUTCMilliseconds()}`;
        }
        let str = await invoke<string>("into_string", { s: { svlist: r } });
        await writeTextFile(filename + ".azurproj", str, {
            dir: BaseDirectory.Desktop,
        });
        Modal.info({
            title: "????????????",
            // content: `????????????<code>${filename}.azurproj</code>???<br>???????????????<code>${BaseDirectory.Desktop}</code>???`
            content: (
                <div>
                    <span>
                        ????????????<code>{filename}.azurproj</code>
                    </span>
                    <br />
                    <span>
                        ???????????????<code>{await desktopDir()}</code>
                    </span>
                </div>
            ),
        });
    }
    async saveAsXlsx() {
        let data = this.save_ref.current?.getSelected();
        if (data === undefined) return;
        let r: SaveObj[] = [];
        for (let i = 0; i < data?.length; i++) {
            let key = data[i];
            let res = this.state.saveData.find(
                (v) => v.title.match(key) !== null
            );
            if (res === undefined) continue;
            r.push(res);
        }
        const date = new Date();
        let filename = `ProjectResult-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        if (
            await exists(filename + ".azurproj", { dir: BaseDirectory.Desktop })
        ) {
            filename += `-f${date.getUTCMilliseconds()}`;
        }
        let tosave: { sheet: XLSX.WorkSheet; title: string }[] = r.map((v) => {
            let this_data: (string | number | null)[][] = [
                // Title & description
                ["??????", v.title, null, null],
                ["??????", v.description, null, null],
                [null, null, null, null],
                // Series information
                ["??????????????????", null, null, null],
                ["??????", "??????ID", "????????????", "????????????"],
                ...v.dataset.map((vd) => [
                    vd.index,
                    vd.id,
                    vd.select ? "???" : "???",
                    vd.name,
                ]),
                [null, null, null, null],
                // Results
                ["????????????", null, null, null],
                ["??????????????????", v.daily.time, null, null],
                ["????????????", v.daily.doubloon, null, null],
                ["????????????", v.daily.cube, null, null],
                ["??????????????????", v.daily.cogn_chip, null, null],
                ["????????????", v.daily.ssr_blp, null, null],
                [
                    "??????????????????",
                    v.daily.direct_ssr_blp / v.daily.ssr_blp,
                    null,
                    null,
                ],
                ["????????????", v.daily.ur_blp, null, null],
                [
                    "??????????????????",
                    v.daily.direct_ur_blp / v.daily.ur_blp,
                    null,
                    null,
                ],
                ["????????????", v.daily.ur_equip, null, null],
                [null, null, null, null],
                // Meta
                ["?????????", null, null, null],
                ["????????????", null, null, null],
                ["??????", "???", null, null],
                ["??????", v.meta.reference.doubloon, null, null],
                ["??????", v.meta.reference.cube, null, null],
                ["??????", v.meta.reference.ssr_blp, null, null],
                ["??????", v.meta.reference.ur_blp, null, null],
                ["??????", v.meta.reference.ur_equip, null, null],
                ["??????", v.meta.reference.cogn_chip, null, null],
                ["????????????", null, null, null],
                ["??????", "???", null, null],
                [
                    "????????????",
                    v.meta.restriction.time.value,
                    v.meta.restriction.time.strict ? "????????????" : "????????????",
                    v.meta.restriction.time.status ? "??????" : "??????",
                ],
                [
                    "??????",
                    v.meta.restriction.doubloon.value,
                    v.meta.restriction.doubloon.strict
                        ? "????????????"
                        : "????????????",
                    v.meta.restriction.doubloon.status ? "??????" : "??????",
                ],
                [
                    "??????",
                    v.meta.restriction.cube.value,
                    v.meta.restriction.cube.strict ? "????????????" : "????????????",
                    v.meta.restriction.cube.status ? "??????" : "??????",
                ],
                [
                    "??????",
                    v.meta.restriction.ssr_blp.value,
                    v.meta.restriction.ssr_blp.strict ? "????????????" : "????????????",
                    v.meta.restriction.ssr_blp.status ? "??????" : "??????",
                ],
                [
                    "??????",
                    v.meta.restriction.ur_blp.value,
                    v.meta.restriction.ur_blp.strict ? "????????????" : "????????????",
                    v.meta.restriction.ur_blp.status ? "??????" : "??????",
                ],
                [
                    "??????",
                    v.meta.restriction.ur_equip.value,
                    v.meta.restriction.ur_equip.strict
                        ? "????????????"
                        : "????????????",
                    v.meta.restriction.ur_equip.status ? "??????" : "??????",
                ],
                [
                    "??????",
                    v.meta.restriction.cogn_chip.value,
                    v.meta.restriction.cogn_chip.strict
                        ? "????????????"
                        : "????????????",
                    v.meta.restriction.cogn_chip.status ? "??????" : "??????",
                ],
                ["??????????????????", v.meta.restriction.limit, null, null],
                [
                    "3~4????????????????????????",
                    v.meta.restriction.finished_former_ship,
                    null,
                    null,
                ],
                [
                    "5?????????????????????",
                    v.meta.restriction.finished_ssr_ship,
                    null,
                    null,
                ],
                [
                    "5?????????????????????",
                    v.meta.restriction.finished_ur_ship,
                    null,
                    null,
                ],
                [
                    "????????????",
                    v.meta.restriction.mode ? "?????????" : "?????????",
                    null,
                    null,
                ],
            ];
            const this_lp = v.dataset.length;
            let this_merges: {
                s: { r: number; c: number };
                e: { r: number; c: number };
            }[] = [
                { s: { r: 0, c: 1 }, e: { r: 0, c: 3 } },
                { s: { r: 1, c: 1 }, e: { r: 1, c: 3 } },
                { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
                { s: { r: 6, c: 0 }, e: { r: 6, c: 3 } },
                ...new Array(9).fill(0).map((_, _merge_inside_idx) => {
                    return {
                        s: { r: 7 + _merge_inside_idx + this_lp, c: 1 },
                        e: { r: 7 + _merge_inside_idx + this_lp, c: 3 },
                    };
                }),
                { s: { r: 17 + this_lp, c: 0 }, e: { r: 17 + this_lp, c: 3 } },
                { s: { r: 18 + this_lp, c: 0 }, e: { r: 18 + this_lp, c: 3 } },
                { s: { r: 19 + this_lp, c: 1 }, e: { r: 19 + this_lp, c: 3 } },
                ...new Array(6).fill(0).map((_, _merge_inside_idx) => {
                    return {
                        s: { r: 20 + _merge_inside_idx + this_lp, c: 1 },
                        e: { r: 20 + _merge_inside_idx + this_lp, c: 3 },
                    };
                }),
                { s: { r: 26 + this_lp, c: 0 }, e: { r: 26 + this_lp, c: 3 } },
                { s: { r: 27 + this_lp, c: 1 }, e: { r: 27 + this_lp, c: 3 } },
                ...new Array(5).fill(0).map((_, _merge_inside_idx) => {
                    return {
                        s: { r: 35 + _merge_inside_idx + this_lp, c: 1 },
                        e: { r: 35 + _merge_inside_idx + this_lp, c: 3 },
                    };
                }),
            ];
            let this_sheet = XLSX.utils.aoa_to_sheet(this_data);
            this_sheet["!merges"] = this_merges;
            return { sheet: this_sheet, title: v.title };
        });
        let workbook = XLSX.utils.book_new();
        for (let i = 0; i < tosave.length; i++) {
            XLSX.utils.book_append_sheet(
                workbook,
                tosave[i].sheet,
                tosave[i].title
            );
        }
        let wb_binary = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "buffer",
        });
        await writeBinaryFile(filename + ".xlsx", wb_binary, {
            dir: BaseDirectory.Desktop,
        });
        Modal.info({
            title: "????????????",
            content: (
                <div>
                    <span>
                        ????????????<code>{filename}.xlsx</code>
                    </span>
                    <br />
                    <span>
                        ???????????????<code>{await desktopDir()}</code>
                    </span>
                </div>
            ),
        });
    }
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <div style={{ height: "50%", width: "100%", padding: "10px" }}>
                    <Saver
                        style={{ height: "100%", width: "100%" }}
                        onSave={(s: "json" | "xlsx" | "clipboard") =>
                            this.save(s)
                        }
                        ref={this.save_ref}
                        dataset={this.state.saveData.map((v) => {
                            return {
                                key: v.title,
                                title: v.title,
                                description: v.description,
                            };
                        })}
                    />
                    <CopyToClipboardModal
                        onClose={() => this.closeCtcModal()}
                        open={this.state.ctc.open}
                        title="??????????????????"
                        text={this.state.ctc.text}
                    />
                </div>
                <div style={{ height: "50%", width: "100%", padding: "10px" }}>
                    <Uploader
                        ref={this.uploader_ref}
                        onUpload={(v) => this.upload(v)}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            </div>
        );
    }
}

export default TechPlanSaver;
