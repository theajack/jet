window.$J=Jet.$;
JET({
    beforeinitawait: function (next) {
      JUI.CODE.tab = '    '; 
      Jet.import('@content', '@api', '@scroll', function () {
        next();
      })
    },
    onroute: function () {
      console.log('onroute');
      this.$dom.out.html = '<div class="loading"><i class="j-icon icon-spin icon-spinner-snake"></i><div class="loading-text"> 加载中...</div></div>';
    },
    onrouted: function (isFresh) {
      console.log('onrouted');
      if (!isFresh) {
        Jet.module.Scroll.routed();
      }
    },
    onmounted:function(){
      var _this=this;
      window.onresize=function(){
        _this.height=$J.height();
      }
    },
    data: {
      bodyFix: false,
      showMenu: false,
      showMenuInPc: function () {
        return $J.width() > 600
      },
      height: function () {
        return $J.height()
      }
    },
    func: {
      // stopPro:function(event){
      //   var e=arguments.callee.caller.arguments[0]||event;
      //   if (e && e.stopPropagation) {
      //       e.stopPropagation();
      //   } else if (window.event) {
      //       window.event.cancelBubble = true;
      //   }
      // },
      testOnLine: function (item) {
        Jet.root._top = $J.body().scrollTop;
        Jet.root._code = item.next().$jui.txt();
        this.$route('/code');
      },
      jumpTo: function (url, des, call) {
        var _this = this;
        Jet.router.route(url, function () {
          setTimeout(function () {
            var top = 0;
            if (des != '') {
              top = $J.attr('jump-des="' + des + '"').offsetTop + Jet.module.Scroll.scrollTopMargin();
              Jet.root.__des = des;
            }
            //_this.$dom.root.ele.scrollTo(top);
            _this.$dom.root.ele.scrollTop=top;
            if (call) {
              call();
            }
          }, 0);
        });
      }, onmenuload: function () {
        Jet.router.activeRouter()
      }, onfooterload: function () {
        Jet.module.Scroll.routed();
      }
    }
  })