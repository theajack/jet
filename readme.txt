Jet框架
A.介绍
    1.框架目录：
        assets //框架相关的代码和资源，无需用户操作
        src //用户主要编写代码的地方
            css
            html //存放页面模板的地方
            images
            js
        index.html //程序入口
    2.模板语法
        <style src=''/> //对应 src/css 文件夹里的文件，不支持自定义路径
        <style> 嵌套在模板里的css </style> 
        <div></div> //html语言，对数量格式都没有要求
        <script src=''/> //对应 src/css 文件夹里的文件，不支持自定义路径
        <script> 嵌套在模板里的css </script> 
        style script 和 html三者可以混合使用，顺序格式没有要求
    3.Jet 语法格式
    <script>
        new Jet({
            ready:function(){
                //可选，生成之后回调函数
            },
            data:{
                //Jet数据
            },
            func:{
                //Jet方法
            }
        })
    </script> 
B.数据绑定
    1.J 绑定数据,$each,$value,$index,$,$.$par.$index的使用
    2.绑定的分类：JBind,JFor,Jinput,JText
    2.数组的方法：$push,$pushArray,$prep,$prepArray,$insert,$insertArray,$remove
C.属性样式事件
    1.Jif
    2.Jshow
    3.Jattr
    4.Jstyle
    5.Jrun
    6.Jon
    7.Jload
D.表单、验证部分：
    1.Jform
    2.Jvalid
    3.custom
E.国际化语言
    1.Jet.lang.use()
    2.Jlang
    3.Jname
    4.JL
    5.Jet.lang.list
    6.Jet.lang.type
F.路由
    1.Jet.router.use()
    2.Jroute
    3.Jout





待解决问题：
    1.路由的重定向
    2.路由根目录可以共用，可以使用默认的html文件（与路由同名）
    3.css，js需支持文件夹（可能已经支持）
    4.Jet的生命周期 mounted ready...
    5.对于数组，若是没有绑定元素，则无法使用$push等方法
    对于数组，直接对数组赋值，ui不会改变
    7.jui checkbox 由于以上两点bug 很难完成
    8.jui select 对绑定的选项进行$push 或其他操作，ui不变
    9.$.$par.$index 多层循环时会有bug
    10.暂不支持路由的嵌套


生命周期，在index.html
(index):242 beforeinit
(index):245 beforemount
(index):265 onmounted
(index):239 onroute
(index):236 onready
(index):229 j-onready
(index):226 j-onload
(index):233 onload
(index):254 onrouted


在模板中，跳转时
__dynamic.js:22 onroute
__dynamic.js:13 j-onready
__dynamic.js:25 beforeinit
__dynamic.js:28 beforemount
__dynamic.js:19 onready
__dynamic.js:34 onmounted
__dynamic.js:31 onrouted

在模板中，刷新页面时
__dynamic.js:13 j-onready
__dynamic.js:25 beforeinit
__dynamic.js:28 beforemount
__dynamic.js:19 onready
__dynamic.js:34 onmounted
__dynamic.js:31 onrouted

Jet.valid.
    language:"CHINESE"
    useDefaultStyle:true
    showInPlaceHolder:false
    useAlert:false
    init
    validate
    validInput
    ***addRegExp 
    addValidText
    onOnePass
    onOneFail


18-3-10: 
    validInput() 支持jdom 
    修复一个 J.type 关于 以变量是声明的类的识别的 bug var a=function(){};因为该类型构造函数的名字是函数本身
    修复了 new Jet() 没有参数是会报错的 bug