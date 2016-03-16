'use strict';
var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var uuid = require('node-uuid');
var config = require('../../config');
var pageProxy = require('../../proxy').Page;
var UploadIdCardProxy = require('../../proxy').UploadIdCard;
//var request = require('request');
var path = require('path');
//var url = require('url');
var UploadFile = require('../../util').UploadFile;
var redirectUrl = 'http://m.ymatou.com';

/**
 * 保存上传信息
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function saveUploadInfo(data, callback) {
    data.RightSidePic = data.uploadResults[0];
    data.ReverseSidePic = data.uploadResults[1];
    delete data.uploadResults;
    UploadIdCardProxy.saveUploadInfo(data, function(result) {
        callback(result);
    });
}
module.exports = {

    selectUser: function(req, res) {

        var view = config.viewModule;
        view.error = req.flash('error').toString();

        var userid = req.query.userid ? req.query.userid : '';
        var name = typeof req.query.name == 'object' ? req.query.name.splice(',') : (req.query.name ? req.query.name : '');
        var mobile = typeof req.query.mobile == 'object' ? req.query.mobile.splice(',') : (req.query.mobile ? req.query.mobile : '');
        var businessid = typeof req.query.businessid == 'object' ? req.query.businessid.splice(',') : (req.query.businessid ? req.query.businessid : '');
        var type = req.query.type ? req.query.type : '';
        var action = req.query.action ? req.query.action : '';

        var returnUrl = req.query.ret;


        req.session.isHasRedirect = !!returnUrl;

        req.session.returnUrl = returnUrl || redirectUrl;


        console.log(req.session.returnUrl, 0);

        view.userArr = [];
        view.info = {
            userid: userid,
            type: type,
            action: action
        };

        if (typeof name == 'object') {

            var id = Math.ceil(Math.random() * (name.length - 1));
            view.userArr.push({
                name: decodeURIComponent(name[id]),
                mobile: mobile[id],
                businessid: businessid[id]
            });
        } else if (name !== '') {

            view.userArr.push({
                name: decodeURIComponent(name),
                mobile: mobile,
                businessid: businessid
            });
        }

        if (view.userArr.length > 0) {
            req.session.userArr = view.userArr;
        }


        res.render('index', view);
    },

    addCardId: function(req, res) {
        var view = config.viewModule;

        console.log(req.session.returnUrl, 1111);

        var userid = req.query.userid ? req.query.userid : '';
        var name = req.query.name ? decodeURIComponent(req.query.name) : '';
        var businessid = req.query.businessid ? req.query.businessid : '';
        var mobile = req.query.mobile ? req.query.mobile : '';
        var type = req.query.type ? req.query.type : '';
        var action = req.query.action ? req.query.action : '';

        view.info = {
            userid: userid,
            name: name,
            mobile: mobile,
            businessid: businessid,
            type: type,
            action: action
        };

        view.error = req.flash('error').toString();

        if (action == 'update') {

            res.render('add_cardid', view);

        } else {

            pageProxy.checkCardId({
                userid: userid,
                name: name,
                mobile: mobile
            }, function(doc, status) {

                console.log(doc, status);
                //如果身份证已经上传
                if (doc.Data.Result === true) {
                    req.flash('error', '身份证已经上传，您现在暂无需上传身份证的订单');
                    var redVal = '';

                    for (var i in req.session.userArr) {
                        if (req.session.userArr[i].name == name) {
                            req.session.userArr.splice(i, 1);
                        }
                    }

                    for (var s in req.session.userArr) {
                        redVal += '&name=' + decodeURIComponent(req.session.userArr[s].name) + '&mobile=' + req.session.userArr[s].mobile + '&businessid=' + req.session.userArr[s].businessid;
                    }

                    if (redVal !== '') {
                        res.redirect('/?userid=' + userid + redVal + '&type=' + type);
                    } else {
                        res.redirect('/');
                    }
                } else { //身份证不存在
                    res.render('add_cardid', view);
                }
            });
        }
    },

    post_addCardId: function(req, res) {


        var view = config.viewModule;
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, f, file) {

            var FormObj = {
                userid: f.userid ? f.userid : '',
                name: f.name ? f.name : '',
                mobile: f.mobile ? f.mobile : '',
                businessid: f.businessid ? f.businessid : '',
                type: f.type ? f.type : '',
                action: f.action ? f.action : '',
                cardid: f.cardid ? f.cardid : ''
            };

            view.info = FormObj;

            if (FormObj.action != 'update') {

                pageProxy.checkIsUser(FormObj, function(result) {
                    if (typeof result != 'string') {
                        res.render('upload_cardid', view);
                    } else {
                        req.flash('error', result);
                        res.redirect(req.headers['referer']);
                    }
                });

            } else {
                res.render('upload_cardid', view);
            }

        });

    },


    //提交完成
    complete: function(req, res) {

        var view = config.viewModule;
        var form = new formidable.IncomingForm();
        view.error = req.flash('error').toString();
        var redVal = '';

        console.log(req.session.returnUrl, 222);

        view.isHasRedirect = req.session.isHasRedirect;

        view.reurl = req.session.returnUrl;
        res.render('complete', view);
        //console.log(view);
        // form.parse(req, function(err, f, file) {
        //     var FormObj = {
        //         userid: f.userid ? f.userid : '',
        //         name: f.name ? f.name : '',
        //         mobile: f.mobile ? f.mobile : '',
        //         businessid: f.businessid ? f.businessid : '',
        //         type: f.type ? f.type : '',
        //         action: f.action ? f.action : '',
        //         cardid: f.cardid ? f.cardid : '',
        //         rightsidepic: f.rightsidepic ? f.rightsidepic : '',
        //         reversesidepic: f.reversesidepic ? f.reversesidepic : ''
        //     };

        //     if (FormObj.action != 'update') {

        //         pageProxy.saveCardId(FormObj, function(result) {

        //             console.log(result, 333);

        //             if (typeof result != 'string') {

        //                 for (var i in req.session.userArr) {
        //                     if (req.session.userArr[i].name == FormObj.name) {
        //                         req.session.userArr.splice(i, 1);
        //                     }

        //                 }



        //                 if (!view.isHasRedirect) {
        //                     for (var s in req.session.userArr) {

        //                         redVal += '&name=' + req.session.userArr[s].name + '&mobile=' + req.session.userArr[s].mobile + '&businessid=' + req.session.userArr[s].businessid;

        //                     }


        //                     if (redVal !== '') {

        //                         view.reurl = '/?userid=' + FormObj.userid + redVal + '&type=' + FormObj.type;

        //                     } else {
        //                         view.reurl = redirectUrl;
        //                     }
        //                 }


        //                 console.log(view.reurl, 333);

        //                 res.render('complete', view);


        //             } else {

        //                 res.redirect(req.headers['referer']);

        //             }

        //         });
        //     } else {
        //         pageProxy.updateCardId(FormObj, function(result) {
        //             if (typeof result != 'string') {
        //                 res.render('complete', view);
        //             } else {
        //                 req.flash('error', result);
        //                 res.redirect(req.headers['referer']);
        //             }
        //         });
        //     }
        // });

    },
    post_upload: function(req, res) {
        var obj = {
                userId: req.body.userid.trim(),
                name: req.body.name.trim(),
                mobile: req.body.mobile.trim(),
                businessId: req.body.businessid.trim(),
                type: '1',
                cardId: req.body.cardid.trim(),
                uploadResults: []
            },
            callback = function(result) {
                var resObj = {};
                if(result === true){
                    resObj.Status = 200;
                    resObj.msg = "上传成功！"
                }else{
                    resObj.Status = -1;
                    resObj.msg = result
                }
                res.send(resObj);
            };

        var arrFile = SaveUploadFile(req)[0]['idCardPic'];
        var files = arrFile,
            hasError = null,
            uploadNum = 0;

        if (arrFile.length === 0) {
            res.send('上传图片出错:没有选择上传的图片');
        } else {
            for (var f in files) {
                if (typeof files[f] !== 'object') continue;
                var file = files[f];
                if (file.size > 4000000) {
                    res.send('图片超过4M，重新上传');
                    DeleteUploadFile(file.path);
                    break;
                } else {
                    UploadFile.uploadToServer({
                            url: '/api/IdCardManage/UploadIdCardPic?userId=' + obj.userId,
                            fileName: files[f].name,
                            filePath: files[f].path,
                            fileType: files[f].type
                        },
                        function(err, data) {
                            try {
                                data = JSON.parse(data);
                            } catch (e) {
                                err = e.toString();
                            }
                            data = data || {};
                            if (err || (data.Code != 200)) {
                                hasError = hasError || {};
                                hasError.status = data.Code || 500;
                                hasError.msg = err || data.Msg;  
                            }else{
                                //保存上传信息
                                obj.uploadResults.push(data.Data.IdCardDecryptUrl);
                            }

                            if(++uploadNum === 2 && hasError){
                                res.send(hasError);
                                return;
                            } 

                            
                            //只有两个上传的身份都上传成功才执行保存操作
                            if (obj.uploadResults.length == 2) {
                                saveUploadInfo(obj, callback);
                            }
                            

                        });
                }
            }
        }
    },

    info: function(req, res) {
        var view = config.viewModule;
        view.col = req.params.col;
        res.render('info', view);
    }
};

//保存express上传的文件
//req express request
function SaveUploadFile(req) {
    var upfile = req.files;
    //var arrFile = [];

    if (upfile !== undefined) {
        var files = [];
        if (upfile instanceof Array) {
            files = upfile;
        } else {
            files.push(upfile);
        }

        for (var i = 0; i < files.length; i++) {

            var filename = '';
            for (var f in files[i]) {
                filename = f;
            }
            var file = files[i][filename];

            var tmppath = file.path;

            var name = uuid.v1().replace(/-/g, '') + path.extname(tmppath); //file.name;

            //var filesize = file.size;

            //var userid = file.userid;

            file.filename = name;
            file.filepath = tmppath;

            //arrFile.push({filename: name, filepath:  tmppath, filesize: filesize, userid: userid});
            //arrFile.push(upfile);

        }

        return files;
    }

    return null;
    //return upfile;
}

//删除上传文件
function DeleteUploadFile(filepath) {
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath, function(err) {
            if (err) {
                console.log('DeleteUploadFile：' + err.message);
            }
        });
    }
};