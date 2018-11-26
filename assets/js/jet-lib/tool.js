(function(){
  /*tool start**********************************************************************************/
  var _onReady=(function() {
    var b = [];
    var d = false;

    function c(g) {
      if (d) {
        return
      }
      if (g.type === "onreadystatechange" && document.readyState !== "complete") {
        return
      }
      for (var f = 0; f < b.length; f++) {
        b[f].call(document)
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
    return function a(e) {
      if (d) {
        e.call(document)
      } else {
        b.push(e)
      }
    }
  })();
  var $J = {
      s:function(s) {
        if (s == undefined) {
          return $J.body()
        } else {
          return $J.select(s)
        }
      },
      ready:_onReady,
      height: function() {
        return document.documentElement.clientHeight
        //return document.body.offsetHeight
      },
      width: function() {
        return document.documentElement.clientWidth
        //return document.body.offsetWidth
      },
      copy: _copy,
      each:_each,
      even:_even,
      toString:_toString,
      scroll:_scroll,
      scrollTo:_scrollTo,
      initTip:function(){
        $J.attr("jet-tip").each(function(item){
          item.tip(item.attr("jet-tip"));
        });
      },
      checkArg: _checkArg,
      toFunc:_checkFunction,
      jump: _jump,
      open: function(a) {window.open(a)},
      back: function() {window.history.back()},
      forward: function() {window.history.forward()},
      reload:function(force){
        location.reload(force);
      },
      sign: _sign,
      random: _getRandomNum,
      isMobile: _isMobile,
    };
    for(var k in Jet.$){
      $J[k]=Jet.$[k]
    }
    $J.ct=_create;
    Jet.prototype.$=Jet.$=$J;
    function _scrollTo(y, a, b) {
      document.body.scrollTo(y, null, b);
      document.documentElement.scrollTo(y, null, b);
      if (a != undefined) {
        b = _checkArg(b, 400);
        if ($J.type(b)=="number") {
          b = _checkAnimateSpeed(b)
        }
        setTimeout(_checkFunction(a), b);
      }
    };
    function _scroll(a, b, c) {
      if (arguments.length != 0) {
        if (a != 0) {
          document.body.scroll(a, null, c);
          document.documentElement.scroll(a, null, c);
          if (b != undefined) {
            c = _checkArg(c, 400);
            if ($J.type(c)=="number") {
              c = _checkAnimateSpeed(c)
            }
            setTimeout(_checkFunction(b), c);
          }
        }
      } else {
        if (document.body.scrollTop == 0) {
          return document.documentElement.scrollTop
        } else {
          return document.body.scrollTop
        }
      }
    };
    
    function _create(a) {
      if (a.has("#") || a.has(".") || a.has("[")) {
        var b = a.split('#');
        if(b.length>1){
          b=[b[0],a.substring(b[0].length+1)];
        }
        var c;
        if (a.has("[")) {
          var l = b[b.length - 1];
          c = l.substring(0, l.indexOf("[")).split('.');
          c[c.length - 1] += l.substring(l.indexOf("["))
        } else {
          c = b[b.length - 1].split('.')
        }
        var d = c.length - 1;
        var f = c[d].split('[');
        for (var i = 0; i < f.length; i++) {
          c[d + i] = f[i]
        }
        var anum = f.length - 1;
        var cnum = c.length - anum - 1;
        var e;
        if (b.length == 1) {
          e = document.createElement(c[0])
        } else {
          e = document.createElement(b[0]);
          e.attr("id", c[0])
        }
        for (var i = 1; i < c.length; i++) {
          if (cnum > 0) {
            cnum--;
            e.addClass(c[i])
          } else {
            var g = c[i].substring(0, c[i].length - 1);
            var index=g.indexOf("=");
            e.attr(g.substring(0,index), g.substring(index+1));
          }
        }
        return e
      } else {
        return document.createElement(a)
      }
    };
    function _checkFunction(a){
      if(a==undefined){
        return function(){};
      }else{
        var b=$J.type(a);
        if(b=="function"){
          return a;
        }else if(b=="string"){
          return new Function(a);
        }else{
          return function(){};
        }
      }
    }
    $J.ready(function() {
      $J.tag("head").append($J.ct("style").txt("#jCopyInput{height:0px;position:fixed;top:-100px;}.j-for-slide-height{opacity:0!important;position:absolute!important;display:block!important}.j-none{visibility:hidden!important;position:absolute!important;display:block!important}.j-animation{transition:all .5s linear!important;-moz-transition:all .5s linear!important;-webkit-transition:all .5s linear!important;-o-transition:all .5s linear!important}.j-slide{overflow:hidden!important;height:0!important;padding-top:0!important;padding-bottom:0!important}.j-fade{opacity:0!important}.j-display-none{display:none!important}@keyframes j-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@-moz-keyframes j-spin{from{-moz-transform:rotate(0)}to{-moz-transform:rotate(360deg)}}@-webkit-keyframes j-spin{from{-webkit-transform:rotate(0)}to{-webkit-transform:rotate(360deg)}}@-o-keyframes j-spin{from{-o-transform:rotate(0)}to{-o-transform:rotate(360deg)}}@keyframes j-twinkle{0%{opacity:1}50%{opacity:.1}100%{opacity:1}}@-moz-keyframes j-twinkle{0%{opacity:1}50%{opacity:.1}100%{opacity:1}}@-webkit-keyframes j-twinkle{0%{opacity:1}50%{opacity:.1}100%{opacity:1}}@-o-keyframes j-twinkle{0%{opacity:1}50%{opacity:.1}100%{opacity:1}}.j-over-hidden{overflow:hidden!important}#jetTip{box-shadow:2px 2px 5px 0 #666;top:-100px;position:absolute;border:1px solid#222;background-color:rgba(255,255,255,.8);color:#222;font-size:10px;padding:3px;transition:opacity .2s;-moz-transition:opacity .2s linear;-webkit-transition:opacity .2s linear;-o-transition:opacity .2s linear;opacity:0;z-index:10000}#jetTip.j_active{opacity:1}"));
      $J.initTip();
    });
  
    function _checkSelect(b) {
      if(b==null||b==undefined){
        return $J.ct("div").findClass("a");
      }else if (b.length == 1) {
        return b[0]
      }
      return b
    };
    var EleProto=HTMLElement.prototype;
    var CollProto=HTMLCollection.prototype;
    var NodeProto=NodeList.prototype;
    var ArrProto=Array.prototype;
    var StrProto=String.prototype;
    EleProto.css = EleProto._JT_css
    CollProto.css = NodeProto.css = function(d, c) {
      if (c == undefined && $J.type(d)!="json") {
        var a = [];
        this.each(function(b) {
          a.append(b.css(d))
        });
        return a
      } else {
        this.each(function(a) {
          a.css(d, c)
        });
        return this
      }
    };
    EleProto.hasData = function(d, b) {
      return (d in this.j_data)
    }
    EleProto.data = function(d, b) {
      if (arguments.length == 0) {
        if (this.j_data!=undefined) {
          return this.j_data
        } else {
          return null
        }
      } else if (arguments.length == 1) {
        if (d == undefined) {
          this.j_data=undefined;
          return this
        } else {
          if ($J.type(d)=="json") {
            if (this.j_data!=undefined) {
              for (var e in d) {
                if (d[e] != undefined) {
                  this.j_data[e] = d[e]
                } else {
                  delete this.j_data[e]
                }
              }
            } else {
              this.j_data=d
            }
            return this
          } else {
            if (this.j_data!=undefined) {
              return this.j_data[d]
            } else {
              return undefined
            }
          }
        }
      } else {
        if (b == undefined) {
          if (this.j_data!=undefined) {
            if ($J.type(d)=="array") {
              d.each(function(a) {
                delete this.j_data[a]
              })
            } else {
              delete this.j_data[d]
            }
          }
          return this
        } else {
          if (this.j_data!=undefined) {
            this.j_data[d] = b;
          } else {
            var c = {};
            c[d] = b;
            this.j_data=c
          }
          return this
        }
      }
    };
    CollProto.data = NodeProto.data = function(d, c) {
      if (c == undefined && $J.type(d)!="json" && d != undefined) {
        var a = [];
        this.each(function(b) {
          a.append(b.data($J.clone(d)))
        });
        return a
      } else {
        if (c == undefined) {
          this.each(function(a) {
            a.data($J.clone(d))
          })
        } else {
          this.each(function(a) {
            a.data($J.clone(d), c)
          })
        };
        return this
      }
    };
  
    EleProto.attr = EleProto._JT_attr
    CollProto.attr = NodeProto.attr = CollProto._JT_attr
    EleProto.hasAttr = EleProto._JT_hasAttr
    EleProto.removeAttr = EleProto._JT_removeAttr
    CollProto.removeAttr = NodeProto.removeAttr = CollProto._JT_removeAttr
    EleProto.findClass = EleProto._JT_findClass
    CollProto.findClass = NodeProto.findClass =  ArrProto.findClass = function(a) {
      var arr=[];
      this.each(function(item){
        if(item.hasClass(a)){
          arr.push(item)
        }
      });
      if(arr.length==1)
        return arr[0];
      return arr
    };
    EleProto.findId = function(a) {
      return $J.id(a)
    };
    CollProto.findId = NodeProto.findId =  ArrProto.findId = function(a) {
      var arr=[];
      this.each(function(item){
        if(item.attr("id")==a){
          arr.push(item)
        }
      });
      if(arr.length==1)
        return arr[0];
      return arr
    };
    EleProto.findTag = EleProto._JT_findTag
    CollProto.findTag = NodeProto.findTag =  ArrProto.findTag = function(a) {
      var arr=[];
      this.each(function(item){
        if(item.tagName.toLowerCase()==a){
          arr.push(item)
        }
      });
      if(arr.length==1)
        return arr[0];
      return arr
    };
    EleProto.findAttr = EleProto._JT_findAttr
    CollProto.findAttr = NodeProto.findAttr =  ArrProto.findAttr = function(a) {
      var arr=[];
      var a=a.split("=");
      if(a.length==1){
        this.each(function(item){
          if(item.hasAttr(a[0])){
            arr.push(item);
          }
        });
      }else{
        this.each(function(item){
          if(item.attr(a[0])==a[1]){
            arr.push(item)
          }
        });
      }
      if(arr.length==1)
        return arr[0];
      return arr
    };
    EleProto.findName = function(a) {
      return _checkSelect(this.querySelectorAll("[name=" + a + "]"))
    };
    CollProto.findName = NodeProto.findName =  ArrProto.findName = function(a) {
      var arr=[];
      this.each(function(item){
        if(item.attr("name")==a){
          arr.push(item)
        }
      });
      if(arr.length==1)
        return arr[0];
      return arr
    };
    EleProto.select = EleProto._JT_select
    CollProto.select = NodeProto.select =  ArrProto.select = function(a) {
      var arr=[];
      this.each(function(item){
        var list = item.parent().select(a);
        for(var i=0;i<list.length;i++){
          if(list[i]==item){
            arr.push(item)
            break;
          }
        }
      });
      if(arr.length==1)
        return arr[0];
      return arr
    };
    EleProto.addClass = EleProto._JT_addClass
    CollProto.addClass = NodeProto.addClass = CollProto._JT_addClass
    EleProto.replaceClass = function(a, b) {
      if (this.hasClass(a)) {
        this.addClass(b).removeClass(a)
      }
      return this
    };
    CollProto.replaceClass = NodeProto.replaceClass = function(a, b) {
      this.each(function(c) {
        c.replaceClass(a, b)
      });
      return this
    };
    EleProto.removeClass = EleProto._JT_removeClass
    CollProto.removeClass = NodeProto.removeClass = CollProto._JT_removeClass
    EleProto.toggleClass = function(a) {
      if(a.has(" ")){
        var b = a.split(" ");
        var c = this;
        b.each(function(i) {
          c.toggleClass(i)
        });
      }else if(a.trim()!==""){
        if($J.html5()){
          this.classList.toggle(a)
        }else{
          if (c.hasClass(a)) {
            c.removeClass(a)
          } else {
            c.addClass(a)
          }
        }
      }
      return this
    };
    CollProto.toggleClass = NodeProto.toggleClass = function(v) {
      this.each(function(b) {
        b.toggleClass(v)
      });
      return this
    };
    CollProto.indexOf = NodeProto.indexOf = function(ele) {
      for(var i=0;i<this.length;i++){
        if(this[i]==ele){
          return i;
        }
      }
      return -1;
    };
    EleProto.val = EleProto._JT_val
    CollProto.val = NodeProto.val = CollProto._JT_val
    EleProto.txt = EleProto._JT_txt
    CollProto.txt = NodeProto.txt = CollProto._JT_txt
    EleProto.content = function(a) {
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
    CollProto.content = NodeProto.content = function(v) {
      if (v == undefined) {
        var a = [];
        this.each(function(b) {
          a.append(b.content())
        });
        return a
      } else {
        this.each(function(b) {
          b.content(v)
        });
        return this
      }
    };
    EleProto.copy = function() {
      return _copy(this.content())
    };
  
    function _copy(b) {
      var a = $J.id("jCopyInput");
      if (!a.exist()) {
        a = $J.ct("input").attr({
          "type": "text",
          "id": "jCopyInput"
        });
        $J.body().append(a)
      }
      a.val(b).select();
      if (document.execCommand("Copy")) {
        return true
      } else {
        alert("Copy is not supported in your browser");
        return false
      }
    };
    EleProto.copyHtml = function() {
      return _copy(this.html())
    };
    EleProto.html = EleProto._JT_html
    CollProto.html = NodeProto.html = CollProto._JT_html
    EleProto.allHtml = EleProto._JT_allHtml
    CollProto.allHtml = NodeProto.allHtml = CollProto._JT_allHtml
    EleProto.hasClass = EleProto._JT_hasClass
    EleProto.next = EleProto._JT_next
    EleProto.prev = EleProto._JT_prev
    EleProto.offset = function() {
      return {
        left: this.offsetLeft,
        top: this.offsetTop,
        height: this.offsetHeight,
        width: this.offsetWidth
      }
    };
    EleProto.left = function() {
      return this.offsetLeft
    };
    EleProto.top = function() {
      return this.offsetTop
    };
    EleProto.scrollTo = function(a, b, c) {
      var n = 0;
      var e = this;
      c = _checkArg(c, 400);
      var f = _checkAnimateSpeed(c) / 10;
      var g = (a - e.scrollTop) / f;
      var d = e.scrollTop;
      var h = setInterval(function() {
        d += g;
        e.scrollTop = Math.round(d);
        n++;
        if (n == f) {
          e.scrollTop = a;
          _checkCallBack(b, e);
          clearTimeout(h)
        }
      }, 10);
      return this
    };
    CollProto.scrollTo = NodeProto.scrollTo = function(i, b, c) {
      this.each(function(a) {
        a.scrollTo(i, b, c)
      });
      return this
    };
    EleProto.scroll = function(i, a, b) {
      if (arguments.length == 0) {
        return this.scrollTop
      } else {
        return this.scrollTo(this.scrollTop + i, a, b)
      }
    };
    CollProto.scroll = NodeProto.scroll = function(i, b, c) {
      this.each(function(a) {
        a.scroll(i, b, c)
      });
      return this
    };
    EleProto.animate = function(a, b, c, d) {
      var e = JSON.stringify(a);
      if (e.has("left") || e.has("top")) {
        if (this.css("position") == "static") {
          this.css({
            "position": "relative",
            "left": "0",
            "top": "0"
          })
        } else {
          if (this.style.top == "") {
            this.style.top = this.css("top")
          }
          if (this.style.left == "") {
            this.style.left = this.css("left")
          }
        }
      }
      if (e.has("height") && this.style.height == "") {
        this.style.height = this.css("height")
      }
      if (e.has("width") && this.style.width == "") {
        this.style.width = this.css("width")
      }
      this.addClass("j-animation");
      c = _checkAnimatePara(this, c, d);
      var f = this;
      setTimeout(function() {
        f.css(a);
        setTimeout(function() {
          _checkCallBack(b, f);
          f.removeClass("j-animation")
        }, c)
      }, 50);
      return this
    };
    CollProto.animate = NodeProto.animate = function(b, c, d, e) {
      this.each(function(a) {
        a.animate(b, c, d, e)
      });
      return this
    };
    EleProto.rotate = function(a, b, c, d, e) {
      var f = this;
      f.addClass("j-animation");
      setTimeout(function() {
        c = _checkAnimatePara(f, c, e);
        _checkOrigin(f, d);
        f.css({
          "transform": "rotate(" + a + "deg)",
          "-ms-transform": "rotate(" + a + "deg)",
          "-webkit-transform": "rotate(" + a + "deg)",
          "-o-transform": "rotate(" + a + "deg)",
          "-moz-transform": "rotate(" + a + "deg)"
        });
        setTimeout(function() {
          _checkCallBack(b, f);
          _removeAnimation(f)
        }, c)
      }, 50);
      return this
    };
    EleProto.scale = function(a, b, c, d) {
      return _scaleBase(this, a, a, b, c, d)
    };
    EleProto.scaleX = function(a, b, c, d) {
      return _scaleBase(this, a, 1, b, c, d)
    };
    EleProto.scaleY = function(a, b, c, d) {
      return _scaleBase(this, 1, a, b, c, d)
    };
  
    function _checkCallBack(a, b) {
      if (a != undefined) {
        _checkFunction(a)(b)
      }
    };
    CollProto.scale = NodeProto.scale = function(b, c, d, e) {
      this.each(function(a) {
        a.scale(b, c, d, e)
      });
      return this
    };
    CollProto.scaleX = NodeProto.scaleX = function(b, c, d, e) {
      this.each(function(a) {
        a.scaleX(b, c, d, e)
      });
      return this
    };
    CollProto.scaleY = NodeProto.scaleY = function(b, c, d, e) {
      this.each(function(a) {
        a.scaleY(b, c, d, e)
      });
      return this
    };
  
    function _scaleBase(a, x, y, b, c, d) {
      a.addClass("j-animation");
      setTimeout(function() {
        c = _checkAnimatePara(a, c, d);
        a.css({
          "transform": "scale(" + x + "," + y + ")",
          "-ms-transform": "scale(" + x + "," + y + ")",
          "-webkit-transform": "scale(" + x + "," + y + ")",
          "-o-transform": "scale(" + x + "," + y + ")",
          "-moz-transform": "scale(" + x + "," + y + ")"
        });
        setTimeout(function() {
          _checkCallBack(b, a);
          _removeAnimation(a)
        }, c)
      }, 50);
      return a
    };
  
    function _checkOrigin(a, o) {
      if (o == undefined) {
        o = "center"
      }
      a.css({
        "transform-origin": o,
        "-ms-transform-origin": o,
        "webkit-transform-origin": o,
        "-o-transform-origin": o,
        "-moz-transform-origin": o
      })
    };
    CollProto.rotate = NodeProto.rotate = function(b, c, d, e, f) {
      this.each(function(a) {
        a.rotate(b, c, d, e, f)
      });
      return this
    };
    EleProto.spin = function(a, b, c, d, e) {
      e = _checkArg(e, "linear");
      b = _checkArg(b, "infinite");
      if (a != undefined) {
        a = _checkSpinSpeed(a)
      } else {
        a = 2
      }
      _checkOrigin(this, c);
      if ($J.type(b)=="number") {
        this.stopSpin();
        var f = this;
        setTimeout(function() {
          _helpSpin(a, b, c, d, e, f)
        }, 20)
      } else {
        _helpSpin(a, b, c, d, e, this)
      }
      return this
    };
    function _helpSpin(a, b, c, d, e, f) {
      f.css({
        "animation": "j-spin " + a + "s " + e + " 0s " + b,
        "-moz-animation": "j-spin " + a + "s " + e + " 0s " + b,
        "-webkit-animation": "j-spin " + a + "s " + e + " 0s " + b,
        "-o-animation": "j-spin " + a + "s " + e + " 0s " + b
      });
      if ($J.type(b)=="number") {
        if (d != undefined) {
          setTimeout(function() {
            _checkCallBack(d, f)
          }, a * b * 1000)
        }
      }
    };
  
    EleProto.twinkle = function(a, b, d, e) {//speed times call linear
      e = _checkArg(e, "linear");
      b = _checkArg(b, "infinite");
      if (a != undefined) {
        a = _checkSpinSpeed(a)
      } else {
        a = 2
      }
      if ($J.type(b)=="number") {
        this.stopSpin();
        var f = this;
        setTimeout(function() {
          _helpTwinkle(a, b, d, e, f)
        }, 20)
      } else {
        _helpTwinkle(a, b, d, e, this)
      }
      return this
    };
    function _helpTwinkle(a, b, d, e, f) {
      f.css({
        "animation": "j-twinkle " + a + "s " + e + " 0s " + b,
        "-moz-animation": "j-twinkle " + a + "s " + e + " 0s " + b,
        "-webkit-animation": "j-twinkle " + a + "s " + e + " 0s " + b,
        "-o-animation": "j-twinkle " + a + "s " + e + " 0s " + b
      });
      if ($J.type(b)=="number") {
        if (d != undefined) {
          setTimeout(function() {
            _checkCallBack(d, f)
          }, a * b * 1000)
        }
      }
    };
    CollProto.twinkle = NodeProto.twinkle = function(b, c, d, e) {
      this.each(function(a) {
        a.twinkle(b, c, d, e)
      });
      return this
    };
    CollProto.spin = NodeProto.spin = function(b, c, d, e) {
      this.each(function(a) {
        a.spin(b, c, d, e)
      });
      return this
    };
  
    function _checkSpinSpeed(a) {
      if ($J.type(a)=="string") {
        switch (a) {
        case "slower":
          a = 3;
          break;
        case "slow":
          a = 2.5;
          break;
        case "normal":
          a = 2;
          break;
        case "fast":
          a = 1.5;
          break;
        case "faster":
          a = 1;
          break;
        default:
          a = 2
        }
        return a
      } else {
        return a / 1000
      }
    };
    EleProto.stopTwinkle = function(bool) {
      var a = (bool==true)?"1":this.css("opacity");
      this.css({
        "animation": "none",
        "-moz-animation": "none",
        "-webkit-animation": "none",
        "-o-animation": "none",
        "opacity": a
      });
      return this
    };
    EleProto.stopSpin = function(bool) {
      var a = (bool==true)?"rotate(0)":this.css("transform");
      this.css({
        "animation": "none",
        "-moz-animation": "none",
        "-webkit-animation": "none",
        "-o-animation": "none",
        "transform": a,
        "-moz-transform": a,
        "-webkit-transform": a,
        "-o-transform": a
      });
      return this
    };
    CollProto.stopTwinkle = NodeProto.stopTwinkle = function() {
      this.each(function(a) {
        a.stopTwinkle()
      });
      return this
    };
    CollProto.stopSpin = NodeProto.stopSpin = function() {
      this.each(function(a) {
        a.stopSpin()
      });
      return this
    };
  
    EleProto.tip = function(text) {
      if(!$J.id("jetTip").exist()){
        $J.body().append($J.ct("span#jetTip").clk('this.removeClass("j_active").css("top","-100px")'));
      }
      if($J.type(text)=="array"){
        text=text[0];
      }
      this.jetTip=text;
      this.on({
        mousemove: function(e){
          $J.id("jetTip").txt(this.jetTip).addClass("j_active").css({
            top:e.pageY+5+"px",
            left:e.pageX+8+"px"
          })
        },
        mouseleave:function(){
          $J.id("jetTip").removeClass("j_active").css("top","-100px");
        }
      },true);
      return this
    };
    CollProto.tip = NodeProto.tip = function(text) {
      if($J.type(text)=="array"){
        this.each(function(a,i) {
          a.tip(text[i])
        });
      }else{
        this.each(function(a,i) {
          a.tip(text)
        });
      }
      return this
    };
    function _removeAnimation(a) {
      a.removeClass("j-animation").css({
        "transition-duration": "0s!important",
        "-ms-transition-duration": "0s!important",
        "-webkit-transition-duration": "0s!important",
        "-o-transition-duration": "0s!important",
        "-moz-transition-duration": "0s!important"
      })
    };
    function _checkDisplay(obj){
      if(obj.css("display")=="none"){
        return false;
      }
      return true;
    };
    EleProto.slideUp = function(a, b, c) {
      if(_checkDisplay(this)){
        return _checkSlideHeight(this, a, b, c,false)
      }
      return this;
    };
    EleProto.slideDown = function(a, b, c) {
      if(!_checkDisplay(this)){
        if (this.hasClass("j-fade")) {
          this.removeClass("j-fade").addClass("j-slide")
        };
        return _checkSlideHeight(this, a, b, c,true)
      }
      return this;
    };
    EleProto.slideToggle = function(a, b, c) {
      if(this.css("display")=="none"&&!this.hasClass("j-slide")){//第一次
        this.addClass("j-for-slide-height");
        this.css("height",this.hei()+"px");
        this.removeClass("j-for-slide-height");
        //this.css("display","initial").addClass("j-slide").hide();
        this.css("display","block").addClass("j-slide").hide();
      }
      if (this.hasClass("j-fade")) {
        this.removeClass("j-fade").addClass("j-slide")
      }
      return _checkSlideHeight(this, a, b, c)
    };
    function _checkSlideHeight(obj,a, b, c,d){
      if(obj.style.height==""||obj.style.height=="auto"){
        if(d&&obj.css("display")=="none"){
          obj.addClass("j-none");
        }
        obj.css("height",obj.css("height"));
        obj.removeClass("j-none");
        obj.attr("j-h-auto","true");
        setTimeout(function(){
          _animateBase(obj, "j-slide", a, b, c,d)
        },50);
      }else{
        _animateBase(obj, "j-slide", a, b, c,d)
      }
      return obj;
    };
    EleProto.fadeOut = function(a, b, c) {
      if(_checkDisplay(this)){
        return _animateBase(this, "j-fade", a, b, c, false)
      }
      return this;
    };
    EleProto.fadeIn = function(a, b, c) {
      if(!_checkDisplay(this)){
        if (this.hasClass("j-slide")) {
          this.removeClass("j-slide").addClass("j-fade")
        }
        return _animateBase(this, "j-fade", a, b, c, true)
      }else{
        return this;
      }
    };
    EleProto.fadeToggle = function(a, b, c) {
      if(this.css("display")=="none"&&!this.hasClass("j-fade")){
        this.css("display","initial").addClass("j-fade").hide();
      }
      if (this.hasClass("j-slide")) {
        this.removeClass("j-slide").addClass("j-fade")
      }
      return _animateBase(this, "j-fade", a, b, c)
    };
    EleProto.hide = function() {
      if (!this.hasAttr("j-display")) {
        this.attr("j-display", this.css("display"));
        return this.css("display", "none!important")
      };
      return this
    };
    EleProto.show = function(a) {
      if (this.css("display") == "none") {
        this.css("display", "block!important");/*for initial is not supported*/
        //this.css("display", "initial!important");
      }
      if (this.hasAttr("j-display")) {
        if (a == undefined) {
          this.removeClass("j-fade j-slide")
        }
        return this.css("display", this.attr("j-display") + "!important").removeAttr("j-display")
      };
      return this
    };
    EleProto.showToggle = function() {
      if (this.hasAttr("j-display")) {
        this.show()
      } else {
        this.hide()
      }
    };
  
    function _animateBase(a, b, c, d, e, f) {
      if (f == undefined) {
        if (a.hasAttr("j-display")) {
          f = true
        } else {
          f = false
        }
      }
      a.addClass("j-animation");
      if (f) {
        if (a.css("display") == "none") {
          a.addClass(b)
        }
        a.show(false)
      }
      if (f != false) {
        setTimeout(function() {
          _animateBasePart(a, b, c, d, e, f)
        }, 50)
      } else {
        _animateBasePart(a, b, c, d, e, f)
      }
      return a
    };
  
    function _animateBasePart(a, b, c, d, e, f) {
      d = _checkAnimatePara(a, d, e);
      if (f) {
        if (b == "j-slide") {
          a.addClass("j-over-hidden")
        }
        a.removeClass(b)
      } else {
        a.addClass(b)
      }
      setTimeout(function() {
        _checkCallBack(c, a);
        _removeAnimation(a);
        if (!f) {
          a.hide()
        } else {
          if (b == "j-slide") {
            a.removeClass("j-over-hidden");
            if(a.attr("j-h-auto")=="true"){
              a.css("height","auto");
            }
          }
        }
      }, d)
    };
  
    function _checkAnimatePara(a, b, c) {
      if (b != undefined) {
        b = _checkAnimateSpeed(b) / 1000
      } else {
        b = 0.5
      }
      a.css({
        "transition-duration": b + "s!important",
        "-ms-transition-duration": b + "s!important",
        "-webkit-transition-duration": b + "s!important",
        "-o-transition-duration": b + "s!important",
        "-moz-transition-duration": b + "s!important"
      });
      c = _checkArg(c, "linear");
      a.css({
        "transition-timing-function": c + "!important",
        "-ms-transition-timing-function": c + "!important",
        "-webkit-transition-timing-function": c + "!important",
        "-o-transition-timing-function": c + "!important",
        "-moz-transition-timing-function": c + "!important"
      });
      return b * 1000
    };
    CollProto.slideUp = NodeProto.slideUp = function(b, c, d) {
      this.each(function(a) {
        a.slideUp(b, c, d)
      });
      return this
    };
    CollProto.slideDown = NodeProto.slideDown = function(b, c, d) {
      this.each(function(a) {
        a.slideDown(b, c, d)
      });
      return this
    };
    CollProto.slideToggle = NodeProto.slideToggle = function(b, c, d) {
      this.each(function(a) {
        a.slideToggle(b, c, d)
      });
      return this
    };
    CollProto.fadeIn = NodeProto.fadeIn = function(b, c, d) {
      this.each(function(a) {
        a.fadeIn(b, c, d)
      });
      return this
    };
    CollProto.fadeOut = NodeProto.fadeOut = function(b, c, d) {
      this.each(function(a) {
        a.fadeOut(b, c, d)
      });
      return this
    };
    CollProto.fadeToggle = NodeProto.fadeToggle = function(b, c, d) {
      this.each(function(a) {
        a.fadeToggle(b, c, d)
      });
      return this
    };
    CollProto.hide = NodeProto.hide = function() {
      this.each(function(a) {
        a.hide()
      });
      return this
    };
    CollProto.show = NodeProto.show = function() {
      this.each(function(a) {
        a.show()
      });
      return this
    };
    CollProto.showToggle = NodeProto.showToggle = function() {
      this.each(function(a) {
        a.showToggle()
      });
      return this
    };
  
    function _checkAnimateSpeed(a) {
      if ($J.type(a)=="string") {
        switch (a) {
        case "slower":
          a = 1500;
          break;
        case "slow":
          a = 1000;
          break;
        case "normal":
          a = 400;
          break;
        case "fast":
          a = 250;
          break;
        case "faster":
          a = 100;
          break;
        default:
          a = 400
        }
      }
      return a
    };
  
    function _checkArg(a, b) {
      return (a == undefined) ? b : a
    };
    EleProto.scrollXTo = function(a, b, c) {
      var n = 0;
      var e = this;
      c = _checkArg(c, 400);
      var f = _checkAnimateSpeed(c) / 10;
      var g = (a - e.scrollLeft) / f;
      var d = e.scrollLeft;
      var h = setInterval(function() {
        d += g;
        e.scrollLeft = Math.round(d);
        n++;
        if (n == f) {
          e.scrollLeft = a;
          _checkCallBack(b, e);
          clearTimeout(h)
        }
      }, 10);
      return this
    };
    CollProto.scrollXTo = NodeProto.scrollXTo = function(i, b, c) {
      this.each(function(a) {
        a.scrollXTo(i, b, c)
      });
      return this
    };
    EleProto.scrollX = function(i, a, b) {
      if (arguments.length == 0) {
        return this.scrollLeft
      } else {
        return this.scrollXTo(this.scrollLeft + i, a, b)
      }
    };
    CollProto.scrollX = NodeProto.scrollX = function(i, b, c) {
      this.each(function(a) {
        a.scrollX(i, b, c)
      });
      return this
    };
    EleProto.hei = function() {
      return this.offsetHeight
    };
    EleProto.wid = function() {
      return this.offsetWidth
    };
    EleProto.child = EleProto._JT_child
    EleProto.hasChild = function(a) {
      if(a==undefined){
        return (this.children.length>0)?true:false; 
      }else{
        return (this.select(a).length==0)?false:true; 
      }
    };
    EleProto.clone = EleProto._JT_clone
    EleProto.parent = EleProto._JT_parent
    EleProto.bro = function(i) {
      if (i == undefined) {
        return this.parent().child()
      } else {
        return this.parent().child(i)
      }
    };
    EleProto.prepend = EleProto._JT_prepend
    CollProto.prepend = NodeProto.prepend = CollProto._JT_prepend
    EleProto.append = EleProto._JT_append
    CollProto.append = NodeProto.append = CollProto._JT_append
    EleProto.toArray=function(){
      return [this];
    };
    CollProto.toArray = NodeProto.toArray = CollProto._JT_toArray
    function _checkHtmle(a){
      if($J.type(a)=="string"){
        var e=$J.ct("div").html(a);
        if(e.child().length==1){
          return e.child(0);
        }else{
          return e.child().toArray();
        }
      }
      return a;
    };
    EleProto.after = function(b) {
      var type=$J.type(b);
      if (type=="array"||type=="htmlcollection"||type=="nodelist") {
        var c = this;
        var d = c.next();
        b.each(function(a) {
          c.parent().insertBefore(_checkHtmle(a), d)
        })
      } else {
        this.parent().insertBefore(_checkHtmle(b), this.next())
      }
      return this
    };
    CollProto.after = NodeProto.after = function(b) {
      this.each(function(c) {
        c.after(b)
      });
      return this
    };
    EleProto.before = function(b) {
      var type=$J.type(b);
      if (type=="array"||type=="htmlcollection"||type=="nodelist") {
        var c = this;
        b.each(function(a) {
          c.parent().insertBefore(_checkHtmle(a), c)
        })
      } else {
        this.parent().insertBefore(_checkHtmle(b), this)
      }
      return this
    };
    CollProto.before = NodeProto.before = function(b) {
      this.each(function(c) {
        c.before(b)
      });
      return this
    };
    EleProto.index = EleProto._JT_index
    EleProto.on = EleProto._JT_on
    CollProto.on = NodeProto.on = CollProto._JT_on
    EleProto.clk = EleProto._JT_clk
    CollProto.clk = NodeProto.clk = CollProto._JT_clk
    EleProto.event = EleProto._JT_event
    CollProto.event = NodeProto.event = CollProto._JT_event
    EleProto.empty = EleProto._JT_empty
    CollProto.empty = NodeProto.empty = CollProto._JT_empty
    EleProto.remove = EleProto._JT_remove
    CollProto.remove = NodeProto.remove = CollProto._JT_remove
    EleProto.each = EleProto._JT_each
    CollProto.each = NodeProto.each = CollProto._JT_each
    ArrProto.each = ArrProto._JT_each
    ArrProto.clone = ArrProto._JT_clone
    ArrProto.empty = function(b) {
      this.length = 0;
      return this;
    };
    EleProto.last =EleProto._JT_last
    EleProto.first =EleProto._JT_first
    CollProto.last = NodeProto.last =ArrProto.last = CollProto._JT_last
    CollProto.first = NodeProto.first =ArrProto.first = CollProto._JT_first
    ArrProto.remove = ArrProto._JT_remove
    ArrProto.removeByIndex = ArrProto._JT_removeByIndex
    ArrProto.insert = ArrProto._JT_insert
    ArrProto.insertArray = ArrProto._JT_insertArray
    ArrProto.append = ArrProto._JT_append
    ArrProto.appendArray = function(arr) {
      ArrProto.push.apply(this,arr)
      return this
    };
    ArrProto.prepend = ArrProto._JT_prepend
    ArrProto.prependArray = function(b) {
      return this.insertArray(b, 0)
    };
    ArrProto.sort = function(a) {
      var b = this.length;
      var c, current;
      for (var i = 1; i < b; i++) {
        c = i - 1;
        current = this[i];
        while (c >= 0 && this[c] > current) {
          this[c + 1] = this[c];
          c--
        }
        this[c + 1] = current
      }
      if (a == false) {
        this.reverse()
      }
      return this
    };
    ArrProto.sortByAttr = function(a,type, b) {
      var c = this.length;
      var d, current;
      for (var i = 1; i < c; i++) {
        d = i - 1;
        current = this[i];
        while (d >= 0 && _compareValue(this[d][a],current[a],type) ) {
          this[d + 1] = this[d];
          d--
        }
        this[d + 1] = current
      }
      if (type == false||b==false) {
        this.reverse()
      }
      return this
    };
    function _compareValue(a,b,type){
      if(_getSortValue(a,type)>_getSortValue(b,type)){
        return true;
      }
      return false;
    };
    function _getSortValue(value,type){
      if(type==undefined||$J.type(type)=="boolean"){
        return value;
      }else{
        var res=null;
        switch(type){
          case "date":
            if($J.type(value)=="date"){
              res=value;
            }else{
              var arr;
              if(value.has("-")){
                arr=value.split("-");
              }else{
                arr=value.split("/");
              }
              res=new Date(arr[0],arr[1],arr[2]);
            }break;
          case "length":res=value.length;break;
          case "headLetter":res=value.toLowerCase().charCodeAt(0);break;
          case "number":res=value;break;
          default:res=value;break;
        }
        return res;
      }
    };
    function _each(obj,fun,arg){
      var type=$J.type(obj);
      if(type=="json"||type=="object"){
        var k=0;
        for (var a in obj) {
          if($J.type(obj[a])!="function"){
            fun(obj[a], a,k,obj)
          }
          k++;
        }
      }else if(type=="number"||type=="boolean"||type=="string"||type=="function"){
        fun(obj, 0,arg);
      }else{
        obj.each(fun,arg);
      }
      return obj;
    };
    function _even(a,b){
      if(a==undefined||b==undefined){
        return (a==b);
      }else{
        var atype=$J.type(a);
        var btype=$J.type(b);
        if(atype!=btype){
          return false;
        }else{
          if(atype=="json"||atype=="object"){
            return (JSON.stringify(a)==JSON.stringify(b));
          }else if(atype=="array"||atype=="function"){
            return (a.toString()==b.toString());
          }else if(atype=="htmlelement"||atype=="htmlcollection"||atype=="nodelist"){
            var arr=a.allHtml();
            if($J.type(arr)=="array"){
              return _even(arr,b.allHtml());
            }
            return (arr==b.allHtml());
          }else{
            return (a==b);
          }
        }
      }
    };
    function _toString(a){
      if(a==undefined){
        return "undefined";
      }else{
        var type=$J.type(a);
        if(type=="json"||type=="object"){
          return JSON.stringify(a);
        }else if(type=="string"){
          return '"'+a+'"';
        }else if(type=="array"){
          var s="[";
          for(var i=0;i<a.length;i++){
            s+=_toString(a[i])+',';
            if(i==a.length-1){
              s=s.substring(0,s.length-1);
            }
          }
          return s+"]";
        }else if(type=="htmlelement"||type=="htmlcollection"||type=="nodelist"){
          var arr=a.allHtml();
          if($J.type(arr)=="array"){
            return arr.toString();
          }
          return arr;
        }else{
          return a.toString();
        }
      }
    };
    ArrProto.even = function(a) {
      return _even(this,a);
    };
    ArrProto.clone = function() {
      var a=new Array();
      this.each(function(item){
        a.append($J.clone(item));
      });
      return a;
    };
    function _checkEmptyArray(arr,thr){
      if(arr.length==0){
        if(thr!=false){
          throw new Error("空数组不支持该方法");
        }
        return false;
      }else{
        return true;
      }
    };
    ArrProto.sum = function(a,b) {
      if(_checkEmptyArray(this)){
        if(a!=undefined){
          return this.slice(a,b).sum();
        }else{
          var con=$J.type(this[0]);
          if(con=="number"||con=="string"||con=="array"){
            var sum;
            if(con=="number"||(con=="array"&&$J.type(this[0][0])=="number")){
              sum=0;
            }else if(con=="string"||(con=="array"&&$J.type(this[0][0])=="string")){
              sum="";
            }else{
              throw new Error("sum方法不支持除Number,String,Array以外的类型");
            }
            this.each(function(a){
              if($J.type(a)=="array"){
                a.each(function(b){
                  sum+=b;
                });
              }else{
                sum+=a;
              }
            });
            return sum;
          }else{
            throw new Error("sum方法不支持除Number,String,Array以外的类型");
          }
        }
      }else{
        return 0;
      }
    };
    ArrProto.avg = function() {
      if(_checkEmptyArray(this)){
        var con=$J.type(this[0]);
        if(con=="number"||con=="string"){
          return this.sum()/this.length;
        }else{
          throw new Error("ave方法不支持除Number,String以外的类型");
        }
      }
    };
    ArrProto.max = function(attr,type) {
      if(_checkEmptyArray(this)){
        var type=$J.type(this[0]);
        if(type=="number"){
          return Math.max.apply(null,this);
        }else if(type=="string"||type=="array"){
          return $J.clone(this).sortByAttr("length").last();
        }else if(type=="date"){
          return $J.clone(this).sort().last();
        }else if(type=="json"||type=="object"){
          if(attr==undefined){
            throw new Error("Object类型数组参数不可为空");
          }else{
            return $J.clone(this).sortByAttr(attr,type).last();
          }
        }
        throw new Error("不支持的类型");
      }
    };
    ArrProto.min = function() {
      if(_checkEmptyArray(this)){
        var type=$J.type(this[0]);
        if(type=="number"){
          return Math.min.apply(null,this);
        }else if(type=="string"||type=="array"){
          return $J.clone(this).sortByAttr("length").first();
        }else if(type=="date"){
          return $J.clone(this).sort().first();
        }else if(type=="json"||type=="object"){
          if(attr==undefined){
            throw new Error("Object类型数组参数不可为空");
          }else{
            return $J.clone(this).sortByAttr(attr,type).first();
          }
        }
        throw new Error("不支持的类型");
      }
    };

    ArrProto.has = function(a) {
      if(_checkEmptyArray(this,false)){
        var type=$J.type(this[0]);
        if(type=="number"||type=="string"||type=="boolean"){
          return (this.indexOf(a)>-1);
        }else{
          for(var i=0;i<this.length;i++){
            if(a==this[i]){
              return true;
            }
          }
          return false;
        }
      }else{
        return false;
      }
    };
    ArrProto.indexsOf =function(a){
      var indexs=[];
      if(_checkEmptyArray(this,false)){
        for(var i=0;i<this.length;i++){
          if(a==this[i]){
            indexs.push(i);
          }
        }
      }
      return indexs;
    };
    ArrProto.timeOf =function(a){
      var sum=0;
      this.each(function(item){
        if(item==a){
          sum++;
        }
      });
      return sum;
    };
    ArrProto.group=function(n){
      var a=[];
      var x=Math.ceil(this.length/n);
      for(var i=0;i<x;i++){
        var b=[];
        for(var j=0;j<n;j++){
          if(i*n+j==this.length){
            break;
          }else{
            b.push(this[i*n+j]);
          }
        }
        a.push(b);
      }
      return a;
    };
    StrProto.reverse = function() {
      var s="";
      for(var i=this.length-1;i>=0;i--){
        s+=this[i];
      }
      return s;
    };
    StrProto.has = StrProto._JT_has
    StrProto.timeOf = function(s) {
      if ($J.type(s)=="string") {
        return this.split(s).length - 1
      } else {
        var a = this.match(s);
        if (a == null) {
          return 0
        } else {
          return a.length
        }
      }
    };
    StrProto.replaceAll = StrProto._JT_replaceAll
    StrProto.indexsOf = function(a, i) {
      var b = this.split(a);
      var c = null;
      if ($J.type(a)!="string") {
        c = this.match(a)
      }
      if (b.length <= 2) {
        if (this.indexOf(a) == -1) {
          return []
        } else {
          return [this.indexOf(a)]
        }
      } else {
        var d = [];
        var e = a.length;
        var f = 0;
        b.each(function(s, n) {
          if (n > 0) {
            d[d.length] = f;
            if (c != null) {
              f += c[n - 1].length
            } else {
              f += a.length
            }
          }
          f += s.length
        });
        if (i == undefined) {
          return d
        } else {
          if (i > d.length - 1) return d[d.length - 1];
          return d[i]
        }
      }
    };
    StrProto.insert = function(a, i) {
      return this.substring(0, i) + a + this.substring(i)
    };
  
  
    EleProto.exist = EleProto._JT_exist
    CollProto.exist = NodeProto.exist=ArrProto.exist= CollProto._JT_exist
    
    function _jump(a) {
      try{
        window.location.href = (encodeURI(a))
      }catch(e){
        throw new Error("跳转地址错误");
      }
    };
    function _getRandomNum(a, b) {
      return (a + Math.round(Math.random() * (b - a)))
    };
  
    function _sign(n) {
      if (n >= 0) {
        return 1
      }
      return -1
    };
  
    function _checkArg(a, b) {
      return (a == undefined) ? b : a
    };
    function _isMobile() {
      if ((/AppleWebKit.*Mobile/i).test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    };
/*tool end**********************************************************************************/
})()