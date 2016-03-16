define(function (require, exports, module) {
    module.exports = {
        set: function (name, value, time, domain, path, issecure) {
            time || (time = 365);
            path || (path = "/");
            time *= 864E5;
            var k = new Date((new Date).getTime() + time);
            document.cookie = name + "=" + encodeURIComponent(value) + (time ? ";expires=" + k.toGMTString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (issecure ? ";secure" : "")
        },
        get: function (name) {
            for (var cookies = document.cookie.split("; "), a = 0; a < cookies.length; a++) {
                var keyvalues = cookies[a].split("=");
                if (name == keyvalues[0]) try {
                    return decodeURIComponent(keyvalues[1])
                } catch (e) {
                    return null
                }
            }
            return null
        },
        del: function (name, domain, path) {
            document.cookie =
                name + "=1" + (path ? "; path=" + path : "; path=/") + (domain ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT"
        },
        getDomain: function () {
            return "." + location.host.split(".").slice(-2).join(".")
        }
    }
});