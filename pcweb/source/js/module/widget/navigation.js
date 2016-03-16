define(function (require, exports, module) {
    function g(h, a) {
        var e = this;
        if (!(e instanceof g)) return new g(h, d, $m.merge(k, a));
        var c = $(h),
            d = null;
        c.each(function (b) {
            $(this).attr("i", b)
        });
        var f = c.find(a.tagName);
        f.each(function (b) {
            $(this).attr("i", b)
        });
        f.length != 0 && f.hide();
        a.type == 1 && a.style[0] != "" && c.children("a").each(function () {
            if ($(this).hasClass(a.style[0])) d = $(this)
        });
        a.type == 0 && a.style[0] != "" && c.each(function () {
            if ($(this).hasClass(a.style[0])) d = $(this)
        }); //保存默认项
        if (a.eventType == "mouse") {
            c.bind({
                mouseenter: function () {
                    if (a.stamp == 1) {
                        a.type == 0 && a.style[0] != "" && c.removeClass(a.style[0]);
                        a.type == 1 && a.style[0] != "" && c.children("a").removeClass(a.style[0])
                    }
                    a.stamp == 0 && a.style[0] != "" && d && d.addClass(a.style[0]);
                    var b = $(this).find(a.tagName);
                    a.index = parseInt($(this).attr("i"));
                    var i = $(this);
                    if (b.length != 0) {
                        b.show();
                        b.children().hover(function () {
                                if (a.style[1] != "") {
                                    $(this).addClass(a.style[1]);
                                    a.type == 0 && i.addClass(a.style[0]);
                                    a.type == 1 && i.children("a").addClass(a.style[0])
                                }
                            },
                            function () {
                                a.style[1] != "" && $(this).removeClass(a.style[1])
                            })
                    } //经过子元素的时候父元素仍保持
                    if (a.style[0] != "") {
                        a.type == 0 && $(this).addClass(a.style[0]);
                        a.type == 1 && $(this).children("a").addClass(a.style[0])
                    } //经过父元素的时候父元素保持
                    a.enter && a.enter.call(e, a.index);
                    a.callback && a.callback.call(e, a.index)
                },
                mouseleave: function () {
                    var b = $(this).find(a.tagName);
                    a.index = parseInt($(this).attr("i"));
                    b.length != 0 && b.hide();
                    if (a.style[0] != "") {
                        a.type == 0 && $(this).removeClass(a.style[0]);
                        a.type == 1 && $(this).children("a").removeClass(a.style[0])
                    }
                    a.leave && a.leave.call(e, a.index)
                }
            });
            c.parent().bind("mouseleave",
                function () {
                    a.style[0] != "" && d && d.addClass(a.style[0])
                }) //离开nav后，恢复默认项状态
        }
        a.eventType == "click" && c.bind("click",
            function (b) {
                b.preventDefault();
                if (a.type == 0 && a.style[0] != "") {
                    c.removeClass(a.style[0]);
                    $(this).addClass(a.style[0])
                }
                if (a.type == 1 && a.style[0] != "") {
                    c.children("a").removeClass(a.style[0]);
                    $(this).children("a").addClass(a.style[0])
                }
                f.length != 0 && f.hide();
                b = $(this).find(a.tagName);
                b.length != 0 && b.show();
                a.index = parseInt($(this).attr("i"));
                a.callback && a.callback.call(e, a.index)
            })
    }
    var k = {
        tagName: "div",
        style: ["", ""],
        index: 0,
        type: 0,
        eventType: "mouse",
        stamp: 0,
        callback: null,
        enter: null,
        leave: null
    };
    return g
});