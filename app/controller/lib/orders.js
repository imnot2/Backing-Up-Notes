'use strict';

var config = require('../../config');

var userProxy = require('../../proxy').User;
var productProxy = require('../../proxy').Product;
var OrderProxy = require('../../proxy').Order;
var utils = require('../../util'),
  formUtil = utils.Forms;
var userAgentUtil = require('../../util').userAgent;

var viewObj = config.viewModule;
module.exports = {
  orders: function (req, res) {
    var viewObj = config.viewModule,
      user = utils.getUserInfo(req);
    if (user) {
      viewObj.userid = user.UserId;
      res.render('orders', viewObj);
    }
    else {
      //未登陆
      res.redirect(config.urlModel.toLogin)
    }
  },
  /*
   *
   *交易成功
   *
   */
  successfulOrder: function (req, res) {

    /*  var data = utils.getUserInfo(req);

    var tid = req.query.tid;
    viewObj.tid = '';

    if (data && tid) {
      data.Trading = tid;
      productProxy.TradingId(data, function(result) {
        var resultUpload, robj;
        if (result.Code == "200") {
          resultUpload = result.Data;
          robj = resultUpload.RecipientInfos;

          //如果没有需要上传的身份证
          if (robj && robj.length > 0) {
            viewObj.tid = tid;
          }
        }
        res.render('successful', viewObj);
      })
    } else {
      res.render('successful', viewObj);
    }
*/
    res.render('payList', viewObj);

  },
  /*
   * 获得上传信息
   *
   *
   */
  getUploadIdCartInfo: function (req, res) {
    var data = utils.getUserInfo(req);
    data.Trading = req.query.tid;
    productProxy.TradingId(data, function (result) {
      res.send(result);
    })

  },
  /*
   * 延长收货
   *
   */
  delayDelivery: function (req, res) {
    var userInfo = utils.getUserInfo(req);
    var data = {
      OrderId: req.param('orderId'),
      AccessToken: userInfo.AccessToken
    }
    OrderProxy.delayDelivery(data, function (result) {
      res.send(result);
    })
  },
  //支付列表页面渲染
  renderPayList: function (req, res) {
    res.render('payList', viewObj);
  },
  /**
   * 通过trandingid获得订单信息
   */
  getOrdersByTradingId: function (req, res) {
    var userInfo = utils.getUserInfo(req);
    var data = {
      AccessToken: userInfo.AccessToken,
      trandingIds: req.param("trandingIds")
    };
    OrderProxy.getOrdersByTradingId(data, function (result) {
      res.send(result)
    })
  },
  /**
   * 获得交易号 获得订单信息用于支付
   */
  listItem: function (req, res) {
    var data = utils.getUserInfo(req);
    data.TradingId = req.param("tid");
    OrderProxy.listItem(data, function (result) {
      res.send(result);
    })
  },
  /**
   * 保税支付
   * @notice 由于拆分的复杂度，暂时不能将一个交易号下所有的商品信息传递
   * 给支付网关，所以这里只是取第一个订单第一个商品
   */
  bondPay: function (req, res) {
    var data = utils.getUserInfo(req);
    data.TradingId = req.param("tid");

    var orderId = req.query['orderId'];
    var buyerName = req.query['buyerName'];
    var productName = req.query['productName'];

    OrderProxy.listItem(data, function (result) {
      res.redirect([
        config.bondPay,
        'ToPay/Shengpay?TradingId=' + data.TradingId,
        '&OrderId=' + orderId + '&PayAmount=' + result.Data.TotalAmount + '&BuyerId=',
        data.UserId + '&BuyerName=' + buyerName,
        '&ProductName=' + encodeURIComponent(productName),
        '&RequestPlatform=3&' + 'BackUrl=' + encodeURIComponent(config.bondPayBackUrl + 'forYmatouApp/orders/paylist'),
        '&returnurl=' + encodeURIComponent(config.bondPayBackUrl + 'forYmatouApp/orders/paylist?tid=' + data.TradingId + '&UserId=' + data.UserId + '&AccessToken=' + data.AccessToken)
      ].join(''));
    })
  },
  updateTradingId: function (req, res) {
    var data = utils.getUserInfo(req);
    formUtil.fields(req, function (field) {
      data = utils.extends(data, field);
      OrderProxy.updateTradingId(data, function (result) {
        res.send(result);
      })
    })
  },
  /**
   * 直接购买
   */
  directBuy: function (req, res) {
    var data = utils.getUserInfo(req);
    formUtil.fields(req, function (field) {
      utils.extends(data, field);
      OrderProxy.directBuy(data, function (result) {
        res.send(result);
      });
    });
  }


}