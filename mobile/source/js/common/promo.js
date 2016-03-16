/*
* 滑动窗口
* 这里暂时只为单一结构提供css动画滑动效果
*
<section class="promo-container" id="J-promo">
        <ul class="promo-reveal" style="width: 960px; -webkit-transform: translate3d(-315px, 0px, 0px); transition: 0.5s; -webkit-transition: 0.5s;">
            <li>
                <img src="http://p5.img.ymatou.com/upload/product/original/960b296cb607475994c207a343332b1f_o.jpg" alt="">
            </li>
            <li>
                <img src="http://p5.img.ymatou.com/upload/product/original/960b296cb607475994c207a343332b1f_o.jpg" alt="">
            </li>
                <li>
                <img src="http://p5.img.ymatou.com/upload/product/original/960b296cb607475994c207a343332b1f_o.jpg" alt="">
            </li>
        </ul>
                
        <ol class="promo-nav" style="left: 139px;">
            <li data-index="0" class=""></li>
            <li data-index="1" class="selected"></li>
            <li data-index="2" class=""></li>
        </ol>
</section>
* 
*/
define(function (require, exports, module) {
    var promo = function (elm) {
        var $ul = elm.find(".promo-reveal"),
            $ol = elm.find(".promo-nav"),
            $navLis = $ol.find("li"),
            $lis = $ul.find("li"),
            size = $lis.size(),  
            imgWidth = $lis.find("img").width();            

        //让图片居中
        var oldOffset = offset = (elm.width() - imgWidth) / 2;

        $ol.css({
            left: (elm.width() - $ol.width()) / 2 + "px"
        })

        $ul.css({
            "-webkit-transform": "translate3d(" + offset + "px, 0px, 0px)",
            "transition": "0.5s"
        })
        //只有一个宣传片 一下操作全部取消
        if (size < 2) {
            return
        }
        
        //var totalWidth = $lis.eq(1).offset().left * size;
        //$ul.width(totalWidth + "px");

        var init = function () {
            if (size > 2) {
                $ul.prepend($ul.find("li").eq(-1)).css({
                    "-webkit-transform": "translate3d(-400px, 0px, 0px)"
                })
            }
        }
        var isRun = false;
        //滑动
        var slide = function (dire, inx) {
            inx += parseInt(dire);
            console.log(index)
            if (inx < 0 || inx >= size) {
                return;
            }
            index = inx;

            if (isRun) {
                return;
            }
            isRun = true;

            dire = dire || 1;
            offset = inx ? offset - $lis.width() * dire : oldOffset;
            $ul.css({
                "-webkit-transform": "translate3d(" + Math.min(offset, oldOffset) + "px, 0px, 0px)",
                "transition": "0.5s"
            })

            $navLis.removeClass("selected").eq(inx).addClass("selected");
        }

        var index = 0, _timer;

        var startTimer = function () {
            if (size < 2) {
                return;
            }
            _timer = setInterval(function () {
                index = index >= size ? 0 : index
                slide(1, index)
            }, 5000);
        }
        //startTimer();
        $navLis.click(function () {
            if ($(this).hasClass("selected")) {
                    return;
            }
            var lastInx = $navLis.filter(".selected").removeClass("selected").attr("data-index");
            //先清除定时器
            clearInterval(_timer);
            index = $(this).attr("data-index");
            isRun = false;
            slide(lastInx > index ? -1 : 1, index);
            //滑动结束在重新开始计时
            startTimer()
        })
        var pos = {
            originalCoord: {},
            shiftCoord: {},
            finalCoord: {}
        };
        elm[0].addEventListener("touchstart", function (event) {
            //定义滑动初始时的坐标
            pos.originalCoord.x = event.targetTouches[0].pageX;
            pos.originalCoord.y = event.targetTouches[0].pageY;
            pos.shiftCoord.x = event.targetTouches[0].pageX;
            pos.shiftCoord.y = event.targetTouches[0].pageY;
            isRun = false;
        }, false);
        elm[0].addEventListener("touchmove", function (event) {
            //先清除定时器
            clearInterval(_timer);


            //定义滑动中的坐标
            pos.finalCoord.x = event.targetTouches[0].pageX;
            pos.finalCoord.y = event.targetTouches[0].pageY;

            var x = Math.abs(pos.originalCoord.x - pos.finalCoord.x), y = Math.abs(pos.originalCoord.y - pos.finalCoord.y);
            if(x>y){
                event.preventDefault();
            }
            if (!isRun && pos.finalCoord.x - pos.shiftCoord.x > 10) {
                slide(-1, index)
            } else if (!isRun && pos.finalCoord.x - pos.shiftCoord.x < -10) {
                slide(1, index)
            }
            //滑动结束在重新开始计时
            startTimer()
            isRun = true;
        }, false);
        elm[0].addEventListener("touchend", function (event) {
            isRun = false;
        }, false);
    }
    return promo;
})