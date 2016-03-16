/*=======================autoplay.js===========================*/
WOYO.add("widget.switchable.pulgins.Autoplay", 
function(b, h, f) {
    b.mix(b.widget.Switchable.Config, {
        autoplay: false,
        interval: 5,
        pauseOnHover: true
    });
    b.widget.Switchable.Plugins.push({
        name: "autoplay",
        init: function(a) {
            function e() {
                c = b.later(function() {
                    a.paused || a.switchTo(a.activeIndex < a.length - 1 ? a.activeIndex + 1: 0, "forward")
                },
                g, true)
            }
            var d = a.config,
            g = d.interval * 1E3,
            c;
            if (d.autoplay) {
                if (d.pauseOnHover) {
                    a.container.bind("mouseenter", 
                    function() {
                        if (c) {
                            c.cancel();
                            c = f
                        }
                        a.paused = true
                    });
                    a.container.bind("mouseleave", 
                    function() {
                        a.paused = false;
                        e()
                    })
                }
                e()
            }
        }
    })
});
