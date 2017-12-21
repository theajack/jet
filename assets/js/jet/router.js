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
    router:"/jet/assets/router/router.json",
    html:"/jet/src/html/",
    js:"/jet/src/js/",
    css:"/jet/src/css/",
    image:"/jet/src/image/"
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
      Jet.load.init();
      _loadScript(out);
      _loadStyle(out);
      Jet.valid.init();
      Jet.lang.init();
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