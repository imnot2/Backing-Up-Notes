/**
 * 调用原生查看大图
 * 协议地址：/forYmatouApp/iamgePreview?param={“images”:[‘http://img. p.jpg’, ‘http://img. c.jpg ‘],"currentInx":1}
 */
core.directive('imgBooth', ['$window', function($window){
	return {
		restrict:'A',
		scope:{imgBooth:'='},
		link:function($scope, $ele, $attrs){
			$($ele).on("click","img",function(){
				var self = $(this);
				$window.location.href='/forYmatouApp/imagePreview?param={"images":["'
					+$scope.imgBooth.join('","')+'"],"currentInx":'+self.attr("data-booth-index")+'}'
			})
		}
	}
}]);