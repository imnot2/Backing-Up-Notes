define(function (require, exports, module) {
    var layer = require('widget/layerbox');
    $m.deferred.when(
        $m.ajax({
            url: location.origin + '/template/usercenter/recentOrder.html',
            type: 'html',
            cache: !1
        }),
        $m.ajax({
            url: 'RecentOrders',
            type: 'json',
            cache: !1
        })
    ).success(function (html, data) {
        if (data.length > 0) {
            var pageNum = 1,
                currentPage = 1,
                count = 5;
            if (data.length > count) {
                pageNum = Math.ceil(data.length / count);
            }

            data.pageNum = pageNum;
            data.currentPage = currentPage;


            $m.event.delegate('.payatonce', 'click', function () {
                var canPay = true;
                $(this).closest('article').find('.XloboBonded').each(function () {
                    if ($(this).val() == "true") {
                        canPay = false;
                    }
                });
                if (canPay == false) {
                    layer.alert('杭州保税区商品订单暂不支持WAP端支付，请至PC端支付。');
                }
                else {
                    var that = this;
                    $m.node.prev(that).innerHTML = "<img src=\"/img/load/s.gif\">";
                    $m.ajax({
                        url: 'PreparePay?oid=' + $m.node.attr(that, 'orderid'),
                        type: 'json',
                        success: function (data) {
                            $m.node.prev(that).innerHTML = "";
                            if (data.canPay) {
                                location.href = "/checkout?tid=" + data.tradingId;
                            } else {
                                layer.alert(data.canNotSellProductName + "不能购买")
                            }
                        }
                    })
                }
                return false;
            });


            if (data.pageNum > 1) {


                var partData;
                partData = data.slice(0, count)
                partData.currentPage = 1;
                partData.pageNum = pageNum;
                $m.template({
                    container: '#recentOrder',
                    html: html,
                    data: partData
                });

                $m.node('#rate-number').show();
                var currentPageEle = $m.node('#currentpage');

                $m.event.delegate('#prevpage', 'click', function () {
                    currentPage--;
                    currentPage = currentPage < 1 ? 1 : currentPage;
                    partData = data.slice(currentPage * count - count, currentPage * count)
                    partData.currentPage = currentPage;
                    partData.pageNum = pageNum;
                    $m.template({
                        container: '#recentOrder',
                        html: html,
                        data: partData
                    });
                    $m.node('#rate-number').show();
                    window.scrollTo(0, 0)
                    return !1;
                });
                $m.event.delegate('#nextpage', 'click', function () {
                    currentPage++;
                    currentPage = currentPage > pageNum ? 1 : currentPage;
                    if (currentPage == pageNum) {
                        partData = data.slice(currentPage * count - count)
                    } else {
                        partData = data.slice(currentPage * count - count, currentPage * count)
                    }
                    partData.currentPage = currentPage;
                    partData.pageNum = pageNum;
                    $m.template({
                        container: '#recentOrder',
                        html: html,
                        data: partData
                    });
                    $m.node('#rate-number').show();
                    window.scrollTo(0, 0)
                    return !1;
                });
            } else {
                $m.template({
                    container: '#recentOrder',
                    html: html,
                    data: data
                });
            }
        }

    })

})