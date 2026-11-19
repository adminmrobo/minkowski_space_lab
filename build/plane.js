/* plane.js — 2D 좌표평면 도우미 (유클리드 편 공용)
   P2(cv,{xr,yr,axes,ticks,draw(g,P),handles:[{get,set,snap,col}],stamp,aria,h}) — 가로·세로 같은 비율, 점 끌기 지원 */
var P2=(function(){
'use strict';
function P2(cv,o){var S=this;S.cv=cv;S.o=o;S.dirty=true;S.hot=-1;
  var drag=-1;
  function loc(e){var r=cv.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];}
  function find(px,py){var hs=S.o.handles||[],best=-1,bd=24*24;hs.forEach(function(h,i){var p=h.get(),q=[S.X(p[0]),S.Y(p[1])],d=(q[0]-px)*(q[0]-px)+(q[1]-py)*(q[1]-py);if(d<bd){bd=d;best=i;}});return best;}
  cv.addEventListener('pointerdown',function(e){var l=loc(e),i=find(l[0],l[1]);if(i<0)return;drag=i;cv.setPointerCapture(e.pointerId);e.preventDefault();});
  cv.addEventListener('pointermove',function(e){var l=loc(e);if(drag<0){var i=find(l[0],l[1]);if(i!==S.hot){S.hot=i;cv.style.cursor=i>=0?'grab':'default';S.dirty=true;}return;}
    var h=S.o.handles[drag],x=S.ix(l[0]),y=S.iy(l[1]),sn=h.snap==null?0.5:h.snap;if(sn){x=Math.round(x/sn)*sn;y=Math.round(y/sn)*sn;}
    x=Math.max(S.o.xr[0],Math.min(S.o.xr[1],x));y=Math.max(S.o.yr[0],Math.min(S.o.yr[1],y));h.set(x,y);S.dirty=true;if(S.o.onChange)S.o.onChange();});
  function up(){drag=-1;}cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  if((S.o.handles||[]).length){cv.style.touchAction='none';cv.tabIndex=0;
    S.kh=0;cv.addEventListener('keydown',function(e){var hs=S.o.handles;if(e.key===' '||e.key==='Enter'){e.preventDefault();S.kh=(S.kh+1)%hs.length;S.hot=S.kh;S.dirty=true;return;}var h=hs[S.kh];if(!h)return;var p=h.get(),sn=h.snap||0.5,dx=0,dy=0;
      if(e.key==='ArrowLeft')dx=-sn;else if(e.key==='ArrowRight')dx=sn;else if(e.key==='ArrowUp')dy=sn;else if(e.key==='ArrowDown')dy=-sn;else return;e.preventDefault();
      h.set(Math.max(S.o.xr[0],Math.min(S.o.xr[1],p[0]+dx)),Math.max(S.o.yr[0],Math.min(S.o.yr[1],p[1]+dy)));S.dirty=true;if(S.o.onChange)S.o.onChange();});}
  cv.setAttribute('role','img');if(o.aria)cv.setAttribute('aria-label',o.aria+((o.handles||[]).length>1?' — 화살표 키로 점을 움직이고 스페이스로 점을 바꿉니다':''));
  U.reg(cv,function(dt){if(S.dirty||dt===0){S.draw();S.dirty=false;}});}
P2.prototype.draw=function(){var S=this,R=U.setup(S.cv),g=R.g,w=R.w,h=R.h,o=S.o,m=o.margin||30;S.g=g;S.w=w;S.h=h;
  var sx=(w-2*m)/(o.xr[1]-o.xr[0]),sy=(h-2*m)/(o.yr[1]-o.yr[0]),sc=o.free?null:Math.min(sx,sy);
  S.kx=sc||sx;S.ky=sc||sy;S.ox=(w-(o.xr[1]-o.xr[0])*S.kx)/2;S.oy=(h-(o.yr[1]-o.yr[0])*S.ky)/2;
  /* 격자 */
  var t=o.tick||1;g.lineWidth=1;g.strokeStyle='rgba(22,33,43,.07)';g.beginPath();
  for(var x=Math.ceil(o.xr[0]/t)*t;x<=o.xr[1]+1e-9;x+=t){g.moveTo(S.X(x)+.5,S.Y(o.yr[0]));g.lineTo(S.X(x)+.5,S.Y(o.yr[1]));}
  for(var y=Math.ceil(o.yr[0]/t)*t;y<=o.yr[1]+1e-9;y+=t){g.moveTo(S.X(o.xr[0]),S.Y(y)+.5);g.lineTo(S.X(o.xr[1]),S.Y(y)+.5);}g.stroke();
  /* 축 */
  if(o.axes!==false){var ax=o.axes||['x₁','x₂'],x0=Math.max(o.xr[0],Math.min(o.xr[1],0)),y0=Math.max(o.yr[0],Math.min(o.yr[1],0));
    U.arrow2(g,S.X(o.xr[0]),S.Y(y0),S.X(o.xr[1])+8,S.Y(y0),U.cssv('--eye'),1.5);U.arrow2(g,S.X(x0),S.Y(o.yr[0]),S.X(x0),S.Y(o.yr[1])-8,U.cssv('--terrain'),1.5);
    g.font='11px '+U.cssv('--font');g.fillStyle=U.cssv('--muted');g.textAlign='center';
    if(o.ticks!==false){var lt=o.labelTick||t;for(x=Math.ceil(o.xr[0]/lt)*lt;x<=o.xr[1]+1e-9;x+=lt){if(Math.abs(x)<1e-9)continue;g.fillText(S.fmtT(x),S.X(x),S.Y(y0)+14);}
      g.textAlign='right';for(y=Math.ceil(o.yr[0]/lt)*lt;y<=o.yr[1]+1e-9;y+=lt){if(Math.abs(y)<1e-9)continue;g.fillText(S.fmtT(y),S.X(x0)-5,S.Y(y)+4);}}
    U.label(g,S.X(o.xr[1])-4,S.Y(y0)-12,ax[0],U.cssv('--eye'),'right');U.label(g,S.X(x0)+8,S.Y(o.yr[1])+4,ax[1],U.cssv('--terrain'));}
  if(o.draw)o.draw(g,S);
  /* 끌 수 있는 점 표시 */
  (o.handles||[]).forEach(function(hd,i){var p=hd.get();g.beginPath();g.arc(S.X(p[0]),S.Y(p[1]),i===S.hot?11:9,0,7);g.strokeStyle=hd.col||U.cssv('--amber');g.lineWidth=2;g.setLineDash([3,2]);g.stroke();g.setLineDash([]);});
  if(o.stamp)U.stamp(g,w,o.stamp);};
P2.prototype.fmtT=function(v){return Math.abs(v-Math.round(v))<1e-9?String(Math.round(v)):v.toFixed(1);};
P2.prototype.X=function(x){return this.ox+(x-this.o.xr[0])*this.kx;};
P2.prototype.Y=function(y){return this.h-this.oy-(y-this.o.yr[0])*this.ky;};
P2.prototype.ix=function(px){return this.o.xr[0]+(px-this.ox)/this.kx;};
P2.prototype.iy=function(py){return this.o.yr[0]+(this.h-this.oy-py)/this.ky;};
P2.prototype.pt=function(p,col,lab,r,dy){var g=this.g;g.beginPath();g.arc(this.X(p[0]),this.Y(p[1]),r||6,0,7);g.fillStyle=col;g.fill();g.lineWidth=1.8;g.strokeStyle='#fff';g.stroke();if(lab)U.label(g,this.X(p[0])+9,this.Y(p[1])+(dy==null?-13:dy),lab,col);};
P2.prototype.arrow=function(a,b,col,wd){U.arrow2(this.g,this.X(a[0]),this.Y(a[1]),this.X(b[0]),this.Y(b[1]),col,wd||2.4);};
P2.prototype.line=function(a,b,col,wd,dash){var g=this.g;g.strokeStyle=col;g.lineWidth=wd||1.6;g.setLineDash(dash||[]);g.beginPath();g.moveTo(this.X(a[0]),this.Y(a[1]));g.lineTo(this.X(b[0]),this.Y(b[1]));g.stroke();g.setLineDash([]);};
P2.prototype.poly=function(pts,fill,stroke,wd){var g=this.g,S=this;g.beginPath();pts.forEach(function(p,i){i?g.lineTo(S.X(p[0]),S.Y(p[1])):g.moveTo(S.X(p[0]),S.Y(p[1]));});g.closePath();if(fill){g.fillStyle=fill;g.fill();}if(stroke){g.strokeStyle=stroke;g.lineWidth=wd||1.6;g.stroke();}};
P2.prototype.text=function(p,t,col,align,dx,dy){U.label(this.g,this.X(p[0])+(dx||0),this.Y(p[1])+(dy||0),t,col||U.cssv('--text'),align);};
P2.prototype.arcAng=function(c,r,a0,a1,col){var g=this.g;g.strokeStyle=col;g.lineWidth=2;g.beginPath();g.arc(this.X(c[0]),this.Y(c[1]),r,-a0,-a1,a1>a0);g.stroke();};
return P2;})();
