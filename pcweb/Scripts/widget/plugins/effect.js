/*=======================effect.js===========================*/
WOYO.add("widget.switchable.pulgins.Effect", 
function(i, g, n) {
    g = i.widget.Switchable;
    var h;
    i.mix(g.Config, {
        effect: "none",
        duration: 500,
        easing: "easeNone"
    });
    g.Effects = {
        none: function(a, e, f) {
            $(a).css("display", "none");
            $(e).css("display", "block");
            f()
        },
        fade: function(a, e, f) {
            if (a.length !== 1) return "\u5a23\uffe0\u6ba3\u5a23\uff04\u5e47\u93c1\u581f\u7049 \u7455\u4f79\u7730 steps==1";
            var b = this,
            c = b.config,
            d = a[0],
            j = e[0];
            b.anim && b.anim.stop(true, true);
            $(j).css("opacity", 1);
            b.anim = $(d).animate({
                opacity: 0
            },
            c.duration, 
            function() {
                b.anim = n;
                $(j).css("z-index", 2);
                $(d).css("z-index", 1);
                f()
            })
        },
        scroll: function(a, e, f, b) {
            var c = this;
            a = c.config;
            e = a.effect === "scrollx";
            var d = {};
            d[e ? "left": "top"] = -(c.viewSize[e ? 0: 1] * b) + "px";
            c.anim && c.anim.stop();
            c.anim = $(c.content).animate(d, a.duration, 
            function() {
                c.anim = n;
                f()
            })
        }
    };
    h = g.Effects;
    h.scrollx = h.scrolly = h.scroll;
    g.Plugins.push({
        name: "effect",
        init: function(a) {
            var e = a.config,
            f = e.effect,
            b = a.panels,
            c = a.content,
            d = e.steps,
            j = a.activeIndex,
            p = b.length;
            a.viewSize = [e.viewSize[0] || b[0].offsetWidth * d, e.viewSize[1] || b[0].offsetHeight * d];
            if (f !== "none") {
                $.each(b, 
                function(k, l) {
                    $(l).css("display", "block")
                });
                switch (f) {
                case "scrollx":
                case "scrolly":
                    $(c).css("position", "absolute");
                    $(c).parent().css("position", "relative");
                    if (f === "scrollx") {
                        b.css("float", "left");
                        $(c).width(a.viewSize[0] * (p / d))
                    }
                    break;
                case "fade":
                    var o = j * d,
                    q = o + d - 1,
                    m;
                    $(b[0].parentNode).css("position", "relative");
                    $.each(b, 
                    function(k, l) {
                        m = k >= o && k <= q;
                        $(l).css({
                            opacity: m ? 1: 0,
                            position: "absolute",
                            zIndex: m ? 2: 1
                        })
                    });
                    break
                }
            }
        }
    });
    i.augment(g, {
        _switchView: function(a, e, f, b) {
            var c = this,
            d = c.config.effect; (i.isFunction(d) ? d: h[d]).call(c, a, e, 
            function() {
                c._fireOnSwitch(f)
            },
            f, b)
        }
    })
});
