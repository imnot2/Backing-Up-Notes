define(function (require, exports, module) {
    function animate(c, options) {
        if (!(this instanceof a)) return new animate(c, $m.merge(config, options));
        createClass(options);
        fromTo(options)
    }
    var prefix = ['-webkit-', '-moz-', ''],
        id = 'ANIMATEGLOBALSTYLEID' + parseInt(Math.random() * 1e3),
        config = {
            effect: 'slide',
            scope: [0, 100],
            value: [0, 100],
            display: 'out',
            duration: 500
        };
    function setStyle() {
        var style = document.createElement('style');
        style.setAttribute('id', id);
        style.setAttribute('type', 'text/css');
        document.getElementsByTagName('head')[0].appendChild(style);
        style = null;
    }
    function getSheet() {
        var sheets = document.styleSheets;
        for (var i = 0, len = sheets.length; i < len; i++) {
            if (sheets[i].ownerNode.id == id) {
                return sheets[i];
            }
        }
    }
    function addRules(s) {
        var sheet = getSheet();
        sheet.insertRule(s, sheet.cssRules.length);
        //ie addRule(name,value,offset)
    }
    function keyFrames(name, value, prev) {
        addRules(prev + name + value);
    }
    function createClass(options) {
        parseOptions(options);
        var i = 0, len = prefix.length;
        for (i; i < len; i++) {
            keyFrames(name, value, "@" + prefix[i] + "keyframes ");
        }
    }


    function parseOptions(o) {
        switch (o.effect) {
            case 'slide':
                break;
            case 'fade':
                break;
            case 'rotate':
                break;
            case 'scale':
                break;
        }

    }

})