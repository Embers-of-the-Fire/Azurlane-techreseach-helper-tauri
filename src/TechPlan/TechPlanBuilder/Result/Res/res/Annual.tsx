import React from "react";
import "antd/dist/reset.css";
import { Descriptions } from "antd";
import { toPercent, ResProps } from "./fns";

class Annual extends React.Component<ResProps> {
    render() {
        return (
            <Descriptions
                bordered
                column={2}
                size="small"
                style={{ ...this.props.style }}
            >
                <Descriptions.Item label="年均科研次数">
                    {this.props.time.toFixed(2)}
                </Descriptions.Item>
                <Descriptions.Item label="物资消耗">
                    {this.props.doubloon.toFixed(2)}
                </Descriptions.Item>
                <Descriptions.Item label="魔方消耗">
                    {this.props.cube.toFixed(2)}
                </Descriptions.Item>
                <Descriptions.Item label="心智碎片产出">
                    {this.props.cogn_chip.toFixed(2)}
                </Descriptions.Item>
                <Descriptions.Item label="金图产出">
                    {this.props.ssr_blp.toFixed(2)}
                </Descriptions.Item>
                <Descriptions.Item label="定向金图占比">
                    {toPercent(
                        this.props.direct_ssr_blp / this.props.ssr_blp,
                        2
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="彩图产出">
                    {this.props.ur_blp.toFixed(2)}
                </Descriptions.Item>
                <Descriptions.Item label="定向彩图占比">
                    {toPercent(this.props.direct_ur_blp / this.props.ur_blp, 2)}
                </Descriptions.Item>
                <Descriptions.Item label="彩装产出" span={2}>
                    {this.props.ur_equip.toFixed(2)}
                </Descriptions.Item>
            </Descriptions>
        );
    }
}

export default Annual;
