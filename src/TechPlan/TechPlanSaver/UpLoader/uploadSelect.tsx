import React, { createRef } from "react";
import "antd/dist/reset.css";
import { Button, ConfigProvider } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import UploadFileResultTransfer from "./uploadSelectTransfer";

interface RecordType {
    key: string;
    title: string;
    description: string;
}

interface Props {
    style?: React.CSSProperties;
    dataset: RecordType[];
    onCancel: () => void;
    onSubmit: (s: string[]) => void;
}

interface State {}

class UploadFileResultSelector extends React.Component<Props, State> {
    transfer_ref: React.RefObject<UploadFileResultTransfer>;
    constructor(props: Props) {
        super(props);
        this.transfer_ref = createRef<UploadFileResultTransfer>();
    }
    handelCancel() {
        this.props.onCancel();
    }
    handelSubmit() {
        this.props.onSubmit(this.transfer_ref.current?.getSelected() ?? []);
        this.transfer_ref.current?.update();
    }
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        padding: "15px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            width: "15%",
                            paddingRight: "20px",
                        }}
                    >
                        <div
                            style={{
                                height: "50%",
                                width: "100%",
                                paddingBottom: "10px",
                            }}
                        >
                            <Button
                                style={{
                                    borderWidth: "3px",
                                    fontSize: "20px",
                                    width: "100%",
                                    height: "100%",
                                }}
                                onClick={() => this.handelCancel()}
                                danger
                            >
                                <CloseCircleTwoTone
                                    style={{ fontSize: "35px" }}
                                    twoToneColor="#ff4d4f"
                                />
                                <br />
                                <span>取消</span>
                            </Button>
                        </div>
                        <div
                            style={{
                                height: "50%",
                                width: "100%",
                                paddingTop: "10px",
                            }}
                        >
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#00b96b",
                                    },
                                }}
                            >
                                <Button
                                    style={{
                                        borderWidth: "3px",
                                        fontSize: "20px",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    onClick={() => this.handelSubmit()}
                                >
                                    <CheckCircleTwoTone
                                        style={{ fontSize: "35px" }}
                                        twoToneColor="#00b96b"
                                    />
                                    <br />
                                    <span>导入</span>
                                </Button>
                            </ConfigProvider>
                        </div>
                    </div>
                    <div
                        style={{
                            height: "100%",
                            flexGrow: 1,
                        }}
                    >
                        <UploadFileResultTransfer
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            ref={this.transfer_ref}
                            dataset={this.props.dataset}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadFileResultSelector;
