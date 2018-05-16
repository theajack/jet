Jet.$define('m2',['new(module1)'],function(modules){
//Jet.$define('m2',function(modules){
    //依赖模块可以包含子目录，如 ['modules/module1']
    //modules为引入的模块集合，在该例中 modules为{m1:模块1}，回调参数modules可以为任意命名
    var count=0;
    console.log('m2:',modules)
    Jet.$export({
        addCount1:function(){
            modules.m1.addCount();
        },
        addCount2:function(){
            count++;
        },
        allCount:function(){
            return modules.m1.getCount()+count;
        },
    })
})