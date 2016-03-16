/*=======================Inbox.js===========================*/

j$(function () {
    j$('a.ui-dialog-titlebar-close').hover(function () {
        j$(this).addClass('ui-state-hover');
    }, function () {
        j$(this).removeClass('ui-state-hover');
    });
});
j$(function () {
    j$("#a_close").click(function () {
        document.getElementById("CAttentionDialog").style.display = 'none';
        document.getElementById("CAttentionDialogShadow").style.display = 'none';
        document.getElementById("PadB").style.display = 'none';
    });
    j$("#a_yes").click(function () {
        j$('#HiddenOperate').val('Imgdelete');
        j$('#formMessages').submit();
    });
});

j$(function () {
    j$('a#btnReadSelected"').click(function () {
        var formMarkReadInboxSession = j$('form#formMarkReadInboxSession');
        var formMessages = j$('form#formMessages');
        j$.ymatoupost(formMessages.attr(), formMarkReadInboxSession.serialize(), function (data) {
            if (data.success == 1) {
                j$('form#formRedirect2Inbox').submit();
            } else {
                alert(data.message);
            }
        }, 'json');
    });
});

function doAll() {
    if (document.getElementById("btnSelectAll").checked) {
        j$('.odtable input[type=checkbox]').attr('checked', true);
    }
    else {
        j$('.odtable input[type=checkbox]').attr('checked', false);
    }
}
function doAll1() {
    if (document.getElementById("btnSelectAll1").checked) {
        j$('.odtable input[type=checkbox]').attr('checked', true);
    }
    else {
        j$('.odtable input[type=checkbox]').attr('checked', false);
    }
}
function doDelete() {
    j$('#HiddenOperate').val('delete');
    j$('#formMessages').submit();
}
function doSelect() {
    j$('#HiddenOperate').val('markAsRead');
    j$('#formMessages').submit();
}
function doSelType() {
    j$('#hdnSelType').val(j$("select#selType").val());
    j$('#HiddenOperate').val('changeType');
    j$('#formMessages').submit();
}
j$(function () {
    j$("input#btnSelectAll").click(doAll);
    j$("input#btnSelectAll1").click(doAll1);
    j$("a#btnDeleteSelected").click(doDelete);
    j$("a#btnDeleteSelected1").click(doDelete);
    //j$("a#btnReadSelected").click(doSelect);
    j$("a#btnReadSelected1").click(doSelect);
    j$(".unav_tit").toggle(
                function () {
                    j$(this).children(".ico").addClass("ico_shrink");
                    j$(this).parent(".unav_group").children(".unav_item").hide();
                },
                function () {
                    j$(this).children(".ico").removeClass("ico_shrink");
                    j$(this).parent(".unav_group").children(".unav_item").show();
                }
            );
    j$("select#selType").change(doSelType);
});

function ImgDelete(obj) {
    j$('#hdnImgMessageID').val(obj.id);
    AttentionDialog("#CAttentionDialog", "#PadB");
}


