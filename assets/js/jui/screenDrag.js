JUI.SCREEN_DRAG=function(opt){
    this.ele=opt.ele;
    this.drag=opt.drag||opt.ele;
    this._w=this.ele.wid()/2;
    this._h=this.ele.hei()/2;
    this.x=opt.x||-this._w;
    this.y=opt.y||-this._h;
    this.ondrag=opt.ondrag||function(){};
    this.ondrop=opt.ondrop||function(){};
    this.init();
};JUI.SCREEN_DRAG.prototype.init=function(){
    var _this=this;
    this.setPosition();
    _this.drag.on('mousedown',function(ev){
        var oEvent=ev||event;
        _stopPro(oEvent)
        var x=_this.ele.offsetLeft;
        var y=_this.ele.offsetTop;
        var sx=oEvent.clientX;
        var sy=oEvent.clientY;
        _this.drag.onmousemove=function(ev2){
            var e=ev2||event;
            var oLeft=x+(e.clientX-sx);
            var oTop=y+(e.clientY-sy);
            _this.setPosition(oLeft,oTop);
            return false;
        };
        _this.drag.onmouseup=function(){//鼠标松开时
            _this.drag.onmousemove=null; //把鼠标移动清楚
            _this.drag.onmouseup=null; //把鼠标松开清楚
        };
        return false;
    });
    document.documentElement.on('mousemove',function(e){
        if(_this.drag.onmousemove)
            _this.drag.onmousemove(e);
    },true);
    document.documentElement.on('mouseup',function(e){
        if(_this.drag.onmouseup)
            _this.drag.onmouseup(e);
    },true);
    this.ele.css({
        left:(this.ele.offsetLeft)+'px',
        top:(this.ele.offsetTop)+'px',
        margin:'0'
    });
};JUI.SCREEN_DRAG.prototype.setPosition=function(x,y){
    this.x=x;
    this.y=y;
    this.ele.css({
        left:this.x+'px',
        top:this.y+'px'
    });
    this.ondrag();
};