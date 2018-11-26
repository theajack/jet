Jet.define('m1',function(modules){//模块名和模块回调函数
    var count=0;//模块内部代码
    console.log('m1:',modules)
    Jet.export({//输出模块
        getCount:function(){
            return count;
        },
        addCount:function(){
            count++;
        },
    })
})