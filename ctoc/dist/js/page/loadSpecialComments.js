Ymt.add(function(a){function b(a){var b=$(a),d=b.parent(),e=b.attr("data-param-id"),f=d.find("[name=content]"),g=f.val().replace(/^\s+|\s+$/g,""),h=d.find("[name=isHideName]").attr("checked")?1:0;if(!g||""==g||/^[\s]/.test(g))return alert("评论内容不允许为空"),!1;if(g.length>60)return alert("评论内容最多只能60个字符！"),!1;var i=$("#hidUserName").val();return i||h?void $.ajax({type:"post",url:"/special/special/addspecialcomment",data:"SpecialId="+e+"&Anonymity="+h+"&Content="+g,success:function(a){if(200==a.Status){if($("#p_comment").size()>0){var b=parseInt($("#p_comment .CommentCount").html())+1;$("#p_comment .CommentCount").html(b),i=h?"爱海购的TA":i,$("#p_comment .comments").prepend('<li><p><span class="name">'+i+'</span><span class="time"><em></em>刚刚</span></p><h3 class="article">'+g+"</h3></li>")}f.val(""),alert("评论成功")}else 401==a.Status?window.location.href=c:alert(a.Msg)},error:function(){alert("添加评论失败，请稍后再试")}}):void(window.location.href=c)}var c=($m.isOnline?"http://www.ymatou.com/login?ret=":"http://www.alpha.ymatou.com/login?ret=")+window.location.href,d=function(a){var b,c,d,e,f=parseInt((new Date).getTime()/1e3),g=parseInt(new Date(a).getTime()/1e3);return e=f-g,d=parseInt(e/86400),c=parseInt(e/3600),b=parseInt(e/60),d>0&&365>d?d+"天前":0>=d&&c>0?c+"小时前":0>=c&&b>0?b+"分钟前":"刚刚"};$(".detail-article").length>0&&$("img").each(function(a,b){var c=$(b).attr("productid");c&&($(b).wrap("<a class='linkToProduct' href='/shangou/product/detail?productid="+c+"'></a>"),$(b).closest("a").append("<span class='link_txt'>去看看</span>"))});var e=function(a,b){var c,d="{{\\s*",e="\\s*}}";for(var f in b)c=new RegExp(d+f+e,"g"),a=a.replace(c,b[f]);return a=a.replace(/{{}}/g,"")},f=function(a){for(var b,c,f=["<li>",'<p><span class="name">{{showName}}</span><span class="time"><em></em>{{AddTime}}</span></p>','<h3 class="article">{{Content}}</h3>',"</li>"],g="",h=0,i=a.length;i>h;h++)a[h].showName=a[h].UserName,1==a[h].HideUser&&(a[h].showName=a[h].UserName+"(匿名)"),/\/Date\(\d*\)\//.test(a[h].AddTime)&&(b=a[h].AddTime.replace(/[^0-9]/g,""),c=new Date(parseInt(b,10)),a[h].AddTime=d(new Date(parseInt(b)).getTime())),g+=e(f.join(""),a[h]);return g};a("module/widget/waterfall")({selector:".comments",url:"/special/special/GetSpecaialCommentByIdToJson?",options:{SpecialId:$("#specialId").val(),pagenum:1,pagesize:10},increment:"pagenum",callback:function(a){$(".comments").append(f(a))}}),function(a){function b(){c[f()?"fadeOut":"fadeIn"]()}var c,d=$(".fixedReplay"),e=$(a);if(d[0]){$("body").append('<div class="replay_fixed_box clearfix"></div>'),c=d.clone(),c.appendTo($(".replay_fixed_box")).addClass("fixed-replay-warp").hide();var f=function(){return d.offset().top>=e.scrollTop()&&d.offset().top<=e.scrollTop()+e.height()};b(),$(a).scroll(b)}}(window),$(".j_share").live("mouseenter",function(){var a=$(this);a.find(".share-type").fadeIn(300)}).live("mouseleave",function(){var a=$(this);a.find(".share-type").fadeOut(300)}),$(".j_share .weibo").live("click",function(){}),$(".j_share .weixin").live("click",function(a){a.preventDefault();var b=($(this),"/order/ordershow/qrcode?size=10&type=1&showId="+$("#specialId").val()),c='<div id="mask" style="display:none"><div class="mask-warp"><div class="mw-bd"><h3>打开微信”扫一扫“,然后点击手机屏幕右上角分享按钮</h3><p id="shareimg"><img src="" /></p></div></div></div>';$mask=$("#mask"),$mask[0]||($mask=$(c)).appendTo("body");$(window);$mask.one("click",function(){$(this).hide()}).find("img").attr("src",b).end().show().find(".mask-warp").css({height:$(document).height()}).find(".mw-bd").css({top:"200px"})}),$(".j_praise").live("click",function(a){a.preventDefault();var b=$(this);$.ajax({url:"/Special/Special/PraiseSpecial?Type=1&SpecialId="+$("#specialId").val(),type:"POST",success:function(a){if(200==a.Status){var d,e=b.find("span"),f=b.find("em");f[0]&&(d=parseInt(a.Result.PraiseNum,10),d>9999&&(d="9999+"),f.text(d)),e.toggleClass("active")}else if(401==a.Status){{window.location.href}window.location.href=c}}})}),$(".j-commentsSend").live("click",function(a){a.preventDefault();$(this);b(this)})});