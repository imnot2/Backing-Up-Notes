module.exports={

	ApiServer:{
		host:"api.alpha.ymatou.com", //api.alpha.ymatou.com       192.168.1.206                                     //Api Service
        port:'80'                                                       //Api Port
	},
    redirectHostName:'www.ymatou.com',  //重定向的默认hostname
     //客户端跳转模型
    urlModel:{
        toLogin:"/forYmatouApp/loginStatus?hasLogin=0"
    },

	viewModule:{
		title:"洋码头",			                                        //Title Name
        colName:{
            productItem             :"商品详情",
            productItemInfo         :"完整商品介绍",
            confirmOrder            :"确认订单",
            pay                     :"支付",
            payComplass             :"支付完成"

        },
		error:'',
        success:'',
        user: [],
        version: '',   //Static Version,
        wxVersion:'0.0.3',                                               
        staticfilepath: '',
        staticfileurl: function(url) {
            if (this.version != '') {
                var replaceurls = ['.js', '.css'];
                for (var index in replaceurls) {
                    if (url.indexOf(replaceurls[index]) > 0) {                        
                        url = url.replace(replaceurls[index], '.') + this.version + replaceurls[index];
                        break;
                    }
                }
            }
            return this.staticfilepath + url;                           //Return New Static Url
        }//静态文件绝对地址
	},

	rootPath:__dirname,                                                 //Root Path

    sessRedis: {                            
        host: '192.168.1.217',                                          //Redise Service
        port: 6379,
        prefix:'ymtapp:'                                                      //Redise Port
    },

    //
    searchURL:"http://index.ymatou.com/query.aspx?keyword=",

    logServer:{                                                         //Logger Server
       // host:'127.0.0.1',
        port:27017
    },
     //上传文件
    uploadhost: 'api.alpha.ymatou.com'                                  //file.alpha.ymatou.com
    ,uploadport:80
    
    ,secretKey:'ymatouapp',                                              //Cookie And Session SecretKey

    logFormat:":url@:method@:status@:user-agent",                       //Loger Access Rule
    logPath:__dirname+'/log',                                           //Logger Dir

	port:3200,                   			                            //Project Port

    shareInfo:{
        shareTitle:"海淘红包秘籍：不看悔死你",
        shareTip:"海淘直邮新大陆，物美价廉速度快！新用户注册还能领110元红包！独乐乐不如众乐乐，别怪我没告诉你！",
        sharePicUrl:"http://staticontent.ymatou.com/ymtapp/ymtapp.png"
    }
    ,logLevel:'warn' // log level,default level is "info"
    ,bondPay:'http://payproxy.alpha.ymatou.com/'//保税支付地址
    ,bondPayBackUrl:'http://matouapp.alpha.ymatou.com:3200/'//盛付通支付回调地址
}