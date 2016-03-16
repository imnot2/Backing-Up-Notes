Ymt.add(function (require, exports, module) {
    var JSON = require('ui/json');
    try {
        if (IsVoteShow) {
            var currTime = new Date().getTime(),
                startTime = 1413820800000, //1413993600000,
                endTime = 1414771200000;
            if (isSeller === "0" && endTime > currTime && currTime > startTime && (IsVoteShow >= 754260)) {
                var $flCoupon = $("<a class='fl-coupon' id='fl-coupon' href='https://zh.surveymonkey.com/s/3CK6QPT' target='_blank'><img src='data:image/png;base64,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'/></a>").appendTo("body")

                $flCoupon.css("left", $("#HomePageContent").offset().left - 96)

                function show() {
                    var body = document.documentElement || document.body,
                        scrollTop = body.scrollTop || document.body.scrollTop;
                    if (scrollTop > 500) {
                        $flCoupon.css({
                            "position": "fixed",
                            "top": "100px"
                        })
                    } else {
                        $flCoupon.css({
                            "position": "absolute",
                            "top": "488px"
                        })
                    }
                }
                $(window).scroll(show);
                show()
            }

        }
    } catch (e) {}

    //海外团
    var Tabs = require('widget/tabs');

    var tuangouTab = Tabs('#TuangouTab', {
        panels: '.tuangou-item',
        triggers: '.home-mod1-tab .item',
        activeTriggerCls: 'current',
        triggerType: 'mouse'
    });
    var isEllipsis = false;
    require("util/ellipsis");
    tuangouTab.on('switch', function (obj) {
        if (obj.currentIndex) {
            isEllipsis = true;
            $(".shopaddress .addressText").ellipsis({
                row: 2
            });
        }
    })

    // //文本省略
    // $(".j-ellipsis").ellipsis({
    //     row: 2
    // });
    // //文本省略
    // $(".j-ellipsis-3").ellipsis({
    //     row: 3
    // });
    //倒计时


    var CountDown = require('widget/countdown');

    function CountDownCallback() {
        if (this) {
            $(this).html("已结束")
        }
    }

    //海外团
    try {
        CountDown('CountDownField0', {
            date: CountDownField0
        });
    } catch (ex) {}



    //banner
    var Slide = require('widget/slide');

    Slide('#FocusImages', {
        panels: '.images .item',
        triggers: '.focus .item',
        effect: 'fade',
        hasDirection: !0,
        directionTriggers: ['.prevarrow', '.nextarrow'],
        interval: 3,
        triggerType: 'mouse'
    });


    Slide('#ShoppingFocus', {
        panels: '.imagesbox .item',
        triggers: '.focus .item',
        triggerType: 'mouse',
        interval: 3,
        triggerEvent: true
    });


    Slide('#SharingInfo', {
        panels: '.images .item',
        triggers: '.focus .item',
        triggerType: 'mouse',
        interval: 3,
        triggerEvent: true
    });

    Slide('#hwBanner', {
        panels: '.imagesbox .item',
        triggers: '.focus .item',
        triggerType: 'mouse',
        interval: 3,
        triggerEvent: true
    });

    require("util/imglazyload")("#HomePageContent");

    //获取服务器时间
    function parseTime(str) {
        if(str){
            if (str.indexOf("T") > -1) {
                return parseInt((new Date(str.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\+(.*)/, "$1/$2/$3 $4")).getTime()) / 1000);
            }
            return parseInt((new Date(str.replace(/-/g, "/")).getTime()) / 1000);
        }
    }
    //海外团
    var overseaEndDate = $("#oversea_end_date").val();

    function getSeverTime() {
        var time;
        $.ajax({
            url: "Ymt215/GetServerCurrentDateTime?" + (new Date).getTime(),
            type: "GET",
            async: false,
            success: function (data) {
                time = data.CurrDateTime;
            }
        });
        return time;
    }
    var severTime = getSeverTime();
    CountDown("#oversea-date", {
        date: parseTime(overseaEndDate) - parseTime(severTime),
        timeItemCls: 'timeItem',
        prevText: '距结束',
        afterText: ''
    })

    //扫货倒计时
    $(".live-item").each(function () {
        var that = $(this),
            _index = that.index() + 1,
            activityEndTime = $("#activity_end_time_" + _index, that).val();
        CountDown("#ShCountdown" + _index, {
            date: parseTime(activityEndTime) - parseTime(severTime),
            isHasSecond: !1,
            timeItemCls: 'timeItem',
            prevText: '',
            afterText: '',
            remindTime: 60 * 30,
            remindBgColor: '#dd3333'
        })
    })

    //每日团
    var everydayLeftEndtime = $("#everyday_left_endtime").val(),
        everydayRightEndtime = $("#everyday_right_endtime").val();

    try {

        CountDown('MeirituanCountDown00', {
            timeItemCls: 'timeItem',
            prevText: '距结束',
            afterText: '',
            date: parseTime(everydayLeftEndtime) - parseTime(severTime)
        });
        CountDown('MeirituanCountDown01', {
            prevText: '距结束',
            afterText: '',
            date: parseTime(everydayRightEndtime) - parseTime(severTime),
            timeItemCls: 'timeItem'
        });

    } catch (ex) {}

    //晒单

    /*$(window).scroll(function(){
        var widTop = $(window).scrollTop(),
            clientHeight = document.documentElement.clientHeight,
            nodeHeight = $(".order-item").height();
        var scrollHeight = widTop + clientHeight - nodeHeight;  
        if(scrollHeight >= $(".order-item").offset().top){
            $.ajax({
                url:"Ymt215/OrderShowView?pageIndex=2&pageSize=2",
                type: "GET",
                async:false,
                success:function(data){
                   alert(1)
                }
            }) 
        }
    })*/

    /**
     * 模板编译
     * @param {string} html模板
     * @param {object} 绑定对象
     * @descrtion 前后缀为{{ }}
     */
    var compileTpls = function (htmlTpls, obj) {
        var prefix = "{{\\s*",
            suffix = "\\s*}}",
            _regExp;
        /* if( htmlTpls && $.inArray(htmlTpls) ){
            htmlTpls = htmlTpls.jion("");
        }*/
        for (var i in obj) {
            _regExp = new RegExp(prefix + i + suffix, 'g');
            htmlTpls = htmlTpls.replace(_regExp, obj[i]);
        }
        //去掉所有空的表达式
        htmlTpls = htmlTpls.replace(/{{}}/g, '');
        return htmlTpls;
    }

    $(".order-item").live("mouseenter", function () {
        var _this = $(this);
        _this.addClass("order-item-hover");
        var j_share = _this.find(".share-wrap");
        j_share.addClass("share-wrap-show");
        shareFun(j_share);

    }).live("mouseleave", function () {
        var _this = $(this);
        _this.removeClass("order-item-hover");
        _this.find(".share-wrap").removeClass("share-wrap-show");
    })

    function shareFun(obj) {
        $(obj).live("mouseenter", function (event) {
            var _this = $(this);
            _this.find(".share-type").fadeIn(300);
        }).live("mouseleave", function () {
            var _this = $(this);
            _this.find(".share-type").fadeOut(300)
        })

        $(obj).find(".weixin").live("click", function () {
            var _this = $(this),
                _img = $(obj).find(".weixin-img").html();

            var shareNodeHtml = '<div id="mask" style="display:none"><div class="mask-warp"><div class="mw-bd"><h3>打开微信”扫一扫“,然后点击手机屏幕右上角分享按钮</h3><p id="shareimg"><img src="" /></p></div></div></div>';
            $mask = $("#mask");
            if (!$mask[0]) {
                ($mask = $(shareNodeHtml)).appendTo('body');
            }
            var $window = $(window);
            $mask.one("click", function () {
                $(this).hide();
            }).find("#shareimg")
                .html(_img).end()
                .show().find(".mask-warp").css({
                    height: $("body").height()
                }).find(".mw-bd")
                .css({
                    top: (document.documentElement.clientHeight - $(".mw-bd").height()) / 2 + $(document).scrollTop()
                });
        });
    }


	// 如果扫货直播条目数少于等于5条， 那么把 .sh-live的div的高度置 为auto，否则为424 * 5
    var Infinitescroll = require('widget/infinitescroll');
	
    if ($("#directPlay")[0]) {
		
		if( $('.live-item').length < 6 ){
		
			$('.sh-live').css("height", "auto");
			
		}else{
			Infinitescroll('#directPlay .sh-live', {
				type: 1,
				visible: 5,
				timeOut: 30000,
				li_height: 424
			});
		}
        
    }
    var activityApi = $m.isOnline ? "http://api.evt.ymatou.com" : "http://api.activity.alpha.ymatou.com";
    var activityId = $m.isOnline ? "3616" : "1108";
    var pagePartId = $m.isOnline ? "2808" : "512";


    // var directPlayTimer = setInterval(updateDirectPlay,10000);
    var leftRange = getDay() + "10201";
    var rightRange = getDay() + "20101";

    //debug所用
    // var leftRange = getDay() + "08221";  
    // var rightRange = getDay() + "22081";
    if ($(".timeteals").length > 0) {
        GetProductsByPagePartId(activityId, pagePartId, leftRange, rightRange, ".timeteals .product-info");
    } else {
        GetProductsByPagePartId(activityId, pagePartId, leftRange, rightRange, "#timeteals");
    }


    // 以下方法可以直接放置到公用脚本中
    function GetProductsByPagePartId(activityId, pagePartId, leftRange, rightRange, containerBoxId) {
        var url = activityApi + "/ActivityTemplate/Products/aid_{activityId}/pid_{pagePartId}/t_{leftRange}|{rightRange}".replace("{activityId}", activityId)
            .replace("{pagePartId}", pagePartId).replace("{leftRange}", leftRange).replace("{rightRange}", rightRange);

        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function (data) {
                var products = data.Data.Products;
                if (products.length == 2) {
                    var sortedProducts = SortedProducts(products[0], products[1], data.Data.CurrentDateTime);

                    var leftContainerId = containerBoxId + " .left";
                    var rightContainerId = containerBoxId + " .right";
                    ChangeMoonSign(sortedProducts[0].Flag == leftRange ? rightContainerId : leftContainerId);
                    AddBeginEndDiv(rightContainerId, sortedProducts[0].Flag == leftRange ? "unStrat" : "isEnd");
                    BindProduct(leftContainerId, sortedProducts[0], data.Data.CurrentDateTime);
                    BindProduct(rightContainerId, sortedProducts[1], data.Data.CurrentDateTime);
                } else {
                    NoDataCallback();
                }
            },
            error: function () {
                NoDataCallback();
            }
        });
    }

    // 排序
    var SortedProducts = function (product1, product2, currentDate) {
        var products = [];
        var hour = new Date(currentDate.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\+(.*)/, "$1/$2/$3 $4").split('.')[0]).getHours();
        if (hour>= 20 || hour<10) {
            products.push(product2);
            products.push(product1);
        } else {
            products.push(product1);
            products.push(product2);
        }

        return products;
    };

    // 没数据时，处理
    var NoDataCallback = function () {
        $("#TuangouTab #time-teals").hide();
    };

    // 绑定单个商品
    var BindProduct = function (boxSelector, data, currentDateTime) {
        var box = $(boxSelector);
        box.find(".imgbox").attr("href", data.ProductLink);
        box.find("img").attr("src", data.PicUrl.replace("original", "list").replace("o.", "l."));
        box.find(".zhekou").html("[" + data.OffOfSale.toFixed(1) + "折]");
        box.find(".bought").hide();
        box.find(".title").html(data.Name).attr("href", !data.SoldOut ? "javascript:void(0)" : data.ProductLink);
        box.find(".price").html(data.Price4Sale);
        box.find(".del-price").html(data.MarketPrice);
        box.find(".timeout-wrap").attr("beginTime", data.BeginTime).attr("endTime", data.EndTime);

        var signClass = box.find(".sign").attr("class").replace("sign ", "");
        if (data.SoldOut) {
            box.find(".sign").removeClass(signClass).addClass(signClass.replace("light", "gray"));
            if (box.find("img").next("div.sold-out").length == 0) {
                box.find("img").next("div").remove();
                box.find(".imgbox").removeAttr("href");
                $("<div class='sold-out'><div class='cover-inner'><p>已售罄</p></div></div>").insertAfter(box.find("img"));
            }
        }

        var countDownSeletor = box.find(".timeout-wrap");
        if (!data.SoldOut) {
            //倒计时
            var begintime = countDownSeletor.attr("begintime"),
                endtime = countDownSeletor.attr("endtime");
            var status = parseTime(begintime) - parseTime(severTime) > 0;

            CountDown(countDownSeletor.attr("id"), {
                prevText: status ? '距开始' : '距结束',
                afterText: '',
                date: parseTime(status ? begintime : endtime) - parseTime(severTime),
                timeItemCls: 'timeItem'
            });
        } else {
            countDownSeletor.html("已结束").css("font-size", "14px");
        }
    };

    // 更改晚上图标
    var ChangeMoonSign = function (boxSelector) {
        var box = $(boxSelector);
        box.find(".sign").removeClass("sign-sun-light").addClass("sign-moon-light");
        box.find(".sign").find("p").eq(0).html("晚8点");
    };

    // 添加第二帧（尚未开始、已结束）
    var AddBeginEndDiv = function (boxSelector, c) {
        var box = $(boxSelector);
        $("<div class='" + c + "'>" + (c == "unStrat" ? "<div class='cover-inner'><p>未开始</p></div>" : "<div class='cover-inner'><p>已结束</p></div>") + "</div>").insertAfter(box.find("img"));
    };

    // 获取当前时间
    function getDay() {
        var now = new Date(getSeverTime().replace(/-/g, "/"));
        if(now.getHours()<10){
            now.setDate(now.getDate()-1);   
        }
        return pad(now.getFullYear(), 2) + pad(now.getMonth() + 1, 2) + pad(now.getDate(), 2);
    };

    // 自动补0，num为需要补0的参数，n为几位
    function pad(num, n) {
        var len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    };
    //头部hover
    var $headLogoWrap = $(".hw-hd");
    if ($headLogoWrap.length > 0) {
        $(".logo", $headLogoWrap).live("mouseenter", function () {
            $(this).addClass("logo-hover");
        }).live("mouseleave", function () {
            $(this).removeClass("logo-hover");
        })
    }

})
