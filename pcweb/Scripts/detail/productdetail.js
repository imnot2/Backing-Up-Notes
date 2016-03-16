Ymt.add(function (require, exports, module) {

    var tabs = require("widget/Tabs");
    var ellipsis = require("util/ellipsis");
    //规格
    var specifi = require("ui/specification");
    //轮播图
    var slide = require("widget/slide");
    //cookie
    var cookie = require("util/cookie");
    //paused
    var CountDown = require('widget/countdown');
    var imglazyload = require("util/ImgLazyLoad");
    var pagination = require('util/pagination');
    var LayerBox = require("widget/layerbox");

    var filterhtml = require("util/Html");

    //buttom
    var productRecommend = tabs("#buyToo", {
        panels: ".panels .item",
        triggers: ".switchBox .item",
        activeTriggerCls: "select"
    });

    var slider = slide("#proGallery", {
        panels: ".bigImgList .imgItem",
        triggers: ".smallImgList .imgItem",
        activeTriggerCls: "select",
        triggerType: 'mouse',
        autoplay: false,
        triggerEvent: true
    });
    /*
       气泡    
    */
    function bubble(hoverEl, contentEl) {
        var timer = null,
            _this;
        $(hoverEl).live('mouseover', function (e) {
            _this = this;
            $(_this).parents('dl').addClass('hightZindex');
            $(contentEl).show()
                .bind('mouseenter', function (e) {
                    if (timer) clearTimeout(timer);
                }).bind("mouseleave", function (e) {
                    $(contentEl).hide();
                    $(this).parents('dl').removeClass('hightZindex');
                })
        }).bind('mouseout', function (e) {
            timer = setTimeout(function () {
                $(contentEl).hide();
                $(_this).parents('dl').removeClass('hightZindex');
            }, 300);
        });
    }


    function GetActivityPrice(promotionType, originalPrice, promotion) {
        //去除价格中的逗号分隔
        originalPrice = parseFloat(originalPrice.replace(/,/g, ""));
        promotionType = parseInt(promotionType);
        promotion = parseFloat(promotion);
        if (promotionType > 0) {
            switch (promotionType) {
            case 1:
                return Math.floor(originalPrice * promotion);
            case 2:
                return Math.floor(originalPrice - promotion);
            case 3:
                return Math.floor(promotion);
            default:
                return Math.floor(originalPrice);
            }
        }
        return Math.floor(originalPrice);
    }

    function bubbleSort(array, fn, price) {
        for (var i = 0; i < array.length; i++) {
            for (var j = array.length - 1; j > 0; j--) {
                if (fn(array[j][price], array[j - 1][price])) {
                    var temp = array[j - 1];
                    array[j - 1] = array[j];
                    array[j] = temp;
                }
            }
        }
        return array;
    }
    //排序
    function sort(a, b) {
        if (!a || !b) return;
        a = parseFloat(a.split(",").join(""));
        b = parseFloat(b.split(",").join(""));
        return a < b;
    }
    //add del
    function addDelHander(o, textNum) {
        var el = textNum || $("#txtNum"),
            count = textNum && textNum.val() || el.val();
        if ($(o).hasClass("add")) {
            count++;
            el.val(count);
        }
        if ($(o).hasClass("del")) {
            count--;
            count = count < 1 ? 1 : count;
            el.val(count);
        }
    }

    //获取商品分类
    function GetCatalog(o, spe, inputNum) {
        var catalog = new Object();
        catalog.catalogId = o.CatalogId;
        catalog.flight = o.Flight.split(",").join("");
        var price = "";
        if (spe.config.spedata.HasPromotionLevel) {
            price = o['PromotionPrice' + (parseInt($('#PromotionLevel').val()) || "")];
        } else if (o.PromotionPrice) {
            price = o.PromotionPrice;
        } else {
            price = o.Price;
        }

        catalog.quotePrice = price.split(",").join("");

        catalog.buyCount = inputNum.val();

        catalog.productName = $("#hProductName").val().replace(',', '，').replace(':', '：');
        catalog.seller = $("#hSellerNickName").val();
        catalog.sellerId = $("#hSellerUserId").val();

        catalog.toString = function () {
            var s = this.catalogId + ':' + this.productName + ':';
            s = s + o.SpecDetail_P.join('$');
            //s = s + ']'
            return this.quotePrice + "," + this.flight + "," + this.buyCount + "," + this.seller + "," + this.sellerId + "," + s;
        };

        return catalog;
    }
    //更新购物车数量。
    function refreshShoppingCartNum() {
        $.get('/ShoppingCart/RefreshShoppingCartNum', function (data) {
            data = (data + '').replace(/\(|\)/ig, '');
            if (parseInt(data)) $('#ShoppingCart .number').html(data);
        });
    }
    //验证购买数量
    function checkBuyNum(o, inputNode, callback) {
        var data = o.data,
            buyNum = inputNode.val(),
            node;
        el = $('<dd class="tip"></dd>');
        node = inputNode.parents('dl.countBox');
        node.find('dd.tip').remove();
        inputNode.removeClass('errorBorder');
        if (parseInt(buyNum) < 0 || isNaN(parseInt(buyNum))) {
            el.html("请输入正确的购买数量");
            inputNode.addClass('errorBorder');
            node.append(el);
            return;
        }
        if (buyNum > data.Stock) {
            el.html("您要购买的数量大于可购买的数量");
            inputNode.addClass('errorBorder');
            inputNode.trigger('focus');
            node.append(el);
            return;
        }

        if (data) {
            $.ajax({
                url: window.options.productNumInCart, //获取购物车里的商品数
                success: function (res) {
                    var shopCarNum = res.NumInCart || 0;
                    if ((parseInt(buyNum) > parseInt(data.Limit) - parseInt(data.Bought) - shopCarNum) && parseInt(data.Limit) != 0) {
                        el.html("您要购买的数量大于可购买的数量");
                        node.append(el);
                        inputNode.addClass('errorBorder');
                        inputNode.trigger('focus');
                        inputNode.val(data.Limit);
                    } else {
                        node.find('dl.tip').hide();
                        inputNode.removeClass('errorBorder');
                        if (callback) {
                            if (!o.seleteall) {
                                node.append(el.html("请选择完整规格"));
                                return;
                            }
                            callback();
                        }
                    }
                }
            });
        }
    }
    //立即购买
    function bntBuyNow(o, inputNode) {
        var node = inputNode.parents('dl.countBox');
        checkBuyNum(o, inputNode, function () {
            var b = GetCatalog(o.data, o, inputNode),
                cc = encodeURIComponent(b.toString());
            try {
                ymt_bi.re_img({
                    pguid: window.options.productId,
                    bh: '30001'
                });
            } catch (e) {}
            $.ajax({
                url: "/ajax/addcart?c=" + cc + "&t=" + Math.random(),
                success: function (m) {


                    var el = $('<dd class="tip"></dd>');
                    if (m.result == "true") {
                        window.location.href = "/shoppingcart?t=" + Math.random();
                    } else {
                        if (m.message != "") {
                            node.append(el.html(m.message));
                        } else {
                            node.append(el.html("添加到购物车失败，请选择规格并填写正确的数量！"));
                            inputNode.addClass('errorBorder');
                            inputNode.trigger('focus');
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("error");
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        });
    }
    //加入购物车
    function bntReturn(o, inputNode) {
        var node = inputNode.parents('dl.countBox');
        checkBuyNum(o, inputNode, function () {
            var b = GetCatalog(o.data, o, inputNode),
                cc = encodeURIComponent(b.toString());
            $.ajax({
                url: "/ajax/addcart?c=" + cc + "&t=" + Math.random(),
                success: function (m) {
                    var el = $('<dd class="tip"></dd>');
                    if (m.result == "true") {
                        alert('添加到购物车成功！');
                        refreshShoppingCartNum();
                    } else {
                        if (m.message != "") {
                            node.append(el.html(m.message));
                        } else {
                            node.append(el.html("添加到购物车失败，请选择规格并填写正确的数量！"));
                            inputNode.addClass('errorBorder');
                            inputNode.trigger('focus');
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("error");
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
            try {
                ymt_bi.re_img({
                    pguid: window.options.productId,
                    bh: '20001'
                });
            } catch (e) {}
        });
    }

    function fillhtml(arr, elem, attr) {
        if (arr.length > 0 && arr[0][attr] == arr[arr.length - 1][attr]) {
            elem.html(arr[0][attr])
        } else if (arr.length > 1) {
            elem.html(arr[0][attr] + "~" + arr[arr.length - 1][attr])
        }
    }
    //运费过滤
    function filterFare(str) {
        str = str.replace(/\n|(\s{2})/ig, '');
        str = str.replace(/>运费：/gi, '>运<span class="placeholder24"></span>费：');
        str = str.replace(/class="curAddress">国内<span class="addBg"><\/span>/gi, 'class="curAddress noBorder">国内');
        str = str.replace(/运至 /gi, '<span class="to">运至</span>');
        return str;
    }
    //计算活动折扣
    function computeDiscount(promotionPrice) {
        if (typeof (promotionPrice) == "number") promotionPrice = promotionPrice.toString();
        var isComputeDiscount = window.options.isDiscount == "true" ? 1 : 0,
            pullNode = $('.computeDiscount'),
            marketPrice = parseFloat(window.options.marketPrice),
            promotionPrice = parseFloat(promotionPrice.replace(',', '')),
            result;

        if (isComputeDiscount && promotionPrice && marketPrice) {
            result = (promotionPrice / marketPrice) * 10 + '';
            if (result.indexOf(".") > -1) result = result.substring(0, result.indexOf(".") + 2);
            pullNode.html(result + '折');
        } else {
            pullNode.hide();
        }
    }
    //商品规格
    $(function () {
        $.ajax({
            url: "/getproductcatalogs-" + window.options.productId,
            dataType: 'json',
            success: function (res) {
                var promotionCount = $(".productInfoBox .promotion .count");
                var spe = specifi("buyInfo", {
                        spedata: res,
                        oversaleBox: '.sellOut',
                        specBox: '.sellIn',
                        stock: '.spestock',
                        price: '.price .des .count',
                        promotionPrice: '.promotion .des .count',
                        limitNum: '.spelimit',
                        countdownnumber: 0,
                        Flight: '.speflight',
                        parent: '.productInfoBox',
                        canBuyBtn: '.sellIn',
                        cantBuyBtn: '',
                        activitypromotiontype: 0,
                        activitypromotion: 0,
                        complete: function (m) {
                            //非活动
                            if (!window.options.isActivity) {
                                promotionCount.html(GetActivityPrice(window.options.promotionType, m.Price, window.options.promotion));
                            } else {
                                promotionCount.html(m.PromotionPrice);
                                if (parseFloat(m.PromotionPrice) < parseFloat(window.options.marketPrice)) computeDiscount(m.PromotionPrice);
                            }
                            $('dl.promotion').show();
                            $(this.parent).find('.countBox dd.tip').hide();
                        },
                        callback: function (a, b) {
                            var that = this,
                                min, max;
                            if (b.find('img').size() > 0) {
                                var index = $(".smallImgList li.select").index(),
                                    elem = $($('.bigImgList .imgItem').get(index));
                                var imgUrlForShow = $(b).find('img').attr('src').replace("thumbnail", "original").replace("_t.", "_o.");
                                elem.attr('href', imgUrlForShow);
                                elem.find('a.zoom').attr('href', imgUrlForShow);
                                elem.find('img').attr('src', imgUrlForShow);
                                slider.stop();
                            }
                        }
                    }),
                    datasort = [],
                    promotionsort = [],
                    priceElem = $("#proDetail .price .des .count");


                datasort = bubbleSort(res.Data, sort, "Price");
                promotionsort = bubbleSort(res.Data, sort, "PromotionPrice");
                if (datasort.length > 0 && datasort[0].Price == datasort[datasort.length - 1].Price) {
                    priceElem.html(datasort[0].Price);
                    if (!window.options.isActivity) {
                        promotionCount.html(GetActivityPrice(window.options.promotionType, datasort[0].Price, window.options.promotion));
                    }
                } else if (datasort.length > 1) {
                    priceElem.html(datasort[0].Price + "~" + datasort[datasort.length - 1].Price);
                    if (!window.options.isActivity) {
                        var activityStartPrice = GetActivityPrice(window.options.promotionType, datasort[0].Price, window.options.promotion);
                        var activityTopPrice = GetActivityPrice(window.options.promotionType, datasort[datasort.length - 1].Price, window.options.promotion);
                        if (activityStartPrice == activityTopPrice) {
                            promotionCount.html(activityStartPrice);
                        } else {
                            promotionCount.html(activityStartPrice + "~" + activityTopPrice);
                        }
                    }
                }
                if (window.options.isActivity) {
                    if (promotionsort.length > 0 && promotionsort[0].PromotionPrice == promotionsort[promotionsort.length - 1].PromotionPrice) {
                        promotionCount.html(promotionsort[0].PromotionPrice);
                    } else if (promotionsort.length > 1) {
                        promotionCount.html(promotionsort[0].PromotionPrice + "~" + promotionsort[promotionsort.length - 1].PromotionPrice);
                    }
                }
                var txtNum = $("#txtNum");
                txtNum.bind('blur', function (e) {
                    checkBuyNum(spe, $(this));
                });
                $('#CanBuyDiv .instantly').live('click', function () {
                    bntBuyNow(spe, txtNum);
                });
                $("#CanBuyDiv .intoShopCar").click(function () {
                    bntReturn(spe, txtNum);
                });

                var tempLimitNum = $('.spelimit').val();
                if (!isNaN(tempLimitNum) && tempLimitNum < 0) {
                    $('.spelimit').val('0');
                };

                //调整规格区域高度
                var proGallery = $('#proGallery'),
                    detailWrap = $('.detailWrap'),
                    proGallery_h,
                    detailWrap_h,
                    result_h;
                proGallery.css("height", "");
                detailWrap.css("height", "");
                proGallery_h = proGallery[0].offsetHeight;
                detailWrap_h = detailWrap[0].offsetHeight;
                result_h = Math.max(proGallery_h, detailWrap_h);
                proGallery.css("height", result_h - parseInt(proGallery.css('paddingTop')) - parseInt(proGallery.css('paddingBottom')));
                detailWrap.css("height", result_h - parseInt(detailWrap.css('paddingTop')) - parseInt(detailWrap.css('paddingBottom')));

                //悬浮购物车
                var floatPromotionCount = $("#floatProductInfoBox .promotion .count");
                var floatSpe = specifi("floatCatalogs", {
                    spedata: res,
                    oversaleBox: '.sellOut',
                    specBox: '.sellIn',
                    stock: '.spestock',
                    price: '.price .des .count',
                    promotionPrice: '.promotion .des .count',
                    limitNum: '.spelimit',
                    countdownnumber: 0,
                    Flight: '.speflight',
                    parent: '#FloatTab',
                    canBuyBtn: '.sellIn',
                    cantBuyBtn: '',
                    activitypromotiontype: 0,
                    activitypromotion: 0,
                    complete: function (m) {
                        //非活动
                        if (!window.options.isActivity) {
                            floatPromotionCount.html(GetActivityPrice(window.options.promotionType, m.Price, window.options.promotion));
                        } else {
                            floatPromotionCount.html(m.PromotionPrice);
                            if (parseFloat(m.PromotionPrice) < parseFloat(window.options.marketPrice)) computeDiscount(m.PromotionPrice);
                        }
                        $('dl.promotion').show();
                        $(this.parent).find('.countBox dd.tip').hide();
                    }
                });

                datasort = bubbleSort(res.Data, sort, "Price");
                promotionsort = bubbleSort(res.Data, sort, "PromotionPrice");
                if (datasort.length > 0 && datasort[0].Price == datasort[datasort.length - 1].Price) {
                    floatPromotionCount.html(datasort[0].Price);
                    if (!window.options.isActivity) {
                        floatPromotionCount.html(GetActivityPrice(window.options.promotionType, datasort[0].Price, window.options.promotion));
                    }
                } else if (datasort.length > 1) {
                    floatPromotionCount.html(datasort[0].Price + "~" + datasort[datasort.length - 1].Price);
                    if (!window.options.isActivity) {
                        var activityStartPrice = GetActivityPrice(window.options.promotionType, datasort[0].Price, window.options.promotion);
                        var activityTopPrice = GetActivityPrice(window.options.promotionType, datasort[datasort.length - 1].Price, window.options.promotion);
                        if (activityStartPrice == activityTopPrice) {
                            floatPromotionCount.html(activityStartPrice);
                        } else {
                            floatPromotionCount.html(activityStartPrice + "~" + activityTopPrice);
                        }
                    }
                }
                if (window.options.isActivity) {
                    if (promotionsort.length > 0 && promotionsort[0].PromotionPrice == promotionsort[promotionsort.length - 1].PromotionPrice) {
                        floatPromotionCount.html(promotionsort[0].PromotionPrice);
                    } else if (promotionsort.length > 1) {
                        floatPromotionCount.html(promotionsort[0].PromotionPrice + "~" + promotionsort[promotionsort.length - 1].PromotionPrice);
                    }
                }

                var tempLimitNum = $('.spelimit').val(),
                    floatInput = $("#txtNum-cart");
                if (!isNaN(tempLimitNum) && tempLimitNum < 0) {
                    $('.spelimit').val('0');
                };

                floatInput.bind('blur', function (e) {
                    checkBuyNum(floatSpe, $(this));
                });
                $('#floatProductInfoBox .enter').bind('click', function (e) {
                    bntReturn(floatSpe, floatInput);
                    //$('#floatProductInfoBox').hide();
                    return !1;
                })

                $('#floatProductInfoBox .cancel').bind('click', function (e) {
                    $('#floatProductInfoBox').hide();
                    return !1;
                })
            }
        });
    });
    //轮播相册
    $(function () {
        //配送方式气泡
        bubble($('.distribution .des .help'), $('.distribution .des .bubble'));
        //关税气泡
        bubble($('.tariff .des .help'), $('.tariff .des .bubble'));
        //运费气泡
        bubble($('#parea').find('a.fareDetail'), $('#parea').find('.bubble'));
    })
    //countdown
    $(function () {
        try {

            var activityStartTime = $('#activityStartTime').val();
            if (activityStartTime) {
                $.get('/Area/Product/SellerProducts/GetActivityLastSeconds?activityStartTime=' + encodeURIComponent(activityStartTime) + '&random=' + parseInt(Math.random() * 10e6), function (data) {
                    if (data) {
                        data = parseInt(data);
                        CountDown('activityCountDown', {
                            prevText: '',
                            date: data,
                            afterText: "后开始"
                        });
                    }

                })
            }

        } catch (e) {}
    })

    //输入
    $(function () {
        $("#txtNum, #txtNum-cart").bind({
            keyup: function () {
                var reg = /[^\d]|^0*/g;
                $(this).val($(this).val().replace(reg, ""));
                $(this).val() == "" || $(this).val(parseInt($(this).val()));
                return false;
            },
            focus: function (e) {
                this.select();
                e.stopPropagation();
                e.preventDefault();
            },
            mouseup: function (e) {
                this.select();
                e.stopPropagation();
                e.preventDefault();
            }
        })
        $("#buyInfo .action span").live('click', function (e) {
            addDelHander(this);
        });
        $("#floatProductInfoBox .action span").live('click', function (e) {
            addDelHander(this, $('#txtNum-cart'));
        });
    })


    //二维码
    $(function () {
        var el = $("#proGallery .mobileDown");
        el.bind('mouseover', function () {
            el.children('.qrBox').show();
        }).bind('mouseout', function () {
            el.children('.qrBox').hide();
        })
    })

    //卖完 || 下架
    $(function () {
        var opt = window.options || {};
        opt.sellOutUrl && $.ajax({
            url: opt.sellOutUrl,
            // url:"http://t.ymatou.com/rec?bcount=1&bsize=3",
            dataType: "json",
            success: function (res) {
                // if(res.Blocks == null){
                //     return;
                // }
                var html = [],
                    i,
                    res = res || [],
                    o;
                html.push('<ul class="clearfix">');
                for (i = 0; i < res.length; i++) {
                    o = res[i];
                    html.push('<li><a href="/product/' + o.ProductId + '.html?search=prd_detail" target="_blank"><span class="imgWrap">');
                    html.push('<img src="' + o.PicUrl + '" width="120" height="120"></span>');
                    html.push('<span class="name"><span class="text">' + o.Name + '</span></span>');
                    html.push('<span class="price">￥<span class="count">' + o.CatalogPriceForShow + '</span></span></a></li>');
                }
                html.push('</ul>');
                $("#proDetail .sellOut").append(html.join(''));
                $("#proDetail .sellOut .text").ellipsis({
                    row: 2
                });
            }
        })
    });

    //商品详情
    $(function () {
        var opt = window.options || {};
        $.ajax({
            url: "/Area/Product/SellerProducts/ProductDescription?productid=" + opt.productId + "&sellerId=" + opt.sellerId + "&isSailProtected=" + opt.isSailProtected + "&CatalogStatus=" + opt.CatalogStatus,
            success: function (res) {
                res = res.replace("\n", "").replace("script", "scr'+'ipt").replace(/alt[^\s]*/ig, '');
                var filterhtml = Ymt.util.Html({
                    html: res
                });
                filterhtml.closeTags();
                filterhtml.filter('link', 'script', 'key');
                $('#proShow').html(filterhtml.innerHTML());
                imglazyload("#ProductDetailDec");
            }
        });
    })

    //底部推荐
    $(function () {
        //same 同类产品推荐
        var opt = window.options || {};
        $.ajax({
            url: opt.guess,
            //url:"http://t.ymatou.com/rec?bcount=1&bsize=6",
            dataType: "jsonp",
            success: function (res) {
                if(res.Blocks == null){
                    return;
                }
                var html = [],
                    i,
                    res = res.Blocks[0].Products || [],
                    o;
                html.push('<dl class="clearfix">');
                for (i = 0; i < res.length; i++) {
                    o = res[i];
                    html.push('<dd class="proItem ' + (i == res.length - 1 ? "last" : "") + '"><a href="/product/' + o.PID + '.html?guess=prd_detail"  target="_blank"><span class="imgWrap">');
                    html.push('<img src="' + o.Pic + '" width="120" height="120"></span>');
                    html.push('<span class="name"><span class="text">' + o.Name + '</span></span>');
                    html.push('<span class="price">￥<span class="count">' + o.Price + '</span></span></a></dd>');
                }
                html.push('</dl>');
                $("#buyToo .sameShow").append(html.join(''));

                var isEllipsis = false;
                productRecommend.on('switch', function (obj) {
                    if (obj.currentIndex) {
                        isEllipsis = true;
                        $("#buyToo .sameShow .text").ellipsis({
                            row: 2
                        });
                    }
                })
            }
        });
        //buyToo 购买此商品的用户还购买了
        $.ajax({
            url: opt.buyToo,
            //url:'http://t.ymatou.com/rec?bcount=1&bsize=6',
            dataType: "jsonp",
            success: function (res) {
                if(res.Blocks == null){
                    return;
                }
                var html = [],
                    i,
                    res = res.Blocks[0].Products || [],
                    o;
                html.push('<dl class="clearfix">');
                for (i = 0; i < res.length; i++) {
                    o = res[i];
                    html.push('<dd class="proItem ' + (i == res.length - 1 ? "last" : "") + '"><a href="/product/' + o.PID + '.html?recmd=prd_detail"  target="_blank"><span class="imgWrap">');
                    html.push('<img src="' + o.Pic + '" width="120" height="120"></span>');
                    html.push('<span class="name"><span class="text">' + o.Name + '</span></span>');
                    html.push('<span class="price">￥<span class="count">' + o.Price + '</span></span></a></dd>');
                }
                html.push('</dl>');
                $("#buyToo .buyTooShow").append(html.join(''));

                //dot dot dot 内容超出显示...
                $("#buyToo .buyTooShow .text").ellipsis({
                    row: 2
                });
            }
        })
    });

    //store 同店铺推荐
    $(function () {
        $("#proInfo .recommands .text").ellipsis({
            row:2
        })
    });

    //viewed 最近浏览
    $(function () {
        var opt = window.options || {};
        var viewed = opt.viewed;
        var ad_history = $("#prd_detail_viewed").val();
        $.ajax({
            url: viewed,
            dataType: "json",
            success:function(res){
                var str = '',
                    html = [],
                    i,
                    j,
                    data = res || [],
                    o;
                for (i = 0; i < data.length; i++) {
                    o = data[i]
                    html.push('<dd><a href="'+ o.link +'" target="_blank"><span class="imgWrap">');
                    html.push('<img src="' + o.src + '" width="60" height="60"></span>');
                    //html.push('<span class="name"><span class="text">' + o.name + '</span></span>');
                    html.push('<span class="price">￥<strong>' + o.price + '</strong></span></a></dd>');
                    str += html.join('');
                    html = [];
                }
                $("#proInfo .recentlys dl").append(str);
            }
        })
    });

    //商品收藏
    $(function () {
        var collectTemps = LayerBox('Temps', {
            zIndex: 999,
            isFrame: false,
            isloc: true,
            Temps: '<div class="layerTemps collectTemps" id="collectAlert" style="display:block;position:relative"><div class="alert_box_inner"><p class="tip">提示</p><div class="contentBox"><div class="desWrap"><span class="icon-font icon {icon}">{font}</span><p class="des {lineheight}">{text}</p><p class="enterCollect {show}"><a href="/UserCollect/ProductCollect" target="_blank">访问我的收藏&gt;&gt;</a></p><p class="toLogin {loginShow}"><span class="shadow"><a class="btn" href="/login?ret=' + encodeURIComponent(window.location.href) + '" >去登录</a></span></p><p class="toClose {okShow}"><span class="shadow"><a class="btn" href="javascript:;" >确定</a></span></p></div></div></div><span class="icon-font close">&#xf0004;</span></div>',
            callback: function () {}
        });

        var collectTemps2 = LayerBox('Temps', {
            zIndex: 999,
            isFrame: false,
            Temps: '<div class="layerTemps collectTemps" id="collectAlert" style="display:block;position:relative"><div class="alert_box_inner"><p class="tip">提示</p><div class="contentBox"><div class="desWrap"><span class="icon-font icon {icon}">{font}</span><p class="des {lineheight}">{text}</p><p class="enterCollect {show}"><a href="/UserCollect/ProductCollect" target="_blank">访问我的收藏&gt;&gt;</a></p><p class="toLogin {loginShow}"><span class="shadow"><a class="btn" href="/login?ret=' + encodeURIComponent(window.location.href) + '" >去登录</a></span></p><p class="toClose {okShow}"><span class="shadow"><a class="btn" href="javascript:;" >确定</a></span></p></div></div></div><span class="icon-font close">&#xf0004;</span></div>',
            callback: function () {}
        });

        $("#proGallery .collect, #proGallery .uncollect").bind('click', function (e) {
            var opt = window.options || {};
            var o = $(this),
                userId = opt.userId,
                productId = opt.productId;
            if (userId == 0) {
                collectTemps.alert({
                    'icon': 'orange',
                    'text': '先登录才能收藏哦！',
                    'font': '&#xe600;',
                    'show': 'hide',
                    'lineheight': 'singleLingHeight',
                    'okShow': 'hide',
                    'loginShow': 'show'
                });
                cookie.set('needSendCollectProduct', 'true');
                return;
            }
            if (window.options.isBuyer == "false") {
                collectTemps.alert({
                    'icon': 'orange',
                    'font': '&#xe600;',
                    'text': '您不是买家，不能收藏商品',
                    'show': 'hide',
                    'lineheight': 'singleLingHeight',
                    'okShow': 'show',
                    'loginShow': 'hide'
                });
                $('#collectAlert .toClose').bind('click', function (e) {
                    $('#collectAlert .close').trigger('click');
                })
                return;
            }
            $.ajax({
                type: "POST",
                url: window.options.collectProduct,
                //dataType: "json",
                contentType: 'application/x-www-form-urlencoded',
                data: {
                    userId: userId,
                    productId: productId
                },
                async: true,
                success: function (data) {
                    if (data.success) {
                        collectTemps.alert({
                            'icon': 'green',
                            'font': '&#x34ae;',
                            'text': '成功收藏此商品',
                            'show': 'show',
                            'lineheight': '',
                            'okShow': 'hide',
                            'loginShow': 'hide'
                        });
                        $("#proGallery .collect").addClass('uncollect').removeClass('collect').text("已收藏商品");
                    } else {
                        collectTemps2.alert({
                            'icon': 'orange',
                            'text': data.msg,
                            'font': '&#xe600;',
                            'show': 'show',
                            'lineheight': '',
                            'okShow': 'hide',
                            'loginShow': 'hide'
                        });
                    }
                },
                error: function () {
                    collectTemps.alert({
                        'icon': 'orange',
                        'font': '&#xe600;',
                        'text': '成功收藏此商品',
                        'show': 'hide',
                        'lineheight': '',
                        'okShow': 'hide',
                        'loginShow': 'hide'
                    });
                }
            });
            try {
                ymt_bi.re_img({
                    pguid: window.options.productId,
                    bh: '40001'
                });
            } catch (e) {}
        });
        if (cookie.get('needSendCollectProduct') == "true" && window.options.userId != 0) {
            cookie.del('needSendCollectProduct');
            $("#proGallery .collect, #proGallery .uncollect").trigger('click');
        }
    });
    //店铺收藏
    $(function () {
        var collectTemps = LayerBox('Temps', {
            zIndex: 999,
            isFrame: false,
            Temps: '<div class="layerTemps collectTemps" id="collectAlert" style="display:block;position:relative"><div class="alert_box_inner"><p class="tip">提示</p><div class="contentBox"><div class="desWrap"><span class="icon-font icon {icon}">{font}</span><p class="des {lineheight}">{text}</p><p class="enterCollect {show}"><a href="/UserCollect/ShopCollect" target="_blank">访问我的收藏&gt;&gt;</a></p><p class="toLogin {loginShow}"><span class="shadow"><a class="btn" href="/login?ret=' + encodeURIComponent(window.location.href) + '" >去登录</a></span></p><p class="toClose {okShow}"><span class="shadow"><a class="btn" href="javascript:;" >确定</a></span></p></div></div></div><span class="icon-font close">&#xf0004;</span></div>',
            callback: function () {}
        });

        var collectTemps2 = LayerBox('Temps', {
            zIndex: 999,
            isFrame: false,
            Temps: '<div class="layerTemps collectTemps" id="collectAlert" style="display:block;position:relative"><div class="alert_box_inner"><p class="tip">提示</p><div class="contentBox"><div class="desWrap"><span class="icon-font icon {icon}">{font}</span><p class="des {lineheight}">{text}</p><p class="enterCollect {show}"><a href="/UserCollect/ShopCollect" target="_blank">访问我的收藏&gt;&gt;</a></p><p class="toLogin {loginShow}"><span class="shadow"><a class="btn" href="/login?ret=' + encodeURIComponent(window.location.href) + '" >去登录</a></span></p><p class="toClose {okShow}"><span class="shadow"><a class="btn" href="javascript:;" >确定</a></span></p></div></div></div><span class="icon-font close">&#xf0004;</span></div>',
            callback: function () {}
        });
        $('.collectStore').bind("click", function () {
            var opt = window.options || {};
            var o = $(this),
                userId = opt.userId,
                sellerId = opt.sellerId;
            if (userId == 0) {
                collectTemps.alert({
                    'icon': 'orange',
                    'text': '先登录才能收藏哦！',
                    'font': '&#xe600;',
                    'show': 'hide',
                    'lineheight': 'singleLingHeight',
                    'okShow': 'hide',
                    'loginShow': 'show'
                });
                cookie.set('needSendCollectShop', 'true');
                return;
            }
            if (window.options.isBuyer == "false") {
                collectTemps.alert({
                    'icon': 'orange',
                    'font': '&#xe600;',
                    'text': '您不是买家，不能收藏店铺',
                    'show': 'hide',
                    'lineheight': 'singleLingHeight',
                    'okShow': 'show',
                    'loginShow': 'hide'
                });
                $('#collectAlert .toClose').bind('click', function (e) {
                    $('#collectAlert .close').trigger('click');
                })
                return;
            }
            $.ajax({
                type: "post",
                url: window.options.collectshop,
                dataType: "json",
                contentType: 'application/x-www-form-urlencoded',
                data: "userId=" + userId + "&sellerId=" + sellerId,
                async: true,
                success: function (data) {
                    if (data.success) {
                        collectTemps.alert({
                            'icon': 'green',
                            'font': '&#x34ae;',
                            'text': '成功收藏此店铺',
                            'show': 'show',
                            'lineheight': '',
                            'okShow': 'hide',
                            'loginShow': 'hide'
                        });
                    } else {
                        collectTemps2.alert({
                            'icon': 'orange',
                            'font': '&#xe600;',
                            'text': data.msg,
                            'show': 'show',
                            'lineheight': '',
                            'okShow': 'hide',
                            'loginShow': 'hide'
                        });
                    }
                },
                error: function () {
                    collectTemps.alert({
                        'icon': 'orange',
                        'font': '&#xe600;',
                        'text': '成功收藏此店铺',
                        'show': 'hide',
                        'lineheight': '',
                        'okShow': 'hide',
                        'loginShow': 'hide'
                    });
                }
            });
            return false;
        });
        if (cookie.get('needSendCollectShop') == "true" && window.options.userId != 0) {
            cookie.del('needSendCollectShop');
            $('.collectStore').trigger('click');
        }
    });

    //第一次运费
    // $(function () {
    //     var isUnfare = $('#parea .des').html().indexOf("卖家承担运费") > -1,
    //         fareBox = $("#proDetail .proName .transportation_cost");
    //     if (isUnfare) {            
    //         txt = (fareBox.html() + "[包邮]").replace(/\]\[/, ' ');
    //         fareBox.html(txt);
    //     }        
    // });
    //运费
    $(function () {
        $(document).bind('click', function (e) {
            var target = e.target;
            if ($(target).hasClass('curAddress') || $(target).parent().hasClass('curAddress')) {
                $('#parea .chinaArea').show();
                $('#parea dl.fare').addClass('hightZindex1');
            }
            if ($(target).hasClass('shutAreaHandle')) {
                $('#parea .chinaArea').hide();
                $('#parea dl.fare').removeClass('hightZindex1');
            }
            if ($(target).is('a') && $(target).attr('areacode')) {
                $.ajax({
                    url: window.options.fareUrl + '?productId=' + window.options.productId + '&areaCode=' + $(target).attr('areacode'),
                    success: function (res) {
                        var hoverNode, contNode;
                        $('#parea').empty().append(filterFare(res));
                        $('#parea dl.fare').removeClass('hightZindex1');
                        hoverNode = $('#parea').find('a.fareDetail');
                        contNode = $('#parea').find('.bubble');
                        bubble(hoverNode, contNode);
                    }
                });
            }
        });
    })

    //商品详情规格展现
    $(function () {
        var box = $('#ProductDesc .property'),
            i, tags = box.find('li.node'),
            _tag;
        for (i = 0; i < tags.length; i++) {
            _tag = tags.eq(i);
            if (i % 3 > 0) _tag.addClass('borderLeft');
        }
    });

    //查看大图
    $(function () {
        $("a.zoom").fancybox({
            'overlayOpacity': 0.7,
            'overlayColor': '#2B2A25',
            'zoomSpeedIn': 600,
            'zoomSpeedOut': 400
        });
    });

    //店铺评价点击
    $(function () {
        var opt = window.options || {},
            untils = window.untils || {},
            el = $("#shopEvalPagination");

        el.live('click', function (e) {
            if ($(e.target).is("a") && !$(e.target).hasClass("select") && $(e.target).attr("number")) {
                var index = $(e.target).attr("number");
                //var pageUi = pagination({ "index": index, "prev": 2, "next": 5, "count": el.attr("totalpage") });
                //el.empty().append(pageUi);
                $.ajax({
                    type: "get",
                    async: true,
                    url: "/Area/Product/SellerProducts/ShopEvaluation?&sellerId=" + opt.sellerId + "&p=" + index,
                    dataType: "html",
                    success: function (data) {
                        $('#CreditsPanel').html(data);
                        $('#FloatTab .eval').trigger('click');
                        $('#ShopCredits').addClass('show');
                        $('#ProductDesc').removeClass('show');
                    },
                    error: function () {}
                })
            }
        })
    })
    //商品评价点击
    $(function () {
        var opt = window.options || {},
            untils = window.untils || {},
            el = $("#proEvalPagination");
        el.live('click', function (e) {
            if ($(e.target).is("a") && !$(e.target).hasClass("select") && $(e.target).attr("number")) {

                var index = $(e.target).attr("number");
                //var pageUi = pagination({ "index": index, "prev": 2, "next": 5, "count": el.attr("totalpage") });
                var getUrl = "/Area/Product/SellerProducts/ProductEvaluation?productid=" + opt.productId + "&sellerId=" + opt.sellerId + "&p=" + index;
                //alert(getUrl);
                //el.empty().append(pageUi);                
                $.ajax({
                    type: "get",
                    async: true,
                    url: "/Area/Product/SellerProducts/ProductEvaluation?productid=" + opt.productId + "&sellerId=" + opt.sellerId + "&p=" + index,
                    //url: "/Area/Product/SellerProducts/ProductEvaluation?productid=ACF46E2C-6F02-41DB-A7ED-49983EAE57B3&sellerId=95&p=3",
                    dataType: "html",
                    success: function (data) {
                        $('#CreditsPanel').html(data);
                        $('#FloatTab .eval').trigger('click');
                        $('#ProductCredits').addClass('show');
                        $('#ProductDesc').removeClass('show');
                    },
                    error: function () {}
                })
            }
        })
    });


    function clearFloatCarStatus() {
        var container = $('.floatshoppingcart');
        container.find("a.hover").trigger('click');
        $('#txtNum-cart').removeClass('errorBorder').val(1);
        container.find("dd.tip").remove();
    }

    var isLtIE = function (ver) {
            return $.browser.msie && parseInt($.browser.version, 10) < ver;
        }
        //滚动事件
    $(function () {
        var detail = $("#ProductDetailModule"),
            eval = $("#CreditsPanel"),
            buyToo = $('#buyToo'),
            detailEnterCar = detail.find(".enterCar"),
            detailBar = detail.find('.switchBox'),
            detailTrigger = detailBar.find('.detail'),
            evalTrigger = detailBar.find('.eval'),
            floatCar = $('#floatProductInfoBox'),
            scrollTop,
            clientHeight = $(window).height();
        isInSell = window.options.isInSale;
        if (isInSell === "false") {
            detailEnterCar.remove();
        }

        $(window).scroll(function (e) {
            detailOffsetTop = detail.offset().top;
            evalOffsetTop = eval.offset().top;
            buyTooOffsetTop = buyToo.offset().top;
            scrollTop = $(window).scrollTop();
            left = detail.offset().left;
            floatCar.hide();

            //商品评价
            if ((scrollTop + clientHeight) >= evalOffsetTop && !$.trim(eval.html())) {
                var opt = window.options || {};
                $.ajax({
                    url: "/Area/Product/SellerProducts/ProductEvaluation?productid=" + opt.productId + "&sellerId=" + opt.sellerId + "&p=1",
                    success: function (res) {
                        eval.html(res);
                    }
                });
            }

            if (scrollTop >= (detailOffsetTop - 14) && scrollTop < (buyTooOffsetTop - 61)) {
                detailEnterCar.show();
                if (isLtIE(8)) {
                    detailBar.parents('.productdetailinfo').css({
                        "position": "static"
                    });
                    detailBar.css({
                        "top": scrollTop,
                        "left": left
                    });
                } else {
                    detailBar.css({
                        "position": "fixed"
                    });
                }
                if (scrollTop < (evalOffsetTop - 61)) {
                    detailTrigger.addClass('select');
                    evalTrigger.removeClass('select');
                } else {
                    detailTrigger.removeClass('select');
                    evalTrigger.addClass('select');
                }
            } else {
                detailEnterCar.hide();
                detailBar.css({
                    "position": "absolute"
                });
                if (isLtIE(8)) {
                    detailBar.parents('.productdetailinfo').css({
                        "position": "relative"
                    });
                    detailBar.css({
                        "position": "absolute",
                        "left": 0,
                        "top": 0
                    });
                }
                detailTrigger.addClass('select');
                evalTrigger.removeClass('select');
            }
        });
        $(window).trigger("scroll");
    });
    ///商品详情 商品评价
    $(function (e) {
        $('#FloatTab .detail').live('click', function (e) {
            var detailTop = $('#proShow').offset().top;
            window.scrollTo(0, detailTop - 61);
        });
        $('#FloatTab .eval').live('click', function (e) {
            var evalTop = $('#CreditsPanel').offset().top;
            window.scrollTo(0, evalTop - 61);
        });
    })

    //悬浮购物车
    $(function () {
        $('.productdetailinfo .enterCar').bind('click', function (e) {
            var floatCar = $('#floatProductInfoBox');
            clearFloatCarStatus();
            $(this).parents('.switchBox').append(floatCar.show());
        })
    });
    //展开按钮
    $(function () {
        var open = $('#FloatTrigger'),
            target = $('#proBusiness'),
            _this;
        open.bind('click', function (e) {
            _this = this;
            $(_this).hide();
            target.addClass('proBusinessShow');
            target.children('.businessWrap').before("<div class='floatOffBtn'></div>");
            target.children('.floatOffBtn').bind('click', function (e) {
                $(_this).show();
                target.removeClass('proBusinessShow');
                $(this).remove();
            })
        })
    })

    //resize事件
    $(function () {
        $(window).resize(function () {
            var parent = $('.productdetailinfo'),
                switchBox = parent.find('.switchBox');
            if (isLtIE(8) && parent.css('position') === 'static') {
                switchBox.css({
                    'left': parent.offset().left
                });
            }
        })
    })
    $(function () {
        //初始化调整规格区域高度
        var proGallery = $('#proGallery'),
            detailWrap = $('.detailWrap'),
            proGallery_h = proGallery[0].offsetHeight;
        detailWrap.css("height", proGallery_h - parseInt(detailWrap.css('paddingTop')) - parseInt(detailWrap.css('paddingBottom')));
    })
});