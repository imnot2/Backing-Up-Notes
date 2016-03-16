/*
 * 浮动窗体
 * create by:river
 * create date ： 2014/10/16
 * update date ： 2014/11/25
 */
var online = new Array();

Ymt.add(function (require, exports, module) {

    var Cookie = require('util/cookie')

    //默认选项
    var defOptions = {
        //selector:"",
        isAlwaysShow: false, //是否是始终显示
        minHeight: 400, //最小显示高度
        style: '',
        isCreate: true,
        isQuestion: true, // 问卷调查
        hideElm: ".ico-backtop",
        onLineQQ: "800076056", // 此qq号不使用了
        qqScriptUrl: "http://wpa.b.qq.com/cgi/wpa.php?key=XzgwMDA3NjA1Nl8yMDU2ODFfODAwMDc2MDU2Xw",
        onLineQQBuyer: "800005150", // 用此qq在线联系
        qqScriptUrlBuyer: "http://wpa.b.qq.com/cgi/wpa.php?key=XzgwMDAwNTE1MF8yMzAzMjdfODAwMDA1MTUwXw",
        initFn: function () {

        },
        //isHideBcakTop:true,
        btns: { //按钮组，按数组下标生成;可以传入对象和内置按钮名称
            //    'backTop':{},
            //    //'support':
            //    {
            //        cls: ''
            //        //trigger:

            //        }
        } //],
        //customs: [//定制
        //    {
        //        html:""
        //    }
        //]
    }

    /**
     * @param selector {String} JqSeleter
     * @param options {Object}
     *
     */
    var Widget = function (options) {
        this.opts = defOptions;
        var agr = arguments;
        //处理最后一个参数 如果是options，则和默认参数合并
        if (typeof agr[0] != "string") {
            this.opts = $m.merge(defOptions, options)
        }

        this.init(options && options.selector);
    }
    Widget.VERSION = "1.1.5";

    Widget.prototype = {
        init: function (selector) {
            var $target;
            //如果传入选择器 则只启动浮窗
            if (selector) {
                $target = $(selector);
                this.elm = $target;
            }
            else {
                //如果没有传入选择器，取默认对象，没有则创建
                $target = $("#J-FloatBtn");
                if (!$target[0]) {
                    $target = $('<div class="backtop" id="J-FloatBtn"></div>').appendTo("body");
                }
                this.elm = $target;
            }

            //自定义
            var customs = this.opts.customs;
            if (this.opts.customs && this.opts.customs.length) {
                for (var i = 0; i < customs.length; i++) {
                    customs[i]["html"] && $target.append(customs[i]["html"]);
                }
            }

            this.opts.initFn && this.opts.initFn(this.elm)

            if (this.opts.isCreate)
                this.create();

            if (!this.opts.isHideBcakTop) {
                $target.append('<a class="ico ico-backtop"></a>');
            }

            // 添加"问卷调查" 只有首页才有"问卷调查"
            if (this.opts.isQuestion && (location.pathname == '/')) {
                this.addQuestion();

            }

            this.bind();
        },
        judgeUser: function (callback) {
            var isAlpha = /\.alpha\.ymatou.com|localhost/.test(location.href);
            var _instanceUrl = isAlpha ? "http://top.alpha.ymatou.com" : "http://top.ymatou.com";
            $.ajax({
                url: _instanceUrl + "/shared/GetUserIdAndType",
                dataType: "jsonp",
                success: function (data) {
                    try {
                        if (data && data.iUserId > 0) {
                            callback(data)
                        }
                    }
                    catch (e) {}
                }
            });
        },
        create: function () {
            var that = this,
                groupIco;
            this.judgeUser(function (data) {

                //买家登录也改成QQ客服 start 
                var isSeller = data.iType > 0,
                    qq, scriptUrl;

                // if (isSeller) {
                //     qq = that.opts.onLineQQ;
                //     scriptUrl = that.opts.qqScriptUrl;
                // }
                // else {
                qq = that.opts.onLineQQBuyer;
                scriptUrl = that.opts.qqScriptUrlBuyer;
                // }
                groupIco = $('<span class="group-ico group-qq" id="J-fl-qq"></span>');
                that.elm.append(groupIco);
                $.getScript('http://webpresence.qq.com/getonline?type=1&' + qq + ":", function () {
                    if (online[0] == 1) {
                        // groupIco.append('<a href="tencent://message/?uin=' + qq + '&amp;Site=有事Q我&amp;Menu=yes"><i class="ico ico-qq"></i><i class="txt">码头官方客服</i></a><span class="qq-ymt-tips"><b>服务时间：周一至周五（9:00-18:00）</b><i class="right_triangle"></i></span></a>');
						groupIco.append('<a target="_blank" href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAwNTE1MF8yNzQ2OTlfODAwMDA1MTUwXzJf"><i class="ico ico-qq"></i><i class="txt">码头官方客服</i></a><span class="qq-ymt-tips"><b>服务时间：周一至周五（9:00-18:00）</b><i class="right_triangle"></i></span></a>');
                    }
                    else {
                       // groupIco.append('<a href="tencent://message/?uin=' + qq + '&amp;Site=有事Q我&amp;Menu=yes"><i class="ico ico-qq"></i><i class="txt">客服不在</i></a><span class="qq-ymt-tips"><b>服务时间：周一至周五（9:00-18:00）</b><i class="right_triangle"></i></span></a>');
						groupIco.append('<a target="_blank"  href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAwNTE1MF8yNzQ2OTlfODAwMDA1MTUwXzJf"><i class="ico ico-qq"></i><i class="txt">客服不在</i></a><span class="qq-ymt-tips"><b>服务时间：周一至周五（9:00-18:00）</b><i class="right_triangle"></i></span></a>');
                    }
                });

                /*if (!$("#qq-link")[0]) {
                    $("<div id='qq-link' style='display:none;'></div>").appendTo('body');
                    //$("#qq-link").append("<script src='"+scriptUrl+"' charset='utf-8' type='text/javascript' async='true' defer='true'>");
                    var scriptBlock = document.createElement("script");
                    scriptBlock.src = scriptUrl;
                    scriptBlock.async = true;
                    scriptBlock.defer = true;
                    scriptBlock.charset = "utf-8";
                    scriptBlock.type = "text/javascript";
                    document.getElementById("qq-link").appendChild(scriptBlock);
                }*/
                //买家登录也改成QQ客服 end 

                //卖家登录是QQ，买家登录是live800 start 
                // if(data.iType>0 || that.opts.btns["qq"]){
                //     groupIco = $('<span class="group-ico group-qq" id="J-fl-qq"></span>');
                //     that.elm.append(groupIco);
                //     $.getScript('http://webpresence.qq.com/getonline?type=1&'+that.opts.onLineQQ+":", function () {
                //         if (online[0] == 1) {
                //             groupIco.append('<a target="_blank" href="javascript:;"><i class="ico ico-qq"></i></a><i class="txt">在线客服</i>');
                //         } else {
                //             groupIco.append('<a target="_blank" href="javascript:;"><i class="ico ico-qq"></i></a><i class="txt">客服不在</i>');
                //         }
                //     });

                //     if(!$("#qq-link")[0]){
                //         $("<div id='qq-link' style='display:none;'></div>").appendTo('body');
                //         var scriptBlock=document.createElement("script");
                //             scriptBlock.src= that.opts.qqScriptUrl;
                //             scriptBlock.async=true;
                //             scriptBlock.defer=true;
                //             document.getElementById("qq-link").appendChild(scriptBlock);
                //     }
                // }else{
                //     $('#live800SrcTest').one('load', function () {
                //         console.log($('#live800SrcTest').attr('src'))
                //     })
                //     var path = $m.load.config.base;

                //     var url = 'http://chat8.live800.com/live800/SurferServer?cmd=111&companyID=151404&online=' + path + 'scripts%2Flive800%2F_callbackonline.js&offline=' + path + 'scripts%2Flive800%2F_callbackoffline.js&skillId=7596&tm=1408689852884&random='+Math.random();

                //     groupIco = $('<a class="group-ico " id="J-fl-support"></a>');
                //     that.elm.append(groupIco);

                //     $.ajax({
                //         dataType: 'jsonp',
                //         url: url,
                //         jsonpCallback: 'CALLBACK',
                //         success: function (data) {
                //             try{
                //                 if(data==1){
                //                     groupIco.append('<i class="ico ico-support"></i><i class="txt support">在线客服</i>')
                //                 }else{
                //                     groupIco.append('<i class="ico ico-support-off-line"></i><i class="txt support">客服不在</i>')
                //                 }
                //             } catch (e) {}
                //         }
                //     })
                // }
                //卖家登录是QQ，买家登录是live800 end 
            })
        },
        addQuestion: function () { // 问卷调查按钮添加
            var questionIcon = $('<span class="group-ico J_wen group-question" id="J-fl-question"><i class="diaocha J_wen" >问卷调查</i></span>');
            this.elm.append(questionIcon);

        },
        bind: function () {
            var that = this;
            this.elm.click(function (event) {
                event = event || window.event;
                $target = $(event.target || event.srcElement);
                var classcls = $target.attr('class');

                if (/backtop/g.test(classcls)) {
                    backTop();
                }
                else if (/support/g.test(classcls)) {
                    support();
                }
                else if (/qq/g.test(classcls)) {
                    //暂时使用这种变通方法
                    // $($("#qq-link iframe")[0].contentWindow.document).find("#launchBtn").click()
                    //$(document.body).append("<iframe src='http://wpa.qq.com/msgrd?v=3&amp;uin=800076056&amp;site=qq&amp;menu=yes' style='display:none'></iframe>")
                }
                else if (/J_wen/g.test(classcls)) {

                    gotoQuestionLinkUrl();
                }
                return !0
            });
            $("#J-fl-support").live('click', function () {
                support();
            });

            $('#J-fl-qq').live('mouseenter', function () {
                $('.qq-ymt-tips').css({
                    right: '120%',
                    opacity: 1
                });
            });

            $('#J-fl-qq').live('mouseleave', function () {
                $('.qq-ymt-tips').css({
                    right: '',
                    opacity: 0
                });
            });

            if (!this.opts.isAlwaysShow) {
                this.elm.find(that.opts.hideElm).hide();
                show();
                $(window).scroll(function () {
                    show()
                });
            }
            else {
                floatBtn.show();
            }
            //
            function show() {
                    //第一种匹配模式 ：滚动条到底部
                    var body = document.documentElement || document.body,
                        scrollTop = body.scrollTop || document.body.scrollTop,
                        minHeight = that.opts.minHeight || 0
                    if (scrollTop > minHeight) {
                        that.elm.find(that.opts.hideElm).fadeIn();
                    }
                    else if (scrollTop == 0) {
                        that.elm.find(that.opts.hideElm).fadeOut();
                    }
                }
                //回到顶部
            function backTop() {
                var body = document.documentElement || document.body,
                    scrollTop = body.scrollTop || document.body.scrollTop;
                var $body = $("html,body");
                if ($body.scrollTop($body.scrollTop() - 45).scrollTop() > 0) {
                    setTimeout(backTop, 1);
                }
                else {
                    that.elm.find(that.opts.hideElm).fadeOut();
                }
            }

            // 问卷调查
            function gotoQuestionLinkUrl() {

                if (Cookie.get("ymt_user")) {
                    window.open("https://zh.surveymonkey.com/s/3ZQ2K9L");
                }
                else {
                    window.open("https://zh.surveymonkey.com/s/3ZQ2K9L");
                }
            }

            function support() {
                var href = "http://chat8.live800.com/live800/chatClient/chatbox.jsp?companyID=151404&jid=3300622421&enterurl=http%3A%2F%2Fwww%2Eymatou%2Ecom%2F&pagereferrer=http%3A%2F%2Fwww%2Eymatou%2Ecom%2Flogin%3Fret%3Dhttp%253a%252f%252fwww%2Eymatou%2Ecom%252f&tm=1407996314750";
                window.open(href, '_blank', 'scrollbars=no,width=600,height=450,left=175px,top=100,status=no,resizable=yes')
            }

        }
    }

    return function (selector, opts) {
        new Widget(selector, opts)
    }
});