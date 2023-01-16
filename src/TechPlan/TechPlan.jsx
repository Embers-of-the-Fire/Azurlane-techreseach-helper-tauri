import React from "react";
import "antd/dist/reset.css";
import TechPlanBuilder from "./TechPlanBuilder/TechPlanBuilder";
import { BuildTwoTone } from "@ant-design/icons";

class TechPlan extends React.Component {
    constructor(props) {
        super(props);
        props.onRef(this);
        this.pageref = [undefined, undefined, undefined];
        this.state = {
            display: [
                true, // TB
            ],
        };
        this.breadsetter = props.bread;
    }
    pageRef(ref, idx) {
        this.pageref[idx] = ref;
    }
    page(idx) {
        const data = ["规划制定", "科研结论", "规划共享"];
        let st = [false, false, false];
        st[parseInt(idx) - 1] = true;
        this.setState({
            display: st,
        });
        this.breadsetter(["科研规划", data[parseInt(idx) - 1]]);
    }
    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <div
                    style={{
                        display: this.state.display[0] ? null : "none",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <TechPlanBuilder parentSpinning={this.props.parentSpinning} onRef={(ref) => this.pageRef(ref, 0)} />
                </div>
                <div
                    style={{
                        display: this.state.display[1] ? null : "none",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    {/* Page 2 */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "60px",
                            paddingTop: "15%"
                        }}
                    >
                        <BuildTwoTone />
                        &nbsp;施工中
                    </div>
                </div>
                <div
                    style={{
                        display: this.state.display[2] ? null : "none",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "60px",
                            paddingTop: "15%"
                        }}
                    >
                        <BuildTwoTone />
                        &nbsp;施工中
                    </div>
                </div>
            </div>
        );
    }
}

export default TechPlan;
