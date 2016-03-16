function changeMail() {
    $('.sendInfo').hide();
    $('.editEmail').show();
}

function cancelChange() {
    $('.editEmail').hide();
    $('.sendInfo').show();
}

Ymt.add(function (require, exports, module) {
    //
  
    var countdown = require('widget/countdown');

   
    $("#btnSendMail").click(function () {
        var email = $("#txtEmail").val();
        var url = "/SellerApplyV2/SendUpdateRegValidateEmail?isShowEN=" + business_lang_flag + "&email=" + email;
        $.post(url, function (data) {
            if (data.result != "success") {
                alert(data.result);
            } else {
                $('#p_show_01').hide();
                $('#p_show_02').show();
                countdown('CountDown', 3600);
            }
        });
    });

    $(function () {
        $('.editEmail').hide();
        $('.sendInfo').show();

        $("#btnChangeMail").click(function () {
            var email = $("#txtEmail").val();
            var nick = $("#hidNickName").val();
            var url = "/SellerApplyV2/UpdateRegValidateEmail?isShowEN=" + business_lang_flag + "&email=" + email + "&id=" + encodeURIComponent(nick);
            $.post(url, function (data) {
                if (data.result != "success") {
                    $(".mj_err").html(data.result);
                    $(".mj_err").show();
                } else {
                    $("#spReadonlyMail").html(email);
                    $(".sendInfo").show();
                    $(".editEmail").hide();
                }
            });
        });


    });

})