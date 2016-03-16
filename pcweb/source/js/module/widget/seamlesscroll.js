define(function (require, exports, module) {
    function j(q, a) {
        function t(b) {
            if (a.circular) b <= a.start - c - 1 ? (h.css(n, -((e - c * 2) * k) + "px"), b = b == a.start - c - 1 ? e - c * 2 - 1 : e - c * 2 - a.scroll) : b >= e - c + 1 && (h.css(n, -(c * k) + "px"), b = b == e - c + 1 ? c + 1 : c + a.scroll);
            else if (b < 0 || b > e) return;
            return b
        }

        function u(b) {
            var c = 0,
                e = parseInt($.css(b, "marginTop")) || 0,
                f = parseInt($.css(b, "marginBottom")) || 0;
            f > e && (c = f - e);
            return (a.viewSize[1] || b.offsetHeight) + e + c
        }
        var b = this;
        if (!(b instanceof j)) return new j(q, $m.merge(v, a || {}));
        b.config = a;
        b.container = $(q);
        b.guid = ++w + 'widget.SeamlesScroll';
        var i = a.disableBtnCls;
        if ($m.isString(i)) i = a.disableBtnCls = [i, i];
        if ($m.isString(a.panels)) a.panels = $(a.panels, b.container);
        var o = !1,
            n = a.vertical ? "top" : "left",
            l = a.vertical ? "height" : "width",
            f = a.panels,
            m = f.size(),
            c = a.visible;
        if (a.visible > m) a.circular = !1;
        if (a.btnPrev) {
            if ($m.isString(a.btnPrev)) a.btnPrev = $(a.btnPrev, b.container);
            a.btnPrev.click(function () {
                a.btnPrev.hasClass(i[0]) || b.go(b.curr - a.scroll);
                return !1
            });
            a.btnPrev[["removeClass", "addClass"][~~(!a.start && !a.circular)]](i[0])
        }
        if (a.btnNext) {
            if ($m.isString(a.btnNext)) a.btnNext =
                $(a.btnNext, b.container);
            a.btnNext.click(function () {
                a.btnNext.hasClass(i[1]) || b.go(b.curr + a.scroll);
                return !1
            });
            a.btnNext[["removeClass", "addClass"][~~(m < a.scroll)]](i[1])
        }
        if (!m) return !1;
        var h = $(a.panels[0].parentNode),
            p = h.parent();
        f.each(function (a, b) {
            $(b).attr("asins", a + 1)
        });
        a.circular && (h.prepend(f.slice(m - c).clone()).append(f.slice(0, c).clone()), a.start += c);
        var g = h.children(),
            e = g.size();
        b.curr = a.start;
        p.css("visibility", "visible");
        g.css({
            overflow: "hidden",
            "float": a.vertical ? "none" : "left"
        });
        h.css({
            margin: "0",
            padding: "0",
            position: "relative",
            "list-style-type": "none",
            "z-index": "1"
        });
        p.css({
            overflow: "hidden",
            position: "relative",
            "z-index": "2",
            left: "0px"
        });
        var k = a.vertical ? u(g[0]) : (a.viewSize[0] || g[0].offsetWidth) + (parseInt($.css(g[0], "marginLeft")) || 0) + (parseInt($.css(g[0], "marginRight")) || 0);
        f = k * e;
        var x = a.viewSize[~~a.vertical] || g[["width", "height"][~~a.vertical]]();
        g.css(l, x + "px");
        h.css(l, f + "px").css(n, -(b.curr * k));
        if (a.btnGo) {
            if ($m.isString(a.btnGo)) a.btnGo = $(a.btnGo, b.container);
            $.each(a.btnGo,
                function (c,
                    e) {
                    $(e).click(function () {
                        return b.go((a.circular ? a.visible : 0) + c * a.scroll)
                    })
                })
        }
        a.auto && (l = function () {
                b.later = $m.later(function () {
                        b.go(b.curr + a.scroll)
                    },
                    a.auto + a.speed, !0)
            },
            f = {
                mouseenter: function () {
                    b.later && b.later.cancel()
                },
                mouseleave: l
            },
            l(), p.bind(f), a.btnNext && a.btnNext.bind(f), a.btnPrev && a.btnPrev.bind(f));
        b.go = function (c) {
            if (!o) {
                r = g.slice(b.curr).slice(0, a.scroll);
                c = b.curr = t(c);
                var f = g.slice(b.curr).slice(0, a.scroll),
                    d = {
                        container: b.container,
                        currentIndex: ~~f.slice(0, 1).attr("asins"),
                        visibles: f,
                        oldVisibles: r,
                        amount: m
                    };
                b.container.trigger(y + b.guid, d);
                o = !0;
                a.circular || (c < 0 ? c = 0 : c + a.visible > e && (c = a.visible > m ? 0 : e - a.visible));
                h.animate(n == "left" ? {
                        left: -(c * k)
                    } : {
                        top: -(c * k)
                    },
                    a.speed, a.easing,
                    function () {
                        b.container.trigger(z + b.guid, d);
                        o = !1
                    });
                if (!a.circular) {
                    c = a.disableBtnCls;
                    if (a.btnPrev) a.btnPrev[["removeClass", "addClass"][~~(b.curr <= 0)]](c[0]);
                    if (a.btnNext) a.btnNext[["removeClass", "addClass"][~~(b.curr + a.scroll >= e)]](c[1])
                }
            }
            return !1
        }
    }
    var y = "beforeSwitch",
        z = "switch",
        w = 0,
        r = null,
        v = {
            panels: [],
            btnPrev: null,
            btnNext: null,
            disableBtnCls: "disabled",
            btnGo: null,
            auto: null,
            speed: 200,
            easing: null,
            vertical: !1,
            circular: !0,
            visible: 5,
            start: 0,
            scroll: 1,
            viewSize: []
        };
    $m.augment(j, {
        on: function (d, a) {
            this.container.bind(d + this.guid,
                function (d, j) {
                    d.stopPropagation();
                    a.call(d, j)
                });
            return this;
        },
        next: function () {
            this.go(this.curr + this.config.scroll);
            return this;
        },
        prev: function () {
            this.go(this.curr - this.config.scroll);
            return this;
        }
    });
    return j
});