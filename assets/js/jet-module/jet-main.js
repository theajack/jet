/***** 
加入 jattr jstyle jroot
bug: 对于数组，若是没有绑定元素，则无法使用$push等方法
     对于数组，直接对数组赋值，ui不会改变
jui checkbox 由于以上两点bug 很难完成
jui select 对绑定的选项进行$push 或其他操作，ui不变


暂不支持路由的嵌套
暂不支持动态添加元素的渲染 已通过init解决
暂不支持jrepeat 重复单个元素
jdom获取样式有待改进
jif jshow jattr jstyle 数组中不支持index
jimg 的想法 已通过js修改图片的src解决

2018
1-25 修复了一个for的bug 没有包裹each时，元素的孩子和文字顺序会混乱
2-1 新增了ondatachange；修复了 jif中attr的不能正确移除属性的bug
2-3 新增jdom 
2-5 jrun jon 支持多个函数，支持js代码，jon支持绑定多个事件
2-6 jload 修复了子模版使用父模版元素的bug
2-6 可以越过作用域一级一级向上查找属性，不会直接报错
2-7 新增jhtml属性, text元素设置html值
2-7 新增$makeChange方法，手动触发某值改变的回调函数
2-8 发现并修复空值不会渲染的bug
2-9 修复多层循环 使用 $.$par.$index 的bug

修复bug：jetterjs 验证express 不会显示正确的错误提示
修复bug：jetterjs 验证decimal ->float

Jet新增 $jui()

18-3-20:
路由配置 默认与名称一样
新增 css.conf 文件 可以设置css变量和函数 设置路由模板的公共样式
Jet.$route Jet.$route.back Jet.$route.forward
valid 可以设置 useJUI
$remove 支持元素
18-3-21
新增jui page tab
18 3-22
修复一个ie上的hash模式时的页面不会正确加载的bug
3-23 新增了 $r 获取根元素数据，修改了get方法
JUI msg新增 hover参数 默认为true 鼠标移上时不会自动消失

18 3-27 完善了ajax $ajax $ajax.get $ajax.post 
j-icon font-size 初始值为 inherit
修复了 for 的关于索引的 bug 
for 的直接孩子 bind元素现在可以正确的在属性中使用 $ 来代替其所绑定的数据 ,对数组操作进行了完善

3-28 修复了jload和路由组件模式下 JUI绑定的bug 现在如果jui-bind的属性不在当前Jet元素的数据中，则会在子Jet元素中寻找，如果都没有则会忽略掉
子页面的Jet最好使用 ele:jdom 指定Jet绑定的html元素，这样可以很好地解决子页面与父页面和子页面与子页面之间的命名冲突的问题
 增加了Jet name属性，用于生成一个在Jet.$ele 中的以 name属性命名的 Jet元素变量

3-30 jattr和jstyle添加 $r 的支持
3-31 新增Jet.valid.useOnInput
4-2 新增 Jet.prototype.$init 对动态添加的元素 初始化
  新增 Jet.prototype.$cookie 操作cookie
  新增 Jet.prototype.$storage 操作localStorage
  修复了 input类型元素 绑定的是数字 后可能会导致的类型紊乱的错误
  修复了 input类型元素输入焦点会到最后面的bug

4-4 修复了 数组元素的国际化 bug
国际化现在可以包含一个json或者数组，而不只是一个值类型

4-19 JUI 新增 j-drag
4-23 修复：数组的方法不会触发数组的监听回掉，现在使用数组的长度的绑定会被正确刷新
4-24 新增 $define，$export，$get,$import，$module，，as 关键字
4-24 新增css scoped 属性，默认值为true;
    新增 JUI.dialog.isOpen clear ; 新增JUI.confirm.isOpen clear 
    数组removeByIndex
    新增 new Jet()的name 参数
5-14 完善js模块规范
5-15 修复css scoped的bug
 需要新增 index.html 文件中加载资源的介绍 目录的介绍 在路由设置tureBase=true的时候
5-16：修复了 JUI 组件关于disabled属性的bug
/     完成了ondatachange的嵌套，并修复了$regist 多层数组嵌套时的bug ,(a[0][0]时用出错)

5-24 修复存在多个 jload 元素，JUI加载不正常的bug， 修复 j-dialog 不同页面之间切换不会移除的 bug
    JUI.dialog.removeAll 不同组件之间切换时使用，路由切换已经写进源码
    修复了添加或刪除数组元素时 $index不能正确改变 的bug，修复了使用JUI时for元素添加新元素时不会被渲染
    新增 Jet 的 par 属性，用于指定父元素，父元素会有一个 $child 属性
5-25 修复了for元素中使用radio或checkbox时添加新元素是，group不会被正确绑定的bug
5-26 jui dialog 新增尺寸 xs s l xl full
   新增 jpar 属性，用于指定 jload元素中的Jet 元素的父Jet元素。（这是用于当一个jload可能会对应多个父元素时的情况）
   修复了 checkbox和radio checked的bug，
   新增 checkbox group的selectAll 方法，用于全选；
   新增 checkbox group的clear方法，用于清空所有选择
   新增 radio group的clear方法，用于清空选中
   新增 checkbox group 和 radio group的removeAll方法，用于删除所有checkbox|radio子元素
   新增 checkbox group 和 radio group的remove方法
5-27 新增 jui-type 属性，用于指定jui绑定数据的类型，可选值有 bool number string，默认值为string
5-28 **新增 if,show,style,attr中绑定的 $.$par(index) 方法，可用于获取父元素数据，index 默认值为1,若是参数小于0，会用1计算，超过父元素级数会返回最上层父元素，也就是jet元素
    bind元素不需要父元素，因为如果子元素中没有对应的属性，会自动向上查找父元素
    在执行语句中，可以使用 Jet元素的 $parData(index) 方法获取或设置父元素的数据
5-30 对于display none的元素 禁用了_validInput
6-6 修复了因为修改jload.init引入的bug:jload 子组件无法引用父组件的数据
6-20 ajax 新增header  新增支持数据为数组
 jui msg text 支持 数字类型
 增加_hasDisabled 属性 以修复 当数组为空时 其中的Jet元素可能会报错的bug
 修复了 当输入框类型为password时 启用了 onchange 事件的bug
 待增加：jui-bind 使用父元素或根元素数据**
6-24 j-select 组件支持 数据绑定 j-option，
 当j-option过多时，支持上下滚动显示
 修复了 j=‘’ 绑定数据且其数据处于上级作用域的元素，其子元素不会使用于其相同的作用域的bug 
 （*重要）现在可以对绑定数据的数组 使用 = 号直接赋值 ，不必使用 $replace; 也对json进行了优化，现在都可以使用 = 直接赋值
 6-26
   修复数组插入数据 ，for中的input输入会错乱的bug 
   修改了Jetterjs 的 insertArray(使用原生splice) removeByIndex(支持第二个参数选择删除个数)
   （*重要）修改了原生数组操作方法(push,pop,splice,shift,unshift,reverse,sort)，现在可以使用原生数组操作来操作Jet的绑定数组
   新增delay 和 interval 用于解决由于异步加载导致的依赖项未加载完成的情况，设置一个延迟或循环 获取依赖项
6-27 text 元素中func 可以使用opt参数
   dialog.reinitPos
   修改了 jet数据的 defineJson 的方法 现在json使用等于直接赋值可以触发绑定。（目前设定的是Jet数据中没有属性，不会被赋值到Jet数据中）
   JUI message 和 confirm 新增 html 属性
   （*重要）JUI date 新增 jui-date-time=true 支持选择24进制的时间
   （*重要）JUI date 新增 jui-date-detail=true hover可以显示农历和节日节气等信息
   JUI date 新增 jui-date-max 和 jui-date-min
6-30    JUI dialog noclose nodrag 属性
   Jet run现在会在渲染数据完成之后触发 ；jload jonload属性
7-3     修复了当input没有type属性时 绑定无效的bug; 修复了Date日期选择器当日期或月份是个位数时导致日期紊乱的bug
   jstyle等元素来使用函数 $r.func({{$.score}})，text元素可以使用立即执行函数或this.func来使用函数
 jui-date 添加选择今日按钮
 现在jload不一定非要设置jpar属性，会将其所在的页面的Jet元素作为其父元素
7-10 （*重要）将jcode融入了JUI ,新增了索引和点击某行高亮；jui-code-line 用于是否显示索引默认为true
 新增了jui-onload属性
7-5:路由新增use参数新增oninit 用于在路由化之后调用，一般可以用来加载模块  

//---表示与开发者无关
10-30
 修复表达式中出现 小于大于号时会出错的bug
 增加JUI中button 的 icon 属性
 ---现在，就算没有声明Jet的name参数，也会为Jet对象默认指定一个name
10-31
 整理删除JUI中的冗余代码
11-1
 子组件添加name属性，用于指定 子组件中的 name参数

 
 * 11-3
 * (*重要) 新增 jet tool(attr style if show) 中支持 $index 和 $index() 获取 索引
 * 使用 $index() 来替换 $.$p().$index
 * (*重要) 新增父子组件通信 传值  三种方式  
 *      :name='' 可以是父元素中的data或是一个js表达式 
 *      ::name='' 同上 不同的是会将数据做一个深拷贝而不是直接引用
 *      @func='' 可以是父元素中的func或是一个js表达式 
        当时js表达式时，需要使用 {} 包裹起来，否则会当成一个字符串处理 
        在js表达式中 this指代父元素，有两个参数 $和opt ，$指代作用域内的数据，opt指代如下
 *      opt={
          data:指代作用域内的数据,
          ele:指代当前dom元素,
          jet:指代父Jet元素,
          root:指代根Jet元素
        }
        在子元素中使用 this.$props对象就可以获取到父元素给子元素传递的数据。
        也可以使用 属性J 绑定 $props 中的数据
        由于属性不支持大写，所以以 - 来代替大写，比如 user-info 会被Jet翻译成 userInfo
    _JT_replaceAll 支持数组传参
    新增 media 目录
    新增 Jet.router.url 属性
    新增资源管理 Jet.res.define   Jet.res.getSrc  @
    ---Jet.load.__loadStore   
    ---在load.init 回调中 init router
    ---现在 Jet组件都会有严格的父子组件关系、对应的ele 和 name（如没有定义就按照Jet规则默认命名）
    ---只存在一个默认绑定HTML标签的根root组件
  11-4
  新增生命周期 beforeinitawait
  新增 Jet.router.activeRouter 重新激活active router link，用于一些后加载的组件中的router-link的激活
  新增 新增 Jet.prototype.$module

  api jrouter&jout 新增jrouter-active说明

  11-6 
  router onroute onrouted 新增一个bool参数，表示是初始化加载还是 页面无刷新的路由跳转
  route() 增加第二个参数 ，为路由跳转完成的回调函数
  11-7 jui 新增 progress，并且slider和progress都支持了颜色、大小，slider支持了disabled




  
  需修改 css scope 属性
  需新增 组件销毁的生命周期
  需拆分 Jet，使用Jet.$use() 按需加载 ['router','lang','module','css-config','jui','valid'] 
  需新增 反向计算得到父元素数据
*/
(function () {
    
    /*define*********************************************************************************/

    function _define(obj, data, calls) {
        if (!calls._func) calls._func = [];
        for (var k in data) {
            _defineCom(obj, k, data, calls);
        }
    }
    function _defineArray(obj, data, calls) {
        _defineArrayFormIndex(obj, data, calls);
    }
    function _defineArrayFormIndex(obj, data, calls, index) {
        if (!calls._func) calls._func = [];
        for (var k = index || 0; k < data.length; k++) {
            _defineCom(obj, k, data, calls);
        }
    }
    function _defineCom(obj, k, data, calls) {
        var type = _JT.type(data[k]);
        if (type == "json") {
            var _o = {};
            if (!calls[k]) calls[k] = {};
            _defineBase(obj, data, k, _o, calls[k]);
            _define(_o, data[k], calls[k]);
        } else if (type == 'array') {
            var _o = [];
            if (!calls[k]) calls[k] = [];
            _o._calls = calls[k];
            _o._data = data[k];
            _defineBase(obj, data, k, _o, calls[k], true);
            _defineArray(_o, data[k], calls[k]);
        } else {
            if (!calls[k] || !calls[k]._func) calls[k] = { _func: [] };
            defineFinal(obj, data, k, calls[k])
        }
    }
    function _defineBase(obj, data, key, temp, calls, isArray) {
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                return temp;
            },
            set: function (val) {
                if (isArray) {
                    obj[key].$replace(val);//数组赋值
                } else {
                    data[key] = val;
                    _copyValue(temp, val, calls);
                }
                calls._func._JT_each(function (call) {
                    call(key, val);
                })
            }
        });
    }
    function defineFinal(obj, data, key, calls) {
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                var v = data[key];
                if (_checkIn(data[key], 'type', _lang)) {
                    return data[key].data[Jet.lang.type]
                } else {
                    return data[key];
                }
            },
            set: function (val) {
                if (_checkIn(data[key], 'type', _lang)) {
                    data[key].data[Jet.lang.type] = val;
                } else {
                    data[key] = val;
                }
                calls._func._JT_each(function (call) {
                    call(key, val);
                })
            }
        })
    }
    function _checkIn(data, key, value) {//data[key]===value
        var _in = (data != null && typeof data == 'object' && key in data);
        if (arguments.length == 2) {
            return _in
        } else {
            return (_in && data[key] === value);
        }
    }

    function _copyValue(a, b, calls) {
        if (_checkType(a, b) == 'json') {
            _copyValueJson(a, b, calls);
        } else {
            _copyValueArr(a, b, calls);
        }
    }
    function _copyValueJson(a, b, calls) {
        for (var k in b) {
            _copyCom(a, b, k, calls);
        }
    }
    function _copyValueArr(a, b, calls) {
        a.$replace(b);
        // for(var k=0;k<b.length;k++){
        //   _copyCom(a,b,k,calls);
        // }
    }
    function _copyCom(a, b, k, calls) {
        if (a[k] !== undefined) {
            var t = _JT.type(a[k]);
            if (t == 'json') {
                _copyValueJson(a[k], b[k], calls[k]);
            } else if (t == 'array') {
                _copyValueArr(a[k], b[k], calls[k]);
            } else {
                a[k] = b[k];
            }
        } else {
            _defineCom(a, k, b, calls)
        }
    }

    function _checkType(a, b) {
        var a_t = _JT.type(a);
        var b_t = _JT.type(b);
        if (a_t !== b_t) {
            _throw('不允许前后设置的值类型不一致');
        }
        return a_t;
    }
    /*jet*********************************************************************************/
    //

    // j-bind
    // j-for
    // j-switch
    // j-case
    // j-input  j-type
    // j-text 
    // $each
    // $index
    // $value

    // j-if = exp:class[a,b|b];attr[a=b,a=b|a];func
    // $  class[a|b]  attr[a|b]  function
    // j-on 
    // j-run

    var _bind = "J",
        _for = "Jfor",
        _input = "Jinput",
        _text = "Jtext",
        _if = "Jif",
        _on = "Jon",
        _run = "Jrun",

        _attr = "Jattr",
        _style = "Jstyle",

        _show = "Jshow",

        _root = 'Jroot',

        _each = "$each",
        _value = "$value",
        _index = "$index",
        _dom = 'jdom',
        _html = 'jhtml',
        _reg = new RegExp("({{)((.|\\n)*?)(}})", "g"),
        _numReg = new RegExp("(\\[)((.|\\n)*?)(\\])", "g");

    // var opt={data:JL({
    //   en:{
    //     	a1:'a',
    //       a2:{a:1},
    //       a3:{a:1,b:[1,2,3]},
    //       a4:[1,2,3],
    //       a5:[{a:1},{a:2}],
    //       a0:[{a:[1,2,3]},{a:[3,2,1]}],
    //   },
    //   cn:{
    //     	a1:'啊',
    //       a2:{a:1},
    //       a3:{a:1,b:[1,2,3]},
    //       a4:[1,2,3],
    //       a5:[{a:1},{a:2}],
    //       a0:[{a:[1,2,3]},{a:[3,2,1]}],
    //   },
    // })};_checkDataForData(opt)
    function _checkDataForData(opt) {
        var d = opt.data;
        if (_checkIn(d, 'type', _lang)) {
            var newd = {};
            var path = '';
            var _d = _JT.clone(d.data[Jet.lang.list[0]]);
            _addDataWrapper(_d, newd, path, d.data);
            opt.data = newd;
        } else {
            _searchData(d);
        }
    }
    function _searchData(d) {
        for (var k in d) {
            _searchDataBase(d, k)
        }
    }
    function _searchDataArray(d) {
        for (var i = 0; i < d.length; i++) {
            _searchDataBase(d, i)
        }
    }
    function _searchDataBase(d, k) {
        var t = _JT.type(d[k]);
        if (_checkIn(d[k], 'type', _lang)) {
            var newd = {};
            var path = '';
            var _d = _JT.clone(d[k].data[Jet.lang.list[0]]);
            if (typeof _d === 'object') {
                _addDataWrapper(_d, newd, path, d[k].data);
                d[k] = newd;
            }
        } else if (t === 'json') {
            _searchData(d[k])
        } else if (t === 'array') {
            _searchDataArray(d[k])
        }
    }
    function _addDataWrapper(data, newd, path, base) {
        if (typeof data === 'object') {
            for (var k in data) {
                _addDataBase(data, newd, path, base, k)
            }
        }
    }
    function _addDataWrapperArray(data, newd, path, base) {
        for (var i = 0; i < data.length; i++) {
            _addDataBase(data, newd, path, base, i)
        }
    }
    function _addDataBase(data, newd, path, base, key) {
        var t = _JT.type(data[key]);
        if (typeof key === 'string') {
            path += ('.' + key);
        } else {
            path += ('[' + key + ']');
        }
        if (t === 'json') {
            newd[key] = {};
            newd = newd[key];
            data = data[key];
            _addDataWrapper(data, newd, path, base);
        } else if (t === 'array') {
            newd[key] = [];
            newd = newd[key];
            data = data[key];
            _addDataWrapperArray(data, newd, path, base);
        } else if (t === 'string' || t === 'number' || t === 'boolean') {
            newd[key] = _concatLangObj(base, path);
            newd = newd[key];
        } else {
            _throw(t + '数据类型错误：' + data[key])
        }
    }
    function _concatLangObj(base, path) {
        var obj = {};
        for (var k in base) {
            obj[k] = (new Function('d', "return d" + path))(base[k]);
        }
        return JL(obj);
    }
    function _createEmpty() {
        var a = {};
        a.__proto__ = null;
        return a;
    }
    var _props = 'props', _dataPrefix = ':', _dataClonePrefix = '::', _funcPrefix = '@';
    function _initLoadEle(opt) {
        var ctx = opt.ele.__loadOpt;//jload元素独有的数据作用域等信息
        // _data
        // calls
        // data
        // ele
        // jet
        // name
        // par
        if (!ctx)
            return;
        this._tools._props = _formatProps(this, ctx, opt);
        this._tools._data.$props = this._tools._props;
        // for(var k in this.$props){
        //   if(typeof this.$props[k]!='function'){
        //     if(k in opt.data){
        //       _throw('Jet data 中的命名与组件属性名冲突')
        //     }
        //     if(opt.func&&k in opt.func){
        //       _throw('Jet func 中的命名与组件属性名冲突')
        //     }
        //     opt.data[k]=this.$props[k];
        //   }
        // }
    }
    //将直接引用的数据添加到$Props上
    function _addParPropsToJet(_this) {
        var _tools = _this._tools._props_tools;
        if (!_tools)
            return;
        _tools._props.forEach(function (d) {
            if (d.isExp) {
                //连接回调函数队列
                _initExpPropsCall(_this, _tools, d)
            } else {
                //注册响应数据
                _defineProps(_this.$props, _tools._ctx_data, d.name, d.value);
                //连接源数据
                _this._tools._data.$props[d.name] = _tools._ctx_source_data[d.value]
                //连接回调函数队列
                _this._tools._calls.$props[d.name] = _tools._ctx_call[d.value]
            }
        })
        //delete _this._tools._props_tools;
        Object.defineProperty(_this, '$props', {
            set: function (val) {
                _throw('$prop 不能被赋值')
            }
        })
    }
    function _initExpPropsCall(_this, _tools, d) {
        var m = d.value.match(_reg);
        if (m == null)
            return;
        m.forEach(function (item) {
            item = item.substring(2, item.length - 2);
            if (item !== '') {
                if (item == '$') {
                    _this._tools._calls.$props[d.name] = _tools._ctx_call;
                } else if (item.substring(0, 2) == '$.') {
                    if (typeof _this.$props[d.name] == 'object') {
                        // 引用类型数据 会自动改变
                        _this._tools._calls.$props[d.name] = (new Function('$', 'return ' + item))(_tools._ctx_call);
                    } else {
                        // 非引用类型数据 且使用js表达式的 支持支单向数据流 即父元素改动会影响子元素
                        // _this._tools._calls.$props[d.name]._func.push(function(k,v){
                        //   if(k){
                        //     //_tools._ctx_jet[k]=v;//直接设置会报错 Maximum call stack size exceeded
                        //     _tools._ctx_source_data[k]=v
                        //     _tools._ctx_call[k]._func.forEach(function(f){f()})
                        //   }
                        // })
                        _tools._ctx_call[d.name]._func.push(function (k, v) {
                            if (k) {
                                // _this._tools._data.$props[k]=d.func();
                                // _this._tools._calls.$props._func.forEach(function(f){f()})
                                _this.$props[k] = d.func();
                            }
                        })
                    }
                }
            }
        })
    }
    function _defineProps(p, data, name, value) {
        Object.defineProperty(p, name, {
            configurable: true,
            get: function () {
                return data[value];
            }, set: function (val) {
                data[value] = val;
            }
        })
    }
    function _formatProps(_this, ctx, opt) {
        var ats = opt.ele.attributes;
        var jet = ctx.jet;
        var data = ctx.data;
        var pt = {};
        pt._ctx_jet = jet;
        pt._ctx_call = ctx.calls;
        pt._ctx_source_data = ctx._data;
        pt._ctx_data = ctx.data;
        pt._props = [];
        var p = {};
        for (var i = 0; i < ats.length; i++) {
            var d = _getPrefixAndName(ats[i]);
            if (d != null) {
                if (d.value in ctx._data || (jet[d.value] && typeof jet[d.value] == 'function')) {//在作用域内有数据或函数;
                    // if(typeof jet[d.value]!='function'){
                    if (d.value in ctx._data) {
                        if (d.prefix == _dataClonePrefix) {
                            p[d.name] = _simpleCloneObject(data[d.value])
                        } else {
                            //p[d.name]=jet._tools._data[d.value];
                            pt._props.push({
                                name: d.name, value: d.value
                            })
                            //_defineProps(p,jet,d.name,d.value)
                        }
                    } else {
                        p[d.name] = jet[d.value].bind(jet);
                        p[d.name].__props_child = true;//在参数中添加一个child
                    }
                } else {
                    var newOpt = {
                        data: data,
                        ele: opt.ele,
                        jet: jet,
                        root: Jet.$root
                    }
                    if (d.prefix == _funcPrefix) {
                        if (d.value[0] == '{' && d.value[d.value.length - 1] == '}') {//用{}表示bool表达式
                            p[d.name] = (new Function('$', 'opt', d.value)).bind(jet, data, newOpt)
                        } else {
                            _throw('子组件使用js表达式作为函数参数时请使用{ }包裹')
                        }
                    } else {
                        if (d.value[0] == '{' && d.value[d.value.length - 1] == '}') {//用{}表示bool表达式
                            d.value = d.value.substring(1, d.value.length - 1);
                            var _val = d.value;
                            d.value = d.value._JT_replaceAll([
                                ["{{", ''], ["}}", '']
                            ])
                            var _func = (new Function('$', 'opt', 'return ' + d.value)).bind(jet, data, newOpt);
                            var _data = _func();
                            if (d.prefix == _dataClonePrefix) {
                                p[d.name] = _simpleCloneObject(_data)
                            } else {
                                p[d.name] = _data;
                                pt._props.push({
                                    name: d.name, value: _val, isExp: true, func: _func
                                })
                            }
                        } else {
                            p[d.name] = d.value;
                        }
                    }
                }
            }
        }
        _this._tools._props_tools = pt;
        return p;
    }
    function _simpleCloneObject(obj) {
        if (typeof obj == 'object')
            return JSON.parse(JSON.stringify(obj))
        return obj;
    }
    function _getPrefixAndName(ats) {
        var name = ats.name;
        var val = ats.value;
        var pname = '', prefix = '';
        if (name.substring(0, 2) == _dataClonePrefix) {
            pname = name.substring(2);
            prefix = _dataClonePrefix;
        } else {
            if (name[0] == _dataPrefix) {
                prefix = _dataPrefix;
                pname = name.substring(1);
            } else if (name[0] == _funcPrefix) {
                prefix = _funcPrefix;
                pname = name.substring(1);
            }
        }
        if (prefix == '')
            return null;
        return {
            prefix: prefix, name: _formatLine2Upper(pname), value: val
        }
    }
    function _formatLine2Upper(s) {
        var arr = s.split('-');
        if (arr.length == 1) {
            return s;
        }
        s = arr[0];
        for (var i = 1; i < arr.length; i++) {
            s += arr[i][0].toUpperCase() + arr[i].substring(1);
        }
        return s;
    }
    var __jet_id = 0, __ele_id = 0, __comp_id = 'comp__id', __jet_root = '_root', __router_comp = '$routerComp', __comp_name = 'name';
    window.Jet = function (par, ele, opt) {
        if (typeof opt === 'object') {
            if (!opt.ele) {
                opt.ele = _JT.attr(__comp_id + '="' + ele + '"');
                opt.ele._JT_removeAttr(__comp_id);
            }
            if (!opt.par) {
                opt.par = par;
            }
        } else {
            opt = par;
        }
        if (opt === undefined) opt = {};
        _checkDataForData(opt);
        opt.ele = (opt.ele) ? _getJdomEle(opt.ele) : document.documentElement;
        opt.ele.__jet = this;
        if (!Jet.$unnamedJets[__jet_root] && opt.ele.tagName == 'HTML') {
            Jet.$unnamedJets[__jet_root] = this;
            Jet.$root = this;
        }
        if (opt.ele._JT_hasAttr(__comp_name)) {//优先使用 组件上的name属性
            opt.name = opt.ele._JT_attr(__comp_name);
        }
        if (!opt.name) {
            if (ele == __router_comp) {//路由页面组件
                opt.name = __router_comp;
                Jet.$unnamedJets.routerComp = this;
            } else {
                opt.name = '_' + (__jet_id++);
                Jet.$unnamedJets[opt.name] = this;
            }
        } else {
            if (Jet[opt.name] && Jet[opt.name].$DOM == undefined) {//避免与Jet.Input等冲突
                _throw('Jet name 属性等于' + opt.name + '已存在，请重新命名');
            }
            Jet[opt.name] = this;
        }

        if (opt.par) {
            this.$par = Jet[opt.par] || Jet.$unnamedJets[opt.par];
            if (this.$par) {
                if (!this.$par.$child) {
                    this.$par.$child = _createEmpty();
                }
                if (ele == __router_comp) {//路由页面组件
                    this.$par.$child[__router_comp] = this;
                } else {
                    this.$par.$child[opt.name] = this;
                }
            }
        }
        this._tools = {
            _jets: [],
            _jetTools: [],
            _calls: {},
            _data: opt.data || {},
            //_ele:(opt.ele=='')?Jet.__tempRoot:_getJdomEle(opt.ele)
            _ele: opt.ele,
            name: opt.name,
        }
        this.$dom = {};
        var _this = this;
        _initLoadEle.call(this, opt)
        _define(this, opt.data, this._tools._calls);
        _addParPropsToJet(this);
        if (opt.func) {
            for (var key in opt.func) {
                if (this[key]) {
                    _throw('data 不能与 func 有重名属性');
                } else {
                    this[key] = opt.func[key]
                }
            }
        }
        var _this = this;

        if (opt.beforeinit) {
            opt.beforeinit.call(this);
        } else if (opt.beforeinitawait) {
            opt.beforeinitawait.call(this, function () {
                _initJet.call(_this, opt, _this._tools._calls);
            });
            return;
        }
        _initJet.call(_this, opt, _this._tools._calls);
    };
    Jet.prototype = _createEmpty();
    Jet.prototype.$get = function () {
        return this;
    };
    Jet.prototype.$makeChange = function (s) {
        var call = (new Function('call', 'return call.' + s + '._func'))(this._tools._calls);
        call.forEach(function (f) {
            f();
        });
    };
    Jet.prototype.$DOM = function (ele) {//用于判断是否是Jet元素，不可轻易删除
        return new Jet.DOM({ ele: ele, jet: this });
    }; Jet.prototype.$cookie = _cookie;
    Jet.prototype.$storage = _storage;
    Jet.prototype.$ajax = function (opt) {
        if (opt.base != false && Jet.prototype.$ajax.base !== undefined) {
            opt.url = Jet.prototype.$ajax.base + opt.url;
        }
        Jet.prototype.$ajax.xhr = _ajax(opt);
        return Jet.prototype.$ajax.xhr;
    }; Jet.prototype.$ajax.get = function (url, data, sc, fc) {
        return Jet.prototype.$ajax({
            data: data,
            url: url,
            success: sc,
            error: fc
        });
    };
    Jet.prototype.$ajax.post = function (url, data, sc, fc) {
        return Jet.prototype.$ajax({
            type: 'post',
            data: data,
            url: url,
            success: sc,
            error: fc
        });
    }; Jet.prototype.$ajax.abort = function () {
        if (Jet.prototype.$ajax.xhr) {
            Jet.prototype.$ajax.xhr.abort();
            Jet.prototype.$ajax.xhr = null;
        }
    }; Jet.prototype.$jui = function (s) {
        return _getJdomEle(s, this._tools._ele).$jui;
    };
    Jet.prototype.$init = function (ele) {
        _initJetEle.call(this, ele);
    };
    function _findParJet(ele) {
        var par = ele._JT_parent();
        while (typeof par.__jet === 'undefined') {
            par = par._JT_parent();
        }
        return par.__jet;
    }
    Jet.prototype.$route = function (s, isOpen) {
        Jet.router.route(s, isOpen);
    };
    Jet.prototype.$route.back = function (s) {
        Jet.router.back();
    };
    Jet.prototype.$route.forward = function (s) {
        Jet.router.forward();
    };
    Jet.prototype.$ = _JT;
    Jet.prototype.$regist = function (name, call) {
        _registDataCall(_formatRegustArg(name, call, this, arguments.length));
    };
    function _formatRegustArg(name, call, _this, n) {
        var opt = { jet: _this };
        if (n == 1) {
            opt.call = name;
        } else if (n == 2) {
            opt.call = call;
            opt.name = name;
        }
        return opt;
    }
    function _registDataCall(opt) {
        var name = opt.name;
        var call = opt.call;
        var _this = opt.jet;
        var _call = _this._tools._calls;
        var isDisable = false;
        if (name !== undefined) {
            // if(name._JT_has(_each)){
            //   name=name._JT_replaceAll("\\"+_each,"$."+this.ele.__jet.par.name+"["+this.ele.__jet.name+"]")
            // }
            if (name._JT_has('.')) {
                var a = name.split('.');
                for (var i = 1; i < a.length; i++) {
                    _call = _getCallbackOfArr(_call, a[i])//_call[a[i]];
                    if (_call == null) {
                        isDisable = true;
                        if (opt.jet) {
                            if (!_this.$DOM) {
                                _this.disable();
                            } else {
                                _warn('忽略了一个元素');
                            }
                        }
                        break;
                    }
                }
                if (!isDisable)
                    _call._func.push(call);
            } else {
                if (_JT.type(call) != 'function') {
                    _throw('call参数必须为函数');
                }
                _call = _getCallbackOfArr(_call, name)
                if (_call == null) {
                    isDisable = true;
                    if (opt.jet) {
                        if (!_this.$DOM) {
                            _this.disable();
                        } else {
                            _warn('忽略了一个元素');
                        }
                    }
                } else {
                    _call._func.push(call);
                }
            }
        } else {
            if (_JT.type(call) != 'function') {
                _throw('call参数必须为函数');
            }
            _call._func.push(call);
        }
    }
    function _getCallbackOfArr(call, s) {
        var a = s.match(_numReg);
        if (a == null) {
            if (!call[s]) {
                //_throw('没有'+s+'属性');
                return null;
            }
            return call[s];
        } else {
            var attr = s.substring(0, s.indexOf('['));
            var _c = call[attr];
            a.forEach(function (item) {
                var _ss = item.substring(1, item.length - 1);
                if (!_c[_ss]) {
                    //_throw('索引为'+s+'的位置没有值');
                    return null;
                }
                _c = _c[_ss]
            });
            return _c;
        }
    }
    Jet.$ = _JT;
    Jet.$unnamedJets = {};
    // var _moduleList=['router','lang','module','css-config','jui','valid'];
    // var _usedModuleList=[];
    // Jet.$use=function(name){
    //   if(typeof name=='object'){
    //     name.forEach(function(item){
    //       Jet.$use(item);
    //     })
    //   }else{
    //     if(_moduleList.indexOf(name)==-1){
    //       _throw('模块命名错误：可选值为:'+_moduleList)
    //     }else{
    //       if(_usedModuleList.indexOf(name)==-1){
    //         _usedModuleList.push(name);
    //         _JT.body()._JT_append(_JT.ct('script')._JT_attr('src','assets/js/jet-module/'+name+'.js'));
    //       }
    //     }
    //   }
    // };
    // Jet.$useAll=function(){
    //   Jet.$use(_moduleList);
    // };
    //html text class attr css 
    //
    //
    Jet.DOM = function (opt) {
        this.jet = opt.jet;
        this.ele = opt.ele;
        this.name = opt.ele._JT_attr(_dom);
        //this.ele._JT_removeAttr(_dom);
        var _this = this;
        Object.defineProperties(this, {
            'html': {
                get: function () {
                    return _this.ele.innerHTML;
                }, set: function (v) {
                    _this.ele.innerHTML = v;
                }
            }, 'text': {
                get: function () {
                    return _this.ele.innerText;
                }, set: function (v) {
                    _this.ele.innerText = v;
                }
            }, 'value': {
                get: function () {
                    return _this.ele.value;
                }, set: function (v) {
                    _this.ele.value = v;
                }
            }, 'class': {
                get: function () {
                    return _this.ele._JT_attr('class');
                }, set: function (v) {
                    if (v[0] != '+' && v[0] != '-') {
                        _this.ele._JT_attr('class', v);
                    } else {
                        var a = v.split(';');
                        a.forEach(function (c) {
                            if (c[0] != '+' && c[0] != '-') {
                                _throw('添加或删除类 第一个字符必须是+或者-');
                            }
                            if (c[0] == '+') {
                                _this.ele._JT_addClass(c.substring(1));
                            } else {
                                _this.ele._JT_removeClass(c.substring(1));
                            }
                        });
                    }
                }
            }, 'outerHtml': {
                get: function () {
                    return _this.ele.outerHTML;
                }, set: function (v) {
                    console.error('outerHtml 不允许赋值');
                }
            }, 'attr': {
                get: function () {
                    var a = {};
                    for (var i = 0; i < _this.ele.attributes.length; i++) {
                        a[_this.ele.attributes[i].name] = _this.ele.attributes[i].textContent;
                    }
                    return a;
                }, set: function (v) {
                    var a = v.split(';');
                    a.forEach(function (c) {
                        if (c[0] == '-') {
                            _this.ele._JT_removeAttr(c.substring(1));
                        } else {
                            var pair = c.split('=');
                            if (pair.length == 0) pair[1] = '';
                            if (pair[0] == '+') {
                                _this.ele._JT_attr(pair[0].substring(1), pair[1]);
                            } else {
                                _this.ele._JT_attr(pair[0], pair[1]);
                            }
                        }
                    });
                }
            }, 'css': {
                get: function () {
                    return _this.ele.style;
                }, set: function (v) {
                    var a = v.split(';');
                    a.forEach(function (c) {
                        var pair = c.split('=');
                        _this.ele._JT_css(pair[0], pair[1]);
                    });
                }
            }
        });
    };
    function _initJetDom(ele) {
        var doms;
        var type = _JT.type(ele);
        if (type !== 'undefined') {
            if (type === 'string') {
                var s = ele;
                ele = _JT.attr(_dom + '=' + s);
                if (!ele._JT_exist()) {
                    ele = _JT.id(s);
                }
            }
        }
        var _this = this;
        if (ele) {
            doms = ele._JT_findAttr(_dom);
        } else {
            doms = _JT.attr(_dom);
        }
        doms._JT_each(function (item) {
            if (item._hasDom !== true) {
                _this.$dom[item._JT_attr(_dom)] = new Jet.DOM({ ele: item, jet: _this });
                item._hasDom = true;
            }
        });
    }
    function _initJet(opt, calls) {
        if (typeof opt.ele == 'string' && opt.ele != '') {
            opt.ele = _JT.attr(_dom + '=' + opt.ele);
        }
        _initJetDom.call(this, opt.ele)
        var _this = this;
        var bindList, ifList, showList, onList, runList, attrList, styleList, loadList;
        if (opt.ele) {
            bindList = opt.ele._JT_findAttr(_bind);
            ifList = opt.ele._JT_findAttr(_if);
            showList = opt.ele._JT_findAttr(_show);
            onList = opt.ele._JT_findAttr(_on);
            runList = opt.ele._JT_findAttr(_run);
            attrList = opt.ele._JT_findAttr(_attr);
            styleList = opt.ele._JT_findAttr(_style);
        } else {
            bindList = _JT.attr(_bind);
            ifList = _JT.attr(_if);
            showList = _JT.attr(_show);
            onList = _JT.attr(_on);
            runList = _JT.attr(_run);
            attrList = _JT.attr(_attr);
            styleList = _JT.attr(_style);
        }
        //var temp=[];
        //var dom=document.createDocumentFragment();
        // bindList._JT_each(function(item,index){
        //   temp.push({
        //     par:item._JT_parent(),
        //     index:item._JT_index(),
        //     item:item
        //   });
        // });
        var jumpList = [];
        bindList._JT_each(function (item, index) {
            if (!item._hasBind && !item._hasDisabled) {
                //dom.appendChild(item);
                var attr = item._JT_attr(_bind);
                if (opt.data == undefined || attr == '') {
                    var _opt = _jetOpt(_this, item, attr, { _func: [] });
                    item.__isRoot = true;
                    _this._tools._jets.push(new Jet.Bind(_opt));
                } else if (attr in opt.data) {
                    var type = _JT.type(opt.data[attr]);
                    var _opt = _jetOpt(_this, item, attr, calls[attr]);
                    var _jet;
                    switch (type) {
                        case 'json': _jet = new Jet.Bind(_opt); break;
                        case 'array': _jet = new Jet.For(_opt); break;
                        default: _jet = (_isInput(item)) ? new Jet.Input(_opt) : new Jet.Text(_opt); break;
                    }
                    item.__isRoot = true;//为了记录根元素的初始位置，忽略非根元素
                    _this._tools._jets.push(_jet);
                } else {
                    item.__isRoot = true;
                    addToJumpList(item, jumpList);
                    //if(item._JT_find)
                    //_throw('原数据没有'+attr+'属性');
                }
            }
        });
        jumpList._JT_each(function (item, index) {
            item._hasJumped = undefined;
        })
        //如果属性jet元素是 绑定数据的jet元素，则给绑定数据处理，否则交给父元素
        ifList._JT_each(function (item) {
            if (!item._hasIf && !item._hasDisabled) {//不需要加root判断 因为本来就是root
                _this._tools._jetTools.push(new Jet.If(_jetOpt(_this, item)));
            }
        });
        showList._JT_each(function (item) {
            if (!item._hasShow && !item._hasDisabled) {
                _this._tools._jetTools.push(new Jet.Show(_jetOpt(_this, item), true));
            }
        });
        onList._JT_each(function (item) {
            if (!item._hasOn && !item._hasDisabled) {
                _this._tools._jetTools.push(new Jet.On(_jetOpt(_this, item)));
            }
        });
        runList._JT_each(function (item) {
            if (!item._hasRun && !item._hasDisabled) {
                _this._tools._jetTools.push(new Jet.Run(_jetOpt(_this, item)));
            }
        });
        attrList._JT_each(function (item) {
            if (!item._hasAttr && !item._hasDisabled) {
                _this._tools._jetTools.push(new Jet.Attr(_jetOpt(_this, item)));
            }
        });
        styleList._JT_each(function (item) {
            if (!item._hasStyle && !item._hasDisabled) {
                _this._tools._jetTools.push(new Jet.Style(_jetOpt(_this, item), true));
            }
        });
        if (opt.ele) {
            loadList = opt.ele._JT_findAttr(_jload);
        } else {
            loadList = _JT.attr(_jload);
        }
        loadList._JT_each(function (item) {
            if (!item._hasLoad && !item._hasDisabled) {
                item._hasLoad = true;
                var opt = _jetOpt(_this, item);
                item.__loadOpt = opt;
            }
        })
        if (opt.beforemount) {
            opt.beforemount.call(this);
        }
        // temp._JT_each(function(json){
        //   if(json.item.__isRoot==true&&json.item._hasRemove!=true){
        //     json.par._JT_append(json.item,json.index);
        //     Jet.valid.init(json.item);
        //   }
        // });
        Jet.$.id('__preload_j')._JT_remove();
        _initOnDataChange(this, opt.ondatachange);

        //init jet
        if ('undefined' != typeof JUI) {
            _checkHasDialog(opt.ele);
            JUI.useBind(this);
            JUI.init(opt.ele);
        }
        if (opt.onready) {
            _domSatte.ready(opt.onready, this);
        }
        if (opt.onload) {
            _domSatte.load(opt.onload, this);
        }
        if (opt.onroute) {
            Jet.router.onroute(opt.onroute, this);
        }
        if (opt.onrouted) {
            Jet.router.onrouted(opt.onrouted, this);
        }
        if (opt.onmounted) {
            opt.onmounted.call(this);
        }
        Jet.load.init.call(this, function (list) {
            if (list !== undefined) {
                list._JT_each(function (load) {
                    _initJetEle.call(_this, load, true);
                    // _initJetEle.call(load.__jet||_this,load,true);
                    //Jet.valid.init(load);
                })
            }
        })
    };
    //由于dialog元素在useBind方法中会被append 到body最后面，所以在useBind方法前先对其valid和lang进行初始化
    function _checkHasDialog(ele) {
        ele._JT_findClass(JUI.DIALOG._name)._JT_each(function (dialog) {
            if (!dialog.__hasCheckDialog) {
                Jet.valid.init(dialog);
                Jet.lang.init(dialog);
                dialog.__hasCheckDialog = true;
            }
        })
    }

    // function _initOnDataChange(jet,json){
    //   if(json){
    //     jet.ondatachange=json;
    //     for(var k in json){
    //       if(typeof json[k]==='function'){
    //         Jet.Base.prototype.$regist.call(jet,'.'+k,function(key,value){
    //           json[k].call(jet,value,key)
    //         });
    //       }else{
    //         if(!_isUd(json[k].$func)){
    //           Jet.Base.prototype.$regist.call(jet,'.'+k,function(key,value){
    //             json[k].$func.call(jet,value,key)
    //           });
    //         }
    //       }
    //     }
    //   }
    // }
    function _initOnDataChange(jet, json) {
        var path = '';
        var index = [];
        if (json) {
            _initDcBase(jet, json, path, index, true);
        }
    }
    function _initDcBase(jet, json, path, index, isFirst) {
        if (!_isUd(json.$each)) {//数组
            var arr = (new Function('jet', 'return jet' + path))(jet);
            arr.__oldLength = arr.length;
            _addRegistDc(jet, path, '', function () {//监测数组长度是否变化，如果变化重新绑定ondatachange
                if (arr.__oldLength !== arr.length) {
                    arr.forEach(function (item, i) {
                        var _index = index.slice(0, index.length);
                        _index.push(i);
                        _initDcBase(jet, json.$each, path + '[' + i + ']', _index);
                    });
                }
            }, index);
            if (!_isUd(json.$func)) {
                _addRegistDc(jet, path, '', json.$func, index);
            }
            arr.forEach(function (item, i) {
                var _index = index.slice(0, index.length);
                _index.push(i);
                //var _p=path+((k==='$each')?('['+i+']'):('.'+k+'['+i+']'))
                _initDcBase(jet, json.$each, path + '[' + i + ']', _index);
            });
        } else {
            if (typeof json === 'function') {
                if (isFirst !== true) {
                    _addRegistDc(jet, path, '', json, index);
                }
            }
            if (!_isUd(json.$func)) {
                _addRegistDc(jet, path, '', json.$func, index);
            }
            for (var k in json) {
                if (k !== '$func') {
                    _initDcBase(jet, json[k], path + '.' + k, index);
                }
            }
        }
    }
    function _addRegistDc(jet, path, attr, call, index) {
        Jet.Base.prototype.$regist.call(jet, path + attr, function (key, value) {
            call.call(jet, value, key, index)
        });
    }
    // ondatachange:{
    //   string:{
    //       $func:function(value,key){

    //       }
    //   },
    //   string:function(value,key){

    //   },
    //   json:{
    //       $func:function(value,key){

    //       },
    //       key:function(){
    //           $func:function(value,key){

    //           },
    //       }
    //   },
    //   array:{
    //       $func:function(item,i){

    //       },$each:{
    //           $func:function(item,i){

    //           },
    //           key:function(item,i){
    //               $func:function(item,i){

    //               },
    //           }
    //       }
    //   }
    // }
    function _getInitData(item, attr, _this, isJload) {
        var jet = (isJload === true) ? _this : _findParJet(item);
        var isJet = (typeof jet.$DOM !== 'undefined');
        if (!isJet && jet.type !== _bind) {
            _throw('只可在Jet元素或Bind元素作用于域下动态插入DOM元素初始化，当前插入作用域为' + jet.type);
        }
        var _data = (isJet) ? jet._tools._data : jet._data[jet.name];
        var _j_opt = (attr === undefined) ? _jetOpt(jet, item) : _jetOpt(jet, item, attr, jet._tools._calls[attr]);
        var _opt = (isJet) ? _j_opt : _bindOpt(jet, item, attr, jet._tools._calls[attr]);
        return {
            isRoot: isJet,
            jet: jet,
            data: _data,
            opt: _opt
        }
    }
    function addToJumpList(item, jumpList) {
        [_bind, _if, _show, _on, _run, _attr, _style].forEach(function (name) {
            item._JT_findAttr(name)._JT_each(function (c) {
                c._hasJumped = true;//子元素在本轮遍历中也设置跳过
                jumpList.push(c);
            })
        })
    }
    function _initJetEle(ele, isJload) {
        ele = ele || this._tools._ele;
        if (typeof ele === 'string') {
            ele = _getJdomEle(ele);
        }
        _initJetDom.call(this, ele);
        var _this = this;
        var bindList = ele._JT_findAttr(_bind),
            ifList = ele._JT_findAttr(_if),
            showList = ele._JT_findAttr(_show),
            onList = ele._JT_findAttr(_on),
            runList = ele._JT_findAttr(_run),
            attrList = ele._JT_findAttr(_attr),
            styleList = ele._JT_findAttr(_style);
        var jumpList = [];
        bindList._JT_each(function (item, index) {
            if (!item._hasBind && !item._hasDisabled) {
                //dom.appendChild(item);
                var attr = item._JT_attr(_bind);
                var opt = _getInitData(item, attr, _this, isJload);
                if (opt.data == undefined || attr == '') {
                    var _opt = _jetOpt(_this, item, attr, { _func: [] });
                    item.__isRoot = true;
                    opt._tools._jets.push(new Jet.Bind(_opt));
                } else if (attr in opt.data) {
                    var type = _JT.type(opt.data[attr]);
                    var _jet;
                    switch (type) {
                        case 'json': _jet = new Jet.Bind(opt.opt); break;
                        case 'array': _jet = new Jet.For(opt.opt); break;
                        default: _jet = (_isInput(item)) ? new Jet.Input(opt.opt) : new Jet.Text(opt.opt); break;
                    }
                    if (opt.isRoot)
                        item.__isRoot = true;//为了记录根元素的初始位置，忽略非根元素
                    opt.jet._tools._jets.push(_jet);
                } else {
                    item.__isRoot = true;
                    addToJumpList(item, jumpList);
                }
            }
        });
        jumpList._JT_each(function (item, index) {
            item._hasJumped = undefined;
        })
        ifList._JT_each(function (item) {
            if (!item._hasIf && !item._hasDisabled) {//不需要加root判断 因为本来就是root
                var opt = _getInitData(item, undefined, _this, isJload);
                opt.jet._tools._jetTools.push(new Jet.If(opt.opt));
            }
        });
        showList._JT_each(function (item) {
            if (!item._hasShow && !item._hasDisabled) {
                var opt = _getInitData(item, undefined, _this, isJload);
                opt.jet._tools._jetTools.push(new Jet.Show(opt.opt, true));
            }
        });
        onList._JT_each(function (item) {
            if (!item._hasOn && !item._hasDisabled) {
                var opt = _getInitData(item, undefined, _this, isJload);
                opt.jet._tools._jetTools.push(new Jet.On(opt.opt));
            }
        });
        runList._JT_each(function (item) {
            if (!item._hasRun && !item._hasDisabled) {
                var opt = _getInitData(item, undefined, _this, isJload);
                opt.jet._tools._jetTools.push(new Jet.Run(opt.opt));
            }
        });
        attrList._JT_each(function (item) {
            if (!item._hasAttr && !item._hasDisabled) {
                var opt = _getInitData(item, undefined, _this, isJload);
                opt.jet._tools._jetTools.push(new Jet.Attr(opt.opt));
            }
        });
        styleList._JT_each(function (item) {
            if (!item._hasStyle && !item._hasDisabled) {
                var opt = _getInitData(item, undefined, _this, isJload);
                opt.jet._tools._jetTools.push(new Jet.Style(opt.opt, true));
            }
        });
        var loadList = ele._JT_findAttr(_jload);
        loadList._JT_each(function (item) {
            if (!item._hasLoad && !item._hasDisabled) {
                item._hasLoad = true;
                var opt = _getInitData(item, undefined, _this, isJload);
                item.__loadOpt = opt;
            }
        })
        //init jet ele
        if (typeof JUI !== 'undefined') {
            _checkHasDialog(ele);
            JUI.useBind(this);
            JUI.init(ele);
        }
        Jet.valid.init(ele);
        Jet.lang.init(ele);
        Jet.load.init.call(this, ele);
    }


    function _jetOpt(_this, item, name, calls) {
        return {
            jet: _this,
            par: _this,
            ele: item,
            data: _this,
            _data: _this._tools._data,
            name: name,
            calls: calls || _this._tools._calls
            //indexs:[]
        };
    }
    function _isInput(obj) {
        var tag = obj.tagName;
        return (tag == "INPUT" || tag == "TEXTAREA" || tag == "SELECT" || (obj._JT_hasAttr('contenteditable') && obj._JT_attr('contenteditable') != 'false'))
    }
    Jet.Base = function (opt, type) {
        this.jet = opt.jet;
        this.par = opt.par;
        this.ele = opt.ele;
        this._data = opt._data;
        this.data = opt.data;
        this.type = type;
        this.name = opt.name;
        this.index = opt.index;
        if (type == _for || type == _input || type == _text) {
            type = _bind;
        }
        this._tools = {
            _jets: [],
            _jetTools: [],
            _calls: opt.calls
        }
        this._attrVal = this.ele._JT_attr(type);
        this.ele._JT_removeAttr(type);
        //this.indexs=opt.indexs;
        switch (this.type) {
            case _if: this.ele._hasIf = true; break;
            case _on: this.ele._hasOn = true; break;
            case _run: this.ele._hasRun = true; break;
            case _attr: this.ele._hasAttr = true; break;
            case _style: this.ele._hasStyle = true; break;
            case _show: this.ele._hasShow = true; break;
            default: this.ele._hasBind = true; break;
        }
        if (this.ele._JT_hasAttr(_root)) {
            this.par = this.jet;
            this.data = this.jet;
            //this._tools._calls=this.jet._tools._calls[this.name];
            if (this.name) {
                this._tools._calls = this.jet._tools._calls[this.name];
            } else {
                this._tools._calls = this.jet._tools._calls;
            }
        }
        if (this.type == _bind || this.type == _for || this.type == _text || this.type == _input) {
            this.ele.__jet = this;
        }
    };
    Jet.Base.prototype = _createEmpty();
    Jet.Base.prototype.$parData = function (index) {

        //使用 _parData
        var obj = this.par;
        if (index == undefined || index <= 0) { index = 1 }
        for (var i = 0; i < index - 1; i++) {
            if (obj.$DOM) {//到达最顶层
                return obj;
            }
            obj = obj.par;
        }
        return obj.data;
    }
    Jet.Base.prototype.$makeChange = function (s) {
        var call;
        if (s == undefined) {
            call = this._tools._calls._func
        } else {
            call = (new Function('$', 'return ' + s + '._func'))(this._tools._calls);
        }
        call.forEach(function (f) {
            f();
        });
    };
    Jet.Base.prototype.disable = function () {
        _warn('忽略了一个' + this.type + '元素:', this);
        this.disable = true;
        this.ele._JT_attr(this.type, this._attrVal);
        switch (this.type) {
            case _if: this.ele._hasIf = false; break;
            case _on: this.ele._hasOn = false; break;
            case _run: this.ele._hasRun = false; break;
            case _attr: this.ele._hasAttr = false; break;
            case _style: this.ele._hasStyle = false; break;
            case _show: this.ele._hasShow = false; break;
            default: this.ele._hasBind = false; break;
        }
        if (this.type == _bind) {
            this.par._tools._jets._JT_remove(this)
        } else {
            this.par._tools._jetTools._JT_remove(this)
        }
        this.ele.__jet = undefined;
    }; Jet.Base.prototype.$regist = function (name, call) {
        _registDataCall(_formatRegustArg(name, call, this, arguments.length));
    }; Jet.Base.prototype.setDataIndex = function (i) {
        this.name = i;
    };
    var Super = function () { };
    function _jsonEven(a, b) {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    function _indexOf(p, c) {
        if (typeof c === 'object') {
            for (var i = 0; i < p.length; i++) {
                if (_jsonEven(c, p[i])) {
                    return i;
                }
            }
        }
        return p.indexOf(c);
    }
    Super.prototype = Jet.Base.prototype;
    //********************修改原生数组方法 */
    var __push = ArrProto.push;
    ArrProto.push = function () {
        if (typeof this._data === 'undefined') {
            return __push.apply(this, arguments);
        } else {
            if (arguments.length === 1) {
                this.$push(arguments[0]);
            } else if (arguments.length > 1) {
                this.$pushArray(_argsToArray(arguments));
            }
        }
    }
    var __pop = ArrProto.pop;
    ArrProto.pop = function () {
        if (typeof this._data === 'undefined') {
            return __pop.apply(this);
        } else {
            var a = this._JT_last();
            this.$removeByIndex(this.length - 1);
            return a;
        }
    }
    var __splice = ArrProto.splice;
    ArrProto.splice = function () {
        if (typeof this._data === 'undefined') {
            return __splice.apply(this, arguments);
        } else {
            if (arguments.length === 1) {
                this.$removeByIndex(arguments[0], this.length - 1);
            } else if (arguments.length === 2) {
                this.$removeByIndex(arguments[0], arguments[1]);
            } else if (arguments.length > 2) {
                this.$removeByIndex(arguments[0], arguments[1]);
                this.$insertArray(_argsToArray(arguments, 2), arguments[0]);
            }
        }
    }
    var __shift = ArrProto.shift;
    ArrProto.shift = function () {
        if (typeof this._data === 'undefined') {
            return __shift.apply(this);
        } else {
            var a = this[0];
            this.$removeByIndex(0);
            return a;
        }
    }
    var __unshift = ArrProto.unshift;
    ArrProto.unshift = function () {
        if (typeof this._data === 'undefined') {
            return __unshift.apply(this, arguments);
        } else {
            if (arguments.length === 1) {
                this.$prep(arguments[0]);
            } else if (arguments.length > 1) {
                this.$prepArray(_argsToArray(arguments));
            }
        }
    }
    var __reverse = ArrProto.reverse;
    ArrProto.reverse = function () {
        if (typeof this._data === 'undefined') {
            return __reverse.apply(this);
        } else {
            var d = __reverse.apply(this._data)._JT_clone();
            this.$replace(d);
            return d;
        }
    }

    var __sort = ArrProto.sort;
    ArrProto.sort = function (sortby) {
        if (typeof this._data === 'undefined') {
            return __sort.call(this, sortby);
        } else {
            var d = __sort.call(this._data, sortby)._JT_clone();
            this.$replace(d);
            return d;
        }
    }


    ArrProto.$push = function (d) {
        var _f = this._jet;
        var data, _data, _call, _un = (typeof _f === 'undefined');
        if (_un) {
            data = this;
            _data = this._data;
            _call = this._calls;
        } else {
            data = _f.data[_f.name];
            _data = _f._data[_f.name];
            _call = _f._tools._calls;
        }
        _data.push(d);
        _defineCom(data, data.length, _data, _call);
        if (!_un) _f.refresh.push.call(_f);
    }; ArrProto.$pushArray = function (arr) {
        // var _this=this;
        // arr._JT_each(function(item){
        //   _this.$push(item)
        // });
        this.$insertArray(arr, this.length);
    }; ArrProto.$prep = function (d) {
        var _f = this._jet;
        var data, _data, _call, _un = (typeof _f === 'undefined');
        if (_un) {
            data = this;
            _data = this._data;
            _call = this._calls;
        } else {
            data = _f.data[_f.name];
            _data = _f._data[_f.name];
            _call = _f._tools._calls;
        }
        _data._JT_prepend(d);
        _call._JT_prepend({});
        _defineArray(data, _data, _call);
        if (!_un) _f.refresh.prep.call(_f);
    }; ArrProto.$prepArray = function (arr) {
        this.$insertArray(arr, 0);
    }; ArrProto.$insert = function (d, index) {
        var _f = this._jet;
        var data, _data, _call, _un = (typeof _f === 'undefined');
        if (_un) {
            data = this;
            _data = this._data;
            _call = this._calls;
        } else {
            data = _f.data[_f.name];
            _data = _f._data[_f.name];
            _call = _f._tools._calls;
        }
        _data._JT_insert(d, index);
        _call._JT_insert({}, index);
        _defineArrayFormIndex(data, _data, _call, index);
        if (!_un) _f.refresh.insert.call(_f, index);
    }; ArrProto.$insertArray = function (arr, index) {
        var _f = this._jet;
        var data, _data, _call, _un = (typeof _f === 'undefined');
        if (_un) {
            data = this;
            _data = this._data;
            _call = this._calls;
        } else {
            data = _f.data[_f.name];
            _data = _f._data[_f.name];
            _call = _f._tools._calls;
        }
        _data._JT_insertArray(arr, index);
        var calls = [];
        for (var i = 0; i < arr.length; i++) {
            calls.push({});
        }
        _call._JT_insertArray(calls, index);
        _defineArrayFormIndex(data, _data, _call, index);
        if (!_un) _f.refresh.insertArray.call(_f, arr, index);
    }; ArrProto.$remove = function () {
        for (var i = 0; i < arguments.length; i++) {
            this.$removeByIndex(_indexOf(this, arguments[i]));
        }
    }; ArrProto.$removeByIndex = function (i, n) {
        if (i == -1) {
            return
        }
        if (n == undefined) n = 1
        var _f = this._jet;
        var data, _data, _call, _un = (typeof _f === 'undefined');
        if (_un) {
            data = this;
            _data = this._data;
            _call = this._calls;
        } else {
            data = _f.data[_f.name];
            _data = _f._data[_f.name];
            _call = _f._tools._calls;
        }
        if (_data.length < i + n) {
            if (_data.length < i + 1) {
                _throw('$remove 方法索引超过数组长度');
            } else {
                n = _data.length - i;
                _warn('$remove 方法删除的个数超过数组长度，只删除' + n + '个元素');
            }
        }
        _data.splice(i, n);
        _call.splice(i, n);
        _defineArrayFormIndex(data, _data, _call, i);
        data.length -= n;
        //_defineArrayFormIndex(data,_data,_call,i);
        //data.length-=n;
        if (!_un) _f.refresh.remove.call(_f, i, n);
    }; ArrProto.$clear = function () {
        this.$removeByIndex(0, this.length);
    }; ArrProto.$replace = function (arr) {
        this.$clear();
        this.$pushArray(arr);
        //if(typeof this._jet!=='undefined')this._jet.$makeChange();
    };

    //on 和 run 由自身处理，其余由父jet处理
    function _checkJetTools(opt) {
        var arr = this._tools._jetTools;
        if (this.ele._JT_hasAttr(_on)) {
            if (!this.ele._hasOn) {
                arr.push(new Jet.On(opt));
            }
        }
        if (this.ele._JT_hasAttr(_run)) {
            if (!this.ele._hasRun) {
                arr.push(new Jet.Run(opt));
            }
        }
        // if(this.ele._JT_hasAttr(_if)){
        //   if(!this.ele._hasIf){
        //     arr.push(new Jet.If(opt));
        //   }
        // }
        // if(this.ele._JT_hasAttr(_show)){
        //   if(!this.ele._hasShow){
        //     arr.push(new Jet.Show(opt,true));
        //   }
        // }
        // if(this.ele._JT_hasAttr(_attr)){
        //   if(!this.ele._hasAttr){
        //     arr.push(new Jet.Attr(opt));
        //   }
        // }
        // if(this.ele._JT_hasAttr(_style)){
        //   if(!this.ele._hasStyle){
        //     arr.push(new Jet.Style(opt,true));
        //   }
        // }
    }
    Jet.$ = _JT;
    /*bind*********************************************************************************/
    Jet.Bind = function (opt) {
        Jet.Base.call(this, opt, _bind);
        _initBind.call(this, opt);
    };
    Jet.Bind.prototype = new Super();
    Jet.Bind.prototype.refresh = function (key) {
        //if(!key||key==this.name){
        this._tools._jets._JT_each(function (item) {
            if (item)
                item.refresh(key);
        });
        this._tools._jetTools._JT_each(function (item) {
            if (item)
                item.refresh(key);
        });
        //}
    }; Jet.Bind.prototype.$get = function () {
        return this.data[this.name];
    }; Jet.Bind.prototype.refreshIndex = function (key, i) {
        //if(!key||key==this.name){
        this._tools._jets._JT_each(function (item) {
            if (item.type === _text) {
                item.refreshIndex(i);
            } else if (item.type === _input) {
                item.setIndex(i);
            }
        });
        this._tools._jetTools._JT_each(function (item) {
            if (item._hasIndex) {
                item.refreshIndex(i);
            }
        });
        //}
    };
    function _initBind(opt) {
        var _this = this;
        var _data = opt.data[opt.name];
        var bindList = this.ele._JT_findAttr(_bind);
        var ifList = this.ele._JT_findAttr(_if);
        var showList = this.ele._JT_findAttr(_show);
        var onList = this.ele._JT_findAttr(_on);
        var runList = this.ele._JT_findAttr(_run);
        var attrList = this.ele._JT_findAttr(_attr);
        var styleList = this.ele._JT_findAttr(_style);
        var jumpList = [];
        bindList._JT_each(function (item, index) {
            if (!item._hasBind && !item._hasDisabled && !item._hasJumped) {//item._hasJumped=true 表示由于数据不存在跳过的元素的子元素也被跳过
                var attr = item._JT_attr(_bind);
                var _jet;
                if (attr == _value) {
                    var _opt = _bindOpt(_this, item, _this.name, _this.par._tools._calls[_this.name]);
                    _opt.data = _this.data;
                    _opt._data = _this._data;
                    _jet = (_isInput(item)) ? new Jet.Input(_opt) : new Jet.Text(_opt);
                } else if (attr._JT_has(_index)) {
                    var _opt = _bindOpt(_this, item, attr, _this.par._tools._calls);
                    _opt.index = _this.name;
                    if (_isInput(item)) {
                        //_jet=new Jet.Input(_opt);
                        _throw('input:不允许将index绑定到输入项中');
                    } else {
                        if (attr._JT_has(_index + '(')) {
                            var num = attr.substring(attr.indexOf('(') + 1, attr.indexOf(')'));
                            if (num == '') { num = 1; }
                            _opt._parIndex = parseInt(num);
                        }
                        _jet = new Jet.Text(_opt);
                    }

                    // else if(attr==_index||attr._JT_has("$.$p")){
                    //   var _opt=_bindOpt(_this,item,attr,_this.par._tools._calls);
                    //   _opt.index=_this.name;
                    //   if(_isInput(item)){
                    //     //_jet=new Jet.Input(_opt);
                    //     _throw('input:不允许将index绑定到输入项中');
                    //   }else{
                    //     if(attr._JT_has("$.$p")){
                    //       if(attr._JT_has('(')){
                    //         _opt._parIndex=parseInt(attr.substring(attr.indexOf('(')+1,attr.indexOf(')')));
                    //       }else{
                    //         _opt._parIndex=(attr.split('$p').length-1);//需要修改timeOf
                    //       }
                    //     }
                    //     _jet=new Jet.Text(_opt);
                    //   }
                    // }

                } else {
                    var _opt = (item._JT_hasAttr(_root)) ?
                        _bindRootOpt(_this.jet, item, attr) :
                        _bindOpt(_this, item, attr, _this._tools._calls[attr]);
                    if (typeof _opt._data === 'object' && attr in _opt._data) {
                        var type = _JT.type(_opt._data[attr]);
                        switch (type) {
                            case 'json': _jet = new Jet.Bind(_opt); break;
                            case 'array': _jet = new Jet.For(_opt); break;
                            default: _jet = (_isInput(item)) ? new Jet.Input(_opt) : new Jet.Text(_opt); break;
                        }
                    } else {
                        addToJumpList(item, jumpList);
                        //_throw('原数据没有'+attr+'属性');
                    }
                }
                _this._tools._jets.push(_jet);
            }
        });
        jumpList._JT_each(function (item, index) {
            item._hasJumped = undefined;
        })
        ifList._JT_each(function (item) {
            if (!item._hasIf && !item._hasDisabled) {
                if (item._JT_hasAttr(_root)) {
                    _this._tools._jetTools.push(new Jet.If(_bindRootOpt(_this.jet, item)));
                } else {
                    _this._tools._jetTools.push(new Jet.If(_bindOpt(_this, item)));
                }
            }
        });
        showList._JT_each(function (item) {
            if (!item._hasShow && !item._hasDisabled) {
                if (item._JT_hasAttr(_root)) {
                    _this._tools._jetTools.push(new Jet.Show(_bindRootOpt(_this.jet, item), true));
                } else {
                    _this._tools._jetTools.push(new Jet.Show(_bindOpt(_this, item), true));
                }
            }
        });
        onList._JT_each(function (item) {
            if (!item._hasOn && !item._hasDisabled) {
                if (item._JT_hasAttr(_root)) {
                    _this._tools._jetTools.push(new Jet.On(_bindRootOpt(_this.jet, item)));
                } else {
                    _this._tools._jetTools.push(new Jet.On(_bindOpt(_this, item)));
                }
            }
        });
        runList._JT_each(function (item) {
            if (!item._hasRun && !item._hasDisabled) {
                if (item._JT_hasAttr(_root)) {
                    _this._tools._jetTools.push(new Jet.Run(_bindRootOpt(_this.jet, item)));
                } else {
                    _this._tools._jetTools.push(new Jet.Run(_bindOpt(_this, item)));
                }
            }
        });

        attrList._JT_each(function (item) {
            if (!item._hasAttr && !item._hasDisabled) {
                if (item._JT_hasAttr(_root)) {
                    _this._tools._jetTools.push(new Jet.Attr(_bindRootOpt(_this.jet, item)));
                } else {
                    _this._tools._jetTools.push(new Jet.Attr(_bindOpt(_this, item)));
                }
            }
        });
        styleList._JT_each(function (item) {
            if (!item._hasStyle && !item._hasDisabled) {
                if (item._JT_hasAttr(_root)) {
                    _this._tools._jetTools.push(new Jet.Style(_bindRootOpt(_this.jet, item), true));
                } else {
                    _this._tools._jetTools.push(new Jet.Style(_bindOpt(_this, item), true));
                }
            }
        });
        var loadList = this.ele._JT_findAttr(_jload);
        loadList._JT_each(function (item) {
            if (!item._hasLoad && !item._hasDisabled) {
                item._hasLoad = true;
                var opt;
                if (item._JT_hasAttr(_root)) {
                    opt = _bindRootOpt(_this.jet, item);
                } else {
                    opt = _bindOpt(_this, item);
                }
                item.__loadOpt = opt;
            }
        })
        _checkJetTools.call(this, opt);

        this.$regist(function (key, val) {
            _this.refresh();
        });
    };

    function _bindOpt(_this, item, name, _calls) {
        return {
            jet: _this.jet,
            par: _this,
            ele: item,
            data: _this.data[_this.name],
            _data: (_this._data == undefined) ? null : _this._data[_this.name],
            name: name,
            calls: _calls || _this._tools._calls
            //indexs:_this.indexs
        }
    }
    function _bindRootOpt(jet, item, name) {
        return {
            jet: jet,
            par: jet,
            ele: item,
            data: jet,
            _data: jet._tools._data,
            name: name,
            calls: jet._tools._calls
        }
    }
    /*for*********************************************************************************/
    function _checkForSelectOption(obj) {
        if (this.__addSelectOption !== undefined) {
            this.__addSelectOption(obj);
        }
    }
    Jet.For = function (opt) {
        Jet.Base.call(this, opt, _for);
        _initFor.call(this, opt);
    };
    Jet.For.prototype = new Super();
    Jet.For.prototype.refresh = function (key) {
        // if(!key||key==this.name){
        //   this._tools._jets._JT_each(function(item){
        //     item.refresh(key);
        //   });
        //   this._tools._jetTools._JT_each(function(item){
        //     item.refresh(key);
        //   });
        // }
    }; Jet.For.prototype.refreshIndex = function (s) {
        for (var i = s || 0; i < this._tools._jets.length; i++) {
            this._tools._jets[i].refreshIndex(null, i);
        }
        this.$makeChange();
    }; Jet.For.prototype.$get = function () {
        return this.data[this.name];
    };
    // Jet.For.prototype.refreshParIndex=function(){
    //   this._tools._jets._JT_each(function(item){
    //     item._tools._jets._JT_each(function(_item){
    //       if(_item._parIndex&&_item.type==_text){
    //         _item.refresh();
    //       }else if(_item.type==_for){
    //         _item.refreshParIndex();
    //       }
    //     });
    //   });
    // };
    Jet.For.prototype.refresh.push = function () {
        if (this._switch) {
            var _t = this._data[this.name]._JT_last()[this._type];
            if (_t in this._html) {
                this.ele._JT_append(this._html[_t]);
            } else {
                _throw('swicth:指定属性的值不在swicth枚举内');
            }
        } else {
            this.ele._JT_append(this._html);
        }
        var item = this.ele._JT_child()._JT_last(),
            i = this.data[this.name].length - 1;
        var _opt = _forOpt(this, item, i);
        if (_JT.type(_opt.data[0]) == 'array') {
            this._tools._jets.push(new Jet.For(_opt));
        } else {
            this._tools._jets.push(new Jet.Bind(_opt));
        }
        _initOneForBindTool(this, item, i);
        _checkForSelectOption.call(this, item);
        _checkForJUI.call(this);
        this.$makeChange();
    }; Jet.For.prototype.refresh.prep = function () {
        if (this._switch) {
            var _t = this._data[this.name]._JT_first()[this._type];
            if (_t in this._html) {
                this.ele._JT_prepend(this._html[_t]);
            } else {
                _throw('swicth:指定属性的值不在swicth枚举内');
            }
        } else {
            this.ele._JT_prepend(this._html);
        }
        var item = this.ele._JT_child(0);
        var _opt = _forOpt(this, item, 0);
        if (_JT.type(_opt.data[0]) == 'array') {
            this._tools._jets._JT_prepend(new Jet.For(_opt));
        } else {
            this._tools._jets._JT_prepend(new Jet.Bind(_opt));
        }
        this.refreshIndex(1);
        //_refreshIndex.call(this,1);
        _initOneForBindTool(this, item, 0);
        _checkForSelectOption.call(this, item);
        _checkForJUI.call(this);
    };
    Jet.For.prototype.refresh.insert = function (index) {
        if (this._switch) {
            var _t = this._data[this.name][index][this._type];
            if (_t in this._html) {
                this.ele._JT_append(this._html[_t], index);
            } else {
                _throw('swicth:指定属性的值不在swicth枚举内');
                return;
            }
        } else {
            this.ele._JT_append(this._html, index);
        }
        var item = this.ele._JT_child(index);
        var _opt = _forOpt(this, item, index);
        if (_JT.type(_opt.data[0]) == 'array') {
            this._tools._jets._JT_insert(new Jet.For(_opt), index);
        } else {
            this._tools._jets._JT_insert(new Jet.Bind(_opt), index);
        }
        this.refreshIndex(index);
        //_refreshIndex.call(this,index+1);
        _initOneForBindTool(this, item, index);
        _checkForSelectOption.call(this, item);
        _checkForJUI.call(this);
    };
    Jet.For.prototype.refresh.insertArray = function (arr, index) {//bug
        var _this = this;
        var type = _JT.type(arr[0]);
        arr._JT_each(function (item, i) {
            var _i = index + i;
            if (_this._switch) {
                var _t = _this._data[_this.name][_i][_this._type];
                if (_t in _this._html) {
                    _this.ele._JT_append(_this._html[_t], _i);
                } else {
                    _throw('swicth:指定属性的值不在swicth枚举内');
                }
            } else {
                _this.ele._JT_append(_this._html, _i);
            }
            var _o = _this.ele._JT_child(_i);
            var _opt = _forOpt(_this, _o, _i);
            if (type == 'array') {
                _this._tools._jets._JT_insert(new Jet.For(_opt), _i);
            } else {
                _this._tools._jets._JT_insert(new Jet.Bind(_opt), _i);
            }
            _initOneForBindTool(_this, _o, _i);
            _checkForSelectOption.call(_this, _o);
        });
        this.refreshIndex(index + arr.length);
        _checkForJUI.call(this);
        //_refreshIndex.call(this,index+arr.length);
    };
    Jet.For.prototype.refresh.remove = function (index, n) {
        for (var i = 0; i < n; i++) {
            var _o = this.ele._JT_child(index);
            _checkForSelectOption.call(this, _o, true);
            _o._JT_remove();
        }
        this._tools._jets.splice(index, n);

        this.refreshIndex(index);
        //_refreshIndex.call(this,index);
    };
    function _checkForJUI() {
        if ('undefined' !== typeof JUI) {
            _checkHasDialog(this.ele);
            JUI.useBind(this.jet);
            JUI.init(this.ele, true);
        }
    }
    // function _refreshIndex(start){
    //   for(var i=start;i<this._tools._jets.length;i++){
    //     this._tools._jets[i]._tools._jets._JT_each(function(item){
    //       if(item.name==_index){
    //         item.setIndex(i);
    //       }else if(typeof item.name==='number'){
    //         item.setDataIndex(i);
    //       }else if(item.type==_for){
    //         item.refreshParIndex();
    //       }
    //     });
    //     this._tools._jets[i]._tools._jetTools._JT_each(function(item){
    //       if(typeof item.name==='number'){
    //         item.setDataIndex(i);
    //       }
    //     });
    //   }
    //   this.$makeChange();
    // }
    function _initForRule(ele) {
        if (this.ele._JT_child(0) != undefined && this.ele._JT_child(0)._JT_hasAttr(_bind) && this.ele._JT_child(0)._JT_attr(_bind)._JT_has('=')) {//switch模式  $each.t=1
            this._switch = true;
            this._html = {};
            this._type = null;
            var _this = this;
            var temp = {};
            this.ele._JT_child()._JT_each(function (item) {
                var val = item._JT_attr(_bind);
                if (_this._type == null) _this._type = val.substring(val.indexOf('.') + 1, val.indexOf('='))
                if (!val._JT_has('=')) _throw('swicth:html格式有误');
                val = val.substring(val.indexOf('=') + 1);
                _this._html[val] = item._JT_allHtml();
                temp[val] = _JT.ct('div')._JT_append(item);
            });
            for (var i = 0; i < this.data[this.name].length; i++) {
                var t = this.data[this.name][i][this._type];
                if (t in this._html) {
                    if (t in temp) {
                        this.ele._JT_append(temp[t]._JT_child(0));
                        delete temp[t];
                    } else {
                        this.ele._JT_append(this._html[t]);
                    }
                } else {
                    _throw('swicth:指定属性的值不在swicth枚举内');
                }
            }
        } else {//普通模式
            if (!this.ele._JT_findAttr(_bind + '="' + _each + '"')._JT_exist()) {//没有$each
                var html = this.ele._JT_html();
                var _tag = 'div';
                if (this.ele._JT_hasAttr('jfor-inline')) {
                    _tag = 'span';
                    this.ele._JT_removeAttr('jfor-inline')
                }
                this._html = '<' + _tag + ' ' + _bind + '="' + _each + '">' + html + '</' + _tag + '>';
                for (var i = 0; i < this.data[this.name].length; i++) {
                    var each = _JT.ct(_tag)._JT_attr(_bind, _each);
                    if (i == 0) {
                        this.ele.childNodes._JT_each(function (item) {
                            each._JT_append(item);
                        });
                    } else {
                        each._JT_html(html);
                    }
                    this.ele._JT_append(each);
                }
            } else if (this.ele._JT_child().length != 1 || this.ele._JT_child(0)._JT_attr(_bind) != _each) {//不止一个元素，或者第一个元素不是each
                _throw('循环元素绑定格式错误！');
            } else {//有each且只有一个元素
                var html = this.ele._JT_html();
                this._html = html;
                for (var i = 0; i < this.data[this.name].length - 1; i++) {
                    this.ele._JT_append(html);
                }
            }
        }
        if (this.data[this.name].length == 0) {
            var _this = this;
            [_bind, _if, _show, _attr, _style, _run, _on, _jload].forEach(function (name) {
                _this.ele._JT_findAttr(name)._JT_each(function (item) {
                    item._hasDisabled = true;
                })
            });
            this.ele._JT_empty();
        }
    }
    function _initFor(opt) {
        var _this = this;
        this.data[this.name]._jet = this;
        _initForRule.call(this);
        this.ele._JT_child()._JT_each(function (item, i) {
            if (!item._hasBind) {
                var _opt = _forOpt(_this, item, i);
                // _opt.data[_opt.name].$par=_this.data;
                // _opt.data[_opt.name].$index=i;
                var _jet;
                if (_JT.type(_opt.data[0]) == 'array') {
                    _jet = new Jet.For(_opt);
                } else {
                    _jet = new Jet.Bind(_opt);
                }
                _this._tools._jets.push(_jet);
                _initOneForBindTool(_this, item, i);
            }
        });
        _checkJetTools.call(this, opt);
        this.$regist(function (key, val) {
            _this.refresh();
        });
    };
    function _forOpt(_this, item, index) {
        return {
            jet: _this.jet,
            par: _this,
            ele: item,
            data: _this.data[_this.name],
            _data: _this._data[_this.name],
            name: index,
            calls: _this._tools._calls[index]
            //indexs:_JT._JT_clone(_this.indexs)._JT_append(index)
        }
    }
    function _initOneForBindTool(_this, item, i) {
        var forOpt = (item._JT_hasAttr(_root)) ? _forRootOpt(_this.jet, item, i) : _forOpt(_this, item, i);
        var tools = _this._tools._jets[i]._tools._jetTools;
        if (item._JT_hasAttr(_if) && !item._hasIf) {
            tools.push(new Jet.If(forOpt));
        }
        if (item._JT_hasAttr(_show) && !item._hasShow) {
            tools.push(new Jet.Show(forOpt, true));
        }
        if (item._JT_hasAttr(_on) && !item._hasOn) {
            tools.push(new Jet.On(forOpt));
        }
        if (item._JT_hasAttr(_run) && !item._hasRun) {
            tools.push(new Jet.Run(forOpt));
        }
        if (item._JT_hasAttr(_attr) && !item._hasAttr) {
            tools.push(new Jet.Attr(forOpt));
        }
        if (item._JT_hasAttr(_style) && !item._hasStyle) {
            tools.push(new Jet.Style(forOpt, true));
        }
    }
    function _forRootOpt(_this, item, index) {
        return {
            jet: jet,
            par: jet,
            ele: item,
            data: jet,
            _data: jet._tools._data,
            name: index,
            calls: jet._tools._calls
        }
    }
    /*repeat*********************************************************************************/
    Jet.Repeat = function () {

    }

    /*text*********************************************************************************/

    Jet.Text = function (opt) {
        Jet.Base.call(this, opt, _text);
        this.isHtml = opt.ele._JT_hasAttr(_html);
        this._parIndex = opt._parIndex;//多层循环中的第几层父元素
        opt.par = this;
        _initText.call(this, opt);
    };
    Jet.Text.prototype = new Super();
    Jet.Text.prototype.refresh = function (key) {
        if (!key || key == this.name) {
            var d = this.$get();
            if (!_isUd(d)) {
                var val = (this.func) ? this.func.call(this.jet, d, {
                    data: d,
                    ele: this.ele,
                    jet: this,
                    root: this.jet
                }) : d;
                if (this.isHtml) {
                    this.ele._JT_html(val);
                } else {
                    this.ele._JT_txt(val);
                }
            }
        }
    }; Jet.Text.prototype.refreshIndex = function (i) {
        if (this._attrVal._JT_has(_index)) {
            if (i !== undefined) {
                this.index = i;
            } else {
                this.index = this.par._data.indexOf(this._data);
            }
            this.refresh();
        }
    }; Jet.Text.prototype.$get = function () {//indexs
        if (this._parIndex) {
            return __index.call(this, this._parIndex)
            //return this.indexs[this.indexs.length-1-this._parIndex];
        } else {
            if (this.index != undefined) {
                return this.index;
            } else {
                return this.data[this.name];
            }
        }
    }; Jet.Text.prototype.setIndex = function (i) {//indexs
        this.index = i;
        this.refresh();
        this._tools._jetTools._JT_each(function (item) {
            if (item.name == _index) {
                item.refresh(i);
            }
        });
    }; Jet.Text.prototype.setDataIndex = function (i) {//indexs
        this.name = i;
        // this.refresh();
        // this._tools._jetTools._JT_each(function(item){
        //   if(item.name==_index){
        //     item.refresh(i);
        //   }
        // });
    };
    function _initText(opt) {
        _checkLangJet.call(this, opt);
        var _this = this;
        if (this.ele._JT_txt().trim() != '') {
            this.func = new Function("$", 'opt', 'return ' + this.ele._JT_txt().trim());
        }
        this.$regist(function (key, val) {
            _this.refresh();
        });
        this.refresh();
        _checkJetTools.call(this, opt);
    }
    /*input*********************************************************************************/

    Jet.Input = function (opt) {
        Jet.Base.call(this, opt, _input);
        opt.par = this;
        _initInput.call(this, opt);
    };
    Jet.Input.prototype = new Super();
    Jet.Input.prototype.refresh = function (key) {
        if (!key || key == this.name) {
            var d = this.$get();
            if (!_isUd(d)) {
                var val = (this.func) ? this.func.call(this.jet, d) : d;
                if (this.isContent) {
                    if (val !== ((this.isNum) ? parseFloat(this.ele.innerHTML) : this.ele.innerHTML))
                        this.ele._JT_html(val);
                } else {
                    if (val !== ((this.isNum) ? parseFloat(this.ele.value) : this.ele.value))
                        this.ele._JT_val(val);
                }
            }
        }
    }; Jet.Input.prototype.$get = function () {
        return this.data[this.name];
    }; Jet.Input.prototype.setIndex = function (i) {
        if (_JT.type(this.data) === 'array' && typeof this.name === 'number' && i !== undefined) {
            this.name = i;
        }
    }
    function _initInput(opt) {
        _checkLangJet.call(this, opt);
        var _this = this;
        if (this.ele._JT_attr('j-type') === 'number' || this.ele._JT_attr('type') === 'number') {
            _this.forceNum = true;
        }
        if (this.ele._JT_hasAttr('contenteditable')) {
            this.isContent = true;
            if (this.ele._JT_txt().trim() != '')
                this.func = new Function("$", 'return ' + this.ele._JT_txt());
        } else if (this.ele.tagName != 'SELECT' && this.ele._JT_val().trim() != '') {
            this.func = new Function("$", 'return ' + this.ele._JT_val());
        }
        if (this.ele._attrVal == _index) {
            _throw('输入框不能绑定数组的索引');
        }
        this.$regist(function (key, val) {
            _this.refresh();
        });
        this.isNum = (_JT.type(this.$get()) == 'number');
        var iname = this.ele.tagName;
        var itype = this.ele._JT_attr('type');
        if (itype !== null) itype = itype.toLowerCase();
        if (iname == 'SELECT' || (iname == 'INPUT' && itype != 'text' && itype != 'password' && itype != 'number' && itype != null)) {
            this.ele._JT_on("change", function () {
                _dealOnInputOn.call(this, _this);
            }, true);
        } else {
            this.inputLock = false;
            this.ele.addEventListener('compositionstart', function () {
                _this.inputLock = true;
            })
            this.ele.addEventListener('compositionend', function () {
                _this.inputLock = false;
                _dealOnInputOn.call(_this.ele, _this);
            })
            this.ele._JT_on("input", function () {
                if (!_this.inputLock) {
                    _dealOnInputOn.call(this, _this);
                }
            }, true);
        }
        this.refresh();
        _checkJetTools.call(this, opt);
    }
    function _dealOnInputOn(_this) {
        var val = (_this.isContent) ? this._JT_html() : this._JT_val();
        if (_this.forceNum) {
            val = parseFloat(val);
            if (val.toString() === 'NaN') {
                val = '';
            }
        } else {
            if (_this.isNum) {
                var _v = parseFloat(val);
                if (val == _v.toString()) {
                    _this.isNum = true;
                    val = _v;
                } else {
                    _this.isNum = false;
                }
            }
        }
        _this.data[_this.name] = val;
    }
    /*if*********************************************************************************/
    // Jif="exp:class[a,b|b];attr[a=b,a=b|a];text[a|b];html[a|b];css[a=a,a=a|b=b];func"
    Jet.If = function (opt, isShow) {
        this.exp = null;
        this.func_true = null;
        this.func_false = null;
        Jet.Base.call(this, opt, (isShow) ? _show : _if);
        _initIf.call(this);
        var __jet = this.ele.__jet;
        if (typeof __jet !== 'undefined' && (__jet.type == _text || __jet.type == _input)) {
            this.needParData = true;
        }
    };
    Jet.If.prototype = new Super();
    Jet.If.prototype.$get = function () {
        if (this.name == _index) {
            if (this.needParData) {
                //会refresh 不需要修改
            }
            return this.index;
        } else if (this.name == _value || this.name == undefined) {
            if (this.needParData) {
                if (this.par.$DOM) {
                    return this.par;
                } else {
                    return this.par.data[this.par.name];
                }
            } else {
                return this.data;
            }
        } else {
            return this.data[this.name];
        }
    }; Jet.If.prototype.refresh = function (i) {
        // if(this.ele.attr('id')=='queryResult'){
        // }
        if (this.index != undefined && i != undefined && this.index != i) {
            this.index == i;
        }
        var d = this.$get();
        if (!_isUd(d)) {
            var opt = {
                ele: this.ele,
                data: d,
                jet: this,
                root: this.jet
            }
            //if(this.exp.call(opt,d)===true){ //弃用原因 不好做数据改变的检测
            // if(this.exp.toString()._JT_has('"a"'))
            // console.loconsole.log(this.exp)
            if (_callFuncForJetTools.call(this, this.exp, d) === true) {
                this.func_true.call(this.jet, opt);
            } else {
                this.func_false.call(this.jet, opt);
            }
        }
    }; Jet.If.prototype.refreshIndex = function (i) {
        if (this._hasIndex) {
            this.refresh();
        }
    };

    function _formatBindStr(s) {
        return s._JT_replaceAll([
            ["\\$.\\$par", "_par"],
            ["\\$index\\(", "_index\("],
            ["\\$index", "_index\(\)"],
            ["\\$", "d"],
            ["{{", ''],
            ["}}", '']
        ])
    }
    function _makeFuncForJetTools(str) {
        return new Function("d", "dr", "_par", "_index", "return (" + str + ")");
    }
    function _callFuncForJetTools(func, d) {
        return func(d, this.jet, __par.bind(this), __index.bind(this));
    }
    function _initParData() {
        if (this._attrVal._JT_has('$.$par')) {
            var m = this._attrVal.match(_reg);
            this._parData = [this.data];
            var par = this;
            while (!par.par.$DOM) {
                par = par.par;
                this._parData.push(par.data);
            }
        }
    }
    function _initIf() {
        var _this = this;
        var ifAttr = this._attrVal;
        _initParData.call(this);
        if (this.type == _show) {
            _registForWrapperVar(ifAttr, this);
            this.func_true = function () {
                _this.ele.style.display = ''
            };
            this.func_false = function () {
                _this.ele.style.display = 'none'
            };
            if (!(ifAttr in this._data)) {

                // if(ifAttr._JT_has(_each)){
                //   ifAttr=ifAttr._JT_replaceAll("\\"+_each,"d."+this.ele.__jet.par.name+"["+this.ele.__jet.name+"]")._JT_replaceAll("{{",'')._JT_replaceAll("}}",'');
                // }else{
                ifAttr = _formatBindStr(ifAttr)
                //}
            } else {
                ifAttr = 'd.' + ifAttr;
            }
            this.exp = _makeFuncForJetTools(ifAttr);
        } else {
            var temp = ifAttr.substring(0, ifAttr.indexOf(":"));
            _registForWrapperVar(temp, this);
            if (typeof this._data !== 'object') {
                temp = _formatBindStr(temp);
            } else {
                if (!(temp in this._data)) {
                    temp = _formatBindStr(temp);
                } else {
                    temp = 'd.' + temp;
                }
            }
            this.exp = _makeFuncForJetTools(temp);
            ifAttr = ifAttr.substring(ifAttr.indexOf(":") + 1);
            var func_t = "";
            var func_f = "";
            ifAttr.split(";")._JT_each(function (item) {//
                if (item._JT_has("class[")) {
                    var cls = item.substring(item.indexOf("[") + 1, item.length - 1);
                    if (cls._JT_has("|")) {
                        var c1 = cls.split("|")[0].split(",").join(" ");
                        var c2 = cls.split("|")[1].split(",").join(" ");
                        func_t += "opt.ele._JT_removeClass('" + c2 + "')._JT_addClass('" + c1 + "');";
                        func_f += "opt.ele._JT_removeClass('" + c1 + "')._JT_addClass('" + c2 + "');";
                    } else {
                        cls = cls.split(",").join(" ");
                        func_t += "opt.ele._JT_addClass('" + cls + "');";
                        func_f += "opt.ele._JT_removeClass('" + cls + "');";
                    }
                } else if (item._JT_has("attr[")) {
                    var attr = item.substring(item.indexOf("[") + 1, item.length - 1);
                    if (attr._JT_has("|")) {
                        var trueList = attr.split("|")[0].split(",");
                        var trueAttrs = [];
                        trueList._JT_each(function (a) {
                            trueAttrs.push(a.split('=')[0])
                        })
                        var falseList = attr.split("|")[1].split(",");
                        var falseAttrs = [];
                        falseList._JT_each(function (a) {
                            falseAttrs.push(a.split('=')[0])
                        })
                        trueList._JT_each(function (a) {
                            var pv = a.split("=");
                            if (pv.length == 1) {
                                pv[1] = "";
                            }
                            func_t += "opt.ele._JT_attr('" + pv[0] + "','" + pv[1] + "');";
                            if (falseAttrs.indexOf(pv[0]) == -1) {
                                func_f += "opt.ele._JT_removeAttr('" + pv[0] + "');";
                            }
                        });
                        falseList._JT_each(function (a) {
                            var pv = a.split("=");
                            if (pv.length == 1) {
                                pv[1] = "";
                            }
                            func_f += "opt.ele._JT_attr('" + pv[0] + "','" + pv[1] + "');";
                            if (trueAttrs.indexOf(pv[0]) == -1) {
                                func_t += "opt.ele._JT_removeAttr('" + pv[0] + "');";
                            }
                        })
                    } else {
                        attr.split(",")._JT_each(function (a) {
                            var pv = a.split("=");
                            if (pv.length == 1) {
                                pv[1] = "";
                            }
                            func_t += "opt.ele._JT_attr('" + pv[0] + "','" + pv[1] + "');";
                            func_f += "opt.ele._JT_removeAttr('" + pv[0] + "');";
                        });
                    }
                } else if (item._JT_has("text[")) {
                    var text = item.substring(item.indexOf("[") + 1, item.length - 1);
                    if (text._JT_has("|")) {
                        func_t += "opt.ele._JT_txt('" + text.split("|")[0] + "');";
                        func_f += "opt.ele._JT_txt('" + text.split("|")[1] + "');";
                    } else {
                        func_t += "opt.ele._JT_txt('" + text + "');";
                        func_f += "opt.ele._JT_txt('');";
                    }
                } else if (item._JT_has("html[")) {
                    var html = item.substring(item.indexOf("[") + 1, item.length - 1);
                    if (html._JT_has("|")) {
                        func_t += "opt.ele._JT_html('" + html.split("|")[0] + "');";
                        func_f += "opt.ele._JT_html('" + html.split("|")[1] + "');";
                    } else {
                        func_t += "opt.ele._JT_html('" + html + "');";
                        func_f += "opt.ele._JT_html('');";
                    }
                } else if (item._JT_has("css[")) {
                    var attr = item.substring(item.indexOf("[") + 1, item.length - 1);
                    if (attr._JT_has("|")) {
                        func_t += "opt.ele._JT_removeAttr('style');";
                        attr.split("|")[0].split(",")._JT_each(function (a) {
                            var pv = a.split("=");
                            if (pv.length == 1) {
                                pv[1] = "";
                            }
                            func_t += "opt.ele._JT_css('" + pv[0] + "','" + pv[1] + "');";
                        });
                        func_f += "opt.ele._JT_removeAttr('style');";
                        attr.split("|")[1].split(",")._JT_each(function (a) {
                            var pv = a.split("=");
                            if (pv.length == 1) {
                                pv[1] = "";
                            }
                            func_f += "opt.ele._JT_css('" + pv[0] + "','" + pv[1] + "');";
                        })
                    } else {
                        func_t += "opt.ele._JT_removeAttr('style');";
                        attr.split(",")._JT_each(function (a) {
                            var pv = a.split("=");
                            if (pv.length == 1) {
                                pv[1] = "";
                            }
                            func_t += "opt.ele._JT_css('" + pv[0] + "','" + pv[1] + "');";
                        });
                        func_f += "opt.ele._JT_removeAttr('style');";
                    }
                } else {
                    if (item._JT_has("|")) {
                        item = item.split("|");
                        if (item[0] in _this.jet) {
                            func_t += "this." + item[0] + ".call(this,opt);";
                        } else {
                            func_t += item[0];
                        }
                        if (item[1] in _this.jet) {
                            func_f += "this." + item[1] + ".call(this,opt);";
                        } else {
                            func_f += item[1];
                        }
                    } else {
                        if (item in _this.jet) {
                            func_t += "this." + item + ".call(this,opt);";
                        } else {
                            func_t += item;
                        }
                    }
                }
            });
            this.func_true = new Function("opt", func_t);
            this.func_false = new Function("opt", func_f);
        }
        this.refresh();
    }

    function _registForWrapperVar(content, _this) {
        var m = content.match(_reg);
        var _hasIndex = false;
        if (m == null) {
            if (!(content in _this._data) && !content._JT_has("$.")) {
                //_throw(_this.type+':['+content+']若值是表达式，请使用{{}}将表达式里的变量包裹起来');
            }
            _this.$regist(content, function (key, val) {
                _this.refresh();
            });
        } else {
            var arr = [];
            m.forEach(function (_ele) {
                if (arr.indexOf(_ele) == -1) {
                    arr.push(_ele);
                    if (_ele == "{{$}}") {
                        _this.$regist(function (key, val) {
                            _this.refresh();
                        });
                    } else {
                        var obj = _this, jump = false;//$.
                        if (_ele._JT_has('$r.')) {
                            obj = _this.jet;
                        } else if (_ele._JT_has('.$par(')) {//$.$par()
                            var num = _ele.substring(_ele.indexOf('.$par(') + 6, _ele.indexOf(')'))
                            num = (num === '') ? 1 : parseInt(num);
                            obj = _findRegistPar(obj, num);
                            // for(var i=0;i<num;i++){
                            //   obj=obj.par;
                            //   if(obj.$DOM){//到达最顶层
                            //     break;
                            //   }
                            // }
                            _ele = '{{$' + _ele.substring(_ele.indexOf(')') + 1)
                        } else if (_ele._JT_has(_index)) {//索引的话就跳过
                            _this._hasIndex = true;
                            _hasIndex = true;
                            jump = true;
                        }
                        if (!jump) {
                            if (_ele == "{{$}}") {
                                _this.$regist(function (key, val) {
                                    _this.refresh();
                                });
                            } else {
                                obj.$regist(_ele.substring(2, _ele.length - 2), function (key, val) {
                                    _this.refresh();
                                })
                            }
                        }
                    }
                }
            });
        }
        return _hasIndex;
    }
    function _findRegistPar(obj, num) {
        if (num > obj._parData.length - 1) {
            return obj.jet;
        }
        var d = obj._parData[num];
        var p = obj.par;
        while (p.$get() !== d && !p.$DOM) {//找到父元素 或 到达最顶层
            p = p.par;
        }
        return p;
    }
    /*on*********************************************************************************/
    Jet.On = function (opt) {
        Jet.Base.call(this, opt, _on);
        _initOn.call(this);
        var __jet = this.ele.__jet;
        if (typeof __jet !== 'undefined' && (__jet.type == _text || __jet.type == _input)) {
            this.needParData = true;
        } else if (typeof this.data !== 'object') {
            this.needParData = true;
        }

    };
    Jet.On.prototype = new Super();
    Jet.On.prototype.$get = function () {
        if (this.index != undefined) {
            return this.index;
        }
        if (this.data == undefined) {
            return null;
        } else if (this.name == undefined || this.name == _value) {
            if (this.needParData) {
                if (this.par.$DOM) {
                    return this.par;
                } else {
                    return this.par.data[this.par.name];
                }
            } else {
                return this.data;
            }
        } else {
            return this.data[this.name];
        }
    }; Jet.On.prototype.refresh = function (i) {
        if (this.index != undefined && i != undefined && this.index != i) {
            this.index = i;
        }
    };
    function _initOn() {
        var _this = this;
        this._attrVal.split(';;')._JT_each(function (attr) {

            if (!attr._JT_has(":")) {
                //_throw('jon 属性格式错误:'+attr);
                attr = 'click:' + attr;
            }
            var e0 = attr.substring(0, attr.indexOf(':'));
            var e1 = attr.substring(attr.indexOf(':') + 1);
            var _f = '';
            var _valid_false = null, _vf_func = [];
            var valid = false, validPar;
            var func = [];
            if (e1._JT_has('$valid')) {
                if (e1._JT_has('=>')) {
                    valid = true;
                    validPar = Jet.valid.findValidPar(_this.ele);
                    _f = e1.substring(e1.indexOf('=>') + 2).trim();
                    if (_f._JT_has('|')) {
                        var a = _f.split('|');
                        _f = a[0];
                        _valid_false = a[1];
                    }
                    //_this.func=_this.jet[e1.substring(e1.indexOf('=>')+2)];
                } else {
                    _throw('valid:"' + e1 + '" 格式有误，操作符为 =>')
                }
            } else {
                _f = e1;
                //_this.func=_this.jet[e1];
            }
            var _s_f = _f.substring(0, _f.indexOf(','));
            var _p = _this.jet.$props;
            if (_f in _this.jet || _s_f in _this.jet || (_p && (_f in _p || _s_f in _p))) {
                _f.split(',').forEach(function (f) {
                    if (typeof _this.jet[f] != 'function' && _p && typeof _p[f] != 'function')
                        _throw(f + ' 不是一个方法');
                    else {
                        if (_this.jet[f]) {
                            func.push(_this.jet[f]);
                        } else {
                            func.push(_p[f]);
                        }
                    }
                });
            } else {
                func = [new Function('opt', _f)];
            }
            if (valid && _valid_false != null) {
                var _s_vf = _valid_false.substring(0, _valid_false.indexOf(','));
                if (_valid_false in _this.jet || _s_vf in _this.jet || (_p && (_valid_false in _p || _s_vf in _p))) {
                    _valid_false.split(',').forEach(function (f) {
                        if (typeof _this.jet[f] != 'function')
                            _throw(f + ' 不是一个方法');
                        else {
                            if (_this.jet[f]) {
                                _vf_func.push(_this.jet[f]);
                            } else {
                                _vf_func.push(_p[f]);
                            }
                        }
                    });
                } else {
                    _vf_func = [new Function('opt', _valid_false)];
                }
            }

            _this.ele._JT_on(e0, function (event) {
                var opt = {
                    ele: this,
                    data: _this.$get(),
                    event: event,
                    jet: _this
                };
                if (valid) {
                    validPar._JT_validate(function () {
                        func.forEach(function (f) {
                            _callCheckChild(f, _this, opt)
                        });
                    }, function () {
                        _vf_func.forEach(function (f) {
                            _callCheckChild(f, _this, opt)
                        });
                    });
                } else {
                    func.forEach(function (f) {
                        _callCheckChild(f, _this, opt)
                    });
                }
            });
        });

    }
    function _callCheckChild(f, _this, opt) {
        if (f.__props_child) {
            opt.child = _this.jet;
            f.call(_this.jet, opt);
            delete opt.child;
        } else {
            f.call(_this.jet, opt);
        }
    }

    /*run*********************************************************************************/
    Jet.Run = function (opt) {
        Jet.Base.call(this, opt, _run);
        _initRun.call(this, opt);
    };
    Jet.Run.prototype = new Super();
    Jet.Run.prototype.$get = function () {
        if (this.index != undefined) {
            return this.index;
        }
        if (this.data == undefined) {
            return null;
        } else if (this.name == undefined) {
            return this.data
        } else {
            return this.data[this.name];
        }
    }; Jet.Run.prototype.refresh = function (i) {
        if (this.index != undefined && i != undefined && this.index != i) {
            this.index == i;
        }
        this.run();
    }; Jet.Run.prototype.run = function () {
        var _this = this;
        var opt = {
            ele: _this.ele,
            data: _this.$get(),
            jet: _this
        };
        this.runs._JT_each(function (name) {
            if (name in _this.jet && typeof _this.jet[name] == 'function') {
                _this.jet[name].call(_this.jet, opt);
            } else {
                (new Function('opt', name)).call(_this.jet, opt);
            }
        });
    };
    function _initRun(opt) {
        this.runs = this._attrVal.split(",");
        if (!(this.runs[0] in this.jet && typeof this.jet[this.runs[0]] == 'function')) {
            this.runs = [this._attrVal];
        }
        this.run();
    }

    //if attr show style 中获取父元素数据的函数
    function __par(i) {
        if (i == undefined || i <= 0) { i = 1; }
        if (i >= this._parData.length) {
            return this._parData[this._parData.length - 1]
        }
        return this._parData[i - 1];
    }
    //获取for元素的索引 i表示第几层父元素
    function __index(i) {
        var par = this.par;
        while (i > 0) {
            par = par.par;
            if (_type(par._data) != 'array') {
                par = par.par;
            }
            i--;
        }
        return par.ele._JT_index();
    }

    /*attr*********************************************************************************/
    // Jattr="value:aa;disabled:aa"
    Jet.Attr = function (opt, isStyle) {
        Jet.Base.call(this, opt, (isStyle) ? _style : _attr);
        this.isStyle = isStyle;
        this.setFunc = (this.isStyle) ? this.ele._JT_css : this.ele._JT_attr;
        _initAttr.call(this, opt);
        if (typeof __jet !== 'undefined' && (__jet.type == _text || __jet.type == _input)) {
            this.needParData = true;
        }
    };
    Jet.Attr.prototype = new Super();
    Jet.Attr.prototype.$get = function () {
        if (this.index != undefined) {
            return this.index;
        }
        if (this.data == undefined) {
            return null;
        } else if (this.name == undefined || this.name == _value) {
            if (this.needParData) {
                this.data = this.par.data[this.par.name];
            }
            return this.data
        } else {
            return this.data[this.name];
        }
    }; Jet.Attr.prototype.refresh = function (checkIsIndex) {
        var d = this.$get();
        if (!_isUd(d)) {
            for (var k in this.attrs) {
                if (!checkIsIndex || this.attrs[k]._hasIndex == true) {
                    this.setFunc.call(
                        this.ele, k,
                        _callFuncForJetTools.call(this, this.attrs[k], d)
                    )
                }
            }
        }
    }; Jet.Attr.prototype.refreshIndex = function (i) {
        if (this._hasIndex) {
            this.refresh(true);
        }
    };
    function _initAttr(opt) {
        var attr = this._attrVal;
        _initParData.call(this);
        this.attrs = {};
        var _this = this;
        if (attr._JT_has(';')) {
            attr.split(";").forEach(function (item) {
                _initOneAttr.call(_this, item);
            });
        } else {
            _initOneAttr.call(_this, attr);
        }
        this.refresh();
    }
    function _initOneAttr(attr) {
        if (!attr._JT_has(':')) {
            _throw((this.isStyle) ? 'JStyle' : 'JAttr' + ':必须指定属性的值');
        } else {
            var index = attr.indexOf(":");
            var _s = attr.substring(index + 1);
            if (_s._JT_has('{{')) {//动态
                var hasIndex = _registForWrapperVar(_s, this);
                _s = _formatBindStr(_s);
                var func = _makeFuncForJetTools(_s);
                if (hasIndex) {
                    func._hasIndex = true;
                }
                this.attrs[attr.substring(0, index)] = func;
            } else {//静态
                this.attrs[attr.substring(0, index)] = new Function("return '" + _s + "'");
            }
        }
    }
    /*style*********************************************************************************/
    // Jstyle="color:aa;font-size:aa"
    Jet.Style = Jet.Attr;
    Jet.Show = Jet.If;




})();








