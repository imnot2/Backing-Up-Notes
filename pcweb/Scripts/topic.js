/*=======================topic.js===========================*/
j$(function () {
    //    j$(".ireviewbt").live("click", function() {
    //        var $box = j$(this).parent(".c_action");
    //        if (!$box.next().is(".irevwbox")) {
    //            j$(this).addClass("ifavbt_hover");
    //            $box.after("<div class='irevwbox'><textarea class='irev_textarea'></textarea><div class='ibntBox'><img class='irloading hidden' src='http://img.ymatou.com/portal/images/ajaxload.gif' /><a class='icombnt mt_button ui-state-default ui-corner-all'>加上去吧</a><a class='icomclo mt_button ui-state-default ui-corner-all mt_button-end'>取消</a></div>");
    //        }
    //    });
    //    j$(".icombnt").live("click", function() {
    //        var repid = j$(this).closest(".comment").attr("id");
    //        var text = j$(this).closest(".irevwbox").children(".irev_textarea").val();
    //        var userid = j$.cookie("userGUID");
    //        j$.ajax({
    //            url: "Review.aspx/iReComm",
    //            data: "{'repid':'" + id + "',text:'" + text + "','userid':'" + userid + "'}",
    //            msg: repid,
    //            ajaxSend: function() {
    //                j$(this).prev(".irloading").show();
    //            },
    //            success: function(m) {
    //                var val = ConvertJson(m);
    //                var html = "<div class='comment cl'>" +
    //                    "<div class='com_prop gray'>" + val.floor + "楼 <a class='link'>" + val.user + "</a> " + val.time + "</div>" +
    //                    val.text +
    //                    "<div class='c_action'>" +
    //                        "<a class='ifavbt favbt-top ireviewbt' href='javascript:void(0);'>回应</a>" +
    //                        "<a class='ifavbt' href='javascript:void(0);'>顶(0)</a>" +
    //                        "<a class='ifavbt' href='javascript:void(0);'>拍(0)</a>" +
    //                        "<a class='ireport' href='javascript:void(0);'>举报</a>" +
    //                    "</div>" +
    //                    "</div>"
    //                j$("#com_" + this.msg).append(html);
    //            }
    //        });
    //    });
    //    j$(".icomclo").live("click", function() {
    //        var $irevwbox = j$(this).closest(".irevwbox");
    //        $irevwbox.prev(".c_action").children(".ireviewbt").removeClass("ifavbt_hover");
    //        $irevwbox.remove();
    //    });

    //    j$(".peakbt").live("click", function() {
    //        var repid = j$(this).closest(".comment").attr("id");
    //        var userid = j$.cookie("userGUID");
    //        var $figure = j$(this).children("span");
    //        j$.ajax({
    
    //            url: "Review.aspx/peakComm",
    //            data: "{'repid':'" + id + "','userid':'" + userid + "'}",
    //            msg: repid,
    //            ajaxSend: function() {
    //                j$(this).prev(".irloading").show();
    //            },
    //            success: function(m) {
    //                var val = ConvertJson(m);
    //                if (val.bool) {
    //                    $figure.text(parseInt(j$(this).text()) + 1);
    //                } else {
    //                    alert(val.msg);
    //                }
    //            }
    //        });
    //    });
    j$(".ifavbt").click(function () {
        var obj = j$(this).closest(".ttpic");
        var txt = obj.children("div.ttpic_txt").text();
        var user = obj.children("a.fw").text();
//        j$(".ks-editor-content iframe").contents().find("body").append(user + "：" + txt + "<br />------------------------------------------------------------------<br /><br />");
        j$(".ks-editor-content iframe").contents().find("body").append('<div class="ttpic_rel">回复<a class="link">' + user + '</a>发表的：<br />' + txt + '</div>');
        var postId = obj.children("input[type='hidden']").val();
        j$("input#quotePostId").val(postId);
    });

    m5ul = j$("ul#pfixp");
    m5num = j$("li", m5ul).length - 6;
    run_m5ul();
    m5ul.hover(function () {
        m5ul.stop();
    }, function () {
        run_m5ul();
    });
});
var m5ul;
var m5num;
var run_m5ul = function () {
    m5ul.animate({ top: -m5num * 52 }, m5num * 1500, function () {
        m5ul.animate({ top: 0 }, m5num * 1500, run_m5ul);
    });
}
