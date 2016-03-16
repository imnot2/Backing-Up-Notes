/*=======================models.js===========================*/
/// <reference path="../Patterns/patterns.js" />
/// <reference path="../Lib/jquery.guid.js" />
function ModelError() {
}
function ModelStateDictionary() {
    this.ModelStates = new Array();
}

function DiscountItem() {
    this.Id = jQuery.Guid.New();
    this.ProductUrl = "";
    this.OfficalPrice = 0;
    this.ProductName = "";
    this.ProductPictureUrl = "";
}
function TopicWithDiscountNewData() {

    this.DiscountItems = new Array();
    this.TopicForum = "";
    this.TopicType = "";
    this.TopicTitle = "";
    this.TopicBody = "";
    this.Secret = 0;
    this.PicInfo = "";
    this.SellerUserId = 0;
    this.SellerLoginId = "";

}
function Model() {
    ISubject.call(this);
    this.ActualModel = new TopicWithDiscountNewData();
    this.AddDiscountItem = function (productName, officalPrice, productUrl, productPictureUrl) {
        var item = new DiscountItem();
        item.ProductName = productName;
        item.OfficalPrice = officalPrice;
        item.ProductUrl = productUrl;
        item.ProductPictureUrl = productPictureUrl;
        this.ActualModel.DiscountItems.push(item);
         this.notify();
    };
    this.RemoveDiscountItem = function (id) {
        this.ActualModel.DiscountItems = jQuery.grep(this.ActualModel.DiscountItems, function (value) {
            return value.Id != id;
        });
        this.notify();
    };
}
Model.prototype = new ISubject();

