/*=======================OneZKTopic.js===========================*/
function changeOrderPage(p) {
    var opTopicId = $('#opTopicId').val();
    var opPageIndex = $('#opPageIndex').val();
    var opPageCount = $('#opPageCount').val();
    var newPage = parseInt(opPageIndex) + p;
    if (newPage < 1) {
        newPage = 1;
    }
    if (newPage > opPageCount) {
        newPage = opPageCount;
    }
    $('#orderProductsDiv').load('/Topic/TopicOrders?page=' + newPage + '&topicId=' + opTopicId);
}

$(function () {
    Ymt.load("widget.BackToTop", function () {
        Ymt.widget.BackToTop();
    },true)
    function toggleClass() {
        this.containter = $('#floatmodule');
        this.panel = this.containter.find('.bd');
        var option = this.option = {
            toggle: this.containter.find('.toggle'),
            closecls:this.containter.find('.btn-shut'),
            width: this.panel.width(),
            height: this.panel.height(),
            minWidth: 0,
            time: 1000,
            bool: false,
            closed: false,
            offset: this.panel.offset()
        }, that = this;
        option.toggle.bind('click', function () {
            option.bool = !option.bool;
            option.bool ? that.open(1) : that.close();
        })
        option.closecls.bind('click', function () {
            option.bool = false;
            that.close();
        })
        this.sco = function () {
            var _t = that, option = _t.option, sctop = $(this).scrollTop(), bd = _t.panel;
            function toggle(option,bd) {
                option.bool = false;
                option.closed && _t.open(1);
                option.closecls.css({ visibility: 'hidden' })
                bd.css({ position: 'static', overflow: 'visible' });
                bd.next('.bt').css({ marginTop: 0 })
            }
            if (sctop == 0) {
                toggle(option, bd);
                return
            } else {
                if (sctop >= option.offset.top + option.height) {
                    !option.closed && _t.close();
                    bd.css({ position: 'absolute', top: sctop, backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 10000, filter: "progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#eeffffff', EndColorStr='#eeffffff')" });
                    option.toggle.css({ left: option.offset.left - option.toggle.width(), top: sctop })
                    bd.next('.bt').css({ marginTop: option.height })
                } else {
                    toggle(option, bd);
                }
                bd.css({ overflow: 'hidden'})
            }
        }
    }
    toggleClass.prototype = {
        open: function (t) {
            var option = this.option;
            this.panel.css({ border: '1px solid #E2E2E2',borderTop:0 }).animate({ width: option.width }, t || option.time, function () {
                option.toggle.css('visibility', 'hidden');
            });
            if (option.closed) {
                option.closecls.css({visibility: 'visible'})
            }
            option.closed = false;
        },
        close: function (t) {
            var option = this.option, that = this;
            !option.bool && this.panel.animate({ width: option.minWidth }, t || option.time, function () {
                option.toggle.css({ visibility: 'visible' });
                that.panel.css({ border: '0' });
            });
            option.closed = true;
        }
    }
    var tog = new toggleClass();
    $(window).scroll(tog.sco)
    $('#discussContainer .aimg').live('mouseenter', function () {
        $(this).closest('.item').find('.text_hidden').css({ 'left': 85, 'top': 10 }).show();
        return false;
    });
    $('#discussContainer .aimg').live('mouseleave', function () {
        $(this).closest('.item').find('.text_hidden').hide();
        return false;
    });
    $('#discussContainer .text_hidden').live('mouseenter', function () {
        $(this).show();
        return false;
    });
    $('#discussContainer .text_hidden').live('mouseleave', function () {
        $(this).hide();
        return false;
    });


    $(".btnzkrep").click(function () {
        var logindId = $("#loginId").val();
        var topicid = document.getElementById("topicId").value;
        var repTime = $(this).next().val();
        var obj = $(this).closest(".ttpic");
        var floorNum = $(this).parent().find(".floorNum").val();
        var perpUrl = $(this).parent().find(".proUrl").val();
        var postId = $(this).parent().find(".replyPostId").val();
        if (logindId == "0") {
            self.location = "/login?ret=" + encodeURIComponent("/topic/t_" + topicid + "#floor" + postId);
        }
        else {
            //                var Addrep = document.getElementById("yq_Addrep");
            var response = document.getElementById("returnbox");
            //                Addrep.style.display = "none";
            response.style.position = "static";
            document.getElementById("returnbox").scrollIntoView();
            var tttclone = obj.find("div.ke-post").clone();
            $("div.ttpic_rel", tttclone).remove();
            var txt = tttclone.html();
            var user = obj.find(".replierName").text();
            $("#repContent").val('<div class="ttpic_rel">回复<a class="link" target="_blank" href="/topic/tp_' + topicid + '?pid=' + postId + '">#' + floorNum + '</a><a target="_blank" href="' + perpUrl + '" class="link">' + user + '</a>于' + repTime + '的发言：<br />' + txt + '</div><br />');
            $("input#quotePostId").val(postId);
            $("div#repMsgBox").html("[quote]回复 <span style='color:Blue'>#" + floorNum + user + "</span> 于" + repTime + "的发言...[quote]&nbsp;&nbsp;<a class='link' onclick='DelRep()'>取消</a>");
        }
    });
});

