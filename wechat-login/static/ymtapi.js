/* global wx, Requester */
'use strict';

window.YmtApi = {
    isWechat: true,
    /**
     * 打开窗口
     * @type function
     * @param  {object} options
     *       url:打开的地址
     *       isNew:是否新窗口打开
     *       title:窗口标题
     *       backType：[0|1] 默认：0 则采用goback网页内部
     *                  一级级返回到顶部触发关闭,1为直接关闭返回
     */
    open: function (options) {
        window.location.href = options.url;
    },
    /**
     * 打开分享面板
     * @type function
     * @param {object} options
     *        sharePicUrl   分享图片地址
     *        shareTip      分享内容
     *        shareTitle    分享标题
     *        shareUrl      分享的链接
     *
     */
    openShare: function (options) {
        var me = YmtApi;
        var shareConf = {};
        options = options || {};
        
        shareConf.title = options.shareTitle || '洋码头海外购';
        options.shareUrl && (shareConf.link  = options.shareUrl);
        shareConf.desc = options.shareTip || '购在全球，我们只做洋货';
        shareConf.imgUrl = options.sharePicUrl || 'http://static.ymatou.com//images/home/zbuy-logo-n.png';
        
        me.showShareMask();
        wx.onMenuShareTimeline(shareConf);
        wx.onMenuShareAppMessage(shareConf);
    },
    /**
     * 打开聊天列表
     * @param  {object} options
     *
     */
    openChatList: function (options) {

    },
    /**
     * 打开聊天详情
     * @param  {object} options
     *             SessionId
     *             ToId
     *             ToLoginId
     *             ToLogoUrl
     *
     */
    openChatDetail: function (options) {

    },
    /**
     * 预览图片接口
     * @param  {object} options
     *         urls     {array}  图片地址
     *         current  {number} 当前图片的索引值，对应urls中的数组坐标
     *
     */
    previewImage: function (options) {
        if (window.wxIsReady === true) {
            //微信图片预览
            wx.previewImage({
                current: options.urls[options.current], // 当前显示的图片链接
                urls: options.urls // 需要预览的图片链接列表
            });
        }
    },
    //打开支付面板
    openPay: function (tid, url) {
        url = url || window.location.href;
        window.location.href = 'http://wx.alpha.ymatou.com/Pay/wechat.html?tradingId=' + tid + '&ret=' + encodeURIComponent(url);
    },
    /**
     * 去登录
     *
     */
    toLogin: function (url) {
        url = url || window.location.href;
        window.location.href = 'http://wx.alpha.ymatou.com/WeChatLogin?ret=' + encodeURIComponent(url);
    },
    wxReady: function (opt) {

        var isAlpha = /alpha|localhost|file:/ig.test(location.href);
        var baseUrl = !isAlpha ? 'm.ymatou.com' : 'mobile.alpha.ymatou.com';
        var u = window.encodeURIComponent(window.location.href.split(/#/)[0]);

        var wxconf = {
            debug: false,
            appId: 'wxa06ebe9f39751792',
            timestamp: null,
            nonceStr: '',
            signature: '',
            shareConf: opt.shareConf || {
                title: '洋码头海外购',
                desc: '购在全球，我们只做洋货',
                //link: 'http://baidu.com',
                imgUrl: 'http://static.ymatou.com//images/home/zbuy-logo-n.png'
            },
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ]
        };


        Requester.JSONP('http://' + baseUrl + '/GetJsSignature.aspx?v=' + new Date().getTime() + '&appId=' + wxconf.appId + '&u=' + u, {
            callback: function (res) {
                res = res || {};
                if (!res.Signature || !res.TimeStamp || !res.NonceStr) return;
                wxconf['signature'] = res.Signature;
                wxconf['timestamp'] = res.TimeStamp;
                wxconf['nonceStr'] = res.NonceStr;
                wxconf['appId'] = res.AppId;

                wx.ready(function () {
                    // window.alert('www');
                });

                //callback && callback(wxconf);
                wx.config(wxconf);

                wx.onMenuShareTimeline(wxconf.shareConf);
                wx.onMenuShareAppMessage(wxconf.shareConf);
                // window.alert('www');
            }
        });

    },
    showShareMask: function () {
        var mask = document.getElementById('ymtapiWechatMask');
        if (!mask) {
            mask = document.createElement('div');
            mask.className = 'wechat-mask show';
            mask.id = 'ymtapiWechatMask';
            mask.innerHTML = '<div style="position:fixed;z-index:9999;left:0px;top:0px;width:100%;text-align:center;background-color: rgba(20, 20, 20, 0.95);height: 100%;"><img width="90%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAicAAAHjCAYAAAD4wb/iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3QzMwN0IyMjBFMjE2ODExODIyQUM4NjQ0OUY2OTNGNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQkNFQTgzMzBBOTMxMUU1QjJGMERBMjIyNjFFNzQyQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBQkNFQTgzMjBBOTMxMUU1QjJGMERBMjIyNjFFNzQyQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MDZkYzY0ZC04ZThmLTRjMWUtOTI4Zi0zZjE1ZDlmOWY5ODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0MzMDdCMjIwRTIxNjgxMTgyMkFDODY0NDlGNjkzRjUiLz4gPC9yZGY6RGVz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" /></div>';
            
            (document.body || document.documentElement).appendChild(mask);
        }
        mask.onclick = function () {
            this.style.display = 'none';
        };

        mask.style.display = 'block';
    }
};

if (typeof window.ymtapiCallback !== 'undefined' && Object.prototype.toString.call(window.ymtapiCallback) === '[object Function]') {
    window.ymtapiCallback();
}