﻿/*=======================index-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 27 10:38
*/
KISSY.add("editor/plugin/flash-bridge/index",function(c,n,o){function e(a){this._init(a)}function l(a){var b=c.isString(a)?a.match(/(\d)+/g):a;c.isArray(b)&&(a=parseFloat(b[0]+"."+m(b[1],3)+m(b[2],5)));return a||0}function m(a,b){for(var d=(a+"").length;d++<b;)a="0"+a;return a}var g={};c.augment(e,c.EventTarget,{_init:function(a){var b=c.guid("flashbridge-");a.flashVars=a.flashVars||{};a.attrs=a.attrs||{};a.params=a.params||{};var d=a.flashVars,f=a.params;c.mix(a.attrs,{id:b,width:"100%",height:"100%"},
!1);c.mix(f,{allowScriptAccess:"always",allowNetworking:"all",scale:"noScale"},!1);c.mix(d,{shareData:!1,useCompression:!1},!1);f={YUISwfId:b,YUIBridgeCallback:"KISSY.Editor.FlashBridge.EventHandler"};a.ajbridge&&(f={swfID:b,jsEntry:"KISSY.Editor.FlashBridge.EventHandler"});c.mix(d,f);g[b]=this;this.id=b;this.swf=o.createSWFRuntime(a.movie,a);this._expose(a.methods)},_expose:function(a){for(var b=this,d=0;d<a.length;d++)(function(a){b[a]=function(){return b._callSWF(a,c.makeArray(arguments))}})(a[d])},
_callSWF:function(a,b){b=b||[];try{if(this.swf[a])return this.swf[a].apply(this.swf,b)}catch(d){var c="";0!==b.length&&(c="'"+b.join("', '")+"'");return(new Function("self","return self.swf."+a+"("+c+");"))(this)}},_eventHandler:function(a){var b=a.type;"log"!==b&&b&&this.fire(b,a)},ready:function(a){if(this._ready)a.call(this);else this.on("contentReady",a)},destroy:function(){delete g[this.id]}});e.EventHandler=function(a,b){var c=g[a];c&&setTimeout(function(){c._eventHandler.call(c,b)},100)};n.FlashBridge=
e;var h=c.UA,i,j,k=!0;h.fpv=function(a){if(a||k){k=!1;var b;if(navigator.plugins&&navigator.mimeTypes.length)b=(navigator.plugins["Shockwave Flash"]||{}).description;else if(window.ActiveXObject)try{b=(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}catch(c){}i=!b?void 0:b.match(/(\d)+/g);j=l(i)}return i};h.fpvGEQ=function(a,b){k&&h.fpv(b);return!!j&&j>=l(a)};return e},{requires:["editor","../flash-common/utils"]});

