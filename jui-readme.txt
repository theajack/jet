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

有待改进：
    //SELECT 动态绑定是列表不会改表 **
    //checkbox group 有bug
    //date 没设置初始值会有bug
    //date color 通过value设置初始值没反应

    //color :第一次选择颜色时 左上角不是fff
    //confirm dialog
    jcode需要重写
    栅格使用flex布局
    