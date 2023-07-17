# webpanda.js 🐼

webpanda.js 是面向前后端分离、视图与数据分离, 基于 ECMAScript 5 特性的单页应用 (SPA) 框架。


## 为什么创造 webpanda.js

本质上，webpanda.js 是一个用于现代 JavaScript 单页应用程序的非构建、不打包开发环境框架。

在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。随着前端技术发展与创新，在前端模块化呐喊声之中刮起了一阵风，于是有了 `Webpack`、`Vite`、`Turbopack` 及 `Snowpack` 等前端构建工具，改变了前端开发者的开发方式，让前端开发进入了模块化时代。

构建工具打包允许前端开发者使用模块化的方式组织和管理前端代码，将代码拆分成多个独立的模块，使得代码更加结构化、易于维护和扩展。然而，构建的应用越来越大，需要处理的 JavaScript 代码量让构建工具出现了性能瓶颈。如缓慢的服务器启动，以及就算有了模块热替换，照样代码修改迟钝更新等情况，严重影响前端开发者的开发效率和体验。

时过境迁，如今浏览器已经开始原生支持 ES 模块了，一些新的构建工具也利用了这种浏览器原生支持的生态来解决缓慢的服务器启动、迟钝更新等问题。也就是说，在开发环境下，前端技术又开始向非构建、不打包的原生方向发展了。


## 开发环境与生产环境


为什么开发环境不要打包？比如在打包过程中，代码经过压缩，由于打包前后的代码之间差异性过大，造成无法debug的问题。为了方便调试，无奈使用 `SourceMap` 信息文件储存代码转换前后的对应位置信息……

现代 JavaScript 在开发环境下增加一个构建场景，本身就是繁琐的。甚至有些构建工具开发环境是一套，生产环境是另一套，造成开发环境与生产环境的不一致，生产环境下出现莫名其妙的错误。


当然，webpanda.js 框架认为在生产环境下的 JavaScript 代码仍然需要打包，这样在生产环境中可以获得最佳的加载性能。但打包也仅仅是代码压缩、部分文件目录结构调整等，100%保证不会造成开发环境与生产环境的不一致情况。

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


# webpanda 对象


## run

运行框架，会路由事件。

> 建议是放在基础配置设置之后执行。

```javascript
// 运行
webpanda.run ();

// 获取框架运行状态
console.log (webpanda.run.status());
```


## page

页面操作相关。

> 一般是在 `webpanda.run()` 执行之后再执行。

```javascript
var setting = {
    // 数据工程名称
    name: 'test',
    // 数据工程克隆名称
    clone: null,
    // 数据工程文件路径
    src: '/src/page/test.js',
    // 参数
    argument: {
        // ...
    }
};
// 执行页面
webpanda.page (setting);

// 获取当前页面的开始执行时间
console.log (webpanda.page.runtime());
// 页面是否第一次加载的状态
console.log (webpanda.page.firstStatus());
// 当前页面的数据工程对象
console.log (webpanda.page.data());
// 当前页面的URL对象
console.log (webpanda.page.url());
```



## env

自定义环境变量：

```javascript
webpanda.env = {
    // ...
    debug: true,
    demo: '...',
};

// 可以全局使用: 主要用于一些规范的自定义配置信息
console.log (webpanda.env.debug);
```

## config

框架基础配置：

```javascript
webpanda.config ({

    /**
     * 引入包含配置
     * @param {function({resolve:Function,reject:Function})} e ({resolve(结果) 成功执行, reject(错误信息) 失败时执行}) 
     */
    include: function (e) {
        // ...
    },
    // 路由设置
    router: {
        // 模式: hash|history
        mode: 'hash',
        // 监听器的设置: true|false
        listener: true,
        // 是否启用路由页面事件监听: true|false
        pageEvent: true,
    },
    // 浏览记录配置
    history: {
        // 浏览记录中的页面上限(记录最大值)
        pageMaximum: 10,
        // 浏览记录中的步数上限(记录最大值)
        stepMaximum: 10,
    },
});
```

## status

获取框架的状态:

```javascript
webpanda.status();
```

## language

框架的语言设置。

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

输出语言字符串：

```javascript
// 自定义语言
webpanda.language ({
    'ERROR': '错误信息',
});
// 渲染语言
webpanda.language.target ('ERROR');
```


## plugin

插件设置。

```javascript

// 插件类型
console.log (webpanda.plugin.type);

// 函数的方式设置：
webpanda.plugin (function (plugin) {
    console.log (plugin);
});

// 对象的方式设置：
webpanda.plugin ({

    // 传入的对象必须要有一个 webpandaPluginMain 命名的方法函数
    webpandaPluginMain: function (plugin) {
        console.log (plugin);
    },

});
```




## compiler

传入模板字符串及配置信息进行模板编译，返回一个编译对象。

```javascript
var compiler = webpanda.compiler ({
    // 模板字符串
    template: '...',
    // 父级编译对象
    parent: null,
    // 引用信息，用于调试标记
    reference: '...',
    // 是否启用观察者的开关，默认true启用，false禁用
    observerSwitch: true,
    // 是否启用渲染的开关, 默认为true启用，false禁用
    renderSwitch: true,
    // 是否解析模板语法命令的开关, 默认为true启用，false禁用
    commandSwitch: true,
});

// 状态，为true表示存在渲染节点，为false表示未渲染或者已清理、重新解析模板
console.log (compiler.renderStatus);
// 最后一次渲染的筛选器对象
console.log (compiler.selector);
// 检测是否为编译对象: 判断变量的对象类型是否为 webpanda.compiler 创建的实例对象。如果是返回 true，否则返回 false 。
console.log (webpanda.compiler.isInstanceOf (compiler));

// 解析
compiler.parse ();
// 可以传一个父级虚拟节点
// compiler.parse (parentVirtualNode);

// 解除之前的解析
compiler.unparse ();

// 渲染
compiler.render ({
    // 渲染数据，必须是一个对象
    data: {
        //...
    },
    // 筛选器
    selector: 'body'
    // 自定义预编译声明事件: .call(VirtualNode, statement, event)
    onprecompilestatement: function (statement, event) {
        // ...
    },
    // 观察者事件: .call(VirtualNode, Publisher)
    onobserver: function (Publisher) {
        // ...
    },
    // 渲染前置事件: .call(VirtualNode)
    onbefore: function () {
        // ...
    },
    // 渲染h后置事件: .call(VirtualNode)
    onafter: function () {
        // ...
    },
});

// 清理渲染
compiler.clear ();

// 获取渲染后的HTML内容
console.log (compiler.html());

// 获取渲染后的text内容
console.log (compiler.text());
```

## observer

观察者相关操作。

```javascript

// 给数据设置观察者
webpanda.observer ({
    // 必须是一个对象
    // ...
});
// 给数据设置禁止观察者: 会删除已设置的观察者，并且数据之后将无法设置观察者
webpanda.observer.disable ({
    // 必须是一个对象
    // ...
});

// 判断是否有观察者
console.log (webpanda.observer.has());
// 判断是否有禁止观察者
console.log (webpanda.observer.hasDisable());

// 删除观察者
webpanda.observer.remove();
// 取消禁止观察者
webpanda.observer.removeDisable();

// 忽略观察者的订阅、发布的操作
var result = webpanda.observer.disable (function () {
    // 必须是一个函数
    return //...
});

// 忽略观察者的订阅
var result = webpanda.observer.disableSubscribe (function () {
    // 必须是一个函数
    return //...
});

// 忽略观察者的发布
var result = webpanda.observer.disablePublish (function () {
    // 必须是一个函数
    return //...
});
```

## url

传入一个网络协议地址进行解析。

```javascript
// http 协议地址
var url = webpanda.url("https://example.com:8080/?a=index&t=article&bbbb=default");
var url2 = webpanda.url("http://username:password@hostname/path?arg=value#hash");
// file 协议地址
var url3 = webpanda.url("file:///C:/Users/example/AppData/Local/Temp/wangdan.jpg?a=index");

// 添加事件
var url = webpanda.url("https://example.com:8080/npm/vexflow@4.0.3/build/test.js", {
    toString: function (url, options) {
        // this 是当前对象
        // options 是构建选项值
        // @符号被转义成%40, 这里进行恢复处理
        return url.replace (/\%40/g,'@');
    }
});

// 判断变量的对象类型是否为 webpanda.url 创建的实例对象。如果是返回 true，否则返回 false 。
console.log (webpanda.url.isInstanceOf (url));


// 合并URL地址或者url对象
var url = webpanda.url("https://example.com:8080?a=index");
url.merge("/path/Test/");
url.toString();// "https://example.com:8080/path/Test/?a=index"


// 把 url 对象换为 URL 字符串(构造 URL)
// 构造地址字符串，选项值来自于 webpanda.url.option 属性。
var url = webpanda.url("https://example.com:8080/path/Test/?a=index&t=article&bbbb=default");
// 选项为空默认 webpanda.url.option.all, 也就是获取完整路由
url.toString ();// "https://example.com:8080/path/Test/?a=index&t=article&bbbb=default"
var opt =  webpanda.url.option;
// 只获取域名、协议
url.toString (opt.domain | opt.protocol);// "https://example.com"
// 除了路径，都要获取
url.toString (opt.all & ~ opt.path);// "https://example.com:8080/?a=index&t=article&bbbb=default"
// 除了Query，都要获取。
url.toString (opt.all & ~ opt.query);// "https://example.com:8080/path/Test/"


/**
 * 选项属性
 */

// 构造 URL 时，获取协议, 值示例 "http://"、"file://"
console.log (webpanda.url.option.PROTOCOL);
// 构造 URL 时，获取账户信息, 值示例 "username:password@"
console.log (webpanda.url.option.ACCOUNT);
// 构造 URL 时，获取域名端口, 值示例 "example.com"
console.log (webpanda.url.option.DOMAIN);
// 构造 URL 时，获取端口, 值示例 8080
console.log (webpanda.url.option.PORT);
// 构造 URL 时，获取路径, 值示例 "/index.html"
console.log (webpanda.url.option.PATH);
// 构造 URL 时，获取 query（键值对）, 值示例 "?a=index&t=article"
console.log (webpanda.url.option.QUERY);
// 构造 URL 时，获取锚点中路径, 值示例 "#test/index"
console.log (webpanda.url.option.HASH_PATH);
// 构造 URL 时，获取锚点中 query（键值对）, 值示例 "#?a=index&b=test"
console.log (webpanda.url.option.HASH_QUERY);
// 构造 URL 时，获取完整锚点, 值示例 "#test/index?a=index&b=test"
console.log (webpanda.url.option.HASH);
// 构造 URL 时，主机信息（账号密码、域名+端口）, 值示例 "username:password@example.com:8080" 
console.log (webpanda.url.option.HOST);
// 构造 URL 时，获取完整路由。默认值, 值示例 "http://example.com:8080/index.html?a=index&t=article#test/index?a=index&b=test"
console.log (webpanda.url.option.ALL);
```

属性详解：

```shell
| 名称           | 值示例                                    | 描述                                                         |
| -------------- | ----------------------------------------- | ------------------------------------------------------------ |
| protocol       | "http"                                    | 协议前缀                                                     |
| user           | "user"                                    | 账户名                                                       |
| password       | "password"                                | 账户密码                                                     |
| domain         | "example.com"                            | 域名名称                                                     |
| port           | 8080                                      | 端口号                                                       |
| path           | Array ( [0] => index.html)                | 路径                                                         |
| query          | Object ([a] => index [t] => article )     | 键值对                                                       |
| hashPath       | Array ( [0] => index)                     | 锚点路径                                                     |
| hashQuery      | Object ([a] => index [t] => article )     | 锚点键值对                                                   |
| hashStatus     | false                                     | 锚点状态，默认 false。如果锚点存在， "#/" 或者是 "#" 那么 hashStatus 为 true，绑定时则保留为#，为 false 则清理 # |
| fileStatus     | false                                     | 文件模式状态，默认 false 。如果是 true 文件模式，也就是说 path 最后不加 "/" 斜杠，否则要加上。只有在 path 存在参数时有效 |
| absoluteStatus | false                                     | 是否是绝对路径，默认 false。如果是 true 也就是说 path 前面有 '/'斜杠，需要加上。只有在 protocol、account、domain、port 选项所绑定数据为空时有效 |
| onbuild        | Function (url 构建后的链接, options 选项) | 构建时触发事件。用于捕获构建后的链接，进行额外的自定义处理。返回值必须是一个字符串，也是最终构建的链接信息。 |
```


## timer

计时器相关。

> 在单页应用模式下，并不是我怀疑定时器、超时器的ID池存在不够用、爆库的风险，而是可以有效控制全局与局部的状态。所以建议使用计时器统一管理。  
> 不是全局的计时器被认作为页面计时器，就是在当前页面有效，只要页面更新就会自动取消。

```javascript
// 返回一个计时器对象:
// global 是否全局有效，如果为true表示全局，页面更新不会被清理，否则页面更新就会被清理。默认为 false
// target 触发时间。默认为 0
// limit 执行次数限制，如果小于1，则表示无限循环。默认为 -1
// webpanda.timer (callback, global, target, limit)
var timer = webpanda.timer (function () {
    // ...
});

// 判断变量的对象类型是否为 webpanda.timer 创建的实例对象。如果是返回 true，否则返回 false 。
console.log (webpanda.timer.isInstanceOf (timer));

// 停止
timer.stop ();

// 开始
timer.start ();
// 可以传一个布尔值参数，如果为true，表示重置，也就是已经执行的次数归零
timer.start (true);

// 查询是否存在执行队列中。如果该计时器已经被停止，则返回 false 。
console.log (timer.status ());


/**
 * 超时器
 */
// 第一种写法
webpanda.timer (function () {
    console.log ("3秒的超时器");
}, false, 3000, 1).start ();

// 第二种写法
webpanda.timer (function () {
    console.log ("3秒的超时器");
}).timeout (3000).start ();


/**
 * 定时器
 */
// 第一种写法
webpanda.timer (function () {
    console.log ("3秒的定时器");
}, false, 3000).start ();// 第三个参数默认为 -1

// 第二种写法
webpanda.timer (function () {
    console.log ("3秒的定时器");
}).interval (3000).start ();
```

属性:

```shell
| 名称      | 类型     | 描述                                                         |
| --------- | -------- | ------------------------------------------------------------ |
| callback  | Function | 回调函数                                                     |
| limit     | Number   | 可执行的总次数、限制执行次数。如果为0表示不限制              |
| executed  | Number   | 已经执行次数                                                 |
| index     | Number   | 索引，随着页面更新索引有可能会自动改变                       |
| runtime   | Number   | 当前页面的运行时间(页面版本号)                               |
| origin    | Number   | 开端的毫秒时间戳                                             |
| target    | Number   | 目标（触发）的毫秒时间戳                                     |
| global    | Boolean  | 是否全局有效，true表示全局，false表示属于当前页面计时器      |
| executing | Boolean  | 执行状态，true表示执行中，定时器必须是前面存在执行完毕之后才会执行下一次 |
```




## queue

框架队列执行。

```javascript
webpanda.queue(function() {
    console.log (123);
});
console.log (456);

// 456
// 123
```


## include

包含文件资源相关。

```javascript
// 包含一个字符串路径
webpanda.include ('/library/test.css');
// 支持对象
webpanda.include ({
    // 资源路径, 可以是一个webpanda.url创建的对象
    src: '/library/test.css',
    // 是否异步, 默认true(异步)
    async: true,
    // 文件类型, 不设置默认获取资源扩展后缀，无扩展后缀的默认为 text
    type: 'text',
    // 回调函数, 无论成功还是失败都会执行
    onfinally: function (include) {
        console.log (this);// 框架对象
        console.log (include);// include对象
    },
    // 成功回调函数
    onresolve: function (include) {
        console.log (this);// 框架对象
        console.log (include);// include对象
    },
    // 失败回调函数
    onreject: function (include) {
        console.log (this);// 框架对象
        console.log (include);// include对象
    },
});

// 支持多个
webpanda.include ([
    {
        src: webpanda.url('/library/test.css'),
        async: false,
    },
    '/library/test2.js',
    webpanda.url('/library/test3.js'),
]);

// 获取所有包含、引入资源
console.log (webpanda.include.getAll ());
```



## data

数据工程相关。

```javascript
// 详见：数据工程定义
var data = webpanda.data({
    // ...
});

// 判断变量的对象类型是否为 webpanda.data 创建的实例对象。如果是返回 true，否则返回 false 。
console.log (webpanda.data.isInstanceOf (data));

// 获取所有数据工程对象
console.log (webpanda.data.getAll ());
// 根据名称获取数据工程对象
console.log (webpanda.data.get ('test'));
// 根据索引获取数据工程对象
console.log (webpanda.data.getByIndex (1));

/**
 * 根据工程名称获取工程准备状态值
 * -1 表示不存在这个名称的工程，或者这个工程还没有载入进来
 * 0  表示工程未准备
 * 1  表示工程准备完成
 * 2  表示工程准备中
 * 3  表示工程初始化中
 */
console.log (webpanda.data.getReadyState ('test'));

// 根据工程名称设置准备就绪的工程钩子
webpanda.data.ready ('component://animation/progress', {
    onresolve: function (e) {
        // 成功时
        console.log (this);// 当前数据工程对象
    },
    onreject: function (e) {
        // 超时回调函数
    },
    global: true,// 设为全局有效，默认false非全局(页面刷新会被取消)
    timeout: 5000,// 5秒后超时
});
```


## history

浏览记录相关操作。

> 注意，当页面不存在时（触发 onpagenotfound 事件），是不会储存（错误页面）浏览记录的。

```javascript
// 上一页的日志列表
console.log (webpanda.history.backList);
// 获取上一页的数量
console.log (webpanda.history.backList.length);

// 下一页的日志列表
console.log (webpanda.history.forwardList);
// 获取下一页的数量
console.log (webpanda.history.forwardList.length);

// 当前页面的日志数据对象
console.log (webpanda.history.current);
// 获取当前页面的上一步的数量
var lastLength = (webpanda.history.current && webpanda.history.current.getLastLength ()) || 0;
// 获取当前页面的下一步的数量
var nextLength = (webpanda.history.current && webpanda.history.current.getNextLength ()) || 0;


/**
 * back(callback) 上一页
 * 在浏览器历史记录里前往上一页，用户可点击浏览器左上角的返回 (←) 按钮模拟此方法。等价于 `webpanda.history.go(-1)` 。
 * 当浏览器会话历史记录处于第一页时调用此方法没有效果，而且也不会报错。
 */
webpanda.history.back ();
// 或者自定义跳转函数
webpanda.history.back (function (url) {
    // url 是一个字符串
});


/**
 * forward(callback) 下一页
 * 在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进 (→) 按钮模拟此方法。等价于 `webpanda.history.go(1)` 。
 * 当浏览器历史栈处于最顶端时 (当前页面处于最后一页时) 调用此方法没有效果也不报错。
 */
webpanda.history.forward ();
// 或者自定义跳转函数
webpanda.history.forward (function (url) {
    // url 是一个字符串
});


/**
 * go(number,callback) 跳转到某一页
 * 通过当前页面的相对位置从浏览器历史记录 (会话记录) 加载页面。
 * 比如：参数为 `-1` 的时候为上一页，参数为 `1` 的时候为下一页。
 * 当整数参数超出界限时，例如: 如果当前页为第一页，前面已经没有页面了，我传参的值为 `-1`，那么这个方法没有任何效果也不会报错。
 * 调用没有参数的 `webpanda.history.go()` 方法或者参数值为0 时，也没有任何效果也不会报错。
 */
webpanda.history.go (-1);// 等价 webpanda.history.back ()
webpanda.history.go (1);// 等价 webpanda.history.forward ()
webpanda.history.go (2);// 到下2页
// 或者自定义跳转函数
webpanda.history.go (1, function (url) {
    // url 是一个字符串
});


/**
 * last(callback) 上一步
 * 在浏览器历史记录里前往当前页面的上一步。等价于 `webpanda.history.step(-1)` 。
 */
webpanda.history.last ();// 等价于 webpanda.history.step (-1);
// 或者自定义跳转函数
webpanda.history.last (function (url) {
    // url 是一个字符串
});


/**
 * next(callback) 下一步
 * 在浏览器历史记录里前往当前页面的下一步。等价于 `webpanda.history.step(1)` 。
 */
webpanda.history.next ();// 等价于 webpanda.history.step (1);
// 或者自定义跳转函数
webpanda.history.next (function (url) {
    // url 是一个字符串
});


/**
 * step(number,callback) 跳转到某一步
 * 通过当前页面的相对位置从浏览器历史记录 (会话记录) 加载页面的某一步。
 */
webpanda.history.step (-1);// 等价 webpanda.history.last ()
webpanda.history.step (1);// 等价 webpanda.history.next ()
webpanda.history.step (2);// 到下2步
// 或者自定义跳转函数
webpanda.history.step (1, function (url) {
    // url 是一个字符串
});
```



## mount

将自定义变量挂载到框架原型上。

```javascript
// 定义一个函数
webpanda.mount.onhtmlready = function (callback) {
    var readyState = document.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
        callback ();
    } else {
        window.addEventListener ("DOMContentLoaded", callback);
    }
};

// 使用方式：因为挂载到原型上了，可以直接省略 `webpanda.mount` 使用
webpanda.onhtmlready (function () {
    // ...
});
// 也可以写全使用
webpanda.mount.onhtmlready (function () {
    // ...
});
```





## URLEncode

编码 URL ，支持数组、对象、字符串。

```javascript
var test = "abc@#$%&*^xyz";
var code = webpanda.URLEncode (test);
console.log(code);// abc%40%23%24%25%26*%5Exyz

var test = ["abc@#xyz","123$%456"];
var code = webpanda.URLEncode (test);
console.log(code);// ["abc%40%23xyz", "123%24%25456"]

var test = {a:"abc@#xyz",b:"123$%456"};
var code = webpanda.URLEncode (test);
console.log(code);// {a: "abc%40%23xyz", b: "123%24%25456"}
```

## URLDecode

解码 URL ，支持数组、对象、字符串。

```javascript
var test = "abc%40%23%24%25%26*%5Exyz";
var code = webpanda.URLDecode (test);
console.log(code);// abc@#$%&*^xyz

var test = ["abc%40%23xyz", "123%24%25456"];
var code = webpanda.URLDecode (test);
console.log(code);// ["abc@#xyz", "123$%456"]

var test = {a: "abc%40%23xyz", b: "123%24%25456"};
var code = webpanda.URLDecode (test);
console.log(code);// {a: "abc@#xyz", b: "123$%456"}
```

## URLQueryEncode

将关联数组和对象生成 URL Query 字符串。

```javascript
var test1 = {a: "a1", b: "b1", c: "c1"};
var queryString = webpanda.URLQueryEncode (test1);
console.log (queryString);// a=a1&b=b1&c=c1

var test2 = {a: {0: "b1", 1: "a1", c: "c1"}};
var queryString2 = webpanda.URLQueryEncode (test2);
console.log (queryString2);// a[0]=b1&a[1]=a1&a[c]=c1
```


## URLQueryDecode

将URL字符串的query部分, 解析成一个对象。

```javascript
var queryObject = webpanda.URLQueryDecode ("a=a1&b=b1&c=c1");
console.log (queryObject);// {a: "a1", b: "b1", c: "c1"}

var queryObject2 = webpanda.URLQueryDecode ("a[1]=a1&a[0]=b1&a[c]=c1");
console.log (queryObject2);// {a: {0: "b1", 1: "a1", c: "c1"}}
```


## HTMLEncode

编码HTML标签。

```javascript
var test = "<span>这是测试</span>";
var code = webpanda.HTMLEncode (test);
console.log (code);// &lt;span&gt;这是测试&lt;/span&gt;
```


## HTMLDecode

解码HTML实体。

```javascript
var test = "&lt;span&gt;这是测试&lt;/span&gt;";
var code = webpanda.HTMLDecode (test);
console.log (code);// <span>这是测试</span>
```


# 数据工程定义


## name

数据工程的名称。

每个工程都有一个自定义的名称标识，并且这个名称标识必须是全局唯一。

> 注意，如果未定义名称，将会自动生成一个全局唯一名称。

```javascript
webpanda.data ({
    name: "test",
});
```

## abstract

数据工程的抽象状态。

为了实现多态，当某些数据工程只希望作为父类使用，不希望被渲染执行。也就是我们从上层设计角度，就不希望有些数据工程被业务操作。

> 抽象的数据工程，不会初始化构造数据，也不会初始化原型数据，以及不设置事件等等。  
> 并且抽象的数据工程不能作为页面数据工程渲染或执行。

```javascript
webpanda.data ({
    abstract: true,
});
```


## selector

数据工程的筛选器。

数据工程渲染时会将节点渲染到该筛选器节点上。如果不设置，那么就是会渲染到编译器的默认节点上。

```javascript
webpanda.data ({
    selector: "body", // 将工程渲染到 <body></body> 节点容器中
});
```

> 定义值是包含一个或多个要匹配的选择器的 DOM 字符串 DOMString。   
> 该字符串必须是有效的CSS选择器字符串；更多参考 [document\.querySelector()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector) 方法。


## template

数据工程的模板。

模板定义支持字符串、参数对象或`webpanda.url`对象。

> 注意，在继承模板时，URL的方式具有优先级。  
> 这是因为字符串模板会先执行赋值，而URL包含是最后执行，会覆盖前面的模板数据。

```javascript
// 以字符串的方式定义
webpanda.data ({
    template: '<canvas webpanda-after="getCanvasNode (#node)" webpanda-if="s"></canvas>',
});

// 以对象的方式定义
webpanda.data ({
    template: {
        // 也支持 webpanda.url 对象，如：webpanda.url ('index.html')
        src: 'index.html',
        // 追加的方式,追加数据而不是覆盖: prepend 从前面附加|append 从后面附加
        mode: "prepend",
        // 索引。默认的模板索引是0，支持负数，越大的索引拼凑时越排在前面。重复的索引可以覆盖或追加方式config.mode
        index: 0,
    },
});


// 以`webpanda.url`对象定义
webpanda.data ({
    template: webpanda.url ('index.html'),
});
```

## include

数据工程的包含资源文。

引入工程文件、模板文件等。并且，相同的资源只会包含一次（包含状态由框架统一管理）。

> 注意，include 默认情况下是异步包含引入，可以设置async属性: false 表示同步, true表示异步。

```javascript
// 包含一个字符串路径
webpanda.data ({
    include: '/library/test.css',
});

// 支持对象
webpanda.data ({
    include: {
        // 资源路径, 可以是一个webpanda.url创建的对象
        src: '/library/test.css',
        // 是否异步, 默认true(异步)
        async: true,
        // 文件类型, 不设置默认获取资源扩展后缀，无扩展后缀的默认为 text
        type: 'text',

        // 队列升序加载: 是一个数字，默认为null
        // 同一个队列编号，以定义的顺序执行，不同的队列编号，以升序的顺序执行。
        // 队列加载会依次按升序顺序加载，与同步、异步属性不冲突
        // queue: 1,
        queue: null,

        // 回调函数, 无论成功还是失败都会执行
        onfinally: function (include) {
            console.log (this);// 当前数据工程对象
            console.log (include);// include对象
        },
        // 成功回调函数
        onresolve: function (include) {
            console.log (this);// 当前数据工程对象
            console.log (include);// include对象
        },
        // 失败回调函数
        onreject: function (include) {
            console.log (this);// 当前数据工程对象
            console.log (include);// include对象
        },
    },
});


// 支持多个
webpanda.data ({
    include: [
        {
            src: webpanda.url('/library/test.css'),
            async: false,
        },
        '/library/test2.js',
        webpanda.url('/library/test3.js'),

        // 使用 queue 属性来指定队列编号
        // 同一个队列编号，以定义的顺序执行，不同的队列编号，以升序的顺序执行。
        // 相对于由队列编号的第一个执行
        { src: 'http://example.com/test_1.js', queue: 1 },
        // 相对于由队列编号的最后执行
        { src: 'http://example.com/test_3.js', queue: 2 },
        // 相对于由队列编号的第二个执行
        { src: 'http://example.com/test_2.js', queue: 1 },
    ]
});
```

## mount

数据工程的挂载。

指定其他数据工程，挂载到当前数据工程的原型上。主要是解决引入的其他数据工程需要同步准备的问题。

也就是说，要在当前工程使用其他的工程，则需要把其他的工程挂载在当前工程中。被挂载的工程，只要存在，则会自动去准备。而在 `include` 包含引入的数据工程，是不会自动准备的。

> 特别注意， `include` 包含引入的资源文件是默认异步，而在 `mount` 中包含引入的资源地址默认同步加载。

```javascript
webpanda.data ({
    mount: {
        // 数据工程名称
        name: 'test',
        // 也支持 webpanda.url 对象，如：webpanda.url ('test.js')
        src: 'test.js',
        // 工程克隆名称
        clone: null,
        // 分配到当前数据工程的原型属性名称
        use: 'Test',
        // 将数据工程挂载到当前数据工程的标签上
        tag: false,
    }
});


// 支持多个
webpanda.data ({
    mount: [
        {
            name: 'test',
            src: 'test.js',
            use: 'Test',
        },
        {
            name: 'test2',
            src: 'test2.js',
            use: 'Test2',
            tag: true,// 在模板中，可以使用 <Test2 /> 来执行并且渲染该工程
        },

        // 支持挂载多次
        {
            name: 'test',
            src: 'test.js',
            use: 'TestSecond',
        },
    ]
});



/**
 * 更多方式
 */

webpanda.data ({

    /**
     * 解析为：
     * {src: 'xxxxxxx', name: 'test', clone: 'test1', use: 't1', tag:false}
     */
    mount: {
        src: 'xxxxxxx',
        name: 'test',
        clone: {
            name: 'test1',
            use: 't1'
        }
    },

    /**
     * 解析为：
     * {src: 'xxxxxxx', name: 'test', clone: 'test1', use: 'test1', tag:false}
     */
    mount: {
        src: 'xxxxxxx',
        name: 'test',
        clone: 'test1',// 默认解析为 clone:{name: 'test1', use: 'test1', tag:false}
    },

    /**
     * 会解析两种：
     * {src: 'xxxxxxx', name: 'test', use: 'test', tag:false}
     * {src: 'xxxxxxx', name: 'test', clone: 'test1', use: 'test1', tag:false}
     */
    mount: {
        src: 'xxxxxxx',
        name: 'test',
        clone: 'test1',
        use: true,// 需要源数据工程
    },

    /**
     * 会解析两种：
     * {src: 'xxxxxxx', name: 'test', use: 'TestUse', tag:false}
     * {src: 'xxxxxxx', name: 'test', clone: 'test1', use: 't1', tag:false}
     */
    mount: {
        src: 'xxxxxxx',
        name: 'test',
        clone: {
            name: 'test1',
            use: 't1'
        },
        use: 'TestUse',// 需要源数据工程
    },


    /**
     * 挂载如何克隆多份
     * {src: 'xxxxxxx', name: 'test', clone: 'test1', use: 't1', tag:false}
     * {src: 'xxxxxxx', name: 'test', clone: 'test2', use: 'test2', tag:false}
     * {src: 'xxxxxxx', name: 'test', clone: 'test3', use: 'test3', tag:false}
     */
    mount: {
        src: 'xxxxxxx',
        name: 'test',
        clone: [
            {
                name: 'test1',
                use: 't1'
            },
            {
                name: 'test2',
            },
            // 支持字符串
            'test3'
        ]
    },

    /**
     * 挂载如何克隆多份
     * {src: 'xxxxxxx', name: 'test', use: 'TestUse', tag:false}
     * {src: 'xxxxxxx', name: 'test', clone: 'test1', use: 't1', tag:false}
     * {src: 'xxxxxxx', name: 'test', clone: 'test2', use: 'test2', tag:false}
     * {src: 'xxxxxxx', name: 'test', clone: 'test3', use: 'test3', tag:false}
     */
    mount: {
        src: 'xxxxxxx',
        name: 'test',
        use: 'TestUse',// 需要源数据工程
        clone: [
            {
                name: 'test1',
                use: 't1'
            },
            {
                name: 'test2',
            },
            // 支持字符串
            'test3'
        ]
    },

    /**
     * 支持tag
     * 挂载多份
     * {src: 'xxxxxxx', name: 'test', use: false, tag: 'TestTag'}
     * {src: 'xxxxxxx', name: 'test', clone: 'test1', use: 't1', tag: 'TAG'}
     * {src: 'xxxxxxx', name: 'test', clone: 'test2', use: 'test2', tag: 'test2'}
     */
    mount: {
        src: 'xxxxxxx',
        name: 'test',
        use: false,// 为布尔值，false表示不设置use
        tag: 'TestTag',// 需要源数据工程
        clone: [
            {
                name: 'test1',
                use: 't1',
                tag: 'TAG'
            },
            {
                name: 'test2',
                tag: true,// 启用tag，并且命名与name一致
            },
        ]
    },

});
```


## extend

数据工程的继承。

一个数据工程支持继承多个数据工程、继承多次某个数据工程，代码复用，提高维护性。


继承遵守如下规则：

> 1) 越远的父级越先准备。  
> 2) 越远的父级定义结构越优先执行，越近的父级定义结构会覆盖越远父级定义结构。  
> 3) selector、template 在派生数据工程未定义的情况下才继承父级的 selector、template 定义。  
> 4) 只是继承父级的定义结构，不是继承父级最新动态属性值。


```javascript
webpanda.data ({
    extend: {
        // 数据工程的名称
        name: 'test',
        // 也支持 webpanda.url 对象，如：webpanda.url ('test.js')
        src: 'test.js',
        // 忽略继承
        ignore: {
            event: {
                global: '*',
            }
        }
    }
});

//支持继承多个
webpanda.data ({
    extend: [
        {
            name: 'test',
            src: 'test.js',
        },
        {
            name: 'test2',
            src: 'test2.js',
        },

        // 支持继承多次
        {
            name: 'test',
            src: 'test.js',
            ignore: {
                event: {
                    global: '*',
                }
            }
        }
    ]
});
```

忽略选项的结构体：

```shell
[成员属性]: '*',                #忽略父级的全部某项
[成员属性]: {
    global: '*',                #忽略所有父级的全部某项
    global: [value, value1],    #忽略所有父级数据工程的指定某项
    local: {
        key: '*',               #忽略继承中key父级数据工程的所有某项
        key1: [value, value1],  #忽略继承中key1父级数据工程的指定某项
    }
}
```

> 上列结构体中，global表示全局，local表示局部某个工程。

下表解释上列结构体中的key和value分别代表值类型：

```shell
| 成员属性  | 可设置        | key                  | value                  |
| --------- | ------------- | -------------------- | ---------------------- |
| extend    | global、local | 直系派生数据工程名称 | 直系父级数据工程名称   |
| event     | global、local | 数据工程名称         | 事件名称               |
| mount     | global、local | 数据工程名称         | 数据工程名称           |
| include   | global、local | 数据工程名称         | 资源地址src            |
| selector  | global        | （不支持）           | 数据工程名称           |
| template  | global        | （不支持）           | 数据工程名称           |
| prototype | global、local | 数据工程名称         | 原型数据一维单元键名称 |
| construct | global、local | 数据工程名称         | 构造数据一维单元键名称 |
```


越远的父级越先执行，说的是继承父级执行的先后顺序。而在单独的工程内，定义的多个继承是按照从上到下，先定义的顺序先执行：

```javascript
webpanda.data ({
	name: "t1",
    // 继承
    extend: [
        "a1",
        "a2",
        "a3",
    ]
})

webpanda.data ({
	name: "t2",
    // 继承
    extend: [
        "t1",
        "b2",
        "b3",
    ]
})

webpanda.data ({
	name: "test",
    // 继承
    extend: [
        "t2",
    ]
})

// 执行顺序是
// [ a1 > a2 > a3 > t1 ] [ > b2 > b3 > t2 ] > test
```


> 数据工程之间不要相互继承！数据工程之间不要相互继承！数据工程之间不要相互继承！  
> 数据工程之间不要相互继承，这样会造成数据工程初始化缺陷。在执行派生数据工程时，会先准备被继承的数据工程文件，然后要等待被继承的数据工程准备完毕才执行派生数据工程。  
> 如果派生数据工程与被继承数据工程相互继承，这就出现了数据工程未初始化完成（还在准备状态中），框架不会终止数据工程的继承操作，但会在控制台面板中输出错误信息。  

 
## construct

数据工程的构造。

构造的属性会添加观察者，用于模板渲染的响应式数据操作。

> 特别注意，不要在构造数据中赋值为其他的数据工程。因为这样在删除该数据工程的时候，会把其他的数据工程数据观察者信息删除。

```javascript
// Object 定义的方式
webpanda.data ({
    construct: {
        test: { 
            // ...
        },
        testFunc: function() {
            // 函数体内的this就是当前数据工程对象
            console.log (this);
        };
    },
});

// Function 定义的方式
webpanda.data ({
    construct: function () {
        // 当前的数据工程对象
        console.log (webpanda.data.this);
        
        // 可以作为私有内部变量
        var prototype = webpanda.data.this.$.prototype;

        // 子属性禁用观察者
        this.unobtest = webpanda.observer.disable ({});

        this.test = "这是测试";
        this.message = "你好，webpanda.js!";
        this.testFunc = function() {
            // 函数体内的this就是当前数据工程对象
            console.log (this);
        };
    },
});
```



## prototype

数据工程的原型。

原型定义与构造类似，但与构造不同的是，构造属性不会添加观察者，用于非响应式的操作。

```javascript
// Object 定义的方式
webpanda.data ({
    prototype: {
        test: { 
            // ...
        },
        testFunc: function () {
            // 函数体内的this就是当前数据工程对象
            console.log (this);
        };
    },
});

// Function 定义的方式
webpanda.data ({
    prototype: function () {
        // 当前的数据工程对象
        console.log (webpanda.data.this);
        
        // 可以作为私有内部变量
        var prototype = webpanda.data.this.$.prototype;

        this.test = "这是测试";
        this.message = "你好，webpanda.js!";
        this.testFunc = function () {
            // 函数体内的this就是当前数据工程对象
            console.log (this);
        };
    },
});
```




## onpage

页面开始执行的事件。

该事件必须通过使用 `e.page()` 回调函数指定页面数据工程信息，如果不执行页面将停止加载。

```javascript
webpanda.data ({
    onpage: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);
        // webpanda.url 对象
        console.log (e.url);

        /**
         * 路由设置信息
         * {
         *      // 数据工程名称
         *      name: 'test',
         *      // 数据工程克隆名称
         *      clone: null,
         *      // 数据工程文件路径
         *      src: '/src/page/test.js',
         *      // 参数
         *      argument: {
         *          // ...
         *      }
         * }
         */
        console.log (e.setting);
        

        // 如已经设置了，直接执行：可能来自 工程 page 方法的执行
        if (typeof this.setting != 'undefined') {
            e.page (e.setting);
        } 
        // 其他自定义、自动化页面路由
        else if (typeof e.url.path[1] != 'undefined' && e.url.path[1] == 'test') {
            e.page ({
                name: "test",// 工程名称
                src: "/src/test.js",// 工程源文件
            });
        }
    },

});
```


## onpagenotfound

页面不存在的事件。


```javascript
webpanda.data ({
    onpagenotfound: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);
        // webpanda.url 对象
        console.log (e.url);
    },
});
```


## onpageprogress

页面生命周期进度的事件。

```javascript
webpanda.data ({
    onpageprogress: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);
        // webpanda.url 对象
        console.log (e.url);

        // 总进度
        console.log (e.total);
        // 已加载进度
        console.log (e.loaded);
        // 已加载进度百分比
        console.log (e.percent);
    },

});
```


## onpaged

页面最后执行的事件。

```javascript
webpanda.data ({
    onpaged: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);
        // webpanda.url 对象
        console.log (e.url);
    },
});
```


## onpageurlchange

页面路由改变跳转页面的事件。

```javascript
webpanda.data ({
    onpageurlchange: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);
        // webpanda.url 对象
        console.log (e.url);

        // e.accept 与 e.ignore 方法使用
        if (confirm ("你确定要跳转页面么?")) {
            e.accept ();// 跳转 
        } else {
            e.ignore ();// 禁止跳转 
        }
        
    },
});
```



## onpagedestroy

页面离开销毁的事件。

```javascript
webpanda.data ({
    onpagedestroy: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);
        // webpanda.url 对象
        console.log (e.url);

        /**
         * 当前路由的设置信息
         * 注意，不是销毁的页面路由信息，而是新的、将要跳转的新页面的路由设置信息
         * {
         *      // 数据工程名称
         *      name: 'test',
         *      // 数据工程克隆名称
         *      clone: null,
         *      // 数据工程文件路径
         *      src: '/src/page/test.js',
         *      // 参数
         *      argument: {
         *          // ...
         *      }
         * }
         */
        console.log (e.setting);
    },
});
```


## onurlchange

当URL发送改变时，触发该事件。

> 注意，`onpageurlchange()` 事件触发时（也就是页面跳转时），该事件不会被触发。

```javascript
webpanda.data ({
    onurlchange: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);
        // webpanda.url 对象
        console.log (e.url);

    },

});
```


## onready

当前数据工程准备完成的事件。

```javascript
webpanda.data ({
    onready: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);

    },

});
```


## onexecute

当前数据工程执行之前的事件。

> 数据工程对象执行 `$.page()`、`$.execute()` 方法或者作为页面数据工程时，会触发该事件。
> 可以使用数据工程对象的 `$.pause()` 、`$.start()`、`$.stop()` 等相关方法，对数据工程的执行状态进行操作。

```javascript
webpanda.data ({
    onexecute: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);

        // 数据工程对象执行的自定义参数
        // 如：this.$.execute ({id:1,n:2}); 这里的 {id:1,n:2} 就是 e.argument 
        console.log (e.argument);

        // 全局暂停执行
        this.$.pause ();
        // 只暂停执行
        e.pause ();

        // 全局开始执行
        this.$.start ();
        // 只开始执行
        e.start ();

        // 全局停止执行
        this.$.stop ();
        // 只停止执行
        e.stop ();
    },

});
```

## onexecuted

当前数据工程完成执行的事件。

> 数据工程对象执行 `$.page()`、`$.execute()` 方法或者作为页面数据工程时，会触发该事件。  
> 特别注意：在数据工程执行时，当数据工程对象的 `$.stop()` 等相关方法使用后，该事件不会被执行。


```javascript
webpanda.data ({
    onexecuted: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onexecute
        console.log (e);
    },

});
```

## onexecutestart

当前数据工程开始执行的事件。

> 在数据工程执行时，使用数据工程对象 `$.start()` 等相关方法会触发该事件。

```javascript
webpanda.data ({
    onexecutestart: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onexecute
        console.log (e);
    }
});
```

## onexecutepause

当前数据工程暂停执行的事件。

> 在数据工程执行时，使用数据工程对象 `$.pause()` 等相关方法会触发该事件。

```javascript
webpanda.data ({
    onexecutepause: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onexecute
        console.log (e);
    }
});
```


## onexecutestop

当前数据工程停止执行的事件。

> 在数据工程执行时，使用数据工程对象 `$.stop()` 等相关方法会触发该事件。

```javascript
webpanda.data ({
    onexecutestop: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onexecute
        console.log (e);
    }
});
```


## onlaunch

当前数据工程启动之前的事件。

> 数据工程对象执行 `$.page()`、`$.execute()` 、`$.launch()` 方法或者作为页面数据工程时，会触发该事件。
> 可以使用数据工程对象的 `$.pause()` 、`$.start()`、`$.stop()` 等相关方法，对数据工程的启动状态进行操作。

```javascript
webpanda.data ({
    onlaunch: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);

        // 数据工程对象执行的自定义参数
        // 如：this.$.launch ({id:1,n:2}); 这里的 {id:1,n:2} 就是 e.argument 
        console.log (e.argument);

        // 全局暂停执行
        this.$.pause ();
        // 只暂停启动
        e.pause ();

        // 全局开始执行
        this.$.start ();
        // 只开始启动
        e.start ();

        // 全局停止执行
        this.$.stop ();
        // 只停止启动
        e.stop ();
    },

});
```

## onlaunched

当前数据工程完成启动的事件。

> 数据工程对象执行 `$.page()`、`$.execute()`、`$.launch()` 方法或者作为页面数据工程时，会触发该事件。  
> 特别注意：在数据工程启动时，当数据工程对象的 `$.stop()` 等相关方法使用后，该事件不会被执行。

```javascript
webpanda.data ({
    onlaunched: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onlaunch
        console.log (e);
    },

});
```


## onlaunchstart

当前数据工程开始启动的事件。

> 在数据工程启动时，使用数据工程对象 `$.start()` 等相关方法会触发该事件。

```javascript
webpanda.data ({
    onlaunchstart: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onlaunch
        console.log (e);
    }
});
```

## onlaunchpause

当前数据工程暂停启动的事件。

> 在数据工程启动时，使用数据工程对象 `$.pause()` 等相关方法会触发该事件。

```javascript
webpanda.data ({
    onlaunchpause: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onlaunch
        console.log (e);
    }
});
```

## onlaunchstop


当前数据工程停止启动的事件。

> 在数据工程启动时，使用数据工程对象 `$.stop()` 等相关方法会触发该事件。

```javascript
webpanda.data ({
    onlaunchstop: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onlaunch
        console.log (e);
    }
});
```

## onrender

当前数据工程渲染之前的事件。

> 数据工程对象执行 `$.page()`、`$.execute()` 、`$.launch()`、`$.render()` 方法或者作为页面数据工程时，会触发该事件。
> 可以使用数据工程对象的 `$.pause()` 、`$.start()`、`$.stop()` 等相关方法，对数据工程的渲染状态进行操作。

```javascript
webpanda.data ({
    onrender: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 事件名称
        console.log (e.name);
        // 当前页面执行时间
        console.log (e.runtime);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);

        // 数据工程对象执行的自定义参数
        // 如：this.$.render ({id:1,n:2}); 这里的 {id:1,n:2} 就是 e.argument 
        console.log (e.argument);

        // 全局暂停执行
        this.$.pause ();
        // 只暂停渲染
        e.pause ();

        // 全局开始执行
        this.$.start ();
        // 只开始渲染
        e.start ();

        // 全局停止执行
        this.$.stop ();
        // 只停止渲染
        e.stop ();
    },

});
```

## onrendered

当前数据工程完成渲染的事件。

> 数据工程对象执行 `$.page()`、`$.execute()` 、`$.launch()`、`$.render()` 方法或者作为页面数据工程时，会触发该事件。 
> 特别注意：在数据工程渲染时，当数据工程对象的 `$.stop()` 等相关方法使用后，该事件不会被执行。

```javascript
webpanda.data ({
    onrendered: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onrender
        console.log (e);
    },

});
```

## onrenderstart

当前数据工程开始渲染的事件。

> 在数据工程渲染时，使用数据工程对象 `$.start()` 等相关方法会触发该事件。

```javascript
webpanda.data ({
    onrenderstart: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onrender
        console.log (e);
    }
});
```

## onrenderpause

当前数据工程暂停渲染的事件。

> 在数据工程渲染时，使用数据工程对象 `$.pause()` 等相关方法会触发该事件。

```javascript
webpanda.data ({
    onrenderpause: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onrender
        console.log (e);
    }
});
```

## onrenderstop

当前数据工程停止渲染的事件。

> 在数据工程渲染时，使用数据工程对象 `$.stop()` 等相关方法会触发该事件。

```javascript
webpanda.data ({
    onrenderstop: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 参考 onrender
        console.log (e);
    }
});
```

## onrenderobserver

当前数据工程的观察者触发事件。

> 用于编译对象渲染时所设置的 `onobserver` 方法，渲染数据响应式更新时就会触发该事件。

```javascript
webpanda.data ({
    onrenderobserver: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 更多参考 onrender
        console.log (e);

        // 触发目标：观察者相关数据
        // {publisher: ..., virtualNode: ...}
        console.log (e.target);
    }
});
```


## 原生事件

支持添加原生的 window、document 事件，会根据如下规则：

> 1.如果指定window 或 document 的事件，则以 ondocument* 或 onwindow* 前缀开头。  
> 2.如果不指定前缀，window 支持的事件，优先绑定到 window，只有 window 不支持而 document 支持的事件，则绑定到 document 。  
> 3.事件名称都是小写。


```javascript
webpanda.data ({

    /**
     * 在 window、document 中，JS 原生的双击事件是 ondblclick
     * 在这里就是 "ondblclick" 命名规则, 注意大小写
     * 如果不指定前缀，window 支持的事件，优先绑定到 window
     * 所以这里等价于 window.ondblclick 
     */
    ondblclick: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);
        // js原生的事件对象参数
        console.log (e);
    },

    /**
     * 指定 document 事件，则以 ondocument* 前缀开头
     * 所以这里等价于 document.ondblclick
     */
    ondocumentdblclick: function (e) {
        // 当前数据工程对象
        console.log (this);
        // 是一个函数, 阻止事件冒泡, 后面未执行的事件回调函数不再执行
        console.log (e.stopPropagation);
        // js原生的事件对象参数
        console.log (e);
    },
    
    /**
     * 指定 window 事件，则以 onwindow* 前缀开头
     * 所以这里等价于 window.onclick
     */
    onwindowclick: function (e) {
        // ...
    }
});
```

# 数据工程对象


## name

数据工程对象的名称。

```javascript
// 根据名称获取数据工程对象
console.log (webpanda.data.get ('test'));
```

## index

数据工程对象会自动创建一个索引，具备全局唯一，即使相同的工程名称删除后再创建，其索引也不一样。


## base

数据工程对象继承的父级信息。


## derived

数据工程对象被继承的派生信息。


## clone

数据工程对象的克隆。

克隆数据工程与继承数据工程不同。克隆数据工程会以被克隆的数据工程原始定义的结构，创建一个新的数据工程。

> 克隆的新数据工程并没有准备，需要手动去准备。  
> 克隆时如果未定义数据工程的名称则会自动创建一个全局唯一的名称。  

```javascript
// 这里示例this为数据工程对象

// 不设置 name 会自动生成一个唯一的工程名称
console.log (this.$.clone ());

// 克隆一个指定名称的新工程，因为有可能名称重复，所以有可能创建失败：
var test = this.$.clone ('test');
if (test) {
    console.log ("数据工程克隆成功：", test);
}

// 克隆的新数据工程并没有准备，需要手动去准备
this.$.clone ().$.ready ();
```


## remove

删除数据工程对象，包括清理已经渲染在页面上的节点等信息。删除后，该数据工程将被移除，包括其父级与派生的关系，注意，但不会删除派生和父级的数据工程对象。



## ready

准备工程或准备完成执行。



数据工程定义后会返回还没有准备的数据工程对象，那么可以使用 `$.ready()` 方法进行准备。

> 注意，如果数据工程在准备的时候，其挂载的数据工程也要发起准备操作。  
> 所以，当前数据工程挂载其他数据工程后，在当前数据工程准备完成后，其他被挂载的数据工程也是准备完成了的。

```javascript
// 临时定义
var test = webpanda.data ({
    name: "test",
});

// 去准备, 返回准备的状态值
var readyState = test.$.ready ();
```

> 在明确工程已经载入定义，但不清楚其是否准备好的情况下，使用 `ready(callback)` 方法是最保险的做法：

```javascript
// 去准备, 返回准备的状态值
var readyState = test.ready (function () {
    // 当工程载入并且准备完毕后，会执行这个回调函数
    // this 就是这个准备好的工程对象
    console.log (this);
});
```

> 在工程准备时，可能有些同步包含的文件加载时间长，为了更好的控制，是可以设置等待超时。
> 注意，这里的超时只是当前等待回调执行的超时，不是让工程准备操作的超时，也就是说这里的超时设置不影响工程准备。

```javascript
// 去准备, 返回准备的状态值
var readyState = test.ready ({
    global: true,// 是否全局有效，默认false非全局(页面刷新会被取消)
    timeout: 3000,// 3秒后超时
    onresolve: function () {
        // 当工程载入并且准备完毕后，会执行这个回调函数
        // this 就是这个准备好的工程对象
        console.log (this);
    },
    onreject: function () {
        console.log ('这是超时回调函数');
    }
});
```



## readyState

返回准备的状态值：

```shell
-1 表示不存在这个名称的工程，或者这个工程还没有载入进来
0  表示工程未准备
1  表示工程准备完成
2  表示工程准备中
3  表示工程初始化中
```

```javascript
var test = webpanda.data.get ("test");
console.log (test.$.readyState ());
```




## selector

数据工程对象的筛选器相关操作。


```javascript
// 这里示例this为数据工程对象

// 如果参数为空，则筛选器节点，可能是 DOM 节点、虚拟节点对象、undefined
// 如果工程未定义筛选器，则返回编译器的默认筛选器（渲染 DOM 节点），如果未初始化编译器，返回 `undefined` 。
console.log (this.$.selector ());

// 设置的筛选器（支持DOM节点、DOM节点筛选字符串、虚拟节点对象），返回 this.$ 对象。
this.$.selector ('body');

// 返回 this.$ 对象，可以链式操作
this.$.selector ('body').render ();
```



## template

数据工程对象的模板相关操作。

```javascript
// 这里示例this为数据工程对象

// 如果参数为空，返回该工程的模板内容。
console.log (this.$.template ());

// 设置模板内容
this.$.template ('这是模板后排内容...', {
    // 追加的方式,追加数据而不是覆盖: prepend 从前面附加|append 从后面附加
    mode: "prepend",
    // 索引。默认的模板索引是0，支持负数，越大的索引拼凑时越排在前面。重复的索引可以覆盖或追加方式config.mode
    index: -10,
});
this.$.template ('这是模板前排内容...', {
    index: 1,
});


// 设置返回的是 this.$ 对象，所以可以链式操作
this.$.template ('...').render ();
```


## templateClear

数据工程对象的模板清理操作。

```javascript
// 这里示例this为数据工程对象

// 如果参数为空，则清理全部索引的模板内容
this.$.templateClear ();
// 指定清理某个索引的模板内容
this.$.templateClear (1);
```


## compiler

数据工程对象的编译器对象。


```javascript
// 详见 webpanda 对象 compiler
// 这里示例this为数据工程对象

// 获取渲染后的HTML内容
console.log (this.$.compiler.html ());
// 获取渲染后的text内容
console.log (this.$.compiler.text ());
```


## tag

数据工程对象的标签。

在定义数据工程的挂载时，可以将挂载的数据工程对象设为tag。在模板中，可以以HTML tag方式执行使用。

```javascript
webpanda.data ({
    mount: {
        name: 'test',
        src: 'test.js',
        tag: 'Test',
    }
});
```

在模板的HTML中使用：

```html
<Test><Test/>
```


当然，也可以在准备好的数据工程对象上直接添加tag：

```javascript
// 这里示例this为数据工程对象

this.tag.Test = webpanda.data.get ('test');
```
> 注意，这种操作一般是需要准备好的数据工程对象。



## eventListener

数据工程对象的监听器信息。


## event

数据工程对象的事件相关操作。

通过该方法，可以启用或关闭数据工程的事件。有时候在页面工程中调用其他工程，并且其他工程在当前工程也能监控一些事件，可以使用该方法。

执行的优先级：

> 1) 先执行页面数据工程事件  
> 2) 再执行局部数据工程事件  
> 3) 最后执行全局数据工程事件  


在非原生事件中，只对下面的非原生事件有控制效果：

```shell
onpage|onpagenotfound|onpageprogress|onpaged|onpageurlchange|onpagedestroy|onurlchange
```

除了上列的非原生事件、以及window、document原生事件之外，其他的非原生事件设置无效。

```javascript
// 这里示例this为数据工程对象

// 如果参数为空，则获取所有的已使用事件的状态信息，返回值是一个 Object
// 在返回值中 --global 里面是全局的，外面是局部的, 如： {'--global': {onclick: true}, ondblclick: true, ...}
console.log (this.$.event ());

// 使用该方法进行关闭或开启某几个事件，并且设为局部：
this.$.event ({
    // 关闭双击事件
    ondblclick : false,
    // 开启显示事件
    onshow : true,
});

// 禁用所有的已定义事件，只取消局部的
this.$.event ({'--local': false});
// 开启所有的已定义事件，并且设为局部
this.$.event ({'--local': true});

// 将onclick启用并且将onclick设为全局
this.$.event ({'--global': {
	onclick: true
}});

// 关闭全局事件中的onclick
this.$.event ({'--global': {
	onclick: false
}});

// 所有的已定义事件启用并且设为全局
this.$.event ({'--global': true});
// 所有的已定义全局事件全部取消，局部的不取消
this.$.event ({'--global': false});
```



## page

以数据工程对象的信息作为页面配置，来加载页面。

> 执行该方法，会触发数据工程对象的执行、启动、渲染相关事件。
> 关于 -- 前缀的参数，灵感来源css的自定义变量。与模板解析的 -- 简写属性相呼应。所以是两个“-”符号，而不是一个


```javascript
// 这里示例this为数据工程对象

this.$.page ({
    // 自定义参数
    parameter1: 'parameter1',
    parameter2: 'parameter2',
    // 是否全局渲染。如果为true, 则表示页面更新不会被关闭渲染和数据观察者
    '--global': true|false,
    // 设置筛选器
    '--selector': 'body',
    // 支持临时事件
    '--onpaged': function (e) {
        // 详见数据工程定义的 onpaged ...
    }
});
```

## execute

执行数据工程。

> 执行该方法，会触发数据工程对象的执行、启动、渲染相关事件。

```javascript
// 这里示例this为数据工程对象

this.$.execute ({
    // 自定义参数
    parameter1: 'parameter1',
    parameter2: 'parameter2',
    // 是否全局渲染。如果为true, 则表示页面更新不会被关闭渲染和数据观察者
    '--global': true|false,
    // 设置筛选器
    '--selector': 'body',
    // 支持临时事件
    '--onexecuted': function (e) {
        // 详见数据工程定义的 onexecuted ...
    }
});
```


## launch

启动数据工程。

> 执行该方法，会触发数据工程对象的启动、渲染相关事件。

```javascript
// 这里示例this为数据工程对象

this.$.launch ({
    // 自定义参数
    parameter1: 'parameter1',
    parameter2: 'parameter2',
    // 是否全局渲染。如果为true, 则表示页面更新不会被关闭渲染和数据观察者
    '--global': true|false,
    // 设置筛选器
    '--selector': 'body',
    // 支持临时事件
    '--onlaunched': function (e) {
        // 详见数据工程定义的 onlaunched ...
    }
});
```

## render

> 执行该方法，会触发数据工程对象的渲染相关事件。

```javascript
// 这里示例this为数据工程对象

this.$.render ({
    // 自定义参数
    parameter1: 'parameter1',
    parameter2: 'parameter2',
    // 是否全局渲染。如果为true, 则表示页面更新不会被关闭渲染和数据观察者
    '--global': true|false,
    // 设置筛选器
    '--selector': 'body',
    // 支持临时事件
    '--onrendered': function (e) {
        // 详见数据工程定义的 onrendered ...
    }
    '--onrenderpause': function (e) {
        // 详见数据工程定义的 onrenderpause ...
    }
});
```


## start

数据工程对象的开始执行、启动、渲染。

> 在执行生命周期中，表示开始执行；在启动生命周期中，表示开始执行；在渲染生命周期中，表示开始渲染。  
> 这个是数据工程对象的全局操作，比如在执行生命周期中，表示开始执行、开始启动、开始渲染。  
> 注意，如果在该方法之前已经执行了 `$.stop()` 那么将无法启动。启动只对暂停时有效。

```javascript
// 这里示例this为数据工程对象

this.$.start ();
});
```


## pause

数据工程对象的暂停执行、启动、渲染。

> 生命周期参考 `$.start()`。  
> 注意，只有正在执行、正在启动、正在渲染才能有效，如果已经停止了，无法暂停。

```javascript
// 这里示例this为数据工程对象

this.$.pause ();
});
```

## stop

数据工程对象的停止执行、启动、渲染。

> 生命周期参考 `$.start()`。
> 注意，如果已经停止了，使用无效。

```javascript
// 这里示例this为数据工程对象

this.$.stop ();
});
```




## 页面数据工程

在当前页面中，指定使用 `$.page()` 方法执行的数据工程信息，被称之为页面数据工程。

页面数据工程默认情况下启用自己所有的事件为局部事件，并且会根据其筛选器进行渲染。

生命周期执行顺序如下：

```shell
onexecute -> onlaunch -> onrender -> onrendered -> onlaunched -> onlaunched -> onexecuted
```


## 局部数据工程


在当前页面中，某个数据工程进行了局部渲染，或者使用了局部的事件，这些操作的数据工程被称之为局部数据工程。


## 全局数据工程

在当前页面中，某个数据工程进行了全局渲染，或者使用了全局的事件，这些操作的数据工程被称之为全局数据工程。


## 单例模式

webpand.js 是面向单例模式编程的。每个数据工程都是单例的，是唯一性的。

> 特别注意，在同一个页面中，一个数据工程只会被渲染显示一处，无法多处同时渲染显示的。  
> 如果想要一个页面多处渲染，需要对数据工程进行拷贝操作，也就是克隆一个新的数据工程。


## 全局数据流

正因为数据工程是单例的，所以每个页面都能全局通用，每个数据工程可以相互挂载，状态都是共享的，这样就实现了全局数据流。




# 模板语法


## 打印 \-html、$\{\}

允许采用文本特殊符号的模板语法来输出 HTML 内容的变量。也就是说不会执行 `webpanda.HTMLEncode` 方法。

其中，`webpanda-html` 命令不能在同一个标签中存在多个。如果其节点包含子内容，那么其子内容跳过编译过程，会被当做源字符串打印输出，也就是说不会识别模板语法命令。

> 注意， $\{\} 是 webpanda\-html 等价写法。

```html
<div webpanda-html="name"></div>
<!--支持单标签-->
<div webpanda-html="name"/>

<!--字符串的写法-->
<div>${ message }</div>
<!--使用 JavaScript 表达式-->
<div>${ message + '测试' }</div>
```


## 编码打印 \-text、\{\{\}\}

允许采用文本特殊符号的模板语法来输出文本内容的变量。该命令的使用会将html实体编码（自动执行了 `webpanda.HTMLEncode` 方法）。

其中，`webpanda-text` 命令不能在同一个标签中存在多个。如果其节点包含子内容，那么其子内容跳过编译过程，会被当做源字符串打印输出，也就是说不会识别模板语法命令。

> 注意， \{\{\}\} 是 webpanda\-text 等价写法。

```html
<div webpanda-text="message"></div>
<!--支持单标签-->
<div webpanda-text="message"/>

<!--字符串的写法-->
<div>{{ message }}</div>
<!--使用 JavaScript 表达式-->
<div>{{ message + '测试' }}</div>
```



## 模板 \-template

该命令用于插入模板字符串。该命令不能在同一个标签中同时存在多个。 该命令会根据模板字符串创建子节点树。

```html
<div webpanda-template="example"></div>
```

渲染数据如下：

```javascript
// 示例compiler是编译对象

// 渲染
compiler.render ({
    // 渲染数据
    data: {
        example: "<div>{{message}}</div>",
        message: '这是消息'
    },
    selector: "view"
});
```

输出的时候会先解析 `example` 模板数据，输出 `{{message}}` 的模板数据：

```html
<div webpanda-template="example"></div>
```



### 定义模板片段

如果使用该命令为空命令，可以里面包裹其他子标签，最终解析、渲染结果将不包含其子节点，只会解析并渲染当前节点。而子节点可以作为其他用途的模板字符串。


```html
<div webpanda-template>
    <span>这里的节点将不会被渲染，也不会被解析</span>
</div>
```

主要用于模板碎片化，利于多个工程之间模板内容相互传递。


使用示例伪代码：

> 通过预编译声明获取模板内容：#this.inner 

```html
<Header webpanda-template webpanda-before="#disable;Header.INNER_TEMPLATE=#this.inner;">
    <span>这里的节点将不会被渲染，也不会被解析</span>
</Header>
```


### 模板递归嵌入会造成死循环

因为模板标签是可以解析模板语法的，所以模板标签里面请勿嵌套自身(递归)的模板标签。

如下示例：

```javascript
// 示例compiler是编译对象

// 渲染
compiler.render ({
    // 渲染数据，注意这是错误的示例：example 递归自己
    data: {
        example:'<div webpanda-template="example"></div>',
    },
    selector: "view"
});
```

就会出现如下错误信息（超过最大调用堆栈大小），如下：

```
Uncaught RangeError: Maximum call stack size exceeded
```




## 遍历 \-for

该命令用于根据对象、数组来遍历性地渲染一块内容。该命令不能在同一个标签中同时存在多个。 

在下面的命令中`webpanda-for="(v, k, i)items"`，第一个参数`v`是循环单位value的别名；第二个参数`k`是循环单位key的别名并且可以省略；第三个参数`i`是单元个数的别名并且可以省略。多个参数以英文逗号隔开。

```html
<ul id="example">
  <li webpanda-for="(item, k, index) items">
    {{ item.message }}
  </li>
</ul>
```

被遍历变量也可以是一个函数，可以传入函数参数。但这个函数的返回值必须是Array类型或者Object类型的数据：

```html
<ul id="example" webpanda-for="(item , k) itemsFunction()">
  <li webpanda-for="(sonItem) item.son(type,'123')">
    {{ sonItem.message }}
  </li>
</ul>
```

如果只想使用单位值与单位索引，示例：

```html
<ul id="example" webpanda-for="(item , , index) itemsFunction()">
</ul>
```

注意，遍历单位键、值的别名称不能是渲染数据的属性，不然节点会报错，并且不会被渲染。 如下 `k` 别名错误示例：

```javascript
// 示例compiler是编译对象

// 渲染
compiler.render ({
    // 渲染数据
    data: {
        type: "这是测试",
        itemsFunction: function () {
            return [
                { 
                    son: function (args1, args2) {
                        return {message: args1};
                    }
                }
            ];
        },
        // 注意这是错误的示例
        k: '索引',// 这里与webpanda-for="(item , k) itemsFunction()"中的k冲突
    },
    selector: "view"
});
```

> 注意，只要报错就会失去自动渲染的能力。

## 遍历标识 \-for\-id

webpanda\-for\-id 就是对节点进行一个标识，用于 webpanda-for ，主要解决在数据修改或更新后，通过id这个唯一标识进行对比虚拟DOM，从而决定节点的重新加载以及复用。

```html
<ul>
    <li webpanda-for="(p,index) persons" webpanda-for-id="p.id">
        {{p.name}}-{{p.age}}
        <input type="text">
    </li>
</ul>
```




## 指令 &lt;webpanda&gt; 、-webpanda

该命令是将节点当做指令节点，最终的渲染结果将不包含其节点，但会渲染其子节点。

>  注意，原生节点相关的命令都无效果，如 webpanda-style 、webpanda-class 等。

如果同一个标签存在其他的命令，下列命令才有效果：

```shell
webpanda-before,webpanda-template,webpanda-for,webpanda-if,webpanda-else-if,webpanda-else,webpanda-is,webpanda-text,webpanda-html,webpanda-after
```

如果非上列命令，让其他命令与其搭配的话将无其他命令效果，因为无效节点是具有优先级的。


> 指令一共有两种写法。  
> 虽然 \<webpanda\>  与 webpanda\-webpanda 的写法不同，但效果是等价的。


```html
<ul id="example">
    <!-- 标签的方式 -->
    <webpanda webpanda-for="(item, index) items">
    <li>
        {{ item.message }}
    </li>
    </webpanda>
</ul>
<ul id="example">
    <!-- 属性的方式 -->
    <div webpanda-webpanda webpanda-for="(item, index) items">
    <li>
        {{ item.message }}
    </li>
    </div>
</ul>
```

用指令单标签的方式，配合打印命令实现插值`{{}}`功能：

```html
<webpanda webpanda-text="message"/>
```

上例等同于下例写法：

```html
{{message}}
```




## 条件 \-if、\-else\-if、\-else

该组命令用于条件性地渲染一块内容。这块内容只会在命令的表达式返回 `truthy` 值的时候被渲染。该组命令不能在同一个标签中同时存在或存在多个。

> `webpanda-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 `truthy` 值的时候被渲染。  
> `webpanda-else` 延伸了 `webpanda-if` 语句，可以在 `webpanda-if` 语句中的表达式的值为 `falsy` 时执行语句。  
> `webpanda-else-if`，和此名称暗示的一样，是 `webpanda-if` 和 `webpanda-else` 的组合。和 `webpanda-else` 一样，它延伸了 `webpanda-if` 语句，可以在原来的 `webpanda-if` 表达式值为 `falsy` 时执行不同语句。但是和 `webpanda-else` 不一样的是，它仅在 `webpanda-else-if` 的条件表达式值为 `truthy` 时执行语句。


```html
<div webpanda-if="typeof testArray == 'object'">testArray 是一个对象</div>
<!--条件中间是可以写文本和注释的-->
<div webpanda-else-if="testArray">
    testArray 不是数组，但是一个真值
</div>
<div webpanda-else>
    testArray 为假
</div>
```



## 状态 \-is

该命令与`webpanda-if`一样，用于条件性地渲染一块内容。这块内容只会在命令的表达式返回 `truthy` 值的时候被渲染。

该命令不能在同一个标签中存在多个。 如果同时使用了`webpanda-if`、`webpanda-is` 这两个命令时，需要两个命令值都为真时才会去渲染数据。而其中`webpanda-if`会先进行执行判断，然后再执行判断`webpanda-is`。 

> 注意，同一个节点中`webpanda-for`命令相对于`webpanda-is`具有优先级，所以在同一个节点上 `webpanda-is`可以判断`webpanda-for`遍历出来的参数值。

如下所示， `webpanda-is` 不能判断`items`，但能判断其遍历后的 `item` 数据：

```html
<ul id="example">
  <li webpanda-for="(item,index)items" webpanda-is="item.id == '1'">
    {{ item.message }}
  </li>
</ul>
```

而`webpanda-if`相对于`webpanda-for`命令具有优先级，所以是无法在同一个节点上判断其遍历参数。只能判断`items`同级渲染数据。

```html
<ul id="example">
  <li webpanda-for="(item,index)items" webpanda-if="typeof items == 'object'" webpanda-is="item.id == '1'">
    {{ item.message }}
  </li>
</ul>
```



## 属性 \-attribute

该命令的表达式结果返回字符串作为属性值。

该命令在同一个标签中可以存在多个。语法为`webpanda-attribute="对象表达式"`，示例如下：

```html
<div webpanda-attribute="{name:'attrTestName', id:'attrTestId', var:attrTest}">添加属性</div>
<div webpanda-attribute="{as:attrTestAs}">属性添加全名称</div>
<div webpanda-attribute="{as:attrTestAs}" webpanda-attribute="arrObjsTest">可以存在多个属性设置</div>
```

input、option 值的设置：

```html
<input type="Text" webpanda-attribute="{value:setValue}"/>
<input type="Radio" webpanda-attribute="{checked:setBool}"/>
<select>
    <option webpanda-attribute="{selected:'selected',value:'hk'}">Hong Kong</option>
</select>
```

textarea 值的属性设置：

```html
<textarea webpanda-attribute="{value:setValue}"></textarea>
```

等价于：

```html
<textarea>{{setValue}}</textarea>
```

> 注意，在 textarea 标签中，webpanda\-attr="\{value:setValue\}" 的用法是具有优先级的。



### 单个属性操作 \-attribute\-\*

如果是单个属性操作，可以使用 `webpanda-attribute-[属性名称]="值"` 方式设置，如下所示：

```html
<input type="Text" webpanda-attribute-value="setValue"/>
<textarea webpanda-attribute-value="setValue"></textarea>
```





## 类 \-class

该命令的表达式结果的类型必须是对象。该命令在同一个标签中可以存在多个。

语法为`webpanda-class="对象表达式"`，与 `webpanda-attr` 语法一样。

对象的键名称渲染出来即是类名称，这个类名称是否存在将取决于对应值的返回值是否为真。下面的语法表示 `active` 这个 class 存在与否将取决于渲染数据 `isActive` 是否为真：

```html
<div webpanda-class="{ active: isActive }"></div>
```

在对象中传入更多属性来动态切换多个 class。此外，`webpanda-class` 指令也可以与普通的 class 属性共存。下面的语法表示`isStatic`为假，那么会删除`static`类。同理，当`isActive`、`hasError`为假，那么`active`与`text-danger`会被删除，反之则添加。

```html
<div class="static" webpanda-class="{ active: isActive, 'text-danger': hasError, static: isStatic }"></div>
```

如果你也想根据条件切换列表中的 class，可以用三元表达式：

```html
<div webpanda-class="{active:(isActive == 'test'?true:false)}"></div>
```

支持字符串的形式:

```html
<div webpanda-class="`active-{{ n }}`"></div>
```


### 单个类名称操作 \-class\-\*

如果是单个类名称操作，可以使用 `webpanda-class-[类名称]="布尔值"` 方式设置，如下所示：

```html
<div webpanda-class-active="{(isActive == 'test'?true:false)}"></div>
```





## 样式 \-style

该命令的表达式结果的类型必须是对象。该命令在同一个标签中可以存在多个。

语法为`webpanda-style="对象表达式"`，与 `webpanda-attr` 语法一样。

CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<div webpanda-style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

可以为 `webpanda-style` 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div webpanda-style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 `flexbox`，那么就只会渲染： `display: flex`



### 删除样式操作 

有时候还可以根据渲染数据的真假值来删除样式，如下，当`v`为假则设为空字符串 ，便会取消掉该样式：

```html
<div style="color:green;" webpanda-style="{'color': (v?'red':'') }"></div>
```

> 特别注意，与 `webpanda-class` 命令不同，删除样式必须是空字符串，如果是 `false`、`null` 则存在不会生效。  
那么为什么框架不将 `false` 、 `null` 自动转为空字符串呢？ 为了以后扩展吧。




### 单个样式操作 \-style\-\*


如果是单个样式操作，可以使用 `webpanda-style-[样式名称]="样式值"` 方式设置，如下所示：

```html
<!-- 注意，webpanda-style-fontSize 则无效, 因为会被转换为小写 fontsize, 所以单个需要使用 “-” 符号 -->
<div webpanda-style-font-size="fontSize + 'px'"></div>
```

> 注意，单个样式操作，后面的值不要加 “`;`” 符号，不然在原生中赋值不起作用。



## 事件 \-event

该命令的表达式中可以多个事件，该命令在同一个标签中可以存在多个。

表达式中，多个事件调用同一个方法则以空格隔开。语法格式：`webpanda-on[事件名称]="JavaScript 代码"` 。

直接执行表达式：

```html
<div webpanda-onclick="n++">这是一个点击事件</div>
```

传入自定义参数：

```html
<div webpanda-onclick="n++;eClickFnTest(123,'abc',$val)">这是一个点击事件</div>
```

指定方法函数接收预编译声明，需要加上`#`符号前缀，表示赋值给所在位置参数：

```html
<div webpanda-onclick="eClickFnTest(#node,#event)">这是一个点击事件</div>
```

指定方法函数接收预编译声明并且传入自定义参数：

```html
<div webpanda-onclick="eClickFnTest($val,#event,#node)">这是一个点击事件</div>
```

在同一个标签中可以存在多个，并且一个标签支持多个事件名称 `webpanda-on*-on*-on*-N` ：

```html
<input value="" webpanda-oninput-onpropertychange="eChangeFnTest(#node,#value)" webpanda-onclick="eClickFnTest()" />
```

> 注意，多个事件名称必须名称要写全，也就是必须 `on` 开头，这样才会被识别。




### 返回值为false，阻止事件默认行为

在HTML标签中，写法如下：

```html
<a href="https://www.baidu.com/" webpanda-onclick="return false"></a>
```

或者让函数执行并返回结果：

```html
<a href="https://www.baidu.com/" webpanda-onclick="return eClickFnTest(#event)"></a>
```

当然，在事件处理函数中，可自行操作：

```javascript
this.eClickFnTest = function (e) {
    // 取消事件的默认行为
    e.preventDefault ();
    // 也可以直接返回 false，前提在标签中也用了 return
    return false;
};
```



### 模板预编译声明 \#preventDefault，阻止事件默认行为

```html
<a href="https://www.baidu.com/" webpanda-onclick="#preventDefault"></a>
```




### 模板预编译声明 \#stopPropagation，阻止事件冒泡

方式一，通过模板预编译声明实现：

```html
<div>
	<a webpanda-onclick="#stoppropagation;eClickFnTest (#event)"></a>
</div>
```

方式二，在事件处理函数中，可以自行操作：

```javascript
/* <div>
	<a webpanda-onclick="eClickFnTest (#event)"></a>
</div> */
this.eClickFnTest = function (e) {
    // 阻止冒泡
    e.stopPropagation ();
    // ......
};
```





## 前置 \-before

该命令中可以运行 javaScript 表达式，该命令在同一个标签中可以存在多个。

> 不要在前置命令内同时做数据的发布、订阅操作，这样会出现死循环。

最好在命令开始禁用发布：

```html
<div webpanda-before="#disablepublish;methodFnTest(#node)"></div>
```



节点最先执行的命令，并且优先级在 `webpanda-if` 之前 ，所以始终能获取节点的信息。

```html
<div webpanda-before="methodFnTest"></div>
```

在渲染过程中，该模板语法是最后才进行渲染的，所以可以在这一步进行节点取值，指定方法函数接收预编译声明，需要加上`#`符号前缀，或传入自定义参数，实现其他处理场景：

```html
<div webpanda-before="methodFnTest(123,'abc',#node);count++"></div>
```

在同一个标签中可以存在多个：

```html
<input value="" webpanda-before="methodFnTest()" webpanda-before="methodFnTest2(#node,#value)"/>
```

一般场景用得最多的，就是循环节点了：

```html
<div webpanda-for="(value, index)arr">
    <div webpanda-before="getValue(#template, value)"></div>
</div>
```

注意，配合循环节点 `webpanda-for` 的使用的时候，`webpanda-before` 会被多执行一次，这是因为`webpanda-before` 具有优先级，会在遍历命令未处理之前会执行一次。如下：

```html
<div webpanda-before="getValue(#template)" webpanda-for="(value, index)arr" ></div>
```

还有一种情况会被多次执行，那就是获取节点的时候，会绑定，节点创建后更新渲染：

```html
<div webpanda-before="getValue(#node)" webpanda-for="(value, index)arr" ></div>
```

当然还有其他情况造成多次执行，比如在命令表达式中使用其他渲染数据而触发绑定也会重复执行。



## 后置 \-after

该命令中可以运行 javaScript 表达式，该命令在同一个标签中可以存在多个。

> 不要在后置命令内同时做数据的发布、订阅操作，这样会出现死循环。

最好在命令开始禁用发布：

```html
<div webpanda-after="#disablepublish;methodFnTest(#node)"></div>
```



节点最后执行的命令是在节点添加到父级节点上之后执行，用法同 `webpanda-before` 命令。

```html
<div webpanda-after="methodFnTest(#node)"></div>
```

注意，该命令是在 `webpanda-if` 、`webpanda-is` 命令之后执行的。所以如果前面判断为假，那么该后置命令是不会被执行的。



## 元素 \-element

该命令中可以运行 javaScript 表达式，该命令在同一个标签中可以存在多个。

该命令会节点成功创建的时候执行，不会被重复执行，所以不会设置环境上下文。对渲染变量不会变动监听。

```html
<div webpanda-element="nodevar=#node"></div>
```

> 注意，如果节点已经创建了，重复渲染是不会执行的。也就是说只会在节点创建时执行。



## 模板预编译声明

预编译声明，即在参数前面加上`#`符号作为预处理前缀，不区分大小写，如下示例：

```html
<div webpanda-after="testFunction(#node,#value,#EVENT,#template)"></div> 
<div webpanda-style="{'color':getColor(#node,#this)}"></div>
```

```shell
| 参数标签         | 值类型 | 描述                                                         |
| :--------------- | :----- | :----------------------------------------------------------- |
| this             | Object | 获取当前抽象节点树                                           |
| event            | Object | 获取当前事件对象                                             |
| stopPropagation  | Void   | 停止事件冒泡                                                 |
| preventDefault   | Void   | 取消事件的默认行为                                           |
| disable          | Void   | 禁用观察者的订阅与发布：在命令中可以使用逗号运算符分隔 `-if="#disable, ..."` |
| disableSubscribe | Void   | 禁用观察者的订阅                                             |
| disablePublish   | Void   | 禁用观察者的发布                                             |
| clear            | Void   | 清理模板与打印的缓存数据                                     |
| node             | Object | 获取标签的节点对象。这个注意，节点的渲染出错等等，该参数在实际情况有可能为null |
| value            | Mixed  | 获取节点的值，一般用于input、textarea、select等表单节点      |
| template         | String | 获取节点编译时的模板数据                                     |
| html             | String | 获取节点的html内容                                           |
| text             | String | 获取节点包含的文本内容组合起来的文本                         |
| webpanda         | Object | 获取 webpanda 对象                                           |
| window           | Object | 获取 window 对象，用于在模板中使用全局变量                   |
```





# 模板技巧


## 命令前缀  “webpanda\-” 简写为 “\-”

可以将 `webpanda-` 属性前缀，简写为 `-` 。

如下：

```html
<div webpanda-html="message" />
```

简写为：

```html
<div -html="message" />
```

又如：

```html
<div webpanda-if="typeof testArray == 'object'">testArray 是一个对象</div>
```

简写为：

```html
<div -if="typeof testArray == 'object'">testArray 是一个对象</div>
```



## 命令前缀  “webpanda\-attribute-” 简写为 “\-\-”

如下：

```html
<a webpanda-attribute-href="'#'+count"></a>
<a webpanda-attribute="{href:'#'+count}"></a>
```

简写为：

```html
<a -attribute-href="'#'+count"></a>
<a webpanda--href="'#'+count"></a>
<a --href="'#'+count"></a>
```



##  字符串与变量拼接，使用 “ \`\`” 符号

```html
<!-- {{}} 会将html实体编码 -->
<i class="iconfont-icon" -class="`icon-{{ v.icon }}`"></i>
<i class="iconfont-icon" -class="`icon-${ v.icon }`"></i>
```




## 模板命令中使用js关键字

在模板中也可以使用js关键字，但只支持下面几个关键字：

```shell
new return typeof instanceof debugger false true null undefined
```

示例：

```html
<!-- 取消事件的默认行为 -->
<a --href="getUrl()" -onclick="return false"></a>

<!-- 循环临时数组 -->
<div -for="(v,k) new #window.Array(13)">
    {{k}}
</div>
```

> 注意，在模板命令中不支持 `if else function` 关键字。







## 执行顺序、优先级

```shell
# void 情况：<webpanda /> 、 -webpanda
before > if|else-if|else > template > for > is > print > void > after
# 非 void 情况
before > if|else-if|else > template > for > is > 创建节点 element > print > 添加到父节点 > children > 特殊节点渲染 [element-textarea] [element-svg] > attribute > class > style > event > after
```

## 模板预编译声明会不会与字符串的 “\#” 井号冲突呢？不会

如下写法：

```html
<h1 --test="'#node-'+title" -after="#window.console.log (#node)">{{title}}</h1>
```

上面的代码中，`'#node-'+title` 的 `#node` 会不会被解析成模板预编译声明呢？明确告诉你，不会！

因为编译器会自动识别是否在字符串内（是否在单引号或双引号内），如果是字符串则不会被解析的。而后面 `-after="#window.console.log (#node)"`  的 `#node` 则会被解析成模板预编译声明。




## 在模板中使用全局变量

使用 `#window` 预编译声明：

```html
<!-- 使用 console.log -->
<select multiple="multiple" -onchange="#window.console.log (#value)"> </select> 

<!-- 打印当前URL -->
<div>{{#window.webpanda.url().toString ()}}</div>

<!-- 循环临时数组 -->
<div -for="(v,k) new #window.Array(13)">
    {{k}}
</div>
<div -for="(v, k) [11, 22, '这是第三个元素', 44]">
    {{k}} : {{v}}
</div>
```




## 数据绑定的实现

```html
<!-- 单向绑定：渲染数据变动则输入框值也会变，但输入框值变动，渲染数据不变 -->
<input type="text" --value="inputValue1" />
<!-- 单向绑定：输入框值变动则渲染数据也会变，但渲染数据变动，输入框值不变 -->
<input type="text" -oninput-onpropertychange="inputValue2=#value;" />
<!-- 双向绑定 -->
<input type="text" --value="inputValue3" -oninput-onpropertychange="inputValue3=#value;" />

<!-- -oninput-onpropertychange 是兼容方式的写法，onpropertychange为IE专属的，IE9以下的浏览器是不支持oninput事件。如果不考虑IE，那么直接 -oninput="..." 即可-->
```



## 为什么框架不提供数据绑定命令？

绑定应该不是框架需要提供的，而是由开发者自己去实现，比如：

```html
<input webpanda-element="bindValue(#node)" />
```






## 表单取值代码示例

```html
<!-- Radio 单元示例 -->
<input type="Radio" name="RadioName" value="1" -onchange="inputvalue = (#node).checked? '选中':'未选中';radioValue = #value;" --checked="radioValue == #value"> 单选1 
<input type="Radio" name="RadioName" value="2" -onchange="inputvalue = (#node).checked? '选中':'未选中';radioValue = #value;" --checked="radioValue == #value"> 单选2
<input type="Radio" name="RadioName" value="3" -onchange="inputvalue = (#node).checked? '选中':'未选中';radioValue = #value;" --checked="radioValue == #value"> 单选3
<!-- Checkbox 多选示例 -->
<input type="Checkbox" -onchange="inputvalue = (#node).checked? '选中':'未选中';checkedState = (#node).checked;" value="多选测试" --checked="checkedState"> 多选 
```

> 表单是select，也可以使用 `#value` 预编译声明，如果多选，将返回一个数组，其包含所选的值；如果是单选，则直接返回选择的值；如果没有初始值，则返回空字符串。

```html
<select multiple="multiple" -onchange="#window.console.log (#value)"> 
    <optgroup label="喜欢">
        <option value="n">牛</option> 
        <option value="m">马</option> 
        <option value="g">狗</option> 
    </optgroup>
    <optgroup label="不喜欢">
        <option value="sz">狮子</option> 
        <option value="lh">老虎</option> 
    </optgroup>
</select> 
```

单个选项的示例，获取选中的值与文本内容：

```html
<select -onchange="#window.console.log (#value, #node.options[#node.options.selectedIndex].text);"> 
    <optgroup label="喜欢">
        <option value="n">牛</option> 
        <option value="m">马</option> 
        <option value="g">狗</option> 
    </optgroup>
    <optgroup label="不喜欢">
        <option value="sz">狮子</option> 
        <option value="lh">老虎</option> 
    </optgroup>
</select> 
```



## 模板表达式中的 this 与 \#this 区别

`this` 是表示渲染数据，如下所示，三种写法是等价的：

```html
<div -style-color="this['colorRed']"></div>
<div -style-color="this.colorRed"></div>
<div -style-color="colorRed"></div>
```

`#this` 是获取当前虚拟节点对象，如下所示：

```html
<h1 -after="#window.console.log (#this)">{{title}}</h1>
```


## \-template 和 \-html 命令比较


`webpanda-template`与`webpanda-html`最大区别：

> `webpanda-template` 会将模板中存在的模板语法递归解析出来，而 `webpanda-html` 里面存在的模板语法是不会被解析的。



## 模板渲染出现”Maximum call stack size exceeded“错误

这是因为死循环造成的。

> 检查模板命令，是否存在模板标签里面嵌套递归自身的模板标签。详见：**模板语法** 模板 `webpanda-template`  
> 检查 `webpanda-before` `webpanda-after` 相关的模板语法命令中，数据响应式的订阅和发布，是否按照要求禁止呢？  















