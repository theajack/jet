Jet.If=function(opt){
  this.exp=null;
  this.func_true=null;
  this.func_false=null;
  Jet.Base.call(this,opt,_if);
  _initIf.call(this);
};
(function(){var Super = function(){};Super.prototype = Jet.Base.prototype;
  Jet.If.prototype = new Super();
})();Jet.If.prototype.get=function(){
  if(this.name==_index){
    return this.index;
  }else if(this.name==_value){
    return this.data;
  }else{
    return this.data[this.name];
  }
};Jet.If.prototype.refresh=function(i){
  if(this.index!=undefined&&i!=undefined&&this.index!=i){
    this.index==i;
  }
  var d=this.get();
  var opt={
    ele:this.ele,
    data:d,
    jet:this
  }
  if(this.exp(d)===true){
    this.func_true.call(this.jet,opt);
  }else{
    this.func_false.call(this.jet,opt);
  }
};
function _initIf(){
  var _this=this;
  this.regist(function(key,val){
    _this.refresh();
  });
  var ifAttr=this.ele.attr(_if);
  var temp=ifAttr.substring(0,ifAttr.indexOf(":"));
  temp=temp.replaceAll("\\$","d");
  this.exp=new Function("d","return ("+temp+")");
  ifAttr=ifAttr.substring(ifAttr.indexOf(":")+1);
  var func_t="";
  var func_f="";
  ifAttr.split(";").each(function(item){//
    if(item.has("class[")){
      var cls=item.substring(item.indexOf("[")+1,item.length-1);
      if(cls.has("|")){
        var c1=cls.split("|")[0].split(",").join(" ");
        var c2=cls.split("|")[1].split(",").join(" ");
        func_t+="$.ele.removeClass('"+c2+"').addClass('"+c1+"');";
        func_f+="$.ele.removeClass('"+c1+"').addClass('"+c2+"');";
      }else{
        cls=cls.split(",").join(" ");
        func_t+="$.ele.addClass('"+cls+"');";
        func_f+="$.ele.removeClass('"+cls+"');";
      }
    }else if(item.has("attr[")){
      var attr=item.substring(item.indexOf("[")+1,item.length-1);
      if(attr.has("|")){
        attr.split("|")[0].split(",").each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_t+="$.ele.attr('"+pv[0]+"','"+pv[1]+"');";
        });
        attr.split("|")[1].split(",").each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_f+="$.ele.attr('"+pv[0]+"','"+pv[1]+"');";
        })
      }else{
        attr.split(",").each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_t+="$.ele.attr('"+pv[0]+"','"+pv[1]+"');";
          func_f+="$.ele.removeAttr('"+pv[0]+"');";
        });
      }
    }else if(item.has("text[")){
      var text=item.substring(item.indexOf("[")+1,item.length-1);
      if(text.has("|")){
        func_t+="$.ele.txt('"+text.split("|")[0]+"');";
        func_f+="$.ele.txt('"+text.split("|")[1]+"');";
      }else{
        func_t+="$.ele.txt('"+text+"');";
        func_f+="$.ele.txt('');";
      }
    }else if(item.has("html[")){
      var html=item.substring(item.indexOf("[")+1,item.length-1);
      if(html.has("|")){
        func_t+="$.ele.html('"+html.split("|")[0]+"');";
        func_f+="$.ele.html('"+html.split("|")[1]+"');";
      }else{
        func_t+="$.ele.html('"+html+"');";
        func_f+="$.ele.html('');";
      }
    }else if(item.has("css[")){
      var attr=item.substring(item.indexOf("[")+1,item.length-1);
      if(attr.has("|")){
        func_t+="$.ele.removeAttr('style');";
        attr.split("|")[0].split(",").each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_t+="$.ele.css('"+pv[0]+"','"+pv[1]+"');";
        });
        func_f+="$.ele.removeAttr('style');";
        attr.split("|")[1].split(",").each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_f+="$.ele.css('"+pv[0]+"','"+pv[1]+"');";
        })
      }else{
        func_t+="$.ele.removeAttr('style');";
        attr.split(",").each(function(a){
          var pv=a.split("=");
          if(pv.length==1){
            pv[1]="";
          }
          func_t+="$.ele.css('"+pv[0]+"','"+pv[1]+"');";
        });
        func_f+="$.ele.removeAttr('style');";
      }
    }else{
      if(item.has("|")){
        item=item.split("|");
        if(item[0] in _this.jet&&item[1] in _this.jet){
          func_t+="this."+item[0]+".call(this,$);";
          func_f+="this."+item[1]+".call(this,$);";
        }else{
          throw new Error("j-if属性值错误")
        }
      }else{
        if(!(item in _this.jet)){
          throw new Error("j-if属性值错误")
        }
        func_t+="this."+item+".call(this,$);";
      }
    }
  });
  this.func_true=new Function("$",func_t);
  this.func_false=new Function("$",func_f);
  this.refresh();
}