/**
 * webpanda.js is JavaScript framework for building project on the web.
 * Copyright (c) 1992-2023, webpandajs.com. (MIT Licensed)
 * email <a@apilipala.com> 
 * qq <1102119280>
 * https://docs.webpandajs.com
 * https://github.com/webpandajs/webpandajs
 */
webpanda.mount.Router=webpanda.data({name:"router",onpage:function(a){a.page({name:"page://home",src:webpanda.src("page/home.js")})},onpagenotfound:function(a){console.log("onpagenotfound",a),webpanda.targetUrl("/404?url="+webpanda.URLEncode(a.url.toString()),!0)}}),webpanda.Router.$.ready();