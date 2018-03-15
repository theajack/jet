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
            var ow=$J.ct('div.j-option-w');
            var vw=$J.ct('div.j-select-vw');
                var v_span=$J.ct('span.j-select-v');
                var icon=$J.ct('i.j-icon.icon-caret-down');
            vw.append([v_span,icon]);
            _jui.onchange=function(){
                this.text=this.options[this.value];
                v_span.txt(this.text);
                item.attr('value',this.value);
                if(_jui._onchange){
                    var __t=_jui.jet||_jui;
                    _jui._onchange.call(__t,{
                        ele:item,
                        value:_jui._value,
                        jui:_jui
                    })
                }
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