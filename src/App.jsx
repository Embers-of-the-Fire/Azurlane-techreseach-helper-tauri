import "./App.css";
import React from "react";
import "antd/dist/reset.css";
import { Breadcrumb, Layout, Menu } from "antd";
import {
    ExperimentOutlined,
    HomeOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import TechPlan from "./TechPlan/TechPlan";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.sider_data = [
            {
                key: "sub1",
                icon: <ExperimentOutlined />,
                label: "科研规划",

                children: [
                    {
                        key: "1",
                        label: "规划制定",
                    },
                    {
                        key: "2",
                        label: "科研结论",
                    },
                    {
                        key: "3",
                        label: "规划共享",
                    },
                ],
            },
        ];
        this.tabref = {
            sub1: undefined,
        };
        this.state = {
            display: {
                TP: { height: "100%", width: "100%" },
            },
            breadcrumb: [
                <Breadcrumb.Item key="brcItem-0">科研规划</Breadcrumb.Item>,
                <Breadcrumb.Item key="brcItem-1">规划制定</Breadcrumb.Item>,
            ],
            pageSpinning: false,
        };
    }
    setSpinning(status) {
        this.setState({
            pageSpinning: status,
        });
    }
    tabRef(ref, tab) {
        this.tabref[tab] = ref;
    }
    page(data) {
        let rf = this.tabref[data.keyPath[1]];
        if (rf) {
            rf.page(data.keyPath[0]);
        }
        // Other pages should set `display: none` here.
        let st = {
            TP: { height: "100%", width: "100%" },
        };
        this.setState({
            display: st,
        });
    }
    setBreadcrumb(brc) {
        this.setState({
            breadcrumb: brc.map((v, i) => (
                <Breadcrumb.Item key={`brcItem-${i}`}>{v}</Breadcrumb.Item>
            )),
        });
    }
    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "lightgray",
                        opacity: "0.5",
                        zIndex: this.state.pageSpinning ? 2 : 0,
                        position: "absolute",
                    }}
                >
                    <div
                        style={{
                            top: "calc(50% - 40px)",
                            left: "calc(50% - 40px)",
                            position: "absolute",
                        }}
                    >
                        <LoadingOutlined
                            style={{ fontSize: "80px", color: "#1677ff" }}
                        />
                        <br />
                    </div>
                </div>
                <Layout
                    style={{
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                        position: "absolute",
                    }}
                >
                    <Layout.Header className="mainHeader">
                        <div
                            className="logo"
                            style={{ width: "5%", float: "left" }}
                        />
                        <Menu
                            style={{ width: "75%" }}
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["1"]}
                            items={[{ key: "1", label: "首页" }]}
                        />
                    </Layout.Header>
                    <Layout>
                        <Layout.Sider width={160}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={["1"]}
                                defaultOpenKeys={["sub1"]}
                                style={{ height: "100%", borderRight: 0 }}
                                items={this.sider_data}
                                onClick={(data) => this.page(data)}
                            />
                        </Layout.Sider>
                        <Layout style={{ padding: 35, paddingTop: 45 }}>
                            <Breadcrumb
                                style={{ marginBottom: 15, marginTop: -15 }}
                            >
                                <Breadcrumb.Item>
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                {this.state.breadcrumb}
                            </Breadcrumb>
                            <Layout.Content
                                style={{
                                    padding: 30,
                                    margin: 0,
                                    minHeight: 280,
                                    background: "white",
                                }}
                            >
                                {/* {this.state.now_content} */}
                                <div style={this.state.display.TP}>
                                    <TechPlan
                                        onRef={(ref) =>
                                            this.tabRef(ref, "sub1")
                                        }
                                        bread={(b) => this.setBreadcrumb(b)}
                                        parentSpinning={(status) =>
                                            this.setSpinning(status)
                                        }
                                    />
                                </div>
                            </Layout.Content>
                            <Layout.Footer
                                style={{
                                    textAlign: "center",
                                    marginBottom: "-25px",
                                }}
                            >
                                UI Supported By{" "}
                                <a href="https://ant.design">Ant Design</a>
                                <br />
                                App Supported By{" "}
                                <a href="https://tauri.app/">Tauri</a>
                                <br />
                                Author -{" "}
                                <a href="https://github.com/Embers-of-the-Fire/">
                                    Embers-of-the-Fire(GitHub)
                                </a>{" "}
                                -{" "}
                                <a href="https://space.bilibili.com/526159315">
                                    统合部25000mm装甲附甲(BiliBili)
                                </a>
                            </Layout.Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;
