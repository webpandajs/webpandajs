/**
 * webpanda.js is JavaScript framework for building project on the web.
 * Copyright (c) 1992-2023, webpandajs.com. (MIT Licensed)
 * email <a@apilipala.com> 
 * qq <1102119280>
 * https://webpandajs.com/
 * https://github.com/webpandajs/webpandajs
 */
webpanda.data({name:"component://animation/progress",selector:"body",template:{src:webpanda.src("component/animation/progress.html")},onpageprogress:function(t){var s;this.percent=t.percent,100==this.percent?(this.firstShow=!1,s=this,webpanda.timer(function(){s.show=!1}).timeout(150).start()):this.show=!0},construct:function(){this.loaded=0,this.total=0,this.percent=0,this.show=!1,this.background="#2d8cf0",this.percentColor="#2d8cf0",this.firstShow=!0}});