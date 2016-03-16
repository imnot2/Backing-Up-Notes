/**
* 倒计时
* @param 
*   currTime 当前时间
*   targetTime 目标时间
*   stepFn 步骤回调函数
*   doneFn 完成回调函数
*   isFormat 是否格式化
*/
define(function (require, exports, module) {
    var countDown = function (opts) {
        if (!opts) {
            return;
        }

        var surplus = opts.targetTime - opts.currTime;
        //如果倒计时为负数则直接执行完成函数
        if (surplus < 0) {
            //执行完成回调函数
            if (opts.doneFn) {
                opts.doneFn()
            }
            return;
        }

        var timing = function (time) {
            time = time || surplus
            var hh = parseInt(time / 1000 / 60 / 60 % 24, 10),//计算剩余的小时数 
                mm = parseInt(time / 1000 / 60 % 60, 10),//计算剩余的分钟数  
                ss = parseInt(time / 1000 % 60, 10);//计算剩余的秒数
            //格式化时间;补零
            var format = function (timer) {
                return timer > 9 ? timer : "0" + timer;
            }
            return {
                hour: format(hh),
                minute: format(mm),
                second: format(ss)
            }
        }
        var counDownTimer = function (time) {
            surplus -= 1000;
            var timeObj = timing(time);
            //执行步骤回调函数
            if (opts.stepFn) {
                opts.stepFn(timeObj)
            }
            if (surplus > 0) {
                setTimeout(function () {
                    counDownTimer(surplus)
                },
                1000)
            } else {
                //执行完成回调函数
                if (opts.doneFn) {
                    opts.doneFn()
                }
            }
        }
        counDownTimer(surplus)
    }
   return countDown;
})