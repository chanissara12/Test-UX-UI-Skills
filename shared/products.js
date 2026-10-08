const P=[
['Atlas Boards','Project management','Cloud',1,4.7,18,1,1],['Atlas Enterprise','Project management','Hybrid',1,4.5,42,1,0],
['Pulse Insights','Analytics','Cloud',1,4.4,30,1,1],['Pulse On-Prem','Analytics','On-premise',0,4.1,55,0,0],
['Sentinel Access','Security','Cloud',1,4.8,24,1,1],['Sentinel Vault','Security','On-premise',1,4.6,48,1,0],
['Flowline','Automation','Cloud',0,4.2,12,1,1],['Flowline Pro','Automation','Hybrid',1,4.3,26,1,0],
['Beacon Reports','Analytics','Cloud',0,3.9,9,0,1],['Keystone PM','Project management','On-premise',1,4.0,36,0,0],
['Relay Connect','Automation','Cloud',1,4.5,20,1,1],['Bastion Audit','Security','Hybrid',1,4.2,38,1,0]
].map(a=>({name:a[0],cat:a[1],dep:a[2],sso:a[3],rating:a[4],price:a[5],api:a[6],trial:a[7]}));
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let sortK='name',sortDir=1;
const chk=n=>$$(`input[name=${n}]:checked`).map(i=>i.value);
function state(){return{q:$('#q').value.trim().toLowerCase(),cat:chk('cat'),dep:chk('dep'),feat:chk('feat'),price:+$('#price').value,rating:+$('#rating').value}}
let applied=state();
function render(){
  const s=applied;
  let r=P.filter(p=>(!s.q||(p.name+' '+p.cat).toLowerCase().includes(s.q))&&(!s.cat.length||s.cat.includes(p.cat))&&(!s.dep.length||s.dep.includes(p.dep))
    &&p.price<=s.price&&p.rating>=s.rating&&s.feat.every(f=>p[f]));
  const sel=$('#sort').value;
  if(sel!=='name'){sortK=sel==='rating'?'rating':'price';sortDir=sel==='price-asc'?1:-1}
  r.sort((a,b)=>(typeof a[sortK]==='string'?a[sortK].localeCompare(b[sortK]):a[sortK]-b[sortK])*sortDir);
  $('#rows').innerHTML=r.map(p=>`<tr><td>${p.name}</td><td>${p.cat}</td><td>${p.dep}</td><td class="c ${p.sso?'yes':'no'}">${p.sso?'✓<span class="sr"> Yes</span>':'—<span class="sr"> No</span>'}</td><td class="r num">★ ${p.rating.toFixed(1)}</td><td class="r num">$${p.price}<span class="no">/mo</span></td><td><a class="btn sm" href="index.html#contact">Details<span class="sr"> for ${p.name}</span></a></td></tr>`).join('');
  $('#count').textContent=r.length+(r.length===1?' product':' products');
  $('#empty').hidden=r.length>0;$('#ptable').hidden=!r.length;
  $$('#ptable th[aria-sort]').forEach(t=>t.removeAttribute('aria-sort'));
  const th=$(`button.th[data-k=${sortK}]`);
  $$('button.th').forEach(b=>b.removeAttribute('data-arrow'));
  if(th){th.parentElement.setAttribute('aria-sort',sortDir>0?'ascending':'descending');th.dataset.arrow=sortDir>0?' ▲':' ▼'}
  const chips=[...s.cat.map(v=>['cat',v]),...s.dep.map(v=>['dep',v]),...s.feat.map(v=>['feat',v]),...(s.q?[['q','“'+s.q+'”']]:[]),...(s.rating?[['rating',s.rating+'+ rating']]:[]),...(s.price<60?[['price','Up to $'+s.price]]:[])];
  $('#chips').innerHTML=chips.map(([k,v])=>`<button type="button" class="chip" data-k="${k}" data-v="${v}">${v} <span aria-hidden="true">✕</span><span class="sr">Remove filter</span></button>`).join('');
}
$('#filters').addEventListener('submit',e=>{e.preventDefault();applied=state();render()});
$('#filters').addEventListener('reset',()=>setTimeout(()=>{$('#priceOut').textContent='$60';$('#sort').value='name';sortK='name';sortDir=1;applied=state();render()}));
$('#clear2').onclick=()=>{$('#filters').reset()};
$('#chips').onclick=e=>{const c=e.target.closest('.chip');if(!c)return;const{k,v}=c.dataset;
  if(k==='q')$('#q').value='';else if(k==='rating')$('#rating').value='0';else if(k==='price'){$('#price').value=60;$('#priceOut').textContent='$60'}else $$(`input[name=${k}]`).forEach(i=>{if(i.value===v)i.checked=false});
  applied=state();dd();render()};
$$('button.th').forEach(b=>b.onclick=()=>{const k=b.dataset.k;sortDir=sortK===k?-sortDir:1;sortK=k;$('#sort').value='name';
  const sv=$('#sort');sv.value=k==='price'?(sortDir>0?'price-asc':'price-desc'):k==='rating'?'rating':'name';
  render()});
render();
const dds=$$('.dd');
function dd(){dds.forEach(d=>{const c=d.querySelectorAll('input:checked'),v=[...c].map(i=>i.parentElement.textContent.trim());
  d.querySelector('.val').textContent=v.length?(v.length>1?v.length+' selected':v[0]):'Any'})}
$('#price').addEventListener('input',()=>$('#priceOut').textContent='$'+$('#price').value);
document.addEventListener('input',dd);$('#filters').addEventListener('reset',()=>setTimeout(dd));
dds.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)dds.forEach(o=>o!==d&&(o.open=false))}));
document.addEventListener('click',e=>dds.forEach(d=>d.contains(e.target)||(d.open=false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')dds.forEach(d=>{if(d.open){d.open=false;d.querySelector('summary').focus()}})});
dd();
