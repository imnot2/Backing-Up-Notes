var fs = require('fs'),
	userAgent = require("./user_agent");
var config      = require('../../config');
var logdir      = config.logPath;

Date.prototype.format = function(){
	return this.getFullYear()+"-"+(this.getMonth()+1)+"-"+this.getDay()+" "+this.getHours()+":"+this.getMinutes()+":"+this.getSeconds()+"."+this.getMilliseconds();
}

function write(fileName,contents,charset,errFn){
	fs.appendFile(fileName,contents,charset || 'utf8',function(err){
        if(err && !errFn) throw err;
    })
}

var Logger = function(opts){

}

function extend(dest, source){
	for (var property in source) dest[property] = source[property];  
    return dest;  
}

Logger.prototype.detail = function(){
	var detail = extend({date:new Date().format()},this.req);
	return detail;
}
Logger.prototype.register = function(options){
	this.registerRes(options.res)
	this.registerReq(options.req)
}
//获得res
Logger.prototype.registerRes=function(res){
    this.res = (!res || !res.statusCode)?{}:{
        statusCode: res.statusCode,
        header: res._header
    }
    return this;
}
//获得req
Logger.prototype.registerReq=function(req){
    this.req = (!req || !req.connection)?{}:{
        method: req.method,
        url: req.url,
        //headers: req.headers,
        userAgent: req.headers["user-agent"],
        cookie:req.headers.cookie
        //remoteAddress: req.connection.remoteAddress,
        //remotePort: req.connection.remotePort
    };
    return this;
}

Logger.prototype.info = function(msg,obj){
	var detail = this.detail();	
	if(typeof msg === "string"){
		detail.msg = msg;
		if(typeof obj === "object"){
			extend(detail,obj)
		}
	}else if(typeof msg === "objcet"){
		extend(detail,msg)
	}
	detail.level = 10;
	detail.type = "info";
	var date = new Date();
	write(logdir+"/record-"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay()+".log",JSON.stringify(detail)+"\n\r")
}

module.exports.Logger = Logger;

module.exports.createLogger = function(options){
	return new Logger(options)
} 
/*
module.exports={
	log:function(req,text){
		var date = new Date();
		var contents = "[ "+date.format()+" ] [ info ] - "+text+" -"+req.method+" "+req.url+" "+req.statusCode+" "+userAgent.get(req);
		write(logdir+"/record-"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay()+".log",contents)
	}
}*/