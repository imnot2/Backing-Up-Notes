define(function (require, exports, module) {

    var tab = require('widget/tabs');
    tab('#recommandTab', {
        panels: ".panels .item",
        triggers: ".switchBox .item"
    })
    $('#recommandTab .switchBox .current').trigger("mouseover");

    var LayerBox = require('widget/LayerBox')('struc', {
        zIndex: 998,
        close: '.closeTrigger',
        isloc: !0
    });
    $('.collectible').click(function () {
        try {
            if (iscoupon) {
                LayerBox.alert('#alert_box_5');
            }
        }
        catch (e) {}
    });


    // 定制二维码 ,点击第一次，二维码由无变有， 之后按钮无响应
    $('.J_tailorQR').click(function () {
        $('.J_tailor_img').css('visibility', 'visible');
    });

    // 点击'查看我获得的奖金'跳转到 ‘推荐记录查询’
    $('.gotoRecord').click(function () {
        $('#recommandTab .switchBox .item:eq(1)').trigger("mouseover");
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // 查看是否有tag=record，如果有的话，转到推荐查询
    void

    function () {
        var urlPara = window.location.search;
        var reg = /tag\s*=\s*record/gi;
        if (reg.test(urlPara)) {
            $('#recommandTab .switchBox .item:eq(1)').trigger("mouseover");
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }();

});