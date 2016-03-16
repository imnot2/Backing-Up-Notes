define(function (require, exports, module) {
    function ImgLazyLoad(container, config) {
        function handle() {

            if (imgs.length) {

                timeout && timeout.cancel();

                timeout = $m.later(function () {
                    timeout.cancel();
                    var result = [],
                        offset = {
                            top: document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                            left: document.documentElement.clientWidth + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)
                        };
                    $m.each(imgs,
                        function (img) {
                            if ($(img).offset().top <= offset.top * config.screen + config.size) {
                                var attrb = $(img).attr(config.attrb);
                                attrb && $(img).attr("src", attrb).removeAttr(config.attrb)
                            } else result.push(img)
                        });
                    imgs = result;
                }, config.timeout);

            } else {
                listener.removeEvent(window, "resize", handle), listener.removeEvent(window, "scroll", handle);
            }

        }
        if (!(this instanceof ImgLazyLoad)) return new ImgLazyLoad(container, $m.merge(k, config));
        this.container = $(container);
        this.config = config;
        var imgs = this.container.find("img[" + config.attrb + "]");
        listener.addEvent(window, "resize", handle);
        listener.addEvent(window, "scroll", handle);
        $(document).ready(handle);
    }

    var k = {
            attrb: "lazysrc",
            timeout: 200,
            screen: 1,
            size: 680
        },
        timeout,
        listener = {
            addEvent: function (elem, eventType, handle) {
                elem.addEventListener ? elem.addEventListener(eventType, handle, !1) : elem.attachEvent ? elem.attachEvent("on" + eventType, handle) : elem["on" + eventType] = handle
            },
            removeEvent: function (elem, eventType, handle) {
                elem.removeEventListener ? elem.removeEventListener(eventType, handle, !1) : elem.detachEvent ? elem.detachEvent("on" + eventType, handle) : elem["on" + eventType] = null
            }
        };
    return ImgLazyLoad;
});