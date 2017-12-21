var _lang="$lang",_name="$name";
var _jl_name='';
Jet.lang=function(opt){
  this.type=_lang;
  this.data=opt;
}
Jet.lang.list=[];
Jet.lang.use=false;
Jet.lang.conf=function(list){
  if(_JT.type(list)!='array'){
    throw new Error('Jet.lang.init: 参数是一个数组');
  }else{
    this.use=true;
    this.list=list;
    _jl_name=list[0];
  }
};
Jet.lang.jets=[];
Jet.lang.init=function(obj){
  var list;
  if(obj==undefined){
    list=_JT.attr("\\"+_lang);
  }else{
    list=obj._JT_findAttr("\\"+_lang)
  }
  list._JT_each(function(item){
    item._jet_langs={};
    item._JT_findAttr('\\'+_name)._JT_each(function(_item){
      var attr=_item._JT_attr(_name);
      item._jet_langs[attr]=_item._JT_html();
    });
    item._JT_html(item._jet_langs[Jet.lang.name]);
    Jet.valid.initValid(item);
  });
};
Object.defineProperty(Jet.lang, 'name', {
  configurable:true,
  get: function () {
    return _jl_name;
  },
  set: function (val) {
    _jl_name = val;
    _refreshLang();
  }
})
function _refreshLang(){
  if(Jet.lang.use){
    _JT.attr("\\"+_lang)._JT_each(function(item){//静态文字
      item._JT_html(item._jet_langs[Jet.lang.name]);
      Jet.valid.initValid(item);
    });
    Jet.lang.jets._JT_each(function(item){//绑定文字
      item.refresh();
    });
  }
}
function _checkLangJet(opt){
  if(_JT.type(opt._data)=='json'&&opt.name in opt._data){
    if(opt._data[opt.name].type==_lang){
      Jet.lang.jets.push(this);
    }
  }
}
window.JL=function(opt){
  return new Jet.lang(opt);
}
