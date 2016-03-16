/*=======================data.js===========================*/
Ymt.add("core.Data", function (i) {
	function main(name){
		if(!(this instanceof main)){
			return new main(name);
		}
		this.uuid=1;
		this.expando=name||"DATAEXPANDO"+(Math.random()+"").replace(/\D/g,function(){return ""});
	}
	function data(){
		this.cache={};
	}
	data.uuid=0;
	data.key="DATA"+(Math.random()+"").replace(/\D/g,function(){return ""});
	data.prototype.get=function(key){
		var id=this.id(),type=this.key(),cache;
		cache = this.cache[type] = this.cache[type] || {};
		if(key==undefined){
			return cache[id]||null;
		}
		if(typeof key==='string'){
			if(cache[id]){
				return cache[id][key]||null;
			}
		}
		return null;
	}
	data.prototype.set=function(key,value){
		var id=this.id(),self=i,type=this.key(),cache;
		cache = this.cache[type] = this.cache[type] || {};
		cache[id] = cache[id] || {};
		if(self.isPlainObject(key)){
			return i.mix(cache[id],key);
		}
		if(self.isArray(key)){
			self.each(key,function(m,n,i){
				i.mix(cache[id],m);
			},self);
			return cache[id];
		}
		if(typeof key==="string"){
		    if (value) {
			    cache[id][key] = value;
			    return cache[id][key];
			}
		}
		return null;
	}
	data.prototype.del=function(key){
		var id=this.id(),del=null,type=this.key(),cache;
		cache=this.cache[type]=this.cache[type]||{};
		if(key==undefined){
			del=delete cache[id];
			return del;
		}
		if(typeof key==='string'){
			if(cache[id]&&cache[id][key]){
				del=delete cache[id][key];
				return del;
			}
		}
		return del;
	}
	data.prototype.id=function(id){
		if(id!=undefined){
			this.constructor.uuid=id;
		}
		return this.constructor.uuid;
	}
	data.prototype.key=function(key){
		if(key!=undefined){
			this.constructor.key=key;
		}
		return this.constructor.key;
	}
	var outerRecord=new data(),innerRecord=new data(),
		da={
			get:function(obj,key,outer,inner){
				outer=outer||outerRecord;
				inner=inner||innerRecord;
				var expando=this.expando,id=obj[expando],record=null;
				if(!!id){
				    outer.id(id); outer.key(expando);
				    inner.id(id); inner.key(expando);
				}
				record = outer.get(key) != null ? outer.get(key) : inner.get(key);
				if(!record){
					record=obj[key]||null;
				}
				return record;
			},
			set:function(obj,key,value,outer,inner){
				outer=outer||outerRecord;
				inner=inner||innerRecord;
				var expando=this.expando,id=obj[expando],record;
				if(!id){
				    obj[expando] = id = this.uuid++;
				    outer.id(id); outer.key(expando);
				    inner.id(id); inner.key(expando);
				}
				inner.set(key,value);
				record=outer.set(key,value);
				return record;
			},
			del:function(obj,key,clear,outer,inner){
				outer=outer||outerRecord;
				inner=inner||innerRecord;
				var expando=this.expando,id=obj[expando],record=null;
				if(!!id){
				    outer.id(id); outer.key(expando);
				    inner.id(id); inner.key(expando);
				}
				record=outer.del(key);
				if(clear){
					record=inner.del(key);
				}
				return record;
			}
		};
	i.augment(main, da);
	return main;
});
