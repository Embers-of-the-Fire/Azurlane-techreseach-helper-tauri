import React, { createRef } from "react";
import "antd/dist/reset.css";
import { Button, Drawer, Form, FormInstance, InputNumber, Space } from "antd";

interface Props {
    width: number;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: MetaData | Readonly<MetaData> | undefined) => void;
    defaultValue: MetaData | undefined;
}

interface MetaData {
    generation: number;
    learn1: number;
    learn2: number;
    inertia_s: number;
    inertia_e: number;
    node_amo: number;
}

class MetaDrawer extends React.Component<Props> {
    form: React.RefObject<FormInstance>;
    constructor(props: Props | Readonly<Props>) {
        super(props);
        this.form = createRef<FormInstance>();
    }
    submit() {
        this.props.onSubmit(this.form.current?.getFieldsValue())
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
                        <Button onClick={() => this.props.onClose()}>取消</Button>
                        <Button type="primary" onClick={() => this.submit()}>确认</Button>
                    </Space>
                }
            >
                <Form
                    ref={this.form}
                    layout="horizontal"
                    autoComplete="off"
                    initialValues={this.props.defaultValue ? this.props.defaultValue : {
                        generation: 1500,
                        learn1: 2.0,
                        learn2: 2.0,
                        inertia_s: 0.8,
                        inertia_e: 0.4,
                        node_amo: 50,
                        vmax: 0.2,
                    }}
                >
                    <Form.Item name="generation" label="迭代次数" required={true}>
                        <InputNumber min={1} max={5000} step={1} />
                    </Form.Item>
                    <Form.Item name="learn1" label="学习因子1" required={true}>
                        <InputNumber min={0} max={100} step={0.001} />
                    </Form.Item>
                    <Form.Item name="learn2" label="学习因子2" required={true}>
                        <InputNumber min={0} max={100} step={0.001} />
                    </Form.Item>
                    <Form.Item name="inertia_s" label="初始惯性系数" required={true}>
                        <InputNumber min={0} max={100} step={0.001} />
                    </Form.Item>
                    <Form.Item name="inertia_e" label="最终惯性系数" required={true}>
                        <InputNumber min={0} max={100} step={0.001} />
                    </Form.Item>
                    <Form.Item name="node_amo" label="粒子数量" required={true}>
                        <InputNumber min={0} max={1000} step={1} />
                    </Form.Item>
                    <Form.Item name="vmax" label="最大速度" required={true}>
                        <InputNumber min={0} max={10} step={0.001} />
                    </Form.Item>
                </Form>
            </Drawer>
        )
    }
}

export default MetaDrawer;
