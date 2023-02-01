import React from "react";
import "antd/dist/reset.css";
import { SaveObj } from "../../TechPlanBuilder/metafns";
import UploadSelector from "./upload";
import { message } from "antd";
import UploadFileResultSelector from "./uploadSelect";

interface Props {
    style?: React.CSSProperties;
    onUpload: (v: SaveObj[]) => void;
}

interface State {
    allowDrag: boolean;
    uploadState: "waiting" | "selecting";
    contentData: SaveObj[];
}

class Uploader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allowDrag: false,
            uploadState: "waiting",
            contentData: [],
        };
    }
    setAllowDrag(b: boolean) {
        this.setState({
            allowDrag: b,
        });
    }
    uploadReproduce(c: SaveObj[]) {
        this.setAllowDrag(false);
        if (c.length <= 0) message.warning("内容是空的哦");
        this.setState({
            uploadState: "selecting",
            contentData: c,
        });
        this.forceUpdate();
    }
    uploadRepoSelect(d: string[]) {
        let data = d;
        if (data === undefined) return;
        let r: SaveObj[] = [];
        for (let i = 0; i < data?.length; i++) {
            let key = data[i];
            let res = this.state.contentData.find(
                (v) => v.title.match(key) !== null
            );
            if (res === undefined) continue;
            r.push(res);
        }
        this.setState({
            uploadState: "waiting",
        });
        this.forceUpdate(() => this.props.onUpload(r));
    }
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display:
                            this.state.uploadState === "waiting"
                                ? undefined
                                : "none",
                    }}
                >
                    <UploadSelector
                        onUpload={(content) => this.uploadReproduce(content)}
                        style={{ width: "100%", height: "100%" }}
                        allowDrag={this.state.allowDrag}
                    />
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display:
                            this.state.uploadState === "selecting"
                                ? undefined
                                : "none",
                    }}
                >
                    <UploadFileResultSelector
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                        onCancel={() => {
                            this.setAllowDrag(true);
                            this.setState({
                                uploadState: "waiting",
                            });
                            this.forceUpdate();
                        }}
                        onSubmit={(v) => this.uploadRepoSelect(v)}
                        dataset={this.state.contentData.map((v) => {
                            return {
                                description: v.description,
                                title: v.title,
                                key: v.title,
                            };
                        })}
                    />
                </div>
            </div>
        );
    }
}

export default Uploader;
