Ymt.add(function(require, exports, module) {
    var beforeTime = function(date) {

        var d_minutes, d_hours, d_days;
        var timeNow = parseInt(new Date().getTime() / 1000);
        var publishTime = parseInt(new Date(date).getTime() / 1000);
        var d;
        d = timeNow - publishTime;
        d_days = parseInt(d / 86400);
        d_hours = parseInt(d / 3600);
        d_minutes = parseInt(d / 60);

        if (d_days > 0 && d_days < 365) {
            return d_days + "天前";
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前";
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
        } else {
            return "刚刚";
        }
    };

    module.exports=beforeTime;
})