/**
 * 分页简单版
 *
 */

! function(win, $) {
    'use strict';
    //匹配分页符 
    var contentExp = /<div\b[^>]*?page-break-after.*?>[\s\S]*?<\/div>/i;///<div.+?page-break-after.*?>[\s\S]*?<\/div>
    
    var Pagination = function($element, options) {
        this.$ele = $element;
        this.opts = options;
        this.init();
        this.isBind = false;
    }

    Pagination.VERSION = "0.0.2";

    Pagination.prototype = {
        init: function() {
            var opts = this.opts;
            if (opts.content == "" && opts.container == "") {
                throw "内容和内容容器不能同时为空！";
            }
            var handleContent = opts.contents || $(opts.container)[opts.type]();
            var contentArray = this.contents = handleContent.split(contentExp);
            if(!contentArray.length){
                return;
            }
            this.bulid();
            this.bind();
        },
        /*
         * @param {number} 当前页
         */
        bulid: function(currPage) {
            var pagerHtml = [
                    '<div class="c-pager-simple">',
                    '<ul>'
                ],
                pagerHtmlEnd = [
                    '</ul>',
                    '</div>'
                ],
                itemHtml = [
                    '<li class="pager-number">',
                    '<a href="javascript:;" class="pager-item {{status}}" data-pagerNo="{{pageNo}}">',
                    '{{showNo}}',
                    '</a>',
                    '</li>'
                ],
                i = 1,
                contents = this.contents,
                status = "";

            currPage = currPage || (this.opts.currPage || 1); //默认页是第一页

            /*
            * 获得页码的html
            * @param {String} 状态
            * @param {string} 页码
            * @param {string} 显示码
            */
            var getPageNoHtml = function(status,pageNo,showNo) {
                var currItemHtml = itemHtml.join("");
                showNo = showNo || pageNo
                //替换状态
                currItemHtml = currItemHtml
                    .replace("{{status}}", status)
                    .replace(/{{pageNo}}/g, pageNo)
                    .replace(/{{showNo}}/g, showNo);
                return currItemHtml;
            }
            //追加 上一页
            if (currPage == 1) {
                status = "invalid";
            }
            pagerHtml.push(getPageNoHtml(status,parseInt(currPage)-1,"<"));

            for (; i <= contents.length; i++) {
                status = "";
                if (i == currPage) {
                    status = "active";
                }
                pagerHtml.push(getPageNoHtml(status,i));
            }
            //追加 下一页
            if (currPage == this.contents.length) {
                status = "invalid";
            }
            pagerHtml.push(getPageNoHtml(status,parseInt(currPage)+1,">"));

            pagerHtml.push(pagerHtmlEnd.join(""));
            this.pager = $(pagerHtml.join(""));
           
            this.render(currPage);

        },
        render: function(currPage) {
            $(this.opts.pagerRender).children().remove().end().append(this.pager);
            this.$ele.html(this.contents[--currPage]);
             //这里设置宽度
             //@TODO 这里需要优化 用于处理居中问题
            this.pager.width((this.pager.find("li").width()+10)*this.pager.find("li").length)
        },
        bind: function() {
            var that = this;
            $(this.opts.pagerRender).live('click', function(event) {
                var target = event.target,
                    $target = $(target);
                if ($target.hasClass('pager-item') && !$target.hasClass('invalid')) {
                    that.bulid($(target).attr("data-pagerNo"))
                }
            });
        }
    }

    function Plugin(options) {
        var defaultOpts = this.pagination.defaultOpts;
        return this.each(function() {
            var $this = $(this),
                data = $this.data('ymt.pagination');

            options = $.extend(defaultOpts, options);
           
            if (!data) $this.data('ymt.pagination', (data = new Pagination($this, options)))
        })
    }

    var old = $.fn.pagination

    $.fn.pagination = Plugin
    $.fn.pagination.Constructor = Pagination;

    ///解决pagination noConflict
    $.fn.pagination.noConflict = function() {
        $.fn.pagination = old
        return this
    }
    $.fn.pagination.defaultOpts = {
        content: "", //内容 {String} 内容优先于内容容器
        container: "", //内容容器 jq选择器
        type: "html", //处理的内容类型 text||html 默认html
        isOmit: true //是否省略页码
    }
}(this, jQuery);