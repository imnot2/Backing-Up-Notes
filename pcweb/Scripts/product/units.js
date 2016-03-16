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