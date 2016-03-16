'use strict';
var fs = require('fs'),
	path = require('path'),
	config = require('../../config');

//数据路径
var DATA_PATH = path.join(config.rootPath,'/config/activitys.json');

function Activity(){
	this.open();
}
/**
 * 打开活动数据
 */
Activity.prototype.open = function(){
	try{
		this.data = JSON.parse(fs.readFileSync(DATA_PATH,'utf-8'));
	}catch(e){
		console.log('read data error');
	}	
}

/**
 * 保存活动数据
 */
Activity.prototype.save = function(data){
	if(typeof data === 'object'){
		data = JSON.stringify(data);
	}
	fs.writeFileSync(DATA_PATH, data, 'utf-8');
}

/**
 * 根据topicid获得模板数据
 * @param  {string} key topicid
 */
Activity.prototype.get = function(key){
	//防止多进程数据不共享导致数据不一致。
	this.open();
	return key ? this.data[key] : this.data;
}

/**
 * 根据topicid设置，或者覆盖所有的data
 */
Activity.prototype.set = function(key,data){
	if(arguments.length === 1){
		this.data=JSON.parse(key);
	}else{
		this.data[key] = JSON.parse(data);
	}
	return this;
}

var activitys = module.exports = exports = new Activity;