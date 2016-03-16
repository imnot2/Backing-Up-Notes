define(function (require, exports, module) {
    module.exports = {
        set: function (c, b, a, d, e, j) {
            a || (a = 365);
            e || (e = "/");
            a *= 864E5;
            var k = new Date((new Date).getTime() + a);
            document.cookie = c + "=" + encodeURIComponent(b) + (a ? ";expires=" + k.toGMTString() : "") + (e ? ";path=" + e : "") + (d ? ";domain=" + d : "") + (j ? ";secure" : "")
        },
        get: function (c) {
            for (var b = document.cookie.split("; "), a = 0; a < b.length; a++) {
                var d = b[a].split("=");
                if (c == d[0]) try {
                    return decodeURIComponent(d[1])
                } catch (e) {
                    return null
                }
            }
            return null
        },
        del: function (c, b, a) {
            document.cookie =
                c + "=1" + (a ? "; path=" + a : "; path=/") + (b ? "; domain=" + b : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT"
        },
        getDomain: function () {
            return "." + location.host.split(".").slice(-2).join(".")
        }
    }
});