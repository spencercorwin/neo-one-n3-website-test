self.webpackChunk([21],{121:function(e,t,n){"use strict";var r=n(293);n.d(t,"a",(function(){return r}));var a=n(297);n.d(t,"b",(function(){return a}))},15:function(e,t,n){"use strict";n.r(t);var r=n(121),a=n(1993);r.a.expose(a.a,self)},1993:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(1994);class a{async transpile(e,t){return Object(r.a)(e,t)}}},1994:function(e,t,n){"use strict";n.d(t,"a",(function(){return w}));var r=n(1995),a=n.n(r),s=n(2173),o=n.n(s),i=n(2179),l=n.n(i),u=n(2181),c=n.n(u),p=n(2186),f=n.n(p),d=n(2188),g=n.n(d),v=n(2191),b=n.n(v),h=n(2195),y=n.n(h),m=n(2204);let E=!1;const w=(e,t)=>{E||(E=!0,m.registerPreset("@babel/preset-react",y.a),m.registerPlugin("@babel/plugin-proposal-class-properties",o.a),m.registerPlugin("@babel/plugin-proposal-object-rest-spread",c.a),m.registerPlugin("@babel/plugin-proposal-optional-catch-binding",f.a),m.registerPlugin("@babel/plugin-proposal-async-generator-functions",a.a),m.registerPlugin("@babel/plugin-proposal-numeric-separator",l.a),m.registerPlugin("@babel/plugin-transform-typescript",b.a),m.registerPlugin("@babel/plugin-transform-modules-commonjs",g.a));const{code:n,map:r}=m.transform(t,{cwd:"/",filename:e,sourceFileName:e,sourceMaps:"both",presets:["@babel/preset-react"],plugins:["@babel/plugin-proposal-class-properties","@babel/plugin-proposal-object-rest-spread","@babel/plugin-proposal-optional-catch-binding","@babel/plugin-proposal-async-generator-functions","@babel/plugin-proposal-numeric-separator","@babel/plugin-transform-modules-commonjs",["@babel/plugin-transform-typescript",{isTSX:!0}]]});return{code:`${n}\n${`//# sourceURL=${location.origin}${e}`}`,sourceMap:r}}},2165:function(e,t){},293:function(e,t,n){"use strict";n.r(t),n.d(t,"transferHandlers",(function(){return i})),n.d(t,"proxy",(function(){return u})),n.d(t,"proxyValue",(function(){return c})),n.d(t,"expose",(function(){return p})),n.d(t,"isEndpoint",(function(){return b})),n.d(t,"isTransferable",(function(){return E})),n.d(t,"transferableProperties",(function(){return w}));n(50);const r=[ArrayBuffer,MessagePort],a=Math.floor(Math.random()*Number.MAX_SAFE_INTEGER),s=Symbol("proxyValue"),o=Symbol("throw"),i=new Map([["PROXY",{canHandle:e=>e&&(e[s]||e instanceof Function),serialize:e=>{const{port1:t,port2:n}=new MessageChannel;return p(e,t),n},deserialize:e=>u(e)}],["THROW",{canHandle:e=>e&&e[o]||e instanceof Error,serialize:e=>{const t=e&&e.message,n=e&&e.stack;return Object.assign({},e,{message:t,stack:n})},deserialize:e=>{throw Object.assign(Error(),e)}}]]);let l=0;function u(e,t){if(m(e)&&(e=v(e)),!b(e))throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");return h(e),function e(t,n=[],r=function(){}){return new Proxy(r,{construct:(e,r,a)=>t({type:"CONSTRUCT",callPath:n,argumentsList:r}),apply:(r,a,s)=>"bind"===n[n.length-1]?e(t,n.slice(0,-1)):t({type:"APPLY",callPath:"apply"===n[n.length-1]?n.slice(0,-1):n,argumentsList:"apply"===n[n.length-1]?s[1]:s}),get(r,a,o){if(a===s)return!0;if("then"===a&&0===n.length)return{then:()=>o};if("then"===a){const e=t({type:"GET",callPath:n});return Promise.resolve(e).then.bind(e)}return e(t,n.concat(a),r[a])},set:(e,r,a,o)=>r===s||t({type:"SET",callPath:n,property:r,value:a})})}(async t=>{let n=[];return"APPLY"!==t.type&&"CONSTRUCT"!==t.type||(n=t.argumentsList.map(f)),d((await function(e,t,n){const r=`${a}-${l++}`;return new Promise(a=>{y(e,(function t(n){n.data.id===r&&"RETURN"===n.data.type&&(!function(e,t){e.removeEventListener("message",t)}(e,t),a(n))})),t=Object.assign({},t,{id:r}),e.postMessage(t,n)})}(e,Object.assign({},t,{argumentsList:n}),w(n))).data.value)},[],t)}function c(e){return e instanceof MessagePort||(e[s]=!0),e}function p(e,t){if(m(t)&&(t=v(t)),!b(t))throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");h(t),y(t,(async function(n){if(!n.data.id||!n.data.callPath)return;let r;const a=n.data;try{const t=await a.callPath.slice(0,-1).reduce((e,t)=>e[t],e);let n=[];if("APPLY"!==a.type&&"CONSTRUCT"!==a.type||(n=a.argumentsList.map(d)),"APPLY"===a.type&&(r=a.callPath.length>0?await t[a.callPath[a.callPath.length-1]](...n):await t(...n)),"CONSTRUCT"===a.type&&(r=a.callPath.length>0?await new t[a.callPath[a.callPath.length-1]](...n):await new t(...n),r=c(r)),"SET"===a.type||"GET"===a.type){const e=a.callPath.length>0?await t[a.callPath[a.callPath.length-1]]:t;"SET"===a.type?(e[a.property]=a.value,r=!0):r=e}}catch(e){r=e,r[o]=!0}return r=function(e,t){return{type:"RETURN",id:e.id,value:f(t)}}(a,r),t.postMessage(r,w([r]))}))}function f(e){for(const[t,n]of i)if(n.canHandle(e))return{type:t,value:n.serialize(e)};let t=[];!function e(t,n,r=[],a=null){if(!t)return;a||(a=new WeakSet);if(a.has(t))return;if("string"==typeof t)return;"object"==typeof t&&a.add(t);if(ArrayBuffer.isView(t))return;if(n(t,r))return;const s=Object.keys(t);for(const o of s)e(t[o],n,[...r,o],a)}(e,(e,n)=>{for(const[r,a]of i)if(a.canHandle(e))return t.push({path:n,wrappedValue:{type:r,value:a.serialize(e)}}),!0;return!1});for(const n of t){n.path.slice(0,-1).reduce((e,t)=>e[t],e)[n.path[n.path.length-1]]=null}return{type:"RAW",value:e,wrappedChildren:t}}function d(e){if(i.has(e.type)){return i.get(e.type).deserialize(e.value)}if(function(e){return"RAW"===e.type}(e)){for(const t of e.wrappedChildren||[]){if(!i.has(t.wrappedValue.type))throw Error(`Unknown value type "${e.type}" at ${t.path.join(".")}`);const n=i.get(t.wrappedValue.type).deserialize(t.wrappedValue.value);g(e.value,t.path,n)}return e.value}throw Error(`Unknown value type "${e.type}"`)}function g(e,t,n){const r=t.slice(-1)[0];t.slice(0,-1).reduce((e,t)=>e[t],e)[r]=n}function v(e){if("Window"!==self.constructor.name)throw Error("self is not a window");return{addEventListener:self.addEventListener.bind(self),removeEventListener:self.removeEventListener.bind(self),postMessage:(t,n)=>e.postMessage(t,"*",n)}}function b(e){return"addEventListener"in e&&"removeEventListener"in e&&"postMessage"in e}function h(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.start()}function y(e,t){e.addEventListener("message",t)}function m(e){return["window","length","location","parent","opener"].every(t=>t in e)}function E(e){return r.some(t=>e instanceof t)}function w(e){const t=[];for(const n of function*e(t,n=[],r=null){if(!t)return;if(r||(r=new WeakSet),r.has(t))return;if("string"==typeof t)return;if("object"==typeof t&&r.add(t),ArrayBuffer.isView(t))return;yield{value:t,path:n};const a=Object.keys(t);for(const s of a)yield*e(t[s],[...n,s],r)}(e))E(n.value)&&t.push(n.value);return t}},297:function(e,t,n){"use strict";function r(e){return n=e,["postMessage","addEventListener","removeEventListener","start","close"].every(e=>e in n)?e:function(e){return["window","length","location","parent","opener"].every(t=>t in e)}(e)?function(e){if("Window"!==self.constructor.name)throw Error("self is not a window");return{addEventListener:self.addEventListener.bind(self),removeEventListener:self.removeEventListener.bind(self),postMessage:(t,n)=>e.postMessage(t,"*",n),start:()=>{},close:()=>{}}}(e):function(e){return["onmessage","postMessage","terminate","addEventListener","removeEventListener"].every(t=>t in e)}(e)?{addEventListener:(t=e).addEventListener.bind(t),removeEventListener:t.removeEventListener.bind(t),postMessage:t.postMessage.bind(t),start:()=>{},close:t.terminate.bind(t)}:function(e){return{addEventListener:e.addEventListener.bind(e),removeEventListener:e.removeEventListener.bind(e),postMessage:e.postMessage.bind(e),start:()=>{a(e)},close:()=>{e.close&&e.close()}}}(e);var t,n}function a(e){e.start&&e.start()}n.r(t),n.d(t,"getEndpoint",(function(){return r})),n.d(t,"activate",(function(){return a}))}});
//# sourceMappingURL=workers.21.6e9f3caf.js.map