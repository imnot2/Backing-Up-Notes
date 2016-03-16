/*
    app product images size
*/
function imgSize(size,data){


    //_o,_lb,_ls 神器图片类型   _s,_l,_b 洋码头图片类型
    var sizeArr={"_o":"original","_lb":"listb","_ls":"lists","_s":"small","_l":"list","_b":"big"};

    for (i in data) {
        if(data[i].ProductPics){
            for (p in data[i].ProductPics) {
                if(data[i].ProductPics[p].indexOf('original')){
                    data[i].ProductPics[p] = data[i].ProductPics[p].replace('original',sizeArr[size]).replace('_o', size);
                }else if(data[i].ProductPics[p].indexOf('listb')){
                    data[i].ProductPics[p] = data[i].ProductPics[p].replace('listb',sizeArr[size]).replace('_lb', size);
                }else if(data[i].ProductPics[p].indexOf('lists')){
                    data[i].ProductPics[p] = data[i].ProductPics[p].replace('lists',sizeArr[size]).replace('_ls', size);
                }else if(data[i].ProductPics[p].indexOf('small')){
                    data[i].ProductPics[p] = data[i].ProductPics[p].replace('small',sizeArr[size]).replace('_s', size);
                }else if(data[i].ProductPics[p].indexOf('list')){
                    data[i].ProductPics[p] = data[i].ProductPics[p].replace('list',sizeArr[size]).replace('_l', size);
                }else if(data[i].ProductPics[p].indexOf('big')){
                    data[i].ProductPics[p] = data[i].ProductPics[p].replace('big',sizeArr[size]).replace('_b', size);
                }
            }
        }else{
            if(data[i].ProductPic.indexOf('original')){
                data[i].ProductPic = data[i].ProductPic.replace('original',sizeArr[size]).replace('_o', size);
            }else if(data[i].ProductPic.indexOf('listb')){
                data[i].ProductPic = data[i].ProductPic.replace('listb',sizeArr[size]).replace('_lb', size);
            }else if(data[i].ProductPic.indexOf('lists')){
                data[i].ProductPic = data[i].ProductPic.replace('lists',sizeArr[size]).replace('_ls', size);
            }else if(data[i].ProductPic.indexOf('small')){
                data[i].ProductPic = data[i].ProductPic.replace('small',sizeArr[size]).replace('_s', size);
            }else if(data[i].ProductPic.indexOf('list')){
                data[i].ProductPic = data[i].ProductPic.replace('list',sizeArr[size]).replace('_l', size);
            }else if(data[i].ProductPic.indexOf('big')){
                data[i].ProductPic = data[i].ProductPic.replace('list',sizeArr[size]).replace('_b', size);
            }

        }
    }

    return data;

}

module.exports={
    _o:function(data,callback){
        callback(imgSize('_o',data))
    },

    _lb:function(data,callback){
        callback(imgSize('_lb',data))
    },

    _ls:function(data,callback){
        callback(imgSize('_ls',data))
    }
}