﻿/*=======================anim.frame.js===========================*/
/*
 *	http://qwrap.com
 *	version: $version$ $release$ released
 *	author: akira.cn@gmail.com
 */

/**
 * @helper AnimationTimingH 动画Helper
 * @namespace QW
 * @support http://www.w3.org/TR/animation-timing/
 */

(function(){

var mix = QW.ObjectH.mix,
	EventTargetH = QW.EventTargetH,
	forEach = Array.forEach || QW.ArrayH.forEach;

var requestAnimationFrame = window.requestAnimationFrame,
	cancelRequestAnimationFrame = window.cancelRequestAnimationFrame;

function getAnimationFrame(){
	if(requestAnimationFrame){
		return {
			request :requestAnimationFrame,
			cancel : cancelRequestAnimationFrame
		}
	} else if(window.msRequestAnimationFrame) {
		return {
			request :msRequestAnimationFrame,
			cancel : msCancelRequestAnimationFrame
		}
	} else if(window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame) { 
		//firefox，11以下的版本没有实现cancelRequestAnimationFrame
		return {
			request :mozRequestAnimationFrame,
			cancel : mozCancelRequestAnimationFrame
		}
	} else if(window.webkitRequestAnimationFrame){
		return {
			request : function(callback){
				//修正某个诡异的webKit版本下没有time参数
				return window.webkitRequestAnimationFrame(
						function(){
							return callback(new Date());
						}
					);
			},
			cancel : window.webkitCancelRequestAnimationFrame
		}
	} else {
		return AnimationTimingManager;
	}
};


if(!(window.requestAnimationFrame || 
	 window.webkitRequestAnimationFrame ||
	 (window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame) ||
	 window.msRequestAnimationFrame))
{
	var AnimationTimingManager = (function(){
		var millisec = 25;	 //40fps;
		var request_handlers = [];
		var id = 0, cursor = 0;

		function playAll(){
			var clone_request_handlers = request_handlers.slice(0);
			cursor += request_handlers.length;
			request_handlers.length = 0; //clear handlers;
			
			forEach(clone_request_handlers, function(o){
				if(o != "cancelled")
					return o(new Date());
			});
		}
		
		window.setInterval(playAll, millisec);

		return {
			request : function(handler){
				request_handlers.push(handler);
				return id++;
			},
			cancel : function(id){
				request_handlers[id-cursor] = "cancelled";
			}
		};
	
	})();
}

var AnimationTimingH = {
	/*long*/ requestAnimationFrame : function(/*window*/ owner, /*in FrameRequestCallback*/ callback){
		var raf = getAnimationFrame();
		return raf.request.call(owner, callback);
	},
	cancelRequestAnimationFrame : function(/*window*/ owner, /*in long*/ handle){
		var raf = getAnimationFrame();
		return raf.cancel.call(owner, handle);
	}
};

var ah = QW.HelperH.methodize(AnimationTimingH);
mix(window, ah);
})();
