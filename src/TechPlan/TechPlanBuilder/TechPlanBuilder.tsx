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
                    name: "????????????",
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
                    title: "????????????",
                    description: "???????????????????????????????????????????????????????????????",
                    target: this.tour.inputReferRef.current,
                },
                {
                    title: "????????????",
                    description: "?????????????????????????????????????????????",
                    target: this.tour.inputRestRef.current,
                },
                {
                    title: "????????????",
                    description: "?????????????????????????????????",
                    target: this.tour.loadRef.current,
                },
                {
                    title: "??????????????????",
                    description:
                        "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                    target: this.tour.resultRef.current,
                },
                {
                    title: "??????????????????",
                    description:
                        "?????????????????????????????????????????????????????????????????????????????????????????????????????????/???????????????????????????????????????",
                    target: this.tour.saveRef.current,
                },
                {
                    title: "????????????",
                    description: "????????????????????????????????????",
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
                    content: "??????????????????",
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
            title: "??????",
            content: (
                <div>
                    <p>???????????????????????????????????????????????????????????????????????????</p>
                    <p>
                        ???????????????????????????????????????????????????????????????????????????????????????CPU???????????????????????????????????????????????????????????????????????????????????????
                    </p>
                    <p>
                        ????????????:
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
                        title: "????????????",
                        description:
                            "???????????????????????????????????????????????????????????????",
                        target: this.tour.inputReferRef.current,
                    },
                    {
                        title: "????????????",
                        description: "?????????????????????????????????????????????",
                        target: this.tour.inputRestRef.current,
                    },
                    {
                        title: "????????????",
                        description: "?????????????????????????????????",
                        target: this.tour.loadRef.current,
                    },
                    {
                        title: "??????????????????",
                        description:
                            "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                        target: this.tour.resultRef.current,
                    },
                    {
                        title: "??????????????????",
                        description:
                            "?????????????????????????????????????????????????????????????????????????????????????????????????????????/???????????????????????????????????????",
                        target: this.tour.saveRef.current,
                    },
                    {
                        title: "????????????",
                        description: "????????????????????????????????????",
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
                    title="????????????"
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
                            label="????????????"
                            name="planName"
                            rules={[
                                { required: true, message: "????????????????????????" },
                            ]}
                        >
                            <Input
                                placeholder="????????????"
                                showCount
                                maxLength={20}
                            />
                        </Form.Item>
                        <Form.Item label="????????????" name="planDesc">
                            <Input.TextArea
                                placeholder="??????????????????"
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
                        ????????????
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
                            <Title level={4}>????????????</Title>
                            <ReferenceValue ref={this.refRefer} />
                        </div>
                        <div ref={this.tour.inputRestRef}>
                            <Title level={4} style={{ marginTop: "20px" }}>
                                ????????????
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
                                    ??????
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
                                ??????
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
