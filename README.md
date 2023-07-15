# webpanda.js 👋

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
// 详见数据工程定义
var data = webpanda.data({
    // ...
});

// 判断变量的对象类型是否为 webpanda.data 创建的实例对象。如果是返回 true，否则返回 false 。
console.log (webpanda.data.isInstanceOf (data));

// 获取所有数据工程
console.log (webpanda.data.getAll ());
// 根据工程名称获取工程对象
console.log (webpanda.data.get ('test'));
// 根据工程索引获取工程对象
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



# 概念


## 局部数据工程

局部渲染、局部事件使用

## 全局数据工程

全局渲染、全局事件使用


## 单例模式

因为是单例模式，所以数据工程多次渲染再同一个页面上需要进行拷贝。

## 全局数据流






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




## prototype

数据工程的原型。



## onpage


## onpagenotfound


## onpageprogress


## onpaged

## onpageurlchange


## onpagedestroy


## onurlchange


## onready


## onexecute




# 数据工程对象


```javascript
$.template('vvvv', {index: 1}).render();
```

## 页面数据工程




执行的优先级：
先执行页面数据工程事件，再执行局部数据工程事件，最后执行全局数据工程事件
this.$.event ();

在非原生事件中，只对下面的非原生事件有控制效果：
```shell
onpage|onpagenotfound|onpageprogress|onpaged|onpageurlchange|onpagedestroy|onurlchange
```




# 模板语法




