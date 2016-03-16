define(function (require, exports, module) {
    exports.index = function (html, data) {
        //data = $m.parseJSON(data);
        $m.mobile.insertContent(html, data);

        //search
        $m.event.bind($m.node('#btn-search')[0], 'click', function () {
            var s = $m.node('#searchInput')[0].value;
            if (s)
                location.href = '/productlist/#k=' + encodeURIComponent(s);
        })

        var lazyimg = require('util/imglazyload');
        lazyimg($m.mobile.currentPage.element);
        var slide = require('widget/switch');
        slide('#mod-scroll', {
            triggers: '.trigger .item',
            effect: 'scrollx',
            panels: '.panel .item'
        });
    }
})