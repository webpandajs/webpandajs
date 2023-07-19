/**
 * webpanda.js is JavaScript framework for building project on the web.
 * Copyright (c) 1992-2023, webpandajs.com. (MIT Licensed)
 * email <a@apilipala.com> 
 * qq <1102119280>
 * https://docs.webpandajs.com
 * https://github.com/webpandajs/webpandajs
 */
webpanda.data({name:"page://home",selector:"body",template:{src:webpanda.src("page/home.html")},mount:[webpanda.require("component://docs",{use:"Docs"}),webpanda.require("component://readme",{use:"Readme"}),webpanda.require("component://page/footer",{use:"Footer",tag:!0})],include:[webpanda.src("assets/css/theme.css"),webpanda.src("assets/css/demo.css"),webpanda.library("prism/prism.css"),webpanda.library("prism/prism.js"),webpanda.src("assets/css/index.css")],onexecute:function(e){console.log(this.$.name,"onexecute"),this.Docs.load()},construct:function(){this.sidebarToggled=!1,this.navigation=null},prototype:function(){this.plugin=function(e){for(var a=e.querySelectorAll("pre>code"),t=0;t<a.length;t++)a[t].highlightStatus=!0,Prism.highlightElement(a[t]);for(var n=e.querySelectorAll("a"),t=0;t<n.length;t++)n[t].getAttribute("target")||n[t].setAttribute("target","_blank")},this.createNavigation=function(e){var a=new Array,t=e.querySelectorAll("h1,h2,h3,h4,h5,h6");if(t&&t.length)for(var n=0;n<t.length;n++){var r=t[n],s={id:r.nodeName+"-"+n,anchor:webpanda.URLEncode(r.nodeName+"-"+n+"-"+r.innerHTML),title:r.innerHTML,serial:r.nodeName,level:parseInt(r.nodeName.toLowerCase().replace("h","")),node:r};r.setAttribute("id",s.anchor),a.push(s)}this.navigation=webpanda.observer.disable(a)}}});