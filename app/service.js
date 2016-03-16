var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();
//var morgan		    = require('morgan');
var config = require('./config');

var log4js = require('./util').log4js;

app.use(log4js.useLog());

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '/public', 'dist'))); //Default Static Path

app.use('/tpls', express.static(path.join(__dirname, 'views', 'tpls')));

app.use(cookieParser());
app.use(flash());

//app.use(morgan({format:config.logFormat,stream:{ write:function(str){loggerUtil.log(str)}}}));

//注册路由 
require('./routes').registerRoutes(app, express);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
	console.log('Run [' + config.viewModule.title + '] Success!  Port:' + app.get('port') + ' version:' + config.viewModule.version);
});

/* 捕获全局异常，如果最终调入到了这里，要非常注意 
 *  最后将会抛弃这个方法
 */
process.on('uncaughtException', function (err) {
	var log = log4js.logger('error');
	log.error('Error caught in uncaughtException event:', err);
	//这里将异常捕捉然后自动退出，防止res 无法响应一直占用内存
	process.exit(1);
});