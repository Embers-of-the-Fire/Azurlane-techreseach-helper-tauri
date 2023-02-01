import React from "react";
import "antd/dist/reset.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import EChartsReact from "echarts-for-react";
import ProjectList from "./ProjectList";
import PDMain from "./ProjectData/PDMain";
import { SaveObj } from "../TechPlanBuilder/metafns";
import { MainPage } from "../MainInterface";

interface Props {
    parentSpinning: (setting: boolean) => void;
}

interface State {
    data: SaveObj[];
    nowShowing: SaveObj;
}

class TechPlanViewer extends React.Component<Props, State> implements MainPage {
    // titles: string[];
    constructor(props: Props) {
        super(props);
        const ept = {
            value: 0.0,
            status: false,
            strict: false,
        };
        this.state = {
            data: [],
            nowShowing: {
                title: "空",
                description: "",
                daily: {
                    time: 0,
                    doubloon: 0,
                    cube: 0,
                    ssr_blp: 0,
                    ur_blp: 0,
                    direct_ssr_blp: 0,
                    direct_ur_blp: 0,
                    cogn_chip: 0,
                    ur_equip: 0,
                },
                dataset: new Array(29).fill("").map((_, idx) => {
                    return {
                        name: `项目序列 - ${idx}`,
                        select: idx <= 10,
                        index: idx,
                        id: idx,
                    };
                }),
                meta: {
                    reference: {
                        cogn_chip: 60.0,
                        cube: 1000.0,
                        doubloon: 0.5,
                        ssr_blp: 1200.0,
                        ur_blp: 3000.0,
                        ur_equip: 36000.0,
                    },
                    restriction: {
                        doubloon: ept,
                        cube: ept,
                        ssr_blp: ept,
                        ur_blp: ept,
                        ur_equip: ept,
                        cogn_chip: ept,
                        time: ept,
                        limit: 10,
                        finished_former_ship: 10,
                        finished_ssr_ship: 3,
                        finished_ur_ship: 2,
                        mode: true,
                    },
                },
            },
        };
    }
    getSaveObjs(): SaveObj[] {
        return this.state.data;
    }
    newSaveObj(dat: SaveObj) {
        let nd = this.state.data;
        nd.push(dat);
        this.setState({
            data: nd,
        });
    }
    newSaveObjs(dat: SaveObj[]) {
        let nd = this.state.data;
        this.setState({
            data: nd.concat(dat),
        });
    }
    update() {}
    startView() {}
    endView() {}
    projSelect = (idx: number) => {
        // console.log(idx);
        let d = this.state.data[idx];
        this.setState({
            nowShowing: d,
        });
    };
    render(): React.ReactNode {
        return (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <div style={{ height: "100%", width: "15%", padding: "5px" }}>
                    <ProjectList
                        titles={this.state.data.reduce(
                            (prev: string[], cur) => {
                                prev.push(cur.title);
                                return prev;
                            },
                            []
                        )}
                        onSelect={this.projSelect}
                    />
                </div>
                <div style={{ height: "100%", width: "85%", padding: "5px" }}>
                    <PDMain
                        metadata={this.state.nowShowing.meta}
                        result={this.state.nowShowing.daily}
                        title={this.state.nowShowing.title}
                        desc={this.state.nowShowing.description}
                        dataset={this.state.nowShowing.dataset}
                    />
                </div>
            </div>
        );
    }
}

export default TechPlanViewer;
