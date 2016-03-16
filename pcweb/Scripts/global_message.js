/*=======================global_message.js===========================*/
function flash_mastmsg(b) {
    if (b) {
        j$("a#mast_msg").flashClass({ newClass: "turnClass" });
    } else {
        j$("a#mast_msg").flashClass({ run: false });
    }
}
function setUnreaderMessageCount(count) {
    var a = jQuery("#messageUnreadCount");
    if (a) {
        a.html(count);
    }
}
function setNewMessageCount(count) {
    var a = jQuery("#mast_msg");
    if (a) {
        if (count > 0) {
            a.html("您有新短信");
            flash_mastmsg(true);
        } else {
            a.html("");
        }
    }
}
function updateUnreadMessageCount() {
    j$.ajax({
        global: false,
        type: "GET",
        url: "/PrivateMessage/AjaxGetNewMessageCount",
        dataType: "json",
        success: function (data) {
            window.messageUnreadCount = data.unreadCount;
            window.messageNewCount = data.newCount;
            setUnreaderMessageCount(data.unreadCount);

            //alert(data);
        }
    });
}
function updateNewMessageCount() {
    j$.ajax({
        global: false,
        type: "GET",
        url: "/PrivateMessage/AjaxGetNewMessageCount",
        dataType: "json",
        success: function (data) {
            if (data) {
                window.messageUnreadCount = data.unreadCount;
                window.messageNewCount = data.newCount;
                setNewMessageCount(data.newCount);
                setUnreaderMessageCount(data.unreadCount);
            }
        }
    });
}
function setUnreadNotifactionCount(count) {
    var a = jQuery("#notifactionUnreadCount");
    if (a) {
        a.html(count);
    }
}
function updateUnreadNotifactionCount() {
    j$.ajax({
        global: false,
        type: "GET",
        url: "/Notifaction/AjaxGetNotifactionCount",
        dataType: "json",
        success: function (data) {
            if (data) {
                setUnreadNotifactionCount(data.newCount);
            }
        }
    });
}
j$(function () {
    flash_mastmsg(false);
    updateUnreadMessageCount();
    updateUnreadNotifactionCount();
    //window.setInterval(updateNewMessageCount, 25000);

});

