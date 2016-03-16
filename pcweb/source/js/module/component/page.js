// 不带省略号的分页
define(function (require, exports, module) {

	function GenPager(oPage, count, nowPage) {
		var me = this;

		me.oPage = oPage;
		me.count = count;
		me.nowPage = nowPage;

		me.pageCallback = function () {

			//创建各个页码
			me.oPage.innerHTML = '';

			//←箭头
			var oLeftLi = document.createElement('li');
			var oLeft = document.createElement('a');
			oLeft.href = 'javascript:;';
			oLeft.innerHTML = '&lt;';
			oLeftLi.appendChild(oLeft);
			me.oPage.appendChild(oLeftLi);

			oLeft.onclick = function () {
				me.nowPage--;
				if (me.nowPage < 1) return me.nowPage = 1;

				me.fnCallBack && me.fnCallBack(me.nowPage);
				// _tab(nowPage);
			};

			//中间的东西
			var min = Math.max(0, me.nowPage - 1 - 4);
			var max = Math.min(min + 8, me.count);

			for (var i = min; i < max; i++) {
				var oALi = document.createElement('li');

				var oA = document.createElement('a');

				oA.href = 'javascript:;';
				oA.innerHTML = i + 1;
				oA.index = i;
				if (i == me.nowPage - 1) oA.className = 'active';

				oA.onclick = function () {
					if (this.index == me.nowPage - 1) return;

					me.nowPage = this.index + 1;
					me.fnCallBack && me.fnCallBack(me.nowPage);
					// _tab(nowPage);
				};

				oALi.appendChild(oA);
				me.oPage.appendChild(oALi);
			}

			//→箭头
			var oRightLi = document.createElement('li');
			var oRight = document.createElement('a');
			oRight.href = 'javascript:;';
			oRight.innerHTML = '&gt;';
			oRightLi.appendChild(oRight);
			me.oPage.appendChild(oRightLi);

			oRight.onclick = function () {
				me.nowPage++;
				if (me.nowPage > me.count) return me.nowPage = me.count;

				me.fnCallBack && me.fnCallBack(me.nowPage);
				// _tab(nowPage);
			};

		}; // pageCallback


		me.pageCallback(); // 先执行一次页码生成操作

		me._tab = function (nowPage) {

			me.pageCallback(me.oPage, me.count, nowPage);
		}

	}

	return GenPager;

});