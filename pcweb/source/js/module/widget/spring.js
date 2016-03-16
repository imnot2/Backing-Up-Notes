define(function (require, exports, module) {
    function b(d, a) {
        var g = this;
        if (!(g instanceof b)) return new b(d, $m.merge(i, a));
        a = this.config = a;
        a.direction = a.direction.toLowerCase();
        a.container = $(d);
        a.contentCls = $(a.contentCls, a.container);
        a.trigger = $(a.triggerCls[0], a.container);
        var f = function () {
                if (a.relative) {
                    a.container.css({
                        'position': 'relative',
                        'z-index': a.zindex
                    });
                    this.el = $('<span></span>');
                    var clone = a.contentCls.clone();
                    this.el.append(clone);
                    a.contentCls.replaceWith(this.el);
                    a.contentCls = clone;
                } else {
                    this.el = a.contentCls;
                }
            },
            s = new f;
        $m.augment(f, {
            _close: function (m, n) {
                this.el.animate(m, a.speed, function () {
                    n.find('.txt').html(a.triggertext[0]);
                    a.triggerCls[1] && n.removeClass(a.triggerCls[1]);
                });
                return false;
            },
            _show: function (m, n) {
                this.el.animate(m, a.speed, function () {
                    n.find('.txt').html(a.triggertext[1]);
                    a.triggerCls[1] && n.addClass(a.triggerCls[1]);
                });
                return false;
            }
        });

        function trim(b) {
            var a = /^\s|\.|\s$/g;
            b = b.replace(a, '');
            return b;
        }
        a.triggerCls[1] = trim(a.triggerCls[1]);
        f.down = function () {
            var h = a.init[0],
                con = a.contentCls,
                sh = a.init[1] || (con.children().length > 1 ? con.outerHeight() : con.find(":first").outerHeight()),
                w = con.outerWidth();
            if (a.relative) {
                s.el.css({
                    'display': con.css('display'),
                    'width': w,
                    'position': 'absolute',
                    'right': a.pos[1],
                    'top': a.pos[0],
                    'z-index': a.zindex + 1
                });
                a.addstyle != '' && s.el.addClass(a.addstyle)
            }!!a.init[0] && s.el.height(a.init[0]);
            s.el.css('overflow', 'hidden');
            a.trigger.live('click', {
                open: a.open
            }, function (event) {
                var open = event.data.open = !event.data.open;
                if (open) {
                    s._show({
                        height: sh
                    }, $(this));
                } else {
                    s._close({
                        height: h
                    }, $(this));
                }
            });
        }
        switch (a.direction) {
        case "up":
        case 'down':
            f.down();
            break;
        case 'left':
        case 'right':
            f.right();
            break;
        default:
            f.down();
        }
    }
    var i = {
        contentCls: ".spring-content",
        triggerCls: ['.spring-trigger', '.spring-trigger-hover'],
        relative: !1,
        eventtype: 'click',
        direction: 'down',
        speed: 200,
        init: [0, 0],
        triggertext: ['展开', '收起'],
        pos: [0, 0],
        open: 0,
        addstyle: '',
        zindex: 10000
    };
    return b
});