Ymt.add(function () {
    function e(b, f) {
        function j() {
            var c = a.container.style;
            if (parseInt(c.width)) a.config.width = parseInt(c.width);
            else c.width = a.config.width + "px";
            if (parseInt(c.height)) a.config.height = parseInt(c.height);
            else c.height = a.config.height + "px";
            a.style = "width:" + a.config.width + "px; height:" + a.config.height + "px; overflow:hidden; float:left;"
        }
        function k() {
            j();
            a.container.style.overflow = "hidden";
            a.container.innerHTML = "";
            var c = document.createElement("DIV");
            c.style.width = a.config.width *
            2 + "px";
            a.container.appendChild(c);
            l(c, a)
        } //横向滚动
        function m() {
            j();
            a.container.style.overflow = "hidden";
            a.container.innerHTML = "";
            var c = document.createElement("DIV");
            c.style.height = a.config.height * 2 + "px";
            a.container.appendChild(c);
            l(c, a)
        } //竖向滚动
        function l(c, n) {
            var g = document.createElement("DIV"),
            h = document.createElement("DIV");
            g.style.cssText = h.style.cssText = n.style;
            g.style["float"] = h.style["float"] = "left";
            g.innerHTML = h.innerHTML = n.inner;
            c.appendChild(g);
            c.appendChild(h)
        }
        function o() {
            if (a.container.scrollLeft - a.config.width >=
            0) a.container.scrollLeft -= a.config.width;
            else {
                a.scrollCount -= a.config.scrollamount;
                a.container.scrollLeft += a.config.scrollamount
            }
            i = 1;
            if (a.scrollCount > 0 || a.config.loop == 0) a.timer = $m.later(o, a.config.scrolldelay);
            else a.stop()
        } //TO left
        function p() {
            if (a.container.scrollLeft <= 0) a.container.scrollLeft += a.config.width;
            else {
                a.container.scrollLeft -= a.config.scrollamount;
                a.scrollCount -= a.config.scrollamount
            }
            i = 2;
            if (a.scrollCount > 0 || a.config.loop == 0) a.timer = $m.later(p, a.config.scrolldelay);
            else a.stop()
        } //TO right
        function q() {
            if (a.container.scrollTop -
            a.config.height >= 0) a.container.scrollTop -= a.config.height;
            else {
                a.container.scrollTop += a.config.scrollamount;
                a.scrollCount -= a.config.scrollamount
            }
            i = 3;
            if (a.scrollCount > 0 || a.config.loop == 0) a.timer = $m.later(q, a.config.scrolldelay);
            else a.stop()
        } //To top
        function r() {
            if (a.container.scrollTop <= 0) a.container.scrollTop += a.config.height;
            else {
                a.container.scrollTop -= a.config.scrollamount;
                a.scrollCount -= a.config.scrollamount
            }
            i = 4;
            if (a.scrollCount > 0 || a.config.loop == 0) a.timer = $m.later(r, a.config.scrolldelay);
            else a.stop()
        } //TO Buttom
        var a = this,
        i = 1;
        f = f || {};
        if (!(a instanceof e)) return new e(b, $m.merge(t, f));
        a.container = document.getElementById(b);
        a.config = f;
        a.timer = null;
        a.inner = a.container.innerHTML;
        a.scrollCount = 0;
        a.moveLeft = function () {
            k();
            a.stop();
            a.timer = $m.later(o, a.config.scrolldelay)
        };
        a.moveRight = function () {
            k();
            a.stop();
            a.timer = $m.later(p, a.config.scrolldelay)
        };
        a.moveUp = function () {
            m();
            a.stop();
            a.timer = $m.later(q, a.config.scrolldelay)
        };
        a.moveDown = function () {
            m();
            a.stop();
            a.timer = $m.later(r, a.config.scrolldelay)
        }
    };
    var t = {
        direction: "left",
        loop: 0,
        scrollamount: 0,
        scrolldelay: 0,
        width: 900,
        height: 50
    };
    $m.augment(e, {
        stop: function () {
            this.timer && this.timer.cancel();
            this.timer = null
        },
        Continue: function () {
            switch (this.config.direction) {
                case "left":
                    this.moveLeft();
                    break;
                case "right":
                    this.moveRight();
                    break;
                case "up":
                    this.moveUp();
                    break;
                case "down":
                    this.moveDown();
                    break;
                default:
                    this.moveLeft();
                    break
            }
        },
        start: function () {
            var b = this;
            $m.later(function () {
                b.container.scrollLeft = 0;
                b.container.scrollTop = 0
            },
            0);
            switch (b.config.direction) {
                case "left":
                    b.scrollCount =
                b.config.loop * b.config.width;
                    b.moveLeft();
                    break;
                case "right":
                    b.scrollCount = b.config.loop * b.config.width;
                    b.moveRight();
                    break;
                case "up":
                    b.scrollCount = b.config.loop * b.config.height;
                    b.moveUp();
                    break;
                case "down":
                    b.scrollCount = b.config.loop * b.config.height;
                    b.moveDown();
                    break;
                default:
                    b.scrollCount = b.config.loop * b.config.width;
                    b.moveLeft();
                    break
            }
            $(b.container).mouseenter(function () {
                b.stop()
            });
            $(b.container).mouseout(function () {
                b.Continue()
            })
        }
    });
    return e
});
