define(function (require, exports, module) {
    function main(b, a) {
        if (!(this instanceof main)) return new main(b, $m.merge(config, a));
        this.container = $m.node(b);
        this.config = a;
        for (var i in a) {
            if (i.indexOf('Div') > -1) {
                this[i] = $m.node(a[i]);
            }
        } 
        this._init();
    }

    var _substring={
        byteLen: function (str) {
            var strlength=0,code;
            for (var a = 0, length = str.length; a < length; a++) {
                code = str.charCodeAt(a);
                strlength += code > 127 ? 2 : 1
            }
            return strlength
        },
        subStr: function (str, start, end) {
            var b = 0,
            resultbytes = 0,
            returnStr = "",
            length = str.length,
            bytes = this.byteLen(str);
            if (start < 0) start = bytes + start;
            if (end < 0 || !$m.isNumber(end)) end = ~ ~end + bytes;
            else end += start;
            for (; b < length; b++) {
                if (resultbytes >= start) break;
                bytes = str.charCodeAt(b);
                resultbytes += bytes > 127 ? 2 : 1
            }
            for (; b < length; b++) {
                bytes = str.charCodeAt(b);
                resultbytes += bytes > 127 ? 2 : 1;
                if (resultbytes > end) break;
                returnStr += str.charAt(b)
            }
            return returnStr
        }
    }

    var config = {
        hoverCls: 'selected',
        disabledCls: 'disabled',
        callback: null,
        activeDiv: '#productAction',
        stockNumberDiv: '#productStockNumber',
        priceDiv: '#productPrice',
        limitNumDiv: '.spelimit',
        FlightDiv: '.speflight',
        id: 'specification_',
        totalStock: 0,
        spedata: null
    };
    $m.augment(main, {
        _init: function () {
            if (this._verify() > 2) {
                this._parseJSON();
                this.config.realData && this._prepareHTML();
                this._control();
            }
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
                c.realData = c.realData || {};
                var realData = c.realData[n] = {}, u = '', randoms = [];
                realData.name = data.Spec[n];
                $m.each(data.Data, function (i, j) {
                    var datail = data.Data[j].SpecDetail, id = i.CatalogId;
                    that.length = datail.length
                    $m.each(datail, function (o, p) {
                        if (n == p) {
                            var sub = realData.sub = realData.sub || [], map = realData.map = realData.map || {};
                            !$m.inArray(o, sub) && sub.push(o);
                            u = that._unicode(n, o);
                            map[u] = map[u] || [];
                            map[u].push(id);
                        }
                    })
                })
            });
            arr = makeArray(c.realData);
            arr = compare(arr);
        },
        _prepareHTML: function () {
            var c = this.config, that = this, dl = [];
            $m.each(c.realData, function (m, n) {
                dl.push("<dl id='" + c.id + n + "' class='clearfix'><dt class='dt'>" + m.name + "：</dt><dd class='dd'>");
                $m.each(m.sub, function (i, j) {
                    var u = that._unicode(n, i),src,title;
                    if (i.indexOf("|") > 0) {
                        i = i.split('|');
                        if (i[0] != 'null') {
                            src = i[0];
                            src = src.replace('_t.', '_o.').replace('\/thumbnail\/', '\/original\/');
                            title = i[1];
                        } else {
                            title = i[1]
                        }
                    } else {
                        title = i;
                    }
                    src = src ? ('imgsrc="' + src + '" ') : '';
                    if(_substring.byteLen(title)>34){
                        title=_substring.subStr(title,0,34)+"..."
                    }
                    dl.push("<span class='item specificationhandle' " + src + "map='" + u + "'>" + title + "<i></i></span>");
                });
                dl.push("</dd></dl>");
            });
            if (dl.length > 0) {
                this.container.html(dl.join(""));
            }
        },
        _unicode: function (n, o) {
            o = o.indexOf("|") && o.split('|')[1] || o;
            return encodeURIComponent(n + o.slice());
        },
        _model: function (s, c) {
            var catalogid;
            var arr1 = c.realData['0'].map[s[0]], arr2 = c.realData['1'];
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
            var c = this.config, that = this, state = 1;
            if (model == undefined || model == "") {
                if (c.spedata.Data.length) {
                    for (var i = 0, len = c.spedata.Data.length; i < len; i++) {
                        this._verify(c.spedata.Data[i]);
                        if (this.state == 3) {
                            that._view(c.spedata.Data[i], b);
                            return c.spedata.Data[i];
                        } else {
                            continue;
                        }
                    }
                }
            } else {
                this.state != 3 && this._verify(model);
                b && this.stockNumberDiv.html(c.totalStock<=10?'仅剩：<span>'+c.totalStock+'</span>件&nbsp;&nbsp;':'') || this.stockNumberDiv.html(model.Stock<=10?'仅剩：<span>'+model.Stock+'</span>件&nbsp;&nbsp;':'');


                this.priceDiv.html(model.Price);
                
                if ($("#NextPromotionType").length > 0) {
                    var nextPromotionType = parseInt($("#NextPromotionType").val());
                    var nextPromotion = parseFloat($("#NextPromotion").val());
                    var promotionPrice = model.Price;
                    switch (nextPromotionType) {
                        case 1:
                            promotionPrice = model.Price * nextPromotion;
                            break;
                        case 2:
                            promotionPrice = model.Price - nextPromotion;
                            break;
                        case 3:
                            promotionPrice = nextPromotion;
                            break;
                    default:
                    }
                    $("#NextActivityPromotionPrice").html(parseInt(promotionPrice));
                }

                this.limitNumDiv.html("(限购:<span>"+parseInt(model.Limit - model.Bought)+"</span>件)");
                if (model.Limit == 0 || model.Limit == '0') {
                    this.limitNumDiv.hide();
                }
                this.FlightDiv.html(model.Flight);
                return model;
            }
        },
        _verify:function(model) {
            var c = this.config;
            if (!c.spedata.CanBuy) {
                //已经售完
                this.state = 1;
            } else if (c.spedata.IsOffSell) {
                this.state = 2;
            } else if (model && model.Stock > 0) {
                this.state = 3;
            } else if (model && model.Stock == 0) {
                this.state = 4;
            } else {
                this.state = 5;
            }
            this._show();
            return this.state;
        },
        _show: function () {
            var c = this.config.spedata.SecondsToOnSell, that = this;
            switch (this.state) {
                case 1:
                case 4:
                    //this.activeDiv.html('<div class="infotips">您查看的商品已经售完。</div>').show();
                    break;
                case 2:
                    //this.activeDiv.html('<div class="infotips">您查看的商品已经下架。</div>').show();
                    break;
                case 3:
                    if (c <= 0) {
                        //this.activeDiv.show();
                    } else {
                        //this.activeDiv.html('<div class="bar-a">商品即将上架：<span></span></div>').show();
                        countdown(c);
                    }
                    if (!(this.config.spedata.Data.length == 1 && this.config.spedata.Data[0].SpecDetail.length == 0)) {
                        this.container.show();
                    }
                    break;
                default:
                    break;
            }
            function countdown(c) {
                var timeout = null;
                this.activeDiv.show();
                timeout = setInterval(function () {
                    if (c == 0) {
                        clearInterval(timeout);
                        that.activeDiv.hide();
                        a.show(); b.hide();
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
                    that.activeDiv.html(time.join(" : "));
                    c--;
                }, 1000)
            }
        },
        _control: function () {
            var c = this.config, that = this, seleted = new Array(that.length), model = null;
            that.seleteall = c.spedata.Data.length == 1 && c.spedata.Data[0].SpecDetail.length == 0 ? true : false;;
            $m.each(c.spedata.Data, function (m, n) {
                c.totalStock += parseInt(m.Stock);
            })
            that.data = that._view('', !!1);
            var eventType = 'ontouchstart' in document ? "touchstart" : "click";
            $('.specificationhandle').live(eventType, handler);
            function handler(e) {
                e.preventDefault();
                var map = $m.node.attr(this, 'map'), id = parseInt(map.slice(0, 1)), s = seleted, unselete = c.realData[id]['map']['un'] && c.realData[id]['map']['un'][map + '-un'], items = that.container.find('dl'), diselement = items.find('span.' + c.disabledCls);
                if ($m.node.hasClass(this, c.disabledCls)) {
                    return !1;
                }
                var imgsrc = $m.node.attr(this, 'imgsrc');
                imgsrc&&$m.node('#specification_showimg').attr('src',imgsrc);
                
                if ($m.node.hasClass(this, c.hoverCls)) {
                    $m.node.removeClass(this, c.hoverCls);
                    s[id] = 0;
                    diselement.each(function (a,b) {
                        $m.node.removeClass(a,c.disabledCls);
                    })
                    return false;
                } else {
                    $m.node("#" + c.id + id).find('.dd span').each(function (a,b) {
                        $m.node.removeClass(a, c.hoverCls);
                    })
                    $m.node.addClass(this, c.hoverCls);
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
                diselement.each(function (a, b) {
                    $m.node.removeClass(a, c.disabledCls);
                })
                if (unselete && unselete.length) {
                    $m.each(unselete, function (m, n) {
                        items.each(function (i, j) {
                            if (i != id) {
                                $m.node(i).find('.dd span').each(function () {
                                    if ($m.node.attr(this,'map') == m.split('-')[0]) {
                                        $m.node.hasClass(this,c.hoverCls) && $m.node.removeClass(this,c.hoverCls);
                                        $m.node.addClass(this,c.disabledCls);
                                    }
                                })
                            }
                        })
                    })
                } else {
                    items.each(function (i, j) {
                        $m.node(this).find('.dd span').each(function (a,b) {
                            $m.node.removeClass(a,c.disabledCls);
                        })
                    })
                }
                if (that.seleteall) {
                    model = that._model(s, c);
                    that.data = that._view(model);
                }
                c.callback && c.callback.call(c, map, this);
                return false;
            }
        }
    })
    return main
})

