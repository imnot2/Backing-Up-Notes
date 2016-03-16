Ymt.add(function (require, exports, module) {
    var LayerBox=require('widget/layerbox')
    var layer = LayerBox('struc', {
        close: '.JS-close',
        closeCallback: function () {
            location.reload();
        }
    });

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
            //var currentName = $("span.name_item").has("span.current").find("input[name=linkIndex]").val();
            //$('#Confirm-Name').html(currentName);
            //$('#Confirm-IdCard').html(cardId);
            //$('#Confirm-Pic1').attr('src', rightSideUrl);
            //$('#Confirm-Pic2').attr('src', reverseSideUrl);
            layer.alert('#promptDiv');

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
                        if (isLastOne == "True") {//如果已经是最后一人上传那么跳到支付页
                            var nextUrl = "/buyer/order";
                            window.setTimeout(function () {
                                window.location.href = nextUrl;
                            }, 3)
                        } else {
                            location.reload();//刷新当前页面
                        }
                    } else {
                        alert(data.msg);
                    }
                }
            );
        }

    });



})