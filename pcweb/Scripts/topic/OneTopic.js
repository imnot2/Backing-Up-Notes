/*=======================OneTopic.js===========================*/
var picinfo = "";
j$(document).ready(function () {

    j$("button#collect").click(function () {
        j$.ajax({
            type: "GET",
            url: j$(this).attr("href"),
            global: false,
            success: function (data) {
                if (data.msg == 0)
                    j$("button#collect").replaceWith("<button class=\"ui_btn\" disabled=\"disabled\" style=\"position: absolute; top: 0; right: 160px; width:76px; height:30px; margin-top:-1px \" >已经收藏</button>");
            },
            error: function () {
                alert("响应失败");
            }
        });
    });

    j$(".ttpic_txt a").attr("target", "_blank");

    j$(".btnrep").click(function () {
        var logindId = j$("#loginId").val();
        var topicid = document.getElementById("topicId").value;
        var repTime = j$(this).closest(".ttpic_f").html().replace("发布于", "");
        repTime = repTime.substr(0, repTime.indexOf("<"));
        var obj = j$(this).closest(".ttpic_f").closest(".ttpic");
        var txtDiv = obj.find("div.ttpic_txt");
        var floorA = txtDiv.find("a.ttpic_floor")[0];
        var perpUrl = txtDiv.find("input.proUrl").val();
        var postId = j$(floorA).attr("id").replace("floor", "");



        if (logindId == "") {
            self.location = "/login?ret=" + encodeURIComponent("/topic/t_" + topicid + "#floor" + postId);
        }
        else {
            //                var Addrep = document.getElementById("yq_Addrep");
            var response = document.getElementById("returnbox");
            //                Addrep.style.display = "none";
            response.style.position = "static";
            document.getElementById("returnbox").scrollIntoView();
            var tttclone = obj.find("div.ke-post").clone();
            j$("div.ttpic_rel", tttclone).remove();
            var txt = tttclone.html();
            var user = obj.find("a.fw").text();
            //j$("#repMsg").html("<span style='color:Gray'>回复" + j$(floorA).html() + user + "：</span>&nbsp;&nbsp;&nbsp;<a class='link' onclick='DelRep()'>取消</a>");
            j$("#repContent").val('<div class="ttpic_rel">回复<a class="link" target="_blank" href="/topic/tp_' + topicid + '?pid=' + postId + '">' + j$(floorA).html() + '</a><a target="_blank" href="' + perpUrl + '" class="link">' + user + '</a>于' + repTime + '的发言：<br />' + txt + '</div><br />');
            //                    j$(".ke-textarea-wrap iframe").contents().find("body").append('<div class="ttpic_rel">回复<a class="link" href="/topic/tp_' + topicid + '?pid=' + postId + '">' + j$(floorA).html() + '</a><a class="link">' + user + '</a>发表的：<br />' + txt + '</div><br />');
            //                    var postId = obj.children("input[type='hidden']").val();
            j$("input#quotePostId").val(postId);
            j$("div#repMsgBox").html("[quote]回复 <span style='color:Blue'>" + j$(floorA).html() + user + "</span> 于" + repTime + "的发言...[quote]&nbsp;&nbsp;<a class='link' onclick='DelRep()'>取消</a>");
        }
    });

   

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
                        j$("#Pics").append("<div id='" + temp + "' class='yq_div'><img src='" + msg + "' width='100' /><input type='button' value='添加' onclick=\"InsertPic('" + msg + "')\" class='yq_btn'><input type='button' value='删除' onclick=\"DelPic('" + msg + "','" + temp + "','" + picname + "')\" class='yq_btn'></div>");
                    }
                },
                error: function () {
                    alert("图片上传异常，请重新选择较小的图片上传。");
                    j$("#btnUploadPic").attr("value", "重新上传");
                    j$(this).removeAttr("disabled");
                }
            };
            j$("#picForm").ajaxSubmit(options);
            return false;
        }
        else {
            alert("请上传后缀名为jpg、gif或者bmp的图片文件");
        }
    });
    j$("#btnUploadPic").ajaxStart(function () {
        j$(this).attr("value", "正在上传");
        j$(this).attr("disabled", "true");
    });
    j$("#btnUploadPic").ajaxSuccess(function () {
        j$(this).attr("value", "继续上传");
        j$(this).removeAttr("disabled");
    });

    j$("#btnGo").click(function () {
        var goForumTag = j$("#sGoForum").val();
        if (goForumTag == "0") {
            alert("请选择板块");
        }
        else {
            window.location.href = "/forum/f_" + goForumTag;
        }
    });

    j$("#btnGoPageTop").click(function () {
        window.location.href = j$("#pageLink").val() + "page=" + j$("#goPageTop").val();
    });

    j$("#btnGoPageBottom").click(function () {
        window.location.href = j$("#pageLink").val() + "page=" + j$("#goPageBottom").val();
    });

    j$("#topAll").click(function () {
        window.location.href = "/topic/top?t=" + j$("#topicId").val() + "&c=" + encodeURIComponent(j$("#stopColor").val()) + "&ts=all";
    });
    j$("#topOne").click(function () {
        window.location.href = "/topic/top?t=" + j$("#topicId").val() + "&c=" + encodeURIComponent(j$("#stopColor").val()) + "&ts=one";
    });
    j$("#addScore").click(function () {
        window.location.href = "/topic/addscore?t=" + j$("#topicId").val() + "&s=" + j$("#saddScore").val();
    });
    j$("#moveToForum").click(function () {
        if (j$("#sForum").val() == "0") {
            alert("请选择板块");
            return false;
        }
        if (j$("#sType").val() == "0") {
            alert("请选择分类");
            return false;
        }
        window.location.href = "/topic/cforum?t=" + j$("#topicId").val() + "&f=" + j$("#sForum").val() + "&tt=" + j$("#sType").val();
    });

    function goUrl() {
        var url = $('#gotourl').val();
        window.location = url;
    }
    j$("#sForum").change(function () {
        if (j$(this).val() == 0) {
            var selectElement = document.getElementById("sType");
            selectElement.selectedIndex = 0;
            selectElement.disabled = true;
            return false;
        }
        FillTypes(j$(this).val());
    });
    j$("#setGood").click(function () {
        window.location.href = "/topic/setgood?t=" + j$("#topicId").val() + "&k=s";
    });
    j$("#cancleGood").click(function () {
        window.location.href = "/topic/setgood?t=" + j$("#topicId").val() + "&k=c";
    });
    j$("#addNewTopic").click(function () {
        gotoUrl("/topic/add/f_" + j$("#cForumId").val());
    });
    j$(".btnReply").click(function () {
        var logindId = j$("#loginId").val();
        var topicid = document.getElementById("topicId").value;
        if (logindId == "") {
            self.location = "/login?ret=" + encodeURIComponent("/topic/t_" + topicid + "#reply");
        }
        else {
            window.location.href = "#reply";
        }
    });
    j$("#replyMain").click(function () {
        var logindId = j$("#loginId").val();
        var topicid = document.getElementById("topicId").value;
        if (logindId == "") {
            self.location = "/login?ret=" + encodeURIComponent("/topic/t_" + topicid + "#reply");
        }
        else {
            window.location.href = "#reply";
        }
    });
});
var commentClicked = false;

function FillTypes(o) {
    if (o != 0) {
        var selectElement = document.getElementById("sType");
        for (var i = selectElement.options.length - 1; i > 0; i--) {
            selectElement.remove(i);
        }
        j$.ajax({
            type: "GET",
            url: "/ajax/getforumtypes",
            data: "f=" + o,
            dataType: "json",
            success: function (msg) {
                if (msg.length > 0) {
                    selectElement.disabled = false;
                    for (var i = 0; i < msg.length; i++) {
                        selectElement.options.add(new Option(msg[i].Value, msg[i].Key));
                    }
                }
            }
        });
    }
    else {
        selectElement.disabled = true;
        return false;
    }
}

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

function DelRep() {
    j$("div#repMsgBox").html("");
    j$("#repContent").val("");
    j$("input#quotePostId").val("0");
}

function SetPicInfo() {
    var t = document.getElementById("PicInfo");
    t.value = picinfo;
};

function checkLog() {
    var logindId = j$("#loginId").val();
    if (logindId == "") {
        alert("请先登录。如果需要请点击“立即保存”按钮，保存您的帖子，以便以后恢复。");
        return false;
    }
    else {
        var result = IsLog();
        if (result == "0") {
            alert("请先登录。如果需要请点击“立即保存”按钮，保存您的帖子，以便以后恢复。");
            return false;
        }
    }
}

function checkform() {
    var logindId = j$("#loginId").val();
    var allTxt = j$("textarea#txtReview").val();
    if (logindId == "") {
        alert("请先登录。如果需要请点击“立即保存”按钮，保存您的帖子，以便以后恢复。");
        j$("#btnCommentOK").removeAttr("disabled");
        return false;
    }
    if (IsLog() == "0") {
        alert("请先登录。如果需要请点击“立即保存”按钮，保存您的帖子，以便以后恢复。");
        j$("#btnCommentOK").removeAttr("disabled");
        return false;
    }
    if (allTxt == "") {
        alert("请不要无声的回应。");
        j$("#btnCommentOK").removeAttr("disabled");
        return false;
    }
    if (allTxt.replace("<br />", "").replace("<p>", "").replace("</p>", "").length < 2) {
        alert("回应内容太短了。");
        j$("#btnCommentOK").removeAttr("disabled");
        return false;
    }
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


function checkDel(postId, topicId, forumID, forumTag) {
    if (confirm("确定删除？")) {
        window.location.href = "/Topic/DelPost?PostId=" + postId + "&TopicId=" + topicId + "&ForumID=" + forumID + "&ForumTag=" + forumTag;
    }
}

function checkRep(postId, topicId, forumID, forumTag) {
    if (confirm("确定删除？")) {
        window.location.href = "/Topic/DelPost?PostId=" + postId + "&TopicId=" + topicId + "&ForumID=" + forumID + "&ForumTag=" + forumTag;
    }
}
 
j$(function () {
    j$('[id=buttonOrderTool]').click(function () {
        j$('#WinTradDialog').dialog('open');
        //AttentionDialog("#WinTradDialog", "#PadB");
    });

    j$('.buyFromTopic').click(function () {
        if (isUser) {
            var outDiv = j$(this).parent();
            var sellerUserId = j$(outDiv).find('.orderSellerId').val();
            var topicId = j$('input#OrderToolTopicId').val();
            window.open('/buyer/order/ordertool-for-' + sellerUserId + '?topicId=' + topicId);
        }
        else {
            alert('您是买手，不能下单。');
        }
    });
 
});

function isUser() {
    var type = j$('#CurrentUserType').val();
    return type == UserType.Normal;
}

