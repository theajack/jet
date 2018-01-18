


JUI.COLOR=function(opt){
    this.ele=opt.ele||null;
    this._value=opt.value||'';
    this.onchange=opt.onchange||function(){};
    this.value=opt.value||'';
    this.showAlp=(opt.ele.hasAttr('alpha')&&opt.ele.attr('alpha')!='false');
    this._alpha=1;
    this._showColor={
        r:255,g:0,b:0
    };
    this._rangeColor={
        r:255,g:0,b:0,
        dr:0,dg:255,db:255
    }
    this._rate={
        x:1,y:0
    }
    var _this=this;
    Object.defineProperty(_this,'value',{
        configurable:true,
        get:function(){
            return _this._value;
        },set:function(v){
            _this._value=v;
            _this.onchange();
        }
    });
    this.init();
    if(this._value==''){
        if(this.showAlp){
            this.value=_jsonToRGB(this._showColor,this._alpha);
        }else{
            this.value=_jsonToSixteen(this._showColor);
        }
    }
};

JUI.COLOR.prototype.init=function(){
    var _jui=this;
    var item=this.ele;
    var _cw=J.ct('div.j-color-w');
        var _pick=J.ct('div.j-color-pick');
        var _pc1=J.ct('div.j-color-cover1');
        var _pc2=J.ct('div.j-color-cover2');
        var _ps=J.ct('div.j-color-pick-s');
        var _pca=J.ct('div.j-color-cover-a');
        _pick.append([_pc1,_pc2,_ps,_pca]);
        var _range=J.ct('div.j-color-range');
        var _rs=J.ct('div.j-color-range-s');
        var _ra=J.ct('div.j-color-range-a');
        _range.append([_rs,_ra]);
    _cw.append([_pick,_range]);
    var _colorc=J.ct('div.j-color-bg');
    if(this.showAlp){
        var _alp=J.ct('div.j-color-alp');
            var _ac=J.ct('div.j-color-alp-color');
            var _as=J.ct('div.j-color-alp-s');
            var _aa=J.ct('div.j-color-alp-a');
            _alp.append([_ac,_as,_aa]);
        _cw.append(_alp);
        item.addClass('j-color-bg-alp');
    }
        var _vw=J.ct('div.j-color-vw');
            var _v=J.ct('input.j-color-v.j-input.s');
            var _bc=J.ct('div.j-color-btn.j-btn.s.info').txt('清空');
            var _bok=J.ct('div.j-color-btn.j-btn.s').txt('确定');
        _vw.append([_v,_bc,_bok]);
    _cw.append(_vw);
    var _icon=J.ct('i.j-icon.j-color-icon.icon-chevron-down');
    item.append([_cw,_colorc,_icon]);
    var setColor=function(color){
        if(color==undefined){
            if(_jui.showAlp){
                color='rgba('+_jui._showColor.r+','+_jui._showColor.g+','+_jui._showColor.b+','+_jui._alpha+')';
            }else{
                color=_jsonToSixteen(_jui._showColor);
            }
        }
        if(_jui._isFromInput){
            _jui._isFromInput=false;
        }else{
            _v.val(color);
        }
        _colorc.css('background-color',color);
        var r=_jui._rangeColor;
        _pick.css('background-color','rgb('+r.r+','+r.g+','+r.b+')');
        if(_jui.showAlp){
            _ac.css('background','linear-gradient(to right, rgba('+r.r+', '+r.g+', '+r.b+', 0) 0%, rgb('+r.r+', '+r.g+', '+r.b+') 100%)');
        }
    }
    var close=function(){
        if(_jui.ele.hasClass('j-active')){
            _jui.ele.removeClass('j-active');
            setTimeout(function(){_jui.ele.child(0).css('display','none');},300);
        }
    };
    _bc.clk(function(){//clear
        if(_jui.showAlp){
            _jui.value='rgba(255,255,255,0)';
        }else{
            _jui.value='#ffffff';
        }
        close();
    });
    _bok.clk(function(){//ok
        _jui.value=_v.val();
        close();
    });
    _icon.clk(function(){
        if(!item.hasClass('j-active')){
            _cw.css('display','block');
            setTimeout(function(){item.addClass('j-active')},30);
            _jui.onchange();
        }else{
            _jui.value=_v.val();
            close();
        }
    });
    var color_drag=new JUI.DRAG({
        ele:_ps,
        par:_pca,
        onchange:function(d){
            d.x=1-d.x;
            _jui._rate.x=d.x;_jui._rate.y=d.y;//记录上一次的位置
            _jui._showColor.r=parseInt(_jui._rangeColor.r+d.x*_jui._rangeColor.dr);
            _jui._showColor.g=parseInt(_jui._rangeColor.g+d.x*_jui._rangeColor.dg);
            _jui._showColor.b=parseInt(_jui._rangeColor.b+d.x*_jui._rangeColor.db);
            _jui._showColor.r=parseInt(_jui._showColor.r-d.y*(_jui._showColor.r));
            _jui._showColor.g=parseInt(_jui._showColor.g-d.y*(_jui._showColor.g));
            _jui._showColor.b=parseInt(_jui._showColor.b-d.y*(_jui._showColor.b));
            setColor();
        }
    });
    var _split=1/6;
    var range_drag=new JUI.DRAG({
        ele:_rs,
        par:_ra,
        mode:'y',
        onchange:function(d){
            var rate=(d.y%_split)/_split;
            var pos=Math.floor(d.y/_split);
            var c1=255*rate;
            var c2=255-c1;
            var r=_jui._rangeColor;
            switch(pos){
                case 0:r.r=255;r.g=c1;r.b=0;break;
                case 1:r.r=c2;r.g=255;r.b=0;break;
                case 2:r.r=0;r.g=255;r.b=c1;break;
                case 3:r.r=0;r.g=c2;r.b=255;break;
                case 4:r.r=c1;r.g=0;r.b=255;break;
                case 5:r.r=255;r.g=0;r.b=c2;break;
                case 6:r.r=255;r.g=0;r.b=0;break;
            }
            r.dr=255-r.r;r.dg=255-r.g;r.db=255-r.b;
            r.r=Math.round(r.r);
            r.g=Math.round(r.g);
            r.b=Math.round(r.b);
            _pick.css('background-color','rgb('+r.r+','+r.g+','+r.b+')');
            var sc=_jui._showColor;
            sc.r=parseInt(r.r+_jui._rate.x*r.dr);
            sc.g=parseInt(r.g+_jui._rate.x*r.dg);
            sc.b=parseInt(r.b+_jui._rate.x*r.db);
            sc.r=parseInt(sc.r-_jui._rate.y*(sc.r));
            sc.g=parseInt(sc.g-_jui._rate.y*(sc.g));
            sc.b=parseInt(sc.b-_jui._rate.y*(sc.b));
            setColor();
        }
    });
    if(this.showAlp){
        var alpha_drag=new JUI.DRAG({
            ele:_as,
            par:_aa,
            mode:'x',
            onchange:function(d){
                _jui._alpha=parseFloat(d.x.toFixed(2));
                setColor();
            }
        });
    }
    _v.oninput=function(){
        _jui._isFromInput=true;
        if(_checkColorValid(this.val(),_jui.showAlp)){
            this.css('color','#222');
            _jui.value=this.val();
        }else{
            this.css('color','#d44');
        }
    };
    _jui.onchange=function(){
        if(_checkColorValid(_jui._value,_jui.showAlp)){
            var color=_jui._value;
            initParams.call(_jui);
            setColor();
            color_drag.setPositionByRate(1-_jui._rate.x,_jui._rate.y);
            range_drag.setPositionByRate(0,countRangeRate(_jui._rangeColor));
            if(_jui.showAlp)alpha_drag.setPositionByRate(_jui._alpha,0);
        }else{
        }
    }
    _cw.css('display','none');
    item.$jui=_jui;
};JUI.COLOR.prototype.close=function(){
    
};
JUI.COLOR._name='j-color';
JUI.COLOR.init=function(item){
    getEleList(item,JUI.COLOR._name).each(function(item){
        new JUI.COLOR({ele:item});
    });
};
function _checkColorValid(v,sa){
    var t=_whatTypeColor(v);
    if(t!='not'){
        if(((t=='sixteen'||t=='rgb')&&!sa)||(t=='rgba'&&sa)){
            return true;
        }
    }
    return false;
}
function initParams(){
    if(this._value.has('#')){
        this._showColor=_sixteenToJson(this._value);
    }else{
        this._showColor=_RGBToJson(this._value);
        if(this.showAlp)this._alpha=this._showColor.a;
    }
    var d=colorToRangeColor(this._showColor);
    this._rate=d.rate;
    this._rangeColor=d.rangeColor;
}
function colorToRangeColor(sc){
    if(sc.r==sc.g&&sc.b==sc.g&&sc.r==sc.b){
        return {
            rangeColor:{
                r:255,g:0,b:0,
                dr:0,dg:255,db:255
            },
            rate:{
                x:1,
                y:(255-sc.r)/255
            }
        }
    }
    var d={};
    var max=Math.max(sc.r,sc.g,sc.b);
    var rate=255/max;
    d.y=1-1/rate;
    var temp={
        r:sc.r*rate,
        g:sc.g*rate,
        b:sc.b*rate,
        dr:255-sc.r*rate,
        dg:255-sc.g*rate,
        db:255-sc.b*rate,
    };
    var min=Math.min(temp.r,temp.g,temp.b);
    rate=min/(255-min);
    d.x=min/255;
    for(var k in temp){
        if(temp[k]!=min){
            temp[k]=Math.round(temp[k]-rate*(255-temp[k]));
        }else{
            temp[k]=0;
        }
    }
    return {
        rangeColor:temp,
        rate:d
    };
};
// f00->ff0->0f0->0ff->00f->f0f->f00
function countRangeRate(c){
    var _split=1/6;
    var rate;
    var index;
    if(c.b==0){//0,1
        if(c.r==255){//0
            index=0;
            rate=c.g/255;
        }else{
            index=1;
            rate=1-c.r/255;
        }
    }else{//2345
        if(c.b!=255){//2
            index=2;
            rate=c.b/255;
        }else if(c.r==0){
            index=3;
            rate=1-c.g/255;
        }else if(c.r==255){
            index=5;
            rate=1-c.b/255;
        }else{
            index=4;
            rate=c.r/255;
        }
    }
    return _split*(rate+index);
}
var _sixteenReg=/^#([0-9a-f]{3}|[0-9a-f]{6})$/;
var _sArr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
function _sixteenToJson(v){
    v=v.toLowerCase();
    if(_sixteenReg.test(v)){
        if(v.length==4){
            v=v[1]+v[1]+v[2]+v[2]+v[3]+v[3];
        }else{
            v=v.substring(1);
        }
        var c={};
        var t=['r','g','b'];
        for(var i=0;i<3;i++){
            c[t[i]]=_sixteenToNum(v.substring(i*2,(i+1)*2));
        }
        return c;
    }else{
        _throw('色值的16进制格式有误:'+v);
    }
}
function _whatTypeColor(v){
    v=v.toLowerCase();
    if(_sixteenReg.test(v)){
        return 'sixteen';
    }else{
        if(v.has('rgb')){
            var bool=true;
            var str=v.substring(v.indexOf('(')+1,v.indexOf(')')).split(',');
            if(str.length!=3&&str.length!=4){
                bool=false;
            }else{
                str.each(function(item){
                    var num=parseInt(item);
                    if(num.toString()=='NaN'||num<0||num>255){
                        bool=false;
                    }
                });
            }
            if(bool){
                if(v.has('rgba')){
                    return 'rgba';
                }else{
                    return 'rgb';
                }
            }else{
                return 'not';
            }
        }
    }
}
function _sixteenToNum(v){
    return _sArr.indexOf(v[0])*16+_sArr.indexOf(v[1]);
}
function _numToSixteen(v){
        //console.error('色co值的必须在0到255之间:'+v);
    if(v<0)v=0
    else if(v>255)v=255;
    return _sArr[Math.floor(v/16)]+_sArr[v%16];
}
function _jsonToSixteen(v){
    var c='#';
    for(var i in v){
        if(i!='a'){
            c+=_numToSixteen(parseInt(v[i]));
        }
    }
    return c;
}
function _RGBToJson(v){
    var str=v.substring(v.indexOf('(')+1,v.indexOf(')'));
    var arr=str.split(',');
    var c={};
    var t=['r','g','b'];
    for(var i=0;i<3;i++){
        var num=parseInt(arr[i])
        if(num<0||num>255){
            _throw('色值的rgb格式有误:'+v);
        }
        c[t[i]]=num;
    }
    if(arr.length==4){
        c.a=parseFloat(arr[3]);
        if(c.a<0||c.a>1){
            _throw('色值的rgb格式有误:'+v);
        }
    }
    return c;
}
function _jsonToRGB(v,a){
    if('a' in v){
        return 'rgba('+v.r+','+v.g+','+v.b+','+v.a+')';
    }else if(a!=undefined){
        return 'rgba('+v.r+','+v.g+','+v.b+','+a+')';
    }
    return 'rgb('+v.r+','+v.g+','+v.b+')';
}
// f00->ff0->0f0->0ff->00f->f0f->f00

//x:rgb -> r g-- b--