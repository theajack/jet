
var test=new Jet({
  ready:function(){
    //alert(this.me.name.first);
  },
  data:{
    lang:Jet.lang.list,
    a:true,
    b:new Jet.lang({
      cn:'啊啊啊',
      en:'aaa'
    }),
    me:{
      name:{
        first:JL({
          cn:'西娅',
          en:"thea"
        }),
        last:JL({
          cn:'杰克',
          en:"jack"
        }),
        boy:true
      },
      test:[{a:[1,2,3]},{a:[10,2,3]}]
    },
    s:[
      {t:2,v:'t2'},
      {t:1,v:'t1'},
      {t:2,v:'t2'},
      {t:1,v:'t1'},
      {t:4,v:'t3'},
      {t:3,v:'t3'}
    ]
  },
  func:{
    test:function(d){
      //console.log(d.ele)
    },
    log:function(d){
      //console.log(d.data);
    },hide:function(d){
      d.ele._JT_css('display','none');
    },show:function(d){
      d.ele._JT_css('display','block');
    },alert:function(d){
      alert(d.ele.innerHTML)
    },addLangText:function(d){
      var txt='';
      switch(d.data){
        case 'en':txt='English';break;
        case 'cn':txt='简体中文';break;
        default:break;
      }
      d.ele._JT_txt(txt);
      d.ele._JT_attr('value',d.data)
    },changLange:function(d){
      Jet.lang.name=d.ele.value;
    }
  }
});
function test(){
  console.log('test')
}