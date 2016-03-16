﻿/*=======================index-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 27 10:38
*/
KISSY.add("editor/plugin/image/index",function(d,h,p,q,r,m){function e(b){this.config=b||{}}var j=d.UA,n=d.Node,i=d.all,o=d.Event,f=function(b){b=i(b);if("img"===b.nodeName()&&!/(^|\s+)ke_/.test(b[0].className))return b};d.augment(e,{renderUI:function(b){function g(a){m.useDialog(b,"image",e.config,a)}var e=this;b.addButton("image",{tooltip:"插入图片",listeners:{click:function(){g(null)}},mode:h.WYSIWYG_MODE});var k=[{content:"图片属性",fn:function(){var a=f(this.get("editorSelectedEl"));a&&(this.hide(),
g(i(a)))}},{content:"插入新行",fn:function(){this.hide();var a=b.get("document")[0],c=new n(a.createElement("p"));j.ie||c._4e_appendBogus(void 0);a=new h.Range(a);a.setStartAfter(this.get("editorSelectedEl"));a.select();b.insertElement(c);a.moveToElementEditablePosition(c,1);a.select()}}],l=[];d.each(k,function(a){l.push({content:a.content})});b.addContextMenu("image",f,{width:120,children:l,listeners:{click:function(a){var b=this,e=a.target.get("content");d.each(k,function(a){a.content==e&&a.fn.call(b)})}}});
b.docReady(function(){o.on(b.get("document")[0],"dblclick",function(a){a.halt();a=i(a.target);f(a)&&g(a)})});b.addBubble("image",f,{listeners:{afterRenderUI:function(){var a=this,c=a.get("contentEl");c.html('<a class="ks-editor-bubble-url" target="_blank" href="#">在新窗口查看</a>  |  <a class="ks-editor-bubble-link ks-editor-bubble-change" href="#">编辑</a>  |  <a class="ks-editor-bubble-link ks-editor-bubble-remove" href="#">删除</a>');var d=c.one(".ks-editor-bubble-url"),e=c.one(".ks-editor-bubble-change"),
f=c.one(".ks-editor-bubble-remove");h.Utils.preventFocus(c);e.on("click",function(b){g(a.get("editorSelectedEl"));b.halt()});f.on("click",function(d){if(j.webkit){var c=b.getSelection().getRanges();c&&c[0]&&(c[0].collapse(),c[0].select())}a.get("editorSelectedEl").remove();a.hide();b.notifySelectionChange();d.halt()});a.on("show",function(){var b=a.get("editorSelectedEl");b&&(b=b.attr("_ke_saved_src")||b.attr("src"),d.attr("href",b))})}}})}});return e},{requires:["editor","../button/","../bubble/",
"../contextmenu/","../dialog-loader/"]});

