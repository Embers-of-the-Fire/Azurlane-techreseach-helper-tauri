import React from "react";
import "antd/dist/reset.css";
import { Card, Typography } from "antd";

const { Title } = Typography;

const NoneSelectStyle: React.CSSProperties = {
    backgroundColor: "lightgray",
    width: "100%",
    fontSize: "1.3em",
};

const SelectStyle: React.CSSProperties = {
    backgroundColor: "white",
    width: "100%",
    fontSize: "1.3em",
};

interface Props {
    dataset: {
        select: boolean;
        name: string;
    }[];
}

class PSeries extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Title level={3} style={{ textAlign: "center" }}>
                    科研排序
                </Title>
                <Card
                    style={{
                        flex: 1,
                        width: "100%",
                        overflowY: "auto",
                    }}
                >
                    {this.props.dataset.map((dat, idx) => (
                        <Card.Grid
                            key={idx}
                            style={dat.select ? SelectStyle : NoneSelectStyle}
                            hoverable={false}
                        >
                            {dat.name}
                        </Card.Grid>
                    ))}
                </Card>
            </div>
        );
    }
}

export default PSeries;
