$(function () {
    $("#J-load-title").data({
        offset: $("#J-load-title").offset()
    });
    $(window).bind("scroll", function () {
        var loadTop = $("#J-load-title");
        var docTop = $(document).scrollTop();
        var offset = loadTop.data("offset");
        if (docTop > offset.top) {
            if ($.browser.msie && parseInt($.browser.version) < 7) { //IE6
                $("#J-load-title").css({
                    position: "absolute",
                    "left": "0",
                    top: dtop
                });
            } else {
                $("#J-load-title").css({
                    "position": "fixed",
                    "left": "0",
                    "top": "0",
                    "margin-top": "0"
                });
            }
        } else {
            $("#J-load-title").css({
                "position": "static",
                "top": "0",
                "margin-top": "93px"
            });
        }
    })
})