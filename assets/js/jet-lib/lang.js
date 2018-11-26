(function () {
    /*lang*********************************************************************************/
    

    var C=Jet.__base__;
    Jet.__base__._useList.push('lang');
    var _JT=C._JT;
    var _lang = C._lang, _name = "Jname", _jl_name = '';
    document.head._JT_append(_JT.ct("style")._JT_attr({
        "type":"text/css",
        "id":"__preload_jl"
    })._JT_html("[Jlang]{visibility:hidden}"));
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
            list = C._getJdomEle(obj)._JT_findAttr(_lang)
        }
        list._JT_each(function (item) {
            if (typeof item._jet_langs === 'undefined') {
                item._jet_langs = {};
                item._JT_findAttr(_name)._JT_each(function (_item) {
                    var attr = _item._JT_attr(_name);
                    item._jet_langs[attr] = _item._JT_html();
                });
                item._JT_html(item._jet_langs[Jet.lang.type]);
                if(C._canUse('valid'))Jet.valid.init(item);
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
                if(C._canUse())Jet.valid.init(item);
            });
            Jet.lang.jets._JT_each(function (item) {//绑定文字
                item.refresh('valid');
            });
        }
    }
    window.JL = function (opt) {
        return new Jet.lang(opt);
    }
})()