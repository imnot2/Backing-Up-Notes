(function(){
	var resizeTimer = null, randomNum, clientWidth;
	function loadIeCss(){
		clientWidth = $(window).width();		
		if(clientWidth <= 1024){
			randomNum = new Date().getTime();
			if($("#mediaQueryIe").length) return;
		    $('head').append('<link id="mediaQueryIe" href="' + $m.load.config.base + '/content/Product/mediaQueryIe.css?v'+randomNum+'" rel="stylesheet" type="text/css" />');		    
		}else{
			$("link#mediaQueryIe").remove();
		}
	}
	loadIeCss();
	$(window).resize(function() { 
		if (resizeTimer) clearTimeout(resizeTimer); 
		resizeTimer = setTimeout(loadIeCss, 300); 
	});
})()
