define(function (require, exports, module) {

    // 换肤选择颜色
    var arrColor2 = [{
        color: "#FFBFBF"
    }, {
        color: "#FFCFBF"
    }, {
        color: "#FFDFBF"
    }, {
        color: "#FFEFBF"
    }, {
        color: "#FFFFBF"
    }, {
        color: "#EFFFBF"
    }, {
        color: "#DFFFBF"
    }, {
        color: "#CFFFBF"
    }, {
        color: "#BFFFBF"
    }, {
        color: "#BFFFCF"
    }, {
        color: "#BFFFDF"
    }, {
        color: "#BFFFEF"
    }, {
        color: "#BFFFFF"
    }, {
        color: "#BFEFFF"
    }, {
        color: "#BFDFFF"
    }, {
        color: "#BFCFFF"
    }, {
        color: "#BFBFFF"
    }, {
        color: "#CFBFFF"
    }, {
        color: "#DFBFFF"
    }, {
        color: "#EFBFFF"
    }, {
        color: "#FFBFFF"
    }, {
        color: "#FF9999"
    }, {
        color: "#FFB399"
    }, {
        color: "#FFCC99"
    }, {
        color: "#FFE599"
    }, {
        color: "#FFFF99"
    }, {
        color: "#E5FF99"
    }, {
        color: "#CCFF99"
    }, {
        color: "#B3FF99"
    }, {
        color: "#99FF99"
    }, {
        color: "#99FFB3"
    }, {
        color: "#99FFCC"
    }, {
        color: "#99FFE5"
    }, {
        color: "#99FFFF"
    }, {
        color: "#99E5FF"
    }, {
        color: "#99CCFF"
    }, {
        color: "#99B3FF"
    }, {
        color: "#9999FF"
    }, {
        color: "#B399FF"
    }, {
        color: "#CC99FF"
    }, {
        color: "#E599FF"
    }, {
        color: "#FF99FF"
    }, {
        color: "#FF7373"
    }, {
        color: "#FF9673"
    }, {
        color: "#FFB973"
    }, {
        color: "#FFDC73"
    }, {
        color: "#FFFF73"
    }, {
        color: "#DCFF73"
    }, {
        color: "#B9FF73"
    }, {
        color: "#96FF73"
    }, {
        color: "#73FF73"
    }, {
        color: "#73FF96"
    }, {
        color: "#73FFB9"
    }, {
        color: "#73FFDC"
    }, {
        color: "#73FFFF"
    }, {
        color: "#73DCFF"
    }, {
        color: "#73B9FF"
    }, {
        color: "#7396FF"
    }, {
        color: "#7373FF"
    }, {
        color: "#9673FF"
    }, {
        color: "#B973FF"
    }, {
        color: "#DC73FF"
    }, {
        color: "#FF73FF"
    }, {
        color: "#FF4D4D"
    }, {
        color: "#FF7A4D"
    }, {
        color: "#FFA64D"
    }, {
        color: "#FFD24D"
    }, {
        color: "#FFFF4D"
    }, {
        color: "#D2FF4D"
    }, {
        color: "#A6FF4D"
    }, {
        color: "#7AFF4D"
    }, {
        color: "#4DFF4D"
    }, {
        color: "#4DFF7A"
    }, {
        color: "#4DFFA6"
    }, {
        color: "#4DFFD2"
    }, {
        color: "#4DFFFF"
    }, {
        color: "#4DD2FF"
    }, {
        color: "#4DA6FF"
    }, {
        color: "#4D7AFF"
    }, {
        color: "#4D4DFF"
    }, {
        color: "#7A4DFF"
    }, {
        color: "#A64DFF"
    }, {
        color: "#D24DFF"
    }, {
        color: "#FF4DFF"
    }, {
        color: "#FF2626"
    }, {
        color: "#FF5C26"
    }, {
        color: "#FF9326"
    }, {
        color: "#FFC926"
    }, {
        color: "#FFFF26"
    }, {
        color: "#C9FF26"
    }, {
        color: "#93FF26"
    }, {
        color: "#5CFF26"
    }, {
        color: "#26FF26"
    }, {
        color: "#26FF5C"
    }, {
        color: "#26FF93"
    }, {
        color: "#26FFC9"
    }, {
        color: "#26FFFF"
    }, {
        color: "#26C9FF"
    }, {
        color: "#2693FF"
    }, {
        color: "#265CFF"
    }, {
        color: "#2626FF"
    }, {
        color: "#5C26FF"
    }, {
        color: "#9326FF"
    }, {
        color: "#C926FF"
    }, {
        color: "#FF26FF"
    }, {
        color: "#FF0000"
    }, {
        color: "#FF4000"
    }, {
        color: "#FF8000"
    }, {
        color: "#FFBF00"
    }, {
        color: "#FFFF00"
    }, {
        color: "#BFFF00"
    }, {
        color: "#80FF00"
    }, {
        color: "#40FF00"
    }, {
        color: "#00FF00"
    }, {
        color: "#00FF40"
    }, {
        color: "#00FF80"
    }, {
        color: "#00FFBF"
    }, {
        color: "#00FFFF"
    }, {
        color: "#00BFFF"
    }, {
        color: "#0080FF"
    }, {
        color: "#0040FF"
    }, {
        color: "#0000FF"
    }, {
        color: "#4000FF"
    }, {
        color: "#8000FF"
    }, {
        color: "#BF00FF"
    }, {
        color: "#FF00FF"
    }, {
        color: "#D90000"
    }, {
        color: "#D93600"
    }, {
        color: "#D96D00"
    }, {
        color: "#D9A300"
    }, {
        color: "#D9D900"
    }, {
        color: "#A3D900"
    }, {
        color: "#6DD900"
    }, {
        color: "#36D900"
    }, {
        color: "#00D900"
    }, {
        color: "#00D936"
    }, {
        color: "#00D96D"
    }, {
        color: "#00D9A3"
    }, {
        color: "#00D9D9"
    }, {
        color: "#00A3D9"
    }, {
        color: "#006DD9"
    }, {
        color: "#0036D9"
    }, {
        color: "#0000D9"
    }, {
        color: "#3600D9"
    }, {
        color: "#6D00D9"
    }, {
        color: "#A300D9"
    }, {
        color: "#D900D9"
    }, {
        color: "#B20000"
    }, {
        color: "#B22D00"
    }, {
        color: "#B25900"
    }, {
        color: "#B28500"
    }, {
        color: "#B2B200"
    }, {
        color: "#85B200"
    }, {
        color: "#59B200"
    }, {
        color: "#2DB200"
    }, {
        color: "#00B200"
    }, {
        color: "#00B22D"
    }, {
        color: "#00B259"
    }, {
        color: "#00B285"
    }, {
        color: "#00B2B2"
    }, {
        color: "#0085B2"
    }, {
        color: "#0059B2"
    }, {
        color: "#002DB2"
    }, {
        color: "#0000B2"
    }, {
        color: "#2D00B2"
    }, {
        color: "#5900B2"
    }, {
        color: "#8500B2"
    }, {
        color: "#B200B2"
    }, {
        color: "#8C0000"
    }, {
        color: "#8C2300"
    }, {
        color: "#8C4600"
    }, {
        color: "#8C6900"
    }, {
        color: "#8C8C00"
    }, {
        color: "#698C00"
    }, {
        color: "#468C00"
    }, {
        color: "#238C00"
    }, {
        color: "#008C00"
    }, {
        color: "#008C23"
    }, {
        color: "#008C46"
    }, {
        color: "#008C69"
    }, {
        color: "#008C8C"
    }, {
        color: "#00698C"
    }, {
        color: "#00468C"
    }, {
        color: "#00238C"
    }, {
        color: "#00008C"
    }, {
        color: "#23008C"
    }, {
        color: "#46008C"
    }, {
        color: "#69008C"
    }, {
        color: "#8C008C"
    }, {
        color: "#660000"
    }, {
        color: "#661A00"
    }, {
        color: "#663300"
    }, {
        color: "#664C00"
    }, {
        color: "#666600"
    }, {
        color: "#4C6600"
    }, {
        color: "#336600"
    }, {
        color: "#1A6600"
    }, {
        color: "#006600"
    }, {
        color: "#00661A"
    }, {
        color: "#006633"
    }, {
        color: "#00664C"
    }, {
        color: "#006666"
    }, {
        color: "#004C66"
    }, {
        color: "#003366"
    }, {
        color: "#001A66"
    }, {
        color: "#000066"
    }, {
        color: "#1A0066"
    }, {
        color: "#330066"
    }, {
        color: "#4C0066"
    }, {
        color: "#660066"
    }, {
        color: "#400000"
    }, {
        color: "#401000"
    }, {
        color: "#402000"
    }, {
        color: "#403000"
    }, {
        color: "#404000"
    }, {
        color: "#304000"
    }, {
        color: "#204000"
    }, {
        color: "#104000"
    }, {
        color: "#004000"
    }, {
        color: "#004010"
    }, {
        color: "#004020"
    }, {
        color: "#004030"
    }, {
        color: "#004040"
    }, {
        color: "#003040"
    }, {
        color: "#002040"
    }, {
        color: "#001040"
    }, {
        color: "#000040"
    }, {
        color: "#100040"
    }, {
        color: "#200040"
    }, {
        color: "#300040"
    }, {
        color: "#400040"
    }, {
        color: "#FFFFFF"
    }, {
        color: "#EEEEEE"
    }, {
        color: "#DDDDDD"
    }, {
        color: "#CCCCCC"
    }, {
        color: "#BBBBBB"
    }, {
        color: "#AAAAAA"
    }, {
        color: "#999999"
    }, {
        color: "#888888"
    }, {
        color: "#777777"
    }, {
        color: "#666666"
    }, {
        color: "#555555"
    }, {
        color: "#444444"
    }, {
        color: "#333333"
    }, {
        color: "#222222"
    }, {
        color: "#111111"
    }, {
        color: "#000000"
    }];

    // 颜色选择器模板
    var htmlColorDom = '<div class="pb-color-wrap">\
	<div class="color-box" >\
		<div class="color-left-area J_color_panel">\
			<h3>选择一个色彩</h3>\
            <div class="J_reset_color" ><a class="J_reset_itemA" href="javascript:;" data-color="#CC3333" style="background-color:#CC3333;" ></a>默认色</div>\
			<div class="color-btn-group" id="J_color_btn_group" ></div>\
		</div>\
		<div class="color-right-area">\
			<h3>色彩预览</h3>\
			<div class="color-preview" id="J_color_preview"></div>\
		</div>\
		<div class="color-input-group" id="J_color_input_group" >\
			<h4>自定义色彩</h4>\
			<p>请输入16进制色彩代码：<label>#<input class="J_colorp_input" type="text" placeholder="如 FFFFFF" ></label></p>\
			<div class="color-addcolor" ><a id="J_add_color" href="javascript:;">添加</a><em class="color-tips" >代码格式有误。</em></div>\
		</div>\
	</div>\
	<div class="color-footer">\
		<a href="javascript:;" class="color-confirm">确定</a><a href="javascript:;" class="color-cancel">取消</a>\
	</div>\
</div>';


    var oPbColorWrap; // 首先创建颜色面板骨架

    var $J_base_color_list, $J_base_color;
    var originColor; // 原始元素的颜色
    var $J_color_btn_group, $J_color_preview, $J_colorp_input, $J_add_color, $J_inputc_box;
    var $confirm, $cancel;
    var $resetBtn;

    var htmlNew = ''; // 如果用户有添加了新的色块， 那么 添加上它
    var arrColor = [];

    var callback; // 当确定或取消按钮点击后要回调的函数

    // 设置body高度， 重置css中html:100%造成的问题
    $(document.body).css('height', 'auto');

    /* 
		$J_base_color:颜色面板选择器的外层父容器
		
		arrColor: 此色彩面板总共有多少颜色块提供给用户选择
		option:{
			colorEleList // 面板要控制到的页面上的哪些元素， 某个值的颜色选中了， 对应的页面元素会置为相应的颜色
			arrColor // 面板上的自定义颜色数
			callback // 当用户确定选择完一个颜色后， 回调函数会把这个颜色传给外部 // callback(arg) 当选择确定后， 会把一个颜色值传给arg,如果选择取消后， 则取消选择
		}
	 */
    // function colorpicker( $colorBox,  $colorList,fnCall, arrColor){
    function colorpicker($colorBox, option) {

        $J_base_color = $colorBox;
        // $J_base_color_list = $colorList;
        $J_base_color_list = option.colorEleList || [];

        callback = option.callback;
        arrColor = option.arrColor || arrColor2;
        $J_base_color_list.css("transition", "background 0.5s");
        $J_base_color_list.css("-ms-transition", "background 0.5s");

        originColor = $J_base_color_list.css("background-color");

        /*// 设置默认色
         */

        init(option.color); // 把默认出厂色带进去
    }

    function init(type) {

        // 首先创建颜色面板骨架
        oPbColorWrap = document.createElement("div");
        oPbColorWrap.className = "pb-color-wrap";

        // htmlNew = $J_base_color.data("wrapHtml") || htmlColorDom;
        $J_base_color.data('arrcolor', arrColor);
        $(oPbColorWrap).html(htmlColorDom);
        $J_base_color.append($(oPbColorWrap));

        // 给色块父级侦听点击事件
        // 拿到预览框和色彩input
        $J_color_preview = $("#J_color_preview");
        $J_colorp_input = $(".J_colorp_input");
        $J_add_color = $("#J_add_color");
        $J_inputc_box = $("#J_color_input_group");

        $confirm = $(".color-confirm");
        $cancel = $(".color-cancel");

        // 出厂颜色设置
        $resetBtn = $('.J_reset_itemA');

        $J_color_btn_group = $("#J_color_btn_group");
        $J_color_btn_group.html("");

        $J_color_preview.css("background-color", $J_base_color_list.css("background-color"));

        // 布局$J_inputc_box, 让它与色彩预览左对齐
        $('#J_color_input_group').css("right", $('.color-right-area').width() - $('#J_color_input_group').width());

        // 填充色块
        // 先获取 色块们的母元素 J_color_btn_group
        var dataArr = $J_base_color.data('arrcolor');
        void

        function () {
            for (var i = 0; i < dataArr.length; i++) {
                createColorA(dataArr[i].color);
            }
        }();

        void

        function () {
            if (type == "basecolor") {

                $('.J_reset_itemA').css('background-color', '#CC3333');
                $('.J_reset_itemA').attr('data-color', '#CC3333');

            }
            else if (type == "bgcolor") {

                $('.J_reset_itemA').css('background-color', '#EEEEEE');
                $('.J_reset_itemA').attr('data-color', '#EEEEEE');

            }
        }();

        bindEvent();
    }

    function bindEvent() {
        $J_color_btn_group.click(clickGroupA);
        $resetBtn.click(resetColorFunc);

        // 当用户对input框中的色彩值进行自己更改时， 触发相应色彩变化
        $J_add_color.click(function (evt) {
            var oTargetInput = $J_colorp_input;
            var sColor = $.trim(oTargetInput.val());


            var reg = /^[A-F0-9]{6}$/gi; // 颜色的色彩正则
            if (reg.test(sColor)) {
                // 如果正确输入颜色值，改变color_preview
                $J_color_preview.attr("data-color", "#" + sColor);
                $J_color_preview.css("background-color", "#" + sColor);
                $J_base_color_list.css("background-color", "#" + sColor);

                // 查看下左边色彩面板内有无重复色彩，无的话，添加上，有的话，就不用了
                var mIndex = getColorIndex(sColor);
                if (mIndex == null) {
                    var $oA = createColorA("#" + sColor);
                    selectTargetA($oA);

                    $J_color_btn_group.unbind("click");
                    $J_color_btn_group.click(clickGroupA);

                    // htmlNew = oPbColorWrap.innerHTML;
                    // $J_base_color.data("wrapHtml", htmlNew);
                    void

                    function () {

                        var arr = $J_base_color.data('arrcolor');
                        arr.push({
                            color: $oA.attr("data-color")
                        });
                        $J_base_color.data('arrcolor', arr);

                    }();
                }

                setErrorInput(false);

            }
            else {

                setErrorInput(true);
            }
        });

        // 面板 '确定' 与 '取消' 事件处理
        $confirm.click(function () { // 只有当点击确定后，颜色才会作出真正改变
            originColor = $J_color_preview.attr("data-color");

            $J_base_color.empty();
            callback && callback(originColor);
        });

        $cancel.click(function () { // 将颜色重置为用户选择面板前的颜色
            // originColor
            $J_base_color_list.css("background-color", originColor);

            $J_base_color.empty();
            callback && callback();
        });
    }

    // 取得用户输入的颜色值是否有在颜色面板中
    function getColorIndex(sColor) {
        var arrList = $("#J_color_btn_group a");
        for (var i = 0; i < arrList.length; i++) {
            var $oA = $(arrList[i]);
            if ("#" + sColor.toUpperCase() == $oA.attr("data-color")) {
                return i;
            }
        }

        return null;
    }

    function setErrorInput(bool) { // 右边错误提示 bool:true 显示错误提示   :false 隐藏错误提示
        var $tips = $(".color-tips"); // 取得错误提示
        if (bool) {
            $tips.css("display", "block");
            $J_colorp_input.addClass("err-color");
        }
        else {
            $tips.css("display", "none");
            $J_colorp_input.removeClass("err-color");
        }

    }

    // 生成色块
    function createColorA(sColor) {
        var oA = document.createElement('a');
        oA.className = "color-itemA";
        $J_color_btn_group.append($(oA));
        $(oA).attr("data-color", sColor);
        $(oA).css("background-color", $(oA).attr("data-color"));

        return $(oA);
    }

    // 恢复出厂设置
    function resetColorFunc(evt) {

        var oTarget = evt.target;
        if (oTarget.nodeName.toLowerCase() != 'a') { // 如果点击到的不是色块，即a标记，则离开 
            return;
        }

        selectTargetA($(oTarget)); // **********

        var targetColor = $(oTarget).attr("data-color");
        var sInputColor = targetColor.substring(1);
        $J_colorp_input.val(sInputColor); // 将颜色值写入到input框中
        $J_color_preview.attr("data-color", targetColor);
        $J_color_preview.css("background-color", targetColor);
        $J_base_color_list.css("background-color", targetColor);
    }

    // 给色块大容器添加一个点击事件
    function clickGroupA(evt) {
        // 出厂设置色块边框恢复默认
        $('.J_reset_itemA').css('border-color', '#DDD');

        var oTarget = evt.target;
        if (oTarget.nodeName.toLowerCase() != 'a') { // 如果点击到的不是色块，即a标记，则离开 
            return;
        }

        selectTargetA($(oTarget)); // **********

        var targetColor = $(oTarget).attr("data-color");
        var sInputColor = targetColor.substring(1);
        $J_colorp_input.val(sInputColor); // 将颜色值写入到input框中
        $J_color_preview.attr("data-color", targetColor);
        $J_color_preview.css("background-color", targetColor);
        $J_base_color_list.css("background-color", targetColor);
    }

    // 选中a元素
    function selectTargetA($oA) {

        setErrorInput(false);
        $J_color_btn_group.find("a").css({
            "border-color": "#DDD",
            "width": "22px",
            "height": "22px",
            "border-width": "1px"
        });

        $oA.css({
            "border-color": "#F04E00",
            "width": "20px",
            "height": "20px",
            "border-width": "2px"
        });
    }

    return colorpicker;
});