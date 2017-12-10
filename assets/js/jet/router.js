var _route="$router",
  _routeout="$out",
  _routeScript="$routeScript",
  _routeStyle="$routeStyle";
J.ready(function(){
  Jet.router.reload();
});
Jet.router={
  base:"/jet",
  path:"/",
  conf:{
    router:this.base+"/assets/router/router.json",
    html:this.base+"/src/html/",
    js:this.base+"/src/js/",
    css:this.base+"/src/css/",
    image:this.base+"/src/image/",
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
      Jet.router.path=location.pathname;
      J.load(Jet.router.conf.router,function(json){
        Jet.router.router=new Function("return "+json)();
        Jet.router.route(location.pathname);
      });
      Jet.router.init();
    }
  },
  route:function(url){
    url=_checkUrl(url);
    if(!(url in Jet.router.router)&&url!=""){
      url="/404";
    }
    Jet.router.url=url;
    var stateObject = {};
    var title = url;
    var newUrl = url;
    history.pushState(stateObject,title,newUrl);
    Jet.router.path=location.pathname;
    J.load(Jet.router.conf.html+Jet.router.router[url],function(html){
      var out=J.attr("\\"+_routeout).html(html);
      _loadScript(out);
      _loadStyle(out);
    });
  }
};
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
function _checkUrl(url){
  if(url=='/'){
    url=Jet.router.base+'/home';
  }else{
    if(url[0]!="/"){url=Jet.router.path+'/'+url};
    if(url[url.length-1]=='/')url=url.substring(0,url.length-1);
  }
  return url;
}