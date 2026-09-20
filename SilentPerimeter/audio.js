'use strict';
class ZoneAudio {
 constructor(){try{this.enabled=localStorage.getItem('kordon-sound')!=='off'}catch{this.enabled=true}this.nextMusic=0;this.nextNearby=0;this.nextRustle=0;this.lastCue=null}
 async start(){try{if(!this.ctx){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;this.ctx=new Audio();const c=this.ctx;this.master=c.createGain();this.master.gain.value=this.enabled?.6:0;this.master.connect(c.destination);
 const buffer=c.createBuffer(1,c.sampleRate*3,c.sampleRate),data=buffer.getChannelData(0);let brown=0;for(let i=0;i<data.length;i++){brown=(brown+(Math.random()*2-1)*.03)/1.02;data[i]=brown*3}this.noiseBuffer=buffer;
 this.wind=c.createBufferSource();this.wind.buffer=buffer;this.wind.loop=true;this.filter=c.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=700;this.weatherGain=c.createGain();this.weatherGain.gain.value=.035;this.wind.connect(this.filter).connect(this.weatherGain).connect(this.master);this.wind.start();
 }if(this.ctx.state==='suspended')await this.ctx.resume()}catch{this.unavailable=true}}
 toggle(){this.enabled=!this.enabled;try{localStorage.setItem('kordon-sound',this.enabled?'on':'off')}catch{}if(this.master)this.master.gain.setTargetAtTime(this.enabled?.6:0,this.ctx.currentTime,.03);this.start();return this.enabled}
 tone(freq,end,duration,volume=.05,type='sine',delay=0){if(!this.ctx||!this.enabled)return;const c=this.ctx,t=c.currentTime+delay,o=c.createOscillator(),gain=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(15,end),t+duration);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),t+Math.min(.12,duration/4));gain.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(gain).connect(this.master);o.start(t);o.stop(t+duration+.05);o.onended=()=>{o.disconnect();gain.disconnect()}}
 noise(duration,frequency,volume=.04,delay=0){if(!this.ctx||!this.enabled)return;const c=this.ctx,t=c.currentTime+delay,n=c.createBufferSource(),f=c.createBiquadFilter(),gain=c.createGain();n.buffer=this.noiseBuffer;n.loop=true;f.type='bandpass';f.frequency.value=frequency;f.Q.value=.8;gain.gain.setValueAtTime(.0001,t);gain.gain.linearRampToValueAtTime(volume,t+.03);gain.gain.exponentialRampToValueAtTime(.0001,t+duration);n.connect(f).connect(gain).connect(this.master);n.start(t);n.stop(t+duration+.05);n.onended=()=>{n.disconnect();f.disconnect();gain.disconnect()}}
 cue(type,volume=1){if(!this.enabled)return;const v=Math.max(0,volume);
 if(type==='dogs'||type==='indoorDog'){for(let i=0;i<3;i++){this.tone(230,95,.17,.065*v,'sawtooth',i*.28);this.noise(.14,900,.13*v,i*.28)}}
 else if(type==='boars'){this.tone(74,42,.65,.12*v,'sawtooth');this.noise(.65,160,.18*v);this.noise(.15,1300,.1*v,.7)}
 else if(type==='fireflies'){this.tone(620,930,.8,.025*v);this.tone(940,720,1,.02*v,'sine',.2)}
 else if(type==='bloodsucker'){this.noise(1.7,430,.22*v);this.tone(92,38,1.6,.13*v,'triangle')}
 else if(type==='chimera'){this.tone(55,24,2,.16*v,'sawtooth');this.tone(83,31,1.7,.1*v,'triangle',.15);this.noise(1.5,230,.24*v)}
 else if(type==='acid'){for(let i=0;i<4;i++)this.tone(160+i*80,50,.14,.05*v,'sine',i*.17)}
 else if(type==='electric'){for(let i=0;i<4;i++){this.noise(.07,2300,.18*v,i*.16);this.tone(850,90,.07,.024*v,'square',i*.16)}}
 else if(type==='fire'){this.noise(1.4,750,.19*v);this.noise(.09,2400,.13*v,.3)}
 else if(type==='gravity'){this.tone(57,42,2,.1*v);this.tone(59,44,2,.09*v)}
 else if(type==='zombies'){this.tone(115,66,1.5,.06*v,'triangle');this.noise(.7,310,.1*v)}
 else{this.noise(.3,560,.12*v);this.tone(130,52,.5,.055*v)}
 }
 update(s,time){if(!this.ctx)return;const c=this.ctx;
 const weather={clear:[.025,420],wind:[.07,950],rain:[.15,2300],fog:[.025,280]}[s.weather];this.weatherGain.gain.setTargetAtTime(weather[0]*(.8+Math.sin(time*.4)*.2),c.currentTime,1);this.filter.frequency.setTargetAtTime(weather[1],c.currentTime,1);
 if(!this.enabled)return;
 if(s.soundCue){this.cue(s.soundCue);s.soundCue=null}
 if(time>this.nextMusic){this.nextMusic=time+18+Math.random()*16;const root=s.night?49:55;[1,1.498,2.119].forEach((ratio,i)=>this.tone(root*ratio,root*ratio*.997,12+i*2,.018/(i+1),'sine',i*1.4));this.tone(root*4,root*3.99,6,.005,'triangle',5)}
 if(time>this.nextRustle){this.nextRustle=time+3+Math.random()*5;this.noise(s.weather==='rain'?.8:.35,s.weather==='rain'?1900:1250,s.weather==='clear'?.025:.08)}
 if(time>this.nextNearby&&['playing','camp','rest'].includes(s.mode)){this.nextNearby=time+2.7+Math.random()*2;let target=null,nearest=280;for(const p of [...(s.night?s.map.fireflies||[]:s.map.groups).filter(g=>!g.defeated),...s.map.pois.filter(p=>p.type==='anomaly'&&!p.searched)]){const d=Math.hypot(p.x-s.x,p.y-s.y);if(d<nearest){nearest=d;target=p}}if(target)this.cue(target.element||target.type,(1-nearest/280)*.65)}
 }
}
