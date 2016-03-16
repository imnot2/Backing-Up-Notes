//baseURL config
$m.create("mobile", {
    when: function (path, options) {
        if (typeof path !== "string") {
            options = path;
            path = "";
        }
        var config = {
            path: path,
            template: null,
            data: null,
            controller: null,
            cache: !0,
            config: null,
            element: null
        },
        list = this.configList;
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].path === path) {
                $m.each(options, function (a, b) {
                    list[i][b] = a;
                })
                return this;
            }
        }
        config = $m.mix(config, options);
        config.template = config.template ? location.origin + '/template/' + config.template : null;
        this.configList.push(config);
        return this;
    },
    defaultWish: function (param) {
        this['app'] = param.app;
        if (!this.route())
            this.toURL(param["redirect"]);
    },
    match: function (path, hash) {
        function res(s) {
            return s.charAt(0) == "/" ? s.slice(1) : s;
        }
        var param = {};
        if (hash == path || ($m.isRegExp(path) && path.test(hash))) {
            return !0
        } else {
            path = res(path);
            hash = res(hash);
            var ps = path.split(/[\/&]/), hs = hash.split(/[\/&]/), i = 0, key, val, field, p = [];
            for (var j = 0, len = ps.length; j < len; j++) {
                if (ps[j].indexOf(':') > -1) {
                    p.push(ps[j].split(":")[1].toLowerCase());
                }
            }
            while (hs[i]) {
                if (hs[i].indexOf("=") > -1) {
                    field = hs[i].split("=");
                    key = field[0];
                    val = field[1];
                    if ($m.inArray(key.toLowerCase(), p)) {
                        param[key] = val;
                        i++;
                        continue;
                    }
                } else if (hs[i].toLowerCase() == ps[i].toLowerCase()) {
                    i++;
                    continue;
                }
                return !1;
            }
            return i ? param : !1;
        }
    },
    toURL: function (hash) {
        var loc = this.location, h = loc.hash;
        loc.hash = hash ? "#" + hash.replace('#', '') : h;
    },
    route: function (path) {
        var hash = path || this.location.hash.slice(1), that = this, config, datas = [], Return;
        for (var i = 0, len = this.configList.length; i < len; i++) {
            config = that.configList[i];
            Return = this.match(config.path, hash);
            if (Return) {
                this.currentConfig = config;
                config.data && config.data.length > 0 && $m.each(config.data, function (a, b) {
                    if (typeof Return === "object") {
                        a += $m.toParameter(Return);
                    }
                    datas.push($m.ajax({
                        url: a,
                        type: "json",
                        cache: config.cache,
                        method: config.method || 'get'
                    }));
                });
                config.template != null && datas.unshift($m.ajax({
                    url: config.template,
                    cache: config.cache,
                    type: "html"
                }));

                datas.length == 0 ? config.controller(Return) :
                    $m.deferred.when.apply($m, datas).success(function () {
                        var a = $m.makeArray(arguments);
                        typeof Return === "object" && a.unshift(Return);
                        config.controller.apply(that.app, a);
                    }).fail(function (o) {
                        //console.log(o)
                    });
                return !0;
            }
        }
    },
    insertContent: function (html, data, fn) {
        var page = document.body, content = $m.node("[role*='content']", page || document.documentElement)[0], that = this;
        if (!content) {
            content = document.createElement("div");
            $m.node.attr(content, "role", "content");
            $m.node.attr(content, "class", "content");
            page.insertBefore(content, $m.node("footer", page)[0]);
        }
        $m.template({ data: data, container: content, html: html });
        fn && fn.apply(page, [content]);
    }
}, {
    init: function (fn) {
        fn.call(this, this.constructor)
    }
});

$m.mobile(function (m) {
    var loc = window.location, locHref = loc.href, isNotInLogin = locHref.indexOf('login') < 0;
    $m.mix(m, {
        configList: [],
        location:loc,
        currentConfig: null
    });

    $m.event.delegate('a', "click", function (e) {
        var href = this.getAttribute("href", 2);
        if ($m.node.attr(this, 'async') === 'true' && !/javascript:|#/ig.test($m.node.attr(this, 'href'))) {
            m.toURL(href);
            e.preventDefault();
        } else if (href&&!$m.parseHost(href)) {
            $m.node.attr(this, 'href', $m.parseHost(location.href)[0] + href.charAt(0) === "/" ? href.slice(1) : href);
        }
    });

    function hashChangeFire(e) {
        m.route()
    }
    if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
        window.onhashchange = hashChangeFire;
    }
    window.onpopstate = function (e) {
        //console.log(e.state)
    }
    return this;
});