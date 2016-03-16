~(function () {
	if(/forYmatouApp\/orders$/.test(window.location.pathname)){
		return;
	}
	if(!(window.YmtApi && window.YmtApi.isWechat)){
		return;
	}
	var template = [
		'<svg display="" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
		'<defs>',
		'<symbol id="icon-Shoppingbag" viewBox="0 0 1024 1024">',
		'<title>Shoppingbag</title>',
		'<path class="path1" d="M902 238q0-22-15-37t-36-15h-108q-56-171-213.5-171t-214.5 171h-142q-21 0-36 15t-15 37l-52 711q0 10 4 20t11 17 16.5 11 20.5 4h780q22 0 37-15.5t15-36.5zM529 62q61 0 100 29t65 95h-330q26-66 65-95t100-29zM902 954h-780q-5 0-6-4l52-700v-12q0-6 5-6h678q5 0 5 6v12l52 700q-1 4-6 4zM319.5 298q-21.5 0-36.5 15t-15 36.5 15 36.5 36.5 15 36.5-15 15-36.5-15-36.5-36.5-15zM739 298q-14 0-26 6.5t-19 18.5-7 26q0 11 4 20.5t11 16.5 16.5 11 20.5 4q14 0 25.5-7t18.5-18.5 7-26.5q0-21-15-36t-36-15z"></path>',
		'</symbol>',
		'<symbol id="icon-list" viewBox="0 0 1024 1024">',
		'<title>list</title>',
		'<path class="path1" d="M884 47h-744q-13 0-23.5 6t-17 17-6.5 24v812q0 8 2.5 15.5t6.5 13.5 10 10 13 6.5 15 2.5h563q21-4 40-22l164-164q19-17 24-46v-628q0-19-13.5-33t-33.5-14zM873 769l-1-2h1v2zM884 721h-135q-30 0-40.5 11t-10.5 41v134h-533q-6 0-10.5-2t-8-5.5-5.5-8.5-2-10v-762q0-11 7.5-19t18.5-8h694q10 0 17.5 8t7.5 19v602zM756 465h-349q-2 0-3 1l-4 2q-1 1-2 2.5t-1.5 3-0.5 3.5v23q0 5 3 8.5t8 3.5h349q5 0 8.5-3.5t3.5-8.5v-23q0-2-0.5-3.5t-1.5-3-2.5-2.5-3.5-2-4-1zM756 652h-349q-2 0-3.5 0.5t-3 1.5-2.5 2.5-1.5 3-0.5 3.5v24q0 2 0.5 4t2.5 3.5 4 2.5 4 1h349q4 0 6.5-1.5t4-4 1.5-5.5v-24q0-5-3.5-8t-8.5-3zM756 279h-349q-3 0-5.5 1.5t-4 4.5-1.5 6v23q0 5 3 8.5t8 3.5h349q5 0 8.5-3.5t3.5-8.5v-23q0-3-1.5-6t-4-4.5-6.5-1.5zM279.5 279q-9.5 0-16.5 7t-7 16.5 7 16.5 16.5 7 16.5-7 7-16.5-7-16.5-16.5-7zM279 465q-9 0-16 7t-7 17q0 6 3 11.5t8.5 8.5 12 3 11.5-3 8.5-8.5 3.5-11.5q0-5-2-9.5t-5-7.5-7.5-5-9.5-2zM279 652q-9 0-16 6.5t-7 16.5q0 6 3 11.5t8.5 8.5 11.5 3q10 0 17-6.5t7-16.5q0-5-2-9t-5-7.5-7.5-5-9.5-1.5z"></path>',
		'</symbol>',
		'<symbol id="icon-share" viewBox="0 0 1024 1024">',
		'<title>share</title>',
		'<path class="path1" d="M815 884h-722v-628h279l93-47h-372q-13 0-23.5 6.5t-16.5 17-6 23.5v628q0 20 13.5 33.5t32.5 13.5h722q19 0 32.5-13.5t13.5-33.5v-323l-46 40v283zM209 611q4-3 9.5-8t24.5-19.5 39-28.5 50-32 60.5-32.5 68-27 73.5-18.5 76.5-5 78.5 12v176l312-324-309-234v185q-91-8-192 24-212 67-277 280-8 25-14 52z"></path>',
		'</symbol>',
		'<symbol id="icon-home" viewBox="0 0 1024 1024">',
		'<title>home</title>',
		'<path class="path1" d="M1024 590.444l-512-397.426-512 397.428v-162.038l512-397.426 512 397.428zM896 576v384h-256v-256h-256v256h-256v-384l384-288z"></path>',
		'</symbol>',
		'</defs>',
		'</svg>',
		'<div class="fixedMenu">',
		'<div class="fixedMenu-inner">',
		'<div class="fixedMenu-logo"></div>',
		'<ul  class="fixedMenu-btn-group" style="width:0px;display:none;">',
		'<li class="fixed-btn home">',
		'<svg class="svg-icon">',
		'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-home"></use>',
		'</svg>',
		'</li>',
		'<li  class="fixed-btn shoppingBag">',
		'<svg class="svg-icon">',
		'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-Shoppingbag"></use>',
		'</svg>',
		'</li>',
		'<li  class="fixed-btn orderList">',
		'<svg class="svg-icon">',
		'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-list"></use>',
		'</svg>',
		'</li>',
		/*'<li  class="fixed-btn" ng-click="toShare()">',
			'<svg class="svg-icon">',
				'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-share"></use>',
			'</svg>',
		'</li>',*/
		'</ul>',
		'</div>',
		'</div>'
	].join('');

	var styleContent = [
		'.fixedMenu {',
		  'bottom: 3.125rem;',
		  'left: 0.625rem;',
		  'position: fixed;',
		'}',
		'.fixedMenu-inner {',
		 'background-color: rgba(0, 0, 0, 0.7);',
		 ' overflow: hidden;',
		  'height: 2.5rem;',
		  'line-height: 2.5rem;',
		 ' border-radius: 1.25rem;',
		'}',
		'.fixedMenu-logo {',
		 ' width: 2.5rem;',
		'  height: 2.5rem;',
		'  background-color: #fff;',
		'  border-radius: 50%;',
		'  float: left;',
		'  background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA9CAMAAADYt8pWAAAAnFBMVEUAAADVFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3VFC3jQ+4dAAAAM3RSTlMA+SID7fWLCPHfKOnVluPawmMZFAzRXbYQepuBdVZHsKGGbk/Lu6Y9McitQTk2qZFoLR6yO7MGAAAEQklEQVRIx41W2aKiMAxt2XcQF1xxAwUBl8n//9skUBZH53LPAySlp2mTkyr7Cn2XA0Ql+y1mofRQ8ygwYPE7wvIZJXPYonX2jetvGFIKeQKwD9G+KvPZOGOa2vFybaew19HbwGSccsL960aydOGJ3h/f0ccYoZlMWQF7FjrKEv0HFGOUGDTGVnCkcCf0M2M9wpAftPkLx8fUc2Qcyb2xiswVTGuixmi7KlXyqVyzKvypJtyRGPOMCm2Lb1g5uXPTNOfBXXvGlv61KBDguG1bbFY9DcNXOLTgiu1E2ielglRehop6SQzOoQc6tq8AmB9aDCfgP3IOb1ANbvhmM+hNB7Ol6251SFR4h2Er3KPlBeysPcFE288N+AeqaRqGZ78vEQvKFr97CgzhOaaqKOrHMm03aABc5Ty3RfS5o6iGCt+wFSVfN+5JClTVSUzOOfwPmij5RVCYvDfgZ1xEi0Rd0BRGEAnBB427YuwwRgnkJsdOR9HGKPOmlpbZUbYfq5qtdShvHMC3GCETJdkwthCS0qQLp/dxNnU5ELApdGtj29dGi7yjxI2V4ujOATBLMrw6SC2rAz/jk7ESOkomdLGjq+IOEMzQeEUcTIlSewHqV7lbmho+bOX3YogNnY/iqOqZqEFzYBrpK7tsZbJfUisD8IzpKxv2uPbEg8UJHozw7CkzHwSeTHaDo+bGcqm52jaWX8c1yvikCSH3lJzkuokAHOsBa6FBWda7tg/Jko+CgjH1Pb4nTN4q4HCkSZJkWdNaiLUtxcc/lDlXUFwStThhTCU0uaIohlrvZaEqBHAkolwGlA0VsKL6JqBVzZf18MBmRiGjnsJOZAS03SDQ2aobZxOy8KRGQQXKWxXJbcJ3bHmzLfYy3qKok/ABcCaKM6AUjRix686YFze7Xq+FVGfqWlgM8wITcuwB5dUIJqccSPzzcrS8FWmJDygW76uvQbJbIKq6qRaESQBHckDgrqPjNXmx0DSG/X4CgTUunHUUlG04J6tWIZXoLWN9/GJImaaiDdjL7tbtKJezB0HI2LnjI2V2J0Ougzi3GtGTKEV022tLVvmmNQgZYUjZxYOQjEob7uwLsnmJQh5SqK0Cep9t8CyJIGQpnA3H7j++UU7tLXrNwZ8TnBW5Z6d2fICYek8gnYoW5WVd7wPApyyB/grdhUm5EMlIGUHXPpP8fg/ziKIUXNRFtMUnRZNZUs+3vXRLlEqBNs2zzdcoN52ZALbv3A8+nEh3PiC8Cq3b1+r7ms4U33MCr/ZCFGkuNhw70FPaRnIOpxc6B8/oTyYUA9HW6HdS7k6bAOc/dpb4RdolIKCETG8SyKGHaqsA5hFbrcdyYfZ3rAufcI7VVGbvmK28JswfIYYedrJ5yewbwofZVHoFA5jpKmP/R+YqFGYBLfwLpmcEBarqcebNfHeB88ehF5GneVSuWJLZLzE7ryOtnP48/y9CGhqRJc5dtgAAAABJRU5ErkJggg==) no-repeat center;',
		 ' background-size: 1.5625rem 1.875rem;',
		'}',
		'.fixedMenu-btn-group {',
		 ' overflow: hidden;',
		 ' transition: 0.4s ease;',
		'}',
		'.fixed-btn {',
		'  float: left;',
		'  padding: 0 0.625rem;',
		'}',
		'.fixed-btn .svg-icon {',
		'  height: 1.375rem;',
		'  width: 1.25rem;',
		'  color: #fff;',
		'  fill: #fff;',
		'  margin-top: 0.5rem;',
		'}',
	].join('');
	var style = document.createElement('style');
	style.innerHTML = styleContent;
	var head = document.getElementsByTagName('head')[0] || document.documentElement,
		body = document.getElementsByTagName('body')[0] || document.body;
	head.insertBefore(style, head.firstChild);
	var tmpDiv = document.createElement('div');
	tmpDiv.innerHTML = template;
	body.insertBefore(tmpDiv, body.lastChild);


	var userAgent = window.navigator.userAgent;
	var isAndroid = /Android|Linux/.test(userAgent);

	var width = isAndroid ? '140px' : '0';
	var isShow = isAndroid ? 'none' : 'block';

	var switchMenu = function () {
		//安卓设置宽度无效
		if (isAndroid) {
			isShow = isShow == 'none' ? 'block' : 'none';
			document.querySelector('.fixedMenu-btn-group').style.cssText = 'width:140px;display:'+isShow;
		}
		else {
			width = width === '140px' ? '0' : '140px';
			document.querySelector('.fixedMenu-btn-group').style.cssText = 'display:block;width:'+width;
		}

	}

	var toHome = function () {
		YmtApi.open({
			title: '首页',
			url: '/forYmatouApp/home',
			isNew: true
		});
	}

	var toShoppingBag = function () {
		YmtApi.open({
			title: '购物袋',
			url: '/forYmatouApp/shoppingBag',
			isNew: true
		});
	}

	var toOrderList = function () {
		YmtApi.open({
			title: '订单列表',
			url: '/forYmatouApp/personal/orderInfo?col=4',
			isNew: true
		});
	}
	
	
	var findParent = function(node,ancestor,className){
		var _cls = node.className+'';
		if(node == ancestor){
			return null;
		}
		if(~_cls.split(' ').indexOf(className)){
			return node;
		}
		return findParent(node.parentNode,ancestor,className);
	}
	//@TODO ios click会失效
	document.addEventListener('touchstart',function(e){
		var target = e.target;
		if(findParent(target,this,'fixedMenu-logo')){
			switchMenu();
		}else if(findParent(target,this,'home')){
			toHome();
		}else if(findParent(target,this,'shoppingBag')){
			toShoppingBag();
		}else if(findParent(target,this,'orderList')){
			toOrderList();
		}
	},false);


})();