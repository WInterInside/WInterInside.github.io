'use strict';
(()=>{
 const $=id=>document.getElementById(id),SAVE='tikhiy-kordon-expedition-v3',GUIDE_READ='tikhiy-kordon-guide-read-v1',CONTROL_MODE='tikhiy-kordon-control-mode-v1',keys=new Set(),audio=new ZoneAudio(),world=new WorldRenderer($('world'));
 let game,loadMessage='',lastInventory='',lastEvent=null,lastCamp='',lastLog='',lastMode='',saveTimer=0,uiTimer=0,lastTime=performance.now(),toastTimer,controlMode='keyboard',autoTarget=null;
 try{const saved=localStorage.getItem(SAVE);game=saved?Zone.Expedition.restore(saved):new Zone.Expedition();if(saved&&game.s.mode==='playing')game.act('pause')}catch{game=new Zone.Expedition();loadMessage='Прежнее сохранение не удалось прочитать. Начата новая вылазка.'}
 const touchOnly=matchMedia('(pointer:coarse)').matches||matchMedia('(max-width:600px)').matches;
 try{controlMode=touchOnly||localStorage.getItem(CONTROL_MODE)==='mouse'?'mouse':'keyboard'}catch{controlMode=touchOnly?'mouse':'keyboard'}
 const text=(id,value)=>{if($(id).textContent!==String(value))$(id).textContent=value};
 function compactNotes(value){
  if(!value)return value;
  for(const note of [...BALANCE.fieldNotes,BALANCE.rangerNote,BALANCE.pirateNote]){
   if(!value.includes(note.body))continue;
   value=value.replace(` «${note.title}».\n\n`,'.\n').replace(note.body,note.body.replace(/\n\s*\n/g,'\n'));
  }
  return value;
 }
 function renderEventDetails(value,note){
  const target=$('event-details'),body=note&&compactNotes(note.body),at=body?value.indexOf(body):-1;target.replaceChildren();
  if(at<0){target.textContent=value;return}
  target.append(document.createTextNode(value.slice(0,at)));const excerpt=document.createElement('span');excerpt.className='found-note';excerpt.textContent=body;target.append(excerpt,document.createTextNode(value.slice(at+body.length)));
 }
 function toast(message){text('notice',message);$('notice').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('notice').classList.remove('show'),3500)}
 function save(){try{localStorage.setItem(SAVE,game.serialize());text('save-status','Вылазка сохранена')}catch{text('save-status','Сохранение недоступно в этом браузере')}}
 function clearTravelTarget(){autoTarget=null;world.travelTarget=null}
 function action(id,value){game.teleportView={width:world.canvas.width/world.zoom,height:world.canvas.height/world.zoom};audio.start();keys.clear();if(['newRun','makeCamp'].includes(id))clearTravelTarget();if(id==='newRun'){if(!game.s.event?.actions.some(a=>a.id==='newRun'))return;world.followPlayer();const oldSector=game.s.sector;game=new Zone.Expedition(Date.now(),game.s.run+1);if(game.s.sector===oldSector)game.s.sector=oldSector%100+1;lastInventory='';lastEvent=null;lastCamp='';}else game.act(id,value);if(game.s.mode==='finished')clearTravelTarget();sync();save();if(game.s.mode==='playing')$('world').focus({preventScroll:true})}
 function button(parent,label,id,value,primary=false){const b=document.createElement('button');b.textContent=label;if(primary)b.className='primary';b.addEventListener('click',()=>action(id,value));parent.append(b);return b}
 function heart(hp){const c=$('hearts').getContext('2d');c.clearRect(0,0,45,36);const rows=['0011100011100','0111110111110','1111111111111','1111111111111','1111111111111','0111111111110','0011111111100','0001111111000','0000111110000','0000011100000','0000001000000'];for(let y=0;y<rows.length;y++)for(let x=0;x<rows[y].length;x++)if(rows[y][x]==='1'){const segment=Math.min(4,Math.floor(x/13*5));c.fillStyle=segment<hp?'#c7896c':'#424b3d';c.fillRect(3+x*3,2+y*3,3,3)}for(let i=1;i<5;i++){const x=3+Math.round(i*13/5)*3;c.fillStyle='#192218';for(let y=0;y<rows.length;y++)if(rows[y][Math.round(i*13/5)]==='1')c.fillRect(x,2+y*3,1,3)}$('hearts').setAttribute('aria-label',`Здоровье ${hp} из 5 — одно сердце из пяти секций`)}
 function inventory(){const s=game.s,key=JSON.stringify([s.weapon,s.armor,s.artifacts,s.medkits,s.hp,s.key,s.depotKey,s.secretMap,s.secretMapKind,s.mode==='finished']);if(key===lastInventory)return;lastInventory=key;heart(s.hp);
 const item=BALANCE.weapons[s.weapon];text('weapon-name',item.name);text('weapon-bonus','+'+Math.round(item.bonus)+'% подготовки');world.equipment($('weapon-icon'),'weapon',s.weapon);
 for(const type of ['armor']){const item=BALANCE.armor[s[type]],hideBonus=item.bonus===0;text(type,item.name);text(type+'-bonus',hideBonus?'':'+'+item.bonus+'% подготовки');$('armor-bonus').hidden=hideBonus;world.equipment($('armor-icon'),type,s[type])}
 $('artifact-slots').replaceChildren();for(let i=0;i<6;i++){const a=s.artifacts[i],b=document.createElement('button');b.className='slot'+(a?(a.rare?' rare':''):' empty');b.title=a?`${a.name} · ${game.artifactLabel(a)}`:'Пустой слот пояса';b.setAttribute('aria-label',b.title);if(a){const c=document.createElement('canvas');c.width=c.height=32;b.append(c);drawArtifact(c,a)}else b.textContent='·';b.addEventListener('click',()=>toast(b.title));$('artifact-slots').append(b)}
 $('item-slots').replaceChildren();
 const items=[];if(s.key)items.push({kind:'keycard',label:'Ключ-карта — открывает секретную лабораторию'});if(s.depotKey)items.push({kind:'depotKey',label:'Ключ от старых военных складов'});if(s.secretMap)items.push({kind:s.secretMapKind||'scroll',label:(s.secretMapKind==='pda'?'КПК':'Свиток карты')+' — данные о секретном выходе из Зоны'});
 for(let i=0;i<6;i++){const item=items[i],b=document.createElement('button');b.className='slot'+(item?'':' empty');b.title=item?item.label:'Пустая ячейка рюкзака';b.setAttribute('aria-label',b.title);if(item){const c=document.createElement('canvas');c.width=c.height=32;drawQuestItem(c,item.kind);b.append(c);b.addEventListener('click',()=>toast(item.label))}else b.textContent='·';$('item-slots').append(b)}
 $('medkits').replaceChildren();for(let i=0;i<2;i++){const b=document.createElement('button');b.className='medkit'+(i<s.medkits?' filled':'');b.textContent=i<s.medkits?'':'·';if(i<s.medkits){const icon=document.createElement('span');icon.className='medical-case';icon.setAttribute('aria-hidden','true');b.append(icon)}b.title=i<s.medkits?'Аптечка: восстановить 1 секцию':'Пустой карман';b.setAttribute('aria-label',b.title);b.disabled=i>=s.medkits||s.hp>=5||s.hp===0||s.mode==='finished';b.addEventListener('click',()=>heal(i));$('medkits').append(b)}
 }
 function heal(index){audio.start();if(game.heal(index)){toast('Восстановлена одна секция сердца.');sync();save()}}
 function sync(){const s=game.s;if(s.mode!==lastMode){keys.clear();lastMode=s.mode}
 text('sector','ЗОНА ОТЧУЖДЕНИЯ / СЕКТОР '+String(s.sector).padStart(2,'0'));text('run','ВЫЛАЗКА '+String(s.run).padStart(2,'0'));
 const weather={wind:'ВЕТЕР · СЗ',rain:'ДОЖДЬ',fog:'ТУМАН +8%',clear:'ПРОЯСНЕНИЕ'}[s.weather];text('conditions',s.mode==='finished'?(s.outcome==='victory'?'ЗОНА ПОЗАДИ':'ВЫЛАЗКА ЗАВЕРШЕНА')+' · '+(s.night?'НОЧЬ −10%':'ДЕНЬ')+' · '+weather:(s.night?'НОЧЬ −10%':'ДЕНЬ')+' · '+weather);
 $('sound').dataset.audioState=audio.ctx?.state||'not-started';$('sound').setAttribute('aria-pressed',String(audio.enabled));text('sound',audio.enabled?'🔊 Звук: ВКЛ':'🔇 Звук: ВЫКЛ');text('distance',Math.floor(s.distance)+' м');text('preparation',game.preparation()+'%');text('money',s.money.toLocaleString('ru-RU')+' ₽');
 $('stamina').max=game.maxStamina();$('stamina').value=s.stamina;text('stamina-text',Math.ceil(s.stamina)+' / '+game.maxStamina()+' с');inventory();
 $('make-camp').disabled=s.mode!=='playing';text('armor-anomaly',game.anomalyProtection()?'Аномальная защита +'+Math.round(game.anomalyProtection())+'%':'');$('armor-anomaly').hidden=game.anomalyProtection()===0;
 $('camp-panel').hidden=!['camp','rest'].includes(s.mode);document.querySelector('.touch-controls').hidden=s.mode!=='playing';const ready=s.restTime>=BALANCE.movement.restLock,campKey=s.mode+ready+s.extendedRest;
 if(campKey!==lastCamp){lastCamp=campKey;$('camp-actions').replaceChildren();if(s.mode==='camp')button($('camp-actions'),'Подняться и отправиться в путь','begin',undefined,true);if(s.mode==='rest'&&ready){button($('camp-actions'),'Подняться и продолжить','restResume',undefined,true);if(!s.extendedRest)button($('camp-actions'),'Отдохнуть ещё','restStay')}}
 text('camp-label',s.mode==='camp'?'ПЕРЕД ДОРОГОЙ':'ПЕРЕДЫШКА У КОСТРА');text('camp-text',s.mode==='camp'?'Угли ещё тёплые. Дальше — только Зона.':ready?(s.restHealed?'Полный отдых завершён. Здоровье +'+s.restHealing+' секц. Можно идти.':'Ты отдышался. Для лечения дождись полного восстановления сил.'):`Силы возвращаются. Отдохни ещё ${Math.ceil(BALANCE.movement.restLock-s.restTime)} с.`);
 const event=s.event,visible=['dialog','finished'].includes(s.mode)&&!!event;$('event').hidden=!visible;
 if(visible&&lastEvent!==event){lastEvent=event;$('event').classList.toggle('border-panel',event.tag==='ГРАНИЦА'||s.mode==='finished');text('event-tag',event.tag||'ПОЛЕВОЙ ЖУРНАЛ');text('event-title',event.title==='Ты прошёл встречу'?'Находки':event.title);text('event-body',event.body==='Ты проверяешь вещи и запоминаешь место.'?'':event.body||'');const details=compactNotes(event.details)||'';const note=[...BALANCE.fieldNotes,BALANCE.rangerNote,BALANCE.pirateNote].find(n=>details.includes(compactNotes(n.body)));renderEventDetails(details,note);const item=event.lootItem;$('loot-item').hidden=!item;if(item){text('loot-item-name',item.name);text('loot-item-slot',item.kind==='armor'?'Броня':'Оружие');text('loot-item-stats',item.kind==='armor'?`Подготовка +${Math.round(item.preparation)}% · аномальная защита +${Math.round(item.anomalyProtection)}%`:`Подготовка +${Math.round(item.preparation)}%`);world.equipment($('loot-item-icon'),item.kind,item.index)}const artifact=event.lootArtifact||s.pendingArtifact?.artifact;$('loot-artifact').hidden=!artifact;if(artifact){text('loot-artifact-name',artifact.name);text('loot-artifact-stats',game.artifactLabel(artifact));drawArtifact($('loot-artifact-icon'),artifact)}$('event-actions').replaceChildren();event.actions.forEach((a,i)=>button($('event-actions'),a.label,a.id,a.value,i===0));$('event-actions').querySelector('button')?.focus({preventScroll:true});$('event').scrollTop=0}else if(!visible)lastEvent=null;
 const logKey=JSON.stringify(s.log);if(logKey!==lastLog){lastLog=logKey;text('last-log',compactNotes(s.log[0]?.text)||'');$('log').replaceChildren();for(const entry of s.log){const li=document.createElement('li');li.textContent=String(Math.floor(entry.time/60)).padStart(2,'0')+':'+String(Math.floor(entry.time%60)).padStart(2,'0')+' · '+compactNotes(entry.text);$('log').append(li)}}
 }
 $('compass').innerHTML='<svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="15" fill="none" stroke="#8c9e80"/><path d="M20 4 26 25 20 21 14 25Z" fill="#d9b981"/><path d="M20 36 14 15 20 19 26 15Z" fill="#729887"/><circle cx="20" cy="20" r="2" fill="#e9dec0"/></svg>';
 $('compass').addEventListener('click',()=>{world.showMinimap=true;$('compass').setAttribute('aria-expanded','true');$('compass').hidden=true;$('close-minimap').hidden=false;$('close-minimap').focus({preventScroll:true})});
 $('close-minimap').addEventListener('click',()=>{world.showMinimap=false;$('compass').setAttribute('aria-expanded','false');$('compass').hidden=false;$('close-minimap').hidden=true;$('compass').focus({preventScroll:true})});
 $('make-camp').addEventListener('click',()=>action('makeCamp'));
 $('sound').addEventListener('click',()=>{audio.toggle();sync();if(audio.unavailable)toast('Звук недоступен в этом браузере.')});
 $('developer-apply').addEventListener('click',()=>{const panel=$('developer-tools'),items=[...panel.querySelectorAll('input:checked')].map(input=>input.value);if(!items.length){toast('Выбери хотя бы один пункт.');return}game.developerApply(items);panel.querySelectorAll('input').forEach(input=>input.checked=false);panel.open=false;lastInventory='';lastEvent=null;sync();save();toast('Выбранные события подготовлены.')});
 function setControlMode(mode,persist=true){controlMode=touchOnly?'mouse':mode==='mouse'?'mouse':'keyboard';keys.clear();if(controlMode==='keyboard')clearTravelTarget();$('world').classList.toggle('mouse-travel',controlMode==='mouse');for(const name of ['keyboard','mouse']){const b=$('control-'+name),active=name===controlMode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))}if(persist&&!touchOnly)try{localStorage.setItem(CONTROL_MODE,controlMode)}catch{}}
 $('control-keyboard').addEventListener('click',()=>setControlMode('keyboard'));
 $('control-mouse').addEventListener('click',()=>setControlMode('mouse'));
 setControlMode(controlMode,false);
 let helpWasPlaying=false;$('help').addEventListener('click',()=>{helpWasPlaying=game.s.mode==='playing';if(helpWasPlaying)action('pause');keys.clear();$('help-dialog').showModal()});$('help-dialog').addEventListener('close',()=>{try{localStorage.setItem(GUIDE_READ,'1')}catch{}if(helpWasPlaying&&game.s.event?.tag==='ПАУЗА')action('resume');helpWasPlaying=false});
 const movement={ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1],ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0]};
 let mapDrag=null,suppressMapClick=false;
 const mapCanvas=$('world');
 const poiTooltip=$('poi-tooltip');
 const mouseInspect=$('mouse-inspect');
 const worldPoint=e=>{const box=mapCanvas.getBoundingClientRect();return{x:Zone.clamp(world.camera.x+(e.clientX-box.left)*mapCanvas.width/box.width/world.zoom,20,game.s.map.width-20),y:Zone.clamp(world.camera.y+(e.clientY-box.top)*mapCanvas.height/box.height/world.zoom,25,game.s.map.height-25)}};
 const setTravelTarget=e=>{if(controlMode!=='mouse'||game.s.mode!=='playing')return;autoTarget=worldPoint(e);world.travelTarget=autoTarget;world.followPlayer();audio.start();toast('Маршрут отмечен. Встреча остановит путь, затем движение продолжится.')};
 const updateMouseInspect=()=>{const p=controlMode==='mouse'&&game.s.mode==='playing'?game.nearest():null;if(!p){mouseInspect.hidden=true;return}const box=mapCanvas.getBoundingClientRect(),x=(p.x-world.camera.x)*world.zoom*box.width/mapCanvas.width,y=(p.y-world.camera.y)*world.zoom*box.height/mapCanvas.height;if(x<0||y<0||x>box.width||y>box.height){mouseInspect.hidden=true;return}mouseInspect.hidden=false;mouseInspect.style.left=x+'px';mouseInspect.style.top=(y-25)+'px';mouseInspect.title=p.name;mouseInspect.setAttribute('aria-label','Исследовать: '+p.name)};
 mouseInspect.addEventListener('click',()=>action('inspect'));
 const hidePoiTooltip=()=>{poiTooltip.hidden=true;mapCanvas.classList.remove('poi-hover')};
 mapCanvas.addEventListener('pointermove',e=>{
  if(mapDrag)return;
  const box=mapCanvas.getBoundingClientRect(),viewport=$('viewport').getBoundingClientRect();
  const x=world.camera.x+(e.clientX-box.left)*mapCanvas.width/box.width/world.zoom;
  const y=world.camera.y+(e.clientY-box.top)*mapCanvas.height/box.height/world.zoom;
  const poi=world.poiAt(x,y,game.s);
  if(!poi){hidePoiTooltip();return}
  mapCanvas.classList.add('poi-hover');poiTooltip.textContent=poi.name;poiTooltip.hidden=false;
  const left=e.clientX-viewport.left+14,top=e.clientY-viewport.top+14;
  poiTooltip.style.left=Math.min(left,viewport.width-poiTooltip.offsetWidth-8)+'px';
  poiTooltip.style.top=Math.min(top,viewport.height-poiTooltip.offsetHeight-8)+'px';
 });
 mapCanvas.addEventListener('pointerleave',hidePoiTooltip);
 mapCanvas.addEventListener('pointerdown',e=>{
  if(e.button!==0||!e.isPrimary)return;
  e.preventDefault();hidePoiTooltip();keys.clear();mapCanvas.focus({preventScroll:true});mapCanvas.setPointerCapture(e.pointerId);
  mapDrag={id:e.pointerId,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false};mapCanvas.classList.add('dragging');
 });
 mapCanvas.addEventListener('pointermove',e=>{
  if(!mapDrag||mapDrag.id!==e.pointerId)return;
  const box=mapCanvas.getBoundingClientRect();
  if(Math.hypot(e.clientX-mapDrag.startX,e.clientY-mapDrag.startY)>5)mapDrag.moved=true;
  world.pan((mapDrag.x-e.clientX)*mapCanvas.width/box.width/world.zoom,(mapDrag.y-e.clientY)*mapCanvas.height/box.height/world.zoom,game.s.map);
  mapDrag.x=e.clientX;mapDrag.y=e.clientY;
 });
 const endMapDrag=e=>{const drag=mapDrag;mapDrag=null;mapCanvas.classList.remove('dragging');if(e?.type==='pointerup'&&drag?.moved)suppressMapClick=true};
 for(const name of ['pointerup','pointercancel','lostpointercapture'])mapCanvas.addEventListener(name,endMapDrag);
 window.addEventListener('blur',endMapDrag);
 mapCanvas.addEventListener('click',e=>{if(suppressMapClick){suppressMapClick=false;return}setTravelTarget(e)});
 mapCanvas.addEventListener('dblclick',()=>{clearTravelTarget();world.followPlayer()});
 document.addEventListener('keydown',e=>{if(movement[e.code]&&!$('help-dialog').open){clearTravelTarget();world.followPlayer()}});
 document.addEventListener('keydown',e=>{if($('help-dialog').open)return;if(movement[e.code]){e.preventDefault();if(game.s.mode==='playing'){keys.add(e.code);audio.start()}}else if(!e.repeat&&e.code==='KeyE'){e.preventDefault();action('inspect')}else if(!e.repeat&&e.code==='Enter'){e.preventDefault();if(game.s.mode==='playing')action('inspect');else if(game.s.mode==='camp'||game.s.mode==='rest')document.querySelector('.camp-panel button:not(:disabled)')?.click();else $('event-actions').querySelector('button:not(:disabled)')?.click()}else if(!e.repeat&&e.code==='Escape'){e.preventDefault();if(game.s.event?.tag==='ПАУЗА')action('resume');else action('pause')}else if(!e.repeat&&(e.code==='Digit1'||e.code==='Digit2'))heal(Number(e.code.at(-1))-1)});
 function pauseForFocusLoss(){keys.clear();if(game.s.mode==='playing'){game.act('pause');sync();save()}}
 document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',pauseForFocusLoss);document.addEventListener('visibilitychange',()=>{if(document.hidden){pauseForFocusLoss();save()}});window.addEventListener('pagehide',()=>{pauseForFocusLoss();save()});
 const directions={up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight'},touchControls=document.querySelector('.touch-controls');
 for(const name of ['contextmenu','selectstart','dragstart'])touchControls.addEventListener(name,e=>e.preventDefault());
 document.querySelectorAll('[data-direction]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);if(game.s.mode==='playing'){clearTravelTarget();world.followPlayer();keys.add(directions[b.dataset.direction]);audio.start()}});['pointerup','pointercancel','lostpointercapture'].forEach(name=>b.addEventListener(name,()=>keys.delete(directions[b.dataset.direction]))) });
 function resize(){const box=$('world').getBoundingClientRect();$('world').height=Math.round(960*box.height/box.width);$('close-minimap').style.right=(box.width*132/960)+'px';$('close-minimap').style.top=(box.width*82/960)+'px'}window.addEventListener('resize',resize);resize();
 function frame(now){const elapsed=Math.max(0,(now-lastTime)/1000),dt=Math.min(elapsed,.1);lastTime=now;const unfocused=document.hidden||!document.hasFocus();if(unfocused&&game.s.mode==='playing')pauseForFocusLoss();let dx=0,dy=0;if(!unfocused){for(const key of keys){dx+=movement[key][0];dy+=movement[key][1]}if(controlMode==='mouse'&&autoTarget&&game.s.mode==='playing'){const vx=autoTarget.x-game.s.x,vy=autoTarget.y-game.s.y,d=Math.hypot(vx,vy);if(d<4)clearTravelTarget();else{dx=vx/d;dy=vy/d}}}if(game.s.mode==='rest'){let remaining=Math.min(elapsed,120);while(remaining>0){const step=Math.min(remaining,.1);game.update(step,0,0);remaining-=step}if(unfocused&&elapsed>0)save()}else if(!unfocused){game.update(dt,dx,dy);if(game.s.blockedByTerrain){const blocked=game.s.blockedByTerrain;if(autoTarget){clearTravelTarget();toast(blocked==='water'?'Вода преградила путь.':'Овраг преградил путь.')}game.s.blockedByTerrain=null;game.s.blockedByWater=false}audio.update(game.s,now/1000)}if(!unfocused){uiTimer+=dt;saveTimer+=dt;if(uiTimer>.1){uiTimer=0;sync()}if(saveTimer>2){saveTimer=0;save()}}world.draw(game.s,now/1000);updateMouseInspect();requestAnimationFrame(frame)}
 if(navigator.modelContext?.registerTool)try{navigator.modelContext.registerTool({name:'read_expedition',description:'Read-only snapshot of the current local game. Does not change progress.',inputSchema:{type:'object',properties:{}},execute:async()=>({content:[{type:'text',text:JSON.stringify({mode:game.s.mode,sector:game.s.sector,hp:game.s.hp,stamina:game.s.stamina,maxStamina:game.maxStamina(),preparation:game.preparation(),money:game.s.money,position:{x:game.s.x,y:game.s.y},distance:game.s.distance,weapon:BALANCE.weapons[game.s.weapon].name,armor:BALANCE.armor[game.s.armor].name,artifacts:game.s.artifacts,medkits:game.s.medkits,night:game.s.night,weather:game.s.weather,poiCount:game.s.map.pois.length,groupCount:game.s.map.groups.length,soundEnabled:audio.enabled,audioState:audio.ctx?.state||'not-started',event:game.s.event})}]})})}catch{}
 sync();save();world.draw(game.s,performance.now()/1000);let guideWasRead=false;try{guideWasRead=localStorage.getItem(GUIDE_READ)==='1'}catch{}if(!guideWasRead)$('help-dialog').showModal();requestAnimationFrame(frame);if(loadMessage)toast(loadMessage);
})();
