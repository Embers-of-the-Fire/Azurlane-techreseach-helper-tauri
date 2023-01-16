import React from "react";
import "antd/dist/reset.css";
import { Descriptions } from "antd";
import toPercent from "./fns.ts";

class Average extends React.Component {
    render() {
        return (
            <div>
                <Descriptions bordered column={2} size="small">
                    <Descriptions.Item label="平均科研用时">
                        {this.props.time.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="消耗物资">
                        {this.props.doubloon.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="消耗魔方">
                        {this.props.cube.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="产出金图">
                        {this.props.ssr_blp.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="定向金图占比">
                        {toPercent(
                            this.props.direct_ssr_blp / this.props.ssr_blp,
                            2
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="产出彩图">
                        {this.props.ur_blp.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="定向彩图占比">
                        {toPercent(
                            this.props.direct_ur_blp / this.props.ur_blp,
                            2
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="产出心智碎片">
                        {this.props.cogn_chip.toFixed(2)}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default Average;
