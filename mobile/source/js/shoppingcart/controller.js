define(function (require, exports, module) {
    exports.index = function(html, data) {
        //基本信息
        //require("module/common")
        //data = $m.parseJSON(data);
        $m.mobile.insertContent(html, data);

        //全选商品
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
                        alert('选择无效，请重新选择');
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
                success: function(data) {
                    if(data.Success) {
                        RefreshPrices();
                        $m.node('.SellerCatalog' + sellerId + '.fuc-CanSelect').each(function () {
                            $m.node.attr(this, 'checked', selected);
                        });
                        RefreshCheckBox();
                    } else {
                        alert('选择无效，请重新选择');
                    }
                }
            });
        });

        //选择单个商品
        $m.event.bind($m.node('.fuc-CanSelect').items, 'click', function(e) {
            var selected = $m.node.attr(this, 'checked');
            var sellerId = $m.node.attr(this, 'sellerid');
            var catalogId = $m.node.attr(this, 'catalogid');
            $m.ajax({
                url: '/shoppingcart/changecatalogselected?s=' + sellerId + '&c=' + catalogId + '&selected='+selected,
                type: 'json',
                success: function (data) {
                    if (data.Success) {
                        RefreshPrices();
                        RefreshCheckBox();
                    } else {
                        alert('选择无效，请重新选择');
                    }
                }
            });
        });

        //展开某一个买手的商品
        $m.event.bind($m.node('.fuc-spread').items, 'click', function (e) {
            $m.node.toggleClass(this, 'icon-arrow-up', 'icon-arrow-down');
            $m.node.toggleClass($m.node.next(this.parentNode), 'current', '');
        });
        
        //修改商品数量
        $m.event.bind($m.node('.del').items, 'click', function(e) {
            var paras = $m.node.attr(this, 'data');
            var catalogId = $m.node.attr(this, 'catalogid');
            var that = this;
            $m.ajax({
                url: '/shoppingcart/changecartproductnum?' + paras,
                type: 'json',
                success: function (data) {
                    if (data.Success) {
                        var newNum = parseInt($m.node.attr($m.node.next(that), 'value')) - 1;
                        newNum = newNum < 0 ? 0 : newNum;

                        $m.node.attr($m.node.next(that), 'value', newNum);
                        var price = $m.node('#Price' + catalogId)[0];
                        price.innerHTML = data.ChangedPrice||0;
                        RefreshPrices();
                    }
                    else {
                        alert('数量修改出错：' + data.Msg);
                    }
                }
            });
        });
        $m.node('.add').bind('click', function(e) {
            var paras = $m.node.attr(this, 'data');
            var catalogId = $m.node.attr(this, 'catalogid');
            var that = this;
            $m.ajax({
                url: '/shoppingcart/changecartproductnum?' + paras,
                type: 'json',
                success: function (data) {
                    if (data.Success) {
                        var newNum = parseInt($m.node.attr($m.node.prev(that), 'value')) + 1;
                        $m.node.attr($m.node.prev(that), 'value', newNum);
                        var price = $m.node('#Price' + catalogId)[0];
                        price.innerHTML = data.ChangedPrice;
                        RefreshPrices();
                    }
                    else {
                        alert('数量修改出错：' + data.Msg);
                    }
                }
            });
        });
        //删除商品
        $m.event.bind($m.node('.fuc-delete').items, 'click', function(e) {
            var catalogIdWithToken = $m.node.attr(this, 'catalogidwithtoken');
            var catalogId = catalogIdWithToken.split('|')[0];
            var sellerId = $m.node.attr(this, 'sellerid');
            $m.ajax({
                url: '/shoppingcart/deletecatalogfromcart?c=' + catalogIdWithToken,
                type: 'json',
                success: function(data) {
                    if (data.Success) {
                        $m.node('.catalogItem' + catalogId)[0].parentNode.removeChild($m.node('.catalogItem' + catalogId)[0]);
                        if ($m.node('.catalogItemBuySeller' + sellerId).items.length == 0) {
                            $m.node('.buyerItem' + sellerId)[0].parentNode.removeChild($m.node('.buyerItem' + sellerId)[0]);
                        }
                        RefreshPrices();
                    } else {
                        alert("删除出错，请重新尝试");
                    }
                }
            });
        });
        $m.event.delegate($m.node('.address .as').items, 'click', function(e) {
            var areaCode = $m.node.attr(this, 'areaid');
            $m.node.attr($m.node('#AreaCode'), 'value', areaCode);
            $m.ajax({
                url: '/ShoppingCart/GetShoppingCartPrice?areaCode=' + areaCode + "&t=" + Math.random(),
                type: 'json',
                success: function(data) {
                    $m.node('#TotalPriceWithoutFlight')[0].innerHTML = data.TotalWithOutFreight;
                    $m.node('#TotalFlight')[0].innerHTML = data.Freight;
                    $m.node('#TotalPrice')[0].innerHTML = data.TotalWithFreight;
                }
            });
        });

        $m.event.bind($m.node('#fuc-Buy')[0], 'click', function (e) {
            if($m.node.attr($m.node('#Logined')[0],'value')!='true') {
                location.href = "/login?ret=" + location.href;
            }
            else {
                $m.ajax({
                    url: '/ShoppingCart/PayOrder?t=' + Math.random(),
                    type: 'json',
                    success:function (data) {
                        if(data.result) {
                            location.href = "/Purchase/";
                        }
                        else {
                            alert(data.errmsg);
                        }
                    }
                });
            }
        });

        //更新总价格区域
        function RefreshPrices() {
            $m.ajax({
                url: '/ShoppingCart/GetShoppingCartPrice?areaCode=' + $m.node.attr($m.node('#AreaCode')[0], 'value') + "&t=" + Math.random(),
                type: 'json',
                success: function (data) {
                    $m.node('#TotalPriceWithoutFlight')[0].innerHTML = data.TotalWithOutFreight;
                    $m.node('#TotalFlight')[0].innerHTML = data.Freight;
                    $m.node('#TotalPrice')[0].innerHTML = data.TotalWithFreight;
                }
            });
        }
        //更新checkbox选中状态
        function RefreshCheckBox() {
            var selectAll = true;
            $m.node('.fuc-CheckSeller').each(function() {
                var sellerId = $m.node.attr(this, 'data');
                var selectSeller = true;
                selectSeller = $m.node('.SellerCatalog' + sellerId + '.fuc-CanSelect').items.length == $m.node('.SellerCatalog' + sellerId + '.fuc-CanSelect:checked').items.length;
                if (selectSeller) {
                    $m.node.attr(this, 'checked', true);
                }
                selectAll = selectAll && selectSeller;
            });
            if(selectAll) {
                $m.node.attr($m.node('#fuc-SelectAll')[0], 'checked', true);
            }
        }
        //运费模板
        var transfer = require('ui/transferTemp');
        transfer.init({
            data: 'AreaInfo',
            handle: '#chinaTemplate'
        });


    };
})