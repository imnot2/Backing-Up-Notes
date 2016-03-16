var globalUpdate, globalURL, currentUrl;
function calculatePrice() {
    var promotionType = $("input[name=PromotionType]:checked").val();
    
    var hasWarn = false;
    $("td.discount_price").each(function (index, value) {
        var promotionKey = $(value).attr("promotionkey");
        var promotion = $("input.promotion" + "[promotionKey=" + promotionKey + "]:not(:disabled)").val();
        var promotionValue = parseFloat(promotion);

        var oValue = parseFloat($(this).attr("odata"));
        var discountValue = -1;
        if (promotionType == "1") {
            discountValue = Math.floor(oValue * promotionValue / 100)
        }
        else if (promotionType == "2") {
                    
            discountValue = Math.floor(oValue - promotionValue);
        }
        else if (promotionType == "3") {
            discountValue = Math.floor(promotionValue);
        }

        if (!hasWarn && discountValue <= 0) {
            alert("商品价格折扣后不能小于0!");
            hasWarn = true;
        }

        $(this).text(discountValue);
    });
}

$("input[name=PromotionType]").live("change", function () {

    $("span.PromotionType").css("display", "none");
    $("span.PromotionType input[name=Promotion]").attr("disabled", 'disabled');

    var mapSpan = $(this).attr("id");
    $("." + mapSpan).css("display", "inline-block");
    $("." + mapSpan + " input").removeAttr("disabled");

    if (mapSpan == 'DiscountRate') {
        $("." + mapSpan + " input").val(100);
        $("span.dflag").text("%");
        $("input.promotion").val(100);
    }
    else if (mapSpan == "DiscountPrice") {
        $("." + mapSpan + " input").val(0);
        $("input.promotion").val(0);
        $("span.dflag").text("元");
    }
    else {
        $("." + mapSpan + " input").val(1);
        $("input.promotion").val(1);
        $("span.dflag").text("元");
    }

    

    calculatePrice();
});

$("input.promotion").live("change", function () {
    var promotionType = $("input[name=PromotionType]:checked").val();
    var promotion = $(this).val();
    var regFloat = /[0-9]+(.)?[0-9]*/
    if (!regFloat.test(promotion)) {
        alert("折扣值必须为数字");
        return;
    }

    var promotionValue = parseFloat(promotion);

    if (promotionValue < 0) {
        alert("折扣值不能小于0");
        return;
    }

    calculatePrice();
});

$("input[name=MarketPrice]").live("change", function () {
    var marketPrice = $("input[name=MarketPrice]").val();
    //alert(marketPrice);
    var regFloat = /[0-9]+(.)?[0-9]*/
    if (!regFloat.test(marketPrice)) {
        alert("商品市场价必须为数字");
        return;
    }

    var marketPriceValue = parseFloat(marketPrice);

    if (marketPriceValue < 0) {
        alert("商品市场价不能小于0");
        return;
    }
});

//$("select[name=ActivityId]").live("change",function () {
//    var option = $(this).find("option:selected");
//    $("input[name=BeginTime]").val(option.attr("begin"));
//    $("input[name=EndTime]").val(option.attr("defaultEnd"));
//    $("select[name=beginHour]").val(option.attr("beginHour"));
//    $("select[name=beginMinute]").val(option.attr("beginMinute"));
//    $("select[name=endHour]").val(option.attr("endHour"));
//    $("select[name=endMinute]").val(option.attr("endMinute"));
//});


$("#paBeginTime").live("change", function () {
    var activityStart = $("select[name=ActivityId] option:selected").attr("begin");
    var beginTime = $("#paBeginTime").val();
    if (beginTime < activityStart) {
        alert("开始时间不能早于活动时间");
        $("#paBeginTime").val(activityStart);
    }
});

$("#paEndTime").live("change", function () {
    var activityEnd = $("select[name=ActivityId] option:selected").attr("end");
            
    var endTime = $("#paBeginTime").val();

    if (endTime > activityEnd) {
        alert("结束时间不能晚于于活动时间");
        $("#paEndTime").val(activityEnd);
    }
});
function Cale(a, b) {
    Calendar.setup({
        cont: a,
        trigger: b,
        lang: 'cn',
        inputField: b,
        onBlur: function () {
            this.hide()
        },
        onSelect: function () {
            this.hide()
        }
    })
}
Calendar.LANG("cn", "中文", {
    fdow: 1,
    goToday: "今天",
    today: "今天",
    wk: "周",
    weekend: "0,6",
    AM: "AM",
    PM: "PM",
    mn: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    smn: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    dn: ["日", "一", "二", "三", "四", "五", "六", "日"],
    sdn: ["日", "一", "二", "三", "四", "五", "六", "日"]
});
function initCalendar() {
    Cale("calendarContainer_begin", "paBeginTime");
    Cale("calendarContainer_end", "paEndTime");
}

function strGetLength(str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}
//textgroup table 隔行变色
$('.textgroup .bd tr:odd').each(function() {
    $(this).css('backgroundColor', '#efefef');
});

$("#paSubmit").live('click', function () {
    //alert("ok");
    //return;
    var hasError = false;
    $("td.discount_price").each(function () {
        var discountPrice = parseFloat($(this).text());
        if (discountPrice <= 0 && !hasError) {
            alert("折扣后的价格不能小于0!");
            hasError = true;
        }
    });

    if (hasError) {
        return;
    }

    var beginDate = $("input[name=BeginTime]").val();
    var beginHour = $("select[name=beginHour]").val();
    var beginMinute = $("select[name=beginMinute]").val();

    var endDate = $("input[name=EndTime]").val();
    var endHour = $("select[name=endHour]").val();
    var endMinute = $("select[name=endMinute]").val();

    var beginTime = beginDate + " " + beginHour + ":" + beginMinute + ":" + "00";
    var endTime = endDate + " " + endHour + ":" + endMinute + ":" + "00";


    var promotion = 0;
    var promotion1 = null;
    var promotion2 = null;
    var promotion3 = null;

    var UseUserLevelPrice = $("input[name=UseUserLevelPrice]").val();

    if (UseUserLevelPrice == "False" || UseUserLevelPrice == "false") {
        promotion = $("input[name=Promotion]:not(:disabled)").val();
    } else {
        if ($("input[name=promotion1]").length > 0) {
            promotion1 = parseFloat($("input[name=promotion1]").val());
        }

        if ($("input[name=promotion2]").length > 0) {
            promotion2 = parseFloat($("input[name=promotion2]").val());
        }

        if ($("input[name=promotion3]").length > 0) {
            promotion3 = parseFloat($("input[name=promotion3]").val());
        }
    }

    var data;
    if(globalUpdate) {
        data = {
            ActivityId: $("select[name=ActivityId]").val(),
            PromotionType: $("input[name=PromotionType]:checked").val(),
            UseUserLevelPrice: UseUserLevelPrice,
            Promotion: promotion,
            Promotion1: promotion1,
            Promotion2: promotion2,
            Promotion3: promotion3,
            BeginTime: beginTime,
            EndTime: endTime,
            ProductId: $("input[name=activityProductId]").val(),
            Description: $("input[name=Description]").val(),
            productInActivityId: $("input[name=data-productInActivityId]").val()
        };        
    }else
    {
        data = {
            ActivityId: $("select[name=ActivityId]").val(),
            PromotionType: $("input[name=PromotionType]:checked").val(),
            UseUserLevelPrice: UseUserLevelPrice,
            Promotion: promotion,
            Promotion1: promotion1,
            Promotion2: promotion2,
            Promotion3: promotion3,
            BeginTime: beginTime,
            EndTime: endTime,
            ProductId: $("input[name=activityProductId]").val(),
            Description: $("input[name=description]").val()
        };
    }
    $.post(globalURL, JSON.stringify(data), function (result) {
        if (result.result == "success") {
            alert("报名成功");
            struc.close();
        }
        else {
            alert("报名失败:" + result.msg);
        }
    }, "json");
});
$m.load(['ui/json'], function (JSON) {
    $("#pActivitySubmit").live('click', function () {
        var hasError = false;
        $("td.discount_price").each(function () {
            var discountPrice = parseFloat($(this).text());
            if (discountPrice <= 0 && !hasError) {
                alert("折扣后的价格不能小于0!");
                hasError = true;
            }
        });

        if (hasError) {
            return;
        }

        //alert($("input[name=ActivityProductName]").val().length);
        //return;

        var aStock = $("input[name=ActivityStock]").val();
        if (aStock == "") {
            alert("商品活动库存不能为空!");
            return;
        }

        if (aStock <= 0) {
            alert("商品活动库存不能为0!");
            return;
        }

        var regFloat = /[0-9]+(.)?[0-9]*/
        if (!regFloat.test(aStock)) {
            alert("商品活动库存必须为数字");
            return;
        }

        var mPrice = $("input[name=MarketPrice]").val();
        if (mPrice == "") {
            alert("商品市场价格不能为空!");
            return;
        }

        if (!regFloat.test(mPrice)) {
            alert("商品活动库存必须为数字");
            return;
        }

        var reg = /^(\w|[\u4E00-\u9FA5])*$/;
        var actProductName = $("input[name=ActivityProductName]").val();
        if (actProductName == "") {
            alert("活动商品名称不能为空!");
            return;
        }

        if (strGetLength(actProductName) > 36) {
            alert("活动商品名称字数过长!");
            return;
        }

        var beginDate = $("input[name=BeginTime]").val();
        var beginHour = $("select[name=beginHour]").val();
        var beginMinute = $("select[name=beginMinute]").val();

        var endDate = $("input[name=EndTime]").val();
        var endHour = $("select[name=endHour]").val();
        var endMinute = $("select[name=endMinute]").val();

        var beginTime = beginDate + " " + beginHour + ":" + beginMinute + ":" + "00";
        var endTime = endDate + " " + endHour + ":" + endMinute + ":" + "00";

        var promotion = 0;
        var promotion1 = null;
        var promotion2 = null;
        var promotion3 = null;

        var UseUserLevelPrice = $("input[name=UseUserLevelPrice]").val();

        if (UseUserLevelPrice == "False" || UseUserLevelPrice == "false") {
            promotion = $("input[name=Promotion]:not(:disabled)").val();
        } else {
            if ($("input[name=promotion1]").length > 0) {
                promotion1 = parseFloat($("input[name=promotion1]").val());
            }

            if ($("input[name=promotion2]").length > 0) {
                promotion2 = parseFloat($("input[name=promotion2]").val());
            }

            if ($("input[name=promotion3]").length > 0) {
                promotion3 = parseFloat($("input[name=promotion3]").val());
            }
        }

        var data
        if (globalUpdate) {
            data = {
                ActivityId: $("select[name=ActivityId]").val(),
                PromotionType: $("input[name=PromotionType]:checked").val(),
                UseUserLevelPrice: UseUserLevelPrice,
                Promotion: promotion,
                Promotion1: promotion1,
                Promotion2: promotion2,
                Promotion3: promotion3,
                BeginTime: beginTime,
                EndTime: endTime,
                ProductId: $("input[name=activityProductId]").val(),
                Description: $("input[name=Description]").val(),
                productInActivityId: $("input[name=data-productInActivityId]").val(),
                MarketPrice: $("input[name=MarketPrice]").val(),
                ActivityProductName: $("input[name=ActivityProductName]").val(),
                ActivityStock: $("input[name=ActivityStock]").val()
            };
        } else {
            data = {
                ActivityId: $("select[name=ActivityId]").val(),
                PromotionType: $("input[name=PromotionType]:checked").val(),
                UseUserLevelPrice: UseUserLevelPrice,
                Promotion: promotion,
                Promotion1: promotion1,
                Promotion2: promotion2,
                Promotion3: promotion3,
                BeginTime: beginTime,
                EndTime: endTime,
                ProductId: $("input[name=activityProductId]").val(),
                Description: $("input[name=Description]").val(),
                MarketPrice: $("input[name=MarketPrice]").val(),
                ActivityProductName: $("input[name=ActivityProductName]").val(),
                ActivityStock: $("input[name=ActivityStock]").val()
            };
        }
        $.post(globalURL, JSON.stringify(data), function (result) {
            if (result.result == "success") {
                alert("报名成功");
                location.href = "/SellerProduct/Index";
                //struc.close();
            }
            else {
                alert("报名失败:" + result.msg);
            }
        }, "json");
    });
});