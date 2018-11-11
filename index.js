

Jet.lang.use(['cn','en']);
Jet.res.define({
  image:{
    wechat:'wechat.png',
    alipay:'alipay',
    wechatpay:'wechatpay'
  },
  html:{
    forLoad:'/attr/for_load',
    pageInstall:'intro/install',
    routerMenu:'comp/router-menu'
  },
  js:{
    con:'contents'
  }
})
new Jet({
  beforeinitawait:function(next){
    JUI.CODE.tab='    ';
    Jet.$import('@con','queryApi','scroll',function(){
      next();
    })
  },
  // beforeinit:function(){
  //   Jet.$import('contents','queryApi','scroll')
  // },
  onroute:function(){
    this.$dom.out.html='<div class="loading"><i class="j-icon icon-spin icon-spinner-snake"></i><div class="loading-text"> 加载中...</div></div>';
  },
  onrouted:function(isFresh){
    if(!isFresh)
    Jet.$module.Scroll.routed();
  },
  data:{
    dshow:false,
    needUseRouted:false,
    last:'',
    lastUrl:'',
    next:'安装使用',
    nextUrl:'/intro/install',
    showMenu:false,
    queryList:[],
    showResult:false,
    queryString:'',
    bodyFix:false,
    number:0
  },
  ondatachange:{
    queryString:function(v){
      var arr=this.$get('Query').search(v);
      this.queryList.$replace(arr);
      this.number=arr.length;
    }
  },
  func:{
    stopPro:function(event){
      var e=arguments.callee.caller.arguments[0]||event;
      if (e && e.stopPropagation) {
          e.stopPropagation();
      } else if (window.event) {
          window.event.cancelBubble = true;
      }
    },
    searchFocus:function(){
      this.showResult=true;
    },
    testOnLine:function(item){
      Jet.$root._top=$J.body().scrollTop;
      Jet.$root._code=item.next().$jui.txt();
      this.$route('/code');
    },
    nextApi:function(){
      var _this=this;
      this.needUseRouted=true;
      Jet.router.route(this.nextUrl);
    },lastApi:function(){
      var _this=this;
      this.needUseRouted=true;
      Jet.router.route(this.lastUrl);
    },setLink:function(opt){
      this.last=opt.last||'';
      this.lastUrl=opt.lastUrl;
      this.next=opt.next||'';
      this.nextUrl=opt.nextUrl;
    },a1:function(){
      alert(1)
    },a2:function(){
      alert(2)
    },toQueryResult:function(opt){
      var _this=this;
      this.showResult=false;
      this.needUseRouted=true;
      this.jumpTo(opt.data.url,opt.data.des,function(){
        _this.needUseRouted=false;
      })
    },jumpTo:function(url,des,call){
      Jet.router.route(url,function(){
        setTimeout(function(){
          var top=0;
          if(des!=''){
            top=$J.attr('jump-des="'+des+'"').offsetTop-55;
            Jet.$root.__des=des;
          }
          document.documentElement.scrollTop=top;
          $J.body().scrollTop=top;
          if(call){
            call();
          }
        },0);
      });
    },shapeQueryName:function(s){
      var si=s.toLowerCase().indexOf(this.queryString.toLowerCase());
      var ei=si+this.queryString.length;
      return s.substring(0,si)+'<span class="__red">'+s.substring(si,ei)+'</span>'+s.substring(ei);
    },onmenuload:function(){
      Jet.router.activeRouter()
      Jet.$module.Scroll.routed();
    }
  }
})
      