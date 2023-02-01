<h1>Tauri + AzurLane Tech Research Helper 碧蓝航线科研规划器 V3</h1>

<p>
<a href="https://space.bilibili.com/526159315"><img src="https://img.shields.io/badge/Author-%E7%BB%9F%E5%90%88%E9%83%A825000mm%E8%A3%85%E7%94%B2%E9%99%84%E7%94%B2(526159315)-blue"></a>
<img alt="GitHub" src="https://img.shields.io/github/license/Embers-of-the-Fire/Azurlane-techreseach-helper-tauri?color=yellow">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Embers-of-the-Fire/Azurlane-techreseach-helper-tauri?color=green">
</p>

-   Source Repo: [AzurLane Tech Research Helper][source-repo]
-   源库：[碧蓝航线科研规划器][source-repo]

This is the cross-platform offline version of [_AzurLane Tech Research Helper_][source-repo], which based on the [_Tauri_][tauri] to make it compatible offline on multiple platforms.

这是[_碧蓝航线科研规划器_][source-repo]的跨平台离线版本，基于[_Tauri_][tauri]。

[source-repo]: https://github.com/Embers-of-the-Fire/AzurLane-Tech-Research-Helper
[tauri]: https://tauri.app/

## 前言

### 关于 V3 和 V1

V3 为重构后的科研规划 APP，算法采用原生 Rust 并使用 Tauri，不再进行 WASM 支持，从而不再支持 Web 端使用。如果想要通过 Web 端使用，请参考[该仓库][wasm-version]中的 WASM 版或前往我的[GitHub Page][github-page]。

[wasm-version]: https://github.com/Embers-of-the-Fire/AzurLane-Tech-Research-Helper
[github-page]: https://embers-of-the-fire.github.io/

### 后续

如果后续仍然存在问题，欢迎通过任何联系方式进行报告。但是无论 V3 与 V1 均只会进行 Bug 的修正，而不会进行进一步再开发。

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
