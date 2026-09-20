'use strict';
// Compact canvas scenery; all coordinates stay in the existing world scale.
function zonePolygon(c,points,color){c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill()}
function zoneTent(c,x,y,w=38,h=29,abandoned=false){
 const R=(a,b,d,e,col)=>rect(c,x+a,y+b,d,e,col),top=-h;
 R(-w/2-3,3,w+12,4,'#182820a0');
 zonePolygon(c,[[-w/2+x,y+2],[x-3,y+top],[x+w/2,y+2]],'#28362c');
 zonePolygon(c,[[x-w/2+2,y],[x-3,y+top+2],[x+5,y]],abandoned?'#777859':'#b7a36c');
 zonePolygon(c,[[x-3,y+top+2],[x+w/2-1,y],[x+5,y]],abandoned?'#515e47':'#75815c');
 zonePolygon(c,[[x-3,y+top+9],[x-11,y],[x+3,y]],'#172a26');
 zonePolygon(c,[[x-3,y+top+9],[x-1,y-1],[x+3,y]],'#d0bb7d');
 R(-4,top,3,3,'#e3d0a1');R(-w/2,1,w,2,'#c0ae7b');
 c.strokeStyle='#b0a889';c.lineWidth=1;c.beginPath();c.moveTo(x-3,y+top+1);c.lineTo(x-w/2-6,y+5);c.moveTo(x+w/2-2,y-1);c.lineTo(x+w/2+6,y+5);c.stroke();
 R(-w/2-7,3,2,4,'#c2c8b0');R(w/2+5,3,2,4,'#c2c8b0');
 R(6,-10,6,1,'#b7b487');R(9,-7,4,1,'#3d4e39');
 if(abandoned){R(-12,-5,4,3,'#354437');R(6,-12,3,6,'#273b32');R(5,-6,6,2,'#a4996d')}
}
function zoneFire(c,x,y,time,lit){
 const R=(a,b,w,h,col)=>rect(c,x+a,y+b,w,h,col);
 c.save();
 if(lit){const glow=c.createRadialGradient(x,y-4,1,x,y-4,30);glow.addColorStop(0,'#ffb44470');glow.addColorStop(1,'#ff942900');c.fillStyle=glow;c.fillRect(x-30,y-34,60,60)}
 for(let i=0;i<9;i++){const a=i*Math.PI*2/9;R(Math.cos(a)*10-2,Math.sin(a)*5,4,3,i%2?'#a6a590':'#657468')}
 R(-7,1,15,3,lit?'#5d382b':'#292f2b');R(-5,-1,11,3,lit?'#b06c37':'#545a50');
 for(let i=0;i<5;i++)R(-6+i*3,2-i%2,2,1,lit?'#ff9d36':'#b3b3a0');
 if(lit){
  c.shadowColor='#ffb342';c.shadowBlur=7;
  for(let i=0;i<5;i++){const h=7+(Math.sin(time*7+i*1.8)+1)*4;R(-7+i*3,-h,3,h+1,i%2?'#ffad36':'#f36b26');R(-6+i*3,-h*.62,2,h*.65,'#ffe18a')}
  R(-2,-7,4,8,'#fff4bd');c.shadowBlur=0;
  for(let i=0;i<3;i++){const phase=(time*.55+i*.33)%1;R(Math.sin(time+i*3)*6,-13-phase*11,1,2,'#ffd271')}
 }else{R(-5,-2,3,2,'#c2c0ac');R(2,0,4,2,'#909586')}
 c.restore();
}
// Pixel assets share the existing canvas renderer and saved world coordinates.
detailedHouse=function(x,y,w,h,variant=0){
 const wood=variant!==2,c=g,R=(a,b,d,e,color)=>rect(c,x+a,y+b,d,e,color);
 R(6,12,w+9,h+6,'#18221dba');R(-2,5,w+4,h+4,'#242e29');R(0,7,w,h,wood?'#a28257':'#a4aaa6');R(w-9,7,9,h,wood?'#755539':'#727e80');R(-2,h+4,w+4,5,'#7d8179');
 for(let j=9;j<h+5;j+=5){R(0,j,w-9,1,wood?'#d0ab75':'#c6cbc2');R(0,j+3,w-9,1,wood?'#624933':'#7e8886');if(wood){R(1,j,3,4,'#bf9964');R(w-13,j,3,4,'#bf9964')}else for(let i=3;i<w-8;i+=13)R(i+(j%2)*4,j,1,4,'#7d8988')}
 c.fillStyle=wood?'#634e40':'#596a76';c.beginPath();c.moveTo(x-5,y+8);c.lineTo(x+w*.45,y-14);c.lineTo(x+w+5,y+8);c.closePath();c.fill();
 for(let i=0;i<5;i++){const yy=-9+i*4,half=(i+1)*w*.095;R(w*.45-half,yy,half*2,1,wood?'#9d8060':'#89989d')}
 R(-5,7,w+10,3,wood?'#c2a179':'#d0d0bf');R(w*.72,-12,6,16,'#937564');R(w*.72-1,-14,8,3,'#c0b29b');
 for(const a of [6,w-18]){R(a-2,13,13,13,wood?'#d4c09a':'#d1d7c9');R(a,15,9,9,'#203941');R(a+1,16,3,3,'#88aaa9');R(a+4,15,1,9,'#b0b9a3');R(a,19,9,1,'#b0b9a3');R(a-3,25,15,2,'#c0b69c')}
 R(w/2-5,h-11,11,18,'#3b3329');R(w/2-4,h-10,3,16,'#8d7050');R(w/2+3,h-3,2,2,'#d7c49a');R(w/2-8,h+7,18,3,'#b4ae95');R(w/2-10,h+10,22,2,'#7b8378');
 if(variant===1){R(w*.2,-2,9,5,'#26302c');R(w*.2+2,-1,2,7,'#b69b74');R(5,17,12,2,'#9f845d')}
 const r=seeded(x*331+y*97+w);for(let i=0;i<9;i++)R(-7+r()*(w+20),h+13+r()*9,3+r()*4,2,wood?'#a88b61':'#a6aba0');
};
detailedFactory=function(p){
 const x=p.x-43,y=p.y-22,R=(a,b,w,h,color)=>rect(g,x+a,y+b,w,h,color);
 R(8,10,90,53,'#182725bc');R(-2,-2,84,49,'#343f42');R(0,1,79,44,'#979f9e');R(66,1,13,43,'#667479');R(-3,-4,85,6,'#c1c3b8');R(2,3,61,23,'#687b83');
 for(let i=0;i<7;i++){R(5+i*9,5,6,18,'#2c454f');R(6+i*9,6,4,6,'#8bafaf');R(5+i*9,14,6,1,'#c0c7b6');R(4+i*9,4,1,21,'#b9c4bf')}
 R(0,28,79,16,'#a4aaa4');for(let i=0;i<5;i++)R(3+i*16,28,1,15,'#7c8782');R(27,28,24,17,'#453e34');for(let i=0;i<6;i++)R(29,29+i*2,20,1,'#937357');R(4,35,10,8,'#344c53');R(57,34,7,9,'#32484c');
 for(const [a,b,w,h] of [[8,23,5,10],[19,25,3,5],[63,3,3,19],[70,33,6,8],[40,-3,13,3]]){R(a,b,w,h,'#a6603b');R(a+1,b,2,Math.max(2,h-3),'#d08d4a')}
 R(65,-31,10,35,'#967c6b');for(let j=0;j<8;j++){R(65,-29+j*4,10,1,'#544c46');R(66,-28+j*4,3,2,'#bb9780')}R(63,-33,14,3,'#c1b4a1');
 R(84,11,17,31,'#788b91');R(84,9,17,4,'#b5c4c2');R(87,14,3,25,'#b4c2ba');R(97,20,4,20,'#a36a44');R(101,17,8,4,'#bc8c59');R(107,17,3,31,'#956c4c');
 detailedHouse(x-8,y+48,32,20,2);R(31,48,3,16,'#bd9367');R(31,61,54,3,'#a46f48');for(let i=0;i<7;i++){R(-9+i*14,79,2,9,'#a5afa2');R(-9+i*14,81,14,1,'#7c8d88')}
};
const previousLocation=WorldRenderer.prototype.location;
WorldRenderer.prototype.location=function(p){if(p.type==='house'){const wood=/изба|лесник|хутор/i.test(p.name);detailedHouse(-25,-19,50,35,wood?(p.variant%2):2);return}previousLocation.call(this,p);if(p.type==='bunker'){rect(g,-33,-18,66,5,'#b0b7ad');rect(g,-27,-11,6,27,'#9ba7a1');rect(g,-9,1,18,19,'#5f7479');rect(g,3,7,4,5,'#b8c5b4')}if(p.type==='waterTower'){rect(g,-23,-43,46,3,'#bbc5bd');for(let i=0;i<5;i++)rect(g,-20+i*9,-32+i%3*4,3,12-i,'#b27748');rect(g,15,-26,7,11,'#875334')}};
WorldRenderer.prototype.deciduous=function(c,x,y,size,r){
 const birch=r()<.55,red=r()<.42,palette=red?['#753e35','#a9513b','#c27346','#da9658']:['#867344','#b19a4f','#d0b758','#e3ca77'];
 rect(c,x+3,y+3,size*.65,5,'#25302780');rect(c,x-2,y-size*.73,4,size*.85,birch?'#d2d0b9':'#968e77');for(let i=0;i<5;i++)rect(c,x-2,y-i*5,2,2,birch?'#4b5148':'#696c59');
 for(let i=0;i<4;i++){rect(c,x-9,y-size*.5-i*4,9,2,'#898b73');rect(c,x+2,y-size*.45-i*5,9,2,'#b0b094')}
 for(let i=0;i<22;i++){const a=i*2.4,d=Math.sqrt(r())*size*.45,xx=Math.round(x+Math.cos(a)*d),yy=Math.round(y-size*.8+Math.sin(a)*d*.66);rect(c,xx-5,yy+2,10,7,red?'#663c32':'#675c35');rect(c,xx-4,yy,8+r()*5,5+r()*4,palette[i%3]);rect(c,xx-3,yy-1,4,2,palette[3]);for(let j=0;j<3;j++)rect(c,xx-3+r()*9,yy+r()*6,2,1,palette[(i+j)%4])}
 for(let i=0;i<8;i++)rect(c,x+(r()-.5)*size,y+r()*8,2+r()*2,1,palette[i%3]);
};
WorldRenderer.prototype.connectRoads=function(map){
 const roads=map.roads.map(r=>({...r,points:r.points.map(p=>({...p}))})),nodes=[map.camp,...map.pois,map.exit],r=seeded(this.seed+913),edges=new Set();
 const signature=(a,b)=>[`${a.x},${a.y}`,`${b.x},${b.y}`].sort().join('|');for(const road of roads)edges.add(signature(road.points[0],road.points.at(-1)));
 for(const from of nodes){const nearest=nodes.filter(p=>p!==from).sort((a,b)=>Zone.distance(a,from)-Zone.distance(b,from)).slice(0,2);for(const to of nearest){const key=signature(from,to);if(edges.has(key))continue;edges.add(key);roads.push({wide:false,points:[{x:from.x,y:from.y},{x:(from.x+to.x)/2+(r()-.5)*38,y:(from.y+to.y)/2+(r()-.5)*32},{x:to.x,y:to.y}]})}}
 return roads;
};
WorldRenderer.prototype.groundCover=function(map,r){
 const nearRoad=(p)=>this.roads.some(road=>road.points.slice(1).some((b,i)=>{const a=road.points[i],dx=b.x-a.x,dy=b.y-a.y,t=Zone.clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)<(road.wide?13:6)}));
 for(let i=0;i<1900;i++){const p={x:15+r()*(map.width-30),y:20+r()*(map.height-40)};if(map.pois.some(q=>Zone.distance(p,q)<48)||Zone.distance(p,map.camp)<38||Zone.distance(p,map.exit)<100||nearRoad(p))continue;
  const bush=i%4===0,colors=bush?['#606e48','#8c8150','#ac8b4c','#91543e']:['#737950','#8e9360','#b6ae79'];const color=colors[Math.floor(r()*colors.length)];
  if(bush){rect(g,p.x-7,p.y+3,18,4,'#293b2a85');for(let j=0;j<6;j++){const xx=p.x+(r()-.5)*17,yy=p.y-r()*11;rect(g,xx,yy,6,5,color);rect(g,xx,yy,3,1,'#c4b581')}rect(g,p.x,p.y-4,1,10,'#6a6245')}
  else for(let j=0;j<5;j++){const xx=p.x+j*3,yy=p.y+r()*4;rect(g,xx,yy-3-r()*4,1,6,color);rect(g,xx-1,yy-3,3,1,color)}
 }
};
WorldRenderer.prototype.anomaly=function(c,p,t,searched){
 c.save();c.translate(p.x,p.y);c.globalAlpha=searched?.3:1;const color={fire:'#ff9b39',electric:'#62dfff',acid:'#b6f15e',gravity:'#baa1ff'}[p.element];
 const glow=c.createRadialGradient(0,-9,4,0,-9,55);glow.addColorStop(0,color+'79');glow.addColorStop(1,color+'00');c.fillStyle=glow;c.fillRect(-56,-65,112,112);c.shadowColor=color;c.shadowBlur=10;
 if(p.element==='fire'){for(let i=0;i<12;i++){const x=-30+i*5,h=13+(Math.sin(t*5+i*1.7)+1)*13;rect(c,x,-h,5,h+5,i%2?'#e8692b':'#f3a143');rect(c,x+1,-h*.58,2,h*.6,'#ffdf85')}for(let i=0;i<9;i++){const phase=(t*.45+i*.11)%1;rect(c,Math.sin(i*3+t)*23,-10-phase*55,2,3,'#ffbf57')}}
 else if(p.element==='electric'){for(let i=0;i<5;i++){const x=-29+i*14;c.strokeStyle=i%2?'#d6ffff':'#72caff';c.lineWidth=i%2?1:2;c.beginPath();c.moveTo(x,7);c.lineTo(x+8,-7);c.lineTo(x-4+Math.sin(t*11+i)*7,-18);c.lineTo(x+4,-39-Math.sin(t*6+i)*8);c.stroke()}for(let i=0;i<8;i++)rect(c,Math.cos(t+i*2)*34,Math.sin(t*2+i)*15-12,3,2,'#e5ffff')}
 else if(p.element==='acid'){c.fillStyle='#65892d';c.beginPath();c.ellipse(0,0,36,15,0,0,Math.PI*2);c.fill();c.strokeStyle='#d7ff79';c.lineWidth=2;c.stroke();for(let i=0;i<10;i++){const phase=(t*.45+i*.13)%1,x=Math.cos(i*2.3)*29,y=Math.sin(i*2.3)*9-phase*25;c.strokeStyle=i%2?'#e4ff99':'#9fe85d';c.beginPath();c.arc(x,y,2+phase*3,0,Math.PI*2);c.stroke()} }
 else{for(let i=0;i<5;i++){c.strokeStyle=i%2?'#d4caff':'#9380df';c.lineWidth=2;c.beginPath();c.ellipse(0,-i*7,34-i*5+Math.sin(t*3+i)*2,12-i*1.7,t*.12,0,Math.PI*2);c.stroke()}for(let i=0;i<9;i++){const a=t*1.4+i*2.1;rect(c,Math.cos(a)*32,-16+Math.sin(a)*17,3,3,'#e2d5ff')}}c.restore();
};
WorldRenderer.prototype.player=function(c,s){
 const x=Math.round(s.x),y=Math.round(s.y),sitting=['camp','rest'].includes(s.mode)||['camp','rest'].includes(s.previousMode),step=sitting?0:(Math.sin(s.steps*.4)>0?1:-1);
 const coat=['#baaa86','#ac8157','#95a475','#92ae93','#b5c4b6','#a5c9cb'][s.armor],shade=['#7c7057','#745238','#59674a','#526e5e','#647b72','#5d8288'][s.armor];
 c.save();c.translate(x,y);c.scale(s.facing<0?-1:1,1);const R=(a,b,w,h,col)=>rect(c,a,b,w,h,col),edge='#1c2927';
 R(-10,12,23,4,'#132019b0');
 if(sitting){R(-6,6,18,7,edge);R(-4,7,14,4,shade);R(7,10,8,4,'#526254');R(12,12,5,3,edge)}
 else{R(-5,5,5,9+step,edge);R(2,5,5,9-step,edge);R(-4,6,3,6+step,shade);R(3,6,3,6-step,shade);R(-5,12+step,6,3,edge);R(2,12-step,7,3,edge);R(-4,9,2,2,'#a2ac8d');R(3,9,2,2,'#a2ac8d')}
 R(-10,-7,6,15,edge);R(-9,-6,4,12,'#7e805c');R(-9,-5,3,2,'#b4ad82');R(-9,3,4,2,'#555b44');
 R(-7,-8,15,16,edge);R(-6,-7,13,13,coat);R(4,-6,3,12,shade);R(-5,-6,2,12,'#e0d0a6');R(-2,-6,1,11,shade);
 R(-4,-3,4,4,shade);R(1,-3,4,4,shade);R(-4,-3,4,1,'#c6c9a6');R(1,-3,4,1,'#c6c9a6');R(-6,5,13,3,'#4e4a39');R(-1,5,3,2,'#d7c7a1');
 R(-5,-17,11,10,edge);R(-4,-16,9,8,'#8b9879');R(-4,-17,8,3,coat);R(-3,-16,6,1,'#d8d5b0');R(1,-13,5,6,'#d4af87');R(4,-12,3,2,'#e5c49c');R(3,-13,2,1,'#303c37');R(2,-8,3,2,'#725b45');
 if(s.armor>=3){R(0,-13,6,3,'#293e42');R(1,-13,3,1,'#a5d2c9');R(3,-10,4,4,'#6f8580');R(5,-9,2,2,'#293b39')}
 if(s.armor>=4){R(-7,-7,2,17,'#d4ded0');R(7,-6,2,17,'#a8c3ba');R(-6,-7,5,2,'#e2dfbf');R(4,-7,5,2,'#e2dfbf');R(-6,8,3,3,'#647e7b');R(6,8,3,3,'#647e7b')}
 // The held weapon uses the exact same silhouette and palette as its inventory icon.
 c.save();c.translate(-5,sitting?0:-4);c.scale(.5,.5);this.weaponIcon(c,s.weapon);c.restore();
 R(-5,-2,3,6,shade);R(-3,2,9,3,coat);R(4,2,3,3,'#dcc09b');if(s.weapon>=2&&s.weapon!==3)R(11,3,3,2,'#d8ba94');
 c.restore();c.save();c.shadowColor='#83ff16';c.shadowBlur=9;c.fillStyle='#a1ff20';c.fillRect(x-2,y-33,4,5);c.fillRect(x-6,y-29,12,2);c.fillRect(x-4,y-27,8,2);c.fillRect(x-2,y-25,4,2);c.restore();
};
WorldRenderer.prototype.weaponIcon=function(c,index){
 const R=(x,y,w,h,color)=>rect(c,x,y,w,h,color),steel='#b5bfc2',dark='#323e45',edge='#e0e5d8',wood='#a97446';
 if(index===0){R(5,20,15,5,wood);R(19,17,2,11,dark);R(21,19,22,5,steel);R(23,19,22,1,edge);R(43,20,4,2,steel);return}
 if(index===1){R(22,11,25,4,steel);R(44,9,2,3,dark);R(15,11,12,11,dark);R(17,12,9,8,steel);for(let x=18;x<25;x+=3)R(x,14,1,3,'#596269');R(11,13,6,5,steel);R(11,18,7,12,wood);R(9,27,10,3,'#c2945c');R(22,21,8,1,steel);R(29,18,1,4,steel);R(13,8,3,4,dark);return}
 if(index===3){R(12,10,33,7,dark);R(13,10,31,2,steel);R(41,8,2,3,edge);R(13,17,10,4,'#647379');R(13,20,8,11,dark);R(10,28,10,3,dark);R(22,20,9,1,steel);R(30,17,1,4,steel);for(let i=0;i<4;i++)R(13+i*2,12,1,4,'#889396');return}
 if(index===2||index===4){R(6,16,12,6,wood);R(3,20,9,5,wood);R(17,13,10,8,dark);R(22,12,index===2?22:28,3,steel);R(24,16,index===2?20:24,2,'#7a898c');R(28,17,index===2?8:13,4,wood);R(19,20,2,5,steel);R(20,24,6,1,steel);if(index===4){for(let i=0;i<5;i++)R(28+i*2,18,1,3,'#63492e');R(46,10,2,3,edge)}return}
 if(index===5){R(4,14,10,3,steel);R(3,14,2,9,steel);R(12,12,25,8,dark);R(13,12,23,2,steel);R(34,14,15,3,steel);R(43,11,3,3,dark);R(17,20,5,10,'#68777a');R(26,19,5,13,dark);R(30,25,3,7,dark);for(let i=0;i<4;i++)R(29+i*2,15,1,3,'#839398');return}
 if(index===6){R(2,17,12,7,wood);R(10,15,7,4,wood);R(16,13,19,7,dark);R(17,13,17,2,steel);R(34,14,12,5,wood);R(43,13,8,2,steel);R(47,10,2,5,dark);R(36,11,10,2,dark);R(19,20,4,9,wood);R(27,20,5,5,steel);R(29,25,5,4,steel);R(32,29,5,3,steel);R(21,22,5,1,steel);return}
 if(index===7){R(2,17,14,7,wood);R(4,19,8,3,'#25312c');R(14,14,18,7,dark);R(31,13,20,6,'#79898b');R(48,13,3,6,dark);R(21,7,16,4,dark);R(22,7,15,1,steel);R(24,11,2,3,steel);R(20,20,4,9,wood);R(29,20,5,9,dark);R(33,14,16,1,steel);return}
 R(2,18,13,7,dark);R(12,13,20,9,'#697b80');R(32,12,19,3,steel);R(32,20,19,3,steel);R(30,15,20,4,'#314f59');for(let i=0;i<5;i++)R(30+i*4,13,2,10,'#71cbc9');R(18,22,5,9,dark);R(24,22,6,7,'#7d9392');R(20,7,15,4,dark);R(23,8,7,1,'#bbe6d6');
};
const previousEquipment=WorldRenderer.prototype.equipment;
WorldRenderer.prototype.equipment=function(canvas,type,index){
 const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);
 if(type==='weapon'){this.weaponIcon(c,index);return}
 if(type!=='armor')return previousEquipment.call(this,canvas,type,index);
 const R=(x,y,w,h,color)=>rect(c,x,y,w,h,color),base=['#a89a76','#a17a50','#89966b','#819e89','#8caaa0','#95bdc5'][index],shade=['#685f48','#67472f','#525e42','#425e51','#435f5d','#486e7b'][index],light=['#d8c9a2','#cba578','#b6c296','#b4cbb3','#c5d6c7','#c5e4e0'][index],edge='#202e2c';
 R(26,8,36,55,edge);R(16,14,13,38,edge);R(59,14,13,38,edge);R(12,27,8,27,edge);R(68,27,8,27,edge);
 R(28,12,32,47,base);R(19,16,10,30,base);R(59,16,10,30,base);R(15,30,6,20,shade);R(67,30,6,20,shade);
 R(29,14,4,40,light);R(54,15,6,42,shade);R(20,18,3,21,light);R(62,20,5,26,shade);R(14,48,8,6,shade);R(66,48,8,6,shade);
 R(34,5,20,10,shade);R(37,7,14,7,edge);R(32,10,7,8,light);R(49,10,7,8,base);R(42,16,2,42,edge);R(44,17,1,40,light);R(43,22,3,3,'#d1c5a3');
 for(const x of [32,47]){R(x,25,10,11,shade);R(x,24,10,3,light);R(x+4,28,2,2,'#d0c5a3');R(x,43,10,10,shade);R(x+1,44,8,2,light)}
 for(let y=20;y<58;y+=6){R(30,y,1,2,shade);R(57,y,1,2,light)}
 R(28,57,32,4,shade);R(35,59,7,3,base);R(46,59,8,3,base);
 if(index===2){for(const [x,y] of [[22,23],[51,18],[33,38],[61,34],[47,51]]){R(x,y,5,3,'#666b47');R(x+2,y+3,4,3,'#c1b28b')}}
 if(index>=3){R(31,19,26,20,edge);R(33,20,22,16,shade);R(35,21,18,2,light);for(let y=26;y<36;y+=4)R(34,y,20,2,base);R(29,39,29,4,edge);R(41,39,6,4,light)}
 if(index===4){for(const x of [17,66]){R(x,13,4,41,'#b9cbc5');R(x+1,17,1,31,'#e0e5d5');R(x-2,30,8,7,shade);R(x,31,4,4,'#b4bbb1')}R(24,12,10,4,light);R(55,12,10,4,light);R(27,49,4,15,'#d0d8c4');R(57,49,4,15,'#a9c1b7')}
 if(index===5){R(31,2,26,18,shade);R(35,4,18,11,edge);R(37,5,14,7,'#83b6c2');R(38,5,7,2,'#d2ede2');R(39,14,10,6,'#b2c7bd');R(41,15,6,3,'#324b52');R(57,22,4,21,'#c7d4b9');R(58,40,6,4,'#799b96');R(23,23,4,12,'#c7d4b9')}
};
WorldRenderer.prototype.groups=function(c,s){
 for(const group of s.map.groups.filter(group=>!group.defeated))for(let i=0;i<3;i++){
  const dog=group.type==='dogs',x=group.x+Math.cos(i*2.1+group.phase)*22,y=group.y+Math.sin(i*2.1+group.phase)*19;
  const facing=group.target.x<group.x?-1:1,step=Math.sin((s.elapsed+(s.ambientTime||0))*(dog?9:5)+i*2)>0?2:-2;
  c.save();c.translate(Math.round(x),Math.round(y));c.scale(facing/1.5,1/1.5);
  const R=(a,b,w,h,color)=>rect(c,a,b,w,h,color),outline='#202b28',light=dog?'#dfceb0':'#c6b399',fur=dog?'#b29c7c':'#9c8771',shade=dog?'#74634f':'#625449';
  R(-13,10,dog?32:37,5,'#15221bd0');
  if(dog){
   R(-13,-4,24,13,outline);R(-11,-3,21,10,fur);R(-8,-4,16,3,light);R(-9,4,16,4,shade);R(-12,-3,5,7,'#cbb28c');
   R(-19,-8,3,6,outline);R(-17,-4,7,3,outline);R(-18,-7,2,5,light);R(-16,-3,6,1,fur);
   R(7,-8,11,11,outline);R(8,-7,9,9,fur);R(10,-6,5,2,light);R(13,-2,9,5,outline);R(15,-1,6,3,'#d3c2a1');R(20,-1,3,3,'#272d29');
   R(8,-12,3,7,outline);R(9,-10,1,3,'#d9b792');R(14,-11,3,5,outline);R(15,-10,1,3,shade);R(13,-4,2,2,'#e2bc76');R(16,3,2,2,'#f0e3c5');
   for(const [a,d] of [[-10,step],[-5,-step],[4,-step],[8,step]]){R(a,6,3,7+d,outline);R(a,7,2,4+d,fur);R(a-1,12+d,5,2,light)}
   R(-2,-1,4,3,'#786353');R(3,1,3,2,'#d3bea0');R(-6,1,2,2,light);
  }else{
   R(-16,-7,31,20,outline);R(-14,-6,27,16,fur);R(-11,-8,20,4,shade);R(-11,-6,19,3,light);R(-14,6,25,5,shade);R(8,-3,13,14,outline);R(10,-2,10,11,fur);
   R(18,2,8,8,outline);R(20,3,6,5,'#c3a788');R(24,4,2,3,'#634d42');R(13,-3,3,3,light);R(18,0,2,2,'#d6a573');
   R(9,-9,5,7,outline);R(10,-7,3,4,'#c0a485');R(18,8,3,5,'#f1e4bd');R(21,6,2,5,'#e4d4ae');R(21,5,3,2,'#f1e4bd');
   for(let j=0;j<8;j++)R(-11+j*3,-10+(j%2),1,5,'#d1bea1');
   for(const [a,d] of [[-12,step],[-6,-step],[6,-step],[11,step]]){R(a,10,4,5+d,outline);R(a,10,3,3+d,fur);R(a-1,14+d,5,2,'#d6c9ad')}
   R(-20,-2,5,2,outline);R(-21,-4,2,4,light);R(-8,-1,6,3,'#806c58');R(-1,2,5,3,'#bfa68a');R(-13,1,3,4,light);
  }
  c.restore();
 }
};
