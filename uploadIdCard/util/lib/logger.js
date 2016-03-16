var fs          = require('fs');
var config      = require('../../config');
var qs          = require('querystring');
var mongoose    = require('mongoose');

var logdir      = config.logPath;

module.exports={

    log:function(obj){
        var date=new Date();
        var dateFormat=date.getFullYear()+"_"+(date.getMonth()+1)+"_"+date.getDate();

        obj=obj.split('@');

        var body="------[TRACE]----------------------------------------------------\r\r\r";
            body+="      date: "+dateFormat+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"\r";
            body+="      url: "+obj[0]+"\r";
            body+="      method: "+obj[1]+"\r";
            body+="      status: "+obj[2]+"\r";
            body+="      user-agent: "+obj[3]+"\r\r\r";
        fs.appendFile(logdir+'/acc_log_'+dateFormat+'.log',body+'\r','utf8',function(err){
            if(err) throw err;
        })
    },

    err:function(obj){

        var date=new Date();
        var dateFormat=date.getFullYear()+"_"+(date.getMonth()+1)+"_"+date.getDate();

        var body="------[ERROR]----------------------------------------------------\r\r\r";
            body+="      date:"+dateFormat+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"\r";
            body+="      Error: "+obj[0]+"\r";
            body+="      url: "+obj[1]+"\r";
            body+="      status: "+obj[2]+"\r\r\r";
        fs.appendFile(logdir+'/err_log_'+dateFormat+'.log',body+'\r','utf8',function(err){
            if(err) throw err;
        })

    },

    apiData:function(obj){
        var date=new Date();
        var dateFormat=date.getFullYear()+"_"+(date.getMonth()+1)+"_"+date.getDate();

        var body="------[API data]----------------------------------------------------\r\r\r";
        body+="      date: "+dateFormat+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"\r";
        body+="      url: "+obj[0]+"\r";
        body+="      data: "+obj[1]+"\r\r\r";
        fs.appendFile(logdir+'/api_log_'+dateFormat+'.log',body+'\r','utf8',function(err){
            if(err) throw err;
        })
    }

}