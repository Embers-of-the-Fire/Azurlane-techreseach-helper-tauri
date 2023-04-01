import React, { createRef } from "react";
import "antd/dist/reset.css";
import TransferSave from "./TransferSave";
import { Button, ConfigProvider } from "antd";
import { CopyTwoTone, DownCircleTwoTone, DownSquareTwoTone } from "@ant-design/icons";

interface Props {
    dataset: {
        key: string;
        title: string;
        description: string;
    }[];
    style?: React.CSSProperties;
    onSave: (s: "json" | "xlsx" | "clipboard") => void;
}

class Saver extends React.Component<Props> {
    transfer_ref: React.RefObject<TransferSave>;
    constructor(props: Props) {
        super(props);
        this.transfer_ref = createRef();
    }
    update() {
        this.transfer_ref.current?.update();
    }
    getSelected(): string[] | undefined {
        return this.transfer_ref.current?.getSelected();
    }
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <div
                    style={{
                        height: "100%",
                        width: "100",
                        display: "flex",
                        flexDirection: "row",
                        padding: "15px",
                    }}
                >
                    <div
                        style={{
                            width: "15%",
                            display: "flex",
                            flexDirection: "column",
                            paddingRight: "20px",
                        }}
                    >
                        <div style={{ width: "100%", height: "calc(33.33% - 10px)", marginBottom: "15px" }}>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#00b96b",
                                    },
                                }}
                            >
                                <Button
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        fontSize: "20px",
                                        borderWidth: "3px",
                                        textAlign: "center",
                                    }}
                                    onClick={() => this.props.onSave("json")}
                                >
                                    <DownSquareTwoTone
                                        style={{ fontSize: "35px" }}
                                        twoToneColor="#00b96b"
                                    />
                                    <br />
                                    <span>保存</span>
                                </Button>
                            </ConfigProvider>
                        </div>
                        <div style={{ width: "100%", height: "calc(33.33% - 10px)", marginBottom: "15px" }}>
                            <Button
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "20px",
                                    borderWidth: "3px",
                                    textAlign: "center",
                                }}
                                onClick={() => this.props.onSave("xlsx")}
                            >
                                <DownCircleTwoTone
                                    style={{ fontSize: "35px" }}
                                />
                                <br />
                                <span>EXCEL</span>
                            </Button>
                        </div>
                        <div style={{ width: "100%", height: "calc(33.33% - 10px)" }}>
                            <Button
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "20px",
                                    borderWidth: "3px",
                                    textAlign: "center",
                                }}
                                onClick={() => this.props.onSave("clipboard")}
                            >
                                <CopyTwoTone
                                    style={{ fontSize: "35px" }}
                                />
                                <br />
                                <span>剪贴板</span>
                            </Button>
                        </div>
                    </div>
                    <div style={{ flexGrow: 1, paddingRight: "10px" }}>
                        <TransferSave
                            ref={this.transfer_ref}
                            style={{ height: "100%", width: "100%" }}
                            dataset={this.props.dataset}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Saver;
