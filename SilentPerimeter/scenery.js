'use strict';
let g;
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function sceneRandom(seed){return()=>{seed=(seed+0x6D2B79F5)>>>0;let t=Math.imul(seed^seed>>>15,seed|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const seeded=sceneRandom;
function tree(x,y,size,r){
 const pine=r()<.46,h=size*(pine?1.18:1.12),R=(a,b,w,d,color)=>rect(g,Math.round(x+a),Math.round(y+b),Math.max(1,Math.round(w)),Math.max(1,Math.round(d)),color),top=-h;
 R(-8,3,25,5,'#19291eb0');R(6,6,18,3,'#26332970');
 R(-3,top+9,5,h-4,'#403e2e');R(-2,top+10,3,h-6,pine?'#a78155':'#8c7955');R(0,top+13,1,h-9,'#cfaa72');
 for(let i=0;i<7;i++)R(-2,-i*h/9,2,2,pine?'#654737':'#514a37');
 R(-6,3,5,2,'#716444');R(2,2,6,2,'#8c7a50');
 if(pine){
  // Tall exposed reddish trunk and irregular, spreading needle crowns.
  for(let i=0;i<6;i++){
   const side=i%2?1:-1,yy=top+8+i*h*.085,reach=(.22+r()*.17)*size,cx=side*reach;
   R(Math.min(0,cx),yy+4,Math.abs(cx)+2,2,'#705b3f');R(cx-side*3,yy,2,6,'#a28a5a');
   const width=9+r()*8;R(cx-width/2-2,yy-4,width+4,7,'#233f33');R(cx-width/2,yy-7,width,8,'#45674b');R(cx-width/2+1,yy-8,width*.65,3,'#74895c');
   for(let j=0;j<7;j++){const xx=cx-width/2+r()*width;R(xx,yy-6+r()*7,2,2,j%2?'#839563':'#31553f')}
  }
  R(-7,top-2,14,8,'#456c50');R(-5,top-4,9,3,'#849968');R(3,top+1,5,4,'#284b39');
 }else{
  // Narrow spire and overlapping, drooping spruce boughs.
  for(let level=5;level>=0;level--){
   const yy=top+level*h*.135,half=3+level*size*.074;
   for(let row=0;row<4;row++){const span=half*(.35+row*.25);R(-span,yy+row*2,span*2+1,3,row===3?'#213e32':'#3d6348')}
   R(-half*.55,yy+2,half*.75,2,'#859468');R(-half,yy+7,half*.8,2,'#557b53');R(half*.55,yy+8,3,4,'#274b39');
   for(let j=0;j<5;j++){const xx=(r()-.5)*half*2;R(xx,yy+5+r()*4,1,3,j%2?'#729361':'#2c503b')}
  }
  R(-1,top-5,2,8,'#8a9e72');R(-3,top+1,5,3,'#517852');
 }
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
function drawCheckpoint(){
 // Concrete apron, checkpoint cabin and a guarded opening on the road.
 rect(g,814,18,135,79,'#555f49');
 for(let x=817;x<949;x+=17)rect(g,x,20,1,74,'#7c80604d');
 for(let y=25;y<96;y+=15)rect(g,815,y,133,1,'#333f3266');
 detailedHouse(817,26,29,25,2);
 function tower(x,y){
   rect(g,x+3,y+18,3,28,'#8a8869');rect(g,x+19,y+18,3,28,'#8a8869');
   g.strokeStyle='#686f51';g.lineWidth=2;g.beginPath();g.moveTo(x+4,y+22);g.lineTo(x+20,y+44);g.moveTo(x+20,y+22);g.lineTo(x+4,y+44);g.stroke();
   rect(g,x-1,y,28,19,'#889076');rect(g,x+2,y+3,22,9,'#304938');
   rect(g,x-3,y-4,32,4,'#aaa88c');rect(g,x+2,y+14,22,2,'#bcba93');
   for(let n=0;n<5;n++)rect(g,x+2+n*5,y+4,1,11,'#b1b191');
   rect(g,x+11,y+2,5,5,'#aaa789');rect(g,x+10,y+7,7,7,'#667753');
   rect(g,x+16,y+10,10,2,'#bac2a4');rect(g,x+23,y+14,4,3,'#ece0a6');
 }
 tower(811,58);tower(925,46);
 for(const [x,y]of [[843,86],[853,86],[863,86],[919,82]]){rect(g,x,y,10,5,'#a19b74');rect(g,x+1,y+5,9,4,'#7c8260')}
 rect(g,878,84,3,10,'#bab69b');rect(g,879,81,36,4,'#d1c6a0');
 for(let n=0;n<5;n++)rect(g,882+n*7,81,3,4,'#944e3e');
 // Tank hull, tread wheels, turret and long barrel.
 rect(g,868,29,42,28,'#293c2e');rect(g,872,27,34,28,'#88936c');
 for(let n=0;n<7;n++){rect(g,868+n*6,28,4,5,'#596950');rect(g,868+n*6,54,4,4,'#596950')}
 rect(g,878,24,23,24,'#9aa17a');rect(g,882,25,15,4,'#b2b696');
 rect(g,887,33,7,8,'#637955');rect(g,889,39,5,30,'#b4b894');rect(g,888,63,7,5,'#697b56');
 rect(g,879,36,5,5,'#354d38');rect(g,901,33,3,11,'#485e3d');
 function soldier(x,y){rect(g,x-3,y,7,8,'#85966b');rect(g,x-2,y-6,5,5,'#acaa85');rect(g,x-3,y-7,7,3,'#536f4d');rect(g,x-2,y+8,2,4,'#354a31');rect(g,x+2,y+8,2,4,'#354a31');rect(g,x+3,y+2,9,2,'#c1c6a4')}
 soldier(865,69);soldier(916,61);soldier(847,39);
}
function drawArtifact(canvas,type){
 const c=canvas.getContext('2d');c.clearRect(0,0,32,32);
 const colors=[['#6c9c84','#c7d2a1'],['#ad8a55','#e1ca83'],['#729a9c','#c2d8c9'],['#b38678','#dac9ac'],['#829b5e','#c7d78e'],['#9591aa','#d7c8d8']][type||0];
 const patterns=[['0011100','0111110','1111111','1111111','0111110','0011100'],['0001000','0011100','0111110','0001000','0011100','0110110'],['0011100','0110010','0101010','0100110','0111110','0011100'],['0001000','0011100','0111110','1111111','0111110','0011100'],['0110110','1111111','0111110','0011100','0011100','0001000'],['0001000','0011100','1111111','0111110','0011100','0100010']];
 for(const [y,row]of patterns[type||0].entries())for(let x=0;x<7;x++)if(row[x]==='1')rect(c,5+x*3,6+y*3,3,3,(x+y)%3===0?colors[1]:colors[0]);
 rect(c,13,10,3,3,colors[1]);
}
