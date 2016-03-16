define(function(require, exports, module){
	var Tips = require('module/ui/tips'),
	fixTop = $('.detail').offset().top,
	detailHead = $('.detail-head');

	pageTips = new Tips({
		width : 330,
		height : 66,
		arrPos : 'bottom-right'
	});

	$(window).scroll(function(){
		// 隐藏上一篇、下一篇提示框
		pageTips.close();

		// 处理置顶头
		var st = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

		if (st >= fixTop){
			detailHead.addClass('detail-head-fixed');
		}else{
			detailHead.removeClass('detail-head-fixed');
		}
	});

	$('.crumbs .back-a').hover(function(){
		var target = $(this), 
			ofs = target.offset(),
			hdFixed = $('.detail-head').hasClass('detail-head-fixed'),
			content = target.attr('data-title'), title='',htmlStr='',
			st = Math.max(document.body.scrollTop, document.documentElement.scrollTop),
			sl = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
		if (target.hasClass('go-prev-article')){
			title = '上一篇文章：';
		}else if (target.hasClass('go-next-article')){
			title = '下一篇文章：';
		}

		htmlStr += '<p>' + title + '</p><p>' + content + '</p>';
		if (hdFixed){
			pageTips.setArrowPos('top-right');
		}else{
			pageTips.setArrowPos('bottom-right');
		}
		pageTips.show(htmlStr, {
			top : hdFixed ? 40 : (ofs.top - st - pageTips.height - 8) + 'px',
			left : (ofs.left - sl - (pageTips.width - target.width())) + 'px'
		});
	}, function(){
		pageTips.close();
	});
});