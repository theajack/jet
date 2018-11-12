(function(){
    var _JT = {
        cls: function (a) {
            return _checkSelect(document.getElementsByClassName(a))
        },
        id: function (a) {
            return _checkSelect(document.getElementById(a))
        },
        tag: function (a) {
            return _checkSelect(document.getElementsByTagName(a))
        },
        attr: function (a) {
            return _checkSelect(document.querySelectorAll("[" + a + "]"))
        },
        name: function (a) {
            return _checkSelect(document.getElementsByName(a))
        },
        select: function (a) {
            return _checkSelect(document.querySelectorAll(a))
        },
        body: function () {
            return document.body
        },
        type: _type,
        ct: _create,
        ajax: _ajax,
        cookie: _cookie,
        storage: _storage,
        load: _load,
        clone: _clone,
        html5: function () {
            if (window.applicationCache) {
                return true;
            }
            return false;
        },
        urlParam: _getUrlParam,
        delay: function (call, time) {
            time = time || 500;
            return setTimeout(function () {
                call.call(this);
            }, time);
        },
        interval: function (bool, call, time) {
            time = time || 500;
            return setInterval(function () {
                if (bool().call(this)) {
                    clearInterval(t);
                    call().call(this);
                }
            }, time)
        },
        clearDelay: function (t) {
            return setTimeout(t);
        },
        clearInterval: function (t) {
            return clearInterval(t);
        }
    };
    function _clone(obj) {
        if (obj == undefined) {
            return undefined;
        }
        var type = _type(obj);
        if (type == "htmlelement" || type == "array") {
            return obj._JT_clone();
        } else if (type == "json" || type == "object") {
            var a = new Object();
            for (var attr in obj) {
                if (obj[attr] == null || obj[attr] == undefined) {
                    a[attr] = obj[attr];
                } else if (_type(obj[attr]) == "array") {
                    a[attr] = obj[attr]._JT_clone();
                } else if (_type(obj[attr]) == "json" || _type(obj[attr]) == "object") {
                    a[attr] = _clone(obj[attr]);
                } else {
                    a[attr] = obj[attr];
                }
            }
            return a;
        } else if (type == "number" || type == "boolean" || type == "string" || type == "function") {
            return obj;
        } else {
            return obj;
        }
    };
    function _storage(a, b) {
        if (typeof a === 'object' && a !== null) {
            for (var k in a) {
                _storage(k, a[k]);
            }
            return
        }
        var store = localStorage;
        if (b === undefined) {
            if (a === undefined) {
                var obj = {};
                Object.keys(store).forEach(function (item) {
                    obj[item] = store.getItem(item);
                });
                return obj;
            } else if (a === null) {
                Object.keys(store).forEach(function (item) {
                    store.removeItem(item);
                });
            } else {
                var d = store.getItem(a);
                try {
                    return JSON.parse(d)
                } catch (e) {
                    if (d === parseFloat(d).toString()) {
                        return parseFloat(d);
                    }
                    return d;
                }
            }
        } else if (b === null) {
            store.removeItem(a)
        } else {
            if (typeof b === 'object') {
                store.setItem(a, JSON.stringify(b))
            } else {
                store.setItem(a, b)
            }
            return b
        }
    }
    function _cookie(a, b, d, e) {
        if (arguments.length == 1) {
            if (document.cookie.length > 0) {
                var f = document.cookie.indexOf(a + "=");
                if (f != -1) {
                    f = f + a.length + 1;
                    var g = document.cookie.indexOf(";", f);
                    if (g == -1) g = document.cookie.length;
                    return unescape(document.cookie.substring(f, g))
                }
            }
            return ""
        } else {
            if (b == null) {
                _cookie(a, "", -1)
            } else {
                var c = a + "=" + escape(b);
                if (d != undefined) {
                    var h = new Date();
                    h.setDate(h.getDate() + d);
                    c += ";expires=" + h.toGMTString()
                }
                if (e != undefined) {
                    if (_type(e) == "boolean") {
                        if (e) {
                            c += (";path=/")
                        }
                    } else {
                        c += (";path=" + e)
                    }
                }
                document.cookie = c;
                return a + "=" + b
            }
        }
    };
    function _ajax(a) {
        var b = {
            type: a.type || "get",
            url: a.url || "",
            async: a.async || true,
            data: a.data || null,
            dataType: a.dataType || "text",
            contentType: a.contentType || "application/x-www-form-urlencoded",
            beforeSend: a.beforeSend || function () { },
            success: a.success || function () { },
            error: a.error || function () { },
            header: a.header || {}
        };
        b.beforeSend();
        var c;
        if (window.XMLHttpRequest) {
            c = new XMLHttpRequest()
        } else if (window.ActiveXObject) {
            c = ActiveXObject("Microsoft.XMLHTTP")
        }
        var _d = _convertData(b.data);
        var _t = b.type.toLowerCase();
        //||_t=='delete'
        if ((_t == 'get') && _d !== '') {
            b.url = b.url + '?' + _d;
        }
        c.open(b.type, b.url, b.async);
        c.responseType = b.dataType;
        if (a.contentType !== null) {
            c.setRequestHeader("Content-Type", b.contentType);
        }
        for (var k in b.header) {
            c.setRequestHeader(k, b.header[k]);
        }
        if (b.type.toLowerCase() == 'get') {
            c.send();
        } else {
            c.send(_d);
        }
        c.onreadystatechange = function () {
            if (c.readyState == 4) {
                if (c.status == 200) {
                    b.success(c.response || c.responseText)
                } else {
                    b.error(c.response || c.responseText)//errInfo
                }
            }
        }
        return c;


    };
    function _load(name, call, ecall) {
        return _JT.ajax({
            url: name,
            async: true,
            success: function (result) {
                call(result);
            },
            error: function (err) {
                if (ecall != undefined)
                    ecall(err);
                _warn("加载失败:" + name);
            },
        })
    };
    function _create(a) {
        return document.createElement(a)
    };
    function _convertData(a) {
        if (a == undefined) {
            return "";
        }
        var t = $J.type(a);
        if (t == "json") {
            var b = "";
            for (var c in a) {
                if (typeof a[c] === 'object') {
                    b += (c + "=" + encodeURIComponent(JSON.stringify(a[c])) + "&")
                } else {
                    b += (c + "=" + encodeURIComponent(a[c]) + "&")
                }
            }
            b = b.substring(0, b.length - 1);
            return b
        } else if (t == 'array') {
            return JSON.stringify(a);
        } else if ($J.type(a) == "formdata") {
            // if(a.entries!=undefined){
            //   var b = "";
            //   for (var i of a.entries()) {
            //     b += i[0] + "=" + i[1] + "&"
            //   }
            //   b = b.substring(0, b.length - 1);
            //   return b
            // }
            return a;
        } else {
            return a;
        }
    }
    function _checkFunction(a) {
        if (a == undefined) {
            return function () { };
        } else {
            var b = _JT.type(a);
            if (b == "function") {
                return a;
            } else if (b == "string") {
                return new Function(a);
            } else {
                return function () { };
            }
        }
    }
    function _formatParams(a) {
        var b = [];
        for (var c in a) {
            b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]))
        }
        return b.join("&")
    }

    function _checkSelect(b) {
        if (b == null || b == undefined) {
            return [];
        } else if (b.length == 1) {
            return b[0]
        }
        return b
    };

    var EleProto = HTMLElement.prototype;
    var CollProto = HTMLCollection.prototype;
    var NodeProto = NodeList.prototype;
    var ArrProto = Array.prototype;
    var StrProto = String.prototype;
    EleProto._JT_css = function (d, a) {
        if (a == undefined) {
            if (_JT.type(d) == "json") {
                for (var b in d) {
                    if (d[b]._JT_has("!important")) {
                        this.style.setProperty(b, _checkCssValue(this, b, d[b].substring(0, d[b].indexOf("!important"))), "important")
                    } else {
                        this.style.setProperty(b, _checkCssValue(this, b, d[b]))
                    }
                }
                return this
            } else {
                return getComputedStyle(this)[d]
            }
        } else {
            if (a._JT_has("!important")) {
                this.style.setProperty(d, _checkCssValue(this, d, a.substring(0, a.indexOf("!important"))), "important")
            } else {
                this.style.setProperty(d, _checkCssValue(this, d, a))
            }
            return this
        }
    };

    function _checkCssValue(a, c, d) {
        if (d._JT_has("-=") || d._JT_has("+=")) {
            var e = _getCssNumberValue(d.substring(d.indexOf("=") + 1));
            if (d._JT_has("-=")) {
                e[0] = -e[0]
            }
            var b;
            if (d._JT_has("%")) {
                b = _getCssNumberValue(a.style[c])
            } else {
                b = _getCssNumberValue(getComputedStyle(a)[c])
            }
            return (e[0] + b[0]) + e[1]
        }
        return d
    };

    function _getCssNumberValue(a, b) {
        if (a == "" || a == undefined) {
            a = "0%"
        }
        if (b == undefined) {
            if (a._JT_has("px")) {
                b = "px"
            } else if (a._JT_has("%")) {
                b = "%"
            } else if (a._JT_has("em")) {
                b = "em"
            } else {
                return [parseFloat(a), "px"]
            }
        }
        return [parseFloat(a.substring(0, a.indexOf(b))), b]
    };

    EleProto._JT_attr = function (c, b) {
        if (b == undefined) {
            if (_JT.type(c) == "json") {
                for (var a in c) {
                    if (a.trim() !== '')
                        this.setAttribute(a, c[a])
                }
                return this
            } else {
                return this.getAttribute(c)
            }
        } else {
            if (c.trim() !== '')
                this.setAttribute(c, b);
            return this
        }
    };
    CollProto._JT_attr = NodeProto._JT_attr = function (d, c) {
        if (c == undefined && _JT.type(d) != "json") {
            var a = [];
            this._JT_each(function (b) {
                a._JT_append(b._JT_attr(d))
            });
            return a
        } else {
            this._JT_each(function (a) {
                a._JT_attr(d, c)
            });
            return this
        }
    };
    EleProto._JT_hasAttr = function (a) {
        return this.hasAttribute(a)
    };
    EleProto._JT_removeAttr = function (b) {
        var c = b.split(" ");
        if (c.length > 1) {
            var d = this;
            c._JT_each(function (a) {
                d.removeAttribute(a)
            })
        } else {
            this.removeAttribute(b)
        }
        return this
    };
    CollProto._JT_removeAttr = NodeProto._JT_removeAttr = function (b) {
        this._JT_each(function (a) {
            a._JT_removeAttr(b)
        });
        return this
    };
    EleProto._JT_findTag = function (a) {
        return _checkSelect(this.getElementsByTagName(a))
    };
    EleProto._JT_findAttr = function (a) {
        return _checkSelect(this.querySelectorAll("[" + a + "]"))
    };
    EleProto._JT_findClass = function (a) {
        return _checkSelect(this.getElementsByClassName(a))
    };
    EleProto._JT_select = function (a) {
        return _checkSelect(this.querySelectorAll(a))
    };
    EleProto._JT_addClass = function (a) {
        if (a._JT_has(" ")) {
            var b = a.split(" ");
            var c = this;
            b._JT_each(function (i) {
                c._JT_addClass(i)
            });
        } else if (a.trim() !== "") {
            if (_JT.html5()) {
                this.classList.add(a)
            } else {
                if (!this._JT_hasClass(a)) {
                    this.className += " " + a
                }
            }
        }
        return this
    };
    CollProto._JT_addClass = NodeProto._JT_addClass = function (a) {
        this._JT_each(function (b) {
            b._JT_addClass(a)
        });
        return this
    };
    EleProto._JT_removeClass = function (a) {
        if (a == undefined) {
            this.className = ""
        } else if (a.trim() !== "") {
            if (a._JT_has(" ")) {
                var c = a.split(" ");
                var d = this;
                c._JT_each(function (i) {
                    d._JT_removeClass(i)
                })
            } else {
                if (_JT.html5()) {
                    this.classList.remove(a)
                } else {
                    if (this._JT_hasClass(a)) {
                        var b = new RegExp("(\\s|^)" + a + "(\\s|$)");
                        this.className = this.className.replace(b, " ").trim()
                    }
                }
            }
        }
        return this
    };
    CollProto._JT_removeClass = NodeProto._JT_removeClass = function (a) {
        this._JT_each(function (b) {
            b._JT_removeClass(a)
        });
        return this
    };
    EleProto._JT_val = function (a) {
        if (a == undefined && arguments.length == 0) {
            return this.value
        } else {
            if (this.tagName == "INPUT" || this.tagName == "TEXTAREA" || this.tagName == "SELECT") {
                this.value = _checkArg(a, "")
            }
            return this
        }
    };
    CollProto._JT_val = NodeProto._JT_val = function (v) {
        if (v == undefined) {
            var a = [];
            this._JT_each(function (b) {
                a._JT_append(b._JT_val())
            });
            return a
        } else {
            this._JT_each(function (b) {
                b._JT_val(v)
            });
            return this
        }
    };
    EleProto._JT_txt = function (a) {
        if (a == undefined && arguments.length == 0) {
            return this.innerText
        } else {
            this.innerText = _checkArg(a, "");
            return this
        }
    };
    CollProto._JT_txt = NodeProto._JT_txt = function (v) {
        if (v == undefined && arguments.length == 0) {
            var a = [];
            this._JT_each(function (b) {
                a._JT_append(b._JT_txt())
            });
            return a
        } else {
            this._JT_each(function (b) {
                b._JT_txt(v)
            });
            return this
        }
    };

    EleProto._JT_html = function (a) {
        if (a == undefined) {
            return this.innerHTML
        } else {
            this.innerHTML = a;
            return this
        }
    };
    CollProto._JT_html = NodeProto._JT_html = function (v) {
        if (v == undefined) {
            var a = [];
            this._JT_each(function (b) {
                a._JT_append(b._JT_html())
            });
            return a
        } else {
            this._JT_each(function (b) {
                b._JT_html(v)
            });
            return this
        }
    };
    EleProto._JT_allHtml = function (a) {
        if (a == undefined) {
            return this.outerHTML;
        } else {
            this.outerHTML = a;
            return this;
        }
    };
    CollProto._JT_allHtml = NodeProto._JT_allHtml = function (v) {
        var a = [];
        this._JT_each(function (b) {
            a._JT_append(b._JT_allHtml(v))
        });
        return a
    };
    EleProto._JT_hasClass = function (a) {
        if (a.trim() === "") {
            return true;
        }
        if (_JT.html5()) {
            return this.classList.contains(a);
        }
        return new RegExp("(\\s|^)" + a + "(\\s|$)").test(this.className)
    };
    EleProto._JT_next = function (i) {
        if (i != undefined) {
            return this._JT_parent()._JT_child(this._JT_index() + i)
        } else {
            return this._JT_parent()._JT_child(this._JT_index() + 1)
        }
    };
    EleProto._JT_prev = function (i) {
        if (i != undefined) {
            return this._JT_parent()._JT_child(this._JT_index() - i)
        } else {
            return this._JT_parent()._JT_child(this._JT_index() - 1)
        }
    };

    function _checkArg(a, b) {
        return (a == undefined) ? b : a
    };
    EleProto._JT_child = function (i) {
        if (i == undefined) {
            return this.children
        } else {
            return this.children[i]
        }
    };
    EleProto._JT_clone = function () {
        return this.cloneNode()._JT_html(this._JT_html());
    };
    EleProto._JT_parent = function (i) {
        if (i == undefined) {
            return this.parentElement
        } else {
            var p = this;
            for (var j = 0; j < i; j++) {
                p = p.parentElement
            }
            return p
        }
    };
    EleProto._JT_prepend = function (a) {
        var t = _JT.type(a);
        if (t == "array" || t == "htmlcollection" || t == "nodelist") {
            var b = this;
            a._JT_each(function (item) {
                b.insertBefore(_checkHtmle(item), b.children[0])
            })
        } else if (t == "string") {
            this.insertBefore(_checkHtmle(a), this.children[0])
        } else {
            this.insertBefore(_checkHtmle(a), this.children[0])
        }
        return this
    };
    CollProto._JT_prepend = NodeProto._JT_prepend = function (a) {
        this._JT_each(function (c) {
            c._JT_prepend(a)
        });
        return this
    };
    EleProto._JT_append = function (b, a) {
        if (a == undefined) {
            var type = _JT.type(b);
            if (type == "array" || type == "htmlcollection" || type == "nodelist") {
                for (var i = 0; i < b.length; i++) {
                    this._JT_append(b[i]);
                }
            } else if (type == "string") {
                this._JT_append(_checkHtmle(b))
            } else {
                this.appendChild(_checkHtmle(b))
            }
        } else {
            this.insertBefore(_checkHtmle(b), this.children[a])
        }
        return this
    };
    CollProto._JT_append = NodeProto._JT_append = function (b, a) {
        this._JT_each(function (c) {
            c._JT_append(b, a)
        });
        return this
    };
    EleProto._JT_toArray = function () {
        return [this];
    };
    CollProto._JT_toArray = NodeProto._JT_toArray = function (bool) {
        if (bool != false) {
            var a = [];
            for (var i = 0; i < this.length; i++) {
                a.push(this[i])
            }
            return a
        } else {
            return this;
        }
    };
    function _checkHtmle(a) {
        if (_JT.type(a) == "string") {
            var e = _JT.ct("div")._JT_html(a);
            if (e._JT_child().length == 1) {
                return e._JT_child(0);
            } else {
                return e._JT_child()._JT_toArray();
            }
        }
        return a;
    };
    EleProto._JT_index = function () {
        var a = this._JT_parent()._JT_child();
        for (var i = 0; i < a.length; i++) {
            if (a[i] == this) {
                return i
            }
        }
        return -1
    };
    EleProto._JT_on = function (a, b, d) {
        if (_JT.type(a) == "string") {
            return this._JT_event("on" + a, b, d);
        } else {
            for (var c in a) {
                a["on" + c] = a[c];
                delete a[c];
            }
            return this._JT_event(a, b);
        }
    };
    CollProto._JT_on = NodeProto._JT_on = function (a, c, d) {
        this._JT_each(function (b) {
            b._JT_on(_JT.clone(a), c, d)
        });
        return this
    };
    EleProto._JT_clk = function (b, d) {
        return this._JT_event("onclick", b, d);
    };
    CollProto._JT_clk = NodeProto._JT_clk = function (a, c) {
        this._JT_each(function (b) {
            b._JT_clk(a, c)
        });
        return this
    };

    EleProto._JT_event = function (a, b, d) {
        if (_JT.type(a) == "string") {
            if (d === true) {
                _attachEvent(this, a, b);
            } else {
                this[a] = _checkFunction(b);
            }
        } else {
            for (var c in a) {
                if (a[c] != undefined) {
                    if (b === true) {
                        _attachEvent(this, c, a[c]);
                    } else {
                        this[c] = _checkFunction(a[c]);
                    }
                }
            }
        }
        return this
    };
    function _attachEvent(obj, event, fun) {
        if (document.addEventListener) {
            obj.addEventListener(event.substring(2), _checkFunction(fun), false);
        } else if (document.attachEvent) {
            obj.attachEvent(event, _checkFunction(fun));
        }
    };
    CollProto._JT_event = NodeProto._JT_event = function (a, c, d) {
        this._JT_each(function (b) {
            b._JT_event(a, c, d)
        });
        return this
    };
    EleProto._JT_empty = function () {
        return this._JT_html("")
    };
    CollProto._JT_empty = NodeProto._JT_empty = function () {
        this._JT_each(function (a) {
            a._JT_empty()
        });
        return this
    };
    EleProto._JT_remove = function () {
        if (this.parentNode === null) return;
        this.parentNode.removeChild(this)
    };
    CollProto._JT_remove = NodeProto._JT_remove = function (a) {
        if (a == undefined) {
            for (var i = 0; i < this.length;) {
                this[i]._JT_remove()
            }
        } else {
            if (_JT.type(a) == "number") {
                for (var i = 0; i < this.length; i++) {
                    if (i == a) {
                        this[i]._JT_remove();
                        return this
                    }
                }
            } else {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == a) {
                        this[i]._JT_remove();
                        return this
                    }
                }
            }
        }
    };
    EleProto._JT_each = function (b, d) {
        b(this, 0, d);
        return this
    };
    CollProto._JT_each = NodeProto._JT_each = function (b, d) {
        var arr = this._JT_toArray();//removeClass 情况下
        for (var a = 0; a < arr.length; a++) {
            b(arr[a], a, d)
        }
        return this
    };
    ArrProto._JT_each = function (b, d) {
        for (var a = 0; a < this.length; a++) {
            b(this[a], a, d)
        }
        return this
    };
    ArrProto._JT_clone = function () {
        var a = new Array();
        this.forEach(function (item) {
            a.push(_clone(item));
        });
        return a;
    };
    ArrProto._JT_empty = function (b) {
        this.length = 0;
        return this;
    };
    EleProto._JT_last = function () {
        return this._JT_child()._JT_last();
    };
    EleProto._JT_first = function () {
        return this._JT_child()._JT_first();
    };
    CollProto._JT_last = NodeProto._JT_last = ArrProto._JT_last = function (b) {
        return this[this.length - 1];
    };
    CollProto._JT_first = NodeProto._JT_first = ArrProto._JT_first = function (b) {
        return this[0];
    };
    ArrProto._JT_remove = function (b, order) {
        var index = this.indexOf(b)
        if (order == false) {
            this[a] = this[this.length--];
        } else {
            this._JT_removeByIndex(index);
        }
        return this
    };
    ArrProto._JT_removeByIndex = function (b, n) {
        this.splice(b, n || 1);
        return this
    };
    ArrProto._JT_insert = function (b, i) {
        this.splice(i, 0, b);
        return this
    };
    ArrProto._JT_insertArray = function (arr, i) {
        //var _arr=arr._JT_clone();//深拷贝
        var _arr = arr.slice(0);//浅拷贝
        _arr.splice(0, 0, i, 0);
        ArrProto.splice.apply(this, _arr)
        return this
    };
    function _argsToArray(args, index) {
        var arr = [];
        for (var i = index || 0; i < args.length; i++) {
            arr.push(args[i]);
        }
        return arr;
    }
    ArrProto._JT_append = function () {
        ArrProto.push.apply(this, arguments)
        return this
    };
    ArrProto._JT_prepend = function (b) {
        if (arguments.length == 1) {
            return this._JT_insert(b, 0)
        } else {
            return this._JT_insertArray(_argsToArray(arguments), 0)
        }
    };
    function _type(obj) {
        if (arguments.length == 0) {
            _throw("This function need a argument");
        } else {
            var type = typeof obj;
            if (type == "object") {
                if (obj === null) {
                    return "null";
                } else {
                    var con = obj.constructor;
                    switch (con) {
                        case Object: type = "json"; break;
                        case Array: type = "array"; break;
                        case HTMLCollection: type = "htmlcollection"; break;
                        case NodeList: type = "nodelist"; break;
                        //case FormData:type="formdata";break;
                        case Error: type = "error"; break;
                        case Date: type = "date"; break;
                        default: if (obj.nodeType === 1 && typeof obj.nodeName === 'string') {
                            type = "htmlelement";
                        } else {
                            type = "object";
                        }; break;
                    }
                }
            }
            return type;
        }
    };
    StrProto._JT_has = function (s) {
        if (_JT.type(s) == "string") {
            if (this.includes == undefined) {
                return (this.indexOf(s) != -1)
            } else {
                return this.includes(s)
            }
        } else {
            if (this.match(s) == null) {
                return false
            } else {
                return true
            }
        }
    };
    StrProto._JT_replaceAll = function (a, b) {
        if (_JT.type(a) == "array") {
            var s = this;
            a.forEach(function (item) {
                s = s._JT_replaceAll(item[0], item[1]);
            })
            return s;
        }
        if (_JT.type(b) == "array") {
            if (_JT.type(a) == "string") {
                var s = this.split(a);
                var d = s[0];
                s._JT_each(function (a, i) {
                    if (i > 0) {
                        d += (b[i - 1] + a)
                    }
                });
                return d
            } else {
                var e = "";
                var f = this;
                var g = this.match(a);
                if (g != null) {
                    g._JT_each(function (a, i) {
                        var c = f.split(a);
                        e += (f.substring(0, f.indexOf(a)) + b[i]);
                        f = f.substring(f.indexOf(a) + a.length)
                    });
                    e += f;
                    return e
                }
                return this
            }
        } else {
            if (_JT.type(a) == "string") {
                return this.replace(new RegExp(a, "g"), b)
            } else {
                return this.replace(a, b)
            }
        }
    };



    EleProto._JT_exist = function (call, callf) {
        if (call != undefined) {
            _checkFunction(call)(this);
        }
        return true;
    };
    CollProto._JT_exist = NodeProto._JT_exist = ArrProto._JT_exist = function (call, callf) {
        if (this.length > 0) {
            if (this.length == 1) {
                _checkFunction(call)(this[0]);
            } else {
                _checkFunction(call)(this);
            }
            return true;
        }
        _checkFunction(callf)();
        return false;
    };

    function _getUrlParam() {
        var search = '';
        if (location.search != '') {
            search = location.search.substring(1)
        } else if (location.hash._JT_has('?')) {
            search = location.hash.substring(location.hash.indexOf("?") + 1);
        }
        if (search == '') {
            return null
        } else {
            var d = decodeURI(search).split("&");
            var a = {};
            for (var c = 0; c < d.length; c++) {
                var b = d[c].split("=");
                a[b[0]] = b[1]
            }
            return a
        }
    };

    EleProto._JT_content = function (a) {
        if (this.tagName == "INPUT" || this.tagName == "TEXTAREA" || this.tagName == "SELECT") {
            if (a == undefined && arguments.length == 0) {
                return this.value
            } else {
                try {
                    this.value = _checkArg(a, "")
                } catch (e) {

                }
            }
        } else {
            if (a == undefined && arguments.length == 0) {
                return this.innerText
            } else {
                this.innerText = _checkArg(a, "")
            }
        }
        return this
    };



    _JT.tag("head")._JT_append(_JT.ct("style")._JT_txt(".jet-hide{display:none!important}.jet-unpass{border-color:#f20!important;border-style:solid!important;background-color:rgba(255,0,0,.1)!important;color:red!important}"));
    function _throw(err) {
        throw new Error(err);
    }
    function _warn(info) {
        console.warn('JET warning:\r\n  ' + info);
    }
    function _isUd(o) {
        return (typeof o === 'undefined');
    }
    var _domSatte = {
        ready: (function () {
            var b = [];
            var d = false;
            var jet = null;
            function c(g) {
                if (d) {
                    return
                }
                if (g.type === "onreadystatechange" && document.readyState !== "complete") {
                    return
                }
                for (var f = 0; f < b.length; f++) {
                    b[f].call(jet)
                }
                d = true;
                b = null
            }
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", c, false);
                document.addEventListener("readystatechange", c, false);
                window.addEventListener("load", c, false)
            } else {
                if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", c);
                    window.attachEvent("onload", c)
                }
            }
            return function a(e, j) {
                jet = j;
                if (d) {
                    e.call(jet)
                } else {
                    b.push(e)
                }
            }
        })(),
        load: function (a, jet) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function () {
                    document.removeEventListener("DOMContentLoaded", arguments, false);
                    a.call(jet)
                }, false)
            } else {
                if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", function () {
                        if (document.readyState == "complete") {
                            document.detachEvent("onreadystatechange", arguments);
                            a.call(jet)
                        }
                    })
                }
            }
        }
    }
})()