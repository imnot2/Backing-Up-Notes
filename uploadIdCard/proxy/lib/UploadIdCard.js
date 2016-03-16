'use strict';
/**
 * 上传身份证
 */
var querystring = require('querystring');

var requestUtil = require('../../util').Request;


module.exports = {
    /**
     * 检查上传身份证状态
     * @param  {object} data
     *           {string} UserId
     *           {String} Name
     *           {String} Mobile
     * @param  {function} callback
     * @return {string}     当前收件人的上传状态
     */
    checkUploadStatus: function(data, callback) {
        requestUtil.get("/api/IdCardManage/IdCardExists?userid=" + data.UserId + "&name=" + encodeURIComponent(data.Name) + "&mobile=" + data.UserId, callback);
    },
    /**
     * 保存上传身份证信息
     * @param  {[type]}   data     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    saveUploadInfo: function(data, callback) {
        var option = {
            path: "/api/IdCardManage/SaveIdCardInfo",
            headers: {
                "content-type": 'application/x-www-form-urlencoded',
                "content-length": Buffer.byteLength(JSON.stringify(data), 'utf8'),
                'connection': 'keep-alive'
            }
        };
        requestUtil.post(option, data, callback);
    },
    /**
     * 更新上传身份证信息
     * @param  {[type]}   data     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    updateUploadInfo: function(data, callback) {

    }
}