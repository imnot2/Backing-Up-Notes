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


var DIAPER_BASE_PATH = "activitys/diaper/",
//根据参数获得view的路径
	getPath = function (view, basePath) {
		basePath = basePath || DIAPER_BASE_PATH;
		return path.normalize(basePath + view)
	};

module.exports = {
	/**
	 * 尿布团首页
	 * @method get
	 */
	index: function (req, res) {
		var data = utils.getUserInfo(req);
		activitysProxy.diaper.getUserAtGroupInfo(data, function (result) {
			if (result.Code == 200) {

				//判断用户在团状态
				//团状态(0：没有团，1：团组建中，2：团组建成功)
				if (result.Data.Status == 0) {
					res.render(getPath("index"), viewObj);
				}
				else {
					viewObj.groupInfo = result.Data;
					console.log(getPath("inActivity"))
					res.render(getPath("inActivity"), viewObj);
				}
			}
			else {
				res.render(getPath("index"), viewObj);
			}
		})
	},
	/**
	 * 活动中页面
	 */
	inActivity: function (req, res) {
		var data = utils.getUserInfo(req);
		data.Code = req.param("code");
		activitysProxy.diaper.getGroupInfoByCode(data, function (result) {
			console.log(result.Code);
			if (result.Code == 200) {
				//判断用户在团状态
				//团状态(0：没有团，1：团组建中，2：团组建成功 3:不在团)				
				viewObj.groupInfo = result.Data;
				res.render(getPath("inActivity"), viewObj);
			}
			else {
				res.render(getPath("index"), viewObj);
			}
		})
	},
	/**
	 * 尿布团购买页
	 * @method get
	 */
	shopping: function (req, res) {
		var data = utils.getUserInfo(req);
		activitysProxy.diaper.getUserAtGroupInfo(data, function (result) {
			viewObj.groupInfo = result.Data;

			//先获得productid
			activitysProxy.diaper.getProductId(data, function (result) {
				viewObj.ProductId = result.Data.ProductId;
				console.log(result.Data.ProductId)
				res.render(getPath("buy"), viewObj);
			})
		})


	},
	/**
	 * 分享页
	 * @param code 口令
	 */
	share: function (req, res) {
		viewObj.code = req.param("code");
		res.render(getPath("share"), viewObj);
	},
	toJoin: function (req, res) {
		res.render(getPath("join"), viewObj);
	},
	/**
	 * 参团
	 * @method get
	 */
	join: function (req, res) {
		var data = utils.getUserInfo(req);
		data.Code = req.param("code");
		activitysProxy.diaper.join(data, function (result) {
			res.send(result);
		})

	},
	/**
	 * 建团
	 * @method get
	 */
	create: function (req, res) {
		var data = utils.getUserInfo(req);
		activitysProxy.diaper.create(data, function (result) {
			res.send(result);
		})
	},
	/**
	 * 购买接口
	 * @method get
	 */
	buy: function (req, res) {
		var data = utils.getUserInfo(req);
		formUtil.fields(req, function (field) {
			utils.extends(data, field);
			activitysProxy.diaper.buy(data, function (result) {
				res.send(result);
			})
		})

	},
	/**
	 * 获得参团人数
	 */
	getProfileNumber: function (req, res) {
		var data = utils.getUserInfo(req);
		activitysProxy.diaper.getProfileNumber(data, function (result) {
			res.send(result);
		})
	}
}