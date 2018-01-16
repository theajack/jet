JUI.DATE=function(opt){
    this.ele=opt.ele||null;
    this._value=opt.value||'';
    this.onchange=opt.onchange||function(){};
    this.value=opt.value||'';
    var d=new Date();
    this._date={
        year:d.getFullYear(),
        month:d.getMonth()+1,
        day:d.getDate()
    };
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
};
JUI.DATE.prototype.init=function(){
    //var _jui=new JUI.DATE({ele:item,text:item.txt(),value:getValueOrText(item)});
    var _jui=this;
    var item=this.ele;
    var _d=J.ct('div.j-date-w');
        var _dt=J.ct('div.j-date-t.j-clearfix');
            var _dty=J.ct('div.j-date-ty');
                var _dtyil=J.ct('i.j-icon.icon-angle-left.j-date-icon');
                var _d_year=J.ct('input.j-date-input[attr=text][value='+this._date.year+']');
                var _dtyir=J.ct('i.j-icon.icon-angle-right.j-date-icon');
            _dty.append([_dtyil,_d_year,_dtyir]);
            var _dtm=J.ct('div.j-date-ty');
                var _dtmil=J.ct('i.j-icon.icon-angle-left.j-date-icon');
                var _d_month=J.ct('input.j-date-input[attr=text][value='+fixNum(this._date.month)+']');
                var _dtmir=J.ct('i.j-icon.icon-angle-right.j-date-icon');
            _dtm.append([_dtmil,_d_month,_dtmir]);
            _dtyil.clk(function(){
                var year=parseInt(_d_year.val())-1,month=parseInt(_d_month.val());
                _dtyil.next().val(year);
                resetDayList(_jui,_sw,year,month,
                    (year==_jui._date.year&&month==_jui._date.month)
                    ,_d_year,_d_month);
            });
            _dtyir.clk(function(){
                var year=parseInt(_d_year.val())+1,month=parseInt(_d_month.val());
                _dtyir.prev().val(year);
                resetDayList(_jui,_sw,year,month,
                    (year==_jui._date.year&&month==_jui._date.month)
                    ,_d_year,_d_month);
            });
            _dtmil.clk(function(){
                var year=parseInt(_d_year.val()),month=parseInt(_d_month.val());
                month=(month<=1)?12:month-1;
                _dtmil.next().val(fixNum(month));
                resetDayList(_jui,_sw,year,month,
                    (year==_jui._date.year&&month==_jui._date.month)
                    ,_d_year,_d_month);
            });
            _dtmir.clk(function(){
                var year=parseInt(_d_year.val()),month=parseInt(_d_month.val());
                month=(month>11)?1:month+1;
                _dtmir.prev().val(fixNum(month));
                resetDayList(_jui,_sw,year,month,
                    (year==_jui._date.year&&month==_jui._date.month)
                    ,_d_year,_d_month);
            });
            _d_year.on('input',function(){
                if(/^([12]\d{3})$/.test(this.val())){
                    var year=parseInt(this.val()),month=parseInt(_d_month.val());
                    resetDayList(_jui,_sw,year,month,
                        (year==_jui._date.year&&month==_jui._date.month)
                        ,_d_year,_d_month);
                }
            });
            _d_month.on('input',function(){
                var month=parseInt(this.val());
                if(month>0&&month<13){
                    var year=parseInt(_d_year.val());
                    resetDayList(_jui,_sw,year,month,
                        (year==_jui._date.year&&month==_jui._date.month)
                        ,_d_year,_d_month);
                    this.val(fixNum(month));
                }
            });
        _dt.append([_dty,_dtm]);

        var _dw=J.ct('div.j-date-dw.j-clearfix');
        ['日','一','二','三','四','五','六'].forEach(function(name){
            _dw.append(J.ct('div.j-date-di').txt(name));
        });
        var _sw=J.ct('div.j-date-sw.j-clearfix');
        //resetDayList(_jui,_sw,this._date.year,this._date.month,true,_d_year,_d_month);

    _d.append([_dt,_dw,_sw]);
    var _dv=J.ct('input.j-date-v[type=text][readonly=true]')
    item.append([_d,_dv]);
    var _dreg=/^(([12]\d{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|3(0|1))))$/;
    _jui.onchange=function(){
        if(!_dreg.test(_jui._value)){
            _throw('DATE 格式错误：请修改为xxxx-xx-xx')
        }
        _dv.val(_jui._value);
    }
    item.$jui=_jui;
    _dv.clk(function(e){
        if(!item.hasClass('j-active')){
            _d.css('display','block');
            setTimeout(function(){item.addClass('j-active')},30);
            if(!_dreg.test(_jui._value)){
                resetDayList(_jui,_sw,_jui._date.year,_jui._date.month,true,_d_year,_d_month);
            }else{
                var _val_d=strToDate(_jui._value,_jui._date);
                resetDayList(_jui,_sw,_val_d.year,_val_d.month,
                    (_val_d.year==_jui._date.year&&_val_d.month==_jui._date.month)
                    ,_d_year,_d_month);
            }
        }else{
            _jui.close();
        }
    });
};JUI.DATE.prototype.close=function(){
    if(this.ele.hasClass('j-active')){
        var _this=this;
        this.ele.removeClass('j-active');
        setTimeout(function(){_this.ele.child(0).css('display','none');},300);
    }
};
JUI.DATE._name='j-date';
JUI.DATE.init=function(item){
    getEleList(item,this._name).each(function(item){
        new JUI.DATE({ele:item});
    });
};
function strToDate(v,d){
    var _dreg=/^(([12]\d{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|3(0|1))))$/;
    if(_dreg.test(v)){
        var arr=v.split('-');
        return {
            year:parseInt(arr[0]),
            month:parseInt(arr[1]),
            day:parseInt(arr[2])
        }
    }
    return {};
}
function fixNum(d){return (d<10)?'0'+d:d};
function resetDayList(_jui,ele,year,month,isCur,_d_year,_d_month){
    var isCurM=false;
    ele.empty();
    var d=strToDate(_jui._value,_jui._date);
    getAllDaysList(year,month).forEach(function(day){
        if(day==1&&!isCurM){
            isCurM=true;
        }else if(day==1&&isCurM){
            isCurM=false;
        }
        if(isCurM){
            ele.append(J.ct('div.j-date-si'+
                ((isCur&&day==_jui._date.day)?'.j-date-current':'')+
                ((d.year==year&&d.month==month&&d.day==day)?'.j-active':'')).txt(day).clk(function(){
                this.parent().findClass('j-active').removeClass('j-active');
                //this.addClass('j-active');
                _jui.value=_d_year.val()+'-'+_d_month.val()+'-'+fixNum(day);
                _jui.close();
            }));
        }else{
            ele.append(J.ct('div.j-date-si.j-disabled').txt(day));
        }
    });
}
function getAllDaysList(year,month){
    var list=[];
    var first=getFirstDay(year,month);//第一天是星期几，上一个月剩余几天
    var days=getDays(year,month);
    var lastDays=(month==1)?getDays(year-1,12):getDays(year,month-1);
    for(var i=lastDays-first+1;i<=lastDays;i++){
        list.push(i);
    }
    for(var i=1;i<=days;i++){
        list.push(i);
    }
    var lastDay=getLastDay(year,month); 
    for(var i=1;i<=6-lastDay;i++){
        list.push(i);
    }
    return list;
}
function getDays(year,month){
    return new Date(year, month, 0).getDate(); 
}
function getLastDay(year,month){
    return new Date(year, month, 0).getDay(); 
}
function getFirstDay(year,month){
    return new Date(year,month-1,1).getDay(); 
}
function getCurrentDay(){
    return new Date().getDate(); 
}