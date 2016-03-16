define(function (require, exports, module) {
    var slice = Array.prototype.slice,
        options = {
            html: "",
            filterKey: "taobao 淘宝 etao tmall hitao 天猫",
            place: "***"
        };
    exports.closeTags = function (html) {
        var text = html,
            labeltotal = /\s*(<((?:[\w\u00c0-\uFFFF\-]|\\.)+).*?>(?:.*?(?=<)))(.*?)(<\/\2>)|(<(?:img|br|base|input|\\.)+(?:.*?\/*\>(?:[\w\u00c0-\uFFFF\-]|\\.)*))|(?:<\s*\/?)*((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\>)*|(?:&nbsp;)/gi,
            shutlabel = /^<\s*(\/)?(?!img|base|input|br)((?:[\w\u00c0-\uFFFF\-]|\\.)+)[^>]*>((?:[\w\u00c0-\uFFFF\-]|\\.)*)(?!<\/\1>)$/gi;

        function loop(arr, content) {
            var item, isArray = function (d) {
                return Object.prototype.toString.call(d) === "[object Array]"
            };
            if (isArray(arr)) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    item = arr[i];
                    if (typeof item == "string") {
                        content.push(item);
                    } else if (isArray(item)) {
                        loop(item);
                    }
                }
            }
            return content;
        }

        function apposition(str) {
            labeltotal.lastIndex = 0;
            var match = str.match(labeltotal),
                len = match && match.length || 0,
                array = [],
                notshut;
            for (var i = 0; i < len; i++) {
                notshut = shutlabel.exec(match[i]);
                if (notshut != null) {
                    if (notshut[1]) {
                        match[i] = "<" + notshut[2] + ">" + match[i];
                    } else {
                        match[i] = match[i] + "</" + notshut[2] + ">"
                    }
                }
                array.push(surround(match[i]));
            }
            return array;
        }

        function surround(html) {
            labeltotal.lastIndex = 0;
            var match = labeltotal.exec(html),
                parts = [],
                content = [],
                str;
            if (match) {
                match[1] !== void 0 && parts.push(match[1]);
                if (match[3]) {
                    str = loop(apposition(match[3]), content);
                    parts.push(str.join(""));
                }
                match[4] !== void 0 && parts.push(match[4]);
                match[5] !== void 0 && parts.push(match[5]);
                match[6] !== void 0 && parts.push(match[6]);
            }
            return parts.join("");
        }
        allhtml = apposition(text);
        return allhtml.join("");
    };
    exports.filter = function (html, type) {
        var script = /(<script[^>]*>[\S\s]*?<\/script[^>]*>|\s*on[a-z]+\s*=\s*(["']?)[^'"]*\2|\s*href\s*=\s*['"]?(?:javascript|vbscript):[^>]*(?=>))/ig,
            link = /<link[^>]*\/*>[\S\s]*(?:<\/link[^>]*>)*/ig,
            style = /(<style[^>]*>[\S\s]*?<\/style[^>]*>|style\s*=\s*["']?[^'"\s]*["']?)/ig,
            args = slice.call(arguments),
            iframe = /<iframe[^>]*>[\S\s]*<\/iframe[^>]*>/ig,
            stylewidth = /width\s*[=:](?:['"\d\s]|px)*/ig,
            labelToDiv = /(<\/?)(table|tr|tbody|tfoot|thead|td)/ig,
            execType = /(script|link|style|iframe|key)/ig;
        if (typeof type == "string") {
            type = [type];
        }

        function filter(html, t) {
            t = t.toLowerCase();
            switch (t) {
            case "script":
                html = html.replace(script, "");
                break;
            case "link":
                html = html.replace(link, "");
                break;
            case "style":
                html = html.replace(style, "");
                break;
            case "width":
                html = html.replace(stylewidth, "");
                break;
            case "label":
                html = html.replace(labelToDiv, function (m, n) {
                    return n + 'div';
                });
                break;
            case "iframe":
                html = html.replace(iframe, "");
                break;
            default:
                var filterKey = new RegExp("(" + (t || options.filterKey).split(/[ ,]/).join("|") + ")", "gi"),
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
                html = html.replace(filterKey, options.place);
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
            return html;
        }
        for (var m = 0, len = type.length; m < len; m++) {
            html = filter(html, type[m])
        }
        return html;
    };
});