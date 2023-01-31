import React, { createRef } from "react";
import "antd/dist/reset.css";
import { Button, Drawer, Form, FormInstance, InputNumber, Space } from "antd";
import { MetaData } from "./metafns";

interface Props {
    width: number;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: MetaData | Readonly<MetaData>) => void;
    defaultValue: MetaData | undefined;
}

class MetaDrawer extends React.Component<Props> {
    form: React.RefObject<FormInstance>;
    constructor(props: Props | Readonly<Props>) {
        super(props);
        this.form = createRef<FormInstance>();
    }
    submit() {
        this.props.onSubmit(this.form.current?.getFieldsValue());
    }
    render() {
        return (
            <Drawer
                title="高级选项"
                width={this.props.width}
                open={this.props.open}
                onClose={this.props.onClose}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button
                            onClick={() => this.props.onClose()}
                        >
                            取消
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => this.form.current?.submit()}
                        >
                            确认
                        </Button>
                    </Space>
                }
            >
                <Form
                    ref={this.form}
                    layout="horizontal"
                    autoComplete="off"
                    style={{
                        width: "100%",
                    }}
                    initialValues={
                        this.props.defaultValue
                            ? this.props.defaultValue
                            : {
                                  generation: 1000,
                                  learn1: 2.0,
                                  learn2: 2.0,
                                  inertia_s: 0.8,
                                  inertia_e: 0.4,
                                  node_amo: 25,
                                  vmax: 0.2,
                                  thread_amo: 15,
                              }
                    }
                    onFinish={() => this.submit()}
                >
                    <Form.Item
                        name="generation"
                        label="迭代次数"
                        rules={[{ required: true, message: "该字段需要填写" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={1}
                            max={5000}
                            step={1}
                        />
                    </Form.Item>
                    <Form.Item
                        name="learn1"
                        label="学习因子1"
                        rules={[{ required: true, message: "该字段需要填写" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            max={100}
                            step={0.001}
                        />
                    </Form.Item>
                    <Form.Item
                        name="learn2"
                        label="学习因子2"
                        rules={[{ required: true, message: "该字段需要填写" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            max={100}
                            step={0.001}
                        />
                    </Form.Item>
                    <Form.Item
                        name="inertia_s"
                        label="初始惯性系数"
                        rules={[{ required: true, message: "该字段需要填写" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            max={100}
                            step={0.001}
                        />
                    </Form.Item>
                    <Form.Item
                        name="inertia_e"
                        label="最终惯性系数"
                        rules={[{ required: true, message: "该字段需要填写" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            max={100}
                            step={0.001}
                        />
                    </Form.Item>
                    <Form.Item
                        name="node_amo"
                        label="粒子数量"
                        rules={[{ required: true, message: "该字段需要填写" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={1}
                            max={1000}
                            step={1}
                        />
                    </Form.Item>
                    <Form.Item
                        name="vmax"
                        label="最大速度"
                        rules={[{ required: true, message: "该字段需要填写" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0.001}
                            max={10}
                            step={0.001}
                        />
                    </Form.Item>
                    <Form.Item
                        name="thread_amo"
                        label="并行线程数"
                        rules={[{ required: true, message: "该字段需要填写" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={1}
                            max={100}
                            step={1}
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        );
    }
}

export default MetaDrawer;
