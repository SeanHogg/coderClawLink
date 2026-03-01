(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();const Nt=globalThis,Vt=Nt.ShadowRoot&&(Nt.ShadyCSS===void 0||Nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Gt=Symbol(),ne=new WeakMap;let Se=class{constructor(e,s,a){if(this._$cssResult$=!0,a!==Gt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(Vt&&e===void 0){const a=s!==void 0&&s.length===1;a&&(e=ne.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&ne.set(s,e))}return e}toString(){return this.cssText}};const Re=t=>new Se(typeof t=="string"?t:t+"",void 0,Gt),Ue=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((a,i,n)=>a+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new Se(s,t,Gt)},ze=(t,e)=>{if(Vt)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const a=document.createElement("style"),i=Nt.litNonce;i!==void 0&&a.setAttribute("nonce",i),a.textContent=s.cssText,t.appendChild(a)}},oe=Vt?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const a of e.cssRules)s+=a.cssText;return Re(s)})(t):t;const{is:Be,defineProperty:Fe,getOwnPropertyDescriptor:He,getOwnPropertyNames:We,getOwnPropertySymbols:Ke,getPrototypeOf:qe}=Object,Ft=globalThis,le=Ft.trustedTypes,Je=le?le.emptyScript:"",Ve=Ft.reactiveElementPolyfillSupport,_t=(t,e)=>t,Lt={toAttribute(t,e){switch(e){case Boolean:t=t?Je:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},Yt=(t,e)=>!Be(t,e),de={attribute:!0,type:String,converter:Lt,reflect:!1,useDefault:!1,hasChanged:Yt};Symbol.metadata??=Symbol("metadata"),Ft.litPropertyMetadata??=new WeakMap;let bt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=de){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,s);i!==void 0&&Fe(this.prototype,e,i)}}static getPropertyDescriptor(e,s,a){const{get:i,set:n}=He(this.prototype,e)??{get(){return this[s]},set(o){this[s]=o}};return{get:i,set(o){const h=i?.call(this);n?.call(this,o),this.requestUpdate(e,h,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??de}static _$Ei(){if(this.hasOwnProperty(_t("elementProperties")))return;const e=qe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_t("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_t("properties"))){const s=this.properties,a=[...We(s),...Ke(s)];for(const i of a)this.createProperty(i,s[i])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[a,i]of s)this.elementProperties.set(a,i)}this._$Eh=new Map;for(const[s,a]of this.elementProperties){const i=this._$Eu(s,a);i!==void 0&&this._$Eh.set(i,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const i of a)s.unshift(oe(i))}else e!==void 0&&s.push(oe(e));return s}static _$Eu(e,s){const a=s.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const a of s.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ze(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,a){this._$AK(e,a)}_$ET(e,s){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(i!==void 0&&a.reflect===!0){const n=(a.converter?.toAttribute!==void 0?a.converter:Lt).toAttribute(s,a.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,s){const a=this.constructor,i=a._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const n=a.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Lt;this._$Em=i;const h=o.fromAttribute(s,n.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(e,s,a,i=!1,n){if(e!==void 0){const o=this.constructor;if(i===!1&&(n=this[e]),a??=o.getPropertyOptions(e),!((a.hasChanged??Yt)(n,s)||a.useDefault&&a.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,a))))return;this.C(e,s,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:a,reflect:i,wrapped:n},o){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??s??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(s=void 0),this._$AL.set(e,s)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[i,n]of a){const{wrapped:o}=n,h=this[i];o!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,n,h)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(s)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(e){}firstUpdated(e){}};bt.elementStyles=[],bt.shadowRootOptions={mode:"open"},bt[_t("elementProperties")]=new Map,bt[_t("finalized")]=new Map,Ve?.({ReactiveElement:bt}),(Ft.reactiveElementVersions??=[]).push("2.1.2");const Zt=globalThis,ce=t=>t,Rt=Zt.trustedTypes,he=Rt?Rt.createPolicy("lit-html",{createHTML:t=>t}):void 0,_e="$lit$",X=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+X,Ge=`<${Te}>`,dt=document,At=()=>dt.createComment(""),Et=t=>t===null||typeof t!="object"&&typeof t!="function",Xt=Array.isArray,Ye=t=>Xt(t)||typeof t?.[Symbol.iterator]=="function",Kt=`[ 	
\f\r]`,Ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,ue=/>/g,nt=RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ve=/'/g,ge=/"/g,Ae=/^(?:script|style|textarea|title)$/i,Ze=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),r=Ze(1),$t=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),me=new WeakMap,ot=dt.createTreeWalker(dt,129);function Ee(t,e){if(!Xt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return he!==void 0?he.createHTML(e):e}const Xe=(t,e)=>{const s=t.length-1,a=[];let i,n=e===2?"<svg>":e===3?"<math>":"",o=Ct;for(let h=0;h<s;h++){const c=t[h];let f,u,d=-1,$=0;for(;$<c.length&&(o.lastIndex=$,u=o.exec(c),u!==null);)$=o.lastIndex,o===Ct?u[1]==="!--"?o=pe:u[1]!==void 0?o=ue:u[2]!==void 0?(Ae.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=nt):u[3]!==void 0&&(o=nt):o===nt?u[0]===">"?(o=i??Ct,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,f=u[1],o=u[3]===void 0?nt:u[3]==='"'?ge:ve):o===ge||o===ve?o=nt:o===pe||o===ue?o=Ct:(o=nt,i=void 0);const w=o===nt&&t[h+1].startsWith("/>")?" ":"";n+=o===Ct?c+Ge:d>=0?(a.push(f),c.slice(0,d)+_e+c.slice(d)+X+w):c+X+(d===-2?h:w)}return[Ee(t,n+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class Pt{constructor({strings:e,_$litType$:s},a){let i;this.parts=[];let n=0,o=0;const h=e.length-1,c=this.parts,[f,u]=Xe(e,s);if(this.el=Pt.createElement(f,a),ot.currentNode=this.el.content,s===2||s===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=ot.nextNode())!==null&&c.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(_e)){const $=u[o++],w=i.getAttribute(d).split(X),T=/([.?@])?(.*)/.exec($);c.push({type:1,index:n,name:T[2],strings:w,ctor:T[1]==="."?ts:T[1]==="?"?es:T[1]==="@"?ss:Ht}),i.removeAttribute(d)}else d.startsWith(X)&&(c.push({type:6,index:n}),i.removeAttribute(d));if(Ae.test(i.tagName)){const d=i.textContent.split(X),$=d.length-1;if($>0){i.textContent=Rt?Rt.emptyScript:"";for(let w=0;w<$;w++)i.append(d[w],At()),ot.nextNode(),c.push({type:2,index:++n});i.append(d[$],At())}}}else if(i.nodeType===8)if(i.data===Te)c.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(X,d+1))!==-1;)c.push({type:7,index:n}),d+=X.length-1}n++}}static createElement(e,s){const a=dt.createElement("template");return a.innerHTML=e,a}}function wt(t,e,s=t,a){if(e===$t)return e;let i=a!==void 0?s._$Co?.[a]:s._$Cl;const n=Et(e)?void 0:e._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(t),i._$AT(t,s,a)),a!==void 0?(s._$Co??=[])[a]=i:s._$Cl=i),i!==void 0&&(e=wt(t,i._$AS(t,e.values),i,a)),e}class Qe{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:a}=this._$AD,i=(e?.creationScope??dt).importNode(s,!0);ot.currentNode=i;let n=ot.nextNode(),o=0,h=0,c=a[0];for(;c!==void 0;){if(o===c.index){let f;c.type===2?f=new It(n,n.nextSibling,this,e):c.type===1?f=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(f=new is(n,this,e)),this._$AV.push(f),c=a[++h]}o!==c?.index&&(n=ot.nextNode(),o++)}return ot.currentNode=dt,i}p(e){let s=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,s),s+=a.strings.length-2):a._$AI(e[s])),s++}}class It{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,a,i){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=wt(this,e,s),Et(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==$t&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ye(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&Et(this._$AH)?this._$AA.nextSibling.data=e:this.T(dt.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:a}=e,i=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=Pt.createElement(Ee(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(s);else{const n=new Qe(i,this),o=n.u(this.options);n.p(s),this.T(o),this._$AH=n}}_$AC(e){let s=me.get(e.strings);return s===void 0&&me.set(e.strings,s=new Pt(e)),s}k(e){Xt(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let a,i=0;for(const n of e)i===s.length?s.push(a=new It(this.O(At()),this.O(At()),this,this.options)):a=s[i],a._$AI(n),i++;i<s.length&&(this._$AR(a&&a._$AB.nextSibling,i),s.length=i)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const a=ce(e).nextSibling;ce(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Ht{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,a,i,n){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=s,this._$AM=i,this.options=n,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=x}_$AI(e,s=this,a,i){const n=this.strings;let o=!1;if(n===void 0)e=wt(this,e,s,0),o=!Et(e)||e!==this._$AH&&e!==$t,o&&(this._$AH=e);else{const h=e;let c,f;for(e=n[0],c=0;c<n.length-1;c++)f=wt(this,h[a+c],s,c),f===$t&&(f=this._$AH[c]),o||=!Et(f)||f!==this._$AH[c],f===x?e=x:e!==x&&(e+=(f??"")+n[c+1]),this._$AH[c]=f}o&&!i&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ts extends Ht{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}}class es extends Ht{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}}class ss extends Ht{constructor(e,s,a,i,n){super(e,s,a,i,n),this.type=5}_$AI(e,s=this){if((e=wt(this,e,s,0)??x)===$t)return;const a=this._$AH,i=e===x&&a!==x||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,n=e!==x&&(a===x||i);i&&this.element.removeEventListener(this.name,this,a),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class is{constructor(e,s,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){wt(this,e)}}const as=Zt.litHtmlPolyfillSupport;as?.(Pt,It),(Zt.litHtmlVersions??=[]).push("3.3.2");const rs=(t,e,s)=>{const a=s?.renderBefore??e;let i=a._$litPart$;if(i===void 0){const n=s?.renderBefore??null;a._$litPart$=i=new It(e.insertBefore(At(),n),n,void 0,s??{})}return i._$AI(t),i};const Qt=globalThis;class g extends bt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=rs(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $t}}g._$litElement$=!0,g.finalized=!0,Qt.litElementHydrateSupport?.({LitElement:g});const ns=Qt.litElementPolyfillSupport;ns?.({LitElement:g});(Qt.litElementVersions??=[]).push("4.2.2");const y=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const os={attribute:!0,type:String,converter:Lt,reflect:!1,hasChanged:Yt},ls=(t=os,e,s)=>{const{kind:a,metadata:i}=s;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),a==="accessor"){const{name:o}=s;return{set(h){const c=e.get.call(this);e.set.call(this,h),this.requestUpdate(o,c,t,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,t,h),h}}}if(a==="setter"){const{name:o}=s;return function(h){const c=this[o];e.call(this,h),this.requestUpdate(o,c,t,!0,h)}}throw Error("Unsupported decorator location: "+a)};function v(t){return(e,s)=>typeof s=="object"?ls(t,e,s):((a,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,a),o?Object.getOwnPropertyDescriptor(i,n):void 0})(t,e,s)}function l(t){return v({...t,state:!0,attribute:!1})}const Pe=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",te="ccl-web-token",ee="ccl-tenant-token",se="ccl-tenant-id",ie="ccl-user";function Wt(){return localStorage.getItem(te)}function B(){return localStorage.getItem(ee)}function Ie(){return localStorage.getItem(se)}function De(t){localStorage.setItem(te,t)}function Ut(t){localStorage.setItem(ee,t)}function zt(t){localStorage.setItem(se,t)}function Oe(t){localStorage.setItem(ie,JSON.stringify(t))}function je(){const t=localStorage.getItem(ie);return t?JSON.parse(t):null}function Bt(){localStorage.removeItem(te),localStorage.removeItem(ee),localStorage.removeItem(se),localStorage.removeItem(ie)}class Me extends Error{constructor(e,s){super(s),this.status=e}}async function p(t,e={}){const{token:s,...a}=e,i=s??B()??Wt(),n=new Headers(a.headers);n.set("Content-Type","application/json"),i&&n.set("Authorization",`Bearer ${i}`);const o=await fetch(`${Pe}${t}`,{...a,headers:n});if(o.status===401&&(Bt(),window.dispatchEvent(new CustomEvent("ccl:unauthorized"))),!o.ok){let h=o.statusText;try{const c=await o.json();h=c.error??c.message??h}catch{}throw new Me(o.status,h)}if(o.status!==204)return o.json()}const Q={async register(t,e,s){return p("/api/auth/web/register",{method:"POST",body:JSON.stringify({email:t,username:e,password:s}),token:null})},async login(t,e){return p("/api/auth/web/login",{method:"POST",body:JSON.stringify({email:t,password:e}),token:null})},async tenantToken(t){return p("/api/auth/tenant-token",{method:"POST",body:JSON.stringify({tenantId:t})})},async listTenants(){return(await p("/api/tenants/mine")).tenants}},Tt={async create(t){return p("/api/tenants/create",{method:"POST",body:JSON.stringify({name:t})})},async get(t){return p(`/api/tenants/${t}`)},async inviteMember(t,e,s){return p(`/api/tenants/${t}/members`,{method:"POST",body:JSON.stringify({email:e,role:s})})},async removeMember(t,e){return p(`/api/tenants/${t}/members/${e}`,{method:"DELETE"})}},lt={async list(){return(await p("/api/projects")).projects},async create(t){return p("/api/projects",{method:"POST",body:JSON.stringify(t)})},async upsert(t){return p("/api/projects/upsert",{method:"POST",body:JSON.stringify(t)})},async update(t,e){return p(`/api/projects/${t}`,{method:"PATCH",body:JSON.stringify(e)})},async remove(t){return p(`/api/projects/${t}`,{method:"DELETE"})}},O={async list(t){const e=new URLSearchParams;return t?.projectId&&e.set("projectId",t.projectId),t?.status&&e.set("status",t.status),t?.archived&&e.set("archived","true"),(await p(`/api/tasks${e.size?`?${e}`:""}`)).tasks},async create(t){return p("/api/tasks",{method:"POST",body:JSON.stringify(t)})},async update(t,e){return p(`/api/tasks/${t}`,{method:"PATCH",body:JSON.stringify(e)})},async remove(t){return p(`/api/tasks/${t}`,{method:"DELETE"})},async run(t,e){return p("/api/runtime/executions",{method:"POST",body:JSON.stringify({taskId:Number(t),payload:e})})},async executions(t){return p(`/api/runtime/tasks/${t}/executions`)}},A={async list(){return(await p("/api/claws")).claws},async register(t){return p("/api/claws",{method:"POST",body:JSON.stringify({name:t})})},async remove(t){return p(`/api/claws/${t}`,{method:"DELETE"})},async projects(t){return(await p(`/api/claws/${t}/projects`)).projects},async associateProject(t,e){return p(`/api/claws/${t}/projects/${e}`,{method:"PUT"})},async unassociateProject(t,e){return p(`/api/claws/${t}/projects/${e}`,{method:"DELETE"})},async directories(t){return(await p(`/api/claws/${t}/directories`)).directories},async directoryFiles(t,e){return(await p(`/api/claws/${t}/directories/${e}/files`)).files},async directoryFileContent(t,e,s){return p(`/api/claws/${t}/directories/${e}/files/content?path=${encodeURIComponent(s)}`)},async status(t){return p(`/api/claws/${t}/status`)},wsUrl(t){const e=Pe.replace(/^http/,"ws"),s=B()??"";return`${e}/api/claws/${t}/ws?token=${encodeURIComponent(s)}`}},ae={async list(){return(await p("/marketplace/skills")).skills}},ft={async listTenant(){return(await p("/api/skill-assignments/tenant")).assignments},async assignTenant(t){return p("/api/skill-assignments/tenant",{method:"POST",body:JSON.stringify({slug:t})})},async unassignTenant(t){return p(`/api/skill-assignments/tenant/${t}`,{method:"DELETE"})},async assignClaw(t,e){return p(`/api/skill-assignments/claws/${t}`,{method:"POST",body:JSON.stringify({slug:e})})}},re={async list(t){const e=new URLSearchParams;return t?.taskId&&e.set("taskId",t.taskId),t?.clawId&&e.set("clawId",t.clawId),p(`/api/runtime/executions${e.size?`?${e}`:""}`)}};function yt(t,e={}){return p(t,{...e,token:Wt()})}const Z={async users(){return(await yt("/api/admin/users")).users},async tenants(){return(await yt("/api/admin/tenants")).tenants},async health(){return yt("/api/admin/health")},async errors(){return(await yt("/api/admin/errors")).errors},async impersonate(t,e){return yt("/api/admin/impersonate",{method:"POST",body:JSON.stringify({userId:t,tenantId:e})})},async llmUsage(t=30){return yt(`/api/admin/llm-usage?days=${t}`)}},ye=Object.freeze(Object.defineProperty({__proto__:null,ApiError:Me,adminApi:Z,auth:Q,claws:A,clearSession:Bt,executions:re,getTenantId:Ie,getTenantToken:B,getUser:je,getWebToken:Wt,marketplace:ae,projects:lt,setTenantId:zt,setTenantToken:Ut,setUser:Oe,setWebToken:De,skillAssignments:ft,tasks:O,tenants:Tt},Symbol.toStringTag,{value:"Module"}));var ds=Object.defineProperty,cs=Object.getOwnPropertyDescriptor,pt=(t,e,s,a)=>{for(var i=a>1?void 0:a?cs(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&ds(e,s,i),i};let tt=class extends g{constructor(){super(...arguments),this.mode="login",this.email="",this.username="",this.password="",this.loading=!1,this.error=""}createRenderRoot(){return this}async submit(t){if(t.preventDefault(),!(!this.email||!this.password)){this.loading=!0,this.error="";try{const e=this.mode==="login"?await Q.login(this.email,this.password):await Q.register(this.email,this.username||this.email.split("@")[0],this.password);this.dispatchEvent(new CustomEvent(this.mode==="register"?"register":"login",{detail:e,bubbles:!0,composed:!0}))}catch(e){this.error=e.message??"An error occurred"}finally{this.loading=!1}}}render(){return r`
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

          ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

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
            ${this.mode==="register"?r`
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
            ${this.mode==="login"?r`Don't have an account? <a @click=${()=>{this.mode="register",this.error=""}}>Sign up</a>`:r`Already have an account? <a @click=${()=>{this.mode="login",this.error=""}}>Sign in</a>`}
          </div>
        </div>
      </div>
    `}};pt([l()],tt.prototype,"mode",2);pt([l()],tt.prototype,"email",2);pt([l()],tt.prototype,"username",2);pt([l()],tt.prototype,"password",2);pt([l()],tt.prototype,"loading",2);pt([l()],tt.prototype,"error",2);tt=pt([y("ccl-auth")],tt);var hs=Object.defineProperty,ps=Object.getOwnPropertyDescriptor,ut=(t,e,s,a)=>{for(var i=a>1?void 0:a?ps(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&hs(e,s,i),i};let et=class extends g{constructor(){super(...arguments),this.tenants=[],this.user=null,this.showCreate=!1,this.newName="",this.creating=!1,this.error=""}createRenderRoot(){return this}selectTenant(t){this.dispatchEvent(new CustomEvent("select-tenant",{detail:t,bubbles:!0,composed:!0}))}async createTenant(t){if(t.preventDefault(),!!this.newName.trim()){this.creating=!0,this.error="";try{this.dispatchEvent(new CustomEvent("create-tenant",{detail:{name:this.newName.trim()},bubbles:!0,composed:!0}))}catch(e){this.error=e.message,this.creating=!1}}}signOut(){this.dispatchEvent(new CustomEvent("sign-out",{bubbles:!0,composed:!0}))}render(){return r`
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
            ${this.tenants.length===0?r`<div style="text-align:center;color:var(--muted);padding:32px 0;font-size:14px">
                  No workspaces yet — create your first one below.
                </div>`:this.tenants.map(t=>r`
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
            ${this.showCreate?r`
                <div class="card">
                  <div class="card-title" style="margin-bottom:16px">New workspace</div>
                  ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
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
              `:r`
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
    `}};ut([v({type:Array})],et.prototype,"tenants",2);ut([v({type:Object})],et.prototype,"user",2);ut([l()],et.prototype,"showCreate",2);ut([l()],et.prototype,"newName",2);ut([l()],et.prototype,"creating",2);ut([l()],et.prototype,"error",2);et=ut([y("ccl-workspace-picker")],et);var us=Object.defineProperty,vs=Object.getOwnPropertyDescriptor,K=(t,e,s,a)=>{for(var i=a>1?void 0:a?vs(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&us(e,s,i),i};let j=class extends g{constructor(){super(...arguments),this.tenantId="",this.items=[],this.loading=!0,this.error="",this.showModal=!1,this.editTarget=null,this.form={name:"",description:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.items=await lt.list()}catch(t){this.error=t.message}finally{this.loading=!1}}openCreate(){this.editTarget=null,this.form={name:"",description:""},this.showModal=!0}openEdit(t){this.editTarget=t,this.form={name:t.name,description:t.description??""},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await lt.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s)}else{const e=await lt.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async remove(t){if(t?.id&&confirm(`Delete project "${t.name??"this project"}"? This cannot be undone.`))try{await lt.remove(t.id),this.items=this.items.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}statusBadge(t){return r`<span class="badge ${{active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"}[t]??"badge-gray"}">${t.replace("_"," ")}</span>`}render(){return r`
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

      ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

      ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.items.length===0?r`
            <div class="empty-state">
              <div class="empty-state-icon">📁</div>
              <div class="empty-state-title">No projects yet</div>
              <div class="empty-state-sub">Create a project to start organizing tasks</div>
              <button class="btn btn-primary" style="margin-top:16px" @click=${this.openCreate}>Create project</button>
            </div>`:r`
            <div class="grid grid-3">
              ${this.items.map(t=>r`
                <div class="card" style="cursor:default">
                  <div class="card-header">
                    <div>
                      <div class="card-title">${t.name}</div>
                      <div style="font-size:11px;font-family:var(--mono);color:var(--muted);margin-top:2px">${t.key}</div>
                    </div>
                    ${this.statusBadge(t.status)}
                  </div>
                  ${t.description?r`<div style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px">${t.description}</div>`:""}
                  <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
                    ${t.taskCount!=null?r`<span style="font-size:12px;color:var(--muted)">${t.taskCount} task${t.taskCount!==1?"s":""}</span>`:""}
                    <div style="flex:1"></div>
                    <button class="btn btn-ghost btn-sm" @click=${()=>this.openEdit(t)}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${()=>this.remove(t)}>Delete</button>
                  </div>
                </div>
              `)}
            </div>`}

      ${this.showModal?this.renderModal():""}
    `}renderModal(){return r`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
        <div class="modal">
          <div class="modal-title">${this.editTarget?"Edit project":"New project"}</div>
          <div class="modal-sub">Projects group related tasks together</div>
          ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
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
    `}};K([v()],j.prototype,"tenantId",2);K([l()],j.prototype,"items",2);K([l()],j.prototype,"loading",2);K([l()],j.prototype,"error",2);K([l()],j.prototype,"showModal",2);K([l()],j.prototype,"editTarget",2);K([l()],j.prototype,"form",2);K([l()],j.prototype,"saving",2);j=K([y("ccl-projects")],j);var gs=Object.defineProperty,ms=Object.getOwnPropertyDescriptor,b=(t,e,s,a)=>{for(var i=a>1?void 0:a?ms(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&gs(e,s,i),i};const Dt=["todo","in_progress","in_review","done","blocked"],St={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"},be=["low","medium","high","critical"],ys={low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"};let m=class extends g{constructor(){super(...arguments),this.tenantId="",this.items=[],this.projects=[],this.claws=[],this.loading=!0,this.error="",this.view="kanban",this.filterStatus="",this.filterProject="",this.filterPriority="",this.search="",this.showArchived=!1,this.showModal=!1,this.editTarget=null,this.form={},this.saving=!1,this.drawerTask=null,this.drawerExecutions=[],this.drawerTab="detail",this.running=!1,this.dragTaskId=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.projects,this.claws]=await Promise.all([O.list({archived:this.showArchived}),lt.list(),A.list()])}catch(t){this.error=t.message}finally{this.loading=!1}}get filtered(){return this.items.filter(t=>!(this.filterStatus&&t.status!==this.filterStatus||this.filterProject&&t.projectId!==this.filterProject||this.filterPriority&&t.priority!==this.filterPriority||this.search&&!t.title.toLowerCase().includes(this.search.toLowerCase())))}tasksForStatus(t){return this.filtered.filter(e=>e.status===t)}openCreate(){this.editTarget=null,this.form={status:"todo",priority:"medium"},this.showModal=!0}openEdit(t,e){e?.stopPropagation(),this.editTarget=t,this.form={...t},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await O.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.drawerTask?.id===e.id&&(this.drawerTask=e)}else{const e=await O.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async remove(t,e){e?.stopPropagation(),t?.id&&confirm(`Delete "${t.title??"this task"}"?`)&&(await O.remove(t.id),this.items=this.items.filter(s=>s.id!==t.id),this.drawerTask?.id===t.id&&(this.drawerTask=null))}async patchStatus(t,e){const s=await O.update(t,{status:e});this.items=this.items.map(a=>a.id===t?s:a),this.drawerTask?.id===t&&(this.drawerTask=s)}async runTask(t,e){e.stopPropagation(),this.running=!0;try{const s=await O.run(t.id),a=await O.update(t.id,{status:"in_progress"});this.items=this.items.map(i=>i.id===a.id?a:i),this.drawerTask?.id===t.id&&(this.drawerTask=a,this.drawerExecutions=[s,...this.drawerExecutions])}catch(s){this.error=s.message}finally{this.running=!1}}async openDrawer(t){this.drawerTask=t,this.drawerTab="detail";try{this.drawerExecutions=await O.executions(t.id)}catch{this.drawerExecutions=[]}}closeDrawer(){this.drawerTask=null}dragStart(t){this.dragTaskId=t}dragOver(t){t.preventDefault()}async drop(t,e){t.preventDefault(),this.dragTaskId&&(await this.patchStatus(this.dragTaskId,e),this.dragTaskId="")}projectName(t){return t?this.projects.find(e=>e.id===t)?.name??t:"—"}clawName(t){return t?this.claws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return r`<span class="badge ${ys[t]}">${t}</span>`}statusBadge(t){return r`<span class="badge ${{todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red"}[t]}">${St[t]}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}render(){return r`
      <!-- Header -->
      <div class="page-header">
        <div>
          <div class="page-title">Tasks</div>
          <div class="page-sub">${this.filtered.length} task${this.filtered.length!==1?"s":""}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <!-- View toggle -->
          <div style="display:flex;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden">
            ${["kanban","list","gantt"].map(t=>r`
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

      ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

      <!-- Filters -->
      <div class="filters" style="margin-bottom:16px">
        <input class="input" style="max-width:200px;height:32px;padding:4px 10px"
          placeholder="Search…" .value=${this.search}
          @input=${t=>{this.search=t.target.value}}>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterStatus=t.target.value}}>
          <option value="">All statuses</option>
          ${Dt.map(t=>r`<option value=${t}>${St[t]}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterProject=t.target.value}}>
          <option value="">All projects</option>
          ${this.projects.map(t=>r`<option value=${t.id}>${t.name}</option>`)}
        </select>
        <select class="select" style="max-width:140px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterPriority=t.target.value}}>
          <option value="">All priorities</option>
          ${be.map(t=>r`<option value=${t}>${t}</option>`)}
        </select>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted);cursor:pointer">
          <input type="checkbox" .checked=${this.showArchived}
            @change=${async t=>{this.showArchived=t.target.checked,await this.load()}}>
          Archived
        </label>
      </div>

      ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.view==="kanban"?this.renderKanban():this.view==="list"?this.renderList():this.renderGantt()}

      ${this.showModal?this.renderModal():""}
      ${this.drawerTask?this.renderDrawer():""}
    `}renderKanban(){return r`
      <div class="kanban">
        ${Dt.map(t=>r`
          <div class="kanban-col"
            @dragover=${this.dragOver}
            @drop=${e=>this.drop(e,t)}>
            <div class="kanban-col-header">
              <div class="kanban-col-title">${St[t]}</div>
              <div class="kanban-col-count">${this.tasksForStatus(t).length}</div>
            </div>
            <div class="kanban-col-body">
              ${this.tasksForStatus(t).map(e=>r`
                <div class="task-card"
                  draggable="true"
                  @dragstart=${()=>this.dragStart(e.id)}
                  @click=${()=>this.openDrawer(e)}>
                  <div class="task-card-title">${e.title}</div>
                  <div class="task-card-meta">
                    <span class="task-key">${e.key}</span>
                    ${this.priorityBadge(e.priority)}
                    ${e.assignedClawId?r`<span style="font-size:11px;color:var(--muted)">${this.clawName(e.assignedClawId)}</span>`:""}
                    ${e.dueDate?r`<span style="font-size:11px;color:var(--muted);margin-left:auto">${this.formatDate(e.dueDate)}</span>`:""}
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
    `}renderList(){const t=this.filtered;return t.length===0?r`<div class="empty-state"><div class="empty-state-title">No tasks found</div></div>`:r`
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
            ${t.map(e=>r`
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
    `}renderGantt(){const t=this.filtered.filter(d=>d.dueDate||d.createdAt);if(t.length===0)return r`<div class="empty-state"><div class="empty-state-title">No tasks with dates</div><div class="empty-state-sub">Set due dates on tasks to see the timeline</div></div>`;const e=t.map(d=>new Date(d.dueDate??d.createdAt)),s=new Date(Math.min(...e.map(d=>d.getTime()))),a=new Date(Math.max(...e.map(d=>d.getTime())));s.setDate(1),a.setMonth(a.getMonth()+1),a.setDate(0);const i=Math.ceil((a.getTime()-s.getTime())/864e5)+1,n=24,o=i*n,h=[],c=new Date(s);for(;c<=a;){const d=Math.floor((c.getTime()-s.getTime())/864e5),$=new Date(c.getFullYear(),c.getMonth()+1,0).getDate();h.push({label:c.toLocaleDateString(void 0,{month:"short",year:"2-digit"}),left:d*n,width:$*n}),c.setMonth(c.getMonth()+1),c.setDate(1)}const u=Math.floor((new Date().getTime()-s.getTime())/864e5)*n;return r`
      <div style="overflow-x:auto">
        <div style="min-width:${o+200}px">
          <!-- Month headers -->
          <div style="display:flex;margin-left:200px;border-bottom:1px solid var(--border)">
            ${h.map(d=>r`
              <div style="min-width:${d.width}px;padding:4px 8px;font-size:11px;color:var(--muted);border-right:1px solid var(--border)">${d.label}</div>
            `)}
          </div>
          <!-- Tasks -->
          <div style="position:relative">
            <!-- Today line -->
            ${u>=0&&u<=o?r`
              <div style="position:absolute;left:${200+u}px;top:0;bottom:0;width:2px;background:var(--accent);opacity:0.6;z-index:1"></div>
            `:""}

            ${t.map(d=>{const $=new Date(d.createdAt),w=new Date(d.dueDate??d.createdAt),T=Math.floor(($.getTime()-s.getTime())/864e5),mt=Math.max(1,Math.ceil((w.getTime()-$.getTime())/864e5)),Le={done:"var(--ok)",in_progress:"var(--accent)",blocked:"var(--danger)",in_review:"var(--warn)",todo:"var(--muted)"};return r`
                <div style="display:flex;align-items:center;border-bottom:1px solid var(--border);height:40px">
                  <div style="width:200px;flex-shrink:0;padding:0 12px;font-size:12px;font-weight:500;color:var(--text);truncate">
                    ${d.title}
                  </div>
                  <div style="flex:1;position:relative;height:100%">
                    <div
                      style="position:absolute;top:8px;height:24px;
                        left:${T*n}px;
                        width:${mt*n}px;
                        background:${Le[d.status]??"var(--muted)"};
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
    `}renderModal(){return r`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
        <div class="modal" style="max-width:540px">
          <div class="modal-title">${this.editTarget?"Edit task":"New task"}</div>
          ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
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
                  ${Dt.map(t=>r`<option value=${t}>${St[t]}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Priority</label>
                <select class="select" .value=${this.form.priority??"medium"}
                  @change=${t=>{this.form={...this.form,priority:t.target.value}}}>
                  ${be.map(t=>r`<option value=${t}>${t}</option>`)}
                </select>
              </div>
            </div>
            <div class="form-row form-row-2">
              <div class="field">
                <label class="label">Project</label>
                <select class="select" .value=${this.form.projectId??""}
                  @change=${t=>{this.form={...this.form,projectId:t.target.value||void 0}}}>
                  <option value="">No project</option>
                  ${this.projects.map(t=>r`<option value=${t.id}>${t.name}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Assign to Claw</label>
                <select class="select" .value=${this.form.assignedClawId??""}
                  @change=${t=>{this.form={...this.form,assignedClawId:t.target.value||void 0}}}>
                  <option value="">Unassigned</option>
                  ${this.claws.map(t=>r`<option value=${t.id}>${t.name}</option>`)}
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
    `}renderDrawer(){const t=this.drawerTask;return r`
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
          ${["detail","executions"].map(e=>r`
            <button class="panel-tab ${this.drawerTab===e?"active":""}"
              @click=${()=>{this.drawerTab=e}}>${e}</button>
          `)}
        </div>
        <div class="panel-body" style="padding:20px">
          ${this.drawerTab==="detail"?this.renderDrawerDetail(t):this.renderDrawerExecutions(t)}
        </div>
      </div>
    `}renderDrawerDetail(t){return r`
      <div style="display:grid;gap:16px">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${this.statusBadge(t.status)}
          ${this.priorityBadge(t.priority)}
        </div>

        ${t.description?r`
          <div class="card">
            <div class="card-title" style="margin-bottom:8px">Description</div>
            <div style="font-size:13px;color:var(--text);line-height:1.6;white-space:pre-wrap">${t.description}</div>
          </div>`:""}

        <div class="card">
          <div class="card-title" style="margin-bottom:12px">Details</div>
          <div style="display:grid;gap:10px">
            ${[["Project",this.projectName(t.projectId)],["Assigned",this.clawName(t.assignedClawId)],["Due date",this.formatDate(t.dueDate)||"None"],["Created",this.formatDate(t.createdAt)]].map(([e,s])=>r`
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
            ${Dt.filter(e=>e!==t.status).map(e=>r`
              <button class="btn btn-secondary btn-sm"
                @click=${()=>this.patchStatus(t.id,e)}>${St[e]}</button>
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
    `}renderDrawerExecutions(t){if(this.drawerExecutions.length===0)return r`<div class="empty-state"><div class="empty-state-title">No executions yet</div></div>`;const e={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return r`
      <div style="display:grid;gap:10px">
        ${this.drawerExecutions.map(s=>r`
          <div class="card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span class="badge ${e[s.status]??"badge-gray"}">${s.status}</span>
              <span style="font-size:11px;color:var(--muted)">${this.formatDate(s.createdAt)}</span>
            </div>
            ${s.result?r`
              <div class="log-wrap" style="max-height:120px;overflow-y:auto;font-size:11px">${s.result}</div>
            `:""}
          </div>
        `)}
      </div>
    `}};b([v()],m.prototype,"tenantId",2);b([l()],m.prototype,"items",2);b([l()],m.prototype,"projects",2);b([l()],m.prototype,"claws",2);b([l()],m.prototype,"loading",2);b([l()],m.prototype,"error",2);b([l()],m.prototype,"view",2);b([l()],m.prototype,"filterStatus",2);b([l()],m.prototype,"filterProject",2);b([l()],m.prototype,"filterPriority",2);b([l()],m.prototype,"search",2);b([l()],m.prototype,"showArchived",2);b([l()],m.prototype,"showModal",2);b([l()],m.prototype,"editTarget",2);b([l()],m.prototype,"form",2);b([l()],m.prototype,"saving",2);b([l()],m.prototype,"drawerTask",2);b([l()],m.prototype,"drawerExecutions",2);b([l()],m.prototype,"drawerTab",2);b([l()],m.prototype,"running",2);b([l()],m.prototype,"dragTaskId",2);m=b([y("ccl-tasks")],m);const fe=[800,1500,3e3,5e3,1e4,15e3];class Ne{constructor(e){this.opts=e,this.ws=null,this.attempt=0,this.destroyed=!1,this.pingInterval=null,this.connect()}connect(){this.destroyed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>{this.attempt=0,this.schedulePings(),this.opts.onEvent({type:"connected"})}),this.ws.addEventListener("message",e=>{let s;try{s=JSON.parse(e.data)}catch{s=e.data}if(s&&typeof s=="object"&&s.type==="claw_offline"){this.opts.onEvent({type:"claw_offline"});return}this.opts.onEvent({type:"message",data:s})}),this.ws.addEventListener("close",e=>{this.clearPings(),!this.destroyed&&(this.opts.onEvent({type:"disconnected",code:e.code,reason:e.reason}),this.scheduleReconnect())}),this.ws.addEventListener("error",()=>{}))}send(e){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(e))}destroy(){this.destroyed=!0,this.clearPings(),this.ws?.close(1e3,"destroyed"),this.ws=null}get readyState(){return this.ws?.readyState??WebSocket.CLOSED}schedulePings(){this.clearPings(),this.pingInterval=setInterval(()=>{this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"ping"}))},3e4)}clearPings(){this.pingInterval!==null&&(clearInterval(this.pingInterval),this.pingInterval=null)}scheduleReconnect(){const e=fe[Math.min(this.attempt,fe.length-1)];this.attempt++,setTimeout(()=>this.connect(),e)}}var bs=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,q=(t,e,s,a)=>{for(var i=a>1?void 0:a?fs(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&bs(e,s,i),i};let M=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.messages=[],this.tools=[],this.input="",this.connState="connecting",this.session="default",this.streaming=!1,this.gw=null,this.msgEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.scrollToBottom()}connect(){this.connState="connecting",this.gw=new Ne({url:this.wsUrl,onEvent:t=>this.handleGwEvent(t)})}handleGwEvent(t){if(t.type==="connected"){this.connState="connected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type!=="message")return;const e=t.data;switch(e.type){case"chat.message":{if(e.role==="user")this.messages=[...this.messages,{id:crypto.randomUUID(),role:"user",text:e.text??""}];else{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:e.text??"",streaming:!1}]:this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.text??""}],this.streaming=!1}break}case"chat.delta":{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:s.text+(e.delta??"")}]:(this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.delta??"",streaming:!0}],this.streaming=!0);break}case"tool.start":{this.tools=[...this.tools,{id:e.toolCallId??crypto.randomUUID(),name:e.toolName??"tool",input:e.toolInput,expanded:!1}];break}case"tool.result":{this.tools=this.tools.map(s=>s.id===e.toolCallId?{...s,result:e.toolResult}:s);break}case"chat.abort":this.streaming=!1;break}}send(){const t=this.input.trim();!t||this.connState!=="connected"||(this.gw?.send({type:"chat",message:t,session:this.session}),this.input="")}abort(){this.gw?.send({type:"chat.abort"}),this.streaming=!1}newChat(){this.messages=[],this.tools=[],this.streaming=!1,this.gw?.send({type:"session.new"})}scrollToBottom(){this.msgEnd?.scrollIntoView({behavior:"smooth"})}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}connDot(){return r`<span class="dot ${{connected:"dot-green",connecting:"dot-yellow",offline:"dot-red",disconnected:"dot-gray"}[this.connState]}"></span> ${this.connState}`}render(){return r`
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
          ${this.connState==="offline"?r`
            <div class="empty-state">
              <div class="empty-state-icon">🔌</div>
              <div class="empty-state-title">Claw is offline</div>
              <div class="empty-state-sub">Waiting for the CoderClaw instance to connect</div>
            </div>`:""}

          ${this.messages.length===0&&this.connState!=="offline"?r`
            <div class="empty-state" style="margin-top:32px">
              <div class="empty-state-icon">💬</div>
              <div class="empty-state-title">Start a conversation</div>
              <div class="empty-state-sub">Send a message to the claw</div>
            </div>`:""}

          ${this.messages.map(t=>r`
            <div class="msg ${t.role==="user"?"msg-user":""}">
              <div class="msg-bubble ${t.role==="user"?"msg-bubble-user":"msg-bubble-assistant"}">
                ${t.text}${t.streaming?r`<span class="cursor-blink"></span>`:""}
              </div>
              <div class="msg-meta">${t.role}</div>
            </div>
          `)}

          ${this.tools.length>0?r`
            <div style="display:flex;flex-direction:column;gap:6px">
              ${this.tools.map(t=>r`
                <div class="card" style="font-size:12px">
                  <div style="display:flex;align-items:center;gap:8px;cursor:pointer"
                    @click=${()=>{this.tools=this.tools.map(e=>e.id===t.id?{...e,expanded:!e.expanded}:e)}}>
                    <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="${t.expanded?"18 15 12 9 6 15":"6 9 12 15 18 9"}"/></svg>
                    <span style="font-family:var(--mono);color:var(--accent)">${t.name}</span>
                    ${t.result?r`<span class="badge badge-green" style="margin-left:auto">done</span>`:r`<span class="badge badge-yellow" style="margin-left:auto">running</span>`}
                  </div>
                  ${t.expanded&&t.input?r`<pre class="log-wrap" style="margin-top:8px;font-size:11px;max-height:100px;overflow:auto">${t.input}</pre>`:""}
                  ${t.expanded&&t.result?r`<pre class="log-wrap" style="margin-top:6px;font-size:11px;max-height:100px;overflow:auto;border-color:var(--ok)">${t.result}</pre>`:""}
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
          ${this.streaming?r`<button class="btn btn-danger" @click=${this.abort}>Stop</button>`:r`<button class="btn btn-primary" @click=${this.send} ?disabled=${!this.input.trim()||this.connState!=="connected"}>Send</button>`}
        </div>
      </div>
    `}};q([v()],M.prototype,"clawId",2);q([v()],M.prototype,"wsUrl",2);q([l()],M.prototype,"messages",2);q([l()],M.prototype,"tools",2);q([l()],M.prototype,"input",2);q([l()],M.prototype,"connState",2);q([l()],M.prototype,"session",2);q([l()],M.prototype,"streaming",2);M=q([y("ccl-claw-chat")],M);var $s=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,J=(t,e,s,a)=>{for(var i=a>1?void 0:a?ws(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&$s(e,s,i),i};const xs=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Ot(t,e={}){const s=await fetch(`${xs}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${B()??""}`,...e.headers??{}}});if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}const ks=["claude","openai","ollama","http"];let N=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.agents=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",type:"claude",endpoint:"",apiKey:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.agents=await Ot("/api/agents")}catch(t){this.error=t.message}finally{this.loading=!1}}async toggleActive(t){try{await Ot(`/api/agents/${t.id}`,{method:"PATCH",body:JSON.stringify({isActive:!t.isActive})}),this.agents=this.agents.map(e=>e.id===t.id?{...e,isActive:!e.isActive}:e)}catch(e){this.error=e.message}}async remove(t){if(confirm(`Delete agent "${t.name}"?`))try{await Ot(`/api/agents/${t.id}`,{method:"DELETE"}),this.agents=this.agents.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Ot("/api/agents",{method:"POST",body:JSON.stringify(this.form)});this.agents=[e,...this.agents],this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}render(){return r`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Agents</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Add agent</button>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.agents.length===0?r`<div class="empty-state"><div class="empty-state-title">No agents</div><div class="empty-state-sub">Add an AI agent to this claw</div></div>`:this.agents.map(t=>r`
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

        ${this.showModal?r`
          <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&(this.showModal=!1)}}>
            <div class="modal">
              <div class="modal-title">Add agent</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Name</label>
                  <input class="input" required .value=${this.form.name} @input=${t=>{this.form={...this.form,name:t.target.value}}}></div>
                <div class="field"><label class="label">Type</label>
                  <select class="select" @change=${t=>{this.form={...this.form,type:t.target.value}}}>
                    ${ks.map(t=>r`<option value=${t}>${t}</option>`)}
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
    `}};J([v()],N.prototype,"clawId",2);J([v()],N.prototype,"wsUrl",2);J([l()],N.prototype,"agents",2);J([l()],N.prototype,"loading",2);J([l()],N.prototype,"error",2);J([l()],N.prototype,"showModal",2);J([l()],N.prototype,"form",2);J([l()],N.prototype,"saving",2);N=J([y("ccl-claw-agents")],N);var Cs=Object.defineProperty,Ss=Object.getOwnPropertyDescriptor,D=(t,e,s,a)=>{for(var i=a>1?void 0:a?Ss(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&Cs(e,s,i),i};const _s=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function $e(t,e={}){const s=await fetch(`${_s}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${B()??""}`,...e.headers??{}}});if(s.status===404)return{};if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}let E=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.config={},this.loading=!0,this.error="",this.editing=!1,this.draft={},this.saving=!1,this.newKey="",this.newVal=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await $e(`/api/claws/${this.clawId}/config`);this.config=t??{}}catch(t){this.error=t.message}finally{this.loading=!1}}startEdit(){this.draft={...this.config},this.editing=!0}cancel(){this.editing=!1,this.draft={}}async save(){this.saving=!0;try{await $e(`/api/claws/${this.clawId}/config`,{method:"PATCH",body:JSON.stringify(this.draft)}),this.config={...this.draft},this.editing=!1}catch(t){this.error=t.message}finally{this.saving=!1}}addField(){this.newKey.trim()&&(this.draft={...this.draft,[this.newKey.trim()]:this.newVal},this.newKey="",this.newVal="")}removeField(t){const e={...this.draft};delete e[t],this.draft=e}render(){const t=Object.entries(this.editing?this.draft:this.config);return r`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Configuration</div>
          ${this.editing?r`<div style="display:flex;gap:6px">
                <button class="btn btn-ghost btn-sm" @click=${this.cancel}>Cancel</button>
                <button class="btn btn-primary btn-sm" ?disabled=${this.saving} @click=${this.save}>${this.saving?"Saving…":"Save"}</button>
              </div>`:r`<button class="btn btn-secondary btn-sm" @click=${this.startEdit}>Edit</button>`}
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:""}

        ${t.length===0&&!this.loading?r`<div class="empty-state"><div class="empty-state-title">No configuration</div><div class="empty-state-sub">${this.editing?"Add key-value pairs below":"Click Edit to add configuration"}</div></div>`:r`
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>Key</th><th>Value</th>${this.editing?r`<th></th>`:""}</tr></thead>
                <tbody>
                  ${t.map(([e,s])=>r`
                    <tr>
                      <td><code style="font-family:var(--mono);font-size:12px">${e}</code></td>
                      <td>${this.editing?r`<input class="input" style="height:28px;padding:3px 8px" .value=${s}
                            @input=${a=>{this.draft={...this.draft,[e]:a.target.value}}}>`:r`<span style="font-family:var(--mono);font-size:12px">${s}</span>`}
                      </td>
                      ${this.editing?r`<td><button class="btn btn-danger btn-sm" @click=${()=>this.removeField(e)}>Remove</button></td>`:""}
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>`}

        ${this.editing?r`
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
    `}};D([v()],E.prototype,"clawId",2);D([v()],E.prototype,"wsUrl",2);D([l()],E.prototype,"config",2);D([l()],E.prototype,"loading",2);D([l()],E.prototype,"error",2);D([l()],E.prototype,"editing",2);D([l()],E.prototype,"draft",2);D([l()],E.prototype,"saving",2);D([l()],E.prototype,"newKey",2);D([l()],E.prototype,"newVal",2);E=D([y("ccl-claw-config")],E);var Ts=Object.defineProperty,As=Object.getOwnPropertyDescriptor,xt=(t,e,s,a)=>{for(var i=a>1?void 0:a?As(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&Ts(e,s,i),i};const Es=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function we(t,e={}){const s=await fetch(`${Es}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${B()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let ct=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.sessions=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await we(`/api/claws/${this.clawId}/sessions`);this.sessions=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async remove(t){if(confirm("Delete this session?"))try{await we(`/api/claws/${this.clawId}/sessions/${t.id}`,{method:"DELETE"}),this.sessions=this.sessions.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){return r`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Sessions</div>
          <button class="btn btn-secondary btn-sm" @click=${this.load}>Refresh</button>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.sessions.length===0?r`<div class="empty-state"><div class="empty-state-title">No sessions</div><div class="empty-state-sub">Sessions appear here once the claw connects and starts chatting</div></div>`:this.sessions.map(t=>r`
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
    `}};xt([v()],ct.prototype,"clawId",2);xt([v()],ct.prototype,"wsUrl",2);xt([l()],ct.prototype,"sessions",2);xt([l()],ct.prototype,"loading",2);xt([l()],ct.prototype,"error",2);ct=xt([y("ccl-claw-sessions")],ct);const Ps="modulepreload",Is=function(t,e){return new URL(t,e).href},xe={},ke=function(e,s,a){let i=Promise.resolve();if(s&&s.length>0){let f=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then($=>({status:"fulfilled",value:$}),$=>({status:"rejected",reason:$}))))};const o=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),c=h?.nonce||h?.getAttribute("nonce");i=f(s.map(u=>{if(u=Is(u,a),u in xe)return;xe[u]=!0;const d=u.endsWith(".css"),$=d?'[rel="stylesheet"]':"";if(a)for(let T=o.length-1;T>=0;T--){const mt=o[T];if(mt.href===u&&(!d||mt.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${$}`))return;const w=document.createElement("link");if(w.rel=d?"stylesheet":Ps,d||(w.as="script"),w.crossOrigin="",w.href=u,c&&w.setAttribute("nonce",c),document.head.appendChild(w),d)return new Promise((T,mt)=>{w.addEventListener("load",T),w.addEventListener("error",()=>mt(new Error(`Unable to preload CSS for ${u}`)))})}))}function n(o){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=o,window.dispatchEvent(h),!h.defaultPrevented)throw o}return i.then(o=>{for(const h of o||[])h.status==="rejected"&&n(h.reason);return e().catch(n)})};var Ds=Object.defineProperty,Os=Object.getOwnPropertyDescriptor,V=(t,e,s,a)=>{for(var i=a>1?void 0:a?Os(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&Ds(e,s,i),i};let L=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.assigned=[],this.available=[],this.loading=!0,this.error="",this.showModal=!1,this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([this.loadAssigned(),ae.list().catch(()=>[])]);this.assigned=t,this.available=e}catch(t){this.error=t.message}finally{this.loading=!1}}async loadAssigned(){try{const{getTenantToken:t}=await ke(async()=>{const{getTenantToken:a}=await Promise.resolve().then(()=>ye);return{getTenantToken:a}},void 0,import.meta.url),e=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",s=await fetch(`${e}/api/skill-assignments/claws/${this.clawId}`,{headers:{Authorization:`Bearer ${t()??""}`}});return s.ok?s.json():[]}catch{return[]}}async assign(t){this.saving=!0;try{await ft.assignClaw(this.clawId,t),this.assigned=await this.loadAssigned(),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async unassign(t){try{const{getTenantToken:e}=await ke(async()=>{const{getTenantToken:a}=await Promise.resolve().then(()=>ye);return{getTenantToken:a}},void 0,import.meta.url),s=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";await fetch(`${s}/api/skill-assignments/claws/${this.clawId}/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${e()??""}`}}),this.assigned=this.assigned.filter(a=>a.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}render(){const t=this.assignedSlugs(),e=this.available.filter(s=>!t.has(s.slug));return r`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Skills</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Assign skill</button>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.assigned.length===0?r`<div class="empty-state"><div class="empty-state-title">No skills assigned</div><div class="empty-state-sub">Assign skills to give this claw extra capabilities</div></div>`:this.assigned.map(s=>r`
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

        ${this.showModal?r`
          <div class="modal-backdrop" @click=${s=>{s.target===s.currentTarget&&(this.showModal=!1)}}>
            <div class="modal" style="max-width:500px">
              <div class="modal-title">Assign skill</div>
              <div class="modal-sub">Add a skill from the marketplace to this claw</div>
              ${e.length===0?r`<div style="color:var(--muted);font-size:13px;padding:16px 0">All available skills are already assigned</div>`:r`<div style="display:grid;gap:8px;max-height:360px;overflow-y:auto">
                    ${e.map(s=>r`
                      <div class="card" style="display:flex;align-items:center;gap:12px;cursor:pointer" @click=${()=>this.assign(s.slug)}>
                        ${s.icon?r`<img src="${s.icon}" style="width:32px;height:32px;border-radius:6px">`:r`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
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
    `}};V([v()],L.prototype,"clawId",2);V([v()],L.prototype,"wsUrl",2);V([l()],L.prototype,"assigned",2);V([l()],L.prototype,"available",2);V([l()],L.prototype,"loading",2);V([l()],L.prototype,"error",2);V([l()],L.prototype,"showModal",2);V([l()],L.prototype,"saving",2);L=V([y("ccl-claw-skills")],L);var js=Object.defineProperty,Ms=Object.getOwnPropertyDescriptor,vt=(t,e,s,a)=>{for(var i=a>1?void 0:a?Ms(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&js(e,s,i),i};let st=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.items=[],this.loading=!0,this.error="",this.timeFilter="week"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{this.items=await re.list({clawId:this.clawId})}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){const t=Date.now(),s={today:864e5,week:6048e5,month:2592e6,all:1/0}[this.timeFilter];return this.items.filter(a=>t-new Date(a.createdAt).getTime()<s)}stats(t){const e=t.length,s=t.filter(n=>n.status==="completed").length,a=t.filter(n=>n.status==="failed").length,i=t.filter(n=>n.status==="running").length;return{total:e,completed:s,failed:a,running:i}}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered(),e=this.stats(t),s={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return r`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Usage</div>
          <div style="display:flex;gap:4px">
            ${["today","week","month","all"].map(a=>r`
              <button class="btn btn-sm ${this.timeFilter===a?"btn-primary":"btn-ghost"}" @click=${()=>{this.timeFilter=a}}>
                ${a}
              </button>
            `)}
          </div>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

        <div class="stat-grid">
          ${[["Total",e.total],["Completed",e.completed],["Failed",e.failed],["Running",e.running]].map(([a,i])=>r`
            <div class="stat-card">
              <div class="stat-value">${i}</div>
              <div class="stat-label">${a}</div>
            </div>
          `)}
        </div>

        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:t.length===0?r`<div class="empty-state"><div class="empty-state-title">No executions</div></div>`:r`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Task</th><th>Status</th><th>Duration</th><th>Started</th></tr></thead>
                  <tbody>
                    ${t.slice().reverse().map(a=>r`
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
    `}};vt([v()],st.prototype,"clawId",2);vt([v()],st.prototype,"wsUrl",2);vt([l()],st.prototype,"items",2);vt([l()],st.prototype,"loading",2);vt([l()],st.prototype,"error",2);vt([l()],st.prototype,"timeFilter",2);st=vt([y("ccl-claw-usage")],st);var Ns=Object.defineProperty,Ls=Object.getOwnPropertyDescriptor,G=(t,e,s,a)=>{for(var i=a>1?void 0:a?Ls(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&Ns(e,s,i),i};const Rs=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function jt(t,e={}){const s=await fetch(`${Rs}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${B()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let R=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.jobs=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",schedule:"0 9 * * 1-5",taskId:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await jt(`/api/claws/${this.clawId}/cron`);this.jobs=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await jt(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.jobs=this.jobs.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async remove(t){if(confirm(`Delete cron job "${t.name}"?`))try{await jt(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"DELETE"}),this.jobs=this.jobs.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await jt(`/api/claws/${this.clawId}/cron`,{method:"POST",body:JSON.stringify(this.form)});e&&(this.jobs=[e,...this.jobs]),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return r`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Cron Jobs</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Add job</button>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.jobs.length===0?r`<div class="empty-state"><div class="empty-state-icon">⏰</div><div class="empty-state-title">No cron jobs</div><div class="empty-state-sub">Schedule recurring tasks for this claw</div></div>`:this.jobs.map(t=>r`
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

        ${this.showModal?r`
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
    `}};G([v()],R.prototype,"clawId",2);G([v()],R.prototype,"wsUrl",2);G([l()],R.prototype,"jobs",2);G([l()],R.prototype,"loading",2);G([l()],R.prototype,"error",2);G([l()],R.prototype,"showModal",2);G([l()],R.prototype,"form",2);G([l()],R.prototype,"saving",2);R=G([y("ccl-claw-cron")],R);var Us=Object.defineProperty,zs=Object.getOwnPropertyDescriptor,kt=(t,e,s,a)=>{for(var i=a>1?void 0:a?zs(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&Us(e,s,i),i};const Bs=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Ce(t,e={}){const s=await fetch(`${Bs}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${B()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let ht=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.nodes=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Ce(`/api/claws/${this.clawId}/nodes`);this.nodes=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async unpair(t){if(confirm(`Unpair node "${t.name??t.id}"?`))try{await Ce(`/api/claws/${this.clawId}/nodes/${t.id}`,{method:"DELETE"}),this.nodes=this.nodes.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return r`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Paired Nodes</div>
          <button class="btn btn-secondary btn-sm" @click=${this.load}>Refresh</button>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.nodes.length===0?r`<div class="empty-state"><div class="empty-state-icon">🖥️</div><div class="empty-state-title">No nodes paired</div><div class="empty-state-sub">Pair a device to extend this claw's capabilities</div></div>`:this.nodes.map(t=>r`
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
                ${t.capabilities?.length?r`
                  <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">
                    ${t.capabilities.map(e=>r`<span class="badge badge-gray">${e}</span>`)}
                  </div>`:""}
                <button class="btn btn-danger btn-sm" @click=${()=>this.unpair(t)}>Unpair</button>
              </div>
            `)}
      </div>
    `}};kt([v()],ht.prototype,"clawId",2);kt([v()],ht.prototype,"wsUrl",2);kt([l()],ht.prototype,"nodes",2);kt([l()],ht.prototype,"loading",2);kt([l()],ht.prototype,"error",2);ht=kt([y("ccl-claw-nodes")],ht);var Fs=Object.defineProperty,Hs=Object.getOwnPropertyDescriptor,F=(t,e,s,a)=>{for(var i=a>1?void 0:a?Hs(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&Fs(e,s,i),i};const Ws=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Mt(t,e={}){const s=await fetch(`${Ws}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${B()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}const Ks=["discord","slack","telegram","whatsapp","signal","googlechat","nostr"],qs={discord:[{key:"token",label:"Bot Token",type:"password"},{key:"guildId",label:"Guild ID"}],slack:[{key:"botToken",label:"Bot Token",type:"password"},{key:"appToken",label:"App Token",type:"password"}],telegram:[{key:"token",label:"Bot Token",type:"password"}],whatsapp:[{key:"phoneNumberId",label:"Phone Number ID"},{key:"accessToken",label:"Access Token",type:"password"}],signal:[{key:"phone",label:"Phone Number"}],googlechat:[{key:"serviceAccountKey",label:"Service Account Key (JSON)",type:"password"}],nostr:[{key:"privateKey",label:"Private Key (nsec)",type:"password"},{key:"relays",label:"Relay URLs (comma-separated)"}]};let P=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.channels=[],this.loading=!0,this.error="",this.showModal=!1,this.selectedType="discord",this.form={},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Mt(`/api/claws/${this.clawId}/channels`);this.channels=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await Mt(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.channels=this.channels.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async remove(t){if(confirm(`Delete ${t.type} channel?`))try{await Mt(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"DELETE"}),this.channels=this.channels.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Mt(`/api/claws/${this.clawId}/channels`,{method:"POST",body:JSON.stringify({type:this.selectedType,config:this.form})});e&&(this.channels=[e,...this.channels]),this.showModal=!1,this.form={}}catch(e){this.error=e.message}finally{this.saving=!1}}statusDot(t){return r`<span class="dot ${{connected:"dot-green",error:"dot-red",stopped:"dot-gray",pending:"dot-yellow"}[t]??"dot-gray"}"></span>`}render(){const t=qs[this.selectedType]??[];return r`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Channels</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0,this.form={}}}>Add channel</button>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.channels.length===0?r`<div class="empty-state"><div class="empty-state-icon">💬</div><div class="empty-state-title">No channels</div><div class="empty-state-sub">Connect Discord, Slack, Telegram and more</div></div>`:this.channels.map(e=>r`
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

        ${this.showModal?r`
          <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&(this.showModal=!1)}}>
            <div class="modal">
              <div class="modal-title">Add channel</div>
              <form @submit=${this.save} style="display:grid;gap:14px;margin-top:16px">
                <div class="field">
                  <label class="label">Channel type</label>
                  <select class="select" @change=${e=>{this.selectedType=e.target.value,this.form={}}}>
                    ${Ks.map(e=>r`<option value=${e}>${e}</option>`)}
                  </select>
                </div>
                ${t.map(e=>r`
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
    `}};F([v()],P.prototype,"clawId",2);F([v()],P.prototype,"wsUrl",2);F([l()],P.prototype,"channels",2);F([l()],P.prototype,"loading",2);F([l()],P.prototype,"error",2);F([l()],P.prototype,"showModal",2);F([l()],P.prototype,"selectedType",2);F([l()],P.prototype,"form",2);F([l()],P.prototype,"saving",2);P=F([y("ccl-claw-channels")],P);var Js=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,gt=(t,e,s,a)=>{for(var i=a>1?void 0:a?Vs(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&Js(e,s,i),i};let it=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.lines=[],this.level="all",this.connState="connecting",this.autoScroll=!0,this.gw=null,this.logEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.autoScroll&&this.logEnd?.scrollIntoView()}connect(){this.connState="connecting",this.gw=new Ne({url:this.wsUrl,onEvent:t=>{if(t.type==="connected"){this.connState="connected",this.gw?.send({type:"logs.subscribe"});return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type!=="message")return;const e=t.data;e.type==="log"&&(this.lines=[...this.lines.slice(-2e3),{ts:e.ts??new Date().toISOString(),level:e.level??"info",msg:e.message??""}])}})}filtered(){return this.level==="all"?this.lines:this.lines.filter(t=>t.level===this.level)}levelClass(t){return{error:"log-line-error",warn:"log-line-warn",info:"log-line-info"}[t]??""}clear(){this.lines=[]}render(){const t=this.filtered();return r`
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
          ${t.length===0?r`<div style="color:var(--muted);font-size:12px">Waiting for log output…</div>`:t.map(e=>r`
              <div class="log-line ${this.levelClass(e.level)}">
                <span style="opacity:0.5;margin-right:8px">${e.ts.slice(11,19)}</span>
                <span style="min-width:40px;display:inline-block;margin-right:8px;text-transform:uppercase;font-size:10px;opacity:0.7">${e.level}</span>
                ${e.msg}
              </div>
            `)}
          <div style="height:1px" .ref=${e=>{this.logEnd=e}}></div>
        </div>
      </div>
    `}};gt([v()],it.prototype,"clawId",2);gt([v()],it.prototype,"wsUrl",2);gt([l()],it.prototype,"lines",2);gt([l()],it.prototype,"level",2);gt([l()],it.prototype,"connState",2);gt([l()],it.prototype,"autoScroll",2);it=gt([y("ccl-claw-logs")],it);var Gs=Object.getOwnPropertyDescriptor,Ys=(t,e,s,a)=>{for(var i=a>1?void 0:a?Gs(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=o(i)||i);return i};let qt=class extends g{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.saving=!1,this.error="",this.associated=[],this.allProjects=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="";try{const[t,e]=await Promise.all([A.projects(this.clawId),lt.list()]);this.associated=t,this.allProjects=e}catch(t){this.error=t.message??"Failed to load project associations"}finally{this.loading=!1}}}async associate(t){this.saving=!0;try{await A.associateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to associate project"}finally{this.saving=!1}}async unassociate(t){this.saving=!0;try{await A.unassociateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to remove project association"}finally{this.saving=!1}}render(){const t=new Set(this.associated.map(s=>s.id)),e=this.allProjects.filter(s=>!t.has(s.id));return r`
      <div style="padding:16px;display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Associated Projects</div>
          <button class="btn btn-secondary btn-sm" @click=${()=>{this.load()}} ?disabled=${this.loading||this.saving}>Refresh</button>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?r`<div class="empty-state">Loading…</div>`:""}

        ${!this.loading&&this.associated.length===0?r`<div class="empty-state"><div class="empty-state-title">No projects linked</div><div class="empty-state-sub">Associate a project to route workspace context for this claw.</div></div>`:r`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Name</th><th>Key</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    ${this.associated.map(s=>r`
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
          ${e.length===0?r`<div style="font-size:13px;color:var(--muted)">All tenant projects are already associated.</div>`:r`
                <div style="display:grid;gap:8px;">
                  ${e.map(s=>r`
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
    `}};qt.properties={clawId:{type:String},loading:{state:!0},saving:{state:!0},error:{state:!0},associated:{state:!0},allProjects:{state:!0}};qt=Ys([y("ccl-claw-projects")],qt);var Zs=Object.getOwnPropertyDescriptor,Xs=(t,e,s,a)=>{for(var i=a>1?void 0:a?Zs(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=o(i)||i);return i};let Jt=class extends g{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.error="",this.directories=[],this.selectedDirectoryId="",this.files=[],this.filesLoading=!1,this.selectedFilePath="",this.selectedFileContent="",this.fileLoading=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="",this.selectedDirectoryId="",this.files=[],this.selectedFilePath="",this.selectedFileContent="";try{this.directories=await A.directories(this.clawId),this.directories.length>0&&(this.selectedDirectoryId=this.directories[0].id,await this.loadFiles(this.selectedDirectoryId))}catch(t){this.error=t.message??"Failed to load workspace sync metadata"}finally{this.loading=!1}}}async loadFiles(t){if(t){this.filesLoading=!0,this.selectedFilePath="",this.selectedFileContent="";try{this.files=await A.directoryFiles(this.clawId,t)}catch(e){this.error=e.message??"Failed to load files",this.files=[]}finally{this.filesLoading=!1}}}async selectFile(t){if(!(!this.selectedDirectoryId||!t)){this.selectedFilePath=t,this.fileLoading=!0;try{const e=await A.directoryFileContent(this.clawId,this.selectedDirectoryId,t);this.selectedFileContent=e.content??""}catch(e){this.error=e.message??"Failed to load file content",this.selectedFileContent=""}finally{this.fileLoading=!1}}}badgeClass(t){return t==="synced"?"badge badge-green":t==="error"?"badge badge-red":"badge badge-yellow"}render(){const t=this.directories.find(e=>e.id===this.selectedDirectoryId)??null;return r`
      <div style="padding:16px;display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">.coderClaw Sync</div>
          <button class="btn btn-secondary btn-sm" @click=${()=>{this.load()}} ?disabled=${this.loading||this.filesLoading||this.fileLoading}>Refresh</button>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

        ${this.loading?r`<div class="empty-state">Loading…</div>`:this.directories.length===0?r`<div class="empty-state"><div class="empty-state-title">No synced directories</div><div class="empty-state-sub">Gateway startup sync has not published a .coderClaw path for this claw yet.</div></div>`:r`
                <div class="card">
                  <div class="card-title" style="margin-bottom:10px">Directory Manifest</div>
                  <div style="display:grid;gap:8px;">
                    ${this.directories.map(e=>r`
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

                ${t?r`
                      <div style="display:grid;grid-template-columns:minmax(220px, 320px) 1fr;gap:12px;min-height:320px;">
                        <div class="card" style="overflow:auto;">
                          <div class="card-title" style="margin-bottom:8px">Files</div>
                          ${this.filesLoading?r`<div style="font-size:12px;color:var(--muted)">Loading files…</div>`:this.files.length===0?r`<div style="font-size:12px;color:var(--muted)">No files synced yet.</div>`:r`
                                  <div style="display:grid;gap:6px;">
                                    ${this.files.map(e=>r`
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
                          ${this.fileLoading?r`<div style="font-size:12px;color:var(--muted)">Loading content…</div>`:this.selectedFilePath?r`<pre class="log-wrap" style="font-size:12px;max-height:520px;overflow:auto;white-space:pre-wrap;">${this.selectedFileContent}</pre>`:r`<div style="font-size:12px;color:var(--muted)">Select a synced file to preview content.</div>`}
                        </div>
                      </div>
                    `:""}
              `}
      </div>
    `}};Jt.properties={clawId:{type:String},loading:{state:!0},error:{state:!0},directories:{state:!0},selectedDirectoryId:{state:!0},files:{state:!0},filesLoading:{state:!0},selectedFilePath:{state:!0},selectedFileContent:{state:!0},fileLoading:{state:!0}};Jt=Xs([y("ccl-claw-workspace")],Jt);var Qs=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,C=(t,e,s,a)=>{for(var i=a>1?void 0:a?ti(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&Qs(e,s,i),i};const ei=[{id:"chat",label:"Chat"},{id:"agents",label:"Agents"},{id:"config",label:"Config"},{id:"sessions",label:"Sessions"},{id:"skills",label:"Skills"},{id:"usage",label:"Usage"},{id:"cron",label:"Cron"},{id:"nodes",label:"Nodes"},{id:"channels",label:"Channels"},{id:"projects",label:"Projects"},{id:"workspace",label:"Workspace"},{id:"logs",label:"Logs"}];let k=class extends g{constructor(){super(...arguments),this.tenantId="",this.clawList=[],this.loading=!1,this.error="",this.showRegisterModal=!1,this.registerName="",this.registering=!1,this.registerError="",this.newClaw=null,this.apiKeyCopied=!1,this.panelOpen=!1,this.activeClaw=null,this.activeTab="chat",this.deleteConfirmId=null,this.deleting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadClaws()}async loadClaws(){this.loading=!0,this.error="";try{this.clawList=await A.list()}catch(t){this.error=t.message??"Failed to load claws"}finally{this.loading=!1}}openPanel(t){this.activeClaw=t,this.activeTab="chat",this.panelOpen=!0,document.body.style.overflow="hidden"}closePanel(){this.panelOpen=!1,document.body.style.overflow="",setTimeout(()=>{this.activeClaw=null},300)}async handleRegister(){if(this.registerName.trim()){this.registering=!0,this.registerError="";try{const t=await A.register(this.registerName.trim());this.newClaw=t,this.clawList=[...this.clawList,t],this.registerName=""}catch(t){this.registerError=t.message??"Registration failed"}finally{this.registering=!1}}}closeRegisterModal(){this.showRegisterModal=!1,this.newClaw=null,this.registerName="",this.registerError="",this.apiKeyCopied=!1}async copyApiKey(){if(this.newClaw)try{await navigator.clipboard.writeText(this.newClaw.apiKey),this.apiKeyCopied=!0,setTimeout(()=>{this.apiKeyCopied=!1},2e3)}catch{}}async handleDelete(t){this.deleting=!0;try{await A.remove(t),this.clawList=this.clawList.filter(e=>e.id!==t),this.deleteConfirmId=null,this.activeClaw?.id===t&&this.closePanel()}catch(e){this.error=e.message??"Delete failed"}finally{this.deleting=!1}}statusBadge(t){return t.status==="active"?r`<span class="badge badge-green">active</span>`:t.status==="suspended"?r`<span class="badge badge-red">suspended</span>`:r`<span class="badge badge-gray">${t.status}</span>`}connectedDot(t){const e=t.status==="active"&&t.connectedAt?"dot dot-green":"dot dot-gray";return r`<span class="${e}" title="${t.connectedAt?"connected":"offline"}"></span>`}renderRegisterModal(){return this.showRegisterModal?r`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&this.closeRegisterModal()}}>
        <div class="modal">
          <div class="modal-title">Register new claw</div>
          ${this.newClaw?r`
            <div class="modal-sub">Claw registered. Save this API key &mdash; it will not be shown again.</div>
            <div style="margin:1rem 0;background:var(--bg-2,#f4f4f5);border-radius:6px;padding:0.75rem 1rem;font-family:monospace;font-size:0.875rem;word-break:break-all;">${this.newClaw.apiKey}</div>
            <button class="btn btn-secondary btn-sm" @click=${this.copyApiKey}>
              ${this.apiKeyCopied?"Copied!":"Copy API key"}
            </button>
            <div class="modal-footer">
              <button class="btn btn-primary" @click=${this.closeRegisterModal}>Done</button>
            </div>
          `:r`
            <div class="field">
              <label class="label">Claw name</label>
              <input class="input" placeholder="my-claw"
                .value=${this.registerName}
                @input=${t=>{this.registerName=t.target.value}}
                @keydown=${t=>{t.key==="Enter"&&this.handleRegister()}}
              />
            </div>
            ${this.registerError?r`<div class="error-banner">${this.registerError}</div>`:""}
            <div class="modal-footer">
              <button class="btn btn-ghost" @click=${this.closeRegisterModal}>Cancel</button>
              <button class="btn btn-primary" ?disabled=${this.registering||!this.registerName.trim()}
                @click=${this.handleRegister}>${this.registering?"Registering…":"Register"}</button>
            </div>
          `}
        </div>
      </div>
    `:r``}renderDeleteConfirm(t){return this.deleteConfirmId!==t.id?r``:r`
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
    `}renderPanel(){if(!this.activeClaw)return r``;const t=this.activeClaw,e=A.wsUrl(t.id);return r`
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
          ${ei.map(s=>r`
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
          ${this.activeTab==="chat"?r`<ccl-claw-chat     .clawId=${t.id} .wsUrl=${e}></ccl-claw-chat>`:""}
          ${this.activeTab==="agents"?r`<ccl-claw-agents   .clawId=${t.id} .wsUrl=${e}></ccl-claw-agents>`:""}
          ${this.activeTab==="config"?r`<ccl-claw-config   .clawId=${t.id} .wsUrl=${e}></ccl-claw-config>`:""}
          ${this.activeTab==="sessions"?r`<ccl-claw-sessions .clawId=${t.id} .wsUrl=${e}></ccl-claw-sessions>`:""}
          ${this.activeTab==="skills"?r`<ccl-claw-skills   .clawId=${t.id} .wsUrl=${e}></ccl-claw-skills>`:""}
          ${this.activeTab==="usage"?r`<ccl-claw-usage    .clawId=${t.id} .wsUrl=${e}></ccl-claw-usage>`:""}
          ${this.activeTab==="cron"?r`<ccl-claw-cron     .clawId=${t.id} .wsUrl=${e}></ccl-claw-cron>`:""}
          ${this.activeTab==="nodes"?r`<ccl-claw-nodes    .clawId=${t.id} .wsUrl=${e}></ccl-claw-nodes>`:""}
          ${this.activeTab==="channels"?r`<ccl-claw-channels .clawId=${t.id} .wsUrl=${e}></ccl-claw-channels>`:""}
          ${this.activeTab==="projects"?r`<ccl-claw-projects .clawId=${t.id}></ccl-claw-projects>`:""}
          ${this.activeTab==="workspace"?r`<ccl-claw-workspace .clawId=${t.id}></ccl-claw-workspace>`:""}
          ${this.activeTab==="logs"?r`<ccl-claw-logs     .clawId=${t.id} .wsUrl=${e}></ccl-claw-logs>`:""}
        </div>
      </div>
    `}render(){return r`
      <div>
        <div class="page-header">
          <div><div class="page-title">Claws</div><div class="page-sub">${this.clawList.length} registered</div></div>
          <button class="btn btn-primary" @click=${()=>{this.showRegisterModal=!0}}>Register claw</button>
        </div>
        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?r`<div class="empty-state">Loading…</div>`:""}
        ${!this.loading&&this.clawList.length===0?r`
          <div class="empty-state">No claws registered yet. Register your first claw to get started.</div>
        `:""}
        ${!this.loading&&this.clawList.length>0?r`
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th></th><th>Name</th><th>Slug</th><th>Status</th><th>Last seen</th><th></th></tr></thead>
              <tbody>
                ${this.clawList.map(t=>r`
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
    `}};C([v()],k.prototype,"tenantId",2);C([l()],k.prototype,"clawList",2);C([l()],k.prototype,"loading",2);C([l()],k.prototype,"error",2);C([l()],k.prototype,"showRegisterModal",2);C([l()],k.prototype,"registerName",2);C([l()],k.prototype,"registering",2);C([l()],k.prototype,"registerError",2);C([l()],k.prototype,"newClaw",2);C([l()],k.prototype,"apiKeyCopied",2);C([l()],k.prototype,"panelOpen",2);C([l()],k.prototype,"activeClaw",2);C([l()],k.prototype,"activeTab",2);C([l()],k.prototype,"deleteConfirmId",2);C([l()],k.prototype,"deleting",2);k=C([y("ccl-claws")],k);var si=Object.defineProperty,ii=Object.getOwnPropertyDescriptor,at=(t,e,s,a)=>{for(var i=a>1?void 0:a?ii(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&si(e,s,i),i};let W=class extends g{constructor(){super(...arguments),this.tenantId="",this.available=[],this.assigned=[],this.loading=!0,this.error="",this.search="",this.tab="assigned"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([ae.list().catch(()=>[]),ft.listTenant().catch(()=>[])]);this.available=t,this.assigned=e}catch(t){this.error=t.message}finally{this.loading=!1}}async assign(t){try{await ft.assignTenant(t),this.assigned=await ft.listTenant()}catch(e){this.error=e.message}}async unassign(t){try{await ft.unassignTenant(t),this.assigned=this.assigned.filter(e=>e.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}filteredAvailable(){const t=this.search.toLowerCase();return this.available.filter(e=>!t||e.name.toLowerCase().includes(t)||(e.description??"").toLowerCase().includes(t))}render(){const t=this.assignedSlugs();return r`
      <div class="page-header">
        <div>
          <div class="page-title">Skills</div>
          <div class="page-sub">Extend your claws with marketplace skills</div>
        </div>
      </div>

      ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab==="assigned"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="assigned"}}>
          Assigned (${this.assigned.length})
        </button>
        <button class="btn ${this.tab==="marketplace"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="marketplace"}}>
          Marketplace (${this.available.length})
        </button>
      </div>

      ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.tab==="assigned"?this.renderAssigned():this.renderMarketplace(t)}
    `}renderAssigned(){return this.assigned.length===0?r`<div class="empty-state"><div class="empty-state-icon">✨</div><div class="empty-state-title">No skills assigned</div><div class="empty-state-sub">Browse the marketplace to add skills to your workspace</div><button class="btn btn-primary" style="margin-top:16px" @click=${()=>{this.tab="marketplace"}}>Browse marketplace</button></div>`:r`
      <div class="grid grid-3">
        ${this.assigned.map(t=>r`
          <div class="card">
            <div class="card-header">
              <div class="card-title">${t.name}</div>
              <button class="btn btn-danger btn-sm" @click=${()=>this.unassign(t.slug)}>Remove</button>
            </div>
            <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${t.slug}</div>
          </div>
        `)}
      </div>
    `}renderMarketplace(t){const e=this.filteredAvailable();return r`
      <div>
        <input class="input" style="max-width:300px;margin-bottom:16px" placeholder="Search skills…"
          .value=${this.search} @input=${s=>{this.search=s.target.value}}>

        ${e.length===0?r`<div class="empty-state"><div class="empty-state-title">No skills found</div></div>`:r`
            <div class="grid grid-3">
              ${e.map(s=>r`
                <div class="card">
                  <div class="card-header">
                    <div style="display:flex;align-items:center;gap:10px">
                      ${s.icon?r`<img src="${s.icon}" style="width:32px;height:32px;border-radius:6px">`:r`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
                      <div>
                        <div class="card-title">${s.name}</div>
                        ${s.category?r`<span class="badge badge-gray" style="font-size:10px">${s.category}</span>`:""}
                      </div>
                    </div>
                  </div>
                  ${s.description?r`<div style="font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:12px">${s.description}</div>`:""}
                  ${t.has(s.slug)?r`<button class="btn btn-danger btn-sm" @click=${()=>this.unassign(s.slug)}>Remove</button>`:r`<button class="btn btn-primary btn-sm" @click=${()=>this.assign(s.slug)}>Add to workspace</button>`}
                </div>
              `)}
            </div>`}
      </div>
    `}};at([v()],W.prototype,"tenantId",2);at([l()],W.prototype,"available",2);at([l()],W.prototype,"assigned",2);at([l()],W.prototype,"loading",2);at([l()],W.prototype,"error",2);at([l()],W.prototype,"search",2);at([l()],W.prototype,"tab",2);W=at([y("ccl-skills")],W);var ai=Object.defineProperty,ri=Object.getOwnPropertyDescriptor,H=(t,e,s,a)=>{for(var i=a>1?void 0:a?ri(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&ai(e,s,i),i};const ni=["owner","manager","developer","viewer"];let I=class extends g{constructor(){super(...arguments),this.tenant=null,this.detail=null,this.loading=!0,this.error="",this.tab="members",this.showInvite=!1,this.inviteEmail="",this.inviteRole="developer",this.inviting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("tenant")&&this.tenant&&this.load()}async load(){if(this.tenant){this.loading=!0;try{this.detail=await Tt.get(this.tenant.id)}catch(t){this.error=t.message}finally{this.loading=!1}}}async invite(t){if(t.preventDefault(),!(!this.tenant||!this.inviteEmail)){this.inviting=!0;try{await Tt.inviteMember(this.tenant.id,this.inviteEmail,this.inviteRole),await this.load(),this.showInvite=!1,this.inviteEmail=""}catch(e){this.error=e.message}finally{this.inviting=!1}}}async removeMember(t){if(!(!this.tenant||!confirm("Remove this member?")))try{await Tt.removeMember(this.tenant.id,t),await this.load()}catch(e){this.error=e.message}}roleBadge(t){return r`<span class="badge ${{owner:"badge-red",manager:"badge-yellow",developer:"badge-blue",viewer:"badge-gray"}[t]??"badge-gray"}">${t}</span>`}render(){return r`
      <div class="page-header">
        <div>
          <div class="page-title">${this.tenant?.name??"Workspace"}</div>
          <div class="page-sub">Manage members and settings</div>
        </div>
      </div>

      ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

      <div style="display:flex;gap:4px;margin-bottom:20px">
        <button class="btn ${this.tab==="members"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="members"}}>Members</button>
        <button class="btn ${this.tab==="settings"?"btn-primary":"btn-secondary"}" @click=${()=>{this.tab="settings"}}>Settings</button>
      </div>

      ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.tab==="members"?this.renderMembers():this.renderSettings()}
    `}renderMembers(){const t=this.detail?.members??[];return r`
      <div>
        <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
          <button class="btn btn-primary" @click=${()=>{this.showInvite=!0}}>Invite member</button>
        </div>

        ${t.length===0?r`<div class="empty-state"><div class="empty-state-title">No members yet</div></div>`:r`
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>Email</th><th>Role</th><th>Joined</th><th></th></tr></thead>
                <tbody>
                  ${t.map(e=>r`
                    <tr>
                      <td style="font-weight:500">${e.email}</td>
                      <td>${this.roleBadge(e.role)}</td>
                      <td style="font-size:12px;color:var(--muted)">${new Date(e.joinedAt).toLocaleDateString()}</td>
                      <td>
                        ${e.role!=="owner"?r`<button class="btn btn-danger btn-sm" @click=${()=>this.removeMember(e.userId)}>Remove</button>`:""}
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>`}

        ${this.showInvite?r`
          <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&(this.showInvite=!1)}}>
            <div class="modal">
              <div class="modal-title">Invite member</div>
              <form @submit=${this.invite} style="display:grid;gap:14px;margin-top:16px">
                <div class="field"><label class="label">Email</label>
                  <input class="input" type="email" required .value=${this.inviteEmail}
                    @input=${e=>{this.inviteEmail=e.target.value}}></div>
                <div class="field"><label class="label">Role</label>
                  <select class="select" @change=${e=>{this.inviteRole=e.target.value}}>
                    ${ni.filter(e=>e!=="owner").map(e=>r`<option value=${e}>${e}</option>`)}
                  </select></div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${()=>this.showInvite=!1}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.inviting}>${this.inviting?"Inviting…":"Send invite"}</button>
                </div>
              </form>
            </div>
          </div>`:""}
      </div>
    `}renderSettings(){return r`
      <div class="card" style="max-width:480px">
        <div class="card-title" style="margin-bottom:16px">Workspace details</div>
        <div style="display:grid;gap:10px">
          ${[["Name",this.tenant?.name??"—"],["Slug",this.tenant?.slug??"—"],["Status",this.tenant?.status??"—"],["Your role",this.tenant?.role??"—"]].map(([t,e])=>r`
            <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
              <span style="color:var(--muted)">${t}</span>
              <span style="color:var(--text-strong);font-weight:500">${e}</span>
            </div>`)}
        </div>
      </div>
    `}};H([v({type:Object})],I.prototype,"tenant",2);H([l()],I.prototype,"detail",2);H([l()],I.prototype,"loading",2);H([l()],I.prototype,"error",2);H([l()],I.prototype,"tab",2);H([l()],I.prototype,"showInvite",2);H([l()],I.prototype,"inviteEmail",2);H([l()],I.prototype,"inviteRole",2);H([l()],I.prototype,"inviting",2);I=H([y("ccl-workspace")],I);var oi=Object.defineProperty,li=Object.getOwnPropertyDescriptor,Y=(t,e,s,a)=>{for(var i=a>1?void 0:a?li(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&oi(e,s,i),i};let U=class extends g{constructor(){super(...arguments),this.tenantId="",this.items=[],this.tasks=[],this.loading=!0,this.error="",this.filterTask="",this.filterStatus="",this.expanded=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.tasks]=await Promise.all([re.list(),O.list().catch(()=>[])])}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){return this.items.filter(t=>!(this.filterTask&&t.taskId!==this.filterTask||this.filterStatus&&t.status!==this.filterStatus))}taskTitle(t){return this.tasks.find(e=>e.id===t)?.title??t}statusColor(t){return{completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"}[t]??"badge-gray"}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered();return r`
      <div class="page-header">
        <div>
          <div class="page-title">Execution Logs</div>
          <div class="page-sub">${t.length} execution${t.length!==1?"s":""}</div>
        </div>
        <button class="btn btn-secondary" @click=${this.load}>Refresh</button>
      </div>

      ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

      <div class="filters" style="margin-bottom:16px">
        <select class="select" style="max-width:220px;height:32px;padding:4px 10px"
          @change=${e=>{this.filterTask=e.target.value}}>
          <option value="">All tasks</option>
          ${this.tasks.map(e=>r`<option value=${e.id}>${e.title}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${e=>{this.filterStatus=e.target.value}}>
          <option value="">All statuses</option>
          ${["pending","running","completed","failed","cancelled"].map(e=>r`<option value=${e}>${e}</option>`)}
        </select>
      </div>

      ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:t.length===0?r`<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">No executions found</div></div>`:r`
            <div style="display:grid;gap:8px">
              ${t.slice().reverse().map(e=>r`
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
                  ${this.expanded===e.id&&e.result?r`
                    <div class="log-wrap" style="margin-top:12px;max-height:200px;overflow-y:auto;font-size:11px">
                      ${e.result}
                    </div>`:""}
                </div>
              `)}
            </div>`}
    `}};Y([v()],U.prototype,"tenantId",2);Y([l()],U.prototype,"items",2);Y([l()],U.prototype,"tasks",2);Y([l()],U.prototype,"loading",2);Y([l()],U.prototype,"error",2);Y([l()],U.prototype,"filterTask",2);Y([l()],U.prototype,"filterStatus",2);Y([l()],U.prototype,"expanded",2);U=Y([y("ccl-logs")],U);var di=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,_=(t,e,s,a)=>{for(var i=a>1?void 0:a?ci(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&di(e,s,i),i};let S=class extends g{constructor(){super(...arguments),this.tab="health",this.health=null,this.users=[],this.tenants=[],this.errors=[],this.llmUsage=null,this.usageDays=30,this.loading=!1,this.errorMsg="",this.impersonateUserId=null,this.impersonateTenants=[],this.expandedErrorId=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTab("health")}async loadTab(t){this.tab=t,this.loading=!0,this.errorMsg="";try{t==="health"?this.health=await Z.health():t==="users"?this.users=await Z.users():t==="tenants"?this.tenants=await Z.tenants():t==="errors"?this.errors=await Z.errors():t==="usage"&&(this.llmUsage=await Z.llmUsage(this.usageDays))}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}finally{this.loading=!1}}async startImpersonate(t){this.tenants.length||(this.tenants=await Z.tenants()),this.impersonateUserId=t,this.impersonateTenants=this.tenants}async doImpersonate(t){if(this.impersonateUserId)try{const e=await Z.impersonate(this.impersonateUserId,t);Ut(e.token),zt(String(t)),this.impersonateUserId=null,this.dispatchEvent(new CustomEvent("ccl:impersonate",{bubbles:!0,composed:!0,detail:{tenantId:t}}))}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}}fmtCooldown(t){const e=Math.max(0,Math.ceil((t-Date.now())/1e3));return e>=60?`${Math.ceil(e/60)}m`:`${e}s`}fmtDate(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}fmtDateTime(t){return new Date(t).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){return r`
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
          ${["health","usage","users","tenants","errors"].map(t=>r`
            <button
              class="admin-tab ${this.tab===t?"active":""}"
              @click=${()=>this.loadTab(t)}
            >${t.charAt(0).toUpperCase()+t.slice(1)}</button>
          `)}
        </nav>

        <!-- Error banner -->
        ${this.errorMsg?r`<div class="alert alert-error">${this.errorMsg}</div>`:""}

        <!-- Content -->
        <div class="admin-content">
          ${this.loading?r`<div class="loading-state">Loading…</div>`:this.renderTab()}
        </div>

        <!-- Impersonate modal -->
        ${this.impersonateUserId?this.renderImpersonateModal():""}
      </div>
    `}renderTab(){return this.tab==="health"?this.renderHealth():this.tab==="usage"?this.renderUsage():this.tab==="users"?this.renderUsers():this.tab==="tenants"?this.renderTenants():this.tab==="errors"?this.renderErrors():r``}renderHealth(){const t=this.health;return t?r`
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
          ${t.platform.errorCount>0?r`<div class="health-sub"><button class="btn btn-ghost btn-xs" @click=${()=>this.loadTab("errors")}>View errors →</button></div>`:""}
        </div>

        <!-- LLM pool -->
        <div class="health-card health-wide">
          <div class="health-label">LLM Model Pool (${t.llm.pool} models)</div>
          <div class="model-list">
            ${t.llm.models.map(e=>{const s=e.available?"background:var(--success-bg,#d1fae5);color:var(--success-text,#065f46);border-color:var(--success-border,#6ee7b7)":"background:var(--error-bg,#fee2e2);color:var(--error-text,#991b1b);border-color:var(--error-border,#fca5a5)",a=e.available?`${e.preferred?"★ ":""}${e.model}`:`${e.model} ⏳${this.fmtCooldown(e.cooldownUntil??0)}`,i=e.available?`${e.preferred?"Preferred (round-robin). ":"Fallback. "}Available`:`On cooldown — available in ${this.fmtCooldown(e.cooldownUntil??0)}`;return r`<span class="model-chip" style="${s}" title="${i}">${a}</span>`})}
          </div>
          <div style="margin-top:8px;font-size:11px;color:var(--text-muted,#6b7280)">
            ★ preferred (round-robin) · green = available · red = on cooldown
          </div>
        </div>
      </div>

      <div class="admin-refresh">
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("health")}>↻ Refresh</button>
      </div>
    `:r`<div class="loading-state">No data</div>`}fmtNum(t){return Number(t).toLocaleString()}renderUsage(){const t=this.llmUsage;return t?r`
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
            ${[7,14,30,60,90].map(e=>r`
              <option value="${e}" ?selected=${this.usageDays===e}>${e} days</option>
            `)}
          </select>
        </span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("usage")}>↻ Refresh</button>
      </div>

      ${t.byModel.length===0?r`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-title">No LLM usage recorded yet</div>
          <div class="empty-sub">Usage will appear here once requests flow through the proxy.</div>
        </div>
      `:r`
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
              ${t.byModel.map(e=>r`
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
        ${t.daily.length>0?r`
          <div style="margin-top:24px">
            <div class="table-header"><span class="table-count">Daily requests — last ${t.days} days</span></div>
            <div class="usage-bars">
              ${(()=>{const e=Math.max(...t.daily.map(s=>s.requests),1);return t.daily.map(s=>r`
                  <div class="usage-bar-col" title="${s.day}: ${this.fmtNum(s.requests)} requests, ${this.fmtNum(s.total_tokens)} tokens">
                    <div class="usage-bar" style="height:${Math.max(4,Math.round(s.requests/e*80))}px"></div>
                    <div class="usage-bar-label">${s.day.slice(5)}</div>
                  </div>
                `)})()}
            </div>
          </div>
        `:""}

        <!-- Failover breakdown -->
        ${t.failovers.length>0?r`
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
                  ${t.failovers.map(e=>r`
                    <tr>
                      <td><span class="model-chip" style="font-size:12px">${e.model}</span></td>
                      <td style="text-align:right">
                        ${e.errorCode===0?r`<span class="badge badge-neutral">body</span>`:r`<span class="badge badge-danger">${e.errorCode}</span>`}
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
        `:r`
          <div style="margin-top:24px;color:var(--text-muted,#6b7280);font-size:13px">
            No failover events in the last ${t.days} days.
          </div>
        `}
      `}
    `:r`<div class="loading-state">No data</div>`}renderUsers(){return r`
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
            ${this.users.map(t=>r`
              <tr>
                <td>${t.email}</td>
                <td class="text-muted">${t.username??"—"}</td>
                <td>${t.tenantCount}</td>
                <td class="text-muted">${this.fmtDate(t.createdAt)}</td>
                <td>
                  ${t.isSuperadmin?r`<span class="badge badge-danger">superadmin</span>`:r`<span class="badge badge-neutral">user</span>`}
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
    `}renderTenants(){return r`
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
              <th>Members</th>
              <th>Claws</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            ${this.tenants.map(t=>r`
              <tr>
                <td>${t.name}</td>
                <td class="text-muted">${t.slug}</td>
                <td>
                  <span class="badge ${t.status==="active"?"badge-success":"badge-neutral"}">
                    ${t.status}
                  </span>
                </td>
                <td>${t.memberCount}</td>
                <td>${t.clawCount}</td>
                <td class="text-muted">${this.fmtDate(t.createdAt)}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}renderErrors(){return this.errors.length?r`
      <div class="table-header">
        <span class="table-count">${this.errors.length} errors (last 200)</span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("errors")}>↻ Refresh</button>
      </div>
      <div class="error-log">
        ${this.errors.map(t=>r`
          <div class="error-entry" @click=${()=>this.expandedErrorId=this.expandedErrorId===t.id?null:t.id}>
            <div class="error-entry-header">
              <span class="error-method">${t.method??"?"}</span>
              <span class="error-path">${t.path??"?"}</span>
              <span class="error-msg">${t.message}</span>
              <span class="error-time text-muted">${this.fmtDateTime(t.createdAt)}</span>
              <span class="error-chevron">${this.expandedErrorId===t.id?"▲":"▼"}</span>
            </div>
            ${this.expandedErrorId===t.id&&t.stack?r`
              <pre class="error-stack">${t.stack}</pre>
            `:""}
          </div>
        `)}
      </div>
    `:r`
        <div class="empty-state">
          <div class="empty-icon">✓</div>
          <div class="empty-title">No errors logged</div>
          <div class="empty-sub">The API error log is clean.</div>
        </div>
      `}renderImpersonateModal(){const t=this.users.find(e=>e.id===this.impersonateUserId);return r`
      <div class="modal-backdrop" @click=${()=>this.impersonateUserId=null}>
        <div class="modal" @click=${e=>e.stopPropagation()}>
          <div class="modal-header">
            <h3>Impersonate ${t?.email??"user"}</h3>
            <button class="btn btn-ghost btn-icon" @click=${()=>this.impersonateUserId=null}>✕</button>
          </div>
          <div class="modal-body">
            <p class="modal-desc">Select a workspace to enter as this user. A temporary token will be issued.</p>
            ${this.impersonateTenants.length===0?r`<div class="text-muted">This user has no workspaces.</div>`:r`
                <div class="tenant-list">
                  ${this.impersonateTenants.map(e=>r`
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
    `}};_([l()],S.prototype,"tab",2);_([l()],S.prototype,"health",2);_([l()],S.prototype,"users",2);_([l()],S.prototype,"tenants",2);_([l()],S.prototype,"errors",2);_([l()],S.prototype,"llmUsage",2);_([l()],S.prototype,"usageDays",2);_([l()],S.prototype,"loading",2);_([l()],S.prototype,"errorMsg",2);_([l()],S.prototype,"impersonateUserId",2);_([l()],S.prototype,"impersonateTenants",2);_([l()],S.prototype,"expandedErrorId",2);S=_([y("ccl-admin")],S);var hi=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,rt=(t,e,s,a)=>{for(var i=a>1?void 0:a?pi(e,s):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(i=(a?o(e,s,i):o(i))||i);return a&&i&&hi(e,s,i),i};let z=class extends g{constructor(){super(...arguments),this.appState="loading",this.tab="tasks",this.user=null,this.tenantList=[],this.tenant=null,this.theme="dark",this.navCollapsed=!1,this.handleUnauthorized=()=>{Bt(),this.user=null,this.tenant=null,this.appState="landing"},this.handleExitAdmin=()=>{this.appState=this.tenant?"dashboard":"workspace-picker"},this.handleImpersonate=t=>{const e=String(t.detail.tenantId),s=this.tenantList.find(a=>String(a.id)===e);s?this.tenant=s:this.tenant={id:e,name:"Impersonated Workspace",slug:"",role:"viewer",status:"active"},this.appState="dashboard"}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTheme(),this.bootstrap(),window.addEventListener("ccl:unauthorized",this.handleUnauthorized),window.addEventListener("ccl:exit-admin",this.handleExitAdmin),window.addEventListener("ccl:impersonate",this.handleImpersonate)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ccl:unauthorized",this.handleUnauthorized),window.removeEventListener("ccl:exit-admin",this.handleExitAdmin),window.removeEventListener("ccl:impersonate",this.handleImpersonate)}updated(t){this.appState==="dashboard"&&(t.has("appState")||t.has("tab")||t.has("tenant"))&&this.mountDashboardView()}async bootstrap(){if(!Wt()){this.appState="landing";return}const e=B(),s=Ie();if(this.user=je(),e&&s)try{const a=await Q.listTenants();this.tenantList=a;const i=a.find(n=>n.id===s);if(i){this.tenant=i,this.appState="dashboard";return}}catch{}try{this.tenantList=await Q.listTenants(),this.appState="workspace-picker"}catch{this.appState="auth"}}async handleLogin(t){const{token:e,user:s}=t.detail;De(e),Oe(s),this.user=s;try{this.tenantList=await Q.listTenants(),this.appState="workspace-picker"}catch{this.appState="workspace-picker"}}async handleSelectTenant(t){const e=t.detail;try{const{token:s}=await Q.tenantToken(e.id);Ut(s),zt(e.id),this.tenant=e,this.appState="dashboard"}catch(s){console.error("Failed to get tenant token",s)}}async handleCreateTenant(t){try{const e=await Tt.create(t.detail.name),{token:s}=await Q.tenantToken(e.id);Ut(s),zt(e.id),this.tenant=e,this.appState="dashboard"}catch(e){console.error("Failed to create tenant",e)}}handleSignOut(){Bt(),this.user=null,this.tenant=null,this.tenantList=[],this.appState="landing"}handleSwitchWorkspace(){this.appState="workspace-picker"}setTab(t){this.tab!==t&&(this.tab=t)}mountDashboardView(){const t=this.querySelector("#dashboard-view-host");if(!(t instanceof HTMLElement))return;const e=this.tenant?.id??"";let s;switch(this.tab){case"tasks":{const a=document.createElement("ccl-tasks");a.tenantId=e,s=a;break}case"projects":{const a=document.createElement("ccl-projects");a.tenantId=e,s=a;break}case"claws":{const a=document.createElement("ccl-claws");a.tenantId=e,s=a;break}case"skills":{const a=document.createElement("ccl-skills");a.tenantId=e,s=a;break}case"workspace":{const a=document.createElement("ccl-workspace");a.tenant=this.tenant,s=a;break}case"logs":{const a=document.createElement("ccl-logs");a.tenantId=e,s=a;break}}t.replaceChildren(s)}loadTheme(){const t=localStorage.getItem("ccl-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;this.theme=t??(e?"dark":"light"),document.documentElement.dataset.theme=this.theme}toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",document.documentElement.dataset.theme=this.theme,localStorage.setItem("ccl-theme",this.theme),this.requestUpdate()}svgIcon(t){return`<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">${{projects:'<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>',tasks:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',claws:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',skills:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',workspace:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',logs:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',admin:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'}[t]??""}</svg>`}render(){return this.appState==="loading"?this.renderLoading():this.appState==="landing"?this.renderLanding():this.appState==="auth"?this.renderAuth():this.appState==="workspace-picker"?this.renderWorkspacePicker():this.appState==="admin"?this.renderAdmin():this.renderDashboard()}renderLoading(){return r`
      <div class="auth-shell">
        <div style="text-align:center;color:var(--muted);font-size:14px">Loading…</div>
      </div>`}renderLanding(){return r`
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
    `}renderAuth(){return r`
      <ccl-auth
        @login=${this.handleLogin}
        @register=${this.handleLogin}
      ></ccl-auth>`}renderWorkspacePicker(){return r`
      <div>
        ${this.user?.isSuperadmin?r`
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
      </div>`}renderAdmin(){return r`<ccl-admin></ccl-admin>`}renderDashboard(){const t=[{id:"tasks",label:"Tasks",icon:"tasks"},{id:"projects",label:"Projects",icon:"projects"},{id:"claws",label:"Claws",icon:"claws"},{id:"skills",label:"Skills",icon:"skills"},{id:"workspace",label:"Workspace",icon:"workspace"},{id:"logs",label:"Logs",icon:"logs"}];return r`
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
            ${this.user?.isSuperadmin?r`
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
            ${t.map(e=>r`
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
    `}};z.styles=Ue``;rt([l()],z.prototype,"appState",2);rt([l()],z.prototype,"tab",2);rt([l()],z.prototype,"user",2);rt([l()],z.prototype,"tenantList",2);rt([l()],z.prototype,"tenant",2);rt([l()],z.prototype,"theme",2);rt([l()],z.prototype,"navCollapsed",2);z=rt([y("ccl-app")],z);
//# sourceMappingURL=index-BDOCDHWj.js.map
