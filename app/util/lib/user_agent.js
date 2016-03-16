//检测设备是否android
module.exports={
	//判断是否是iPhone
	isIphone:function(req,callback){
		return /iPhone/.test(req.headers['user-agent']);
	},
	//判断是否是Android
	isAndroid:function(req){
		var agent = req.headers['user-agent'];
		return /Android|Linux/.test(agent);
	},
	get:function(req){
		return req ? req.headers['user-agent'] : '';
	}
}