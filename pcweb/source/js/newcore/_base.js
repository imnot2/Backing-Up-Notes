//Ymt base
(function (window, $m, undefined) {

    //$m
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
            __deferred.resolve();
            isReady = !0;
        }

        function doScrollCheck() {
            try {
                doc.documentElement.doScroll("left");
            }
            catch (e) {
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
        }
        else if (doc.attachEvent) {
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
            }
            catch (e) {}
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
                    function b() {}
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
            var args = arguments,
                lastIndex = args.length - 1,
                origin = args[0],
                last = args[lastIndex];

            $m.isBoolean(last) || (last = undefined, lastIndex++);
            for (j = 1; j < lastIndex; j++) mix(origin.prototype, args[j].prototype || args[j], last);
            return origin;
        },

        //合并所有参数对象
        merge: function () {
            var a = {},
                b, length = arguments.length;
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
                },
                bool = $m.isString(name);
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
        later: function (method, time, isInterval, context, args) {
            time = time || 0;
            context = context || {};
            var v = $m.makeArray(args),
                timeHandle;
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
            var length = obj.length,
                isPlainObjectOrFun = length === undefined || $m.isFunction(obj);

            context = context || window;
            if (isPlainObjectOrFun) {
                for (var g in obj) {
                    if (fun.call(context, obj[g], g, obj) === !1) break;
                }
            }
            else {
                for (var index = 0; index < length; index++) {
                    if (fun.call(context, obj[index], index, obj) === !1) break;
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

            var _search = arr[5];
            var _query, _queryObj = null;

            if (_search) {
                _query = _search.slice(1).split("&");
                $m.each(_query, function (keyval, index) {
                    keyval = keyval.split("=");
                    _queryObj = _queryObj || {};
                    _queryObj[keyval[0]] = keyval[1];
                })
            }
            return {
                hash: arr[6] || '',
                pathname: arr[4],
                protocol: arr[1],
                hostname: arr[2],
                search: arr[5],
                port: arr[3],
                query: _queryObj
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
            }
            else {
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