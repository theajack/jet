Jet.Bind=function(opt){
  Jet.Base.call(this,opt,_bind);
  _initBind.call(this,opt);
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.Bind.prototype = new Super();
})();Jet.Bind.prototype.refresh=function(key){
  //if(!key||key==this.name){
    this._tools._jets._JT_each(function(item){
      item.refresh(key);
    });
    this._tools._jetTools._JT_each(function(item){
      item.refresh(key);
    });
  //}
};Jet.Bind.prototype.get=function(){
  return this.data[this.name];
};
function _initBind(opt){
  var _this=this;
  var _data=opt.data[opt.name];
  var bindList=this.ele._JT_findAttr("\\"+_bind);
  var ifList=this.ele._JT_findAttr("\\"+_if);
  var onList=this.ele._JT_findAttr("\\"+_on);
  var runList=this.ele._JT_findAttr("\\"+_run);
  bindList._JT_each(function(item,index){
    if(!item._hasBind){
      var attr=item._JT_attr(_bind);
      var _jet;
      if(attr==_value){
        var _opt=_bindOpt(_this,item,_this.name,_this.par._tools._calls[_this.name]);
        _opt.data=_this.data;
        _opt._data=_this._data;
        if(isInput(item)){
          _jet=new Jet.Input(_opt);
        }else{
          _jet=new Jet.Text(_opt);
        }
      }else if(attr==_index||attr._JT_has("$.$p")){
        var _opt=_bindOpt(_this,item,attr,_this.par._tools._calls);
        _opt.index=_this.name;
        if(isInput(item)){
          //_jet=new Jet.Input(_opt);
          _throw('input:不允许将index绑定到输入项中');
        }else{
          if(attr._JT_has("$.$p")){
            if(attr._JT_has('(')){
              _opt._parIndex=parseInt(attr.substring(attr.indexOf('(')+1,attr.indexOf(')')));
            }else{
              _opt._parIndex=attr.timeOf('$p');
            }
          }
          _jet=new Jet.Text(_opt);
        }
      }else{
        if(_data[attr]){
          var type=_JT.type(_data[attr]);
          var _opt=_bindOpt(_this,item,attr,_this._tools._calls[attr]);
          switch(type){
            case 'json':_jet=new Jet.Bind(_opt);break;
            case 'array':_jet=new Jet.For(_opt);break;
              break;
            default:{
              if(isInput(item)){
                _jet=new Jet.Input(_opt);
              }else{
                _jet=new Jet.Text(_opt);
              }
            };break;
          }
        }else{
          _throw('原数据没有'+attr+'属性');
        }
      }
      _this._tools._jets.push(_jet);
    }
  });
  ifList._JT_each(function(item){
    if(!item._hasIf){
      _this._tools._jetTools.push(new Jet.If(_bindOpt(_this,item)));
    }
  });
  onList._JT_each(function(item){
    if(!item._hasOn){
      _this._tools._jetTools.push(new Jet.On(_bindOpt(_this,item)));
    }
  });
  runList._JT_each(function(item){
    if(!item._hasRun){
      _this._tools._jetTools.push(new Jet.Run(_bindOpt(_this,item)));
    }
  });
  
  _checkJetTools.call(this,opt);
  
  this.regist(function(key,val){
    _this.refresh();
  });
};
function _bindOpt(_this,item,name,calls){
  return {
    jet:_this.jet,
    par:_this,
    ele:item,
    data:_this.data[_this.name],
    _data:(_this._data==undefined)?null:_this._data[_this.name],
    name:name,
    calls:calls||_this._tools.calls
    //indexs:_this.indexs
  }
}

