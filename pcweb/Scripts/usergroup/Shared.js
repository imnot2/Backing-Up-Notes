/*=======================Shared.js===========================*/
jQuery(function () {
    j$('#buttonAddCharging').click(function () {

    });
});
//listuser
j$(function () {
    j$('#dropdownlistMoveToUserGroup').change(function () {
        var groupid = j$('#dropdownlistMoveToUserGroup').val();
        var form = j$('#formDoChangeUsersUserGroup');
        var userids = j$('#divUserInfoList').find('input[name="SelectedUserId"]:checked').map(function () { return this.value; }).get();
        var postdata = j$.toJSON({ 'groupid': groupid, 'selectedUserId': userids });
        j$.post(form.attr('action'), postdata, function (data) {
            if (data.success == '1') {
                alert('success');
                window.location.href = "/Admin/UserGroup/ListUser?t=" + Math.random();
            } else {
                alert(data.message);
            }
        }, 'json');
    });
});

//list usergroup
j$(function () {
    j$('#dropdownlistChangeToChargingId').change(function () {
        var chargingId = j$('#dropdownlistChangeToChargingId').val();
        var form = j$('#formDoChangeUserGroupsToCharging');
        var usergroupids = j$('#divUserGroupList').find('input[name="SelectedUserGroupId"]:checked').map(function () { return this.value; }).get();
        var postdata = j$.toJSON({ 'chargingId': chargingId, 'selectedUserGroupId': usergroupids });
        j$.post(form.attr('action'), postdata, function (data) {
            if (data.success == '1') {
                alert('success');
                window.location.href = "/Admin/UserGroup/Index?t=" + Math.random();
            } else {
                alert(data.message);
            }
        }, 'json');
    });
});
//search user
j$(function () {
    j$('#buttonSearchUser').click(function () {
        j$('form#formSearchUser').submit();
    });
});
