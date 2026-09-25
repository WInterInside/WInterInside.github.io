'use strict';
function locationVisualRadius(p){if(['pirateShip','cargoShip'].includes(p.type))return 92;if(['hospital','radar','weatherStation','sawmill','factory','boatStation','shoreCamp','checkpoint'].includes(p.type))return 66;if(['tractor','tank','apc','truck','combine','helicopter','crashSite','fighter','supplyDrop'].includes(p.type))return 40;if(['backpack','wallet','cache','corpse'].includes(p.type))return 24;return p.type==='anomaly'?32:48}
function waterVisualBlocked(p,map,padding=0){return (map.lakes||[]).some(l=>((p.x-l.x)/(l.rx+padding))**2+((p.y-l.y)/(l.ry+padding*.78))**2<1)||(map.terrainDecor||[]).some(d=>d.type==='reedPond'&&((p.x-d.x)/(d.rx+padding))**2+((p.y-d.y)/(d.ry+padding*.78))**2<1)}
class WorldRenderer{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.seed=null;this.camera={x:0,y:0};this.zoom=.86;this.reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;this.particles=Array.from({length:85},(_,i)=>({x:seeded(i+11)()*960,y:seeded(i+78)()*540,k:seeded(i+183)()}))}
  rebuild(s){
   this.seed=s.seed;this.poiCount=s.map.pois.length;this.renderVersion=s.map.renderVersion||0;this.lakeDecorKey=JSON.stringify(s.map.lakeDecor||[]);const map=s.map;this.roads=this.connectRoads(map);this.ground=document.createElement('canvas');this.ground.width=map.width;this.ground.height=map.height;g=this.ground.getContext('2d');const r=seeded(s.seed+81);
  rect(g,0,0,map.width,map.height,'#4c5041');
  for(let i=0;i<38000;i++)rect(g,r()*map.width,r()*map.height,1+r()*5,1+r()*3,['#535344','#424c3e','#59594a','#43493d','#5e5b49'][Math.floor(r()*5)]);
  for(const road of this.roads){g.beginPath();road.points.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.lineWidth=road.wide?19:7;g.strokeStyle=road.wide?'#73705b':'#66634f';g.lineCap='round';g.lineJoin='round';g.stroke();if(road.wide){g.lineWidth=2;g.strokeStyle='#99907770';g.stroke()}}
  for(let i=0;i<160;i++){const x=r()*map.width,y=r()*map.height;if(map.pois.some(p=>Zone.distance(p,{x,y})<60))continue;rect(g,x,y,5+r()*15,3+r()*7,'#374b4966');rect(g,x+2,y,7,1,'#9caa9355')}
  this.groundCover(map,r);
  for(const forest of map.forests)for(let i=0;i<56;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*forest.radius,x=forest.x+Math.cos(a)*d,y=forest.y+Math.sin(a)*d,q={x,y};if(x<15||y<35||x>map.width-15||y>map.height-10||map.pois.some(p=>Zone.distance(p,q)<locationVisualRadius(p)+47)||waterVisualBlocked(q,map,24)||(map.terrainDecor||[]).some(p=>Zone.distance(p,q)<Math.max(p.rx,p.ry)+22)||Zone.distance(map.camp,q)<60||Zone.distance(map.exit,q)<100)continue;if(r()<.34)tree(x,y,23+r()*17,r);else this.deciduous(g,x,y,20+r()*15,r)}
  // Fill broad, empty clearings between roads with small separate tree copses.
  const roadGap=p=>Math.min(Infinity,...this.roads.flatMap(road=>road.points.slice(1).map((b,j)=>{const a=road.points[j],dx=b.x-a.x,dy=b.y-a.y,t=Zone.clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)})));
  this.treeCopses=[];for(let group=0;group<18;group++){
   let center=null;for(let attempt=0;attempt<100;attempt++){const q={x:70+r()*(map.width-140),y:70+r()*(map.height-140)};if(Zone.distance(q,map.camp)<145||Zone.distance(q,map.exit)<180||map.pois.some(p=>Zone.distance(p,q)<locationVisualRadius(p)+90)||waterVisualBlocked(q,map,105)||(map.terrainDecor||[]).some(p=>Zone.distance(p,q)<Math.max(p.rx,p.ry)+95)||roadGap(q)<35||(map.forests||[]).some(f=>Zone.distance(f,q)<f.radius*.55)){continue}center=q;break}
   if(!center)continue;this.treeCopses.push(center);const count=8+Math.floor(r()*6);
   for(let i=0;i<count;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*76,x=center.x+Math.cos(a)*d,y=center.y+Math.sin(a)*d,q={x,y};if(x<20||y<38||x>map.width-20||y>map.height-15||map.pois.some(p=>Zone.distance(p,q)<locationVisualRadius(p)+48)||waterVisualBlocked(q,map,23)||(map.terrainDecor||[]).some(p=>Zone.distance(p,q)<Math.max(p.rx,p.ry)+20)||Zone.distance(q,map.camp)<72||Zone.distance(q,map.exit)<115||roadGap(q)<17)continue;if(r()<.38)tree(x,y,23+r()*15,r);else this.deciduous(g,x,y,19+r()*14,r)}
  }
  this.landmarkTrees=[];const ranger=map.pois.find(p=>p.type==='house'&&p.name==='Дом лесника');
  for(const landmark of [ranger,...map.pois.filter(p=>p.type==='sawmill'||p.type==='waterTower')].filter(Boolean)){
   const candidates=[];for(let radius=98;radius<=150;radius+=10)for(let i=0;i<48;i++){const a=i*Math.PI/24+(landmark.variant||0)*.19,q={x:landmark.x+Math.cos(a)*radius,y:landmark.y+Math.sin(a)*radius};if(q.x<40||q.y<60||q.x>map.width-40||q.y>map.height-40||waterVisualBlocked(q,map,28)||(map.terrainDecor||[]).some(d=>Zone.distance(d,q)<Math.max(d.rx,d.ry)+30)||Zone.distance(q,map.camp)<75||Zone.distance(q,map.exit)<110)continue;const ownGap=Zone.distance(q,landmark)-locationVisualRadius(landmark),poiGap=Math.min(Infinity,...map.pois.filter(p=>p!==landmark).map(p=>Zone.distance(q,p)-locationVisualRadius(p)));candidates.push({...q,landmark,score:Math.min(ownGap,poiGap)-Math.abs(radius-119)*.08})}
   candidates.sort((a,b)=>b.score-a.score);const placed=[];for(const candidate of candidates){if(candidate.score<5||placed.some(p=>Zone.distance(p,candidate)<43))continue;placed.push(candidate);if(placed.length===3)break}
   if(placed.length<3){for(const candidate of candidates){if(placed.some(p=>Zone.distance(p,candidate)<43)||Zone.distance(candidate,landmark)<locationVisualRadius(landmark)+10)continue;placed.push(candidate);if(placed.length===3)break}}
   while(placed.length<3){const a=placed.length*Math.PI*2/3+(landmark.variant||0)*.19,radius=145,q={x:landmark.x+Math.cos(a)*radius,y:landmark.y+Math.sin(a)*radius};if(!waterVisualBlocked(q,map,28))placed.push({...q,landmark,score:0});else break}
   for(const p of placed){this.landmarkTrees.push({x:p.x,y:p.y,landmark:landmark.id});tree(p.x,p.y,27+r()*10,r)}
  }
  for(let i=0;i<1400;i++){const x=r()*map.width,y=r()*map.height;rect(g,x,y,2,1,'#a3977170');if(i%4===0){rect(g,x,y-4,1,5,'#99977760');rect(g,x+3,y-2,1,3,'#8f92745c')}}
  for(const lake of map.lakes||[]){
   const phase=(lake.seed%10000)/1591,points=[];for(let i=0;i<48;i++){const a=i*Math.PI*2/48,wave=1+.075*Math.sin(a*3+phase)+.045*Math.sin(a*5-phase*.7)+.025*Math.cos(a*8+phase*1.4);points.push({x:lake.x+Math.cos(a)*lake.rx*wave,y:lake.y+Math.sin(a)*lake.ry*(wave+.018*Math.sin(a*4+phase))})}
   const path=scale=>{g.beginPath();points.forEach((p,i)=>{const x=lake.x+(p.x-lake.x)*scale,y=lake.y+(p.y-lake.y)*scale;i?g.lineTo(x,y):g.moveTo(x,y)});g.closePath()};
   g.save();path(1.15);g.fillStyle='#353b31';g.fill();path(1.08);g.fillStyle='#827c5b';g.fill();path(1.015);g.fillStyle='#3f5551';g.fill();g.strokeStyle='#9d9470';g.lineWidth=3;g.stroke();path(.99);const water=g.createLinearGradient(lake.x-lake.rx, lake.y-lake.ry,lake.x+lake.rx,lake.y+lake.ry);water.addColorStop(0,'#38565a');water.addColorStop(.48,'#29474d');water.addColorStop(1,'#203a40');g.fillStyle=water;g.fill();g.strokeStyle='#72908a';g.lineWidth=1.5;g.stroke();g.clip();
   const ripple=seeded(lake.seed+39);for(let i=0;i<45;i++){const a=ripple()*Math.PI*2,d=Math.sqrt(ripple())*.78,x=lake.x+Math.cos(a)*lake.rx*d,y=lake.y+Math.sin(a)*lake.ry*d,rx=4+ripple()*16,ry=1+ripple()*2;g.beginPath();g.ellipse(x,y,rx,ry,a*.12,Math.PI*1.05,Math.PI*1.95);g.strokeStyle=i%4?'#87a49a45':'#bdba9560';g.lineWidth=i%5===0?1.5:1;g.stroke()}
   for(let i=0;i<22;i++){const a=i*Math.PI*2/22,px=lake.x+Math.cos(a)*lake.rx*1.045,py=lake.y+Math.sin(a)*lake.ry*1.045;rect(g,px,py,2+(i%3),1,i%2?'#a69c72':'#66765c')}
   g.restore();
   }
   for(const d of map.lakeDecor||[])if(['ruinedPier','boatWreck'].includes(d.type))this.lakeDecoration(g,d);
   drawZonePerimeter(map);
  for(const p of map.pois){if(p.type==='anomaly'){rect(g,p.x-17,p.y-6,35,13,'#34464080');continue}g.save();g.translate(p.x,p.y);g.scale(.78,.78);this.location(p);g.restore()}
  g.save();g.translate(map.exit.x,map.exit.y);g.scale(1.12,1.12);g.translate(-891,-69);drawCheckpoint();g.restore();
 }
  deciduous(c,x,y,size,r){
  const birch=r()<.5;rect(c,x-12,y+6,32,5,'#1d2d20a0');rect(c,x-9,y+4,10,4,'#596043');rect(c,x+3,y+3,14,4,'#283b2b70');rect(c,x-1,y-size*.65,4,size*.8,birch?'#b8b7a1':'#827d67');rect(c,x,y-size*.55,1,size*.68,birch?'#e2dfc6':'#a08c66');
  for(let n=0;n<4;n++){const yy=y-size*.25-n*size*.12,side=n%2?-1:1,reach=size*(.2+n*.035);rect(c,x+Math.min(0,side*reach),yy,reach,2,birch?'#726b53':'#665c45');rect(c,x+side*(reach-2),yy-4,3,5,birch?'#aaa78f':'#93876a');rect(c,x+side*(reach-5),yy-2,6,2,'#c0b47e');if(birch){rect(c,x-1,yy,4,1,'#414c3d');rect(c,x+1,yy+size*.08,2,2,'#413e32')}}
  for(let n=0;n<24;n++){const xx=x+(r()-.5)*size*.95,yy=y-size+r()*size*.72,w=3+r()*6,h=2+r()*4,col=['#777b5b','#8c8766','#656c52','#979274','#a47848','#8c5942'][Math.floor(r()*6)];if(r()>.16){rect(c,xx-1,yy+1,w+2,h,'#303e30');rect(c,xx,yy,w,h,col);rect(c,xx,yy,w*.5,1,'#c5b47b');if(n%4===0)rect(c,xx+w*.55,yy+h,2,4,'#65563e')}}
   rect(c,x-3,y+2,3,7,'#796648');rect(c,x+1,y+1,4,7,'#9b8155');rect(c,x-8,y+8,12,2,'#8e8059');rect(c,x+2,y+8,12,2,'#9f9061');
  }
  lakeDecoration(c,d){
   c.save();c.translate(d.x,d.y);c.rotate(d.rotation||0);
   if(d.type==='ruinedPier'){
    rect(c,-28,-8,58,19,'#182d2da0');for(let i=-25;i<28;i+=8){const missing=i>13&&i<22;if(missing)continue;rect(c,i,-7,6,16,i%3?'#776248':'#947756');rect(c,i+1,-6,4,2,'#b89a6c')}rect(c,-28,-9,48,3,'#4f412f');rect(c,-28,7,58,3,'#473b2d');for(const x of [-24,3,27]){rect(c,x,-13,3,28,'#4a3c2e');rect(c,x+1,-12,1,24,'#a08058')}rect(c,20,-2,12,3,'#ad895f');rect(c,27,-5,3,8,'#5f4934');
   }else{
    c.fillStyle='#362b22';c.beginPath();c.moveTo(-31,-5);c.lineTo(-22,10);c.lineTo(19,12);c.lineTo(32,-3);c.lineTo(21,7);c.lineTo(-20,5);c.closePath();c.fill();c.strokeStyle='#8c6848';c.lineWidth=3;c.stroke();for(let x=-19;x<=19;x+=9){c.strokeStyle=x%2?'#a37b52':'#705039';c.beginPath();c.moveTo(x,6);c.lineTo(x+4,-9+Math.abs(x)*.12);c.stroke()}rect(c,-25,-2,48,3,'#9c754f');rect(c,-14,-10,4,13,'#5e4433');rect(c,11,-8,4,11,'#6e4e36');
   }c.restore();
  }
  lakeRareDecoration(c,s,t){const lake=s.map.lakes?.[0];if(!lake)return;for(const d of s.map.lakeDecor||[]){if(!['paperBoat','dinosaur'].includes(d.type))continue;const travel=Math.sin(t*.34+d.phase),direction=Math.cos(t*.34+d.phase)>=0?1:-1,x=lake.x+travel*lake.rx*.68,y=lake.y+(d.offsetY||0)+Math.sin(t*.7+d.phase)*2;c.save();c.translate(x,y);c.scale(direction*(d.direction||1),1);
    c.strokeStyle='#9bc0b771';c.lineWidth=1;c.beginPath();c.ellipse(0,7,15,3,0,0,Math.PI*2);c.stroke();
    if(d.type==='paperBoat'){c.fillStyle='#e3dfc5';c.beginPath();c.moveTo(-8,2);c.lineTo(0,-7);c.lineTo(8,2);c.lineTo(0,7);c.closePath();c.fill();c.strokeStyle='#8d927d';c.stroke();rect(c,-1,-6,2,11,'#b5ae91');rect(c,0,-5,7,2,'#f1e9c9')}
    else{c.strokeStyle='#344c3e';c.lineWidth=5;c.beginPath();c.moveTo(-10,4);c.quadraticCurveTo(-3,-15,4,-18);c.quadraticCurveTo(9,-18,12,-13);c.stroke();rect(c,4,-21,10,7,'#4f6a50');rect(c,11,-19,5,3,'#738365');rect(c,12,-18,1,1,'#d1d59b');c.strokeStyle='#78917a70';c.lineWidth=1;c.beginPath();c.moveTo(-18,6);c.lineTo(-7,4);c.moveTo(8,5);c.lineTo(20,7);c.stroke()}
    c.restore();
   }}
  location(p){
  if(p.type==='tunnel'){
   rect(g,-48,9,96,22,'#303b30');rect(g,-39,-25,78,48,'#555e54');rect(g,-29,-35,58,12,'#82867b');rect(g,-36,-24,72,5,'#b4b5a3');
   rect(g,-24,-19,48,43,'#151f20');rect(g,-17,-25,34,7,'#151f20');rect(g,-30,-19,6,44,'#aaa999');rect(g,24,-19,6,44,'#808779');
   for(let i=0;i<4;i++){rect(g,-29,-17+i*10,5,2,'#62695d');rect(g,25,-17+i*10,5,2,'#545f54')}
   rect(g,-26,24,52,6,'#9a9e8b');rect(g,-32,31,64,5,'#737e6b');rect(g,-18,3,2,20,'#3d4b48');rect(g,16,3,2,20,'#3d4b48');
   rect(g,34,-9,7,13,'#273934');rect(g,36,-7,3,8,'#9fdfad');rect(g,-12,-32,24,4,'#c2c3ab');
  }
   else if(p.type==='house')detailedHouse(-24,-16,48,32,p.variant);
  else if(p.type==='factory'||p.type==='laboratory'){detailedFactory({x:0,y:0});if(p.type==='laboratory'){rect(g,-9,12,19,13,'#354d4e');rect(g,-4,15,9,2,'#b5bdab');rect(g,1,13,2,7,'#b5bdab')}}
  else if(p.type==='bunker'){rect(g,-32,-11,64,30,'#727d65');rect(g,-27,-17,54,7,'#91967b');rect(g,-12,-2,25,24,'#283d35');rect(g,-10,0,20,20,'#596d5c');rect(g,-1,8,4,4,'#bec1a6');for(let i=0;i<5;i++)rect(g,-30+i*14,24,10,4,'#989779')}
  else if(p.type==='dugout'){rect(g,-28,-8,56,24,'#667155');for(let i=0;i<8;i++)rect(g,-27+i*7,-12,5,9,'#8b8b68');rect(g,-10,0,18,19,'#283b2c');rect(g,-12,-1,22,3,'#a59a75');rect(g,21,-17,4,17,'#958d71')}
  else if(p.type==='waterTower'){rect(g,-24,-40,47,30,'#888b72');rect(g,-22,-45,43,6,'#a5a084');for(let i=0;i<7;i++)rect(g,-23+i*7,-37,1,23,'#565e4c');rect(g,-23,-12,47,4,'#464f40');rect(g,-18,-8,5,47,'#969779');rect(g,14,-8,5,47,'#969779');g.strokeStyle='#69715a';g.lineWidth=3;g.beginPath();g.moveTo(-16,-4);g.lineTo(16,34);g.moveTo(16,-4);g.lineTo(-16,34);g.stroke();rect(g,27,-24,4,49,'#927e59');rect(g,24,22,15,4,'#a09677')}
  else if(p.type==='cemetery'){rect(g,-53,-27,110,63,'#424b3e');for(let i=0;i<12;i++){const x=-42+(i%4)*26,y=-20+Math.floor(i/4)*20;rect(g,x-4,y+6,14,7,'#73735e');if(i%3){rect(g,x,y-4,3,17,'#ada68c');rect(g,x-5,y+1,13,3,'#9b9b81')}else{rect(g,x-1,y-4,8,13,'#959982');rect(g,x+1,y-2,4,1,'#5f6c58')}}detailedHouse(40,-38,25,22,1);for(let i=0;i<8;i++)rect(g,-54+i*15,42,2,8,'#a7a080')}
  else if(p.type==='camp'){rect(g,-26,-12,33,25,'#77795a');rect(g,-23,-14,28,3,'#a5a27c');rect(g,-11,-9,10,22,'#364535');rect(g,13,-3,20,14,'#656f55');rect(g,15,-5,16,3,'#989675');rect(g,-8,23,13,5,'#303e31');rect(g,21,21,7,8,'#978869')}
  else if(p.type==='corpse'){rect(g,-11,-3,20,8,'#75695b');rect(g,-15,-1,5,5,'#a39579');rect(g,8,-4,11,3,'#555e4a');rect(g,8,4,9,3,'#555e4a');rect(g,-12,6,15,4,'#763f383d');rect(g,4,-10,6,5,'#bbb39a')}
  else if(p.type==='wallet'){rect(g,-8,-5,17,11,'#97815b');rect(g,-7,-4,14,2,'#b7a27a');rect(g,-1,-6,3,13,'#4a503b')}
  else{rect(g,-13,-8,26,19,'#7c7c59');rect(g,-13,-8,26,4,'#aaa27a');rect(g,-8,-7,3,17,'#4e5f43');rect(g,7,-7,3,17,'#4e5f43');rect(g,-2,-1,5,4,'#b1b493')}
 }
 camp(c,p,time){
  rect(c,p.x-24,p.y+14,55,7,'#807d553d');rect(c,p.x-22,p.y-7,9,13,'#778363');rect(c,p.x-23,p.y-8,11,3,'#adab7d');rect(c,p.x-25,p.y+6,15,3,'#465643');rect(c,p.x+23,p.y-18,2,28,'#b5a785');rect(c,p.x+15,p.y+9,6,7,'#979c85');rect(c,p.x+19,p.y+10,3,3,'#d0c5a0');
  for(let i=0;i<6;i++)rect(c,p.x+Math.cos(i)*9,p.y+20+Math.sin(i)*4,4,3,'#909079');rect(c,p.x-5,p.y+18,13,3,'#8b593b');
  for(let i=0;i<3;i++){const h=5+Math.sin(time*5+i)*2;rect(c,p.x-3+i*3,p.y+17-h,3,h,'#d99854');rect(c,p.x-2+i*3,p.y+17-h/2,1,h/2,'#e2bd7d')}
  if(p.variant%2===0)rect(c,p.x-12,p.y+14,7,4,'#bbb497');else rect(c,p.x+7,p.y-8,3,7,'#899888');
 }
 campStranger(c,s){
  if(!s.campStrangerSeen)return;const x=Math.round(s.map.camp.x+43),y=Math.round(s.map.camp.y+12),weapon=s.startingWeapon??0;
  c.save();rect(c,x-9,y+8,20,4,'#14231caa');rect(c,x-6,y+2,10,7,'#34483a');rect(c,x+4,y+7,8,3,'#9d8563');rect(c,x-7,y-6,13,10,'#9c9876');rect(c,x-6,y-5,3,8,'#5e6f50');
  rect(c,x-4,y-13,9,7,'#b7aa86');rect(c,x-5,y-15,11,4,'#5e744f');rect(c,x-3,y-11,2,2,'#30352d');rect(c,x+2,y-11,2,2,'#30352d');rect(c,x-1,y-8,3,1,'#675b49');
  if(weapon===1){rect(c,x+7,y+1,10,2,'#c6c7b4');rect(c,x+6,y+3,4,2,'#725e42')}else{rect(c,x+6,y-1,9,3,'#aeb8af');rect(c,x+7,y+2,3,5,'#8a6948')}
  rect(c,x-7,y+8,5,3,'#26362e');rect(c,x+8,y+8,6,3,'#26362e');c.restore();
 }
 player(c,s){
  const x=Math.round(s.x),y=Math.round(s.y),sitting=['camp','rest'].includes(s.mode)||(s.mode==='dialog'&&['rest','camp'].includes(s.previousMode));
  const coat=['#b7ad88','#b1936d','#a4ad79','#a1b397','#bec7aa','#b2c6c4'][s.armor],dark='#3d5141';
  rect(c,x-8,y+8,18,4,'#1d302790');
  if(sitting){rect(c,x-4,y+4,12,5,dark);rect(c,x+5,y+8,7,3,'#b29c75');rect(c,x-5,y-4,10,9,coat);rect(c,x-3,y-10,7,6,'#b8ac8a');rect(c,x-4,y-12,9,4,'#657954')}
  else{const step=Math.sin(s.steps*.4)>0?1:-1;rect(c,x-4,y+3,3,8+step,dark);rect(c,x+2,y+3,3,8-step,dark);rect(c,x-6,y-5,12,11,coat);rect(c,x-6,y-4,3,9,'#6b7953');rect(c,x-3,y-11,7,7,'#b9ae8f');rect(c,x-4,y-13,9,4,'#667d55');rect(c,x-8,y-3,3,11,'#86916b');rect(c,x+5,y-2,3,7,coat);if(s.armor>=3){rect(c,x-2,y-8,7,3,'#344b41');rect(c,x+1,y-8,3,2,'#b7ccc2')}if(s.armor>=4){rect(c,x-8,y-5,2,15,'#c9ccb6');rect(c,x+7,y-5,2,15,'#c9ccb6')}const len=s.weapon<3?7:s.weapon===8?21:15;rect(c,s.facing>0?x+6:x-6-len,y,len,3,s.weapon===8?'#96d0cc':'#c2c6ad');if(s.weapon>=3)rect(c,x+s.facing*8,y+3,3,4,'#867956')}
  c.save();c.shadowColor='#83ff16';c.shadowBlur=9;c.fillStyle='#a1ff20';c.fillRect(x-2,y-30,4,5);c.fillRect(x-6,y-26,12,2);c.fillRect(x-4,y-24,8,2);c.fillRect(x-2,y-22,4,2);c.restore();
 }
 anomaly(c,p,t,searched){
  c.save();c.globalAlpha=searched?.32:1;
  if(p.element==='fire'){for(let i=0;i<6;i++){const x=p.x-15+i*6,h=6+Math.sin(t*5+i)*4;rect(c,x,p.y-h,4,h+4,'#b77750');rect(c,x+1,p.y-h+4,2,5,'#dcbb7a')}}
  else if(p.element==='electric'){for(let i=0;i<3;i++){const x=p.x-15+i*13;c.strokeStyle='#a5cdca';c.beginPath();c.moveTo(x,p.y+5);c.lineTo(x+6,p.y-5);c.lineTo(x+Math.sin(t*7+i)*4,p.y-9);c.lineTo(x+5,p.y-21);c.stroke()}}
  else if(p.element==='acid'){c.fillStyle='#748958a6';c.beginPath();c.ellipse(p.x,p.y,21,8,0,0,Math.PI*2);c.fill();for(let i=0;i<6;i++){c.strokeStyle='#c0c58b90';c.beginPath();c.arc(p.x+Math.cos(i*2)*15,p.y+Math.sin(i*2)*5,2+Math.sin(t*3+i),0,Math.PI*2);c.stroke()}}
  else{c.strokeStyle='#b7c6b090';for(let i=0;i<3;i++){c.beginPath();c.ellipse(p.x,p.y-i*3,19-i*5+Math.sin(t*2),8-i,0,0,Math.PI*2);c.stroke()}}
  c.restore();
 }
 groups(c,s,t){for(const group of s.map.groups)for(let i=0;i<3;i++){
  const x=group.x+Math.cos(i*2.1+group.phase)*13,y=group.y+Math.sin(i*2.1+group.phase)*11,dog=group.type==='dogs';
  rect(c,x-7,y,dog?14:18,dog?5:9,dog?'#9c9b80':'#727662');rect(c,x+7,y-2,dog?5:7,dog?5:8,dog?'#b2ae91':'#8d9078');rect(c,x+9,y-4,2,3,'#4a5945');rect(c,x-6,y+5,2,5,'#3a4c3e');rect(c,x+5,y+5,2,5,'#3a4c3e');rect(c,x-10,y-1,4,2,'#777f62');if(!dog)rect(c,x+12,y+4,3,2,'#d0cbb0');
 }}
 followPlayer(){this.manualCamera=false}
 pan(dx,dy,map){
  this.manualCamera=true;
  this.camera.x=Zone.clamp(this.camera.x+dx,0,Math.max(0,map.width-this.canvas.width/this.zoom));
  this.camera.y=Zone.clamp(this.camera.y+dy,0,Math.max(0,map.height-this.canvas.height/this.zoom));
 }
 updateCamera(s){
  const maxX=Math.max(0,s.map.width-this.canvas.width/this.zoom),maxY=Math.max(0,s.map.height-this.canvas.height/this.zoom);
  if(!this.manualCamera){this.camera.x=s.x-this.canvas.width/this.zoom/2;this.camera.y=s.y-this.canvas.height/this.zoom/2}
  this.camera.x=Zone.clamp(this.camera.x,0,maxX);this.camera.y=Zone.clamp(this.camera.y,0,maxY);
 }
 travelMarker(c,time){
  const p=this.travelTarget;if(!p)return;const phase=(time*.72)%1;
  c.save();c.translate(p.x,p.y);c.lineWidth=1.5;
  for(let i=0;i<3;i++){const q=(phase+i/3)%1,r=6+q*27;c.globalAlpha=(1-q)*.72;c.strokeStyle=i%2?'#b7ff70':'#70e95b';c.beginPath();c.ellipse(0,3,r,r*.38,0,0,Math.PI*2);c.stroke()}
  c.globalAlpha=1;const bob=Math.sin(time*4.4)*3;c.shadowColor='#83ff16';c.shadowBlur=10;c.fillStyle='#a1ff20';c.beginPath();c.moveTo(0,-13+bob);c.lineTo(-8,-22+bob);c.lineTo(-3,-22+bob);c.lineTo(-3,-31+bob);c.lineTo(3,-31+bob);c.lineTo(3,-22+bob);c.lineTo(8,-22+bob);c.closePath();c.fill();
  c.fillStyle='#e6ffc5';c.fillRect(-1,-29+bob,2,10);c.restore();
 }
  draw(s,time){
   if(this.seed!==s.seed||this.poiCount!==s.map.pois.length||this.renderVersion!==(s.map.renderVersion||0)||this.lakeDecorKey!==JSON.stringify(s.map.lakeDecor||[]))this.rebuild(s);const c=this.ctx,vw=this.canvas.width,vh=this.canvas.height,z=this.zoom;
  this.updateCamera(s);const cam=this.camera,t=this.reduced?0:time;
   c.imageSmoothingEnabled=false;c.clearRect(0,0,vw,vh);c.save();c.scale(z,z);c.translate(-cam.x,-cam.y);c.drawImage(this.ground,0,0);this.lakeRareDecoration(c,s,t);this.pirateGhost?.(c,s,t);
  this.camp(c,s.map.camp,t);this.campStranger(c,s);if(s.restCamp)this.camp(c,s.restCamp,t);
  for(const p of s.map.pois){if(p.type==='anomaly')this.anomaly(c,p,t,p.searched);const d=Zone.distance(p,s),labelY=['backpack','wallet','cache','corpse','supplyDrop'].includes(p.type)?19:['tractor','tank','apc','truck','combine','helicopter','crashSite','fighter'].includes(p.type)?30:p.type==='anomaly'?25:47;if(d<135){rect(c,p.x-2,p.y+labelY-10,4,4,p.type==='tunnel'?'#c084fc':p.searched?'#798673':'#c3b998');c.font='12px monospace';c.textAlign='center';c.fillStyle='#18291e';c.fillText(p.name,p.x+1,p.y+labelY+1);c.fillStyle=p.searched?'#9da78e':'#e2dfc5';c.fillText(p.name,p.x,p.y+labelY);c.textAlign='left'}}
  this.groups(c,s,t);this.checkpointPatrol(c,s,t);this.travelMarker(c,t);c.restore();
  if(s.night){const px=(s.x-cam.x)*z,py=(s.y-cam.y)*z,shade=c.createRadialGradient(px,py,35,px,py,440);shade.addColorStop(0,'#16263325');shade.addColorStop(1,'#071422bb');c.fillStyle=shade;c.fillRect(0,0,vw,vh)}
  if(s.weather==='fog'){for(let i=0;i<5;i++){const x=((i*240+t*9)%(vw+340))-170,yy=80+i*95,gradient=c.createRadialGradient(x,yy,20,x,yy,250);gradient.addColorStop(0,'#c0c9ba3c');gradient.addColorStop(1,'#c0c9ba00');c.fillStyle=gradient;c.fillRect(x-260,yy-260,520,520)}}
  if(!this.reduced){
   if(s.weather==='rain'){c.save();c.lineCap='round';for(let layer=0;layer<3;layer++){c.strokeStyle=['#d9ded04a','#bfcfcf4c','#d7e4df68'][layer];c.lineWidth=[.7,1,1.4][layer];c.beginPath();for(let i=0;i<210;i++){const p=this.particles[(i+layer*31)%this.particles.length],speed=210+layer*100,x=(p.x+t*(52+layer*17)+i*67)%vw,y=(p.y+t*speed+i*29)%vh,len=7+layer*3+(p.k*5);c.moveTo(x,y);c.lineTo(x-3-layer,y+len);if(layer===2&&i%9===0){c.moveTo(x-2,y+len);c.lineTo(x-4,y+len+3)}}c.stroke()}c.restore()}
   const leafCount=s.weather==='wind'?54:s.weather==='rain'?18:10;for(let i=0;i<leafCount;i++){const p=this.particles[i%this.particles.length],gust=s.weather==='wind'?76:28,x=(p.x+t*(gust+p.k*48)+Math.sin(t*1.7+i)*27+i*53)%vw,y=(p.y+t*(s.weather==='wind'?12:5)+Math.sin(t*1.25+p.k*9)*16+i*37)%vh,angle=t*(1+p.k*2)+i; c.save();c.translate(x,y);c.rotate(angle);c.fillStyle=['#b27a42','#c29d55','#8c6942','#9b5140','#c1b477'][i%5];c.beginPath();c.moveTo(-5,-2);c.lineTo(1,-4);c.lineTo(6,0);c.lineTo(1,3);c.lineTo(-4,2);c.closePath();c.fill();c.strokeStyle='#e0bb7275';c.lineWidth=.7;c.beginPath();c.moveTo(-4,0);c.lineTo(4,0);c.stroke();c.restore()}
  }
  c.save();c.scale(z,z);c.translate(-cam.x,-cam.y);this.player(c,s);c.restore();
  const vignette=c.createRadialGradient(vw/2,vh/2,240,vw/2,vh/2,580);vignette.addColorStop(0,'#11201400');vignette.addColorStop(1,'#07120b66');c.fillStyle=vignette;c.fillRect(0,0,vw,vh);
 this.minimap(c,s);
 }
 poiAt(x,y,s){let nearest=null,best=Infinity;for(const p of s.map.pois){const d=Math.hypot(p.x-x,p.y-y),radius=['backpack','wallet','cache','corpse'].includes(p.type)?24:['tractor','tank','apc','truck','combine','helicopter','crashSite','fighter','supplyDrop'].includes(p.type)?42:p.type==='anomaly'?31:47;if(d<radius&&d<best){nearest=p;best=d}}const m=s.map,onFence=Math.abs(y-10)<9||Math.abs(y-(m.height-26))<9||Math.abs(x-10)<9||((Math.abs(x-(m.width-26))<9)&&Math.abs(y-m.exit.y)>70);if(onFence)return{id:'perimeter',name:'Периметр Зоны · ограждение с колючей проволокой',perimeter:true};return nearest}
 minimap(c,s){const w=133,h=83,x=813,y=14;rect(c,x-5,y-5,w+10,h+10,'#15241dde');c.strokeStyle='#8c977366';c.strokeRect(x-5,y-5,w+10,h+10);const point=p=>({x:x+p.x/s.map.width*w,y:y+p.y/s.map.height*h});for(const lake of s.map.lakes||[]){const phase=(lake.seed%10000)/1591;c.beginPath();for(let i=0;i<32;i++){const a=i*Math.PI*2/32,wave=1+.075*Math.sin(a*3+phase)+.045*Math.sin(a*5-phase*.7)+.025*Math.cos(a*8+phase*1.4),q=point({x:lake.x+Math.cos(a)*lake.rx*wave,y:lake.y+Math.sin(a)*lake.ry*wave});i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y)}c.closePath();c.fillStyle='#315158';c.fill();c.strokeStyle='#8f9a78';c.lineWidth=1;c.stroke()}for(const road of (this.roads||s.map.roads)){c.beginPath();road.points.forEach((p,i)=>{const q=point(p);i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y)});c.strokeStyle='#a59c6955';c.stroke()}for(const p of s.map.pois){const q=point(p);rect(c,q.x,q.y,2,2,p.type==='tunnel'?'#c084fc':p.searched?'#5f705a':p.type==='anomaly'?'#718f80':'#b8b18d')}const end=point(s.map.exit);rect(c,end.x-2,end.y-2,4,4,'#e2d9a8');const player=point(s);rect(c,player.x-1,player.y-1,3,3,'#a2ff35');const cam=this.camera;c.strokeStyle='#c4cfaa66';c.strokeRect(x+cam.x/s.map.width*w,y+cam.y/s.map.height*h,960/this.zoom/s.map.width*w,this.canvas.height/this.zoom/s.map.height*h)}
 checkpointPatrol(c,s,t){const pace=t*6,step=Math.sin(pace),travel=Math.cos(t*.58),direction=travel>=0?1:-1,x=s.map.exit.x+Math.sin(t*.58)*58,y=s.map.exit.y+27+Math.abs(step)*.7;c.save();c.translate(x,y);c.fillStyle='#111a15a8';c.beginPath();c.ellipse(0,9,7,2.5,0,0,Math.PI*2);c.fill();c.scale(.78,.78);c.scale(direction,1);
  // Closer patrol silhouette: helmet, face covering, armor plates, pouches and radio.
  rect(c,-8,-15,4,12,'#38443a');rect(c,-7,-16,5,13,'#505c47');rect(c,-6,-15,3,9,'#74805e');rect(c,-4,-15,2,10,'#303c33');
  rect(c,-6,-14,12,14,'#59684e');rect(c,-5,-13,10,11,'#899071');rect(c,-4,-12,8,3,'#59664b');rect(c,-5,-8,10,2,'#343e34');rect(c,-4,-5,8,2,'#b2a27d');rect(c,-3,-11,2,2,'#c5b995');rect(c,2,-11,2,2,'#c5b995');rect(c,-2,-6,5,5,'#6d7659');
  rect(c,-4,-23,8,8,'#b7ad90');rect(c,-3,-22,6,3,'#d0c7a7');rect(c,-5,-25,11,4,'#46563e');rect(c,-4,-28,10,4,'#657751');rect(c,-5,-27,12,2,'#89936d');rect(c,-4,-25,10,1,'#303c31');rect(c,-3,-18,7,2,'#343a32');rect(c,2,-18,2,1,'#e2d6b5');
  // Radio aerial, shoulder straps, belt and field pouches.
  rect(c,-7,-16,2,9,'#343f34');rect(c,4,-16,2,9,'#343f34');rect(c,-6,-6,12,2,'#393f32');rect(c,-5,-4,4,4,'#7d6545');rect(c,2,-4,4,4,'#8b7047');rect(c,-7,-13,3,4,'#4d654b');rect(c,5,-13,3,4,'#4d654b');rect(c,-10,-15,2,10,'#687253');rect(c,-9,-14,2,5,'#a59c79');rect(c,-7,-16,1,8,'#b3a987');
  // Side-to-side walk cycle, with alternating legs and a steady rifle hold.
  const leg=Math.round(step*3),other=-leg;rect(c,-4,-2,4,8+leg,'#515940');rect(c,-5,5+Math.max(0,leg),6,2,'#29312b');rect(c,2,-2,4,8+other,'#747457');rect(c,2,5+Math.max(0,other),6,2,'#30342b');rect(c,-5,1+leg,5,2,'#a2a084');rect(c,2,1+other,5,2,'#a2a084');
  const arm=Math.round(step*2);rect(c,5,-14,4,7+arm,'#7a8060');rect(c,7,-9+arm,4,3,'#b5aa8c');rect(c,-9,-14,4,7-arm,'#566348');rect(c,-8,-9-arm,4,3,'#b3a887');
  // Patrol rifle held across the chest, turned in the direction of travel.
  rect(c,4,-10,17,3,'#aab19b');rect(c,7,-11,10,2,'#d0cdb4');rect(c,18,-9,8,2,'#69765e');rect(c,23,-10,3,1,'#c5c0a4');rect(c,9,-7,3,6,'#69553d');rect(c,6,-8,3,5,'#3b493a');rect(c,4,-12,4,3,'#4b5943');rect(c,3,-15,2,5,'#d4c9a8');rect(c,12,-12,4,2,'#858f78');
  // Crisp contrast details on the uniform and equipment.
  rect(c,-4,-21,2,2,'#f0dfb4');rect(c,-4,-19,3,1,'#6e392d');rect(c,-3,-17,6,1,'#222c25');
  rect(c,-3,-13,1,7,'#c4ba91');rect(c,3,-13,1,7,'#263329');rect(c,-2,-10,2,1,'#d2c79b');
  rect(c,-5,-3,10,1,'#d0bd8a');rect(c,-4,-1,3,4,'#96764c');rect(c,2,-1,3,4,'#9f8050');
  rect(c,-5,6,6,2,'#171f1b');rect(c,2,6,7,2,'#171f1b');rect(c,-4,5,4,1,'#a6a58a');rect(c,3,5,4,1,'#b5ad8e');
  rect(c,8,-10,2,1,'#d6d5bf');rect(c,19,-9,3,1,'#d2c79d');rect(c,24,-9,2,1,'#303a32');
  c.restore();
  // Three smaller checkpoint guards patrol across the fence instead of remaining painted in place.
  for(const [index,ox,oy,span] of [[0,-26,0,22],[1,25,-8,18],[2,-44,-30,15]]){
   const phase=t*.46+index*2.2,walk=Math.sin(phase),gx=s.map.exit.x+ox+Math.sin(phase*.63)*span,gy=s.map.exit.y+oy;
   c.save();c.translate(gx,gy);c.scale(Math.cos(phase*.63)>=0?1:-1,1);
   c.fillStyle='#111a1599';c.beginPath();c.ellipse(0,2,5,2,0,0,Math.PI*2);c.fill();
   rect(c,-3,-9,6,7,'#657253');rect(c,-2,-8,4,5,'#a3a080');rect(c,-3,-11,7,3,'#46563e');rect(c,-2,-13,5,3,'#6b7c56');rect(c,-1,-10,3,1,'#d0c7a7');
   rect(c,-3,-2,2,4+Math.round(walk),'#535e45');rect(c,1,-2,2,4-Math.round(walk),'#73775a');rect(c,-4,2+Math.max(0,walk),3,1,'#252f28');rect(c,1,2+Math.max(0,-walk),4,1,'#252f28');
   rect(c,3,-8,8,1,'#bbc2a2');rect(c,9,-9,3,1,'#5b694e');rect(c,4,-6,2,3,'#a98a5d');c.restore();
  }
 }
 equipment(canvas,type,index){const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);if(type==='armor'){const color=['#aa9c79','#ad8d64','#9ca773','#94aa87','#b6c0a4','#b3c9c6'][index];rect(c,12,7,20,27,color);rect(c,6,11,7,17,color);rect(c,31,11,7,17,color);rect(c,18,5,8,6,'#4e5e48');rect(c,21,12,2,20,'#3d5340');rect(c,14,18,5,5,'#c8c295');rect(c,25,18,5,5,'#c8c295');if(index>=4){rect(c,7,9,3,24,'#d4d6b7');rect(c,33,9,3,24,'#d4d6b7')}return}
  const kind=BALANCE.weapons[index].icon;if(kind==='knife'){rect(c,9,20,13,5,'#9c815a');for(let i=0;i<7;i++)rect(c,22+i*4,18+i*.2,4,5-i*.6,'#c8d1bd');return}const length=index<4?31:48;rect(c,6,13,length,5,index===8?'#98d4cb':'#c0c7b0');rect(c,15,18,7,12,'#9a815b');if(kind==='revolver'){rect(c,16,12,10,10,'#9fac97');rect(c,19,14,3,3,'#394d3e')}else if(index<3){rect(c,6,18,length,3,'#727e68')}else{rect(c,28,18,5,11,'#6a7d64');rect(c,2,15,9,7,'#9d855b');if(index>=7)rect(c,23,7,21,4,'#a9c3af')}
 }
}
