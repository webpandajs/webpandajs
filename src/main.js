console.log("%cwebpanda.js v" + webpanda.version, "text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:3.5em");

// 环境变量
webpanda.env = { };


/**
 * 获取加载数据工程的规范配置
 * @param {String} name 工程数据名称
 * @param {String} options 选项
 * @return {Object} 
 */
webpanda.mount.require = function (name, options) {
    if (!options || typeof options !== 'object') {
        options = new Object ();
    }
    options.src = webpanda.src (name.replace (/\:\/\//, '/') + '.js');
    options.name = name;
    return options;
};


/**
 * 规范的加载数据工程
 * @param {String} name 工程数据名称
 * @param {String} options 选项
 */
webpanda.mount.ready = function (name, options) {
    
    /**
     * 获取加载数据工程数据的规范配置
     * 如果工程存在, 直接去准备执行
     * 如果工程不存在则包含数据工程，当工程准备完毕后执行
     */
    var requires = webpanda.require (name);
    var data = webpanda.data.get (requires.name);
    if (data) {
        data.$.ready (options);
    } else {
        webpanda.include (requires.src);
        webpanda.data.ready (requires.name, options);
    }
};


/**
 * 源地址
 * @param {String} src 
 * @return {String} 
 */
webpanda.mount.src = function (src) {
    var builder = webpanda.mount.__builder || null;
    return (builder && builder.src ? builder.src + src : '/src/' + src);
};


/**
 * 库地址
 * @param {String} library 
 * @return {String} 
 */
webpanda.mount.library = function (library) {
    return '/library/' + library;
};


/**
 * 跳转地址
 * @param {String|HTMLElement} url 链接
 * @param {Boolean} isReplace 是否不保留会话信息，为真表示不会在history中留下记录 
 */
webpanda.mount.targetUrl = function (url, isReplace) {
    if (url instanceof HTMLElement) {
        url = url.getAttribute ('href');
    }

    if (typeof url !== 'string' || url === '') {
        return;
    }
    
    do {
        
        /**
         * baiduboxapp 是百度app，真是百毒啊，
         * 对window.history.pushState兼容上似乎存在问题，忘记版本了
         */
        var userAgent = window.navigator.userAgent.toLowerCase ();
        if (userAgent.indexOf ('baiduboxapp') !== -1) {
            break;
        }

        // 兼容性判断
        if (!window.history || typeof window.history.pushState !== 'function') {
            break;
        }

        if (isReplace) {
            window.history.replaceState (null, '', url);
        } else {
            window.history.pushState (null, '', url);
        }

        return;
    } while (false);

    if (isReplace) {
        window.location.replace (url);
    } else {
        window.location.assign (url);
    }

};


/**
 * DOM 加载完毕执行方法
 * @param {Function} callback 回调函数
 */
webpanda.mount.onhtmlready = function (callback) {
    var readyState = document.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
        callback ()
    } else {
        window.addEventListener ("DOMContentLoaded", callback);
    }
};


// 基础配置
webpanda.config ({

    /**
     * 引入包含配置
     * @param {function({resolve:Function,reject:Function})} e ({resolve(结果) 成功执行, reject(错误信息) 失败时执行}) 
     */
    include: function (e) {

        /**
         * 可以根据 this.map 储存已加载的资源到浏览器缓存
         * 主要是储存text类型的内容，存在浏览器缓存就直接返回缓存的数据即可
         * ------------------------------------------
         * 资源的加载由开发者可自行封装或者使用其他第三方库
         */

        // 生成环境下添加版本号
        var builder = webpanda.mount.__builder || null;
        if (builder && builder.version) {
            this.url.query.v = builder.version;
        } else {
            // 调试模式加上时间戳禁止页面缓存
            // this.url.query.debug = Date.parse(new Date());

            var dates = new Date ();
            var times = [
                dates.getFullYear (),// 年
                dates.getMonth ()+1,// 月
                dates.getDate (),// 日
                // dates.getHours (),// 时
                // dates.getMinutes (),// 分
                // dates.getSeconds (), //秒
                // dates.getMilliseconds () //毫秒
            ];
            
            // 缓存一天
            this.url.query.d = times.join ('');
        }

        if (['js', 'css', 'less', 'scss', 'sass'].indexOf (this.type) >= 0) {
            var handle = new webpanda.mount.Require ({
                url: this.url,
                type: this.type,
                selector: 'head',
                onsuccess: function (ret) {
                    e.resolve ();
                },
                onerror: function (ret) {
                    this.unload ();
                    e.reject ('[' + ret.code + '] ' + ret.message);
                },
            });
            handle.append ();
        } else {
            
            var handle = new webpanda.mount.Ajax ({
                url: this.url,
                method: 'GET',
                async: true,// 始终异步
                responseType: (this.type === 'json' ? 'json' : 'text'),
                onsuccess: function (ret) {
                    e.resolve (ret.data);
                },
                onerror: function (ret) {
                    e.reject ('[' + ret.type + '] ' + ret.status + ' ' + ret.message + ' [file]:' + this.url.toString ());
                },
            });
            handle.send ();
        }

    },
    // 路由设置
    router: {
        // 模式: hash | history
        mode: 'history',
    },
    // 浏览记录配置
    history: {
        pageMaximum: 200,
        stepMaximum: 200,
    },
});


/**
 * DOM 准备完毕时执行
 * 删除多余的提示标签
 */
webpanda.onhtmlready (function () {
    document.querySelector ('body>noscript').remove ();
});

// 运行框架
webpanda.run ();
// 路由数据工程准备好后执行框架
webpanda.mount.Router.$.ready (function () {
    this.$.event ({ '--global': true });// 将路由事件设为全局模式
    webpanda.page ();
});


// 动态加载进度组件的数据工程
webpanda.ready ('component://animation/progress', {
    onresolve: function (e) {
        this.$.render ({ '--global': true });
        this.$.event ({ '--global': {
            onpageprogress: true,
            // onpagechange: true,
        } });
    },
    onreject: function (e) {
        // 超时回调函数
        confirm ("加载进度组件加载超时，检查网络是否正常或者联系网站管理员!");
    },
    global: true,// 设为全局有效，默认false非全局(页面刷新会被取消)
    timeout: 5000,// 5秒后超时
});





