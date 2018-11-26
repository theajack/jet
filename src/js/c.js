Jet.define('c',function(){
    var c=3;
    this.export({
        $init:function(){
            console.log('c:'+c);
        },
        c:function(){
            return c
        }
    })
})