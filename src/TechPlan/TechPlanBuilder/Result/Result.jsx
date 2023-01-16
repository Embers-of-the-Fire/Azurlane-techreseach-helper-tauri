import React from "react";
import "antd/dist/reset.css";
import Plan from "./Plan";
import MRes from "./Res/MRes";
import { Typography, Col, Row } from "antd";

const { Title } = Typography;

class Result extends React.Component {
    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <Row style={{ height: "100%", width: "100%" }}>
                    <Col
                        span={12}
                        style={{
                            height: "100%",
                            padding: "25px",
                            paddingRight: "60px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Title level={3} style={{ textAlign: "center" }}>
                            科研排序
                        </Title>
                        <div
                            style={{
                                flex: "1",
                                overflowY: "scroll",
                                marginTop: "15px",
                                border: "3px solid #d9d9d9",
                                borderRadius: "5px",
                                padding: "3px",
                            }}
                        >
                            <Plan dataset={this.props.dataset} />
                        </div>
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
