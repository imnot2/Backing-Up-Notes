﻿/*=======================index-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 27 10:38
*/
KISSY.add("editor/plugin/xiami-music/index",function(c,k,l,j,m){function i(){i.superclass.constructor.apply(this,arguments)}function h(b){this.config=b||{}}c.extend(i,l,{_updateTip:function(b,g){var e=this.get("editor").restoreRealElement(g);e&&(b.html(g.attr("title")),b.attr("href",this._getFlashUrl(e)))}});c.augment(h,{renderUI:function(b){function g(a){return/xiami\.com/i.test(a)}m.init(b);var e=b.htmlDataProcessor,c=e&&e.dataFilter;c&&c.addRules({tags:{object:function(a){var b=a.getAttribute("title"),
d,f;d=a.getAttribute("classid");var c=a.childNodes;if(!d){for(d=0;d<c.length;d++)if(f=c[d],"embed"==f.nodeName){if(!j.isFlashEmbed(f))break;if(g(f.attributes.src))return e.createFakeParserElement(a,"ke_xiami","xiami-music",!0,{title:b})}return null}for(d=0;d<c.length;d++)if(f=c[d],"param"==f.nodeName&&"movie"==f.getAttribute("name")&&g(f.getAttribute("value")))return e.createFakeParserElement(a,"ke_xiami","xiami-music",!0,{title:b})},embed:function(a){if(j.isFlashEmbed(a)&&g(a.getAttribute("src")))return e.createFakeParserElement(a,
"ke_xiami","xiami-music",!0,{title:a.getAttribute("title")})}}},4);var h=new i({editor:b,cls:"ke_xiami",type:"xiami-music",bubbleId:"xiami",pluginConfig:this.config,contextMenuId:"xiami",contextMenuHandlers:{"虾米属性":function(){var a=this.get("editorSelectedEl");a&&h.show(a)}}});b.addButton("xiamiMusic",{tooltip:"插入虾米音乐",listeners:{click:function(){h.show()}},mode:k.WYSIWYG_MODE})}});return h},{requires:["editor","../flash-common/baseClass","../flash-common/utils","../fake-objects/"]});

