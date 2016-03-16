module.exports = {

    ApiServer: {
        host: "api.app.ymatou.com",
        port: '80'
    },

    viewModule: {
        title: "洋码头", //title名称
        error: ''
    },

    upload: __dirname,

    //Sessiocn Redis Configure
    sessRedis: {
        host: 'redisappcache.ymatou.com',
        port: 6379
    },


    //上传文件  
    uploadhost: 'api.app.ymatou.com', //file.alpha.ymatou.com
    uploadport: 80,

    logPath: 'log',
    cookieKey: 'appWap',
    port: 3100 //服务端口
}