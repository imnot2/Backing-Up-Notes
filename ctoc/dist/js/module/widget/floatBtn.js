var online=new Array;Ymt.add(function(){var a={container:"",size:[64,175],isShow:!0,bottom:60,minHeightShowBackTop:400,mainWidth:1200,defaultHideBackTop:!0,zIndex:1e3,struc:'<div style="display:none" id="_____FloatButtons_____" class="float-buttons"><span class="png backtotop"></span><span class="png qa"></span><span class="png redbag"></span></div>',backToTopCls:".backtotop",buttons:[{btnCls:".backtotop",handle:null,isShow:null},{btnCls:".qa",handle:null,isShow:null},{btnCls:".redbag",handle:null,isShow:null},{btnCls:".QQline",handle:null,isShow:null}],onLineQQSeller:"800076056",sellerQQScriptUrl:"http://wpa.b.qq.com/cgi/wpa.php?key=XzgwMDA3NjA1Nl8yMDU2ODFfODAwMDc2MDU2Xw",onLineQQBuyer:"800005150",buyerQQScriptUrl:"http://wpa.b.qq.com/cgi/wpa.php?key=XzgwMDAwNTE1MF8yMzAzMjdfODAwMDA1MTUwXw",initFn:function(){}},b=function(b){this.config=a,"string"!=typeof arguments[0]&&(this.config=$m.merge(a,b)),this.init(b&&b.container)};return b.VERSION="1.1.5",b.prototype={init:function(a){a?this.container=$(a):($(document.body).append(this.config.struc),this.container=$("#_____FloatButtons_____")),this.config.isShow&&(this.config.initFn&&this.config.initFn(this.container),this.config.defaultHideBackTop&&this.container.find(this.config.backToTopCls).hide(),this.rePosition(),this.container.show(),this.qqLine(),this._parseButtonAction(),this.bind())},rePosition:function(){this.isSetStyle=!1,this.position()},position:function(){if(!this.isSetStyle){{var a=!-[1]&&!window.XMLHttpRequest,b=this.config,c=document.documentElement||document.body,d=(document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,b.size[0]||this.container.width()),e=b.size[1]||this.container.height();Math.max(c.clientWidth,b.mainWidth)-(c.clientWidth-b.mainWidth)/2+20}this.container.css({width:d+"px",height:e+"px",left:Math.max(c.clientWidth,b.mainWidth)-(c.clientWidth-b.mainWidth)/2+20+"px",zIndex:b.zIndex}),a?this.container.css({position:"absolute",top:c.clientHeight-e+$(document).scrollTop()-b.bottom+"px"}):(this.isSetStyle=!0,this.container.css({position:"fixed",bottom:b.bottom}))}},_parseButtonAction:function(){function a(){g.position();var a=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;return a>g.config.minHeightShowBackTop}function b(){window.open("/qa/qa")}function c(){var a='<div class="pop_mod" style="height:'+document.documentElement.offsetHeight+'px"><div class="hongbao_share"><a class="weibo_s"></a><a class="weichat_s"><span class="wchat_pic"></span></a></div><div class="pop_layout" style="height: '+$(document).height()+'px"></div></div>',b=($m.isOnline?"http://www.ymatou.com/login?ret=":"http://www.alpha.ymatou.com/login?ret=")+window.location.href;$("body").append(a),$("#hidUserId").size()>0?($(".pop_mod .weibo_s").attr({href:"http://service.weibo.com/share/share.php?title="+encodeURIComponent("全球购物季来袭，红包送不停！国际大牌低价秒杀。拆开好友为你准备的红包，即刻优惠价购买应季热品！")+"&url="+encodeURIComponent("http://www.ymatou.com/Register/RegisterByRecommend?uid="+$("#hidUserId").val()+"&channel=4")+"&desc="+encodeURIComponent("")+"&summary="+encodeURIComponent(""),target:"_blank"}),$(".pop_mod .weichat_s").live("click",function(){$(".pop_layout").trigger("click");var a=$m.isOnline?"http://c.ymatou.com/order/ordershow/qrcodetourl?url=":"http://c.alpha.ymatou.com/order/ordershow/qrcodetourl?url=";a+=encodeURIComponent($m.isOnline?"http://m.ymatou.com":"http://mobile.alpha.ymatou.com"),a+=encodeURIComponent("/Register/RegisterByRecommend?uid="+$("#hidUserId").val()+"&channel=4");var b='<div id="mask" style="display:block"><div class="mask-warp"><div class="mw-bd"><h3>打开微信”扫一扫“,然后点击手机屏幕右上角分享按钮</h3><p id="shareimg"><img src="'+a+'"/></p></div></div></div>';$mask=$("#mask"),$mask[0]||($mask=$(b)).appendTo("body");$(window);$mask.one("click",function(){$(this).hide()}).find(".mask-warp").css({height:document.documentElement.offsetHeight}).find(".mw-bd").css({top:"200px"})})):$(".pop_mod .weibo_s,.pop_mod .weichat_s").attr({href:b,target:"_blank"})}function d(){$($("#qq-link iframe")[0].contentWindow.document).find("#launchBtn").click()}for(var e,f=this.config,g=this,h=0,i=f.buttons.length;i>h;h++){if(e=f.buttons[h],e.isShow===!1||"function"==typeof e.isShow&&e.isShow()===!1){this.container.remove(e.btnCls);break}switch(e.btnCls){case".backtotop":e.isShow=null===e.isShow&&a,e.handle=null===e.handle&&function(){window.scrollTo(0,0)};break;case".qa":e.handle=null===e.handle&&b;break;case".redbag":e.handle=null===e.handle&&c;break;case".QQline":e.handle=null===e.handle&&d}}},bind:function(){function a(){for(var a,c=b.config,d=0,e=c.buttons.length;e>d;d++)a=c.buttons[d],"function"==typeof a.isShow&&(a.isShow()?b.container.find(a.btnCls).fadeIn():b.container.find(a.btnCls).fadeOut())}var b=this;this.container.live("click",function(a){for(var c,d=$(a.target),e=b.config,f=0,g=e.buttons.length;g>f;f++)c=e.buttons[f],d.hasClass(c.btnCls.slice(1))&&"function"==typeof c.handle&&c.handle.call(d,b);return!1}),$(window).scroll(function(){var b=$(this).scrollTop();return $(".fix_tab").length>0&&$(".fix_tab").css(b>450?{position:"fixed",top:"0"}:{position:"relative",top:"0"}),a(),!1});var c=null;$(window).resize(function(){c||(c=setTimeout(function(){b.rePosition(),clearTimeout(c),c=null},500))})},qqLine:function(){var a=this;a.judgeUser(function(b){var c,d,e,f=b.iType>0,g=a.config;if(a.container.children(":first").after('<span class="png QQline"></span>'),e=a.container.find(".QQline"),f?(c=g.onLineQQSeller,d=g.sellerQQScriptUrl):(c=g.onLineQQBuyer,d=g.buyerQQScriptUrl),$.getScript("http://webpresence.qq.com/getonline?type=1&"+c+":",function(){e.addClass(1==online[0]?"QQonLine":"QQoffLine")}),!$("#qq-link")[0]){$("<div id='qq-link' style='display:none;'></div>").appendTo("body");var h=document.createElement("script");h.src=d,h.async=!0,h.defer=!0,h.charset="utf-8",h.type="text/javascript",document.getElementById("qq-link").appendChild(h)}})},judgeUser:function(a){var b=$m.isOnline?"http://top.ymatou.com":"http://top.alpha.ymatou.com";$.ajax({url:b+"/shared/GetUserIdAndType",dataType:"jsonp",success:function(b){try{b&&b.iUserId>0&&a(b)}catch(c){}}})}},function(a,c){new b(a,c)}});