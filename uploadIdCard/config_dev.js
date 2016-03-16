module.exports={

	ApiServer:{
		host:"api.alpha.ymatou.com",  //www.alpha.ymatou.com   //192.168.1.206
		port:'80',
	},

	viewModule:{
		title:"洋码头",			//title名称
		error:''
	},
	
	upload:__dirname,

	 //Sessiocn Redis Configure
    sessRedis: {
        host: '192.168.1.217',
        port: 6379
    },


    //上传文件
    uploadhost: 'api.alpha.ymatou.com',//file.alpha.ymatou.com
	uploadport:80,

	logPath:'log',
    cookieKey: 'appWap',
	port:3100					//服务端口
}