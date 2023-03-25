"use strict";(()=>{var X=()=>{let t=["actualBoundingBoxAscent","actualBoundingBoxDescent","actualBoundingBoxLeft","actualBoundingBoxRight","fontBoundingBoxAscent","fontBoundingBoxDescent","emHeightAscent","emHeightDescent","alphabeticBaseline","hangingBaseline","ideographicBaseline","width"],r=[],u=[];t.forEach(n=>n in TextMetrics.prototype?r.push(n):u.push(n)),console.log("Supported: %o. Not supported: %o",r.join(", "),u.join(", "))};var y=(n=>(n.START="start",n.CENTER="center",n.END="end",n))(y||{}),b=(f=>(f.ALPHABETIC="alphabetic",f.BOTTOM="bottom",f.HANGING="hanging",f.IDEOGRAPHIC="ideographic",f.MIDDLE="middle",f.TOP="top",f))(b||{});var H=(t,r)=>{let u=Object.values(r);return u.includes(t)?t:(console.warn("%o does not exist in enum %o. Using %o",t,r,u[0]),u[0])},B=(t="Unknown",r=Error)=>{throw new r(t)},A=(t,r,u,n)=>{switch(n){case"Normal":case"Italic":n=n.toLowerCase();break;default:console.warn("Unknown fs: %o. Using normal",u),n="normal"}switch(u){case"Regular":u="normal";break;case"Bold":u=u.toLowerCase();default:console.warn("Unknown fw: %o. Using normal",u),u="normal"}return`${n} ${u} ${t}px ${r}`};var s=t=>document.querySelector(t)??B(`dom el missing (selector: ${t})`),e={textInput:s(".text-input"),ffInput:s(".font-family-input"),fwInput:s(".font-weight-input"),fsInput:s(".font-style-input"),localFontsButton:s(".local-fonts-button"),fontSizeInput:s(".font-size-input"),fontSizeValue:s(".font-size-value"),lhInput:s(".line-height-input"),lhValue:s(".line-height-value"),alignInput:s(".align-input"),baselineInput:s(".baseline-input"),canvas:s(".canvas canvas"),canvasUi:s(".canvas-ui"),rrValue:s(".rr-value"),dprValue:s(".dpr-value"),rrInput:s(".rr-input"),canvasSizeValue:s(".canvas-size-value"),renderPixelValue:s(".render-pixel-value"),zoomValue:s(".zoom-value"),lineStyle:{blAlign:{color:s(".bl-align-color-input"),width:s(".bl-align-width-input"),display:s(".bl-align-display-input")},fontBb:{color:s(".font-color-input"),width:s(".font-width-input"),display:s(".font-display-input")},actualBb:{color:s(".actual-color-input"),width:s(".actual-width-input"),display:s(".actual-display-input")}}};var x=["serif","sans-serif","monospace"],L=["Regular","Bold"],v=["Normal","Italic"],T=[];var I=t=>{e.canvasSizeValue.innerHTML=t.props.rw.toFixed(1)+"x"+t.props.rh.toFixed(1),e.renderPixelValue.innerHTML=(t.props.rw*t.props.rr).toFixed(1)+"x"+(t.props.rh*t.props.rr).toFixed(1)},D=t=>{e.textInput.style.fontFamily=t.font.ff,e.textInput.style.fontStyle=t.font.fs,e.textInput.style.fontWeight=t.font.fw},U=t=>{let r=u=>u.map(n=>{let m=document.createElement("option");return m.value=n,m.innerHTML=n,m});e.ffInput.innerHTML="",e.ffInput.append(...r(x),...r(T)),e.ffInput.value=t.font.ff,e.fwInput.innerHTML="",e.fwInput.append(...r(L)),e.fwInput.value=t.font.fw,e.fsInput.innerHTML="",e.fsInput.append(...r(v)),e.fsInput.value=t.font.fs},C=t=>{e.textInput.value=t.text,D(t),U(t),e.fontSizeInput.value=String(t.font.size),e.fontSizeValue.innerHTML=String(t.font.size),e.lhInput.value=String(t.font.lh),e.lhValue.innerHTML=String(t.font.lh),e.alignInput.value=t.font.align,e.baselineInput.value=t.font.baseline,e.rrValue.innerHTML=String(t.props.rr),e.dprValue.innerHTML=String(window.devicePixelRatio),e.rrInput.value=String(t.props.rr),I(t),e.zoomValue.innerHTML=String(t.props.scaleMp),e.lineStyle.blAlign.color.value=t.props.style.blAlign.color,e.lineStyle.blAlign.width.value=String(t.props.style.blAlign.width),e.lineStyle.blAlign.display.checked=t.props.style.blAlign.display,e.lineStyle.fontBb.color.value=t.props.style.fontBb.color,e.lineStyle.fontBb.width.value=String(t.props.style.fontBb.width),e.lineStyle.fontBb.display.checked=t.props.style.fontBb.display,e.lineStyle.actualBb.color.value=t.props.style.actualBb.color,e.lineStyle.actualBb.width.value=String(t.props.style.actualBb.width),e.lineStyle.actualBb.display.checked=t.props.style.actualBb.display},O=(t,r)=>{let u=r.map(n=>n.fullName);T.splice(0,T.length,...u),U(t)};var M=t=>{e.textInput.addEventListener("input",()=>{t.text=e.textInput.value,t.draw()}),e.ffInput.addEventListener("change",()=>{t.font.ff=e.ffInput.value,D(t),t.draw()}),e.localFontsButton.addEventListener("click",async()=>{window.queryLocalFonts?window.queryLocalFonts().then(n=>{n.length===0?console.warn("Empty array, premission denied. Enable manually in browser"):O(t,n)}).catch(n=>{console.error("Local fonts query failed: %o",n)}):console.warn("Local fonts not supported")}),e.fontSizeInput.addEventListener("input",()=>{t.font.size=Number(e.fontSizeInput.value),e.fontSizeValue.innerHTML=e.fontSizeInput.value,t.draw()}),e.lhInput.addEventListener("input",()=>{t.font.lh=Number(e.lhInput.value),e.lhValue.innerHTML=e.lhInput.value,t.draw()}),e.alignInput.addEventListener("change",()=>{t.font.align=H(e.alignInput.value,y),t.draw()}),e.baselineInput.addEventListener("change",()=>{t.font.baseline=H(e.baselineInput.value,b),t.draw()}),e.rrInput.addEventListener("input",()=>{let n=e.rrInput.value;e.rrValue.innerHTML=n,t.props.rr=Number(n),t.init(),I(t),t.draw()}),window.addEventListener("resize",()=>{t.init(),I(t),t.draw()}),e.canvasUi.addEventListener("contextmenu",n=>{n.preventDefault()});let r=0;e.canvasUi.addEventListener("wheel",n=>{if(n.preventDefault(),n.ctrlKey){r+=-n.deltaY/100;let m=t.props.scaleMp,g=Math.pow(1.4,r);t.props.scaleMp=g,e.zoomValue.innerHTML=t.props.scaleMp.toFixed(2),m-=t.props.scaleMp;let f=t.props.rw*(n.offsetX/t.props.shared.cw),h=t.props.rh*(n.offsetY/t.props.shared.ch);t.init();let w=t.props.rw*(n.offsetX/t.props.shared.cw),d=t.props.rh*(n.offsetY/t.props.shared.ch);t.props.drawX+=w-f,t.props.drawY+=d-h}else{let m=n.deltaX/t.props.scaleMp,g=n.deltaY/t.props.scaleMp;t.props.drawX-=m,t.props.drawY-=g}t.draw()}),e.canvasUi.addEventListener("mousedown",n=>{n.preventDefault(),e.canvasUi.classList.add("grabbing");let m=n.clientX,g=n.clientY,f=t.props.drawX,h=t.props.drawY,w=l=>{l.preventDefault(),t.props.drawX=f+(l.clientX-m)/t.props.scaleMp,t.props.drawY=h+(l.clientY-g)/t.props.scaleMp,t.draw()},d=()=>{e.canvasUi.classList.remove("grabbing"),window.removeEventListener("mousemove",w),window.removeEventListener("mouseup",d)};window.addEventListener("mousemove",w),window.addEventListener("mouseup",d)}),["blAlign","fontBb","actualBb"].forEach(n=>{e.lineStyle[n].color.addEventListener("input",()=>{t.props.style[n].color=e.lineStyle[n].color.value,t.draw()}),e.lineStyle[n].width.addEventListener("input",()=>{t.props.style[n].width=Number(e.lineStyle[n].width.value),t.draw()}),e.lineStyle[n].display.addEventListener("input",()=>{t.props.style[n].display=e.lineStyle[n].display.checked,t.draw()})})};var G=30,j=10,a=e.canvas.getContext("2d")??B("ctx died"),o={text:"my honest reaction \u{1F605}\u{1F44C}\u{1F3FD}",font:{fs:v[0],fw:L[0],ff:x[0],size:60,lh:80,align:"start",baseline:"alphabetic"},props:{rw:0,rh:0,drawX:100,drawY:e.canvas.clientHeight-100,scaleMp:1,rr:window.devicePixelRatio,style:{blAlign:{color:"#c800c8",width:.5,display:!0},fontBb:{color:"#f00000",width:.5,display:!0},actualBb:{color:"#000000",width:.5,display:!0}},shared:{cw:0,ch:0}},draw:()=>{},init:()=>{}},$=()=>{let t=a.canvas.clientWidth,r=a.canvas.clientHeight;o.props.rw=t/o.props.scaleMp,o.props.rh=r/o.props.scaleMp,a.canvas.width=t*o.props.rr,a.canvas.height=r*o.props.rr,a.scale(o.props.rr*o.props.scaleMp,o.props.rr*o.props.scaleMp),o.props.shared.cw=t,o.props.shared.ch=r},F=null,q=()=>{typeof F=="number"&&cancelAnimationFrame(F),F=requestAnimationFrame(K)},K=()=>{let{rw:t,rh:r}=o.props,u=(d,l,c)=>{a.textAlign=o.font.align,a.textBaseline=o.font.baseline,a.font=A(o.font.size,o.font.ff,o.font.fw,o.font.fs),a.fillText(d,l,c)},n=(d,l,c)=>{let i=new Path2D;i.moveTo(0,c),i.lineTo(t,c),d===0&&(i.moveTo(l,0),i.lineTo(l,r)),a.strokeStyle=o.props.style.blAlign.color,a.lineWidth=o.props.style.blAlign.width,a.stroke(i)},m=(d,l,c,i)=>{let p=new Path2D;p.moveTo(0,i-l.fontBoundingBoxAscent),p.lineTo(t,i-l.fontBoundingBoxAscent),p.moveTo(0,i+l.fontBoundingBoxDescent),p.lineTo(t,i+l.fontBoundingBoxDescent),a.strokeStyle=o.props.style.fontBb.color,a.lineWidth=o.props.style.fontBb.width,a.stroke(p)},g=(d,l,c,i)=>{let p=new Path2D;p.moveTo(0,i-l.actualBoundingBoxAscent),p.lineTo(t,i-l.actualBoundingBoxAscent),p.moveTo(0,i+l.actualBoundingBoxDescent),p.lineTo(t,i+l.actualBoundingBoxDescent),d===0&&(p.moveTo(c-l.actualBoundingBoxLeft,0),p.lineTo(c-l.actualBoundingBoxLeft,r)),p.moveTo(c+l.actualBoundingBoxRight,0),p.lineTo(c+l.actualBoundingBoxRight,r),a.strokeStyle=o.props.style.actualBb.color,a.lineWidth=o.props.style.actualBb.width,a.stroke(p)},f=0,h=(d,l,c,i)=>{let p=new Path2D,z=G/o.props.scaleMp,k=j/o.props.scaleMp,S=(d===0?i-l.actualBoundingBoxAscent:f)-z,E=c+l.actualBoundingBoxRight+z;p.moveTo(c-l.actualBoundingBoxLeft,S),p.lineTo(c+l.actualBoundingBoxRight,S),p.moveTo(E,i-l.actualBoundingBoxAscent),p.lineTo(E,i+l.actualBoundingBoxDescent),a.globalAlpha=.5,a.strokeStyle=o.props.style.actualBb.color,a.lineWidth=o.props.style.actualBb.width,a.stroke(p),a.globalAlpha=1,a.textAlign="center",a.textBaseline="bottom",a.font=A(o.font.size/2,o.font.ff,o.font.fw,o.font.fs);let N=l.actualBoundingBoxLeft+l.actualBoundingBoxRight,W=c-l.actualBoundingBoxLeft+N/2,R=S-k;a.fillText(`${N.toFixed(1)}px`,W,R);let P=l.actualBoundingBoxAscent+l.actualBoundingBoxDescent,V=E+k,Y=i-l.actualBoundingBoxAscent+P/2;a.translate(V,Y),a.rotate(90/(180/Math.PI)),a.fillText(`${P.toFixed(1)}px`,0,0),a.rotate(-90/(180/Math.PI)),a.translate(-V,-Y),f=R-o.font.size/2};a.clearRect(0,0,t,r),o.text.split(`
`).forEach((d,l)=>{let c=o.props.drawX,i=o.props.drawY+o.font.lh*l;u(d,c,i),a.globalAlpha=.5;let p=a.measureText(d);o.props.style.blAlign.display&&n(l,c,i),o.props.style.fontBb.display&&m(l,p,c,i),o.props.style.actualBb.display&&g(l,p,c,i),a.globalAlpha=1,o.props.style.actualBb.display&&h(l,p,c,i)})};o.draw=q;o.init=$;M(o);$();q();C(o);X();})();
//# sourceMappingURL=bundle.js.map
