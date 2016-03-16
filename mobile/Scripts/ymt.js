//Ymt基础方法
(function (window, $m, undefined) {

    //$m赋值 
    $m = window[$m] = window['$m'] = {};

    var __deferred, isReady,
    mix = function (ori, ext, isrewrite) {
        if (!ext || !ori) return ori;
        isrewrite === undefined && (isrewrite = !0);
        for (var key in ext)
            if (isrewrite || !(key in ori)) ori[key] = ext[key];
        return ori
    };

    //dom ready
    function ready() {
        var doc = window.document;
        if (doc.readyState === "complete") {
            dt();
        }
        if (!doc.body) {
            return setTimeout(function () {
                ready()
            }, 1);
        }
        function dt() {
            deferred.resolve();
            isReady = !0;
        }
        function doScrollCheck() {
            try {
                doc.documentElement.doScroll("left");
            } catch (e) {
                setTimeout(doScrollCheck, 1);
                return;
            }
            dt();
        }
        var domLoaded;
        if (doc.addEventListener) {
            domLoaded = function () {
                doc.removeEventListener("DOMContentLoaded", domLoaded, false);
                dt();
            };
            doc.addEventListener("DOMContentLoaded", domLoaded, false);
        } else if (doc.attachEvent) {
            domLoaded = function () {
                if (doc.readyState === "complete") {
                    doc.detachEvent("onreadystatechange", domLoaded);
                    dt();
                }
            };
            doc.attachEvent("onreadystatechange", domLoaded);
            var toplevel = false;
            try {
                toplevel = window.frameElement == null;
            } catch (e) { }
            if (doc.documentElement.doScroll && toplevel) {
                doScrollCheck();
            }
        }
    }


    mix($m, {
        version: "3.0",
        mix: mix,

        //log
        log: function (content, method) {
            if (!$m.isUndefined(window.console) && console.log) console[method && console[method] ? method : "log"](content)
        },

        //object prototype 继承
        extend: function (ori, ext) {
            if (!ext || !ori) return ori;
            var d = ext.prototype,
                j = function (d) {
                    function b() { }
                    b.prototype = d;
                    return new b
                }(d);
            ori.prototype = j;
            j.constructor = ori;
            ori.superclass = d;
            return ori
        },

        //对origin类的原型进行扩展
        augment: function () {
            var args = arguments, lastIndex = args.length - 1, origin = args[0], last = args[lastIndex];

            $m.isBoolean(last) || (last = undefined, lastIndex++);
            for (j = 1; j < lastIndex; j++) mix(origin.prototype, args[j].prototype || args[j], last);
            return origin;
        },

        //合并所有参数对象
        merge: function () {
            var a = {}, b, length = arguments.length;
            for (b = 0; b < length; ++b) mix(a, arguments[b]);
            return a
        },

        //创建一个类,如果name为一个string类型的名称,则类定义在Ymt上，否则是创建一个类，ext是静态方法，inc是原型方法。
        create: function (name, ext, inc) {
            var Class = function () {
                if (!(this instanceof Class)) {
                    return new Class(arguments);
                }
                if (typeof this.init == "function") {
                    return this.init.apply(this, arguments[0]);
                }
            }, bool = $m.isString(name);
            if (!bool) {
                inc = ext;
                ext = name;
            }
            $m.isPlainObject(ext) && mix(Class, ext)
            $m.isPlainObject(inc) && mix(Class.prototype, inc);
            return bool ? (this[name] = Class) : Class;
        },

        //代理
        proxy: function (func) {
            var that = this;
            return (function () {
                return func.apply(that, arguments);
            });
        },

        //命名空间
        namespace: function () {
            var args = arguments,
            length = args.length,
            context = null,
            name,
            index,
            iLen,
            isGlobal = args[length - 1] === !0 && length--;
            for (var c = 0; c < length; ++c) {
                name = args[c].split(".");
                context = isGlobal ? window : $m;

                //"$m.widget.check"
                index = window[name[0]] === context ? 1 : 0;

                for (iLen = name.length; index < iLen; ++index) context = context[name[index]] = context[name[index]] || {}
            }
            return context
        },

        //延迟函数
        later: function (method, time, isInterval,  context, args) {
            time = time || 0;
            context = context || {};
            var v = $m.makeArray(args), timeHandle;
            $m.isString(method) && (method = context[method]);

            j = function () {
                method.apply(context, v)
            };

            timeHandle = isInterval ? setInterval(j, time) : setTimeout(j, time);

            return {
                id: timeHandle,
                interval: isInterval,
                cancel: function () {
                    this.interval ? clearInterval(timeHandle) : clearTimeout(timeHandle)
                }
            }
        },

        //$m.ready(fn)
        ready: function (fn) {
            if (!__deferred) {
                __deferred = $m.deferred();
            }
            if (fn) {
                __deferred.success(fn);
            }
            if (!isReady) {
                ready();
            }
            return this;
        }

    });
})(window, "Ymt");

//Ymt object type judge
(function (window, $m, undefined) {
    var toString = Object.prototype.toString,
        indexOf = Array.prototype.indexOf,
        trim = String.prototype.trim,
        p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    $m.mix($m, {
        isUndefined: function (val) {
            return val === undefined
        },
        isBoolean: function (val) {
            return toString.call(val) === "[object Boolean]"
        },
        isString: function (val) {
            return toString.call(val) === "[object String]"
        },
        isNumber: function (val) {
            return toString.call(val) === "[object Number]" && isFinite(val)
        },
        isArray: function (val) {
            return toString.call(val) === "[object Array]"
        },
        isNodeList: function (val) {
            return toString.call(val) === "[object NodeList]"
        },
        isFunction: function (val) {
            return toString.call(val) === "[object Function]"
        },
        isPlainObject: function (val) {
            return val && toString.call(val) === "[object Object]" && !val.nodeType && !val.setInterval
        },
        isEmptyObject: function (val) {
            for (var c in val) return !1;
            return !0
        },
        isRegExp: function (val) {
            return toString.call(val) === "[object RegExp]";
        },
        each: function (obj, fun, context) {
            var length = obj.length, isPlainObjectOrFun = length === undefined || $m.isFunction(obj);

            context = context || window;
            if (isPlainObjectOrFun){
                for (var g in obj) {
                    if (fun.call(context, obj[g], g, obj) === !1) break;
                }  
            }else{
                for(var index=0;index<length;index++){
                    if(fun.call(context, obj[index], index, obj) === !1) break;
                }
            }
            return obj
        },
        trim: trim ? function (val) {
            return val == undefined ? "" : trim.call(val)
        } : function (val) {
            return val == undefined ? "" : val.toString().replace(p, "")
        },
        indexOf: indexOf ? function (item, arr) {
            return indexOf.call(arr, item)
        } : function (item, arr) {
            for (var h = 0, g = arr.length; h < g; ++h)
                if (arr[h] === item) return h;
            return -1
        },
        inArray: function (item, arr) {
            return $m.indexOf(item, arr) > -1
        },

        //把val变成数组
        makeArray: function (val) {
            if (val === null || val === undefined) return [];
            if ($m.isArray(val)) return val;
            if (!$m.isNumber(val.length) || $m.isString(val) || $m.isFunction(val)) return [val];
            return Array.prototype.slice.call(val)
        },
        getJSON: function (url, data, callback) {
            return $m.get(url, data, callback, "json");
        },
        parseURL: function (url) {
            var arr = /^(?:((?:http|https|ftp|news):)\/\/)?([^\/:]*)(?:\:(\d+))?([^\?]*)(\?[^?#]+)?(#.+)?/i.exec(url);

            var _search=arr[5];
            var _query,_queryObj=null;

            if(_search){
                _query=_search.slice(1).split("&");
                $m.each(_query,function(keyval,index){
                    keyval=keyval.split("=");
                    _queryObj=_queryObj||{};
                    _queryObj[keyval[0]]=keyval[1];
                })
            }
            return {
                hash: arr[6] || '',
                pathname: arr[4],
                protocol: arr[1],
                hostname: arr[2],
                search: arr[5],
                port: arr[3],
                query:_queryObj
            }
        },
        parseHost: function (url) {
            var h = /^.*?\/\/(.*?)(?:\/|$)/i;
            return h.exec(url);
        },
        toJSON: function (data) {
            if (window.JSON && window.JSON.stringify) {
                return window.JSON.stringify(data);
            }
        },
        parseJSON: function (data) {
            if (data && window.JSON && window.JSON.parse) {
                return window.JSON.parse(data);
            } else {
                return (new Function("return " + data))();
            }
        },
        toParameter: function (obj, sp) {
            var i, str = [];
            function build(a, b) {
                b = typeof b === "function" ? b() : b == null || b == undefined ? "" : b;
                if (typeof b === "object") {
                    $m.each(b, function (m, n) {
                        build(a + "[" + n + "]", m);
                    })
                    return;
                }
                str.push(encodeURIComponent(a) + "=" + encodeURIComponent(b));
            }
            if ($m.isNodeList(obj)) {
                $m.each(obj, function (a, b) {
                    build(a.name, a.value);
                });
                return;
            }
            if ($m.isArray(obj) || $m.isPlainObject(obj)) {
                $m.each(obj, function (a, b) {
                    build(b, a);
                });
            }
            return ('?' + str.join(sp || "&")).replace(/%20/g, "+");
        }
    });
})(window, $m);
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
$m.create('data', {
    expando: "DATAEXPANDO" + parseInt(Math.random() * 10e5),
    cache: {},
    uuid: 1,
    get: function (obj, key) {
        if (!obj) {
            return null;
        }
        var id = obj[this.expando];
        if (!id) {
            return null;
        }
        if (!key) {
            return this.cache[id]
        }
        return this.cache[id][key];
    },
    set: function (obj, key, value) {
        if (obj != null && typeof key == "string" && value) {
            var id = obj[this.expando];
            obj[this.expando] = id = id ? id : this.uuid++;
            this.cache[id] = this.cache[id] || {};
            this.cache[id][key] = value;
            return value;
        }
    },
    del: function (obj, key) {
        if (!obj) {
            this.cache = null;
        }
        var id = obj[this.expando];
        if (!id) {
            return;
        }
        if (!key) {
            obj[this.expando] = null;
            delete this.cache[id]
        }
        delete this.cache[id][key];
    }
}, null);
//deferred
$m.create('deferred', {
    when: function (param) {
        var args = $m.makeArray(arguments),
            length = args.length,
            count = length !== 1 || (param && $m.isFunction(param.promise)) ? length : 0,
            deferred = count == 1 ? param : $m.deferred(),
            parameters = [],
            contexts = [],
            update = function (i, type) {
                return function (value) {
                    contexts[i] = this;
                    parameters[i] = value;
                    if (type == "notify") {
                        deferred.notify();
                        return;
                    }
                    if (!--count) {
                        deferred.resolve.apply(contexts, parameters);
                    }
                }
            };
        if (length > 1) {
            for (var i = 0; i < length; i++) {
                (function (i) {
                    var item = args[i];
                    if (item && $m.isFunction(item.promise)) {
                        item.promise().success(update(i, "resolve")).fail(deferred.reject).progress(update(i, "notify"));
                    } else {
                        --count;
                    }
                })(i)
            }
        }
        if (!count) {
            deferred.resolve();
        }
        return deferred.promise();
    }
}, {
    init: function (fun) {
        var scene = ['resolve.success', 'reject.fail', 'notify.progress'],
            state = "pending",
            promise = {
                state: function () {
                    return state;
                },
                then: function (success, fail, progress) {
                    var fns = arguments;
                    return $m.deferred(function (defer) {
                        $m.each(scene, function (m, n) {
                            m = m.split('.');
                            var fn = $m.isFunction(fns[n]) && fns[n];
                            that[m[1]](function () {
                                var ret = fn && fn();
                                if (ret && typeof ret.promise == "function") {
                                    ret.promise().success(defer.resolve).fail(defer.reject).progress(defer.notify)
                                } else {
                                    defer[m[0]]();
                                }
                            });
                        })
                        fns = null;
                    }).promise();
                },
                always: function () {
                    that.success(arguments).fail(arguments);
                    return mise;
                },
                promise: function (obj) {
                    return obj != null ? $m.mix(obj, promise) : promise;
                }
            },
            that = this,
            obs = $m.event();
        $m.each(scene, function (m, n) {
            m = m.split('.');
            that[m[0]] = function () {
                var args = $m.makeArray(arguments), context = this === that ? promise : this;
                args.unshift(m[1]);
                obs.emit.apply(obs, args);
                state = m[1];
                return this
            }
            promise[m[1]] = function (fn) {
                obs.on(m[1], fn);
                return this
            };
        });
        that['off'] = function (type) {
            obs.off(type)
        }
        promise.promise(that);
        if (fun) {
            fun.call(that, that);
        }
    }
});
//node
$m.create("node", {
    contain: function (ori, src) {
        if (ori.contains) {
            return ori != src && ori.contains(src);
        } else {
            return !!(ori.compareDocumentPosition(src) & 16);
        }
    },
    children: function (context, bool) {
        var children = $m.makeArray(bool ? context.childNodes : context.getElementsByTag("*"));
        return filter(childen, function (node) {
            return node.nodeType === 1;
        })
    },
    attr: function (elem, name, value) {
        if (!elem)
            return;
        name = name.toLowerCase();
        var node = elem.getAttributeNode(name), attrbool = 'checked disabled'.indexOf(name) > -1;
        if (value != undefined) {
            if (value === "false" || value === false) {
                elem.removeAttribute(name);
                node = null
            } else {
                node ? node.value = value : elem.setAttribute(name, value);
            }
            attrbool && (elem[name] = value);
        }
        if (node) {
            return attrbool ? elem[name] : node && node.specified ? node.value : null;
        } else {
            return attrbool ? elem[name] : elem.value ? elem.value : null;
        }
    },
    filter: function (result, fn) {
        var array = [], i, len;
        for (i = 0, len = result.length; i < len; i++) {
            if (fn(result[i], i)) {
                array.push(result[i]);
            }
        }
        return array;
    },
    next: function (node) {
        while (node = node.nextSibling) {
            if (node.nodeType == 1) {
                return node;
            }
        }
    },
    prev: function (node) {
        while (node = node.previousSibling) {
            if (node.nodeType == 1) {
                return node;
            }
        }
    },
    empty: function (node) {
        node.nodeType == 1 && (node.innerHTML = '');
    },
    remove: function (node) {
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    },
    append: function (ori, node) {
        if (node.nodeType) {
            ori.appendChild(node);
        } else if (typeof node === 'string') {
            var docfram = document.createDocumentFragment(), div = document.createElement('div');
            div.innerHTML = node;
            $m.each($m.makeArray(div.childNodes), function (a, b) {
                docfram.appendChild(a);
            });
            ori.appendChild(docfram);
        }
    },
    prepend:function(ori, node){
        if (node.nodeType) {
            ori.firstChild?ori.insertBefore(node,ori.firstChild):ori.appendChild(node);
        } else if (typeof node === 'string') {
            var docfram = document.createDocumentFragment(), div = document.createElement('div');
            div.innerHTML = node;
            $m.each($m.makeArray(div.childNodes), function (a, b) {
                docfram.appendChild(a);
            });
            this.prepend(ori,docfram);
        }
    },
    css: function (elem, key, value) {
        var args = arguments, style = document.defaultView ? document.defaultView.getComputedStyle(elem, null) : elem.currentStyle;
        if (args.length == 1) {
            return style;
        }
        if (args.length === 2) {
            $m.isPlainObject(key) && $m.each(key, function (a, b) {
                elem.style[b] = a;
            });
            if ($m.isString(key)) {
                return style[key];
            }
        }
        if (args.length === 3) {
            elem.style[key] = value;
        }
    },
    hasClass: function (node, name) {
        var c = $m.trim(this.attr(node, 'class')), has = !1, name = $m.trim(name);
        if (c && name) {
            $m.each(c.split(/\s/), function (a, b) {
                if (a == name) {
                    has = !0;
                    return !1;
                }
            })
            return has;
        }
        return !1;
    },
    addClass: function (node, name) {
        if (node && !this.hasClass(node, name)) {
            var c = node.getAttribute('CLASS');
            node.setAttribute('CLASS', c ? $m.trim(c) + ' ' + name : name);
        }
    },
    removeClass: function (node, name) {
        if (this.hasClass(node, name)) {
            node.setAttribute('CLASS', node.getAttribute('CLASS').replace(name, ''));
        }
    },
    toggleClass: function (node, one, two) {
        var h = !this.hasClass(node, one);
        this.removeClass(node, h ? two : one);
        this.addClass(node, h ? one : two);
        return this;
    }
}, {
    addClass:function(cls){
        $m.each(this.items, function (a, b) {
            $m.node.addClass(a, cls);
        });
    },
    removeClass: function (cls) {
        $m.each(this.items, function (a, b) {
            $m.node.removeClass(a, cls);
        });
    },
    hasClass:function(name){
        return $m.node.hasClass(this.items[0], name);
    },
    find: function (expr) {
        return $m.node(expr, this.items)
    },
    eq: function (index) {
        return this.items[index];
    },
    each: function (fn) {
        $m.each(this.items, function (a, b) {
            fn.apply(a, [a, b]);
        })
        return this;
    },
    append:function (elem){
        $m.each(this.items, function (orielem, index) {
            $m.node.append(orielem, elem);
        })
    },
    prepend:function(elem){
        $m.each(this.items, function (orielem, index) {
            $m.node.prepend(orielem, elem);
        })
    },
    attr: function (name, value) {
        if (arguments.length == 1) {
            return $m.node.attr(this.items[0], name);
        }
        $m.each(this.items, function (a, b) {
            $m.node.attr(a, name, value);
        })
        return this;
    },
    html: function (html) {
        if (this.items.length == 0) {
            return "";
        }
        if (html == undefined) {
            return this.items[0].innerHTML;
        } else {
            this.each(function (a, b) {
                a.innerHTML = html;
            })
        }
        return this;
    },
    show: function () {
        var that = this;
        this.each(function (a, b) {
            a.style.display = "block";
        });
        return this;
    },
    hide: function () {
        this.each(function (a, b) {
            a.style.display = "none";
        })
        return this;
    },
    css: function (key, value) {
        var css = this.constructor.css;
        if (typeof key === "string") {
            if (value == undefined) {
                return css(this.items[0], key);
            } else if ($m.isNumber(value)) {
                value += "px";
            }
            var k = {};
            k[key] = value;
            this.css(k);
        }
        if ($m.isPlainObject(key)) {
            this.each(function (m, n) {
                css(m, key);
            });
        }
        return this;
    },
    val: function (v) {
        if (this.items.length == 0) {
            return "";
        }
        function set(item, value) {
            var t = $m.node.attr(item, 'type');
            t = (t == "checkbox" || t == "radio") ? 'checked' : 'value';
            if (!value) {
                return $m.node.attr(item, t);
            }
            $m.node.attr(item, t, value);
        }
        if (v == undefined) {
            return set(this.items[0]);
        } else {
            this.each(function (a, b) {
                set(a, v)
            })
        }
    },
    bind: function (evt, data, callback) {
        if ($m.isString(evt)) {
            $m.event.bind(this.items, evt, data, callback);
        }
        if ($m.isPlainObject(evt)) {
            $m.each(evt, function (m, n) {
                $m.event.bind(this.items, n, data, m);
            })
        }
    },
    init: function (expr, context) {

        if (expr == null || expr == undefined) {
            return this;
        }
        this.items = this.items || [];
        if (expr.nodeType) {
            this.items.push(expr);
            return this;
        }

        var Find = {
            id: function (expr, context) {
                node = context.getElementById(expr);
                return node ? [node] : []
            },
            tag: function (expr, context) {
                return context.getElementsByTagName(expr);
            },
            CLASS: function (expr, context) {
                return context.getElementsByClassName ? context.getElementsByClassName(expr) : (function (e) {
                    return Filter.CLASS(expr, cst.children(null, context))
                })();
            },
            attr: function (items, context) {
                return Filter.attr(items, cst.children(context));
            },
            pseudo: function (items, context) {
                return Filter.pseudo(items, cst.children(context));
            },
            struct: function (items, context) {
                return Filter.pseudo(items, cst.children(context));
            }
        },
        Filter = {
            id: function (expr, result) {
                return cst.filter(result, function (m, n) {
                    return m.id === expr || m.getAttribute["id"] === expr;
                })
            },
            tag: function (expr, result) {
                return cst.filter(result, function (m, n) {
                    return m.tagName.toLowerCase() === expr;
                })
            },
            CLASS: function (expr, result) {
                return cst.filter(result, function (m, n) {
                    return m.className.indexOf(expr) > -1;
                })
            },
            attr: function (items, result) {
                var name = items[1], type = items[2], value = items[3], newResult = [];
                attrMatch(result, name, type, value, newResult);
                return newResult;
            },
            pseudo: function (items, result) {
                var newResult = [];
                i.each(result, function (m, n) {
                    pseudoMatch(m, items, newResult);
                });
                return newResult
            },
            struct: function (items, result) {
                var newResult = [];
                i.each(result, function (m, n) {
                    structMatch(m, items, newResult);
                });
                return newResult
            }
        },
        attrMatch = function (nodes, name, type, value, result) {
            $m.each(nodes, function (m, n) {
                var attribute;
                if (attribute = cst.attr(m, name)) {
                    var index = attribute.indexOf(value);
                    switch (type) {
                        case "*":
                            index > -1 && result.push(m);
                            break;
                        case "^":
                            index == 0 && result.push(m);
                            break;
                        case "$":
                            index == (attribute.length - value.length) && result.push(m);
                            break;
                        case "!":
                            index == -1 && result.push(m);
                            break;
                        default:
                            attribute == value && result.push(m);
                            break;
                    }
                }
            });
            return result;
        },
        pseudoMatch = function (node, items, result) {
            var name = items[1], type = items[2], value = items[3];
            function isFormOf(type) {
                return node.getAttribute(type) == true || node.getAttribute(type) == type;
            }
            switch (name) {
                case "checked":
                case "enabled":
                case "disabled":
                    isFormOf(name) && result.push(node);
                    break;
                case "::selection":
                    break;
                case "not":
                    (type == "#" ? (node.id != value || node.getAttribute("id") != value) : type === "." ? node.className != value : node.tagName.toLowerCase() != type) && result.push(node);
                    break;
                case "target":
                    (node.id === location.hash.slice(1)) && result.push(node);
                    break;
            }
            return result;
        },
        structMatch = function (node, items, result) {
            var name = items[1], type = items[2], value = items[3], str, parent = node.parentNode;
            function getNode(type, ch, of) {
                if (type == "child") {
                    parent && ch && ch(cts.children(parent, !0)) && result.push(node)
                }
                if (type == "of-type") {
                    parent && of && of(Find.tag(node.tagName, parent)) && result.push(node)
                }
            }
            switch (name) {
                case "only":
                    getNode(type, function (nodes) {
                        return nodes.length == 1 && nodes[0] == node;
                    }, function (tags) {
                        return tags.length == 1;
                    })
                    break;
                case "first":
                    getNode(type, null, function (tags) {
                        return tags[0] == node;
                    });
                    break;
                case "last":
                    getNode(type, function (nodes) {
                        return nodes[nodes.length - 1] == node;
                    }, null);
                    break;
                case "nth":
                    getNode(type, function (nodes) {
                        return nodes[value] == node;
                    }, function (tags) {
                        return tags[value] == node;
                    });
                    break;
                case "nth-last":
                    getNode(type, function (nodes) {
                        return nodes[nodes.length - value] == node;
                    }, function (tags, node) {
                        return tags[tags.length - value] == node;
                    });
                    break;
                case "root":
                    result.push(node.ownerDocument.documentElement || node.ownerDocument.body);
                    break;
                case "empty":
                    node.childNodes.length == 0 && result.push(node);
                    break;
            }
        },
        loop = function () {
            var j, sectors, i, len, fn = bool ? Find : Filter;
            function select(type, items) {
                var old;
                switch (type) {
                    case "id":
                    case "CLASS":
                    case "tag":
                        old = fn[type](sectors[1], items);
                        break;
                    case "attr":
                    case "pseudo":
                    case "struct":
                        old = fn[type](sectors, items);
                        break;
                }
                return old;
            }
            for (j in match) {
                if (sectors = match[j].exec(nextExpr)) {
                    if (bool) {
                        for (i = 0, len = context.length; i < len; i++) {
                            padding(select(j, context[i]), part);
                        }
                    } else {
                        part = select(j, part);
                    }
                    nextExpr = nextExpr.slice(sectors[0].length);
                    break;
                }
            }
            bool = !1;
        };

        var doc = top.document, i, len, result = this.items = this.items || [];

        context = context === undefined ? [doc] : (context instanceof this.constructor) ? context.items : context.length>=0 ? context : [context];
        if (doc.querySelectorAll) {
            for (i = 0, len = context.length; i < len; i++) {
                padding(context[i].querySelectorAll(expr), result)
            }
            this.length = result.length;
            this[0] = result[0];
            return;
        }
        function padding(part, result) {
            if (part && part.length) {
                $m.each(part, function (m, n) {
                    result.push(m);
                })
            }
        }
        expr = expr.split(",");
        len = expr.length;
        if (len > 1) {
            for (i = 0; i < len; i++) {
                $m.each($m.node(expr[i], context).items, function (m, n) {
                    result.push(m);
                });
            }
            return;
        }
        len == 1 && (expr = expr[0]);
        expr = $m.trim(expr);
        expr = expr.replace(inspace, function (m, n) { return n.replace(wspace, "") });
        expr = expr.split(/\s+/);
        var cst = this.constructor,
        bool, part, nextExpr,
        wspace = /[\x20\t\r\n\f]/g,
        inspace = /(\s*['"=+-]\s*|[\(\[]\s*|\s*[\)\]])/g,
        match = {
            id: /^#((?!\d)[\w-]+)/,
            CLASS: /^\.((?!\d)[\w-]+)/,
            tag: /^((?!\d)[\w-]+)/,
            attr: /^\[\s*([\w-]+)\s*(?:([*^$!]?)=)\s*['\"]\s*([\w-]+?)\s*['\"]\s*\]/,
            pseudo: /^:(not|disabled|enabled|checked|target)(?:\((#|\.)?([\w-]+)\))?/,
            struct: /^:(empty|root|only|first|last|nth|nth-last)-(child|of-type)(?:\(\s*(\d+)\s*\))?/
        }
        for (i = 0, len = expr.length; i < len; i++) {
            bool = !0;
            part = [];
            nextExpr = expr[i];
            while (nextExpr) {
                loop();
            }
            context = part;
            if (i == len - 1) {
                padding(part, result);
            }
        }
        this[0] = result[0];
    }
});

//Event
$m.create("Event",
    {
        _checkType: function (evt, isWindow) {
            var tagnames = {
                'select': 'input', 'change': 'input',
                'submit': 'form', 'reset': 'form',
                'error': 'img', 'load': 'img', 'abort': 'img'
            }
            var el = isWindow ? window : document.createElement(tagnames[evt] || 'div');
            evt = 'on' + evt;
            var isSupported = (evt in el);
            if (!isSupported) {
                el.setAttribute(evt, 'return;');
                isSupported = typeof el[evt] == 'function';
            }
            el = null;
            return isSupported;
        },
        _events: function (elem, type, binder, callback, config) {
            var evt = $m.data.get(elem, 'events') || $m.data.set(elem, 'events', $m.event()), num;
            if (config.istrigger === !0) {
                evt.emit(type + 'Event', binder);
                return;
            }
            if (config.attach === !0) {
                evt.on(type, callback);
                evt.on(type + 'Event', binder);
            } else if (config.attach === !1) {
                num = evt.off(type, callback);
                if (typeof num === "number") {
                    binder = evt._callbacks[type + 'Event'][num];
                    evt.off(type + 'Event', binder);
                    return binder;
                }
            }
        },
        switchEvent: function (elems, type, callback, config, data) {
            if (!elems) {
                return;
            }
            var isWindow = elems === window, srcType;
            elems = elems && elems.length ? elems : [elems];

            srcType = config.type = type;

            config.standard = this._checkType(type, isWindow);

            if (!config.standard) {
                type = type == "mouseenter" ? "mouseover" : type == "mouseleave" ? "mouseout" : type;
            }

            config.standard = config.standard || srcType == "mouseenter" || srcType == "mouseleave";

            $m.each(elems, function (a, b) {
                if (config.istrigger)
                    $m.Event._events(a, type, data, null, { istrigger: !0 });
                else
                    !config.unbind ? $m.Event.attach(a, type, callback, config, b) : $m.Event.detach(a, type, callback, config);
            });
        },
        attach: function (elem, type, callback, config, index) {
            var that = this;
            function binder(e) {
                if (elem.nodeType && config.standard) {
                    $m.Event(e, elem, type, callback, index, config.type);
                } else {
                    return callback.call(elem);
                }
                config.once && $m.Event.detach(elem, type, callback, config);
            }

            if (config.standard) {
                if (elem.nodeType) {
                    if (elem.attachEvent) {
                        elem.attachEvent('on' + type, binder);
                    } else {
                        elem.addEventListener(type, binder, !1);
                    }
                } else if (elem === window) {
                    elem['on' + type] = binder;
                }
            }
            this._events(elem, type, binder, callback, { attach: !0 });
        },
        detach: function (elem, type, callback, config) {
            var binder = this._events(elem, type, null, callback, { attach: !1 });
            if (binder && config.standard && (elem.nodeType || elem === window)) {
                if (elem.detachEvent) {
                    elem.detachEvent('on' + type, binder);
                } else {
                    elem.removeEventListener(type, binder, !1);
                }
            }
        }
    }, {
        init: function (e, elem, type, callback, index, srcType) {
            var doc = document.documentElement || document.body;
            e = this.originalEvent = e || window.event;
            $m.mix(this, e, false);
            this.target = e.srcElement || e.target;
            this.relatedTarget = e.relatedTarget || e.fromElement && (e.fromElement === this.target ? e.toElement : e.fromElement);
            this.type = srcType;
            this.currentTarget = e.currentTarget || elem;
            this.which = e.which || e.charCode != null ? e.charCode : e.keyCode;
            this.type = type.toLowerCase();
            if (this.type == "mouseenter" || this.type == "mouseleave") {
                if (!$m.node.contain(this.currentTarget, this.relatedTarget) && !(this.relatedTarget === this.currentTarget)) {
                    callback.apply(elem, [this, index]);
                }
            } else if (callback.apply(elem, [this, index]) === !1) {
                this.preventDefault();
                this.stopPropagation();
            }
            elem = null;
        },
        preventDefault: function () {
            var e = this.originalEvent;
            if (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            if (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                e.cancelBubble = true;
            }
        }
    });
$m.create("event", {
    bind: function (elems, evt, callback) {
        $m.Event.switchEvent(elems, evt, callback, { unbind: !1, once: !1 });
    },
    one: function (elems, evt, callback) {
        $m.Event.switchEvent(elems, evt, callback, { unbind: !1, once: !0 });
    },
    unbind: function (elem, evt, callback) {
        $m.Event.switchEvent(elem, evt, callback, { unbind: !0 });
    },
    trigger: function (elem, evt, data) {
        $m.Event.switchEvent(elem, evt, null, { istrigger: !0 }, data);
    },
    delegate: function (selector, evt, callback, context) {
        var match = /\.([\w-]*)|#([\w-]*)|([\w-]*)/i.exec(selector), type = match[1] ? 'className' : match[2] ? 'id' : match[3] ? 'tagName' : '';
        this.bind(context || document.documentElement, evt, function (e) {
            switch (type) {
                case 'className':
                    if (e.target[type].indexOf(match[1]) > -1) {
                        return callback.call(e.target, e);
                    }
                    break;
                case 'id':
                    if (e.target.getAttribute('id') == match[2]) {
                        return callback.call(e.target, e);
                    }
                    break;
                case 'tagName':
                    if (e.target.tagName == match[3].toUpperCase()) {
                        return callback.call(e.target, e);
                    }
                    break;
            }
        });
    }

}, {
    on: function (ev, callback) {
        var evs = ev.split(" "),
            calls = this._callbacks || (this._callbacks = {});
        for (var i = 0; i < evs.length; i++)
            (calls[evs[i]] || (calls[evs[i]] = [])).push(callback);
    },
    emit: function () {
        var list, calls, i, l, ev, args = $m.makeArray(arguments);
        ev = args[0];

        if (!(calls = this._callbacks) || !(list = this._callbacks[ev])) return false;
        for (i = 0, l = list.length; i < l; i++) {
            if (list[i].apply(this, args.slice(1)) === false)
                break;
        }
    },
    off: function (ev, callback) {
        if (!ev) {
            this._callbacks = {};
            return this;
        }
        var list, calls, i, l;
        if (!(calls = this._callbacks)) return this;
        if (!(list = this._callbacks[ev])) return this;
        if (callback == void 0) {
            delete this._callbacks[ev];
            return this;
        }
        for (i = 0, l = list.length; i < l; i++)
            if (callback === list[i]) {
                list.splice(i, 1);
                return i;
            }
    },
    init: function (o) {
        if (o) {
            return $m.extend(o, this.constructor);
        }
    }
});
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
//cmd module
(function (window, $m, l) {

    function getBasePath() {
        var result = "", _statck;
        try {
            ab.bc();
        } catch (e) {

            //ff,safari,opera,chrome
            result = e.fileName || e.sourceURL || e.stacktrace && (_statck = e.stacktrace.match(/\(\) in\s+(.*?\:\/\/\S+)/m), _statck && _statck[1]) || e.stack && (_statck = e.stack.match(/\(([^)]+)\)/), _statck && _statck[1])

        }
        if (!result) { //IE与chrome4- opera10+
            var scripts = document.getElementsByTagName("script");
            var reg = /ymt([.-\d])*?\.js(\W|$)/i, src;
            for (var i = 0, el; el = scripts[i++];) {
                src = !!document.querySelector ? el.src :
                    el.getAttribute("src", 4);
                if (src && reg.test(src)) {
                    result = src
                    break;
                }
            }
        }
        return result.substr(0, result.lastIndexOf('/'));
    }

    var doc = window.document,
        head = doc.getElementsByTagName("head")[0],
        requireReg = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        commentReg = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*))$/mg,
        suffixType = /\.(js|css|jpg|png|gif|bmp|tiff|jpeg)(?:\?|$)/i,
        loadState = /^(?:loaded|complete|undefined)$/,
        addingScript = null,
        activeScript = null,
        anonymousData = null,
        isIE = !!doc.attachEvent,
        __basepath=$m.parseHost(getBasePath())[0],
        getCurrentScript = function () {
            if (addingScript) {
                return addingScript;
            }
            if (activeScript && activeScript.readyState === "interactive") {
                return activeScript;
            }
            var ss = head.getElementsByTagName("script"), s;
            for (var i = ss.length - 1; i >= 0; i--) {
                s = ss[i]
                if (s.readyState === "interactive") {
                    activeScript = s
                    return activeScript
                }
            }
        },
        realpath = function (id) {
            id = id.replace(/\.\//, "/");
            var dotreg = /\/[^\/]+\/\.\.\//;
            while (id.match(dotreg)) {
                id = id.replace(dotreg, "/")
            }
            return id;
        },
        basepath = function (id, path) {
            var str = id.charAt(0);
            id = tourl(id);
            if (/\/\/.|:\//.test(id)) {
                return id;
            } else if (str == '.' || str == '/') {
                return realpath(path + id);
            } else {
                return path + id;
            }
        },
        onload = function (id, success, error, charset) {
            var type = suffixType.exec(id), path, elem, isjs = !0, timeout, config = require.config;
            if (type && type[1] === 'css') {
                path = basepath(id, __basepath + config.csspath);
                elem = doc.createElement("link");
                elem.rel = "stylesheet";
                elem.type = "text/css";
                isjs = !1;
            } else {
                path = basepath(id, __basepath + config.jspath);
                elem = doc.createElement("script");
                elem.charset = charset || config.charset;
            }
            error = error || config.error;
            var A = elem.readyState ? function (a, b) {
                var e = a.onreadystatechange;
                a.onreadystatechange = function () {
                    if (loadState.test(a.readyState)) {
                        this.onreadystatechange = null;
                        b.call(this, id);
                    }
                }
            } : function (a, b) {
                a.addEventListener("load", b, !1);
            };
            function err() {
                timeout = l;
                error.call($m, id)
            }
            A(elem, function () {
                timeout && timeout.cancel();
                success && success.call(elem);
            });
            timeout = $m.later(err, config.timeout);
            if (isjs) {
                elem.src = path;
                elem.async = config.async;
            } else {
                elem.href = path;
            }
            addingScript = elem;
            isjs ? head.insertBefore(elem, head.firstChild) : head.appendChild(elem);
            addingScript = null;
            return elem;
        },
        define = function (id, deps, fn) {
            if (typeof id !== "string") {
                fn = deps;
                deps = id;
                id = null;
            }
            if (!$m.isArray(deps)) {
                fn = deps;
                deps = null;
            }
            if (!deps && $m.isFunction(fn)) {
                deps = [];
                fn.toString().replace(commentReg, '').replace(requireReg, function (m, n) {
                    var type = suffixType.exec(n);
                    if (type && type[1] != 'js') {
                        onload(n);
                    } else {
                        deps.push(n);
                    }
                    return m;
                });
            }
            anonymousData = {
                id: getdir(id),
                dependencies: deps,
                factory: fn
            };
            if (!id && isIE) {
                var s = getCurrentScript();
                if (s) {
                    id = s.src.replace(__basepath, '').replace(require.config.jspath, '').replace(/(?:\.\d*)*\.js/i, '');
                }
            }
            if (id) {
                done(id, anonymousData);
            } 
        },
        done = function (id, data) {
            var mod = Module.done(id);
            mod.dependencies = data.dependencies;
            mod.factory = data.factory;
        },
        getdir = function (id) {
            if (id) {
                return id.replace(/(?=[\w-])\.(?=[\w-])/g, '\/')
            }
        },
        tourl = function (uri) {
            if (/\.css$/i.test(uri)) {
                return require.config.version + uri;
            }
            if (/[\w-]+\.[\w-]+/) {
                uri = getdir(uri);
                uri += require.config.version ? "." + require.config.version : "";
                uri += '.js';
            } else {
                uri = uri.replace(suffixType, function (a, b) {
                    return require.config.version + a;
                })
            }
            return uri
        },
        handle = function (a, f) {
            var b, e;
            a.indexOf("/") > 0 ? (b = a.split(/[\.\/]/), e = b[b.length - 1], b.length--, $m.namespace(b.join("."))[e] = f) : $m[a] = f;
        },
        require = function (id, fn) {
            var arr = $m.isArray(id) ? id : id.split(/[,]/), mod;
            $m.each(arr, function (a, b) {
                arr[b] = $m.trim(a);
            });
            mod = Module.done("YMTMODULE" + Math.floor(Math.random() * 1e3), arr);
            mod.callback = function () {
                var deps = mod.dependencies, len = deps.length, i, exports = [];
                for (i = 0; i < len; i++) {
                    exports[i] = Module.done(deps[i]).execute()
                }
                if (typeof fn == "function") {
                    fn.apply(window, exports)
                }
                delete mod.callback;
            }
            mod.load()
        },
        Module = function (id, deps) {
            this.id = id;
            this.dependencies = deps || [];
            this.exports = {};
            this.state = 0;
            this.factory = null;
            this.count = 0;
            this.parent = null
        },
        STATE = {
            INIT: 1,
            FETCH: 2,
            LOAD: 3,
            EXECUT: 4
        };
    $m.augment(Module, {
        load: function () {
            if (!this.state) {
                this.state = STATE.INIT;
            }
            var deps = this.dependencies, len = this.count = deps.length, i, mod;
            for (i = 0; i < len; i++) {
                mod = Module.done(deps[i]);
                mod.parent = mod.parent || [];
                Module.inlist(this.id, mod.parent);
                if (mod.state < STATE.FETCH) {
                    mod.fetch();
                }
                if (mod.state >= STATE.LOAD) {
                    this.count--;
                }
            }
            if (this.count === 0) {
                this.resolve();
            }
        },
        fetch: function () {
            var mod = this, callback = function () {
                var data = anonymousData;
                if (data && !isIE) {
                    mod.dependencies = data.dependencies;
                    mod.id = data.id || mod.id;
                    mod.factory = data.factory;
                }
                anonymousData = null;
                mod.state = STATE.LOAD;
                mod.load();
            };
            mod.state = STATE.FETCH;
            onload(mod.id, callback, require.config.error, require.config.charset)
        },
        resolve: function () {
            var mod = this;
            function d(mod) {
                mod.execute();
                if (mod.callback) {
                    mod.callback();
                }
                mod.parent && $m.each(mod.parent, function (a, b) {
                    var m = Module.done(a);
                    if (m.count > 0 && (--m.count === 0)) {
                        d(m);
                    }
                });
            }
            d(this);
        },
        execute: function (id) {
            if (this.state == STATE.EXECUT) {
                return this.exports;
            }
            this.state = STATE.EXECUT;

            function require(id) {
                var type = suffixType.exec(id);
                if (!type || (type && type[1] === 'js')) {
                    return Module.done(id).execute();
                }
            }
            require.async = function (id, callback) {
                window.require(id, callback)
            }
            var exports = typeof this.factory == "function" ? this.factory.apply(window, [require, this.exports, this, $m]) : this.factory;

            if (exports === undefined) {
                exports = this.exports;
            } else {
                this.exports = exports;
            }
            handle(this.id, exports)
            this.factory = null;
            return $m.isEmptyObject(exports) ? null : exports;
        }
    });
    $m.mix(Module, {
        done: function (id, depend) {
            id = getdir(id);
            return Module.mods[id] || (Module.mods[id] = new Module(id, depend));
        },
        mods: {},
        modlist: [],
        inlist: function (id, array) {
            array = array || Module.modlist;
            return $m.inArray(id, array) || (array.push(id));
        }
    });
    require.config = {
        timeout: 10,
        jspath: "scripts/",
        csspath: 'css/',
        charset: "utf-8",
        timeout: 10 * 1E3,
        async: !0,
        error: function (r) {
            $m.log(r + " load error");
        },
        base:__basepath
    };
    
    $m.load= window.require = require;
    window.define = $m.add = window.define || define;
    $m.onload = onload;
})(window, $m);
(function (require) {
    var _host = /staticwap.ymatou.com/ig;

    if (_host.test(require.config.base)) {
        require.config.version = "2015020310";
        $m.isOnline = true;
    } else {
        require.config.version = "2015020310";
        $m.isOnline = !1;
    }

})($m.load);
//template
$m.create('template', {
    dataName: 'temp-data',
    separate: function (s) {
        var that = this, ret = s.replace(/([\r\n\t])|(\s+([='"])\s+)|(&amp;|&gt;|&lt;)|(>\s+<)/g, function (a, b, c, d, e, f) {
            return b ? '' : c ? d : e && e == '&amp;' ? '&' : e && e == '&lt;' ? '<' : e && e == '&gt;' ? '>' : f ? '><' : '';
        })
        .replace(/(<(\/)?(if|else|for|while|elseif)(?:\s+e=['"]*([^\'\"]*)['"]*)*>)|(')|(\$\{([^\}]*?)\})|(<[\w-]+\s+.*?(?:temp-data=['"]*([\w-]+)['"]*){1}.*?>)/g, function (a, b, c, d, e, f, g, h, i, j) {
            return b ? '{|}' + (c ? '-' : '+') + d + (e ? " " + e : "") + '{|}' :
                    f ? '\\\'' :
                    g ? '\'+(' + h.replace(/\\'/g, '\'') + ')+\'' :
                    i ? i + '{|}+' + that.dataName + ' ' + j + '{|}' : '';
        });
        return ret;
    },
    parsing: function (s) {
        var stmp, atmp, vname, sfl, alist = s.split(/\{\|\}/), astm = ['var aRet = [];'], r = /\s/, key = {}, sindex = 0, eindex = 0;
        while (alist.length) {
            if (!(stmp = alist.shift())) {
                continue;
            }
            sfl = stmp.charAt(0);
            if (sfl !== '+' && sfl !== '-') {
                stmp = '\'' + stmp + '\'';
                astm.push('aRet.push(' + stmp + ');');
                continue;
            }
            atmp = stmp.split(r);
            switch (atmp[0]) {
                case '+' + this.dataName:
                    vname = atmp[1];
                    break;
                case '+while':
                case '+if':
                    astm.push(atmp[0].slice(1) + '(' + atmp.slice(1).join(' ') + '){');
                    break;
                case '+elseif':
                    astm.push('else if(' + atmp.slice(1).join(' ') + '){');
                    break;
                case '+else':
                    astm.push('else{');
                    break;
                case '-while':
                case '-if':
                case '-else':
                case '-elseif':
                    astm.push('}');
                    break;
                case '+for':
                    ++sindex;
                    key['for'] = key['for'] || [];
                    key['for'].push(atmp[3]);
                    astm.push('if(' + atmp[3] + '&&' + atmp[3] + '.constructor === Array){(function(a){var l=a.length,' + atmp[1] + 'Index,i;for(i=l;i--;){' + atmp[1] + 'Index=(l-i-1);var ' + atmp[1] + '=a[' + atmp[1] + 'Index];');
                    break;
                case '-for':
                    astm.push('}})(' + key['for'][sindex - eindex - 1] + ');}');
                    ++eindex;
                    sindex == eindex && (sindex = eindex = 0, key['for'] = []);
                    break;
                default:
                    break;
            }
        }
        astm.push('return aRet.join("");');
        return [vname, astm.join('')]
    }
}, {
    init: function (config) {
        var cst = this.constructor, c, s = config.html, div;
        function parse(s, data) {
            var html = cst.parsing(cst.separate(s));
            return (new Function(html[0], html[1]))(data);
        }
        if (config.container) {
            c = typeof config.container == "string" ? $m.node(config.container)[0] : config.container;
            s = s || c.innerHTML;
            this.html = parse(s, config.data);
            if (config.add) {
                $m.node.append(c, this.html);
            } else {
                c.innerHTML = this.html
            }
            div = null;
            return;
        }
        this.html = parse(s, config.data);
    }
});