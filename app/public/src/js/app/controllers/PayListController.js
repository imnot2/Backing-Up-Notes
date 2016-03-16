/* global ymtapp: true*/
/* jshint strict: false,latedef:nofunc */
/**
 * 支付列表controller
 * @description 作为杭保拆单使用的支付列表
 * @author river
 * @email lijiang@ymatou.com
 * @create 2015/3/12
 * @TODO 只是将trandingId保存在本地，
 *       切换用户存在一定会出现不属于该用户订单的错误，然后跳转到成功页
 *       正常流程不会出现，最后在保存trandingId和userId同时保留或者采用公共方法
 *       属于用户级的信息切换就自动情况
 *
 */
ymtapp.controller('PayListController', ['$scope',
    'httpHandlService',
    '$window',
    'utils', 
    'ls',
    'ProductService',
    'YmtApi',
    function ($scope, $http, $window, utils, ls, ProductService,YmtApi) {
        //$scope.pay = '/forYmatouApp/orders/toPay?tid='+
        
        var trandingIds = ls.get('trandingIds') || utils.common.parseUrl($window.location.search)['tids'];
        $scope.isLoaded = true;
        $scope.waitPayNum = 0;
        $scope.total = function () {
            $scope.waitPayNum++;
        };
        if (trandingIds) {
            $http.get('/forYmatouApp/orders/paylist/' + trandingIds).success(function (result) {
                $scope.isLoaded = false;
                $scope.trandings = result.TradingIdOrderInfos;
                isfullPayment($scope.trandings);
                isUploadIdCard($scope.trandings);
            }).all(function () {
                console.log(1);
            });
        }
        else {
            $scope.isLoaded = false;
            $scope.isFull = true;
        }

        //是否全部支付，如果全部支付显示成功页
        function isfullPayment(data) {
            var isFull = true,
                len = data && data.length;
            while (len && len--) {
                if (data[len].NotPaid) { //存在一个没有支付则未完全支付
                    isFull = false;
                    break;
                }
            }
            $scope.isFull = isFull;
        }
        /*
         * 判断是否存在需要上传身份证的交易
         * @notice 需要上传的交易号
         *         根据现在的业务场景，一次交易不管拆单场景如何都是同一个
         *         收件人，所以一个订单存在上传之后其他订单则无需上传
         */
        function isUploadIdCard(data) {
            var len = data && data.length;
            while (len && len--) {
                if (data[len].IsNeedUploadIdCard) {
                    $scope.needUploadTradingId = data[len].TradingId;
                    $scope.$broadcast('onUpload', data[len].TradingId);
                    $scope.$emit('onUpload', data[len].TradingId);
                    break;
                }
            }
        }
        /**
         * 支付
         * @param  {string} trandingId    交易号
         * @param  {string} IsXloboBonded 是否杭保
         * @param  {string} orederId
         * @param  {string} ProductName
         * @param  {string} SellerName
         */
        $scope.toPay = function (item) {
            var tradingId = item.TradingId,
                orderId = item.Orders[0].OrderId,
                isXloboBonded = item.IsXloboBonded,
                productName = item.Orders[0].Products[0].ProductName,
                sellerName = item.Orders[0].SellerName;

            if (isXloboBonded) {
                var data = {
                    TradingIds: [tradingId]
                };
                $http.post('/forYmatouApp/orders/updateTradingId', data).success(function (result, code) {
                    if (code == 200) {
                        var id = result.TradingIds[0];
                        if (id) {
                            //将tradingid更新之后保存到ls中
                            ls.set('trandingIds', trandingIds.replace(tradingId, id));
                            YmtApi.open({
                                url:'/forYmatouApp/orders/bondPay/' + tradingId + '?orderId=' + orderId 
                                + '&productName=' + productName + '&buyerName=' + sellerName
                            });
                        }
                    }
                });
            }
            else {
                YmtApi.openPay(tradingId);
            }
        };
        $scope.ProductService = ProductService;
    }
]);