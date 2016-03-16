//cmd module
(function(window, $m, l) {

    function getBasePath() {
        var result = "",
            _statck;
        try {
            ab.bc();
        } catch (e) {

            //ff,safari,opera,chrome
            result = e.fileName || e.sourceURL || e.stacktrace && (_statck = e.stacktrace.match(/\(\) in\s+(.*?\:\/\/\S+)/m), _statck && _statck[1]) || e.stack && (_statck = e.stack.match(/\(([^)]+)\)/), _statck && _statck[1])

        }
        if (!result) { //IE与chrome4- opera10+
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
        anonymousData = null,
        isIE = !!doc.attachEvent,
        __basepath = $m.parseHost(getBasePath())[0],
        getCurrentScript = function() {
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
        realpath = function(id) {
            id = id.replace(/\.\//, "/");
            var dotreg = /\/[^\/]+\/\.\.\//;
            while (id.match(dotreg)) {
                id = id.replace(dotreg, "/")
            }
            return id;
        },
        basepath = function(id, path) {
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
        onload = function(id, success, error, charset) {
            var type = suffixType.exec(id),
                path, elem, isjs = !0,
                timeout, config = require.config;
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
            var A = elem.readyState ? function(a, b) {
                var e = a.onreadystatechange;
                a.onreadystatechange = function() {
                    if (loadState.test(a.readyState)) {
                        this.onreadystatechange = null;
                        b.call(this, id);
                    }
                }
            } : function(a, b) {
                a.addEventListener("load", b, !1);
            };

            function err() {
                timeout = l;
                error.call($m, id)
            }
            A(elem, function() {
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
        define = function(id, deps, fn) {
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
                fn.toString().replace(commentReg, '').replace(requireReg, function(m, n) {
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
        done = function(id, data) {
            var mod = Module.done(id);
            mod.dependencies = data.dependencies;
            mod.factory = data.factory;
        },
        getdir = function(id) {
            if (id) {
                return id.replace(/(?=[\w-])\.(?=[\w-])/g, '\/')
            }
        },
        tourl = function(uri) {
            if (/\.css$/i.test(uri)) {
                return require.config.version + uri;
            }
            if (/[\w-]+\.[\w-]+/) {
                uri = getdir(uri);
                uri += require.config.version ? "." + require.config.version : "";
                uri += '.js';
            } else {
                uri = uri.replace(suffixType, function(a, b) {
                    return require.config.version + a;
                })
            }
            return uri
        },
        handle = function(a, f) {
            var b, e;
            a.indexOf("/") > 0 ? (b = a.split(/[\.\/]/), e = b[b.length - 1], b.length--, $m.namespace(b.join("."))[e] = f) : $m[a] = f;
        },
        require = function(id, fn) {
            var arr = $m.isArray(id) ? id : id.split(/[,]/),
                mod;
            $m.each(arr, function(a, b) {
                arr[b] = $m.trim(a);
            });
            mod = Module.done("YMTMODULE" + Math.floor(Math.random() * 1e3), arr);
            mod.callback = function() {
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
        Module = function(id, deps) {
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
        load: function() {
            if (!this.state) {
                this.state = STATE.INIT;
            }
            var deps = this.dependencies,
                len = this.count = deps.length,
                i, mod;
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
        fetch: function() {
            var mod = this,
                callback = function() {
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
        resolve: function() {
            var mod = this;

            function d(mod) {
                mod.execute();
                if (mod.callback) {
                    mod.callback();
                }
                mod.parent && $m.each(mod.parent, function(a, b) {
                    var m = Module.done(a);
                    if (m.count > 0 && (--m.count === 0)) {
                        d(m);
                    }
                });
            }
            d(this);
        },
        execute: function(id) {
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
            require.async = function(id, callback) {
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
        done: function(id, depend) {
            id = getdir(id);
            return Module.mods[id] || (Module.mods[id] = new Module(id, depend));
        },
        mods: {},
        modlist: [],
        inlist: function(id, array) {
            array = array || Module.modlist;
            return $m.inArray(id, array) || (array.push(id));
        }
    });
    require.config = {
        timeout: 10,
        jspath: "js/",
        csspath: 'css/',
        charset: "utf-8",
        timeout: 10 * 1E3,
        async: !0,
        error: function(r) {
            $m.log(r + " load error");
        },
        base: __basepath
    };

    $m.load = window.require = require;
    window.define = $m.add = window.define || define;
    $m.onload = onload;
})(window, $m);