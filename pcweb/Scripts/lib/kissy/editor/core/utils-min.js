﻿/*=======================utils-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 27 10:38
*/
KISSY.add("editor/core/utils",function(d){var g=d.Node,h=d.DOM,f=d.UA,i={debugUrl:function(a){var b=d.Config;b.debug||(a=a.replace(/\.(js|css)/i,"-min.$1"));-1==a.indexOf("?t")&&(a=-1!=a.indexOf("?")?a+"&":a+"?",a+="t="+encodeURIComponent(b.tag));return b.base+"editor/"+a},lazyRun:function(a,b,c){var e=a[b],d=a[c];a[b]=function(){e.apply(this,arguments);a[b]=a[c];return d.apply(this,arguments)}},getXY:function(a,b){var c=a.left,e=a.top,d=b.get("window")[0],c=c-h.scrollLeft(d),e=e-h.scrollTop(d),d=
b.get("iframe").offset(),c=c+d.left,e=e+d.top;return{left:c,top:e}},tryThese:function(a){for(var b,c=0,d=arguments.length;c<d;c++){var f=arguments[c];try{b=f();break}catch(g){}}return b},arrayCompare:function(a,b){if(!a&&!b)return!0;if(!a||!b||a.length!=b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!==b[c])return!1;return!0},clearAllMarkers:function(a){for(var b in a)a.hasOwnProperty(b)&&a[b]._4e_clearMarkers(a,!0,void 0)},ltrim:function(a){return a.replace(/^\s+/,"")},rtrim:function(a){return a.replace(/\s+$/,
"")},isNumber:function(a){return/^\d+(.\d+)?$/.test(d.trim(a))},verifyInputs:function(a){for(var b=0;b<a.length;b++){var c=new g(a[b]),e=d.trim(i.valInput(c)),f=c.attr("data-verify"),c=c.attr("data-warning");if(f&&!RegExp(f).test(e))return alert(c),!1}return!0},sourceDisable:function(a,b){a.on("sourceMode",b.disable,b);a.on("wysiwygMode",b.enable,b)},resetInput:function(a){var b=a.attr("placeholder");b&&f.ie?(a.addClass("ks-editor-input-tip"),a.val(b)):f.ie||a.val("")},valInput:function(a,b){if(void 0===
b)return a.hasClass("ks-editor-input-tip")?"":a.val();a.removeClass("ks-editor-input-tip");a.val(b)},placeholder:function(a,b){a.attr("placeholder",b);f.ie&&(a.on("blur",function(){d.trim(a.val())||(a.addClass("ks-editor-input-tip"),a.val(b))}),a.on("focus",function(){a.removeClass("ks-editor-input-tip");d.trim(a.val())==b&&a.val("")}))},htmlEncode:function(a){return!a?a:(""+a).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")},normParams:function(a){var a=d.clone(a),
b;for(b in a)if(a.hasOwnProperty(b)){var c=a[b];d.isFunction(c)&&(a[b]=c())}return a},map:function(a,b){for(var c=0;c<a.length;c++)a[c]=b(a[c]);return a},ieEngine:document.documentMode||f.ie,preventFocus:function(a){f.ie?a.unselectable(void 0):a.attr("onmousedown","return false;")},injectDom:function(a){d.mix(h,a);for(var b in a)a.hasOwnProperty(b)&&function(b){g.prototype[b]=function(){var e=[].slice.call(arguments,0);e.unshift(this[0]);return(e=a[b].apply(null,e))&&(e.nodeType||d.isWindow(e))?new g(e):
d.isArray(e)&&(e.__IS_NODELIST||e[0]&&e[0].nodeType)?new g(e):e}}(b)},addRes:function(){var a=this.__res=this.__res||[];a.push.apply(a,d.makeArray(arguments))},destroyRes:function(){for(var a=this.__res||[],b=0;b<a.length;b++){var c=a[b];d.isFunction(c)?c():c.destroy?c.destroy():c.remove&&c.remove()}this.__res=[]},getQueryCmd:function(a){return"query"+("-"+a).replace(/-(\w)/g,function(a,c){return c.toUpperCase()})+"Value"}};return d.Editor.Utils=i},{requires:["./base"]});

