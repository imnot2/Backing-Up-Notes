/**
 * 防骗提醒
 */
ymtapp.directive('cheatRemind', [
	'ls',
	'utils',
	'$window',
	function (ls,utils,$window) {
		return {
			restrict: 'AE',
			template:[
				'<div class="cheat-remind" ng-if="!hasRemind">',
					'<div class="remind-header">',
						'<span class="remind-flag"></span>',
						'<p>',
							'<strong>重要提醒</strong>',
						'</p>',
					'</div>',
					'<div class="remind-content">',
						'<p>',
							'任何自称是洋码头客服，并告诉你海关卡单、缺货，发给您假冒链接，要求您取消订单、办理退款、重新支付的<strong>都是骗子！</strong>',
						'</p>',
						'<div>',
							'<button class="btn btn-warning btn-full-w" ng-click="close()">(⊙_⊙) 知道了，不会告诉骗子</button>',
						'</div>	',	
					'</div>',
				'</div>',
			].join(''),
			link: function (scope, ele) {
				scope.hasRemind = true;
				var search = utils.common.parseUrl($window.location.search),
					userId = search['UserId'];
				var isRemind = ls.get('isRemind') || ';';
				var reg = new RegExp(';'+userId+';','i');
				if(!reg.test(isRemind)){
					scope.hasRemind = false;
					$('#MaskAbs').show();
				}
				scope.close = function(){
					scope.hasRemind = true;
					ls.set('isRemind',isRemind+userId+';');
					$('#MaskAbs').hide();
				}
			}
		};
	}
]);