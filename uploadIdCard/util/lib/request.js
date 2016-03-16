var http            = require('http');
var config          = require('../../config');
var qs              = require('querystring');
var loggerUtil      = require('./logger');


module.exports={

    get:function(opt,callback){

        opt.hostname    = opt.hostname?opt.hostname:config.ApiServer.host;
        opt.port        = opt.port?opt.port:config.ApiServer.port;
        opt.method      = 'GET';

        var req=http.request(opt,function(res){
            var body="";
            res.setEncoding('utf8');
            res.on('data',function(resutl){
                body+=resutl;
            }).on('end',function(){


                if(res.statusCode!=404&&res.statusCode!=500){
                    if(res.headers['content-type'].indexOf('json')!='-1'||res.headers['content-type'].indexOf('xhtml')!='-1'){
                        var Obj=JSON.parse(body);
                        if(Obj.Status==200||Obj.Code==200){
                            //访问接口记录
                            loggerUtil.apiData([(opt.hostname+opt.path),JSON.stringify(Obj.Result)]);
                            callback(Obj.Result?Obj.Result:Obj.Data);
                        }else{
                            loggerUtil.err([Obj.Msg,(opt.hostname+opt.path),Obj.Status?Obj.Status:Obj.Code]);
                            callback(Obj.Msg);

                        }
                    }else{
                        loggerUtil.err(["接口并非JSON格式",(opt.hostname+opt.path),res.statusCode]);
                        callback('Sorry! 接口数据格式不对');
                    }
                }else{
                    loggerUtil.err(["接口连接出错",(opt.hostname+opt.path),res.statusCode]);
                    callback('Sorry! 接口数据出错,状态'+res.statusCode);
                }

            });

        })

        req.on('error', function(e) {
            loggerUtil.err(["数据接口访问超时",(opt.hostname+opt.path),'null']);
            callback('数据接口访问超时')
        });

        req.end();
    },





    post:function(opt,data,callback){

        var isPost=true;

        data=JSON.stringify(data);

        opt.hostname    = opt.hostname?opt.hostname:config.ApiServer.host;
        opt.port        = opt.port?opt.port:config.ApiServer.port;
        opt.method      = 'post';
        opt.headers     = opt.headers || {
            "Content-Type": 'application/json;charset=utf-8',
            "Content-Length": Buffer.byteLength(data,'utf8')
        }

        var body='';

        var req=http.request(opt,function(res){

            res.setEncoding('utf8');
            res.on('data',function(data){
                body+=data
            }).on('end',function(){
                    // console.log(opt.path);
                    // console.log(res);
                    // console.log(body);
                    if(res.statusCode!=404&&res.statusCode!=500){
                        if(res.headers['content-type'].indexOf('json')!='-1'){

                            var Obj=JSON.parse(body);

                            if(Obj.Status==200||Obj.Code==200){
                                //接口访问记录
                                loggerUtil.apiData([(opt.hostname+opt.path),JSON.stringify(Obj.Result || Obj.Data.Result)]);
                                return callback(Obj.Result?Obj.Result:Obj.Data.Result);

                            }else{
                                loggerUtil.err([Obj.Msg,(opt.hostname+opt.path),Obj.Status?Obj.Status:Obj.Code]);
                                return callback(Obj.Msg);
                            }

                        }else{
                            loggerUtil.err(["接口并非JSON格式",(opt.hostname+opt.path),res.statusCode]);
                            return callback('Sorry! 接口数据格式不对');
                        }
                    }else{
                        loggerUtil.err(["接口连接出错",(opt.hostname+opt.path),res.statusCode]);
                        return callback('Sorry! 接口数据出错,状态'+res.statusCode);
                    }

            })
        })


        req.on('error', function(e) {
            loggerUtil.err([e,(opt.hostname+opt.path),'null']);
            callback('数据接口访问出错')
        });

        req.write(data + "\n");
        req.end()
    }
}