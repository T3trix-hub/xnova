(function(){
const S=SITE,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tel=p=>'tel:'+p.replace(/[^+\d]/g,''),br=n=>String(n).replace('.',',');
const pages=[['index.html','Главная'],['prices.html','Тарифы'],['visit.html','Первый визит'],['contacts.html','Контакты']];
const cur=location.pathname.split('/').pop()||'index.html';
$('#site-header').innerHTML=`<div class="stripe"></div><div class="wrap bar"><a class="logo" href="index.html"><img src="images/logo-mark.png" alt="" width="40" height="40"><span>XNOVA</span></a><nav id="nav">${pages.map(p=>`<a href="${p[0]}"${p[0]===cur?' class="on"':''}>${p[1]}</a>`).join('')}<a class="btn sm" href="${tel(S.phone)}">Позвонить</a></nav><button id="burger" aria-label="Меню"><i></i><i></i><i></i></button></div>`;
$('#burger').onclick=()=>$('#nav').classList.toggle('open');
$('#site-footer').innerHTML=`<div class="wrap foot"><div><img src="images/logo-mark.png" alt="" width="46" height="46"><b>XNOVA</b>Компьютерный клуб в Минске<br>${S.address}<br>${S.hours}</div><div><b>Разделы</b>${pages.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('<br>')}</div><div><b>Связь</b><a href="${tel(S.phone)}">${S.phone}</a><br><a href="https://t.me/${S.telegram}" target="_blank" rel="noopener">Telegram</a><br><a href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener">Instagram</a></div></div><div class="wrap copy">© Xnova · Сайт сделал <a href="https://t3trix-hub.github.io/t3trix-portfolio/" target="_blank" rel="noopener">Lexey</a></div>`;
$$('[data-site]').forEach(e=>e.textContent=S[e.dataset.site]);
$$('[data-tel]').forEach(e=>e.href=tel(S.phone));$$('[data-tg]').forEach(e=>e.href='https://t.me/'+S.telegram);
$$('[data-ig]').forEach(e=>e.href='https://instagram.com/'+S.instagram);$$('[data-map]').forEach(e=>e.href=S.ymaps);
$$('[data-from]').forEach(e=>e.textContent=br(HALLS[0].rows[0][2]));
const hs=$('#halls');
if(hs)hs.innerHTML=HALLS.map((h,i)=>{const r=h.rows[0];const sub=h.single?'на PlayStation 5':`в выходные ${br(r[3])} Br`;return`<a class="box hall rv" href="prices.html#${h.id}"><span class="no">0${i+1}</span><h3>${esc(h.n)}</h3><b>${br(r[2])} <small>Br / час</small></b><p>${sub}</p><em>Смотреть тарифы →</em></a>`}).join('');
const tb=$('#tariffs');
if(tb){const n=new Date(),d=n.getDay(),hr=n.getHours(),we=(d===5&&hr>=17)||d===6||d===0,now=$('#now');
 if(now)now.textContent=`Сейчас действуют цены: ${we?'выходные':'будни'}.`;
 tb.innerHTML=HALLS.map(h=>`<section class="box tcard${h.single?' single':''} rv" id="${h.id}"><h3>${esc(h.n)}</h3><div class="th"><span></span><span${we?'':' class="cur"'}>Будни</span><span class="we${we?' cur':''}">Выходные</span></div>${h.rows.map(r=>`<div class="tr"><div class="tl">${esc(r[0])}${r[1]?`<small>${esc(r[1])}</small>`:''}</div><b>${br(r[2])}</b>${r[3]!=null?`<b class="we">${br(r[3])}</b>`:''}</div>`).join('')}</section>`).join('')}
const lb=document.createElement('div');lb.id='lb';document.body.append(lb);lb.onclick=()=>lb.classList.remove('on');
$$('[data-zoom]').forEach(a=>a.onclick=e=>{e.preventDefault();lb.innerHTML=`<img src="${a.dataset.zoom}" alt="">`;lb.classList.add('on')});
const ch=$('#chat');
if(ch){const ms=$('.msgs',ch),cp=$('.cps',ch),asked=new Set();
 const add=(t,w)=>{const m=document.createElement('div');m.className='m '+w;m.textContent=t;ms.append(m);ms.scrollTop=ms.scrollHeight;return m};
 const chips=()=>{cp.innerHTML=FAQ.map((f,i)=>asked.has(i)?'':`<button data-i="${i}">${esc(f[0])}</button>`).join('')+(asked.size===FAQ.length?'<button data-r="1" class="rs">Спросить заново</button>':'')};
 add('Привет! Я Xnova. Выбери вопрос ниже, отвечу сразу.','bot');chips();
 cp.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.r){asked.clear();ms.innerHTML='';add('Привет! Спрашивай ещё.','bot');chips();return}
  const i=+b.dataset.i;asked.add(i);chips();add(FAQ[i][0],'me');const t=document.createElement('div');t.className='m bot typing';t.innerHTML='<i></i><i></i><i></i>';ms.append(t);ms.scrollTop=ms.scrollHeight;
  setTimeout(()=>{t.remove();add(FAQ[i][1],'bot');chips()},750)}}
$$('main h1,main h2,.stat,.step,.ph,.cta>*,.act,.find>*,.facts div').forEach(e=>e.classList.add('rv'));
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){const t=x.target;t.classList.add('in');io.unobserve(t);setTimeout(()=>t.style.transitionDelay='',900)}}),{threshold:.08}):null;
let k=0;$$('.rv').forEach(e=>{if(!io)return e.classList.add('in');e.style.transitionDelay=Math.min(k++%5,4)*60+'ms';io.observe(e)});
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||a.dataset.zoom||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;const u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname||!/\.html?$|\/$/.test(u.pathname))return;e.preventDefault();document.body.classList.add('leave');setTimeout(()=>location.href=a.href,200)});
addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leave')});
})();
