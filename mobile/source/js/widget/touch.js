define(function (require, exports, module) {
    function touch(container, config) {
        if (!(this instanceof touch))
            return new touch(container, $m.merge({ skew: 20, isscale: !1, isrotate: !1, boundary: 10, multipoint: !1, direction: 0, scrollSupressionThreshold: 10 }, config));
        this.container = typeof container === "string" ? $m.node(container) : container;
        this.config = config;
        this._eventInt();
    }
    touch.istouch = 'ontouchend' in document;
    $m.each('touchleft touchright touchtop touchbottom touchstart touchmove touchend touchcancel'.split(' '), function (a, b) {
        touch.prototype[a] = function (callback) {
            this.container.bind(a, callback);
        }
    });
    $m.augment(touch, {
        _eventInt: function () {
            var startTouch, moveTouch, endTouch, config = this.config, that = this, data = config.data, istouch = this.constructor.istouch;

            function touchstart(e) {
                var touch = istouch ? e.originalEvent.touches[0] : (that.trigger('touchstart'), e.originalEvent);
                $m.data.set(e.currentTarget, 'spos', { pageX: touch.pageX, pageY: touch.pageY })
                e.stopPropagation();
            }
            function touchmove(e) {
                var moveTouch = istouch ? e.originalEvent.touches[0] : (that.trigger('touchmove'), e.originalEvent);
                var startTouch = $m.data.get(e.currentTarget, 'spos')
                if (startTouch) {
                    var x = Math.abs(startTouch.pageX - moveTouch.pageX), y = Math.abs(startTouch.pageY - moveTouch.pageY);
                    if (!config.direction) {
                        x > y && e.preventDefault();
                    } else {
                        x < y && e.preventDefault();
                    }
                }
            }
            function touchend(e) {
                var endTouch = istouch ? e.originalEvent.changedTouches[0] : (that.trigger('touchend'), e);
                var startTouch = $m.data.get(e.currentTarget, 'spos')
                if (!config.multipoint && startTouch && endTouch) {
                    touchendhandle(startTouch, endTouch, e);
                }
            }

            function touchendhandle(stouch, etouch, e) {
                if (that.getDistance(stouch, etouch) > config.skew) {
                    if (Math.abs(stouch.pageX - etouch.pageX) > config.boundary) {
                        stouch.pageX > etouch.pageX ? that.trigger('touchleft') : that.trigger('touchright');
                        e.preventDefault();
                    }
                    if (Math.abs(stouch.pageY - etouch.pageY) > config.boundary) {
                        stouch.pageY > etouch.pageY ? that.trigger('touchtop') : that.trigger('touchbottom');
                        e.preventDefault();
                    }
                }
            }
            if (!istouch) {
                this.container.bind('mousedown', touchstart);
                this.container.bind('mousemove', touchmove);
                this.container.bind('mouseup', touchend);
            } else {
                this.touchstart(touchstart);
                this.touchmove(touchmove);
                this.touchend(touchend);
            }
        },
        getDistance: function (p1, p2) {
            var m = p1.pageX - p2.pageX;
            var n = p1.pageY - p2.pageY;
            return Math.round(Math.pow((m * m + n * n), 0.5));
        },
        trigger: function (evt, data) {
            $m.event.trigger(this.container[0], evt, data || this.config.data);
        }
    });
    return touch;
});

