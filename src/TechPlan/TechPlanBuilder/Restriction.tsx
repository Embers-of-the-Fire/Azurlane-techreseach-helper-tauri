import React, { createRef } from "react";
import "antd/dist/reset.css";
import {
    InputNumber,
    Space,
    Switch,
    Select,
    Typography,
    Button,
    TourStepProps,
    Tour,
} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

interface Rest {
    value: number;
    status: boolean;
    strict: boolean;
}

interface State {
    doubloon: Rest;
    cube: Rest;
    ssr_blp: Rest;
    ur_blp: Rest;
    ur_equip: Rest;
    cogn_chip: Rest;
    time: Rest;
    limit: number;
    finished_former_ship: number;
    finished_ssr_ship: number;
    finished_ur_ship: number;
    // Here mode `true` for `PerformanceMode::PureIncome`, `false` for `PerformanceMode::CostPerformance`.
    mode: boolean;
    tour_open: boolean;
    tour_steps: TourStepProps[];
}

class Restriction extends React.Component<{}, State> {
    tour_ref: {
        rest_on: React.RefObject<any>;
        rest_value: React.RefObject<any>;
        rest_mode: React.RefObject<any>;
        calc_mode: React.RefObject<any>;
    };
    constructor(props: any) {
        super(props);
        this.tour_ref = {
            rest_on: createRef<any>(),
            rest_value: createRef<any>(),
            rest_mode: createRef<any>(),
            calc_mode: createRef<any>(),
        };
        this.state = {
            doubloon: {
                value: 0.0,
                status: false,
                strict: false,
            },
            cube: {
                value: 0.0,
                status: false,
                strict: false,
            },
            ssr_blp: {
                value: 0.0,
                status: false,
                strict: false,
            },
            ur_blp: {
                value: 0.0,
                status: false,
                strict: false,
            },
            ur_equip: {
                value: 0.0,
                status: false,
                strict: false,
            },
            cogn_chip: {
                value: 0.0,
                status: false,
                strict: false,
            },
            time: {
                value: 0.0,
                status: false,
                strict: false,
            },
            limit: 10,
            finished_former_ship: 10,
            finished_ur_ship: 2,
            finished_ssr_ship: 3,
            mode: true,
            tour_open: false,
            tour_steps: [
                {
                    title: "限制条目",
                    description: "这里可以设置是否启用对应的限制条目",
                    target: this.tour_ref.rest_on.current,
                },
                {
                    title: "约束条件",
                    description: "这里可以设定启用的限制条目的约束条件",
                    target: this.tour_ref.rest_value.current,
                },
                {
                    title: "约束模式",
                    description: (
                        <div>
                            这里可以设定启用的限制条目的约束模式
                            <br />
                            <b>宽松</b>
                            模式会对超出部分施加权重。例如，超出20%将会使消耗参考值额外增加20%（数据仅作参考，不代表实际数据）。
                            <br />
                            <b>严格</b>
                            模式会直接舍弃超出该约束的方案序列，仅在确实存在如此严苛的条件时才考虑使用该模式。
                        </div>
                    ),
                    target: this.tour_ref.rest_mode.current,
                },
                {
                    title: "计算模式",
                    description: (
                        <div>
                            这里可以设定科研策略规划的计算模式
                            <br />
                            <b>净收入</b>
                            模式将会比对项目投入与产出，根据绝对差进行排序。
                            <br />
                            <b>性价比</b>
                            模式将会比对项目投入与产出的相对量，根据比值进行排序。
                        </div>
                    ),
                    target: this.tour_ref.calc_mode.current,
                },
            ],
        };
    }
    setTourOpen(v: boolean) {
        if (v === true) {
            this.setState({
                tour_open: true,
                tour_steps: [
                    {
                        title: "限制条目",
                        description: "这里可以设置是否启用对应的限制条目",
                        target: this.tour_ref.rest_on.current,
                    },
                    {
                        title: "约束条件",
                        description: "这里可以设定启用的限制条目的约束条件",
                        target: this.tour_ref.rest_value.current,
                    },
                    {
                        title: "约束模式",
                        description: (
                            <div>
                                这里可以设定启用的限制条目的约束模式
                                <br />
                                <b>宽松</b>
                                模式会对超出部分施加权重。例如，超出20%将会使消耗参考值额外增加20%（数据仅作参考，不代表实际数据）。
                                <br />
                                <b>严格</b>
                                模式会直接舍弃超出该约束的方案序列，仅在确实存在如此严苛的条件时才考虑使用该模式。
                            </div>
                        ),
                        target: this.tour_ref.rest_mode.current,
                    },
                    {
                        title: "计算模式",
                        description: (
                            <div>
                                这里可以设定科研策略规划的计算模式
                                <br />
                                <b>净收入</b>
                                模式将会比对项目投入与产出，根据绝对差进行排序。
                                <br />
                                <b>性价比</b>
                                模式将会比对项目投入与产出的相对量，根据比值进行排序。
                            </div>
                        ),
                        target: this.tour_ref.calc_mode.current,
                    },
                ],
            });
        } else {
            this.setState({
                tour_open: false,
            });
        }
    }
    getData() {
        return this.state;
    }
    setDoubloon(value: number) {
        const s = this.state.doubloon.status;
        const ss = this.state.doubloon.strict;
        this.setState({
            doubloon: {
                value: value,
                status: s,
                strict: ss,
            },
        });
    }
    setDoubloonStatus(status: boolean) {
        const v = this.state.doubloon.value;
        const ss = this.state.doubloon.strict;
        if (status === true) {
            this.setState({
                doubloon: {
                    value: v,
                    status: true,
                    strict: ss,
                },
            });
        } else if (status === false) {
            this.setState({
                doubloon: {
                    value: v,
                    status: false,
                    strict: ss,
                },
            });
        }
    }
    setDoubloonStrict(strict: boolean) {
        const d = this.state.doubloon;
        if (strict === true) {
            this.setState({
                doubloon: {
                    value: d.value,
                    status: d.status,
                    strict: true,
                },
            });
        } else {
            this.setState({
                doubloon: {
                    value: d.value,
                    status: d.status,
                    strict: false,
                },
            });
        }
    }
    setCube(value: number) {
        const s = this.state.cube.status;
        const ss = this.state.cube.strict;
        this.setState({
            cube: {
                value: value,
                status: s,
                strict: ss,
            },
        });
    }
    setCubeStatus(status: boolean) {
        const v = this.state.cube.value;
        const ss = this.state.cube.strict;
        if (status === true) {
            this.setState({
                cube: {
                    value: v,
                    status: true,
                    strict: ss,
                },
            });
        } else if (status === false) {
            this.setState({
                cube: {
                    value: v,
                    status: false,
                    strict: ss,
                },
            });
        }
    }
    setCubeStrict(strict: boolean) {
        const d = this.state.cube;
        if (strict === true) {
            this.setState({
                cube: {
                    value: d.value,
                    status: d.status,
                    strict: true,
                },
            });
        } else {
            this.setState({
                cube: {
                    value: d.value,
                    status: d.status,
                    strict: false,
                },
            });
        }
    }
    setSsrBlp(value: number) {
        const s = this.state.ssr_blp.status;
        const ss = this.state.ssr_blp.strict;
        this.setState({
            ssr_blp: {
                value: value,
                status: s,
                strict: ss,
            },
        });
    }
    setSsrBlpStatus(status: boolean) {
        const v = this.state.ssr_blp.value;
        const ss = this.state.ssr_blp.strict;
        if (status === true) {
            this.setState({
                ssr_blp: {
                    value: v,
                    status: true,
                    strict: ss,
                },
            });
        } else if (status === false) {
            this.setState({
                ssr_blp: {
                    value: v,
                    status: false,
                    strict: ss,
                },
            });
        }
    }
    setSsrBlpStrict(strict: boolean) {
        const d = this.state.ssr_blp;
        if (strict === true) {
            this.setState({
                ssr_blp: {
                    value: d.value,
                    status: d.status,
                    strict: true,
                },
            });
        } else {
            this.setState({
                ssr_blp: {
                    value: d.value,
                    status: d.status,
                    strict: false,
                },
            });
        }
    }
    setUrBlp(value: number) {
        const s = this.state.ur_blp.status;
        const ss = this.state.ur_blp.strict;
        this.setState({
            ur_blp: {
                value: value,
                status: s,
                strict: ss,
            },
        });
    }
    setUrBlpStatus(status: boolean) {
        const v = this.state.ur_blp.value;
        const ss = this.state.ur_blp.strict;
        if (status === true) {
            this.setState({
                ur_blp: {
                    value: v,
                    status: true,
                    strict: ss,
                },
            });
        } else if (status === false) {
            this.setState({
                ur_blp: {
                    value: v,
                    status: false,
                    strict: ss,
                },
            });
        }
    }
    setUrBlpStrict(strict: boolean) {
        const d = this.state.ur_blp;
        if (strict === true) {
            this.setState({
                ur_blp: {
                    value: d.value,
                    status: d.status,
                    strict: true,
                },
            });
        } else {
            this.setState({
                ur_blp: {
                    value: d.value,
                    status: d.status,
                    strict: false,
                },
            });
        }
    }
    setUrEquip(value: number) {
        const s = this.state.ur_equip.status;
        const ss = this.state.ur_equip.strict;
        this.setState({
            ur_equip: {
                value: value,
                status: s,
                strict: ss,
            },
        });
    }
    setUrEquipStatus(status: boolean) {
        const v = this.state.ur_equip.value;
        const ss = this.state.ur_equip.strict;
        if (status === true) {
            this.setState({
                ur_equip: {
                    value: v,
                    status: true,
                    strict: ss,
                },
            });
        } else if (status === false) {
            this.setState({
                ur_equip: {
                    value: v,
                    status: false,
                    strict: ss,
                },
            });
        }
    }
    setUrEquipStrict(strict: boolean) {
        const d = this.state.ur_equip;
        if (strict === true) {
            this.setState({
                ur_equip: {
                    value: d.value,
                    status: d.status,
                    strict: true,
                },
            });
        } else {
            this.setState({
                ur_equip: {
                    value: d.value,
                    status: d.status,
                    strict: false,
                },
            });
        }
    }
    setCognChip(value: number) {
        const s = this.state.cogn_chip.status;
        const ss = this.state.cogn_chip.strict;
        this.setState({
            cogn_chip: {
                value: value,
                status: s,
                strict: ss,
            },
        });
    }
    setCognChipStatus(status: boolean) {
        const v = this.state.cogn_chip.value;
        const ss = this.state.cogn_chip.strict;
        if (status === true) {
            this.setState({
                cogn_chip: {
                    value: v,
                    status: true,
                    strict: ss,
                },
            });
        } else if (status === false) {
            this.setState({
                cogn_chip: {
                    value: v,
                    status: false,
                    strict: ss,
                },
            });
        }
    }
    setCognChipStrict(strict: boolean) {
        const d = this.state.cogn_chip;
        if (strict === true) {
            this.setState({
                cogn_chip: {
                    value: d.value,
                    status: d.status,
                    strict: true,
                },
            });
        } else {
            this.setState({
                cogn_chip: {
                    value: d.value,
                    status: d.status,
                    strict: false,
                },
            });
        }
    }
    setTimeLimit(value: number) {
        const s = this.state.time.status;
        const ss = this.state.time.strict;
        this.setState({
            time: {
                value: value,
                status: s,
                strict: ss,
            },
        });
    }
    setTimeLimitStatus(status: boolean) {
        const v = this.state.time.value;
        const ss = this.state.time.strict;
        if (status === true) {
            this.setState({
                time: {
                    value: v,
                    status: true,
                    strict: ss,
                },
            });
        } else if (status === false) {
            this.setState({
                time: {
                    value: v,
                    status: false,
                    strict: ss,
                },
            });
        }
    }
    setTimeLimitStrict(strict: boolean) {
        const d = this.state.time;
        if (strict === true) {
            this.setState({
                time: {
                    value: d.value,
                    status: d.status,
                    strict: true,
                },
            });
        } else {
            this.setState({
                time: {
                    value: d.value,
                    status: d.status,
                    strict: false,
                },
            });
        }
    }
    setLimit(value: number) {
        this.setState({
            limit: value,
        });
    }
    setFormerShip(value: number) {
        this.setState({
            finished_former_ship: value,
        });
    }
    setUrShip(value: number) {
        this.setState({
            finished_ur_ship: value,
        });
    }
    setSsrShip(value: number) {
        this.setState({
            finished_ssr_ship: value,
        });
    }
    render() {
        return (
            <>
                <Tour
                    open={this.state.tour_open}
                    steps={this.state.tour_steps}
                    onClose={() => this.setTourOpen(false)}
                />
                <Title level={4} style={{ marginTop: "20px" }}>
                    策略限制
                    <Button
                        icon={<QuestionCircleOutlined />}
                        type="text"
                        onClick={() => this.setTourOpen(true)}
                        style={{
                            marginLeft: "10px",
                        }}
                    />
                </Title>
                <div className="restriction-container">
                    <Space.Compact block>
                        <InputNumber
                            ref={this.tour_ref.rest_value}
                            addonBefore={
                                <div ref={this.tour_ref.rest_on}>
                                    <Space align="center">
                                        <Switch
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={
                                                <CloseOutlined />
                                            }
                                            defaultChecked={false}
                                            onChange={(checked) =>
                                                this.setDoubloonStatus(checked)
                                            }
                                        />
                                        <label>物资</label>
                                    </Space>
                                </div>
                            }
                            addonAfter={
                                <div ref={this.tour_ref.rest_mode}>
                                    <Select
                                        defaultValue={false}
                                        onChange={(value) =>
                                            this.setDoubloonStrict(value)
                                        }
                                    >
                                        <Option value={true}>严格</Option>
                                        <Option value={false}>宽松</Option>
                                    </Select>
                                </div>
                            }
                            style={{ width: "100%" }}
                            min={0}
                            max={50000}
                            defaultValue={0}
                            step={0.01}
                            disabled={!this.state.doubloon.status}
                            value={this.state.doubloon.value}
                            onChange={(value) =>
                                value !== null ? this.setDoubloon(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            addonBefore={
                                <Space align="center">
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        defaultChecked={false}
                                        onChange={(checked) =>
                                            this.setCubeStatus(checked)
                                        }
                                    />
                                    <label>魔方</label>
                                </Space>
                            }
                            addonAfter={
                                <Select
                                    defaultValue={false}
                                    onChange={(value) =>
                                        this.setCubeStrict(value)
                                    }
                                >
                                    <Option value={true}>严格</Option>
                                    <Option value={false}>宽松</Option>
                                </Select>
                            }
                            style={{ width: "100%" }}
                            min={0}
                            max={50000}
                            defaultValue={0}
                            step={0.01}
                            disabled={!this.state.cube.status}
                            value={this.state.cube.value}
                            onChange={(value) =>
                                value !== null ? this.setCube(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            addonBefore={
                                <Space align="center">
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        defaultChecked={false}
                                        onChange={(checked) =>
                                            this.setSsrBlpStatus(checked)
                                        }
                                    />
                                    <label>金图</label>
                                </Space>
                            }
                            addonAfter={
                                <Select
                                    defaultValue={false}
                                    onChange={(value) =>
                                        this.setSsrBlpStrict(value)
                                    }
                                >
                                    <Option value={true}>严格</Option>
                                    <Option value={false}>宽松</Option>
                                </Select>
                            }
                            style={{ width: "100%" }}
                            min={0}
                            max={50000}
                            defaultValue={0}
                            step={0.01}
                            disabled={!this.state.ssr_blp.status}
                            value={this.state.ssr_blp.value}
                            onChange={(value) =>
                                value !== null ? this.setSsrBlp(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            addonBefore={
                                <Space align="center">
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        defaultChecked={false}
                                        onChange={(checked) =>
                                            this.setUrBlpStatus(checked)
                                        }
                                    />
                                    <label>彩图</label>
                                </Space>
                            }
                            addonAfter={
                                <Select
                                    defaultValue={false}
                                    onChange={(value) =>
                                        this.setUrBlpStrict(value)
                                    }
                                >
                                    <Option value={true}>严格</Option>
                                    <Option value={false}>宽松</Option>
                                </Select>
                            }
                            style={{ width: "100%" }}
                            min={0}
                            max={50000}
                            defaultValue={0}
                            step={0.01}
                            disabled={!this.state.ur_blp.status}
                            value={this.state.ur_blp.value}
                            onChange={(value) =>
                                value !== null ? this.setUrBlp(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            addonBefore={
                                <Space align="center">
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        defaultChecked={false}
                                        onChange={(checked) =>
                                            this.setUrEquipStatus(checked)
                                        }
                                    />
                                    <label>彩装</label>
                                </Space>
                            }
                            addonAfter={
                                <Select
                                    defaultValue={false}
                                    onChange={(value) =>
                                        this.setUrEquipStrict(value)
                                    }
                                >
                                    <Option value={true}>严格</Option>
                                    <Option value={false}>宽松</Option>
                                </Select>
                            }
                            style={{ width: "100%" }}
                            min={0}
                            max={50000}
                            defaultValue={0}
                            step={0.01}
                            disabled={!this.state.ur_equip.status}
                            value={this.state.ur_equip.value}
                            onChange={(value) =>
                                value !== null ? this.setUrEquip(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            addonBefore={
                                <Space align="center">
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        defaultChecked={false}
                                        onChange={(checked) =>
                                            this.setCognChipStatus(checked)
                                        }
                                    />
                                    <label>心智</label>
                                </Space>
                            }
                            addonAfter={
                                <Select
                                    defaultValue={false}
                                    onChange={(value) =>
                                        this.setCognChipStrict(value)
                                    }
                                >
                                    <Option value={true}>严格</Option>
                                    <Option value={false}>宽松</Option>
                                </Select>
                            }
                            style={{ width: "100%" }}
                            min={0}
                            max={50000}
                            defaultValue={0}
                            step={0.01}
                            disabled={!this.state.cogn_chip.status}
                            value={this.state.cogn_chip.value}
                            onChange={(value) =>
                                value !== null ? this.setCognChip(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            addonBefore={
                                <Space align="center">
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        defaultChecked={false}
                                        onChange={(checked) =>
                                            this.setTimeLimitStatus(checked)
                                        }
                                    />
                                    <label>在线时间</label>
                                </Space>
                            }
                            addonAfter={
                                <Select
                                    defaultValue={false}
                                    onChange={(value) =>
                                        this.setTimeLimitStrict(value)
                                    }
                                >
                                    <Option value={true}>严格</Option>
                                    <Option value={false}>宽松</Option>
                                </Select>
                            }
                            style={{ width: "100%" }}
                            min={0}
                            max={24}
                            defaultValue={12}
                            step={0.01}
                            disabled={!this.state.time.status}
                            value={this.state.time.value}
                            onChange={(value) =>
                                value !== null ? this.setTimeLimit(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonBefore="选取科研数量"
                            min={1}
                            max={30}
                            defaultValue={10}
                            step={1}
                            value={this.state.limit}
                            onChange={(value) =>
                                value !== null ? this.setLimit(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonBefore="3-4期科研船毕业数量"
                            min={0}
                            max={10}
                            defaultValue={10}
                            step={1}
                            value={this.state.finished_former_ship}
                            onChange={(value) =>
                                value !== null
                                    ? this.setFormerShip(value)
                                    : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonBefore="5期科研金船毕业数量"
                            min={0}
                            max={3}
                            defaultValue={3}
                            step={1}
                            value={this.state.finished_ssr_ship}
                            onChange={(value) =>
                                value !== null ? this.setSsrShip(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonBefore="5期科研彩船毕业数量"
                            min={0}
                            max={2}
                            defaultValue={2}
                            step={1}
                            value={this.state.finished_ur_ship}
                            onChange={(value) =>
                                value !== null ? this.setUrShip(value) : null
                            }
                        />
                    </Space.Compact>
                    <Space.Compact block>
                        <div ref={this.tour_ref.calc_mode} style={{width: "100%"}}>
                            <Select
                                defaultValue={true}
                                onChange={(value) =>
                                    this.setState({ mode: value })
                                }
                                style={{ width: "100%", textAlign: "center" }}
                            >
                                <Option value={true}>排序方式 - 净收入</Option>
                                <Option value={false}>排序方式 - 性价比</Option>
                            </Select>
                        </div>
                    </Space.Compact>
                </div>
            </>
        );
    }
}

export default Restriction;
