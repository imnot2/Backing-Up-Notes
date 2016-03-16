define(function (require, exports, module) {

    var config = {
        uploadTrigger: '',
        loadActionUrl: '',
        uploadLimit: 5,
        fileSizeLimit: '5000KB',
        start: null,
        error: null,
        progress: null,
        success: null,
        allSuccess: null,
        _swfUrl: $m.isOnline ? "http://staticshop.ymatou.com/js/lib/uploadify/uploadify.swf" : "http://staticshop.alpha.ymatou.com/js/lib/uploadify/uploadify.swf"
    };

    function BatchUpLoad(options) {
        if (!(this instanceof BatchUpLoad)) return new BatchUpLoad($m.merge(config, options));

        var _batchFiles = [];

        function getFileIndex(file) {
            var fileIndex = 0;
            for (var i = 0; i < _batchFiles.length; i++) {
                if (_batchFiles[i] == file) {
                    fileIndex = i + 1;
                    break;
                }
            }
            return fileIndex;
        }

        $(options.uploadTrigger).uploadify({
            'formData': options.formData,
            'width': 120,
            'height': 26,
            'buttonText': '批量上传图片',
            'swf': options._swfUrl,
            'uploader': options.loadActionUrl,
            'fileSizeLimit': options.fileSizeLimit,
            'onDialogClose': function (queueData) {
                if (queueData.filesSelected > options.uploadLimit) {
                    $(options.uploadTrigger).uploadify('cancel', '*');
                }
            },
            'onDialogOpen': function () {
                _batchFiles = [];
            },
            'onUploadStart': function (file) {
                index = _batchFiles.length + 1;
                options.start && options.start(file);
                _batchFiles[_batchFiles.length] = file.name;
            },
            'onUploadProgress': function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                var index = getFileIndex(file.name);
                options.progress && options.progress(bytesUploaded, bytesTotal, index);
            },
            'onUploadSuccess': function (file, data, response) {
                var index = getFileIndex(file.name);
                //options.success && options.success(data);
            },
            'onQueueComplete': function (queueData) {
                options.success && options.success(queueData);
                _batchFiles = [];
            }
        });

    }



    return BatchUpLoad;

})