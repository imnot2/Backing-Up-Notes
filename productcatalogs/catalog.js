
function CatalogUI(wrapId,catalog){
	if(!this instanceof CatalogUI) return new CatalogUI(wrapId,catalog);
	this.options = $.extend({
		"wrap":$("#"+wrapId),
		"catalogClass":{},
		"list":{},
		"from":[],
		templete:function(){}
	},catalog);
	this.init();
}
CatalogUI.prototype = {
	init:function(){
		this.view();
	},
	view:function(){
		var opt = this.options,
			pros = opt.Data,
			titles = opt.Spec,
            catalogClass = opt.catalogClass,
			pro, SpecDetail, i, j, n, k, catalogs, node, type, spec, detailItem, catalogsItem ;

		//根据分类的种类，生成分类父节点
		this.containers = this.containerUi(titles);

		for(i = 0; i<pros.length; i++){
			pro = pros[i];
			SpecDetail = pro.SpecDetail;
			for(j = 0; j<SpecDetail.length; j++){
				spec = SpecDetail[j];

				//根据规格分类生成Dom 并append到对应的分类父节点
				catalogsItem = this.containers[j];

                catalogClass[j] = catalogClass[j] || {};
				if(!catalogClass[j][spec]){
					detailItem = this.detailItemUi(spec);

					detailItem.data("hasCatalogs",[]);
                    detailItem.data("catalogDatas",[]);
                    detailItem.data("catalogDatas").push(pro);

					catalogsItem.find('.detailItemWrap').append(detailItem);
					catalogClass[j][spec] = detailItem;
				}else{
					catalogClass[j][spec].data("catalogDatas").push(pro);
				} 
			}
		}
        for(i in this.containers){
            opt.wrap.append(this.containers[i]);
        }
        
        //绑定事件
        this.addEvent();        
	},
	detailItemUi:function(str){
		var html = '', src;
		if(str.indexOf("|") > 0){
			src = str.split("|")[0];
			html = $('<li class="item"><a href="javascript:;"><span><img src="'+src+'"" height="20" /></span></a></li>');
		}else{
			html = $('<li class="item"><a href="javascript:;"><span>'+str+'</span></a></li>');
		}
		return html;
	},
	containerUi:function(arr){
		var containers = {};
		for(var i = 0; i<arr.length; i++){
			containers[i] = $("<div class='catalogsItem"+i+"'><dl class='catalogsBox'><dt>"+arr[i]+":</dt><dd class='des'><ul class='detailItemWrap' type='"+i+"'></ul></dd></dl></div>");
		}
		return containers;
	},
	addEvent:function(){
		var opt = this.options, 
			nodes = opt.wrap.find(".item"),
			list = {}, _this = this;
		nodes.bind('click',function(e){
			var catalogType;
			catalogType = $(this).parent('ul').attr('type');
			if($(this).hasClass('disabled')) return;
			if($(this).hasClass('select')){
				$(this).removeClass('select');
				delete opt.list[catalogType];
			}else{
				$(this).siblings().removeClass('select');
				$(this).addClass('select');
				opt.list[catalogType] = $(this).data("catalogDatas");
			}

			//获取满足条件的商品
			_this.updateFrom();

			//显示不可点击的商品
			_this.showDisabled();

			opt.templete(opt.from);
		})
	},
	
	showDisabled:function(){
		var opt = this.options,
			catalogClass = opt.catalogClass,
            from = opt.from,
            list = opt.list,
			specs, names = {}, tag, j, n;

		for(j = 0; j < from.length; j++){
			specs = from[j]["SpecDetail"];
			for(n = 0; n< specs.length; n++){
				names[specs[n]] = 1;
			}
		}

		for(j in catalogClass){
			if(list[j]){
				for(n in catalogClass[j]) catalogClass[j][n].removeClass("disabled");
				continue;
			}
        	for(n in catalogClass[j]){
				tag = catalogClass[j][n];
				if(!opt.from.length){
					tag.removeClass("disabled");
					continue;
				}
				if(names[n]){
					tag.removeClass("disabled");
				}else{
					tag.addClass("disabled");
				} 
			}     	
        }
	},
	updateFrom:function(){
		var opt = this.options,
			list = opt.list, curs, others = [], i, j, n, res = [];
		for(i in list){
			others.push(list[i]);
		}
		curs = others[0] || [];
		if(others.length < 2) {
			res = curs;
		}else{
			for(i = 0; i< curs.length; i++){
				for(j = 1; j< others.length; j++){
					for(n = 0; n< others[j].length; n++){
						if(curs[i] == others[j][n]) res.push(curs[i]);
					}
				}
			}
		}
		opt.from = res;
	}
}