Jet.define('Scroll', function () {
    var _g = Jet.root;
    var max;
    var isMobile=($J.width()<600);
    var _checkScroll = function () {
        isMobile=
        max = $J.id('menuScroll').hei() + 40 - $J.id('menu').hei();
        if (max <= 0) {
            menuScroll = 0;
            $J.id('menuScroll').css('top', '0px')
        } else if (menuScroll <= -max) {
            menuScroll = -max;
            $J.id('menuScroll').css('top', menuScroll + 'px')
        }
    };
    if ($J.isMobile()) {
        var _setHeight = function () {
            $J.id('menuScroll').exist(function(item){
                item.css('height', ($J.height() - 40) + 'px')
            })
        }
        $J.id('menuScroll').exist(function(item){
            item.css('overflow-y', 'auto');
        })
        _setHeight();
        window.onresize = _setHeight;
    } else {
        var menuScroll = 0;
        $J.id('menu').onmousewheel = function (e) {
            //Jet.root.stopPro(e);
            if (!_g.bodyFix) _g.bodyFix = true;
            if (max > 0) {
                var _top = menuScroll + $J.sign(e.wheelDelta) * 80;
                if (e.wheelDelta < 0) {
                    if (_top < -max) { _top = -max; }
                } else {
                    if (_top > 0) { _top = 0; }
                }
                menuScroll = _top;
                $J.id('menuScroll').css('top', _top + 'px')
            }
        };
        $J.id('routerOut').onmousewheel = function () {
            if (_g.bodyFix) _g.bodyFix = false;
        }
        window.onresize = _checkScroll;
    }
    Jet.export({
        scrollTopMargin:function(){
            return -(($J.width()<600)?50:5);
        },
        routed: function () {
            var root=$J.id('rootApp')
            root.scrollTop = 0;
            $J.attr('jump-to').each(function (item) {
                $J.attr('jump-des="' + item.attr('jump-to') + '"').exist(function (ele) {
                    item.clk(function () {
                        root.scrollTo(ele.offsetTop + Jet.module.Scroll.scrollTopMargin());
                    });
                });
            });
            //Jcode.init();
            if (Jet.router.lastTrueHash !== "#/code") {
                $J.cls('j-code').each(function (item) {
                    if (!item.hasClass('not-test')) {
                        item.before('<button class="j-btn test-online" onclick="Jet.root.testOnLine(this)"><i class="j-icon icon-edit"></i>在线使用</button>')
                    }
                });

                if (typeof _g._top !== 'undefined') {
                    root.scrollTop = _g._top;
                    _g._top = undefined;
                }
            }
            Jet.comp.footer.setLink(Jet.module.Content.getJumpInfo())
            this.routeFunc();
        },
        checkScroll: _checkScroll,
        routeFunc: function () {
            $J.attr('jrouter-active').exist(function (item) {
                if (item.hasClass('menu-s-item')) {
                    var _i = item.parent().prev();
                    _i.next().slideDown(function () {
                        _checkScroll();
                    }, 200, "ease");
                    _i.child(1).addClass('active');
                }
            });
        },
        bindShowMenu: function (ele) {
            var isLock = false;
            $J.cls('menu-main-item').on('click', function (e) {
                if (!isLock) {
                    isLock = true;
                    this.next().slideToggle(function () {
                        _checkScroll();
                        isLock = false;
                    }, 200, "ease");
                    this.child(1).toggleClass('active');
                }
            }, true);
        }
    })
})