//template
$m.create('template', {
    dataName: 'temp-data',
    separate: function (s) {
        var that = this, ret = s.replace(/([\r\n\t])|(\s+([='"])\s+)|(&amp;|&gt;|&lt;)|(>\s+<)/g, function (a, b, c, d, e, f) {
            return b ? '' : c ? d : e && e == '&amp;' ? '&' : e && e == '&lt;' ? '<' : e && e == '&gt;' ? '>' : f ? '><' : '';
        })
        .replace(/(<(\/)?(if|else|for|while|elseif)(?:\s+e=['"]*([^\'\"]*)['"]*)*>)|(')|(\$\{([^\}]*?)\})|(<[\w-]+\s+.*?(?:temp-data=['"]*([\w-]+)['"]*){1}.*?>)/g, function (a, b, c, d, e, f, g, h, i, j) {
            return b ? '{|}' + (c ? '-' : '+') + d + (e ? " " + e : "") + '{|}' :
                    f ? '\\\'' :
                    g ? '\'+(' + h.replace(/\\'/g, '\'') + ')+\'' :
                    i ? i + '{|}+' + that.dataName + ' ' + j + '{|}' : '';
        });
        return ret;
    },
    parsing: function (s) {
        var stmp, atmp, vname, sfl, alist = s.split(/\{\|\}/), astm = ['var aRet = [];'], r = /\s/, key = {}, sindex = 0, eindex = 0;
        while (alist.length) {
            if (!(stmp = alist.shift())) {
                continue;
            }
            sfl = stmp.charAt(0);
            if (sfl !== '+' && sfl !== '-') {
                stmp = '\'' + stmp + '\'';
                astm.push('aRet.push(' + stmp + ');');
                continue;
            }
            atmp = stmp.split(r);
            switch (atmp[0]) {
                case '+' + this.dataName:
                    vname = atmp[1];
                    break;
                case '+while':
                case '+if':
                    astm.push(atmp[0].slice(1) + '(' + atmp.slice(1).join(' ') + '){');
                    break;
                case '+elseif':
                    astm.push('else if(' + atmp.slice(1).join(' ') + '){');
                    break;
                case '+else':
                    astm.push('else{');
                    break;
                case '-while':
                case '-if':
                case '-else':
                case '-elseif':
                    astm.push('}');
                    break;
                case '+for':
                    ++sindex;
                    key['for'] = key['for'] || [];
                    key['for'].push(atmp[3]);
                    astm.push('if(' + atmp[3] + '&&' + atmp[3] + '.constructor === Array){(function(a){var l=a.length,' + atmp[1] + 'Index,i;for(i=l;i--;){' + atmp[1] + 'Index=(l-i-1);var ' + atmp[1] + '=a[' + atmp[1] + 'Index];');
                    break;
                case '-for':
                    astm.push('}})(' + key['for'][sindex - eindex - 1] + ');}');
                    ++eindex;
                    sindex == eindex && (sindex = eindex = 0, key['for'] = []);
                    break;
                default:
                    break;
            }
        }
        astm.push('return aRet.join("");');
        return [vname, astm.join('')]
    }
}, {
    init: function (config) {
        var cst = this.constructor, c, s = config.html, div;
        function parse(s, data) {
            var html = cst.parsing(cst.separate(s));
            return (new Function(html[0], html[1]))(data);
        }
        if (config.container) {
            c = typeof config.container == "string" ? $m.node(config.container)[0] : config.container;
            s = s || c.innerHTML;
            this.html = parse(s, config.data);
            if (config.add) {
                $m.node.append(c, this.html);
            } else {
                c.innerHTML = this.html
            }
            div = null;
            return;
        }
        this.html = parse(s, config.data);
    }
});