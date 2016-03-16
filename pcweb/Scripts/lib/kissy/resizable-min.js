﻿/*=======================resizable-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 21 20:57
*/
KISSY.add("resizable",function(r,g,s,k,t){function n(a){var a=a.newVal,e=this.dds,f=this.get("node");this.destroy();for(b=0;b<a.length;b++){var c=a[b],d=o("<div class='"+p+" "+p+"-"+c+"'></div>").prependTo(f,t),c=e[c]=new u({node:d,cursor:null});c.on("drag",v,this);c.on("dragstart",w,this)}}function w(){var a=this.get("node");this._width=a.width();this._top=parseInt(a.css("top"));this._left=parseInt(a.css("left"));this._height=a.height()}function v(a){var e=this.get("node"),f=a.target,c;a:{c=this.dds;
for(var d in c)if(c[d]==f){c=d;break a}c=0}d=this._width;var x=this._height,h=this.get("minWidth"),i=this.get("maxWidth"),l=this.get("minHeight"),g=this.get("maxHeight"),a=j[c](h,i,l,g,this._top,this._left,d,x,a.top-f.startNodePos.top,a.left-f.startNodePos.left),f=["width","height","top","left"];for(b=0;b<f.length;b++)a[b]&&e.css(f[b],a[b])}function m(a){var e;m.superclass.constructor.apply(this,arguments);this.on("afterHandlersChange",n,this);e=this.get("node");this.dds={};"static"==e.css("position")&&
e.css("position","relative");n.call(this,{newVal:this.get("handlers")})}var o=g.all,b,u=k.Draggable,p="ks-resizable-handler",k=["l","r"],q=["t","b"],j={t:function(a,e,b,c,d,g,h,i,l){a=Math.min(Math.max(b,i-l),c);return[0,a,d+i-a,0]},b:function(a,e,b,c,d,g,h,i,l){return[0,Math.min(Math.max(b,i+l),c),0,0]},r:function(a,b,f,c,d,g,h,i,l,j){return[Math.min(Math.max(a,h+j),b),0,0,0]},l:function(a,b,f,c,d,g,h,i,j,k){a=Math.min(Math.max(a,h-k),b);return[a,0,0,g+h-a]}};for(b=0;b<k.length;b++)for(g=0;g<q.length;g++)(function(a,
e){j[a+e]=j[e+a]=function(){var f=j[a].apply(this,arguments),c=j[e].apply(this,arguments),d=[];for(b=0;b<f.length;b++)d[b]=f[b]||c[b];return d}})(k[b],q[g]);r.extend(m,s,{destroy:function(){var a=this.dds,b;for(b in a)a.hasOwnProperty(b)&&(a[b].destroy(),a[b].get("node").remove(),delete a[b])}},{ATTRS:{node:{setter:function(a){return o(a)}},minWidth:{value:0},minHeight:{value:0},maxWidth:{value:Number.MAX_VALUE},maxHeight:{value:Number.MAX_VALUE},handlers:{value:[]}}});return m},{requires:["node",
"base","dd"]});

