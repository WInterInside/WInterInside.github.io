'use strict';
const Zone=(()=>{
 const B=typeof BALANCE!=='undefined'?BALANCE:require('./balance.js');
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 class Expedition{
  constructor(seed=Date.now(),run=1){
   this.s={version:3,weaponCatalogVersion:3,artifactPowerVersion:3,seed:seed>>>0,randomState:seed>>>0,run,mode:'camp',hp:5,weapon:(seed>>>0)&1?0:1,armor:0,artifacts:[],medkits:0,money:0,key:false,depotKey:false,secretMap:false,elapsed:0,distance:0,steps:0,facing:1,encounters:0,escaped:0,visited:[],log:[],restTime:0,weatherTimer:0,groupSound:null,night:false,event:null,pending:null,previousMode:null,gateBlocked:false,outcome:null,campReturnArmed:false,campStrangerSeen:false};
   this.s.startingWeapon=this.s.weapon;
   this.s.sector=this.integer(1,100);this.s.night=this.roll()<B.nightChance;
   this.s.weather=this.pick(['wind','rain','fog','clear']);this.s.weatherTimer=this.integer(45,80);
   this.s.map=this.generateMap();this.s.x=this.s.map.camp.x+48;this.s.y=this.s.map.camp.y+8;this.s.campPositionVersion=2;
   this.s.stamina=this.maxStamina();this.s.nextEncounter=this.encounterGap();this.s.encounterSpacingVersion=2;this.s.encounterDensityVersion=1;
   this.initializeNotes();
   this.log('Костёр почти погас. Вокруг только холодный лес. Пора идти.');
  }
  roll(){let t=this.s.randomState=(this.s.randomState+0x6D2B79F5)>>>0;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}
  integer(a,b){return a+Math.floor(this.roll()*(b-a+1))}
  pick(a){return a[Math.floor(this.roll()*a.length)]}
  preparation(){return clamp(B.weapons[this.s.weapon].bonus+B.armor[this.s.armor].bonus+this.s.artifacts.filter(a=>a.type==='preparation').reduce((n,a)=>n+a.value,0),0,100)}
  maxStamina(){return B.movement.stamina+this.s.artifacts.filter(a=>a.type==='stamina').reduce((n,a)=>n+a.value,0)}
  speed(){return B.movement.speed*(1+this.s.artifacts.filter(a=>a.type==='speed').reduce((n,a)=>n+a.value,0)/100)}
  combatChance(type){return clamp(55+this.preparation()*.65-(this.s.night?10:0)-(this.s.weather==='fog'?8:0)-({bloodsucker:18,chimera:30,trap:5,infected:7,unknown:8}[type]||0),8,95)}
  setWeapon(index){if(!B.weapons[index])return;this.s.weapon=index;this.s.lastWeaponFound=index}
  weaponRank(){const index=this.s.weapon;return index===-1?-1:B.weapons[index]?.rank||0}
  eventText(type){const choices=B.texts[type]||B.texts.house,used=this.s.usedEncounterLines||(this.s.usedEncounterLines={});let seen=used[type]||[];if(seen.length>=choices.length)seen=used[type]=[];const available=choices.map((_,i)=>i).filter(i=>!seen.includes(i)),pick=available[this.integer(0,available.length-1)];seen.push(pick);used[type]=seen;return choices[pick]}
  static normalizeWeapons(s){if(!s)return;const legacySlots=!!s.weaponSlots;if(legacySlots&&['firearm','close'].includes(s.activeWeaponSlot))s.weapon=s.weaponSlots[s.activeWeaponSlot];if((legacySlots&&[9,10,11].includes(s.weapon))||(s.weapon===11&&s.weaponCatalogVersion!==3))s.weapon=0;delete s.weaponSlots;delete s.activeWeaponSlot;if(!Number.isInteger(s.weapon)||!B.weapons[s.weapon])s.weapon=1;s.weaponCatalogVersion=3}
  upgradeWeaponSlots(){Expedition.normalizeWeapons(this.s)}
  escapeChance(type){return clamp(({bloodsucker:30,chimera:15}[type]||50)-(this.s.night?10:0),5,80)}
  anomalyProtection(){return B.armor[this.s.armor].bonus*.30}
  anomalyChance(){return clamp(65+this.preparation()*.12+this.anomalyProtection()-(this.s.night?10:0)-(this.s.weather==='fog'?8:0),25,90)}
  borderOdds(){const p=this.preparation();return B.border.find(row=>p>=row.min&&p<=row.max)}
  encounterGap(){return this.integer(B.encounters.minDistance,B.encounters.maxDistance)}
  text(type){return this.pick(B.texts[type]||B.texts.house)}
  log(text,tone=''){this.s.log.unshift({time:this.s.elapsed,text,tone});this.s.log=this.s.log.slice(0,60)}
  notice(title,body,details,actions=[{id:'continue',label:'Продолжить путь →'}],tag='ПОЛЕВОЙ ЖУРНАЛ'){
   this.s.mode='dialog';this.s.event={title,body,details,actions,tag};
  }
  mapPosition(map,type,random=()=>this.roll(),ignore=null){
   const isBuilding=p=>!['anomaly','corpse','cache','wallet','backpack','tractor','tank','apc','truck','combine','helicopter','crashSite','fighter'].includes(p.type);
   const gap=p=>type==='anomaly'?(p.type==='anomaly'?190:isBuilding(p)?210:B.world.spacing):B.world.spacing;
   let best=null,bestScore=-1;const others=map.pois.filter(q=>q!==ignore);
   for(let i=0;i<4096;i++){
    const p={x:80+Math.floor(random()*(map.width-160)),y:85+Math.floor(random()*(map.height-170))};
    if((map.lakes||[]).some(l=>((p.x-l.x)/(l.rx+250))**2+((p.y-l.y)/(l.ry+250))**2<1))continue;
    if((map.lakes||[]).some(l=>this.lakeShore?.(l).some(q=>distance(p,q)<(type==='anomaly'?300:270))))continue;
    if(distance(p,map.camp)<(type==='anomaly'?240:190)||distance(p,map.exit)<(type==='anomaly'?240:155))continue;
    if(ignore&&(distance(p,this.s)<100||map.groups.some(q=>!q.defeated&&distance(p,q)<65)))continue;
    if(others.some(q=>distance(p,q)<gap(q)))continue;
    // Prefer open space over the first legal random point.
    const score=Math.min(distance(p,map.camp),distance(p,map.exit),...others.map(q=>distance(p,q)));
    if(score>bestScore){best=p;bestScore=score}
    if(i>=255&&best)return best;
   }
   if(best)return best;
   throw Error('Недостаточно места для объектов');
  }
  waterBlocked(p,map=this.s.map,padding=0){
   const inLake=(map.lakes||[]).some(l=>{const dx=p.x-l.x,dy=p.y-l.y,a=Math.atan2(dy/l.ry,dx/l.rx),phase=(l.seed%10000)/1591,wave=1+.075*Math.sin(a*3+phase)+.045*Math.sin(a*5-phase*.7)+.025*Math.cos(a*8+phase*1.4),waveY=wave+.018*Math.sin(a*4+phase);return (dx/(l.rx*wave+padding))**2+(dy/(l.ry*waveY+padding*.78))**2<1});
   if(inLake)return true;
   return (map.terrainDecor||[]).some(d=>{if(d.type!=='reedPond')return false;const angle=-(d.rotation||0),dx=p.x-d.x,dy=p.y-d.y,x=dx*Math.cos(angle)-dy*Math.sin(angle),y=dx*Math.sin(angle)+dy*Math.cos(angle);return (x/(d.rx*1.1+padding))**2+(y/(d.ry*1.1+padding*.78))**2<1})
  }
  ravineBlocked(p,map=this.s.map,padding=0){return (map.terrainDecor||[]).some(d=>{if(d.type!=='ravine')return false;const angle=-(d.rotation||0),dx=p.x-d.x,dy=p.y-d.y,x=dx*Math.cos(angle)-dy*Math.sin(angle),y=dx*Math.sin(angle)+dy*Math.cos(angle);return (x/(d.rx+padding))**2+(y/(d.ry+padding*.72))**2<1})}
  terrainBlocked(p,map=this.s.map,padding=0){return this.waterBlocked(p,map,padding)?'water':this.ravineBlocked(p,map,padding)?'ravine':null}
  generateMap(){
   const map={width:B.world.width,height:B.world.height,camp:{x:this.integer(65,130),y:this.integer(B.world.height-150,B.world.height-75),variant:this.integer(0,3)},exit:{x:this.integer(B.world.width-150,B.world.width-70),y:this.integer(65,125)},pois:[],roads:[],forests:[],groups:[]};
   const placement=type=>this.mapPosition(map,type);
   const types=['house','house','house','factory','factory','bunker','dugout','camp','waterTower','cemetery','laboratory','cache','cache','supplyDrop','wallet','wallet','cache','hospital','weatherStation','radar','sawmill'];
   const names={hospital:['Заброшенная больница'],weatherStation:['Метеостанция'],radar:['Радиолокационный комплекс'],sawmill:['Заброшенная лесопилка'],house:['Дом лесника','Пустая изба','Дом у просеки','Сгоревший хутор'],factory:['Завод «Рассвет»','Насосная станция','Ремонтный цех'],bunker:['Глухой бункер','Бункер без номера'],dugout:['Землянка под корнями','Чужое убежище'],camp:['Заброшенный лагерь','Стоянка без людей'],waterTower:['Старая водонапорная башня'],cemetery:['Старое кладбище'],laboratory:['Закрытая лаборатория'],cache:['Тайник'],supplyDrop:['Повреждённый груз'],corpse:['Тело у дерева','Незнакомец в плаще','Тело с блокнотом'],wallet:['Потерянный кошелёк','Забытая сумка']};
   const counters={};for(const type of types){const p=placement(),n=counters[type]||0;counters[type]=n+1;const name=type==='house'?(n===0?'Дом лесника':names.house[1+(n+this.s.sector)%3]):names[type][(n+this.s.sector)%names[type].length];map.pois.push({...p,id:'p'+map.pois.length,type,name,description:this.text(type),variant:this.integer(0,3),searched:false})}
   const anomalyNames=new Set();for(let i=0;i<8;i++){const p=placement('anomaly');let name;do{name=this.pick(B.anomalyFirst)+' '+this.pick(B.anomalySecond)}while(anomalyNames.has(name));anomalyNames.add(name);const element=this.pick(['fire','electric','acid','gravity']);map.pois.push({...p,id:'p'+map.pois.length,type:'anomaly',element,name,description:this.text(element),searched:false,variant:this.integer(0,3)})}
   map.anomalyLayoutVersion=2;
   // A connected network is visual guidance. Terrain is traversable everywhere.
   const connected=[map.camp];const nodes=map.pois.filter(p=>!['anomaly','corpse','cache','wallet'].includes(p.type)).concat(map.exit);
   while(nodes.length){let best={d:Infinity};for(let i=0;i<nodes.length;i++)for(const from of connected){const d=distance(from,nodes[i]);if(d<best.d)best={d,i,from}}const to=nodes.splice(best.i,1)[0],mid={x:clamp((best.from.x+to.x)/2+this.integer(-60,60),20,map.width-20),y:clamp((best.from.y+to.y)/2+this.integer(-50,50),20,map.height-20)};map.roads.push({points:[{x:best.from.x,y:best.from.y},mid,{x:to.x,y:to.y}],wide:this.roll()<.45});connected.push(to)}
   for(let i=0;i<9;i++)map.forests.push({x:this.integer(50,map.width-50),y:this.integer(50,map.height-50),radius:this.integer(100,210)});
   this.populateGroups(map);map.groupLayoutVersion=3;
   return map;
  }
  populateGroups(map){
   while(map.groups.length<8){const i=map.groups.length,type=map.groups.filter(g=>g.type==='dogs').length<4?'dogs':'boars';let p=null;
    const region={x:260+(i%4)*(B.world.width-480)/3,y:i<4?265:B.world.height-265};
    for(let tries=0;tries<12000;tries++){const candidate=tries<1500?{x:clamp(region.x+this.integer(-170,170),80,map.width-80),y:clamp(region.y+this.integer(-180,180),90,map.height-90)}:{x:this.integer(80,map.width-80),y:this.integer(90,map.height-90)};
     if(distance(candidate,map.camp)<=B.world.groupCampDistance||distance(candidate,map.exit)<=150||map.pois.some(q=>distance(candidate,q)<=B.world.groupPoiDistance)||map.groups.some(q=>distance(candidate,q)<=B.world.groupSeparation)||this.waterBlocked(candidate,map,60)||(this.s.map&&distance(candidate,this.s)<220))continue;p=candidate;break}
    if(!p)throw Error('Не удалось безопасно разместить группу мутантов');
    map.groups.push({...p,id:'g'+i,type,home:{...p},target:{...p},nextTurn:0,cooldown:0,warningAt:0,phase:this.roll()*6.28});
   }
  }
  spreadGroups(){
   const map=this.s.map,groups=map.groups.filter(g=>!g.defeated),pendingId=this.s.pending?.groupId;
   groups.sort((a,b)=>Number(b.id===pendingId)-Number(a.id===pendingId));
   for(let attempt=0;attempt<30;attempt++){const placed=[];let complete=true;
    for(const group of groups){let chosen=null;
     for(let tries=0;tries<12000;tries++){const p=tries===0&&attempt===0?{x:group.x,y:group.y}:{x:this.integer(80,map.width-80),y:this.integer(90,map.height-90)};
      if(distance(p,map.camp)<=B.world.groupCampDistance||distance(p,map.exit)<=150||map.pois.some(q=>distance(p,q)<=B.world.groupPoiDistance)||placed.some(q=>distance(p,q)<=B.world.groupSeparation)||this.waterBlocked(p,map,60)||distance(p,this.s)<220)continue;chosen=p;break}
     if(!chosen){complete=false;break}placed.push({...chosen,group});
    }
    if(complete){for(const p of placed)Object.assign(p.group,{x:p.x,y:p.y,home:{x:p.x,y:p.y},target:{x:p.x,y:p.y},nextTurn:0});map.groupLayoutVersion=3;return}
   }
   throw Error('Не удалось разнести группы мутантов');
  }
  artifact(rare=null){const type=this.pick(['stamina','speed','preparation']),range=B.artifacts[rare?'enhanced':'normal'][type];return{id:'a'+this.integer(1,9999999),type,value:Math.round(2*this.integer(...range)*2/3),name:rare?this.pick(B.enhancedNames)+' '+(rare==='chimera'?'Химеры':'Кровопийцы'):this.pick(B.artifactNames),sprite:this.integer(0,5),rare:!!rare}}
  artifactLabel(a){if(a.type==='heart')return `+${Math.round(a.bonuses.preparation)}% подготовки · +${Math.round(a.bonuses.speed)}% скорости · +${Math.round(a.bonuses.stamina)}% выносливости`;const value=Math.round(a.value);return a.type==='stamina'?`+${value} с выносливости`:a.type==='speed'?`+${value}% скорости`:`+${value}% подготовки`}
  receive(lines,artifact=null,title='Находки осмотрены'){
   const weaponIndex=this.s.lastWeaponFound,armorIndex=this.s.lastArmorFound;this.s.lastWeaponFound=null;this.s.lastArmorFound=null;
   const attachFoundItem=()=>{if(Number.isInteger(weaponIndex)){const w=B.weapons[weaponIndex];this.s.event.lootItem={kind:'weapon',index:weaponIndex,name:w.name,preparation:w.bonus}}else if(Number.isInteger(armorIndex)){const a=B.armor[armorIndex];this.s.event.lootItem={kind:'armor',index:armorIndex,name:a.name,preparation:a.bonus,anomalyProtection:Math.round(a.bonus*.3)}}}
   if(artifact&&this.s.artifacts.length>=B.artifacts.slots){this.s.pendingArtifact={artifact,lines,title};this.notice('Пояс заполнен',`Найден «${artifact.name}»: ${this.artifactLabel(artifact)}. Выбери замену или оставь находку.`,lines.join('\n'),this.s.artifacts.map((a,i)=>({id:'replaceArtifact',value:i,label:`${i+1}. Заменить «${a.name}» · ${this.artifactLabel(a)}`})).concat({id:'leaveArtifact',label:'Оставить находку'}),'АРТЕФАКТ');this.s.event.lootArtifact=artifact;attachFoundItem();return}
   if(artifact){this.s.artifacts.push(artifact);lines.push(`Артефакт «${artifact.name}»: ${this.artifactLabel(artifact)}.`)}
   if(!lines.length)lines.push('Ничего полезного не осталось.');this.s.stamina=Math.min(this.s.stamina,this.maxStamina());
   for(const line of lines)this.log(line,'good');this.notice(title,'',lines.join('\n'));if(artifact)this.s.event.lootArtifact=artifact;attachFoundItem();
  }
  money(min=10,max=200){const value=this.integer(min,max);this.s.money+=value;return `Найдено ${value} ₽.`}
  gear(laboratory=false){const s=this.s;if(laboratory){const armor=B.armor.length-1;if(s.armor<armor){s.armor=armor;s.lastArmorFound=armor;return B.armor[armor].name+' получен.'}return 'Броня уступает твоему снаряжению.'}
   const rank=this.weaponRank(),upgrades=B.weapons.map((w,i)=>({w,i})).filter(v=>v.w.rank===rank+1&&v.w.droppable!==false&&!(rank<0&&v.i===0)),candidate=upgrades.length?this.pick(upgrades):null;
   const routeProgress=clamp(s.distance/2200,0,1),militaryChance=.12+routeProgress*.38,isMilitary=candidate&&['rifle','sniper','svd'].includes(candidate.w.icon),militaryAllowed=!isMilitary||this.roll()<militaryChance;
   if(candidate&&militaryAllowed&&(this.roll()<.5||s.armor>=4)){this.setWeapon(candidate.i);return 'Оружие найдено: '+candidate.w.name+'.'}
   if(s.armor<3){s.armor++;s.lastArmorFound=s.armor;return 'Броня: '+B.armor[s.armor].name+'.'}
   return 'Твоё снаряжение лучше находки.';
  }
  revealTunnel(){
   const s=this.s,map=s.map;if(!s.secretMap||map.pois.some(p=>p.type==='tunnel'))return;
   const candidates=[];for(let y=55;y<=175;y+=20)for(let x=80;x<map.width-80;x+=20){const p={x,y};if(distance(p,map.exit)>190&&map.pois.every(q=>distance(p,q)>100)&&!(map.lakes||[]).some(l=>((p.x-l.x)/(l.rx+45))**2+((p.y-l.y)/(l.ry+35))**2<1))candidates.push(p)}
   if(!candidates.length)throw Error('Нет места для тайного тоннеля');
   const p=candidates[(Math.imul(s.seed,2654435761)>>>0)%candidates.length];
   map.pois.push({...p,id:'secret-tunnel',type:'tunnel',name:'Тайный тоннель',description:'За бетонной аркой тёмный ход уходит под границу Зоны.',searched:false});
  }
  secretMapStory(source){
   const type=source?.type||'trail';
   const setting={
    corpse:'В кармане мертвеца ты находишь',
    trail:'У дороги лежит мертвец. Во внутреннем кармане его куртки ты находишь',
    factory:'Под обломками перекрытия лежит погибший сталкер. В его нагрудном кармане ты находишь',
    house:'В углу комнаты, за опрокинутым шкафом, лежит мертвец. При нём ты находишь',
    bunker:'В дальнем углу бункера лежит тело. В кармане комбинезона ты находишь',
    dugout:'На истлевшей лежанке в землянке лежит мертвец. Под его курткой ты находишь',
    camp:'В промокшей палатке лежит погибший сталкер. При нём ты находишь',
    waterTower:'Под обломками лестницы водонапорной башни лежит тело. В кармане куртки ты находишь',
    cemetery:'За покосившейся оградой лежит мертвец. В его карманах ты находишь',
    cache:'Рядом с тайником, под ветками, скрыто тело сталкера. При нём ты находишь',
    bloodsucker:'Среди останков жертв кровопийцы ты находишь',
    chimera:'Возле растерзанного тела у логова химеры ты находишь'
   }[type]||'При погибшем сталкере ты находишь';
   const finding=this.pick(['потрёпанную карту. На севере обведён вход в тоннель. Рядом приписка: «Выход».','КПК с треснувшим экраном. На карте сохранилась отметка где-то на севере: «Тоннель. Выход из Зоны».']);this.s.secretMapKind=finding.startsWith('КПК')?'pda':'scroll';return setting+' '+finding;
  }
  initializeNotes(){
   if(this.s.notePool)return;
   // Separate seeded shuffle also migrates old saves without changing gameplay randomness.
   let state=(this.s.seed^0xA341316C)>>>0;
   const pool=B.fieldNotes.map(n=>n.id);
   for(let i=pool.length-1;i>0;i--){state=(Math.imul(state,1664525)+1013904223)>>>0;const j=Math.floor(state/4294967296*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
   this.s.notePool=pool.slice(0,15);this.s.foundNotes=[];
  }
  findNote(source){
   this.initializeNotes();
   if(source?.type==='house'&&source?.name==='Дом лесника'){if(this.s.foundNotes.includes(B.rangerNote.id)||this.roll()>=.90)return [];this.s.foundNotes.push(B.rangerNote.id);return [`В доме лесника найдена записка.\n${B.rangerNote.body}`]}
   if(source?.type==='pirateShip'||source?.type==='cargoShip'){if(this.s.foundNotes.includes(B.pirateNote.id))return [];this.s.foundNotes.push(B.pirateNote.id);return ['На палубе корабля найден бортовой журнал.'+String.fromCharCode(10)+B.pirateNote.body]}
   const type=({zombies:'corpse',hospital:'house',weatherStation:'waterTower',radar:'factory',sawmill:'factory',militaryDepot:'factory',boatStation:'camp',shoreCamp:'camp'})[source?.type]||source?.type;
   const note=this.s.notePool.map(id=>B.fieldNotes.find(n=>n.id===id)).find(n=>n&&!this.s.foundNotes.includes(n.id)&&n.places.includes(type));
   if(!note)return [];
   this.s.foundNotes.push(note.id);
   const setting={corpse:'В кармане погибшего найдена записка',wallet:'Среди забытых вещей найдена записка',cache:'В тайнике найдена записка',camp:'Среди вещей в лагере найдена записка',cemetery:'У могил найдена записка',waterTower:'Под опорами башни найдена записка',house:'В доме найдена записка',factory:'В цехе найдена записка',bunker:'В бункере найдена записка',dugout:'В землянке найдена записка'}[type]||'Найдена записка';
   const placeSetting={hospital:'В больничной палате найдена записка',weatherStation:'В аппаратной метеостанции найдена записка',radar:'В рубке радиолокационного комплекса найдена записка',sawmill:'В конторе лесопилки найдена записка',militaryDepot:'В военном складе найдена записка',boatStation:'В лодочной станции найдена записка',shoreCamp:'В заброшенном лагере у озера найдена записка'}[source?.type]||setting;
   return [`${placeSetting}.\n${note.body.replace(/\n\s*\n/g,'\n')}`];
  }
  rareItems({map=false,key=true,source=null,depotKey=true}={}){const lines=[];if(key&&!this.s.key&&this.roll()<B.loot.key){this.s.key=true;lines.push('Найдена ключ-карта от секретной лаборатории.')}if(depotKey&&!this.s.depotKey&&this.roll()<B.loot.depotKey){this.s.depotKey=true;lines.push('Найден тяжёлый ключ от старых военных складов.')}if(map&&!this.s.secretMap&&this.roll()<B.loot.secretMap){this.s.secretMap=true;this.revealTunnel();lines.push(this.secretMapStory(source))}return lines}
  poiLoot(p,initial=[]){const lines=[...initial,this.money()];if(this.roll()<.55)lines.push(this.gear());if(this.s.medkits<2&&this.roll()<B.loot.medkit){this.s.medkits++;lines.push('Найдена 1 аптечка.')}const special=['bunker','dugout','camp','waterTower','corpse','cache','supplyDrop','cemetery','hospital','weatherStation','radar','sawmill','boatStation','shoreCamp','cargoShip','pirateShip'].includes(p.type);
   if(p.type==='corpse'||(p.type==='house'&&p.name==='Дом лесника')||p.type==='pirateShip'||p.type==='cargoShip'||this.roll()<.30)lines.push(...this.findNote(p));lines.push(...this.rareItems({map:special||p.type==='sawmill',source:p}));this.receive(lines,null,p.name);
  }
  explore(id){const p=this.s.map.pois.find(p=>p.id===id);if(!p)return;
   if(p.type==='tunnel'){if(this.s.secretMap)this.notice(p.name,p.description,'Тоннель позволяет безопасно покинуть Зону.',[{id:'secretExit',label:'Войти в тоннель · покинуть Зону'},{id:'continue',label:'Остаться в Зоне'}],'ТАЙНЫЙ ПУТЬ');return}
   if(p.searched){this.notice(p.name,'Здесь больше нечего искать. Ты уже проверил каждый угол.','Исследована');return}
   if(p.type==='laboratory'&&!this.s.key){this.notice(p.name,p.description,'Закрыто. Нужна ключ-карта. Шанс найти её при исследовании — 5%.');return}
   if(p.type==='militaryDepot'&&!this.s.depotKey){this.notice(p.name,p.description,'Ворота заперты. Нужен тяжёлый ключ от старых военных складов. Шанс найти ключ при исследовании — 5%.');return}
   if(p.type==='anomaly'){this.anomaly(p);return}
   this.s.pending={kind:'poi',id};this.notice(p.name,p.description,'Можно осмотреть место или продолжить путь.',[{id:'search',label:p.type==='laboratory'?'Открыть ключом и исследовать':'Исследовать'},{id:'continue',label:'Пройти мимо'}],'ИССЛЕДОВАНИЕ');
  }
  search(){const p=this.s.map.pois.find(p=>p.id===this.s.pending?.id);if(!p||p.searched)return;this.s.pending=null;p.searched=true;this.s.visited.push(p.id);
   if(p.type==='militaryDepot'){const canWeapon=this.weaponRank()<B.weapons[10].rank,canArmor=this.s.armor<4,weapon=canWeapon&&(!canArmor||this.roll()<.5);if(weapon){this.setWeapon(10);this.receive(['В запертом оружейном контейнере сохранился РПК.'],null,p.name)}else if(canArmor){this.s.armor=4;this.s.lastArmorFound=4;this.receive(['В складе уцелел лёгкий экзоскелет.'],null,p.name)}else if(canWeapon){this.setWeapon(10);this.receive(['В запертом оружейном контейнере сохранился РПК.'],null,p.name)}else this.receive(['Склад уже разобран. Пригодного снаряжения не осталось.'],null,p.name);return}
   if(p.type==='laboratory'){const reward=this.integer(0,4);const lines=['Лаборатория открыта и исследована.'];if(reward===0){lines.push(this.gear(true));this.receive(lines)}else if(reward===1){if(this.weaponRank()<B.weapons[8].rank){this.setWeapon(8);lines.push('Найдено оружие Гаусса.')}else lines.push('Оружие Гаусса уже есть.');this.receive(lines)}else this.receive(lines,this.artifact());return}
   if(['corpse','cache','supplyDrop','wallet','backpack'].includes(p.type)){this.poiLoot(p);return}
   if(this.roll()<.47){let type=p.type==='cemetery'?'zombies':this.pick(['indoorDog','trap','infected','unknown','bandits']);this.encounter(type,{poiId:p.id});return}this.poiLoot(p);
  }
  anomaly(p){this.s.pending={kind:'anomaly',id:p.id||null,name:p.name,element:p.element};this.notice(p.name,p.description||this.text(p.element),`Шанс достать артефакт: ${Math.round(this.anomalyChance())}%.`,[{id:'takeAnomaly',label:'Достать артефакт'},{id:'skipAnomaly',label:'Пройти мимо'}],'АНОМАЛИЯ')}
  takeAnomaly(){const pending=this.s.pending;if(!pending||pending.kind!=='anomaly')return;this.s.pending=null;const p=this.s.map.pois.find(p=>p.id===pending.id);if(p?.searched){this.notice(p.name,'Здесь больше нечего искать. Ты уже проверил каждый угол.','Исследована');return}this.s.encounters++;
   const success=this.roll()*100<this.anomalyChance();
   if(!success&&this.roll()<1/3){if(p){p.searched=true;this.s.visited.push(p.id)}this.s.hp=0;this.finish('defeat','Аномалия «'+pending.name+'» сомкнулась. Выбраться не удалось.');return}
   const damage=success?(this.roll()<.30?this.integer(1,2):0):this.integer(1,4);
   this.s.hp=Math.max(0,this.s.hp-damage);
   if(this.s.hp===0){this.finish('defeat',`Ранения в аномалии «${pending.name}» оказались смертельными. Потеряно ${damage} секц. здоровья.`);return}
   if(!success){const message=`Ты с трудом выбрался из аномалии. Потеряно ${damage} секц. здоровья. Аномалию можно исследовать ещё раз.`;this.log(message);this.notice('Удалось выжить',message,'');return}
   if(p){p.searched=true;this.s.visited.push(p.id)}
   const lines=[damage?`Артефакт извлечён, но аномалия задела тебя. Потеряно ${damage} секц. здоровья.`:'Ты извлёк артефакт без ранений.'];
   this.receive(lines,this.artifact(),'Артефакт извлечён');
  }
  randomEvent(){
   const rare=this.roll();if(rare<B.encounters.chimera){this.encounter('chimera');return}if(rare<B.encounters.chimera+B.encounters.bloodsucker){this.encounter('bloodsucker');return}
   const cemetery=this.s.map.pois.some(p=>p.type==='cemetery'&&distance(this.s,p)<150);if(cemetery&&this.roll()<B.encounters.zombieNearCemetery){this.encounter('zombies');return}
   const r=this.roll();if(r<.10)this.encounter('dogs');else if(r<.20)this.encounter('boars');else if(r<.49)this.encounter('bandits');else if(r<.76){const element=this.pick(['acid','electric','fire','gravity']),p={id:`roaming-anomaly-${this.s.run}-${Math.floor(this.s.distance)}-${this.s.encounters}`,type:'anomaly',name:this.pick(B.anomalyFirst)+' '+this.pick(B.anomalySecond),element,description:this.text(element),x:this.s.x,y:this.s.y,searched:false};this.anomaly(p)}else if(r<.80)this.bodyDiscovery('bodyRoad');else if(r<.84)this.bodyDiscovery('bodyRavine');else if(r<.88)this.bodyDiscovery('bodyTree');else{const lines=[this.eventText('trail'),this.money(),...this.rareItems({map:true,source:{type:'trail'}})];this.receive(lines,null,'Следы на тропе')}
  }
  nearbyGroup(type){
   if(!['dogs','boars'].includes(type))return null;
   return this.s.map.groups.filter(g=>!g.defeated&&g.type===type&&distance(g,this.s)<170).sort((a,b)=>distance(a,this.s)-distance(b,this.s))[0]||null;
  }
  encounter(type,extra={}){const group=extra.groupId?null:!extra.poiId&&!extra.bodyId&&this.nearbyGroup(type);if(group){extra={...extra,groupId:group.id};group.cooldown=B.encounters.groupCooldown;group.nextTurn=0}this.s.pending={kind:'encounter',type,...extra};const names={dogs:'Стая слепых псов',boars:'Группа кабанов',indoorDog:'Собака в помещении',bandits:'Засада',bloodsucker:'Кровопийца',chimera:'Химера',zombies:'Фигуры среди могил',trap:'Ловушка',infected:'Заражённый участок',unknown:'Неизвестное существо'};this.s.soundCue=type;
   this.notice(names[type],this.eventText(type),`Шанс пройти без ранений: ${Math.round(this.combatChance(type))}%. Отступить: ${this.escapeChance(type)}%.`,[{id:'resolve',label:'Пройти встречу'},{id:'escape',label:'Попытаться отступить'}],['bloodsucker','chimera'].includes(type)?'ОСОБАЯ УГРОЗА':'ВСТРЕЧА');
  }
  bodyDiscovery(type){const titles={bodyRoad:'Покойник у просеки',bodyRavine:'Покойник в овраге',bodyTree:'Парашютист в ветвях'};this.s.pending={kind:'bodyDiscovery',type};this.s.soundCue='discovery';this.notice(titles[type],this.eventText(type),'Можно обыскать вещи или оставить их здесь.',[{id:'searchBody',label:'Обыскать'},{id:'leaveBody',label:'Идти дальше'}],'НАХОДКА')}
  searchBody(){const pending=this.s.pending;if(pending?.kind!=='bodyDiscovery')return;this.s.pending=null;this.s.encounters++;const source={type:'corpse',name:pending.type==='bodyTree'?'Парашютист':'Покойник'};const lines=[this.money()];if(this.roll()<.55)lines.push(this.gear());if(this.s.medkits<2&&this.roll()<B.loot.medkit){this.s.medkits++;lines.push('Найдена 1 аптечка.')}lines.push(...this.findNote(source),...this.rareItems({map:true,source}));this.receive(lines,null,'Вещи погибшего');}
  resolve(){const e=this.s.pending;if(e?.kind!=='encounter')return;if(!e.groupId&&!e.poiId)e.groupId=this.nearbyGroup(e.type)?.id;this.s.pending=null;this.s.encounters++;const success=this.roll()*100<this.combatChance(e.type);const rare=['bloodsucker','chimera'].includes(e.type);let damage=0;
   if(!success){damage=this.roll()<.25||rare?2:1;if(this.roll()<(rare?.12:.035)||this.s.hp<=damage){this.finish('defeat','Встреча оказалась последней.');return}this.s.hp-=damage}
   const lines=[success?'Опасность позади. Здоровье сохранено.':`Ты выбрался. Потеряно ${damage} секц. здоровья.`];const p=this.s.map.pois.find(p=>p.id===e.poiId);
   if(success&&e.groupId){const group=this.s.map.groups.find(g=>g.id===e.groupId);if(group){group.defeated=true;lines.push('Группа мутантов побеждена. Здесь она больше не появится.')}}
   if(p&&e.type!=='zombies'){this.poiLoot(p,lines);return}
   if(['dogs','boars','indoorDog','bloodsucker','chimera'].includes(e.type)){
    if(success){lines.push('Части мутанта обменены: '+this.money());if(rare){lines.push(...this.rareItems({map:true,source:p||{type:e.type}}));this.receive(lines,this.artifact(e.type),'Сердце мутанта');return}}
   }else if(e.type==='zombies'){if(this.roll()<.9){lines.push(this.money(...B.loot.zombieMoney));if(this.roll()<.6)lines.push(...this.findNote({type:'corpse'}))}else lines.push('В карманах только мокрая пыль.');if(p){if(this.s.medkits<2&&this.roll()<B.loot.medkit){this.s.medkits++;lines.push('В укрытии найдена 1 аптечка.')}lines.push(...this.rareItems({map:true,source:p||{type:e.type}}))}}
   else if(e.type==='bandits')lines.push(this.gear());this.receive(lines,null,success?'Находки':'Удалось выжить');
  }
  escape(){const e=this.s.pending;if(e?.kind!=='encounter'||e.escapeAttempted)return;e.escapeAttempted=true;if(this.roll()*100<this.escapeChance(e.type)){this.s.encounters++;this.s.escaped++;this.s.pending=null;this.notice('Ты отступил','Угроза осталась позади.','Здоровье и вещи сохранены. Добыча не получена.');return}this.notice('Отступить не удалось',this.text(e.type),'Придётся пройти встречу. Повторной попытки отступить нет.',[{id:'resolve',label:'Пройти встречу'}],'ВСТРЕЧА')}
  border(){if(this.s.mode==='finished')return;this.s.gateBlocked=true;const odds=this.borderOdds();const actions=[];if(this.s.money>=B.bribe)actions.push({id:'confirmPay',label:'Заплатить 10 000 ₽'});actions.push({id:'breakthrough',label:'Прорываться через границу'},{id:'continue',label:'Вернуться в Зону'});
   this.notice('Последний переход',`Подготовка к выходу: ${this.preparation()}% · ${this.s.money.toLocaleString('ru-RU')} ₽`,`${this.s.secretMap?'Тайный тоннель отмечен на севере карты. До него нужно добраться.':'Карты тайного пути нет.'}\nПрорыв: успех ${odds.success}% · отступление ${odds.retreat}% · поражение ${odds.defeat}%.`,actions,'ГРАНИЦА');
  }
  breakthrough(){const odds=this.borderOdds(),r=this.roll()*100;if(r<odds.success)this.finish('victory','Прорыв через границу');else if(r<odds.success+odds.retreat){this.s.x=this.s.map.exit.x-115;this.s.y=this.s.map.exit.y+100;this.s.gateBlocked=true;this.notice('Пришлось отступить','Ты вернулся под прикрытие леса.','Здоровье, деньги и предметы сохранены. Можно подготовиться и повторить попытку.')}else this.finish('defeat','Попытка прорыва закончилась поражением.')}
  pay(){if(this.s.money<B.bribe){this.border();return}this.s.money-=B.bribe;this.finish('victory','Мирный выход. Уплачено 10 000 ₽.')}
  finish(outcome,reason){this.s.outcome=outcome;if(outcome==='defeat')this.s.hp=0;this.s.pending=null;this.s.event={tag:outcome==='victory'?'ЗОНА ПОЗАДИ':'СВЯЗЬ ПОТЕРЯНА',title:outcome==='victory'?'Ты выбрался.':'Вылазка завершена.',body:reason,details:`Подготовка к выходу: ${this.preparation()}%\nДеньги: ${this.s.money.toLocaleString('ru-RU')} ₽\nПройдено ${Math.floor(this.s.distance)} м · исследовано ${this.s.visited.length}\nВстреч: ${this.s.encounters} · здоровье: ${this.s.hp}/5\nСектор ${String(this.s.sector).padStart(2,'0')}`,actions:[{id:'newRun',label:'Новая вылазка'}]};this.s.mode='finished';this.log(reason)}
  heal(index=0){if(index>=this.s.medkits||this.s.hp>=5||this.s.hp<=0||this.s.mode==='finished')return false;this.s.medkits--;this.s.hp++;this.log('Аптечка: восстановлена одна секция сердца.','good');return true}
  startRest(){
   const s=this.s;if(s.mode!=='playing')return;
   s.mode='rest';s.restTime=0;s.extendedRest=false;s.restHealed=false;s.restHealing=0;s.restCamp={x:s.x,y:s.y,variant:this.integer(0,3)};
   this.log('Ты развёл небольшой костёр. Полный отдых восстановит силы и 1–3 секции здоровья.');
  }
  nearest(){let closest=null,d=Infinity;for(const p of this.s.map.pois){const v=distance(this.s,p);if(v<62&&v<d){d=v;closest=p}}return closest}
  moveGroups(dt){for(const group of this.s.map.groups){
   if(group.defeated)continue;
   group.cooldown=Math.max(0,group.cooldown-dt);group.warningAt=Math.max(0,group.warningAt-dt);group.nextTurn-=dt;
   if(group.nextTurn<=0||distance(group,group.target)<10){let target=null;for(let tries=0;tries<36;tries++){const q={x:clamp(group.home.x+this.integer(-190,190),70,B.world.width-70),y:clamp(group.home.y+this.integer(-170,170),70,B.world.height-70)};if(!this.waterBlocked(q,this.s.map,24)){target=q;break}}group.target=target||{...group.home};group.nextTurn=this.integer(7,17)}
    const d=distance(group,group.target),speed=group.type==='dogs'?15:10;if(d>1){const next={x:group.x+(group.target.x-group.x)/d*speed*dt,y:group.y+(group.target.y-group.y)/d*speed*dt};const safe=distance(next,this.s.map.camp)>B.world.groupCampDistance&&distance(next,this.s.map.exit)>130&&!this.waterBlocked(next,this.s.map,14)&&this.s.map.groups.every(q=>q===group||q.defeated||distance(q,next)>B.world.groupMovingSeparation)&&this.s.map.pois.every(p=>distance(p,next)>B.world.groupPoiDistance);if(safe){group.x=next.x;group.y=next.y}else group.nextTurn=0}
   const playerDist=distance(group,this.s);if(this.s.mode==='playing'&&playerDist<170&&group.warningAt===0){this.log(group.type==='dogs'?'Рядом слышны лай и движение стаи.':'В кустах тяжело фыркают. Слышен хруст веток.');group.warningAt=30}
   if(playerDist<33&&group.cooldown===0&&this.s.mode==='playing'){group.cooldown=B.encounters.groupCooldown;group.nextTurn=0;this.s.nextEncounter=this.s.distance+this.encounterGap();this.encounter(group.type,{groupId:group.id});return}
  }}
  update(dt,dx=0,dy=0){dt=clamp(dt,0,.1);const s=this.s;
   if(s.mode==='camp'){s.ambientTime=(s.ambientTime||0)+dt;this.moveGroups(dt);return}
   if(s.mode==='rest'){s.restTime=Math.round((s.restTime+dt)*1e9)/1e9;s.stamina=clamp(s.stamina+B.movement.recoveryPerSecond*dt,0,this.maxStamina());
    if(!s.restHealed&&s.restTime>=B.movement.restLock&&s.stamina>=this.maxStamina()){
     const recovery=this.integer(1,3);s.restHealing=Math.min(5-s.hp,recovery);s.hp+=s.restHealing;s.restHealed=true;
     this.log('Полный отдых завершён. Восстановлено секций здоровья: '+s.restHealing+'.','good');
    }return}
   if(s.mode!=='playing')return;s.elapsed+=dt;s.weatherTimer-=dt;if(s.weatherTimer<=0){s.weather=this.pick(['wind','rain','fog','clear']);s.weatherTimer=this.integer(45,85);this.log({wind:'Ветер усилился. Листья шуршат на тропе.',rain:'Начался мелкий дождь.',fog:'Туман стелется ниже. Опасность засад и аномалий +8 п.п.',clear:'Холодный свет пробился сквозь облака.'}[s.weather])}
   this.moveGroups(dt);if(s.mode!=='playing')return;
    const length=Math.hypot(dx,dy);if(length>0){const ox=s.x,oy=s.y,step=Math.min(dt,s.stamina),next={x:clamp(s.x+dx/length*this.speed()*step,18,B.world.width-18),y:clamp(s.y+dy/length*this.speed()*step,18,B.world.height-18)},blocked=this.terrainBlocked(next,s.map,7);if(blocked){s.blockedByTerrain=blocked;s.blockedByWater=blocked==='water';return}s.blockedByTerrain=null;s.blockedByWater=false;s.x=next.x;s.y=next.y;const moved=distance(s,{x:ox,y:oy});if(moved>0){s.distance+=moved;s.steps+=moved;s.stamina=Math.max(0,s.stamina-step);if(dx)s.facing=Math.sign(dx)}
    if(s.stamina<=.00001){s.stamina=0;this.startRest();return}
    const campDistance=distance(s,s.map.camp);if(!s.campReturnArmed&&campDistance>185)s.campReturnArmed=true;
    if(s.campReturnArmed&&!s.campStrangerSeen&&campDistance<62){s.campStrangerSeen=true;this.notice('Кто-то у твоего костра','У палатки сидит человек в твоём стартовом снаряжении. Он смотрит перед собой пустыми глазами и не отвечает.','Ты окликаешь его ещё раз. Никакой реакции. Странно.',[{id:'continue',label:'Отойти от костра'}],'СТАРТОВЫЙ ЛАГЕРЬ');return}
    if(distance(s,s.map.exit)<47&&!s.gateBlocked){this.border();return}if(distance(s,s.map.exit)>95)s.gateBlocked=false;
    if(s.distance>=s.nextEncounter){s.nextEncounter=s.distance+this.encounterGap();this.randomEvent()}
   }
  }
  act(id,value){const s=this.s;
   if(id==='makeCamp'){this.startRest();return}
   if(id==='begin'&&s.mode==='camp'){s.mode='playing';return}
   if(id==='restResume'&&s.mode==='rest'&&s.restTime>=B.movement.restLock){s.mode='playing';s.restCamp=null;return}
   if(id==='restStay'&&s.mode==='rest'){s.extendedRest=true;return}
   if(id==='inspect'&&s.mode==='playing'){const p=this.nearest();if(p)this.explore(p.id);return}
   if(id==='pause'&&['playing','rest','camp'].includes(s.mode)){s.previousMode=s.mode;this.notice('Пауза','Вылазка приостановлена.','',[{id:'resume',label:'Продолжить'},{id:'confirmNew',label:'Новая вылазка'}],'ПАУЗА');return}
   if(id==='resume'){s.mode=s.previousMode||'playing';s.event=null;s.previousMode=null;return}
   if(id==='confirmNew'){this.notice('Начать заново?','Текущая вылазка и все находки будут потеряны.','',[{id:'resume',label:'Остаться'},{id:'newRun',label:'Начать заново'}]);return}
   if(!['dialog','finished'].includes(s.mode))return;
   if(!s.event?.actions.some(a=>a.id===id&&(a.value===undefined||a.value===value)))return;
   if(id==='searchBody'){this.searchBody();return}if(id==='leaveBody'){s.pending=null;s.mode='playing';s.event=null;return}
   if(id==='continue'){s.mode='playing';s.event=null;s.pending=null;return}
   if(id==='search')this.search();else if(id==='resolve')this.resolve();else if(id==='escape')this.escape();else if(id==='takeAnomaly')this.takeAnomaly();
   else if(id==='skipAnomaly'){s.pending=null;s.mode='playing';s.event=null;this.log('Аномалия безопасно обойдена. Без потерь.');}
   else if(id==='replaceArtifact'||id==='leaveArtifact'){const pending=s.pendingArtifact;if(!pending)return;s.pendingArtifact=null;const lines=pending.lines;if(id==='replaceArtifact'){if(!Number.isInteger(value)||value<0||value>=s.artifacts.length)return;const old=s.artifacts[value];s.artifacts[value]=pending.artifact;lines.push(`«${old.name}» заменён на «${pending.artifact.name}»: ${this.artifactLabel(pending.artifact)}.`)}else lines.push('Находка оставлена. Пояс сохранён.');this.receive(lines,null,pending.title)}
   else if(id==='confirmPay')this.notice('Мирный выход','Заплатить военным 10 000 ₽?','После оплаты ты гарантированно покинешь Зону.',[{id:'pay',label:'Подтвердить оплату'},{id:'border',label:'Вернуться к вариантам'}],'ГРАНИЦА');
   else if(id==='pay')this.pay();else if(id==='border')this.border();else if(id==='secretExit'&&s.secretMap&&s.map.pois.some(p=>p.type==='tunnel'&&distance(s,p)<62))this.finish('victory','Выход по карте тайного пути.');else if(id==='breakthrough')this.breakthrough();
  }
  upgradeArtifacts(){
   const s=this.s;if(s.artifactPowerVersion===3)return;const factor=s.artifactPowerVersion===2?2/3:4/3;
   const scale=a=>{if(a.type==='heart')for(const key of ['preparation','speed','stamina'])a.bonuses[key]=Math.round(a.bonuses[key]*factor);else if(Number.isFinite(a.value))a.value=Math.round(a.value*factor)};
   for(const a of s.artifacts)scale(a);
   const pending=s.pendingArtifact;if(pending){scale(pending.artifact);
    if(s.event?.tag==='АРТЕФАКТ'){
     s.event.body=`Найден «${pending.artifact.name}»: ${this.artifactLabel(pending.artifact)}. Выбери замену или оставь находку.`;
     for(const action of s.event.actions)if(action.id==='replaceArtifact'){const a=s.artifacts[action.value];if(a)action.label=`${action.value+1}. Заменить «${a.name}» · ${this.artifactLabel(a)}`}
    }
   }
   s.artifactPowerVersion=3;
  }
  upgradeAnomalyLayout(){
   const map=this.s.map;if(map.anomalyLayoutVersion===2)return;
   let state=(this.s.seed^0x51F15E)>>>0;
   const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296};
   let pending=false;
   for(const p of map.pois.filter(q=>q.type==='anomaly'&&!q.searched)){
    if(this.s.pending?.id===p.id){pending=true;continue}
    const buildings=map.pois.filter(q=>!['anomaly','corpse','cache','wallet','backpack','tractor','tank','apc','truck','combine','helicopter','crashSite','fighter'].includes(q.type));
    if(buildings.some(q=>distance(p,q)<210)||distance(p,map.camp)<240||distance(p,map.exit)<240){Object.assign(p,this.mapPosition(map,'anomaly',random,p))}
   }
   if(!pending)map.anomalyLayoutVersion=2;
  }
  upgradeWorld(){
   const s=this.s,map=s.map;
   const legacyWidth=map.width,legacyHeight=map.height;
   if((legacyWidth===1600&&legacyHeight===1000)||(legacyWidth===1900&&legacyHeight===1200)){
    map.width=B.world.width;map.height=B.world.height;
    if(legacyWidth===1600){
     const additions=[['hospital','Заброшенная больница',310],['weatherStation','Метеостанция',700],['radar','Радиолокационный комплекс',1090]];
     for(const [type,name,y] of additions){
      const p={id:'expansion-'+type,type,name,x:2040,y,description:B.texts[type][0],variant:0,searched:false};
      const near=[map.camp,...map.pois,map.exit].sort((a,b)=>distance(a,p)-distance(b,p))[0];
      if(!map.pois.some(q=>q.id===p.id)){map.pois.push(p);map.roads.push({wide:true,points:[{x:near.x,y:near.y},{x:p.x,y:p.y}]})}
     }
     map.forests.push({x:2020,y:500,radius:130},{x:2030,y:1270,radius:135});
    }
    if(legacyWidth===1600)map.forests.push({x:800,y:1320,radius:160});
   }
   if(s.campPositionVersion!==2){
    if((s.mode==='camp'||s.previousMode==='camp')&&distance(s,map.camp)<25){s.x=map.camp.x+48;s.y=map.camp.y+8}
    s.campPositionVersion=2;
   }
  }
  serialize(){return JSON.stringify(this.s)}
  static restore(data){const s=typeof data==='string'?JSON.parse(data):data;Expedition.normalizeWeapons(s);if(!s||s.version!==3||!s.map||!((s.map.width===B.world.width&&s.map.height===B.world.height)||(s.map.width===1900&&s.map.height===1200)||(s.map.width===1600&&s.map.height===1000))||!Array.isArray(s.map.pois)||![4,8].includes(s.map.groups?.length)||!Array.isArray(s.artifacts)||s.artifacts.length>6||!Number.isFinite(s.hp)||s.hp<0||s.hp>5||!Number.isFinite(s.x)||!Number.isFinite(s.y)||!B.weapons[s.weapon]||!B.armor[s.armor])throw Error('Неподходящее сохранение');const e=Object.create(Expedition.prototype);e.s=s;if(!Number.isInteger(s.startingWeapon)||!B.weapons[s.startingWeapon])s.startingWeapon=(s.seed>>>0)&1?0:1;s.campReturnArmed=!!s.campReturnArmed;s.campStrangerSeen=!!s.campStrangerSeen;e.upgradeWeaponSlots();e.upgradeWorld();e.upgradeAnomalyLayout();e.initializeNotes();e.upgradeArtifacts();if(!s.encounterSpacingVersion){s.nextEncounter=s.distance+Math.max(0,s.nextEncounter-s.distance)*2;s.encounterSpacingVersion=2}e.populateGroups(s.map);if(s.map.groupLayoutVersion!==3)e.spreadGroups();e.revealTunnel();if(s.mode==='dialog'&&s.pending?.kind==='anomaly'&&s.event?.tag==='АНОМАЛИЯ')e.anomaly({...s.pending,description:s.event.body});if(s.event?.tag==='ГРАНИЦА')s.event.actions=s.event.actions.filter(a=>a.id!=='secretExit');return e}
 }
 return {Expedition,B,clamp,distance};
})();
if(typeof module!=='undefined'){require('./content.js')(Zone);module.exports=Zone;}
