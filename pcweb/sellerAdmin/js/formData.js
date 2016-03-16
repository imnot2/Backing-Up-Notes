/**
 * Created by EX-lijiang001 on 2014/07/15.
 * formData 为了ajax请求表单数据操作的方法，
 * 提供两个主要方法：getter和setter方法
 * getter
 *  获得表单中所有的数据，按name返回。
 */

! function($) {
    'use strict';
    /**
     * @param $element {element} 范围对象
     * @param options {object}   对象
     * options = {
     *  isMerge:true,//是否合并，针对传入map使用，
        当存在map中不存在的字段将使用原name保存在返回的的结果集中
     }
     */
    var FormData = function($element, options) {
            this.$ele = $element;
            this.initData={};//初始化数据
            this.data = {};
            this.dataObj = {};
            this._arrange();
        }
        //FormDataMerge
    FormData.VERSION = "1.0.0";

    FormData.prototype = {
        //数据整理
        _arrange: function() {
            var elm = this.$ele,
                data = this.data,
                dataObj = this.dataObj,
                inputs = this.$inputs = elm.find(":input");
            var rselectTextarea = /select|textarea/i,
                rinput = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i;
            inputs.filter(function() {
                return this.name && !this.disabled &&
                    (this.checked || rselectTextarea.test(this.nodeName) ||
                        rinput.test(this.type));
            }).map(function(i, elem) {
                var self = $(this),
                    val = self.val(),
                    name = elem.name;
                //将原本的表单对象存放到数组中
                (dataObj[name] = dataObj[name] || []).push(self)
                return val == null ?
                    val :
                    $.isArray(val) ?
                    $.map(val, function(val, i) {
                        data[name] = val;
                    }) : data[name] = val;
            });
            //将保存第一版数据，作为reset的时候使用。
            if($.isEmptyObject(this.initData))
                this.initData = data;
        },
        /*
         * 数据获得器
         * @param mapping {string | Object} 取对应的值|映射关系
         *        映射关系{返回的key:表单name}
         *
         */
        getter: function(mapping) {
            this._arrange();
            if (typeof mapping === "string") {
                return this.data[mapping]
            } else if ($.isPlainObject(mapping)) {
                var data = {};
                for (var i in mapping) {
                    data[i] = this.data[mapping[i]];
                }
                return data;
            }
            return this.data;
        },
        /*
         * 表单存储器
         * @param setData {string | Object} 给表单设置的数据
         *        按name存储
         * @param mapping {string | Object}取对应的值|映射关系
         *        映射关系{返回的key:表单name}
         * 参数为空
         */
        setter: function(setData, mapping) {
            var inputs = this.$inputs;
            for (var name in setData) {
                var input = inputs.filter("[name=" + name + "]"),
                    type = input.attr("type");
                if (type && rselectTextarea.test(this.nodeName) && type.toLocaleLowerCase() === "radio") {
                    input.filter("[value=" + setData[name] + "]").attr("checked", "true");
                } else {
                    input.val(setData[name]);
                }
            }
        },
        //设置初始值，供重置生成。
        setOldData:function(){

        },
        /*
         * 重置数据
         * @param isEmpty {boolean} 是否清空 默认：false
         *
         *
         */
        reset: function(isEmpty) {
            var self = this,
                inputs = this.$inputs;
            //获得初始值
            var getOldVal = function(n){
                if(!isEmpty)return "";
                return self.initData[n];
            }

            inputs.map(function(){
                var $this = $(this);
                var val = getOldVal(this.name),
                    fil = val === "" ? ":eq(0)":"[value="+val+"]";
                if(this.type === "radio"){
                    //重置将第一个选中
                    inputs.filter("[name="+this.name+"]"+fil).attr("checked",true);
                }else if(this.nodeName === "select"){
                    inputs.filter("[name="+this.name+"] option"+fil).attr("checked",true);
                }else{
                    this.value=getOldVal(this.name);
                }
            });            
        }

    }

    function Plugin(option) {
        //return this.each(function() {
        var $this = $(this),
            data = $this.data('ymt.formData');

        if (!data) $this.data('ymt.formData', (data = new FormData($this)))
        if (typeof option == 'string') data[option]()
            //})
        return data;
    }

    var old = $.fn.formData

    $.fn.formData = Plugin
    $.fn.formData.Constructor = FormData;

    ///解决dialog noConflict
    $.fn.formData.noConflict = function() {
        $.fn.formData = old
        return this
    }

}(jQuery);