define(function (require, exports, module) {
    function main(g, i) {
        if (!(this instanceof main)) return new main(g, $m.merge(config, i));

        function change() {
            var s = new Date(s3),
                h = s.getHours(),
                m = s.getMinutes();
            s = s.getSeconds();
            if (i.timezone != "+8") {
                h = gap(h, o);
            }
            box.html((h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s));
            s3 = s3 + 1000;
        }

        function gap(hour, offset) {
            return hour >= offset ? hour - offset : 24 + (hour - offset);
        }

        function day(y, m, d) {
            m = m == 1 ? (--y, 13) : m == 2 ? (--y, 14) : m;
            var c = parseInt((y + '').slice(0, -2));
            y = parseInt((y + '').slice(-2));
            return (y + parseInt(y / 4) + parseInt(c / 4) - 2 * c + parseInt(26 * (m + 1) / 10) + d - 1) % 7;
        }

        i.timezone = i.timezone.toLowerCase().replace(/\s/g, '');

        i.time = typeof i.time == "string" ? new Date(i.time) : typeof i.time == "object" ? i.time : new Date();
        var box = $(g),
            z = i.timezone.charAt(0),
            n = parseInt(i.timezone.charAt(1)),
            s3,
            o = 0,
            m, d, d1, t;


        s3 = i.time.getTime();

        if (z == "+") {
            o = 8 - n;
        }
        if (z == "-") {
            o = 8 + n;
        }
        t = new Date(s3 - o * 60 * 60 * 1000);
        //美国夏令时

        if (z == "-" && n < 11 && n > 4) {
            m = t.getMonth();
            d = day(t.getFullYear(), m + 1, 1);
            d1 = new Date(t.getFullYear(), m, 1);
            if (m > 2 && m < 10) {
                i.dst = !0;
            } else {
                if (m == 2) {
                    d = d == 0 ? 7 : 13 - d;
                    if (t.getTime() > d1.getTime() + d * 24 * 60 * 60 * 1000) {
                        i.dst = !0;
                    }
                }
                if (m == 10) {
                    d = d == 0 ? d : 6 - d;
                    if (t.getTime() < d1.getTime() + d * 24 * 60 * 60 * 1000) {
                        i.dst = !0;
                    }
                }
            }
        }
        o = i.dst ? o + i.dstNum : o;
        timer = setInterval(change, 1000);
    }
    var config = {
        dst: !1,
        dstNum: 1,
        timezone: '+8',
        time: null
    }
    return main
});