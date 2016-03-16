define(function (require, exports, module) {
    return {
        byteLen: function (str) {
            var strlength = 0,
                code;
            for (var a = 0, length = str.length; a < length; a++) {
                code = str.charCodeAt(a);
                strlength += code > 127 ? 2 : 1
            }
            return strlength
        },
        subStr: function (str, start, end) {
            var b = 0,
                resultbytes = 0,
                returnStr = "",
                length = str.length,
                bytes = this.byteLen(str);
            if (start < 0) start = bytes + start;
            if (end < 0 || !$m.isNumber(end)) end = ~~end + bytes;
            else end += start;
            for (; b < length; b++) {
                if (resultbytes >= start) break;
                bytes = str.charCodeAt(b);
                resultbytes += bytes > 127 ? 2 : 1
            }
            for (; b < length; b++) {
                bytes = str.charCodeAt(b);
                resultbytes += bytes > 127 ? 2 : 1;
                if (resultbytes > end) break;
                returnStr += str.charAt(b)
            }
            return returnStr
        }
    }
});