//异步
function Promise() {
    this.list = [];
}
Promise.prototype.push = function(fn) {
    var _fn = fn,
        next = bindScope(this.next, this);
    fn = function() {
        _fn.apply(null, [next].concat([].slice.call(arguments, 0)));
    };
    this.list.push(fn);
    return this;
};
Promise.prototype.next = function() {
    if (this.list.length > 0) {
        var fn = this.list.shift();
        fn.apply(null, [].slice.call(arguments, 0));
    }
};