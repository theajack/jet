//<div class='j-slider' min='0' max='100' value='0'></div>
JUI.SLIDER=function(opt){
    this.ele=opt.ele||null;
    this._value=opt.value||false;
    this.onchange=opt.onchange||function(){};
    this.value=opt.value||'';
    this.min=0;
    this.max=100;
    this.rate=0;
    var _this=this;
    Object.defineProperty(_this,'value',{
        configurable:true,
        get:function(){
            return _this._value;
        },set:function(v){
            _this._value=v;
            if(_this._value<_this.min)_this._value=_this.min;
            if(_this._value>_this.max)_this._value=_this.max;
            _this.onchange();
        }
    });
    this.init();
};
JUI.SLIDER.prototype.init=function(){
    var _jui=this;
    var item=this.ele;
    if(item.hasAttr('min'))_jui.min=parseFloat(item.attr('min'));
    if(item.hasAttr('max'))_jui.min=parseFloat(item.attr('max'));
    
    if(item.hasAttr('width')){
        var w=item.attr('width');
        if(!w.has('%')&&!w.has('px')){
            w=w+'px';
        }
        item.css('width',w);
    }
    var pw=item.wid();
    var bar=$J.ct('div.j-slider-bar');
    var c=$J.ct('div.j-slider-c');
    item.append(bar.append(c));
    var func=function(e){
        var o=item.getBoundingClientRect();
        var w=e.clientX-o.left;
        if(w>pw){w=pw;}
        if(w<0){w=0}
        _jui.value=_jui.min+(w/pw)*(_jui.max-_jui.min);
        _jui.onchange();
        return false;
    }
    _jui.onchange=function(){
        _jui.rate=(_jui.value-_jui.min)/(_jui.max-_jui.min);
        bar.css('width',(_jui.rate*100)+'%');
        item.attr('value',_jui._value);
        if(_jui._onchange){
            var __t=_jui.jet||_jui;
            _jui._onchange.call(__t,{
                ele:item,
                value:_jui._value,
                jui:_jui
            })
        }
    }
    if(item.hasAttr('value'))_jui._value=parseFloat(item.attr('value'));
    if(_jui._value<_jui.min)_jui._value=_jui.min;
    if(_jui._value>_jui.max)_jui._value=_jui.max;
    _jui.onchange();
    item.onclick=func;
    c.onmousedown=function(){
        c.onmousemove=func;
        item.onmousemove=func;
        return false;
    }
    c.onmouseup=function(){
        c.onmousemove=null;
        item.onmousemove=null;
    }
    item.onmouseup=function(){
        c.onmousemove=null;
        item.onmousemove=null;
    }
    document.documentElement.on('mousemove',function(e){
        if(c.onmousemove)
            c.onmousemove(e);
    },true);
    document.documentElement.on('mouseup',function(e){
        if(c.onmouseup)
            c.onmouseup(e);
    },true);
    item.attr('value',this._value);
    item.$jui=_jui;
};
JUI.SLIDER._name='j-slider';
JUI.SLIDER.init=function(item){
    getEleList(item,this._name).each(function(item){
        new JUI.SLIDER({ele:item});
    });
};