/*
* 文字截取
* create by:river
* create date ： 2014/08/15
* 文字截取两种方式截取，按字数，按行数
* 分别通过相应自定义属性
* data-textflow-words 字数
* data-textflow-rows  行数
*/
Ymt.add(function (require, exports, module) {
    var defOpts = {
        defSel: '.textflow',//默认选择
        rowNum:3,
        ellipsis:"..."//超出替换符号
    }
    /*
    * 字数截取
    * @param {objcet} 截取对象
    * @param {number} 行数
    */
    function wordsIntercept($target, wordsNum) {
        $target.each(function () {

        })
    }
    /*
    *行高截取
    * @param {objcet} 截取对象
    * @param {number} 行数
    */
    function RowIntercept($target,rowNum) {
        $target.each(function () {
            var $this = $(this),
                clientHeight = this.clientHeight,//容器高度
                fontSize = parseFloat($this.css("fontSize")),
                lineHeight = parseFloat($this.css("lineHeight"));
            var title = $this.attr("title");
            //将原来的值保存到title中
            if (title === undefined || title === "") {
                $this.attr("title", title = $this.text());
            }
            //将原来的值还原重新计算
            $this.text(title);

            var dheight = parseInt(rowNum * lineHeight);
            if (clientHeight >= dheight) {
                while (dheight * 3 < this.clientHeight) {
                    $this.text(title.substring(0, title.length / 2));
                    title = $this.text();
                }
                //减去末尾文字
                while (dheight < this.clientHeight) {
                    title = $this.text();
                    $this.text(title.replace(/(\s)*([a-zA-Z0-9]?|\W)(\.\.\.)?$/, "..."));
                }
            }
        })
    }
    /**
    * @param {string} 选择器
    * @param {string} 子选择器
    *   子选择器的目的，在父元素定义自定义属性，所有子选择应用这个选项，就不需要每个标签都去定义截取方式。        
    * @param {object} 配置项
    */
    return function (selector, childer, opts) {
        var $target, num, $childer;
        opts = opts || defOpts;
        //如果没有传入使用默认
        if (!arguments.length || typeof arguments[0] !== "string") {
            $childer = $target = $(".textflow");
        } else {
            $childer = $target = $(selector);
        }
        //判断是否有配置项
        if (opts === "objcet") {
            opts = $m.merge(defOpts, opts);
        }
        //判断是否有子项
        if (typeof arguments[1] === "string") {
            $childer = $target.find(childer);
        }
        //按行截取大于按字数截取
        if (num = $target.attr("data-textflow-rows") || opts.rowNum) {
            RowIntercept($childer, num);
            return;
        }
        if (num = $target.attr("data-textflow-words")) {
            wordsIntercept($childer, num);
        }
        
    }
})