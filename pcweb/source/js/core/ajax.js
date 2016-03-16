//ajax module
$m.create("ajax", {
    lastModified: {},
    etag: {},
    fail: function () {
        alert('页面出错啦')
    }
}, {
    init: function (options) {
        var config = {
            url: '',
            async: !0,
            method: 'get',
            type: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            cache: true,
            timeout: 0,
            data: null,
            success: null,
            error: null,
            progress: null,
            charset: 'utf-8',
            callbackName: 'CALLBACK',
            modified: !1
        },
        Accepts = {
            xml: "application/xml, text/xml",
            html: "text/html",
            text: "text/plain",
            json: "application/json, text/javascript",
            "*": ['*/'] + ['*']
        },
        xhr = window.XMLHttpRequest ? function () {
            return new window.XMLHttpRequest()
        } : function () {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) { }
        },
        crossDomain = function () {
            var loc = window.location, url = $m.parseURL(config.url);
            return (url.protocol == undefined || url.protocol == loc.protocol) &&
                    (url.port == undefined || url.port == loc.port) &&
                    (url.hostname == undefined || url.hostname == loc.hostname);
        },
        ajax = {
            abort: function () {
                http.abort()
            },
            readyState: 0,
            status: 0,
            responseXML: null,
            responseText: null
        },
        deferred = $m.deferred(), http = xhr(), time = new Date(), data, param, cst = this.constructor, requestHeader = {}, hasParam, random = parseInt(Math.random() * 10e3);
        $m.each(options, function (a, b) {
            config[b] = typeof a === "string" ? a.toLowerCase() : a;
        })
        deferred.promise(this);

        $m.isFunction(config.success) && this.success(config.success);
        $m.isFunction(config.error) && this.fail(config.error);
        $m.isFunction(config.progress) && this.notify(config.progress);

        if (config.type == "jsonp") {
            window[config.callbackName] = function () {
                deferred.resolve.apply(this, arguments)
            }
            $m.onload(config.url + '&callback=' + config.callbackName, null, function () {
                deferred.reject()
            }, config.charset)
            return;
        }
        if (crossDomain() && !config['X-Requested-With']) {
            requestHeader['X-Requested-With'] = 'XMLHttpRequest';
        }
        requestHeader['Content-Type'] = config.type && Accepts[config.type] ? Accepts[config.type].split(',')[0] + '; charset=utf-8' : config.contentType;
        requestHeader['Accept'] = config.type && Accepts[config.type] ? Accepts[config.type] + (config.type !== '*' ? ', */*; q=0.01' : '') : '*';
        if (config.modified) {
            if (cst.lastModified[config.url]) {
                requestHeader['If-Modified-Since'] = cst.lastModified[config.url];
            }
            if (cst.etag[config.url]) {
                requestHeader["If-None-Match"] = cst.etag[config.url];
            }
        }
        if (config.type === "json" && config.method == "post") {
            data = typeof config.data !== 'string' ? $m.toJSON(config.data) : config.data;
        }
        if (config.url.indexOf('?') > -1) {
            hasParam = !0;
        }
        config.url = config.url + (config.cache ? '' : hasParam ? ('&random=' + random) : ('?random=' + random));
        if (config.data && config.method == "get") {
            param = typeof config.data !== 'string' ? $m.toParameter(config.data) : '?' + config.data;
            config.url += param;
        }
        http.open(config.method.toUpperCase(), config.url, config.async);
        for (var a in requestHeader) {
            http.setRequestHeader(a, requestHeader[a]);
        }
        http.onreadystatechange = function () {
            var modified, s, currentTime = new Date(), xml;
            if (http.readyState == 4) {
                s = ajax.status = http.status;
                if (s >= 200 && s < 300 || s === 304) {
                    if (config.modified) {
                        (modified = http.getResponseHeader("Last-Modified")) && (cst.lastModified[config.url] = modified);
                        (modified = http.getResponseHeader("etag")) && (cst.etag[config.url] = modified);
                    }
                    xml = http.responseXML;

                    if (xml && xml.documentElement) {
                        ajax.responseXML = xml;
                    }
                    ajax.responseText = http.responseText;
                    deferred.resolve.call(ajax, config.type === "json" ? $m.parseJSON(ajax.responseText) : (ajax.responseXML || ajax.responseText));
                    http = null;
                }
            } else {
                deferred.notify.call(ajax, s);
                if (s == 404 || (config.timeout && Math.floor((currentTime - time) / 1000) > config.timeout)) {
                    deferred.reject.call(ajax);
                    http.abort();
                }
            }
        }
        http.send(config.method == "get" ? null : data);
        return this;
    }
});
$m.each(["get", "post"], function (method, i) {
    $m[method] = function (url, data, callback, type) {
        if ($m.isFunction(data)) {
            type = callback;
            callback = data;
            data = undefined;
        }
        return $m.ajax({
            url: url,
            method: method,
            type: type || 'json',
            data: data,
            success: callback
        });
    }
});