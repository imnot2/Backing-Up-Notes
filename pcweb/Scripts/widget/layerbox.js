Ymt.add(function (require, exports, module) {
    //require('module/layerbox.css')
    function z(g, b) {
        $m.each(b,
        function (b, i) {
            g[i] = b
        })
    }
    function u(g, b) {
        function l(e, j) {
            function a(e) {
                for (var c = 0; c < e.length; c++) {
                    var k = e[c];
                    if (k.nodeType == 1) {
                        if (d == ".") if (k.className.split(" ").length == 1) k.className == j.split(".")[1] && b.push(k);
                        else for (var f = k.className.split(" "), g = 0; g < f.length; g++) f[g] == j.split(".")[1] && b.push(k);
                        else d == "#" ? k.getAttribute("id") == j.split("#")[1] && b.push(k) : k.tagName.toLowerCase() == j && b.push(k);
                        k.childNodes.length >= 1 && a(k.childNodes)
                    }
                }
            }
            var c = e.childNodes,
            b = [],
            d = j.substr(0, 1);
            a(c);
            return b
        }
        function C(e, a) {
            for (var b = e.match(/\{[a-zA-Z]+\}/gi), c = 0; c < b.length; c++) {
                var d = b[c].replace(/[\{\}]/gi, "");
                e = e.replace(b[c], a[d])
            }
            return e
        }
        function A() {
            var e = r("div.layerbox_mask" + B);
            if (e.length) this.el = e[0];
            else {
                this.el = d.body.appendChild(d.createElement("DIV"));
                z(this.el.style, $m.merge(D, {
                    backgroundColor: b.backcolor,
                    zIndex: b.zIndex,
                    height: Math.max(d.documentElement.clientHeight, d.documentElement.scrollHeight) + "px",
                    width: Math.max(d.documentElement.clientWidth,
                    d.documentElement.scrollWidth) + "px",
                    opacity: b.opacity,
                    filter: "alpha(opacity=" + b.opacity * 100 + ")",
                    mozOpacity: b.opacity
                }));
                var a = this.el.style;
                s.addEvent(p, "resize",
                function () {
                    a.height = Math.max(d.documentElement.clientHeight, d.documentElement.scrollHeight) + "px";
                    a.width = Math.max(d.documentElement.clientWidth, d.documentElement.scrollWidth) + "px"
                });
                this.el.className = "layerbox_mask" + B;
                if (m.version() == 6) this.el.innerHTML = '<iframe frameborder="no" style="width:100%;height:100%;display:block;filter:Alpha(opacity=0);"></iframe><div style="position:absolute;z-index:2;left:0;top:0;width:100%;height:100%;display:block;filter:Alpha(opacity=0);"></div>'
            }
        }
        function n(elem) {
            switch (b.position) {
                case 'center':
                    this.center(elem);
                    break;
                case 'rightbottom':
                    this.rightbottom(elem);
                    break;
            }
        }
        n.prototype.center = function (e) {
            e.style.display = "block";
            var a = e.offsetHeight,
            h = e.offsetWidth;
            e.style.display = "none";
            e.style.top = (m.version() != 6 ? (d.documentElement.clientHeight - a) / 2 : (d.documentElement.clientHeight - a) / 2 + d.documentElement.scrollTop) + "px";
            e.style.left = (d.documentElement.clientWidth - h) / 2 + "px";
            e.style.position = "fixed";
            e.style.zIndex = b.zIndex + 1;
            s.addEvent(p, "resize",
            function () {
                e.style.top = (m.version() != 6 ? (d.documentElement.clientHeight - a) / 2 : (d.documentElement.clientHeight - a) / 2 + d.documentElement.scrollTop) +
                "px";
                e.style.left = (d.documentElement.clientWidth - h) / 2 + "px"
            });
            if (m.version() == 6) e.style.position = "absolute",
            s.addEvent(p, "scroll",
            function () {
                e.style.top = (d.documentElement.clientHeight - a) / 2 + d.documentElement.scrollTop + "px"
            })
        }
        n.prototype.rightbottom = function (e) {
            e.style.display = "block";
            var a = e.offsetHeight,
            h = e.offsetWidth;
            e.style.display = "none";
            e.style.top = (m.version() != 6 ? d.documentElement.clientHeight - a : d.documentElement.clientHeight - a + d.documentElement.scrollTop) + "px";
            e.style.left = d.documentElement.clientWidth - h + "px";
            e.style.position = "fixed";
            e.style.zIndex = b.zIndex + 1;
            s.addEvent(p, "resize",
            function () {
                e.style.top = (m.version() != 6 ? d.documentElement.clientHeight - a : d.documentElement.clientHeight - a + d.documentElement.scrollTop) + "px";
                e.style.left = d.documentElement.clientWidth - h + "px"
            });
            if (m.version() == 6) e.style.position = "absolute",
            s.addEvent(p, "scroll",
            function () {
                e.style.top = (d.documentElement.clientHeight - a + d.documentElement.scrollTop) + "px"
            })
        }
        function E(e) {
            var a = d.documentElement,
            b = d.body,
            c = Math.max,
            f = d.compatMode == "CSS1Compat" ? a : b;
            return {
                left: c(a.scrollLeft, b.scrollLeft),
                top: c(a.scrollTop, b.scrollTop),
                width: f[(e ? "client" : "scroll") + "Width"],
                height: e ? f.clientHeight : c(f.clientHeight, f.scrollHeight)
            }
        }
        function v(e, a) {
            function h(a) {
                a =
                a || p.event;
                l = a.clientX;
                k = a.clientY;
                m = o.offsetLeft;
                n = o.offsetTop;
                o.ondragstart = this.ondragstart = function () {
                    return !1
                };
                d.onmousemove = c;
                e.setCapture && e.setCapture();
                d.onlosecapture = p.onblur = d.onmouseup = f;
                a.preventDefault && a.preventDefault()
            }
            function c(e) {
                e = e || p.event;
                var a = n + e.clientY - k;
                g.style.left = m + e.clientX - l + "px";
                g.style.top = a + "px"
            }
            function f() {
                var a,
                c,
                b = o.offsetLeft,
                j = o.offsetTop,
                h = q.left + q.width - o.offsetWidth,
                d = q.top + q.height - o.offsetHeight;
                j < 0 && (t2 = 0, c = !0);
                b < 0 && (t = 0, a = !0);
                b > h && (t = h, a = !0);
                j + q.top >
                d && (t2 = d - q.top, c = !0);
                if (c || a) {
                    if (a) o.style.left = t + "px";
                    if (c) o.style.top = t2 + "px"
                }
                p.onblur = this.onmouseup = this.onmousemove = null;
                e.releaseCapture && e.releaseCapture()
            }
            var g = a,
            o = a || e,
            l,
            k,
            m,
            n,
            q;
            q = E(!0);
            if (e.length != void 0) for (var i = 0; i < e.length; i++) e[i].onmousedown = h,
            e[i].style.cursor = b.diagCursor;
            else e.onmousedown = h,
            e.style.cursor = b.diagCursor
        }
        function x() {
            this.al = d.body.appendChild(d.createElement("DIV"));
            this.al.className = "layerbox_dialog_alert";
            z(this.al.style, {
                position: "absolute",
                width: "auto",
                height: "auto",
                zIndex: b.zIndex + 1,
                display: "none",
                backgroundColor: "#FFF",
                fontSize: "12px",
                textAlign: "center",
                "float": "left"
            });
            this.al.innerHTML = ""
        }
        if (!(this instanceof u)) return new u(g, $m.merge(F, b));
        b = this.config = b;
        var d = !b.ParIframe ? document : b.ParIframeMan.document,
        p = !b.ParIframe ? window : b.ParIframeMan,
        B = Date.parse(new Date) + Math.floor(Math.random() * 1E5),
        m = {
            ie: function () {
                return !!window.ActiveXObject
            },
            version: function () {
                if (window.ActiveXObject) {
                    var e = !!window.ActiveXObject,
                    a = e && !window.XMLHttpRequest,
                    b = e && !!document.documentMode;
                    if (e) if (a) return "6.0";
                    else if (b) return "8.0";
                    else if (e && !a && !b) return "7.0"
                }
            }
        };
        if (!m.ie()) {
            var y = window.HTMLElement.prototype;
            y.__defineGetter__("outerHTML",
            function () {
                for (var e = "<" + this.tagName, a = this.attributes, b = 0, c = a.length; b < c; b++) a[b].specified && (e += " " + a[b].name + '="' + a[b].value + '"');
                if (!this.canHaveChildren) return e + " />";
                return e + ">" + this.innerHTML + "</" + this.tagName + ">"
            });
            y.__defineSetter__("outerHTML",
            function (a) {
                var b = this.ownerDocument.createRange();
                b.setStartBefore(this);
                this.parentNode.replaceChild(b.createContextualFragment(a), this);
                return a
            });
            y.__defineGetter__("canHaveChildren",
            function () {
                return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(this.tagName.toLowerCase())
            })
        }
        var r = function (a, b) {
            function h() {
                var a = this.i.split("#").length > 1 ? this.i.split("#") : [null, this.i];
                return f.getElementById(a[1])
            }
            function c() {
                for (var a = this.i.split(".").length > 1 ? this.i.split(".") : [null, this.i], e = [], b = f.getElementsByTagName(a[0] || "*"), c = 0; c < b.length; c++) if (b[c].className.split(" ").length ==
                1) b[c].className == a[1] && e.push(b[c]);
                else for (var d = b[c].className.split(" "), j = 0; j < d.length; j++) d[j] == a[1] && e.push(b[c]);
                return e
            }
            var f = b == void 0 ? d : b;
            this.i = a;
            switch (a.substr(0, 1)) {
                case "#":
                    return h();
                case ".":
                    return c();
                default:
                    return c()
            }
        },
        s = {
            addEvent: d.addEventListener ?
            function (a, b, d) {
                a.addEventListener && a.addEventListener(b, d, !1)
            } : function (a, b, d) {
                a.attachEvent && a.attachEvent("on" + b, d)
            },
            removeEvent: d.removeEventListener ?
            function (a, b, d) {
                a.removeEventListener && a.removeEventListener(b, d, !1)
            } : function (a,
            b, d) {
                a.detachEvent && a.detachEvent("on" + b, d)
            }
        },
        w = function (a, b) {
            if (a.length != void 0) for (var d = 0; d < a.length; d++) s.addEvent(a[d], "click",
            function (a) {
                a = a || event; !m.ie() ? a.preventDefault() : a.returnValue = !1;
                b()
            });
            else s.addEvent(a, "click",
            function (a) {
                a = a || event; !m.ie() ? a.preventDefault() : a.returnValue = !1;
                b()
            })
        };
        A.prototype = {
            show: function () {
                this.el.style.display = "block"
            },
            hide: function () {
                this.el.style.display = "none"
            }
        };
        x.prototype = {
            show: function () {
                this.al.style.display = "block"
            },
            hide: function () {
                this.al.style.display =
                "none"
            }
        };
        var f = function () {
            this._close = this._mk = this.dialog = null
        };
        f.mask = function () {
            var a = null;
            b.isFrame && (a = new A);
            this.mask_show = function () {
                a && a.show()
            };
            this.mask_hide = function () {
                a && a.hide()
            }
        };
        var a = new f;
        f.alert = function (e, d) {
            function h() {
                a._mk.mask_hide();
                a.dialog.hide()
            }
            var c;
            if (!a.dialog) a.dialog = new x,
            a._mk = new f.mask,
            a.dialog.al.innerHTML = '<p style="margin:20px 50px 5px 50px">' + (e || b.text) + '</p><button style="width:auto;height:auto;margin:10px 10px 10px 10px" class="close">\u5173\u95ed</button>',
            c = new n(a.dialog.al),
            c = l(a.dialog.al, b.dragTags),
            b.drag && v(c.length == 0 ? a.dialog.al : c, a.dialog.al);
            b.isloc && (c = new n(a.dialog.al));
            a._mk.mask_show();
            a.dialog.show();
            if (b.time != "max" || d != void 0) var g = setTimeout(h, d || b.time);
            a._close = function () {
                clearInterval(g);
                b.closeCallback()
                h()
            };
            w(l(a.dialog.al, b.close), a._close)
        };
        f.struc = function (e, j) {
            function h() {
                a._mk.mask_hide();
                a.dialog.style.display = "none"
            }
            var c;
            if (!a.dialog || b.struc != e) a._mk = new f.mask,
            b.ParIframe ? (c = r(e || b.struc, document), a.dialog = d.body.appendChild(d.createElement("DIV")),
            a.dialog.innerHTML = (c.length != "undefined" ? c : c[0]).outerHTML, c = r(e || b.struc), a.dialog = c.length != "undefined" ? c : c[0]) : (c = r(e || b.struc), a.dialog = c.length != "undefined" ? c : c[0]),
            b.struc = e,
            c = new n(a.dialog),
            c = l(a.dialog, b.dragTags),
            b.drag && v(c.length == 0 ? a.dialog : c, a.dialog);
            b.isloc && (c = new n(a.dialog));
            a._mk.mask_show();
            a.dialog.style.display = "block";
            b.callback();
            if (b.time != "max" || j != void 0) var g = setTimeout(h, j || b.time);
            a._close = function () {
                clearInterval(g);
                b.closeCallback()
                h()
            };
            w(l(a.dialog, b.close), a._close)
        };
        f.Temps = function (e, d, fun) {
            function g() {
                a._mk.mask_hide();
                a.dialog.al.style.display = "none"
                $m.isFunction(fun) && fun.call(b);
            }
            var c;
            if (!a.dialog) a.dialog = new x,
            a._mk = new f.mask,
            a.dialog.al.innerHTML = C(b.Temps, e || b.data),
            c = new n(a.dialog.al),
            b.callback(),
            c = l(a.dialog.al, b.dragTags),
            b.drag && v(c.length == 0 ? a.dialog.al : c, a.dialog.al);
            b.isloc && (c = new n(a.dialog.al));
            a._mk.mask_show();
            a.dialog.al.style.display = "block";
            if (b.time != "max" || d != void 0) var time = setTimeout(g, d || b.time);
            a._close = function () {
                clearInterval(time);
                b.closeCallback()
                g()
            };
            w(l(a.dialog.al,
            b.close), a._close)
        };
        f.Drag = function (e, d) {
            function f() {
                a.dialog.style.display = "none"
            }
            if (!a.dialog) {
                var c = r(b.dragBody || d);
                a.dialog = c.length != "undefined" ? c : c[0];
                a.dialog.style.position = m.version() == 6 ? "absolute" : "fixed";
                if (b.dragLoc) c = a.dialog.style.display,
                new n(a.dialog),
                a.dialog.style.display = c
            }
            c = l(a.dialog, b.dragTags);
            v(c.length == 0 ? a.dialog : c, a.dialog);
            if (b.time != "max") var g = setTimeout(f, b.time);
            a._close = function () {
                clearInterval(g);
                b.closeCallback()
                f()
            };
            w(l(a.dialog, b.close), a._close)
        };
        f.position = function () { };
        f.close = function (b, d) {
            Ymt.isString(b) ? (r(b).style.display = "none", d && a._close()) : a._close()
        };
        this._main = function (a, d, i) {
            g = g.toLowerCase();
            switch (g) {
                case "alert":
                    f.alert(a, d);
                    break;
                case "struc":
                    f.struc(a, d);
                    break;
                case "temps":
                    f.Temps(a, d, i);
                    break;
                case "drag":
                    f.Drag(a, d);
                    b.drag = !0;
                    break;
                default:
                    f.alert(a)
            }
        };
        this._close = function (a, b) {
            f.close(a, b)
        };
        switch (g) {
            case "drag":
                f.Drag()
        }
    }
    var F = {
        struc: null,
        Temps: "",
        Data: "",
        close: ".close",
        text: "alert \u5f39\u51fa\u6d6e\u5c42",
        drag: !1,
        dragLoc: !1,
        dragTags: "",
        dragBody: "",
        diagCursor: "move",
        time: "max",
        position: 'center',
        isFrame: !0,
        opacity: 0.5,
        backcolor: "#ccc",
        zIndex: 15555,
        ParIframe: !1,
        ParIframeMan: window.top,
        isloc: !1,
        callback: function () { },
        closeCallback: function () { }
    },
    D = {
        display: "none",
        position: "absolute",
        backgroundColor: "#ccc",
        zIndex: 9,
        top: "0px",
        left: "0px",
        height: "768px",
        width: "1024px",
        backgroundImage: "url(about:blank;)",
        opacity: 0.5,
        filter: "alpha(opacity=50)",
        mozOpacity: 0.5
    };
    $m.augment(u, {
        close: function () { },
        alert: function (g, b, i) {
            this._main(g, b, i)
        },
        hide: function () {
            this.hide()
        },
        show: function () { },
        close: function (g, b) {
            this._close(g, b)
        }
    });
    return u
});
