var path = require("path");
var fs = require("fs");
var log4js = require("log4js");
var config = require("../../config");

/*/////////////////////////////////////
 * TRACE: new Level(5000, "TRACE"), 
 * DEBUG: new Level(10000, "DEBUG"), 
 * INFO: new Level(20000, "INFO"), 
 * WARN: new Level(30000, "WARN"), 
 * ERROR: new Level(40000, "ERROR"), 
 * FATAL: new Level(50000, "FATAL"),
 /////////////////////////////////////*/
/**
 * 日志配置
 */
/**
 * 加载配置文件
 * @param  {string} filepath 文件路径
 * @return {object} 配置对象
 */
function loadConfigurationFile(filepath) {
		if (filepath) {
			return JSON.parse(fs.readFileSync(filepath, "utf8"));
		}
		return undefined;
	}
	/**
	 * [configure description]
	 * @return {[type]} [description]
	 */
function configure() {
	var _config = loadConfigurationFile(path.join(__dirname, "../../config/log4js.json"));
	//路径追加配置文件路径
	if (_config && _config.appenders && config.logPath) {
		_config.appenders.forEach(function(a) {
			if (a.filename) {
				a.filename = path.join(config.logPath, a.filename);
			}
		})
	}
	log4js.configure(_config);
}

/**
 * 暴露到应用的日志接口，调用该方法前必须确保已经configure过
 * @param name 指定log4js配置文件中的category。依此找到对应的appender。
 *              如果appender没有写上category，则为默认的category。可以有多个
 * @returns {Logger}
 */
exports.logger = function(name) {
	var dateFileLog = log4js.getLogger(name || "normal");
	dateFileLog.setLevel(config.logLevel || log4js.levels.INFO);
	return dateFileLog;
}

/**
 * 用于express中间件，调用该方法前必须确保已经configure过
 * @returns {Function|*}
 */
exports.useLog = function() {
	configure();
	return log4js.connectLogger(log4js.getLogger("access"), {
		level: config.logLevel || log4js.levels.INFO,
		format:'[:remote-addr] :method :url :status :response-timems'
	});
}