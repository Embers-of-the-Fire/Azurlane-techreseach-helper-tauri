import React from "react";
import "antd/dist/reset.css";
import { Divider, List, Space } from "antd";

function repo(ipt) {
    if (ipt < 10) {
        return "0" + ipt.toString();
    } else {
        return ipt.toString();
    }
}

class Plan extends React.Component {
    render() {
        return (
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
                            <List.Item className="itemNoneSelect">
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
        );
    }
}

export default Plan;
