'use strict';
function drawQuestItem(canvas,kind){
 const c=canvas.getContext('2d'),r=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};c.clearRect(0,0,32,32);
 if(kind==='keycard'){r(3,6,26,20,'#712d35');r(4,7,24,18,'#bc454a');r(4,10,24,5,'#78ba75');r(7,18,6,5,'#d4bb83');r(17,19,8,1,'#edaba3');r(17,22,5,1,'#edaba3')}
 else if(kind==='pda'){r(7,2,18,28,'#1b2828');r(8,3,16,26,'#758479');r(10,6,12,15,'#263f3b');r(11,8,10,11,'#90ae85');r(12,14,7,1,'#496f61');r(17,10,1,8,'#496f61');r(16,12,3,3,'#d7b66f');r(11,24,4,2,'#273932');r(19,23,3,3,'#c7c5a2')}
 else{r(6,5,19,22,'#b5a375');r(8,6,15,20,'#e2ce9b');r(3,4,22,4,'#eed9a6');r(3,5,3,5,'#aa8858');r(8,25,21,4,'#a88659');r(24,24,5,4,'#edcf94');r(11,11,9,1,'#96865d');r(13,12,1,8,'#96865d');r(13,19,7,1,'#96865d');r(18,16,2,6,'#974d43');r(16,18,6,2,'#974d43')}
}
// Scenery follows the same pixel scale as buildings; wrecks use 70% of it.
const originalContentLocation=WorldRenderer.prototype.location;
WorldRenderer.prototype.location=function(p){
 const R=(x,y,w,h,color)=>rect(g,x,y,w,h,color),poly=(pts,col)=>zonePolygon(g,pts,col);
 if(p.type==='backpack'){
  R(-13,10,29,4,'#20362da0');R(-9,-13,18,26,'#293b31');R(-7,-12,14,23,'#8b8a63');R(-5,-16,10,5,'#4f604c');R(-3,-15,6,2,'#bab391');
  R(-8,-11,16,6,'#b1a57d');R(-7,-5,14,2,'#566b50');R(-10,-1,4,10,'#6b795a');R(7,-1,4,10,'#647253');
  R(-5,2,10,8,'#697757');R(-4,3,8,2,'#b6ad81');for(const x of [-5,3]){R(x,-11,2,10,'#40533d');R(x,-5,2,3,'#d5c799')}R(-4,11,9,2,'#454d39');return;
 }
 if(p.type==='cemetery'){
  R(-62,-38,124,82,'#454a38');R(-57,-33,114,74,'#64614a');
  for(let i=0;i<28;i++){const x=-53+(i*31%106),y=-30+(i*19%65);R(x,y,3,2,i%2?'#918365':'#3f4b37')}
  for(let i=0;i<10;i++){
   const x=-43+(i%5)*21,y=-22+Math.floor(i/5)*31;R(x-7,y+5,15,19,'#887459');R(x-5,y+7,11,15,i%4===0?'#1e2b25':'#63513d');R(x-7,y+5,15,2,'#b09a75');
   if(i%4===0){R(x-4,y+9,2,11,'#3f4030');R(x-3,y+20,8,2,'#131e1a');R(x+8,y+9,5,11,'#9a8461')}
   else if(i%3){R(x-1,y-7,3,20,'#8f927b');R(x-7,y-2,14,3,'#a3a590');R(x,y-6,1,17,'#c5c3a6');R(x-6,y-1,12,1,'#bfc0a6')}
   else{R(x-5,y-6,11,17,'#8c9788');R(x-3,y-8,7,3,'#aeb5a0');R(x-3,y-3,7,2,'#485c51');R(x-2,y+2,5,1,'#586d5c')}
  }
  for(let x=-61;x<=61;x+=10){R(x,-43,2,13,'#acb7a1');R(x,-44,2,2,'#d0d2b8');if(x<0||x>20){R(x,34,2,17,'#7f9586');R(x-1,33,4,2,'#aab8a0')}}
  R(-61,-39,124,2,'#738c7d');R(-61,-34,124,1,'#8da18b');R(-61,40,60,2,'#8c9f88');R(21,40,42,2,'#8c9f88');
  for(let y=-35;y<42;y+=10){R(-63,y,3,9,'#687f70');R(62,y,3,9,'#91a18a')}
  R(0,36,3,17,'#c2c5a9');R(20,36,3,17,'#a6b29b');poly([[3,38],[15,43],[15,53],[3,48]],'#61786b');R(-55,48,31,2,'#53624e');return;
 }
 if(['tractor','tank','helicopter','crashSite','fighter'].includes(p.type)){
  g.save();g.scale(.7,.7);R(-38,16,78,7,'#22352ab0');
  if(p.type==='tractor'){
   for(const [x,y,r]of [[-20,11,12],[22,15,8]]){g.fillStyle='#202d29';g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.strokeStyle='#596450';g.lineWidth=3;g.stroke();R(x-3,y-3,6,6,'#9e7650')}
   R(-25,-12,24,21,'#795c3c');R(-27,-16,29,4,'#b08c54');R(-22,-10,17,13,'#354d4d');R(-19,-9,7,5,'#76938a');R(-12,-10,2,13,'#b39569');R(-4,0,30,11,'#977346');R(23,2,5,12,'#4d5442');
   R(9,-13,4,15,'#6e6750');R(8,-15,7,3,'#a4936d');R(-2,9,30,3,'#524a34');R(3,2,5,5,'#c08b4c');R(16,7,5,3,'#653f2e');
  }else if(p.type==='tank'){
   R(-34,4,68,20,'#242f2b');R(-32,6,64,15,'#5f6650');for(let i=0;i<7;i++){R(-29+i*9,8,7,10,'#252f2a');R(-27+i*9,10,3,5,'#8f8b66')}
   poly([[-34,5],[-25,-6],[22,-6],[34,6]],'#89916a');R(-27,-5,51,9,'#6b7957');poly([[-15,-7],[-10,-18],[13,-18],[21,-6]],'#8c9874');R(-12,-17,28,4,'#afb18a');
   R(10,-14,32,5,'#637856');R(39,-15,7,7,'#364b3a');R(-4,-22,11,4,'#313e31');R(-6,-24,12,3,'#b3ac80');R(-27,-2,9,5,'#9d643d');R(10,-6,9,5,'#4d3c2c');
  }else if(p.type==='helicopter'||p.type==='crashSite'){
   if(p.type==='crashSite'){R(-43,8,87,18,'#473c2d');for(let i=0;i<6;i++)R(-46+i*15,20+i%2*5,10,3,'#a18b63')}
   poly([[-24,-10],[6,-13],[25,-2],[22,13],[-17,15],[-29,2]],'#788777');poly([[-21,-8],[3,-11],[12,-4],[-19,-2]],'#aeb59b');R(-22,-2,20,12,'#233e40');R(-20,-1,7,4,'#83a6a1');R(-6,-1,3,10,'#adaf8d');
   poly([[15,-4],[47,-15],[52,-12],[24,7]],'#7a8669');R(45,-25,4,20,'#a6ad8d');R(36,-17,23,3,'#414f3f');R(2,-25,4,14,'#485c4d');poly([[-37,-28],[1,-26],[35,-36],[37,-33],[7,-20],[-36,-24]],'#a7b29c');
   R(-15,16,38,3,'#435b4d');R(-13,11,3,7,'#bbc0a5');R(15,11,3,7,'#aeb69b');R(8,5,9,6,'#975e3e');R(28,20,8,3,'#a8ae94');
  }else{
   poly([[-38,5],[-12,-3],[26,-6],[42,1],[23,9],[-12,11]],'#a3b4ac');poly([[-25,5],[-2,-4],[-9,-32],[0,-33],[19,2],[7,8]],'#7e9892');poly([[-6,9],[-17,29],[-4,29],[18,7]],'#668278');
   poly([[-35,4],[-33,-12],[-26,-13],[-20,6]],'#93aba0');R(11,-5,12,7,'#254f55');R(12,-5,9,2,'#9bd0c6');R(-21,7,14,3,'#a56843');R(30,13,10,3,'#809b8c');R(-39,18,8,4,'#4c665b');
  }
  // Flaked paint, exposed dark metal and broken panels distinguish the wrecks.
  for(const [x,y,w,h] of [[-18,3,8,4],[-12,7,5,3],[2,0,7,3],[19,8,5,4]]){R(x,y,w,h,'#79482f');R(x+1,y,w-2,1,'#c08b58')}
  g.strokeStyle='#26352f';g.lineWidth=2;g.beginPath();g.moveTo(-18,-8);g.lineTo(-12,-3);g.lineTo(-16,2);g.moveTo(8,-8);g.lineTo(5,-2);g.lineTo(11,3);g.stroke();
  if(p.type==='tank'){poly([[-22,0],[-15,-3],[-9,2],[-14,7],[-22,5]],'#26332c');R(27,10,10,5,'#303c30');R(29,21,12,3,'#74745a')}
  if(p.type==='helicopter'||p.type==='crashSite'){poly([[5,-8],[16,-4],[19,4],[12,9],[4,5]],'#28352f');R(25,-32,13,4,'#263e30');poly([[29,21],[44,25],[50,22],[34,17]],'#8d8c71')}
  if(p.type==='fighter'){poly([[-7,-22],[4,-21],[7,-15],[-4,-18]],'#34473c');poly([[10,0],[22,-2],[24,4],[13,8]],'#263c34');R(-12,29,17,3,'#293f32')}
  for(let i=0;i<6;i++)R(-37+i*14,27+(i%2)*4,4+i%3,2,i%2?'#a57445':'#747d65');g.restore();return;
 }
 originalContentLocation.call(this,p);
};
WorldRenderer.prototype.connectRoads=function(map){return map.roads};
const rebuildContent=WorldRenderer.prototype.rebuild;
WorldRenderer.prototype.rebuild=function(s){
 rebuildContent.call(this,s);g=this.ground.getContext('2d');
 for(const p of s.map.decorations||[]){g.save();g.translate(p.x,p.y);g.scale(.78,.78);g.strokeStyle='#9aa99b';g.lineWidth=2;g.beginPath();g.moveTo(-17,22);g.lineTo(-5,-48);g.lineTo(5,-48);g.lineTo(17,22);g.moveTo(-10,-30);g.lineTo(12,9);g.moveTo(10,-30);g.lineTo(-12,9);g.moveTo(-20,-34);g.lineTo(20,-34);g.moveTo(-25,-20);g.lineTo(25,-20);g.stroke();for(const x of [-23,21]){rect(g,x,-23,3,9,'#526658');rect(g,x,-23,3,1,'#d1cab0')}rect(g,-20,22,9,4,'#8c917a');rect(g,11,22,9,4,'#8c917a');g.restore()}
 const r=seeded(s.seed+4711),map=s.map;
 for(let i=0;i<360;i++){
  const side=i%4,p=side<2?{x:side?map.width-15-r()*85:15+r()*85,y:40+r()*(map.height-65)}:{x:20+r()*(map.width-40),y:side===2?35+r()*65:map.height-12-r()*65};
  if(map.pois.some(q=>Zone.distance(p,q)<85)||Zone.distance(p,map.camp)<95||Zone.distance(p,map.exit)<160||(map.decorations||[]).some(q=>Zone.distance(p,q)<45))continue;
  if(map.roads.some(road=>road.points.slice(1).some((b,j)=>{const a=road.points[j],dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)<25})))continue;
  if(r()<.7)tree(p.x,p.y,22+r()*16,r);else this.deciduous(g,p.x,p.y,22+r()*14,r);
 }
};
const animalGroups=WorldRenderer.prototype.groups;
WorldRenderer.prototype.groups=function(c,s,time){
 if(!s.night)return animalGroups.call(this,c,s,time);
 const colors=['#ffe77c','#b2ecff','#b7ff94','#ffd0ec'];
 for(const group of (s.map.fireflies||[]).filter(g=>!g.defeated)){
  const r=seeded(group.id.charCodeAt(1)*313+s.seed),color=colors[group.color];
  for(let i=0;i<7;i++){const phase=r()*Math.PI*2,xx=group.x+(r()-.5)*36+Math.sin(time*1.2+phase)*6,yy=group.y+(r()-.5)*29+Math.cos(time*1.5+phase)*6;
   c.save();const glow=c.createRadialGradient(xx,yy,0,xx,yy,11);glow.addColorStop(0,color+'b0');glow.addColorStop(1,color+'00');c.fillStyle=glow;c.fillRect(xx-11,yy-11,22,22);c.shadowColor=color;c.shadowBlur=9;rect(c,xx-1,yy-1,3,3,color);rect(c,xx,yy,1,1,'#fffbea');c.restore();
  }
 }
};
const standardAnomaly=WorldRenderer.prototype.anomaly;
WorldRenderer.prototype.anomaly=function(c,p,t,searched){
 if(!['abyss','bubble'].includes(p.element))return standardAnomaly.call(this,c,p,t,searched);
 c.save();c.translate(p.x,p.y);c.globalAlpha=searched?.22:1;
 if(p.element==='abyss'){
  const glow=c.createRadialGradient(0,0,3,0,0,42);glow.addColorStop(0,'#000004');glow.addColorStop(.7,'#0b0b16');glow.addColorStop(1,'#17192400');c.fillStyle=glow;c.fillRect(-43,-43,86,86);
  c.fillStyle='#020308';c.beginPath();c.ellipse(0,0,30,16,0,0,Math.PI*2);c.fill();c.strokeStyle='#646073';c.lineWidth=2;c.stroke();
  for(let i=0;i<5;i++){c.strokeStyle=i%2?'#282132':'#433747';c.beginPath();c.ellipse(0,0,26-i*4,13-i*2,0,t*.15+i*.4,t*.15+i*.4+Math.PI*1.6);c.stroke()}
 }else{
  const glow=c.createRadialGradient(-7,-20,2,0,-12,24);glow.addColorStop(0,'#f1ffff70');glow.addColorStop(.5,'#8fbdf014');glow.addColorStop(1,'#eea6f250');c.fillStyle=glow;c.beginPath();c.arc(0,-12+Math.sin(t)*3,23,0,Math.PI*2);c.fill();
  for(let i=0;i<4;i++){c.strokeStyle=['#ecb8e2','#b3f5db','#b5ddff','#f3e3a2'][i];c.lineWidth=1.5;c.beginPath();c.arc(0,-12+Math.sin(t)*3,23,i*Math.PI/2,(i+1)*Math.PI/2);c.stroke()}rect(c,-13,-28,5,3,'#f2ffef');rect(c,-16,-23,2,5,'#d6f8ef');
 }c.restore();
};
const minimapContent=WorldRenderer.prototype.minimap;
WorldRenderer.prototype.minimap=function(c,s){if(this.showMinimap)minimapContent.call(this,c,s)};
const weaponContent=WorldRenderer.prototype.weaponIcon;
WorldRenderer.prototype.weaponIcon=function(c,index){if(index>=0)weaponContent.call(this,c,index)};
const drawContent=WorldRenderer.prototype.draw;
WorldRenderer.prototype.draw=function(s,t){if(this.lastCameraReset!==s.cameraReset){this.followPlayer();this.lastCameraReset=s.cameraReset}drawContent.call(this,s,t)};
drawArtifact=function(canvas,artifact){
 const c=canvas.getContext('2d'),index=typeof artifact==='number'?artifact:artifact.sprite||0;c.clearRect(0,0,canvas.width,canvas.height);
 const R=(x,y,w,h,col)=>rect(c,x,y,w,h,col),heart=index>=12;
 c.save();
 if(heart){const blue=index===13,base=blue?'#527fe1':'#c6404d',light=blue?'#abc8ff':'#ff9593';c.shadowColor=base;c.shadowBlur=5;
  zonePolygon(c,[[5,8],[10,5],[15,8],[20,4],[26,8],[26,16],[21,23],[16,28],[10,23],[5,16]],base);c.shadowBlur=0;
  R(10,2,4,6,blue?'#617dae':'#953741');R(20,1,3,6,blue?'#9aa5ca':'#ae555b');R(7,9,3,6,light);R(10,8,4,2,light);R(20,8,3,3,light);
  c.strokeStyle='#151725';c.lineWidth=2;c.beginPath();c.moveTo(16,8);c.lineTo(13,15);c.lineTo(18,20);c.lineTo(16,27);c.moveTo(14,13);c.lineTo(22,15);c.lineTo(25,12);c.moveTo(14,15);c.lineTo(8,18);c.stroke();
 }else{
  const palettes=[['#57b99c','#c7ffe6'],['#e0a44b','#fff0af'],['#68bccd','#c8fbff'],['#c67c9a','#ffe0ef'],['#8cbd4f','#e4ffb7'],['#9784cf','#e7d6ff']],[base,light]=palettes[index%6];c.shadowColor=base;c.shadowBlur=5;
  if(index%4===0){zonePolygon(c,[[16,2],[25,10],[22,24],[13,29],[5,18],[8,7]],base);zonePolygon(c,[[16,3],[17,16],[8,8]],light);zonePolygon(c,[[17,16],[22,24],[13,28]],'#344d51');R(17,8,2,9,light)}
  else if(index%4===1){for(let i=0;i<6;i++){const a=i*Math.PI/3;R(13+Math.cos(a)*9,13+Math.sin(a)*9,6,6,base)}R(11,10,11,13,base);R(13,12,6,6,'#27373c');R(14,11,5,2,light);R(5,14,3,3,light);R(23,15,3,3,light)}
  else if(index%4===2){for(let i=0;i<5;i++){const x=4+i*5,y=7+(i%2)*7;zonePolygon(c,[[x,y+11],[x+2,y-4],[x+6,y+7],[x+3,y+16]],base);R(x+2,y,1,10,light)}}
  else{c.strokeStyle=base;c.lineWidth=4;c.beginPath();for(let i=0;i<70;i++){const a=i*.2,r=1+i*.16,x=16+Math.cos(a)*r,y=16+Math.sin(a)*r;i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();R(15,14,3,3,light);R(6,7,3,2,light)}
  c.shadowBlur=0;R(10+(index%3)*3,5,2,2,light);R(23,22,2,2,light);
 }c.restore();
};
