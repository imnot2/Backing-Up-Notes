Ymt.add(function(require, exports, module) {
	var conf = {
		"dev": "", //开发  //http://c0.alpha.ymatou.com
		"alpha": "", //beta
		"dest": "" //线上
	}
	module.exports = conf["dev"];
});