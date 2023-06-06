"use strict";(()=>{var $=()=>{let e=["actualBoundingBoxAscent","actualBoundingBoxDescent","actualBoundingBoxLeft","actualBoundingBoxRight","fontBoundingBoxAscent","fontBoundingBoxDescent","emHeightAscent","emHeightDescent","alphabeticBaseline","hangingBaseline","ideographicBaseline","width"],l=[],i=[];e.forEach(n=>n in TextMetrics.prototype?l.push(n):i.push(n)),console.log("Supported: %o. Not supported: %o",l.join(", "),i.join(", "))};var E=(n=>(n.START="start",n.CENTER="center",n.END="end",n))(E||{}),S=(h=>(h.ALPHABETIC="alphabetic",h.BOTTOM="bottom",h.HANGING="hanging",h.IDEOGRAPHIC="ideographic",h.MIDDLE="middle",h.TOP="top",h))(S||{}),m=(g=>(g.w100="100",g.w200="200",g.w300="300",g.w400="400",g.w500="500",g.w600="600",g.w700="700",g.w800="800",g.w900="900",g))(m||{});var F=(e,l)=>{let i=Object.values(l);return i.includes(e)?e:(console.warn("%o does not exist in enum %o. Using %o",e,l,i[0]),i[0])},I=(e="Unknown",l=Error)=>{throw new l(e)},W=(e,l)=>`${e.font.useItalic?"italic":"normal"} ${e.font.useWeight?e.font.fw:""} ${l??e.font.size}px ${e.font.useFs?e.font.fs:e.font.ff}`,H=e=>{let l=e.reduce((n,{family:a,fullName:f,style:h,postscriptName:b})=>((n[a]||(n[a]=[])).push({fullName:f,style:h,postscriptName:b}),n),{});return(n=>{Object.entries(n).forEach(([a,f])=>{f?f.length===0&&console.warn("%o font record has no variants",a):console.warn("%o font record missing value",a)})})(l),l};var s=e=>document.querySelector(e)??I(`dom el missing (selector: ${e})`),t={mainCss:s(".main-css"),textInput:s(".text-input"),ffInput:s(".ff-input"),useFsInput:s(".use-fs-input"),fsInput:s(".fs-input"),useItalicInput:s(".use-italic-input"),useWeightInput:s(".use-weight-input"),fwInput:s(".fw-input"),localFontsButton:s(".local-fonts-button"),fontSizeInput:s(".font-size-input"),fontSizeValue:s(".font-size-value"),lhInput:s(".line-height-input"),lhValue:s(".line-height-value"),alignInput:s(".align-input"),baselineInput:s(".baseline-input"),canvas:s(".canvas canvas"),canvasUi:s(".canvas-ui"),rrValue:s(".rr-value"),dprValue:s(".dpr-value"),rrInput:s(".rr-input"),canvasSizeValue:s(".canvas-size-value"),renderPixelValue:s(".render-pixel-value"),zoomValue:s(".zoom-value"),lineStyle:{blAlign:{color:s(".bl-align-color-input"),width:s(".bl-align-width-input"),display:s(".bl-align-display-input")},fontBb:{color:s(".font-color-input"),width:s(".font-width-input"),display:s(".font-display-input")},actualBb:{color:s(".actual-color-input"),width:s(".actual-width-input"),display:s(".actual-display-input")},alphabeticBl:{display:s(".alphabetic-bl-display-input")},hangingBl:{display:s(".hanging-bl-display-input")},ideographicBl:{display:s(".ideographic-bl-display-input")}},disableDarkTheme:s(".disable-dark-theme-input")};var A=[{postscriptName:"serif",fullName:"Browser serif",family:"serif",style:"(browser)"},{postscriptName:"sans-serif",fullName:"Browser sans-serif",family:"sans-serif",style:"(browser)"},{postscriptName:"monospace",fullName:"Browser monospace",family:"monospace",style:"(browser)"}],U=30,q=10,j=[{dProp:"alphabeticBl",mProp:"alphabeticBaseline"},{dProp:"ideographicBl",mProp:"ideographicBaseline"},{dProp:"hangingBl",mProp:"hangingBaseline"}];var v=e=>{let l=e.props.shared.ctx,i=l.canvas.clientWidth,n=l.canvas.clientHeight;e.props.rw=i/e.props.scaleMp,e.props.rh=n/e.props.scaleMp,l.canvas.width=i*e.props.rr,l.canvas.height=n*e.props.rr,l.scale(e.props.rr*e.props.scaleMp,e.props.rr*e.props.scaleMp),e.props.shared.cw=i,e.props.shared.ch=n},le=e=>{let{rw:l,rh:i,shared:{ctx:n}}=e.props,a=(p,o,u)=>{n.save(),n.textAlign=e.font.align,n.textBaseline=e.font.baseline,n.font=W(e),n.fillStyle=e.props.shared.colors.text||"",n.fillText(p,o,u);let r=n.measureText(p);return n.restore(),r},f=(p,o,u)=>{let r=new Path2D;r.moveTo(0,u),r.lineTo(l,u),p===0&&(r.moveTo(o,0),r.lineTo(o,i)),n.save(),n.strokeStyle=e.props.style.blAlign.color,n.lineWidth=e.props.style.blAlign.width,n.stroke(r),n.restore()},h=(p,o,u,r)=>{let c=new Path2D;c.moveTo(0,r-o.fontBoundingBoxAscent),c.lineTo(l,r-o.fontBoundingBoxAscent),c.moveTo(0,r+o.fontBoundingBoxDescent),c.lineTo(l,r+o.fontBoundingBoxDescent),n.save(),n.strokeStyle=e.props.style.fontBb.color,n.lineWidth=e.props.style.fontBb.width,n.stroke(c),n.restore()},b=(p,o,u,r)=>{let c=new Path2D;c.moveTo(0,r-o.actualBoundingBoxAscent),c.lineTo(l,r-o.actualBoundingBoxAscent),c.moveTo(0,r+o.actualBoundingBoxDescent),c.lineTo(l,r+o.actualBoundingBoxDescent),p===0&&(c.moveTo(u-o.actualBoundingBoxLeft,0),c.lineTo(u-o.actualBoundingBoxLeft,i)),c.moveTo(u+o.actualBoundingBoxRight,0),c.lineTo(u+o.actualBoundingBoxRight,i),n.save(),n.strokeStyle=e.props.style.actualBb.color,n.lineWidth=e.props.style.actualBb.width,n.stroke(c),n.restore()},y=0,g=(p,o,u,r)=>{let c=new Path2D,T=U/e.props.scaleMp,B=q/e.props.scaleMp,N=(p===0?r-o.actualBoundingBoxAscent:y)-T,V=u+o.actualBoundingBoxRight+T;c.moveTo(u-o.actualBoundingBoxLeft,N),c.lineTo(u+o.actualBoundingBoxRight,N),c.moveTo(V,r-o.actualBoundingBoxAscent),c.lineTo(V,r+o.actualBoundingBoxDescent),n.save(),n.strokeStyle=e.props.style.actualBb.color,n.lineWidth=e.props.style.actualBb.width,n.save(),n.globalAlpha=.5,n.stroke(c),n.restore(),n.textAlign="center",n.textBaseline="bottom",n.font=W(e,e.font.size/2);let R=o.actualBoundingBoxLeft+o.actualBoundingBoxRight,te=u-o.actualBoundingBoxLeft+R/2,X=N-B;n.save(),n.fillStyle=e.props.shared.colors.text||"",n.fillText(`${R.toFixed(1)}px`,te,X);let O=o.actualBoundingBoxAscent+o.actualBoundingBoxDescent,ne=V+B,oe=r-o.actualBoundingBoxAscent+O/2;n.save(),n.translate(ne,oe),n.rotate(90/(180/Math.PI)),n.fillText(`${O.toFixed(1)}px`,0,0),n.restore(),n.textAlign="end",n.fillText(`(${o.width.toFixed(1)}px/${o.fontBoundingBoxAscent+o.fontBoundingBoxDescent}px)`,u-B,r),n.restore(),n.restore(),y=X-e.font.size/2},M=(p,o,u,r)=>{j.forEach(({dProp:c,mProp:T})=>{if(!e.props.style[c].display)return;let B=new Path2D;B.moveTo(0,r-(o[T]||0)),B.lineTo(l,r-(o[T]||0)),n.save(),n.strokeStyle=e.props.style.blAlign.color,n.lineWidth=e.props.style.blAlign.width,n.stroke(B),n.restore()})};n.clearRect(0,0,l,i),e.text.split(`
`).forEach((p,o)=>{let u=e.props.drawX,r=e.props.drawY+e.font.lh*o,c=a(p,u,r);n.save(),n.globalAlpha=.5,e.props.style.blAlign.display&&f(o,u,r),e.props.style.fontBb.display&&h(o,c,u,r),e.props.style.actualBb.display&&b(o,c,u,r),M(o,c,u,r),n.restore(),e.props.style.actualBb.display&&g(o,c,u,r)})},C=null,d=(...e)=>{typeof C=="number"&&cancelAnimationFrame(C),C=requestAnimationFrame(le.bind(null,...e))};var G=e=>{e.props.drawX=100,e.props.drawY=t.canvas.clientHeight-100},D=e=>{let l=i=>{let n=getComputedStyle(document.documentElement).getPropertyValue(i);return n===""&&console.warn(`CSS var "${i}" not set`),n};e.props.shared.colors={text:l("--c-text"),bg:l("--c-bg")}};var K=({ui:e,onDown:l,onMove:i,onUp:n,onWheel:a})=>{let f=!1,h,b,y=()=>{L(),n()},g=p=>{if(p.buttons===0){y();return}p.preventDefault();let o=p.clientX-h,u=p.clientY-b;i(o,u),h=p.clientX,b=p.clientY},M=()=>{if(f){console.warn("Events are already added");return}window.addEventListener("mousemove",g),window.addEventListener("mouseup",y),f=!0},L=()=>{window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",y),f=!1};e.addEventListener("mousedown",p=>{p.preventDefault(),h=p.clientX,b=p.clientY,M(),l()}),e.addEventListener("contextmenu",p=>{p.preventDefault()}),e.addEventListener("wheel",p=>{p.preventDefault(),a(p.deltaX,p.deltaY,p)})};var J=e=>e.map(l=>{let i=document.createElement("option");return typeof l=="string"?(i.value=l,i.innerHTML=l):(i.value=l.postscriptName,i.innerHTML=l.style,i.title=l.fullName),i}),k=e=>{t.canvasSizeValue.innerHTML=e.props.rw.toFixed(1)+"x"+e.props.rh.toFixed(1),t.renderPixelValue.innerHTML=(e.props.rw*e.props.rr).toFixed(1)+"x"+(e.props.rh*e.props.rr).toFixed(1)},x=e=>{t.textInput.style.fontFamily=e.font.useFs?e.font.fs:e.font.ff,t.textInput.style.fontStyle=e.font.useItalic?"italic":"normal",t.textInput.style.fontWeight=e.font.useWeight?e.font.fw:""},Y=e=>{t.ffInput.innerHTML="",t.ffInput.append(...J(Object.keys(e.props.shared.fm))),t.ffInput.value=e.font.ff},P=(e,l=!1)=>{let i=e.props.shared.fm[e.font.ff]??I("Selected font-family is not in fontmap");t.fsInput.innerHTML="",t.fsInput.append(...J(i)),l&&(e.font.fs=i[0].postscriptName),i.map(({postscriptName:a})=>a).includes(e.font.fs)||console.warn("%o is not in available styles list. Who tf set that?",e.font.fs),t.fsInput.value=e.font.fs},z=e=>{t.textInput.value=e.text,x(e),Y(e),P(e),t.useFsInput.checked=e.font.useFs,t.fsInput.disabled=!t.useFsInput.checked,t.useItalicInput.checked=e.font.useItalic,t.useWeightInput.checked=e.font.useWeight,t.fwInput.value=e.font.fw,t.fwInput.disabled=!t.useWeightInput.checked,t.fontSizeInput.value=String(e.font.size),t.fontSizeValue.innerHTML=String(e.font.size),t.lhInput.value=String(e.font.lh),t.lhValue.innerHTML=String(e.font.lh),t.alignInput.value=e.font.align,t.baselineInput.value=e.font.baseline,t.rrValue.innerHTML=String(e.props.rr),t.dprValue.innerHTML=String(window.devicePixelRatio),t.rrInput.value=String(e.props.rr),k(e),t.zoomValue.innerHTML=String(e.props.scaleMp),t.lineStyle.blAlign.color.value=e.props.style.blAlign.color,t.lineStyle.blAlign.width.value=String(e.props.style.blAlign.width),t.lineStyle.blAlign.display.checked=e.props.style.blAlign.display,t.lineStyle.fontBb.color.value=e.props.style.fontBb.color,t.lineStyle.fontBb.width.value=String(e.props.style.fontBb.width),t.lineStyle.fontBb.display.checked=e.props.style.fontBb.display,t.lineStyle.actualBb.color.value=e.props.style.actualBb.color,t.lineStyle.actualBb.width.value=String(e.props.style.actualBb.width),t.lineStyle.actualBb.display.checked=e.props.style.actualBb.display,t.lineStyle.alphabeticBl.display.disabled=!("alphabeticBaseline"in TextMetrics.prototype),t.lineStyle.hangingBl.display.disabled=!("hangingBaseline"in TextMetrics.prototype),t.lineStyle.ideographicBl.display.disabled=!("ideographicBaseline"in TextMetrics.prototype),t.lineStyle.alphabeticBl.display.checked=e.props.style.alphabeticBl.display,t.lineStyle.ideographicBl.display.checked=e.props.style.ideographicBl.display,t.lineStyle.hangingBl.display.checked=e.props.style.hangingBl.display};var Q=e=>{t.textInput.addEventListener("input",()=>{e.text=t.textInput.value,d(e)}),t.ffInput.addEventListener("change",()=>{e.font.ff=t.ffInput.value,P(e,!0),x(e),d(e)}),t.useFsInput.addEventListener("change",()=>{e.font.useFs=t.useFsInput.checked,t.fsInput.disabled=!t.useFsInput.checked,x(e),d(e)}),t.fsInput.addEventListener("change",()=>{e.font.fs=t.fsInput.value,x(e),d(e)}),t.useItalicInput.addEventListener("change",()=>{e.font.useItalic=t.useItalicInput.checked,x(e),d(e)}),t.useWeightInput.addEventListener("change",()=>{e.font.useWeight=t.useWeightInput.checked,t.fwInput.disabled=!t.useWeightInput.checked,x(e),d(e)}),t.fwInput.addEventListener("change",()=>{e.font.fw=F(t.fwInput.value,m),x(e),d(e)}),t.localFontsButton.addEventListener("click",()=>{let a=f=>{e.props.shared.fm=H(A.concat(f)),Y(e),P(e)};window.queryLocalFonts?window.queryLocalFonts().then(f=>{f.length===0?console.warn("Empty array, permission denied. Enable manually in browser"):a(f)}).catch(f=>{console.error("Local fonts query failed: %o",f)}):console.warn("Local fonts not supported")}),t.fontSizeInput.addEventListener("input",()=>{e.font.size=Number(t.fontSizeInput.value),t.fontSizeValue.innerHTML=t.fontSizeInput.value,d(e)}),t.lhInput.addEventListener("input",()=>{e.font.lh=Number(t.lhInput.value),t.lhValue.innerHTML=t.lhInput.value,d(e)}),t.alignInput.addEventListener("change",()=>{e.font.align=F(t.alignInput.value,E),d(e)}),t.baselineInput.addEventListener("change",()=>{e.font.baseline=F(t.baselineInput.value,S),d(e)}),t.rrInput.addEventListener("input",()=>{let a=t.rrInput.value;t.rrValue.innerHTML=a,e.props.rr=Number(a),v(e),k(e),d(e)}),window.addEventListener("resize",()=>{v(e),k(e),d(e)}),["blAlign","fontBb","actualBb"].forEach(a=>{t.lineStyle[a].color.addEventListener("input",()=>{e.props.style[a].color=t.lineStyle[a].color.value,d(e)}),t.lineStyle[a].width.addEventListener("input",()=>{e.props.style[a].width=Number(t.lineStyle[a].width.value),d(e)}),t.lineStyle[a].display.addEventListener("input",()=>{e.props.style[a].display=t.lineStyle[a].display.checked,d(e)})}),["alphabeticBl","hangingBl","ideographicBl"].forEach(a=>{t.lineStyle[a].display.addEventListener("input",()=>{e.props.style[a].display=t.lineStyle[a].display.checked,d(e)})});let n=0;K({ui:t.canvasUi,onDown:()=>{t.canvasUi.classList.add("grabbing")},onMove:(a,f)=>{e.props.drawX+=a/e.props.scaleMp,e.props.drawY+=f/e.props.scaleMp,d(e)},onUp:()=>{t.canvasUi.classList.remove("grabbing")},onWheel:(a,f,h)=>{if(h.ctrlKey){n+=-f/100;let b=Math.pow(1.4,n);e.props.scaleMp=b,t.zoomValue.innerHTML=e.props.scaleMp.toFixed(2);let y=e.props.rw*(h.offsetX/e.props.shared.cw),g=e.props.rh*(h.offsetY/e.props.shared.ch);v(e);let M=e.props.rw*(h.offsetX/e.props.shared.cw),L=e.props.rh*(h.offsetY/e.props.shared.ch);e.props.drawX+=M-y,e.props.drawY+=L-g}else e.props.drawX-=a/e.props.scaleMp,e.props.drawY-=f/e.props.scaleMp;d(e)}}),t.disableDarkTheme.addEventListener("change",()=>{document.documentElement.classList.toggle("light-only",t.disableDarkTheme.checked),e.props.style.actualBb.color=t.disableDarkTheme.checked?"#000000":"#ffffff",z(e),D(e),d(e)})};var se=t.canvas.getContext("2d")??I("ctx died"),_=H(A),ee="sans-serif",ae=_[ee]??I("Default font family not found"),w={text:"my honest reaction \u{1F605}\u{1F44C}\u{1F3FD}",font:{fs:ae[0].postscriptName,useItalic:!1,useWeight:!1,useFs:!0,fw:"400",ff:ee,size:60,lh:80,align:"start",baseline:"alphabetic"},props:{rw:0,rh:0,drawX:0,drawY:0,scaleMp:1,rr:window.devicePixelRatio,style:{blAlign:{color:"#c800c8",width:1,display:!0},fontBb:{color:"#f00000",width:1.5,display:!0},actualBb:{color:"#ffffff",width:.5,display:!0},alphabeticBl:{display:!1},hangingBl:{display:!1},ideographicBl:{display:!1}},shared:{cw:0,ch:0,fm:_,ctx:se,colors:{}}}},Z=()=>{G(w),D(w),v(w),d(w),Q(w),z(w),$()};t.mainCss.sheet?Z():t.mainCss.addEventListener("load",Z);})();
//# sourceMappingURL=bundle.js.map
