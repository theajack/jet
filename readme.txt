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
    2.绑定的分类：JBind,JFor,Jinput,JText (都使用J属性)
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
    4.Jet.valid.
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
G.工具方法
H.JUI
        1.使用border-box 
        2.基础的类
            clearfix,hide,show,f-left,f-right,t-left,t-center,t-right,
            m-center,bold,relative,absolue,fixed,w-full,c-disabled,c-pointer
        3.文字类：
            txs,ts,tm,tl,txl
        4.颜色类
            c-success,c-normal,c-info,c-warn,c-error,
            bg-success,bg-normal,bg-info,bg-warn,bg-error
        5.边距类
            pxs,pxs-t,pxs-r,pxs-b,pxs-l,
            ps,ps-t,ps-r,ps-b,ps-l,
            pm,pm-t,pm-r,pm-b,pm-l,
            pl,pl-t,pl-r,pl-b,pl-l,
            pxl,pxl-t,pxl-r,pxl-b,pxl-l,
            mxs,mxs-t,mxs-r,mxs-b,mxs-l,
            ms,ms-t,ms-r,ms-b,ms-l,
            mm,mm-t,mm-r,mm-b,mm-l,
            ml,ml-t,ml-r,ml-b,ml-l,
            mxl,mxl-t,mxl-r,mxl-b,mxl-l,
        6.栅格系统
            1.没有边距的：.j-row -> .j-col (c1-c24)
            2.有边距的：.j-row.j-row-m -> .j-col (c1-c24)
            3.j-row 和 j-col 可以嵌套使用
        7.组件公共样式
            .success,.normal,.info,.warn,.error
            .xs,.s,.m,.l,.xl
        备注：控件后的[color,size,disabled]表示控件是否支持颜色,大小类和是否可禁用
            disabled 不需要值
        8.按钮：.j-btn [color,size,disabled]
            <button class="j-btn">不带图标</button>
            <button class="j-btn"><i class='j-icon icon-trash'></i>带图标</button>
        9.输入框(含textarea)：.j-input [color,size,disabled]
            <input class="j-input" type="text">
        10. 以下为与jet绑定定制的元素
            1.公共属性 jui-bind:绑定jet中的data,
                    jui-change:值改变时的回调函数
            2.html元素.$jui 可以获取 jui元素
            3.html元素的value属性会根据绑定值改变而改变
            4.以下演示的所有属性值都是默认值
        11.单选框：j-radio [disabled]
            <div class='j-radio' value='选项一' checked=false>选项一</div>
            备注：未包裹在 单选框组 的单选框会分在全局的一个默认单选框组里
        12.单选框组：j-radio-group
            <div class='j-radio-group' value='选项一'>
                <div class='j-radio'>选项一</div>
                <div class='j-radio'>选项二</div>
            </div>
        13.复选框：j-checkbox [disabled]
            <div class='j-checkbox' value='西瓜' checked=false>西瓜</div>
            备注：未包裹在 复选框组 的复选框会分在全局的一个默认复选框组里
        14.复选框组：j-checkbox-group
            <div class='j-checkbox-group' value=''>
                <div class='j-checkbox'>选项一</div>
                <div class='j-checkbox'>选项二</div>
            </div>
            备注：value是一个数组
        15.下拉框：j-select 与 j-option  [size,disabled]
            <div class="j-select" value='选项二'>
                <div class="j-option" value='选项一'>选项一</div>
                <div class="j-option" default value='选项二'><i class='j-icon icon-pencil'></i>选项二</div>
                <div class="j-option" disabled value='选项三'><i class='j-icon icon-pencil'></i>选项三</div>
            </div>
            备注：default属性用于指定默认值，disabled用于禁用选项,带 i 元素的是带图标的选项
        16.切换按钮:j-switch [size,disabled]
            <div class="j-switch" value='是'>
                <div value='是' checked>是</div>
                <div value='否'>否</div>
            </div>
            <div class="j-switch"></div>
            html内容可以为空，为空默认是是和否
        17.时间选择器：j-date [size,disabled]
            <div class='j-date' value=''></div>
        18.颜色选择器：j-color [size,disabled]
            <div class='j-color' value='' alpha=false></div>
            备注：alpha 为是否启用透明度
        19.slider: j-slider
            <div class='j-slider' min='0' max='100' width='150' value='0'></div>
        20.JUI.msg()
        21.j-icon
        22.JUI.confirm
        23.dialog 对话框


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


//2018 （部分）
//1-25 修复了一个for的bug 没有包裹each时，元素的孩子和文字顺序会混乱
//2-1 新增了ondatachange；修复了 jif中attr的不能正确移除属性的bug
//2-3 新增jdom 
//2-5 jrun jon 支持多个函数，支持js代码，jon支持绑定多个事件
//2-6 jload 修复了子模版使用父模版元素的bug
//2-6 可以越过作用域一级一级向上查找属性，不会直接报错
//2-7 新增jhtml属性, text元素设置html值
//2-7 新增makeChange方法，手动触发某值改变的回调函数
//2-8 发现并修复空值不会渲染的bug
//2-9 修复多层循环 使用 $.$par.$index 的bug
//3-10: 
    validInput() 支持jdom 
    修复一个 J.type 关于 以变量是声明的类的识别的 bug var a=function(){};因为该类型构造函数的名字是函数本身
    修复了 new Jet() 没有参数是会报错的 bug
//3-12:新增 addRegExp 
