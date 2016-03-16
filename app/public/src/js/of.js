/**
 * of 离线缓存解决方案
 */
;(function(root){
	var YMT_STATIC = 'YMT_STATIC';

	function Of(settings){
		
	}

	Of.prototype = {
		/**
		 * 设置配置
		 */
		config:function(settings){
			this.version = settings.version;
			this.src = settings.src;
			return this;
		},
		/**
		 * 版本检测
		 */
		check:function(){
			var cache = localStorage.getItem(YMT_STATIC);
			if (cache) {
				try {
					cache = JSON.parse(cache);
					if (this.version !== '' && cache.version == this.version) {
						this.render(cache);
					}
					else {
						this.dynamicLoad();
					}
				}
				catch (e) {
					console.log(e);
					this.dynamicLoad(1);
					localStorage.removeItem(YMT_STATIC)
				}
			}
			else {
				this.dynamicLoad();
			}
		},
		render:function(data){
			data.style && insertStyle(data.style);
			data.script && this.createScript({
				innerHTML: data.script
			});

			function insertStyle(css) {
				var head = document.getElementsByTagName('head')[0] || document.documentElement;
				var style = document.createElement('style');
				style.innerHTML = css;
				//css 只能向后覆盖
				head.insertBefore(style, head.lastChild);

			}

		},
		dynamicLoad:function(){
			this.createScript({
				src: this.src
			})
		},
		define:function(factory){
			factory();
			var factoryStr = factory.toString();
			var cache = JSON.stringify({
				version: this.version,
				script: '(' + factoryStr + ')();'
			});
			localStorage.setItem(YMT_STATIC, cache);
		},
		createScript:function(attrs){
			var head = document.getElementsByTagName('head')[0] || document.documentElement;
			var script = document.createElement('script');
			if (attrs.src) {
				script.src = attrs.src;
			}
			if (attrs.innerHTML) {
				script.innerHTML = attrs.innerHTML;
			}
			head.insertBefore(script, head.firstChild);
		}
	}

	root.of = new Of();
})(window);
