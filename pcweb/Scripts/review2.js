/*=======================review2.js===========================*/
j$(function () {
    j$(".ireviewbt").live("click", function () {
        var $box = j$(this).parent(".c_action");
        if (!$box.next().is(".irevwbox")) {
            j$(this).addClass("ifavbt_hover");
            $box.after("<div class='irevwbox'><textarea class='irev_textarea'></textarea><div class='ibntBox'><img class='irloading hidden' src='http://img.ymatou.com/portal/images/ajaxload.gif' /><a class='icombnt mt_button ui-state-default ui-corner-all'>加上去吧</a><a class='icomclo mt_button ui-state-default ui-corner-all mt_button-end'>取消</a></div>");
        }
    });
    j$(".icombnt").live("click", function () {
        var repid = j$(this).closest(".comment").attr("id");
        var text = j$(this).closest(".irevwbox").children(".irev_textarea").val();
        var userid = j$.cookie("userGUID");
        j$.ajax({
            type: "POST",
            url: "Review.aspx/iReComm",
            data: j$.toJSON({ 'repid': id, 'text': text, 'userid': userid }),
            msg: repid,
            ajaxSend: function () {
                j$(this).prev(".irloading").show();
            },
            success: function (m) {
                var val = ConvertJson(m);
                var html = "<div class='comment cl'>" +
                    "<div class='com_prop gray'>" + val.floor + "楼 <a class='link'>" + val.user + "</a> " + val.time + "</div>" +
                    val.text +
                    "<div class='c_action'>" +
                        "<a class='ifavbt favbt-top ireviewbt' href='javascript:void(0);'>回应</a>" +
                        "<a class='ifavbt' href='javascript:void(0);'>顶(0)</a>" +
                        "<a class='ifavbt' href='javascript:void(0);'>拍(0)</a>" +
                        "<a class='ireport' href='javascript:void(0);'>举报</a>" +
                    "</div>" +
                    "</div>"
                j$("#com_" + this.msg).append(html);
            }
        });
    });
    j$(".icomclo").live("click", function () {
        var $irevwbox = j$(this).closest(".irevwbox");
        $irevwbox.prev(".c_action").children(".ireviewbt").removeClass("ifavbt_hover");
        $irevwbox.remove();
    });

    j$(".peakbt").live("click", function () {
        var repid = j$(this).closest(".comment").attr("id");
        var userid = j$.cookie("userGUID");
        var $figure = j$(this).children("span");
        j$.ajax({
            type: "POST",
            url: "Review.aspx/peakComm",
            data: j$.toJSON({ 'repid': id, 'userid': userid }),
            msg: repid,
            ajaxSend: function () {
                j$(this).prev(".irloading").show();
            },
            success: function (m) {
                var val = ConvertJson(m);
                if (val.bool) {
                    $figure.text(parseInt(j$(this).text()) + 1);
                } else {
                    alert(val.msg);
                }
            }
        });
    });
    j$(".beatbt").live("click", function () {

    });
})
