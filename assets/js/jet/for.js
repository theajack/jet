Jet.For=function(opt){
  Jet.Base.call(this,opt,_for);
  _initFor.call(this,opt);
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.For.prototype = new Super();
})();Jet.For.prototype.refresh=function(key){
  if(!key||key==this.name){
    this._tools._jets.each(function(item){
      item.refresh(key);
    });
    this._tools._jetTools.each(function(item){
      item.refresh(key);
    });
  }
};Jet.For.prototype.get=function(){
  return this.data[this.name];
};Jet.For.prototype.refreshParIndex=function(){
  this._tools._jets.each(function(item){
    item._tools._jets.each(function(_item){
      if(_item._parIndex&&_item.type==_text){
        _item.refresh();
      }else if(_item.type==_for){
        _item.refreshParIndex();
      }
    });
  });
};Jet.For.prototype.refresh.push=function(){
  if(this._switch){
    var _t=this._data[this.name].last()[this._type];
    if(_t in this._html){
      this.ele.append(this._html[_t]);
    }else{
      _throw('swicth:指定属性的值不在swicth枚举内');
    }
  }else{
    this.ele.append(this._html);
  }
  var _opt=_forOpt(this,this.ele.child().last(),this.data[this.name].length-1);
  if(J.type(_opt.data[0])=='array'){
    this._tools._jets.push(new Jet.For(_opt));
  }else{
    this._tools._jets.push(new Jet.Bind(_opt));
  }
};Jet.For.prototype.refresh.prep=function(){
  if(this._switch){
    var _t=this._data[this.name].first()[this._type];
    if(_t in this._html){
      this.ele.prepend(this._html[_t]);
    }else{
      _throw('swicth:指定属性的值不在swicth枚举内');
    }
  }else{
    this.ele.prepend(this._html);
  }
  var _opt=_forOpt(this,this.ele.child().first(),0);
  if(J.type(_opt.data[0])=='array'){
    this._tools._jets.prepend(new Jet.For(_opt));
  }else{
    this._tools._jets.prepend(new Jet.Bind(_opt));
  }
  _refreshIndex.call(this,0);
};
Jet.For.prototype.refresh.insert=function(index){
  if(this._switch){
    var _t=this._data[this.name][index][this._type];
    if(_t in this._html){
      this.ele.append(this._html[_t],index);
    }else{
      _throw('swicth:指定属性的值不在swicth枚举内');
      return;
    }
  }else{
    this.ele.append(this._html,index);
  }
  var _opt=_forOpt(this,this.ele.child(index),index);
  if(J.type(_opt.data[0])=='array'){
    this._tools._jets.insert(new Jet.For(_opt),index);
  }else{
    this._tools._jets.insert(new Jet.Bind(_opt),index);
  }
  _refreshIndex.call(this,index+1);
};
Jet.For.prototype.refresh.insertArray=function(arr,index){//bug
  var _this=this;
  var type=J.type(arr[0]);
  arr.each(function(item,i){
    var _i=index+i;
    if(_this._switch){
      var _t=_this._data[_this.name][_i][_this._type];
      if(_t in _this._html){
        _this.ele.append(_this._html[_t],_i);
      }else{
        _throw('swicth:指定属性的值不在swicth枚举内');
      }
    }else{
      _this.ele.append(_this._html,_i);
    }
    var _opt=_forOpt(_this,_this.ele.child(_i),_i);
    if(type=='array'){
      _this._tools._jets.insert(new Jet.For(_opt),_i);
    }else{
      _this._tools._jets.insert(new Jet.Bind(_opt),_i);
    }
  });
  _refreshIndex.call(this,index+arr.length);
};
Jet.For.prototype.refresh.remove=function(index,n){
  for(var i=0;i<n;i++){
    this.ele.child(index).remove();
  }
  this._tools._jets.splice(index,n);
  _refreshIndex.call(this,index);
};
function _refreshIndex(start){
  for(var i=start;i<this._tools._jets.length;i++){
    this._tools._jets[i]._tools._jets.each(function(item){
      if(item.name==_index){
        item.setIndex(i);
      }else if(item.type==_for){
        item.refreshParIndex();
      }
    });
  }
}
function _initForRule(ele){
  if(this.ele.child(0).attr(_bind).has('=')){//switch模式
    this._switch=true;
    this._html={};
    this._type=null;
    var _this=this;
    var temp={};
    this.ele.child().each(function(item){
      var val=item.attr(_bind);
      if(_this._type==null)_this._type=val.substring(val.indexOf('.')+1,val.indexOf('='))
      if(!val.has('='))_throw('swicth:html格式有误');
      val=val.substring(val.indexOf('=')+1);
      _this._html[val]=item.allHtml();
      temp[val]=J.ct('div').append(item);
    });
    for(var i=0;i<this.data[this.name].length;i++){
      var t=this.data[this.name][i][this._type];
      if(t in this._html){
        if(t in temp){
          this.ele.append(temp[t].child(0));
          delete temp[t];
        }else{
          this.ele.append(this._html[t]);
        }
      }else{
        _throw('swicth:指定属性的值不在swicth枚举内');
      }
    }
  }else{//普通模式
    if(!this.ele.findAttr("\\"+_bind+'="'+_each+'"').exist()){
      var html=this.ele.html();
      this._html='<div '+_bind+'="'+_each+'">'+html+'</div>'
      for(var i=0;i<this.data[this.name].length;i++){
        var each=J.ct('div').attr(_bind,_each);
        if(i==0){
          this.ele.child().each(function(item){
            each.append(item);
          });
        }else{
          each.html(html);
        }
        this.ele.append(each);
      }
    }else if(this.ele.child().length!=1||this.ele.child(0).attr(_bind)!=_each){
      _throw('循环元素绑定格式错误！');
    }else{
      var html=this.ele.html();
      this._html=html;
      for(var i=0;i<this.data[this.name].length-1;i++){
        this.ele.append(html);
      }
    }
  }
}
function _initFor(opt){
  var _this=this;
  this.data[this.name]._jet=this;
  _initForRule.call(this);
  this.ele.child().each(function(item,i){
    if(!item._hasBind){
      var _opt=_forOpt(_this,item,i);
      // _opt.data[_opt.name].$par=_this.data;
      // _opt.data[_opt.name].$index=i;
      var _jet;
      if(J.type(_opt.data[0])=='array'){
        _jet=new Jet.For(_opt);
      }else{
        _jet=new Jet.Bind(_opt);
      }
      _this._tools._jets.push(_jet);
    }
  });
  _checkJetTools.call(this,opt);
  this.regist(function(key,val){
    _this.refresh();
  });
};
function _forOpt(_this,item,index){
  return {
    jet:_this.jet,
    par:_this,
    ele:item,
    data:_this.data[_this.name],
    _data:_this._data[_this.name],
    name:index,
    calls:_this._tools._calls[index]
    //indexs:J.clone(_this.indexs).append(index)
  }
}