/*=======================ymatou-jquery.js===========================*/
jQuery.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    jQuery.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
jQuery(function () {
    jQuery.ymatoupost = function (url, data, callback, dataType) {
        jQuery.ajax({
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            url: url,
            data: data,
            success: callback,
            dataType: dataType
        });
    };
});
//jQuery(function () {
//    jQuery.prop = function (name, value) {
//        if (name == "checkbox") {
//            return jQuery.access(this, name, value, true, jQuery.attr);
//        } else {
//            return jQuery.access(this, name, value, true, jQuery.attr);
//        }
//    };
//});
jQuery.fn.prop = function (name, value) {
    ///
    ///<summary>1.5.1预先兼容1.6.2</summary>
    ///
    if (name == "checkbox") {
        return jQuery.access(this, name, value, true, jQuery.attr);
    } else {
        return jQuery.access(this, name, value, true, jQuery.attr);
    }
};
 
