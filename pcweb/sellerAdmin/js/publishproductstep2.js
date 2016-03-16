$(function () {


    //创建规格实例
    var specification = new SpecificationModel({
        categoryimport: '.categoryimport',
        addspecification: '#AddSpecification',
        addspecificationfield: '#AddSpecificationField',
        addcategory: '[addcategory]',
        container: '#SpecificationContainer',
        template: '#SpecificationTemplate',
        setspecification: '#setspecification',
        max: 2
    });



    //添加商品属性
    $("#AddPropertyBtn").click(function() {
        $(this).before("<input name=\"\" class=\"c-input-text-sm PropertyName\" type=\"text\"/><input name=\"\" class=\"c-input-text-sm PropertyValue\" type=\"text\"/><a class=\"DeleteProperty\" href=\"javascript:;\">删除</a>");
    });

    //删除商品属性
    $(".DeleteProperty").live("click", function() {
        $(this).prev().prev().remove();
        $(this).prev().remove();
        $(this).remove();
    });

    //设置为主图
    $(".SetMainPhoto").live("click", function() {
        $(".MainPhoto").before("<a class=\"SetMainPhoto\">" + ResourceJS.ProductPublish_AddStep2_button_ChooseMainPhoto + "</a>");
        $(".MainPhoto").remove();
        $(this).before("<span class=\"img-desc MainPhoto\">" + ResourceJS.ProductPublish_AddStep2_button_MainPhoto + "</span>");
        $(this).remove();
    });

    //上传商品图片
    $(".UploadProductPic").change(function() {
        var currentDiv = $(this).closest("div");
        var options = {
            type: "POST",
            dataType: "text",
            success: function(msg) {
                if (msg == "error") {
                    alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                } else {
                    currentDiv.find("input.PicUrl").val(msg);
                    currentDiv.find("img").attr("src", msg);
                    currentDiv.find("img").show();
                    currentDiv.prepend("<a class=\"img-del\"><i class=\"icon-del\"></i></a>");
                }
            },
            error: function() {
                alert("图片上传异常，请重新选择较小的图片上传。");
            }
        };
        $(this).closest("form").ajaxSubmit(options);
    });

    //删除上传的图片
    $(".img-del").live("click", function() {
        var currentDiv = $(this).closest("div");
        currentDiv.find("input.PicUrl").val("");
        currentDiv.find("img").attr("src", "");
        currentDiv.find("img").hide();
        $(this).remove();
    });

    //启用限购
    $("#UseLimitCheck").change(function() {
        if ($(this).attr("checked")) {
            var limitDes = $("#LimitDes").html();
            var t = new Date();
            var tMonth = t.getMonth() + 1;
            var tHour = t.getHours();
            var tMinits = t.getMinutes();
            var timeText = t.getFullYear() + '/' + tMonth + '/' + t.getDate() + ' ' + tHour + ':' + tMinits;
            var newLimitDes = limitDes.replace("{0}", timeText);
            $("#LimitDes").html(newLimitDes);
            $("#LimitDiv").show();
            if ($("#LimitStartTime").val() == "") {
                $("#LimitStartTime").val(timeText + ":00");
            }
        } else {
            $("#LimitDiv").hide();
        }
    });

    //运费设置
    $("input[name=productFreight]").click(function() {
        if ($(this).val() == "1") {
            $("#FreightByBuyerDiv").show();
        } else {
            $("#FreightByBuyerDiv").hide();
        }
    });

    //运费模板选择
    $("#SelectTemplate").change(function() {
        if ($(this).val() == "1") {
            $("#ProductWeight").hide();
            $("#UseFreightSelf").show();
        } else {
            $("#UseFreightSelf").hide();
            if ($("#SelectTemplate option:selected").attr("data")) {
                $("#ProductWeight").show();
            } else {
                $("#ProductWeight").hide();
            }
        }
    });

    $("#ValidStartDate").datepicker();
    $("#ValidEndDate").datepicker();

    //单报价自动生成SKU
    $("#AutoSku").click(function() {
        $.post("/Product/ProductPublish/GetNewCatalogSkus?n=1", function(data) {
            $("#OneCatalogSku").val(data);
        });
    });

    var useDuplicateSKU = false;
    //添加新商品发布
    $("#SubmitAdd").click(function() {
        var subData = getSubData();
        var error = checkSubData(subData);
        if (error != "") {
            alert(error);
        }
        else {
            $.ajax({
                url: "/Product/ProductPublish/SubProductInfo",
                type: "POST",
                dataType: "json",
                data: $.toJSON(subData),
                contentType: 'application/json',
                success: function (data) {
                    if (data.success == "1") {
                        alert("商品添加成功！继续发布。");
                        window.location.reload();
                    } else if (data.success == "2") {
                        if (confirm(data.msg)) {
                            useDuplicateSKU = true;
                            //$('#SubmitAdd').click();
                        }
                    }
                    else {
                        alert(data.msg);
                    }
                }
            });
        }
    });
    
    //提交编辑商品
    $("#SubmitEdit").click(function() {
        var subData = getSubData();
        var error = checkSubData(subData);
        if (error != "") {
            alert(error);
        }
        else {
            $.ajax({
                url: "/Product/ProductPublish/SaveEdit",
                type: "POST",
                dataType: "json",
                data: $.toJSON(subData),
                contentType: 'application/json',
                success: function (data) {
                    if (data.success == "1") {
                        alert("商品添加成功！继续发布。");
                            window.location.reload();
                    } else if (data.success == "2") {
                        if (confirm(data.msg)) {
                            useDuplicateSKU = true;
                            $('#SubmitEdit').click();
                        }
                    }
                    else {
                        alert(data.msg);
                    }
                }
            });
        }
    });

    function Catalogs() {
        var catalogs = [];
        if (!$("input[name=setSpec]").attr("checked")) {
            var o = {
                CatalogId: '',
                Price: $("#OneCatalogPrice").val(),
                Num: $("#OneCatalogNum").val(),
                SKU: $("#OneCatalogSku").val(),
            };
            catalogs.push(o);
        }
        return catalogs;
    }

    function Propertys() {
        var str = "", str1 = "NewPropertyName_", str2 = "NewProperty_";
        var i = 1;
        $(".PropertyName").each(function() {
            str += str1 + i + "=" + $(this).val() + "&" + str2 + i + "=" + $(this).next().val() + "&";
            i++;
        });
        return str;
    }
    
    function getSubData() {
        var productPics = [];
        $(".SetMainPhoto").each(function() {
            var picUrl = $(this).closest("div").find(".PicUrl").val();
            if (picUrl != "") {
                productPics.push(picUrl);
            }
        });

        var subData = {
            ProductName: $("#ProductName").val(),
            PictureUrl1: $(".MainPhoto").closest("div").find(".PicUrl").val(),
            PictureUrl2: productPics[0] == undefined ? "" : productPics[0],
            PictureUrl3: productPics[1] == undefined ? "" : productPics[1],
            PictureUrl4: productPics[2] == undefined ? "" : productPics[2],
            PictureUrl5: productPics[3] == undefined ? "" : productPics[3],
            //OverSeaMarketPrice: '',
            //InternalMarketPrice: '',
            //BuyPlace: '',
            iCategoryId: $('#CategoryId').val(),
            iThirdCategoryId: $('#ThirdCategoryId').val(),
            //ThirdCategoryName: $('#ThirdCategoryName').val(),
            //MainCategoryName: $('#MainCategoryName').val(),
            //SubCategoryName: $('#SubCategoryName').val(),
            //sBrandName: '',
            //sBrandEnName: $('#BrandEnName').val(),
            IsSailProtected: $('input[name=CatalogStatus]:checked').val() == 3,
            ReferenceUrl: '',
            Description: $("#Description").val(),
            iBrandId: $('#BrandId').val(),
            AcceptReturn: $('input[name=AcceptReturn]:checked').val(),
            CatalogStatus: $('input[name=CatalogStatus]:checked').val(),
            //Flight: $('#SelfFreight').val(),
            //DeliveryTemplateId: $('#SelectTemplate').val(),
            Weight: $("#Weight").val(),
            dExpireTime: '',
            LimitNum: $("#LimitNum").val(),
            LimitNumStartTime: $('#LimitStartTime').val(),
            Limited: $('#UseLimitCheck').attr('checked'),
            Available: false,
            ProductProperty: Propertys(),
            sProductId: $('#ProductId').val(),
            AvailableNow: false,
            ValidStart: ($("input[name=OnSaleType]:checked").val() == -1 ? $("#OldValidStart").val() : $('#ValidStartDate').val() + " " + $('#ValidStartHour').val() + ":" + $('#ValidStartMin').val() + ":00"),
            ValidEnd: ($("input[name=OnSaleType]:checked").val() == -1 ? $("#OldValidEnd").val() : $('#ValidEndDate').val() + " " + $('#ValidEndHour').val() + ":" + $('#ValidEndMin').val() + ":00"),
            OnSaleType: $('input[name=OnSaleType]:checked').val(),
            //OnSaleType: 0,
            AutoRefresh: $('input[name=AutoOnSell]:checked').length > 0,
            CatalogType: 0,
            TariffType: $('input[name=TariffType]:checked').val(),
            CatalogSKUstring: $('#AutoCatalogSkus').val(),
            //CurrentSKUstring: $('#CurrentSkus').val(),
            FreightForBuyerType: $('#SelectTemplate').val(),
            productFreight: $("input[name='productFreight']:checked").val(),
            Catalogs: Catalogs(),
            UseDuplicateSKU: useDuplicateSKU
        };
        if ($('#SelectTemplate').val() != -1 && $('#SelectTemplate').val() != 1) {
            subData.DeliveryTemplateId = $('#SelectTemplate').val();
        }
        else if ($('#SelectTemplate').val() == 1) {
            subData.Flight = $('#SelfFreight').val();
        }
        return subData;
    }

    //验证提交信息

    function checkSubData(subData) {
        var errorMsg = "";
        if (subData.ProductName == "") {
            errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoProductName+"\n");
        }

        if (subData.PictureUrl1 == "") {
            errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoMainProductPic+"\n");
        }

        if (subData.Catalogs.length == 0) {
            errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoCatalog + "\n");
        }

        if ($('#isEdit').val() == 'y') {
            for (var i = 0; i < subData.Catalogs.length; i++) {
                if (isNaN(subData.Catalogs[i].Price) || subData.Catalogs[i].Price <= 0) {
                    errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_ErrorPrice + "\n");
                }
                if (isNaN(subData.Catalogs[i].Num) || subData.Catalogs[i].Num < 0) {
                    errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_ErrorStock + "\n");
                }
            }
        } else {
            for (var i = 0; i < subData.Catalogs.length; i++) {
                if (isNaN(subData.Catalogs[i].Price) || subData.Catalogs[i].Price <= 0) {
                    errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_ErrorPrice + "\n");
                }
                if (isNaN(subData.Catalogs[i].Num) || subData.Catalogs[i].Num <= 0) {
                    errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_ErrorStock + "\n");
                }
            }
        }

        if (!subData.TariffType) {
            errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoTariffType + "\n");
        }

        if (subData.Limited) {
            if (isNaN(subData.LimitNum) || subData.LimitNum == '') {
                errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_ErrorLimitNum + "\n");
            } else if (subData.LimitNum < 1 || subData.LimitNum > 999) {
                errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_ErrorLimitNum + "\n");
            }
        }

        if (!subData.CatalogStatus) {
            errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoCatalogStatu + "\n");
        }

        if (!subData.productFreight) {
            errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoFreight + "\n");
        }

        if (subData.productFreight == 1) {
            if (subData.FreightForBuyerType == -1) {
                errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoFreightTemplate + "\n");
            }
            if ($("#SelectTemplate option:selected").attr("data") && subData.Weight == '') {
                errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoProductWeight + "\n");
            }
        }

        if (subData.FreightForBuyerType == 1 && (subData.Flight == '' || isNaN(subData.Flight))) {
            errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_ErrorFreight + "\n");
        }

        if (!subData.OnSaleType || (subData.OnSaleType == 1 && ($("#ValidStartDate").val() == "" || $("#ValidEndDate").val() == ""))) {
            errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoOnSaleTime + "\n");
        }

        if (!subData.AcceptReturn) {
            errorMsg += (ResourceJS.ProductPublish_AddStep2_alert_NoAcceptReturn + "\n");
        }

        return errorMsg;
    }

});



$(function () {
    var kissyEditor;

    KISSY.use("editor/full", function(S, Editor) {

        var cfg = {
            // 是否初始聚焦
            //focused: true,
            autoRender: true,
            attachForm: true,
            // 自定义样式
            // customStyle:"p{line-height: 1.4;margin: 1.12em 0;padding: 0;}",
            // 自定义外部样式
            // customLink:["http://localhost/customLink.css","http://xx.com/y2.css"],
            // render:"#container",
            srcNode: '#editorEl',
            width: '100%',
            height: "400px"
        };

        var plugins = ("source-area" +
            ",separator" +
            ",bold" +
            ",italic," +
            "font-family," +
            "font-size," +
            "strike-through," +
            "underline," +
            "separator," +
            "checkbox-source-area" +
            ",image" +
            ",link" +
            ",fore-color" +
            ",back-color" +
            ",resize" +
            ",draft" +
            ",undo" +
            ",indent" +
            ",outdent" +
            ",unordered-list" +
            ",ordered-list" +
            //",elementPath" +
            ",page-break" +
            ",preview" +
            ",maximize" +
            ",remove-format" +
            ",heading" +
            ",justify-left" +
            ",justify-center" +
            ",justify-right" +
            ",table" +
            ",smiley" +
            ",flash" +
            //",xiami-music" +
            ",multiple-upload" +
            //",video" +
            ",drag-upload").split(",");

        var fullPlugins = [];

        S.each(plugins, function(p, i) {
            fullPlugins[i] = "editor/plugin/" + p + "/";
        });

        var pluginConfig = {
            link: {
                target: "_blank"
            },
            "image": {
                defaultMargin: 0,
                // remote:false,
                upload: {
                    serverUrl: $m.parseHost(location.href)[0] + "/Product/ProductPublish/UploadProductDesPic",
                    serverParams: {
                        
                    },
                    suffix: "png,jpg,jpeg,gif",
                    fileInput: "Filedata",
                    sizeLimit: 1000 //k
                }
            },
            "flash": {
                "defaultWidth": "300",
                "defaultHeight": "300"
            },
            //            "templates": [
            //                {
            //                    demo: "模板1效果演示html",
            //                    html: "<div style='border:1px solid red'>模板1效果演示html</div><p></p>"
            //                },
            //                {
            //                    demo: "模板2效果演示html",
            //                    html: "<div style='border:1px solid red'>模板2效果演示html</div>"
            //                }
            //            ],
            "multiple-upload": {
                serverUrl: $m.parseHost(location.href)[0] + "/Product/ProductPublish/BatchUploadProductDesPic",
                serverParams: {
                    cookie: function() {
                        return document.cookie;
                    }
                },
                "previewWidth": "80px",
                sizeLimit: 1000, //k
                numberLimit: 5
                /*extraHtml: "<p style='margin-top:10px;'>" +
                "<input type='checkbox' " +
                "style='vertical-align:middle;margin:0 5px;' " +
                "id='ke_img_up_watermark_2'>" +
                "<span style='vertical-align:middle;'>图片加水印，防止别人盗用</span></p>"*/
            },
            "draft": {
                // 当前编辑器的历史是否要单独保存到一个键值而不是公用
                // saveKey:"xxx",
                interval: 5,
                limit: 10,
                "helpHtml": "<div " +
                    "style='width:200px;'>" +
                    "<div style='padding:5px;'>草稿箱能够自动保存您最新编辑的内容，" +
                    "如果发现内容丢失，" +
                    "请选择恢复编辑历史</div></div>"
            },
            "resize": {
                

                //direction:["y"]
            },

            "drag-upload": {
                suffix: "png,jpg,jpeg,gif",
                fileInput: "Filedata",
                sizeLimit: 1000,
                serverUrl: $m.parseHost(location.href)[0] + "/AnonymousProductPicUpload/BatchUploadProductDesPic",
                serverParams: {
                    
                }
            }
        };

        KISSY.use(fullPlugins, function(S) {
            var args = S.makeArray(arguments);

            args.shift();

            S.each(args, function(arg, i) {
                var argStr = plugins[i], cfg;
                if (cfg = pluginConfig[argStr]) {
                    args[i] = new arg(cfg);
                }
            });

            cfg.plugins = args;

            kissyEditor = new Editor(cfg);

        });
    });
});


// batch upload product pics
$(function () {
    var _uploadLimit = 5;
    var _batchFiles = [];
    var _batchUploadButtonId = "#batch_file_upload";
    var _uploadActionUrl = "http://" + location.href.substr(7).substring(0, location.href.substr(7).indexOf("/")) + "/Product/ProductPublish/UploadPic";
    var _swfUrl = "http://static.ymatou.com/scripts/lib/uploadify/uploadify.swf";

    function getFileIndex(file) {
        var fileIndex = 0;
        for (var i = 0; i < _batchFiles.length; i++) {
            if (_batchFiles[i] == file) {
                fileIndex = i + 1;
                break;
            }
        }
        return fileIndex;
    }

    $(_batchUploadButtonId).uploadify({
        'formData': {
            'timestamp': '',
            'token': sessionId
        },
        'swf': _swfUrl,
        'uploader': _uploadActionUrl,
        'fileSizeLimit': '5000KB',
        'onDialogClose': function (queueData) {
            if (queueData.filesSelected > _uploadLimit) {
                alert("最多只能上传" + _uploadLimit + "个文件");
                $(_batchUploadButtonId).uploadify('cancel', '*');
            }
        },
        'onDialogOpen': function () {
            _batchFiles = [];
        },
        'onUploadStart': function (file) {
            var index = _batchFiles.length + 1;
            //var imgcon = $('#uploadedPic' + index);
            //$('#progress' + index).html(file.name);
            _batchFiles[_batchFiles.length] = file.name;

            //if (imgcon.find('.loading').size() > 0) {
            //    imgcon.find('.loading').show();
            //} else {
            //    imgcon.append("<img src='http://static.ymatou.com/content/img/loading_16_16.gif' class='loading' />")
            //}
        },
        'onUploadProgress': function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
            var index = getFileIndex(file.name);
            if (index > 0) {
                //$('#uploadedPic' + index).html("上传中");
                //$('#progress' + index).html(file.name + ': ' + totalBytesUploaded + ' bytes uploaded of ' + totalBytesTotal + ' bytes.');
            }
            else {
                alert("progress error:" + file.name);
            }
        },
        'onUploadSuccess': function (file, data, response) {
            var index = getFileIndex(file.name);
            if (index > 0) {
                if (data == "error") {
                    alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                }
                else {
                    $('#ProductPictureUrl' + index).val(data);
                    $('.imgIndex' + index).attr('src', data);
                    $('.imgIndex' + index).show();
                }
                //$('#progress' + index).html('The file ' + file.name + ' was successfully uploaded with a response of ' + response + ':' + data);
            }
            else {
                alert("error:" + file.name);
            }
        },
        'onQueueComplete': function (queueData) {
            //alert(queueData.uploadsSuccessful + '个图片上传结束');
            _batchFiles = [];
        }
    });
});
