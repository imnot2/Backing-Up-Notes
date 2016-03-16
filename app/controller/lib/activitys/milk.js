'use strict';
/**
 * 尿布团
 */
var path = require('path');

var utils = require('../../../util');
var activitysProxy = require('../../../proxy').Activitys;
var formUtil = utils.Forms;
var config = require('../../../config');
var viewObj = config.viewModule;


var MILK_BASE_PATH = 'activitys/milk/',
	//根据参数获得view的路径
	getPath = function (view, basePath) {
		basePath = basePath || '';
		return path.normalize(basePath + view)
	};

module.exports = {
	/**
	 * 奶粉团首页
	 * @method get
	 */
	index: function (req, res) {
		var data = utils.getUserInfo(req);
		activitysProxy.milk.getUserAtGroupInfo(data, function (result) {
			if (result.Code == 200) {
				//判断用户在团状态
				//团状态(0：没有团，1：团组建中，2：团组建成功)
				if (result.Data.Status == 0) {
					res.render(getPath('index', MILK_BASE_PATH), viewObj);
				}
				else {
					viewObj.groupInfo = result.Data;
					res.render(getPath('inActivity', MILK_BASE_PATH), viewObj);
				}
			}
			else {
				res.render(getPath('index', MILK_BASE_PATH), viewObj);
			}
		})
	},
	/**
	 * 活动中页面
	 */
	inActivity: function (req, res) {
		var data = utils.getUserInfo(req);
		data.Code = req.param('code');
		activitysProxy.milk.getGroupInfoByCode(data, function (result) {
			console.log(result.Code);
			if (result.Code == 200) {
				//判断用户在团状态
				//团状态(0：没有团，1：团组建中，2：团组建成功 3:不在团)				
				viewObj.groupInfo = result.Data;
				res.render(getPath('inActivity', MILK_BASE_PATH), viewObj);
			}
			else {
				res.render(getPath('index', MILK_BASE_PATH), viewObj);
			}
		})
	},
	/**
	 * 奶粉团购买页
	 * @method get
	 */
	shopping: function (req, res) {
		var data = utils.getUserInfo(req);
		activitysProxy.milk.getUserAtGroupInfo(data, function (result) {
			viewObj.groupInfo = result.Data;
			res.render(getPath('buy', MILK_BASE_PATH), viewObj);
			/*//先获得商品信息
			activitysProxy.milk.getProducts(data,function(result){
				viewObj.ProductInfos = result.Data.Products;
				//console.log(result.Data)
				res.render(getPath('buy',MILK_BASE_PATH),viewObj);		
			})*/
		})


	},
	/**
	 * 分享页
	 * @param code 口令
	 */
	share: function (req, res) {
		viewObj.code = req.param('code');
		res.render(getPath('share', MILK_BASE_PATH), viewObj);
	},
	toJoin: function (req, res) {
		res.render(getPath('join', MILK_BASE_PATH), viewObj);
	},
	/**
	 * 参团
	 * @method get
	 */
	join: function (req, res) {
		var data = utils.getUserInfo(req);
		data.Code = req.param('code');
		activitysProxy.milk.join(data, function (result) {
			res.send(result);
		});
	},
	/**
	 * 建团
	 * @method get
	 */
	create: function (req, res) {
		var data = utils.getUserInfo(req);
		activitysProxy.milk.create(data, function (result) {
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
			activitysProxy.milk.buy(data, function (result) {
				res.send(result);
			})
		})

	},
	/**
	 * 获得参团人数
	 */
	getProfileNumber: function (req, res) {
		var data = utils.getUserInfo(req);
		activitysProxy.milk.getProfileNumber(data, function (result) {
			res.send(result);
		});
	},
	/**
	 * 获得商品数据
	 * 	奶粉是按照商品分类
	 * 		一个商品对应一个规格
	 */
	getProductInfos: function (req, res) {
		var data = utils.getUserInfo(req);
		activitysProxy.milk.getProducts(data, function (result) {
			res.send(result);
		});
	}
}