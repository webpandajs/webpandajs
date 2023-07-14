# webpanda.js 👋

webpanda.js 是面向前后端分离、视图与数据分离, 基于 ECMAScript 5 特性的单页应用 (SPA) 框架。


## 介绍

本质上，webpanda.js 是一个用于现代 JavaScript 单页应用程序的非构建、不打包开发环境框架。

在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。随着前端技术发展与创新，在前端模块化呐喊声之中刮起了一阵风，于是有了 `Webpack`、`Vite`、`Turbopack` 及 `Snowpack` 等前端构建工具，改变了前端开发者的开发方式，让前端开发进入了模块化时代。

构建工具打包允许前端开发者使用模块化的方式组织和管理前端代码，将代码拆分成多个独立的模块，使得代码更加结构化、易于维护和扩展。然而，构建的应用越来越大，需要处理的JavaScript 代码量让构建工具出现了性能瓶颈。如缓慢的服务器启动，以及就算有了模块热替换，照样代码修改迟钝更新等情况，严重影响前端开发者的开发效率和体验。

时过境迁，如今浏览器已经开始原生支持 ES 模块了，一些新的构建工具也利用了这种浏览器原生支持的生态来解决缓慢的服务器启动、迟钝更新等问题。也就是说，在开发环境下，前端技术又开始向非构建、不打包的原生方向发展了。


## 开发环境与生产环境


为什么开发环境不要打包？比如在打包过程中，代码经过压缩，由于打包前后的代码之间差异性过大，造成无法debug的问题。为了方便调试，无奈使用 `SourceMap` 信息文件储存代码转换前后的对应位置信息……

现代 JavaScript 在开发环境下增加一个构建场景，本身就是繁琐的。甚至有些构建工具开发环境是一套，生产环境是另一套，造成开发与生产的环境不一致，生产环境下出现莫名其妙的错误。


当然，webpanda.js 框架认为在生产环境下的 JavaScript 代码仍然需要打包，在生产环境中可以获得最佳的加载性能。但打包也仅仅是代码压缩、部分文件目录结构调整等，100%保证不会造成开发与生产的环境不一致的情况。

webpanda.js 是基于 ECMAScript 5 特性的单页应用框架，默认情况下，要求前端开发者必须按照 ECMAScript 5 (ES5) 规范去开发代码。但打包脚本是可以由前端开发者自行升级的，只要打包脚本支持ES6转换ES5，只要开发环境的浏览器原生支持，webpanda.js 不限制 JavaScript 代码以何种规范去开发。


## 为什么选择 webpanda.js

想要理解为什么要使用 webpanda.js，我们先回顾下历史，我们为什么需要构建工具。

在构建工具出现之前，在浏览器中运行JavaScript，是通过引用一些脚本来分别存放每个功能。某些构建工具说此方案很难扩展，因为加载太多脚本会导致网络瓶颈。这种说法已经过时了，在 HTTP/2 中有了多路复用，代替原来的序列和阻塞机制，所有请求的都是通过一个 TCP 连接并发完成。同个域名只需要占用一个 TCP 连接，消除了因多个 TCP 连接而带来的延时和内存消耗。

某些构建工具还说了，原生的 .js 文件，还会导致作用域、文件大小、可读性和可维护性方面的问题。这种说法已经过时了，webpanda.js 让前端在开发环境中不构建、不打包、不编译，解决原生 JavaScript 模块化开发一切问题。

webpanda.js 将改变前端开发者的开发方式，返璞归真，逃离繁琐的构建工具，让前端开发的重心回归到业务。


## 浏览器支持

webpanda.js 支持所有兼容 ECMAScript 5 的浏览器。

> 不支持 IE8 及以下版本IE浏览器，但是微软停止支持IE浏览器, 所以webpanda.js也会在未来逐步删除其兼容的代码。






# 起步


## 安装

webpanda.js 安装非常简单，直接下载并用 `<script>` 标签引入，会被注册为一个全局变量 `window.webpanda`。

```html
<script type="text/javascript" src="/library/webpanda/webpanda.min.js"></script>
```

也可以直接克隆一份框架项目代码：

```shell
git clone git@github.com:webpandajs/webpandajs.git
```




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



## vscode 安装 Live Server 扩展, 搭建本地开发环境

在开发环境中，我们如果使用 vscode 编辑器，需要一个服务器环境。这里推荐 `Live Server` 扩展。

在扩展设置中，设置 `liveServer.settings.file` ：

```shell
/index.html
```

> When set, serve this file (server root relative) for every 404 (useful for single-page applications)  
> 设置后，为每个404(对于单页面应用程序很有用)提供此文件(相对于服务器根)


## 目录结构

```shell
/dist/              #打包后的目录
/framework/         #框架、打包脚本
/library/           #第三方代码库
/src/               #业务源代码
/src/assets/        #css、less、img等资源文件
/src/component/     #组件数据工程
/src/page/          #页面数据工程
/src/server/        #服务端接口数据工程
/src/main.js        #初始化文件
/src/router.js      #路由数据工程文件
/favicon.ico        #网站favicon.ico
/index.html         #网站入口
/webpanda.config.js #打包配置
```

> `/src/` 下的子目录是可以开发者自行设计的，并不是强制要求跟上面一致。  
> `/src/router.js` 路由数据工程文件也是可以自定义的。


## 生产环境打包

使用 NPM 打包:

```shell
npm run build
```

### package.json

package.json 示例内容：

```json
{
  "name": "...",
  "version": "1.0.0",
  "description": "...",
  "scripts": {
    "build": "node framework/script/build.js"
  },
  "author": "...",
  "devDependencies": {
    "console-color-node": "^1.0.1",
    "cssmin": "^0.4.3",
    "html-minifier": "^4.0.0",
    "uglify-js": "^3.17.4"
  }
}
```


### webpanda.config.js

webpanda.config.js 示例内容：

```javascript
module.exports = {
    // 忽略配置
    ignore: {
        // 忽略扩展名
        extension: {
            // 只对src目录代码有效
            src: [".less"],
            // 只对library目录代码有效
            library: [".less", ".scss"]
        },
        // 忽略列表、路径
        path: [
            "library/less.js",
            "library/test/",
        ],
    },

    // 压缩配置，只对src目录有效 
    minify: {
        // 不压缩的目录列表
        exclude: ["src/test"],
        // html压缩配置
        htmlminifier: {
            options: {
                keepClosingSlash: true,// 在单例元素上保留尾部斜杠
                caseSensitive: true,// 以区分大小写的方式处理属性（对于自定义 HTML 标记很有用）
                collapseWhitespace: true, // 删除html里的空格 达到html的压缩
                // removeAttributeQuotes: true, // 尽可能删除html标签里的双引号 达到html的压缩
                removeComments: true, // 删除html中的注释
                removeCommentsFromCDATA: true, // 从脚本和样式删除的注释
                minifyCSS: true, // 压缩css
                minifyJS: true, // 压缩js
            },
        },
        // js代码压缩配置
        uglifyjs: {
            options: {
                warnings: true,
                mangle: true,
                ie: true,
                webkit: true,
            }
        },
    },
};
```


## index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <title>webpanda.js - 面向前后端分离、视图与数据分离, 基于 ECMAScript 5 特性的单页应用 (SPA) 框架。</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <!-- 引入框架代码 -->
    <script type="text/javascript" src="/library/webpanda/webpanda.min.js"></script>
    <!-- 引入 ajax 插件，也可以替换成其他第三方或者开发者自己造轮子都可以 -->
    <script type="text/javascript" src="/library/webpanda/webpanda-ajax.min.js"></script>
    <!-- 引入 css、js 文件动态包含插件，也可以替换成其他第三方或者开发者自己造轮子都可以 -->
    <script type="text/javascript" src="/library/webpanda/webpanda-require.min.js"></script>

    <!-- 路由数据工程文件 -->
    <script type="text/javascript" src="/src/router.js"></script>
    <!-- 初始化文件 -->
    <script type="text/javascript" src="/src/main.js"></script>
</head>
<body>
    <noscript><strong>Sorry, Webpandajs will not work properly without JavaScript support. Enable JavaScript for browsers and continue.</strong></noscript>
</body>
</html>
```


# 概念


## 局部数据工程

局部渲染、局部事件使用

## 全局数据工程

全局渲染、全局事件使用


## 单例模式

因为是单例模式，所以数据工程多次渲染再同一个页面上需要进行拷贝。

## 全局数据流






# 数据工程定义



# 数据工程对象





## 页面数据工程




执行的优先级：
先执行页面数据工程事件，再执行局部数据工程事件，最后执行全局数据工程事件
this.$.event ();


# 模板语法



# 模块功能





