global.V=process.env.V||'';
if(process.env.SEED){let a=+process.env.SEED*2654435761>>>0;Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
// 疑似DOM＋疑似時計で、タイトル→全フェーズ→終了まで自動で遊ぶ
const fs=require('fs');const src=fs.readFileSync(process.env.CHK||'chk.js','utf8');
const ctx=new Proxy({},{get:(t,k)=>k in t?t[k]:(k==='createLinearGradient'?()=>({addColorStop(){}}):(k==='measureText'?()=>({width:10}):()=>{})),set:(t,k,v)=>{t[k]=v;return true}});
const els={};
function mk(id){const e={id,hidden:false,style:{setProperty(){}},classList:{toggle(){},add(){},remove(){}},listeners:{},_html:'',textContent:'',disabled:false,checked:false,className:'',children:[],
 set innerHTML(v){this._html=v;if(v==='')this.children=[]},get innerHTML(){return this._html},
 addEventListener(t,f){(this.listeners[t]=this.listeners[t]||[]).push(f)},getContext:()=>ctx,getBoundingClientRect:()=>({left:0,top:0,width:390,height:470}),
 querySelector:()=>mk('q'),querySelectorAll:()=>[],appendChild(c){this.children.push(c)},animate(){},click(){},setPointerCapture(){},width:0,height:0};return e}
global.document={getElementById:id=>els[id]||(els[id]=mk(id)),createElement:()=>mk('x'),querySelectorAll:()=>[],querySelector:()=>null,addEventListener(){}};
global.window={devicePixelRatio:2};
global.matchMedia=()=>({matches:false});global.addEventListener=()=>{};global.localStorage={getItem:()=>null,setItem(){}};
global.navigator={};global.ResizeObserver=class{observe(){}};
let NOW=0,rafs=[],timers=[];global.performance={now:()=>NOW};
global.requestAnimationFrame=f=>rafs.push(f);
global.setTimeout=(f,ms)=>{timers.push({t:NOW+(ms||0),f});return timers.length};global.clearTimeout=()=>{};
eval(((s)=>process.env.SK?s.replace("skills.clear();","skills.clear();"+process.env.SK.split(",").map(k=>"skills.add('"+k+"');").join("")):s)(((s)=>process.env.NOQ?s.replace(/quota:\[[^\]]*\]/,"quota:[1,1,1,1,1,1,1,1,1]"):s)(process.env.BOSS?src.replace("const k=pool[Math.floor(Math.random()*pool.length)];","const k=process.env.BOSS;"):src))+`;globalThis.G={get mode(){return mode},get phase(){return phase},get strikes(){return strikes},get power(){return power},pts:()=>pts,chain,scoreOf,snapOf,P,get W(){return W},get H(){return H},get hist(){return hist},get skills(){return [...skills]},get grand(){return grand},get sk(){return skills.size},get hs(){return hitStop},get ev(){return EV.length},get st(){return simT},get tgt(){return target},get GS(){return JSON.stringify(GS)},get bmax(){return B.length},get storm(){return stormK},get boss(){return boss&&boss.k+':'+(boss.text||'')}}`);
function step(ms){const end=NOW+ms;while(NOW<end){NOW+=16;const r=rafs;rafs=[];r.forEach(f=>f(NOW));timers.sort((a,b)=>a.t-b.t);while(timers.length&&timers[0].t<=NOW)timers.shift().f()}}
step(100);els.ttl.listeners.pointerdown[0]({preventDefault(){}});
let guard=0,strikesDone=0;const log=[];
let usedEndless=false;while((G.mode!=='end'||(process.env.ENDLESS&&!usedEndless&&!document.getElementById('endless').hidden&&(usedEndless=true,console.log('→ エンドレスへ'),document.getElementById('endless').onclick(),true)))&&guard++<6000){step(200);
  if(G.mode==='aim'){let best=null;const CAND=!process.env.FREE?G.pts().map(p=>G.P(p)):(()=>{const c=[];for(let x=6;x<G.W;x+=14)for(let y=6;y<G.H;y+=14)c.push([x,y]);return c})();for(const [x,y] of CAND){const sp=G.snapOf(x,y);if(!sp)continue;const qx=sp.x,qy=sp.y;const h=G.chain(qx,qy);if(!h.length)continue;const sc=G.scoreOf(h,G.strikes===1);if(!best||sc.tot>best.t)best={x,y,t:sc.tot,n:sc.fresh,d:sc.maxD}}
    if(!best){console.log('no target');break}
    const c=els.c;c.listeners.pointerdown[0]({pointerId:1,clientX:best.x,clientY:best.y});c.listeners.pointerup[0]({pointerId:1,clientX:best.x,clientY:best.y});
    const before=G.power;els.fire.onclick();step(50);c.listeners.pointerdown[0]({pointerId:1,clientX:5,clientY:5});{let k=0;while(k<16000&&(G.mode==='strike'||G.mode==='spawn'||G.mode==='done')){step(200);k+=200}}step(300);strikesDone++;
    const got=G.power-before;if(Math.abs(got-best.t)>1)console.log('MISMATCH 予想',best.t,'実際',got);if(got===0&&best.t>0){console.log("STUCK mode",G.mode,"hitStop",G.hs,"EV",G.ev,"simT",G.st,"target",JSON.stringify(G.tgt),"best",JSON.stringify(best));process.exit()}if(Math.abs(got-best.t)>1)log.push(`予想ずれ P${G.phase+1}: 予想${best.t} 実際${got}`);
  }
  const gid=id=>document.getElementById(id);if(G.mode==='clear'){step(3500);const c=gid('clr');if(c.onclick)c.onclick()}if(G.mode==='pick'&&!gid('ovPick').hidden&&process.env.SKIP){step(700);gid('pickSkip').onclick();step(100);continue}if(G.mode==='pick'&&!gid('ovPick').hidden){const PR=(process.env.PR||'').split(',');const ch=gid('cards').children;const card=PR[0]?[...ch].sort((a,b)=>{const ia=PR.indexOf(a.id.slice(3)),ib=PR.indexOf(b.id.slice(3));return (ia<0?99:ia)-(ib<0?99:ib)})[0]:ch[0];if(card){if(globalThis.__rp===undefined){globalThis.__rp=0}const t=gid("pickH").textContent;if(/レア/.test(t)){__rp++;console.log("レア枠:",t)}card.onclick();if(gid("pickOk").disabled===false)console.log("LOCK FAIL");step(600);card.onclick();if(gid("pickOk").disabled&&gid("ownL")._onDrop){const ks=G.skills;gid("ownL")._onDrop(ks[0]);if(!globalThis.__sw){globalThis.__sw=1;console.log("入れ替え発生",ks.length)}}gid("pickOk").onclick()}}
}
if(process.env.JSON){console.log('J'+JSON.stringify(process.env.JB?G.hist.map(h=>[h.s,h.b]):G.hist.map(h=>h.s)));process.exit(0)}
console.log('スキル数',G.sk,'ボス',G.boss,'終了 mode=',G.mode,'phase=',G.phase+1,'落雷数=',strikesDone,'総発電=',G.grand);
console.log('フェーズ別',G.hist.map(h=>`${h.s}/${h.q}(${h.n}点${h.d}連)`).join('  '));
console.log("スキル",G.skills.join(","),"成長",G.GS);console.log(log.slice(0,5).join('\n')||'予想と実際は一致');
console.log('終了画面', document.getElementById('maxN').textContent, document.getElementById('maxD').textContent, document.getElementById('endH').textContent);
