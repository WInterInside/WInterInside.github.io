'use strict';
function drawQuestItem(canvas,kind){
 const c=canvas.getContext('2d'),r=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};c.clearRect(0,0,32,32);
 if(kind==='keycard'){r(3,6,26,20,'#712d35');r(4,7,24,18,'#bc454a');r(4,10,24,5,'#78ba75');r(7,18,6,5,'#d4bb83');r(17,19,8,1,'#edaba3');r(17,22,5,1,'#edaba3')}
 else if(kind==='depotKey'){r(5,5,11,11,'#4b3d25');r(8,8,5,5,'#d1b466');r(12,12,14,5,'#a9853c');r(23,13,3,4,'#d5b45d');r(21,16,3,4,'#d5b45d');r(11,19,4,9,'#a9853c');r(9,25,8,3,'#d5b45d');r(9,18,8,3,'#d5b45d');r(10,20,6,4,'#d0b360')}
 else if(kind==='pda'){r(7,2,18,28,'#1b2828');r(8,3,16,26,'#758479');r(10,6,12,15,'#263f3b');r(11,8,10,11,'#90ae85');r(12,14,7,1,'#496f61');r(17,10,1,8,'#496f61');r(16,12,3,3,'#d7b66f');r(11,24,4,2,'#273932');r(19,23,3,3,'#c7c5a2')}
 else{r(6,5,19,22,'#b5a375');r(8,6,15,20,'#e2ce9b');r(3,4,22,4,'#eed9a6');r(3,5,3,5,'#aa8858');r(8,25,21,4,'#a88659');r(24,24,5,4,'#edcf94');r(11,11,9,1,'#96865d');r(13,12,1,8,'#96865d');r(13,19,7,1,'#96865d');r(18,16,2,6,'#974d43');r(16,18,6,2,'#974d43')}
}
// Larger wreck silhouettes retain the building renderer's shared world scale.
const originalContentLocation=WorldRenderer.prototype.location;
WorldRenderer.prototype.location=function(p){
 const R=(x,y,w,h,color)=>rect(g,x,y,w,h,color),poly=(pts,col)=>zonePolygon(g,pts,col);
 if(p.type==='militaryDepot'){
  R(-62,35,126,10,'#17221d99');poly([[-57,-22],[-42,-45],[42,-45],[58,-23],[55,25],[-55,25]],'#545a50');poly([[-64,-23],[-45,-51],[47,-51],[64,-24],[52,-19],[-53,-19]],'#344139');poly([[-48,-26],[-39,-43],[40,-43],[52,-25]],'#747666');
  for(let y=-17;y<18;y+=6){R(-51,y,102,2,y%2?'#777866':'#414a40');R(-48,y+2,95,1,'#9a8e6e')}
  R(-18,-8,43,33,'#252f2a');R(-14,-5,36,30,'#3d493f');for(let x=-10;x<22;x+=8){R(x,0,6,21,'#5c6252');R(x+1,1,4,18,'#333e36');R(x+2,12,1,2,'#b5a47d')}
  R(-47,-16,24,6,'#293a37');for(let x=-44;x<-25;x+=7){R(x,-15,4,4,'#8ca09a');R(x,-15,1,4,'#d0c4a1')}
  R(32,-18,15,11,'#303c35');R(36,-25,7,7,'#626958');R(38,-31,3,8,'#887f62');R(27,-33,24,3,'#8b8569');R(29,-31,2,11,'#77745f');R(47,-31,2,11,'#77745f');
  R(-58,27,118,3,'#84775b');R(-58,30,3,12,'#625c49');R(-27,30,3,12,'#625c49');R(6,30,3,12,'#625c49');R(57,30,3,12,'#625c49');
  g.strokeStyle='#8c876a';g.lineWidth=2;g.beginPath();g.moveTo(-58,29);g.lineTo(60,29);g.moveTo(-58,35);g.lineTo(60,35);for(let x=-55;x<=58;x+=12){g.moveTo(x,26);g.lineTo(x,41)}g.stroke();
  R(-7,22,18,4,'#a79c79');R(0,21,4,7,'#352f25');R(-61,41,121,2,'#c4b68b');return;
 }
 if(p.type==='sawmill'){
  g.save();g.scale(.66,.66);
  R(-76,42,151,12,'#202b21c9');
  // Compact sawmill site: enclosed timber shed, tidy log decks, and a clear saw bench.
  poly([[-67,-22],[-52,-42],[17,-42],[39,-23],[35,7],[-66,7]],'#3c4439');
  poly([[-72,-24],[-50,-49],[23,-49],[44,-26],[34,-21],[-61,-21]],'#343d35');
  poly([[-63,-26],[-48,-43],[20,-43],[35,-26]],'#817b60');poly([[-55,-27],[-45,-38],[14,-38],[26,-27]],'#9e9474');
  R(-61,-23,5,31,'#665f4b');R(29,-23,5,31,'#554f42');R(-58,-18,6,24,'#a58e68');R(26,-18,6,24,'#8d7d5c');
  // Siding, broken windows, a loading door and a skewed lean-to.
  for(let y=-18;y<4;y+=5){R(-52,y,34,1,'#c0a477');R(-52,y+2,34,1,'#6c5c43')}
  R(-14,-19,25,25,'#4a4b3b');R(-12,-17,21,20,'#252f2b');R(-10,-15,16,2,'#bca477');R(-9,-12,2,14,'#8c7957');R(3,-13,2,15,'#725d45');
  R(-48,-19,10,7,'#263b3b');R(-46,-17,6,4,'#8fa49a');R(-36,-19,7,7,'#263b3b');R(-35,-18,2,5,'#ba8050');
  poly([[36,-12],[61,-3],[58,6],[34,2]],'#4d4c3c');R(38,-10,4,18,'#80694b');R(58,-2,4,13,'#6e5c44');R(43,-2,16,3,'#a18b61');
  // Two orderly log stacks with bark, cut faces, growth rings, and timber cradles.
  for(const [sx,sy,count]of [[-54,14,5],[-34,26,4]]){R(sx-3,sy+7,count*10+5,4,'#343b30');for(let row=0;row<3;row++)for(let n=0;n<count;n++){const x=sx+n*9+(row%2)*2,y=sy-row*6;R(x-7,y-2,14,5,['#60452f','#79563a','#684a32'][row]);g.fillStyle='#98734e';g.beginPath();g.ellipse(x-6,y,2.6,2.7,0,0,Math.PI*2);g.fill();g.fillStyle='#c19a65';g.beginPath();g.ellipse(x-6,y,1.6,1.7,0,0,Math.PI*2);g.fill();R(x+4,y-1,2,3,'#513d2e')}}
  // Feed rollers, heavy saw table and a guarded blade are the focal machinery.
  R(-28,5,54,6,'#252e2a');R(-26,7,48,3,'#9c8359');for(let x=-22;x<20;x+=9){R(x,4,2,7,'#c2a36d');R(x-1,10,4,2,'#343a30')}
  R(-16,-2,27,5,'#465045');R(-13,3,3,15,'#746044');R(7,3,3,15,'#62533d');
  g.fillStyle='#a9a88d';g.beginPath();g.arc(-3,-11,13,0,Math.PI*2);g.fill();g.fillStyle='#424d45';g.beginPath();g.arc(-3,-11,10,0,Math.PI*2);g.fill();g.fillStyle='#232d29';g.beginPath();g.arc(-3,-11,3,0,Math.PI*2);g.fill();
  g.strokeStyle='#d2c59d';g.lineWidth=2;g.beginPath();g.arc(-3,-11,12,.2,6.05);g.stroke();for(let i=0;i<10;i++){const a=i*Math.PI/5;R(-4+Math.cos(a)*11,-12+Math.sin(a)*11,2,2,'#e0d2ab')}
  // Belt drive, flywheel and scattered sawdust finish the abandoned worksite.
  R(14,-13,14,4,'#343c35');R(25,-18,5,13,'#79674b');g.fillStyle='#b09a6f';g.beginPath();g.arc(27,-17,5,0,Math.PI*2);g.fill();g.fillStyle='#323b33';g.beginPath();g.arc(27,-17,2,0,Math.PI*2);g.fill();
  R(-18,20,41,3,'#796447');R(-17,23,3,10,'#5f513e');R(19,23,3,10,'#534a39');R(-4,20,2,12,'#c1a36e');
  for(let i=0;i<11;i++){R(-69+i*13,39+(i%3)*2,4,2,i%2?'#bd9a63':'#907451');if(i%4===0)R(-66+i*13,35,5,3,'#493c2e')}
  g.restore();return;
 }
 if(p.type==='backpack'){
  // Bright canvas shell and readable straps stand out from the dark forest floor.
  R(-17,11,36,6,'#101a13a8');zonePolygon(g,[[-12,-13],[-6,-20],[7,-19],[13,-12],[15,6],[10,13],[-10,13],[-15,6]],'#29372e');
  zonePolygon(g,[[-10,-13],[-5,-17],[6,-17],[10,-12],[11,7],[7,10],[-8,10],[-12,6]],'#b6a66f');
  R(-8,-13,15,3,'#d4c68f');R(-7,-10,14,2,'#767c52');R(-8,-7,16,8,'#8f895b');R(-6,-6,12,5,'#c5b57a');R(-11,2,22,8,'#9a915e');R(-9,3,18,2,'#d2c18a');
  R(-8,1,3,9,'#36483a');R(5,1,3,9,'#36483a');R(-10,-11,3,18,'#465743');R(7,-11,3,18,'#465743');
  for(const x of [-8,5]){R(x,-4,3,3,'#e0c577');R(x,-3,1,1,'#303c31')}
  R(-5,-17,3,2,'#c8bd95');R(3,-17,3,2,'#c8bd95');R(-14,6,3,4,'#b55c3e');R(11,7,3,3,'#9e553a');
  for(const x of [-13,-7,0,7,12])R(x,12,3,2,'#d1bb7d');return;
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
 if(['tractor','tank','apc','truck','combine','helicopter','crashSite','fighter'].includes(p.type)){
  g.save();g.scale(1.05,1.05);R(-38,16,78,7,'#22352ab0');
  if(p.type==='tractor'){
   for(const [x,y,r]of [[-20,11,12],[22,15,8]]){g.fillStyle='#202d29';g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.strokeStyle='#596450';g.lineWidth=3;g.stroke();R(x-3,y-3,6,6,'#9e7650')}
   R(-25,-12,24,21,'#795c3c');R(-27,-16,29,4,'#b08c54');R(-22,-10,17,13,'#354d4d');R(-19,-9,7,5,'#76938a');R(-12,-10,2,13,'#b39569');R(-4,0,30,11,'#977346');R(23,2,5,12,'#4d5442');
   R(9,-13,4,15,'#6e6750');R(8,-15,7,3,'#a4936d');R(-2,9,30,3,'#524a34');R(3,2,5,5,'#c08b4c');R(16,7,5,3,'#653f2e');
  }else if(p.type==='tank'){
   R(-34,4,68,20,'#242f2b');R(-32,6,64,15,'#5f6650');for(let i=0;i<7;i++){R(-29+i*9,8,7,10,'#252f2a');R(-27+i*9,10,3,5,'#8f8b66')}
   poly([[-34,5],[-25,-6],[22,-6],[34,6]],'#89916a');R(-27,-5,51,9,'#6b7957');poly([[-15,-7],[-10,-18],[13,-18],[21,-6]],'#8c9874');R(-12,-17,28,4,'#afb18a');
   R(10,-14,32,5,'#637856');R(39,-15,7,7,'#364b3a');R(-4,-22,11,4,'#313e31');R(-6,-24,12,3,'#b3ac80');R(-27,-2,9,5,'#9d643d');R(10,-6,9,5,'#4d3c2c');
  }else if(p.type==='apc'){
   for(const x of [-28,-16,-4,8,20,30])for(const y of [5,19]){g.fillStyle='#202b25';g.beginPath();g.arc(x,y,5,0,Math.PI*2);g.fill();g.fillStyle='#8b8c67';g.beginPath();g.arc(x,y,2,0,Math.PI*2);g.fill()}
   poly([[-38,7],[-32,-8],[-19,-14],[18,-13],[33,-4],[39,9],[34,18],[-32,18]],'#666f58');poly([[-32,5],[-28,-6],[-18,-11],[18,-10],[29,-3],[33,8],[27,13],[-27,13]],'#8a9270');
   poly([[-24,-9],[-17,-17],[17,-15],[24,-8]],'#505d4f');R(-16,-14,28,6,'#879276');R(-13,-12,9,4,'#324846');R(1,-12,8,4,'#304542');R(12,-8,5,8,'#333e34');R(22,0,10,3,'#b3a77e');R(27,2,3,8,'#495443');R(-32,1,6,5,'#b96c42');R(29,10,5,4,'#aa5b3c');R(-24,12,28,2,'#c0b58a');
  }else if(p.type==='truck'){
   for(const x of [-25,-12,15,27]){g.fillStyle='#222a24';g.beginPath();g.ellipse(x,15,x<0?7:6,7,0,0,Math.PI*2);g.fill();g.strokeStyle='#817d5e';g.lineWidth=2;g.stroke();R(x-2,13,4,4,'#b19a69')}
   R(-13,-12,47,25,'#4b5244');R(-10,-10,42,19,'#756e53');R(-8,-8,39,2,'#a28b61');R(-9,8,42,3,'#393f35');for(let y=-6;y<8;y+=5){R(-7,y,38,1,'#a5895d');R(27,y,3,4,'#3a4136')}
   poly([[-36,-10],[-18,-17],[-3,-13],[-2,7],[-9,14],[-33,12]],'#77795f');R(-34,-9,23,4,'#b09b6e');R(-29,-6,14,9,'#30494a');R(-28,-5,7,6,'#8ba69d');R(-12,-4,7,15,'#4f5945');R(-10,-2,4,9,'#a45f3e');R(-34,12,12,3,'#343c32');R(-1,-15,5,3,'#c0a875');R(32,-14,4,10,'#4b5341');R(34,-17,4,4,'#9b8d69');R(-28,17,10,3,'#a55a3e');R(12,19,15,2,'#bd7449');
  }else if(p.type==='combine'){
   for(const [x,r]of [[-22,11],[24,8]]){g.fillStyle='#202b25';g.beginPath();g.arc(x,11,r,0,Math.PI*2);g.fill();g.strokeStyle='#877651';g.lineWidth=3;g.stroke();g.fillStyle='#a18c60';g.beginPath();g.arc(x,11,3,0,Math.PI*2);g.fill()}
   R(-25,-13,43,22,'#756244');R(-21,-10,37,16,'#9a8150');R(-18,-8,30,11,'#7c7447');R(-24,-15,40,4,'#c1a566');poly([[-16,-14],[-12,-27],[4,-27],[11,-15]],'#737b60');poly([[-12,-22],[-9,-25],[1,-25],[5,-16],[-10,-16]],'#294346');R(-8,-23,8,6,'#90a69a');R(4,-15,3,14,'#353d30');R(10,-7,6,11,'#65634b');R(-34,1,17,4,'#55472f');R(-39,5,67,3,'#9e7946');R(-38,8,69,2,'#c0a366');for(let x=-36;x<31;x+=6){R(x,10,2,5,'#4d4936');R(x+2,13,1,4,'#a8905c')}R(27,4,8,5,'#3f4937');R(-31,-13,6,7,'#b86b3e');R(-19,2,2,9,'#c1aa6e');R(16,-12,2,8,'#b2a06b');R(18,-15,5,3,'#d2bf89');
  }else if(p.type==='helicopter'||p.type==='crashSite'){
   if(p.type==='crashSite'){R(-43,8,87,18,'#473c2d');for(let i=0;i<6;i++)R(-46+i*15,20+i%2*5,10,3,'#a18b63')}
   poly([[-24,-10],[6,-13],[25,-2],[22,13],[-17,15],[-29,2]],'#788777');poly([[-21,-8],[3,-11],[12,-4],[-19,-2]],'#aeb59b');R(-22,-2,20,12,'#233e40');R(-20,-1,7,4,'#83a6a1');R(-6,-1,3,10,'#adaf8d');
   poly([[15,-4],[47,-15],[52,-12],[24,7]],'#7a8669');R(45,-25,4,20,'#a6ad8d');R(36,-17,23,3,'#414f3f');R(2,-25,4,14,'#485c4d');poly([[-37,-28],[1,-26],[35,-36],[37,-33],[7,-20],[-36,-24]],'#a7b29c');
   R(-15,16,38,3,'#435b4d');R(-13,11,3,7,'#bbc0a5');R(15,11,3,7,'#aeb69b');R(8,5,9,6,'#975e3e');R(28,20,8,3,'#a8ae94');
  }else{
   poly([[-38,5],[-12,-3],[26,-6],[42,1],[23,9],[-12,11]],'#a3b4ac');poly([[-25,5],[-2,-4],[-9,-32],[0,-33],[19,2],[7,8]],'#7e9892');poly([[-6,9],[-17,29],[-4,29],[18,7]],'#668278');
   poly([[-35,4],[-33,-12],[-26,-13],[-20,6]],'#93aba0');R(11,-5,12,7,'#254f55');R(12,-5,9,2,'#9bd0c6');R(-21,7,14,3,'#a56843');R(30,13,10,3,'#809b8c');R(-39,18,8,4,'#4c665b');
  }
  if(p.type==='tractor'){for(let x=1;x<23;x+=4)R(x,2,2,6,'#353b30');R(-25,-14,22,1,'#d1af78');R(-8,-9,2,11,'#b8a176');poly([[-18,-8],[-13,-4],[-17,-1]],'#b0b9a0');R(-29,23,12,3,'#85603c')}
  if(p.type==='tank'){for(let x=-30;x<32;x+=5){R(x,5,3,2,'#a4a185');R(x,21,3,2,'#969071')}R(-6,-14,15,1,'#d0c79d');R(-3,-21,8,3,'#172820');for(let x=-23;x<-9;x+=3)R(x,-4,1,6,'#28382a');poly([[28,20],[39,24],[36,28],[24,24]],'#655743')}
  if(p.type==='apc'){for(let x=-25;x<=27;x+=13){R(x,0,3,2,'#c4b88f');R(x+2,12,4,2,'#3b493b')}R(-21,-5,11,1,'#c0b58b');R(6,-6,9,1,'#c5bd92');R(27,4,4,3,'#aa6645');R(-33,13,4,3,'#bd7048')}
  if(p.type==='truck'){for(let x=-3;x<27;x+=7){R(x,-4,2,1,'#c6ad74');R(x,5,2,1,'#483f30')}R(-31,-4,13,1,'#c7c1a0');R(-32,0,11,1,'#76918a');R(-24,10,3,3,'#c27a47');R(20,12,6,2,'#b56b41')}
  if(p.type==='combine'){for(let x=-35;x<31;x+=9)R(x,4,3,2,'#d1ad68');R(-39,7,7,1,'#e0c47c');R(-11,-24,12,1,'#bdc3a2');R(-9,-21,2,4,'#3c4a3e');R(7,-12,8,2,'#b27443')}
  if(p.type==='helicopter'||p.type==='crashSite'){for(let x=-16;x<20;x+=6){R(x,12,1,1,'#c9ccb0');R(x,-9,1,1,'#c9ccb0')}R(6,-3,8,8,'#142823');R(7,-1,2,7,'#8a7252');R(12,-2,1,9,'#8a7252');poly([[-23,0],[-16,3],[-20,6]],'#9db4a9');R(-28,21,14,2,'#b4ad87');if(p.type==='crashSite')for(let i=0;i<7;i++)R(-49+i*12,30+i%3*3,8,2,'#342e24')}
  if(p.type==='fighter'){for(let x=-22;x<30;x+=6)R(x,5,1,2,'#d0d4bd');g.strokeStyle='#435a50';g.lineWidth=1;g.beginPath();g.moveTo(-4,-27);g.lineTo(9,-1);g.moveTo(-10,25);g.lineTo(9,9);g.stroke();R(-32,2,7,5,'#21332e');poly([[28,17],[40,22],[32,25],[24,20]],'#a3a894')}
  // Silhouette and exposed mechanical assemblies tailored to each vehicle.
  if(p.type==='tractor'){
   for(const [cx,cy,rr]of [[-20,11,12],[22,15,8]])for(let a=0;a<8;a++){const an=a*Math.PI/4;R(cx+Math.cos(an)*(rr+1)-1,cy+Math.sin(an)*(rr+1)-2,3,4,'#323b31')}
   R(-22,-11,13,1,'#b5c4b7');R(-8,-11,1,12,'#2c4140');R(-20,-2,3,3,'#d7d3ad');R(-3,1,28,2,'#a2804e');R(25,4,2,5,'#c7a365');
  }else if(p.type==='tank'){
   R(-31,4,61,2,'#b7b28c');R(-31,21,61,2,'#b7b28c');for(let i=0;i<11;i++){const x=-29+i*5.5;R(x,7,2,3,'#b1ac8a');R(x,17,2,3,'#333e35')}
   R(-3,-17,13,3,'#4c5946');R(-1,-16,3,2,'#c8c2a0');R(38,-14,4,3,'#b5a984');R(40,-13,2,1,'#222a25');R(-23,-3,5,2,'#d28c54');
  }else if(p.type==='helicopter'||p.type==='crashSite'){
   // Bent rotor mast, fractured tail boom, cockpit glazing and torn rotor blades.
   R(1,-26,5,8,'#313c34');R(2,-31,3,6,'#a3aa91');R(-5,-32,22,2,'#46564a');R(-17,-30,11,1,'#a5ae99');
   R(48,-21,3,8,'#354239');R(44,-24,11,2,'#c0b99c');R(49,-26,2,12,'#5a695a');
   poly([[-22,-9],[-7,-10],[-2,-4],[-19,-3]],'#8ab0aa');R(-20,-8,2,1,'#d0ddc9');R(-4,-5,2,7,'#d1c6a7');
   R(-25,2,4,2,'#a8573a');R(22,-4,4,2,'#ad603d');R(29,-13,5,2,'#b4804c');
  }else if(p.type==='fighter'){
   // Jet canopy, air intake and engine nozzle distinguish the fuselage from a generic wreck.
   poly([[-3,-22],[1,-29],[7,-27],[10,-20],[7,-17],[0,-18]],'#31515a');poly([[0,-25],[2,-28],[6,-26],[8,-21],[5,-19]],'#a2c3be');
   R(-3,-31,2,8,'#5d7474');poly([[-20,-5],[-11,-8],[-9,-4],[-17,-1]],'#273c3e');R(-23,-4,5,3,'#b3b8a1');
   R(-14,7,8,2,'#38453e');R(-11,8,3,5,'#222e2a');R(25,4,7,2,'#b7bba9');R(31,3,3,4,'#35433c');
   R(-34,4,7,1,'#bb6445');R(26,-4,5,2,'#b76645');
  }
  // Contrasting seams, rivets, glass and exposed structure make the remains read as machinery.
  if(p.type==='tractor'){
   R(-26,-15,26,2,'#d1ad70');R(-24,-13,2,14,'#503f2c');R(-2,-10,2,9,'#d1aa68');R(0,1,20,2,'#bd965d');
   R(-20,-7,13,1,'#c4aa79');R(-20,-4,13,1,'#60736b');R(2,3,2,5,'#443b2d');R(12,3,2,5,'#443b2d');R(4,-12,3,3,'#283532');
  }else if(p.type==='tank'){
   R(-30,5,60,2,'#a7a37b');R(-29,20,58,2,'#39453a');R(-23,-4,3,2,'#bd7650');R(19,-4,4,2,'#bc7650');R(-1,-13,7,2,'#b5b58e');
   for(const [bx,by]of [[-27,7],[-15,7],[-3,7],[9,7],[21,7],[-25,19],[-13,19],[-1,19],[11,19],[23,19]]){R(bx,by,2,2,'#c1b990');R(bx+1,by,1,1,'#554f3d')}
   R(27,-3,2,7,'#343e33');R(28,-2,4,2,'#b47a4b');
  }else if(p.type==='helicopter'||p.type==='crashSite'){
   R(-18,-8,20,1,'#d1c6a1');R(-20,8,23,2,'#566c5f');R(18,-2,4,2,'#c78253');
   for(const [bx,by]of [[-16,12],[-8,13],[1,13],[10,12],[18,9]]){R(bx,by,2,2,'#bd7650');R(bx,by+2,1,2,'#333e34')}
   R(-14,-4,6,1,'#bdd0b8');R(-5,-5,8,1,'#849c91');R(42,-17,2,8,'#d3c6a2');
  }else if(p.type==='fighter'){
   poly([[-30,4],[-13,-2],[-12,1],[-29,7]],'#c1c8b6');poly([[0,2],[21,-4],[23,-1],[3,5]],'#c4c9b5');
   R(13,-4,8,1,'#b8d3ca');R(14,-2,6,1,'#34505a');R(-8,7,13,1,'#d4c6a0');R(-19,3,3,2,'#bd7550');R(24,1,4,2,'#bd7550');
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
 rebuildContent.call(this,s);g=this.ground.getContext('2d');this.anomalyTrees=[];
 for(const d of s.map.terrainDecor||[]){
  const r=seeded(s.seed+d.x*17+d.y*31+d.variant*997),R=(x,y,w,h,col)=>rect(g,x,y,w,h,col);g.save();g.translate(d.x,d.y);g.rotate(d.rotation||0);
  if(d.type==='reedPond'){
   g.fillStyle='#303a2e';g.beginPath();g.ellipse(0,2,d.rx+7,d.ry+6,0,0,Math.PI*2);g.fill();g.fillStyle='#787553';g.beginPath();g.ellipse(0,1,d.rx+3,d.ry+3,0,0,Math.PI*2);g.fill();
   g.fillStyle='#2c4746';g.beginPath();for(let i=0;i<24;i++){const a=i*Math.PI/12,w=1+.09*Math.sin(i*2.7+d.variant),x=Math.cos(a)*d.rx*w,y=Math.sin(a)*d.ry*(1+.08*Math.cos(i*1.9));i?g.lineTo(x,y):g.moveTo(x,y)}g.closePath();g.fill();g.strokeStyle='#66827a';g.lineWidth=1.5;g.stroke();
   for(let i=0;i<12;i++){const x=(r()-.5)*d.rx*1.25,y=(r()-.5)*d.ry*.8,w=5+r()*10;g.strokeStyle=i%3?'#78968b66':'#c0b98870';g.beginPath();g.moveTo(x-w/2,y);g.quadraticCurveTo(x,y-2,x+w/2,y);g.stroke()}
   for(let i=0;i<30;i++){const side=i%2?-1:1,x=(r()-.5)*d.rx*1.75,y=side*(d.ry-2+r()*8),h=7+r()*13;R(x,y-h,2,h,i%3?'#6f7346':'#9b8850');if(i%4===0)R(x+2,y-h+1,3,2,'#b39a59')}
   for(let i=0;i<7;i++){const a=r()*Math.PI*2,x=Math.cos(a)*(d.rx+4),y=Math.sin(a)*(d.ry+3);R(x,y,4+r()*5,2,i%2?'#555e43':'#94845b')}
  }else{
   const length=d.rx,width=d.ry;g.fillStyle='#33382eaa';g.beginPath();g.ellipse(0,5,length+7,width+5,0,0,Math.PI*2);g.fill();
   const upper=[],lower=[];for(let i=0;i<=12;i++){const x=-length+i*length/6,j=(r()-.5)*5;upper.push([x,-width*(.35+Math.sin(i*.7)*.12)+j]);lower.push([x,width*(.45+Math.cos(i*.8)*.13)+j])}zonePolygon(g,[...upper,...lower.reverse()],'#272b26');
   g.strokeStyle='#9b8158';g.lineWidth=3;g.beginPath();upper.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.stroke();g.strokeStyle='#514738';g.lineWidth=2;g.beginPath();lower.reverse().forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.stroke();
   for(let i=0;i<14;i++){const x=-length+5+r()*(length*2-10),top=i%2===0,y=(top?-1:1)*(width*.42+r()*5);R(x,y,4+r()*7,2,top?'#aa895a':'#5d533e');if(i%4===0){g.strokeStyle='#6e5d43';g.lineWidth=1;g.beginPath();g.moveTo(x,y);g.lineTo(x+(r()-.5)*16,y+(top?8:-8));g.stroke()}}
  }
  g.restore();
 }
 for(const p of s.map.decorations||[]){g.save();g.translate(p.x,p.y);g.scale(1.08,1.08);g.strokeStyle='#9aa99b';g.lineWidth=2;g.beginPath();g.moveTo(-17,22);g.lineTo(-5,-48);g.lineTo(5,-48);g.lineTo(17,22);g.moveTo(-10,-30);g.lineTo(12,9);g.moveTo(10,-30);g.lineTo(-12,9);g.moveTo(-20,-34);g.lineTo(20,-34);g.moveTo(-25,-20);g.lineTo(25,-20);g.stroke();for(const x of [-23,21]){rect(g,x,-23,3,9,'#526658');rect(g,x,-23,3,1,'#d1cab0')}rect(g,-20,22,9,4,'#8c917a');rect(g,11,22,9,4,'#8c917a');g.strokeStyle='#68776a';g.lineWidth=1;for(let y=-42;y<19;y+=12){const w=6+(y+42)*.17;g.beginPath();g.moveTo(-w,y);g.lineTo(w+2,y+12);g.moveTo(w,y);g.lineTo(-w-2,y+12);g.moveTo(-w,y);g.lineTo(w,y);g.stroke()}for(const y of [-34,-20])for(const x of [-22,21]){for(let k=0;k<4;k++)rect(g,x-2,y+2+k*2,5,1,'#c0b99a');g.strokeStyle='#303c32';g.beginPath();g.moveTo(x,y+10);g.quadraticCurveTo(x+15,y+31,x+28,y+15);g.stroke()}rect(g,-13,0,3,8,'#9e6541');rect(g,8,-22,2,7,'#a4774e');rect(g,-18,24,7,2,'#c0b496');rect(g,12,24,7,2,'#c0b496');g.restore()}
const r=seeded(s.seed+4711),map=s.map;
 for(let i=0;i<10;i++){
  let p=null;for(let attempt=0;attempt<360;attempt++){const q={x:140+r()*(map.width-280),y:145+r()*(map.height-290)};const roadGap=Math.min(Infinity,...map.roads.flatMap(road=>road.points.slice(1).map((b,j)=>{const a=road.points[j],dx=b.x-a.x,dy=b.y-a.y,t=Zone.clamp(((q.x-a.x)*dx+(q.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(q.x-a.x-t*dx,q.y-a.y-t*dy)})));if(Zone.distance(q,map.camp)<145||Zone.distance(q,map.exit)<175||waterVisualBlocked(q,map,48)||map.pois.some(a=>Zone.distance(a,q)<locationVisualRadius(a)+68)||(map.decorations||[]).some(a=>Zone.distance(a,q)<55)||(map.terrainDecor||[]).some(a=>Zone.distance(a,q)<Math.max(a.rx,a.ry)+48)||(map.forests||[]).some(f=>Zone.distance(f,q)<f.radius+35)||(this.treeCopses||[]).some(c=>Zone.distance(c,q)<190)||(this.anomalyTrees||[]).some(c=>Zone.distance(c,q)<190)||roadGap<32)continue;p=q;break}
  if(!p)continue;
  // Eight distinct anomaly scars: spiral trunks, split crowns, severe bows and snapped tips.
  this.anomalyTrees=this.anomalyTrees||[];this.anomalyTrees.push(p);g.save();g.translate(p.x,p.y);const twist=(r()-.5)*20,side=r()<.5?-1:1,form=i%8;
  const palettes=[['#202923','#665640','#343b30','#94ad65'],['#252822','#766044','#3a362d','#c29a54'],['#202a2a','#58634e','#303b39','#75a6ae'],['#282521','#705446','#43332f','#bd765c'],['#202722','#686348','#3b4033','#a6b876'],['#242322','#685540','#39312c','#ce9660'],['#20272b','#59616b','#30353c','#8bbbc1'],['#292322','#795448','#493432','#d18173']][form];
  const crowns=[
   [[-4,2],[-12,-8],[twist+9,-18],[twist-7,-32],[twist+3,-49]],
   [[-3,2],[5,-9],[-9,-19],[twist+6,-29],[twist+18,-43]],
   [[-4,2],[-8,-10],[twist-15,-19],[twist-2,-35],[twist-14,-48]],
   [[-3,2],[twist+8,-11],[twist-8,-20],[twist-3,-36]],
   [[-5,2],[-14,-7],[twist-5,-17],[twist+8,-31],[twist+1,-42]],
   [[-4,2],[8,-6],[-7,-15],[12,-26],[-4,-37],[twist+5,-50]],
   [[-4,2],[-13,-7],[-25,-18],[-16,-29],[-30,-41],[-40,-46]],
   [[-2,2],[1,-12],[-12,-24],[-14,-43]]
  ][form];
  g.fillStyle='#17201991';g.beginPath();g.ellipse(0,3,20,6,0,0,Math.PI*2);g.fill();
  const path=(pts)=>{g.beginPath();pts.forEach(([x,y],n)=>n?g.lineTo(x,y):g.moveTo(x,y))};
  g.lineCap='square';g.lineJoin='bevel';g.strokeStyle=palettes[0];g.lineWidth=[10,11,13,9,12,10,11,12][form];path(crowns);g.stroke();
  g.strokeStyle=palettes[1];g.lineWidth=[5,5,6,4,6,5,5,6][form];path(crowns);g.stroke();
  g.strokeStyle=palettes[2];g.lineWidth=6;g.beginPath();
  if(form===0){g.moveTo(twist-4*side,-24);g.lineTo(twist-19*side,-33);g.lineTo(twist-25*side,-44);g.moveTo(twist,-36);g.lineTo(twist+15*side,-43);g.lineTo(twist+21*side,-52)}
  else if(form===1){g.moveTo(-1,-11);g.lineTo(-18*side,-21);g.lineTo(-25*side,-33);g.moveTo(1,-18);g.lineTo(19*side,-29);g.lineTo(27*side,-40);g.moveTo(twist+5,-31);g.lineTo(twist+5,-49)}
  else if(form===2){g.moveTo(twist-9,-20);g.lineTo(twist-24*side,-26);g.lineTo(twist-31*side,-38);g.moveTo(twist-2,-35);g.lineTo(twist+14*side,-43);g.lineTo(twist+22*side,-51)}
  else if(form===3){g.moveTo(twist+1,-18);g.lineTo(twist+18*side,-27);g.lineTo(twist+28*side,-37);g.moveTo(twist,-35);g.lineTo(twist-12*side,-45)}
  else if(form===4){g.moveTo(twist-4,-19);g.lineTo(twist-21*side,-27);g.lineTo(twist-26*side,-40);g.moveTo(twist+4,-30);g.lineTo(twist+18*side,-36);g.lineTo(twist+25*side,-47)}
  else if(form===5){g.moveTo(twist+3,-23);g.lineTo(twist-17*side,-28);g.lineTo(twist-25*side,-39);g.moveTo(twist+2,-34);g.lineTo(twist+18*side,-39);g.lineTo(twist+23*side,-53)}
  else if(form===6){g.moveTo(-15,-12);g.lineTo(-30*side,-17);g.lineTo(-41*side,-27);g.moveTo(-20,-22);g.lineTo(-39*side,-32);g.lineTo(-45*side,-42);g.moveTo(-28,-34);g.lineTo(-22,-49)}
  else{g.moveTo(-2,-14);g.lineTo(-19*side,-24);g.lineTo(-27*side,-37);g.moveTo(-1,-14);g.lineTo(14*side,-27);g.lineTo(19*side,-43);g.moveTo(-8,-27);g.lineTo(-21*side,-39)}g.stroke();
  // Extra branch fractures, bark plates and anomalous growths distinguish each tree at a glance.
  if(form===5){g.strokeStyle=palettes[2];g.lineWidth=3;path([[-2,0],[7,-9],[-4,-17],[8,-26],[0,-35]]);g.stroke()}
  if(form===7){g.strokeStyle=palettes[2];g.lineWidth=4;g.beginPath();g.moveTo(0,-12);g.lineTo(14*side,-22);g.lineTo(24*side,-25);g.moveTo(-3,-17);g.lineTo(-14*side,-29);g.lineTo(-21*side,-33);g.stroke()}
  // Exposed roots, jagged breaks and hollow centers make each silhouette feel damaged.
  g.strokeStyle='#8b7853';g.lineWidth=2;g.beginPath();g.moveTo(-5,0);g.lineTo(-15-r()*7,7);g.lineTo(-20-r()*4,8);g.moveTo(-2,1);g.lineTo(5+r()*7,9);g.moveTo(0,-8);g.lineTo(-3,-15);g.stroke();
  for(let k=0;k<4;k++){const bx=twist+(r()-.5)*13,by=-9-r()*34;g.fillStyle=k%2?palettes[1]:palettes[2];g.fillRect(bx,by,3+r()*4,2+r()*5);g.fillStyle=palettes[0];g.fillRect(bx+1,by+1,1,2)}
  if(form===3){g.strokeStyle='#c2a28a';g.lineWidth=2;g.beginPath();g.moveTo(twist-4,-34);g.lineTo(twist+2,-39);g.lineTo(twist-1,-42);g.stroke();g.fillStyle='#514037';g.fillRect(twist-4,-36,7,3)}
  else{g.fillStyle='#171f1c';g.fillRect(twist-3,-25,6,9);g.fillStyle=palettes[3]+'88';g.fillRect(twist-1,-23,3,6)}
  // Branching luminous cracks and floating flecks give each trunk a faint anomalous halo.
  g.strokeStyle=palettes[3]+'bb';g.lineWidth=1;g.beginPath();g.moveTo(twist-3,-10);g.lineTo(twist+2,-16);g.lineTo(twist-2,-22);g.lineTo(twist+4,-29);g.moveTo(twist+1,-19);g.lineTo(twist+7,-23);g.moveTo(twist-1,-25);g.lineTo(twist-7,-30);g.stroke();
  g.fillStyle=palettes[3]+'aa';for(let n=0;n<5;n++){const yy=-12-r()*38,xx=(r()-.5)*34;g.fillRect(xx,yy,1+r()*2,1+r()*2)}
  if(form===1||form===6){g.fillStyle=palettes[3]+'66';for(let n=0;n<3;n++){const xx=side*(9+n*5),yy=-14-n*8;g.fillRect(xx,yy,2,5);g.fillRect(xx-2,yy+4,5,1)}}
  g.fillStyle='#7c6d4c';for(let n=0;n<5;n++)g.fillRect(-10+n*4,2+(n%2)*2,3,2);g.restore();
 }
 for(let i=0;i<360;i++){
  const side=i%4,p=side<2?{x:side?map.width-15-r()*85:15+r()*85,y:40+r()*(map.height-65)}:{x:20+r()*(map.width-40),y:side===2?35+r()*65:map.height-12-r()*65};
  if(map.pois.some(q=>Zone.distance(p,q)<locationVisualRadius(q)+44)||waterVisualBlocked(p,map,24)||Zone.distance(p,map.camp)<95||Zone.distance(p,map.exit)<160||(map.decorations||[]).some(q=>Zone.distance(p,q)<45)||(map.terrainDecor||[]).some(q=>Zone.distance(p,q)<Math.max(q.rx,q.ry)+22))continue;
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
WorldRenderer.prototype.pirateGhost=function(c,s,t){const p=s.map.pois.find(q=>q.type==='pirateShip'||q.type==='cargoShip');if(!p)return;const phase=this.reduced?0:t,x=p.x+Math.sin(phase*.72)*34,y=p.y-31+Math.sin(phase*1.7)*4;c.save();c.translate(x,y);c.globalAlpha=.91;c.shadowColor='#63ff9a';c.shadowBlur=this.reduced?5:15;const glow=c.createRadialGradient(0,0,2,0,0,24);glow.addColorStop(0,'#72ffa044');glow.addColorStop(1,'#72ffa000');c.fillStyle=glow;c.fillRect(-25,-28,50,50);c.fillStyle='#17251eb0';c.beginPath();c.ellipse(0,20,11,3,0,0,Math.PI*2);c.fill();zonePolygon(c,[[-11,11],[-9,2],[-12,-5],[-9,-13],[-5,-17],[4,-17],[9,-12],[8,-5],[12,1],[9,10],[4,15],[1,10],[-3,16],[-6,10]],'#55c987');zonePolygon(c,[[-7,8],[-6,1],[-8,-5],[-5,-11],[3,-12],[6,-7],[5,-2],[8,5],[5,10],[0,7],[-3,12]],'#a4ffb4');c.fillStyle='#152c21';c.fillRect(-3,-7,2,3);c.fillRect(3,-7,2,3);c.fillStyle='#dcff9d';c.fillRect(-3,-7,1,1);c.fillRect(3,-7,1,1);c.strokeStyle='#a5ffc2';c.lineWidth=2;c.beginPath();c.moveTo(-8,-1);c.lineTo(-15,4);c.moveTo(8,-1);c.lineTo(14,-6);c.stroke();for(let i=0;i<4;i++){const sx=Math.sin(phase*1.2+i*2.1)*19,sy=7+Math.cos(phase+i)*12;c.fillStyle=i%2?'#bcff78':'#59f99d';c.fillRect(sx,sy,2,2)}c.restore()};
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
