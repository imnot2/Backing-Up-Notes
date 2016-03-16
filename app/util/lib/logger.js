var fs          = require('fs');
var config      = require('../../config');
var qs          = require('querystring');
var mongoose    = require('mongoose')

var logdir      = config.logPath;

var mdate=new Date;
var isMongDB = config.logServer&&config.logServer.host&&config.logServer.port;
if(isMongDB){
    mongoose.connect('mongodb://'+config.logServer.host+':'+config.logServer.port+'/ymtappLog_'+(mdate.getFullYear().toString()+(mdate.getMonth()+1)));
}


var Schema = mongoose.Schema;

var _errLog = new Schema({

    date        : Date,
    method      : String,
    url         : String,
    error       : String,
    data        : String,
    statusCode  : Number

})

var _apiLog=new Schema({
    date        : Date,
    method      : String,
    url         : String,
    data        : String,
    result      : String,
    statusCode  : Number
})

//访问对象模型
var newDate = mdate.getDate();

var errLogs = mongoose.model('err_'+newDate,_errLog);
var apiLogs = mongoose.model('api_'+newDate,_apiLog);

module.exports={

    log:function(obj){
        // var date=new Date();
        // var dateFormat=date.getFullYear()+"_"+(date.getMonth()+1)+"_"+date.getDate();

        // obj=obj.split('@');

        // var body="------[TRACE]----------------------------------------------------\r\r\r";
        //     body+="      date: "+dateFormat+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"\r";
        //     body+="      url: "+obj[0]+"\r";
        //     body+="      method: "+obj[1]+"\r";
        //     body+="      status: "+obj[2]+"\r";
        //     body+="      user-agent: "+obj[3]+"\r\r\r";
        // fs.appendFile(logdir+'/acc_log_'+dateFormat+'.log',body+'\r','utf8',function(err){
        //     if(err) throw err;
        // })
    },

    err:function(obj){
        var date=new Date();
        if(isMongDB){
                var data={
                    date        : new Date(),
                    method      : obj[0],
                    url         : obj[1],
                    data        : obj[2],
                    error       : obj[3],
                    statusCode  : obj[4]
                }

                var saveLogs=new errLogs(data);
                saveLogs.save(function(err,result){
                    if(err){
                        console.log(err)
                    }
                });

        }else{
            var dateFormat=date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate();

            var body="\n------[TRACE]----------------------------------------------------\r";
                body+="\n date: "+dateFormat+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"\r";
                body+="\n url: "+obj[0]+"\r";
                body+="\n method: "+obj[1]+"\r";
                body+="\n status: "+obj[2]+"\r";
                body+="\n user-agent: "+obj[3]+"\r";
            fs.appendFile(logdir+'/err_log_'+dateFormat+'.log',body+'\r','utf8',function(err){
                if(err) throw err;
            })
        }

    },

    apiData:function(obj){
        var date=new Date();
        if(isMongDB){
            var data={
                    date            : new Date(),
                    method          : obj[0],
                    url             : obj[1],
                    data            : obj[2],
                    result          : obj[3],
                    statusCode      : obj[4]
                }

                var saveApiLogs=new apiLogs(data);
                saveApiLogs.save(function(err,result){
                    if(err){
                        console.log(err)
                    }
                });

        }else{
            var dateFormat=date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate();
            var body="\n------[API data]----------------------------------------------------";
            body+="\n date: "+dateFormat+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"\r";
            body+="\n url: "+obj[0]+"\r";
            body+="\n data: "+obj[1]+"\r";
            body+="\n result: "+obj[2]+"\r"
            body+="\n statusCode: "+obj[3]
            fs.appendFile(logdir+'/api_log_'+dateFormat+'.log',body+'\r\n','utf8',function(err){
                if(err) throw err;
            })
        }
    },
    showLog:function(req,res){
       errLogs.find().sort({date:-1}).limit(40).exec(function(err,doc){
            console.log(err);
            res.render('logger',{errList:doc})
       })
    },
    //暂时不提供mongdb服务则通过文件存储
    showLogFile:function(req,res){
        var fileName = req.query.fileName || req.query.filename,
        fileList = req.query.fileList || req.query.filelist;
        if(fileName){
            fs.readFile(logdir+"/"+fileName+".log",'utf8',function(err,data){
                res.send((err && err.toString()) || data)
            })             
         }else if(fileList){
            var files = fs.readdirSync(logdir);
            res.send(files)
         }else{
            res.send("参数错误")
         }
       
    }

}