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
    var _cssConfCom = "CssConfCommon",_COMMON_CSS='COMMON_CSS';
    var conf={};
    conf.preloadCss=function(t){
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
    //   if(call){
    //     call(t);
    //   }
      return t.replace(/[\r\n]/g,"");
    };
    var o=document.createElement("style");
    o.setAttribute("type","text/css");

    var common=document.getElementById(_COMMON_CSS);
    var commonCssName='common.css'
    var url=common.href;
    if(url.indexOf('src/css/common.less')!==-1){
        commonCssName='common.less';
    }
    var confCommon=o.cloneNode()._JT_attr('style-type',_cssConfCom);
    document.head.appendChild(confCommon);
    //这里的url不能使用 /src/css，因为如果Jet router 设置了trueBase 则 /src 前面还有路径，所以这里让用户自己填写在link标签里
    conf.xhr=_load(url.replace(commonCssName,'css.conf'),function(res){
      eval('Jet.__css_conf.conf='+res);
      _load(url,function(res2){
        if(_JT.id(_COMMON_CSS)._JT_attr('jless')=='false'){
            res2=conf.preloadCss(res2)
        }else{
            res2=C._less(res2);
        }
        var comStyle=_ctCommonStyle()._JT_html(res2);
        document.head.insertBefore(comStyle,common)
        document.head.removeChild(common);
      });
    });
    //add global css
    //路由页面公共样式
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
        if(arr.length==0){
            confCommon._JT_empty();
        }
        arr.forEach(function (item) {
            if (typeof item == 'string') {
                length--;
                commonCss.push(item);
                _loadCommonCssCall(commonCss, length);
            } else {
                item.forEach(function (_item) {
                    _JT.load(C._getSrc(_item, 'css'), function (css) {
                        length--;
                        commonCss.push(css);
                        _loadCommonCssCall(commonCss, length);
                    });
                });
            }
        });
    }
    //路由页面公共样式
    function _loadCommonCssCall(commonCss, length) {
        if (length == 0) {
            if (commonCss.length > 0) {
                var res=C._addScopedCss(C._less(commonCss.join('')),'RouterOut')
                if (confCommon._JT_exist()) {
                    if (commonCss.join('') != confCommon.innerHTML) {
                        confCommon._JT_html(res)
                    }
                    // }else if(_JT.id(_routeStyle)._JT_exist()){
                    //   document.head.insertBefore(_JT.ct('style')._JT_attr('id',_commonStyle)._JT_html(commonCss.join('')),_JT.id(_routeStyle));
                } else {
                    confCommon=_JT.ct('style')._JT_attr({
                        'type': 'text/css',
                        'style-type':_cssConfCom
                    })._JT_html(res);
                    document.head.appendChild(confCommon);
                }
            } else {
                confCommon._JT_exist(function (item) {
                    item._JT_empty();
                });
            }
        }
    }
    function _ctCommonStyle(){
        return  _JT.ct('style')._JT_attr({
            'type': 'text/css',
            'style-type':'CommonCss'
        });
    }
    conf._reloadCssConf=function(call) {
      var c=Jet.__css_conf;
        if (c.xhr) c.xhr.abort();
        c.xhr = _JT.load(Jet.router.conf.css + '/css.conf', function (res) {
            eval('Jet.__css_conf.conf=' + res);
            c.xhr = undefined;
            _JT.load(Jet.router.conf.css + '/'+commonCssName, function (res2) {
                if(_JT.id(_COMMON_CSS)._JT_attr('jless')=='false'){
                    res2=conf.preloadCss(res2)
                }else{
                    res2=C._less(res2);
                }
                var comStyle = _ctCommonStyle()._JT_html(res2);
                document.head.insertBefore(comStyle, _JT.id(_COMMON_CSS));
                document.head.removeChild(_JT.id(_COMMON_CSS));
                c.preloadCss = undefined;
                call();
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
  