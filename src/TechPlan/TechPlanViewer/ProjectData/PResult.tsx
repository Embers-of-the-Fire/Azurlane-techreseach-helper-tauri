import React from "react";
import "antd/dist/reset.css";
import "./PResult.css";
// import { Descriptions } from "antd";
import { toPercent } from "../../TechPlanBuilder/Result/Res/res/fns";
import { ShowType, Selection, SelectType, into_select_type } from "./selection";

interface Props {
    style?: React.CSSProperties | undefined;
    descStyle?: React.CSSProperties | undefined;
    data: {
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
    onSelectChange: (v: { show_type: ShowType; select: SelectType[] }) => void;
}

type State = Selection;

interface InsState {
    [key: string]: boolean | ShowType;
}

class PResult extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show_type: ShowType.Resource,
            rt_status: false,
            db_status: false,
            cb_status: false,
            sb_status: false,
            dsb_status: false,
            ub_status: false,
            dub_status: false,
            ue_status: false,
            cc_status: false,
        };
    }
    getStatus(): { show_type: ShowType; select: SelectType[] } {
        const s: InsState = this.state;
        let res: SelectType[] = [];
        const skey = Object.keys(s);
        for (let i = 0; i < skey.length; i++) {
            if (s[skey[i]] === false) continue;
            let r = into_select_type(skey[i]);
            if (r === null) continue;
            res.push(r);
        }
        return {
            show_type: this.state.show_type,
            select: res
        };
    }
    onSelectChange() {
        this.props.onSelectChange(this.getStatus());
    }
    updateResearchTimes() {
        const bs = this.state.rt_status;
        if (bs === true) {
            this.setState(
                {
                    show_type: ShowType.Resource,
                    rt_status: false,
                },
                () => this.onSelectChange()
            );
        } else {
            this.setState(
                {
                    show_type: ShowType.TimeUse,
                    rt_status: true,
                    db_status: false,
                    cb_status: false,
                    sb_status: false,
                    dsb_status: false,
                    ub_status: false,
                    dub_status: false,
                    ue_status: false,
                    cc_status: false,
                },
                () => this.onSelectChange()
            );
        }
    }
    deselectRt() {
        if (this.state.show_type === ShowType.TimeUse) {
            this.setState({
                show_type: ShowType.Resource,
                rt_status: false,
                db_status: false,
                cb_status: false,
                sb_status: false,
                dsb_status: false,
                ub_status: false,
                dub_status: false,
                ue_status: false,
                cc_status: false,
            });
        } else {
            this.setState({
                rt_status: false,
            });
        }
    }
    objSelect(
        type:
            | "db_status"
            | "cb_status"
            | "sb_status"
            | "dsb_status"
            | "ub_status"
            | "dub_status"
            | "ue_status"
            | "cc_status"
    ) {
        if (this.state[type] === true) {
            let obj: any = {};
            obj[type] = false;
            this.setState(obj, () => this.onSelectChange());
        } else {
            this.deselectRt();
            let obj: any = {};
            obj[type] = true;
            this.setState(obj, () => this.onSelectChange());
        }
    }
    render(): React.ReactNode {
        return (
            <div
                style={{ flex: 1, overflowY: "auto", ...this.props.style }}
                className="presult"
            >
                <div
                    style={{
                        border: "1px solid rgba(5, 5, 5, 0.06)",
                        borderRadius: "8px",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <table style={{ width: "100%", height: "100%" }}>
                        <tbody>
                            <tr className="row">
                                <th
                                    style={{ width: "60%" }}
                                    className={
                                        this.state.rt_status
                                            ? "desct select"
                                            : "desct noneSelect"
                                    }
                                    onClick={() => this.updateResearchTimes()}
                                >
                                    <span>日均科研次数</span>
                                </th>
                                <td style={{ width: "40%" }} className="rest">
                                    {this.props.data.time.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="row">
                                <th
                                    className={
                                        this.state.db_status
                                            ? "desct select"
                                            : "desct noneSelect"
                                    }
                                    onClick={() => this.objSelect("db_status")}
                                >
                                    <span>物资消耗</span>
                                </th>
                                <td className="rest">
                                    {this.props.data.doubloon.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="row">
                                <th
                                    className={
                                        this.state.cb_status
                                            ? "desct select"
                                            : "desct noneSelect"
                                    }
                                    onClick={() => this.objSelect("cb_status")}
                                >
                                    <span>魔方消耗</span>
                                </th>
                                <td className="rest">
                                    {this.props.data.cube.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="row">
                                <th
                                    className={
                                        this.state.cc_status
                                            ? "desct select"
                                            : "desct noneSelect"
                                    }
                                    onClick={() => this.objSelect("cc_status")}
                                >
                                    <span>心智碎片产出</span>
                                </th>
                                <td className="rest">
                                    {this.props.data.cogn_chip.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="row">
                                <th
                                    className={
                                        this.state.sb_status
                                            ? "desct select"
                                            : "desct noneSelect"
                                    }
                                    onClick={() => this.objSelect("sb_status")}
                                >
                                    <span>金图产出</span>
                                </th>
                                <td className="rest">
                                    {this.props.data.ssr_blp.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="row">
                                <th
                                    className={
                                        this.state.dsb_status
                                            ? "desct select"
                                            : "desct noneSelect"
                                    }
                                    onClick={() => this.objSelect("dsb_status")}
                                >
                                    <span>定向金图占比</span>
                                </th>
                                <td className="rest">
                                    {toPercent(
                                        this.props.data.direct_ssr_blp /
                                            this.props.data.ssr_blp,
                                        2
                                    )}
                                </td>
                            </tr>
                            <tr className="row">
                                <th
                                    className={
                                        this.state.ub_status
                                            ? "desct select"
                                            : "desct noneSelect"
                                    }
                                    onClick={() => this.objSelect("ub_status")}
                                >
                                    <span>彩图产出</span>
                                </th>
                                <td className="rest">
                                    {this.props.data.ur_blp.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="row">
                                <th
                                    className={
                                        this.state.dub_status
                                            ? "desct select"
                                            : "desct noneSelect"
                                    }
                                    onClick={() => this.objSelect("dub_status")}
                                >
                                    <span>定向彩图占比</span>
                                </th>
                                <td className="rest">
                                    {toPercent(
                                        this.props.data.direct_ur_blp /
                                            this.props.data.ur_blp,
                                        2
                                    )}
                                </td>
                            </tr>
                            <tr className="row">
                                <th
                                    className={
                                        this.state.ue_status
                                            ? "desct select"
                                            : "desct noneSelect"
                                    }
                                    onClick={() => this.objSelect("ue_status")}
                                >
                                    <span>彩装产出</span>
                                </th>
                                <td className="rest">
                                    {this.props.data.ur_equip.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PResult;
