(function () {
    /*load*********************************************************************************/

    var _jload = "Jload";
    var _par = "Jpar";
    Jet.load = {
        __loadStore: {},
        init: function (obj, call) {
            var data = {};
            var list;
            var _this = this;
            if (obj == undefined || typeof obj == 'function') {
                list = _JT.attr(_jload)._JT_toArray(false);
                call = obj;
            } else {
                list = obj._JT_findAttr(_jload)._JT_toArray(false);
            }
            var n = list.length;
            if (n == 0) {//如果没有Jload 则立即执行
                if (call)
                    call();
                return;
            }
            list._JT_each(function (item, i) {
                var attr = item._JT_attr(_jload);
                item._JT_removeAttr(_jload);
                var src = Jet.res.getSrc(attr, 'html');
                if (Jet.load.__loadStore[src]) {
                    setTimeout(function () {
                        _dealLoadResult(Jet.load.__loadStore[src], item, _this, attr, i, list, call);
                    }, 0)//????
                } else {
                    _JT.load(src, function (html) {
                        Jet.load.__loadStore[src] = html;
                        _dealLoadResult(html, item, _this, attr, i, list, call);
                    });
                }
            });
        }
    }
    function _dealLoadResult(html, item, _this, attr, i, list, call) {
        var n = list.length;
        item._JT_html(html);
        var par = item._JT_attr(_par);
        if (par === null && _this.$DOM && _this._tools.name !== undefined) {
            par = _this._tools.name;
        }
        _loadCompStyle(item, attr);
        _loadCompScript(item, attr, par);
        _loadCompRes(item);
        Jet.valid.init(item);
        Jet.lang.init(item);
        Jet.router.init(item);
        if (item._JT_hasAttr('jonload')) {
            var onload = item._JT_attr('jonload')
            if (par !== null && Jet[par] !== undefined && Jet[par][onload] !== undefined && typeof Jet[par][onload] === 'function') {
                Jet[par][onload].call(Jet[par]);
            } else if (_this.$DOM && _this.$par && _this.$par[onload] !== undefined && typeof _this.$par[onload] === 'function') {
                _this.$par[onload].call(_this.$par);
            } else if (_this.$DOM && _this[onload] !== undefined && typeof _this[onload] === 'function') {
                _this[onload].call(_this);
            } else {
                if (par !== null) {
                    (new Function(onload)).call(Jet[par]);
                } else {
                    (new Function(onload)).call(_this);
                }
            }
        }
        if (i == n - 1 && call != undefined) {
            call(list);
        }
        if (typeof JUI != 'undefined') {
            JUI.init(item);
        }
        Jet.load.init.call(_this, item);//??是否需要递归回调
    }
    function _dealResFile(str, type) {
        var def = Jet.res.defFileName[type], file = str;
        if (def == undefined) {
            _throw('不支持的资源类型：' + type);
        }
        if (type == 'image' || type == 'media') {
            if (str.indexOf('.') == -1) {
                file = str + def;
            }
        } else {
            if (str.substring(str.lastIndexOf('.')) !== def) {
                file = str + def;
            }
        }
        return Jet.router.conf[type] + _dealSrc(file);
    }
    Jet.res = {
        defFileName: {
            image: '.jpg',
            media: '.mp3',
            css: '.css',
            js: '.js',
            html: '.html'
        },
        image: {},
        html: {},
        js: {},
        media: {},
        css: {},
        define: function (obj) {
            for (var k in obj) {
                for (var name in obj[k]) {
                    Jet.res[k][name] = _dealResFile(obj[k][name], k);
                }
            }
        }, getSrc: function (str, type) {
            if (str[0] == '@') {
                if (type == 'html' && str._JT_has('.html')) {//路由时传来的路径，可能会包含参数
                    var arr = str.split('.html');
                    return Jet.res[type][arr[0].substring(1)] + arr[1]
                }
                return Jet.res[type][str.substring(1)];
            }
            return _dealResFile(str, type);
        }
    }
    function _loadCompRes(item) {
        var ts = ['image', 'media', 'media'];
        ['img', 'audio', 'video'].forEach(function (tag, index) {
            item._JT_findTag(tag)._JT_each(function (img) {
                var attr = img._JT_attr("src");
                if (attr != null && attr[0] != '/') {//不是绝对路径
                    img._JT_attr("src", Jet.res.getSrc(attr, ts[index]));
                }
            });
        })
    }
    function _loadCompScript(out, attr, par) {
        //Jet.__tempRoot=out;
        if (par !== null) {
            attr = attr + "-" + par
        }
        var script = _JT.attr('load-script="' + attr + '"');
        var id;
        var initId = function () {
            id = out._JT_attr('id');
            if (id == null) {
                id = __ele_id++;
            }
            out._JT_attr(__comp_id, id);
        }
        var dealParJet = function (js) {
            if (par !== null) {
                return js.replace('new Jet(', 'new Jet("' + par + '","' + id + '",');
            }
            return js;
        };
        if (!script._JT_exist()) {
            script = _JT.ct('script')._JT_attr({
                'load-script': attr,
                'type': 'text/javascript'
            });
            var txt = ['//# sourceURL=' + attr + '.js\r\n'];
            var scripts = out._JT_findTag("script")._JT_toArray(false);
            if (scripts.length > 0) {
                initId();
            }
            var index = -1;
            for (var i = scripts.length - 1; i >= 0; i--) {
                if (scripts[i]._JT_hasAttr("src")) {
                    index = i;
                    break;
                }
            }
            var sourceSrc = [];
            scripts._JT_each(function (item, i) {
                if (item._JT_hasAttr("src")) {
                    _JT.load(Jet.res.getSrc(item._JT_attr("src"), 'js'), function (src) {
                        txt[i + 1] = dealParJet(src);
                        sourceSrc[i + 1] = src;
                        if (i == index) {
                            script._JT_html(txt.join(';'));
                            _JT.body()._JT_append(script);
                        }
                    });
                } else {
                    txt[i + 1] = dealParJet(item._JT_html());
                    sourceSrc[i + 1] = item._JT_html();
                }
                item._JT_remove();
            });
            if (index == -1) {
                script._JT_html(txt.join(';'));
                script.__sourceSrc = sourceSrc;
                _JT.body()._JT_append(script);
            }
        } else {//重新执行
            initId();
            var src = '';
            script.__sourceSrc.forEach(function (item) {
                src += dealParJet(item);
            })
            var newScript = _JT.ct('script')._JT_attr({
                'load-script': attr,
                'type': 'text/javascript'
            })._JT_html(src);
            newScript.__sourceSrc = script.__sourceSrc;
            script._JT_remove();
            _JT.body()._JT_append(newScript);
        }
    }
    function _loadCompStyle(out, attr) {
        if ('undefined' === typeof jet_css_conf) {
            _reloadCssConf(function () {
                _loadStyleCall(out, attr);
            });
        } else {
            window.__css_conf_xhr = undefined;
            _loadStyleCall(out, attr);
        }
    }
    function _dealSrc(s) {
        s = s.trim();
        if (s[0] != '/') {
            s = '/' + s;
        }
        return s;
    }
})()