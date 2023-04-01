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
        message.success("导入成功~");
    }
    save(s: "json" | "xlsx" | "clipboard") {
        switch (s) {
            case "json":
                this.saveAsJson()
                    .then()
                    .catch((e) => {
                        message.error("保存出错了~");
                        console.error(e);
                    });
                break;
            case "xlsx":
                this.saveAsXlsx()
                    .then()
                    .catch((e) => {
                        message.error("保存出错了~");
                        console.error(e);
                    });
                break;
            case "clipboard":
                // message.warning("还没有完成呢");
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
                                                            "复制成功~"
                                                        )
                                                    )
                                                    .catch((err) => {
                                                        console.error(err);
                                                        message.error(
                                                            "啊哦，出错了"
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
            title: "保存成功",
            // content: `文件名：<code>${filename}.azurproj</code>。<br>文件路径：<code>${BaseDirectory.Desktop}</code>。`
            content: (
                <div>
                    <span>
                        文件名：<code>{filename}.azurproj</code>
                    </span>
                    <br />
                    <span>
                        文件位置：<code>{await desktopDir()}</code>
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
                ["标题", v.title, null, null],
                ["备注", v.description, null, null],
                [null, null, null, null],
                // Series information
                ["项目序列概况", null, null, null],
                ["序号", "项目ID", "是否选择", "项目名称"],
                ...v.dataset.map((vd) => [
                    vd.index,
                    vd.id,
                    vd.select ? "是" : "否",
                    vd.name,
                ]),
                [null, null, null, null],
                // Results
                ["产出概况", null, null, null],
                ["日均科研次数", v.daily.time, null, null],
                ["物资消耗", v.daily.doubloon, null, null],
                ["魔方消耗", v.daily.cube, null, null],
                ["心智碎片产出", v.daily.cogn_chip, null, null],
                ["金图产出", v.daily.ssr_blp, null, null],
                [
                    "定向金图占比",
                    v.daily.direct_ssr_blp / v.daily.ssr_blp,
                    null,
                    null,
                ],
                ["彩图产出", v.daily.ur_blp, null, null],
                [
                    "定向彩图占比",
                    v.daily.direct_ur_blp / v.daily.ur_blp,
                    null,
                    null,
                ],
                ["彩装产出", v.daily.ur_equip, null, null],
                [null, null, null, null],
                // Meta
                ["元数据", null, null, null],
                ["参考价值", null, null, null],
                ["条目", "值", null, null],
                ["物资", v.meta.reference.doubloon, null, null],
                ["魔方", v.meta.reference.cube, null, null],
                ["金图", v.meta.reference.ssr_blp, null, null],
                ["彩图", v.meta.reference.ur_blp, null, null],
                ["彩装", v.meta.reference.ur_equip, null, null],
                ["心智", v.meta.reference.cogn_chip, null, null],
                ["策略限制", null, null, null],
                ["条目", "值", null, null],
                [
                    "在线时间",
                    v.meta.restriction.time.value,
                    v.meta.restriction.time.strict ? "严格限制" : "宽松限制",
                    v.meta.restriction.time.status ? "启用" : "停用",
                ],
                [
                    "物资",
                    v.meta.restriction.doubloon.value,
                    v.meta.restriction.doubloon.strict
                        ? "严格限制"
                        : "宽松限制",
                    v.meta.restriction.doubloon.status ? "启用" : "停用",
                ],
                [
                    "魔方",
                    v.meta.restriction.cube.value,
                    v.meta.restriction.cube.strict ? "严格限制" : "宽松限制",
                    v.meta.restriction.cube.status ? "启用" : "停用",
                ],
                [
                    "金图",
                    v.meta.restriction.ssr_blp.value,
                    v.meta.restriction.ssr_blp.strict ? "严格限制" : "宽松限制",
                    v.meta.restriction.ssr_blp.status ? "启用" : "停用",
                ],
                [
                    "彩图",
                    v.meta.restriction.ur_blp.value,
                    v.meta.restriction.ur_blp.strict ? "严格限制" : "宽松限制",
                    v.meta.restriction.ur_blp.status ? "启用" : "停用",
                ],
                [
                    "彩装",
                    v.meta.restriction.ur_equip.value,
                    v.meta.restriction.ur_equip.strict
                        ? "严格限制"
                        : "宽松限制",
                    v.meta.restriction.ur_equip.status ? "启用" : "停用",
                ],
                [
                    "心智",
                    v.meta.restriction.cogn_chip.value,
                    v.meta.restriction.cogn_chip.strict
                        ? "严格限制"
                        : "宽松限制",
                    v.meta.restriction.cogn_chip.status ? "启用" : "停用",
                ],
                ["选择数量限制", v.meta.restriction.limit, null, null],
                [
                    "3~4期科研船毕业数量",
                    v.meta.restriction.finished_former_ship,
                    null,
                    null,
                ],
                [
                    "5期金船毕业数量",
                    v.meta.restriction.finished_ssr_ship,
                    null,
                    null,
                ],
                [
                    "5期彩船毕业数量",
                    v.meta.restriction.finished_ur_ship,
                    null,
                    null,
                ],
                [
                    "选择方式",
                    v.meta.restriction.mode ? "净收益" : "性价比",
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
            title: "保存成功",
            content: (
                <div>
                    <span>
                        文件名：<code>{filename}.xlsx</code>
                    </span>
                    <br />
                    <span>
                        文件位置：<code>{await desktopDir()}</code>
                    </span>
                </div>
            ),
        });
    }
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <div style={{ height: "60%", width: "100%", padding: "10px", paddingTop: 0 }}>
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
                        title="复制到剪贴板"
                        text={this.state.ctc.text}
                    />
                </div>
                <div style={{ height: "40%", width: "100%", padding: "10px" }}>
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
