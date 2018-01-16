JUI.SWICTH=function(opt){
    this.ele=opt.ele||null;
    this._value=opt.value||false;
    this.onchange=opt.onchange||function(){};
    this.value=opt.value||'';
    this._valueList=opt._valueList||[];
    var _this=this;
    Object.defineProperty(_this,'value',{
        configurable:true,
        get:function(){
            return _this._value;
        },set:function(v){
            if(_this._valueList.has(v)&&v!=_this.value){
                _this._value=v;
                _this.onchange();
            }
        }
    });
    this.init();
};
JUI.SWICTH.prototype.init=function(){
    //var _jui=new JUI.SWICTH({ele:item,text:item.txt(),value:getValueOrText(item)});
    var _jui=this;
    var item=this.ele;
    var child=item.child();
    if(child.length>0){
        if(child.length!=2){
            _throw('swicth 组件只能有两个元素');
        }
        var v=getValueOrText(child[0]);
        this._valueList.push(v);
        var _on_t=J.ct('div.j-switch-t.j-st-on').txt(child[0].txt()).attr('value',v);
        var v=getValueOrText(child[1]);
        if(this._valueList[0]==v)_throw('swicth 两个元素值不能相等');
        this._valueList.push(v);
        this._value=v;
        var _off_t=J.ct('div.j-switch-t.j-st-off').txt(child[1].txt()).attr('value',v);
        if(child[0].hasAttr('checked')){
            item.addClass('j-s-on');
            child[0].removeAttr('checked')
            this._value=this._valueList[0];
        }
        item.empty();
        item.append([_on_t,_off_t]);
    }else{
        item.empty();
        this._valueList=[true,false];
        this._value=false;
        if(item.hasAttr('on')){
            this._value=true;
            item.addClass('j-s-on');
            item.removeAttr('on');
        }
    }
    item.attr('value',this._value);
    item.append(J.ct('div.j-switch-c'));
    item.clk(function(){
        if(_jui._valueList.indexOf(_jui._value)==0){
            _jui.value=_jui._valueList[1]
        }else{
            _jui.value=_jui._valueList[0]
        }
    });
    _jui.onchange=function(){
        if(_jui._valueList.indexOf(_jui._value)==0){
            item.addClass('j-s-on');
        }else{
            item.removeClass('j-s-on');
        }
        item.attr('value',_jui._value);
    }
    item.$jui=_jui;
};
JUI.SWICTH._name='j-switch';
JUI.SWICTH.init=function(item){
    getEleList(item,this._name).each(function(item){
        new JUI.SWICTH({ele:item});
    });
};