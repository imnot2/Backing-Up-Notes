Ymt.add(function (require, exports, module) {
    var time = null;
   
    $("#display_tip").bind("mouseenter", function() {
        time != null && clearTimeout(time);
        $("#vp_info").show();
    });
    $("#display_tip").bind("mouseleave", function() {
        clearTimeout(time);
        time = setTimeout(function() {
            $("#vp_info").hide();
        }, 1000);
    });
    $('#vp_info').bind({
        mouseenter: function() {
            clearTimeout(time);
        },
        mouseleave: function() {
            $(this).hide();
        }
    });
    j$(".openv").click(function() {
        j$.post("/Privilege/ShareToParentVPrivilege", null, function(data) {
            if (data.result == 'success') {
                alert("开通成功");
                window.location.reload();
            } else {
                alert("开通失败:" + data.msg);
            }
        });
    });

    if (j$('#activeOrNot').val() == "1") {
        j$('#activespan').show();
    } else {
        j$('#activespan').hide();
    }
   
    $.get('GiftManage/CheckExpiredDay', function (data) {
        var html;
        if (data.status) {
            html = '<span class="dateTip dateTip_0"><span class="tipText_0">您的红包有限期只剩' + data.days + '天<a class="closeTip_0" href="javascript:;"></a></span><span class="dateTipBottomIcon_0"></span></span>';
            $('.dateTipBox').append(html);
            $(".closeTip_0").bind('click', function (e) {
                $(this).parents('.dateTip_0').remove(); 
            })
        }
    })
    //我的码头首页，登录送优惠券
    $(function () {
        if (window.hasExclusiveCoupon) {
            var LayerBox = require('widget/LayerBox');
            var couponAlert = LayerBox('struc', { zIndex: 998, close: '.closeTrigger', isloc: !0 });
            couponAlert.alert("#alert_box_5")
        }
    })
   
})  