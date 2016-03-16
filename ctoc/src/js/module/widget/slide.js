Ymt.add(function(require, exports, module) {
    var switchable = require('module/widget/Switchable');

    function Slide(c, d) {
        if (!(this instanceof Slide)) return new Slide(c, d);
        Slide.superclass.constructor.call(this, c, $m.merge(e, d))
    }
    var e = {
        navCls: "wy-slide-nav",
        contentCls: "wy-slide-content",
        autoplay: true,
        circular: true
    };
    $m.extend(Slide, switchable);
    return Slide;
});