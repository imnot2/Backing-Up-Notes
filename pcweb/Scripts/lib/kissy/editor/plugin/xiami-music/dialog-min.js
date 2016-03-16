﻿/*=======================dialog-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 27 10:38
*/
KISSY.add("editor/plugin/xiami-music/dialog",function(f,k,o,p){function l(){l.superclass.constructor.apply(this,arguments)}function i(c,a,e){return"<a class='ks-editor-xiami-page-item ks-editor-button ks-inline-block"+(c==a?" ks-editor-xiami-curpage":"")+"' data-value='"+a+"' href='#'>"+(e||a)+"</a>"}var m=f.DOM,q=f.Node,r=k.Utils.debugUrl("theme/tao-loading.gif"),s="http://www.xiami.com/app/nineteen/search/key/{key}/page/{page}",n="输入歌曲名、专辑名、艺人名";m.addStyleSheet(".ks-editor-xiami-list {margin:10px 0 10px 0;padding:10px 20px 0 20px;border-top:1px solid #CED5E0;display:none;}.ks-editor-xiami-list li{border:1px solid #CED5E0;border-width:0 0 1px 0;overflow:hidden;zoom:1;color:#646464;height:24px;line-height:24px;padding:0 20px 0 10px;}.ks-editor-xiami-list .ks-editor-xiami-add {float:right;}.ks-editor-xiami-list .ks-editor-xiami-song {float:left;width:300px;white-space:nowrap;overflow:hidden;}.ks-editor-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; padding:1px 7px;margin:0 3px;}.ks-editor-xiami-paging a:hover,.ks-editor-xiami-paging a.ks-editor-xiami-curpage {color:red;text-decoration:none;}.ks-editor-xiami-paging {text-align:center;margin:20px -10px 0 -10px;}.ks-editor-xiami-page-more {padding:0 10px;}",
"XiamiMusic");f.extend(l,o,{_config:function(){this._cls="ke_xiami";this._type="xiami-music";this._title="虾米音乐";this._bodyHtml="<div style='padding:20px 0;'><form action='#' class='ks-editor-xiami-form' style='margin:0 20px;'><p class='ks-editor-xiami-title'></p><p class='ks-editor-xiami-url-wrap'><input class='ks-editor-xiami-url ks-editor-input' style='width:370px;'/> &nbsp;  <a class='ks-editor-xiami-submit ks-editor-button ks-inline-block'>搜 索</a></p><p style='margin:10px 0'><label>对 齐： <select class='ks-editor-xiami-align' title='对齐'><option value='none'>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></label><label style='margin-left:70px;'>间距：  <input  data-verify='^\\d+$'  data-warning='间距请输入非负整数' class='ks-editor-xiami-margin ks-editor-input' style='width:60px;' value='0'/> 像素</label></p></form><div class='ks-editor-xiami-list'></div></div>";
this._footHtml="<div style='padding:5px 20px 20px;'><a class='ks-editor-xiami-ok ks-editor-button ks-inline-block' style='margin-right:20px;'>确&nbsp;定</a><a class='ks-editor-xiami-cancel ks-editor-button ks-inline-block'>取&nbsp;消</a></div>"},_initD:function(){function c(b){var c=g.val();30<c.replace(/[^\x00-\xff]/g,"@@").length?alert("长度上限30个字符（1个汉字=2个字符）"):!f.trim(c)||c==n?alert("不能为空！"):(a._xiami_submit.addClass("ks-editor-button-disabled",void 0),c=f.substitute(s,{key:encodeURIComponent(g.val()),
page:b}),a._xiamia_list.html("<img style='display:block;width:32px;height:32px;margin:5px auto 0 auto;'src='"+r+"'/><p style='width: 130px; margin: 15px auto 0; color: rgb(150, 150, 150);'>正在搜索，请稍候......</p>"),a._xiamia_list.show(),f.io({cache:!1,url:c,dataType:"jsonp",success:function(c){c.page=b;a._listSearch(c)},error:function(){a._xiami_submit.removeClass("ks-editor-button-disabled",void 0);a._xiamia_list.html("<p style='text-align:center;margin:10px 0;'>不好意思，超时了，请重试！</p>")}}))}var a=this,e=a.editor,
b=a.dialog,d=b.get("el"),h=b.get("footer"),g=d.one(".ks-editor-xiami-url");a.dAlign=p.Select.decorate(d.one(".ks-editor-xiami-align"),{prefixCls:"ks-editor-big-",width:80,menuCfg:{prefixCls:"ks-editor-",render:d}});a.addRes(a.dAlign);a._xiami_input=g;k.Utils.placeholder(g,n);a.addRes(g);a._xiamia_list=d.one(".ks-editor-xiami-list");a._xiami_submit=d.one(".ks-editor-xiami-submit");a._xiami_submit.on("click",function(b){a._xiami_submit.hasClass("ks-editor-button-disabled",void 0)||c(1);b.halt()});a.addRes(a._xiami_submit);
g.on("keydown",function(a){13===a.keyCode&&c(1)});a.dMargin=d.one(".ks-editor-xiami-margin");a._xiami_url_wrap=d.one(".ks-editor-xiami-url-wrap");a._xiamia_title=d.one(".ks-editor-xiami-title");d=h.one(".ks-editor-xiami-ok");h.one(".ks-editor-xiami-cancel").on("click",function(a){b.hide();a.halt()});a.addRes(h);d.on("click",function(c){var b=a.selectedFlash,d=e.restoreRealElement(b);a._dinfo={url:a._getFlashUrl(d),attrs:{title:b.attr("title"),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;float:"+
a.dAlign.get("value")+";"}};a._gen();c.halt()},a);a.addRes(d);a._xiamia_list.on("click",function(b){b.preventDefault();var d=new q(b.target),e=d.closest(function(b){return a._xiamia_list.contains(b)&&m.hasClass(b,"ks-editor-xiami-add")},void 0),d=d.closest(function(b){return a._xiamia_list.contains(b)&&m.hasClass(b,"ks-editor-xiami-page-item")},void 0);e?(a._dinfo={url:"http://www.xiami.com/widget/"+e.attr("data-value")+"/singlePlayer.swf",attrs:{title:e.attr("title"),style:"margin:"+(parseInt(a.dMargin.val())||
0)+"px;float:"+a.dAlign.get("value")+";"}},a._gen()):d&&c(parseInt(d.attr("data-value")));b.halt()});a.addRes(a._xiamia_list)},_listSearch:function(c){var a,e=c.results,b="";if(c.key==f.trim(this._xiami_input.val())){this._xiami_submit.removeClass("ks-editor-button-disabled",void 0);if(e&&e.length){b="<ul>";for(a=0;a<e.length;a++){var d=e[a],h=decodeURIComponent(d.song_name)+" - "+decodeURIComponent(d.artist_name),g="<li title='"+h+"'><span class='ks-editor-xiami-song'>",j=h;35<j.length&&(j=j.substring(0,
35)+"...");b+=g+j+"</span><a href='#' title='"+h+"' class='ks-editor-xiami-add' data-value='"+(d.album_id+"_"+d.song_id)+"'>添加</a></li>"}b+="</ul>";e=c.page;c=Math.floor(c.total/8);a=e-1;d=e+1;if(1<c){b+="<p class='ks-editor-xiami-paging'>";2>=a&&(d=Math.min(2-a+d,c-1),a=2);d=Math.min(d,c-1);d==c-1&&(a=Math.max(2,d-3));1!=e&&(b+=i(e,e-1,"上一页"));b+=i(e,1,"1");for(2!=a&&(b+="<span class='ks-editor-xiami-page-more'>...</span>");a<=d;a++)b+=i(e,a,void 0);d!=c&&(d!=c-1&&(b+="<span class='ks-editor-xiami-page-more'>...</span>"),
b+=i(e,c,c));e!=c&&(b+=i(e,e+1,"下一页"));b+="</p>"}}else b="<p style='text-align:center;margin:10px 0;'>不好意思，没有找到结果！</p>";this._xiamia_list.html(b)}},_updateD:function(){var c=this.selectedFlash;c?(this._xiami_input.val(c.attr("title")),this._xiamia_title.html(c.attr("title")),this.dAlign.set("value",c.css("float")),this.dMargin.val(parseInt(c.style("margin"))||0),this._xiami_url_wrap.hide(),this.dialog.get("footer").show(),this._xiamia_title.show()):(k.Utils.resetInput(this._xiami_input),this.dAlign.set("value",
"none"),this.dMargin.val(0),this._xiami_url_wrap.show(),this.dialog.get("footer").hide(),this._xiamia_title.hide(),this._xiami_submit.removeClass("ks-editor-button-disabled",void 0));this._xiamia_list.hide();this._xiamia_list.html("")},_getDInfo:function(){f.mix(this._dinfo.attrs,{width:257,height:33});return this._dinfo}});return l},{requires:["editor","../flash/dialog","../menubutton/"]});

