
Jet.Input=function(opt){
  Jet.Base.call(this,opt,_input);
  opt.par=this;
  _initInput.call(this,opt);
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.Input.prototype = new Super();
})();Jet.Input.prototype.refresh=function(key){
  if(!key||key==this.name){
    var val=(this.func)?this.func(this.get()):this.get();
    this.ele._JT_val(val);
  }
};Jet.Input.prototype.get=function(){
  return this.data[this.name];
};
function _initInput(opt){
  _checkLangJet.call(this,opt);
  var _this=this;
  if(this.ele._JT_val().trim()!=''){
    this.func=new Function("$",'return '+this.ele._JT_val());
  }
  if(this.ele._JT_attr(_bind)==_index){
    _throw('输入框不能绑定数组的索引');
  }
  _checkJetTools.call(this,opt);
  this.regist(function(key,val){
    _this.refresh();
  });
  this.refresh();
  this.isNum=(_JT.type(this.get())=='number');
  this.ele._JT_on("input",function(){
    var val=this._JT_val();
    if(_this.isNum){
      var _v=parseFloat(val);
      if(val==_v.toString())
        val=_v;
    }
    _this.data[_this.name]=val;
  },true);
}