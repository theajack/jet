var isDisable=false;
if(arguments.length==2){
  if(name._JT_has('.')){
    var a=name.split('.');
    var _call=this._tools._calls;
    for(var i=1;i<a.length;i++){
        _call=_getCallback(_call,a[i])//_call[a[i]];
        if(_call==null){
          isDisable=true;
          if(!this.$DOM){
            this.disable();
          }
          break;
        }
    }
    if(!isDisable)
      _call._func.push(call);
  }else{
    if(_JT.type(call)!='function'){
      _throw('call参数必须为函数');
    }
    var _call=_getCallback(this._tools._calls,name)
    if(_call==null){
      isDisable=true;
      if(!this.$DOM){
        this.disable();
      }
    }else{
      _call._func.push(call);
    }
  }
}else{
  if(_JT.type(name)!='function'){
    _throw('call参数必须为函数');
  }
  this._tools._calls._func.push(name);
}