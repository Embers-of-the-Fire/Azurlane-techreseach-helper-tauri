# Tauri + AzurLane Tech Research Helper 碧蓝航线科研规划器 V3

> 链接:  
<https://pan.baidu.com/s/1gdTzn-3EOqdhZ6B_wRRp4A?pwd=q4p2> 提取码: q4p2 复制这段内容后打开百度网盘手机App，操作更方便哦

## 前言

### 关于V3和V1

V3为重构后的科研规划APP，算法采用原生Rust并使用Tauri，不再进行WASM支持，从而不再支持Web端使用。如果想要通过Web端使用，请参考[该仓库][wasm-version]中的WASM版或前往我的[GitHub Page][github-page]。

[wasm-version]: https://github.com/Embers-of-the-Fire/AzurLane-Tech-Research-Helper
[github-page]: https://embers-of-the-fire.github.io/

## 如何使用

点击左下角问号按钮查看帮助

## 本地编译

首先你需要安装[Nodejs](https://nodejs.org/)与[Rust](https://rust-lang.org)，并确认两个包管理器`npm`与`cargo`可以正常使用。

> 不会配置**NodeJs**请看这里：<https://www.runoob.com/nodejs/nodejs-npm.html>  
> 不会配置**Rust**请看这里：<https://www.runoob.com/rust/rust-setup.html>

随后进入根目录，打开命令提示符，如下操作：

```batch
npm install --save
```

安装`React`项目相关依赖。然后：

```batch
cargo install tauri-cli
```

安装`tauri`相关依赖。

最后：

```batch
cargo tauri build
```

进行编译。

然后进入`./src-tauri/target/release/`获取应用程序，`./src-tauri/target/release/bundle`获取安装包。
