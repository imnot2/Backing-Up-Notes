define(function (require, exports, moudel) {
   
    //浮层模型
    function showModel(title,mod){
        var backdrop="<div class=\"floatbox show\" id=\"TransferDetail\"><div class=\"floatbox-backdrop\"></div>",
            modelHead = "<div class=\"floatbox-content\"><div class=\"cost-detail\"><div class=\"c-d-title\"><span class=\"fl\">" + title + "</span><span class=\"icon-font-gly fr\" id=\"modClose\">&#xe208;</div><div class=\"c-d-content\">",
            modelFooter="</div></div></div></div>";
            return backdrop+modelHead+mod+modelFooter;
    }
    
    //运费模块
    exports.postage=function(arr){
        var htmlHead="<table><thead><tr><th>首重</th><th>续重</th><th>邮递重量</th></tr></thead><tbody>",htmlBody="",htmlFooter="</tbody></table>";
        for(var i in arr){
            htmlBody += "<tr><td>" + arr[i].firstWeight + "</td><td>" + arr[i].refillWeight + "</td><td>" + arr[i].totalWeight + "</td></tr>";
        }
        var html = htmlHead + htmlBody + htmlFooter;

        return showModel("运费详情",html);
    }

})