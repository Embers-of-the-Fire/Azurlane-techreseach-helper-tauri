import React from "react";
import "antd/dist/reset.css";
import { Card } from "antd";

interface Props {
    titles: string[];
    onSelect: (key: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GridStyle: React.CSSProperties = {
    width: "100%",
    cursor: "pointer",
    fontSize: "20px"
}

class ProjectList extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <Card style={{ height: "100%", width: "100%", padding: "15px", overflowY: "auto" }}>
                { this.props.titles.map((title, idx) => <Card.Grid onClick={() => this.props.onSelect(idx)} key={idx} style={GridStyle}>{title}</Card.Grid>) }
            </Card>
        )
    }
}

export default ProjectList;
