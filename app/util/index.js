module.exports.Forms = require('./lib/form');
module.exports.Request = require('./lib/request');
module.exports.ImgSize = require('./lib/imgsize'); //图片尺寸处理
module.exports.City = require('./lib/city'); //城市列表
module.exports.Format = require('./lib/format'); //产品规格处理
module.exports.userAgent = require('./lib/user_agent'); //设备UA检测

module.exports.Logger = require('./lib/logger'); //访问记录与错误记录
module.exports.record = require('./lib/record');
module.exports.UploadFile = require('./lib/UploadFile');
module.exports.log4js = require('./lib/log4js');
module.exports.activity = require('./lib/activity');

/**
 * 获得请求来源ip
 * @param  {[request]} req [请求对象]
 * @return {[string]}     [ip地址]
 */
function getIp(req) {
	var clientIp = req.connection.remoteAddress || req.ip,
		ip = req.headers['x-forwarded-for'],
		forwardIps;
	if (ip) {
		forwardIps = ip.split(",");

		if (!/^10./.test(forwardIps[0])) {
			return forwardIps[0]
		}
	}
	return clientIp;
}
module.exports.getIp =  getIp;
/*
 * 继承
 * @param 目标对象
 * @param 源目标
 * 现在只实现一个简单对象copy
 */
module.exports.extends = function () {
	var target = arguments[0] || {},
		i = 1;
	length = arguments.length;
	var src,
		copy;
	if (length === i) {
		target = this;
		--i;
	}
	if (typeof target !== 'object' && typeof target !== 'function') {
		target = {}
	}
	while (i < length) {
		if (source = arguments[i]) {
			for (var name in source) {
				src = target[name];
				copy = source[name];
				if (src === copy) {
					continue;
				}

				if (copy) {
					target[name] = copy
				}

			}
		}
		i++;
	}

	return target;
}

/*
 * 获得用户信息
 * @param  {object} req
 * @return {object}
 * {
 * 	AccessToken:
 * }
 * @description 取消session保存状态统一采用query
 *
 */
function getUserInfo(req) {
	var UserId = req.query.UserId,
		AccessToken = req.query.AccessToken,
		ip = getIp(req);

	//过滤参数重复问题
	if (AccessToken && Array.isArray(AccessToken) && AccessToken.length > 1) {
		AccessToken = AccessToken[0]
	}
	if (UserId && Array.isArray(UserId) && UserId.length > 1) {
		UserId = UserId[0]
	}

	if (AccessToken && AccessToken !== 'nil') {
		return {
			UserId: UserId,
			AccessToken: AccessToken,
			Ip: ip
		}
	
	//@TODO 客户端登录无法同步更新登录状态，暂时采用cookie保存
	//写入cookie的操作只在layout.js 中updateLogin方法中处理
	}else if( req.cookies.AccessToken ){
		return {
			UserId: req.cookies.UserId,
			AccessToken: req.cookies.AccessToken,
			Ip: ip
		}
	}

	return {};
}

module.exports.getUserInfo = getUserInfo;

/**
 * 用户状态验证
 * @param  {request} req 请求对象
 * @param  {response|Boolean} res 响应对象|是否自动响应，默认是false
 
 * @return {[type]}     [description]
 */
module.exports.validateUser = function (req, res) {
	var user = getUserInfo(req);
	if (!user.AccessToken) {
		if (res) {
			res.send({
				Status: 600,
				Msg: '用户未登录',
				Data: null
			});
		}
		return false;
	}
	return true;
}