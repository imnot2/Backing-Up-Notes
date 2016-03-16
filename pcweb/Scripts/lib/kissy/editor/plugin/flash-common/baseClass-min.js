﻿/*=======================baseClass-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 27 10:38
*/
KISSY.add("editor/plugin/flash-common/baseClass",function(e,i,k,l,f,g){function a(){a.superclass.constructor.apply(this,arguments);this._init()}var j=e.Node;a.ATTRS={cls:{},type:{},label:{value:"在新窗口查看"},bubbleId:{},contextMenuId:{},contextMenuHandlers:{}};e.extend(a,e.Base,{_init:function(){var b=this,d=b.get("cls"),c=b.get("editor"),a=[],f=b.get("bubbleId"),g=b.get("contextMenuId"),h=b.get("contextMenuHandlers");e.each(h,function(b,c){a.push({content:c})});c.addContextMenu(g,"."+d,{width:"120px",
children:a,listeners:{click:function(b){b=b.target.get("content");h[b]&&h[b].call(this)}}});c.addBubble(f,function(b){return b.hasClass(d,void 0)&&b},{listeners:{afterRenderUI:function(){var d=this,a=d.get("contentEl");a.html(e.substitute(' <a class="ks-editor-bubble-url" target="_blank" href="#">{label}</a>   |    <span class="ks-editor-bubble-link ks-editor-bubble-change">编辑</span>   |    <span class="ks-editor-bubble-link ks-editor-bubble-remove">删除</span>',{label:b.get("label")}));var f=a.one(".ks-editor-bubble-url"),
g=a.one(".ks-editor-bubble-change"),h=a.one(".ks-editor-bubble-remove");i.Utils.preventFocus(a);g.on("click",function(a){b.show(d.get("editorSelectedEl"));a.halt()});h.on("click",function(b){if(e.UA.webkit){var a=c.getSelection().getRanges();if(a=a&&a[0])a.collapse(!0),a.select()}d.get("editorSelectedEl").remove();d.hide();c.notifySelectionChange();b.halt()});d.on("show",function(){var a=d.get("editorSelectedEl");a&&b._updateTip(f,a)})}}});c.docReady(function(){c.get("document").on("dblclick",b._dbClick,
b)})},_getFlashUrl:function(b){return g.getUrl(b)},_updateTip:function(b,a){var c=this.get("editor").restoreRealElement(a);c&&(c=this._getFlashUrl(c),b.attr("href",c))},_dbClick:function(b){var a=new j(b.target);"img"===a.nodeName()&&a.hasClass(this.get("cls"),void 0)&&(this.show(a),b.halt())},show:function(a){var d=this.get("editor");f.useDialog(d,this.get("type"),this.get("pluginConfig"),a)}});return a},{requires:["editor","../contextmenu/","../bubble/","../dialog-loader/","./utils"]});

