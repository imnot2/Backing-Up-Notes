define(function (require, exports, module) {

    function countdown(container, date, callback) {
        if (!(this instanceof countdown)) {
            if (typeof date == 'object' && callback == void 0) {
                return new countdown(container, $m.merge(config, date));
            } else {
                return new countdown(container, date, callback);
            }
        }
        if (container.charAt(0) != '.' && container.charAt(0) != '#') {
            container = $('#' + container);
        } else {
            container = $(container)
        }

        var param, date1;
        if (typeof date == 'object') {
            param = date;
            callback = param.callback;
            date1 = param.date;
        } else {
            date1 = date;
        }
        if (!date1) {
            date1 = 0;
        } else if (typeof date1 == "string") {
            date1 = new Date(date1).getSeconds()
            if (isNaN(date1)) {
                date1 = 0;
            }
        }

        date1 = parseInt(date1);

        var countdowntimeout = setInterval(function () {
                if (date1 <= 0) {
                    clearInterval(countdowntimeout);
                    if (param && param.overText) {
                        container.html(param.overText);
                    } else {
                        container.hide();
                    }

                    callback && callback.call(container);
                    return;
                }
                var second, min, hour, allmin, day = 0;
                second = date1 % 60;
                allmin = (date1 - second) / 60;
                min = allmin % 60;
                hour = (allmin - min) / 60;
                second = second > 9 ? second : "0" + second;
                if (min > 0) {
                    min = min > 9 ? min : "0" + min;
                } else {
                    min = "00";
                }
                if (hour > 0) {
                    day = (hour - hour % 24) / 24;
                    hour = day > 0 ? hour % 24 : hour;
                    hour = hour > 9 ? hour : "0" + hour;
                } else {
                    hour = "00";
                }


                function figure(number) {
                    number += '';
                    var arr = [],
                        len = number.length;
                    if (len > 1) {
                        for (var i = 0; i < len; i++) {
                            arr.push('<em class="' + (param && param.timeItemCls || '') + '">');
                            arr.push(number[i]);
                            arr.push('</em>');
                        }
                        return arr.join('');
                    }
                    return '<em>' + number + '</em>';
                }

                hour = figure(hour) + '<span>:</span>';

                second = figure(second);

                if (!param) {
                    min = figure(min) + '<span>:</span>';
                    container.html(hour + min + second);
                } else {

                    min = figure(min) + (param.isHasSecond ? '<span>:</span>' : '');

                    second = param.isHasSecond ? second : '';

                    if (day > 0) {
                        day = figure(day);
                        container.html('<span class="' + param.panelCls + '">' + param.prevText + '</span>' + day + '<span>天</span>' + param.afterText);
                        clearInterval(countdowntimeout);
                    } else {
                        container.html('<span class="' + param.panelCls + '">' + param.prevText + '</span>' + hour + min + second + param.afterText);
                    }

                }

                date1--;
            },
            1000);
    }
    var config = {
        prevText: '还剩',
        afterText: '结束',
        date: null,
        overText: '已结束',
        callback: null,
        panelCls: 'time-txt',
        isHasSecond: !0,
        timeItemCls: ''
    }

    return countdown;
})