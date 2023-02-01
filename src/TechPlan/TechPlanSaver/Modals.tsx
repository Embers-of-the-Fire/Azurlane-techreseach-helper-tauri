import React from "react";
import "antd/dist/reset.css";
import { Button, Modal } from "antd";

interface CTCProps {
    open: boolean;
    title: string;
    text: string | React.ReactNode;
    onClose?: () => void;
}

class CopyToClipboardModal extends React.Component<CTCProps> {
    close() {
        if (this.props.onClose !== undefined) {
            this.props.onClose();
        }
    }
    render(): React.ReactNode {
        return (
            <>
                <Modal
                    title={this.props.title}
                    open={this.props.open}
                    footer={[
                        <Button onClick={() => this.close()} danger>
                            关闭
                        </Button>,
                    ]}
                >
                    {this.props.text}
                </Modal>
            </>
        );
    }
}

export { CopyToClipboardModal };
