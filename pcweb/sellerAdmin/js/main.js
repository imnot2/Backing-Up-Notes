/*
* 主脚本
* 全站引用
*/
var isLogined = 1,
    isSeller = 1;
$m.load(['widget/layerbox','widget/comfirm','widget/floatBtn'], function (LayerBox,pop,floatBtn) {
    var layerbox = LayerBox('struc', {
        close: '.J-close'
    });
    
    var ua = navigator.userAgent.toLowerCase();
    var IE = "";
    if (window.ActiveXObject) {
        IE = ua.match(/msie ([\d.]+)/)[1];
        if (IE <= 7) {
            $('.ieversion-tips').hide();
            var _msg='为保证功能完整，请使用IE7版本以上浏览器或Chrome等其它主流浏览器。<a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank" class="ie-down-new">下载最新版IE</a>';
            pop.comfirmPop(ResourceJS.SellerOrder_Common_Alert_msg_Prompt,_msg,'error',{comfirm:"继续使用"});
        }
    }

    floatBtn()
}); 