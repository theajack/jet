
var _load="$load";
Jet.load={
  init:function(){
    var data={};
    J.attr('\\'+_load).each(function(item){
      var attr=item.attr(_load);
      J.load(Jet.router.conf.html+attr,function(html){
        var out=item.html(html);
        _loadCompScript(out,attr);
        _loadCompStyle(out,attr);
      });
    });
  }
}

function _loadCompScript(out,attr){
  var script=J.attr('load-script="'+attr+'"');
  if(!script.exist()){
    script=J.ct('script').attr({
      'load-script':attr,
      'type':'text/javascript'
    });
    var txt=['//# sourceURL='+attr+'.js\r\n'];
    var scripts=out.findTag("script");
    var index=-1;
    for(var i=scripts.length-1;i>=0;i--){
      if(scripts[i].hasAttr("src")){
        index=i;
        break;
      }
    }
    scripts.each(function(item,i){
      if(item.hasAttr("src")){
        J.load(Jet.router.conf.js+item.attr("src"),function(scr){
          txt[i+1]=scr;
          if(i==index){
            script.html(txt.join(''));
            J.body().append(script);
          }
        });
      }else{
        txt[i+1]=item.html();
      }
      item.remove();
    });
    if(index==-1){
      script.html(txt.join(''));
      J.body().append(script);
    }
  }else{
    var txt=script.html();
    script.remove();
    J.body().append(J.ct('script').attr({
      'load-script':attr,
      'type':'text/javascript'
    }).html(txt));
  }
}
function _loadCompStyle(out,attr){
  if(!J.attr('load-style="'+attr+'"').exist()){
    var style=J.ct('style').attr({
      'load-style':attr,
      'type':'text/css'
    });
    J.tag('head').append(style);
    style.empty();
    var txt=[];
    var styles=out.findTag("style");
    var index=-1;
    for(var i=styles.length-1;i>=0;i--){
      if(styles[i].hasAttr("src")){
        index=i;
        break;
      }
    }
    styles.each(function(item,i){
      if(item.hasAttr("src")){
        J.load(Jet.router.conf.css+item.attr("src"),function(css){
          txt[i]=css;
          if(i==index){
            style.html(txt.join(''));
          }
        });
      }else{
        txt[i]=item.html();
      }
      item.remove();
    });
    if(index==-1){
      style.html(txt.join(''));
    }
  }
}