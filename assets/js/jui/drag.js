JUI.DRAG=function(opt){
    this.ele=opt.ele;
    this.par=opt.par||this.ele.parent();
    this._w=this.ele.wid()/2;
    this._h=this.ele.hei()/2;
    this.x=opt.x||-this._w;
    this.y=opt.y||-this._h;
    this.mode=opt.mode||'xy';
    this.onchange=opt.onchange||function(){};
    this.init();
};JUI.DRAG.prototype.init=function(){
    var _this=this;
    this.setPosition();
    this.par.on('mousedown',function(ev){
        var oEvent=ev||event;
        var pw=_this.par.wid();
        var ph=_this.par.hei();
        var ew=_this.ele.wid();
        var eh=_this.ele.hei();
        _this.x=oEvent.layerX;
        _this.y=oEvent.layerY;
        _this.setPosition();
        disX=oEvent.clientX-_this.ele.offsetLeft; //鼠标的X坐标减去DIV的左边距就等于disX, 这个disXs是用于确定鼠标移动DIV时鼠标点和DIV之间的左面距离，这个距离是不会变的，通过这个新鼠标的X坐标减去disX就是DIV的Left
        disY=oEvent.clientY-_this.ele.offsetTop; //鼠标的Y坐标减去DIV的左边距就等于disY, 这个disY是用于确定鼠标移动DIV时鼠标点和DIV之间的上面距离，这个距离是不会变的，通过这个新鼠标的Y坐标减去disY就是DIV的Top
        _this.par.onmousemove=function(ev){//为了防止鼠标移动太快而离开了DIV产生了bug，所以要给整个页面加onmousemove事件
            var oEvent=ev||event;
            var oLeft=oEvent.clientX-disX; //新鼠标X坐标减去disX,也就是鼠标移动DIV后的Left
            var oTop=oEvent.clientY-disY; //新鼠标Y坐标减去disY,也就是鼠标移动DIV后的Top
            if(oLeft<-ew/2){//当DIV的Left小于0，也就是移出左边
                oLeft=-ew/2; //就把DIV的Left设置为0，就不能移出左边
            }else if(oLeft>pw-ew/2){//屏幕宽度减去DIV的宽度就得出了DIV到达最右边的宽度，如果Left大于这个像素
                oLeft=pw-ew/2; //就把Left设置为这个像素
            }
            if(oTop<-eh/2){//当DIV的To小于0，也就是移出左边
                oTop=-eh/2; //就把DIV的Top设置为0，就不能移出上边
            }else if(oTop>ph-eh/2){//屏幕高度减去DIV的高度就得出了DIV到达最下面边的像素，如果Top大于这个像素
                oTop=ph-eh/2; //就把Top设置为这个像素
            }
            _this.setPosition(oLeft,oTop);
            return false;
        };
        _this.par.onmouseleave=function(){
            //_this.par.onmousemove=null; //把鼠标移动清楚
            //_this.par.onmouseup=null; //把鼠标松开清楚
        }
        _this.par.onmouseup=function(){//鼠标松开时
            _this.par.onmousemove=null; //把鼠标移动清楚
            _this.par.onmouseup=null; //把鼠标松开清楚
        };
        return false;
    });
    J.body().on('mousemove',function(e){
        if(_this.par.onmousemove)
            _this.par.onmousemove(e);
        return false;
    },true);
    J.body().on('mouseup',function(e){
        if(_this.par.onmouseup)
            _this.par.onmouseup(e);
        return false;
    },true);
    
};JUI.DRAG.prototype.setPosition=function(x,y,f){
    if(x){
        this.x=x;
    }
    if(y){
        this.y=y;
    }
    var d={
        x:(this.x+this._w)/this.par.wid(),
        y:(this.y+this._h)/this.par.hei()
    };
    if(this.mode=='x'){
        this.y=y=0;
        delete d.y;
    }else if(this.mode=='y'){
        this.x=x=0;
        delete d.x;
    }
    if(f==undefined)
        this.onchange(d);
    this.ele.css({
        left:this.x+'px',
        top:this.y+'px'
    });
};JUI.DRAG.prototype.setPositionByRate=function(x,y){
    this.setPosition(x*this.par.wid()-this._w,y*this.par.hei()-this._h,false);
}