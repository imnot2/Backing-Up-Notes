Ymt.add(function (require, exports, module) {

    var isAlpha = /\.alpha\.ymatou.com|localhost/.test(location.href);

    var _instanceUrl = isAlpha ? "http://top.alpha.ymatou.com" : "http://top.ymatou.com";

    var _messageSessions = isAlpha ? "http://www.alpha.ymatou.com/user/messageSessions" : "http://www.ymatou.com/user/messageSessions";


    function replaceLoginURL() {
        var login = $('.hd-login');
        if (login.size() > 0) {
            var Aelems = login.find('[href*="login"],[href*="register"]');
            Aelems.each(function (index, elem) {
                var href = $(elem).attr('href');

                $(elem).attr('href', href.replace(/ret=.*/ig, "ret=" + encodeURIComponent(location.href)));
            })
        }
    }

    //replaceLoginURL();
    var topBarId = $('#div_topbar_logininfo01')[0] || $('#div_topbar_logininfo02')[0] || $('#div_topbar_logininfo03')[0];
    if (topBarId) {
        var id = $(topBarId).attr('id').slice(-1),
            loginInfoURL;
        switch (id) {
        case '1':
            loginInfoURL = '/Template20150215/LoginInfo01jsonp';
            break;
        case '2':
            loginInfoURL = '/Template20150215/LoginInfo02jsonp';
            break;
        case '3':
            loginInfoURL = '/Template20150215/LoginInfo03jsonp';
            break;
        }
        $.ajax({
            url: _instanceUrl + loginInfoURL,
            dataType: "jsonp",
            success: function (html) {
                $(topBarId).replaceWith(html.content);
                replaceLoginURL();
                FindAllNotificationCount();
            }
        });
    }





    //FindAllNotificationCount
    function FindAllNotificationCount() {
        $.ajax({

            url: _instanceUrl + '/NotificationCount/FindAllNotificationCount',
            dataType: "jsonp",
            traditional: true,
            success: function (data) {
                //alert(data.length);
                //alert("发现" + data[0].TypeDesc + " " + data[0].Count);
                var totalNotificationCount = 0; //总通知数
                var siteNoticeCount = 0; //公告通知数
                var tradeNotificationCount = 0; //交易通知数
                var siteMessageNotificationCount = 0; //站内信通知数
                var forumReplyNotificationCount = 0; //回帖通知数

                //#region 计算通知的个数
                for (var i = 0; i < data.length; i++) {
                    if (i == 0) {
                        totalNotificationCount = data[i].Count;
                        if (data[i].NotificationCountType == '4') {
                            siteNoticeCount = data[i].Count;
                        }
                        if (data[i].NotificationCountType == '1') {
                            tradeNotificationCount = data[i].Count;
                        }
                        if (data[i].NotificationCountType == '2') {
                            siteMessageNotificationCount = data[i].Count;
                        }
                        if (data[i].NotificationCountType == '3') {
                            forumReplyNotificationCount = data[i].Count;
                        }
                    } else {
                        totalNotificationCount += data[i].Count;
                        if (data[i].NotificationCountType == '4') {
                            siteNoticeCount += data[i].Count;
                        }
                        if (data[i].NotificationCountType == '1') {
                            tradeNotificationCount += data[i].Count;
                        }
                        if (data[i].NotificationCountType == '2') {
                            siteMessageNotificationCount += data[i].Count;
                        }
                        if (data[i].NotificationCountType == '3') {
                            forumReplyNotificationCount += data[i].Count;
                        }
                    }

                }
                //#endregion

                //#region 显示下面四个标签的通知个数
                $("#siteNoticeCount").addClass('number');
                if (siteNoticeCount <= 0) {
                    $("#siteNoticeCount").html("").removeClass('number');
                } else if (siteNoticeCount <= 9) {
                    $("#siteNoticeCount").text(siteNoticeCount); //公告通知数
                } else {
                    $("#siteNoticeCount").addClass('number-dots');
                    //$("#siteNoticeCount").text("...");//公告通知数
                }

                $("#tradeNotificationCount").addClass('number');
                if (tradeNotificationCount <= 0) {
                    $("#tradeNotificationCount").html("").removeClass('number');
                } else if (tradeNotificationCount <= 9) {
                    $("#tradeNotificationCount").text(tradeNotificationCount); //交易通知数
                } else {
                    $("#tradeNotificationCount").addClass('number-dots');
                    //$("#tradeNotificationCount").text("...");//交易通知数
                }

                $("#siteMessageNotificationCount").addClass('number');
                if (siteMessageNotificationCount <= 0) {
                    $("#siteMessageNotificationCount").html("").removeClass('number');
                } else if (siteMessageNotificationCount <= 9) {
                    $("#siteMessageNotificationCount").text(siteMessageNotificationCount); //站内信通知数
                } else {
                    $("#siteMessageNotificationCount").addClass('number-dots');
                    //$("#siteMessageNotificationCount").text("...");//站内信通知数
                }

                $("#forumReplyNotificationCount").addClass('number');
                if (forumReplyNotificationCount <= 0) {
                    $("#forumReplyNotificationCount").html("").removeClass('number');
                } else if (forumReplyNotificationCount <= 9) {
                    $("#forumReplyNotificationCount").text(forumReplyNotificationCount); //回帖通知数
                } else {
                    $("#forumReplyNotificationCount").addClass('number-dots');
                    //$("#forumReplyNotificationCount").text("...");//回帖通知数
                }

                $("#notificationCount").addClass('number');
                totalNotificationCount = siteNoticeCount + tradeNotificationCount + siteMessageNotificationCount + forumReplyNotificationCount;
                if (totalNotificationCount <= 0) {
                    $("#notificationCount").html("").removeClass('number');
                } else if (totalNotificationCount <= 9) {
                    $("#notificationCount").text(totalNotificationCount); //显示总通知数
                } else {
                    $("#notificationCount").addClass('number-dots');
                    //$("#notificationCount").text("...");//显示总通知数
                }
                //#endregion
            },
            error: function (errorMsg) {
                //alert("获取通知数失败" + errorMsg)
            }
        })

    }



    //MarkMessageRead

    $('#TopUnReadMessage li .icon-close').live('click', function () {
        MarkMessageRead($(this).attr("_dataid"))
    });

    function MarkMessageRead(contactUserId) {
        //alert(contactUserId);

        $.ajax({

            url: _instanceUrl + '/Message/MarkMessageRead',
            dataType: "jsonp",
            traditional: true,
            data: {
                contactUserId: contactUserId
            },

            success: function (data) {
                //alert(data.Msg);
                if (data.Status == "200") {
                    //alert("操作成功");
                    $.ajax({

                        url: _instanceUrl + '/Message/TopUnReadMessage',
                        dataType: "jsonp",
                        traditional: true,
                        data: {
                            num: 3
                        },

                        success: function (data2) {
                            //alert(data.Msg);
                            if (data2.Status == "200") {
                                //alert("操作成功");
                                $('#TopUnReadMessage li').remove();
                                for (var i = 0; i < data2.Result.length; i++) {
                                    if (i == 3)
                                        break;
                                    $('#TopUnReadMessage').append('<li id=' + data2.Result[i].ContactUserId + '><a class="txt" href="' + _messageSessions + '">' + data2.Result[i].Content + '</a><span class="icon-close" _dataid="' + data2.Result[i].ContactUserId + '"></span></li>');
                                }
                                FindAllNotificationCount();
                            }
                        },
                        error: function (errorMsg) {
                            //alert("把消息设为已读失败" + errorMsg);
                        }
                    })
                }
            },
            error: function (errorMsg) {
                //alert("把消息设为已读失败" + errorMsg);
            }
        })
    }



})