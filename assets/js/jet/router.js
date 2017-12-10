var _route="$router",
  _routeout="$out",
  _routeScript="$routeScript",
  _routeStyle="$routeStyle";
J.ready(function(){
  Jet.router.reload();
});
var _base="/jet";
Jet.router={
  base:_base,
  path:"/",
  conf:{
    router:_base+"/assets/router/router.json",
    html:_base+"/src/html/",
    js:_base+"/src/js/",
    css:_base+"/src/css/",
    image:_base+"/src/image/",
    use:true
  },
  router:{},
  init:function(){
    J.attr("\\"+_route).each(function(item){
      item.clk(function(){
        Jet.router.route(this.attr(_route))
      });
    });
  },
  reload:function(){
    if(Jet.router.conf.use){
      J.load(Jet.router.conf.router,function(json){
        var r=new Function("return "+json)();
        for(var k in r){
          Jet.router.router[_base+k]=r[k];
        }
        Jet.router.route(location.pathname);
      });
      Jet.router.init();
    }
  },
  route:function(url){
    url=_checkUrl(url);
    if(!(url in Jet.router.router)){
      url=Jet.router.base+"/404";
    }
    Jet.router.path=url;
    var stateObject = {};
    var title = url;
    var newUrl = url;
    history.pushState(stateObject,title,newUrl);
    J.load(Jet.router.conf.html+Jet.router.router[url],function(html){
      var out=J.attr("\\"+_routeout).html(html);
      _loadScript(out);
      _loadStyle(out);
    });
  }
};
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
  if(J.id(_routeScript).exist()){
    J.id(_routeScript).remove();
  }
  var script=J.ct('script').attr({
    'id':_routeScript,
    'type':'text/javascript'
  });
  var txt=['//# sourceURL=__dynamic.js\r\n'];
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
}

function _loadStyle(out){
  var style=J.id(_routeStyle);
  if(!style.exist()){
    style=J.ct('style').attr({
      'id':_routeStyle,
      'type':'text/css'
    });
    J.tag('head').append(style);
  }
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
