define(function (require, exports, module) {
    function module(g, n) {
        if (!(this instanceof module)) return new module(g, $m.merge(config, n));
        var c, length, interval = null,
            that = this,
            i = 0;
        c = this.config = n;
        c.container = $(g);
        if (c.container.size() == 0) {
            return;
        }
        c.content = c.container.find(c.content);
        c.panel = c.container.find(c.panel);
        c.trigger = c.container.find(c.trigger);
        c.length = c.trigger.size();
        c.currentIndex = 0;
        c.prevIndex = 0;
        c.interval = c.interval * 1000;
        c.li = c.content.children().first().outerHeight();

        function auto() {
            interval = setInterval(function () {
                c.prevIndex = c.currentIndex;
                c.currentIndex = c.currentIndex + 1;
                c.currentIndex = c.currentIndex > c.length - 1 ? 0 : c.currentIndex;
                that.switchTo(c.currentIndex, c.prevIndex);
            }, c.interval);
        }

        function pause() {
            if (interval) {
                clearInterval(interval);
            }
        }
        $(c.panel).mouseleave(function () {
            auto();
        });
        $(c.panel).mouseenter(function () {
            pause();
        });
        for (i = 0; i < c.length; i++)
            (function (i) {
                var trigger = c.trigger[i];
                if (c.event.toLowerCase() == "click") {
                    $(trigger).click(function () {
                        that.switchTo(i, c.currentIndex);
                        c.currentIndex = i;
                    });
                }
                if (c.event.toLowerCase() == "mouse") {
                    $(trigger).mouseenter(function () {
                        pause()
                        if (i != c.currentIndex) {
                            that.switchTo(i, c.currentIndex);
                        }
                        c.currentIndex = i;
                    });
                    $(trigger).mouseleave(function () {
                        auto();
                    });
                }
            })(i)
        auto();
    }
    var config = {
        panel: "",
        content: "",
        trigger: "",
        event: "click",
        time: 500,
        auto: !1,
        interval: 4
    };
    $m.augment(module, {
        switchTo: function (a, b) {
            var c = this.config,
                ch = c.content.outerHeight() / c.length;
            c.panel.css({
                "position": "relative",
                "overflow": "hidden"
            });
            c.content.css({
                "position": "absolute"
            });
            c.content.animate({
                top: -ch * a
            }, c.time);
            $(c.trigger[a]).addClass("current");
            $(c.trigger[b]).removeClass("current");
        }
    });
    return module;
})