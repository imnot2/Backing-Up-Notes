/*
* 导购模块
* create by：river
* create time: 2014-08-08
* 
*/
//$m.load([], function () {
+function () {
    var isUpdate = true;
    KISSY.use("editor/full", function (S, Editor) {

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
            width: '1000px',
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

        S.each(plugins, function (p, i) {
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
                    serverUrl: $m.parseHost(location.href)[0] + "/Article/UploadPic",
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
                serverUrl: $m.parseHost(location.href)[0] + "/Article/UploadPic",
                serverParams: {
                    cookie: function () {
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

        KISSY.use(fullPlugins, function (S) {
            var args = S.makeArray(arguments);

            args.shift();

            S.each(args, function (arg, i) {
                var argStr = plugins[i], cfg;
                if (cfg = pluginConfig[argStr]) {
                    args[i] = new arg(cfg);
                }
            });

            cfg.plugins = args;

            kissyEditor = new Editor(cfg);
            kissyEditor.docReady(function () {
                window.onbeforeunload = function () {
                    var nowCont = kissyEditor.get("data");
                    if (isUpdate && "" != nowCont) {
                        return "(您的内容已修改，是否确定离开？)";
                    }
                }
                //解决IE11下编辑不能100%高度的问题，
                //IE 去死吧，请让我吐槽一下，谢谢！
                $("[title=kissy-editor]")[0].contentWindow.document.childNodes[1].style.height = "100%";
                $("[title=kissy-editor]")[0].contentWindow.document.body.style.height = "100%";
            })
        });
    });
    //})
    //adu
    $('.submit-btn').click(function () {

        var categoryId = $('#categoryId').val();
        var title = $('#title').val();
        var content = kissyEditor.get("data");
        if (!categoryId) {
            alert("分类不能为空");
            return;
        }
        if (!title) {
            alert("标题不能为空");
            return;
        }
        if (!title) {
            alert("内容不能为空");
            return;
        }
        $.ajax({
            url: "/article/Api_Contribute",
            cache: false,
            type: 'POST',
            data: JSON.stringify({ categoryId: categoryId, title: title, content: content }),
            dataType: "json",
            success: function (data) {
                if (data.Status == "200") {
                    alert("投稿成功");
                    isUpdate = false;
                    window.location = "/";
                } else {
                    alert(data.Msg)
                }
            },
            error: function () {

            }
        });
    });
}();