import React, { createRef } from "react";
import "antd/dist/reset.css";
import ReferenceValue from "./ReferenceValue";
import Restriction from "./Restriction";
import Result from "./Result/Result";
import {
    Button,
    ConfigProvider,
    Tour,
    Typography,
    Modal,
    TourStepProps,
    Form,
    FormInstance,
    Input,
    message,
} from "antd";
import {
    QuestionCircleTwoTone,
    SaveTwoTone,
    SettingTwoTone,
    SyncOutlined,
} from "@ant-design/icons";
import MetaDrawer from "./MetaRes";
import { invoke } from "@tauri-apps/api";
import { ResProps } from "./Result/Res/res/fns";
import { MetaData, SaveObj } from "./metafns";
import { MainPage } from "../MainInterface";

const { Title } = Typography;

interface Props {
    parentSpinning: (setting: boolean) => void;
    onSave: (data: SaveObj) => void;
}

interface State {
    dataset: {
        select: boolean;
        index: number;
        name: string;
        id: number;
    }[];
    average: ResProps;
    daily: ResProps;
    annual: ResProps;
    openTour: boolean;
    openDrawer: boolean;
    abr: MetaData;
    saveModalOpen: boolean;
    steps: TourStepProps[];
}

class TechPlanBuilder
    extends React.Component<Props, State>
    implements MainPage
{
    tour: {
        inputReferRef: React.RefObject<HTMLDivElement>;
        inputRestRef: React.RefObject<HTMLDivElement>;
        loadRef: React.RefObject<HTMLElement>;
        resultRef: React.RefObject<HTMLDivElement>;
        saveRef: React.RefObject<HTMLElement>;
        highlevelRef: React.RefObject<HTMLElement>;
    };
    refRefer: React.RefObject<ReferenceValue>;
    refRest: React.RefObject<Restriction>;
    refSaveModalForm: React.RefObject<FormInstance>;
    constructor(props: Props) {
        super(props);
        const v = {
            time: 0.0,
            doubloon: 0.0,
            cube: 0.0,
            ssr_blp: 0.0,
            direct_ssr_blp: 0.0,
            ur_blp: 0.0,
            direct_ur_blp: 0.0,
            cogn_chip: 0.0,
            ur_equip: 0.0,
        };
        this.tour = {
            inputReferRef: createRef<HTMLDivElement>(),
            inputRestRef: createRef<HTMLDivElement>(),
            loadRef: createRef(),
            resultRef: createRef(),
            saveRef: createRef(),
            highlevelRef: createRef(),
        };
        this.state = {
            dataset: new Array(29).fill(null).map((_, i) => {
                return {
                    select: true,
                    index: i,
                    name: "未知项目",
                    id: i,
                };
            }),
            average: v,
            daily: v,
            annual: v,
            openTour: false,
            openDrawer: false,
            abr: {
                generation: 1000,
                learn1: 2.0,
                learn2: 2.0,
                inertia_s: 0.8,
                inertia_e: 0.4,
                node_amo: 25,
                vmax: 0.2,
                thread_amo: 15,
            },
            saveModalOpen: false,
            steps: [
                {
                    title: "参考价值",
                    description: "修改不同物品资源的参考价值以决定优先顺序。",
                    target: this.tour.inputReferRef.current,
                },
                {
                    title: "限制条件",
                    description: "修改限制条件从而限制策略规划。",
                    target: this.tour.inputRestRef.current,
                },
                {
                    title: "规划策略",
                    description: "点击按钮进行策略规划。",
                    target: this.tour.loadRef.current,
                },
                {
                    title: "查看规划结论",
                    description:
                        "这里会显示规划的顺序的理论产出和规划后的科研项目优先顺序。灰色表示优先刷新。",
                    target: this.tour.resultRef.current,
                },
                {
                    title: "保存科研结论",
                    description:
                        "点击按钮保存科研策略，并进行复杂策略规划（见“科研结论”页）或进行分享/导出（见“规划共享”页）。",
                    target: this.tour.saveRef.current,
                },
                {
                    title: "高级设置",
                    description: "点击按钮以设置高级选项。",
                    target: this.tour.highlevelRef.current,
                    placement: "top",
                },
            ],
        };
        this.refRefer = createRef();
        this.refRest = createRef();
        this.refSaveModalForm = createRef();
    }
    update() {}
    startView() {}
    endView() {}
    plan() {
        let refer = this.refRefer.current?.getData();
        let rest = this.refRest.current?.getData();
        let abr = this.state.abr;
        // console.log(refer, rest, abr);
        this.props.parentSpinning(true);
        invoke<{
            dataset: {
                select: boolean;
                id: number;
                name: string;
                index: number;
            }[];
            average: ResProps;
            daily: ResProps;
            annual: ResProps;
        }>("pso_plan", { irefer: refer, irest: rest, imeta: abr })
            .then((response) => this.planResponse(response))
            .catch((err) => {
                console.error(err);
                message.error({
                    type: "error",
                    content: "啊哦！出错了",
                });
            });
    }
    planResponse(res: {
        dataset: {
            select: boolean;
            name: string;
            id: number;
            index: number;
        }[];
        average: ResProps;
        daily: ResProps;
        annual: ResProps;
    }) {
        this.setState({
            dataset: res.dataset,
            annual: res.annual,
            daily: res.daily,
            average: res.average,
        });
        this.props.parentSpinning(false);
    }
    save() {
        this.setState({
            saveModalOpen: true,
        });
    }
    modalInfo() {
        Modal.info({
            title: "提示",
            content: (
                <div>
                    <p>应用目前处于测试阶段，如果出现问题请联系作者报告。</p>
                    <p>
                        该应用如果并发量、迭代数或粒子数过多，可能产生短时间较高的CPU占用。如果发现占用过高，可以尝试调低高级选项中的相关选项。
                    </p>
                    <p>
                        联系方式:
                        <br />
                        &nbsp;&nbsp;QQ: 3562377918
                        <br />
                        &nbsp;&nbsp;BiliBili:&nbsp;
                        <a href="https://space.bilibili.com/526159315">
                            Bid:526159315
                        </a>
                        <br />
                        &nbsp;&nbsp;Github:&nbsp;
                        <a href="https://github.com/Embers-of-the-Fire/">
                            GitHub User
                        </a>
                        &nbsp;||&nbsp;
                        <a href="https://github.com/Embers-of-the-Fire/Azurlane-techreseach-helper-tauri">
                            GitHub Repo
                        </a>
                    </p>
                </div>
            ),
            onOk: () => {
                this.startTour();
            },
        });
    }
    question() {
        this.modalInfo();
    }
    closeTour() {
        this.setState({
            openTour: false,
        });
    }
    startTour() {
        this.setState(
            {
                steps: [
                    {
                        title: "参考价值",
                        description:
                            "修改不同物品资源的参考价值以决定优先顺序。",
                        target: this.tour.inputReferRef.current,
                    },
                    {
                        title: "限制条件",
                        description: "修改限制条件从而限制策略规划。",
                        target: this.tour.inputRestRef.current,
                    },
                    {
                        title: "规划策略",
                        description: "点击按钮进行策略规划。",
                        target: this.tour.loadRef.current,
                    },
                    {
                        title: "查看规划结论",
                        description:
                            "这里会显示规划的顺序的理论产出和规划后的科研项目优先顺序。灰色表示优先刷新。",
                        target: this.tour.resultRef.current,
                    },
                    {
                        title: "保存科研结论",
                        description:
                            "点击按钮保存科研策略，并进行复杂策略规划（见“科研结论”页）或进行分享/导出（见“规划共享”页）。",
                        target: this.tour.saveRef.current,
                    },
                    {
                        title: "高级设置",
                        description: "点击按钮以设置高级选项。",
                        target: this.tour.highlevelRef.current,
                        placement: "top",
                    },
                ],
            },
            () =>
                this.setState({
                    openTour: true,
                })
        );
    }
    closeDrawer() {
        this.setState({
            openDrawer: false,
        });
    }
    openDrawer() {
        this.setState({
            openDrawer: true,
        });
    }
    confirmModal() {
        this.refSaveModalForm.current?.submit();
    }
    confirmSaveModal() {
        const v: { planName: string; planDesc: string } =
            this.refSaveModalForm.current?.getFieldsValue();
        const ept = {
            value: 0.0,
            status: false,
            strict: false,
        };
        this.props.onSave({
            daily: this.state.daily,
            dataset: this.state.dataset,
            title: v.planName,
            description: v.planDesc,
            meta: {
                reference: this.refRefer.current?.getData() ?? {
                    cogn_chip: 60.0,
                    cube: 1000.0,
                    doubloon: 0.5,
                    ssr_blp: 1200.0,
                    ur_blp: 3000.0,
                    ur_equip: 36000.0,
                },
                restriction: this.refRest.current?.getData() ?? {
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
        });
        this.setState({
            saveModalOpen: false,
        });
    }
    render() {
        return (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Tour
                    open={this.state.openTour}
                    onClose={() => this.closeTour()}
                    steps={this.state.steps}
                />
                <Modal
                    title="确认保存"
                    centered
                    open={this.state.saveModalOpen}
                    onOk={() => this.confirmModal()}
                    onCancel={() => this.setState({ saveModalOpen: false })}
                >
                    <Form
                        ref={this.refSaveModalForm}
                        layout="horizontal"
                        autoComplete="off"
                        onFinish={() => this.confirmSaveModal()}
                    >
                        <Form.Item
                            label="计划名称"
                            name="planName"
                            rules={[
                                { required: true, message: "需要填写计划名称" },
                            ]}
                        >
                            <Input
                                placeholder="我的计划"
                                showCount
                                maxLength={20}
                            />
                        </Form.Item>
                        <Form.Item label="计划备注" name="planDesc">
                            <Input.TextArea
                                placeholder="我的计划备注"
                                showCount
                                maxLength={300}
                                style={{ height: 100, resize: "none" }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
                <div
                    style={{
                        height: "100%",
                        width: "35%",
                        display: "flex",
                        paddingTop: "25px",
                        flexDirection: "column",
                    }}
                >
                    <Title level={3} style={{ textAlign: "center" }}>
                        规划设定
                    </Title>
                    <div
                        style={{
                            height: "100%",
                            margin: "15px",
                            paddingBottom: "10px",
                            overflowY: "auto",
                        }}
                    >
                        <div ref={this.tour.inputReferRef}>
                            <Title level={4}>参考价值</Title>
                            <ReferenceValue ref={this.refRefer} />
                        </div>
                        <div ref={this.tour.inputRestRef}>
                            <Title level={4} style={{ marginTop: "20px" }}>
                                策略限制
                            </Title>
                            <Restriction ref={this.refRest} />
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                width: "100%",
                                padding: "0px 35px 10px 35px",
                            }}
                        >
                            <Button
                                type="text"
                                shape="round"
                                style={{
                                    height: "100%",
                                    fontSize: "20px",
                                    marginLeft: "calc(5% + 10px)",
                                    marginRight: "15px",
                                }}
                                icon={<QuestionCircleTwoTone />}
                                onClick={() => this.question()}
                            />
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#00b96b",
                                    },
                                }}
                            >
                                <Button
                                    ref={this.tour.loadRef}
                                    type="default"
                                    style={{
                                        height: "100%",
                                        width: "calc(30% - 40px)",
                                        borderWidth: "3px",
                                        fontSize: "20px",
                                        marginRight: "25px",
                                        marginLeft: "calc(5% - 25px)",
                                    }}
                                    icon={
                                        <SyncOutlined
                                            style={{
                                                color: "#00b96b",
                                                marginBottom: "5px",
                                            }}
                                        />
                                    }
                                    onClick={() => this.plan()}
                                >
                                    规划
                                </Button>
                            </ConfigProvider>
                            <Button
                                type="default"
                                ref={this.tour.saveRef}
                                style={{
                                    height: "100%",
                                    width: "calc(30% - 40px)",
                                    borderWidth: "3px",
                                    fontSize: "20px",
                                    marginLeft: "25px",
                                    marginRight: "calc(5% - 30px)",
                                }}
                                icon={
                                    <SaveTwoTone
                                        style={{
                                            color: "#1677ff",
                                            marginBottom: "5px",
                                        }}
                                    />
                                }
                                onClick={() => this.save()}
                            >
                                保存
                            </Button>
                            <Button
                                ref={this.tour.highlevelRef}
                                type="text"
                                danger={true}
                                shape="round"
                                style={{
                                    height: "100%",
                                    fontSize: "20px",
                                    marginLeft: "5%",
                                    marginRight: "15px",
                                }}
                                icon={<SettingTwoTone twoToneColor="#ff4d4f" />}
                                onClick={() => this.openDrawer()}
                            />
                            <MetaDrawer
                                open={this.state.openDrawer}
                                onClose={() => this.closeDrawer()}
                                defaultValue={this.state.abr}
                                onSubmit={(data) => {
                                    this.setState({ abr: data });
                                    this.closeDrawer();
                                }}
                                width={500}
                            />
                        </div>
                    </div>
                </div>
                <div
                    ref={this.tour.resultRef}
                    style={{
                        height: "100%",
                        width: "65%",
                    }}
                >
                    <Result
                        dataset={this.state.dataset}
                        average={this.state.average}
                        daily={this.state.daily}
                        annual={this.state.annual}
                    />
                </div>
            </div>
        );
    }
}

export default TechPlanBuilder;
