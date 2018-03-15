/*RADIO_GROUP************************************************************/
JUI.RADIO_GROUP=function(opt){
    this.ele=opt.ele||null;
    this._value=opt.value||'';
    this.onchange=opt.onchange||function(){};
    var _this=this;
    this.radioList=[];
    Object.defineProperty(_this,'value',{
        configurable:true,
        get:function(){
            return _this._value;
        },set:function(v){
            _this._value=v;
            _this.onchange.call(_this);
        }
    });
};
JUI.RADIO_GROUP._name='j-radio-group';
JUI.RADIO_GROUP.def_r_group=null;
JUI.RADIO_GROUP.init=function(item){
    getEleList(item,this._name).each(function(item){
        _initOneRadioGroup(item);
    });
    _initOneRadioGroup($J.body(),true);
};
function _initOneRadioGroup(item,isBody){
    if(!isBody&&item.findClass(JUI.RADIO_GROUP._name).length>0){
        _throw('radio group 不支持嵌套使用');
    }
    var _jui;
    if(isBody){
        JUI.RADIO_GROUP.def_r_group=new JUI.RADIO_GROUP({ele:$J.ct('div.'+JUI.RADIO_GROUP._name)});
        _jui=JUI.RADIO_GROUP.def_r_group;
        _jui.ele.$jui=_jui;
    }else{
        _jui=new JUI.RADIO_GROUP({ele:item});
        item.$jui=_jui;
    }
    _jui.onchange=function(){
        _jui.ele.attr('value',_jui._value);
        var _c=_jui.radioList.filter(function(item){
            return item.ele.hasClass('j-checked')
        });
        if(_c.length>0)_c[0].$checked=false;
        _c=_jui.radioList.filter(function(radio){
            return radio.value==_jui.value;
        });
        if(_c.length>0&&_c[0]._checked==false)_c[0].$checked=true;
        if(_jui._onchange){
            var __t=_jui.jet||_jui;
            _jui._onchange.call(__t,{
                ele:item,
                value:_jui._value,
                jui:_jui
            })
        }
    }

    var arr=[];
    item.findClass(JUI.RADIO._name).each(function(radio){
        if(!radio.$jui){
            var value=getValueOrText(radio);
            if(arr.indexOf(value)!=-1)
                _throw('同一组 radio 中不允许有相同的value值');
            arr.push(value);
            var r_jui=new JUI.RADIO({ele:radio,text:radio.txt(),value:value,group:_jui});
            if(r_jui.checked){
                _jui.value=r_jui.value;
            }
            _jui.radioList.push(r_jui);
        }
    });
    // if(item.hasAttr('checked')&&item.attr('checked')!='false'){
    //     _jui.checked=true;
    // }
    if(isBody){
        
    }
}
/*RADIO*************************************************************/
JUI.RADIO=function(opt){
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
            if(typeof v!='boolean'){_throw('radio.checked只支持布尔类型')};
            if(_this._checked!=v){
                _this._checked==v;
                if(v==true){
                    _this.group.value=_this.value;
                }else{
                    _this.group.value='';
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
JUI.RADIO.prototype.init=function(){
    //var _jui=new JUI.RADIO({ele:item,text:item.txt(),value:getValueOrText(item)});
    var _jui=this;
    var item=this.ele;
    item.html('<div class="j-radio-cw"><div class="j-radio-c"></div></div>'+
        '<span class="j-radio-t">'+_jui.text+'</span>');
    if(!item.hasAttr('disabled')||item.attr('disabled')=="false"){
        item.clk(function(){
            _jui.group.value=_jui.value;
        });
    }
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
JUI.RADIO._name='j-radio';