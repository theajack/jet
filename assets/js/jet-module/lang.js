(function () {
    /*lang*********************************************************************************/
    var _lang = "Jlang", _name = "Jname";
    var _jl_name = '';
    Jet.lang = function (opt) {
        this.type = _lang;
        this.data = opt;
    }
    Jet.lang.list = [];
    Jet.lang.used = false;
    Jet.lang.use = function (list) {
        if (_JT.type(list) != 'array') {
            _throw('Jet.lang.init: 参数是一个数组');
        } else {
            this.used = true;
            this.list = list;
            _jl_name = list[0];
        }
        Jet.lang.init();
    };
    Jet.lang.jets = [];
    Jet.lang.init = function (obj) {
        var list;
        if (obj == undefined) {
            list = _JT.attr(_lang);
        } else {
            list = _getJdomEle(obj)._JT_findAttr(_lang)
        }
        list._JT_each(function (item) {
            if (typeof item._jet_langs === 'undefined') {
                item._jet_langs = {};
                item._JT_findAttr(_name)._JT_each(function (_item) {
                    var attr = _item._JT_attr(_name);
                    item._jet_langs[attr] = _item._JT_html();
                });
                item._JT_html(item._jet_langs[Jet.lang.type]);
                Jet.valid.init(item);
            }
        });
        Jet.$.id('__preload_jl')._JT_exist(function (item) {
            item._JT_remove();
        })
    };
    Object.defineProperty(Jet.lang, 'type', {
        configurable: true,
        enumerable: true,
        get: function () {
            return _jl_name;
        },
        set: function (val) {
            if (val !== _jl_name && Jet.lang.list.indexOf(val) !== -1) {
                _jl_name = val;
                _refreshLang();
            }
        }
    });
    function _refreshLang() {
        if (Jet.lang.used) {
            _JT.attr(_lang)._JT_each(function (item) {//静态文字
                item._JT_html(item._jet_langs[Jet.lang.type]);
                Jet.valid.init(item);
            });
            Jet.lang.jets._JT_each(function (item) {//绑定文字
                item.refresh();
            });
        }
    }
    function _checkLangJet(opt) {
        var t = _JT.type(opt._data)
        if ((t === 'json' && opt.name in opt._data) || (t === 'array' && typeof opt._data[opt.name] !== 'undefined')) {
            if (_checkIn(opt._data[opt.name], 'type', _lang)) {
                Jet.lang.jets.push(this);
            }
        }
    }
    window.JL = function (opt) {
        return new Jet.lang(opt);
    }
})()