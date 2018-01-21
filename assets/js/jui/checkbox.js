/*CHECKBOX_GROUP************************************************************/
JUI.CHECKBOX_GROUP=function(opt){
    this.ele=opt.ele||null;
    this._value=opt.value||[];
    this.onchange=opt.onchange||function(){};
    var _this=this;
    this.checkList=[];
    Object.defineProperty(_this,'value',{
        configurable:true,
        get:function(){
            return _this._value;
        },set:function(v){
            _this._value=v;
            _this.onchange.call(_this);
        }
    });


    //需重新定义 没有jet框架时的属性
};
JUI.CHECKBOX_GROUP._name='j-checkbox-group';
JUI.CHECKBOX_GROUP.def_c_group=null;
JUI.CHECKBOX_GROUP.init=function(item){
    getEleList(item,this._name).each(function(item){
        _initOneCheckGroup(item);
    });
    _initOneCheckGroup(J.body(),true);
};
function _initOneCheckGroup(item,isBody){
    if(!isBody&&item.findClass(JUI.CHECKBOX_GROUP._name).length>0){
        _throw('checkbox group 不支持嵌套使用');
    }
    var _jui;
    if(isBody){
        JUI.CHECKBOX_GROUP.def_c_group=new JUI.CHECKBOX_GROUP({ele:J.ct('div.'+JUI.CHECKBOX_GROUP._name)});
        _jui=JUI.CHECKBOX_GROUP.def_c_group;
        _jui.ele.$jui=_jui;
    }else{
        _jui=new JUI.CHECKBOX_GROUP({ele:item});
        item.$jui=_jui;
    }
    _jui.onchange=function(){
        _jui.ele.attr('value',_jui._value.toString());
        _jui.checkList.forEach(function(ele){
            if(_jui.value.has(ele.value)){
                if(ele._checked==false)ele.$checked=true;
            }else{
                if(ele._checked==true)ele.$checked=false;
            }
        });
        if(_jui._onchange){
            var __t=_jui.jet||_jui;
            _jui._onchange.call(__t,{
                ele:item,
                value:_jui._value,
                jui:_jui
            })
        }
    }
    item.findClass(JUI.CHECKBOX._name).each(function(check){
        if(!check.$jui){
            var value=getValueOrText(check);
            var r_jui=new JUI.CHECKBOX({ele:check,text:check.txt(),value:value,group:_jui});
            if(r_jui.checked){
                _jui.value.push(r_jui.value);
            }
            _jui.checkList.push(r_jui);
        }
    });
    // if(item.hasAttr('checked')&&item.attr('checked')!='false'){
    //     _jui.checked=true;
    // }
}
/*CHECKBOX*************************************************************/
JUI.CHECKBOX=function(opt){
    this.ele=opt.ele||null;
    this._checked=opt.checked||false;
    this.onchange=opt.onchange||function(){};
    this.text=opt.text||'';
    this.group=opt.group||null;
    this.value=opt.value||opt.text;
    var _this=this;
    Object.defineProperty(_this,'checked',{
        configurable:true,
        get:function(){
            return _this._checked;
        },set:function(v){
            if(typeof v!='boolean')_throw('checkbox.checked只支持布尔类型');
            if(_this._checked!=v){
                _this._checked==v;
                if(v){
                    if(!_this.group.value.has(_this.value)){
                        _this.group.value.$push(_this.value)
                    }
                }else{
                    if(_this.group.value.has(_this.value)){
                        _this.group.value.$remove(_this.group.value.indexOf(_this.value))
                    }
                }
            }
        }
    });
    Object.defineProperty(_this,'$checked',{
        configurable:true,
        get:function(){
            return _this._checked;
        },set:function(v){
            _this._checked=v;
            _this.onchange.call(_this);
        }
    });
    this.init();
};
JUI.CHECKBOX.prototype.init=function(){
    //var _jui=new JUI.CHECKBOX({ele:item,text:item.txt(),value:getValueOrText(item)});
    var _jui=this;
    var item=this.ele;
    item.html('<div class="j-checkbox-cw"><i class="j-icon icon-check j-checkbox-c"></i></div>'+
        '<span class="j-checkbox-t">'+_jui.text+'</span>');
    item.clk(function(){
        var arr=_jui.group._value;
        if(arr.has(_jui.value))arr.remove(_jui.value);
        else arr.push(_jui.value);
        _jui.group.value=arr;
    });
    _jui.onchange=function(){
        if(_jui.checked){
            _jui.ele.addClass('j-checked');
        }else{
            _jui.ele.removeClass('j-checked');
        }
        _jui.ele.attr('checked',_jui.checked);
        if(_jui._onchange){
            var __t=_jui.jet||_jui;
            _jui._onchange.call(__t,{
                ele:item,
                value:_jui._value,
                jui:_jui
            })
        }
    }
    if(item.hasAttr('checked')&&item.attr('checked')!='false'&&this.group.value==''){
        _jui.checked=true;
        this.group.value==_jui.value;
    }else{
        item.attr('checked','false');
    }
    item.$jui=_jui;
};
JUI.CHECKBOX._name='j-checkbox';