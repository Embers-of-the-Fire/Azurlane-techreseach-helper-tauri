import React from "react";
import "antd/dist/reset.css";
import Plan from "./Plan";
import MRes from "./Res/MRes";
import { Typography, Col, Row } from "antd";
import { ResProps } from "./Res/res/fns";

const { Title } = Typography;

interface Props {
    dataset: {
        select: boolean;
        index: number;
        name: string;
    }[];
    average: ResProps;
    daily: ResProps;
    annual: ResProps;
}

class Result extends React.Component<Props> {
    render() {
        return (
            <div
                style={{ height: "100%", width: "100%" }}
            >
                <Row style={{ height: "100%", width: "100%" }}>
                    <Col
                className="tpb-header"
                        span={12}
                        style={{
                            height: "100%",
                            // padding: "25px",
                            paddingLeft: "25px",
                            paddingRight: "60px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Title level={3} style={{ textAlign: "center" }}>
                            科研排序
                        </Title>
                        <Plan
                            style={{ marginTop: "15px" }}
                            dataset={this.props.dataset}
                        />
                    </Col>
                    <Col span={12} style={{ height: "100%" }}>
                        <div style={{ flex: 1, height: "100%" }}>
                            <MRes
                                average={this.props.average}
                                daily={this.props.daily}
                                annual={this.props.annual}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Result;
