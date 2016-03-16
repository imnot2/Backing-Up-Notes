define(function (require, exports, module) {
    function Extend(ori, ext) {
        $m.each(ext, function (val, key) {
            ori[key] = val;
        })
    }

    function LayerBox(layerType, config) {

        //selector
        function queryselector(context, j) {
            function query(nodes) {
                for (var c = 0; c < nodes.length; c++) {
                    var k = nodes[c];
                    if (k.nodeType == 1) {
                        if (prev == ".")
                            if (k.className.split(" ").length == 1) k.className == j.split(".")[1] && result.push(k);
                            else
                                for (var f = k.className.split(" "), g = 0; g < f.length; g++) f[g] == j.split(".")[1] && result.push(k);
                        else prev == "#" ? k.getAttribute("id") == j.split("#")[1] && result.push(k) : k.tagName.toLowerCase() == j && result.push(k);
                        k.childNodes.length >= 1 && query(k.childNodes)
                    }
                }
            }
            var result = [],
                prev = j.substr(0, 1);
            query(context.childNodes);

            return result
        }

        //render fun
        function renderTemp(temp, data) {
            for (var matchs = temp.match(/\{[a-zA-Z]+\}/gi), c = 0; c < matchs.length; c++) {
                var d = matchs[c].replace(/[\{\}]/gi, "");
                temp = temp.replace(matchs[c], data[d])
            }
            return temp
        }

        //mask
        function layerMask() {
            var e = selector("div.layerbox_mask" + B);
            if (e.length) this.el = e[0];
            else {
                this.el = doc.body.appendChild(doc.createElement("DIV"));
                Extend(this.el.style, $m.merge(Styles, {
                    backgroundColor: config.backcolor,
                    zIndex: config.zIndex,
                    height: Math.max(docElement.clientHeight, docElement.scrollHeight) + "px",
                    width: Math.max(docElement.clientWidth, docElement.scrollWidth) + "px",
                    opacity: config.opacity,
                    filter: "alpha(opacity=" + config.opacity * 100 + ")",
                    mozOpacity: config.opacity
                }));
                var a = this.el.style;
                listener.addEvent(frameWindow, "resize",
                    function () {
                        a.height = Math.max(docElement.clientHeight, docElement.scrollHeight) + "px";
                        a.width = Math.max(docElement.clientWidth, docElement.scrollWidth) + "px"
                    });
                this.el.className = "layerbox_mask" + B;
                if (m.version() == 6) this.el.innerHTML = '<iframe frameborder="no" style="width:100%;height:100%;display:block;filter:Alpha(opacity=0);"></iframe><div style="position:absolute;z-index:2;left:0;top:0;width:100%;height:100%;display:block;filter:Alpha(opacity=0);"></div>'
            }
        }

        //position class
        function position(elem) {
            switch (config.position) {
            case 'center':
                this.center(elem);
                break;
            case 'rightbottom':
                this.rightbottom(elem);
                break;
            }
        }
        position.prototype.center = function (e) {
            e.style.display = "inline-block";
            var a = e.offsetHeight,
                h = e.offsetWidth;
            e.style.display = "none";
            e.style.top = (m.version() != 6 ? (docElement.clientHeight - a) / 2 : (docElement.clientHeight - a) / 2 + docElement.scrollTop) + "px";
            e.style.left = (docElement.clientWidth - h) / 2 + "px";
            e.style.position = "fixed";
            e.style.zIndex = config.zIndex + 1;
            listener.addEvent(frameWindow, "resize",
                function () {
                    e.style.top = (m.version() != 6 ? (docElement.clientHeight - a) / 2 : (docElement.clientHeight - a) / 2 + docElement.scrollTop) +
                        "px";
                    e.style.left = (docElement.clientWidth - h) / 2 + "px"
                });
            if (m.version() == 6) e.style.position = "absolute",
                listener.addEvent(frameWindow, "scroll",
                    function () {
                        e.style.top = (docElement.clientHeight - a) / 2 + docElement.scrollTop + "px"
                    })
        }
        position.prototype.rightbottom = function (e) {
            e.style.display = "block";
            var a = e.offsetHeight,
                h = e.offsetWidth;
            e.style.display = "none";
            e.style.top = (m.version() != 6 ? docElement.clientHeight - a : docElement.clientHeight - a + docElement.scrollTop) + "px";
            e.style.left = docElement.clientWidth - h + "px";
            e.style.position = "fixed";
            e.style.zIndex = config.zIndex + 1;
            listener.addEvent(frameWindow, "resize",
                function () {
                    e.style.top = (m.version() != 6 ? docElement.clientHeight - a : docElement.clientHeight - a + docElement.scrollTop) + "px";
                    e.style.left = docElement.clientWidth - h + "px"
                });
            if (m.version() == 6) e.style.position = "absolute",
                listener.addEvent(frameWindow, "scroll",
                    function () {
                        e.style.top = (docElement.clientHeight - a + docElement.scrollTop) + "px"
                    })
        }

        //get pos info of element
        function offset(e) {
            var b = doc.body,
                c = Math.max,
                f = doc.compatMode == "CSS1Compat" ? docElement : b;
            return {
                left: c(docElement.scrollLeft, b.scrollLeft),
                top: c(docElement.scrollTop, b.scrollTop),
                width: f[(e ? "client" : "scroll") + "Width"],
                height: e ? f.clientHeight : c(f.clientHeight, f.scrollHeight)
            }
        }

        //drag of class
        function dragMethod(e, a) {
            function h(a) {
                a = a || frameWindow.event;
                l = a.clientX;
                k = a.clientY;
                m = o.offsetLeft;
                n = o.offsetTop;
                o.ondragstart = this.ondragstart = function () {
                    return !1
                };
                doc.onmousemove = c;
                e.setCapture && e.setCapture();
                doc.onlosecapture = frameWindow.onblur = doc.onmouseup = f;
                a.preventDefault && a.preventDefault()
            }

            function c(e) {
                e = e || frameWindow.event;
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
                frameWindow.onblur = this.onmouseup = this.onmousemove = null;
                e.releaseCapture && e.releaseCapture()
            }
            var g = a,
                o = a || e,
                l,
                k,
                m,
                n,
                q;
            q = offset(!0);
            if (e.length != void 0)
                for (var i = 0; i < e.length; i++) e[i].onmousedown = h,
                    e[i].style.cursor = config.diagCursor;
            else e.onmousedown = h,
                e.style.cursor = config.diagCursor
        }


        //layerbox
        function layerDialog(isDefault) {
            this.al = doc.body.appendChild(doc.createElement("DIV"));
            if (isDefault) {
                this.al.className = "layerbox_dialog_alert";
                Extend(this.al.style, {
                    position: "absolute",
                    width: "auto",
                    height: "auto",
                    zIndex: config.zIndex + 1,
                    display: "none",
                    backgroundColor: "#FFF",
                    fontSize: "12px",
                    textAlign: "center",
                    "float": "left"
                });
            }

            this.al.innerHTML = ""
        }


        if (!(this instanceof LayerBox)) return new LayerBox(layerType, $m.merge(DefaultConfig, config));


        config = this.config = config;
        var doc = !config.ParIframe ? document : config.ParIframeMan.document,
            docElement = doc.documentElement,
            frameWindow = !config.ParIframe ? window : config.ParIframeMan,
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
                        if (e)
                            if (a) return "6.0";
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
        var selector = function (a, b) {

                function h() {
                    var a = this.i.split("#").length > 1 ? this.i.split("#") : [null, this.i];
                    return f.getElementById(a[1])
                }

                function c() {
                    for (var a = this.i.split(".").length > 1 ? this.i.split(".") : [null, this.i], e = [], b = f.getElementsByTagName(a[0] || "*"), c = 0; c < b.length; c++)
                        if (b[c].className.split(" ").length ==
                            1) b[c].className == a[1] && e.push(b[c]);
                        else
                            for (var d = b[c].className.split(" "), j = 0; j < d.length; j++) d[j] == a[1] && e.push(b[c]);
                    return e
                }
                var f = b == void 0 ? doc : b;
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
            listener = {
                addEvent: doc.addEventListener ?
                    function (a, b, d) {
                        a.addEventListener && a.addEventListener(b, d, !1)
                } : function (a, b, d) {
                    a.attachEvent && a.attachEvent("on" + b, d)
                },
                removeEvent: doc.removeEventListener ?
                    function (a, b, d) {
                        a.removeEventListener && a.removeEventListener(b, d, !1)
                } : function (a,
                    b, d) {
                    a.detachEvent && a.detachEvent("on" + b, d)
                }
            },
            bindClick = function (a, b) {
                if (a.length != void 0)
                    for (var d = 0; d < a.length; d++) listener.addEvent(a[d], "click",
                        function (a) {
                            a = a || event;
                            !m.ie() ? a.preventDefault() : a.returnValue = !1;
                            b()
                        });
                else listener.addEvent(a, "click",
                    function (a) {
                        a = a || event;
                        !m.ie() ? a.preventDefault() : a.returnValue = !1;
                        b()
                    })
            };
        layerMask.prototype = {
            show: function () {
                this.el.style.display = "block"
            },
            hide: function () {
                this.el.style.display = "none"
            }
        };
        layerDialog.prototype = {
            show: function () {
                this.al.style.display = "block"
            },
            hide: function () {
                this.al.style.display =
                    "none"
            }
        };
        var layer = function () {
            this._close = this._mk = this.dialog = null
        };
        layer.mask = function () {
            var a = null;
            config.isFrame && (a = new layerMask);
            this.mask_show = function () {
                a && a.show()
            };
            this.mask_hide = function () {
                a && a.hide()
            }
        };

        layer.prototype = {
            show: function () {
                this._mk && this._mk.mask_show();
                this.dialog.show();
            },
            hide: function () {
                this._mk && this._mk.mask_hide();
                this.dialog.hide()
            },
            drag: function () {
                var c = queryselector(this.dialog.al, config.dragTags);
                config.drag && dragMethod(c.length == 0 ? this.dialog.al : c, this.dialog.al);
            }

        }

        var instance = new layer;
        layer.alert = function (text, time) {
            var c, timeout;
            if (!instance.dialog) {
                instance.dialog = new layerDialog(true);
                instance._mk = new layer.mask;
                instance.dialog.al.innerHTML = '<p style="margin:20px 50px 5px 50px">' + (text || config.text) + '</p><button style="width:auto;height:auto;margin:10px 10px 10px 10px" class="close">\u5173\u95ed</button>';
                c = new position(instance.dialog.al);
                instance.drag();
            }

            config.isloc && (c = new position(instance.dialog.al));

            instance.show();

            config.callback();

            if (config.time != "max" || time != void 0) {
                timeout = setTimeout(instance.hide, time || config.time);
            }

            instance._close = function () {
                clearInterval(timeout);
                instance.hide()
                config.closeCallback()
            };

            bindClick(queryselector(instance.dialog.al, config.close), instance._close)
        };

        layer.struc = function (expr, time) {

            var c, timeout;
            if (!instance.dialog || config.struc != expr) {
                instance._mk = new layer.mask;
                instance.dialog = instance.dialog || new layerDialog();
                if (config.ParIframe) {
                    c = selector(expr || config.struc, document);
                    instance.dialog.al.innerHTML = (c.length != "undefined" ? c : c[0]).outerHTML;
                } else {
                    c = selector(expr || config.struc);
                    instance.dialog.al = c.length != "undefined" ? c : c[0];
                }
                config.struc = expr;
                c = new position(instance.dialog.al);
                instance.drag();
            }

            config.isloc && (c = new position(instance.dialog.al));

            instance.show();

            config.callback();

            if (config.time != "max" || time != void 0) {
                timeout = setTimeout(instance.hide, time || config.time);
            }

            instance._close = function () {
                clearInterval(timeout);
                instance.hide()
                config.closeCallback()
            };

            bindClick(queryselector(instance.dialog.al, config.close), instance._close)
        };

        layer.temps = function (expr, time, fun) {
            function g() {
                instance.hide();
                $m.isFunction(fun) && fun.call(config);
            }
            var timeout;
            if (!instance.dialog) {
                instance.dialog = new layerDialog;
                instance._mk = new layer.mask;
            }

            instance.dialog.al.innerHTML = renderTemp(config.temps, expr || config.data);

            config.drag && instance.drag();

            config.isloc && (new position(instance.dialog.al));

            instance.show();

            config.callback();

            if (config.time != "max" || time != void 0) {
                timeout = setTimeout(g, time || config.time);
            }

            instance._close = function () {
                clearInterval(time);
                g()
                config.closeCallback()
            };

            bindClick(queryselector(instance.dialog.al, config.close), instance._close)
        };

        layer.close = function (b, d) {
            Ymt.isString(b) ? (selector(b).style.display = "none", d && instance._close()) : instance._close()
        };


        this._main = function (expr, time, fun) {
            layerType = layerType.toLowerCase();
            switch (layerType) {
            case "alert":
                layer.alert(expr, time);
                break;
            case "struc":
                layer.struc(expr, time);
                break;
            case "temps":
                layer.temps(expr, time, fun);
                break;
            default:
                layer.alert(expr)
            }
        };

        this._close = function (a, b) {
            layer.close(a, b)
        };
        switch (layerType) {
        case "drag":
            layer.Drag()
        }
    }
    var DefaultConfig = {
            struc: null,
            temps: "",
            data: "",
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
            isloc: !0,
            callback: function () {},
            closeCallback: function () {}
        },
        Styles = {
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
    $m.augment(LayerBox, {
        close: function () {},
        alert: function (expr, time, fun) {
            this._main(expr, time, fun)
        },
        hide: function () {
            this.hide()
        },
        show: function () {},
        close: function (g, b) {
            this._close(g, b)
        }
    });
    return LayerBox;
});