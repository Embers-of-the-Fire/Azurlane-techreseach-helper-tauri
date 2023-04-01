import React from "react";
import "antd/dist/reset.css";
import { IptMeta, Rest } from "../../../TechPlanBuilder/metafns";
import "./Meta.css";

interface Props {
    style?: React.CSSProperties;
    metaData: IptMeta;
}

const showRest = (v: Rest): string => {
    if (v.status === false) return "未限制";
    if (v.strict === true) return v.value.toFixed(2) + " / 严格";
    else return v.value.toFixed(2) + " / 宽松";
};

class MetaShower extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div
                style={{
                    ...this.props.style,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            width: "40%",
                            padding: "1em 10px 0 10px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div style={{ height: "1.5em", marginBottom: "0.8em" }}>
                            <span
                                style={{
                                    fontSize: "1.2em",
                                    color: "rgba(0, 0, 0, 0.88)",
                                }}
                            >
                                <b>参考价值</b>
                            </span>
                        </div>
                        <div
                            className="pmetaref"
                            style={{
                                width: "100%",
                                flex: 1,
                                border: "1px solid rgba(5, 5, 5, 0.06)",
                                borderRadius: "8px",
                            }}
                        >
                            <table style={{ height: "100%", width: "100%" }}>
                                <tbody>
                                    <tr className="row">
                                        <th
                                            style={{ width: "50%" }}
                                            className="desc"
                                        >
                                            <span>物资</span>
                                        </th>
                                        <td
                                            style={{ width: "50%" }}
                                            className="value"
                                        >
                                            <span>
                                                {
                                                    this.props.metaData
                                                        .reference.doubloon
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="desc">
                                            <span>魔方</span>
                                        </th>
                                        <td className="value">
                                            <span>
                                                {
                                                    this.props.metaData
                                                        .reference.cube
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="desc">
                                            <span>金图</span>
                                        </th>
                                        <td className="value">
                                            <span>
                                                {
                                                    this.props.metaData
                                                        .reference.ssr_blp
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="desc">
                                            <span>彩图</span>
                                        </th>
                                        <td className="value">
                                            <span>
                                                {
                                                    this.props.metaData
                                                        .reference.ur_blp
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="desc">
                                            <span>彩装</span>
                                        </th>
                                        <td className="value">
                                            <span>
                                                {
                                                    this.props.metaData
                                                        .reference.ur_equip
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="desc">
                                            <span>心智</span>
                                        </th>
                                        <td className="value">
                                            <span>
                                                {
                                                    this.props.metaData
                                                        .reference.cogn_chip
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        style={{
                            width: "60%",
                            height: "100%",
                            padding: "1em 10px 0 10px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div style={{ height: "1.5em", marginBottom: "0.8em" }}>
                            <span
                                style={{
                                    fontSize: "1.2em",
                                    color: "rgba(0, 0, 0, 0.88)",
                                }}
                            >
                                <b>策略限制</b>
                            </span>
                        </div>
                        <div
                            className="pmetarest"
                            style={{
                                width: "100%",
                                flex: 1,
                                border: "1px solid rgba(5, 5, 5, 0.06)",
                                borderRadius: "8px",
                            }}
                        >
                            <table style={{ height: "100%", width: "100%" }}>
                                <tbody>
                                    <tr className="row">
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            物资
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {showRest(
                                                this.props.metaData.restriction
                                                    .doubloon
                                            )}
                                        </td>
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            魔方
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {showRest(
                                                this.props.metaData.restriction
                                                    .cube
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            金图
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {showRest(
                                                this.props.metaData.restriction
                                                    .ssr_blp
                                            )}
                                        </td>
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            彩图
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {showRest(
                                                this.props.metaData.restriction
                                                    .ur_blp
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            彩装
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {showRest(
                                                this.props.metaData.restriction
                                                    .ur_equip
                                            )}
                                        </td>
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            心智
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {showRest(
                                                this.props.metaData.restriction
                                                    .cogn_chip
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            在线时间
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {showRest(
                                                this.props.metaData.restriction
                                                    .time
                                            )}
                                        </td>
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            选取限制
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {
                                                this.props.metaData.restriction
                                                    .limit
                                            }
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            3~4期毕业船数
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {
                                                this.props.metaData.restriction
                                                    .finished_former_ship
                                            }
                                        </td>
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            5期毕业金船数
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {
                                                this.props.metaData.restriction
                                                    .finished_ssr_ship
                                            }
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            5期毕业彩船数
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {
                                                this.props.metaData.restriction
                                                    .finished_ur_ship
                                            }
                                        </td>
                                        <th
                                            style={{
                                                width: "30%",
                                            }}
                                            className="desc"
                                        >
                                            排序方式
                                        </th>
                                        <td
                                            style={{ width: "20%" }}
                                            className="value"
                                        >
                                            {this.props.metaData.restriction
                                                .mode
                                                ? "净收入"
                                                : "性价比"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MetaShower;
