var http = require('http');
var config = require('../../config');
var qs = require('querystring');
var utils = require('../');
var logger = require('./log4js').logger;

//get请求默认选项
var getOption = {
        hostname: config.ApiServer.host,
        port: config.ApiServer.port,
        method: 'get'
    }
    //post请求默认选项
var postOptions = {
    hostname: config.ApiServer.host,
    port: config.ApiServer.port,
    method: 'post',
}

/**
 * 对request的封装
 * @param  {object}   opts
 * @param  {object | function}   data   可以是object，如果为get请求则会
 *                       将这个参数拼接到url上；当页面不传递，则将为回调函数
 * @param  {Function} callback
 */
function _request(opts, data, callback) {

    if (typeof data === 'function') {
        callback = data;
        data = undefined;
    }
    else if (typeof data === 'object' &&
        opts.method.toLocaleLowerCase() == 'get') {

        var i, param = '',
            inx = 0;
        for (i in data) {
            param += '&' + i + '=' + data[i]
        }
        //去掉末尾&
        param = param.substring(0, param.length - 2);
        //判断是否有?
        if (/\?/.test(opts.path)) {
            //是否以问号结尾，则去掉最后一个前面的的&
            if (/\?$/.test(opts.path)) {
                param.replace(/&/, '');
            }
        }
        else {
            //将第一个&替换成?
            param.replace(/&/, '?');
        }
        //判断是否有#,则需要将query 放到hash之前
        if (/\#/.test(opts.path)) {
            opts.path.replace(/\#/, param + '#');
        }
        else {
            opts.path += param;
        }
    }
    var cb = function (info) {
        if (callback && (typeof callback === 'function')) {
            callback(info)
        }
    }
    var exec_start_at = Date.now();
    var dataStr = '';
    if (typeof data === 'object') {
        try {
            dataStr = JSON.stringify(data);
        }
        catch (e) {
            console.log('参数解析失败：'+e)
        }
    }
    var req = http.request(opts, function (res) {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function (resutl) {
            body += resutl;
        }).on('end', function () {
            var msg = '',
                resBody = [
                    '['+opts.hostname + '] ' + opts.method+' ',
                    dataStr ? ('formData ' + dataStr) : ' ',
                    opts.port + ' ' + opts.path +' ',
                    res.statusCode + '  body ' + body + ' ', 
                    (Date.now() - exec_start_at) + ' ms'
                ].join('');
            //res.statusCode!=404&&res.statusCode!=500&&res.statusCode!=503
            if (res.statusCode === 200 || res.statusCode === 300 || res.statusCode === 304 || res.statusCode === 301) {
                var headers = res.headers['content-type'];
                if (!!~headers.indexOf('json') || !!~headers.indexOf('xhtml')) {
                    try {
                        var Obj = JSON.parse(body);
                        cb(Obj);
                        msg = JSON.stringify(Obj.Result);
                        logger('record').warn(resBody);
                    }
                    catch (e) {
                        console.log(String(e))
                    }
                    return;
                }
                else {
                    msg = '接口并非JSON格式:' + body
                    cb('Sorry! 接口数据格式不对');
                    logger('error').error(resBody);
                }
            }
            else {
                msg = '接口连接出错'
                cb('Sorry! 接口数据出错,状态' + res.statusCode);
                 logger('error').error(resBody);
            }
           
        });

    });

    req.on('error', function (e) {
        logger('error').error(opts.method + '  ' + opts.hostname + opts.path + ' ' + e);
        cb('数据接口访问超时')
    });

    //判断是否是post请求
    if (opts.method === 'post' && data) {
        req.write(dataStr + '\n');
    }
    req.end();
}

module.exports = {

    get: function (opts, callback) {
        //如果传递的是string则为单个path值，其他使用默认参数
        if (typeof opts === 'string') {
            var _path = opts;
            opts = {
                path: _path
            }
        }
        opts = utils.extends(opts, getOption)

        _request(opts, callback)
    },

    post: function (opts, data, callback) {
        var dataStr = '';
        if (typeof data === 'object') {
            try {
                dataStr = JSON.stringify(data);
            }catch (e) {
                
            }
        }
        if (typeof opts === 'string') {
            var _path = opts;
            opts = {
                path: _path
            }
        }
        //data=JSON.stringify(data);

        postOptions = utils.extends(postOptions, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Content-Length': Buffer.byteLength(dataStr, 'utf8')
            }
        });
        //合并参数
        opts = utils.extends(opts, postOptions);
        _request(opts, data, callback)
    }
}