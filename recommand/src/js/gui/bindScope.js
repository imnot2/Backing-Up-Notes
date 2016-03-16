function bindScope(func, scope) {
    if (isString(func)) {
        func = scope[func];
    }
    if (isFunction(func)) {
        throw '"func" is null';
    }
    var xargs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
    return function() {
        var fn = isString(func) ? scope[func] : func,
            args = (xargs) ? xargs.concat([].slice.call(arguments, 0)) : arguments;
        return fn.apply(scope || fn, args);
    };
}