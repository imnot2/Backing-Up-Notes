define(function (require, exports, module) {
    var tool = require('util/html');
    var dec = tool.filter(Description, ['link', 'script', 'label', 'width', 'taobao 淘宝 etao tmall hitao 天猫']);
    var noticeValue = "";
    var noticePart = "";
    $m.node('#DescriptionContent').html(dec);

    if (hasNotice == "True") {
        noticeValue = $m.node('#DescriptionNotice')[0].value;
        noticePart = $m.node.attr($m.node('#DescriptionNotice')[0],'part');
        NoticeShow();
    }
    
    function NoticeShow() {
        var notice = $m.node('#notice')[0];

        //插入显示全部节点
        if (noticeValue.length >= 50) {
            $m.node.append($m.node("#notice")[0], "<span class='allNotice active'>显示全部</span>")
        }

        var allNotice = $m.node('.allNotice')[0];


        var nkey = 0;
        $m.event.bind(allNotice, 'click', function () {
            if (nkey == 0) {
                $m.node('#notice p')[0].innerHTML = noticeValue
                $m.node('.allNotice')[0].innerHTML = "收起";
                nkey++
            } else if (nkey == 1) {
                $m.node('#notice p')[0].innerHTML = noticePart;
                $m.node('.allNotice')[0].innerHTML = "显示全部";
                nkey--

            }
        });

    }



    //工具条
    var toobar=require("component/floattoolbar");
    var _query=$m.parseURL(location.href).query
    var __productid = _query&&_query.pid;
    
    if(__productid){
        $m.ajax({
            url:"/singleproduct/Catalogs?pid="+__productid,
            success:function(data){
                console.log(data)
                toobar({
                    type:1,
                    isoffsell:data.IsOffSell,
                    hasStock:data.CanBuy,
                    isFutureSell:data.SecondsToOnSell>0,
                    cartUrl:"/product/selectcatalog/"+__productid
                });
                
            }
        })

    }

})