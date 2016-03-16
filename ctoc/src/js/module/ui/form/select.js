Ymt.add(function() {
    function C(b) {
        var a = [];
        $.each(b, 
        function(f, h) {
            f = [];
            "value" in h || (h.value = h.text);
            for (var k in h) k != "text" && f.push(k + '="' + h[k] + '"');
            a.push("<option " + f.join(" ") + ">" + h.text + "</option>")
        });
        return a = a.join("")
    }
    function G(b) {
        var a = [],
        f = "";
        if (/[\s]+/i.test(b)) {
            a = b.split(" ");
            for (var h in a) f += z + a[h]
        } else f = z + b;
        return f
    }
    function D(b, a, f) {
        var h = b.listItemCls;
        b = b.listTemplate;
        var k = f.length,
        p = [];
        $.each(f, 
        function(g) {
            var q = E + g;
            g === 0 && h[0] && (q = h[0]);
            g === k - 1 && h[1] && (q = h[1]);
            p.push({
                text: f[g].text,
                value: f[g].value,
                cls: q
            })
        });
        if ($m.isUndefined(b)) $.each(p,
        function(g, q) {
            if (g === 0 && h[0]) a.push('<li class="' + h[0] + '">' + q.text + "</li>");
            else g === k - 1 && h[1] ? a.push('<li class="' + h[1] + '">' + q.text + "</li>") : a.push("<li>" + q.text + "</li>")
        });
        else {
            var d = self.parseObj || (self.parseObj = function(g) {
                g = g.replace(H, "'+data[\"$1\"]+'");
                return new Function("data", ["return '", g, "';"].join(""))
            } (b));
            $.each(p, 
            function(g, q) {
                a[g] = d(q)
            })
        }
    }
    function A(b, a) {
        function f(e, i) {
            var r = p.ulSelector;
            i = i || "";
            r.removeClass("over").removeClass("current");
            e.css({
                "z-index": i
            });
            r.hide()
        }
        function h() {
            var e = p.container,
            i,
            r,
            n = [],
            x = e.find("option");
            D(a, n, x);
            n = n.join("");
            i = e[0].nodeName.toLowerCase() !== "select" ? e: e.parent();
            r = e[0].nodeName.toLowerCase() !== "select" ? e.children() : e;
            u.html(n);
            u.click(function(t) {
                c = $(t.target).index();
                y = r[0].options[c];
                k(i, r, p.titleSelector, c);
                p.titleSelector.html(y.text);
                t.stopPropagation();
                t.cancelbubble = true;
                f(i)
            })
        }
        function k(e, i, r, n) {
            e = e.find("li").eq(n);
            i[0].selectedIndex = n;
            i.change();
            e.toggleClass("over");
            r.html(e.html())
        }
        if (!(this instanceof A)) return new A(b, $m.merge(F, a));
        var p = this;
        p.config = a;
        p.container = $(b);
        F.optionsCache = {};
        var d = p.container,
        g,
        q = (d[0].id || d[0].name) + I;
        b = $.browser.mozilla ? "DOMMouseScroll": "mousewheel";
        var B = [],
        m;
        g = "";
        var s,
        j,
        o,
        y,
        v;
        if (!$m.isUndefined(a.name) && !$m.isUndefined(a.options)) {
            B = a.name in a.optionsCache ? C(a.optionsCache[a.name]) : C(a.options);
            a.optionsCache[a.name] = a.options
        }
        if (d.is("select")) d.before('<div id="' + q + '" class="' + a.containerCls + '" tabindex="0"></div>').prependTo($("#" + q));
        else if ($.trim(d.html()) === "") {
            g = '<select id="' + d[0].id + '" name="' + d[0].id + '">' + B + "</select>";
            d.append(g).attr("id", q).attr("class", a.containerCls)
        }
        j = d[0].nodeName.toLowerCase() !== "select" ? d: d.parent();
        o = d[0].nodeName.toLowerCase() !== "select" ? d.children() : d;
        y = o[0].options[o[0].selectedIndex];
        if ($m.isUndefined(a.domTemplate) && $m.isUndefined(a.listTemplate)) {
            if ($m.isUndefined(a.titleElm)) a.titleElm = "h4";
            d = a.titleCls;
            g = a.listCls;
            q = $m.isUndefined(d) ? "" : ' class="' + d + '"';
            B = $m.isUndefined(g) ? "" : ' class="' + g +
            '"';
            g = "<" + a.titleElm + q + "></" + a.titleElm + ">";
            a.domTemplate = '<div class="' + a.selectCls + '">' + g + "<ul" + B + "></ul></div>";
            d = G(d);
            d = $m.isUndefined(d) ? a.titleElm : d
        } else {
            d = J;
            g = E;
            d = z + d;
            s = z + g
        }
        s = $m.isUndefined(s) ? "ul" : s;
        j.append(a.domTemplate);
        m = j.find(d);
        m.empty().append(y.text);
        p.titleSelector = m;
        var c = o.find("option").index(y),
        u = j.find(s),
        w;
        p.ulSelector = u; !$m.isUndefined(m) && m.is("button") && m.click(function (e) {
            e.preventDefault()
        });
        if ($m.isUndefined(a.disableWidth) || a.disableWidth === false) {
            s = o.width();
            if ($.browser.safari) s += 
            15;
            m.css({
                width: s
            });
            s = s + parseInt(m.css("padding-left"), 10) + parseInt(m.css("padding-right"), 10);
            p.ulSelector.css({
                width: s + "px"
            })
        }
        o.hide();
        h();
        w = j.find("li");
        if (!$m.isUndefined(a.listItemCount)) {
            v = parseInt(w.css("height")) * a.listItemCount;
            s = parseInt(w.css("height")) * w.size();
            if (v <= s) u.css("height", v + "px");
            else v > s && u.css("height", s + "px");
            u.css("overflow", "auto");
            u.bind("scroll", 
            function() {
                w.focus()
            })
        }
        j.bind({
            click: function() {
                var e = p.ulSelector,
                i = $(this).find("li");
                if (e.css("display") == "block") f(j);
                else {
                    m.addClass("current");
                    e.show();
                    j.css({
                        position: "relative"
                    });
                    c = i.index($(".selectedli")[0]);
                    i.hover(function() {
                        i.removeClass("over");
                        $(this).addClass("over").addClass("selectedli");
                        c = i.index(this)
                    },
                    function() {
                        $(this).removeClass("over")
                    })
                }
                return false
            },
            dblclick: function() {
                f(j);
                return false
            },
            keydown: function(e) {
                var i = j.find(".over"),
                r = o.find("option").length,
                n = u.scrollTop();
                $(this).bind("keydown", 
                function(t) {
                    if (t.keyCode == 40 || t.keyCode == 38 || t.keyCode == 35 || t.keyCode == 36) return false
                });
                switch (e.keyCode) {
                case 9:
                    return true;
                    case 13:
                    f(j);
                    break;
                case 27:
                    f(j);
                    break;
                case 33:
                    i.removeClass("over");
                    c = 0;
                    k(j, o, m, c);
                    break;
                case 34:
                    i.removeClass("over");
                    c = r - 1;
                    k(j, o, m, c);
                    break;
                case 35:
                    i.removeClass("over");
                    c = r - 1;
                    k(j, o, m, c);
                    break;
                case 36:
                    i.removeClass("over");
                    c = 0;
                    k(j, o, m, c);
                    break;
                case 38:
                    if (!$m.isUndefined(v) || v !== 0) if (n > 0) u[0].scrollTop = n - parseInt(w.css("height"));
                    e.preventDefault();
                    i.removeClass("over");
                    c === 0 ? (c = 0) : (c -= 1);
                    k(j, o, m, c);
                    break;
                case 40:
                    if (!$m.isUndefined(v) || v !== 0) {
                        var x = w.height() * w.size();
                        if (n + v < x) u[0].scrollTop = n + parseInt(w.css("height"))
                    }
                    e.preventDefault();
                    i.removeClass("over");
                    c === r - 1 ? (c = r - 1) : (c += 1);
                    k(j, o, m, c);
                    break;
                default:
                    e.preventDefault();
                    break
                }
            },
            blur: function() {
                f(j);
                return false
            },
            selectstart: function() {
                return false
            }
        }).bind(b, 
        function(e) {
            function i() {
                x.removeClass("over");
                c === 0 ? (c = 0) : (c -= 1);
                k(j, o, m, c)
            }
            function r() {
                x.removeClass("over");
                c === t - 1 ? (c = t - 1) : (c += 1);
                k(j, o, m, c)
            }
            var n = 0,
            x,
            t;
            n = e.wheelDelta ? e.wheelDelta / 120: -e.detail / 3;
            x = j.find(".over");
            t = o.find("option").length;
            n > 0 ? i(n) : r(Math.abs(n))
        });
        $("body").bind("click", 
        function() {
            u.each(function() {
                $(this).css("display") != 
                "none" && $(this).hide()
            })
        })
    }
    var z = ".",
    I = "-select-bar",
    J = "Select-title",
    E = "Select-List",
    H = /\\?\%([^%]+)\%/g,
    F = {
        listItemCls: ["first", "last"],
        disableWidth: true,
        containerCls: "dropdown_container",
        selectCls: "dropdown_select_box",
        titleCls: "pretend_select",
        listCls: "locat_select"
    };
    $m.augment(A, {
        on: function(b, a) {
            this.container.bind(b, 
            function(f, h) {
                f.preventDefault();
                a.call(f, h)
            })
        },
        getProperty: function(b) {
            var a = this.container;
            return b === "text" ? $(a[0].options[a[0].selectedIndex]).html() : a[0][b]
        },
        val: function() {
            var b = 
            this.container;
            return b[0].value !== "" ? b[0].value: b[0].text
        },
        setDefalutVal: function(b) {
            this.container[0].defaultValue = b;
            this.titleSelector.html(b)
        },
        upList: function(b, a) {
            var f = [],
            h = this.container,
            k = this.config;
            if ($m.isArray(b)) {
                a = b;
                b = "aaa"
            }
            if ($m.isUndefined(a)) a = k.optionsCache[b];
            else k.optionsCache[b] = a;
            D(k, f, a);
            b = C(a);
            h.empty().append(b);
            f = f.join("");
            this.ulSelector.html(f);
            this.titleSelector.html($("option:eq(0)", h).text())
        }
    });
    return A
});
