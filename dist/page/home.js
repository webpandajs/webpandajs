/**
 * webpanda.js is JavaScript framework for building project on the web.
 * Copyright (c) 1992-2023, webpandajs.com. (MIT Licensed)
 * email <a@apilipala.com> 
 * qq <1102119280>
 * https://webpandajs.com/
 * https://github.com/webpandajs/webpandajs
 */
webpanda.data({name:"page://home",selector:"body",template:{src:webpanda.env.src("page/home.html")},mount:[webpanda.env.require("component://docs",{use:"Docs"}),webpanda.env.require("component://readme",{use:"Readme"}),webpanda.env.require("component://page/footer",{use:"Footer",tag:!0})],include:[webpanda.env.src("assets/css/theme.css"),webpanda.env.src("assets/css/demo.css"),webpanda.env.library("prism/prism.css"),webpanda.env.library("prism/prism.js"),webpanda.env.src("assets/css/index.css")],onexecute:function(e){console.log(this.$.name,"onexecute"),this.Docs.load()},construct:function(){this.sidebarToggled=!1,this.navigation=null},prototype:function(){this.plugin=function(e){for(var n=e.querySelectorAll("pre>code"),a=0;a<n.length;a++)n[a].highlightStatus=!0,Prism.highlightElement(n[a]);for(var t=e.querySelectorAll("a"),a=0;a<t.length;a++)t[a].getAttribute("target")||t[a].setAttribute("target","_blank")},this.createNavigation=function(e){var n=new Array,a=e.querySelectorAll("h1,h2,h3,h4,h5,h6");if(a&&a.length)for(var t=0;t<a.length;t++){var r=a[t],s={id:r.nodeName+"-"+t,anchor:webpanda.URLEncode(r.nodeName+"-"+t+"-"+r.innerHTML),title:r.innerHTML,serial:r.nodeName,level:parseInt(r.nodeName.toLowerCase().replace("h","")),node:r};r.setAttribute("id",s.anchor),n.push(s)}this.navigation=webpanda.observer.disable(n)}}});