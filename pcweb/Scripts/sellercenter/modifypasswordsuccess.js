Ymt.add(function (require, exports, module) {

    var CountDown = require("widget/countdown");

    CountDown('TimeCount', 4, function () {
        location.href = "/login";
    });

})