
// Jet.$import('a as a0',function(mods){
//   //debugger
//   console.log(mods)
//   console.log(Jet.$module)
//   console.log(_modules)
// })
// Jet.$import('module2','module1',function(mods){
//   //debugger
//   console.log('index1:',mods)
//   console.log('index1:',Jet.$module)
//   console.log('index1:',_modules)
// })
// Jet.$import('module2 as mm2','module1 as mm1',function(mods){
//   //debugger
//   console.log('index1:',mods)
//   console.log('index1:',Jet.$module)
//   console.log('index1:',_modules)
// })

// Jet.$import('module2 as mm2',function(mods){
//   //debugger
//   mods.mm2.addCount1()
//   console.log('index2:',mods.mm2.allCount())
//   console.log('index2:',mods)
//   console.log('index2:',Jet.$module)
//   console.log('index2:',_modules)
// })
// Jet.$import('module1 as mm1',function(mods){
//   //debugger
//   mods.mm1.addCount();
//   mods.mm1.addCount();
//   console.log('index1:',mods.mm1.getCount())
//   console.log('index1:',mods)
//   console.log('index1:',Jet.$module)
//   console.log('index1:',_modules)
// })
// Jet.$import('module1 as mm2',function(mods){
//   //debugger
//   mods.mm2.addCount();
//   console.log('index1:',mods.mm2.getCount())
//   console.log('index2:',mods)
//   console.log('index2:',Jet.$module)
//   console.log('index2:',_modules)
// })
// Jet.$import('b as a1',function(mods){
//   debugger
//   console.log(mods)
//   console.log(Jet.$module)
//   console.log(_modules)
// })
Jet.lang.use(['cn','en']);
Jet.global=new Jet({
  onload:function(){
    this.needUseRouted=true;
    this.routeFunc();
  },
  onroute:function(){
    this.$dom.out.html='<div class="loading"><i class="j-icon icon-spin icon-spinner-snake"></i><div class="loading-text"> 加载中...</div></div>';
  },
  onrouted:function(){
    this.needUseRouted=true;
    this.routeFunc();
    document.documentElement.scrollTop=0;
    $J.body().scrollTop=0;
    $J.attr('jump-to').each(function(item){
        $J.attr('jump-des="'+item.attr('jump-to')+'"').exist(function(ele){
            item.clk(function(){
                $J.scrollTo(ele.offsetTop-60);
            });
        });
    });
    Jcode.init();
    if(Jet.router.lastTrueHash!=="#/code"){
      $J.cls('j-code').each(function(item){
        if(!item.hasClass('not-test')){
          item.before('<button class="j-btn test-online" onclick="Jet.global.testOnLine(this)"><i class="j-icon icon-edit"></i> 在线使用</button>')
        }
      });
      
      if(typeof Jet.global._top!=='undefined'){
        $J.body().scrollTop=Jet.global._top;
        Jet.global._top=undefined;
      }
    }
  },
  onmounted:function(){
    var _this=this;
    var max;
    this.$import('queryApi');
    window._checkScrol=function(){
      max=$J.id('menuScroll').hei()+40-$J.id('menu').hei();
      if(max<=0){
        menuScroll=0;
        $J.id('menuScroll').css('top','0px')
      }else if(menuScroll<=-max){
        menuScroll=-max;
        $J.id('menuScroll').css('top',menuScroll+'px')
      }
    };
    var isLock=false;
    $J.cls('menu-main-item').on('click',function(e){
      if(!isLock){
        isLock=true;
        this.next().slideToggle(function(){
          _checkScrol();
          isLock=false;
        },200,"ease");
        this.child(1).toggleClass('active');
      }
    },true);
    if($J.isMobile()){
      var _setHeight=function(){
        $J.id('menuScroll').css('height',($J.height()-40)+'px')
      }
      $J.id('menuScroll').css('overflow-y','auto');
      _setHeight();
      window.onresize=_setHeight;
    }else{
      var menuScroll=0;
      $J.id('menu').onmousewheel=function(e){
        //stopPro(e);
        if(!_this.bodyFix)_this.bodyFix=true;
        if(max>0){
          var _top=menuScroll+$J.sign(e.wheelDelta)*80;
          if(e.wheelDelta<0){
            if(_top<-max){_top=-max;}
          }else{
            if(_top>0){_top=0;}
          }
          menuScroll=_top;
          $J.id('menuScroll').css('top',_top+'px')
        }
      };
      $J.id('routerOut').onmousewheel=function(){
        if(_this.bodyFix)_this.bodyFix=false;
      }
      window.onresize=_checkScrol;
    }
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
      var arr=this.$use('Query').search(v);
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
      Jet.global._top=$J.body().scrollTop;
      Jet.global._code=Jcode.txt(item.next());
      this.$route('/code');
    },
    routeFunc:function(){
      if(this.needUseRouted){
        $J.attr('jrouter-active').exist(function(item){
          if(item.hasClass('menu-s-item')){
            var _i=item.parent().prev();
            _i.next().slideDown(function(){
              window._checkScrol();
            },200,"ease");
            _i.child(1).addClass('active');
          }
        });
        this.needUseRouted=false
      }
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
      Jet.router.route(url,null,function(){
        setTimeout(function(){
          var top=0;
          if(des!=''){
            top=$J.attr('jump-des='+des).offsetTop-55;
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
    }
  }
})
      