define(function () {
    var switchable = require('widget.Switchable');
    //console.log(switchable)
    function b(d, a) {
        if (a.panels === void 0 && $(a.triggers) !== void 0) {
            for (var e = $(d + " " + a.triggers), h = e.length, f = document.createElement("div"), g = 0; g < h; g++) f.appendChild(document.createElement("div"));
            a.panels = $(f.children);
            a.triggers = e
        }
        if (! (this instanceof b)) return new b(d, $m.merge(i, a));
        b.superclass.constructor.call(this, d, a)
    }
    var i = {
        navCls: "wy-tabs-nav",
        contentCls: "wy-tabs-content"
    };
    $m.extend(b, switchable);
    return b
});

