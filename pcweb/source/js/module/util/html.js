define(function (require, exports, module) {
    function h(options) {
        if (!(this instanceof h)) return new h($m.merge(option, options))
        var labels = options.html;
        this.options = options;
        this.innerHTML = function (str) {
            if (str === void 0) {
                return labels;
            } else {
                return labels = str;
            }
        };
    }
    var slice = Array.prototype.slice,
        option = {
            html: "",
            filterKey: "taobao 淘宝 etao tmall hitao 天猫",
            place: "***"
        };
    h.prototype = {
        constructor: h,
        closeTags: function (html) {
            //var text = html || this.innerHTML(),
            //labeltotal = /\s*(<((?:[\w\u00c0-\uFFFF\-]|\\.)+).*?>(?:.*?(?=<)))(.*?)(<\/\2>)|(<(?:img|br|base|input|\\.)+(?:.*?\/*>(?:[\w\u00c0-\uFFFF\-]|\\.)*))|(?:<\s*\/?)*((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:>)*|(?:&nbsp;)/gi,
            //shutlabel = /^<\s*(\/)?(?!img|base|input|br)((?:[\w\u00c0-\uFFFF\-]|\\.)+)[^>]*>((?:[\w\u00c0-\uFFFF\-]|\\.)*)(?!<\/\1>)$/gi;
            //function loop(arr, content) {
            //    var item, isArray = function (d) { return Object.prototype.toString.call(d) === "[object Array]" };
            //    if (isArray(arr)) {
            //        for (var i = 0, len = arr.length; i < len; i++) {
            //            item = arr[i];
            //            if (typeof item == "string") {
            //                content.push(item);
            //            } else if (isArray(item)) {
            //                loop(item);
            //            }
            //        }
            //    }
            //    return content;
            //}
            //function apposition(str) {
            //    labeltotal.lastIndex = 0;
            //    var match = str.match(labeltotal), len = match && match.length || 0, array = [], notshut;
            //    for (var i = 0; i < len; i++) {
            //        notshut = shutlabel.exec(match[i]);
            //        if (notshut != null) {
            //            if (notshut[1]) {
            //                match[i] = "<" + notshut[2] + ">" + match[i];
            //            } else {
            //                match[i] = match[i] + "</" + notshut[2] + ">"
            //            }
            //        }
            //        array.push(surround(match[i]));
            //    }
            //    return array;
            //}
            //function surround(html) {
            //    labeltotal.lastIndex = 0;
            //    var match = labeltotal.exec(html), parts = [], content = [], str;
            //    if (match) {
            //        match[1] !== void 0 && parts.push(match[1]);
            //        if (match[3]) {
            //            str = loop(apposition(match[3]), content);
            //            parts.push(str.join(""));
            //        }
            //        match[4] !== void 0 && parts.push(match[4]);
            //        match[5] !== void 0 && parts.push(match[5]);
            //        match[6] !== void 0 && parts.push(match[6]);
            //    }
            //    return parts.join("");
            //}
            //allhtml = apposition(text);
            //return this.innerHTML(allhtml.join(""));
        },
        filter: function (type) {
            var script = /(<script[^>]*>[\S\s]*?<\/script[^>]*>|\s*on[a-z]+\s*=\s*(["']?)[^'"]*\2|\s*href\s*=\s*['"]?(?:javascript|vbscript):[^>]*(?=>))/ig,
                link = /<link[^>]*\/*>[\S\s]*(?:<\/link[^>]*>)*/ig,
                style = /(<style[^>]*>[\S\s]*?<\/style[^>]*>)/ig,
                args = slice.call(arguments),
                iframe = /<iframe[^>]*>[\S\s]*<\/iframe[^>]*>/ig,
                execType = /(script|link|style|iframe|key)/ig,
                html = this.innerHTML();
            if (args.length > 1) {
                for (var i = 0, len = args.length; i < len; i++) {
                    this.filter(args[i]);
                }
                return;
            }
            if (typeof type != "string") {
                return;
            }
            type = type.toLowerCase();
            switch (type) {
            case "script":
                html = html.replace(script, "");
                break;
            case "link":
                html = html.replace(link, "");
            case "style":
                html = html.replace(style, "");
                break;
            case "iframe":
                html = html.replace(iframe, "");
                break;
            default:
                var filterKey = new RegExp("(" + this.options.filterKey.split(/[ ,]/).join("|") + ")", "gi"),
                    hrefexec = /(href|src)\s*=\s*(["']*)([^'">]+)\2/gi;
                html = html.replace(hrefexec, function (m, n, o, p) {
                    filterKey.lastIndex = 0;
                    var ma = filterKey.exec(p)
                    if (n == "href" && ma) {
                        return n + "='#'";
                    }
                    if (n == "src" && ma) {
                        return n + "=" + p.replace(ma[1], ma[1].split("").join("&&&&&"));
                    }
                    return m;
                });
                html = html.replace(filterKey, this.options.place);
                html = html.replace(hrefexec, function (m, n, o, p) {
                    filterKey.lastIndex = 0;
                    if (n == "src") {
                        p = p.replace(/&&&&&/ig, "");
                        return n + "=" + o + p + o;
                    }
                    return m;
                });
                break;
            }
            return this.innerHTML(html);
        },
        purge: function () {

        }
    };
    return h;
});