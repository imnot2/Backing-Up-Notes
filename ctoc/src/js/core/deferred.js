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