//解决加载时不应该出现的元素会闪现的问题
//对于新增的css.conf的支持
(function(){
  // var o=document.createElement("style");
  // o.setAttribute("type","text/css");
  // var preload=document.getElementById('jet-preload');
  // var src=preload.getAttribute('src');
  // window.__base=src.substring(0,src.indexOf('/assets/js'));
  // var pre_style=o.cloneNode();
  // pre_style.innerHTML='body{opacity:0!important}';
  // document.head.appendChild(pre_style);
  var _load=function(url,call){
    var c;
    if (window.XMLHttpRequest) {
      c =new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      c = ActiveXObject("Microsoft.XMLHTTP")
    }
    c.open('GET', url, true);
    c.responseType = 'text';
    c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //header
    c.send();
    c.onreadystatechange = function() {
      if (c.readyState == 4&&c.status == 200) {
        call(c.response||c.responseText);
      }
    }
    return c;
  }
  var _reg=new RegExp("({{)((.|\\n)*?)(}})","g");
  var _numReg=new RegExp("(\\[)((.|\\n)*?)(\\])","g");
  window.__preload_css=function(t,call){
    var m=t.match(new RegExp("(\\(\\()((.|\\n)*?)(\\)\\))","g"));
    if(m!==null){
      var vars=[];
      m.forEach(function(item){
        var _i=item.indexOf('[');
        if(_i!=-1){//css 函数
          var arr=eval(item.match(_numReg)[0]);
          var _v=item.substring(2,_i).trim();
          var _var=jet_css_conf.variable[_v];
          var _varMatch=_var.match(_reg);
          if(_varMatch!==null){
            arr.forEach(function(_arr,i){
              _var=_var.replace(new RegExp("(({{"+(i+1)+"\\|)((.|\\n)*?)(}}))|(\\{\\{"+(i+1)+"\\}\\})","g"),_arr);
            });
            _var=_var.replace(new RegExp("{{[0-9]*\\||{{|}}","g"),'');
          }
          vars.push(item);
          t=t.replace(item,_var);
        }else{
          var pure=item.replace(/\s/g,"");
          if(vars.indexOf(item)==-1){
            vars.push(item);
            t=t.replace(new RegExp('\\(\\('+item.substring(2,item.length-2)+"\\)\\)", "g"), jet_css_conf.variable[pure.substring(2,pure.length-2)])
          }
        }
      });
    }
    if(call){
      call(t);
    }
    return t.replace(/[\r\n]/g,"");
  };
  var o=document.createElement("style");
  o.setAttribute("type","text/css");
  var t=o.cloneNode();
  t.setAttribute("id","__preload_j");
  document.head.appendChild(t);
  t.innerHTML="[J]{visibility:hidden}";
  var e=o.cloneNode();
  e.setAttribute("id","__preload_jl");
  document.head.appendChild(e);
  e.innerHTML="[Jlang]{visibility:hidden}";
  var t=e.cloneNode();
  var common=document.getElementById('commonCss');
  var url=common.href;
  //这里的url不能使用 /src/css，因为如果Jet router 设置了trueBase 则 /src 前面还有路径，所以这里让用户自己填写在link标签里
  window.__css_conf_xhr=_load(url.replace('common.css','css.conf'),function(res){
    eval('window.jet_css_conf='+res);
    _load(url,function(res2){
      window.__preload_css(res2,function(d){
        var comStyle=o.cloneNode();
        comStyle.innerHTML=d.replace(/[\r\n]/g,"");//去掉回车换行;
        document.head.appendChild(comStyle);
        //document.head.removeChild(pre_style);
        document.head.removeChild(common);
      })
    });
  });
  //add global css
  var gs=o.cloneNode();
  gs.setAttribute("id","JglobalStyle");
  gs._styles=[];
  document.head.appendChild(gs);
})()
