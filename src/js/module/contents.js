Jet.define('Content',function(){
    var contents=[
        "介绍",'Jet图解', "安装使用", "目录结构", "html模板", "Jet语法", "Jet生命周期", "资源管理", "api目录",'更新日志', "关于", 
        "数据绑定", "绑定(属性J)", "$init", "绑定的分类", "绑定的语法", "数组方法", 
        "修饰属性", "jif:条件判断", "jshow:选择展示", "jattr:绑定属性", "jstyle:绑定样式", "jrun:执行回调", "jon:绑定事件", "jload:组件", "jroot:根数据", "jdom:操作DOM", "jhtml:渲染HTML", 'jpath:路径机制',
        "js库","官方库和第三方库","use/useAll方法",
        
        "表单验证", "jvalid", "jform", "Jet.valid 方法", "自定义样式", 
        "国际化语言", "use()", "静态", "动态", "Jet.lang.list", "Jet.lang.type", "Jet.lang.init", 
        "路由", "use()", "jrouter&jout", "路由事件", "route()",'Jet.router中的方法', "属性", 
        "js模块规范", "define:定义", "export:输出", "import:引入", "module:集合", "get:获取", 
        "css配置文件", "css变量与函数", "路由页面公共样式", 
        "工具方法", "$ajax", "$cookie", "$storage", "Jet.$", "prototype扩展", 
        "JUI", "基础样式类", "图标", "栅格", "按钮", "输入框", "单选框与单选框组", "复选框与复选框组", "下拉框", "切换按钮", "时间选择器", 
            "颜色选择器", "代码编辑器", "滑动选择器", "进度条", "提示框", "确认框", "对话框", "可拖拽元素", "分页器", "选项卡", 
        "在线使用"
    ]
    var urls=[
        '/intro','/intro/img','/intro/install','/intro/contents','/intro/html','/intro/grammer','/intro/life','/intro/res','/intro/api','/intro/update','/intro/about',
        '/bind','/bind/j','/bind/init','/bind/type','/bind/grammer','/bind/array',
        '/attr','/attr/if','/attr/show','/attr/attr','/attr/style','/attr/run','/attr/on','/attr/load','/attr/root','/attr/dom','/attr/html','/attr/path',
        '/lib','/lib/part','/lib/use',

        '/valid','/valid/valid','/valid/form','/valid/method','/valid/custom',
        '/lang','/lang/use','/lang/static','/lang/dynamic','/lang/list','/lang/type','/lang/init',
        '/router','/router/use','/router/ele','/router/on','/router/route','/router/func','/router/prop',
        '/module','/module/define','/module/export','/module/import','/module/module','/module/get',
        '/css','/css/var','/css/common',
        '/tool','/tool/ajax','/tool/cookie','/tool/storage','/tool/tool','/tool/prototype',
        '/jui','/jui/base','/jui/icon','/jui/grid','/jui/btn','/jui/input','/jui/radio','/jui/check','/jui/select','/jui/switch','/jui/date',
            '/jui/color','/jui/code','/jui/slider','/jui/progress','/jui/msg','/jui/confirm','/jui/dialog','/jui/drag','/jui/page','/jui/tab',
       '/code'
    ]
    var length=contents.length;
    var getContentsBetween=function(a1,a2){
        var i1=urls.indexOf(a1);
        var i2=urls.indexOf(a2)+1;
        var ca=contents.slice(i1,i2);
        var ua=urls.slice(i1,i2);
        var res={
            children:[]
        }
        var arr=[];
        ca.forEach(function(item,index){
            if(index==0){
                res.name=item;
                res.url=ua[index];
            }else{
                res.children.push({name:item,url:ua[index]})
            }
        })
        return res;
    }
    Jet.export({
        getJumpInfo:function(){
            var currentUrl=Jet.router.url;
            if(Jet.router.url===Jet.router.index){
                currentUrl='/intro';
            }
            var index=urls.indexOf(currentUrl);
            if(index==-1){
                return null;
            }
            var res={};
            if(index>0){
                res.last=contents[index-1];
                res.lastUrl=urls[index-1];
            }
            if(index<length-1){
                res.next=contents[index+1];
                res.nextUrl=urls[index+1];
            }
            return res
        },getContentByUrl:function(url){
            var index=urls.indexOf(url);
            return contents[index];
        },getContents:function(){
            var s=['/intro/about','/bind/array','/attr/path','/lib/use','/valid/custom','/lang/init',
                '/router/prop','/module/get','/css/common','/tool/prototype','/jui/tab','/code']
            var data=[];
            s.forEach(function(item){
                if(item=='/code'){
                    data.push(getContentsBetween(item,item))
                }else{
                    data.push(getContentsBetween(item.substring(0,item.lastIndexOf('/')),item))
                }
            })
            return data;
        }
    })
})