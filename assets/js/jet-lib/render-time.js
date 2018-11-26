(function(){
    var C=Jet.__base__;
    Jet.__base__._useList.push('render-time');
    Jet.RenderTime={
        rootDate:null,
        date:null,
        time:0,
        timer:null,
        list:[],
        routerInit:true,
        start:function(){
          var d=new Date();
          if(C._initDate!==null){
            C._info('Jet初始化时间：'+(d-C._initDate)+'ms.');
            C._initDate=null
          }
          if(!Jet.root){
            this.rootDate=d;
          }else{
            this.date=d;
          }
          clearTimeout(this.timer)
          var _this=this;
          this.timer=setTimeout(function(){
            _this.log();
          },500)
        },
        end:function(jet,ele){
          var d=new Date();
          if(ele==C.__router_comp){
            if(this.routerInit){
              this.routerInit=false
            }else{
              this.list=[];
              this.time=0;
            }
          }
          if(jet===Jet.root){
            var time=d-this.rootDate;
            this.list.push(jet._tools.name+':'+time+'ms');
            this.time+=time;
            C._info('根组件渲染时间：'+(this.time)+'ms.');
            this.rootDate=null;
          }else{
            var time=d-this.date;
            this.list.push(jet._tools.name+':'+time+'ms');
            this.time+=time;
            this.date=null;
          }
        },
        log:function(){
            C._info('渲染时间和：'+this.time+'ms. '+JSON.stringify(this.list));
        }
      }
})();
