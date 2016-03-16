var formidable=require('formidable');

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
                console.log("form格式错误")
    		}
    	})


    },
    files:function(req,callback){
    	var form=new formidable.IncomingForm();
    }
};