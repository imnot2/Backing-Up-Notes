/*=======================dmsproduct.js===========================*/
/** the third of release product**/
var channelMatou, channelJD;
channelMatou = model.setup('channelMatou', ['ProductId', 'ProductName', 'ProductDescript', 'PictureUrls', 'ValidStart', 'ValidEnd', 'Flight', 'Catalogs', 'DesProperties', 'CatalogStatus', 'CatalogType', 'AcceptReturn', 'DeliveryTemplateId', 'Weight']);
channelJD = model.setup('channelJD', ['ProductId', 'ProductName', 'ProductDescript', 'PictureUrls', 'ValidStart', 'ValidEnd', 'Flight', 'Catalogs', 'DesProperties', 'ShopCategoryIds', 'Length', 'Widht', 'Height', 'Weight', 'JingdongPrice', 'CostPrice', 'MarketPrice']);
channelMatou.create({
    ProductId: '',
    ProductName: '',
    ProductDescript: '',
    PictureUrls: '',
    ValidStart: '',
    ValidEnd: '',
    Flight: '',
    Catalogs: '',
    DesProperties: '',
    CatalogStatus: '',
    CatalogType: '',
    AcceptReturn: '',
    DeliveryTemplateId: '',
    Weight: ''
});
channelJD.create({
    ProductId: '',
    ProductName: '',
    ProductDescript: '',
    PictureUrls: '',
    ValidStart: '',
    ValidEnd: '',
    Flight: '',
    Catalogs: '',
    DesProperties: '',
    ShopCategoryIds: '',
    Length: '',
    Widht: '',
    Height: '',
    Weight: '',
    JingdongPrice: '',
    CostPrice: '',
    MarketPrice: ''
});


