//组件
window.untils = {};

$(function(){
	var untils = window.untils;
	untils.tab = function(obj){
		var obj = obj || {},
			index,
			showClass = obj.showClass || "show",
			hoverClass = obj.hoverClass || "select";
		if(obj.evEls){
			obj.evEls.bind('mouseover',function(e){
				obj.evEls.removeClass(hoverClass);
				$(this).addClass(hoverClass);
				index = $(this).index();
				if(obj.pubEls) obj.pubEls.removeClass(showClass).eq(index).addClass(showClass);
			})
		}
	};
})

$(function(){
	var untils = window.untils;
	//转化json数据的日期
    untils.ChangeDateFormat = function(jsondate) {
        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        
        if (jsondate.indexOf("+") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        } else if (jsondate.indexOf("-") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        }
        //alert(jsondate);
        var date = new Date(parseInt(jsondate, 10));
        //alert(date.getHours());
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + currentDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
})

$(function(){
	var untils = window.untils;
	untils.page = function(obj){
		var index = parseInt(obj.index) || 1,
			count = parseInt(obj.count) || 0,
			prev = obj.prev || 0,
			next = obj.next || 0,
			i = 0,
			pageHtmls = [];
		
		if(index == 1){
			pageHtmls.push("<a>&lt;</a>")
		}else{
			pageHtmls.push("<a href='javascript:;'>&lt;</a>")
		}		

		pageHtmls.push("<a href='javascript:;' number='1'>1</a>");

		if(index - prev > 2){
			pageHtmls.push("<span>...</span>")
		}

		for(i = Math.max(index - prev,0); i > 0; i--){
			pageHtmls.push("<a href='javascript:;' number='"+(index-i)+"'>"+(index-i)+"</a>")
		}

		pageHtmls.push("<a class='select'>"+index+"</a>")

		for(i = 1; i <  Math.min(next + index,count - index); i++){
			pageHtmls.push("<a href='javascript:;' number='"+(index+i)+"'>"+(index+i)+"</a>")
		}

		if(index + next < count){
			pageHtmls.push("<span>...</span>")
		}

		pageHtmls.push("<a href='javascript:;' number='"+count+"'>"+count+"</a>");

		if(index == count){
			pageHtmls.push("<a>&gt;</a>")
		}else{
			pageHtmls.push("<a href='javascript:;'>&gt;</a>")
		}
		return pageHtmls.join('');
	}
	
})