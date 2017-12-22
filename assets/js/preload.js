//解决加载时不应该出现的元素会闪现的问题

(function(){
  var e=document.createElement("style");
  e.setAttribute("type","text/css");
  var t=e.cloneNode();
  t.setAttribute("id","__preload_j");
  document.head.appendChild(t);
  t.innerText="[J]{visibility:hidden}";
  e.setAttribute("id","__preload_jl");
  document.head.appendChild(e);
  e.innerText="[Jlang]{visibility:hidden}";
})();
