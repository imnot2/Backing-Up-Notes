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