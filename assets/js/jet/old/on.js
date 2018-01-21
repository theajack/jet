Jet.On=function(opt){
  Jet.Base.call(this,opt,_on);
  _initOn.call(this);
};(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.On.prototype = new Super();
})();Jet.On.prototype.get=function(){
  if(this.index!=undefined){
    return this.index;
  }
  if(this.data==undefined){
    return null;
  }else{
    return this.data[this.name];
  }
};Jet.On.prototype.refresh=function(i){
  if(this.index!=undefined&&i!=undefined&&this.index!=i){
    this.index=i;
  }
};
function _initOn(){
  var _this=this;
  var attr=this.ele._JT_attr(_on)
  if(!attr._JT_has(":")){
    _throw('j-on 属性格式错误:'+attr);
  }
  var e=attr.split(":");
  if(e[1]._JT_has('$valid')){
    if(e[1]._JT_has('=>')){
      _this.valid=true;
      _this.validPar=Jet.valid.findValidPar(_this.ele);
      _this.func=_this.jet[e[1].substring(e[1].indexOf('=>')+2)];
    }else{
      _throw('valid:"'+e[1]+'" 格式有误，操作符为 =>')
    }
  }else{
    _this.func=_this.jet[e[1]];
  }
  if(!_this.func||_JT.type(_this.func)!='function'){
    _throw('没有 '+e[1]+' 方法')
  }
  this.ele._JT_on(e[0],function(event){
    var opt={
      ele:this,
      data:_this.get(),
      e:event,
      jet:_this
    };
    if(_this.valid){
      _this.validPar._JT_validate(function(){
        _this.func.call(_this.jet,opt);
      });
    }else{
      _this.func.call(_this.jet,opt);
    }
  });
}

