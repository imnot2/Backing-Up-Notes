/*=======================patterns.js===========================*/
/*-------------- IObserver.interface.js ----------------*/
/** 
* interface IObserver
* 
* @return 
*/
function IObserver() { }
IObserver.prototype.update = function (sender, msg) { };
/*-------------- ISubject.interface.js ----------------*/

/** 
* interface ISubject
* 
* @return 
*/
function ISubject() {
    this._ObserverList = [];
}
ISubject.prototype.addObserver = function (observer) {
    this._ObserverList.push(observer);
    return this;
};
ISubject.prototype.delObserver = function (observer) { };
ISubject.prototype.notify = function (observer, msg) {
    var msg = msg || {};
    for (i in this._ObserverList) {
        if (this._ObserverList[i].update) {
            this._ObserverList[i].update(this, msg);
        }
    }
    if (window.console && window.console.log) {
        console.log('notify at ' + new Date());
    }
};
/** 
* class BindCenter implements ISubject
* 
* @return 
*/
function BindCenter() {
    ISubject.call(this);
}
BindCenter.prototype = new ISubject();
/** 
* class BindAjaxForm implements IObserver
* 
* @return 
*/
function BindAjaxForm() {
    IObserver.call(this);
}
BindAjaxForm.prototype.update = function () {
    //some code
    //alert('yes,i do');
};
/*------------------------ main.js ----------------------*/
var bindCenter = new BindCenter();

// 注册观察者
bindCenter.addObserver(new BindAjaxForm);

// 通知所有观察者
bindCenter.notify();
