import React, { createRef } from "react";
import "antd/dist/reset.css";
import TechPlanBuilder from "./TechPlanBuilder/TechPlanBuilder";
import TechPlanViewer from "./TechPlanViewer/TechPlanViewer";
import { SaveObj } from "./TechPlanBuilder/metafns";
import TechPlanSaver from "./TechPlanSaver/TechPlanSaver";

interface Props {
    bread: (s: string[]) => void;
    onRef: (arg: TechPlan) => void;
    parentSpinning: (setting: boolean) => void;
}

interface State {
    display: boolean[];
}

class TechPlan extends React.Component<Props, State> {
    pageref: [
        React.RefObject<TechPlanBuilder>,
        React.RefObject<TechPlanViewer>,
        React.RefObject<TechPlanSaver>
    ];
    breadsetter: (s: string[]) => void;
    constructor(props: Props) {
        super(props);
        this.props.onRef(this);
        this.pageref = [
            createRef<TechPlanBuilder>(),
            createRef<TechPlanViewer>(),
            createRef<TechPlanSaver>(),
        ];
        this.state = {
            display: [
                true, // TPB
                false, //TPV
            ],
        };
        this.breadsetter = props.bread;
    }
    page(idx: string) {
        const data = ["规划制定", "科研结论", "规划共享"];
        let st = [false, false, false];
        st[parseInt(idx) - 1] = true;
        this.setState({
            display: st,
        });
        this.breadsetter(["科研规划", data[parseInt(idx) - 1]]);
        this.forceUpdate(() => {
            for (let i = 0; i < this.pageref.length; i++) {
                this.pageref[i].current?.update();
                if (i === (parseInt(idx) - 1)) {
                    this.pageref[i].current?.startView();
                } else {
                    this.pageref[i].current?.endView();
                }
            }
        });
    }
    save(dat: SaveObj) {
        this.pageref[1].current?.newSaveObj(dat);
    }
    getSaveData = (): SaveObj[] | undefined => {
        return this.pageref[1].current?.getSaveObjs();
    };
    uploadSaveData = (v: SaveObj[]) => {
        this.pageref[1].current?.newSaveObjs(v);
    }
    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <div
                    style={{
                        display: this.state.display[0] ? undefined : "none",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <TechPlanBuilder
                        onSave={(dat) => this.save(dat)}
                        parentSpinning={this.props.parentSpinning}
                        ref={this.pageref[0]}
                    />
                </div>
                <div
                    style={{
                        display: this.state.display[1] ? undefined : "none",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    {/* Page 2 */}
                    <TechPlanViewer
                        parentSpinning={this.props.parentSpinning}
                        ref={this.pageref[1]}
                    />
                </div>
                <div
                    style={{
                        display: this.state.display[2] ? undefined : "none",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <TechPlanSaver
                        style={{ height: "100%", width: "100%" }}
                        saveDataPath={this.getSaveData}
                        uploadDataPath={(v) => this.uploadSaveData(v)}
                        parentSpinning={this.props.parentSpinning}
                        ref={this.pageref[2]}
                    />
                </div>
            </div>
        );
    }
}

export default TechPlan;
