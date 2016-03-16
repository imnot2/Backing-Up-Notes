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

                    var v_fileid = $(curr).attr('fileid');
                    $('#' + v_fileid).val(results[1]);
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