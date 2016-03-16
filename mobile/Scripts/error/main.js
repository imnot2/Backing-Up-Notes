define(function (require, exports, module) {
    var c = require('error/controll');
    $m.mobile.when('/index', {
        template: 'error/index.html',
        controller: c.errorPage,
        config: {
            title: '出错啦'
        }
    })
    .defaultWish({ redirect: '/index', app: c });
    console.log(c)
});