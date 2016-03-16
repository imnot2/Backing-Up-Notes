!(function () {
	/**
	 * 适配场景：
	 *	1、html data-mw最大宽度，data-mw-selector最大宽度选择器
	 *
	 */
	var meta = document.querySelector('[name=viewport]'),
		content = meta.content || '',
		matchScale = content.match(/initial\-scale=([\d\.]+)/),
		//定宽的场景
		matchWidth = content.match(/width=([\d\.]+)/),
		dpr = window.devicePixelRatio ? Math.min(window.devicePixelRatio, 3) : 1,
		docEl = document.documentElement,
		maxWidth = docEl.dataset.mw || 750,
		scale = 1 / dpr,
		tid;
	if (meta) {
		if (matchScale) {
			content = content.replace(/initial\-scale=([\d\.]+)/, 'initial-scale=' + scale)
							 .replace(/minimum\-scale=([\d\.]+)/, 'minimum-scale=' + scale)
							 .replace(/maximum\-scale=([\d\.]+)/, 'maximum-scale=' + scale);
		}
		else {
			content += ',initial-scale=' + scale;
		}
		meta.content = content;

	}
	else {
		meta = doc.createElement('meta');
		meta.name = 'viewport';
		meta.content = content;
		docEl.firstElementChild.appendChild(meta);
	}

	var redraw = function () {
		//简单判断是否为移动端
		if (!/Mobile|Android/i.test(window.navigator.userAgent)) {
			return;
		}
		//var width = docEl.getBoundingClientRect().width;
		//采用不超过最大宽度的尺寸做为rem参照，最大尺寸也要按照缩放比例之后进行比较
		//width = Math.min(width, maxWidth / scale);
		//var fz = width / 20;
		var fz = dpr / 2 * 16;
		docEl.style.fontSize = fz + 'px';
	}
	window.addEventListener('resize', function () {
		clearTimeout(tid);
		tid = setTimeout(redraw, 300);
	}, false);
	redraw();
})();