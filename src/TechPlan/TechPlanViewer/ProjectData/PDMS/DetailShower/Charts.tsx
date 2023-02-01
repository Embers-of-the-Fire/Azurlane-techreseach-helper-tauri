import React from "react";
import "antd/dist/reset.css";
import EChartsReact from "echarts-for-react";
import { into_name, SelectType, ShowType } from "../../selection";
import Walden from "../../../../../echarts.config";
import { get_product_value_from, ProductMeta } from "./product";
import { PROJECT_NAME } from "../../../../../static_data";

interface PieProps {
    style?: React.CSSProperties;
    dataset?: {
        value: number;
        name: string;
    }[];
}

const into_pie_chart_dataset = (
    s: SelectType | undefined,
    dataset: ProductMeta | undefined
): {
    value: number;
    name: string;
}[] => {
    if (dataset === undefined) return [];
    if (s === undefined) return [];
    let res: { value: number; name: string }[] = [];
    for (let i = 0; i < dataset.nodes.length; i++) {
        let d = dataset.nodes[i];
        let num = get_product_value_from(d, s);
        if (num === undefined || num - 0 <= 0.00001) continue;
        res.push({
            value: num,
            name: PROJECT_NAME[d.id],
        });
    }
    res.sort((a, b) => b.value - a.value);
    return res;
};

class PieChart extends React.Component<PieProps> {
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <EChartsReact
                    style={{
                        height: "100%",
                    }}
                    option={{
                        tooltip: {
                            trigger: "item",
                        },
                        legend: {
                            type: "scroll",
                            orient: "vertical",
                            right: 10,
                            top: 20,
                            bottom: 20,
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: { show: true },
                                restore: { show: true },
                                saveAsImage: { show: true },
                            },
                        },
                        series: [
                            {
                                name: "",
                                type: "pie",
                                radius: ["40%", "70%"],
                                avoidLabelOverlap: false,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: "#fff",
                                    borderWidth: 2,
                                },
                                label: {
                                    show: false,
                                    position: "center",
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        fontSize: 25,
                                        fontWeight: "bold",
                                    },
                                },
                                labelLine: {
                                    show: false,
                                },
                                data: this.props.dataset ?? [],
                            },
                        ],
                    }}
                    opts={{
                        renderer: "canvas",
                        height: "auto",
                        width: "auto",
                    }}
                    theme={Walden}
                    notMerge
                />
            </div>
        );
    }
}

interface BarProps {
    style?: React.CSSProperties;
    dataset: {
        value: number[];
        resource_type: string;
    }[];
    data_titles: string[];
}

const into_bar_chart_dataset = (
    s: SelectType[] | undefined,
    dataset: ProductMeta | undefined
): {
    ds: {
        value: number[];
        resource_type: string;
    }[];
    dt: string[];
} => {
    if (s === undefined || s.length === 0) return { ds: [], dt: [] };
    if (dataset === undefined) return { ds: [], dt: [] };
    // return res;
    let names: { s: string; t: SelectType }[] = [];
    let using_projs: string[] = [];
    let proj_val: number[][] = [];
    for (let i = 0; i < s.length; i++) {
        let ns = s[i];
        let name = into_name(ns);
        names.push({ s: name, t: ns });
    }
    for (let i = 0; i < dataset.nodes.length; i++) {
        let data = dataset.nodes[i];
        let _d: number[] = [];
        let _flag = false;
        for (let j = 0; j < names.length; j++) {
            let _value = get_product_value_from(data, names[j].t);
            if (_value === undefined) continue;
            if (_value > 0) _flag = true;
            _d.push(_value);
        }
        if (_flag === false) continue;
        proj_val.push(_d);
        using_projs.push(PROJECT_NAME[data.id]);
    }
    return {
        ds: names.map((v, idx) => {
            return {
                resource_type: v.s,
                value: proj_val.map((pjv) => pjv[idx]),
            };
        }),
        dt: using_projs,
    };
};

class BarChart extends React.Component<BarProps> {
    render(): React.ReactNode {
        return (
            <div style={this.props.style}>
                <EChartsReact
                    style={{ height: "100%" }}
                    option={{
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow",
                            },
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                restore: { show: true },
                                saveAsImage: { show: true },
                                mark: { show: true },
                                dataZoom: { show: true },
                            },
                        },
                        legend: {
                            textStyle: {
                                fontSize: 18,
                            },
                        },
                        xAxis: [
                            {
                                type: "value",
                            },
                        ],
                        yAxis: [
                            {
                                type: "category",
                                data: this.props.data_titles,
                            },
                        ],
                        series: this.props.dataset?.map((v) => {
                            return {
                                name: v.resource_type,
                                type: "bar",
                                stack: "total",
                                emphasis: {
                                    focus: "series",
                                },
                                data: v.value,
                            };
                        }),
                    }}
                    opts={{
                        renderer: "canvas",
                        height: "auto",
                        width: "auto",
                    }}
                    theme={Walden}
                />
            </div>
        );
    }
}

const shouldMountPieChart = (
    vs: { show_type: ShowType; select: string[] } | undefined
): boolean => {
    if (
        vs === undefined ||
        vs.show_type === ShowType.TimeUse ||
        vs.select.length <= 1
    ) {
        return true;
    } else {
        return false;
    }
};

interface Props {
    style?: React.CSSProperties;
    viewSelect: { show_type: ShowType; select: SelectType[] } | undefined;
    dataset: ProductMeta | undefined;
}

class Chart extends React.Component<Props> {
    render(): React.ReactNode {
        let r = shouldMountPieChart(this.props.viewSelect);
        if (r === true)
            return (
                <div style={this.props.style}>
                    <PieChart
                        dataset={into_pie_chart_dataset(
                            this.props.viewSelect?.select[0],
                            this.props.dataset
                        )}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            );
        else {
            let dst = into_bar_chart_dataset(
                this.props.viewSelect?.select,
                this.props.dataset
            );
            return (
                <div style={this.props.style}>
                    <BarChart
                        dataset={dst.ds}
                        data_titles={dst.dt}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            );
        }
    }
}

export default Chart;
export { PieChart, BarChart };
