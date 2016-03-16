/*=======================Enum.js===========================*/
var GetEnumTxt = function (o, v) {
    var val = "";
    for (var i = 0; i < o.length; i++) {
        if (o[i].pVal == v) {
            val = o[i].pName
            break;
        }
    }
    return val;
}
var cataEm = [
    { pName: "代买无现货", pVal: 0 },
    { pName: "国内现货", pVal: 1 },
    { pName: "美国现货", pVal: 2 }
];

var returnEm = [
    { pName: "有条件退货", pVal: 0 },
    { pName: "可以退货", pVal: 1 }
];
