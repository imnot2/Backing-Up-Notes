/*=======================IndexListBak.js===========================*/
(function(j$) {
    j$.fn.listnav = function(options) {
        var opts = j$.extend({}, j$.fn.listnav.defaults, options);
        var letters = ['_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-'];
        var firstClick = false;
        opts.prefixes = j$.map(opts.prefixes, function(n) { return n.toLowerCase(); });

        return this.each(function() {
            var $wrapper, list, $list, $letters, $letterCount, id;
            id = this.id;
            $wrapper = j$('#' + id + '-nav');
            $list = j$(this);

            var counts = {}, allCount = 0, isAll = true, numCount = 0, prevLetter = '';

            function init() {
                $wrapper.append(createLettersHtml());

                $letters = j$('.ln-letters', $wrapper).slice(0, 1);
                if (opts.showCounts) $letterCount = j$('.ln-letter-count', $wrapper).slice(0, 1);

                addClasses();
                if (opts.extendClass.length > 0) {
                    for (var i = 0; i < opts.extendClass.length; i++) {
                        counts[opts.extendClass[i]] = $list.children().filter('.hot').length;
                    }
                }

                addNoMatchLI();
                if (opts.flagDisabled) addDisabledClass();
                bindHandlers();

                if (!opts.includeAll) $list.show();

                if (!opts.includeAll) j$('.all', $letters).remove();
                if (!opts.includeNums) j$('._', $letters).remove();
                if (!opts.includeOther) j$('.-', $letters).remove();

                j$(':last', $letters).addClass('ln-last');

                if (j$.cookie && (opts.cookieName != null)) {
                    var cookieLetter = j$.cookie(opts.cookieName);
                    if (cookieLetter != null) opts.initLetter = cookieLetter;
                }

                if (opts.initLetter != '') {
                    firstClick = true;
                    j$('.' + opts.initLetter.toLowerCase(), $letters).slice(0, 1).click();
                }
                else {
                    if (opts.includeAll) j$('.all', $letters).addClass('ln-selected');
                    else {
                        for (var i = ((opts.includeNums) ? 0 : 1); i < letters.length; i++) {
                            if (counts[letters[i]] > 0) {
                                firstClick = true;
                                j$('.' + letters[i], $letters).slice(0, 1).click();
                                break;
                            }
                        }
                    }
                }
            }

            function setLetterCountTop() {
                $letterCount.css({ "top": "-" + $letterCount.outerHeight({ margin: true }) + "px" });
            }

            function addClasses() {
                var str, firstChar, firstWord, spl, $this, hasPrefixes = (opts.prefixes.length > 0);
                $list.children().each(function() { // j$($list)
                    $this = j$(this), firstChar = '', str = j$.trim($this.text()).toLowerCase();
                    if (str != '') {
                        if (hasPrefixes) {
                            spl = str.split(' ');
                            if ((spl.length > 1) && (j$.inArray(spl[0], opts.prefixes) > -1)) {
                                firstChar = spl[1].charAt(0);
                                addLetterClass(firstChar, $this, true);
                            }
                        }
                        firstChar = str.charAt(0);
                        addLetterClass(firstChar, $this);
                    }
                });
            }

            function addLetterClass(firstChar, $el, isPrefix) {
                if (/\W/.test(firstChar)) firstChar = '-';
                if (!isNaN(firstChar)) firstChar = '_';
                $el.addClass('ln-' + firstChar);

                if (counts[firstChar] == undefined) counts[firstChar] = 0;
                counts[firstChar]++;
                if (!isPrefix) allCount++;
            }

            function addDisabledClass() {
                for (var i = 0; i < letters.length; i++) {
                    if (counts[letters[i]] == undefined) j$('.' + letters[i], $letters).addClass('ln-disabled');
                }
            }

            function addNoMatchLI() {
                $list.append('<li class="ln-no-match" style="display:none">' + opts.noMatchText + '</li>');
            }

            function getLetterCount(el) {
                if (j$(el).hasClass('all')) return allCount;
                else {
                    var count = counts[j$(el).attr('class').split(' ')[0]];
                    return (count != undefined) ? count : 0;
                }
            }

            function bindHandlers() {

                if (opts.showCounts) {
                    $wrapper.one("mouseover", function() {
                        setLetterCountTop();
                    });
                    j$('a', $letters).mouseover(function() {
                        var left = j$(this).position().left;
                        var width = (j$(this).outerWidth({ margin: true }) - 1);
                        var count = getLetterCount(this);
                        $letterCount.css({ left: left, width: width }).text(count).show();
                    });

                    j$('a', $letters).mouseout(function() {
                        $letterCount.hide();
                    });
                }

                j$('a', $letters).click(function() {
                    j$('a.ln-selected', $letters).removeClass('ln-selected');

                    var letter = j$(this).attr('class').split(' ')[0];

                    if (letter == 'all') {
                        $list.children().show();
                        $list.children('.ln-no-match').hide();
                        isAll = true;
                    } else {
                        if (isAll) {
                            $list.children().hide();
                            isAll = false;
                        } else if (prevLetter.length == 1) {
                            $list.children('.ln-' + prevLetter).hide();
                        } else if (prevLetter != '') {
                            $list.children('.' + prevLetter).hide();
                        }

                        var count = getLetterCount(this);
                        if (count > 0) {
                            $list.children('.ln-no-match').hide();
                            if (j$(this).hasClass('ext')) {
                                $list.children('.' + letter).show();
                            } else {
                                $list.children('.ln-' + letter).show();
                            }
                        } else $list.children('.ln-no-match').show();

                        prevLetter = letter;
                    }

                    if (j$.cookie && (opts.cookieName != null)) j$.cookie(opts.cookieName, letter);

                    j$(this).addClass('ln-selected');
                    j$(this).blur();
                    if (!firstClick && (opts.onClick != null)) opts.onClick(letter);
                    else firstClick = false;

                    if (j$.isFunction(opts.afterClick)) {
                        opts.afterClick();
                    }

                    return false;
                });
            }

            function createLettersHtml() {
                var html = [];
                for (var i = 1; i < letters.length; i++) {
                    if (html.length == 0) {
                        html.push('<a class="all" href="#">ALL</a><a class="_" href="#">0-9</a>');
                        if (opts.extendClass.length > 0) {
                            for (var i = 0; i < opts.extendClass.length; i++) {
                                html.push('<a class="' + opts.extendClass[i].toLowerCase() + ' ext" href="#">' + opts.extendClass[i].toUpperCase() + '</a>');
                            }
                        }
                    }
                    html.push('<a class="' + letters[i] + '" href="#">' + ((letters[i] == '-') ? '...' : letters[i].toUpperCase()) + '</a>');
                }
                return '<div class="ln-letters">' + html.join('') + '</div>' + ((opts.showCounts) ? '<div class="ln-letter-count" style="display:none; position:absolute; top:0; left:0; width:20px;">0</div>' : '');
            }

            init();
        });
    };

    j$.fn.listnav.defaults = {
        initLetter: '',
        includeAll: true,
        incudeOther: false,
        includeNums: true,
        flagDisabled: true,
        noMatchText: '暂无信息',
        showCounts: true,
        cookieName: null,
        onClick: null,
        prefixes: [],
        extendClass: [],
        afterClass: null
    };
})(jQuery);
