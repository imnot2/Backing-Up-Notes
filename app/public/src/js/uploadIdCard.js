/**
 * 上传身份证
 */
$(function () {
	var common = {
			parseUrl: function (str) {
				var SEARCH_EXP = /\?([^#]*)/;
				var arr,
					part,
					url = {};

				str = (str || '').replace(/^\s+|\s+$/, '');

				var match_result = str.match(SEARCH_EXP);

				if (!(str && match_result && match_result[1])) {
					return {};
				}
				arr = match_result[1].split('&');
				for (var i in arr) {
					part = arr[i].split('=');
					url[part[0]] = part[1];
				}
				return url;
			}
		}
		/**
		 * 增加认证
		 */
	var addAuth = function (url, isForce) {
		var currSearch = common.parseUrl(window.location.search),
			search = common.parseUrl(url);

		var SEARCH_REG = /\?([^#]*)/,
			HASH_REG = /#(.*)/;

		if (isForce) {
			if (!currSearch.UserId || !currSearch.AccessToken) {
				return window.location.href = '/forYmatouApp/loginStatus?hasLogin=0';
			}
		}
		if (currSearch) {
			currSearch.UserId && (search.UserId = currSearch.UserId);
			currSearch.AccessToken && (search.AccessToken = currSearch.AccessToken);
			var searchStr = '';
			for (var i in search) {
				searchStr += '&' + i + '=' + search[i];
			}
			if (searchStr)
				searchStr = '?' + searchStr.substr(1);

			//是否存在search
			if (SEARCH_REG.test(url)) {
				url = url.replace(SEARCH_REG, searchStr);
			}
			else {
				//是否存在hash
				if (HASH_REG.test(url)) {
					url = url.replace(HASH_REG, searchStr + '#' + HASH_REG);
				}
				else {
					url += searchStr;
				}
			}
		}
		return url;
	}

	/**
	 * 打开一个页面
	 */
	function openWin(url) {
		window.location.href = addAuth(url);
	}
	$('.J-open').click(function () {
		var self = $(this);
		href = self.attr('data-href');
		openWin(href);
	});

	//绑定返回功能
	$(".back").click(function (event) {
		history.go(-1);
	});
	$("#example-show").click(function () {
		$(".example-show").show();
	})
	$(".example-show").click(function () {
			$(this).hide();
		})
		//新增身份证
	$("#addIdCard").click(function () {
		var val = $("[name=idCard]").val();
		if (val == "") {
			return prompt("身份证号码不能为空");
		}
		if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val))) {
			return prompt("身份证号码格式错误");
		}
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
				idCard: val
			}),
			url: location.href,
			contentType: "application/json",
			success: function (result) {
				if (result.Code == "200") {
					window.location.href = window.location.pathname+'/upload' + window.location.search+'&idCard='+val;
				}
				else {
					prompt(result.Msg)
				}
			}
		})
	})

	var promptStatus = true;

	function prompt(data, callback) {
		if (promptStatus) {
			promptStatus = false;
			$('.error').html("<i>" + data + "</i>").show();
			setTimeout(function () {
				$('.error').hide();
				promptStatus = true;
				callback && callback()
			}, 2500)
		}
	}

	/**
	 * 图片预览
	 * @param  {file} file [description]
	 * @param  {ElementObject} img  [description]
	 * @description
	 * 	将图片通过fileReader 转成base64然后用预览出来
	 */
	function preview(file, img) {
		var fileReader = new FileReader();
		fileReader.onload = function (e) {
			img.src = e.target.result;
		}
		fileReader.readAsDataURL(file);
	}

	function parseUrl(str) {
		var arr,
			part,
			url = {};

		arr = str.substring(1, str.length).split('&');
		for (var i in arr) {
			part = arr[i].split('=');
			url[part[0]] = part[1];
		}
		return url;
	}
	var uploadIng = false;

	function upload() {
		if (uploadIng) {
			return;
		}
		uploadIng = true;
		var formData = new FormData();
		formData.append("afile", document.getElementsByName("upload")[0].files[0]);
		formData.append("afile1", document.getElementsByName("upload")[1].files[0]);
		formData.append("idCard", parseUrl(location.search).idCard);
		var $upload = $("#upload");
		$upload.text("上传中...")
		$.ajax({
			type: 'POST',
			data: formData,
			url: location.pathname+'/progress'+window.location.search,
			contentType: false,
			processData: false,
			success: function (result) {
				uploadIng = false;
				$upload.text("下一步")
				if (result.Code == 200) {
					window.location.href = '/forymatouapp/uploadIdCard/success/' + result.Data.tid;
				}
				else {
					prompt(result.Msg)
				}
			}
		})
	}
	$("[name=upload]").change(function (e) {
		var target = e.target;
		preview(target.files[0], target.nextElementSibling)
	})
	$("#upload").click(function () {
		var isSelect = true;
		$("[name=upload]").map(function (i, v) {
			if (v.value == "") {
				prompt("请选择要上传的身份证");
				return isSelect = false;
			}
		})
		if (isSelect) {
			upload();
		}

	})

})