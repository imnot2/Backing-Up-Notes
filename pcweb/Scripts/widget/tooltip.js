Ymt.add(function (require, exports, module) {
    function u(g, b) {
        if (!(this instanceof u)) return w = new u(g, $m.merge(F, b));
        this.config = b;
        this.config.type = g;
    }
    var w = null;
    function E(a) {
        var b = this.config = $m.merge(w.config, a || {}), f = u;
        this.container = document.getElementById(b.container);
        if (this.container != null) {
            this.content = f.find(this.container, b.content)[0];
            this.handle = f.find(this.container, b.trigger);
            this.closecls = f.find(this.container, b.closecls)[0];
        }
        this.rect = this.content ? f.rect(this.content) : null;
    }
    u.find = function (e, j) {
        function a(e) {
            for (var c = 0; c < e.length; c++) {
                var k = e[c];
                if (k.nodeType == 1) {
                    if (d == ".") if (k.className.split(" ").length == 1) k.className == j.split(".")[1] && b.push(k);
                    else for (var f = k.className.split(" "), g = 0; g < f.length; g++) f[g] == j.split(".")[1] && b.push(k);
                    else d == "#" ? k.getAttribute("id") == j.split("#")[1] && b.push(k) : k.tagName.toLowerCase() == j && b.push(k);
                    k.childNodes.length >= 1 && a(k.childNodes)
                }
            }
        }
        var c = e.childNodes,
            b = [],
            d = j.substr(0, 1);
        a(c);
        return b
    }
    u.template = function (e, a) {
        for (var b = e.match(/\{[a-zA-Z]+\}/gi), c = 0; c < b.length; c++) {
            var d = b[c].replace(/[\{\}]/gi, "");
            e = e.replace(b[c], a[d])
        }
        return e
    }
    u.init = function (c, d) {
        var g = w.config.type.toLowerCase();
        switch (g) {
            case 'alert':
                this.alert(c, d);
                break;
            case 'struc':
                this.struc(c, d);
                break;
            case 'temps':
                this.temps(c, d);
                break;
            default:
                this.alert(c, d);
        }
    }
    u.position = function (obj) {
        var pos = {
            left: obj.offsetLeft,
            top: obj.offsetTop
        }, elem = obj.offsetParent;
        while (elem != null && (style = this.style(elem)) && (style.position != "relative" && style.position != "absolute")) {
            pos.left += elem.offsetLeft; pos.top += elem.offsetTop; elem = elem.offsetParent;
        }
        return pos;
    }
    u.rect = function (obj) {
        return {
            height: Math.max(obj.scrollHeight, obj.offsetHeight),
            width: Math.max(obj.scrollWidth, obj.offsetWidth)
        }
    }
    u.style = function (obj) {
        return window.getComputedStyle && window.getComputedStyle(obj) || obj.currentStyle;
    }
    u.setStyle = function (ins) {
        var content = ins.content, handle = this.rect(ins.trigger);
        if (this.style(content).display == "none") {
            content.style.visibility = "hidden";
            content.style.display = "block";
        }
        $m.mix(content.style, {
            left: ins.position.left - ins.config.offsetx + 'px',
            top: (ins.config.up ? ins.position.top - ins.rect.height - handle.height - ins.config.offsety : ins.position.top + handle.height - ins.config.offsety) + 'px',
            zIndex: ins.config.zIndex
        });
    }
    u.display = function (ins, bool) {
        var obj = ins.content;
        obj.style.position = "absolute";
        if (bool === false) {
            obj.style.visibility = "hidden";
            return;
        }
        bool = obj.style.display == 'none' || this.style(obj).display == 'none' || obj.style.visibility == "hidden" || this.style(obj).visibility == "hidden" ? !0 : !1;
        if (bool) {
            obj.style.visibility = "visible";
        } else {
            obj.style.visibility = "hidden"
        }
        (obj.style.display == 'none' || this.style(obj).display == 'none') && (obj.style.display = 'block');
    }
    u.mouse = function (ins) {
        var t = $m.event, that = this, c = ins.config;
        function leave(e) {
            F.timeout = setTimeout(function () { that.display(ins, !1); }, c.time);
            return false;
        }
        t.bind(ins.handle, 'mouseenter', function (e,data,index) {
            F.timeout && clearTimeout(F.timeout);
            if (c.type.toLowerCase() == "temps") {
                ins.content.innerHTML = that.template(c.Temps, c.Data[index]);
            }
            ins.position = that.position(e.currentTarget);
            ins.trigger = e.currentTarget;
            that.setStyle(ins);
            that.display(ins);
            return false;
        });
        t.bind(ins.handle, 'mouseleave', leave);
        t.bind(ins.content, 'mouseenter', function (e) {
            F.timeout && clearTimeout(F.timeout);
            return false;
        });
        t.bind(ins.content, 'mouseleave', leave);
    }
    u.click = function (ins) {
        var t = $m.event, that = this, c = ins.config;
        t.bind(ins.handle, 'click', function (e, data, index) {
            if (c.type.toLowerCase() == "temps") {
                ins.content.innerHTML = that.template(ins.config.Temps, c.Data[index]);
            }
            ins.position = that.position(e.currentTarget);
            ins.trigger = e.currentTarget;
            that.setStyle(ins);
            that.display(ins);
        });
    }
    u.struc = function (a) {
        var t = $m.event, ins = new E(a), c = ins.config;
        if (ins.container == null) {
            return;
        }
        ins.rect = ins.rect == null ? that.rect(ins.content) : ins.rect;
        if (c.event == 'mouse') {
            this.mouse(ins);
        }
        if (c.event == 'click') {
            this.click(ins);
        }
        ins.closecls && t.bind(ins.closecls, 'click', function () { that.display(ins, !1) });
    }
    u.r = function (str) {
        return str.replace(/[\s*\.]/, '');
    }
    u.temps = function (a) {
        var t = w, ins = new E(a), c = ins.config, temp = c.Temps, div, that = this;
        if (ins.container == null) {
            return;
        }
        if (c.Data.length == 0) { alert("模板数据不能为空"); return }
        if (temp == '') { alert("模板不能为空"); return }
        function element(a, b) {
            a == undefined && (a = ins.container.appendChild(document.createElement('div')), a.className = that.r(b)) || a;
            return a;
        }
        ins.content = element(ins.content, c.content);
        that.display(ins, false);
        ins.rect = ins.rect == null ? that.rect(ins.content) : ins.rect;//css visibility
        if (c.event == 'mouse') {
            this.mouse(ins);
        }
        if (c.event == 'click') {
            this.click(ins);
        }
    }
    var F = {
        container: '',
        offsetx: 0,
        offsety: 0,
        type: 'struc',
        event: 'mouse',
        trigger: '.trigger',
        up: !1,
        content: '.content',
        Temps: "",
        Data: [],
        closecls: ".close",
        time: "1000",
        isFrame: !0,
        zIndex: 1000000,
        timeout: null,
        callback: function () { }
    };
    window.onunload = window.onbeforeunload = function () {
        u = w = null;
    }
    $m.augment(u, {
        init: function (a) {
            this.constructor.init(a);
        }
    });
    return u;
});
