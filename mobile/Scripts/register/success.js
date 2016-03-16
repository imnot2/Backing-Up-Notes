define(function (require, exports, module) {
    window.setTimeout(redirecttopage,3000); 
    function redirecttopage()
    {
        if ($m.node('#BackUrl').val() != '' && $m.node('#BackUrl').val() != 'null') {
            location.href = $m.node('#BackUrl').val();
        }
        else {
            location.href = "/";
        }
    } 
});