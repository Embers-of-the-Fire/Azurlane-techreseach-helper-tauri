import React from "react";
import "antd/dist/reset.css";
// import { Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { listen } from "@tauri-apps/api/event";
import { readTextFile } from "@tauri-apps/api/fs";
import "./upload.css";
import { SaveObj } from "../../TechPlanBuilder/metafns";
import { invoke } from "@tauri-apps/api";
import { message } from "antd";

interface Props {
    style?: React.CSSProperties;
    allowDrag: boolean;
    onUpload: (v: SaveObj[]) => void;
}

interface State {}

class UploadSelector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        listen(
            "tauri://file-drop",
            async (event) => await this.fileDrop(event)
        );
    }
    async fileDrop(event: any): Promise<void> {
        if (this.props.allowDrag === false) return;
        let payloads: any = event.payload;
        let svs: SaveObj[] = [];
        for (let i = 0; i < payloads.length; i++) {
            let payload: string = payloads[i];
            const contents = await readTextFile(payload);
            // console.log(contents);
            try{
                let res: { svlist: SaveObj[] } = await invoke("from_str", {
                    s: contents,
                });
                svs = svs.concat(res.svlist);
            } catch (err: any) {
                message.error(`加载文件[${payload.slice(payload.lastIndexOf('/'))}]出错了`)
            }
        }
        this.props.onUpload(svs);
        return;
    }
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <div
                    id="upload-dragger"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <p className="drag-icon">
                        <InboxOutlined
                            style={{ fontSize: "50px", color: "#4096ff" }}
                        />
                    </p>
                    <p className="drag-text">
                        点击选择文件上传或拖动文件到该页面
                    </p>
                    {/* <p className="drag-hint">
                        出于运行安全考虑，暂时仅支持桌面文件
                    </p> */}
                </div>
            </div>
        );
    }
}

export default UploadSelector;
