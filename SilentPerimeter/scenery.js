'use strict';
let g;
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function sceneRandom(seed){return()=>{seed=(seed+0x6D2B79F5)>>>0;let t=Math.imul(seed^seed>>>15,seed|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const seeded=sceneRandom;
function tree(x,y,size,r){
 const pine=r()<.46,h=size*(pine?1.18:1.12),R=(a,b,w,d,color)=>rect(g,Math.round(x+a),Math.round(y+b),Math.max(1,Math.round(w)),Math.max(1,Math.round(d)),color),top=-h;
 g.fillStyle='#18251c86';g.beginPath();g.ellipse(x+4,y+7,size*.67,5,0,0,Math.PI*2);g.fill();
 R(-9,3,11,3,'#554c38');R(2,2,14,3,'#474b35');R(-7,5,9,2,'#806e48');R(6,5,11,2,'#74613e');R(-5,7,7,2,'#453e2d');R(2,7,8,2,'#65583c');
 // Tapered layered bark with ridges, old scars, knots and a broken lower branch.
 R(-4,top+8,8,h-3,'#302f27');R(-3,top+9,6,h-5,'#403e2e');R(-2,top+10,3,h-6,pine?'#a78155':'#8c7955');R(1,top+11,2,h-7,'#66533a');R(-1,top+12,1,h-8,'#cfaa72');
 for(let i=0;i<Math.floor(h/5);i++){const yy=top+13+i*5;R(-3,yy,1,3,'#594a36');if(i%2===0)R(1,yy+2,2,2,'#d2ad72');if(i%3===0)R(-1,yy+1,1,2,'#362f27')}
 R(-7,top+h*.63,5,2,'#332f27');R(-7,top+h*.63,3,1,'#bb9460');R(2,top+h*.75,6,2,'#342f27');R(3,top+h*.75,3,1,'#b68f5d');
 g.strokeStyle='#574832';g.lineWidth=2;g.beginPath();g.moveTo(-1,y+3);g.lineTo(-11,y+9);g.moveTo(2,y+4);g.lineTo(12,y+10);g.moveTo(0,y+4);g.lineTo(-2,y+11);g.stroke();
 if(pine){
  // Tall exposed reddish trunk and irregular, spreading needle crowns.
  for(let i=0;i<6;i++){
   const side=i%2?1:-1,yy=top+8+i*h*.085,reach=(.22+r()*.17)*size,cx=side*reach;
   R(Math.min(0,cx),yy+4,Math.abs(cx)+3,3,'#4a4834');R(Math.min(0,cx),yy+3,Math.abs(cx)+1,1,'#93744a');R(cx-side*3,yy-1,3,8,'#a28a5a');R(cx-side*2,yy+1,2,5,'#685139');
   const width=10+r()*9;R(cx-width/2-3,yy-3,width+6,8,'#1b352b');R(cx-width/2-1,yy-7,width+3,9,'#315942');R(cx-width/2,yy-9,width,8,'#456c4c');R(cx-width/2+2,yy-10,width*.62,4,'#849765');
   for(let j=0;j<11;j++){const xx=cx-width/2+r()*width;R(xx,yy-7+r()*9,1+r()*2,2,j%3?'#829968':'#294d3a')}
   if(i%2===0){R(cx+side*2,yy+5,3,4,'#6b5738');R(cx+side*3,yy+6,2,3,'#a67e47')}
  }
  R(-9,top-1,18,9,'#1d382d');R(-7,top-4,14,9,'#456c50');R(-5,top-6,10,5,'#849968');R(-3,top-7,5,2,'#a7ad73');R(3,top+1,5,4,'#284b39');
  for(let k=0;k<3;k++)R(-size*.18+k*size*.14,top+size*.35+k*size*.16,3,4,'#a07843');
 }else{
  // Narrow spire and overlapping, drooping spruce boughs.
  for(let level=5;level>=0;level--){
   const yy=top+level*h*.135,half=3+level*size*.074;
   for(let row=0;row<5;row++){const span=half*(.3+row*.19);R(-span-2,yy+row*2,span*2+4,4,row>=3?'#1c392e':'#315b41');R(-span,yy+row*2-1,span*2,2,row%2?'#52784c':'#436c47')}
   R(-half*.55,yy+2,half*.75,2,'#a0a06b');R(-half,yy+7,half*.8,2,'#628353');R(half*.55,yy+8,3,4,'#274b39');
   for(let j=0;j<8;j++){const xx=(r()-.5)*half*2;R(xx,yy+4+r()*6,1+r()*2,2,j%3?'#729361':'#2c503b')}
  }
  R(-1,top-5,2,8,'#8a9e72');R(-3,top+1,5,3,'#517852');
 }
 // Fine branch structure, broken tips and bark seams keep the silhouette readable at close zoom.
 g.strokeStyle=pine?'#4b4833':'#394735';g.lineWidth=1;g.beginPath();
 for(let i=0;i<5;i++){const yy=y-h*.24-i*h*.105,side=i%2?-1:1,reach=size*(.18+i*.018);g.moveTo(x,yy);g.lineTo(x+side*reach*.62,yy-4);g.lineTo(x+side*reach,yy-2-(i%2)*3)}g.stroke();
 for(let i=0;i<9;i++){const yy=y-h*.17-r()*h*.72,side=r()<.5?-1:1,xx=x+side*(5+r()*size*.3);R(xx,yy,2+r()*3,1,pine?'#95a16d':'#7f9b67');if(i%3===0)R(xx+side*2,yy+2,2,2,'#283f31')}
 R(-3,top+h*.48,1,h*.24,'#d1a66d');R(2,top+h*.31,1,h*.19,'#40352b');R(-1,top+h*.7,2,3,'#262820');
 for(const side of [-1,1]){R(side<0?-size*.23:3,y+6,size*.21,2,'#584a35');R(side<0?-size*.18:4,y+4,size*.15,2,'#9a784d')}
}
function house(x,y,w,h){rect(g,x+6,y+7,w,h,'#1b281dcc');rect(g,x,y,w,h,'#555745');rect(g,x,y,w,5,'#87846a');rect(g,x,y+h-4,w,4,'#373d2e');rect(g,x+3,y+6,w-6,h-12,'#3b4335');rect(g,x+8,y+9,w-16,8,'#6c6550');rect(g,x+12,y+h-11,9,11,'#212c23');rect(g,x+w-15,y+11,8,5,'#1b2926');rect(g,x+w-11,y,11,8,'#3c4936');rect(g,x-4,y+9,4,8,'#7b7560');}
function detailedHouse(x,y,w,h,variant=0){
 const r=seeded(x*117+y),wall=variant===2?'#686b58':'#727059';
 rect(g,x+8,y+13,w+5,h,'#1a271db0');rect(g,x,y+5,w,h,wall);
 for(let row=0;row<h;row+=5){rect(g,x,y+7+row,w,1,'#454c3980');for(let col=0;col<w;col+=10)rect(g,x+col+(row%2?4:0),y+7+row,1,4,'#4b513b70')}
 g.fillStyle=variant===2?'#5d6453':'#67634e';g.beginPath();g.moveTo(x-5,y+7);g.lineTo(x+w*.45,y-12);g.lineTo(x+w+5,y+7);g.closePath();g.fill();
 g.strokeStyle='#969075';g.lineWidth=2;g.beginPath();g.moveTo(x-5,y+7);g.lineTo(x+w*.45,y-12);g.lineTo(x+w+5,y+7);g.stroke();
 for(let n=0;n<5;n++)rect(g,x+5+n*7,y+3-Math.min(n,4-n)*2,6,2,'#aaa17c45');
 rect(g,x+w*.7,y-11,5,14,'#807660');rect(g,x+w*.7-1,y-12,7,3,'#a59b7c');
 rect(g,x+7,y+13,9,10,'#283930');rect(g,x+6,y+12,11,2,'#aaa384');rect(g,x+11,y+14,1,8,'#8d8b70');rect(g,x+7,y+17,9,1,'#6d7e68');
 rect(g,x+w-15,y+13,8,9,'#25372e');rect(g,x+w-16,y+12,10,2,'#959376');rect(g,x+w-15,y+20,9,2,'#a39c7a');
 rect(g,x+w/2-3,y+h-12,9,17,'#293729');rect(g,x+w/2-3,y+h-11,2,14,'#96906d');rect(g,x+w/2-6,y+h+5,15,3,'#858168');
 if(variant===1){rect(g,x+1,y-1,13,7,'#2d3c2c');rect(g,x+3,y+1,3,9,'#a29574');rect(g,x+w-4,y+h-6,7,11,'#36472e')}
 for(let n=0;n<11;n++)rect(g,x+r()*w,y+8+r()*h,2,3,'#364a324d');
 for(let n=0;n<8;n++)rect(g,x-5+r()*(w+15),y+h+10+r()*9,3+r()*4,2,'#8b8564');
}
function detailedFactory(p){
 const x=p.x-43,y=p.y-22,w=79,h=44;
 rect(g,x+10,y+14,w+7,h+7,'#1b2b20b0');rect(g,x,y,w,h,'#6e705b');rect(g,x+3,y+4,w-6,h-11,'#4d5b4b');
 for(let n=0;n<13;n++)rect(g,x+4+n*6,y+4,2,h-12,'#8e917158');
 rect(g,x-2,y-1,w+4,4,'#a7a086');rect(g,x,y+h-8,w,8,'#777660');
 for(let n=0;n<7;n++){rect(g,x+5+n*10,y+h-7,6,5,'#233a30');rect(g,x+7+n*10,y+h-7,1,5,'#899781')}
 rect(g,x+21,y+8,20,12,'#263a2d');rect(g,x+20,y+7,23,2,'#a3987a');rect(g,x+24,y+8,2,12,'#78795a');rect(g,x+33,y+8,2,12,'#6e7256');
 rect(g,x+w-15,y-28,9,36,'#87856c');for(let n=0;n<8;n++)rect(g,x+w-15,y-27+n*4,9,1,'#4c5847');rect(g,x+w-18,y-29,15,3,'#b0a488');
 detailedHouse(x-10,y+47,35,20,2);
 rect(g,x+w+6,y+14,18,29,'#526456');rect(g,x+w+7,y+10,16,6,'#98a08a');rect(g,x+w+7,y+37,16,4,'#384b3c');rect(g,x+w+23,y+17,5,3,'#939a7f');
 rect(g,x+30,y+h+9,2,18,'#9c977c');rect(g,x+30,y+h+25,54,2,'#9c977c');
 for(let n=0;n<7;n++){rect(g,x-11+n*14,y+h+37,2,8,'#868269');rect(g,x-11+n*14,y+h+39,14,1,'#a0a081')}
 rect(g,x-15,y+14,10,16,'#746e50');rect(g,x-15,y+15,10,2,'#a4956b');
}
function drawZonePerimeter(map){
 const step=20,post=(x,y)=>{rect(g,x-1,y-15,3,16,'#514f40');rect(g,x-1,y-15,1,14,'#9a9476')};
 const wire=(x,y,horizontal)=>{g.strokeStyle='#817d67';g.lineWidth=1;g.beginPath();if(horizontal){g.moveTo(x,y-12);g.lineTo(x+step,y-12);g.moveTo(x,y-5);g.lineTo(x+step,y-5);for(let q=2;q<step;q+=4){g.moveTo(x+q,y-14);g.lineTo(x+q+4,y-3)}}else{g.moveTo(x-12,y);g.lineTo(x-12,y+step);g.moveTo(x-5,y);g.lineTo(x-5,y+step);for(let q=2;q<step;q+=4){g.moveTo(x-14,y+q);g.lineTo(x-3,y+q+4)}}g.stroke()};
 for(let x=0;x<=map.width;x+=step){post(x,18);post(x,map.height-18);wire(x,18,true);wire(x,map.height-18,true)}
 for(let y=18;y<=map.height-18;y+=step){
  post(18,y);wire(18,y,false);
  if(Math.abs(y-map.exit.y)>68){post(map.width-18,y);wire(map.width-18,y,false)}
 }
 for(let x=180;x<map.width-100;x+=300){
  const y=18;rect(g,x-16,y-55,32,25,'#59634f');rect(g,x-20,y-59,40,5,'#a39d7e');rect(g,x-14,y-51,28,14,'#253a30');rect(g,x-12,y-49,8,9,'#9caa89');rect(g,x+3,y-49,8,9,'#9caa89');
  rect(g,x-14,y-30,4,12,'#77765e');rect(g,x+10,y-30,4,12,'#77765e');g.strokeStyle='#8c8b71';g.lineWidth=2;g.beginPath();g.moveTo(x-12,y-28);g.lineTo(x+12,y-18);g.moveTo(x+12,y-28);g.lineTo(x-12,y-18);g.stroke();
 }
 // Heavy gate leaves, search lights and concrete vehicle barriers at the east opening.
 const gy=map.exit.y;rect(g,map.width-37,gy-63,13,126,'#59634f');rect(g,map.width-36,gy-59,7,118,'#9a9679');
 for(let y=gy-55;y<gy+55;y+=13){rect(g,map.width-39,y,13,2,'#444a3b');rect(g,map.width-39,y+4,13,1,'#b4ae8f')}
 rect(g,map.width-49,gy-68,4,24,'#a7a082');rect(g,map.width-52,gy-69,10,3,'#ded2a2');rect(g,map.width-49,gy+43,4,24,'#a7a082');rect(g,map.width-52,gy+65,10,3,'#ded2a2');
 for(let i=0;i<4;i++){rect(g,map.width-95+i*17,gy+65,14,8,'#7b8068');rect(g,map.width-94+i*17,gy+66,11,2,'#b2ae8e')}
}
function drawCheckpoint(){
 // Concrete apron, checkpoint cabin and a guarded opening on the road.
 rect(g,798,13,168,94,'#343e33');rect(g,803,17,158,85,'#5c644e');
 for(let x=803;x<961;x+=17)rect(g,x,18,1,84,'#a39a7155');
 for(let y=25;y<100;y+=15)rect(g,800,y,165,1,'#333f3299');
 rect(g,802,18,162,5,'#aaa58a');rect(g,800,99,165,7,'#373f33');
 // Reinforced inspection hut with layered concrete walls and a lit booth.
 rect(g,817,31,48,35,'#252f29');rect(g,813,27,48,34,'#7e8772');rect(g,817,31,40,27,'#a2a48b');
 rect(g,814,26,47,6,'#b7b49a');rect(g,819,23,37,4,'#787a64');rect(g,817,58,47,5,'#555e4e');rect(g,821,63,40,3,'#343d32');
 for(let y=34;y<57;y+=6){rect(g,816,y,3,1,'#c7c0a0');rect(g,855,y+2,4,1,'#69705c')}
 rect(g,823,35,13,10,'#243b39');rect(g,825,36,9,7,'#8ea8a0');rect(g,829,36,1,8,'#c2c3aa');rect(g,822,34,15,2,'#4c584b');
 rect(g,841,35,13,9,'#283c39');rect(g,843,36,9,6,'#95a9a0');rect(g,847,36,1,7,'#c6c3a4');
 rect(g,836,47,10,13,'#344338');rect(g,838,48,6,10,'#252e29');rect(g,842,53,2,2,'#d0b777');
 rect(g,819,47,4,10,'#717862');rect(g,852,47,3,8,'#798069');rect(g,830,27,15,2,'#ddd0a0');rect(g,835,23,4,4,'#38473a');rect(g,836,19,2,5,'#b8b79b');
 rect(g,819,62,7,3,'#77745c');rect(g,827,63,7,3,'#a39b78');rect(g,849,62,10,3,'#706e57');
 function tower(x,y){
   rect(g,x+1,y+20,3,28,'#676d58');rect(g,x+24,y+20,3,28,'#626b55');
   rect(g,x-2,y+18,34,4,'#b5ad8a');rect(g,x+1,y+22,4,25,'#899075');rect(g,x+24,y+22,4,25,'#858b70');
   g.strokeStyle='#4d5d49';g.lineWidth=2;g.beginPath();g.moveTo(x+4,y+25);g.lineTo(x+25,y+45);g.moveTo(x+25,y+25);g.lineTo(x+4,y+45);g.stroke();
   rect(g,x-3,y,34,20,'#69745e');rect(g,x,y-2,28,20,'#92977d');rect(g,x+2,y+2,24,12,'#34483b');
   rect(g,x-5,y-5,38,5,'#bab398');rect(g,x-2,y-8,32,3,'#59624f');rect(g,x+1,y+14,27,3,'#c3ba97');
   for(let n=0;n<5;n++){rect(g,x+3+n*5,y+3,1,11,'#b7b499');rect(g,x+2+n*5,y+2,2,1,'#d1cdb3')}
   rect(g,x+9,y+1,10,7,'#26372f');rect(g,x+11,y+2,6,4,'#b4c0a5');rect(g,x+9,y+8,11,5,'#6c775e');
   rect(g,x+17,y+9,11,2,'#c2c4a8');rect(g,x+26,y+13,5,4,'#f1df9f');rect(g,x+24,y+16,7,2,'#785b3c');
   rect(g,x+5,y+21,2,22,'#c6bd9d');for(let n=0;n<6;n++)rect(g,x+3,y+25+n*3,6,1,'#c7bb94');
   rect(g,x-7,y+48,11,3,'#837c61');rect(g,x+21,y+48,12,3,'#837c61');
 }
 tower(803,57);tower(937,46);
 // Razor wire, searchlight beams, warning boards and layered road barriers.
 for(let row=0;row<3;row++){g.strokeStyle=row===1?'#d0c69e':'#777b65';g.lineWidth=1;g.beginPath();for(let x=790;x<973;x+=8){const y=100+row*4+(x%16?0:3);g.lineTo(x,y)}g.stroke();for(let x=794;x<970;x+=16){rect(g,x,96+row*4,2,5,'#c8bd96');rect(g,x+3,98+row*4,2,4,'#6d755f')}}
 g.fillStyle='#b9d9b678';g.beginPath();g.moveTo(815,57);g.lineTo(775,12);g.lineTo(850,12);g.closePath();g.fill();
 g.fillStyle='#b9d9b678';g.beginPath();g.moveTo(950,45);g.lineTo(904,7);g.lineTo(971,7);g.closePath();g.fill();
 rect(g,806,91,53,7,'#c6b98d');rect(g,809,92,46,2,'#81513f');rect(g,866,94,48,5,'#c2ba9c');
 for(const [x,y] of [[798,74],[859,75],[929,70],[956,78]]){rect(g,x,y,10,4,'#76745e');rect(g,x+1,y-3,8,4,'#a49e7d');rect(g,x+2,y-5,4,2,'#d5c597');rect(g,x+1,y+4,11,3,'#4b5142')}
 rect(g,786,84,37,3,'#414b3d');rect(g,788,87,30,5,'#796f55');rect(g,797,89,12,2,'#aca485');
 rect(g,807,18,67,6,'#899178');rect(g,818,14,44,4,'#b6ae8e');rect(g,895,18,50,5,'#867f60');
 for(const [x,y]of [[843,86],[853,86],[863,86],[919,82]]){rect(g,x,y,10,5,'#a19b74');rect(g,x+1,y+5,9,4,'#7c8260')}
 rect(g,878,80,3,18,'#bab69b');rect(g,879,77,36,4,'#d1c6a0');
 for(let n=0;n<5;n++)rect(g,882+n*7,81,3,4,'#944e3e');
 // Detailed checkpoint tank: linked tracks, road wheels, layered hull, hatches, optics and rust.
 rect(g,866,29,48,35,'#23332a');rect(g,870,26,42,40,'#364738');
 rect(g,867,30,6,32,'#1e2a24');rect(g,909,29,6,34,'#1e2a24');rect(g,869,28,43,3,'#778267');rect(g,868,61,45,4,'#8a7750');
 for(let n=0;n<8;n++){const x=870+n*5;rect(g,x,30,3,3,'#ac9a68');rect(g,x,59,3,3,'#b69b64');rect(g,x,32,3,26,'#303e33')}
 for(const x of [873,881,889,897,905]){g.fillStyle='#92906b';g.beginPath();g.arc(x,45,3.4,0,Math.PI*2);g.fill();g.fillStyle='#3a4739';g.beginPath();g.arc(x,45,1.5,0,Math.PI*2);g.fill();rect(g,x-1,39,2,1,'#c3b68c');rect(g,x-1,50,2,1,'#c3b68c')}
 zonePolygon(g,[[872,34],[878,31],[904,31],[910,36],[908,54],[901,59],[876,57],[870,51]],'#718060');zonePolygon(g,[[875,36],[881,33],[901,34],[906,38],[903,52],[899,56],[878,54],[874,49]],'#929873');
 rect(g,875,35,27,2,'#c0b98e');rect(g,875,54,24,2,'#4c5a42');rect(g,876,39,4,8,'#a86742');rect(g,899,47,5,6,'#ae7044');rect(g,880,52,3,2,'#ca9b58');
 // Turret ring, offset command cupola, periscope blocks, mantlet and barrel.
 g.fillStyle='#4c5a43';g.beginPath();g.ellipse(890,44,13,11,.08,0,Math.PI*2);g.fill();g.strokeStyle='#b5ac80';g.lineWidth=2;g.stroke();
 zonePolygon(g,[[880,39],[883,33],[894,31],[900,36],[898,47],[892,52],[882,49]],'#87916a');zonePolygon(g,[[883,39],[886,35],[894,34],[897,38],[895,45],[889,48],[884,45]],'#a4a681');
 rect(g,886,33,9,5,'#5b694d');rect(g,887,31,7,3,'#bcc09a');rect(g,889,32,3,1,'#29382e');rect(g,884,38,3,5,'#bbc09a');rect(g,886,39,2,3,'#29382e');
 rect(g,895,40,7,6,'#526145');rect(g,899,41,4,4,'#b3b38b');rect(g,902,42,12,2,'#c4bd92');rect(g,913,41,3,4,'#4b5441');rect(g,908,43,5,1,'#d5cba0');
 rect(g,881,37,2,7,'#5b694f');rect(g,879,38,2,4,'#b17b4a');rect(g,897,49,4,2,'#353f32');rect(g,888,49,6,2,'#545d43');
 // Static artwork no longer contains frozen guards; their animated counterparts are drawn in renderer.js.
}
function drawArtifact(canvas,type){
 const c=canvas.getContext('2d');c.clearRect(0,0,32,32);
 const colors=[['#6c9c84','#c7d2a1'],['#ad8a55','#e1ca83'],['#729a9c','#c2d8c9'],['#b38678','#dac9ac'],['#829b5e','#c7d78e'],['#9591aa','#d7c8d8']][type||0];
 const patterns=[['0011100','0111110','1111111','1111111','0111110','0011100'],['0001000','0011100','0111110','0001000','0011100','0110110'],['0011100','0110010','0101010','0100110','0111110','0011100'],['0001000','0011100','0111110','1111111','0111110','0011100'],['0110110','1111111','0111110','0011100','0011100','0001000'],['0001000','0011100','1111111','0111110','0011100','0100010']];
 for(const [y,row]of patterns[type||0].entries())for(let x=0;x<7;x++)if(row[x]==='1')rect(c,5+x*3,6+y*3,3,3,(x+y)%3===0?colors[1]:colors[0]);
 rect(c,13,10,3,3,colors[1]);
}
