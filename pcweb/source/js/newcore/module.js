//cmd module 
(function (window, $m, l) {

    function getBasePath() {
        var result = "",
            _statck;
        try {
            ab.bc();
        }
        catch (e) {

            //ff,safari,opera,chrome
            result = e.fileName || e.sourceURL || e.stacktrace && (_statck = e.stacktrace.match(/\(\) in\s+(.*?\:\/\/\S+)/m), _statck && _statck[1]) || e.stack && (_statck = e.stack.match(/\(([^)]+)\)/), _statck && _statck[1])

        }
        if (!result) {
            //IE与chrome4- opera10+
            var scripts = document.getElementsByTagName("script");
            var reg = /ymt([\.\d])*?\.js(\W|$)/i,
                src;
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
        isIE = !!doc.attachEvent,
        __anonymousData = null,
        __mainJsPath = getBasePath(),
        //核心框架所在的目录名，也是所有资源的root目录
        __idleading = __mainJsPath.slice(__mainJsPath.lastIndexOf("/") + 1),
        __basePath = $m.parseHost(__mainJsPath)[0],
        getCurrentScript = function () {
            if (addingScript) {
                return addingScript;
            }
            if (activeScript && activeScript.readyState === "interactive") {
                return activeScript;
            }
            var ss = head.getElementsByTagName("script"),
                s;
            for (var i = ss.length - 1; i >= 0; i--) {
                s = ss[i]
                if (s.readyState === "interactive") {
                    activeScript = s
                    return activeScript
                }
            }
        },
        //加载模块
        onload = function (id, success, error, charset) {
            var type = suffixType.exec(id),
                path = fullPath(id),
                elem, timeout, config = require.config;
            addingScript = elem;
            if (type && type[1] === 'css') {
                elem = doc.createElement("link");
                elem.rel = "stylesheet";
                elem.type = "text/css";
                elem.href = path;
                head.appendChild(elem)
            }
            else {
                elem = doc.createElement("script");
                elem.charset = charset || config.charset;
                elem.src = path;
                elem.async = config.async;
                addingScript = elem;
                head.insertBefore(elem, head.firstChild)
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

            A(elem, function () {
                timeout && timeout.cancel();
                success && success.call(elem);
            });

            timeout = $m.later(function () {
                timeout.cancel();
                error.call($m, id)
            }, config.timeout);

            addingScript = null;
        },
        //定义模块
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
                    }
                    else {
                        deps.push(n);
                    }
                    return m;
                });
            }
            var length = deps.length,
                i = 0;
            if (id && length) {
                //把__idleading加入模块id中
                for (i; i < length; i++) {
                    deps[i] = deps[i].replace(/\\/g, '\/');
                    deps[i] = fullId(deps[i], id);
                }
            }

            //取合成脚本第一个模块
            __anonymousData = __anonymousData || {
                id: id,
                dependencies: deps,
                factory: fn
            };

            if (!id && isIE) {
                var s = getCurrentScript();
                if (s) {
                    id = s.src.replace(__basePath, '').replace(/(?:\.\d+)*\.js/i, '');
                }
            }
            if (id) {
                Module.done(id, deps, fn)
            }
        },
        //换算完整id
        fullId = function (id, path) {
            path = path || '';
            var str = id.charAt(0),
                index = path.lastIndexOf('/');
            if (index > 0) {
                path = path.slice(0, index + 1);
            }
            if (str == '/') {
                id = path + __idleading + id;
            }
            else if (str == '.') {
                if (!path) {
                    path = __idleading + '/';
                }
                id = path + id;
            }
            var dotreg = /\/[^\/]+\/\.\.\//;
            while (dotreg.test(id)) {
                id = id.replace(dotreg, "/")
            }
            id = id.replace(/\.\//g, "/").replace(/(?!=[^:])\/\//g, "/");
            return id;
        },
        //绝对地址
        fullPath = function (id) {
            if ($m.parseHost(id)) {
                return id;
            }
            id = addVersionAndSuffix(id);
            return __basePath + fullId(id);
        },
        //a.b to a/b
        dotToSprit = function (str) {
            return str.replace(/(?=[\w-])\.(?=[\w-])/g, '\/');
        },
        //id转换成dir
        idtodir = function (id, path) {
            id = dotToSprit(id);
            id = fullId(id, path);
            return id;
        },
        //给资源加版本号
        addVersionAndSuffix = function (uri) {
            var version = require.config.version ? "." + require.config.version : "";
            if (suffixType.test(uri)) {
                uri = uri.replace(suffixType, function (a, b) {
                    return version + a;
                })
            }
            else {
                uri += version + '.js';
            }
            return uri;
        },
        //命名空间句柄
        handle = function (a, f) {
            var b, e;
            a.indexOf("/") > 0 ? (b = a.split(/[\.\/]/), e = b[b.length - 1], b.length--, $m.namespace(b.join("."))[e] = f) : $m[a] = f;
        },
        require = function (id, fn) {
            var arr = $m.isArray(id) ? id : id.split(/[,]/),
                mod;
            $m.each(arr, function (a, b) {
                if (a.slice(0, 2) != "./") {
                    a = "./" + a;
                }
                arr[b] = $m.trim(a);
            });
            mod = Module.done("YMTMODULE" + Math.floor(Math.random() * 1e3), arr);
            mod.callback = function () {
                var deps = mod.dependencies,
                    len = deps.length,
                    i, exports = [];
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
        Module = function (id, deps, factory) {
            this.id = id;
            this.fileName = null;
            if (id) {
                var index = id.lastIndexOf("/");
                this.fileName = index > -1 ? id.slice(index) : id;
            }
            this.dependencies = deps || [];
            this.exports = {};
            this.state = 0;
            this.factory = factory || null;
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
            //父业子承
            var deps = this.dependencies,
                i, mod;
            this.count = deps.length;
            for (i = 0; i < deps.length; i++) {
                mod = Module.done(deps[i]);
                if (mod.factory || !$m.isEmptyObject(mod.exports)) {
                    deps.splice(i, 1);
                    mod.state = STATE.LOAD;
                    i--;
                }
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
            var mod = this,
                callback = function () {
                    if (__anonymousData) { //__anonymousData && !isIE
                        mod.dependencies = __anonymousData.dependencies;
                        mod.id = __anonymousData.id || mod.id;
                        mod.factory = __anonymousData.factory;
                        __anonymousData = null;
                    }

                    mod.state = STATE.LOAD;
                    mod.load();
                };
            //isIE && (__anonymousData = null);
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
            var that = this;

            function require(id) {
                var type = suffixType.exec(id);
                if (!type || (type && type[1] === 'js')) {
                    return Module.done(id, null, null, that.id).execute();
                }
            }

            require.async = function (id, callback) {
                window.require(id, callback)
            }
            var exports = typeof this.factory == "function" ? this.factory.apply(window, [require, this.exports, this, $m]) : this.factory;

            if (exports) {
                this.exports = exports;
            }
            handle(this.id, this.exports)
            //this.factory = null;
            return this.exports;
        }
    });
    $m.mix(Module, {
        done: function (id, depend, fn, path) {
            id = idtodir(id, path);
            if (Module.mods[id]) {
                depend && (Module.mods[id].dependencies = depend);
                fn && (Module.mods[id].factory = fn);
                return Module.mods[id];
            }
            return (Module.mods[id] = new Module(id, depend, fn));
        },
        mods: {},
        modlist: [],
        inlist: function (id, array) {
            array = array || Module.modlist;
            return $m.inArray(id, array) || (array.push(id));
        }
    });
    require.config = {
        csspath: 'css/',
        charset: "utf-8",
        timeout: 10 * 1E3,
        async: !0,
        error: function (r) {
            $m.log(r + " load error");
        },
        base: __basePath
    };

    $m.load = window.require = require;
    window.define = $m.add = window.define || define;
    $m.onload = onload;
})(window, $m);