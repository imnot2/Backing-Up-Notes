Ymt.add(function(require, exports, module) {
	var waterfall = require('module/widget/waterfall'),
		countdown = require('module/widget/countdown');
	waterfall({
		"selector": ".recommandList",
		"type": "jsonp",
		"url": "/shangou/product/ShowRecommandProductsToJson",
		"options": {
			"PageIndex": 1,
			"pagesize": 10
		},
		"increment": "PageIndex",
		callback: function(res, pageIndex) {
			$(".recommandList").append(parseHtml(res));
		}
	});



	//直播列表结束时间Switchable
	function endTimes(endDates, newDate) {


		var fromtime = new Date(parseInt(endDates.replace(/\D/igm, "")));
		var serverTime = new Date();

		ts = fromtime - serverTime;


		var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10) >= 0 ? parseInt(ts / 1000 / 60 / 60 / 24, 10) : 0;
		var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10) >= 0 ? parseInt(ts / 1000 / 60 / 60 % 24, 10) : 0;
		var mm = parseInt(ts / 1000 / 60 % 60, 10) >= 0 ? parseInt(ts / 1000 / 60 % 60, 10) : 0;
		var ss = parseInt(ts / 1000 % 60, 10) >= 0 ? parseInt(ts / 1000 % 60, 10) : 0;

		var isRed = (hh == 0 && mm < 30);

		hh = hh.toString().length > 1 ? hh : "0" + hh;
		mm = mm.toString().length > 1 ? mm : "0" + mm;
		ss = ss.toString().length > 1 ? ss : "0" + ss;

		var sdate = hh.toString() + mm.toString();
		var retDate = [];

		//for (var i in sdate) {
		for (var i = 0; i < sdate.length; i++) {

			//retDate.push(sdate[i]);
			retDate.push(sdate.substring(i, i + 1));
		}

		//{isTrue:false,date:[1,2,3,0]}  未少于30分钟 时间为12:30
		return {
			isTrue: isRed,
			date: retDate
		};
	}



	function parseHtml(arr) {
		var html = [],
			o, arr = arr || [],
			i, endTime, n, hour = 0,
			minute = 0;



		for (i = 0; i < arr.length; i++) {
			o = arr[i];


			//console.log(o);

			var body = "";
			body += '<div class="share-wrap j_share share-light">';
			body += '<div class="share-type" style="display: none;">';
			body += '<span class="weibo"><a class="share-icon i-weibo" href="http://service.weibo.com/share/share.php?title=' + o.Description + '&amp;url=' + encodeURIComponent("http://" + location.host + "/shangou/product/detail?productid=" + o.ProductId) + '&amp;source=bookmark&amp;appkey=2992571369&amp;pic=' + o.ProductPic + '&amp;ralateUid=" target="_blank"></a></span>';
			body += '<span class="weixin" data-product-id="' + o.ProductId + '"><strong class="share-icon i-weixin"></strong></span>';
			body += '</div>';
			body += '<span class="share-btn j_praise">分享</span>';
			body += '</div>';

			html.push('<li class="recommandItem ">');
			html.push('    <a class="des png" href="/shangou/product/detail?productid=' + o.ProductId + '&currentpage=2" target="_blank">' + o.AppRecommendContent + '</a>');
			html.push('    <div class="proShow j_show_share" data-href="/shangou/product/detail?productid=' + o.ProductId + '&currentpage=2">' + body + '');
			html.push('        <a href="/shangou/product/detail?productid=' + o.ProductId + '&currentpage=2" target="_blank"><img class="img" src="' + o.ProductPic + '" width="288" height="288" alt=""/></a>');
			html.push('        <a class="userInfo mask" href="/seller/seller/index?id=' + o.SellerId + '" target="_blank">');
			html.push('            <img class="buyerPhoto fl" width="46" height="46" src="' + o.SellerLogo + '" alt="">');
			html.push('            <div class="infoBox fl">');
			html.push('                <p class="buyerName">' + o.SellerName + '</p>');
			html.push('               <p class="from">');
			html.push('                    <img class="flag" width="14" height="14" src="' + o.Flag + '" alt="">美国');
			html.push('                </p>');
			html.push('            </div>');
			html.push('        </a>');
			html.push('    </div>');
			html.push('    <div class="buyOprateBox clearfix">');
			html.push('        <div class="aboutPrice fl">');
			html.push('            <p class="priceTip">预估到手价</p>');
			html.push('            <p class="priceNumber">&yen;' + o.Price + '</p>');
			html.push('        </div>');
			html.push('        <div class="buyBox fr">');

			//服务器返回的三种时间格式	o.EndTimeBetweenNow。
			// 2小时：5分钟
			// 5分钟
			// 00：00

			//var ns='/Date('+new Date().getTime().toString()+')/';

			//console.log(ns);

			var thisDate = endTimes(o.ExpireTime);

			if (thisDate.isTrue) {
				html.push('            <p class="countDown fr">');
			} else {
				html.push('            <p class="countDown end fr">');
			}

			html.push('                <span class="timeItem">' + thisDate.date[0] + '</span>');
			html.push('                <span class="timeItem">' + thisDate.date[1] + '</span><i class="fl">:</i>');
			html.push('                <span class="timeItem">' + thisDate.date[2] + '</span>');
			html.push('                <span class="timeItem">' + thisDate.date[3] + '</span>');
			html.push('            </p>');

			if (!o.OnShelf) {
				html.push('            <a href="javascript:void(0)" class="btn btn-unbuy fr">已下架</a>');
			} else if (o.StockNum <= 0) {
				html.push('            <a href="javascript:void(0)" class="btn btn-unbuy fr">已售罄</a>');
			} else {
				html.push('            <a href="/order/order/buy?pid=' + o.ProductId + '" class="buyBtn fr">立即购买</a>');
			}

			html.push('        </div>');
			html.push('    </div>');
			html.push('</li>');
		}
		return html.join("");
	}
});