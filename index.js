



new Jet({
  beforeinitawait:function(next){
    JUI.CODE.tab='    ';
    Jet.$import('@content','@api','@scroll',function(){
      next();
    })
  },
  

// beforeinit:function(){
//     console.log('beforeinit');
// },
beforemount:function(){
    console.log('beforemount');
},
onmounted:function(){
    console.log('onmounted');
},
beforeunmount:function(){
    console.log('beforeunmount');
},
onunmounted:function(){
    console.log('onunmounted');
},
  // beforeinit:function(){
  //   Jet.$import('contents','queryApi','scroll')
  // },
  onroute:function(){
    console.log('onroute');
    this.$dom.out.html='<div class="loading"><i class="j-icon icon-spin icon-spinner-snake"></i><div class="loading-text"> 加载中...</div></div>';
  },
  onrouted:function(isFresh){
    console.log('onrouted');
    if(!isFresh){
      Jet.$module.Scroll.routed();
    }
  },
  data:{
    bodyFix:false,
    showMenu:false,
    showMenuInPc:function(){
      return $J.width()>600
    }
  },
  func:{
    // stopPro:function(event){
    //   var e=arguments.callee.caller.arguments[0]||event;
    //   if (e && e.stopPropagation) {
    //       e.stopPropagation();
    //   } else if (window.event) {
    //       window.event.cancelBubble = true;
    //   }
    // },
    testOnLine:function(item){
      Jet.$root._top=$J.body().scrollTop;
      Jet.$root._code=item.next().$jui.txt();
      this.$route('/code');
    },
    jumpTo:function(url,des,call){
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
    },onmenuload:function(){
      Jet.router.activeRouter()
    },onfooterload:function(){
      Jet.$module.Scroll.routed();
    }
  }
})
      