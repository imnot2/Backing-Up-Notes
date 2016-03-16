'use strict';
/**
 * 活动模块
 * 尿布团
 * 这里统一采用事件代理的方式，事件都为后绑定，且都绑定在document
 *
 */
//$(function() {

	/**
	 * 是否登录
	 */
	var isLogin = function(callback) {
		$.ajax({
			type: 'get',
			url: '/forYmatouApp/personal/isLogin',
			success: function(data) {
				if (data.Code == 600) {
					window.location.href = "/forYmatouApp/loginStatus?hasLogin=0";
					return;
				}
				callback()
			}
		})
	}
	var layerMask = {
		show: function() {
			$("#J-mask").show();
		},
		hide: function() {
			$("#J-mask").hide();
		}
	}
	var dialog = {
		struct: '' + '<div class="bottomDialog {{type}}">' + '<div class="bottomDialogCont">' + '<h3 class="title">{{title}}</h3>' + '<p class="dia_0">{{contents}}</p>' + '<div class="dia_btns">' + '<button class="publicBtn leftBtn confirm">{{btnText}}</button>&nbsp;' + '<button class="publicBtn rightBtn cancel">取消</button></div>' + '</div>' + '</div>',
		/**
		 * [show description]
		 * @param  {[type]} params
		 *         				type [join-dialog | create-dialog]
		 *         				title    标题
		 *         				contents 内容
		 *
		 * @return {[type]}       [description]
		 */
		show: function(params) {
			var prefix = "{{\\s*",
				suffix = "\\s*}}",
				_regExp,
				tpls = dialog.struct;
			for (var i in params) {
				_regExp = new RegExp(prefix + i + suffix, 'g');
				tpls = tpls.replace(_regExp, params[i]);
			}
			tpls = tpls.replace(/{{}}|{{\S*}}/g, '');

			$("body").append(tpls);
			layerMask.show();
		},
		hide: function() {
			$(this).closest('.bottomDialog').remove();
			layerMask.hide();
		}
	}
	var remind = {
			current: null,
			struct: '' + '<div class="topWelcome">' + '<p class="slogan"><em class="img {{type}}"></em>{{msg}}</p>' + '</div>',
			show: function(msg, type) {
				if (remind.current) {
					return;
				}
				var struct = remind.struct;
				//replace param
				struct = struct.replace(/{{msg}}/g, msg);

				type = type || "img-icon-success";

				struct = struct.replace(/{{type}}/g, type);

				var $struct = remind.current = $(struct).appendTo("body");
				$struct.animate({
						//translate: "0,74px";
						top: "0"
					}, 5E2,
					function() {
						setTimeout(remind.hide, 15E2);
					}
				);
			},
			hide: function() {
				remind.current.animate({
						//translate: "0,0"
						top: "-74px"
					}, 5E2,
					function() {
						remind.current.remove();
						remind.current = null;
					}
				);
			}
		}
		//open join group dialog
	$(".J-join-group").on("click", function() {
		dialog.show({
			type: "join-dialog",
			title: "输入团购口令",
			contents: "参加团购活动会要求您先登录码头客户端<br>本次团购活动每位码头会员限参与一次",
			btnText: "我要参团"
		});
	});
	//verify phone
	var verifyPhone = function() {
			$(".J-verifyPhone").show();
			$("#J-mask").show();
		},
		hideVerifyPhone = function() {
			$(".J-verifyPhone").hide();
			$("#J-mask").hide();
		}
	$(".J-sendPhoneNumber").on("click", function() {
			var number = $("[name=phoneNumber]").val();
			if (!number) {
				remind.show("手机号码不能为空");
				return;
			}

			if (!/^1\d{10}$/.test(number)) {
				remind.show("请输入正确的手机号码");
				return;
			}
			sendPhoneNumber(number)
		});
	var resend = true;
		/**
		 * 发送手机号码给服务端
		 */
	var sendPhoneNumber = function(number) {
			if(!resend){
				return;
			}
			var data = {
				Phone: number
			}
			$.ajax({
				type: "post",
				url: "/api/sendBindMobileValidateCode",
				data: data,
				success: function(result) {
					if (result.Code == 200) {
						remind.show("验证码发送成功");
						verifyCode();
					} else {
						remind.show(result.Msg || "验证码发送失败");
					}
				}
			})
		}
		//发送验证码
	$(".J-sendCodeNumber").on("click", function() {
		var numberCode = $("[name=numberCode]").val(),
			phone = $("[name=phoneNumber]").val();
		if (!numberCode) {
			remind.show("验证码不能为空");
			return;
		}
		$.ajax({
			type: 'post',
			url: '/api/bindMobile',
			data: {
				Phone: phone,
				ValidateCode: numberCode
			},
			success: function(result) {
				if (result.Code == 200) {
					remind.show("已完成手机号码验证");
					hideVerifyPhone()
				} else {
					remind.show(result.Msg || "无法绑定此号码，请稍后再试");
				}
			}
		})
	});
	$(".J-hide-verifyPhone").on("click", function() {
		$(".J-verifyPhone").hide();
		$("#J-mask").hide();
	})
	var time = 6E1;
	var verifyCode = function() {
		if (time < 6E1) {
			return
		}
		resend = false;
		$("#sendNumberCountDown").show();
		//TODO 
		//send verify code
		var countdown = function(time) {
				console.log(time)
				$("#sendNumberCountDown i").text(time)
					//TODO 倒计时显示
			},
			start = function() {
				var timmer = setInterval(function() {
					if (time === 0) {
						clearInterval(timmer);
						timmer = 6E4;
						complete();
					}
					countdown(time--);
				}, 1E3)
			},
			//countdown complete
			complete = function() {
				resend = true;
				$("#sendNumberCountDown").hide();
			};

		start();
	}

	//open create group dialog
	$(".J-create-group").on("click", function() {
		dialog.show({
			type: "create-dialog",
			title: "创建新的团购",
			contents: "参加团购活动会要求您先登录码头客户端<br>本次团购活动每位码头会员限参与一次",
			btnText: "我要组团"
		});
	});
	/**
	 * 验证是否绑定手机
	 */
	var verifyHasBindMobel = function(callback) {
			isLogin(function() {
				$.ajax({
					type: 'post',
					url: '/forymatouapp/personal/hasBoundMobile',
					success: function(data) {
						callback(data);
					}
				})
			})

		}
		//close dialog
	$(document).on("click", ".bottomDialog .cancel", function(e) {
		dialog.hide.apply(this, e)
	});
	//jion group confirm
	$(document).on("click", ".join-dialog .confirm", function(e) {
		dialog.hide.apply(this, e)
		verifyHasBindMobel(function(data) {
			if (data.Code == 200) {
				//已经绑定
				if (data.Data.HasBoundMobile) {
					window.location.href = "/forymatouapp/activitys/milk/join";
				} else {
					//绑定手机
					verifyPhone();
				}
			}
		});
	});
	//create group confirm
	$(document).on("click", ".create-dialog .confirm", function(e) {
		dialog.hide.apply(this, e)
		verifyHasBindMobel(function(data) {
			if (data.Code == 200) {
				//已经绑定
				if (data.Data.HasBoundMobile) {
					$.ajax({
						type: 'post',
						url: '/forymatouapp/activitys/milk/create',
						success: function(result) {
							if (result.Code == 200) {
								remind.show("恭喜您，已成功创建团购");
								setTimeout(function() {
									window.location.href = "/forymatouapp/activitys/milk"
								}, 15E2);
							} else {
								remind.show(result.Msg || "创建团购失败");
							}
						}
					})
				} else {
					//绑定手机
					verifyPhone();
				}
			}
		});
	});

	/**
	 * 置底
	 * 判断是否内容是否超出屏幕，否则使用absolute,没有超出fixed
	 */
	var theBottom = function() {
		var $bottom = $(".J-the-botton");
		if (!$bottom[0]) {
			return;
		}

		function getWindowHeight() {
			return document.documentElement.clientHeight;
		}

		function getBodyHeight() {
				return document.body.clientHeight;
			}
			//当底部button改变之后,也要改变规则的位置，以便规则出现的初始位置
			//正好在底部规则条的顶部
		if (getWindowHeight() > getBodyHeight()) {
			$bottom.css({
				position: "fixed",
				bottom: 0,
				left: 0
			})
		} else {
			$bottom.css({
				position: "static"
			});
		}
		$('.J-rule-list').css({
			left: 0,
			bottom: getWindowHeight() - $bottom.offset().top
		})
	}
	$(window).on("resize", theBottom)
	theBottom();

	//show activitys rule
	$(".J-the-botton").on("click", function() {
		$('.J-rule-list').show();
	})
	$(".J-rule-hide").on("click", function() {
			$('.J-rule-list').hide();
		})
		//支付页
		//判断是否为商品编号
	var productInfos,
		productInfo,
		buyerInfo,
		currCatalogText,
		productId;
	$.ajax({
		type: 'get',
		url: '/forYmatouApp/activitys/milk/getProductInfos',
		success: function(result) {
			if (result.Code == 200) {
				productInfos = result.Data.Products;
			}
		}
	})

	$(".J-pay").on("click", function() {
		if (!$(this).hasClass("active")) {
			return
		}
		dialog.show({
			type: "pay-dialog",
			title: "确定购买吗？",
			contents: "您现在选择的规格<strong>" + currCatalogText + "</strong><br>本次活动期间内每位仅限购买一次",
			btnText: "立即支付"
		});
	});

	$(document).on("click", ".pay-dialog .confirm", function(e) {
		dialog.hide.apply(this, e)
		var catalog = currCatalog.CatalogPropertys;
		var CatalogPropertyList = (catalog[0]?[{
					Property: catalog[0].CatalogName,
					PropertyId: catalog[0].CatalogAttributeId,
					PropertyAttribute: catalog[0].CatalogValue,
					PropertyAttributeId: catalog[0].CatalogPropertyId,
					PropertyAttributePic: catalog[0].PicUrl
				}]:[])
		var data = {
			sellerId: productInfo.SellerId,
			sellerName: productInfo.SellerName,
			CatalogId: currCatalog.CatalogId,
			ProductNumber: productInfo.ProductNumber || 1, //数量
		}
		$.ajax({
			type: 'post',
			url: '/forymatouapp/activitys/milk/buy',
			data: JSON.stringify(data),
			contentType: 'application/json',
			success: function(result) {
				if (result.Code == 200) {
					window.location.href = "/forYmatouApp/orders?title=确认订单&needJumpFlag=1"
				} else {
					remind.show(result.Msg || '购买失败，请稍候再试');
				}
			}
		})
	})
	$(document).on("click", ".pay-dialog .cancel", function(e) {
		dialog.hide.apply(this, e)
	})
	var currCatalog;
	var showCatalog = function(inx) {
			
			productId = productInfos[inx].ProductId;
			productInfo = productInfos[inx].Product;
			currCatalog = productInfo.Catalogs[0];
			/*inx = inx > productInfo.Catalogs.length ? 0 : (inx || 0);
			currCatalog = productInfo.Catalogs[inx];*/
			if (currCatalog) {
				$(".totalWord i").text(currCatalog.Price);
			}
			getBuyInfo(productInfo)
		}
		/**
		 * 获得卖家信息
		 */
	function getBuyInfo(productInfo) {
			if (productInfo.SellerName) {
				return;
			}
			$.ajax({
				type: 'get',
				url: '/api/buyerInfo/' + productInfo.SellerId,
				success: function(result) {
					if (result.Code == 200) {
						if (result.Data) {
							productInfo.SellerName = result.Data.SellerName
						}

					}
				}
			})
		}
		//选择规格
	var CatalogIndex = 0;
	$(".spec-list li").on("click", function() {
		if (!productInfos) {
			remind.show("商品信息加载错误，请稍候重试!");
			return;
		}
		if (!$(".J-pay").hasClass("active")) {
			$(".J-pay").addClass("active")
				.find("span").text("立即购买");
		}
		$(".spec-list li").removeClass("active");
		var _this = $(this);
		CatalogIndex = _this.addClass('active')
			.attr("data-index");
		$("#J-catalog-text").text(currCatalogText = _this.attr("data-catalog"))
		showCatalog(CatalogIndex)
	});


	var verifyIng = false;
	$("#J-join-code").on("input", function() {
		if (verifyIng) {
			return;
		}
		var _this = $(this);
		if (_this.val().length == 5) {
			verifyIng = true;
			$.ajax({
				type: "post",
				url: "/forymatouapp/activitys/milk/" + _this.val() + "/join",
				success: function(result) {
					var msg = "恭喜您，已成功加入该团购",
						param = "";

					if (result.Code == 200) {
						//status 3 为别人已成团
						if (result.Data.Status == 3) {
							param = "" + _this.val() + "/info";
							msg = "您来晚了，该团已满！"
						}
						if (result.Data.Status == 0) {
							msg = "您来晚了，该团已过期！"
						}
						remind.show(msg);
						if (result.Data.Status != 0) {
							setTimeout(function() {
								window.location.href = "/forYmatouApp/activitys/milk/" + param;
							}, 15E2);
						}

					} else {
						remind.show(result.Msg);
					}
				},
				complete: function() {
					verifyIng = false;
				}
			})
		}
	});
	//倒计时
	var countdown = function() {
		var timeTag = $("[data-time]"),
			time = timeTag.attr("data-time"),
			day, hour, minute, timeStr = "";
		if (time) {
			day = parseInt(time / 36E5 / 24, 10);
			hour = parseInt(time / 36E5 % 24, 10);
			minute = parseInt(time / 6E4 % 60, 10);
			timeStr += day > 0 ? day + "天" : "";
			timeStr += hour > 0 ? hour + "时" : "";
			timeStr += minute > 0 ? minute + "分" : "";
			timeTag.text(timeStr);
		}

	}

	countdown();

	$(".J-share").on("click", function() {
		var _this = $(this),
			code = _this.attr("data-attr");
		window.location.href = "/forYmatouApp/share?" + "&shareTitle=" + encodeURIComponent("【洋码头】辣妈砍价团第二波，德国爱他美组团立减30，我的团就差你啦！") 
		+ "&sharePicUrl=" + encodeURIComponent("http://staticontent.ymatou.com/ymtapp/activitys/milk/1f0c03bf864f48dc9e4e30f12777f08d.jpg") 
		+ "&shareTip=" + encodeURIComponent("【洋码头】辣妈砍价团第二波，德国爱他美组团立减30，我的团就差你啦！") + "&shareUrl=" 
		+ encodeURIComponent("http://" + window.location.host + "/forymatouapp/activitys/milk/" + code + "/share") + "?shareFlag=1"
	});

	//获得人数
	(function() {
		var profile = $(".J-profile");
		if (!profile[0]) {
			return;
		}
		$.ajax({
			type: 'get',
			url: '/forYmatouApp/activitys/milk/profile',
			success: function(reulst) {
				var num = "xxxx";
				if (reulst && reulst.Code == 200) {
					num = reulst.Data.MemberCount;
				} else {
					remind.show(reulst.Msg || "参团人数获取失败");
				}
				profile.text(num * 6)
			}
		})
	})()
//});