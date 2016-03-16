define(function (require, exports, module) {
    var layer = require('widget/layerbox');
    var cookie = require('util/cookie');

    //工具条
    
    

    exports.info = {}
    
    exports.index = function ( html) {
        //controller: c.index, data: ['BaseInfo'],
        var productId = $m.node('#productIdField').val(), VISITEDPDS = 'VisitedProducts', visited = cookie.get(VISITEDPDS);
        if (!productId) {
            return;
        }
        var SellerId = $m.node("#sellerID").val();
        if (visited) {
            visited = visited.split('|');
            for (var v = 0, length = visited.length; v < length; v++) {
                if (visited[v].toLowerCase() === productId.toLowerCase()) {
                    visited.splice(v, 1);
                    length--;
                }
            }
            visited.push(productId);
            visited.length > 6 && visited.splice(0, 1);
            visited = visited.join('|');
        } else {
            visited = productId;
        }
        cookie.set(VISITEDPDS, visited);
        //$m.node.attr($m.node("#moreProductDetail")[0], "href", "Description/pid=" + productId);
        //$m.node.attr($m.node("#moreProductCredits")[0], "href", "Assessment/sid=" + data.SellerId + "/p=1");

        //$m.mobile.route('specification/pid=' + productId);
        $m.mobile.route('sellerInfo/sid=' + SellerId);
        //添加到购物车


        $m.node('#TransferDetail .icon-font-moon').bind('click', function () {
            $m.node.removeClass($m.node('#TransferDetail')[0], 'show');
            $m.node.addClass($m.node('#TransferDetail')[0], 'none');
        })
        
        
        //查看运费详情
        if ($m.node('#TemplateDescription').length > 0) {
            $m.node('#checkTransferDetail').html('查看运费详情');
            $m.event.bind($m.node('#checkTransferDetail')[0], 'click', function () {
                $m.node.removeClass($m.node('#TransferDetail')[0], 'none');
                $m.node.addClass($m.node('#TransferDetail')[0], 'show');
                return false;
            });
        } else {
            $m.node('#checkTransferDetail').hide()
        }
        
        $m.node('#ProductShare').bind('click', function () {
            $m.node('#ProductShareFloatBox').css({ display: "block" });
            return !1
        })

        $m.node('#ProductShareFloatBox .btn-dim').bind('click', function () {
            $m.node('#ProductShareFloatBox').css({ display: "none" });
            return !1
        })

        function TemplateDescription(pid,areacode) {
            $m.ajax({
                url: '/singleproduct/TemplateDescription?pid=' + pid + '&ac=' + areacode,
                type: 'json',
                cache:!1,
                success: function (data) {
                    if (data.Error == !0) {
                        layer.alert("此商品不存在！", { isIntensity: !0 });
                    } else {
                        $m.node('#transferTemplateDetail').html(data.TemplateDescription)
                        $m.node('#expressCost').html(data.StartFee)
                    }
                }
            })
        }
        TemplateDescription(productId, $m.node.attr($m.node('#chinaAreaHandle')[0], 'areaid'));
        //china area
        var trans = $m.node('#chinaAreaFloatBox')[0], handle = $m.node('#chinaAreaHandle')[0];
        if (trans) {
            $m.event.bind(handle, 'click', function () {
                $m.node.removeClass(trans, 'none')
                return;
            });
            $m.event.delegate('a', 'click', function () {
                $m.node.addClass(trans, 'none');
                handle.innerHTML = this.innerHTML;
                TemplateDescription(productId, $m.node.attr(this, 'areaid'));
                return false;
            }, $m.node('#chinaAreaFloatBox .address')[0]);

            $m.event.bind($m.node('.close', trans)[0], 'click', function () {
                $m.node.addClass(trans, 'none');
            })
        }

    };
    
    exports.Specification = function (param, data) {
        

    };
    exports.SellerInfo = function (param, html, data) {

        $m.template({ container: '#sellerInfo', html: html, data: data });
        return data;
    }
})