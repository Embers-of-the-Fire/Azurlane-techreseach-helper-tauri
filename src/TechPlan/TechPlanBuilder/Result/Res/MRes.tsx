import React from "react";
import "antd/dist/reset.css";
import { Typography } from "antd";
import Average from "./res/Average";
import Daily from "./res/Daily";
import Annual from "./res/Annual";
import { ResProps } from "./res/fns";

const { Title } = Typography;

interface Props {
    average: ResProps;
    daily: ResProps;
    annual: ResProps;
}

class MRes extends React.Component<Props> {
    render() {
        return (
            <div
                style={{
                    height: "100%",
                    padding: "25px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Title
                    style={{
                        paddingTop: "2px",
                        paddingBottom: "2px",
                        textAlign: "center",
                    }}
                    level={3}
                >
                    产出简报
                </Title>
                <div
                    style={{
                        overflowY: "auto",
                        flex: 1,
                        height: "100%",
                        marginTop: "10px",
                    }}
                >
                    <Title
                        level={4}
                        style={{ textAlign: "center", marginTop: "10px" }}
                    >
                        平均
                    </Title>
                    <Average
                        time={this.props.average.time}
                        doubloon={this.props.average.doubloon}
                        cube={this.props.average.cube}
                        ssr_blp={this.props.average.ssr_blp}
                        direct_ssr_blp={this.props.average.direct_ssr_blp}
                        ur_blp={this.props.average.ur_blp}
                        direct_ur_blp={this.props.average.direct_ur_blp}
                        cogn_chip={this.props.average.cogn_chip}
                        ur_equip={this.props.average.ur_equip}
                    />
                    <Title
                        level={4}
                        style={{ textAlign: "center", marginTop: "10px" }}
                    >
                        每日
                    </Title>
                    <Daily
                        time={this.props.daily.time}
                        doubloon={this.props.daily.doubloon}
                        cube={this.props.daily.cube}
                        ssr_blp={this.props.daily.ssr_blp}
                        direct_ssr_blp={this.props.daily.direct_ssr_blp}
                        ur_blp={this.props.daily.ur_blp}
                        direct_ur_blp={this.props.daily.direct_ur_blp}
                        cogn_chip={this.props.daily.cogn_chip}
                        ur_equip={this.props.daily.ur_equip}
                    />
                    <Title
                        level={4}
                        style={{ textAlign: "center", marginTop: "10px" }}
                    >
                        每年
                    </Title>
                    <Annual
                        style={{ marginBottom: "5px" }}
                        time={this.props.annual.time}
                        doubloon={this.props.annual.doubloon}
                        cube={this.props.annual.cube}
                        ssr_blp={this.props.annual.ssr_blp}
                        direct_ssr_blp={this.props.annual.direct_ssr_blp}
                        ur_blp={this.props.annual.ur_blp}
                        direct_ur_blp={this.props.annual.direct_ur_blp}
                        cogn_chip={this.props.annual.cogn_chip}
                        ur_equip={this.props.annual.ur_equip}
                    />
                </div>
            </div>
        );
    }
}

export default MRes;
