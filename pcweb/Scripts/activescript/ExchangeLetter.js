/*=======================ExchangeLetter.js===========================*/
$(function () {
    var exletter1;
    var exletter2;
    var popLayer;

    Ymt.load('widget.LayerBox', function () {
        popLayer = Ymt.widget.LayerBox('struc', {
            isFrame: !1
        });
    }, true);

    function submitlete() {

        var obj = {};
        obj.MasterItems = exletter1.consoleObject(exletter1.outletter);
        obj.SlaveItems = exletter2.consoleObject(exletter2.outletter);
        obj.SlaveUserLoginId = $('#SlaveUserLoginId').val();
        $.post('/WordExchage/Create', $.toJSON(obj), function (data) {
            var msg = "";
            if (data.success == '1') {
                var url = "http://www.ymatou.com" + data.data;
                msg = "链接已生成，且已自动复制到剪贴板，如果您的浏览器无法自动复制，您可以手动复制链接。";
                try {
                    window.clipboardData.setData("Text", url);
                } catch (e) {
                }
                $('span.url').html(url);
            } else {
                msg = data.message;
            }

            $('#exchangenotes').html(msg);
            $('#error_sub').click(function () { popLayer.close(); return false });
            popLayer.alert('#letter_error');
//            if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
//                var o = $('#letter_error').position(), c = $('#letter_error').offset();
//                $('#letter_error').css({ 'left': (c.left - o.left) / 2 + 'px', 'top': (c.top - o.top) / 2 + 'px' })
//                //alert($('#letter_error').css('left'))
//            }
        }, 'json');
        return false;
    }
    function ExChangeLetter(a, b) {
        if (!(this instanceof ExChangeLetter)) return new ExChangeLetter(a, b);
        var that = this, c = that.config = a, clog;
        that.data = b;
        that.insertLetter(c.hasLettersCls);
        clog = that.consoleCls = $(c.consoleCls);
        $(c.hasLettersCls).find('em').live('click', function () {
            that.innerletter = $(this).closest('li');
            that.outletter = $(c.letterBox);
            that.config.jiajian = true;
            that.config.deleted = false;
            that.showConsole(that.innerletter);
            return false;
        });
        $(c.letterBox).find('.clo').live('click', function () {
            that.innerletter = $(this).closest('li');
            that.outletter = $(c.hasLettersCls);
            var t = parseInt(that.innerletter.data('num'));
            that.config.jiajian = false;
            that.config.deleted = true;
            that.moveLetter(that.innerletter, that.outletter, t);
            return false;
        });
        $(c.letterBox).find('li').live('mouseenter', function () {
            $(this).find('.clo').show();
            return false;
        });
        $(c.letterBox).find('li').live('mouseleave', function () {
            $(this).find('.clo').hide();
            return false;
        });
        $(c.selectCls).bind('click', function () {
            $(c.hasLettersCls).show();
            return false;
        });
        $(c.hasLettersCls).find('.shut,.btn .btn_1').live('click', function () {
            that.closeHasLettersBox(c.hasLettersCls);
            clog.hide();
            return false;
        });
        $(c.clearListCls).bind('click', function () {
            that.clearList(c.letterBox);
            return false;
        });
        clog.find('.btn_1').live('click', function () {
            if (parseInt(clog.find('.text').attr('value'))) {
                that.moveLetter(that.innerletter, that.outletter, clog.find('.text').attr('value'));
                clog.hide();
            }
            return false;
        });
    }
    ExChangeLetter.prototype = {
        insertLetter: function (obj) {
            var eleArr = [], o, con = $(obj).find('.pro_letter_box');
            if (this.config.otherbool) {
                $.each(this.data, function (m, n) {
                    eleArr[eleArr.length] = "<li class='item' item=" + n.iRewardItemId + "><a class='clo'></a><em class='light' title='点击添加到交换列表'>" + n.sContent + "</em></li>";
                });
                con.html(eleArr.join(''));
            }
            else {
                $.each(this.data, function (m, n) {
                    con.append($("<li class='item' item=" + n.iRewardItemId + "><a class='clo'></a><em class='light' title='点击添加到交换列表'>" + n.sContent + "</em><p class='num'>x<b>" + n.iAmount + "</b></p></li>").data('num', n.iAmount));
                });

            }
        },
        reSetLetter: function (obj, len, n) {
            var c = this.config.jiajian ? (len - n > 0 ? len - n : 0) : (len + n), id = obj.attr('item');
            obj.find('.num b').text(c);
            obj.data('num', c);
            if (!this.config.jiajian && this.config.deleted) {
                this.innerletter.remove("li[item='" + id + "']");
            }
        },
        getLetterNum: function (obj) {
            return !this.config.otherbool ? obj.data('num') : obj.find('.num b').text();
        },
        moveLetter: function (a, b, c) {
            var len = parseInt(this.getLetterNum(a)), c = parseInt(c), clo, d;
            var letterId = a.attr('item');
            var o = $(b.find("li[item='" + letterId + "']")[0]);
            c = c >= len ? len : c;
            if (o.length) {
                this.config.jiajian = true;
                this.reSetLetter(a, len, c);
                this.config.jiajian = false;
                !this.config.jiajian && (len = parseInt(this.getLetterNum(o)), this.reSetLetter(o, len, c));
            } else {
                if (!this.config.otherbool) {
                    clo = a.clone(false);
                    clo.find('.num b').text(c);
                    clo.find('em').attr('title', '点击字母从列表移除');
                    clo.data('num', c);
                    if (this.config.jiajian) {
                        $(this.config.letterBox).append(clo);
                    } else {
                        b.find('.pro_letter_box').append(clo);
                    }
                    this.reSetLetter(a, len, c);

                } else {
                    clo = a.clone(false).append($("<p class='num'>x<b>" + c + "</b></p>"));
                    clo.find('em').attr('title', '点击字母从列表移除');
                    $(this.config.letterBox).append(clo);
                }
            }
        },
        showConsole: function (obj) {
            var that = this;
            var m = obj.offset(), h = obj.outerHeight(), c = that.consoleCls, len = that.getLetterNum(obj);
            c.hide();
            if (len > 0 || that.config.otherbool) {
                c.css({
                    left: m.left,
                    top: m.top + h
                });
                c.find('.text').empty();
                c.css('z-index', 100000);
                c.show();
            } else {
                that.setTitle(obj.find('em'), '已经没有交换字母');
            }
        },
        setTitle: function (o, t) {
            o.attr('title', t);
        },
        clearList: function (o) {
            $(o).empty();
        },
        closeHasLettersBox: function (o) {
            $(o).hide();
        },
        consoleObject: function (a) {
            var obj = $(a).children('li'), len, arr = [], that = this;
            if (obj.size())
                $.each(obj, function (m, n) {
                    var o = $(n), attr = o.attr('item'), num = that.getLetterNum(o);
                    len = parseInt(o.find('.num b').text());
                    if (len) {
                        arr.push({ iRewardItemId: parseInt(attr), iAmount: parseInt(num) })
                    }
                })
            return arr;
        }
    }
    $.get("/WordExchage/GetMasterOwnedWordItems", function (data) {
        var letter = data;
        exletter1 = ExChangeLetter({
            letterBox: '.exle_self .pro_letter_box',
            hasLettersCls: '#selfLetters',
            consoleCls: '#selfLetterNumBox',
            selectCls: '#selfSelectLetter',
            clearListCls: '.exle_self .clearLetter',
            otherbool: false,
            jiajian: true
        }, letter);
    });

    $.get("/WordExchage/GetSlaveOwnedWordItems", function (data) {
        var letter = data;
        exletter2 = ExChangeLetter({
            letterBox: '.exle_other .pro_letter_box',
            hasLettersCls: '#otherLetters',
            consoleCls: '#otherLetterNumBox',
            selectCls: '#otherSelectLetter',
            clearListCls: '.exle_other .clearLetter',
            otherbool: true,
            jiajian: true
        }, letter);
        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
            !$(exletter2.config.hasLettersCls).hasClass('.exle_ie6') && $(exletter2.config.hasLettersCls).addClass('exle_ie6');
        }
        $('#submitLetters').find('.btn_1').bind('click', submitlete);
    });


});



