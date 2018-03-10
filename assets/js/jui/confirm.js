JUI.CONFIRM=function(opt){
    this.title=opt.title||'确认框'
    this.txt=opt.text||'是否确认该操作？';
    this.type=opt.type||null;
    this.onconfirm=opt.onconfirm||null;
    this.oncancel=opt.oncancel||null;
    this.onclose=opt.onclose||null;
    this.init();
};JUI.CONFIRM.prototype.init=function(){
    var _this=this;
    this.ele=J.ct('div.j-confirm');
        var _close=J.ct('i.j-confirm-close.j-icon.icon-times');
        var _t=J.ct('div.j-confirm-t');
            if(this.type!=null){
                _t.addClass(this.type).append(J.ct('i.j-icon.icon-'+JUI.CONFIRM.res.icon[this.type]));
            }
        _t.append(J.ct('span').txt(this.title));
        var _c=J.ct('div.j-confirm-c').html(this.txt);
        var _b=J.ct('div.j-confirm-bw');
            var _ok=J.ct('button.j-confirm-b.j-btn').txt('确定');
            var _cancel=J.ct('button.j-confirm-b.j-btn.info').txt('取消');
        _b.append([_ok,_cancel]);
    this.ele.append([_close,_t,_c,_b]);
    _close.clk(function(){
        _this.close();
    });
    _ok.clk(function(){
        if(_this.onconfirm){
            _this.onconfirm();
        }
        _this.close();
    });
    _cancel.clk(function(){
        if(_this.oncancel){
            _this.oncancel();
        }
        _this.close();
    });
    J.body().append(this.ele);
    JUI.CONFIRM.confirmList.push(this);
};JUI.CONFIRM.prototype.close=function(){
    this.ele.addClass('j-confirm-hide');
    var _this=this;
    if(_this.onclose){
        _this.onclose();
    }
    setTimeout(function(){
        _this.ele.remove();
        JUI.CONFIRM.confirmList.splice(JUI.CONFIRM.confirmList.indexOf(_this),1);
    },500);
};
JUI.CONFIRM.confirmList=[];
JUI.CONFIRM.success='success';
JUI.CONFIRM.warn='warn';
JUI.CONFIRM.error='error';
JUI.CONFIRM.info='info';
JUI.CONFIRM.res={
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

// JUI.confirm({
//     title:"title",
//     text:'text',
//     type:'warn',
//     onconfirm:function(){console.log('confirm')},
//     oncancel:function(){console.log('cancel')},
//     onclose:function(){console.log('close')},
// })