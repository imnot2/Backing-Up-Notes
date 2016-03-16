/*=======================floatToolBar.js===========================*/
(function () {
        var obj = j$("#floatToolBar");
        if (obj) {
            //var logonPop=j$("#logon-pop-wrap");
            var flag = false;
            //var logonFlag=true;
            var onlyOne = true;
            var clearTime = null;
            //var obj1=j$('#go_top');
            var floatToolBarOffsiteHeight = 0;
            obj.css("left", j$(window).width() - 38 + "px");
            if (j$.browser.msie && j$.browser.version == '6.0') {
                obj.css("position", "absolute");
            } else {
                obj.css("top", 300 - floatToolBarOffsiteHeight + "px");
            }
            //obj1.click(
            //	function(){
            //		j$(window).scrollTop(0);
            //	}
            //);
            j$(window).scroll(
	            function () {
		            if (j$(window).scrollTop() == 0) {
		                //obj.fadeOut();
		                //if(j$.browser.msie){
		                //	logonPop.hide();
		                //}else{
		                //	logonPop.fadeOut();
		                //}
		                //flag=true;
		                //logonFlag=true;
		            } else if (flag == true) {
		                flag = false;
		                obj.fadeIn();
		            } else if (onlyOne == true) {
		                obj.fadeIn();
		                onlyOne = false;
		            }
		            if (j$.browser.msie && j$.browser.version == '6.0') {
		                obj.css('top', j$(window).scrollTop() + 300 - floatToolBarOffsiteHeight + 'px');
		                if (clearTime != null) {
		                    clearTimeout(clearTime);
		                    obj.css("display", "none");
		                }
		                if (j$(window).scrollTop() > 0) {
		                    clearTime = setTimeout("j$('#floatToolBar').fadeIn('10');", 100);
		                }
		            }
	            }
            );
            j$(window).resize(
	            function () {
		            if (j$.browser.msie && j$.browser.version == '6.0') {
		                obj.css('top', j$(window).scrollTop() + 300 - floatToolBarOffsiteHeight + 'px');
		            } else {
		                obj.css("top", 300 - floatToolBarOffsiteHeight + "px");
		            }
		            obj.css("left", j$(window).width() - 38 + "px");
	            }
            );
        }
    })();
