(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();const Ps=globalThis,Hi=Ps.ShadowRoot&&(Ps.ShadyCSS===void 0||Ps.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ki=Symbol(),Da=new WeakMap;let Fn=class{constructor(e,s,a){if(this._$cssResult$=!0,a!==Ki)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(Hi&&e===void 0){const a=s!==void 0&&s.length===1;a&&(e=Da.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&Da.set(s,e))}return e}toString(){return this.cssText}};const _r=t=>new Fn(typeof t=="string"?t:t+"",void 0,Ki),Pr=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((a,i,n)=>a+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new Fn(s,t,Ki)},Ir=(t,e)=>{if(Hi)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const a=document.createElement("style"),i=Ps.litNonce;i!==void 0&&a.setAttribute("nonce",i),a.textContent=s.cssText,t.appendChild(a)}},La=Hi?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const a of e.cssRules)s+=a.cssText;return _r(s)})(t):t;const{is:Rr,defineProperty:Dr,getOwnPropertyDescriptor:Lr,getOwnPropertyNames:Mr,getOwnPropertySymbols:Nr,getPrototypeOf:Or}=Object,zs=globalThis,Ma=zs.trustedTypes,jr=Ma?Ma.emptyScript:"",Br=zs.reactiveElementPolyfillSupport,cs=(t,e)=>t,Rs={toAttribute(t,e){switch(e){case Boolean:t=t?jr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},Vi=(t,e)=>!Rr(t,e),Na={attribute:!0,type:String,converter:Rs,reflect:!1,useDefault:!1,hasChanged:Vi};Symbol.metadata??=Symbol("metadata"),zs.litPropertyMetadata??=new WeakMap;let Fe=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=Na){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,s);i!==void 0&&Dr(this.prototype,e,i)}}static getPropertyDescriptor(e,s,a){const{get:i,set:n}=Lr(this.prototype,e)??{get(){return this[s]},set(r){this[s]=r}};return{get:i,set(r){const c=i?.call(this);n?.call(this,r),this.requestUpdate(e,c,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Na}static _$Ei(){if(this.hasOwnProperty(cs("elementProperties")))return;const e=Or(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(cs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(cs("properties"))){const s=this.properties,a=[...Mr(s),...Nr(s)];for(const i of a)this.createProperty(i,s[i])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[a,i]of s)this.elementProperties.set(a,i)}this._$Eh=new Map;for(const[s,a]of this.elementProperties){const i=this._$Eu(s,a);i!==void 0&&this._$Eh.set(i,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const i of a)s.unshift(La(i))}else e!==void 0&&s.push(La(e));return s}static _$Eu(e,s){const a=s.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const a of s.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ir(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,a){this._$AK(e,a)}_$ET(e,s){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(i!==void 0&&a.reflect===!0){const n=(a.converter?.toAttribute!==void 0?a.converter:Rs).toAttribute(s,a.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,s){const a=this.constructor,i=a._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const n=a.getPropertyOptions(i),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Rs;this._$Em=i;const c=r.fromAttribute(s,n.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(e,s,a,i=!1,n){if(e!==void 0){const r=this.constructor;if(i===!1&&(n=this[e]),a??=r.getPropertyOptions(e),!((a.hasChanged??Vi)(n,s)||a.useDefault&&a.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,a))))return;this.C(e,s,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:a,reflect:i,wrapped:n},r){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??s??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(s=void 0),this._$AL.set(e,s)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[i,n]of a){const{wrapped:r}=n,c=this[i];r!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,n,c)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(s)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(e){}firstUpdated(e){}};Fe.elementStyles=[],Fe.shadowRootOptions={mode:"open"},Fe[cs("elementProperties")]=new Map,Fe[cs("finalized")]=new Map,Br?.({ReactiveElement:Fe}),(zs.reactiveElementVersions??=[]).push("2.1.2");const Gi=globalThis,Oa=t=>t,Ds=Gi.trustedTypes,ja=Ds?Ds.createPolicy("lit-html",{createHTML:t=>t}):void 0,qn="$lit$",le=`lit$${Math.random().toFixed(9).slice(2)}$`,Wn="?"+le,Ur=`<${Wn}>`,$e=document,ds=()=>$e.createComment(""),hs=t=>t===null||typeof t!="object"&&typeof t!="function",Ji=Array.isArray,zr=t=>Ji(t)||typeof t?.[Symbol.iterator]=="function",ni=`[ 	
\f\r]`,Xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ba=/-->/g,Ua=/>/g,be=RegExp(`>|${ni}(?:([^\\s"'>=/]+)(${ni}*=${ni}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),za=/'/g,Fa=/"/g,Hn=/^(?:script|style|textarea|title)$/i,Fr=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),o=Fr(1),ke=Symbol.for("lit-noChange"),it=Symbol.for("lit-nothing"),qa=new WeakMap,we=$e.createTreeWalker($e,129);function Kn(t,e){if(!Ji(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ja!==void 0?ja.createHTML(e):e}const qr=(t,e)=>{const s=t.length-1,a=[];let i,n=e===2?"<svg>":e===3?"<math>":"",r=Xe;for(let c=0;c<s;c++){const l=t[c];let u,p,m=-1,g=0;for(;g<l.length&&(r.lastIndex=g,p=r.exec(l),p!==null);)g=r.lastIndex,r===Xe?p[1]==="!--"?r=Ba:p[1]!==void 0?r=Ua:p[2]!==void 0?(Hn.test(p[2])&&(i=RegExp("</"+p[2],"g")),r=be):p[3]!==void 0&&(r=be):r===be?p[0]===">"?(r=i??Xe,m=-1):p[1]===void 0?m=-2:(m=r.lastIndex-p[2].length,u=p[1],r=p[3]===void 0?be:p[3]==='"'?Fa:za):r===Fa||r===za?r=be:r===Ba||r===Ua?r=Xe:(r=be,i=void 0);const f=r===be&&t[c+1].startsWith("/>")?" ":"";n+=r===Xe?l+Ur:m>=0?(a.push(u),l.slice(0,m)+qn+l.slice(m)+le+f):l+le+(m===-2?c:f)}return[Kn(t,n+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class ps{constructor({strings:e,_$litType$:s},a){let i;this.parts=[];let n=0,r=0;const c=e.length-1,l=this.parts,[u,p]=qr(e,s);if(this.el=ps.createElement(u,a),we.currentNode=this.el.content,s===2||s===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(i=we.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const m of i.getAttributeNames())if(m.endsWith(qn)){const g=p[r++],f=i.getAttribute(m).split(le),b=/([.?@])?(.*)/.exec(g);l.push({type:1,index:n,name:b[2],strings:f,ctor:b[1]==="."?Hr:b[1]==="?"?Kr:b[1]==="@"?Vr:Fs}),i.removeAttribute(m)}else m.startsWith(le)&&(l.push({type:6,index:n}),i.removeAttribute(m));if(Hn.test(i.tagName)){const m=i.textContent.split(le),g=m.length-1;if(g>0){i.textContent=Ds?Ds.emptyScript:"";for(let f=0;f<g;f++)i.append(m[f],ds()),we.nextNode(),l.push({type:2,index:++n});i.append(m[g],ds())}}}else if(i.nodeType===8)if(i.data===Wn)l.push({type:2,index:n});else{let m=-1;for(;(m=i.data.indexOf(le,m+1))!==-1;)l.push({type:7,index:n}),m+=le.length-1}n++}}static createElement(e,s){const a=$e.createElement("template");return a.innerHTML=e,a}}function We(t,e,s=t,a){if(e===ke)return e;let i=a!==void 0?s._$Co?.[a]:s._$Cl;const n=hs(e)?void 0:e._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(t),i._$AT(t,s,a)),a!==void 0?(s._$Co??=[])[a]=i:s._$Cl=i),i!==void 0&&(e=We(t,i._$AS(t,e.values),i,a)),e}class Wr{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:a}=this._$AD,i=(e?.creationScope??$e).importNode(s,!0);we.currentNode=i;let n=we.nextNode(),r=0,c=0,l=a[0];for(;l!==void 0;){if(r===l.index){let u;l.type===2?u=new Yi(n,n.nextSibling,this,e):l.type===1?u=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(u=new Gr(n,this,e)),this._$AV.push(u),l=a[++c]}r!==l?.index&&(n=we.nextNode(),r++)}return we.currentNode=$e,i}p(e){let s=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,s),s+=a.strings.length-2):a._$AI(e[s])),s++}}let Yi=class Vn{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,a,i){this.type=2,this._$AH=it,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=We(this,e,s),hs(e)?e===it||e==null||e===""?(this._$AH!==it&&this._$AR(),this._$AH=it):e!==this._$AH&&e!==ke&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):zr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==it&&hs(this._$AH)?this._$AA.nextSibling.data=e:this.T($e.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:a}=e,i=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=ps.createElement(Kn(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(s);else{const n=new Wr(i,this),r=n.u(this.options);n.p(s),this.T(r),this._$AH=n}}_$AC(e){let s=qa.get(e.strings);return s===void 0&&qa.set(e.strings,s=new ps(e)),s}k(e){Ji(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let a,i=0;for(const n of e)i===s.length?s.push(a=new Vn(this.O(ds()),this.O(ds()),this,this.options)):a=s[i],a._$AI(n),i++;i<s.length&&(this._$AR(a&&a._$AB.nextSibling,i),s.length=i)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const a=Oa(e).nextSibling;Oa(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Fs=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,a,i,n){this.type=1,this._$AH=it,this._$AN=void 0,this.element=e,this.name=s,this._$AM=i,this.options=n,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=it}_$AI(e,s=this,a,i){const n=this.strings;let r=!1;if(n===void 0)e=We(this,e,s,0),r=!hs(e)||e!==this._$AH&&e!==ke,r&&(this._$AH=e);else{const c=e;let l,u;for(e=n[0],l=0;l<n.length-1;l++)u=We(this,c[a+l],s,l),u===ke&&(u=this._$AH[l]),r||=!hs(u)||u!==this._$AH[l],u===it?e=it:e!==it&&(e+=(u??"")+n[l+1]),this._$AH[l]=u}r&&!i&&this.j(e)}j(e){e===it?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Hr=class extends Fs{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===it?void 0:e}},Kr=class extends Fs{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==it)}},Vr=class extends Fs{constructor(e,s,a,i,n){super(e,s,a,i,n),this.type=5}_$AI(e,s=this){if((e=We(this,e,s,0)??it)===ke)return;const a=this._$AH,i=e===it&&a!==it||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,n=e!==it&&(a===it||i);i&&this.element.removeEventListener(this.name,this,a),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Gr=class{constructor(e,s,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){We(this,e)}};const Jr=Gi.litHtmlPolyfillSupport;Jr?.(ps,Yi),(Gi.litHtmlVersions??=[]).push("3.3.2");const Yr=(t,e,s)=>{const a=s?.renderBefore??e;let i=a._$litPart$;if(i===void 0){const n=s?.renderBefore??null;a._$litPart$=i=new Yi(e.insertBefore(ds(),n),n,void 0,s??{})}return i._$AI(t),i};const Qi=globalThis;let F=class extends Fe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Yr(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ke}};F._$litElement$=!0,F.finalized=!0,Qi.litElementHydrateSupport?.({LitElement:F});const Qr=Qi.litElementPolyfillSupport;Qr?.({LitElement:F});(Qi.litElementVersions??=[]).push("4.2.2");const J=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const Xr={attribute:!0,type:String,converter:Rs,reflect:!1,hasChanged:Vi},Zr=(t=Xr,e,s)=>{const{kind:a,metadata:i}=s;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),a==="accessor"){const{name:r}=s;return{set(c){const l=e.get.call(this);e.set.call(this,c),this.requestUpdate(r,l,t,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,t,c),c}}}if(a==="setter"){const{name:r}=s;return function(c){const l=this[r];e.call(this,c),this.requestUpdate(r,l,t,!0,c)}}throw Error("Unsupported decorator location: "+a)};function B(t){return(e,s)=>typeof s=="object"?Zr(t,e,s):((a,i,n)=>{const r=i.hasOwnProperty(n);return i.constructor.createProperty(n,a),r?Object.getOwnPropertyDescriptor(i,n):void 0})(t,e,s)}function d(t){return B({...t,state:!0,attribute:!1})}const Ls=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",Xi="ccl-web-token",Zi="ccl-tenant-token",ta="ccl-tenant-id",ea="ccl-user";function Xt(){return localStorage.getItem(Xi)}function at(){return localStorage.getItem(Zi)}function Gn(){return localStorage.getItem(ta)}function Jn(t){localStorage.setItem(Xi,t)}function Ms(t){localStorage.setItem(Zi,t)}function Ns(t){localStorage.setItem(ta,t)}function Yn(t){localStorage.setItem(ea,JSON.stringify(t))}function Qn(){const t=localStorage.getItem(ea);return t?JSON.parse(t):null}function Os(){localStorage.removeItem(Xi),localStorage.removeItem(Zi),localStorage.removeItem(ta),localStorage.removeItem(ea)}class sa extends Error{constructor(e,s){super(s),this.status=e}}async function S(t,e={}){const{token:s,...a}=e,i=s??at()??Xt(),n=new Headers(a.headers);n.set("Content-Type","application/json"),i&&n.set("Authorization",`Bearer ${i}`);const r=await fetch(`${Ls}${t}`,{...a,headers:n});if(r.status===401&&(Os(),window.dispatchEvent(new CustomEvent("ccl:unauthorized"))),!r.ok){let c=r.statusText;try{const l=await r.json();c=l.error??l.message??c}catch{}throw new sa(r.status,c)}if(r.status!==204)return r.json()}const rt={async register(t,e,s){return S("/api/auth/web/register",{method:"POST",body:JSON.stringify({email:t,username:e,password:s}),token:null})},async login(t,e,s){return S("/api/auth/web/login",{method:"POST",body:JSON.stringify({email:t,password:e,sessionName:s}),token:null})},async loginMfa(t,e){return S("/api/auth/web/login/mfa",{method:"POST",body:JSON.stringify({mfaToken:t,...e}),token:null})},async tenantToken(t){return S("/api/auth/tenant-token",{method:"POST",body:JSON.stringify({tenantId:t})})},async listTenants(){return(await S("/api/tenants/mine")).tenants},async mfaStatus(){return S("/api/auth/mfa/status",{method:"GET"})},async mfaSetup(){return S("/api/auth/mfa/setup",{method:"POST",body:JSON.stringify({})})},async mfaEnable(t){return S("/api/auth/mfa/enable",{method:"POST",body:JSON.stringify({code:t})})},async mfaDisable(t){return S("/api/auth/mfa/disable",{method:"POST",body:JSON.stringify(t)})},async mfaRegenerateRecoveryCodes(t){return S("/api/auth/mfa/recovery-codes/regenerate",{method:"POST",body:JSON.stringify(t)})},async listSessions(){return(await S("/api/auth/sessions",{method:"GET"})).sessions},async revokeSession(t){return S(`/api/auth/sessions/${t}/revoke`,{method:"POST",body:JSON.stringify({})})},async revokeOtherSessions(){return S("/api/auth/sessions/revoke-others",{method:"POST",body:JSON.stringify({})})},async listTokens(){return(await S("/api/auth/tokens",{method:"GET"})).tokens},async revokeToken(t){return S(`/api/auth/tokens/${t}/revoke`,{method:"POST",body:JSON.stringify({})})}},St={async create(t){return S("/api/tenants/create",{method:"POST",body:JSON.stringify({name:t})})},async get(t){return S(`/api/tenants/${t}`)},async inviteMember(t,e,s){return S(`/api/tenants/${t}/members`,{method:"POST",body:JSON.stringify({email:e,role:s})})},async removeMember(t,e){return S(`/api/tenants/${t}/members/${e}`,{method:"DELETE"})},async subscription(t){return S(`/api/tenants/${t}/subscription`)},async defaultClaw(t){return S(`/api/tenants/${t}/default-claw`)},async setDefaultClaw(t,e){return S(`/api/tenants/${t}/default-claw`,{method:"PUT",body:JSON.stringify({clawId:e})})},async upgradeToPro(t,e){return S(`/api/tenants/${t}/subscription/pro`,{method:"POST",body:JSON.stringify(e)})},async downgradeToFree(t){return S(`/api/tenants/${t}/subscription/free`,{method:"POST",body:JSON.stringify({})})}},Ct={async list(){return(await S("/api/projects")).projects},async create(t){return S("/api/projects",{method:"POST",body:JSON.stringify(t)})},async upsert(t){return S("/api/projects/upsert",{method:"POST",body:JSON.stringify(t)})},async scaffold(t){return S("/api/projects/scaffold",{method:"POST",body:JSON.stringify(t)})},async update(t,e){return S(`/api/projects/${t}`,{method:"PATCH",body:JSON.stringify(e)})},async remove(t){return S(`/api/projects/${t}`,{method:"DELETE"})}},ot={async list(t){const e=new URLSearchParams;return t?.projectId&&e.set("project_id",t.projectId),t?.status&&e.set("status",t.status),t?.archived&&e.set("archived","true"),(await S(`/api/tasks${e.size?`?${e}`:""}`)).tasks.map(a=>({...a,assignedClawId:a.assignedClawId==null?void 0:String(a.assignedClawId)}))},async create(t){const e={...t,projectId:t.projectId===void 0?void 0:Number(t.projectId),assignedClawId:t.assignedClawId===void 0?void 0:t.assignedClawId===""?null:Number(t.assignedClawId)},s=await S("/api/tasks",{method:"POST",body:JSON.stringify(e)});return{...s,assignedClawId:s.assignedClawId==null?void 0:String(s.assignedClawId)}},async update(t,e){const s={...e,projectId:e.projectId===void 0?void 0:Number(e.projectId),assignedClawId:e.assignedClawId===void 0?void 0:e.assignedClawId===""?null:Number(e.assignedClawId)},a=await S(`/api/tasks/${t}`,{method:"PATCH",body:JSON.stringify(s)});return{...a,assignedClawId:a.assignedClawId==null?void 0:String(a.assignedClawId)}},async remove(t){return S(`/api/tasks/${t}`,{method:"DELETE"})},async run(t,e){return S("/api/runtime/executions",{method:"POST",body:JSON.stringify({taskId:Number(t),payload:e})})},async executions(t){return S(`/api/runtime/tasks/${t}/executions`)}},ct={async list(){return(await S("/api/claws")).claws},async register(t){return S("/api/claws",{method:"POST",body:JSON.stringify({name:t})})},async remove(t){return S(`/api/claws/${t}`,{method:"DELETE"})},async projects(t){return(await S(`/api/claws/${t}/projects`)).projects},async associateProject(t,e){return S(`/api/claws/${t}/projects/${e}`,{method:"PUT"})},async unassociateProject(t,e){return S(`/api/claws/${t}/projects/${e}`,{method:"DELETE"})},async directories(t){return(await S(`/api/claws/${t}/directories`)).directories},async directoryFiles(t,e){return(await S(`/api/claws/${t}/directories/${e}/files`)).files},async directoryFileContent(t,e,s){return S(`/api/claws/${t}/directories/${e}/files/content?path=${encodeURIComponent(s)}`)},async status(t){return S(`/api/claws/${t}/status`)},wsUrl(t){const s=(typeof Ls=="string"?Ls:"https://api.coderclaw.ai").replace(/^http/,"ws"),a=at()??"";return`${s}/api/claws/${t}/ws?token=${encodeURIComponent(a)}`}},qs={async list(){return(await S("/marketplace/skills")).skills}},qe={async listTenant(){return(await S("/api/skill-assignments/tenant")).assignments},async assignTenant(t){return S("/api/skill-assignments/tenant",{method:"POST",body:JSON.stringify({slug:t})})},async unassignTenant(t){return S(`/api/skill-assignments/tenant/${t}`,{method:"DELETE"})},async assignClaw(t,e){return S(`/api/skill-assignments/claws/${t}`,{method:"POST",body:JSON.stringify({skillSlug:e})})}},ia={async list(t){const e=new URLSearchParams;return t?.taskId&&e.set("taskId",t.taskId),t?.clawId&&e.set("clawId",t.clawId),S(`/api/runtime/executions${e.size?`?${e}`:""}`)}},Ws={async chat(t,e){const s=await fetch(`${Ls}/llm/v1/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",...at()?{Authorization:`Bearer ${at()}`}:{}},body:JSON.stringify({messages:t,stream:!1,temperature:e?.temperature,max_tokens:e?.maxTokens})});if(!s.ok){let a=s.statusText;try{const i=await s.json();a=i.error??i.message??a}catch{}throw new sa(s.status,a)}return s.json()},async usage(t=30){const e=new URLSearchParams;return e.set("days",String(t)),S(`/llm/v1/usage?${e.toString()}`)}};function Ue(t,e={}){return S(t,{...e,token:Xt()})}const Bt={async users(){return(await Ue("/api/admin/users")).users},async tenants(){return(await Ue("/api/admin/tenants")).tenants},async health(){return Ue("/api/admin/health")},async errors(){return(await Ue("/api/admin/errors")).errors},async impersonate(t,e){return Ue("/api/admin/impersonate",{method:"POST",body:JSON.stringify({userId:t,tenantId:e})})},async llmUsage(t=30){return Ue(`/api/admin/llm-usage?days=${t}`)}},Wa=Object.freeze(Object.defineProperty({__proto__:null,ApiError:sa,adminApi:Bt,auth:rt,claws:ct,clearSession:Os,executions:ia,getTenantId:Gn,getTenantToken:at,getUser:Qn,getWebToken:Xt,llm:Ws,marketplace:qs,projects:Ct,setTenantId:Ns,setTenantToken:Ms,setUser:Yn,setWebToken:Jn,skillAssignments:qe,tasks:ot,tenants:St},Symbol.toStringTag,{value:"Module"}));var to=Object.defineProperty,eo=Object.getOwnPropertyDescriptor,pe=(t,e,s,a)=>{for(var i=a>1?void 0:a?eo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&to(e,s,i),i};let Zt=class extends F{constructor(){super(...arguments),this.currentPm="npm",this.currentMode="oneliner",this.currentHackable="installer",this.currentBeta=!1,this.osPickerExpanded=!1,this.currentWinShell="powershell",this.copiedCommand=null,this.comments={oneliner:{stable:"# Works everywhere. Installs everything. You're welcome. 🦞",beta:"# Living on the edge. Bugs are features you found first. 🦞"},quickInstall:{stable:"# Install CoderClaw",beta:"# Install CoderClaw (beta) — Fresh from the lab 🧪"},quickOnboard:{stable:"# Meet your lobster",beta:"# Meet your experimental lobster"}},this.windowsPsCmd="iwr -useb https://coderclaw.ai/install.ps1 | iex",this.windowsPsBetaCmd="& ([scriptblock]::Create((iwr -useb https://coderclaw.ai/install.ps1))) -Tag beta",this.windowsCmdCmd="curl -fsSL https://coderclaw.ai/install.cmd -o install.cmd && install.cmd && del install.cmd",this.windowsCmdBetaCmd="curl -fsSL https://coderclaw.ai/install.cmd -o install.cmd && install.cmd --tag beta && del install.cmd",this._selectedOs=this.currentOs}createRenderRoot(){return this}get currentOs(){return navigator.userAgentData?.platform==="Windows"||navigator.userAgent.toLowerCase().includes("windows")?"windows":"unix"}get selectedOs(){return this._selectedOs}set selectedOs(t){this._selectedOs=t}get osLabel(){return this.selectedOs==="windows"?"Windows":"macOS/Linux"}get betaMode(){return this.currentBeta?"beta":"stable"}get onelinerCommand(){return this.selectedOs==="unix"?this.currentBeta?"curl -fsSL https://coderclaw.ai/install.sh | bash -s -- --beta":"curl -fsSL https://coderclaw.ai/install.sh | bash":this.currentWinShell==="cmd"?this.currentBeta?this.windowsCmdBetaCmd:this.windowsCmdCmd:this.currentBeta?this.windowsPsBetaCmd:this.windowsPsCmd}get quickInstallCommand(){const t=this.currentBeta?"@beta":"";return this.currentPm==="npm"?`npm i -g coderclaw${t}`:`pnpm add -g coderclaw${t}`}async copyCommand(t,e){let s=!1;try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(e),s=!0;else{const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a);try{a.select(),s=document.execCommand("copy")}finally{a.remove()}}}catch{s=!1}s&&(this.copiedCommand=t,window.setTimeout(()=>{this.copiedCommand===t&&(this.copiedCommand=null)},2e3))}renderCopyButton(t,e){const s=this.copiedCommand===t;return o`
      <button class="copy-line-btn ${s?"copied":""}" @click=${()=>this.copyCommand(t,e)} title="Copy">
        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style=${s?"display:none":""}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style=${s?"display:block":"display:none"}><polyline points="20 6 9 17 4 12"/></svg>
      </button>
    `}render(){const t=this.currentMode==="oneliner",e=this.currentMode==="quick",s=this.currentMode==="hackable",a=this.currentMode==="oneliner"||this.currentMode==="quick",i=t&&this.selectedOs==="windows";return o`
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

            <div class="win-shell-switch" style=${i?"display:flex":"display:none"}>
              <button class="win-shell-btn ${this.currentWinShell==="powershell"?"active":""}" @click=${()=>{this.currentWinShell="powershell"}}>PowerShell</button>
              <button class="win-shell-btn ${this.currentWinShell==="cmd"?"active":""}" @click=${()=>{this.currentWinShell="cmd"}}>CMD</button>
            </div>

            <div class="beta-switch" style=${a?"display:flex":"display:none"}>
              <button class="beta-btn ${this.currentBeta?"active":""}" @click=${()=>{this.currentBeta=!this.currentBeta}}>
                <span class="beta-label">β</span>
                <span class="beta-text">Beta</span>
              </button>
            </div>

            <div class="switch-placeholder" style=${!t&&!e&&!s&&!a?"display:block":"display:none"} aria-hidden="true"></div>
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
    `}};pe([d()],Zt.prototype,"currentPm",2);pe([d()],Zt.prototype,"currentMode",2);pe([d()],Zt.prototype,"currentHackable",2);pe([d()],Zt.prototype,"currentBeta",2);pe([d()],Zt.prototype,"osPickerExpanded",2);pe([d()],Zt.prototype,"currentWinShell",2);pe([d()],Zt.prototype,"copiedCommand",2);Zt=pe([J("ccl-quickstart")],Zt);var so=Object.defineProperty,io=Object.getOwnPropertyDescriptor,$t=(t,e,s,a)=>{for(var i=a>1?void 0:a?io(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&so(e,s,i),i};let ft=class extends F{constructor(){super(...arguments),this.mode="login",this.email="",this.username="",this.password="",this.loading=!1,this.error="",this.mfaStep=!1,this.mfaToken="",this.mfaCode="",this.recoveryCode="",this.mfaMethod="totp",this.pendingUser=null,this.showRegisterQuickstart=!1,this.checkingQuickstartVisibility=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.refreshRegisterQuickstartVisibility()}updated(t){t.has("mode")&&this.refreshRegisterQuickstartVisibility()}async refreshRegisterQuickstartVisibility(){if(this.mode!=="register"){this.showRegisterQuickstart=!1;return}if(!this.checkingQuickstartVisibility){this.checkingQuickstartVisibility=!0;try{const t=await ct.list();this.showRegisterQuickstart=t.length===0}catch{this.showRegisterQuickstart=!0}finally{this.checkingQuickstartVisibility=!1}}}async submit(t){if(t.preventDefault(),!(!this.email||!this.password)){this.loading=!0,this.error="";try{const e=this.mode==="login"?await rt.login(this.email,this.password,"Web App"):await rt.register(this.email,this.username||this.email.split("@")[0],this.password);if(this.mode==="login"&&e.mfaRequired){const s=e;this.mfaStep=!0,this.mfaToken=s.mfaToken,this.pendingUser=s.user,this.mfaCode="",this.recoveryCode="";return}this.dispatchEvent(new CustomEvent(this.mode==="register"?"register":"login",{detail:{token:e.token,user:e.user},bubbles:!0,composed:!0}))}catch(e){this.error=e.message??"An error occurred"}finally{this.loading=!1}}}async submitMfa(t){if(t.preventDefault(),!!this.mfaToken&&!(this.mfaMethod==="totp"&&!this.mfaCode.trim())&&!(this.mfaMethod==="recovery"&&!this.recoveryCode.trim())){this.loading=!0,this.error="";try{const e=await rt.loginMfa(this.mfaToken,{code:this.mfaMethod==="totp"?this.mfaCode.trim():void 0,recoveryCode:this.mfaMethod==="recovery"?this.recoveryCode.trim():void 0,sessionName:"Web App"});this.dispatchEvent(new CustomEvent("login",{detail:{token:e.token,user:e.user},bubbles:!0,composed:!0}))}catch(e){this.error=e.message??"MFA verification failed"}finally{this.loading=!1}}}resetMfaStep(){this.mfaStep=!1,this.mfaToken="",this.mfaCode="",this.recoveryCode="",this.mfaMethod="totp",this.pendingUser=null}render(){return o`
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
    `}};$t([d()],ft.prototype,"mode",2);$t([d()],ft.prototype,"email",2);$t([d()],ft.prototype,"username",2);$t([d()],ft.prototype,"password",2);$t([d()],ft.prototype,"loading",2);$t([d()],ft.prototype,"error",2);$t([d()],ft.prototype,"mfaStep",2);$t([d()],ft.prototype,"mfaToken",2);$t([d()],ft.prototype,"mfaCode",2);$t([d()],ft.prototype,"recoveryCode",2);$t([d()],ft.prototype,"mfaMethod",2);$t([d()],ft.prototype,"pendingUser",2);$t([d()],ft.prototype,"showRegisterQuickstart",2);$t([d()],ft.prototype,"checkingQuickstartVisibility",2);ft=$t([J("ccl-auth")],ft);var ao=Object.defineProperty,no=Object.getOwnPropertyDescriptor,Ee=(t,e,s,a)=>{for(var i=a>1?void 0:a?no(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&ao(e,s,i),i};let ce=class extends F{constructor(){super(...arguments),this.tenants=[],this.user=null,this.showCreate=!1,this.newName="",this.creating=!1,this.error=""}createRenderRoot(){return this}selectTenant(t){this.dispatchEvent(new CustomEvent("select-tenant",{detail:t,bubbles:!0,composed:!0}))}async createTenant(t){if(t.preventDefault(),!!this.newName.trim()){this.creating=!0,this.error="";try{this.dispatchEvent(new CustomEvent("create-tenant",{detail:{name:this.newName.trim()},bubbles:!0,composed:!0}))}catch(e){this.error=e.message,this.creating=!1}}}signOut(){this.dispatchEvent(new CustomEvent("sign-out",{bubbles:!0,composed:!0}))}render(){return o`
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
    `}};Ee([B({type:Array})],ce.prototype,"tenants",2);Ee([B({type:Object})],ce.prototype,"user",2);Ee([d()],ce.prototype,"showCreate",2);Ee([d()],ce.prototype,"newName",2);Ee([d()],ce.prototype,"creating",2);Ee([d()],ce.prototype,"error",2);ce=Ee([J("ccl-workspace-picker")],ce);var ro=Object.defineProperty,oo=Object.getOwnPropertyDescriptor,He=(t,e,s,a)=>{for(var i=a>1?void 0:a?oo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&ro(e,s,i),i};let xe=class extends F{constructor(){super(...arguments),this.tenantId="",this.projects=[],this.claws=[],this.loading=!0,this.prompt=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([Ct.list().catch(()=>[]),ct.list().catch(()=>[])]);this.projects=t,this.claws=e}finally{this.loading=!1}}dispatch(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e??{}}))}handlePrompt(t){t.preventDefault();const e=this.prompt.trim();e&&(this.dispatch("ccl:dashboard-prompt",{prompt:e}),this.prompt="")}statusBadge(t){return o`<span class="badge ${{active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"}[t]??"badge-gray"}">${t.replace("_"," ")}</span>`}render(){const t=this.claws.filter(e=>e.connectedAt);return o`
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
    `}};He([B()],xe.prototype,"tenantId",2);He([d()],xe.prototype,"projects",2);He([d()],xe.prototype,"claws",2);He([d()],xe.prototype,"loading",2);He([d()],xe.prototype,"prompt",2);xe=He([J("ccl-dashboard")],xe);const lo={CHILD:2},co=t=>(...e)=>({_$litDirective$:t,values:e});class ho{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,a){this._$Ct=e,this._$AM=s,this._$Ci=a}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}}class Ni extends ho{constructor(e){if(super(e),this.it=it,e.type!==lo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===it||e==null)return this._t=void 0,this.it=e;if(e===ke)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const s=[e];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}Ni.directiveName="unsafeHTML",Ni.resultType=1;const Xn=co(Ni);function aa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ae=aa();function Zn(t){Ae=t}var ye={exec:()=>null};function U(t,e=""){let s=typeof t=="string"?t:t.source,a={replace:(i,n)=>{let r=typeof n=="string"?n:n.source;return r=r.replace(bt.caret,"$1"),s=s.replace(i,r),a},getRegex:()=>new RegExp(s,e)};return a}var po=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),bt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}>`)},uo=/^(?:[ \t]*(?:\n|$))+/,go=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,mo=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,us=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,fo=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,na=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,tr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,er=U(tr).replace(/bull/g,na).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),vo=U(tr).replace(/bull/g,na).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ra=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,bo=/^[^\n]+/,oa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,yo=U(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",oa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),wo=U(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,na).getRegex(),Hs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",la=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,$o=U("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",la).replace("tag",Hs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),sr=U(ra).replace("hr",us).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hs).getRegex(),ko=U(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",sr).getRegex(),ca={blockquote:ko,code:go,def:yo,fences:mo,heading:fo,hr:us,html:$o,lheading:er,list:wo,newline:uo,paragraph:sr,table:ye,text:bo},Ha=U("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",us).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hs).getRegex(),xo={...ca,lheading:vo,table:Ha,paragraph:U(ra).replace("hr",us).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ha).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hs).getRegex()},Co={...ca,html:U(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",la).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ye,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:U(ra).replace("hr",us).replace("heading",` *#{1,6} *[^
]`).replace("lheading",er).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},To=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,So=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ir=/^( {2,}|\\)\n(?!\s*$)/,Eo=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ks=/[\p{P}\p{S}]/u,da=/[\s\p{P}\p{S}]/u,ar=/[^\s\p{P}\p{S}]/u,Ao=U(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,da).getRegex(),nr=/(?!~)[\p{P}\p{S}]/u,_o=/(?!~)[\s\p{P}\p{S}]/u,Po=/(?:[^\s\p{P}\p{S}]|~)/u,rr=/(?![*_])[\p{P}\p{S}]/u,Io=/(?![*_])[\s\p{P}\p{S}]/u,Ro=/(?:[^\s\p{P}\p{S}]|[*_])/u,Do=U(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",po?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),or=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Lo=U(or,"u").replace(/punct/g,Ks).getRegex(),Mo=U(or,"u").replace(/punct/g,nr).getRegex(),lr="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",No=U(lr,"gu").replace(/notPunctSpace/g,ar).replace(/punctSpace/g,da).replace(/punct/g,Ks).getRegex(),Oo=U(lr,"gu").replace(/notPunctSpace/g,Po).replace(/punctSpace/g,_o).replace(/punct/g,nr).getRegex(),jo=U("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ar).replace(/punctSpace/g,da).replace(/punct/g,Ks).getRegex(),Bo=U(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,rr).getRegex(),Uo="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",zo=U(Uo,"gu").replace(/notPunctSpace/g,Ro).replace(/punctSpace/g,Io).replace(/punct/g,rr).getRegex(),Fo=U(/\\(punct)/,"gu").replace(/punct/g,Ks).getRegex(),qo=U(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Wo=U(la).replace("(?:-->|$)","-->").getRegex(),Ho=U("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Wo).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),js=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ko=U(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",js).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),cr=U(/^!?\[(label)\]\[(ref)\]/).replace("label",js).replace("ref",oa).getRegex(),dr=U(/^!?\[(ref)\](?:\[\])?/).replace("ref",oa).getRegex(),Vo=U("reflink|nolink(?!\\()","g").replace("reflink",cr).replace("nolink",dr).getRegex(),Ka=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ha={_backpedal:ye,anyPunctuation:Fo,autolink:qo,blockSkip:Do,br:ir,code:So,del:ye,delLDelim:ye,delRDelim:ye,emStrongLDelim:Lo,emStrongRDelimAst:No,emStrongRDelimUnd:jo,escape:To,link:Ko,nolink:dr,punctuation:Ao,reflink:cr,reflinkSearch:Vo,tag:Ho,text:Eo,url:ye},Go={...ha,link:U(/^!?\[(label)\]\((.*?)\)/).replace("label",js).getRegex(),reflink:U(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",js).getRegex()},Oi={...ha,emStrongRDelimAst:Oo,emStrongLDelim:Mo,delLDelim:Bo,delRDelim:zo,url:U(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ka).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:U(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ka).getRegex()},Jo={...Oi,br:U(ir).replace("{2,}","*").getRegex(),text:U(Oi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ks={normal:ca,gfm:xo,pedantic:Co},Ze={normal:ha,gfm:Oi,breaks:Jo,pedantic:Go},Yo={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Va=t=>Yo[t];function Ut(t,e){if(e){if(bt.escapeTest.test(t))return t.replace(bt.escapeReplace,Va)}else if(bt.escapeTestNoEncode.test(t))return t.replace(bt.escapeReplaceNoEncode,Va);return t}function Ga(t){try{t=encodeURI(t).replace(bt.percentDecode,"%")}catch{return null}return t}function Ja(t,e){let s=t.replace(bt.findPipe,(n,r,c)=>{let l=!1,u=r;for(;--u>=0&&c[u]==="\\";)l=!l;return l?"|":" |"}),a=s.split(bt.splitPipe),i=0;if(a[0].trim()||a.shift(),a.length>0&&!a.at(-1)?.trim()&&a.pop(),e)if(a.length>e)a.splice(e);else for(;a.length<e;)a.push("");for(;i<a.length;i++)a[i]=a[i].trim().replace(bt.slashPipe,"|");return a}function ts(t,e,s){let a=t.length;if(a===0)return"";let i=0;for(;i<a&&t.charAt(a-i-1)===e;)i++;return t.slice(0,a-i)}function Qo(t,e){if(t.indexOf(e[1])===-1)return-1;let s=0;for(let a=0;a<t.length;a++)if(t[a]==="\\")a++;else if(t[a]===e[0])s++;else if(t[a]===e[1]&&(s--,s<0))return a;return s>0?-2:-1}function Xo(t,e=0){let s=e,a="";for(let i of t)if(i==="	"){let n=4-s%4;a+=" ".repeat(n),s+=n}else a+=i,s++;return a}function Ya(t,e,s,a,i){let n=e.href,r=e.title||null,c=t[1].replace(i.other.outputLinkReplace,"$1");a.state.inLink=!0;let l={type:t[0].charAt(0)==="!"?"image":"link",raw:s,href:n,title:r,text:c,tokens:a.inlineTokens(c)};return a.state.inLink=!1,l}function Zo(t,e,s){let a=t.match(s.other.indentCodeCompensation);if(a===null)return e;let i=a[1];return e.split(`
`).map(n=>{let r=n.match(s.other.beginningSpace);if(r===null)return n;let[c]=r;return c.length>=i.length?n.slice(i.length):n}).join(`
`)}var Bs=class{options;rules;lexer;constructor(t){this.options=t||Ae}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let s=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?s:ts(s,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let s=e[0],a=Zo(s,e[3]||"",this.rules);return{type:"code",raw:s,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:a}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let s=e[2].trim();if(this.rules.other.endingHash.test(s)){let a=ts(s,"#");(this.options.pedantic||!a||this.rules.other.endingSpaceChar.test(a))&&(s=a.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:ts(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let s=ts(e[0],`
`).split(`
`),a="",i="",n=[];for(;s.length>0;){let r=!1,c=[],l;for(l=0;l<s.length;l++)if(this.rules.other.blockquoteStart.test(s[l]))c.push(s[l]),r=!0;else if(!r)c.push(s[l]);else break;s=s.slice(l);let u=c.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");a=a?`${a}
${u}`:u,i=i?`${i}
${p}`:p;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,n,!0),this.lexer.state.top=m,s.length===0)break;let g=n.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let f=g,b=f.raw+`
`+s.join(`
`),C=this.blockquote(b);n[n.length-1]=C,a=a.substring(0,a.length-f.raw.length)+C.raw,i=i.substring(0,i.length-f.text.length)+C.text;break}else if(g?.type==="list"){let f=g,b=f.raw+`
`+s.join(`
`),C=this.list(b);n[n.length-1]=C,a=a.substring(0,a.length-g.raw.length)+C.raw,i=i.substring(0,i.length-f.raw.length)+C.raw,s=b.substring(n.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:a,tokens:n,text:i}}}list(t){let e=this.rules.block.list.exec(t);if(e){let s=e[1].trim(),a=s.length>1,i={type:"list",raw:"",ordered:a,start:a?+s.slice(0,-1):"",loose:!1,items:[]};s=a?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=a?s:"[*+-]");let n=this.rules.other.listItemRegex(s),r=!1;for(;t;){let l=!1,u="",p="";if(!(e=n.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let m=Xo(e[2].split(`
`,1)[0],e[1].length),g=t.split(`
`,1)[0],f=!m.trim(),b=0;if(this.options.pedantic?(b=2,p=m.trimStart()):f?b=e[1].length+1:(b=m.search(this.rules.other.nonSpaceChar),b=b>4?1:b,p=m.slice(b),b+=e[1].length),f&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,t=t.substring(g.length+1),l=!0),!l){let C=this.rules.other.nextBulletRegex(b),H=this.rules.other.hrRegex(b),R=this.rules.other.fencesBeginRegex(b),N=this.rules.other.headingBeginRegex(b),P=this.rules.other.htmlBeginRegex(b),$=this.rules.other.blockquoteBeginRegex(b);for(;t;){let q=t.split(`
`,1)[0],w;if(g=q,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),w=g):w=g.replace(this.rules.other.tabCharGlobal,"    "),R.test(g)||N.test(g)||P.test(g)||$.test(g)||C.test(g)||H.test(g))break;if(w.search(this.rules.other.nonSpaceChar)>=b||!g.trim())p+=`
`+w.slice(b);else{if(f||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(m)||N.test(m)||H.test(m))break;p+=`
`+g}f=!g.trim(),u+=q+`
`,t=t.substring(q.length+1),m=w.slice(b)}}i.loose||(r?i.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(r=!0)),i.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),i.raw+=u}let c=i.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let l of i.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,i.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!i.loose){let u=l.tokens.filter(m=>m.type==="space"),p=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));i.loose=p}}if(i.loose)for(let l of i.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return i}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let s=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),a=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:s,raw:e[0],href:a,title:i}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let s=Ja(e[1]),a=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],n={type:"table",raw:e[0],header:[],align:[],rows:[]};if(s.length===a.length){for(let r of a)this.rules.other.tableAlignRight.test(r)?n.align.push("right"):this.rules.other.tableAlignCenter.test(r)?n.align.push("center"):this.rules.other.tableAlignLeft.test(r)?n.align.push("left"):n.align.push(null);for(let r=0;r<s.length;r++)n.header.push({text:s[r],tokens:this.lexer.inline(s[r]),header:!0,align:n.align[r]});for(let r of i)n.rows.push(Ja(r,n.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:n.align[l]})));return n}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let s=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:s,tokens:this.lexer.inline(s)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let s=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(s)){if(!this.rules.other.endAngleBracket.test(s))return;let n=ts(s.slice(0,-1),"\\");if((s.length-n.length)%2===0)return}else{let n=Qo(e[2],"()");if(n===-2)return;if(n>-1){let r=(e[0].indexOf("!")===0?5:4)+e[1].length+n;e[2]=e[2].substring(0,n),e[0]=e[0].substring(0,r).trim(),e[3]=""}}let a=e[2],i="";if(this.options.pedantic){let n=this.rules.other.pedanticHrefTitle.exec(a);n&&(a=n[1],i=n[3])}else i=e[3]?e[3].slice(1,-1):"";return a=a.trim(),this.rules.other.startAngleBracket.test(a)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(s)?a=a.slice(1):a=a.slice(1,-1)),Ya(e,{href:a&&a.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let s;if((s=this.rules.inline.reflink.exec(t))||(s=this.rules.inline.nolink.exec(t))){let a=(s[2]||s[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=e[a.toLowerCase()];if(!i){let n=s[0].charAt(0);return{type:"text",raw:n,text:n}}return Ya(s,i,s[0],this.lexer,this.rules)}}emStrong(t,e,s=""){let a=this.rules.inline.emStrongLDelim.exec(t);if(!(!a||a[3]&&s.match(this.rules.other.unicodeAlphaNumeric))&&(!(a[1]||a[2])||!s||this.rules.inline.punctuation.exec(s))){let i=[...a[0]].length-1,n,r,c=i,l=0,u=a[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+i);(a=u.exec(e))!=null;){if(n=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!n)continue;if(r=[...n].length,a[3]||a[4]){c+=r;continue}else if((a[5]||a[6])&&i%3&&!((i+r)%3)){l+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+l);let p=[...a[0]][0].length,m=t.slice(0,i+a.index+p+r);if(Math.min(i,r)%2){let f=m.slice(1,-1);return{type:"em",raw:m,text:f,tokens:this.lexer.inlineTokens(f)}}let g=m.slice(2,-2);return{type:"strong",raw:m,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let s=e[2].replace(this.rules.other.newLineCharGlobal," "),a=this.rules.other.nonSpaceChar.test(s),i=this.rules.other.startingSpaceChar.test(s)&&this.rules.other.endingSpaceChar.test(s);return a&&i&&(s=s.substring(1,s.length-1)),{type:"codespan",raw:e[0],text:s}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t,e,s=""){let a=this.rules.inline.delLDelim.exec(t);if(a&&(!a[1]||!s||this.rules.inline.punctuation.exec(s))){let i=[...a[0]].length-1,n,r,c=i,l=this.rules.inline.delRDelim;for(l.lastIndex=0,e=e.slice(-1*t.length+i);(a=l.exec(e))!=null;){if(n=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!n||(r=[...n].length,r!==i))continue;if(a[3]||a[4]){c+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c);let u=[...a[0]][0].length,p=t.slice(0,i+a.index+u+r),m=p.slice(i,-i);return{type:"del",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let s,a;return e[2]==="@"?(s=e[1],a="mailto:"+s):(s=e[1],a=s),{type:"link",raw:e[0],text:s,href:a,tokens:[{type:"text",raw:s,text:s}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let s,a;if(e[2]==="@")s=e[0],a="mailto:"+s;else{let i;do i=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(i!==e[0]);s=e[0],e[1]==="www."?a="http://"+e[0]:a=e[0]}return{type:"link",raw:e[0],text:s,href:a,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let s=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:s}}}},Pt=class ji{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ae,this.options.tokenizer=this.options.tokenizer||new Bs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let s={other:bt,block:ks.normal,inline:Ze.normal};this.options.pedantic?(s.block=ks.pedantic,s.inline=Ze.pedantic):this.options.gfm&&(s.block=ks.gfm,this.options.breaks?s.inline=Ze.breaks:s.inline=Ze.gfm),this.tokenizer.rules=s}static get rules(){return{block:ks,inline:Ze}}static lex(e,s){return new ji(s).lex(e)}static lexInline(e,s){return new ji(s).inlineTokens(e)}lex(e){e=e.replace(bt.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let s=0;s<this.inlineQueue.length;s++){let a=this.inlineQueue[s];this.inlineTokens(a.src,a.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,s=[],a=!1){for(this.options.pedantic&&(e=e.replace(bt.tabCharGlobal,"    ").replace(bt.spaceLine,""));e;){let i;if(this.options.extensions?.block?.some(r=>(i=r.call({lexer:this},e,s))?(e=e.substring(i.raw.length),s.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let r=s.at(-1);i.raw.length===1&&r!==void 0?r.raw+=`
`:s.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let r=s.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.at(-1).src=r.text):s.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let r=s.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.raw,this.inlineQueue.at(-1).src=r.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},s.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),s.push(i);continue}let n=e;if(this.options.extensions?.startBlock){let r=1/0,c=e.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},c),typeof l=="number"&&l>=0&&(r=Math.min(r,l))}),r<1/0&&r>=0&&(n=e.substring(0,r+1))}if(this.state.top&&(i=this.tokenizer.paragraph(n))){let r=s.at(-1);a&&r?.type==="paragraph"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):s.push(i),a=n.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let r=s.at(-1);r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):s.push(i);continue}if(e){let r="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(r);break}else throw new Error(r)}}return this.state.top=!0,s}inline(e,s=[]){return this.inlineQueue.push({src:e,tokens:s}),s}inlineTokens(e,s=[]){let a=e,i=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,i.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let n;for(;(i=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)n=i[2]?i[2].length:0,a=a.slice(0,i.index+n)+"["+"a".repeat(i[0].length-n-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);a=this.options.hooks?.emStrongMask?.call({lexer:this},a)??a;let r=!1,c="";for(;e;){r||(c=""),r=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},e,s))?(e=e.substring(l.raw.length),s.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let p=s.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):s.push(l);continue}if(l=this.tokenizer.emStrong(e,a,c)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.del(e,a,c)){e=e.substring(l.raw.length),s.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),s.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),s.push(l);continue}let u=e;if(this.options.extensions?.startInline){let p=1/0,m=e.slice(1),g;this.options.extensions.startInline.forEach(f=>{g=f.call({lexer:this},m),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(u=e.substring(0,p+1))}if(l=this.tokenizer.inlineText(u)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(c=l.raw.slice(-1)),r=!0;let p=s.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):s.push(l);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return s}},Us=class{options;parser;constructor(t){this.options=t||Ae}space(t){return""}code({text:t,lang:e,escaped:s}){let a=(e||"").match(bt.notSpaceStart)?.[0],i=t.replace(bt.endingNewline,"")+`
`;return a?'<pre><code class="language-'+Ut(a)+'">'+(s?i:Ut(i,!0))+`</code></pre>
`:"<pre><code>"+(s?i:Ut(i,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,s=t.start,a="";for(let r=0;r<t.items.length;r++){let c=t.items[r];a+=this.listitem(c)}let i=e?"ol":"ul",n=e&&s!==1?' start="'+s+'"':"";return"<"+i+n+`>
`+a+"</"+i+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",s="";for(let i=0;i<t.header.length;i++)s+=this.tablecell(t.header[i]);e+=this.tablerow({text:s});let a="";for(let i=0;i<t.rows.length;i++){let n=t.rows[i];s="";for(let r=0;r<n.length;r++)s+=this.tablecell(n[r]);a+=this.tablerow({text:s})}return a&&(a=`<tbody>${a}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+a+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),s=t.header?"th":"td";return(t.align?`<${s} align="${t.align}">`:`<${s}>`)+e+`</${s}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${Ut(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:s}){let a=this.parser.parseInline(s),i=Ga(t);if(i===null)return a;t=i;let n='<a href="'+t+'"';return e&&(n+=' title="'+Ut(e)+'"'),n+=">"+a+"</a>",n}image({href:t,title:e,text:s,tokens:a}){a&&(s=this.parser.parseInline(a,this.parser.textRenderer));let i=Ga(t);if(i===null)return Ut(s);t=i;let n=`<img src="${t}" alt="${Ut(s)}"`;return e&&(n+=` title="${Ut(e)}"`),n+=">",n}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:Ut(t.text)}},pa=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},It=class Bi{options;renderer;textRenderer;constructor(e){this.options=e||Ae,this.options.renderer=this.options.renderer||new Us,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new pa}static parse(e,s){return new Bi(s).parse(e)}static parseInline(e,s){return new Bi(s).parseInline(e)}parse(e){let s="";for(let a=0;a<e.length;a++){let i=e[a];if(this.options.extensions?.renderers?.[i.type]){let r=i,c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(r.type)){s+=c||"";continue}}let n=i;switch(n.type){case"space":{s+=this.renderer.space(n);break}case"hr":{s+=this.renderer.hr(n);break}case"heading":{s+=this.renderer.heading(n);break}case"code":{s+=this.renderer.code(n);break}case"table":{s+=this.renderer.table(n);break}case"blockquote":{s+=this.renderer.blockquote(n);break}case"list":{s+=this.renderer.list(n);break}case"checkbox":{s+=this.renderer.checkbox(n);break}case"html":{s+=this.renderer.html(n);break}case"def":{s+=this.renderer.def(n);break}case"paragraph":{s+=this.renderer.paragraph(n);break}case"text":{s+=this.renderer.text(n);break}default:{let r='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return s}parseInline(e,s=this.renderer){let a="";for(let i=0;i<e.length;i++){let n=e[i];if(this.options.extensions?.renderers?.[n.type]){let c=this.options.extensions.renderers[n.type].call({parser:this},n);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(n.type)){a+=c||"";continue}}let r=n;switch(r.type){case"escape":{a+=s.text(r);break}case"html":{a+=s.html(r);break}case"link":{a+=s.link(r);break}case"image":{a+=s.image(r);break}case"checkbox":{a+=s.checkbox(r);break}case"strong":{a+=s.strong(r);break}case"em":{a+=s.em(r);break}case"codespan":{a+=s.codespan(r);break}case"br":{a+=s.br(r);break}case"del":{a+=s.del(r);break}case"text":{a+=s.text(r);break}default:{let c='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return a}},ls=class{options;block;constructor(t){this.options=t||Ae}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Pt.lex:Pt.lexInline}provideParser(){return this.block?It.parse:It.parseInline}},tl=class{defaults=aa();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=It;Renderer=Us;TextRenderer=pa;Lexer=Pt;Tokenizer=Bs;Hooks=ls;constructor(...t){this.use(...t)}walkTokens(t,e){let s=[];for(let a of t)switch(s=s.concat(e.call(this,a)),a.type){case"table":{let i=a;for(let n of i.header)s=s.concat(this.walkTokens(n.tokens,e));for(let n of i.rows)for(let r of n)s=s.concat(this.walkTokens(r.tokens,e));break}case"list":{let i=a;s=s.concat(this.walkTokens(i.items,e));break}default:{let i=a;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(n=>{let r=i[n].flat(1/0);s=s.concat(this.walkTokens(r,e))}):i.tokens&&(s=s.concat(this.walkTokens(i.tokens,e)))}}return s}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(s=>{let a={...s};if(a.async=this.defaults.async||a.async||!1,s.extensions&&(s.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let n=e.renderers[i.name];n?e.renderers[i.name]=function(...r){let c=i.renderer.apply(this,r);return c===!1&&(c=n.apply(this,r)),c}:e.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let n=e[i.level];n?n.unshift(i.tokenizer):e[i.level]=[i.tokenizer],i.start&&(i.level==="block"?e.startBlock?e.startBlock.push(i.start):e.startBlock=[i.start]:i.level==="inline"&&(e.startInline?e.startInline.push(i.start):e.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(e.childTokens[i.name]=i.childTokens)}),a.extensions=e),s.renderer){let i=this.defaults.renderer||new Us(this.defaults);for(let n in s.renderer){if(!(n in i))throw new Error(`renderer '${n}' does not exist`);if(["options","parser"].includes(n))continue;let r=n,c=s.renderer[r],l=i[r];i[r]=(...u)=>{let p=c.apply(i,u);return p===!1&&(p=l.apply(i,u)),p||""}}a.renderer=i}if(s.tokenizer){let i=this.defaults.tokenizer||new Bs(this.defaults);for(let n in s.tokenizer){if(!(n in i))throw new Error(`tokenizer '${n}' does not exist`);if(["options","rules","lexer"].includes(n))continue;let r=n,c=s.tokenizer[r],l=i[r];i[r]=(...u)=>{let p=c.apply(i,u);return p===!1&&(p=l.apply(i,u)),p}}a.tokenizer=i}if(s.hooks){let i=this.defaults.hooks||new ls;for(let n in s.hooks){if(!(n in i))throw new Error(`hook '${n}' does not exist`);if(["options","block"].includes(n))continue;let r=n,c=s.hooks[r],l=i[r];ls.passThroughHooks.has(n)?i[r]=u=>{if(this.defaults.async&&ls.passThroughHooksRespectAsync.has(n))return(async()=>{let m=await c.call(i,u);return l.call(i,m)})();let p=c.call(i,u);return l.call(i,p)}:i[r]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await c.apply(i,u);return m===!1&&(m=await l.apply(i,u)),m})();let p=c.apply(i,u);return p===!1&&(p=l.apply(i,u)),p}}a.hooks=i}if(s.walkTokens){let i=this.defaults.walkTokens,n=s.walkTokens;a.walkTokens=function(r){let c=[];return c.push(n.call(this,r)),i&&(c=c.concat(i.call(this,r))),c}}this.defaults={...this.defaults,...a}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Pt.lex(t,e??this.defaults)}parser(t,e){return It.parse(t,e??this.defaults)}parseMarkdown(t){return(e,s)=>{let a={...s},i={...this.defaults,...a},n=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&a.async===!1)return n(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return n(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return n(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=t),i.async)return(async()=>{let r=i.hooks?await i.hooks.preprocess(e):e,c=await(i.hooks?await i.hooks.provideLexer():t?Pt.lex:Pt.lexInline)(r,i),l=i.hooks?await i.hooks.processAllTokens(c):c;i.walkTokens&&await Promise.all(this.walkTokens(l,i.walkTokens));let u=await(i.hooks?await i.hooks.provideParser():t?It.parse:It.parseInline)(l,i);return i.hooks?await i.hooks.postprocess(u):u})().catch(n);try{i.hooks&&(e=i.hooks.preprocess(e));let r=(i.hooks?i.hooks.provideLexer():t?Pt.lex:Pt.lexInline)(e,i);i.hooks&&(r=i.hooks.processAllTokens(r)),i.walkTokens&&this.walkTokens(r,i.walkTokens);let c=(i.hooks?i.hooks.provideParser():t?It.parse:It.parseInline)(r,i);return i.hooks&&(c=i.hooks.postprocess(c)),c}catch(r){return n(r)}}}onError(t,e){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let a="<p>An error occurred:</p><pre>"+Ut(s.message+"",!0)+"</pre>";return e?Promise.resolve(a):a}if(e)return Promise.reject(s);throw s}}},Ce=new tl;function z(t,e){return Ce.parse(t,e)}z.options=z.setOptions=function(t){return Ce.setOptions(t),z.defaults=Ce.defaults,Zn(z.defaults),z};z.getDefaults=aa;z.defaults=Ae;z.use=function(...t){return Ce.use(...t),z.defaults=Ce.defaults,Zn(z.defaults),z};z.walkTokens=function(t,e){return Ce.walkTokens(t,e)};z.parseInline=Ce.parseInline;z.Parser=It;z.parser=It.parse;z.Renderer=Us;z.TextRenderer=pa;z.Lexer=Pt;z.lexer=Pt.lex;z.Tokenizer=Bs;z.Hooks=ls;z.parse=z;z.options;z.setOptions;z.use;z.walkTokens;z.parseInline;It.parse;Pt.lex;const{entries:hr,setPrototypeOf:Qa,isFrozen:el,getPrototypeOf:sl,getOwnPropertyDescriptor:il}=Object;let{freeze:yt,seal:Et,create:Ui}=Object,{apply:zi,construct:Fi}=typeof Reflect<"u"&&Reflect;yt||(yt=function(e){return e});Et||(Et=function(e){return e});zi||(zi=function(e,s){for(var a=arguments.length,i=new Array(a>2?a-2:0),n=2;n<a;n++)i[n-2]=arguments[n];return e.apply(s,i)});Fi||(Fi=function(e){for(var s=arguments.length,a=new Array(s>1?s-1:0),i=1;i<s;i++)a[i-1]=arguments[i];return new e(...a)});const xs=wt(Array.prototype.forEach),al=wt(Array.prototype.lastIndexOf),Xa=wt(Array.prototype.pop),es=wt(Array.prototype.push),nl=wt(Array.prototype.splice),Is=wt(String.prototype.toLowerCase),ri=wt(String.prototype.toString),oi=wt(String.prototype.match),ss=wt(String.prototype.replace),rl=wt(String.prototype.indexOf),ol=wt(String.prototype.trim),_t=wt(Object.prototype.hasOwnProperty),vt=wt(RegExp.prototype.test),is=ll(TypeError);function wt(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var s=arguments.length,a=new Array(s>1?s-1:0),i=1;i<s;i++)a[i-1]=arguments[i];return zi(t,e,a)}}function ll(t){return function(){for(var e=arguments.length,s=new Array(e),a=0;a<e;a++)s[a]=arguments[a];return Fi(t,s)}}function j(t,e){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Is;Qa&&Qa(t,null);let a=e.length;for(;a--;){let i=e[a];if(typeof i=="string"){const n=s(i);n!==i&&(el(e)||(e[a]=n),i=n)}t[i]=!0}return t}function cl(t){for(let e=0;e<t.length;e++)_t(t,e)||(t[e]=null);return t}function zt(t){const e=Ui(null);for(const[s,a]of hr(t))_t(t,s)&&(Array.isArray(a)?e[s]=cl(a):a&&typeof a=="object"&&a.constructor===Object?e[s]=zt(a):e[s]=a);return e}function as(t,e){for(;t!==null;){const a=il(t,e);if(a){if(a.get)return wt(a.get);if(typeof a.value=="function")return wt(a.value)}t=sl(t)}function s(){return null}return s}const Za=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),li=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ci=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),dl=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),di=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),hl=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),tn=yt(["#text"]),en=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),hi=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),sn=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Cs=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),pl=Et(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ul=Et(/<%[\w\W]*|[\w\W]*%>/gm),gl=Et(/\$\{[\w\W]*/gm),ml=Et(/^data-[\-\w.\u00B7-\uFFFF]+$/),fl=Et(/^aria-[\-\w]+$/),pr=Et(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),vl=Et(/^(?:\w+script|data):/i),bl=Et(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ur=Et(/^html$/i),yl=Et(/^[a-z][.\w]*(-[.\w]+)+$/i);var an=Object.freeze({__proto__:null,ARIA_ATTR:fl,ATTR_WHITESPACE:bl,CUSTOM_ELEMENT:yl,DATA_ATTR:ml,DOCTYPE_NAME:ur,ERB_EXPR:ul,IS_ALLOWED_URI:pr,IS_SCRIPT_OR_DATA:vl,MUSTACHE_EXPR:pl,TMPLIT_EXPR:gl});const ns={element:1,text:3,progressingInstruction:7,comment:8,document:9},wl=function(){return typeof window>"u"?null:window},$l=function(e,s){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const i="data-tt-policy-suffix";s&&s.hasAttribute(i)&&(a=s.getAttribute(i));const n="dompurify"+(a?"#"+a:"");try{return e.createPolicy(n,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+n+" could not be created."),null}},nn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function gr(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:wl();const e=T=>gr(T);if(e.version="3.3.1",e.removed=[],!t||!t.document||t.document.nodeType!==ns.document||!t.Element)return e.isSupported=!1,e;let{document:s}=t;const a=s,i=a.currentScript,{DocumentFragment:n,HTMLTemplateElement:r,Node:c,Element:l,NodeFilter:u,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:m,DOMParser:g,trustedTypes:f}=t,b=l.prototype,C=as(b,"cloneNode"),H=as(b,"remove"),R=as(b,"nextSibling"),N=as(b,"childNodes"),P=as(b,"parentNode");if(typeof r=="function"){const T=s.createElement("template");T.content&&T.content.ownerDocument&&(s=T.content.ownerDocument)}let $,q="";const{implementation:w,createNodeIterator:I,createDocumentFragment:_,getElementsByTagName:x}=s,{importNode:D}=a;let y=nn();e.isSupported=typeof hr=="function"&&typeof P=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:A,ERB_EXPR:E,TMPLIT_EXPR:L,DATA_ATTR:Mt,ARIA_ATTR:ge,IS_SCRIPT_OR_DATA:Vs,ATTR_WHITESPACE:Ge,CUSTOM_ELEMENT:Gs}=an;let{IS_ALLOWED_URI:De}=an,X=null;const Je=j({},[...Za,...li,...ci,...di,...tn]);let et=null;const gs=j({},[...en,...hi,...sn,...Cs]);let V=Object.seal(Ui(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),re=null,xt=null;const gt=Object.seal(Ui(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Gt=!0,me=!0,ga=!1,ma=!0,Le=!1,ms=!0,fe=!1,Js=!1,Ys=!1,Me=!1,fs=!1,vs=!1,fa=!0,va=!1;const $r="user-content-";let Qs=!0,Ye=!1,Ne={},Nt=null;const Xs=j({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let ba=null;const ya=j({},["audio","video","img","source","image","track"]);let Zs=null;const wa=j({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),bs="http://www.w3.org/1998/Math/MathML",ys="http://www.w3.org/2000/svg",Jt="http://www.w3.org/1999/xhtml";let Oe=Jt,ti=!1,ei=null;const kr=j({},[bs,ys,Jt],ri);let ws=j({},["mi","mo","mn","ms","mtext"]),$s=j({},["annotation-xml"]);const xr=j({},["title","style","font","a","script"]);let Qe=null;const Cr=["application/xhtml+xml","text/html"],Tr="text/html";let nt=null,je=null;const Sr=s.createElement("form"),$a=function(h){return h instanceof RegExp||h instanceof Function},si=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(je&&je===h)){if((!h||typeof h!="object")&&(h={}),h=zt(h),Qe=Cr.indexOf(h.PARSER_MEDIA_TYPE)===-1?Tr:h.PARSER_MEDIA_TYPE,nt=Qe==="application/xhtml+xml"?ri:Is,X=_t(h,"ALLOWED_TAGS")?j({},h.ALLOWED_TAGS,nt):Je,et=_t(h,"ALLOWED_ATTR")?j({},h.ALLOWED_ATTR,nt):gs,ei=_t(h,"ALLOWED_NAMESPACES")?j({},h.ALLOWED_NAMESPACES,ri):kr,Zs=_t(h,"ADD_URI_SAFE_ATTR")?j(zt(wa),h.ADD_URI_SAFE_ATTR,nt):wa,ba=_t(h,"ADD_DATA_URI_TAGS")?j(zt(ya),h.ADD_DATA_URI_TAGS,nt):ya,Nt=_t(h,"FORBID_CONTENTS")?j({},h.FORBID_CONTENTS,nt):Xs,re=_t(h,"FORBID_TAGS")?j({},h.FORBID_TAGS,nt):zt({}),xt=_t(h,"FORBID_ATTR")?j({},h.FORBID_ATTR,nt):zt({}),Ne=_t(h,"USE_PROFILES")?h.USE_PROFILES:!1,Gt=h.ALLOW_ARIA_ATTR!==!1,me=h.ALLOW_DATA_ATTR!==!1,ga=h.ALLOW_UNKNOWN_PROTOCOLS||!1,ma=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=h.SAFE_FOR_TEMPLATES||!1,ms=h.SAFE_FOR_XML!==!1,fe=h.WHOLE_DOCUMENT||!1,Me=h.RETURN_DOM||!1,fs=h.RETURN_DOM_FRAGMENT||!1,vs=h.RETURN_TRUSTED_TYPE||!1,Ys=h.FORCE_BODY||!1,fa=h.SANITIZE_DOM!==!1,va=h.SANITIZE_NAMED_PROPS||!1,Qs=h.KEEP_CONTENT!==!1,Ye=h.IN_PLACE||!1,De=h.ALLOWED_URI_REGEXP||pr,Oe=h.NAMESPACE||Jt,ws=h.MATHML_TEXT_INTEGRATION_POINTS||ws,$s=h.HTML_INTEGRATION_POINTS||$s,V=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&$a(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&$a(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Le&&(me=!1),fs&&(Me=!0),Ne&&(X=j({},tn),et=[],Ne.html===!0&&(j(X,Za),j(et,en)),Ne.svg===!0&&(j(X,li),j(et,hi),j(et,Cs)),Ne.svgFilters===!0&&(j(X,ci),j(et,hi),j(et,Cs)),Ne.mathMl===!0&&(j(X,di),j(et,sn),j(et,Cs))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?gt.tagCheck=h.ADD_TAGS:(X===Je&&(X=zt(X)),j(X,h.ADD_TAGS,nt))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?gt.attributeCheck=h.ADD_ATTR:(et===gs&&(et=zt(et)),j(et,h.ADD_ATTR,nt))),h.ADD_URI_SAFE_ATTR&&j(Zs,h.ADD_URI_SAFE_ATTR,nt),h.FORBID_CONTENTS&&(Nt===Xs&&(Nt=zt(Nt)),j(Nt,h.FORBID_CONTENTS,nt)),h.ADD_FORBID_CONTENTS&&(Nt===Xs&&(Nt=zt(Nt)),j(Nt,h.ADD_FORBID_CONTENTS,nt)),Qs&&(X["#text"]=!0),fe&&j(X,["html","head","body"]),X.table&&(j(X,["tbody"]),delete re.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw is('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');$=h.TRUSTED_TYPES_POLICY,q=$.createHTML("")}else $===void 0&&($=$l(f,i)),$!==null&&typeof q=="string"&&(q=$.createHTML(""));yt&&yt(h),je=h}},ka=j({},[...li,...ci,...dl]),xa=j({},[...di,...hl]),Er=function(h){let v=P(h);(!v||!v.tagName)&&(v={namespaceURI:Oe,tagName:"template"});const k=Is(h.tagName),Y=Is(v.tagName);return ei[h.namespaceURI]?h.namespaceURI===ys?v.namespaceURI===Jt?k==="svg":v.namespaceURI===bs?k==="svg"&&(Y==="annotation-xml"||ws[Y]):!!ka[k]:h.namespaceURI===bs?v.namespaceURI===Jt?k==="math":v.namespaceURI===ys?k==="math"&&$s[Y]:!!xa[k]:h.namespaceURI===Jt?v.namespaceURI===ys&&!$s[Y]||v.namespaceURI===bs&&!ws[Y]?!1:!xa[k]&&(xr[k]||!ka[k]):!!(Qe==="application/xhtml+xml"&&ei[h.namespaceURI]):!1},Ot=function(h){es(e.removed,{element:h});try{P(h).removeChild(h)}catch{H(h)}},ve=function(h,v){try{es(e.removed,{attribute:v.getAttributeNode(h),from:v})}catch{es(e.removed,{attribute:null,from:v})}if(v.removeAttribute(h),h==="is")if(Me||fs)try{Ot(v)}catch{}else try{v.setAttribute(h,"")}catch{}},Ca=function(h){let v=null,k=null;if(Ys)h="<remove></remove>"+h;else{const st=oi(h,/^[\r\n\t ]+/);k=st&&st[0]}Qe==="application/xhtml+xml"&&Oe===Jt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");const Y=$?$.createHTML(h):h;if(Oe===Jt)try{v=new g().parseFromString(Y,Qe)}catch{}if(!v||!v.documentElement){v=w.createDocument(Oe,"template",null);try{v.documentElement.innerHTML=ti?q:Y}catch{}}const mt=v.body||v.documentElement;return h&&k&&mt.insertBefore(s.createTextNode(k),mt.childNodes[0]||null),Oe===Jt?x.call(v,fe?"html":"body")[0]:fe?v.documentElement:mt},Ta=function(h){return I.call(h.ownerDocument||h,h,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},ii=function(h){return h instanceof m&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof p)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Sa=function(h){return typeof c=="function"&&h instanceof c};function Yt(T,h,v){xs(T,k=>{k.call(e,h,v,je)})}const Ea=function(h){let v=null;if(Yt(y.beforeSanitizeElements,h,null),ii(h))return Ot(h),!0;const k=nt(h.nodeName);if(Yt(y.uponSanitizeElement,h,{tagName:k,allowedTags:X}),ms&&h.hasChildNodes()&&!Sa(h.firstElementChild)&&vt(/<[/\w!]/g,h.innerHTML)&&vt(/<[/\w!]/g,h.textContent)||h.nodeType===ns.progressingInstruction||ms&&h.nodeType===ns.comment&&vt(/<[/\w]/g,h.data))return Ot(h),!0;if(!(gt.tagCheck instanceof Function&&gt.tagCheck(k))&&(!X[k]||re[k])){if(!re[k]&&_a(k)&&(V.tagNameCheck instanceof RegExp&&vt(V.tagNameCheck,k)||V.tagNameCheck instanceof Function&&V.tagNameCheck(k)))return!1;if(Qs&&!Nt[k]){const Y=P(h)||h.parentNode,mt=N(h)||h.childNodes;if(mt&&Y){const st=mt.length;for(let kt=st-1;kt>=0;--kt){const Qt=C(mt[kt],!0);Qt.__removalCount=(h.__removalCount||0)+1,Y.insertBefore(Qt,R(h))}}}return Ot(h),!0}return h instanceof l&&!Er(h)||(k==="noscript"||k==="noembed"||k==="noframes")&&vt(/<\/no(script|embed|frames)/i,h.innerHTML)?(Ot(h),!0):(Le&&h.nodeType===ns.text&&(v=h.textContent,xs([A,E,L],Y=>{v=ss(v,Y," ")}),h.textContent!==v&&(es(e.removed,{element:h.cloneNode()}),h.textContent=v)),Yt(y.afterSanitizeElements,h,null),!1)},Aa=function(h,v,k){if(fa&&(v==="id"||v==="name")&&(k in s||k in Sr))return!1;if(!(me&&!xt[v]&&vt(Mt,v))){if(!(Gt&&vt(ge,v))){if(!(gt.attributeCheck instanceof Function&&gt.attributeCheck(v,h))){if(!et[v]||xt[v]){if(!(_a(h)&&(V.tagNameCheck instanceof RegExp&&vt(V.tagNameCheck,h)||V.tagNameCheck instanceof Function&&V.tagNameCheck(h))&&(V.attributeNameCheck instanceof RegExp&&vt(V.attributeNameCheck,v)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(v,h))||v==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&vt(V.tagNameCheck,k)||V.tagNameCheck instanceof Function&&V.tagNameCheck(k))))return!1}else if(!Zs[v]){if(!vt(De,ss(k,Ge,""))){if(!((v==="src"||v==="xlink:href"||v==="href")&&h!=="script"&&rl(k,"data:")===0&&ba[h])){if(!(ga&&!vt(Vs,ss(k,Ge,"")))){if(k)return!1}}}}}}}return!0},_a=function(h){return h!=="annotation-xml"&&oi(h,Gs)},Pa=function(h){Yt(y.beforeSanitizeAttributes,h,null);const{attributes:v}=h;if(!v||ii(h))return;const k={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:et,forceKeepAttr:void 0};let Y=v.length;for(;Y--;){const mt=v[Y],{name:st,namespaceURI:kt,value:Qt}=mt,Be=nt(st),ai=Qt;let pt=st==="value"?ai:ol(ai);if(k.attrName=Be,k.attrValue=pt,k.keepAttr=!0,k.forceKeepAttr=void 0,Yt(y.uponSanitizeAttribute,h,k),pt=k.attrValue,va&&(Be==="id"||Be==="name")&&(ve(st,h),pt=$r+pt),ms&&vt(/((--!?|])>)|<\/(style|title|textarea)/i,pt)){ve(st,h);continue}if(Be==="attributename"&&oi(pt,"href")){ve(st,h);continue}if(k.forceKeepAttr)continue;if(!k.keepAttr){ve(st,h);continue}if(!ma&&vt(/\/>/i,pt)){ve(st,h);continue}Le&&xs([A,E,L],Ra=>{pt=ss(pt,Ra," ")});const Ia=nt(h.nodeName);if(!Aa(Ia,Be,pt)){ve(st,h);continue}if($&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!kt)switch(f.getAttributeType(Ia,Be)){case"TrustedHTML":{pt=$.createHTML(pt);break}case"TrustedScriptURL":{pt=$.createScriptURL(pt);break}}if(pt!==ai)try{kt?h.setAttributeNS(kt,st,pt):h.setAttribute(st,pt),ii(h)?Ot(h):Xa(e.removed)}catch{ve(st,h)}}Yt(y.afterSanitizeAttributes,h,null)},Ar=function T(h){let v=null;const k=Ta(h);for(Yt(y.beforeSanitizeShadowDOM,h,null);v=k.nextNode();)Yt(y.uponSanitizeShadowNode,v,null),Ea(v),Pa(v),v.content instanceof n&&T(v.content);Yt(y.afterSanitizeShadowDOM,h,null)};return e.sanitize=function(T){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},v=null,k=null,Y=null,mt=null;if(ti=!T,ti&&(T="<!-->"),typeof T!="string"&&!Sa(T))if(typeof T.toString=="function"){if(T=T.toString(),typeof T!="string")throw is("dirty is not a string, aborting")}else throw is("toString is not a function");if(!e.isSupported)return T;if(Js||si(h),e.removed=[],typeof T=="string"&&(Ye=!1),Ye){if(T.nodeName){const Qt=nt(T.nodeName);if(!X[Qt]||re[Qt])throw is("root node is forbidden and cannot be sanitized in-place")}}else if(T instanceof c)v=Ca("<!---->"),k=v.ownerDocument.importNode(T,!0),k.nodeType===ns.element&&k.nodeName==="BODY"||k.nodeName==="HTML"?v=k:v.appendChild(k);else{if(!Me&&!Le&&!fe&&T.indexOf("<")===-1)return $&&vs?$.createHTML(T):T;if(v=Ca(T),!v)return Me?null:vs?q:""}v&&Ys&&Ot(v.firstChild);const st=Ta(Ye?T:v);for(;Y=st.nextNode();)Ea(Y),Pa(Y),Y.content instanceof n&&Ar(Y.content);if(Ye)return T;if(Me){if(fs)for(mt=_.call(v.ownerDocument);v.firstChild;)mt.appendChild(v.firstChild);else mt=v;return(et.shadowroot||et.shadowrootmode)&&(mt=D.call(a,mt,!0)),mt}let kt=fe?v.outerHTML:v.innerHTML;return fe&&X["!doctype"]&&v.ownerDocument&&v.ownerDocument.doctype&&v.ownerDocument.doctype.name&&vt(ur,v.ownerDocument.doctype.name)&&(kt="<!DOCTYPE "+v.ownerDocument.doctype.name+`>
`+kt),Le&&xs([A,E,L],Qt=>{kt=ss(kt,Qt," ")}),$&&vs?$.createHTML(kt):kt},e.setConfig=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};si(T),Js=!0},e.clearConfig=function(){je=null,Js=!1},e.isValidAttribute=function(T,h,v){je||si({});const k=nt(T),Y=nt(h);return Aa(k,Y,v)},e.addHook=function(T,h){typeof h=="function"&&es(y[T],h)},e.removeHook=function(T,h){if(h!==void 0){const v=al(y[T],h);return v===-1?void 0:nl(y[T],v,1)[0]}return Xa(y[T])},e.removeHooks=function(T){y[T]=[]},e.removeAllHooks=function(){y=nn()},e}var mr=gr(),kl=Object.defineProperty,xl=Object.getOwnPropertyDescriptor,K=(t,e,s,a)=>{for(var i=a>1?void 0:a?xl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&kl(e,s,i),i};const rn=["todo","in_progress","in_review","done","blocked"],pi={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"};let W=class extends F{constructor(){super(...arguments),this.tenantId="",this.selectedProjectId="",this.openCreate=!1,this.items=[],this.loading=!0,this.error="",this.showModal=!1,this.editTarget=null,this.form={name:"",description:"",rootWorkingDirectory:""},this.saving=!1,this.panelOpen=!1,this.activeProject=null,this.workspaceLoading=!1,this.workspaceTab="details",this.projectTasks=[],this.projectClaws=[],this.taskForm={title:"",description:"",priority:"medium",status:"todo",assignedClawId:"",dueDate:""},this.taskSaving=!1,this.prdTitle="Project PRD",this.prdMarkdown="",this.prdUpdatedAt="",this.brainInput="",this.brainSending=!1,this.brainMessages=[],this.brainActions=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){if(t.has("openCreate")&&this.openCreate&&this.openCreateProject(),this.items.length>0&&t.has("selectedProjectId")&&this.selectedProjectId){const e=this.items.find(s=>String(s.id)===this.selectedProjectId);e&&this.openWorkspace(e)}if(this.items.length>0&&t.has("items")&&this.selectedProjectId&&!this.panelOpen){const e=this.items.find(s=>String(s.id)===this.selectedProjectId);e&&this.openWorkspace(e)}}async load(){this.loading=!0;try{this.items=await Ct.list()}catch(t){this.error=t.message}finally{this.loading=!1}}openCreateProject(){this.editTarget=null,this.form={name:"",description:"",rootWorkingDirectory:""},this.showModal=!0}openEdit(t){this.editTarget=t,this.form={name:t.name,description:t.description??"",rootWorkingDirectory:t.rootWorkingDirectory??""},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await Ct.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.activeProject?.id===e.id&&(this.activeProject=e)}else{const e=await Ct.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async removeProject(t){if(t?.id&&confirm(`Delete project "${t.name??"this project"}"? This cannot be undone.`))try{await Ct.remove(t.id),this.items=this.items.filter(e=>e.id!==t.id),this.activeProject?.id===t.id&&this.closeWorkspace()}catch(e){this.error=e.message}}projectTaskList(){return this.activeProject?this.projectTasks.filter(t=>String(t.projectId??"")===String(this.activeProject?.id)):[]}statusBadge(t){const e={todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red",active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"},s=pi[t]??t.replace("_"," ");return o`<span class="badge ${e[t]??"badge-gray"}">${s}</span>`}clawName(t){return t?this.projectClaws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return o`<span class="badge ${{low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"}[t]}">${t}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}renderMarkdown(t){const e=z.parse(t,{gfm:!0,breaks:!0}),s=typeof e=="string"?e:"",a=mr.sanitize(s);return o`<div class="md-content">${Xn(a)}</div>`}async openWorkspace(t){this.panelOpen=!0,this.workspaceTab="details",this.activeProject=t,this.selectedProjectId=String(t.id),await this.loadWorkspace(),!t.rootWorkingDirectory&&this.brainMessages.length===0&&(this.workspaceTab="brain",this.brainMessages=[{id:crypto.randomUUID(),role:"assistant",text:"To onboard this project, I need the project root path where `.coderClaw` should live. Reply with the path and I will save it to project details."}])}closeWorkspace(){this.panelOpen=!1,this.activeProject=null,this.selectedProjectId="",this.projectTasks=[],this.projectClaws=[],this.workspaceTab="details"}async loadWorkspace(){if(this.activeProject){this.workspaceLoading=!0;try{const[t,e]=await Promise.all([ot.list(),ct.list()]);this.projectTasks=t.filter(s=>String(s.projectId??"")===String(this.activeProject?.id)),this.projectClaws=e}catch(t){this.error=t.message}finally{this.workspaceLoading=!1}}}async reassignTask(t,e){try{const s=await ot.update(t.id,{assignedClawId:e||""});this.projectTasks=this.projectTasks.map(a=>a.id===t.id?s:a)}catch(s){this.error=s.message}}async createTask(){if(!(!this.activeProject||!this.taskForm.title.trim()||this.taskSaving)){this.taskSaving=!0;try{const t=await ot.create({projectId:String(this.activeProject.id),title:this.taskForm.title.trim(),description:this.taskForm.description||void 0,priority:this.taskForm.priority,status:this.taskForm.status,assignedClawId:this.taskForm.assignedClawId||void 0,dueDate:this.taskForm.dueDate||void 0});this.projectTasks=[t,...this.projectTasks],this.taskForm={title:"",description:"",priority:"medium",status:"todo",assignedClawId:"",dueDate:""}}catch(t){this.error=t.message}finally{this.taskSaving=!1}}}projectBrainContext(){return{project:this.activeProject?{id:this.activeProject.id,key:this.activeProject.key,name:this.activeProject.name,status:this.activeProject.status,description:this.activeProject.description??"",rootWorkingDirectory:this.activeProject.rootWorkingDirectory??""}:null,tasks:this.projectTaskList().map(t=>({id:t.id,key:t.key,title:t.title,status:t.status,priority:t.priority,assignedClawId:t.assignedClawId??null})),claws:this.projectClaws.map(t=>({id:t.id,name:t.name,status:t.status}))}}parseBrainActions(t){const e=t.match(/<ccl-actions>([\s\S]*?)<\/ccl-actions>/i);if(!e)return[];try{const s=JSON.parse(e[1]);return Array.isArray(s.actions)?s.actions.filter(a=>a&&typeof a=="object"&&(a.type==="create_task"||a.type==="assign_task"||a.type==="save_prd"||a.type==="set_project_details")):[]}catch{return[]}}stripBrainActions(t){return t.replace(/<ccl-actions>[\s\S]*?<\/ccl-actions>/gi,"").trim()}brainMessagesPayload(){return[{role:"system",content:["You are Brain helping inside a project workspace.","Respond in markdown.",'When useful, include machine-readable actions in <ccl-actions>{"actions":[...]}</ccl-actions>.',"Allowed actions:","- create_task: { type, title, description?, priority?, status?, dueDate?, assignedClawId?, assignedClawName? }","- assign_task: { type, taskId?, taskKey?, taskTitle?, assignedClawId?, assignedClawName? }","- save_prd: { type, title?, content }","- set_project_details: { type, description?, rootWorkingDirectory? }","If rootWorkingDirectory is missing, ask for it and include set_project_details action once user provides it.","Keep output concise and execution oriented."].join(`
`)},{role:"system",content:`Project context JSON:
${JSON.stringify(this.projectBrainContext())}`},...this.brainMessages.slice(-14).map(e=>({role:e.role,content:e.text}))]}quickBrainPrompt(t){if(this.activeProject){if(t==="describe"){this.brainInput=`Summarize project ${this.activeProject.name} and current task health.`;return}if(t==="prd"){this.brainInput=`Draft a complete PRD for ${this.activeProject.name} and include a save_prd action.`;return}this.brainInput=`Create an execution-ready task plan for ${this.activeProject.name} with create_task actions and assignee suggestions.`}}async sendBrain(){const t=this.brainInput.trim();if(!(!t||this.brainSending||!this.activeProject)){this.brainMessages=[...this.brainMessages,{id:crypto.randomUUID(),role:"user",text:t}],this.brainInput="",this.brainSending=!0;try{const s=(await Ws.chat(this.brainMessagesPayload(),{temperature:.25,maxTokens:1800})).choices?.[0]?.message?.content?.trim()??"I could not generate a response.",a=this.parseBrainActions(s);a.length&&(this.brainActions=a.map(n=>({action:n,status:"idle"})));const i=this.stripBrainActions(s)||"Done.";this.brainMessages=[...this.brainMessages,{id:crypto.randomUUID(),role:"assistant",text:i}]}catch(e){const s=e instanceof Error?e.message:String(e);this.brainMessages=[...this.brainMessages,{id:crypto.randomUUID(),role:"assistant",text:`Error: ${s}`}]}finally{this.brainSending=!1}}}resolveClaw(t){if(t.assignedClawId){const e=this.projectClaws.find(s=>s.id===t.assignedClawId);if(e)return e}if(t.assignedClawName){const e=this.projectClaws.find(s=>s.name.toLowerCase()===t.assignedClawName?.toLowerCase());if(e)return e}return null}async applyBrainAction(t){const e=this.brainActions[t];if(!(!e||e.status==="running"||!this.activeProject)){this.brainActions=this.brainActions.map((s,a)=>a===t?{...s,status:"running",result:void 0}:s);try{if(e.action.type==="set_project_details"){const r=await Ct.update(this.activeProject.id,{description:e.action.description??this.activeProject.description,rootWorkingDirectory:e.action.rootWorkingDirectory??this.activeProject.rootWorkingDirectory});this.activeProject=r,this.items=this.items.map(c=>c.id===r.id?r:c),this.brainActions=this.brainActions.map((c,l)=>l===t?{...c,status:"done",result:"Updated project details"}:c);return}if(e.action.type==="save_prd"){this.prdTitle=e.action.title?.trim()||"Project PRD",this.prdMarkdown=e.action.content,this.prdUpdatedAt=new Date().toISOString(),this.brainActions=this.brainActions.map((r,c)=>c===t?{...r,status:"done",result:"Saved PRD draft"}:r);return}if(e.action.type==="create_task"){const r=this.resolveClaw(e.action),c=await ot.create({projectId:String(this.activeProject.id),title:e.action.title,description:e.action.description,priority:e.action.priority??"medium",status:e.action.status??"todo",dueDate:e.action.dueDate,assignedClawId:r?.id});this.projectTasks=[c,...this.projectTasks],this.brainActions=this.brainActions.map((l,u)=>u===t?{...l,status:"done",result:`Created task ${c.key}`}:l);return}const s=e.action,a=this.projectTaskList().find(r=>s.taskId&&r.id===s.taskId||s.taskKey&&r.key.toLowerCase()===s.taskKey.toLowerCase()||s.taskTitle&&r.title.toLowerCase()===s.taskTitle.toLowerCase());if(!a)throw new Error("Task not found in this project for assignment");const i=this.resolveClaw(s);if(!i)throw new Error("Target claw not found for assignment");const n=await ot.update(a.id,{assignedClawId:i.id});this.projectTasks=this.projectTasks.map(r=>r.id===n.id?n:r),this.brainActions=this.brainActions.map((r,c)=>c===t?{...r,status:"done",result:`Assigned ${n.key} → ${i.name}`}:r)}catch(s){const a=s instanceof Error?s.message:String(s);this.brainActions=this.brainActions.map((i,n)=>n===t?{...i,status:"error",result:a}:i)}}}async applyAllBrainActions(){for(let t=0;t<this.brainActions.length;t++)(this.brainActions[t]?.status==="idle"||this.brainActions[t]?.status==="error")&&await this.applyBrainAction(t)}clearBrain(){this.brainInput="",this.brainMessages=[],this.brainActions=[]}render(){return o`
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
          ${[["details","Project details"],["board","Task board"],["tasks","Tasks"],["prds","PRDs"],["brain","Brain"]].map(([s,a])=>o`
            <button class="panel-tab ${this.workspaceTab===s?"active":""}" @click=${()=>{this.workspaceTab=s}}>${a}</button>
          `)}
        </div>

        <div class="panel-body" style="padding:18px">
          ${this.workspaceLoading?o`<div style="color:var(--muted);font-size:13px">Loading workspace…</div>`:this.workspaceTab==="details"?this.renderProjectDetails(t,e):this.workspaceTab==="board"?this.renderTaskBoard(e):this.workspaceTab==="tasks"?this.renderTasksTab(e):this.workspaceTab==="prds"?this.renderPrdsTab():this.renderBrainTab()}
        </div>
      </div>
    `}renderProjectDetails(t,e){const s=e.filter(a=>a.status!=="done").length;return o`
      <div class="grid grid-2">
        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Overview</div>
          <div style="font-size:13px;line-height:1.6;color:var(--text)">
            ${t.description||"No project description yet."}
          </div>
          <div style="display:grid;gap:8px;margin-top:14px">
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Project key</span><span>${t.key}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Status</span><span>${t.status.replace("_"," ")}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;gap:12px"><span style="color:var(--muted)">Root path</span><span class="truncate" title=${t.rootWorkingDirectory??""}>${t.rootWorkingDirectory??"Not set"}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Tasks</span><span>${e.length}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--muted)">Open tasks</span><span>${s}</span></div>
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
      </div>
    `}renderTaskBoard(t){return o`
      <div class="kanban">
        ${rn.map(e=>o`
          <div class="kanban-col">
            <div class="kanban-col-header">
              <div class="kanban-col-title">${pi[e]}</div>
              <div class="kanban-col-count">${t.filter(s=>s.status===e).length}</div>
            </div>
            <div class="kanban-col-body">
              ${t.filter(s=>s.status===e).map(s=>o`
                <div class="task-card">
                  <div class="task-card-title">${s.title}</div>
                  <div class="task-card-meta">
                    <span class="task-key">${s.key}</span>
                    ${this.priorityBadge(s.priority)}
                    <span style="font-size:11px;color:var(--muted)">${this.clawName(s.assignedClawId)}</span>
                  </div>
                </div>
              `)}
            </div>
          </div>
        `)}
      </div>
    `}renderTasksTab(t){return o`
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
    `}};K([B()],W.prototype,"tenantId",2);K([B()],W.prototype,"selectedProjectId",2);K([B({type:Boolean})],W.prototype,"openCreate",2);K([d()],W.prototype,"items",2);K([d()],W.prototype,"loading",2);K([d()],W.prototype,"error",2);K([d()],W.prototype,"showModal",2);K([d()],W.prototype,"editTarget",2);K([d()],W.prototype,"form",2);K([d()],W.prototype,"saving",2);K([d()],W.prototype,"panelOpen",2);K([d()],W.prototype,"activeProject",2);K([d()],W.prototype,"workspaceLoading",2);K([d()],W.prototype,"workspaceTab",2);K([d()],W.prototype,"projectTasks",2);K([d()],W.prototype,"projectClaws",2);K([d()],W.prototype,"taskForm",2);K([d()],W.prototype,"taskSaving",2);K([d()],W.prototype,"prdTitle",2);K([d()],W.prototype,"prdMarkdown",2);K([d()],W.prototype,"prdUpdatedAt",2);K([d()],W.prototype,"brainInput",2);K([d()],W.prototype,"brainSending",2);K([d()],W.prototype,"brainMessages",2);K([d()],W.prototype,"brainActions",2);W=K([J("ccl-projects")],W);var Cl=Object.defineProperty,Tl=Object.getOwnPropertyDescriptor,Q=(t,e,s,a)=>{for(var i=a>1?void 0:a?Tl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Cl(e,s,i),i};const Ts=["todo","in_progress","in_review","done","blocked"],rs={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"},on=["low","medium","high","critical"],Sl={low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"};let G=class extends F{constructor(){super(...arguments),this.tenantId="",this.projectId="",this.openTaskPrompt="",this.items=[],this.projects=[],this.claws=[],this.loading=!0,this.error="",this.view="kanban",this.filterStatus="",this.filterProject="",this.filterPriority="",this.search="",this.showArchived=!1,this.showModal=!1,this.editTarget=null,this.form={},this.saving=!1,this.drawerTask=null,this.drawerExecutions=[],this.drawerTab="detail",this.running=!1,this.dragTaskId=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.projectId&&(this.filterProject=this.projectId),this.load()}updated(t){t.has("projectId")&&this.projectId&&(this.filterProject=this.projectId),t.has("openTaskPrompt")&&this.openTaskPrompt&&(this.editTarget=null,this.form={status:"todo",priority:"medium",title:this.openTaskPrompt,...this.projectId?{projectId:this.projectId}:{}},this.showModal=!0)}async load(){this.loading=!0;try{[this.items,this.projects,this.claws]=await Promise.all([ot.list({archived:this.showArchived}),Ct.list(),ct.list()])}catch(t){this.error=t.message}finally{this.loading=!1}}get filtered(){return this.items.filter(t=>!(this.filterStatus&&t.status!==this.filterStatus||this.filterProject&&t.projectId!==this.filterProject||this.filterPriority&&t.priority!==this.filterPriority||this.search&&!t.title.toLowerCase().includes(this.search.toLowerCase())))}tasksForStatus(t){return this.filtered.filter(e=>e.status===t)}openCreate(){this.editTarget=null,this.form={status:"todo",priority:"medium"},this.showModal=!0}openEdit(t,e){e?.stopPropagation(),this.editTarget=t,this.form={...t},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await ot.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.drawerTask?.id===e.id&&(this.drawerTask=e)}else{const e=await ot.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async removeTask(t,e){e?.stopPropagation(),t?.id&&confirm(`Delete "${t.title??"this task"}"?`)&&(await ot.remove(t.id),this.items=this.items.filter(s=>s.id!==t.id),this.drawerTask?.id===t.id&&(this.drawerTask=null))}async patchStatus(t,e){const s=await ot.update(t,{status:e});this.items=this.items.map(a=>a.id===t?s:a),this.drawerTask?.id===t&&(this.drawerTask=s)}async runTask(t,e){e.stopPropagation(),this.running=!0;try{const s=await ot.run(t.id),a=await ot.update(t.id,{status:"in_progress"});this.items=this.items.map(i=>i.id===a.id?a:i),this.drawerTask?.id===t.id&&(this.drawerTask=a,this.drawerExecutions=[s,...this.drawerExecutions])}catch(s){this.error=s.message}finally{this.running=!1}}async openDrawer(t){this.drawerTask=t,this.drawerTab="detail";try{this.drawerExecutions=await ot.executions(t.id)}catch{this.drawerExecutions=[]}}closeDrawer(){this.drawerTask=null}dragStart(t){this.dragTaskId=t}dragOver(t){t.preventDefault()}async drop(t,e){t.preventDefault(),this.dragTaskId&&(await this.patchStatus(this.dragTaskId,e),this.dragTaskId="")}projectName(t){return t?this.projects.find(e=>e.id===t)?.name??t:"—"}clawName(t){return t?this.claws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return o`<span class="badge ${Sl[t]}">${t}</span>`}statusBadge(t){return o`<span class="badge ${{todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red"}[t]}">${rs[t]}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}render(){return o`
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
          ${Ts.map(t=>o`<option value=${t}>${rs[t]}</option>`)}
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
    `}renderKanban(){return o`
      <div class="kanban">
        ${Ts.map(t=>o`
          <div class="kanban-col"
            @dragover=${this.dragOver}
            @drop=${e=>this.drop(e,t)}>
            <div class="kanban-col-header">
              <div class="kanban-col-title">${rs[t]}</div>
              <div class="kanban-col-count">${this.tasksForStatus(t).length}</div>
            </div>
            <div class="kanban-col-body">
              ${this.tasksForStatus(t).map(e=>o`
                <div class="task-card"
                  draggable="true"
                  @dragstart=${()=>this.dragStart(e.id)}
                  @click=${()=>this.openDrawer(e)}>
                  <div class="task-card-title">${e.title}</div>
                  <div class="task-card-meta">
                    <span class="task-key">${e.key}</span>
                    ${this.priorityBadge(e.priority)}
                    ${e.assignedClawId?o`<span style="font-size:11px;color:var(--muted)">${this.clawName(e.assignedClawId)}</span>`:""}
                    ${e.dueDate?o`<span style="font-size:11px;color:var(--muted);margin-left:auto">${this.formatDate(e.dueDate)}</span>`:""}
                  </div>
                  <div style="display:flex;justify-content:flex-end;margin-top:8px;padding-top:6px;border-top:1px solid var(--border)"
                    @click=${s=>s.stopPropagation()}>
                    <button class="btn btn-ghost btn-sm" style="font-size:11px;gap:4px"
                      @click=${()=>this.openDrawer(e)}>
                      View
                      <svg viewBox="0 0 24 24" style="width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
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
    `}renderList(){const t=this.filtered;return t.length===0?o`<div class="empty-state"><div class="empty-state-title">No tasks found</div></div>`:o`
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
    `}renderGantt(){const t=this.filtered.filter(m=>m.dueDate||m.createdAt);if(t.length===0)return o`<div class="empty-state"><div class="empty-state-title">No tasks with dates</div><div class="empty-state-sub">Set due dates on tasks to see the timeline</div></div>`;const e=t.map(m=>new Date(m.dueDate??m.createdAt)),s=new Date(Math.min(...e.map(m=>m.getTime()))),a=new Date(Math.max(...e.map(m=>m.getTime())));s.setDate(1),a.setMonth(a.getMonth()+1),a.setDate(0);const i=Math.ceil((a.getTime()-s.getTime())/864e5)+1,n=24,r=i*n,c=[],l=new Date(s);for(;l<=a;){const m=Math.floor((l.getTime()-s.getTime())/864e5),g=new Date(l.getFullYear(),l.getMonth()+1,0).getDate();c.push({label:l.toLocaleDateString(void 0,{month:"short",year:"2-digit"}),left:m*n,width:g*n}),l.setMonth(l.getMonth()+1),l.setDate(1)}const p=Math.floor((new Date().getTime()-s.getTime())/864e5)*n;return o`
      <div style="overflow-x:auto">
        <div style="min-width:${r+200}px">
          <!-- Month headers -->
          <div style="display:flex;margin-left:200px;border-bottom:1px solid var(--border)">
            ${c.map(m=>o`
              <div style="min-width:${m.width}px;padding:4px 8px;font-size:11px;color:var(--muted);border-right:1px solid var(--border)">${m.label}</div>
            `)}
          </div>
          <!-- Tasks -->
          <div style="position:relative">
            <!-- Today line -->
            ${p>=0&&p<=r?o`
              <div style="position:absolute;left:${200+p}px;top:0;bottom:0;width:2px;background:var(--accent);opacity:0.6;z-index:1"></div>
            `:""}

            ${t.map(m=>{const g=new Date(m.createdAt),f=new Date(m.dueDate??m.createdAt),b=Math.floor((g.getTime()-s.getTime())/864e5),C=Math.max(1,Math.ceil((f.getTime()-g.getTime())/864e5)),H={done:"var(--ok)",in_progress:"var(--accent)",blocked:"var(--danger)",in_review:"var(--warn)",todo:"var(--muted)"};return o`
                <div style="display:flex;align-items:center;border-bottom:1px solid var(--border);height:40px">
                  <div style="width:200px;flex-shrink:0;padding:0 12px;font-size:12px;font-weight:500;color:var(--text);truncate">
                    ${m.title}
                  </div>
                  <div style="flex:1;position:relative;height:100%">
                    <div
                      style="position:absolute;top:8px;height:24px;
                        left:${b*n}px;
                        width:${C*n}px;
                        background:${H[m.status]??"var(--muted)"};
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
                  ${Ts.map(t=>o`<option value=${t}>${rs[t]}</option>`)}
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
            ${Ts.filter(e=>e!==t.status).map(e=>o`
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
    `}};Q([B()],G.prototype,"tenantId",2);Q([B()],G.prototype,"projectId",2);Q([B()],G.prototype,"openTaskPrompt",2);Q([d()],G.prototype,"items",2);Q([d()],G.prototype,"projects",2);Q([d()],G.prototype,"claws",2);Q([d()],G.prototype,"loading",2);Q([d()],G.prototype,"error",2);Q([d()],G.prototype,"view",2);Q([d()],G.prototype,"filterStatus",2);Q([d()],G.prototype,"filterProject",2);Q([d()],G.prototype,"filterPriority",2);Q([d()],G.prototype,"search",2);Q([d()],G.prototype,"showArchived",2);Q([d()],G.prototype,"showModal",2);Q([d()],G.prototype,"editTarget",2);Q([d()],G.prototype,"form",2);Q([d()],G.prototype,"saving",2);Q([d()],G.prototype,"drawerTask",2);Q([d()],G.prototype,"drawerExecutions",2);Q([d()],G.prototype,"drawerTab",2);Q([d()],G.prototype,"running",2);Q([d()],G.prototype,"dragTaskId",2);G=Q([J("ccl-tasks")],G);const ln=[800,1500,3e3,5e3,1e4,15e3];class fr{constructor(e){this.opts=e,this.ws=null,this.attempt=0,this.destroyed=!1,this.pingInterval=null,this.connect()}connect(){this.destroyed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>{this.attempt=0,this.schedulePings(),this.opts.onEvent({type:"connected"})}),this.ws.addEventListener("message",e=>{let s;try{s=JSON.parse(e.data)}catch{s=e.data}if(s&&typeof s=="object"&&s.type==="claw_offline"){this.opts.onEvent({type:"claw_offline"});return}this.opts.onEvent({type:"message",data:s})}),this.ws.addEventListener("close",e=>{this.clearPings(),!this.destroyed&&(this.opts.onEvent({type:"disconnected",code:e.code,reason:e.reason}),this.scheduleReconnect())}),this.ws.addEventListener("error",()=>{}))}send(e){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(e))}destroy(){this.destroyed=!0,this.clearPings(),this.ws?.close(1e3,"destroyed"),this.ws=null}get readyState(){return this.ws?.readyState??WebSocket.CLOSED}schedulePings(){this.clearPings(),this.pingInterval=setInterval(()=>{this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"ping"}))},3e4)}clearPings(){this.pingInterval!==null&&(clearInterval(this.pingInterval),this.pingInterval=null)}scheduleReconnect(){const e=ln[Math.min(this.attempt,ln.length-1)];this.attempt++,setTimeout(()=>this.connect(),e)}}var El=Object.defineProperty,Al=Object.getOwnPropertyDescriptor,ee=(t,e,s,a)=>{for(var i=a>1?void 0:a?Al(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&El(e,s,i),i};let Ft=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.messages=[],this.tools=[],this.input="",this.connState="connecting",this.session="default",this.streaming=!1,this.gw=null,this.msgEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.scrollToBottom()}connect(){this.connState="connecting",this.gw=new fr({url:this.wsUrl,onEvent:t=>this.handleGwEvent(t)})}handleGwEvent(t){if(t.type==="connected"){this.connState="connected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type!=="message")return;const e=t.data;switch(e.type){case"chat.message":{if(e.role==="user")this.messages=[...this.messages,{id:crypto.randomUUID(),role:"user",text:e.text??""}];else{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:e.text??"",streaming:!1}]:this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.text??""}],this.streaming=!1}break}case"chat.delta":{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:s.text+(e.delta??"")}]:(this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.delta??"",streaming:!0}],this.streaming=!0);break}case"tool.start":{this.tools=[...this.tools,{id:e.toolCallId??crypto.randomUUID(),name:e.toolName??"tool",input:e.toolInput,expanded:!1}];break}case"tool.result":{this.tools=this.tools.map(s=>s.id===e.toolCallId?{...s,result:e.toolResult}:s);break}case"chat.abort":this.streaming=!1;break}}send(){const t=this.input.trim();!t||this.connState!=="connected"||(this.gw?.send({type:"chat",message:t,session:this.session}),this.input="")}abort(){this.gw?.send({type:"chat.abort"}),this.streaming=!1}newChat(){this.messages=[],this.tools=[],this.streaming=!1,this.gw?.send({type:"session.new"})}scrollToBottom(){this.msgEnd?.scrollIntoView({behavior:"smooth"})}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}connDot(){return o`<span class="dot ${{connected:"dot-green",connecting:"dot-yellow",offline:"dot-red",disconnected:"dot-gray"}[this.connState]}"></span> ${this.connState}`}render(){return o`
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
    `}};ee([B()],Ft.prototype,"clawId",2);ee([B()],Ft.prototype,"wsUrl",2);ee([d()],Ft.prototype,"messages",2);ee([d()],Ft.prototype,"tools",2);ee([d()],Ft.prototype,"input",2);ee([d()],Ft.prototype,"connState",2);ee([d()],Ft.prototype,"session",2);ee([d()],Ft.prototype,"streaming",2);Ft=ee([J("ccl-claw-chat")],Ft);var _l=Object.defineProperty,Pl=Object.getOwnPropertyDescriptor,se=(t,e,s,a)=>{for(var i=a>1?void 0:a?Pl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&_l(e,s,i),i};const Il=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Ss(t,e={}){const s=await fetch(`${Il}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${at()??""}`,...e.headers??{}}});if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}const Rl=["claude","openai","ollama","http"];let qt=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.agents=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",type:"claude",endpoint:"",apiKey:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.agents=await Ss("/api/agents")}catch(t){this.error=t.message}finally{this.loading=!1}}async toggleActive(t){try{await Ss(`/api/agents/${t.id}`,{method:"PATCH",body:JSON.stringify({isActive:!t.isActive})}),this.agents=this.agents.map(e=>e.id===t.id?{...e,isActive:!e.isActive}:e)}catch(e){this.error=e.message}}async removeAgent(t){if(confirm(`Delete agent "${t.name}"?`))try{await Ss(`/api/agents/${t.id}`,{method:"DELETE"}),this.agents=this.agents.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Ss("/api/agents",{method:"POST",body:JSON.stringify(this.form)});this.agents=[e,...this.agents],this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}render(){return o`
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
                    ${Rl.map(t=>o`<option value=${t}>${t}</option>`)}
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
    `}};se([B()],qt.prototype,"clawId",2);se([B()],qt.prototype,"wsUrl",2);se([d()],qt.prototype,"agents",2);se([d()],qt.prototype,"loading",2);se([d()],qt.prototype,"error",2);se([d()],qt.prototype,"showModal",2);se([d()],qt.prototype,"form",2);se([d()],qt.prototype,"saving",2);qt=se([J("ccl-claw-agents")],qt);var Dl=Object.defineProperty,Ll=Object.getOwnPropertyDescriptor,Dt=(t,e,s,a)=>{for(var i=a>1?void 0:a?Ll(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Dl(e,s,i),i};const Ml=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function cn(t,e={}){const s=await fetch(`${Ml}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${at()??""}`,...e.headers??{}}});if(s.status===404)return{};if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}let At=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.config={},this.loading=!0,this.error="",this.editing=!1,this.draft={},this.saving=!1,this.newKey="",this.newVal=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await cn(`/api/claws/${this.clawId}/config`);this.config=t??{}}catch(t){this.error=t.message}finally{this.loading=!1}}startEdit(){this.draft={...this.config},this.editing=!0}cancel(){this.editing=!1,this.draft={}}async save(){this.saving=!0;try{await cn(`/api/claws/${this.clawId}/config`,{method:"PATCH",body:JSON.stringify(this.draft)}),this.config={...this.draft},this.editing=!1}catch(t){this.error=t.message}finally{this.saving=!1}}addField(){this.newKey.trim()&&(this.draft={...this.draft,[this.newKey.trim()]:this.newVal},this.newKey="",this.newVal="")}removeField(t){const e={...this.draft};delete e[t],this.draft=e}render(){const t=Object.entries(this.editing?this.draft:this.config);return o`
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
                            @input=${a=>{this.draft={...this.draft,[e]:a.target.value}}}>`:o`<span style="font-family:var(--mono);font-size:12px">${s}</span>`}
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
    `}};Dt([B()],At.prototype,"clawId",2);Dt([B()],At.prototype,"wsUrl",2);Dt([d()],At.prototype,"config",2);Dt([d()],At.prototype,"loading",2);Dt([d()],At.prototype,"error",2);Dt([d()],At.prototype,"editing",2);Dt([d()],At.prototype,"draft",2);Dt([d()],At.prototype,"saving",2);Dt([d()],At.prototype,"newKey",2);Dt([d()],At.prototype,"newVal",2);At=Dt([J("ccl-claw-config")],At);var Nl=Object.defineProperty,Ol=Object.getOwnPropertyDescriptor,Ke=(t,e,s,a)=>{for(var i=a>1?void 0:a?Ol(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Nl(e,s,i),i};const jl=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function dn(t,e={}){const s=await fetch(`${jl}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${at()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let Te=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.sessions=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await dn(`/api/claws/${this.clawId}/sessions`);this.sessions=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async removeSession(t){if(confirm("Delete this session?"))try{await dn(`/api/claws/${this.clawId}/sessions/${t.id}`,{method:"DELETE"}),this.sessions=this.sessions.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){return o`
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
    `}};Ke([B()],Te.prototype,"clawId",2);Ke([B()],Te.prototype,"wsUrl",2);Ke([d()],Te.prototype,"sessions",2);Ke([d()],Te.prototype,"loading",2);Ke([d()],Te.prototype,"error",2);Te=Ke([J("ccl-claw-sessions")],Te);const Bl="modulepreload",Ul=function(t,e){return new URL(t,e).href},hn={},pn=function(e,s,a){let i=Promise.resolve();if(s&&s.length>0){let u=function(p){return Promise.all(p.map(m=>Promise.resolve(m).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const r=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=c?.nonce||c?.getAttribute("nonce");i=u(s.map(p=>{if(p=Ul(p,a),p in hn)return;hn[p]=!0;const m=p.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(a)for(let b=r.length-1;b>=0;b--){const C=r[b];if(C.href===p&&(!m||C.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${g}`))return;const f=document.createElement("link");if(f.rel=m?"stylesheet":Bl,m||(f.as="script"),f.crossOrigin="",f.href=p,l&&f.setAttribute("nonce",l),document.head.appendChild(f),m)return new Promise((b,C)=>{f.addEventListener("load",b),f.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${p}`)))})}))}function n(r){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r}return i.then(r=>{for(const c of r||[])c.status==="rejected"&&n(c.reason);return e().catch(n)})};var zl=Object.defineProperty,Fl=Object.getOwnPropertyDescriptor,ie=(t,e,s,a)=>{for(var i=a>1?void 0:a?Fl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&zl(e,s,i),i};let Wt=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.assigned=[],this.available=[],this.loading=!0,this.error="",this.showModal=!1,this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([this.loadAssigned(),qs.list().catch(()=>[])]);this.assigned=t,this.available=e}catch(t){this.error=t.message}finally{this.loading=!1}}async loadAssigned(){try{const{getTenantToken:t}=await pn(async()=>{const{getTenantToken:i}=await Promise.resolve().then(()=>Wa);return{getTenantToken:i}},void 0,import.meta.url),e=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",s=await fetch(`${e}/api/skill-assignments/claws/${this.clawId}`,{headers:{Authorization:`Bearer ${t()??""}`}});return s.ok?((await s.json()).assignments??[]).map(i=>({slug:i.skillSlug,name:i.skillName??i.skillSlug,assignedAt:i.assignedAt})):[]}catch{return[]}}async assign(t){this.saving=!0;try{await qe.assignClaw(this.clawId,t),this.assigned=await this.loadAssigned(),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async unassign(t){try{const{getTenantToken:e}=await pn(async()=>{const{getTenantToken:a}=await Promise.resolve().then(()=>Wa);return{getTenantToken:a}},void 0,import.meta.url),s=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";await fetch(`${s}/api/skill-assignments/claws/${this.clawId}/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${e()??""}`}}),this.assigned=this.assigned.filter(a=>a.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}render(){const t=this.assignedSlugs(),e=this.available.filter(s=>!t.has(s.slug));return o`
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
    `}};ie([B()],Wt.prototype,"clawId",2);ie([B()],Wt.prototype,"wsUrl",2);ie([d()],Wt.prototype,"assigned",2);ie([d()],Wt.prototype,"available",2);ie([d()],Wt.prototype,"loading",2);ie([d()],Wt.prototype,"error",2);ie([d()],Wt.prototype,"showModal",2);ie([d()],Wt.prototype,"saving",2);Wt=ie([J("ccl-claw-skills")],Wt);var ql=Object.defineProperty,Wl=Object.getOwnPropertyDescriptor,_e=(t,e,s,a)=>{for(var i=a>1?void 0:a?Wl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&ql(e,s,i),i};let de=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.items=[],this.loading=!0,this.error="",this.timeFilter="week"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{this.items=await ia.list({clawId:this.clawId})}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){const t=Date.now(),s={today:864e5,week:6048e5,month:2592e6,all:1/0}[this.timeFilter];return this.items.filter(a=>t-new Date(a.createdAt).getTime()<s)}stats(t){const e=t.length,s=t.filter(n=>n.status==="completed").length,a=t.filter(n=>n.status==="failed").length,i=t.filter(n=>n.status==="running").length;return{total:e,completed:s,failed:a,running:i}}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered(),e=this.stats(t),s={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return o`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Usage</div>
          <div style="display:flex;gap:4px">
            ${["today","week","month","all"].map(a=>o`
              <button class="btn btn-sm ${this.timeFilter===a?"btn-primary":"btn-ghost"}" @click=${()=>{this.timeFilter=a}}>
                ${a}
              </button>
            `)}
          </div>
        </div>

        ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

        <div class="stat-grid">
          ${[["Total",e.total],["Completed",e.completed],["Failed",e.failed],["Running",e.running]].map(([a,i])=>o`
            <div class="stat-card">
              <div class="stat-value">${i}</div>
              <div class="stat-label">${a}</div>
            </div>
          `)}
        </div>

        ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:t.length===0?o`<div class="empty-state"><div class="empty-state-title">No executions</div></div>`:o`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Task</th><th>Status</th><th>Duration</th><th>Started</th></tr></thead>
                  <tbody>
                    ${t.slice().reverse().map(a=>o`
                      <tr>
                        <td style="font-size:12px;font-family:var(--mono)">${a.taskId}</td>
                        <td><span class="badge ${s[a.status]??"badge-gray"}">${a.status}</span></td>
                        <td style="font-size:12px;color:var(--muted)">${this.duration(a)}</td>
                        <td style="font-size:12px;color:var(--muted)">${this.fmt(a.createdAt)}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>`}
      </div>
    `}};_e([B()],de.prototype,"clawId",2);_e([B()],de.prototype,"wsUrl",2);_e([d()],de.prototype,"items",2);_e([d()],de.prototype,"loading",2);_e([d()],de.prototype,"error",2);_e([d()],de.prototype,"timeFilter",2);de=_e([J("ccl-claw-usage")],de);var Hl=Object.defineProperty,Kl=Object.getOwnPropertyDescriptor,ae=(t,e,s,a)=>{for(var i=a>1?void 0:a?Kl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Hl(e,s,i),i};const Vl=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Es(t,e={}){const s=await fetch(`${Vl}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${at()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let Ht=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.jobs=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",schedule:"0 9 * * 1-5",taskId:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Es(`/api/claws/${this.clawId}/cron`);this.jobs=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await Es(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.jobs=this.jobs.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async removeCronJob(t){if(confirm(`Delete cron job "${t.name}"?`))try{await Es(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"DELETE"}),this.jobs=this.jobs.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Es(`/api/claws/${this.clawId}/cron`,{method:"POST",body:JSON.stringify(this.form)});e&&(this.jobs=[e,...this.jobs]),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return o`
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
    `}};ae([B()],Ht.prototype,"clawId",2);ae([B()],Ht.prototype,"wsUrl",2);ae([d()],Ht.prototype,"jobs",2);ae([d()],Ht.prototype,"loading",2);ae([d()],Ht.prototype,"error",2);ae([d()],Ht.prototype,"showModal",2);ae([d()],Ht.prototype,"form",2);ae([d()],Ht.prototype,"saving",2);Ht=ae([J("ccl-claw-cron")],Ht);var Gl=Object.defineProperty,Jl=Object.getOwnPropertyDescriptor,Ve=(t,e,s,a)=>{for(var i=a>1?void 0:a?Jl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Gl(e,s,i),i};const Yl=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function un(t,e={}){const s=await fetch(`${Yl}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${at()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let Se=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.nodes=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await un(`/api/claws/${this.clawId}/nodes`);this.nodes=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async unpair(t){if(confirm(`Unpair node "${t.name??t.id}"?`))try{await un(`/api/claws/${this.clawId}/nodes/${t.id}`,{method:"DELETE"}),this.nodes=this.nodes.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return o`
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
    `}};Ve([B()],Se.prototype,"clawId",2);Ve([B()],Se.prototype,"wsUrl",2);Ve([d()],Se.prototype,"nodes",2);Ve([d()],Se.prototype,"loading",2);Ve([d()],Se.prototype,"error",2);Se=Ve([J("ccl-claw-nodes")],Se);var Ql=Object.defineProperty,Xl=Object.getOwnPropertyDescriptor,Vt=(t,e,s,a)=>{for(var i=a>1?void 0:a?Xl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Ql(e,s,i),i};const Zl=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function As(t,e={}){const s=await fetch(`${Zl}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${at()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}const tc=["discord","slack","telegram","whatsapp","signal","googlechat","nostr"],ec={discord:[{key:"token",label:"Bot Token",type:"password"},{key:"guildId",label:"Guild ID"}],slack:[{key:"botToken",label:"Bot Token",type:"password"},{key:"appToken",label:"App Token",type:"password"}],telegram:[{key:"token",label:"Bot Token",type:"password"}],whatsapp:[{key:"phoneNumberId",label:"Phone Number ID"},{key:"accessToken",label:"Access Token",type:"password"}],signal:[{key:"phone",label:"Phone Number"}],googlechat:[{key:"serviceAccountKey",label:"Service Account Key (JSON)",type:"password"}],nostr:[{key:"privateKey",label:"Private Key (nsec)",type:"password"},{key:"relays",label:"Relay URLs (comma-separated)"}]};let Rt=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.channels=[],this.loading=!0,this.error="",this.showModal=!1,this.selectedType="discord",this.form={},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await As(`/api/claws/${this.clawId}/channels`);this.channels=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await As(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.channels=this.channels.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async removeChannel(t){if(confirm(`Delete ${t.type} channel?`))try{await As(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"DELETE"}),this.channels=this.channels.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await As(`/api/claws/${this.clawId}/channels`,{method:"POST",body:JSON.stringify({type:this.selectedType,config:this.form})});e&&(this.channels=[e,...this.channels]),this.showModal=!1,this.form={}}catch(e){this.error=e.message}finally{this.saving=!1}}statusDot(t){return o`<span class="dot ${{connected:"dot-green",error:"dot-red",stopped:"dot-gray",pending:"dot-yellow"}[t]??"dot-gray"}"></span>`}render(){const t=ec[this.selectedType]??[];return o`
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
                    ${tc.map(e=>o`<option value=${e}>${e}</option>`)}
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
    `}};Vt([B()],Rt.prototype,"clawId",2);Vt([B()],Rt.prototype,"wsUrl",2);Vt([d()],Rt.prototype,"channels",2);Vt([d()],Rt.prototype,"loading",2);Vt([d()],Rt.prototype,"error",2);Vt([d()],Rt.prototype,"showModal",2);Vt([d()],Rt.prototype,"selectedType",2);Vt([d()],Rt.prototype,"form",2);Vt([d()],Rt.prototype,"saving",2);Rt=Vt([J("ccl-claw-channels")],Rt);var sc=Object.defineProperty,ic=Object.getOwnPropertyDescriptor,Pe=(t,e,s,a)=>{for(var i=a>1?void 0:a?ic(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&sc(e,s,i),i};let he=class extends F{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.lines=[],this.level="all",this.connState="connecting",this.autoScroll=!0,this.gw=null,this.logEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.autoScroll&&this.logEnd?.scrollIntoView()}connect(){this.connState="connecting",this.gw=new fr({url:this.wsUrl,onEvent:t=>{if(t.type==="connected"){this.connState="connected",this.gw?.send({type:"logs.subscribe"});return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type!=="message")return;const e=t.data;e.type==="log"&&(this.lines=[...this.lines.slice(-2e3),{ts:e.ts??new Date().toISOString(),level:e.level??"info",msg:e.message??""}])}})}filtered(){return this.level==="all"?this.lines:this.lines.filter(t=>t.level===this.level)}levelClass(t){return{error:"log-line-error",warn:"log-line-warn",info:"log-line-info"}[t]??""}clear(){this.lines=[]}render(){const t=this.filtered();return o`
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
    `}};Pe([B()],he.prototype,"clawId",2);Pe([B()],he.prototype,"wsUrl",2);Pe([d()],he.prototype,"lines",2);Pe([d()],he.prototype,"level",2);Pe([d()],he.prototype,"connState",2);Pe([d()],he.prototype,"autoScroll",2);he=Pe([J("ccl-claw-logs")],he);var ac=Object.getOwnPropertyDescriptor,nc=(t,e,s,a)=>{for(var i=a>1?void 0:a?ac(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=r(i)||i);return i};let qi=class extends F{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.saving=!1,this.error="",this.associated=[],this.allProjects=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="";try{const[t,e]=await Promise.all([ct.projects(this.clawId),Ct.list()]);this.associated=t,this.allProjects=e}catch(t){this.error=t.message??"Failed to load project associations"}finally{this.loading=!1}}}async associate(t){this.saving=!0;try{await ct.associateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to associate project"}finally{this.saving=!1}}async unassociate(t){this.saving=!0;try{await ct.unassociateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to remove project association"}finally{this.saving=!1}}render(){const t=new Set(this.associated.map(s=>s.id)),e=this.allProjects.filter(s=>!t.has(s.id));return o`
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
    `}};qi.properties={clawId:{type:String},loading:{state:!0},saving:{state:!0},error:{state:!0},associated:{state:!0},allProjects:{state:!0}};qi=nc([J("ccl-claw-projects")],qi);var rc=Object.getOwnPropertyDescriptor,oc=(t,e,s,a)=>{for(var i=a>1?void 0:a?rc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=r(i)||i);return i};let Wi=class extends F{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.error="",this.directories=[],this.selectedDirectoryId="",this.files=[],this.filesLoading=!1,this.selectedFilePath="",this.selectedFileContent="",this.fileLoading=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="",this.selectedDirectoryId="",this.files=[],this.selectedFilePath="",this.selectedFileContent="";try{this.directories=await ct.directories(this.clawId),this.directories.length>0&&(this.selectedDirectoryId=this.directories[0].id,await this.loadFiles(this.selectedDirectoryId))}catch(t){this.error=t.message??"Failed to load workspace sync metadata"}finally{this.loading=!1}}}async loadFiles(t){if(t){this.filesLoading=!0,this.selectedFilePath="",this.selectedFileContent="";try{this.files=await ct.directoryFiles(this.clawId,t)}catch(e){this.error=e.message??"Failed to load files",this.files=[]}finally{this.filesLoading=!1}}}async selectFile(t){if(!(!this.selectedDirectoryId||!t)){this.selectedFilePath=t,this.fileLoading=!0;try{const e=await ct.directoryFileContent(this.clawId,this.selectedDirectoryId,t);this.selectedFileContent=e.content??""}catch(e){this.error=e.message??"Failed to load file content",this.selectedFileContent=""}finally{this.fileLoading=!1}}}badgeClass(t){return t==="synced"?"badge badge-green":t==="error"?"badge badge-red":"badge badge-yellow"}render(){const t=this.directories.find(e=>e.id===this.selectedDirectoryId)??null;return o`
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
    `}};Wi.properties={clawId:{type:String},loading:{state:!0},error:{state:!0},directories:{state:!0},selectedDirectoryId:{state:!0},files:{state:!0},filesLoading:{state:!0},selectedFilePath:{state:!0},selectedFileContent:{state:!0},fileLoading:{state:!0}};Wi=oc([J("ccl-claw-workspace")],Wi);var lc=Object.defineProperty,cc=Object.getOwnPropertyDescriptor,tt=(t,e,s,a)=>{for(var i=a>1?void 0:a?cc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&lc(e,s,i),i};const dc=[{id:"chat",label:"Chat"},{id:"agents",label:"Agents"},{id:"config",label:"Config"},{id:"sessions",label:"Sessions"},{id:"skills",label:"Skills"},{id:"usage",label:"Usage"},{id:"cron",label:"Cron"},{id:"nodes",label:"Nodes"},{id:"channels",label:"Channels"},{id:"projects",label:"Projects"},{id:"workspace",label:"Workspace"},{id:"logs",label:"Logs"}];let Z=class extends F{constructor(){super(...arguments),this.refreshTimer=null,this.tenantId="",this.clawList=[],this.loading=!1,this.error="",this.showRegisterModal=!1,this.showManualRegister=!1,this.registerName="",this.registering=!1,this.registerError="",this.newClaw=null,this.apiKeyCopied=!1,this.pluginEnvCopied=!1,this.pluginEnvDownloaded=!1,this.panelOpen=!1,this.activeClaw=null,this.activeTab="chat",this.defaultClawId=null,this.savingDefaultClaw=!1,this.defaultActionClawId=null,this.deleteConfirmId=null,this.deleting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadClaws(),this.startPresenceRefresh()}disconnectedCallback(){super.disconnectedCallback(),this.refreshTimer!==null&&(clearInterval(this.refreshTimer),this.refreshTimer=null)}async loadClaws(){this.loading=!0,this.error="";try{const[t,e]=await Promise.all([ct.list(),this.tenantId?St.defaultClaw(this.tenantId):Promise.resolve({defaultClawId:null})]);this.clawList=t,this.defaultClawId=e.defaultClawId}catch(t){this.error=t.message??"Failed to load claws"}finally{this.loading=!1}}isDefaultClaw(t){return this.defaultClawId!==null&&Number(t.id)===this.defaultClawId}async setDefaultClaw(t,e){if(this.tenantId){this.savingDefaultClaw=!0,this.defaultActionClawId=e??null;try{const s=await St.setDefaultClaw(this.tenantId,t);this.defaultClawId=s.defaultClawId}catch(s){this.error=s.message??"Failed to save default claw"}finally{this.savingDefaultClaw=!1,this.defaultActionClawId=null}}}startPresenceRefresh(){this.refreshTimer!==null&&clearInterval(this.refreshTimer),this.refreshTimer=setInterval(()=>{this.refreshPresence()},15e3)}async refreshPresence(){try{this.clawList=await ct.list()}catch{}}openPanel(t){this.activeClaw=t,this.activeTab="chat",this.panelOpen=!0,this.error="",document.body.style.overflow="hidden"}closePanel(){this.panelOpen=!1,document.body.style.overflow="",setTimeout(()=>{this.activeClaw=null},300)}async handleRegister(){if(this.registerName.trim()){this.registering=!0,this.registerError="";try{const t=await ct.register(this.registerName.trim());this.newClaw=t,this.clawList=[...this.clawList,t],this.defaultClawId==null&&(this.defaultClawId=Number(t.id)),this.registerName=""}catch(t){this.registerError=t.message??"Registration failed"}finally{this.registering=!1}}}closeRegisterModal(){this.showRegisterModal=!1,this.showManualRegister=!1,this.newClaw=null,this.registerName="",this.registerError="",this.apiKeyCopied=!1,this.pluginEnvCopied=!1,this.pluginEnvDownloaded=!1}async copyApiKey(){if(this.newClaw)try{await navigator.clipboard.writeText(this.newClaw.apiKey),this.apiKeyCopied=!0,setTimeout(()=>{this.apiKeyCopied=!1},2e3)}catch{}}buildPluginEnvTemplate(){const t=at()??"",e=(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,""),s=this.newClaw?.name??"openclaw-node";return[`CODERCLAW_LINK_URL=${e}`,`CODERCLAW_LINK_TENANT_TOKEN=${t}`,`CODERCLAW_LINK_CLAW_NAME=${s}`,`CODERCLAW_LINK_CLAW_ID=${this.newClaw?.id??""}`,`CODERCLAW_LINK_API_KEY=${this.newClaw?.apiKey??""}`,"OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copyPluginEnvTemplate(){if(this.newClaw){if(!at()){this.registerError="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(this.buildPluginEnvTemplate()),this.pluginEnvCopied=!0,setTimeout(()=>{this.pluginEnvCopied=!1},2e3)}catch{this.registerError="Failed to copy plugin env file."}}}downloadPluginEnvTemplate(){if(this.newClaw){if(!at()){this.registerError="No tenant token found for current workspace session.";return}try{const t=this.buildPluginEnvTemplate(),e=new Blob([`${t}
`],{type:"text/plain;charset=utf-8"}),s=URL.createObjectURL(e),a=document.createElement("a");a.href=s,a.download="coderclawlink.env",a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(s),this.pluginEnvDownloaded=!0,setTimeout(()=>{this.pluginEnvDownloaded=!1},2e3)}catch{this.registerError="Failed to download plugin env file."}}}async handleDelete(t){this.deleting=!0;try{await ct.remove(t),this.clawList=this.clawList.filter(e=>e.id!==t),this.deleteConfirmId=null,this.activeClaw?.id===t&&this.closePanel()}catch(e){this.error=e.message??"Delete failed"}finally{this.deleting=!1}}statusBadge(t){return t.status==="active"?o`<span class="badge badge-green">active</span>`:t.status==="suspended"?o`<span class="badge badge-red">suspended</span>`:o`<span class="badge badge-gray">${t.status}</span>`}connectedDot(t){const e=t.status==="active"&&t.connectedAt?"dot dot-green":"dot dot-gray";return o`<span class="${e}" title="${t.connectedAt?"connected":"offline"}"></span>`}renderRegisterModal(){return this.showRegisterModal?o`
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
    `}renderPanel(){if(!this.activeClaw)return o``;const t=this.activeClaw,e=ct.wsUrl(t.id);return o`
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
          ${dc.map(s=>o`
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
    `}};tt([B()],Z.prototype,"tenantId",2);tt([d()],Z.prototype,"clawList",2);tt([d()],Z.prototype,"loading",2);tt([d()],Z.prototype,"error",2);tt([d()],Z.prototype,"showRegisterModal",2);tt([d()],Z.prototype,"showManualRegister",2);tt([d()],Z.prototype,"registerName",2);tt([d()],Z.prototype,"registering",2);tt([d()],Z.prototype,"registerError",2);tt([d()],Z.prototype,"newClaw",2);tt([d()],Z.prototype,"apiKeyCopied",2);tt([d()],Z.prototype,"pluginEnvCopied",2);tt([d()],Z.prototype,"pluginEnvDownloaded",2);tt([d()],Z.prototype,"panelOpen",2);tt([d()],Z.prototype,"activeClaw",2);tt([d()],Z.prototype,"activeTab",2);tt([d()],Z.prototype,"defaultClawId",2);tt([d()],Z.prototype,"savingDefaultClaw",2);tt([d()],Z.prototype,"defaultActionClawId",2);tt([d()],Z.prototype,"deleteConfirmId",2);tt([d()],Z.prototype,"deleting",2);Z=tt([J("ccl-claws")],Z);var hc=Object.defineProperty,pc=Object.getOwnPropertyDescriptor,ue=(t,e,s,a)=>{for(var i=a>1?void 0:a?pc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&hc(e,s,i),i};let te=class extends F{constructor(){super(...arguments),this.tenantId="",this.available=[],this.assigned=[],this.loading=!0,this.error="",this.search="",this.tab="assigned"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([qs.list().catch(()=>[]),qe.listTenant().catch(()=>[])]);this.available=t,this.assigned=e}catch(t){this.error=t.message}finally{this.loading=!1}}async assign(t){try{await qe.assignTenant(t),this.assigned=await qe.listTenant()}catch(e){this.error=e.message}}async unassign(t){try{await qe.unassignTenant(t),this.assigned=this.assigned.filter(e=>e.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}filteredAvailable(){const t=this.search.toLowerCase();return this.available.filter(e=>!t||e.name.toLowerCase().includes(t)||(e.description??"").toLowerCase().includes(t))}render(){const t=this.assignedSlugs();return o`
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
    `}};ue([B()],te.prototype,"tenantId",2);ue([d()],te.prototype,"available",2);ue([d()],te.prototype,"assigned",2);ue([d()],te.prototype,"loading",2);ue([d()],te.prototype,"error",2);ue([d()],te.prototype,"search",2);ue([d()],te.prototype,"tab",2);te=ue([J("ccl-skills")],te);function uc(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ze={},ui,gn;function gc(){return gn||(gn=1,ui=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ui}var gi={},oe={},mn;function Ie(){if(mn)return oe;mn=1;let t;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return oe.getSymbolSize=function(a){if(!a)throw new Error('"version" cannot be null or undefined');if(a<1||a>40)throw new Error('"version" should be in range from 1 to 40');return a*4+17},oe.getSymbolTotalCodewords=function(a){return e[a]},oe.getBCHDigit=function(s){let a=0;for(;s!==0;)a++,s>>>=1;return a},oe.setToSJISFunction=function(a){if(typeof a!="function")throw new Error('"toSJISFunc" is not a valid function.');t=a},oe.isKanjiModeEnabled=function(){return typeof t<"u"},oe.toSJIS=function(a){return t(a)},oe}var mi={},fn;function ua(){return fn||(fn=1,(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function e(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+s)}}t.isValid=function(a){return a&&typeof a.bit<"u"&&a.bit>=0&&a.bit<4},t.from=function(a,i){if(t.isValid(a))return a;try{return e(a)}catch{return i}}})(mi)),mi}var fi,vn;function mc(){if(vn)return fi;vn=1;function t(){this.buffer=[],this.length=0}return t.prototype={get:function(e){const s=Math.floor(e/8);return(this.buffer[s]>>>7-e%8&1)===1},put:function(e,s){for(let a=0;a<s;a++)this.putBit((e>>>s-a-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const s=Math.floor(this.length/8);this.buffer.length<=s&&this.buffer.push(0),e&&(this.buffer[s]|=128>>>this.length%8),this.length++}},fi=t,fi}var vi,bn;function fc(){if(bn)return vi;bn=1;function t(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return t.prototype.set=function(e,s,a,i){const n=e*this.size+s;this.data[n]=a,i&&(this.reservedBit[n]=!0)},t.prototype.get=function(e,s){return this.data[e*this.size+s]},t.prototype.xor=function(e,s,a){this.data[e*this.size+s]^=a},t.prototype.isReserved=function(e,s){return this.reservedBit[e*this.size+s]},vi=t,vi}var bi={},yn;function vc(){return yn||(yn=1,(function(t){const e=Ie().getSymbolSize;t.getRowColCoords=function(a){if(a===1)return[];const i=Math.floor(a/7)+2,n=e(a),r=n===145?26:Math.ceil((n-13)/(2*i-2))*2,c=[n-7];for(let l=1;l<i-1;l++)c[l]=c[l-1]-r;return c.push(6),c.reverse()},t.getPositions=function(a){const i=[],n=t.getRowColCoords(a),r=n.length;for(let c=0;c<r;c++)for(let l=0;l<r;l++)c===0&&l===0||c===0&&l===r-1||c===r-1&&l===0||i.push([n[c],n[l]]);return i}})(bi)),bi}var yi={},wn;function bc(){if(wn)return yi;wn=1;const t=Ie().getSymbolSize,e=7;return yi.getPositions=function(a){const i=t(a);return[[0,0],[i-e,0],[0,i-e]]},yi}var wi={},$n;function yc(){return $n||($n=1,(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};t.isValid=function(i){return i!=null&&i!==""&&!isNaN(i)&&i>=0&&i<=7},t.from=function(i){return t.isValid(i)?parseInt(i,10):void 0},t.getPenaltyN1=function(i){const n=i.size;let r=0,c=0,l=0,u=null,p=null;for(let m=0;m<n;m++){c=l=0,u=p=null;for(let g=0;g<n;g++){let f=i.get(m,g);f===u?c++:(c>=5&&(r+=e.N1+(c-5)),u=f,c=1),f=i.get(g,m),f===p?l++:(l>=5&&(r+=e.N1+(l-5)),p=f,l=1)}c>=5&&(r+=e.N1+(c-5)),l>=5&&(r+=e.N1+(l-5))}return r},t.getPenaltyN2=function(i){const n=i.size;let r=0;for(let c=0;c<n-1;c++)for(let l=0;l<n-1;l++){const u=i.get(c,l)+i.get(c,l+1)+i.get(c+1,l)+i.get(c+1,l+1);(u===4||u===0)&&r++}return r*e.N2},t.getPenaltyN3=function(i){const n=i.size;let r=0,c=0,l=0;for(let u=0;u<n;u++){c=l=0;for(let p=0;p<n;p++)c=c<<1&2047|i.get(u,p),p>=10&&(c===1488||c===93)&&r++,l=l<<1&2047|i.get(p,u),p>=10&&(l===1488||l===93)&&r++}return r*e.N3},t.getPenaltyN4=function(i){let n=0;const r=i.data.length;for(let l=0;l<r;l++)n+=i.data[l];return Math.abs(Math.ceil(n*100/r/5)-10)*e.N4};function s(a,i,n){switch(a){case t.Patterns.PATTERN000:return(i+n)%2===0;case t.Patterns.PATTERN001:return i%2===0;case t.Patterns.PATTERN010:return n%3===0;case t.Patterns.PATTERN011:return(i+n)%3===0;case t.Patterns.PATTERN100:return(Math.floor(i/2)+Math.floor(n/3))%2===0;case t.Patterns.PATTERN101:return i*n%2+i*n%3===0;case t.Patterns.PATTERN110:return(i*n%2+i*n%3)%2===0;case t.Patterns.PATTERN111:return(i*n%3+(i+n)%2)%2===0;default:throw new Error("bad maskPattern:"+a)}}t.applyMask=function(i,n){const r=n.size;for(let c=0;c<r;c++)for(let l=0;l<r;l++)n.isReserved(l,c)||n.xor(l,c,s(i,l,c))},t.getBestMask=function(i,n){const r=Object.keys(t.Patterns).length;let c=0,l=1/0;for(let u=0;u<r;u++){n(u),t.applyMask(u,i);const p=t.getPenaltyN1(i)+t.getPenaltyN2(i)+t.getPenaltyN3(i)+t.getPenaltyN4(i);t.applyMask(u,i),p<l&&(l=p,c=u)}return c}})(wi)),wi}var _s={},kn;function vr(){if(kn)return _s;kn=1;const t=ua(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],s=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return _s.getBlocksCount=function(i,n){switch(n){case t.L:return e[(i-1)*4+0];case t.M:return e[(i-1)*4+1];case t.Q:return e[(i-1)*4+2];case t.H:return e[(i-1)*4+3];default:return}},_s.getTotalCodewordsCount=function(i,n){switch(n){case t.L:return s[(i-1)*4+0];case t.M:return s[(i-1)*4+1];case t.Q:return s[(i-1)*4+2];case t.H:return s[(i-1)*4+3];default:return}},_s}var $i={},os={},xn;function wc(){if(xn)return os;xn=1;const t=new Uint8Array(512),e=new Uint8Array(256);return(function(){let a=1;for(let i=0;i<255;i++)t[i]=a,e[a]=i,a<<=1,a&256&&(a^=285);for(let i=255;i<512;i++)t[i]=t[i-255]})(),os.log=function(a){if(a<1)throw new Error("log("+a+")");return e[a]},os.exp=function(a){return t[a]},os.mul=function(a,i){return a===0||i===0?0:t[e[a]+e[i]]},os}var Cn;function $c(){return Cn||(Cn=1,(function(t){const e=wc();t.mul=function(a,i){const n=new Uint8Array(a.length+i.length-1);for(let r=0;r<a.length;r++)for(let c=0;c<i.length;c++)n[r+c]^=e.mul(a[r],i[c]);return n},t.mod=function(a,i){let n=new Uint8Array(a);for(;n.length-i.length>=0;){const r=n[0];for(let l=0;l<i.length;l++)n[l]^=e.mul(i[l],r);let c=0;for(;c<n.length&&n[c]===0;)c++;n=n.slice(c)}return n},t.generateECPolynomial=function(a){let i=new Uint8Array([1]);for(let n=0;n<a;n++)i=t.mul(i,new Uint8Array([1,e.exp(n)]));return i}})($i)),$i}var ki,Tn;function kc(){if(Tn)return ki;Tn=1;const t=$c();function e(s){this.genPoly=void 0,this.degree=s,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(a){this.degree=a,this.genPoly=t.generateECPolynomial(this.degree)},e.prototype.encode=function(a){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(a.length+this.degree);i.set(a);const n=t.mod(i,this.genPoly),r=this.degree-n.length;if(r>0){const c=new Uint8Array(this.degree);return c.set(n,r),c}return n},ki=e,ki}var xi={},Ci={},Ti={},Sn;function br(){return Sn||(Sn=1,Ti.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),Ti}var jt={},En;function yr(){if(En)return jt;En=1;const t="[0-9]+",e="[A-Z $%*+\\-./:]+";let s="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";s=s.replace(/u/g,"\\u");const a="(?:(?![A-Z0-9 $%*+\\-./:]|"+s+`)(?:.|[\r
]))+`;jt.KANJI=new RegExp(s,"g"),jt.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),jt.BYTE=new RegExp(a,"g"),jt.NUMERIC=new RegExp(t,"g"),jt.ALPHANUMERIC=new RegExp(e,"g");const i=new RegExp("^"+s+"$"),n=new RegExp("^"+t+"$"),r=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return jt.testKanji=function(l){return i.test(l)},jt.testNumeric=function(l){return n.test(l)},jt.testAlphanumeric=function(l){return r.test(l)},jt}var An;function Re(){return An||(An=1,(function(t){const e=br(),s=yr();t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(n,r){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!e.isValid(r))throw new Error("Invalid version: "+r);return r>=1&&r<10?n.ccBits[0]:r<27?n.ccBits[1]:n.ccBits[2]},t.getBestModeForData=function(n){return s.testNumeric(n)?t.NUMERIC:s.testAlphanumeric(n)?t.ALPHANUMERIC:s.testKanji(n)?t.KANJI:t.BYTE},t.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},t.isValid=function(n){return n&&n.bit&&n.ccBits};function a(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+i)}}t.from=function(n,r){if(t.isValid(n))return n;try{return a(n)}catch{return r}}})(Ci)),Ci}var _n;function xc(){return _n||(_n=1,(function(t){const e=Ie(),s=vr(),a=ua(),i=Re(),n=br(),r=7973,c=e.getBCHDigit(r);function l(g,f,b){for(let C=1;C<=40;C++)if(f<=t.getCapacity(C,b,g))return C}function u(g,f){return i.getCharCountIndicator(g,f)+4}function p(g,f){let b=0;return g.forEach(function(C){const H=u(C.mode,f);b+=H+C.getBitsLength()}),b}function m(g,f){for(let b=1;b<=40;b++)if(p(g,b)<=t.getCapacity(b,f,i.MIXED))return b}t.from=function(f,b){return n.isValid(f)?parseInt(f,10):b},t.getCapacity=function(f,b,C){if(!n.isValid(f))throw new Error("Invalid QR Code version");typeof C>"u"&&(C=i.BYTE);const H=e.getSymbolTotalCodewords(f),R=s.getTotalCodewordsCount(f,b),N=(H-R)*8;if(C===i.MIXED)return N;const P=N-u(C,f);switch(C){case i.NUMERIC:return Math.floor(P/10*3);case i.ALPHANUMERIC:return Math.floor(P/11*2);case i.KANJI:return Math.floor(P/13);case i.BYTE:default:return Math.floor(P/8)}},t.getBestVersionForData=function(f,b){let C;const H=a.from(b,a.M);if(Array.isArray(f)){if(f.length>1)return m(f,H);if(f.length===0)return 1;C=f[0]}else C=f;return l(C.mode,C.getLength(),H)},t.getEncodedBits=function(f){if(!n.isValid(f)||f<7)throw new Error("Invalid QR Code version");let b=f<<12;for(;e.getBCHDigit(b)-c>=0;)b^=r<<e.getBCHDigit(b)-c;return f<<12|b}})(xi)),xi}var Si={},Pn;function Cc(){if(Pn)return Si;Pn=1;const t=Ie(),e=1335,s=21522,a=t.getBCHDigit(e);return Si.getEncodedBits=function(n,r){const c=n.bit<<3|r;let l=c<<10;for(;t.getBCHDigit(l)-a>=0;)l^=e<<t.getBCHDigit(l)-a;return(c<<10|l)^s},Si}var Ei={},Ai,In;function Tc(){if(In)return Ai;In=1;const t=Re();function e(s){this.mode=t.NUMERIC,this.data=s.toString()}return e.getBitsLength=function(a){return 10*Math.floor(a/3)+(a%3?a%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(a){let i,n,r;for(i=0;i+3<=this.data.length;i+=3)n=this.data.substr(i,3),r=parseInt(n,10),a.put(r,10);const c=this.data.length-i;c>0&&(n=this.data.substr(i),r=parseInt(n,10),a.put(r,c*3+1))},Ai=e,Ai}var _i,Rn;function Sc(){if(Rn)return _i;Rn=1;const t=Re(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function s(a){this.mode=t.ALPHANUMERIC,this.data=a}return s.getBitsLength=function(i){return 11*Math.floor(i/2)+6*(i%2)},s.prototype.getLength=function(){return this.data.length},s.prototype.getBitsLength=function(){return s.getBitsLength(this.data.length)},s.prototype.write=function(i){let n;for(n=0;n+2<=this.data.length;n+=2){let r=e.indexOf(this.data[n])*45;r+=e.indexOf(this.data[n+1]),i.put(r,11)}this.data.length%2&&i.put(e.indexOf(this.data[n]),6)},_i=s,_i}var Pi,Dn;function Ec(){if(Dn)return Pi;Dn=1;const t=Re();function e(s){this.mode=t.BYTE,typeof s=="string"?this.data=new TextEncoder().encode(s):this.data=new Uint8Array(s)}return e.getBitsLength=function(a){return a*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(s){for(let a=0,i=this.data.length;a<i;a++)s.put(this.data[a],8)},Pi=e,Pi}var Ii,Ln;function Ac(){if(Ln)return Ii;Ln=1;const t=Re(),e=Ie();function s(a){this.mode=t.KANJI,this.data=a}return s.getBitsLength=function(i){return i*13},s.prototype.getLength=function(){return this.data.length},s.prototype.getBitsLength=function(){return s.getBitsLength(this.data.length)},s.prototype.write=function(a){let i;for(i=0;i<this.data.length;i++){let n=e.toSJIS(this.data[i]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[i]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),a.put(n,13)}},Ii=s,Ii}var Ri={exports:{}},Mn;function _c(){return Mn||(Mn=1,(function(t){var e={single_source_shortest_paths:function(s,a,i){var n={},r={};r[a]=0;var c=e.PriorityQueue.make();c.push(a,0);for(var l,u,p,m,g,f,b,C,H;!c.empty();){l=c.pop(),u=l.value,m=l.cost,g=s[u]||{};for(p in g)g.hasOwnProperty(p)&&(f=g[p],b=m+f,C=r[p],H=typeof r[p]>"u",(H||C>b)&&(r[p]=b,c.push(p,b),n[p]=u))}if(typeof i<"u"&&typeof r[i]>"u"){var R=["Could not find a path from ",a," to ",i,"."].join("");throw new Error(R)}return n},extract_shortest_path_from_predecessor_list:function(s,a){for(var i=[],n=a;n;)i.push(n),s[n],n=s[n];return i.reverse(),i},find_path:function(s,a,i){var n=e.single_source_shortest_paths(s,a,i);return e.extract_shortest_path_from_predecessor_list(n,i)},PriorityQueue:{make:function(s){var a=e.PriorityQueue,i={},n;s=s||{};for(n in a)a.hasOwnProperty(n)&&(i[n]=a[n]);return i.queue=[],i.sorter=s.sorter||a.default_sorter,i},default_sorter:function(s,a){return s.cost-a.cost},push:function(s,a){var i={value:s,cost:a};this.queue.push(i),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=e})(Ri)),Ri.exports}var Nn;function Pc(){return Nn||(Nn=1,(function(t){const e=Re(),s=Tc(),a=Sc(),i=Ec(),n=Ac(),r=yr(),c=Ie(),l=_c();function u(R){return unescape(encodeURIComponent(R)).length}function p(R,N,P){const $=[];let q;for(;(q=R.exec(P))!==null;)$.push({data:q[0],index:q.index,mode:N,length:q[0].length});return $}function m(R){const N=p(r.NUMERIC,e.NUMERIC,R),P=p(r.ALPHANUMERIC,e.ALPHANUMERIC,R);let $,q;return c.isKanjiModeEnabled()?($=p(r.BYTE,e.BYTE,R),q=p(r.KANJI,e.KANJI,R)):($=p(r.BYTE_KANJI,e.BYTE,R),q=[]),N.concat(P,$,q).sort(function(I,_){return I.index-_.index}).map(function(I){return{data:I.data,mode:I.mode,length:I.length}})}function g(R,N){switch(N){case e.NUMERIC:return s.getBitsLength(R);case e.ALPHANUMERIC:return a.getBitsLength(R);case e.KANJI:return n.getBitsLength(R);case e.BYTE:return i.getBitsLength(R)}}function f(R){return R.reduce(function(N,P){const $=N.length-1>=0?N[N.length-1]:null;return $&&$.mode===P.mode?(N[N.length-1].data+=P.data,N):(N.push(P),N)},[])}function b(R){const N=[];for(let P=0;P<R.length;P++){const $=R[P];switch($.mode){case e.NUMERIC:N.push([$,{data:$.data,mode:e.ALPHANUMERIC,length:$.length},{data:$.data,mode:e.BYTE,length:$.length}]);break;case e.ALPHANUMERIC:N.push([$,{data:$.data,mode:e.BYTE,length:$.length}]);break;case e.KANJI:N.push([$,{data:$.data,mode:e.BYTE,length:u($.data)}]);break;case e.BYTE:N.push([{data:$.data,mode:e.BYTE,length:u($.data)}])}}return N}function C(R,N){const P={},$={start:{}};let q=["start"];for(let w=0;w<R.length;w++){const I=R[w],_=[];for(let x=0;x<I.length;x++){const D=I[x],y=""+w+x;_.push(y),P[y]={node:D,lastCount:0},$[y]={};for(let A=0;A<q.length;A++){const E=q[A];P[E]&&P[E].node.mode===D.mode?($[E][y]=g(P[E].lastCount+D.length,D.mode)-g(P[E].lastCount,D.mode),P[E].lastCount+=D.length):(P[E]&&(P[E].lastCount=D.length),$[E][y]=g(D.length,D.mode)+4+e.getCharCountIndicator(D.mode,N))}}q=_}for(let w=0;w<q.length;w++)$[q[w]].end=0;return{map:$,table:P}}function H(R,N){let P;const $=e.getBestModeForData(R);if(P=e.from(N,$),P!==e.BYTE&&P.bit<$.bit)throw new Error('"'+R+'" cannot be encoded with mode '+e.toString(P)+`.
 Suggested mode is: `+e.toString($));switch(P===e.KANJI&&!c.isKanjiModeEnabled()&&(P=e.BYTE),P){case e.NUMERIC:return new s(R);case e.ALPHANUMERIC:return new a(R);case e.KANJI:return new n(R);case e.BYTE:return new i(R)}}t.fromArray=function(N){return N.reduce(function(P,$){return typeof $=="string"?P.push(H($,null)):$.data&&P.push(H($.data,$.mode)),P},[])},t.fromString=function(N,P){const $=m(N,c.isKanjiModeEnabled()),q=b($),w=C(q,P),I=l.find_path(w.map,"start","end"),_=[];for(let x=1;x<I.length-1;x++)_.push(w.table[I[x]].node);return t.fromArray(f(_))},t.rawSplit=function(N){return t.fromArray(m(N,c.isKanjiModeEnabled()))}})(Ei)),Ei}var On;function Ic(){if(On)return gi;On=1;const t=Ie(),e=ua(),s=mc(),a=fc(),i=vc(),n=bc(),r=yc(),c=vr(),l=kc(),u=xc(),p=Cc(),m=Re(),g=Pc();function f(w,I){const _=w.size,x=n.getPositions(I);for(let D=0;D<x.length;D++){const y=x[D][0],A=x[D][1];for(let E=-1;E<=7;E++)if(!(y+E<=-1||_<=y+E))for(let L=-1;L<=7;L++)A+L<=-1||_<=A+L||(E>=0&&E<=6&&(L===0||L===6)||L>=0&&L<=6&&(E===0||E===6)||E>=2&&E<=4&&L>=2&&L<=4?w.set(y+E,A+L,!0,!0):w.set(y+E,A+L,!1,!0))}}function b(w){const I=w.size;for(let _=8;_<I-8;_++){const x=_%2===0;w.set(_,6,x,!0),w.set(6,_,x,!0)}}function C(w,I){const _=i.getPositions(I);for(let x=0;x<_.length;x++){const D=_[x][0],y=_[x][1];for(let A=-2;A<=2;A++)for(let E=-2;E<=2;E++)A===-2||A===2||E===-2||E===2||A===0&&E===0?w.set(D+A,y+E,!0,!0):w.set(D+A,y+E,!1,!0)}}function H(w,I){const _=w.size,x=u.getEncodedBits(I);let D,y,A;for(let E=0;E<18;E++)D=Math.floor(E/3),y=E%3+_-8-3,A=(x>>E&1)===1,w.set(D,y,A,!0),w.set(y,D,A,!0)}function R(w,I,_){const x=w.size,D=p.getEncodedBits(I,_);let y,A;for(y=0;y<15;y++)A=(D>>y&1)===1,y<6?w.set(y,8,A,!0):y<8?w.set(y+1,8,A,!0):w.set(x-15+y,8,A,!0),y<8?w.set(8,x-y-1,A,!0):y<9?w.set(8,15-y-1+1,A,!0):w.set(8,15-y-1,A,!0);w.set(x-8,8,1,!0)}function N(w,I){const _=w.size;let x=-1,D=_-1,y=7,A=0;for(let E=_-1;E>0;E-=2)for(E===6&&E--;;){for(let L=0;L<2;L++)if(!w.isReserved(D,E-L)){let Mt=!1;A<I.length&&(Mt=(I[A]>>>y&1)===1),w.set(D,E-L,Mt),y--,y===-1&&(A++,y=7)}if(D+=x,D<0||_<=D){D-=x,x=-x;break}}}function P(w,I,_){const x=new s;_.forEach(function(L){x.put(L.mode.bit,4),x.put(L.getLength(),m.getCharCountIndicator(L.mode,w)),L.write(x)});const D=t.getSymbolTotalCodewords(w),y=c.getTotalCodewordsCount(w,I),A=(D-y)*8;for(x.getLengthInBits()+4<=A&&x.put(0,4);x.getLengthInBits()%8!==0;)x.putBit(0);const E=(A-x.getLengthInBits())/8;for(let L=0;L<E;L++)x.put(L%2?17:236,8);return $(x,w,I)}function $(w,I,_){const x=t.getSymbolTotalCodewords(I),D=c.getTotalCodewordsCount(I,_),y=x-D,A=c.getBlocksCount(I,_),E=x%A,L=A-E,Mt=Math.floor(x/A),ge=Math.floor(y/A),Vs=ge+1,Ge=Mt-ge,Gs=new l(Ge);let De=0;const X=new Array(A),Je=new Array(A);let et=0;const gs=new Uint8Array(w.buffer);for(let Gt=0;Gt<A;Gt++){const me=Gt<L?ge:Vs;X[Gt]=gs.slice(De,De+me),Je[Gt]=Gs.encode(X[Gt]),De+=me,et=Math.max(et,me)}const V=new Uint8Array(x);let re=0,xt,gt;for(xt=0;xt<et;xt++)for(gt=0;gt<A;gt++)xt<X[gt].length&&(V[re++]=X[gt][xt]);for(xt=0;xt<Ge;xt++)for(gt=0;gt<A;gt++)V[re++]=Je[gt][xt];return V}function q(w,I,_,x){let D;if(Array.isArray(w))D=g.fromArray(w);else if(typeof w=="string"){let Mt=I;if(!Mt){const ge=g.rawSplit(w);Mt=u.getBestVersionForData(ge,_)}D=g.fromString(w,Mt||40)}else throw new Error("Invalid data");const y=u.getBestVersionForData(D,_);if(!y)throw new Error("The amount of data is too big to be stored in a QR Code");if(!I)I=y;else if(I<y)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+y+`.
`);const A=P(I,_,D),E=t.getSymbolSize(I),L=new a(E);return f(L,I),b(L),C(L,I),R(L,_,0),I>=7&&H(L,I),N(L,A),isNaN(x)&&(x=r.getBestMask(L,R.bind(null,L,_))),r.applyMask(x,L),R(L,_,x),{modules:L,version:I,errorCorrectionLevel:_,maskPattern:x,segments:D}}return gi.create=function(I,_){if(typeof I>"u"||I==="")throw new Error("No input text");let x=e.M,D,y;return typeof _<"u"&&(x=e.from(_.errorCorrectionLevel,e.M),D=u.from(_.version),y=r.from(_.maskPattern),_.toSJISFunc&&t.setToSJISFunction(_.toSJISFunc)),q(I,D,x,y)},gi}var Di={},Li={},jn;function wr(){return jn||(jn=1,(function(t){function e(s){if(typeof s=="number"&&(s=s.toString()),typeof s!="string")throw new Error("Color should be defined as hex string");let a=s.slice().replace("#","").split("");if(a.length<3||a.length===5||a.length>8)throw new Error("Invalid hex color: "+s);(a.length===3||a.length===4)&&(a=Array.prototype.concat.apply([],a.map(function(n){return[n,n]}))),a.length===6&&a.push("F","F");const i=parseInt(a.join(""),16);return{r:i>>24&255,g:i>>16&255,b:i>>8&255,a:i&255,hex:"#"+a.slice(0,6).join("")}}t.getOptions=function(a){a||(a={}),a.color||(a.color={});const i=typeof a.margin>"u"||a.margin===null||a.margin<0?4:a.margin,n=a.width&&a.width>=21?a.width:void 0,r=a.scale||4;return{width:n,scale:n?4:r,margin:i,color:{dark:e(a.color.dark||"#000000ff"),light:e(a.color.light||"#ffffffff")},type:a.type,rendererOpts:a.rendererOpts||{}}},t.getScale=function(a,i){return i.width&&i.width>=a+i.margin*2?i.width/(a+i.margin*2):i.scale},t.getImageWidth=function(a,i){const n=t.getScale(a,i);return Math.floor((a+i.margin*2)*n)},t.qrToImageData=function(a,i,n){const r=i.modules.size,c=i.modules.data,l=t.getScale(r,n),u=Math.floor((r+n.margin*2)*l),p=n.margin*l,m=[n.color.light,n.color.dark];for(let g=0;g<u;g++)for(let f=0;f<u;f++){let b=(g*u+f)*4,C=n.color.light;if(g>=p&&f>=p&&g<u-p&&f<u-p){const H=Math.floor((g-p)/l),R=Math.floor((f-p)/l);C=m[c[H*r+R]?1:0]}a[b++]=C.r,a[b++]=C.g,a[b++]=C.b,a[b]=C.a}}})(Li)),Li}var Bn;function Rc(){return Bn||(Bn=1,(function(t){const e=wr();function s(i,n,r){i.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=r,n.width=r,n.style.height=r+"px",n.style.width=r+"px"}function a(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(n,r,c){let l=c,u=r;typeof l>"u"&&(!r||!r.getContext)&&(l=r,r=void 0),r||(u=a()),l=e.getOptions(l);const p=e.getImageWidth(n.modules.size,l),m=u.getContext("2d"),g=m.createImageData(p,p);return e.qrToImageData(g.data,n,l),s(m,u,p),m.putImageData(g,0,0),u},t.renderToDataURL=function(n,r,c){let l=c;typeof l>"u"&&(!r||!r.getContext)&&(l=r,r=void 0),l||(l={});const u=t.render(n,r,l),p=l.type||"image/png",m=l.rendererOpts||{};return u.toDataURL(p,m.quality)}})(Di)),Di}var Mi={},Un;function Dc(){if(Un)return Mi;Un=1;const t=wr();function e(i,n){const r=i.a/255,c=n+'="'+i.hex+'"';return r<1?c+" "+n+'-opacity="'+r.toFixed(2).slice(1)+'"':c}function s(i,n,r){let c=i+n;return typeof r<"u"&&(c+=" "+r),c}function a(i,n,r){let c="",l=0,u=!1,p=0;for(let m=0;m<i.length;m++){const g=Math.floor(m%n),f=Math.floor(m/n);!g&&!u&&(u=!0),i[m]?(p++,m>0&&g>0&&i[m-1]||(c+=u?s("M",g+r,.5+f+r):s("m",l,0),l=0,u=!1),g+1<n&&i[m+1]||(c+=s("h",p),p=0)):l++}return c}return Mi.render=function(n,r,c){const l=t.getOptions(r),u=n.modules.size,p=n.modules.data,m=u+l.margin*2,g=l.color.light.a?"<path "+e(l.color.light,"fill")+' d="M0 0h'+m+"v"+m+'H0z"/>':"",f="<path "+e(l.color.dark,"stroke")+' d="'+a(p,u,l.margin)+'"/>',b='viewBox="0 0 '+m+" "+m+'"',H='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+b+' shape-rendering="crispEdges">'+g+f+`</svg>
`;return typeof c=="function"&&c(null,H),H},Mi}var zn;function Lc(){if(zn)return ze;zn=1;const t=gc(),e=Ic(),s=Rc(),a=Dc();function i(n,r,c,l,u){const p=[].slice.call(arguments,1),m=p.length,g=typeof p[m-1]=="function";if(!g&&!t())throw new Error("Callback required as last argument");if(g){if(m<2)throw new Error("Too few arguments provided");m===2?(u=c,c=r,r=l=void 0):m===3&&(r.getContext&&typeof u>"u"?(u=l,l=void 0):(u=l,l=c,c=r,r=void 0))}else{if(m<1)throw new Error("Too few arguments provided");return m===1?(c=r,r=l=void 0):m===2&&!r.getContext&&(l=c,c=r,r=void 0),new Promise(function(f,b){try{const C=e.create(c,l);f(n(C,r,l))}catch(C){b(C)}})}try{const f=e.create(c,l);u(null,n(f,r,l))}catch(f){u(f)}}return ze.create=e.create,ze.toCanvas=i.bind(null,s.render),ze.toDataURL=i.bind(null,s.renderToDataURL),ze.toString=i.bind(null,function(n,r,c){return a.render(n,c)}),ze}var Mc=Lc();const Nc=uc(Mc);var Oc=Object.defineProperty,jc=Object.getOwnPropertyDescriptor,O=(t,e,s,a)=>{for(var i=a>1?void 0:a?jc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Oc(e,s,i),i};const Bc=["owner","manager","developer","viewer"];let M=class extends F{constructor(){super(...arguments),this.tenant=null,this.initialTab="members",this.detail=null,this.loading=!0,this.error="",this.tab="members",this.subscription=null,this.usage=null,this.usageDays=30,this.availableClaws=[],this.defaultClawId=null,this.savingDefaultClaw=!1,this.updatingPlan=!1,this.billingCycle="monthly",this.billingEmail="",this.billingBrand="visa",this.billingLast4="",this.showTenantToken=!1,this.copiedTenantToken=!1,this.copiedPluginEnv=!1,this.downloadedPluginEnv=!1,this.mfaStatus=null,this.mfaSetupBusy=!1,this.mfaEnableBusy=!1,this.mfaDisableBusy=!1,this.mfaRegenerateBusy=!1,this.mfaVerifyCode="",this.mfaRecoveryInput="",this.mfaMode="totp",this.mfaManualKey="",this.mfaQrDataUrl="",this.recoveryCodes=[],this.authSessions=[],this.authTokens=[],this.loadingSecurity=!1,this.showInvite=!1,this.inviteEmail="",this.inviteRole="developer",this.inviting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.tab=this.initialTab,this.load()}updated(t){t.has("initialTab")&&this.initialTab!==this.tab&&(this.tab=this.initialTab),t.has("tenant")&&this.tenant&&this.load()}async load(){if(this.tenant){this.loading=!0;try{const[t,e,s,a,i]=await Promise.all([St.get(this.tenant.id),St.subscription(this.tenant.id),Ws.usage(this.usageDays),ct.list(),St.defaultClaw(this.tenant.id)]);this.detail=t,this.subscription=e,this.usage=s,this.availableClaws=a,this.defaultClawId=i.defaultClawId,this.billingEmail=e.billingEmail??"",this.billingBrand=e.billingPaymentBrand??"visa",this.billingLast4=e.billingPaymentLast4??"",this.billingCycle=e.billingCycle??"monthly",await this.loadSecurity()}catch(t){this.error=t.message}finally{this.loading=!1}}}async loadSecurity(){this.loadingSecurity=!0;try{const[t,e,s]=await Promise.all([rt.mfaStatus(),rt.listSessions(),rt.listTokens()]);this.mfaStatus=t,this.authSessions=e,this.authTokens=s}catch(t){this.error=t.message}finally{this.loadingSecurity=!1}}async startMfaSetup(){this.mfaSetupBusy=!0,this.error="";try{const t=await rt.mfaSetup();this.mfaManualKey=t.manualEntryKey,this.mfaQrDataUrl=await Nc.toDataURL(t.otpauthUrl,{width:220,margin:1}),this.recoveryCodes=[],await this.loadSecurity()}catch(t){this.error=t.message}finally{this.mfaSetupBusy=!1}}async enableMfa(){if(this.mfaVerifyCode.trim()){this.mfaEnableBusy=!0,this.error="";try{const t=await rt.mfaEnable(this.mfaVerifyCode.trim());this.recoveryCodes=t.recoveryCodes,this.mfaVerifyCode="",this.mfaQrDataUrl="",this.mfaManualKey="",await this.loadSecurity()}catch(t){this.error=t.message}finally{this.mfaEnableBusy=!1}}}async disableMfa(){if(!(this.mfaMode==="totp"&&!this.mfaVerifyCode.trim())&&!(this.mfaMode==="recovery"&&!this.mfaRecoveryInput.trim())){this.mfaDisableBusy=!0,this.error="";try{await rt.mfaDisable({code:this.mfaMode==="totp"?this.mfaVerifyCode.trim():void 0,recoveryCode:this.mfaMode==="recovery"?this.mfaRecoveryInput.trim():void 0}),this.mfaVerifyCode="",this.mfaRecoveryInput="",this.recoveryCodes=[],await this.loadSecurity()}catch(t){this.error=t.message}finally{this.mfaDisableBusy=!1}}}async regenerateRecoveryCodes(){if(!(this.mfaMode==="totp"&&!this.mfaVerifyCode.trim())&&!(this.mfaMode==="recovery"&&!this.mfaRecoveryInput.trim())){this.mfaRegenerateBusy=!0,this.error="";try{const t=await rt.mfaRegenerateRecoveryCodes({code:this.mfaMode==="totp"?this.mfaVerifyCode.trim():void 0,recoveryCode:this.mfaMode==="recovery"?this.mfaRecoveryInput.trim():void 0});this.recoveryCodes=t.recoveryCodes,this.mfaRecoveryInput="",this.mfaVerifyCode="",await this.loadSecurity()}catch(t){this.error=t.message}finally{this.mfaRegenerateBusy=!1}}}downloadRecoveryCodes(){if(!this.recoveryCodes.length)return;const t=this.recoveryCodes.join(`
`),e=new Blob([`${t}
`],{type:"text/plain;charset=utf-8"}),s=URL.createObjectURL(e),a=document.createElement("a");a.href=s,a.download="coderclawlink-recovery-codes.txt",a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(s)}async revokeSession(t){if(confirm("Revoke this session and sign it out?"))try{await rt.revokeSession(t),await this.loadSecurity()}catch(e){this.error=e.message}}async revokeOthers(){if(confirm("Revoke all other sessions?"))try{await rt.revokeOtherSessions(),await this.loadSecurity()}catch(t){this.error=t.message}}async revokeToken(t){if(confirm("Revoke this token?"))try{await rt.revokeToken(t),await this.loadSecurity()}catch(e){this.error=e.message}}canManageBilling(){const t=this.tenant?.role?.toLowerCase();return t==="owner"||t==="manager"}async saveDefaultClaw(){if(!(!this.tenant||!this.canManageBilling())){this.savingDefaultClaw=!0;try{const t=await St.setDefaultClaw(this.tenant.id,this.defaultClawId);this.defaultClawId=t.defaultClawId}catch(t){this.error=t.message}finally{this.savingDefaultClaw=!1}}}async changePlanToPro(t){if(t.preventDefault(),!(!this.tenant||!this.canManageBilling())){this.updatingPlan=!0;try{await St.upgradeToPro(this.tenant.id,{billingCycle:this.billingCycle,billingEmail:this.billingEmail,billingPaymentBrand:this.billingBrand,billingPaymentLast4:this.billingLast4}),await this.load()}catch(e){this.error=e.message}finally{this.updatingPlan=!1}}}async changePlanToFree(){if(!(!this.tenant||!this.canManageBilling())){this.updatingPlan=!0;try{await St.downgradeToFree(this.tenant.id),await this.load()}catch(t){this.error=t.message}finally{this.updatingPlan=!1}}}async invite(t){if(t.preventDefault(),!(!this.tenant||!this.inviteEmail)){this.inviting=!0;try{await St.inviteMember(this.tenant.id,this.inviteEmail,this.inviteRole),await this.load(),this.showInvite=!1,this.inviteEmail=""}catch(e){this.error=e.message}finally{this.inviting=!1}}}async removeMember(t){if(!(!this.tenant||!confirm("Remove this member?")))try{await St.removeMember(this.tenant.id,t),await this.load()}catch(e){this.error=e.message}}roleBadge(t){return o`<span class="badge ${{owner:"badge-red",manager:"badge-yellow",developer:"badge-blue",viewer:"badge-gray"}[t]??"badge-gray"}">${t}</span>`}async copyTenantToken(){const t=at();if(!t){this.error="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(t),this.copiedTenantToken=!0,setTimeout(()=>{this.copiedTenantToken=!1},2e3)}catch(e){this.error=e.message}}buildPluginEnvTemplate(){const t=at()??"",e=(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,""),s=`openclaw-${(this.tenant?.slug??"node").replace(/[^a-z0-9-]/gi,"-")}`;return[`CODERCLAW_LINK_URL=${e}`,`CODERCLAW_LINK_TENANT_TOKEN=${t}`,`CODERCLAW_LINK_CLAW_NAME=${s}`,"CODERCLAW_LINK_CLAW_ID=","CODERCLAW_LINK_API_KEY=","OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copyPluginEnvTemplate(){if(!at()){this.error="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(this.buildPluginEnvTemplate()),this.copiedPluginEnv=!0,setTimeout(()=>{this.copiedPluginEnv=!1},2e3)}catch(e){this.error=e.message}}downloadPluginEnvTemplate(){if(!at()){this.error="No tenant token found for current workspace session.";return}try{const e=this.buildPluginEnvTemplate(),s=new Blob([`${e}
`],{type:"text/plain;charset=utf-8"}),a=URL.createObjectURL(s),i=document.createElement("a");i.href=a,i.download="coderclawlink.env",i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a),this.downloadedPluginEnv=!0,setTimeout(()=>{this.downloadedPluginEnv=!1},2e3)}catch(e){this.error=e.message}}render(){return o`
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
      <div>
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
    `}renderSettings(){const t=at()??"",e=this.subscription,s=this.usage,a=this.canManageBilling();return o`
      <div style="display:grid;gap:16px;max-width:680px">
        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:16px">Default Claw</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:10px">
            Used when dashboard prompts scaffold a project and no project-specific claw is assigned.
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <select class="select" style="min-width:260px" .value=${this.defaultClawId==null?"":String(this.defaultClawId)} @change=${i=>{const n=i.target.value;this.defaultClawId=n?Number(n):null}}>
              <option value="">No default claw (WIP-only projects)</option>
              ${this.availableClaws.map(i=>o`<option value=${i.id}>${i.name} (${i.connectedAt?"online":"offline"})</option>`)}
            </select>
            <button class="btn btn-primary btn-sm" @click=${this.saveDefaultClaw} ?disabled=${this.savingDefaultClaw||!a}>
              ${this.savingDefaultClaw?"Saving…":"Save default claw"}
            </button>
          </div>
          ${a?"":o`<div style="font-size:12px;color:var(--muted);margin-top:8px">Only owner/manager can update default claw.</div>`}
        </div>

        <div class="card" style="max-width:680px">
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

            ${a?o`
              <form @submit=${this.changePlanToPro} style="display:grid;gap:10px;margin-bottom:10px">
                <div style="font-size:12px;color:var(--muted)">Upgrade to Pro requires billing info. If billing is not active, workspace usage automatically falls back to Free.</div>
                <div class="field">
                  <label class="label">Billing cycle</label>
                  <select class="select" .value=${this.billingCycle} @change=${i=>{this.billingCycle=i.target.value}}>
                    <option value="monthly">Monthly ($${e.pricing.pro.monthly})</option>
                    <option value="yearly">Yearly ($${e.pricing.pro.yearly})</option>
                  </select>
                </div>
                <div class="field">
                  <label class="label">Billing email</label>
                  <input class="input" type="email" required .value=${this.billingEmail} @input=${i=>{this.billingEmail=i.target.value}} />
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                  <div class="field">
                    <label class="label">Card brand</label>
                    <input class="input" required .value=${this.billingBrand} @input=${i=>{this.billingBrand=i.target.value}} />
                  </div>
                  <div class="field">
                    <label class="label">Card last 4</label>
                    <input class="input" inputmode="numeric" pattern="[0-9]{4}" minlength="4" maxlength="4" required .value=${this.billingLast4} @input=${i=>{this.billingLast4=i.target.value.replace(/\D/g,"").slice(0,4)}} />
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

        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:8px">coderClawLLM Consumption</div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
            <label style="font-size:12px;color:var(--muted)">Window</label>
            <select class="select" style="max-width:130px" @change=${i=>{this.usageDays=Number(i.target.value),this.load()}}>
              ${[7,14,30,60,90].map(i=>o`<option value="${i}" ?selected=${this.usageDays===i}>${i} days</option>`)}
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

        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:16px">Workspace details</div>
          <div style="display:grid;gap:10px">
            ${[["Name",this.tenant?.name??"—"],["Slug",this.tenant?.slug??"—"],["Status",this.tenant?.status??"—"],["Your role",this.tenant?.role??"—"]].map(([i,n])=>o`
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">${i}</span>
                <span style="color:var(--text-strong);font-weight:500">${n}</span>
              </div>`)}
          </div>
        </div>

        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:8px">Account security</div>
          <div style="font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:12px">
            MFA is optional. If disabled, login continues with email and password only.
          </div>

          ${this.loadingSecurity?o`<div style="color:var(--muted);font-size:13px">Loading security settings…</div>`:o`
              <div style="display:flex;justify-content:space-between;align-items:center;border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:10px">
                <div>
                  <div style="font-size:13px;color:var(--text-strong);font-weight:600">Authenticator app MFA</div>
                  <div style="font-size:12px;color:var(--muted)">${this.mfaStatus?.enabled?"Enabled":"Disabled"}</div>
                </div>
                ${this.mfaStatus?.enabled?o`<button class="btn btn-danger btn-sm" @click=${this.disableMfa} ?disabled=${this.mfaDisableBusy}>${this.mfaDisableBusy?"Disabling…":"Disable"}</button>`:o`<button class="btn btn-primary btn-sm" @click=${this.startMfaSetup} ?disabled=${this.mfaSetupBusy}>${this.mfaSetupBusy?"Preparing…":"Set up MFA"}</button>`}
              </div>

              ${this.mfaQrDataUrl?o`
                <div style="border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:10px;display:grid;gap:10px">
                  <div style="font-size:12px;color:var(--muted)">Scan this QR with your authenticator app, then enter the 6-digit code.</div>
                  <img alt="MFA QR" src=${this.mfaQrDataUrl} style="width:220px;height:220px;border:1px solid var(--border);border-radius:8px;background:#fff;padding:8px" />
                  <div style="font-size:12px;color:var(--muted)">Manual key: <span style="font-family:var(--mono);color:var(--text-strong)">${this.mfaManualKey}</span></div>
                </div>
              `:""}

              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
                <button type="button" class="btn ${this.mfaMode==="totp"?"btn-primary":"btn-secondary"} btn-sm" @click=${()=>{this.mfaMode="totp"}}>Use authenticator code</button>
                <button type="button" class="btn ${this.mfaMode==="recovery"?"btn-primary":"btn-secondary"} btn-sm" @click=${()=>{this.mfaMode="recovery"}}>Use recovery code</button>
              </div>

              ${this.mfaMode==="totp"?o`<input class="input" placeholder="6-digit code" .value=${this.mfaVerifyCode} @input=${i=>{this.mfaVerifyCode=i.target.value}} style="margin-bottom:8px" />`:o`<input class="input" placeholder="ABCD-EFGH" .value=${this.mfaRecoveryInput} @input=${i=>{this.mfaRecoveryInput=i.target.value}} style="margin-bottom:8px" />`}

              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
                ${this.mfaQrDataUrl?o`<button class="btn btn-primary btn-sm" @click=${this.enableMfa} ?disabled=${this.mfaEnableBusy||!this.mfaVerifyCode.trim()}>${this.mfaEnableBusy?"Enabling…":"Enable MFA"}</button>`:""}
                ${this.mfaStatus?.enabled?o`<button class="btn btn-secondary btn-sm" @click=${this.regenerateRecoveryCodes} ?disabled=${this.mfaRegenerateBusy}>${this.mfaRegenerateBusy?"Regenerating…":"Regenerate recovery codes"}</button>`:""}
              </div>

              ${this.recoveryCodes.length?o`
                  <div style="border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:10px">
                    <div style="font-size:12px;color:var(--muted);margin-bottom:8px">Save these one-time recovery codes now.</div>
                    <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-bottom:8px;font-family:var(--mono);font-size:12px;color:var(--text-strong)">
                      ${this.recoveryCodes.map(i=>o`<div>${i}</div>`)}
                    </div>
                    <button class="btn btn-secondary btn-sm" @click=${this.downloadRecoveryCodes}>Download recovery codes</button>
                  </div>
                `:""}

              <div style="display:flex;justify-content:space-between;align-items:center;margin:14px 0 8px">
                <div style="font-size:13px;color:var(--text-strong);font-weight:600">Active sessions</div>
                <button class="btn btn-danger btn-sm" @click=${this.revokeOthers}>Revoke other sessions</button>
              </div>
              <div style="display:grid;gap:8px;margin-bottom:10px">
                ${this.authSessions.length===0?o`<div style="font-size:12px;color:var(--muted)">No active sessions found.</div>`:this.authSessions.map(i=>o`
                    <div style="border:1px solid var(--border);border-radius:8px;padding:10px;display:grid;gap:6px">
                      <div style="display:flex;justify-content:space-between;align-items:center">
                        <div style="font-size:13px;color:var(--text-strong);font-weight:600">${i.sessionName||"Session"}${i.isCurrent?" (current)":""}</div>
                        ${i.isCurrent?o`<span class="badge badge-blue">Current</span>`:o`<button class="btn btn-danger btn-sm" @click=${()=>this.revokeSession(i.id)}>Revoke</button>`}
                      </div>
                      <div style="font-size:12px;color:var(--muted)">${i.userAgent||"Unknown device"}</div>
                      <div style="font-size:12px;color:var(--muted)">IP: ${i.ipAddress||"Unknown"} · Tokens: ${i.activeTokens} · Last seen: ${new Date(i.lastSeenAt).toLocaleString()}</div>
                    </div>
                  `)}
              </div>

              <div style="font-size:13px;color:var(--text-strong);font-weight:600;margin-bottom:8px">JWT tokens</div>
              <div style="display:grid;gap:8px">
                ${this.authTokens.slice(0,20).map(i=>o`
                  <div style="border:1px solid var(--border);border-radius:8px;padding:10px;display:grid;gap:6px">
                    <div style="display:flex;justify-content:space-between;align-items:center">
                      <div style="font-size:12px;color:var(--text-strong);font-family:var(--mono)">${i.jti}</div>
                      ${i.isCurrent?o`<span class="badge badge-blue">Current</span>`:o`<button class="btn btn-danger btn-sm" @click=${()=>this.revokeToken(i.jti)}>Revoke</button>`}
                    </div>
                    <div style="font-size:12px;color:var(--muted)">
                      ${i.tokenType.toUpperCase()}${i.tenantId!=null?` · Tenant ${i.tenantId}`:""} · ${i.isActive?"Active":"Inactive"}
                    </div>
                    <div style="font-size:12px;color:var(--muted)">Expires: ${new Date(i.expiresAt).toLocaleString()}</div>
                  </div>
                `)}
              </div>
            `}
        </div>

        <div class="card" style="max-width:680px">
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
      </div>
    `}};O([B({type:Object})],M.prototype,"tenant",2);O([B({type:String})],M.prototype,"initialTab",2);O([d()],M.prototype,"detail",2);O([d()],M.prototype,"loading",2);O([d()],M.prototype,"error",2);O([d()],M.prototype,"tab",2);O([d()],M.prototype,"subscription",2);O([d()],M.prototype,"usage",2);O([d()],M.prototype,"usageDays",2);O([d()],M.prototype,"availableClaws",2);O([d()],M.prototype,"defaultClawId",2);O([d()],M.prototype,"savingDefaultClaw",2);O([d()],M.prototype,"updatingPlan",2);O([d()],M.prototype,"billingCycle",2);O([d()],M.prototype,"billingEmail",2);O([d()],M.prototype,"billingBrand",2);O([d()],M.prototype,"billingLast4",2);O([d()],M.prototype,"showTenantToken",2);O([d()],M.prototype,"copiedTenantToken",2);O([d()],M.prototype,"copiedPluginEnv",2);O([d()],M.prototype,"downloadedPluginEnv",2);O([d()],M.prototype,"mfaStatus",2);O([d()],M.prototype,"mfaSetupBusy",2);O([d()],M.prototype,"mfaEnableBusy",2);O([d()],M.prototype,"mfaDisableBusy",2);O([d()],M.prototype,"mfaRegenerateBusy",2);O([d()],M.prototype,"mfaVerifyCode",2);O([d()],M.prototype,"mfaRecoveryInput",2);O([d()],M.prototype,"mfaMode",2);O([d()],M.prototype,"mfaManualKey",2);O([d()],M.prototype,"mfaQrDataUrl",2);O([d()],M.prototype,"recoveryCodes",2);O([d()],M.prototype,"authSessions",2);O([d()],M.prototype,"authTokens",2);O([d()],M.prototype,"loadingSecurity",2);O([d()],M.prototype,"showInvite",2);O([d()],M.prototype,"inviteEmail",2);O([d()],M.prototype,"inviteRole",2);O([d()],M.prototype,"inviting",2);M=O([J("ccl-workspace")],M);var Uc=Object.defineProperty,zc=Object.getOwnPropertyDescriptor,ne=(t,e,s,a)=>{for(var i=a>1?void 0:a?zc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Uc(e,s,i),i};let Kt=class extends F{constructor(){super(...arguments),this.tenantId="",this.items=[],this.tasks=[],this.loading=!0,this.error="",this.filterTask="",this.filterStatus="",this.expanded=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.tasks]=await Promise.all([ia.list(),ot.list().catch(()=>[])])}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){return this.items.filter(t=>!(this.filterTask&&t.taskId!==this.filterTask||this.filterStatus&&t.status!==this.filterStatus))}taskTitle(t){return this.tasks.find(e=>e.id===t)?.title??t}statusColor(t){return{completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"}[t]??"badge-gray"}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered();return o`
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
    `}};ne([B()],Kt.prototype,"tenantId",2);ne([d()],Kt.prototype,"items",2);ne([d()],Kt.prototype,"tasks",2);ne([d()],Kt.prototype,"loading",2);ne([d()],Kt.prototype,"error",2);ne([d()],Kt.prototype,"filterTask",2);ne([d()],Kt.prototype,"filterStatus",2);ne([d()],Kt.prototype,"expanded",2);Kt=ne([J("ccl-logs")],Kt);var Fc=Object.defineProperty,qc=Object.getOwnPropertyDescriptor,ht=(t,e,s,a)=>{for(var i=a>1?void 0:a?qc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Fc(e,s,i),i};let lt=class extends F{constructor(){super(...arguments),this.tab="health",this.health=null,this.users=[],this.tenants=[],this.errors=[],this.llmUsage=null,this.usageDays=30,this.loading=!1,this.errorMsg="",this.showAdminToken=!1,this.llmPoolTab="coderClawLLM",this.copiedAdminToken=!1,this.copiedAdminEnv=!1,this.downloadedAdminEnv=!1,this.impersonateUserId=null,this.impersonateTenants=[],this.expandedErrorId=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTab("health")}async loadTab(t){this.tab=t,this.loading=!0,this.errorMsg="";try{if(t==="health")this.health=await Bt.health();else if(t==="users")this.users=await Bt.users();else if(t==="tenants")this.tenants=await Bt.tenants();else if(t==="errors")this.errors=await Bt.errors();else if(t==="usage")this.llmUsage=await Bt.llmUsage(this.usageDays);else if(t==="billing"){const[e,s]=await Promise.all([Bt.tenants(),Bt.errors()]);this.tenants=e,this.errors=s}}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}finally{this.loading=!1}}async startImpersonate(t){this.tenants.length||(this.tenants=await Bt.tenants()),this.impersonateUserId=t,this.impersonateTenants=this.tenants}async doImpersonate(t){if(this.impersonateUserId)try{const e=await Bt.impersonate(this.impersonateUserId,t);Ms(e.token),Ns(String(t)),this.impersonateUserId=null,this.dispatchEvent(new CustomEvent("ccl:impersonate",{bubbles:!0,composed:!0,detail:{tenantId:t}}))}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}}fmtCooldown(t){const e=Math.max(0,Math.ceil((t-Date.now())/1e3));return e>=60?`${Math.ceil(e/60)}m`:`${e}s`}fmtDate(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}fmtDateTime(t){return new Date(t).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}async copyAdminToken(){const t=Xt();if(!t){this.errorMsg="No superadmin web token found for this session.";return}try{await navigator.clipboard.writeText(t),this.copiedAdminToken=!0,setTimeout(()=>{this.copiedAdminToken=!1},2e3)}catch(e){this.errorMsg=e.message}}buildSuperadminEnvTemplate(){const t=Xt()??"";return[`CODERCLAW_LINK_URL=${(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,"")}`,`CODERCLAW_LINK_WEB_TOKEN=${t}`,"CODERCLAW_LINK_TENANT_TOKEN=","CODERCLAW_LINK_CLAW_NAME=openclaw-superadmin-node","CODERCLAW_LINK_CLAW_ID=","CODERCLAW_LINK_API_KEY=","OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copySuperadminEnvTemplate(){if(!Xt()){this.errorMsg="No superadmin web token found for this session.";return}try{await navigator.clipboard.writeText(this.buildSuperadminEnvTemplate()),this.copiedAdminEnv=!0,setTimeout(()=>{this.copiedAdminEnv=!1},2e3)}catch(e){this.errorMsg=e.message}}downloadSuperadminEnvTemplate(){if(!Xt()){this.errorMsg="No superadmin web token found for this session.";return}try{const e=this.buildSuperadminEnvTemplate(),s=new Blob([`${e}
`],{type:"text/plain;charset=utf-8"}),a=URL.createObjectURL(s),i=document.createElement("a");i.href=a,i.download="coderclawlink.superadmin.env",i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a),this.downloadedAdminEnv=!0,setTimeout(()=>{this.downloadedAdminEnv=!1},2e3)}catch(e){this.errorMsg=e.message}}render(){return o`
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
          ${["health","billing","usage","users","tenants","errors"].map(t=>o`
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
    `}renderTab(){return this.tab==="health"?this.renderHealth():this.tab==="billing"?this.renderBilling():this.tab==="usage"?this.renderUsage():this.tab==="users"?this.renderUsers():this.tab==="tenants"?this.renderTenants():this.tab==="errors"?this.renderErrors():o``}composeMailto(t,e,s){const a=new URLSearchParams({subject:e,body:s});return`mailto:${encodeURIComponent(t)}?${a.toString()}`}renderBilling(){const t=this.tenants.filter(g=>g.billingStatus==="active"&&g.effectivePlan==="pro"),e=this.tenants.filter(g=>g.billingStatus==="past_due"),s=this.tenants.filter(g=>g.billingStatus==="pending"),a=this.tenants.filter(g=>g.effectivePlan==="free"),i=this.tenants.filter(g=>["active","past_due","pending"].includes(g.billingStatus)),n=this.errors.slice(0,20),r="CoderClaw billing invoice",c=`Hi team,

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
          <div class="health-value">${a.length}</div>
          <div class="health-sub">Free workspaces to nurture</div>
        </div>
      </div>

      <div class="table-header" style="margin-top:22px">
        <span class="table-count">Invoice queue (${i.length})</span>
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
            ${i.map(g=>o`
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
                      href=${this.composeMailto(g.billingEmail,r,c)}
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
        <span class="table-count">Upgrade communications (${a.length})</span>
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
            ${a.slice(0,200).map(g=>o`
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
    `}renderHealth(){const t=this.health,e=Xt()??"";if(!t)return o`<div class="loading-state">No data</div>`;const s=t.llm.models.filter(n=>n.model.toLowerCase().includes(":free")),a=t.llm.models.filter(n=>!n.model.toLowerCase().includes(":free")),i=this.llmPoolTab==="coderClawLLM"?s:a;return o`
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
              coderClawLLMPro (${a.length})
            </button>
          </div>
          <div class="model-list">
            ${i.map(n=>{const r=n.available?"background:var(--success-bg,#d1fae5);color:var(--success-text,#065f46);border-color:var(--success-border,#6ee7b7)":"background:var(--error-bg,#fee2e2);color:var(--error-text,#991b1b);border-color:var(--error-border,#fca5a5)",c=n.available?"available":`cooldown ${this.fmtCooldown(n.cooldownUntil??0)}`,l=`${n.preferred?"★ ":""}${n.model} · ${c}`,u=n.available?`${n.preferred?"Preferred (round-robin). ":"Fallback. "}Available`:`On cooldown — available in ${this.fmtCooldown(n.cooldownUntil??0)}`;return o`<span class="model-chip" style="${r}" title="${u}">${l}</span>`})}
          </div>
          ${i.length===0?o`
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
    `}};ht([d()],lt.prototype,"tab",2);ht([d()],lt.prototype,"health",2);ht([d()],lt.prototype,"users",2);ht([d()],lt.prototype,"tenants",2);ht([d()],lt.prototype,"errors",2);ht([d()],lt.prototype,"llmUsage",2);ht([d()],lt.prototype,"usageDays",2);ht([d()],lt.prototype,"loading",2);ht([d()],lt.prototype,"errorMsg",2);ht([d()],lt.prototype,"showAdminToken",2);ht([d()],lt.prototype,"llmPoolTab",2);ht([d()],lt.prototype,"copiedAdminToken",2);ht([d()],lt.prototype,"copiedAdminEnv",2);ht([d()],lt.prototype,"downloadedAdminEnv",2);ht([d()],lt.prototype,"impersonateUserId",2);ht([d()],lt.prototype,"impersonateTenants",2);ht([d()],lt.prototype,"expandedErrorId",2);lt=ht([J("ccl-admin")],lt);var Wc=Object.defineProperty,Hc=Object.getOwnPropertyDescriptor,ut=(t,e,s,a)=>{for(var i=a>1?void 0:a?Hc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Wc(e,s,i),i};let dt=class extends F{constructor(){super(...arguments),this.tenantId="",this.page="tasks",this.focusProjectId="",this.open=!1,this.loadingContext=!1,this.contextError="",this.input="",this.sending=!1,this.contextSummary="",this.messages=[],this.actions=[],this.projects=[],this.tasks=[],this.claws=[],this.skills=[],this.pendingAutoPrompt="",this.msgEnd=null,this.handleBrainOpen=t=>{this.open=!0,t.detail?.projectId&&(this.focusProjectId=t.detail.projectId),t.detail?.prompt?.trim()&&(this.pendingAutoPrompt=t.detail.prompt.trim())}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),window.addEventListener("ccl:brain-open",this.handleBrainOpen),this.refreshContext()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ccl:brain-open",this.handleBrainOpen)}updated(t){if((t.has("tenantId")||t.has("page")||t.has("focusProjectId"))&&(this.contextError="",this.refreshContext()),this.pendingAutoPrompt&&this.open&&!this.sending){const e=this.pendingAutoPrompt;this.pendingAutoPrompt="",this.autoContinueFromPrompt(e)}this.msgEnd?.scrollIntoView({behavior:"smooth"})}async autoContinueFromPrompt(t){const e=`Continue scaffolding the selected project from this request:
${t}

Provide immediate next steps, ask for any missing onboarding details, and propose executable tasks.`;this.input=e,await this.refreshContext(),await this.send()}pageLabel(){return{projects:"Projects",tasks:"Tasks",claws:"Claws",skills:"Skills",workspace:"Workspace",billing:"Billing",logs:"Logs"}[this.page]??this.page}async refreshContext(){this.loadingContext=!0,this.contextError="";try{if(this.page==="projects"){const[t,e]=await Promise.all([Ct.list(),ot.list()]);this.projects=t,this.tasks=e;const s=this.focusProjectId?t.find(a=>String(a.id)===String(this.focusProjectId)):null;this.contextSummary=s?`${s.name} · ${e.filter(a=>String(a.projectId??"")===String(s.id)).length} task(s)`:`${t.length} project${t.length!==1?"s":""} in workspace`}else if(this.page==="tasks"){const[t,e]=await Promise.all([ot.list(),Ct.list()]);this.tasks=t,this.projects=e;const s=t.filter(a=>a.status!=="done").length;this.contextSummary=`${t.length} tasks · ${s} open`}else if(this.page==="claws"){this.claws=await ct.list();const t=this.claws.filter(e=>e.status==="connected").length;this.contextSummary=`${this.claws.length} claws · ${t} connected`}else this.page==="skills"?(this.skills=await qs.list(),this.contextSummary=`${this.skills.length} skills available`):this.page==="workspace"||this.page==="billing"?this.contextSummary="Workspace explorer context":this.contextSummary="Execution and activity logs context"}catch(t){this.contextError=t instanceof Error?t.message:String(t)}finally{this.loadingContext=!1}}quickPrompt(t){if(t==="describe"){this.input=`Describe the current ${this.pageLabel().toLowerCase()} context and highlight key priorities.`;return}if(t==="prd"){this.input="Create a concise product requirements document (PRD) for the most important project in this workspace.";return}this.input="Generate an execution-ready task breakdown. Include actionable steps and add <ccl-actions> JSON to create tasks."}buildContextPayload(){return{page:this.page,tenantId:this.tenantId,focusProjectId:this.focusProjectId||null,summary:this.contextSummary,projects:this.projects.slice(0,40).map(t=>({id:t.id,key:t.key,name:t.name,status:t.status,description:t.description??""})),tasks:this.tasks.slice(0,80).map(t=>({id:t.id,key:t.key,title:t.title,status:t.status,priority:t.priority,projectId:t.projectId??null})),claws:this.claws.slice(0,40).map(t=>({id:t.id,name:t.name,status:t.status})),skills:this.skills.slice(0,60).map(t=>({id:t.id,slug:t.slug,name:t.name}))}}parseActions(t){const e=t.match(/<ccl-actions>([\s\S]*?)<\/ccl-actions>/i);if(!e)return[];try{const s=JSON.parse(e[1]);return Array.isArray(s.actions)?s.actions.filter(a=>a&&typeof a=="object"&&(a.type==="create_project"||a.type==="create_task")):[]}catch{return[]}}stripActions(t){return t.replace(/<ccl-actions>[\s\S]*?<\/ccl-actions>/gi,"").trim()}toChatMessages(){const t=this.messages.slice(-12).map(s=>({role:s.role,content:s.text}));return[{role:"system",content:["You are Brain, the first-class AI assistant inside CoderClawLink.",`You are currently helping on the ${this.pageLabel()} page.`,"Use the provided page context snapshot to give practical, execution-focused output.","When the user asks to create entities, include machine-readable actions in this exact format:",'<ccl-actions>{"actions":[...]}</ccl-actions>',"Allowed action types:","- create_project: { type, name, description? }","- create_task: { type, title, description?, projectId?, projectName?, projectKey?, priority?, status?, dueDate? }","If no actions are needed, do not output ccl-actions.","Be concise and concrete."].join(`
`)},{role:"system",content:`Page context JSON:
${JSON.stringify(this.buildContextPayload())}`},...t]}async send(){const t=this.input.trim();if(!t||this.sending)return;const e={id:crypto.randomUUID(),role:"user",text:t};this.messages=[...this.messages,e],this.input="",this.sending=!0;try{const a=(await Ws.chat(this.toChatMessages(),{temperature:.25,maxTokens:1400})).choices?.[0]?.message?.content?.trim()??"I could not generate a response.",i=this.parseActions(a);i.length&&(this.actions=i.map(n=>({action:n,status:"idle"}))),this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:this.stripActions(a)||"Done."}]}catch(s){const a=s instanceof Error?s.message:String(s);this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:`Error: ${a}`}]}finally{this.sending=!1}}async applyAction(t){const e=this.actions[t];if(!(!e||e.status==="running")){this.actions=this.actions.map((s,a)=>a===t?{...s,status:"running",result:void 0}:s);try{if(e.action.type==="create_project"){const l=await Ct.create({name:e.action.name,description:e.action.description});this.actions=this.actions.map((u,p)=>p===t?{...u,status:"done",result:`Created project ${l.key}`}:u),await this.refreshContext();return}const s=e.action,a=s.projectId?this.projects.find(l=>l.id===s.projectId):null,i=s.projectKey?this.projects.find(l=>l.key.toLowerCase()===s.projectKey?.toLowerCase()):null,n=s.projectName?this.projects.find(l=>l.name.toLowerCase()===s.projectName?.toLowerCase()):null,r=a??i??n??null,c=await ot.create({title:s.title,description:s.description,projectId:r?.id,priority:s.priority??"medium",status:s.status??"todo",dueDate:s.dueDate});this.actions=this.actions.map((l,u)=>u===t?{...l,status:"done",result:`Created task ${c.key}`}:l),await this.refreshContext()}catch(s){const a=s instanceof Error?s.message:String(s);this.actions=this.actions.map((i,n)=>n===t?{...i,status:"error",result:a}:i)}}}async applyAll(){for(let t=0;t<this.actions.length;t++)(this.actions[t]?.status==="idle"||this.actions[t]?.status==="error")&&await this.applyAction(t)}clearChat(){this.messages=[],this.actions=[],this.input=""}renderMarkdown(t){const e=z.parse(t,{gfm:!0,breaks:!0}),s=typeof e=="string"?e:"",a=mr.sanitize(s);return o`<div class="md-content">${Xn(a)}</div>`}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}render(){return o`
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
    `}};ut([B()],dt.prototype,"tenantId",2);ut([B()],dt.prototype,"page",2);ut([d()],dt.prototype,"focusProjectId",2);ut([d()],dt.prototype,"open",2);ut([d()],dt.prototype,"loadingContext",2);ut([d()],dt.prototype,"contextError",2);ut([d()],dt.prototype,"input",2);ut([d()],dt.prototype,"sending",2);ut([d()],dt.prototype,"contextSummary",2);ut([d()],dt.prototype,"messages",2);ut([d()],dt.prototype,"actions",2);ut([d()],dt.prototype,"projects",2);ut([d()],dt.prototype,"tasks",2);ut([d()],dt.prototype,"claws",2);ut([d()],dt.prototype,"skills",2);ut([d()],dt.prototype,"pendingAutoPrompt",2);dt=ut([J("ccl-brain")],dt);var Kc=Object.defineProperty,Vc=Object.getOwnPropertyDescriptor,Lt=(t,e,s,a)=>{for(var i=a>1?void 0:a?Vc(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Kc(e,s,i),i};let Tt=class extends F{constructor(){super(...arguments),this.appState="loading",this.tab="home",this.selectedProjectId="",this.openProjectCreate=!1,this.pendingPrompt="",this.user=null,this.tenantList=[],this.tenant=null,this.theme="dark",this.navCollapsed=!1,this.handleUnauthorized=()=>{Os(),this.user=null,this.tenant=null,this.appState="landing"},this.handleExitAdmin=()=>{this.appState=this.tenant?"dashboard":"workspace-picker"},this.handleImpersonate=t=>{const e=String(t.detail.tenantId),s=this.tenantList.find(a=>String(a.id)===e);s?this.tenant=s:this.tenant={id:e,name:"Impersonated Workspace",slug:"",role:"viewer",status:"active"},this.appState="dashboard"},this.handleOpenProject=t=>{this.selectedProjectId=t.detail.projectId,this.tab="projects"},this.handleNewProject=()=>{this.openProjectCreate=!0,this.tab="projects"},this.handleNavigate=t=>{this.tab=t.detail.tab},this.handleDashboardPrompt=t=>{this.startDashboardScaffold(t.detail.prompt)}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTheme(),this.bootstrap(),window.addEventListener("ccl:unauthorized",this.handleUnauthorized),window.addEventListener("ccl:exit-admin",this.handleExitAdmin),window.addEventListener("ccl:impersonate",this.handleImpersonate),window.addEventListener("ccl:open-project",this.handleOpenProject),window.addEventListener("ccl:new-project",this.handleNewProject),window.addEventListener("ccl:navigate",this.handleNavigate),window.addEventListener("ccl:dashboard-prompt",this.handleDashboardPrompt)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ccl:unauthorized",this.handleUnauthorized),window.removeEventListener("ccl:exit-admin",this.handleExitAdmin),window.removeEventListener("ccl:impersonate",this.handleImpersonate),window.removeEventListener("ccl:open-project",this.handleOpenProject),window.removeEventListener("ccl:new-project",this.handleNewProject),window.removeEventListener("ccl:navigate",this.handleNavigate),window.removeEventListener("ccl:dashboard-prompt",this.handleDashboardPrompt)}updated(t){this.appState==="dashboard"&&(t.has("appState")||t.has("tab")||t.has("tenant"))&&this.mountDashboardView()}async bootstrap(){if(!Xt()){this.appState="landing";return}const e=at(),s=Gn();if(this.user=Qn(),e&&s)try{const a=await rt.listTenants();this.tenantList=a;const i=a.find(n=>n.id===s);if(i){this.tenant=i,this.appState="dashboard";return}}catch{}try{this.tenantList=await rt.listTenants(),this.appState="workspace-picker"}catch{this.appState="auth"}}async handleLogin(t){const{token:e,user:s}=t.detail;Jn(e),Yn(s),this.user=s;try{this.tenantList=await rt.listTenants(),this.appState="workspace-picker"}catch{this.appState="workspace-picker"}}async handleSelectTenant(t){const e=t.detail;try{const{token:s}=await rt.tenantToken(e.id);Ms(s),Ns(e.id),this.tenant=e,this.appState="dashboard"}catch(s){console.error("Failed to get tenant token",s)}}async handleCreateTenant(t){try{const e=await St.create(t.detail.name),{token:s}=await rt.tenantToken(e.id);Ms(s),Ns(e.id),this.tenant=e,this.appState="dashboard"}catch(e){console.error("Failed to create tenant",e)}}handleSignOut(){Os(),this.user=null,this.tenant=null,this.tenantList=[],this.appState="landing"}handleSwitchWorkspace(){this.appState="workspace-picker"}async startDashboardScaffold(t){const e=t.trim();if(e)try{const s=await Ct.scaffold({prompt:e}),i=`Scaffold: ${(e.split(/[.!?\n]/)[0]?.trim()||e).slice(0,120)}`;if(await ot.create({title:i,description:e,projectId:s.project.id,assignedClawId:s.scaffold.clawId!=null?String(s.scaffold.clawId):void 0,priority:"high",status:"todo"}),s.scaffold.wip){this.selectedProjectId=s.project.id,this.tab="projects",setTimeout(()=>{window.dispatchEvent(new CustomEvent("ccl:brain-open",{detail:{prompt:e,projectId:String(s.project.id)}}))},0);return}this.selectedProjectId=s.project.id,this.tab="projects",setTimeout(()=>{window.dispatchEvent(new CustomEvent("ccl:brain-open",{detail:{prompt:e,projectId:String(s.project.id)}}))},0)}catch{this.pendingPrompt=e,this.tab="tasks"}}setTab(t){this.tab!==t&&(this.tab=t)}mountDashboardView(){const t=this.querySelector("#dashboard-view-host");if(!(t instanceof HTMLElement))return;const e=this.tenant?.id??"";let s;switch(this.tab){case"home":{const a=document.createElement("ccl-dashboard");a.tenantId=e,s=a;break}case"tasks":{const a=document.createElement("ccl-tasks");a.tenantId=e,this.pendingPrompt&&(a.openTaskPrompt=this.pendingPrompt,this.pendingPrompt=""),s=a;break}case"projects":{const a=document.createElement("ccl-projects");a.tenantId=e,this.selectedProjectId&&(a.selectedProjectId=this.selectedProjectId,this.selectedProjectId=""),this.openProjectCreate&&(a.openCreate=!0,this.openProjectCreate=!1),s=a;break}case"claws":{const a=document.createElement("ccl-claws");a.tenantId=e,s=a;break}case"skills":{const a=document.createElement("ccl-skills");a.tenantId=e,s=a;break}case"workspace":{const a=document.createElement("ccl-workspace");a.tenant=this.tenant,s=a;break}case"billing":{const a=document.createElement("ccl-workspace");a.tenant=this.tenant,a.initialTab="settings",s=a;break}case"logs":{const a=document.createElement("ccl-logs");a.tenantId=e,s=a;break}}t.replaceChildren(s)}loadTheme(){const t=localStorage.getItem("ccl-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;this.theme=t??(e?"dark":"light"),document.documentElement.dataset.theme=this.theme,this.navCollapsed=localStorage.getItem("ccl-nav-collapsed")==="1"}toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",document.documentElement.dataset.theme=this.theme,localStorage.setItem("ccl-theme",this.theme),this.requestUpdate()}toggleNav(){this.navCollapsed=!this.navCollapsed,localStorage.setItem("ccl-nav-collapsed",this.navCollapsed?"1":"0")}svgIcon(t){return`<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">${{home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',projects:'<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>',tasks:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',claws:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',skills:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',workspace:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>',logs:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',billing:'<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>',admin:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',panelLeft:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',chevronsLeft:'<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',chevronsRight:'<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>'}[t]??""}</svg>`}render(){return this.appState==="loading"?this.renderLoading():this.appState==="landing"?this.renderLanding():this.appState==="auth"?this.renderAuth():this.appState==="workspace-picker"?this.renderWorkspacePicker():this.appState==="admin"?this.renderAdmin():this.renderDashboard()}renderLoading(){return o`
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
      </div>`}renderAdmin(){return o`<ccl-admin></ccl-admin>`}renderDashboard(){const t=this.navCollapsed,e=[{id:"home",label:"Dashboard",icon:"home"},{id:"projects",label:"Projects",icon:"projects"},{id:"tasks",label:"Tasks",icon:"tasks"}],s=[{id:"claws",label:"Claws",icon:"claws"},{id:"skills",label:"Skills",icon:"skills"}],a=[{id:"workspace",label:"Settings",icon:"settings"},{id:"billing",label:"Billing",icon:"billing"},{id:"logs",label:"Logs",icon:"logs"}],i=n=>o`
      <button
        class="nav-item ${this.tab===n.id?"active":""}"
        title="${n.label}"
        @click=${()=>this.setTab(n.id)}
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
              ${e.map(i)}
            </div>

            <div class="nav-section-label" style="font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);padding:0 10px;margin-bottom:6px">Mesh</div>
            <div class="nav-section">
              ${s.map(i)}
            </div>

            <div class="nav-section-label" style="font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);padding:0 10px;margin-bottom:6px">System</div>
            <div class="nav-section">
              ${a.map(i)}
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
    `}};Tt.styles=Pr``;Lt([d()],Tt.prototype,"appState",2);Lt([d()],Tt.prototype,"tab",2);Lt([d()],Tt.prototype,"selectedProjectId",2);Lt([d()],Tt.prototype,"openProjectCreate",2);Lt([d()],Tt.prototype,"pendingPrompt",2);Lt([d()],Tt.prototype,"user",2);Lt([d()],Tt.prototype,"tenantList",2);Lt([d()],Tt.prototype,"tenant",2);Lt([d()],Tt.prototype,"theme",2);Lt([d()],Tt.prototype,"navCollapsed",2);Tt=Lt([J("ccl-app")],Tt);
//# sourceMappingURL=index-CWtV-wY9.js.map
