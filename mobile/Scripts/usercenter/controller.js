define(function (require, exports, module) {
    exports.index = function (html, data) {
        if (!data.Logined) {
            location.href = "/login?ret=" + $m.parseHost(location.href)[0] + 'usercenter/';
            return;
        }
        $m.mobile.insertContent(html, data);

        $m.mobile.route('recentorder');
        var listTemp = '<ul class="panel" temp-data="listData"><for e="list in listData"><li class="item"><a class="lk-img"  href="/product/${list.ProductId}.html"><img src="${list.PicUrl}" class="img" title="" alt=""></a><div class="info"><span class="mt-price-20"><i>¥</i><b>${list.Price||list.CatalogPriceForShow}</b></span></div></li></for></ul>';

        //浏览过的商品
        $m.ajax({
            type: 'json',
            url: 'ViewedProducts',
            cache:!1,
            success: function (data) {
                if (data && data.length > 0) {
                    $m.template({ container: '#browsed', html: listTemp, data: data });
                    $m.node('#browsedContainer').show()
                }
            }
        });

        //我的收藏
        $m.ajax({
            type: 'json',
            url: 'CollectedProducts',
            cache:!1,
            success: function (data) {
                if (data.Products.length > 0) {

                    $m.template({ container: '#myCollected', html: listTemp, data: data.Products });
                    $m.node('#myCollectedContainer').show()
                }
            }
        });

    }
    exports.recentOrder = function (html, data) {
        

        
    }
})