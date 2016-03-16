Ymt.add(function (require, exports, module) {

    require("util/imglazyload")(".grayBackgroundColor");
    // require("util/imglazyload")("#HomePageContent");

    var ImgClock = require('widget/imgclock');

    var Tabs = require('widget/tabs');

    var countdown = require('widget/countdown');
    // 扫货直播倒计时
    void function(){
        var len = $(".timeout-inner").length;
        for(var i = 0; i < len; i ++ ){
            var oTimerInner = $(".timeout-inner")[i];
            countdown(oTimerInner.id, {
                date: $(oTimerInner).attr("data-seconds") - 0,
                isHasSecond: !1,
                timeItemCls: 'timeItem',
                prevText: '',
                afterText: '',
                remindTime: 60 * 30,
                remindBgColor: '#dd3333'
            });
        }
    }();

    Tabs('#ClockZone', {
        panels: '.moment',
        triggers: '.site-item',
        activeTriggerCls: 'site-active',
        triggerType: 'mouse'
    });

    var Slide = require('widget/slide');

    Slide('#FocusStarImages', {
        panels: '.seller-list-item',
        triggers: '.seller-pager .item',
        interval: 3,
        activeTriggerCls: 'active',
        triggerType: 'mouse'
    })

    Slide('#FocusImages', {
        panels: '.images .item',
        triggers: '.focus .item',
        interval: 3,
        hasDirection: !0,
        directionTriggers: ['.prevarrow', '.nextarrow'],
        effect: 'fade',
        triggerType: 'mouse'
    });

    // sai单
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
    //

    $.ajax({
        url: 'http://op.ymatou.com/getDate?callback=?',
        dataType: "jsonp",
        success: function (data) {
            //时区处理回调函数
            var callBack = function (date) {
                var houer = date.getHours(),
                    workStatus = $("#workStatus");
                if (houer > 18 || houer < 6) {
                    workStatus.removeClass("work").addClass('sleep').find(".depict").html("现在是晚上时间，卖家辛苦一天，准备休息了");
                } else {
                    workStatus.removeClass("sleep").addClass('work').find(".depict").html("现在是白天时间，卖家已经开始干活啦");
                }
            }
            var curTime = data.dateTime;

            var imgsrc = $('#ClockImg').val();

            if (PavilionType == 'american') {

                ImgClock('#NewYork', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58, // 168
                    timezone: -5,
                    callBack: callBack
                });
                ImgClock('#Chicago', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58,
                    timezone: -6,
                    callBack: callBack
                });
                ImgClock('#LosAngeles', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58,
                    timezone: -8,
                    callBack: callBack
                });
            }

            if (PavilionType == 'europe') {
                ImgClock('#Paris', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58,
                    timezone: 1,
                    callBack: callBack
                });
                ImgClock('#Frankfurt', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58,
                    timezone: 1,
                    callBack: callBack
                });
                ImgClock('#London', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58,
                    timezone: 0,
                    callBack: callBack
                });
            }

            if (PavilionType == 'anz') {
                ImgClock('#Sydney', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58,
                    timezone: 10,
                    callBack: callBack
                });
                ImgClock('#Wellington', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58,
                    timezone: 12,
                    callBack: callBack
                });
            }
            if(PavilionType == 'asian'){
                ImgClock('#Tokyo', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58,
                    timezone: 9,
                    callBack: callBack
                });
                ImgClock('#Seoul', {
                    sprite: imgsrc,
                    time: curTime,
                    spacing: 58,
                    timezone: 9,
                    callBack: callBack
                });
            }
        }
    })
})