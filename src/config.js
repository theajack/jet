/**
 * babel
 * less
 * config.js
 * build.config.json
 */
//

//'https://www.theajack.com/cnchar/cnchar.min.js',
//Jet.use('/src/js/cnchar.js')
// Jet.use.define({
//     lib:{
//         cnchar:'src/js/cnchar.js',
//         a:'src/js/a.js',
//     },
//     depend:{
//         cnchar:['tool','a'],
//     }
// })
// Jet.use('cnchar',function(){
//     debugger;
// })

Jet.use.define({
    lib: {
        stat: 'https://www.theajack.com/assets/js/stat.js',
        'router-config': 'src/router.js'
        // a:'src/js/a.js',
        // b:'src/js/b',//.js后缀可以省略
        // c:'src/js/c',
        // root:'src/root.js'
    }
});

// //声明库之后，就可以通过 库名来使用库
// Jet.use('a',function(){

// })
// Jet.config.babel=false;
//Jet.config.env='pro'
// Jet.use('stat',function(){
//     debugger;
// });
Jet.use.all(
    '-babel',
    '-less',
    //'cnchar',
    //'/src/js/cnchar.js',
    function(times) {
        //Jet.router.setBase('/jet');
        JUI.CODE.theme = 'dark';
        Jet.lang.use(['cn', 'en']);
        Jet.use('router-config', function() {
            Jet.res.define({
                image: {
                    wechat: 'wechat.png',
                    alipay: 'alipay',
                    wechatpay: 'wechatpay',
                    logo: 'logo'
                },
                html: {
                    forLoad: 'attr/for_load',
                    pageInstall: 'intro/install',
                    routerMenu: 'comp/router-menu',
                    header: 'comp/header',
                    footer: 'comp/footer'
                },
                js: {
                    content: 'module/contents',
                    scroll: 'module/scroll',
                    api: 'module/queryApi'
                }
            });
            // Jet.use('root')
        });
    }
);
