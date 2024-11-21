import{y as z,z as N,az as D,B as v,D as n,E as o,aA as M,r as E,F as U,G as w,j as g,H as F,J as I}from"./index-KwqYB0WT.js";function B(r){return z("MuiCircularProgress",r)}N("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const G=["className","color","disableShrink","size","style","thickness","value","variant"];let l=r=>r,P,S,b,$;const t=44,K=D(P||(P=l`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),W=D(S||(S=l`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),A=r=>{const{classes:e,variant:s,color:a,disableShrink:d}=r,u={root:["root",s,`color${n(a)}`],svg:["svg"],circle:["circle",`circle${n(s)}`,d&&"circleDisableShrink"]};return I(u,B,e)},H=v("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.root,e[s.variant],e[`color${n(s.color)}`]]}})(({ownerState:r,theme:e})=>o({display:"inline-block"},r.variant==="determinate"&&{transition:e.transitions.create("transform")},r.color!=="inherit"&&{color:(e.vars||e).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&M(b||(b=l`
      animation: ${0} 1.4s linear infinite;
    `),K)),J=v("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),L=v("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.circle,e[`circle${n(s.variant)}`],s.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>o({stroke:"currentColor"},r.variant==="determinate"&&{transition:e.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&M($||($=l`
      animation: ${0} 1.4s ease-in-out infinite;
    `),W)),T=E.forwardRef(function(e,s){const a=U({props:e,name:"MuiCircularProgress"}),{className:d,color:u="primary",disableShrink:R=!1,size:m=40,style:_,thickness:i=3.6,value:h=0,variant:k="indeterminate"}=a,j=w(a,G),c=o({},a,{color:u,disableShrink:R,size:m,thickness:i,value:h,variant:k}),p=A(c),f={},x={},y={};if(k==="determinate"){const C=2*Math.PI*((t-i)/2);f.strokeDasharray=C.toFixed(3),y["aria-valuenow"]=Math.round(h),f.strokeDashoffset=`${((100-h)/100*C).toFixed(3)}px`,x.transform="rotate(-90deg)"}return g.jsx(H,o({className:F(p.root,d),style:o({width:m,height:m},x,_),ownerState:c,ref:s,role:"progressbar"},y,j,{children:g.jsx(J,{className:p.svg,ownerState:c,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:g.jsx(L,{className:p.circle,style:f,ownerState:c,cx:t,cy:t,r:(t-i)/2,fill:"none",strokeWidth:i})})}))}),Z=T;export{Z as C};
