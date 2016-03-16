define(function (require, exports, module) {
    return $m.create(
    {
        agent: navigator.userAgent,
        hump: function (s) {
            var a = s.split(/\.-/);
            a[0] = a[0].toLowerCase();
            for (var i = 1, len = a.length; i < len; i++) {
                a[i] = a[i].charAt(0).toUpperCase() + a[i].slice(1);
            }
            return a.join("");
        },
        isWebKit: function () {
            return /webKit/ig.test(this.agent);
        },
        isMoz: function () {
            return /firefox/ig.test(this.agent);
        },
        isSafari: function () {
            return /safari/ig.test(this.agent);
        }
    },
    {
        stop: function () {
            $m.node.attr(this.container, 'style', this.style);
            this.timeout && this.timeout.cancel();
            this.pause = !0;
            return this;
        },
        delay: function (n) {
            this.options.delay = n;
            return this;
        },
        play: function () {
            this.pause = !1;
            return this;
        },
        init: function (elem, prop, options) {
            var that = this;
            var duration = {
                slow: 1000,
                normal: 500,
                fast: 200
            }
            this.container = elem;
            var srcStyle = $m.data.get(elem, 'srcstyle');
            if (!srcStyle) {
                (this.style = $m.node.attr(elem, 'style')) && $m.data.set(elem, 'srcstyle', this.style);
            } else {
                this.style = srcStyle
            }
            var ops = that.options = $m.merge({
                speed: 'normal',
                easing: 'ease-in-out',
                callback: null,
                delay: 0
            }, options);
            if ($m.isString(ops.speed)) {
                ops.speed = duration[ops.speed];
            }
            if (!this.pause) {
                that._createClass(prop);
            }
        },
        _createClass: function (prop) {
            var prefix = ['-webkit-', '-moz-', '-o-', ''];
            var anims = [],
                cst = this.constructor,
                css = {},
                val = [],
                that = this,
                opt = that.options,
                csssrc = $m.node.css(that.container),
                prev = cst.isWebKit() ? prefix[0] : cst.isMoz() ? prefix[1] : cst.isSafari() ? prefix[2] : prefix[3],
                pos = /^(left|right|top|bottom)/i, ispos = !1, param;

            anims.push(prev + 'transition:');
            param = ' ' + opt.speed + 'ms ' + opt.easing + ' ' + opt.delay + 'ms';
            $m.each(prop, function (a, b) {
                b = that.constructor.hump(b);
                css[b] = a;
                ispos = ispos || pos.test(b);
                if (!pos.test(b)&&csssrc[b] != a) {
                    val.push(b + param);
                }
            });
            val = val.length == 0 ? 'all' + param : val.join(',');
            val = val + ';'
            anims.push(val);
            anims.push('transition:' + val);
            if (ispos) {
                anims.push(prev + 'transform:translate3d(');
                val = (css.left || css.right || 0) + 'px,' + (css.top || css.bottom || 0) + 'px,0px);';
                anims.push(val);
                anims.push('transform:translate3d(' + val);
            }
            anims.push(this.style);
            $m.node.attr(that.container, 'style', anims.join(''));
            this.timeout = $m.later(function () {
                that.options.callback.call(that, that.container);
            }, that.options.speed + that.options.delay)
        }
    });

});
//object.style.animationPlayState="paused"