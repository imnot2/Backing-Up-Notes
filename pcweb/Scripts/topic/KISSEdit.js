/*=======================KISSEdit.js===========================*/
j$(document).ready(function () {
    KISSY.ready(function (S) {
        var KE = KISSY.Editor;
        var k = KE("#txtReview", { baseZIndex: 10000 }).use("enterkey,clipboard,elementpaths,preview,templates" +
                    ",separator,undo" +
                    ",separator,removeformat,font,format,forecolor,bgcolor" +
                    ",separator,list,indent,justify" +
                    ",separator,link,image,smiley" +
                    ",separator,table,resize,draft,pagebreak,separator,maximize"
                    );
        k.on("dataReady", function () {
            j$('#btnCommentOK').click(function () {
                if (commentClicked)
                    return;
                commentClicked = true;

                if ($('#activeOrNot').val() == "1") {
                    //正常未激活

                    gotoUrl('/UserProfile/CompleteLoginInfo');
                    commentClicked = false;
                    // location.href = '/UserProfile/CompleteLoginInfo';
                }
                else {
                    var btn = j$(arguments[0].target);
                    btn.val("提交中...");

                    SetPicInfo();
                    j$('textarea#txtReview').val(j$("#repContent").val() + k.getData());
                    if (checkform(this) == false) {
                        btn.val("发表回复");
                        commentClicked = false;
                        return false;
                    }

                    var frm = j$("form#AddReply");
                    j$.ymatoupost(frm.attr("action"), frm.serialize(), function (data) {
                        btn.val("发表回复");
                        commentClicked = false;
                        if (data.success == "1") {
                            self.location = data.redirect;
                        } else {
                            alert(data.message);
                        }
                        //                        if (data.substring(0, 2) == "消息") {
                        //                            alert(data);
                        //                        }
                        //                        else {
                        //                            //                                var now = new Date;
                        //                            //                                var hour = now.getHours();
                        //                            //                                var minute = now.getMinutes();
                        //                            //                                var second = now.getSeconds();
                        //                            //                                var s = hour + minute + second;

                        //                            self.location = data; // +"&t=" + s;
                        //                        }
                    });

                    return true;
                }
            });
            j$("div.ke-editor-tools").after("<div id='repMsgBox' style='color:Gray'></div>");
        });
    });

});


