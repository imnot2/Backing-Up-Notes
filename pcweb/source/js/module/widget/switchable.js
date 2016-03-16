define(function (require, exports, module) {

    //类
    function Switchable(selector, config) {
        //配置
        config = $m.merge(Switchable.Config, config || {});

        //容器selector
        this.container = $(selector);
        if (!this.container[0]) {
            return;
        }

        //实例id
        this.guid = ++index + module.uri;
        this.myevent = {};
        for (var c in EVENTTYPE) this.myevent[c] = EVENTTYPE[c] + this.guid;
        this.config = config;
        this.activeIndex = config.activeIndex;
        this._init()
    }

    //实例索引
    var index = 0,
        EVENTTYPE = {
            //初始化事件
            EVENT_INIT: "init",
            //选择前事件
            EVENT_BEFORE_SWITCH: "beforeSwitch",
            //选择后事件
            EVENT_SWITCH: "switch"
        };

    //默认配置
    Switchable.Config = {
        navCls: "wy-switchable-nav",
        contentCls: "wy-switchable-content",
        triggers: [],
        panels: [],
        hasTriggers: true, //事件
        hasDirection: false, //是否有方向选择
        directionTriggers: [], //方向selector
        directionTriggerType: "click", //方向移动类型
        triggerType: "mouse",
        delay: 0.1, //鼠标进入0.1秒延时后变化
        activeIndex: 0, //默认当前项索引
        activeTriggerCls: "current",
        switchTo: 0, //默认移动项索引
        triggerEvent: false,
        steps: 1, //每次移动数目
        viewSize: []
    };

    //switch类扩展集合

    //自动化扩展
    Switchable.Plugins = [];
    $m.mix(Switchable.Config, {
        autoplay: false,
        interval: 5,
        pauseOnHover: true
    });
    Switchable.Plugins.push({
        name: "autoplay",
        init: function (instance) {
            function loop() {
                return $m.later(function () {
                    instance.switchTo(instance.activeIndex < instance.length - 1 ? instance.activeIndex + 1 : 0, "forward")
                }, config.interval * 1E3, true);
            }

            var config = instance.config;
            if (config.autoplay) {
                if (config.pauseOnHover) {
                    instance.container.bind("mouseenter",
                        function () {
                            if (instance.switchInterval) {
                                instance.switchInterval.cancel();
                                instance.switchInterval = void 0;
                            }
                        });
                    instance.container.bind("mouseleave",
                        function () {
                            instance.switchInterval && instance.switchInterval.cancel();
                            instance.switchInterval = loop();
                        })
                }
                instance.switchInterval = loop();
            }
        }
    });


    //选择效果扩展
    $m.mix(Switchable.Config, {
        effect: "none",
        duration: 500,
        easing: "easeNone"
    });
    Switchable.Effects = {
        none: function (prevPanels, currentPanels, callback) {
            $(prevPanels).css("display", "none");
            $(currentPanels).css("display", "block");
            callback()
        },
        fade: function (prevPanels, currentPanels, callback) {
            if (prevPanels.length !== 1) return "\u5a23\uffe0\u6ba3\u5a23\uff04\u5e47\u93c1\u581f\u7049 \u7455\u4f79\u7730 steps==1";
            var that = this,
                prev = prevPanels[0],
                current = currentPanels[0];
            that.anim && that.anim.stop(true, true);
            $(current).css("opacity", 1);
            that.anim = $(prev).animate({
                    opacity: 0
                },
                this.config.duration,
                function () {
                    that.anim = void 0;
                    $(current).css("z-index", 2);
                    $(prev).css("z-index", 1);
                    callback()
                })
        },
        scroll: function (a, e, callback, index) {
            var that = this;
            e = that.config.effect === "scrollx";
            var d = {};
            d[e ? "left" : "top"] = -(that.viewSize[e ? 0 : 1] * index) + "px";
            that.anim && that.anim.stop();
            that.anim = $(that.content).animate(d, that.config.duration,
                function () {
                    that.anim = void 0;
                    callback()
                })
        }
    };

    Switchable.Effects.scrollx = Switchable.Effects.scrolly = Switchable.Effects.scroll;

    Switchable.Plugins.push({
        name: "effect",
        init: function (instance) {
            var config = instance.config,
                effect = config.effect,
                panels = instance.panels,
                content = instance.content,
                steps = config.steps;
            if (!panels[0]) {
                return;
            }
            instance.viewSize = [config.viewSize[0] || panels[0].offsetWidth * steps, config.viewSize[1] || panels[0].offsetHeight * steps];
            if (effect !== "none") {
                $.each(panels,
                    function (k, elem) {
                        $(elem).css("display", "block");
                    });
                switch (effect) {
                case "scrollx":
                case "scrolly":
                    content.css("position", "absolute");
                    content.parent().css("position", "relative");
                    if (effect === "scrollx") {
                        panels.css("float", "left");
                        content.width(instance.viewSize[0] * (panels.length / steps))
                    }
                    break;
                case "fade":
                    var prev = instance.activeIndex * steps,
                        q = prev + steps - 1,
                        isCurrent;
                    $(panels[0].parentNode).css("position", "relative");
                    $.each(panels, function (index, elem) {
                        isCurrent = index >= prev && index <= q;
                        $(elem).css({
                            opacity: isCurrent ? 1 : 0,
                            position: "absolute",
                            zIndex: isCurrent ? 2 : 1
                        })
                    });
                    break
                }
            }
        }
    });

    //switchable 实例方法
    $m.augment(Switchable, {

        //主类初始化
        _init: function () {
            var that = this,
                config = that.config;
            that._parseMarkup();
            config.hasTriggers && that._bindTriggers();
            //前一帧后一帧事件bind
            if (config.hasDirection && config.directionTriggers.length == 2) {
                this.prevTrigger = $(config.directionTriggers[0], this.container);
                this.nextTrigger = $(config.directionTriggers[1], this.container);
                this._bindDirection();
            }
            $.each(Switchable.Plugins,
                function (c, d) {
                    d.init && d.init(that);
                });
            config.switchTo && that.switchTo(config.switchTo);
            that.container.trigger(that.myevent.EVENT_INIT);
        },

        //自定义事件绑定
        on: function (evt, callback) {
            this.container.bind(evt + this.guid,
                function (c, d) {
                    callback.call(c, d)
                })
        },

        //初始化准备容器
        _parseMarkup: function () {
            var container = this.container,
                config = this.config,
                content,
                triggers = [],
                panels = [];
            if (!config.triggers.length && !config.panels.length) {
                triggers = $(config.navCls, container);
                content = $(config.contentCls, container);
                panels = content.children()
            }
            else if ($m.isString(config.panels)) {
                triggers = $(config.triggers, container);
                panels = $(config.panels, container);
            }
            else {
                triggers = config.triggers || [];
                panels = config.panels || [];
            }
            var num = panels.length;
            this.length = num / config.steps;

            if (config.hasTriggers && num > 0 && triggers.length === 0) triggers = this._generateTriggersMarkup(this.length);
            this.triggers = triggers;
            this.panels = panels;
            this.content = content || $(panels[0] && panels[0].parentNode || triggers[0] && triggers[0].parentNode)
        },

        //初始化触发焦点
        _generateTriggersMarkup: function (length) {
            var triggers = $("<ul></ul>"),
                li,
                e;
            triggers.addClass(this.config.navCls);
            for (e = 0; e < length; e++) {
                li = $("<li></li>");
                e === this.activeIndex && li.addClass(this.config.activeTriggerCls);
                li.html(e + 1);
                triggers.append(li)
            }
            this.container.append(triggers);
            return triggers.children()
        },

        //左右方向bind
        _bindDirection: function () {
            var that = this,
                config = this.config;
            this.prevTrigger.bind(config.directionTriggerType, function () {
                that.prev();
                that.switchInterval && that.switchInterval.cancel();
                return config.triggerEvent;
            });
            this.nextTrigger.bind(config.directionTriggerType, function () {
                that.next();
                that.switchInterval && that.switchInterval.cancel();
                return config.triggerEvent;
            });
        },

        //bind焦点
        _bindTriggers: function () {
            var that = this,
                config = that.config,
                triggers = that.triggers,
                item,
                e,
                length = triggers.length;
            for (e = 0; e < length; e++)(function (f) {
                item = triggers[f];
                $(item).click(function () {
                    that._onFocusTrigger(f);
                    return config.triggerEvent;
                });
                if (config.triggerType === "mouse") {
                    $(item).bind("mouseenter",
                        function () {
                            that._onMouseEnterTrigger(f);
                            return config.triggerEvent;
                        });
                    $(item).bind("mouseleave",
                        function () {
                            that._onMouseLeaveTrigger(f);
                            return config.triggerEvent;
                        })
                }
            })(e)
        },

        //选择焦点
        _onFocusTrigger: function (index) {
            if (this._triggerIsValid(index)) {
                this._cancelSwitchTimer();
                this.switchTo(index)
            }
        },

        //焦点focus时
        _onMouseEnterTrigger: function (index) {
            var b = this;
            if (b._triggerIsValid(index)) b.switchTimer = $m.later(function () {
                    b.switchTo(index)
                },
                b.config.delay * 1E3)
        },

        //焦点失去时
        _onMouseLeaveTrigger: function () {
            this._cancelSwitchTimer()
        },


        //判断是否是当前节点
        _triggerIsValid: function (index) {
            return this.activeIndex !== index
        },

        //退出播放，清除轮播句柄
        _cancelSwitchTimer: function () {
            if (this.switchTimer) {
                this.switchTimer.cancel();
                this.switchTimer = void 0
            }
        },

        //停止轮播
        stop: function () {
            if (this.switchInterval) {
                this.switchInterval.cancel();
                this.switchInterval = void 0;
            }
            this._cancelSwitchTimer();
        },

        //自动轮播
        autoplay: function () {
            if (this.config.autoplay) {
                for (var i = 0, len = Switchable.Plugins.length; i < len; i++) {
                    if (Switchable.Plugins[i].name == "autoplay") {
                        Switchable.Plugins[i].init(this);
                        return;
                    }
                }
            }

        },


        //视图切换主方法
        switchTo: function (index, direction) {
            var config = this.config,
                steps = config.steps,
                count = this.activeIndex * steps,
                nextcount = index * steps;
            if (!this._triggerIsValid(index)) {
                return this;
            }
            if (config.hasTriggers) {
                this._switchTrigger(this.activeIndex > -1 ? this.triggers[this.activeIndex] : null, this.triggers[index]);
            }
            if (direction === void 0) {
                direction = index > this.activeIndex ? "forward" : "backward";
            }
            this.container.trigger(this.myevent.EVENT_BEFORE_SWITCH, {
                container: this.container,
                currentIndex: index
            });
            this._switchView(this.panels.slice(count, count + steps), this.panels.slice(nextcount, nextcount + steps), index, direction);
            this.activeIndex = index;
            return this
        },

        //焦点切换
        _switchTrigger: function (blurElem, focusElem) {
            var activeCls = this.config.activeTriggerCls;
            blurElem && $(blurElem).removeClass(activeCls);
            $(focusElem).addClass(activeCls)
        },

        //视图切换
        _switchView: function (prevPanels, nextPanels, index, direction) {
            try {
                var that = this,
                    effect = that.config.effect;
                ($m.isFunction(effect) ? effect : Switchable.Effects[effect]).call(that, prevPanels, nextPanels,
                    function () {
                        that._fireOnSwitch(index);
                    },
                    index, direction)
            }
            catch (e) {}
        },

        //选择焦点触发自定义事件
        _fireOnSwitch: function (index) {
            this.container.trigger(this.myevent.EVENT_SWITCH, {
                container: this.container,
                currentIndex: index
            })
        },

        //上一帧
        prev: function () {
            this.switchTo(this.activeIndex > 0 ? this.activeIndex - 1 : this.length - 1, "backward")
        },

        //下一帧
        next: function () {
            this.switchTo(this.activeIndex < this.length - 1 ? this.activeIndex + 1 : 0, "forward")
        }
    });
    return Switchable
});