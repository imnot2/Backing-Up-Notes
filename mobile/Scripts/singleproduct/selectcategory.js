define(function (require, exports, module) {
    console.log(0)
    var layer = require('widget/layerbox');
    var category=require('ui/specification');

    exports.addShoppingCart = function (model, bool) {
        console.log(3)
        //checkVip();
        if (!model.seleteall) {
            layer.alert("请选择完整规格", {isIntensity:!0});
            return;
        }

        var o = model.data;
        var b = {
            catalogId: o.CatalogId,
            flight: o.Flight.split(",").join(""),
            quotePrice: o.Price.split(",").join(""),
            buyCount: $m.node("#txtNum")[0].value,
            productName: $m.node('#ProductName').val(),
            seller: $m.node('#SellerName').val(),
            sellerId: $m.node('#UserId').val(),
            toString: function () {
                var s = this.catalogId + ':' + this.productName + ':';
                s = s + o.SpecDetail_P.join('$');
                return this.quotePrice + "," + this.flight + "," + this.buyCount + "," + this.seller + "," + this.sellerId + "," + s;
            }
        };
        var cc = encodeURIComponent(b.toString());
        var path = "";
        //if ($m.isAlpha) {
        //    path = "http://www.alpha.ymatou.com";
        //}
        //if ($m.isBeta) {
        //    path = "http://www.beta.ymatou.com";
        //}
        //if ($m.isOnline) {
        //    path = "http://www.ymatou.com";
        //}
        var url = path + '/shoppingCart/AddCatalogToCartFromWep?c=';
        $m.ajax({
            url: '/singleproduct/AddToCart?c=' + cc,
            type: 'json',
            success: function (m) {
                if (m.result == "true") {
                    bool ? window.location.href = path + "/shoppingcart/?=" + Math.random() : layer.alert('成功加到购物车',{
                        closeTime:2,
                        callback:function(){
                            location.href="/product/"+___productId+".html"
                        }
                    });
                }
                else {
                    if (m.message != "") {
                        layer.alert(m.message);
                    } else {
                        layer.alert("添加到购物车失败，请选择规格并填写正确的数量！", { isIntensity: !0 });
                    }
                }
            }
        });
    };

    $m.ajax({
        url:"/singleproduct/Catalogs?pid="+___productId,
        success:function(data){
            var spedata=category('#Specification', {
                spedata: data,
                //activeDiv: '#productAction',
                stockNumberDiv: '#productStockNumber',
                priceDiv: '#productPrice',
                limitNumDiv: '#limitNumNumber',
                FlightDiv: '.speflight',
                id: 'specification_',
                callback:function(){
                    checkLimit(textNumber)
                }
            });

            if (spedata.state === 3 || spedata.state == 5) {
                //加减
                var textNumber = $m.node("#txtNum")[0];
                $m.event.bind($m.node("#widget-amount .add")[0], 'click', function () {
                    var num = parseInt(textNumber.value);
                    num++;
                    textNumber.value = num;
                    checkLimit(textNumber)
                    return false;
                });
                $m.event.bind($m.node("#widget-amount .del")[0], 'click', function () {
                    var num = parseInt(textNumber.value);
                    num--;
                    textNumber.value = num < 1 ? 1 : num;
                    checkLimit(textNumber);
                    return false;
                });
                function checkLimit(that) {
                    var a = Math.abs(parseInt(that.value)) || 1, lm = spedata.data.Limit, store = spedata.data.Stock,str="";

                    if(lm){
                        if(a>Math.min(lm,store)){
                            str="您仅可购买"+lm+"件";
                            a=Math.min(lm,store)
                        }
                    }else{
                        if(a>store){
                            str="您仅可购买"+store+"件";
                            a=store;
                        }
                    }
                    that.value = a;
                    !!str&&layer.alert(str);
                    
                }
                $m.event.bind(textNumber, 'change', function () {
                    checkLimit(this);
                });

                $m.node('#AddShoppingCart').bind('click', function () {
                    if(location.hash.indexOf("buy")>0){
                        exports.addShoppingCart(spedata, 1);
                    }else{
                        exports.addShoppingCart(spedata, 0);
                    }
                    return !1;
                })

                //价格排序
                function bubbleSort(array, fn, price) {
                    for (var i = 0; i < array.length; i++) {
                        for (var j = array.length - 1; j > 0; j--) {
                            if (fn(array[j][price], array[j - 1][price])) {
                                var temp = array[j - 1];
                                array[j - 1] = array[j];
                                array[j] = temp;
                            }
                        }
                    }
                    return array;
                }

                function sort(a, b) {
                    a = parseFloat(a.split(",").join(""));
                    b = parseFloat(b.split(",").join(""));
                    return a < b;
                }
                var datasort = [], priceElem = $m.node("#productPrice");
                datasort = bubbleSort(data.Data, sort, "Price");
                if (datasort.length > 0 && datasort[0].Price == datasort[datasort.length - 1].Price) {
                    priceElem.html(datasort[0].Price)
                } else if (datasort.length > 1) {
                    priceElem.html(datasort[0].Price + "&nbsp;~&nbsp;<i>&yen;</i>" + datasort[datasort.length - 1].Price);
                }
            }



        }
    });  
    
    
	
})