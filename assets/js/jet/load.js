
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