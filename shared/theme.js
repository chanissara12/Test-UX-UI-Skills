(function(){
  var r=document.documentElement,t;
  try{t=localStorage.getItem('t')}catch(e){}
  if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  r.dataset.theme=t;
  addEventListener('DOMContentLoaded',function(){
    var b=document.getElementById('theme');
    if(!b)return;
    var sync=function(){b.setAttribute('aria-pressed',r.dataset.theme==='dark')};
    sync();
    b.onclick=function(){
      var v=r.dataset.theme==='dark'?'light':'dark';
      r.dataset.theme=v;sync();
      try{localStorage.setItem('t',v)}catch(e){}
    };
  });
})();
