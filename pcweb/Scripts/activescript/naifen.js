Ymt.load("widget.LayerBox,widget.InfiniteScroll", function () {
    var layer = Ymt.widget.LayerBox("struc");
    Ymt.widget.InfiniteScroll("#scroll-mod ul", {
        type: 1,
        visible: 1
    });
    $("#nav-by").delegate(".link", "click", function () {
        var that = this, contents = $(".content");
        $("#nav-by .link").each(function (m, n) {
            if (n == that) {
                contents.eq(m).show();
                var img = contents.eq(m).find("img[lazysrc]");
                img.each(function () {
                    $(this).attr("src", $(this).attr("lazysrc"));
                    $(this).removeAttr("lazysrc");
                })
            } else {
                contents.eq(m).hide();
            }
        })
    })

    $("#applybtn").bind('click', function () {
        $.get("/MilkFund/Logined?r=" + Math.random(), function (data) {
            if (data == "0") {
                //window.open("/login?ret=" + location.href, '洋码头奶粉基金', 'width=' + (window.screen.availWidth) + ',height=' + (window.screen.availHeight) + ',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
                if (confirm("您还未登录，请登录洋码头后再参加噢！")) {
                    location.href = "/login?ret=" + location.href;
                }
            } else {
                $.get("/MilkFund/CanApply?r=" + Math.random(), function (data) {
                    if (data == "0") {
                        layer.alert("#cannot");
                    }
                    else {
                        layer.alert("#content");
                    }
                });
            }
        });
        return false;
    });
    $('#submit').click(function () {
        $('#IntroducerId').val($('#TempIntroducerId').val());
        if (confirm('提交信息后不能修改哟，确定提交？') && verifyBaby()) {
            var options = {
                type: "POST",
                dataType: "text",
                success: function (r) {
                    if (r == ""||r=="<pre></pre>") {
                        layer.close();
                        layer.alert("#success");
                    } else {
                        alert(r);
                    }
                },
                error: function () {
                    alert("提交出错，请重新提交");
                }
            };
            $("#applyForm").ajaxSubmit(options);
        }
        return false;
    });
    $(".layer .shut").bind('click', function () {
        layer.close()
    });
    var _batchUploadButtonId = "#batch_file_upload";
    var _uploadActionUrl = "http://" + location.href.substr(7).substring(0, location.href.substr(7).indexOf("/")) + "/MilkFund/UploadPic";
    var _swfUrl = "http://static.ymatou.com/scripts/lib/uploadify/uploadify.swf";

    $(_batchUploadButtonId).uploadify({
        'formData': {
            'timestamp': '',
            'token': ''
        },
        'swf': _swfUrl,
        'uploader': _uploadActionUrl,
        'fileSizeLimit': '5000KB',
        'onUploadStart': function (file) {
            var imgcon = $('#imgbox');
            if (imgcon.find('.loading').size() > 0) {
                imgcon.find('.loading').show();
            } else {
                imgcon.append("<img src='http://static.ymatou.com/content/img/loading_16_16.gif' class='loading' />")
            }
        },
        'onUploadSuccess': function (file, data, response) {
            var imgcon = $('#imgbox'), span;
            span = imgcon.closest("li").find(".tip-err");
            if (data == "error") {
                span.find("span").html("上传失败");
                span.css('visibility', 'visible');
                alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
            }
            else {
                //$('#ProductPictureUrl' + index).val(data);
                $('#InfoPicUrl').val(data);
                imgcon.html("<img src='" + data + "' class='img' style='width: 100px'/>");
                span.css('visibility', 'hidden');
            }
        }
    });
}, true)
$('#collect').bind('click', function () {
    try {
        window.external.addFavorite(location.href, '洋码头奶粉基金');
    } catch (e) {
        try {
            window.sidebar.addPanel('洋码头奶粉基金', location.href, "");
        } catch (e) {
            alert("您的浏览器不支持自动加入收藏，请手动设置！", "提示信息");
        }
    }
})
function verifyBaby() {
    var bool = false;
    $("#content .sec-1 input,#imgbox").each(function () {
        var o = $(this), tip = $(this).closest("li").find(".tip-err");
        if (/input/i.test(o[0].tagName)) {
            if (!$(this).val()) {
                tip.css("visibility", "visible");
                bool = false;
                return;
            } else {
                if (o.attr("id") == "number") {
                    if (/^\d{3,4}-*\d{7,8}(\d{3,4})?$/.test(o.val())) {
                        tip.css("visibility", "hidden");
                        bool = true;
                    } else {
                        tip.css("visibility", "visible");
                        bool = false;
                        return;
                    }
                } else {
                    tip.css("visibility", "hidden");
                    bool = true;
                }
            }
        } else {
            if (o.find("img").size() == 0) {
                tip.css("visibility", "visible");
                bool = false;
                return;
            } else {
                tip.css("visibility", "hidden");
                bool = true;
            }
        }
    });    
    return bool;
}