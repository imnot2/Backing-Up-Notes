define(function (require, exports, module) {
    $m.event.bind($m.node('#btn-search')[0], 'click', function () {
        var s = $m.node('#searchInput')[0].value;
        if (s) {
            s = s.replace("&", "");
            s = s.replace(/(^\s*)|(\s*$)/g, '');
            location.href = '/products/k=' + encodeURIComponent(s);
        }
            
    });


})