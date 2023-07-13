# webpanda.js 👋

webpanda.js 是面向前后端分离、视图与数据分离, 基于 ECMAScript 5 特性的单页应用 (SPA) 框架。


## vscode 安装 Live Server 扩展, 搭建本地开发环境

在扩展设置中，设置liveServer.settings.file：
```shell
/index.html
```

When set, serve this file (server root relative) for every 404 (useful for single-page applications)  
设置后，为每个404(对于单页面应用程序很有用)提供此文件(相对于服务器根)




概念

页面数据工程
局部数据工程：局部渲染、局部事件使用
全局数据工程：全局渲染、全局事件使用
单例模式、全局数据流

因为是单例模式，所以数据工程多次渲染再同一个页面上需要进行拷贝。


执行的优先级：
先执行页面数据工程事件，再执行局部数据工程事件，最后执行全局数据工程事件
this.$.event ();





