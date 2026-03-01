(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const _s=globalThis,Hi=_s.ShadowRoot&&(_s.ShadyCSS===void 0||_s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ki=Symbol(),Ma=new WeakMap;let Fn=class{constructor(e,s,i){if(this._$cssResult$=!0,i!==Ki)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(Hi&&e===void 0){const i=s!==void 0&&s.length===1;i&&(e=Ma.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ma.set(s,e))}return e}toString(){return this.cssText}};const Pr=t=>new Fn(typeof t=="string"?t:t+"",void 0,Ki),Rr=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((i,a,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[n+1],t[0]);return new Fn(s,t,Ki)},Mr=(t,e)=>{if(Hi)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const i=document.createElement("style"),a=_s.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=s.cssText,t.appendChild(i)}},Da=Hi?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const i of e.cssRules)s+=i.cssText;return Pr(s)})(t):t;const{is:Dr,defineProperty:Lr,getOwnPropertyDescriptor:Nr,getOwnPropertyNames:Or,getOwnPropertySymbols:jr,getPrototypeOf:Ur}=Object,zs=globalThis,La=zs.trustedTypes,Br=La?La.emptyScript:"",zr=zs.reactiveElementPolyfillSupport,cs=(t,e)=>t,Rs={toAttribute(t,e){switch(e){case Boolean:t=t?Br:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},Vi=(t,e)=>!Dr(t,e),Na={attribute:!0,type:String,converter:Rs,reflect:!1,useDefault:!1,hasChanged:Vi};Symbol.metadata??=Symbol("metadata"),zs.litPropertyMetadata??=new WeakMap;let Fe=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=Na){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,s);a!==void 0&&Lr(this.prototype,e,a)}}static getPropertyDescriptor(e,s,i){const{get:a,set:n}=Nr(this.prototype,e)??{get(){return this[s]},set(r){this[s]=r}};return{get:a,set(r){const d=a?.call(this);n?.call(this,r),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Na}static _$Ei(){if(this.hasOwnProperty(cs("elementProperties")))return;const e=Ur(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(cs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(cs("properties"))){const s=this.properties,i=[...Or(s),...jr(s)];for(const a of i)this.createProperty(a,s[a])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[i,a]of s)this.elementProperties.set(i,a)}this._$Eh=new Map;for(const[s,i]of this.elementProperties){const a=this._$Eu(s,i);a!==void 0&&this._$Eh.set(a,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const a of i)s.unshift(Da(a))}else e!==void 0&&s.push(Da(e));return s}static _$Eu(e,s){const i=s.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,i){this._$AK(e,i)}_$ET(e,s){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){const n=(i.converter?.toAttribute!==void 0?i.converter:Rs).toAttribute(s,i.type);this._$Em=e,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(e,s){const i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const n=i.getPropertyOptions(a),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Rs;this._$Em=a;const d=r.fromAttribute(s,n.type);this[a]=d??this._$Ej?.get(a)??d,this._$Em=null}}requestUpdate(e,s,i,a=!1,n){if(e!==void 0){const r=this.constructor;if(a===!1&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??Vi)(n,s)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,s,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:i,reflect:a,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??s??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(s=void 0),this._$AL.set(e,s)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,n]of this._$Ep)this[a]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,n]of i){const{wrapped:r}=n,d=this[a];r!==!0||this._$AL.has(a)||d===void 0||this.C(a,void 0,n,d)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(s)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(e){}firstUpdated(e){}};Fe.elementStyles=[],Fe.shadowRootOptions={mode:"open"},Fe[cs("elementProperties")]=new Map,Fe[cs("finalized")]=new Map,zr?.({ReactiveElement:Fe}),(zs.reactiveElementVersions??=[]).push("2.1.2");const Gi=globalThis,Oa=t=>t,Ms=Gi.trustedTypes,ja=Ms?Ms.createPolicy("lit-html",{createHTML:t=>t}):void 0,qn="$lit$",ce=`lit$${Math.random().toFixed(9).slice(2)}$`,Wn="?"+ce,Fr=`<${Wn}>`,ke=document,ds=()=>ke.createComment(""),hs=t=>t===null||typeof t!="object"&&typeof t!="function",Ji=Array.isArray,qr=t=>Ji(t)||typeof t?.[Symbol.iterator]=="function",ni=`[ 	
\f\r]`,Xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ua=/-->/g,Ba=/>/g,be=RegExp(`>|${ni}(?:([^\\s"'>=/]+)(${ni}*=${ni}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),za=/'/g,Fa=/"/g,Hn=/^(?:script|style|textarea|title)$/i,Wr=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),o=Wr(1),xe=Symbol.for("lit-noChange"),lt=Symbol.for("lit-nothing"),qa=new WeakMap,$e=ke.createTreeWalker(ke,129);function Kn(t,e){if(!Ji(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ja!==void 0?ja.createHTML(e):e}const Hr=(t,e)=>{const s=t.length-1,i=[];let a,n=e===2?"<svg>":e===3?"<math>":"",r=Xe;for(let d=0;d<s;d++){const l=t[d];let u,p,m=-1,g=0;for(;g<l.length&&(r.lastIndex=g,p=r.exec(l),p!==null);)g=r.lastIndex,r===Xe?p[1]==="!--"?r=Ua:p[1]!==void 0?r=Ba:p[2]!==void 0?(Hn.test(p[2])&&(a=RegExp("</"+p[2],"g")),r=be):p[3]!==void 0&&(r=be):r===be?p[0]===">"?(r=a??Xe,m=-1):p[1]===void 0?m=-2:(m=r.lastIndex-p[2].length,u=p[1],r=p[3]===void 0?be:p[3]==='"'?Fa:za):r===Fa||r===za?r=be:r===Ua||r===Ba?r=Xe:(r=be,a=void 0);const f=r===be&&t[d+1].startsWith("/>")?" ":"";n+=r===Xe?l+Fr:m>=0?(i.push(u),l.slice(0,m)+qn+l.slice(m)+ce+f):l+ce+(m===-2?d:f)}return[Kn(t,n+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class ps{constructor({strings:e,_$litType$:s},i){let a;this.parts=[];let n=0,r=0;const d=e.length-1,l=this.parts,[u,p]=Hr(e,s);if(this.el=ps.createElement(u,i),$e.currentNode=this.el.content,s===2||s===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(a=$e.nextNode())!==null&&l.length<d;){if(a.nodeType===1){if(a.hasAttributes())for(const m of a.getAttributeNames())if(m.endsWith(qn)){const g=p[r++],f=a.getAttribute(m).split(ce),y=/([.?@])?(.*)/.exec(g);l.push({type:1,index:n,name:y[2],strings:f,ctor:y[1]==="."?Vr:y[1]==="?"?Gr:y[1]==="@"?Jr:Fs}),a.removeAttribute(m)}else m.startsWith(ce)&&(l.push({type:6,index:n}),a.removeAttribute(m));if(Hn.test(a.tagName)){const m=a.textContent.split(ce),g=m.length-1;if(g>0){a.textContent=Ms?Ms.emptyScript:"";for(let f=0;f<g;f++)a.append(m[f],ds()),$e.nextNode(),l.push({type:2,index:++n});a.append(m[g],ds())}}}else if(a.nodeType===8)if(a.data===Wn)l.push({type:2,index:n});else{let m=-1;for(;(m=a.data.indexOf(ce,m+1))!==-1;)l.push({type:7,index:n}),m+=ce.length-1}n++}}static createElement(e,s){const i=ke.createElement("template");return i.innerHTML=e,i}}function We(t,e,s=t,i){if(e===xe)return e;let a=i!==void 0?s._$Co?.[i]:s._$Cl;const n=hs(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),n===void 0?a=void 0:(a=new n(t),a._$AT(t,s,i)),i!==void 0?(s._$Co??=[])[i]=a:s._$Cl=a),a!==void 0&&(e=We(t,a._$AS(t,e.values),a,i)),e}class Kr{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:i}=this._$AD,a=(e?.creationScope??ke).importNode(s,!0);$e.currentNode=a;let n=$e.nextNode(),r=0,d=0,l=i[0];for(;l!==void 0;){if(r===l.index){let u;l.type===2?u=new Yi(n,n.nextSibling,this,e):l.type===1?u=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(u=new Yr(n,this,e)),this._$AV.push(u),l=i[++d]}r!==l?.index&&(n=$e.nextNode(),r++)}return $e.currentNode=ke,a}p(e){let s=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,s),s+=i.strings.length-2):i._$AI(e[s])),s++}}let Yi=class Vn{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,i,a){this.type=2,this._$AH=lt,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=We(this,e,s),hs(e)?e===lt||e==null||e===""?(this._$AH!==lt&&this._$AR(),this._$AH=lt):e!==this._$AH&&e!==xe&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==lt&&hs(this._$AH)?this._$AA.nextSibling.data=e:this.T(ke.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ps.createElement(Kn(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(s);else{const n=new Kr(a,this),r=n.u(this.options);n.p(s),this.T(r),this._$AH=n}}_$AC(e){let s=qa.get(e.strings);return s===void 0&&qa.set(e.strings,s=new ps(e)),s}k(e){Ji(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,a=0;for(const n of e)a===s.length?s.push(i=new Vn(this.O(ds()),this.O(ds()),this,this.options)):i=s[a],i._$AI(n),a++;a<s.length&&(this._$AR(i&&i._$AB.nextSibling,a),s.length=a)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const i=Oa(e).nextSibling;Oa(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Fs=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,i,a,n){this.type=1,this._$AH=lt,this._$AN=void 0,this.element=e,this.name=s,this._$AM=a,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=lt}_$AI(e,s=this,i,a){const n=this.strings;let r=!1;if(n===void 0)e=We(this,e,s,0),r=!hs(e)||e!==this._$AH&&e!==xe,r&&(this._$AH=e);else{const d=e;let l,u;for(e=n[0],l=0;l<n.length-1;l++)u=We(this,d[i+l],s,l),u===xe&&(u=this._$AH[l]),r||=!hs(u)||u!==this._$AH[l],u===lt?e=lt:e!==lt&&(e+=(u??"")+n[l+1]),this._$AH[l]=u}r&&!a&&this.j(e)}j(e){e===lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Vr=class extends Fs{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===lt?void 0:e}},Gr=class extends Fs{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==lt)}},Jr=class extends Fs{constructor(e,s,i,a,n){super(e,s,i,a,n),this.type=5}_$AI(e,s=this){if((e=We(this,e,s,0)??lt)===xe)return;const i=this._$AH,a=e===lt&&i!==lt||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==lt&&(i===lt||a);a&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Yr=class{constructor(e,s,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){We(this,e)}};const Qr=Gi.litHtmlPolyfillSupport;Qr?.(ps,Yi),(Gi.litHtmlVersions??=[]).push("3.3.2");const Xr=(t,e,s)=>{const i=s?.renderBefore??e;let a=i._$litPart$;if(a===void 0){const n=s?.renderBefore??null;i._$litPart$=a=new Yi(e.insertBefore(ds(),n),n,void 0,s??{})}return a._$AI(t),a};const Qi=globalThis;let K=class extends Fe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Xr(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return xe}};K._$litElement$=!0,K.finalized=!0,Qi.litElementHydrateSupport?.({LitElement:K});const Zr=Qi.litElementPolyfillSupport;Zr?.({LitElement:K});(Qi.litElementVersions??=[]).push("4.2.2");const Q=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const to={attribute:!0,type:String,converter:Rs,reflect:!1,hasChanged:Vi},eo=(t=to,e,s)=>{const{kind:i,metadata:a}=s;let n=globalThis.litPropertyMetadata.get(a);if(n===void 0&&globalThis.litPropertyMetadata.set(a,n=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),i==="accessor"){const{name:r}=s;return{set(d){const l=e.get.call(this);e.set.call(this,d),this.requestUpdate(r,l,t,!0,d)},init(d){return d!==void 0&&this.C(r,void 0,t,d),d}}}if(i==="setter"){const{name:r}=s;return function(d){const l=this[r];e.call(this,d),this.requestUpdate(r,l,t,!0,d)}}throw Error("Unsupported decorator location: "+i)};function j(t){return(e,s)=>typeof s=="object"?eo(t,e,s):((i,a,n)=>{const r=a.hasOwnProperty(n);return a.constructor.createProperty(n,i),r?Object.getOwnPropertyDescriptor(a,n):void 0})(t,e,s)}function c(t){return j({...t,state:!0,attribute:!1})}const Ds=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",Xi="ccl-web-token",Zi="ccl-tenant-token",ta="ccl-tenant-id",ea="ccl-user";function Zt(){return localStorage.getItem(Xi)}function ct(){return localStorage.getItem(Zi)}function Gn(){return localStorage.getItem(ta)}function Jn(t){localStorage.setItem(Xi,t)}function Ls(t){localStorage.setItem(Zi,t)}function Ns(t){localStorage.setItem(ta,t)}function Yn(t){localStorage.setItem(ea,JSON.stringify(t))}function Qn(){const t=localStorage.getItem(ea);return t?JSON.parse(t):null}function Os(){localStorage.removeItem(Xi),localStorage.removeItem(Zi),localStorage.removeItem(ta),localStorage.removeItem(ea)}class sa extends Error{constructor(e,s){super(s),this.status=e}}async function C(t,e={}){const{token:s,...i}=e,a=s??ct()??Zt(),n=new Headers(i.headers);n.set("Content-Type","application/json"),a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(`${Ds}${t}`,{...i,headers:n});if(r.status===401&&(Os(),window.dispatchEvent(new CustomEvent("ccl:unauthorized"))),!r.ok){let d=r.statusText;try{const l=await r.json();d=l.error??l.message??d}catch{}throw new sa(r.status,d)}if(r.status!==204)return r.json()}const ht={async register(t,e,s){return C("/api/auth/web/register",{method:"POST",body:JSON.stringify({email:t,username:e,password:s}),token:null})},async login(t,e,s){return C("/api/auth/web/login",{method:"POST",body:JSON.stringify({email:t,password:e,sessionName:s}),token:null})},async loginMfa(t,e){return C("/api/auth/web/login/mfa",{method:"POST",body:JSON.stringify({mfaToken:t,...e}),token:null})},async tenantToken(t){return C("/api/auth/tenant-token",{method:"POST",body:JSON.stringify({tenantId:t})})},async listTenants(){return(await C("/api/tenants/mine")).tenants},async mfaStatus(){return C("/api/auth/mfa/status",{method:"GET"})},async mfaSetup(){return C("/api/auth/mfa/setup",{method:"POST",body:JSON.stringify({})})},async mfaEnable(t){return C("/api/auth/mfa/enable",{method:"POST",body:JSON.stringify({code:t})})},async mfaDisable(t){return C("/api/auth/mfa/disable",{method:"POST",body:JSON.stringify(t)})},async mfaRegenerateRecoveryCodes(t){return C("/api/auth/mfa/recovery-codes/regenerate",{method:"POST",body:JSON.stringify(t)})},async listSessions(){return(await C("/api/auth/sessions",{method:"GET"})).sessions},async revokeSession(t){return C(`/api/auth/sessions/${t}/revoke`,{method:"POST",body:JSON.stringify({})})},async revokeOtherSessions(){return C("/api/auth/sessions/revoke-others",{method:"POST",body:JSON.stringify({})})},async listTokens(){return(await C("/api/auth/tokens",{method:"GET"})).tokens},async revokeToken(t){return C(`/api/auth/tokens/${t}/revoke`,{method:"POST",body:JSON.stringify({})})}},at={async create(t){return C("/api/tenants/create",{method:"POST",body:JSON.stringify({name:t})})},async get(t){return C(`/api/tenants/${t}`)},async inviteMember(t,e,s){return C(`/api/tenants/${t}/members`,{method:"POST",body:JSON.stringify({email:e,role:s})})},async removeMember(t,e){return C(`/api/tenants/${t}/members/${e}`,{method:"DELETE"})},async subscription(t){return C(`/api/tenants/${t}/subscription`)},async defaultClaw(t){return C(`/api/tenants/${t}/default-claw`)},async setDefaultClaw(t,e){return C(`/api/tenants/${t}/default-claw`,{method:"PUT",body:JSON.stringify({clawId:e})})},async upgradeToPro(t,e){return C(`/api/tenants/${t}/subscription/pro`,{method:"POST",body:JSON.stringify(e)})},async downgradeToFree(t){return C(`/api/tenants/${t}/subscription/free`,{method:"POST",body:JSON.stringify({})})},async listSourceControlIntegrations(t){return(await C(`/api/tenants/${t}/source-control-integrations`)).integrations},async createSourceControlIntegration(t,e){return C(`/api/tenants/${t}/source-control-integrations`,{method:"POST",body:JSON.stringify(e)})},async updateSourceControlIntegration(t,e,s){return C(`/api/tenants/${t}/source-control-integrations/${e}`,{method:"PATCH",body:JSON.stringify(s)})},async deleteSourceControlIntegration(t,e){return C(`/api/tenants/${t}/source-control-integrations/${e}`,{method:"DELETE"})}},Et={async list(){return(await C("/api/projects")).projects},async create(t){return C("/api/projects",{method:"POST",body:JSON.stringify(t)})},async upsert(t){return C("/api/projects/upsert",{method:"POST",body:JSON.stringify(t)})},async scaffold(t){return C("/api/projects/scaffold",{method:"POST",body:JSON.stringify(t)})},async update(t,e){return C(`/api/projects/${t}`,{method:"PATCH",body:JSON.stringify(e)})},async remove(t){return C(`/api/projects/${t}`,{method:"DELETE"})}},ot={async list(t){const e=new URLSearchParams;return t?.projectId&&e.set("project_id",t.projectId),t?.status&&e.set("status",t.status),t?.archived&&e.set("archived","true"),(await C(`/api/tasks${e.size?`?${e}`:""}`)).tasks.map(i=>({...i,assignedClawId:i.assignedClawId==null?void 0:String(i.assignedClawId)}))},async create(t){const e={...t,projectId:t.projectId===void 0?void 0:Number(t.projectId),assignedClawId:t.assignedClawId===void 0?void 0:t.assignedClawId===""?null:Number(t.assignedClawId)},s=await C("/api/tasks",{method:"POST",body:JSON.stringify(e)});return{...s,assignedClawId:s.assignedClawId==null?void 0:String(s.assignedClawId)}},async update(t,e){const s={...e,projectId:e.projectId===void 0?void 0:Number(e.projectId),assignedClawId:e.assignedClawId===void 0?void 0:e.assignedClawId===""?null:Number(e.assignedClawId)},i=await C(`/api/tasks/${t}`,{method:"PATCH",body:JSON.stringify(s)});return{...i,assignedClawId:i.assignedClawId==null?void 0:String(i.assignedClawId)}},async remove(t){return C(`/api/tasks/${t}`,{method:"DELETE"})},async run(t,e){return C("/api/runtime/executions",{method:"POST",body:JSON.stringify({taskId:Number(t),payload:e})})},async executions(t){return C(`/api/runtime/tasks/${t}/executions`)}},pt={async list(){return(await C("/api/claws")).claws},async register(t){return C("/api/claws",{method:"POST",body:JSON.stringify({name:t})})},async remove(t){return C(`/api/claws/${t}`,{method:"DELETE"})},async projects(t){return(await C(`/api/claws/${t}/projects`)).projects},async associateProject(t,e){return C(`/api/claws/${t}/projects/${e}`,{method:"PUT"})},async unassociateProject(t,e){return C(`/api/claws/${t}/projects/${e}`,{method:"DELETE"})},async directories(t){return(await C(`/api/claws/${t}/directories`)).directories},async directoryFiles(t,e){return(await C(`/api/claws/${t}/directories/${e}/files`)).files},async directoryFileContent(t,e,s){return C(`/api/claws/${t}/directories/${e}/files/content?path=${encodeURIComponent(s)}`)},async status(t){return C(`/api/claws/${t}/status`)},wsUrl(t){const s=(typeof Ds=="string"?Ds:"https://api.coderclaw.ai").replace(/^http/,"ws"),i=ct()??"";return`${s}/api/claws/${t}/ws?token=${encodeURIComponent(i)}`}},qs={async list(){return(await C("/marketplace/skills")).skills}},qe={async listTenant(){return(await C("/api/skill-assignments/tenant")).assignments},async assignTenant(t){return C("/api/skill-assignments/tenant",{method:"POST",body:JSON.stringify({slug:t})})},async unassignTenant(t){return C(`/api/skill-assignments/tenant/${t}`,{method:"DELETE"})},async assignClaw(t,e){return C(`/api/skill-assignments/claws/${t}`,{method:"POST",body:JSON.stringify({skillSlug:e})})}},ia={async list(t){const e=new URLSearchParams;return t?.taskId&&e.set("taskId",t.taskId),t?.clawId&&e.set("clawId",t.clawId),C(`/api/runtime/executions${e.size?`?${e}`:""}`)}},Ws={async chat(t,e){const s=await fetch(`${Ds}/llm/v1/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",...ct()?{Authorization:`Bearer ${ct()}`}:{}},body:JSON.stringify({messages:t,stream:!1,temperature:e?.temperature,max_tokens:e?.maxTokens})});if(!s.ok){let i=s.statusText;try{const a=await s.json();i=a.error??a.message??i}catch{}throw new sa(s.status,i)}return s.json()},async usage(t=30){const e=new URLSearchParams;return e.set("days",String(t)),C(`/llm/v1/usage?${e.toString()}`)}};function bt(t,e={}){return C(t,{...e,token:Zt()})}const rt={async users(){return(await bt("/api/admin/users")).users},async tenants(){return(await bt("/api/admin/tenants")).tenants},async health(){return bt("/api/admin/health")},async errors(){return(await bt("/api/admin/errors")).errors},async impersonate(t,e){return bt("/api/admin/impersonate",{method:"POST",body:JSON.stringify({userId:t,tenantId:e})})},async llmUsage(t=30){return bt(`/api/admin/llm-usage?days=${t}`)},async securityUsers(t){return(await bt(`/api/admin/security/users?tenantId=${t}`)).users},async securityDetails(t,e){return bt(`/api/admin/security/users/${encodeURIComponent(e)}?tenantId=${t}`)},async securityMfaSetup(t,e){return bt(`/api/admin/security/users/${encodeURIComponent(e)}/mfa/setup?tenantId=${t}`,{method:"POST",body:JSON.stringify({})})},async securityMfaEnable(t,e,s){return bt(`/api/admin/security/users/${encodeURIComponent(e)}/mfa/enable?tenantId=${t}`,{method:"POST",body:JSON.stringify({code:s})})},async securityMfaDisable(t,e,s){return bt(`/api/admin/security/users/${encodeURIComponent(e)}/mfa/disable?tenantId=${t}`,{method:"POST",body:JSON.stringify(s)})},async securityRegenerateRecoveryCodes(t,e,s){return bt(`/api/admin/security/users/${encodeURIComponent(e)}/mfa/recovery-codes/regenerate?tenantId=${t}`,{method:"POST",body:JSON.stringify(s)})},async securityRevokeSession(t,e,s){return bt(`/api/admin/security/users/${encodeURIComponent(e)}/sessions/${encodeURIComponent(s)}/revoke?tenantId=${t}`,{method:"POST",body:JSON.stringify({})})},async securityRevokeAllSessions(t,e){return bt(`/api/admin/security/users/${encodeURIComponent(e)}/sessions/revoke-all?tenantId=${t}`,{method:"POST",body:JSON.stringify({})})},async securityRevokeToken(t,e,s){return bt(`/api/admin/security/users/${encodeURIComponent(e)}/tokens/${encodeURIComponent(s)}/revoke?tenantId=${t}`,{method:"POST",body:JSON.stringify({})})}},Wa=Object.freeze(Object.defineProperty({__proto__:null,ApiError:sa,adminApi:rt,auth:ht,claws:pt,clearSession:Os,executions:ia,getTenantId:Gn,getTenantToken:ct,getUser:Qn,getWebToken:Zt,llm:Ws,marketplace:qs,projects:Et,setTenantId:Ns,setTenantToken:Ls,setUser:Yn,setWebToken:Jn,skillAssignments:qe,tasks:ot,tenants:at},Symbol.toStringTag,{value:"Module"}));var so=Object.defineProperty,io=Object.getOwnPropertyDescriptor,ue=(t,e,s,i)=>{for(var a=i>1?void 0:i?io(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&so(e,s,a),a};let te=class extends K{constructor(){super(...arguments),this.currentPm="npm",this.currentMode="oneliner",this.currentHackable="installer",this.currentBeta=!1,this.osPickerExpanded=!1,this.currentWinShell="powershell",this.copiedCommand=null,this.comments={oneliner:{stable:"# Works everywhere. Installs everything. You're welcome. 🦞",beta:"# Living on the edge. Bugs are features you found first. 🦞"},quickInstall:{stable:"# Install CoderClaw",beta:"# Install CoderClaw (beta) — Fresh from the lab 🧪"},quickOnboard:{stable:"# Meet your lobster",beta:"# Meet your experimental lobster"}},this.windowsPsCmd="iwr -useb https://coderclaw.ai/install.ps1 | iex",this.windowsPsBetaCmd="& ([scriptblock]::Create((iwr -useb https://coderclaw.ai/install.ps1))) -Tag beta",this.windowsCmdCmd="curl -fsSL https://coderclaw.ai/install.cmd -o install.cmd && install.cmd && del install.cmd",this.windowsCmdBetaCmd="curl -fsSL https://coderclaw.ai/install.cmd -o install.cmd && install.cmd --tag beta && del install.cmd",this._selectedOs=this.currentOs}createRenderRoot(){return this}get currentOs(){return navigator.userAgentData?.platform==="Windows"||navigator.userAgent.toLowerCase().includes("windows")?"windows":"unix"}get selectedOs(){return this._selectedOs}set selectedOs(t){this._selectedOs=t}get osLabel(){return this.selectedOs==="windows"?"Windows":"macOS/Linux"}get betaMode(){return this.currentBeta?"beta":"stable"}get onelinerCommand(){return this.selectedOs==="unix"?this.currentBeta?"curl -fsSL https://coderclaw.ai/install.sh | bash -s -- --beta":"curl -fsSL https://coderclaw.ai/install.sh | bash":this.currentWinShell==="cmd"?this.currentBeta?this.windowsCmdBetaCmd:this.windowsCmdCmd:this.currentBeta?this.windowsPsBetaCmd:this.windowsPsCmd}get quickInstallCommand(){const t=this.currentBeta?"@beta":"";return this.currentPm==="npm"?`npm i -g coderclaw${t}`:`pnpm add -g coderclaw${t}`}async copyCommand(t,e){let s=!1;try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(e),s=!0;else{const i=document.createElement("textarea");i.value=e,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i);try{i.select(),s=document.execCommand("copy")}finally{i.remove()}}}catch{s=!1}s&&(this.copiedCommand=t,window.setTimeout(()=>{this.copiedCommand===t&&(this.copiedCommand=null)},2e3))}renderCopyButton(t,e){const s=this.copiedCommand===t;return o`
      <button class="copy-line-btn ${s?"copied":""}" @click=${()=>this.copyCommand(t,e)} title="Copy">
        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style=${s?"display:none":""}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style=${s?"display:block":"display:none"}><polyline points="20 6 9 17 4 12"/></svg>
      </button>
    `}render(){const t=this.currentMode==="oneliner",e=this.currentMode==="quick",s=this.currentMode==="hackable",i=this.currentMode==="oneliner"||this.currentMode==="quick",a=t&&this.selectedOs==="windows";return o`
      <section class="quickstart quickstart-skin">
        <h2 class="section-title">
          <span class="claw-accent">⟩</span> Quick Start
        </h2>
        <div class="code-block">
          <div class="code-header">
            <span class="code-dot"></span>
            <span class="code-dot"></span>
            <span class="code-dot"></span>

            <div class="mode-switch">
              <button class="mode-btn ${this.currentMode==="oneliner"?"active":""}" @click=${()=>{this.currentMode="oneliner",this.osPickerExpanded=!1}}>One-liner</button>
              <button class="mode-btn ${this.currentMode==="quick"?"active":""}" @click=${()=>{this.currentMode="quick",this.osPickerExpanded=!1}}>npm</button>
              <button class="mode-btn ${this.currentMode==="hackable"?"active":""}" @click=${()=>{this.currentMode="hackable",this.osPickerExpanded=!1}}>Hackable</button>
              <button class="mode-btn ${this.currentMode==="macos"?"active":""}" @click=${()=>{this.currentMode="macos",this.osPickerExpanded=!1}}>macOS</button>
            </div>

            <div class="pm-switch" style=${e?"display:flex":"display:none"}>
              <button class="pm-btn ${this.currentPm==="npm"?"active":""}" @click=${()=>{this.currentPm="npm"}}>npm</button>
              <button class="pm-btn ${this.currentPm==="pnpm"?"active":""}" @click=${()=>{this.currentPm="pnpm"}}>pnpm</button>
            </div>

            <div class="hackable-switch" style=${s?"display:flex":"display:none"}>
              <button class="hackable-btn ${this.currentHackable==="installer"?"active":""}" @click=${()=>{this.currentHackable="installer"}}>installer</button>
              <button class="hackable-btn ${this.currentHackable==="pnpm"?"active":""}" @click=${()=>{this.currentHackable="pnpm"}}>pnpm</button>
            </div>

            <div class="os-indicator" style=${t&&!this.osPickerExpanded?"display:flex":"display:none"}>
              <span class="os-detected">${this.osLabel}</span>
              <button class="os-change-btn" @click=${()=>{this.osPickerExpanded=!0}}>change</button>
            </div>

            <div class="os-switch" style=${t&&this.osPickerExpanded?"display:flex":"display:none"}>
              <button class="os-btn ${this.selectedOs==="unix"?"active":""}" @click=${()=>{this.selectedOs="unix",this.osPickerExpanded=!1}}>macOS/Linux</button>
              <button class="os-btn ${this.selectedOs==="windows"?"active":""}" @click=${()=>{this.selectedOs="windows",this.osPickerExpanded=!1}}>Windows</button>
            </div>

            <div class="win-shell-switch" style=${a?"display:flex":"display:none"}>
              <button class="win-shell-btn ${this.currentWinShell==="powershell"?"active":""}" @click=${()=>{this.currentWinShell="powershell"}}>PowerShell</button>
              <button class="win-shell-btn ${this.currentWinShell==="cmd"?"active":""}" @click=${()=>{this.currentWinShell="cmd"}}>CMD</button>
            </div>

            <div class="beta-switch" style=${i?"display:flex":"display:none"}>
              <button class="beta-btn ${this.currentBeta?"active":""}" @click=${()=>{this.currentBeta=!this.currentBeta}}>
                <span class="beta-label">β</span>
                <span class="beta-text">Beta</span>
              </button>
            </div>

            <div class="switch-placeholder" style=${!t&&!e&&!s&&!i?"display:block":"display:none"} aria-hidden="true"></div>
          </div>

          <div class="code-content" style=${this.currentMode==="oneliner"?"display:block":"display:none"}>
            <div class="code-line comment">${this.comments.oneliner[this.betaMode]}</div>
            <div class="code-line cmd">
              <span class="code-prompt">$</span>
              <span class="os-cmd">${this.onelinerCommand}</span>
              ${this.renderCopyButton("oneliner",this.onelinerCommand)}
            </div>
          </div>

          <div class="code-content" style=${this.currentMode==="quick"?"display:block":"display:none"}>
            <div class="code-line comment">${this.comments.quickInstall[this.betaMode]}</div>
            <div class="code-line cmd">
              <span class="code-prompt">$</span>
              <span class="pm-install">${this.quickInstallCommand}</span>
              ${this.renderCopyButton("install",this.quickInstallCommand)}
            </div>
            <div class="code-line comment">${this.comments.quickOnboard[this.betaMode]}</div>
            <div class="code-line cmd">
              <span class="code-prompt">$</span>
              <span>coderclaw onboard</span>
              ${this.renderCopyButton("onboard","coderclaw onboard")}
            </div>
          </div>

          <div class="code-content" style=${this.currentMode==="hackable"?"display:block":"display:none"}>
            <div style=${this.currentHackable==="installer"?"display:block":"display:none"}>
              <div class="code-line comment"># For those who read source code for fun</div>
              <div class="code-line cmd">
                <span class="code-prompt">$</span>
                <span class="os-cmd-hackable">curl -fsSL https://coderclaw.ai/install.sh | bash -s -- --install-method git</span>
                ${this.renderCopyButton("hackable-installer","curl -fsSL https://coderclaw.ai/install.sh | bash -s -- --install-method git")}
              </div>
            </div>
            <div style=${this.currentHackable==="pnpm"?"display:block":"display:none"}>
              <div class="code-line comment"># You clearly know what you're doing</div>
              <div class="code-line cmd">
                <span class="code-prompt">$</span>
                <span>git clone https://github.com/seanhogg/coderclaw.git</span>
                ${this.renderCopyButton("clone","git clone https://github.com/seanhogg/coderclaw.git")}
              </div>
              <div class="code-line cmd">
                <span class="code-prompt">$</span>
                <span>cd coderclaw && pnpm install && pnpm run build</span>
                ${this.renderCopyButton("build","cd coderclaw && pnpm install && pnpm run build")}
              </div>
              <div class="code-line comment"># You built it, now meet it</div>
              <div class="code-line cmd">
                <span class="code-prompt">$</span>
                <span>pnpm run coderclaw onboard</span>
                ${this.renderCopyButton("hackable-onboard","node coderclaw.mjs onboard")}
              </div>
            </div>
          </div>

          <div class="code-content" style=${this.currentMode==="macos"?"display:block":"display:none"}>
            <div class="macos-app-content">
              <div class="macos-description">
                <span class="macos-tagline">Companion App (Beta)</span>
                <span class="macos-subtitle">Menubar access to your lobster. Works great alongside the CLI.</span>
              </div>
              <a href="https://github.com/SeanHogg/coderClaw/releases/latest" class="macos-download-btn" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download for macOS
              </a>
              <span class="macos-meta">Requires macOS 14+ · Universal Binary</span>
            </div>
          </div>
        </div>

        <p class="quickstart-note">Works on macOS, Windows & Linux. The one-liner installs Node.js and everything else for you.</p>
      </section>
    `}};ue([c()],te.prototype,"currentPm",2);ue([c()],te.prototype,"currentMode",2);ue([c()],te.prototype,"currentHackable",2);ue([c()],te.prototype,"currentBeta",2);ue([c()],te.prototype,"osPickerExpanded",2);ue([c()],te.prototype,"currentWinShell",2);ue([c()],te.prototype,"copiedCommand",2);te=ue([Q("ccl-quickstart")],te);var ao=Object.defineProperty,no=Object.getOwnPropertyDescriptor,St=(t,e,s,i)=>{for(var a=i>1?void 0:i?no(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&ao(e,s,a),a};let yt=class extends K{constructor(){super(...arguments),this.mode="login",this.email="",this.username="",this.password="",this.loading=!1,this.error="",this.mfaStep=!1,this.mfaToken="",this.mfaCode="",this.recoveryCode="",this.mfaMethod="totp",this.pendingUser=null,this.showRegisterQuickstart=!1,this.checkingQuickstartVisibility=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.refreshRegisterQuickstartVisibility()}updated(t){t.has("mode")&&this.refreshRegisterQuickstartVisibility()}async refreshRegisterQuickstartVisibility(){if(this.mode!=="register"){this.showRegisterQuickstart=!1;return}if(!this.checkingQuickstartVisibility){this.checkingQuickstartVisibility=!0;try{const t=await pt.list();this.showRegisterQuickstart=t.length===0}catch{this.showRegisterQuickstart=!0}finally{this.checkingQuickstartVisibility=!1}}}async submit(t){if(t.preventDefault(),!(!this.email||!this.password)){this.loading=!0,this.error="";try{const e=this.mode==="login"?await ht.login(this.email,this.password,"Web App"):await ht.register(this.email,this.username||this.email.split("@")[0],this.password);if(this.mode==="login"&&"mfaRequired"in e&&e.mfaRequired){const i=e;this.mfaStep=!0,this.mfaToken=i.mfaToken,this.pendingUser=i.user,this.mfaCode="",this.recoveryCode="";return}const s=e;this.dispatchEvent(new CustomEvent(this.mode==="register"?"register":"login",{detail:{token:s.token,user:s.user},bubbles:!0,composed:!0}))}catch(e){this.error=e.message??"An error occurred"}finally{this.loading=!1}}}async submitMfa(t){if(t.preventDefault(),!!this.mfaToken&&!(this.mfaMethod==="totp"&&!this.mfaCode.trim())&&!(this.mfaMethod==="recovery"&&!this.recoveryCode.trim())){this.loading=!0,this.error="";try{const e=await ht.loginMfa(this.mfaToken,{code:this.mfaMethod==="totp"?this.mfaCode.trim():void 0,recoveryCode:this.mfaMethod==="recovery"?this.recoveryCode.trim():void 0,sessionName:"Web App"});this.dispatchEvent(new CustomEvent("login",{detail:{token:e.token,user:e.user},bubbles:!0,composed:!0}))}catch(e){this.error=e.message??"MFA verification failed"}finally{this.loading=!1}}}resetMfaStep(){this.mfaStep=!1,this.mfaToken="",this.mfaCode="",this.recoveryCode="",this.mfaMethod="totp",this.pendingUser=null}render(){return o`
      <div class="auth-shell">
        <div class="auth-card">
          <div class="auth-logo">
            <img src="/claw-logo.png" alt="CoderClawLink" onerror="this.style.display='none'" style="width:36px;height:36px">
            <div>
              <div class="auth-logo-name">CoderClawLink</div>
              <div class="auth-logo-sub">AI Coding Mesh</div>
            </div>
          </div>

          <div class="auth-title">
            ${this.mfaStep?"Multi-factor verification":this.mode==="login"?"Welcome back":"Create account"}
          </div>
          <div class="auth-sub">
            ${this.mfaStep?`Verify ${this.pendingUser?.email??this.email} to continue`:this.mode==="login"?"Sign in to your workspace":"Get started with CoderClawLink"}
          </div>

          ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

          ${this.mfaStep?o`
            <form @submit=${this.submitMfa} style="display:grid;gap:14px">
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button
                  type="button"
                  class="btn ${this.mfaMethod==="totp"?"btn-primary":"btn-secondary"} btn-sm"
                  @click=${()=>{this.mfaMethod="totp",this.error=""}}
                >
                  Authenticator app
                </button>
                <button
                  type="button"
                  class="btn ${this.mfaMethod==="recovery"?"btn-primary":"btn-secondary"} btn-sm"
                  @click=${()=>{this.mfaMethod="recovery",this.error=""}}
                >
                  Recovery code
                </button>
              </div>

              ${this.mfaMethod==="totp"?o`
                <div class="field">
                  <label class="label">6-digit code</label>
                  <input
                    class="input"
                    type="text"
                    placeholder="123456"
                    .value=${this.mfaCode}
                    @input=${t=>{this.mfaCode=t.target.value}}
                    autocomplete="one-time-code"
                    inputmode="numeric"
                    required
                  >
                </div>
              `:o`
                <div class="field">
                  <label class="label">Recovery code</label>
                  <input
                    class="input"
                    type="text"
                    placeholder="ABCD-EFGH"
                    .value=${this.recoveryCode}
                    @input=${t=>{this.recoveryCode=t.target.value}}
                    autocomplete="off"
                    required
                  >
                </div>
              `}

              <button
                class="btn btn-primary btn-full btn-lg"
                type="submit"
                ?disabled=${this.loading}
              >
                ${this.loading?"Verifying…":"Verify and sign in"}
              </button>

              <button
                class="btn btn-secondary btn-full"
                type="button"
                @click=${()=>{this.resetMfaStep()}}
                ?disabled=${this.loading}
              >
                Back
              </button>
            </form>
          `:o`
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
            ${this.mode==="register"?o`
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
          `}

          <div class="auth-toggle">
            ${this.mode==="login"?o`Don't have an account? <a @click=${()=>{this.mode="register",this.error="",this.resetMfaStep()}}>Sign up</a>`:o`Already have an account? <a @click=${()=>{this.mode="login",this.error="",this.resetMfaStep()}}>Sign in</a>`}
          </div>
        </div>

        ${this.mode==="register"&&this.showRegisterQuickstart&&!this.mfaStep?o`
            <div style="margin-top:20px;width:min(980px,95vw)">
              <ccl-quickstart></ccl-quickstart>
            </div>
          `:""}
      </div>
    `}};St([c()],yt.prototype,"mode",2);St([c()],yt.prototype,"email",2);St([c()],yt.prototype,"username",2);St([c()],yt.prototype,"password",2);St([c()],yt.prototype,"loading",2);St([c()],yt.prototype,"error",2);St([c()],yt.prototype,"mfaStep",2);St([c()],yt.prototype,"mfaToken",2);St([c()],yt.prototype,"mfaCode",2);St([c()],yt.prototype,"recoveryCode",2);St([c()],yt.prototype,"mfaMethod",2);St([c()],yt.prototype,"pendingUser",2);St([c()],yt.prototype,"showRegisterQuickstart",2);St([c()],yt.prototype,"checkingQuickstartVisibility",2);yt=St([Q("ccl-auth")],yt);var ro=Object.defineProperty,oo=Object.getOwnPropertyDescriptor,Ae=(t,e,s,i)=>{for(var a=i>1?void 0:i?oo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&ro(e,s,a),a};let de=class extends K{constructor(){super(...arguments),this.tenants=[],this.user=null,this.showCreate=!1,this.newName="",this.creating=!1,this.error=""}createRenderRoot(){return this}selectTenant(t){this.dispatchEvent(new CustomEvent("select-tenant",{detail:t,bubbles:!0,composed:!0}))}async createTenant(t){if(t.preventDefault(),!!this.newName.trim()){this.creating=!0,this.error="";try{this.dispatchEvent(new CustomEvent("create-tenant",{detail:{name:this.newName.trim()},bubbles:!0,composed:!0}))}catch(e){this.error=e.message,this.creating=!1}}}signOut(){this.dispatchEvent(new CustomEvent("sign-out",{bubbles:!0,composed:!0}))}render(){return o`
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
            ${this.tenants.length===0?o`<div style="text-align:center;color:var(--muted);padding:32px 0;font-size:14px">
                  No workspaces yet — create your first one below.
                </div>`:this.tenants.map(t=>o`
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
            ${this.showCreate?o`
                <div class="card">
                  <div class="card-title" style="margin-bottom:16px">New workspace</div>
                  ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
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
              `:o`
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
    `}};Ae([j({type:Array})],de.prototype,"tenants",2);Ae([j({type:Object})],de.prototype,"user",2);Ae([c()],de.prototype,"showCreate",2);Ae([c()],de.prototype,"newName",2);Ae([c()],de.prototype,"creating",2);Ae([c()],de.prototype,"error",2);de=Ae([Q("ccl-workspace-picker")],de);var lo=Object.defineProperty,co=Object.getOwnPropertyDescriptor,He=(t,e,s,i)=>{for(var a=i>1?void 0:i?co(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&lo(e,s,a),a};let Ce=class extends K{constructor(){super(...arguments),this.tenantId="",this.projects=[],this.claws=[],this.loading=!0,this.prompt=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([Et.list().catch(()=>[]),pt.list().catch(()=>[])]);this.projects=t,this.claws=e}finally{this.loading=!1}}dispatch(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e??{}}))}handlePrompt(t){t.preventDefault();const e=this.prompt.trim();e&&(this.dispatch("ccl:dashboard-prompt",{prompt:e}),this.prompt="")}statusBadge(t){return o`<span class="badge ${{active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"}[t]??"badge-gray"}">${t.replace("_"," ")}</span>`}render(){const t=this.claws.filter(e=>e.connectedAt);return o`
      <div style="max-width:960px;margin:0 auto;padding:40px 24px">

        <!-- Prompt -->
        <div style="text-align:center;margin-bottom:52px">
          <h1 style="font-size:26px;font-weight:700;color:var(--text-strong);margin:0 0 6px">
            What should we build?
          </h1>
          <p style="color:var(--muted);font-size:14px;margin:0 0 20px">
            Describe a task and CoderClaw will get it done
          </p>
          <form @submit=${this.handlePrompt}
            style="display:grid;gap:10px;max-width:760px;margin:0 auto">
            <div style="display:flex;gap:10px">
              <input
                class="input"
                style="flex:1;font-size:14px;padding:10px 14px"
                placeholder="Build a budget tracker with Material UI components…"
                .value=${this.prompt}
                @input=${e=>{this.prompt=e.target.value}}
              >
              <button class="btn btn-primary" type="submit" style="white-space:nowrap;padding:10px 18px">
                Send to Claw
              </button>
            </div>
          </form>
          <div style="margin-top:10px;font-size:12px;color:var(--muted)">
            ${t.length>0?o`${t.length} claw${t.length!==1?"s":""} connected
                  · ${t.map(e=>e.name).join(", ")}`:o`No claws connected —
                  <button class="btn btn-ghost btn-sm"
                    style="font-size:12px;padding:2px 6px"
                    @click=${()=>this.dispatch("ccl:navigate",{tab:"claws"})}>
                    set up a claw
                  </button>`}
          </div>
        </div>

        <!-- Projects -->
        <section style="margin-bottom:40px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <div style="font-size:15px;font-weight:600;color:var(--text-strong)">Projects</div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost btn-sm"
                @click=${()=>this.dispatch("ccl:navigate",{tab:"projects"})}>
                View all
              </button>
              <button class="btn btn-primary btn-sm"
                @click=${()=>this.dispatch("ccl:new-project")}>
                <svg viewBox="0 0 24 24" style="width:13px;height:13px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New project
              </button>
            </div>
          </div>

          ${this.loading?o`<div style="color:var(--muted);font-size:13px;padding:12px 0">Loading…</div>`:this.projects.length===0?o`
                <div class="empty-state" style="padding:28px">
                  <div class="empty-state-icon">📁</div>
                  <div class="empty-state-title">No projects yet</div>
                  <div class="empty-state-sub">Create your first project to start organizing work</div>
                  <button class="btn btn-primary" style="margin-top:14px"
                    @click=${()=>this.dispatch("ccl:new-project")}>
                    Create project
                  </button>
                </div>`:o`
                <div class="grid grid-3">
                  ${this.projects.map(e=>o`
                    <div class="card" style="cursor:pointer;transition:border-color .15s"
                      @click=${()=>this.dispatch("ccl:open-project",{projectId:String(e.id)})}
                      @mouseenter=${s=>{s.currentTarget.style.borderColor="var(--accent)"}}
                      @mouseleave=${s=>{s.currentTarget.style.borderColor=""}}>
                      <div class="card-header">
                        <div>
                          <div class="card-title">${e.name}</div>
                          <div style="font-size:11px;font-family:var(--mono);color:var(--muted);margin-top:2px">${e.key}</div>
                        </div>
                        ${this.statusBadge(e.status)}
                      </div>
                      ${e.description?o`<div style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:8px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${e.description}</div>`:""}
                      <div style="font-size:12px;color:var(--muted);margin-top:4px">
                        ${e.taskCount!=null?`${e.taskCount} task${e.taskCount!==1?"s":""}`:"No tasks yet"}
                      </div>
                    </div>
                  `)}
                </div>`}
        </section>

        <!-- Claws -->
        <section>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <div style="font-size:15px;font-weight:600;color:var(--text-strong)">Claws</div>
            <button class="btn btn-ghost btn-sm"
              @click=${()=>this.dispatch("ccl:navigate",{tab:"claws"})}>
              Manage claws
            </button>
          </div>

          ${this.loading?o`<div style="color:var(--muted);font-size:13px;padding:12px 0">Loading…</div>`:this.claws.length===0?o`
                <div class="empty-state" style="padding:28px">
                  <div class="empty-state-icon">🦀</div>
                  <div class="empty-state-title">No claws registered</div>
                  <div class="empty-state-sub">Register a CoderClaw instance to start delegating work</div>
                  <button class="btn btn-primary" style="margin-top:14px"
                    @click=${()=>this.dispatch("ccl:navigate",{tab:"claws"})}>
                    Register a claw
                  </button>
                </div>`:o`
                <div class="grid grid-3">
                  ${this.claws.map(e=>o`
                    <div class="card">
                      <div class="card-header">
                        <div>
                          <div class="card-title">${e.name}</div>
                          <div style="font-size:11px;font-family:var(--mono);color:var(--muted);margin-top:2px">${e.slug}</div>
                        </div>
                        <span class="badge ${e.connectedAt?"badge-green":"badge-gray"}">
                          ${e.connectedAt?"online":"offline"}
                        </span>
                      </div>
                      ${e.lastSeenAt?o`<div style="font-size:12px;color:var(--muted)">
                            Last seen ${new Date(e.lastSeenAt).toLocaleString()}
                          </div>`:o`<div style="font-size:12px;color:var(--muted)">Never connected</div>`}
                    </div>
                  `)}
                </div>`}
        </section>

      </div>
    `}};He([j()],Ce.prototype,"tenantId",2);He([c()],Ce.prototype,"projects",2);He([c()],Ce.prototype,"claws",2);He([c()],Ce.prototype,"loading",2);He([c()],Ce.prototype,"prompt",2);Ce=He([Q("ccl-dashboard")],Ce);const ho={CHILD:2},po=t=>(...e)=>({_$litDirective$:t,values:e});class uo{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,i){this._$Ct=e,this._$AM=s,this._$Ci=i}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}}class Ni extends uo{constructor(e){if(super(e),this.it=lt,e.type!==ho.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===lt||e==null)return this._t=void 0,this.it=e;if(e===xe)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const s=[e];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}Ni.directiveName="unsafeHTML",Ni.resultType=1;const Xn=po(Ni);function aa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ie=aa();function Zn(t){Ie=t}var we={exec:()=>null};function F(t,e=""){let s=typeof t=="string"?t:t.source,i={replace:(a,n)=>{let r=typeof n=="string"?n:n.source;return r=r.replace($t.caret,"$1"),s=s.replace(a,r),i},getRegex:()=>new RegExp(s,e)};return i}var go=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),$t={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}>`)},mo=/^(?:[ \t]*(?:\n|$))+/,fo=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,vo=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,us=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,yo=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,na=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,tr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,er=F(tr).replace(/bull/g,na).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),bo=F(tr).replace(/bull/g,na).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ra=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,wo=/^[^\n]+/,oa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,$o=F(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",oa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ko=F(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,na).getRegex(),Hs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",la=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,xo=F("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",la).replace("tag",Hs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),sr=F(ra).replace("hr",us).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hs).getRegex(),Co=F(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",sr).getRegex(),ca={blockquote:Co,code:fo,def:$o,fences:vo,heading:yo,hr:us,html:xo,lheading:er,list:ko,newline:mo,paragraph:sr,table:we,text:wo},Ha=F("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",us).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hs).getRegex(),So={...ca,lheading:bo,table:Ha,paragraph:F(ra).replace("hr",us).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ha).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hs).getRegex()},To={...ca,html:F(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",la).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:we,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:F(ra).replace("hr",us).replace("heading",` *#{1,6} *[^
]`).replace("lheading",er).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Eo=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ao=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ir=/^( {2,}|\\)\n(?!\s*$)/,Io=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ks=/[\p{P}\p{S}]/u,da=/[\s\p{P}\p{S}]/u,ar=/[^\s\p{P}\p{S}]/u,_o=F(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,da).getRegex(),nr=/(?!~)[\p{P}\p{S}]/u,Po=/(?!~)[\s\p{P}\p{S}]/u,Ro=/(?:[^\s\p{P}\p{S}]|~)/u,rr=/(?![*_])[\p{P}\p{S}]/u,Mo=/(?![*_])[\s\p{P}\p{S}]/u,Do=/(?:[^\s\p{P}\p{S}]|[*_])/u,Lo=F(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",go?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),or=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,No=F(or,"u").replace(/punct/g,Ks).getRegex(),Oo=F(or,"u").replace(/punct/g,nr).getRegex(),lr="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",jo=F(lr,"gu").replace(/notPunctSpace/g,ar).replace(/punctSpace/g,da).replace(/punct/g,Ks).getRegex(),Uo=F(lr,"gu").replace(/notPunctSpace/g,Ro).replace(/punctSpace/g,Po).replace(/punct/g,nr).getRegex(),Bo=F("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ar).replace(/punctSpace/g,da).replace(/punct/g,Ks).getRegex(),zo=F(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,rr).getRegex(),Fo="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",qo=F(Fo,"gu").replace(/notPunctSpace/g,Do).replace(/punctSpace/g,Mo).replace(/punct/g,rr).getRegex(),Wo=F(/\\(punct)/,"gu").replace(/punct/g,Ks).getRegex(),Ho=F(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ko=F(la).replace("(?:-->|$)","-->").getRegex(),Vo=F("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ko).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),js=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Go=F(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",js).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),cr=F(/^!?\[(label)\]\[(ref)\]/).replace("label",js).replace("ref",oa).getRegex(),dr=F(/^!?\[(ref)\](?:\[\])?/).replace("ref",oa).getRegex(),Jo=F("reflink|nolink(?!\\()","g").replace("reflink",cr).replace("nolink",dr).getRegex(),Ka=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ha={_backpedal:we,anyPunctuation:Wo,autolink:Ho,blockSkip:Lo,br:ir,code:Ao,del:we,delLDelim:we,delRDelim:we,emStrongLDelim:No,emStrongRDelimAst:jo,emStrongRDelimUnd:Bo,escape:Eo,link:Go,nolink:dr,punctuation:_o,reflink:cr,reflinkSearch:Jo,tag:Vo,text:Io,url:we},Yo={...ha,link:F(/^!?\[(label)\]\((.*?)\)/).replace("label",js).getRegex(),reflink:F(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",js).getRegex()},Oi={...ha,emStrongRDelimAst:Uo,emStrongLDelim:Oo,delLDelim:zo,delRDelim:qo,url:F(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ka).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:F(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ka).getRegex()},Qo={...Oi,br:F(ir).replace("{2,}","*").getRegex(),text:F(Oi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ks={normal:ca,gfm:So,pedantic:To},Ze={normal:ha,gfm:Oi,breaks:Qo,pedantic:Yo},Xo={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Va=t=>Xo[t];function zt(t,e){if(e){if($t.escapeTest.test(t))return t.replace($t.escapeReplace,Va)}else if($t.escapeTestNoEncode.test(t))return t.replace($t.escapeReplaceNoEncode,Va);return t}function Ga(t){try{t=encodeURI(t).replace($t.percentDecode,"%")}catch{return null}return t}function Ja(t,e){let s=t.replace($t.findPipe,(n,r,d)=>{let l=!1,u=r;for(;--u>=0&&d[u]==="\\";)l=!l;return l?"|":" |"}),i=s.split($t.splitPipe),a=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),e)if(i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;a<i.length;a++)i[a]=i[a].trim().replace($t.slashPipe,"|");return i}function ts(t,e,s){let i=t.length;if(i===0)return"";let a=0;for(;a<i&&t.charAt(i-a-1)===e;)a++;return t.slice(0,i-a)}function Zo(t,e){if(t.indexOf(e[1])===-1)return-1;let s=0;for(let i=0;i<t.length;i++)if(t[i]==="\\")i++;else if(t[i]===e[0])s++;else if(t[i]===e[1]&&(s--,s<0))return i;return s>0?-2:-1}function tl(t,e=0){let s=e,i="";for(let a of t)if(a==="	"){let n=4-s%4;i+=" ".repeat(n),s+=n}else i+=a,s++;return i}function Ya(t,e,s,i,a){let n=e.href,r=e.title||null,d=t[1].replace(a.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:t[0].charAt(0)==="!"?"image":"link",raw:s,href:n,title:r,text:d,tokens:i.inlineTokens(d)};return i.state.inLink=!1,l}function el(t,e,s){let i=t.match(s.other.indentCodeCompensation);if(i===null)return e;let a=i[1];return e.split(`
`).map(n=>{let r=n.match(s.other.beginningSpace);if(r===null)return n;let[d]=r;return d.length>=a.length?n.slice(a.length):n}).join(`
`)}var Us=class{options;rules;lexer;constructor(t){this.options=t||Ie}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let s=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?s:ts(s,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let s=e[0],i=el(s,e[3]||"",this.rules);return{type:"code",raw:s,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:i}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let s=e[2].trim();if(this.rules.other.endingHash.test(s)){let i=ts(s,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(s=i.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:ts(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let s=ts(e[0],`
`).split(`
`),i="",a="",n=[];for(;s.length>0;){let r=!1,d=[],l;for(l=0;l<s.length;l++)if(this.rules.other.blockquoteStart.test(s[l]))d.push(s[l]),r=!0;else if(!r)d.push(s[l]);else break;s=s.slice(l);let u=d.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${u}`:u,a=a?`${a}
${p}`:p;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,n,!0),this.lexer.state.top=m,s.length===0)break;let g=n.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let f=g,y=f.raw+`
`+s.join(`
`),S=this.blockquote(y);n[n.length-1]=S,i=i.substring(0,i.length-f.raw.length)+S.raw,a=a.substring(0,a.length-f.text.length)+S.text;break}else if(g?.type==="list"){let f=g,y=f.raw+`
`+s.join(`
`),S=this.list(y);n[n.length-1]=S,i=i.substring(0,i.length-g.raw.length)+S.raw,a=a.substring(0,a.length-f.raw.length)+S.raw,s=y.substring(n.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:n,text:a}}}list(t){let e=this.rules.block.list.exec(t);if(e){let s=e[1].trim(),i=s.length>1,a={type:"list",raw:"",ordered:i,start:i?+s.slice(0,-1):"",loose:!1,items:[]};s=i?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=i?s:"[*+-]");let n=this.rules.other.listItemRegex(s),r=!1;for(;t;){let l=!1,u="",p="";if(!(e=n.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let m=tl(e[2].split(`
`,1)[0],e[1].length),g=t.split(`
`,1)[0],f=!m.trim(),y=0;if(this.options.pedantic?(y=2,p=m.trimStart()):f?y=e[1].length+1:(y=m.search(this.rules.other.nonSpaceChar),y=y>4?1:y,p=m.slice(y),y+=e[1].length),f&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,t=t.substring(g.length+1),l=!0),!l){let S=this.rules.other.nextBulletRegex(y),G=this.rules.other.hrRegex(y),R=this.rules.other.fencesBeginRegex(y),O=this.rules.other.headingBeginRegex(y),_=this.rules.other.htmlBeginRegex(y),$=this.rules.other.blockquoteBeginRegex(y);for(;t;){let V=t.split(`
`,1)[0],w;if(g=V,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),w=g):w=g.replace(this.rules.other.tabCharGlobal,"    "),R.test(g)||O.test(g)||_.test(g)||$.test(g)||S.test(g)||G.test(g))break;if(w.search(this.rules.other.nonSpaceChar)>=y||!g.trim())p+=`
`+w.slice(y);else{if(f||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(m)||O.test(m)||G.test(m))break;p+=`
`+g}f=!g.trim(),u+=V+`
`,t=t.substring(V.length+1),m=w.slice(y)}}a.loose||(r?a.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(r=!0)),a.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),a.raw+=u}let d=a.items.at(-1);if(d)d.raw=d.raw.trimEnd(),d.text=d.text.trimEnd();else return;a.raw=a.raw.trimEnd();for(let l of a.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,a.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!a.loose){let u=l.tokens.filter(m=>m.type==="space"),p=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));a.loose=p}}if(a.loose)for(let l of a.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return a}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let s=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:s,raw:e[0],href:i,title:a}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let s=Ja(e[1]),i=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),a=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],n={type:"table",raw:e[0],header:[],align:[],rows:[]};if(s.length===i.length){for(let r of i)this.rules.other.tableAlignRight.test(r)?n.align.push("right"):this.rules.other.tableAlignCenter.test(r)?n.align.push("center"):this.rules.other.tableAlignLeft.test(r)?n.align.push("left"):n.align.push(null);for(let r=0;r<s.length;r++)n.header.push({text:s[r],tokens:this.lexer.inline(s[r]),header:!0,align:n.align[r]});for(let r of a)n.rows.push(Ja(r,n.header.length).map((d,l)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:n.align[l]})));return n}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let s=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:s,tokens:this.lexer.inline(s)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let s=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(s)){if(!this.rules.other.endAngleBracket.test(s))return;let n=ts(s.slice(0,-1),"\\");if((s.length-n.length)%2===0)return}else{let n=Zo(e[2],"()");if(n===-2)return;if(n>-1){let r=(e[0].indexOf("!")===0?5:4)+e[1].length+n;e[2]=e[2].substring(0,n),e[0]=e[0].substring(0,r).trim(),e[3]=""}}let i=e[2],a="";if(this.options.pedantic){let n=this.rules.other.pedanticHrefTitle.exec(i);n&&(i=n[1],a=n[3])}else a=e[3]?e[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(s)?i=i.slice(1):i=i.slice(1,-1)),Ya(e,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let s;if((s=this.rules.inline.reflink.exec(t))||(s=this.rules.inline.nolink.exec(t))){let i=(s[2]||s[1]).replace(this.rules.other.multipleSpaceGlobal," "),a=e[i.toLowerCase()];if(!a){let n=s[0].charAt(0);return{type:"text",raw:n,text:n}}return Ya(s,a,s[0],this.lexer,this.rules)}}emStrong(t,e,s=""){let i=this.rules.inline.emStrongLDelim.exec(t);if(!(!i||i[3]&&s.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!s||this.rules.inline.punctuation.exec(s))){let a=[...i[0]].length-1,n,r,d=a,l=0,u=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+a);(i=u.exec(e))!=null;){if(n=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!n)continue;if(r=[...n].length,i[3]||i[4]){d+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){l+=r;continue}if(d-=r,d>0)continue;r=Math.min(r,r+d+l);let p=[...i[0]][0].length,m=t.slice(0,a+i.index+p+r);if(Math.min(a,r)%2){let f=m.slice(1,-1);return{type:"em",raw:m,text:f,tokens:this.lexer.inlineTokens(f)}}let g=m.slice(2,-2);return{type:"strong",raw:m,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let s=e[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(s),a=this.rules.other.startingSpaceChar.test(s)&&this.rules.other.endingSpaceChar.test(s);return i&&a&&(s=s.substring(1,s.length-1)),{type:"codespan",raw:e[0],text:s}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t,e,s=""){let i=this.rules.inline.delLDelim.exec(t);if(i&&(!i[1]||!s||this.rules.inline.punctuation.exec(s))){let a=[...i[0]].length-1,n,r,d=a,l=this.rules.inline.delRDelim;for(l.lastIndex=0,e=e.slice(-1*t.length+a);(i=l.exec(e))!=null;){if(n=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!n||(r=[...n].length,r!==a))continue;if(i[3]||i[4]){d+=r;continue}if(d-=r,d>0)continue;r=Math.min(r,r+d);let u=[...i[0]][0].length,p=t.slice(0,a+i.index+u+r),m=p.slice(a,-a);return{type:"del",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let s,i;return e[2]==="@"?(s=e[1],i="mailto:"+s):(s=e[1],i=s),{type:"link",raw:e[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let s,i;if(e[2]==="@")s=e[0],i="mailto:"+s;else{let a;do a=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(a!==e[0]);s=e[0],e[1]==="www."?i="http://"+e[0]:i=e[0]}return{type:"link",raw:e[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let s=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:s}}}},Mt=class ji{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ie,this.options.tokenizer=this.options.tokenizer||new Us,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let s={other:$t,block:ks.normal,inline:Ze.normal};this.options.pedantic?(s.block=ks.pedantic,s.inline=Ze.pedantic):this.options.gfm&&(s.block=ks.gfm,this.options.breaks?s.inline=Ze.breaks:s.inline=Ze.gfm),this.tokenizer.rules=s}static get rules(){return{block:ks,inline:Ze}}static lex(e,s){return new ji(s).lex(e)}static lexInline(e,s){return new ji(s).inlineTokens(e)}lex(e){e=e.replace($t.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let s=0;s<this.inlineQueue.length;s++){let i=this.inlineQueue[s];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,s=[],i=!1){for(this.options.pedantic&&(e=e.replace($t.tabCharGlobal,"    ").replace($t.spaceLine,""));e;){let a;if(this.options.extensions?.block?.some(r=>(a=r.call({lexer:this},e,s))?(e=e.substring(a.raw.length),s.push(a),!0):!1))continue;if(a=this.tokenizer.space(e)){e=e.substring(a.raw.length);let r=s.at(-1);a.raw.length===1&&r!==void 0?r.raw+=`
`:s.push(a);continue}if(a=this.tokenizer.code(e)){e=e.substring(a.raw.length);let r=s.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+a.raw,r.text+=`
`+a.text,this.inlineQueue.at(-1).src=r.text):s.push(a);continue}if(a=this.tokenizer.fences(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.heading(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.hr(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.blockquote(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.list(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.html(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.def(e)){e=e.substring(a.raw.length);let r=s.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+a.raw,r.text+=`
`+a.raw,this.inlineQueue.at(-1).src=r.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title},s.push(a));continue}if(a=this.tokenizer.table(e)){e=e.substring(a.raw.length),s.push(a);continue}if(a=this.tokenizer.lheading(e)){e=e.substring(a.raw.length),s.push(a);continue}let n=e;if(this.options.extensions?.startBlock){let r=1/0,d=e.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},d),typeof l=="number"&&l>=0&&(r=Math.min(r,l))}),r<1/0&&r>=0&&(n=e.substring(0,r+1))}if(this.state.top&&(a=this.tokenizer.paragraph(n))){let r=s.at(-1);i&&r?.type==="paragraph"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+a.raw,r.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):s.push(a),i=n.length!==e.length,e=e.substring(a.raw.length);continue}if(a=this.tokenizer.text(e)){e=e.substring(a.raw.length);let r=s.at(-1);r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+a.raw,r.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):s.push(a);continue}if(e){let r="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(r);break}else throw new Error(r)}}return this.state.top=!0,s}inline(e,s=[]){return this.inlineQueue.push({src:e,tokens:s}),s}inlineTokens(e,s=[]){let i=e,a=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)l.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,a.index)+"["+"a".repeat(a[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,a.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let n;for(;(a=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)n=a[2]?a[2].length:0,i=i.slice(0,a.index+n)+"["+"a".repeat(a[0].length-n-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=this.options.hooks?.emStrongMask?.call({lexer:this},i)??i;let r=!1,d="";for(;e;){r||(d=""),r=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},e,s))?(e=e.substring(l.raw.length),s.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let p=s.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):s.push(l);continue}if(l=this.tokenizer.emStrong(e,i,d)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.del(e,i,d)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),s.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),s.push(l);continue}let u=e;if(this.options.extensions?.startInline){let p=1/0,m=e.slice(1),g;this.options.extensions.startInline.forEach(f=>{g=f.call({lexer:this},m),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(u=e.substring(0,p+1))}if(l=this.tokenizer.inlineText(u)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(d=l.raw.slice(-1)),r=!0;let p=s.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):s.push(l);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return s}},Bs=class{options;parser;constructor(t){this.options=t||Ie}space(t){return""}code({text:t,lang:e,escaped:s}){let i=(e||"").match($t.notSpaceStart)?.[0],a=t.replace($t.endingNewline,"")+`
`;return i?'<pre><code class="language-'+zt(i)+'">'+(s?a:zt(a,!0))+`</code></pre>
`:"<pre><code>"+(s?a:zt(a,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,s=t.start,i="";for(let r=0;r<t.items.length;r++){let d=t.items[r];i+=this.listitem(d)}let a=e?"ol":"ul",n=e&&s!==1?' start="'+s+'"':"";return"<"+a+n+`>
`+i+"</"+a+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",s="";for(let a=0;a<t.header.length;a++)s+=this.tablecell(t.header[a]);e+=this.tablerow({text:s});let i="";for(let a=0;a<t.rows.length;a++){let n=t.rows[a];s="";for(let r=0;r<n.length;r++)s+=this.tablecell(n[r]);i+=this.tablerow({text:s})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+i+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),s=t.header?"th":"td";return(t.align?`<${s} align="${t.align}">`:`<${s}>`)+e+`</${s}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${zt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:s}){let i=this.parser.parseInline(s),a=Ga(t);if(a===null)return i;t=a;let n='<a href="'+t+'"';return e&&(n+=' title="'+zt(e)+'"'),n+=">"+i+"</a>",n}image({href:t,title:e,text:s,tokens:i}){i&&(s=this.parser.parseInline(i,this.parser.textRenderer));let a=Ga(t);if(a===null)return zt(s);t=a;let n=`<img src="${t}" alt="${zt(s)}"`;return e&&(n+=` title="${zt(e)}"`),n+=">",n}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:zt(t.text)}},pa=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},Dt=class Ui{options;renderer;textRenderer;constructor(e){this.options=e||Ie,this.options.renderer=this.options.renderer||new Bs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new pa}static parse(e,s){return new Ui(s).parse(e)}static parseInline(e,s){return new Ui(s).parseInline(e)}parse(e){let s="";for(let i=0;i<e.length;i++){let a=e[i];if(this.options.extensions?.renderers?.[a.type]){let r=a,d=this.options.extensions.renderers[r.type].call({parser:this},r);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(r.type)){s+=d||"";continue}}let n=a;switch(n.type){case"space":{s+=this.renderer.space(n);break}case"hr":{s+=this.renderer.hr(n);break}case"heading":{s+=this.renderer.heading(n);break}case"code":{s+=this.renderer.code(n);break}case"table":{s+=this.renderer.table(n);break}case"blockquote":{s+=this.renderer.blockquote(n);break}case"list":{s+=this.renderer.list(n);break}case"checkbox":{s+=this.renderer.checkbox(n);break}case"html":{s+=this.renderer.html(n);break}case"def":{s+=this.renderer.def(n);break}case"paragraph":{s+=this.renderer.paragraph(n);break}case"text":{s+=this.renderer.text(n);break}default:{let r='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return s}parseInline(e,s=this.renderer){let i="";for(let a=0;a<e.length;a++){let n=e[a];if(this.options.extensions?.renderers?.[n.type]){let d=this.options.extensions.renderers[n.type].call({parser:this},n);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(n.type)){i+=d||"";continue}}let r=n;switch(r.type){case"escape":{i+=s.text(r);break}case"html":{i+=s.html(r);break}case"link":{i+=s.link(r);break}case"image":{i+=s.image(r);break}case"checkbox":{i+=s.checkbox(r);break}case"strong":{i+=s.strong(r);break}case"em":{i+=s.em(r);break}case"codespan":{i+=s.codespan(r);break}case"br":{i+=s.br(r);break}case"del":{i+=s.del(r);break}case"text":{i+=s.text(r);break}default:{let d='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return i}},ls=class{options;block;constructor(t){this.options=t||Ie}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Mt.lex:Mt.lexInline}provideParser(){return this.block?Dt.parse:Dt.parseInline}},sl=class{defaults=aa();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Dt;Renderer=Bs;TextRenderer=pa;Lexer=Mt;Tokenizer=Us;Hooks=ls;constructor(...t){this.use(...t)}walkTokens(t,e){let s=[];for(let i of t)switch(s=s.concat(e.call(this,i)),i.type){case"table":{let a=i;for(let n of a.header)s=s.concat(this.walkTokens(n.tokens,e));for(let n of a.rows)for(let r of n)s=s.concat(this.walkTokens(r.tokens,e));break}case"list":{let a=i;s=s.concat(this.walkTokens(a.items,e));break}default:{let a=i;this.defaults.extensions?.childTokens?.[a.type]?this.defaults.extensions.childTokens[a.type].forEach(n=>{let r=a[n].flat(1/0);s=s.concat(this.walkTokens(r,e))}):a.tokens&&(s=s.concat(this.walkTokens(a.tokens,e)))}}return s}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(s=>{let i={...s};if(i.async=this.defaults.async||i.async||!1,s.extensions&&(s.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){let n=e.renderers[a.name];n?e.renderers[a.name]=function(...r){let d=a.renderer.apply(this,r);return d===!1&&(d=n.apply(this,r)),d}:e.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let n=e[a.level];n?n.unshift(a.tokenizer):e[a.level]=[a.tokenizer],a.start&&(a.level==="block"?e.startBlock?e.startBlock.push(a.start):e.startBlock=[a.start]:a.level==="inline"&&(e.startInline?e.startInline.push(a.start):e.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(e.childTokens[a.name]=a.childTokens)}),i.extensions=e),s.renderer){let a=this.defaults.renderer||new Bs(this.defaults);for(let n in s.renderer){if(!(n in a))throw new Error(`renderer '${n}' does not exist`);if(["options","parser"].includes(n))continue;let r=n,d=s.renderer[r],l=a[r];a[r]=(...u)=>{let p=d.apply(a,u);return p===!1&&(p=l.apply(a,u)),p||""}}i.renderer=a}if(s.tokenizer){let a=this.defaults.tokenizer||new Us(this.defaults);for(let n in s.tokenizer){if(!(n in a))throw new Error(`tokenizer '${n}' does not exist`);if(["options","rules","lexer"].includes(n))continue;let r=n,d=s.tokenizer[r],l=a[r];a[r]=(...u)=>{let p=d.apply(a,u);return p===!1&&(p=l.apply(a,u)),p}}i.tokenizer=a}if(s.hooks){let a=this.defaults.hooks||new ls;for(let n in s.hooks){if(!(n in a))throw new Error(`hook '${n}' does not exist`);if(["options","block"].includes(n))continue;let r=n,d=s.hooks[r],l=a[r];ls.passThroughHooks.has(n)?a[r]=u=>{if(this.defaults.async&&ls.passThroughHooksRespectAsync.has(n))return(async()=>{let m=await d.call(a,u);return l.call(a,m)})();let p=d.call(a,u);return l.call(a,p)}:a[r]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await d.apply(a,u);return m===!1&&(m=await l.apply(a,u)),m})();let p=d.apply(a,u);return p===!1&&(p=l.apply(a,u)),p}}i.hooks=a}if(s.walkTokens){let a=this.defaults.walkTokens,n=s.walkTokens;i.walkTokens=function(r){let d=[];return d.push(n.call(this,r)),a&&(d=d.concat(a.call(this,r))),d}}this.defaults={...this.defaults,...i}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Mt.lex(t,e??this.defaults)}parser(t,e){return Dt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,s)=>{let i={...s},a={...this.defaults,...i},n=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return n(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return n(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return n(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(a.hooks&&(a.hooks.options=a,a.hooks.block=t),a.async)return(async()=>{let r=a.hooks?await a.hooks.preprocess(e):e,d=await(a.hooks?await a.hooks.provideLexer():t?Mt.lex:Mt.lexInline)(r,a),l=a.hooks?await a.hooks.processAllTokens(d):d;a.walkTokens&&await Promise.all(this.walkTokens(l,a.walkTokens));let u=await(a.hooks?await a.hooks.provideParser():t?Dt.parse:Dt.parseInline)(l,a);return a.hooks?await a.hooks.postprocess(u):u})().catch(n);try{a.hooks&&(e=a.hooks.preprocess(e));let r=(a.hooks?a.hooks.provideLexer():t?Mt.lex:Mt.lexInline)(e,a);a.hooks&&(r=a.hooks.processAllTokens(r)),a.walkTokens&&this.walkTokens(r,a.walkTokens);let d=(a.hooks?a.hooks.provideParser():t?Dt.parse:Dt.parseInline)(r,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(r){return n(r)}}}onError(t,e){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let i="<p>An error occurred:</p><pre>"+zt(s.message+"",!0)+"</pre>";return e?Promise.resolve(i):i}if(e)return Promise.reject(s);throw s}}},Se=new sl;function H(t,e){return Se.parse(t,e)}H.options=H.setOptions=function(t){return Se.setOptions(t),H.defaults=Se.defaults,Zn(H.defaults),H};H.getDefaults=aa;H.defaults=Ie;H.use=function(...t){return Se.use(...t),H.defaults=Se.defaults,Zn(H.defaults),H};H.walkTokens=function(t,e){return Se.walkTokens(t,e)};H.parseInline=Se.parseInline;H.Parser=Dt;H.parser=Dt.parse;H.Renderer=Bs;H.TextRenderer=pa;H.Lexer=Mt;H.lexer=Mt.lex;H.Tokenizer=Us;H.Hooks=ls;H.parse=H;H.options;H.setOptions;H.use;H.walkTokens;H.parseInline;Dt.parse;Mt.lex;const{entries:hr,setPrototypeOf:Qa,isFrozen:il,getPrototypeOf:al,getOwnPropertyDescriptor:nl}=Object;let{freeze:kt,seal:_t,create:Bi}=Object,{apply:zi,construct:Fi}=typeof Reflect<"u"&&Reflect;kt||(kt=function(e){return e});_t||(_t=function(e){return e});zi||(zi=function(e,s){for(var i=arguments.length,a=new Array(i>2?i-2:0),n=2;n<i;n++)a[n-2]=arguments[n];return e.apply(s,a)});Fi||(Fi=function(e){for(var s=arguments.length,i=new Array(s>1?s-1:0),a=1;a<s;a++)i[a-1]=arguments[a];return new e(...i)});const xs=xt(Array.prototype.forEach),rl=xt(Array.prototype.lastIndexOf),Xa=xt(Array.prototype.pop),es=xt(Array.prototype.push),ol=xt(Array.prototype.splice),Ps=xt(String.prototype.toLowerCase),ri=xt(String.prototype.toString),oi=xt(String.prototype.match),ss=xt(String.prototype.replace),ll=xt(String.prototype.indexOf),cl=xt(String.prototype.trim),Rt=xt(Object.prototype.hasOwnProperty),wt=xt(RegExp.prototype.test),is=dl(TypeError);function xt(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var s=arguments.length,i=new Array(s>1?s-1:0),a=1;a<s;a++)i[a-1]=arguments[a];return zi(t,e,i)}}function dl(t){return function(){for(var e=arguments.length,s=new Array(e),i=0;i<e;i++)s[i]=arguments[i];return Fi(t,s)}}function U(t,e){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ps;Qa&&Qa(t,null);let i=e.length;for(;i--;){let a=e[i];if(typeof a=="string"){const n=s(a);n!==a&&(il(e)||(e[i]=n),a=n)}t[a]=!0}return t}function hl(t){for(let e=0;e<t.length;e++)Rt(t,e)||(t[e]=null);return t}function Ft(t){const e=Bi(null);for(const[s,i]of hr(t))Rt(t,s)&&(Array.isArray(i)?e[s]=hl(i):i&&typeof i=="object"&&i.constructor===Object?e[s]=Ft(i):e[s]=i);return e}function as(t,e){for(;t!==null;){const i=nl(t,e);if(i){if(i.get)return xt(i.get);if(typeof i.value=="function")return xt(i.value)}t=al(t)}function s(){return null}return s}const Za=kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),li=kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ci=kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),pl=kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),di=kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ul=kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),tn=kt(["#text"]),en=kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),hi=kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),sn=kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Cs=kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),gl=_t(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ml=_t(/<%[\w\W]*|[\w\W]*%>/gm),fl=_t(/\$\{[\w\W]*/gm),vl=_t(/^data-[\-\w.\u00B7-\uFFFF]+$/),yl=_t(/^aria-[\-\w]+$/),pr=_t(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),bl=_t(/^(?:\w+script|data):/i),wl=_t(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ur=_t(/^html$/i),$l=_t(/^[a-z][.\w]*(-[.\w]+)+$/i);var an=Object.freeze({__proto__:null,ARIA_ATTR:yl,ATTR_WHITESPACE:wl,CUSTOM_ELEMENT:$l,DATA_ATTR:vl,DOCTYPE_NAME:ur,ERB_EXPR:ml,IS_ALLOWED_URI:pr,IS_SCRIPT_OR_DATA:bl,MUSTACHE_EXPR:gl,TMPLIT_EXPR:fl});const ns={element:1,text:3,progressingInstruction:7,comment:8,document:9},kl=function(){return typeof window>"u"?null:window},xl=function(e,s){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let i=null;const a="data-tt-policy-suffix";s&&s.hasAttribute(a)&&(i=s.getAttribute(a));const n="dompurify"+(i?"#"+i:"");try{return e.createPolicy(n,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+n+" could not be created."),null}},nn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function gr(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:kl();const e=T=>gr(T);if(e.version="3.3.1",e.removed=[],!t||!t.document||t.document.nodeType!==ns.document||!t.Element)return e.isSupported=!1,e;let{document:s}=t;const i=s,a=i.currentScript,{DocumentFragment:n,HTMLTemplateElement:r,Node:d,Element:l,NodeFilter:u,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:m,DOMParser:g,trustedTypes:f}=t,y=l.prototype,S=as(y,"cloneNode"),G=as(y,"remove"),R=as(y,"nextSibling"),O=as(y,"childNodes"),_=as(y,"parentNode");if(typeof r=="function"){const T=s.createElement("template");T.content&&T.content.ownerDocument&&(s=T.content.ownerDocument)}let $,V="";const{implementation:w,createNodeIterator:P,createDocumentFragment:I,getElementsByTagName:x}=s,{importNode:D}=i;let b=nn();e.isSupported=typeof hr=="function"&&typeof _=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:A,ERB_EXPR:E,TMPLIT_EXPR:N,DATA_ATTR:Ot,ARIA_ATTR:me,IS_SCRIPT_OR_DATA:Vs,ATTR_WHITESPACE:Ge,CUSTOM_ELEMENT:Gs}=an;let{IS_ALLOWED_URI:De}=an,tt=null;const Je=U({},[...Za,...li,...ci,...di,...tn]);let it=null;const gs=U({},[...en,...hi,...sn,...Cs]);let J=Object.seal(Bi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),oe=null,At=null;const ft=Object.seal(Bi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Jt=!0,fe=!0,ga=!1,ma=!0,Le=!1,ms=!0,ve=!1,Js=!1,Ys=!1,Ne=!1,fs=!1,vs=!1,fa=!0,va=!1;const xr="user-content-";let Qs=!0,Ye=!1,Oe={},jt=null;const Xs=U({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let ya=null;const ba=U({},["audio","video","img","source","image","track"]);let Zs=null;const wa=U({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ys="http://www.w3.org/1998/Math/MathML",bs="http://www.w3.org/2000/svg",Yt="http://www.w3.org/1999/xhtml";let je=Yt,ti=!1,ei=null;const Cr=U({},[ys,bs,Yt],ri);let ws=U({},["mi","mo","mn","ms","mtext"]),$s=U({},["annotation-xml"]);const Sr=U({},["title","style","font","a","script"]);let Qe=null;const Tr=["application/xhtml+xml","text/html"],Er="text/html";let dt=null,Ue=null;const Ar=s.createElement("form"),$a=function(h){return h instanceof RegExp||h instanceof Function},si=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ue&&Ue===h)){if((!h||typeof h!="object")&&(h={}),h=Ft(h),Qe=Tr.indexOf(h.PARSER_MEDIA_TYPE)===-1?Er:h.PARSER_MEDIA_TYPE,dt=Qe==="application/xhtml+xml"?ri:Ps,tt=Rt(h,"ALLOWED_TAGS")?U({},h.ALLOWED_TAGS,dt):Je,it=Rt(h,"ALLOWED_ATTR")?U({},h.ALLOWED_ATTR,dt):gs,ei=Rt(h,"ALLOWED_NAMESPACES")?U({},h.ALLOWED_NAMESPACES,ri):Cr,Zs=Rt(h,"ADD_URI_SAFE_ATTR")?U(Ft(wa),h.ADD_URI_SAFE_ATTR,dt):wa,ya=Rt(h,"ADD_DATA_URI_TAGS")?U(Ft(ba),h.ADD_DATA_URI_TAGS,dt):ba,jt=Rt(h,"FORBID_CONTENTS")?U({},h.FORBID_CONTENTS,dt):Xs,oe=Rt(h,"FORBID_TAGS")?U({},h.FORBID_TAGS,dt):Ft({}),At=Rt(h,"FORBID_ATTR")?U({},h.FORBID_ATTR,dt):Ft({}),Oe=Rt(h,"USE_PROFILES")?h.USE_PROFILES:!1,Jt=h.ALLOW_ARIA_ATTR!==!1,fe=h.ALLOW_DATA_ATTR!==!1,ga=h.ALLOW_UNKNOWN_PROTOCOLS||!1,ma=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=h.SAFE_FOR_TEMPLATES||!1,ms=h.SAFE_FOR_XML!==!1,ve=h.WHOLE_DOCUMENT||!1,Ne=h.RETURN_DOM||!1,fs=h.RETURN_DOM_FRAGMENT||!1,vs=h.RETURN_TRUSTED_TYPE||!1,Ys=h.FORCE_BODY||!1,fa=h.SANITIZE_DOM!==!1,va=h.SANITIZE_NAMED_PROPS||!1,Qs=h.KEEP_CONTENT!==!1,Ye=h.IN_PLACE||!1,De=h.ALLOWED_URI_REGEXP||pr,je=h.NAMESPACE||Yt,ws=h.MATHML_TEXT_INTEGRATION_POINTS||ws,$s=h.HTML_INTEGRATION_POINTS||$s,J=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&$a(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(J.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&$a(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(J.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(J.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Le&&(fe=!1),fs&&(Ne=!0),Oe&&(tt=U({},tn),it=[],Oe.html===!0&&(U(tt,Za),U(it,en)),Oe.svg===!0&&(U(tt,li),U(it,hi),U(it,Cs)),Oe.svgFilters===!0&&(U(tt,ci),U(it,hi),U(it,Cs)),Oe.mathMl===!0&&(U(tt,di),U(it,sn),U(it,Cs))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?ft.tagCheck=h.ADD_TAGS:(tt===Je&&(tt=Ft(tt)),U(tt,h.ADD_TAGS,dt))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?ft.attributeCheck=h.ADD_ATTR:(it===gs&&(it=Ft(it)),U(it,h.ADD_ATTR,dt))),h.ADD_URI_SAFE_ATTR&&U(Zs,h.ADD_URI_SAFE_ATTR,dt),h.FORBID_CONTENTS&&(jt===Xs&&(jt=Ft(jt)),U(jt,h.FORBID_CONTENTS,dt)),h.ADD_FORBID_CONTENTS&&(jt===Xs&&(jt=Ft(jt)),U(jt,h.ADD_FORBID_CONTENTS,dt)),Qs&&(tt["#text"]=!0),ve&&U(tt,["html","head","body"]),tt.table&&(U(tt,["tbody"]),delete oe.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');$=h.TRUSTED_TYPES_POLICY,V=$.createHTML("")}else $===void 0&&($=xl(f,a)),$!==null&&typeof V=="string"&&(V=$.createHTML(""));kt&&kt(h),Ue=h}},ka=U({},[...li,...ci,...pl]),xa=U({},[...di,...ul]),Ir=function(h){let v=_(h);(!v||!v.tagName)&&(v={namespaceURI:je,tagName:"template"});const k=Ps(h.tagName),X=Ps(v.tagName);return ei[h.namespaceURI]?h.namespaceURI===bs?v.namespaceURI===Yt?k==="svg":v.namespaceURI===ys?k==="svg"&&(X==="annotation-xml"||ws[X]):!!ka[k]:h.namespaceURI===ys?v.namespaceURI===Yt?k==="math":v.namespaceURI===bs?k==="math"&&$s[X]:!!xa[k]:h.namespaceURI===Yt?v.namespaceURI===bs&&!$s[X]||v.namespaceURI===ys&&!ws[X]?!1:!xa[k]&&(Sr[k]||!ka[k]):!!(Qe==="application/xhtml+xml"&&ei[h.namespaceURI]):!1},Ut=function(h){es(e.removed,{element:h});try{_(h).removeChild(h)}catch{G(h)}},ye=function(h,v){try{es(e.removed,{attribute:v.getAttributeNode(h),from:v})}catch{es(e.removed,{attribute:null,from:v})}if(v.removeAttribute(h),h==="is")if(Ne||fs)try{Ut(v)}catch{}else try{v.setAttribute(h,"")}catch{}},Ca=function(h){let v=null,k=null;if(Ys)h="<remove></remove>"+h;else{const nt=oi(h,/^[\r\n\t ]+/);k=nt&&nt[0]}Qe==="application/xhtml+xml"&&je===Yt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");const X=$?$.createHTML(h):h;if(je===Yt)try{v=new g().parseFromString(X,Qe)}catch{}if(!v||!v.documentElement){v=w.createDocument(je,"template",null);try{v.documentElement.innerHTML=ti?V:X}catch{}}const vt=v.body||v.documentElement;return h&&k&&vt.insertBefore(s.createTextNode(k),vt.childNodes[0]||null),je===Yt?x.call(v,ve?"html":"body")[0]:ve?v.documentElement:vt},Sa=function(h){return P.call(h.ownerDocument||h,h,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},ii=function(h){return h instanceof m&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof p)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Ta=function(h){return typeof d=="function"&&h instanceof d};function Qt(T,h,v){xs(T,k=>{k.call(e,h,v,Ue)})}const Ea=function(h){let v=null;if(Qt(b.beforeSanitizeElements,h,null),ii(h))return Ut(h),!0;const k=dt(h.nodeName);if(Qt(b.uponSanitizeElement,h,{tagName:k,allowedTags:tt}),ms&&h.hasChildNodes()&&!Ta(h.firstElementChild)&&wt(/<[/\w!]/g,h.innerHTML)&&wt(/<[/\w!]/g,h.textContent)||h.nodeType===ns.progressingInstruction||ms&&h.nodeType===ns.comment&&wt(/<[/\w]/g,h.data))return Ut(h),!0;if(!(ft.tagCheck instanceof Function&&ft.tagCheck(k))&&(!tt[k]||oe[k])){if(!oe[k]&&Ia(k)&&(J.tagNameCheck instanceof RegExp&&wt(J.tagNameCheck,k)||J.tagNameCheck instanceof Function&&J.tagNameCheck(k)))return!1;if(Qs&&!jt[k]){const X=_(h)||h.parentNode,vt=O(h)||h.childNodes;if(vt&&X){const nt=vt.length;for(let Tt=nt-1;Tt>=0;--Tt){const Xt=S(vt[Tt],!0);Xt.__removalCount=(h.__removalCount||0)+1,X.insertBefore(Xt,R(h))}}}return Ut(h),!0}return h instanceof l&&!Ir(h)||(k==="noscript"||k==="noembed"||k==="noframes")&&wt(/<\/no(script|embed|frames)/i,h.innerHTML)?(Ut(h),!0):(Le&&h.nodeType===ns.text&&(v=h.textContent,xs([A,E,N],X=>{v=ss(v,X," ")}),h.textContent!==v&&(es(e.removed,{element:h.cloneNode()}),h.textContent=v)),Qt(b.afterSanitizeElements,h,null),!1)},Aa=function(h,v,k){if(fa&&(v==="id"||v==="name")&&(k in s||k in Ar))return!1;if(!(fe&&!At[v]&&wt(Ot,v))){if(!(Jt&&wt(me,v))){if(!(ft.attributeCheck instanceof Function&&ft.attributeCheck(v,h))){if(!it[v]||At[v]){if(!(Ia(h)&&(J.tagNameCheck instanceof RegExp&&wt(J.tagNameCheck,h)||J.tagNameCheck instanceof Function&&J.tagNameCheck(h))&&(J.attributeNameCheck instanceof RegExp&&wt(J.attributeNameCheck,v)||J.attributeNameCheck instanceof Function&&J.attributeNameCheck(v,h))||v==="is"&&J.allowCustomizedBuiltInElements&&(J.tagNameCheck instanceof RegExp&&wt(J.tagNameCheck,k)||J.tagNameCheck instanceof Function&&J.tagNameCheck(k))))return!1}else if(!Zs[v]){if(!wt(De,ss(k,Ge,""))){if(!((v==="src"||v==="xlink:href"||v==="href")&&h!=="script"&&ll(k,"data:")===0&&ya[h])){if(!(ga&&!wt(Vs,ss(k,Ge,"")))){if(k)return!1}}}}}}}return!0},Ia=function(h){return h!=="annotation-xml"&&oi(h,Gs)},_a=function(h){Qt(b.beforeSanitizeAttributes,h,null);const{attributes:v}=h;if(!v||ii(h))return;const k={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:it,forceKeepAttr:void 0};let X=v.length;for(;X--;){const vt=v[X],{name:nt,namespaceURI:Tt,value:Xt}=vt,Be=dt(nt),ai=Xt;let gt=nt==="value"?ai:cl(ai);if(k.attrName=Be,k.attrValue=gt,k.keepAttr=!0,k.forceKeepAttr=void 0,Qt(b.uponSanitizeAttribute,h,k),gt=k.attrValue,va&&(Be==="id"||Be==="name")&&(ye(nt,h),gt=xr+gt),ms&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,gt)){ye(nt,h);continue}if(Be==="attributename"&&oi(gt,"href")){ye(nt,h);continue}if(k.forceKeepAttr)continue;if(!k.keepAttr){ye(nt,h);continue}if(!ma&&wt(/\/>/i,gt)){ye(nt,h);continue}Le&&xs([A,E,N],Ra=>{gt=ss(gt,Ra," ")});const Pa=dt(h.nodeName);if(!Aa(Pa,Be,gt)){ye(nt,h);continue}if($&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!Tt)switch(f.getAttributeType(Pa,Be)){case"TrustedHTML":{gt=$.createHTML(gt);break}case"TrustedScriptURL":{gt=$.createScriptURL(gt);break}}if(gt!==ai)try{Tt?h.setAttributeNS(Tt,nt,gt):h.setAttribute(nt,gt),ii(h)?Ut(h):Xa(e.removed)}catch{ye(nt,h)}}Qt(b.afterSanitizeAttributes,h,null)},_r=function T(h){let v=null;const k=Sa(h);for(Qt(b.beforeSanitizeShadowDOM,h,null);v=k.nextNode();)Qt(b.uponSanitizeShadowNode,v,null),Ea(v),_a(v),v.content instanceof n&&T(v.content);Qt(b.afterSanitizeShadowDOM,h,null)};return e.sanitize=function(T){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},v=null,k=null,X=null,vt=null;if(ti=!T,ti&&(T="<!-->"),typeof T!="string"&&!Ta(T))if(typeof T.toString=="function"){if(T=T.toString(),typeof T!="string")throw is("dirty is not a string, aborting")}else throw is("toString is not a function");if(!e.isSupported)return T;if(Js||si(h),e.removed=[],typeof T=="string"&&(Ye=!1),Ye){if(T.nodeName){const Xt=dt(T.nodeName);if(!tt[Xt]||oe[Xt])throw is("root node is forbidden and cannot be sanitized in-place")}}else if(T instanceof d)v=Ca("<!---->"),k=v.ownerDocument.importNode(T,!0),k.nodeType===ns.element&&k.nodeName==="BODY"||k.nodeName==="HTML"?v=k:v.appendChild(k);else{if(!Ne&&!Le&&!ve&&T.indexOf("<")===-1)return $&&vs?$.createHTML(T):T;if(v=Ca(T),!v)return Ne?null:vs?V:""}v&&Ys&&Ut(v.firstChild);const nt=Sa(Ye?T:v);for(;X=nt.nextNode();)Ea(X),_a(X),X.content instanceof n&&_r(X.content);if(Ye)return T;if(Ne){if(fs)for(vt=I.call(v.ownerDocument);v.firstChild;)vt.appendChild(v.firstChild);else vt=v;return(it.shadowroot||it.shadowrootmode)&&(vt=D.call(i,vt,!0)),vt}let Tt=ve?v.outerHTML:v.innerHTML;return ve&&tt["!doctype"]&&v.ownerDocument&&v.ownerDocument.doctype&&v.ownerDocument.doctype.name&&wt(ur,v.ownerDocument.doctype.name)&&(Tt="<!DOCTYPE "+v.ownerDocument.doctype.name+`>
`+Tt),Le&&xs([A,E,N],Xt=>{Tt=ss(Tt,Xt," ")}),$&&vs?$.createHTML(Tt):Tt},e.setConfig=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};si(T),Js=!0},e.clearConfig=function(){Ue=null,Js=!1},e.isValidAttribute=function(T,h,v){Ue||si({});const k=dt(T),X=dt(h);return Aa(k,X,v)},e.addHook=function(T,h){typeof h=="function"&&es(b[T],h)},e.removeHook=function(T,h){if(h!==void 0){const v=rl(b[T],h);return v===-1?void 0:ol(b[T],v,1)[0]}return Xa(b[T])},e.removeHooks=function(T){b[T]=[]},e.removeAllHooks=function(){b=nn()},e}var mr=gr();function fr(t){return o`
    <div class="kanban">
      ${t.statuses.map(e=>{const s=t.tasks.filter(i=>i.status===e);return o`
          <div class="kanban-col" @dragover=${t.onDragOver} @drop=${i=>t.onDrop(i,e)}>
            <div class="kanban-col-header">
              <div class="kanban-col-title">${t.statusLabels[e]}</div>
              <div class="kanban-col-count">${s.length}</div>
            </div>
            <div class="kanban-col-body">
              ${s.map(i=>t.renderCard(i))}
              ${t.renderColumnFooter?t.renderColumnFooter(e):""}
            </div>
          </div>
        `})}
    </div>
  `}var Cl=Object.defineProperty,Sl=Object.getOwnPropertyDescriptor,W=(t,e,s,i)=>{for(var a=i>1?void 0:i?Sl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Cl(e,s,a),a};const rn=["todo","in_progress","in_review","done","blocked"],pi={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"};let q=class extends K{constructor(){super(...arguments),this.tenantId="",this.selectedProjectId="",this.openCreate=!1,this.items=[],this.loading=!0,this.error="",this.showModal=!1,this.editTarget=null,this.form={name:"",description:"",rootWorkingDirectory:""},this.saving=!1,this.panelOpen=!1,this.activeProject=null,this.workspaceLoading=!1,this.workspaceTab="details",this.projectTasks=[],this.projectClaws=[],this.taskForm={title:"",description:"",priority:"medium",status:"todo",assignedClawId:"",dueDate:""},this.taskSaving=!1,this.sourceControlIntegrations=[],this.sourceControlLoading=!1,this.sourceControlSaving=!1,this.integrationSaving=!1,this.sourceControlForm={integrationId:"",repoFullName:"",repoUrl:""},this.integrationForm={provider:"github",name:"",accountIdentifier:"",hostUrl:""},this.prdTitle="Project PRD",this.prdMarkdown="",this.prdUpdatedAt="",this.brainInput="",this.brainSending=!1,this.brainMessages=[],this.brainActions=[],this.dragTaskId=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){if(t.has("openCreate")&&this.openCreate&&this.openCreateProject(),this.items.length>0&&t.has("selectedProjectId")&&this.selectedProjectId){const e=this.items.find(s=>String(s.id)===this.selectedProjectId);e&&this.openWorkspace(e)}if(this.items.length>0&&t.has("items")&&this.selectedProjectId&&!this.panelOpen){const e=this.items.find(s=>String(s.id)===this.selectedProjectId);e&&this.openWorkspace(e)}}async load(){this.loading=!0;try{this.items=await Et.list()}catch(t){this.error=t.message}finally{this.loading=!1}}openCreateProject(){this.editTarget=null,this.form={name:"",description:"",rootWorkingDirectory:""},this.showModal=!0}openEdit(t){this.editTarget=t,this.form={name:t.name,description:t.description??"",rootWorkingDirectory:t.rootWorkingDirectory??""},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await Et.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.activeProject?.id===e.id&&(this.activeProject=e)}else{const e=await Et.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async removeProject(t){if(t?.id&&confirm(`Delete project "${t.name??"this project"}"? This cannot be undone.`))try{await Et.remove(t.id),this.items=this.items.filter(e=>e.id!==t.id),this.activeProject?.id===t.id&&this.closeWorkspace()}catch(e){this.error=e.message}}projectTaskList(){return this.activeProject?this.projectTasks.filter(t=>String(t.projectId??"")===String(this.activeProject?.id)):[]}statusBadge(t){const e={todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red",active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"},s=pi[t]??t.replace("_"," ");return o`<span class="badge ${e[t]??"badge-gray"}">${s}</span>`}clawName(t){return t?this.projectClaws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return o`<span class="badge ${{low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"}[t]}">${t}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}renderMarkdown(t){const e=H.parse(t,{gfm:!0,breaks:!0}),s=typeof e=="string"?e:"",i=mr.sanitize(s);return o`<div class="md-content">${Xn(i)}</div>`}syncSourceControlForm(t){this.sourceControlForm={integrationId:t.sourceControlIntegrationId==null?"":String(t.sourceControlIntegrationId),repoFullName:t.sourceControlRepoFullName??"",repoUrl:t.sourceControlRepoUrl??""}}async openWorkspace(t){this.panelOpen=!0,this.workspaceTab="details",this.activeProject=t,this.syncSourceControlForm(t),this.selectedProjectId=String(t.id),await this.loadWorkspace(),!t.rootWorkingDirectory&&this.brainMessages.length===0&&(this.workspaceTab="brain",this.brainMessages=[{id:crypto.randomUUID(),role:"assistant",text:"To onboard this project, I need the project root path where `.coderClaw` should live. Reply with the path and I will save it to project details."}])}closeWorkspace(){this.panelOpen=!1,this.activeProject=null,this.selectedProjectId="",this.dragTaskId="",this.projectTasks=[],this.projectClaws=[],this.sourceControlIntegrations=[],this.workspaceTab="details"}async loadWorkspace(){if(this.activeProject){this.workspaceLoading=!0;try{const[t,e,s]=await Promise.all([ot.list(),pt.list(),this.tenantId?at.listSourceControlIntegrations(this.tenantId):Promise.resolve([])]);this.projectTasks=t.filter(i=>String(i.projectId??"")===String(this.activeProject?.id)),this.projectClaws=e,this.sourceControlIntegrations=s}catch(t){this.error=t.message}finally{this.workspaceLoading=!1}}}async reassignTask(t,e){try{const s=await ot.update(t.id,{assignedClawId:e||""});this.projectTasks=this.projectTasks.map(i=>i.id===t.id?s:i)}catch(s){this.error=s.message}}async patchTaskStatus(t,e){try{const s=await ot.update(t,{status:e});this.projectTasks=this.projectTasks.map(i=>i.id===t?s:i)}catch(s){this.error=s.message}}dragStart(t){this.dragTaskId=t}dragOver(t){t.preventDefault()}async drop(t,e){if(t.preventDefault(),!this.dragTaskId)return;const s=this.projectTasks.find(a=>a.id===this.dragTaskId),i=this.dragTaskId;this.dragTaskId="",!(!s||s.status===e)&&await this.patchTaskStatus(i,e)}async createTask(){if(!(!this.activeProject||!this.taskForm.title.trim()||this.taskSaving)){this.taskSaving=!0;try{const t=await ot.create({projectId:String(this.activeProject.id),title:this.taskForm.title.trim(),description:this.taskForm.description||void 0,priority:this.taskForm.priority,status:this.taskForm.status,assignedClawId:this.taskForm.assignedClawId||void 0,dueDate:this.taskForm.dueDate||void 0});this.projectTasks=[t,...this.projectTasks],this.taskForm={title:"",description:"",priority:"medium",status:"todo",assignedClawId:"",dueDate:""}}catch(t){this.error=t.message}finally{this.taskSaving=!1}}}async saveSourceControlAssignment(){if(!(!this.activeProject||this.sourceControlSaving)){this.sourceControlSaving=!0;try{const t=this.sourceControlForm.integrationId?Number(this.sourceControlForm.integrationId):null,e=await Et.update(this.activeProject.id,{sourceControlIntegrationId:t,sourceControlRepoFullName:this.sourceControlForm.repoFullName.trim()||null,sourceControlRepoUrl:this.sourceControlForm.repoUrl.trim()||null});this.activeProject=e,this.items=this.items.map(s=>s.id===e.id?e:s),this.syncSourceControlForm(e)}catch(t){this.error=t.message}finally{this.sourceControlSaving=!1}}}async createIntegrationFromProject(){if(!(!this.tenantId||this.integrationSaving)&&!(!this.integrationForm.name.trim()||!this.integrationForm.accountIdentifier.trim())){this.integrationSaving=!0;try{await at.createSourceControlIntegration(this.tenantId,{provider:this.integrationForm.provider,name:this.integrationForm.name.trim(),accountIdentifier:this.integrationForm.accountIdentifier.trim(),hostUrl:this.integrationForm.hostUrl.trim()||null}),this.integrationForm={provider:this.integrationForm.provider,name:"",accountIdentifier:"",hostUrl:""},this.sourceControlLoading=!0,this.sourceControlIntegrations=await at.listSourceControlIntegrations(this.tenantId)}catch(t){this.error=t.message}finally{this.sourceControlLoading=!1,this.integrationSaving=!1}}}async toggleIntegrationActive(t){if(this.tenantId)try{const e=await at.updateSourceControlIntegration(this.tenantId,t.id,{isActive:!t.isActive});this.sourceControlIntegrations=this.sourceControlIntegrations.map(s=>s.id===e.id?e:s)}catch(e){this.error=e.message}}async deleteIntegrationFromProject(t){if(this.tenantId&&confirm(`Delete integration "${t.name}"?`))try{await at.deleteSourceControlIntegration(this.tenantId,t.id),this.sourceControlIntegrations=this.sourceControlIntegrations.filter(e=>e.id!==t.id),String(t.id)===this.sourceControlForm.integrationId&&(this.sourceControlForm={integrationId:"",repoFullName:"",repoUrl:""})}catch(e){this.error=e.message}}projectBrainContext(){return{project:this.activeProject?{id:this.activeProject.id,key:this.activeProject.key,name:this.activeProject.name,status:this.activeProject.status,description:this.activeProject.description??"",rootWorkingDirectory:this.activeProject.rootWorkingDirectory??""}:null,tasks:this.projectTaskList().map(t=>({id:t.id,key:t.key,title:t.title,status:t.status,priority:t.priority,assignedClawId:t.assignedClawId??null})),claws:this.projectClaws.map(t=>({id:t.id,name:t.name,status:t.status}))}}parseBrainActions(t){const e=t.match(/<ccl-actions>([\s\S]*?)<\/ccl-actions>/i);if(!e)return[];try{const s=JSON.parse(e[1]);return Array.isArray(s.actions)?s.actions.filter(i=>i&&typeof i=="object"&&(i.type==="create_task"||i.type==="assign_task"||i.type==="save_prd"||i.type==="set_project_details")):[]}catch{return[]}}stripBrainActions(t){return t.replace(/<ccl-actions>[\s\S]*?<\/ccl-actions>/gi,"").trim()}brainMessagesPayload(){return[{role:"system",content:["You are Brain helping inside a project workspace.","Respond in markdown.",'When useful, include machine-readable actions in <ccl-actions>{"actions":[...]}</ccl-actions>.',"Allowed actions:","- create_task: { type, title, description?, priority?, status?, dueDate?, assignedClawId?, assignedClawName? }","- assign_task: { type, taskId?, taskKey?, taskTitle?, assignedClawId?, assignedClawName? }","- save_prd: { type, title?, content }","- set_project_details: { type, description?, rootWorkingDirectory? }","If rootWorkingDirectory is missing, ask for it and include set_project_details action once user provides it.","Keep output concise and execution oriented."].join(`
`)},{role:"system",content:`Project context JSON:
${JSON.stringify(this.projectBrainContext())}`},...this.brainMessages.slice(-14).map(e=>({role:e.role,content:e.text}))]}quickBrainPrompt(t){if(this.activeProject){if(t==="describe"){this.brainInput=`Summarize project ${this.activeProject.name} and current task health.`;return}if(t==="prd"){this.brainInput=`Draft a complete PRD for ${this.activeProject.name} and include a save_prd action.`;return}this.brainInput=`Create an execution-ready task plan for ${this.activeProject.name} with create_task actions and assignee suggestions.`}}async sendBrain(){const t=this.brainInput.trim();if(!(!t||this.brainSending||!this.activeProject)){this.brainMessages=[...this.brainMessages,{id:crypto.randomUUID(),role:"user",text:t}],this.brainInput="",this.brainSending=!0;try{const s=(await Ws.chat(this.brainMessagesPayload(),{temperature:.25,maxTokens:1800})).choices?.[0]?.message?.content?.trim()??"I could not generate a response.",i=this.parseBrainActions(s);i.length&&(this.brainActions=i.map(n=>({action:n,status:"idle"})));const a=this.stripBrainActions(s)||"Done.";this.brainMessages=[...this.brainMessages,{id:crypto.randomUUID(),role:"assistant",text:a}]}catch(e){const s=e instanceof Error?e.message:String(e);this.brainMessages=[...this.brainMessages,{id:crypto.randomUUID(),role:"assistant",text:`Error: ${s}`}]}finally{this.brainSending=!1}}}resolveClaw(t){if(t.assignedClawId){const e=this.projectClaws.find(s=>s.id===t.assignedClawId);if(e)return e}if(t.assignedClawName){const e=this.projectClaws.find(s=>s.name.toLowerCase()===t.assignedClawName?.toLowerCase());if(e)return e}return null}async applyBrainAction(t){const e=this.brainActions[t];if(!(!e||e.status==="running"||!this.activeProject)){this.brainActions=this.brainActions.map((s,i)=>i===t?{...s,status:"running",result:void 0}:s);try{if(e.action.type==="set_project_details"){const r=await Et.update(this.activeProject.id,{description:e.action.description??this.activeProject.description,rootWorkingDirectory:e.action.rootWorkingDirectory??this.activeProject.rootWorkingDirectory});this.activeProject=r,this.items=this.items.map(d=>d.id===r.id?r:d),this.brainActions=this.brainActions.map((d,l)=>l===t?{...d,status:"done",result:"Updated project details"}:d);return}if(e.action.type==="save_prd"){this.prdTitle=e.action.title?.trim()||"Project PRD",this.prdMarkdown=e.action.content,this.prdUpdatedAt=new Date().toISOString(),this.brainActions=this.brainActions.map((r,d)=>d===t?{...r,status:"done",result:"Saved PRD draft"}:r);return}if(e.action.type==="create_task"){const r=this.resolveClaw(e.action),d=await ot.create({projectId:String(this.activeProject.id),title:e.action.title,description:e.action.description,priority:e.action.priority??"medium",status:e.action.status??"todo",dueDate:e.action.dueDate,assignedClawId:r?.id});this.projectTasks=[d,...this.projectTasks],this.brainActions=this.brainActions.map((l,u)=>u===t?{...l,status:"done",result:`Created task ${d.key}`}:l);return}const s=e.action,i=this.projectTaskList().find(r=>s.taskId&&r.id===s.taskId||s.taskKey&&r.key.toLowerCase()===s.taskKey.toLowerCase()||s.taskTitle&&r.title.toLowerCase()===s.taskTitle.toLowerCase());if(!i)throw new Error("Task not found in this project for assignment");const a=this.resolveClaw(s);if(!a)throw new Error("Target claw not found for assignment");const n=await ot.update(i.id,{assignedClawId:a.id});this.projectTasks=this.projectTasks.map(r=>r.id===n.id?n:r),this.brainActions=this.brainActions.map((r,d)=>d===t?{...r,status:"done",result:`Assigned ${n.key} → ${a.name}`}:r)}catch(s){const i=s instanceof Error?s.message:String(s);this.brainActions=this.brainActions.map((a,n)=>n===t?{...a,status:"error",result:i}:a)}}}async applyAllBrainActions(){for(let t=0;t<this.brainActions.length;t++)(this.brainActions[t]?.status==="idle"||this.brainActions[t]?.status==="error")&&await this.applyBrainAction(t)}clearBrain(){this.brainInput="",this.brainMessages=[],this.brainActions=[]}render(){return o`
      <div class="page-header">
        <div>
          <div class="page-title">Projects</div>
          <div class="page-sub">Organize work into projects</div>
        </div>
        <button class="btn btn-primary" @click=${this.openCreateProject}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New project
        </button>
      </div>

      ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

      ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.items.length===0?o`
            <div class="empty-state">
              <div class="empty-state-icon">📁</div>
              <div class="empty-state-title">No projects yet</div>
              <div class="empty-state-sub">Create a project to start organizing tasks</div>
              <button class="btn btn-primary" style="margin-top:16px" @click=${this.openCreateProject}>Create project</button>
            </div>`:o`
            <div class="grid grid-3">
              ${this.items.map(t=>o`
                <div class="card" style="cursor:pointer;transition:border-color .15s"
                  @click=${()=>{this.openWorkspace(t)}}
                  @mouseenter=${e=>{e.currentTarget.style.borderColor="var(--accent)"}}
                  @mouseleave=${e=>{e.currentTarget.style.borderColor=""}}>
                  <div class="card-header">
                    <div>
                      <div class="card-title">${t.name}</div>
                      <div style="font-size:11px;font-family:var(--mono);color:var(--muted);margin-top:2px">${t.key}</div>
                    </div>
                    ${this.statusBadge(t.status)}
                  </div>
                  ${t.description?o`<div
                        title=${t.description}
                        style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;"
                      >${t.description}</div>`:""}
                  <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
                    ${t.taskCount!=null?o`<span style="font-size:12px;color:var(--muted)">${t.taskCount} task${t.taskCount!==1?"s":""}</span>`:""}
                    <div style="flex:1"></div>
                    <button class="btn btn-ghost btn-sm" @click=${e=>{e.stopPropagation(),this.openEdit(t)}}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${e=>{e.stopPropagation(),this.removeProject(t)}}>Delete</button>
                  </div>
                </div>
              `)}
            </div>`}

      ${this.showModal?this.renderModal():""}
      ${this.panelOpen&&this.activeProject?this.renderWorkspacePanel():""}
    `}renderWorkspacePanel(){const t=this.activeProject,e=this.projectTaskList();return o`
      <div class="panel-overlay" @click=${()=>this.closeWorkspace()}></div>
      <div class="panel-drawer" style="--panel-width:min(1100px,96vw)">
        <div class="panel-header">
          <div>
            <div class="panel-title">${t.name}</div>
            <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${t.key}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            ${this.statusBadge(t.status)}
            <button class="panel-close" @click=${()=>this.closeWorkspace()}>
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div class="panel-tabs">
          ${[["details","Project details"],["board","Task board"],["tasks","Tasks"],["prds","PRDs"],["brain","Brain"]].map(([s,i])=>o`
            <button class="panel-tab ${this.workspaceTab===s?"active":""}" @click=${()=>{this.workspaceTab=s}}>${i}</button>
          `)}
        </div>

        <div class="panel-body" style="padding:18px">
          ${this.workspaceLoading?o`<div style="color:var(--muted);font-size:13px">Loading workspace…</div>`:this.workspaceTab==="details"?this.renderProjectDetails(t,e):this.workspaceTab==="board"?this.renderTaskBoard(e):this.workspaceTab==="tasks"?this.renderTasksTab(e):this.workspaceTab==="prds"?this.renderPrdsTab():this.renderBrainTab()}
        </div>
      </div>
    `}renderProjectDetails(t,e){const s=e.filter(a=>a.status!=="done").length,i=this.sourceControlIntegrations.find(a=>String(a.id)===this.sourceControlForm.integrationId);return o`
      <div class="grid grid-2">
        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Overview</div>
          <div style="font-size:13px;line-height:1.6;color:var(--text);max-height:260px;overflow:auto;padding-right:4px">
            ${t.description||"No project description yet."}
          </div>
          <div style="display:grid;gap:8px;margin-top:14px">
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Project key</span><span>${t.key}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Status</span><span>${t.status.replace("_"," ")}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;gap:12px"><span style="color:var(--muted)">Root path</span><span class="truncate" title=${t.rootWorkingDirectory??""}>${t.rootWorkingDirectory??"Not set"}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Tasks</span><span>${e.length}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Open tasks</span><span>${s}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;gap:12px"><span style="color:var(--muted)">Repo</span><span class="truncate" title=${t.sourceControlRepoFullName??""}>${t.sourceControlRepoFullName??"Not assigned"}</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Workspace actions</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" @click=${()=>{this.workspaceTab="tasks"}}>Create task</button>
            <button class="btn btn-secondary btn-sm" @click=${()=>{this.workspaceTab="brain",this.quickBrainPrompt("tasks")}}>Plan with Brain</button>
            <button class="btn btn-secondary btn-sm" @click=${()=>{this.workspaceTab="brain",this.quickBrainPrompt("prd")}}>Draft PRD</button>
            <button class="btn btn-ghost btn-sm" @click=${()=>this.openEdit(t)}>Edit project</button>
          </div>
          <div style="margin-top:12px;font-size:12px;color:var(--muted)">Use Brain to generate PRDs and executable task actions for this project.</div>
        </div>

        <div class="card" style="grid-column:1 / -1">
          <div class="card-title" style="margin-bottom:10px">Source control</div>

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px;align-items:end">
            <div class="field" style="margin:0">
              <label class="label">Integration</label>
              <select class="select" .value=${this.sourceControlForm.integrationId} @change=${a=>{this.sourceControlForm={...this.sourceControlForm,integrationId:a.target.value}}}>
                <option value="">No integration (clear assignment)</option>
                ${this.sourceControlIntegrations.filter(a=>a.isActive||String(a.id)===this.sourceControlForm.integrationId).map(a=>o`<option value=${a.id}>${a.name} · ${a.provider} · ${a.accountIdentifier}</option>`)}
              </select>
            </div>

            <div class="field" style="margin:0">
              <label class="label">Repository</label>
              <input class="input" placeholder="owner/repo" .value=${this.sourceControlForm.repoFullName}
                @input=${a=>{this.sourceControlForm={...this.sourceControlForm,repoFullName:a.target.value}}}>
            </div>

            <div class="field" style="margin:0">
              <label class="label">Repo URL <span class="label-hint">(optional)</span></label>
              <input class="input" placeholder=${i?.provider==="bitbucket"?"https://bitbucket.org/owner/repo":"https://github.com/owner/repo"}
                .value=${this.sourceControlForm.repoUrl}
                @input=${a=>{this.sourceControlForm={...this.sourceControlForm,repoUrl:a.target.value}}}>
            </div>

            <button class="btn btn-primary btn-sm" @click=${()=>{this.saveSourceControlAssignment()}} ?disabled=${this.sourceControlSaving||!!this.sourceControlForm.integrationId&&!this.sourceControlForm.repoFullName.trim()}>
              ${this.sourceControlSaving?"Saving…":"Save assignment"}
            </button>
          </div>

          <div style="margin-top:12px;border-top:1px solid var(--border);padding-top:12px;display:grid;gap:10px">
            <div style="font-size:12px;color:var(--muted)">Manage workspace integrations from this panel.</div>

            ${this.sourceControlLoading?o`<div style="font-size:12px;color:var(--muted)">Loading integrations…</div>`:this.sourceControlIntegrations.length===0?o`<div style="font-size:12px;color:var(--muted)">No integrations configured yet.</div>`:o`
                    <div style="display:grid;gap:8px">
                      ${this.sourceControlIntegrations.map(a=>o`
                        <div style="border:1px solid var(--border);border-radius:8px;padding:8px 10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                          <div style="font-size:12px;color:var(--text-strong);font-weight:600">${a.name}</div>
                          <span class="badge ${a.provider==="github"?"badge-blue":"badge-yellow"}">${a.provider}</span>
                          <span class="badge ${a.isActive?"badge-green":"badge-gray"}">${a.isActive?"active":"inactive"}</span>
                          <span style="font-size:11px;color:var(--muted)">${a.accountIdentifier}</span>
                          <div style="flex:1"></div>
                          <button class="btn btn-ghost btn-sm" @click=${()=>{this.toggleIntegrationActive(a)}}>${a.isActive?"Deactivate":"Activate"}</button>
                          <button class="btn btn-danger btn-sm" @click=${()=>{this.deleteIntegrationFromProject(a)}}>Delete</button>
                        </div>
                      `)}
                    </div>
                  `}

            <div style="display:grid;grid-template-columns:140px 1fr 1fr 1fr auto;gap:8px;align-items:end">
              <div class="field" style="margin:0">
                <label class="label">Provider</label>
                <select class="select" .value=${this.integrationForm.provider} @change=${a=>{this.integrationForm={...this.integrationForm,provider:a.target.value}}}>
                  <option value="github">GitHub</option>
                  <option value="bitbucket">Bitbucket</option>
                </select>
              </div>
              <div class="field" style="margin:0">
                <label class="label">Name</label>
                <input class="input" placeholder="Primary GitHub" .value=${this.integrationForm.name}
                  @input=${a=>{this.integrationForm={...this.integrationForm,name:a.target.value}}}>
              </div>
              <div class="field" style="margin:0">
                <label class="label">Account / Workspace</label>
                <input class="input" placeholder="acme-org" .value=${this.integrationForm.accountIdentifier}
                  @input=${a=>{this.integrationForm={...this.integrationForm,accountIdentifier:a.target.value}}}>
              </div>
              <div class="field" style="margin:0">
                <label class="label">Host URL <span class="label-hint">(optional)</span></label>
                <input class="input" placeholder="https://bitbucket.org" .value=${this.integrationForm.hostUrl}
                  @input=${a=>{this.integrationForm={...this.integrationForm,hostUrl:a.target.value}}}>
              </div>
              <button class="btn btn-secondary btn-sm" @click=${()=>{this.createIntegrationFromProject()}} ?disabled=${this.integrationSaving||!this.integrationForm.name.trim()||!this.integrationForm.accountIdentifier.trim()}>
                ${this.integrationSaving?"Adding…":"Add integration"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `}renderTaskBoard(t){return fr({tasks:t,statuses:rn,statusLabels:pi,onDragOver:this.dragOver,onDrop:(e,s)=>this.drop(e,s),renderCard:e=>o`
        <div class="task-card" draggable="true" @dragstart=${()=>this.dragStart(e.id)}>
          <div class="task-card-title">${e.title}</div>
          <div class="task-card-meta">
            <span class="task-key">${e.key}</span>
            ${this.priorityBadge(e.priority)}
            <span style="font-size:11px;color:var(--muted)">${this.clawName(e.assignedClawId)}</span>
          </div>
        </div>
      `})}renderTasksTab(t){return o`
      <div class="card" style="margin-bottom:14px">
        <div class="card-title" style="margin-bottom:10px">Create task</div>
        <div class="grid grid-2">
          <div class="field">
            <label class="label">Title</label>
            <input class="input" .value=${this.taskForm.title} @input=${e=>{this.taskForm={...this.taskForm,title:e.target.value}}}>
          </div>
          <div class="field">
            <label class="label">Assign claw</label>
            <select class="select" .value=${this.taskForm.assignedClawId} @change=${e=>{this.taskForm={...this.taskForm,assignedClawId:e.target.value}}}>
              <option value="">Unassigned</option>
              ${this.projectClaws.map(e=>o`<option value=${e.id}>${e.name}</option>`)}
            </select>
          </div>
        </div>

        <div class="field" style="margin-top:10px">
          <label class="label">Description</label>
          <textarea class="textarea" .value=${this.taskForm.description} @input=${e=>{this.taskForm={...this.taskForm,description:e.target.value}}}></textarea>
        </div>

        <div class="grid grid-3" style="margin-top:10px">
          <div class="field">
            <label class="label">Priority</label>
            <select class="select" .value=${this.taskForm.priority} @change=${e=>{this.taskForm={...this.taskForm,priority:e.target.value}}}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="critical">critical</option>
            </select>
          </div>
          <div class="field">
            <label class="label">Status</label>
            <select class="select" .value=${this.taskForm.status} @change=${e=>{this.taskForm={...this.taskForm,status:e.target.value}}}>
              ${rn.map(e=>o`<option value=${e}>${pi[e]}</option>`)}
            </select>
          </div>
          <div class="field">
            <label class="label">Due date</label>
            <input class="input" type="date" .value=${this.taskForm.dueDate} @change=${e=>{this.taskForm={...this.taskForm,dueDate:e.target.value}}}>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;margin-top:10px">
          <button class="btn btn-primary" ?disabled=${this.taskSaving||!this.taskForm.title.trim()} @click=${()=>{this.createTask()}}>
            ${this.taskSaving?"Creating…":"Create task"}
          </button>
        </div>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(e=>o`
              <tr>
                <td>
                  <div style="font-weight:500;color:var(--text-strong)">${e.title}</div>
                  <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${e.key}</div>
                </td>
                <td>${this.statusBadge(e.status)}</td>
                <td>${this.priorityBadge(e.priority)}</td>
                <td>
                  <select class="select" style="min-width:150px" .value=${e.assignedClawId??""} @change=${s=>{this.reassignTask(e,s.target.value)}}>
                    <option value="">Unassigned</option>
                    ${this.projectClaws.map(s=>o`<option value=${s.id}>${s.name}</option>`)}
                  </select>
                </td>
                <td style="font-size:12px;color:var(--muted)">${this.formatDate(e.dueDate)}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}renderPrdsTab(){return o`
      <div class="card" style="margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:8px">
          <div class="card-title" style="margin:0">${this.prdTitle}</div>
          <div style="flex:1"></div>
          <button class="btn btn-secondary btn-sm" @click=${()=>{this.workspaceTab="brain",this.quickBrainPrompt("prd")}}>Generate with Brain</button>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:6px">
          ${this.prdUpdatedAt?`Updated ${new Date(this.prdUpdatedAt).toLocaleString()}`:"No PRD saved yet. Use Brain to draft one."}
        </div>
      </div>

      ${this.prdMarkdown?this.renderMarkdown(this.prdMarkdown):o`<div class="empty-state"><div class="empty-state-title">No PRD yet</div><div class="empty-state-sub">Ask Brain to draft and save a PRD for this project.</div></div>`}
    `}renderBrainTab(){return o`
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
        <button class="btn btn-ghost btn-sm" @click=${()=>this.quickBrainPrompt("describe")}>Describe project</button>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.quickBrainPrompt("prd")}>Draft PRD</button>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.quickBrainPrompt("tasks")}>Generate tasks</button>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.clearBrain()}>New chat</button>
      </div>

      <div class="chat-messages" style="padding:12px 0;max-height:380px;overflow:auto">
        ${this.brainMessages.length===0?o`<div class="empty-state" style="padding:30px 12px"><div class="empty-state-title">Project Brain ready</div><div class="empty-state-sub">Generate PRDs, tasks, and assignments for this project.</div></div>`:this.brainMessages.map(t=>o`
            <div class="msg ${t.role==="user"?"msg-user":""}">
              <div class="msg-bubble ${t.role==="user"?"msg-bubble-user":"msg-bubble-assistant"}">
                ${this.renderMarkdown(t.text)}
              </div>
              <div class="msg-meta">${t.role}</div>
            </div>
          `)}
      </div>

      ${this.brainActions.length>0?o`
        <div class="card" style="margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <div class="card-title" style="margin:0">Proposed actions</div>
            <div style="flex:1"></div>
            <button class="btn btn-secondary btn-sm" @click=${()=>{this.applyAllBrainActions()}}>Apply all</button>
          </div>
          <div style="display:grid;gap:8px">
            ${this.brainActions.map((t,e)=>o`
              <div style="border:1px solid var(--border);border-radius:var(--radius-md);padding:10px;display:grid;gap:8px">
                <div style="font-size:12px;color:var(--text)">
                  ${t.action.type==="create_task"?`Create task: ${t.action.title}`:t.action.type==="assign_task"?`Assign task: ${t.action.taskKey??t.action.taskTitle??t.action.taskId??"task"}`:t.action.type==="save_prd"?`Save PRD: ${t.action.title??"Project PRD"}`:`Update project details${t.action.rootWorkingDirectory?` (${t.action.rootWorkingDirectory})`:""}`}
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <button class="btn btn-ghost btn-sm" ?disabled=${t.status==="running"||t.status==="done"} @click=${()=>{this.applyBrainAction(e)}}>
                    ${t.status==="running"?"Applying…":t.status==="done"?"Applied":"Apply"}
                  </button>
                  <span class="badge ${t.status==="done"?"badge-green":t.status==="error"?"badge-red":t.status==="running"?"badge-yellow":"badge-gray"}">${t.status}</span>
                  ${t.result?o`<span style="font-size:11px;color:var(--muted)">${t.result}</span>`:""}
                </div>
              </div>
            `)}
          </div>
        </div>
      `:""}

      <div class="chat-input-row" style="padding:0;border-top:none">
        <textarea class="chat-textarea" rows="3" placeholder="Ask Brain for project help…" .value=${this.brainInput}
          @input=${t=>{this.brainInput=t.target.value}}
          @keydown=${t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.sendBrain())}}></textarea>
        <button class="btn btn-primary" ?disabled=${this.brainSending||!this.brainInput.trim()} @click=${()=>{this.sendBrain()}}>
          ${this.brainSending?"Thinking…":"Send"}
        </button>
      </div>
    `}renderModal(){return o`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
        <div class="modal">
          <div class="modal-title">${this.editTarget?"Edit project":"New project"}</div>
          <div class="modal-sub">Projects group related tasks together</div>
          ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
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
            <div class="field">
              <label class="label">Root working directory <span class="label-hint">(optional)</span></label>
              <input class="input" placeholder="/Users/you/dev/my-repo"
                .value=${this.form.rootWorkingDirectory}
                @input=${t=>{this.form={...this.form,rootWorkingDirectory:t.target.value}}}>
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
    `}};W([j()],q.prototype,"tenantId",2);W([j()],q.prototype,"selectedProjectId",2);W([j({type:Boolean})],q.prototype,"openCreate",2);W([c()],q.prototype,"items",2);W([c()],q.prototype,"loading",2);W([c()],q.prototype,"error",2);W([c()],q.prototype,"showModal",2);W([c()],q.prototype,"editTarget",2);W([c()],q.prototype,"form",2);W([c()],q.prototype,"saving",2);W([c()],q.prototype,"panelOpen",2);W([c()],q.prototype,"activeProject",2);W([c()],q.prototype,"workspaceLoading",2);W([c()],q.prototype,"workspaceTab",2);W([c()],q.prototype,"projectTasks",2);W([c()],q.prototype,"projectClaws",2);W([c()],q.prototype,"taskForm",2);W([c()],q.prototype,"taskSaving",2);W([c()],q.prototype,"sourceControlIntegrations",2);W([c()],q.prototype,"sourceControlLoading",2);W([c()],q.prototype,"sourceControlSaving",2);W([c()],q.prototype,"integrationSaving",2);W([c()],q.prototype,"sourceControlForm",2);W([c()],q.prototype,"integrationForm",2);W([c()],q.prototype,"prdTitle",2);W([c()],q.prototype,"prdMarkdown",2);W([c()],q.prototype,"prdUpdatedAt",2);W([c()],q.prototype,"brainInput",2);W([c()],q.prototype,"brainSending",2);W([c()],q.prototype,"brainMessages",2);W([c()],q.prototype,"brainActions",2);W([c()],q.prototype,"dragTaskId",2);q=W([Q("ccl-projects")],q);var Tl=Object.defineProperty,El=Object.getOwnPropertyDescriptor,Z=(t,e,s,i)=>{for(var a=i>1?void 0:i?El(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Tl(e,s,a),a};const Ss=["todo","in_progress","in_review","done","blocked"],rs={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"},on=["low","medium","high","critical"],Al={low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"};let Y=class extends K{constructor(){super(...arguments),this.tenantId="",this.projectId="",this.openTaskPrompt="",this.items=[],this.projects=[],this.claws=[],this.loading=!0,this.error="",this.view="kanban",this.filterStatus="",this.filterProject="",this.filterPriority="",this.search="",this.showArchived=!1,this.showModal=!1,this.editTarget=null,this.form={},this.saving=!1,this.drawerTask=null,this.drawerExecutions=[],this.drawerTab="detail",this.running=!1,this.dragTaskId=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.projectId&&(this.filterProject=this.projectId),this.load()}updated(t){t.has("projectId")&&this.projectId&&(this.filterProject=this.projectId),t.has("openTaskPrompt")&&this.openTaskPrompt&&(this.editTarget=null,this.form={status:"todo",priority:"medium",title:this.openTaskPrompt,...this.projectId?{projectId:this.projectId}:{}},this.showModal=!0)}async load(){this.loading=!0;try{[this.items,this.projects,this.claws]=await Promise.all([ot.list({archived:this.showArchived}),Et.list(),pt.list()])}catch(t){this.error=t.message}finally{this.loading=!1}}get filtered(){return this.items.filter(t=>!(this.filterStatus&&t.status!==this.filterStatus||this.filterProject&&t.projectId!==this.filterProject||this.filterPriority&&t.priority!==this.filterPriority||this.search&&!t.title.toLowerCase().includes(this.search.toLowerCase())))}tasksForStatus(t){return this.filtered.filter(e=>e.status===t)}openCreate(){this.editTarget=null,this.form={status:"todo",priority:"medium"},this.showModal=!0}openEdit(t,e){e?.stopPropagation(),this.editTarget=t,this.form={...t},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await ot.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.drawerTask?.id===e.id&&(this.drawerTask=e)}else{const e=await ot.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async removeTask(t,e){e?.stopPropagation(),t?.id&&confirm(`Delete "${t.title??"this task"}"?`)&&(await ot.remove(t.id),this.items=this.items.filter(s=>s.id!==t.id),this.drawerTask?.id===t.id&&(this.drawerTask=null))}async patchStatus(t,e){const s=await ot.update(t,{status:e});this.items=this.items.map(i=>i.id===t?s:i),this.drawerTask?.id===t&&(this.drawerTask=s)}async runTask(t,e){e.stopPropagation(),this.running=!0;try{const s=await ot.run(t.id),i=await ot.update(t.id,{status:"in_progress"});this.items=this.items.map(a=>a.id===i.id?i:a),this.drawerTask?.id===t.id&&(this.drawerTask=i,this.drawerExecutions=[s,...this.drawerExecutions])}catch(s){this.error=s.message}finally{this.running=!1}}async openDrawer(t){this.drawerTask=t,this.drawerTab="detail";try{this.drawerExecutions=await ot.executions(t.id)}catch{this.drawerExecutions=[]}}closeDrawer(){this.drawerTask=null}dragStart(t){this.dragTaskId=t}dragOver(t){t.preventDefault()}async drop(t,e){t.preventDefault(),this.dragTaskId&&(await this.patchStatus(this.dragTaskId,e),this.dragTaskId="")}projectName(t){return t?this.projects.find(e=>e.id===t)?.name??t:"—"}clawName(t){return t?this.claws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return o`<span class="badge ${Al[t]}">${t}</span>`}statusBadge(t){return o`<span class="badge ${{todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red"}[t]}">${rs[t]}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}render(){return o`
      <!-- Header -->
      <div class="page-header">
        <div>
          <div class="page-title">Tasks</div>
          <div class="page-sub">${this.filtered.length} task${this.filtered.length!==1?"s":""}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <!-- View toggle -->
          <div style="display:flex;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden">
            ${["kanban","list","gantt"].map(t=>o`
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

      ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

      <!-- Filters -->
      <div class="filters" style="margin-bottom:16px">
        <input class="input" style="max-width:200px;height:32px;padding:4px 10px"
          placeholder="Search…" .value=${this.search}
          @input=${t=>{this.search=t.target.value}}>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterStatus=t.target.value}}>
          <option value="">All statuses</option>
          ${Ss.map(t=>o`<option value=${t}>${rs[t]}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterProject=t.target.value}}>
          <option value="">All projects</option>
          ${this.projects.map(t=>o`<option value=${t.id}>${t.name}</option>`)}
        </select>
        <select class="select" style="max-width:140px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterPriority=t.target.value}}>
          <option value="">All priorities</option>
          ${on.map(t=>o`<option value=${t}>${t}</option>`)}
        </select>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted);cursor:pointer">
          <input type="checkbox" .checked=${this.showArchived}
            @change=${async t=>{this.showArchived=t.target.checked,await this.load()}}>
          Archived
        </label>
      </div>

      ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.view==="kanban"?this.renderKanban():this.view==="list"?this.renderList():this.renderGantt()}

      ${this.showModal?this.renderModal():""}
      ${this.drawerTask?this.renderDrawer():""}
    `}renderKanban(){return fr({tasks:this.filtered,statuses:Ss,statusLabels:rs,onDragOver:this.dragOver,onDrop:(t,e)=>this.drop(t,e),renderCard:t=>o`
        <div class="task-card"
          draggable="true"
          @dragstart=${()=>this.dragStart(t.id)}
          @click=${()=>this.openDrawer(t)}>
          <div class="task-card-title">${t.title}</div>
          <div class="task-card-meta">
            <span class="task-key">${t.key}</span>
            ${this.priorityBadge(t.priority)}
            ${t.assignedClawId?o`<span style="font-size:11px;color:var(--muted)">${this.clawName(t.assignedClawId)}</span>`:""}
            ${t.dueDate?o`<span style="font-size:11px;color:var(--muted);margin-left:auto">${this.formatDate(t.dueDate)}</span>`:""}
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:8px;padding-top:6px;border-top:1px solid var(--border)"
            @click=${e=>e.stopPropagation()}>
            <button class="btn btn-ghost btn-sm" style="font-size:11px;gap:4px"
              @click=${()=>this.openDrawer(t)}>
              View
              <svg viewBox="0 0 24 24" style="width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      `,renderColumnFooter:t=>o`
        <button
          class="btn btn-ghost btn-sm"
          style="border-style:dashed;width:100%;margin-top:4px"
          @click=${()=>{this.form={status:t,priority:"medium"},this.editTarget=null,this.showModal=!0}}>
          + Add task
        </button>
      `})}renderList(){const t=this.filtered;return t.length===0?o`<div class="empty-state"><div class="empty-state-title">No tasks found</div></div>`:o`
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
            ${t.map(e=>o`
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
                    <button class="btn btn-ghost btn-sm" @click=${()=>this.openDrawer(e)}>View</button>
                    <button class="btn btn-ghost btn-sm" @click=${s=>this.openEdit(e,s)}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${s=>this.removeTask(e,s)}>Delete</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}renderGantt(){const t=this.filtered.filter(m=>m.dueDate||m.createdAt);if(t.length===0)return o`<div class="empty-state"><div class="empty-state-title">No tasks with dates</div><div class="empty-state-sub">Set due dates on tasks to see the timeline</div></div>`;const e=t.map(m=>new Date(m.dueDate??m.createdAt)),s=new Date(Math.min(...e.map(m=>m.getTime()))),i=new Date(Math.max(...e.map(m=>m.getTime())));s.setDate(1),i.setMonth(i.getMonth()+1),i.setDate(0);const a=Math.ceil((i.getTime()-s.getTime())/864e5)+1,n=24,r=a*n,d=[],l=new Date(s);for(;l<=i;){const m=Math.floor((l.getTime()-s.getTime())/864e5),g=new Date(l.getFullYear(),l.getMonth()+1,0).getDate();d.push({label:l.toLocaleDateString(void 0,{month:"short",year:"2-digit"}),left:m*n,width:g*n}),l.setMonth(l.getMonth()+1),l.setDate(1)}const p=Math.floor((new Date().getTime()-s.getTime())/864e5)*n;return o`
      <div style="overflow-x:auto">
        <div style="min-width:${r+200}px">
          <!-- Month headers -->
          <div style="display:flex;margin-left:200px;border-bottom:1px solid var(--border)">
            ${d.map(m=>o`
              <div style="min-width:${m.width}px;padding:4px 8px;font-size:11px;color:var(--muted);border-right:1px solid var(--border)">${m.label}</div>
            `)}
          </div>
          <!-- Tasks -->
          <div style="position:relative">
            <!-- Today line -->
            ${p>=0&&p<=r?o`
              <div style="position:absolute;left:${200+p}px;top:0;bottom:0;width:2px;background:var(--accent);opacity:0.6;z-index:1"></div>
            `:""}

            ${t.map(m=>{const g=new Date(m.createdAt),f=new Date(m.dueDate??m.createdAt),y=Math.floor((g.getTime()-s.getTime())/864e5),S=Math.max(1,Math.ceil((f.getTime()-g.getTime())/864e5)),G={done:"var(--ok)",in_progress:"var(--accent)",blocked:"var(--danger)",in_review:"var(--warn)",todo:"var(--muted)"};return o`
                <div style="display:flex;align-items:center;border-bottom:1px solid var(--border);height:40px">
                  <div style="width:200px;flex-shrink:0;padding:0 12px;font-size:12px;font-weight:500;color:var(--text);truncate">
                    ${m.title}
                  </div>
                  <div style="flex:1;position:relative;height:100%">
                    <div
                      style="position:absolute;top:8px;height:24px;
                        left:${y*n}px;
                        width:${S*n}px;
                        background:${G[m.status]??"var(--muted)"};
                        opacity:0.8;border-radius:4px;cursor:pointer;
                        display:flex;align-items:center;padding:0 8px;
                        font-size:10px;font-weight:600;color:#fff;
                        white-space:nowrap;overflow:hidden"
                      @click=${()=>this.openDrawer(m)}
                      title="${m.title}"
                    >
                      ${m.key}
                    </div>
                  </div>
                </div>
              `})}
          </div>
        </div>
      </div>
    `}renderModal(){return o`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
        <div class="modal" style="max-width:540px">
          <div class="modal-title">${this.editTarget?"Edit task":"New task"}</div>
          ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
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
                  ${Ss.map(t=>o`<option value=${t}>${rs[t]}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Priority</label>
                <select class="select" .value=${this.form.priority??"medium"}
                  @change=${t=>{this.form={...this.form,priority:t.target.value}}}>
                  ${on.map(t=>o`<option value=${t}>${t}</option>`)}
                </select>
              </div>
            </div>
            <div class="form-row form-row-2">
              <div class="field">
                <label class="label">Project</label>
                <select class="select" .value=${this.form.projectId??""}
                  @change=${t=>{this.form={...this.form,projectId:t.target.value||void 0}}}>
                  <option value="">No project</option>
                  ${this.projects.map(t=>o`<option value=${t.id}>${t.name}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Assign to Claw</label>
                <select class="select" .value=${this.form.assignedClawId??""}
                  @change=${t=>{this.form={...this.form,assignedClawId:t.target.value||void 0}}}>
                  <option value="">Unassigned</option>
                  ${this.claws.map(t=>o`<option value=${t.id}>${t.name}</option>`)}
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
    `}renderDrawer(){const t=this.drawerTask;return o`
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
          ${["detail","executions"].map(e=>o`
            <button class="panel-tab ${this.drawerTab===e?"active":""}"
              @click=${()=>{this.drawerTab=e}}>${e}</button>
          `)}
        </div>
        <div class="panel-body" style="padding:20px">
          ${this.drawerTab==="detail"?this.renderDrawerDetail(t):this.renderDrawerExecutions(t)}
        </div>
      </div>
    `}renderDrawerDetail(t){return o`
      <div style="display:grid;gap:16px">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${this.statusBadge(t.status)}
          ${this.priorityBadge(t.priority)}
        </div>

        ${t.description?o`
          <div class="card">
            <div class="card-title" style="margin-bottom:8px">Description</div>
            <div style="font-size:13px;color:var(--text);line-height:1.6;white-space:pre-wrap">${t.description}</div>
          </div>`:""}

        <div class="card">
          <div class="card-title" style="margin-bottom:12px">Details</div>
          <div style="display:grid;gap:10px">
            ${[["Project",this.projectName(t.projectId)],["Assigned",this.clawName(t.assignedClawId)],["Due date",this.formatDate(t.dueDate)||"None"],["Created",this.formatDate(t.createdAt)]].map(([e,s])=>o`
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
            ${Ss.filter(e=>e!==t.status).map(e=>o`
              <button class="btn btn-secondary btn-sm"
                @click=${()=>this.patchStatus(t.id,e)}>${rs[e]}</button>
            `)}
          </div>
        </div>

        <div style="display:flex;gap:8px">
          <button class="btn btn-primary" ?disabled=${this.running} @click=${e=>this.runTask(t,e)}>
            ${this.running?"Running…":"Run task"}
          </button>
          <button class="btn btn-secondary" @click=${e=>this.openEdit(t,e)}>Edit</button>
          <button class="btn btn-danger" @click=${e=>this.removeTask(t,e)}>Delete</button>
        </div>
      </div>
    `}renderDrawerExecutions(t){if(this.drawerExecutions.length===0)return o`<div class="empty-state"><div class="empty-state-title">No executions yet</div></div>`;const e={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return o`
      <div style="display:grid;gap:10px">
        ${this.drawerExecutions.map(s=>o`
          <div class="card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span class="badge ${e[s.status]??"badge-gray"}">${s.status}</span>
              <span style="font-size:11px;color:var(--muted)">${this.formatDate(s.createdAt)}</span>
            </div>
            ${s.result?o`
              <div class="log-wrap" style="max-height:120px;overflow-y:auto;font-size:11px">${s.result}</div>
            `:""}
          </div>
        `)}
      </div>
    `}};Z([j()],Y.prototype,"tenantId",2);Z([j()],Y.prototype,"projectId",2);Z([j()],Y.prototype,"openTaskPrompt",2);Z([c()],Y.prototype,"items",2);Z([c()],Y.prototype,"projects",2);Z([c()],Y.prototype,"claws",2);Z([c()],Y.prototype,"loading",2);Z([c()],Y.prototype,"error",2);Z([c()],Y.prototype,"view",2);Z([c()],Y.prototype,"filterStatus",2);Z([c()],Y.prototype,"filterProject",2);Z([c()],Y.prototype,"filterPriority",2);Z([c()],Y.prototype,"search",2);Z([c()],Y.prototype,"showArchived",2);Z([c()],Y.prototype,"showModal",2);Z([c()],Y.prototype,"editTarget",2);Z([c()],Y.prototype,"form",2);Z([c()],Y.prototype,"saving",2);Z([c()],Y.prototype,"drawerTask",2);Z([c()],Y.prototype,"drawerExecutions",2);Z([c()],Y.prototype,"drawerTab",2);Z([c()],Y.prototype,"running",2);Z([c()],Y.prototype,"dragTaskId",2);Y=Z([Q("ccl-tasks")],Y);const ln=[800,1500,3e3,5e3,1e4,15e3];class vr{constructor(e){this.opts=e,this.ws=null,this.attempt=0,this.destroyed=!1,this.pingInterval=null,this.connect()}connect(){this.destroyed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>{this.attempt=0,this.schedulePings(),this.opts.onEvent({type:"connected"})}),this.ws.addEventListener("message",e=>{let s;try{s=JSON.parse(e.data)}catch{s=e.data}if(s&&typeof s=="object"&&s.type==="claw_offline"){this.opts.onEvent({type:"claw_offline"});return}this.opts.onEvent({type:"message",data:s})}),this.ws.addEventListener("close",e=>{this.clearPings(),!this.destroyed&&(this.opts.onEvent({type:"disconnected",code:e.code,reason:e.reason}),this.scheduleReconnect())}),this.ws.addEventListener("error",()=>{}))}send(e){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(e))}destroy(){this.destroyed=!0,this.clearPings(),this.ws?.close(1e3,"destroyed"),this.ws=null}get readyState(){return this.ws?.readyState??WebSocket.CLOSED}schedulePings(){this.clearPings(),this.pingInterval=setInterval(()=>{this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"ping"}))},3e4)}clearPings(){this.pingInterval!==null&&(clearInterval(this.pingInterval),this.pingInterval=null)}scheduleReconnect(){const e=ln[Math.min(this.attempt,ln.length-1)];this.attempt++,setTimeout(()=>this.connect(),e)}}var Il=Object.defineProperty,_l=Object.getOwnPropertyDescriptor,se=(t,e,s,i)=>{for(var a=i>1?void 0:i?_l(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Il(e,s,a),a};let qt=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.messages=[],this.tools=[],this.input="",this.connState="connecting",this.session="default",this.streaming=!1,this.gw=null,this.msgEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.scrollToBottom()}connect(){this.connState="connecting",this.gw=new vr({url:this.wsUrl,onEvent:t=>this.handleGwEvent(t)})}handleGwEvent(t){if(t.type==="connected"){this.connState="connected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type!=="message")return;const e=t.data;switch(e.type){case"chat.message":{if(e.role==="user")this.messages=[...this.messages,{id:crypto.randomUUID(),role:"user",text:e.text??""}];else{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:e.text??"",streaming:!1}]:this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.text??""}],this.streaming=!1}break}case"chat.delta":{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:s.text+(e.delta??"")}]:(this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.delta??"",streaming:!0}],this.streaming=!0);break}case"tool.start":{this.tools=[...this.tools,{id:e.toolCallId??crypto.randomUUID(),name:e.toolName??"tool",input:e.toolInput,expanded:!1}];break}case"tool.result":{this.tools=this.tools.map(s=>s.id===e.toolCallId?{...s,result:e.toolResult}:s);break}case"chat.abort":this.streaming=!1;break}}send(){const t=this.input.trim();!t||this.connState!=="connected"||(this.gw?.send({type:"chat",message:t,session:this.session}),this.input="")}abort(){this.gw?.send({type:"chat.abort"}),this.streaming=!1}newChat(){this.messages=[],this.tools=[],this.streaming=!1,this.gw?.send({type:"session.new"})}scrollToBottom(){this.msgEnd?.scrollIntoView({behavior:"smooth"})}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}connDot(){return o`<span class="dot ${{connected:"dot-green",connecting:"dot-yellow",offline:"dot-red",disconnected:"dot-gray"}[this.connState]}"></span> ${this.connState}`}render(){return o`
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
          ${this.connState==="offline"?o`
            <div class="empty-state">
              <div class="empty-state-icon">🔌</div>
              <div class="empty-state-title">Claw is offline</div>
              <div class="empty-state-sub">Waiting for the CoderClaw instance to connect</div>
            </div>`:""}

          ${this.messages.length===0&&this.connState!=="offline"?o`
            <div class="empty-state" style="margin-top:32px">
              <div class="empty-state-icon">💬</div>
              <div class="empty-state-title">Start a conversation</div>
              <div class="empty-state-sub">Send a message to the claw</div>
            </div>`:""}

          ${this.messages.map(t=>o`
            <div class="msg ${t.role==="user"?"msg-user":""}">
              <div class="msg-bubble ${t.role==="user"?"msg-bubble-user":"msg-bubble-assistant"}">
                ${t.text}${t.streaming?o`<span class="cursor-blink"></span>`:""}
              </div>
              <div class="msg-meta">${t.role}</div>
            </div>
          `)}

          ${this.tools.length>0?o`
            <div style="display:flex;flex-direction:column;gap:6px">
              ${this.tools.map(t=>o`
                <div class="card" style="font-size:12px">
                  <div style="display:flex;align-items:center;gap:8px;cursor:pointer"
                    @click=${()=>{this.tools=this.tools.map(e=>e.id===t.id?{...e,expanded:!e.expanded}:e)}}>
                    <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="${t.expanded?"18 15 12 9 6 15":"6 9 12 15 18 9"}"/></svg>
                    <span style="font-family:var(--mono);color:var(--accent)">${t.name}</span>
                    ${t.result?o`<span class="badge badge-green" style="margin-left:auto">done</span>`:o`<span class="badge badge-yellow" style="margin-left:auto">running</span>`}
                  </div>
                  ${t.expanded&&t.input?o`<pre class="log-wrap" style="margin-top:8px;font-size:11px;max-height:100px;overflow:auto">${t.input}</pre>`:""}
                  ${t.expanded&&t.result?o`<pre class="log-wrap" style="margin-top:6px;font-size:11px;max-height:100px;overflow:auto;border-color:var(--ok)">${t.result}</pre>`:""}
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
          ${this.streaming?o`<button class="btn btn-danger" @click=${this.abort}>Stop</button>`:o`<button class="btn btn-primary" @click=${this.send} ?disabled=${!this.input.trim()||this.connState!=="connected"}>Send</button>`}
        </div>
      </div>
    `}};se([j()],qt.prototype,"clawId",2);se([j()],qt.prototype,"wsUrl",2);se([c()],qt.prototype,"messages",2);se([c()],qt.prototype,"tools",2);se([c()],qt.prototype,"input",2);se([c()],qt.prototype,"connState",2);se([c()],qt.prototype,"session",2);se([c()],qt.prototype,"streaming",2);qt=se([Q("ccl-claw-chat")],qt);var Pl=Object.defineProperty,Rl=Object.getOwnPropertyDescriptor,ie=(t,e,s,i)=>{for(var a=i>1?void 0:i?Rl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Pl(e,s,a),a};const Ml=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Ts(t,e={}){const s=await fetch(`${Ml}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ct()??""}`,...e.headers??{}}});if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}const Dl=["claude","openai","ollama","http"];let Wt=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.agents=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",type:"claude",endpoint:"",apiKey:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.agents=await Ts("/api/agents")}catch(t){this.error=t.message}finally{this.loading=!1}}async toggleActive(t){try{await Ts(`/api/agents/${t.id}`,{method:"PATCH",body:JSON.stringify({isActive:!t.isActive})}),this.agents=this.agents.map(e=>e.id===t.id?{...e,isActive:!e.isActive}:e)}catch(e){this.error=e.message}}async removeAgent(t){if(confirm(`Delete agent "${t.name}"?`))try{await Ts(`/api/agents/${t.id}`,{method:"DELETE"}),this.agents=this.agents.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Ts("/api/agents",{method:"POST",body:JSON.stringify(this.form)});this.agents=[e,...this.agents],this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}render(){return o`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Agents</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Add agent</button>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

        ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.agents.length===0?o`<div class="empty-state"><div class="empty-state-title">No agents</div><div class="empty-state-sub">Add an AI agent to this claw</div></div>`:this.agents.map(t=>o`
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
                  <button class="btn btn-danger btn-sm" @click=${()=>this.removeAgent(t)}>Delete</button>
                </div>
              </div>
            `)}

        ${this.showModal?o`
          <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
            <div class="modal">
              <div class="modal-title">Add agent</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Name</label>
                  <input class="input" required .value=${this.form.name} @input=${t=>{this.form={...this.form,name:t.target.value}}}></div>
                <div class="field"><label class="label">Type</label>
                  <select class="select" @change=${t=>{this.form={...this.form,type:t.target.value}}}>
                    ${Dl.map(t=>o`<option value=${t}>${t}</option>`)}
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
    `}};ie([j()],Wt.prototype,"clawId",2);ie([j()],Wt.prototype,"wsUrl",2);ie([c()],Wt.prototype,"agents",2);ie([c()],Wt.prototype,"loading",2);ie([c()],Wt.prototype,"error",2);ie([c()],Wt.prototype,"showModal",2);ie([c()],Wt.prototype,"form",2);ie([c()],Wt.prototype,"saving",2);Wt=ie([Q("ccl-claw-agents")],Wt);var Ll=Object.defineProperty,Nl=Object.getOwnPropertyDescriptor,Nt=(t,e,s,i)=>{for(var a=i>1?void 0:i?Nl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Ll(e,s,a),a};const Ol=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function cn(t,e={}){const s=await fetch(`${Ol}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ct()??""}`,...e.headers??{}}});if(s.status===404)return{};if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}let Pt=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.config={},this.loading=!0,this.error="",this.editing=!1,this.draft={},this.saving=!1,this.newKey="",this.newVal=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await cn(`/api/claws/${this.clawId}/config`);this.config=t??{}}catch(t){this.error=t.message}finally{this.loading=!1}}startEdit(){this.draft={...this.config},this.editing=!0}cancel(){this.editing=!1,this.draft={}}async save(){this.saving=!0;try{await cn(`/api/claws/${this.clawId}/config`,{method:"PATCH",body:JSON.stringify(this.draft)}),this.config={...this.draft},this.editing=!1}catch(t){this.error=t.message}finally{this.saving=!1}}addField(){this.newKey.trim()&&(this.draft={...this.draft,[this.newKey.trim()]:this.newVal},this.newKey="",this.newVal="")}removeField(t){const e={...this.draft};delete e[t],this.draft=e}render(){const t=Object.entries(this.editing?this.draft:this.config);return o`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Configuration</div>
          ${this.editing?o`<div style="display:flex;gap:6px">
                <button class="btn btn-ghost btn-sm" @click=${this.cancel}>Cancel</button>
                <button class="btn btn-primary btn-sm" ?disabled=${this.saving} @click=${this.save}>${this.saving?"Saving…":"Save"}</button>
              </div>`:o`<button class="btn btn-secondary btn-sm" @click=${this.startEdit}>Edit</button>`}
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:""}

        ${t.length===0&&!this.loading?o`<div class="empty-state"><div class="empty-state-title">No configuration</div><div class="empty-state-sub">${this.editing?"Add key-value pairs below":"Click Edit to add configuration"}</div></div>`:o`
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>Key</th><th>Value</th>${this.editing?o`<th></th>`:""}</tr></thead>
                <tbody>
                  ${t.map(([e,s])=>o`
                    <tr>
                      <td><code style="font-family:var(--mono);font-size:12px">${e}</code></td>
                      <td>${this.editing?o`<input class="input" style="height:28px;padding:3px 8px" .value=${s}
                            @input=${i=>{this.draft={...this.draft,[e]:i.target.value}}}>`:o`<span style="font-family:var(--mono);font-size:12px">${s}</span>`}
                      </td>
                      ${this.editing?o`<td><button class="btn btn-danger btn-sm" @click=${()=>this.removeField(e)}>Remove</button></td>`:""}
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>`}

        ${this.editing?o`
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
    `}};Nt([j()],Pt.prototype,"clawId",2);Nt([j()],Pt.prototype,"wsUrl",2);Nt([c()],Pt.prototype,"config",2);Nt([c()],Pt.prototype,"loading",2);Nt([c()],Pt.prototype,"error",2);Nt([c()],Pt.prototype,"editing",2);Nt([c()],Pt.prototype,"draft",2);Nt([c()],Pt.prototype,"saving",2);Nt([c()],Pt.prototype,"newKey",2);Nt([c()],Pt.prototype,"newVal",2);Pt=Nt([Q("ccl-claw-config")],Pt);var jl=Object.defineProperty,Ul=Object.getOwnPropertyDescriptor,Ke=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ul(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&jl(e,s,a),a};const Bl=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function dn(t,e={}){const s=await fetch(`${Bl}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ct()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let Te=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.sessions=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await dn(`/api/claws/${this.clawId}/sessions`);this.sessions=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async removeSession(t){if(confirm("Delete this session?"))try{await dn(`/api/claws/${this.clawId}/sessions/${t.id}`,{method:"DELETE"}),this.sessions=this.sessions.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){return o`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Sessions</div>
          <button class="btn btn-secondary btn-sm" @click=${this.load}>Refresh</button>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.sessions.length===0?o`<div class="empty-state"><div class="empty-state-title">No sessions</div><div class="empty-state-sub">Sessions appear here once the claw connects and starts chatting</div></div>`:this.sessions.map(t=>o`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${t.name??t.id}</div>
                    <div style="font-size:11px;color:var(--muted)">${this.fmt(t.createdAt)}${t.messageCount!=null?` · ${t.messageCount} messages`:""}</div>
                  </div>
                  <button class="btn btn-danger btn-sm" @click=${()=>this.removeSession(t)}>Delete</button>
                </div>
              </div>
            `)}
      </div>
    `}};Ke([j()],Te.prototype,"clawId",2);Ke([j()],Te.prototype,"wsUrl",2);Ke([c()],Te.prototype,"sessions",2);Ke([c()],Te.prototype,"loading",2);Ke([c()],Te.prototype,"error",2);Te=Ke([Q("ccl-claw-sessions")],Te);const zl="modulepreload",Fl=function(t,e){return new URL(t,e).href},hn={},pn=function(e,s,i){let a=Promise.resolve();if(s&&s.length>0){let u=function(p){return Promise.all(p.map(m=>Promise.resolve(m).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const r=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),l=d?.nonce||d?.getAttribute("nonce");a=u(s.map(p=>{if(p=Fl(p,i),p in hn)return;hn[p]=!0;const m=p.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(i)for(let y=r.length-1;y>=0;y--){const S=r[y];if(S.href===p&&(!m||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${g}`))return;const f=document.createElement("link");if(f.rel=m?"stylesheet":zl,m||(f.as="script"),f.crossOrigin="",f.href=p,l&&f.setAttribute("nonce",l),document.head.appendChild(f),m)return new Promise((y,S)=>{f.addEventListener("load",y),f.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${p}`)))})}))}function n(r){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=r,window.dispatchEvent(d),!d.defaultPrevented)throw r}return a.then(r=>{for(const d of r||[])d.status==="rejected"&&n(d.reason);return e().catch(n)})};var ql=Object.defineProperty,Wl=Object.getOwnPropertyDescriptor,ae=(t,e,s,i)=>{for(var a=i>1?void 0:i?Wl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&ql(e,s,a),a};let Ht=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.assigned=[],this.available=[],this.loading=!0,this.error="",this.showModal=!1,this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([this.loadAssigned(),qs.list().catch(()=>[])]);this.assigned=t,this.available=e}catch(t){this.error=t.message}finally{this.loading=!1}}async loadAssigned(){try{const{getTenantToken:t}=await pn(async()=>{const{getTenantToken:a}=await Promise.resolve().then(()=>Wa);return{getTenantToken:a}},void 0,import.meta.url),e=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",s=await fetch(`${e}/api/skill-assignments/claws/${this.clawId}`,{headers:{Authorization:`Bearer ${t()??""}`}});return s.ok?((await s.json()).assignments??[]).map(a=>({slug:a.skillSlug,name:a.skillName??a.skillSlug,assignedAt:a.assignedAt})):[]}catch{return[]}}async assign(t){this.saving=!0;try{await qe.assignClaw(this.clawId,t),this.assigned=await this.loadAssigned(),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async unassign(t){try{const{getTenantToken:e}=await pn(async()=>{const{getTenantToken:i}=await Promise.resolve().then(()=>Wa);return{getTenantToken:i}},void 0,import.meta.url),s=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";await fetch(`${s}/api/skill-assignments/claws/${this.clawId}/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${e()??""}`}}),this.assigned=this.assigned.filter(i=>i.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}render(){const t=this.assignedSlugs(),e=this.available.filter(s=>!t.has(s.slug));return o`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Skills</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Assign skill</button>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.assigned.length===0?o`<div class="empty-state"><div class="empty-state-title">No skills assigned</div><div class="empty-state-sub">Assign skills to give this claw extra capabilities</div></div>`:this.assigned.map(s=>o`
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

        ${this.showModal?o`
          <div class="modal-backdrop" @click=${s=>{s.target===s.currentTarget&&(this.showModal=!1)}}>
            <div class="modal" style="max-width:500px">
              <div class="modal-title">Assign skill</div>
              <div class="modal-sub">Add a skill from the marketplace to this claw</div>
              ${e.length===0?o`<div style="color:var(--muted);font-size:13px;padding:16px 0">All available skills are already assigned</div>`:o`<div style="display:grid;gap:8px;max-height:360px;overflow-y:auto">
                    ${e.map(s=>o`
                      <div class="card" style="display:flex;align-items:center;gap:12px;cursor:pointer" @click=${()=>this.assign(s.slug)}>
                        ${s.icon?o`<img src="${s.icon}" style="width:32px;height:32px;border-radius:6px">`:o`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
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
    `}};ae([j()],Ht.prototype,"clawId",2);ae([j()],Ht.prototype,"wsUrl",2);ae([c()],Ht.prototype,"assigned",2);ae([c()],Ht.prototype,"available",2);ae([c()],Ht.prototype,"loading",2);ae([c()],Ht.prototype,"error",2);ae([c()],Ht.prototype,"showModal",2);ae([c()],Ht.prototype,"saving",2);Ht=ae([Q("ccl-claw-skills")],Ht);var Hl=Object.defineProperty,Kl=Object.getOwnPropertyDescriptor,_e=(t,e,s,i)=>{for(var a=i>1?void 0:i?Kl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Hl(e,s,a),a};let he=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.items=[],this.loading=!0,this.error="",this.timeFilter="week"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{this.items=await ia.list({clawId:this.clawId})}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){const t=Date.now(),s={today:864e5,week:6048e5,month:2592e6,all:1/0}[this.timeFilter];return this.items.filter(i=>t-new Date(i.createdAt).getTime()<s)}stats(t){const e=t.length,s=t.filter(n=>n.status==="completed").length,i=t.filter(n=>n.status==="failed").length,a=t.filter(n=>n.status==="running").length;return{total:e,completed:s,failed:i,running:a}}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered(),e=this.stats(t),s={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return o`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Usage</div>
          <div style="display:flex;gap:4px">
            ${["today","week","month","all"].map(i=>o`
              <button class="btn btn-sm ${this.timeFilter===i?"btn-primary":"btn-ghost"}" @click=${()=>{this.timeFilter=i}}>
                ${i}
              </button>
            `)}
          </div>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

        <div class="stat-grid">
          ${[["Total",e.total],["Completed",e.completed],["Failed",e.failed],["Running",e.running]].map(([i,a])=>o`
            <div class="stat-card">
              <div class="stat-value">${a}</div>
              <div class="stat-label">${i}</div>
            </div>
          `)}
        </div>

        ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:t.length===0?o`<div class="empty-state"><div class="empty-state-title">No executions</div></div>`:o`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Task</th><th>Status</th><th>Duration</th><th>Started</th></tr></thead>
                  <tbody>
                    ${t.slice().reverse().map(i=>o`
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
    `}};_e([j()],he.prototype,"clawId",2);_e([j()],he.prototype,"wsUrl",2);_e([c()],he.prototype,"items",2);_e([c()],he.prototype,"loading",2);_e([c()],he.prototype,"error",2);_e([c()],he.prototype,"timeFilter",2);he=_e([Q("ccl-claw-usage")],he);var Vl=Object.defineProperty,Gl=Object.getOwnPropertyDescriptor,ne=(t,e,s,i)=>{for(var a=i>1?void 0:i?Gl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Vl(e,s,a),a};const Jl=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Es(t,e={}){const s=await fetch(`${Jl}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ct()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let Kt=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.jobs=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",schedule:"0 9 * * 1-5",taskId:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Es(`/api/claws/${this.clawId}/cron`);this.jobs=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await Es(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.jobs=this.jobs.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async removeCronJob(t){if(confirm(`Delete cron job "${t.name}"?`))try{await Es(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"DELETE"}),this.jobs=this.jobs.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Es(`/api/claws/${this.clawId}/cron`,{method:"POST",body:JSON.stringify(this.form)});e&&(this.jobs=[e,...this.jobs]),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return o`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Cron Jobs</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Add job</button>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.jobs.length===0?o`<div class="empty-state"><div class="empty-state-icon">⏰</div><div class="empty-state-title">No cron jobs</div><div class="empty-state-sub">Schedule recurring tasks for this claw</div></div>`:this.jobs.map(t=>o`
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
                  <button class="btn btn-danger btn-sm" @click=${()=>this.removeCronJob(t)}>Delete</button>
                </div>
              </div>
            `)}

        ${this.showModal?o`
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
    `}};ne([j()],Kt.prototype,"clawId",2);ne([j()],Kt.prototype,"wsUrl",2);ne([c()],Kt.prototype,"jobs",2);ne([c()],Kt.prototype,"loading",2);ne([c()],Kt.prototype,"error",2);ne([c()],Kt.prototype,"showModal",2);ne([c()],Kt.prototype,"form",2);ne([c()],Kt.prototype,"saving",2);Kt=ne([Q("ccl-claw-cron")],Kt);var Yl=Object.defineProperty,Ql=Object.getOwnPropertyDescriptor,Ve=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ql(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Yl(e,s,a),a};const Xl=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function un(t,e={}){const s=await fetch(`${Xl}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ct()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let Ee=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.nodes=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await un(`/api/claws/${this.clawId}/nodes`);this.nodes=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async unpair(t){if(confirm(`Unpair node "${t.name??t.id}"?`))try{await un(`/api/claws/${this.clawId}/nodes/${t.id}`,{method:"DELETE"}),this.nodes=this.nodes.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return o`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Paired Nodes</div>
          <button class="btn btn-secondary btn-sm" @click=${this.load}>Refresh</button>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.nodes.length===0?o`<div class="empty-state"><div class="empty-state-icon">🖥️</div><div class="empty-state-title">No nodes paired</div><div class="empty-state-sub">Pair a device to extend this claw's capabilities</div></div>`:this.nodes.map(t=>o`
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
                ${t.capabilities?.length?o`
                  <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">
                    ${t.capabilities.map(e=>o`<span class="badge badge-gray">${e}</span>`)}
                  </div>`:""}
                <button class="btn btn-danger btn-sm" @click=${()=>this.unpair(t)}>Unpair</button>
              </div>
            `)}
      </div>
    `}};Ve([j()],Ee.prototype,"clawId",2);Ve([j()],Ee.prototype,"wsUrl",2);Ve([c()],Ee.prototype,"nodes",2);Ve([c()],Ee.prototype,"loading",2);Ve([c()],Ee.prototype,"error",2);Ee=Ve([Q("ccl-claw-nodes")],Ee);var Zl=Object.defineProperty,tc=Object.getOwnPropertyDescriptor,Gt=(t,e,s,i)=>{for(var a=i>1?void 0:i?tc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Zl(e,s,a),a};const ec=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function As(t,e={}){const s=await fetch(`${ec}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ct()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}const sc=["discord","slack","telegram","whatsapp","signal","googlechat","nostr"],ic={discord:[{key:"token",label:"Bot Token",type:"password"},{key:"guildId",label:"Guild ID"}],slack:[{key:"botToken",label:"Bot Token",type:"password"},{key:"appToken",label:"App Token",type:"password"}],telegram:[{key:"token",label:"Bot Token",type:"password"}],whatsapp:[{key:"phoneNumberId",label:"Phone Number ID"},{key:"accessToken",label:"Access Token",type:"password"}],signal:[{key:"phone",label:"Phone Number"}],googlechat:[{key:"serviceAccountKey",label:"Service Account Key (JSON)",type:"password"}],nostr:[{key:"privateKey",label:"Private Key (nsec)",type:"password"},{key:"relays",label:"Relay URLs (comma-separated)"}]};let Lt=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.channels=[],this.loading=!0,this.error="",this.showModal=!1,this.selectedType="discord",this.form={},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await As(`/api/claws/${this.clawId}/channels`);this.channels=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await As(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.channels=this.channels.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async removeChannel(t){if(confirm(`Delete ${t.type} channel?`))try{await As(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"DELETE"}),this.channels=this.channels.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await As(`/api/claws/${this.clawId}/channels`,{method:"POST",body:JSON.stringify({type:this.selectedType,config:this.form})});e&&(this.channels=[e,...this.channels]),this.showModal=!1,this.form={}}catch(e){this.error=e.message}finally{this.saving=!1}}statusDot(t){return o`<span class="dot ${{connected:"dot-green",error:"dot-red",stopped:"dot-gray",pending:"dot-yellow"}[t]??"dot-gray"}"></span>`}render(){const t=ic[this.selectedType]??[];return o`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Channels</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0,this.form={}}}>Add channel</button>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.channels.length===0?o`<div class="empty-state"><div class="empty-state-icon">💬</div><div class="empty-state-title">No channels</div><div class="empty-state-sub">Connect Discord, Slack, Telegram and more</div></div>`:this.channels.map(e=>o`
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
                  <button class="btn btn-danger btn-sm" @click=${()=>this.removeChannel(e)}>Delete</button>
                </div>
              </div>
            `)}

        ${this.showModal?o`
          <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&(this.showModal=!1)}}>
            <div class="modal">
              <div class="modal-title">Add channel</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field">
                  <label class="label">Channel type</label>
                  <select class="select" @change=${e=>{this.selectedType=e.target.value,this.form={}}}>
                    ${sc.map(e=>o`<option value=${e}>${e}</option>`)}
                  </select>
                </div>
                ${t.map(e=>o`
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
    `}};Gt([j()],Lt.prototype,"clawId",2);Gt([j()],Lt.prototype,"wsUrl",2);Gt([c()],Lt.prototype,"channels",2);Gt([c()],Lt.prototype,"loading",2);Gt([c()],Lt.prototype,"error",2);Gt([c()],Lt.prototype,"showModal",2);Gt([c()],Lt.prototype,"selectedType",2);Gt([c()],Lt.prototype,"form",2);Gt([c()],Lt.prototype,"saving",2);Lt=Gt([Q("ccl-claw-channels")],Lt);var ac=Object.defineProperty,nc=Object.getOwnPropertyDescriptor,Pe=(t,e,s,i)=>{for(var a=i>1?void 0:i?nc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&ac(e,s,a),a};let pe=class extends K{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.lines=[],this.level="all",this.connState="connecting",this.autoScroll=!0,this.gw=null,this.logEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.autoScroll&&this.logEnd?.scrollIntoView()}connect(){this.connState="connecting",this.gw=new vr({url:this.wsUrl,onEvent:t=>{if(t.type==="connected"){this.connState="connected",this.gw?.send({type:"logs.subscribe"});return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type!=="message")return;const e=t.data;e.type==="log"&&(this.lines=[...this.lines.slice(-2e3),{ts:e.ts??new Date().toISOString(),level:e.level??"info",msg:e.message??""}])}})}filtered(){return this.level==="all"?this.lines:this.lines.filter(t=>t.level===this.level)}levelClass(t){return{error:"log-line-error",warn:"log-line-warn",info:"log-line-info"}[t]??""}clear(){this.lines=[]}render(){const t=this.filtered();return o`
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
          ${t.length===0?o`<div style="color:var(--muted);font-size:12px">Waiting for log output…</div>`:t.map(e=>o`
              <div class="log-line ${this.levelClass(e.level)}">
                <span style="opacity:0.5;margin-right:8px">${e.ts.slice(11,19)}</span>
                <span style="min-width:40px;display:inline-block;margin-right:8px;text-transform:uppercase;font-size:10px;opacity:0.7">${e.level}</span>
                ${e.msg}
              </div>
            `)}
          <div style="height:1px" .ref=${e=>{this.logEnd=e}}></div>
        </div>
      </div>
    `}};Pe([j()],pe.prototype,"clawId",2);Pe([j()],pe.prototype,"wsUrl",2);Pe([c()],pe.prototype,"lines",2);Pe([c()],pe.prototype,"level",2);Pe([c()],pe.prototype,"connState",2);Pe([c()],pe.prototype,"autoScroll",2);pe=Pe([Q("ccl-claw-logs")],pe);var rc=Object.getOwnPropertyDescriptor,oc=(t,e,s,i)=>{for(var a=i>1?void 0:i?rc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=r(a)||a);return a};let qi=class extends K{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.saving=!1,this.error="",this.associated=[],this.allProjects=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="";try{const[t,e]=await Promise.all([pt.projects(this.clawId),Et.list()]);this.associated=t,this.allProjects=e}catch(t){this.error=t.message??"Failed to load project associations"}finally{this.loading=!1}}}async associate(t){this.saving=!0;try{await pt.associateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to associate project"}finally{this.saving=!1}}async unassociate(t){this.saving=!0;try{await pt.unassociateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to remove project association"}finally{this.saving=!1}}render(){const t=new Set(this.associated.map(s=>s.id)),e=this.allProjects.filter(s=>!t.has(s.id));return o`
      <div style="padding:16px;display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Associated Projects</div>
          <button class="btn btn-secondary btn-sm" @click=${()=>{this.load()}} ?disabled=${this.loading||this.saving}>Refresh</button>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?o`<div class="empty-state">Loading…</div>`:""}

        ${!this.loading&&this.associated.length===0?o`<div class="empty-state"><div class="empty-state-title">No projects linked</div><div class="empty-state-sub">Associate a project to route workspace context for this claw.</div></div>`:o`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Name</th><th>Key</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    ${this.associated.map(s=>o`
                      <tr>
                        <td>${s.name}</td>
                        <td style="font-family:var(--mono);font-size:12px">${s.key}</td>
                        <td>${s.status}</td>
                        <td>
                          <button class="btn btn-danger btn-sm" @click=${()=>{this.unassociate(s.id)}} ?disabled=${this.saving}>Remove</button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            `}

        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Add Project Association</div>
          ${e.length===0?o`<div style="font-size:13px;color:var(--muted)">All tenant projects are already associated.</div>`:o`
                <div style="display:grid;gap:8px;">
                  ${e.map(s=>o`
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid var(--border);border-radius:8px;padding:10px 12px;">
                      <div>
                        <div style="font-size:13px;font-weight:600;">${s.name}</div>
                        <div style="font-size:12px;color:var(--muted)">${s.key}</div>
                      </div>
                      <button class="btn btn-primary btn-sm" @click=${()=>{this.associate(s.id)}} ?disabled=${this.saving}>Associate</button>
                    </div>
                  `)}
                </div>
              `}
        </div>
      </div>
    `}};qi.properties={clawId:{type:String},loading:{state:!0},saving:{state:!0},error:{state:!0},associated:{state:!0},allProjects:{state:!0}};qi=oc([Q("ccl-claw-projects")],qi);var lc=Object.getOwnPropertyDescriptor,cc=(t,e,s,i)=>{for(var a=i>1?void 0:i?lc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=r(a)||a);return a};let Wi=class extends K{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.error="",this.directories=[],this.selectedDirectoryId="",this.files=[],this.filesLoading=!1,this.selectedFilePath="",this.selectedFileContent="",this.fileLoading=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="",this.selectedDirectoryId="",this.files=[],this.selectedFilePath="",this.selectedFileContent="";try{this.directories=await pt.directories(this.clawId),this.directories.length>0&&(this.selectedDirectoryId=this.directories[0].id,await this.loadFiles(this.selectedDirectoryId))}catch(t){this.error=t.message??"Failed to load workspace sync metadata"}finally{this.loading=!1}}}async loadFiles(t){if(t){this.filesLoading=!0,this.selectedFilePath="",this.selectedFileContent="";try{this.files=await pt.directoryFiles(this.clawId,t)}catch(e){this.error=e.message??"Failed to load files",this.files=[]}finally{this.filesLoading=!1}}}async selectFile(t){if(!(!this.selectedDirectoryId||!t)){this.selectedFilePath=t,this.fileLoading=!0;try{const e=await pt.directoryFileContent(this.clawId,this.selectedDirectoryId,t);this.selectedFileContent=e.content??""}catch(e){this.error=e.message??"Failed to load file content",this.selectedFileContent=""}finally{this.fileLoading=!1}}}badgeClass(t){return t==="synced"?"badge badge-green":t==="error"?"badge badge-red":"badge badge-yellow"}render(){const t=this.directories.find(e=>e.id===this.selectedDirectoryId)??null;return o`
      <div style="padding:16px;display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">.coderClaw Sync</div>
          <button class="btn btn-secondary btn-sm" @click=${()=>{this.load()}} ?disabled=${this.loading||this.filesLoading||this.fileLoading}>Refresh</button>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

        ${this.loading?o`<div class="empty-state">Loading…</div>`:this.directories.length===0?o`<div class="empty-state"><div class="empty-state-title">No synced directories</div><div class="empty-state-sub">Gateway startup sync has not published a .coderClaw path for this claw yet.</div></div>`:o`
                <div class="card">
                  <div class="card-title" style="margin-bottom:10px">Directory Manifest</div>
                  <div style="display:grid;gap:8px;">
                    ${this.directories.map(e=>o`
                      <button class="btn btn-ghost btn-sm" style="justify-content:space-between;border:1px solid var(--border);padding:10px 12px;"
                        @click=${async()=>{this.selectedDirectoryId=e.id,await this.loadFiles(e.id)}}>
                        <span style="text-align:left;display:grid;gap:2px;">
                          <span style="font-family:var(--mono);font-size:12px">${e.absPath}</span>
                          <span style="font-size:11px;color:var(--muted)">last synced: ${e.lastSyncedAt?new Date(e.lastSyncedAt).toLocaleString():"never"}</span>
                        </span>
                        <span class=${this.badgeClass(e.status)}>${e.status}</span>
                      </button>
                    `)}
                  </div>
                </div>

                ${t?o`
                      <div style="display:grid;grid-template-columns:minmax(220px, 320px) 1fr;gap:12px;min-height:320px;">
                        <div class="card" style="overflow:auto;">
                          <div class="card-title" style="margin-bottom:8px">Files</div>
                          ${this.filesLoading?o`<div style="font-size:12px;color:var(--muted)">Loading files…</div>`:this.files.length===0?o`<div style="font-size:12px;color:var(--muted)">No files synced yet.</div>`:o`
                                  <div style="display:grid;gap:6px;">
                                    ${this.files.map(e=>o`
                                      <button class="btn btn-ghost btn-sm"
                                        style="justify-content:flex-start;border:1px solid ${this.selectedFilePath===e.relPath?"var(--accent)":"var(--border)"};padding:8px 10px;"
                                        @click=${()=>{this.selectFile(e.relPath)}}>
                                        <span style="font-family:var(--mono);font-size:11px">${e.relPath}</span>
                                      </button>
                                    `)}
                                  </div>
                                `}
                        </div>

                        <div class="card" style="overflow:auto;">
                          <div class="card-title" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
                            <span>Preview</span>
                            <span style="font-size:11px;color:var(--muted);font-family:var(--mono)">${this.selectedFilePath||"Select a file"}</span>
                          </div>
                          ${this.fileLoading?o`<div style="font-size:12px;color:var(--muted)">Loading content…</div>`:this.selectedFilePath?o`<pre class="log-wrap" style="font-size:12px;max-height:520px;overflow:auto;white-space:pre-wrap;">${this.selectedFileContent}</pre>`:o`<div style="font-size:12px;color:var(--muted)">Select a synced file to preview content.</div>`}
                        </div>
                      </div>
                    `:""}
              `}
      </div>
    `}};Wi.properties={clawId:{type:String},loading:{state:!0},error:{state:!0},directories:{state:!0},selectedDirectoryId:{state:!0},files:{state:!0},filesLoading:{state:!0},selectedFilePath:{state:!0},selectedFileContent:{state:!0},fileLoading:{state:!0}};Wi=cc([Q("ccl-claw-workspace")],Wi);var dc=Object.defineProperty,hc=Object.getOwnPropertyDescriptor,st=(t,e,s,i)=>{for(var a=i>1?void 0:i?hc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&dc(e,s,a),a};const pc=[{id:"chat",label:"Chat"},{id:"agents",label:"Agents"},{id:"config",label:"Config"},{id:"sessions",label:"Sessions"},{id:"skills",label:"Skills"},{id:"usage",label:"Usage"},{id:"cron",label:"Cron"},{id:"nodes",label:"Nodes"},{id:"channels",label:"Channels"},{id:"projects",label:"Projects"},{id:"workspace",label:"Workspace"},{id:"logs",label:"Logs"}];let et=class extends K{constructor(){super(...arguments),this.refreshTimer=null,this.tenantId="",this.clawList=[],this.loading=!1,this.error="",this.showRegisterModal=!1,this.showManualRegister=!1,this.registerName="",this.registering=!1,this.registerError="",this.newClaw=null,this.apiKeyCopied=!1,this.pluginEnvCopied=!1,this.pluginEnvDownloaded=!1,this.panelOpen=!1,this.activeClaw=null,this.activeTab="chat",this.defaultClawId=null,this.savingDefaultClaw=!1,this.defaultActionClawId=null,this.deleteConfirmId=null,this.deleting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadClaws(),this.startPresenceRefresh()}disconnectedCallback(){super.disconnectedCallback(),this.refreshTimer!==null&&(clearInterval(this.refreshTimer),this.refreshTimer=null)}async loadClaws(){this.loading=!0,this.error="";try{const[t,e]=await Promise.all([pt.list(),this.tenantId?at.defaultClaw(this.tenantId):Promise.resolve({defaultClawId:null})]);this.clawList=t,this.defaultClawId=e.defaultClawId}catch(t){this.error=t.message??"Failed to load claws"}finally{this.loading=!1}}isDefaultClaw(t){return this.defaultClawId!==null&&Number(t.id)===this.defaultClawId}async setDefaultClaw(t,e){if(this.tenantId){this.savingDefaultClaw=!0,this.defaultActionClawId=e??null;try{const s=await at.setDefaultClaw(this.tenantId,t);this.defaultClawId=s.defaultClawId}catch(s){this.error=s.message??"Failed to save default claw"}finally{this.savingDefaultClaw=!1,this.defaultActionClawId=null}}}startPresenceRefresh(){this.refreshTimer!==null&&clearInterval(this.refreshTimer),this.refreshTimer=setInterval(()=>{this.refreshPresence()},15e3)}async refreshPresence(){try{this.clawList=await pt.list()}catch{}}openPanel(t){this.activeClaw=t,this.activeTab="chat",this.panelOpen=!0,this.error="",document.body.style.overflow="hidden"}closePanel(){this.panelOpen=!1,document.body.style.overflow="",setTimeout(()=>{this.activeClaw=null},300)}async handleRegister(){if(this.registerName.trim()){this.registering=!0,this.registerError="";try{const t=await pt.register(this.registerName.trim());this.newClaw=t,this.clawList=[...this.clawList,t],this.defaultClawId==null&&(this.defaultClawId=Number(t.id)),this.registerName=""}catch(t){this.registerError=t.message??"Registration failed"}finally{this.registering=!1}}}closeRegisterModal(){this.showRegisterModal=!1,this.showManualRegister=!1,this.newClaw=null,this.registerName="",this.registerError="",this.apiKeyCopied=!1,this.pluginEnvCopied=!1,this.pluginEnvDownloaded=!1}async copyApiKey(){if(this.newClaw)try{await navigator.clipboard.writeText(this.newClaw.apiKey),this.apiKeyCopied=!0,setTimeout(()=>{this.apiKeyCopied=!1},2e3)}catch{}}buildPluginEnvTemplate(){const t=ct()??"",e=(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,""),s=this.newClaw?.name??"openclaw-node";return[`CODERCLAW_LINK_URL=${e}`,`CODERCLAW_LINK_TENANT_TOKEN=${t}`,`CODERCLAW_LINK_CLAW_NAME=${s}`,`CODERCLAW_LINK_CLAW_ID=${this.newClaw?.id??""}`,`CODERCLAW_LINK_API_KEY=${this.newClaw?.apiKey??""}`,"OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copyPluginEnvTemplate(){if(this.newClaw){if(!ct()){this.registerError="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(this.buildPluginEnvTemplate()),this.pluginEnvCopied=!0,setTimeout(()=>{this.pluginEnvCopied=!1},2e3)}catch{this.registerError="Failed to copy plugin env file."}}}downloadPluginEnvTemplate(){if(this.newClaw){if(!ct()){this.registerError="No tenant token found for current workspace session.";return}try{const t=this.buildPluginEnvTemplate(),e=new Blob([`${t}
`],{type:"text/plain;charset=utf-8"}),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download="coderclawlink.env",i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s),this.pluginEnvDownloaded=!0,setTimeout(()=>{this.pluginEnvDownloaded=!1},2e3)}catch{this.registerError="Failed to download plugin env file."}}}async handleDelete(t){this.deleting=!0;try{await pt.remove(t),this.clawList=this.clawList.filter(e=>e.id!==t),this.deleteConfirmId=null,this.activeClaw?.id===t&&this.closePanel()}catch(e){this.error=e.message??"Delete failed"}finally{this.deleting=!1}}statusBadge(t){return t.status==="active"?o`<span class="badge badge-green">active</span>`:t.status==="suspended"?o`<span class="badge badge-red">suspended</span>`:o`<span class="badge badge-gray">${t.status}</span>`}connectedDot(t){const e=t.status==="active"&&t.connectedAt?"dot dot-green":"dot dot-gray";return o`<span class="${e}" title="${t.connectedAt?"connected":"offline"}"></span>`}renderRegisterModal(){return this.showRegisterModal?o`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&this.closeRegisterModal()}}>
        <div class="modal" style="width:min(980px,95vw)">
          <div class="modal-title">Register new claw</div>
          ${this.newClaw?o`
            <div class="modal-sub">Claw registered. Save this API key &mdash; it will not be shown again.</div>
            <div style="margin:1rem 0;background:var(--bg-2,#f4f4f5);border-radius:6px;padding:0.75rem 1rem;font-family:monospace;font-size:0.875rem;word-break:break-all;">${this.newClaw.apiKey}</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" @click=${this.copyApiKey}>
                ${this.apiKeyCopied?"Copied!":"Copy API key"}
              </button>
              <button class="btn btn-secondary btn-sm" @click=${this.copyPluginEnvTemplate}>
                ${this.pluginEnvCopied?"Env copied!":"Copy plugin env file"}
              </button>
              <button class="btn btn-secondary btn-sm" @click=${this.downloadPluginEnvTemplate}>
                ${this.pluginEnvDownloaded?"Downloaded!":"Download .env file"}
              </button>
            </div>
            <div style="margin-top:10px;font-size:12px;color:var(--muted,#71717a)">
              Use this env file to run the OpenClaw plugin relay on your node host.
            </div>
            ${this.registerError?o`<div class="error-banner">${this.registerError}</div>`:""}
            <div class="modal-footer">
              <button class="btn btn-primary" @click=${this.closeRegisterModal}>Done</button>
            </div>
          `:this.showManualRegister?o`
            <div class="field">
              <label class="label">Claw name</label>
              <input class="input" placeholder="my-claw"
                .value=${this.registerName}
                @input=${t=>{this.registerName=t.target.value}}
                @keydown=${t=>{t.key==="Enter"&&this.handleRegister()}}
              />
            </div>
            ${this.registerError?o`<div class="error-banner">${this.registerError}</div>`:""}
            <div class="modal-footer">
              <button class="btn btn-ghost" @click=${()=>{this.showManualRegister=!1}}>Back</button>
              <button class="btn btn-primary" ?disabled=${this.registering||!this.registerName.trim()}
                @click=${this.handleRegister}>${this.registering?"Registering…":"Register"}</button>
            </div>
          `:o`
            <div class="modal-sub">Run the onboarding command on the machine where CoderClaw is installed. It auto-registers a new claw, or reuses existing local CoderClawLink credentials when already connected.</div>
            <ccl-quickstart></ccl-quickstart>
            <div class="modal-footer" style="margin-top:12px">
              <button class="btn btn-ghost" @click=${this.closeRegisterModal}>Close</button>
              <button class="btn btn-secondary" @click=${async()=>{await this.loadClaws(),this.closeRegisterModal()}}>I ran the command — Refresh</button>
              <button class="btn btn-primary" @click=${()=>{this.showManualRegister=!0}}>Manual register</button>
            </div>
          `}
        </div>
      </div>
    `:o``}renderDeleteConfirm(t){return this.deleteConfirmId!==t.id?o``:o`
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
    `}renderPanel(){if(!this.activeClaw)return o``;const t=this.activeClaw,e=pt.wsUrl(t.id);return o`
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
          ${this.isDefaultClaw(t)?o`<span class="badge badge-blue">Default</span>`:""}
          ${this.statusBadge(t)}
          <span style="font-size:0.75rem;color:var(--muted,#71717a);font-family:monospace;">${t.slug}</span>
          ${!this.isDefaultClaw(t)&&this.tenantId?o`
            <button
              class="btn btn-secondary btn-sm"
              style="margin-left:auto"
              ?disabled=${this.savingDefaultClaw}
              @click=${()=>{this.setDefaultClaw(Number(t.id),t.id)}}
            >${this.defaultActionClawId===t.id?"Setting…":"Set as default"}</button>
          `:o`<span style="margin-left:auto"></span>`}
        </div>
        <div style="display:flex;border-bottom:1px solid var(--border,#e4e4e7);flex-shrink:0;overflow-x:auto;">
          ${pc.map(s=>o`
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
          ${this.activeTab==="chat"?o`<ccl-claw-chat     .clawId=${t.id} .wsUrl=${e}></ccl-claw-chat>`:""}
          ${this.activeTab==="agents"?o`<ccl-claw-agents   .clawId=${t.id} .wsUrl=${e}></ccl-claw-agents>`:""}
          ${this.activeTab==="config"?o`<ccl-claw-config   .clawId=${t.id} .wsUrl=${e}></ccl-claw-config>`:""}
          ${this.activeTab==="sessions"?o`<ccl-claw-sessions .clawId=${t.id} .wsUrl=${e}></ccl-claw-sessions>`:""}
          ${this.activeTab==="skills"?o`<ccl-claw-skills   .clawId=${t.id} .wsUrl=${e}></ccl-claw-skills>`:""}
          ${this.activeTab==="usage"?o`<ccl-claw-usage    .clawId=${t.id} .wsUrl=${e}></ccl-claw-usage>`:""}
          ${this.activeTab==="cron"?o`<ccl-claw-cron     .clawId=${t.id} .wsUrl=${e}></ccl-claw-cron>`:""}
          ${this.activeTab==="nodes"?o`<ccl-claw-nodes    .clawId=${t.id} .wsUrl=${e}></ccl-claw-nodes>`:""}
          ${this.activeTab==="channels"?o`<ccl-claw-channels .clawId=${t.id} .wsUrl=${e}></ccl-claw-channels>`:""}
          ${this.activeTab==="projects"?o`<ccl-claw-projects .clawId=${t.id}></ccl-claw-projects>`:""}
          ${this.activeTab==="workspace"?o`<ccl-claw-workspace .clawId=${t.id}></ccl-claw-workspace>`:""}
          ${this.activeTab==="logs"?o`<ccl-claw-logs     .clawId=${t.id} .wsUrl=${e}></ccl-claw-logs>`:""}
        </div>
      </div>
    `}render(){return o`
      <div>
        <div class="page-header">
          <div><div class="page-title">Claws</div><div class="page-sub">${this.clawList.length} registered</div></div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end">
            <button class="btn btn-primary" @click=${()=>{this.showManualRegister=!1,this.showRegisterModal=!0}}>Register claw</button>
          </div>
        </div>
        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?o`<div class="empty-state">Loading…</div>`:""}
        ${!this.loading&&this.clawList.length===0?o`
          <div>
            <div class="empty-state">
              <div class="empty-state-title">No claws registered yet</div>
              <div class="empty-state-sub">Register your first claw to get started.</div>
              <button class="btn btn-primary" style="margin-top:16px" @click=${()=>{this.showManualRegister=!1,this.showRegisterModal=!0}}>Register claw</button>
            </div>
            <ccl-quickstart></ccl-quickstart>
          </div>
        `:""}
        ${!this.loading&&this.clawList.length>0?o`
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th></th><th>Name</th><th>Slug</th><th>Status</th><th>Last seen</th><th></th></tr></thead>
              <tbody>
                ${this.clawList.map(t=>o`
                  <tr class="claw-row">
                    <td style="width:2rem;">${this.connectedDot(t)}</td>
                    <td style="font-weight:500;">${t.name}</td>
                    <td style="font-family:monospace;font-size:0.8125rem;color:var(--muted,#71717a);">${t.slug}</td>
                    <td>${this.statusBadge(t)}</td>
                    <td style="font-size:0.8125rem;color:var(--muted,#71717a);">${t.lastSeenAt?new Date(t.lastSeenAt).toLocaleString():"never"}</td>
                    <td>
                      <div class="claw-row-actions">
                        ${this.isDefaultClaw(t)?o`<span class="badge badge-blue">Default</span>`:this.tenantId?o`
                                <button
                                  class="btn btn-secondary btn-sm claw-default-action"
                                  ?disabled=${this.savingDefaultClaw}
                                  @click=${()=>{this.setDefaultClaw(Number(t.id),t.id)}}
                                >${this.defaultActionClawId===t.id?"Setting…":"Set default"}</button>
                              `:""}
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
    `}};st([j()],et.prototype,"tenantId",2);st([c()],et.prototype,"clawList",2);st([c()],et.prototype,"loading",2);st([c()],et.prototype,"error",2);st([c()],et.prototype,"showRegisterModal",2);st([c()],et.prototype,"showManualRegister",2);st([c()],et.prototype,"registerName",2);st([c()],et.prototype,"registering",2);st([c()],et.prototype,"registerError",2);st([c()],et.prototype,"newClaw",2);st([c()],et.prototype,"apiKeyCopied",2);st([c()],et.prototype,"pluginEnvCopied",2);st([c()],et.prototype,"pluginEnvDownloaded",2);st([c()],et.prototype,"panelOpen",2);st([c()],et.prototype,"activeClaw",2);st([c()],et.prototype,"activeTab",2);st([c()],et.prototype,"defaultClawId",2);st([c()],et.prototype,"savingDefaultClaw",2);st([c()],et.prototype,"defaultActionClawId",2);st([c()],et.prototype,"deleteConfirmId",2);st([c()],et.prototype,"deleting",2);et=st([Q("ccl-claws")],et);var uc=Object.defineProperty,gc=Object.getOwnPropertyDescriptor,ge=(t,e,s,i)=>{for(var a=i>1?void 0:i?gc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&uc(e,s,a),a};let ee=class extends K{constructor(){super(...arguments),this.tenantId="",this.available=[],this.assigned=[],this.loading=!0,this.error="",this.search="",this.tab="assigned"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([qs.list().catch(()=>[]),qe.listTenant().catch(()=>[])]);this.available=t,this.assigned=e}catch(t){this.error=t.message}finally{this.loading=!1}}async assign(t){try{await qe.assignTenant(t),this.assigned=await qe.listTenant()}catch(e){this.error=e.message}}async unassign(t){try{await qe.unassignTenant(t),this.assigned=this.assigned.filter(e=>e.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}filteredAvailable(){const t=this.search.toLowerCase();return this.available.filter(e=>!t||e.name.toLowerCase().includes(t)||(e.description??"").toLowerCase().includes(t))}render(){const t=this.assignedSlugs();return o`
      <div class="page-header">
        <div>
          <div class="page-title">Skills</div>
          <div class="page-sub">Extend your claws with marketplace skills</div>
        </div>
      </div>

      ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab==="assigned"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="assigned"}}>
          Assigned (${this.assigned.length})
        </button>
        <button class="btn ${this.tab==="marketplace"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="marketplace"}}>
          Marketplace (${this.available.length})
        </button>
      </div>

      ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.tab==="assigned"?this.renderAssigned():this.renderMarketplace(t)}
    `}renderAssigned(){return this.assigned.length===0?o`<div class="empty-state"><div class="empty-state-icon">✨</div><div class="empty-state-title">No skills assigned</div><div class="empty-state-sub">Browse the marketplace to add skills to your workspace</div><button class="btn btn-primary" style="margin-top:16px" @click=${()=>{this.tab="marketplace"}}>Browse marketplace</button></div>`:o`
      <div class="grid grid-3">
        ${this.assigned.map(t=>o`
          <div class="card">
            <div class="card-header">
              <div class="card-title">${t.name}</div>
              <button class="btn btn-danger btn-sm" @click=${()=>this.unassign(t.slug)}>Remove</button>
            </div>
            <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${t.slug}</div>
          </div>
        `)}
      </div>
    `}renderMarketplace(t){const e=this.filteredAvailable();return o`
      <div>
        <input class="input" style="max-width:300px;margin-bottom:16px" placeholder="Search skills…"
          .value=${this.search} @input=${s=>{this.search=s.target.value}}>

        ${e.length===0?o`<div class="empty-state"><div class="empty-state-title">No skills found</div></div>`:o`
            <div class="grid grid-3">
              ${e.map(s=>o`
                <div class="card">
                  <div class="card-header">
                    <div style="display:flex;align-items:center;gap:10px">
                      ${s.icon?o`<img src="${s.icon}" style="width:32px;height:32px;border-radius:6px">`:o`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
                      <div>
                        <div class="card-title">${s.name}</div>
                        ${s.category?o`<span class="badge badge-gray" style="font-size:10px">${s.category}</span>`:""}
                      </div>
                    </div>
                  </div>
                  ${s.description?o`<div style="font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:12px">${s.description}</div>`:""}
                  ${t.has(s.slug)?o`<button class="btn btn-danger btn-sm" @click=${()=>this.unassign(s.slug)}>Remove</button>`:o`<button class="btn btn-primary btn-sm" @click=${()=>this.assign(s.slug)}>Add to workspace</button>`}
                </div>
              `)}
            </div>`}
      </div>
    `}};ge([j()],ee.prototype,"tenantId",2);ge([c()],ee.prototype,"available",2);ge([c()],ee.prototype,"assigned",2);ge([c()],ee.prototype,"loading",2);ge([c()],ee.prototype,"error",2);ge([c()],ee.prototype,"search",2);ge([c()],ee.prototype,"tab",2);ee=ge([Q("ccl-skills")],ee);function mc(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ze={},ui,gn;function fc(){return gn||(gn=1,ui=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ui}var gi={},le={},mn;function Re(){if(mn)return le;mn=1;let t;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return le.getSymbolSize=function(i){if(!i)throw new Error('"version" cannot be null or undefined');if(i<1||i>40)throw new Error('"version" should be in range from 1 to 40');return i*4+17},le.getSymbolTotalCodewords=function(i){return e[i]},le.getBCHDigit=function(s){let i=0;for(;s!==0;)i++,s>>>=1;return i},le.setToSJISFunction=function(i){if(typeof i!="function")throw new Error('"toSJISFunc" is not a valid function.');t=i},le.isKanjiModeEnabled=function(){return typeof t<"u"},le.toSJIS=function(i){return t(i)},le}var mi={},fn;function ua(){return fn||(fn=1,(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function e(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+s)}}t.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},t.from=function(i,a){if(t.isValid(i))return i;try{return e(i)}catch{return a}}})(mi)),mi}var fi,vn;function vc(){if(vn)return fi;vn=1;function t(){this.buffer=[],this.length=0}return t.prototype={get:function(e){const s=Math.floor(e/8);return(this.buffer[s]>>>7-e%8&1)===1},put:function(e,s){for(let i=0;i<s;i++)this.putBit((e>>>s-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const s=Math.floor(this.length/8);this.buffer.length<=s&&this.buffer.push(0),e&&(this.buffer[s]|=128>>>this.length%8),this.length++}},fi=t,fi}var vi,yn;function yc(){if(yn)return vi;yn=1;function t(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return t.prototype.set=function(e,s,i,a){const n=e*this.size+s;this.data[n]=i,a&&(this.reservedBit[n]=!0)},t.prototype.get=function(e,s){return this.data[e*this.size+s]},t.prototype.xor=function(e,s,i){this.data[e*this.size+s]^=i},t.prototype.isReserved=function(e,s){return this.reservedBit[e*this.size+s]},vi=t,vi}var yi={},bn;function bc(){return bn||(bn=1,(function(t){const e=Re().getSymbolSize;t.getRowColCoords=function(i){if(i===1)return[];const a=Math.floor(i/7)+2,n=e(i),r=n===145?26:Math.ceil((n-13)/(2*a-2))*2,d=[n-7];for(let l=1;l<a-1;l++)d[l]=d[l-1]-r;return d.push(6),d.reverse()},t.getPositions=function(i){const a=[],n=t.getRowColCoords(i),r=n.length;for(let d=0;d<r;d++)for(let l=0;l<r;l++)d===0&&l===0||d===0&&l===r-1||d===r-1&&l===0||a.push([n[d],n[l]]);return a}})(yi)),yi}var bi={},wn;function wc(){if(wn)return bi;wn=1;const t=Re().getSymbolSize,e=7;return bi.getPositions=function(i){const a=t(i);return[[0,0],[a-e,0],[0,a-e]]},bi}var wi={},$n;function $c(){return $n||($n=1,(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};t.isValid=function(a){return a!=null&&a!==""&&!isNaN(a)&&a>=0&&a<=7},t.from=function(a){return t.isValid(a)?parseInt(a,10):void 0},t.getPenaltyN1=function(a){const n=a.size;let r=0,d=0,l=0,u=null,p=null;for(let m=0;m<n;m++){d=l=0,u=p=null;for(let g=0;g<n;g++){let f=a.get(m,g);f===u?d++:(d>=5&&(r+=e.N1+(d-5)),u=f,d=1),f=a.get(g,m),f===p?l++:(l>=5&&(r+=e.N1+(l-5)),p=f,l=1)}d>=5&&(r+=e.N1+(d-5)),l>=5&&(r+=e.N1+(l-5))}return r},t.getPenaltyN2=function(a){const n=a.size;let r=0;for(let d=0;d<n-1;d++)for(let l=0;l<n-1;l++){const u=a.get(d,l)+a.get(d,l+1)+a.get(d+1,l)+a.get(d+1,l+1);(u===4||u===0)&&r++}return r*e.N2},t.getPenaltyN3=function(a){const n=a.size;let r=0,d=0,l=0;for(let u=0;u<n;u++){d=l=0;for(let p=0;p<n;p++)d=d<<1&2047|a.get(u,p),p>=10&&(d===1488||d===93)&&r++,l=l<<1&2047|a.get(p,u),p>=10&&(l===1488||l===93)&&r++}return r*e.N3},t.getPenaltyN4=function(a){let n=0;const r=a.data.length;for(let l=0;l<r;l++)n+=a.data[l];return Math.abs(Math.ceil(n*100/r/5)-10)*e.N4};function s(i,a,n){switch(i){case t.Patterns.PATTERN000:return(a+n)%2===0;case t.Patterns.PATTERN001:return a%2===0;case t.Patterns.PATTERN010:return n%3===0;case t.Patterns.PATTERN011:return(a+n)%3===0;case t.Patterns.PATTERN100:return(Math.floor(a/2)+Math.floor(n/3))%2===0;case t.Patterns.PATTERN101:return a*n%2+a*n%3===0;case t.Patterns.PATTERN110:return(a*n%2+a*n%3)%2===0;case t.Patterns.PATTERN111:return(a*n%3+(a+n)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}t.applyMask=function(a,n){const r=n.size;for(let d=0;d<r;d++)for(let l=0;l<r;l++)n.isReserved(l,d)||n.xor(l,d,s(a,l,d))},t.getBestMask=function(a,n){const r=Object.keys(t.Patterns).length;let d=0,l=1/0;for(let u=0;u<r;u++){n(u),t.applyMask(u,a);const p=t.getPenaltyN1(a)+t.getPenaltyN2(a)+t.getPenaltyN3(a)+t.getPenaltyN4(a);t.applyMask(u,a),p<l&&(l=p,d=u)}return d}})(wi)),wi}var Is={},kn;function yr(){if(kn)return Is;kn=1;const t=ua(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],s=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Is.getBlocksCount=function(a,n){switch(n){case t.L:return e[(a-1)*4+0];case t.M:return e[(a-1)*4+1];case t.Q:return e[(a-1)*4+2];case t.H:return e[(a-1)*4+3];default:return}},Is.getTotalCodewordsCount=function(a,n){switch(n){case t.L:return s[(a-1)*4+0];case t.M:return s[(a-1)*4+1];case t.Q:return s[(a-1)*4+2];case t.H:return s[(a-1)*4+3];default:return}},Is}var $i={},os={},xn;function kc(){if(xn)return os;xn=1;const t=new Uint8Array(512),e=new Uint8Array(256);return(function(){let i=1;for(let a=0;a<255;a++)t[a]=i,e[i]=a,i<<=1,i&256&&(i^=285);for(let a=255;a<512;a++)t[a]=t[a-255]})(),os.log=function(i){if(i<1)throw new Error("log("+i+")");return e[i]},os.exp=function(i){return t[i]},os.mul=function(i,a){return i===0||a===0?0:t[e[i]+e[a]]},os}var Cn;function xc(){return Cn||(Cn=1,(function(t){const e=kc();t.mul=function(i,a){const n=new Uint8Array(i.length+a.length-1);for(let r=0;r<i.length;r++)for(let d=0;d<a.length;d++)n[r+d]^=e.mul(i[r],a[d]);return n},t.mod=function(i,a){let n=new Uint8Array(i);for(;n.length-a.length>=0;){const r=n[0];for(let l=0;l<a.length;l++)n[l]^=e.mul(a[l],r);let d=0;for(;d<n.length&&n[d]===0;)d++;n=n.slice(d)}return n},t.generateECPolynomial=function(i){let a=new Uint8Array([1]);for(let n=0;n<i;n++)a=t.mul(a,new Uint8Array([1,e.exp(n)]));return a}})($i)),$i}var ki,Sn;function Cc(){if(Sn)return ki;Sn=1;const t=xc();function e(s){this.genPoly=void 0,this.degree=s,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(i){this.degree=i,this.genPoly=t.generateECPolynomial(this.degree)},e.prototype.encode=function(i){if(!this.genPoly)throw new Error("Encoder not initialized");const a=new Uint8Array(i.length+this.degree);a.set(i);const n=t.mod(a,this.genPoly),r=this.degree-n.length;if(r>0){const d=new Uint8Array(this.degree);return d.set(n,r),d}return n},ki=e,ki}var xi={},Ci={},Si={},Tn;function br(){return Tn||(Tn=1,Si.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),Si}var Bt={},En;function wr(){if(En)return Bt;En=1;const t="[0-9]+",e="[A-Z $%*+\\-./:]+";let s="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";s=s.replace(/u/g,"\\u");const i="(?:(?![A-Z0-9 $%*+\\-./:]|"+s+`)(?:.|[\r
]))+`;Bt.KANJI=new RegExp(s,"g"),Bt.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Bt.BYTE=new RegExp(i,"g"),Bt.NUMERIC=new RegExp(t,"g"),Bt.ALPHANUMERIC=new RegExp(e,"g");const a=new RegExp("^"+s+"$"),n=new RegExp("^"+t+"$"),r=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Bt.testKanji=function(l){return a.test(l)},Bt.testNumeric=function(l){return n.test(l)},Bt.testAlphanumeric=function(l){return r.test(l)},Bt}var An;function Me(){return An||(An=1,(function(t){const e=br(),s=wr();t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(n,r){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!e.isValid(r))throw new Error("Invalid version: "+r);return r>=1&&r<10?n.ccBits[0]:r<27?n.ccBits[1]:n.ccBits[2]},t.getBestModeForData=function(n){return s.testNumeric(n)?t.NUMERIC:s.testAlphanumeric(n)?t.ALPHANUMERIC:s.testKanji(n)?t.KANJI:t.BYTE},t.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},t.isValid=function(n){return n&&n.bit&&n.ccBits};function i(a){if(typeof a!="string")throw new Error("Param is not a string");switch(a.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+a)}}t.from=function(n,r){if(t.isValid(n))return n;try{return i(n)}catch{return r}}})(Ci)),Ci}var In;function Sc(){return In||(In=1,(function(t){const e=Re(),s=yr(),i=ua(),a=Me(),n=br(),r=7973,d=e.getBCHDigit(r);function l(g,f,y){for(let S=1;S<=40;S++)if(f<=t.getCapacity(S,y,g))return S}function u(g,f){return a.getCharCountIndicator(g,f)+4}function p(g,f){let y=0;return g.forEach(function(S){const G=u(S.mode,f);y+=G+S.getBitsLength()}),y}function m(g,f){for(let y=1;y<=40;y++)if(p(g,y)<=t.getCapacity(y,f,a.MIXED))return y}t.from=function(f,y){return n.isValid(f)?parseInt(f,10):y},t.getCapacity=function(f,y,S){if(!n.isValid(f))throw new Error("Invalid QR Code version");typeof S>"u"&&(S=a.BYTE);const G=e.getSymbolTotalCodewords(f),R=s.getTotalCodewordsCount(f,y),O=(G-R)*8;if(S===a.MIXED)return O;const _=O-u(S,f);switch(S){case a.NUMERIC:return Math.floor(_/10*3);case a.ALPHANUMERIC:return Math.floor(_/11*2);case a.KANJI:return Math.floor(_/13);case a.BYTE:default:return Math.floor(_/8)}},t.getBestVersionForData=function(f,y){let S;const G=i.from(y,i.M);if(Array.isArray(f)){if(f.length>1)return m(f,G);if(f.length===0)return 1;S=f[0]}else S=f;return l(S.mode,S.getLength(),G)},t.getEncodedBits=function(f){if(!n.isValid(f)||f<7)throw new Error("Invalid QR Code version");let y=f<<12;for(;e.getBCHDigit(y)-d>=0;)y^=r<<e.getBCHDigit(y)-d;return f<<12|y}})(xi)),xi}var Ti={},_n;function Tc(){if(_n)return Ti;_n=1;const t=Re(),e=1335,s=21522,i=t.getBCHDigit(e);return Ti.getEncodedBits=function(n,r){const d=n.bit<<3|r;let l=d<<10;for(;t.getBCHDigit(l)-i>=0;)l^=e<<t.getBCHDigit(l)-i;return(d<<10|l)^s},Ti}var Ei={},Ai,Pn;function Ec(){if(Pn)return Ai;Pn=1;const t=Me();function e(s){this.mode=t.NUMERIC,this.data=s.toString()}return e.getBitsLength=function(i){return 10*Math.floor(i/3)+(i%3?i%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){let a,n,r;for(a=0;a+3<=this.data.length;a+=3)n=this.data.substr(a,3),r=parseInt(n,10),i.put(r,10);const d=this.data.length-a;d>0&&(n=this.data.substr(a),r=parseInt(n,10),i.put(r,d*3+1))},Ai=e,Ai}var Ii,Rn;function Ac(){if(Rn)return Ii;Rn=1;const t=Me(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function s(i){this.mode=t.ALPHANUMERIC,this.data=i}return s.getBitsLength=function(a){return 11*Math.floor(a/2)+6*(a%2)},s.prototype.getLength=function(){return this.data.length},s.prototype.getBitsLength=function(){return s.getBitsLength(this.data.length)},s.prototype.write=function(a){let n;for(n=0;n+2<=this.data.length;n+=2){let r=e.indexOf(this.data[n])*45;r+=e.indexOf(this.data[n+1]),a.put(r,11)}this.data.length%2&&a.put(e.indexOf(this.data[n]),6)},Ii=s,Ii}var _i,Mn;function Ic(){if(Mn)return _i;Mn=1;const t=Me();function e(s){this.mode=t.BYTE,typeof s=="string"?this.data=new TextEncoder().encode(s):this.data=new Uint8Array(s)}return e.getBitsLength=function(i){return i*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(s){for(let i=0,a=this.data.length;i<a;i++)s.put(this.data[i],8)},_i=e,_i}var Pi,Dn;function _c(){if(Dn)return Pi;Dn=1;const t=Me(),e=Re();function s(i){this.mode=t.KANJI,this.data=i}return s.getBitsLength=function(a){return a*13},s.prototype.getLength=function(){return this.data.length},s.prototype.getBitsLength=function(){return s.getBitsLength(this.data.length)},s.prototype.write=function(i){let a;for(a=0;a<this.data.length;a++){let n=e.toSJIS(this.data[a]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[a]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),i.put(n,13)}},Pi=s,Pi}var Ri={exports:{}},Ln;function Pc(){return Ln||(Ln=1,(function(t){var e={single_source_shortest_paths:function(s,i,a){var n={},r={};r[i]=0;var d=e.PriorityQueue.make();d.push(i,0);for(var l,u,p,m,g,f,y,S,G;!d.empty();){l=d.pop(),u=l.value,m=l.cost,g=s[u]||{};for(p in g)g.hasOwnProperty(p)&&(f=g[p],y=m+f,S=r[p],G=typeof r[p]>"u",(G||S>y)&&(r[p]=y,d.push(p,y),n[p]=u))}if(typeof a<"u"&&typeof r[a]>"u"){var R=["Could not find a path from ",i," to ",a,"."].join("");throw new Error(R)}return n},extract_shortest_path_from_predecessor_list:function(s,i){for(var a=[],n=i;n;)a.push(n),s[n],n=s[n];return a.reverse(),a},find_path:function(s,i,a){var n=e.single_source_shortest_paths(s,i,a);return e.extract_shortest_path_from_predecessor_list(n,a)},PriorityQueue:{make:function(s){var i=e.PriorityQueue,a={},n;s=s||{};for(n in i)i.hasOwnProperty(n)&&(a[n]=i[n]);return a.queue=[],a.sorter=s.sorter||i.default_sorter,a},default_sorter:function(s,i){return s.cost-i.cost},push:function(s,i){var a={value:s,cost:i};this.queue.push(a),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=e})(Ri)),Ri.exports}var Nn;function Rc(){return Nn||(Nn=1,(function(t){const e=Me(),s=Ec(),i=Ac(),a=Ic(),n=_c(),r=wr(),d=Re(),l=Pc();function u(R){return unescape(encodeURIComponent(R)).length}function p(R,O,_){const $=[];let V;for(;(V=R.exec(_))!==null;)$.push({data:V[0],index:V.index,mode:O,length:V[0].length});return $}function m(R){const O=p(r.NUMERIC,e.NUMERIC,R),_=p(r.ALPHANUMERIC,e.ALPHANUMERIC,R);let $,V;return d.isKanjiModeEnabled()?($=p(r.BYTE,e.BYTE,R),V=p(r.KANJI,e.KANJI,R)):($=p(r.BYTE_KANJI,e.BYTE,R),V=[]),O.concat(_,$,V).sort(function(P,I){return P.index-I.index}).map(function(P){return{data:P.data,mode:P.mode,length:P.length}})}function g(R,O){switch(O){case e.NUMERIC:return s.getBitsLength(R);case e.ALPHANUMERIC:return i.getBitsLength(R);case e.KANJI:return n.getBitsLength(R);case e.BYTE:return a.getBitsLength(R)}}function f(R){return R.reduce(function(O,_){const $=O.length-1>=0?O[O.length-1]:null;return $&&$.mode===_.mode?(O[O.length-1].data+=_.data,O):(O.push(_),O)},[])}function y(R){const O=[];for(let _=0;_<R.length;_++){const $=R[_];switch($.mode){case e.NUMERIC:O.push([$,{data:$.data,mode:e.ALPHANUMERIC,length:$.length},{data:$.data,mode:e.BYTE,length:$.length}]);break;case e.ALPHANUMERIC:O.push([$,{data:$.data,mode:e.BYTE,length:$.length}]);break;case e.KANJI:O.push([$,{data:$.data,mode:e.BYTE,length:u($.data)}]);break;case e.BYTE:O.push([{data:$.data,mode:e.BYTE,length:u($.data)}])}}return O}function S(R,O){const _={},$={start:{}};let V=["start"];for(let w=0;w<R.length;w++){const P=R[w],I=[];for(let x=0;x<P.length;x++){const D=P[x],b=""+w+x;I.push(b),_[b]={node:D,lastCount:0},$[b]={};for(let A=0;A<V.length;A++){const E=V[A];_[E]&&_[E].node.mode===D.mode?($[E][b]=g(_[E].lastCount+D.length,D.mode)-g(_[E].lastCount,D.mode),_[E].lastCount+=D.length):(_[E]&&(_[E].lastCount=D.length),$[E][b]=g(D.length,D.mode)+4+e.getCharCountIndicator(D.mode,O))}}V=I}for(let w=0;w<V.length;w++)$[V[w]].end=0;return{map:$,table:_}}function G(R,O){let _;const $=e.getBestModeForData(R);if(_=e.from(O,$),_!==e.BYTE&&_.bit<$.bit)throw new Error('"'+R+'" cannot be encoded with mode '+e.toString(_)+`.
 Suggested mode is: `+e.toString($));switch(_===e.KANJI&&!d.isKanjiModeEnabled()&&(_=e.BYTE),_){case e.NUMERIC:return new s(R);case e.ALPHANUMERIC:return new i(R);case e.KANJI:return new n(R);case e.BYTE:return new a(R)}}t.fromArray=function(O){return O.reduce(function(_,$){return typeof $=="string"?_.push(G($,null)):$.data&&_.push(G($.data,$.mode)),_},[])},t.fromString=function(O,_){const $=m(O,d.isKanjiModeEnabled()),V=y($),w=S(V,_),P=l.find_path(w.map,"start","end"),I=[];for(let x=1;x<P.length-1;x++)I.push(w.table[P[x]].node);return t.fromArray(f(I))},t.rawSplit=function(O){return t.fromArray(m(O,d.isKanjiModeEnabled()))}})(Ei)),Ei}var On;function Mc(){if(On)return gi;On=1;const t=Re(),e=ua(),s=vc(),i=yc(),a=bc(),n=wc(),r=$c(),d=yr(),l=Cc(),u=Sc(),p=Tc(),m=Me(),g=Rc();function f(w,P){const I=w.size,x=n.getPositions(P);for(let D=0;D<x.length;D++){const b=x[D][0],A=x[D][1];for(let E=-1;E<=7;E++)if(!(b+E<=-1||I<=b+E))for(let N=-1;N<=7;N++)A+N<=-1||I<=A+N||(E>=0&&E<=6&&(N===0||N===6)||N>=0&&N<=6&&(E===0||E===6)||E>=2&&E<=4&&N>=2&&N<=4?w.set(b+E,A+N,!0,!0):w.set(b+E,A+N,!1,!0))}}function y(w){const P=w.size;for(let I=8;I<P-8;I++){const x=I%2===0;w.set(I,6,x,!0),w.set(6,I,x,!0)}}function S(w,P){const I=a.getPositions(P);for(let x=0;x<I.length;x++){const D=I[x][0],b=I[x][1];for(let A=-2;A<=2;A++)for(let E=-2;E<=2;E++)A===-2||A===2||E===-2||E===2||A===0&&E===0?w.set(D+A,b+E,!0,!0):w.set(D+A,b+E,!1,!0)}}function G(w,P){const I=w.size,x=u.getEncodedBits(P);let D,b,A;for(let E=0;E<18;E++)D=Math.floor(E/3),b=E%3+I-8-3,A=(x>>E&1)===1,w.set(D,b,A,!0),w.set(b,D,A,!0)}function R(w,P,I){const x=w.size,D=p.getEncodedBits(P,I);let b,A;for(b=0;b<15;b++)A=(D>>b&1)===1,b<6?w.set(b,8,A,!0):b<8?w.set(b+1,8,A,!0):w.set(x-15+b,8,A,!0),b<8?w.set(8,x-b-1,A,!0):b<9?w.set(8,15-b-1+1,A,!0):w.set(8,15-b-1,A,!0);w.set(x-8,8,1,!0)}function O(w,P){const I=w.size;let x=-1,D=I-1,b=7,A=0;for(let E=I-1;E>0;E-=2)for(E===6&&E--;;){for(let N=0;N<2;N++)if(!w.isReserved(D,E-N)){let Ot=!1;A<P.length&&(Ot=(P[A]>>>b&1)===1),w.set(D,E-N,Ot),b--,b===-1&&(A++,b=7)}if(D+=x,D<0||I<=D){D-=x,x=-x;break}}}function _(w,P,I){const x=new s;I.forEach(function(N){x.put(N.mode.bit,4),x.put(N.getLength(),m.getCharCountIndicator(N.mode,w)),N.write(x)});const D=t.getSymbolTotalCodewords(w),b=d.getTotalCodewordsCount(w,P),A=(D-b)*8;for(x.getLengthInBits()+4<=A&&x.put(0,4);x.getLengthInBits()%8!==0;)x.putBit(0);const E=(A-x.getLengthInBits())/8;for(let N=0;N<E;N++)x.put(N%2?17:236,8);return $(x,w,P)}function $(w,P,I){const x=t.getSymbolTotalCodewords(P),D=d.getTotalCodewordsCount(P,I),b=x-D,A=d.getBlocksCount(P,I),E=x%A,N=A-E,Ot=Math.floor(x/A),me=Math.floor(b/A),Vs=me+1,Ge=Ot-me,Gs=new l(Ge);let De=0;const tt=new Array(A),Je=new Array(A);let it=0;const gs=new Uint8Array(w.buffer);for(let Jt=0;Jt<A;Jt++){const fe=Jt<N?me:Vs;tt[Jt]=gs.slice(De,De+fe),Je[Jt]=Gs.encode(tt[Jt]),De+=fe,it=Math.max(it,fe)}const J=new Uint8Array(x);let oe=0,At,ft;for(At=0;At<it;At++)for(ft=0;ft<A;ft++)At<tt[ft].length&&(J[oe++]=tt[ft][At]);for(At=0;At<Ge;At++)for(ft=0;ft<A;ft++)J[oe++]=Je[ft][At];return J}function V(w,P,I,x){let D;if(Array.isArray(w))D=g.fromArray(w);else if(typeof w=="string"){let Ot=P;if(!Ot){const me=g.rawSplit(w);Ot=u.getBestVersionForData(me,I)}D=g.fromString(w,Ot||40)}else throw new Error("Invalid data");const b=u.getBestVersionForData(D,I);if(!b)throw new Error("The amount of data is too big to be stored in a QR Code");if(!P)P=b;else if(P<b)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+b+`.
`);const A=_(P,I,D),E=t.getSymbolSize(P),N=new i(E);return f(N,P),y(N),S(N,P),R(N,I,0),P>=7&&G(N,P),O(N,A),isNaN(x)&&(x=r.getBestMask(N,R.bind(null,N,I))),r.applyMask(x,N),R(N,I,x),{modules:N,version:P,errorCorrectionLevel:I,maskPattern:x,segments:D}}return gi.create=function(P,I){if(typeof P>"u"||P==="")throw new Error("No input text");let x=e.M,D,b;return typeof I<"u"&&(x=e.from(I.errorCorrectionLevel,e.M),D=u.from(I.version),b=r.from(I.maskPattern),I.toSJISFunc&&t.setToSJISFunction(I.toSJISFunc)),V(P,D,x,b)},gi}var Mi={},Di={},jn;function $r(){return jn||(jn=1,(function(t){function e(s){if(typeof s=="number"&&(s=s.toString()),typeof s!="string")throw new Error("Color should be defined as hex string");let i=s.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+s);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(n){return[n,n]}))),i.length===6&&i.push("F","F");const a=parseInt(i.join(""),16);return{r:a>>24&255,g:a>>16&255,b:a>>8&255,a:a&255,hex:"#"+i.slice(0,6).join("")}}t.getOptions=function(i){i||(i={}),i.color||(i.color={});const a=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,n=i.width&&i.width>=21?i.width:void 0,r=i.scale||4;return{width:n,scale:n?4:r,margin:a,color:{dark:e(i.color.dark||"#000000ff"),light:e(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},t.getScale=function(i,a){return a.width&&a.width>=i+a.margin*2?a.width/(i+a.margin*2):a.scale},t.getImageWidth=function(i,a){const n=t.getScale(i,a);return Math.floor((i+a.margin*2)*n)},t.qrToImageData=function(i,a,n){const r=a.modules.size,d=a.modules.data,l=t.getScale(r,n),u=Math.floor((r+n.margin*2)*l),p=n.margin*l,m=[n.color.light,n.color.dark];for(let g=0;g<u;g++)for(let f=0;f<u;f++){let y=(g*u+f)*4,S=n.color.light;if(g>=p&&f>=p&&g<u-p&&f<u-p){const G=Math.floor((g-p)/l),R=Math.floor((f-p)/l);S=m[d[G*r+R]?1:0]}i[y++]=S.r,i[y++]=S.g,i[y++]=S.b,i[y]=S.a}}})(Di)),Di}var Un;function Dc(){return Un||(Un=1,(function(t){const e=$r();function s(a,n,r){a.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=r,n.width=r,n.style.height=r+"px",n.style.width=r+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(n,r,d){let l=d,u=r;typeof l>"u"&&(!r||!r.getContext)&&(l=r,r=void 0),r||(u=i()),l=e.getOptions(l);const p=e.getImageWidth(n.modules.size,l),m=u.getContext("2d"),g=m.createImageData(p,p);return e.qrToImageData(g.data,n,l),s(m,u,p),m.putImageData(g,0,0),u},t.renderToDataURL=function(n,r,d){let l=d;typeof l>"u"&&(!r||!r.getContext)&&(l=r,r=void 0),l||(l={});const u=t.render(n,r,l),p=l.type||"image/png",m=l.rendererOpts||{};return u.toDataURL(p,m.quality)}})(Mi)),Mi}var Li={},Bn;function Lc(){if(Bn)return Li;Bn=1;const t=$r();function e(a,n){const r=a.a/255,d=n+'="'+a.hex+'"';return r<1?d+" "+n+'-opacity="'+r.toFixed(2).slice(1)+'"':d}function s(a,n,r){let d=a+n;return typeof r<"u"&&(d+=" "+r),d}function i(a,n,r){let d="",l=0,u=!1,p=0;for(let m=0;m<a.length;m++){const g=Math.floor(m%n),f=Math.floor(m/n);!g&&!u&&(u=!0),a[m]?(p++,m>0&&g>0&&a[m-1]||(d+=u?s("M",g+r,.5+f+r):s("m",l,0),l=0,u=!1),g+1<n&&a[m+1]||(d+=s("h",p),p=0)):l++}return d}return Li.render=function(n,r,d){const l=t.getOptions(r),u=n.modules.size,p=n.modules.data,m=u+l.margin*2,g=l.color.light.a?"<path "+e(l.color.light,"fill")+' d="M0 0h'+m+"v"+m+'H0z"/>':"",f="<path "+e(l.color.dark,"stroke")+' d="'+i(p,u,l.margin)+'"/>',y='viewBox="0 0 '+m+" "+m+'"',G='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+y+' shape-rendering="crispEdges">'+g+f+`</svg>
`;return typeof d=="function"&&d(null,G),G},Li}var zn;function Nc(){if(zn)return ze;zn=1;const t=fc(),e=Mc(),s=Dc(),i=Lc();function a(n,r,d,l,u){const p=[].slice.call(arguments,1),m=p.length,g=typeof p[m-1]=="function";if(!g&&!t())throw new Error("Callback required as last argument");if(g){if(m<2)throw new Error("Too few arguments provided");m===2?(u=d,d=r,r=l=void 0):m===3&&(r.getContext&&typeof u>"u"?(u=l,l=void 0):(u=l,l=d,d=r,r=void 0))}else{if(m<1)throw new Error("Too few arguments provided");return m===1?(d=r,r=l=void 0):m===2&&!r.getContext&&(l=d,d=r,r=void 0),new Promise(function(f,y){try{const S=e.create(d,l);f(n(S,r,l))}catch(S){y(S)}})}try{const f=e.create(d,l);u(null,n(f,r,l))}catch(f){u(f)}}return ze.create=e.create,ze.toCanvas=a.bind(null,s.render),ze.toDataURL=a.bind(null,s.renderToDataURL),ze.toString=a.bind(null,function(n,r,d){return i.render(n,d)}),ze}var Oc=Nc();const kr=mc(Oc);var jc=Object.defineProperty,Uc=Object.getOwnPropertyDescriptor,L=(t,e,s,i)=>{for(var a=i>1?void 0:i?Uc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&jc(e,s,a),a};const Bc=["owner","manager","developer","viewer"];let M=class extends K{constructor(){super(...arguments),this.tenant=null,this.initialTab="members",this.initialSection="",this.detail=null,this.loading=!0,this.error="",this.tab="members",this.subscription=null,this.usage=null,this.usageDays=30,this.availableClaws=[],this.defaultClawId=null,this.savingDefaultClaw=!1,this.updatingPlan=!1,this.billingCycle="monthly",this.billingEmail="",this.billingBrand="visa",this.billingLast4="",this.showTenantToken=!1,this.copiedTenantToken=!1,this.copiedPluginEnv=!1,this.downloadedPluginEnv=!1,this.mfaStatus=null,this.mfaSetupBusy=!1,this.mfaEnableBusy=!1,this.mfaDisableBusy=!1,this.mfaRegenerateBusy=!1,this.mfaVerifyCode="",this.mfaRecoveryInput="",this.mfaMode="totp",this.mfaManualKey="",this.mfaQrDataUrl="",this.recoveryCodes=[],this.authSessions=[],this.authTokens=[],this.loadingSecurity=!1,this.pendingSection="",this.sourceControlIntegrations=[],this.sourceControlLoading=!1,this.sourceControlSaving=!1,this.sourceControlForm={provider:"github",name:"",accountIdentifier:"",hostUrl:""},this.showInvite=!1,this.inviteEmail="",this.inviteRole="developer",this.inviting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.tab=this.initialTab,this.pendingSection=this.initialSection,this.load()}updated(t){t.has("initialTab")&&this.initialTab!==this.tab&&(this.tab=this.initialTab),t.has("initialSection")&&(this.pendingSection=this.initialSection),(t.has("initialTab")||t.has("initialSection"))&&!this.loading&&this.applySectionNavigation(),t.has("tenant")&&this.tenant&&this.load()}applySectionNavigation(){if(!this.pendingSection)return;const t=this.pendingSection;this.tab!=="settings"&&(this.tab="settings"),requestAnimationFrame(()=>{const e=this.querySelector(`[data-workspace-section="${t}"]`);e&&e.scrollIntoView({behavior:"smooth",block:"start"}),this.pendingSection=""})}async load(){if(this.tenant){this.loading=!0;try{const[t,e,s,i,a]=await Promise.all([at.get(this.tenant.id),at.subscription(this.tenant.id),Ws.usage(this.usageDays),pt.list(),at.defaultClaw(this.tenant.id)]);this.detail=t,this.subscription=e,this.usage=s,this.availableClaws=i,this.defaultClawId=a.defaultClawId,this.billingEmail=e.billingEmail??"",this.billingBrand=e.billingPaymentBrand??"visa",this.billingLast4=e.billingPaymentLast4??"",this.billingCycle=e.billingCycle??"monthly",await this.loadSourceControlIntegrations()}catch(t){this.error=t.message}finally{this.loading=!1,this.applySectionNavigation()}}}async loadSecurity(){this.loadingSecurity=!0;try{const[t,e,s]=await Promise.all([ht.mfaStatus(),ht.listSessions(),ht.listTokens()]);this.mfaStatus=t,this.authSessions=e,this.authTokens=s}catch(t){this.error=t.message}finally{this.loadingSecurity=!1}}async startMfaSetup(){this.mfaSetupBusy=!0,this.error="";try{const t=await ht.mfaSetup();this.mfaManualKey=t.manualEntryKey,this.mfaQrDataUrl=await kr.toDataURL(t.otpauthUrl,{width:220,margin:1}),this.recoveryCodes=[],await this.loadSecurity()}catch(t){this.error=t.message}finally{this.mfaSetupBusy=!1}}async enableMfa(){if(this.mfaVerifyCode.trim()){this.mfaEnableBusy=!0,this.error="";try{const t=await ht.mfaEnable(this.mfaVerifyCode.trim());this.recoveryCodes=t.recoveryCodes,this.mfaVerifyCode="",this.mfaQrDataUrl="",this.mfaManualKey="",await this.loadSecurity()}catch(t){this.error=t.message}finally{this.mfaEnableBusy=!1}}}async disableMfa(){if(!(this.mfaMode==="totp"&&!this.mfaVerifyCode.trim())&&!(this.mfaMode==="recovery"&&!this.mfaRecoveryInput.trim())){this.mfaDisableBusy=!0,this.error="";try{await ht.mfaDisable({code:this.mfaMode==="totp"?this.mfaVerifyCode.trim():void 0,recoveryCode:this.mfaMode==="recovery"?this.mfaRecoveryInput.trim():void 0}),this.mfaVerifyCode="",this.mfaRecoveryInput="",this.recoveryCodes=[],await this.loadSecurity()}catch(t){this.error=t.message}finally{this.mfaDisableBusy=!1}}}async regenerateRecoveryCodes(){if(!(this.mfaMode==="totp"&&!this.mfaVerifyCode.trim())&&!(this.mfaMode==="recovery"&&!this.mfaRecoveryInput.trim())){this.mfaRegenerateBusy=!0,this.error="";try{const t=await ht.mfaRegenerateRecoveryCodes({code:this.mfaMode==="totp"?this.mfaVerifyCode.trim():void 0,recoveryCode:this.mfaMode==="recovery"?this.mfaRecoveryInput.trim():void 0});this.recoveryCodes=t.recoveryCodes,this.mfaRecoveryInput="",this.mfaVerifyCode="",await this.loadSecurity()}catch(t){this.error=t.message}finally{this.mfaRegenerateBusy=!1}}}downloadRecoveryCodes(){if(!this.recoveryCodes.length)return;const t=this.recoveryCodes.join(`
`),e=new Blob([`${t}
`],{type:"text/plain;charset=utf-8"}),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download="coderclawlink-recovery-codes.txt",i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s)}async revokeSession(t){if(confirm("Revoke this session and sign it out?"))try{await ht.revokeSession(t),await this.loadSecurity()}catch(e){this.error=e.message}}async revokeOthers(){if(confirm("Revoke all other sessions?"))try{await ht.revokeOtherSessions(),await this.loadSecurity()}catch(t){this.error=t.message}}async revokeToken(t){if(confirm("Revoke this token?"))try{await ht.revokeToken(t),await this.loadSecurity()}catch(e){this.error=e.message}}canManageBilling(){const t=this.tenant?.role?.toLowerCase();return t==="owner"||t==="manager"}canManageSourceControl(){return this.canManageBilling()}async loadSourceControlIntegrations(){if(this.tenant){this.sourceControlLoading=!0;try{this.sourceControlIntegrations=await at.listSourceControlIntegrations(this.tenant.id)}catch(t){this.error=t.message}finally{this.sourceControlLoading=!1}}}async createSourceControlIntegration(t){if(t.preventDefault(),!(!this.tenant||!this.canManageSourceControl())&&!(!this.sourceControlForm.name.trim()||!this.sourceControlForm.accountIdentifier.trim())){this.sourceControlSaving=!0,this.error="";try{await at.createSourceControlIntegration(this.tenant.id,{provider:this.sourceControlForm.provider,name:this.sourceControlForm.name.trim(),accountIdentifier:this.sourceControlForm.accountIdentifier.trim(),hostUrl:this.sourceControlForm.hostUrl.trim()||null}),this.sourceControlForm={provider:this.sourceControlForm.provider,name:"",accountIdentifier:"",hostUrl:""},await this.loadSourceControlIntegrations()}catch(e){this.error=e.message}finally{this.sourceControlSaving=!1}}}async setIntegrationActive(t,e){if(!(!this.tenant||!this.canManageSourceControl()))try{const s=await at.updateSourceControlIntegration(this.tenant.id,t.id,{isActive:e});this.sourceControlIntegrations=this.sourceControlIntegrations.map(i=>i.id===s.id?s:i)}catch(s){this.error=s.message}}async deleteSourceControlIntegration(t){if(!(!this.tenant||!this.canManageSourceControl())&&confirm(`Delete integration "${t.name}"?`))try{await at.deleteSourceControlIntegration(this.tenant.id,t.id),this.sourceControlIntegrations=this.sourceControlIntegrations.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async saveDefaultClaw(){if(!(!this.tenant||!this.canManageBilling())){this.savingDefaultClaw=!0;try{const t=await at.setDefaultClaw(this.tenant.id,this.defaultClawId);this.defaultClawId=t.defaultClawId}catch(t){this.error=t.message}finally{this.savingDefaultClaw=!1}}}async changePlanToPro(t){if(t.preventDefault(),!(!this.tenant||!this.canManageBilling())){this.updatingPlan=!0;try{await at.upgradeToPro(this.tenant.id,{billingCycle:this.billingCycle,billingEmail:this.billingEmail,billingPaymentBrand:this.billingBrand,billingPaymentLast4:this.billingLast4}),await this.load()}catch(e){this.error=e.message}finally{this.updatingPlan=!1}}}async changePlanToFree(){if(!(!this.tenant||!this.canManageBilling())){this.updatingPlan=!0;try{await at.downgradeToFree(this.tenant.id),await this.load()}catch(t){this.error=t.message}finally{this.updatingPlan=!1}}}async invite(t){if(t.preventDefault(),!(!this.tenant||!this.inviteEmail)){this.inviting=!0;try{await at.inviteMember(this.tenant.id,this.inviteEmail,this.inviteRole),await this.load(),this.showInvite=!1,this.inviteEmail=""}catch(e){this.error=e.message}finally{this.inviting=!1}}}async removeMember(t){if(!(!this.tenant||!confirm("Remove this member?")))try{await at.removeMember(this.tenant.id,t),await this.load()}catch(e){this.error=e.message}}roleBadge(t){return o`<span class="badge ${{owner:"badge-red",manager:"badge-yellow",developer:"badge-blue",viewer:"badge-gray"}[t]??"badge-gray"}">${t}</span>`}async copyTenantToken(){const t=ct();if(!t){this.error="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(t),this.copiedTenantToken=!0,setTimeout(()=>{this.copiedTenantToken=!1},2e3)}catch(e){this.error=e.message}}buildPluginEnvTemplate(){const t=ct()??"",e=(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,""),s=`openclaw-${(this.tenant?.slug??"node").replace(/[^a-z0-9-]/gi,"-")}`;return[`CODERCLAW_LINK_URL=${e}`,`CODERCLAW_LINK_TENANT_TOKEN=${t}`,`CODERCLAW_LINK_CLAW_NAME=${s}`,"CODERCLAW_LINK_CLAW_ID=","CODERCLAW_LINK_API_KEY=","OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copyPluginEnvTemplate(){if(!ct()){this.error="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(this.buildPluginEnvTemplate()),this.copiedPluginEnv=!0,setTimeout(()=>{this.copiedPluginEnv=!1},2e3)}catch(e){this.error=e.message}}downloadPluginEnvTemplate(){if(!ct()){this.error="No tenant token found for current workspace session.";return}try{const e=this.buildPluginEnvTemplate(),s=new Blob([`${e}
`],{type:"text/plain;charset=utf-8"}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download="coderclawlink.env",a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i),this.downloadedPluginEnv=!0,setTimeout(()=>{this.downloadedPluginEnv=!1},2e3)}catch(e){this.error=e.message}}render(){return o`
      <div class="page-header">
        <div>
          <div class="page-title">${this.tenant?.name??"Workspace"}</div>
          <div class="page-sub">Manage members and settings</div>
        </div>
      </div>

      ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab==="members"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="members"}}>Members</button>
        <button class="btn ${this.tab==="settings"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="settings"}}>Settings</button>
      </div>

      ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.tab==="members"?this.renderMembers():this.renderSettings()}
    `}renderMembers(){const t=this.detail?.members??[];return o`
      <div data-workspace-section="members">
        <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
          <button class="btn btn-primary" @click=${()=>{this.showInvite=!0}}>Invite member</button>
        </div>

        ${t.length===0?o`<div class="empty-state"><div class="empty-state-title">No members yet</div></div>`:o`
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>Email</th><th>Role</th><th>Joined</th><th></th></tr></thead>
                <tbody>
                  ${t.map(e=>o`
                    <tr>
                      <td style="font-weight:500">${e.email}</td>
                      <td>${this.roleBadge(e.role)}</td>
                      <td style="font-size:12px;color:var(--muted)">${new Date(e.joinedAt).toLocaleDateString()}</td>
                      <td>
                        ${e.role!=="owner"?o`<button class="btn btn-danger btn-sm" @click=${()=>this.removeMember(e.userId)}>Remove</button>`:""}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>`}

        ${this.showInvite?o`
          <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&(this.showInvite=!1)}}>
            <div class="modal">
              <div class="modal-title">Invite member</div>
              <form @submit=${this.invite} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Email</label>
                  <input class="input" type="email" required .value=${this.inviteEmail}
                    @input=${e=>{this.inviteEmail=e.target.value}}></div>
                <div class="field"><label class="label">Role</label>
                  <select class="select" @change=${e=>{this.inviteRole=e.target.value}}>
                    ${Bc.filter(e=>e!=="owner").map(e=>o`<option value=${e}>${e}</option>`)}
                  </select></div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${()=>this.showInvite=!1}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.inviting}>${this.inviting?"Inviting…":"Send invite"}</button>
                </div>
              </form>
            </div>
          </div>`:""}
      </div>
    `}renderSettings(){const t=ct()??"",e=this.subscription,s=this.usage,i=this.canManageBilling(),a=this.canManageSourceControl();return o`
      <div style="display:grid;gap:16px;max-width:680px">
        <div class="card" style="max-width:680px" data-workspace-section="settings">
          <div class="card-title" style="margin-bottom:16px">Default Claw</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:10px">
            Used when dashboard prompts scaffold a project and no project-specific claw is assigned.
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <select class="select" style="min-width:260px" .value=${this.defaultClawId==null?"":String(this.defaultClawId)} @change=${n=>{const r=n.target.value;this.defaultClawId=r?Number(r):null}}>
              <option value="">No default claw (WIP-only projects)</option>
              ${this.availableClaws.map(n=>o`<option value=${n.id}>${n.name} (${n.connectedAt?"online":"offline"})</option>`)}
            </select>
            <button class="btn btn-primary btn-sm" @click=${this.saveDefaultClaw} ?disabled=${this.savingDefaultClaw||!i}>
              ${this.savingDefaultClaw?"Saving…":"Save default claw"}
            </button>
          </div>
          ${i?"":o`<div style="font-size:12px;color:var(--muted);margin-top:8px">Only owner/manager can update default claw.</div>`}
        </div>

        <div class="card" style="max-width:680px" data-workspace-section="billing">
          <div class="card-title" style="margin-bottom:16px">coderClawLLM Plan</div>
          ${e?o`
            <div style="display:grid;gap:10px;margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">Current plan</span>
                <span style="color:var(--text-strong);font-weight:600">${e.effectivePlan==="pro"?"Pro":"Free"}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">Configured plan</span>
                <span style="color:var(--text-strong);font-weight:500">${e.plan}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">Billing status</span>
                <span style="color:var(--text-strong);font-weight:500">${e.billingStatus}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">Pro pricing</span>
                <span style="color:var(--text-strong);font-weight:500">$${e.pricing.pro.monthly}/mo or $${e.pricing.pro.yearly}/yr</span>
              </div>
            </div>

            ${i?o`
              <form @submit=${this.changePlanToPro} style="display:grid;gap:10px;margin-bottom:10px">
                <div style="font-size:12px;color:var(--muted)">Upgrade to Pro requires billing info. If billing is not active, workspace usage automatically falls back to Free.</div>
                <div class="field">
                  <label class="label">Billing cycle</label>
                  <select class="select" .value=${this.billingCycle} @change=${n=>{this.billingCycle=n.target.value}}>
                    <option value="monthly">Monthly ($${e.pricing.pro.monthly})</option>
                    <option value="yearly">Yearly ($${e.pricing.pro.yearly})</option>
                  </select>
                </div>
                <div class="field">
                  <label class="label">Billing email</label>
                  <input class="input" type="email" required .value=${this.billingEmail} @input=${n=>{this.billingEmail=n.target.value}} />
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                  <div class="field">
                    <label class="label">Card brand</label>
                    <input class="input" required .value=${this.billingBrand} @input=${n=>{this.billingBrand=n.target.value}} />
                  </div>
                  <div class="field">
                    <label class="label">Card last 4</label>
                    <input class="input" inputmode="numeric" pattern="[0-9]{4}" minlength="4" maxlength="4" required .value=${this.billingLast4} @input=${n=>{this.billingLast4=n.target.value.replace(/\D/g,"").slice(0,4)}} />
                  </div>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <button class="btn btn-primary btn-sm" type="submit" ?disabled=${this.updatingPlan}>${this.updatingPlan?"Updating…":"Activate Pro"}</button>
                  <button class="btn btn-secondary btn-sm" type="button" @click=${this.changePlanToFree} ?disabled=${this.updatingPlan}>Switch to Free</button>
                </div>
              </form>
            `:o`<div style="font-size:12px;color:var(--muted)">Only owner/manager can change billing or plan.</div>`}
          `:o`<div style="color:var(--muted);font-size:13px">Loading subscription…</div>`}
        </div>

        <div class="card" style="max-width:680px" data-workspace-section="consumption">
          <div class="card-title" style="margin-bottom:8px">coderClawLLM Consumption</div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
            <label style="font-size:12px;color:var(--muted)">Window</label>
            <select class="select" style="max-width:130px" @change=${n=>{this.usageDays=Number(n.target.value),this.load()}}>
              ${[7,14,30,60,90].map(n=>o`<option value="${n}" ?selected=${this.usageDays===n}>${n} days</option>`)}
            </select>
          </div>
          ${s?o`
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:10px">
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:11px;color:var(--muted)">Workspace requests</div>
                <div style="font-size:18px;font-weight:600">${s.totals.requests.toLocaleString()}</div>
              </div>
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:11px;color:var(--muted)">Workspace tokens</div>
                <div style="font-size:18px;font-weight:600">${s.totals.totalTokens.toLocaleString()}</div>
              </div>
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:11px;color:var(--muted)">Your requests</div>
                <div style="font-size:18px;font-weight:600">${s.mine.requests.toLocaleString()}</div>
              </div>
              <div style="border:1px solid var(--border);border-radius:8px;padding:10px">
                <div style="font-size:11px;color:var(--muted)">Your tokens</div>
                <div style="font-size:18px;font-weight:600">${s.mine.totalTokens.toLocaleString()}</div>
              </div>
            </div>
            <div style="font-size:12px;color:var(--muted)">Top model: ${s.byModel[0]?.model??"—"} · Product: ${s.byModel[0]?.llmProduct??"coderClawLLM"}</div>
          `:o`<div style="color:var(--muted);font-size:13px">Loading usage…</div>`}
        </div>

        <div class="card" style="max-width:680px" data-workspace-section="details">
          <div class="card-title" style="margin-bottom:16px">Workspace details</div>
          <div style="display:grid;gap:10px">
            ${[["Name",this.tenant?.name??"—"],["Slug",this.tenant?.slug??"—"],["Status",this.tenant?.status??"—"],["Your role",this.tenant?.role??"—"]].map(([n,r])=>o`
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">${n}</span>
                <span style="color:var(--text-strong);font-weight:500">${r}</span>
              </div>`)}
          </div>

          <div class="divider" style="margin:16px 0"></div>

          <div class="card-title" style="margin-bottom:8px">Tenant token (advanced)</div>
          <div style="font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:12px">
            This token grants tenant-scoped API access for your current workspace session. Share only with trusted tooling.
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
            <button class="btn btn-secondary btn-sm" @click=${()=>{this.showTenantToken=!this.showTenantToken}}>
              ${this.showTenantToken?"Hide token":"Show token"}
            </button>
            <button class="btn btn-primary btn-sm" @click=${this.copyTenantToken} ?disabled=${!t}>
              ${this.copiedTenantToken?"Copied!":"Copy token"}
            </button>
            <button class="btn btn-secondary btn-sm" @click=${this.copyPluginEnvTemplate} ?disabled=${!t}>
              ${this.copiedPluginEnv?"Env copied!":"Copy plugin env file"}
            </button>
            <button class="btn btn-secondary btn-sm" @click=${this.downloadPluginEnvTemplate} ?disabled=${!t}>
              ${this.downloadedPluginEnv?"Downloaded!":"Download .env file"}
            </button>
          </div>
          ${this.showTenantToken?o`<textarea class="textarea" readonly style="min-height:84px;font-family:var(--mono)">${t||"No tenant token found"}</textarea>`:o`<div style="font-size:12px;color:var(--muted);font-family:var(--mono)">${t?"••••••••••••••••••••••••••••":"No tenant token found"}</div>`}
        </div>

        <div class="card" style="max-width:680px" data-workspace-section="integrations">
          <div class="card-title" style="margin-bottom:8px">Source control integrations</div>
          <div style="font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:12px">
            Integrations are configured at workspace level and can be assigned to projects.
          </div>

          ${this.sourceControlLoading?o`<div style="color:var(--muted);font-size:13px">Loading integrations…</div>`:this.sourceControlIntegrations.length===0?o`<div style="font-size:12px;color:var(--muted);margin-bottom:10px">No integrations yet.</div>`:o`
                  <div style="display:grid;gap:8px;margin-bottom:12px">
                    ${this.sourceControlIntegrations.map(n=>o`
                      <div style="border:1px solid var(--border);border-radius:8px;padding:10px;display:grid;gap:6px">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                          <div style="font-size:13px;color:var(--text-strong);font-weight:600">${n.name}</div>
                          <span class="badge ${n.provider==="github"?"badge-blue":"badge-yellow"}">${n.provider}</span>
                          <span class="badge ${n.isActive?"badge-green":"badge-gray"}">${n.isActive?"active":"inactive"}</span>
                        </div>
                        <div style="font-size:12px;color:var(--muted)">${n.accountIdentifier}${n.hostUrl?` · ${n.hostUrl}`:""}</div>
                        ${a?o`
                              <div style="display:flex;gap:8px;flex-wrap:wrap">
                                ${n.isActive?o`<button class="btn btn-secondary btn-sm" @click=${()=>{this.setIntegrationActive(n,!1)}}>Deactivate</button>`:o`<button class="btn btn-secondary btn-sm" @click=${()=>{this.setIntegrationActive(n,!0)}}>Activate</button>`}
                                <button class="btn btn-danger btn-sm" @click=${()=>{this.deleteSourceControlIntegration(n)}}>Delete</button>
                              </div>
                            `:""}
                      </div>
                    `)}
                  </div>
                `}

          ${a?o`
                <form @submit=${this.createSourceControlIntegration} style="display:grid;gap:10px">
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                    <div class="field">
                      <label class="label">Provider</label>
                      <select class="select" .value=${this.sourceControlForm.provider} @change=${n=>{this.sourceControlForm={...this.sourceControlForm,provider:n.target.value}}}>
                        <option value="github">GitHub</option>
                        <option value="bitbucket">Bitbucket</option>
                      </select>
                    </div>
                    <div class="field">
                      <label class="label">Name</label>
                      <input class="input" placeholder="Primary GitHub" .value=${this.sourceControlForm.name} @input=${n=>{this.sourceControlForm={...this.sourceControlForm,name:n.target.value}}} />
                    </div>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                    <div class="field">
                      <label class="label">Account / Workspace</label>
                      <input class="input" placeholder="acme-org" .value=${this.sourceControlForm.accountIdentifier} @input=${n=>{this.sourceControlForm={...this.sourceControlForm,accountIdentifier:n.target.value}}} />
                    </div>
                    <div class="field">
                      <label class="label">Host URL <span class="label-hint">(optional)</span></label>
                      <input class="input" placeholder="https://bitbucket.org" .value=${this.sourceControlForm.hostUrl} @input=${n=>{this.sourceControlForm={...this.sourceControlForm,hostUrl:n.target.value}}} />
                    </div>
                  </div>
                  <div style="display:flex;justify-content:flex-end">
                    <button class="btn btn-primary btn-sm" type="submit" ?disabled=${this.sourceControlSaving||!this.sourceControlForm.name.trim()||!this.sourceControlForm.accountIdentifier.trim()}>
                      ${this.sourceControlSaving?"Saving…":"Add integration"}
                    </button>
                  </div>
                </form>
              `:o`<div style="font-size:12px;color:var(--muted)">Only owner/manager can manage integrations.</div>`}
        </div>

        <div class="card" style="max-width:680px" data-workspace-section="security">
          <div class="card-title" style="margin-bottom:8px">Security management</div>
          <div style="font-size:12px;color:var(--muted);line-height:1.5">
            MFA, recovery codes, active session revocation, and JWT token revocation are managed from
            <strong>SuperAdmin → Admin → Security</strong> with tenant-level targeting.
          </div>
          <div style="margin-top:10px">
            <button
              class="btn btn-secondary btn-sm"
              @click=${()=>this.dispatchEvent(new CustomEvent("ccl:open-admin-security",{bubbles:!0,composed:!0}))}
            >Open Security Center</button>
          </div>
        </div>

      </div>
    `}};L([j({type:Object})],M.prototype,"tenant",2);L([j({type:String})],M.prototype,"initialTab",2);L([j({type:String})],M.prototype,"initialSection",2);L([c()],M.prototype,"detail",2);L([c()],M.prototype,"loading",2);L([c()],M.prototype,"error",2);L([c()],M.prototype,"tab",2);L([c()],M.prototype,"subscription",2);L([c()],M.prototype,"usage",2);L([c()],M.prototype,"usageDays",2);L([c()],M.prototype,"availableClaws",2);L([c()],M.prototype,"defaultClawId",2);L([c()],M.prototype,"savingDefaultClaw",2);L([c()],M.prototype,"updatingPlan",2);L([c()],M.prototype,"billingCycle",2);L([c()],M.prototype,"billingEmail",2);L([c()],M.prototype,"billingBrand",2);L([c()],M.prototype,"billingLast4",2);L([c()],M.prototype,"showTenantToken",2);L([c()],M.prototype,"copiedTenantToken",2);L([c()],M.prototype,"copiedPluginEnv",2);L([c()],M.prototype,"downloadedPluginEnv",2);L([c()],M.prototype,"mfaStatus",2);L([c()],M.prototype,"mfaSetupBusy",2);L([c()],M.prototype,"mfaEnableBusy",2);L([c()],M.prototype,"mfaDisableBusy",2);L([c()],M.prototype,"mfaRegenerateBusy",2);L([c()],M.prototype,"mfaVerifyCode",2);L([c()],M.prototype,"mfaRecoveryInput",2);L([c()],M.prototype,"mfaMode",2);L([c()],M.prototype,"mfaManualKey",2);L([c()],M.prototype,"mfaQrDataUrl",2);L([c()],M.prototype,"recoveryCodes",2);L([c()],M.prototype,"authSessions",2);L([c()],M.prototype,"authTokens",2);L([c()],M.prototype,"loadingSecurity",2);L([c()],M.prototype,"pendingSection",2);L([c()],M.prototype,"sourceControlIntegrations",2);L([c()],M.prototype,"sourceControlLoading",2);L([c()],M.prototype,"sourceControlSaving",2);L([c()],M.prototype,"sourceControlForm",2);L([c()],M.prototype,"showInvite",2);L([c()],M.prototype,"inviteEmail",2);L([c()],M.prototype,"inviteRole",2);L([c()],M.prototype,"inviting",2);M=L([Q("ccl-workspace")],M);var zc=Object.defineProperty,Fc=Object.getOwnPropertyDescriptor,re=(t,e,s,i)=>{for(var a=i>1?void 0:i?Fc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&zc(e,s,a),a};let Vt=class extends K{constructor(){super(...arguments),this.tenantId="",this.items=[],this.tasks=[],this.loading=!0,this.error="",this.filterTask="",this.filterStatus="",this.expanded=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.tasks]=await Promise.all([ia.list(),ot.list().catch(()=>[])])}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){return this.items.filter(t=>!(this.filterTask&&t.taskId!==this.filterTask||this.filterStatus&&t.status!==this.filterStatus))}taskTitle(t){return this.tasks.find(e=>e.id===t)?.title??t}statusColor(t){return{completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"}[t]??"badge-gray"}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered();return o`
      <div class="page-header">
        <div>
          <div class="page-title">Execution Logs</div>
          <div class="page-sub">${t.length} execution${t.length!==1?"s":""}</div>
        </div>
        <button class="btn btn-secondary" @click=${this.load}>Refresh</button>
      </div>

      ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

      <div class="filters" style="margin-bottom:16px">
        <select class="select" style="max-width:220px;height:32px;padding:4px 10px"
          @change=${e=>{this.filterTask=e.target.value}}>
          <option value="">All tasks</option>
          ${this.tasks.map(e=>o`<option value=${e.id}>${e.title}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${e=>{this.filterStatus=e.target.value}}>
          <option value="">All statuses</option>
          ${["pending","running","completed","failed","cancelled"].map(e=>o`<option value=${e}>${e}</option>`)}
        </select>
      </div>

      ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:t.length===0?o`<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">No executions found</div></div>`:o`
            <div style="display:grid;gap:8px">
              ${t.slice().reverse().map(e=>o`
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
                  ${this.expanded===e.id&&e.result?o`
                    <div class="log-wrap" style="margin-top:12px;max-height:200px;overflow-y:auto;font-size:11px">
                      ${e.result}
                    </div>`:""}
                </div>
              `)}
            </div>`}
    `}};re([j()],Vt.prototype,"tenantId",2);re([c()],Vt.prototype,"items",2);re([c()],Vt.prototype,"tasks",2);re([c()],Vt.prototype,"loading",2);re([c()],Vt.prototype,"error",2);re([c()],Vt.prototype,"filterTask",2);re([c()],Vt.prototype,"filterStatus",2);re([c()],Vt.prototype,"expanded",2);Vt=re([Q("ccl-logs")],Vt);var qc=Object.defineProperty,Wc=Object.getOwnPropertyDescriptor,z=(t,e,s,i)=>{for(var a=i>1?void 0:i?Wc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&qc(e,s,a),a};let B=class extends K{constructor(){super(...arguments),this.initialTab="security",this.tab="health",this.health=null,this.users=[],this.tenants=[],this.errors=[],this.llmUsage=null,this.usageDays=30,this.loading=!1,this.errorMsg="",this.showAdminToken=!1,this.llmPoolTab="coderClawLLM",this.copiedAdminToken=!1,this.copiedAdminEnv=!1,this.downloadedAdminEnv=!1,this.impersonateUserId=null,this.impersonateTenants=[],this.expandedErrorId=null,this.securityTenantId=null,this.securityUsers=[],this.securityUserId=null,this.securityUserEmail="",this.securityMfaStatus=null,this.securitySessions=[],this.securityTokens=[],this.securityLoading=!1,this.securityMfaSetupBusy=!1,this.securityMfaEnableBusy=!1,this.securityMfaDisableBusy=!1,this.securityMfaRegenerateBusy=!1,this.securityMfaMode="totp",this.securityMfaCode="",this.securityRecoveryCode="",this.securityMfaManualKey="",this.securityMfaQrDataUrl="",this.securityRecoveryCodes=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTab(this.initialTab??"security")}async loadTab(t){this.tab=t,this.loading=!0,this.errorMsg="";try{if(t==="health")this.health=await rt.health();else if(t==="users")this.users=await rt.users();else if(t==="tenants")this.tenants=await rt.tenants();else if(t==="errors")this.errors=await rt.errors();else if(t==="usage")this.llmUsage=await rt.llmUsage(this.usageDays);else if(t==="billing"){const[e,s]=await Promise.all([rt.tenants(),rt.errors()]);this.tenants=e,this.errors=s}else t==="security"&&await this.loadSecurityContext()}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}finally{this.loading=!1}}async loadSecurityContext(){this.securityLoading=!0;try{this.tenants.length||(this.tenants=await rt.tenants()),!this.securityTenantId&&this.tenants.length&&(this.securityTenantId=this.tenants[0].id),await this.reloadSecurityUsers(),this.securityTenantId&&this.securityUserId&&await this.reloadSecurityDetails()}finally{this.securityLoading=!1}}async reloadSecurityUsers(){if(!this.securityTenantId){this.securityUsers=[],this.securityUserId=null;return}if(this.securityUsers=await rt.securityUsers(this.securityTenantId),!this.securityUsers.length){this.securityUserId=null,this.securityUserEmail="",this.securityMfaStatus=null,this.securitySessions=[],this.securityTokens=[];return}(!this.securityUserId||!this.securityUsers.some(t=>t.id===this.securityUserId))&&(this.securityUserId=this.securityUsers[0].id)}async reloadSecurityDetails(){if(!this.securityTenantId||!this.securityUserId)return;const t=await rt.securityDetails(this.securityTenantId,this.securityUserId);this.securityUserEmail=t.user.email,this.securityMfaStatus=t.mfa,this.securitySessions=t.sessions,this.securityTokens=t.tokens}async startImpersonate(t){this.tenants.length||(this.tenants=await rt.tenants()),this.impersonateUserId=t,this.impersonateTenants=this.tenants}async doImpersonate(t){if(this.impersonateUserId)try{const e=await rt.impersonate(this.impersonateUserId,t);Ls(e.token),Ns(String(t)),this.impersonateUserId=null,this.dispatchEvent(new CustomEvent("ccl:impersonate",{bubbles:!0,composed:!0,detail:{tenantId:t}}))}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}}fmtCooldown(t){const e=Math.max(0,Math.ceil((t-Date.now())/1e3));return e>=60?`${Math.ceil(e/60)}m`:`${e}s`}fmtDate(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}fmtDateTime(t){return new Date(t).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}async copyAdminToken(){const t=Zt();if(!t){this.errorMsg="No superadmin web token found for this session.";return}try{await navigator.clipboard.writeText(t),this.copiedAdminToken=!0,setTimeout(()=>{this.copiedAdminToken=!1},2e3)}catch(e){this.errorMsg=e.message}}buildSuperadminEnvTemplate(){const t=Zt()??"";return[`CODERCLAW_LINK_URL=${(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,"")}`,`CODERCLAW_LINK_WEB_TOKEN=${t}`,"CODERCLAW_LINK_TENANT_TOKEN=","CODERCLAW_LINK_CLAW_NAME=openclaw-superadmin-node","CODERCLAW_LINK_CLAW_ID=","CODERCLAW_LINK_API_KEY=","OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copySuperadminEnvTemplate(){if(!Zt()){this.errorMsg="No superadmin web token found for this session.";return}try{await navigator.clipboard.writeText(this.buildSuperadminEnvTemplate()),this.copiedAdminEnv=!0,setTimeout(()=>{this.copiedAdminEnv=!1},2e3)}catch(e){this.errorMsg=e.message}}downloadSuperadminEnvTemplate(){if(!Zt()){this.errorMsg="No superadmin web token found for this session.";return}try{const e=this.buildSuperadminEnvTemplate(),s=new Blob([`${e}
`],{type:"text/plain;charset=utf-8"}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download="coderclawlink.superadmin.env",a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i),this.downloadedAdminEnv=!0,setTimeout(()=>{this.downloadedAdminEnv=!1},2e3)}catch(e){this.errorMsg=e.message}}render(){return o`
      <div class="admin-shell">
        <!-- Header -->
        <div class="admin-header">
          <div class="admin-header-left">
            <span class="admin-badge">Platform Admin</span>
            <h1 class="admin-title">CoderClawLink Admin</h1>
          </div>
          <button class="btn btn-ghost btn-sm" @click=${()=>this.dispatchEvent(new CustomEvent("ccl:exit-admin",{bubbles:!0,composed:!0}))}>
            ← Back to Workspace
          </button>
        </div>

        <!-- Tabs -->
        <nav class="admin-tabs">
          ${["health","billing","usage","users","tenants","security","errors"].map(t=>o`
            <button
              class="admin-tab ${this.tab===t?"active":""}"
              @click=${()=>this.loadTab(t)}
            >${t.charAt(0).toUpperCase()+t.slice(1)}</button>
          `)}
        </nav>

        <!-- Error banner -->
        ${this.errorMsg?o`<div class="alert alert-error">${this.errorMsg}</div>`:""}

        <!-- Content -->
        <div class="admin-content">
          ${this.loading?o`<div class="loading-state">Loading…</div>`:this.renderTab()}
        </div>

        <!-- Impersonate modal -->
        ${this.impersonateUserId?this.renderImpersonateModal():""}
      </div>
    `}renderTab(){return this.tab==="health"?this.renderHealth():this.tab==="billing"?this.renderBilling():this.tab==="usage"?this.renderUsage():this.tab==="users"?this.renderUsers():this.tab==="tenants"?this.renderTenants():this.tab==="security"?this.renderSecurity():this.tab==="errors"?this.renderErrors():o``}composeMailto(t,e,s){const i=new URLSearchParams({subject:e,body:s});return`mailto:${encodeURIComponent(t)}?${i.toString()}`}renderBilling(){const t=this.tenants.filter(g=>g.billingStatus==="active"&&g.effectivePlan==="pro"),e=this.tenants.filter(g=>g.billingStatus==="past_due"),s=this.tenants.filter(g=>g.billingStatus==="pending"),i=this.tenants.filter(g=>g.effectivePlan==="free"),a=this.tenants.filter(g=>["active","past_due","pending"].includes(g.billingStatus)),n=this.errors.slice(0,20),r="CoderClaw billing invoice",d=`Hi team,

Your latest CoderClaw invoice is ready. Reply to this email if you need a detailed line-item breakdown.

Thanks,
CoderClaw Billing`,l="Action needed: billing update for your CoderClaw workspace",u=`Hi team,

We noticed your workspace billing needs attention. Please update payment details to keep Pro features active.

Thanks,
CoderClaw Billing`,p="Unlock CoderClaw Pro for your workspace",m=`Hi team,

Your workspace is on Free. Upgrade to Pro for higher limits, stronger model access, and priority performance.

Reply if you want a quick recommendation for the best plan.

Thanks,
CoderClaw Team`;return o`
      <div class="billing-crm-grid">
        <div class="health-card">
          <div class="health-label">Paid Workspaces</div>
          <div class="health-value">${t.length}</div>
          <div class="health-sub">Income-driving active subscriptions</div>
        </div>
        <div class="health-card ${e.length?"health-warn":""}">
          <div class="health-label">Past Due</div>
          <div class="health-value">${e.length}</div>
          <div class="health-sub">Need payment follow-up</div>
        </div>
        <div class="health-card ${s.length?"health-warn":""}">
          <div class="health-label">Pending Billing</div>
          <div class="health-value">${s.length}</div>
          <div class="health-sub">Pending payment activation</div>
        </div>
        <div class="health-card">
          <div class="health-label">Upgrade Leads</div>
          <div class="health-value">${i.length}</div>
          <div class="health-sub">Free workspaces to nurture</div>
        </div>
      </div>

      <div class="table-header" style="margin-top:22px">
        <span class="table-count">Invoice queue (${a.length})</span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("billing")}>↻ Refresh</button>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Workspace</th>
              <th>Plan</th>
              <th>Billing</th>
              <th>Billing Email</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${a.map(g=>o`
              <tr>
                <td>${g.name}</td>
                <td>
                  <span class="badge ${g.effectivePlan==="pro"?"badge-success":"badge-neutral"}">
                    ${g.effectivePlan}
                  </span>
                </td>
                <td class="text-muted">${g.billingStatus}</td>
                <td class="text-muted">${g.billingEmail??"—"}</td>
                <td class="text-muted">${g.billingUpdatedAt?this.fmtDateTime(g.billingUpdatedAt):"—"}</td>
                <td class="billing-actions-cell">
                  ${g.billingEmail?o`
                    <a
                      class="btn btn-ghost btn-xs"
                      href=${this.composeMailto(g.billingEmail,r,d)}
                    >Send invoice</a>
                    <a
                      class="btn btn-ghost btn-xs"
                      href=${this.composeMailto(g.billingEmail,l,u)}
                    >Payment reminder</a>
                  `:o`<span class="text-muted" style="font-size:12px">No billing email</span>`}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>

      <div class="table-header" style="margin-top:22px">
        <span class="table-count">Upgrade communications (${i.length})</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Workspace</th>
              <th>Status</th>
              <th>Members</th>
              <th>Claws</th>
              <th>Billing Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${i.slice(0,200).map(g=>o`
              <tr>
                <td>${g.name}</td>
                <td><span class="badge badge-neutral">${g.status}</span></td>
                <td>${g.memberCount}</td>
                <td>${g.clawCount}</td>
                <td class="text-muted">${g.billingEmail??"—"}</td>
                <td>
                  ${g.billingEmail?o`<a class="btn btn-ghost btn-xs" href=${this.composeMailto(g.billingEmail,p,m)}>Send upgrade message</a>`:o`<span class="text-muted" style="font-size:12px">No email on file</span>`}
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>

      <div class="table-header" style="margin-top:22px">
        <span class="table-count">Feedback & issues (${n.length})</span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("errors")}>Open full error log</button>
      </div>
      <div class="error-log">
        ${n.length===0?o`<div class="empty-state" style="padding:24px 0"><div class="empty-sub">No feedback/issues captured yet.</div></div>`:n.map(g=>o`
            <div class="error-entry">
              <div class="error-entry-header">
                <span class="error-method">${g.method??"N/A"}</span>
                <span class="error-path">${g.path??"Unknown path"}</span>
                <span class="error-msg">${g.message??"No message"}</span>
                <span class="error-time text-muted">${this.fmtDateTime(g.createdAt)}</span>
                <span class="error-chevron">•</span>
              </div>
            </div>
          `)}
      </div>
    `}renderHealth(){const t=this.health,e=Zt()??"";if(!t)return o`<div class="loading-state">No data</div>`;const s=t.llm.models.filter(n=>n.model.toLowerCase().includes(":free")),i=t.llm.models.filter(n=>!n.model.toLowerCase().includes(":free")),a=this.llmPoolTab==="coderClawLLM"?s:i;return o`
      <div class="health-grid">
        <!-- Status card -->
        <div class="health-card ${t.status==="ok"?"health-ok":"health-degraded"}">
          <div class="health-label">System Status</div>
          <div class="health-value">${t.status.toUpperCase()}</div>
          <div class="health-sub">${t.timestamp?this.fmtDateTime(t.timestamp):""}</div>
        </div>

        <!-- DB card -->
        <div class="health-card ${t.db.ok?"health-ok":"health-degraded"}">
          <div class="health-label">Database</div>
          <div class="health-value">${t.db.ok?"Connected":"Error"}</div>
          <div class="health-sub">${t.db.latencyMs}ms latency</div>
        </div>

        <!-- Platform counts -->
        <div class="health-card">
          <div class="health-label">Users</div>
          <div class="health-value">${t.platform.userCount}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Workspaces</div>
          <div class="health-value">${t.platform.tenantCount}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Paid Workspaces</div>
          <div class="health-value">${t.platform.paidTenantCount}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Claws</div>
          <div class="health-value">${t.platform.clawCount}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Executions</div>
          <div class="health-value">${t.platform.executionCount}</div>
        </div>
        <div class="health-card ${t.platform.errorCount>0?"health-warn":""}">
          <div class="health-label">Error Log</div>
          <div class="health-value">${t.platform.errorCount}</div>
          ${t.platform.errorCount>0?o`<div class="health-sub"><button class="btn btn-ghost btn-xs" @click=${()=>this.loadTab("errors")}>View errors →</button></div>`:""}
        </div>

        <!-- LLM pool -->
        <div class="health-card health-wide">
          <div class="health-label">LLM Model Pool (${t.llm.pool} models)</div>
          <div class="model-pool-tabs">
            <button
              class="model-pool-tab ${this.llmPoolTab==="coderClawLLM"?"active":""}"
              @click=${()=>{this.llmPoolTab="coderClawLLM"}}
            >
              coderClawLLM (${s.length})
            </button>
            <button
              class="model-pool-tab ${this.llmPoolTab==="coderClawLLMPro"?"active":""}"
              @click=${()=>{this.llmPoolTab="coderClawLLMPro"}}
            >
              coderClawLLMPro (${i.length})
            </button>
          </div>
          <div class="model-list">
            ${a.map(n=>{const r=n.available?"background:var(--success-bg,#d1fae5);color:var(--success-text,#065f46);border-color:var(--success-border,#6ee7b7)":"background:var(--error-bg,#fee2e2);color:var(--error-text,#991b1b);border-color:var(--error-border,#fca5a5)",d=n.available?"available":`cooldown ${this.fmtCooldown(n.cooldownUntil??0)}`,l=`${n.preferred?"★ ":""}${n.model} · ${d}`,u=n.available?`${n.preferred?"Preferred (round-robin). ":"Fallback. "}Available`:`On cooldown — available in ${this.fmtCooldown(n.cooldownUntil??0)}`;return o`<span class="model-chip" style="${r}" title="${u}">${l}</span>`})}
          </div>
          ${a.length===0?o`
            <div class="health-sub">No models in this pool.</div>
          `:""}
          <div style="margin-top:8px;font-size:11px;color:var(--text-muted,#6b7280)">
            ★ preferred (round-robin) · green = available · red = on cooldown
          </div>
        </div>
      </div>

      <div class="admin-refresh">
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("health")}>↻ Refresh</button>
      </div>

      <div class="card" style="max-width:680px;margin-top:24px">
        <div class="card-title" style="margin-bottom:8px">Superadmin token (advanced)</div>
        <div style="font-size:12px;color:var(--text-muted,#6b7280);line-height:1.5;margin-bottom:12px">
          This web token grants superadmin API access for your current session. Share only with trusted tooling.
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <button class="btn btn-secondary btn-sm" @click=${()=>{this.showAdminToken=!this.showAdminToken}}>
            ${this.showAdminToken?"Hide token":"Show token"}
          </button>
          <button class="btn btn-primary btn-sm" @click=${this.copyAdminToken} ?disabled=${!e}>
            ${this.copiedAdminToken?"Copied!":"Copy token"}
          </button>
          <button class="btn btn-secondary btn-sm" @click=${this.copySuperadminEnvTemplate} ?disabled=${!e}>
            ${this.copiedAdminEnv?"Env copied!":"Copy plugin env file"}
          </button>
          <button class="btn btn-secondary btn-sm" @click=${this.downloadSuperadminEnvTemplate} ?disabled=${!e}>
            ${this.downloadedAdminEnv?"Downloaded!":"Download .env file"}
          </button>
        </div>
        ${this.showAdminToken?o`<textarea class="textarea" readonly style="min-height:84px;font-family:var(--mono)">${e||"No superadmin web token found"}</textarea>`:o`<div style="font-size:12px;color:var(--text-muted,#6b7280);font-family:var(--mono)">${e?"••••••••••••••••••••••••••••":"No superadmin web token found"}</div>`}
      </div>
    `}fmtNum(t){return Number(t).toLocaleString()}renderUsage(){const t=this.llmUsage;return t?o`
      <!-- Totals -->
      <div class="health-grid" style="margin-bottom:24px">
        <div class="health-card">
          <div class="health-label">Total Requests</div>
          <div class="health-value">${this.fmtNum(t.totals.requests)}</div>
          <div class="health-sub">all time</div>
        </div>
        <div class="health-card">
          <div class="health-label">Total Tokens</div>
          <div class="health-value">${this.fmtNum(t.totals.totalTokens)}</div>
          <div class="health-sub">all time</div>
        </div>
        <div class="health-card">
          <div class="health-label">Prompt Tokens</div>
          <div class="health-value">${this.fmtNum(t.totals.promptTokens)}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Completion Tokens</div>
          <div class="health-value">${this.fmtNum(t.totals.completionTokens)}</div>
        </div>
        <div class="health-card">
          <div class="health-label">Models Used</div>
          <div class="health-value">${t.totals.modelCount}</div>
          <div class="health-sub">of ${t.byModel.length>0?t.byModel.length:"—"} tracked</div>
        </div>
        <div class="health-card">
          <div class="health-label">Spend</div>
          <div class="health-value">$0</div>
          <div class="health-sub">free tier</div>
        </div>
      </div>

      <!-- Per-model table -->
      <div class="table-header">
        <span class="table-count">By model — last
          <select class="usage-days-select" @change=${e=>{this.usageDays=Number(e.target.value),this.loadTab("usage")}}>
            ${[7,14,30,60,90].map(e=>o`
              <option value="${e}" ?selected=${this.usageDays===e}>${e} days</option>
            `)}
          </select>
        </span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("usage")}>↻ Refresh</button>
      </div>

      ${t.byModel.length===0?o`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-title">No LLM usage recorded yet</div>
          <div class="empty-sub">Usage will appear here once requests flow through the proxy.</div>
        </div>
      `:o`
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Model</th>
                <th style="text-align:right">Requests</th>
                <th style="text-align:right">Prompt Tokens</th>
                <th style="text-align:right">Completion Tokens</th>
                <th style="text-align:right">Total Tokens</th>
                <th style="text-align:right">Retries</th>
                <th style="text-align:right">Streamed</th>
              </tr>
            </thead>
            <tbody>
              ${t.byModel.map(e=>o`
                <tr>
                  <td>
                    <span class="model-chip" style="font-size:12px">${e.model}</span>
                  </td>
                  <td style="text-align:right">${this.fmtNum(e.requests)}</td>
                  <td style="text-align:right text-muted">${this.fmtNum(e.prompt_tokens)}</td>
                  <td style="text-align:right">${this.fmtNum(e.completion_tokens)}</td>
                  <td style="text-align:right font-weight:600">${this.fmtNum(e.total_tokens)}</td>
                  <td style="text-align:right">${e.retries}</td>
                  <td style="text-align:right">${this.fmtNum(e.streamed_requests)}</td>
                </tr>
              `)}
            </tbody>
            <tfoot>
              <tr style="font-weight:600;border-top:2px solid var(--border)">
                <td>Total</td>
                <td style="text-align:right">${this.fmtNum(t.byModel.reduce((e,s)=>e+s.requests,0))}</td>
                <td style="text-align:right">${this.fmtNum(t.byModel.reduce((e,s)=>e+Number(s.prompt_tokens),0))}</td>
                <td style="text-align:right">${this.fmtNum(t.byModel.reduce((e,s)=>e+Number(s.completion_tokens),0))}</td>
                <td style="text-align:right">${this.fmtNum(t.byModel.reduce((e,s)=>e+Number(s.total_tokens),0))}</td>
                <td style="text-align:right">${t.byModel.reduce((e,s)=>e+s.retries,0)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Daily bar chart (CSS-only) -->
        ${t.daily.length>0?o`
          <div style="margin-top:24px">
            <div class="table-header"><span class="table-count">Daily requests — last ${t.days} days</span></div>
            <div class="usage-bars">
              ${(()=>{const e=Math.max(...t.daily.map(s=>s.requests),1);return t.daily.map(s=>o`
                  <div class="usage-bar-col" title="${s.day}: ${this.fmtNum(s.requests)} requests, ${this.fmtNum(s.total_tokens)} tokens">
                    <div class="usage-bar" style="height:${Math.max(4,Math.round(s.requests/e*80))}px"></div>
                    <div class="usage-bar-label">${s.day.slice(5)}</div>
                  </div>
                `)})()}
            </div>
          </div>
        `:""}

        <!-- Failover breakdown -->
        ${t.failovers.length>0?o`
          <div style="margin-top:24px">
            <div class="table-header">
              <span class="table-count">Failovers — last ${t.days} days</span>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th style="text-align:right">HTTP Code</th>
                    <th style="text-align:right">Count</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  ${t.failovers.map(e=>o`
                    <tr>
                      <td><span class="model-chip" style="font-size:12px">${e.model}</span></td>
                      <td style="text-align:right">
                        ${e.errorCode===0?o`<span class="badge badge-neutral">body</span>`:o`<span class="badge badge-danger">${e.errorCode}</span>`}
                      </td>
                      <td style="text-align:right;font-weight:600">${this.fmtNum(e.count)}</td>
                      <td class="text-muted" style="font-size:12px">
                        ${e.errorCode===0?"Provider error in response body":e.errorCode===429?"Rate limited":e.errorCode===402?"Spend limit reached":e.errorCode===503?"Model unavailable":e.errorCode===420?"Rate limited (420)":`HTTP ${e.errorCode}`}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          </div>
        `:o`
          <div style="margin-top:24px;color:var(--text-muted,#6b7280);font-size:13px">
            No failover events in the last ${t.days} days.
          </div>
        `}
      `}
    `:o`<div class="loading-state">No data</div>`}renderUsers(){return o`
      <div class="table-header">
        <span class="table-count">${this.users.length} users</span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("users")}>↻ Refresh</button>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Workspaces</th>
              <th>Joined</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${this.users.map(t=>o`
              <tr>
                <td>${t.email}</td>
                <td class="text-muted">${t.username??"—"}</td>
                <td>${t.tenantCount}</td>
                <td class="text-muted">${this.fmtDate(t.createdAt)}</td>
                <td>
                  ${t.isSuperadmin?o`<span class="badge badge-danger">superadmin</span>`:o`<span class="badge badge-neutral">user</span>`}
                </td>
                <td>
                  <button class="btn btn-ghost btn-xs" @click=${()=>this.startImpersonate(t.id)}
                    title="Impersonate this user">
                    Impersonate
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}renderTenants(){return o`
      <div class="table-header">
        <span class="table-count">${this.tenants.length} workspaces</span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("tenants")}>↻ Refresh</button>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Plan</th>
              <th>Billing</th>
              <th>Members</th>
              <th>Claws</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            ${this.tenants.map(t=>o`
              <tr>
                <td>${t.name}</td>
                <td class="text-muted">${t.slug}</td>
                <td>
                  <span class="badge ${t.status==="active"?"badge-success":"badge-neutral"}">
                    ${t.status}
                  </span>
                </td>
                <td>
                  <span class="badge ${t.effectivePlan==="pro"?"badge-danger":"badge-neutral"}">
                    ${t.effectivePlan}
                  </span>
                </td>
                <td class="text-muted">${t.billingStatus}</td>
                <td>${t.memberCount}</td>
                <td>${t.clawCount}</td>
                <td class="text-muted">${this.fmtDate(t.createdAt)}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}async onSecurityTenantChange(t){this.securityTenantId=Number(t.target.value),this.securityUserId=null,this.securityMfaQrDataUrl="",this.securityMfaManualKey="",this.securityRecoveryCodes=[];try{await this.reloadSecurityUsers(),await this.reloadSecurityDetails()}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}}async onSecurityUserChange(t){this.securityUserId=t.target.value,this.securityMfaQrDataUrl="",this.securityMfaManualKey="",this.securityRecoveryCodes=[];try{await this.reloadSecurityDetails()}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}}async startSecurityMfaSetup(){if(!(!this.securityTenantId||!this.securityUserId)){this.securityMfaSetupBusy=!0,this.errorMsg="";try{const t=await rt.securityMfaSetup(this.securityTenantId,this.securityUserId);this.securityMfaManualKey=t.manualEntryKey,this.securityMfaQrDataUrl=await kr.toDataURL(t.otpauthUrl,{width:220,margin:1}),this.securityRecoveryCodes=[],await this.reloadSecurityDetails()}catch(t){this.errorMsg=t instanceof Error?t.message:String(t)}finally{this.securityMfaSetupBusy=!1}}}async enableSecurityMfa(){if(!(!this.securityTenantId||!this.securityUserId||!this.securityMfaCode.trim())){this.securityMfaEnableBusy=!0,this.errorMsg="";try{const t=await rt.securityMfaEnable(this.securityTenantId,this.securityUserId,this.securityMfaCode.trim());this.securityRecoveryCodes=t.recoveryCodes,this.securityMfaCode="",this.securityMfaQrDataUrl="",this.securityMfaManualKey="",await this.reloadSecurityDetails(),await this.reloadSecurityUsers()}catch(t){this.errorMsg=t instanceof Error?t.message:String(t)}finally{this.securityMfaEnableBusy=!1}}}async disableSecurityMfa(){if(!(!this.securityTenantId||!this.securityUserId)&&!(this.securityMfaMode==="totp"&&!this.securityMfaCode.trim())&&!(this.securityMfaMode==="recovery"&&!this.securityRecoveryCode.trim())){this.securityMfaDisableBusy=!0,this.errorMsg="";try{await rt.securityMfaDisable(this.securityTenantId,this.securityUserId,{code:this.securityMfaMode==="totp"?this.securityMfaCode.trim():void 0,recoveryCode:this.securityMfaMode==="recovery"?this.securityRecoveryCode.trim():void 0}),this.securityMfaCode="",this.securityRecoveryCode="",this.securityRecoveryCodes=[],await this.reloadSecurityDetails(),await this.reloadSecurityUsers()}catch(t){this.errorMsg=t instanceof Error?t.message:String(t)}finally{this.securityMfaDisableBusy=!1}}}async regenerateSecurityRecoveryCodes(){if(!(!this.securityTenantId||!this.securityUserId)&&!(this.securityMfaMode==="totp"&&!this.securityMfaCode.trim())&&!(this.securityMfaMode==="recovery"&&!this.securityRecoveryCode.trim())){this.securityMfaRegenerateBusy=!0,this.errorMsg="";try{const t=await rt.securityRegenerateRecoveryCodes(this.securityTenantId,this.securityUserId,{code:this.securityMfaMode==="totp"?this.securityMfaCode.trim():void 0,recoveryCode:this.securityMfaMode==="recovery"?this.securityRecoveryCode.trim():void 0});this.securityRecoveryCodes=t.recoveryCodes,this.securityMfaCode="",this.securityRecoveryCode="",await this.reloadSecurityDetails()}catch(t){this.errorMsg=t instanceof Error?t.message:String(t)}finally{this.securityMfaRegenerateBusy=!1}}}downloadSecurityRecoveryCodes(){if(!this.securityRecoveryCodes.length)return;const t=this.securityRecoveryCodes.join(`
`),e=new Blob([`${t}
`],{type:"text/plain;charset=utf-8"}),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download=`recovery-codes-${this.securityUserEmail||"user"}.txt`,i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s)}async revokeSecuritySession(t){if(!(!this.securityTenantId||!this.securityUserId)&&confirm("Revoke this session and sign out the device?"))try{await rt.securityRevokeSession(this.securityTenantId,this.securityUserId,t),await this.reloadSecurityDetails(),await this.reloadSecurityUsers()}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}}async revokeAllSecuritySessions(){if(!(!this.securityTenantId||!this.securityUserId)&&confirm("Revoke all sessions for this user?"))try{await rt.securityRevokeAllSessions(this.securityTenantId,this.securityUserId),await this.reloadSecurityDetails(),await this.reloadSecurityUsers()}catch(t){this.errorMsg=t instanceof Error?t.message:String(t)}}async revokeSecurityToken(t){if(!(!this.securityTenantId||!this.securityUserId)&&confirm("Revoke this token?"))try{await rt.securityRevokeToken(this.securityTenantId,this.securityUserId,t),await this.reloadSecurityDetails(),await this.reloadSecurityUsers()}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}}renderSecurity(){const t=this.tenants,e=t.find(i=>i.id===this.securityTenantId),s=this.securityUsers.find(i=>i.id===this.securityUserId);return o`
      <div class="table-header">
        <span class="table-count">Tenant-level security management</span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("security")}>↻ Refresh</button>
      </div>

      <div style="display:grid;gap:10px;grid-template-columns:1fr 1fr;margin-bottom:14px">
        <div>
          <div style="font-size:12px;color:var(--text-muted,#6b7280);margin-bottom:6px">Tenant</div>
          <select class="select" .value=${String(this.securityTenantId??"")} @change=${this.onSecurityTenantChange}>
            ${t.map(i=>o`<option value=${i.id}>${i.name} (${i.slug})</option>`)}
          </select>
        </div>
        <div>
          <div style="font-size:12px;color:var(--text-muted,#6b7280);margin-bottom:6px">User</div>
          <select class="select" .value=${this.securityUserId??""} @change=${this.onSecurityUserChange} ?disabled=${!this.securityUsers.length}>
            ${this.securityUsers.map(i=>o`<option value=${i.id}>${i.email}</option>`)}
          </select>
        </div>
      </div>

      ${this.securityLoading?o`<div class="loading-state">Loading security context…</div>`:e?s?o`
              <div class="health-grid" style="margin-bottom:16px">
                <div class="health-card">
                  <div class="health-label">User</div>
                  <div class="health-value" style="font-size:14px">${s.email}</div>
                  <div class="health-sub">${s.displayName??s.username??"—"}</div>
                </div>
                <div class="health-card">
                  <div class="health-label">MFA</div>
                  <div class="health-value">${this.securityMfaStatus?.enabled?"Enabled":"Disabled"}</div>
                </div>
                <div class="health-card">
                  <div class="health-label">Active Sessions</div>
                  <div class="health-value">${s.activeSessions}</div>
                </div>
                <div class="health-card">
                  <div class="health-label">Active Tokens</div>
                  <div class="health-value">${s.activeTokens}</div>
                </div>
              </div>

              <div class="card" style="max-width:760px;margin-bottom:16px">
                <div class="card-title" style="margin-bottom:8px">MFA Controls</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
                  ${this.securityMfaStatus?.enabled?o`<button class="btn btn-danger btn-sm" @click=${this.disableSecurityMfa} ?disabled=${this.securityMfaDisableBusy}>${this.securityMfaDisableBusy?"Disabling…":"Disable MFA"}</button>`:o`<button class="btn btn-primary btn-sm" @click=${this.startSecurityMfaSetup} ?disabled=${this.securityMfaSetupBusy}>${this.securityMfaSetupBusy?"Preparing…":"Set up MFA"}</button>`}
                  ${this.securityMfaStatus?.enabled?o`<button class="btn btn-secondary btn-sm" @click=${this.regenerateSecurityRecoveryCodes} ?disabled=${this.securityMfaRegenerateBusy}>${this.securityMfaRegenerateBusy?"Regenerating…":"Regenerate recovery codes"}</button>`:""}
                </div>

                ${this.securityMfaQrDataUrl?o`
                  <div style="border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:10px;display:grid;gap:10px">
                    <div style="font-size:12px;color:var(--text-muted,#6b7280)">Scan QR with the user authenticator app and verify with a 6-digit code.</div>
                    <img alt="MFA QR" src=${this.securityMfaQrDataUrl} style="width:220px;height:220px;border:1px solid var(--border);border-radius:8px;background:#fff;padding:8px" />
                    <div style="font-size:12px;color:var(--text-muted,#6b7280)">Manual key: <span style="font-family:var(--mono)">${this.securityMfaManualKey}</span></div>
                  </div>
                `:""}

                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
                  <button type="button" class="btn ${this.securityMfaMode==="totp"?"btn-primary":"btn-secondary"} btn-sm" @click=${()=>{this.securityMfaMode="totp"}}>Use authenticator code</button>
                  <button type="button" class="btn ${this.securityMfaMode==="recovery"?"btn-primary":"btn-secondary"} btn-sm" @click=${()=>{this.securityMfaMode="recovery"}}>Use recovery code</button>
                </div>

                ${this.securityMfaMode==="totp"?o`<input class="input" placeholder="6-digit code" .value=${this.securityMfaCode} @input=${i=>{this.securityMfaCode=i.target.value}} style="margin-bottom:8px" />`:o`<input class="input" placeholder="ABCD-EFGH" .value=${this.securityRecoveryCode} @input=${i=>{this.securityRecoveryCode=i.target.value}} style="margin-bottom:8px" />`}

                ${this.securityMfaQrDataUrl?o`<button class="btn btn-primary btn-sm" @click=${this.enableSecurityMfa} ?disabled=${this.securityMfaEnableBusy||!this.securityMfaCode.trim()}>${this.securityMfaEnableBusy?"Enabling…":"Enable MFA"}</button>`:""}

                ${this.securityRecoveryCodes.length?o`
                    <div style="border:1px solid var(--border);border-radius:8px;padding:10px;margin-top:10px">
                      <div style="font-size:12px;color:var(--text-muted,#6b7280);margin-bottom:8px">Save these one-time recovery codes now.</div>
                      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-bottom:8px;font-family:var(--mono);font-size:12px;color:var(--text-strong)">
                        ${this.securityRecoveryCodes.map(i=>o`<div>${i}</div>`)}
                      </div>
                      <button class="btn btn-secondary btn-sm" @click=${this.downloadSecurityRecoveryCodes}>Download recovery codes</button>
                    </div>
                  `:""}
              </div>

              <div class="card" style="max-width:760px;margin-bottom:16px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                  <div class="card-title" style="margin:0">Active Sessions</div>
                  <button class="btn btn-danger btn-sm" @click=${this.revokeAllSecuritySessions}>Revoke all sessions</button>
                </div>
                <div style="display:grid;gap:8px">
                  ${this.securitySessions.length===0?o`<div style="font-size:12px;color:var(--text-muted,#6b7280)">No sessions found.</div>`:this.securitySessions.map(i=>o`
                      <div style="border:1px solid var(--border);border-radius:8px;padding:10px;display:grid;gap:6px">
                        <div style="display:flex;justify-content:space-between;align-items:center">
                          <div style="font-size:13px;color:var(--text-strong);font-weight:600">${i.sessionName||"Session"}</div>
                          <button class="btn btn-danger btn-sm" @click=${()=>this.revokeSecuritySession(i.id)}>Revoke</button>
                        </div>
                        <div style="font-size:12px;color:var(--text-muted,#6b7280)">${i.userAgent||"Unknown device"}</div>
                        <div style="font-size:12px;color:var(--text-muted,#6b7280)">IP: ${i.ipAddress||"Unknown"} · Tokens: ${i.activeTokens} · Last seen: ${new Date(i.lastSeenAt).toLocaleString()}</div>
                      </div>
                    `)}
                </div>
              </div>

              <div class="card" style="max-width:760px">
                <div class="card-title" style="margin-bottom:8px">JWT Tokens</div>
                <div style="display:grid;gap:8px">
                  ${this.securityTokens.slice(0,30).map(i=>o`
                    <div style="border:1px solid var(--border);border-radius:8px;padding:10px;display:grid;gap:6px">
                      <div style="display:flex;justify-content:space-between;align-items:center">
                        <div style="font-size:12px;color:var(--text-strong);font-family:var(--mono)">${i.jti}</div>
                        <button class="btn btn-danger btn-sm" @click=${()=>this.revokeSecurityToken(i.jti)}>Revoke</button>
                      </div>
                      <div style="font-size:12px;color:var(--text-muted,#6b7280)">${i.tokenType.toUpperCase()}${i.tenantId!=null?` · Tenant ${i.tenantId}`:""} · ${i.isActive?"Active":"Inactive"}</div>
                      <div style="font-size:12px;color:var(--text-muted,#6b7280)">Expires: ${new Date(i.expiresAt).toLocaleString()}</div>
                    </div>
                  `)}
                </div>
              </div>
            `:o`<div class="empty-state"><div class="empty-sub">No active members found for this tenant.</div></div>`:o`<div class="empty-state"><div class="empty-sub">No tenant available.</div></div>`}
    `}renderErrors(){return this.errors.length?o`
      <div class="table-header">
        <span class="table-count">${this.errors.length} errors (last 200)</span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("errors")}>↻ Refresh</button>
      </div>
      <div class="error-log">
        ${this.errors.map(t=>o`
          <div class="error-entry" @click=${()=>this.expandedErrorId=this.expandedErrorId===t.id?null:t.id}>
            <div class="error-entry-header">
              <span class="error-method">${t.method??"?"}</span>
              <span class="error-path">${t.path??"?"}</span>
              <span class="error-msg">${t.message}</span>
              <span class="error-time text-muted">${this.fmtDateTime(t.createdAt)}</span>
              <span class="error-chevron">${this.expandedErrorId===t.id?"▲":"▼"}</span>
            </div>
            ${this.expandedErrorId===t.id&&t.stack?o`
              <pre class="error-stack">${t.stack}</pre>
            `:""}
          </div>
        `)}
      </div>
    `:o`
        <div class="empty-state">
          <div class="empty-icon">✓</div>
          <div class="empty-title">No errors logged</div>
          <div class="empty-sub">The API error log is clean.</div>
        </div>
      `}renderImpersonateModal(){const t=this.users.find(e=>e.id===this.impersonateUserId);return o`
      <div class="modal-backdrop" @click=${()=>this.impersonateUserId=null}>
        <div class="modal" @click=${e=>e.stopPropagation()}>
          <div class="modal-header">
            <h3>Impersonate ${t?.email??"user"}</h3>
            <button class="btn btn-ghost btn-icon" @click=${()=>this.impersonateUserId=null}>✕</button>
          </div>
          <div class="modal-body">
            <p class="modal-desc">Select a workspace to enter as this user. A temporary token will be issued.</p>
            ${this.impersonateTenants.length===0?o`<div class="text-muted">This user has no workspaces.</div>`:o`
                <div class="tenant-list">
                  ${this.impersonateTenants.map(e=>o`
                    <button class="tenant-option" @click=${()=>this.doImpersonate(e.id)}>
                      <span class="tenant-option-name">${e.name}</span>
                      <span class="text-muted">${e.slug}</span>
                      <span class="tenant-option-arrow">→</span>
                    </button>
                  `)}
                </div>
              `}
          </div>
        </div>
      </div>
    `}};z([j({type:String})],B.prototype,"initialTab",2);z([c()],B.prototype,"tab",2);z([c()],B.prototype,"health",2);z([c()],B.prototype,"users",2);z([c()],B.prototype,"tenants",2);z([c()],B.prototype,"errors",2);z([c()],B.prototype,"llmUsage",2);z([c()],B.prototype,"usageDays",2);z([c()],B.prototype,"loading",2);z([c()],B.prototype,"errorMsg",2);z([c()],B.prototype,"showAdminToken",2);z([c()],B.prototype,"llmPoolTab",2);z([c()],B.prototype,"copiedAdminToken",2);z([c()],B.prototype,"copiedAdminEnv",2);z([c()],B.prototype,"downloadedAdminEnv",2);z([c()],B.prototype,"impersonateUserId",2);z([c()],B.prototype,"impersonateTenants",2);z([c()],B.prototype,"expandedErrorId",2);z([c()],B.prototype,"securityTenantId",2);z([c()],B.prototype,"securityUsers",2);z([c()],B.prototype,"securityUserId",2);z([c()],B.prototype,"securityUserEmail",2);z([c()],B.prototype,"securityMfaStatus",2);z([c()],B.prototype,"securitySessions",2);z([c()],B.prototype,"securityTokens",2);z([c()],B.prototype,"securityLoading",2);z([c()],B.prototype,"securityMfaSetupBusy",2);z([c()],B.prototype,"securityMfaEnableBusy",2);z([c()],B.prototype,"securityMfaDisableBusy",2);z([c()],B.prototype,"securityMfaRegenerateBusy",2);z([c()],B.prototype,"securityMfaMode",2);z([c()],B.prototype,"securityMfaCode",2);z([c()],B.prototype,"securityRecoveryCode",2);z([c()],B.prototype,"securityMfaManualKey",2);z([c()],B.prototype,"securityMfaQrDataUrl",2);z([c()],B.prototype,"securityRecoveryCodes",2);B=z([Q("ccl-admin")],B);var Hc=Object.defineProperty,Kc=Object.getOwnPropertyDescriptor,mt=(t,e,s,i)=>{for(var a=i>1?void 0:i?Kc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Hc(e,s,a),a};let ut=class extends K{constructor(){super(...arguments),this.tenantId="",this.page="tasks",this.focusProjectId="",this.open=!1,this.loadingContext=!1,this.contextError="",this.input="",this.sending=!1,this.contextSummary="",this.messages=[],this.actions=[],this.projects=[],this.tasks=[],this.claws=[],this.skills=[],this.pendingAutoPrompt="",this.msgEnd=null,this.handleBrainOpen=t=>{this.open=!0,t.detail?.projectId&&(this.focusProjectId=t.detail.projectId),t.detail?.prompt?.trim()&&(this.pendingAutoPrompt=t.detail.prompt.trim())}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),window.addEventListener("ccl:brain-open",this.handleBrainOpen),this.refreshContext()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ccl:brain-open",this.handleBrainOpen)}updated(t){if((t.has("tenantId")||t.has("page")||t.has("focusProjectId"))&&(this.contextError="",this.refreshContext()),this.pendingAutoPrompt&&this.open&&!this.sending){const e=this.pendingAutoPrompt;this.pendingAutoPrompt="",this.autoContinueFromPrompt(e)}this.msgEnd?.scrollIntoView({behavior:"smooth"})}async autoContinueFromPrompt(t){const e=`Continue scaffolding the selected project from this request:
${t}

Provide immediate next steps, ask for any missing onboarding details, and propose executable tasks.`;this.input=e,await this.refreshContext(),await this.send()}pageLabel(){return{projects:"Projects",tasks:"Tasks",claws:"Claws",skills:"Skills",workspace:"Workspace",billing:"Billing",logs:"Logs"}[this.page]??this.page}async refreshContext(){this.loadingContext=!0,this.contextError="";try{if(this.page==="projects"){const[t,e]=await Promise.all([Et.list(),ot.list()]);this.projects=t,this.tasks=e;const s=this.focusProjectId?t.find(i=>String(i.id)===String(this.focusProjectId)):null;this.contextSummary=s?`${s.name} · ${e.filter(i=>String(i.projectId??"")===String(s.id)).length} task(s)`:`${t.length} project${t.length!==1?"s":""} in workspace`}else if(this.page==="tasks"){const[t,e]=await Promise.all([ot.list(),Et.list()]);this.tasks=t,this.projects=e;const s=t.filter(i=>i.status!=="done").length;this.contextSummary=`${t.length} tasks · ${s} open`}else if(this.page==="claws"){this.claws=await pt.list();const t=this.claws.filter(e=>e.status==="connected").length;this.contextSummary=`${this.claws.length} claws · ${t} connected`}else this.page==="skills"?(this.skills=await qs.list(),this.contextSummary=`${this.skills.length} skills available`):this.page==="workspace"||this.page==="billing"?this.contextSummary="Workspace explorer context":this.contextSummary="Execution and activity logs context"}catch(t){this.contextError=t instanceof Error?t.message:String(t)}finally{this.loadingContext=!1}}quickPrompt(t){if(t==="describe"){this.input=`Describe the current ${this.pageLabel().toLowerCase()} context and highlight key priorities.`;return}if(t==="prd"){this.input="Create a concise product requirements document (PRD) for the most important project in this workspace.";return}this.input="Generate an execution-ready task breakdown. Include actionable steps and add <ccl-actions> JSON to create tasks."}buildContextPayload(){return{page:this.page,tenantId:this.tenantId,focusProjectId:this.focusProjectId||null,summary:this.contextSummary,projects:this.projects.slice(0,40).map(t=>({id:t.id,key:t.key,name:t.name,status:t.status,description:t.description??""})),tasks:this.tasks.slice(0,80).map(t=>({id:t.id,key:t.key,title:t.title,status:t.status,priority:t.priority,projectId:t.projectId??null})),claws:this.claws.slice(0,40).map(t=>({id:t.id,name:t.name,status:t.status})),skills:this.skills.slice(0,60).map(t=>({id:t.id,slug:t.slug,name:t.name}))}}parseActions(t){const e=t.match(/<ccl-actions>([\s\S]*?)<\/ccl-actions>/i);if(!e)return[];try{const s=JSON.parse(e[1]);return Array.isArray(s.actions)?s.actions.filter(i=>i&&typeof i=="object"&&(i.type==="create_project"||i.type==="create_task")):[]}catch{return[]}}stripActions(t){return t.replace(/<ccl-actions>[\s\S]*?<\/ccl-actions>/gi,"").trim()}toChatMessages(){const t=this.messages.slice(-12).map(s=>({role:s.role,content:s.text}));return[{role:"system",content:["You are Brain, the first-class AI assistant inside CoderClawLink.",`You are currently helping on the ${this.pageLabel()} page.`,"Use the provided page context snapshot to give practical, execution-focused output.","When the user asks to create entities, include machine-readable actions in this exact format:",'<ccl-actions>{"actions":[...]}</ccl-actions>',"Allowed action types:","- create_project: { type, name, description? }","- create_task: { type, title, description?, projectId?, projectName?, projectKey?, priority?, status?, dueDate? }","If no actions are needed, do not output ccl-actions.","Be concise and concrete."].join(`
`)},{role:"system",content:`Page context JSON:
${JSON.stringify(this.buildContextPayload())}`},...t]}async send(){const t=this.input.trim();if(!t||this.sending)return;const e={id:crypto.randomUUID(),role:"user",text:t};this.messages=[...this.messages,e],this.input="",this.sending=!0;try{const i=(await Ws.chat(this.toChatMessages(),{temperature:.25,maxTokens:1400})).choices?.[0]?.message?.content?.trim()??"I could not generate a response.",a=this.parseActions(i);a.length&&(this.actions=a.map(n=>({action:n,status:"idle"}))),this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:this.stripActions(i)||"Done."}]}catch(s){const i=s instanceof Error?s.message:String(s);this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:`Error: ${i}`}]}finally{this.sending=!1}}async applyAction(t){const e=this.actions[t];if(!(!e||e.status==="running")){this.actions=this.actions.map((s,i)=>i===t?{...s,status:"running",result:void 0}:s);try{if(e.action.type==="create_project"){const l=await Et.create({name:e.action.name,description:e.action.description});this.actions=this.actions.map((u,p)=>p===t?{...u,status:"done",result:`Created project ${l.key}`}:u),await this.refreshContext();return}const s=e.action,i=s.projectId?this.projects.find(l=>l.id===s.projectId):null,a=s.projectKey?this.projects.find(l=>l.key.toLowerCase()===s.projectKey?.toLowerCase()):null,n=s.projectName?this.projects.find(l=>l.name.toLowerCase()===s.projectName?.toLowerCase()):null,r=i??a??n??null,d=await ot.create({title:s.title,description:s.description,projectId:r?.id,priority:s.priority??"medium",status:s.status??"todo",dueDate:s.dueDate});this.actions=this.actions.map((l,u)=>u===t?{...l,status:"done",result:`Created task ${d.key}`}:l),await this.refreshContext()}catch(s){const i=s instanceof Error?s.message:String(s);this.actions=this.actions.map((a,n)=>n===t?{...a,status:"error",result:i}:a)}}}async applyAll(){for(let t=0;t<this.actions.length;t++)(this.actions[t]?.status==="idle"||this.actions[t]?.status==="error")&&await this.applyAction(t)}clearChat(){this.messages=[],this.actions=[],this.input=""}renderMarkdown(t){const e=H.parse(t,{gfm:!0,breaks:!0}),s=typeof e=="string"?e:"",i=mr.sanitize(s);return o`<div class="md-content">${Xn(i)}</div>`}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}render(){return o`
      <button class="brain-fab" @click=${()=>{this.open=!0}}>
        <span>🧠</span>
        Brain
      </button>

      <div class="brain-overlay ${this.open?"open":""}" @click=${()=>{this.open=!1}}></div>

      <aside class="brain-drawer ${this.open?"open":""}">
        <div class="brain-header">
          <div>
            <div class="brain-title">Brain</div>
            <div class="brain-sub">${this.pageLabel()} · ${this.loadingContext?"refreshing context…":this.contextSummary||"no context"}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <button class="btn btn-ghost btn-sm" @click=${()=>{this.refreshContext()}}>Refresh</button>
            <button class="btn btn-ghost btn-sm" @click=${this.clearChat}>New chat</button>
            <button class="panel-close" @click=${()=>{this.open=!1}}>
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        ${this.contextError?o`<div class="error-banner" style="margin:12px 16px 0 16px">${this.contextError}</div>`:""}

        <div style="display:flex;gap:8px;padding:12px 16px 8px 16px;flex-wrap:wrap;border-bottom:1px solid var(--border)">
          <button class="btn btn-ghost btn-sm" @click=${()=>this.quickPrompt("describe")}>Describe context</button>
          <button class="btn btn-ghost btn-sm" @click=${()=>this.quickPrompt("prd")}>Draft PRD</button>
          <button class="btn btn-ghost btn-sm" @click=${()=>this.quickPrompt("tasks")}>Generate tasks</button>
        </div>

        <div class="chat-messages" style="padding:12px 16px;gap:12px">
          ${this.messages.length===0?o`
            <div class="empty-state" style="padding:28px 12px">
              <div class="empty-state-icon">🧠</div>
              <div class="empty-state-title">Brain is ready</div>
              <div class="empty-state-sub">Ask for analysis, PRDs, or execution-ready task plans for this page.</div>
            </div>
          `:this.messages.map(t=>o`
            <div class="msg ${t.role==="user"?"msg-user":""}">
              <div class="msg-bubble ${t.role==="user"?"msg-bubble-user":"msg-bubble-assistant"}">${this.renderMarkdown(t.text)}</div>
              <div class="msg-meta">${t.role}</div>
            </div>
          `)}

          ${this.actions.length>0?o`
            <div class="card" style="margin-top:8px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
                <div class="card-title" style="margin:0">Proposed actions</div>
                <div style="flex:1"></div>
                <button class="btn btn-secondary btn-sm" @click=${()=>{this.applyAll()}}>Apply all</button>
              </div>

              <div style="display:grid;gap:8px">
                ${this.actions.map((t,e)=>o`
                  <div style="border:1px solid var(--border);border-radius:var(--radius-md);padding:10px;display:grid;gap:8px">
                    <div style="font-size:12px;color:var(--text)">
                      ${t.action.type==="create_project"?`Create project: ${t.action.name}`:`Create task: ${t.action.title}`}
                    </div>
                    <div style="display:flex;gap:8px;align-items:center">
                      <button class="btn btn-ghost btn-sm" ?disabled=${t.status==="running"||t.status==="done"} @click=${()=>{this.applyAction(e)}}>
                        ${t.status==="running"?"Applying…":t.status==="done"?"Applied":"Apply"}
                      </button>
                      <span class="badge ${t.status==="done"?"badge-green":t.status==="error"?"badge-red":t.status==="running"?"badge-yellow":"badge-gray"}">${t.status}</span>
                      ${t.result?o`<span style="font-size:11px;color:var(--muted)">${t.result}</span>`:""}
                    </div>
                  </div>
                `)}
              </div>
            </div>
          `:""}

          <div style="height:1px" .ref=${t=>{this.msgEnd=t}}></div>
        </div>

        <div class="chat-input-row" style="padding:12px 16px;flex-shrink:0">
          <textarea
            class="chat-textarea"
            rows="2"
            placeholder="Ask Brain about this page…"
            .value=${this.input}
            @input=${t=>{this.input=t.target.value}}
            @keydown=${this.onKeydown}
          ></textarea>
          <button class="btn btn-primary" ?disabled=${this.sending||!this.input.trim()} @click=${()=>{this.send()}}>
            ${this.sending?"Thinking…":"Send"}
          </button>
        </div>
      </aside>
    `}};mt([j()],ut.prototype,"tenantId",2);mt([j()],ut.prototype,"page",2);mt([c()],ut.prototype,"focusProjectId",2);mt([c()],ut.prototype,"open",2);mt([c()],ut.prototype,"loadingContext",2);mt([c()],ut.prototype,"contextError",2);mt([c()],ut.prototype,"input",2);mt([c()],ut.prototype,"sending",2);mt([c()],ut.prototype,"contextSummary",2);mt([c()],ut.prototype,"messages",2);mt([c()],ut.prototype,"actions",2);mt([c()],ut.prototype,"projects",2);mt([c()],ut.prototype,"tasks",2);mt([c()],ut.prototype,"claws",2);mt([c()],ut.prototype,"skills",2);mt([c()],ut.prototype,"pendingAutoPrompt",2);ut=mt([Q("ccl-brain")],ut);var Vc=Object.defineProperty,Gc=Object.getOwnPropertyDescriptor,It=(t,e,s,i)=>{for(var a=i>1?void 0:i?Gc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Vc(e,s,a),a};let Ct=class extends K{constructor(){super(...arguments),this.appState="loading",this.tab="home",this.selectedProjectId="",this.openProjectCreate=!1,this.pendingPrompt="",this.user=null,this.tenantList=[],this.tenant=null,this.theme="dark",this.navCollapsed=!1,this.workspaceInitialTab="members",this.workspaceInitialSection="",this.handleUnauthorized=()=>{Os(),this.user=null,this.tenant=null,this.appState="landing"},this.handleExitAdmin=()=>{this.appState=this.tenant?"dashboard":"workspace-picker"},this.handleImpersonate=t=>{const e=String(t.detail.tenantId),s=this.tenantList.find(i=>String(i.id)===e);s?this.tenant=s:this.tenant={id:e,name:"Impersonated Workspace",slug:"",role:"viewer",status:"active"},this.appState="dashboard"},this.handleOpenProject=t=>{this.selectedProjectId=t.detail.projectId,this.tab="projects"},this.handleNewProject=()=>{this.openProjectCreate=!0,this.tab="projects"},this.handleNavigate=t=>{const{tab:e,workspaceTab:s,workspaceSection:i}=t.detail;(e==="workspace"||e==="billing")&&(this.workspaceInitialTab=s??"settings",this.workspaceInitialSection=i??""),this.tab=e},this.handleDashboardPrompt=t=>{this.startDashboardScaffold(t.detail.prompt)},this.handleOpenAdminSecurity=()=>{this.user?.isSuperadmin&&(this.appState="admin")}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTheme(),this.bootstrap(),window.addEventListener("ccl:unauthorized",this.handleUnauthorized),window.addEventListener("ccl:exit-admin",this.handleExitAdmin),window.addEventListener("ccl:impersonate",this.handleImpersonate),window.addEventListener("ccl:open-project",this.handleOpenProject),window.addEventListener("ccl:new-project",this.handleNewProject),window.addEventListener("ccl:navigate",this.handleNavigate),window.addEventListener("ccl:dashboard-prompt",this.handleDashboardPrompt),window.addEventListener("ccl:open-admin-security",this.handleOpenAdminSecurity)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ccl:unauthorized",this.handleUnauthorized),window.removeEventListener("ccl:exit-admin",this.handleExitAdmin),window.removeEventListener("ccl:impersonate",this.handleImpersonate),window.removeEventListener("ccl:open-project",this.handleOpenProject),window.removeEventListener("ccl:new-project",this.handleNewProject),window.removeEventListener("ccl:navigate",this.handleNavigate),window.removeEventListener("ccl:dashboard-prompt",this.handleDashboardPrompt),window.removeEventListener("ccl:open-admin-security",this.handleOpenAdminSecurity)}updated(t){this.appState==="dashboard"&&(t.has("appState")||t.has("tab")||t.has("tenant"))&&this.mountDashboardView()}async bootstrap(){if(!Zt()){this.appState="landing";return}const e=ct(),s=Gn();if(this.user=Qn(),e&&s)try{const i=await ht.listTenants();this.tenantList=i;const a=i.find(n=>n.id===s);if(a){this.tenant=a,this.appState="dashboard";return}}catch{}try{this.tenantList=await ht.listTenants(),this.appState="workspace-picker"}catch{this.appState="auth"}}async handleLogin(t){const{token:e,user:s}=t.detail;Jn(e),Yn(s),this.user=s;try{this.tenantList=await ht.listTenants(),this.appState="workspace-picker"}catch{this.appState="workspace-picker"}}async handleSelectTenant(t){const e=t.detail;try{const{token:s}=await ht.tenantToken(e.id);Ls(s),Ns(e.id),this.tenant=e,this.appState="dashboard"}catch(s){console.error("Failed to get tenant token",s)}}async handleCreateTenant(t){try{const e=await at.create(t.detail.name),{token:s}=await ht.tenantToken(e.id);Ls(s),Ns(e.id),this.tenant=e,this.appState="dashboard"}catch(e){console.error("Failed to create tenant",e)}}handleSignOut(){Os(),this.user=null,this.tenant=null,this.tenantList=[],this.appState="landing"}handleSwitchWorkspace(){this.appState="workspace-picker"}async startDashboardScaffold(t){const e=t.trim();if(e)try{const s=await Et.scaffold({prompt:e}),a=`Scaffold: ${(e.split(/[.!?\n]/)[0]?.trim()||e).slice(0,120)}`;if(await ot.create({title:a,description:e,projectId:s.project.id,assignedClawId:s.scaffold.clawId!=null?String(s.scaffold.clawId):void 0,priority:"high",status:"todo"}),s.scaffold.wip){this.selectedProjectId=s.project.id,this.tab="projects",setTimeout(()=>{window.dispatchEvent(new CustomEvent("ccl:brain-open",{detail:{prompt:e,projectId:String(s.project.id)}}))},0);return}this.selectedProjectId=s.project.id,this.tab="projects",setTimeout(()=>{window.dispatchEvent(new CustomEvent("ccl:brain-open",{detail:{prompt:e,projectId:String(s.project.id)}}))},0)}catch{this.pendingPrompt=e,this.tab="tasks"}}setTab(t){this.tab!==t&&(this.tab=t)}openWorkspaceArea(t,e){this.workspaceInitialTab=t,this.workspaceInitialSection=e??"",this.tab="workspace"}mountDashboardView(){const t=this.querySelector("#dashboard-view-host");if(!(t instanceof HTMLElement))return;const e=this.tenant?.id??"";let s;switch(this.tab){case"home":{const i=document.createElement("ccl-dashboard");i.tenantId=e,s=i;break}case"tasks":{const i=document.createElement("ccl-tasks");i.tenantId=e,this.pendingPrompt&&(i.openTaskPrompt=this.pendingPrompt,this.pendingPrompt=""),s=i;break}case"projects":{const i=document.createElement("ccl-projects");i.tenantId=e,this.selectedProjectId&&(i.selectedProjectId=this.selectedProjectId,this.selectedProjectId=""),this.openProjectCreate&&(i.openCreate=!0,this.openProjectCreate=!1),s=i;break}case"claws":{const i=document.createElement("ccl-claws");i.tenantId=e,s=i;break}case"skills":{const i=document.createElement("ccl-skills");i.tenantId=e,s=i;break}case"workspace":{const i=document.createElement("ccl-workspace");i.tenant=this.tenant,i.initialTab=this.workspaceInitialTab,i.initialSection=this.workspaceInitialSection,s=i;break}case"billing":{const i=document.createElement("ccl-workspace");i.tenant=this.tenant,i.initialTab="settings",i.initialSection="billing",s=i;break}case"logs":{const i=document.createElement("ccl-logs");i.tenantId=e,s=i;break}}t.replaceChildren(s)}loadTheme(){const t=localStorage.getItem("ccl-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;this.theme=t??(e?"dark":"light"),document.documentElement.dataset.theme=this.theme,this.navCollapsed=localStorage.getItem("ccl-nav-collapsed")==="1"}toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",document.documentElement.dataset.theme=this.theme,localStorage.setItem("ccl-theme",this.theme),this.requestUpdate()}toggleNav(){this.navCollapsed=!this.navCollapsed,localStorage.setItem("ccl-nav-collapsed",this.navCollapsed?"1":"0")}svgIcon(t){return`<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">${{home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',projects:'<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>',tasks:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',claws:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',skills:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',workspace:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>',logs:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',billing:'<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>',admin:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',panelLeft:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',chevronsLeft:'<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',chevronsRight:'<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>'}[t]??""}</svg>`}render(){return this.appState==="loading"?this.renderLoading():this.appState==="landing"?this.renderLanding():this.appState==="auth"?this.renderAuth():this.appState==="workspace-picker"?this.renderWorkspacePicker():this.appState==="admin"?this.renderAdmin():this.renderDashboard()}renderLoading(){return o`
      <div class="auth-shell">
        <div style="text-align:center;color:var(--muted);font-size:14px">Loading…</div>
      </div>`}renderLanding(){return o`
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

        <section class="landing-section" style="padding-top:0;">
          <div class="landing-section-inner">
            <ccl-quickstart></ccl-quickstart>
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
    `}renderAuth(){return o`
      <ccl-auth
        @login=${this.handleLogin}
        @register=${this.handleLogin}
      ></ccl-auth>`}renderWorkspacePicker(){return o`
      <div>
        ${this.user?.isSuperadmin?o`
          <div style="position:fixed;top:12px;right:12px;z-index:100">
            <button
              class="btn btn-ghost btn-sm"
              style="display:flex;align-items:center;gap:6px;background:var(--surface-2);border:1px solid var(--border)"
              @click=${()=>{this.appState="admin"}}
              title="Platform Admin"
            >
              <span .innerHTML=${this.svgIcon("admin")}></span>
              Platform Admin
            </button>
          </div>
        `:""}
        <ccl-workspace-picker
          .tenants=${this.tenantList}
          .user=${this.user}
          @select-tenant=${this.handleSelectTenant}
          @create-tenant=${this.handleCreateTenant}
          @sign-out=${this.handleSignOut}
        ></ccl-workspace-picker>
      </div>`}renderAdmin(){return o`<ccl-admin .initialTab=${"security"}></ccl-admin>`}renderDashboard(){const t=this.navCollapsed,e=[{id:"home",label:"Dashboard",icon:"home"},{id:"projects",label:"Projects",icon:"projects"},{id:"tasks",label:"Tasks",icon:"tasks"}],s=[{id:"claws",label:"Claws",icon:"claws"},{id:"skills",label:"Skills",icon:"skills"}],i=[{id:"workspace",label:"Members",icon:"projects",workspaceTab:"members"},{id:"workspace",label:"Settings",icon:"settings",workspaceTab:"settings",workspaceSection:"settings"},{id:"workspace",label:"Billing",icon:"billing",workspaceTab:"settings",workspaceSection:"billing"},{id:"workspace",label:"Consumption",icon:"tasks",workspaceTab:"settings",workspaceSection:"consumption"},{id:"workspace",label:"Security",icon:"settings",workspaceTab:"settings",workspaceSection:"security"},{id:"workspace",label:"Tenant & Workspace",icon:"workspace",workspaceTab:"settings",workspaceSection:"details"},{id:"logs",label:"Logs",icon:"logs"}],a=n=>o`
      <button
        class="nav-item ${n.id==="workspace"?this.tab==="workspace"&&this.workspaceInitialTab===(n.workspaceTab??"settings")&&this.workspaceInitialSection===(n.workspaceSection??"")?"active":"":this.tab===n.id?"active":""}"
        title="${n.label}"
        @click=${()=>{if(n.id==="workspace"){if(n.workspaceSection==="security"&&this.user?.isSuperadmin){this.appState="admin";return}this.openWorkspaceArea(n.workspaceTab??"settings",n.workspaceSection);return}this.setTab(n.id)}}
      >
        <span .innerHTML=${this.svgIcon(n.icon)}></span>
        <span class="nav-item-label">${n.label}</span>
      </button>
    `;return o`
      <div class="shell ${t?"nav-collapsed":""}">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <div class="brand">
              <img class="brand-logo" src="/claw-logo.png" alt="CoderClawLink" onerror="this.style.display='none'">
              ${t?"":o`<span class="brand-name">CoderClawLink</span><span class="brand-badge">BETA</span>`}
            </div>
          </div>
          <div class="topbar-right">
            ${this.user?.isSuperadmin?o`
              <button
                class="btn btn-ghost btn-sm"
                style="display:flex;align-items:center;gap:6px;color:var(--warning,#f59e0b)"
                @click=${()=>{this.appState="admin"}}
                title="Platform Admin"
              >
                <span .innerHTML=${this.svgIcon("admin")}></span>
                Admin
              </button>
            `:""}
            <button
              class="tenant-chip"
              @click=${this.handleSwitchWorkspace}
              title="Switch workspace"
            >
              ${this.tenant?.name??"Workspace"}
              <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button class="btn btn-ghost btn-icon" @click=${()=>this.toggleTheme()} title="Toggle theme">
              <span .innerHTML=${this.svgIcon(this.theme==="dark"?"sun":"moon")}></span>
            </button>
            <button class="btn btn-ghost btn-icon" @click=${this.handleSignOut} title="Sign out">
              <span .innerHTML=${this.svgIcon("logout")}></span>
            </button>
          </div>
        </header>

        <!-- Sidebar nav -->
        <nav class="nav ${t?"collapsed":""}">
          <div class="nav-main">
            <div class="nav-section">
              ${e.map(a)}
            </div>

            <div class="nav-section-label" style="font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);padding:0 10px;margin-bottom:6px">Mesh</div>
            <div class="nav-section">
              ${s.map(a)}
            </div>

            <div class="nav-section-label" style="font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);padding:0 10px;margin-bottom:6px">System</div>
            <div class="nav-section">
              ${i.map(a)}
            </div>
          </div>

          <!-- Footer -->
          <div class="nav-footer">
            <button
              class="nav-item"
              title="${t?"Expand sidebar":"Collapse sidebar"}"
              @click=${()=>this.toggleNav()}
            >
              <span .innerHTML=${this.svgIcon(t?"chevronsRight":"chevronsLeft")}></span>
              <span class="nav-item-label">Minimize sidebar</span>
            </button>
          </div>
        </nav>

        <!-- Content -->
        <main class="content">
          <div id="dashboard-view-host"></div>
        </main>

        <ccl-brain .tenantId=${this.tenant?.id??""} .page=${this.tab}></ccl-brain>
      </div>
    `}};Ct.styles=Rr``;It([c()],Ct.prototype,"appState",2);It([c()],Ct.prototype,"tab",2);It([c()],Ct.prototype,"selectedProjectId",2);It([c()],Ct.prototype,"openProjectCreate",2);It([c()],Ct.prototype,"pendingPrompt",2);It([c()],Ct.prototype,"user",2);It([c()],Ct.prototype,"tenantList",2);It([c()],Ct.prototype,"tenant",2);It([c()],Ct.prototype,"theme",2);It([c()],Ct.prototype,"navCollapsed",2);It([c()],Ct.prototype,"workspaceInitialTab",2);It([c()],Ct.prototype,"workspaceInitialSection",2);Ct=It([Q("ccl-app")],Ct);
//# sourceMappingURL=index-CBMMSlQ8.js.map
