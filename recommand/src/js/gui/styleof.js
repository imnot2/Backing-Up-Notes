var isString = isType('String');
var isFunction = isType('Function');
var isObject = isType('Object');

function isType(type) {
    return function(str) {
        return Object.prototype.toString.call(str) === '[object ' + type + ']';
    };
}