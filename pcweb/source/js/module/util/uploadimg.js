define(function (require, exports, module) {

    function UpLoad(options) {
        if (!(this instanceof BatchUpLoad)) return new UpLoad($m.merge(config, options));
        this.options = options;

        if (options.uploadFieldBtn && options.uploadAction) {
            this.init(options);
        }
    }

    var config = {
        uploadField: '',
        uploadAction: '',
        start: null,
        error: null,
        progress: null,
        success: null
    };

    $m.augment(UpLoad, {
        init: function () {
            var opt = this.options;
            $(opt.uploadField).live('change', function () {
                $(this).ajaxFileUpload({
                    fileElementId: opt.uploadField,
                    url: opt.uploadAction,
                    success: opt.success
                })
            })
        }
    });

})