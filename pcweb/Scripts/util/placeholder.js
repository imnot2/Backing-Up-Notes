/*
 *  author: dingbigui@ymatou.com
 *  description: jq扩展
 */
Ymt.add(function(require, exports, module) {
	$.fn.extend({
		/*
		 * 跨浏览器实现输入框的Placeholder效果
		 * example:
		 *   html:
		 *    <div class="smart-input">
		 *      <label for="title_input" class="smart-label">标题</label>
		 *      <input type="text" value="" name="title" id="title_input" />
		 *    </div>
		 *   js:
		 *     $('#title_input').smartInput();
		 */
		smartInput: function(options) {
			var defaults = {
				wrapname: '.smart-input',
				placeholder: '.smart-label',
				focuscname: 'focus',
				changecname: 'change'
			};
			var options = $.extend(defaults, options);

			var interval = null;

			var clean_interval = function() {
				if (interval !== null) {
					clearInterval(interval);
					interval = null;
				}
			};

			var init_interval = function(_smartinput, that) {
				clean_interval();
				interval = setInterval(function() {
					var _val = $.trim($(that).val());
					if (_val != '') {
						_smartinput.addClass(options.changecname);
						clean_interval();
					}
				}, 100);
			};

			var clear_content = function(_smartinput, _key, that) {
				var _val = $.trim($(that).val());
				if (_key == 8 || _key == 0 || _key == 46) {
					if (_val == '') {
						_smartinput.removeClass(options.changecname);
						init_interval(_smartinput, that);
					}
				}
			};

			var check_content = function(_smartinput, placeholder_val, that) {
				var _val = $.trim($(that).val());
				if (_val == '' || placeholder_val == _val) {
					$(that).val('');
					_smartinput.removeClass(options.focuscname + ' ' + options.changecname);
				} else {
					_smartinput.addClass(options.changecname);
				}
			};

			return this.each(function() {
				var _this = $(this);
				var placeholder = $(this).siblings(options.placeholder);
				var placeholder_val = placeholder.text();
				var smartinput = $(this).closest(options.wrapname);

				check_content(smartinput, placeholder_val, this);
				$(this).focus(function() {
					init_interval(smartinput, this);
					var _val = $.trim($(this).val());
					if (_val == '') {
						smartinput.removeClass(options.changecname);
						smartinput.addClass(options.focuscname);
					}
				}).blur(function() {
					clean_interval();
					check_content(smartinput, placeholder_val, this);
				}).keypress(function(event) {
					var _val = $.trim($(this).val());
					if ((event.which != 32 && event.which != 13 && event.which != 8 && event.which != 0 && event.which != 46) || _val != '') {
						clean_interval();
						smartinput.addClass(options.changecname);
					}
					clear_content(smartinput, event.which, this);
				}).keydown(function(event) {
					var _val = $.trim($(this).val());
					if (_val != '') {
						clean_interval();
						smartinput.addClass(options.changecname);
					}
					clear_content(smartinput, event.which, this);
				}).keyup(function(event) {
					clear_content(smartinput, event.which, this);
				});
				placeholder.bind('click', function(e) {
					_this.focus();
				});
			});
		}

	});
});