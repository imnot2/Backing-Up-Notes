define(function (require, exports, module) {
    exports.struc = function () {
        var template = '<div class="floatbox none"><div class="floatbox-backdrop"></div><div class="floatbox-content"><!--运费详情--><div class="cost-detail"><div class="c-d-title"><span class="fl">运费详情</span><span class="icon-font-moon fr"></span></div><div class="c-d-content" id="transferTemplateDetail">首公斤8.00元, 续3.00元/公斤</div></div><!--<div class="ui-msg">消息提示</div>--><!--<div class="ui-msg-err">错误提示</div>--></div></div>';
    }
    exports.alert = function (info , options) {
        var config = $m.mix({
            error: 'ui-msg-err',
            prompt: 'ui-msg',
            isIntensity: !1,
            closeTime:0,
            callback:null
        }, options);

        var infoclass = config.isIntensity ? config.error : config.prompt, that = this;

        var template = '<div class="floatbox none" id="__floatLayerBoxAlert"><div class="floatbox-content"><div class="msg"></div></div></div>';
        if (!this.AlertElement) {
            var div = document.createElement('div');
            div.innerHTML = template;
            document.body.appendChild(div.children[0]);

            this.AlertElement = document.getElementById('__floatLayerBoxAlert');

            function close(){
                $m.node.removeClass(that.AlertElement, 'show');
                config.callback && config.callback();
            }


            this.AlertElement.addEventListener('click', function (e) {
                close()
            }, !1);

            if(config.closeTime){
                $m.later(function(){
                    close()
                },config.closeTime*1000)
            }

            div = null;
        }
        var msg = $m.node(this.AlertElement).find('.msg');
        msg[0].className = "msg " + infoclass;
        msg.html(info);
        $m.node.addClass(this.AlertElement, 'show');
    }
    exports.temp = function () {

    }
})