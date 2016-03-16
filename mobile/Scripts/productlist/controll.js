define(function (require, exports, module) {
    exports.navigatorStr = '';
    exports.selectedCategory = '';
    exports.selectedBrand = '';
    exports.searchEventBind = function () {
        $m.event.bind($m.node('#btn-search')[0], 'click', function () {
            var s = $m.node('#searchInput')[0].value;
            if (s) {
                var str = ['r=' + parseInt(Math.random() * 10e3)], hasKey = !1;
                var hrefstr = location.href.replace(/(\w+)=[^\/&=]+(?=[\/&]|$)/ig, function (a, b) {
                    if (b == 'r') {
                        a = '';
                    }
                    if (b == 'k') {
                        hasKey = !0;
                        a = 'k=' + encodeURIComponent(s);
                    }
                    a && str.push(a);
                    return a;
                });
                str = str.join('/');
                $m.mobile.toURL(hasKey ? str : str + '/k=' + s);
            }
        })
    }
    exports.index = function () {

        //筛选
        var PARAM = $m.toParameter(param);
        var paramstr = PARAM.slice(1).replace('&', '/');
        $m.node.attr($m.node('#filterProduct')[0], 'href', 'filter/' + paramstr);
        
        if (!this.navigatorStr) {
            $m.node('#navigator').html('<a href="/productlist/#AllCategorys">全部分类</a>')
        } else {
            $m.node('#navigator').html(this.navigatorStr);
        }
        this.searchEventBind()

        //搜索
        
        
        
        //分页
        var pele = $m.node("#prevpage")[0], nele = $m.node("#nextpage")[0], prev,next;
        var p = $m.node.attr(pele, "href"), n = $m.node.attr(nele, "href"), i, ps = [], str;
        param.p = parseInt(param.p) ? parseInt(param.p) : 1;
        prev = parseInt(param.p);
        next = prev + 1 > parseInt(data.TotalCount) ? $m.node("#nextpage").hide() : prev + 1;
        prev = prev - 1 == 0 ? $m.node("#prevpage").hide() : prev;
        
        for (var i in param) {
            if (i != 'p') {
                ps.push(i + "=" + param[i]);
            }
        }
        str = ps.join('&');
        p = "p=" + prev + "&" + str;
        n = "p=" + next + "&" + str;
        $m.node.attr(pele, 'href', p);
        $m.node.attr(nele, 'href', n);

        $m.node("#currentpage")[0].innerHTML = param.p;
        //排序
        var us = [];
        for (var j in param) {
            if (j != 's') {
                us.push(j + "=" + param[j]);
            }
        }
        var href = us.join("&") + '&s=';
        $m.node('#sortOfProduct span').each(function (a, b) {
            var url = href;
            switch (b) {
                case 0:
                    url = url + 9;
                    break;
                case 1:
                    if (!param.s || param.s == 4)
                        url = url + 1;
                    else
                        url = url + 4;
                    break;
                case 2:
                    url = url + 2;
                    break;
                case 3:
                    url = url + 5;
                    break;
                case 4:
                    url = url + 1;
                    break;
                default:
                    url = url + 9;
                    break;
            }
            $m.event.bind(a, 'click', function () {
                $m.mobile.route(url);
                return false;
            })
        });
    };
    exports.AllCategorys = function (html, data) {
        //data = $m.parseJSON(data)
        //console.log(data);
        $m.mobile.insertContent(html, data);
        
    };
    exports.filter = function (param, html) {
        $m.mobile.insertContent(html, {
            param: $m.toParameter(param).slice(1).replace('&', '/')
        });
    }
    exports.filteredBrands = function (param, html, data) {
        data.param = $m.toParameter(param).slice(1).replace('&', '/');
        $m.mobile.insertContent(html, data);
        $m.deferred.when(
            $m.ajax({
                url: location.origin + '/template/productlist/hotBrand.html',
                type: 'html'
            }),
            $m.ajax({
                url: 'UsualBrands?c=' + param.c,
                type: 'json'
            })
        ).success(function (html, d) {//morebrand
            d.param = data.param;
            $m.template({ html: html, data: d, container: '#hotBrands' });
            $m.node('.mod-secondlist dd').bind('click', function () {
                //美容护肤男士护理
                exports.selectedBrand = $m.node.attr(this, 'title');
                exports.navigatorStr = '<span>' + exports.selectedCategory + '</span><i>></i><span>' + exports.selectedBrand + '</span>';
            })
        })
    }
})