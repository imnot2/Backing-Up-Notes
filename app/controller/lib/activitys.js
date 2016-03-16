'use strict';
/**
 * 活动页
 */
var path = require('path');

var config = require('../../config');
var utils = require('../../util');
var formUtil = utils.Forms;
var viewObj = config.viewModule;
var activitysProxy = require('../../proxy').Activitys;
var productProxy = require('../../proxy').Product;

var activity = utils.activity;

//根据参数获得view的路径
var	getPath = function (view, basePath) {
	return path.normalize(basePath + view);
};

/**
 * 渲染页面
 * @param  {string} topicid [description]
 * @param  {string} tplName [description]
 * @param  {object} options [description]
 */
function render(topicid, tplName, options) {

	if (!topicid || !tplName) {
		throw new Error('topicid和tplname 不能为空');
	}
	var tpls;
	try {
		tpls = require('ejs').render(activity.get(topicid)[tplName]['content'], options);
	}
	catch (e) {
		tpls = String(e);
		console.log(tpls);
	}
	return tpls;
}

module.exports.diaper = require('./activitys/diaper');

module.exports.milk = require('./activitys/milk')

/**
 * 砍价团功能
 */
var getparamData = function (req) {
	var data = utils.getUserInfo(req);
	data.TopicId = req.param('topicId');
	return data;
}

module.exports.bargainGroups = {
	/**
	 *
	 * @method get
	 */
	index: function (req, res) {
		var data = getparamData(req),
			topicId = req.param('topicId');
		activitysProxy.bargainGroups.getUserAtGroupInfo(data, function (result) {
			if (result.Code == 200) {
				//判断用户在团状态
				//团状态(0：没有团，1：团组建中，2：团组建成功)
				if (result.Data.Status == 0) {
					res.send(render(topicId, 'index', viewObj))
				}
				else {
					viewObj.groupInfo = result.Data;
					viewObj.groupInfo.topicId = topicId;
					if (result.Data.Status == 2) {
						activitysProxy.bargainGroups.getProdutListByTopicId(data, function (result) {
							var productId = "";
							if (result.Code == 200 && result.Data && result.Data.ProductList && result.Data.ProductList[0]) {
								var productId = result.Data.ProductList[0].ProductID;
							}
							viewObj.productId = productId;
							res.send(render(topicId, 'inActivity', viewObj))
						})
					}
					else {
						res.send(render(topicId, 'inActivity', viewObj))
					}
				}
			}
			else {
				res.send(render(topicId, 'index', viewObj))
			}
		})
	},
	/**
	 * 活动中页面
	 */
	inActivity: function (req, res) {
		var data = getparamData(req),
			topicId = data.TopicId;
		data.Code = req.param("code");
		activitysProxy.bargainGroups.getGroupInfoByCode(data, function (result) {
			viewObj.groupInfo = result.Data;
			if (result.Code == 200) {
				if (result.Data.Status == 2) {
					activitysProxy.bargainGroups.getProdutListByTopicId(data, function (result) {
						var productId = "";
						if (result.Code == 200 && result.Data && result.Data.ProductList && result.Data.ProductList[0]) {
							var productId = result.Data.ProductList[0].ProductID;
						}
						viewObj.productId = productId;
						res.send(render(topicId, 'inActivity', viewObj));
					})
				}
				else {
					//判断用户在团状态
					//团状态(0：没有团，1：团组建中，2：团组建成功 3:不在团)				
					res.send(render(topicId, 'inActivity', viewObj));
				}

			}
			else {
				res.send(render(topicId, 'index', viewObj));
			}
		})
	},
	/**
	 * 奶粉团购买页
	 * @method get
	 */
	shopping: function (req, res) {
		var topicId = req.param('topicId');
		var data = getparamData(req);
		activitysProxy.bargainGroups.getUserAtGroupInfo(data, function (result) {
			console.log(result)
			if (result.Code == 200) {
				viewObj.groupInfo = result.Data;
				res.send(render(topicId, 'buy', viewObj));
			}
			else {
				x
				res.send(result.Msg)
			}
		})
	},
	/**
	 * 分享页
	 * @param code 口令
	 */
	share: function (req, res) {
		var topicId = req.param('topicId');
		viewObj.code = req.param('code');
		res.send(render(topicId, 'share', viewObj));
	},
	toJoin: function (req, res) {
		var topicId = viewObj.topicId = req.param('topicId');
		res.send(render(topicId, 'join', viewObj));
	},
	/**
	 * 参团
	 * @method get
	 */
	join: function (req, res) {
		var data = getparamData(req);
		data.Code = req.param("code");
		activitysProxy.bargainGroups.join(data, function (result) {
			res.send(result);
		})

	},
	/**
	 * 建团
	 * @method get
	 */
	create: function (req, res) {
		var data = getparamData(req);
		activitysProxy.bargainGroups.create(data, function (result) {
			res.send(result);
		});
	},
	/**
	 * 购买接口
	 * @method get
	 */
	buy: function (req, res) {
		var data = utils.getUserInfo(req);
		formUtil.fields(req, function (field) {
			utils.extends(data, field);
			activitysProxy.bargainGroups.buy(data, function (result) {
				res.send(result);
			})
		})

	},
	/**
	 * 获得参团人数
	 */
	getProfileNumber: function (req, res) {
		var data = getparamData(req);
		activitysProxy.bargainGroups.getProfileNumber(data, function (result) {
			res.send(result);
		})
	},
	/**
	 * 获得商品数据
	 * 		通过用户和主题获得这个活动的商品信息
	 * 		一个商品对应一个规格
	 */
	getProductInfos: function (req, res) {
		var data = getparamData(req);

		activitysProxy.bargainGroups.getProdutListByTopicId(data, function (result) {
			res.send(result);
		})
	},
	/**
	 * 获得根据主题编号获得当前用户团信息
	 */
	getGroupInfoByTopicId: function (req, res) {
		var data = getparamData(req);
		activitysProxy.bargainGroups.getUserAtGroupInfo(data, function (result) {
			res.send(result);
		})
	},
	/**
	 * 获得团信息通过口令
	 */
	getGroupInfoByCode: function (req, res) {
		var data = getparamData(req);
		data.Code = req.param('code');
		activitysProxy.bargainGroups.getGroupInfoByCode(data, function (result) {
			res.send(result);
		})
	}
}

//活动模板管理
module.exports.templet = function (req, res) {
	//设一个简单的权限功能
	if (req.query.pwd === 'lunchzhao') {
		viewObj.content = activity.get();
		res.render(path.normalize('activitys/', 'index'), viewObj);
	}
	else {
		res.send('<h1>权限错误</h1>');
	}
}

module.exports.saveTemplet = function (req, res) {
	formUtil.fields(req, function (field) {
		try {
			activity.set(field.content).save(field.content);
			res.send({
				Code: 200,
				Msg: '保存成功'
			});
		}
		catch (e) {
			console.log(e);
			res.send({
				Code: 201,
				Msg: '保存失败' + e
			});
		}
	});
}

module.exports.group = function (req, res) {
	res.render(getPath('group','activitys/'),viewObj);
}