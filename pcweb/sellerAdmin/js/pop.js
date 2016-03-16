/**
 * Created by EX-lijiang001 on 2014/5/26.
 * 弹出框功能
 * <div id="dialogFrame"></div>
 * <a href="#dialogFrame">click Me</a>
 * $("a").dialog();
 */

! function(win, $) {
    'use strict';
    /**
     *
     * @param $target {element} 控制元素
     * @param $element {element} 操作元素
     *
     * $target 中添加.colse则执行关闭操作
     */
    var mask = "popMask"; //遮盖层的ID
    var moveBar = ".pop-title";
    var Dialog = function($element, $target) {
        this.$target = $target;
        this.$ele = $element;
        this.build();        
    }

    Dialog.VERSION = "1.0.0";

    Dialog.prototype = {
        build: function () {
            this.mask = $("#" + mask);
            if (this.mask && !this.mask[0]) {
                this.mask =
                    $("<div id='" + mask + "' class='c-pop-mask'>")
                    .appendTo("body")
                    .css("display", "none");
            }
            this.bind();
        },
        bind: function() {
            var self = this,
                ele = this.$ele,
                target = this.$target;
            //给元素添加一个click事件   
            if (ele[0]) {
                ele.click(function() {
                    var t = $(window).height() - target.height();
                    if (t < 0) {
                        t = 0;
                        target.css("position", "absolute")
                    } else {
                        target.css("position", "fixed")
                        t = t / 2;
                    }
                    target.css({
                        top: t,
                        left: ($(window).width() - target.width()) / 2
                    });
                    self.show();
                });
            }
            //绑定关闭效果,遍历控制元素中所有的.close子标签
            target.find(".J-close").each(function() {
                $(this).click(function (e) {
                    e.preventDefault();
                    self.hide();
                })
            });

            //是否被选取
            var isSel = false,
                curX, curY, left, top;
            target.find(moveBar).mousedown(function() {
                isSel = true;
                curX = event.x;
                curY = event.y;
                left = parseInt(target.css("left"));
                top = parseInt(target.css("top"));
            }).mouseup(function() {
                isSel = false;
            });
            $(document).mousemove(function() {
                if (isSel) {
                    target.css({
                        top: top - (curY - event.y),
                        left: left - (curX - event.x)
                    });
                }
            });
        },
        show: function() {
            this.mask.css({
                "height": $(document).height(),
                "width": $(document).width()
            }).show();
            this.$target.show();
        },
        hide: function() {
            this.mask.hide();
            this.$target.hide();
        }
    }

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('ymt.dialog'),
                target = $($this.attr("href"));


            if (!data) {
                $this.data('ymt.dialog', (data = new Dialog($this, target)))
                target.data('ymt.dialog', data)
            } 
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.dialog

    $.fn.dialog = Plugin
    $.fn.dialog.Constructor = Dialog;

    ///解决dialog noConflict
    $.fn.dialog.noConflict = function() {
        $.fn.dialog = old
        return this
    }

}(this, jQuery);