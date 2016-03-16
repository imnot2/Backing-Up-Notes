Ymt.add(function (require, exports, module) {
    var LayerBox=require('widget/layerbox')
    var layer = LayerBox('struc');

    $(".foot a.btn-1").bind("click", function () {

        var rightSideUrl = $("#fileUrl_1").val();
        var reverseSideUrl = $("#fileUrl_2").val();
        var cardId = $("#cardId").val();

        if (!CheckIdCode(cardId)) {
            return;
        }

        if (!$("#chkIpromise").attr("checked")) {
            alert("请先接受委托内容再提交！");
            return;
        }

        if (rightSideUrl == "" || reverseSideUrl == "") {
            alert("请上传两张身份证图片后提交保存");
            return;
        }
        else {
            var rightSideUrl = $("#fileUrl_1").val();
            var reverseSideUrl = $("#fileUrl_2").val();
            var cardId = $("#cardId").val();
            $.get("/IdCardManage/SaveUserCard",
                {
                    cardOwner: currentName,
                    mobile: currentMobile,
                    cardId: cardId,
                    rightSideUrl: rightSideUrl,
                    reverseSideUrl: reverseSideUrl
                },
                function (data) {
                    if (data.result == "True") {
                        layer.alert("#promptDiv");
                        window.location = $('.ac_redirect').val();
                    } else {
                        alert(data.msg);
                    }
                }
            );
        }
    });
})