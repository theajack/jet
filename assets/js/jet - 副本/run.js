Jet.Run=function(opt){
  Jet.Base.call(this,opt,_run);
  _initRun.call(this,opt)
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.Run.prototype = new Super();
})();Jet.Run.prototype.get=function(){
  if(this.index!=undefined){
    return this.index;
  }
  if(this.data==undefined){
    return null;
  }else{
    return this.data[this.name];
  }
};Jet.Run.prototype.refresh=function(i){
  if(this.index!=undefined&&i!=undefined&&this.index!=i){
    this.index==i;
  }
  this.run();
};Jet.Run.prototype.run=function(){
  var _this=this;
  this.runs._JT_each(function(name){
    _this.jet[name].call(_this.jet,{
      ele:_this.ele,
      data:_this.get(),
      jet:_this
    });
  });
};
function _initRun(opt){
  this.runs=this.ele._JT_attr(_run).split(",");
  this.run();
}