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
if(typeof J=="undefined"){
  throw new Error("该框架依赖Jetter.js,http://www.theajack.com/jetterjs/assets/js/jetter-lite.min.js");
}
function _throw(err){
  throw new Error(err);
}
function _log(info){
  console.log(info);
}
var Jet=function(opt){
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
    bindList=opt.ele.findAttr("\\"+_bind);
    ifList=opt.ele.findAttr("\\"+_if);
    onList=opt.ele.findAttr("\\"+_on);
    runList=opt.ele.findAttr("\\"+_run);
  }else{
    bindList=J.attr("\\"+_bind);
    ifList=J.attr("\\"+_if);
    onList=J.attr("\\"+_on);
    runList=J.attr("\\"+_run);
  }
  var temp=[];
  var dom=document.createDocumentFragment();
  bindList.each(function(item,index){
    temp.push({
      par:item.parent(),
      index:item.index(),
      item:item
    });
  });
  bindList.each(function(item,index){
    if(!item._hasBind){
      dom.append(item);
      var attr=item.attr(_bind);
      if(opt.data[attr]){
        var type=J.type(opt.data[attr]);
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
  
  ifList.each(function(item){
    if(!item._hasIf){
      _this._tools._jetTools.push(new Jet.If(_jetOpt(_this,item)));
    }
  });
  onList.each(function(item){
    if(!item._hasOn){
      _this._tools._jetTools.push(new Jet.On(_jetOpt(_this,item)));
    }
  });
  runList.each(function(item){
    if(!item._hasRun){
      _this._tools._jetTools.push(new Jet.Run(_jetOpt(_this,item)));
    }
  });
  temp.each(function(json){
    if(json.item.__isRoot==true)
      json.par.append(json.item,json.index);
  });
  
  Jet.load.init();
  Jet.valid.init();
  //__par.append(dom,__index);
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
  return (tag=="INPUT"||tag=="TEXTAREA"||tag=="SELECT"||(obj.hasAttr('contenteditable')&&obj.attr('contenteditable')!='false'))
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
    if(J.type(call)!='function'){
      _throw('call参数必须为函数');
    }
    this._tools._calls[name]._func.push(call);
  }else{
    if(J.type(name)!='function'){
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
  arr.each(function(item){
    _this.$push(item)
  });
};Array.prototype.$prep=function(d){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data.prepend(d);
  _f._tools._calls.prepend({});
  _defineArray(data,_data,_f._tools._calls);
  _f.refresh.prep.call(_f);
};Array.prototype.$prepArray=function(arr){
  this.$insertArray(arr,0);
};Array.prototype.$insert=function(d,index){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data.insert(d,index);
  _f._tools._calls.insert({},index);
  _defineArrayFormIndex(data,_data,_f._tools._calls,index);
  _f.refresh.insert.call(_f,index);
};Array.prototype.$insertArray=function(arr,index){
  var _f=this._jet;
  var data=_f.data[_f.name];
  var _data=_f._data[_f.name];
  _data.insertArray(arr,index);
  var calls=[];
  arr.each(function(){
    calls.push({});
  });
  _f._tools._calls.insertArray(calls,index);
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
  if(this.ele.hasAttr(_on)){
    if(!this.ele._hasOn){
      arr.push(new Jet.On(opt));
    }
  }
  if(this.ele.hasAttr(_run)){
    if(!this.ele._hasRun){
      arr.push(new Jet.Run(opt));
    }
  }
  if(this.ele.hasAttr(_if)){
    if(!this.ele._hasIf){
      arr.push(new Jet.If(opt));
    }
  }
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  