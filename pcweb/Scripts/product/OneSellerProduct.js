Ymt.load("widget.Slide,widget.Tooltip", function () {
    //tootip
    Ymt.widget.Slide('#slideImages', {
        panels: '.mainImagesbox a.zoom',
        triggers: '.scroll li',
        effect: 'fade',
        triggerType: 'mouse',
        autoplay: false
    });
    var tooltip = Ymt.widget.Tooltip('struc', {
        container: 'shoucang',
        content: '.list',
        trigger: '.widget',
        event: 'mouse',
        time: 100,
        offsety: 3
    });
    $("#figure .node").live({
        mouseenter: function (m, n, a, b) {
            var that = $(this), box = $("#slideImages .mainImagesbox"), src = that.find(".img").attr("src"), index = $("#figure li.node").index(that), elem = $(box.find("a.zoom").get(index));
            elem.attr("href", src.replace("/small/", "/original/").replace("_s.", "_o."));
            elem.find(".img").attr("src", src);
        }
    })
    tooltip.init();
    //tooltip.init({
    //    container: 'wuliuspeed',
    //    offsetx: 132
    //});
    $("#vaccountbox").size() > 0 && tooltip.init({
        container: "vaccountbox",
        trigger: '.vaccount',
        up: !1,
        content: '.vaccountTIP',
        offsety: 0
    });
    //$("#parea .detail").size() > 0 && tooltip.init({
    //    container: "parea",
    //    trigger: '.detail',
    //    up: !0,
    //    content: '.tooltip-1',
    //    offsety: 26,
    //    offsetx: 10
    //});
    //$("#ordertool").size() > 0 && tooltip.init({
    //    container: "ordertool",
    //    trigger: '.txt',
    //    up: !0,
    //    content: '.tooltip-1',
    //    offsety: 28
    //});
    var ie = /(MSIE)\s*(\d)/i.exec(navigator.userAgent), ievis = ie != null && (ie[2] < 8);
    var tooltip2 = Ymt.widget.Tooltip('temps', {
        container: 'catalog-state',
        Temps: '{title}<div class="con">{text}</div><div class="arrow"></div>',
        event: 'mouse',
        time: 100,
        up: !0,
        trigger: '.r',
        content: '.tooltip-3',
        offsetx: 40
    });
    switch ($("#catalog-state>span.r").attr("title")) {
        case "海外直邮":
            tooltip2.init({
                Data: [{ title: "<i class='avi2'></i><b class='yel'>海外直邮</b>", text: '商品通过卖家自选的国际物流公司进行配送，由海外直接送达到您手中。' }],
                offsety: ievis ? 16 : 30
            });
            break;
        case "护航直邮":
            tooltip2.init({
                Data: [{ title: "<i class='avi'></i><b class='yel'>护航直邮</b>", text: "商品通过洋码头指定的国际物流公司由海外进行配送，经海关通关入境，并直 送到您手中。<a class='blue' href='http://help.ymatou.com/save_02.html' target='_blank'>点此了解商品如何通关</a>。" }],
                offsety: ievis ? 40 : 52
            });
            break;
        case "国内转运":
            tooltip2.init({
                Data: [{ title: "<b class='yel'>国内转运</b>", text: "1、国内转运商品 将在 海外采购 ， 然后运送至国内，再由卖家进行国内转运。<br />2、卖家海外身份真实有效，在码头上的行为受所在国家法律制约；卖家任何售假、欺诈行为一经证实，洋码头海外律师团队有权发起诉讼，要求赔偿和惩处。" }],
                offsety: ievis ? 106 : 120
            });
            break;
        case "国内现货":
            tooltip2.init({
                Data: [{ title: "<b class='yel'>国内现货</b>", text: "1、国内现货商品均采购自海外，卖家承诺商品通过合法途径申报入境，并已运抵国内等待发货。<br />2、卖家海外身份真实有效，在码头上的行为受中国及所在国家两国法律制约。<br />3、卖家任何售假、欺诈行为一经证实，洋码头海外律师团队有权发起诉讼，要求赔偿和惩处。" }],
                offsety: ievis ? 126 : 140
            });
            break;
    }
}, true)
$('#oversale .note_title a').click(function () {
    $(this).attr('class') != 'btn-0-0' && ($(this).attr('class', 'btn-0-0'), $(this).text('已设置到货通知'));
    return false;
})
$('#parea .showAreaHandle').live('click', function () {
    $('#parea .chinaArea').toggle(10);
    return false;
})
$('#parea .shutAreaHandle').live('click', function () {
    $('#parea .chinaArea').toggle(10);
    return false;
})
$('#parea .detail').live('mouseenter', function () {
    var o = $(this).offset(), t = $('#parea .flightdetail'), doff = $('.article-main').offset(), m = null;
    m = { left: o.left + 45 - doff.left, top: o.top - 8 - doff.top };
    t.css({ 'left': m.left, 'top': m.top });
    t.show(10);
});
$('#parea').bind('mouseleave', function () {
    $('#parea .flightdetail').hide(10);
});
$("#txtNum").bind({
    keyup: function () {
        var reg = /[^\d]*/g;
        $(this).val($(this).val().replace(reg, ""));
        $(this).val() == "" || $(this).val(parseInt($(this).val()));
        return false;
    }
})
$("#widget-amount .add").click(function () {
    var txt = $("#txtNum"), num = txt.val() == "" ? 0 : parseInt(txt.val());
    num++;
    txt.val(num);
    return false;
})
$("#widget-amount .del").click(function () {
    var txt = $("#txtNum"), num = txt.val() == "" ? 0 : parseInt(txt.val());
    num--;
    if (num < 1) {
        txt.val("1");
    } else {
        txt.val(num);
    }
    return false;
})
$("#slideImages .mainImagesbox").bind({
    mouseenter: function () {
        $(this).find(".bar").css({ "visibility": "visible" })
    },
    mouseleave: function () {
        $(this).find(".bar").css({ "visibility": "hidden" })
    }
})
$('.morecredit').click(function () {
    $("#tab-3 .tab-hd .item").eq(1).click();
    window.scrollTo($("#tab-3").offset().top);
});
function submitPager(url) {
    $('#ShopCredits').load(url);
    window.scrollTo(0, j$('#ShopCredits').offset().top);
}
$("a.zoom").fancybox({
    'overlayOpacity': 0.7,
    'overlayColor': '#2B2A25',
    'zoomSpeedIn': 600,
    'zoomSpeedOut': 400
});
function getSelectedCatalogId() {
    //    if ($('div.attrformat input.attributeCheck').length > 0)
    //        return $('div.attrformat input.attributeCheck:checked').first().val();
    return $("#hCatalogId").val();
}

function checkBuyNum(o) {
    o = o.data
    var buyNum = $("#txtNum").val();
    if (o) {
        if ((parseInt(buyNum) > parseInt(o.Limit) - parseInt(o.Bought)) && parseInt(o.Limit) != 0) {
            alert("您要购买的数量大于可购买数量。");
            $("#txtNum").val(o.Limit);
            return false;
        } else {
            return true;
        }
    }
    if (parseInt(buyNum) < 0) {
        alert("请输入正确的购买数量");
        return false;
    }
    return true;
}

var checking = false;


function refreshShoppingCartNum() {
    $.get('/ShoppingCart/RefreshShoppingCartNum', function (data) {
        $('#shoppingCartNum').html(data);
    });
}

$(function () {

    //    $('.helpIcon').click(function () {
    //        var o = $(this).offset();
    //        $('.tipIcon span').empty().html('从付款成功后到买手开始发货的时间间隔.');
    //        $('.tipIcon').css({ 'left': o.left - 180, 'top': o.top + 18 }).show();
    //        return false;
    //    })
    $('#logistic .helpIcon').click(function () {
        var o = $(this).offset();
        $('.tipIcon span').empty().html('<span class="yel">物流指数：</span>是根据该买手历史的发货信息统计而来平均时间。');
        $('.tipIcon').css({ 'left': o.left - 180, 'top': o.top + 18 }).show();
        return false;
    })
    $('.tipIcon .tipShut').bind('click', function () {
        $(this).closest('.tipIcon').hide();
        return false;
    })
    var allCatalogs = "";
    $(".hCatalog").each(function () {
        if ($(this).val() != allCatalogs)
            allCatalogs += (allCatalogs == "" ? "" : " ") + $(this).val();
    });

    if (allCatalogs.split(" ").length == 1 && allCatalogs != "") {
        $(".allCatalog").hide();
        $("div.attritem input." + allCatalogs).attr("checked", true);
        $('.catalogTab').hide();
        $('.' + allCatalogs).show();
        $('#hCatalogId').val(allCatalogs);
    }

    //    $("li#FeeNumDiv div." + getSelectedCatalogId()).show();

    $("input[id='txtNum']").each(function () {
        $(this).change(function () {
            if (!(parseInt($(this).val()) == $(this).val() && $(this).val() > 0)) {
                alert("请输入整数");
                $(this).val(1);
            }
        });
    });
});
function bntReturn(o) {
    //var checkVipResult = checkVip();
    //if (!checkVipResult) {
    //    alert("此商品为V账户用户专享！\r\n关注洋码头官方微信'yangmatou'免费获取V账户\r\n详见V账户活动");
    //    return false;
    //}
    var checkNumResult = checkBuyNum(o);
    if (checkNumResult) {
        var c = o, b;
        if (!c.seleteall) {
            alert("请选择完整规格");
            return;
        }
        b = GetCatalog(o.data,o)
        var cc = encodeURIComponent(b.toString());
        $.ajax({
            url: "/ajax/addcart?c=" + cc + "&t=" + Math.random(),
            success: function (m) {
                if (m.result == "true") {
                    alert('添加到购物车成功！');

                    refreshShoppingCartNum();
                }
                else {
                    if (m.message != "") {
                        alert(m.message);
                    } else {
                        alert("添加到购物车失败，请选择规格并填写正确的数量！");
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("error");
                alert(xhr.status);
                alert(thrownError);
            }
        });
    }
}
function bntBuyNow(o) {
    //var checkVipResult = checkVip();
    //if (!checkVipResult) {
    //    alert("此商品为V账户用户专享！\r\n关注洋码头官方微信'yangmatou'免费获取V账户\r\n详见V账户活动");
    //    return false;
    //}
     
    var checkNumResult = checkBuyNum(o);
    if (checkNumResult) {
        var c = o, b;
        if (!c.seleteall) {
            alert("请选择完整规格");
            return;
        }
        b = GetCatalog(o.data,o)
        var cc = encodeURIComponent(b.toString());
        $.ajax({
            url: "/ajax/addcart?c=" + cc + "&t=" + Math.random(),
            success: function (m) {
                if (m.result == "true") {
                    window.location.href = "/shoppingcart?t=" + Math.random();
                }
                else {
                    if (m.message != "") {
                        alert(m.message);
                    } else {
                        alert("添加到购物车失败，请选择规格并填写正确的数量！");
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("error");
                alert(xhr.status);
                alert(thrownError);
            }
        });
    }
}
function GetCatalog(o,spe) {
    var catalog = new Object();
    catalog.catalogId = o.CatalogId;
    catalog.flight = o.Flight.split(",").join("");
    var price = "";
    if (spe.config.spedata.HasPromotionLevel) {
        price = o['PromotionPrice' + parseInt($('#PromotionLevel').val())];
    } else if (o.PromotionPrice) {
        price = o.PromotionPrice;
    } else {
        price = o.Price;
    }

    catalog.quotePrice = price.split(",").join("");

    catalog.buyCount = $("#txtNum").val();

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