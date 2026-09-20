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
 const R=(x,y,w,h,col)=>rect(g,x,y,w,h,col);
 if(p.type==='camp'){
  zoneTent(g,-13,1,35,26,true);zoneTent(g,21,3,23,19,true);zoneFire(g,1,25,0,false);
  R(-30,13,8,7,'#82785a');R(-29,14,6,1,'#b4a57c');R(22,21,6,3,'#a6a78e');R(28,24,3,5,'#788c79');R(-18,22,12,2,'#4e4739');return;
 }
 if(p.type==='corpse'){
  const cloak=/плащ/.test(p.name);
  R(-20,6,42,5,'#19251ea0');
  zonePolygon(g,[[-13,-5],[1,-8],[17,-2],[12,7],[-9,7]],cloak?'#424b47':'#716653');
  zonePolygon(g,[[-10,-4],[0,-6],[12,0],[8,5],[-7,5]],cloak?'#7e8780':'#a0916e');
  R(-19,-4,9,9,'#26372e');R(-17,-3,6,7,cloak?'#6b776c':'#c0aa88');R(-16,0,3,3,'#4b5146');
  R(-8,-2,17,1,'#b1afa0');R(-3,0,2,6,'#424b3c');R(2,3,7,2,'#53634b');
  R(10,-2,10,4,'#4e5849');R(9,5,9,4,'#626b56');R(19,-3,5,5,'#25372e');R(17,6,6,4,'#26372e');
  R(-7,7,8,3,'#665247');R(-9,7,3,2,'#b9a380');
  R(2,-14,9,7,'#756b4d');R(3,-14,7,2,'#b1a274');R(5,-12,3,3,'#35473a');
  if(/блокнот/.test(p.name)){R(-14,12,7,6,'#d4c9a5');for(let i=0;i<3;i++)R(-13,13+i*2,5,1,'#7b806d')}
  return;
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
 if(p.type==='cache'){
  if(/корн|Свёрток/.test(p.name)){R(-18,8,39,4,'#273b2ba0');zonePolygon(g,[[-14,5],[-10,-7],[9,-8],[15,7]],'#969370');R(-11,-5,18,2,'#cbc09a');R(-2,-8,3,17,'#4a5944');R(-4,-2,7,3,'#d4c59a');R(-20,10,14,3,'#776548');R(8,11,17,2,'#776548');return}
  R(-17,10,37,5,'#1c3028a0');R(-16,-9,32,22,'#303f39');R(-14,-6,28,17,'#6e8478');R(-14,-10,28,5,'#acb2a0');R(10,-5,4,16,'#475d55');
  for(const x of [-10,7]){R(x,-9,3,21,'#434f43');R(x,-8,2,2,'#d4c5a1');R(x,8,2,2,'#c5b99a')}
  R(-3,-3,6,7,'#d6b579');R(-1,-1,2,3,'#3c4639');R(-13,4,6,4,'#a0603e');R(3,-6,5,3,'#b87548');R(10,6,4,5,'#8b543a');R(-5,7,6,1,'#a2af97');return;
 }
 if(p.type==='wallet'){
  R(-11,6,24,4,'#23382d99');R(-10,-6,20,14,'#4c4638');R(-9,-5,18,11,'#9a8059');R(-8,-5,16,3,'#c8ad7b');R(-2,-6,4,13,'#64593e');R(-1,-1,3,3,'#c6be93');R(8,0,4,4,'#ded5b2');return;
 }
 if(p.type==='hospital'){
  R(-58,24,124,15,'#23372bb0');R(-56,-30,111,59,'#a8ad9c');R(43,-29,12,58,'#747f75');R(-60,-35,119,7,'#657571');R(-60,-35,119,2,'#c3c6b3');
  for(let row=0;row<2;row++)for(let col=0;col<7;col++){const x=-49+col*14,y=-22+row*22;R(x-1,y-1,10,15,'#d2d0b8');R(x,y,8,12,'#30494c');R(x+1,y+1,3,4,'#8aaba4');R(x+4,y,1,12,'#9aa89b');if((col+row)%3===0)R(x,y+8,7,2,'#927e5a')}
  R(-15,13,29,17,'#485d55');R(-12,15,10,15,'#253a38');R(1,15,10,15,'#344c49');R(-20,10,40,4,'#c5c2a6');R(-23,31,46,4,'#a8ae99');R(-27,36,54,3,'#717e6c');
  R(-4,-49,9,11,'#c5c7ad');R(-2,-47,5,8,'#a75141');R(-4,-44,9,3,'#a75141');
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
 if(p.type==='dugout'){R(-16,-2,3,24,'#b5a276');R(10,-1,4,23,'#746645');for(let i=0;i<5;i++)R(-15,1+i*4,2,1,'#4d4f38');R(20,-19,6,3,'#b8b9a0');R(-8,22,19,2,'#9b9d7e')}
};
