/* global core: true*/
/* jshint strict: false,latedef:nofunc */
/**
 * BI 统计工具
 * 行为 bh
 *     /// <summary>
        /// 浏览
        /// </summary>
        visit_p:10001,
        /// <summary>
        /// 添加购物车
        /// </summary>
        add_cart:20001,
        /// <summary>
        /// 购买商品
        /// </summary>
        buy_now:30001,
        /// <summary>
        /// 收藏商品
        /// </summary>
        add_fav:40001,
        /// <summary>
        /// 下订单
        /// </summary>
        order_now:50001,
        /// <summary>
        /// 付款
        /// </summary>
        pay_order:60001
 *  设备编号 20001
 */
core.factory('BIS', ['$window', 'isAlpha', function ($window, isAlpha) {
	var domain = 'http://r.' + (isAlpha ? 'alpha.' : '') + 'ymatou.com';

	var createImg = function (opts) {
		document.createElement('img').src = domain + ['/receiveImg?uid=', (opts.userId || '0'),
			'&appid=', (opts.deviceNo || '20001'),
			'&pguid=',
			opts.productId,
			'&bh=',
			opts.action,
			'&_v=',
			Math.random()
		].join('');
	};
	return {
		/**
		 * 发送统计
		 * @param  {object} opts
		 *         			userId    用户编号
		 *         			deviceNo  设备号
		 *         			productId 商品编码
		 *         			action    行为
		 */
		send: function (opts) {
			createImg(opts);
		}
	};
}]);