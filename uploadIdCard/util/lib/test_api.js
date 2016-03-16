var formUtil=require('./form');
var requestUtil=require('./request');

module.exports={

	requestApi:function(req,res){
		res.render('test')
	},

	requestApiPost:function(req,res){
		formUtil.fields(req,function(f){

			if(f.server.method=='POST'){

				var opt={
						hostname    : f.server.host,
				        port        : parseInt(f.server.port),
						path		: f.server.route
					}

				requestUtil.post(opt,f.JSONS,function(result){
					res.send(result)
				})

			}else if(f.server.method=='GET'){

			}
		})
	}
}