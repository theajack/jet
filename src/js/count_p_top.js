(function(){
    var height=(document.documentElement.clientHeight-556)/2;
    var style=document.createElement('style');
    style.innerHTML='body{padding-top:'+height+'px}'
    var head=document.getElementsByTagName('head')[0];
    head.appendChild(style);
})()
