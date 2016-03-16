/*=======================fancy.js===========================*/
// FancyBox http://fancybox.net
; (function(j$) {
    j$.fn.fixPNG = function() {
        return this.each(function() {
            var image = j$(this).css('backgroundImage');

            if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
                image = RegExp.$1;
                j$(this).css({
                    'backgroundImage': 'none',
                    'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=" + (j$(this).css('backgroundRepeat') == 'no-repeat' ? 'crop' : 'scale') + ", src='" + image + "')"
                }).each(function() {
                    var position = j$(this).css('position');
                    if (position != 'absolute' && position != 'relative')
                        j$(this).css('position', 'relative');
                });
            }
        });
    };

    var elem, opts, busy = false, imagePreloader = new Image, loadingTimer, loadingFrame = 1, imageRegExp = /^.+$/i;
    var ieQuirks = null, IE6 = j$.browser.msie && j$.browser.version.substr(0, 1) == 6 && !window.XMLHttpRequest, oldIE = IE6 || (j$.browser.msie && j$.browser.version.substr(0, 1) == 7);

    j$.fn.fancybox = function(o) {
        var settings = j$.extend({}, j$.fn.fancybox.defaults, o);
        var matchedGroup = this;

        function _initialize() {
            elem = this;
            opts = j$.extend({}, settings);

            _start();

            return false;
        };

        function _start() {
            if (busy) return;

            if (j$.isFunction(opts.callbackOnStart)) {
                opts.callbackOnStart();
            }

            opts.itemArray = [];
            opts.itemCurrent = 0;

            if (settings.itemArray.length > 0) {
                opts.itemArray = settings.itemArray;

            } else {
                var item = {};

                if (!elem.rel || elem.rel == '') {
                    var item = { href: elem.href, title: elem.title };

                    if (j$(elem).children("img:first").length) {
                        item.orig = j$(elem).children("img:first");
                    } else {
                        item.orig = j$(elem);
                    }

                    if (item.title == '' || typeof item.title == 'undefined') {
                        item.title = item.orig.attr('alt');
                    }

                    opts.itemArray.push(item);

                } else {
                    var subGroup = j$(matchedGroup).filter("a[rel=" + elem.rel + "]");
                    var item = {};

                    for (var i = 0; i < subGroup.length; i++) {
                        item = { href: subGroup[i].href, title: subGroup[i].title };

                        if (j$(subGroup[i]).children("img:first").length) {
                            item.orig = j$(subGroup[i]).children("img:first");
                        } else {
                            item.orig = j$(subGroup[i]);
                        }

                        if (item.title == '' || typeof item.title == 'undefined') {
                            item.title = item.orig.attr('alt');
                        }

                        opts.itemArray.push(item);
                    }
                }
            }

            while (opts.itemArray[opts.itemCurrent].href != elem.href) {
                opts.itemCurrent++;
            }

            if (opts.overlayShow) {
                if (IE6) {
                    j$('embed, object, select').css('visibility', 'hidden');
                    j$("#fancy_overlay").css('height', j$(document).height());
                }

                j$("#fancy_overlay").css({
                    'background-color': opts.overlayColor,
                    'opacity': opts.overlayOpacity
                }).show();
            }

            j$(window).bind("resize.fb scroll.fb", j$.fn.fancybox.scrollBox);

            _change_item();
        };

        function _change_item() {
            j$("#fancy_right, #fancy_left, #fancy_close, #fancy_title").hide();

            var href = opts.itemArray[opts.itemCurrent].href;

            if (href.match("iframe") || elem.className.indexOf("iframe") >= 0) {
                j$.fn.fancybox.showLoading();
                _set_content('<iframe id="fancy_frame" onload="jQuery.fn.fancybox.showIframe()" name="fancy_iframe' + Math.round(Math.random() * 1000) + '" frameborder="0" hspace="0" src="' + href + '"></iframe>', opts.frameWidth, opts.frameHeight);

            } else if (href.match(/#/)) {
                var target = window.location.href.split('#')[0]; target = href.replace(target, ''); target = target.substr(target.indexOf('#'));

                _set_content('<div id="fancy_div">' + j$(target).html() + '</div>', opts.frameWidth, opts.frameHeight);

            } else if (href.match(imageRegExp)) {
                imagePreloader = new Image; imagePreloader.src = href;

                if (imagePreloader.complete) {
                    _proceed_image();

                } else {
                    j$.fn.fancybox.showLoading();
                    j$(imagePreloader).unbind().bind('load', function() {
                        j$("#fancy_loading").hide();

                        _proceed_image();
                    });
                }
            } else {
                j$.fn.fancybox.showLoading();
                j$.get(href, function(data) {
                    j$("#fancy_loading").hide();
                    _set_content('<div id="fancy_ajax">' + data + '</div>', opts.frameWidth, opts.frameHeight);
                });
            }
        };

        function _proceed_image() {
            var width = imagePreloader.width;
            var height = imagePreloader.height;

            var horizontal_space = (opts.padding * 2) + 40;
            var vertical_space = (opts.padding * 2) + 60;

            var w = j$.fn.fancybox.getViewport();

            if (opts.imageScale && (width > (w[0] - horizontal_space) || height > (w[1] - vertical_space))) {
                var ratio = Math.min(Math.min(w[0] - horizontal_space, width) / width, Math.min(w[1] - vertical_space, height) / height);

                width = Math.round(ratio * width);
                height = Math.round(ratio * height);
            }

            _set_content('<img alt="" id="fancy_img" src="' + imagePreloader.src + '" />', width, height);
        };

        function _preload_neighbor_images() {
            if ((opts.itemArray.length - 1) > opts.itemCurrent) {
                var href = opts.itemArray[opts.itemCurrent + 1].href || false;

                if (href && href.match(imageRegExp)) {
                    objNext = new Image();
                    objNext.src = href;
                }
            }

            if (opts.itemCurrent > 0) {
                var href = opts.itemArray[opts.itemCurrent - 1].href || false;

                if (href && href.match(imageRegExp)) {
                    objNext = new Image();
                    objNext.src = href;
                }
            }
        };

        function _set_content(value, width, height) {
            busy = true;

            var pad = opts.padding;

            if (oldIE || ieQuirks) {
                j$("#fancy_content")[0].style.removeExpression("height");
                j$("#fancy_content")[0].style.removeExpression("width");
            }

            if (pad > 0) {
                width += pad * 2;
                height += pad * 2;

                j$("#fancy_content").css({
                    'top': pad + 'px',
                    'right': pad + 'px',
                    'bottom': pad + 'px',
                    'left': pad + 'px',
                    'width': 'auto',
                    'height': 'auto'
                });

                if (oldIE || ieQuirks) {
                    j$("#fancy_content")[0].style.setExpression('height', '(this.parentNode.clientHeight - ' + pad * 2 + ')');
                    j$("#fancy_content")[0].style.setExpression('width', '(this.parentNode.clientWidth - ' + pad * 2 + ')');
                }
            } else {
                j$("#fancy_content").css({
                    'top': 0,
                    'right': 0,
                    'bottom': 0,
                    'left': 0,
                    'width': '100%',
                    'height': '100%'
                });
            }

            if (j$("#fancy_outer").is(":visible") && width == j$("#fancy_outer").width() && height == j$("#fancy_outer").height()) {
                j$("#fancy_content").fadeOut('fast', function() {
                    j$("#fancy_content").empty().append(j$(value)).fadeIn("normal", function() {
                        _finish();
                    });
                });

                return;
            }

            var w = j$.fn.fancybox.getViewport();

            var itemTop = (height + 60) > w[1] ? w[3] : (w[3] + Math.round((w[1] - height - 60) * 0.5));
            var itemLeft = (width + 40) > w[0] ? w[2] : (w[2] + Math.round((w[0] - width - 40) * 0.5));

            var itemOpts = {
                'left': itemLeft,
                'top': itemTop,
                'width': width + 'px',
                'height': height + 'px'
            };

            if (j$("#fancy_outer").is(":visible")) {
                j$("#fancy_content").fadeOut("normal", function() {
                    j$("#fancy_content").empty();
                    j$("#fancy_outer").animate(itemOpts, opts.zoomSpeedChange, opts.easingChange, function() {
                        j$("#fancy_content").append(j$(value)).fadeIn("normal", function() {
                            _finish();
                        });
                    });
                });

            } else {

                if (opts.zoomSpeedIn > 0 && opts.itemArray[opts.itemCurrent].orig !== undefined) {
                    j$("#fancy_content").empty().append(j$(value));

                    var orig_item = opts.itemArray[opts.itemCurrent].orig;
                    var orig_pos = j$.fn.fancybox.getPosition(orig_item);

                    j$("#fancy_outer").css({
                        'left': (orig_pos.left - 20 - opts.padding) + 'px',
                        'top': (orig_pos.top - 20 - opts.padding) + 'px',
                        'width': j$(orig_item).width() + (opts.padding * 2),
                        'height': j$(orig_item).height() + (opts.padding * 2)
                    });

                    if (opts.zoomOpacity) {
                        itemOpts.opacity = 'show';
                    }

                    j$("#fancy_outer").animate(itemOpts, opts.zoomSpeedIn, opts.easingIn, function() {
                        _finish();
                    });

                } else {

                    j$("#fancy_content").hide().empty().append(j$(value)).show();
                    j$("#fancy_outer").css(itemOpts).fadeIn("normal", function() {
                        _finish();
                    });
                }
            }
        };

        function _set_navigation() {
            if (opts.itemCurrent !== 0) {
                j$("#fancy_left, #fancy_left_ico").unbind().bind("click", function(e) {
                    e.stopPropagation();

                    opts.itemCurrent--;
                    _change_item();

                    return false;
                });

                j$("#fancy_left").show();
            }

            if (opts.itemCurrent != (opts.itemArray.length - 1)) {
                j$("#fancy_right, #fancy_right_ico").unbind().bind("click", function(e) {
                    e.stopPropagation();

                    opts.itemCurrent++;
                    _change_item();

                    return false;
                });

                j$("#fancy_right").show();
            }
        };

        function _finish() {
            if (j$.browser.msie) {
                j$("#fancy_content")[0].style.removeAttribute('filter');
                j$("#fancy_outer")[0].style.removeAttribute('filter');
            }

            _set_navigation();

            _preload_neighbor_images();

            j$(document).bind("keydown.fb", function(e) {
                if (e.keyCode == 27 && opts.enableEscapeButton) {
                    j$.fn.fancybox.close();

                } else if (e.keyCode == 37 && opts.itemCurrent !== 0) {
                    j$(document).unbind("keydown.fb");
                    opts.itemCurrent--;
                    _change_item();


                } else if (e.keyCode == 39 && opts.itemCurrent != (opts.itemArray.length - 1)) {
                    j$(document).unbind("keydown.fb");
                    opts.itemCurrent++;
                    _change_item();
                }
            });

            if (opts.hideOnContentClick) {
                j$("#fancy_content").click(j$.fn.fancybox.close);
            }

            if (opts.overlayShow && opts.hideOnOverlayClick) {
                j$("#fancy_overlay").bind("click", j$.fn.fancybox.close);
            }

            if (opts.showCloseButton) {
                j$("#fancy_close").bind("click", j$.fn.fancybox.close).show();
            }

            if (typeof opts.itemArray[opts.itemCurrent].title !== 'undefined' && opts.itemArray[opts.itemCurrent].title.length > 0) {
                var pos = j$("#fancy_outer").position();

                j$('#fancy_title div').text(opts.itemArray[opts.itemCurrent].title).html();

                j$('#fancy_title').css({
                    'top': pos.top + j$("#fancy_outer").outerHeight() - 32,
                    'left': pos.left + ((j$("#fancy_outer").outerWidth() * 0.5) - (j$('#fancy_title').width() * 0.5))
                }).show();
            }

            if (opts.overlayShow && IE6) {
                j$('embed, object, select', j$('#fancy_content')).css('visibility', 'visible');
            }

            if (j$.isFunction(opts.callbackOnShow)) {
                opts.callbackOnShow(opts.itemArray[opts.itemCurrent]);
            }

            if (j$.browser.msie) {
                j$("#fancy_outer")[0].style.removeAttribute('filter');
                j$("#fancy_content")[0].style.removeAttribute('filter');
            }

            busy = false;
        };

        return this.unbind('click.fb').bind('click.fb', _initialize);
    };

    j$.fn.fancybox.scrollBox = function() {
        var w = j$.fn.fancybox.getViewport();

        if (opts.centerOnScroll && j$("#fancy_outer").is(':visible')) {
            var ow = j$("#fancy_outer").outerWidth();
            var oh = j$("#fancy_outer").outerHeight();

            var pos = {
                'top': (oh > w[1] ? w[3] : w[3] + Math.round((w[1] - oh) * 0.5)),
                'left': (ow > w[0] ? w[2] : w[2] + Math.round((w[0] - ow) * 0.5))
            };

            j$("#fancy_outer").css(pos);

            j$('#fancy_title').css({
                'top': pos.top + oh - 32,
                'left': pos.left + ((ow * 0.5) - (j$('#fancy_title').width() * 0.5))
            });
        }

        if (IE6 && j$("#fancy_overlay").is(':visible')) {
            j$("#fancy_overlay").css({
                'height': j$(document).height()
            });
        }

        if (j$("#fancy_loading").is(':visible')) {
            j$("#fancy_loading").css({ 'left': ((w[0] - 40) * 0.5 + w[2]), 'top': ((w[1] - 40) * 0.5 + w[3]) });
        }
    };

    j$.fn.fancybox.getNumeric = function(el, prop) {
        return parseInt(j$.curCSS(el.jquery ? el[0] : el, prop, true)) || 0;
    };

    j$.fn.fancybox.getPosition = function(el) {
        var pos = el.offset();

        pos.top += j$.fn.fancybox.getNumeric(el, 'paddingTop');
        pos.top += j$.fn.fancybox.getNumeric(el, 'borderTopWidth');

        pos.left += j$.fn.fancybox.getNumeric(el, 'paddingLeft');
        pos.left += j$.fn.fancybox.getNumeric(el, 'borderLeftWidth');

        return pos;
    };

    j$.fn.fancybox.showIframe = function() {
        j$("#fancy_loading").hide();
        j$("#fancy_frame").show();
    };

    j$.fn.fancybox.getViewport = function() {
        return [j$(window).width(), j$(window).height(), j$(document).scrollLeft(), j$(document).scrollTop()];
    };

    j$.fn.fancybox.animateLoading = function() {
        if (!j$("#fancy_loading").is(':visible')) {
            clearInterval(loadingTimer);
            return;
        }

        j$("#fancy_loading > div").css('top', (loadingFrame * -40) + 'px');

        loadingFrame = (loadingFrame + 1) % 12;
    };

    j$.fn.fancybox.showLoading = function() {
        clearInterval(loadingTimer);

        var w = j$.fn.fancybox.getViewport();

        j$("#fancy_loading").css({ 'left': ((w[0] - 40) * 0.5 + w[2]), 'top': ((w[1] - 40) * 0.5 + w[3]) }).show();
        j$("#fancy_loading").bind('click', j$.fn.fancybox.close);

        loadingTimer = setInterval(j$.fn.fancybox.animateLoading, 66);
    };

    j$.fn.fancybox.close = function() {
        busy = true;

        j$(imagePreloader).unbind();

        j$(document).unbind("keydown.fb");
        j$(window).unbind("resize.fb scroll.fb");

        j$("#fancy_overlay, #fancy_content, #fancy_close").unbind();

        j$("#fancy_close, #fancy_loading, #fancy_left, #fancy_right, #fancy_title").hide();

        __cleanup = function() {
            if (j$("#fancy_overlay").is(':visible')) {
                j$("#fancy_overlay").fadeOut("fast");
            }

            j$("#fancy_content").empty();

            if (opts.centerOnScroll) {
                j$(window).unbind("resize.fb scroll.fb");
            }

            if (IE6) {
                j$('embed, object, select').css('visibility', 'visible');
            }

            if (j$.isFunction(opts.callbackOnClose)) {
                opts.callbackOnClose();
            }

            busy = false;
        };

        if (j$("#fancy_outer").is(":visible") !== false) {
            if (opts.zoomSpeedOut > 0 && opts.itemArray[opts.itemCurrent].orig !== undefined) {
                var orig_item = opts.itemArray[opts.itemCurrent].orig;
                var orig_pos = j$.fn.fancybox.getPosition(orig_item);

                var itemOpts = {
                    'left': (orig_pos.left - 20 - opts.padding) + 'px',
                    'top': (orig_pos.top - 20 - opts.padding) + 'px',
                    'width': j$(orig_item).width() + (opts.padding * 2),
                    'height': j$(orig_item).height() + (opts.padding * 2)
                };

                if (opts.zoomOpacity) {
                    itemOpts.opacity = 'hide';
                }

                j$("#fancy_outer").stop(false, true).animate(itemOpts, opts.zoomSpeedOut, opts.easingOut, __cleanup);

            } else {
                j$("#fancy_outer").stop(false, true).fadeOut('fast', __cleanup);
            }

        } else {
            __cleanup();
        }

        return false;
    };

    j$.fn.fancybox.build = function() {
        var html = '';

        html += '<div id="fancy_overlay"></div>';
        html += '<div id="fancy_loading"><div></div></div>';

        html += '<div id="fancy_outer">';
        html += '<div id="fancy_inner">';

        html += '<div id="fancy_close"></div>';

        html += '<div id="fancy_bg"><div class="fancy_bg" id="fancy_bg_n"></div><div class="fancy_bg" id="fancy_bg_ne"></div><div class="fancy_bg" id="fancy_bg_e"></div><div class="fancy_bg" id="fancy_bg_se"></div><div class="fancy_bg" id="fancy_bg_s"></div><div class="fancy_bg" id="fancy_bg_sw"></div><div class="fancy_bg" id="fancy_bg_w"></div><div class="fancy_bg" id="fancy_bg_nw"></div></div>';

        html += '<a href="javascript:;" id="fancy_left"><span class="fancy_ico" id="fancy_left_ico"></span></a><a href="javascript:;" id="fancy_right"><span class="fancy_ico" id="fancy_right_ico"></span></a>';

        html += '<div id="fancy_content"></div>';

        html += '</div>';
        html += '</div>';

        html += '<div id="fancy_title"></div>';

        j$(html).appendTo("body");

        j$('<table cellspacing="0" cellpadding="0" border="0"><tr><td class="fancy_title" id="fancy_title_left"></td><td class="fancy_title" id="fancy_title_main"><div></div></td><td class="fancy_title" id="fancy_title_right"></td></tr></table>').appendTo('#fancy_title');

        if (j$.browser.msie) {
            j$(".fancy_bg").fixPNG();
        }

        if (IE6) {
            j$("div#fancy_overlay").css("position", "absolute");
            j$("#fancy_loading div, #fancy_close, .fancy_title, .fancy_ico").fixPNG();

            j$("#fancy_inner").prepend('<iframe id="fancy_bigIframe" src="javascript:false;" scrolling="no" frameborder="0"></iframe>');

            // Get rid of the 'false' text introduced by the URL of the iframe
            var frameDoc = j$('#fancy_bigIframe')[0].contentWindow.document;
            frameDoc.open();
            frameDoc.close();

        }
    };

    j$.fn.fancybox.defaults = {
        padding: 10,
        imageScale: true,
        zoomOpacity: true,
        zoomSpeedIn: 0,
        zoomSpeedOut: 0,
        zoomSpeedChange: 300,
        easingIn: 'swing',
        easingOut: 'swing',
        easingChange: 'swing',
        frameWidth: 560,
        frameHeight: 340,
        overlayShow: true,
        overlayOpacity: 0.3,
        overlayColor: '#666',
        enableEscapeButton: true,
        showCloseButton: true,
        hideOnOverlayClick: true,
        hideOnContentClick: true,
        centerOnScroll: true,
        itemArray: [],
        callbackOnStart: null,
        callbackOnShow: null,
        callbackOnClose: null
    };

    j$(document).ready(function() {
        ieQuirks = j$.browser.msie && !j$.boxModel;

        if (j$("#fancy_outer").length < 1) {
            j$.fn.fancybox.build();
        }
    });

})(jQuery);
