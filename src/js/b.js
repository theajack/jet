Jet.define('bb',function(){
    var b=3;
    this.export({
        $init:function(){
            console.log('b:'+b);
        },
        b:function(){
            return b
        }
    })
})