/*=======================RayliConnect.js===========================*/
/// <reference path="../Ymt.js" />
$(function () {
    $("#ajaxload").ajaxStart(function () {

    }).ajaxStop(function () {

    });
    $('#buttonRedirectToLogin').live('click', function () {
        window.location.href = "/login?ret=" + window.location.href;
    });
    Ymt.load('widget.LayerBox', function () {
        if (rayli_uid) {
            if (parseInt(rayli_uid) > 0) {
                $.post('/connect/rayliconnect/setloginemail', $.toJSON({ 'UserName': rayli_username, 'UserId': rayli_uid, 'UserEmail': rayli_email }), function (data) {
                    if (data.success) {
                        ////                            window.location.reload();
                    } else {
                        var layer = Ymt.widget.LayerBox('struc', { isFrame: !1 });
                        layer.alert('#raylisetloginfailed');
                        $('#raylisetloginfailed .verifi').show();
                        $('#buttonraylisetloginfailed,#buttonraylisetloginfailed1').bind('click', function () {
                            layer.close();
                            $('#raylisetloginfailed .verifi').hide();
                        });
                        $('.shut').bind('click', function () {
                            layer.close();
                        });
                    }
                }, 'json');
            }
        }
        $('#buttonLoginRayli,#buttonLoginRayli1').click(function () {
            $.get('/connect/rayliconnect/loginajax', $.toJSON({ 'url': window.location.href }), function (content) {
                $('#defaultDialog').empty();
                $('#defaultDialog').html(content);
                var layer = Ymt.widget.LayerBox('struc', { isFrame: !1 });
                layer.alert('#ruiliLogin');
                $('#buttonSubmitRayliLogin').bind('click', function () {
                    layer.close();
                });
                $('.shut').bind('click', function () {
                    layer.close();
                });
            }, 'html');
        });

        $('#buttonSubmitRayliLogin').live('click', function () {
            //            layer.close();
            var form = $(this).closest('form');
            $.post(form.attr('action'), $.toJSON(form.serializeObject()), function (content) {
                $('#defaultDialog').empty();
                $('#defaultDialog').html(content);
                var layer = Ymt.widget.LayerBox('struc', { isFrame: !1 });
                layer.alert('#ruiliLogin');
                $('#buttonSubmitRayliLogin').bind('click', function () {
                    layer.close();
                });
                $('#buttonRayliLoginSuccessClose').bind('click', function () {
                    layer.close();
                    window.location.reload();
                });
                $('.shut').bind('click', function () {
                    layer.close();
                });
            }, 'html');
        });



    }, true);
});

