/* global core: true */
/* jshint strict: false */
core.directive('fixedBtn', ['$window', '$document',
	function ($window, $document) {
		return {
			restrict: 'EA',
			template: '<div class="fixedBtn-group"><div class="fixedBtn backTop"><em class="icon icon-toTop"></em></div></div>',
			replace: true,
			link: function ($scope, $ele) {
				var toTopHtml = '<div class="fixedBtn backTop"><em class="icon icon-toTop"></em></div>',
					chatHtml = '<div class="fixedBtn chat"><em class="icon icon-chat"></em><i></i></div>';

				var $$elem = $($ele),
					$$doc = $($document);

				function scrollTop() {
					return window.pageYOffset || document.documentElement.scrollTop;
				}
				$(window).scroll(function () {
					var op = 'hide';
					if (scrollTop() > 30) {
						op = 'show';
					}
					$$elem.find('.backTop')[op]();
				});
				$('.fixedBtn-group').click(function(){
					//TODO 这里需要绑定事件 否则下面的事件可能会失效
				});
				$$doc.on('ymtappMsgChange', function(e, data){
					if (!$$elem.find('.chat')[0]) {
						$$elem.append(chatHtml);
					}
					if (data) {
						$$elem.find('.chat i').text(data.msgNum);
					}
				}).on('click', '.fixedBtn-group .backTop', function () {
					$window.scrollTo(0, 0);
				}).on('click', '.fixedBtn-group .chat', function () {
					$window.location.href = '/forYmatouApp/chatList';
				});
			}
		};
	}
]);