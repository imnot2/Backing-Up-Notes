//template
$m.create('template', {
    separate: function (s) {
        var that = this,
            ret = s.replace(/([\r\n\t])|(\s+([='"])\s+)|(&amp;|&gt;|&lt;)|(>\s+<)/g, function (a, b, c, d, e, f) {
                return b ? '' : c ? d : e && e == '&amp;' ? '&' : e && e == '&lt;' ? '<' : e && e == '&gt;' ? '>' : f ? '><' : '';
            })
            .replace(/(\{\{(\/)?(if|else|for|while)([^\{\}]*)*?\}\})|(')|(\$\{([^\{\}]*?)\})/g, function (all, logic, close, key, val, quote, phrase, phraseVal) {
                return logic ? '{|}' + (close ? '-' : '+') + key + (val ? ' ' + val.charAt(0) == ' ' ? val.slice(1) : val : '') + '{|}' :
                    quote ? '\\\'' :
                    phrase ? '\'+(' + phraseVal.replace(/\\'/g, '\'') + ')+\'' : '';
            });
        //console.log(ret);
        return ret;
    },
    parsing: function (s) {
        var stmp, atmp, sfl, alist = s.split(/\{\|\}/),
            astm = ['var aRet = [];'],
            r = /\s/,
            key = {},
            sindex = 0,
            eindex = 0;
        //console.log(alist);
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
            //console.log(atmp);
            switch (atmp[0]) {
            case '+while':
            case '+if':
                astm.push(atmp[0].slice(1) + '(' + atmp.slice(1).join(' ') + '){');
                break;
            case '+else':
                astm.push('else{');
                break;
            case '-while':
            case '-if':
            case '-else':
                astm.push('}');
                break;
            case '+for':
                ++sindex;
                key['for'] = key['for'] || [];
                key['for'].push(atmp[2]);
                if (sindex == 1) {
                    astm.push('(function(' + atmp[2] + ')');
                }
                else {
                    astm.push('(function()');
                }
                astm.push('{var ___i___;for(___i___ in ' + atmp[2] + '){if(' + atmp[2] + '[___i___]){' + atmp[1] + '=___i___;');
                break;
            case '-for':
                //astm.push('}}})(' + key['for'][sindex - eindex - 1] + ');');
                ++eindex;
                if (sindex == eindex) {
                    astm.push('}}})(' + key['for'][0] + ');');
                    sindex = eindex = 0, key['for'] = [];
                }
                else {
                    astm.push('}}})();');
                }
                break;
            default:
                break;
            }
        }
        astm.push('return aRet.join("");');
        //console.log(['data', astm.join('')])
        return ['data', astm.join('')]
    }
}, {
    init: function (config) {
        var cst = this.constructor,
            c, s = config.html,
            div;

        function parse(s, data) {
            var html = cst.parsing(cst.separate(s));
            //console.log(new Function(html[0], html[1]))
            return (new Function(html[0], html[1]))(data);
        }
        if (config.container) {
            c = typeof config.container == "string" ? $(config.container) : config.container;
            s = s || c.html();
            this.html = parse(s, config.data);
            //console.log(this.html)
            if (config.add) {
                c.append(this.html);
            }
            else {
                c.html(this.html)
            }
            div = null;
            return;
        }
        this.html = parse(s, config.data);
    }
});