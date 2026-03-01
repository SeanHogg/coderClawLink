(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();const os=globalThis,si=os.ShadowRoot&&(os.ShadyCSS===void 0||os.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ii=Symbol(),Vi=new WeakMap;let Aa=class{constructor(e,s,a){if(this._$cssResult$=!0,a!==ii)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(si&&e===void 0){const a=s!==void 0&&s.length===1;a&&(e=Vi.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&Vi.set(s,e))}return e}toString(){return this.cssText}};const wn=t=>new Aa(typeof t=="string"?t:t+"",void 0,ii),$n=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((a,i,n)=>a+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new Aa(s,t,ii)},kn=(t,e)=>{if(si)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const a=document.createElement("style"),i=os.litNonce;i!==void 0&&a.setAttribute("nonce",i),a.textContent=s.cssText,t.appendChild(a)}},Yi=si?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const a of e.cssRules)s+=a.cssText;return wn(s)})(t):t;const{is:xn,defineProperty:Tn,getOwnPropertyDescriptor:Cn,getOwnPropertyNames:Sn,getOwnPropertySymbols:_n,getPrototypeOf:An}=Object,bs=globalThis,Ji=bs.trustedTypes,En=Ji?Ji.emptyScript:"",Pn=bs.reactiveElementPolyfillSupport,Ue=(t,e)=>t,cs={toAttribute(t,e){switch(e){case Boolean:t=t?En:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},ai=(t,e)=>!xn(t,e),Xi={attribute:!0,type:String,converter:cs,reflect:!1,useDefault:!1,hasChanged:ai};Symbol.metadata??=Symbol("metadata"),bs.litPropertyMetadata??=new WeakMap;let ke=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=Xi){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,s);i!==void 0&&Tn(this.prototype,e,i)}}static getPropertyDescriptor(e,s,a){const{get:i,set:n}=Cn(this.prototype,e)??{get(){return this[s]},set(r){this[s]=r}};return{get:i,set(r){const p=i?.call(this);n?.call(this,r),this.requestUpdate(e,p,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Xi}static _$Ei(){if(this.hasOwnProperty(Ue("elementProperties")))return;const e=An(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ue("properties"))){const s=this.properties,a=[...Sn(s),..._n(s)];for(const i of a)this.createProperty(i,s[i])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[a,i]of s)this.elementProperties.set(a,i)}this._$Eh=new Map;for(const[s,a]of this.elementProperties){const i=this._$Eu(s,a);i!==void 0&&this._$Eh.set(i,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const i of a)s.unshift(Yi(i))}else e!==void 0&&s.push(Yi(e));return s}static _$Eu(e,s){const a=s.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const a of s.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return kn(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,a){this._$AK(e,a)}_$ET(e,s){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(i!==void 0&&a.reflect===!0){const n=(a.converter?.toAttribute!==void 0?a.converter:cs).toAttribute(s,a.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,s){const a=this.constructor,i=a._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const n=a.getPropertyOptions(i),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:cs;this._$Em=i;const p=r.fromAttribute(s,n.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(e,s,a,i=!1,n){if(e!==void 0){const r=this.constructor;if(i===!1&&(n=this[e]),a??=r.getPropertyOptions(e),!((a.hasChanged??ai)(n,s)||a.useDefault&&a.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,a))))return;this.C(e,s,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:a,reflect:i,wrapped:n},r){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??s??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(s=void 0),this._$AL.set(e,s)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[i,n]of a){const{wrapped:r}=n,p=this[i];r!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,n,p)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(s)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(e){}firstUpdated(e){}};ke.elementStyles=[],ke.shadowRootOptions={mode:"open"},ke[Ue("elementProperties")]=new Map,ke[Ue("finalized")]=new Map,Pn?.({ReactiveElement:ke}),(bs.reactiveElementVersions??=[]).push("2.1.2");const ni=globalThis,Zi=t=>t,ds=ni.trustedTypes,Qi=ds?ds.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ea="$lit$",Wt=`lit$${Math.random().toFixed(9).slice(2)}$`,Pa="?"+Wt,In=`<${Pa}>`,se=document,Be=()=>se.createComment(""),Fe=t=>t===null||typeof t!="object"&&typeof t!="function",ri=Array.isArray,Dn=t=>ri(t)||typeof t?.[Symbol.iterator]=="function",zs=`[ 	
\f\r]`,Pe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ta=/-->/g,ea=/>/g,Qt=RegExp(`>|${zs}(?:([^\\s"'>=/]+)(${zs}*=${zs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),sa=/'/g,ia=/"/g,Ia=/^(?:script|style|textarea|title)$/i,Ln=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),o=Ln(1),ie=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),aa=new WeakMap,ee=se.createTreeWalker(se,129);function Da(t,e){if(!ri(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qi!==void 0?Qi.createHTML(e):e}const Rn=(t,e)=>{const s=t.length-1,a=[];let i,n=e===2?"<svg>":e===3?"<math>":"",r=Pe;for(let p=0;p<s;p++){const d=t[p];let m,h,u=-1,f=0;for(;f<d.length&&(r.lastIndex=f,h=r.exec(d),h!==null);)f=r.lastIndex,r===Pe?h[1]==="!--"?r=ta:h[1]!==void 0?r=ea:h[2]!==void 0?(Ia.test(h[2])&&(i=RegExp("</"+h[2],"g")),r=Qt):h[3]!==void 0&&(r=Qt):r===Qt?h[0]===">"?(r=i??Pe,u=-1):h[1]===void 0?u=-2:(u=r.lastIndex-h[2].length,m=h[1],r=h[3]===void 0?Qt:h[3]==='"'?ia:sa):r===ia||r===sa?r=Qt:r===ta||r===ea?r=Pe:(r=Qt,i=void 0);const w=r===Qt&&t[p+1].startsWith("/>")?" ":"";n+=r===Pe?d+In:u>=0?(a.push(m),d.slice(0,u)+Ea+d.slice(u)+Wt+w):d+Wt+(u===-2?p:w)}return[Da(t,n+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class We{constructor({strings:e,_$litType$:s},a){let i;this.parts=[];let n=0,r=0;const p=e.length-1,d=this.parts,[m,h]=Rn(e,s);if(this.el=We.createElement(m,a),ee.currentNode=this.el.content,s===2||s===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=ee.nextNode())!==null&&d.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Ea)){const f=h[r++],w=i.getAttribute(u).split(Wt),$=/([.?@])?(.*)/.exec(f);d.push({type:1,index:n,name:$[2],strings:w,ctor:$[1]==="."?Mn:$[1]==="?"?Nn:$[1]==="@"?jn:ys}),i.removeAttribute(u)}else u.startsWith(Wt)&&(d.push({type:6,index:n}),i.removeAttribute(u));if(Ia.test(i.tagName)){const u=i.textContent.split(Wt),f=u.length-1;if(f>0){i.textContent=ds?ds.emptyScript:"";for(let w=0;w<f;w++)i.append(u[w],Be()),ee.nextNode(),d.push({type:2,index:++n});i.append(u[f],Be())}}}else if(i.nodeType===8)if(i.data===Pa)d.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(Wt,u+1))!==-1;)d.push({type:7,index:n}),u+=Wt.length-1}n++}}static createElement(e,s){const a=se.createElement("template");return a.innerHTML=e,a}}function Te(t,e,s=t,a){if(e===ie)return e;let i=a!==void 0?s._$Co?.[a]:s._$Cl;const n=Fe(e)?void 0:e._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(t),i._$AT(t,s,a)),a!==void 0?(s._$Co??=[])[a]=i:s._$Cl=i),i!==void 0&&(e=Te(t,i._$AS(t,e.values),i,a)),e}class On{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:a}=this._$AD,i=(e?.creationScope??se).importNode(s,!0);ee.currentNode=i;let n=ee.nextNode(),r=0,p=0,d=a[0];for(;d!==void 0;){if(r===d.index){let m;d.type===2?m=new oi(n,n.nextSibling,this,e):d.type===1?m=new d.ctor(n,d.name,d.strings,this,e):d.type===6&&(m=new zn(n,this,e)),this._$AV.push(m),d=a[++p]}r!==d?.index&&(n=ee.nextNode(),r++)}return ee.currentNode=se,i}p(e){let s=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,s),s+=a.strings.length-2):a._$AI(e[s])),s++}}let oi=class La{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,a,i){this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=Te(this,e,s),Fe(e)?e===z||e==null||e===""?(this._$AH!==z&&this._$AR(),this._$AH=z):e!==this._$AH&&e!==ie&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Dn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==z&&Fe(this._$AH)?this._$AA.nextSibling.data=e:this.T(se.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:a}=e,i=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=We.createElement(Da(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(s);else{const n=new On(i,this),r=n.u(this.options);n.p(s),this.T(r),this._$AH=n}}_$AC(e){let s=aa.get(e.strings);return s===void 0&&aa.set(e.strings,s=new We(e)),s}k(e){ri(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let a,i=0;for(const n of e)i===s.length?s.push(a=new La(this.O(Be()),this.O(Be()),this,this.options)):a=s[i],a._$AI(n),i++;i<s.length&&(this._$AR(a&&a._$AB.nextSibling,i),s.length=i)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const a=Zi(e).nextSibling;Zi(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ys=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,a,i,n){this.type=1,this._$AH=z,this._$AN=void 0,this.element=e,this.name=s,this._$AM=i,this.options=n,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=z}_$AI(e,s=this,a,i){const n=this.strings;let r=!1;if(n===void 0)e=Te(this,e,s,0),r=!Fe(e)||e!==this._$AH&&e!==ie,r&&(this._$AH=e);else{const p=e;let d,m;for(e=n[0],d=0;d<n.length-1;d++)m=Te(this,p[a+d],s,d),m===ie&&(m=this._$AH[d]),r||=!Fe(m)||m!==this._$AH[d],m===z?e=z:e!==z&&(e+=(m??"")+n[d+1]),this._$AH[d]=m}r&&!i&&this.j(e)}j(e){e===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Mn=class extends ys{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===z?void 0:e}},Nn=class extends ys{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==z)}},jn=class extends ys{constructor(e,s,a,i,n){super(e,s,a,i,n),this.type=5}_$AI(e,s=this){if((e=Te(this,e,s,0)??z)===ie)return;const a=this._$AH,i=e===z&&a!==z||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,n=e!==z&&(a===z||i);i&&this.element.removeEventListener(this.name,this,a),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},zn=class{constructor(e,s,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){Te(this,e)}};const Un=ni.litHtmlPolyfillSupport;Un?.(We,oi),(ni.litHtmlVersions??=[]).push("3.3.2");const Bn=(t,e,s)=>{const a=s?.renderBefore??e;let i=a._$litPart$;if(i===void 0){const n=s?.renderBefore??null;a._$litPart$=i=new oi(e.insertBefore(Be(),n),n,void 0,s??{})}return i._$AI(t),i};const li=globalThis;let S=class extends ke{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Bn(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ie}};S._$litElement$=!0,S.finalized=!0,li.litElementHydrateSupport?.({LitElement:S});const Fn=li.litElementPolyfillSupport;Fn?.({LitElement:S});(li.litElementVersions??=[]).push("4.2.2");const I=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const Wn={attribute:!0,type:String,converter:cs,reflect:!1,hasChanged:ai},Hn=(t=Wn,e,s)=>{const{kind:a,metadata:i}=s;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),a==="accessor"){const{name:r}=s;return{set(p){const d=e.get.call(this);e.set.call(this,p),this.requestUpdate(r,d,t,!0,p)},init(p){return p!==void 0&&this.C(r,void 0,t,p),p}}}if(a==="setter"){const{name:r}=s;return function(p){const d=this[r];e.call(this,p),this.requestUpdate(r,d,t,!0,p)}}throw Error("Unsupported decorator location: "+a)};function x(t){return(e,s)=>typeof s=="object"?Hn(t,e,s):((a,i,n)=>{const r=i.hasOwnProperty(n);return i.constructor.createProperty(n,a),r?Object.getOwnPropertyDescriptor(i,n):void 0})(t,e,s)}function l(t){return x({...t,state:!0,attribute:!1})}const ps=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",ci="ccl-web-token",di="ccl-tenant-token",pi="ccl-tenant-id",hi="ccl-user";function Lt(){return localStorage.getItem(ci)}function U(){return localStorage.getItem(di)}function Ra(){return localStorage.getItem(pi)}function Oa(t){localStorage.setItem(ci,t)}function hs(t){localStorage.setItem(di,t)}function us(t){localStorage.setItem(pi,t)}function Ma(t){localStorage.setItem(hi,JSON.stringify(t))}function Na(){const t=localStorage.getItem(hi);return t?JSON.parse(t):null}function gs(){localStorage.removeItem(ci),localStorage.removeItem(di),localStorage.removeItem(pi),localStorage.removeItem(hi)}class ui extends Error{constructor(e,s){super(s),this.status=e}}async function y(t,e={}){const{token:s,...a}=e,i=s??U()??Lt(),n=new Headers(a.headers);n.set("Content-Type","application/json"),i&&n.set("Authorization",`Bearer ${i}`);const r=await fetch(`${ps}${t}`,{...a,headers:n});if(r.status===401&&(gs(),window.dispatchEvent(new CustomEvent("ccl:unauthorized"))),!r.ok){let p=r.statusText;try{const d=await r.json();p=d.error??d.message??p}catch{}throw new ui(r.status,p)}if(r.status!==204)return r.json()}const Ht={async register(t,e,s){return y("/api/auth/web/register",{method:"POST",body:JSON.stringify({email:t,username:e,password:s}),token:null})},async login(t,e){return y("/api/auth/web/login",{method:"POST",body:JSON.stringify({email:t,password:e}),token:null})},async tenantToken(t){return y("/api/auth/tenant-token",{method:"POST",body:JSON.stringify({tenantId:t})})},async listTenants(){return(await y("/api/tenants/mine")).tenants}},ot={async create(t){return y("/api/tenants/create",{method:"POST",body:JSON.stringify({name:t})})},async get(t){return y(`/api/tenants/${t}`)},async inviteMember(t,e,s){return y(`/api/tenants/${t}/members`,{method:"POST",body:JSON.stringify({email:e,role:s})})},async removeMember(t,e){return y(`/api/tenants/${t}/members/${e}`,{method:"DELETE"})},async subscription(t){return y(`/api/tenants/${t}/subscription`)},async defaultClaw(t){return y(`/api/tenants/${t}/default-claw`)},async setDefaultClaw(t,e){return y(`/api/tenants/${t}/default-claw`,{method:"PUT",body:JSON.stringify({clawId:e})})},async upgradeToPro(t,e){return y(`/api/tenants/${t}/subscription/pro`,{method:"POST",body:JSON.stringify(e)})},async downgradeToFree(t){return y(`/api/tenants/${t}/subscription/free`,{method:"POST",body:JSON.stringify({})})}},lt={async list(){return(await y("/api/projects")).projects},async create(t){return y("/api/projects",{method:"POST",body:JSON.stringify(t)})},async upsert(t){return y("/api/projects/upsert",{method:"POST",body:JSON.stringify(t)})},async scaffold(t){return y("/api/projects/scaffold",{method:"POST",body:JSON.stringify(t)})},async update(t,e){return y(`/api/projects/${t}`,{method:"PATCH",body:JSON.stringify(e)})},async remove(t){return y(`/api/projects/${t}`,{method:"DELETE"})}},q={async list(t){const e=new URLSearchParams;return t?.projectId&&e.set("project_id",t.projectId),t?.status&&e.set("status",t.status),t?.archived&&e.set("archived","true"),(await y(`/api/tasks${e.size?`?${e}`:""}`)).tasks.map(a=>({...a,assignedClawId:a.assignedClawId==null?void 0:String(a.assignedClawId)}))},async create(t){const e={...t,projectId:t.projectId===void 0?void 0:Number(t.projectId),assignedClawId:t.assignedClawId===void 0?void 0:t.assignedClawId===""?null:Number(t.assignedClawId)},s=await y("/api/tasks",{method:"POST",body:JSON.stringify(e)});return{...s,assignedClawId:s.assignedClawId==null?void 0:String(s.assignedClawId)}},async update(t,e){const s={...e,projectId:e.projectId===void 0?void 0:Number(e.projectId),assignedClawId:e.assignedClawId===void 0?void 0:e.assignedClawId===""?null:Number(e.assignedClawId)},a=await y(`/api/tasks/${t}`,{method:"PATCH",body:JSON.stringify(s)});return{...a,assignedClawId:a.assignedClawId==null?void 0:String(a.assignedClawId)}},async remove(t){return y(`/api/tasks/${t}`,{method:"DELETE"})},async run(t,e){return y("/api/runtime/executions",{method:"POST",body:JSON.stringify({taskId:Number(t),payload:e})})},async executions(t){return y(`/api/runtime/tasks/${t}/executions`)}},K={async list(){return(await y("/api/claws")).claws},async register(t){return y("/api/claws",{method:"POST",body:JSON.stringify({name:t})})},async remove(t){return y(`/api/claws/${t}`,{method:"DELETE"})},async projects(t){return(await y(`/api/claws/${t}/projects`)).projects},async associateProject(t,e){return y(`/api/claws/${t}/projects/${e}`,{method:"PUT"})},async unassociateProject(t,e){return y(`/api/claws/${t}/projects/${e}`,{method:"DELETE"})},async directories(t){return(await y(`/api/claws/${t}/directories`)).directories},async directoryFiles(t,e){return(await y(`/api/claws/${t}/directories/${e}/files`)).files},async directoryFileContent(t,e,s){return y(`/api/claws/${t}/directories/${e}/files/content?path=${encodeURIComponent(s)}`)},async status(t){return y(`/api/claws/${t}/status`)},wsUrl(t){const s=(typeof ps=="string"?ps:"https://api.coderclaw.ai").replace(/^http/,"ws"),a=U()??"";return`${s}/api/claws/${t}/ws?token=${encodeURIComponent(a)}`}},ws={async list(){return(await y("/marketplace/skills")).skills}},xe={async listTenant(){return(await y("/api/skill-assignments/tenant")).assignments},async assignTenant(t){return y("/api/skill-assignments/tenant",{method:"POST",body:JSON.stringify({slug:t})})},async unassignTenant(t){return y(`/api/skill-assignments/tenant/${t}`,{method:"DELETE"})},async assignClaw(t,e){return y(`/api/skill-assignments/claws/${t}`,{method:"POST",body:JSON.stringify({skillSlug:e})})}},gi={async list(t){const e=new URLSearchParams;return t?.taskId&&e.set("taskId",t.taskId),t?.clawId&&e.set("clawId",t.clawId),y(`/api/runtime/executions${e.size?`?${e}`:""}`)}},$s={async chat(t,e){const s=await fetch(`${ps}/llm/v1/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",...U()?{Authorization:`Bearer ${U()}`}:{}},body:JSON.stringify({messages:t,stream:!1,temperature:e?.temperature,max_tokens:e?.maxTokens})});if(!s.ok){let a=s.statusText;try{const i=await s.json();a=i.error??i.message??a}catch{}throw new ui(s.status,a)}return s.json()},async usage(t=30){const e=new URLSearchParams;return e.set("days",String(t)),y(`/llm/v1/usage?${e.toString()}`)}};function $e(t,e={}){return y(t,{...e,token:Lt()})}const Ft={async users(){return(await $e("/api/admin/users")).users},async tenants(){return(await $e("/api/admin/tenants")).tenants},async health(){return $e("/api/admin/health")},async errors(){return(await $e("/api/admin/errors")).errors},async impersonate(t,e){return $e("/api/admin/impersonate",{method:"POST",body:JSON.stringify({userId:t,tenantId:e})})},async llmUsage(t=30){return $e(`/api/admin/llm-usage?days=${t}`)}},na=Object.freeze(Object.defineProperty({__proto__:null,ApiError:ui,adminApi:Ft,auth:Ht,claws:K,clearSession:gs,executions:gi,getTenantId:Ra,getTenantToken:U,getUser:Na,getWebToken:Lt,llm:$s,marketplace:ws,projects:lt,setTenantId:us,setTenantToken:hs,setUser:Ma,setWebToken:Oa,skillAssignments:xe,tasks:q,tenants:ot},Symbol.toStringTag,{value:"Module"}));var qn=Object.defineProperty,Kn=Object.getOwnPropertyDescriptor,Yt=(t,e,s,a)=>{for(var i=a>1?void 0:a?Kn(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&qn(e,s,i),i};let Rt=class extends S{constructor(){super(...arguments),this.currentPm="npm",this.currentMode="oneliner",this.currentHackable="installer",this.currentBeta=!1,this.osPickerExpanded=!1,this.currentWinShell="powershell",this.copiedCommand=null,this.comments={oneliner:{stable:"# Works everywhere. Installs everything. You're welcome. 🦞",beta:"# Living on the edge. Bugs are features you found first. 🦞"},quickInstall:{stable:"# Install CoderClaw",beta:"# Install CoderClaw (beta) — Fresh from the lab 🧪"},quickOnboard:{stable:"# Meet your lobster",beta:"# Meet your experimental lobster"}},this.windowsPsCmd="iwr -useb https://coderclaw.ai/install.ps1 | iex",this.windowsPsBetaCmd="& ([scriptblock]::Create((iwr -useb https://coderclaw.ai/install.ps1))) -Tag beta",this.windowsCmdCmd="curl -fsSL https://coderclaw.ai/install.cmd -o install.cmd && install.cmd && del install.cmd",this.windowsCmdBetaCmd="curl -fsSL https://coderclaw.ai/install.cmd -o install.cmd && install.cmd --tag beta && del install.cmd",this._selectedOs=this.currentOs}createRenderRoot(){return this}get currentOs(){return navigator.userAgentData?.platform==="Windows"||navigator.userAgent.toLowerCase().includes("windows")?"windows":"unix"}get selectedOs(){return this._selectedOs}set selectedOs(t){this._selectedOs=t}get osLabel(){return this.selectedOs==="windows"?"Windows":"macOS/Linux"}get betaMode(){return this.currentBeta?"beta":"stable"}get onelinerCommand(){return this.selectedOs==="unix"?this.currentBeta?"curl -fsSL https://coderclaw.ai/install.sh | bash -s -- --beta":"curl -fsSL https://coderclaw.ai/install.sh | bash":this.currentWinShell==="cmd"?this.currentBeta?this.windowsCmdBetaCmd:this.windowsCmdCmd:this.currentBeta?this.windowsPsBetaCmd:this.windowsPsCmd}get quickInstallCommand(){const t=this.currentBeta?"@beta":"";return this.currentPm==="npm"?`npm i -g coderclaw${t}`:`pnpm add -g coderclaw${t}`}async copyCommand(t,e){let s=!1;try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(e),s=!0;else{const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a);try{a.select(),s=document.execCommand("copy")}finally{a.remove()}}}catch{s=!1}s&&(this.copiedCommand=t,window.setTimeout(()=>{this.copiedCommand===t&&(this.copiedCommand=null)},2e3))}renderCopyButton(t,e){const s=this.copiedCommand===t;return o`
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
    `}};Yt([l()],Rt.prototype,"currentPm",2);Yt([l()],Rt.prototype,"currentMode",2);Yt([l()],Rt.prototype,"currentHackable",2);Yt([l()],Rt.prototype,"currentBeta",2);Yt([l()],Rt.prototype,"osPickerExpanded",2);Yt([l()],Rt.prototype,"currentWinShell",2);Yt([l()],Rt.prototype,"copiedCommand",2);Rt=Yt([I("ccl-quickstart")],Rt);var Gn=Object.defineProperty,Vn=Object.getOwnPropertyDescriptor,Mt=(t,e,s,a)=>{for(var i=a>1?void 0:a?Vn(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Gn(e,s,i),i};let $t=class extends S{constructor(){super(...arguments),this.mode="login",this.email="",this.username="",this.password="",this.loading=!1,this.error="",this.showRegisterQuickstart=!1,this.checkingQuickstartVisibility=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.refreshRegisterQuickstartVisibility()}updated(t){t.has("mode")&&this.refreshRegisterQuickstartVisibility()}async refreshRegisterQuickstartVisibility(){if(this.mode!=="register"){this.showRegisterQuickstart=!1;return}if(!this.checkingQuickstartVisibility){this.checkingQuickstartVisibility=!0;try{const t=await K.list();this.showRegisterQuickstart=t.length===0}catch{this.showRegisterQuickstart=!0}finally{this.checkingQuickstartVisibility=!1}}}async submit(t){if(t.preventDefault(),!(!this.email||!this.password)){this.loading=!0,this.error="";try{const e=this.mode==="login"?await Ht.login(this.email,this.password):await Ht.register(this.email,this.username||this.email.split("@")[0],this.password);this.dispatchEvent(new CustomEvent(this.mode==="register"?"register":"login",{detail:e,bubbles:!0,composed:!0}))}catch(e){this.error=e.message??"An error occurred"}finally{this.loading=!1}}}render(){return o`
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

          ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

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

          <div class="auth-toggle">
            ${this.mode==="login"?o`Don't have an account? <a @click=${()=>{this.mode="register",this.error=""}}>Sign up</a>`:o`Already have an account? <a @click=${()=>{this.mode="login",this.error=""}}>Sign in</a>`}
          </div>
        </div>

        ${this.mode==="register"&&this.showRegisterQuickstart?o`
            <div style="margin-top:20px;width:min(980px,95vw)">
              <ccl-quickstart></ccl-quickstart>
            </div>
          `:""}
      </div>
    `}};Mt([l()],$t.prototype,"mode",2);Mt([l()],$t.prototype,"email",2);Mt([l()],$t.prototype,"username",2);Mt([l()],$t.prototype,"password",2);Mt([l()],$t.prototype,"loading",2);Mt([l()],$t.prototype,"error",2);Mt([l()],$t.prototype,"showRegisterQuickstart",2);Mt([l()],$t.prototype,"checkingQuickstartVisibility",2);$t=Mt([I("ccl-auth")],$t);var Yn=Object.defineProperty,Jn=Object.getOwnPropertyDescriptor,oe=(t,e,s,a)=>{for(var i=a>1?void 0:a?Jn(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Yn(e,s,i),i};let qt=class extends S{constructor(){super(...arguments),this.tenants=[],this.user=null,this.showCreate=!1,this.newName="",this.creating=!1,this.error=""}createRenderRoot(){return this}selectTenant(t){this.dispatchEvent(new CustomEvent("select-tenant",{detail:t,bubbles:!0,composed:!0}))}async createTenant(t){if(t.preventDefault(),!!this.newName.trim()){this.creating=!0,this.error="";try{this.dispatchEvent(new CustomEvent("create-tenant",{detail:{name:this.newName.trim()},bubbles:!0,composed:!0}))}catch(e){this.error=e.message,this.creating=!1}}}signOut(){this.dispatchEvent(new CustomEvent("sign-out",{bubbles:!0,composed:!0}))}render(){return o`
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
    `}};oe([x({type:Array})],qt.prototype,"tenants",2);oe([x({type:Object})],qt.prototype,"user",2);oe([l()],qt.prototype,"showCreate",2);oe([l()],qt.prototype,"newName",2);oe([l()],qt.prototype,"creating",2);oe([l()],qt.prototype,"error",2);qt=oe([I("ccl-workspace-picker")],qt);var Xn=Object.defineProperty,Zn=Object.getOwnPropertyDescriptor,le=(t,e,s,a)=>{for(var i=a>1?void 0:a?Zn(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Xn(e,s,i),i};let Kt=class extends S{constructor(){super(...arguments),this.tenantId="",this.projects=[],this.claws=[],this.loading=!0,this.prompt="",this.rootWorkingDirectory=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([lt.list().catch(()=>[]),K.list().catch(()=>[])]);this.projects=t,this.claws=e}finally{this.loading=!1}}dispatch(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e??{}}))}handlePrompt(t){t.preventDefault();const e=this.prompt.trim();e&&(this.dispatch("ccl:dashboard-prompt",{prompt:e,rootWorkingDirectory:this.rootWorkingDirectory.trim()||null}),this.prompt="")}statusBadge(t){return o`<span class="badge ${{active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"}[t]??"badge-gray"}">${t.replace("_"," ")}</span>`}render(){const t=this.claws.filter(e=>e.connectedAt);return o`
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
            <input
              class="input"
              style="font-size:13px;padding:8px 12px"
              placeholder="Root working directory (optional), e.g. /Users/you/dev/my-repo"
              .value=${this.rootWorkingDirectory}
              @input=${e=>{this.rootWorkingDirectory=e.target.value}}
            >
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
    `}};le([x()],Kt.prototype,"tenantId",2);le([l()],Kt.prototype,"projects",2);le([l()],Kt.prototype,"claws",2);le([l()],Kt.prototype,"loading",2);le([l()],Kt.prototype,"prompt",2);le([l()],Kt.prototype,"rootWorkingDirectory",2);Kt=le([I("ccl-dashboard")],Kt);const Qn={CHILD:2},tr=t=>(...e)=>({_$litDirective$:t,values:e});class er{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,a){this._$Ct=e,this._$AM=s,this._$Ci=a}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}}class Gs extends er{constructor(e){if(super(e),this.it=z,e.type!==Qn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===z||e==null)return this._t=void 0,this.it=e;if(e===ie)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const s=[e];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}Gs.directiveName="unsafeHTML",Gs.resultType=1;const ja=tr(Gs);function mi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ce=mi();function za(t){ce=t}var te={exec:()=>null};function T(t,e=""){let s=typeof t=="string"?t:t.source,a={replace:(i,n)=>{let r=typeof n=="string"?n:n.source;return r=r.replace(et.caret,"$1"),s=s.replace(i,r),a},getRegex:()=>new RegExp(s,e)};return a}var sr=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),et={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}>`)},ir=/^(?:[ \t]*(?:\n|$))+/,ar=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,nr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,He=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,rr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vi=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Ua=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ba=T(Ua).replace(/bull/g,vi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),or=T(Ua).replace(/bull/g,vi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),fi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lr=/^[^\n]+/,bi=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,cr=T(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),dr=T(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,vi).getRegex(),ks="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",yi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,pr=T("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",yi).replace("tag",ks).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Fa=T(fi).replace("hr",He).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ks).getRegex(),hr=T(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Fa).getRegex(),wi={blockquote:hr,code:ar,def:cr,fences:nr,heading:rr,hr:He,html:pr,lheading:Ba,list:dr,newline:ir,paragraph:Fa,table:te,text:lr},ra=T("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",He).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ks).getRegex(),ur={...wi,lheading:or,table:ra,paragraph:T(fi).replace("hr",He).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ra).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ks).getRegex()},gr={...wi,html:T(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",yi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:te,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:T(fi).replace("hr",He).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ba).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mr=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,vr=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Wa=/^( {2,}|\\)\n(?!\s*$)/,fr=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xs=/[\p{P}\p{S}]/u,$i=/[\s\p{P}\p{S}]/u,Ha=/[^\s\p{P}\p{S}]/u,br=T(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,$i).getRegex(),qa=/(?!~)[\p{P}\p{S}]/u,yr=/(?!~)[\s\p{P}\p{S}]/u,wr=/(?:[^\s\p{P}\p{S}]|~)/u,Ka=/(?![*_])[\p{P}\p{S}]/u,$r=/(?![*_])[\s\p{P}\p{S}]/u,kr=/(?:[^\s\p{P}\p{S}]|[*_])/u,xr=T(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",sr?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ga=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Tr=T(Ga,"u").replace(/punct/g,xs).getRegex(),Cr=T(Ga,"u").replace(/punct/g,qa).getRegex(),Va="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sr=T(Va,"gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,$i).replace(/punct/g,xs).getRegex(),_r=T(Va,"gu").replace(/notPunctSpace/g,wr).replace(/punctSpace/g,yr).replace(/punct/g,qa).getRegex(),Ar=T("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,$i).replace(/punct/g,xs).getRegex(),Er=T(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,Ka).getRegex(),Pr="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Ir=T(Pr,"gu").replace(/notPunctSpace/g,kr).replace(/punctSpace/g,$r).replace(/punct/g,Ka).getRegex(),Dr=T(/\\(punct)/,"gu").replace(/punct/g,xs).getRegex(),Lr=T(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Rr=T(yi).replace("(?:-->|$)","-->").getRegex(),Or=T("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Rr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ms=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Mr=T(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ms).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ya=T(/^!?\[(label)\]\[(ref)\]/).replace("label",ms).replace("ref",bi).getRegex(),Ja=T(/^!?\[(ref)\](?:\[\])?/).replace("ref",bi).getRegex(),Nr=T("reflink|nolink(?!\\()","g").replace("reflink",Ya).replace("nolink",Ja).getRegex(),oa=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ki={_backpedal:te,anyPunctuation:Dr,autolink:Lr,blockSkip:xr,br:Wa,code:vr,del:te,delLDelim:te,delRDelim:te,emStrongLDelim:Tr,emStrongRDelimAst:Sr,emStrongRDelimUnd:Ar,escape:mr,link:Mr,nolink:Ja,punctuation:br,reflink:Ya,reflinkSearch:Nr,tag:Or,text:fr,url:te},jr={...ki,link:T(/^!?\[(label)\]\((.*?)\)/).replace("label",ms).getRegex(),reflink:T(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ms).getRegex()},Vs={...ki,emStrongRDelimAst:_r,emStrongLDelim:Cr,delLDelim:Er,delRDelim:Ir,url:T(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",oa).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:T(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",oa).getRegex()},zr={...Vs,br:T(Wa).replace("{2,}","*").getRegex(),text:T(Vs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ts={normal:wi,gfm:ur,pedantic:gr},Ie={normal:ki,gfm:Vs,breaks:zr,pedantic:jr},Ur={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},la=t=>Ur[t];function yt(t,e){if(e){if(et.escapeTest.test(t))return t.replace(et.escapeReplace,la)}else if(et.escapeTestNoEncode.test(t))return t.replace(et.escapeReplaceNoEncode,la);return t}function ca(t){try{t=encodeURI(t).replace(et.percentDecode,"%")}catch{return null}return t}function da(t,e){let s=t.replace(et.findPipe,(n,r,p)=>{let d=!1,m=r;for(;--m>=0&&p[m]==="\\";)d=!d;return d?"|":" |"}),a=s.split(et.splitPipe),i=0;if(a[0].trim()||a.shift(),a.length>0&&!a.at(-1)?.trim()&&a.pop(),e)if(a.length>e)a.splice(e);else for(;a.length<e;)a.push("");for(;i<a.length;i++)a[i]=a[i].trim().replace(et.slashPipe,"|");return a}function De(t,e,s){let a=t.length;if(a===0)return"";let i=0;for(;i<a&&t.charAt(a-i-1)===e;)i++;return t.slice(0,a-i)}function Br(t,e){if(t.indexOf(e[1])===-1)return-1;let s=0;for(let a=0;a<t.length;a++)if(t[a]==="\\")a++;else if(t[a]===e[0])s++;else if(t[a]===e[1]&&(s--,s<0))return a;return s>0?-2:-1}function Fr(t,e=0){let s=e,a="";for(let i of t)if(i==="	"){let n=4-s%4;a+=" ".repeat(n),s+=n}else a+=i,s++;return a}function pa(t,e,s,a,i){let n=e.href,r=e.title||null,p=t[1].replace(i.other.outputLinkReplace,"$1");a.state.inLink=!0;let d={type:t[0].charAt(0)==="!"?"image":"link",raw:s,href:n,title:r,text:p,tokens:a.inlineTokens(p)};return a.state.inLink=!1,d}function Wr(t,e,s){let a=t.match(s.other.indentCodeCompensation);if(a===null)return e;let i=a[1];return e.split(`
`).map(n=>{let r=n.match(s.other.beginningSpace);if(r===null)return n;let[p]=r;return p.length>=i.length?n.slice(i.length):n}).join(`
`)}var vs=class{options;rules;lexer;constructor(t){this.options=t||ce}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let s=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?s:De(s,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let s=e[0],a=Wr(s,e[3]||"",this.rules);return{type:"code",raw:s,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:a}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let s=e[2].trim();if(this.rules.other.endingHash.test(s)){let a=De(s,"#");(this.options.pedantic||!a||this.rules.other.endingSpaceChar.test(a))&&(s=a.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:De(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let s=De(e[0],`
`).split(`
`),a="",i="",n=[];for(;s.length>0;){let r=!1,p=[],d;for(d=0;d<s.length;d++)if(this.rules.other.blockquoteStart.test(s[d]))p.push(s[d]),r=!0;else if(!r)p.push(s[d]);else break;s=s.slice(d);let m=p.join(`
`),h=m.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");a=a?`${a}
${m}`:m,i=i?`${i}
${h}`:h;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,n,!0),this.lexer.state.top=u,s.length===0)break;let f=n.at(-1);if(f?.type==="code")break;if(f?.type==="blockquote"){let w=f,$=w.raw+`
`+s.join(`
`),W=this.blockquote($);n[n.length-1]=W,a=a.substring(0,a.length-w.raw.length)+W.raw,i=i.substring(0,i.length-w.text.length)+W.text;break}else if(f?.type==="list"){let w=f,$=w.raw+`
`+s.join(`
`),W=this.list($);n[n.length-1]=W,a=a.substring(0,a.length-f.raw.length)+W.raw,i=i.substring(0,i.length-w.raw.length)+W.raw,s=$.substring(n.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:a,tokens:n,text:i}}}list(t){let e=this.rules.block.list.exec(t);if(e){let s=e[1].trim(),a=s.length>1,i={type:"list",raw:"",ordered:a,start:a?+s.slice(0,-1):"",loose:!1,items:[]};s=a?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=a?s:"[*+-]");let n=this.rules.other.listItemRegex(s),r=!1;for(;t;){let d=!1,m="",h="";if(!(e=n.exec(t))||this.rules.block.hr.test(t))break;m=e[0],t=t.substring(m.length);let u=Fr(e[2].split(`
`,1)[0],e[1].length),f=t.split(`
`,1)[0],w=!u.trim(),$=0;if(this.options.pedantic?($=2,h=u.trimStart()):w?$=e[1].length+1:($=u.search(this.rules.other.nonSpaceChar),$=$>4?1:$,h=u.slice($),$+=e[1].length),w&&this.rules.other.blankLine.test(f)&&(m+=f+`
`,t=t.substring(f.length+1),d=!0),!d){let W=this.rules.other.nextBulletRegex($),he=this.rules.other.hrRegex($),qe=this.rules.other.fencesBeginRegex($),Ke=this.rules.other.headingBeginRegex($),ue=this.rules.other.htmlBeginRegex($),V=this.rules.other.blockquoteBeginRegex($);for(;t;){let At=t.split(`
`,1)[0],Et;if(f=At,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),Et=f):Et=f.replace(this.rules.other.tabCharGlobal,"    "),qe.test(f)||Ke.test(f)||ue.test(f)||V.test(f)||W.test(f)||he.test(f))break;if(Et.search(this.rules.other.nonSpaceChar)>=$||!f.trim())h+=`
`+Et.slice($);else{if(w||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||qe.test(u)||Ke.test(u)||he.test(u))break;h+=`
`+f}w=!f.trim(),m+=At+`
`,t=t.substring(At.length+1),u=Et.slice($)}}i.loose||(r?i.loose=!0:this.rules.other.doubleBlankLine.test(m)&&(r=!0)),i.items.push({type:"list_item",raw:m,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),i.raw+=m}let p=i.items.at(-1);if(p)p.raw=p.raw.trimEnd(),p.text=p.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let d of i.items){if(this.lexer.state.top=!1,d.tokens=this.lexer.blockTokens(d.text,[]),d.task){if(d.text=d.text.replace(this.rules.other.listReplaceTask,""),d.tokens[0]?.type==="text"||d.tokens[0]?.type==="paragraph"){d.tokens[0].raw=d.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),d.tokens[0].text=d.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let m=this.rules.other.listTaskCheckbox.exec(d.raw);if(m){let h={type:"checkbox",raw:m[0]+" ",checked:m[0]!=="[ ]"};d.checked=h.checked,i.loose?d.tokens[0]&&["paragraph","text"].includes(d.tokens[0].type)&&"tokens"in d.tokens[0]&&d.tokens[0].tokens?(d.tokens[0].raw=h.raw+d.tokens[0].raw,d.tokens[0].text=h.raw+d.tokens[0].text,d.tokens[0].tokens.unshift(h)):d.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):d.tokens.unshift(h)}}if(!i.loose){let m=d.tokens.filter(u=>u.type==="space"),h=m.length>0&&m.some(u=>this.rules.other.anyLine.test(u.raw));i.loose=h}}if(i.loose)for(let d of i.items){d.loose=!0;for(let m of d.tokens)m.type==="text"&&(m.type="paragraph")}return i}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let s=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),a=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:s,raw:e[0],href:a,title:i}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let s=da(e[1]),a=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],n={type:"table",raw:e[0],header:[],align:[],rows:[]};if(s.length===a.length){for(let r of a)this.rules.other.tableAlignRight.test(r)?n.align.push("right"):this.rules.other.tableAlignCenter.test(r)?n.align.push("center"):this.rules.other.tableAlignLeft.test(r)?n.align.push("left"):n.align.push(null);for(let r=0;r<s.length;r++)n.header.push({text:s[r],tokens:this.lexer.inline(s[r]),header:!0,align:n.align[r]});for(let r of i)n.rows.push(da(r,n.header.length).map((p,d)=>({text:p,tokens:this.lexer.inline(p),header:!1,align:n.align[d]})));return n}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let s=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:s,tokens:this.lexer.inline(s)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let s=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(s)){if(!this.rules.other.endAngleBracket.test(s))return;let n=De(s.slice(0,-1),"\\");if((s.length-n.length)%2===0)return}else{let n=Br(e[2],"()");if(n===-2)return;if(n>-1){let r=(e[0].indexOf("!")===0?5:4)+e[1].length+n;e[2]=e[2].substring(0,n),e[0]=e[0].substring(0,r).trim(),e[3]=""}}let a=e[2],i="";if(this.options.pedantic){let n=this.rules.other.pedanticHrefTitle.exec(a);n&&(a=n[1],i=n[3])}else i=e[3]?e[3].slice(1,-1):"";return a=a.trim(),this.rules.other.startAngleBracket.test(a)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(s)?a=a.slice(1):a=a.slice(1,-1)),pa(e,{href:a&&a.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let s;if((s=this.rules.inline.reflink.exec(t))||(s=this.rules.inline.nolink.exec(t))){let a=(s[2]||s[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=e[a.toLowerCase()];if(!i){let n=s[0].charAt(0);return{type:"text",raw:n,text:n}}return pa(s,i,s[0],this.lexer,this.rules)}}emStrong(t,e,s=""){let a=this.rules.inline.emStrongLDelim.exec(t);if(!(!a||a[3]&&s.match(this.rules.other.unicodeAlphaNumeric))&&(!(a[1]||a[2])||!s||this.rules.inline.punctuation.exec(s))){let i=[...a[0]].length-1,n,r,p=i,d=0,m=a[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,e=e.slice(-1*t.length+i);(a=m.exec(e))!=null;){if(n=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!n)continue;if(r=[...n].length,a[3]||a[4]){p+=r;continue}else if((a[5]||a[6])&&i%3&&!((i+r)%3)){d+=r;continue}if(p-=r,p>0)continue;r=Math.min(r,r+p+d);let h=[...a[0]][0].length,u=t.slice(0,i+a.index+h+r);if(Math.min(i,r)%2){let w=u.slice(1,-1);return{type:"em",raw:u,text:w,tokens:this.lexer.inlineTokens(w)}}let f=u.slice(2,-2);return{type:"strong",raw:u,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let s=e[2].replace(this.rules.other.newLineCharGlobal," "),a=this.rules.other.nonSpaceChar.test(s),i=this.rules.other.startingSpaceChar.test(s)&&this.rules.other.endingSpaceChar.test(s);return a&&i&&(s=s.substring(1,s.length-1)),{type:"codespan",raw:e[0],text:s}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t,e,s=""){let a=this.rules.inline.delLDelim.exec(t);if(a&&(!a[1]||!s||this.rules.inline.punctuation.exec(s))){let i=[...a[0]].length-1,n,r,p=i,d=this.rules.inline.delRDelim;for(d.lastIndex=0,e=e.slice(-1*t.length+i);(a=d.exec(e))!=null;){if(n=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!n||(r=[...n].length,r!==i))continue;if(a[3]||a[4]){p+=r;continue}if(p-=r,p>0)continue;r=Math.min(r,r+p);let m=[...a[0]][0].length,h=t.slice(0,i+a.index+m+r),u=h.slice(i,-i);return{type:"del",raw:h,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let s,a;return e[2]==="@"?(s=e[1],a="mailto:"+s):(s=e[1],a=s),{type:"link",raw:e[0],text:s,href:a,tokens:[{type:"text",raw:s,text:s}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let s,a;if(e[2]==="@")s=e[0],a="mailto:"+s;else{let i;do i=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(i!==e[0]);s=e[0],e[1]==="www."?a="http://"+e[0]:a=e[0]}return{type:"link",raw:e[0],text:s,href:a,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let s=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:s}}}},ht=class Ys{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ce,this.options.tokenizer=this.options.tokenizer||new vs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let s={other:et,block:ts.normal,inline:Ie.normal};this.options.pedantic?(s.block=ts.pedantic,s.inline=Ie.pedantic):this.options.gfm&&(s.block=ts.gfm,this.options.breaks?s.inline=Ie.breaks:s.inline=Ie.gfm),this.tokenizer.rules=s}static get rules(){return{block:ts,inline:Ie}}static lex(e,s){return new Ys(s).lex(e)}static lexInline(e,s){return new Ys(s).inlineTokens(e)}lex(e){e=e.replace(et.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let s=0;s<this.inlineQueue.length;s++){let a=this.inlineQueue[s];this.inlineTokens(a.src,a.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,s=[],a=!1){for(this.options.pedantic&&(e=e.replace(et.tabCharGlobal,"    ").replace(et.spaceLine,""));e;){let i;if(this.options.extensions?.block?.some(r=>(i=r.call({lexer:this},e,s))?(e=e.substring(i.raw.length),s.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let r=s.at(-1);i.raw.length===1&&r!==void 0?r.raw+=`
`:s.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let r=s.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.at(-1).src=r.text):s.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let r=s.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.raw,this.inlineQueue.at(-1).src=r.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},s.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),s.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),s.push(i);continue}let n=e;if(this.options.extensions?.startBlock){let r=1/0,p=e.slice(1),d;this.options.extensions.startBlock.forEach(m=>{d=m.call({lexer:this},p),typeof d=="number"&&d>=0&&(r=Math.min(r,d))}),r<1/0&&r>=0&&(n=e.substring(0,r+1))}if(this.state.top&&(i=this.tokenizer.paragraph(n))){let r=s.at(-1);a&&r?.type==="paragraph"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):s.push(i),a=n.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let r=s.at(-1);r?.type==="text"?(r.raw+=(r.raw.endsWith(`
`)?"":`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):s.push(i);continue}if(e){let r="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(r);break}else throw new Error(r)}}return this.state.top=!0,s}inline(e,s=[]){return this.inlineQueue.push({src:e,tokens:s}),s}inlineTokens(e,s=[]){let a=e,i=null;if(this.tokens.links){let d=Object.keys(this.tokens.links);if(d.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)d.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,i.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let n;for(;(i=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)n=i[2]?i[2].length:0,a=a.slice(0,i.index+n)+"["+"a".repeat(i[0].length-n-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);a=this.options.hooks?.emStrongMask?.call({lexer:this},a)??a;let r=!1,p="";for(;e;){r||(p=""),r=!1;let d;if(this.options.extensions?.inline?.some(h=>(d=h.call({lexer:this},e,s))?(e=e.substring(d.raw.length),s.push(d),!0):!1))continue;if(d=this.tokenizer.escape(e)){e=e.substring(d.raw.length),s.push(d);continue}if(d=this.tokenizer.tag(e)){e=e.substring(d.raw.length),s.push(d);continue}if(d=this.tokenizer.link(e)){e=e.substring(d.raw.length),s.push(d);continue}if(d=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(d.raw.length);let h=s.at(-1);d.type==="text"&&h?.type==="text"?(h.raw+=d.raw,h.text+=d.text):s.push(d);continue}if(d=this.tokenizer.emStrong(e,a,p)){e=e.substring(d.raw.length),s.push(d);continue}if(d=this.tokenizer.codespan(e)){e=e.substring(d.raw.length),s.push(d);continue}if(d=this.tokenizer.br(e)){e=e.substring(d.raw.length),s.push(d);continue}if(d=this.tokenizer.del(e,a,p)){e=e.substring(d.raw.length),s.push(d);continue}if(d=this.tokenizer.autolink(e)){e=e.substring(d.raw.length),s.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(e))){e=e.substring(d.raw.length),s.push(d);continue}let m=e;if(this.options.extensions?.startInline){let h=1/0,u=e.slice(1),f;this.options.extensions.startInline.forEach(w=>{f=w.call({lexer:this},u),typeof f=="number"&&f>=0&&(h=Math.min(h,f))}),h<1/0&&h>=0&&(m=e.substring(0,h+1))}if(d=this.tokenizer.inlineText(m)){e=e.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(p=d.raw.slice(-1)),r=!0;let h=s.at(-1);h?.type==="text"?(h.raw+=d.raw,h.text+=d.text):s.push(d);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return s}},fs=class{options;parser;constructor(t){this.options=t||ce}space(t){return""}code({text:t,lang:e,escaped:s}){let a=(e||"").match(et.notSpaceStart)?.[0],i=t.replace(et.endingNewline,"")+`
`;return a?'<pre><code class="language-'+yt(a)+'">'+(s?i:yt(i,!0))+`</code></pre>
`:"<pre><code>"+(s?i:yt(i,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,s=t.start,a="";for(let r=0;r<t.items.length;r++){let p=t.items[r];a+=this.listitem(p)}let i=e?"ol":"ul",n=e&&s!==1?' start="'+s+'"':"";return"<"+i+n+`>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${yt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:s}){let a=this.parser.parseInline(s),i=ca(t);if(i===null)return a;t=i;let n='<a href="'+t+'"';return e&&(n+=' title="'+yt(e)+'"'),n+=">"+a+"</a>",n}image({href:t,title:e,text:s,tokens:a}){a&&(s=this.parser.parseInline(a,this.parser.textRenderer));let i=ca(t);if(i===null)return yt(s);t=i;let n=`<img src="${t}" alt="${yt(s)}"`;return e&&(n+=` title="${yt(e)}"`),n+=">",n}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:yt(t.text)}},xi=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},ut=class Js{options;renderer;textRenderer;constructor(e){this.options=e||ce,this.options.renderer=this.options.renderer||new fs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new xi}static parse(e,s){return new Js(s).parse(e)}static parseInline(e,s){return new Js(s).parseInline(e)}parse(e){let s="";for(let a=0;a<e.length;a++){let i=e[a];if(this.options.extensions?.renderers?.[i.type]){let r=i,p=this.options.extensions.renderers[r.type].call({parser:this},r);if(p!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(r.type)){s+=p||"";continue}}let n=i;switch(n.type){case"space":{s+=this.renderer.space(n);break}case"hr":{s+=this.renderer.hr(n);break}case"heading":{s+=this.renderer.heading(n);break}case"code":{s+=this.renderer.code(n);break}case"table":{s+=this.renderer.table(n);break}case"blockquote":{s+=this.renderer.blockquote(n);break}case"list":{s+=this.renderer.list(n);break}case"checkbox":{s+=this.renderer.checkbox(n);break}case"html":{s+=this.renderer.html(n);break}case"def":{s+=this.renderer.def(n);break}case"paragraph":{s+=this.renderer.paragraph(n);break}case"text":{s+=this.renderer.text(n);break}default:{let r='Token with "'+n.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return s}parseInline(e,s=this.renderer){let a="";for(let i=0;i<e.length;i++){let n=e[i];if(this.options.extensions?.renderers?.[n.type]){let p=this.options.extensions.renderers[n.type].call({parser:this},n);if(p!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(n.type)){a+=p||"";continue}}let r=n;switch(r.type){case"escape":{a+=s.text(r);break}case"html":{a+=s.html(r);break}case"link":{a+=s.link(r);break}case"image":{a+=s.image(r);break}case"checkbox":{a+=s.checkbox(r);break}case"strong":{a+=s.strong(r);break}case"em":{a+=s.em(r);break}case"codespan":{a+=s.codespan(r);break}case"br":{a+=s.br(r);break}case"del":{a+=s.del(r);break}case"text":{a+=s.text(r);break}default:{let p='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(p),"";throw new Error(p)}}}return a}},ze=class{options;block;constructor(t){this.options=t||ce}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ht.lex:ht.lexInline}provideParser(){return this.block?ut.parse:ut.parseInline}},Hr=class{defaults=mi();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=ut;Renderer=fs;TextRenderer=xi;Lexer=ht;Tokenizer=vs;Hooks=ze;constructor(...t){this.use(...t)}walkTokens(t,e){let s=[];for(let a of t)switch(s=s.concat(e.call(this,a)),a.type){case"table":{let i=a;for(let n of i.header)s=s.concat(this.walkTokens(n.tokens,e));for(let n of i.rows)for(let r of n)s=s.concat(this.walkTokens(r.tokens,e));break}case"list":{let i=a;s=s.concat(this.walkTokens(i.items,e));break}default:{let i=a;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(n=>{let r=i[n].flat(1/0);s=s.concat(this.walkTokens(r,e))}):i.tokens&&(s=s.concat(this.walkTokens(i.tokens,e)))}}return s}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(s=>{let a={...s};if(a.async=this.defaults.async||a.async||!1,s.extensions&&(s.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let n=e.renderers[i.name];n?e.renderers[i.name]=function(...r){let p=i.renderer.apply(this,r);return p===!1&&(p=n.apply(this,r)),p}:e.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let n=e[i.level];n?n.unshift(i.tokenizer):e[i.level]=[i.tokenizer],i.start&&(i.level==="block"?e.startBlock?e.startBlock.push(i.start):e.startBlock=[i.start]:i.level==="inline"&&(e.startInline?e.startInline.push(i.start):e.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(e.childTokens[i.name]=i.childTokens)}),a.extensions=e),s.renderer){let i=this.defaults.renderer||new fs(this.defaults);for(let n in s.renderer){if(!(n in i))throw new Error(`renderer '${n}' does not exist`);if(["options","parser"].includes(n))continue;let r=n,p=s.renderer[r],d=i[r];i[r]=(...m)=>{let h=p.apply(i,m);return h===!1&&(h=d.apply(i,m)),h||""}}a.renderer=i}if(s.tokenizer){let i=this.defaults.tokenizer||new vs(this.defaults);for(let n in s.tokenizer){if(!(n in i))throw new Error(`tokenizer '${n}' does not exist`);if(["options","rules","lexer"].includes(n))continue;let r=n,p=s.tokenizer[r],d=i[r];i[r]=(...m)=>{let h=p.apply(i,m);return h===!1&&(h=d.apply(i,m)),h}}a.tokenizer=i}if(s.hooks){let i=this.defaults.hooks||new ze;for(let n in s.hooks){if(!(n in i))throw new Error(`hook '${n}' does not exist`);if(["options","block"].includes(n))continue;let r=n,p=s.hooks[r],d=i[r];ze.passThroughHooks.has(n)?i[r]=m=>{if(this.defaults.async&&ze.passThroughHooksRespectAsync.has(n))return(async()=>{let u=await p.call(i,m);return d.call(i,u)})();let h=p.call(i,m);return d.call(i,h)}:i[r]=(...m)=>{if(this.defaults.async)return(async()=>{let u=await p.apply(i,m);return u===!1&&(u=await d.apply(i,m)),u})();let h=p.apply(i,m);return h===!1&&(h=d.apply(i,m)),h}}a.hooks=i}if(s.walkTokens){let i=this.defaults.walkTokens,n=s.walkTokens;a.walkTokens=function(r){let p=[];return p.push(n.call(this,r)),i&&(p=p.concat(i.call(this,r))),p}}this.defaults={...this.defaults,...a}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ht.lex(t,e??this.defaults)}parser(t,e){return ut.parse(t,e??this.defaults)}parseMarkdown(t){return(e,s)=>{let a={...s},i={...this.defaults,...a},n=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&a.async===!1)return n(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return n(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return n(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=t),i.async)return(async()=>{let r=i.hooks?await i.hooks.preprocess(e):e,p=await(i.hooks?await i.hooks.provideLexer():t?ht.lex:ht.lexInline)(r,i),d=i.hooks?await i.hooks.processAllTokens(p):p;i.walkTokens&&await Promise.all(this.walkTokens(d,i.walkTokens));let m=await(i.hooks?await i.hooks.provideParser():t?ut.parse:ut.parseInline)(d,i);return i.hooks?await i.hooks.postprocess(m):m})().catch(n);try{i.hooks&&(e=i.hooks.preprocess(e));let r=(i.hooks?i.hooks.provideLexer():t?ht.lex:ht.lexInline)(e,i);i.hooks&&(r=i.hooks.processAllTokens(r)),i.walkTokens&&this.walkTokens(r,i.walkTokens);let p=(i.hooks?i.hooks.provideParser():t?ut.parse:ut.parseInline)(r,i);return i.hooks&&(p=i.hooks.postprocess(p)),p}catch(r){return n(r)}}}onError(t,e){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let a="<p>An error occurred:</p><pre>"+yt(s.message+"",!0)+"</pre>";return e?Promise.resolve(a):a}if(e)return Promise.reject(s);throw s}}},ae=new Hr;function C(t,e){return ae.parse(t,e)}C.options=C.setOptions=function(t){return ae.setOptions(t),C.defaults=ae.defaults,za(C.defaults),C};C.getDefaults=mi;C.defaults=ce;C.use=function(...t){return ae.use(...t),C.defaults=ae.defaults,za(C.defaults),C};C.walkTokens=function(t,e){return ae.walkTokens(t,e)};C.parseInline=ae.parseInline;C.Parser=ut;C.parser=ut.parse;C.Renderer=fs;C.TextRenderer=xi;C.Lexer=ht;C.lexer=ht.lex;C.Tokenizer=vs;C.Hooks=ze;C.parse=C;C.options;C.setOptions;C.use;C.walkTokens;C.parseInline;ut.parse;ht.lex;const{entries:Xa,setPrototypeOf:ha,isFrozen:qr,getPrototypeOf:Kr,getOwnPropertyDescriptor:Gr}=Object;let{freeze:st,seal:ct,create:Xs}=Object,{apply:Zs,construct:Qs}=typeof Reflect<"u"&&Reflect;st||(st=function(e){return e});ct||(ct=function(e){return e});Zs||(Zs=function(e,s){for(var a=arguments.length,i=new Array(a>2?a-2:0),n=2;n<a;n++)i[n-2]=arguments[n];return e.apply(s,i)});Qs||(Qs=function(e){for(var s=arguments.length,a=new Array(s>1?s-1:0),i=1;i<s;i++)a[i-1]=arguments[i];return new e(...a)});const es=it(Array.prototype.forEach),Vr=it(Array.prototype.lastIndexOf),ua=it(Array.prototype.pop),Le=it(Array.prototype.push),Yr=it(Array.prototype.splice),ls=it(String.prototype.toLowerCase),Us=it(String.prototype.toString),Bs=it(String.prototype.match),Re=it(String.prototype.replace),Jr=it(String.prototype.indexOf),Xr=it(String.prototype.trim),pt=it(Object.prototype.hasOwnProperty),tt=it(RegExp.prototype.test),Oe=Zr(TypeError);function it(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var s=arguments.length,a=new Array(s>1?s-1:0),i=1;i<s;i++)a[i-1]=arguments[i];return Zs(t,e,a)}}function Zr(t){return function(){for(var e=arguments.length,s=new Array(e),a=0;a<e;a++)s[a]=arguments[a];return Qs(t,s)}}function k(t,e){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ls;ha&&ha(t,null);let a=e.length;for(;a--;){let i=e[a];if(typeof i=="string"){const n=s(i);n!==i&&(qr(e)||(e[a]=n),i=n)}t[i]=!0}return t}function Qr(t){for(let e=0;e<t.length;e++)pt(t,e)||(t[e]=null);return t}function wt(t){const e=Xs(null);for(const[s,a]of Xa(t))pt(t,s)&&(Array.isArray(a)?e[s]=Qr(a):a&&typeof a=="object"&&a.constructor===Object?e[s]=wt(a):e[s]=a);return e}function Me(t,e){for(;t!==null;){const a=Gr(t,e);if(a){if(a.get)return it(a.get);if(typeof a.value=="function")return it(a.value)}t=Kr(t)}function s(){return null}return s}const ga=st(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Fs=st(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ws=st(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),to=st(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Hs=st(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),eo=st(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ma=st(["#text"]),va=st(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),qs=st(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),fa=st(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ss=st(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),so=ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm),io=ct(/<%[\w\W]*|[\w\W]*%>/gm),ao=ct(/\$\{[\w\W]*/gm),no=ct(/^data-[\-\w.\u00B7-\uFFFF]+$/),ro=ct(/^aria-[\-\w]+$/),Za=ct(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),oo=ct(/^(?:\w+script|data):/i),lo=ct(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qa=ct(/^html$/i),co=ct(/^[a-z][.\w]*(-[.\w]+)+$/i);var ba=Object.freeze({__proto__:null,ARIA_ATTR:ro,ATTR_WHITESPACE:lo,CUSTOM_ELEMENT:co,DATA_ATTR:no,DOCTYPE_NAME:Qa,ERB_EXPR:io,IS_ALLOWED_URI:Za,IS_SCRIPT_OR_DATA:oo,MUSTACHE_EXPR:so,TMPLIT_EXPR:ao});const Ne={element:1,text:3,progressingInstruction:7,comment:8,document:9},po=function(){return typeof window>"u"?null:window},ho=function(e,s){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const i="data-tt-policy-suffix";s&&s.hasAttribute(i)&&(a=s.getAttribute(i));const n="dompurify"+(a?"#"+a:"");try{return e.createPolicy(n,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+n+" could not be created."),null}},ya=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function tn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:po();const e=b=>tn(b);if(e.version="3.3.1",e.removed=[],!t||!t.document||t.document.nodeType!==Ne.document||!t.Element)return e.isSupported=!1,e;let{document:s}=t;const a=s,i=a.currentScript,{DocumentFragment:n,HTMLTemplateElement:r,Node:p,Element:d,NodeFilter:m,NamedNodeMap:h=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:w}=t,$=d.prototype,W=Me($,"cloneNode"),he=Me($,"remove"),qe=Me($,"nextSibling"),Ke=Me($,"childNodes"),ue=Me($,"parentNode");if(typeof r=="function"){const b=s.createElement("template");b.content&&b.content.ownerDocument&&(s=b.content.ownerDocument)}let V,At="";const{implementation:Et,createNodeIterator:an,createDocumentFragment:nn,getElementsByTagName:rn}=s,{importNode:on}=a;let Q=ya();e.isSupported=typeof Xa=="function"&&typeof ue=="function"&&Et&&Et.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Ts,ERB_EXPR:Cs,TMPLIT_EXPR:Ss,DATA_ATTR:ln,ARIA_ATTR:cn,IS_SCRIPT_OR_DATA:dn,ATTR_WHITESPACE:Ti,CUSTOM_ELEMENT:pn}=ba;let{IS_ALLOWED_URI:Ci}=ba,H=null;const Si=k({},[...ga,...Fs,...Ws,...Hs,...ma]);let Y=null;const _i=k({},[...va,...qs,...fa,...ss]);let M=Object.seal(Xs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),_e=null,_s=null;const ge=Object.seal(Xs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ai=!0,As=!0,Ei=!1,Pi=!0,me=!1,Ge=!0,Xt=!1,Es=!1,Ps=!1,ve=!1,Ve=!1,Ye=!1,Ii=!0,Di=!1;const hn="user-content-";let Is=!0,Ae=!1,fe={},ft=null;const Ds=k({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Li=null;const Ri=k({},["audio","video","img","source","image","track"]);let Ls=null;const Oi=k({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Je="http://www.w3.org/1998/Math/MathML",Xe="http://www.w3.org/2000/svg",Pt="http://www.w3.org/1999/xhtml";let be=Pt,Rs=!1,Os=null;const un=k({},[Je,Xe,Pt],Us);let Ze=k({},["mi","mo","mn","ms","mtext"]),Qe=k({},["annotation-xml"]);const gn=k({},["title","style","font","a","script"]);let Ee=null;const mn=["application/xhtml+xml","text/html"],vn="text/html";let B=null,ye=null;const fn=s.createElement("form"),Mi=function(c){return c instanceof RegExp||c instanceof Function},Ms=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ye&&ye===c)){if((!c||typeof c!="object")&&(c={}),c=wt(c),Ee=mn.indexOf(c.PARSER_MEDIA_TYPE)===-1?vn:c.PARSER_MEDIA_TYPE,B=Ee==="application/xhtml+xml"?Us:ls,H=pt(c,"ALLOWED_TAGS")?k({},c.ALLOWED_TAGS,B):Si,Y=pt(c,"ALLOWED_ATTR")?k({},c.ALLOWED_ATTR,B):_i,Os=pt(c,"ALLOWED_NAMESPACES")?k({},c.ALLOWED_NAMESPACES,Us):un,Ls=pt(c,"ADD_URI_SAFE_ATTR")?k(wt(Oi),c.ADD_URI_SAFE_ATTR,B):Oi,Li=pt(c,"ADD_DATA_URI_TAGS")?k(wt(Ri),c.ADD_DATA_URI_TAGS,B):Ri,ft=pt(c,"FORBID_CONTENTS")?k({},c.FORBID_CONTENTS,B):Ds,_e=pt(c,"FORBID_TAGS")?k({},c.FORBID_TAGS,B):wt({}),_s=pt(c,"FORBID_ATTR")?k({},c.FORBID_ATTR,B):wt({}),fe=pt(c,"USE_PROFILES")?c.USE_PROFILES:!1,Ai=c.ALLOW_ARIA_ATTR!==!1,As=c.ALLOW_DATA_ATTR!==!1,Ei=c.ALLOW_UNKNOWN_PROTOCOLS||!1,Pi=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,me=c.SAFE_FOR_TEMPLATES||!1,Ge=c.SAFE_FOR_XML!==!1,Xt=c.WHOLE_DOCUMENT||!1,ve=c.RETURN_DOM||!1,Ve=c.RETURN_DOM_FRAGMENT||!1,Ye=c.RETURN_TRUSTED_TYPE||!1,Ps=c.FORCE_BODY||!1,Ii=c.SANITIZE_DOM!==!1,Di=c.SANITIZE_NAMED_PROPS||!1,Is=c.KEEP_CONTENT!==!1,Ae=c.IN_PLACE||!1,Ci=c.ALLOWED_URI_REGEXP||Za,be=c.NAMESPACE||Pt,Ze=c.MATHML_TEXT_INTEGRATION_POINTS||Ze,Qe=c.HTML_INTEGRATION_POINTS||Qe,M=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&Mi(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(M.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&Mi(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(M.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(M.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),me&&(As=!1),Ve&&(ve=!0),fe&&(H=k({},ma),Y=[],fe.html===!0&&(k(H,ga),k(Y,va)),fe.svg===!0&&(k(H,Fs),k(Y,qs),k(Y,ss)),fe.svgFilters===!0&&(k(H,Ws),k(Y,qs),k(Y,ss)),fe.mathMl===!0&&(k(H,Hs),k(Y,fa),k(Y,ss))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?ge.tagCheck=c.ADD_TAGS:(H===Si&&(H=wt(H)),k(H,c.ADD_TAGS,B))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?ge.attributeCheck=c.ADD_ATTR:(Y===_i&&(Y=wt(Y)),k(Y,c.ADD_ATTR,B))),c.ADD_URI_SAFE_ATTR&&k(Ls,c.ADD_URI_SAFE_ATTR,B),c.FORBID_CONTENTS&&(ft===Ds&&(ft=wt(ft)),k(ft,c.FORBID_CONTENTS,B)),c.ADD_FORBID_CONTENTS&&(ft===Ds&&(ft=wt(ft)),k(ft,c.ADD_FORBID_CONTENTS,B)),Is&&(H["#text"]=!0),Xt&&k(H,["html","head","body"]),H.table&&(k(H,["tbody"]),delete _e.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw Oe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Oe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');V=c.TRUSTED_TYPES_POLICY,At=V.createHTML("")}else V===void 0&&(V=ho(w,i)),V!==null&&typeof At=="string"&&(At=V.createHTML(""));st&&st(c),ye=c}},Ni=k({},[...Fs,...Ws,...to]),ji=k({},[...Hs,...eo]),bn=function(c){let g=ue(c);(!g||!g.tagName)&&(g={namespaceURI:be,tagName:"template"});const v=ls(c.tagName),D=ls(g.tagName);return Os[c.namespaceURI]?c.namespaceURI===Xe?g.namespaceURI===Pt?v==="svg":g.namespaceURI===Je?v==="svg"&&(D==="annotation-xml"||Ze[D]):!!Ni[v]:c.namespaceURI===Je?g.namespaceURI===Pt?v==="math":g.namespaceURI===Xe?v==="math"&&Qe[D]:!!ji[v]:c.namespaceURI===Pt?g.namespaceURI===Xe&&!Qe[D]||g.namespaceURI===Je&&!Ze[D]?!1:!ji[v]&&(gn[v]||!Ni[v]):!!(Ee==="application/xhtml+xml"&&Os[c.namespaceURI]):!1},bt=function(c){Le(e.removed,{element:c});try{ue(c).removeChild(c)}catch{he(c)}},Zt=function(c,g){try{Le(e.removed,{attribute:g.getAttributeNode(c),from:g})}catch{Le(e.removed,{attribute:null,from:g})}if(g.removeAttribute(c),c==="is")if(ve||Ve)try{bt(g)}catch{}else try{g.setAttribute(c,"")}catch{}},zi=function(c){let g=null,v=null;if(Ps)c="<remove></remove>"+c;else{const j=Bs(c,/^[\r\n\t ]+/);v=j&&j[0]}Ee==="application/xhtml+xml"&&be===Pt&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const D=V?V.createHTML(c):c;if(be===Pt)try{g=new f().parseFromString(D,Ee)}catch{}if(!g||!g.documentElement){g=Et.createDocument(be,"template",null);try{g.documentElement.innerHTML=Rs?At:D}catch{}}const X=g.body||g.documentElement;return c&&v&&X.insertBefore(s.createTextNode(v),X.childNodes[0]||null),be===Pt?rn.call(g,Xt?"html":"body")[0]:Xt?g.documentElement:X},Ui=function(c){return an.call(c.ownerDocument||c,c,m.SHOW_ELEMENT|m.SHOW_COMMENT|m.SHOW_TEXT|m.SHOW_PROCESSING_INSTRUCTION|m.SHOW_CDATA_SECTION,null)},Ns=function(c){return c instanceof u&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof h)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},Bi=function(c){return typeof p=="function"&&c instanceof p};function It(b,c,g){es(b,v=>{v.call(e,c,g,ye)})}const Fi=function(c){let g=null;if(It(Q.beforeSanitizeElements,c,null),Ns(c))return bt(c),!0;const v=B(c.nodeName);if(It(Q.uponSanitizeElement,c,{tagName:v,allowedTags:H}),Ge&&c.hasChildNodes()&&!Bi(c.firstElementChild)&&tt(/<[/\w!]/g,c.innerHTML)&&tt(/<[/\w!]/g,c.textContent)||c.nodeType===Ne.progressingInstruction||Ge&&c.nodeType===Ne.comment&&tt(/<[/\w]/g,c.data))return bt(c),!0;if(!(ge.tagCheck instanceof Function&&ge.tagCheck(v))&&(!H[v]||_e[v])){if(!_e[v]&&Hi(v)&&(M.tagNameCheck instanceof RegExp&&tt(M.tagNameCheck,v)||M.tagNameCheck instanceof Function&&M.tagNameCheck(v)))return!1;if(Is&&!ft[v]){const D=ue(c)||c.parentNode,X=Ke(c)||c.childNodes;if(X&&D){const j=X.length;for(let nt=j-1;nt>=0;--nt){const Dt=W(X[nt],!0);Dt.__removalCount=(c.__removalCount||0)+1,D.insertBefore(Dt,qe(c))}}}return bt(c),!0}return c instanceof d&&!bn(c)||(v==="noscript"||v==="noembed"||v==="noframes")&&tt(/<\/no(script|embed|frames)/i,c.innerHTML)?(bt(c),!0):(me&&c.nodeType===Ne.text&&(g=c.textContent,es([Ts,Cs,Ss],D=>{g=Re(g,D," ")}),c.textContent!==g&&(Le(e.removed,{element:c.cloneNode()}),c.textContent=g)),It(Q.afterSanitizeElements,c,null),!1)},Wi=function(c,g,v){if(Ii&&(g==="id"||g==="name")&&(v in s||v in fn))return!1;if(!(As&&!_s[g]&&tt(ln,g))){if(!(Ai&&tt(cn,g))){if(!(ge.attributeCheck instanceof Function&&ge.attributeCheck(g,c))){if(!Y[g]||_s[g]){if(!(Hi(c)&&(M.tagNameCheck instanceof RegExp&&tt(M.tagNameCheck,c)||M.tagNameCheck instanceof Function&&M.tagNameCheck(c))&&(M.attributeNameCheck instanceof RegExp&&tt(M.attributeNameCheck,g)||M.attributeNameCheck instanceof Function&&M.attributeNameCheck(g,c))||g==="is"&&M.allowCustomizedBuiltInElements&&(M.tagNameCheck instanceof RegExp&&tt(M.tagNameCheck,v)||M.tagNameCheck instanceof Function&&M.tagNameCheck(v))))return!1}else if(!Ls[g]){if(!tt(Ci,Re(v,Ti,""))){if(!((g==="src"||g==="xlink:href"||g==="href")&&c!=="script"&&Jr(v,"data:")===0&&Li[c])){if(!(Ei&&!tt(dn,Re(v,Ti,"")))){if(v)return!1}}}}}}}return!0},Hi=function(c){return c!=="annotation-xml"&&Bs(c,pn)},qi=function(c){It(Q.beforeSanitizeAttributes,c,null);const{attributes:g}=c;if(!g||Ns(c))return;const v={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Y,forceKeepAttr:void 0};let D=g.length;for(;D--;){const X=g[D],{name:j,namespaceURI:nt,value:Dt}=X,we=B(j),js=Dt;let J=j==="value"?js:Xr(js);if(v.attrName=we,v.attrValue=J,v.keepAttr=!0,v.forceKeepAttr=void 0,It(Q.uponSanitizeAttribute,c,v),J=v.attrValue,Di&&(we==="id"||we==="name")&&(Zt(j,c),J=hn+J),Ge&&tt(/((--!?|])>)|<\/(style|title|textarea)/i,J)){Zt(j,c);continue}if(we==="attributename"&&Bs(J,"href")){Zt(j,c);continue}if(v.forceKeepAttr)continue;if(!v.keepAttr){Zt(j,c);continue}if(!Pi&&tt(/\/>/i,J)){Zt(j,c);continue}me&&es([Ts,Cs,Ss],Gi=>{J=Re(J,Gi," ")});const Ki=B(c.nodeName);if(!Wi(Ki,we,J)){Zt(j,c);continue}if(V&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!nt)switch(w.getAttributeType(Ki,we)){case"TrustedHTML":{J=V.createHTML(J);break}case"TrustedScriptURL":{J=V.createScriptURL(J);break}}if(J!==js)try{nt?c.setAttributeNS(nt,j,J):c.setAttribute(j,J),Ns(c)?bt(c):ua(e.removed)}catch{Zt(j,c)}}It(Q.afterSanitizeAttributes,c,null)},yn=function b(c){let g=null;const v=Ui(c);for(It(Q.beforeSanitizeShadowDOM,c,null);g=v.nextNode();)It(Q.uponSanitizeShadowNode,g,null),Fi(g),qi(g),g.content instanceof n&&b(g.content);It(Q.afterSanitizeShadowDOM,c,null)};return e.sanitize=function(b){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},g=null,v=null,D=null,X=null;if(Rs=!b,Rs&&(b="<!-->"),typeof b!="string"&&!Bi(b))if(typeof b.toString=="function"){if(b=b.toString(),typeof b!="string")throw Oe("dirty is not a string, aborting")}else throw Oe("toString is not a function");if(!e.isSupported)return b;if(Es||Ms(c),e.removed=[],typeof b=="string"&&(Ae=!1),Ae){if(b.nodeName){const Dt=B(b.nodeName);if(!H[Dt]||_e[Dt])throw Oe("root node is forbidden and cannot be sanitized in-place")}}else if(b instanceof p)g=zi("<!---->"),v=g.ownerDocument.importNode(b,!0),v.nodeType===Ne.element&&v.nodeName==="BODY"||v.nodeName==="HTML"?g=v:g.appendChild(v);else{if(!ve&&!me&&!Xt&&b.indexOf("<")===-1)return V&&Ye?V.createHTML(b):b;if(g=zi(b),!g)return ve?null:Ye?At:""}g&&Ps&&bt(g.firstChild);const j=Ui(Ae?b:g);for(;D=j.nextNode();)Fi(D),qi(D),D.content instanceof n&&yn(D.content);if(Ae)return b;if(ve){if(Ve)for(X=nn.call(g.ownerDocument);g.firstChild;)X.appendChild(g.firstChild);else X=g;return(Y.shadowroot||Y.shadowrootmode)&&(X=on.call(a,X,!0)),X}let nt=Xt?g.outerHTML:g.innerHTML;return Xt&&H["!doctype"]&&g.ownerDocument&&g.ownerDocument.doctype&&g.ownerDocument.doctype.name&&tt(Qa,g.ownerDocument.doctype.name)&&(nt="<!DOCTYPE "+g.ownerDocument.doctype.name+`>
`+nt),me&&es([Ts,Cs,Ss],Dt=>{nt=Re(nt,Dt," ")}),V&&Ye?V.createHTML(nt):nt},e.setConfig=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ms(b),Es=!0},e.clearConfig=function(){ye=null,Es=!1},e.isValidAttribute=function(b,c,g){ye||Ms({});const v=B(b),D=B(c);return Wi(v,D,g)},e.addHook=function(b,c){typeof c=="function"&&Le(Q[b],c)},e.removeHook=function(b,c){if(c!==void 0){const g=Vr(Q[b],c);return g===-1?void 0:Yr(Q[b],g,1)[0]}return ua(Q[b])},e.removeHooks=function(b){Q[b]=[]},e.removeAllHooks=function(){Q=ya()},e}var en=tn(),uo=Object.defineProperty,go=Object.getOwnPropertyDescriptor,L=(t,e,s,a)=>{for(var i=a>1?void 0:a?go(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&uo(e,s,i),i};const wa=["todo","in_progress","in_review","done","blocked"],Ks={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"};let E=class extends S{constructor(){super(...arguments),this.tenantId="",this.items=[],this.loading=!0,this.error="",this.showModal=!1,this.editTarget=null,this.form={name:"",description:""},this.saving=!1,this.panelOpen=!1,this.activeProject=null,this.workspaceLoading=!1,this.workspaceTab="details",this.projectTasks=[],this.projectClaws=[],this.taskForm={title:"",description:"",priority:"medium",status:"todo",assignedClawId:"",dueDate:""},this.taskSaving=!1,this.prdTitle="Project PRD",this.prdMarkdown="",this.prdUpdatedAt="",this.brainInput="",this.brainSending=!1,this.brainMessages=[],this.brainActions=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.items=await lt.list()}catch(t){this.error=t.message}finally{this.loading=!1}}openCreate(){this.editTarget=null,this.form={name:"",description:""},this.showModal=!0}openEdit(t){this.editTarget=t,this.form={name:t.name,description:t.description??""},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await lt.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.activeProject?.id===e.id&&(this.activeProject=e)}else{const e=await lt.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async removeProject(t){if(t?.id&&confirm(`Delete project "${t.name??"this project"}"? This cannot be undone.`))try{await lt.remove(t.id),this.items=this.items.filter(e=>e.id!==t.id),this.activeProject?.id===t.id&&this.closeWorkspace()}catch(e){this.error=e.message}}projectTaskList(){return this.activeProject?this.projectTasks.filter(t=>String(t.projectId??"")===String(this.activeProject?.id)):[]}statusBadge(t){const e={todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red",active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"},s=Ks[t]??t.replace("_"," ");return o`<span class="badge ${e[t]??"badge-gray"}">${s}</span>`}clawName(t){return t?this.projectClaws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return o`<span class="badge ${{low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"}[t]}">${t}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}renderMarkdown(t){const e=C.parse(t,{gfm:!0,breaks:!0}),s=typeof e=="string"?e:"",a=en.sanitize(s);return o`<div class="md-content">${ja(a)}</div>`}async openWorkspace(t){this.panelOpen=!0,this.workspaceTab="details",this.activeProject=t,await this.loadWorkspace()}closeWorkspace(){this.panelOpen=!1,this.activeProject=null,this.projectTasks=[],this.projectClaws=[],this.workspaceTab="details"}async loadWorkspace(){if(this.activeProject){this.workspaceLoading=!0;try{const[t,e]=await Promise.all([q.list(),K.list()]);this.projectTasks=t.filter(s=>String(s.projectId??"")===String(this.activeProject?.id)),this.projectClaws=e}catch(t){this.error=t.message}finally{this.workspaceLoading=!1}}}async reassignTask(t,e){try{const s=await q.update(t.id,{assignedClawId:e||""});this.projectTasks=this.projectTasks.map(a=>a.id===t.id?s:a)}catch(s){this.error=s.message}}async createTask(){if(!(!this.activeProject||!this.taskForm.title.trim()||this.taskSaving)){this.taskSaving=!0;try{const t=await q.create({projectId:String(this.activeProject.id),title:this.taskForm.title.trim(),description:this.taskForm.description||void 0,priority:this.taskForm.priority,status:this.taskForm.status,assignedClawId:this.taskForm.assignedClawId||void 0,dueDate:this.taskForm.dueDate||void 0});this.projectTasks=[t,...this.projectTasks],this.taskForm={title:"",description:"",priority:"medium",status:"todo",assignedClawId:"",dueDate:""}}catch(t){this.error=t.message}finally{this.taskSaving=!1}}}projectBrainContext(){return{project:this.activeProject?{id:this.activeProject.id,key:this.activeProject.key,name:this.activeProject.name,status:this.activeProject.status,description:this.activeProject.description??""}:null,tasks:this.projectTaskList().map(t=>({id:t.id,key:t.key,title:t.title,status:t.status,priority:t.priority,assignedClawId:t.assignedClawId??null})),claws:this.projectClaws.map(t=>({id:t.id,name:t.name,status:t.status}))}}parseBrainActions(t){const e=t.match(/<ccl-actions>([\s\S]*?)<\/ccl-actions>/i);if(!e)return[];try{const s=JSON.parse(e[1]);return Array.isArray(s.actions)?s.actions.filter(a=>a&&typeof a=="object"&&(a.type==="create_task"||a.type==="assign_task"||a.type==="save_prd")):[]}catch{return[]}}stripBrainActions(t){return t.replace(/<ccl-actions>[\s\S]*?<\/ccl-actions>/gi,"").trim()}brainMessagesPayload(){return[{role:"system",content:["You are Brain helping inside a project workspace.","Respond in markdown.",'When useful, include machine-readable actions in <ccl-actions>{"actions":[...]}</ccl-actions>.',"Allowed actions:","- create_task: { type, title, description?, priority?, status?, dueDate?, assignedClawId?, assignedClawName? }","- assign_task: { type, taskId?, taskKey?, taskTitle?, assignedClawId?, assignedClawName? }","- save_prd: { type, title?, content }","Keep output concise and execution oriented."].join(`
`)},{role:"system",content:`Project context JSON:
${JSON.stringify(this.projectBrainContext())}`},...this.brainMessages.slice(-14).map(e=>({role:e.role,content:e.text}))]}quickBrainPrompt(t){if(this.activeProject){if(t==="describe"){this.brainInput=`Summarize project ${this.activeProject.name} and current task health.`;return}if(t==="prd"){this.brainInput=`Draft a complete PRD for ${this.activeProject.name} and include a save_prd action.`;return}this.brainInput=`Create an execution-ready task plan for ${this.activeProject.name} with create_task actions and assignee suggestions.`}}async sendBrain(){const t=this.brainInput.trim();if(!(!t||this.brainSending||!this.activeProject)){this.brainMessages=[...this.brainMessages,{id:crypto.randomUUID(),role:"user",text:t}],this.brainInput="",this.brainSending=!0;try{const s=(await $s.chat(this.brainMessagesPayload(),{temperature:.25,maxTokens:1800})).choices?.[0]?.message?.content?.trim()??"I could not generate a response.",a=this.parseBrainActions(s);a.length&&(this.brainActions=a.map(n=>({action:n,status:"idle"})));const i=this.stripBrainActions(s)||"Done.";this.brainMessages=[...this.brainMessages,{id:crypto.randomUUID(),role:"assistant",text:i}]}catch(e){const s=e instanceof Error?e.message:String(e);this.brainMessages=[...this.brainMessages,{id:crypto.randomUUID(),role:"assistant",text:`Error: ${s}`}]}finally{this.brainSending=!1}}}resolveClaw(t){if(t.assignedClawId){const e=this.projectClaws.find(s=>s.id===t.assignedClawId);if(e)return e}if(t.assignedClawName){const e=this.projectClaws.find(s=>s.name.toLowerCase()===t.assignedClawName?.toLowerCase());if(e)return e}return null}async applyBrainAction(t){const e=this.brainActions[t];if(!(!e||e.status==="running"||!this.activeProject)){this.brainActions=this.brainActions.map((s,a)=>a===t?{...s,status:"running",result:void 0}:s);try{if(e.action.type==="save_prd"){this.prdTitle=e.action.title?.trim()||"Project PRD",this.prdMarkdown=e.action.content,this.prdUpdatedAt=new Date().toISOString(),this.brainActions=this.brainActions.map((r,p)=>p===t?{...r,status:"done",result:"Saved PRD draft"}:r);return}if(e.action.type==="create_task"){const r=this.resolveClaw(e.action),p=await q.create({projectId:String(this.activeProject.id),title:e.action.title,description:e.action.description,priority:e.action.priority??"medium",status:e.action.status??"todo",dueDate:e.action.dueDate,assignedClawId:r?.id});this.projectTasks=[p,...this.projectTasks],this.brainActions=this.brainActions.map((d,m)=>m===t?{...d,status:"done",result:`Created task ${p.key}`}:d);return}const s=e.action,a=this.projectTaskList().find(r=>s.taskId&&r.id===s.taskId||s.taskKey&&r.key.toLowerCase()===s.taskKey.toLowerCase()||s.taskTitle&&r.title.toLowerCase()===s.taskTitle.toLowerCase());if(!a)throw new Error("Task not found in this project for assignment");const i=this.resolveClaw(s);if(!i)throw new Error("Target claw not found for assignment");const n=await q.update(a.id,{assignedClawId:i.id});this.projectTasks=this.projectTasks.map(r=>r.id===n.id?n:r),this.brainActions=this.brainActions.map((r,p)=>p===t?{...r,status:"done",result:`Assigned ${n.key} → ${i.name}`}:r)}catch(s){const a=s instanceof Error?s.message:String(s);this.brainActions=this.brainActions.map((i,n)=>n===t?{...i,status:"error",result:a}:i)}}}async applyAllBrainActions(){for(let t=0;t<this.brainActions.length;t++)(this.brainActions[t]?.status==="idle"||this.brainActions[t]?.status==="error")&&await this.applyBrainAction(t)}clearBrain(){this.brainInput="",this.brainMessages=[],this.brainActions=[]}render(){return o`
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

      ${this.error?o`<div class="error-banner">${this.error}</div>`:""}

      ${this.loading?o`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.items.length===0?o`
            <div class="empty-state">
              <div class="empty-state-icon">📁</div>
              <div class="empty-state-title">No projects yet</div>
              <div class="empty-state-sub">Create a project to start organizing tasks</div>
              <button class="btn btn-primary" style="margin-top:16px" @click=${this.openCreate}>Create project</button>
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
                  ${t.description?o`<div style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px">${t.description}</div>`:""}
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
        ${wa.map(e=>o`
          <div class="kanban-col">
            <div class="kanban-col-header">
              <div class="kanban-col-title">${Ks[e]}</div>
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
              ${wa.map(e=>o`<option value=${e}>${Ks[e]}</option>`)}
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
                  ${t.action.type==="create_task"?`Create task: ${t.action.title}`:t.action.type==="assign_task"?`Assign task: ${t.action.taskKey??t.action.taskTitle??t.action.taskId??"task"}`:`Save PRD: ${t.action.title??"Project PRD"}`}
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
            <div class="modal-footer">
              <button class="btn btn-ghost" type="button" @click=${()=>this.showModal=!1}>Cancel</button>
              <button class="btn btn-primary" type="submit" ?disabled=${this.saving}>
                ${this.saving?"Saving…":this.editTarget?"Save changes":"Create project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `}};L([x()],E.prototype,"tenantId",2);L([l()],E.prototype,"items",2);L([l()],E.prototype,"loading",2);L([l()],E.prototype,"error",2);L([l()],E.prototype,"showModal",2);L([l()],E.prototype,"editTarget",2);L([l()],E.prototype,"form",2);L([l()],E.prototype,"saving",2);L([l()],E.prototype,"panelOpen",2);L([l()],E.prototype,"activeProject",2);L([l()],E.prototype,"workspaceLoading",2);L([l()],E.prototype,"workspaceTab",2);L([l()],E.prototype,"projectTasks",2);L([l()],E.prototype,"projectClaws",2);L([l()],E.prototype,"taskForm",2);L([l()],E.prototype,"taskSaving",2);L([l()],E.prototype,"prdTitle",2);L([l()],E.prototype,"prdMarkdown",2);L([l()],E.prototype,"prdUpdatedAt",2);L([l()],E.prototype,"brainInput",2);L([l()],E.prototype,"brainSending",2);L([l()],E.prototype,"brainMessages",2);L([l()],E.prototype,"brainActions",2);E=L([I("ccl-projects")],E);var mo=Object.defineProperty,vo=Object.getOwnPropertyDescriptor,R=(t,e,s,a)=>{for(var i=a>1?void 0:a?vo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&mo(e,s,i),i};const is=["todo","in_progress","in_review","done","blocked"],je={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"},$a=["low","medium","high","critical"],fo={low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"};let P=class extends S{constructor(){super(...arguments),this.tenantId="",this.projectId="",this.openTaskPrompt="",this.items=[],this.projects=[],this.claws=[],this.loading=!0,this.error="",this.view="kanban",this.filterStatus="",this.filterProject="",this.filterPriority="",this.search="",this.showArchived=!1,this.showModal=!1,this.editTarget=null,this.form={},this.saving=!1,this.drawerTask=null,this.drawerExecutions=[],this.drawerTab="detail",this.running=!1,this.dragTaskId=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.projectId&&(this.filterProject=this.projectId),this.load()}updated(t){t.has("projectId")&&this.projectId&&(this.filterProject=this.projectId),t.has("openTaskPrompt")&&this.openTaskPrompt&&(this.editTarget=null,this.form={status:"todo",priority:"medium",title:this.openTaskPrompt,...this.projectId?{projectId:this.projectId}:{}},this.showModal=!0)}async load(){this.loading=!0;try{[this.items,this.projects,this.claws]=await Promise.all([q.list({archived:this.showArchived}),lt.list(),K.list()])}catch(t){this.error=t.message}finally{this.loading=!1}}get filtered(){return this.items.filter(t=>!(this.filterStatus&&t.status!==this.filterStatus||this.filterProject&&t.projectId!==this.filterProject||this.filterPriority&&t.priority!==this.filterPriority||this.search&&!t.title.toLowerCase().includes(this.search.toLowerCase())))}tasksForStatus(t){return this.filtered.filter(e=>e.status===t)}openCreate(){this.editTarget=null,this.form={status:"todo",priority:"medium"},this.showModal=!0}openEdit(t,e){e?.stopPropagation(),this.editTarget=t,this.form={...t},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await q.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.drawerTask?.id===e.id&&(this.drawerTask=e)}else{const e=await q.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async removeTask(t,e){e?.stopPropagation(),t?.id&&confirm(`Delete "${t.title??"this task"}"?`)&&(await q.remove(t.id),this.items=this.items.filter(s=>s.id!==t.id),this.drawerTask?.id===t.id&&(this.drawerTask=null))}async patchStatus(t,e){const s=await q.update(t,{status:e});this.items=this.items.map(a=>a.id===t?s:a),this.drawerTask?.id===t&&(this.drawerTask=s)}async runTask(t,e){e.stopPropagation(),this.running=!0;try{const s=await q.run(t.id),a=await q.update(t.id,{status:"in_progress"});this.items=this.items.map(i=>i.id===a.id?a:i),this.drawerTask?.id===t.id&&(this.drawerTask=a,this.drawerExecutions=[s,...this.drawerExecutions])}catch(s){this.error=s.message}finally{this.running=!1}}async openDrawer(t){this.drawerTask=t,this.drawerTab="detail";try{this.drawerExecutions=await q.executions(t.id)}catch{this.drawerExecutions=[]}}closeDrawer(){this.drawerTask=null}dragStart(t){this.dragTaskId=t}dragOver(t){t.preventDefault()}async drop(t,e){t.preventDefault(),this.dragTaskId&&(await this.patchStatus(this.dragTaskId,e),this.dragTaskId="")}projectName(t){return t?this.projects.find(e=>e.id===t)?.name??t:"—"}clawName(t){return t?this.claws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return o`<span class="badge ${fo[t]}">${t}</span>`}statusBadge(t){return o`<span class="badge ${{todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red"}[t]}">${je[t]}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}render(){return o`
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
          ${is.map(t=>o`<option value=${t}>${je[t]}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterProject=t.target.value}}>
          <option value="">All projects</option>
          ${this.projects.map(t=>o`<option value=${t.id}>${t.name}</option>`)}
        </select>
        <select class="select" style="max-width:140px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterPriority=t.target.value}}>
          <option value="">All priorities</option>
          ${$a.map(t=>o`<option value=${t}>${t}</option>`)}
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
        ${is.map(t=>o`
          <div class="kanban-col"
            @dragover=${this.dragOver}
            @drop=${e=>this.drop(e,t)}>
            <div class="kanban-col-header">
              <div class="kanban-col-title">${je[t]}</div>
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
    `}renderGantt(){const t=this.filtered.filter(u=>u.dueDate||u.createdAt);if(t.length===0)return o`<div class="empty-state"><div class="empty-state-title">No tasks with dates</div><div class="empty-state-sub">Set due dates on tasks to see the timeline</div></div>`;const e=t.map(u=>new Date(u.dueDate??u.createdAt)),s=new Date(Math.min(...e.map(u=>u.getTime()))),a=new Date(Math.max(...e.map(u=>u.getTime())));s.setDate(1),a.setMonth(a.getMonth()+1),a.setDate(0);const i=Math.ceil((a.getTime()-s.getTime())/864e5)+1,n=24,r=i*n,p=[],d=new Date(s);for(;d<=a;){const u=Math.floor((d.getTime()-s.getTime())/864e5),f=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();p.push({label:d.toLocaleDateString(void 0,{month:"short",year:"2-digit"}),left:u*n,width:f*n}),d.setMonth(d.getMonth()+1),d.setDate(1)}const h=Math.floor((new Date().getTime()-s.getTime())/864e5)*n;return o`
      <div style="overflow-x:auto">
        <div style="min-width:${r+200}px">
          <!-- Month headers -->
          <div style="display:flex;margin-left:200px;border-bottom:1px solid var(--border)">
            ${p.map(u=>o`
              <div style="min-width:${u.width}px;padding:4px 8px;font-size:11px;color:var(--muted);border-right:1px solid var(--border)">${u.label}</div>
            `)}
          </div>
          <!-- Tasks -->
          <div style="position:relative">
            <!-- Today line -->
            ${h>=0&&h<=r?o`
              <div style="position:absolute;left:${200+h}px;top:0;bottom:0;width:2px;background:var(--accent);opacity:0.6;z-index:1"></div>
            `:""}

            ${t.map(u=>{const f=new Date(u.createdAt),w=new Date(u.dueDate??u.createdAt),$=Math.floor((f.getTime()-s.getTime())/864e5),W=Math.max(1,Math.ceil((w.getTime()-f.getTime())/864e5)),he={done:"var(--ok)",in_progress:"var(--accent)",blocked:"var(--danger)",in_review:"var(--warn)",todo:"var(--muted)"};return o`
                <div style="display:flex;align-items:center;border-bottom:1px solid var(--border);height:40px">
                  <div style="width:200px;flex-shrink:0;padding:0 12px;font-size:12px;font-weight:500;color:var(--text);truncate">
                    ${u.title}
                  </div>
                  <div style="flex:1;position:relative;height:100%">
                    <div
                      style="position:absolute;top:8px;height:24px;
                        left:${$*n}px;
                        width:${W*n}px;
                        background:${he[u.status]??"var(--muted)"};
                        opacity:0.8;border-radius:4px;cursor:pointer;
                        display:flex;align-items:center;padding:0 8px;
                        font-size:10px;font-weight:600;color:#fff;
                        white-space:nowrap;overflow:hidden"
                      @click=${()=>this.openDrawer(u)}
                      title="${u.title}"
                    >
                      ${u.key}
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
                  ${is.map(t=>o`<option value=${t}>${je[t]}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Priority</label>
                <select class="select" .value=${this.form.priority??"medium"}
                  @change=${t=>{this.form={...this.form,priority:t.target.value}}}>
                  ${$a.map(t=>o`<option value=${t}>${t}</option>`)}
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
            ${is.filter(e=>e!==t.status).map(e=>o`
              <button class="btn btn-secondary btn-sm"
                @click=${()=>this.patchStatus(t.id,e)}>${je[e]}</button>
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
    `}};R([x()],P.prototype,"tenantId",2);R([x()],P.prototype,"projectId",2);R([x()],P.prototype,"openTaskPrompt",2);R([l()],P.prototype,"items",2);R([l()],P.prototype,"projects",2);R([l()],P.prototype,"claws",2);R([l()],P.prototype,"loading",2);R([l()],P.prototype,"error",2);R([l()],P.prototype,"view",2);R([l()],P.prototype,"filterStatus",2);R([l()],P.prototype,"filterProject",2);R([l()],P.prototype,"filterPriority",2);R([l()],P.prototype,"search",2);R([l()],P.prototype,"showArchived",2);R([l()],P.prototype,"showModal",2);R([l()],P.prototype,"editTarget",2);R([l()],P.prototype,"form",2);R([l()],P.prototype,"saving",2);R([l()],P.prototype,"drawerTask",2);R([l()],P.prototype,"drawerExecutions",2);R([l()],P.prototype,"drawerTab",2);R([l()],P.prototype,"running",2);R([l()],P.prototype,"dragTaskId",2);P=R([I("ccl-tasks")],P);const ka=[800,1500,3e3,5e3,1e4,15e3];class sn{constructor(e){this.opts=e,this.ws=null,this.attempt=0,this.destroyed=!1,this.pingInterval=null,this.connect()}connect(){this.destroyed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>{this.attempt=0,this.schedulePings(),this.opts.onEvent({type:"connected"})}),this.ws.addEventListener("message",e=>{let s;try{s=JSON.parse(e.data)}catch{s=e.data}if(s&&typeof s=="object"&&s.type==="claw_offline"){this.opts.onEvent({type:"claw_offline"});return}this.opts.onEvent({type:"message",data:s})}),this.ws.addEventListener("close",e=>{this.clearPings(),!this.destroyed&&(this.opts.onEvent({type:"disconnected",code:e.code,reason:e.reason}),this.scheduleReconnect())}),this.ws.addEventListener("error",()=>{}))}send(e){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(e))}destroy(){this.destroyed=!0,this.clearPings(),this.ws?.close(1e3,"destroyed"),this.ws=null}get readyState(){return this.ws?.readyState??WebSocket.CLOSED}schedulePings(){this.clearPings(),this.pingInterval=setInterval(()=>{this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"ping"}))},3e4)}clearPings(){this.pingInterval!==null&&(clearInterval(this.pingInterval),this.pingInterval=null)}scheduleReconnect(){const e=ka[Math.min(this.attempt,ka.length-1)];this.attempt++,setTimeout(()=>this.connect(),e)}}var bo=Object.defineProperty,yo=Object.getOwnPropertyDescriptor,Nt=(t,e,s,a)=>{for(var i=a>1?void 0:a?yo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&bo(e,s,i),i};let kt=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.messages=[],this.tools=[],this.input="",this.connState="connecting",this.session="default",this.streaming=!1,this.gw=null,this.msgEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.scrollToBottom()}connect(){this.connState="connecting",this.gw=new sn({url:this.wsUrl,onEvent:t=>this.handleGwEvent(t)})}handleGwEvent(t){if(t.type==="connected"){this.connState="connected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type!=="message")return;const e=t.data;switch(e.type){case"chat.message":{if(e.role==="user")this.messages=[...this.messages,{id:crypto.randomUUID(),role:"user",text:e.text??""}];else{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:e.text??"",streaming:!1}]:this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.text??""}],this.streaming=!1}break}case"chat.delta":{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:s.text+(e.delta??"")}]:(this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.delta??"",streaming:!0}],this.streaming=!0);break}case"tool.start":{this.tools=[...this.tools,{id:e.toolCallId??crypto.randomUUID(),name:e.toolName??"tool",input:e.toolInput,expanded:!1}];break}case"tool.result":{this.tools=this.tools.map(s=>s.id===e.toolCallId?{...s,result:e.toolResult}:s);break}case"chat.abort":this.streaming=!1;break}}send(){const t=this.input.trim();!t||this.connState!=="connected"||(this.gw?.send({type:"chat",message:t,session:this.session}),this.input="")}abort(){this.gw?.send({type:"chat.abort"}),this.streaming=!1}newChat(){this.messages=[],this.tools=[],this.streaming=!1,this.gw?.send({type:"session.new"})}scrollToBottom(){this.msgEnd?.scrollIntoView({behavior:"smooth"})}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}connDot(){return o`<span class="dot ${{connected:"dot-green",connecting:"dot-yellow",offline:"dot-red",disconnected:"dot-gray"}[this.connState]}"></span> ${this.connState}`}render(){return o`
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
    `}};Nt([x()],kt.prototype,"clawId",2);Nt([x()],kt.prototype,"wsUrl",2);Nt([l()],kt.prototype,"messages",2);Nt([l()],kt.prototype,"tools",2);Nt([l()],kt.prototype,"input",2);Nt([l()],kt.prototype,"connState",2);Nt([l()],kt.prototype,"session",2);Nt([l()],kt.prototype,"streaming",2);kt=Nt([I("ccl-claw-chat")],kt);var wo=Object.defineProperty,$o=Object.getOwnPropertyDescriptor,jt=(t,e,s,a)=>{for(var i=a>1?void 0:a?$o(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&wo(e,s,i),i};const ko=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function as(t,e={}){const s=await fetch(`${ko}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${U()??""}`,...e.headers??{}}});if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}const xo=["claude","openai","ollama","http"];let xt=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.agents=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",type:"claude",endpoint:"",apiKey:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.agents=await as("/api/agents")}catch(t){this.error=t.message}finally{this.loading=!1}}async toggleActive(t){try{await as(`/api/agents/${t.id}`,{method:"PATCH",body:JSON.stringify({isActive:!t.isActive})}),this.agents=this.agents.map(e=>e.id===t.id?{...e,isActive:!e.isActive}:e)}catch(e){this.error=e.message}}async removeAgent(t){if(confirm(`Delete agent "${t.name}"?`))try{await as(`/api/agents/${t.id}`,{method:"DELETE"}),this.agents=this.agents.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await as("/api/agents",{method:"POST",body:JSON.stringify(this.form)});this.agents=[e,...this.agents],this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}render(){return o`
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
                    ${xo.map(t=>o`<option value=${t}>${t}</option>`)}
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
    `}};jt([x()],xt.prototype,"clawId",2);jt([x()],xt.prototype,"wsUrl",2);jt([l()],xt.prototype,"agents",2);jt([l()],xt.prototype,"loading",2);jt([l()],xt.prototype,"error",2);jt([l()],xt.prototype,"showModal",2);jt([l()],xt.prototype,"form",2);jt([l()],xt.prototype,"saving",2);xt=jt([I("ccl-claw-agents")],xt);var To=Object.defineProperty,Co=Object.getOwnPropertyDescriptor,mt=(t,e,s,a)=>{for(var i=a>1?void 0:a?Co(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&To(e,s,i),i};const So=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function xa(t,e={}){const s=await fetch(`${So}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${U()??""}`,...e.headers??{}}});if(s.status===404)return{};if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}let dt=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.config={},this.loading=!0,this.error="",this.editing=!1,this.draft={},this.saving=!1,this.newKey="",this.newVal=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await xa(`/api/claws/${this.clawId}/config`);this.config=t??{}}catch(t){this.error=t.message}finally{this.loading=!1}}startEdit(){this.draft={...this.config},this.editing=!0}cancel(){this.editing=!1,this.draft={}}async save(){this.saving=!0;try{await xa(`/api/claws/${this.clawId}/config`,{method:"PATCH",body:JSON.stringify(this.draft)}),this.config={...this.draft},this.editing=!1}catch(t){this.error=t.message}finally{this.saving=!1}}addField(){this.newKey.trim()&&(this.draft={...this.draft,[this.newKey.trim()]:this.newVal},this.newKey="",this.newVal="")}removeField(t){const e={...this.draft};delete e[t],this.draft=e}render(){const t=Object.entries(this.editing?this.draft:this.config);return o`
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
    `}};mt([x()],dt.prototype,"clawId",2);mt([x()],dt.prototype,"wsUrl",2);mt([l()],dt.prototype,"config",2);mt([l()],dt.prototype,"loading",2);mt([l()],dt.prototype,"error",2);mt([l()],dt.prototype,"editing",2);mt([l()],dt.prototype,"draft",2);mt([l()],dt.prototype,"saving",2);mt([l()],dt.prototype,"newKey",2);mt([l()],dt.prototype,"newVal",2);dt=mt([I("ccl-claw-config")],dt);var _o=Object.defineProperty,Ao=Object.getOwnPropertyDescriptor,Ce=(t,e,s,a)=>{for(var i=a>1?void 0:a?Ao(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&_o(e,s,i),i};const Eo=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Ta(t,e={}){const s=await fetch(`${Eo}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${U()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let ne=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.sessions=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Ta(`/api/claws/${this.clawId}/sessions`);this.sessions=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async removeSession(t){if(confirm("Delete this session?"))try{await Ta(`/api/claws/${this.clawId}/sessions/${t.id}`,{method:"DELETE"}),this.sessions=this.sessions.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){return o`
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
    `}};Ce([x()],ne.prototype,"clawId",2);Ce([x()],ne.prototype,"wsUrl",2);Ce([l()],ne.prototype,"sessions",2);Ce([l()],ne.prototype,"loading",2);Ce([l()],ne.prototype,"error",2);ne=Ce([I("ccl-claw-sessions")],ne);const Po="modulepreload",Io=function(t,e){return new URL(t,e).href},Ca={},Sa=function(e,s,a){let i=Promise.resolve();if(s&&s.length>0){let m=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const r=document.getElementsByTagName("link"),p=document.querySelector("meta[property=csp-nonce]"),d=p?.nonce||p?.getAttribute("nonce");i=m(s.map(h=>{if(h=Io(h,a),h in Ca)return;Ca[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(a)for(let $=r.length-1;$>=0;$--){const W=r[$];if(W.href===h&&(!u||W.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const w=document.createElement("link");if(w.rel=u?"stylesheet":Po,u||(w.as="script"),w.crossOrigin="",w.href=h,d&&w.setAttribute("nonce",d),document.head.appendChild(w),u)return new Promise(($,W)=>{w.addEventListener("load",$),w.addEventListener("error",()=>W(new Error(`Unable to preload CSS for ${h}`)))})}))}function n(r){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=r,window.dispatchEvent(p),!p.defaultPrevented)throw r}return i.then(r=>{for(const p of r||[])p.status==="rejected"&&n(p.reason);return e().catch(n)})};var Do=Object.defineProperty,Lo=Object.getOwnPropertyDescriptor,zt=(t,e,s,a)=>{for(var i=a>1?void 0:a?Lo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Do(e,s,i),i};let Tt=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.assigned=[],this.available=[],this.loading=!0,this.error="",this.showModal=!1,this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([this.loadAssigned(),ws.list().catch(()=>[])]);this.assigned=t,this.available=e}catch(t){this.error=t.message}finally{this.loading=!1}}async loadAssigned(){try{const{getTenantToken:t}=await Sa(async()=>{const{getTenantToken:i}=await Promise.resolve().then(()=>na);return{getTenantToken:i}},void 0,import.meta.url),e=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",s=await fetch(`${e}/api/skill-assignments/claws/${this.clawId}`,{headers:{Authorization:`Bearer ${t()??""}`}});return s.ok?((await s.json()).assignments??[]).map(i=>({slug:i.skillSlug,name:i.skillName??i.skillSlug,assignedAt:i.assignedAt})):[]}catch{return[]}}async assign(t){this.saving=!0;try{await xe.assignClaw(this.clawId,t),this.assigned=await this.loadAssigned(),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async unassign(t){try{const{getTenantToken:e}=await Sa(async()=>{const{getTenantToken:a}=await Promise.resolve().then(()=>na);return{getTenantToken:a}},void 0,import.meta.url),s=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";await fetch(`${s}/api/skill-assignments/claws/${this.clawId}/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${e()??""}`}}),this.assigned=this.assigned.filter(a=>a.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}render(){const t=this.assignedSlugs(),e=this.available.filter(s=>!t.has(s.slug));return o`
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
    `}};zt([x()],Tt.prototype,"clawId",2);zt([x()],Tt.prototype,"wsUrl",2);zt([l()],Tt.prototype,"assigned",2);zt([l()],Tt.prototype,"available",2);zt([l()],Tt.prototype,"loading",2);zt([l()],Tt.prototype,"error",2);zt([l()],Tt.prototype,"showModal",2);zt([l()],Tt.prototype,"saving",2);Tt=zt([I("ccl-claw-skills")],Tt);var Ro=Object.defineProperty,Oo=Object.getOwnPropertyDescriptor,de=(t,e,s,a)=>{for(var i=a>1?void 0:a?Oo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Ro(e,s,i),i};let Gt=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.items=[],this.loading=!0,this.error="",this.timeFilter="week"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{this.items=await gi.list({clawId:this.clawId})}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){const t=Date.now(),s={today:864e5,week:6048e5,month:2592e6,all:1/0}[this.timeFilter];return this.items.filter(a=>t-new Date(a.createdAt).getTime()<s)}stats(t){const e=t.length,s=t.filter(n=>n.status==="completed").length,a=t.filter(n=>n.status==="failed").length,i=t.filter(n=>n.status==="running").length;return{total:e,completed:s,failed:a,running:i}}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered(),e=this.stats(t),s={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return o`
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
    `}};de([x()],Gt.prototype,"clawId",2);de([x()],Gt.prototype,"wsUrl",2);de([l()],Gt.prototype,"items",2);de([l()],Gt.prototype,"loading",2);de([l()],Gt.prototype,"error",2);de([l()],Gt.prototype,"timeFilter",2);Gt=de([I("ccl-claw-usage")],Gt);var Mo=Object.defineProperty,No=Object.getOwnPropertyDescriptor,Ut=(t,e,s,a)=>{for(var i=a>1?void 0:a?No(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Mo(e,s,i),i};const jo=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function ns(t,e={}){const s=await fetch(`${jo}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${U()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let Ct=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.jobs=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",schedule:"0 9 * * 1-5",taskId:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await ns(`/api/claws/${this.clawId}/cron`);this.jobs=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await ns(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.jobs=this.jobs.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async removeCronJob(t){if(confirm(`Delete cron job "${t.name}"?`))try{await ns(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"DELETE"}),this.jobs=this.jobs.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await ns(`/api/claws/${this.clawId}/cron`,{method:"POST",body:JSON.stringify(this.form)});e&&(this.jobs=[e,...this.jobs]),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return o`
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
    `}};Ut([x()],Ct.prototype,"clawId",2);Ut([x()],Ct.prototype,"wsUrl",2);Ut([l()],Ct.prototype,"jobs",2);Ut([l()],Ct.prototype,"loading",2);Ut([l()],Ct.prototype,"error",2);Ut([l()],Ct.prototype,"showModal",2);Ut([l()],Ct.prototype,"form",2);Ut([l()],Ct.prototype,"saving",2);Ct=Ut([I("ccl-claw-cron")],Ct);var zo=Object.defineProperty,Uo=Object.getOwnPropertyDescriptor,Se=(t,e,s,a)=>{for(var i=a>1?void 0:a?Uo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&zo(e,s,i),i};const Bo=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function _a(t,e={}){const s=await fetch(`${Bo}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${U()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let re=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.nodes=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await _a(`/api/claws/${this.clawId}/nodes`);this.nodes=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async unpair(t){if(confirm(`Unpair node "${t.name??t.id}"?`))try{await _a(`/api/claws/${this.clawId}/nodes/${t.id}`,{method:"DELETE"}),this.nodes=this.nodes.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return o`
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
    `}};Se([x()],re.prototype,"clawId",2);Se([x()],re.prototype,"wsUrl",2);Se([l()],re.prototype,"nodes",2);Se([l()],re.prototype,"loading",2);Se([l()],re.prototype,"error",2);re=Se([I("ccl-claw-nodes")],re);var Fo=Object.defineProperty,Wo=Object.getOwnPropertyDescriptor,_t=(t,e,s,a)=>{for(var i=a>1?void 0:a?Wo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Fo(e,s,i),i};const Ho=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function rs(t,e={}){const s=await fetch(`${Ho}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${U()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}const qo=["discord","slack","telegram","whatsapp","signal","googlechat","nostr"],Ko={discord:[{key:"token",label:"Bot Token",type:"password"},{key:"guildId",label:"Guild ID"}],slack:[{key:"botToken",label:"Bot Token",type:"password"},{key:"appToken",label:"App Token",type:"password"}],telegram:[{key:"token",label:"Bot Token",type:"password"}],whatsapp:[{key:"phoneNumberId",label:"Phone Number ID"},{key:"accessToken",label:"Access Token",type:"password"}],signal:[{key:"phone",label:"Phone Number"}],googlechat:[{key:"serviceAccountKey",label:"Service Account Key (JSON)",type:"password"}],nostr:[{key:"privateKey",label:"Private Key (nsec)",type:"password"},{key:"relays",label:"Relay URLs (comma-separated)"}]};let gt=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.channels=[],this.loading=!0,this.error="",this.showModal=!1,this.selectedType="discord",this.form={},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await rs(`/api/claws/${this.clawId}/channels`);this.channels=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await rs(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.channels=this.channels.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async removeChannel(t){if(confirm(`Delete ${t.type} channel?`))try{await rs(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"DELETE"}),this.channels=this.channels.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await rs(`/api/claws/${this.clawId}/channels`,{method:"POST",body:JSON.stringify({type:this.selectedType,config:this.form})});e&&(this.channels=[e,...this.channels]),this.showModal=!1,this.form={}}catch(e){this.error=e.message}finally{this.saving=!1}}statusDot(t){return o`<span class="dot ${{connected:"dot-green",error:"dot-red",stopped:"dot-gray",pending:"dot-yellow"}[t]??"dot-gray"}"></span>`}render(){const t=Ko[this.selectedType]??[];return o`
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
                    ${qo.map(e=>o`<option value=${e}>${e}</option>`)}
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
    `}};_t([x()],gt.prototype,"clawId",2);_t([x()],gt.prototype,"wsUrl",2);_t([l()],gt.prototype,"channels",2);_t([l()],gt.prototype,"loading",2);_t([l()],gt.prototype,"error",2);_t([l()],gt.prototype,"showModal",2);_t([l()],gt.prototype,"selectedType",2);_t([l()],gt.prototype,"form",2);_t([l()],gt.prototype,"saving",2);gt=_t([I("ccl-claw-channels")],gt);var Go=Object.defineProperty,Vo=Object.getOwnPropertyDescriptor,pe=(t,e,s,a)=>{for(var i=a>1?void 0:a?Vo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Go(e,s,i),i};let Vt=class extends S{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.lines=[],this.level="all",this.connState="connecting",this.autoScroll=!0,this.gw=null,this.logEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.autoScroll&&this.logEnd?.scrollIntoView()}connect(){this.connState="connecting",this.gw=new sn({url:this.wsUrl,onEvent:t=>{if(t.type==="connected"){this.connState="connected",this.gw?.send({type:"logs.subscribe"});return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type!=="message")return;const e=t.data;e.type==="log"&&(this.lines=[...this.lines.slice(-2e3),{ts:e.ts??new Date().toISOString(),level:e.level??"info",msg:e.message??""}])}})}filtered(){return this.level==="all"?this.lines:this.lines.filter(t=>t.level===this.level)}levelClass(t){return{error:"log-line-error",warn:"log-line-warn",info:"log-line-info"}[t]??""}clear(){this.lines=[]}render(){const t=this.filtered();return o`
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
    `}};pe([x()],Vt.prototype,"clawId",2);pe([x()],Vt.prototype,"wsUrl",2);pe([l()],Vt.prototype,"lines",2);pe([l()],Vt.prototype,"level",2);pe([l()],Vt.prototype,"connState",2);pe([l()],Vt.prototype,"autoScroll",2);Vt=pe([I("ccl-claw-logs")],Vt);var Yo=Object.getOwnPropertyDescriptor,Jo=(t,e,s,a)=>{for(var i=a>1?void 0:a?Yo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=r(i)||i);return i};let ti=class extends S{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.saving=!1,this.error="",this.associated=[],this.allProjects=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="";try{const[t,e]=await Promise.all([K.projects(this.clawId),lt.list()]);this.associated=t,this.allProjects=e}catch(t){this.error=t.message??"Failed to load project associations"}finally{this.loading=!1}}}async associate(t){this.saving=!0;try{await K.associateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to associate project"}finally{this.saving=!1}}async unassociate(t){this.saving=!0;try{await K.unassociateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to remove project association"}finally{this.saving=!1}}render(){const t=new Set(this.associated.map(s=>s.id)),e=this.allProjects.filter(s=>!t.has(s.id));return o`
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
    `}};ti.properties={clawId:{type:String},loading:{state:!0},saving:{state:!0},error:{state:!0},associated:{state:!0},allProjects:{state:!0}};ti=Jo([I("ccl-claw-projects")],ti);var Xo=Object.getOwnPropertyDescriptor,Zo=(t,e,s,a)=>{for(var i=a>1?void 0:a?Xo(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=r(i)||i);return i};let ei=class extends S{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.error="",this.directories=[],this.selectedDirectoryId="",this.files=[],this.filesLoading=!1,this.selectedFilePath="",this.selectedFileContent="",this.fileLoading=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="",this.selectedDirectoryId="",this.files=[],this.selectedFilePath="",this.selectedFileContent="";try{this.directories=await K.directories(this.clawId),this.directories.length>0&&(this.selectedDirectoryId=this.directories[0].id,await this.loadFiles(this.selectedDirectoryId))}catch(t){this.error=t.message??"Failed to load workspace sync metadata"}finally{this.loading=!1}}}async loadFiles(t){if(t){this.filesLoading=!0,this.selectedFilePath="",this.selectedFileContent="";try{this.files=await K.directoryFiles(this.clawId,t)}catch(e){this.error=e.message??"Failed to load files",this.files=[]}finally{this.filesLoading=!1}}}async selectFile(t){if(!(!this.selectedDirectoryId||!t)){this.selectedFilePath=t,this.fileLoading=!0;try{const e=await K.directoryFileContent(this.clawId,this.selectedDirectoryId,t);this.selectedFileContent=e.content??""}catch(e){this.error=e.message??"Failed to load file content",this.selectedFileContent=""}finally{this.fileLoading=!1}}}badgeClass(t){return t==="synced"?"badge badge-green":t==="error"?"badge badge-red":"badge badge-yellow"}render(){const t=this.directories.find(e=>e.id===this.selectedDirectoryId)??null;return o`
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
    `}};ei.properties={clawId:{type:String},loading:{state:!0},error:{state:!0},directories:{state:!0},selectedDirectoryId:{state:!0},files:{state:!0},filesLoading:{state:!0},selectedFilePath:{state:!0},selectedFileContent:{state:!0},fileLoading:{state:!0}};ei=Zo([I("ccl-claw-workspace")],ei);var Qo=Object.defineProperty,tl=Object.getOwnPropertyDescriptor,N=(t,e,s,a)=>{for(var i=a>1?void 0:a?tl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&Qo(e,s,i),i};const el=[{id:"chat",label:"Chat"},{id:"agents",label:"Agents"},{id:"config",label:"Config"},{id:"sessions",label:"Sessions"},{id:"skills",label:"Skills"},{id:"usage",label:"Usage"},{id:"cron",label:"Cron"},{id:"nodes",label:"Nodes"},{id:"channels",label:"Channels"},{id:"projects",label:"Projects"},{id:"workspace",label:"Workspace"},{id:"logs",label:"Logs"}];let O=class extends S{constructor(){super(...arguments),this.refreshTimer=null,this.tenantId="",this.clawList=[],this.loading=!1,this.error="",this.showRegisterModal=!1,this.showManualRegister=!1,this.registerName="",this.registering=!1,this.registerError="",this.newClaw=null,this.apiKeyCopied=!1,this.pluginEnvCopied=!1,this.pluginEnvDownloaded=!1,this.panelOpen=!1,this.activeClaw=null,this.activeTab="chat",this.defaultClawId=null,this.savingDefaultClaw=!1,this.deleteConfirmId=null,this.deleting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadClaws(),this.startPresenceRefresh()}disconnectedCallback(){super.disconnectedCallback(),this.refreshTimer!==null&&(clearInterval(this.refreshTimer),this.refreshTimer=null)}async loadClaws(){this.loading=!0,this.error="";try{const[t,e]=await Promise.all([K.list(),this.tenantId?ot.defaultClaw(this.tenantId):Promise.resolve({defaultClawId:null})]);this.clawList=t,this.defaultClawId=e.defaultClawId}catch(t){this.error=t.message??"Failed to load claws"}finally{this.loading=!1}}async saveDefaultClaw(){if(this.tenantId){this.savingDefaultClaw=!0;try{const t=await ot.setDefaultClaw(this.tenantId,this.defaultClawId);this.defaultClawId=t.defaultClawId}catch(t){this.error=t.message??"Failed to save default claw"}finally{this.savingDefaultClaw=!1}}}startPresenceRefresh(){this.refreshTimer!==null&&clearInterval(this.refreshTimer),this.refreshTimer=setInterval(()=>{this.refreshPresence()},15e3)}async refreshPresence(){try{this.clawList=await K.list()}catch{}}openPanel(t){this.activeClaw=t,this.activeTab="chat",this.panelOpen=!0,document.body.style.overflow="hidden"}closePanel(){this.panelOpen=!1,document.body.style.overflow="",setTimeout(()=>{this.activeClaw=null},300)}async handleRegister(){if(this.registerName.trim()){this.registering=!0,this.registerError="";try{const t=await K.register(this.registerName.trim());this.newClaw=t,this.clawList=[...this.clawList,t],this.registerName=""}catch(t){this.registerError=t.message??"Registration failed"}finally{this.registering=!1}}}closeRegisterModal(){this.showRegisterModal=!1,this.showManualRegister=!1,this.newClaw=null,this.registerName="",this.registerError="",this.apiKeyCopied=!1,this.pluginEnvCopied=!1,this.pluginEnvDownloaded=!1}async copyApiKey(){if(this.newClaw)try{await navigator.clipboard.writeText(this.newClaw.apiKey),this.apiKeyCopied=!0,setTimeout(()=>{this.apiKeyCopied=!1},2e3)}catch{}}buildPluginEnvTemplate(){const t=U()??"",e=(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,""),s=this.newClaw?.name??"openclaw-node";return[`CODERCLAW_LINK_URL=${e}`,`CODERCLAW_LINK_TENANT_TOKEN=${t}`,`CODERCLAW_LINK_CLAW_NAME=${s}`,`CODERCLAW_LINK_CLAW_ID=${this.newClaw?.id??""}`,`CODERCLAW_LINK_API_KEY=${this.newClaw?.apiKey??""}`,"OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copyPluginEnvTemplate(){if(this.newClaw){if(!U()){this.registerError="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(this.buildPluginEnvTemplate()),this.pluginEnvCopied=!0,setTimeout(()=>{this.pluginEnvCopied=!1},2e3)}catch{this.registerError="Failed to copy plugin env file."}}}downloadPluginEnvTemplate(){if(this.newClaw){if(!U()){this.registerError="No tenant token found for current workspace session.";return}try{const t=this.buildPluginEnvTemplate(),e=new Blob([`${t}
`],{type:"text/plain;charset=utf-8"}),s=URL.createObjectURL(e),a=document.createElement("a");a.href=s,a.download="coderclawlink.env",a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(s),this.pluginEnvDownloaded=!0,setTimeout(()=>{this.pluginEnvDownloaded=!1},2e3)}catch{this.registerError="Failed to download plugin env file."}}}async handleDelete(t){this.deleting=!0;try{await K.remove(t),this.clawList=this.clawList.filter(e=>e.id!==t),this.deleteConfirmId=null,this.activeClaw?.id===t&&this.closePanel()}catch(e){this.error=e.message??"Delete failed"}finally{this.deleting=!1}}statusBadge(t){return t.status==="active"?o`<span class="badge badge-green">active</span>`:t.status==="suspended"?o`<span class="badge badge-red">suspended</span>`:o`<span class="badge badge-gray">${t.status}</span>`}connectedDot(t){const e=t.status==="active"&&t.connectedAt?"dot dot-green":"dot dot-gray";return o`<span class="${e}" title="${t.connectedAt?"connected":"offline"}"></span>`}renderRegisterModal(){return this.showRegisterModal?o`
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
    `}renderPanel(){if(!this.activeClaw)return o``;const t=this.activeClaw,e=K.wsUrl(t.id);return o`
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
          ${el.map(s=>o`
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
            <label style="font-size:12px;color:var(--muted)">Default claw</label>
            <select
              class="select"
              style="min-width:220px"
              .value=${this.defaultClawId==null?"":String(this.defaultClawId)}
              @change=${t=>{const e=t.target.value;this.defaultClawId=e?Number(e):null}}
            >
              <option value="">No default claw</option>
              ${this.clawList.map(t=>o`<option value=${t.id}>${t.name}</option>`)}
            </select>
            <button class="btn btn-secondary" @click=${this.saveDefaultClaw} ?disabled=${this.savingDefaultClaw||!this.tenantId}>
              ${this.savingDefaultClaw?"Saving…":"Save default"}
            </button>
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
    `}};N([x()],O.prototype,"tenantId",2);N([l()],O.prototype,"clawList",2);N([l()],O.prototype,"loading",2);N([l()],O.prototype,"error",2);N([l()],O.prototype,"showRegisterModal",2);N([l()],O.prototype,"showManualRegister",2);N([l()],O.prototype,"registerName",2);N([l()],O.prototype,"registering",2);N([l()],O.prototype,"registerError",2);N([l()],O.prototype,"newClaw",2);N([l()],O.prototype,"apiKeyCopied",2);N([l()],O.prototype,"pluginEnvCopied",2);N([l()],O.prototype,"pluginEnvDownloaded",2);N([l()],O.prototype,"panelOpen",2);N([l()],O.prototype,"activeClaw",2);N([l()],O.prototype,"activeTab",2);N([l()],O.prototype,"defaultClawId",2);N([l()],O.prototype,"savingDefaultClaw",2);N([l()],O.prototype,"deleteConfirmId",2);N([l()],O.prototype,"deleting",2);O=N([I("ccl-claws")],O);var sl=Object.defineProperty,il=Object.getOwnPropertyDescriptor,Jt=(t,e,s,a)=>{for(var i=a>1?void 0:a?il(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&sl(e,s,i),i};let Ot=class extends S{constructor(){super(...arguments),this.tenantId="",this.available=[],this.assigned=[],this.loading=!0,this.error="",this.search="",this.tab="assigned"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([ws.list().catch(()=>[]),xe.listTenant().catch(()=>[])]);this.available=t,this.assigned=e}catch(t){this.error=t.message}finally{this.loading=!1}}async assign(t){try{await xe.assignTenant(t),this.assigned=await xe.listTenant()}catch(e){this.error=e.message}}async unassign(t){try{await xe.unassignTenant(t),this.assigned=this.assigned.filter(e=>e.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}filteredAvailable(){const t=this.search.toLowerCase();return this.available.filter(e=>!t||e.name.toLowerCase().includes(t)||(e.description??"").toLowerCase().includes(t))}render(){const t=this.assignedSlugs();return o`
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
    `}};Jt([x()],Ot.prototype,"tenantId",2);Jt([l()],Ot.prototype,"available",2);Jt([l()],Ot.prototype,"assigned",2);Jt([l()],Ot.prototype,"loading",2);Jt([l()],Ot.prototype,"error",2);Jt([l()],Ot.prototype,"search",2);Jt([l()],Ot.prototype,"tab",2);Ot=Jt([I("ccl-skills")],Ot);var al=Object.defineProperty,nl=Object.getOwnPropertyDescriptor,A=(t,e,s,a)=>{for(var i=a>1?void 0:a?nl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&al(e,s,i),i};const rl=["owner","manager","developer","viewer"];let _=class extends S{constructor(){super(...arguments),this.tenant=null,this.initialTab="members",this.detail=null,this.loading=!0,this.error="",this.tab="members",this.subscription=null,this.usage=null,this.usageDays=30,this.availableClaws=[],this.defaultClawId=null,this.savingDefaultClaw=!1,this.updatingPlan=!1,this.billingCycle="monthly",this.billingEmail="",this.billingBrand="visa",this.billingLast4="",this.showTenantToken=!1,this.copiedTenantToken=!1,this.copiedPluginEnv=!1,this.downloadedPluginEnv=!1,this.showInvite=!1,this.inviteEmail="",this.inviteRole="developer",this.inviting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.tab=this.initialTab,this.load()}updated(t){t.has("initialTab")&&this.initialTab!==this.tab&&(this.tab=this.initialTab),t.has("tenant")&&this.tenant&&this.load()}async load(){if(this.tenant){this.loading=!0;try{const[t,e,s,a,i]=await Promise.all([ot.get(this.tenant.id),ot.subscription(this.tenant.id),$s.usage(this.usageDays),K.list(),ot.defaultClaw(this.tenant.id)]);this.detail=t,this.subscription=e,this.usage=s,this.availableClaws=a,this.defaultClawId=i.defaultClawId,this.billingEmail=e.billingEmail??"",this.billingBrand=e.billingPaymentBrand??"visa",this.billingLast4=e.billingPaymentLast4??"",this.billingCycle=e.billingCycle??"monthly"}catch(t){this.error=t.message}finally{this.loading=!1}}}canManageBilling(){const t=this.tenant?.role?.toLowerCase();return t==="owner"||t==="manager"}async saveDefaultClaw(){if(!(!this.tenant||!this.canManageBilling())){this.savingDefaultClaw=!0;try{const t=await ot.setDefaultClaw(this.tenant.id,this.defaultClawId);this.defaultClawId=t.defaultClawId}catch(t){this.error=t.message}finally{this.savingDefaultClaw=!1}}}async changePlanToPro(t){if(t.preventDefault(),!(!this.tenant||!this.canManageBilling())){this.updatingPlan=!0;try{await ot.upgradeToPro(this.tenant.id,{billingCycle:this.billingCycle,billingEmail:this.billingEmail,billingPaymentBrand:this.billingBrand,billingPaymentLast4:this.billingLast4}),await this.load()}catch(e){this.error=e.message}finally{this.updatingPlan=!1}}}async changePlanToFree(){if(!(!this.tenant||!this.canManageBilling())){this.updatingPlan=!0;try{await ot.downgradeToFree(this.tenant.id),await this.load()}catch(t){this.error=t.message}finally{this.updatingPlan=!1}}}async invite(t){if(t.preventDefault(),!(!this.tenant||!this.inviteEmail)){this.inviting=!0;try{await ot.inviteMember(this.tenant.id,this.inviteEmail,this.inviteRole),await this.load(),this.showInvite=!1,this.inviteEmail=""}catch(e){this.error=e.message}finally{this.inviting=!1}}}async removeMember(t){if(!(!this.tenant||!confirm("Remove this member?")))try{await ot.removeMember(this.tenant.id,t),await this.load()}catch(e){this.error=e.message}}roleBadge(t){return o`<span class="badge ${{owner:"badge-red",manager:"badge-yellow",developer:"badge-blue",viewer:"badge-gray"}[t]??"badge-gray"}">${t}</span>`}async copyTenantToken(){const t=U();if(!t){this.error="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(t),this.copiedTenantToken=!0,setTimeout(()=>{this.copiedTenantToken=!1},2e3)}catch(e){this.error=e.message}}buildPluginEnvTemplate(){const t=U()??"",e=(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,""),s=`openclaw-${(this.tenant?.slug??"node").replace(/[^a-z0-9-]/gi,"-")}`;return[`CODERCLAW_LINK_URL=${e}`,`CODERCLAW_LINK_TENANT_TOKEN=${t}`,`CODERCLAW_LINK_CLAW_NAME=${s}`,"CODERCLAW_LINK_CLAW_ID=","CODERCLAW_LINK_API_KEY=","OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copyPluginEnvTemplate(){if(!U()){this.error="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(this.buildPluginEnvTemplate()),this.copiedPluginEnv=!0,setTimeout(()=>{this.copiedPluginEnv=!1},2e3)}catch(e){this.error=e.message}}downloadPluginEnvTemplate(){if(!U()){this.error="No tenant token found for current workspace session.";return}try{const e=this.buildPluginEnvTemplate(),s=new Blob([`${e}
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
                    ${rl.filter(e=>e!=="owner").map(e=>o`<option value=${e}>${e}</option>`)}
                  </select></div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${()=>this.showInvite=!1}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.inviting}>${this.inviting?"Inviting…":"Send invite"}</button>
                </div>
              </form>
            </div>
          </div>`:""}
      </div>
    `}renderSettings(){const t=U()??"",e=this.subscription,s=this.usage,a=this.canManageBilling();return o`
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
    `}};A([x({type:Object})],_.prototype,"tenant",2);A([x({type:String})],_.prototype,"initialTab",2);A([l()],_.prototype,"detail",2);A([l()],_.prototype,"loading",2);A([l()],_.prototype,"error",2);A([l()],_.prototype,"tab",2);A([l()],_.prototype,"subscription",2);A([l()],_.prototype,"usage",2);A([l()],_.prototype,"usageDays",2);A([l()],_.prototype,"availableClaws",2);A([l()],_.prototype,"defaultClawId",2);A([l()],_.prototype,"savingDefaultClaw",2);A([l()],_.prototype,"updatingPlan",2);A([l()],_.prototype,"billingCycle",2);A([l()],_.prototype,"billingEmail",2);A([l()],_.prototype,"billingBrand",2);A([l()],_.prototype,"billingLast4",2);A([l()],_.prototype,"showTenantToken",2);A([l()],_.prototype,"copiedTenantToken",2);A([l()],_.prototype,"copiedPluginEnv",2);A([l()],_.prototype,"downloadedPluginEnv",2);A([l()],_.prototype,"showInvite",2);A([l()],_.prototype,"inviteEmail",2);A([l()],_.prototype,"inviteRole",2);A([l()],_.prototype,"inviting",2);_=A([I("ccl-workspace")],_);var ol=Object.defineProperty,ll=Object.getOwnPropertyDescriptor,Bt=(t,e,s,a)=>{for(var i=a>1?void 0:a?ll(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&ol(e,s,i),i};let St=class extends S{constructor(){super(...arguments),this.tenantId="",this.items=[],this.tasks=[],this.loading=!0,this.error="",this.filterTask="",this.filterStatus="",this.expanded=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.tasks]=await Promise.all([gi.list(),q.list().catch(()=>[])])}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){return this.items.filter(t=>!(this.filterTask&&t.taskId!==this.filterTask||this.filterStatus&&t.status!==this.filterStatus))}taskTitle(t){return this.tasks.find(e=>e.id===t)?.title??t}statusColor(t){return{completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"}[t]??"badge-gray"}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered();return o`
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
    `}};Bt([x()],St.prototype,"tenantId",2);Bt([l()],St.prototype,"items",2);Bt([l()],St.prototype,"tasks",2);Bt([l()],St.prototype,"loading",2);Bt([l()],St.prototype,"error",2);Bt([l()],St.prototype,"filterTask",2);Bt([l()],St.prototype,"filterStatus",2);Bt([l()],St.prototype,"expanded",2);St=Bt([I("ccl-logs")],St);var cl=Object.defineProperty,dl=Object.getOwnPropertyDescriptor,G=(t,e,s,a)=>{for(var i=a>1?void 0:a?dl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&cl(e,s,i),i};let F=class extends S{constructor(){super(...arguments),this.tab="health",this.health=null,this.users=[],this.tenants=[],this.errors=[],this.llmUsage=null,this.usageDays=30,this.loading=!1,this.errorMsg="",this.showAdminToken=!1,this.llmPoolTab="coderClawLLM",this.copiedAdminToken=!1,this.copiedAdminEnv=!1,this.downloadedAdminEnv=!1,this.impersonateUserId=null,this.impersonateTenants=[],this.expandedErrorId=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTab("health")}async loadTab(t){this.tab=t,this.loading=!0,this.errorMsg="";try{t==="health"?this.health=await Ft.health():t==="users"?this.users=await Ft.users():t==="tenants"?this.tenants=await Ft.tenants():t==="errors"?this.errors=await Ft.errors():t==="usage"&&(this.llmUsage=await Ft.llmUsage(this.usageDays))}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}finally{this.loading=!1}}async startImpersonate(t){this.tenants.length||(this.tenants=await Ft.tenants()),this.impersonateUserId=t,this.impersonateTenants=this.tenants}async doImpersonate(t){if(this.impersonateUserId)try{const e=await Ft.impersonate(this.impersonateUserId,t);hs(e.token),us(String(t)),this.impersonateUserId=null,this.dispatchEvent(new CustomEvent("ccl:impersonate",{bubbles:!0,composed:!0,detail:{tenantId:t}}))}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}}fmtCooldown(t){const e=Math.max(0,Math.ceil((t-Date.now())/1e3));return e>=60?`${Math.ceil(e/60)}m`:`${e}s`}fmtDate(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}fmtDateTime(t){return new Date(t).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}async copyAdminToken(){const t=Lt();if(!t){this.errorMsg="No superadmin web token found for this session.";return}try{await navigator.clipboard.writeText(t),this.copiedAdminToken=!0,setTimeout(()=>{this.copiedAdminToken=!1},2e3)}catch(e){this.errorMsg=e.message}}buildSuperadminEnvTemplate(){const t=Lt()??"";return[`CODERCLAW_LINK_URL=${(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,"")}`,`CODERCLAW_LINK_WEB_TOKEN=${t}`,"CODERCLAW_LINK_TENANT_TOKEN=","CODERCLAW_LINK_CLAW_NAME=openclaw-superadmin-node","CODERCLAW_LINK_CLAW_ID=","CODERCLAW_LINK_API_KEY=","OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copySuperadminEnvTemplate(){if(!Lt()){this.errorMsg="No superadmin web token found for this session.";return}try{await navigator.clipboard.writeText(this.buildSuperadminEnvTemplate()),this.copiedAdminEnv=!0,setTimeout(()=>{this.copiedAdminEnv=!1},2e3)}catch(e){this.errorMsg=e.message}}downloadSuperadminEnvTemplate(){if(!Lt()){this.errorMsg="No superadmin web token found for this session.";return}try{const e=this.buildSuperadminEnvTemplate(),s=new Blob([`${e}
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
          ${["health","usage","users","tenants","errors"].map(t=>o`
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
    `}renderTab(){return this.tab==="health"?this.renderHealth():this.tab==="usage"?this.renderUsage():this.tab==="users"?this.renderUsers():this.tab==="tenants"?this.renderTenants():this.tab==="errors"?this.renderErrors():o``}renderHealth(){const t=this.health,e=Lt()??"";if(!t)return o`<div class="loading-state">No data</div>`;const s=t.llm.models.filter(n=>n.model.toLowerCase().includes(":free")),a=t.llm.models.filter(n=>!n.model.toLowerCase().includes(":free")),i=this.llmPoolTab==="coderClawLLM"?s:a;return o`
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
            ${i.map(n=>{const r=n.available?"background:var(--success-bg,#d1fae5);color:var(--success-text,#065f46);border-color:var(--success-border,#6ee7b7)":"background:var(--error-bg,#fee2e2);color:var(--error-text,#991b1b);border-color:var(--error-border,#fca5a5)",p=n.available?"available":`cooldown ${this.fmtCooldown(n.cooldownUntil??0)}`,d=`${n.preferred?"★ ":""}${n.model} · ${p}`,m=n.available?`${n.preferred?"Preferred (round-robin). ":"Fallback. "}Available`:`On cooldown — available in ${this.fmtCooldown(n.cooldownUntil??0)}`;return o`<span class="model-chip" style="${r}" title="${m}">${d}</span>`})}
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
    `}};G([l()],F.prototype,"tab",2);G([l()],F.prototype,"health",2);G([l()],F.prototype,"users",2);G([l()],F.prototype,"tenants",2);G([l()],F.prototype,"errors",2);G([l()],F.prototype,"llmUsage",2);G([l()],F.prototype,"usageDays",2);G([l()],F.prototype,"loading",2);G([l()],F.prototype,"errorMsg",2);G([l()],F.prototype,"showAdminToken",2);G([l()],F.prototype,"llmPoolTab",2);G([l()],F.prototype,"copiedAdminToken",2);G([l()],F.prototype,"copiedAdminEnv",2);G([l()],F.prototype,"downloadedAdminEnv",2);G([l()],F.prototype,"impersonateUserId",2);G([l()],F.prototype,"impersonateTenants",2);G([l()],F.prototype,"expandedErrorId",2);F=G([I("ccl-admin")],F);var pl=Object.defineProperty,hl=Object.getOwnPropertyDescriptor,at=(t,e,s,a)=>{for(var i=a>1?void 0:a?hl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&pl(e,s,i),i};let Z=class extends S{constructor(){super(...arguments),this.tenantId="",this.page="tasks",this.open=!1,this.loadingContext=!1,this.contextError="",this.input="",this.sending=!1,this.contextSummary="",this.messages=[],this.actions=[],this.projects=[],this.tasks=[],this.claws=[],this.skills=[],this.msgEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.refreshContext()}updated(t){(t.has("tenantId")||t.has("page"))&&(this.contextError="",this.refreshContext()),this.msgEnd?.scrollIntoView({behavior:"smooth"})}pageLabel(){return{projects:"Projects",tasks:"Tasks",claws:"Claws",skills:"Skills",workspace:"Workspace",billing:"Billing",logs:"Logs"}[this.page]??this.page}async refreshContext(){this.loadingContext=!0,this.contextError="";try{if(this.page==="projects")this.projects=await lt.list(),this.contextSummary=`${this.projects.length} project${this.projects.length!==1?"s":""} in workspace`;else if(this.page==="tasks"){const[t,e]=await Promise.all([q.list(),lt.list()]);this.tasks=t,this.projects=e;const s=t.filter(a=>a.status!=="done").length;this.contextSummary=`${t.length} tasks · ${s} open`}else if(this.page==="claws"){this.claws=await K.list();const t=this.claws.filter(e=>e.status==="connected").length;this.contextSummary=`${this.claws.length} claws · ${t} connected`}else this.page==="skills"?(this.skills=await ws.list(),this.contextSummary=`${this.skills.length} skills available`):this.page==="workspace"||this.page==="billing"?this.contextSummary="Workspace explorer context":this.contextSummary="Execution and activity logs context"}catch(t){this.contextError=t instanceof Error?t.message:String(t)}finally{this.loadingContext=!1}}quickPrompt(t){if(t==="describe"){this.input=`Describe the current ${this.pageLabel().toLowerCase()} context and highlight key priorities.`;return}if(t==="prd"){this.input="Create a concise product requirements document (PRD) for the most important project in this workspace.";return}this.input="Generate an execution-ready task breakdown. Include actionable steps and add <ccl-actions> JSON to create tasks."}buildContextPayload(){return{page:this.page,tenantId:this.tenantId,summary:this.contextSummary,projects:this.projects.slice(0,40).map(t=>({id:t.id,key:t.key,name:t.name,status:t.status,description:t.description??""})),tasks:this.tasks.slice(0,80).map(t=>({id:t.id,key:t.key,title:t.title,status:t.status,priority:t.priority,projectId:t.projectId??null})),claws:this.claws.slice(0,40).map(t=>({id:t.id,name:t.name,status:t.status})),skills:this.skills.slice(0,60).map(t=>({id:t.id,slug:t.slug,name:t.name}))}}parseActions(t){const e=t.match(/<ccl-actions>([\s\S]*?)<\/ccl-actions>/i);if(!e)return[];try{const s=JSON.parse(e[1]);return Array.isArray(s.actions)?s.actions.filter(a=>a&&typeof a=="object"&&(a.type==="create_project"||a.type==="create_task")):[]}catch{return[]}}stripActions(t){return t.replace(/<ccl-actions>[\s\S]*?<\/ccl-actions>/gi,"").trim()}toChatMessages(){const t=this.messages.slice(-12).map(s=>({role:s.role,content:s.text}));return[{role:"system",content:["You are Brain, the first-class AI assistant inside CoderClawLink.",`You are currently helping on the ${this.pageLabel()} page.`,"Use the provided page context snapshot to give practical, execution-focused output.","When the user asks to create entities, include machine-readable actions in this exact format:",'<ccl-actions>{"actions":[...]}</ccl-actions>',"Allowed action types:","- create_project: { type, name, description? }","- create_task: { type, title, description?, projectId?, projectName?, projectKey?, priority?, status?, dueDate? }","If no actions are needed, do not output ccl-actions.","Be concise and concrete."].join(`
`)},{role:"system",content:`Page context JSON:
${JSON.stringify(this.buildContextPayload())}`},...t]}async send(){const t=this.input.trim();if(!t||this.sending)return;const e={id:crypto.randomUUID(),role:"user",text:t};this.messages=[...this.messages,e],this.input="",this.sending=!0;try{const a=(await $s.chat(this.toChatMessages(),{temperature:.25,maxTokens:1400})).choices?.[0]?.message?.content?.trim()??"I could not generate a response.",i=this.parseActions(a);i.length&&(this.actions=i.map(n=>({action:n,status:"idle"}))),this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:this.stripActions(a)||"Done."}]}catch(s){const a=s instanceof Error?s.message:String(s);this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:`Error: ${a}`}]}finally{this.sending=!1}}async applyAction(t){const e=this.actions[t];if(!(!e||e.status==="running")){this.actions=this.actions.map((s,a)=>a===t?{...s,status:"running",result:void 0}:s);try{if(e.action.type==="create_project"){const d=await lt.create({name:e.action.name,description:e.action.description});this.actions=this.actions.map((m,h)=>h===t?{...m,status:"done",result:`Created project ${d.key}`}:m),await this.refreshContext();return}const s=e.action,a=s.projectId?this.projects.find(d=>d.id===s.projectId):null,i=s.projectKey?this.projects.find(d=>d.key.toLowerCase()===s.projectKey?.toLowerCase()):null,n=s.projectName?this.projects.find(d=>d.name.toLowerCase()===s.projectName?.toLowerCase()):null,r=a??i??n??null,p=await q.create({title:s.title,description:s.description,projectId:r?.id,priority:s.priority??"medium",status:s.status??"todo",dueDate:s.dueDate});this.actions=this.actions.map((d,m)=>m===t?{...d,status:"done",result:`Created task ${p.key}`}:d),await this.refreshContext()}catch(s){const a=s instanceof Error?s.message:String(s);this.actions=this.actions.map((i,n)=>n===t?{...i,status:"error",result:a}:i)}}}async applyAll(){for(let t=0;t<this.actions.length;t++)(this.actions[t]?.status==="idle"||this.actions[t]?.status==="error")&&await this.applyAction(t)}clearChat(){this.messages=[],this.actions=[],this.input=""}renderMarkdown(t){const e=C.parse(t,{gfm:!0,breaks:!0}),s=typeof e=="string"?e:"",a=en.sanitize(s);return o`<div class="md-content">${ja(a)}</div>`}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}render(){return o`
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
    `}};at([x()],Z.prototype,"tenantId",2);at([x()],Z.prototype,"page",2);at([l()],Z.prototype,"open",2);at([l()],Z.prototype,"loadingContext",2);at([l()],Z.prototype,"contextError",2);at([l()],Z.prototype,"input",2);at([l()],Z.prototype,"sending",2);at([l()],Z.prototype,"contextSummary",2);at([l()],Z.prototype,"messages",2);at([l()],Z.prototype,"actions",2);at([l()],Z.prototype,"projects",2);at([l()],Z.prototype,"tasks",2);at([l()],Z.prototype,"claws",2);at([l()],Z.prototype,"skills",2);Z=at([I("ccl-brain")],Z);var ul=Object.defineProperty,gl=Object.getOwnPropertyDescriptor,vt=(t,e,s,a)=>{for(var i=a>1?void 0:a?gl(e,s):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&ul(e,s,i),i};let rt=class extends S{constructor(){super(...arguments),this.appState="loading",this.tab="home",this.selectedProjectId="",this.openProjectCreate=!1,this.pendingPrompt="",this.user=null,this.tenantList=[],this.tenant=null,this.theme="dark",this.navCollapsed=!1,this.handleUnauthorized=()=>{gs(),this.user=null,this.tenant=null,this.appState="landing"},this.handleExitAdmin=()=>{this.appState=this.tenant?"dashboard":"workspace-picker"},this.handleImpersonate=t=>{const e=String(t.detail.tenantId),s=this.tenantList.find(a=>String(a.id)===e);s?this.tenant=s:this.tenant={id:e,name:"Impersonated Workspace",slug:"",role:"viewer",status:"active"},this.appState="dashboard"},this.handleOpenProject=t=>{this.selectedProjectId=t.detail.projectId,this.tab="projects"},this.handleNewProject=()=>{this.openProjectCreate=!0,this.tab="projects"},this.handleNavigate=t=>{this.tab=t.detail.tab},this.handleDashboardPrompt=t=>{this.startDashboardScaffold(t.detail.prompt,t.detail.rootWorkingDirectory)}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTheme(),this.bootstrap(),window.addEventListener("ccl:unauthorized",this.handleUnauthorized),window.addEventListener("ccl:exit-admin",this.handleExitAdmin),window.addEventListener("ccl:impersonate",this.handleImpersonate),window.addEventListener("ccl:open-project",this.handleOpenProject),window.addEventListener("ccl:new-project",this.handleNewProject),window.addEventListener("ccl:navigate",this.handleNavigate),window.addEventListener("ccl:dashboard-prompt",this.handleDashboardPrompt)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ccl:unauthorized",this.handleUnauthorized),window.removeEventListener("ccl:exit-admin",this.handleExitAdmin),window.removeEventListener("ccl:impersonate",this.handleImpersonate),window.removeEventListener("ccl:open-project",this.handleOpenProject),window.removeEventListener("ccl:new-project",this.handleNewProject),window.removeEventListener("ccl:navigate",this.handleNavigate),window.removeEventListener("ccl:dashboard-prompt",this.handleDashboardPrompt)}updated(t){this.appState==="dashboard"&&(t.has("appState")||t.has("tab")||t.has("tenant"))&&this.mountDashboardView()}async bootstrap(){if(!Lt()){this.appState="landing";return}const e=U(),s=Ra();if(this.user=Na(),e&&s)try{const a=await Ht.listTenants();this.tenantList=a;const i=a.find(n=>n.id===s);if(i){this.tenant=i,this.appState="dashboard";return}}catch{}try{this.tenantList=await Ht.listTenants(),this.appState="workspace-picker"}catch{this.appState="auth"}}async handleLogin(t){const{token:e,user:s}=t.detail;Oa(e),Ma(s),this.user=s;try{this.tenantList=await Ht.listTenants(),this.appState="workspace-picker"}catch{this.appState="workspace-picker"}}async handleSelectTenant(t){const e=t.detail;try{const{token:s}=await Ht.tenantToken(e.id);hs(s),us(e.id),this.tenant=e,this.appState="dashboard"}catch(s){console.error("Failed to get tenant token",s)}}async handleCreateTenant(t){try{const e=await ot.create(t.detail.name),{token:s}=await Ht.tenantToken(e.id);hs(s),us(e.id),this.tenant=e,this.appState="dashboard"}catch(e){console.error("Failed to create tenant",e)}}handleSignOut(){gs(),this.user=null,this.tenant=null,this.tenantList=[],this.appState="landing"}handleSwitchWorkspace(){this.appState="workspace-picker"}async startDashboardScaffold(t,e){const s=t.trim();if(s)try{const a=await lt.scaffold({prompt:s,rootWorkingDirectory:e?.trim()||null}),n=`Scaffold: ${(s.split(/[.!?\n]/)[0]?.trim()||s).slice(0,120)}`;if(await q.create({title:n,description:s,projectId:a.project.id,assignedClawId:a.scaffold.clawId!=null?String(a.scaffold.clawId):void 0,priority:"high",status:"todo"}),a.scaffold.wip){this.selectedProjectId=a.project.id,this.tab="projects";return}this.selectedProjectId=a.project.id,this.tab="projects"}catch{this.pendingPrompt=s,this.tab="tasks"}}setTab(t){this.tab!==t&&(this.tab=t)}mountDashboardView(){const t=this.querySelector("#dashboard-view-host");if(!(t instanceof HTMLElement))return;const e=this.tenant?.id??"";let s;switch(this.tab){case"home":{const a=document.createElement("ccl-dashboard");a.tenantId=e,s=a;break}case"tasks":{const a=document.createElement("ccl-tasks");a.tenantId=e,this.pendingPrompt&&(a.openTaskPrompt=this.pendingPrompt,this.pendingPrompt=""),s=a;break}case"projects":{const a=document.createElement("ccl-projects");a.tenantId=e,this.selectedProjectId&&(a.selectedProjectId=this.selectedProjectId,this.selectedProjectId=""),this.openProjectCreate&&(a.openCreate=!0,this.openProjectCreate=!1),s=a;break}case"claws":{const a=document.createElement("ccl-claws");a.tenantId=e,s=a;break}case"skills":{const a=document.createElement("ccl-skills");a.tenantId=e,s=a;break}case"workspace":{const a=document.createElement("ccl-workspace");a.tenant=this.tenant,s=a;break}case"billing":{const a=document.createElement("ccl-workspace");a.tenant=this.tenant,a.initialTab="settings",s=a;break}case"logs":{const a=document.createElement("ccl-logs");a.tenantId=e,s=a;break}}t.replaceChildren(s)}loadTheme(){const t=localStorage.getItem("ccl-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;this.theme=t??(e?"dark":"light"),document.documentElement.dataset.theme=this.theme,this.navCollapsed=localStorage.getItem("ccl-nav-collapsed")==="1"}toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",document.documentElement.dataset.theme=this.theme,localStorage.setItem("ccl-theme",this.theme),this.requestUpdate()}toggleNav(){this.navCollapsed=!this.navCollapsed,localStorage.setItem("ccl-nav-collapsed",this.navCollapsed?"1":"0")}svgIcon(t){return`<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">${{home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',projects:'<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>',tasks:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',claws:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',skills:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',workspace:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>',logs:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',billing:'<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>',admin:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',panelLeft:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',chevronsLeft:'<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',chevronsRight:'<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>'}[t]??""}</svg>`}render(){return this.appState==="loading"?this.renderLoading():this.appState==="landing"?this.renderLanding():this.appState==="auth"?this.renderAuth():this.appState==="workspace-picker"?this.renderWorkspacePicker():this.appState==="admin"?this.renderAdmin():this.renderDashboard()}renderLoading(){return o`
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
    `}};rt.styles=$n``;vt([l()],rt.prototype,"appState",2);vt([l()],rt.prototype,"tab",2);vt([l()],rt.prototype,"selectedProjectId",2);vt([l()],rt.prototype,"openProjectCreate",2);vt([l()],rt.prototype,"pendingPrompt",2);vt([l()],rt.prototype,"user",2);vt([l()],rt.prototype,"tenantList",2);vt([l()],rt.prototype,"tenant",2);vt([l()],rt.prototype,"theme",2);vt([l()],rt.prototype,"navCollapsed",2);rt=vt([I("ccl-app")],rt);
//# sourceMappingURL=index-rDSId1G0.js.map
