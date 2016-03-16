define(function (require, exports, module) {
    var layerbox = require("./layerbox")('struc', {
        close: '.J-close'
    });


    function Comfirm(options) {
        if (!(this instanceof Comfirm)) return new Comfirm($m.merge(config, options));
        this.options = options;
        this.init();
    }

    Comfirm.prototype.init = function () {
        var opt = this.options,
            me = this;

        opt.floatBox = opt.floatBox || '#___COMFIRMFLOATBOX';

        if ($(opt.floatBox).size() == 0) {
            var str = '<div class="dialogue-common dianpuLayer" id="' + (opt.floatBox.slice(1)) + '"></div>';
            $(document.body).append(str);
        }

        this.container = $(opt.floatBox);

        this.container.html(['<div class="dia-header">',
            '<h3>' + opt.title + '<span class="dia-header-close ' + (opt.closeCls.slice(1)) + '">' +
            '<i class="icon-font">&#xe607;</i></span>' +
            '</h3>',
            '</div>',
            '<div class="dia-cont dianpu-fabu">',
            '<div class="leftFabu">',
            '<i class="big-icon changeFabu"></i>',
            '</div>' +
            '<div class="rightFabu">',
            '<p class="dianpu-tips">' + opt.message + '</p>',
            '<div class="dia-btn-div">',
            opt.comfirmText ? '<a class="btn ' + (opt.comfirmBtnCls.slice(1)) + '" href="javascript:;">' + opt.comfirmText + '</a>' : '',
            opt.cancelText ? '<a class="btn noactive ' + (opt.cancelBtnCls.slice(1)) + '" href="javascript:;">' + opt.cancelText + '</a>' : '',
            '</div>',
            '</div>',
            '</div>'
        ].join(''))

        $(this.options.trigger).one('click', function () {
            layerbox.alert(opt.floatBox);
        });

        $(opt.comfirmBtnCls, this.container).one('click', function () {
            opt.comfirmFun.call(me);
        });

        $(opt.cancelBtnCls, this.container).one('click', function () {
            me.close();
        });


        this.alert();
    }

    Comfirm.prototype.alert = function () {
        layerbox.alert(this.options.floatBox);
    }

    Comfirm.prototype.close = function () {
        layerbox.close();
    }

    var config = {
        trigger: '',
        message: '',
        floatBox: '',
        closeCls: '.J-close',
        comfirmBtnCls: '.comfirm',
        comfirmFun: function () {},
        comfirmText: '确定',
        cancelBtnCls: '.cancel',
        cancelText: '取消',
        title: '提示'
    }
    return Comfirm
})