'use strict';
/**
 * 上传身份证 
 */
var path = require('path');

var productProxy=require('../../proxy').Product,
	UploadIdCardProxy = require('../../proxy').UploadIdCard;
var utils = require('../../util');
var formUtil = utils.Forms;

var formidable=require('formidable');

var config = require('../../config');
var viewObj=config.viewModule;

var basePath = path.normalize("uploadIdCard/");

/**
 * 保存上传信息
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function saveUploadInfo(data,callback){
	data.RightSidePic = data.uploadResults[0];
	data.ReverseSidePic = data.uploadResults[1];
	delete data.uploadResults;
	UploadIdCardProxy.saveUploadInfo(data,function(result){
		callback(result);
	})
}

module.exports = {
	/**
	 * 获得收件人的上传身份证列表
	 * @param  {string}	交易号
	 */
	getlist:function(req,res){
		var data = utils.getUserInfo(req) || {};
		data.Trading = req.param("tid");	
		productProxy.TradingId(data,function(result){
			viewObj.tid = data.Trading;
			viewObj.data = {};
			if(result.Code == "200"){
				viewObj.data = result.Data.RecipientInfos;
			}			
			res.render(basePath+"index",viewObj)
		})
	},
	renderAddCardId:function(req,res){
		res.render(basePath+"addCardId",viewObj)
	},
	addCardId:function(req,res){
		formUtil.fields(req, function(fields) {
			var idCard= fields.idCard,
				msg = "",
				data = {
					UserId:req.param("userId"),
					Name:req.param("name"),
					Mobile:req.param("mobile")
				};

			if(!idCard){
				msg="身份证号码不能为空";
			}else{
				if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard))){
					msg="身份证号码格式错误";
				}
			}

			if(msg){
				res.send({
					Code:"500",
					msg:msg
				})
			}
			//检查身份状态
			UploadIdCardProxy.checkUploadStatus(data,function(result){
				var msg = "",
					code = "200";
				if(result.Code == 200 && result.Data.Result == true){
					msg = "身份证已经上传，您现在暂无需上传身份证的订单";
					code = "500"
				}
				res.send({
					Msg:msg,
					Code:code
				})
			})
		})
		
	},
	renderUpload:function(req,res){
		res.render(basePath+"upload",viewObj);
	},
	upload:function(req,res){

		var form=new formidable.IncomingForm();

		//上传结果
		var obj = {
			UserId: req.param("userId"),
			name: req.param("name"),
			mobile: req.param("mobile"),
			businessid: req.param("orderId"),
			type: '1',
			cardid: req.query["idCard"],
			uploadResults:[]
		},callback = function(result){
			//如果成功将tid回传 让用户返回上传列表可以继续上传
			if(result.Code == 200){
				result.Data.tid = req.param("tid")
			}
			res.send(result);
		};
		form.parse(req,function(err,fields,files){
			if(err){
				res.send({
					Status: 500,
					Msg:err
				});
			}
			for(var f in files){
				utils.UploadFile.uploadToServer({
						url:'/api/IdCardManage/UploadIdCardPic?userId='+req.param("userId"),
						fileName:files[f].name,
						filePath:files[f].path,
						fileType:files[f].type
					},function(err,data){
						try{
							data  = JSON.parse(data);
						}catch(e){
							err = e.toString();
						}
						if(err || (data && data.Code != 200)){
							res.send({
								Status: data.Code || 500,
								Msg: err || data.Msg
							});
						}else{							
							//保存上传信息
							obj.uploadResults.push(data.Data.IdCardDecryptUrl);
							//只有两个上传的身份都上传成功才执行保存操作
							if(obj.uploadResults.length==2){
								saveUploadInfo(obj,callback);
							}
						}
					});
			}
			
		})
		//res.end()
	},
	/**
	 * 协议页面
	 * @param  type {number} 1|2|3
	 */
	provision:function(req,res){
		viewObj.type = req.param("type");
		res.render(basePath+"provision",viewObj);
	},
	//成功页面
	success:function(req,res){
		viewObj.tid = req.param("tid");
		res.render(basePath+"success",viewObj);
	}
}