$(function () {
    $('.mrt-lt-content').hide().show();
    $('.mrt-list li').hover(function () {
        if ($(this).attr('class') != 'active-end') {
            $(this).addClass('active');
            $(this).find('.mrt-lt-content').stop().animate({
                height: ($(this).find('.mrt-lt-note').height() + 50)
            });
        }
    }, function () {
        $(this).find('.mrt-lt-content').stop().animate({
            height: 68
        })
        $(this).removeClass('active');
    })

    $('.Prev:first,.AtStart:first,.AtEnd:last,.Next:last').remove();
    $('.AtStart,.AtEnd,.Next').css({
        "display": "inline-block"
    });
    $('.Prev').text("<")
    $('.AtStart').text("<")
    $('.AtEnd').text(">")
    $('.Next').text(">")

    $(window).scroll(function () {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollT > 400) {
            $('.mrt-nav').addClass('mrt-navf');
        } else {
            if ($('.mrt-nav').attr('class') == "mrt-nav mrt-navf") {
                $('.mrt-nav').removeClass('mrt-navf')
            }
        }
    })
})