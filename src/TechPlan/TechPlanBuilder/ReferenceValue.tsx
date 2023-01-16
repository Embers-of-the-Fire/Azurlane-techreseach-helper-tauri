import React from "react";
import "antd/dist/reset.css";
import { Button, InputNumber, Select, Space } from "antd";

interface UrStatus {
    actual: number;
    refer: number;
    input_status: boolean;
    input: number;
}

interface State {
    doubloon: number;
    cube: number;
    ssr_blp: number;
    ur_blp: UrStatus;
    ur_equip: UrStatus;
    cogn_chip: number;
}

const { Option } = Select;

class ReferenceValue extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            doubloon: 0.5,
            cube: 1000.0,
            ssr_blp: 1200.0,
            ur_blp: {
                actual: 3000.0,
                refer: 2.5,
                input_status: true,
                input: 3000.0,
            },
            ur_equip: {
                actual: 36000.0,
                refer: 12,
                input_status: true,
                input: 36000.0,
            },
            cogn_chip: 60.0,
        };
    }
    getData() {
        return {
            doubloon: this.state.doubloon,
            cube: this.state.cube,
            ssr_blp: this.state.ssr_blp,
            ur_blp: this.state.ur_blp.actual,
            ur_equip: this.state.ur_equip.actual,
            cogn_chip: this.state.cogn_chip,
        };
    }
    setDoubloon(value: number) {
        this.setState({
            doubloon: value,
        });
    }
    setCube(value: number) {
        this.setState({
            cube: value,
        });
    }
    setSsrBlp(value: number) {
        this.setState({
            ssr_blp: value,
        });
    }
    setUrBlp(value: number) {
        // status: true for `actual`, false for `refer`.
        // See `constructor`.
        const ipts = this.state.ur_blp.input_status;
        const sv = this.state.ssr_blp;
        let acl = this.state.ur_blp.actual;
        if (this.state.ur_blp.input_status === true) {
            this.setState({
                ur_blp: {
                    actual: value,
                    refer: parseFloat((value / sv).toFixed(2)),
                    input: value,
                    input_status: ipts,
                },
            });
            acl = value;
        } else {
            this.setState({
                ur_blp: {
                    actual: parseFloat((sv * value).toFixed(2)),
                    refer: value,
                    input: value,
                    input_status: ipts,
                },
            });
            acl = parseFloat((sv * value).toFixed(2));
        }
        let d = this.state.ur_equip;
        if (this.state.ur_equip.input_status === true) {
            d.refer = parseFloat((d.actual / acl).toFixed(2));
        } else {
            d.actual = parseFloat((d.refer * acl).toFixed(2));
        }
        this.setState({
            ur_equip: d,
        });
    }
    setUrEquip(value: number) {
        // same as `setUrBlp`
        const ipts = this.state.ur_equip.input_status;
        const sv = this.state.ur_equip.actual;
        if (this.state.ur_equip.input_status === true) {
            this.setState({
                ur_equip: {
                    actual: value,
                    refer: value / sv,
                    input: value,
                    input_status: ipts,
                },
            });
        } else {
            this.setState({
                ur_equip: {
                    actual: sv * value,
                    input: value,
                    input_status: ipts,
                    refer: value,
                },
            });
        }
    }
    setCognChip(value: number) {
        this.setState({
            cogn_chip: value,
        });
    }
    changeUrBlpStatus(status: boolean) {
        if (status === true) {
            const v = this.state.ur_blp.actual;
            let udat = this.state.ur_blp;
            udat.input = v;
            udat.input_status = true;
            this.setState({
                ur_blp: udat,
            });
        } else {
            const v = this.state.ur_blp.refer;
            let udat = this.state.ur_blp;
            udat.input = v;
            udat.input_status = false;
            this.setState({
                ur_blp: udat,
            });
        }
    }
    changeUrEquipStatus(status: boolean) {
        if (status === true) {
            const v = this.state.ur_equip.actual;
            let udat = this.state.ur_equip;
            udat.input = v;
            udat.input_status = true;
            this.setState({
                ur_equip: udat,
            });
        } else {
            const v = this.state.ur_equip.refer;
            let udat = this.state.ur_equip;
            udat.input = v;
            udat.input_status = false;
            this.setState({
                ur_equip: udat,
            });
        }
    }
    defaultUrBlp() {
        const st = this.state.ur_blp.input_status;
        this.setState({
            ur_blp: {
                actual: 3000.0,
                refer: 2.5,
                input: st ? 3000.0 : 2.5,
                input_status: st,
            },
        });
    }
    defaultUrEquip() {
        const st = this.state.ur_equip.input_status;
        this.setState({
            ur_equip: {
                actual: 36000.0,
                refer: 12.0,
                input: st ? 36000.0 : 12.0,
                input_status: st,
            },
        });
    }
    render() {
        return (
            <div id="reference-value-container">
                <Space.Compact block>
                    <InputNumber
                        style={{ width: "100%" }}
                        addonBefore="物资"
                        min={0}
                        max={50000}
                        step={0.01}
                        value={this.state.doubloon}
                        onChange={(value) => value!==null?this.setDoubloon(value):null}
                    />
                    <Button
                        type="default"
                        danger={true}
                        onClick={() => this.setDoubloon(0.5)}
                    >
                        重置
                    </Button>
                </Space.Compact>
                <Space.Compact block>
                    <InputNumber
                        style={{ width: "100%" }}
                        addonBefore="魔方"
                        min={0}
                        max={50000}
                        step={0.01}
                        value={this.state.cube}
                        onChange={(value) => value!==null?this.setCube(value):null}
                    />
                    <Button
                        type="default"
                        danger={true}
                        onClick={() => this.setCube(1000)}
                    >
                        重置
                    </Button>
                </Space.Compact>
                <Space.Compact block>
                    <InputNumber
                        style={{ width: "100%" }}
                        addonBefore="金图"
                        min={0}
                        max={50000}
                        step={0.01}
                        value={this.state.ssr_blp}
                        onChange={(value) => value!==null?this.setSsrBlp(value):null}
                    />
                    <Button
                        type="default"
                        danger={true}
                        onClick={() => this.setSsrBlp(1200)}
                    >
                        重置
                    </Button>
                </Space.Compact>
                <Space.Compact block>
                    <InputNumber
                        style={{ width: "100%" }}
                        addonBefore={
                            <Select
                                defaultValue={true}
                                onChange={(value) =>
                                    this.changeUrBlpStatus(value)
                                }
                            >
                                <Option value={true}>彩图绝对价值</Option>
                                <Option value={false}>彩图相对金图</Option>
                            </Select>
                        }
                        min={0}
                        max={50000}
                        step={0.01}
                        value={this.state.ur_blp.input}
                        onChange={(value) => value!==null?this.setUrBlp(value):null}
                    />
                    <Button
                        type="default"
                        danger={true}
                        onClick={() => this.defaultUrBlp()}
                    >
                        重置
                    </Button>
                </Space.Compact>
                <Space.Compact block>
                    <InputNumber
                        style={{ width: "100%" }}
                        addonBefore={
                            <Select
                                defaultValue={true}
                                onChange={(value) =>
                                    this.changeUrEquipStatus(value)
                                }
                            >
                                <Option value={true}>彩装绝对价值</Option>
                                <Option value={false}>彩装相对彩图</Option>
                            </Select>
                        }
                        min={0}
                        max={50000}
                        step={0.01}
                        value={this.state.ur_equip.input}
                        onChange={(value) => value!==null?this.setUrEquip(value):null}
                    />
                    <Button
                        type="default"
                        danger={true}
                        onClick={() => this.defaultUrEquip()}
                    >
                        重置
                    </Button>
                </Space.Compact>
                <Space.Compact block>
                    <InputNumber
                        style={{ width: "100%" }}
                        addonBefore="心智"
                        min={0}
                        max={50000}
                        step={0.01}
                        value={this.state.cogn_chip}
                        onChange={(value) => value!==null?this.setCognChip(value):null}
                    />
                    <Button
                        type="default"
                        danger={true}
                        onClick={() => this.setCognChip(60)}
                    >
                        重置
                    </Button>
                </Space.Compact>
            </div>
        );
    }
}

export default ReferenceValue;
