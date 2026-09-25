'use strict';
WorldRenderer.prototype.camp=function(c,p,time){
 c.save();c.translate(p.x,p.y);
 zoneTent(c,-6,2,37,25,false);zoneFire(c,12,20,time,true);
 rect(c,-26,9,8,9,'#67765b');rect(c,-25,10,6,2,'#b8b18a');rect(c,-24,13,4,3,'#465741');
 rect(c,25,7,4,5,'#ccd1bd');rect(c,29,8,2,3,'#909c8d');
 c.restore();
};
const baseDetailedLocation=WorldRenderer.prototype.location;
WorldRenderer.prototype.location=function(p){
 const R=(x,y,w,h,col)=>rect(g,x,y,w,h,col),poly=(points,col)=>zonePolygon(g,points,col);
 if(p.type==='boatStation'){
  g.save();g.rotate(p.rotation||0);
  R(-78,18,154,10,'#18231fa0');
  // Raised timber boathouse, visibly distinct from the lakeside camp.
  R(-61,-22,55,42,'#38453c');R(-57,-27,49,8,'#624b36');zonePolygon(g,[[-62,-22],[-52,-35],[-8,-35],[1,-22]],'#76533a');zonePolygon(g,[[-56,-24],[-50,-31],[-13,-31],[-7,-24]],'#a17345');
  for(let i=0;i<4;i++){const x=-52+i*12;R(x,-17,8,12,'#263b3a');R(x+1,-16,6,3,'#79928b');R(x+3,-14,1,9,'#bac0a0')}
  R(-39,-1,14,20,'#29352f');R(-37,1,10,17,'#766044');R(-35,2,2,16,'#a88355');R(-4,-19,3,37,'#887050');R(-2,-12,9,2,'#b29a69');
  R(-66,22,65,5,'#564431');R(-62,27,58,3,'#a98c5d');R(-66,19,4,13,'#8d7050');R(-4,18,4,14,'#8d7050');
  // Long dock with cross-planks, mooring posts and a ladder at the water end.
  for(let i=0;i<10;i++){const x=3+i*7;R(x,5,6,57,i%2?'#756344':'#92734b');R(x,6,5,2,'#c2a06b');if(i%2===0)R(x+4,17,2,3,'#493d2e')}
  for(const x of [4,66])for(const y of [8,54]){R(x,y,4,9,'#493b2b');R(x-2,y,8,2,'#c0a06b')}
  for(let i=0;i<4;i++)R(9+i*7,43,2,13,'#d0bb85');
  // A beached motor skiff with bow, seats, motor and a coiled line.
  zonePolygon(g,[[28,-13],[49,-19],[72,-16],[83,-10],[79,-3],[56,1],[34,-3],[27,-8]],'#584c37');zonePolygon(g,[[34,-12],[52,-16],[72,-14],[78,-10],[72,-6],[53,-5],[37,-7]],'#526a63');
  R(42,-13,25,3,'#a6aa93');R(46,-11,2,6,'#d1c9a6');R(58,-10,2,5,'#d1c9a6');R(79,-12,5,11,'#554431');R(81,-14,4,3,'#b77b49');
  R(34,5,8,5,'#b89b63');R(35,6,6,3,'#6e5940');R(28,9,5,5,'#728176');R(72,5,8,8,'#a45f3d');R(73,7,6,5,'#d29a54');
  R(-76,9,7,9,'#ad6344');R(-75,10,5,2,'#d29b56');R(-75,13,5,4,'#694b36');R(-69,12,2,2,'#d2c394');
  g.strokeStyle='#d2bd83';g.lineWidth=1;g.beginPath();g.moveTo(0,-3);g.lineTo(20,9);g.lineTo(31,7);g.stroke();
  g.restore();return;
 }
 if(p.type==='shoreCamp'){
  g.save();g.rotate(p.rotation||0);
  R(-85,23,170,12,'#18231fa0');
  // Two weather-beaten children's dormitories with porches and broken windows.
  for(const [x,y,w,h]of [[-68,-28,52,38],[16,-32,48,35]]){
   R(x-3,y+h-2,w+7,5,'#493b2d');R(x,y,w,h,'#686c59');R(x-3,y-5,w+6,7,'#644b37');zonePolygon(g,[[x-4,y-5],[x+5,y-15],[x+w-3,y-15],[x+w+4,y-5]],'#805b3d');R(x+3,y-5,w-6,3,'#aa8253');
   for(let wx=x+5;wx<x+w-6;wx+=13){R(wx,y+7,8,10,'#293d3b');R(wx+1,y+8,6,3,'#71877e');R(wx+3,y+8,1,8,'#c0b28e');R(wx-1,y+17,10,2,'#4a4739')}
   R(x+w/2-5,y+h-14,12,14,'#394239');R(x+w/2-4,y+h-12,9,11,'#9c7950');R(x-1,y+h+3,w+3,2,'#a48c60');
  }
  // Playground: collapsed swing frame, dangling chains, slide and rusted roundabout.
  g.strokeStyle='#8a714d';g.lineWidth=3;g.beginPath();g.moveTo(-3,-20);g.lineTo(-19,17);g.lineTo(14,17);g.lineTo(-3,-20);g.moveTo(-19,17);g.lineTo(-27,20);g.moveTo(14,17);g.lineTo(22,20);g.stroke();
  g.strokeStyle='#c0a574';g.lineWidth=1;g.beginPath();g.moveTo(-11,-3);g.lineTo(-12,12);g.moveTo(-3,-5);g.lineTo(-2,13);g.moveTo(5,-4);g.lineTo(8,12);g.stroke();R(-15,11,8,3,'#a55139');R(-6,12,8,3,'#667d6c');R(4,11,9,3,'#bd8c43');
  R(31,7,4,22,'#5d6f67');R(29,5,9,4,'#a8a48a');R(34,27,20,5,'#855b3e');R(42,24,3,8,'#657468');R(36,27,7,2,'#c17943');
  // Faded camp pennants, benches and a cold fire ring.
  R(-78,-18,3,55,'#514733');g.strokeStyle='#b5a477';g.lineWidth=1;g.beginPath();g.moveTo(-76,-14);g.lineTo(-50,-8);g.stroke();zonePolygon(g,[[-73,-14],[-66,-13],[-69,-8]],'#b14d3c');zonePolygon(g,[[-64,-12],[-56,-10],[-59,-5]],'#bd9c4d');zonePolygon(g,[[-55,-10],[-48,-9],[-51,-3]],'#6d8b6d');
  R(-80,24,19,4,'#776444');R(-77,29,4,3,'#4a4031');R(-67,29,4,3,'#4a4031');R(64,18,16,4,'#776444');R(66,22,3,3,'#4a4031');R(75,22,3,3,'#4a4031');
  g.fillStyle='#44473c';g.beginPath();g.ellipse(0,35,12,5,0,0,Math.PI*2);g.fill();g.strokeStyle='#847652';g.lineWidth=2;g.beginPath();g.ellipse(0,34,9,4,0,0,Math.PI*2);g.stroke();R(-4,31,8,2,'#564332');R(-2,29,4,2,'#77715b');R(-1,29,2,1,'#333b31');
  R(-79,8,9,7,'#8b6141');R(-78,7,8,2,'#c49b61');R(66,-2,9,7,'#68745b');R(67,-3,7,2,'#aab088');g.restore();return;
 }
 if(p.type==='pirateShip'||p.type==='cargoShip'){
  g.save();g.rotate(p.variant%2?-.075:-.105);
  // Wide impact scar and scattered timbers make the object read as a crash site first.
  poly([[-110,28],[-82,18],[-46,20],[-12,26],[42,23],[96,30],[105,38],[56,42],[-7,38],[-58,42],[-101,37]],'#2b3129aa');
  poly([[-103,29],[-74,22],[-34,25],[2,31],[-25,36],[-71,35]],'#776c4e');
  for(const [x,y,w]of [[-104,19,25],[-83,36,32],[-42,31,21],[68,32,29],[87,23,18]]){g.save();g.translate(x,y);g.rotate((x%17)*.025);R(0,0,w,4,'#5b3e2d');R(2,0,w-4,1,'#b18455');g.restore()}
  for(const [x,y]of [[-99,33],[-72,42],[-29,39],[76,41],[101,34]]){R(x,y,7,4,'#4a4b3d');R(x+1,y,4,1,'#9c906a')}
  R(-91,22,184,13,'#15201caa');
  // The hull has rammed bow-first into the ground; its left side is torn open and the stern remains high.
  poly([[-91,-5],[-82,-17],[-67,-24],[-41,-25],[-27,-17],[48,-22],[72,-16],[87,-3],[79,14],[58,25],[-50,24],[-73,17]],'#202723');
  poly([[-84,-7],[-73,-18],[-55,-21],[-39,-19],[-28,-12],[48,-17],[76,-8],[80,-2],[70,11],[54,19],[-50,18],[-69,12]],'#5b382a');
  poly([[-38,-13],[-25,-8],[48,-13],[70,-7],[73,-2],[63,6],[-47,8]],'#89583b');
  R(-46,9,111,4,'#3b2d25');R(-42,15,98,3,'#9f6b43');R(-35,20,84,3,'#332b25');
  // Splintered bow: black cavity, exposed frames and missing outer planks.
  poly([[-87,-5],[-75,-17],[-58,-20],[-44,-16],[-51,-6],[-43,1],[-53,13],[-69,12],[-82,6]],'#25231f');
  poly([[-82,-4],[-72,-13],[-60,-16],[-49,-12],[-57,-5],[-50,1],[-58,8],[-70,7]],'#111916');
  for(let i=0;i<5;i++){const x=-78+i*7;g.strokeStyle=i%2?'#b08252':'#68442f';g.lineWidth=3;g.beginPath();g.moveTo(x,-12+i%2*2);g.quadraticCurveTo(x-5,0,x+1,11);g.stroke()}
  poly([[-91,-7],[-81,-19],[-72,-17],[-78,-9],[-70,-3],[-84,1]],'#8b5a39');R(-94,0,18,3,'#bc8450');R(-88,7,21,3,'#6a4430');
  for(const [x,y,a]of [[-95,16,-.4],[-77,24,.25],[-57,29,-.18]]){g.save();g.translate(x,y);g.rotate(a);R(-1,-12,3,25,'#6a4932');R(0,-11,1,22,'#c28d58');g.restore()}
  // Surviving sterncastle is skewed and partially collapsed.
  poly([[46,-21],[69,-20],[82,-11],[75,-4],[46,-8]],'#54372b');R(53,-35,23,17,'#64422f');poly([[50,-36],[58,-44],[78,-39],[79,-34]],'#9a6841');R(57,-31,15,8,'#202a27');
  for(const x of [59,67]){R(x,-29,5,5,'#78958a');R(x,-29,2,1,'#d2d6b2')}R(76,-31,4,24,'#3f3027');R(50,-18,30,3,'#b37e4c');
  // Sloping deck, broken rail and empty cannon ports.
  g.strokeStyle='#b88957';g.lineWidth=3;g.beginPath();g.moveTo(-40,-19);g.lineTo(74,-15);g.stroke();
  for(const x of [-34,-22,-10,5,18,31,45]){const h=x===5||x===31?4:9;R(x,-25,2,h,'#755039')}R(-38,-27,48,2,'#a87648');R(17,-23,25,2,'#9c6c43');R(47,-22,29,2,'#b47f4e');
  for(const [x,y]of [[-27,-3],[-8,-4],[13,-6],[34,-8],[55,-7]]){R(x,y,7,4,'#171a17');R(x+1,y+1,4,1,'#bd8c57')}
  // Two surviving masts lean in different directions; the foremast has snapped and hangs over the wreck.
  const mast=(x,y,angle,height)=>{g.save();g.translate(x,y);g.rotate(angle);R(-2,-height,5,height,'#493124');R(-1,-height,1,height,'#c1905a');R(-25,-height+18,49,3,'#65442f');R(-20,-height+43,39,3,'#5d402d');g.restore()};
  mast(-13,-16,-.12,73);mast(35,-18,.08,82);
  g.save();g.translate(-44,-15);g.rotate(-.72);R(-2,-49,5,55,'#4b3225');R(-1,-47,1,51,'#ba8955');R(-20,-38,40,3,'#64442f');g.restore();
  // Only fragments of sail remain, sagging between broken spars.
  poly([[-35,-70],[-14,-72],[-16,-55],[-24,-48],[-36,-52]],'#837158');poly([[-32,-68],[-19,-68],[-20,-56],[-25,-52],[-32,-54]],'#b6a079');
  poly([[11,-77],[36,-82],[38,-58],[29,-51],[13,-57]],'#786752');poly([[15,-75],[32,-77],[33,-61],[27,-55],[17,-59]],'#b7a178');
  poly([[39,-55],[56,-51],[53,-38],[44,-42]],'#8e795b');R(16,-63,2,10,'#d0b98b');R(-30,-63,2,8,'#d7be8e');
  // Slack rigging, torn ratlines, snapped bowsprit and a faded flag.
  g.strokeStyle='#b6a27b';g.lineWidth=1;g.beginPath();g.moveTo(-22,-84);g.lineTo(-72,-13);g.moveTo(-13,-86);g.lineTo(34,-96);g.lineTo(75,-12);g.moveTo(-45,-51);g.lineTo(35,-94);g.moveTo(-13,-82);g.lineTo(64,-15);g.stroke();
  for(let y=-69;y<-32;y+=8){g.beginPath();g.moveTo(-8,y);g.lineTo(-38+(y+69)*.35,y+3);g.moveTo(39,y-6);g.lineTo(61-(y+69)*.25,y-2);g.stroke()}
  poly([[36,-98],[54,-94],[46,-88],[54,-83],[37,-86]],'#47251f');R(42,-93,6,5,'#cfc4aa');R(44,-95,2,8,'#4b2722');R(40,-87,10,2,'#d4cab2');
  g.save();g.translate(71,-16);g.rotate(.42);R(0,-2,47,4,'#6c472f');R(2,-1,42,1,'#bd8952');g.restore();poly([[103,4],[119,12],[111,18],[97,10]],'#3d3027');
  // Wheel, hanging anchor, moss and displaced cargo finish the wreck.
  g.strokeStyle='#d0aa70';g.lineWidth=2;g.beginPath();g.arc(48,-22,7,0,Math.PI*2);g.moveTo(41,-22);g.lineTo(55,-22);g.moveTo(48,-29);g.lineTo(48,-15);g.stroke();
  g.strokeStyle='#59645a';g.lineWidth=3;g.beginPath();g.moveTo(65,1);g.quadraticCurveTo(72,11,65,17);g.quadraticCurveTo(55,13,60,6);g.moveTo(59,11);g.lineTo(53,11);g.stroke();
  for(const [x,y]of [[-46,14],[-23,19],[3,16],[27,19],[52,13]]){R(x,y,10,2,'#476044');R(x+2,y-2,5,2,'#748455')}
  R(-98,28,12,8,'#6e4932');R(-96,27,10,2,'#c08a53');R(82,24,9,7,'#4b4938');R(83,23,7,2,'#a59463');g.restore();return;
 }
 if(p.type==='camp'){
  zoneTent(g,-13,1,35,26,true);zoneTent(g,21,3,23,19,true);zoneFire(g,1,25,0,false);
  R(-30,13,8,7,'#82785a');R(-29,14,6,1,'#b4a57c');R(22,21,6,3,'#a6a78e');R(28,24,3,5,'#788c79');R(-18,22,12,2,'#4e4739');return;
 }
 if(p.type==='corpse'){
  g.save();g.scale(1.18,1.18);const cloak=/плащ/.test(p.name),nearTree=/дерева/i.test(p.name),notebook=/блокнот/.test(p.name);
  // Distinct collapsed survivor: head/neck, torso, limp arms and separated bent legs.
  g.fillStyle='#111b17b8';g.beginPath();g.ellipse(1,12,33,10,-.08,0,Math.PI*2);g.fill();
  if(nearTree){R(27,-32,8,54,'#473d2d');R(29,-30,2,47,'#98805a');R(23,-27,13,8,'#31432f');R(31,-36,12,9,'#4a5034');R(17,-20,12,8,'#3d4a32');R(22,17,17,4,'#67543c');R(37,17,9,3,'#a58a58')}
  // Boots and trouser legs remain readable even against the forest floor.
  zonePolygon(g,[[-3,5],[5,5],[1,17],[-9,23],[-18,21],[-14,16]],'#313d35');
  zonePolygon(g,[[5,4],[12,2],[20,10],[26,18],[21,22],[13,17],[4,12]],'#465044');
  zonePolygon(g,[[-13,17],[-7,19],[-13,24],[-23,24],[-24,21]],'#242e29');
  zonePolygon(g,[[18,16],[24,18],[29,23],[19,24],[14,21]],'#252f2a');
  // Torso / outer garment.
  zonePolygon(g,[[-15,-8],[-6,-15],[7,-14],[17,-7],[16,5],[8,12],[-7,9],[-16,3]],cloak?'#252f2d':'#38463a');
  zonePolygon(g,[[-11,-8],[-5,-12],[5,-11],[12,-6],[10,4],[3,9],[-7,6],[-12,1]],cloak?'#65716e':'#8b7959');
  zonePolygon(g,[[-7,-9],[0,-11],[6,-7],[2,5],[-3,7],[-8,1]],cloak?'#89918a':'#a4916d');
  // One arm folded under the chest; the other lies outstretched.
  zonePolygon(g,[[-12,-5],[-20,-1],[-24,8],[-19,11],[-11,4],[-6,1]],cloak?'#4c5956':'#58604c');
  zonePolygon(g,[[10,-4],[18,-3],[25,2],[24,7],[19,6],[13,3]],cloak?'#3d4a47':'#68654d');
  R(-25,7,6,4,'#a18a69');R(21,5,6,4,'#b59a70');
  // Turned head, collar, hood/hair and a small light-catching detail.
  g.fillStyle=cloak?'#222b29':'#746c58';g.beginPath();g.ellipse(-21,-10,8,7,-.3,0,Math.PI*2);g.fill();
  g.fillStyle='#b49b78';g.beginPath();g.ellipse(-20,-9,4,4,-.3,0,Math.PI*2);g.fill();R(-23,-11,6,2,'#303833');R(-15,-8,5,3,'#b9a77c');
  R(-4,-6,3,12,'#d0b77d');R(5,-4,2,9,'#313e36');R(1,3,4,3,'#d0c09a');
  // Torn fabric, dirt and a restrained dark blood stain ground the silhouette.
  R(-8,7,4,3,'#26312b');R(7,6,5,2,'#242f2a');R(-5,11,3,2,'#a26242');
  g.fillStyle='#713d35a0';g.beginPath();g.ellipse(0,13,13,4,.15,0,Math.PI*2);g.fill();
  if(notebook){R(-32,14,9,7,'#d4c69e');R(-31,15,7,5,'#e2d6b6');R(-30,16,5,1,'#655c47');R(-30,18,4,1,'#82765a');R(-30,20,5,1,'#655c47');R(-34,17,2,5,'#554d3d')}
  g.restore();return;
 }
 if(p.type==='bunker'){
  R(-38,16,80,12,'#354434');zonePolygon(g,[[-37,17],[-32,-14],[-20,-24],[25,-24],[36,-12],[39,18]],'#6a7765');
  R(-28,-17,57,35,'#929b8b');R(-29,-20,58,6,'#c1c3ad');R(23,-14,8,32,'#606f66');
  R(-16,-10,33,32,'#323f3c');R(-14,-9,24,29,'#596f6e');R(-12,-8,20,2,'#acb9ab');
  R(-12,-4,3,19,'#879e8f');R(8,-7,5,27,'#182b28');R(-13,20,32,3,'#c0c2ab');
  g.strokeStyle='#c0c7af';g.lineWidth=2;g.beginPath();g.arc(0,7,5,0,Math.PI*2);g.moveTo(-5,7);g.lineTo(5,7);g.moveTo(0,2);g.lineTo(0,12);g.stroke();
  R(-32,-8,9,6,'#3c5049');for(let i=0;i<3;i++)R(-31,-7+i*2,7,1,'#b1b49e');
  R(18,-13,4,3,'#b79458');R(-25,3,6,1,'#58685c');R(-24,4,1,8,'#58685c');
  for(let i=0;i<5;i++)R(-24+i*12,25+i%2,9,3,'#a6a68e');
  R(21,-31,5,10,'#787a65');R(19,-33,9,3,'#a6ae98');return;
 }
 if(p.type==='laboratory'){
  R(-52,24,108,13,'#17241ec0');zonePolygon(g,[[-48,18],[-43,-16],[-27,-25],[35,-25],[49,-13],[52,19]],'#586861');
  R(-41,-13,82,31,'#87948b');R(-43,-17,86,6,'#c3c7b7');for(let x=-35;x<35;x+=14){R(x,-10,2,24,'#65736e');R(x+2,-8,1,20,'#b2b7a7')}
  R(-17,-7,34,30,'#263a37');R(-14,-5,27,27,'#364f4b');R(-12,-3,22,2,'#b6c4b5');R(10,-5,4,27,'#172b29');R(-20,21,40,3,'#d0cbb1');
  R(-4,5,13,18,'#192d2b');R(-2,7,8,14,'#70847b');R(0,9,3,8,'#bfd0ba');R(11,2,4,3,'#c64338');R(13,1,2,9,'#c5c4a6');
  // Distinctive sealed hatch and hazard placard.
  R(-34,-10,12,9,'#334844');R(-32,-8,8,5,'#8eaa9e');g.fillStyle='#d2d4b7';g.beginPath();g.arc(-28,-5,3,0,Math.PI*2);g.fill();g.fillStyle='#293932';g.beginPath();g.arc(-28,-5,1,0,Math.PI*2);g.fill();
  R(25,-10,9,10,'#e0d7a9');zonePolygon(g,[[29,-9],[32,-4],[26,-4]],'#b44338');R(28,-3,2,2,'#29352f');
  R(-47,5,5,10,'#a46c47');R(-45,7,2,6,'#d1aa77');R(37,-18,9,3,'#a45d42');R(-34,25,8,5,'#6b5943');R(28,25,11,4,'#6b5943');return;
 }
 if(p.type==='factory'&&/насосная/i.test(p.name)){
  // Pumping station: paired pressure tanks, pipes, valves and pump housings.
  R(-58,22,116,14,'#19261fc0');R(-48,0,91,31,'#4e5e56');R(-52,-4,99,7,'#a8ae96');R(-48,3,91,5,'#717f75');
  for(const [x,y,rx,ry]of [[-31,-9,17,22],[9,-14,20,27]]){g.fillStyle='#606f67';g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fill();g.fillStyle='#aab4a6';g.beginPath();g.ellipse(x-2,y-2,rx-3,ry-4,-.04,Math.PI,Math.PI*2);g.lineTo(x+rx-3,y+5);g.lineTo(x-rx+1,y+5);g.fill();g.strokeStyle='#394a45';g.lineWidth=2;g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.stroke();R(x-rx+3,y+4,rx*2-6,2,'#788c7f');R(x-3,y-2,6,5,'#3e5048');R(x-1,y-1,2,2,'#c0b58d')}
  R(-46,-22,3,41,'#89988b');R(-48,-23,7,3,'#c5c1a4');R(29,-35,4,58,'#68786d');R(27,-37,8,3,'#bbc0aa');
  g.strokeStyle='#c1b78d';g.lineWidth=3;g.beginPath();g.moveTo(-31,14);g.lineTo(-31,27);g.lineTo(9,27);g.lineTo(9,15);g.moveTo(9,13);g.lineTo(38,13);g.lineTo(38,-4);g.stroke();
  for(const [x,y]of [[-15,18],[0,18]]){R(x-7,y-7,14,14,'#35443c');R(x-8,y-8,16,3,'#c2aa74');g.fillStyle='#aab09a';g.beginPath();g.arc(x,y,5,0,Math.PI*2);g.fill();g.fillStyle='#384941';g.beginPath();g.arc(x,y,2,0,Math.PI*2);g.fill()}
  R(-54,27,10,4,'#81563b');R(38,24,13,4,'#8d6646');R(-49,31,7,2,'#b57249');R(31,30,11,2,'#bd8050');return;
 }
 if(p.type==='factory'){
  baseDetailedLocation.call(this,p);R(-33,-5,62,3,'#c4c5b4');R(-28,1,2,37,'#485d5e');R(30,-20,6,29,'#d09a67');R(31,-29,13,4,'#384540');R(-42,22,6,13,'#a55e40');R(34,20,7,13,'#a55e40');return;
 }
 if(p.type==='cache'){
   // Recessed field cache nestled into an explicit root-and-soil bed.
   R(-23,9,47,8,'#1d2a20ae');zonePolygon(g,[[-19,9],[-12,2],[15,3],[23,10],[16,14],[-15,14]],'#655a3d');
   for(let i=0;i<5;i++){const x=-23+i*11;g.strokeStyle=i%2?'#a38c5d':'#83734e';g.lineWidth=2;g.beginPath();g.moveTo(x,14);g.quadraticCurveTo(x-4,4,x+2,-1);g.stroke();R(x-3,7,4,2,'#71804d')}
   R(-14,-6,28,17,'#26352f');R(-12,-9,24,5,'#b69b68');R(-12,-5,24,14,'#8e7651');R(-10,-3,20,9,'#65543d');R(-11,-7,22,2,'#d0b77e');
   R(-9,-4,3,11,'#b9975b');R(7,-4,3,11,'#574a37');R(-4,-2,8,5,'#c5a968');R(-2,-1,4,3,'#343b2e');R(-18,11,9,2,'#a29771');R(11,11,10,2,'#b39a69');R(-25,15,6,2,'#46533c');R(21,15,5,2,'#596546');return;
  }
  if(p.type==='supplyDrop'){
   R(-34,16,68,7,'#1d2a20ad');
   // Torn canopy, tangled lines and a battered crate mark a failed relief drop.
   zonePolygon(g,[[-30,-22],[-24,-39],[-12,-47],[1,-48],[17,-42],[28,-29],[26,-24],[15,-29],[5,-24],[-8,-30],[-20,-23]],'#667b68');
   zonePolygon(g,[[-24,-30],[-16,-40],[-7,-34],[-6,-28]],'#a3ac8a');zonePolygon(g,[[-4,-31],[2,-45],[12,-38],[16,-29]],'#899879');zonePolygon(g,[[17,-34],[25,-29],[25,-25],[15,-29]],'#b39b69');
   g.strokeStyle='#b4b59a';g.lineWidth=1;g.beginPath();g.moveTo(-22,-24);g.lineTo(-9,1);g.lineTo(11,-22);g.lineTo(14,1);g.moveTo(0,-27);g.lineTo(2,0);g.stroke();
   R(-22,0,43,19,'#313d37');R(-19,-2,38,5,'#b28b53');R(-18,3,34,13,'#836446');R(-18,4,3,12,'#d0a15e');R(13,4,3,12,'#594837');
   R(-12,6,9,7,'#544735');R(-11,7,6,2,'#bd9c64');R(2,5,9,9,'#3d453a');R(4,7,4,4,'#9b8b65');R(-4,17,10,3,'#27332d');
   for(const [x,y]of [[-27,17],[-22,20],[22,20],[29,15],[-32,10]]){R(x,y,6,3,'#8b6a45');R(x+1,y-2,3,2,'#bd8050')}
   R(17,-10,5,4,'#a55b40');R(-18,-28,7,3,'#9e5540');return;
  }
  if(p.type==='wallet'){
  R(-11,6,24,4,'#23382d99');R(-10,-6,20,14,'#4c4638');R(-9,-5,18,11,'#9a8059');R(-8,-5,16,3,'#c8ad7b');R(-2,-6,4,13,'#64593e');R(-1,-1,3,3,'#c6be93');R(8,0,4,4,'#ded5b2');return;
 }
 if(p.type==='hospital'){
  R(-58,24,124,15,'#23372bb0');R(-56,-30,111,59,'#a8ad9c');R(43,-29,12,58,'#747f75');R(-60,-35,119,7,'#657571');R(-60,-35,119,2,'#c3c6b3');
  for(let row=0;row<2;row++)for(let col=0;col<7;col++){const x=-49+col*14,y=-22+row*22;R(x-1,y-1,10,15,'#d2d0b8');R(x,y,8,12,'#30494c');R(x+1,y+1,3,4,'#8aaba4');R(x+4,y,1,12,'#9aa89b');if((col+row)%3===0)R(x,y+8,7,2,'#927e5a')}
  R(-15,13,29,17,'#485d55');R(-12,15,10,15,'#253a38');R(1,15,10,15,'#344c49');R(-20,10,40,4,'#c5c2a6');R(-23,31,46,4,'#a8ae99');R(-27,36,54,3,'#717e6c');
  R(-7,-53,15,17,'#687b78');R(-6,-52,13,15,'#e4dfc8');
  zonePolygon(g,[[-2,-49],[2,-49],[2,-45],[6,-45],[6,-41],[2,-41],[2,-37],[-2,-37],[-2,-41],[-6,-41],[-6,-45],[-2,-45]],'#bd5145');
  for(let i=0;i<7;i++){const x=-50+i*16;R(x,-29,1,58,'#7a8175');if(i%2===0){R(x+5,-8,2,7,'#7c5c45');R(x+10,3,1,19,'#9da18e')}}
  R(-45,35,13,2,'#9f9d83');R(29,33,10,2,'#b38a57');R(-16,-33,25,2,'#87918a');R(17,-31,20,2,'#89958e');
  R(29,23,9,4,'#6a7a6c');R(32,23,2,8,'#bac0aa');R(-51,25,14,2,'#6c6750');R(-48,26,2,5,'#6c6750');return;
 }
 if(p.type==='weatherStation'){
  R(-52,24,106,11,'#27392fb0');
  for(const [x,y,r] of [[-30,-21,20],[29,-32,24]]){
   R(x-r+5,y+5,r*2-10,43,'#87968e');R(x+5,y+6,r-10,42,'#5b726e');R(x-r+3,y+43,r*2-6,4,'#b7bba6');
   g.fillStyle='#c2ccc0';g.beginPath();g.arc(x,y,r,Math.PI,Math.PI*2);g.lineTo(x+r,y+6);g.lineTo(x-r,y+6);g.closePath();g.fill();
   g.strokeStyle='#7f9995';g.lineWidth=1;g.beginPath();g.ellipse(x,y,r*.53,r,0,Math.PI,Math.PI*2);g.moveTo(x-r+2,y-7);g.lineTo(x+r-2,y-7);g.moveTo(x-r,y+1);g.lineTo(x+r,y+1);g.stroke();
   R(x-7,y+17,13,9,'#2c4c50');R(x-6,y+18,5,3,'#9abeb6');R(x-2,y+17,1,9,'#a8b9a7');
  }
  R(-12,4,26,27,'#929e8e');R(-15,1,32,4,'#c0c3aa');R(-4,14,10,18,'#334d46');R(-2,16,3,8,'#9aafa0');
  R(-2,-58,2,60,'#aab9a5');R(-11,-50,20,2,'#c7cdb6');R(-12,-52,5,5,'#6f8f8d');R(8,-52,5,5,'#6f8f8d');R(-6,-61,10,2,'#bec8b0');return;
 }
 if(p.type==='radar'){
  R(-55,29,116,13,'#20372cb0');R(-44,4,89,28,'#87968a');R(-48,0,96,6,'#b3b7a0');R(27,7,18,25,'#61756b');R(-31,13,22,19,'#344d49');R(-29,15,8,7,'#85aaa3');R(4,12,15,9,'#304b50');
  zonePolygon(g,[[-10,1],[0,-27],[9,-27],[20,1]],'#607971');R(-13,-2,37,4,'#bbc5b3');
  g.save();g.translate(0,-33);g.rotate(-.35);g.fillStyle='#3d5757';g.beginPath();g.ellipse(0,3,45,23,0,0,Math.PI*2);g.fill();g.fillStyle='#b9c8bb';g.beginPath();g.ellipse(0,0,44,21,0,0,Math.PI*2);g.fill();
  g.strokeStyle='#799692';g.lineWidth=1;for(let i=-3;i<=3;i++){g.beginPath();g.ellipse(0,0,Math.abs(i)*11+2,20,0,0,Math.PI*2);g.stroke()}
  g.beginPath();g.moveTo(-43,0);g.lineTo(43,0);g.moveTo(-32,-14);g.lineTo(32,14);g.moveTo(-32,14);g.lineTo(32,-14);g.stroke();
  g.strokeStyle='#d5ddc8';g.lineWidth=2;g.beginPath();g.moveTo(-34,9);g.lineTo(0,-33);g.lineTo(34,9);g.moveTo(0,18);g.lineTo(0,-33);g.stroke();rect(g,-3,-36,7,7,'#637e78');rect(g,-2,-36,4,2,'#dce0c6');g.restore();
  R(50,-7,3,40,'#82988c');R(47,-9,9,3,'#b6c2aa');R(49,-17,5,7,'#925d43');return;
 }
 baseDetailedLocation.call(this,p);
 if(p.type==='factory'||p.type==='laboratory'){
  // Exposed beams, broken glazing, cable runs and oxidized cladding seams.
  for(let x=-37;x<39;x+=15){R(x,-1,2,42,'#707b78');R(x+2,3,1,27,'#c0c2b1')}
  for(const [x,y,w,h]of [[-37,3,7,15],[-13,0,9,18],[16,1,8,16],[33,26,8,10]]){R(x,y,w,h,'#23383a');R(x+1,y+1,w-2,2,'#9bb4ad');R(x+2,y+6,2,h-7,'#607b7c');R(x+w-2,y,2,h,'#bd7545')}
  g.strokeStyle='#485851';g.lineWidth=2;g.beginPath();g.moveTo(-45,-10);g.lineTo(-45,27);g.lineTo(-35,27);g.moveTo(40,-4);g.lineTo(47,-4);g.lineTo(47,22);g.stroke();
  for(const [x,y]of [[-48,28],[-39,35],[42,36],[49,27],[-30,37]]){R(x,y,5,3,'#555c50');R(x+1,y-2,3,2,'#a46843')}
  if(p.type==='laboratory'){R(-4,12,12,3,'#c1cb9a');for(let i=0;i<4;i++)R(-3+i*3,16,1,5,'#7dc2a8');R(7,14,2,9,'#b5443b')}
 }
 if(p.type==='dugout'){R(-16,-2,3,24,'#b5a276');R(10,-1,4,23,'#746645');for(let i=0;i<5;i++)R(-15,1+i*4,2,1,'#4d4f38');R(20,-19,6,3,'#b8b9a0');R(-8,22,19,2,'#9b9d7e')}
};
