'use strict';
// Additional world content is shared by the browser and engine tests.
function installZoneContent(Zone){
 const {Expedition:E,B,distance,clamp}=Zone,P=E.prototype;
 const vehicles=['tractor','tank','apc','helicopter','crashSite','fighter','truck','combine'];
 const small=['anomaly','cache','supplyDrop','wallet','backpack',...vehicles];
 B.weapons[-1]={name:'Без оружия',bonus:0,icon:'none',rank:-1};
 const descriptions={tractor:'Ржавый трактор зарос травой. Кабина перекошена, под сиденьем что-то блестит.',tank:'Обгоревший танк врос гусеницами в землю. Люк приоткрыт, внутри темно.',apc:'Брошенный БТР осел на днище. Бронедверь приоткрыта, в салоне остались вещи экипажа.',truck:'Останки грузовика лежат в кювете. Кабина смята, тент порван, ящики выброшены на дорогу.',combine:'Заржавевший комбайн застыл на краю поля. Жатка забита сухими стеблями, кабина разбита.',helicopter:'Разбитый вертолёт лежит на боку. Лопасти смяты, среди обшивки виден десантный отсек.',crashSite:'Борозда жёсткой посадки заканчивается обломками кабины. Среди искорёженного металла сохранились вещи экипажа.',fighter:'Останки истребителя разбросаны по поляне. В расколотой кабине уцелел аварийный комплект.',backpack:'Промокший рюкзак валяется среди травы. Потёртые лямки и закопчённые карманы ещё целы.',cache:'Земля и корни скрывают небольшой тайник. Крышка заржавела, но ещё держится.',supplyDrop:'Сброшенный для помощи груз ударился о землю и раскрылся. Разорванный парашют зацепился за ящики; внутри ещё могут быть припасы.',militaryDepot:'Старый военный склад из железобетона и ржавого листового металла. За тяжёлой дверью могут уцелеть оружие и защитное снаряжение. Замок закрыт.',abyss:'Чёрная дыра разверзлась в земле. Тьма зовёт заглянуть в неё. Ей так трудно сопротивляться.',bubble:'Над травой дрожит мыльный пузырь. В радужной плёнке отражается совершенно другое место.',boatStation:'У тихого берега стоит старая лодочная станция. Покосившийся настил уходит в воду; у причала качается лодка, а на берегу ржавеет лебёдка.',shoreCamp:'На противоположном берегу раскинулся заброшенный детский лагерь. Между пустыми корпусами остались игровые площадки, перекошенные качели и выцветшие флажки. Кострище давно остыло.',pirateShip:'Среди деревьев лежит место крушения старого пиратского корабля. Корпус расколот, нос зарылся в землю, мачты сломаны, а над разбитой палубой скользит зеленоватое привидение. Откуда он здесь взялся — и что случилось с командой?'};
 Object.assign(B.texts,Object.fromEntries(Object.entries(descriptions).map(([k,v])=>[k,[v]])));
 B.texts.fireflies=['Огни перехватили путь. Свет мечется всё ближе, обжигая кожу.'];
 function segmentDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)}
 P.reserveLake=function(map){
  if(map.lakes?.length)return;
  let state=(this.s.seed^0x4C414B45)>>>0;const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296};
  const lake={rx:132+Math.round(random()*16),ry:91+Math.round(random()*14),seed:Math.floor(random()*0x7fffffff)};let best=null,bestScore=-Infinity,bestClear=null,bestClearScore=-Infinity;
  const crowded=map.pois.length>0,attempts=crowded?3200:220;
  for(let i=0;i<attempts;i++){
   lake.x=lake.rx+165+random()*(map.width-2*(lake.rx+165));lake.y=lake.ry+140+random()*(map.height-2*(lake.ry+140));
   const directions=crowded?12:4;
   for(let j=0;j<directions;j++){
    const angle=crowded?j*Math.PI/12:Math.floor(random()*4)*Math.PI/2,dx=Math.cos(angle)*(lake.rx+68),dy=Math.sin(angle)*(lake.ry+68),shore=[{x:lake.x+dx,y:lake.y+dy},{x:lake.x-dx,y:lake.y-dy}];
    if(shore.some(p=>distance(p,map.camp)<180||distance(p,map.exit)<180))continue;
    if(map.pois.some(p=>((p.x-lake.x)/(lake.rx+18))**2+((p.y-lake.y)/(lake.ry+14))**2<1))continue;
    if(map.groups.some(p=>((p.x-lake.x)/(lake.rx+30))**2+((p.y-lake.y)/(lake.ry+25))**2<1))continue;
    const clearance=Math.min(...shore.flatMap(p=>[distance(p,map.camp),distance(p,map.exit),...map.pois.map(q=>distance(p,q)),...map.groups.map(q=>distance(p,q))]));
    const score=clearance+(crowded?Math.min(...shore.map(p=>Math.min(p.x,p.y,map.width-p.x,map.height-p.y)))*.02:0),candidate={x:lake.x,y:lake.y,rx:lake.rx,ry:lake.ry,seed:lake.seed,shoreAngle:angle},clear=shore.every(p=>map.pois.every(q=>distance(p,q)>=(q.type==='anomaly'?300:270)))&&map.pois.every(q=>((q.x-lake.x)/(lake.rx+(q.type==='anomaly'?300:260)))**2+((q.y-lake.y)/(lake.ry+(q.type==='anomaly'?300:260)))**2>=1);
    if(clear&&score>bestClearScore){bestClearScore=score;bestClear=candidate}
    if(score>bestScore){bestScore=score;best=candidate;if(!crowded&&clearance>290)break}
   }
   if(!crowded&&best&&bestScore>290)break;
  }
  best=bestClear||best;if(!best)throw Error('Не удалось разместить озеро на карте');map.lakes=[best];map.lakeClearanceVersion=0;
 };
 P.lakeShore=function(lake){
  const ux=Math.cos(lake.shoreAngle),uy=Math.sin(lake.shoreAngle),edge=1/Math.sqrt(ux*ux/(lake.rx*lake.rx)+uy*uy/(lake.ry*lake.ry)),buildingEdge=(68*Math.abs(ux)+42*Math.abs(uy))*.78,d=Math.max(136,edge*1.04+buildingEdge);
  return[{x:lake.x+ux*d,y:lake.y+uy*d},{x:lake.x-ux*d,y:lake.y-uy*d}]
 };
 P.clearLakeApproach=function(map){
  if(map.lakeClearanceVersion>=3)return;
  let state=(this.s.seed^0x1A4ECAFE)>>>0;const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296},lake=map.lakes[0],shore=this.lakeShore(lake),nearLake=p=>((p.x-lake.x)/(lake.rx+(p.type==='anomaly'?300:260)))**2+((p.y-lake.y)/(lake.ry+(p.type==='anomaly'?300:260)))**2<1;
  for(const p of [...map.pois]){
   if(['boatStation','shoreCamp'].includes(p.type))continue;
   const min=p.type==='anomaly'?300:270;if(nearLake(p)||shore.some(q=>distance(p,q)<min)){
    const old={x:p.x,y:p.y};map.pois=map.pois.filter(q=>q!==p);const moved=this.contentPosition(map,p.element||p.type,random);p.x=moved.x;p.y=moved.y;map.pois.push(p);
    for(const road of map.roads||[])for(const point of road.points||[])if(Math.hypot(point.x-old.x,point.y-old.y)<.01){point.x=p.x;point.y=p.y}
   }
  }
  map.lakeClearanceVersion=3;
 };
 const baseMapPosition=P.mapPosition;P.mapPosition=function(map,type,random,ignore){this.reserveLake(map);return baseMapPosition.call(this,map,type,random,ignore)};
 P.contentPosition=function(map,type,random){
  const anomaly=['abyss','bubble','anomaly','fire','electric','acid','gravity'].includes(type),vehicle=vehicles.includes(type);let best=null,score=-1;
  for(let i=0;i<16000;i++){
   const p={x:65+random()*(map.width-130),y:65+random()*(map.height-130)};
   if(distance(p,map.camp)<240||distance(p,map.exit)<240)continue;
   if((map.lakes||[]).some(l=>((p.x-l.x)/(l.rx+250))**2+((p.y-l.y)/(l.ry+250))**2<1))continue;
   if((map.lakes||[]).some(l=>this.lakeShore(l).some(q=>distance(p,q)<(anomaly?300:270))))continue;
   if(map.pois.some(q=>distance(p,q)<Math.max(type==='cemetery'&&q.type==='cemetery'?650:(anomaly&&!small.includes(q.type))||(!small.includes(type)&&q.type==='anomaly')?210:vehicle?115:130,(q.type==='pirateShip'||q.type==='cargoShip'?155:['sawmill','hospital','radar','weatherStation','factory','boatStation','shoreCamp','checkpoint'].includes(q.type)?120:72)+(type==='pylon'?58:0))))continue;
   if(map.groups.some(q=>distance(p,q)<70))continue;
   const roadGap=Math.min(Infinity,...map.roads.flatMap(r=>r.points.slice(1).map((b,j)=>segmentDistance(p,r.points[j],b))));
   if(roadGap<(vehicle?40:18))continue;
   const value=Math.min(...map.pois.map(q=>distance(p,q)));if(value>score){best=p;score=value}
   if(i>1000&&best)return best;
  }
   if(!best&&anomaly){for(let i=0;i<60000;i++){const p={x:65+random()*(map.width-130),y:65+random()*(map.height-130)};if(distance(p,map.camp)<240||distance(p,map.exit)<240)continue;if((map.lakes||[]).some(l=>((p.x-l.x)/(l.rx+250))**2+((p.y-l.y)/(l.ry+250))**2<1||this.lakeShore(l).some(q=>distance(p,q)<300)))continue;if(map.pois.some(q=>distance(p,q)<(q.type==='anomaly'?210:145)))continue;if(map.groups.some(q=>distance(p,q)<70))continue;const roadGap=Math.min(Infinity,...map.roads.flatMap(r=>r.points.slice(1).map((b,j)=>segmentDistance(p,r.points[j],b))));if(roadGap<18)continue;return p}}
  if(!best&&type==='pylon'){for(let i=0;i<24000;i++){const p={x:65+random()*(map.width-130),y:65+random()*(map.height-130)};if(distance(p,map.camp)<170||distance(p,map.exit)<170)continue;if((map.lakes||[]).some(l=>((p.x-l.x)/(l.rx+35))**2+((p.y-l.y)/(l.ry+28))**2<1||this.lakeShore(l).some(q=>distance(p,q)<70)))continue;if(map.pois.some(q=>distance(p,q)<(q.type==='pirateShip'||q.type==='cargoShip'?213:['sawmill','hospital','radar','weatherStation','factory','boatStation','shoreCamp','checkpoint'].includes(q.type)?178:130))||map.groups.some(q=>distance(p,q)<50))continue;return p}}
  if(!best)throw Error('Нет свободного места для '+type);
  return best;
 };
 P.ensureLake=function(map){
  this.reserveLake(map);const lake=map.lakes[0],shore=this.lakeShore(lake),existing=[map.pois.find(p=>p.type==='boatStation'),map.pois.find(p=>p.type==='shoreCamp')];
  if(existing.every(Boolean)){
   for(let i=0;i<existing.length;i++){const p=existing[i],old={x:p.x,y:p.y};if((map.lakeVersion||0)<2){p.x=shore[i].x;p.y=shore[i].y}p.rotation=0;p.description=descriptions[p.type];if(p.type==='shoreCamp')p.name='Заброшенный детский лагерь';for(const road of map.roads||[])for(const point of road.points||[])if(Math.hypot(point.x-old.x,point.y-old.y)<1){point.x=p.x;point.y=p.y}}
   map.lakeVersion=2;this.clearLakeApproach(map);return
  }
  let state=(this.s.seed^0x4C414B45)>>>0;const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296};
  const points=[{type:'boatStation',name:'Старая лодочная станция',...shore[0],rotation:0,variant:Math.floor(random()*4),searched:false,description:descriptions.boatStation},{type:'shoreCamp',name:'Заброшенный детский лагерь',...shore[1],rotation:0,variant:Math.floor(random()*4),searched:false,description:descriptions.shoreCamp}];
  for(const p of points){if(map.pois.some(q=>q.type===p.type))continue;p.id=`lake-${p.type}`;map.pois.push(p);const sign=p.type==='boatStation'?1:-1,near=[map.camp,...map.pois.filter(q=>q!==p),map.exit].filter(q=>(q.x-lake.x)*sign*Math.cos(lake.shoreAngle)+(q.y-lake.y)*sign*Math.sin(lake.shoreAngle)>0).sort((a,b)=>distance(a,p)-distance(b,p))[0];if(near)map.roads.push({wide:false,points:[{x:p.x,y:p.y},{x:(p.x+near.x)/2,y:(p.y+near.y)/2},{x:near.x,y:near.y}]})}
  map.lakeVersion=2;this.clearLakeApproach(map);
 };
 P.ensureTerrainDecor=function(map){
  if(map.terrainDecorVersion>=2&&Array.isArray(map.terrainDecor)&&map.terrainDecor.length>=10&&!map.terrainDecor.some(p=>p.type==='crater'))return;
  let state=(this.s.seed^0xD3C0A715)>>>0;const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296},specs=[...Array(5).fill('reedPond'),...Array(5).fill('ravine')],placed=[];
  const radius=p=>['pirateShip','cargoShip'].includes(p.type)?115:['hospital','radar','weatherStation','sawmill','factory','boatStation','shoreCamp','checkpoint','militaryDepot'].includes(p.type)?88:vehicles.includes(p.type)?55:p.type==='anomaly'?72:48;
  for(const type of specs){let best=null,bestScore=-1;
   for(let i=0;i<5000;i++){
    const rx=type==='reedPond'?34+random()*21:50+random()*25,ry=type==='reedPond'?20+random()*12:13+random()*8,p={type,x:90+random()*(map.width-180),y:90+random()*(map.height-180),rx,ry,rotation:(random()-.5)*(type==='ravine'?1.8:.55),variant:Math.floor(random()*4)};
    if(distance(p,map.camp)<150+rx||distance(p,map.exit)<170+rx)continue;
    if((map.lakes||[]).some(l=>((p.x-l.x)/(l.rx+rx+75))**2+((p.y-l.y)/(l.ry+ry+65))**2<1))continue;
    if(map.pois.some(q=>distance(p,q)<radius(q)+Math.max(rx,ry)+35))continue;
    if((map.groups||[]).some(q=>distance(p,q)<Math.max(rx,ry)+75))continue;
    if((map.decorations||[]).some(q=>distance(p,q)<Math.max(rx,ry)+70)||placed.some(q=>distance(p,q)<Math.max(rx,ry)+Math.max(q.rx,q.ry)+55))continue;
    const roadGap=Math.min(Infinity,...map.roads.flatMap(r=>r.points.slice(1).map((b,j)=>segmentDistance(p,r.points[j],b))));if(roadGap<45+ry)continue;
    const score=Math.min(...map.pois.map(q=>distance(p,q)),...placed.map(q=>distance(p,q)));if(score>bestScore){best=p;bestScore=score}if(i>1200&&best)break;
   }
   if(best)placed.push(best)
  }
  map.terrainDecor=placed;map.terrainDecorVersion=2;
 };
P.clearWaterGroups=function(map){
  if(map.waterGroupVersion>=3)return;let state=(this.s.seed^0x57A7E251)>>>0;const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296};
  for(const g of map.groups||[]){const unsafe=this.waterBlocked(g,map,18)||map.pois.some(q=>distance(g,q)<B.world.groupPoiDistance);if(!unsafe)continue;for(let i=0;i<5000;i++){const p={x:80+random()*(map.width-160),y:80+random()*(map.height-160)};if(this.waterBlocked(p,map,65)||distance(p,map.camp)<B.world.groupCampDistance||distance(p,map.exit)<220||map.pois.some(q=>distance(p,q)<B.world.groupPoiDistance)||(map.terrainDecor||[]).some(q=>distance(p,q)<Math.max(q.rx,q.ry)+70)||map.groups.some(q=>q!==g&&!q.defeated&&distance(p,q)<B.world.groupSeparation))continue;g.x=p.x;g.y=p.y;g.home={...p};g.target={...p};g.nextTurn=0;break}}
 map.waterGroupVersion=3;
};
P.ensureLakeDecor=function(map){
 if(map.lakeDecorVersion>=1&&Array.isArray(map.lakeDecor))return;const lake=(map.lakes||[])[0];map.lakeDecor=[];if(!lake){map.lakeDecorVersion=1;return}
 let state=(this.s.seed^0x4C444543)>>>0;const random=()=>{let t=state=(state+0x6D2B79F5)>>>0;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296};
 if(random()<.5){const type=random()<.5?'ruinedPier':'boatWreck',angle=random()*Math.PI*2,radius=type==='ruinedPier'?.78:.42;map.lakeDecor.push({type,x:lake.x+Math.cos(angle)*lake.rx*radius,y:lake.y+Math.sin(angle)*lake.ry*radius,rotation:type==='ruinedPier'?angle+Math.PI/2:(random()-.5)*.5,phase:random()*Math.PI*2})}
 if(random()<.1)map.lakeDecor.push({type:random()<.5?'paperBoat':'dinosaur',offsetY:(random()-.5)*lake.ry*.55,phase:random()*Math.PI*2,direction:random()<.5?-1:1});
 map.lakeDecorVersion=1;
};
P.ensurePlayerDry=function(){
 const s=this.s,map=s.map;if(!this.terrainBlocked(s,map,7)){s.blockedByWater=false;s.blockedByTerrain=null;return}
 const origin={x:s.x,y:s.y};for(let radius=6;radius<=360;radius+=6)for(let i=0;i<48;i++){const angle=i*Math.PI/24,p={x:clamp(origin.x+Math.cos(angle)*radius,18,map.width-18),y:clamp(origin.y+Math.sin(angle)*radius,18,map.height-18)};if(!this.terrainBlocked(p,map,9)){s.x=p.x;s.y=p.y;s.blockedByWater=false;s.blockedByTerrain=null;s.waterPlayerVersion=2;return}}
 s.x=map.camp.x;s.y=map.camp.y;s.blockedByWater=false;s.blockedByTerrain=null;s.waterPlayerVersion=2;
};
P.ensureWorldContent=function(map){
  map.pois=map.pois.filter(p=>p.type!=='corpse'&&!(p.element==='bubble'&&p.searched));
  if(this.s.secretMap&&!this.s.secretMapKind){const finding=(this.s.log||[]).find(entry=>/КПК с треснувшим экраном|потрёпанную карту/.test(entry.text));this.s.secretMapKind=finding?.text.includes('КПК с треснувшим экраном')?'pda':'scroll'}
  const version=map.contentVersion||0;this.ensureLake(map);
  const ensurePylons=()=>{map.decorations=[];for(let i=0;i<5;i++){const p=this.contentPosition(map,'pylon',random);map.decorations.push({...p,type:'pylon'});map.pois.push({...p,id:'temp-pylon-'+i,type:'pylon'})}map.pois=map.pois.filter(p=>!p.id.startsWith('temp-pylon-'))};
  const migratePirateShip=()=>{let ships=map.pois.filter(p=>p.type==='cargoShip'||p.type==='pirateShip');if(!ships.length){const p=this.contentPosition(map,'pirateShip',random);ships=[{...p,id:'content-pirateShip-1',type:'pirateShip',name:'Старый пиратский корабль',description:descriptions.pirateShip,variant:0,searched:false}];map.pois.push(ships[0])}for(const p of ships){p.type='pirateShip';p.name='Старый пиратский корабль';p.description=descriptions.pirateShip}map.pois=map.pois.filter((p,i,a)=>p.type!=='pirateShip'||a.findIndex(q=>q.type==='pirateShip')===i);ensurePylons();map.contentVersion=8};
  let state=(this.s.seed^0x73FA912B)>>>0;const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296};
  const finish=()=>{
   const depots=map.pois.filter(p=>p.type==='militaryDepot'),keeper=depots.find(p=>p.searched)||depots[0];
   if(keeper){keeper.name='Старый военный склад';keeper.description=descriptions.militaryDepot;map.pois=map.pois.filter(p=>p.type!=='militaryDepot'||p===keeper)}
   else{const p=this.contentPosition(map,'militaryDepot',random);map.pois.push({...p,id:'content-militaryDepot-1',type:'militaryDepot',name:'Старый военный склад',description:descriptions.militaryDepot,variant:Math.floor(random()*4),searched:false})}
   this.ensureTerrainDecor(map);this.ensureLakeDecor(map);this.clearWaterGroups(map);map.contentVersion=11
  };
  if(version>=8){finish();return}if(version>=7){migratePirateShip();finish();return}
  const add=(type,name,element)=>{const targetType=element||type,count=map.pois.filter(p=>p.type===type).length,p=this.contentPosition(map,targetType,random);map.pois.push({...p,id:`content-${targetType}-${count+1}`,type,name,description:descriptions[targetType]||B.texts[type]?.[0]||'',element,variant:Math.floor(random()*4),searched:false})};
  const addCargo=()=>{if(!map.pois.some(p=>p.type==='cargoShip'||p.type==='pirateShip'))add('pirateShip','Старый пиратский корабль')};
  const addDepots=()=>{if(!map.pois.some(p=>p.type==='militaryDepot'))add('militaryDepot','Старый военный склад')};
  if(version>=6){addCargo();migratePirateShip();finish();return}
  if(version>=5){addCargo();migratePirateShip();finish();return}
  if(version>=4){addDepots();addCargo();migratePirateShip();finish();return}
  if(version>=3){for(const [type,name]of [['apc','Брошенный БТР'],['truck','Останки грузовика'],['combine','Заржавевший комбайн']])if(!map.pois.some(p=>p.type===type))add(type,name);addDepots();addCargo();migratePirateShip();finish();return}
  for(const p of map.pois)if(p.type==='wallet'){p.type='backpack';p.name='Брошенный рюкзак';p.description=descriptions.backpack}
  for(const p of map.pois)if(p.type==='cache'){p.name='Тайник';p.description=descriptions.cache}
  if(map.pois.filter(p=>p.type==='cemetery').length<2)add('cemetery','Забытое кладбище');
  if(!map.pois.some(p=>p.type==='sawmill'))add('sawmill','Заброшенная лесопилка');
  if(!map.pois.some(p=>p.type==='supplyDrop'))add('supplyDrop','Повреждённый груз');
  const abyss=random()<.30,bubble=random()<.30;
  if(abyss)add('anomaly','Чёрная бездна','abyss');if(bubble)add('anomaly','Мыльный пузырь','bubble');
  for(const [type,name] of [['tractor','Ржавый трактор'],['tank','Подбитый танк'],['apc','Брошенный БТР'],['helicopter','Разбитый вертолёт'],['crashSite','Место жёсткой посадки'],['fighter','Останки истребителя'],['truck','Останки грузовика'],['combine','Заржавевший комбайн']])if(!map.pois.some(p=>p.type===type))add(type,name);
  map.fireflies=map.groups.map((g,i)=>({...g,id:'f'+i,type:'fireflies',color:i%4,defeated:false,home:{...g.home},target:{...g.target},cooldown:0,warningAt:0}));
  addDepots();addCargo();migratePirateShip();finish();
 };
 const generate=P.generateMap;P.generateMap=function(){const map=generate.call(this);this.ensureWorldContent(map);return map};
 const restore=E.restore;E.restore=function(data){const e=restore.call(this,data);e.ensureWorldContent(e.s.map);e.ensurePlayerDry();if(e.s.encounterDensityVersion!==1){e.s.nextEncounter=e.s.distance+Math.max(0,e.s.nextEncounter-e.s.distance)*1.25;e.s.encounterDensityVersion=1}return e};
 P.activeGroups=function(){return this.s.night?this.s.map.fireflies||[]:this.s.map.groups};
 const near=P.nearbyGroup;P.nearbyGroup=function(type){if(type!=='fireflies')return near.call(this,type);return this.activeGroups().filter(g=>!g.defeated&&distance(g,this.s)<170).sort((a,b)=>distance(a,this.s)-distance(b,this.s))[0]||null};
 const move=P.moveGroups;P.moveGroups=function(dt){
  if(!this.s.night)return move.call(this,dt);
  for(const g of this.activeGroups()){
   if(g.defeated)continue;g.cooldown=Math.max(0,g.cooldown-dt);g.nextTurn-=dt;
    if(g.nextTurn<=0||distance(g,g.target)<10){g.target={x:clamp(g.home.x+this.integer(-180,180),60,this.s.map.width-60),y:clamp(g.home.y+this.integer(-150,150),60,this.s.map.height-60)};g.nextTurn=this.integer(7,17)}
    const d=distance(g,g.target);if(d>1){const p={x:g.x+(g.target.x-g.x)/d*12*dt,y:g.y+(g.target.y-g.y)/d*12*dt};if(distance(p,this.s.map.camp)>240&&this.activeGroups().every(q=>q===g||q.defeated||distance(p,q)>190)&&this.s.map.pois.every(q=>distance(p,q)>B.world.groupPoiDistance)){g.x=p.x;g.y=p.y}else g.nextTurn=0}
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
 P.nextDeveloperEncounter=function(){const queue=this.s.developerEncounterQueue;if(this.s.mode!=='playing'||!queue?.length)return;const type=queue.shift();this.encounter(type)};
 P.developerApply=function(items=[]){
  const selected=new Set(items),s=this.s,map=s.map,lake=map.lakes?.[0];
  if(selected.has('lakeDecor')&&lake){map.lakeDecor=[{type:'ruinedPier',x:lake.x-lake.rx*.7,y:lake.y-lake.ry*.18,rotation:.32,phase:0},{type:'boatWreck',x:lake.x+lake.rx*.28,y:lake.y+lake.ry*.18,rotation:-.22,phase:1},{type:'paperBoat',offsetY:-lake.ry*.18,phase:0,direction:1},{type:'dinosaur',offsetY:lake.ry*.2,phase:Math.PI,direction:-1}];map.lakeDecorVersion=1;map.renderVersion=(map.renderVersion||0)+1}
  if(selected.has('abyss')&&!map.pois.some(p=>p.element==='abyss'&&!p.searched)){let point=null;for(let radius=105;radius<=320&&!point;radius+=25)for(let i=0;i<24;i++){const a=i*Math.PI/12,q={x:clamp(s.x+Math.cos(a)*radius,55,map.width-55),y:clamp(s.y+Math.sin(a)*radius,55,map.height-55)};if(!this.terrainBlocked(q,map,55)&&map.pois.every(p=>distance(p,q)>95)){point=q;break}}point=point||this.contentPosition(map,'abyss',()=>this.roll());map.pois.push({...point,id:'developer-abyss-'+(map.renderVersion||0),type:'anomaly',element:'abyss',name:'Чёрная бездна',description:descriptions.abyss,variant:0,searched:false})}
  if(selected.has('depotKey'))s.depotKey=true;if(selected.has('labKey'))s.key=true;
  const encounters=['chimera','bloodsucker'].filter(type=>selected.has(type));if(encounters.length)s.developerEncounterQueue=(s.developerEncounterQueue||[]).concat(encounters);
  if(s.event?.tag==='ПАУЗА'){s.mode='playing';s.event=null;s.pending=null}this.nextDeveloperEncounter();
 };
 const act=P.act;P.act=function(id,value){let result;if(['studySpecial','leaveSpecial'].includes(id)&&this.s.mode==='dialog'&&this.s.event?.actions.some(a=>a.id===id))result=this.specialAnomaly(id==='leaveSpecial');else result=act.call(this,id,value);this.nextDeveloperEncounter();return result};
 const artifact=P.artifact;P.artifact=function(rare){if(!rare)return {...artifact.call(this),sprite:this.integer(0,11)};const reduced=()=>Math.round(this.integer(3,15)*2/3);return {id:'heart-'+this.integer(1,9999999),type:'heart',monster:rare,name:rare==='chimera'?'Сердце химеры':'Сердце кровопийцы',bonuses:{preparation:reduced(),speed:reduced(),stamina:reduced()},rare:true,sprite:rare==='chimera'?13:12}};
 const label=P.artifactLabel;P.artifactLabel=function(a){return a.type==='heart'?`+${Math.round(a.bonuses.preparation)}% подготовки · +${Math.round(a.bonuses.speed)}% скорости · +${Math.round(a.bonuses.stamina)}% выносливости`:label.call(this,a)};
 P.heartBonus=function(type){return this.s.artifacts.filter(a=>a.type==='heart').reduce((sum,a)=>sum+a.bonuses[type],0)};
 const prep=P.preparation,stamina=P.maxStamina;P.preparation=function(){return clamp(prep.call(this)+this.heartBonus('preparation'),0,100)};
 P.maxStamina=function(){return stamina.call(this)*(1+this.heartBonus('stamina')/100)};
 P.speed=function(){return B.movement.speed*(1+(this.s.artifacts.filter(a=>a.type==='speed').reduce((n,a)=>n+a.value,0)+this.heartBonus('speed'))/100)};
}
if(typeof module!=='undefined')module.exports=installZoneContent;else installZoneContent(Zone);
