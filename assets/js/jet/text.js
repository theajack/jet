
Jet.Text=function(opt){
  Jet.Base.call(this,opt,_text);
  this._parIndex=opt._parIndex;//多层循环中的父元素的索引
  opt.par=this;
  _initText.call(this,opt);
};(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.Text.prototype = new Super();
})();Jet.Text.prototype.refresh=function(key){
  if(!key||key==this.name){
    var val=(this.func)?this.func(this.get()):this.get();
    this.ele.txt(val);
  }
};Jet.Text.prototype.get=function(){//indexs
  if(this._parIndex){
    return _getParIndex(this,this._parIndex)
    //return this.indexs[this.indexs.length-1-this._parIndex];
  }else{
    if(this.index!=undefined){
      return this.index;
    }else{
      return this.data[this.name];
    }
  }
};Jet.Text.prototype.setIndex=function(i){//indexs
  this.index=i;
  this.refresh();
  this._tools._jetTools.each(function(item){
    if(item.name==_index){
      item.refresh(i);
    }
  });
};
function _getParIndex(_this,i){
  var par=_this.par;
  while(i>0){
    par=par.par.par;
    i--;
  }
  return par.ele.index();
}
function _initText(opt){
  var _this=this;
  if(this.ele.html().trim()!=''){
    this.func=new Function("$",'return '+this.ele.html());
  }
  _checkJetTools.call(this,opt);
  this.regist(function(key,val){
    _this.refresh();
  });
  this.refresh();
}