(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const Dt=globalThis,Bt=Dt.ShadowRoot&&(Dt.ShadyCSS===void 0||Dt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ht=Symbol(),te=new WeakMap;let be=class{constructor(e,s,i){if(this._$cssResult$=!0,i!==Ht)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(Bt&&e===void 0){const i=s!==void 0&&s.length===1;i&&(e=te.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&te.set(s,e))}return e}toString(){return this.cssText}};const De=t=>new be(typeof t=="string"?t:t+"",void 0,Ht),Oe=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((i,a,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[r+1],t[0]);return new be(s,t,Ht)},Me=(t,e)=>{if(Bt)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const i=document.createElement("style"),a=Dt.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=s.cssText,t.appendChild(i)}},ee=Bt?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const i of e.cssRules)s+=i.cssText;return De(s)})(t):t;const{is:je,defineProperty:Ne,getOwnPropertyDescriptor:Le,getOwnPropertyNames:Re,getOwnPropertySymbols:ze,getPrototypeOf:Ue}=Object,Nt=globalThis,se=Nt.trustedTypes,Be=se?se.emptyScript:"",He=Nt.reactiveElementPolyfillSupport,xt=(t,e)=>t,Ot={toAttribute(t,e){switch(e){case Boolean:t=t?Be:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},Kt=(t,e)=>!je(t,e),ie={attribute:!0,type:String,converter:Ot,reflect:!1,useDefault:!1,hasChanged:Kt};Symbol.metadata??=Symbol("metadata"),Nt.litPropertyMetadata??=new WeakMap;let pt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=ie){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,s);a!==void 0&&Ne(this.prototype,e,a)}}static getPropertyDescriptor(e,s,i){const{get:a,set:r}=Le(this.prototype,e)??{get(){return this[s]},set(o){this[s]=o}};return{get:a,set(o){const h=a?.call(this);r?.call(this,o),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ie}static _$Ei(){if(this.hasOwnProperty(xt("elementProperties")))return;const e=Ue(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(xt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(xt("properties"))){const s=this.properties,i=[...Re(s),...ze(s)];for(const a of i)this.createProperty(a,s[a])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[i,a]of s)this.elementProperties.set(i,a)}this._$Eh=new Map;for(const[s,i]of this.elementProperties){const a=this._$Eu(s,i);a!==void 0&&this._$Eh.set(a,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const a of i)s.unshift(ee(a))}else e!==void 0&&s.push(ee(e));return s}static _$Eu(e,s){const i=s.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Me(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,i){this._$AK(e,i)}_$ET(e,s){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:Ot).toAttribute(s,i.type);this._$Em=e,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,s){const i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const r=i.getPropertyOptions(a),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Ot;this._$Em=a;const h=o.fromAttribute(s,r.type);this[a]=h??this._$Ej?.get(a)??h,this._$Em=null}}requestUpdate(e,s,i,a=!1,r){if(e!==void 0){const o=this.constructor;if(a===!1&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??Kt)(r,s)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,s,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:i,reflect:a,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??s??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(s=void 0),this._$AL.set(e,s)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,r]of i){const{wrapped:o}=r,h=this[a];o!==!0||this._$AL.has(a)||h===void 0||this.C(a,void 0,r,h)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(s)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(e){}firstUpdated(e){}};pt.elementStyles=[],pt.shadowRootOptions={mode:"open"},pt[xt("elementProperties")]=new Map,pt[xt("finalized")]=new Map,He?.({ReactiveElement:pt}),(Nt.reactiveElementVersions??=[]).push("2.1.2");const Ft=globalThis,ae=t=>t,Mt=Ft.trustedTypes,ne=Mt?Mt.createPolicy("lit-html",{createHTML:t=>t}):void 0,we="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,$e="?"+q,Ke=`<${$e}>`,at=document,Ct=()=>at.createComment(""),_t=t=>t===null||typeof t!="object"&&typeof t!="function",Wt=Array.isArray,Fe=t=>Wt(t)||typeof t?.[Symbol.iterator]=="function",Rt=`[ 	
\f\r]`,wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,re=/-->/g,oe=/>/g,st=RegExp(`>|${Rt}(?:([^\\s"'>=/]+)(${Rt}*=${Rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),le=/'/g,de=/"/g,xe=/^(?:script|style|textarea|title)$/i,We=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),n=We(1),mt=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),ce=new WeakMap,it=at.createTreeWalker(at,129);function ke(t,e){if(!Wt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ne!==void 0?ne.createHTML(e):e}const Je=(t,e)=>{const s=t.length-1,i=[];let a,r=e===2?"<svg>":e===3?"<math>":"",o=wt;for(let h=0;h<s;h++){const c=t[h];let f,p,d=-1,b=0;for(;b<c.length&&(o.lastIndex=b,p=o.exec(c),p!==null);)b=o.lastIndex,o===wt?p[1]==="!--"?o=re:p[1]!==void 0?o=oe:p[2]!==void 0?(xe.test(p[2])&&(a=RegExp("</"+p[2],"g")),o=st):p[3]!==void 0&&(o=st):o===st?p[0]===">"?(o=a??wt,d=-1):p[1]===void 0?d=-2:(d=o.lastIndex-p[2].length,f=p[1],o=p[3]===void 0?st:p[3]==='"'?de:le):o===de||o===le?o=st:o===re||o===oe?o=wt:(o=st,a=void 0);const w=o===st&&t[h+1].startsWith("/>")?" ":"";r+=o===wt?c+Ke:d>=0?(i.push(f),c.slice(0,d)+we+c.slice(d)+q+w):c+q+(d===-2?h:w)}return[ke(t,r+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class St{constructor({strings:e,_$litType$:s},i){let a;this.parts=[];let r=0,o=0;const h=e.length-1,c=this.parts,[f,p]=Je(e,s);if(this.el=St.createElement(f,i),it.currentNode=this.el.content,s===2||s===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(a=it.nextNode())!==null&&c.length<h;){if(a.nodeType===1){if(a.hasAttributes())for(const d of a.getAttributeNames())if(d.endsWith(we)){const b=p[o++],w=a.getAttribute(d).split(q),_=/([.?@])?(.*)/.exec(b);c.push({type:1,index:r,name:_[2],strings:w,ctor:_[1]==="."?qe:_[1]==="?"?Ye:_[1]==="@"?Ge:Lt}),a.removeAttribute(d)}else d.startsWith(q)&&(c.push({type:6,index:r}),a.removeAttribute(d));if(xe.test(a.tagName)){const d=a.textContent.split(q),b=d.length-1;if(b>0){a.textContent=Mt?Mt.emptyScript:"";for(let w=0;w<b;w++)a.append(d[w],Ct()),it.nextNode(),c.push({type:2,index:++r});a.append(d[b],Ct())}}}else if(a.nodeType===8)if(a.data===$e)c.push({type:2,index:r});else{let d=-1;for(;(d=a.data.indexOf(q,d+1))!==-1;)c.push({type:7,index:r}),d+=q.length-1}r++}}static createElement(e,s){const i=at.createElement("template");return i.innerHTML=e,i}}function yt(t,e,s=t,i){if(e===mt)return e;let a=i!==void 0?s._$Co?.[i]:s._$Cl;const r=_t(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(t),a._$AT(t,s,i)),i!==void 0?(s._$Co??=[])[i]=a:s._$Cl=a),a!==void 0&&(e=yt(t,a._$AS(t,e.values),a,i)),e}class Ve{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:i}=this._$AD,a=(e?.creationScope??at).importNode(s,!0);it.currentNode=a;let r=it.nextNode(),o=0,h=0,c=i[0];for(;c!==void 0;){if(o===c.index){let f;c.type===2?f=new At(r,r.nextSibling,this,e):c.type===1?f=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(f=new Ze(r,this,e)),this._$AV.push(f),c=i[++h]}o!==c?.index&&(r=it.nextNode(),o++)}return it.currentNode=at,a}p(e){let s=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,s),s+=i.strings.length-2):i._$AI(e[s])),s++}}class At{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,i,a){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=yt(this,e,s),_t(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==mt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Fe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&_t(this._$AH)?this._$AA.nextSibling.data=e:this.T(at.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=St.createElement(ke(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(s);else{const r=new Ve(a,this),o=r.u(this.options);r.p(s),this.T(o),this._$AH=r}}_$AC(e){let s=ce.get(e.strings);return s===void 0&&ce.set(e.strings,s=new St(e)),s}k(e){Wt(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,a=0;for(const r of e)a===s.length?s.push(i=new At(this.O(Ct()),this.O(Ct()),this,this.options)):i=s[a],i._$AI(r),a++;a<s.length&&(this._$AR(i&&i._$AB.nextSibling,a),s.length=a)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const i=ae(e).nextSibling;ae(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Lt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,i,a,r){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=s,this._$AM=a,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}_$AI(e,s=this,i,a){const r=this.strings;let o=!1;if(r===void 0)e=yt(this,e,s,0),o=!_t(e)||e!==this._$AH&&e!==mt,o&&(this._$AH=e);else{const h=e;let c,f;for(e=r[0],c=0;c<r.length-1;c++)f=yt(this,h[i+c],s,c),f===mt&&(f=this._$AH[c]),o||=!_t(f)||f!==this._$AH[c],f===x?e=x:e!==x&&(e+=(f??"")+r[c+1]),this._$AH[c]=f}o&&!a&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class qe extends Lt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}}class Ye extends Lt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}}class Ge extends Lt{constructor(e,s,i,a,r){super(e,s,i,a,r),this.type=5}_$AI(e,s=this){if((e=yt(this,e,s,0)??x)===mt)return;const i=this._$AH,a=e===x&&i!==x||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==x&&(i===x||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ze{constructor(e,s,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){yt(this,e)}}const Xe=Ft.litHtmlPolyfillSupport;Xe?.(St,At),(Ft.litHtmlVersions??=[]).push("3.3.2");const Qe=(t,e,s)=>{const i=s?.renderBefore??e;let a=i._$litPart$;if(a===void 0){const r=s?.renderBefore??null;i._$litPart$=a=new At(e.insertBefore(Ct(),r),r,void 0,s??{})}return a._$AI(t),a};const Jt=globalThis;class g extends pt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Qe(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return mt}}g._$litElement$=!0,g.finalized=!0,Jt.litElementHydrateSupport?.({LitElement:g});const ts=Jt.litElementPolyfillSupport;ts?.({LitElement:g});(Jt.litElementVersions??=[]).push("4.2.2");const $=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const es={attribute:!0,type:String,converter:Ot,reflect:!1,hasChanged:Kt},ss=(t=es,e,s)=>{const{kind:i,metadata:a}=s;let r=globalThis.litPropertyMetadata.get(a);if(r===void 0&&globalThis.litPropertyMetadata.set(a,r=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),i==="accessor"){const{name:o}=s;return{set(h){const c=e.get.call(this);e.set.call(this,h),this.requestUpdate(o,c,t,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,t,h),h}}}if(i==="setter"){const{name:o}=s;return function(h){const c=this[o];e.call(this,h),this.requestUpdate(o,c,t,!0,h)}}throw Error("Unsupported decorator location: "+i)};function u(t){return(e,s)=>typeof s=="object"?ss(t,e,s):((i,a,r)=>{const o=a.hasOwnProperty(r);return a.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(a,r):void 0})(t,e,s)}function l(t){return u({...t,state:!0,attribute:!1})}const Ce=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",Vt="ccl-web-token",qt="ccl-tenant-token",Yt="ccl-tenant-id",Gt="ccl-user";function Zt(){return localStorage.getItem(Vt)}function R(){return localStorage.getItem(qt)}function _e(){return localStorage.getItem(Yt)}function Se(t){localStorage.setItem(Vt,t)}function zt(t){localStorage.setItem(qt,t)}function Ut(t){localStorage.setItem(Yt,t)}function Ae(t){localStorage.setItem(Gt,JSON.stringify(t))}function Te(){const t=localStorage.getItem(Gt);return t?JSON.parse(t):null}function jt(){localStorage.removeItem(Vt),localStorage.removeItem(qt),localStorage.removeItem(Yt),localStorage.removeItem(Gt)}class Ee extends Error{constructor(e,s){super(s),this.status=e}}async function v(t,e={}){const{token:s,...i}=e,a=s??R()??Zt(),r=new Headers(i.headers);r.set("Content-Type","application/json"),a&&r.set("Authorization",`Bearer ${a}`);const o=await fetch(`${Ce}${t}`,{...i,headers:r});if(o.status===401&&(jt(),window.dispatchEvent(new CustomEvent("ccl:unauthorized"))),!o.ok){let h=o.statusText;try{const c=await o.json();h=c.error??c.message??h}catch{}throw new Ee(o.status,h)}if(o.status!==204)return o.json()}const Y={async register(t,e,s){return v("/api/auth/web/register",{method:"POST",body:JSON.stringify({email:t,username:e,password:s}),token:null})},async login(t,e){return v("/api/auth/web/login",{method:"POST",body:JSON.stringify({email:t,password:e}),token:null})},async tenantToken(t){return v("/api/auth/tenant-token",{method:"POST",body:JSON.stringify({tenantId:t})})},async listTenants(){return(await v("/api/tenants/mine")).tenants}},kt={async create(t){return v("/api/tenants/create",{method:"POST",body:JSON.stringify({name:t})})},async get(t){return v(`/api/tenants/${t}`)},async inviteMember(t,e,s){return v(`/api/tenants/${t}/members`,{method:"POST",body:JSON.stringify({email:e,role:s})})},async removeMember(t,e){return v(`/api/tenants/${t}/members/${e}`,{method:"DELETE"})}},ut={async list(){return(await v("/api/projects")).projects},async create(t){return v("/api/projects",{method:"POST",body:JSON.stringify(t)})},async update(t,e){return v(`/api/projects/${t}`,{method:"PATCH",body:JSON.stringify(e)})},async remove(t){return v(`/api/projects/${t}`,{method:"DELETE"})}},P={async list(t){const e=new URLSearchParams;return t?.projectId&&e.set("projectId",t.projectId),t?.status&&e.set("status",t.status),t?.archived&&e.set("archived","true"),(await v(`/api/tasks${e.size?`?${e}`:""}`)).tasks},async create(t){return v("/api/tasks",{method:"POST",body:JSON.stringify(t)})},async update(t,e){return v(`/api/tasks/${t}`,{method:"PATCH",body:JSON.stringify(e)})},async remove(t){return v(`/api/tasks/${t}`,{method:"DELETE"})},async run(t,e){return v("/api/runtime/executions",{method:"POST",body:JSON.stringify({taskId:Number(t),payload:e})})},async executions(t){return v(`/api/runtime/tasks/${t}/executions`)}},vt={async list(){return(await v("/api/claws")).claws},async register(t){return v("/api/claws",{method:"POST",body:JSON.stringify({name:t})})},async remove(t){return v(`/api/claws/${t}`,{method:"DELETE"})},async status(t){return v(`/api/claws/${t}/status`)},wsUrl(t){const e=Ce.replace(/^http/,"ws"),s=R()??"";return`${e}/api/claws/${t}/ws?token=${encodeURIComponent(s)}`}},Xt={async list(){return(await v("/marketplace/skills")).skills}},gt={async listTenant(){return(await v("/api/skill-assignments/tenant")).assignments},async assignTenant(t){return v("/api/skill-assignments/tenant",{method:"POST",body:JSON.stringify({slug:t})})},async unassignTenant(t){return v(`/api/skill-assignments/tenant/${t}`,{method:"DELETE"})},async assignClaw(t,e){return v(`/api/skill-assignments/claws/${t}`,{method:"POST",body:JSON.stringify({slug:e})})}},Qt={async list(t){const e=new URLSearchParams;return t?.taskId&&e.set("taskId",t.taskId),t?.clawId&&e.set("clawId",t.clawId),v(`/api/runtime/executions${e.size?`?${e}`:""}`)}},he=Object.freeze(Object.defineProperty({__proto__:null,ApiError:Ee,auth:Y,claws:vt,clearSession:jt,executions:Qt,getTenantId:_e,getTenantToken:R,getUser:Te,getWebToken:Zt,marketplace:Xt,projects:ut,setTenantId:Ut,setTenantToken:zt,setUser:Ae,setWebToken:Se,skillAssignments:gt,tasks:P,tenants:kt},Symbol.toStringTag,{value:"Module"}));var is=Object.defineProperty,as=Object.getOwnPropertyDescriptor,ot=(t,e,s,i)=>{for(var a=i>1?void 0:i?as(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&is(e,s,a),a};let G=class extends g{constructor(){super(...arguments),this.mode="login",this.email="",this.username="",this.password="",this.loading=!1,this.error=""}createRenderRoot(){return this}async submit(t){if(t.preventDefault(),!(!this.email||!this.password)){this.loading=!0,this.error="";try{const e=this.mode==="login"?await Y.login(this.email,this.password):await Y.register(this.email,this.username||this.email.split("@")[0],this.password);this.dispatchEvent(new CustomEvent(this.mode==="register"?"register":"login",{detail:e,bubbles:!0,composed:!0}))}catch(e){this.error=e.message??"An error occurred"}finally{this.loading=!1}}}render(){return n`
      <div class="auth-shell">
        <div class="auth-card">
          <div class="auth-logo">
            <img src="/claw-logo.png" alt="CoderClawLink" onerror="this.style.display='none'" style="width:36px;height:36px">
            <div>
              <div class="auth-logo-name">CoderClawLink</div>
              <div class="auth-logo-sub">AI Coding Mesh</div>
            </div>
          </div>

          <div class="auth-title">${this.mode==="login"?"Welcome back":"Create account"}</div>
          <div class="auth-sub">${this.mode==="login"?"Sign in to your workspace":"Get started with CoderClawLink"}</div>

          ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

          <form @submit=${this.submit} style="display:grid;gap:14px">
            <div class="field">
              <label class="label">Email</label>
              <input
                class="input"
                type="email"
                placeholder="you@example.com"
                .value=${this.email}
                @input=${t=>{this.email=t.target.value}}
                autocomplete="email"
                required
              >
            </div>
            ${this.mode==="register"?n`
            <div class="field">
              <label class="label">Username <span class="label-hint">(optional)</span></label>
              <input
                class="input"
                type="text"
                placeholder="yourhandle"
                .value=${this.username}
                @input=${t=>{this.username=t.target.value}}
                autocomplete="username"
              >
            </div>`:""}
            <div class="field">
              <label class="label">Password</label>
              <input
                class="input"
                type="password"
                placeholder="••••••••"
                .value=${this.password}
                @input=${t=>{this.password=t.target.value}}
                autocomplete=${this.mode==="login"?"current-password":"new-password"}
                required
                minlength="8"
              >
            </div>
            <button
              class="btn btn-primary btn-full btn-lg"
              type="submit"
              ?disabled=${this.loading}
              style="margin-top:4px"
            >
              ${this.loading?"Please wait…":this.mode==="login"?"Sign in":"Create account"}
            </button>
          </form>

          <div class="auth-toggle">
            ${this.mode==="login"?n`Don't have an account? <a @click=${()=>{this.mode="register",this.error=""}}>Sign up</a>`:n`Already have an account? <a @click=${()=>{this.mode="login",this.error=""}}>Sign in</a>`}
          </div>
        </div>
      </div>
    `}};ot([l()],G.prototype,"mode",2);ot([l()],G.prototype,"email",2);ot([l()],G.prototype,"username",2);ot([l()],G.prototype,"password",2);ot([l()],G.prototype,"loading",2);ot([l()],G.prototype,"error",2);G=ot([$("ccl-auth")],G);var ns=Object.defineProperty,rs=Object.getOwnPropertyDescriptor,lt=(t,e,s,i)=>{for(var a=i>1?void 0:i?rs(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&ns(e,s,a),a};let Z=class extends g{constructor(){super(...arguments),this.tenants=[],this.user=null,this.showCreate=!1,this.newName="",this.creating=!1,this.error=""}createRenderRoot(){return this}selectTenant(t){this.dispatchEvent(new CustomEvent("select-tenant",{detail:t,bubbles:!0,composed:!0}))}async createTenant(t){if(t.preventDefault(),!!this.newName.trim()){this.creating=!0,this.error="";try{this.dispatchEvent(new CustomEvent("create-tenant",{detail:{name:this.newName.trim()},bubbles:!0,composed:!0}))}catch(e){this.error=e.message,this.creating=!1}}}signOut(){this.dispatchEvent(new CustomEvent("sign-out",{bubbles:!0,composed:!0}))}render(){return n`
      <div class="workspace-picker">
        <div style="width:100%;max-width:560px">
          <!-- Header -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px">
            <div>
              <div style="font-size:22px;font-weight:700;letter-spacing:-0.035em;color:var(--text-strong)">
                Choose a workspace
              </div>
              <div style="font-size:13px;color:var(--muted);margin-top:4px">
                ${this.user?.email??""}
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" @click=${this.signOut}>Sign out</button>
          </div>

          <!-- Tenant list -->
          <div class="workspace-list">
            ${this.tenants.length===0?n`<div style="text-align:center;color:var(--muted);padding:32px 0;font-size:14px">
                  No workspaces yet — create your first one below.
                </div>`:this.tenants.map(t=>n`
                <div class="workspace-card" @click=${()=>this.selectTenant(t)}>
                  <div class="workspace-avatar">${t.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <div class="workspace-name">${t.name}</div>
                    <div class="workspace-role">${t.role} · ${t.status}</div>
                  </div>
                  <div class="workspace-arrow">
                    <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </div>
              `)}
          </div>

          <!-- Create new workspace -->
          <div style="margin-top:20px">
            ${this.showCreate?n`
                <div class="card">
                  <div class="card-title" style="margin-bottom:16px">New workspace</div>
                  ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
                  <form @submit=${this.createTenant} style="display:grid;gap:12px">
                    <div class="field">
                      <label class="label">Workspace name</label>
                      <input
                        class="input"
                        placeholder="e.g. Acme Corp"
                        .value=${this.newName}
                        @input=${t=>{this.newName=t.target.value}}
                        required
                      >
                    </div>
                    <div style="display:flex;gap:8px">
                      <button class="btn btn-primary" type="submit" ?disabled=${this.creating}>
                        ${this.creating?"Creating…":"Create workspace"}
                      </button>
                      <button class="btn btn-ghost" type="button" @click=${()=>{this.showCreate=!1,this.error=""}}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              `:n`
                <button
                  class="btn btn-secondary btn-full"
                  @click=${()=>{this.showCreate=!0}}
                  style="border-style:dashed"
                >
                  <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Create new workspace
                </button>
              `}
          </div>
        </div>
      </div>
    `}};lt([u({type:Array})],Z.prototype,"tenants",2);lt([u({type:Object})],Z.prototype,"user",2);lt([l()],Z.prototype,"showCreate",2);lt([l()],Z.prototype,"newName",2);lt([l()],Z.prototype,"creating",2);lt([l()],Z.prototype,"error",2);Z=lt([$("ccl-workspace-picker")],Z);var os=Object.defineProperty,ls=Object.getOwnPropertyDescriptor,H=(t,e,s,i)=>{for(var a=i>1?void 0:i?ls(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&os(e,s,a),a};let I=class extends g{constructor(){super(...arguments),this.tenantId="",this.items=[],this.loading=!0,this.error="",this.showModal=!1,this.editTarget=null,this.form={name:"",description:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.items=await ut.list()}catch(t){this.error=t.message}finally{this.loading=!1}}openCreate(){this.editTarget=null,this.form={name:"",description:""},this.showModal=!0}openEdit(t){this.editTarget=t,this.form={name:t.name,description:t.description??""},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await ut.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s)}else{const e=await ut.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async remove(t){if(t?.id&&confirm(`Delete project "${t.name??"this project"}"? This cannot be undone.`))try{await ut.remove(t.id),this.items=this.items.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}statusBadge(t){return n`<span class="badge ${{active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"}[t]??"badge-gray"}">${t.replace("_"," ")}</span>`}render(){return n`
      <div class="page-header">
        <div>
          <div class="page-title">Projects</div>
          <div class="page-sub">Organize work into projects</div>
        </div>
        <button class="btn btn-primary" @click=${this.openCreate}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New project
        </button>
      </div>

      ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

      ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.items.length===0?n`
            <div class="empty-state">
              <div class="empty-state-icon">📁</div>
              <div class="empty-state-title">No projects yet</div>
              <div class="empty-state-sub">Create a project to start organizing tasks</div>
              <button class="btn btn-primary" style="margin-top:16px" @click=${this.openCreate}>Create project</button>
            </div>`:n`
            <div class="grid grid-3">
              ${this.items.map(t=>n`
                <div class="card" style="cursor:default">
                  <div class="card-header">
                    <div>
                      <div class="card-title">${t.name}</div>
                      <div style="font-size:11px;font-family:var(--mono);color:var(--muted);margin-top:2px">${t.key}</div>
                    </div>
                    ${this.statusBadge(t.status)}
                  </div>
                  ${t.description?n`<div style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px">${t.description}</div>`:""}
                  <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
                    ${t.taskCount!=null?n`<span style="font-size:12px;color:var(--muted)">${t.taskCount} task${t.taskCount!==1?"s":""}</span>`:""}
                    <div style="flex:1"></div>
                    <button class="btn btn-ghost btn-sm" @click=${()=>this.openEdit(t)}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${()=>this.remove(t)}>Delete</button>
                  </div>
                </div>
              `)}
            </div>`}

      ${this.showModal?this.renderModal():""}
    `}renderModal(){return n`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
        <div class="modal">
          <div class="modal-title">${this.editTarget?"Edit project":"New project"}</div>
          <div class="modal-sub">Projects group related tasks together</div>
          ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
          <form @submit=${this.save} style="display:grid;gap:14px">
            <div class="field">
              <label class="label">Name</label>
              <input class="input" placeholder="Project name" .value=${this.form.name}
                @input=${t=>{this.form={...this.form,name:t.target.value}}} required>
            </div>
            <div class="field">
              <label class="label">Description <span class="label-hint">(optional)</span></label>
              <textarea class="textarea" placeholder="What is this project about?"
                .value=${this.form.description}
                @input=${t=>{this.form={...this.form,description:t.target.value}}}></textarea>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" type="button" @click=${()=>this.showModal=!1}>Cancel</button>
              <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>
                ${this.saving?"Saving…":this.editTarget?"Save changes":"Create project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `}};H([u()],I.prototype,"tenantId",2);H([l()],I.prototype,"items",2);H([l()],I.prototype,"loading",2);H([l()],I.prototype,"error",2);H([l()],I.prototype,"showModal",2);H([l()],I.prototype,"editTarget",2);H([l()],I.prototype,"form",2);H([l()],I.prototype,"saving",2);I=H([$("ccl-projects")],I);var ds=Object.defineProperty,cs=Object.getOwnPropertyDescriptor,y=(t,e,s,i)=>{for(var a=i>1?void 0:i?cs(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&ds(e,s,a),a};const Tt=["todo","in_progress","in_review","done","blocked"],$t={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"},pe=["low","medium","high","critical"],hs={low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"};let m=class extends g{constructor(){super(...arguments),this.tenantId="",this.items=[],this.projects=[],this.claws=[],this.loading=!0,this.error="",this.view="kanban",this.filterStatus="",this.filterProject="",this.filterPriority="",this.search="",this.showArchived=!1,this.showModal=!1,this.editTarget=null,this.form={},this.saving=!1,this.drawerTask=null,this.drawerExecutions=[],this.drawerTab="detail",this.running=!1,this.dragTaskId=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.projects,this.claws]=await Promise.all([P.list({archived:this.showArchived}),ut.list(),vt.list()])}catch(t){this.error=t.message}finally{this.loading=!1}}get filtered(){return this.items.filter(t=>!(this.filterStatus&&t.status!==this.filterStatus||this.filterProject&&t.projectId!==this.filterProject||this.filterPriority&&t.priority!==this.filterPriority||this.search&&!t.title.toLowerCase().includes(this.search.toLowerCase())))}tasksForStatus(t){return this.filtered.filter(e=>e.status===t)}openCreate(){this.editTarget=null,this.form={status:"todo",priority:"medium"},this.showModal=!0}openEdit(t,e){e?.stopPropagation(),this.editTarget=t,this.form={...t},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await P.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.drawerTask?.id===e.id&&(this.drawerTask=e)}else{const e=await P.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async remove(t,e){e?.stopPropagation(),t?.id&&confirm(`Delete "${t.title??"this task"}"?`)&&(await P.remove(t.id),this.items=this.items.filter(s=>s.id!==t.id),this.drawerTask?.id===t.id&&(this.drawerTask=null))}async patchStatus(t,e){const s=await P.update(t,{status:e});this.items=this.items.map(i=>i.id===t?s:i),this.drawerTask?.id===t&&(this.drawerTask=s)}async runTask(t,e){e.stopPropagation(),this.running=!0;try{const s=await P.run(t.id),i=await P.update(t.id,{status:"in_progress"});this.items=this.items.map(a=>a.id===i.id?i:a),this.drawerTask?.id===t.id&&(this.drawerTask=i,this.drawerExecutions=[s,...this.drawerExecutions])}catch(s){this.error=s.message}finally{this.running=!1}}async openDrawer(t){this.drawerTask=t,this.drawerTab="detail";try{this.drawerExecutions=await P.executions(t.id)}catch{this.drawerExecutions=[]}}closeDrawer(){this.drawerTask=null}dragStart(t){this.dragTaskId=t}dragOver(t){t.preventDefault()}async drop(t,e){t.preventDefault(),this.dragTaskId&&(await this.patchStatus(this.dragTaskId,e),this.dragTaskId="")}projectName(t){return t?this.projects.find(e=>e.id===t)?.name??t:"—"}clawName(t){return t?this.claws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return n`<span class="badge ${hs[t]}">${t}</span>`}statusBadge(t){return n`<span class="badge ${{todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red"}[t]}">${$t[t]}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}render(){return n`
      <!-- Header -->
      <div class="page-header">
        <div>
          <div class="page-title">Tasks</div>
          <div class="page-sub">${this.filtered.length} task${this.filtered.length!==1?"s":""}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <!-- View toggle -->
          <div style="display:flex;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden">
            ${["kanban","list","gantt"].map(t=>n`
              <button
                class="btn btn-ghost btn-sm"
                style="border-radius:0;${this.view===t?"background:var(--accent-subtle);color:var(--accent);":""}"
                @click=${()=>{this.view=t}}
                title="${t}"
              >${t}</button>
            `)}
          </div>
          <button class="btn btn-primary" @click=${this.openCreate}>
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New task
          </button>
        </div>
      </div>

      ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

      <!-- Filters -->
      <div class="filters" style="margin-bottom:16px">
        <input class="input" style="max-width:200px;height:32px;padding:4px 10px"
          placeholder="Search…" .value=${this.search}
          @input=${t=>{this.search=t.target.value}}>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterStatus=t.target.value}}>
          <option value="">All statuses</option>
          ${Tt.map(t=>n`<option value=${t}>${$t[t]}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterProject=t.target.value}}>
          <option value="">All projects</option>
          ${this.projects.map(t=>n`<option value=${t.id}>${t.name}</option>`)}
        </select>
        <select class="select" style="max-width:140px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterPriority=t.target.value}}>
          <option value="">All priorities</option>
          ${pe.map(t=>n`<option value=${t}>${t}</option>`)}
        </select>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted);cursor:pointer">
          <input type="checkbox" .checked=${this.showArchived}
            @change=${async t=>{this.showArchived=t.target.checked,await this.load()}}>
          Archived
        </label>
      </div>

      ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.view==="kanban"?this.renderKanban():this.view==="list"?this.renderList():this.renderGantt()}

      ${this.showModal?this.renderModal():""}
      ${this.drawerTask?this.renderDrawer():""}
    `}renderKanban(){return n`
      <div class="kanban">
        ${Tt.map(t=>n`
          <div class="kanban-col"
            @dragover=${this.dragOver}
            @drop=${e=>this.drop(e,t)}>
            <div class="kanban-col-header">
              <div class="kanban-col-title">${$t[t]}</div>
              <div class="kanban-col-count">${this.tasksForStatus(t).length}</div>
            </div>
            <div class="kanban-col-body">
              ${this.tasksForStatus(t).map(e=>n`
                <div class="task-card"
                  draggable="true"
                  @dragstart=${()=>this.dragStart(e.id)}
                  @click=${()=>this.openDrawer(e)}>
                  <div class="task-card-title">${e.title}</div>
                  <div class="task-card-meta">
                    <span class="task-key">${e.key}</span>
                    ${this.priorityBadge(e.priority)}
                    ${e.assignedClawId?n`<span style="font-size:11px;color:var(--muted)">${this.clawName(e.assignedClawId)}</span>`:""}
                    ${e.dueDate?n`<span style="font-size:11px;color:var(--muted);margin-left:auto">${this.formatDate(e.dueDate)}</span>`:""}
                  </div>
                </div>
              `)}
              <button
                class="btn btn-ghost btn-sm"
                style="border-style:dashed;width:100%;margin-top:4px"
                @click=${()=>{this.form={status:t,priority:"medium"},this.editTarget=null,this.showModal=!0}}>
                + Add task
              </button>
            </div>
          </div>
        `)}
      </div>
    `}renderList(){const t=this.filtered;return t.length===0?n`<div class="empty-state"><div class="empty-state-title">No tasks found</div></div>`:n`
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Project</th>
              <th>Claw</th>
              <th>Due</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${t.map(e=>n`
              <tr style="cursor:pointer" @click=${()=>this.openDrawer(e)}>
                <td>
                  <div style="font-weight:500;color:var(--text-strong)">${e.title}</div>
                  <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${e.key}</div>
                </td>
                <td>${this.statusBadge(e.status)}</td>
                <td>${this.priorityBadge(e.priority)}</td>
                <td style="font-size:12px;color:var(--muted)">${this.projectName(e.projectId)}</td>
                <td style="font-size:12px;color:var(--muted)">${this.clawName(e.assignedClawId)}</td>
                <td style="font-size:12px;color:var(--muted)">${this.formatDate(e.dueDate)}</td>
                <td>
                  <div style="display:flex;gap:4px" @click=${s=>s.stopPropagation()}>
                    <button class="btn btn-ghost btn-sm" @click=${s=>this.openEdit(e,s)}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${s=>this.remove(e,s)}>Delete</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}renderGantt(){const t=this.filtered.filter(d=>d.dueDate||d.createdAt);if(t.length===0)return n`<div class="empty-state"><div class="empty-state-title">No tasks with dates</div><div class="empty-state-sub">Set due dates on tasks to see the timeline</div></div>`;const e=t.map(d=>new Date(d.dueDate??d.createdAt)),s=new Date(Math.min(...e.map(d=>d.getTime()))),i=new Date(Math.max(...e.map(d=>d.getTime())));s.setDate(1),i.setMonth(i.getMonth()+1),i.setDate(0);const a=Math.ceil((i.getTime()-s.getTime())/864e5)+1,r=24,o=a*r,h=[],c=new Date(s);for(;c<=i;){const d=Math.floor((c.getTime()-s.getTime())/864e5),b=new Date(c.getFullYear(),c.getMonth()+1,0).getDate();h.push({label:c.toLocaleDateString(void 0,{month:"short",year:"2-digit"}),left:d*r,width:b*r}),c.setMonth(c.getMonth()+1),c.setDate(1)}const p=Math.floor((new Date().getTime()-s.getTime())/864e5)*r;return n`
      <div style="overflow-x:auto">
        <div style="min-width:${o+200}px">
          <!-- Month headers -->
          <div style="display:flex;margin-left:200px;border-bottom:1px solid var(--border)">
            ${h.map(d=>n`
              <div style="min-width:${d.width}px;padding:4px 8px;font-size:11px;color:var(--muted);border-right:1px solid var(--border)">${d.label}</div>
            `)}
          </div>
          <!-- Tasks -->
          <div style="position:relative">
            <!-- Today line -->
            ${p>=0&&p<=o?n`
              <div style="position:absolute;left:${200+p}px;top:0;bottom:0;width:2px;background:var(--accent);opacity:0.6;z-index:1"></div>
            `:""}

            ${t.map(d=>{const b=new Date(d.createdAt),w=new Date(d.dueDate??d.createdAt),_=Math.floor((b.getTime()-s.getTime())/864e5),ht=Math.max(1,Math.ceil((w.getTime()-b.getTime())/864e5)),Ie={done:"var(--ok)",in_progress:"var(--accent)",blocked:"var(--danger)",in_review:"var(--warn)",todo:"var(--muted)"};return n`
                <div style="display:flex;align-items:center;border-bottom:1px solid var(--border);height:40px">
                  <div style="width:200px;flex-shrink:0;padding:0 12px;font-size:12px;font-weight:500;color:var(--text);truncate">
                    ${d.title}
                  </div>
                  <div style="flex:1;position:relative;height:100%">
                    <div
                      style="position:absolute;top:8px;height:24px;
                        left:${_*r}px;
                        width:${ht*r}px;
                        background:${Ie[d.status]??"var(--muted)"};
                        opacity:0.8;border-radius:4px;cursor:pointer;
                        display:flex;align-items:center;padding:0 8px;
                        font-size:10px;font-weight:600;color:#fff;
                        white-space:nowrap;overflow:hidden"
                      @click=${()=>this.openDrawer(d)}
                      title="${d.title}"
                    >
                      ${d.key}
                    </div>
                  </div>
                </div>
              `})}
          </div>
        </div>
      </div>
    `}renderModal(){return n`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
        <div class="modal" style="max-width:540px">
          <div class="modal-title">${this.editTarget?"Edit task":"New task"}</div>
          ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
          <form @submit=${this.save} style="display:grid;gap:14px">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="What needs to be done?" .value=${this.form.title??""}
                @input=${t=>{this.form={...this.form,title:t.target.value}}} required>
            </div>
            <div class="field">
              <label class="label">Description <span class="label-hint">(optional)</span></label>
              <textarea class="textarea" placeholder="Additional context…" .value=${this.form.description??""}
                @input=${t=>{this.form={...this.form,description:t.target.value}}}></textarea>
            </div>
            <div class="form-row form-row-2">
              <div class="field">
                <label class="label">Status</label>
                <select class="select" .value=${this.form.status??"todo"}
                  @change=${t=>{this.form={...this.form,status:t.target.value}}}>
                  ${Tt.map(t=>n`<option value=${t}>${$t[t]}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Priority</label>
                <select class="select" .value=${this.form.priority??"medium"}
                  @change=${t=>{this.form={...this.form,priority:t.target.value}}}>
                  ${pe.map(t=>n`<option value=${t}>${t}</option>`)}
                </select>
              </div>
            </div>
            <div class="form-row form-row-2">
              <div class="field">
                <label class="label">Project</label>
                <select class="select" .value=${this.form.projectId??""}
                  @change=${t=>{this.form={...this.form,projectId:t.target.value||void 0}}}>
                  <option value="">No project</option>
                  ${this.projects.map(t=>n`<option value=${t.id}>${t.name}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Assign to Claw</label>
                <select class="select" .value=${this.form.assignedClawId??""}
                  @change=${t=>{this.form={...this.form,assignedClawId:t.target.value||void 0}}}>
                  <option value="">Unassigned</option>
                  ${this.claws.map(t=>n`<option value=${t.id}>${t.name}</option>`)}
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label">Due date <span class="label-hint">(optional)</span></label>
              <input class="input" type="date" .value=${this.form.dueDate?.split("T")[0]??""}
                @change=${t=>{this.form={...this.form,dueDate:t.target.value||void 0}}}>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" type="button" @click=${()=>this.showModal=!1}>Cancel</button>
              <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>
                ${this.saving?"Saving…":this.editTarget?"Save changes":"Create task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `}renderDrawer(){const t=this.drawerTask;return n`
      <div class="panel-overlay" @click=${this.closeDrawer}></div>
      <div class="panel-drawer" style="--panel-width:480px">
        <div class="panel-header">
          <div>
            <div class="panel-title">${t.title}</div>
            <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${t.key}</div>
          </div>
          <button class="panel-close" @click=${this.closeDrawer}>
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="panel-tabs">
          ${["detail","executions"].map(e=>n`
            <button class="panel-tab ${this.drawerTab===e?"active":""}"
              @click=${()=>{this.drawerTab=e}}>${e}</button>
          `)}
        </div>
        <div class="panel-body" style="padding:20px">
          ${this.drawerTab==="detail"?this.renderDrawerDetail(t):this.renderDrawerExecutions(t)}
        </div>
      </div>
    `}renderDrawerDetail(t){return n`
      <div style="display:grid;gap:16px">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${this.statusBadge(t.status)}
          ${this.priorityBadge(t.priority)}
        </div>

        ${t.description?n`
          <div class="card">
            <div class="card-title" style="margin-bottom:8px">Description</div>
            <div style="font-size:13px;color:var(--text);line-height:1.6;white-space:pre-wrap">${t.description}</div>
          </div>`:""}

        <div class="card">
          <div class="card-title" style="margin-bottom:12px">Details</div>
          <div style="display:grid;gap:10px">
            ${[["Project",this.projectName(t.projectId)],["Assigned",this.clawName(t.assignedClawId)],["Due date",this.formatDate(t.dueDate)||"None"],["Created",this.formatDate(t.createdAt)]].map(([e,s])=>n`
              <div style="display:flex;justify-content:space-between;font-size:13px">
                <span style="color:var(--muted)">${e}</span>
                <span style="color:var(--text)">${s}</span>
              </div>`)}
          </div>
        </div>

        <!-- Change status -->
        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Move to</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${Tt.filter(e=>e!==t.status).map(e=>n`
              <button class="btn btn-secondary btn-sm"
                @click=${()=>this.patchStatus(t.id,e)}>${$t[e]}</button>
            `)}
          </div>
        </div>

        <div style="display:flex;gap:8px">
          <button class="btn btn-primary" ?disabled=${this.running} @click=${e=>this.runTask(t,e)}>
            ${this.running?"Running…":"Run task"}
          </button>
          <button class="btn btn-secondary" @click=${e=>this.openEdit(t,e)}>Edit</button>
          <button class="btn btn-danger" @click=${e=>this.remove(t,e)}>Delete</button>
        </div>
      </div>
    `}renderDrawerExecutions(t){if(this.drawerExecutions.length===0)return n`<div class="empty-state"><div class="empty-state-title">No executions yet</div></div>`;const e={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return n`
      <div style="display:grid;gap:10px">
        ${this.drawerExecutions.map(s=>n`
          <div class="card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span class="badge ${e[s.status]??"badge-gray"}">${s.status}</span>
              <span style="font-size:11px;color:var(--muted)">${this.formatDate(s.createdAt)}</span>
            </div>
            ${s.result?n`
              <div class="log-wrap" style="max-height:120px;overflow-y:auto;font-size:11px">${s.result}</div>
            `:""}
          </div>
        `)}
      </div>
    `}};y([u()],m.prototype,"tenantId",2);y([l()],m.prototype,"items",2);y([l()],m.prototype,"projects",2);y([l()],m.prototype,"claws",2);y([l()],m.prototype,"loading",2);y([l()],m.prototype,"error",2);y([l()],m.prototype,"view",2);y([l()],m.prototype,"filterStatus",2);y([l()],m.prototype,"filterProject",2);y([l()],m.prototype,"filterPriority",2);y([l()],m.prototype,"search",2);y([l()],m.prototype,"showArchived",2);y([l()],m.prototype,"showModal",2);y([l()],m.prototype,"editTarget",2);y([l()],m.prototype,"form",2);y([l()],m.prototype,"saving",2);y([l()],m.prototype,"drawerTask",2);y([l()],m.prototype,"drawerExecutions",2);y([l()],m.prototype,"drawerTab",2);y([l()],m.prototype,"running",2);y([l()],m.prototype,"dragTaskId",2);m=y([$("ccl-tasks")],m);const ue=[800,1500,3e3,5e3,1e4,15e3];class Pe{constructor(e){this.opts=e,this.ws=null,this.attempt=0,this.destroyed=!1,this.pingInterval=null,this.connect()}connect(){this.destroyed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>{this.attempt=0,this.schedulePings(),this.opts.onEvent({type:"connected"})}),this.ws.addEventListener("message",e=>{let s;try{s=JSON.parse(e.data)}catch{s=e.data}if(s&&typeof s=="object"&&s.type==="claw_offline"){this.opts.onEvent({type:"claw_offline"});return}this.opts.onEvent({type:"message",data:s})}),this.ws.addEventListener("close",e=>{this.clearPings(),!this.destroyed&&(this.opts.onEvent({type:"disconnected",code:e.code,reason:e.reason}),this.scheduleReconnect())}),this.ws.addEventListener("error",()=>{}))}send(e){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(e))}destroy(){this.destroyed=!0,this.clearPings(),this.ws?.close(1e3,"destroyed"),this.ws=null}get readyState(){return this.ws?.readyState??WebSocket.CLOSED}schedulePings(){this.clearPings(),this.pingInterval=setInterval(()=>{this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"ping"}))},3e4)}clearPings(){this.pingInterval!==null&&(clearInterval(this.pingInterval),this.pingInterval=null)}scheduleReconnect(){const e=ue[Math.min(this.attempt,ue.length-1)];this.attempt++,setTimeout(()=>this.connect(),e)}}var ps=Object.defineProperty,us=Object.getOwnPropertyDescriptor,K=(t,e,s,i)=>{for(var a=i>1?void 0:i?us(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&ps(e,s,a),a};let D=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.messages=[],this.tools=[],this.input="",this.connState="connecting",this.session="default",this.streaming=!1,this.gw=null,this.msgEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.scrollToBottom()}connect(){this.connState="connecting",this.gw=new Pe({url:this.wsUrl,onEvent:t=>this.handleGwEvent(t)})}handleGwEvent(t){if(t.type==="connected"){this.connState="connected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type!=="message")return;const e=t.data;switch(e.type){case"chat.message":{if(e.role==="user")this.messages=[...this.messages,{id:crypto.randomUUID(),role:"user",text:e.text??""}];else{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:e.text??"",streaming:!1}]:this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.text??""}],this.streaming=!1}break}case"chat.delta":{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:s.text+(e.delta??"")}]:(this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.delta??"",streaming:!0}],this.streaming=!0);break}case"tool.start":{this.tools=[...this.tools,{id:e.toolCallId??crypto.randomUUID(),name:e.toolName??"tool",input:e.toolInput,expanded:!1}];break}case"tool.result":{this.tools=this.tools.map(s=>s.id===e.toolCallId?{...s,result:e.toolResult}:s);break}case"chat.abort":this.streaming=!1;break}}send(){const t=this.input.trim();!t||this.connState!=="connected"||(this.gw?.send({type:"chat",message:t,session:this.session}),this.input="")}abort(){this.gw?.send({type:"chat.abort"}),this.streaming=!1}newChat(){this.messages=[],this.tools=[],this.streaming=!1,this.gw?.send({type:"session.new"})}scrollToBottom(){this.msgEnd?.scrollIntoView({behavior:"smooth"})}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}connDot(){return n`<span class="dot ${{connected:"dot-green",connecting:"dot-yellow",offline:"dot-red",disconnected:"dot-gray"}[this.connState]}"></span> ${this.connState}`}render(){return n`
      <div class="chat-shell" style="height:100%">
        <!-- Toolbar -->
        <div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--border);flex-shrink:0">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted)">${this.connDot()}</div>
          <div style="flex:1"></div>
          <input class="input" style="width:140px;height:28px;padding:3px 8px;font-size:12px"
            placeholder="session name" .value=${this.session}
            @input=${t=>{this.session=t.target.value}}>
          <button class="btn btn-ghost btn-sm" @click=${this.newChat}>New chat</button>
        </div>

        <!-- Messages -->
        <div class="chat-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px">
          ${this.connState==="offline"?n`
            <div class="empty-state">
              <div class="empty-state-icon">🔌</div>
              <div class="empty-state-title">Claw is offline</div>
              <div class="empty-state-sub">Waiting for the CoderClaw instance to connect</div>
            </div>`:""}

          ${this.messages.length===0&&this.connState!=="offline"?n`
            <div class="empty-state" style="margin-top:32px">
              <div class="empty-state-icon">💬</div>
              <div class="empty-state-title">Start a conversation</div>
              <div class="empty-state-sub">Send a message to the claw</div>
            </div>`:""}

          ${this.messages.map(t=>n`
            <div class="msg ${t.role==="user"?"msg-user":""}">
              <div class="msg-bubble ${t.role==="user"?"msg-bubble-user":"msg-bubble-assistant"}">
                ${t.text}${t.streaming?n`<span class="cursor-blink"></span>`:""}
              </div>
              <div class="msg-meta">${t.role}</div>
            </div>
          `)}

          ${this.tools.length>0?n`
            <div style="display:flex;flex-direction:column;gap:6px">
              ${this.tools.map(t=>n`
                <div class="card" style="font-size:12px">
                  <div style="display:flex;align-items:center;gap:8px;cursor:pointer"
                    @click=${()=>{this.tools=this.tools.map(e=>e.id===t.id?{...e,expanded:!e.expanded}:e)}}>
                    <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="${t.expanded?"18 15 12 9 6 15":"6 9 12 15 18 9"}"/></svg>
                    <span style="font-family:var(--mono);color:var(--accent)">${t.name}</span>
                    ${t.result?n`<span class="badge badge-green" style="margin-left:auto">done</span>`:n`<span class="badge badge-yellow" style="margin-left:auto">running</span>`}
                  </div>
                  ${t.expanded&&t.input?n`<pre class="log-wrap" style="margin-top:8px;font-size:11px;max-height:100px;overflow:auto">${t.input}</pre>`:""}
                  ${t.expanded&&t.result?n`<pre class="log-wrap" style="margin-top:6px;font-size:11px;max-height:100px;overflow:auto;border-color:var(--ok)">${t.result}</pre>`:""}
                </div>
              `)}
            </div>`:""}

          <div style="height:1px" .ref=${t=>{this.msgEnd=t}}></div>
        </div>

        <!-- Input -->
        <div class="chat-input-row" style="flex-shrink:0">
          <textarea
            class="chat-textarea"
            placeholder="${this.connState==="connected"?"Message the claw…":"Waiting for connection…"}"
            rows="2"
            .value=${this.input}
            ?disabled=${this.connState!=="connected"}
            @input=${t=>{this.input=t.target.value}}
            @keydown=${this.onKeydown}
          ></textarea>
          ${this.streaming?n`<button class="btn btn-danger" @click=${this.abort}>Stop</button>`:n`<button class="btn btn-primary" @click=${this.send} ?disabled=${!this.input.trim()||this.connState!=="connected"}>Send</button>`}
        </div>
      </div>
    `}};K([u()],D.prototype,"clawId",2);K([u()],D.prototype,"wsUrl",2);K([l()],D.prototype,"messages",2);K([l()],D.prototype,"tools",2);K([l()],D.prototype,"input",2);K([l()],D.prototype,"connState",2);K([l()],D.prototype,"session",2);K([l()],D.prototype,"streaming",2);D=K([$("ccl-claw-chat")],D);var vs=Object.defineProperty,gs=Object.getOwnPropertyDescriptor,F=(t,e,s,i)=>{for(var a=i>1?void 0:i?gs(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&vs(e,s,a),a};const ms=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Et(t,e={}){const s=await fetch(`${ms}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${R()??""}`,...e.headers??{}}});if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}const ys=["claude","openai","ollama","http"];let O=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.agents=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",type:"claude",endpoint:"",apiKey:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.agents=await Et("/api/agents")}catch(t){this.error=t.message}finally{this.loading=!1}}async toggleActive(t){try{await Et(`/api/agents/${t.id}`,{method:"PATCH",body:JSON.stringify({isActive:!t.isActive})}),this.agents=this.agents.map(e=>e.id===t.id?{...e,isActive:!e.isActive}:e)}catch(e){this.error=e.message}}async remove(t){if(confirm(`Delete agent "${t.name}"?`))try{await Et(`/api/agents/${t.id}`,{method:"DELETE"}),this.agents=this.agents.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Et("/api/agents",{method:"POST",body:JSON.stringify(this.form)});this.agents=[e,...this.agents],this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}render(){return n`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Agents</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Add agent</button>
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

        ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.agents.length===0?n`<div class="empty-state"><div class="empty-state-title">No agents</div><div class="empty-state-sub">Add an AI agent to this claw</div></div>`:this.agents.map(t=>n`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${t.name}</div>
                    <div style="font-size:12px;color:var(--muted)">${t.type}${t.endpoint?` · ${t.endpoint}`:""}</div>
                  </div>
                  <span class="badge ${t.isActive?"badge-green":"badge-gray"}">${t.isActive?"active":"inactive"}</span>
                </div>
                <div style="display:flex;gap:6px">
                  <button class="btn btn-secondary btn-sm" @click=${()=>this.toggleActive(t)}>
                    ${t.isActive?"Deactivate":"Activate"}
                  </button>
                  <button class="btn btn-danger btn-sm" @click=${()=>this.remove(t)}>Delete</button>
                </div>
              </div>
            `)}

        ${this.showModal?n`
          <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
            <div class="modal">
              <div class="modal-title">Add agent</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Name</label>
                  <input class="input" required .value=${this.form.name} @input=${t=>{this.form={...this.form,name:t.target.value}}}></div>
                <div class="field"><label class="label">Type</label>
                  <select class="select" @change=${t=>{this.form={...this.form,type:t.target.value}}}>
                    ${ys.map(t=>n`<option value=${t}>${t}</option>`)}
                  </select></div>
                <div class="field"><label class="label">Endpoint <span class="label-hint">(optional)</span></label>
                  <input class="input" placeholder="https://…" .value=${this.form.endpoint} @input=${t=>{this.form={...this.form,endpoint:t.target.value}}}></div>
                <div class="field"><label class="label">API Key <span class="label-hint">(optional)</span></label>
                  <input class="input" type="password" .value=${this.form.apiKey} @input=${t=>{this.form={...this.form,apiKey:t.target.value}}}></div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${()=>this.showModal=!1}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>${this.saving?"Saving…":"Add agent"}</button>
                </div>
              </form>
            </div>
          </div>`:""}
      </div>
    `}};F([u()],O.prototype,"clawId",2);F([u()],O.prototype,"wsUrl",2);F([l()],O.prototype,"agents",2);F([l()],O.prototype,"loading",2);F([l()],O.prototype,"error",2);F([l()],O.prototype,"showModal",2);F([l()],O.prototype,"form",2);F([l()],O.prototype,"saving",2);O=F([$("ccl-claw-agents")],O);var fs=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,E=(t,e,s,i)=>{for(var a=i>1?void 0:i?bs(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&fs(e,s,a),a};const ws=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function ve(t,e={}){const s=await fetch(`${ws}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${R()??""}`,...e.headers??{}}});if(s.status===404)return{};if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}let S=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.config={},this.loading=!0,this.error="",this.editing=!1,this.draft={},this.saving=!1,this.newKey="",this.newVal=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await ve(`/api/claws/${this.clawId}/config`);this.config=t??{}}catch(t){this.error=t.message}finally{this.loading=!1}}startEdit(){this.draft={...this.config},this.editing=!0}cancel(){this.editing=!1,this.draft={}}async save(){this.saving=!0;try{await ve(`/api/claws/${this.clawId}/config`,{method:"PATCH",body:JSON.stringify(this.draft)}),this.config={...this.draft},this.editing=!1}catch(t){this.error=t.message}finally{this.saving=!1}}addField(){this.newKey.trim()&&(this.draft={...this.draft,[this.newKey.trim()]:this.newVal},this.newKey="",this.newVal="")}removeField(t){const e={...this.draft};delete e[t],this.draft=e}render(){const t=Object.entries(this.editing?this.draft:this.config);return n`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Configuration</div>
          ${this.editing?n`<div style="display:flex;gap:6px">
                <button class="btn btn-ghost btn-sm" @click=${this.cancel}>Cancel</button>
                <button class="btn btn-primary btn-sm" ?disabled=${this.saving} @click=${this.save}>${this.saving?"Saving…":"Save"}</button>
              </div>`:n`<button class="btn btn-secondary btn-sm" @click=${this.startEdit}>Edit</button>`}
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:""}

        ${t.length===0&&!this.loading?n`<div class="empty-state"><div class="empty-state-title">No configuration</div><div class="empty-state-sub">${this.editing?"Add key-value pairs below":"Click Edit to add configuration"}</div></div>`:n`
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>Key</th><th>Value</th>${this.editing?n`<th></th>`:""}</tr></thead>
                <tbody>
                  ${t.map(([e,s])=>n`
                    <tr>
                      <td><code style="font-family:var(--mono);font-size:12px">${e}</code></td>
                      <td>${this.editing?n`<input class="input" style="height:28px;padding:3px 8px" .value=${s}
                            @input=${i=>{this.draft={...this.draft,[e]:i.target.value}}}>`:n`<span style="font-family:var(--mono);font-size:12px">${s}</span>`}
                      </td>
                      ${this.editing?n`<td><button class="btn btn-danger btn-sm" @click=${()=>this.removeField(e)}>Remove</button></td>`:""}
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>`}

        ${this.editing?n`
          <div class="card">
            <div class="card-title" style="margin-bottom:10px">Add field</div>
            <div style="display:flex;gap:8px">
              <input class="input" placeholder="key" .value=${this.newKey}
                @input=${e=>{this.newKey=e.target.value}}>
              <input class="input" placeholder="value" .value=${this.newVal}
                @input=${e=>{this.newVal=e.target.value}}>
              <button class="btn btn-secondary btn-sm" @click=${this.addField}>Add</button>
            </div>
          </div>`:""}
      </div>
    `}};E([u()],S.prototype,"clawId",2);E([u()],S.prototype,"wsUrl",2);E([l()],S.prototype,"config",2);E([l()],S.prototype,"loading",2);E([l()],S.prototype,"error",2);E([l()],S.prototype,"editing",2);E([l()],S.prototype,"draft",2);E([l()],S.prototype,"saving",2);E([l()],S.prototype,"newKey",2);E([l()],S.prototype,"newVal",2);S=E([$("ccl-claw-config")],S);var $s=Object.defineProperty,xs=Object.getOwnPropertyDescriptor,ft=(t,e,s,i)=>{for(var a=i>1?void 0:i?xs(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&$s(e,s,a),a};const ks=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function ge(t,e={}){const s=await fetch(`${ks}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${R()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let nt=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.sessions=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await ge(`/api/claws/${this.clawId}/sessions`);this.sessions=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async remove(t){if(confirm("Delete this session?"))try{await ge(`/api/claws/${this.clawId}/sessions/${t.id}`,{method:"DELETE"}),this.sessions=this.sessions.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){return n`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Sessions</div>
          <button class="btn btn-secondary btn-sm" @click=${this.load}>Refresh</button>
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.sessions.length===0?n`<div class="empty-state"><div class="empty-state-title">No sessions</div><div class="empty-state-sub">Sessions appear here once the claw connects and starts chatting</div></div>`:this.sessions.map(t=>n`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${t.name??t.id}</div>
                    <div style="font-size:11px;color:var(--muted)">${this.fmt(t.createdAt)}${t.messageCount!=null?` · ${t.messageCount} messages`:""}</div>
                  </div>
                  <button class="btn btn-danger btn-sm" @click=${()=>this.remove(t)}>Delete</button>
                </div>
              </div>
            `)}
      </div>
    `}};ft([u()],nt.prototype,"clawId",2);ft([u()],nt.prototype,"wsUrl",2);ft([l()],nt.prototype,"sessions",2);ft([l()],nt.prototype,"loading",2);ft([l()],nt.prototype,"error",2);nt=ft([$("ccl-claw-sessions")],nt);const Cs="modulepreload",_s=function(t,e){return new URL(t,e).href},me={},ye=function(e,s,i){let a=Promise.resolve();if(s&&s.length>0){let f=function(p){return Promise.all(p.map(d=>Promise.resolve(d).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};const o=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),c=h?.nonce||h?.getAttribute("nonce");a=f(s.map(p=>{if(p=_s(p,i),p in me)return;me[p]=!0;const d=p.endsWith(".css"),b=d?'[rel="stylesheet"]':"";if(i)for(let _=o.length-1;_>=0;_--){const ht=o[_];if(ht.href===p&&(!d||ht.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${b}`))return;const w=document.createElement("link");if(w.rel=d?"stylesheet":Cs,d||(w.as="script"),w.crossOrigin="",w.href=p,c&&w.setAttribute("nonce",c),document.head.appendChild(w),d)return new Promise((_,ht)=>{w.addEventListener("load",_),w.addEventListener("error",()=>ht(new Error(`Unable to preload CSS for ${p}`)))})}))}function r(o){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=o,window.dispatchEvent(h),!h.defaultPrevented)throw o}return a.then(o=>{for(const h of o||[])h.status==="rejected"&&r(h.reason);return e().catch(r)})};var Ss=Object.defineProperty,As=Object.getOwnPropertyDescriptor,W=(t,e,s,i)=>{for(var a=i>1?void 0:i?As(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Ss(e,s,a),a};let M=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.assigned=[],this.available=[],this.loading=!0,this.error="",this.showModal=!1,this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([this.loadAssigned(),Xt.list().catch(()=>[])]);this.assigned=t,this.available=e}catch(t){this.error=t.message}finally{this.loading=!1}}async loadAssigned(){try{const{getTenantToken:t}=await ye(async()=>{const{getTenantToken:i}=await Promise.resolve().then(()=>he);return{getTenantToken:i}},void 0,import.meta.url),e=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",s=await fetch(`${e}/api/skill-assignments/claws/${this.clawId}`,{headers:{Authorization:`Bearer ${t()??""}`}});return s.ok?s.json():[]}catch{return[]}}async assign(t){this.saving=!0;try{await gt.assignClaw(this.clawId,t),this.assigned=await this.loadAssigned(),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async unassign(t){try{const{getTenantToken:e}=await ye(async()=>{const{getTenantToken:i}=await Promise.resolve().then(()=>he);return{getTenantToken:i}},void 0,import.meta.url),s=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";await fetch(`${s}/api/skill-assignments/claws/${this.clawId}/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${e()??""}`}}),this.assigned=this.assigned.filter(i=>i.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}render(){const t=this.assignedSlugs(),e=this.available.filter(s=>!t.has(s.slug));return n`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Skills</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Assign skill</button>
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.assigned.length===0?n`<div class="empty-state"><div class="empty-state-title">No skills assigned</div><div class="empty-state-sub">Assign skills to give this claw extra capabilities</div></div>`:this.assigned.map(s=>n`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${s.name}</div>
                    <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${s.slug}</div>
                  </div>
                  <button class="btn btn-danger btn-sm" @click=${()=>this.unassign(s.slug)}>Unassign</button>
                </div>
              </div>
            `)}

        ${this.showModal?n`
          <div class="modal-backdrop" @click=${s=>{s.target===s.currentTarget&&(this.showModal=!1)}}>
            <div class="modal" style="max-width:500px">
              <div class="modal-title">Assign skill</div>
              <div class="modal-sub">Add a skill from the marketplace to this claw</div>
              ${e.length===0?n`<div style="color:var(--muted);font-size:13px;padding:16px 0">All available skills are already assigned</div>`:n`<div style="display:grid;gap:8px;max-height:360px;overflow-y:auto">
                    ${e.map(s=>n`
                      <div class="card" style="display:flex;align-items:center;gap:12px;cursor:pointer" @click=${()=>this.assign(s.slug)}>
                        ${s.icon?n`<img src="${s.icon}" style="width:32px;height:32px;border-radius:6px">`:n`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
                        <div>
                          <div style="font-size:13px;font-weight:600;color:var(--text-strong)">${s.name}</div>
                          <div style="font-size:11px;color:var(--muted)">${s.description??s.slug}</div>
                        </div>
                        <button class="btn btn-primary btn-sm" style="margin-left:auto" ?disabled=${this.saving}>Assign</button>
                      </div>
                    `)}
                  </div>`}
              <div class="modal-footer">
                <button class="btn btn-ghost" @click=${()=>this.showModal=!1}>Close</button>
              </div>
            </div>
          </div>`:""}
      </div>
    `}};W([u()],M.prototype,"clawId",2);W([u()],M.prototype,"wsUrl",2);W([l()],M.prototype,"assigned",2);W([l()],M.prototype,"available",2);W([l()],M.prototype,"loading",2);W([l()],M.prototype,"error",2);W([l()],M.prototype,"showModal",2);W([l()],M.prototype,"saving",2);M=W([$("ccl-claw-skills")],M);var Ts=Object.defineProperty,Es=Object.getOwnPropertyDescriptor,dt=(t,e,s,i)=>{for(var a=i>1?void 0:i?Es(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Ts(e,s,a),a};let X=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.items=[],this.loading=!0,this.error="",this.timeFilter="week"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{this.items=await Qt.list({clawId:this.clawId})}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){const t=Date.now(),s={today:864e5,week:6048e5,month:2592e6,all:1/0}[this.timeFilter];return this.items.filter(i=>t-new Date(i.createdAt).getTime()<s)}stats(t){const e=t.length,s=t.filter(r=>r.status==="completed").length,i=t.filter(r=>r.status==="failed").length,a=t.filter(r=>r.status==="running").length;return{total:e,completed:s,failed:i,running:a}}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered(),e=this.stats(t),s={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return n`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Usage</div>
          <div style="display:flex;gap:4px">
            ${["today","week","month","all"].map(i=>n`
              <button class="btn btn-sm ${this.timeFilter===i?"btn-primary":"btn-ghost"}" @click=${()=>{this.timeFilter=i}}>
                ${i}
              </button>
            `)}
          </div>
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

        <div class="stat-grid">
          ${[["Total",e.total],["Completed",e.completed],["Failed",e.failed],["Running",e.running]].map(([i,a])=>n`
            <div class="stat-card">
              <div class="stat-value">${a}</div>
              <div class="stat-label">${i}</div>
            </div>
          `)}
        </div>

        ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:t.length===0?n`<div class="empty-state"><div class="empty-state-title">No executions</div></div>`:n`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Task</th><th>Status</th><th>Duration</th><th>Started</th></tr></thead>
                  <tbody>
                    ${t.slice().reverse().map(i=>n`
                      <tr>
                        <td style="font-size:12px;font-family:var(--mono)">${i.taskId}</td>
                        <td><span class="badge ${s[i.status]??"badge-gray"}">${i.status}</span></td>
                        <td style="font-size:12px;color:var(--muted)">${this.duration(i)}</td>
                        <td style="font-size:12px;color:var(--muted)">${this.fmt(i.createdAt)}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>`}
      </div>
    `}};dt([u()],X.prototype,"clawId",2);dt([u()],X.prototype,"wsUrl",2);dt([l()],X.prototype,"items",2);dt([l()],X.prototype,"loading",2);dt([l()],X.prototype,"error",2);dt([l()],X.prototype,"timeFilter",2);X=dt([$("ccl-claw-usage")],X);var Ps=Object.defineProperty,Is=Object.getOwnPropertyDescriptor,J=(t,e,s,i)=>{for(var a=i>1?void 0:i?Is(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Ps(e,s,a),a};const Ds=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Pt(t,e={}){const s=await fetch(`${Ds}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${R()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let j=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.jobs=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",schedule:"0 9 * * 1-5",taskId:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Pt(`/api/claws/${this.clawId}/cron`);this.jobs=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await Pt(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.jobs=this.jobs.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async remove(t){if(confirm(`Delete cron job "${t.name}"?`))try{await Pt(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"DELETE"}),this.jobs=this.jobs.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Pt(`/api/claws/${this.clawId}/cron`,{method:"POST",body:JSON.stringify(this.form)});e&&(this.jobs=[e,...this.jobs]),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return n`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Cron Jobs</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Add job</button>
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.jobs.length===0?n`<div class="empty-state"><div class="empty-state-icon">⏰</div><div class="empty-state-title">No cron jobs</div><div class="empty-state-sub">Schedule recurring tasks for this claw</div></div>`:this.jobs.map(t=>n`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${t.name}</div>
                    <code style="font-size:11px;font-family:var(--mono);color:var(--muted)">${t.schedule}</code>
                  </div>
                  <span class="badge ${t.enabled?"badge-green":"badge-gray"}">${t.enabled?"active":"paused"}</span>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;color:var(--muted);margin-bottom:12px">
                  <div>Last run: ${this.fmt(t.lastRunAt)}</div>
                  <div>Next run: ${this.fmt(t.nextRunAt)}</div>
                </div>
                <div style="display:flex;gap:6px">
                  <button class="btn btn-secondary btn-sm" @click=${()=>this.toggle(t)}>${t.enabled?"Pause":"Resume"}</button>
                  <button class="btn btn-danger btn-sm" @click=${()=>this.remove(t)}>Delete</button>
                </div>
              </div>
            `)}

        ${this.showModal?n`
          <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
            <div class="modal">
              <div class="modal-title">New cron job</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Name</label>
                  <input class="input" required .value=${this.form.name} @input=${t=>{this.form={...this.form,name:t.target.value}}}></div>
                <div class="field">
                  <label class="label">Schedule <span class="label-hint">(cron expression)</span></label>
                  <input class="input" placeholder="0 9 * * 1-5" .value=${this.form.schedule}
                    @input=${t=>{this.form={...this.form,schedule:t.target.value}}}>
                  <div style="font-size:11px;color:var(--muted);margin-top:4px">minute hour day month weekday</div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${()=>this.showModal=!1}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>${this.saving?"Saving…":"Create"}</button>
                </div>
              </form>
            </div>
          </div>`:""}
      </div>
    `}};J([u()],j.prototype,"clawId",2);J([u()],j.prototype,"wsUrl",2);J([l()],j.prototype,"jobs",2);J([l()],j.prototype,"loading",2);J([l()],j.prototype,"error",2);J([l()],j.prototype,"showModal",2);J([l()],j.prototype,"form",2);J([l()],j.prototype,"saving",2);j=J([$("ccl-claw-cron")],j);var Os=Object.defineProperty,Ms=Object.getOwnPropertyDescriptor,bt=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ms(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Os(e,s,a),a};const js=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function fe(t,e={}){const s=await fetch(`${js}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${R()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let rt=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.nodes=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await fe(`/api/claws/${this.clawId}/nodes`);this.nodes=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async unpair(t){if(confirm(`Unpair node "${t.name??t.id}"?`))try{await fe(`/api/claws/${this.clawId}/nodes/${t.id}`,{method:"DELETE"}),this.nodes=this.nodes.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return n`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Paired Nodes</div>
          <button class="btn btn-secondary btn-sm" @click=${this.load}>Refresh</button>
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.nodes.length===0?n`<div class="empty-state"><div class="empty-state-icon">🖥️</div><div class="empty-state-title">No nodes paired</div><div class="empty-state-sub">Pair a device to extend this claw's capabilities</div></div>`:this.nodes.map(t=>n`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${t.name??t.id}</div>
                    <div style="font-size:11px;color:var(--muted)">Last seen: ${this.fmt(t.lastSeenAt)}</div>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px">
                    <span class="dot ${t.status==="connected"?"dot-green":"dot-gray"}"></span>
                    <span style="font-size:12px;color:var(--muted)">${t.status}</span>
                  </div>
                </div>
                ${t.capabilities?.length?n`
                  <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">
                    ${t.capabilities.map(e=>n`<span class="badge badge-gray">${e}</span>`)}
                  </div>`:""}
                <button class="btn btn-danger btn-sm" @click=${()=>this.unpair(t)}>Unpair</button>
              </div>
            `)}
      </div>
    `}};bt([u()],rt.prototype,"clawId",2);bt([u()],rt.prototype,"wsUrl",2);bt([l()],rt.prototype,"nodes",2);bt([l()],rt.prototype,"loading",2);bt([l()],rt.prototype,"error",2);rt=bt([$("ccl-claw-nodes")],rt);var Ns=Object.defineProperty,Ls=Object.getOwnPropertyDescriptor,z=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ls(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Ns(e,s,a),a};const Rs=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function It(t,e={}){const s=await fetch(`${Rs}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${R()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}const zs=["discord","slack","telegram","whatsapp","signal","googlechat","nostr"],Us={discord:[{key:"token",label:"Bot Token",type:"password"},{key:"guildId",label:"Guild ID"}],slack:[{key:"botToken",label:"Bot Token",type:"password"},{key:"appToken",label:"App Token",type:"password"}],telegram:[{key:"token",label:"Bot Token",type:"password"}],whatsapp:[{key:"phoneNumberId",label:"Phone Number ID"},{key:"accessToken",label:"Access Token",type:"password"}],signal:[{key:"phone",label:"Phone Number"}],googlechat:[{key:"serviceAccountKey",label:"Service Account Key (JSON)",type:"password"}],nostr:[{key:"privateKey",label:"Private Key (nsec)",type:"password"},{key:"relays",label:"Relay URLs (comma-separated)"}]};let A=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.channels=[],this.loading=!0,this.error="",this.showModal=!1,this.selectedType="discord",this.form={},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await It(`/api/claws/${this.clawId}/channels`);this.channels=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await It(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.channels=this.channels.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async remove(t){if(confirm(`Delete ${t.type} channel?`))try{await It(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"DELETE"}),this.channels=this.channels.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await It(`/api/claws/${this.clawId}/channels`,{method:"POST",body:JSON.stringify({type:this.selectedType,config:this.form})});e&&(this.channels=[e,...this.channels]),this.showModal=!1,this.form={}}catch(e){this.error=e.message}finally{this.saving=!1}}statusDot(t){return n`<span class="dot ${{connected:"dot-green",error:"dot-red",stopped:"dot-gray",pending:"dot-yellow"}[t]??"dot-gray"}"></span>`}render(){const t=Us[this.selectedType]??[];return n`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Channels</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0,this.form={}}}>Add channel</button>
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.channels.length===0?n`<div class="empty-state"><div class="empty-state-icon">💬</div><div class="empty-state-title">No channels</div><div class="empty-state-sub">Connect Discord, Slack, Telegram and more</div></div>`:this.channels.map(e=>n`
              <div class="card">
                <div class="card-header">
                  <div style="display:flex;align-items:center;gap:8px">
                    ${this.statusDot(e.status)}
                    <div>
                      <div class="card-title">${e.name??e.type}</div>
                      <div style="font-size:11px;color:var(--muted)">${e.status}</div>
                    </div>
                  </div>
                  <span class="badge ${e.enabled?"badge-green":"badge-gray"}">${e.enabled?"enabled":"disabled"}</span>
                </div>
                <div style="display:flex;gap:6px">
                  <button class="btn btn-secondary btn-sm" @click=${()=>this.toggle(e)}>${e.enabled?"Disable":"Enable"}</button>
                  <button class="btn btn-danger btn-sm" @click=${()=>this.remove(e)}>Delete</button>
                </div>
              </div>
            `)}

        ${this.showModal?n`
          <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&(this.showModal=!1)}}>
            <div class="modal">
              <div class="modal-title">Add channel</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field">
                  <label class="label">Channel type</label>
                  <select class="select" @change=${e=>{this.selectedType=e.target.value,this.form={}}}>
                    ${zs.map(e=>n`<option value=${e}>${e}</option>`)}
                  </select>
                </div>
                ${t.map(e=>n`
                  <div class="field">
                    <label class="label">${e.label}</label>
                    <input class="input" type=${e.type??"text"} .value=${this.form[e.key]??""}
                      @input=${s=>{this.form={...this.form,[e.key]:s.target.value}}}>
                  </div>
                `)}
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${()=>this.showModal=!1}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>${this.saving?"Saving…":"Add channel"}</button>
                </div>
              </form>
            </div>
          </div>`:""}
      </div>
    `}};z([u()],A.prototype,"clawId",2);z([u()],A.prototype,"wsUrl",2);z([l()],A.prototype,"channels",2);z([l()],A.prototype,"loading",2);z([l()],A.prototype,"error",2);z([l()],A.prototype,"showModal",2);z([l()],A.prototype,"selectedType",2);z([l()],A.prototype,"form",2);z([l()],A.prototype,"saving",2);A=z([$("ccl-claw-channels")],A);var Bs=Object.defineProperty,Hs=Object.getOwnPropertyDescriptor,ct=(t,e,s,i)=>{for(var a=i>1?void 0:i?Hs(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Bs(e,s,a),a};let Q=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.lines=[],this.level="all",this.connState="connecting",this.autoScroll=!0,this.gw=null,this.logEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.autoScroll&&this.logEnd?.scrollIntoView()}connect(){this.connState="connecting",this.gw=new Pe({url:this.wsUrl,onEvent:t=>{if(t.type==="connected"){this.connState="connected",this.gw?.send({type:"logs.subscribe"});return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type!=="message")return;const e=t.data;e.type==="log"&&(this.lines=[...this.lines.slice(-2e3),{ts:e.ts??new Date().toISOString(),level:e.level??"info",msg:e.message??""}])}})}filtered(){return this.level==="all"?this.lines:this.lines.filter(t=>t.level===this.level)}levelClass(t){return{error:"log-line-error",warn:"log-line-warn",info:"log-line-info"}[t]??""}clear(){this.lines=[]}render(){const t=this.filtered();return n`
      <div style="padding:12px 16px;display:flex;flex-direction:column;height:100%">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-shrink:0">
          <span class="dot ${this.connState==="connected"?"dot-green":this.connState==="offline"?"dot-red":"dot-gray"}"></span>
          <span style="font-size:12px;color:var(--muted)">${this.connState}</span>
          <div style="flex:1"></div>
          <select class="select" style="height:28px;padding:3px 8px;font-size:12px;width:100px"
            @change=${e=>{this.level=e.target.value}}>
            <option value="all">all</option>
            <option value="error">error</option>
            <option value="warn">warn</option>
            <option value="info">info</option>
            <option value="debug">debug</option>
          </select>
          <label style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--muted);cursor:pointer">
            <input type="checkbox" .checked=${this.autoScroll} @change=${e=>{this.autoScroll=e.target.checked}}> Auto-scroll
          </label>
          <button class="btn btn-ghost btn-sm" @click=${this.clear}>Clear</button>
        </div>

        <div class="log-wrap" style="flex:1;overflow-y:auto;height:0">
          ${t.length===0?n`<div style="color:var(--muted);font-size:12px">Waiting for log output…</div>`:t.map(e=>n`
              <div class="log-line ${this.levelClass(e.level)}">
                <span style="opacity:0.5;margin-right:8px">${e.ts.slice(11,19)}</span>
                <span style="min-width:40px;display:inline-block;margin-right:8px;text-transform:uppercase;font-size:10px;opacity:0.7">${e.level}</span>
                ${e.msg}
              </div>
            `)}
          <div style="height:1px" .ref=${e=>{this.logEnd=e}}></div>
        </div>
      </div>
    `}};ct([u()],Q.prototype,"clawId",2);ct([u()],Q.prototype,"wsUrl",2);ct([l()],Q.prototype,"lines",2);ct([l()],Q.prototype,"level",2);ct([l()],Q.prototype,"connState",2);ct([l()],Q.prototype,"autoScroll",2);Q=ct([$("ccl-claw-logs")],Q);var Ks=Object.defineProperty,Fs=Object.getOwnPropertyDescriptor,C=(t,e,s,i)=>{for(var a=i>1?void 0:i?Fs(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Ks(e,s,a),a};const Ws=[{id:"chat",label:"Chat"},{id:"agents",label:"Agents"},{id:"config",label:"Config"},{id:"sessions",label:"Sessions"},{id:"skills",label:"Skills"},{id:"usage",label:"Usage"},{id:"cron",label:"Cron"},{id:"nodes",label:"Nodes"},{id:"channels",label:"Channels"},{id:"logs",label:"Logs"}];let k=class extends g{constructor(){super(...arguments),this.tenantId="",this.clawList=[],this.loading=!1,this.error="",this.showRegisterModal=!1,this.registerName="",this.registering=!1,this.registerError="",this.newClaw=null,this.apiKeyCopied=!1,this.panelOpen=!1,this.activeClaw=null,this.activeTab="chat",this.deleteConfirmId=null,this.deleting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadClaws()}async loadClaws(){this.loading=!0,this.error="";try{this.clawList=await vt.list()}catch(t){this.error=t.message??"Failed to load claws"}finally{this.loading=!1}}openPanel(t){this.activeClaw=t,this.activeTab="chat",this.panelOpen=!0,document.body.style.overflow="hidden"}closePanel(){this.panelOpen=!1,document.body.style.overflow="",setTimeout(()=>{this.activeClaw=null},300)}async handleRegister(){if(this.registerName.trim()){this.registering=!0,this.registerError="";try{const t=await vt.register(this.registerName.trim());this.newClaw=t,this.clawList=[...this.clawList,t],this.registerName=""}catch(t){this.registerError=t.message??"Registration failed"}finally{this.registering=!1}}}closeRegisterModal(){this.showRegisterModal=!1,this.newClaw=null,this.registerName="",this.registerError="",this.apiKeyCopied=!1}async copyApiKey(){if(this.newClaw)try{await navigator.clipboard.writeText(this.newClaw.apiKey),this.apiKeyCopied=!0,setTimeout(()=>{this.apiKeyCopied=!1},2e3)}catch{}}async handleDelete(t){this.deleting=!0;try{await vt.remove(t),this.clawList=this.clawList.filter(e=>e.id!==t),this.deleteConfirmId=null,this.activeClaw?.id===t&&this.closePanel()}catch(e){this.error=e.message??"Delete failed"}finally{this.deleting=!1}}statusBadge(t){return t.status==="active"?n`<span class="badge badge-green">active</span>`:t.status==="suspended"?n`<span class="badge badge-red">suspended</span>`:n`<span class="badge badge-gray">${t.status}</span>`}connectedDot(t){const e=t.status==="active"&&t.connectedAt?"dot dot-green":"dot dot-gray";return n`<span class="${e}" title="${t.connectedAt?"connected":"offline"}"></span>`}renderRegisterModal(){return this.showRegisterModal?n`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&this.closeRegisterModal()}}>
        <div class="modal">
          <div class="modal-title">Register new claw</div>
          ${this.newClaw?n`
            <div class="modal-sub">Claw registered. Save this API key &mdash; it will not be shown again.</div>
            <div style="margin:1rem 0;background:var(--bg-2,#f4f4f5);border-radius:6px;padding:0.75rem 1rem;font-family:monospace;font-size:0.875rem;word-break:break-all;">${this.newClaw.apiKey}</div>
            <button class="btn btn-secondary btn-sm" @click=${this.copyApiKey}>
              ${this.apiKeyCopied?"Copied!":"Copy API key"}
            </button>
            <div class="modal-footer">
              <button class="btn btn-primary" @click=${this.closeRegisterModal}>Done</button>
            </div>
          `:n`
            <div class="field">
              <label class="label">Claw name</label>
              <input class="input" placeholder="my-claw"
                .value=${this.registerName}
                @input=${t=>{this.registerName=t.target.value}}
                @keydown=${t=>{t.key==="Enter"&&this.handleRegister()}}
              />
            </div>
            ${this.registerError?n`<div class="error-banner">${this.registerError}</div>`:""}
            <div class="modal-footer">
              <button class="btn btn-ghost" @click=${this.closeRegisterModal}>Cancel</button>
              <button class="btn btn-primary" ?disabled=${this.registering||!this.registerName.trim()}
                @click=${this.handleRegister}>${this.registering?"Registering…":"Register"}</button>
            </div>
          `}
        </div>
      </div>
    `:n``}renderDeleteConfirm(t){return this.deleteConfirmId!==t.id?n``:n`
      <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&(this.deleteConfirmId=null)}}>
        <div class="modal">
          <div class="modal-title">Delete claw</div>
          <div class="modal-sub">Are you sure you want to delete <strong>${t.name}</strong>? This cannot be undone.</div>
          <div class="modal-footer">
            <button class="btn btn-ghost" @click=${()=>{this.deleteConfirmId=null}}>Cancel</button>
            <button class="btn btn-danger" ?disabled=${this.deleting}
              @click=${()=>{this.handleDelete(t.id)}}
            >${this.deleting?"Deleting…":"Delete"}</button>
          </div>
        </div>
      </div>
    `}renderPanel(){if(!this.activeClaw)return n``;const t=this.activeClaw,e=vt.wsUrl(t.id);return n`
      <div style="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:40;transition:opacity 0.2s;
        opacity:${this.panelOpen?"1":"0"};" @click=${this.closePanel}></div>
      <div style="position:fixed;top:0;right:0;bottom:0;width:min(860px,100vw);
        background:var(--bg-1,#fff);z-index:50;display:flex;flex-direction:column;
        box-shadow:-4px 0 24px rgba(0,0,0,0.15);
        transform:translateX(${this.panelOpen?"0":"100%"});
        transition:transform 0.28s cubic-bezier(0.4,0,0.2,1);">
        <div style="display:flex;align-items:center;gap:0.75rem;padding:1rem 1.25rem;
          border-bottom:1px solid var(--border,#e4e4e7);flex-shrink:0;">
          <button class="btn btn-ghost btn-sm" @click=${this.closePanel}>← Close</button>
          <span style="font-weight:600;font-size:1rem;">${t.name}</span>
          ${this.statusBadge(t)}
          <span style="font-size:0.75rem;color:var(--muted,#71717a);font-family:monospace;">${t.slug}</span>
        </div>
        <div style="display:flex;border-bottom:1px solid var(--border,#e4e4e7);flex-shrink:0;overflow-x:auto;">
          ${Ws.map(s=>n`
            <button style="padding:0.625rem 1rem;font-size:0.875rem;border:none;background:none;
              cursor:pointer;white-space:nowrap;
              border-bottom:2px solid ${this.activeTab===s.id?"var(--accent,#6366f1)":"transparent"};
              color:${this.activeTab===s.id?"var(--accent,#6366f1)":"var(--muted,#71717a)"};
              font-weight:${this.activeTab===s.id?"600":"400"}"
              @click=${()=>{this.activeTab=s.id}}
            >${s.label}</button>
          `)}
        </div>
        <div style="flex:1;overflow:auto;min-height:0;">
          ${this.activeTab==="chat"?n`<ccl-claw-chat     .clawId=${t.id} .wsUrl=${e}></ccl-claw-chat>`:""}
          ${this.activeTab==="agents"?n`<ccl-claw-agents   .clawId=${t.id} .wsUrl=${e}></ccl-claw-agents>`:""}
          ${this.activeTab==="config"?n`<ccl-claw-config   .clawId=${t.id} .wsUrl=${e}></ccl-claw-config>`:""}
          ${this.activeTab==="sessions"?n`<ccl-claw-sessions .clawId=${t.id} .wsUrl=${e}></ccl-claw-sessions>`:""}
          ${this.activeTab==="skills"?n`<ccl-claw-skills   .clawId=${t.id} .wsUrl=${e}></ccl-claw-skills>`:""}
          ${this.activeTab==="usage"?n`<ccl-claw-usage    .clawId=${t.id} .wsUrl=${e}></ccl-claw-usage>`:""}
          ${this.activeTab==="cron"?n`<ccl-claw-cron     .clawId=${t.id} .wsUrl=${e}></ccl-claw-cron>`:""}
          ${this.activeTab==="nodes"?n`<ccl-claw-nodes    .clawId=${t.id} .wsUrl=${e}></ccl-claw-nodes>`:""}
          ${this.activeTab==="channels"?n`<ccl-claw-channels .clawId=${t.id} .wsUrl=${e}></ccl-claw-channels>`:""}
          ${this.activeTab==="logs"?n`<ccl-claw-logs     .clawId=${t.id} .wsUrl=${e}></ccl-claw-logs>`:""}
        </div>
      </div>
    `}render(){return n`
      <div>
        <div class="page-header">
          <div><div class="page-title">Claws</div><div class="page-sub">${this.clawList.length} registered</div></div>
          <button class="btn btn-primary" @click=${()=>{this.showRegisterModal=!0}}>Register claw</button>
        </div>
        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?n`<div class="empty-state">Loading…</div>`:""}
        ${!this.loading&&this.clawList.length===0?n`
          <div class="empty-state">No claws registered yet. Register your first claw to get started.</div>
        `:""}
        ${!this.loading&&this.clawList.length>0?n`
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th></th><th>Name</th><th>Slug</th><th>Status</th><th>Last seen</th><th></th></tr></thead>
              <tbody>
                ${this.clawList.map(t=>n`
                  <tr>
                    <td style="width:2rem;">${this.connectedDot(t)}</td>
                    <td style="font-weight:500;">${t.name}</td>
                    <td style="font-family:monospace;font-size:0.8125rem;color:var(--muted,#71717a);">${t.slug}</td>
                    <td>${this.statusBadge(t)}</td>
                    <td style="font-size:0.8125rem;color:var(--muted,#71717a);">${t.lastSeenAt?new Date(t.lastSeenAt).toLocaleString():"never"}</td>
                    <td>
                      <div style="display:flex;gap:0.5rem;justify-content:flex-end;">
                        <button class="btn btn-primary btn-sm" @click=${()=>this.openPanel(t)}>Open</button>
                        <button class="btn btn-danger btn-sm" @click=${()=>{this.deleteConfirmId=t.id}}>Delete</button>
                      </div>
                      ${this.renderDeleteConfirm(t)}
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        `:""}
      </div>
      ${this.renderRegisterModal()}
      ${this.renderPanel()}
    `}};C([u()],k.prototype,"tenantId",2);C([l()],k.prototype,"clawList",2);C([l()],k.prototype,"loading",2);C([l()],k.prototype,"error",2);C([l()],k.prototype,"showRegisterModal",2);C([l()],k.prototype,"registerName",2);C([l()],k.prototype,"registering",2);C([l()],k.prototype,"registerError",2);C([l()],k.prototype,"newClaw",2);C([l()],k.prototype,"apiKeyCopied",2);C([l()],k.prototype,"panelOpen",2);C([l()],k.prototype,"activeClaw",2);C([l()],k.prototype,"activeTab",2);C([l()],k.prototype,"deleteConfirmId",2);C([l()],k.prototype,"deleting",2);k=C([$("ccl-claws")],k);var Js=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,tt=(t,e,s,i)=>{for(var a=i>1?void 0:i?Vs(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Js(e,s,a),a};let B=class extends g{constructor(){super(...arguments),this.tenantId="",this.available=[],this.assigned=[],this.loading=!0,this.error="",this.search="",this.tab="assigned"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([Xt.list().catch(()=>[]),gt.listTenant().catch(()=>[])]);this.available=t,this.assigned=e}catch(t){this.error=t.message}finally{this.loading=!1}}async assign(t){try{await gt.assignTenant(t),this.assigned=await gt.listTenant()}catch(e){this.error=e.message}}async unassign(t){try{await gt.unassignTenant(t),this.assigned=this.assigned.filter(e=>e.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}filteredAvailable(){const t=this.search.toLowerCase();return this.available.filter(e=>!t||e.name.toLowerCase().includes(t)||(e.description??"").toLowerCase().includes(t))}render(){const t=this.assignedSlugs();return n`
      <div class="page-header">
        <div>
          <div class="page-title">Skills</div>
          <div class="page-sub">Extend your claws with marketplace skills</div>
        </div>
      </div>

      ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab==="assigned"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="assigned"}}>
          Assigned (${this.assigned.length})
        </button>
        <button class="btn ${this.tab==="marketplace"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="marketplace"}}>
          Marketplace (${this.available.length})
        </button>
      </div>

      ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.tab==="assigned"?this.renderAssigned():this.renderMarketplace(t)}
    `}renderAssigned(){return this.assigned.length===0?n`<div class="empty-state"><div class="empty-state-icon">✨</div><div class="empty-state-title">No skills assigned</div><div class="empty-state-sub">Browse the marketplace to add skills to your workspace</div><button class="btn btn-primary" style="margin-top:16px" @click=${()=>{this.tab="marketplace"}}>Browse marketplace</button></div>`:n`
      <div class="grid grid-3">
        ${this.assigned.map(t=>n`
          <div class="card">
            <div class="card-header">
              <div class="card-title">${t.name}</div>
              <button class="btn btn-danger btn-sm" @click=${()=>this.unassign(t.slug)}>Remove</button>
            </div>
            <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${t.slug}</div>
          </div>
        `)}
      </div>
    `}renderMarketplace(t){const e=this.filteredAvailable();return n`
      <div>
        <input class="input" style="max-width:300px;margin-bottom:16px" placeholder="Search skills…"
          .value=${this.search} @input=${s=>{this.search=s.target.value}}>

        ${e.length===0?n`<div class="empty-state"><div class="empty-state-title">No skills found</div></div>`:n`
            <div class="grid grid-3">
              ${e.map(s=>n`
                <div class="card">
                  <div class="card-header">
                    <div style="display:flex;align-items:center;gap:10px">
                      ${s.icon?n`<img src="${s.icon}" style="width:32px;height:32px;border-radius:6px">`:n`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
                      <div>
                        <div class="card-title">${s.name}</div>
                        ${s.category?n`<span class="badge badge-gray" style="font-size:10px">${s.category}</span>`:""}
                      </div>
                    </div>
                  </div>
                  ${s.description?n`<div style="font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:12px">${s.description}</div>`:""}
                  ${t.has(s.slug)?n`<button class="btn btn-danger btn-sm" @click=${()=>this.unassign(s.slug)}>Remove</button>`:n`<button class="btn btn-primary btn-sm" @click=${()=>this.assign(s.slug)}>Add to workspace</button>`}
                </div>
              `)}
            </div>`}
      </div>
    `}};tt([u()],B.prototype,"tenantId",2);tt([l()],B.prototype,"available",2);tt([l()],B.prototype,"assigned",2);tt([l()],B.prototype,"loading",2);tt([l()],B.prototype,"error",2);tt([l()],B.prototype,"search",2);tt([l()],B.prototype,"tab",2);B=tt([$("ccl-skills")],B);var qs=Object.defineProperty,Ys=Object.getOwnPropertyDescriptor,U=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ys(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&qs(e,s,a),a};const Gs=["owner","manager","developer","viewer"];let T=class extends g{constructor(){super(...arguments),this.tenant=null,this.detail=null,this.loading=!0,this.error="",this.tab="members",this.showInvite=!1,this.inviteEmail="",this.inviteRole="developer",this.inviting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("tenant")&&this.tenant&&this.load()}async load(){if(this.tenant){this.loading=!0;try{this.detail=await kt.get(this.tenant.id)}catch(t){this.error=t.message}finally{this.loading=!1}}}async invite(t){if(t.preventDefault(),!(!this.tenant||!this.inviteEmail)){this.inviting=!0;try{await kt.inviteMember(this.tenant.id,this.inviteEmail,this.inviteRole),await this.load(),this.showInvite=!1,this.inviteEmail=""}catch(e){this.error=e.message}finally{this.inviting=!1}}}async removeMember(t){if(!(!this.tenant||!confirm("Remove this member?")))try{await kt.removeMember(this.tenant.id,t),await this.load()}catch(e){this.error=e.message}}roleBadge(t){return n`<span class="badge ${{owner:"badge-red",manager:"badge-yellow",developer:"badge-blue",viewer:"badge-gray"}[t]??"badge-gray"}">${t}</span>`}render(){return n`
      <div class="page-header">
        <div>
          <div class="page-title">${this.tenant?.name??"Workspace"}</div>
          <div class="page-sub">Manage members and settings</div>
        </div>
      </div>

      ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab==="members"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="members"}}>Members</button>
        <button class="btn ${this.tab==="settings"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="settings"}}>Settings</button>
      </div>

      ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.tab==="members"?this.renderMembers():this.renderSettings()}
    `}renderMembers(){const t=this.detail?.members??[];return n`
      <div>
        <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
          <button class="btn btn-primary" @click=${()=>{this.showInvite=!0}}>Invite member</button>
        </div>

        ${t.length===0?n`<div class="empty-state"><div class="empty-state-title">No members yet</div></div>`:n`
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>Email</th><th>Role</th><th>Joined</th><th></th></tr></thead>
                <tbody>
                  ${t.map(e=>n`
                    <tr>
                      <td style="font-weight:500">${e.email}</td>
                      <td>${this.roleBadge(e.role)}</td>
                      <td style="font-size:12px;color:var(--muted)">${new Date(e.joinedAt).toLocaleDateString()}</td>
                      <td>
                        ${e.role!=="owner"?n`<button class="btn btn-danger btn-sm" @click=${()=>this.removeMember(e.userId)}>Remove</button>`:""}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>`}

        ${this.showInvite?n`
          <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&(this.showInvite=!1)}}>
            <div class="modal">
              <div class="modal-title">Invite member</div>
              <form @submit=${this.invite} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Email</label>
                  <input class="input" type="email" required .value=${this.inviteEmail}
                    @input=${e=>{this.inviteEmail=e.target.value}}></div>
                <div class="field"><label class="label">Role</label>
                  <select class="select" @change=${e=>{this.inviteRole=e.target.value}}>
                    ${Gs.filter(e=>e!=="owner").map(e=>n`<option value=${e}>${e}</option>`)}
                  </select></div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${()=>this.showInvite=!1}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.inviting}>${this.inviting?"Inviting…":"Send invite"}</button>
                </div>
              </form>
            </div>
          </div>`:""}
      </div>
    `}renderSettings(){return n`
      <div class="card" style="max-width:480px">
        <div class="card-title" style="margin-bottom:16px">Workspace details</div>
        <div style="display:grid;gap:10px">
          ${[["Name",this.tenant?.name??"—"],["Slug",this.tenant?.slug??"—"],["Status",this.tenant?.status??"—"],["Your role",this.tenant?.role??"—"]].map(([t,e])=>n`
            <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
              <span style="color:var(--muted)">${t}</span>
              <span style="color:var(--text-strong);font-weight:500">${e}</span>
            </div>`)}
        </div>
      </div>
    `}};U([u({type:Object})],T.prototype,"tenant",2);U([l()],T.prototype,"detail",2);U([l()],T.prototype,"loading",2);U([l()],T.prototype,"error",2);U([l()],T.prototype,"tab",2);U([l()],T.prototype,"showInvite",2);U([l()],T.prototype,"inviteEmail",2);U([l()],T.prototype,"inviteRole",2);U([l()],T.prototype,"inviting",2);T=U([$("ccl-workspace")],T);var Zs=Object.defineProperty,Xs=Object.getOwnPropertyDescriptor,V=(t,e,s,i)=>{for(var a=i>1?void 0:i?Xs(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Zs(e,s,a),a};let N=class extends g{constructor(){super(...arguments),this.tenantId="",this.items=[],this.tasks=[],this.loading=!0,this.error="",this.filterTask="",this.filterStatus="",this.expanded=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.tasks]=await Promise.all([Qt.list(),P.list().catch(()=>[])])}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){return this.items.filter(t=>!(this.filterTask&&t.taskId!==this.filterTask||this.filterStatus&&t.status!==this.filterStatus))}taskTitle(t){return this.tasks.find(e=>e.id===t)?.title??t}statusColor(t){return{completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"}[t]??"badge-gray"}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered();return n`
      <div class="page-header">
        <div>
          <div class="page-title">Execution Logs</div>
          <div class="page-sub">${t.length} execution${t.length!==1?"s":""}</div>
        </div>
        <button class="btn btn-secondary" @click=${this.load}>Refresh</button>
      </div>

      ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

      <div class="filters" style="margin-bottom:16px">
        <select class="select" style="max-width:220px;height:32px;padding:4px 10px"
          @change=${e=>{this.filterTask=e.target.value}}>
          <option value="">All tasks</option>
          ${this.tasks.map(e=>n`<option value=${e.id}>${e.title}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${e=>{this.filterStatus=e.target.value}}>
          <option value="">All statuses</option>
          ${["pending","running","completed","failed","cancelled"].map(e=>n`<option value=${e}>${e}</option>`)}
        </select>
      </div>

      ${this.loading?n`<div style="color:var(--muted);font-size:13px">Loading…</div>`:t.length===0?n`<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">No executions found</div></div>`:n`
            <div style="display:grid;gap:8px">
              ${t.slice().reverse().map(e=>n`
                <div class="card" style="cursor:pointer" @click=${()=>{this.expanded=this.expanded===e.id?null:e.id}}>
                  <div style="display:flex;align-items:center;gap:12px">
                    <span class="badge ${this.statusColor(e.status)}">${e.status}</span>
                    <span style="font-size:13px;font-weight:500;color:var(--text-strong);flex:1">${this.taskTitle(e.taskId)}</span>
                    <span style="font-size:12px;color:var(--muted)">${this.duration(e)}</span>
                    <span style="font-size:12px;color:var(--muted)">${this.fmt(e.createdAt)}</span>
                    <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:var(--muted);fill:none;stroke-width:2">
                      <polyline points="${this.expanded===e.id?"18 15 12 9 6 15":"6 9 12 15 18 9"}"/>
                    </svg>
                  </div>
                  ${this.expanded===e.id&&e.result?n`
                    <div class="log-wrap" style="margin-top:12px;max-height:200px;overflow-y:auto;font-size:11px">
                      ${e.result}
                    </div>`:""}
                </div>
              `)}
            </div>`}
    `}};V([u()],N.prototype,"tenantId",2);V([l()],N.prototype,"items",2);V([l()],N.prototype,"tasks",2);V([l()],N.prototype,"loading",2);V([l()],N.prototype,"error",2);V([l()],N.prototype,"filterTask",2);V([l()],N.prototype,"filterStatus",2);V([l()],N.prototype,"expanded",2);N=V([$("ccl-logs")],N);var Qs=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,et=(t,e,s,i)=>{for(var a=i>1?void 0:i?ti(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(a=(i?o(e,s,a):o(a))||a);return i&&a&&Qs(e,s,a),a};let L=class extends g{constructor(){super(...arguments),this.appState="loading",this.tab="tasks",this.user=null,this.tenantList=[],this.tenant=null,this.theme="dark",this.navCollapsed=!1,this.handleUnauthorized=()=>{jt(),this.user=null,this.tenant=null,this.appState="landing"}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTheme(),this.bootstrap(),window.addEventListener("ccl:unauthorized",this.handleUnauthorized)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ccl:unauthorized",this.handleUnauthorized)}updated(t){this.appState==="dashboard"&&(t.has("appState")||t.has("tab")||t.has("tenant"))&&this.mountDashboardView()}async bootstrap(){if(!Zt()){this.appState="landing";return}const e=R(),s=_e();if(this.user=Te(),e&&s)try{const i=await Y.listTenants();this.tenantList=i;const a=i.find(r=>r.id===s);if(a){this.tenant=a,this.appState="dashboard";return}}catch{}try{this.tenantList=await Y.listTenants(),this.appState=(this.tenantList.length>0,"workspace-picker")}catch{this.appState="auth"}}async handleLogin(t){const{token:e,user:s}=t.detail;Se(e),Ae(s),this.user=s;try{this.tenantList=await Y.listTenants(),this.appState="workspace-picker"}catch{this.appState="workspace-picker"}}async handleSelectTenant(t){const e=t.detail;try{const{token:s}=await Y.tenantToken(e.id);zt(s),Ut(e.id),this.tenant=e,this.appState="dashboard"}catch(s){console.error("Failed to get tenant token",s)}}async handleCreateTenant(t){try{const e=await kt.create(t.detail.name),{token:s}=await Y.tenantToken(e.id);zt(s),Ut(e.id),this.tenant=e,this.appState="dashboard"}catch(e){console.error("Failed to create tenant",e)}}handleSignOut(){jt(),this.user=null,this.tenant=null,this.tenantList=[],this.appState="landing"}handleSwitchWorkspace(){this.appState="workspace-picker"}setTab(t){this.tab!==t&&(this.tab=t)}mountDashboardView(){const t=this.querySelector("#dashboard-view-host");if(!(t instanceof HTMLElement))return;const e=this.tenant?.id??"";let s;switch(this.tab){case"tasks":{const i=document.createElement("ccl-tasks");i.tenantId=e,s=i;break}case"projects":{const i=document.createElement("ccl-projects");i.tenantId=e,s=i;break}case"claws":{const i=document.createElement("ccl-claws");i.tenantId=e,s=i;break}case"skills":{const i=document.createElement("ccl-skills");i.tenantId=e,s=i;break}case"workspace":{const i=document.createElement("ccl-workspace");i.tenant=this.tenant,s=i;break}case"logs":{const i=document.createElement("ccl-logs");i.tenantId=e,s=i;break}}t.replaceChildren(s)}loadTheme(){const t=localStorage.getItem("ccl-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;this.theme=t??(e?"dark":"light"),document.documentElement.dataset.theme=this.theme}toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",document.documentElement.dataset.theme=this.theme,localStorage.setItem("ccl-theme",this.theme),this.requestUpdate()}icon(t){return n`<svg viewBox="0 0 24 24">${n([`<svg viewBox="0 0 24 24">${{projects:'<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>',tasks:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',claws:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',skills:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',workspace:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',logs:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',menu:'<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',chevron:'<polyline points="15 18 9 12 15 6"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'}[t]??""}</svg>`])}</svg>`}svgIcon(t){return`<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">${{projects:'<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>',tasks:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',claws:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',skills:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',workspace:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',logs:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'}[t]??""}</svg>`}render(){return this.appState==="loading"?this.renderLoading():this.appState==="landing"?this.renderLanding():this.appState==="auth"?this.renderAuth():this.appState==="workspace-picker"?this.renderWorkspacePicker():this.renderDashboard()}renderLoading(){return n`
      <div class="auth-shell">
        <div style="text-align:center;color:var(--muted);font-size:14px">Loading…</div>
      </div>`}renderLanding(){return n`
      <div class="landing">
        <!-- Nav -->
        <header class="landing-nav">
          <div class="landing-nav-inner">
            <a class="landing-logo" href="/">
              <img src="https://cdn.builder.io/api/v1/image/assets%2Fac94883aaa0849cc897eb61793256164%2Fc284d818569a472aa80fdbee574db744?format=webp&width=64&height=64" alt="" onerror="this.style.display='none'">
              CoderClawLink
            </a>
            <div class="landing-nav-right">
              <button class="btn btn-ghost btn-sm" @click=${()=>{this.appState="auth"}}>Sign in</button>
              <button class="btn btn-primary btn-sm" @click=${()=>{this.appState="auth"}}>Get Started</button>
              <button class="btn btn-ghost btn-icon" @click=${()=>this.toggleTheme()} title="Toggle theme">
                <span .innerHTML=${this.svgIcon(this.theme==="dark"?"sun":"moon")}></span>
              </button>
            </div>
          </div>
        </header>

        <!-- Hero -->
        <section class="landing-hero">
          <div class="landing-hero-inner">
            <span class="landing-badge">Now in Beta</span>
            <h1 class="landing-title">Your AI Coding Mesh,<br> Unified</h1>
            <p class="landing-sub">Register your CoderClaw instances, assign skills from the marketplace, and orchestrate intelligent workflows across your entire development environment.</p>
            <div class="landing-ctas">
              <button class="btn btn-primary btn-lg" @click=${()=>{this.appState="auth"}}>Get Started Free</button>
              <button class="btn btn-ghost btn-lg" @click=${()=>{this.appState="auth"}}>Sign In →</button>
            </div>
            <p class="landing-note">No credit card required. Free to get started.</p>
          </div>
          <div class="landing-mesh" aria-hidden="true">
            <div class="mesh-center">
              <img src="https://cdn.builder.io/api/v1/image/assets%2Fac94883aaa0849cc897eb61793256164%2Fc284d818569a472aa80fdbee574db744?format=webp&width=200&height=300" alt="" onerror="this.style.display='none'">
            </div>
            <div class="mesh-node mesh-node-1">🤖<span>claw-01</span></div>
            <div class="mesh-node mesh-node-2">🤖<span>claw-02</span></div>
            <div class="mesh-node mesh-node-3">🤖<span>claw-03</span></div>
            <div class="mesh-line mesh-line-1"></div>
            <div class="mesh-line mesh-line-2"></div>
            <div class="mesh-line mesh-line-3"></div>
          </div>
        </section>

        <!-- Features -->
        <section class="landing-section">
          <div class="landing-section-inner">
            <h2 class="landing-section-title">Everything you need to orchestrate your mesh</h2>
            <p class="landing-section-sub">CoderClawLink connects your CoderClaw agents into a unified, skill-aware coding mesh.</p>
            <div class="landing-grid-4">
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🤖</div>
                <h3>CoderClaw Mesh</h3>
                <p>Register any number of CoderClaw instances to your workspace. Each claw gets a unique API key and joins your intelligent mesh automatically.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🧩</div>
                <h3>Skills Marketplace</h3>
                <p>Browse and assign capabilities from the marketplace. Target your entire workspace or individual claws for precision orchestration.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">📋</div>
                <h3>Projects &amp; Tasks</h3>
                <p>Organize work into projects with kanban-style task management. Track progress across your entire coding mesh in real time.</p>
              </div>
              <div class="landing-feature-card">
                <div class="landing-feature-icon">🏢</div>
                <h3>Multi-Tenant Workspaces</h3>
                <p>Create isolated workspaces for different teams or repos. Invite collaborators, manage roles, and keep everything neatly separated.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Steps -->
        <section class="landing-section landing-section-alt">
          <div class="landing-section-inner">
            <h2 class="landing-section-title">Up and running in three steps</h2>
            <div class="landing-grid-3">
              <div class="landing-step-card">
                <div class="landing-step-num">01</div>
                <h3>Create your account</h3>
                <p>Sign up with your email. Create a workspace for your team or project in seconds.</p>
              </div>
              <div class="landing-step-card">
                <div class="landing-step-num">02</div>
                <h3>Register your claws</h3>
                <p>Add each CoderClaw instance to your mesh. Paste the generated API key into your claw config and it connects automatically.</p>
              </div>
              <div class="landing-step-card">
                <div class="landing-step-num">03</div>
                <h3>Assign skills &amp; orchestrate</h3>
                <p>Browse the skills marketplace, assign capabilities to your workspace or individual claws, and start building.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="landing-cta-section">
          <div class="landing-section-inner" style="text-align:center">
            <h2 style="font-size:clamp(24px,4vw,36px);font-weight:700;margin:0 0 12px">Ready to build your mesh?</h2>
            <p style="color:var(--muted);margin:0 0 28px">Create your free account and register your first CoderClaw in minutes.</p>
            <button class="btn btn-primary btn-lg" @click=${()=>{this.appState="auth"}}>Start for free →</button>
          </div>
        </section>

        <!-- Footer -->
        <footer class="landing-footer">
          <span>© 2026 CoderClaw · <a href="https://coderclaw.ai" target="_blank" rel="noopener">coderclaw.ai</a></span>
        </footer>
      </div>
    `}renderAuth(){return n`
      <ccl-auth
        @login=${this.handleLogin}
        @register=${this.handleLogin}
      ></ccl-auth>`}renderWorkspacePicker(){return n`
      <ccl-workspace-picker
        .tenants=${this.tenantList}
        .user=${this.user}
        @select-tenant=${this.handleSelectTenant}
        @create-tenant=${this.handleCreateTenant}
        @sign-out=${this.handleSignOut}
      ></ccl-workspace-picker>`}renderDashboard(){const t=[{id:"tasks",label:"Tasks",icon:"tasks"},{id:"projects",label:"Projects",icon:"projects"},{id:"claws",label:"Claws",icon:"claws"},{id:"skills",label:"Skills",icon:"skills"},{id:"workspace",label:"Workspace",icon:"workspace"},{id:"logs",label:"Logs",icon:"logs"}];return n`
      <div class="shell">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <div class="brand">
              <img class="brand-logo" src="/claw-logo.png" alt="CoderClawLink" onerror="this.style.display='none'">
              <span class="brand-name">CoderClawLink</span>
              <span class="brand-badge">BETA</span>
            </div>
          </div>
          <div class="topbar-right">
            <button
              class="tenant-chip"
              @click=${this.handleSwitchWorkspace}
              title="Switch workspace"
            >
              ${this.tenant?.name??"Workspace"}
              <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button
              class="btn btn-ghost btn-icon"
              @click=${()=>this.toggleTheme()}
              title="Toggle theme"
            >
              <span .innerHTML=${this.svgIcon(this.theme==="dark"?"sun":"moon")}></span>
            </button>
            <button
              class="btn btn-ghost btn-icon"
              @click=${this.handleSignOut}
              title="Sign out"
            >
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </header>

        <!-- Sidebar nav -->
        <nav class="nav">
          <div class="nav-section">
            ${t.map(e=>n`
              <button
                class="nav-item ${this.tab===e.id?"active":""}"
                @click=${()=>this.setTab(e.id)}
              >
                <span .innerHTML=${this.svgIcon(e.icon)}></span>
                ${e.label}
              </button>
            `)}
          </div>
        </nav>

        <!-- Content -->
        <main class="content">
          <div id="dashboard-view-host"></div>
        </main>
      </div>
    `}};L.styles=Oe``;et([l()],L.prototype,"appState",2);et([l()],L.prototype,"tab",2);et([l()],L.prototype,"user",2);et([l()],L.prototype,"tenantList",2);et([l()],L.prototype,"tenant",2);et([l()],L.prototype,"theme",2);et([l()],L.prototype,"navCollapsed",2);L=et([$("ccl-app")],L);
//# sourceMappingURL=index-B3DM0xLE.js.map
