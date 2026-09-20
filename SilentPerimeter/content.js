'use strict';
// Additional world content is shared by the browser and engine tests.
function installZoneContent(Zone){
 const {Expedition:E,B,distance,clamp}=Zone,P=E.prototype;
 const vehicles=['tractor','tank','helicopter','crashSite','fighter'];
 const small=['anomaly','corpse','cache','wallet','backpack',...vehicles];
 B.weapons[-1]={name:'Без оружия',bonus:0,icon:'none'};
 const descriptions={tractor:'Ржавый трактор зарос травой. Кабина перекошена, под сиденьем что-то блестит.',tank:'Обгоревший танк врос гусеницами в землю. Люк приоткрыт, внутри темно.',helicopter:'Разбитый вертолёт лежит на боку. Лопасти смяты, среди обшивки виден десантный отсек.',crashSite:'Борозда жёсткой посадки заканчивается обломками кабины. Среди искорёженного металла сохранились вещи экипажа.',fighter:'Останки истребителя разбросаны по поляне. В расколотой кабине уцелел аварийный комплект.',backpack:'Брошенный рюкзак промок под дождём. Пряжки покрылись ржавчиной, но карманы ещё закрыты.',abyss:'Чёрная дыра разверзлась в земле. Тьма зовёт заглянуть в неё. Ей так трудно сопротивляться.',bubble:'Над травой дрожит мыльный пузырь. В радужной плёнке отражается совершенно другое место.'};
 Object.assign(B.texts,Object.fromEntries(Object.entries(descriptions).map(([k,v])=>[k,[v]])));
 B.texts.fireflies=['Огни перехватили путь. Свет мечется всё ближе, обжигая кожу.'];
 function segmentDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)}
 P.contentPosition=function(map,type,random){
  const anomaly=['abyss','bubble'].includes(type),vehicle=vehicles.includes(type);let best=null,score=-1;
  for(let i=0;i<16000;i++){
   const p={x:65+random()*(map.width-130),y:65+random()*(map.height-130)};
   if(distance(p,map.camp)<240||distance(p,map.exit)<240)continue;
   if(map.pois.some(q=>distance(p,q)<(type==='cemetery'&&q.type==='cemetery'?650:(anomaly&&!small.includes(q.type))||(!small.includes(type)&&q.type==='anomaly')?210:vehicle?115:130)))continue;
   if(map.groups.some(q=>distance(p,q)<70))continue;
   const roadGap=Math.min(Infinity,...map.roads.flatMap(r=>r.points.slice(1).map((b,j)=>segmentDistance(p,r.points[j],b))));
   if(roadGap<(vehicle?40:18))continue;
   const value=Math.min(...map.pois.map(q=>distance(p,q)));if(value>score){best=p;score=value}
   if(i>1000&&best)return best;
  }
  if(!best)throw Error('Нет свободного места для '+type);
  return best;
 };
 P.ensureWorldContent=function(map){
  map.pois=map.pois.filter(p=>!(p.element==='bubble'&&p.searched));
  if(this.s.secretMap&&!this.s.secretMapKind){const finding=(this.s.log||[]).find(entry=>/КПК с треснувшим экраном|потрёпанную карту/.test(entry.text));this.s.secretMapKind=finding?.text.includes('КПК с треснувшим экраном')?'pda':'scroll'}
  if(map.contentVersion===1)return;
  let state=(this.s.seed^0x73FA912B)>>>0;const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296};
  for(const p of map.pois)if(p.type==='wallet'){p.type='backpack';p.name='Брошенный рюкзак';p.description=descriptions.backpack}
  const add=(type,name,element)=>{const p=this.contentPosition(map,element||type,random);map.pois.push({...p,id:'content-'+(element||type),type,name,description:descriptions[element||type]||B.texts[type][0],element,variant:Math.floor(random()*4),searched:false})};
  if(map.pois.filter(p=>p.type==='cemetery').length<2)add('cemetery','Забытое кладбище');
  for(const [type,name] of [['tractor','Ржавый трактор'],['tank','Подбитый танк'],['helicopter','Разбитый вертолёт'],['crashSite','Место жёсткой посадки'],['fighter','Останки истребителя']])add(type,name);
  const abyss=random()<.30,bubble=random()<.30;
  if(abyss)add('anomaly','Чёрная бездна','abyss');if(bubble)add('anomaly','Мыльный пузырь','bubble');
  map.decorations=[];for(let i=0;i<5;i++){const p=this.contentPosition(map,'pylon',random);map.decorations.push({...p,type:'pylon'});/* keep decorative towers apart */map.pois.push({...p,id:'temp-pylon-'+i,type:'pylon'})}
  map.pois=map.pois.filter(p=>!p.id.startsWith('temp-pylon-'));
  map.fireflies=map.groups.map((g,i)=>({...g,id:'f'+i,type:'fireflies',color:i%4,defeated:false,home:{...g.home},target:{...g.target},cooldown:0,warningAt:0}));
  map.contentVersion=1;
 };
 const generate=P.generateMap;P.generateMap=function(){const map=generate.call(this);this.ensureWorldContent(map);return map};
 const restore=E.restore;E.restore=function(data){const e=restore.call(this,data);e.ensureWorldContent(e.s.map);if(e.s.encounterDensityVersion!==1){e.s.nextEncounter=e.s.distance+Math.max(0,e.s.nextEncounter-e.s.distance)*1.25;e.s.encounterDensityVersion=1}return e};
 P.activeGroups=function(){return this.s.night?this.s.map.fireflies||[]:this.s.map.groups};
 const near=P.nearbyGroup;P.nearbyGroup=function(type){if(type!=='fireflies')return near.call(this,type);return this.activeGroups().filter(g=>!g.defeated&&distance(g,this.s)<170).sort((a,b)=>distance(a,this.s)-distance(b,this.s))[0]||null};
 const move=P.moveGroups;P.moveGroups=function(dt){
  if(!this.s.night)return move.call(this,dt);
  for(const g of this.activeGroups()){
   if(g.defeated)continue;g.cooldown=Math.max(0,g.cooldown-dt);g.nextTurn-=dt;
   if(g.nextTurn<=0||distance(g,g.target)<10){g.target={x:clamp(g.home.x+this.integer(-180,180),60,this.s.map.width-60),y:clamp(g.home.y+this.integer(-150,150),60,this.s.map.height-60)};g.nextTurn=this.integer(7,17)}
   const d=distance(g,g.target);if(d>1){const p={x:g.x+(g.target.x-g.x)/d*12*dt,y:g.y+(g.target.y-g.y)/d*12*dt};if(distance(p,this.s.map.camp)>240&&this.activeGroups().every(q=>q===g||q.defeated||distance(p,q)>190)&&this.s.map.pois.every(q=>distance(p,q)>55)){g.x=p.x;g.y=p.y}else g.nextTurn=0}
   if(this.s.mode==='playing'&&g.cooldown===0&&distance(g,this.s)<38){g.cooldown=60;this.s.nextEncounter=this.s.distance+this.encounterGap();this.encounter('fireflies',{groupId:g.id});return}
  }
 };
 const encounter=P.encounter;P.encounter=function(type,extra={}){
  if(this.s.night&&['dogs','boars'].includes(type)){type='fireflies';extra={...extra};if(extra.groupId?.startsWith('g'))extra.groupId='f'+extra.groupId.slice(1)}
  if(type!=='fireflies')return encounter.call(this,type,extra);
  const group=extra.groupId?this.s.map.fireflies.find(g=>g.id===extra.groupId):this.nearbyGroup(type);
  this.s.pending={kind:'encounter',type,...extra,groupId:group?.id};this.s.soundCue='fireflies';
  this.notice('Скопление светлячков','Семь огней мечутся над травой. Их сияние тянется к твоим рукам.','Риск ранения: 50% · потеря 1–3 секций. Убежать: 90%.',[{id:'resolve',label:'Приблизиться'},{id:'escape',label:'Убежать'}],'НОЧНЫЕ ОГНИ');
 };
 const escapeChance=P.escapeChance;P.escapeChance=function(type){return type==='fireflies'?90:escapeChance.call(this,type)};
 const resolve=P.resolve;P.resolve=function(){
  const e=this.s.pending;if(e?.type!=='fireflies')return resolve.call(this);
  this.s.pending=null;this.s.encounters++;const g=this.s.map.fireflies.find(g=>g.id===e.groupId);if(g)g.defeated=true;
  const damage=this.roll()<.5?this.integer(1,3):0;this.s.hp=Math.max(0,this.s.hp-damage);
  if(!this.s.hp){this.finish('defeat','Светлячки сомкнулись вокруг тебя. Их свет погас последним.');return}
  const lines=[damage?`Огни обожгли тебя. Потеряно ${damage} секц. здоровья.`:'Огни рассеялись, оставив светящийся след.'];
  if(this.roll()<.1)this.receive(lines,this.artifact(),'Светлячки рассеялись');else{lines.push('Ценный светящийся осадок обменян. '+this.money(100,200));this.receive(lines,null,'Светлячки рассеялись')}
 };
 const loot=P.poiLoot;P.poiLoot=function(p,initial=[]){
  if(!vehicles.includes(p.type))return loot.call(this,p,initial);
  const lines=[...initial];if(p.type==='tractor')lines.push(this.money(1,20));else{lines.push(this.gear());if(this.roll()<.6)lines.push(...this.findNote({type:'corpse'}))}
  this.receive(lines,null,p.name);
 };
 const search=P.search;P.search=function(){const p=this.s.map.pois.find(p=>p.id===this.s.pending?.id);if(p&&vehicles.includes(p.type)){if(p.searched)return;this.s.pending=null;p.searched=true;this.s.visited.push(p.id);this.poiLoot(p);return}return search.call(this)};
 const note=P.findNote;P.findNote=function(p){return note.call(this,p?.type==='backpack'?{...p,type:'wallet'}:p)};
 const anomaly=P.anomaly;P.anomaly=function(p){
  if(!['abyss','bubble'].includes(p.element))return anomaly.call(this,p);
  this.s.pending={kind:'specialAnomaly',id:p.id,element:p.element};
  this.notice(p.name,p.description,p.element==='abyss'?'Тьма зовёт.':'Воздух дрожит вокруг радужной плёнки.',[{id:'studySpecial',label:'Исследовать'},{id:'leaveSpecial',label:'Уйти'}],'АНОМАЛИЯ');
 };
 P.specialAnomaly=function(leave){
  const pending=this.s.pending,p=this.s.map.pois.find(p=>p.id===pending?.id);if(pending?.kind!=='specialAnomaly'||!p||p.searched)return;
  if(leave&&(p.element==='bubble'||this.roll()<.95)){this.s.pending=null;this.s.mode='playing';this.s.event=null;return}
  this.s.pending=null;p.searched=true;this.s.visited.push(p.id);this.s.encounters++;
  if(p.element==='bubble'){
   const map=this.s.map,view=this.teleportView||{width:960/.86,height:540/.86};
   const visible=(center,q)=>{const x=clamp(center.x-view.width/2,0,Math.max(0,map.width-view.width)),y=clamp(center.y-view.height/2,0,Math.max(0,map.height-view.height));return q.x>=x-35&&q.x<=x+view.width+35&&q.y>=y-35&&q.y<=y+view.height+35};
   const safe=q=>distance(q,map.exit)>80&&this.activeGroups().every(g=>g.defeated||distance(q,g)>100)&&map.pois.every(a=>a===p||distance(q,a)>70);
   let target=null,farthest=null,best=-1;const consider=q=>{if(!safe(q))return;const d=distance(q,p);if(d>best){best=d;farthest=q}if(!visible(p,q)&&!visible(q,p))return q};
   for(let i=0;i<1000&&!target;i++)target=consider({x:this.integer(35,map.width-35),y:this.integer(35,map.height-35)});
   // A deterministic grid also covers the edges if random sampling misses open ground.
   if(!target){const outside=[];for(let x=35;x<=map.width-35;x+=10)for(let y=35;y<=map.height-35;y+=10){const q=consider({x,y});if(q)outside.push(q)}if(outside.length)target=this.pick(outside)}
   target=target||farthest||{x:map.camp.x+48,y:map.camp.y+8};map.pois=map.pois.filter(a=>a.id!==p.id);Object.assign(this.s,target);this.s.cameraReset=(this.s.cameraReset||0)+1;
   this.notice('Пузырь лопнул','На мгновение мир вывернулся. Ты стоишь в другом месте.','Снаряжение и здоровье сохранены.');return;
  }
  const prefix=leave?'Зов бездны оказался сильнее. ':'';
  if(this.roll()<.5){this.finish('defeat',prefix+'Ты заглянул во тьму. Бездна затянула тебя.');return}
  this.s.weapon=-1;this.notice('На краю бездны',prefix+'Ты едва успел прийти в себя и отпрыгнуть до того, как бездна затянула тебя.','Оружие исчезло во тьме.');
 };
 const act=P.act;P.act=function(id,value){if(['studySpecial','leaveSpecial'].includes(id)&&this.s.mode==='dialog'&&this.s.event?.actions.some(a=>a.id===id)){this.specialAnomaly(id==='leaveSpecial');return}return act.call(this,id,value)};
 const artifact=P.artifact;P.artifact=function(rare){if(!rare)return {...artifact.call(this),sprite:this.integer(0,11)};return {id:'heart-'+this.integer(1,9999999),type:'heart',monster:rare,name:rare==='chimera'?'Сердце химеры':'Сердце кровопийцы',bonuses:{preparation:this.integer(3,15),speed:this.integer(3,15),stamina:this.integer(3,15)},rare:true,sprite:rare==='chimera'?13:12}};
 const label=P.artifactLabel;P.artifactLabel=function(a){return a.type==='heart'?`+${a.bonuses.preparation}% подготовки · +${a.bonuses.speed}% скорости · +${a.bonuses.stamina}% выносливости`:label.call(this,a)};
 P.heartBonus=function(type){return this.s.artifacts.filter(a=>a.type==='heart').reduce((sum,a)=>sum+a.bonuses[type],0)};
 const prep=P.preparation,stamina=P.maxStamina;P.preparation=function(){return clamp(prep.call(this)+this.heartBonus('preparation'),0,100)};
 P.maxStamina=function(){return stamina.call(this)*(1+this.heartBonus('stamina')/100)};
 P.speed=function(){return B.movement.speed*(1+(this.s.artifacts.filter(a=>a.type==='speed').reduce((n,a)=>n+a.value,0)+this.heartBonus('speed'))/100)};
}
if(typeof module!=='undefined')module.exports=installZoneContent;else installZoneContent(Zone);
