/*SELECT*************************************************************/
JUI.DIALOG=function(opt){
    this.ele=opt.ele||null;
    this.title=(opt.ele.hasAttr('dialog-title'))?opt.ele.attr('dialog-title'):'';
    this.onchange=opt.onchange||function(){};
    this._value=opt.value||false;
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
JUI.DIALOG._name='j-dialog';
JUI.DIALOG.init=function(item){
    getEleList(item,this._name).each(function(item){
        var _jui=new JUI.DIALOG({ele:item});
        var childs=item.childNodes;
        var _head=$J.ct('div.j-dialog-head');
            var _i=$J.ct('i.j-icon.icon-times');
            _i.clk(function(){
                _jui.value=false;
            });
            var _t=$J.ct('div.j-dialog-title').txt(_jui.title);
        _head.append([_t,_i]);
        var _body=$J.ct('div.j-dialog-body');
            childs.each(function(_item){
                _body.append(_item);
            });
        item.append([_head,_body]);
        item.css({
            'margin-top':'0',
            'top':($J.height()-item.hei())/2+'px'
        })
        _jui.onchange=function(){
            if(_jui._value){
                _jui.ele.addClass('j-dialog-open').removeClass('j-dialog-close');
            }else{
                _jui.ele.addClass('j-dialog-close').removeClass('j-dialog-open');
            }
        };
        item.$jui=_jui;
        new JUI.SCREEN_DRAG({
            ele:item,
            drag:_head
        });
    });
};
