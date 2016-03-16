/*
* 整点抢0@
*
*/
define(function (require, exports, module) {
    var countDown = require("common/countDown");
    $.ajax({
        url: 'http://op.ymatou.com/getDate?callback=?',
        dataType: "jsonp",
        success: function (data) {
            //初始化倒计时
            $("[data-countDown]").each(function () {
                var self = $(this),
                    currTime = data.dateTime,
                    targetHour = self.attr("data-target-Hour");
                var currDate = new Date();
                var targetTime = new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate(), parseInt(targetHour)+2/*整点档结束时间两个小时*/, 0, 0).getTime();
                countDown({
                    currTime: currTime,
                    targetTime: targetTime,
                    stepFn: function (timeObj) {
                        self.html(timeObj.hour + ":" + timeObj.minute + ":" + timeObj.second)
                    },
                    doneFn: function (timeObj) {
                        window.location.reload(true)
                    }
                })
            })
        }
    })
    
    var toobar=require("component/floattoolbar");

    toobar({
        type:0
    });
    
    var promo = require("common/promo");
    $("#J-promo").each(function () {
        promo($(this))
    })
})