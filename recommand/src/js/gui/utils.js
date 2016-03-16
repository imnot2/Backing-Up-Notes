gui.utils = {
    urlQuery: function(url) {
        var url = url || window.location.href;
        var seach = url.match(/\?.*/);
        var queryArr, queryObj = {};

        seach = seach ? seach[0].substring(1) : '';
        queryArr = seach.split('&');

        for (var i = 0, tempArr; i < queryArr.length; i++) {
            tempArr = queryArr[i].split('=');
            if (tempArr.length < 2) continue;
            queryObj[tempArr[0]] = tempArr[1];
        }
        return queryObj;
    },
    param: function(o) {
        var i, str = '';
        if (!isObject(o)) o = {};
        for (i in o) {
            str += '&' + i + '=' + encodeURIComponent(o[i]);
        }
        return str;
    },
    //创建遮罩
    creatMask: singleton(function() {
        var temp = document.createElement('div');

        temp.innerHTML = '<div class="floatbox"><div class="floatbox-content"></div></div>';
        return document.body.appendChild(temp.firstChild);
    }),
    showDialog: function(html) {
        var mask, cont;
        if (!$.trim(html).length) return;
        mask = this.creatMask();
        mask.classList.add('show');
        cont = mask.querySelector('.floatbox-content');
        cont.innerHTML = html;
        cont.querySelector('.close').setAttribute('onclick', 'gui.utils.hideMask()');
    },
    //显示tip。
    showError: function(text) {
        var mask, cont;
        if (!$.trim(text).length) return;
        mask = this.creatMask();

        mask.classList.add('show');
        mask.setAttribute('onclick', 'gui.utils.hideMask()');
        cont = mask.querySelector('.floatbox-content');
        cont.innerHTML = '<div class="msg ui-msg">' + text + '</div>';
    },
    hideMask: function(node) {
        if (!node || !node.tagName) node = this.creatMask();
        node.classList.remove('show');
    },
    loadScript: function(url, callback) {
        var node = document.createElement('script');
        var timeID;
        var supportLoad = 'onload' in node;
        var onEvent = supportLoad ? 'onload' : 'onreadystatechange';
        var head = document.getElementsByTagName('head')[0];
        node[onEvent] = function onLoad() {
            if (!supportLoad && !timeID && /complete|loaded/.test(node.readyState)) {
                timeID = setTimeout(onLoad);
                return;
            }
            if (supportLoad || timeID) {
                clearTimeout(timeID);
                callback && callback();
            }
        };
        head.insertBefore(node, head.firstChild); //chrome下第二个参数不能为null
        node.src = url;
    },
    checkMobile: function(n) {
        return gui.MOBILEREG.test(n || '');
    },
    jsonp: function(url, callback) {
        var jsonpCallback = 'jsonp' + Math.floor(Math.random() * 1000000 * new Date().getTime()).toString(16);
        url = url.split('#')[0];
        if (!~url.indexOf('?')) {
            url += '?';
        }
        if (!~url.indexOf(/(\?|&)callback=/)) {
            url += '&callback=' + jsonpCallback;
        }
        win[jsonpCallback] = function(res) {
            callback && callback(res);
        };
        var jsonp = document.createElement('script');
        jsonp.src = url;
        document.body.appendChild(jsonp);
    }
};
