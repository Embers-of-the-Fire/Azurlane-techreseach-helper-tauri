import React from "react";
import "antd/dist/reset.css";
import { Divider, List, Space } from "antd";

const repo = (ipt: number): string => {
    if (ipt < 10) {
        return "0" + ipt.toString();
    } else {
        return ipt.toString();
    }
}

interface Props {
    dataset: {
        select: boolean;
        index: number;
        name: string;
    }[];
    style?: React.CSSProperties | undefined;
}

class Plan extends React.Component<Props> {
    render() {
        return (
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    border: "1px solid #d9d9d9",
                    borderRadius: "8px",
                    ...this.props.style,
                }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.dataset}
                    renderItem={(item) => {
                        if (item.select === true) {
                            return (
                                <List.Item>
                                    <Space>
                                        <label style={{ width: "10%" }}>
                                            {repo(item.index)}
                                        </label>
                                        <Divider type="vertical" />
                                        <label style={{ width: "90%" }}>
                                            {item.name}
                                        </label>
                                    </Space>
                                </List.Item>
                            );
                        } else {
                            return (
                                <List.Item
                                    style={{ backgroundColor: "lightgray" }}
                                >
                                    <Space>
                                        <label style={{ width: "10%" }}>
                                            {repo(item.index)}
                                        </label>
                                        <Divider type="vertical" />
                                        <label style={{ width: "90%" }}>
                                            {item.name}
                                        </label>
                                    </Space>
                                </List.Item>
                            );
                        }
                    }}
                />
            </div>
        );
    }
}

export default Plan;
