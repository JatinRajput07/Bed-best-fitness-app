var Le=Object.defineProperty;var Ue=(e,t,n)=>t in e?Le(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Y=(e,t,n)=>(Ue(e,typeof t!="symbol"?t+"":t,n),n);import{j as R,r as a,a5 as Ae,a6 as Fe,a7 as He,a8 as We,c as b,T as be,a9 as Ce,R as _,_ as Ge,d as X,e as q,u as te,g as ne,h as ae,f as U,m as se,i as Q,aa as de}from"./index-a60bac1d.js";import{G as Ye,a as _e,_ as Xe,b as qe,k as le}from"./assertThisInitialized-6b736fd0.js";function Ke(e){return e==null||Object.keys(e).length===0}function Ze(e){const{styles:t,defaultTheme:n={}}=e,s=typeof t=="function"?o=>t(Ke(o)?n:o):t;return R.jsx(Ye,{styles:s})}function Je(e){return Object.keys(e).length===0}function Qe(e=null){const t=a.useContext(Ae);return!t||Je(t)?e:t}const et=Fe();function Re(e=et){return Qe(e)}function tt({styles:e,themeId:t,defaultTheme:n={}}){const s=Re(n),o=typeof e=="function"?e(t&&s[t]||s):e;return R.jsx(Ze,{styles:o})}const nt=e=>{var s;const t={systemProps:{},otherProps:{}},n=((s=e==null?void 0:e.theme)==null?void 0:s.unstable_sxConfig)??He;return Object.keys(e).forEach(o=>{n[o]?t.systemProps[o]=e[o]:t.otherProps[o]=e[o]}),t};function ot(e){const{sx:t,...n}=e,{systemProps:s,otherProps:o}=nt(n);let r;return Array.isArray(t)?r=[s,...t]:typeof t=="function"?r=(...i)=>{const u=t(...i);return We(u)?{...s,...u}:s}:r={...s,...t},{...o,sx:r}}const st=typeof window<"u"?a.useLayoutEffect:a.useEffect,rt=st;function it(e,t){typeof e=="function"?e(t):e&&(e.current=t)}function ln({controlled:e,default:t,name:n,state:s="value"}){const{current:o}=a.useRef(e!==void 0),[r,i]=a.useState(t),u=o?e:r,c=a.useCallback(l=>{o||i(l)},[]);return[u,c]}function J(e){const t=a.useRef(e);return rt(()=>{t.current=e}),a.useRef((...n)=>(0,t.current)(...n)).current}function re(...e){return a.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{it(n,t)})},e)}const he={};function Me(e,t){const n=a.useRef(he);return n.current===he&&(n.current=e(t)),n}const at=[];function lt(e){a.useEffect(e,at)}class ue{constructor(){Y(this,"currentId",null);Y(this,"clear",()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)});Y(this,"disposeEffect",()=>this.clear)}static create(){return new ue}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function ut(){const e=Me(ue.create).current;return lt(e.disposeEffect),e}function me(e){try{return e.matches(":focus-visible")}catch{}return!1}function ct(e){return typeof e=="string"}function pt(e,t,n){return e===void 0||ct(e)?t:{...t,ownerState:{...t.ownerState,...n}}}function ft(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(s=>s.match(/^on[A-Z]/)&&typeof e[s]=="function"&&!t.includes(s)).forEach(s=>{n[s]=e[s]}),n}function ge(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function dt(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:s,externalForwardedProps:o,className:r}=e;if(!t){const g=b(n==null?void 0:n.className,r,o==null?void 0:o.className,s==null?void 0:s.className),y={...n==null?void 0:n.style,...o==null?void 0:o.style,...s==null?void 0:s.style},C={...n,...o,...s};return g.length>0&&(C.className=g),Object.keys(y).length>0&&(C.style=y),{props:C,internalRef:void 0}}const i=ft({...o,...s}),u=ge(s),c=ge(o),l=t(i),d=b(l==null?void 0:l.className,n==null?void 0:n.className,r,o==null?void 0:o.className,s==null?void 0:s.className),h={...l==null?void 0:l.style,...n==null?void 0:n.style,...o==null?void 0:o.style,...s==null?void 0:s.style},m={...l,...n,...c,...u};return d.length>0&&(m.className=d),Object.keys(h).length>0&&(m.style=h),{props:m,internalRef:l.ref}}function ht(e,t,n){return typeof e=="function"?e(t,n):e}function mt(){const e=Re(Ce);return e[be]||e}function gt(e){return R.jsx(tt,{...e,defaultTheme:Ce,themeId:be})}function un(e){return function(n){return R.jsx(gt,{styles:typeof e=="function"?s=>e({theme:s,...n}):e})}}function cn(){return ot}function yt(e){return typeof e.main=="string"}function vt(e,t=[]){if(!yt(e))return!1;for(const n of t)if(!e.hasOwnProperty(n)||typeof e[n]!="string")return!1;return!0}function ye(e=[]){return([,t])=>t&&vt(t,e)}class ee{constructor(){Y(this,"mountEffect",()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())});this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}static create(){return new ee}static use(){const t=Me(ee.create).current,[n,s]=a.useState(!1);return t.shouldMount=n,t.setShouldMount=s,a.useEffect(t.mountEffect,[n]),t}mount(){return this.mounted||(this.mounted=Ct(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}start(...t){this.mount().then(()=>{var n;return(n=this.ref.current)==null?void 0:n.start(...t)})}stop(...t){this.mount().then(()=>{var n;return(n=this.ref.current)==null?void 0:n.stop(...t)})}pulsate(...t){this.mount().then(()=>{var n;return(n=this.ref.current)==null?void 0:n.pulsate(...t)})}}function bt(){return ee.use()}function Ct(){let e,t;const n=new Promise((s,o)=>{e=s,t=o});return n.resolve=e,n.reject=t,n}function Rt(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,_e(e,t)}const ve=_.createContext(null);function ce(e,t){var n=function(r){return t&&a.isValidElement(r)?t(r):r},s=Object.create(null);return e&&a.Children.map(e,function(o){return o}).forEach(function(o){s[o.key]=n(o)}),s}function Mt(e,t){e=e||{},t=t||{};function n(d){return d in t?t[d]:e[d]}var s=Object.create(null),o=[];for(var r in e)r in t?o.length&&(s[r]=o,o=[]):o.push(r);var i,u={};for(var c in t){if(s[c])for(i=0;i<s[c].length;i++){var l=s[c][i];u[s[c][i]]=n(l)}u[c]=n(c)}for(i=0;i<o.length;i++)u[o[i]]=n(o[i]);return u}function D(e,t,n){return n[t]!=null?n[t]:e.props[t]}function Et(e,t){return ce(e.children,function(n){return a.cloneElement(n,{onExited:t.bind(null,n),in:!0,appear:D(n,"appear",e),enter:D(n,"enter",e),exit:D(n,"exit",e)})})}function xt(e,t,n){var s=ce(e.children),o=Mt(t,s);return Object.keys(o).forEach(function(r){var i=o[r];if(a.isValidElement(i)){var u=r in t,c=r in s,l=t[r],d=a.isValidElement(l)&&!l.props.in;c&&(!u||d)?o[r]=a.cloneElement(i,{onExited:n.bind(null,i),in:!0,exit:D(i,"exit",e),enter:D(i,"enter",e)}):!c&&u&&!d?o[r]=a.cloneElement(i,{in:!1}):c&&u&&a.isValidElement(l)&&(o[r]=a.cloneElement(i,{onExited:n.bind(null,i),in:l.props.in,exit:D(i,"exit",e),enter:D(i,"enter",e)}))}}),o}var Tt=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},St={component:"div",childFactory:function(t){return t}},pe=function(e){Rt(t,e);function t(s,o){var r;r=e.call(this,s,o)||this;var i=r.handleExited.bind(qe(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(o,r){var i=r.children,u=r.handleExited,c=r.firstRender;return{children:c?Et(o,u):xt(o,i,u),firstRender:!1}},n.handleExited=function(o,r){var i=ce(this.props.children);o.key in i||(o.props.onExited&&o.props.onExited(r),this.mounted&&this.setState(function(u){var c=Ge({},u.children);return delete c[o.key],{children:c}}))},n.render=function(){var o=this.props,r=o.component,i=o.childFactory,u=Xe(o,["component","childFactory"]),c=this.state.contextValue,l=Tt(this.state.children).map(i);return delete u.appear,delete u.enter,delete u.exit,r===null?_.createElement(ve.Provider,{value:c},l):_.createElement(ve.Provider,{value:c},_.createElement(r,u,l))},t}(_.Component);pe.propTypes={};pe.defaultProps=St;const $t=pe;function Pt(e){const{className:t,classes:n,pulsate:s=!1,rippleX:o,rippleY:r,rippleSize:i,in:u,onExited:c,timeout:l}=e,[d,h]=a.useState(!1),m=b(t,n.ripple,n.rippleVisible,s&&n.ripplePulsate),g={width:i,height:i,top:-(i/2)+r,left:-(i/2)+o},y=b(n.child,d&&n.childLeaving,s&&n.childPulsate);return!u&&!d&&h(!0),a.useEffect(()=>{if(!u&&c!=null){const C=setTimeout(c,l);return()=>{clearTimeout(C)}}},[c,u,l]),R.jsx("span",{className:m,style:g,children:R.jsx("span",{className:y})})}const Bt=X("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),M=Bt,ie=550,It=80,wt=le`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,kt=le`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,Nt=le`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,Vt=q("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),Ot=q(Pt,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${M.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${wt};
    animation-duration: ${ie}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${M.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${M.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${M.childLeaving} {
    opacity: 0;
    animation-name: ${kt};
    animation-duration: ${ie}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${M.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${Nt};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,jt=a.forwardRef(function(t,n){const s=te({props:t,name:"MuiTouchRipple"}),{center:o=!1,classes:r={},className:i,...u}=s,[c,l]=a.useState([]),d=a.useRef(0),h=a.useRef(null);a.useEffect(()=>{h.current&&(h.current(),h.current=null)},[c]);const m=a.useRef(!1),g=ut(),y=a.useRef(null),C=a.useRef(null),E=a.useCallback(f=>{const{pulsate:T,rippleX:x,rippleY:L,rippleSize:O,cb:A}=f;l(S=>[...S,R.jsx(Ot,{classes:{ripple:b(r.ripple,M.ripple),rippleVisible:b(r.rippleVisible,M.rippleVisible),ripplePulsate:b(r.ripplePulsate,M.ripplePulsate),child:b(r.child,M.child),childLeaving:b(r.childLeaving,M.childLeaving),childPulsate:b(r.childPulsate,M.childPulsate)},timeout:ie,pulsate:T,rippleX:x,rippleY:L,rippleSize:O},d.current)]),d.current+=1,h.current=A},[r]),B=a.useCallback((f={},T={},x=()=>{})=>{const{pulsate:L=!1,center:O=o||T.pulsate,fakeElement:A=!1}=T;if((f==null?void 0:f.type)==="mousedown"&&m.current){m.current=!1;return}(f==null?void 0:f.type)==="touchstart"&&(m.current=!0);const S=A?null:C.current,w=S?S.getBoundingClientRect():{width:0,height:0,left:0,top:0};let k,$,N;if(O||f===void 0||f.clientX===0&&f.clientY===0||!f.clientX&&!f.touches)k=Math.round(w.width/2),$=Math.round(w.height/2);else{const{clientX:F,clientY:j}=f.touches&&f.touches.length>0?f.touches[0]:f;k=Math.round(F-w.left),$=Math.round(j-w.top)}if(O)N=Math.sqrt((2*w.width**2+w.height**2)/3),N%2===0&&(N+=1);else{const F=Math.max(Math.abs((S?S.clientWidth:0)-k),k)*2+2,j=Math.max(Math.abs((S?S.clientHeight:0)-$),$)*2+2;N=Math.sqrt(F**2+j**2)}f!=null&&f.touches?y.current===null&&(y.current=()=>{E({pulsate:L,rippleX:k,rippleY:$,rippleSize:N,cb:x})},g.start(It,()=>{y.current&&(y.current(),y.current=null)})):E({pulsate:L,rippleX:k,rippleY:$,rippleSize:N,cb:x})},[o,E,g]),V=a.useCallback(()=>{B({},{pulsate:!0})},[B]),I=a.useCallback((f,T)=>{if(g.clear(),(f==null?void 0:f.type)==="touchend"&&y.current){y.current(),y.current=null,g.start(0,()=>{I(f,T)});return}y.current=null,l(x=>x.length>0?x.slice(1):x),h.current=T},[g]);return a.useImperativeHandle(n,()=>({pulsate:V,start:B,stop:I}),[V,B,I]),R.jsx(Vt,{className:b(M.root,r.root,i),ref:C,...u,children:R.jsx($t,{component:null,exit:!0,children:c})})}),zt=jt;function Dt(e){return ne("MuiButtonBase",e)}const Lt=X("MuiButtonBase",["root","disabled","focusVisible"]),Ut=Lt,At=e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:s,classes:o}=e,i=ae({root:["root",t&&"disabled",n&&"focusVisible"]},Dt,o);return n&&s&&(i.root+=` ${s}`),i},Ft=q("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Ut.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Ht=a.forwardRef(function(t,n){const s=te({props:t,name:"MuiButtonBase"}),{action:o,centerRipple:r=!1,children:i,className:u,component:c="button",disabled:l=!1,disableRipple:d=!1,disableTouchRipple:h=!1,focusRipple:m=!1,focusVisibleClassName:g,LinkComponent:y="a",onBlur:C,onClick:E,onContextMenu:B,onDragLeave:V,onFocus:I,onFocusVisible:f,onKeyDown:T,onKeyUp:x,onMouseDown:L,onMouseLeave:O,onMouseUp:A,onTouchEnd:S,onTouchMove:w,onTouchStart:k,tabIndex:$=0,TouchRippleProps:N,touchRippleRef:F,type:j,...H}=s,W=a.useRef(null),v=bt(),Ee=re(v.ref,F),[z,K]=a.useState(!1);l&&z&&K(!1),a.useImperativeHandle(o,()=>({focusVisible:()=>{K(!0),W.current.focus()}}),[]);const xe=v.shouldMount&&!d&&!l;a.useEffect(()=>{z&&m&&!d&&v.pulsate()},[d,m,z,v]);const Te=P(v,"start",L,h),Se=P(v,"stop",B,h),$e=P(v,"stop",V,h),Pe=P(v,"stop",A,h),Be=P(v,"stop",p=>{z&&p.preventDefault(),O&&O(p)},h),Ie=P(v,"start",k,h),we=P(v,"stop",S,h),ke=P(v,"stop",w,h),Ne=P(v,"stop",p=>{me(p.target)||K(!1),C&&C(p)},!1),Ve=J(p=>{W.current||(W.current=p.currentTarget),me(p.target)&&(K(!0),f&&f(p)),I&&I(p)}),oe=()=>{const p=W.current;return c&&c!=="button"&&!(p.tagName==="A"&&p.href)},Oe=J(p=>{m&&!p.repeat&&z&&p.key===" "&&v.stop(p,()=>{v.start(p)}),p.target===p.currentTarget&&oe()&&p.key===" "&&p.preventDefault(),T&&T(p),p.target===p.currentTarget&&oe()&&p.key==="Enter"&&!l&&(p.preventDefault(),E&&E(p))}),je=J(p=>{m&&p.key===" "&&z&&!p.defaultPrevented&&v.stop(p,()=>{v.pulsate(p)}),x&&x(p),E&&p.target===p.currentTarget&&oe()&&p.key===" "&&!p.defaultPrevented&&E(p)});let Z=c;Z==="button"&&(H.href||H.to)&&(Z=y);const G={};Z==="button"?(G.type=j===void 0?"button":j,G.disabled=l):(!H.href&&!H.to&&(G.role="button"),l&&(G["aria-disabled"]=l));const ze=re(n,W),fe={...s,centerRipple:r,component:c,disabled:l,disableRipple:d,disableTouchRipple:h,focusRipple:m,tabIndex:$,focusVisible:z},De=At(fe);return R.jsxs(Ft,{as:Z,className:b(De.root,u),ownerState:fe,onBlur:Ne,onClick:E,onContextMenu:Se,onFocus:Ve,onKeyDown:Oe,onKeyUp:je,onMouseDown:Te,onMouseLeave:Be,onMouseUp:Pe,onDragLeave:$e,onTouchEnd:we,onTouchMove:ke,onTouchStart:Ie,ref:ze,tabIndex:l?-1:$,type:j,...G,...H,children:[i,xe?R.jsx(zt,{ref:Ee,center:r,...N}):null]})});function P(e,t,n,s=!1){return J(o=>(n&&n(o),s||e[t](o),!0))}const Wt=Ht;function Gt(e){return ne("MuiIconButton",e)}const Yt=X("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]),_t=Yt,Xt=e=>{const{classes:t,disabled:n,color:s,edge:o,size:r}=e,i={root:["root",n&&"disabled",s!=="default"&&`color${U(s)}`,o&&`edge${U(o)}`,`size${U(r)}`]};return ae(i,Gt,t)},qt=q(Wt,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="default"&&t[`color${U(n.color)}`],n.edge&&t[`edge${U(n.edge)}`],t[`size${U(n.size)}`]]}})(se(({theme:e})=>({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",color:(e.vars||e).palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),variants:[{props:t=>!t.disableRipple,style:{"--IconButton-hoverBg":e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:Q(e.palette.action.active,e.palette.action.hoverOpacity),"&:hover":{backgroundColor:"var(--IconButton-hoverBg)","@media (hover: none)":{backgroundColor:"transparent"}}}},{props:{edge:"start"},style:{marginLeft:-12}},{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:{edge:"end"},style:{marginRight:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}}]})),se(({theme:e})=>({variants:[{props:{color:"inherit"},style:{color:"inherit"}},...Object.entries(e.palette).filter(ye()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}})),...Object.entries(e.palette).filter(ye()).map(([t])=>({props:{color:t},style:{"--IconButton-hoverBg":e.vars?`rgba(${(e.vars||e).palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:Q((e.vars||e).palette[t].main,e.palette.action.hoverOpacity)}})),{props:{size:"small"},style:{padding:5,fontSize:e.typography.pxToRem(18)}},{props:{size:"large"},style:{padding:12,fontSize:e.typography.pxToRem(28)}}],[`&.${_t.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled}}))),Kt=a.forwardRef(function(t,n){const s=te({props:t,name:"MuiIconButton"}),{edge:o=!1,children:r,className:i,color:u="default",disabled:c=!1,disableFocusRipple:l=!1,size:d="medium",...h}=s,m={...s,edge:o,color:u,disabled:c,disableFocusRipple:l,size:d},g=Xt(m);return R.jsx(qt,{className:b(g.root,i),centerRipple:!0,focusRipple:!l,disabled:c,ref:n,...h,ownerState:m,children:r})}),pn=Kt;function fn(e){return ne("MuiDivider",e)}const Zt=X("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),dn=Zt,Jt=a.createContext(void 0),Qt=Jt;function hn(){return a.useContext(Qt)}function mn(e,t){const{className:n,elementType:s,ownerState:o,externalForwardedProps:r,internalForwardedProps:i,...u}=t,{component:c,slots:l={[e]:void 0},slotProps:d={[e]:void 0},...h}=r,m=l[e]||s,g=ht(d[e],o),{props:{component:y,...C},internalRef:E}=dt({className:n,...u,externalForwardedProps:e==="root"?h:void 0,externalSlotProps:g}),B=re(E,g==null?void 0:g.ref,t.ref),V=e==="root"?y||c:y,I=pt(m,{...e==="root"&&!c&&!l[e]&&i,...e!=="root"&&!l[e]&&i,...C,...V&&{as:V},ref:B},o);return[m,I]}function en(e){return ne("MuiPaper",e)}X("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const tn=e=>{const{square:t,elevation:n,variant:s,classes:o}=e,r={root:["root",s,!t&&"rounded",s==="elevation"&&`elevation${n}`]};return ae(r,en,o)},nn=q("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(se(({theme:e})=>({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow"),variants:[{props:({ownerState:t})=>!t.square,style:{borderRadius:e.shape.borderRadius}},{props:{variant:"outlined"},style:{border:`1px solid ${(e.vars||e).palette.divider}`}},{props:{variant:"elevation"},style:{boxShadow:"var(--Paper-shadow)",backgroundImage:"var(--Paper-overlay)"}}]}))),on=a.forwardRef(function(t,n){var g;const s=te({props:t,name:"MuiPaper"}),o=mt(),{className:r,component:i="div",elevation:u=1,square:c=!1,variant:l="elevation",...d}=s,h={...s,component:i,elevation:u,square:c,variant:l},m=tn(h);return R.jsx(nn,{as:i,ownerState:h,className:b(m.root,r),ref:n,...d,style:{...l==="elevation"&&{"--Paper-shadow":(o.vars||o).shadows[u],...o.vars&&{"--Paper-overlay":(g=o.vars.overlays)==null?void 0:g[u]},...!o.vars&&o.palette.mode==="dark"&&{"--Paper-overlay":`linear-gradient(${Q("#fff",de(u))}, ${Q("#fff",de(u))})`}},...d.style}})}),gn=on;export{Wt as B,Qt as F,pn as I,gn as P,ve as T,Rt as _,re as a,mn as b,ye as c,mt as d,ot as e,ln as f,fn as g,hn as h,cn as i,pt as j,dn as k,rt as l,dt as m,un as n,ut as o,J as p,ft as q,ht as r,it as s,Re as u};
