//tab事件

//$(function(){
//	var tab = window.untils.tab || function(){};
//	//商品相册
//	tab({"evEls":$(".smallImgList .imgItem"),"pubEls":$(".bigImgList .imgItem")});
//	//商品详情
//	tab({"evEls":$("#proInfo .switch li"),"pubEls":$("#proInfo .proShow, #proInfo .evaluationShow")});
//	//推荐
//	tab({"evEls":$("#buyToo .switch li"),"pubEls":$("#buyToo .buyTooShow, #buyToo .sameShow")});
//});

//滚动事件
$(function(){
	var el = $("#proInfo .switchBox"),
		enterCar = el.children(".enterCar"),
		scrollTop, offsetTop = el.offset().top;
	$(window).scroll(function(e){
		scrollTop = $(window).scrollTop();		
		if(scrollTop >= offsetTop){
			el.css({"position":"fixed","top":0});
			enterCar.show();
		}else{
			el.css({"position":"relative"});
			enterCar.hide();
		}
	});
});

//二维码
$(function(){
	var el = $("#proGallery .mobileDown");
	el.bind('mouseover',function(){
		el.children('.qrBox').show();
	}).bind('mouseout',function(){
		el.children('.qrBox').hide();
	})
})

//卖完 || 下架
$(function(){
	var opt = window.options || {};
	$.ajax({
		url : opt.sellOut,
		dataType : "jsonp",
		success : function(res){
			var html = [], i, 
				res = res || [], o;
			html.push('<ul class="clearfix">');	

			for(i = 0; i < res.length; i++){
				o = res[i];
				html.push('<li><div class="imgWrap"><a href="'+o.link+'" target="_blank">');
				html.push('<img src="'+o.src+'" width="120" height="120"></a></div>');
				html.push('<p class="name">'+o.name+'</p>');
				html.push('<p class="price">￥'+o.price+'</p></li>');
			}
			html.push('</ul>');
        	$("#proDetail .sellOut").append(html.join(''));
		}
	})
});



//buyToo 购买此商品的用户还购买了
$(function(){
	var opt = window.options || {};
	$.ajax({
		url : opt.buyToo,
		dataType : "jsonp",
		success : function(res){
			var html = [], i, 
				res = res || [], o;
			html.push('<dl class="clearfix">');
			for(i = 0; i < res.length; i++){
				o = res[i];
				html.push('<dd><div class="imgWrap"><a href="'+o.link+'" target="_blank">');
				html.push('<img src="'+o.src+'" width="120" height="120"></a></div>');
				html.push('<p class="name">'+o.name+'</p>');
				html.push('<p class="price">￥'+o.price+'</p></dd>');
			}
			html.push('</dl>');
        	$("#buyToo .buyTooShow").append(html.join(''));
		}
	})
});
//same 同类产品推荐
$(function(){
	var opt = window.options || {};
	$.ajax({
		url : opt.same,
		dataType : "jsonp",
		success : function(res){
			var html = [], i, 
				res = res || [], o;
			html.push('<dl class="clearfix">');
			for(i = 0; i < res.length; i++){
				o = res[i];
				html.push('<dd><div class="imgWrap"><a href="'+o.link+'" target="_blank">');
				html.push('<img src="'+o.src+'" width="120" height="120"></a></div>');
				html.push('<p class="name">'+o.name+'</p>');
				html.push('<p class="price">￥'+o.price+'</p></dd>');
			}
			html.push('</dl>');
        	$("#buyToo .sameShow").append(html.join(''));
		}
	})
});

//store 同店铺推荐
$(function(){
	var opt = window.options || {};
	$.ajax({
		url : opt.store,
		dataType : "jsonp",
		success : function(res){
			var str = '', html = [], i, 
				res = res || [], o;			
			for(i = 0; i < res.length; i++){
				o = res[i];
				html.push('<dd><div class="imgWrap"><a href="'+o.link+'" target="_blank">');
				html.push('<img src="'+o.src+'" width="120" height="120"></a></div>');
				html.push('<p class="name">'+o.name+'</p>');
				html.push('<p class="price">￥'+o.price+'</p></dd>');
				str += html.join('');
				html = [];
			}
        	$("#proInfo .recommands dl").append(html.join(''));
		}
	})
});

//viewed 最近浏览
$(function(){
	var opt = window.options || {};
	$.ajax({
		url : opt.viewed,
		success : function(res){
			var str = '', html = [], i, 
				res = res || [], o;			
			for(i = 0; i < res.length; i++){
				o = res[i];
				html.push('<dd><div class="imgWrap"><a href="'+o.link+'" target="_blank">');
				html.push('<img src="'+o.src+'" width="120" height="120"></a></div>');
				html.push('<p class="name">'+o.name+'</p>');
				html.push('<p class="price">￥'+o.price+'</p></dd>');
				str += html.join('');
				html = [];
			}
        	$("#proInfo .recentlys dl").append(html.join(''));
		}
	})
});




//分页点击aaa
$(function(){
	var opt = window.options || {},
		untils = window.untils || {},
		el = $("#pagination");

	el.bind('click',function(e){
		if($(e.target).is("a")){
			var index = $(e.target).attr("number");
			var pageUi = untils.page({"index":index,"prev":2,"next":5,"count":el.attr("totalpage")});
			el.empty().append(pageUi);
			$.ajax({			
				url:"product/GetProductCredits/"+opt.sellerId +"/" +opt.sellerId+ "/"+index,
				//url: "http://dev.ymatou.com/product/GetProductCredits/3383/0002762a-33a4-44a6-90cc-fb175e517855/2",
				dataType: "jsonp",
				success : function(res){
					var str = '', html = [], i, o, res = res.List || [],
						rank = {
							y1:"&#xf001f",
	                        y2:"&#xf001e",
	                        y3:"&#xf001d",
	                        y4:"&#xf001c",
	                        y5:"&#xf001b",
	                        y6:"&#xf001a" 
						};
					function scoreUi(f){
						var str = '', n = parseInt(f), f = (f - n).toFixed(2), i;
						for(i = 0; i< n; i++){
							str += '<span class="start scoreFor10"></span>';
						}
						if(f > 0.5 && f <= 0.9){
							str += '<span class="start scoreFor09"></span>';
							i++;
						}
						if(f > 0.4 && f <= 0.5){
							str += '<span class="start scoreFor05"></span>';
							i++;
						}
						if(f > 0 && f <= 0.4){
							str += '<span class="start scoreFor04"></span>';
							i++;
						}
						while(i < 5){
							str += '<span class="start scoreFor00"></span>';
							i++;
						}
						return str;
					}
					function catalog(arr){
						var str = '', o, i, n, arr = arr || [];
						for(i = 0; i< arr.length; i++){
							o = arr[i];
							for(n in o){
								str += '<span '+(i == 0 ? "class='first'" : "")+'>'+n+':'+o[n]+'</span>';
							}						
						}
						return str;
					}
					for(i = 0; i< res.length; i++){
						o = res[i];
						html.push('<div class="clientEvaluation clearfix">');
						html.push('<span class="clientName fl">'+o.userName+'<i class="iconfont">'+rank[o.rank]+'</i></span>');
						html.push('<div class="info"><p class="stars clearfix">'+scoreUi(o.GoodScore)+'</p>');
						html.push('<p class="des">'+o.content+'</p>');
						html.push('<p class="proInfo">'+catalog(o.CatalogTexts)+'</p>');
						html.push('<p class="time clearfix">评价时间 '+untils.ChangeDateFormat(o.CreditTime)+'<span class="btn"><a href="javascript:;">有用(0)</a></span></p>');
						if(o.Reply){
							html.push('<div class="reply"><span class="adminPhoto fl"></span><p class="from">买家从美国纽约发来回复2014-09-09</p>');
							html.push('<p class="replyInfo">谢谢你对商品的</p></div>');
						}					
						html.push('</div></div>');
						str += html.join('');
						html = [];
					}
					$("#proInfo .evaluationShow").append(str.join(''));
				}
			})
		}
	})
})

//店铺收藏
$(function(){
	$("#proGallery .collect").bind('click',function(e){
		var opt = window.options || {};
		var o = $(this), userId = opt.userId, productId = opt.productId;
        if (userId == 0) {
            //collectTemps.alert({ 'icon': 'error', 'text': '请先登录', 'btnText': '确定' });
            alert("请先登录");
            return;
        }

        //collectTemps.alert({ 'icon': 'error', 'text': '您不是买家，不能收藏商品', 'btnText': '确定' });       
        //return;

        $.ajax({
            type: "POST",
            url: "/UserCollect/AddProductCollect",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded',
            data: "userId=" + userId + "&productId=" + productId,
            async: true,
            success: function(data) {
                if (data.success) {
                	alert("收藏成功");
                    //collectTemps.alert({ 'icon': 'right', 'text': '商品收藏成功,您可以继续购物', 'btnText': '确定' });
                } else {
                	alert("收藏失败");
                    //collectTemps.alert({ 'icon': 'error', 'text': data.msg, 'btnText': '确定' });
                }
            },
            error: function() {
                //collectTemps.alert({ 'icon': 'error', 'text': '商品收藏成功,您可以继续购物', 'btnText': '确定' });
            }
        });
        return false;
	})	
})