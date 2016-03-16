function ShowPdf(obj) {

}

$(function () {
    $(".fileinput").change(function () {
        var curr = this;
        var file = $(curr).val();
        if (file == null || file == "") {
            if (business_lang_flag) {
                $(curr).closest("form").find("span.mj_err").show().html("Please upload the picture of the certificate");
            }
            else {
                $(curr).closest("form").find("span.mj_err").show().html("請先選擇文件");
            }
            return;
        }
        var ext = file.substr(file.lastIndexOf('.') + 1);
        if (ext != "jpg" && ext != "JPG" && ext != "gif" && ext != "GIF" && ext != "png" && ext != "PNG" && ext != "pdf" && ext != "PDF") {
            refreshUploader(this);
            if (business_lang_flag) {
                $(curr).closest("form").find("span.mj_err").show().html("Please upload file types meets the requirements");
            }
            else {
                $(curr).closest("form").find("span.mj_err").show().html("請上傳符合要求的文件類型");
            }
            return;
        }
        var fileAccessUrl = "/file/id/";
        
        var option = {
            type: "POST",
            dataType: "text",
            success: function (data) {
                //alert(data);
                var results = data.split(':');

                if (results[0] == "success") {
                    var src = fileAccessUrl + results[1];
                    $(curr).closest("form").find("input.FileId").val(results[1]);
                    $(curr).closest("form").find(".ViewImg").show();
                    $(curr).closest("form").find("img").show();
                    $(curr).closest("form").find("img").next().hide();
                    $(curr).closest("form").find("img").attr("src", src);
                    $(curr).closest("form").find(".view_img").attr("href", src);
                    //
                    $(curr).closest("form").find("span.mj_err").hide();
                } else {
                    if (business_lang_flag) {
                        $(curr).closest("form").find("span.mj_err").show().html("File upload error:" + results[1]);
                    }
                    else {
                        $(curr).closest("form").find("span.mj_err").show().html("文件上傳失敗:" + results[1]);
                    }
                }
            },
            error: function () {
                if (business_lang_flag) {
                    $(curr).closest("form").find("span.mj_err").show().html("File upload error");
                }
                else {
                    $(curr).closest("form").find("span.mj_err").show().html("文件上傳失敗:");
                }
            }
        };
        $(this).closest("form").ajaxSubmit(option);
    });

    $("#submitInfo").click(function () {
        //
        var flag = false;
        var v_jqFileId = $("input.FileId");
        v_jqFileId.each(function () {
            if ($(this).val() == "") {
                flag = true;
                $(this).closest("p").find("span.mj_err").show();
            }
            else {
                $(this).closest("p").find("span.mj_err").hide();
            }
        });

        if (flag) {
            return;
        }
        //
        var requestJson = {
            PersonalFrontalFileId: v_jqFileId.get(0).value,
            CardFrontFileId: v_jqFileId.get(1).value,
            CardBackFileId: v_jqFileId.get(2).value,
            StatementInfoFileId: v_jqFileId.get(3).value
        };
        $.post('/SellerApplyV2/UpdateSellerApprove', requestJson, function (result) {
            if (result.success) {
                if (business_lang_flag) {
                    window.location.href = "/SellerApplyV2/SellerVerifyIdCardSuccess?lang=1";
                }
                else {
                    window.location.href = "/SellerApplyV2/SellerVerifyIdCardSuccess?lang=0";
                }
            } else {
               
            }
        });
    });
});

function refreshUploader(obj) {
    if ($.browser.msie) {
        var obj1 = obj.cloneNode(false);
        obj1.onchange = obj.onchange;
        obj.parentNode.replaceChild(obj1, obj);
    } else {
        $(obj).attr("value", "");
    }
}