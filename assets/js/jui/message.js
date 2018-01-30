JUI.MESSAGE=function(opt){
    this.txt=opt.text||'提示文字为空';
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

// JUI.msg({
//     text:'text',
//     time:2000,
//     type:'warn',
//     autoClose:true,
//     call:function(){console.log('close')},
// })