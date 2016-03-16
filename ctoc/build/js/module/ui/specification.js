Ymt.add(function (require, exports, module) {
    function spe(b, a) {
        if (!(this instanceof spe))
            return new spe(b, $m.merge(i, a));
        this.container = document.getElementById(b);
        this.config = a;
        this._index = index++;
        this._init();
    }

    var index = 0;

    var i = {
        normal: 'normal',
        hover: 'hover',
        disabled: 'disabled',
        content: 'specontent',
        spe: {},
        callback: '',
        //oversale: '#oversale',
        canBuyBtn: '#CanBuyDiv',
        cantBuyBtn: '#CantBuyDiv',
        oversaleBox: '#oversale',
        specBox: '.p_box',
        stock: '.spestock',
        countdownnumber:0,
        price: '.price',
        promotionPrice: '.speprice',
        limitNum: '.spelimit',
        complete:null,
        Flight: '.speflight',
        id: 'specification_',
        parent: '.propwapper',
        tobuy: 1,
        totalStock: 0,
        spedata: null
    };
    $m.augment(spe, {
        _init: function () {
            this._parseJSON();
            this._prepareHTML();
            this._control();
        },
        _parseJSON: function () {
            var c = this.config, that = this, data = c.spedata, arr;
            function makeArray(obj) {
                var array = [];
                for (var a in obj) {
                    array.push(obj[a]);
                }
                return array;
            }
            function compare(a) {
                var len = a.length, b, f;
                for (var i = 0; i < len; i++) {
                    f = a[i];
                    for (var j = len - 1; j >= 0; j--) {
                        b = a[j];
                        if (i != j) {
                            $m.each(f.map, function (m, n, g1) {
                                this.each(b.map, function (c, d) {
                                    var g;
                                    if (n != 'un' && d != 'un') {
                                        var t = this;
                                        var found = (function (a, b) {
                                            var len1 = a.length, found, i;
                                            for (i = 0; i < len1; i++) {
                                                found = t.inArray(a[i], b);
                                                if (found) {
                                                    return true;
                                                } else {
                                                    continue;
                                                }
                                            }
                                            return found;
                                        })(m, c);
                                        if (!found) {
                                            g = g1['un'] = g1['un'] || {};
                                            g[n + '-un'] = g[n + '-un'] || [];
                                            g[n + '-un'].push(d);
                                        }
                                    }
                                }, this);
                            }, $m)
                        }
                    }
                }
                return a;
            }
            $m.each(data.Spec, function (m, n) {
                var spe = c.spe['' + n] = {}, u = '', randoms = [];
                spe.name = data.Spec[n];
                $m.each(data.Data, function (i, j) {
                    var datail = data.Data[j].SpecDetail, id = i.CatalogId;
                    that.length = datail.length
                    $m.each(datail, function (o, p) {
                        if (n == p) {
                            var sub = spe.sub = spe.sub || [], map = spe.map = spe.map || {};
                            !$m.inArray(o, sub) && sub.push(o);
                            u = that._unicode(n, o);
                            map[u] = map[u] || [];
                            map[u].push(id);
                        }
                    })
                })
            });
            arr = makeArray(c.spe);
            arr = compare(arr);
        },
        _prepareHTML: function () {
            var c = this.config, that = this, div = document.createElement('div'), dl = '';
            div.className = c.content;
            $m.each(c.spe, function (m, n) {
                dl += "<dl id='" + c.id+ that._index + "-" + n + "' class='colorBox clearfix'><dt class='name'>" + m.name + "：</dt><dd class='colorListBox des'><ul class='colorList'>";
                $m.each(m.sub, function (i, j) {
                    var u = that._unicode(n, i);
                    if (i.indexOf("|") > 0) {
                        i = i.split('|');
                        if (i[0] != 'null') {
                            i = "<img src='" + i[0] + "' height='24' title='" + i[1] + "' />";
                        } else {
                            i = i[1]
                        }
                    } else {
                        i = i;
                    }
                    //dl += "<dd class='des'><a href='javascript:void(0)' map='" + u + "'>" + i + "<i></i></a></dd>";
                    dl += "<li class='item'><a href='javascript:;'  map='" + u + "'><span>" + i + "</span></a></li>";
                });
                dl += "</ul></dd></dl>";
            });
            div.innerHTML = dl;
            //this.container.appendChild(div);
            $(this.container).find(".buyOperationBox").children(':first-child').before(div);
            
        },
        _unicode: function (n, o) {
            o = o.indexOf("|") && o.split('|')[1] || o;
            return encodeURIComponent(n + o.slice());
        },
        _model: function (s, c) {
            var catalogid;
            var arr1 = c.spe['0'].map[s[0]], arr2 = c.spe['1'];
            if (!arr2) {
                catalogid = arr1[0];
            } else {
                arr2 = arr2.map[s[1]];
                for (var i = 0, len1 = arr1.length; i < len1; i++) {
                    for (var j = 0, len2 = arr2.length; j < len2; j++) {
                        if (arr1[i] == arr2[j]) {
                            catalogid = arr1[i];
                        }
                    }
                }
            }
            for (var m in c.spedata.Data) {
                if (c.spedata.Data[m].CatalogId == catalogid) {
                    return c.spedata.Data[m];
                }
            }
        },
        _view: function (model, b) {
            var c = this.config, that = this, $ = window.$, con = $(this.container).closest(c.parent), ui, bool = false;
            ui = c.ui = c.ui || {
                //oversale: con.find(c.oversale),
                canBuyBtn: con.find(c.canBuyBtn),
                cantBuyBtn: con.find(c.cantBuyBtn),
                stock: con.find(c.stock),
                price: con.find(c.price),
                promotionPrice: con.find(c.promotionPrice),
                limitNum: con.find(c.limitNum),
                Flight: con.find(c.Flight),
                oversaleBox: con.find(c.oversaleBox),
                specBox: con.find(c.specBox)
            };
            if (model == undefined || model == "") {
                if (c.spedata.Data.length) {
                    for (var i = 0, len = c.spedata.Data.length; i < len; i++) {
                        bool = verify(c.spedata.Data[i]);
                        if (bool) {
                            that._view(c.spedata.Data[i], b);
                            return c.spedata.Data[i];
                        } else {
                            continue;
                        }
                    }
                } else {
                    that._show(ui.oversaleBox, ui.specBox);
                    that._show(ui.cantBuyBtn, ui.canBuyBtn);
                    return;
                }
            } else {
                !bool && verify(model);
                
                //b && ui.stock.html(c.totalStock) || ui.stock.html(model.Stock);
                if (b) {
                    ui.stock.html(c.totalStock);
                    ui.stock.parent().hide();
                    if (c.totalStock <= 10) ui.stock.parent().show();
                } else {
                    ui.stock.html(model.Stock);
                    ui.stock.parent().hide();
                    if (model.Stock <= 10) ui.stock.parent().show();
                }

                ui.price.html(model.Price);
                if (model.PromotionPrice) {
                    ui.promotionPrice.html(model.PromotionPrice).parents('.promotion').show();
                } 
                ui.limitNum.html(model.Limit - model.Bought);
                if (model.Limit == 0 || model.Limit == '0') {
                    ui.limitNum.closest('span').hide();
                }
                c.complete && c.complete(model);
                ui.Flight.html(model.Flight);
                //ui.oversale.html(model.Bought);
                return model;
            }
            function verify(model) {
                var bool;
                if (c.spedata.CanBuy && model.Stock > 0) {
                    //that._show(ui.specBox, ui.oversaleBox);
                    that._show(ui.canBuyBtn, ui.cantBuyBtn);
                    bool = true;
                } else {
                    //that._show(ui.oversaleBox, ui.specBox);
                    that._show(ui.cantBuyBtn, ui.canBuyBtn);
                    bool = false;
                }
                return bool;
            }
        },
        _show: function (a, b) {
            var c = this.config.countdownnumber,that=this;
            if (c == 0) {
                a.show(); b.hide();
                return;
            }
            if (c > 0) {
                var countdowntimeout = null;
                $("#countdown").show();
                countdowntimeout = setInterval(function () {
                    var dom = $("#countdown")
                    if (c == 0) {
                        clearInterval(countdowntimeout);
                        dom.hide();
                        a.show(); b.hide();
                        that.config.countdownnumber = 0;
                        return;
                    }
                    var second, min, hour, allmin, time = [];
                    second = c % 60;
                    allmin = (c - second) / 60;
                    min = allmin % 60;
                    hour = (allmin - min) / 60;
                    second = second > 9 ? second : "0" + second;
                    min = min > 9 ? min : "0" + min;
                    hour = hour > 9 ? hour : "0" + hour;
                    time.push(hour, min, second);
                    dom.find(".time").text(time.join(" : "));
                    c--;
                }, 1000)
            }
        },
        _control: function () {
            var c = this.config, that = this, $ = window.$, seleted = new Array(that.length), model = null, argu = [seleted, that];
            that.seleteall = c.spedata.Data.length == 1 && c.spedata.Data[0].SpecDetail.length == 0 ? true : false;
            $m.each(c.spedata.Data, function (m, n) {
                c.totalStock += parseInt(m.Stock);
            })
            that.data = that._view('', !!1);
            $(this.container).find('.'+c.content).delegate('a', 'click', argu, handler);
            $(window).bind('unload', function () { that = null; });
            function handler(e) {
                var o = $(this), map = $(o).attr('map'), id = parseInt(map.slice(0, 1)), s = argu[0], that = argu[1], unselete = c.spe[id + '']['map']['un'] && c.spe[id + '']['map']['un'][map + '-un'], items = $(that.container).find('dl'), diselement = items.find('a.' + c.disabled);
                if (o.hasClass(c.disabled)) {
                    return;
                }
                c.callback && c.callback.call(c, map, o);
                if (o.hasClass('hover')) {
                    o.removeClass('hover');
                    s[id] = 0;
                    diselement.removeClass(c.disabled);
                    //return;
                } else {
                    //$("#" + c.id + id).find('.dd a').removeClass('hover');
                    $("#" + c.id + that._index + "-" + id).find('li.item a').removeClass('hover');
                    o.addClass('hover');
                    s[id] = map;
                }
                for (var i = 0, len = s.length; i < len; i++) {
                    if (!s[i]) {
                        that.seleteall = false;
                        break;
                    } else {
                        that.seleteall = true;
                        continue;
                    }
                }
                diselement.removeClass(c.disabled);
                if (unselete && unselete.length) {
                    $m.each(unselete, function (m, n) {
                        items.each(function (i, j) {
                            if (i != id) {
                                //var o = $(this).find('.dd a');
                                var o = $(this).find('li.item a');
                                o.each(function () {
                                    var t = $(this);
                                    if (t.attr('map') == m.split('-')[0]) {
                                        t.hasClass('hover') && t.removeClass('hover');
                                        t.addClass(c.disabled);
                                    }
                                })
                            }
                        })
                    })
                } else {
                    items.each(function (i, j) {
                        var o = $(this).find('.dd a');
                        o.each(function () {
                            var t = $(this);
                            t.removeClass(c.disabled);
                        })
                    })
                }
                if (that.seleteall) {
                    model = that._model(s, c);
                    that.data = that._view(model);
                }
            }
        }
    })
    return spe
})

