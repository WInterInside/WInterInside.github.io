'use strict';
class WorldRenderer{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.seed=null;this.camera={x:0,y:0};this.zoom=.86;this.reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;this.particles=Array.from({length:85},(_,i)=>({x:seeded(i+11)()*960,y:seeded(i+78)()*540,k:seeded(i+183)()}))}
 rebuild(s){
  this.seed=s.seed;this.poiCount=s.map.pois.length;const map=s.map;this.roads=this.connectRoads(map);this.ground=document.createElement('canvas');this.ground.width=map.width;this.ground.height=map.height;g=this.ground.getContext('2d');const r=seeded(s.seed+81);
  rect(g,0,0,map.width,map.height,'#4c5041');
  for(let i=0;i<38000;i++)rect(g,r()*map.width,r()*map.height,1+r()*5,1+r()*3,['#535344','#424c3e','#59594a','#43493d','#5e5b49'][Math.floor(r()*5)]);
  for(const road of this.roads){g.beginPath();road.points.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.lineWidth=road.wide?19:7;g.strokeStyle=road.wide?'#73705b':'#66634f';g.lineCap='round';g.lineJoin='round';g.stroke();if(road.wide){g.lineWidth=2;g.strokeStyle='#99907770';g.stroke()}}
  for(let i=0;i<160;i++){const x=r()*map.width,y=r()*map.height;if(map.pois.some(p=>Zone.distance(p,{x,y})<60))continue;rect(g,x,y,5+r()*15,3+r()*7,'#374b4966');rect(g,x+2,y,7,1,'#9caa9355')}
  this.groundCover(map,r);
  for(const forest of map.forests)for(let i=0;i<70;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*forest.radius,x=forest.x+Math.cos(a)*d,y=forest.y+Math.sin(a)*d;if(x<15||y<35||x>map.width-15||y>map.height-10||map.pois.some(p=>Zone.distance(p,{x,y})<63)||Zone.distance(map.camp,{x,y})<60||Zone.distance(map.exit,{x,y})<100)continue;if(r()<.34)tree(x,y,23+r()*17,r);else this.deciduous(g,x,y,20+r()*15,r)}
  for(let i=0;i<1400;i++){const x=r()*map.width,y=r()*map.height;rect(g,x,y,2,1,'#a3977170');if(i%4===0){rect(g,x,y-4,1,5,'#99977760');rect(g,x+3,y-2,1,3,'#8f92745c')}}
  for(const p of map.pois){if(p.type==='anomaly'){rect(g,p.x-17,p.y-6,35,13,'#34464080');continue}g.save();g.translate(p.x,p.y);g.scale(.78,.78);this.location(p);g.restore()}
  g.save();g.translate(map.exit.x,map.exit.y);g.scale(.9,.9);g.translate(-891,-69);drawCheckpoint();g.restore();
 }
 deciduous(c,x,y,size,r){
  const birch=r()<.5;rect(c,x+3,y+3,14,4,'#283b2b70');rect(c,x-1,y-size*.65,3,size*.8,birch?'#b8b7a1':'#827d67');
  for(let n=0;n<3;n++){const yy=y-size*.3-n*6;rect(c,x-6-n*2,yy,7+n*2,2,birch?'#909785':'#726f5c');rect(c,x+2,yy-4,6+n*2,2,'#8a907b');if(birch)rect(c,x-1,yy,3,1,'#424c3b')}
  for(let n=0;n<7;n++){const xx=x+(r()-.5)*size*.8,yy=y-size+r()*size*.65;if(r()>.25){rect(c,xx,yy,4+r()*5,3+r()*4,['#777b5b','#8c8766','#656c52','#979274'][Math.floor(r()*4)]);rect(c,xx,yy,3,1,'#a49d7780')}}
 }
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
 draw(s,time){
  if(this.seed!==s.seed||this.poiCount!==s.map.pois.length)this.rebuild(s);const c=this.ctx,vw=this.canvas.width,vh=this.canvas.height,z=this.zoom;
  this.updateCamera(s);const cam=this.camera,t=this.reduced?0:time;
  c.imageSmoothingEnabled=false;c.clearRect(0,0,vw,vh);c.save();c.scale(z,z);c.translate(-cam.x,-cam.y);c.drawImage(this.ground,0,0);
  this.camp(c,s.map.camp,t);if(s.restCamp)this.camp(c,s.restCamp,t);
  for(const p of s.map.pois){if(p.type==='anomaly')this.anomaly(c,p,t,p.searched);const d=Zone.distance(p,s),labelY=['backpack','wallet','cache','corpse'].includes(p.type)?19:['tractor','tank','helicopter','crashSite','fighter'].includes(p.type)?30:47;if(d<135){rect(c,p.x-2,p.y+labelY-10,4,4,p.type==='tunnel'?'#c084fc':p.searched?'#798673':'#c3b998');c.font='12px monospace';c.textAlign='center';c.fillStyle='#18291e';c.fillText(p.name,p.x+1,p.y+labelY+1);c.fillStyle=p.searched?'#9da78e':'#e2dfc5';c.fillText(p.name,p.x,p.y+labelY);c.textAlign='left'}}
  this.groups(c,s,t);c.restore();
  if(s.night){const px=(s.x-cam.x)*z,py=(s.y-cam.y)*z,shade=c.createRadialGradient(px,py,35,px,py,440);shade.addColorStop(0,'#16263325');shade.addColorStop(1,'#071422bb');c.fillStyle=shade;c.fillRect(0,0,vw,vh)}
  if(s.weather==='fog'){for(let i=0;i<5;i++){const x=((i*240+t*9)%(vw+340))-170,yy=80+i*95,gradient=c.createRadialGradient(x,yy,20,x,yy,250);gradient.addColorStop(0,'#c0c9ba3c');gradient.addColorStop(1,'#c0c9ba00');c.fillStyle=gradient;c.fillRect(x-260,yy-260,520,520)}}
  if(!this.reduced){if(s.weather==='rain'){c.strokeStyle='#c3c8b739';c.beginPath();for(const p of this.particles){const x=(p.x+t*65)%vw,y=(p.y+t*250)%vh;c.moveTo(x,y);c.lineTo(x-3,y+10)}c.stroke()}for(let i=0;i<(s.weather==='wind'?22:9);i++){const p=this.particles[i],x=(p.x+t*(16+p.k*24))%vw,y=(p.y+t*5+Math.sin(t+p.k*9)*8)%vh;rect(c,x,y,3,2,'#b4a47d80')}}
  c.save();c.scale(z,z);c.translate(-cam.x,-cam.y);this.player(c,s);c.restore();
  const vignette=c.createRadialGradient(vw/2,vh/2,240,vw/2,vh/2,580);vignette.addColorStop(0,'#11201400');vignette.addColorStop(1,'#07120b66');c.fillStyle=vignette;c.fillRect(0,0,vw,vh);
  this.minimap(c,s);
 }
 minimap(c,s){const w=133,h=83,x=813,y=14;rect(c,x-5,y-5,w+10,h+10,'#15241dde');c.strokeStyle='#8c977366';c.strokeRect(x-5,y-5,w+10,h+10);const point=p=>({x:x+p.x/s.map.width*w,y:y+p.y/s.map.height*h});for(const road of (this.roads||s.map.roads)){c.beginPath();road.points.forEach((p,i)=>{const q=point(p);i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y)});c.strokeStyle='#a59c6955';c.stroke()}for(const p of s.map.pois){const q=point(p);rect(c,q.x,q.y,2,2,p.type==='tunnel'?'#c084fc':p.searched?'#5f705a':p.type==='anomaly'?'#718f80':'#b8b18d')}const end=point(s.map.exit);rect(c,end.x-2,end.y-2,4,4,'#e2d9a8');const player=point(s);rect(c,player.x-1,player.y-1,3,3,'#a2ff35');const cam=this.camera;c.strokeStyle='#c4cfaa66';c.strokeRect(x+cam.x/s.map.width*w,y+cam.y/s.map.height*h,960/this.zoom/s.map.width*w,this.canvas.height/this.zoom/s.map.height*h)}
 equipment(canvas,type,index){const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);if(type==='armor'){const color=['#aa9c79','#ad8d64','#9ca773','#94aa87','#b6c0a4','#b3c9c6'][index];rect(c,12,7,20,27,color);rect(c,6,11,7,17,color);rect(c,31,11,7,17,color);rect(c,18,5,8,6,'#4e5e48');rect(c,21,12,2,20,'#3d5340');rect(c,14,18,5,5,'#c8c295');rect(c,25,18,5,5,'#c8c295');if(index>=4){rect(c,7,9,3,24,'#d4d6b7');rect(c,33,9,3,24,'#d4d6b7')}return}
  const kind=BALANCE.weapons[index].icon;if(kind==='knife'){rect(c,9,20,13,5,'#9c815a');for(let i=0;i<7;i++)rect(c,22+i*4,18+i*.2,4,5-i*.6,'#c8d1bd');return}const length=index<4?31:48;rect(c,6,13,length,5,index===8?'#98d4cb':'#c0c7b0');rect(c,15,18,7,12,'#9a815b');if(kind==='revolver'){rect(c,16,12,10,10,'#9fac97');rect(c,19,14,3,3,'#394d3e')}else if(index<3){rect(c,6,18,length,3,'#727e68')}else{rect(c,28,18,5,11,'#6a7d64');rect(c,2,15,9,7,'#9d855b');if(index>=7)rect(c,23,7,21,4,'#a9c3af')}
 }
}
