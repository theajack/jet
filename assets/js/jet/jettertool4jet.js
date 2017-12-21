
/*Jetter.js
  by theajack
  2017/3/18
  http://www.theajack.com/jetterjs/
*/

  var _JT = {
    cls: function(a) {
      return _checkSelect(document.getElementsByClassName(a))
    },
    id: function(a) {
      return _checkSelect(document.getElementById(a))
    },
    tag: function(a) {
      return _checkSelect(document.getElementsByTagName(a))
    },
    attr: function(a) {
      return _checkSelect(document.querySelectorAll("[" + a + "]"))
    },
    name: function(a) {
      return _checkSelect(document.getElementsByName(a))
    },
    select: function(a) {
      return _checkSelect(document.querySelectorAll(a))
    },
    body: function() {
      return document.body
    },
    type:_type,
    ct: _create,
    ajax:_ajax,
    load:_load,
    html5:function(){
      if (window.applicationCache) {
        return true;
      }
      return false;
    },
    urlParam: _getUrlParam
  };
  function _ajax(a) {
      var b = {
        type: a.type || "GET",
        url: a.url || "",
        async: a.async || "true",
        data: a.data || null,
        dataType: a.dataType || "text",
        contentType: a.contentType || "application/x-www-form-urlencoded",
        beforeSend: a.beforeSend ||function() {},
        success: a.success ||function() {},
        error: a.error ||function() {}
      };
      b.beforeSend();
      var c;
      if (window.ActiveXObject) {
        c = ActiveXObject("Microsoft.XMLHTTP")
      } else if (window.XMLHttpRequest) {
        c =new XMLHttpRequest()
      }
      c.open(b.type, b.url, b.async);
      c.responseType = b.dataType;
      c.setRequestHeader("Content-Type", b.contentType);
      //header
      c.send(_convertData(b.data));
      c.onreadystatechange = function() {
        if (c.readyState == 4) {
          if (c.status == 200) {
            b.success(c.response)
          } else {
            b.error()//errInfo
          }
        }
      }
    };
  function _load(name,call,ecall){
    _JT.ajax({ 
      url : name, 
      async:true,
      success : function(result){ 
        call(result);
      },
      error : function(err){ 
        if(ecall!=undefined)
          ecall(err);
        throw new Error("加载失败");
      },
    })
  };
  function _create(a) {
    return document.createElement(a)
  };
  function _convertData(a) {
    if(a==undefined){
      return "";
    }
    if (_JT.type(a)=="json") {
      var b = "";
      for (var c in a) {
        b += c + "=" + a[c] + "&"
      }
      b = b.substring(0, b.length - 1);
      return b
    } /*else if(_JT.type(a)=="formdata"){
      if(a.entries!=undefined){
        var b = "";
        for (var i of a.entries()) {
          b += i[0] + "=" + i[1] + "&"
        }
        b = b.substring(0, b.length - 1);
        return b
      }
      return a;
    }*/else{
      return a;
    }
  }
  function _checkFunction(a){
    if(a==undefined){
      return function(){};
    }else{
      var b=_JT.type(a);
      if(b=="function"){
        return a;
      }else if(b=="string"){
        return new Function(a);
      }else{
        return function(){};
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
    if(b==null||b==undefined){
      return [];
    }else if (b.length == 1) {
      return b[0]
    }
    return b
  };
  
  HTMLElement.prototype._JT_css = function(d, a) {
    if (a == undefined) {
      if (_JT.type(d)=="json") {
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
    if (d._JT_has("-=")||d._JT_has("+=")) {
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

  function _checkStyleName(b) {
    var a = b.split("-");
    if (a.length <= 1) {
      return b
    } else {
      var c = a[0];
      for (var i = 1; i < a.length; i++) {
        c += (a[i].charAt(0).toUpperCase() + a[i].substring(1))
      }
      return c
    }
  };
  HTMLElement.prototype._JT_attr = function(c, b) {
    if (b == undefined) {
      if (_JT.type(c)=="json") {
        for (var a in c) {
          this.setAttribute(a, c[a])
        }
        return this
      } else {
        return this.getAttribute(c)
      }
    } else {
      this.setAttribute(c, b);
      return this
    }
  };
  HTMLCollection.prototype._JT_attr = NodeList.prototype._JT_attr = function(d, c) {
    if (c == undefined && _JT.type(d)!="json") {
      var a = [];
      this._JT_each(function(b) {
        a._JT_append(b._JT_attr(d))
      });
      return a
    } else {
      this._JT_each(function(a) {
        a._JT_attr(d, c)
      });
      return this
    }
  };
  HTMLElement.prototype._JT_hasAttr = function(a) {
    return this.hasAttribute(a)
  };
  HTMLElement.prototype._JT_removeAttr = function(b) {
    var c = b.split(" ");
    if (c.length > 1) {
      var d = this;
      c._JT_each(function(a) {
        d.removeAttribute(a)
      })
    } else {
      this.removeAttribute(b)
    }
    return this
  };
  HTMLCollection.prototype._JT_removeAttr = NodeList.prototype._JT_removeAttr = function(b) {
    this._JT_each(function(a) {
      a._JT_removeAttr(b)
    });
    return this
  };
  HTMLElement.prototype._JT_findTag = function(a) {
    return _checkSelect(this.getElementsByTagName(a))
  };
  HTMLElement.prototype._JT_findAttr = function(a) {
    return _checkSelect(this.querySelectorAll("[" + a + "]"))
  };
  HTMLElement.prototype._JT_select = function(a) {
    return _checkSelect(this.querySelectorAll(a))
  };
  HTMLElement.prototype._JT_addClass = function(a) {
    if(a._JT_has(" ")){
      var b = a.split(" ");
      var c = this;
      b._JT_each(function(i) {
        c._JT_addClass(i)
      });
    }else {
      if(_JT.html5()){
        this.classList.add(a)
      }else{
        if (!this._JT_hasClass(a)) {
          this.className += " " + a
        }
      }
    }
    return this
  };
  HTMLCollection.prototype._JT_addClass = NodeList.prototype._JT_addClass = function(a) {
    this._JT_each(function(b) {
      b._JT_addClass(a)
    });
    return this
  };
  HTMLElement.prototype._JT_removeClass = function(a) {
    if (a == undefined) {
      this.className = ""
    } else {
      if(a._JT_has(" ")){
        var c = a.split(" ");
        var d = this;
        c._JT_each(function(i) {
          d._JT_removeClass(i)
        })
      }else {
        if(_JT.html5()){
          this.classList.remove(a)
        }else{
          if (this._JT_hasClass(a)) {
            var b = new RegExp("(\\s|^)" + a + "(\\s|$)");
            this.className = this.className.replace(b, " ").trim()
          }
        }
      }
    }
    return this
  };
  HTMLCollection.prototype._JT_removeClass = NodeList.prototype._JT_removeClass = function(a) {
    this._JT_each(function(b) {
      b._JT_removeClass(a)
    });
    return this
  };
  HTMLElement.prototype._JT_val = function(a) {
    if (a == undefined && arguments.length == 0) {
      return this.value
    } else {
      if (this.tagName == "INPUT" || this.tagName == "TEXTAREA"||this.tagName == "SELECT") {
        this.value = _checkArg(a, "")
      }
      return this
    }
  };
  HTMLCollection.prototype._JT_val = NodeList.prototype._JT_val = function(v) {
    if (v == undefined) {
      var a = [];
      this._JT_each(function(b) {
        a._JT_append(b._JT_val())
      });
      return a
    } else {
      this._JT_each(function(b) {
        b._JT_val(v)
      });
      return this
    }
  };
  HTMLElement.prototype._JT_txt = function(a) {
    if (a == undefined && arguments.length == 0) {
      return this.innerText
    } else {
      this.innerText = _checkArg(a, "");
      return this
    }
  };
  HTMLCollection.prototype._JT_txt = NodeList.prototype._JT_txt = function(v) {
    if (v == undefined && arguments.length == 0) {
      var a = [];
      this._JT_each(function(b) {
        a._JT_append(b._JT_txt())
      });
      return a
    } else {
      this._JT_each(function(b) {
        b._JT_txt(v)
      });
      return this
    }
  };

  HTMLElement.prototype._JT_html = function(a) {
    if (a == undefined) {
      return this.innerHTML
    } else {
      this.innerHTML = a;
      return this
    }
  };
  HTMLCollection.prototype._JT_html = NodeList.prototype._JT_html = function(v) {
    if (v == undefined) {
      var a = [];
      this._JT_each(function(b) {
        a._JT_append(b._JT_html())
      });
      return a
    } else {
      this._JT_each(function(b) {
        b._JT_html(v)
      });
      return this
    }
  };
  HTMLElement.prototype._JT_allHtml = function(a) {
    if (a == undefined) {
      return _JT.ct("div")._JT_append(this._JT_clone())._JT_html();
    } else {
      var index=this._JT_index();
      var par=this._JT_parent()._JT_append(a,index);
      this._JT_remove();
      return par._JT_child(index);
    }
  };
  HTMLCollection.prototype._JT_allHtml = NodeList.prototype._JT_allHtml = function(v) {
    var a = [];
    this._JT_each(function(b) {
      a._JT_append(b._JT_allHtml(v))
    });
    return a
  };
  HTMLElement.prototype._JT_hasClass = function(a) {
    if(_JT.html5()){
      return this.classList.contains(a);
    }
    return new RegExp("(\\s|^)" + a + "(\\s|$)").test(this.className)
  };
  HTMLElement.prototype._JT_next = function(i) {
    if (i != undefined) {
      return this._JT_parent()._JT_child(this._JT_index() + i)
    } else {
      return this._JT_parent()._JT_child(this._JT_index() + 1)
    }
  };
  HTMLElement.prototype._JT_prev = function(i) {
    if (i != undefined) {
      return this._JT_parent()._JT_child(this._JT_index() - i)
    } else {
      return this._JT_parent()._JT_child(this._JT_index() - 1)
    }
  };

  function _checkArg(a, b) {
    return (a == undefined) ? b : a
  };
  HTMLElement.prototype._JT_child = function(i) {
    if (i == undefined) {
      return this.children
    } else {
      return this.children[i]
    }
  };
  HTMLElement.prototype._JT_clone = function() {
    return this.cloneNode()._JT_html(this._JT_html());
  };
  HTMLElement.prototype._JT_parent = function(i) {
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
  HTMLElement.prototype._JT_prepend = function(a) {
    var t=_JT.type(a);
    if (t=="array"||t=="htmlcollection"||t=="nodelist") {
      var b = this;
      a._JT_each(function(item) {
        b.insertBefore(_checkHtmle(item), b.children[0])
      })
    } else if(t=="string"){
      this.insertBefore(_checkHtmle(a),this.children[0])
    }else{
      this.insertBefore(_checkHtmle(a), this.children[0])
    }
    return this
  };
  HTMLCollection.prototype._JT_prepend = NodeList.prototype._JT_prepend = function(a) {
    this._JT_each(function(c) {
      c._JT_prepend(a)
    });
    return this
  };
  HTMLElement.prototype._JT_append = function(b, a) {
    if (a == undefined) {
      var type=_JT.type(b);
      if (type=="array"||type=="htmlcollection"||type=="nodelist") {
        for(var i=0;i<b.length;i++){
          this._JT_append(b[i]);
        }
      } else if(type=="string"){
        this._JT_append(_checkHtmle(b))
      }else{
        this.appendChild(_checkHtmle(b))
      }
    } else {
      this.insertBefore(_checkHtmle(b), this.children[a])
    }
    return this
  };
  HTMLElement.prototype._JT_toArray=function(){
    return [this];
  };
  HTMLCollection.prototype._JT_toArray = NodeList.prototype._JT_toArray = function() {
    var a=[];
    for(var i=0;i<this.length;i++){
      a.push(this[i])
    }
    return a
  };
  function _checkHtmle(a){
    if(_JT.type(a)=="string"){
      var e=_JT.ct("div")._JT_html(a);
      if(e._JT_child().length==1){
        return e._JT_child(0);
      }else{
        return e._JT_child()._JT_toArray();
      }
    }
    return a;
  };
  HTMLCollection.prototype._JT_append = NodeList.prototype._JT_append = function(b, a) {
    this._JT_each(function(c) {
      c._JT_append(b, a)
    });
    return this
  };
  HTMLElement.prototype._JT_index = function() {
    var a = this._JT_parent()._JT_child();
    for (var i = 0; i < a.length; i++) {
      if (a[i] == this) {
        return i
      }
    }
    return -1
  };
  HTMLElement.prototype._JT_on = function(a, b,d) {
    if(_JT.type(a)=="string"){
      return this._JT_event("on"+a,b,d);
    }else{
      for (var c in a) {
        a["on"+c]=a[c];
        delete a[c];
      }
      return this._JT_event(a,b);
    }
  };
  HTMLCollection.prototype._JT_on = NodeList.prototype._JT_on = function(a, c,d) {
    this._JT_each(function(b) {
      b._JT_on(_JT.clone(a), c,d)
    });
    return this
  };
  HTMLElement.prototype._JT_clk = function(b,d) {
    return this._JT_event("onclick",b,d);
  };
  HTMLCollection.prototype._JT_clk = NodeList.prototype._JT_clk = function(a, c) {
    this._JT_each(function(b) {
      b._JT_clk(a, c)
    });
    return this
  };
  
  HTMLElement.prototype._JT_event = function(a, b,d) {
    if(_JT.type(a)=="string"){
      if(d==true){
        _attachEvent(this,a,b);
      }else{
        this[a]=_checkFunction(b);
      }
    }else{
      for (var c in a) {
        if (a[c] != undefined) {
          if(b==true){
            _attachEvent(this,c,a[c]);
          }else{
            this[c]=_checkFunction(a[c]);
          }
        }
      }
    }
    return this
  };
  function _attachEvent(obj,event,fun){
    if (document.addEventListener) {
      obj.addEventListener(event.substring(2), _checkFunction(fun), false);
    } else if (document.attachEvent) {
      obj.attachEvent(event,  _checkFunction(fun));
    }
  };
  HTMLCollection.prototype._JT_event = NodeList.prototype._JT_event = function(a, c,d) {
    this._JT_each(function(b) {
      b._JT_event(a, c,d)
    });
    return this
  };
  HTMLElement.prototype._JT_empty = function() {
    return this._JT_html("")
  };
  HTMLCollection.prototype._JT_empty = NodeList.prototype._JT_empty = function() {
    this._JT_each(function(a) {
      a._JT_empty()
    });
    return this
  };
  HTMLElement.prototype._JT_remove = function() {
    this.parentNode.removeChild(this)
  };
  HTMLCollection.prototype._JT_remove = NodeList.prototype._JT_remove = function(a) {
    if (a == undefined) {
      for (var i = 0; i < this.length;) {
        this[i]._JT_remove()
      }
    } else {
      if (_JT.type(a)=="number") {
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
  HTMLElement.prototype._JT_each = function(b,d) {
    b(this, 0,d);
    return this
  };
  HTMLCollection.prototype._JT_each = NodeList.prototype._JT_each = function(b,d) {
    var arr=this._JT_toArray();//removeClass 情况下
    for (var a = 0; a < arr.length; a++) {
      b(arr[a], a,d)
    }
    return this
  };
  Array.prototype._JT_each = function(b,d) {
    for (var a = 0; a < this.length; a++) {
      b(this[a], a,d)
    }
    return this
  };
  Array.prototype._JT_empty = function(b) {
    this.length = 0;
    return this;
  };
  HTMLElement.prototype._JT_last =function(){
    return this._JT_child()._JT_last();
  };
  HTMLElement.prototype._JT_first =function(){
    return this._JT_child()._JT_first();
  };
  HTMLCollection.prototype._JT_last = NodeList.prototype._JT_last =Array.prototype._JT_last = function(b) {
    return this[this.length-1];
  };
  HTMLCollection.prototype._JT_first = NodeList.prototype._JT_first =Array.prototype._JT_first = function(b) {
    return this[0];
  };
  Array.prototype._JT_remove = function(b,order) {
    var index=this.indexOf(b)
    if(order==false){
      this[a]=this[this.length--];
    }else{
      this._JT_removeByIndex(index);
    }
    return this
  };
  Array.prototype._JT_removeByIndex = function(b) {
    this.splice(b,1);
    return this
  };
  Array.prototype._JT_insert = function(b, i) {
    this.splice(i,0,b);
    return this
  };
  Array.prototype._JT_insertArray = function(arr,i) {
    var index=i;
    var n=arr.length;
    for (var a = this.length - 1; a >= index; a--) {
      this[a + n] = this[a]
    }
    for(var j=0;j<n;j++){
      this[index+j] = arr[j];
    }
    return this
  };
  Array.prototype._JT_append = function() {
    Array.prototype.push.apply(this,arguments)
    return this
  };
  Array.prototype._JT_prepend = function(b) {
    if(arguments.length==1){
      return this._JT_insert(b, 0)
    }else{
      return this._JT_insertArray(arguments, 0)
    }
  };
  function _each(obj,fun,arg){
    var type=_JT.type(obj);
    if(type=="json"||type=="object"){
      var k=0;
      for (var a in obj) {
        if(_JT.type(obj[a])!="function"){
          fun(obj[a], a,k,obj)
        }
        k++;
      }
    }else if(type=="number"||type=="boolean"||type=="string"||type=="function"){
      fun(obj, 0,arg);
    }else{
      obj._JT_each(fun,arg);
    }
    return obj;
  };
  function _type(obj){
    if(arguments.length==0){
      throw new Error("This function need a argument");
    }else{
      var type=typeof obj;
      if(type=="object"){
        if(obj===null){
          return "null";
        }else{
          var con = obj.constructor;
          switch(con){
            case Object:type="json";break;
            case Array:type="array";break;
            case HTMLCollection:type="htmlcollection";break;
            case NodeList:type="nodelist";break;
            case FormData:type="formdata";break;
            case Error:type="error";break;
            case Date:type="date";break;
            default:if(con.toString()._JT_has("HTML")){
                      type="htmlelement";
                    }else{
                      type="object";
                    };break;
          }
        }
      }
      return type;
    }
  };
  String.prototype._JT_has = function(s) {
    if (_JT.type(s)=="string") {
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
  String.prototype._JT_replaceAll = function(a, b) {
    if (_JT.type(b)=="array") {
      if (_JT.type(a)=="string") {
        var s = this.split(a);
        var d = s[0];
        s._JT_each(function(a, i) {
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
          g._JT_each(function(a, i) {
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
      if (_JT.type(a)=="string") {
        return this.replace(new RegExp(a, "g"), b)
      } else {
        return this.replace(a, b)
      }
    }
  };
  


  HTMLElement.prototype._JT_exist = function(call,callf){
    if(call!=undefined){
      _checkFunction(call)(this);
    }
    return true;
  };
  HTMLCollection.prototype._JT_exist = NodeList.prototype._JT_exist= Array.prototype._JT_exist= function(call,callf){
    if(this.length>0){
      if(this.length==1){
        _checkFunction(call)(this[0]);
      }else{
        _checkFunction(call)(this);
      }
      return true;
    }
    _checkFunction(callf)();
    return false;
  };
  
  function _getUrlParam() {
    var search='';
    if(location.search!=''){
      search=location.search.substring(1)
    }else if(location.hash._JT_has('?')){
      search=location.hash.substring(location.hash.indexOf("?")+1);
    }
    if (search=='') {
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

  HTMLElement.prototype._JT_content = function(a) {
    if (this.tagName == "INPUT" || this.tagName == "TEXTAREA"|| this.tagName == "SELECT") {
      if (a == undefined && arguments.length == 0) {
        return this.value
      } else {
        try{
          this.value = _checkArg(a, "")
        }catch(e){
          
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
  
  

 _JT.tag("head")._JT_append(_JT.ct("style")._JT_txt(".jet-hide{display:none}.jet-unpass{border-color:#f20!important;border-style:solid!important;background-color:rgba(255,0,0,.1)!important;color:red!important}"));
   
