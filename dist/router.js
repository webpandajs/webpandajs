/**
 * webpanda.js is JavaScript framework for building project on the web.
 * Copyright (c) 1992-2023, webpandajs.com. (MIT Licensed)
 * email <a@apilipala.com> 
 * qq <1102119280>
 * https://webpandajs.com/
 * https://github.com/webpandajs/webpandajs
 */
webpanda.mount.Router=webpanda.data({onpage:function(n){},onpagenotfound:function(n){console.log("onpagenotfound",n),webpanda.env.targetUrl("/404?url="+webpanda.URLEncode(n.url.toString()),!0)}}),webpanda.mount.Router.$.ready();