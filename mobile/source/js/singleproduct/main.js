define(function (require, exports, module) {
    var c = require('singleproduct/controller');

    $m.mobile.when('sellerInfo/:sid', {
        template: 'singleproduct/sellerInfo.html',
        controller: c.SellerInfo,
        data: ['/singleproduct/SellerInfo'],
        isInit: !0
    })
        .defaultWish({
            app: c
        });

    c.index()

    var promo = require("common/promo");
    $("#J-promo").each(function () {
        promo($(this))
    })


    //procduct status

    var __productid = $m.node("#productIdField").val();

    var toobar = require("component/floattoolbar");

    if (__productid) {
        $m.ajax({
            url: "/singleproduct/Catalogs?pid=" + $m.node("#productIdField").val(),
            success: function (data) {
                console.log(data)
                toobar({
                    type: 1,
                    isoffsell: data.IsOffSell,
                    hasStock: data.CanBuy,
                    isFutureSell: data.SecondsToOnSell > 0,
                    cartUrl: "/product/selectcatalog/" + __productid
                });


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
                var datasort = [],
                    priceElem = $m.node("#productPrice");
                datasort = bubbleSort(data.Data, sort, "Price");
                if (datasort.length > 0 && datasort[0].Price == datasort[datasort.length - 1].Price) {
                    priceElem.html(datasort[0].Price)
                } else if (datasort.length > 1) {
                    priceElem.html(datasort[0].Price + "&nbsp;&nbsp;~&nbsp;&nbsp;<i>&yen;</i>" + datasort[datasort.length - 1].Price);
                }


            }
        })

    }
    $('#CancelBuy').click(function () {
        $('#CanNotBuyAlert').hide();
    });
    $('#BackToHome').click(function () {
        location.href = "/";
    });
})