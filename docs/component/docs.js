/**
 * webpanda.js is JavaScript framework for building project on the web.
 * Copyright (c) 1992-2023, webpandajs.com. (MIT Licensed)
 * email <a@apilipala.com> 
 * qq <1102119280>
 * https://docs.webpandajs.com
 * https://github.com/webpandajs/webpandajs
 */
webpanda.data({name:"component://docs",mount:[webpanda.require("server://default/getDocs",{use:"Request"})],include:[webpanda.library("marked/marked.min.js")],construct:function(){this.loading=!0,this.data=null,this.error=null},prototype:function(){this.load=function(){var e=webpanda.__builder||null;e=e&&e.version?{v:e.version}:null,this.loading=!0,this.error=null,this.data=null,this.Request.ajax({query:e,isLoading:!1,onsuccess:this.requestsuccess,onerror:this.requesterror})},this.requestsuccess=function(e){this.data=marked(e.data),this.loading=!1},this.requesterror=function(e){console.log("requesterror",e),this.error=e,this.loading=!1}}});