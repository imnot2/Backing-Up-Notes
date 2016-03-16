var formidable=require('formidable');
var loggerUtil= require('./logger');

module.exports={
    form:function(req,callback){
        var form=new formidable.IncomingForm();
    },


    fields:function(req,callback){
    	var form=new formidable.IncomingForm();

    	//基础处理
    	form.parse(req,function(err,fields,files){
    		if(!err){
    			callback(fields)
    		}else{
    			//loggerUtil.err([err,req.url,'']);
    			callback('form error')
    		}
    	})


    },
    files:function(req,callback){
    	var form=new formidable.IncomingForm();
    }
};