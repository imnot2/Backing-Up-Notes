define(function (require, exports, module) {
    var layerbox = require("widget/layerbox")('struc', {
        close: '.J-close'
    });

    var _node = "<div class='c-pop' style='width:550px;' id='popWindow'><div class='pop-title'><span class='title'></span><a name='CloseEditPriceWnd' class='J-close iconfont'>&#xf0004;</a></div>" +
                "<div class='pop-content ft-ta-l'><div class='message-tip'>" +
                    "<div id='msg-bd'>" +
                        "<i class='order-icon J-order-type order-type'></i>" +
                        "<div class='msg'><span class='msg-error'></span></div>" +
                    "</div>" +
                "<div class='msg-ft'></div>" +
                "</div></div>" +
                "</div>";

    function create() {
        var $popWindow = $("#popWindow");
        if (!$popWindow[0])
            $('body').append(_node);
    }

    function createDom(title, msg, type, btns/*{comfirm:"",cancel:""}*/, callblckFn) {
        create();
        var $popWindow = $("#popWindow")
        $popWindow.find(".title").html(title);
        //$popWindow.find('.J-order-type').addClass('order-' + type);
        if (type == 'error') {
            $popWindow.find('#msg-bd').attr('className', 'msg-bd-error');
        }
        if (type == 'success') {
            $popWindow.find('#msg-bd').attr('className', 'msg-bd-success');
        }
        if (type == 'warning') {
            $popWindow.find('#msg-bd').attr('className', 'msg-bd-warning');
        }
        var btnsHtml = []
        if (btns.comfirm) {
            btnsHtml.push("<button type='button' class='c-btn-primary comfirm J-close'>" + btns.comfirm + "</button>")

        }
        if (btns.cancel) {
            btnsHtml.push("<a href='' class='J-close cancel'>" + btns.cancel + "</a>")

        }
        $popWindow.find(".msg-ft").html(btnsHtml.join(""))
        $popWindow.find('.msg-error').html(msg);

        if (callblckFn) {
            $popWindow.find('.comfirm').click(callblckFn)
        }

        layerbox.alert("#popWindow")
    }

    function comfirmPop(title, msg, type, btns/*{comfirm:"",cancel:""}*/, callblckFn) {
        btns = btns || { comfirm: ResourceJS.SellerOrder_Common_Alert_msg_Confirm, cancel: ResourceJS.SellerOrder_Common_Alert_msg_Cancel };
        createDom(title, msg, type, btns, callblckFn)
    }
    function alertPop(title, msg, type, callblckFn) {
        btns = { comfirm: ResourceJS.SellerOrder_Common_Alert_msg_Confirm };
        createDom(title, msg, type, btns, callblckFn)
    }

    return {
        comfirmPop: comfirmPop,
        alertPop: alertPop
    }
})