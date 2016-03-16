/*=======================AddTopicWithDiscount.js===========================*/
/// <reference path="../Forum/models.js" />
/// <reference path="../Patterns/patterns.js" />
/// <reference path="~/Scripts/jquery-1.6.2.js" />
/// <reference path="~/Scripts/Lib/editor-min.js" />
/// <reference path="~/Scripts/Global.js" />

function View() {
    IObserver.call(this);
}
View.prototype.update = function (observer, msg) {
    //refresh discount items
    //    var divlist = j$('#divDiscountItemList');
    //    divlist.empty();
    //    divlist.append('<table><tbody>');
    //    j$.each(observer.DiscountItems, function (index, element) {
    //        divlist.append('');
    //    }); 
    jQuery("#divDiscountItemList").empty();
    jQuery("#DiscountItemTemplate").tmpl(observer.ActualModel.DiscountItems).appendTo("#divDiscountItemList");
    //    divlist.append('</tbody></table>');
};
var picinfo = "";

j$(document).ready(function () {
    //            KISSY.Editor("txtReview");

    KISSY.ready(function (s) {
        var ke = KISSY.Editor;
        var k = ke("#txtReview", { baseZIndex: 10000 }).use("enterkey,clipboard,elementpaths,preview,templates" +
                    ",separator,undo" +
                    ",separator,removeformat,font,format,forecolor,bgcolor" +
                    ",separator,list,indent,justify" +
                    ",separator,link,image,smiley" +
                    ",separator,table,resize,draft,pagebreak,separator,maximize"
                    );
        k.on("dataReady", function () {
            j$('input#bntCommentOK').click(function () {
                //j$('input#bntCommentOK').disable();
                j$('textarea#txtReview').val(k.getData());
                SetPicInfo();

                if (checkform()) {
                    var form = j$('#AddTopic');
                    //                    form.submit();
                    //var postdata = new TopicWithDiscountNewData();
                    var postdata = window.newdata.ActualModel;
                    postdata.TopicForum = j$('#sForum').val();
                    postdata.TopicType = j$('#sType').val();
                    postdata.TopicTitle = j$('#txtTitle').val();
                    postdata.TopicBody = j$('textarea#txtReview').val();
                    postdata.SellerUserId = j$('#SellerUserId').val();
                    postdata.SellerLoginId = j$('#SellerLoginId').val();
                    jQuery.post(form.attr('action'), j$.toJSON(postdata), function (data) {
                        if (data.success) {
                            window.location.href = data.redirect;
                        } else {
                            alert(data.message);
                            j$("#bntCommentOK").enable();
                            if (data.redirect && data.redirect != "") {
                                window.location.href = data.redirect;
                            }
                        }
                    }, 'json');
                }else {
                    j$('input#bntCommentOK').enable();
                }

                return true;
            });
        });
    });

    navTurn("#nav_brand");

    j$("#btnUploadPic").click(function () {
        var fileName = document.getElementById("fileUploadPic").value;
        var extName = fileName.substr(fileName.lastIndexOf('.') + 1).toUpperCase();
        if (extName == "JPG" || extName == "GIF" || extName == "BMP" || extName == "PNG") {
            var options = {
                type: "POST",
                dataType: "text",
                success: function (msg) {
                    if (msg == "failed") {
                        alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                    }
                    else {
                        var picname = document.getElementById("fileUploadPic").value;
                        picinfo = picinfo + picname + "*" + msg + "&";
                        j$(".ke-textarea-wrap iframe").contents().find("body").append("<br><img src=" + msg + " alt='pic'><br>");
                        var temp = msg.toString().substr(msg.toString().lastIndexOf('/') + 1);
                        j$("#Pics").append("<div id='" + temp + "' class='yq_div'><img src='" + msg + "' width='130' style='margin-bottom:-6px' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='添加' onclick=\"InsertPic('" + msg + "')\" class='yq_btn'>&nbsp;&nbsp;<input type='button' value='删除' onclick=\"DelPic('" + msg + "','" + temp + "','" + picname + "')\" class='yq_btn'></div>");
                    }
                },
                error: function () {
                    alert("图片上传异常，请重新选择较小的图片上传。");
                    j$("#btnUploadPic").attr("value", "重新上传");
                    j$(this).enable();
                }
            };
            j$("#picForm").ajaxSubmit(options);
            return false;
        }
        else {
            alert("请上传后缀名为jpg、gif或者bmp的图片文件");
            return false;
        }
    });
    j$("#btnUploadPic").ajaxStart(function () {
        j$(this).attr("value", "正在上传");
        j$(this).attr("disabled", "true");
    });
    j$("#btnUploadPic").ajaxSuccess(function () {
        j$(this).attr("value", "继续上传");
        j$(this).enable();
    });

    //            j$("#bntCommentOK").click(function () {



    //            });



});


function InsertPic(url) {
    j$(".ke-textarea-wrap iframe").contents().find("body").append("<br><img src=" + url + " alt='pic'><br>");
};

function DelPic(url, divid, picname) {
    var delpicinfo = picname + ":" + url + "&";
    picinfo = picinfo.replace(delpicinfo, "");
    var deldiv = document.getElementById(divid);
    if (deldiv) {
        deldiv.parentNode.removeChild(deldiv);
    }
    j$(".ke-textarea-wrap iframe").contents().find("body img[src='" + url + "']").remove();
};

function SetPicInfo() {
    var t = document.getElementById("PicInfo");
    t.value = picinfo;
};

function checkform() {
    
    if (IsLog() == "0") {
        alert("请先登录。如果需要请点击“立即保存”按钮，保存您的帖子，以便以后恢复。");
        j$("#bntCommentOK").enable();
        return false;
    }
    if (j$("#sForum").val() == "0") {
        alert("请选择板块");
        j$("#bntCommentOK").enable();
        return false;
    }
    if (j$("#sType").val() == "0") {
        alert("请选择类别");
        j$("#bntCommentOK").enable();
        return false;
    }
    if (document.getElementById("txtTitle").value == "" || j$("textarea#txtReview").val() == "") {
        alert("请填写标题和内容。");
        j$("#bntCommentOK").enable();
        return false;
    }
    if (document.getElementById("txtTitle").value.length < 8 || j$("textarea#txtReview").val().replace("<br />", "").replace("<p>", "").replace("</p>", "").length < 8) {
        alert("标题或内容太短了。");
        j$("#bntCommentOK").enable();
        return false;
    }

    j$("#sf").val(j$("#sForum").val());
    j$("#st").val(j$("#sType").val());

    var frm = j$("form#AddTopic");
    //    j$.ymatoupost(frm.attr("action"), frm.serialize(), function (data) {
    //        if (data.substring(0, 2) == "消息")
    //            alert(data);
    //        else
    //            self.location = data;
    //    });

    return true;
};

function IsLog() {
    var result = "";
    j$.ajax({
        type: "POST",
        url: "/ajax/islog",
        dataType: "text",
        async: false,
        success: function (msg) {
            result = msg;
        }
    });
    return result;
};

j$(function () {
    window.newdata = new Model();
    // 注册观察者
    window.newdata.addObserver(new View);


    j$('#buttonAddDiscountItem').live('click', function () {
        var divform = j$('#divDiscount *');
        var item = divform.serializeObject();
        var postdata = j$.toJSON(item);
        //        j$.post('/Topic/AddDiscountItemRun', postdata, function (data) {
        //            if (data.success) {
        //                alert('添加成功');
        //            } else {
        //                alert(data.message);
        //            }
        //        }, 'json');
        j$.post("/Topic/ValidateNewDiscountItem", postdata, function (data) {
            if (data.success == '1') {
                newdata.AddDiscountItem(item.ProductName, item.OfficalPrice, item.ProductUrl, item.ProductPictureUrl);
                j$('#divNewDiscount').show();
                j$('#divNewDiscountStep2').hide();
                //j$('#divNewDiscount input[type="file"]').val('');
                j$('#divNewDiscount input[type="file"]').replaceWith('<INPUT id=UploadProductPictureUrl name=UploadProductPictureUrl value="" type=file>');
                j$('#divNewDiscountStep2 input[type="text"]').val('');
            } else {
                alert(data.message);
            }
        }, 'json');
    });
    j$('.buttonRemoveDiscountItem').live('click', function () {
        var id = j$(this).attr('data');
        window.newdata.RemoveDiscountItem(id);
    });
    j$('#buttonUploadDiscountPicture').live('click', function () {
        var fileName = j$('#UploadProductPictureUrl').val();
        var extName = fileName.substr(fileName.lastIndexOf('.') + 1).toUpperCase();
        if (extName == "JPG" || extName == "GIF" || extName == "BMP" || extName == "PNG") {
            var options = {
                type: "POST",
                dataType: "text",
                success: function (msg) {
                    if (msg == "failed") {
                        alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                    }
                    else {
                        alert('上传图片成功');
                        j$('#imgProductPictureUrl').attr('src', msg);
                        j$('#divNewDiscountStep2 [name=ProductPictureUrl]').val(msg);
                        j$('#divNewDiscountStep2').show();
                        j$('#divNewDiscount').hide();
                        //                        var picname = j$('#ProductPictureUrl').val();
                        //                        picinfo = picinfo + picname + "*" + msg + "&";
                        //                        j$(".ke-textarea-wrap iframe").contents().find("body").append("<br><img src=" + msg + " alt='pic'><br>");
                        //                        var temp = msg.toString().substr(msg.toString().lastIndexOf('/') + 1);
                        //                        j$("#Pics").append("<div id='" + temp + "' class='yq_div'><img src='" + msg + "' width='130' style='margin-bottom:-6px' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='添加' onclick=\"InsertPic('" + msg + "')\" class='yq_btn'>&nbsp;&nbsp;<input type='button' value='删除' onclick=\"DelPic('" + msg + "','" + temp + "','" + picname + "')\" class='yq_btn'></div>");
                    }
                },
                error: function () {
                    alert("图片上传异常，请重新选择较小的图片上传。");
                    //                    j$("#btnUploadPic").attr("value", "重新上传");
                    //                    j$(this).enable();
                }
            };
            j$("#picFormDiscount").ajaxSubmit(options);
            return false;
        }
        else {
            alert("请上传后缀名为jpg、gif或者bmp的图片文件");
        }
        return false;
    });
    j$('.buttonResetNewDiscountItem').click(function () {
       
        j$('#divNewDiscount').show();
        j$('#divNewDiscountStep2').hide();
        //j$('#divNewDiscount input[type="file"]').val('');
        j$('#divNewDiscount input[type="file"]').replaceWith('<INPUT id=UploadProductPictureUrl name=UploadProductPictureUrl value="" type=file>');
        j$('#divNewDiscountStep2 input[type="text"]').val('');
    });
});
