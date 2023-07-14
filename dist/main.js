/**
 * webpanda.js is JavaScript framework for building project on the web.
 * Copyright (c) 1992-2023, webpandajs.com. (MIT Licensed)
 * email <a@apilipala.com> 
 * qq <1102119280>
 * https://webpandajs.com/
 * https://github.com/webpandajs/webpandajs
 */
webpanda.mount.__builder={version:"2023714145434374",src:"/"};console.log("%cwebpanda.js v"+webpanda.version,"text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:3.5em"),webpanda.env={},webpanda.mount.require=function(e,n){return(n=n&&"object"==typeof n?n:new Object).src=webpanda.src(e.replace(/\:\/\//,"/")+".js"),n.name=e,n},webpanda.mount.ready=function(e,n){var a=webpanda.require(e),t=webpanda.data.get(a.name);t?t.$.ready(n):(webpanda.include(a.src),webpanda.data.ready(a.name,n))},webpanda.mount.src=function(e){var n=webpanda.mount.__builder||null;return n&&n.src?n.src+e:"/src/"+e},webpanda.mount.library=function(e){return"/library/"+e},webpanda.mount.targetUrl=function(e,n){if("string"==typeof(e=e instanceof HTMLElement?e.getAttribute("href"):e)&&""!==e){do{if(-1!==window.navigator.userAgent.toLowerCase().indexOf("baiduboxapp"))break;if(window.history&&"function"==typeof window.history.pushState)return void(n?window.history.replaceState(null,"",e):window.history.pushState(null,"",e));break}while(0);n?window.location.replace(e):window.location.assign(e)}},webpanda.mount.onhtmlready=function(e){var n=document.readyState;"interactive"===n||"complete"===n?e():window.addEventListener("DOMContentLoaded",e)},webpanda.config({include:function(n){var e=webpanda.mount.__builder||null;e&&e.version&&(this.url.query.v=e.version),0<=["js","css","less","scss","sass"].indexOf(this.type)?new webpanda.mount.Require({url:this.url,type:this.type,selector:"head",onsuccess:function(e){n.resolve()},onerror:function(e){this.unload(),n.reject("["+e.code+"] "+e.message)}}).append():new webpanda.mount.Ajax({url:this.url,method:"GET","async":!0,responseType:"json"===this.type?"json":"text",onsuccess:function(e){n.resolve(e.data)},onerror:function(e){n.reject("["+e.type+"] "+e.status+" "+e.message+" [file]:"+this.url.toString())}}).send()},router:{mode:"history"},history:{pageMaximum:200,stepMaximum:200}}),webpanda.onhtmlready(function(){document.querySelector("body>noscript").remove()}),webpanda.run(),webpanda.mount.Router.$.ready(function(){this.$.event({"--global":!0}),webpanda.page()}),webpanda.ready("component://animation/progress",{onresolve:function(e){this.$.render({"--global":!0}),this.$.event({"--global":{onpageprogress:!0}})},onreject:function(e){confirm("加载进度组件加载超时，检查网络是否正常或者联系网站管理员!")},global:!0,timeout:5e3});