Ymt.add(function() {
    function e(a, d) {
        if (!(this instanceof e)) return new e(a, $m.merge(i, d));
        var c,that=this;
        this.config=c = d;
        this.container = document.createDocumentFragment().appendChild(document.createElement("div"));
        if (typeof c.handle == "string") {
            this.handle = this.container.appendChild(document.createElement("div"));
            this.handle.className = c.handle;
        } else if (typeof c.handle=="object"&&c.handle.nodeType==1) {
            this.handle = c.handle;
        }
        var root = document.documentElement || document.body, ie = /MSIE\s*(\d)/.exec(navigator.userAgent), iev = ie && ie[1],
            evt = {
                addEvent: document.addEventListener ?
                function (a, b, d) {
                    a.addEventListener && a.addEventListener(b, d, !1)
                } : function (a, b, d) {
                    a.attachEvent && a.attachEvent("on" + b, d)
                },
                removeEvent: document.removeEventListener ?
                function (a, b, d) {
                    a.removeEventListener && a.removeEventListener(b, d, !1)
                } : function (a,
                b, d) {
                    a.detachEvent && a.detachEvent("on" + b, d)
                }
        };
        $m.mix(this.container.style, {
            visibility: "hidden",
            position: 'absolute',
            bottom: -c.bottom + 'px',
            left: c.left,
            marginLeft: c.offsetx + 'px',
            zIndex: 1000
        });
        document.body.appendChild(this.container);
        evt.addEvent(that.handle, 'mouseover', function () {
            that.handle.className = c.handle + " " + c.over;
        })
        evt.addEvent(that.handle, 'mouseout', function () {
            that.handle.className = c.handle;
        })
        evt.addEvent(that.handle, 'click', function () {
            window.scrollTo(0,0)
        })
        var state = {
            cwidth: Math.max(root.clientWidth, root.scrollWidth),
            cheight: root.clientHeight,
            sheight:Math.max(root.scrollHeight,root.offsetHeight),
            width: Math.max(that.container.clientWidth, that.container.scrollWidth),
            height: Math.max(that.container.clientHeight, that.container.scrollHeight)
        }
        function scroll(e) {
            var e = window.event || e,s=state,top,t=that,c=t.config;
            top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (top - s.height - c.offsety > c.bottom) {
                iev && iev < 7 ? $m.mix(t.container.style, {
                    position: 'absolute',
                    top: s.cheight+top-c.offsety -50+ 'px',
                    visibility: 'visible'
                }) : $m.mix(t.container.style, {
                    position: 'fixed',
                    bottom: c.offsety+'px',
                    visibility: 'visible'
                })
            } else {
                $m.mix(t.container.style, {
                    position: 'absolute',
                    bottom: -c.bottom + 'px',
                    visibility: 'hidden'
                })
            }
        }
        function bind(ele,type,fun) {
            if (ele.attachEvent) {
                ele.attachEvent('on'+type, fun)
            } else if (ele.addEventListener) {
                ele.addEventListener(type, fun)
            }
        }
        bind(window, 'scroll', scroll);
    }
    var i = {
        handle: 'backtop',
        over: 'backover',
        offsetx:520,
        offsety: 100,
        left:'50%',
        bottom: 100
    };
    return e;
});
