(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{363:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));const n=a(12).a.withComponent("ul")},370:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(0),c=a(110);const r=e=>n.createElement(c.a,Object.assign({},e,{content:!0}))},371:function(e,t,a){"use strict";a.d(t,"a",(function(){return Wt}));var n=a(3),c=a(14),r=a(12),i=a(0),o=a.n(i),l=a(253),s=a(257),d=a(1),m=a(29);const b=Object(n.a)(r.a,{target:"euu32c90"})(Object(d.c)("theme.fonts.axiformaRegular"),";",Object(d.c)("theme.fontStyles.caption"),";color:",Object(d.c)("theme.gray0"),";text-align:",Object(d.a)("next","right","left"),";padding-bottom:8px;"),g=Object(n.a)(m.a,{target:"euu32c91"})(Object(d.c)("theme.fonts.axiformaRegular"),";",Object(d.c)("theme.fontStyles.display1"),";@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){",Object(d.c)("theme.fontStyles.headline"),";}"),p=e=>{var{adjacent:t,next:a=!1}=e,n=Object(c.a)(e,["adjacent","next"]);return i.createElement(r.a,Object.assign({},n),i.createElement(b,{next:a},a?"Next Article":"Previous Article"),i.createElement(g,{linkColor:"primary",to:t.slug},t.title))},u=Object(n.a)(r.a,{target:"e632hcq0"})("display:grid;justify-items:center;padding-top:64px;padding-bottom:64px;background-color:",Object(d.c)("theme.gray6"),";width:100%;"),h=Object(n.a)(r.a,{target:"e632hcq1"})("display:grid;grid-auto-flow:column;justify-content:space-between;grid-gap:32px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:16px;}"),j=e=>{var{next:t,previous:a}=e,n=Object(c.a)(e,["next","previous"]);return void 0===a&&void 0===t?null:i.createElement(u,Object.assign({},n),i.createElement(l.a,null,i.createElement(h,null,void 0===a?i.createElement(r.a,null):i.createElement(p,{adjacent:a}),void 0===t?i.createElement(r.a,null):i.createElement(p,{next:!0,adjacent:t}))))};var O=a(2),x=a(368),f=a(372);const y=r.a.withComponent("h2"),v=Object(n.a)(y,{target:"e17p5bbx0"})(Object(x.b)("theme.fonts.axiformaBold"),";",Object(x.a)("subheading",Object(x.b)("theme.fontStyles.headline"),Object(x.b)("theme.fontStyles.display1")),";");var E=a(369);const k=[".",",","(",")","[","]","{","}","<",">",";",":"],w=(e,t,a)=>k.includes(a)||e!==t.length-1&&k.includes(t[e+1].value)?""+a:a+" ",C=Object(n.a)(m.a,{target:"e1vpbcvs0"})("font-family:",Object(d.a)("code","Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace"),";",Object(d.c)("theme.fontStyles.subheading"),";"),S=e=>{var{to:t,value:a,idx:n,example:r,code:o=!1}=e,l=Object(c.a)(e,["to","value","idx","example","code"]);return i.createElement(C,Object.assign({to:t,linkColor:"accent",code:o,key:n},l),w(n,r,a))},$=({idx:e,example:t,token:a})=>({__html:E.a.highlight(w(e,t,a.value),E.a.languages.typescript,"typescript")}),L=Object(n.a)(r.a.withComponent("pre",{target:"emgkr392"}),{target:"emgkr390"})("background-color:",Object(d.c)("theme.gray6"),";",Object(d.c)("theme.fontStyles.subheading"),";font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;padding:16px;border-radius:4px;"),_=Object(n.a)(r.a.withComponent("code",{target:"emgkr393"}),{target:"emgkr391"})(Object(d.c)("theme.fontStyles.subheading"),";font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;"),D=e=>{var{example:t,className:a="language-typescript"}=e,n=Object(c.a)(e,["example","className"]);return i.createElement(L,Object.assign({className:a},n),i.createElement(_,{className:a},(e=>e.map((t,a)=>void 0===t.slug?i.createElement("span",{key:a,dangerouslySetInnerHTML:$({idx:a,example:e,token:t})}):i.createElement(S,{key:a,to:t.slug,code:!0,idx:a,value:t.value,example:e})))(t)))},M=Object(n.a)(r.a,{target:"e1pgmprk0"})(Object(d.c)("theme.fontStyles.subheading"),";",Object(d.c)("theme.fonts.axiformaRegular"),";"),A=e=>{var{text:t}=e,a=Object(c.a)(e,["text"]);return i.createElement(M,Object.assign({},a),(e=>e.map((t,a)=>void 0===t.slug?i.createElement("span",{key:a},w(a,e,t.value)):i.createElement(S,{key:a,to:t.slug,idx:a,value:t.value,example:e})))(t))},R=Object(n.a)(r.a,{target:"el4czav0"})("display:grid;grid-auto-flow:row;grid-gap:32px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:16px;}"),q=e=>{var{data:t}=e,a=Object(c.a)(e,["data"]);return i.createElement(R,Object.assign({},a),void 0===t.title?null:i.createElement(v,null,t.title),t.code?i.createElement(D,{example:t.data}):i.createElement(A,{text:t.data}))};var F=a(277),I=a.n(F);const B=Object(n.a)(r.a,{target:"e129s0k70"})("display:grid;grid-auto-flow:row;grid-gap:32px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:16px;}"),z=e=>{var{title:t,text:a,subheading:n}=e,r=Object(c.a)(e,["title","text","subheading"]);return i.createElement(B,Object.assign({},r),i.createElement(v,{subheading:n},t),i.createElement(A,{text:a}))};a(67);const V=Object(n.a)(r.a,{target:"e1n89shh0"})({name:"1k4j2dd",styles:"display:grid;grid-auto-flow:column;grid-template-columns:1fr 1fr 1fr;grid-gap:16px;justify-items:start;align-items:baseline;border-bottom:1px solid rgba(0,0,0,0.3);"}),N=Object(n.a)(r.a,{target:"e1n89shh1"})(Object(d.c)("theme.fonts.axiformaBold"),";",Object(d.c)("theme.fontStyles.body1"),";"),T=e=>{var{value:t}=e,a=Object(c.a)(e,["value"]);return i.createElement(V,Object.assign({},a),i.createElement(N,null,t.name),void 0===t.type?null:i.createElement(A,{text:t.type}),i.createElement(A,{text:t.description}))},P=Object(n.a)(r.a,{target:"eoi2cqx0"})("display:grid;grid-auto-flow:row;grid-gap:32px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:16px;}"),Y=e=>{var{values:t=[],subheading:a,title:n}=e,r=Object(c.a)(e,["values","subheading","title"]);return i.createElement(P,Object.assign({},r),i.createElement(v,{subheading:a},n),t.map(e=>i.createElement(T,{key:e.name,value:e})))},H=Object(n.a)(r.a,{target:"e1peci850"})("display:grid;grid-auto-flow:row;grid-gap:32px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:16px;}"),U=e=>{var{functionData:t,subheading:a}=e,n=Object(c.a)(e,["functionData","subheading"]);return i.createElement(H,Object.assign({},n),void 0===t.parameters||I.a.isEmpty(t.parameters)?null:i.createElement(Y,{values:t.parameters,title:"Parameters",subheading:a}),void 0===t.returns||I.a.isEmpty(t.returns)?null:i.createElement(z,{title:"Returns",text:t.returns,subheading:a}))},W=Object(n.a)(r.a,{target:"e1ow3lez0"})("display:grid;grid-auto-flow:row;grid-gap:16px;background-color:",Object(d.c)("theme.gray1"),";border:1px solid rgba(0,0,0,0.3);@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:8px;}"),X=Object(n.a)(r.a,{target:"e1ow3lez1"})("display:grid;grid-auto-flow:row;grid-gap:16px;padding:16px 32px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:8px;}"),J=Object(n.a)(v,{target:"e1ow3lez2"})("background-color:",Object(d.c)("theme.gray1"),";padding:16px 32px;border-bottom:1px solid rgba(0,0,0,0.3);"),K=e=>{var{method:t}=e,a=Object(c.a)(e,["method"]);return i.createElement(W,Object.assign({},a),i.createElement(J,{subheading:!0},t.title),i.createElement(X,null,void 0===t.description?null:i.createElement(A,{text:t.description}),i.createElement(D,{example:t.definition}),i.createElement(U,{functionData:t.functionData,subheading:!0}),void 0===t.extra?null:t.extra.map(e=>i.createElement(q,{data:e,key:e.title}))))},G=Object(n.a)(r.a,{target:"e8dlwvh0"})("display:grid;grid-auto-flow:row;grid-gap:32px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:16px;}"),Q=e=>{var{methods:t,staticMethods:a}=e,n=Object(c.a)(e,["methods","staticMethods"]);return i.createElement(G,Object.assign({},n),i.createElement(v,null,a?"Static Methods":"Methods"),t.map(e=>i.createElement(K,{key:e.title,method:e})))},Z=Object(n.a)(r.a,{target:"en99sb90"})("display:grid;grid-auto-flow:row;grid-gap:40px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:24px;}"),ee=e=>{var{data:t}=e,a=Object(c.a)(e,["data"]);return i.createElement(Z,Object.assign({},a),void 0===t.constructorDefinition?null:i.createElement(Z,null,i.createElement(v,null,"Constructor"),i.createElement(K,{method:t.constructorDefinition})),void 0===t.properties||I.a.isEmpty(t.properties)?null:i.createElement(Y,{values:t.properties,title:"Properties"}),void 0===t.staticMethods||I.a.isEmpty(t.staticMethods)?null:i.createElement(Q,{methods:t.staticMethods,staticMethods:!0}),void 0===t.methods||I.a.isEmpty(t.methods)?null:i.createElement(Q,{methods:t.methods}))},te=Object(n.a)(r.a,{target:"e1q8frih0"})("background-color:",Object(d.d)("bg",{All:"transparent",Class:Object(d.c)("theme.primary"),Const:Object(d.c)("theme.gray6"),Function:Object(d.c)("theme.warning"),Interface:Object(d.c)("theme.accent"),Enum:Object(d.c)("theme.gray3"),Decorator:Object(d.c)("theme.error"),"Type Alias":Object(d.c)("theme.secondary")}),";color:",Object(d.d)("bg",{All:"transparent"},Object(d.c)("theme.gray0")),";",Object(d.c)("theme.fontStyles.body2"),";",Object(d.c)("theme.fonts.axiformaBold"),";border-radius:2px;width:",Object(d.a)("fullIcon","80px","24px"),";height:24px;text-align:center;padding-top:2px;"),ae=e=>{var{type:t,fullIcon:a=!1}=e,n=Object(c.a)(e,["type","fullIcon"]);return i.createElement(te,Object.assign({bg:t,fullIcon:a},n),a?t:(e=>"Const"===e?"K":e.charAt(0))(t))},ne=Object(n.a)(r.a,{target:"ewwg5c80"})("display:grid;grid-gap:16px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){padding-left:16px;padding-right:16px;}"),ce=e=>{var{type:t,description:a,definition:n}=e,r=Object(c.a)(e,["type","description","definition"]);return i.createElement(ne,Object.assign({},r),i.createElement(ae,{type:t,fullIcon:!0}),i.createElement(A,{text:a}),i.createElement(D,{example:n}))},re=Object(n.a)(r.a,{target:"e6rw5dp0"})("display:grid;grid-gap:32px;@media (max-width:",Object(d.c)("theme.breakpoints.md"),"){grid-gap:16px;}"),ie=e=>{var{content:t}=e,a=Object(c.a)(e,["content"]);return i.createElement(re,Object.assign({},a),i.createElement(ce,{type:t.type,description:t.description,definition:t.definition}),void 0===t.functionData?null:i.createElement(U,{functionData:t.functionData}),void 0===t.classData?null:i.createElement(ee,{data:t.classData}),void 0===t.enumData?null:i.createElement(Y,{values:t.enumData.members,title:"Members"}),void 0===t.constData?null:i.createElement(ee,{data:t.constData}),void 0===t.interfaceData?null:i.createElement(ee,{data:t.interfaceData}),void 0===t.extra?null:t.extra.map(e=>i.createElement(q,{data:e,key:e.title})))};var oe=a(5);const le=r.a.withComponent("input");le.defaultProps={type:"text",opaque:!0,palette:"white"};const se=Object(oe.a)(le)`
  padding: 0 4px;
  outline: none;
  ${Object(d.c)("theme.fonts.axiformaRegular")};
  ${Object(d.c)("theme.fontStyles.subheading")};
  background-color: white;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`;const de=Object(n.a)(m.a,{target:"e10c331v0"})(Object(d.c)("theme.fontStyles.subheading"),";",Object(d.c)("theme.fonts.axiformaRegular"),";"),me=Object(n.a)(r.a,{target:"e10c331v1"})({name:"1ljnlgj",styles:"display:grid;grid-auto-flow:column;justify-content:start;gap:8px;"}),be=e=>{var{title:t,path:a,type:n}=e,r=Object(c.a)(e,["title","path","type"]);return i.createElement(me,Object.assign({},r),i.createElement(ae,{type:n}),i.createElement(de,{to:a,linkColor:"gray"},t))};var ge=a(242),pe=a(364);const ue=Object(oe.a)(pe.a)`
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-color: ${Object(d.c)("theme.gray0")};
  outline: none;

  & > .react-select__control {
    background-color: ${Object(d.c)("theme.gray0")};
    border: 0;
    border-radius: 0;
    box-shadow: none;
    cursor: pointer;

    &:hover {
      border: 0;
      box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.1);
    }

    & > .react-select__indicators {
      & > .react-select__indicator-separator {
        background-color: ${Object(d.c)("theme.black")};
        opacity: 0.2;
      }

      & > .react-select__indicator {
        color: ${Object(d.c)("theme.black")};
      }
    }
  }

  & .react-select__menu {
    background-color: ${Object(d.c)("theme.gray0")};
    width: auto;

    & .react-select__option {
      color: ${Object(d.c)("theme.black")};
      cursor: pointer;
    }

    & .react-select__option.react-select__option--is-selected {
      background-color: ${Object(d.c)("theme.accent")};
      opacity: 0.8;
    }

    & .react-select__option.react-select__option--is-focused {
      background-color: ${Object(d.c)("theme.accent")};
      opacity: 1;
    }
  }
`,he={option:(e,t)=>({...e,color:ge.b.black,cursor:"pointer",width:"auto",backgroundColor:t.isSelected||t.isFocused?"#9B98F6":"#F8F5FD",opacity:t.isSelected?.8:t.isFocused?1:void 0,fontSize:"0.875rem",lineHeight:"1.46428em",textAlign:"left",fontFamily:Object(ge.a)("Axiforma-Regular"),fontStyle:"normal",fontWeight:400})};function je({"data-test":e,...t}){return i.createElement("div",{"data-test":e},i.createElement(ue,Object.assign({classNamePrefix:"react-select",styles:he},t)))}const Oe=Object(n.a)(r.a,{target:"e1ncx6fs0"})(Object(d.c)("theme.fontStyles.subheading"),";",Object(d.c)("theme.fonts.axiformaRegular"),";"),xe=Object(n.a)(r.a,{target:"e1ncx6fs1"})({name:"myer3n",styles:"display:grid;grid-auto-flow:column;justify-content:start;align-items:center;gap:8px;"}),fe=e=>{var{type:t}=e,a=Object(c.a)(e,["type"]);return i.createElement(xe,Object.assign({},a),i.createElement(ae,{type:t}),i.createElement(Oe,null,t))},ye=["All","Function","Class","Const","Interface","Enum","Decorator","Type Alias"];const ve=Object(n.a)(je,{target:"eft7t6c0"})({name:"6mhao8",styles:"width:144px;& > .react-select__control{background-color:white;}"}),Ee=e=>i.createElement(fe,{type:e}),ke=e=>{var{selected:t,onChange:a}=e,n=Object(c.a)(e,["selected","onChange"]);return i.createElement(ve,Object.assign({},n,{formatOptionLabel:Ee,placeholder:"Select Type",value:[""+t],options:ye,onChange:a}))};const{useState:we}=i,Ce=Object(n.a)(r.a,{target:"e1aqb0vv0"})({name:"1vsl0l3",styles:"display:grid;min-width:0;grid-template-columns:repeat(auto-fill,400px);grid-gap:8px;"}),Se=Object(n.a)(r.a,{target:"e1aqb0vv1"})({name:"4ymi2n",styles:"display:grid;gap:16px;min-width:0;"}),$e=Object(n.a)(se,{target:"e1aqb0vv2"})({name:"1c4hs1b",styles:"width:144px;"}),Le=Object(n.a)(r.a,{target:"e1aqb0vv3"})({name:"zvuts",styles:"display:grid;grid-auto-flow:column;justify-content:start;align-content:center;gap:16px;"}),_e=e=>{var{content:t}=e,a=Object(c.a)(e,["content"]);const[n,r]=we("All"),[o,l]=we("");return i.createElement(Se,Object.assign({},a),i.createElement(Le,null,i.createElement(ke,{selected:n,onChange:r}),i.createElement($e,{placeholder:"Filter",onChange:e=>l(e.target.value)})),i.createElement(Ce,null,t.filter(e=>("All"===n||n.toLowerCase()===e.type.toLowerCase())&&(""===o||e.name.toLowerCase().includes(o.toLowerCase()))).map(({name:e,type:t,slug:a})=>i.createElement(be,{title:e,type:t,path:a,key:a}))))},De=e=>{var{content:t}=e,a=Object(c.a)(e,["content"]);return"referenceItems"===t.type?i.createElement(_e,Object.assign({content:t.value.map(e=>e.content.value)},a)):i.createElement(ie,{content:t.value})};var Me=a(254);const Ae=Object(n.a)(r.a,{target:"e6dypuq0"})(Object(d.c)("theme.fonts.axiformaRegular")," ",Object(d.c)("theme.fontStyles.subheading")," color:",Object(d.c)("theme.black"),";"),Re=Object(n.a)(Me.a,{target:"e6dypuq1"})(Object(d.c)("theme.fonts.axiformaRegular")," ",Object(d.c)("theme.fontStyles.subheading"),""),qe=e=>{var{author:t,date:a}=e,n=Object(c.a)(e,["author","date"]);const[r,o,l]=a.split("-"),s=new Date(parseInt(r,10),parseInt(o,10)-1,parseInt(l,10));return i.createElement(Ae,Object.assign({},n),s.toLocaleDateString()," by"," ",i.createElement(Re,{linkColor:"accent",href:t.twitter,target:"_blank"},t.name))};const Fe=Object(n.a)(Me.a,{target:"eprrqyr0"})(Object(d.c)("theme.fonts.axiformaRegular")," ",Object(d.c)("theme.fontStyles.subheading"),""),Ie=Object(n.a)("div",{target:"eprrqyr1"})({name:"ib9iq6",styles:"margin-top:80px;"}),Be=e=>"/"===e[0]?e.substr(1,e.length):e,ze=({link:e})=>i.createElement(Ie,null,i.createElement(Fe,{linkColor:"accent",href:"https://github.com/neo-one-suite/neo-one/blob/master/"+Be(e),target:"_blank"},"Edit this page"));const Ve=Object(n.a)(r.a,{target:"e1xdc8010"})("padding-top:16px;padding-bottom:16px;min-width:0;@media (min-width:",Object(x.b)("theme.breakpoints.md"),"){padding-top:64px;padding-bottom:64px;}"),Ne={name:"131uyni",styles:"margin-top:16px;margin-bottom:8px;"},Te={name:"1tl2pm8",styles:"margin-top:32px;margin-bottom:24px;"},Pe=Object(n.a)(f.a,{target:"e1xdc8011"})(Object(x.b)("theme.fontStyles.body2"),";",Object(x.b)("theme.fonts.axiformaBook"),";color:",Object(x.b)("theme.black"),";min-width:0;& table{border-collapse:collapse;}& td,th{padding:8px;}& th{border:1px solid ",Object(x.b)("theme.black"),";}& td{border-left:1px solid ",Object(x.b)("theme.black"),";border-right:1px solid ",Object(x.b)("theme.black"),";border-top:1px solid ",Object(x.b)("theme.black"),";}& th{border-top:none;}& th:last-child{border-right:none;}& th:first-child{border-left:none;}& td:first-child{border-left:none;}& td:last-child{border-right:none;}@media (min-width:",Object(x.b)("theme.breakpoints.md"),"){",Object(x.b)("theme.fontStyles.subheading"),";}& h1{",Object(x.b)("theme.fontStyles.display2"),";margin-top:16px;margin-bottom:24px;@media (min-width:",Object(x.b)("theme.breakpoints.md"),"){",Object(x.b)("theme.fontStyles.display3"),";}}& h2{",Object(x.b)("theme.fontStyles.headline"),";",Ne," @media (min-width:",Object(x.b)("theme.breakpoints.md"),"){",Object(x.b)("theme.fontStyles.display1"),";",Te,"}}& h3{",Object(x.b)("theme.fontStyles.headline"),";",Ne," @media (min-width:",Object(x.b)("theme.breakpoints.md"),"){",Object(x.b)("theme.fontStyles.headline"),";",Te,"}}& h4{",Object(x.b)("theme.fontStyles.body2"),";",Ne," @media (min-width:",Object(x.b)("theme.breakpoints.md"),"){",Object(x.b)("theme.fontStyles.subheading"),";",Te,"}}& h5{",Object(x.b)("theme.fontStyles.body2"),";",Ne," @media (min-width:",Object(x.b)("theme.breakpoints.md"),"){",Object(x.b)("theme.fontStyles.subheading"),";",Te,"}}& > p{max-width:",Object(x.b)("theme.constants.content.maxWidth"),";}& > ol{max-width:",Object(x.b)("theme.constants.content.maxWidth"),";}& > ul{max-width:",Object(x.b)("theme.constants.content.maxWidth"),";}& table{border:none;border-spacing:0;overflow-x:auto;display:block;}& tr:nth-child(even){background-color:",Object(x.b)("theme.gray2"),";}& tr:nth-child(odd){background-color:",Object(x.b)("theme.grayHalf"),";}&&& > p:nth-child(1){",Object(x.b)("theme.fonts.axiformaThin"),";",Object(x.b)("theme.fontStyles.subheading"),";color:",Object(x.b)("theme.gray6"),";margin-bottom:16px;margin-top:16px;max-width:unset;@media (min-width:",Object(x.b)("theme.breakpoints.md"),"){",Object(x.b)("theme.fontStyles.headline"),";margin-bottom:40px;margin-top:40px;}}&&&& img{max-width:100%;}&&&& p img{max-width:100%;}"),Ye=Object(n.a)("h1",{target:"e1xdc8012"})("margin-top:16px;margin-bottom:24px;margin-left:0;margin-right:0;",Object(x.b)("theme.fontStyles.display2"),";color:",Object(x.b)("theme.black"),";",Object(x.b)("theme.fonts.axiformaBook"),";font-weight:700;@media (min-width:",Object(x.b)("theme.breakpoints.md"),"){",Object(x.b)("theme.fontStyles.display3"),";}"),He=e=>{var{content:t,title:a,date:n,link:r,author:o}=e,l=Object(c.a)(e,["content","title","date","link","author"]);return i.createElement(Ve,Object.assign({},l),i.createElement(Ye,null,a),void 0===n||void 0===o?null:i.createElement(qe,{date:n,author:o}),"markdown"===t.type?i.createElement(i.Fragment,null,i.createElement(Pe,{source:t.value,linkColor:"accent",light:!0,anchors:!0,resetScroll:!0}),i.createElement(ze,{link:r})):i.createElement(De,{content:t}))};var Ue=a(22);const We=e=>Boolean(e.animated||e.fade||e.slide||e.expand),Xe=e=>[e.animated,e.fade,e.slide,e.expand],Je=(e,t,a)=>`translate3d(${Object(Ue.c)(e)}, ${Object(Ue.c)(t)}, ${Object(Ue.c)(a)})`,Ke=(e="center",t="center")=>`${Object(Ue.c)(e)} ${Object(Ue.c)(t)}`,Ge=(e,t)=>`calc(${Object(Ue.c)(e)} + ${Object(Ue.c)(t)})`,Qe=e=>"-"+Object(Ue.c)(e),Ze=Object(d.a)({expand:!0},Object(d.c)("defaultExpand","center"),Object(d.c)("expand")),et=Object(d.a)({slide:!0},Object(d.c)("defaultSlide","right"),Object(d.c)("slide")),tt=Object(d.a)("expand","scale(0.01)"),at=Object(d.f)(["originX","originY"],(e,t)=>Object(d.d)(Ze,{center:Ke(Ge("50%",e),Ge("50%",t)),top:Ke(Ge("50%",e),Ge("100%",t)),right:Ke(e,Ge("50%",t)),bottom:Ke(Ge("50%",e),t),left:Ke(Ge("100%",e),Ge("50%",t))},Ke(Ge("50%",e),Ge("50%",t)))),nt=Object(d.f)(["translateX","translateY"],Je),ct=Object(d.f)(["translateX","translateY","slideOffset"],(e,t,a="100%")=>Object(d.d)(et,{top:Je(e,Ge(a,t)),right:Je(Ge(Qe(a),e),t),bottom:Je(e,Ge(Qe(a),t)),left:Je(Ge(a,e),t)},Je(e,t))),{forwardRef:rt,useCallback:it,useEffect:ot,useRef:lt,useState:st,useReducer:dt}=i,mt=(e,t)=>{switch(t.type){case"show":return{visible:!0};case"hide":return{visible:!1};case"toggle":return{visible:!e.visible};default:throw new Error}},bt=(e=!1)=>{const[t,a]=dt(mt,{visible:e});return{...t,show:()=>a({type:"show"}),hide:()=>a({type:"hide"}),toggle:()=>a({type:"toggle"})}},gt=rt(({visible:e=!1,transitioning:t=!1,unmount:a=!1,hideOnEsc:n=!1,hideOnClickOutside:c=!1,hide:o,...l},s)=>{const d=lt(null),m=null===s?d:s,[b,g]=st(!!e),[p,u]=st(!!t),h=lt(b);h.current=b;const j=it(()=>{a&&!e&&u(!1)},[a,e]);if(ot(()=>{const t=t=>{"Escape"===t.key&&e&&o&&o()},a=t=>{const a=m.current;null!==a&&!a.contains(t.target)&&e&&void 0!==o&&setTimeout(()=>{h.current&&o()})};return n&&document.body.addEventListener("keydown",t),c&&document.body.addEventListener("click",a),()=>{document.body.removeEventListener("keydown",t),document.body.removeEventListener("click",a)}},[e,o,m,h,n,c]),ot(()=>{"undefined"!=typeof window&&a&&We(l)?e?(u(!0),requestAnimationFrame(()=>{u(!1),g(!0)})):(u(!0),g(!1)):g(e)},[e,u,g,...Xe(l)]),a&&!b&&!p)return null;const O=(e=>{const{animated:t,fade:a,slide:n,expand:c,...r}=e;return r})(l);return i.createElement(r.a,Object.assign({},O,{ref:m,"aria-hidden":!b,hidden:!b&&!We(l),onTransitionEnd:Object(Ue.a)(j,O.onTransitionEnd)}))}),pt=Object(d.e)("Hidden"),ut=Object(oe.a)(gt)`
  transform: ${nt};
  ${e=>{const t=at(e);return We(e)?O.e`
      transform-origin: ${t(e)};
      transition: all ${e.duration} ${e.timing} ${e.delay};
    `:""}};

  &[aria-hidden='true'] {
    pointer-events: none;
    ${Object(d.a)("fade","opacity: 0")};
    ${e=>{const t=ct(e),a=tt(e);return We(e)?O.e`
      transform: ${t(e)} ${a};
      visibility: hidden;
      will-change: transform, opacity;
      display: none !important;
    `:O.e`
    display: none !important;
  `}};
  }

  ${pt};
`;ut.defaultProps={duration:"250ms",timing:"ease-in-out"};var ht=a(284),jt=a(279),Ot=a(118);const xt=Object(n.a)(ht.a,{target:"e1pjfat70"})(Object(d.c)("theme.fonts.axiformaBold"),";",Object(d.c)("theme.fontStyles.subheading"),";line-height:3;outline:none;cursor:pointer;"),ft=e=>{var{title:t,visible:a,toggle:n}=e,r=Object(c.a)(e,["title","visible","toggle"]);return i.createElement(xt,Object.assign({},r,{onClick:n}),t.toUpperCase(),a?i.createElement(jt.b,null):i.createElement(jt.c,null))};var yt=a(363);const vt=Object(n.a)(m.a,{target:"e1exsio80"})(Object(d.a)("active",Object(d.c)("theme.fonts.axiformaBold"),Object(d.c)("theme.fonts.axiformaRegular")),";",Object(d.c)("theme.fontStyles.subheading"),";&:hover{color:",Object(d.c)("theme.accent"),";}&:focus{color:",Object(d.c)("theme.accent"),";}&.active{color:",Object(d.c)("theme.accent"),";}"),Et=Object(n.a)(Me.a,{target:"e1exsio81"})(Object(d.a)("active",Object(d.c)("theme.fonts.axiformaBold"),Object(d.c)("theme.fonts.axiformaRegular")),";",Object(d.c)("theme.fontStyles.subheading"),";&:hover{color:",Object(d.c)("theme.accent"),";}&:focus{color:",Object(d.c)("theme.accent"),";}&.active{color:",Object(d.c)("theme.accent"),";}"),kt=Object(n.a)("span",{target:"e1exsio82"})("width:4px;height:24px;border-left:4px solid ",Object(d.c)("theme.accent"),";padding-left:16px;position:absolute;left:-16px;"),wt=Object(n.a)("li",{target:"e1exsio83"})(""),Ct=e=>{var{active:t,title:a,index:n,slug:r,children:i}=e,l=Object(c.a)(e,["active","title","index","slug","children"]);return o.a.createElement(wt,Object.assign({},l),o.a.createElement(vt,{active:t,linkColor:"gray",to:r},t?o.a.createElement(kt,null):null,void 0===n?a:`${n}. ${a}`),i)},St=e=>{var{active:t,title:a,index:n,slug:r,children:i}=e,l=Object(c.a)(e,["active","title","index","slug","children"]);return o.a.createElement(wt,Object.assign({},l),o.a.createElement(Et,{active:t,linkColor:"gray",href:r},t?o.a.createElement(kt,null):null,void 0===n?a:`${n}. ${a}`),i)},$t=e=>{var{current:t,index:a,subsection:n,onClickLink:r}=e,i=Object(c.a)(e,["current","index","subsection","onClickLink"]);const l=n.slug.includes("/tutorial#")?St:Ct;return o.a.createElement(l,Object.assign({active:t===n.slug,title:n.title,slug:n.slug,index:a,onClick:r},i),void 0===n.subsections?null:o.a.createElement(_t,{current:t,subsections:n.subsections,onClickLink:r,indent:!0}))},Lt=Object(n.a)(yt.a,{target:"eocr2hx0"})("list-style-type:none;",Object(d.a)("indent","margin-left: 16px",""),";"),_t=e=>{var{numbered:t,current:a,subsections:n,indent:r=!1,onClickLink:i}=e,l=Object(c.a)(e,["numbered","current","subsections","indent","onClickLink"]);return o.a.createElement(Lt,Object.assign({indent:r},l),n.map((e,n)=>o.a.createElement($t,{key:e.slug,index:t?n:void 0,current:a,subsection:e,onClickLink:i})))},Dt=e=>{var{current:t,section:a,visible:n,toggle:o,onClickLink:l}=e,s=Object(c.a)(e,["current","section","visible","toggle","onClickLink"]);return i.createElement(r.a,Object.assign({},s),i.createElement(ft,{title:a.title,visible:n,toggle:o}),i.createElement(ut,{visible:n},i.createElement(_t,{numbered:a.numbered,current:t,subsections:a.subsections,onClickLink:l})))},{useEffect:Mt}=i,At=Object(n.a)(r.a,{target:"e41ih4i0"})("background-color:",Object(d.c)("theme.gray1"),";padding-top:16px;padding-bottom:16px;padding-left:16px;padding-right:16px;height:100%;@media (min-width:",Object(d.c)("theme.breakpoints.md"),"){padding-top:64px;padding-bottom:64px;padding-left:40px;padding-right:40px;}"),Rt=e=>{var{current:t,section:a,onClickLink:n}=e,r=Object(c.a)(e,["current","section","onClickLink"]);const{visible:o,show:l,toggle:s}=bt(a.subsections.some(e=>t===e.slug)),d=function(e){const t=Object(i.useRef)(void 0);return Object(i.useEffect)(()=>{t.current=e}),t.current}(t);return Mt(()=>{t!==d&&!o&&a.subsections.some(e=>t===e.slug)&&l()},[t,o,d,l,a]),i.createElement(Dt,Object.assign({},r,{current:t,section:a,visible:o,toggle:s,onClickLink:n}))},qt=e=>{var{sections:t,current:a,alwaysVisible:n,onClickLink:r}=e,o=Object(c.a)(e,["sections","current","alwaysVisible","onClickLink"]);return i.createElement(At,Object.assign({},o),t.map(e=>n?i.createElement(Dt,{key:e.title,current:a,section:e,visible:!0,onClickLink:r}):i.createElement(Rt,{key:e.title,current:a,section:e,onClickLink:r})))};const Ft=Object(n.a)(r.a,{target:"e2go6bm0"})(""),It=Object(n.a)(r.a,{target:"e2go6bm1"})("background-color:",Object(d.c)("theme.gray1"),";position:fixed;height:100vh;overflow-y:auto;margin-right:-1000px;padding-right:1000px;padding-top:72px;top:0;z-index:2;@media (min-width:",Object(d.c)("theme.breakpoints.sm"),"){padding-top:80px;}"),Bt=Object(n.a)(r.a,{target:"e2go6bm2"})("@media (min-width:",Object(d.c)("theme.breakpoints.sm"),"){display:none;}"),zt=O.g`
  0% {
    transform: translateY(40px);
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`,Vt=O.g`
  0% {
    opacity: 1;
  }

  100% {
    transform: translateY(40px);
    opacity: 0;
  }
`,Nt=Object(n.a)(ut,{target:"e2go6bm3"})("position:fixed;top:0;bottom:0;left:0;right:0;z-index:2;height:100vh;overflow-y:auto;&[aria-hidden='false']{animation:",zt," 500ms;}&[aria-hidden='true']{animation:",Vt," 500ms;}"),Tt=Object(n.a)(r.a,{target:"e2go6bm4"})("width:100%;background-color:",Object(d.c)("theme.gray1"),";"),Pt=Object(n.a)(ht.a,{target:"e2go6bm5"})("position:fixed;bottom:48px;right:24px;background-color:",Object(d.c)("theme.black"),";border:1px solid ",Object(d.c)("theme.gray4"),";box-shadow:0 0 20px rgba(0,0,0,0.3);border-radius:64px;color:",Object(d.c)("theme.primary"),";width:64px;height:64px;padding:0;transform:translate(0,0) scale(1);transition:transform 0.15s ease-in-out;cursor:pointer;outline:none;z-index:5;&:hover{transform:translate(0,-2px) scale(1);}&:active{transform:translate(0,-2px) scale(1);}&:focus{transform:translate(0,-2px) scale(1);}"),Yt=Object(n.a)(r.a,{target:"e2go6bm6"})({name:"10ccky2",styles:"display:grid;width:100%;height:100%;justify-items:center;align-items:center;& > svg{width:32px;height:32px;}"}),Ht=e=>{var{current:t,alwaysVisible:a,sections:n}=e,r=Object(c.a)(e,["current","alwaysVisible","sections"]);const{visible:o,hide:l,toggle:s}=bt();return i.createElement(Ft,Object.assign({},r),i.createElement(Ot.a,null,i.createElement(It,null,i.createElement(qt,{current:t,alwaysVisible:a,sections:n}))),i.createElement(Bt,null,i.createElement(Nt,{visible:o,animated:!0,unmount:!0},i.createElement(Tt,null,i.createElement(qt,{current:t,alwaysVisible:!0,sections:n,onClickLink:l}))),i.createElement(Pt,{onClick:s},i.createElement(Yt,null,o?i.createElement(jt.a,null):i.createElement(jt.d,null)))))};const Ut=Object(n.a)(r.a,{target:"eihlcg80"})({name:"1hu55j2",styles:"display:grid;grid-gap:0;justify-items:center;"}),Wt=e=>{var{title:t,current:a,sidebarAlwaysVisible:n,content:r,next:o,previous:d,sidebar:m,date:b,link:g,author:p}=e,u=Object(c.a)(e,["title","current","sidebarAlwaysVisible","content","next","previous","sidebar","date","link","author"]);return i.createElement(Ut,Object.assign({},u),i.createElement(s.a,{title:t+" - NEO•ONE"}),i.createElement(l.a,{omitSpacer:!0},i.createElement(He,{content:r,title:t,date:b,link:g,author:p}),i.createElement(Ht,{current:a,sections:m,alwaysVisible:n})),i.createElement(j,{next:o,previous:d}))}}}]);
//# sourceMappingURL=neo-~cd1183a8.49b857ec.js.map