gui.utils.StartCountDown = function(node, callback) {
    this.node = node;
    this.timer_sendCheckCode = null;
    if (!isFunction(callback)) this.callback = function() {};
};
gui.utils.StartCountDown.prototype.init = function() {
    var node = this.node;
    var that = this;
    that.timer_sendCheckCode = setInterval(function() {
        var countDownNode = node.querySelector('.count-down');
        var curTime = parseInt(countDownNode.text());
        if (curTime === 1) {
            that.callback();
            clearInterval(that.timer_sendCheckCode);
        } else {
            countDownNode.text(--curTime);
        }
    }, 1000);
};