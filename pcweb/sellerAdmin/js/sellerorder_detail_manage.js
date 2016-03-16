/**
* @autor river
* @email e23jiang@sina.com
* 商家后台订单详细
*
**/
+function () {
    'use strict';
    $(function () {
        remarksCtrl();
        modifyLogistics();
    });

    //备注操作
    function remarksCtrl() {
        //remarkCtrl
        var remarkCtrl = $(".remarkCtrl"),
            msg = remarkCtrl.find(".msg"),
            modifyCtrl = remarkCtrl.find(".modify"),
            addCtrl = remarkCtrl.find(".add"),
            saveCtrl = remarkCtrl.find(".save"),
            textarea = remarkCtrl.find("[name=remarks]");
        //add
        addCtrl.click(function () {
            msg.hide();
            $(this).hide()
            textarea.show();
            saveCtrl.show();
        })
        //update
        modifyCtrl.click(function () {
            $(this).hide();
            textarea.val(msg.hide().text().trim()).show();
            saveCtrl.show();
        });
        //save
        saveCtrl.click(function () {
            var val = textarea.hide().val() || "无";
            msg.text(val).show();
            $(this).hide();
            modifyCtrl.show();
            $.ajax({
                url: ' /Order/SaveOrderNote',
                data: JSON.stringify({
                    OrderId: $("[name=OrderId]").val(),
                    Conetent: val
                }),
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.success == 'true') {
                        alert(data.message);
                        window.location.reload();
                    }else {
                        alert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('修改备注失败,请联系客服');
                }
            });
        })
    }
    //修改物流
    function modifyLogistics() {
        $(".logistics-no").click(function (e) {
            var target = e.target,
            $target = $(target),
            $this = $(this);

            if ($target.hasClass("modify")) {
                $target.hide().parent().find(".new-input").show().end().find(".text").hide();
            } else if ($target.hasClass("btn-confirm")) {
                var parent = $target.parent(),
                val = parent.find("input").val(),
                text = $this.find(".text"),
                    modify = $this.find(".modify");
                if (val) {
                    text.html(val).show();
                } 
                modify.show();
                parent.hide();
                $.ajax({
                    url: '/OrderDetail/ChangeOrderDeliveryNumber',
                    data: JSON.stringify({
                        orderId: $("[name=OrderId]").val(),
                        billCodeList: val
                    }),
                    type: "post",
                    async: true,
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.success == 'true') {
                            alert(data.Message);
                            window.location.reload();
                        } else {
                            alert(data.Message);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('修改物流单号,请联系客服');
                    }
                });

            } 
        })
    }
}();