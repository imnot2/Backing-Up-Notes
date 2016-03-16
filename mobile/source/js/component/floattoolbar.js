define(function (require, exports, module) {

    function toolbar(config) {
        if (!(this instanceof toolbar)) {
            return new toolbar($m.merge(options, config));
        }

        this.config = config;
        this.init()
    }

    $m.augment(toolbar, {

        //初始化
        init: function () {

            this.getshoppingcartcount(function () {
                this.template()
            })

        },

        //获取购物车数量并回调
        getshoppingcartcount: function (callback, isRefresh) {
            var that = this;
            if (isRefresh || this.cartcount == void 0) {
                $m.ajax({
                    url: this.config.shoppingcartcouturl,
                    type: "json",
                    method: "get",
                    success: function (data) {
                        if (data) {
                            that.cartcount = data.count > 99 ? "..." : data.count;
                            callback && callback.call(that);
                        }
                    }
                });
            } else {
                callback && callback.call(that);
            }

        },

        //HTML填充
        template: function () {

            var id = "___FloatToolBarContainer";

            var html = '';
            var config = this.config;

            if (config.type == 0) {
                html += '<div class="floatboardoflist"><a class="iconfont icon-simple-home" href="/"></a><a class="iconfont icon-simple-me" href="/usercenter/"></a><a class="iconfont icon-simple-cart" href="/shoppingcart/"><i>';
                html += this.cartcount;
                html += '</i></a><a class="iconfont icon-simple-backtop" href="javascript:window.scrollTo(0,0)"></a></div>';
            } else {
                html += '<div class="clearfix floatshoppingcart"><div class="fr right">';
                if (!config.hasStock) {
                    html += '<span class="button button-gray">已售完</span>';
                } else if (config.isFutureSell) {
                    html += '<span class="button button-gray">即将上架</span>';
                } else if (config.isoffsell) {
                    html += '<span class="button button-gray">已下架</span>';
                } else {
                    html += '<span class="button button-red" id="TobuyAtOnce">立即购买</span><span class="button button-yel" id="AddShoppingCart">加入购物车</span>'
                }

                html += '</div><a class="iconfont icon-simple-home" href="/"></a><a class="iconfont icon-simple-cart" href="/shoppingcart/"><i>'
                html += this.cartcount;
                html += '</i></a></div>';
            }

            var container = $m.node("#" + id);
            var div = document.createElement("div");
            div.setAttribute('id', id);

            if (container[0]) {
                container.html(html);
            } else {
                div.innerHTML = html;
                $m.node.append(document.body, div);
                div = null;
            }

            if (config.hasStock && !config.isoffsell) {
                this.controller()
            }

        },
        controller: function () {
            var config = this.config;

            $m.node('#TobuyAtOnce').bind('click', function () {
                if ($('#XloboBonded').val() == "True") {
                    $('#CanNotBuyAlert').show();
                    return false;
                }
                location.href = config.cartUrl + "#buy"
            })

            $m.node('#AddShoppingCart').bind('click', function () {
                if ($('#XloboBonded').val() == "True") {
                    $('#CanNotBuyAlert').show();
                    return false;
                }
                location.href = config.cartUrl
            })

        }


    })



    var options = {
        type: 0,
        canbuy: !0,
        isoffsell: !1,
        hasStock: !1,
        isFutureSell: !1,
        shoppingcartcouturl: "/ShoppingCart/ShoppingCartCount",
        cartUrl: ""
    }

    return toolbar;
})