'use strict';
/**
 * 上传工具方法
 */
var crypto = require('crypto'),
	http = require('http'),
	fs = require('fs');

var config = require('../../config');

var BOUNDARY = 'YmtapoFormBoundary',
	SERVER_UPLOAD_PATH = '/BHUploadFile.ashx?type=IdCard&bhkey=bh051986943966&autoName=false&fname=';

function getBoundary() {
	return '----'+BOUNDARY + getMd5("" + new Date().getTime());
}

function getMd5(data) {
	return crypto.createHash('md5').update(data).digest('hex');
}
//删除上传文件
function deleteTempFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath, function(err) {
            if (err) {
                console.log('删除临时文件失败' + err.message);
            }
        });
    }
}
module.exports = {
	/**
	 * 上传文件到文件服务器
	 * @param  {object} 
	 *   {string} url         文件服务器URL
	 *   {string} filename    文件名称
	 *   {string} filepath    文件路径
	 *   {string} filetype    文件类型
	 * @param  {funtion} callback 回调函数
	 * @return {[type]}             [description]
	 */
	uploadToServer: function(uploadOpts,callback) {
		var boundaryKey =  getBoundary(),
			options = {
		        host: config.uploadhost,
		        port: config.uploadport,
		        method: 'POST',
		        path: uploadOpts.url,
		        headers: {
		            'Content-Type': 'multipart/form-data; boundary=' + boundaryKey,
		            'Connection': 'keep-alive'
		        }
		    },
		    body;//multipart/form-data
	    var req = http.request(options, function(res) {
	        res.setEncoding('utf8');
	        res.on('data', function(chunk) {
	            body = chunk;
	        });
	        res.on('end', function() {    
	        	console.log(body)       
	            if (body != '') {
	            	deleteTempFile(uploadOpts.filePath)
	                callback(null, body);
	            } else {
	                callback(new Error('上传失败,' + body));
	            }
	        });
	    });
	    
	    req.on('error', function(e) {
	    	console.log('上传图片失败' + e.message);
	    	callback && callback(e)
	    });

	    req.write(
	    	'--' + boundaryKey + '\r\n' +
	    	'Content-Disposition: form-data; name="UserId"\r\n\r\n' +
	    	'4085'+'\r\n'+
	        '--' + boundaryKey + '\r\n' +
	        'Content-Disposition: form-data; name="idCardPic"; filename="'+uploadOpts.fileName+'"\r\n' +
	        'Content-Type: ' + uploadOpts.fileType +'\r\n\r\n'	        
	    );
	    //设置1M的缓冲区
	    var fileStream = fs.createReadStream(uploadOpts.filePath, { bufferSize: 1024 * 1024 });
	    fileStream.pipe(req, { end: false });
	    fileStream.on('end', function() {
	        req.end('\r\n--' + boundaryKey + '--');
	    });
	}
}