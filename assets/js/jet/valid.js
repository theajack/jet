var _form='$form',_valid='$valid';
//第一个含有 _form 的父元素
Jet.valid={
  init:function(){
    J.attr('\\'+_valid).each(function(item){
      item.attr('jet-valid',item.attr(_valid));
    });
    J.initValid();
  },findValidPar:function(ele){
    var par=ele.parent();
    while(!par.hasAttr(_form)&&par.parent()!=null){
      par=par.parent();
    }
    return par;
  }
}
