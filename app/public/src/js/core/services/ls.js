/* global core: true*/
/* jshint strict: false,latedef:nofunc */
/*
 * 对localstorage的封装
 * 继承了localstorage的方法，
 * 并主要增加onstorage 兼容性处理
 *
 */
core.factory('ls', ['$window', function ($window) {
    var ls = $window.localStorage,
        lsSignal = {
            get: function (key) {
                return ls.getItem(key);
            },
            /**
             * localStorage 设置
             * @param {string|object}
             *        可以通过key-value的方式单一赋值
             *        也支持通过传递对象
             *        {
             *           name:'river',
             *           age:12
             *        }
             *
             */
            set: function (key, val) {
                var set = function (key, val) {
                    if (typeof val !== 'string') {
                        val = JSON.stringify(val);
                    }
                    ls.setItem(key, val);
                };
                if (typeof key === 'object') {
                    for (var i in key) {
                        set(i, key[i]);
                    }
                }
                else {
                    set(key, val);
                }
                return lsSignal;
            },
            /*
             * 更新指定的key，如果有相同则不更新
             * @param {string}
             * @param {object}
             */
            update: function (key, newVal) {
                if (ls.isChange(key, newVal)) {

                }
            },
            /*
             * 本地localstorage是否变更
             * @param {string}
             * @param {object}
             * @return {blooean}
             */
            isChange: function (key, newVal) {
                var oldVal = lsSignal.get(key),
                    isEquals = true;

                if (typeof newVal === 'object') {
                    try {
                        //解析出错则不是对象 也就是不相等直接复制
                        oldVal = JSON.parse(oldVal);
                        for (var i in newVal) {
                            if (oldVal[i] !== newVal[i]) {
                                lsSignal.set(key, newVal);
                                break;
                            }
                        }
                    }
                    catch (e) {
                        isEquals = false;
                    }

                }
                else if (typeof newVal === 'string') {
                    isEquals = newVal === oldVal;
                }

                return isEquals;
            },
            remove: function (key) {
                ls.removeItem(key);
                return lsSignal;
            },
            clear: function () {
                ls.clear();
                return lsSignal;
            },
            /*
             * @param 回调函数
             * 这里使用localstorage进行跨webview通信
             * 通过检测localstorage值是否变化进行相关回调操作
             * ［注意］是websocket和native不支持的前提下采用的一套机制
             */
            onStorage: function (cb) {
                var timer = setInterval(function () {
                    cb(destroy);
                }, 100);
                //销毁轮询
                function destroy() {
                    clearInterval(timer);
                    timer = null;
                }
                var _onStorage = function () {
                    //如果onstorage事件可以用则使用原生事件触发,取消轮询
                    destroy();
                    cb(function () {
                        document.removeEventListener('storage', _onStorage, false);
                    });
                };
                document.addEventListener('storage', _onStorage, false);
            }
        };
    return lsSignal;
}]);