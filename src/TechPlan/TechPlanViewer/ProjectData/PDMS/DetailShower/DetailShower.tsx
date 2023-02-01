import React from "react";
import "antd/dist/reset.css";
import Chart from "./Charts";
import { SelectType, ShowType } from "../../selection";
import { LoadingOutlined } from "@ant-design/icons";
import { ProductMeta } from "./product";

interface Props {
    style?: React.CSSProperties;
    // Here mode `true` for `PerformanceMode::PureIncome`, `false` for `PerformanceMode::CostPerformance`.
    viewSelect: { show_type: ShowType; select: SelectType[] };
    dataset: ProductMeta | undefined;
}

class DetailShower extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex: this.props.dataset === undefined ? 2 : 0,
                            backgroundColor: "lightgray",
                            opacity: "0.5",
                            position: "absolute",
                        }}
                    >
                        <div
                            style={{
                                top: "calc(50% - 40px)",
                                left: "calc(50% - 40px)",
                                width: "80px",
                                padding: 0,
                                position: "relative",
                            }}
                        >
                            <LoadingOutlined
                                style={{ fontSize: "80px", color: "#1677ff" }}
                            />
                            <br />
                        </div>
                    </div>
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                            zIndex: 1,
                            backgroundColor: "white"
                        }}
                    >
                        <Chart
                            dataset={this.props.dataset}
                            viewSelect={this.props.viewSelect}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailShower;
