﻿/*=======================index-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 27 10:38
*/
KISSY.add("editor/plugin/fake-objects/index",function(e,j){var h=e.Node,m=e.DOM,n=j.Utils.debugUrl("theme/spacer.gif"),l=e.require("htmlparser");e.augment(j,{createFakeElement:function(a,b,c,d,o,k){var f=a.attr("style")||"";a.attr("width")&&(f="width:"+a.attr("width")+"px;"+f);a.attr("height")&&(f="height:"+a.attr("height")+"px;"+f);var g=e.trim(a.attr("class")),a={"class":b+" "+g,src:n,_ke_realelement:encodeURIComponent(o||a._4e_outerHtml(void 0)),_ke_real_node_type:a[0].nodeType,style:f};k&&(delete k.width,
delete k.height,e.mix(a,k,!1));c&&(a._ke_real_element_type=c);d&&(a._ke_resizable=d);return new h("<img/>",a,this.get("document")[0])},restoreRealElement:function(a){if(a.attr("_ke_real_node_type")!=m.NodeType.ELEMENT_NODE)return null;var a=decodeURIComponent(a.attr("_ke_realelement")),b=new h("<div>",null,this.get("document")[0]);b.html(a);return b.first().remove()}});var p={tags:{$:function(a){var b=a.getAttribute("_ke_realelement"),c;b&&(c=(new l.Parser(decodeURIComponent(b))).parse());if(b=c&&
c.childNodes[0]){if(c=a.getAttribute("style")){var d=/(?:^|\s)width\s*:\s*(\d+)/i.exec(c),a=d&&d[1];c=(d=/(?:^|\s)height\s*:\s*(\d+)/i.exec(c))&&d[1];a&&b.setAttribute("width",a);c&&b.setAttribute("height",c)}return b}}}};return{init:function(a){var b=a.htmlDataProcessor,c=b&&b.htmlFilter;b.createFakeParserElement||(c&&c.addRules(p),e.mix(b,{restoreRealElement:function(d){if(d.attr("_ke_real_node_type")!=m.NodeType.ELEMENT_NODE)return null;var d=decodeURIComponent(d.attr("_ke_realelement")),b=new h("<div>",
null,a.get("document")[0]);b.html(d);return b.first().remove()},createFakeParserElement:function(a,b,c,f,g){var h=l.serialize(a),i=a.getAttribute("style")||"";a.getAttribute("width")&&(i="width:"+a.getAttribute("width")+"px;"+i);a.getAttribute("height")&&(i="height:"+a.getAttribute("height")+"px;"+i);var j=e.trim(a.getAttribute("class")),a={"class":b+" "+j,src:n,_ke_realelement:encodeURIComponent(h),_ke_real_node_type:a.nodeType+"",style:i,align:a.getAttribute("align")||""};g&&(delete g.width,delete g.height,
e.mix(a,g,!1));c&&(a._ke_real_element_type=c);f&&(a._ke_resizable="_ke_resizable");return new l.Tag("img",a)}}))}}},{requires:["editor"]});

