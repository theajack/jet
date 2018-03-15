//tabIndent.js
//html java c#
//
//html str note key fun sign
//str key fun note
//sign
//html
//lang style width height tab
//(HTML)(Note,Str,Fun,Key,Num),(sign)
//Note>Str>HTML>Fun>key>Num>sign
//
(function(){
  var _ce_btn="buttons",_ce_disabled="disabled",_ce_callback="callback",_ce_full="j_full",_ce_hidden="j_hidden",_def_w=300,_def_h=200;
  Jcode={
    init:function(element){
      if(element==undefined){
        $J.cls("j-code").each(function(item){
          _initFrame(item);
        });
        _initCodeMain($J.cls("code_editor"));
      }else{
        if(element.hasClass('j-code')){
          _initFrame(element);
          _initCodeMain(element.findClass("code_editor"));
        }else{
          element.findClass("j-code").each(function(item){
            _initFrame(item);
            _initCodeMain(item.findClass("code_editor"));
          });
        }
      }
    },
    fix:function(obj){
      var par=_checkParent(obj);
      if(obj.data("flag")){
        obj.data("flag",false);
        par.findClass("code_editor_view").css("left","3px");
      }else{
        obj.data("flag",true);
        par.findClass("code_editor_view").css("left","0px");
      }
    },
    clearColor:function(obj){
      var par=_checkParent(obj);
      par.findClass("code_editor").toggleClass("bg");
      par.findClass("code_editor_view").fadeToggle();
    },
    clearCode:function(obj){
      $J.confirm("是否确认清空代码(该操作不可撤销)？",function(){
        var par=_checkParent(obj);
        par.findClass("code_editor_view").empty();
        par.findClass("code_editor").val("").focus();
      });
    },resetCode:function(obj){
      $J.confirm("是否确认重置代码(该操作不可撤销)？",function(){
        var c=_checkParent(obj).findClass("code_editor");
        c.val(c.data("code")).focus();
        _geneViewCode(c);
      });
    },copy:function(obj){
      if($J.isMobile()){
        JUI.msg('移动端不支持该方法',"warn");
      }else{
        var par=_checkParent(obj);
        if(par.findClass("code_editor").copy()){
          JUI.msg('复制成功！','success');
        }else{
          par.findClass("code_editor").select();
          JUI.msg("您的浏览器不支持该方法。请按Ctrl+V手动复制","info");
        }
      }
    },fullScreen:function(obj){
      _checkParent(obj).toggleClass(_ce_full);
      obj.toggleClass('icon-collapse-full');
      $J.body().toggleClass(_ce_hidden);
    },fontSizeUp:function(obj){
      var n=_getFontSize(obj);
      if(n<35){
        _checkParent(obj).css({
          "font-size":(n+1)+"px",
          "line-height":(n+5)+"px"
        });
      }else{
        JUI.msg("已达到最大大小(35px)",'warn')
      }
    },fontSizeDown:function(obj){
      var n=_getFontSize(obj);
      if(n>12){
        _checkParent(obj).css({
          "font-size":(n-1)+"px",
          "line-height":(n+3)+"px"
        });
      }else{
        JUI.msg("已达到最小大小(12px)",'warn')
      }
    },submit:function(obj){
      var par=_checkParent(obj);
      par.code_callback.call(par,par.findClass("code_editor").val());
    },extend:function(a){
      if(typeof a=="array"){
        _code._key.appendArray(a);
      }else if(typeof a=="string"){
        _code._key.append(a);
      }else{
        throw new Error("extend:参数类型错误");
      }
    },txt:function(obj,txt){
      var c=obj.findClass("code_editor");
      c.val(txt).focus();
      _geneViewCode(c);
    }
  };
  function _checkParent(obj){
    if(obj.hasClass=="j-code"){
      return obj;
    }else{
      return obj.parent(2);
    }
  }
  function _checkFunction(f){
    if(f!=undefined){
      if(f.constructor==Function){
        return f;
      }else{
        return new Function("code",f);
      }
    }
    return (function(){});
  }
  function _getFontSize(obj){
    var par=_checkParent(obj);
    var fs=par.css("font-size");
    return parseInt(fs.substring(0,fs.length-2));
  }
  function _initFrame(item){
    if(item.findClass("code_editor").length==0){//防止两次初始化
      var cont=item.html().trim();
      var num=/^\d+$/;
      var w=item.hasAttr("width")?item.attr("width"):_def_w+"px";
      if(num.test(w)){
        w+="px";
      }
      var h=item.hasAttr("height")?item.attr("height"):_def_h+"px";
      if(num.test(h)){
        h+="px";
      }
      item.empty();
      item.append($J.ct("pre.code_editor_view._bottom").html(cont));
      item.append($J.ct("pre.code_editor_view").html(cont));
      var ta=$J.ct("textarea.code_editor[spellcheck=false]").html(cont).data("code",cont);
      if(item.hasAttr(_ce_disabled)){
        ta.attr(_ce_disabled,_ce_disabled).css("cursor","no-drop");
      }
      item.append(ta);
      var needSubmit=false;
      if(item.hasAttr(_ce_callback)){
        needSubmit=true;
        item.code_callback=_checkFunction(item.attr(_ce_callback));
      }
      item.css({
        width:w,
        height:h
      });
      if(h=="auto"){
        item.child().css("height",h);
        item.findClass("code_editor").data("height","auto").css("overflow-y","hidden");
      }else{
        item.child().css("height","100%");
      }
      if(w=="auto"){
        item.child().css("width",w);
        item.findClass("code_editor").data("width","auto").css("overflow-x","hidden");
      }else{
        item.child().css("width","100%");
      }
      var mh=45;
      if(item.hasAttr(_ce_btn)){
        item.child().css("padding-top","40px");
        mh+=40;
        var btn=item.attr(_ce_btn);
        var arr=[];
        if(btn==_ce_btn||btn=="true"||btn==""){
          $J.each(_buttons,function(item,attr){
            if(attr!="submit"||needSubmit){
              arr.push(_getButton(item));
            }
          });
        }else{
          var ba=btn.split(";");
          ba.each(function(item){
            if(item!=""){
              if(item!="submit"||needSubmit){
                arr.push(_getButton(_buttons[item.toLowerCase()]));
              }
            }
          });
        }
        item.append($J.ct("div.code_set_w").append(arr));
      }
      item.css("min-height",mh+"px");
      if(cont!=""){
        _geneViewCode(item.child(2));
      }
      if(window.navigator.userAgent.has("iPhone")){
        item.findClass("code_editor_view").css("left","3px");
      }
    }
  }
  function _getButton(a){
    return $J.ct("i.j-icon.icon-"+a[2]).clk(a[0]).tip(a[1]);
  }
  var _buttons={
    fontsizeup:["Jcode.fontSizeUp(this)","放大字体","zoom-in"],
    fontsizedown:["Jcode.fontSizeDown(this)","缩小字体","zoom-out"],
    fullscreen:["Jcode.fullScreen(this)","全屏显示","expand-full"],//collapse-full
    fix:["Jcode.fix(this)","修复重影问题","wrench"],
    clearcolor:["Jcode.clearColor(this)","清除颜色","paint-brush"],
    clearcode:["Jcode.clearCode(this)","清除代码","trash"],
    resetcode:["Jcode.resetCode(this)","重置代码","undo"],
    copy:["Jcode.copy(this)","复制代码","copy"],
    submit:["Jcode.submit(this)","提交代码","share-sign"]
  };
  function _initCodeMain(item){
    item.on({
      mouseleave:function(){
        //showResult(false);
      },
      keydown:_codeChange,
      keyup:function(e){
        if(e.keyCode==13||e.keyCode==9){
          _geneViewCode(this);
        }
      },
      input:function(){
        //showResultHtml();
        _geneViewCode(this);
      },
      scroll:function(event){
        _getView(this).scrollTo(this.scroll(),null,10).scrollXTo(this.scrollX(),null,10);
      },
      //onclick:moveCursor
    });
    _tabEnable(item);
  }
  var _code={
    _str:1,
    _key:["if","else","for","switch","while","try","catch","finally","new ","return","this","break",
        "default","case","continue","throw","throws","in ",//common
    "function","var","undefined","typeof",//js
    "important",//css
    "private","protected","public","abstract","static","void",
    "boolean","byte","char","int ","double","enum","const","final","float","long","short","true","True",
      "false","False","null","String","string","object",
    "assert","class ","do","extends","goto","implements","import","instanceof","interface","native",
      "package","strictfp","super","synchronized","transient","volatile",
    "operator","out ","override","params","readonly","ref","sbyte","sealed","sizeof","stackalloc",
    "struct","uint","ulong","unchecked","unsafe","ushort","using","virtual","void","volatile","as ",
    "base","bool","checked","decimal","delegate","event","explicit","extern","foreach","internal",
    "is ","lock","namespace"//c#
   ],
    _tag:3,
    _attr:4,
    _sign:["#","=","&gt;","&lt;","{","}","\\(","\\)","\\[","\\]",",","&&","\\.",
      "\\?","\\|","\\+","-",";\n",":","!","%","\\^"],//转义
  };
  $J.ready(function(){
    //$J.tag("head").append($J.ct("style").txt(""));
    Jcode.init();
  });

  function _tabEnable(obj){
    obj.on("keydown",_keyDown,true);
  }
  function _keyDown(e) {
    var a = '\t';
    var b = a.length;
    if (e.keyCode === 9) {
      e.preventDefault();
      var c = this.selectionStart,
        currentEnd = this.selectionEnd;
      if (e.shiftKey === false) {
        if (!_isMultiLine(this)) {
          this.value = this.value.slice(0, c) + a + this.value.slice(c);
          this.selectionStart = c + b;
          this.selectionEnd = currentEnd + b
        } else {
          var d = _findStartIndices(this),
            l = d.length,
            newStart = undefined,
            newEnd = undefined,
            affectedRows = 0;
          while (l--) {
            var f = d[l];
            if (d[l + 1] && c != d[l + 1]) f = d[l + 1];
            if (f >= c && d[l] < currentEnd) {
              this.value = this.value.slice(0, d[l]) + a + this.value.slice(d[l]);
              newStart = d[l];
              if (!newEnd) newEnd = (d[l + 1] ? d[l + 1] - 1 : 'end');
              affectedRows++
            }
          }
          this.selectionStart = newStart;
          this.selectionEnd = (newEnd !== 'end' ? newEnd + (b * affectedRows) : this.value.length)
        }
      } else {
        if (!_isMultiLine(this)) {
          if (this.value.substr(c - b, b) == a) {
            this.value = this.value.substr(0, c - b) + this.value.substr(c);
            this.selectionStart = c - b;
            this.selectionEnd = currentEnd - b
          } else if (this.value.substr(c - 1, 1) == "\n" && this.value.substr(c, b) == a) {
            this.value = this.value.substring(0, c) + this.value.substr(c + b);
            this.selectionStart = c;
            this.selectionEnd = currentEnd - b
          }
        } else {
          var d = _findStartIndices(this),
            l = d.length,
            newStart = undefined,
            newEnd = undefined,
            affectedRows = 0;
          while (l--) {
            var f = d[l];
            if (d[l + 1] && c != d[l + 1]) f = d[l + 1];
            if (f >= c && d[l] < currentEnd) {
              if (this.value.substr(d[l], b) == a) {
                this.value = this.value.slice(0, d[l]) + this.value.slice(d[l] + b);
                affectedRows++
              } else {}
              newStart = d[l];
              if (!newEnd) newEnd = (d[l + 1] ? d[l + 1] - 1 : 'end')
            }
          }
          this.selectionStart = newStart;
          this.selectionEnd = (newEnd !== 'end' ? newEnd - (affectedRows * b) : this.value.length)
        }
      }
    } else if (e.keyCode === 13 && e.shiftKey === false) {
      cursorPos = this.selectionStart,
      d = _findStartIndices(this),
      numStartIndices = d.length,
      startIndex = 0,
      endIndex = 0,
      tabMatch = new RegExp("^" + a.replace('\t', '\\t').replace(/ /g, '\\s') + "+", 'g'),
      lineText = '';
      tabs = null;
      for (var x = 0; x < numStartIndices; x++) {
        if (d[x + 1] && (cursorPos >= d[x]) && (cursorPos < d[x + 1])) {
          startIndex = d[x];
          endIndex = d[x + 1] - 1;
          break
        } else {
          startIndex = d[numStartIndices - 1];
          endIndex = this.value.length
        }
      }
      lineText = this.value.slice(startIndex, endIndex);
      tabs = lineText.match(tabMatch);
      if (tabs !== null) {
        e.preventDefault();
        var h = tabs[0];
        var i = h.length;
        var j = cursorPos - startIndex;
        if (i > j) {
          i = j;
          h = h.slice(0, j)
        }
        this.value = this.value.slice(0, cursorPos) + "\n" + h + this.value.slice(cursorPos);
        this.selectionStart = cursorPos + i + 1;
        this.selectionEnd = this.selectionStart
      }
    }
  }
  function _isMultiLine(a) {
    var b = a.value.slice(a.selectionStart, a.selectionEnd),
      nlRegex = new RegExp(/\n/);
    if (nlRegex.test(b)) return true;
    else return false
  }
  function _findStartIndices(a) {
    var b = a.value,
      startIndices = [],
      offset = 0;
    while (b.match(/\n/) && b.match(/\n/).length > 0) {
      offset = (startIndices.length > 0 ? startIndices[startIndices.length - 1] : 0);
      var c = b.search("\n");
      startIndices.push(c + offset + 1);
      b = b.substring(c + 1)
    }
    startIndices.unshift(0);
    return startIndices;
  }


  //html str note key fun sign
  //str key fun note
  //sign
  //html
  //lang style width height tab
  //(HTML)(Note,Str,Fun,Key,Num),(sign)
  //Note>Str>HTML>Fun>key>Num>sign

  //html  
  //sign

  function _getView(obj,i){
    if(i!=undefined){
      return obj.parent().child(i);
    }
    return obj.parent().findClass("code_editor_view");
  }
  function _codeChange(e){
    if(this.attr("jet-change")=="0"){
      this.attr("jet-change","1");
    }
    if(e.keyCode==13||e.keyCode==9){
      _geneViewCode(this);
    }
    //_geneViewCode();
  }
  function _geneViewCode(obj){
    //moveCursor();.replaceAll("<","&lt;").replaceAll(">","&gt;")
    var html=obj.val().replaceAll("<","&lt;").replaceAll(">","&gt;")+" ";//为了不让最后一个字符是换行
    html=_geneHtmlElement(html);
    html=_geneKey(html);
    html=_geneFun(html);
    //html=_geneDefineFun(html);
    html=_geneNumber(html);
    html=_geneString(html);
    html=_geneNote(html);
    html=_geneHtmlNote(html);
    _getView(obj,1).html(html); 
    
    var htmlSign=_geneSign(obj.val().replaceAll("<","&lt;").replaceAll(">","&gt;")+" ");
    _getView(obj,0).html(htmlSign); 
    _checkSizeAuto(obj);
  }
  function _checkSizeAuto(obj){
    _checkSizeAutoPart(obj,"height");
    _checkSizeAutoPart(obj,"width");
  }
  function _checkSizeAutoPart(obj,s){
    if(obj.data(s)=="auto"){
      var n=obj.prev().css(s);
      if(n=="auto"){
        setTimeout(function(){obj.css(s,obj.prev().css(s));},0);
      }else{
        obj.css(s,n);
      }
    }
  }

  function _geneSign(html){
    _code._sign.each(function(a){
      html=html.replaceAll(a,"<cd_sign>"+(a.has("\\")?a.substring(1):a)+"</cd_sign>");
    });
    return html;
  }
  function _geneDefineFun(html){//js
    var dFun=html.match(/(function)(.*?)(<)/g);
    if(dFun!=null){
      dFun.each(function(a,i){
        dFun[i]=a.substring(a.lastIndexOf(" ")+1,a.length-1);
      });
      dFun.sortByAttr("length",false);
      dFun.each(function(a,i){
        if(a!=""&&a!="function"){//匿名函数排除掉
          html=html.replaceAll(a,"<cd_dfun>"+a+"</cd_dfun>");
        }
      });
    }
    return html;
  }
  var _funReg=/(\.)(.*?)(\()/g;
  function _geneFun(html){
    var arr=html.match(_funReg);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]=arr[i].replace(a,a[0]+"<cd_fun>"+a.substring(1,a.length-1)+"</cd_fun>(");
      });
      return html.replaceAll(_funReg,arr);
    }
    return html;
  }
  function _geneKey(html){
    _code._key.each(function(a){
      html=html.replaceAll(a,"<cd_key>"+a+"</cd_key>");
    });
    return html;
  }
  function _geneHtmlElement(html){
    return _geneCommon(html,/(&lt;)(.*?)(&gt;)/g,"cd_tag");
  }
  function _geneNumber(html){
    return _geneCommon(html,/(\d+)/g,"cd_num");
  }
  function _geneString(html){
    return _geneCommon(html,/((")(.*?)("))|((')(.*?)('))/g,"cd_str");
  }
  function _geneNote(html){
    return _geneCommon(html,/((\/\/)(.*?)(\n))|((\/\*)((.|\n)*?)(\*\/))/g,"cd_note");
  }
  function _geneHtmlNote(html){
    return _geneCommon(html,/(&lt;!--)((.|\n)*?)(--&gt;)/g,"cd_note");
  }
  function _geneCommon(html,reg,tag){
    var arr=html.match(reg);
    if(arr!=null){
      arr.each(function(a,i){
        arr[i]="<"+tag+">"+a+"</"+tag+">";
      });
      html=html.replaceAll(reg,arr);
    }
    return html;
  }
})();
var Jcode;