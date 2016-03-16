define(function (require, exports, module) {

    function countdown(container, date, callback) {
        if (!(this instanceof countdown)) {
            if (typeof date == 'object' && callback == void 0) {
                return new countdown(container, date);
            } else {
                return new countdown(container, date, callback);
            }
        }
        date = $m.merge(config, date);
        if (container.charAt(0) != '.' && container.charAt(0) != '#') {
            container = $('#' + container);
        } else {
            container = $(container)
        }

        var param, date1;
        if (typeof date == 'object') {
            param = date;
            callback = callback || 　param.callback;
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
        var timeHtml = "";
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
                var isRemind = !1;
                if (date1 <= param.remindTime) {
                    isRemind = true;
                }
                //每步执行回调
                param.stepCallBack && param.stepCallBack(container, date1);

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
                    if (param.isHouer) {
                        hour = "";
                    } else {
                        hour = "00";
                    }
                }


                function figure(number) {
                    number += '';
                    var arr = [],
                        len = number.length,
                        itemCls;
                    if (len > 1) {
                        for (var i = 0; i < len; i++) {
                            itemCls = param && param.timeItemCls || '';
                            if (isRemind) {
                                arr.push('<em class="' + itemCls + '" style="background-color:' + param.remindBgColor + '">');
                            } else {
                                arr.push('<em class="' + itemCls + '">');
                            }

                            arr.push(number.charAt(i));
                            arr.push('</em>');
                        }
                        return arr.join('');
                    }
                    return '<em>' + number + '</em>';
                }

                // hour = figure(hour) + '<span>:</span>';
                hour = figure(hour) + (param.isHouer ? '' : '<span>:</span>');

                second = figure(second);

                if (!param) {
                    min = figure(min) + '<span>:</span>';
                    timeHtml = hour + min + second;
                } else {
                    min = figure(min);
                    // min = figure(min) + (param.isHasSecond ? '<span>:</span>' : '');
                    second = param.isHasSecond ? '<span>:</span>' + second : '';
                    if (day > 0) {
                        day = figure(day);
                        timeHtml = '<span class="' + param.panelCls + '">' + param.prevText + '</span>' + day + '<span>天</span>' + hour + min + param.afterText;

                        // clearInterval(countdowntimeout);
                    } else {
                        timeHtml = '<span class="' + param.panelCls + '">' + param.prevText + '</span>' + hour + min + second + param.afterText;
                    }

                }
                //每步执行回调
                param.stepEndCallBack && (timeHtml = param.stepEndCallBack(container, date1, timeHtml) || timeHtml)

                container.html(timeHtml);
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
        timeItemCls: '',
        isHouer: false,
        stepCallBack: null, //步骤回调
        stepEndCallBack: null, //步骤完毕回调,
        remindTime: 0,
        remindBgColor: '#dd3333'
    }

    return countdown;
})