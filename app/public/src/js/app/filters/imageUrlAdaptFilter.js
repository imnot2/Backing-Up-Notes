/*
 * 图片路径替换
 */
ymtapp.filter('urlAdapt', ['utils', function (utils) {
	return function (url, param) {
		var imgHandl = utils.imgHandl,
			_url = url;
		if (param === 's') { // small 
			_url = imgHandl.replaceToSmallPic(url)
		}
		else if (param === 't') { // Thumbnail
			_url = imgHandl.replaceToThumbnailPic(url)
		}
		else { //默认 param == 'l' list
			_url = imgHandl.replaceToListPic(url)
		}
		return _url;
	}
}])