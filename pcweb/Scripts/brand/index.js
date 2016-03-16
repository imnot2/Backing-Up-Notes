/*=======================index.js===========================*/
j$(function () {
    j$(".rdMore").nextAll().hide(0);
    j$(".rdMore").click(function () {
        if (j$(this).hasClass("rdMoreEx")) {
            j$(this).removeClass("rdMoreEx").text("更多");
            j$(this).nextAll().hide(0);
        } else {
            j$(this).addClass("rdMoreEx").text("收起");
            j$(this).nextAll().fadeIn(300);
        }
    });

    var tval;
    var ashow = j$("a#showall");
    var spn = j$("span#bdes");
    var btxt = spn.text();
    var lgh = btxt.length;
    var stxt = btxt.substring(0, 200);
    if (lgh > 200) {
        spn.text(stxt);
        ashow.show();
        ashow.toggle(function () { spn.text(btxt); ashow.text("（收起）"); }, function () { spn.text(stxt); ashow.text("（显示全部）"); });
    }

    j$("span#filter a.in_bk").each(function () {
        var t = j$(this);
        t.click(function () {
            var v = t.find("span").text();
            if (v > 0) {
                var url = t.attr("href");
                j$.get(url, function (data) {
                    var ul = t.parent().next("ul.s_list").first();
                    ul.replaceWith(data);
                    t.parent().children("a.in_bk").removeClass("sel");
                    t.addClass("sel");
                });
            }

            return false;
        });
    });
    InitBrandAgentProductList();
    InitBrandSpotProductList();
});
function InitBrandAgentProductList() {
    j$('#divBrandAgentProductList #filter a.buttonFilterCategory').each(function () {
        j$(this).click(function () {
            var categoryId = j$(this).attr('id');
            var brandId = j$('#CurrentBrandId').val();
            j$.post('/Brand/BrandAgentProduct', j$.toJSON({ 'b': brandId, 'c': categoryId }), function (data) {
                j$('#divBrandAgentProductList').html(data);
                InitBrandAgentProductList();
            }, 'html');
        });
    });
}function InitBrandSpotProductList() {
    j$('#divBrandSpotProductList #filter a.buttonFilterCategory').each(function () {
        j$(this).click(function () {
            var categoryId = j$(this).attr('id');
            var brandId = j$('#CurrentBrandId').val();
            j$.post('/Brand/BrandSpotProduct', j$.toJSON({ 'b': brandId, 'c': categoryId }), function (data) {
                j$('#divBrandSpotProductList').html(data);
                InitBrandSpotProductList();
            }, 'html');
        });
    });
}
