(function () {
    /*router*********************************************************************************/
    var _route = "Jrouter",
        _route_a = "jrouter-active",
        _routeout = "Jout",
        _routeScript = "JrouteScript",
        //_routeStyle="JrouteStyle",
        //_globalStyle = "JglobalStyle",
        _jetReg = new RegExp("new Jet\\([ |\r\n]*\\)", "i"),
        _jetReg2 = new RegExp("JET\\([ |\r\n]*\\)", "i"),
        _dynamic_name = 'F';//为了保证上一个组件unmounted之后还可以进入端点
    var C = Jet.__base__;
    Jet.__base__._useList.push('router');
    var _JT = C._JT, __ROOT = C.__ROOT;

    function _initRoot() {
        _JT.id(__ROOT)._JT_exist(function (root) {
            root._JT_attr(C._jload, 'root.html')
                ._JT_attr(C._jpath, 'false');
            C._initSingleLoad('root', root, 0, [root], function () {
                root._JT_removeAttr(C.__comp_id)
            })
        })
            // _JT.id(__ROOT)._JT_exist(function (root) {
            //     root._JT_attr(C._jload, Jet.router.conf.base + '/root.html').attr(C._jpath, 'false'); Jet.load.init.call('root', function () {
            //         root._JT_removeAttr([C._jpath, C._jload, C.__comp_id].join(' '))
            //     });
            // })
    }
    function _initRouterConf(opt) {
        if ("history" in opt) {
            Jet.router.history = opt.history;
        }
        if ("base" in opt) {
            Jet.router.setBase(opt.base, opt.trueBase)
        }
        if (!opt.history) {
            Jet.router.base += '/#'
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
        if (k === Jet.router.index) {
            Jet.router.indexMap = name;
        }
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
        Jet.router.map[Jet.router.base + k] = name;
    }
    Jet.router = {
        base: "",
        trueBase: false,
        history: false,
        path: "/",
        lastTrueHash: "",
        params: null,
        map: {},
        _initRouterOut: function () {
            if (!Jet.router.out || !Jet.router.out._JT_exist())
                Jet.router.out = _JT.attr(_routeout);
            return Jet.router.out;
        },
        use: function (opt) {
            if ('index' in opt) {
                Jet.router.index = opt.index;
            } else {
                Jet.router.index = '/index';
            }
            _initRouterConf(opt);
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
            Jet.router._initRouterOut();
            Jet.router.init();
            Jet.router.__await = function () {
                if (opt.oninit && typeof opt.oninit == 'function') { opt.oninit(); }
                Jet.router.__isFresh = true;
                Jet.router.route(url);
                delete Jet.router.__await;
            }
            if (Jet.router.__hasInitJet) {
                Jet.router.__await();
                delete Jet.router.__hasInitJet;
            }
            _initRoot();
        },
        conf: {
            html: "/src/html",
            js: "/src/js",
            css: "/src/css",
            image: "/src/image",
            media: "/src/media",
            base: "/src",
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
        setBase: function (base, isTrueBase) {
            Jet.router.base = base;
            if (isTrueBase === true) {
                Jet.router.trueBase = true;
                for (var k in Jet.router.conf) {
                    Jet.router.conf[k] = base + Jet.router.conf[k];
                }
            }
        },
        __xhr: null,
        __onroute: [],
        onroute: function (f, jet) {
            if (typeof f == 'function') {
                f._jet = jet;
                f._name = jet._tools.name;
                Jet.router.__onroute.push(f);
            } else {
                _throw('onroute:参数必须是函数');
            }
        },
        __onrouted: [],
        onrouted: function (f, jet) {
            if (typeof f == 'function') {
                f._jet = jet;
                f._name = jet._tools.name;
                Jet.router.__onrouted.push(f);
            } else {
                _throw('onroute:参数必须是函数');
            }
        },
        back: function () { window.history.back() },
        forward: function () { window.history.forward() },
        clearScoped: function () {
            _JT.cls(C._scopeStyle)._JT_remove();
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
                    C._info('忽略了一个路由：' + Jet.router.path + '；可能是由于点击过快');
                    Jet.router.__xhr = null;
                }
                var _fRes = _formatUrl(url);
                var search = _fRes.search;
                url = _fRes.url;
                var item = _JT.attr(_route + '="' + url + '"');
                Jet.router.activeRouter(item);
                url = _checkUrl(url);
                var _r = false;
                if (!(url in Jet.router.map)) {
                    url = Jet.router.base + "/404";
                    _r = true;
                }
                var file = Jet.router.map[url];
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
                    Jet.router.__xhr = _JT.load(C._getSrc(file, 'html'), function (html) {
                        Jet.router.__xhr = null;
                        var out = Jet.router._initRouterOut()._JT_html(html);
                        Jet.router.clearScoped();
                        if ('undefined' != typeof JUI) {
                            JUI._jui_mounted = [];
                        }
                        _loadStyle(out);
                        _loadScript(out);
                        C._loadCompRes(out);
                        C._initValidAndLang(out);
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
    Jet.prototype.$route = function (s, isOpen) {
        Jet.router.route(s, isOpen);
    };
    Jet.prototype.$route.back = function (s) {
        Jet.router.back();
    };
    Jet.prototype.$route.forward = function (s) {
        Jet.router.forward();
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
        if (!isFresh) {
            _callUnmountLife(calls)
        }
        Jet.router[calls].forEach(function (item) {
            if (item._jet) {
                item.call(item._jet, isFresh, Jet.router)
            } else {
                item.call(Jet.router, isFresh)
            }
        });
    }
    function _callUnmountLife(calls) {
        var _ra;
        if (calls == '__onroute') {
            _ra = Jet._unnamedJets[C.__router_comp];
            if (!_ra)
                return;
            Jet.router.__last_router_comp = _ra;
            _exeFunc(_ra._tools._beforeunmount)
            _exeBeforeUnmount(_ra.$child);
            Jet.router.__last_router_comp = _ra;
        } else if (calls == '__onrouted') {
            _ra = Jet.router.__last_router_comp;
            if (!_ra)
                return;
            _removeFromJets(_ra)
            _exeUnmounted(_ra.$child);
        }
    }
    function _exeBeforeUnmount(child) {
        if (!child)
            return;
        for (var k in child) {
            _exeFunc(child[k]._tools._beforeunmount)
            _exeBeforeUnmount(child[k].$child);
        }
    }
    function _exeFunc(func) {
        if (func) func();
    }
    function _exeUnmounted(child) {
        if (!child)
            return;
        for (var k in child) {
            _removeFromJets(child[k])
            _exeUnmounted(child[k].$child);
        }
    }
    function _removeFromJets(item) {
        var name = item._tools.name;
        _exeFunc(item._tools._onunmounted);
        _clearRouteFunc('__onroute', name);
        _clearRouteFunc('__onrouted', name);
        if (Jet.comp[name] && Jet.comp[name].$DOM) {
            delete Jet.comp[name];
        } else if (Jet._unnamedJets[name]) {
            delete Jet._unnamedJets[name];
        }
    }
    function _clearRouteFunc(call, name) {
        var res = Jet.router[call].filter(function (item) {
            return item._name === name;
        })
        if (res.length > 0) {
            res.forEach(function (item) {
                Jet.router[call]._JT_remove(item);
            })
        }
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
    function _loadScript(out) {//加载路由模块
        if (_JT.id(_routeScript)._JT_exist()) {
            _JT.id(_routeScript)._JT_remove();
        }
        var script = _JT.ct('script')._JT_attr({
            'id': _routeScript,
            'type': 'text/javascript'
        });
        _dynamic_name = (_dynamic_name == 'T') ? 'F' : 'T';
        var txt = ['//# sourceURL=__router_comp_' + _dynamic_name + '.js\r\n'];
        var scripts = out._JT_findTag("script")._JT_toArray(false);
        var id;
        if (scripts.length > 0) {
            id = C.__router_comp;
            out._JT_attr(C.__comp_id, id);
        }
        var index = -1;
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i]._JT_hasAttr("src")) {
                index = i;
                break;
            }
        }
        var dealParJet = function (js) {
            var concat='"' + C.__jet_root + '","' + id + '",'
            if (js.match(_jetReg) !== null) {
                return js.replace(_jetReg, 'new Jet(' + concat+'{})');
            }
            if (js.match(_jetReg2) !== null) {
                return js.replace(_jetReg2, 'JET(' + concat+'{})');
            }
            return js.replace('new Jet(', 'new Jet('+concat).replace('JET(', 'JET('+concat);
        };
        scripts._JT_each(function (item, i) {
            if (item._JT_hasAttr("src")) {
                _JT.load(C._getSrc(item._JT_attr("src"), 'js'), function (src) {
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
        if (!C._isUd(Jet.__css_conf) && C._isUd(Jet.__css_conf.conf)) {
            Jet.__css_conf._reloadCssConf(function () {
                C._loadStyleCall(out, Jet.router.path);
            });
        } else {
            if (!C._isUd(Jet.__css_conf))
                Jet.__css_conf.xhr = undefined
            C._loadStyleCall(out, Jet.router.path);
        }
    }


})()