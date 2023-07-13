/**
 * webpanda.js is JavaScript framework for building project on the web.
 * Copyright (c) 1992-2023, webpandajs.com. (MIT Licensed)
 * email <a@apilipala.com> 
 * qq <1102119280>
 * https://webpandajs.com/
 * https://github.com/webpandajs/webpandajs
 */
webpanda.data({"abstract":!0,name:"server://base",mount:[webpanda.require("component://animation/loading",{use:"Loading"})],prototype:function(){var n=webpanda.data["this"];this.url="",this.method="GET",this["async"]=!0,this.responseType="json",this.body={},this.header={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},this.timeout=3e4,this.withCredentials=!0,this.ajax=function(a){(a=a&&"object"==typeof a?a:new Object).isLoading&&n.Loading.open();var o={};for(e in n.body)o[e]=n.body[e];if(a.body&&"object"==typeof a.body)for(var e in a.body)o[e]=a.body[e];return a.isFormData&&(o=n.toFormData(o)),new webpanda.mount.Ajax({url:n.url,body:o,header:n.header,method:n.method,"async":n["async"],responseType:n.responseType,timeout:n.timeout,onrequest:function(o){n.withCredentials&&(o.withCredentials=!0),"function"==typeof a.onprogress&&o.upload&&(o.upload.onprogress=function(o){var e,n,t;o.lengthComputable&&(e=o.loaded,n=o.total,t=Math.floor(100*e/n),a.onprogress(t,e,n))}),"function"==typeof a.onrequest&&a.onrequest.call(this,o)},onresponse:function(o){a.isLoading&&n.Loading.close(),"function"==typeof a.onresponse&&a.onresponse.call(this,o)},onerror:function(o){o.onerror=!0,"function"==typeof a.onerror&&a.onerror.call(this,o),"function"==typeof a.onfinally&&a.onfinally.call(this,o)},onsuccess:function(o){o.onsuccess=!0,"function"==typeof a.onsuccess&&a.onsuccess.call(this,o),"function"==typeof a.onfinally&&a.onfinally.call(this,o)}}).send()},this.toKeyValue=function(o){var e=new Array;if("object"==typeof o)for(var n in o)if(o.hasOwnProperty(n)&&o[n]!==o){var t,a=this.getChildFormData(o[n]);for(t in a)e.push({key:n+a[t].key,value:a[t].value})}return e},this.getChildFormData=function(o){var e=new Array;if(o&&"object"==typeof o){for(var n in o)if(o.hasOwnProperty(n)&&o[n]!==o){var t,a=this.getChildFormData(o[n]);for(t in a)e.push({key:"["+n+"]"+a[t].key,value:a[t].value})}}else e.push({key:"",value:o});return e},this.toFormData=function(o){var e=new FormData,n=this.toKeyValue(o);if(n&&n.length)for(var t=0;t<n.length;t++)e.append(n[t].key,n[t].value);return e}}});