'use strict';
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');


// 响应
app.get('/', function(req, res, next) {
    var callabck = req.query.callback;
    var data = {
        OrderId: 'YMT03500374860',
        TradeNo: 'YMT03500374860',
        TraceId: 'genzhonghao',
        PayPrice: '0.01',
        CurrencyType: 'CNY',
        ProductDesc: 'AAAAAA',
        PayType: 'JSAPI',
        UserIp: '172.16.15.69',
        //UserId: '4085',
        UserId: 'oR5W7jjcFm9lcnraB9ElblRwqPy4',
        UserIdType: '2',
        RequestPlatform: '0'
    };
    var body = '';
    var opt = {};
    opt.host = 'payproxy.alpha.ymatou.com';
    opt.path = '/WeixinPay/AcquireOrder';
    opt.port = '80';
    opt.method = 'post';
    opt.headers = {
        "Content-Type": 'application/json;charset=utf-8'
    };
    var req = http.request(opt, function(re) {
        re.on('data', function(data) {
            body += data
        }).on('end', function() {
            console.log(body);
            res.end(callabck + '(' + body + ')');
        })
    })
    req.write(JSON.stringify(data) + '\n');
    req.on('error', function(re) {
        res.send(re);
    });
    req.end();
});
// function checkObj(o){
//     return (typeof o === 'object') && (o instanceof Object);
// }
// function extendObj(source,target){
//     source = checkObj(source) ? source :  {};
//     target = checkObj(target) ? target :  {};
//     for(var i in source){
//         if(!target[i]) target[i] = source[i]
//     }
//     return target;
// }
// function fnRequest(urlopt,dataopt,callback){
//     var opt = {   
//         protocol : 'http',  
//         port : '80',
//         method : 'get',
//         headers : {
//             "Content-Type": 'application/json;charset=utf-8'
//         }
//     };
//     var data = {};
//     var body = '';
//     var protocol = {
//         'http':http,
//         'https':https
//     };

//     opt = extendObj(opt, urlopt || {});
//     data = extendObj(data, dataopt || {});
    
//     var req = https.request(opt, function(re) {
//         //callback && callback(body);
//         re.on('data', function(resdata) {
//             //body += resdata;
//             callback && callback(resdata);
//         })
//     })

//     req.write(JSON.stringify(data) + '\n');
//     // req.on('error', function(re) {
//     //     //res.send(re);
//     //     callback && callback(re);
//     // });
//     req.end();
// }
// app.get('/wechat/getSign',function(req,res){
//     //https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
//     var id = req.query.appid;
//     var callback = req.query.callback;
//     fnRequest({
//         protocol:'https',
//         host : 'api.weixin.qq.com',
//         path : '/cgi-bin/token'
//     },{
//         grant_type:'client_credential',        
//         appid :id,
//         secret:'3290cd9b09f5e8c5be7622e59a8ffeed'
//     },function(re){
//         res.end(callback+ '(' + re + ')');
//     })
//     // var req = https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+id+'&secret=3290cd9b09f5e8c5be7622e59a8ffeed', function(re) {

//     //   console.log("statusCode: ", re.statusCode);
//     //   console.log("headers: ", re.headers);

//     //   // re.on('data', function(d) {
//     //   //   process.stdout.write(d);
//     //   // });
//     //   res.end(callback+ '(' + res + ')');
//     // }).on('error', function(e) {
//     //   console.error(e);
//     // });
// })
app.listen(3000);