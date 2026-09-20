'use strict';
(()=>{
 const $=id=>document.getElementById(id),SAVE='tikhiy-kordon-expedition-v3',keys=new Set(),audio=new ZoneAudio(),world=new WorldRenderer($('world'));
 let game,loadMessage='',lastInventory='',lastEvent=null,lastCamp='',lastLog='',lastMode='',saveTimer=0,uiTimer=0,lastTime=performance.now(),toastTimer;
 try{const saved=localStorage.getItem(SAVE);game=saved?Zone.Expedition.restore(saved):new Zone.Expedition();if(saved&&game.s.mode==='playing')game.act('pause')}catch{game=new Zone.Expedition();loadMessage='Прежнее сохранение не удалось прочитать. Начата новая вылазка.'}
 const text=(id,value)=>{if($(id).textContent!==String(value))$(id).textContent=value};
 function compactNotes(value){
  if(!value)return value;
  for(const note of BALANCE.fieldNotes){
   if(!value.includes(note.body))continue;
   value=value.replace(` «${note.title}».\n\n`,'.\n').replace(note.body,note.body.replace(/\n\s*\n/g,'\n'));
  }
  return value;
 }
 function toast(message){text('notice',message);$('notice').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('notice').classList.remove('show'),3500)}
 function save(){try{localStorage.setItem(SAVE,game.serialize());text('save-status','Вылазка сохранена')}catch{text('save-status','Сохранение недоступно в этом браузере')}}
 function action(id,value){game.teleportView={width:world.canvas.width/world.zoom,height:world.canvas.height/world.zoom};audio.start();keys.clear();if(id==='newRun'){if(!game.s.event?.actions.some(a=>a.id==='newRun'))return;world.followPlayer();const oldSector=game.s.sector;game=new Zone.Expedition(Date.now(),game.s.run+1);if(game.s.sector===oldSector)game.s.sector=oldSector%100+1;lastInventory='';lastEvent=null;lastCamp='';}else game.act(id,value);sync();save();if(game.s.mode==='playing')$('world').focus({preventScroll:true})}
 function button(parent,label,id,value,primary=false){const b=document.createElement('button');b.textContent=label;if(primary)b.className='primary';b.addEventListener('click',()=>action(id,value));parent.append(b);return b}
 function heart(hp){const c=$('hearts').getContext('2d');c.clearRect(0,0,45,36);const rows=['0011100011100','0111110111110','1111111111111','1111111111111','1111111111111','0111111111110','0011111111100','0001111111000','0000111110000','0000011100000','0000001000000'];for(let y=0;y<rows.length;y++)for(let x=0;x<rows[y].length;x++)if(rows[y][x]==='1'){const segment=Math.min(4,Math.floor(x/13*5));c.fillStyle=segment<hp?'#c7896c':'#424b3d';c.fillRect(3+x*3,2+y*3,3,3)}for(let i=1;i<5;i++){const x=3+Math.round(i*13/5)*3;c.fillStyle='#192218';for(let y=0;y<rows.length;y++)if(rows[y][Math.round(i*13/5)]==='1')c.fillRect(x,2+y*3,1,3)}$('hearts').setAttribute('aria-label',`Здоровье ${hp} из 5 — одно сердце из пяти секций`)}
 function inventory(){const s=game.s,key=JSON.stringify([s.weapon,s.armor,s.artifacts,s.medkits,s.hp,s.key,s.secretMap,s.secretMapKind,s.mode==='finished']);if(key===lastInventory)return;lastInventory=key;heart(s.hp);
 for(const type of ['weapon','armor']){const item=(type==='weapon'?BALANCE.weapons:BALANCE.armor)[s[type]],hideBonus=type==='armor'&&item.bonus===0;text(type,item.name);text(type+'-bonus',hideBonus?'':'+'+item.bonus+'% подготовки');$(type+'-bonus').hidden=hideBonus;world.equipment($(type+'-icon'),type,s[type])}
 $('artifact-slots').replaceChildren();for(let i=0;i<6;i++){const a=s.artifacts[i],b=document.createElement('button');b.className='slot'+(a?(a.rare?' rare':''):' empty');b.title=a?`${a.name} · ${game.artifactLabel(a)}`:`Пустой слот ${i+1}`;b.setAttribute('aria-label',b.title);if(a){const c=document.createElement('canvas');c.width=c.height=32;b.append(c);drawArtifact(c,a)}else b.textContent=String(i+1);b.addEventListener('click',()=>toast(b.title));$('artifact-slots').append(b)}
 $('item-slots').replaceChildren();
 const items=[];if(s.key)items.push({kind:'keycard',label:'Ключ-карта — открывает секретную лабораторию'});if(s.secretMap)items.push({kind:s.secretMapKind||'scroll',label:(s.secretMapKind==='pda'?'КПК':'Свиток карты')+' — данные о секретном выходе из Зоны'});
 for(let i=0;i<6;i++){const item=items[i],b=document.createElement('button');b.className='slot'+(item?'':' empty');b.title=item?item.label:'Пустая ячейка рюкзака';b.setAttribute('aria-label',b.title);if(item){const c=document.createElement('canvas');c.width=c.height=32;drawQuestItem(c,item.kind);b.append(c);b.addEventListener('click',()=>toast(item.label))}else b.textContent='·';$('item-slots').append(b)}
 $('medkits').replaceChildren();for(let i=0;i<2;i++){const b=document.createElement('button');b.className='medkit'+(i<s.medkits?' filled':'');b.textContent=i<s.medkits?'':'·';if(i<s.medkits){const icon=document.createElement('span');icon.className='medical-case';icon.setAttribute('aria-hidden','true');b.append(icon)}b.title=i<s.medkits?'Аптечка: восстановить 1 секцию':'Пустой карман';b.setAttribute('aria-label',b.title);b.disabled=i>=s.medkits||s.hp>=5||s.hp===0||s.mode==='finished';b.addEventListener('click',()=>heal(i));$('medkits').append(b)}
 }
 function heal(index){audio.start();if(game.heal(index)){toast('Восстановлена одна секция сердца.');sync();save()}}
 function sync(){const s=game.s;if(s.mode!==lastMode){keys.clear();lastMode=s.mode}
 text('sector','ЗОНА ОТЧУЖДЕНИЯ / СЕКТОР '+String(s.sector).padStart(2,'0'));text('run','ВЫЛАЗКА '+String(s.run).padStart(2,'0'));
 const weather={wind:'ВЕТЕР · СЗ',rain:'ДОЖДЬ',fog:'ТУМАН +8%',clear:'ПРОЯСНЕНИЕ'}[s.weather];text('conditions',(s.mode==='finished'?(s.outcome==='victory'?'ЗОНА ПОЗАДИ':'СВЯЗЬ ПОТЕРЯНА'):'НА СВЯЗИ')+' · '+(s.night?'НОЧЬ −10%':'ДЕНЬ')+' · '+weather);
 $('sound').dataset.audioState=audio.ctx?.state||'not-started';$('sound').setAttribute('aria-pressed',String(audio.enabled));text('sound',audio.enabled?'🔊 Звук: ВКЛ':'🔇 Звук: ВЫКЛ');text('distance',Math.floor(s.distance)+' м');text('preparation',game.preparation()+'%');text('money',s.money.toLocaleString('ru-RU')+' ₽');
 $('stamina').max=game.maxStamina();$('stamina').value=s.stamina;text('stamina-text',Math.ceil(s.stamina)+' / '+game.maxStamina()+' с');inventory();
 $('make-camp').disabled=s.mode!=='playing';text('armor-anomaly',game.anomalyProtection()?'Аномальная защита +'+Number(game.anomalyProtection().toFixed(1))+'%':'');$('armor-anomaly').hidden=game.anomalyProtection()===0;const near=game.nearest();$('inspect').disabled=s.mode!=='playing'||!near;text('inspect',near?`E · ${near.name}${near.searched?' · Исследована':''}`:'E · Подойти к месту');
 $('camp-panel').hidden=!['camp','rest'].includes(s.mode);document.querySelector('.touch-controls').hidden=s.mode!=='playing';const ready=s.restTime>=BALANCE.movement.restLock,campKey=s.mode+ready+s.extendedRest;
 if(campKey!==lastCamp){lastCamp=campKey;$('camp-actions').replaceChildren();if(s.mode==='camp')button($('camp-actions'),'Подняться и отправиться в путь','begin',undefined,true);if(s.mode==='rest'&&ready){button($('camp-actions'),'Подняться и продолжить','restResume',undefined,true);if(!s.extendedRest)button($('camp-actions'),'Отдохнуть ещё','restStay')}}
 text('camp-label',s.mode==='camp'?'ПЕРЕД ДОРОГОЙ':'ПЕРЕДЫШКА У КОСТРА');text('camp-text',s.mode==='camp'?'Угли ещё тёплые. Дальше — только Зона.':ready?(s.restHealed?'Полный отдых завершён. Здоровье +'+s.restHealing+' секц. Можно идти.':'Ты отдышался. Для лечения дождись полного восстановления сил.'):`Силы возвращаются. Отдохни ещё ${Math.ceil(BALANCE.movement.restLock-s.restTime)} с.`);
 const event=s.event,visible=['dialog','finished'].includes(s.mode)&&!!event;$('event').hidden=!visible;
 if(visible&&lastEvent!==event){lastEvent=event;$('event').classList.toggle('border-panel',event.tag==='ГРАНИЦА'||s.mode==='finished');text('event-tag',event.tag||'ПОЛЕВОЙ ЖУРНАЛ');text('event-title',event.title==='Ты прошёл встречу'?'Находки':event.title);text('event-body',event.body==='Ты проверяешь вещи и запоминаешь место.'?'':event.body||'');text('event-details',compactNotes(event.details)||'');$('event-actions').replaceChildren();event.actions.forEach((a,i)=>button($('event-actions'),a.label,a.id,a.value,i===0));$('event-actions').querySelector('button')?.focus({preventScroll:true});$('event').scrollTop=0}else if(!visible)lastEvent=null;
 const logKey=JSON.stringify(s.log);if(logKey!==lastLog){lastLog=logKey;text('last-log',compactNotes(s.log[0]?.text)||'');$('log').replaceChildren();for(const entry of s.log){const li=document.createElement('li');li.textContent=String(Math.floor(entry.time/60)).padStart(2,'0')+':'+String(Math.floor(entry.time%60)).padStart(2,'0')+' · '+compactNotes(entry.text);$('log').append(li)}}
 }
 $('compass').innerHTML='<svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="15" fill="none" stroke="#8c9e80"/><path d="M20 4 26 25 20 21 14 25Z" fill="#d9b981"/><path d="M20 36 14 15 20 19 26 15Z" fill="#729887"/><circle cx="20" cy="20" r="2" fill="#e9dec0"/></svg>';
 $('compass').addEventListener('click',()=>{world.showMinimap=true;$('compass').setAttribute('aria-expanded','true');$('compass').hidden=true;$('close-minimap').hidden=false;$('close-minimap').focus({preventScroll:true})});
 $('close-minimap').addEventListener('click',()=>{world.showMinimap=false;$('compass').setAttribute('aria-expanded','false');$('compass').hidden=false;$('close-minimap').hidden=true;$('compass').focus({preventScroll:true})});
 $('make-camp').addEventListener('click',()=>action('makeCamp'));
 $('sound').addEventListener('click',()=>{audio.toggle();sync();if(audio.unavailable)toast('Звук недоступен в этом браузере.')});$('inspect').addEventListener('click',()=>action('inspect'));
 let helpWasPlaying=false;$('help').addEventListener('click',()=>{helpWasPlaying=game.s.mode==='playing';if(helpWasPlaying)action('pause');keys.clear();$('help-dialog').showModal()});$('help-dialog').addEventListener('close',()=>{if(helpWasPlaying&&game.s.event?.tag==='ПАУЗА')action('resume');helpWasPlaying=false});
 const movement={ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1],ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0]};
 let mapDrag=null;
 const mapCanvas=$('world');
 mapCanvas.addEventListener('pointerdown',e=>{
  if(e.button!==0||!e.isPrimary)return;
  e.preventDefault();keys.clear();mapCanvas.focus({preventScroll:true});mapCanvas.setPointerCapture(e.pointerId);
  mapDrag={id:e.pointerId,x:e.clientX,y:e.clientY};mapCanvas.classList.add('dragging');
 });
 mapCanvas.addEventListener('pointermove',e=>{
  if(!mapDrag||mapDrag.id!==e.pointerId)return;
  const box=mapCanvas.getBoundingClientRect();
  world.pan((mapDrag.x-e.clientX)*mapCanvas.width/box.width/world.zoom,(mapDrag.y-e.clientY)*mapCanvas.height/box.height/world.zoom,game.s.map);
  mapDrag.x=e.clientX;mapDrag.y=e.clientY;
 });
 const endMapDrag=()=>{mapDrag=null;mapCanvas.classList.remove('dragging')};
 for(const name of ['pointerup','pointercancel','lostpointercapture'])mapCanvas.addEventListener(name,endMapDrag);
 window.addEventListener('blur',endMapDrag);
 mapCanvas.addEventListener('dblclick',()=>world.followPlayer());
 document.addEventListener('keydown',e=>{if(movement[e.code]&&!$('help-dialog').open)world.followPlayer()});
 document.addEventListener('keydown',e=>{if($('help-dialog').open)return;if(movement[e.code]){e.preventDefault();if(game.s.mode==='playing'){keys.add(e.code);audio.start()}}else if(!e.repeat&&e.code==='KeyE'){e.preventDefault();action('inspect')}else if(!e.repeat&&e.code==='Escape'){e.preventDefault();if(game.s.event?.tag==='ПАУЗА')action('resume');else action('pause')}else if(!e.repeat&&(e.code==='Digit1'||e.code==='Digit2'))heal(Number(e.code.at(-1))-1)});
 document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();if(['playing','rest'].includes(game.s.mode))action('pause')});document.addEventListener('visibilitychange',()=>{if(document.hidden){keys.clear();if(['playing','rest'].includes(game.s.mode))action('pause');save()}});window.addEventListener('pagehide',save);
 const directions={up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight'};document.querySelectorAll('[data-direction]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);if(game.s.mode==='playing'){world.followPlayer();keys.add(directions[b.dataset.direction]);audio.start()}});['pointerup','pointercancel','lostpointercapture'].forEach(name=>b.addEventListener(name,()=>keys.delete(directions[b.dataset.direction])))});
 function resize(){const box=$('world').getBoundingClientRect();$('world').height=Math.round(960*box.height/box.width);$('close-minimap').style.right=(box.width*132/960)+'px';$('close-minimap').style.top=(box.width*82/960)+'px'}window.addEventListener('resize',resize);resize();
 function frame(now){const dt=Math.min((now-lastTime)/1000,.1);lastTime=now;let dx=0,dy=0;for(const key of keys){dx+=movement[key][0];dy+=movement[key][1]}game.update(dt,dx,dy);audio.update(game.s,now/1000);world.draw(game.s,now/1000);uiTimer+=dt;saveTimer+=dt;if(uiTimer>.1){uiTimer=0;sync()}if(saveTimer>2){saveTimer=0;save()}requestAnimationFrame(frame)}
 if(navigator.modelContext?.registerTool)try{navigator.modelContext.registerTool({name:'read_expedition',description:'Read-only snapshot of the current local game. Does not change progress.',inputSchema:{type:'object',properties:{}},execute:async()=>({content:[{type:'text',text:JSON.stringify({mode:game.s.mode,sector:game.s.sector,hp:game.s.hp,stamina:game.s.stamina,maxStamina:game.maxStamina(),preparation:game.preparation(),money:game.s.money,position:{x:game.s.x,y:game.s.y},distance:game.s.distance,weapon:BALANCE.weapons[game.s.weapon].name,armor:BALANCE.armor[game.s.armor].name,artifacts:game.s.artifacts,medkits:game.s.medkits,night:game.s.night,weather:game.s.weather,poiCount:game.s.map.pois.length,groupCount:game.s.map.groups.length,soundEnabled:audio.enabled,audioState:audio.ctx?.state||'not-started',event:game.s.event})}]})})}catch{}
 sync();save();world.draw(game.s,performance.now()/1000);requestAnimationFrame(frame);if(loadMessage)toast(loadMessage);
})();
