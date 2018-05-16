Jet.$define('m3',['module1 as m'],function(modules){
    //使用 as 关键字可以为依赖的模块起一个别名
    //modules为引入的模块集合，在该例中 modules为{m:模块1}，回调参数modules可以为任意命名
    var count=0;
    
    Jet.$export({
        addCount1:function(){
            modules.m.addCount();
        },
        addCount2:function(){
            count++;
        },
        allCount:function(){
            return modules.m.getCount()+count;
        },
    })
})