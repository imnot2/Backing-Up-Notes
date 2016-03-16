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
