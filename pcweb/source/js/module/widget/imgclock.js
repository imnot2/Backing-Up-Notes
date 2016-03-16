/* 
 * 处理精灵图片时间变更
 * 根据时间替换相应偏移量的图片显示时间。
 * 可以处理本地或指定时区的时间
 * update Time:2014-08-08
 * update by :river
 * update log:增加了对时区的和夏令时的判断
 * update by:river
 * update log:增加时区计算之后的回调方法；y坐标位置偏移处理；
 */
define(function (require, exports, module) {
    function displayTime(g, c) {

        if (!(this instanceof displayTime)) return new displayTime(g, $m.merge(config, c));

        /*
         * @param {number} 本地时间 毫秒数
         * @param {number} 时区偏移量
         * @param {boolean} 是否使用夏令时 默认：true
         *
         */
        function timerZone(localTime, offset, isUseDST) {

            var d = new Date(localTime),
                localOffset = d.getTimezoneOffset() * 60000,
                utc = localTime + localOffset;
            targetTime = utc + (1000 * 60 * 60 * offset);
            var targetDate = new Date(targetTime),
                fullYear = targetDate.getFullYear();
            var d1 = new Date(fullYear, 0, 1);
            var d2 = new Date(fullYear, 6, 1);

            //如果不相等则是夏令时，需加一个小时；否则不是夏令时
            if (offset < 2 &&
                (isUseDST || isUseDST == void 0) &&
                d1.getTimezoneOffset != d2.getTimezoneOffset()) {
                targetTime += 1000 * 60 * 60;
            }
            return targetTime;
        }


        var Time = timerZone(c.time, c.timezone, c.isUseDST)

        var date = new Date(Time);
        var houer = date.getHours(),
            minutre = date.getMinutes(),
            moment = 0;

        if (houer > 10) {
            houer = houer - 12;
        }
        if (minutre > 53 && minutre <= 7) { //23:53:00-0:07:59使用0:00
            moment = 0;
        } else if (minutre > 8 && minutre <= 22) {
            moment = 1;
        } else if (minutre > 23 && minutre <= 37) {
            moment = 2;
        } else if (minutre > 38 && minutre <= 53) {
            moment = 3;
        }

        var x = c.spacing * moment,
            y = c.spacing * houer; //初始化 坐标是从0开始，计算y坐标需要减一
        $(g).css({
            'backgroundImage': 'url(' + c.sprite + ')',
            'backgroundPosition': '-' + x + 'px -' + y + 'px'
        });

        if (c.callBack) {
            c.callBack(date);
        }
    }

    var config = {
        sprite: '', //图片的地址
        time: null, //时间
        spacing: 170,
        timezone: 8, //时区
        isUseDST: true //使用使用夏令时
        //callBack: function () { }//回调函数
    }

    return displayTime;
})