(function () {
    /*module*******************************************************************/
    var _currentModule = '', _export = '';
    var _modules = _createEmpty();//文件与模块名的映射
    var _m_call = _createEmpty();//模块名的回调函数，用于触发模块加载之后的回调函数
    var _addIntoModCall = function (name, f) {
        if (_m_call[name] === undefined) {
            _m_call[name] = [];
        }
        _m_call[name].push(f);
    }
    var _exeModCall = function (name, mod) {
        if (_m_call[name] !== undefined && _m_call[name].length > 0) {
            var n = _m_call[name].length;
            var index = 0;
            _m_call[name].forEach(function (f) {
                f(mod);
                index++;
                if (index == n) {
                    _m_call[name] = [];
                }
            });
        }
    }
    //var __call=null;
    Jet.$module = _createEmpty();
    //Jet.prototype.$module=Jet.$module;
    //定义一个模块 需要import才能执行
    //rely是当前模块的依赖项，不是必须
    var _check_is_new = false;
    var _export_is_new = false;
    Jet.$define = function (name, rely, call) {
        if (_check_is_new || typeof Jet.$module[name] === 'undefined') {
            _currentModule = name;
            _export = name;
            var _isNew = _check_is_new;
            if (arguments.length === 3) {//有依赖项
                rely[rely.length] = function (mods) {
                    //_currentModule=name;
                    _export = name;
                    _export_is_new = _isNew;
                    call.call(Jet, mods);
                }
                Jet.$import.apply(Jet, rely)
            } else {//无依赖项
                _export = name;
                _export_is_new = _isNew;
                rely.call(Jet);
            }
        }
    }
    //暴露接口 需要import才能执行
    Jet.$export = function (call, json) {
        //Jet.$export=function(json){
        if (arguments.length == 2) {
            if (_export_is_new == false) {
                Jet.$module[_export] = json;
            }
            _exeModCall(_export, json);
            call(json);
        } else {
            if (_export_is_new == false) {
                Jet.$module[_export] = call;
            }
            json = call;
        }
        if (json.$init !== undefined) {
            json.$init();
            delete json.$init;
        }
        // if(json.__call!==undefined){
        //   json.__call();
        //   delete json.__call;
        // }
    }
    //var mod=Jet.$get('name')
    Jet.$get = function (name) {
        if (arguments.length == 1) {
            return Jet.$module[name];
        } else {
            var ms = {};
            for (var i = 0; i < arguments.length; i++) {
                var json = _getKeyAndMod(arguments[i]);
                ms[json.key] = Jet.$module[json.mod];
            }
            return ms;
        }
    }
    Jet.prototype.$get = function (name) {
        return Jet.$get(name);
    }
    // function _jsFile(file){
    //   var src=_dealSrc(file);
    //   if(!src._JT_has('.js')){
    //     src=src+'.js'
    //   }
    //   return src;
    // }
    // function _HtmlFile(file){
    //   var src=_dealSrc(file);
    //   if(!src._JT_has('.html')){
    //     src=src+'.html'
    //   }
    //   return src;
    // }
    function _loadOneModule(src, key, isNew, call) {
        _JT.load(Jet.res.getSrc(src, 'js'), function (code) {
            code = ('//# sourceURL=' + src + '\r\n' + code);
            _check_is_new = (isNew === false) ? false : true;
            if (call) {
                //为了让回掉函数在依赖执行完之后再执行
                //code=code.replace('.$export({','.$export({__call:function(){__call(this)},');
                code = code.replace('.$export(', '.$export(__call,');
                (new Function('__call', code))(function (obj) {
                    call(obj, key)
                });
                //call(Jet.$module[_currentModule],key);
            } else {
                (new Function(code))();
            }
            if (typeof _modules[src] === 'function') {
                _modules[src](_currentModule);
            }
            _modules[src] = _currentModule;
        })
    }
    //加载模块 参数是模块名字，可以使用 as 来起别名，引入之后全局可用
    //若是之前已经引入过对应模块，则会在 Jet.$module 中查找对应模块返回
    //最后一个参数是回调函数，可不填，回调参数是当前所有引入的模块的json对象
    Jet.$import = function () {
        var n = arguments.length;
        var index = 0, callback = null, modules = _createEmpty();
        if (typeof arguments[n - 1] === 'function') {
            callback = arguments[n - 1]
            n--;
        }
        for (var i = 0; i < n; i++) {
            var item = arguments[i];
            var isNew = _checkIsNewMod(item);//是否新建一个模块
            if (isNew !== false) {
                item = isNew;
            }
            var json = _getKeyAndMod(item);
            //var src=_jsFile(json.mod);
            var src = json.mod;
            if (typeof _modules[src] !== 'undefined' && isNew === false) {
                if (callback !== null) {
                    var _func = function (modName) {
                        var mod = Jet.$get(modName);
                        var func = function (m) {
                            index++;
                            modules[(item._JT_has(' as ') ? json.key : modName)] = m;
                            if (index === n) {
                                callback(modules);
                            }
                        }
                        if (mod !== undefined) {
                            func(mod);
                        } else {
                            _addIntoModCall(modName, func)
                        }
                    }
                    if (_modules[src] === '__loading') {
                        _modules[src] = _func;
                    } else {
                        _func(_modules[src]);
                    }
                }
            } else {
                _modules[src] = '__loading';
                _loadOneModule(src, json.key, isNew, function (mod, key) {
                    if (callback !== null) {

                        index++;
                        modules[(item._JT_has(' as ') ? key : _export)] = mod;
                        if (index === n) {
                            callback(modules);
                        }
                    }
                });
            }
        }
        // if(callback!==null&&index===n){
        //   callback(modules);
        // }
    }
    function _checkIsNewMod(item) {
        if (!item._JT_has('new(')) {
            return false;
        }
        return item.substring(4, item.indexOf(")")) + item.substring(item.indexOf(")") + 1)
    }
    //在Jet元素中可以使用 this.$import 来在当前元素中生成 一个模块，可以使用this.$module.name 来使用，参数与Jet.$import一致
    Jet.prototype.$import = function (name) {
        var _this = this;
        if (typeof arguments[arguments.length - 1] === 'function') {
            var func = arguments[arguments.length - 1];
            arguments[arguments.length - 1] = function (mods) {
                func(mods);
                _addModule(_this, mods)
            }
        } else {
            arguments[arguments.length] = function (mods) {
                _addModule(_this, mods)
            }
            arguments.length++;
        }
        Jet.$import.apply(null, arguments);
    }
    var _addModule = function (_this, mods) {
        if (typeof _this.$module === 'undefined') {
            _this.$module = mods;
        } else {
            for (var k in mods) {
                _this.$module[k] = mods[k];
            }
        }
    }
    function _importBase(obj, key, mod) {
        if (typeof mod === 'string') {
            obj[key] = Jet.$get(mod);
        } else {
            obj[key] = mod
        }
    }
    function _getKeyAndMod(name) {
        var arr = name.split(' as ');
        if (arr.length === 2) {
            return {
                key: arr[1],
                mod: arr[0]
            }
        } else {
            return {
                key: name,
                mod: name
            }
        }
    }
})()