Ymt.add(function (require, exports, module) {

    $("#cardId").bind("blur", function () {
        var cardId = $("#cardId").val();
        if (!IdCardValidate(cardId)) {
            $("#card_error").css("display", "inline-block");
        }
        else {
            $("#card_error").css("display", "none");
        }
    });

    layerBox = require('widget/layerbox')('struc');

    $(".upload_btn").bind("click", function () {
        var name = $(this).closest("div.card_img").find("input[name=name]").val();
        var type = $(this).closest("div.card_img").find("input[name=type]").val();
        var fileId = $(this).closest("div.card_img").find("input[name=fileUrl]").attr("id");
        var imgId = $(this).closest("div.card_img").find("img.preview").attr("id");
        var url = baseUrl + "?name=" + encodeURIComponent(name) + "&type=" + type + "&imgId=" + imgId + "&fileId=" + fileId;

        $("#upload_dialog iframe").eq(0).attr("src", url);
        layerBox.alert('#upload_dialog');
        return !1
    });


    $('#upload_dialog .shut').bind('click', function () {
        layerBox.close();
    })

})