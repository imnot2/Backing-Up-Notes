var firstLayoutController=require('../../controller').FirstLayout;

var routers = [{
		url: '/home',
		method: 'get',
		ctrl: firstLayoutController.home
	}, //首页
	{
		url: '/hot',
		method: 'get',
		ctrl: firstLayoutController.hot
	}, //全球热卖
	{
		url: '/hoursActivity',
		method: 'get',
		ctrl: firstLayoutController.hoursActivity
	}, //整点抢
	{
		url: '/groupProduct',
		method: 'get',
		ctrl: firstLayoutController.groupProduct
	}, //每日团
	{
		url: '/shoppingBag',
		method: 'get',
		ctrl: firstLayoutController.shoppingBag
	}, //购物袋
	{
		url: '/feedback',
		method: 'get',
		ctrl: firstLayoutController.feedback
	}, //意见反馈
	{
		url: '/regProtocol',
		method: 'get',
		ctrl: firstLayoutController.regProtocol
	}, {
		url: '/help',
		method: 'get',
		ctrl: firstLayoutController.helpInfo
	}, //帮助
	{
		url: '/updateLogin',
		method: 'get',
		ctrl: firstLayoutController.updateLogin
	},{
		url:'/search',
		method:'get',
		ctrl:firstLayoutController.search
	},{
		url:'/tools',
		method:'get',
		ctrl:firstLayoutController.tools
	}
];
module.exports=routers;