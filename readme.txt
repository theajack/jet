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
    2.数组的方法：$push,$pushArray,$prep,$prepArray,$insert,$insertArray,$remove,$clear,$replace
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
G.css配置文件
    1.css变量
    2.css函数
    3.路由页面公共样式
H.工具方法
    1.$ajax , $ajax.get , $ajax.post , $ajax.abort , $ajax.base , $ajax.xhr
    2.Jet.$
    3.prototype 扩展
I.JUI
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
        20.j-icon 图标
        21.JUI.msg()
            JUI.msg({
                text:'text',
                time:2000,//默认为2300
                type:'warn',//默认为info ,可选值有 success，info，warn，error
                autoClose:true, //默认为true
                call:function(){console.log('close')},
            })
        22.JUI.confirm
            JUI.confirm({
                title:"title",
                text:'text',
                type:'warn',
                onconfirm:function(){console.log('confirm')},
                oncancel:function(){console.log('cancel')},
                onclose:function(){console.log('close')},
            })
        23.dialog 对话框
            <div class='j-dialog' dialog-title='title' jui-bind='bool'>
            </div> 
        24.page 数据分页器
            <div class='j-page' jui-bind='current' jui-page-total='total' jui-change='pageChange'></div>
        25.tab 标签页
            <div class='j-tab' jui-bind='page'>
                <div value='p1' title='第一页'>
                    1
                </div>
                <div value='p2' title='第二页'>
                    2
                </div>
                <div value='p3' title='第三页'>
                    3
                </div>
            </div>

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
//修复bug：jetterjs 验证express 不会显示正确的错误提示
//修复bug：jetterjs 验证decimal ->float
//Jet新增 $jui()
//3-10: 
    validInput() 支持jdom 
    修复一个 J.type 关于 以变量是声明的类的识别的 bug var a=function(){};因为该类型构造函数的名字是函数本身
    修复了 new Jet() 没有参数是会报错的 bug
//3-12:新增 addRegExp 
//18-3-20:
// 路由配置 默认与名称一样
// 新增 css.conf 文件 可以设置css变量和函数 设置路由模板的公共样式
// Jet.$route Jet.$route.back Jet.$route.forward
//valid 可以设置 useJUI
//$remove 支持元素
//18-3-21
//新增jui page tab
// message 为了不让提示框跳出而不是滑下来，增加了30ms延迟
// message 增加hover属性
//18 3-22
//修复一个ie上的hash模式时的页面不会正确加载的bug
//3-23 新增了 $r 获取根元素数据，修改了get方法
//JUI msg新增 hover参数 默认为true 鼠标移上时不会自动消失
//18 3-27 完善了ajax $ajax $ajax.get $ajax.post $ajax.abort $ajax.base $ajax.xhr 
//j-icon font-size 初始值为 inherit
// 修复了 for 的关于索引的 bug 
// for 的直接孩子 bind元素现在可以正确的在属性中使用 $ 来代替其所绑定的数据 ,对数组操作进行了完善
/*3-28 修复了jload和路由组件模式下 JUI绑定的bug 现在如果jui-bind的属性不在当前Jet元素的数据中，则会在子Jet元素中寻找，如果都没有则会忽略掉
  子页面的Jet最好使用 ele:jdom 指定Jet绑定的html元素，这样可以很好地解决子页面与父页面和子页面与子页面之间的命名冲突的问题
  增加了Jet name属性，用于生成一个在Jet.$ele 中的以 name属性命名的 Jet元素变量
*/
//修复 3-29 路由页面跳转时，如果上一页面没有加载出，现在会取消上一个页面的路由
//3-30 jattr和jstyle添加 $r 的支持
//3-31 新增Jet.valid.useOnInput
/*4-2 新增 Jet.prototype.$init 对动态添加的元素 初始化
  新增 Jet.prototype.$cookie 操作cookie
  新增 Jet.prototype.$storage 操作localStorage
  修复了 input类型元素 绑定的是数字 后可能会导致的类型紊乱的错误
  修复了 input类型元素输入焦点会到最后面的bug
*/
//4-4 修复了 数组元素的国际化 bug
// 国际化现在可以包含一个json或者数组，而不只是一个值类型

//4-19 JUI 新增 j-drag
//4-23 修复：数组的方法不会触发数组的监听回掉，现在使用数组的长度的绑定会被正确刷新
//4-24 新增 $define，$export，$use，$import，$module，as ， new 关键字
//4-24 新增css scope 属性，默认值为true; JUI.clearDialog 不同组件之间切换时使用，路由切换已经写进源码
//     新增 JUI.dialog.isOpen clear ; 新增JUI.confirm.isOpen clear 
//     数组removeByIndex
//     新增 new Jet()的name 参数
//5-14 完善js模块规范
//5-15 修复css scoped的bug
//  需要新增 index.html 文件中加载资源的介绍 目录的介绍 在路由设置tureBase=true的时候
//5-16：修复了 JUI 组件关于disabled属性的bug
//     现在ondatachange可以使用json和数组 嵌套，
//     并修复了$regist 多层数组嵌套时的bug ,(a[0][0]时用出错)

//5-24 修复存在多个 jload 元素，JUI加载不正常的bug， 修复 j-dialog 不同页面之间切换不会移除的 bug
//     JUI.dialog.removeAll 不同组件之间切换时使用，路由切换已经写进源码
//     修复了添加或刪除数组元素时 $index不能正确改变 的bug，修复了使用JUI时for元素添加新元素时不会被渲染
//     新增 Jet 的 par 属性，用于指定父元素，父元素会有一个 $child 属性
//5-25 修复了for元素中使用radio或checkbox时添加新元素是，group不会被正确绑定的bug
//5-26 jui dialog 新增尺寸 xs s l xl full
//    新增 jpar 属性，用于指定 jload元素中的Jet 元素的父Jet元素。（这是用于当一个jload可能会对应多个父元素时的情况）
//    修复了 checkbox和radio checked的bug，
//    新增 checkbox group的selectAll 方法，用于全选；
//    新增 checkbox group的clear方法，用于清空所有选择
//    新增 radio group的clear方法，用于清空选中
//    新增 checkbox group 和 radio group的removeAll方法，用于删除所有checkbox|radio子元素
//    新增 checkbox group 和 radio group的remove方法
//5-27 新增 jui-type 属性，用于指定jui绑定数据的类型，可选值有 bool number string，默认值为string
//5-28 **新增 if,show,style,attr中绑定的 $.$par(index) 方法，可用于获取父元素数据，index 默认值为1,若是参数小于0，会用1计算，超过父元素级数会返回最上层父元素，也就是jet元素
//     bind元素不需要父元素，因为如果子元素中没有对应的属性，会自动向上查找父元素
//     在执行语句中，可以使用 Jet元素的 $parData(index) 方法获取或设置父元素的数据
//5-30 对于display none的元素 禁用了_validInput
//6-6 修复了因为修改jload.init引入的bug:jload 子组件无法引用父组件的数据
//6-20 ajax 新增header  新增支持数据为数组
//  jui msg text 支持 数字类型
//  增加_hasDisabled 属性 以修复 当数组为空时 其中的Jet元素可能会报错的bug
//  修复了 当输入框类型为password时 启用了 onchange 事件的bug
//6-24 j-select 组件支持 数据绑定 j-option，
//  当j-option过多时，支持上下滚动显示
//  修复了 j=‘’ 绑定数据且其数据处于上级作用域的元素，其子元素不会使用于其相同的作用域的bug 
//  （*重要）现在可以对绑定数据的数组 使用 = 号直接赋值 ，不必使用 $replace; 也对json进行了优化，现在都可以使用 = 直接赋值
//  6-26
//    修复数组插入数据 ，for中的input输入会错乱的bug 
//    修改了Jetterjs 的 insertArray(使用原生splice) removeByIndex(支持第二个参数选择删除个数)
//    （*重要）修改了原生数组操作方法(push,pop,splice,shift,unshift,reverse,sort)，现在可以使用原生数组操作来操作Jet的绑定数组
//    新增delay 和 interval 用于解决由于异步加载导致的依赖项未加载完成的情况，设置一个延迟或循环 获取依赖项
// 6-27 text 元素中func 可以使用opt参数
//    dialog.reinitPos
//    修改了 jet数据的 defineJson 的方法 现在json使用等于直接赋值可以触发绑定。（目前设定的是Jet数据中没有属性，不会被赋值到Jet数据中）
//    JUI message 和 confirm 新增 html 属性
//    （*重要）JUI date 新增 jui-date-time=true 支持选择24进制的时间
//    （*重要）JUI date 新增 jui-date-detail=true hover可以显示农历和节日节气等信息
//    JUI date 新增 jui-date-max 和 jui-date-min
//6-30    JUI dialog noclose nodrag 属性
//    Jet run现在会在渲染数据完成之后触发 ；jload onload属性
//7-3     修复了当input没有type属性时 绑定无效的bug; 修复了Date日期选择器当日期或月份是个位数时导致日期紊乱的bug
//    jstyle等元素来使用函数 $r.func({{$.score}})，text元素可以使用立即执行函数或this.func来使用函数
//  jui-date 添加选择今日按钮
//  现在jload不一定非要设置jpar属性，会将其所在的页面的Jet元素作为其父元素
