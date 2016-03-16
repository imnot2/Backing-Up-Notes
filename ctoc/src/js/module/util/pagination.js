Ymt.add(function (require, exports, module) {
    return function (obj) {
        var index = parseInt(obj.index) || 1,
			count = parseInt(obj.count) || 0,
			prev = obj.prev || 0,
			next = obj.next || 0,
			i = 0,
			pageHtmls = [];

        if (index == 1) {
            pageHtmls.push("<a>&lt;</a>")
        } else {
            pageHtmls.push("<a href='javascript:;'>&lt;</a>")
        }

        pageHtmls.push("<a href='javascript:;' number='1'>1</a>");

        if (index - prev > 2) {
            pageHtmls.push("...");
        }

        for (i = Math.max(index - prev, 0) ; i > 0; i--) {
            pageHtmls.push("<a href='javascript:;' number='" + (index - i) + "'>" + (index - i) + "</a>")
        }

        pageHtmls.push("<a class='select'>" + index + "</a>")

        for (i = 1; i < Math.min(next + index, count - index) ; i++) {
            pageHtmls.push("<a href='javascript:;' number='" + (index + i) + "'>" + (index + i) + "</a>")
        }

        if (index + next < count) {
            pageHtmls.push("...");
        }

        pageHtmls.push("<a href='javascript:;' number='" + count + "'>" + count + "</a>");

        if (index == count) {
            pageHtmls.push("<a>&gt;</a>")
        } else {
            pageHtmls.push("<a href='javascript:;'>&gt;</a>")
        }
        return pageHtmls.join('');
    }
});