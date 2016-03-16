Ymt.add(function(require, exports, module) {


    var repeatArr = [];

    var arealist = $(".areaList .areaItem"),
        apicdn = require('module/config/apiCDN');
    $.ajax({
        url: apicdn + "/shangou/product/GetHotCountryGroupList",
        dataType: "jsonp",
        jsonp: 'callback',
        success: function(res) {
            var i, countryName, results = res.Result,
                result, node, iconNode, waterfall = require('module/widget/waterfall'),
                htmlCache = {},
                html, index, curindex, wrap = $(".hotList"),
                CountryId, pageIndex, itemCache;
            if (res.Status == 200) {
                for (i = 0; i < results.length; i++) {


                    result = results[i];
                    countryName = result.CountryName;
                    node = arealist.eq(i);
                    iconNode = node.find('.icon');

                    //地球 icon-countryall
                    //月亮 icon-countrymoon
                    //太阳 icon-countrysun

                    node.find('.areaDetail').html(countryName);
                    node.attr("countryId", result.CountryId);
                    if (result.CountryId == 0) {
                        //全球
                        iconNode.addClass('icon-countryall');
                    } else {
                        if (result.IsHasAct) {
                            iconNode.addClass('icon-countrysun');
                        } else {
                            iconNode.addClass('icon-countrymoon');
                            node.attr('enable', "false");
                            node.addClass("nomal");
                        }
                    }
                }

                $(".areaList .areaItem").bind("click", function(e) {


                    //htmlCache = {};
                    repeatArr = [];

                    if ($(this).attr("enable") == "false") return;
                    curindex = $(this).index();

                    //获取当前容器的html
                    html = wrap.html();

                    //获取当前选中元素索引
                    index = $(this).siblings(".active").index();
                    //保存当前索引对应的html
                    if (!htmlCache[index]) htmlCache[index] = {};
                    if (index != -1) htmlCache[index]['html'] = html;

                    //清空容器
                    wrap.html("");

                    //改变状态
                    $(this).siblings().removeClass("active");
                    $(this).addClass("active");

                    //获取国家id
                    countryId = $(this).attr("countryid");

                    //获取当前点击索引的页标
                    if (!htmlCache[curindex]) htmlCache[curindex] = {};
                    pageIndex = htmlCache[curindex]['pageIndex'] || 1;

                    if (htmlCache[curindex] && htmlCache[curindex]['html']) {
                        wrap.html(htmlCache[curindex]['html'])
                    }
                    waterfall({
                        "selector": ".hotList",
                        "type": "jsonp",
                        "url": "/shangou/product/ShowHotProductsToJson",
                        "options": {
                            "pageIndex": pageIndex,
                            "CountryId": countryId,
                            "pageSize": 10
                        },
                        "offset": 0,
                        "increment": "pageIndex", //options需要递增的属性
                        callback: function(res, pageIndex) {
                            var orderlist = res || [],
                                i;
                            for (i = 0; i < orderlist.length; i++) {
                                //if (repeatArr.indexOf(orderlist[i].ProductId) == -1) {

                                //if (!$.inArray(orderlist[i].ProductId, repeatArr)) {
                                //     repeatArr.push(orderlist[i].ProductId)
                                // } else {
                                //     orderlist.splice(i, 1);
                                // }
                                wrap.append(parseHtml(orderlist[i], i));
                            }
                            htmlCache[curindex]['pageIndex'] = pageIndex;
                        }
                    });
                });
                $(".areaList .areaItem").eq(0).trigger("click");
            }
        }
    });



    function parseHtml(order, i) {
        var html = [],
            n,
            pics = order.ProductPicsToWeb;
        html.push('	<li class="hotItem">');

        html.push('		<ul class="proImgList fl clearfix">');

        var postmark = ""
        if (order.FreeShipping && order.TariffType == 0) {
            postmark = "<span class=\"postmark\">包邮包税</span>";
        } else if (order.FreeShipping) {
            postmark = "<span class=\"postmark\">包邮</span>";
        } else if (order.TariffType == 0) {
            postmark = "<span class=\"postmark\">包税</span>";
        }

        if (pics.length < 4) {
            var body = "";
            body += '<div class="share-wrap j_share share-light">';
            body += '<div class="share-type" style="display: none;">';
            body += '<span class="weibo"><a class="share-icon i-weibo" href="http://service.weibo.com/share/share.php?title=' + order.Description + '&amp;url=' + encodeURIComponent("http://" + location.host + "/shangou/product/detail?productid=" + order.ProductId) + '&amp;source=bookmark&amp;appkey=2992571369&amp;pic=' + order.ProductPics[0] + '&amp;ralateUid=" target="_blank"></a></span>';
            body += '<span class="weixin" data-product-id="' + order.ProductId + '"><strong class="share-icon i-weixin"></strong></span>';
            body += '</div>';
            body += '<span class="share-btn j_praise">分享</span>';
            body += '</div>';

            html.push('<li class="imgItem j_show_share" data-href="/shangou/product/detail?productid=' + order.ProductId + '">' + body + '<a href="/shangou/product/detail?productid=' + order.ProductId + '" target="_blank"><img src="' + pics[0] + '" width="303" height="303"></a></li>');
        } else {

            var body = "";
            body += '<div class="share-wrap j_share share-light">';
            body += '<div class="share-type" style="display: none;">';
            body += '<span class="weibo"><a class="share-icon i-weibo" href="http://service.weibo.com/share/share.php?title=' + order.Description + '&amp;url=' + encodeURIComponent("http://" + location.host + "/shangou/product/detail?productid=" + order.ProductId) + '&amp;source=bookmark&amp;appkey=2992571369&amp;pic=' + order.ProductPics[0] + '&amp;ralateUid=" target="_blank"></a></span>';
            body += '<span class="weixin" data-product-id="' + order.ProductId + '"><strong class="share-icon i-weixin"></strong></span>';
            body += '</div>';
            body += '<span class="share-btn j_praise">分享</span>';
            body += '</div>';

            for (n = 0; n < 4; n++) {
                if (n <= 1) {
                    if (n % 2 == 1) {
                        html.push('<li class="ml3');
                    } else {
                        html.push('<li class="');
                    }
                }
                if (n > 1) {
                    if (n % 2 == 1) {
                        html.push('<li class="mt3 ml3');
                    } else {
                        html.push('<li class="mt3');
                    }
                }
                html.push(' imgItem j_show_share" data-href="/shangou/product/detail?productid=' + order.ProductId + '">' + body + '<a href="/shangou/product/detail?productid=' + order.ProductId + '" target="_blank"><img src="' + pics[n] + '" width="150" height="150"></a></li>')
            }
        }

        html.push(order.StockNum < 4 && order.StockNum > 0 ? '<li class="stockBox"><span class="stock">仅剩 <i class="count">' + order.StockNum + '件</i></span></li>' : '');
        html.push('		</ul>');
        html.push('		<div class="proDetail fr">');
        html.push('			<a class="userInfo" target="_blank" href="/seller/seller/index?id=' + order.SellerId + '">');
        html.push('				<img class="buyerPhoto fl" width="46" height="46" src="' + order.Logo + '" alt=""/>');
        html.push('				<div class="infoBox fl">');
        html.push('					<p class="buyerName">' + order.SellerName + '</p>');
        html.push('					<p class="from"><img class="flag" width="14" height="14" src="' + order.Flag + '">' + order.CountryNameZh + '</p>');
        html.push('				</div>');
        html.push('			</a>');
        html.push('			<a class="proDes" target="_blank" href="/shangou/product/detail?productid=' + order.ProductId + '">');
        html.push('				' + postmark);
        html.push(order.Description);
        html.push('			</a>');
        html.push('			<div class="buyOprateBox clearfix">');
        html.push('				<div class="aboutPrice fl">');
        html.push('					<p class="priceTip">预估到手价</p>');
        html.push('					<p class="priceNumber">¥' + order.GetPrice + '</p>');
        html.push('				</div><div class="buyBox fr">');


        if (!order.OnShelf) {
            html.push('            <a href="javascript:void(0)" class="btn btn-unbuy fr">已下架</a>');
        } else if (order.StockNum <= 0) {
            html.push('            <a href="javascript:void(0)" class="btn btn-unbuy fr">已售罄</a>');
        } else {
            html.push('            <a href="/order/order/buy?pid=' + order.ProductId + '" class="buyBtn fr">立即购买</a>');
        }

        html.push('			</div></div>');
        html.push('		</div>');
        html.push('	</li>');
        return html.join("");
    }
});