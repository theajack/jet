var _jui_bind='jui-bind';
var _jui_change='jui-change';
//SELECT 动态绑定是列表不会改表 **
//checkbox group 有bug
//date 没设置初始值会有bug
//date color 通过value设置初始值没反应

J.ready(function(){
    JUI.init();
});
var _jui_mounted=[];
var JUI={
    init:function(item){
        JUI.SELECT.init(item);
        //JUI.RADIO.init(item);
        JUI.RADIO_GROUP.init(item);
        JUI.CHECKBOX_GROUP.init(item);
        JUI.SWICTH.init(item);
        JUI.DATE.init(item);
        JUI.COLOR.init(item);
        JUI.SLIDER.init(item);
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
                        _useBindSingle({
                            item:JUI.RADIO_GROUP.def_r_group.ele,
                            jet:jet,
                            isDef:true
                        });
                    }else if(item.hasClass(JUI.CHECKBOX._name)&&!JUI.CHECKBOX_GROUP.def_c_group.hasBind){
                        JUI.CHECKBOX_GROUP.def_c_group.hasBind=true;
                        JUI.CHECKBOX_GROUP.def_c_group.ele.attr(_jui_bind,item.attr(_jui_bind));
                        _useBindSingle({
                            item:JUI.CHECKBOX_GROUP.def_c_group.ele,
                            jet:jet,
                            isDef:true,
                            type:JUI.CHECKBOX._name
                        });
                    }else{
                        _useBindSingle({
                            item:item,
                            jet:jet
                        });
                    }
                    item.removeAttr(_jui_bind);
                });
                J.attr('disabled').on('click',null);
                J.select('.j-color[disabled] .j-color-icon').on('click',null);
                J.select('.j-date[disabled] .j-date-v').on('click',null).attr('disabled','true');
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
function _useBindSingle(opt){
    var item=opt.item;
    var jet=opt.jet;
    var jui=item.$jui;
    var attr=item.attr(_jui_bind);
    var _jet=(opt.isDef)?jet:_findJetPar(item,jet);
    var d;
    if(_jet==jet){
        d=_jet._tools._data;
        //d=_jet;
    }else{
        d=_jet._data[_jet.name];
        //d=_jet.data[_jet.name];
    }
    if(item.hasAttr(_jui_change)){
        var change=item.attr(_jui_change);
        if(change in jet&&typeof jet[change]=='function'){
            jui.jet=jet;
            jui._onchange=jet[change];
        }else if(window[change]&&typeof window[change]=='function'){
            jui._onchange=window[change];
        }
    }
    var jattr=getValueTxt(item);
    if(d[attr]!=undefined){
        jui[jattr]=d[attr];
    }
    _jet._tools._calls[attr]._func.push(function(k,v){
        jui['_'+jattr]=v;
        jui.onchange.call(jui);
    });
    Object.defineProperty(jui,jattr,{
        get:function(){return d[attr]},
        set:function(v){
            d[attr]=v;
            _jet._tools._calls[attr]._func.forEach(function(f){
                f(attr,v);
            });
        },
    });
    //jui[jattr]._jet=(_jet==jet)?_jet:d[attr]._jet
    //Object.defineProperty(_jet.get(),attr,opt);
}
function getValueTxt(item){
    if(item.hasClass(JUI.RADIO._name)){
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