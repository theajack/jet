
var _jui_bind='jui-bind';
J.ready(function(){
    JUI.init();
});


var _jui_mounted=[];
var JUI={
    init:function(item){
        JUI.SELECT.init(item);
        //JUI.RADIO.init(item);
        JUI.RADIO_GROUP.init(item);
        _jui_mounted.forEach(function(f){
            f();
        });
    },useBind:function(jet){
        if(J.attr(_jui_bind).length>0){
            _jui_mounted.push(function(){
                J.attr(_jui_bind).each(function(item){
                    if(item.hasClass(JUI.RADIO._name)&&!JUI.RADIO_GROUP.def_r_group.hasBind){
                        JUI.RADIO_GROUP.def_r_group.hasBind=true;
                        JUI.RADIO_GROUP.def_r_group.ele.attr(_jui_bind,item.attr(_jui_bind));
                        item.removeAttr(_jui_bind);
                        _useBindSingle(JUI.RADIO_GROUP.def_r_group.ele,jet,true);
                    }else{
                        _useBindSingle(item,jet);
                    }
                });
            })
        }
    },msg:function(opt,type,time){
        if(typeof opt=='string')
            opt={text:opt,type:type,time:time};
        new JUI.MESSAGE(opt);
    },
    mounted:function(call){
        _jui_mounted.push(call);
    },
}
function _useBindSingle(item,jet,isDef){
    var jui=item.$jui;
    var attr=item.attr(_jui_bind);
    var _jet=(isDef)?jet:_findJetPar(item,jet);
    var d;
    if(_jet==jet){
        d=_jet._tools._data;
    }else{
        d=_jet._data[_jet.name];
    }
    var jattr=getValueTxt(item);
    if(d[attr]!=undefined){
        jui[jattr]=d[attr];
    }
    _jet._tools._calls[attr]._func.push(function(k,v){
        jui['_'+jattr]=v;
        jui.onchange.call(jui);
    });
    jui.setJetData=function(v){
        d[attr]=v;
        _jet._tools._calls[attr]._func.forEach(function(f){
            f();
        });
    }
    Object.defineProperty(jui,jattr,{
        get:function(){return d[attr]},
        set:function(v){
            jui.setJetData(v);
        },
    });
    //Object.defineProperty(_jet.get(),attr,opt);
}
function getValueTxt(item){
    if(item.hasClass(JUI.SELECT._name)||item.hasClass(JUI.RADIO_GROUP._name)){
        return 'value';
    }else if(item.hasClass(JUI.RADIO._name)){
        return 'checked';
    }else{
        return 'value';
    }
}
JUI.msg.success=function(txt,time){_msgDefault(txt,time,JUI.MESSAGE.success);};
JUI.msg.warn=function(txt,time){_msgDefault(txt,time,JUI.MESSAGE.warn);};
JUI.msg.error=function(txt,time){_msgDefault(txt,time,JUI.MESSAGE.error);};
JUI.msg.info=function(txt,time){_msgDefault(txt,time,JUI.MESSAGE.info);};
JUI.msg.close=function(){if(JUI.MESSAGE.msgList.length>0)JUI.MESSAGE.msgList[0].close()};
function _msgDefault(txt,time,type){
    if(typeof txt=='string')
        JUI.msg(txt,type,time);
    else{
        txt.type=type;
        JUI.msg(txt);
    }
}
function _findJetPar(item,jet){
    var p=item.parent();
    while(p.__jet==undefined&&p.tagName!='BODY'){
        p=p.parent();
    }
    if(p.tagName=='BODY'){
        return jet;
    }
    return p.__jet;
}
/*SELECT*************************************************************/
JUI.SELECT=function(opt){
    this.ele=opt.ele||null;
    this.options=opt.options||{};
    this.onchange=opt.onchange||function(){};
    this._value=opt.value||'';
    this.text=opt.text||'';
    var _this=this;
    Object.defineProperty(_this,'value',{
        configurable:true,
        get:function(){
            return _this._value;
        },set:function(v){
            _this._value=v;
            _this.onchange.call(_this);
        }
    });
} 
JUI.SELECT._name='j-select';
JUI.SELECT.option_txt='j-option';
JUI.SELECT.init=function(item){
    getEleList(item,this._name).each(function(item){
        var _jui=new JUI.SELECT({ele:item});
        var list=item.child();
        if(list.length>0){
            var def=list[0];
            var ow=J.ct('div.j-option-w');
            var vw=J.ct('div.j-select-vw');
                var v_span=J.ct('span.j-select-v');
                var icon=J.ct('i.j-icon.icon-caret-down');
            vw.append([v_span,icon]);
            _jui.onchange=function(){
                this.text=this.options[this.value];
                v_span.txt(this.text);
                item.attr('value',this.value);
            };
            list.each(function(_item){
                ow.append(_item);
                _item.css('visibility','visible');
                if(_item.hasAttr('default')){
                    def=_item;
                }
                var val=getValueOrText(_item);
                if(val==''){
                    _throw('SELECT:value值不能设置为空');
                }
                _jui.options[val]=_item.txt().trim();
                if(_item.hasAttr('disabled')){
                    _item.addClass('c-disabled').clk(function(){
                        _stopPro(event);
                    })
                }else{
                    _item.clk(function(){
                        _jui.value=val;
                    })
                }
            });
            _jui.value=getValueOrText(def);
            item.append([ow,vw]).clk(function(){
                this.child(0).toggleClass('s-open');
                this.child(1).child(1).toggleClass('s-open');
            });
            item.$jui=_jui;
        }
    });
};

var getValueOrText=function(o){
    return ((o.hasAttr('value'))?o.attr('value'):o.txt().trim());
}

/*RADIO_GROUP************************************************************/
JUI.RADIO_GROUP=function(opt){
    this.ele=opt.ele||null;
    this._value=opt.value||'';
    this.onchange=opt.onchange||function(){};
    var _this=this;
    this.radioList=[];
    this.setJetData=function(){};
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
    _initOneRadioGroup(J.body(),true);
};
function _initOneRadioGroup(item,isBody){
    if(!isBody&&item.findClass(JUI.RADIO_GROUP._name).length>0){
        _throw('radio group 不支持嵌套使用');
    }
    var _jui;
    if(isBody){
        JUI.RADIO_GROUP.def_r_group=new JUI.RADIO_GROUP({ele:J.ct('div.'+JUI.RADIO_GROUP._name)});
        _jui=JUI.RADIO_GROUP.def_r_group;
        _jui.ele.$jui=_jui;
    }else{
        _jui=new JUI.RADIO_GROUP({ele:item});
        item.$jui=_jui;
    }
    _jui.onchange=function(){
        _jui.ele.attr('value',_jui._value);
        var _c=_jui.radioList.find(function(radio){
            return radio.value==_jui.value;
        });
        if(_c)_c.checked=true;
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
    item.html(`<div class="j-radio-cw"><div class="j-radio-c"></div></div>
        <span class='j-radio-t'>`+_jui.text+`</span>`);
    item.clk(function(){
        //this.toggleClass('j-checked');
        _jui.checked=!_jui.checked;
    });
    _jui.onchange=function(){
        if(_jui.checked){
            var _c=_jui.group.radioList.find(function(item){return item.ele.hasClass('j-checked')});
            if(_c)_c.checked=false;
            _jui.ele.addClass('j-checked');
            _jui.group._value=_jui.value;
            _jui.group.setJetData(_jui.value);
            _jui.group.ele.attr('value',_jui.value);
        }else{
            _jui.ele.removeClass('j-checked');
        }
        _jui.ele.attr('checked',_jui.checked);
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
/*CHECKBOX***********************************************************/

/*SWITCH***********************************************************/

/*CASCADE***********************************************************/

/*DATE**************************************************************/

/*COLOR**************************************************************/

/*CODE**************************************************************/

/*DIALOGUE**************************************************************/

/*COMFIRM**************************************************************/

/*MESSAGE*************************************************************/
JUI.MESSAGE=function(opt){
    this.txt=opt.text;
    this.type=opt.type||JUI.MESSAGE.info;
    this.time=opt.time||2300;
    this.autoClose=opt.autoClose;
    this.call=opt.call||null;
    this.init();
    var _this=this;
    this.timer=null;
    if(this.autoClose!=false){
        this.timer=setTimeout(function(){
            _this.close();
        },this.time);
    }
};JUI.MESSAGE.prototype.init=function(){
    var _this=this;
    this.ele=J.ct('div.j-msg-w.'+this.type);
        var _i=J.ct('i.j-icon.icon-'+JUI.MESSAGE.res.icon[this.type]+'.j-msg-i');
        var _c=J.ct('i.j-icon.icon-times.j-msg-close');
        _c.clk(function(){
            _this.close();
        });
        var _t=J.ct('div.j-msg-txt').txt(this.txt);
    this.ele.append([_i,_c,_t]);
    J.body().append(this.ele);
    JUI.MESSAGE.msgList.push(this);
    setTimeout(function(){_this.ele.addClass('msg-open')},10);
};JUI.MESSAGE.prototype.close=function(){
    this.ele.removeClass('msg-open');
    clearTimeout(this.timer);
    var _this=this;
    setTimeout(function(){
        _this.ele.remove();
        if(_this.call){
            _this.call();
        }
        JUI.MESSAGE.msgList.splice(JUI.MESSAGE.msgList.indexOf(_this),1);
    },300);
};
JUI.MESSAGE.msgList=[];
JUI.MESSAGE.success='success';
JUI.MESSAGE.warn='warn';
JUI.MESSAGE.error='error';
JUI.MESSAGE.info='info';
JUI.MESSAGE.res={
    color:{
        success:"#2ac32f",
        warn:"#dfa02b",
        error:"#dc5454",
        info:"#9e9e9e"
    },icon:{
        success:"check-circle",
        warn:"exclamation-sign",
        error:"remove-sign",
        info:"info-sign"
    }
}
/*TOOL*************************************************************/
function _stopPro(e){
    if(document.all){  //只有ie识别
        e.cancelBubble=true;
    }else{
        e.stopPropagation();
    }
}
function _throw(txt){
    throw new Error(txt);
}
function getEleList(item,name){
    if(item){
        return item.findClass(name);
    }else{
        return J.cls(name)
    }
}