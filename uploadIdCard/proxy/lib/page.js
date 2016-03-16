var http = require('http');
var config = require('../../config');
var querystring = require('querystring');
module.exports = {
    checkCardId: function(obj, callback) {


        var option = {
            hostname: config.ApiServer.host,
            port: config.ApiServer.port,
            path: "/api/IdCardManage/IdCardExists?userid=" + obj['userid'] + "&name=" + encodeURIComponent(obj['name']) + "&mobile=" + obj['mobile'],
            method: 'GET'
        };

        var reqs = http.request(option, function(ress) {
            var body = '';
            ress.setEncoding('utf8');
            ress.on('data', function(data) {
                body += data;
            }).on('end', function() {
                //console.log(body);
                if (ress.statusCode == 200) {

                    body = JSON.parse(body);
                    callback(body, body.Code);
                    //if (body.Status == '200' && !body.Result) { //body['Result'
                    //    //if (!body.Result) {
                    //    //    callback(body); //可以上传
                    //    //} else {
                    //    //    callback(body.Msg);
                    //    //}
                    //    callback(body); //可以上传
                    //} else {
                    //    callback(body.Msg);
                    //}
                } else {
                    //console.log(body)
                    callback("request error:" + ress.statusCode);
                }

            });
        });

        reqs.on('error', function(e) {
            callback("" + e.message);
        });

        reqs.end();
    },

    checkIsUser: function(obj, callback) {
        var query = "?userid=" + obj['userid'] + "&name=" + encodeURIComponent(obj['name']) + "&mobile=" + obj['mobile'] + "&businessId=" + obj['businessid'] + "&type=" + obj['type'];

        var option = {
            hostname: config.ApiServer.host,
            port: config.ApiServer.port,
            path: "/api/IdCardManage/RecipientExists" + query,
            method: 'GET'
        };

        var reqs = http.request(option, function(ress) {
            var body = '';
            ress.on('data', function(data) {
                body += data;
            }).on('end', function() {
                body = JSON.parse(body);
                if (body.Code == '200') { //body['Result']
                    callback(body);
                } else {
                    callback(body.Msg);
                }

            });
        });

        reqs.end();
    },

    saveCardId: function(obj, callback) {
        var postDate = querystring.stringify(obj);
        var body = '';
        var boundaryKey = '----' + new Date().getTime();
        var option = {
            host: config.ApiServer.host,
            port: config.ApiServer.port,
            path: "/api/IdCardManage/SaveIdCardInfo",
            method: 'POST',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Content-Length": postDate.length,
                'Connection': 'keep-alive'
            }
        };
        var reqs = http.request(option, function(ress) {
            ress.setEncoding('utf8');
            ress.on('data', function(data) {
                body += data;
            }).on('end', function() {
                body = JSON.parse(body);
                if (body.Code == '200') { //body['Result']
                    callback(body);
                } else {
                    callback(body.Msg);
                }

            });
        });
        reqs.write(postDate + "\n");
        reqs.end();
    },

    updateCardId: function(obj, callback) {

        var postDate = querystring.stringify(obj);
        var body = '';
        var boundaryKey = '----' + new Date().getTime();
        var option = {
            host: config.ApiServer.host,
            port: config.ApiServer.port,
            path: "/api/IdCardManage/UpdateIdCardInfo",
            method: 'POST',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Content-Length": postDate.length,
                'Connection': 'keep-alive'
            }
        };
        var reqs = http.request(option, function(ress) {
            ress.setEncoding('utf8');
            ress.on('data', function(data) {
                body += data;
            }).on('end', function() {
                body = JSON.parse(body);
                if (body.Code == '200') { //body['Result']
                    callback(body);
                } else {
                    callback(body.Msg);
                }

            });
        });
        reqs.write(postDate + "\n");
        reqs.end();
    }
}