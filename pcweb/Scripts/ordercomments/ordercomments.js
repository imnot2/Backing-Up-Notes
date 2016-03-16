Ymt.add(function (require, exports, module) {

    //如果订单不满足评论条件。
    if ($('#IsAllowCredit').val() != 1 || $('#CreditProgress').val() != 1) {
        setTimeout(function () {
            window.location.href = "http://" + window.location.hostname + "/buyer/order";
        }, 500);
    };

    var LayerBox = require("widget/layerbox");
    var Bubble = require("util/bubble");

    //jq扩展placeholder兼容
    var placeholder = require("util/placeholder");

    //评分星星的hover效果
    var starItem = $('.operation-stars .star-item');

    function operationStars(that) {
        var prevAll = $(that).prevAll(),
            nextAll = $(that).nextAll(),
            parent = $(that).parents('.starts-box');

        //isShowErrorNode(parent, false);

        $(that).addClass('star-active');
        prevAll.addClass('star-active');
        nextAll.removeClass('star-active');
    }

    function startBoxLeave() {
        $(this).find('.star-item').removeClass('star-active');
        //isShowErrorNode($(this).parents('.starts-box'), true);
    }

    function startHove() {
        operationStars(this);
    };

    function startClick() {
        var parent = $(this).parents('.starts-box'),
            startsBox = $(this).parent(),
            point = $(this).prev().index() + 2;

        operationStars(this);
        isShowErrorNode(parent, false);

        startsBox.unbind('mouseleave', startBoxLeave);
        parent.find('.star-item').unbind('mouseover', startHove);
        parent.data('Point', point);
    };

    $('.operation-stars').bind('mouseleave', startBoxLeave);
    starItem.bind('mouseover', startHove);
    starItem.bind('click', startClick);

    //查看免运卡细则
    var freeCardNode = $('.link-blue');
    freeCardNode.length && Bubble(freeCardNode, {
        "width": 396,
        "direction": "top",
        "backgroundColor": "#fff",
        "borderColor": "#d3d3d3",
        "fontColor": "#666",
        "triangleWidth": "8px",
        "borderWidth": "1",
        "text": '<p style="color:#333">免运卡获取条件：</p><p>1）订单为护航直邮，并且未使用免运卡，收货之后完整评价即可获得。</p> <p> 2） 数量上限： Y1: 1 张 / 月； Y2： 2 张 / 月； 以此类推... </p><p>3）有效期：发放之日起60天。</p> '
    });

    //placeholder 兼容
    $('.comment_textarea').smartInput();

    function isShowErrorNode(node, isShowErrorNode, txt) {
        var errNode;
        if (!node.length) return;
        errNode = node.find('.comment-error');
        txt && errNode.text(txt);
        isShowErrorNode ? errNode.addClass('show') : errNode.removeClass('show');
    };

    function joinArr(arr) {
        return arr.join("^$^");
    };
    $('.submit-button').bind('click', function () {

        var that = $(this);

        var sellerServiceNode,
            sellerServicePoint,
            productNode,
            productName = [],
            productPoint = [],
            productComments = [],
            productIdArr = [],
            productType = [],
            pruductSKU = [],
            n = 0,
            optionsForBanWord,
            optionsForOrderCredit,
            isComplete = true;

        if ($(this).attr('enable') === 'false') return;

        sellerServiceNode = $('.seller-service');
        sellerServicePoint = $('.seller-service').data('Point');

        if (!sellerServicePoint) {
            isComplete = false;
            isShowErrorNode(sellerServiceNode, true);
        }

        productNode = $('.product-comment');
        for (n = 0; n < productNode.length; n++) {
            var node = productNode.eq(n),
                point = node.find('.comment-box').data('Point') || 0,
                productid = node.attr("productid"),
                textarea = node.find('.comment_textarea'),
                comment = textarea.val(),
                type = node.attr("producttype"),
                sku = node.attr("productsku"),
                title = node.find('.product-title').text();
            if (!point) {
                isComplete = false;
                isShowErrorNode(node.find('.comment-box'), true);
            }
            if ($.trim(comment).length > 255) {
                isComplete = false;
                isShowErrorNode(node.find('.comment-desc'), true, "您提交的评价过长！");
            }
            productIdArr.push(productid);
            productPoint.push(point);
            productComments.push(comment);
            productName.push(title);
            productType.push(type);
            pruductSKU.push(sku);
        };

        //数据有误不再继续进行操作。
        if (!isComplete) return;


        optionsForBanWord = {
            "StrProductId": joinArr(productIdArr),
            "StrComment": joinArr(productComments)
        };
        optionsForOrderCredit = {
            "BuyerId": $('#BuyerId').val(),
            "BuyerUserName": $('#BuyerUserName').val(),
            "BuyerLevel": $('#BuyerLevel').val(),
            "OrderId": $('#OrderId').val(),
            "SellerId": $('#SellerId').val(),
            "Point": sellerServicePoint,
            "CreditType": $('#CreditType').val(),
            "IsShangouOrder": $('#IsShangouOrder').val(),
            "StrProductId": joinArr(productIdArr),
            "StrProductName": joinArr(productName),
            "StrPoint": joinArr(productPoint),
            "StrFirstComment": joinArr(productComments),
            "StrProductType": joinArr(productType),
            "StrProductSKU": joinArr(pruductSKU)
        };

        //敏感词验证
        $.post('/Order/BuyerOrderDetail/ValidateBanWord', $.toJSON(optionsForBanWord), function (res) {
            var banWordList, i = 0,
                res = $.parseJSON(res) || {},
                banWordList = res.BanWordList || [];
            if (!banWordList.length) {
                //无敏感词
                $(".comment_textarea").removeClass('err');

                that.attr('enable', 'false');

                $.post('/Order/BuyerOrderDetail/PostOrderCredit', $.toJSON(optionsForOrderCredit), function (res) {
                    var tips = '';
                    res = $.parseJSON(res) || {};
                    isShowErrorNode($(".comment-desc"), false);
                    if (res.StatusCode == 200) {
                        //res.FreeCardStatus = -1 未获取免运卡
                        //res.FreeCardStatus = 1 成功获得免运卡
                        //res.FreeCardStatus = 0 免运卡达上限
                        switch ((res.FreeCardStatus || 0).toString()) {
                        case "-1":
                            tips = '';
                            break;
                        case "0":
                            tips = '<br/>您本月所领取的免运卡已达上限，感谢您的评价！';
                            break;
                        case "1":
                            tips = '<br/>您已获得一张<span class="deepRed">免运卡</span>';
                            break;
                        }
                        showSmallLayer({
                            "tips": tips
                        });
                    }
                    else {
                        alert(res.Message);
                    }
                }).complete(function () {
                    that.attr('enable', 'true');
                })
            }
            else {
                for (i = 0; i < banWordList.length; i++) {
                    banWordNode = $('[productid=' + banWordList[i]["ProductId"] + ']');
                    banWordNode.find(".comment_textarea").addClass('err');
                    isShowErrorNode(banWordNode.find(".comment-desc"), true, "您输入的内容有敏感词，请核对后提交");
                }
            }
        })
    });

    //小窗口提示
    function showSmallLayer(tips) {

        var layerHtml = [
            '<div class="small-layer">',
            '   <i class="{color} icon-font ">{icon}</i>',
            '   <p class="layer-content">{html}</i>',
            '</div>'

        ].join('');

        var smallLayer = LayerBox('Temps', {
            zIndex: 999,
            isFrame: false,
            Temps: layerHtml,
            callback: function () {}
        });
        var html = "感谢您的评价" + tips.tips;
        smallLayer.alert({
            "color": "icon-success",
            "icon": "&#x34ae;",
            "html": html
        });
        setTimeout(function () {
            smallLayer.close();
            window.location.href = "http://" + window.location.hostname + "/buyer/order";
        }, 2000);
    };
});