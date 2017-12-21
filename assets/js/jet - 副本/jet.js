//

// j-bind
// j-for
// j-switch
// j-case
// j-input  j-type
// j-text 
// $each
// $index
// $value

// j-if = exp:class[a,b|b];attr[a=b,a=b|a];func
// $  class[a|b]  attr[a|b]  function
// j-on 
// j-run

var _bind="$",
  _for="$for",
  _input="$input",
  _text="$text",
  _if="$if",
  _on="$on",
  _run="$run",
  _each="$each",
  _value="$value",
  _index="$index";
function _throw(err){
  throw new Error(err);
}
function _log(info){
  console.log(info);
}
window.Jet=function(opt){
  this._tools={
    _jets:[],
    _jetTools:[],
    _calls:{},
    _data:opt.data
  }
  _define(this,opt.data,this._tools._calls);
  if(opt.func){
    for(var key in opt.func){
      if(this[key]){
        _throw('data 不能与 func 有重名属性');
      }else{
        this[key]=opt.func[key]
      }
    }
  }
  _initJet.call(this,opt,this._tools._calls);
  if(opt.ready)
    opt.ready.call(this);
};Jet.prototype.get=function(){
  return this;
}

function _initJet(opt,calls){
  var _this=this;
  var bindList,ifList,onList,runList;
  if(opt.ele){
    bindList=opt.ele._JT_findAttr("\\"+_bind);
    ifList=opt.ele._JT_findAttr("\\"+_if);
    onList=opt.ele._JT_findAttr("\\"+_on);
    runList=opt.ele._JT_findAttr("\\"+_run);
  }else{
    bindList=_JT.attr("\\"+_bind);
    ifList=_JT.attr("\\"+_if);
    onList=_JT.attr("\\"+_on);
    runList=_JT.attr("\\"+_run);
  }
  var temp=[];
  var dom=document.createDocumentFragment();
  bindList._JT_each(function(item,index){
    temp.push({
      par:item._JT_parent(),
      index:item._JT_index(),
      item:item
    });
  });
  bindList._JT_each(function(item,index){
    if(!item._hasBind){
      dom.appendChild(item);
      var attr=item._JT_attr(_bind);
      if(opt.data==undefined||attr==''){
        var _opt=_jetOpt(_this,item,attr,{_func:[]});
        item.__isRoot=true;
        _this._tools._jets.push(new Jet.Bind(_opt));
      }else if(opt.data[attr]){
        var type=_JT.type(opt.data[attr]);
        var _opt=_jetOpt(_this,item,attr,calls[attr]);
        var _jet;
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
        item.__isRoot=true;//为了记录根元素的初始位置，忽略非根元素
        _this._tools._jets.push(_jet);
      }else{
        _throw('原数据没有'+attr+'属性');
      }
    }
  });
  
  ifList._JT_each(function(item){
    if(!item._hasIf){
      _this._tools._jetTools.push(new Jet.If(_jetOpt(_this,item)));
    }
  });
  onList._JT_each(function(item){
    if(!item._hasOn){
      _this._tools._jetTools.push(new Jet.On(_jetOpt(_this,item)));
    }
  });
  runList._JT_each(function(item){
    if(!item._hasRun){
      _this._tools._jetTools.push(new Jet.Run(_jetOpt(_this,item)));
    }
  });
  temp._JT_each(function(json){
    if(json.item.__isRoot==true)
      json.par._JT_append(json.item,json.index);
  });
  //Jet.$.id('__preload')._JT_remove();
  
  //__par._JT_append(dom,__index);
};


function _jetOpt(_this,item,name,calls){
  return {
    jet:_this,
    par:_this,
    ele:item,
    data:_this,
    _data:_this._tools._data,
    name:name,
    calls:calls||_this._tools.calls
    //indexs:[]
  };
}
function isInput(obj){
  var tag=obj.tagName;
  return (tag=="INPUT"||tag=="TEXTAREA"||tag=="SELECT"||(obj._JT_hasAttr('contenteditable')&&obj.attr('contenteditable')!='false'))
}
Jet.Base=function(opt,type){
  this.jet=opt.jet;
  this.par=opt.par;
  this.ele=opt.ele;
  this._data=opt._data;
  this.data=opt.data;
  this.type=type;
  this.name=opt.name;
  this.index=opt.index;
  //this.indexs=opt.indexs;
  this._tools={
    _jets:[],
    _jetTools:[],
    _calls:opt.calls
  }
  switch(this.type){
    case _if:this.ele._hasIf=true;break;
    case _on:this.ele._hasOn=true;break;
    case _run:this.ele._hasRun=true;break;
    default:this.ele._hasBind=true;break;
  }
};Jet.Base.prototype.regist=function(name,call){
  if(arguments.length==2){
    if(!this._tools._calls[name]){
      _throw('没有'+name+'属性');
    }
    if(_JT.type(call)!='function'){
      _throw('call参数必须为函数');
    }
    this._tools._calls[name]._func.push(call);
  }else{
    if(_JT.type(name)!='function'){
      _throw('call参数必须为函数');
    }
    this._tools._calls._func.push(name);
  }
};
Array.prototype.$push=function(d){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data.push(d);
  _defineCom(data,data.length,_data,_f._tools._calls);
  _f.refresh.push.call(_f);
};Array.prototype.$pushArray=function(arr){
  var _this=this;
  arr._JT_each(function(item){
    _this.$push(item)
  });
};Array.prototype.$prep=function(d){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data._JT_prepend(d);
  _f._tools._calls._JT_prepend({});
  _defineArray(data,_data,_f._tools._calls);
  _f.refresh.prep.call(_f);
};Array.prototype.$prepArray=function(arr){
  this.$insertArray(arr,0);
};Array.prototype.$insert=function(d,index){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data._JT_insert(d,index);
  _f._tools._calls._JT_insert({},index);
  _defineArrayFormIndex(data,_data,_f._tools._calls,index);
  _f.refresh.insert.call(_f,index);
};Array.prototype.$insertArray=function(arr,index){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data._JT_insertArray(arr,index);
  var calls=[];
  arr._JT_each(function(){
    calls.push({});
  });
  _f._tools._calls._JT_insertArray(calls,index);
  _defineArrayFormIndex(data,_data,_f._tools._calls,index);
  _f.refresh.insertArray.call(_f,arr,index);
};Array.prototype.$remove=function(i,n){
  n=n||1;
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data.splice(i,n);
  _f._tools._calls.splice(i,n);
  _defineArrayFormIndex(data,_data,_f._tools._calls,i);
  data.length-=n;
  _f.refresh.remove.call(_f,i,n);
};


function _checkJetTools(opt){
  var arr=this._tools._jetTools;
  if(this.ele._JT_hasAttr(_on)){
    if(!this.ele._hasOn){
      arr.push(new Jet.On(opt));
    }
  }
  if(this.ele._JT_hasAttr(_run)){
    if(!this.ele._hasRun){
      arr.push(new Jet.Run(opt));
    }
  }
  if(this.ele._JT_hasAttr(_if)){
    if(!this.ele._hasIf){
      arr.push(new Jet.If(opt));
    }
  }
}
Jet.$=_JT;

  
  
  
  
  
  
  
  
  
  
  
  