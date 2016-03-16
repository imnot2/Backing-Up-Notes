﻿/*=======================toolbar-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 21 20:57
*/
KISSY.add("toolbar",function(h,j,k,n,g){function f(a,b,c){var c=c.get("children"),e=0,d=c.length;if(a==g&&(a=1==b?0:d-1,!c[a].get("disabled")))return c[a];do e++,a=(a+d+b)%d;while(e<d&&c[a].get("disabled"));return e!=d?c[a]:null}function l(a){a.target!=this&&(a.newVal?this.set("expandedItem",null):this.set("expandedItem",a.target))}function m(a){var b,c=a.target;if(c!=this)if(a.newVal){if(this.set("highlightedItem",c),(b=this.get("expandedItem"))&&b.hasAttr("collapsed")&&b!=c)b.set("collapsed",!0),
c.set("collapsed",!1)}else this.set("highlightedItem",null)}var d=k.KeyCodes,i=j.Container.extend({addChild:function(){var a=i.superclass.addChild.apply(this,arguments),b=a;b.set("handleMouseEvents",!1);b.set("focusable",!1);b.publish("afterCollapsedChange afterHighlightedChange",{bubbles:1});return a},createDom:function(){this.get("el").attr("role","toolbar")},_uiSetHighlightedItem:function(a){var b;a?((b=a.get("el").attr("id"))||a.get("el").attr("id",b=h.guid("ks-toolbar-item")),this.get("el").attr("aria-activedescendant",
b)):this.get("el").attr("aria-activedescendant","")},bindUI:function(){this.on("afterCollapsedChange",l,this);this.on("afterHighlightedChange",m,this)},handleBlur:function(){var a,b;(b=this.get("expandedItem"))&&b.set("collapsed",!0);(a=this.get("highlightedItem"))&&a.set("highlighted",!1)},handleKeyEventInternal:function(a){var b=this.get("highlightedItem"),c=b;this.get("orientation");var e=this.get("children"),e=b&&h.indexOf(b,e);if(b&&b.handleKeyEventInternal(a))return!0;if(a.shiftKey||a.ctrlKey||
a.metaKey||a.altKey)return!1;switch(a.keyCode){case d.ESC:return this.getKeyEventTarget().fire("blur"),!0;case d.HOME:b=f(g,1,this);break;case d.END:b=f(g,-1,this);break;case d.UP:b=f(e,-1,this);break;case d.LEFT:b=f(e,-1,this);break;case d.DOWN:b=f(e,1,this);break;case d.RIGHT:b=f(e,1,this);break;default:return!1}c&&c.set("highlighted",!1);b&&b.set("highlighted",!0);return!0}},{ATTRS:{highlightedItem:{},expandedItem:{}}},{xclass:"toolbar",priority:10});return i},{requires:["component","node"]});

