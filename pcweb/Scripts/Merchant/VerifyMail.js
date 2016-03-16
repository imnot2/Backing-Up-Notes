Ymt.add(function(require, exports, module) {
    //

    var countdown = require('widget/countdown');

    $('.editEmail').hide();
    $('.sendInfo').show();

    $("#btnCancelChange").click(function() {
        $('.editEmail').hide();
        $('.sendInfo').show();
    });

    $("#btnClickChange").click(function() {
        $('.sendInfo').hide();
        $('.editEmail').show();
    });

    $("#btnSendMail").click(function() {
        var email = $("#txtEmail").val();
        var nick = $("#hidNickName").val();
        var url = "/Register/SendUpdateRegValidateEmail?email=" + email + "&id=" + encodeURIComponent(nick);
        //var url = "/SellerApplyV2/SendUpdateRegValidateEmail?isShowEN=" + business_lang_flag + "&email=" + email;

        $.ajax({
            url:url,
            dataType: 'text',
            type:'get',
            success: function (data) {
                if (data != "") {
                    alert(data);
                } else {
                    $('#p_show_01').hide();
                    $('#p_show_02').show();
                    countdown('CountDown', 3600, function () {
                        $('#p_show_01').show();
                        $('#p_show_02').hide();
                    });
                }
            }
        })

        return !1
    });

    $("#btnChangeMail").click(function () {
        var email = $("#txtEmail").val();
        var nick = $("#hidNickName").val();
        var reg = /^[^@\.\s\n]+@[\w-]+\.[\w-]+$/;
        if (!reg.test(email)) {
            $('.mj_err').html("郵件格式不正確，請重新輸入");
            $(".mj_err").show();
            return false;
        }

        var url = "/Register/UpdateRegValidateEmail?email=" + $("#txtEmail").val() + "&id=" + encodeURIComponent(nick);


        $.ajax({
            url: url,
            dataType: 'text',
            type: 'get',
            success: function (data) {
                if (data == "") {
                    $("#EmailAddress").html(email);
                    $(".sendInfo").show();
                    $(".editEmail").hide();
                    $(".mj_err").hide();
                } else {
                    $(".mj_err").html("郵箱修改失敗，請重新嘗試");
                    $(".mj_err").show();
                }
            }
        })
        return !1
    });
});