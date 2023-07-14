# webpanda.js 👋

webpanda.js 是面向前后端分离、视图与数据分离, 基于 ECMAScript 5 特性的单页应用 (SPA) 框架。


## 介绍

本质上，webpanda.js 是一个用于现代 JavaScript 单页应用程序的非构建、不打包开发环境框架。

在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。随着前端技术发展与创新，在前端模块化呐喊声之中刮起了一阵风，于是有了 `Webpack`、`Vite`、`Turbopack` 及 `Snowpack` 等前端构建工具，改变了前端开发者的开发方式，让前端开发进入了模块化时代。

构建工具打包允许前端开发者使用模块化的方式组织和管理前端代码，将代码拆分成多个独立的模块，使得代码更加结构化、易于维护和扩展。然而，构建的应用越来越大，需要处理的JavaScript 代码量让构建工具出现了性能瓶颈。如缓慢的服务器启动，以及就算有了模块热替换，照样代码修改迟钝更新等情况，严重影响前端开发者的开发效率和体验。

时过境迁，如今浏览器已经开始原生支持 ES 模块了，为了解决缓慢的服务器启动、迟钝更新，一些新的构建工具也利用了这种生态。也就是说，在开发环境下，前端技术又开始向非构建、不打包的原生方向发展了。

webpanda.js 是保守、开箱即用的web前端框架，让前端在开发环境中不构建、不打包、不编译，最终目标是改变前端开发者的开发方式，返璞归真，逃离繁琐的构建工具，让前端开发的重心回归到业务。

为什么开发环境不要打包？比如在打包过程中，代码经过压缩，由于打包前后的代码之间差异性过大，造成无法debug的问题。为了方便调试，无奈使用 `SourceMap` 信息文件储存代码转换前后的对应位置信息……

现代 JavaScript 在开发环境下增加一个构建场景，本身就是繁琐的。甚至有些构建工具开发环境是一套，生产环境是另一套，造成开发与生产的环境不一致，生产环境下出现莫名其妙的错误。

当然，webpanda.js 框架认为在生产环境下的 JavaScript 代码仍然需要打包。打包有很多好处，比如代码压缩，在生产环境中可以获得最佳的加载性能。

webpanda.js 是基于 ECMAScript 5 特性的单页应用框架，默认情况下，要求前端开发者必须按照 ECMAScript 5 (ES5) 规范去开发代码。但打包脚本是可以由前端开发者自行升级的，只要打包脚本支持ES6转换ES5，只要开发环境的浏览器原生支持，webpanda.js 不限制 JavaScript 代码以何种规范去开发。

## 安装

webpanda.js 安装非常简单，直接下载并用 `<script>` 标签引入，会被注册为一个全局变量 `window.webpanda`。

```html
<script type="text/javascript" src="/library/webpanda/webpanda.min.js"></script>
```

## 浏览器支持

webpanda.js 支持所有兼容 ECMAScript 5 的浏览器。

> 不支持 IE8 及以下版本IE浏览器，但是微软停止支持IE浏览器, 所以webpanda.js也会在未来逐步删除其兼容的代码。


## 多语言

目前 webpanda.js 的默认文案语言是中文简体，可以引入下面的语言方案：

```html
<!-- 英语 -->
<script src="/library/webpanda/language/en_US.js"></script>
<!-- 中文简体 -->
<script src="/library/webpanda/language/zh_CN.js"></script>
<!-- 中文繁体 -->
<script src="/library/webpanda/language/zh_HK.js"></script>
```

也可以自定义语言方案：

```javascript
webpanda.language ({
    // ......
});
```


# 起步




## vscode 安装 Live Server 扩展, 搭建本地开发环境

在开发环境中，我们如果使用 vscode 编辑器，需要一个服务器环境。这里推荐 `Live Server` 扩展。

在扩展设置中，设置 `liveServer.settings.file` ：

```shell
/index.html
```

> When set, serve this file (server root relative) for every 404 (useful for single-page applications)  
> 设置后，为每个404(对于单页面应用程序很有用)提供此文件(相对于服务器根)





# 概念



## 页面数据工程



## 局部数据工程：局部渲染、局部事件使用

## 全局数据工程：全局渲染、全局事件使用


## 单例模式、全局数据流


因为是单例模式，所以数据工程多次渲染再同一个页面上需要进行拷贝。


执行的优先级：
先执行页面数据工程事件，再执行局部数据工程事件，最后执行全局数据工程事件
this.$.event ();





