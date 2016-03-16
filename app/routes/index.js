'use strict';

var api = require('./lib/api'),
	firstLayout = require('./lib/layout'),
	user = require('./lib/user'),
	product = require('./lib/product'),
	orders = require('./lib/orders'),
	shoppingCart = require('./lib/shoppingCart'),
	uploadIdCard = require('./lib/uploadIdCard'),
	activitys = require('./lib/activitys');

var log4js = require('../util').log4js;

/*
	页面不存在
*/
function noFindPage(req, res) {
	res.status(404).format({
		html: function() {
			res.send(req.url);
		}
	});
}

/*
 * 注册路由
 */
module.exports.registerRoutes = function(app,express) {
	var registerRoutes = function(path,routers){
		var ApiRoute = express.Router();
		routers.forEach(function(route) {
			if(route.ctrl){
				ApiRoute.route(route.url)[route.method](route.ctrl);
			}
			
		})
		app.use(path,ApiRoute);
	}
	app.get('/hb.html',function(req,res){
		res.send('ok');
	})
	//对所有请求做拦截,做用户认证
	//app.get('/*',require('../controller').User.userAuth);
	
	/**
	 * 访问记录
	 */
	/*app.get('/*',function(req,res,next){
		var method = req.method;
		console.log(req.headers['user-agent'])
		//log4js.logger('access').log(req.url+' userAgent')
		/*switch(method.toLocaleLowerCase()){
			case 'get':
			break;
			case 'post':
			break;
		}
		next();
	});
*/
	//活动页重定向
	app.get('/forYmatouApp/redirect',require('../controller').Api.redirect);

	registerRoutes('/api/',api);
	registerRoutes('/forYmatouApp/',firstLayout);
	registerRoutes('/forYmatouApp/personal',user);//个人中心
	registerRoutes('/forYmatouApp/product',product);//商品
	registerRoutes('/forYmatouApp/orders',orders);//订单
	registerRoutes('/forYmatouApp/shoppingCart',shoppingCart);//购物车
	registerRoutes('/forYmatouApp/uploadIdCard',uploadIdCard);//上传身份证
	registerRoutes('/forYmatouApp/activitys',activitys);//活动

	app.use(noFindPage); //404 No Page
}

