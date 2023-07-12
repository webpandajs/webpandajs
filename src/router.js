/**
 * 定义路由数据工程
 * 将数据工程挂载到框架上
 */
webpanda.mount.Router = webpanda.data ({

    /**
     * 动态路径页面设置  
     * 在使用 onpage 的时候，一定要将 onpage 设为全局有效  
     * this.$.event ({'--global': { onpage: true }})
     * @param {*} e 
     */
    onpage: function (e) {



    },
    
    // onpageurlchange: function (e) {
    //     // console.log (e.url);// webpanda.url 对象
    //     // console.log (e.name);// 事件名称
    //     // console.log (e.runtime);// 当前页面执行时间
    //     console.log (e);// 事件参数
    //     if (confirm ("你确定要跳转页面么? ")) {
    //         e.accept ();// 跳转 
    //     } else {
    //         e.ignore ();// 禁止跳转 
    //     }
    // },

    // 页面不存在时触发
    onpagenotfound: function (e) {
        console.log ('onpagenotfound', e);
        // 跳转到404
        webpanda.env.targetUrl ('/404?url=' + webpanda.URLEncode (e.url.toString ()), true);
    },


});

// 去准备 
webpanda.mount.Router.$.ready ();
