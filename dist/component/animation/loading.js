/**
 * webpanda.js is JavaScript framework for building project on the web.
 * Copyright (c) 1992-2023, webpandajs.com. (MIT Licensed)
 * email <a@apilipala.com> 
 * qq <1102119280>
 * https://webpandajs.com/
 * https://github.com/webpandajs/webpandajs
 */
webpanda.data({name:"component://animation/loading",selector:"body",template:{src:webpanda.env.src("component/animation/loading.html")},construct:{show:!1,text:null},prototype:function(){var n=webpanda.data["this"];this.timer=null,this.open=function(t){this.$.render(),this.timer&&this.timer.stop(),t?n._.timer=webpanda.timer(function(){n.show=!0},!0).timeout(t).start():this.show=!0},this.progress=function(t){this.text=t},this.close=function(){this.timer&&this.timer.stop(),n.text=null,n.show=!1}}});