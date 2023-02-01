import React from 'react';
import "antd/dist/reset.css";
import { Tooltip, Transfer } from 'antd';

interface RecordType {
    key: string;
    title: string;
    description: string;
}

interface Props {
    dataset: RecordType[];
    style?: React.CSSProperties;
}

interface State {
    dataSource: RecordType[];
    targetKeys: string[];
}

class UploadFileResultTransfer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dataSource: props.dataset,
            targetKeys: [],
        };
    }
    update() {
        this.setState({
            dataSource: this.props.dataset,
            targetKeys: [],
        })
    }
    handleChange = (newTargetKeys: string[]) => {
        this.setState({
            targetKeys: newTargetKeys,
        });
    };
    getSelected(): string[] {
        return this.state.targetKeys;
    }
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <Transfer
                    titles={['所有项目', '导入项目']}
                    style={{ height: "100%", width: "100%", overflowY: "auto" }}
                    listStyle={{
                        height: "100%",
                        width: "100%",
                    }}
                    dataSource={this.state.dataSource}
                    showSearch
                    targetKeys={this.state.targetKeys}
                    onChange={this.handleChange}
                    render={(item) => {
                        return {
                            label: (
                                <Tooltip title={item.description}>
                                    <span style={{ fontSize: "1.35em" }}>{item.title}</span>
                                </Tooltip>
                            ),
                            value: item.title,
                        };
                    }}
                    oneWay
                />
            </div>
        );
    }
}

export default UploadFileResultTransfer;
