Ymt.add(function (require, exports, module) {
    function g(b, c) {
        var d = this;
        if (!(d instanceof g)) return new g(b, $m.merge(o, c));
        String.prototype.reTrim = function () {
            return this.replace(/^[#\.]/, "")
        };
        d.config = c;
        d.container = $(b);
        d.txt = "";
        var a = $(b),
        e = null, id;
        if (a.size() == 0 || a.first().data("vExample")) return !1;
        a.first().data("vExample", !0);
        d.k = {
            0:"isRegExp",
            1: "isEmpty",
            2: "lenMin",
            3: "lenMax",
            4: "lenRange",
            5: "isEmail",
            6: "isPhone",
            7: "isTell",
            8: "isChinese",
            9: "isEqual",
            10: "isRadio",
            11: "isPhoneOrTell",
            12: "isPassWrod",
            13: "isChOrEn"
        };
        d.isFocus = !0;
        d.v = {
            isRegExp: function (a) {
                return a.regexp.test(d.txt);
            },
            isEmpty: function () {
                return !!$.trim(d.txt)
            },
            lenMin: function (a) {
                return d.txt.length >=
                ~ ~a.p
            },
            lenMax: function (a) {
                return d.txt.length <= ~ ~a.p
            },
            lenRange: function (a) {
                a = a.p.split(":");
                var b = d.txt.length;
                return b >= ~ ~a[0] && b <= ~ ~a[1]
            },
            isEmail: function () {
                return /^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\_\-\u4e00-\u9fa5]+\.)+[a-zA-Z0-9]{2,4}$/.test(d.txt)
            },
            isPhone: function () {
                return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(d.txt)
            },
            isTell: function (a) {
                a = a.p;
                return RegExp("^(" + a + ")\\d{" + (11 - a.split("|")[0].length) + "}$").test(d.txt)
            },
            isChinese: function () {
                return /^[\u4E00-\u9FA5\uf900-\ufa2d]+$/.test(d.txt)
            },
            isEqual: function (a) {
                a = a.p.split(":");
                return $(a[0]).val() === $(a[1]).val()
            },
            isRadio: function () {
                return !!$(b).filter(":checked").get(0)
            },
            isPhoneOrTell: function () {
                return /(^(\d{3,4}-)?\d{7,8})$|(1[0-9]{10})/.test(d.txt)
            },
            isPassWrod: function () {
                return /[^\u4e00-\u9fa5]+$/.test(d.txt)
            },
            isChOrEn: function () {
                return /^[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z]+$/.test(d.txt)
            }
        };
        d.showTip = function (h) {
            h = d.isFocus ? c.TipMsg : (h ? h : c.TipMsg);
            id = "#validateTip_" + b.match(/\w+/g).join("");
            var i = c.TipTemplete ? c.TipTemplete : '';
            $(document.body).has(id).length || (c.FixedContainer ? c.FixedContainer.attr('id', id.reTrim()).append(i) : $(document.body).append(i));
            
            c.FixedContainer && c.FixedContainer.css('display', 'inline-block');

            e = $(id);
            if (!c.FixedContainer) {
                a = a.last();
                var j = c.Position,
                f = a.offset();
                i = f.top + a.height() + j[1];
                j = f.left + a.width() + j[0];
                e.css({
                    top: i,
                    left: j
                })
            }
            c.showBack[0] && c.showBack[0].call(d);
            e.fadeIn("fast",
            function () {
                c.showBack[1] && c.showBack[1].call(d)
            }).html(h);
        };
        d.bool = function (a, b) {
            var c = b.replace(/^:+|:+$/g, "").split(":");
            a = $.parseJSON(a);
            $.each(c,
            function (b, c) {
                c in a && (a = a[c]);
            });
            return !!a
        };

        if (!c.FixedContainer) {
            this.container.after('<span class="' + c.FixedErrorClass.reTrim() + '"></span>');
            c.FixedContainer = this.container.next(c.FixedErrorClass)
        } else {
            c.FixedContainer = typeof c.FixedContainer === "string" ? $(c.FixedContainer) : c.FixedContainer;
        }

        if (c.AutoValidate) {
            a.bind(c.eventShow, function () {
                c.FixedContainer && c.FixedDefaultClass && c.FixedContainer.removeClass(c.FixedDefaultClass.reTrim());
                d.config.isasync = !0;
                d.isFocus = !1;
                d.validate() && c.FixedContainer.hide() || c.FixedContainer.css('display', 'inline-block');
                
            });
            a.bind(c.eventFocus, function () {
                c.FixedContainer && c.FixedDefaultClass && c.FixedContainer.addClass(c.FixedDefaultClass.reTrim());
                d.config.isasync = !1;
                d.isFocus = !0;
                d.validate() && c.FixedContainer.hide() || c.FixedContainer.css('display', 'inline-block');
                
            });
        }

        if (c.validateForm) {
            var f = $(a).parents("form").first(),
            m = f.data("formArray"),
            k = m ? m : [];
            k.push(d);
            var n = f.data("events") == void 0 ? null : f.data("events").submit[0].handler;
            f.data("formArray", k);
            f.unbind("submit").bind("submit",
            function () {
                var a = !0;
                $.each(k,
                function (b, c) {
                    c.validate() || (a = !1)
                });
                a && n && n.call(this);
                return a
            })
        }
    }
    var o = {
        TipMsg: "\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u8f93\u9879",
        eventShow: "blur",
        eventFocus: "focus",
        Position: [20, 0],
        Text: null,
        FixedDefaultClass: ".greybg",
        FixedErrorClass:".verifi",
        FixedContainer: "",
        AutoValidate: !0,
        TipTemplete: "",
        successFun: null,
        isasync: !1,
        validateType: [1, {
            k: 2,
            p: "5",
            msg: "\u63d0\u793a\u4fe1\u606f",
            fail: null,
            success: null,
            Ajax: {
                open: !1,
                url: "",
                para: null,
                step: ""
            },
            self: null
        },
        function () { } ],
        validateForm: !1,
        showBack: [0, 0]
    };
    $m.augment(g, {
        validate: function () {
            var b = this,
            c = !0;
            b.txt = b.config.Text ? b.config.Text.call(b) : b.container.val();
            $.each(b.config.validateType,
            function (d, a) {
                if (a.Ajax && a.Ajax.open) {
                    var e = b.config.isasync &&
                     $.ajax({
                         type: "get",
                         url: a.Ajax.url + encodeURIComponent(b.txt),
                         data: a.Ajax.para,
                         async: !1
                     }).responseText;
                    if ((typeof e == "string" ? e : null)) return b.showTip(e),
                    a.fail && a.fail.call(b),
                    c = !1
                } else if (typeof a == "function" || a.self) {
                    if (!(typeof a == "function" ? a : a.self).call(b, b.container)) return b.showTip(a.msg),
                    a.fail && a.fail.call(b),
                    c = !1
                } else if (e = Object.prototype.toString.call(a).indexOf("Object") > -1 ? a.k : a, !b.v[typeof e == "string" ? e : b.k[e]](a)) return b.showTip(a.msg),
                a.fail && a.fail.call(b),
                c = !1;
                a.success && a.success.call(b)
            });
            return c
        }
    });
    return g
});
