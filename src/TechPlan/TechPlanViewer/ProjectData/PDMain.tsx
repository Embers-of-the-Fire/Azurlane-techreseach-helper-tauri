import React from "react";
import "antd/dist/reset.css";
import { message, Typography } from "antd";
import Plan from "../../TechPlanBuilder/Result/Plan";
import PResult from "./PResult";
import PDataMainShower from "./PDMS/PDataMainShower";
import { IptMeta } from "../../TechPlanBuilder/metafns";
import { SelectType, ShowType } from "./selection";
import { ProductMeta } from "./PDMS/DetailShower/product";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { invoke } from "@tauri-apps/api";

const { Title, Paragraph } = Typography;

interface Props {
    dataset: {
        name: string;
        select: boolean;
        index: number;
        id: number;
    }[];
    result: {
        time: number;
        doubloon: number;
        cube: number;
        cogn_chip: number;
        ssr_blp: number;
        direct_ssr_blp: number;
        ur_blp: number;
        direct_ur_blp: number;
        ur_equip: number;
    };
    title: string;
    desc: string;
    metadata: IptMeta;
}

interface State {
    selection: {
        show_type: ShowType;
        select: SelectType[];
    };
    dataset: ProductMeta | undefined;
}

const form_factor = (ssr: number, ur: number, former: number): {typ: number, ssrf: number, urf: number} => {
    let fct = 5.0;
    if (ssr + ur !== 5) fct = 5 - ssr - ur;
    let ffm = 10.0;
    if (ssr + ur + former !== 15.0) ffm = 10 - former;
    let typical = (4.0 * fct) / ffm;
    let ssrf = 0.6;
    if (ssr + ur !== 5) ssrf = (3 - ssr) / (5 - ssr - ur);
    let urf = 0.4;
    if (ssr + ur !== 5) urf = (2 - ur) / (5 - ur - ssr);
    return {typ: typical, ssrf: ssrf, urf: urf}
};

const form_dataset_series = (
    dataset: {
        name: string;
        select: boolean;
        index: number;
        id: number;
    }[]
): number[] => {
    let res = new Array<number>(dataset.length).fill(0);
    for (let i = 0; i < dataset.length; i++) {
        let ds = dataset[i];
        res[ds.index] = ds.id;
    }
    return res;
};

class PDMain extends React.Component<Props, State> {
    pres_ref: React.RefObject<PResult>;
    constructor(props: Props) {
        super(props);
        this.pres_ref = React.createRef();
        this.state = {
            selection: {
                show_type: ShowType.Resource,
                select: [],
            },
            dataset: undefined,
        };
        // this.viewUpdate();
    }
    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (
            prevProps.dataset !== this.props.dataset ||
            prevProps.metadata !== this.props.metadata
        ) {
            this.viewUpdate();
        }
    }
    viewUpdate() {
        let ures = form_factor(
            this.props.metadata.restriction.finished_ssr_ship,
            this.props.metadata.restriction.finished_ur_ship,
            this.props.metadata.restriction.finished_former_ship
        );
        let series = form_dataset_series(this.props.dataset);
        let select_limit = this.props.metadata.restriction.limit;
        let mode = this.props.metadata.restriction.mode;
        invoke<ProductMeta>("produce", {
            lst: series,
            rateFactor: ures.typ,
            selectLimit: select_limit,
            mode: mode,
            sourceRateFactorSsr: ures.ssrf,
            sourceRateFactorUr: ures.urf,
        })
            .then((v) => this.setState({ dataset: v }))
            // .then((v) => console.log(v))
            .catch((err) => {
                console.error(err);
                message.error({
                    type: "error",
                    content: "啊哦！出错了",
                });
            });
    }
    viewSelectUpd(v: { show_type: ShowType; select: SelectType[] }) {
        this.setState({
            selection: v,
        });
    }
    render(): React.ReactNode {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Paragraph
                    style={{
                        width: "100%",
                        height: "10%",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Title
                        level={2}
                        style={{ width: "25%", overflowY: "auto" }}
                    >
                        {this.props.title}
                    </Title>
                    <blockquote style={{ width: "75%", overflowY: "auto" }}>
                        {this.props.desc}
                    </blockquote>
                </Paragraph>
                <div
                    style={{
                        width: "100%",
                        height: "calc(90% - 1em)",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <div
                        style={{
                            width: "calc(20% - 5px)",
                            height: "100%",
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                        }}
                    >
                        <Title style={{ textAlign: "center" }} level={3}>
                            科研序列
                        </Title>
                        <Plan
                            style={{ width: "100%" }}
                            dataset={this.props.dataset}
                        />
                    </div>
                    <div
                        style={{
                            width: "calc(15% + 5px)",
                            height: "100%",
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            paddingLeft: "10px",
                        }}
                    >
                        <Title style={{ textAlign: "center" }} level={3}>
                            产出简报
                        </Title>
                        <PResult
                            onSelectChange={(v) => this.viewSelectUpd(v)}
                            ref={this.pres_ref}
                            style={{ width: "100%" }}
                            data={this.props.result}
                        />
                    </div>
                    <div
                        style={{
                            width: "calc(65% - 10px)",
                            marginLeft: "10px",
                        }}
                    >
                        <PDataMainShower
                            viewSelect={this.state.selection}
                            // series={form_dataset_series(this.props.dataset)}
                            metadata={this.props.metadata}
                            dataset={this.state.dataset}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default PDMain;
