(function () {
    var struc;
    Ymt.load('widget/LayerBox', function () {
        struc = Ymt.widget.LayerBox('struc', {
            isloc: true
        });
        function CloseBox() {
            struc.close();
        }

        function deleteComment(commentId, obj) {

            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                url: "/App/AppComment/DeleteComment",
                data: JSON.stringify({ commentId: commentId }),
                type: 'post',
                success: function (data) {
                    if (data.Result == "success") {
                        $("#alert_box_ok_msg").text("删除成功");
                        struc.alert("#alert_box_ok");
                        if ($(obj).parents("table").children().children().length < 2) {
                            window.location.reload();
                        } else {
                            $(obj).closest("table").closest("tr").remove();
                        }
                    }
                }
            })



            //$.post("/App/AppComment/DeleteComment", JSON.stringify({ commentId: commentId }), function (data) {
         
            //}, "json");
        }

        $(function () {
            $(".action_reply").click(function () {
                var currentTd = $(this).closest("td");
                var commentId = $(this).closest("td").find("input[name=commentId]").val();
                var content = $(this).closest("table").find("textarea").val();
                if (content.length > 140) {
                    alert("对不起，你输入的内容超过了140个字符!");
                    return false;
                }
               
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    url: "/App/AppComment/ReplyComment",
                    data: JSON.stringify({ commentId: commentId, content: content }),
                    type: 'post',
                    success: function (data) {
                        if (data.result == "success") {
                            $("#alert_box_ok_msg").text("回复成功");
                            struc.alert("#alert_box_ok");
                            currentTd.empty();
                            currentTd.closest("table").find("textarea").remove();
                            currentTd.text(content);
                            currentTd.closest("tr").prev("tr").find("td:eq(1)").empty();
                        }
                        if (data.result == "fail") {
                            $("#alert_box_ok_msg").text("回复内容不能为空");
                            struc.alert("#alert_box_ok");
                        }
                    }

                })
                //$.post("/App/AppComment/ReplyComment", JSON.stringify({ commentId: commentId, content: content }), function (data) {
                    
                //}, "json");
            });

            //把用户增加到黑名单
            $(".action_AddBlacklist").click(function () {
                $("#hdd_index").val($(this).attr("id").split('_')[1]);
                $("#ckb_isDeleteCommt").attr("checked", false);
                struc.alert("#selectBox");
            });

            $('#btn_AddBlackList-shut').click(function () {
                CloseBox();
            })
            $('#btn_CancelBlackList').click(function () {
                CloseBox();
            })
            var btn_AddBlackList = $("#btn_AddBlackList");
            if (btn_AddBlackList) {
                btn_AddBlackList.click(function () {
                    CloseBox();
                    var index = $("#hdd_index").val();
                    var userId = $("#userId_" + index).val();
                    var isDeleteComment = $("#ckb_isDeleteCommt").attr("checked");

                    $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        url: "/App/AppBlacklist/AddBlacklist",
                        data: JSON.stringify({ "userId": userId, "isDeleteComment": isDeleteComment }),
                        type: 'post',
                        success: function (data) {
                            if (data.Result == "success") {
                                $("#alert_box_ok_msg").text("已屏蔽" + $("#userName_" + index).val() + "的评论");
                                struc.alert("#alert_box_ok");
                                if (isDeleteComment) {
                                    window.location.reload();
                                }
                            }
                        }
                    })

                    //$.post("/App/AppBlacklist/AddBlacklist", JSON.stringify({ "userId": userId, "isDeleteComment": isDeleteComment }), function (data) {

                    //}, "json");
                })
            }
            //删除
            $('.action_deleteComment').each(function (index, item) {
                $(item).click(function () {
                    var commentId = this.getAttribute('data-id');
                    deleteComment(commentId, this);                   
                })
            })

        });

        function showMessage(commentId) {
            var counter = $("#txtContent_" + commentId + "").val().length; //获取文本域的字符串长度

            $("#spanMessage_" + commentId + "").text(counter + "/140");
            $(document).keyup(function () {
                var text = $("#txtContent_" + commentId + "").val();
                var counter2 = text.length;
                if (counter2 >= 140) {
                    var num = $("#txtContent_" + commentId + "").val().substr(0, 140);
                    $("#txtContent_" + commentId + "").val(num);
                }
                $("#spanMessage_" + commentId + "").text(counter2 + "/140");    //每次减去字符长度
            });
            $("#spanMessage_" + commentId + "").css("visibility", "visible");
        }

        function hiddenMessage(commentId) {
            //$("#spanMessage_" + commentId).css("visibility", "hidden");
        }
    });

    $().ready(function () {
        //把url中搜索关键字赋值给文本框
        var keyword = $.query.get('keyword');
        if (keyword === true || keyword == "") {
            $("#txtKeyword").attr("value", "");
        } else {
            $("#txtKeyword").attr("value", keyword);
        }

        //搜索关键字的类型
        var keywordType = $.query.get('type');
        if (keywordType === true) {//url中有type参数，但值为空
            //alert("url中有type参数，但值为空");
            $("#ddlKeywordType").val("");
        }
        else {
            //alert("url中有type参数,其值为：" + keywordType);
            $("#ddlKeywordType").val(keywordType);
        }

        //搜索关键字的类型

        var commentState = $.query.get('commentState');
        if (commentState === true) {//url中有type参数，但值为空
            //alert("url中有commentState参数，但值为空");
            $("#ddlCommentState").val("");
        }
        else {
            //alert("url中有commentState参数,其值为：" + commentState);
            $("#ddlCommentState").val(commentState);
        }

        $("#ddlCommentState").change(function () {
            //alert("触发了onchange事件");
            //alert("你选中了【" + $("#ddlCommentState  option:selected").text() + "】");
            var curCommentState = $("#ddlCommentState  option:selected").val();
            var curKeyword = $("#txtKeyword").val();
            var curKeywordType = $("#ddlKeywordType  option:selected").val();

            var targetUrl = "/App/AppComment/SearchComments?keyword=" + curKeyword + "&type=" + curKeywordType + "&commentType=" + commentType + "&commentState=" + curCommentState;
            //alert(targetUrl);
            window.location.href = targetUrl;
            alert(window.local.href);
        }); //end onChange


    });
})()