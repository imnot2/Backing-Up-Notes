define(function (require, exports, module) {
    function i(b, a, j) {
        if (!(this instanceof i)) return new i(b, $m.merge(p, a), j);
        var f = null,
            c = {};
        b = $(b);
        var g = b[0].scrollHeight,
            h = [0],
            e = 0;
        c = {
            Height: function () {
                a.height = a.height ? a.height : b.css("height");
                return parseInt(parseInt(a.height) ? a.height : b.outerHeight());
            }, //整个实际高度
            Li: function () {
                a.li = a.li_height ? a.li_height : a.li;
                return parseInt(a.li ? a.li : b.children().first().outerHeight());
            }, //单个实际高度
            Visible: function () {
                return parseInt(a.visible ? a.visible : Math.ceil(a.height / a.li));
            }, //可以显示的个数
            Unbind: function () {
                b.children().unbind("mouseenter,mouseleave");
            },
            Max: function () {
                return parseInt(a.max ? a.max : b.children().size());
            }, //max为li数量
            Type: function () {
                return j ? j : a.type;
            },
            Timeout: function () {
                a.timeOut = a.timeOut - a.scroll < 500 ? a.scroll + 500 : a.timeOut;
                a.timeOut = a.timeOut == 3E3 && !a.type ? 30 : a.timeOut;
                return a.timeOut;
            },
            ScrollArray: function () {
                b.children().each(function () {
                    h.push($(this).outerHeight());
                });
                return h;
            } //保存每个li实际高度
        };
        c.Unbind(); //删除绑定事件
        a.max = c.Max();
        a.height = c.Height();
        a.li = c.Li();
        a.type = c.Type();
        a.timeOut = c.Timeout();
        if (!(a.max <= c.Visible())) {
            if (a.type == 3 || a.effect == "bottom") {
                e = g;
                a.i = a.max;
            }
            a.type == 2 && (h = c.ScrollArray());
            b.css({
                overflow: "hidden",
                height: a.height
            }).append(b.children().clone()).scrollTop(e); //初始化顶部滚动偏移
            var k = function () {
                    switch (a.type) {
                    case 1:
                    case 3:
                        if (a.type != 3 && a.effect == "top") b.animate({
                                scrollTop: ++a.i * a.li
                            },
                            a.scroll,
                            function () {
                                a.i >= a.max && (b.scrollTop(e), a.i = 0)
                            });
                        else if (a.type == 3 || a.effect == "bottom") b.animate({
                                scrollTop: --a.i * a.li
                            },
                            a.scroll,
                            function () {
                                a.i <= 0 && (b.scrollTop(e), a.i = a.max)
                            });
                        break; //向下滚动
                    case 2:
                        if (a.effect == "top") b.animate({
                                scrollTop: m(++a.i)
                            },
                            a.scroll,
                            function () {
                                a.i >= a.max && (b.scrollTop(e),
                                    a.i = 0)
                            });
                        else a.effect == "bottom" && b.animate({
                                scrollTop: m(--a.i)
                            },
                            a.scroll,
                            function () {
                                a.i <= 0 && (b.scrollTop(e), a.i = a.max)
                            });
                        break; //向上一条一条滚动
                    default:
                        var d = b[0].scrollTop;
                        if (a.effect == "top") {
                            if (d >= g) d -= g;
                            b.scrollTop(++d)
                        } else if (a.effect == "bottom") {
                            if (d <= 0) d += g;
                            b.scrollTop(--d)
                        }
                        break
                    }
                },
                m = function (d) {
                    for (var n = 0, l = 0; l <= d; l++) n += parseFloat(h[l]);
                    return n
                };
            this.play = function () {
                k()
            };
            this.stop = function () {
                f && clearInterval(f)
            };
            f = setInterval(function () {
                k()
            }, a.timeOut);
            b.children().bind({
                mouseenter: function () {
                    clearInterval(f)
                },
                mouseleave: function () {
                    f = setInterval(function () {
                        k()
                    }, a.timeOut)
                }
            })
        }
    }
    var p = {
        i: 0,
        max: 0,
        scroll: 1E3,
        timeOut: 3E3,
        height: 0,
        li: 0,
        li_height: 0,
        visible: 0,
        Deviation: 0,
        effect: "top",
        type: 0
    };
    return i
});