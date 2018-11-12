(function () {
    /*router*********************************************************************************/
    var _route = "Jrouter",
        _route_a = "jrouter-active",
        _routeout = "Jout",
        _routeScript = "JrouteScript",
        //_routeStyle="JrouteStyle",
        _globalStyle = "JglobalStyle",
        _scopeStyle = "JscopeStyle",
        _commonStyle = "JcommonStyle";

    function _initRouterConf(opt) {
        if ("history" in opt) {
            Jet.router.history = opt.history;
        }
        if ("base" in opt) {
            Jet.router.base = (opt.history) ? opt.base : opt.base + "/#";
            if ('trueBase' in opt) {
                if (opt.trueBase) {
                    Jet.router.trueBase = true;
                    for (var k in Jet.router.conf) {
                        Jet.router.conf[k] = opt.base + Jet.router.conf[k];
                    }
                }
            }
        } else {
            Jet.router.base = (opt.history) ? '' : "/#";
        }
        if (!opt.router['/404']) {
            opt.router['/404'] = '/404';
        }
        for (var k in opt.router) {
            if (opt.router[k] == '') opt.router[k] = k;
            _checkRouterName(k, opt.router[k]);
        }
    }
    function _checkRouterName(k, name) {
        if (typeof name != 'string') {
            var _s = ''
            if ('params' in name) {
                _s = '?';
                for (var _k in name.params) {
                    _s += (_k + '=' + name.params[_k] + '&')
                }
                _s = _s.substring(0, _s.length - 1);
            }
            _addIntoRouter(k, name.name, _s);
            var child = name.children;
            for (var _k in child) {
                _checkRouterName(k + _k, child[_k]);
            }
        } else {
            _addIntoRouter(k, name);
        }
    }
    function _addIntoRouter(k, name, _s) {
        if (!name._JT_has('.html')) {
            if (name._JT_has('?')) {
                name = name.replace('?', '.html?')
            } else {
                name += '.html';
            }
        }
        if (_s != undefined) {
            name += _s;
        }
        Jet.router.router[Jet.router.base + k] = name;
    }
    Jet.router = {
        base: "",
        trueBase: false,
        history: false,
        path: "/",
        lastTrueHash: "",
        params: null,
        router: {},
        use: function (opt) {
            _initRouterConf(opt);
            if ('index' in opt) {
                Jet.router.index = opt.index;
            } else {
                Jet.router.index = '/index';
            }
            var url = Jet.router.index;
            if (!location.pathname._JT_has("index.html")) {
                if (Jet.router.history) {//pathname+search
                    if (location.pathname.length - Jet.router.base.length > 1) {
                        url = location.pathname.substring(Jet.router.base.length) + location.search + location.hash;
                    }
                } else {//# 使用 hash
                    if (location.hash.length > 2) {
                        url = location.pathname + location.hash;
                        url = url.substring(Jet.router.base.length) + location.search;
                    }
                }
            }
            Jet.router.out = _JT.attr(_routeout);
            Jet.router.init();
            if (opt.oninit && typeof opt.oninit == 'function') { opt.oninit(); }
            Jet.router.__isFresh = true;
            Jet.router.route(url);
        },
        conf: {
            html: "/src/html",
            js: "/src/js",
            css: "/src/css",
            image: "/src/image",
            media: "/src/media"
        },
        init: function (obj) {
            var list;
            if (obj == undefined) {
                list = _JT.attr(_route);
            } else {
                list = obj._JT_findAttr(_route)
            }
            list._JT_each(function (item) {
                item._JT_clk(function () {
                    Jet.router.route(this._JT_attr(_route));
                });
            });
        },
        __xhr: null,
        __onroute: [],
        onroute: function (f, jet) {
            if (typeof f == 'function') {
                f._jet = jet;
                Jet.router.__onroute.push(f);
            } else {
                _throw('onroute:参数必须是函数');
            }
        },
        __onrouted: [],
        onrouted: function (f, jet) {
            if (typeof f == 'function') {
                f._jet = jet;
                Jet.router.__onrouted.push(f);
            } else {
                _throw('onroute:参数必须是函数');
            }
        },
        back: function () { window.history.back() },
        forward: function () { window.history.forward() },
        clearScoped: function () {
            _JT.cls(_scopeStyle)._JT_remove();
        },
        activeRouter: function (item) {
            item = item || _JT.attr(_route + '="' + Jet.router.url + '"');
            if (item._JT_exist()) {
                _JT.attr(_route_a)._JT_removeAttr(_route_a);
                item._JT_attr(_route_a, '');
                Jet.router.active = item;
            }
        },
        route: function (url, push, call) {
            if (url._JT_has('http://') || url._JT_has('https://')) {
                if (push === true) {
                    Jet.$.open(url);
                } else {
                    Jet.$.jump(url);
                }
            } else {
                var isFresh = Jet.router.__isFresh;
                if (isFresh) { Jet.router.__isFresh = false; }
                _callRouterLife('__onroute', isFresh)
                if (Jet.router.__xhr !== null) {
                    Jet.router.__xhr.abort();
                    console.warn('忽略了一个路由：' + Jet.router.path);
                    Jet.router.__xhr = null;
                }
                var _fRes = _formatUrl(url);
                var search = _fRes.search;
                url = _fRes.url;
                var item = _JT.attr(_route + '="' + url + '"');
                Jet.router.activeRouter(item);
                url = _checkUrl(url);
                var _r = false;
                if (!(url in Jet.router.router)) {
                    url = Jet.router.base + "/404";
                    _r = true;
                }
                var file = Jet.router.router[url];
                if (file != undefined) {
                    if (file._JT_has('?')) {
                        if (search == '') {
                            search = file.substring(file.indexOf("?") + 1);
                        } else {
                            var _s = file.substring(file.indexOf("?") + 1).split('&');
                            var _search = search.split('&');
                            _s.forEach(function (item) {
                                if (_search.indexOf(item) == -1) {
                                    search += ('&' + item);
                                }
                            });
                        }
                        file = file.substring(0, file.indexOf("?"));
                        _r = true;
                    }
                    if (search != '') {
                        search = '?' + search;
                    }
                    Jet.router.path = url;
                    Jet.router.url = url.substring(Jet.router.base.length);
                    var stateObject = {};
                    var title = url;
                    var newUrl = url + search + Jet.router.hash;
                    if (typeof push === 'function') {
                        call = push;
                        push = undefined;
                    }
                    if (push == undefined) {
                        history.pushState(stateObject, title, newUrl);
                    }
                    if (_r) {
                        history.replaceState(stateObject, title, newUrl);
                    }
                    Jet.router.params = _JT.urlParam();
                    Jet.router.lastTrueHash = location.hash;
                    if (typeof JUI !== 'undefined') {
                        JUI.dialog.removeAll()
                    }
                    Jet.router.clearScoped();
                    Jet.router.__xhr = _JT.load(Jet.res.getSrc(file, 'html'), function (html) {
                        Jet.router.__xhr = null;
                        var out = Jet.router.out._JT_html(html);
                        if ('undefined' != typeof JUI) {
                            JUI._jui_mounted = [];
                        }
                        _loadStyle(out);
                        _loadScript(out);
                        _loadCompRes(out);
                        Jet.valid.init(out);
                        Jet.lang.init(out);
                        Jet.router.init(out);
                        if ('undefined' != typeof JUI) {
                            JUI.init(out);
                        }
                        Jet.load.init(out);
                        if (call) { call() }
                        _callRouterLife('__onrouted', isFresh)
                    });
                }
            }
        }
    };
    function _formatUrl(url) {
        var search = '';
        if (url.indexOf('#') != -1) {
            var index = url.indexOf('?');
            var _index = url.indexOf('#');
            if (index != -1) {
                if (index > _index) {
                    Jet.router.hash = url.substring(_index, index);
                    search = url.substring(index + 1);
                    url = url.substring(0, _index);
                    index = _index;
                } else {
                    Jet.router.hash = url.substring(_index);
                    search = url.substring(index + 1, _index);
                    url = url.substring(0, index);
                }
            } else {
                Jet.router.hash = url.substring(_index);
                index = _index;
                url = url.substring(0, _index);
            }
        } else {
            if (url._JT_has('?')) {
                search = url.substring(url.indexOf("?") + 1);
                url = url.substring(0, url.indexOf("?"));
            }
            Jet.router.hash = '';
        }
        if (url[url.length - 1] == '/' && url.length > 1) url = url.substring(0, url.length - 1);
        return {
            url: url, search: search
        }
    }
    function _callRouterLife(calls, isFresh) {
        Jet.router[calls].forEach(function (item) {
            if (item._jet) {
                item.call(item._jet, isFresh, Jet.router)
            } else {
                item.call(Jet.router, isFresh)
            }
        });
    }
    window.onhashchange = function () {
        if (Jet.router.lastTrueHash != location.hash) {
            window.onpopstate();
        }
    }
    window.onpopstate = function (event) {
        if (Jet.router.history) {
            Jet.router.route(location.pathname.substring(Jet.router.base.length) + location.search + location.hash, false);
        } else {//#
            Jet.router.route(location.hash.substring(1), false);
        }
    };
    function _checkUrl(url) {
        if (url[url.length - 1] == '/' && url != '/') {
            url = url.substring(0, url.length - 1);
        }
        if (url == Jet.router.base) {
            url = Jet.router.base + Jet.router.index;
        } else {
            if (url[0] != "/") {//相对路径
                url = Jet.router.path + '/' + url
            } else {//绝对路径
                url = Jet.router.base + url;
            }

        }
        return url;
    }
    var _jetReg = new RegExp("new Jet\\([ |\r\n]*\\)", "i");
    function _loadScript(out) {//加载路由模块
        if (_JT.id(_routeScript)._JT_exist()) {
            _JT.id(_routeScript)._JT_remove();
        }
        var script = _JT.ct('script')._JT_attr({
            'id': _routeScript,
            'type': 'text/javascript'
        });
        var txt = ['//# sourceURL=__dynamic.js\r\n'];
        var scripts = out._JT_findTag("script")._JT_toArray(false);
        var id;
        if (scripts.length > 0) {
            id = __router_comp
            out._JT_attr(__comp_id, id);
        }
        var index = -1;
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i]._JT_hasAttr("src")) {
                index = i;
                break;
            }
        }
        var dealParJet = function (js) {
            if (js.match(_jetReg) !== null) {
                return js.replace(_jetReg, 'new Jet("' + __jet_root + '","' + id + '",{})');
            }
            return js.replace('new Jet(', 'new Jet("' + __jet_root + '","' + id + '",');
        };
        scripts._JT_each(function (item, i) {
            if (item._JT_hasAttr("src")) {
                _JT.load(Jet.res.getSrc(item._JT_attr("src"), 'js'), function (src) {
                    txt[i + 1] = dealParJet(src);
                    if (i == index) {
                        script._JT_html(txt.join(''));
                        _JT.body()._JT_append(script);
                    }
                });
            } else {
                txt[i + 1] = dealParJet(item._JT_html());
            }
            item._JT_remove();
        });
        if (index == -1) {
            script._JT_html(txt.join(';'));
            _JT.body()._JT_append(script);
        }
    }

    function _loadStyle(out) {
        if ('undefined' === typeof jet_css_conf) {
            _reloadCssConf(function () {
                _loadStyleCall(out, Jet.router.path);
            });
        } else {
            window.__css_conf_xhr = undefined;
            _loadStyleCall(out, Jet.router.path);
        }
    }
    function _isUd(a) {
        return (typeof a === 'undefined')
    }
    function _addScopeCss(attr) {
        var s = _JT.ct('style')._JT_attr({
            'class': _scopeStyle,
            'type': 'text/css',
            'scope-src': attr
        });
        return s;
    }
    function _loadStyleCall(out, attr) {
        var gStyle = _JT.id(_globalStyle);
        var scopeCss = _addScopeCss(attr);
        var txt = [];
        var scopeTxt = [];
        var styles = out._JT_findTag("style")._JT_toArray(false);
        var cssTotal = styles.length;
        var cssCount = 0;
        styles._JT_each(function (item, i) {
            var isScope = (item._JT_attr('scoped') !== 'false');
            if (isScope || (!isScope && gStyle._styles.indexOf(attr) === -1)) {
                if (!isScope) gStyle._styles.push(attr);
                if (item._JT_hasAttr("src")) {
                    _JT.load(Jet.res.getSrc(item._JT_attr("src"), 'css'), function (css) {
                        if (isScope) {
                            scopeTxt[i] = _replaceCssVar(css);
                        } else {
                            //if(!cssExist)
                            txt[i] = _replaceCssVar(css);
                        }
                        cssCount++;
                        _checkLoadStyles(cssCount, cssTotal, gStyle, scopeCss, txt, scopeTxt)
                        item._JT_remove();
                    });
                } else {
                    if (isScope) {
                        scopeTxt[i] = _replaceCssVar(item._JT_html());
                    } else {
                        //if(!cssExist)
                        txt[i] = _replaceCssVar(item._JT_html());
                    }
                    cssCount++;
                    _checkLoadStyles(cssCount, cssTotal, gStyle, scopeCss, txt, scopeTxt)
                    item._JT_remove();
                }
            } else {
                cssCount++;
                item._JT_remove();
            }
        });
        _loadCommonCss();
    }
    function _checkLoadStyles(cssCount, cssTotal, gStyle, scopeCss, txt, scopeTxt, cssExist) {
        if (cssCount == cssTotal) {
            //if(!cssExist){
            if (txt.length > 0) {
                gStyle._JT_html(gStyle.innerHTML + txt.join(''));
            }
            //}
            if (scopeTxt.length > 0) {
                scopeCss._JT_html(scopeTxt.join(''))
                _JT.tag('head').append(scopeCss);
            }
        }
    }
    //
    function _loadCommonCss() {
        var commonCss = [];
        var _r = Jet.router.path.substring(Jet.router.base.length);
        var length = 0, arr = [];
        jet_css_conf.common.forEach(function (json) {
            if (json.router.indexOf(_r) != -1) {
                var _c = json.css.trim();
                if (_c.substring(_c.length - 4) == '.css') {//css文件
                    var _a = _c.split(',');
                    arr.push(_a);
                    length += _a.length;
                } else {
                    arr.push(json.css);
                    length++;
                }
            }
        });
        arr.forEach(function (item) {
            if (typeof item == 'string') {
                length--;
                commonCss.push(item);
                _loadCommonCssCall(commonCss, length);
            } else {
                item.forEach(function (_item) {
                    _JT.load(Jet.res.getSrc(_item, 'css'), function (css) {
                        length--;
                        commonCss.push(css);
                        _loadCommonCssCall(commonCss, length);
                    });
                });
            }
        });
    }
    function _loadCommonCssCall(commonCss, length) {
        if (length == 0) {
            if (commonCss.length > 0) {
                if (_JT.id(_commonStyle)._JT_exist()) {
                    if (commonCss.join('') != _JT.id(_commonStyle).innerHTML) {
                        _JT.id(_commonStyle)._JT_html(commonCss.join(''))
                    }
                    // }else if(_JT.id(_routeStyle)._JT_exist()){
                    //   document.head.insertBefore(_JT.ct('style')._JT_attr('id',_commonStyle)._JT_html(commonCss.join('')),_JT.id(_routeStyle));
                } else {
                    document.head.appendChild(_JT.ct('style')._JT_attr('id', _commonStyle)._JT_html(commonCss.join('')));
                }
            } else {
                _JT.id(_commonStyle)._JT_exist(function (item) {
                    item._JT_empty();
                });
            }
        }
    }
    function _reloadCssConf(call) {
        if (window.__css_conf_xhr) window.__css_conf_xhr.abort();
        window.__css_conf_xhr = _JT.load(Jet.router.conf.css + '/css.conf', function (res) {
            eval('window.jet_css_conf=' + res);
            window.__css_conf_xhr = undefined;
            _JT.load(Jet.router.conf.css + '/common.css', function (res2) {
                window.__preload_css(res2, function (d) {
                    var comStyle = document.createElement('style');
                    comStyle.innerHTML = d.replace(/[\r\n]/g, "");//去掉回车换行;
                    document.head.insertBefore(comStyle, _JT.id('commonCss'));
                    document.head.removeChild(_JT.id('commonCss'));
                    window.__preload_css = undefined;
                    call();
                })
            });
        });
    }
    function _replaceCssVar(t) {
        var m = t.match(new RegExp("(\\(\\()((.|\\n)*?)(\\)\\))", "g"));
        if (m !== null) {
            var vars = [];
            m.forEach(function (item) {
                var _i = item.indexOf('[');
                if (_i != -1) {//css 函数
                    var arr = eval(item.match(_numReg)[0]);
                    var _v = item.substring(2, _i).trim();
                    var _var = jet_css_conf.variable[_v];
                    var _varMatch = _var.match(_reg);
                    if (_varMatch !== null) {
                        arr.forEach(function (_arr, i) {
                            _var = _var.replace(new RegExp("(({{" + (i + 1) + "\\|)((.|\\n)*?)(}}))|(\\{\\{" + (i + 1) + "\\}\\})", "g"), _arr);
                        });
                        _var = _var.replace(new RegExp("{{[0-9]*\\|", "g"), '').replace(new RegExp('}}', 'g'), '');
                    }
                    vars.push(item);
                    t = t.replace(item, _var);
                } else {
                    var pure = item.replace(/\s/g, "");
                    if (vars.indexOf(item) == -1) {
                        vars.push(item);
                        t = t.replace(new RegExp('\\(\\(' + item.substring(2, item.length - 2) + "\\)\\)", "g"), jet_css_conf.variable[pure.substring(2, pure.length - 2)])
                    }
                }
            });
        }
        return t.replace(/[\r\n]/g, "");
    }
    //_JT.ready(function(){
    //Jet.router.reload();
    //});
})()