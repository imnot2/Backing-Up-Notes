// 带省略号的分页
define(function (require, exports, module) {

	function GenPager(oPage, count, nowPage) {
		var me = this;

		me.oPage = oPage;
		me.count = count;
		me.nowPage = nowPage;

		me.prevPage = nowPage - 1;
		me.nextPage = nowPage + 1;

		me.pageCallback = function () {

			if (me.nowPage > me.count || me.nowPage < 1) {

				return;
			}

			//创建各个页码
			me.oPage.innerHTML = '';

			if (me.count > 7) {

				if (me.nowPage > 1) {
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
				}

				var oLi = document.createElement('li');
				var oA = document.createElement('a');

				if (1 == me.nowPage) {
					oA.className = 'active';
				}

				oA.index = 1;
				oA.innerHTML = 1;
				oLi.appendChild(oA);
				me.oPage.appendChild(oLi);

				oA.onclick = function () {
					if (this.index == me.nowPage) return;

					me.nowPage = this.index;
					me.fnCallBack && me.fnCallBack(me.nowPage);
					// _tab(nowPage);
				};

				if (me.nowPage < 6) { // 右边省略号
					for (var i = 2; i < 9; i++) {
						var oLi = document.createElement('li');
						var oA = document.createElement('a');

						if (i == me.nowPage) {
							oA.className = 'active';
						}

						oA.index = i;
						oA.innerHTML = i;
						oLi.appendChild(oA);
						me.oPage.appendChild(oLi);

						oA.onclick = function () {
							if (this.index == me.nowPage) return;

							me.nowPage = this.index;
							me.fnCallBack && me.fnCallBack(me.nowPage);
							// _tab(nowPage);
						};
					}

					var oLi = document.createElement('li');
					oLi.innerHTML = '...';
					me.oPage.appendChild(oLi);
				}
				else if (me.nowPage + 3 > me.count) {

					var oLi = document.createElement('li');
					oLi.innerHTML = '...';
					me.oPage.appendChild(oLi);

					for (var i = me.count - 3; i < me.count; i++) {
						var oLi = document.createElement('li');
						var oA = document.createElement('a');

						if (i == me.nowPage) {
							oA.className = 'active';
						}

						oA.index = i;
						oA.innerHTML = i;
						oLi.appendChild(oA);
						me.oPage.appendChild(oLi);

						oA.onclick = function () {
							if (this.index == me.nowPage) return;

							me.nowPage = this.index;
							me.fnCallBack && me.fnCallBack(me.nowPage);
							// _tab(nowPage);
						};
					}
				}
				else { // 两边省略号
					var oLi = document.createElement('li');
					oLi.innerHTML = '...';
					me.oPage.appendChild(oLi);

					for (var i = me.nowPage - 2; i < me.nowPage + 3; i++) {
						var oLi = document.createElement('li');
						var oA = document.createElement('a');

						if (i == me.nowPage) {
							oA.className = 'active';
						}

						oA.index = i;
						oA.innerHTML = i;
						oLi.appendChild(oA);
						me.oPage.appendChild(oLi);

						oA.onclick = function () {
							if (this.index == me.nowPage) return;

							me.nowPage = this.index;
							me.fnCallBack && me.fnCallBack(me.nowPage);
							// _tab(nowPage);
						};
					}

					var oLi = document.createElement('li');
					oLi.innerHTML = '...';
					me.oPage.appendChild(oLi);
				}

				var oLi = document.createElement('li');
				var oA = document.createElement('a');

				if (me.count == me.nowPage) {
					oA.className = 'active';
				}

				oA.index = me.count;
				oA.innerHTML = me.count;
				oLi.appendChild(oA);
				me.oPage.appendChild(oLi);

				oA.onclick = function () {
					if (this.index == me.nowPage) return;

					me.nowPage = this.index;
					me.fnCallBack && me.fnCallBack(me.nowPage);
					// _tab(nowPage);
				};

				if (me.nextPage < me.count) {
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
				}

			}
			else {

				for (var i = 1; i <= me.count; i++) {
					var oLi = document.createElement('li');
					var oA = document.createElement('a');

					if (i == me.nowPage) {
						oA.className = 'active';
					}

					oA.index = i;
					oA.innerHTML = i;
					oLi.appendChild(oA);
					me.oPage.appendChild(oLi);

					oA.onclick = function () {
						if (this.index == me.nowPage) return;

						me.nowPage = this.index;
						me.fnCallBack && me.fnCallBack(me.nowPage);
						// _tab(nowPage);
					};
				}
			}


		}; // pageCallback


		me.pageCallback(); // 先执行一次页码生成操作

		me._tab = function (nowPage) {

			me.pageCallback(me.oPage, me.count, nowPage);
		}

	}

	return GenPager;

});