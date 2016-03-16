/*=======================ForumTopics.js===========================*/

j$(function () {
    j$("#pubbar1").textSlider({
        line: 1,
        speed: 500,
        timer: 3000
    });
    //navTurn("#nav_park");

    j$("#kedWord").bind("keydown", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            window.location.href = "/forum/f_" + j$("#forumTag").val() + "?kw=" + j$("#kedWord").val();
        }
    });

    j$(".uibuttom").button({
        icons: {
            secondary: 'ui-icon-circle-plus'
        }
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
        var goPage = 1;
        if (!isNaN(j$("#goPageTop").val())) {
            goPage = parseInt(j$("#goPageTop").val());
        }
        if (goPage > parseInt(j$("#totalPage").val())) {
            goPage = parseInt(j$("#totalPage").val());
        }
        window.location.href = j$("#pageLink").val() + "page=" + goPage;
    });

    j$("#btnGoPageBottom").click(function () {
        var goPage = 1;
        if (!isNaN(j$("#goPageBottom").val())) {
            goPage = parseInt(j$("#goPageBottom").val());
        }
        if (goPage > parseInt(j$("#totalPage").val())) {
            goPage = parseInt(j$("#totalPage").val());
        }
        window.location.href = j$("#pageLink").val() + "page=" + goPage;
    });

    j$("#btnQuery").click(function () {
        window.location.href = "/forum/f_" + j$("#forumTag").val() + "?kw=" + j$("#keyWord").val();
    });



});
j$(function () {
    j$('a#mil_newweek').click(function () {
        j$('div#mil_tt1').addClass('hidden');
        j$('div#mil_tt2').removeClass('hidden');
        j$('table#mil_tb1').addClass('hidden');
        j$('table#mil_tb2').removeClass('hidden');
        j$("img.img_48").imgLimit({ size: 48 });
        j$("[limit]").limitChar({ fx: true });
    });
    j$('a#mil_preweek').click(function () {
        j$('div#mil_tt1').removeClass('hidden');
        j$('div#mil_tt2').addClass('hidden');
        j$('table#mil_tb1').removeClass('hidden');
        j$('table#mil_tb2').addClass('hidden');
        j$("img.img_48").imgLimit({ size: 48 });
        j$("[limit]").limitChar({ fx: true });
    });
});
