import React from "react";
import "antd/dist/reset.css";
import { Segmented } from "antd";
import { BarChartOutlined, MenuOutlined } from "@ant-design/icons";
import MetaShower from "./MetaShower";
import DetailShower from "./DetailShower/DetailShower";
import { IptMeta } from "../../../TechPlanBuilder/metafns";
import { SelectType, ShowType } from "../selection";
import { ProductMeta } from "./DetailShower/product";

interface Props {
    style?: React.CSSProperties;
    metadata: IptMeta;
    dataset: ProductMeta | undefined;
    viewSelect: { show_type: ShowType; select: SelectType[] };
}

interface State {
    segmented: "details" | "meta";
}

class PDataMainShower extends React.Component<Props, State> {
    segPage: {
        meta: React.RefObject<MetaShower>;
        [key: string]: React.RefObject<any>;
    };
    constructor(props: Props) {
        super(props);
        this.state = {
            segmented: "meta",
        };
        this.segPage = {
            meta: React.createRef(),
            details: React.createRef(),
        };
    }
    segChange(v: string | number) {
        if (v === "meta") {
            this.setState({
                segmented: "meta",
            });
        } else if (v === "details") {
            this.setState({
                segmented: "details",
            });
        }
    }
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                    }}
                >
                    <Segmented
                        block
                        defaultValue="meta"
                        options={[
                            {
                                label: "元数据",
                                value: "meta",
                                icon: <MenuOutlined />,
                            },
                            {
                                label: "详细数据",
                                value: "details",
                                icon: <BarChartOutlined />,
                            },
                        ]}
                        onChange={(v) => this.segChange(v)}
                    />
                    <div style={{ flexGrow: 1 }}>
                        <MetaShower
                            metaData={this.props.metadata}
                            style={{
                                width: "100%",
                                height: "100%",
                                display:
                                    this.state.segmented === "meta"
                                        ? "flex"
                                        : "none",
                            }}
                        />
                        <DetailShower
                            dataset={this.props.dataset}
                            viewSelect={this.props.viewSelect}
                            style={{
                                width: "100%",
                                height: "100%",
                                display:
                                    this.state.segmented === "details"
                                        ? "flex"
                                        : "none",
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default PDataMainShower;
