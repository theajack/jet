var Query={
    query:function(s){
        return Query.map.filter(function(item){
            return item.name.toLowerCase().has(s.toLowerCase());
        })
    },
    map:[{
        name:'Jet简介',
        url:'/intro',
        intro:'Jet是一个前端的轻量级的js框架，不依赖任何第三方库。Jet采用数据双向绑定，以数据驱动视图。',
        des:''
    },{
        name:'安装使用',
        url:'/intro/install',
        intro:'以script标签引入或者在lite-server中使用',

    },{
        name:'目录结构',
        url:'/intro/contents',
        intro:'介绍Jet项目的目录结构。',
        des:''
    },{
        name:'HTML模板',
        url:'/intro/html',
        intro:'Jet的HTML模板使用的html后缀的文件，语法与普通的html一样。',
        des:''
    },{
        name:'Jet语法',
        url:'/intro/grammer',
        intro:'Jet 使用 new Jet() 来创建一个Jet组件',
        des:''
    },{
        name:'局部渲染',
        url:'/intro/grammer',
        intro:'通过给 new Jet() 参数增加一个 ele 属性（值是一个id值或者是一个dom元素）。可以局部渲染html元素',
        des:'part'
    },{
        name:'ondatachange',
        url:'/intro/grammer',
        intro:'ondatachange 属性用于为Jet数据添加一个数据变化的监听事件',
        des:'ondatachange'
    },{
        name:'生命周期函数',
        url:'/intro/grammer',
        intro:'Jet 有7个生命周期函数',
        des:'life'
    },{
        name:'数据绑定',
        url:'/bind',
        intro:'Jet中的UI是由数据驱动，所有动态的html内容都与Jet的数据绑定，当数据改变时，对应的UI内容会自动更新',
    },{
        name:'属性J',
        url:'/bind/j',
        intro:'Jet中使用属性J将Jet中的数据和UI绑定',
        des:''
    },{
        name:'绑定的分类',
        url:'/bind/type',
        intro:'bind,for,text和input',
        des:''
    },{
        name:'bind',
        url:'/bind/grammer',
        intro:'当绑定的数据是json时，就会使用 new Jet.Bind() 生成一个bind类型的Jet元素。',
        des:'bind'
    },{
        name:'for',
        url:'/bind/grammer',
        intro:'当绑定的数据是数组时，就会使用 new Jet.For() 生成一个for类型的Jet元素。',
        des:'for'
    },{
        name:'text',
        url:'/bind/grammer',
        intro:'当绑定的数据是boolean，number，string类型（值类型）时，并且对应的html元素不是输入元素',
        des:'text'
    },{
        name:'input',
        url:'/bind/grammer',
        intro:'当绑定的数据是boolean，number，string类型（值类型）时，并且对应的html元素是输入元素',
        des:'input'
    },{
        name:'数组方法',
        url:'/bind/array',
        intro:'循环类型的for元素的绑定值是一个数组，Jet 对for元素的数组定义了一些操作方法，来代替原生js的数组操作方法。',
        des:''
    },{
        name:'$push方法',
        url:'/bind/array',
        intro:'使用 .$push() 向数组尾部插入一个元素',
        des:'push'
    },{
        name:'$pushArray方法',
        url:'/bind/array',
        intro:'使用 .$pushArray() 向数组尾部插入多个元素',
        des:'pushArray'
    },{
        name:'$prep方法',
        url:'/bind/array',
        intro:'使用 .$prep() 向数组头部插入一个元素',
        des:'prep'
    },{
        name:'$prepArray方法',
        url:'/bind/array',
        intro:'使用 .$pushArray() 向数组头部插入多个元素',
        des:'prepArray'
    },],
}