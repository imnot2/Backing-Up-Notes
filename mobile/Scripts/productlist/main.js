define(function (require, exports, module) {
    var c = require('productlist/controll');

    var substring = require("util/substring")

    $m.mobile.when('AllCategorys', {
        template: 'productlist/AllCategorys.html',
        controller: c.AllCategorys,
        data: ['AllCategorys'],
        config: {
            title: '所有分类'
        }
    })
    .when('filteredBrands/:c/:k/:b/:s/:p/:ish/:ism/:iss',
    {
        template: 'productlist/selectBrand.html',
        controller: c.filteredBrands,
        cache: !1,
        data: ['FilteredBrands'],
        config: {
            title: '选择品牌'
        }
    })
    .when('filter/:c/:k/:b/:s/:p/:ish/:ism/:iss',
    {
        template: 'productlist/filter.html',
        controller: c.filter,
        cache: !1,
        config: {
            title: '筛选'
        }
    });

    //过滤

    //$m.node('#sortOfProduct a').each(function () {
    //    var sort = $m.node.attr(this, 'sort');
    //    var url = location.href;
    //    var reg = /(?:-\w+)+/g;
    //    if (/(brand|products)/.test(url)) {
    //        if (reg.test(url)) {
    //            url = url.replace(reg, '-s' + sort);
    //        } else {
    //            url = url.replace(/(brand|products)/, function (a, b) {
    //                return b + '-s' + sort;
    //            })
    //        }
    //    } else {
    //        url = url.replace(reg, '-s' + sort);
    //    }
    //    $m.node.attr(this,'href', url);
    //})

    //$m.node('.rate-number a').each(function () {
    //    var page = $m.node.attr(this, 'index');
    //    var url = location.href;
    //    var reg = /(?:-p\d)+/g;
    //    if (/(brand|products)/.test(url)) {
    //        if (reg.test(url)) {
    //            url = url.replace(reg, '-p' + page);
    //        } else {
    //            url = url.replace(/(brand|products)/, function (a, b) {
    //                return b + '-p' + page;
    //            })
    //        }
    //    } else {
    //        url = url.replace(reg, '-p' + page);
    //    }
    //    $m.node.attr(this, 'href', url);
    //})

    require('search/index');

    //浮动工具条
    var toobar=require("component/floattoolbar");

    toobar({
        type:0
    });

    //图片懒加载
    if ($m.node('#productlist').length > 0) {
        var lazyimg = require('util/imglazyload');
        lazyimg('#productlist');
    }

    //过滤类型模板数据
    var fiterData = {}, kf = $m.node('#KeywordField').val(), cfinit, cf, bfinit, bf, heads, content;
    secondCategory = $m.node('#SecondCategoryField').val();
    firstCategory = $m.node('#FirstCategoryField').val();
    cf = $m.node('#CategoryField').val() || secondCategory || firstCategory;
    bf = $m.node('#BrandField').val();
    fiterData.isFromSearch = kf ? !0 : !1;
    cfinit = fiterData.selectedCategoryId = cf ? cf : !1;
    bfinit = fiterData.selectedBrandId = bf ? bf : !1;

    fiterData.categoryName = $m.node('#CategoryField').attr('name');
    fiterData.brandName = $m.node('#BrandField').attr('name');

    fiterData.isOnlyCategory = fiterData.selectedCategoryId && !fiterData.selectedBrandId;
    fiterData.isOnlyBrand = fiterData.selectedBrandId && !fiterData.selectedCategoryId;
    fiterData.isCategoryBrand = fiterData.selectedBrandId && fiterData.selectedCategoryId;
    fiterData.isMall = $m.node('#IsMallField').val();
    fiterData.isProtected = $m.node('#IsProtectedField').val();
    fiterData.sort = $m.node('#SortField').val();

    function RenderTemplate(id,data) {
        $m.template({
            container: content,
            html: $m.node(id).html(),
            data: data
        });
    }

    require('ui/sideslide')({
        trigger: '#filterButton',
        beforeshow: function () {
            //填充内容
            content = this.content[0];

            RenderTemplate('#FilterTypeTemplate',fiterData)

            //根据三级分类过滤品牌
            if (fiterData.isOnlyCategory) {
                filterBrandByCategoryId(cf, function (data) {
                    parseBrandAndBindSelect(data);
                });
            }
            

            //获取三级分类的父级下所有三级分类


            //根据品牌获取所有三级分类
            if (fiterData.isOnlyBrand) {
                GetCategoriesByBrandId(bf, function (data) {
                    data.BrandId = bf;
                    $m.event.delegate('.FromCategory', 'click', function () {

                        RenderTemplate('#FilterCategoryTemplate', $m.mix(data, fiterData));
                        bindCategorySelectEvent();
                    });

                });
            }

            //当categoryId和brandid都存在的情况下的过滤
            if (fiterData.isCategoryBrand) {

                //根据三级categoryId获取所有所在一级下的二级分类
                GetAllSecondCategories(cf, function (data) {
                    data.BrandId = bf;
                    $m.event.delegate('.FromCategory', 'click', function () {

                        RenderTemplate('#FilterCategoryTemplate', $m.mix(data, fiterData));

                        bindCategorySelectEvent();
                    });


                    filterBrandByCategoryId(cf, function (data) {
                        parseBrandAndBindSelect(data);
                    });

                });
            }


            //有搜索关键字的时候
            if (fiterData.isFromSearch) {
                filterCategory(kf, fiterData.selectedBrandId ? bf : null, fiterData.sort || null, fiterData.isProtected ? 1 : null, fiterData.isMall ? 1 : null, null, function (data) {
                    //获取分类
                    $(document).on('click','.FromCategory', function () {

                        
                        RenderTemplate('#FilterCategoryArrayTemplate', $m.mix(data, fiterData));

                        bindCategorySelectEvent();
                    });
                    
                })
            }
        }
    });

    function bindCategorySelectEvent() {
        var heads = $m.node('.allCategorys .hd').items;

        var selected = $m.node('.Selected');
        selected.length == 1 && (selected[0].parentNode.parentNode.style.display = "block");

        $m.event.bind(heads, 'click', function (e) {
            var style, childnode;
            for (var i = 0, len = heads.length; i < len; i++) {
                style = $m.node.next(heads[i]).style;
                childnode = $m.node('.icon-arrow-up', heads[i]);
                if (heads[i] == e.currentTarget) {
                    if (style.display == "block") {
                        style.display = "none";
                        childnode.removeClass('icon-arrow-down');
                    } else {
                        style.display = "block";
                        childnode.addClass('icon-arrow-down');
                    }
                    //style.display == "block" ? style.display = "none" : style.display = "block";
                    
                } else {
                    style.display = "none"
                    childnode.removeClass('icon-arrow-down');
                   
                }
            }
        });

        $m.node('.SecondList dd[customid]').bind('click', function () {
            var html = $m.node(this).find("label").html();
            var id = $m.node.attr(this, 'customId');
            if (id != "all") {
                fiterData.selectedCategoryId = cf = id;
                fiterData.selectedBrandId = !1;
                fiterData.brandName = '';
                fiterData.categoryName = substring.byteLen(html) > 15 ? substring.subStr(html, 0, 15) + ".." : html;
            } else {
                fiterData.selectedCategoryId = !1;
                fiterData.categoryName = '';
            }

            RenderTemplate('#FilterTypeTemplate', fiterData)

            filterBrandByCategoryId(cf, function (data) {
                parseBrandAndBindSelect(data);
            });

        });

    }

    //把品牌并按照字母排序，并填充模板
    function parseBrandAndBindSelect(data) {
        var datas = {
            letters: [],
            brands: []
        };
        //datas.categoryid = cf;

        $m.each(data, function (d, i) {
            var l = d.KeyWord;
            if (!$m.inArray(l, datas.letters)) {
                datas.letters.push(l);
                datas.brands[datas.brands.length] = [];
            }
            datas.brands[datas.brands.length - 1].push(d);
        });

        $(document).on('click','.FromBrand',  function () {

            RenderTemplate('#FilterBrandTemplate', $m.mix(datas, fiterData))

            $m.node('.SecondList dd[customid]').bind('click', function () {
                var html = $m.node.attr(this, 'bname');
                var id = $m.node.attr(this, 'customId');
                if (id != "all") {
                    fiterData.selectedBrandId = bf = $m.node.attr(this, 'customId');
                    fiterData.brandName = substring.byteLen(html) > 15 ? substring.subStr(html, 0, 15) + ".." : html;
                } else {
                    fiterData.selectedBrandId = !1;
                    fiterData.brandName = "";
                }
                
                RenderTemplate('#FilterTypeTemplate', fiterData);
            });
        });
    }

    function filterBrandByCategoryId(categoryid, callback) {
        $m.ajax({
            type: 'json',
            url: '/productlist/brandlist?c=' + cf,
            success: function (data) {
                callback(data);
            }
        })
    }
    
    function GetCategoriesByBrandId(brandid, callback) {
        $m.ajax({
            type: 'json',
            url: '/productlist/GetCategoriesByBrandId?b=' + brandid,
            success: function (data) {
                callback(data);
            }
        })
    }

    function GetAllSecondCategories(categoryId,callback) {
        $m.ajax({
            type: 'json',
            url: '/productlist/GetAllSecondCategories?c=' + categoryId,
            success: function (data) {
                callback(data);
            }
        })
    }

    function filterCategory(keyword, brandid, sort, isprotected, ismall, isseller, callback) {
        var uri = [], args = Array.prototype.slice.call(arguments, 0, arguments.length-1), params = ['k', 'b', 's', 'ish', 'ism', 'iss'];
        $m.each(args, function (d,i) {
            if (d) {
                uri.push(params[i] + '=' + d);
            }
        })

        $m.ajax({
            type: 'json',
            url: '/productlist/FilteredCategorys?' + uri.join('&'),
            success: function (data) {
                callback(data);
            }
        })
    }

    //事件绑定

    //过滤商家
    $m.event.delegate('#cb1', 'click', function () {
        fiterData.isMall = $m.node(this).val();
    })

    //过滤护航商品
    $m.event.delegate('#cb2', 'click', function () {
        fiterData.isProtected = $m.node(this).val();
    })

    $m.event.delegate('#submitFilter', 'click', function () {
        var uri = [];
        if (fiterData.isFromSearch) {
            uri.push('k=' + kf);
        }
        if (fiterData.selectedCategoryId || cfinit) {
            if (cf == secondCategory) {
                uri.push('sc=' + cf);
            } else {
                uri.push('c=' + cf);
            }
            
        }
        if (fiterData.selectedBrandId||bfinit) {
            uri.push('b=' + bf);
        }
        if (fiterData.isMall) {
            uri.push('ism=1')
        }
        if (fiterData.isProtected) {
            uri.push('ish=1')
        }
        if (fiterData.sort) {
            uri.push('s=' + fiterData.sort);
        }
        if (uri.length > 0) {
            var newUrl = "";
            $m.ajax({
                type: 'json',
                url: "/ProductList/ProductsListUrl?" + uri.join('&'),
                success: function(data) {
                    newUrl = data.url;
                    location.href = newUrl;
                }
            });
        } else {
            location.href = "/products";
        }
        
        return !1
    })

});