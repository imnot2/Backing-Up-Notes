define(function (require, exports, module) {
    var layer = require('widget/layerbox')
    $m.event.bind($m.node('#fuc-SelectAll')[0], 'click', function (e) {
        var selectedAll = $m.node.attr(this, 'checked');
        $m.ajax({
            url: '/shoppingcart/ChangeAll?selected=' + selectedAll,
            type: 'json',
            success: function (data) {
                if (data) {
                    RefreshPrices();
                    $m.node('.fuc-CanSelect').each(function () {
                        $m.node.attr(this, 'checked', selectedAll);
                    });
                    $m.node('.fuc-CheckSeller').each(function () {
                        $m.node.attr(this, 'checked', selectedAll);
                    });
                } else {
                    layer.alert('选择无效，请重新选择');
                }
            }
        });
    });

    //选择某个买手的商品
    $m.event.bind($m.node('.fuc-CheckSeller').items, 'click', function (e) {
        var sellerId = $m.node.attr(this, 'data');
        var selected = $m.node.attr(this, 'checked');
        //接口中的报价参数无效
        $m.ajax({
            url: '/shoppingcart/changecatalogallselected?s=' + sellerId + '&c=abc&selected=' + selected,
            type: 'json',
            success: function (data) {
                if (data.Success) {
                    RefreshPrices();
                    $m.node('.SellerCatalog' + sellerId + '.fuc-CanSelect').each(function () {
                        $m.node.attr(this, 'checked', selected);
                    });
                    RefreshCheckBox();
                } else {
                    layer.alert('选择无效，请重新选择');
                }
            }
        });
    });

    //选择单个商品
    $m.event.bind($m.node('.fuc-CanSelect').items, 'click', function (e) {
        var selected = $m.node.attr(this, 'checked');
        var sellerId = $m.node.attr(this, 'sellerid');
        var catalogId = $m.node.attr(this, 'catalogid');
        var cartId = $m.node.attr(this, 'cartid');
        $m.ajax({
            url: '/shoppingcart/changecartselectedbyid?c=' + cartId + '&selected=' + selected,
            type: 'json',
            success: function (data) {
                if (data.Success) {
                    RefreshPrices();
                    RefreshCheckBox();
                } else {
                    layer.alert('选择无效，请重新选择');
                }
            }
        });
    });

    //展开某一个买手的商品
    $m.event.bind($m.node('.fuc-spread').items, 'click', function (e) {
        $m.node.toggleClass(this, 'icon-arrow-up', 'icon-arrow-down');
        $m.node.toggleClass($m.node.next(this.parentNode), 'current', '');
    });
    var isLoad = false;
    //修改商品数量
    $(".mod-number").click(function (event) {
        if (!isLoad) {
            var target = event.srcElement || event.target,
                target = $(target),
                input = $(this).find("input");
            if (target.hasClass("add")) {
                input.triggerHandler("change", {
                    num: 1
                });
            } else if (target.hasClass("del")) {
                input.triggerHandler("change", {
                    num: -1
                });
            }
        }

    })

    function tofix(number) {
        if (typeof number == "number") {
            if (/\.\d{3,}$/.test(number + "")) {
                return Number.prototype.toFixed.call(number, 2)
            }
            return number;
        }
        return 0
    }

    $(".mod-number input").on("change", function (event, data) {
        var self = $(this),
            catalogId = self.attr("data-catalogid"),
            params = self.attr("data-params"),
            cartid = self.attr("data-cartid"),
            unitprice = self.attr("data-unitprice"),
            num = data && data.num;
        if (!num) {
            num = self.val();
            //var oldVal = self.attr("data-old-value"),
            //    val = self.val();
            //if (oldVal < val) {
            //    num = 1;
            //} else {
            //    num = -1;
            //}
            //self.attr("data-old-value", val);
        }
        var val = parseInt(self.val()) + num;
        if (val < 1) {
            return;
        }
        isLoad = true;
        $.ajax({
            url: '/shoppingcart/ChangeCartNumById?c=' + cartid + "&num=" + val + "&up=" + unitprice,
            dataType: 'json',
            complete: function () {
                isLoad = false;
            },
            success: function (data) {
                if (data) {
                    if (/true/i.test(data.Success)) {
                        $('#Price' + catalogId).text(tofix(data.ChangedPrice));
                        //因为接口缺陷，并且没有将请求放到请求队列中，所以需要双重判断
                        val = parseInt(self.val()) + num;
                        if (val < 1) {
                            return;
                        }
                        self.val(val);
                        RefreshPrices();
                    } else {
                        layer.alert('数量修改出错：' + data.Msg);
                    }
                } else {
                    layer.alert('数据加载错误');
                }
            }
        });
    });
    //删除商品
    $m.event.bind($m.node('.fuc-delete').items, 'click', function (e) {
        var catalogIdWithToken = $m.node.attr(this, 'catalogidwithtoken');
        var catalogId = catalogIdWithToken.split('|')[0];
        var sellerId = $m.node.attr(this, 'sellerid');
        var cartid = $m.node.attr(this, 'cartid');
        var sellerProductNumSpan = $(this).closest('li.buyerItem' + sellerId).find('span.SellerProductNum');
        var sellerProductNum = $(sellerProductNumSpan).html();
        $m.ajax({
            url: '/shoppingcart/deletecartbyid?cartId=' + cartid,
            type: 'json',
            success: function (data) {
                if (data.Success) {
                    $m.node('.catalogItem' + catalogId)[0].parentNode.removeChild($m.node('.catalogItem' + catalogId)[0]);
                    if ($m.node('.catalogItemBuySeller' + sellerId).items.length == 0) {
                        $m.node('.buyerItem' + sellerId)[0].parentNode.removeChild($m.node('.buyerItem' + sellerId)[0]);
                    }
                    RefreshPrices();
                    RefreshNum();
                    $(sellerProductNumSpan).html(sellerProductNum - 1);
                } else {
                    layer.alert("删除出错，请重新尝试");
                }
            }
        });
    });
    $('.address .as').live('click', function () {
        var areaCode = $(this).attr('areaid');
        var areaName = $(this).html();
        $('#AreaCode').val(areaCode);
        $.ajax({
            url: '/ShoppingCart/GetShoppingCartPrice?areaCode=' + areaCode + "&t=" + Math.random(),
            type: 'json',
            success: function (data) {
                $m.node('#TotalPriceWithoutFlight')[0].innerHTML = tofix(data.TotalWithOutFreight);
                $m.node('#TotalFlight')[0].innerHTML = data.Freight;
                $m.node('#TotalPrice')[0].innerHTML = tofix(data.TotalWithFreight);
                $('#chinaTemplate').html(areaName);
                $('#floatAddress span.btn-close').click();
            }
        });
    });

    $m.event.bind($m.node('#fuc-Buy')[0], 'click', function (e) {
        if (document.getElementById("Logined").value == "False") {
            location.href = "/login?ret=" + location.href;
        } else {
            if ($('.XloboBonded:checked').length > 0) {
                var xloboBondedName = "";
                $('.XloboBonded:checked').each(function () {
                    xloboBondedName += ($(this).val() + ";");
                });
                var subCount = xloboBondedName.length > 20 ? 20 : xloboBondedName.length - 1;
                $('#XloboBondedPorudctNames').html(xloboBondedName.substring(0, subCount));
                $('#CanNotPayAlert').show();
            } else {
                $m.ajax({
                    url: '/ShoppingCart/PayOrder?t=' + Math.random(),
                    type: 'json',
                    success: function (data) {
                        if (data.result) {
                            location.href = "/Purchase/";
                        } else {
                            if (data.errcode == 6) {
                                layer.alert("你购买的商品超出【" + data.errmsg.title + "】限购数量，请调整后购买。");
                            } else {
                                layer.alert(data.errmsg);
                            }
                        }
                    }
                });
            }
        }
    });

    $("#ReSelect").click(function () {
        $('#CanNotPayAlert').hide();
    });

    $("#BackToHome").click(function () {
        location.href = "/";
    });

    //更新总价格区域
    function RefreshPrices() {
        $m.ajax({
            url: '/ShoppingCart/GetShoppingCartPrice?areaCode=' + $m.node.attr($m.node('#AreaCode')[0], 'value') + "&t=" + Math.random(),
            type: 'json',
            success: function (data) {
                $m.node('#TotalPriceWithoutFlight')[0].innerHTML = tofix(data.TotalWithOutFreight);
                $m.node('#TotalFlight')[0].innerHTML = data.Freight;
                $m.node('#TotalPrice')[0].innerHTML = tofix(data.TotalWithFreight);
            }
        });
    }
    //更新数量
    function RefreshNum() {
        $m.ajax({
            url: '/ShoppingCart/GetShoppingCartNum',
            type: 'json',
            success: function (data) {
                $m.node('span.num')[0].innerHTML = data.Num;
            }
        });
    }
    //更新checkbox选中状态
    function RefreshCheckBox() {
        var selectAll = true;
        $m.node('.fuc-CheckSeller').each(function () {
            var sellerId = $m.node.attr(this, 'data');
            var selectSeller = true;
            selectSeller = $m.node('.SellerCatalog' + sellerId + '.fuc-CanSelect').items.length == $m.node('.SellerCatalog' + sellerId + '.fuc-CanSelect:checked').items.length;
            if (selectSeller) {
                $m.node.attr(this, 'checked', true);
            }
            selectAll = selectAll && selectSeller;
        });
        if (selectAll) {
            $m.node.attr($m.node('#fuc-SelectAll')[0], 'checked', true);
        }
    }
    //运费模板
    var transfer = require('ui/transferTemp');
    transfer.init({
        data: 'AreaInfo',
        handle: '#chinaTemplate'
    })
    //.defaultWish({ redirect: 'index', app: c });
})