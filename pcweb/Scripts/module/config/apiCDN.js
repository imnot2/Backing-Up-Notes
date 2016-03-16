Ymt.add(function(require, exports, module) {
	var url = $m.parseURL(window.location.href);
	var conf = {
		"dev": '//'+url.hostname, //开发
		"alpha": "", //beta
		"dest": "" //线上
	}
	module.exports = conf["dev"];
});