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
    var C=Jet.__base__;
    Jet.__base__._useList.push('css-config');
    var _JT=C._JT;
    var _load=_JT.load;
    var _reg=new RegExp("({{)((.|\\n)*?)(}})","g");
    var _numReg=new RegExp("(\\[)((.|\\n)*?)(\\])","g");
    var _commonStyle = "JcommonStyle",_COMMON_CSS='COMMON_CSS';
    var conf={};
    conf.preloadCss=function(t,call){
      var m=t.match(new RegExp("(\\(\\()((.|\\n)*?)(\\)\\))","g"));
      if(m!==null){
        var vars=[];
        m.forEach(function(item){
          var _i=item.indexOf('[');
          if(_i!=-1){//css 函数
            var arr=eval(item.match(_numReg)[0]);
            var _v=item.substring(2,_i).trim();
            var _var=conf.conf.variable[_v];
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
              t=t.replace(new RegExp('\\(\\('+item.substring(2,item.length-2)+"\\)\\)", "g"), conf.conf.variable[pure.substring(2,pure.length-2)])
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

    var common=document.getElementById('COMMON_CSS');
    var url=common.href;
    //这里的url不能使用 /src/css，因为如果Jet router 设置了trueBase 则 /src 前面还有路径，所以这里让用户自己填写在link标签里
    conf.xhr=_load(url.replace('common.css','css.conf'),function(res){
      eval('Jet.__css_conf.conf='+res);
      _load(url,function(res2){
        conf.preloadCss(res2,function(d){
          var comStyle=o.cloneNode();
          comStyle.innerHTML=d.replace(/[\r\n]/g,"");//去掉回车换行;
          document.head.insertBefore(comStyle,common)
          //document.head.appendChild(comStyle);
          //document.head.removeChild(pre_style);
          document.head.removeChild(common);
        })
      });
    });
    //add global css

    conf._loadCommonCss=function() {
        var commonCss = [];
        var _r = Jet.router.path.substring(Jet.router.base.length);
        var length = 0, arr = [];
        Jet.__css_conf.conf.common.forEach(function (json) {
            if (json.router.indexOf(_r) != -1) {
                var _c = json.css.trim();
                if (_c.substring(_c.length - 4) == '.css') {//css文件
                    var _a = _c.split(',');
                    arr.push(_a);
                    length += _a.length;
                } else {
                    arr.push(json.css);
                    length++;
                }
            }
        });
        arr.forEach(function (item) {
            if (typeof item == 'string') {
                length--;
                commonCss.push(item);
                _loadCommonCssCall(commonCss, length);
            } else {
                item.forEach(function (_item) {
                    _JT.load(Jet.res.getSrc(_item, 'css'), function (css) {
                        length--;
                        commonCss.push(css);
                        _loadCommonCssCall(commonCss, length);
                    });
                });
            }
        });
    }
    function _loadCommonCssCall(commonCss, length) {
        if (length == 0) {
            if (commonCss.length > 0) {
                if (_JT.id(_commonStyle)._JT_exist()) {
                    if (commonCss.join('') != _JT.id(_commonStyle).innerHTML) {
                        _JT.id(_commonStyle)._JT_html(commonCss.join(''))
                    }
                    // }else if(_JT.id(_routeStyle)._JT_exist()){
                    //   document.head.insertBefore(_JT.ct('style')._JT_attr('id',_commonStyle)._JT_html(commonCss.join('')),_JT.id(_routeStyle));
                } else {
                    document.head.appendChild(_JT.ct('style')._JT_attr('id', _commonStyle)._JT_html(commonCss.join('')));
                }
            } else {
                _JT.id(_commonStyle)._JT_exist(function (item) {
                    item._JT_empty();
                });
            }
        }
    }
    conf._reloadCssConf=function(call) {
      var c=Jet.__css_conf;
        if (c.xhr) c.xhr.abort();
        c.xhr = _JT.load(Jet.router.conf.css + '/css.conf', function (res) {
            eval('Jet.__css_conf.conf=' + res);
            c.xhr = undefined;
            _JT.load(Jet.router.conf.css + '/common.css', function (res2) {
                c.preloadCss(res2, function (d) {
                    var comStyle = document.createElement('style');
                    comStyle.innerHTML = d.replace(/[\r\n]/g, "");//去掉回车换行;
                    document.head.insertBefore(comStyle, _JT.id(_COMMON_CSS));
                    document.head.removeChild(_JT.id(_COMMON_CSS));
                    c.preloadCss = undefined;
                    call();
                })
            });
        });
    }
    conf._replaceCssVar=function(t) {
        var m = t.match(new RegExp("(\\(\\()((.|\\n)*?)(\\)\\))", "g"));
        if (m !== null) {
            var vars = [];
            m.forEach(function (item) {
                var _i = item.indexOf('[');
                if (_i != -1) {//css 函数
                    var arr = eval(item.match(C._numReg)[0]);
                    var _v = item.substring(2, _i).trim();
                    var _var = Jet.__css_conf.conf.variable[_v];
                    var _varMatch = _var.match(_reg);
                    if (_varMatch !== null) {
                        arr.forEach(function (_arr, i) {
                            _var = _var.replace(new RegExp("(({{" + (i + 1) + "\\|)((.|\\n)*?)(}}))|(\\{\\{" + (i + 1) + "\\}\\})", "g"), _arr);
                        });
                        _var = _var.replace(new RegExp("{{[0-9]*\\|", "g"), '').replace(new RegExp('}}', 'g'), '');
                    }
                    vars.push(item);
                    t = t.replace(item, _var);
                } else {
                    var pure = item.replace(/\s/g, "");
                    if (vars.indexOf(item) == -1) {
                        vars.push(item);
                        t = t.replace(new RegExp('\\(\\(' + item.substring(2, item.length - 2) + "\\)\\)", "g"), Jet.__css_conf.conf.variable[pure.substring(2, pure.length - 2)])
                    }
                }
            });
        }
        return t.replace(/[\r\n]/g, "");
    }
    Jet.__css_conf=conf;
  })()
  