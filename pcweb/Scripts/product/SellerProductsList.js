/*=======================SellerProductsList.js===========================*/
$(function () {
    $('#sortType').change(function () {
        $('#formSort').val($(this).val());
        $('#subForm').submit();
    });
    $('#productTypeCheck').click(function () {
        if ($('#inputavi').attr('checked') == true) {
            $('#formProtected').val('1');
        }
        else {
            $('#formProtected').val('0');
        }
        if ($('#inputmall').attr('checked') == true) {
            $('#formMall').val('1');
        }
        else {
            $('#formMall').val('0');
        }
        if ($('#inputxhuo').attr('checked') == true) {
            $('#formSeller').val('1');
        }
        else {
            $('#formSeller').val('0');
        }
        $('#subForm').submit();
        return false;
    });
    $('#prei').click(function () {
        var currentPage = parseInt($('#formPage').val());
        if (currentPage > 1) {
            currentPage--;
            $('#formPage').val(currentPage);
            $('#subFormPage').submit();
        }
    });
    $('#nexti').click(function () {
        var currentPage = parseInt($('#formPage').val());
        var totalPage = parseInt($('#totalPage').val());
        if (currentPage < totalPage) {
            currentPage++;
            $('#formPage').val(currentPage);
            $('#subFormPage').submit();
        }
    });
});
