define(function (require, exports, module) {
    var switchable = require('./switchable');
    //console.log(switchable)
    function Tabs(container, config) {
        if (config.panels === void 0 && $(config.triggers) !== void 0) {
            for (var e = $(container + " " + config.triggers), h = e.length, f = document.createElement("div"), g = 0; g < h; g++) f.appendChild(document.createElement("div"));
            config.panels = $(f.children);
            config.triggers = e
        }
        if (!(this instanceof Tabs)) return new Tabs(container, $m.merge(def, config));
        Tabs.superclass.constructor.call(this, container, config)
    }
    var def = {
        navCls: "wy-tabs-nav",
        contentCls: "wy-tabs-content"
    };
    $m.extend(Tabs, switchable);
    return Tabs
})