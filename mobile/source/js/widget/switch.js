define(function (require, exports, module) {
    function a(c, d) {
        if (!(this instanceof a)) return new a(c, $m.merge(config, d));
        this.guid = ++o + module.uri;
        this.myevent = {};
        this.config = d;
        this.observer = $m.event();
        this.container = $m.node(c);
        this.activeIndex = d.activeIndex;
        this.switchTimer = null;
        for (var i in d) {
            this.myevent[i] = d[i] + this.guid;
        }
        this.init()
    }
    var o = 0,
    config = {
        triggers: "wy-slide-nav",
        panels: "wy-slide-content",
        hasTrigger: !0,
        eventType: "click",
        triggerEvent: !1,
        activeIndex: 0,
        activeTriggerCls:'current',
        autoplay: true,
        interval: 5,
        step: 1,
        effect:'scrollx',
        duration: 1000,
        viewSize:[0,0]
    },
    e = {
        EVENT_INIT: "init",
        EVENT_BEFORE_SWITCH: "beforeSwitch",
        EVENT_SWITCH: "switch"
    },
    touch=require('widget/touch'),
    animate = require('util/animate'),
    effects = {
        scroll: function (f, b) {
            var c = this,a = c.config,e = a.effect === "scrollx";
            var d = {};
            $m.node.css(c.content, 'width', c.viewSize[0] * (c.length / a.step) + 'px');
            //$m.node.css(c.content, 'height', c.viewSize[1] + 'px')
            d[e ? "left" : "top"] = -(c.viewSize[e ? 0 : 1] * b);
            c.anim && c.anim.stop();
            c.anim = animate(c.content, d, {
                speed: a.duration,
                callback: function () {
                    c.anim = void 0;
                    f()
                }
            });
        }
    }
    effects.scrollx = effects.scrolly = effects.scroll;
    $m.augment(a, {
        _prepare: function () {
            
            var triggers = this.triggers, panels = this.panels;

            this.length = panels.length;
            this.content = panels[0] && panels[0].parentNode || triggers[0] && triggers[0].parentNode
            var e, h = triggers.length, that = this, c = that.config;
           
            this.viewSize = [c.viewSize[0] || panels[0].offsetWidth * c.step, c.viewSize[1] || panels[0].offsetHeight * c.step];

            panels.css('width', 100 / this.length + '%');

            var touche = touch(this.container);
            touche.touchstart(function () {
                that.stop()
            })
            touche.touchleft(function () {
                that.prev()
            });
            touche.touchright(function () {
                that.next();
            });
            touche.touchend(function () {
                that.autoplay()
            })
            for (e = 0; e < h; e++) (function (f) {
                var d = triggers.eq(f), m = panels[f];
                $m.event.bind(d, 'click', function () {
                    that.switchTo(f)
                });
            })(e)
        },
        stop: function () {
            if (this.switchTimer) {
                this.switchTimer.cancel();
                this.switchTimer = void 0;
            }
        },
        focus: function (n) {
            var that = this;
            that.switchTo(n);
        },
        autoplay: function () {
            var that = this;
            if (this.config.autoplay) {
                this.switchTimer = $m.later(function () {
                    that.switchTo(that.activeIndex < that.length - 1 ? that.activeIndex + 1 : 0);
                }, this.config.interval*1E3, true);
            }
        },
        init: function () {
            this.triggers = $m.node(this.config.triggers, this.container);
            this.panels = $m.node(this.config.panels, this.container);
            if (!this.panels[0]) {
                return;
            }
            this._prepare();
            this.observer.emit(this.myevent.EVENT_INIT);
            this.switchTo(this.activeIndex);
            this.autoplay();
        },
        switchTo: function (n) {
            var that = this, c = that.config, d = {
                container: that.container,
                currentIndex: n
            };
            this.triggers && this._switchTrigger(n);
            this.observer.emit(this.myevent.EVENT_BEFORE_SWITCH, d);
            this._switchView(d);
            this.activeIndex = n;
        },
        _switchView: function (d) {
            var that = this;
            effects[this.config.effect].call(this, function () {
                that.observer.emit(that.myevent.EVENT_SWITCH, d);
            }, d.currentIndex);
        },
        _switchTrigger: function (a) {
            var c = this.config.activeTriggerCls;
            $m.node.removeClass(this.triggers.eq(this.activeIndex), c);
            $m.node.addClass(this.triggers.eq(a), c);
        },
        next: function () {
            var a = this.activeIndex;
            this.switchTo(a > 0 ? a - 1 : this.length - 1)
        },
        prev: function () {
            var a = this.activeIndex;
            this.switchTo(a < this.length - 1 ? a + 1 : 0)
        },
        on: function (evt, callback) {
            this.observer.on(evt + this.guid, callback);
        }
    });
    return a;
});