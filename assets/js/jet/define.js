

function _define(obj,data,calls) {
  if(!calls._func)calls._func=[];
  for(var k in data){
    _defineCom(obj,k,data,calls);
  }
}
function _defineArray(obj,data,calls){
  _defineArrayFormIndex(obj,data,calls);
}
function _defineArrayFormIndex(obj,data,calls,index){
  if(!calls._func)calls._func=[];
  for(var k=index||0;k<data.length;k++){
    _defineCom(obj,k,data,calls);
  }  
}
function _defineCom(obj,k,data,calls){
  var type=J.type(data[k]);
  if(type=="json"){
    var _o={};
    if(!calls[k])calls[k]={};
    _defineBase(obj,data,k,_o,calls[k])
    _define(_o,data[k],calls[k]);
  }else if(type=='array'){
    var _o=[];
    if(!calls[k])calls[k]=[];
    _defineBase(obj,data,k,_o,calls[k]);
    _defineArray(_o,data[k],calls[k]);
  }else{
    if(!calls[k]||!calls[k]._func)calls[k]={_func:[]};
    defineFinal(obj,data,k,calls[k])
  }
}
function _defineBase(obj,data,key,temp,calls){
  Object.defineProperty(obj, key, {
    configurable:true,
    get: function () {
      return temp;
    },
    set: function (val) {
      data[key] = val;
      _copyValue(temp,val,calls);
      calls._func.each(function(call){
        call(key,val);
      })
    }
  })
}
function defineFinal(obj,data,key,calls){
  Object.defineProperty(obj, key, {
    configurable:true,
    get: function () {
      return data[key];
    },
    set: function (val) {
      data[key] = val;
      calls._func.each(function(call){
        call(key,val);
      })
    }
  })
}

function _copyValue(a,b,calls){
  if(_checkType(a,b)=='json'){
    _copyValueJson(a,b,calls);
  }else{
    _copyValueArr(a,b,calls);
  }
}
function _copyValueJson(a,b,calls){
  for(var k in b){
    _copyCom(a,b,k,calls);
  }
}
function _copyValueArr(a,b,calls){
  for(var k=0;k<b.length;k++){
    _copyCom(a,b,k,calls);
  }
}
function _copyCom(a,b,k,calls){
  if(a[k]){
    var t=J.type(a[k]);
    if(t=='json'){
      _copyValueJson(a[k],b[k],calls[k]);
    }else if(t=='array'){
      _copyValueArr(a[k],b[k],calls[k]);
    }else{
      a[k]=b[k];
    }
  }else{
    _defineCom(a,k,b,calls)
  }
}

function _checkType(a,b){
  var a_t=J.type(a);
  var b_t=J.type(b);
  if(a_t!=b_t){
    _throw('不允许前后设置的值类型不一致');
  }
  return a_t;
}