/*=======================index.js===========================*/
j$(function () {
    j$("select#ExternalFeatureItem option").each(function () {
        var o = j$(this);
        if (o.text().length > 80) {
            o.text(o.substring(0, 77) + "...");
            o.mouseover(function () {
                var insertEle = "<div id='tip' style='z-index:999;'>" + o.val() + "</div>";
                o.append(insertEle);
            }).mouseout(function () {
                j$("#tip").remove();
            });
        }
    });
    j$("#buttonToOrder").click(function () {
        if (j$(this).parent('span').attr('usertype') == '1') {
            AttentionDialog('#DPAttentionDialog', '#PadB');
        } else {
            window.open(j$(this).parent('span').attr('data'));
        }
    });
    j$('#dropdownlistCategory').live('change', function () {
        changeFilter();
    });
    j$('#dropdownlistBrand').live('change', function () {
        changeFilter();
    });
    j$('#containerShopProductSpot .Paginator .buttonPageLink').live('click', function () {

        var page = j$(this).attr('data');
        j$('#ShopProductSpotPageIndex').val(page);
        changeFilter();
    });
});
function changeFilter() {
    var form = j$('#formSellerProductSpotList');
    var formdiv = j$('#divSellerProductSpotList *');
    j$.post(form.attr('action'), j$.toJSON(formdiv.serializeObject()), function (data) {
        var container = j$('#containerShopProductSpot');
        container.empty();
        container.html(data);
    }, 'html');

}
   
