/*=======================OneBill.js===========================*/
$(function () {
    $("#reqBtn").click(function () {
        var form = $("form#delRequestForm");
        $.ymatoupost(form.attr('action'), form.serialize(), function (data) {
            if (data.success == 1) {
                $("#delRequestForm").hide();
                $("#delRequest").hide();
                $("#RequestedDiv").show();
            } else {
                alert(data.message);
            }
        }, 'json');
        return false;
    });
    $("#delRequest").click(function () {
        $("#delDiv").show();
    });

    $(".delBillSelfBtn").click(function () {
        alert("删除运单后将退回已支付的物流运费！");
        $.ajax({
            url: "/logistics/deletebillself?bid=" + $(this).next().val(),
            dataType: "json",
            success: function (data) {
                alert(data.m);
                window.location.href = "/allbills";
            }
        });
    });

    $m.load('widget/tooltip', function () {

    })

});
