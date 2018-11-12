(function () {
    /*valid*********************************************************************************/
    function _getJdomEle(b, ele) {
        if ('undefined' == typeof b) return document.body;
        if (typeof b == 'string') {
            var s = b;
            if (ele) {
                b = ele._JT_findAttr(_dom + '=' + s);
            } else {
                b = _JT.attr(_dom + '=' + s);
            }
            if (!b._JT_exist()) {
                b = _JT.id(s);
            }
        } else if (_JT.type(b) != 'htmlelement') {
            b = b.ele;
        }
        return b;
    }
    var _form = 'Jform', _valid = 'Jvalid';
    //第一个含有 _form 的父元素
    Jet.valid = {
        init: function (b) {
            var c;
            b = _getJdomEle(b);
            if (b == undefined) {
                c = _JT.attr(_valid)
            } else {
                if (b._JT_hasAttr(_valid)) {
                    c = b;
                } else {
                    c = b._JT_findAttr(_valid)
                }
            }
            c._JT_each(function (a) {
                if (!a.__valided) {
                    a._JT_on({
                        "blur": "Jet.valid.validInput(this,true,true)",
                        "input": function () {
                            if (Jet.valid.useOnInput)
                                Jet.valid.validInput(this, true, true)
                        },
                        "focus": "Jet.valid.addValidValue(this)"
                    }, true).__valided = true;
                    if (Jet.valid.__placeholder) {
                        a._JT_attr("placeholder", _getValueText(a._JT_attr(_valid)))
                    }
                }
            })
        }, findValidPar: function (ele) {
            var par = ele._JT_parent();
            while (!par._JT_hasAttr(_form) && par._JT_parent() != null) {
                par = par._JT_parent();
            }
            return par;
        },
        regExp: {
            'null': /^\S{0}$/,
            "date": /^(([12]\d{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|3(0|1))))$/,
            "email": /^((\w*@\w*\.[A-Za-z.]+(\.)?[A-Za-z]+))$/,
            "decimal": /^-?[1-9]\d*.\d*|0.\d*[1-9]\d*$/,
            "idcard": /^(\d{17}(X|\d))$/,
            "url": /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/,
            "phone": /^([1]\d{10})$/,
        },
        validText: {
            CN: {
                nul: "*可以为空",
                notnull: "*必填",
                date: "*格式为XXXX-XX-XX",
                email: "*格式为XXX@XX.XX",
                number: "*须为纯数字",
                idcard: "*17位数字加一位数字或X",
                length: "*输入长度为",
                url: "*请输入正确的网址",
                decimal: "*请正确的小数",
                lengthOfAny: "*输入长度为",
                phone: "*须为11位纯数字",
                letterStart: "*字母开头且长度为",
                range: "*数字不在范围内",
                express: "*自定义错误"
            }, EN: {
                nul: "*null is allowed",
                notnull: "*Required",
                date: "*format:XXXX-XX-XX",
                email: "*format:XXX@XX.XX",
                number: "*expect a number",
                idcard: "*17 numbers plus a number or X",
                length: "*length between",
                url: "*Expect an url name",
                decimal: "*Expect a float number",
                lengthOfAny: "*length between",
                phone: "*must be 11 digits",
                letterStart: "*letter start and length",
                range: "*not in range",
                express: "*wrong express"
            }
        },
        __lang: "CHINESE",
        __default: true,
        __placeholder: false,
        __useJUI: false,
        __useOnInput: false,
        useAlert: false,
        validate: _validateForm,
        addValidText: function (a, b) {
            if (_JT.type(a) == "json" && b == undefined) {
                for (var c in a) {
                    Jet.valid.addValidText(c, a[c]);
                }
            } else {
                if (Jet.valid.__lang == "CHINESE") {
                    Jet.valid.validText.CN[a] = b;
                } else {
                    Jet.valid.validText.EN[a] = b;
                }
            }
        },
        addRegExp: function (name, reg, text) {
            if (typeof reg === 'string') {
                reg = new RegExp(reg)
            }
            Jet.valid.regExp[name] = reg;
            if (text !== undefined) {
                Jet.valid.addValidText(name, text);
            }
        },
        validInput: _validInput,
        addValidValue: _addValidValue,
        clearValid: function (obj) {
            obj = _getJdomEle(obj);
            if (obj._JT_hasAttr(_valid)) {
                _clearValid(obj);
            } else {
                obj._JT_findAttr(_valid)._JT_each(function (item) {
                    _clearValid(item);
                })
            }
        },
        resetValid: function (obj) {
            obj = _getJdomEle(obj);
            if (obj._JT_hasAttr(_valid)) {
                _resetValid(obj);
            } else {
                obj._JT_findAttr(_valid)._JT_each(function (item) {
                    _resetValid(item);
                })
            }
        },
        addValid: function (obj, type) {
            obj = _getJdomEle(obj);
            obj._JT_attr(_valid, type);
            Jet.valid.init(obj);
        },
        onOnePass: function (c) {
            _onOnePass = _checkFunction(c);
        },
        onOneFail: function (c) {
            _onOneFail = _checkFunction(c);
        }
    }
    function _clearValid(obj) {
        _resetValid(obj)
        obj._JT_removeAttr("jvalid jet-value");
    }
    function _resetValid(obj) {
        if (obj._JT_hasClass("jet-unpass")) {
            obj._JT_removeClass("jet-unpass")._JT_val(obj._JT_validValue)
        }
    }
    Object.defineProperties(Jet.valid, {
        'language': {
            get: function () { return Jet.valid.__lang; },
            set: function (val) {
                Jet.valid.__lang = val.toUpperCase()
            }
        }, 'useJUI': {
            get: function () { return Jet.valid.__useJUI; },
            set: function (val) {
                if (typeof JUI !== 'undefined') {
                    Jet.valid.__useJUI = val
                }
            }
        }, 'useDefaultStyle': {
            get: function () { return Jet.valid.__default; },
            set: function (val) {
                if (Jet.valid.__default !== val) {
                    if (Jet.valid.__useOnInput === true && val === true) {
                        _warn('useOnInput 模式下不可使用默认样式');
                    } else {
                        Jet.valid.__default = val;
                        Jet.valid.__lastUseDef = val;
                        if (val === false) {
                            _JT.cls("jet-unpass")._JT_each(function (a) {
                                _checkIsPw(a);
                                a._JT_removeClass("jet-unpass")._JT_val(a._JT_validValue);
                                a._JT_validValue = undefined;
                            })
                        }
                    }
                }
            }
        }, 'useOnInput': {
            get: function () { return Jet.valid.__useOnInput; },
            set: function (val) {
                if (Jet.valid.__useOnInput !== val) {
                    Jet.valid.__useOnInput = val;
                    if (val === false) {
                        if (Jet.valid.__default !== Jet.valid.__lastUseDef) {
                            Jet.valid.useDefaultStyle = Jet.valid.__lastUseDef
                        }
                    } else {
                        if (Jet.valid.useDefaultStyle) {
                            Jet.valid.useDefaultStyle = false;
                            Jet.valid.__lastUseDef = true;
                        }
                    }
                }
            }
        }, 'showInPlaceHolder': {
            get: function () { return Jet.valid.__placeholder; },
            set: function (val) {
                Jet.valid.__placeholder = val;
                if (val === true) {
                    _JT.attr(_valid)._JT_each(function (a) {
                        a._JT_attr("placeholder", _getValueText(a._JT_attr(_valid)))
                    })
                } else if (val === false) {
                    _JT.attr(_valid)._JT_each(function (a) {
                        a._JT_removeAttr("placeholder")
                    })
                }
            }
        }
    });
    Jet.valid.init();
    var _onOnePass = null,
        _onOneFail = null;
    function _checkIsPw(a) {
        if (a._JT_ispw === true) {
            a._JT_attr("type", "password")
        }
    };

    EleProto._JT_validate = function (s, f) {
        _validateForm({
            ele: this,
            pass: s,
            fail: f
        })
    };
    //第一个参数是元素，第二个是是否提示，第三个是是否不是代码调用
    function _validInput(b, a, isFromBlur) {
        b = _getJdomEle(b);
        if (b.offsetParent === null)
            return "true"
        var v = b._JT_attr(_valid);
        var c = "";
        if (v != null) {
            if (v.indexOf("lengthOfAny") != -1) {
                var e = v.substring(12, v.length - 1).split(",");
                if (e[1] === undefined) {
                    e[1] = e[0]
                }
                var f = "lengthOfAny";
                var d = b._JT_content();
                if (d.length >= parseInt(e[0]) && d.length <= parseInt(e[1])) {
                    c = "true"
                } else {
                    c = _getValidText(f, e)
                }
            } else {
                c = _checkValue(v, b._JT_content())
            }
            if (c == "true") {
                if (Jet.valid.__default) {
                    b._JT_removeClass("jet-unpass");
                    b._JT_validValue = undefined;
                    _checkIsPw(b)
                }
                if (_onOnePass != undefined) _onOnePass(b)
            } else {
                if (_onOneFail != undefined) _onOneFail(b, c);
                if (Jet.valid.__default) {
                    if (isFromBlur === true)
                        b._JT_validValue = b._JT_content();
                    b._JT_content(c)._JT_addClass("jet-unpass");
                    if (b._JT_attr("type") == "password") {
                        b._JT_ispw = true;
                        b._JT_attr("type", "text")
                    }
                }
                if (a !== false) {
                    if (Jet.valid.useJUI) {
                        JUI.msg.error(c);
                    } else if (Jet.valid.useAlert) {
                        alert(c)
                    }
                }
            }
        }
        return c
    };

    function _validInputOfForm(b) {
        if (b._JT_hasClass("jet-unpass")) {
            if (_onOneFail != undefined) {
                _onOneFail(b, b._JT_val())
            }
            return b._JT_val();
        } else {
            return _validInput(b, false)
        }
    };

    function _addValidValue(a) {
        if (a._JT_hasClass("jet-unpass")) {
            a._JT_content(a._JT_validValue);
            _checkIsPw(a)
        }
    };
    //g:元素 f：成功回调函数，c：失败回调函数
    function _validateForm(opt) {
        if (typeof opt == 'string') {
            opt = { ele: opt }
        }
        var g = opt.ele;
        if (typeof g == 'string') {
            g = _JT.attr(_form + '=' + g);
            if (!g._JT_exist()) {
                g = _getJdomEle(opt.ele);
            }
        }
        var e = [];
        var b = true;
        if (opt.fail == undefined) {
            b = false
        }
        var d = true;
        var a = g._JT_findAttr(_valid);
        a._JT_each(function (j) {
            var h = _validInputOfForm(j);
            if (h != "true") {
                d = false;
                if (b) {
                    e[e.length] = {
                        "obj": j,
                        "error": h
                    }
                }
            }
        });
        if (!d) {
            if (b) {
                _checkFunction(opt.fail)(e, g);
            }
            var i = (Jet.valid.__lang == "CHINESE") ? "输入有误，请按提示改正。" : "Values is not expected";
            if (Jet.valid.useAlert) {
                alert(i)
            } else if (Jet.valid.useJUI) {
                JUI.msg.error(i);
            }
        } else {
            if (opt.pass != undefined) {
                _checkFunction(opt.pass)(g);
            }
        }
    };


    function _getValueText(b) {
        var c = 0;
        if (b.indexOf("range") != -1) {
            c = 6
        } else {
            if (b.indexOf("letterStart") != -1) {
                c = 12
            } else if (b.indexOf("length") != -1) {
                c = 7
            } else if (b._JT_has("number") && b != "number") {
                c = 7
            }
        }
        if (c != 0) {
            var a = b.substring(c, b.length - 1).split(",");
            if (a[1] === undefined) {
                a[1] = a[0]
            }
            return _getValidText(b.substring(0, c - 1), a)
        } else {
            return _getValidText(b)
        }
    };

    function _getValidText(a, b) {
        if (Jet.valid.__lang == "CHINESE") {
            if (b == undefined) {
                if (a._JT_has('express')) {
                    return Jet.valid.validText.CN.express;
                }
                return Jet.valid.validText.CN[a]
            } else {
                var c = "";
                if (a._JT_has("number")) {
                    c = " 且长度为"
                }
                if (b[0] == b[1]) {
                    return Jet.valid.validText.CN[a] + c + b[0]
                }
                return Jet.valid.validText.CN[a] + c + "[" + b[0] + "," + b[1] + "]"
            }
        } else {
            if (b == undefined) {
                if (a._JT_has('express')) {
                    return Jet.valid.validText.EN.express;
                }
                return Jet.valid.validText.EN[a]
            } else {
                var c = "";
                if (a._JT_has("number")) {
                    c = " and length between"
                }
                if (b[0] == b[1]) {
                    return Jet.valid.validText.EN[a] + c + b[0]
                }
                return Jet.valid.validText.EN[a] + c + "[" + b[0] + "," + b[1] + "]"
            }
        }
    };

    function _getRegExp(f) {
        var d = -1;
        var c = -1;
        if (f.indexOf("length") != -1) {
            var e = f.substring(7, f.length - 1).split(",");
            f = "length";
            d = e[0];
            if (e[1] == undefined) {
                e[1] = e[0]
            }
            c = e[1]
        } else if (f.indexOf("letterStart") != -1) {
            var e = f.substring(12, f.length - 1).split(",");
            f = "letterStart";
            d = e[0];
            if (e[1] == undefined) {
                e[1] = e[0]
            }
            c = e[1]
        } else if (f._JT_has("number") && f != "number") {
            var e = f.substring(7, f.length - 1).split(",");
            f = "number";
            d = e[0];
            if (e[1] == undefined) {
                e[1] = e[0]
            }
            c = e[1]
        } else if (f._JT_has("express")) {
            d = f.substring(8, f.length - 1);
            f = "express"
        }
        if (f in Jet.valid.regExp) {
            return Jet.valid.regExp[f];
        }
        switch (f) {
            case "number":
                if (d >= 0) {
                    return new RegExp("^-?(\\d{" + d + "," + c + "})$")
                } else {
                    return /^-?(\d+)$/
                } break;
            case "letterStart": return new RegExp("^([a-zA-Z]([a-zA-Z\\d]){" + (parseInt(d) - 1) + "," + (parseInt(c) - 1) + "})$"); break;
            case "length": return new RegExp("^(([a-zA-Z\\d]){" + d + "," + c + "})$"); break;
            case "express": return new RegExp(d); break;
            default: return "null"; break;
        }
    };

    function _checkValue(a, e) {
        if (a.indexOf("notnull") != -1) {
            if (e.length == 0) {
                return _getValueText("notnull")
            }
        } else if (a.indexOf("null") != -1) {
            var c = a.split(" ");
            var b = (c[0] == "null") ? c[1] : c[0];
            if (b.indexOf("range") != -1) {
                var d = _testRange(a, e);
                if (d != "true" && e != "") {
                    return d
                }
            }
            if (!_getRegExp(b).test(e) && e != "") {
                return _getValueText(b)
            }
        } else {
            if (a.indexOf("range") != -1) {
                var d = _testRange(a, e);
                if (d != "true") {
                    return d
                }
            } else {
                if (!_getRegExp(a).test(e)) {
                    return _getValueText(a)
                }
            }
        }
        return "true"
    };

    function _testRange(b, c) {
        var a = b.substring(6, b.length - 1).split(",");
        b = "number";
        if (_getRegExp(b).test(c)) {
            if (parseInt(c) < parseInt(a[0]) || parseInt(c) > parseInt(a[1])) {
                return _getValidText("range", a)
            }
        } else {
            return _getValidText("number")
        }
        return "true"
    };

})()