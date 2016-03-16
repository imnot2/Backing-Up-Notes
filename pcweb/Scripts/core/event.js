/*=======================event.js===========================*/
Ymt.add("core.Event", function (c) {
    function u() { if (!(this instanceof u)) return new u(); }
    function Event(e, elem, index, type) {
        if (!(this instanceof Event)) return new Event(e, elem, index, type);
        this.originalEvent = e;
        this.target = e.srcElement || e.target;
        this.relatedTarget = e.relatedTarget || (e.type == 'mouseover' ? e.fromElement : e.toElement);
        this.currentTarget = e.currentTarget || elem;
        this.currentIndex = index || 0;
        this.eventType = type;
    }
    Event.prototype = {
        preventDefault: function () {
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        }
    }
    var check = function (b) {
        return b == "mouseenter" ? "mouseover" : b == "mouseleave" ? "mouseout" : b;
    },
    proxy = function (e, type, d, elem, n) {
        e = e || window.event;
        var evt = Event(e, elem, n, type);
        if (evt.eventType == "mouseenter" || evt.eventType == "mouseleave") {
            if (this.isNoLoop(evt.currentTarget, evt.relatedTarget)) d.call(this, evt);
        } else {
            d.call(this, evt) == !1 && (evt.preventDefault(), evt.stopPropagation());
            elem = evt = null;
        }
    },
    __slice = Array.prototype.slice,
    s = {
        isNoLoop: function (target, relatedTarget) {
            var contains = function (parentNode, childNode) {
                if (parentNode.contains) {
                    return parentNode != childNode && parentNode.contains(childNode);
                } else {
                    return !!(parentNode.compareDocumentPosition(childNode) & 16);
                }
            }
            return !contains(target, relatedTarget) && !(relatedTarget === target);
        },
        addEvent: document.addEventListener ?
            function (a, b, d, n) {
                var that = this, type = check.call(a, b);
                a.addEventListener && a.addEventListener(type, function (e) {
                    proxy.call(that, e, b, d, a, n)
                }, !1)
            } : function (a, b, d, n) {
                var that = this, type = check.call(a, b);
                a.attachEvent && a.attachEvent("on" + type, function (e) {
                    proxy.call(that, e, b, d, a, n)
                })
            },
        removeEvent: document.removeEventListener ?
            function (a, b, d, n) {
                var that = this, type = check.call(a, b);
                a.removeEventListener && a.removeEventListener(type, function (e) {
                    proxy.call(that, e, b, d, a, n)
                }, !1)
            } : function (a, b, d, n) {
                var that = this, type = check.call(a, b);
                a.detachEvent && a.detachEvent("on" + type, function (e) {
                    proxy.call(that, e, b, d, a, n)
                })
            }
    },
    type = /(blur|focus|load|resize|scroll|unload|click|dblclick|mouseover|mouseout|mousemove|mousedown|mouseup|mouseenter|mouseleave)/,
    Events = {
        bind: function (elem, ev, callback) {
            var calls, evs, name, _i, _len, bool, t = c;
            bool = typeof elem == 'string' && typeof ev == 'function' && callback == undefined;
            bool && (callback = ev, ev = elem);
            evs = ev.split(' ');
            calls = this.hasOwnProperty('_callbacks') && this._callbacks || (this._callbacks = {});
            for (_i = 0, _len = evs.length; _i < _len; _i++) {
                name = evs[_i];
                calls[name] || (calls[name] = []);
                calls[name].push(callback);
                if (!bool && type.test(name)) {
                    t.isArray(elem) ? t.each(elem, function (m, n) {
                        m.nodeType && s.addEvent(m, name, callback, n);
                    }) : s.addEvent(elem, name, callback);
                }
            }
            return this;
        },
        one: function (elem, ev, callback) {
            return this.bind(elem, ev, function () {
                this.unbind(elem, ev, arguments.callee);
                return callback.apply(this, arguments);
            });
        },
        trigger: function () {
            var args, callback, ev, list, _i, _len, _ref;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            ev = args.shift();
            list = this.hasOwnProperty('_callbacks') && ((_ref = this._callbacks) != null ? _ref[ev] : void 0);
            if (!list) {
                return;
            }
            for (_i = 0, _len = list.length; _i < _len; _i++) {
                callback = list[_i];
                if (callback.apply(this, args) === false) {
                    break;
                }
            }
            return true;
        },
        unbind: function (elem, ev, callback) {
            var cb, i, list, _i, _len, _ref, bool, t;
            bool = typeof elem == 'string' && typeof ev == 'function' && callback == undefined;
            bool && (callback = ev, ev = elem);
            if (!ev) {
                this._callbacks = {};
                return this;
            }
            list = (_ref = this._callbacks) != null ? _ref[ev] : void 0;
            if (!list) {
                return this;
            }
            if (!callback) {
                delete this._callbacks[ev];
                return this;
            }
            for (i = _i = 0, _len = list.length; _i < _len; i = ++_i) {
                cb = list[i];
                if (!(cb === callback)) {
                    continue;
                }
                list = list.slice();
                list.splice(i, 1);
                if (!bool && type.test(name)) {
                    t.isArray(elem) ? t.each(elem, function (m, n) {
                        m.nodeType && s.removeEvent(m, name, callback, n);
                    }) : s.removeEvent(elem, name, callback);
                }
                this._callbacks[ev] = list;
                break;
            }
            return this;
        }
    };
    //c.augment(u, s);
    u.prototype.bind = function (elem, events, callback) {
        var binder, unbinder, event = Events, _this = this;
        event.bind(elem, events, binder = function () {
            return callback.apply(_this, arguments);
        });
        event.bind(elem, 'unbind', unbinder = function () {
            event.unbind(elem, events, binder);
            return event.unbind(elem, 'unbind', unbinder);
        });
        return binder;
    };
    u.prototype.one = function (elem, events, callback) {
        var binder, event = Events, _this = this;
        return binder = this.bind(elem, events, function () {
            event.unbind(elem, events, binder);
            return callback.apply(_this, arguments);
        });
    };
    u.prototype.trigger = function () {
        var args, _ref, event = Events;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        args.splice(1, 0, this);
        return (_ref = event).trigger.apply(_ref, args);
    };
    u.prototype.unbind = function () {
        return this.trigger('unbind');
    };
    return u;
});
