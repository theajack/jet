
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
   
/*define*********************************************************************************/

function _define(obj,data,calls) {
  if(!calls._func)calls._func=[];
  for(var k in data){
    _defineCom(obj,k,data,calls);
  }
}
function _defineArray(obj,data,calls){
  _defineArrayFormIndex(obj,data,calls);
}
function _defineArrayFormIndex(obj,data,calls,index){
  if(!calls._func)calls._func=[];
  for(var k=index||0;k<data.length;k++){
    _defineCom(obj,k,data,calls);
  }  
}
function _defineCom(obj,k,data,calls){
  var type=_JT.type(data[k]);
  if(type=="json"){
    var _o={};
    if(!calls[k])calls[k]={};
    _defineBase(obj,data,k,_o,calls[k])
    _define(_o,data[k],calls[k]);
  }else if(type=='array'){
    var _o=[];
    if(!calls[k])calls[k]=[];
    _defineBase(obj,data,k,_o,calls[k]);
    _defineArray(_o,data[k],calls[k]);
  }else{
    if(!calls[k]||!calls[k]._func)calls[k]={_func:[]};
    defineFinal(obj,data,k,calls[k])
  }
}
function _defineBase(obj,data,key,temp,calls){
  Object.defineProperty(obj, key, {
    configurable:true,
    get: function () {
      return temp;
    },
    set: function (val) {
      data[key] = val;
      _copyValue(temp,val,calls);
      calls._func._JT_each(function(call){
        call(key,val);
      })
    }
  })
}
function defineFinal(obj,data,key,calls){
  Object.defineProperty(obj, key, {
    configurable:true,
    get: function () {
      if(data[key].type==_lang){
        return data[key].data[Jet.lang.name]
      }else{
        return data[key];
      }
    },
    set: function (val) {
      if(data[key].type==_lang){
        data[key].data[Jet.lang.name]=val;
      }else{
        data[key] = val;
      }
      calls._func._JT_each(function(call){
        call(key,val);
      })
    }
  })
}

function _copyValue(a,b,calls){
  if(_checkType(a,b)=='json'){
    _copyValueJson(a,b,calls);
  }else{
    _copyValueArr(a,b,calls);
  }
}
function _copyValueJson(a,b,calls){
  for(var k in b){
    _copyCom(a,b,k,calls);
  }
}
function _copyValueArr(a,b,calls){
  for(var k=0;k<b.length;k++){
    _copyCom(a,b,k,calls);
  }
}
function _copyCom(a,b,k,calls){
  if(a[k]){
    var t=_JT.type(a[k]);
    if(t=='json'){
      _copyValueJson(a[k],b[k],calls[k]);
    }else if(t=='array'){
      _copyValueArr(a[k],b[k],calls[k]);
    }else{
      a[k]=b[k];
    }
  }else{
    _defineCom(a,k,b,calls)
  }
}

function _checkType(a,b){
  var a_t=_JT.type(a);
  var b_t=_JT.type(b);
  if(a_t!=b_t){
    _throw('不允许前后设置的值类型不一致');
  }
  return a_t;
}
/*jet*********************************************************************************/
//

// j-bind
// j-for
// j-switch
// j-case
// j-input  j-type
// j-text 
// $each
// $index
// $value

// j-if = exp:class[a,b|b];attr[a=b,a=b|a];func
// $  class[a|b]  attr[a|b]  function
// j-on 
// j-run

var _bind="J",
  _for="Jfor",
  _input="Jinput",
  _text="Jtext",
  _if="Jif",
  _on="Jon",
  _run="Jrun",
  _each="$each",
  _value="$value",
  _index="$index";
function _throw(err){
  throw new Error(err);
}
function _log(info){
  console.log(info);
}
window.Jet=function(opt){
  this._tools={
    _jets:[],
    _jetTools:[],
    _calls:{},
    _data:opt.data
  }
  _define(this,opt.data,this._tools._calls);
  if(opt.func){
    for(var key in opt.func){
      if(this[key]){
        _throw('data 不能与 func 有重名属性');
      }else{
        this[key]=opt.func[key]
      }
    }
  }
  _initJet.call(this,opt,this._tools._calls);
  if(opt.ready)
    opt.ready.call(this);
};Jet.prototype.get=function(){
  return this;
}

function _initJet(opt,calls){
  var _this=this;
  var bindList,ifList,onList,runList;
  if(opt.ele){
    bindList=opt.ele._JT_findAttr(_bind);
    ifList=opt.ele._JT_findAttr(_if);
    onList=opt.ele._JT_findAttr(_on);
    runList=opt.ele._JT_findAttr(_run);
  }else{
    bindList=_JT.attr(_bind);
    ifList=_JT.attr(_if);
    onList=_JT.attr(_on);
    runList=_JT.attr(_run);
  }
  var temp=[];
  var dom=document.createDocumentFragment();
  bindList._JT_each(function(item,index){
    temp.push({
      par:item._JT_parent(),
      index:item._JT_index(),
      item:item
    });
  });
  bindList._JT_each(function(item,index){
    if(!item._hasBind){
      dom.appendChild(item);
      var attr=item._JT_attr(_bind);
      if(opt.data==undefined||attr==''){
        var _opt=_jetOpt(_this,item,attr,{_func:[]});
        item.__isRoot=true;
        _this._tools._jets.push(new Jet.Bind(_opt));
      }else if(opt.data[attr]){
        var type=_JT.type(opt.data[attr]);
        var _opt=_jetOpt(_this,item,attr,calls[attr]);
        var _jet;
        switch(type){
          case 'json':_jet=new Jet.Bind(_opt);break;
          case 'array':_jet=new Jet.For(_opt);break;
          default:{
            if(isInput(item)){
              _jet=new Jet.Input(_opt);
            }else{
              _jet=new Jet.Text(_opt);
            }
          };break;
        }
        item.__isRoot=true;//为了记录根元素的初始位置，忽略非根元素
        _this._tools._jets.push(_jet);
      }else{
        _throw('原数据没有'+attr+'属性');
      }
    }
  });
  
  ifList._JT_each(function(item){
    if(!item._hasIf){
      _this._tools._jetTools.push(new Jet.If(_jetOpt(_this,item)));
    }
  });
  onList._JT_each(function(item){
    if(!item._hasOn){
      _this._tools._jetTools.push(new Jet.On(_jetOpt(_this,item)));
    }
  });
  runList._JT_each(function(item){
    if(!item._hasRun){
      _this._tools._jetTools.push(new Jet.Run(_jetOpt(_this,item)));
    }
  });
  temp._JT_each(function(json){
    if(json.item.__isRoot==true)
      json.par._JT_append(json.item,json.index);
  });
  Jet.$.id('__preload_j')._JT_remove();
};


function _jetOpt(_this,item,name,calls){
  return {
    jet:_this,
    par:_this,
    ele:item,
    data:_this,
    _data:_this._tools._data,
    name:name,
    calls:calls||_this._tools.calls
    //indexs:[]
  };
}
function isInput(obj){
  var tag=obj.tagName;
  return (tag=="INPUT"||tag=="TEXTAREA"||tag=="SELECT"||(obj._JT_hasAttr('contenteditable')&&obj.attr('contenteditable')!='false'))
}
Jet.Base=function(opt,type){
  this.jet=opt.jet;
  this.par=opt.par;
  this.ele=opt.ele;
  this._data=opt._data;
  this.data=opt.data;
  this.type=type;
  this.name=opt.name;
  this.index=opt.index;
  //this.indexs=opt.indexs;
  this._tools={
    _jets:[],
    _jetTools:[],
    _calls:opt.calls
  }
  switch(this.type){
    case _if:this.ele._hasIf=true;break;
    case _on:this.ele._hasOn=true;break;
    case _run:this.ele._hasRun=true;break;
    default:this.ele._hasBind=true;break;
  }
};Jet.Base.prototype.regist=function(name,call){
  if(arguments.length==2){
    if(!this._tools._calls[name]){
      _throw('没有'+name+'属性');
    }
    if(_JT.type(call)!='function'){
      _throw('call参数必须为函数');
    }
    this._tools._calls[name]._func.push(call);
  }else{
    if(_JT.type(name)!='function'){
      _throw('call参数必须为函数');
    }
    this._tools._calls._func.push(name);
  }
};
Array.prototype.$push=function(d){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data.push(d);
  _defineCom(data,data.length,_data,_f._tools._calls);
  _f.refresh.push.call(_f);
};Array.prototype.$pushArray=function(arr){
  var _this=this;
  arr._JT_each(function(item){
    _this.$push(item)
  });
};Array.prototype.$prep=function(d){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data._JT_prepend(d);
  _f._tools._calls._JT_prepend({});
  _defineArray(data,_data,_f._tools._calls);
  _f.refresh.prep.call(_f);
};Array.prototype.$prepArray=function(arr){
  this.$insertArray(arr,0);
};Array.prototype.$insert=function(d,index){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data._JT_insert(d,index);
  _f._tools._calls._JT_insert({},index);
  _defineArrayFormIndex(data,_data,_f._tools._calls,index);
  _f.refresh.insert.call(_f,index);
};Array.prototype.$insertArray=function(arr,index){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data._JT_insertArray(arr,index);
  var calls=[];
  arr._JT_each(function(){
    calls.push({});
  });
  _f._tools._calls._JT_insertArray(calls,index);
  _defineArrayFormIndex(data,_data,_f._tools._calls,index);
  _f.refresh.insertArray.call(_f,arr,index);
};Array.prototype.$remove=function(i,n){
  n=n||1;
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data.splice(i,n);
  _f._tools._calls.splice(i,n);
  _defineArrayFormIndex(data,_data,_f._tools._calls,i);
  data.length-=n;
  _f.refresh.remove.call(_f,i,n);
};


function _checkJetTools(opt){
  var arr=this._tools._jetTools;
  if(this.ele._JT_hasAttr(_on)){
    if(!this.ele._hasOn){
      arr.push(new Jet.On(opt));
    }
  }
  if(this.ele._JT_hasAttr(_run)){
    if(!this.ele._hasRun){
      arr.push(new Jet.Run(opt));
    }
  }
  if(this.ele._JT_hasAttr(_if)){
    if(!this.ele._hasIf){
      arr.push(new Jet.If(opt));
    }
  }
}
Jet.$=_JT;

  
  
  Jet.Run=function(opt){
  Jet.Base.call(this,opt,_run);
  _initRun.call(this,opt)
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.Run.prototype = new Super();
})();Jet.Run.prototype.get=function(){
  if(this.index!=undefined){
    return this.index;
  }
  if(this.data==undefined){
    return null;
  }else{
    return this.data[this.name];
  }
};Jet.Run.prototype.refresh=function(i){
  if(this.index!=undefined&&i!=undefined&&this.index!=i){
    this.index==i;
  }
  this.run();
};Jet.Run.prototype.run=function(){
  var _this=this;
  this.runs._JT_each(function(name){
    _this.jet[name].call(_this.jet,{
      ele:_this.ele,
      data:_this.get(),
      jet:_this
    });
  });
};
function _initRun(opt){
  this.runs=this.ele._JT_attr(_run).split(",");
  this.run();
}
  
  
/*load*********************************************************************************/

var _load="Jload";
Jet.load={
  init:function(obj){
    var data={};
    var list;
    if(obj==undefined){
      list=_JT.attr(_load);
    }else{
      list=obj._JT_findAttr(_load)
    }
    list._JT_each(function(item){
      var attr=item._JT_attr(_load);
      _JT.load(Jet.router.conf.html+attr,function(html){
        var out=item._JT_html(html);
        _loadCompScript(out,attr);
        _loadCompStyle(out,attr);
        Jet.load.init(item);
        Jet.valid.init(item);
        Jet.lang.init(item);
      });
    });
  }
}

function _loadCompScript(out,attr){
  var script=_JT.attr('load-script="'+attr+'"');
  if(!script._JT_exist()){
    script=_JT.ct('script')._JT_attr({
      'load-script':attr,
      'type':'text/javascript'
    });
    var txt=['//# sourceURL='+attr+'.js\r\n'];
    var scripts=out._JT_findTag("script");
    var index=-1;
    for(var i=scripts.length-1;i>=0;i--){
      if(scripts[i]._JT_hasAttr("src")){
        index=i;
        break;
      }
    }
    scripts._JT_each(function(item,i){
      if(item._JT_hasAttr("src")){
        _JT.load(Jet.router.conf.js+item.attr("src"),function(scr){
          txt[i+1]=scr;
          if(i==index){
            script._JT_html(txt.join(''));
            _JT.body()._JT_append(script);
          }
        });
      }else{
        txt[i+1]=item._JT_html();
      }
      item._JT_remove();
    });
    if(index==-1){
      script._JT_html(txt.join(''));
      _JT.body()._JT_append(script);
    }
  }else{
    var txt=script._JT_html();
    script._JT_remove();
    _JT.body()._JT_append(_JT.ct('script')._JT_attr({
      'load-script':attr,
      'type':'text/javascript'
    })._JT_html(txt));
  }
}
function _loadCompStyle(out,attr){
  if(!_JT.attr('load-style="'+attr+'"')._JT_exist()){
    var style=_JT.ct('style')._JT_attr({
      'load-style':attr,
      'type':'text/css'
    });
    _JT.tag('head')._JT_append(style);
    style._JT_empty();
    var txt=[];
    var styles=out._JT_findTag("style");
    var index=-1;
    for(var i=styles.length-1;i>=0;i--){
      if(styles[i]._JT_hasAttr("src")){
        index=i;
        break;
      }
    }
    styles._JT_each(function(item,i){
      if(item._JT_hasAttr("src")){
        _JT.load(Jet.router.conf.css+item._JT_attr("src"),function(css){
          txt[i]=css;
          if(i==index){
            style._JT_html(txt.join(''));
          }
        });
      }else{
        txt[i]=item._JT_html();
      }
      item._JT_remove();
    });
    if(index==-1){
      style._JT_html(txt.join(''));
    }
  }
}
/*valid*********************************************************************************/
var _form='$form',_valid='Jvalid';
//第一个含有 _form 的父元素
Jet.valid={
  init:function(obj){
    Jet.valid.initValid(obj);
  },findValidPar:function(ele){
    var par=ele._JT_parent();
    while(!par._JT_hasAttr(_form)&&par._JT_parent()!=null){
      par=par._JT_parent();
    }
    return par;
  },
  regExp:{
    'null':/^\S{0}$/,
    "date":/^(([12]\d{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|3(0|1))))$/,
    "email":/^((\w*@\w*\.[A-Za-z.]+(\.)?[A-Za-z]+))$/,
    "float":/^-?[1-9]\d*.\d*|0.\d*[1-9]\d*$/,
    "idcard":/^(\d{17}(X|\d))$/,
    "url":/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/,
    "phone":/^([1]\d{10})$/
  },
  validText:{
    CN:{
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
    },EN:{
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
  language:"CHINESE",
  useDefaultStyle: true,
  showInPlaceHolder: false,
  useAlert:false,
  initValid: function(b) {
    var c;
    if (b == undefined) {
      c = _JT.attr(_valid)
    } else {
      c = b._JT_findAttr(_valid)
    }
    c._JT_each(function(a) {
      a._JT_on({
        "blur": "Jet.valid.validInput(this)",
        "focus": "Jet.valid.addValidValue(this)"
      },true)._jet_v_event=true;
      if (Jet.valid.showInPlaceHolder) {
        a._JT_attr("placeholder", _getValueText(a._JT_attr(_valid)))
      }
    })
  },
  validate: function(a, b, c) {
    if (c != undefined) {
      _validateForm(a, b, c)
    } else {
      _validateForm(a, b)
    }
  },
  addValidText: function(a, b) {
    if(_JT.type(a)=="json"&&b==undefined){
      for (var c in a) {
        Jet.valid.addValidText(c,a[c]);
      }
    }else{
      if(Jet.valid.language=="CHINESE"){
        Jet.valid.validText.CN[a]=b;
      }else{
        Jet.valid.validText.EN[a]=b;
      }
    }
  },
  validInput:_validInput,
  addValidValue:_addValidValue,
  onOnePass: function(c) {
    _onOnePass=_checkFunction(c);
  },
  onOneFail: function(c) {
    _onOneFail=_checkFunction(c);
  }
}
var _onOnePass = null,
    _onOneFail = null;
function _checkIsPw(a) {
  if (a._JT_attr("jet-ispw") == "true") {
    a._JT_attr("type", "password")
  }
};

HTMLElement.prototype._JT_validate = function(s, f) {
  _validateForm(this, s, f)
};
function _validInput(b, a) {
  var v = b._JT_attr(_valid);
  var c = "";
  if(v!=null){
    if (v.indexOf("lengthOfAny") != -1) {
      var e = v.substring(12, v.length - 1).split(",");
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
      if (Jet.valid.useDefaultStyle) {
        b._JT_removeClass("jet-unpass");
        b._JT_validValue=undefined;
        _checkIsPw(b)
      }
      if (_onOnePass != undefined) _onOnePass(b, c)
    } else {
      if (Jet.valid.useDefaultStyle) {
        b._JT_validValue=b._JT_content();
        b._JT_content(c)._JT_addClass("jet-unpass");
        if (b._JT_attr("type") == "password") {
          b._JT_attr("jet-ispw", "true")._JT_attr("type", "text")
        }
      }
      if (_onOneFail != undefined) _onOneFail(b, c);
      if (Jet.valid.useAlert && a != false) {
        alert(c)
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

function _validateForm(g, f, c) {
  var e = [];
  var b = true;
  if (c == undefined) {
    b = false
  }
  var d = true;
  var a = g._JT_findAttr(_valid);
  a._JT_each(function(j) {
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
      _checkFunction(c)(e,g);
    }
    var i = (Jet.valid.language == "CHINESE") ? "输入有误，请按提示改正。" : "Values is not expected";
    if (Jet.valid.useAlert) {
      alert(i)
    } else {
      //alert(i)
    }
  } else {
    if (f != undefined) {
      _checkFunction(f)(g);
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
    if (a[1] == undefined) {
      a[1] = a[0]
    }
    return _getValidText(b.substring(0, c - 1), a)
  } else {
    return _getValidText(b)
  }
};

function _getValidText(a, b) {
  if (Jet.valid.language == "CHINESE") {
    if (b == undefined) {
      return Jet.valid.validText.CN[a]
    } else {
      var c = "";
      if (a._JT_has("number")) {
        c = " 且长度为"
      }
      return Jet.valid.validText.CN[a] + c + "[" + b[0] + "," + b[1] + "]"
    }
  } else {
    if (b == undefined) {
      return Jet.valid.validText.EN[a]
    } else {
      var c = "";
      if (a._JT_has("number")) {
        c = " and length between"
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
  if(f in Jet.valid.regExp){
    return Jet.valid.regExp[f];
  }
  switch (f) {
    case "number":
      if (d >= 0) {
        return new RegExp("^-?(\\d{" + d + "," + c + "})$")
      } else {
        return /^-?(\d+)$/
      }break;
    case "letterStart":return new RegExp("^([a-zA-Z]([a-zA-Z\\d]){" + (parseInt(d) - 1) + "," + (parseInt(c) - 1) + "})$");break;
    case "length":return new RegExp("^(([a-zA-Z\\d]){" + d + "," + c + "})$");break;
    case "express":return new RegExp(d);break;
    default:return "null";break;
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
/*lang*********************************************************************************/
var _lang="Jlang",_name="Jname";
var _jl_name='';
Jet.lang=function(opt){
  this.type=_lang;
  this.data=opt;
}
Jet.lang.list=[];
Jet.lang.use=false;
Jet.lang.conf=function(list){
  if(_JT.type(list)!='array'){
    throw new Error('Jet.lang.init: 参数是一个数组');
  }else{
    this.use=true;
    this.list=list;
    _jl_name=list[0];
  }
};
Jet.lang.jets=[];
Jet.lang.init=function(obj){
  var list;
  if(obj==undefined){
    list=_JT.attr(_lang);
  }else{
    list=obj._JT_findAttr(_lang)
  }
  list._JT_each(function(item){
    item._jet_langs={};
    item._JT_findAttr(_name)._JT_each(function(_item){
      var attr=_item._JT_attr(_name);
      item._jet_langs[attr]=_item._JT_html();
    });
    item._JT_html(item._jet_langs[Jet.lang.name]);
    Jet.valid.initValid(item);
  });
  Jet.$.id('__preload_jl')._JT_remove();
};
Object.defineProperty(Jet.lang, 'name', {
  configurable:true,
  get: function () {
    return _jl_name;
  },
  set: function (val) {
    _jl_name = val;
    _refreshLang();
  }
})
function _refreshLang(){
  if(Jet.lang.use){
    _JT.attr(_lang)._JT_each(function(item){//静态文字
      item._JT_html(item._jet_langs[Jet.lang.name]);
      Jet.valid.initValid(item);
    });
    Jet.lang.jets._JT_each(function(item){//绑定文字
      item.refresh();
    });
  }
}
function _checkLangJet(opt){
  if(_JT.type(opt._data)=='json'&&opt.name in opt._data){
    if(opt._data[opt.name].type==_lang){
      Jet.lang.jets.push(this);
    }
  }
}
window.JL=function(opt){
  return new Jet.lang(opt);
}
/*router*********************************************************************************/
var _route="Jrouter",
  _routeout="Jout",
  _routeScript="JrouteScript",
  _routeStyle="JrouteStyle";
Jet.router={
  use:true,//是否启用路由
  base:"",//根目录，可以是虚拟的也可以是真实的，无需手动设置，在json文件中配置
  trueBase:false,//是真实根还是虚拟根 在json文件中配置
  history:false,//是否启用history # 在json文件中配置
  path:"/",//无需设置，当前的路由路径
  params:null,//get参数
  router:{},
  conf:{
    router:"/assets/router/router.json",
    html:"/src/html/",
    js:"/src/js/",
    css:"/src/css/",
    image:"/src/image/"
  },
  init:function(){
    _JT.attr(_route)._JT_each(function(item){
      item._JT_clk(function(){
        Jet.router.route(this._JT_attr(_route))
      });
    });
  },
  reload:function(){
    if(Jet.router.use){
      _JT.load(Jet.router.conf.router,function(json){
        _initConf(json);
        var url='/home';
        if(!location.pathname._JT_has("index.html")){
          if(Jet.router.history){//pathname+search
            if(location.pathname.length-Jet.router.base.length>1){
              url=location.pathname.substring(Jet.router.base.length)+location.search;
            }
          }else{//# 使用 hash
            if(location.hash.length>2){
              url=location.pathname+location.hash;
              url=url.substring(Jet.router.base.length);
            }
          }
        }
        Jet.load.init();
        Jet.valid.init();
        Jet.lang.init();
        Jet.router.route(url);
      });
      Jet.router.init();
    }
  },
  route:function(url){
    var search='';
    if(url._JT_has('?')){
      search=url.substring(url.indexOf("?"));
      url=url.substring(0,url.indexOf("?"));
    }
    url=_checkUrl(url);
    if(!(url in Jet.router.router)){
      url=Jet.router.base+"/404";
    }
    Jet.router.path=url;
    var stateObject = {};
    var title = url;
    var newUrl = url+search;
    history.pushState(stateObject,title,newUrl);
    Jet.router.params=_JT.urlParam();
    _JT.load(Jet.router.conf.html+Jet.router.router[url],function(html){
      var out=_JT.attr(_routeout)._JT_html(html);
      Jet.load.init(out);
      _loadScript(out);
      _loadStyle(out);
      Jet.valid.init(out);
      Jet.lang.init(out);
    });
  }
};
function _initConf(json){
  var r=new Function("return "+json)();
  if('conf' in r){
    if("history" in r.conf){
      Jet.router.history=r.conf.history;
    }
    if("base" in r.conf){
      Jet.router.base=(r.conf.history)?r.conf.base:r.conf.base+"/#";
      if('trueBase' in r.conf){
        if(r.conf.trueBase){
          for(var k in Jet.router.conf){
            Jet.router.conf[k]=r.conf.base+Jet.router.conf[k];
          }
        }
      }
    }
  }
  for(var k in r.router){
    Jet.router.router[Jet.router.base+k]=r.router[k];
  }
}
function _checkUrl(url){
  if(url[url.length-1]=='/'){
    url=url.substring(0,url.length-1);
  }
  if(url==Jet.router.base){
    url=Jet.router.base+'/home';
  }else{
    if(url[0]!="/"){//相对路径
      url=Jet.router.path+'/'+url
    }else{//绝对路径
      url=Jet.router.base+url;
    }
    
  }
  return url;
}
function _loadScript(out){
  if(_JT.id(_routeScript)._JT_exist()){
    _JT.id(_routeScript)._JT_remove();
  }
  var script=_JT.ct('script')._JT_attr({
    'id':_routeScript,
    'type':'text/javascript'
  });
  var txt=['//# sourceURL=__dynamic.js\r\n'];
  var scripts=out._JT_findTag("script");
  var index=-1;
  for(var i=scripts.length-1;i>=0;i--){
    if(scripts[i]._JT_hasAttr("src")){
      index=i;
      break;
    }
  }
  scripts._JT_each(function(item,i){
    if(item._JT_hasAttr("src")){
      _JT.load(Jet.router.conf.js+item._JT_attr("src"),function(scr){
        txt[i+1]=scr;
        if(i==index){
          script._JT_html(txt.join(''));
          _JT.body()._JT_append(script);
        }
      });
    }else{
      txt[i+1]=item._JT_html();
    }
    item._JT_remove();
  });
  if(index==-1){
    script._JT_html(txt.join(''));
    _JT.body()._JT_append(script);
  }
}

function _loadStyle(out){
  var style=_JT.id(_routeStyle);
  if(!style._JT_exist()){
    style=_JT.ct('style')._JT_attr({
      'id':_routeStyle,
      'type':'text/css'
    });
    _JT.tag('head')._JT_append(style);
  }
  style._JT_empty();
  var txt=[];
  var styles=out._JT_findTag("style");
  var index=-1;
  for(var i=styles.length-1;i>=0;i--){
    if(styles[i]._JT_hasAttr("src")){
      index=i;
      break;
    }
  }
  styles._JT_each(function(item,i){
    if(item._JT_hasAttr("src")){
      _JT.load(Jet.router.conf.css+item._JT_attr("src"),function(css){
        txt[i]=css;
        if(i==index){
          style._JT_html(txt.join(''));
        }
      });
    }else{
      txt[i]=item._JT_html();
    }
    item._JT_remove();
  });
  if(index==-1){
    style._JT_html(txt.join(''));
  }
}

//_JT.ready(function(){
  Jet.router.reload();
//});
/*bind*********************************************************************************/
Jet.Bind=function(opt){
  Jet.Base.call(this,opt,_bind);
  _initBind.call(this,opt);
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.Bind.prototype = new Super();
})();Jet.Bind.prototype.refresh=function(key){
  //if(!key||key==this.name){
    this._tools._jets._JT_each(function(item){
      item.refresh(key);
    });
    this._tools._jetTools._JT_each(function(item){
      item.refresh(key);
    });
  //}
};Jet.Bind.prototype.get=function(){
  return this.data[this.name];
};
function _initBind(opt){
  var _this=this;
  var _data=opt.data[opt.name];
  var bindList=this.ele._JT_findAttr(_bind);
  var ifList=this.ele._JT_findAttr(_if);
  var onList=this.ele._JT_findAttr(_on);
  var runList=this.ele._JT_findAttr(_run);
  bindList._JT_each(function(item,index){
    if(!item._hasBind){
      var attr=item._JT_attr(_bind);
      var _jet;
      if(attr==_value){
        var _opt=_bindOpt(_this,item,_this.name,_this.par._tools._calls[_this.name]);
        _opt.data=_this.data;
        _opt._data=_this._data;
        if(isInput(item)){
          _jet=new Jet.Input(_opt);
        }else{
          _jet=new Jet.Text(_opt);
        }
      }else if(attr==_index||attr._JT_has("$.$p")){
        var _opt=_bindOpt(_this,item,attr,_this.par._tools._calls);
        _opt.index=_this.name;
        if(isInput(item)){
          //_jet=new Jet.Input(_opt);
          _throw('input:不允许将index绑定到输入项中');
        }else{
          if(attr._JT_has("$.$p")){
            if(attr._JT_has('(')){
              _opt._parIndex=parseInt(attr.substring(attr.indexOf('(')+1,attr.indexOf(')')));
            }else{
              _opt._parIndex=attr.timeOf('$p');
            }
          }
          _jet=new Jet.Text(_opt);
        }
      }else{
        if(_data[attr]){
          var type=_JT.type(_data[attr]);
          var _opt=_bindOpt(_this,item,attr,_this._tools._calls[attr]);
          switch(type){
            case 'json':_jet=new Jet.Bind(_opt);break;
            case 'array':_jet=new Jet.For(_opt);break;
            default:{
              if(isInput(item)){
                _jet=new Jet.Input(_opt);
              }else{
                _jet=new Jet.Text(_opt);
              }
            };break;
          }
        }else{
          _throw('原数据没有'+attr+'属性');
        }
      }
      _this._tools._jets.push(_jet);
    }
  });
  ifList._JT_each(function(item){
    if(!item._hasIf){
      _this._tools._jetTools.push(new Jet.If(_bindOpt(_this,item)));
    }
  });
  onList._JT_each(function(item){
    if(!item._hasOn){
      _this._tools._jetTools.push(new Jet.On(_bindOpt(_this,item)));
    }
  });
  runList._JT_each(function(item){
    if(!item._hasRun){
      _this._tools._jetTools.push(new Jet.Run(_bindOpt(_this,item)));
    }
  });
  
  _checkJetTools.call(this,opt);
  
  this.regist(function(key,val){
    _this.refresh();
  });
};
function _bindOpt(_this,item,name,calls){
  return {
    jet:_this.jet,
    par:_this,
    ele:item,
    data:_this.data[_this.name],
    _data:(_this._data==undefined)?null:_this._data[_this.name],
    name:name,
    calls:calls||_this._tools.calls
    //indexs:_this.indexs
  }
}
/*for*********************************************************************************/
Jet.For=function(opt){
  Jet.Base.call(this,opt,_for);
  _initFor.call(this,opt);
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.For.prototype = new Super();
})();Jet.For.prototype.refresh=function(key){
  if(!key||key==this.name){
    this._tools._jets._JT_each(function(item){
      item.refresh(key);
    });
    this._tools._jetTools._JT_each(function(item){
      item.refresh(key);
    });
  }
};Jet.For.prototype.get=function(){
  return this.data[this.name];
};Jet.For.prototype.refreshParIndex=function(){
  this._tools._jets._JT_each(function(item){
    item._tools._jets._JT_each(function(_item){
      if(_item._parIndex&&_item.type==_text){
        _item.refresh();
      }else if(_item.type==_for){
        _item.refreshParIndex();
      }
    });
  });
};Jet.For.prototype.refresh.push=function(){
  if(this._switch){
    var _t=this._data[this.name]._JT_last()[this._type];
    if(_t in this._html){
      this.ele._JT_append(this._html[_t]);
    }else{
      _throw('swicth:指定属性的值不在swicth枚举内');
    }
  }else{
    this.ele._JT_append(this._html);
  }
  var _opt=_forOpt(this,this.ele._JT_child()._JT_last(),this.data[this.name].length-1);
  if(_JT.type(_opt.data[0])=='array'){
    this._tools._jets.push(new Jet.For(_opt));
  }else{
    this._tools._jets.push(new Jet.Bind(_opt));
  }
};Jet.For.prototype.refresh.prep=function(){
  if(this._switch){
    var _t=this._data[this.name]._JT_first()[this._type];
    if(_t in this._html){
      this.ele._JT_prepend(this._html[_t]);
    }else{
      _throw('swicth:指定属性的值不在swicth枚举内');
    }
  }else{
    this.ele._JT_prepend(this._html);
  }
  var _opt=_forOpt(this,this.ele._JT_child()._JT_first(),0);
  if(_JT.type(_opt.data[0])=='array'){
    this._tools._jets._JT_prepend(new Jet.For(_opt));
  }else{
    this._tools._jets._JT_prepend(new Jet.Bind(_opt));
  }
  _refreshIndex.call(this,0);
};
Jet.For.prototype.refresh.insert=function(index){
  if(this._switch){
    var _t=this._data[this.name][index][this._type];
    if(_t in this._html){
      this.ele._JT_append(this._html[_t],index);
    }else{
      _throw('swicth:指定属性的值不在swicth枚举内');
      return;
    }
  }else{
    this.ele._JT_append(this._html,index);
  }
  var _opt=_forOpt(this,this.ele._JT_child(index),index);
  if(_JT.type(_opt.data[0])=='array'){
    this._tools._jets._JT_insert(new Jet.For(_opt),index);
  }else{
    this._tools._jets._JT_insert(new Jet.Bind(_opt),index);
  }
  _refreshIndex.call(this,index+1);
};
Jet.For.prototype.refresh.insertArray=function(arr,index){//bug
  var _this=this;
  var type=_JT.type(arr[0]);
  arr._JT_each(function(item,i){
    var _i=index+i;
    if(_this._switch){
      var _t=_this._data[_this.name][_i][_this._type];
      if(_t in _this._html){
        _this.ele._JT_append(_this._html[_t],_i);
      }else{
        _throw('swicth:指定属性的值不在swicth枚举内');
      }
    }else{
      _this.ele._JT_append(_this._html,_i);
    }
    var _opt=_forOpt(_this,_this.ele._JT_child(_i),_i);
    if(type=='array'){
      _this._tools._jets._JT_insert(new Jet.For(_opt),_i);
    }else{
      _this._tools._jets._JT_insert(new Jet.Bind(_opt),_i);
    }
  });
  _refreshIndex.call(this,index+arr.length);
};
Jet.For.prototype.refresh.remove=function(index,n){
  for(var i=0;i<n;i++){
    this.ele._JT_child(index)._JT_remove();
  }
  this._tools._jets.splice(index,n);
  _refreshIndex.call(this,index);
};
function _refreshIndex(start){
  for(var i=start;i<this._tools._jets.length;i++){
    this._tools._jets[i]._tools._jets._JT_each(function(item){
      if(item.name==_index){
        item.setIndex(i);
      }else if(item.type==_for){
        item.refreshParIndex();
      }
    });
  }
}
function _initForRule(ele){
  if(this.ele._JT_child(0)._JT_attr(_bind)._JT_has('=')){//switch模式
    this._switch=true;
    this._html={};
    this._type=null;
    var _this=this;
    var temp={};
    this.ele._JT_child()._JT_each(function(item){
      var val=item._JT_attr(_bind);
      if(_this._type==null)_this._type=val.substring(val.indexOf('.')+1,val.indexOf('='))
      if(!val._JT_has('='))_throw('swicth:html格式有误');
      val=val.substring(val.indexOf('=')+1);
      _this._html[val]=item._JT_allHtml();
      temp[val]=_JT.ct('div')._JT_append(item);
    });
    for(var i=0;i<this.data[this.name].length;i++){
      var t=this.data[this.name][i][this._type];
      if(t in this._html){
        if(t in temp){
          this.ele._JT_append(temp[t]._JT_child(0));
          delete temp[t];
        }else{
          this.ele._JT_append(this._html[t]);
        }
      }else{
        _throw('swicth:指定属性的值不在swicth枚举内');
      }
    }
  }else{//普通模式
    if(!this.ele._JT_findAttr(_bind+'="'+_each+'"')._JT_exist()){
      var html=this.ele._JT_html();
      this._html='<div '+_bind+'="'+_each+'">'+html+'</div>'
      for(var i=0;i<this.data[this.name].length;i++){
        var each=_JT.ct('div')._JT_attr(_bind,_each);
        if(i==0){
          this.ele._JT_child()._JT_each(function(item){
            each._JT_append(item);
          });
        }else{
          each._JT_html(html);
        }
        this.ele._JT_append(each);
      }
    }else if(this.ele._JT_child().length!=1||this.ele._JT_child(0)._JT_attr(_bind)!=_each){
      _throw('循环元素绑定格式错误！');
    }else{
      var html=this.ele._JT_html();
      this._html=html;
      for(var i=0;i<this.data[this.name].length-1;i++){
        this.ele._JT_append(html);
      }
    }
  }
}
function _initFor(opt){
  var _this=this;
  this.data[this.name]._jet=this;
  _initForRule.call(this);
  this.ele._JT_child()._JT_each(function(item,i){
    if(!item._hasBind){
      var _opt=_forOpt(_this,item,i);
      // _opt.data[_opt.name].$par=_this.data;
      // _opt.data[_opt.name].$index=i;
      var _jet;
      if(_JT.type(_opt.data[0])=='array'){
        _jet=new Jet.For(_opt);
      }else{
        _jet=new Jet.Bind(_opt);
      }
      _this._tools._jets.push(_jet);
    }
  });
  _checkJetTools.call(this,opt);
  this.regist(function(key,val){
    _this.refresh();
  });
};
function _forOpt(_this,item,index){
  return {
    jet:_this.jet,
    par:_this,
    ele:item,
    data:_this.data[_this.name],
    _data:_this._data[_this.name],
    name:index,
    calls:_this._tools._calls[index]
    //indexs:_JT._JT_clone(_this.indexs)._JT_append(index)
  }
}
/*text*********************************************************************************/

Jet.Text=function(opt){
  Jet.Base.call(this,opt,_text);
  this._parIndex=opt._parIndex;//多层循环中的父元素的索引
  opt.par=this;
  _initText.call(this,opt);
};(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.Text.prototype = new Super();
})();Jet.Text.prototype.refresh=function(key){
  if(!key||key==this.name){
    var val=(this.func)?this.func(this.get()):this.get();
    this.ele._JT_txt(val);
  }
};Jet.Text.prototype.get=function(){//indexs
  if(this._parIndex){
    return _getParIndex(this,this._parIndex)
    //return this.indexs[this.indexs.length-1-this._parIndex];
  }else{
    if(this.index!=undefined){
      return this.index;
    }else{
      return this.data[this.name];
    }
  }
};Jet.Text.prototype.setIndex=function(i){//indexs
  this.index=i;
  this.refresh();
  this._tools._jetTools._JT_each(function(item){
    if(item.name==_index){
      item.refresh(i);
    }
  });
};
function _getParIndex(_this,i){
  var par=_this.par;
  while(i>0){
    par=par.par.par;
    i--;
  }
  return par.ele._JT_index();
}
function _initText(opt){
  _checkLangJet.call(this,opt);
  var _this=this;
  if(this.ele._JT_html().trim()!=''){
    this.func=new Function("$",'return '+this.ele._JT_html());
  }
  _checkJetTools.call(this,opt);
  this.regist(function(key,val){
    _this.refresh();
  });
  this.refresh();
}
/*input*********************************************************************************/

Jet.Input=function(opt){
  Jet.Base.call(this,opt,_input);
  opt.par=this;
  _initInput.call(this,opt);
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.Input.prototype = new Super();
})();Jet.Input.prototype.refresh=function(key){
  if(!key||key==this.name){
    var val=(this.func)?this.func(this.get()):this.get();
    this.ele._JT_val(val);
  }
};Jet.Input.prototype.get=function(){
  return this.data[this.name];
};
function _initInput(opt){
  _checkLangJet.call(this,opt);
  var _this=this;
  if(this.ele._JT_val().trim()!=''){
    this.func=new Function("$",'return '+this.ele._JT_val());
  }
  if(this.ele._JT_attr(_bind)==_index){
    _throw('输入框不能绑定数组的索引');
  }
  _checkJetTools.call(this,opt);
  this.regist(function(key,val){
    _this.refresh();
  });
  this.refresh();
  this.isNum=(_JT.type(this.get())=='number');
  this.ele._JT_on("input",function(){
    var val=this._JT_val();
    if(_this.isNum){
      var _v=parseFloat(val);
      if(val==_v.toString())
        val=_v;
    }
    _this.data[_this.name]=val;
  },true);
}
/*if*********************************************************************************/
Jet.If=function(opt){
  this.exp=null;
  this.func_true=null;
  this.func_false=null;
  Jet.Base.call(this,opt,_if);
  _initIf.call(this);
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.If.prototype = new Super();
})();Jet.If.prototype.get=function(){
  if(this.name==_index){
    return this.index;
  }else if(this.name==_value){
    return this.data;
  }else{
    return this.data[this.name];
  }
};Jet.If.prototype.refresh=function(i){
  if(this.index!=undefined&&i!=undefined&&this.index!=i){
    this.index==i;
  }
  var d=this.get();
  var opt={
    ele:this.ele,
    data:d,
    jet:this
  }
  if(this.exp(d)===true){
    this.func_true.call(this.jet,opt);
  }else{
    this.func_false.call(this.jet,opt);
  }
};
function _initIf(){
  var _this=this;
  this.regist(function(key,val){
    _this.refresh();
  });
  var ifAttr=this.ele._JT_attr(_if);
  var temp=ifAttr.substring(0,ifAttr.indexOf(":"));
  temp=temp._JT_replaceAll("\\$","d");
  this.exp=new Function("d","return ("+temp+")");
  ifAttr=ifAttr.substring(ifAttr.indexOf(":")+1);
  var func_t="";
  var func_f="";
  ifAttr.split(";")._JT_each(function(item){//
    if(item._JT_has("class[")){
      var cls=item.substring(item.indexOf("[")+1,item.length-1);
      if(cls._JT_has("|")){
        var c1=cls.split("|")[0].split(",").join(" ");
        var c2=cls.split("|")[1].split(",").join(" ");
        func_t+="$.ele._JT_removeClass('"+c2+"')._JT_addClass('"+c1+"');";
        func_f+="$.ele._JT_removeClass('"+c1+"')._JT_addClass('"+c2+"');";
      }else{
        cls=cls.split(",").join(" ");
        func_t+="$.ele._JT_addClass('"+cls+"');";
        func_f+="$.ele._JT_removeClass('"+cls+"');";
      }
    }else if(item._JT_has("attr[")){
      var attr=item.substring(item.indexOf("[")+1,item.length-1);
      if(attr._JT_has("|")){
        attr.split("|")[0].split(",")._JT_each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_t+="$.ele._JT_attr('"+pv[0]+"','"+pv[1]+"');";
        });
        attr.split("|")[1].split(",")._JT_each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_f+="$.ele._JT_attr('"+pv[0]+"','"+pv[1]+"');";
        })
      }else{
        attr.split(",")._JT_each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_t+="$.ele._JT_attr('"+pv[0]+"','"+pv[1]+"');";
          func_f+="$.ele._JT_removeAttr('"+pv[0]+"');";
        });
      }
    }else if(item._JT_has("text[")){
      var text=item.substring(item.indexOf("[")+1,item.length-1);
      if(text._JT_has("|")){
        func_t+="$.ele._JT_txt('"+text.split("|")[0]+"');";
        func_f+="$.ele._JT_txt('"+text.split("|")[1]+"');";
      }else{
        func_t+="$.ele._JT_txt('"+text+"');";
        func_f+="$.ele._JT_txt('');";
      }
    }else if(item._JT_has("html[")){
      var html=item.substring(item.indexOf("[")+1,item.length-1);
      if(html._JT_has("|")){
        func_t+="$.ele._JT_html('"+html.split("|")[0]+"');";
        func_f+="$.ele._JT_html('"+html.split("|")[1]+"');";
      }else{
        func_t+="$.ele._JT_html('"+html+"');";
        func_f+="$.ele._JT_html('');";
      }
    }else if(item._JT_has("css[")){
      var attr=item.substring(item.indexOf("[")+1,item.length-1);
      if(attr._JT_has("|")){
        func_t+="$.ele._JT_removeAttr('style');";
        attr.split("|")[0].split(",")._JT_each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_t+="$.ele._JT_css('"+pv[0]+"','"+pv[1]+"');";
        });
        func_f+="$.ele._JT_removeAttr('style');";
        attr.split("|")[1].split(",")._JT_each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_f+="$.ele._JT_css('"+pv[0]+"','"+pv[1]+"');";
        })
      }else{
        func_t+="$.ele._JT_removeAttr('style');";
        attr.split(",")._JT_each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_t+="$.ele._JT_css('"+pv[0]+"','"+pv[1]+"');";
        });
        func_f+="$.ele._JT_removeAttr('style');";
      }
    }else{
      if(item._JT_has("|")){
        item=item.split("|");
        if(item[0] in _this.jet&&item[1] in _this.jet){
          func_t+="this."+item[0]+".call(this,$);";
          func_f+="this."+item[1]+".call(this,$);";
        }else{
          throw new Error("j-if属性值错误")
        }
      }else{
        if(!(item in _this.jet)){
          throw new Error("j-if属性值错误")
        }
        func_t+="this."+item+".call(this,$);";
      }
    }
  });
  this.func_true=new Function("$",func_t);
  this.func_false=new Function("$",func_f);
  this.refresh();
}
/*on*********************************************************************************/
Jet.On=function(opt){
  Jet.Base.call(this,opt,_on);
  _initOn.call(this);
};(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.On.prototype = new Super();
})();Jet.On.prototype.get=function(){
  if(this.index!=undefined){
    return this.index;
  }
  if(this.data==undefined){
    return null;
  }else{
    return this.data[this.name];
  }
};Jet.On.prototype.refresh=function(i){
  if(this.index!=undefined&&i!=undefined&&this.index!=i){
    this.index=i;
  }
};
function _initOn(){
  var _this=this;
  var attr=this.ele._JT_attr(_on)
  if(!attr._JT_has(":")){
    _throw('j-on 属性格式错误:'+attr);
  }
  var e=attr.split(":");
  if(e[1]._JT_has('$valid')){
    if(e[1]._JT_has('=>')){
      _this.valid=true;
      _this.validPar=Jet.valid.findValidPar(_this.ele);
      _this.func=_this.jet[e[1].substring(e[1].indexOf('=>')+2)];
    }else{
      _throw('valid:"'+e[1]+'" 格式有误，操作符为 =>')
    }
  }else{
    _this.func=_this.jet[e[1]];
  }
  if(!_this.func||_JT.type(_this.func)!='function'){
    _throw('没有 '+e[1]+' 方法')
  }
  this.ele._JT_on(e[0],function(event){
    var opt={
      ele:this,
      data:_this.get(),
      e:event,
      jet:_this
    };
    if(_this.valid){
      _this.validPar._JT_validate(function(){
        _this.func.call(_this.jet,opt);
      });
    }else{
      _this.func.call(_this.jet,opt);
    }
  });
}


/*run*********************************************************************************/
Jet.Run=function(opt){
  Jet.Base.call(this,opt,_run);
  _initRun.call(this,opt)
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.Run.prototype = new Super();
})();Jet.Run.prototype.get=function(){
  if(this.index!=undefined){
    return this.index;
  }
  if(this.data==undefined){
    return null;
  }else{
    return this.data[this.name];
  }
};Jet.Run.prototype.refresh=function(i){
  if(this.index!=undefined&&i!=undefined&&this.index!=i){
    this.index==i;
  }
  this.run();
};Jet.Run.prototype.run=function(){
  var _this=this;
  this.runs._JT_each(function(name){
    _this.jet[name].call(_this.jet,{
      ele:_this.ele,
      data:_this.get(),
      jet:_this
    });
  });
};
function _initRun(opt){
  this.runs=this.ele._JT_attr(_run).split(",");
  this.run();
}










