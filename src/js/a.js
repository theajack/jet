
Jet.$define('aa',['b as b11'],function(ms){
//Jet.$define('aa',['b as b0','c as c0'],function(ms){
    var a=1;
    var b=2;
    console.log(ms)
    Jet.$export({
        a:function(){
            return a+b
        },
        add:function(a,b){
            return a+b
        },
        show:function(){
            console.log(ms.b0.b+ms.c0.c)
        }
    })
})