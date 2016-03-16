define(function (require, exports, module) {
    function main(options) {
        if (!(this instanceof main)) return new main($m.merge(config, options));
        this.config = options;
        this.__id = 'SLIDE' + parseInt(Math.random() * 10e5);
        this.state = 0;
        this._init();
    }
    $m.augment(main, {
        _init: function () {
            //遮罩
            var that = this;
            this._mask();
            function toggle(){
                that.toggle();
            }
            $m.node(this.config.trigger).bind('click', toggle);
            this.trigger.bind('click', toggle);
            this.content.html(this.config.html);
        },
        _mask: function () {
            //var mainid = this.__id + '_main';
            //$m.node(this.config.panel).html('<div id="' + this.__id + '" class="clearfix mod-sideslide slideright out"><div class="trigger"><span>>></span><i></i></div><div class="fix main" id="' + mainid + '"></div></div>');
            //this.dialog = $m.node('#' + this.__id);
            //this.content = $m.node('#' + mainid);
            //this.trigger = this.dialog.find('.trigger');

            var div = document.createElement('div'), mainid = this.__id + '_Main';
            $m.node.attr(div, 'id', this.__id);
            div.className = "clearfix mod-sideslide slideright out";
            div.innerHTML = '<div class="trigger"><span>>></span><i></i></div><div class="fix main" id="' + mainid + '"></div>';
            $m.node.append(this.config.panel ? $m.node(this.config.panel)[0] : (document.body || document.documentElement), div);
            this.dialog = $m.node('#' + this.__id);
            this.content = $m.node('#' + mainid);
            this.trigger = this.dialog.find('.trigger');
            div = null;
        },
        open: function () {
            $m.node.removeClass(this.dialog[0], this.config.hide);
            $m.node.addClass(this.dialog[0], this.config.show);
            if (this.state == 0) {
                this.config.aftershow.call(this);
            }
            this.state = 1;
        },
        close: function () {
            this.state = 0;
            $m.node.removeClass(this.dialog[0], this.config.show);
            $m.node.addClass(this.dialog[0], this.config.hide);
        },
        toggle: function () {
            if (!this.state) {
                this.config.beforeshow.call(this);
                this.open();
            } else {
                this.close();
            }
        }
    })
    var config = {
        panel:'',
        trigger: '',
        html: '',
        eventType: 'click',
        show: 'in',
        hide: 'out',
        beforeshow: function () {

        },
        aftershow: function () {

        }
    }
    return main;
})