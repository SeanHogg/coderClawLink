(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const Ft=globalThis,se=Ft.ShadowRoot&&(Ft.ShadyCSS===void 0||Ft.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ie=Symbol(),ge=new WeakMap;let De=class{constructor(e,s,i){if(this._$cssResult$=!0,i!==ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(se&&e===void 0){const i=s!==void 0&&s.length===1;i&&(e=ge.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ge.set(s,e))}return e}toString(){return this.cssText}};const qe=t=>new De(typeof t=="string"?t:t+"",void 0,ie),Ke=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((i,a,r)=>i+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[r+1],t[0]);return new De(s,t,ie)},Je=(t,e)=>{if(se)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const i=document.createElement("style"),a=Ft.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=s.cssText,t.appendChild(i)}},me=se?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const i of e.cssRules)s+=i.cssText;return qe(s)})(t):t;const{is:Ve,defineProperty:Ye,getOwnPropertyDescriptor:Ge,getOwnPropertyNames:Qe,getOwnPropertySymbols:Xe,getPrototypeOf:Ze}=Object,Gt=globalThis,be=Gt.trustedTypes,ts=be?be.emptyScript:"",es=Gt.reactiveElementPolyfillSupport,Dt=(t,e)=>t,Ht={toAttribute(t,e){switch(e){case Boolean:t=t?ts:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},ae=(t,e)=>!Ve(t,e),ye={attribute:!0,type:String,converter:Ht,reflect:!1,useDefault:!1,hasChanged:ae};Symbol.metadata??=Symbol("metadata"),Gt.litPropertyMetadata??=new WeakMap;let Pt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=ye){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,s);a!==void 0&&Ye(this.prototype,e,a)}}static getPropertyDescriptor(e,s,i){const{get:a,set:r}=Ge(this.prototype,e)??{get(){return this[s]},set(l){this[s]=l}};return{get:a,set(l){const h=a?.call(this);r?.call(this,l),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ye}static _$Ei(){if(this.hasOwnProperty(Dt("elementProperties")))return;const e=Ze(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Dt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Dt("properties"))){const s=this.properties,i=[...Qe(s),...Xe(s)];for(const a of i)this.createProperty(a,s[a])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[i,a]of s)this.elementProperties.set(i,a)}this._$Eh=new Map;for(const[s,i]of this.elementProperties){const a=this._$Eu(s,i);a!==void 0&&this._$Eh.set(a,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const a of i)s.unshift(me(a))}else e!==void 0&&s.push(me(e));return s}static _$Eu(e,s){const i=s.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Je(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,i){this._$AK(e,i)}_$ET(e,s){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:Ht).toAttribute(s,i.type);this._$Em=e,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,s){const i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const r=i.getPropertyOptions(a),l=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Ht;this._$Em=a;const h=l.fromAttribute(s,r.type);this[a]=h??this._$Ej?.get(a)??h,this._$Em=null}}requestUpdate(e,s,i,a=!1,r){if(e!==void 0){const l=this.constructor;if(a===!1&&(r=this[e]),i??=l.getPropertyOptions(e),!((i.hasChanged??ae)(r,s)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(l._$Eu(e,i))))return;this.C(e,s,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:i,reflect:a,wrapped:r},l){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,l??s??this[e]),r!==!0||l!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(s=void 0),this._$AL.set(e,s)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,r]of i){const{wrapped:l}=r,h=this[a];l!==!0||this._$AL.has(a)||h===void 0||this.C(a,void 0,r,h)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(s)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(e){}firstUpdated(e){}};Pt.elementStyles=[],Pt.shadowRootOptions={mode:"open"},Pt[Dt("elementProperties")]=new Map,Pt[Dt("finalized")]=new Map,es?.({ReactiveElement:Pt}),(Gt.reactiveElementVersions??=[]).push("2.1.2");const ne=globalThis,fe=t=>t,qt=ne.trustedTypes,we=qt?qt.createPolicy("lit-html",{createHTML:t=>t}):void 0,Oe="$lit$",ot=`lit$${Math.random().toFixed(9).slice(2)}$`,Me="?"+ot,ss=`<${Me}>`,bt=document,Ot=()=>bt.createComment(""),Mt=t=>t===null||typeof t!="object"&&typeof t!="function",re=Array.isArray,is=t=>re(t)||typeof t?.[Symbol.iterator]=="function",Zt=`[ 	
\f\r]`,jt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$e=/-->/g,xe=/>/g,gt=RegExp(`>|${Zt}(?:([^\\s"'>=/]+)(${Zt}*=${Zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ke=/'/g,Ce=/"/g,Ne=/^(?:script|style|textarea|title)$/i,as=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),n=as(1),Et=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),Te=new WeakMap,mt=bt.createTreeWalker(bt,129);function Re(t,e){if(!re(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return we!==void 0?we.createHTML(e):e}const ns=(t,e)=>{const s=t.length-1,i=[];let a,r=e===2?"<svg>":e===3?"<math>":"",l=jt;for(let h=0;h<s;h++){const d=t[h];let m,v,c=-1,x=0;for(;x<d.length&&(l.lastIndex=x,v=l.exec(d),v!==null);)x=l.lastIndex,l===jt?v[1]==="!--"?l=$e:v[1]!==void 0?l=xe:v[2]!==void 0?(Ne.test(v[2])&&(a=RegExp("</"+v[2],"g")),l=gt):v[3]!==void 0&&(l=gt):l===gt?v[0]===">"?(l=a??jt,c=-1):v[1]===void 0?c=-2:(c=l.lastIndex-v[2].length,m=v[1],l=v[3]===void 0?gt:v[3]==='"'?Ce:ke):l===Ce||l===ke?l=gt:l===$e||l===xe?l=jt:(l=gt,a=void 0);const T=l===gt&&t[h+1].startsWith("/>")?" ":"";r+=l===jt?d+ss:c>=0?(i.push(m),d.slice(0,c)+Oe+d.slice(c)+ot+T):d+ot+(c===-2?h:T)}return[Re(t,r+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Nt{constructor({strings:e,_$litType$:s},i){let a;this.parts=[];let r=0,l=0;const h=e.length-1,d=this.parts,[m,v]=ns(e,s);if(this.el=Nt.createElement(m,i),mt.currentNode=this.el.content,s===2||s===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(a=mt.nextNode())!==null&&d.length<h;){if(a.nodeType===1){if(a.hasAttributes())for(const c of a.getAttributeNames())if(c.endsWith(Oe)){const x=v[l++],T=a.getAttribute(c).split(ot),M=/([.?@])?(.*)/.exec(x);d.push({type:1,index:r,name:M[2],strings:T,ctor:M[1]==="."?os:M[1]==="?"?ls:M[1]==="@"?ds:Qt}),a.removeAttribute(c)}else c.startsWith(ot)&&(d.push({type:6,index:r}),a.removeAttribute(c));if(Ne.test(a.tagName)){const c=a.textContent.split(ot),x=c.length-1;if(x>0){a.textContent=qt?qt.emptyScript:"";for(let T=0;T<x;T++)a.append(c[T],Ot()),mt.nextNode(),d.push({type:2,index:++r});a.append(c[x],Ot())}}}else if(a.nodeType===8)if(a.data===Me)d.push({type:2,index:r});else{let c=-1;for(;(c=a.data.indexOf(ot,c+1))!==-1;)d.push({type:7,index:r}),c+=ot.length-1}r++}}static createElement(e,s){const i=bt.createElement("template");return i.innerHTML=e,i}}function _t(t,e,s=t,i){if(e===Et)return e;let a=i!==void 0?s._$Co?.[i]:s._$Cl;const r=Mt(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(t),a._$AT(t,s,i)),i!==void 0?(s._$Co??=[])[i]=a:s._$Cl=a),a!==void 0&&(e=_t(t,a._$AS(t,e.values),a,i)),e}class rs{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:i}=this._$AD,a=(e?.creationScope??bt).importNode(s,!0);mt.currentNode=a;let r=mt.nextNode(),l=0,h=0,d=i[0];for(;d!==void 0;){if(l===d.index){let m;d.type===2?m=new Rt(r,r.nextSibling,this,e):d.type===1?m=new d.ctor(r,d.name,d.strings,this,e):d.type===6&&(m=new cs(r,this,e)),this._$AV.push(m),d=i[++h]}l!==d?.index&&(r=mt.nextNode(),l++)}return mt.currentNode=bt,a}p(e){let s=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,s),s+=i.strings.length-2):i._$AI(e[s])),s++}}class Rt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,i,a){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=_t(this,e,s),Mt(e)?e===E||e==null||e===""?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==Et&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):is(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&Mt(this._$AH)?this._$AA.nextSibling.data=e:this.T(bt.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Nt.createElement(Re(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(s);else{const r=new rs(a,this),l=r.u(this.options);r.p(s),this.T(l),this._$AH=r}}_$AC(e){let s=Te.get(e.strings);return s===void 0&&Te.set(e.strings,s=new Nt(e)),s}k(e){re(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,a=0;for(const r of e)a===s.length?s.push(i=new Rt(this.O(Ot()),this.O(Ot()),this,this.options)):i=s[a],i._$AI(r),a++;a<s.length&&(this._$AR(i&&i._$AB.nextSibling,a),s.length=a)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const i=fe(e).nextSibling;fe(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Qt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,i,a,r){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=s,this._$AM=a,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=E}_$AI(e,s=this,i,a){const r=this.strings;let l=!1;if(r===void 0)e=_t(this,e,s,0),l=!Mt(e)||e!==this._$AH&&e!==Et,l&&(this._$AH=e);else{const h=e;let d,m;for(e=r[0],d=0;d<r.length-1;d++)m=_t(this,h[i+d],s,d),m===Et&&(m=this._$AH[d]),l||=!Mt(m)||m!==this._$AH[d],m===E?e=E:e!==E&&(e+=(m??"")+r[d+1]),this._$AH[d]=m}l&&!a&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class os extends Qt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}}class ls extends Qt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}}class ds extends Qt{constructor(e,s,i,a,r){super(e,s,i,a,r),this.type=5}_$AI(e,s=this){if((e=_t(this,e,s,0)??E)===Et)return;const i=this._$AH,a=e===E&&i!==E||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==E&&(i===E||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class cs{constructor(e,s,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){_t(this,e)}}const hs=ne.litHtmlPolyfillSupport;hs?.(Nt,Rt),(ne.litHtmlVersions??=[]).push("3.3.2");const ps=(t,e,s)=>{const i=s?.renderBefore??e;let a=i._$litPart$;if(a===void 0){const r=s?.renderBefore??null;i._$litPart$=a=new Rt(e.insertBefore(Ot(),r),r,void 0,s??{})}return a._$AI(t),a};const oe=globalThis;class g extends Pt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ps(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Et}}g._$litElement$=!0,g.finalized=!0,oe.litElementHydrateSupport?.({LitElement:g});const us=oe.litElementPolyfillSupport;us?.({LitElement:g});(oe.litElementVersions??=[]).push("4.2.2");const w=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};const vs={attribute:!0,type:String,converter:Ht,reflect:!1,hasChanged:ae},gs=(t=vs,e,s)=>{const{kind:i,metadata:a}=s;let r=globalThis.litPropertyMetadata.get(a);if(r===void 0&&globalThis.litPropertyMetadata.set(a,r=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),i==="accessor"){const{name:l}=s;return{set(h){const d=e.get.call(this);e.set.call(this,h),this.requestUpdate(l,d,t,!0,h)},init(h){return h!==void 0&&this.C(l,void 0,t,h),h}}}if(i==="setter"){const{name:l}=s;return function(h){const d=this[l];e.call(this,h),this.requestUpdate(l,d,t,!0,h)}}throw Error("Unsupported decorator location: "+i)};function u(t){return(e,s)=>typeof s=="object"?gs(t,e,s):((i,a,r)=>{const l=a.hasOwnProperty(r);return a.constructor.createProperty(r,i),l?Object.getOwnPropertyDescriptor(a,r):void 0})(t,e,s)}function o(t){return u({...t,state:!0,attribute:!1})}const Kt=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",le="ccl-web-token",de="ccl-tenant-token",ce="ccl-tenant-id",he="ccl-user";function Q(){return localStorage.getItem(le)}function k(){return localStorage.getItem(de)}function Ue(){return localStorage.getItem(ce)}function ze(t){localStorage.setItem(le,t)}function Jt(t){localStorage.setItem(de,t)}function Vt(t){localStorage.setItem(ce,t)}function Be(t){localStorage.setItem(he,JSON.stringify(t))}function We(){const t=localStorage.getItem(he);return t?JSON.parse(t):null}function Yt(){localStorage.removeItem(le),localStorage.removeItem(de),localStorage.removeItem(ce),localStorage.removeItem(he)}class pe extends Error{constructor(e,s){super(s),this.status=e}}async function p(t,e={}){const{token:s,...i}=e,a=s??k()??Q(),r=new Headers(i.headers);r.set("Content-Type","application/json"),a&&r.set("Authorization",`Bearer ${a}`);const l=await fetch(`${Kt}${t}`,{...i,headers:r});if(l.status===401&&(Yt(),window.dispatchEvent(new CustomEvent("ccl:unauthorized"))),!l.ok){let h=l.statusText;try{const d=await l.json();h=d.error??d.message??h}catch{}throw new pe(l.status,h)}if(l.status!==204)return l.json()}const lt={async register(t,e,s){return p("/api/auth/web/register",{method:"POST",body:JSON.stringify({email:t,username:e,password:s}),token:null})},async login(t,e){return p("/api/auth/web/login",{method:"POST",body:JSON.stringify({email:t,password:e}),token:null})},async tenantToken(t){return p("/api/auth/tenant-token",{method:"POST",body:JSON.stringify({tenantId:t})})},async listTenants(){return(await p("/api/tenants/mine")).tenants}},F={async create(t){return p("/api/tenants/create",{method:"POST",body:JSON.stringify({name:t})})},async get(t){return p(`/api/tenants/${t}`)},async inviteMember(t,e,s){return p(`/api/tenants/${t}/members`,{method:"POST",body:JSON.stringify({email:e,role:s})})},async removeMember(t,e){return p(`/api/tenants/${t}/members/${e}`,{method:"DELETE"})},async subscription(t){return p(`/api/tenants/${t}/subscription`)},async defaultClaw(t){return p(`/api/tenants/${t}/default-claw`)},async setDefaultClaw(t,e){return p(`/api/tenants/${t}/default-claw`,{method:"PUT",body:JSON.stringify({clawId:e})})},async upgradeToPro(t,e){return p(`/api/tenants/${t}/subscription/pro`,{method:"POST",body:JSON.stringify(e)})},async downgradeToFree(t){return p(`/api/tenants/${t}/subscription/free`,{method:"POST",body:JSON.stringify({})})}},N={async list(){return(await p("/api/projects")).projects},async create(t){return p("/api/projects",{method:"POST",body:JSON.stringify(t)})},async upsert(t){return p("/api/projects/upsert",{method:"POST",body:JSON.stringify(t)})},async scaffold(t){return p("/api/projects/scaffold",{method:"POST",body:JSON.stringify(t)})},async update(t,e){return p(`/api/projects/${t}`,{method:"PATCH",body:JSON.stringify(e)})},async remove(t){return p(`/api/projects/${t}`,{method:"DELETE"})}},L={async list(t){const e=new URLSearchParams;return t?.projectId&&e.set("projectId",t.projectId),t?.status&&e.set("status",t.status),t?.archived&&e.set("archived","true"),(await p(`/api/tasks${e.size?`?${e}`:""}`)).tasks.map(i=>({...i,assignedClawId:i.assignedClawId==null?void 0:String(i.assignedClawId)}))},async create(t){const e={...t,assignedClawId:t.assignedClawId===void 0?void 0:t.assignedClawId===""?null:Number(t.assignedClawId)},s=await p("/api/tasks",{method:"POST",body:JSON.stringify(e)});return{...s,assignedClawId:s.assignedClawId==null?void 0:String(s.assignedClawId)}},async update(t,e){const s={...e,assignedClawId:e.assignedClawId===void 0?void 0:e.assignedClawId===""?null:Number(e.assignedClawId)},i=await p(`/api/tasks/${t}`,{method:"PATCH",body:JSON.stringify(s)});return{...i,assignedClawId:i.assignedClawId==null?void 0:String(i.assignedClawId)}},async remove(t){return p(`/api/tasks/${t}`,{method:"DELETE"})},async run(t,e){return p("/api/runtime/executions",{method:"POST",body:JSON.stringify({taskId:Number(t),payload:e})})},async executions(t){return p(`/api/runtime/tasks/${t}/executions`)}},A={async list(){return(await p("/api/claws")).claws},async register(t){return p("/api/claws",{method:"POST",body:JSON.stringify({name:t})})},async remove(t){return p(`/api/claws/${t}`,{method:"DELETE"})},async projects(t){return(await p(`/api/claws/${t}/projects`)).projects},async associateProject(t,e){return p(`/api/claws/${t}/projects/${e}`,{method:"PUT"})},async unassociateProject(t,e){return p(`/api/claws/${t}/projects/${e}`,{method:"DELETE"})},async directories(t){return(await p(`/api/claws/${t}/directories`)).directories},async directoryFiles(t,e){return(await p(`/api/claws/${t}/directories/${e}/files`)).files},async directoryFileContent(t,e,s){return p(`/api/claws/${t}/directories/${e}/files/content?path=${encodeURIComponent(s)}`)},async status(t){return p(`/api/claws/${t}/status`)},wsUrl(t){const s=(typeof Kt=="string"?Kt:"https://api.coderclaw.ai").replace(/^http/,"ws"),i=k()??"";return`${s}/api/claws/${t}/ws?token=${encodeURIComponent(i)}`}},Xt={async list(){return(await p("/marketplace/skills")).skills}},St={async listTenant(){return(await p("/api/skill-assignments/tenant")).assignments},async assignTenant(t){return p("/api/skill-assignments/tenant",{method:"POST",body:JSON.stringify({slug:t})})},async unassignTenant(t){return p(`/api/skill-assignments/tenant/${t}`,{method:"DELETE"})},async assignClaw(t,e){return p(`/api/skill-assignments/claws/${t}`,{method:"POST",body:JSON.stringify({skillSlug:e})})}},ue={async list(t){const e=new URLSearchParams;return t?.taskId&&e.set("taskId",t.taskId),t?.clawId&&e.set("clawId",t.clawId),p(`/api/runtime/executions${e.size?`?${e}`:""}`)}},ve={async chat(t,e){const s=await fetch(`${Kt}/llm/v1/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",...k()?{Authorization:`Bearer ${k()}`}:{}},body:JSON.stringify({messages:t,stream:!1,temperature:e?.temperature,max_tokens:e?.maxTokens})});if(!s.ok){let i=s.statusText;try{const a=await s.json();i=a.error??a.message??i}catch{}throw new pe(s.status,i)}return s.json()},async usage(t=30){const e=new URLSearchParams;return e.set("days",String(t)),p(`/llm/v1/usage?${e.toString()}`)}};function Tt(t,e={}){return p(t,{...e,token:Q()})}const rt={async users(){return(await Tt("/api/admin/users")).users},async tenants(){return(await Tt("/api/admin/tenants")).tenants},async health(){return Tt("/api/admin/health")},async errors(){return(await Tt("/api/admin/errors")).errors},async impersonate(t,e){return Tt("/api/admin/impersonate",{method:"POST",body:JSON.stringify({userId:t,tenantId:e})})},async llmUsage(t=30){return Tt(`/api/admin/llm-usage?days=${t}`)}},Pe=Object.freeze(Object.defineProperty({__proto__:null,ApiError:pe,adminApi:rt,auth:lt,claws:A,clearSession:Yt,executions:ue,getTenantId:Ue,getTenantToken:k,getUser:We,getWebToken:Q,llm:ve,marketplace:Xt,projects:N,setTenantId:Vt,setTenantToken:Jt,setUser:Be,setWebToken:ze,skillAssignments:St,tasks:L,tenants:F},Symbol.toStringTag,{value:"Module"}));var ms=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,ut=(t,e,s,i)=>{for(var a=i>1?void 0:i?bs(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&ms(e,s,a),a};let X=class extends g{constructor(){super(...arguments),this.currentPm="npm",this.currentMode="oneliner",this.currentHackable="installer",this.currentBeta=!1,this.osPickerExpanded=!1,this.currentWinShell="powershell",this.copiedCommand=null,this.comments={oneliner:{stable:"# Works everywhere. Installs everything. You're welcome. 🦞",beta:"# Living on the edge. Bugs are features you found first. 🦞"},quickInstall:{stable:"# Install CoderClaw",beta:"# Install CoderClaw (beta) — Fresh from the lab 🧪"},quickOnboard:{stable:"# Meet your lobster",beta:"# Meet your experimental lobster"}},this.windowsPsCmd="iwr -useb https://coderclaw.ai/install.ps1 | iex",this.windowsPsBetaCmd="& ([scriptblock]::Create((iwr -useb https://coderclaw.ai/install.ps1))) -Tag beta",this.windowsCmdCmd="curl -fsSL https://coderclaw.ai/install.cmd -o install.cmd && install.cmd && del install.cmd",this.windowsCmdBetaCmd="curl -fsSL https://coderclaw.ai/install.cmd -o install.cmd && install.cmd --tag beta && del install.cmd",this._selectedOs=this.currentOs}createRenderRoot(){return this}get currentOs(){return navigator.userAgentData?.platform==="Windows"||navigator.userAgent.toLowerCase().includes("windows")?"windows":"unix"}get selectedOs(){return this._selectedOs}set selectedOs(t){this._selectedOs=t}get osLabel(){return this.selectedOs==="windows"?"Windows":"macOS/Linux"}get betaMode(){return this.currentBeta?"beta":"stable"}get onelinerCommand(){return this.selectedOs==="unix"?this.currentBeta?"curl -fsSL https://coderclaw.ai/install.sh | bash -s -- --beta":"curl -fsSL https://coderclaw.ai/install.sh | bash":this.currentWinShell==="cmd"?this.currentBeta?this.windowsCmdBetaCmd:this.windowsCmdCmd:this.currentBeta?this.windowsPsBetaCmd:this.windowsPsCmd}get quickInstallCommand(){const t=this.currentBeta?"@beta":"";return this.currentPm==="npm"?`npm i -g coderclaw${t}`:`pnpm add -g coderclaw${t}`}async copyCommand(t,e){let s=!1;try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(e),s=!0;else{const i=document.createElement("textarea");i.value=e,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i);try{i.select(),s=document.execCommand("copy")}finally{i.remove()}}}catch{s=!1}s&&(this.copiedCommand=t,window.setTimeout(()=>{this.copiedCommand===t&&(this.copiedCommand=null)},2e3))}renderCopyButton(t,e){const s=this.copiedCommand===t;return n`
      <button class="copy-line-btn ${s?"copied":""}" @click=${()=>this.copyCommand(t,e)} title="Copy">
        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style=${s?"display:none":""}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style=${s?"display:block":"display:none"}><polyline points="20 6 9 17 4 12"/></svg>
      </button>
    `}render(){const t=this.currentMode==="oneliner",e=this.currentMode==="quick",s=this.currentMode==="hackable",i=this.currentMode==="oneliner"||this.currentMode==="quick",a=t&&this.selectedOs==="windows";return n`
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
    `}};ut([o()],X.prototype,"currentPm",2);ut([o()],X.prototype,"currentMode",2);ut([o()],X.prototype,"currentHackable",2);ut([o()],X.prototype,"currentBeta",2);ut([o()],X.prototype,"osPickerExpanded",2);ut([o()],X.prototype,"currentWinShell",2);ut([o()],X.prototype,"copiedCommand",2);X=ut([w("ccl-quickstart")],X);var ys=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,tt=(t,e,s,i)=>{for(var a=i>1?void 0:i?fs(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&ys(e,s,a),a};let H=class extends g{constructor(){super(...arguments),this.mode="login",this.email="",this.username="",this.password="",this.loading=!1,this.error="",this.showRegisterQuickstart=!1,this.checkingQuickstartVisibility=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.refreshRegisterQuickstartVisibility()}updated(t){t.has("mode")&&this.refreshRegisterQuickstartVisibility()}async refreshRegisterQuickstartVisibility(){if(this.mode!=="register"){this.showRegisterQuickstart=!1;return}if(!this.checkingQuickstartVisibility){this.checkingQuickstartVisibility=!0;try{const t=await A.list();this.showRegisterQuickstart=t.length===0}catch{this.showRegisterQuickstart=!0}finally{this.checkingQuickstartVisibility=!1}}}async submit(t){if(t.preventDefault(),!(!this.email||!this.password)){this.loading=!0,this.error="";try{const e=this.mode==="login"?await lt.login(this.email,this.password):await lt.register(this.email,this.username||this.email.split("@")[0],this.password);this.dispatchEvent(new CustomEvent(this.mode==="register"?"register":"login",{detail:e,bubbles:!0,composed:!0}))}catch(e){this.error=e.message??"An error occurred"}finally{this.loading=!1}}}render(){return n`
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

        ${this.mode==="register"&&this.showRegisterQuickstart?n`
            <div style="margin-top:20px;width:min(980px,95vw)">
              <ccl-quickstart></ccl-quickstart>
            </div>
          `:""}
      </div>
    `}};tt([o()],H.prototype,"mode",2);tt([o()],H.prototype,"email",2);tt([o()],H.prototype,"username",2);tt([o()],H.prototype,"password",2);tt([o()],H.prototype,"loading",2);tt([o()],H.prototype,"error",2);tt([o()],H.prototype,"showRegisterQuickstart",2);tt([o()],H.prototype,"checkingQuickstartVisibility",2);H=tt([w("ccl-auth")],H);var ws=Object.defineProperty,$s=Object.getOwnPropertyDescriptor,wt=(t,e,s,i)=>{for(var a=i>1?void 0:i?$s(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&ws(e,s,a),a};let dt=class extends g{constructor(){super(...arguments),this.tenants=[],this.user=null,this.showCreate=!1,this.newName="",this.creating=!1,this.error=""}createRenderRoot(){return this}selectTenant(t){this.dispatchEvent(new CustomEvent("select-tenant",{detail:t,bubbles:!0,composed:!0}))}async createTenant(t){if(t.preventDefault(),!!this.newName.trim()){this.creating=!0,this.error="";try{this.dispatchEvent(new CustomEvent("create-tenant",{detail:{name:this.newName.trim()},bubbles:!0,composed:!0}))}catch(e){this.error=e.message,this.creating=!1}}}signOut(){this.dispatchEvent(new CustomEvent("sign-out",{bubbles:!0,composed:!0}))}render(){return n`
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
    `}};wt([u({type:Array})],dt.prototype,"tenants",2);wt([u({type:Object})],dt.prototype,"user",2);wt([o()],dt.prototype,"showCreate",2);wt([o()],dt.prototype,"newName",2);wt([o()],dt.prototype,"creating",2);wt([o()],dt.prototype,"error",2);dt=wt([w("ccl-workspace-picker")],dt);var xs=Object.defineProperty,ks=Object.getOwnPropertyDescriptor,$t=(t,e,s,i)=>{for(var a=i>1?void 0:i?ks(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&xs(e,s,a),a};let ct=class extends g{constructor(){super(...arguments),this.tenantId="",this.projects=[],this.claws=[],this.loading=!0,this.prompt="",this.rootWorkingDirectory=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([N.list().catch(()=>[]),A.list().catch(()=>[])]);this.projects=t,this.claws=e}finally{this.loading=!1}}dispatch(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e??{}}))}handlePrompt(t){t.preventDefault();const e=this.prompt.trim();e&&(this.dispatch("ccl:dashboard-prompt",{prompt:e,rootWorkingDirectory:this.rootWorkingDirectory.trim()||null}),this.prompt="")}statusBadge(t){return n`<span class="badge ${{active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"}[t]??"badge-gray"}">${t.replace("_"," ")}</span>`}render(){const t=this.claws.filter(e=>e.connectedAt);return n`
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
            ${t.length>0?n`${t.length} claw${t.length!==1?"s":""} connected
                  · ${t.map(e=>e.name).join(", ")}`:n`No claws connected —
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

          ${this.loading?n`<div style="color:var(--muted);font-size:13px;padding:12px 0">Loading…</div>`:this.projects.length===0?n`
                <div class="empty-state" style="padding:28px">
                  <div class="empty-state-icon">📁</div>
                  <div class="empty-state-title">No projects yet</div>
                  <div class="empty-state-sub">Create your first project to start organizing work</div>
                  <button class="btn btn-primary" style="margin-top:14px"
                    @click=${()=>this.dispatch("ccl:new-project")}>
                    Create project
                  </button>
                </div>`:n`
                <div class="grid grid-3">
                  ${this.projects.map(e=>n`
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
                      ${e.description?n`<div style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:8px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${e.description}</div>`:""}
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

          ${this.loading?n`<div style="color:var(--muted);font-size:13px;padding:12px 0">Loading…</div>`:this.claws.length===0?n`
                <div class="empty-state" style="padding:28px">
                  <div class="empty-state-icon">🦀</div>
                  <div class="empty-state-title">No claws registered</div>
                  <div class="empty-state-sub">Register a CoderClaw instance to start delegating work</div>
                  <button class="btn btn-primary" style="margin-top:14px"
                    @click=${()=>this.dispatch("ccl:navigate",{tab:"claws"})}>
                    Register a claw
                  </button>
                </div>`:n`
                <div class="grid grid-3">
                  ${this.claws.map(e=>n`
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
                      ${e.lastSeenAt?n`<div style="font-size:12px;color:var(--muted)">
                            Last seen ${new Date(e.lastSeenAt).toLocaleString()}
                          </div>`:n`<div style="font-size:12px;color:var(--muted)">Never connected</div>`}
                    </div>
                  `)}
                </div>`}
        </section>

      </div>
    `}};$t([u()],ct.prototype,"tenantId",2);$t([o()],ct.prototype,"projects",2);$t([o()],ct.prototype,"claws",2);$t([o()],ct.prototype,"loading",2);$t([o()],ct.prototype,"prompt",2);$t([o()],ct.prototype,"rootWorkingDirectory",2);ct=$t([w("ccl-dashboard")],ct);var Cs=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,U=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ts(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Cs(e,s,a),a};let D=class extends g{constructor(){super(...arguments),this.tenantId="",this.selectedProjectId="",this.openCreate=!1,this.items=[],this.selectedProject=null,this.loading=!0,this.error="",this.showModal=!1,this.editTarget=null,this.form={name:"",description:"",rootWorkingDirectory:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("openCreate")&&this.openCreate&&this.openCreateModal(),t.has("selectedProjectId")&&this.selectedProjectId&&this.items.length>0&&this.selectProject(this.selectedProjectId),t.has("items")&&this.selectedProjectId&&!this.selectedProject&&this.selectProject(this.selectedProjectId)}selectProject(t){const e=this.items.find(s=>String(s.id)===t)??null;this.selectedProject=e,e&&this.mountTasks(e)}async load(){this.loading=!0;try{this.items=await N.list()}catch(t){this.error=t.message}finally{this.loading=!1}}openCreateModal(){this.editTarget=null,this.form={name:"",description:"",rootWorkingDirectory:""},this.showModal=!0}openEdit(t){this.editTarget=t,this.form={name:t.name,description:t.description??"",rootWorkingDirectory:t.rootWorkingDirectory??""},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await N.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.selectedProject?.id===e.id&&(this.selectedProject=e)}else{const e=await N.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async removeProject(t){if(t?.id&&confirm(`Delete project "${t.name??"this project"}"? This cannot be undone.`))try{await N.remove(t.id),this.items=this.items.filter(e=>e.id!==t.id),this.selectedProject?.id===t.id&&(this.selectedProject=null)}catch(e){this.error=e.message}}mountTasks(t){requestAnimationFrame(()=>{const e=this.querySelector("#project-tasks-host");if(!e)return;const s=document.createElement("ccl-tasks");s.tenantId=this.tenantId,s.projectId=String(t.id),e.replaceChildren(s)})}statusBadge(t){return n`<span class="badge ${{active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"}[t]??"badge-gray"}">${t.replace("_"," ")}</span>`}render(){return this.selectedProject?this.renderDetail(this.selectedProject):this.renderList()}renderList(){return n`
      <div class="page-header">
        <div>
          <div class="page-title">Projects</div>
          <div class="page-sub">Organize work into projects</div>
        </div>
        <button class="btn btn-primary" @click=${this.openCreateModal}>
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
              <button class="btn btn-primary" style="margin-top:16px" @click=${this.openCreateModal}>Create project</button>
            </div>`:n`
            <div class="grid grid-3">
              ${this.items.map(t=>n`
                <div class="card" style="cursor:pointer;transition:border-color .15s"
                  @click=${()=>{this.selectedProject=t,this.mountTasks(t)}}
                  @mouseenter=${e=>{e.currentTarget.style.borderColor="var(--accent)"}}
                  @mouseleave=${e=>{e.currentTarget.style.borderColor=""}}>
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
                    <button class="btn btn-ghost btn-sm" @click=${e=>{e.stopPropagation(),this.openEdit(t)}}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${e=>{e.stopPropagation(),this.removeProject(t)}}>Delete</button>
                  </div>
                </div>
              `)}
            </div>`}

      ${this.showModal?this.renderModal():""}
    `}renderDetail(t){return n`
      <!-- Back breadcrumb -->
      <div style="margin-bottom:20px">
        <button class="btn btn-ghost btn-sm"
          style="display:inline-flex;align-items:center;gap:6px;color:var(--muted)"
          @click=${()=>{this.selectedProject=null}}>
          <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="15 18 9 12 15 6"/></svg>
          Projects
        </button>
      </div>

      <!-- Project header -->
      <div class="page-header" style="margin-bottom:24px">
        <div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="page-title">${t.name}</div>
            ${this.statusBadge(t.status)}
          </div>
          <div style="font-size:12px;font-family:var(--mono);color:var(--muted);margin-top:2px">${t.key}</div>
          ${t.description?n`<div style="font-size:13px;color:var(--muted);margin-top:6px;line-height:1.5">${t.description}</div>`:""}
          ${t.rootWorkingDirectory?n`<div style="font-size:12px;color:var(--muted);margin-top:6px">Root directory: ${t.rootWorkingDirectory}</div>`:n`<div style="font-size:12px;color:var(--muted);margin-top:6px">Root directory: not set</div>`}
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost btn-sm" @click=${()=>this.openEdit(t)}>Edit project</button>
          <button class="btn btn-danger btn-sm" @click=${()=>this.removeProject(t)}>Delete</button>
        </div>
      </div>

      ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

      <!-- Tasks host — populated imperatively via mountTasks() -->
      <div id="project-tasks-host"></div>

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
    `}};U([u()],D.prototype,"tenantId",2);U([u()],D.prototype,"selectedProjectId",2);U([u({type:Boolean})],D.prototype,"openCreate",2);U([o()],D.prototype,"items",2);U([o()],D.prototype,"selectedProject",2);U([o()],D.prototype,"loading",2);U([o()],D.prototype,"error",2);U([o()],D.prototype,"showModal",2);U([o()],D.prototype,"editTarget",2);U([o()],D.prototype,"form",2);U([o()],D.prototype,"saving",2);D=U([w("ccl-projects")],D);var Ps=Object.defineProperty,Ss=Object.getOwnPropertyDescriptor,$=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ss(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Ps(e,s,a),a};const Ut=["todo","in_progress","in_review","done","blocked"],Lt={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"},Se=["low","medium","high","critical"],Es={low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"};let f=class extends g{constructor(){super(...arguments),this.tenantId="",this.projectId="",this.openTaskPrompt="",this.items=[],this.projects=[],this.claws=[],this.loading=!0,this.error="",this.view="kanban",this.filterStatus="",this.filterProject="",this.filterPriority="",this.search="",this.showArchived=!1,this.showModal=!1,this.editTarget=null,this.form={},this.saving=!1,this.drawerTask=null,this.drawerExecutions=[],this.drawerTab="detail",this.running=!1,this.dragTaskId=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.projectId&&(this.filterProject=this.projectId),this.load()}updated(t){t.has("projectId")&&this.projectId&&(this.filterProject=this.projectId),t.has("openTaskPrompt")&&this.openTaskPrompt&&(this.editTarget=null,this.form={status:"todo",priority:"medium",title:this.openTaskPrompt,...this.projectId?{projectId:this.projectId}:{}},this.showModal=!0)}async load(){this.loading=!0;try{[this.items,this.projects,this.claws]=await Promise.all([L.list({archived:this.showArchived}),N.list(),A.list()])}catch(t){this.error=t.message}finally{this.loading=!1}}get filtered(){return this.items.filter(t=>!(this.filterStatus&&t.status!==this.filterStatus||this.filterProject&&t.projectId!==this.filterProject||this.filterPriority&&t.priority!==this.filterPriority||this.search&&!t.title.toLowerCase().includes(this.search.toLowerCase())))}tasksForStatus(t){return this.filtered.filter(e=>e.status===t)}openCreate(){this.editTarget=null,this.form={status:"todo",priority:"medium"},this.showModal=!0}openEdit(t,e){e?.stopPropagation(),this.editTarget=t,this.form={...t},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await L.update(this.editTarget.id,this.form);this.items=this.items.map(s=>s.id===e.id?e:s),this.drawerTask?.id===e.id&&(this.drawerTask=e)}else{const e=await L.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async removeTask(t,e){e?.stopPropagation(),t?.id&&confirm(`Delete "${t.title??"this task"}"?`)&&(await L.remove(t.id),this.items=this.items.filter(s=>s.id!==t.id),this.drawerTask?.id===t.id&&(this.drawerTask=null))}async patchStatus(t,e){const s=await L.update(t,{status:e});this.items=this.items.map(i=>i.id===t?s:i),this.drawerTask?.id===t&&(this.drawerTask=s)}async runTask(t,e){e.stopPropagation(),this.running=!0;try{const s=await L.run(t.id),i=await L.update(t.id,{status:"in_progress"});this.items=this.items.map(a=>a.id===i.id?i:a),this.drawerTask?.id===t.id&&(this.drawerTask=i,this.drawerExecutions=[s,...this.drawerExecutions])}catch(s){this.error=s.message}finally{this.running=!1}}async openDrawer(t){this.drawerTask=t,this.drawerTab="detail";try{this.drawerExecutions=await L.executions(t.id)}catch{this.drawerExecutions=[]}}closeDrawer(){this.drawerTask=null}dragStart(t){this.dragTaskId=t}dragOver(t){t.preventDefault()}async drop(t,e){t.preventDefault(),this.dragTaskId&&(await this.patchStatus(this.dragTaskId,e),this.dragTaskId="")}projectName(t){return t?this.projects.find(e=>e.id===t)?.name??t:"—"}clawName(t){return t?this.claws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return n`<span class="badge ${Es[t]}">${t}</span>`}statusBadge(t){return n`<span class="badge ${{todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red"}[t]}">${Lt[t]}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}render(){return n`
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
          ${Ut.map(t=>n`<option value=${t}>${Lt[t]}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterProject=t.target.value}}>
          <option value="">All projects</option>
          ${this.projects.map(t=>n`<option value=${t.id}>${t.name}</option>`)}
        </select>
        <select class="select" style="max-width:140px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterPriority=t.target.value}}>
          <option value="">All priorities</option>
          ${Se.map(t=>n`<option value=${t}>${t}</option>`)}
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
        ${Ut.map(t=>n`
          <div class="kanban-col"
            @dragover=${this.dragOver}
            @drop=${e=>this.drop(e,t)}>
            <div class="kanban-col-header">
              <div class="kanban-col-title">${Lt[t]}</div>
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
    `}renderGantt(){const t=this.filtered.filter(c=>c.dueDate||c.createdAt);if(t.length===0)return n`<div class="empty-state"><div class="empty-state-title">No tasks with dates</div><div class="empty-state-sub">Set due dates on tasks to see the timeline</div></div>`;const e=t.map(c=>new Date(c.dueDate??c.createdAt)),s=new Date(Math.min(...e.map(c=>c.getTime()))),i=new Date(Math.max(...e.map(c=>c.getTime())));s.setDate(1),i.setMonth(i.getMonth()+1),i.setDate(0);const a=Math.ceil((i.getTime()-s.getTime())/864e5)+1,r=24,l=a*r,h=[],d=new Date(s);for(;d<=i;){const c=Math.floor((d.getTime()-s.getTime())/864e5),x=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();h.push({label:d.toLocaleDateString(void 0,{month:"short",year:"2-digit"}),left:c*r,width:x*r}),d.setMonth(d.getMonth()+1),d.setDate(1)}const v=Math.floor((new Date().getTime()-s.getTime())/864e5)*r;return n`
      <div style="overflow-x:auto">
        <div style="min-width:${l+200}px">
          <!-- Month headers -->
          <div style="display:flex;margin-left:200px;border-bottom:1px solid var(--border)">
            ${h.map(c=>n`
              <div style="min-width:${c.width}px;padding:4px 8px;font-size:11px;color:var(--muted);border-right:1px solid var(--border)">${c.label}</div>
            `)}
          </div>
          <!-- Tasks -->
          <div style="position:relative">
            <!-- Today line -->
            ${v>=0&&v<=l?n`
              <div style="position:absolute;left:${200+v}px;top:0;bottom:0;width:2px;background:var(--accent);opacity:0.6;z-index:1"></div>
            `:""}

            ${t.map(c=>{const x=new Date(c.createdAt),T=new Date(c.dueDate??c.createdAt),M=Math.floor((x.getTime()-s.getTime())/864e5),Ct=Math.max(1,Math.ceil((T.getTime()-x.getTime())/864e5)),He={done:"var(--ok)",in_progress:"var(--accent)",blocked:"var(--danger)",in_review:"var(--warn)",todo:"var(--muted)"};return n`
                <div style="display:flex;align-items:center;border-bottom:1px solid var(--border);height:40px">
                  <div style="width:200px;flex-shrink:0;padding:0 12px;font-size:12px;font-weight:500;color:var(--text);truncate">
                    ${c.title}
                  </div>
                  <div style="flex:1;position:relative;height:100%">
                    <div
                      style="position:absolute;top:8px;height:24px;
                        left:${M*r}px;
                        width:${Ct*r}px;
                        background:${He[c.status]??"var(--muted)"};
                        opacity:0.8;border-radius:4px;cursor:pointer;
                        display:flex;align-items:center;padding:0 8px;
                        font-size:10px;font-weight:600;color:#fff;
                        white-space:nowrap;overflow:hidden"
                      @click=${()=>this.openDrawer(c)}
                      title="${c.title}"
                    >
                      ${c.key}
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
                  ${Ut.map(t=>n`<option value=${t}>${Lt[t]}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Priority</label>
                <select class="select" .value=${this.form.priority??"medium"}
                  @change=${t=>{this.form={...this.form,priority:t.target.value}}}>
                  ${Se.map(t=>n`<option value=${t}>${t}</option>`)}
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
            ${Ut.filter(e=>e!==t.status).map(e=>n`
              <button class="btn btn-secondary btn-sm"
                @click=${()=>this.patchStatus(t.id,e)}>${Lt[e]}</button>
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
    `}};$([u()],f.prototype,"tenantId",2);$([u()],f.prototype,"projectId",2);$([u()],f.prototype,"openTaskPrompt",2);$([o()],f.prototype,"items",2);$([o()],f.prototype,"projects",2);$([o()],f.prototype,"claws",2);$([o()],f.prototype,"loading",2);$([o()],f.prototype,"error",2);$([o()],f.prototype,"view",2);$([o()],f.prototype,"filterStatus",2);$([o()],f.prototype,"filterProject",2);$([o()],f.prototype,"filterPriority",2);$([o()],f.prototype,"search",2);$([o()],f.prototype,"showArchived",2);$([o()],f.prototype,"showModal",2);$([o()],f.prototype,"editTarget",2);$([o()],f.prototype,"form",2);$([o()],f.prototype,"saving",2);$([o()],f.prototype,"drawerTask",2);$([o()],f.prototype,"drawerExecutions",2);$([o()],f.prototype,"drawerTab",2);$([o()],f.prototype,"running",2);$([o()],f.prototype,"dragTaskId",2);f=$([w("ccl-tasks")],f);const Ee=[800,1500,3e3,5e3,1e4,15e3];class Fe{constructor(e){this.opts=e,this.ws=null,this.attempt=0,this.destroyed=!1,this.pingInterval=null,this.connect()}connect(){this.destroyed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>{this.attempt=0,this.schedulePings(),this.opts.onEvent({type:"connected"})}),this.ws.addEventListener("message",e=>{let s;try{s=JSON.parse(e.data)}catch{s=e.data}if(s&&typeof s=="object"&&s.type==="claw_offline"){this.opts.onEvent({type:"claw_offline"});return}this.opts.onEvent({type:"message",data:s})}),this.ws.addEventListener("close",e=>{this.clearPings(),!this.destroyed&&(this.opts.onEvent({type:"disconnected",code:e.code,reason:e.reason}),this.scheduleReconnect())}),this.ws.addEventListener("error",()=>{}))}send(e){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(e))}destroy(){this.destroyed=!0,this.clearPings(),this.ws?.close(1e3,"destroyed"),this.ws=null}get readyState(){return this.ws?.readyState??WebSocket.CLOSED}schedulePings(){this.clearPings(),this.pingInterval=setInterval(()=>{this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"ping"}))},3e4)}clearPings(){this.pingInterval!==null&&(clearInterval(this.pingInterval),this.pingInterval=null)}scheduleReconnect(){const e=Ee[Math.min(this.attempt,Ee.length-1)];this.attempt++,setTimeout(()=>this.connect(),e)}}var _s=Object.defineProperty,As=Object.getOwnPropertyDescriptor,et=(t,e,s,i)=>{for(var a=i>1?void 0:i?As(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&_s(e,s,a),a};let q=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.messages=[],this.tools=[],this.input="",this.connState="connecting",this.session="default",this.streaming=!1,this.gw=null,this.msgEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.scrollToBottom()}connect(){this.connState="connecting",this.gw=new Fe({url:this.wsUrl,onEvent:t=>this.handleGwEvent(t)})}handleGwEvent(t){if(t.type==="connected"){this.connState="connected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type!=="message")return;const e=t.data;switch(e.type){case"chat.message":{if(e.role==="user")this.messages=[...this.messages,{id:crypto.randomUUID(),role:"user",text:e.text??""}];else{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:e.text??"",streaming:!1}]:this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.text??""}],this.streaming=!1}break}case"chat.delta":{const s=this.messages.at(-1);s?.role==="assistant"&&s.streaming?this.messages=[...this.messages.slice(0,-1),{...s,text:s.text+(e.delta??"")}]:(this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.delta??"",streaming:!0}],this.streaming=!0);break}case"tool.start":{this.tools=[...this.tools,{id:e.toolCallId??crypto.randomUUID(),name:e.toolName??"tool",input:e.toolInput,expanded:!1}];break}case"tool.result":{this.tools=this.tools.map(s=>s.id===e.toolCallId?{...s,result:e.toolResult}:s);break}case"chat.abort":this.streaming=!1;break}}send(){const t=this.input.trim();!t||this.connState!=="connected"||(this.gw?.send({type:"chat",message:t,session:this.session}),this.input="")}abort(){this.gw?.send({type:"chat.abort"}),this.streaming=!1}newChat(){this.messages=[],this.tools=[],this.streaming=!1,this.gw?.send({type:"session.new"})}scrollToBottom(){this.msgEnd?.scrollIntoView({behavior:"smooth"})}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}connDot(){return n`<span class="dot ${{connected:"dot-green",connecting:"dot-yellow",offline:"dot-red",disconnected:"dot-gray"}[this.connState]}"></span> ${this.connState}`}render(){return n`
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
    `}};et([u()],q.prototype,"clawId",2);et([u()],q.prototype,"wsUrl",2);et([o()],q.prototype,"messages",2);et([o()],q.prototype,"tools",2);et([o()],q.prototype,"input",2);et([o()],q.prototype,"connState",2);et([o()],q.prototype,"session",2);et([o()],q.prototype,"streaming",2);q=et([w("ccl-claw-chat")],q);var Is=Object.defineProperty,js=Object.getOwnPropertyDescriptor,st=(t,e,s,i)=>{for(var a=i>1?void 0:i?js(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Is(e,s,a),a};const Ls=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function zt(t,e={}){const s=await fetch(`${Ls}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${k()??""}`,...e.headers??{}}});if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}const Ds=["claude","openai","ollama","http"];let K=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.agents=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",type:"claude",endpoint:"",apiKey:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.agents=await zt("/api/agents")}catch(t){this.error=t.message}finally{this.loading=!1}}async toggleActive(t){try{await zt(`/api/agents/${t.id}`,{method:"PATCH",body:JSON.stringify({isActive:!t.isActive})}),this.agents=this.agents.map(e=>e.id===t.id?{...e,isActive:!e.isActive}:e)}catch(e){this.error=e.message}}async removeAgent(t){if(confirm(`Delete agent "${t.name}"?`))try{await zt(`/api/agents/${t.id}`,{method:"DELETE"}),this.agents=this.agents.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await zt("/api/agents",{method:"POST",body:JSON.stringify(this.form)});this.agents=[e,...this.agents],this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}render(){return n`
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
                  <button class="btn btn-danger btn-sm" @click=${()=>this.removeAgent(t)}>Delete</button>
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
                    ${Ds.map(t=>n`<option value=${t}>${t}</option>`)}
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
    `}};st([u()],K.prototype,"clawId",2);st([u()],K.prototype,"wsUrl",2);st([o()],K.prototype,"agents",2);st([o()],K.prototype,"loading",2);st([o()],K.prototype,"error",2);st([o()],K.prototype,"showModal",2);st([o()],K.prototype,"form",2);st([o()],K.prototype,"saving",2);K=st([w("ccl-claw-agents")],K);var Os=Object.defineProperty,Ms=Object.getOwnPropertyDescriptor,B=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ms(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Os(e,s,a),a};const Ns=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function _e(t,e={}){const s=await fetch(`${Ns}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${k()??""}`,...e.headers??{}}});if(s.status===404)return{};if(!s.ok)throw new Error(await s.text());if(s.status!==204)return s.json()}let R=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.config={},this.loading=!0,this.error="",this.editing=!1,this.draft={},this.saving=!1,this.newKey="",this.newVal=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await _e(`/api/claws/${this.clawId}/config`);this.config=t??{}}catch(t){this.error=t.message}finally{this.loading=!1}}startEdit(){this.draft={...this.config},this.editing=!0}cancel(){this.editing=!1,this.draft={}}async save(){this.saving=!0;try{await _e(`/api/claws/${this.clawId}/config`,{method:"PATCH",body:JSON.stringify(this.draft)}),this.config={...this.draft},this.editing=!1}catch(t){this.error=t.message}finally{this.saving=!1}}addField(){this.newKey.trim()&&(this.draft={...this.draft,[this.newKey.trim()]:this.newVal},this.newKey="",this.newVal="")}removeField(t){const e={...this.draft};delete e[t],this.draft=e}render(){const t=Object.entries(this.editing?this.draft:this.config);return n`
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
    `}};B([u()],R.prototype,"clawId",2);B([u()],R.prototype,"wsUrl",2);B([o()],R.prototype,"config",2);B([o()],R.prototype,"loading",2);B([o()],R.prototype,"error",2);B([o()],R.prototype,"editing",2);B([o()],R.prototype,"draft",2);B([o()],R.prototype,"saving",2);B([o()],R.prototype,"newKey",2);B([o()],R.prototype,"newVal",2);R=B([w("ccl-claw-config")],R);var Rs=Object.defineProperty,Us=Object.getOwnPropertyDescriptor,At=(t,e,s,i)=>{for(var a=i>1?void 0:i?Us(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Rs(e,s,a),a};const zs=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Ae(t,e={}){const s=await fetch(`${zs}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${k()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let yt=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.sessions=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Ae(`/api/claws/${this.clawId}/sessions`);this.sessions=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async removeSession(t){if(confirm("Delete this session?"))try{await Ae(`/api/claws/${this.clawId}/sessions/${t.id}`,{method:"DELETE"}),this.sessions=this.sessions.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){return n`
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
                  <button class="btn btn-danger btn-sm" @click=${()=>this.removeSession(t)}>Delete</button>
                </div>
              </div>
            `)}
      </div>
    `}};At([u()],yt.prototype,"clawId",2);At([u()],yt.prototype,"wsUrl",2);At([o()],yt.prototype,"sessions",2);At([o()],yt.prototype,"loading",2);At([o()],yt.prototype,"error",2);yt=At([w("ccl-claw-sessions")],yt);const Bs="modulepreload",Ws=function(t,e){return new URL(t,e).href},Ie={},je=function(e,s,i){let a=Promise.resolve();if(s&&s.length>0){let m=function(v){return Promise.all(v.map(c=>Promise.resolve(c).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};const l=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),d=h?.nonce||h?.getAttribute("nonce");a=m(s.map(v=>{if(v=Ws(v,i),v in Ie)return;Ie[v]=!0;const c=v.endsWith(".css"),x=c?'[rel="stylesheet"]':"";if(i)for(let M=l.length-1;M>=0;M--){const Ct=l[M];if(Ct.href===v&&(!c||Ct.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${v}"]${x}`))return;const T=document.createElement("link");if(T.rel=c?"stylesheet":Bs,c||(T.as="script"),T.crossOrigin="",T.href=v,d&&T.setAttribute("nonce",d),document.head.appendChild(T),c)return new Promise((M,Ct)=>{T.addEventListener("load",M),T.addEventListener("error",()=>Ct(new Error(`Unable to preload CSS for ${v}`)))})}))}function r(l){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=l,window.dispatchEvent(h),!h.defaultPrevented)throw l}return a.then(l=>{for(const h of l||[])h.status==="rejected"&&r(h.reason);return e().catch(r)})};var Fs=Object.defineProperty,Hs=Object.getOwnPropertyDescriptor,it=(t,e,s,i)=>{for(var a=i>1?void 0:i?Hs(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Fs(e,s,a),a};let J=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.assigned=[],this.available=[],this.loading=!0,this.error="",this.showModal=!1,this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([this.loadAssigned(),Xt.list().catch(()=>[])]);this.assigned=t,this.available=e}catch(t){this.error=t.message}finally{this.loading=!1}}async loadAssigned(){try{const{getTenantToken:t}=await je(async()=>{const{getTenantToken:a}=await Promise.resolve().then(()=>Pe);return{getTenantToken:a}},void 0,import.meta.url),e=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",s=await fetch(`${e}/api/skill-assignments/claws/${this.clawId}`,{headers:{Authorization:`Bearer ${t()??""}`}});return s.ok?((await s.json()).assignments??[]).map(a=>({slug:a.skillSlug,name:a.skillName??a.skillSlug,assignedAt:a.assignedAt})):[]}catch{return[]}}async assign(t){this.saving=!0;try{await St.assignClaw(this.clawId,t),this.assigned=await this.loadAssigned(),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async unassign(t){try{const{getTenantToken:e}=await je(async()=>{const{getTenantToken:i}=await Promise.resolve().then(()=>Pe);return{getTenantToken:i}},void 0,import.meta.url),s=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";await fetch(`${s}/api/skill-assignments/claws/${this.clawId}/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${e()??""}`}}),this.assigned=this.assigned.filter(i=>i.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}render(){const t=this.assignedSlugs(),e=this.available.filter(s=>!t.has(s.slug));return n`
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
    `}};it([u()],J.prototype,"clawId",2);it([u()],J.prototype,"wsUrl",2);it([o()],J.prototype,"assigned",2);it([o()],J.prototype,"available",2);it([o()],J.prototype,"loading",2);it([o()],J.prototype,"error",2);it([o()],J.prototype,"showModal",2);it([o()],J.prototype,"saving",2);J=it([w("ccl-claw-skills")],J);var qs=Object.defineProperty,Ks=Object.getOwnPropertyDescriptor,xt=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ks(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&qs(e,s,a),a};let ht=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.items=[],this.loading=!0,this.error="",this.timeFilter="week"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{this.items=await ue.list({clawId:this.clawId})}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){const t=Date.now(),s={today:864e5,week:6048e5,month:2592e6,all:1/0}[this.timeFilter];return this.items.filter(i=>t-new Date(i.createdAt).getTime()<s)}stats(t){const e=t.length,s=t.filter(r=>r.status==="completed").length,i=t.filter(r=>r.status==="failed").length,a=t.filter(r=>r.status==="running").length;return{total:e,completed:s,failed:i,running:a}}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered(),e=this.stats(t),s={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return n`
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
    `}};xt([u()],ht.prototype,"clawId",2);xt([u()],ht.prototype,"wsUrl",2);xt([o()],ht.prototype,"items",2);xt([o()],ht.prototype,"loading",2);xt([o()],ht.prototype,"error",2);xt([o()],ht.prototype,"timeFilter",2);ht=xt([w("ccl-claw-usage")],ht);var Js=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,at=(t,e,s,i)=>{for(var a=i>1?void 0:i?Vs(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Js(e,s,a),a};const Ys=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Bt(t,e={}){const s=await fetch(`${Ys}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${k()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let V=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.jobs=[],this.loading=!0,this.error="",this.showModal=!1,this.form={name:"",schedule:"0 9 * * 1-5",taskId:""},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Bt(`/api/claws/${this.clawId}/cron`);this.jobs=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await Bt(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.jobs=this.jobs.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async removeCronJob(t){if(confirm(`Delete cron job "${t.name}"?`))try{await Bt(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"DELETE"}),this.jobs=this.jobs.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Bt(`/api/claws/${this.clawId}/cron`,{method:"POST",body:JSON.stringify(this.form)});e&&(this.jobs=[e,...this.jobs]),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return n`
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
                  <button class="btn btn-danger btn-sm" @click=${()=>this.removeCronJob(t)}>Delete</button>
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
    `}};at([u()],V.prototype,"clawId",2);at([u()],V.prototype,"wsUrl",2);at([o()],V.prototype,"jobs",2);at([o()],V.prototype,"loading",2);at([o()],V.prototype,"error",2);at([o()],V.prototype,"showModal",2);at([o()],V.prototype,"form",2);at([o()],V.prototype,"saving",2);V=at([w("ccl-claw-cron")],V);var Gs=Object.defineProperty,Qs=Object.getOwnPropertyDescriptor,It=(t,e,s,i)=>{for(var a=i>1?void 0:i?Qs(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Gs(e,s,a),a};const Xs=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Le(t,e={}){const s=await fetch(`${Xs}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${k()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}let ft=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.nodes=[],this.loading=!0,this.error=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Le(`/api/claws/${this.clawId}/nodes`);this.nodes=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async unpair(t){if(confirm(`Unpair node "${t.name??t.id}"?`))try{await Le(`/api/claws/${this.clawId}/nodes/${t.id}`,{method:"DELETE"}),this.nodes=this.nodes.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return n`
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
    `}};It([u()],ft.prototype,"clawId",2);It([u()],ft.prototype,"wsUrl",2);It([o()],ft.prototype,"nodes",2);It([o()],ft.prototype,"loading",2);It([o()],ft.prototype,"error",2);ft=It([w("ccl-claw-nodes")],ft);var Zs=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,G=(t,e,s,i)=>{for(var a=i>1?void 0:i?ti(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Zs(e,s,a),a};const ei=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Wt(t,e={}){const s=await fetch(`${ei}${t}`,{...e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${k()??""}`,...e.headers??{}}});if(s.status===404||s.status===204)return null;if(!s.ok)throw new Error(await s.text());return s.json()}const si=["discord","slack","telegram","whatsapp","signal","googlechat","nostr"],ii={discord:[{key:"token",label:"Bot Token",type:"password"},{key:"guildId",label:"Guild ID"}],slack:[{key:"botToken",label:"Bot Token",type:"password"},{key:"appToken",label:"App Token",type:"password"}],telegram:[{key:"token",label:"Bot Token",type:"password"}],whatsapp:[{key:"phoneNumberId",label:"Phone Number ID"},{key:"accessToken",label:"Access Token",type:"password"}],signal:[{key:"phone",label:"Phone Number"}],googlechat:[{key:"serviceAccountKey",label:"Service Account Key (JSON)",type:"password"}],nostr:[{key:"privateKey",label:"Private Key (nsec)",type:"password"},{key:"relays",label:"Relay URLs (comma-separated)"}]};let z=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.channels=[],this.loading=!0,this.error="",this.showModal=!1,this.selectedType="discord",this.form={},this.saving=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Wt(`/api/claws/${this.clawId}/channels`);this.channels=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await Wt(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.channels=this.channels.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async removeChannel(t){if(confirm(`Delete ${t.type} channel?`))try{await Wt(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"DELETE"}),this.channels=this.channels.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Wt(`/api/claws/${this.clawId}/channels`,{method:"POST",body:JSON.stringify({type:this.selectedType,config:this.form})});e&&(this.channels=[e,...this.channels]),this.showModal=!1,this.form={}}catch(e){this.error=e.message}finally{this.saving=!1}}statusDot(t){return n`<span class="dot ${{connected:"dot-green",error:"dot-red",stopped:"dot-gray",pending:"dot-yellow"}[t]??"dot-gray"}"></span>`}render(){const t=ii[this.selectedType]??[];return n`
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
                  <button class="btn btn-danger btn-sm" @click=${()=>this.removeChannel(e)}>Delete</button>
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
                    ${si.map(e=>n`<option value=${e}>${e}</option>`)}
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
    `}};G([u()],z.prototype,"clawId",2);G([u()],z.prototype,"wsUrl",2);G([o()],z.prototype,"channels",2);G([o()],z.prototype,"loading",2);G([o()],z.prototype,"error",2);G([o()],z.prototype,"showModal",2);G([o()],z.prototype,"selectedType",2);G([o()],z.prototype,"form",2);G([o()],z.prototype,"saving",2);z=G([w("ccl-claw-channels")],z);var ai=Object.defineProperty,ni=Object.getOwnPropertyDescriptor,kt=(t,e,s,i)=>{for(var a=i>1?void 0:i?ni(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&ai(e,s,a),a};let pt=class extends g{constructor(){super(...arguments),this.clawId="",this.wsUrl="",this.lines=[],this.level="all",this.connState="connecting",this.autoScroll=!0,this.gw=null,this.logEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.autoScroll&&this.logEnd?.scrollIntoView()}connect(){this.connState="connecting",this.gw=new Fe({url:this.wsUrl,onEvent:t=>{if(t.type==="connected"){this.connState="connected",this.gw?.send({type:"logs.subscribe"});return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type!=="message")return;const e=t.data;e.type==="log"&&(this.lines=[...this.lines.slice(-2e3),{ts:e.ts??new Date().toISOString(),level:e.level??"info",msg:e.message??""}])}})}filtered(){return this.level==="all"?this.lines:this.lines.filter(t=>t.level===this.level)}levelClass(t){return{error:"log-line-error",warn:"log-line-warn",info:"log-line-info"}[t]??""}clear(){this.lines=[]}render(){const t=this.filtered();return n`
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
    `}};kt([u()],pt.prototype,"clawId",2);kt([u()],pt.prototype,"wsUrl",2);kt([o()],pt.prototype,"lines",2);kt([o()],pt.prototype,"level",2);kt([o()],pt.prototype,"connState",2);kt([o()],pt.prototype,"autoScroll",2);pt=kt([w("ccl-claw-logs")],pt);var ri=Object.getOwnPropertyDescriptor,oi=(t,e,s,i)=>{for(var a=i>1?void 0:i?ri(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=l(a)||a);return a};let te=class extends g{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.saving=!1,this.error="",this.associated=[],this.allProjects=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="";try{const[t,e]=await Promise.all([A.projects(this.clawId),N.list()]);this.associated=t,this.allProjects=e}catch(t){this.error=t.message??"Failed to load project associations"}finally{this.loading=!1}}}async associate(t){this.saving=!0;try{await A.associateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to associate project"}finally{this.saving=!1}}async unassociate(t){this.saving=!0;try{await A.unassociateProject(this.clawId,t),await this.load()}catch(e){this.error=e.message??"Failed to remove project association"}finally{this.saving=!1}}render(){const t=new Set(this.associated.map(s=>s.id)),e=this.allProjects.filter(s=>!t.has(s.id));return n`
      <div style="padding:16px;display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Associated Projects</div>
          <button class="btn btn-secondary btn-sm" @click=${()=>{this.load()}} ?disabled=${this.loading||this.saving}>Refresh</button>
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?n`<div class="empty-state">Loading…</div>`:""}

        ${!this.loading&&this.associated.length===0?n`<div class="empty-state"><div class="empty-state-title">No projects linked</div><div class="empty-state-sub">Associate a project to route workspace context for this claw.</div></div>`:n`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Name</th><th>Key</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    ${this.associated.map(s=>n`
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
          ${e.length===0?n`<div style="font-size:13px;color:var(--muted)">All tenant projects are already associated.</div>`:n`
                <div style="display:grid;gap:8px;">
                  ${e.map(s=>n`
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
    `}};te.properties={clawId:{type:String},loading:{state:!0},saving:{state:!0},error:{state:!0},associated:{state:!0},allProjects:{state:!0}};te=oi([w("ccl-claw-projects")],te);var li=Object.getOwnPropertyDescriptor,di=(t,e,s,i)=>{for(var a=i>1?void 0:i?li(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=l(a)||a);return a};let ee=class extends g{constructor(){super(...arguments),this.clawId="",this.loading=!0,this.error="",this.directories=[],this.selectedDirectoryId="",this.files=[],this.filesLoading=!1,this.selectedFilePath="",this.selectedFileContent="",this.fileLoading=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){if(this.clawId){this.loading=!0,this.error="",this.selectedDirectoryId="",this.files=[],this.selectedFilePath="",this.selectedFileContent="";try{this.directories=await A.directories(this.clawId),this.directories.length>0&&(this.selectedDirectoryId=this.directories[0].id,await this.loadFiles(this.selectedDirectoryId))}catch(t){this.error=t.message??"Failed to load workspace sync metadata"}finally{this.loading=!1}}}async loadFiles(t){if(t){this.filesLoading=!0,this.selectedFilePath="",this.selectedFileContent="";try{this.files=await A.directoryFiles(this.clawId,t)}catch(e){this.error=e.message??"Failed to load files",this.files=[]}finally{this.filesLoading=!1}}}async selectFile(t){if(!(!this.selectedDirectoryId||!t)){this.selectedFilePath=t,this.fileLoading=!0;try{const e=await A.directoryFileContent(this.clawId,this.selectedDirectoryId,t);this.selectedFileContent=e.content??""}catch(e){this.error=e.message??"Failed to load file content",this.selectedFileContent=""}finally{this.fileLoading=!1}}}badgeClass(t){return t==="synced"?"badge badge-green":t==="error"?"badge badge-red":"badge badge-yellow"}render(){const t=this.directories.find(e=>e.id===this.selectedDirectoryId)??null;return n`
      <div style="padding:16px;display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">.coderClaw Sync</div>
          <button class="btn btn-secondary btn-sm" @click=${()=>{this.load()}} ?disabled=${this.loading||this.filesLoading||this.fileLoading}>Refresh</button>
        </div>

        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}

        ${this.loading?n`<div class="empty-state">Loading…</div>`:this.directories.length===0?n`<div class="empty-state"><div class="empty-state-title">No synced directories</div><div class="empty-state-sub">Gateway startup sync has not published a .coderClaw path for this claw yet.</div></div>`:n`
                <div class="card">
                  <div class="card-title" style="margin-bottom:10px">Directory Manifest</div>
                  <div style="display:grid;gap:8px;">
                    ${this.directories.map(e=>n`
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

                ${t?n`
                      <div style="display:grid;grid-template-columns:minmax(220px, 320px) 1fr;gap:12px;min-height:320px;">
                        <div class="card" style="overflow:auto;">
                          <div class="card-title" style="margin-bottom:8px">Files</div>
                          ${this.filesLoading?n`<div style="font-size:12px;color:var(--muted)">Loading files…</div>`:this.files.length===0?n`<div style="font-size:12px;color:var(--muted)">No files synced yet.</div>`:n`
                                  <div style="display:grid;gap:6px;">
                                    ${this.files.map(e=>n`
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
                          ${this.fileLoading?n`<div style="font-size:12px;color:var(--muted)">Loading content…</div>`:this.selectedFilePath?n`<pre class="log-wrap" style="font-size:12px;max-height:520px;overflow:auto;white-space:pre-wrap;">${this.selectedFileContent}</pre>`:n`<div style="font-size:12px;color:var(--muted)">Select a synced file to preview content.</div>`}
                        </div>
                      </div>
                    `:""}
              `}
      </div>
    `}};ee.properties={clawId:{type:String},loading:{state:!0},error:{state:!0},directories:{state:!0},selectedDirectoryId:{state:!0},files:{state:!0},filesLoading:{state:!0},selectedFilePath:{state:!0},selectedFileContent:{state:!0},fileLoading:{state:!0}};ee=di([w("ccl-claw-workspace")],ee);var ci=Object.defineProperty,hi=Object.getOwnPropertyDescriptor,S=(t,e,s,i)=>{for(var a=i>1?void 0:i?hi(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&ci(e,s,a),a};const pi=[{id:"chat",label:"Chat"},{id:"agents",label:"Agents"},{id:"config",label:"Config"},{id:"sessions",label:"Sessions"},{id:"skills",label:"Skills"},{id:"usage",label:"Usage"},{id:"cron",label:"Cron"},{id:"nodes",label:"Nodes"},{id:"channels",label:"Channels"},{id:"projects",label:"Projects"},{id:"workspace",label:"Workspace"},{id:"logs",label:"Logs"}];let C=class extends g{constructor(){super(...arguments),this.refreshTimer=null,this.tenantId="",this.clawList=[],this.loading=!1,this.error="",this.showRegisterModal=!1,this.showManualRegister=!1,this.registerName="",this.registering=!1,this.registerError="",this.newClaw=null,this.apiKeyCopied=!1,this.pluginEnvCopied=!1,this.pluginEnvDownloaded=!1,this.panelOpen=!1,this.activeClaw=null,this.activeTab="chat",this.deleteConfirmId=null,this.deleting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadClaws(),this.startPresenceRefresh()}disconnectedCallback(){super.disconnectedCallback(),this.refreshTimer!==null&&(clearInterval(this.refreshTimer),this.refreshTimer=null)}async loadClaws(){this.loading=!0,this.error="";try{this.clawList=await A.list()}catch(t){this.error=t.message??"Failed to load claws"}finally{this.loading=!1}}startPresenceRefresh(){this.refreshTimer!==null&&clearInterval(this.refreshTimer),this.refreshTimer=setInterval(()=>{this.refreshPresence()},15e3)}async refreshPresence(){try{this.clawList=await A.list()}catch{}}openPanel(t){this.activeClaw=t,this.activeTab="chat",this.panelOpen=!0,document.body.style.overflow="hidden"}closePanel(){this.panelOpen=!1,document.body.style.overflow="",setTimeout(()=>{this.activeClaw=null},300)}async handleRegister(){if(this.registerName.trim()){this.registering=!0,this.registerError="";try{const t=await A.register(this.registerName.trim());this.newClaw=t,this.clawList=[...this.clawList,t],this.registerName=""}catch(t){this.registerError=t.message??"Registration failed"}finally{this.registering=!1}}}closeRegisterModal(){this.showRegisterModal=!1,this.showManualRegister=!1,this.newClaw=null,this.registerName="",this.registerError="",this.apiKeyCopied=!1,this.pluginEnvCopied=!1,this.pluginEnvDownloaded=!1}async copyApiKey(){if(this.newClaw)try{await navigator.clipboard.writeText(this.newClaw.apiKey),this.apiKeyCopied=!0,setTimeout(()=>{this.apiKeyCopied=!1},2e3)}catch{}}buildPluginEnvTemplate(){const t=k()??"",e=(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,""),s=this.newClaw?.name??"openclaw-node";return[`CODERCLAW_LINK_URL=${e}`,`CODERCLAW_LINK_TENANT_TOKEN=${t}`,`CODERCLAW_LINK_CLAW_NAME=${s}`,`CODERCLAW_LINK_CLAW_ID=${this.newClaw?.id??""}`,`CODERCLAW_LINK_API_KEY=${this.newClaw?.apiKey??""}`,"OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copyPluginEnvTemplate(){if(this.newClaw){if(!k()){this.registerError="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(this.buildPluginEnvTemplate()),this.pluginEnvCopied=!0,setTimeout(()=>{this.pluginEnvCopied=!1},2e3)}catch{this.registerError="Failed to copy plugin env file."}}}downloadPluginEnvTemplate(){if(this.newClaw){if(!k()){this.registerError="No tenant token found for current workspace session.";return}try{const t=this.buildPluginEnvTemplate(),e=new Blob([`${t}
`],{type:"text/plain;charset=utf-8"}),s=URL.createObjectURL(e),i=document.createElement("a");i.href=s,i.download="coderclawlink.env",i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s),this.pluginEnvDownloaded=!0,setTimeout(()=>{this.pluginEnvDownloaded=!1},2e3)}catch{this.registerError="Failed to download plugin env file."}}}async handleDelete(t){this.deleting=!0;try{await A.remove(t),this.clawList=this.clawList.filter(e=>e.id!==t),this.deleteConfirmId=null,this.activeClaw?.id===t&&this.closePanel()}catch(e){this.error=e.message??"Delete failed"}finally{this.deleting=!1}}statusBadge(t){return t.status==="active"?n`<span class="badge badge-green">active</span>`:t.status==="suspended"?n`<span class="badge badge-red">suspended</span>`:n`<span class="badge badge-gray">${t.status}</span>`}connectedDot(t){const e=t.status==="active"&&t.connectedAt?"dot dot-green":"dot dot-gray";return n`<span class="${e}" title="${t.connectedAt?"connected":"offline"}"></span>`}renderRegisterModal(){return this.showRegisterModal?n`
      <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&this.closeRegisterModal()}}>
        <div class="modal" style="width:min(980px,95vw)">
          <div class="modal-title">Register new claw</div>
          ${this.newClaw?n`
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
            ${this.registerError?n`<div class="error-banner">${this.registerError}</div>`:""}
            <div class="modal-footer">
              <button class="btn btn-primary" @click=${this.closeRegisterModal}>Done</button>
            </div>
          `:this.showManualRegister?n`
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
              <button class="btn btn-ghost" @click=${()=>{this.showManualRegister=!1}}>Back</button>
              <button class="btn btn-primary" ?disabled=${this.registering||!this.registerName.trim()}
                @click=${this.handleRegister}>${this.registering?"Registering…":"Register"}</button>
            </div>
          `:n`
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
    `}renderPanel(){if(!this.activeClaw)return n``;const t=this.activeClaw,e=A.wsUrl(t.id);return n`
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
          ${pi.map(s=>n`
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
          ${this.activeTab==="projects"?n`<ccl-claw-projects .clawId=${t.id}></ccl-claw-projects>`:""}
          ${this.activeTab==="workspace"?n`<ccl-claw-workspace .clawId=${t.id}></ccl-claw-workspace>`:""}
          ${this.activeTab==="logs"?n`<ccl-claw-logs     .clawId=${t.id} .wsUrl=${e}></ccl-claw-logs>`:""}
        </div>
      </div>
    `}render(){return n`
      <div>
        <div class="page-header">
          <div><div class="page-title">Claws</div><div class="page-sub">${this.clawList.length} registered</div></div>
          <button class="btn btn-primary" @click=${()=>{this.showManualRegister=!1,this.showRegisterModal=!0}}>Register claw</button>
        </div>
        ${this.error?n`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?n`<div class="empty-state">Loading…</div>`:""}
        ${!this.loading&&this.clawList.length===0?n`
          <div>
            <div class="empty-state">
              <div class="empty-state-title">No claws registered yet</div>
              <div class="empty-state-sub">Register your first claw to get started.</div>
              <button class="btn btn-primary" style="margin-top:16px" @click=${()=>{this.showManualRegister=!1,this.showRegisterModal=!0}}>Register claw</button>
            </div>
            <ccl-quickstart></ccl-quickstart>
          </div>
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
    `}};S([u()],C.prototype,"tenantId",2);S([o()],C.prototype,"clawList",2);S([o()],C.prototype,"loading",2);S([o()],C.prototype,"error",2);S([o()],C.prototype,"showRegisterModal",2);S([o()],C.prototype,"showManualRegister",2);S([o()],C.prototype,"registerName",2);S([o()],C.prototype,"registering",2);S([o()],C.prototype,"registerError",2);S([o()],C.prototype,"newClaw",2);S([o()],C.prototype,"apiKeyCopied",2);S([o()],C.prototype,"pluginEnvCopied",2);S([o()],C.prototype,"pluginEnvDownloaded",2);S([o()],C.prototype,"panelOpen",2);S([o()],C.prototype,"activeClaw",2);S([o()],C.prototype,"activeTab",2);S([o()],C.prototype,"deleteConfirmId",2);S([o()],C.prototype,"deleting",2);C=S([w("ccl-claws")],C);var ui=Object.defineProperty,vi=Object.getOwnPropertyDescriptor,vt=(t,e,s,i)=>{for(var a=i>1?void 0:i?vi(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&ui(e,s,a),a};let Z=class extends g{constructor(){super(...arguments),this.tenantId="",this.available=[],this.assigned=[],this.loading=!0,this.error="",this.search="",this.tab="assigned"}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([Xt.list().catch(()=>[]),St.listTenant().catch(()=>[])]);this.available=t,this.assigned=e}catch(t){this.error=t.message}finally{this.loading=!1}}async assign(t){try{await St.assignTenant(t),this.assigned=await St.listTenant()}catch(e){this.error=e.message}}async unassign(t){try{await St.unassignTenant(t),this.assigned=this.assigned.filter(e=>e.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}filteredAvailable(){const t=this.search.toLowerCase();return this.available.filter(e=>!t||e.name.toLowerCase().includes(t)||(e.description??"").toLowerCase().includes(t))}render(){const t=this.assignedSlugs();return n`
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
    `}};vt([u()],Z.prototype,"tenantId",2);vt([o()],Z.prototype,"available",2);vt([o()],Z.prototype,"assigned",2);vt([o()],Z.prototype,"loading",2);vt([o()],Z.prototype,"error",2);vt([o()],Z.prototype,"search",2);vt([o()],Z.prototype,"tab",2);Z=vt([w("ccl-skills")],Z);var gi=Object.defineProperty,mi=Object.getOwnPropertyDescriptor,y=(t,e,s,i)=>{for(var a=i>1?void 0:i?mi(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&gi(e,s,a),a};const bi=["owner","manager","developer","viewer"];let b=class extends g{constructor(){super(...arguments),this.tenant=null,this.initialTab="members",this.detail=null,this.loading=!0,this.error="",this.tab="members",this.subscription=null,this.usage=null,this.usageDays=30,this.availableClaws=[],this.defaultClawId=null,this.savingDefaultClaw=!1,this.updatingPlan=!1,this.billingCycle="monthly",this.billingEmail="",this.billingBrand="visa",this.billingLast4="",this.showTenantToken=!1,this.copiedTenantToken=!1,this.copiedPluginEnv=!1,this.downloadedPluginEnv=!1,this.showInvite=!1,this.inviteEmail="",this.inviteRole="developer",this.inviting=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.tab=this.initialTab,this.load()}updated(t){t.has("initialTab")&&this.initialTab!==this.tab&&(this.tab=this.initialTab),t.has("tenant")&&this.tenant&&this.load()}async load(){if(this.tenant){this.loading=!0;try{const[t,e,s,i,a]=await Promise.all([F.get(this.tenant.id),F.subscription(this.tenant.id),ve.usage(this.usageDays),A.list(),F.defaultClaw(this.tenant.id)]);this.detail=t,this.subscription=e,this.usage=s,this.availableClaws=i,this.defaultClawId=a.defaultClawId,this.billingEmail=e.billingEmail??"",this.billingBrand=e.billingPaymentBrand??"visa",this.billingLast4=e.billingPaymentLast4??"",this.billingCycle=e.billingCycle??"monthly"}catch(t){this.error=t.message}finally{this.loading=!1}}}canManageBilling(){const t=this.tenant?.role?.toLowerCase();return t==="owner"||t==="manager"}async saveDefaultClaw(){if(!(!this.tenant||!this.canManageBilling())){this.savingDefaultClaw=!0;try{const t=await F.setDefaultClaw(this.tenant.id,this.defaultClawId);this.defaultClawId=t.defaultClawId}catch(t){this.error=t.message}finally{this.savingDefaultClaw=!1}}}async changePlanToPro(t){if(t.preventDefault(),!(!this.tenant||!this.canManageBilling())){this.updatingPlan=!0;try{await F.upgradeToPro(this.tenant.id,{billingCycle:this.billingCycle,billingEmail:this.billingEmail,billingPaymentBrand:this.billingBrand,billingPaymentLast4:this.billingLast4}),await this.load()}catch(e){this.error=e.message}finally{this.updatingPlan=!1}}}async changePlanToFree(){if(!(!this.tenant||!this.canManageBilling())){this.updatingPlan=!0;try{await F.downgradeToFree(this.tenant.id),await this.load()}catch(t){this.error=t.message}finally{this.updatingPlan=!1}}}async invite(t){if(t.preventDefault(),!(!this.tenant||!this.inviteEmail)){this.inviting=!0;try{await F.inviteMember(this.tenant.id,this.inviteEmail,this.inviteRole),await this.load(),this.showInvite=!1,this.inviteEmail=""}catch(e){this.error=e.message}finally{this.inviting=!1}}}async removeMember(t){if(!(!this.tenant||!confirm("Remove this member?")))try{await F.removeMember(this.tenant.id,t),await this.load()}catch(e){this.error=e.message}}roleBadge(t){return n`<span class="badge ${{owner:"badge-red",manager:"badge-yellow",developer:"badge-blue",viewer:"badge-gray"}[t]??"badge-gray"}">${t}</span>`}async copyTenantToken(){const t=k();if(!t){this.error="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(t),this.copiedTenantToken=!0,setTimeout(()=>{this.copiedTenantToken=!1},2e3)}catch(e){this.error=e.message}}buildPluginEnvTemplate(){const t=k()??"",e=(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,""),s=`openclaw-${(this.tenant?.slug??"node").replace(/[^a-z0-9-]/gi,"-")}`;return[`CODERCLAW_LINK_URL=${e}`,`CODERCLAW_LINK_TENANT_TOKEN=${t}`,`CODERCLAW_LINK_CLAW_NAME=${s}`,"CODERCLAW_LINK_CLAW_ID=","CODERCLAW_LINK_API_KEY=","OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copyPluginEnvTemplate(){if(!k()){this.error="No tenant token found for current workspace session.";return}try{await navigator.clipboard.writeText(this.buildPluginEnvTemplate()),this.copiedPluginEnv=!0,setTimeout(()=>{this.copiedPluginEnv=!1},2e3)}catch(e){this.error=e.message}}downloadPluginEnvTemplate(){if(!k()){this.error="No tenant token found for current workspace session.";return}try{const e=this.buildPluginEnvTemplate(),s=new Blob([`${e}
`],{type:"text/plain;charset=utf-8"}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download="coderclawlink.env",a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i),this.downloadedPluginEnv=!0,setTimeout(()=>{this.downloadedPluginEnv=!1},2e3)}catch(e){this.error=e.message}}render(){return n`
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
                    ${bi.filter(e=>e!=="owner").map(e=>n`<option value=${e}>${e}</option>`)}
                  </select></div>
                <div class="modal-footer">
                  <button class="btn btn-ghost" type="button" @click=${()=>this.showInvite=!1}>Cancel</button>
                  <button class="btn btn-primary" type="submit" ?disabled=${this.inviting}>${this.inviting?"Inviting…":"Send invite"}</button>
                </div>
              </form>
            </div>
          </div>`:""}
      </div>
    `}renderSettings(){const t=k()??"",e=this.subscription,s=this.usage,i=this.canManageBilling();return n`
      <div style="display:grid;gap:16px;max-width:680px">
        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:16px">Default Claw</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:10px">
            Used when dashboard prompts scaffold a project and no project-specific claw is assigned.
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <select class="select" style="min-width:260px" .value=${this.defaultClawId==null?"":String(this.defaultClawId)} @change=${a=>{const r=a.target.value;this.defaultClawId=r?Number(r):null}}>
              <option value="">No default claw (WIP-only projects)</option>
              ${this.availableClaws.map(a=>n`<option value=${a.id}>${a.name} (${a.connectedAt?"online":"offline"})</option>`)}
            </select>
            <button class="btn btn-primary btn-sm" @click=${this.saveDefaultClaw} ?disabled=${this.savingDefaultClaw||!i}>
              ${this.savingDefaultClaw?"Saving…":"Save default claw"}
            </button>
          </div>
          ${i?"":n`<div style="font-size:12px;color:var(--muted);margin-top:8px">Only owner/manager can update default claw.</div>`}
        </div>

        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:16px">coderClawLLM Plan</div>
          ${e?n`
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

            ${i?n`
              <form @submit=${this.changePlanToPro} style="display:grid;gap:10px;margin-bottom:10px">
                <div style="font-size:12px;color:var(--muted)">Upgrade to Pro requires billing info. If billing is not active, workspace usage automatically falls back to Free.</div>
                <div class="field">
                  <label class="label">Billing cycle</label>
                  <select class="select" .value=${this.billingCycle} @change=${a=>{this.billingCycle=a.target.value}}>
                    <option value="monthly">Monthly ($${e.pricing.pro.monthly})</option>
                    <option value="yearly">Yearly ($${e.pricing.pro.yearly})</option>
                  </select>
                </div>
                <div class="field">
                  <label class="label">Billing email</label>
                  <input class="input" type="email" required .value=${this.billingEmail} @input=${a=>{this.billingEmail=a.target.value}} />
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                  <div class="field">
                    <label class="label">Card brand</label>
                    <input class="input" required .value=${this.billingBrand} @input=${a=>{this.billingBrand=a.target.value}} />
                  </div>
                  <div class="field">
                    <label class="label">Card last 4</label>
                    <input class="input" inputmode="numeric" pattern="[0-9]{4}" minlength="4" maxlength="4" required .value=${this.billingLast4} @input=${a=>{this.billingLast4=a.target.value.replace(/\D/g,"").slice(0,4)}} />
                  </div>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <button class="btn btn-primary btn-sm" type="submit" ?disabled=${this.updatingPlan}>${this.updatingPlan?"Updating…":"Activate Pro"}</button>
                  <button class="btn btn-secondary btn-sm" type="button" @click=${this.changePlanToFree} ?disabled=${this.updatingPlan}>Switch to Free</button>
                </div>
              </form>
            `:n`<div style="font-size:12px;color:var(--muted)">Only owner/manager can change billing or plan.</div>`}
          `:n`<div style="color:var(--muted);font-size:13px">Loading subscription…</div>`}
        </div>

        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:8px">coderClawLLM Consumption</div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
            <label style="font-size:12px;color:var(--muted)">Window</label>
            <select class="select" style="max-width:130px" @change=${a=>{this.usageDays=Number(a.target.value),this.load()}}>
              ${[7,14,30,60,90].map(a=>n`<option value="${a}" ?selected=${this.usageDays===a}>${a} days</option>`)}
            </select>
          </div>
          ${s?n`
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
          `:n`<div style="color:var(--muted);font-size:13px">Loading usage…</div>`}
        </div>

        <div class="card" style="max-width:680px">
          <div class="card-title" style="margin-bottom:16px">Workspace details</div>
          <div style="display:grid;gap:10px">
            ${[["Name",this.tenant?.name??"—"],["Slug",this.tenant?.slug??"—"],["Status",this.tenant?.status??"—"],["Your role",this.tenant?.role??"—"]].map(([a,r])=>n`
              <div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--muted)">${a}</span>
                <span style="color:var(--text-strong);font-weight:500">${r}</span>
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
          ${this.showTenantToken?n`<textarea class="textarea" readonly style="min-height:84px;font-family:var(--mono)">${t||"No tenant token found"}</textarea>`:n`<div style="font-size:12px;color:var(--muted);font-family:var(--mono)">${t?"••••••••••••••••••••••••••••":"No tenant token found"}</div>`}
        </div>
      </div>
    `}};y([u({type:Object})],b.prototype,"tenant",2);y([u({type:String})],b.prototype,"initialTab",2);y([o()],b.prototype,"detail",2);y([o()],b.prototype,"loading",2);y([o()],b.prototype,"error",2);y([o()],b.prototype,"tab",2);y([o()],b.prototype,"subscription",2);y([o()],b.prototype,"usage",2);y([o()],b.prototype,"usageDays",2);y([o()],b.prototype,"availableClaws",2);y([o()],b.prototype,"defaultClawId",2);y([o()],b.prototype,"savingDefaultClaw",2);y([o()],b.prototype,"updatingPlan",2);y([o()],b.prototype,"billingCycle",2);y([o()],b.prototype,"billingEmail",2);y([o()],b.prototype,"billingBrand",2);y([o()],b.prototype,"billingLast4",2);y([o()],b.prototype,"showTenantToken",2);y([o()],b.prototype,"copiedTenantToken",2);y([o()],b.prototype,"copiedPluginEnv",2);y([o()],b.prototype,"downloadedPluginEnv",2);y([o()],b.prototype,"showInvite",2);y([o()],b.prototype,"inviteEmail",2);y([o()],b.prototype,"inviteRole",2);y([o()],b.prototype,"inviting",2);b=y([w("ccl-workspace")],b);var yi=Object.defineProperty,fi=Object.getOwnPropertyDescriptor,nt=(t,e,s,i)=>{for(var a=i>1?void 0:i?fi(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&yi(e,s,a),a};let Y=class extends g{constructor(){super(...arguments),this.tenantId="",this.items=[],this.tasks=[],this.loading=!0,this.error="",this.filterTask="",this.filterStatus="",this.expanded=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.tasks]=await Promise.all([ue.list(),L.list().catch(()=>[])])}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){return this.items.filter(t=>!(this.filterTask&&t.taskId!==this.filterTask||this.filterStatus&&t.status!==this.filterStatus))}taskTitle(t){return this.tasks.find(e=>e.id===t)?.title??t}statusColor(t){return{completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"}[t]??"badge-gray"}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered();return n`
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
    `}};nt([u()],Y.prototype,"tenantId",2);nt([o()],Y.prototype,"items",2);nt([o()],Y.prototype,"tasks",2);nt([o()],Y.prototype,"loading",2);nt([o()],Y.prototype,"error",2);nt([o()],Y.prototype,"filterTask",2);nt([o()],Y.prototype,"filterStatus",2);nt([o()],Y.prototype,"expanded",2);Y=nt([w("ccl-logs")],Y);var wi=Object.defineProperty,$i=Object.getOwnPropertyDescriptor,_=(t,e,s,i)=>{for(var a=i>1?void 0:i?$i(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&wi(e,s,a),a};let P=class extends g{constructor(){super(...arguments),this.tab="health",this.health=null,this.users=[],this.tenants=[],this.errors=[],this.llmUsage=null,this.usageDays=30,this.loading=!1,this.errorMsg="",this.showAdminToken=!1,this.llmPoolTab="coderClawLLM",this.copiedAdminToken=!1,this.copiedAdminEnv=!1,this.downloadedAdminEnv=!1,this.impersonateUserId=null,this.impersonateTenants=[],this.expandedErrorId=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTab("health")}async loadTab(t){this.tab=t,this.loading=!0,this.errorMsg="";try{t==="health"?this.health=await rt.health():t==="users"?this.users=await rt.users():t==="tenants"?this.tenants=await rt.tenants():t==="errors"?this.errors=await rt.errors():t==="usage"&&(this.llmUsage=await rt.llmUsage(this.usageDays))}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}finally{this.loading=!1}}async startImpersonate(t){this.tenants.length||(this.tenants=await rt.tenants()),this.impersonateUserId=t,this.impersonateTenants=this.tenants}async doImpersonate(t){if(this.impersonateUserId)try{const e=await rt.impersonate(this.impersonateUserId,t);Jt(e.token),Vt(String(t)),this.impersonateUserId=null,this.dispatchEvent(new CustomEvent("ccl:impersonate",{bubbles:!0,composed:!0,detail:{tenantId:t}}))}catch(e){this.errorMsg=e instanceof Error?e.message:String(e)}}fmtCooldown(t){const e=Math.max(0,Math.ceil((t-Date.now())/1e3));return e>=60?`${Math.ceil(e/60)}m`:`${e}s`}fmtDate(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}fmtDateTime(t){return new Date(t).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}async copyAdminToken(){const t=Q();if(!t){this.errorMsg="No superadmin web token found for this session.";return}try{await navigator.clipboard.writeText(t),this.copiedAdminToken=!0,setTimeout(()=>{this.copiedAdminToken=!1},2e3)}catch(e){this.errorMsg=e.message}}buildSuperadminEnvTemplate(){const t=Q()??"";return[`CODERCLAW_LINK_URL=${(window.API_URL??"https://api.coderclaw.ai").replace(/\/+$/,"")}`,`CODERCLAW_LINK_WEB_TOKEN=${t}`,"CODERCLAW_LINK_TENANT_TOKEN=","CODERCLAW_LINK_CLAW_NAME=openclaw-superadmin-node","CODERCLAW_LINK_CLAW_ID=","CODERCLAW_LINK_API_KEY=","OPENCLAW_EXEC_COMMAND=","OPENCLAW_MAX_CONCURRENT_TASKS=1","OPENCLAW_EXEC_TIMEOUT_MS=900000","OPENCLAW_RELAY_STATE_PATH=.generated/relay-state.json","OPENCLAW_PLUGIN_ENV_FILE=.generated/coderclawlink.env"].join(`
`)}async copySuperadminEnvTemplate(){if(!Q()){this.errorMsg="No superadmin web token found for this session.";return}try{await navigator.clipboard.writeText(this.buildSuperadminEnvTemplate()),this.copiedAdminEnv=!0,setTimeout(()=>{this.copiedAdminEnv=!1},2e3)}catch(e){this.errorMsg=e.message}}downloadSuperadminEnvTemplate(){if(!Q()){this.errorMsg="No superadmin web token found for this session.";return}try{const e=this.buildSuperadminEnvTemplate(),s=new Blob([`${e}
`],{type:"text/plain;charset=utf-8"}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download="coderclawlink.superadmin.env",a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i),this.downloadedAdminEnv=!0,setTimeout(()=>{this.downloadedAdminEnv=!1},2e3)}catch(e){this.errorMsg=e.message}}render(){return n`
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
          ${["health","usage","users","tenants","errors"].map(t=>n`
            <button
              class="admin-tab ${this.tab===t?"active":""}"
              @click=${()=>this.loadTab(t)}
            >${t.charAt(0).toUpperCase()+t.slice(1)}</button>
          `)}
        </nav>

        <!-- Error banner -->
        ${this.errorMsg?n`<div class="alert alert-error">${this.errorMsg}</div>`:""}

        <!-- Content -->
        <div class="admin-content">
          ${this.loading?n`<div class="loading-state">Loading…</div>`:this.renderTab()}
        </div>

        <!-- Impersonate modal -->
        ${this.impersonateUserId?this.renderImpersonateModal():""}
      </div>
    `}renderTab(){return this.tab==="health"?this.renderHealth():this.tab==="usage"?this.renderUsage():this.tab==="users"?this.renderUsers():this.tab==="tenants"?this.renderTenants():this.tab==="errors"?this.renderErrors():n``}renderHealth(){const t=this.health,e=Q()??"";if(!t)return n`<div class="loading-state">No data</div>`;const s=t.llm.models.filter(r=>r.model.toLowerCase().includes(":free")),i=t.llm.models.filter(r=>!r.model.toLowerCase().includes(":free")),a=this.llmPoolTab==="coderClawLLM"?s:i;return n`
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
          ${t.platform.errorCount>0?n`<div class="health-sub"><button class="btn btn-ghost btn-xs" @click=${()=>this.loadTab("errors")}>View errors →</button></div>`:""}
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
            ${a.map(r=>{const l=r.available?"background:var(--success-bg,#d1fae5);color:var(--success-text,#065f46);border-color:var(--success-border,#6ee7b7)":"background:var(--error-bg,#fee2e2);color:var(--error-text,#991b1b);border-color:var(--error-border,#fca5a5)",h=r.available?"available":`cooldown ${this.fmtCooldown(r.cooldownUntil??0)}`,d=`${r.preferred?"★ ":""}${r.model} · ${h}`,m=r.available?`${r.preferred?"Preferred (round-robin). ":"Fallback. "}Available`:`On cooldown — available in ${this.fmtCooldown(r.cooldownUntil??0)}`;return n`<span class="model-chip" style="${l}" title="${m}">${d}</span>`})}
          </div>
          ${a.length===0?n`
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
        ${this.showAdminToken?n`<textarea class="textarea" readonly style="min-height:84px;font-family:var(--mono)">${e||"No superadmin web token found"}</textarea>`:n`<div style="font-size:12px;color:var(--text-muted,#6b7280);font-family:var(--mono)">${e?"••••••••••••••••••••••••••••":"No superadmin web token found"}</div>`}
      </div>
    `}fmtNum(t){return Number(t).toLocaleString()}renderUsage(){const t=this.llmUsage;return t?n`
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
            ${[7,14,30,60,90].map(e=>n`
              <option value="${e}" ?selected=${this.usageDays===e}>${e} days</option>
            `)}
          </select>
        </span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("usage")}>↻ Refresh</button>
      </div>

      ${t.byModel.length===0?n`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-title">No LLM usage recorded yet</div>
          <div class="empty-sub">Usage will appear here once requests flow through the proxy.</div>
        </div>
      `:n`
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
              ${t.byModel.map(e=>n`
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
        ${t.daily.length>0?n`
          <div style="margin-top:24px">
            <div class="table-header"><span class="table-count">Daily requests — last ${t.days} days</span></div>
            <div class="usage-bars">
              ${(()=>{const e=Math.max(...t.daily.map(s=>s.requests),1);return t.daily.map(s=>n`
                  <div class="usage-bar-col" title="${s.day}: ${this.fmtNum(s.requests)} requests, ${this.fmtNum(s.total_tokens)} tokens">
                    <div class="usage-bar" style="height:${Math.max(4,Math.round(s.requests/e*80))}px"></div>
                    <div class="usage-bar-label">${s.day.slice(5)}</div>
                  </div>
                `)})()}
            </div>
          </div>
        `:""}

        <!-- Failover breakdown -->
        ${t.failovers.length>0?n`
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
                  ${t.failovers.map(e=>n`
                    <tr>
                      <td><span class="model-chip" style="font-size:12px">${e.model}</span></td>
                      <td style="text-align:right">
                        ${e.errorCode===0?n`<span class="badge badge-neutral">body</span>`:n`<span class="badge badge-danger">${e.errorCode}</span>`}
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
        `:n`
          <div style="margin-top:24px;color:var(--text-muted,#6b7280);font-size:13px">
            No failover events in the last ${t.days} days.
          </div>
        `}
      `}
    `:n`<div class="loading-state">No data</div>`}renderUsers(){return n`
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
            ${this.users.map(t=>n`
              <tr>
                <td>${t.email}</td>
                <td class="text-muted">${t.username??"—"}</td>
                <td>${t.tenantCount}</td>
                <td class="text-muted">${this.fmtDate(t.createdAt)}</td>
                <td>
                  ${t.isSuperadmin?n`<span class="badge badge-danger">superadmin</span>`:n`<span class="badge badge-neutral">user</span>`}
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
    `}renderTenants(){return n`
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
            ${this.tenants.map(t=>n`
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
    `}renderErrors(){return this.errors.length?n`
      <div class="table-header">
        <span class="table-count">${this.errors.length} errors (last 200)</span>
        <button class="btn btn-ghost btn-sm" @click=${()=>this.loadTab("errors")}>↻ Refresh</button>
      </div>
      <div class="error-log">
        ${this.errors.map(t=>n`
          <div class="error-entry" @click=${()=>this.expandedErrorId=this.expandedErrorId===t.id?null:t.id}>
            <div class="error-entry-header">
              <span class="error-method">${t.method??"?"}</span>
              <span class="error-path">${t.path??"?"}</span>
              <span class="error-msg">${t.message}</span>
              <span class="error-time text-muted">${this.fmtDateTime(t.createdAt)}</span>
              <span class="error-chevron">${this.expandedErrorId===t.id?"▲":"▼"}</span>
            </div>
            ${this.expandedErrorId===t.id&&t.stack?n`
              <pre class="error-stack">${t.stack}</pre>
            `:""}
          </div>
        `)}
      </div>
    `:n`
        <div class="empty-state">
          <div class="empty-icon">✓</div>
          <div class="empty-title">No errors logged</div>
          <div class="empty-sub">The API error log is clean.</div>
        </div>
      `}renderImpersonateModal(){const t=this.users.find(e=>e.id===this.impersonateUserId);return n`
      <div class="modal-backdrop" @click=${()=>this.impersonateUserId=null}>
        <div class="modal" @click=${e=>e.stopPropagation()}>
          <div class="modal-header">
            <h3>Impersonate ${t?.email??"user"}</h3>
            <button class="btn btn-ghost btn-icon" @click=${()=>this.impersonateUserId=null}>✕</button>
          </div>
          <div class="modal-body">
            <p class="modal-desc">Select a workspace to enter as this user. A temporary token will be issued.</p>
            ${this.impersonateTenants.length===0?n`<div class="text-muted">This user has no workspaces.</div>`:n`
                <div class="tenant-list">
                  ${this.impersonateTenants.map(e=>n`
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
    `}};_([o()],P.prototype,"tab",2);_([o()],P.prototype,"health",2);_([o()],P.prototype,"users",2);_([o()],P.prototype,"tenants",2);_([o()],P.prototype,"errors",2);_([o()],P.prototype,"llmUsage",2);_([o()],P.prototype,"usageDays",2);_([o()],P.prototype,"loading",2);_([o()],P.prototype,"errorMsg",2);_([o()],P.prototype,"showAdminToken",2);_([o()],P.prototype,"llmPoolTab",2);_([o()],P.prototype,"copiedAdminToken",2);_([o()],P.prototype,"copiedAdminEnv",2);_([o()],P.prototype,"downloadedAdminEnv",2);_([o()],P.prototype,"impersonateUserId",2);_([o()],P.prototype,"impersonateTenants",2);_([o()],P.prototype,"expandedErrorId",2);P=_([w("ccl-admin")],P);var xi=Object.defineProperty,ki=Object.getOwnPropertyDescriptor,j=(t,e,s,i)=>{for(var a=i>1?void 0:i?ki(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&xi(e,s,a),a};let I=class extends g{constructor(){super(...arguments),this.tenantId="",this.page="tasks",this.open=!1,this.loadingContext=!1,this.contextError="",this.input="",this.sending=!1,this.contextSummary="",this.messages=[],this.actions=[],this.projects=[],this.tasks=[],this.claws=[],this.skills=[],this.msgEnd=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.refreshContext()}updated(t){(t.has("tenantId")||t.has("page"))&&(this.contextError="",this.refreshContext()),this.msgEnd?.scrollIntoView({behavior:"smooth"})}pageLabel(){return{projects:"Projects",tasks:"Tasks",claws:"Claws",skills:"Skills",workspace:"Workspace",billing:"Billing",logs:"Logs"}[this.page]??this.page}async refreshContext(){this.loadingContext=!0,this.contextError="";try{if(this.page==="projects")this.projects=await N.list(),this.contextSummary=`${this.projects.length} project${this.projects.length!==1?"s":""} in workspace`;else if(this.page==="tasks"){const[t,e]=await Promise.all([L.list(),N.list()]);this.tasks=t,this.projects=e;const s=t.filter(i=>i.status!=="done").length;this.contextSummary=`${t.length} tasks · ${s} open`}else if(this.page==="claws"){this.claws=await A.list();const t=this.claws.filter(e=>e.status==="connected").length;this.contextSummary=`${this.claws.length} claws · ${t} connected`}else this.page==="skills"?(this.skills=await Xt.list(),this.contextSummary=`${this.skills.length} skills available`):this.page==="workspace"||this.page==="billing"?this.contextSummary="Workspace explorer context":this.contextSummary="Execution and activity logs context"}catch(t){this.contextError=t instanceof Error?t.message:String(t)}finally{this.loadingContext=!1}}quickPrompt(t){if(t==="describe"){this.input=`Describe the current ${this.pageLabel().toLowerCase()} context and highlight key priorities.`;return}if(t==="prd"){this.input="Create a concise product requirements document (PRD) for the most important project in this workspace.";return}this.input="Generate an execution-ready task breakdown. Include actionable steps and add <ccl-actions> JSON to create tasks."}buildContextPayload(){return{page:this.page,tenantId:this.tenantId,summary:this.contextSummary,projects:this.projects.slice(0,40).map(t=>({id:t.id,key:t.key,name:t.name,status:t.status,description:t.description??""})),tasks:this.tasks.slice(0,80).map(t=>({id:t.id,key:t.key,title:t.title,status:t.status,priority:t.priority,projectId:t.projectId??null})),claws:this.claws.slice(0,40).map(t=>({id:t.id,name:t.name,status:t.status})),skills:this.skills.slice(0,60).map(t=>({id:t.id,slug:t.slug,name:t.name}))}}parseActions(t){const e=t.match(/<ccl-actions>([\s\S]*?)<\/ccl-actions>/i);if(!e)return[];try{const s=JSON.parse(e[1]);return Array.isArray(s.actions)?s.actions.filter(i=>i&&typeof i=="object"&&(i.type==="create_project"||i.type==="create_task")):[]}catch{return[]}}stripActions(t){return t.replace(/<ccl-actions>[\s\S]*?<\/ccl-actions>/gi,"").trim()}toChatMessages(){const t=this.messages.slice(-12).map(s=>({role:s.role,content:s.text}));return[{role:"system",content:["You are Brain, the first-class AI assistant inside CoderClawLink.",`You are currently helping on the ${this.pageLabel()} page.`,"Use the provided page context snapshot to give practical, execution-focused output.","When the user asks to create entities, include machine-readable actions in this exact format:",'<ccl-actions>{"actions":[...]}</ccl-actions>',"Allowed action types:","- create_project: { type, name, description? }","- create_task: { type, title, description?, projectId?, projectName?, projectKey?, priority?, status?, dueDate? }","If no actions are needed, do not output ccl-actions.","Be concise and concrete."].join(`
`)},{role:"system",content:`Page context JSON:
${JSON.stringify(this.buildContextPayload())}`},...t]}async send(){const t=this.input.trim();if(!t||this.sending)return;const e={id:crypto.randomUUID(),role:"user",text:t};this.messages=[...this.messages,e],this.input="",this.sending=!0;try{const i=(await ve.chat(this.toChatMessages(),{temperature:.25,maxTokens:1400})).choices?.[0]?.message?.content?.trim()??"I could not generate a response.",a=this.parseActions(i);a.length&&(this.actions=a.map(r=>({action:r,status:"idle"}))),this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:this.stripActions(i)||"Done."}]}catch(s){const i=s instanceof Error?s.message:String(s);this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:`Error: ${i}`}]}finally{this.sending=!1}}async applyAction(t){const e=this.actions[t];if(!(!e||e.status==="running")){this.actions=this.actions.map((s,i)=>i===t?{...s,status:"running",result:void 0}:s);try{if(e.action.type==="create_project"){const d=await N.create({name:e.action.name,description:e.action.description});this.actions=this.actions.map((m,v)=>v===t?{...m,status:"done",result:`Created project ${d.key}`}:m),await this.refreshContext();return}const s=e.action,i=s.projectId?this.projects.find(d=>d.id===s.projectId):null,a=s.projectKey?this.projects.find(d=>d.key.toLowerCase()===s.projectKey?.toLowerCase()):null,r=s.projectName?this.projects.find(d=>d.name.toLowerCase()===s.projectName?.toLowerCase()):null,l=i??a??r??null,h=await L.create({title:s.title,description:s.description,projectId:l?.id,priority:s.priority??"medium",status:s.status??"todo",dueDate:s.dueDate});this.actions=this.actions.map((d,m)=>m===t?{...d,status:"done",result:`Created task ${h.key}`}:d),await this.refreshContext()}catch(s){const i=s instanceof Error?s.message:String(s);this.actions=this.actions.map((a,r)=>r===t?{...a,status:"error",result:i}:a)}}}async applyAll(){for(let t=0;t<this.actions.length;t++)(this.actions[t]?.status==="idle"||this.actions[t]?.status==="error")&&await this.applyAction(t)}clearChat(){this.messages=[],this.actions=[],this.input=""}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}render(){return n`
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

        ${this.contextError?n`<div class="error-banner" style="margin:12px 16px 0 16px">${this.contextError}</div>`:""}

        <div style="display:flex;gap:8px;padding:12px 16px 8px 16px;flex-wrap:wrap;border-bottom:1px solid var(--border)">
          <button class="btn btn-ghost btn-sm" @click=${()=>this.quickPrompt("describe")}>Describe context</button>
          <button class="btn btn-ghost btn-sm" @click=${()=>this.quickPrompt("prd")}>Draft PRD</button>
          <button class="btn btn-ghost btn-sm" @click=${()=>this.quickPrompt("tasks")}>Generate tasks</button>
        </div>

        <div class="chat-messages" style="padding:12px 16px;gap:12px">
          ${this.messages.length===0?n`
            <div class="empty-state" style="padding:28px 12px">
              <div class="empty-state-icon">🧠</div>
              <div class="empty-state-title">Brain is ready</div>
              <div class="empty-state-sub">Ask for analysis, PRDs, or execution-ready task plans for this page.</div>
            </div>
          `:this.messages.map(t=>n`
            <div class="msg ${t.role==="user"?"msg-user":""}">
              <div class="msg-bubble ${t.role==="user"?"msg-bubble-user":"msg-bubble-assistant"}" style="white-space:pre-wrap">${t.text}</div>
              <div class="msg-meta">${t.role}</div>
            </div>
          `)}

          ${this.actions.length>0?n`
            <div class="card" style="margin-top:8px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
                <div class="card-title" style="margin:0">Proposed actions</div>
                <div style="flex:1"></div>
                <button class="btn btn-secondary btn-sm" @click=${()=>{this.applyAll()}}>Apply all</button>
              </div>

              <div style="display:grid;gap:8px">
                ${this.actions.map((t,e)=>n`
                  <div style="border:1px solid var(--border);border-radius:var(--radius-md);padding:10px;display:grid;gap:8px">
                    <div style="font-size:12px;color:var(--text)">
                      ${t.action.type==="create_project"?`Create project: ${t.action.name}`:`Create task: ${t.action.title}`}
                    </div>
                    <div style="display:flex;gap:8px;align-items:center">
                      <button class="btn btn-ghost btn-sm" ?disabled=${t.status==="running"||t.status==="done"} @click=${()=>{this.applyAction(e)}}>
                        ${t.status==="running"?"Applying…":t.status==="done"?"Applied":"Apply"}
                      </button>
                      <span class="badge ${t.status==="done"?"badge-green":t.status==="error"?"badge-red":t.status==="running"?"badge-yellow":"badge-gray"}">${t.status}</span>
                      ${t.result?n`<span style="font-size:11px;color:var(--muted)">${t.result}</span>`:""}
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
    `}};j([u()],I.prototype,"tenantId",2);j([u()],I.prototype,"page",2);j([o()],I.prototype,"open",2);j([o()],I.prototype,"loadingContext",2);j([o()],I.prototype,"contextError",2);j([o()],I.prototype,"input",2);j([o()],I.prototype,"sending",2);j([o()],I.prototype,"contextSummary",2);j([o()],I.prototype,"messages",2);j([o()],I.prototype,"actions",2);j([o()],I.prototype,"projects",2);j([o()],I.prototype,"tasks",2);j([o()],I.prototype,"claws",2);j([o()],I.prototype,"skills",2);I=j([w("ccl-brain")],I);var Ci=Object.defineProperty,Ti=Object.getOwnPropertyDescriptor,W=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ti(e,s):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(a=(i?l(e,s,a):l(a))||a);return i&&a&&Ci(e,s,a),a};let O=class extends g{constructor(){super(...arguments),this.appState="loading",this.tab="home",this.selectedProjectId="",this.openProjectCreate=!1,this.pendingPrompt="",this.user=null,this.tenantList=[],this.tenant=null,this.theme="dark",this.navCollapsed=!1,this.handleUnauthorized=()=>{Yt(),this.user=null,this.tenant=null,this.appState="landing"},this.handleExitAdmin=()=>{this.appState=this.tenant?"dashboard":"workspace-picker"},this.handleImpersonate=t=>{const e=String(t.detail.tenantId),s=this.tenantList.find(i=>String(i.id)===e);s?this.tenant=s:this.tenant={id:e,name:"Impersonated Workspace",slug:"",role:"viewer",status:"active"},this.appState="dashboard"},this.handleOpenProject=t=>{this.selectedProjectId=t.detail.projectId,this.tab="projects"},this.handleNewProject=()=>{this.openProjectCreate=!0,this.tab="projects"},this.handleNavigate=t=>{this.tab=t.detail.tab},this.handleDashboardPrompt=t=>{this.startDashboardScaffold(t.detail.prompt,t.detail.rootWorkingDirectory)}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTheme(),this.bootstrap(),window.addEventListener("ccl:unauthorized",this.handleUnauthorized),window.addEventListener("ccl:exit-admin",this.handleExitAdmin),window.addEventListener("ccl:impersonate",this.handleImpersonate),window.addEventListener("ccl:open-project",this.handleOpenProject),window.addEventListener("ccl:new-project",this.handleNewProject),window.addEventListener("ccl:navigate",this.handleNavigate),window.addEventListener("ccl:dashboard-prompt",this.handleDashboardPrompt)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ccl:unauthorized",this.handleUnauthorized),window.removeEventListener("ccl:exit-admin",this.handleExitAdmin),window.removeEventListener("ccl:impersonate",this.handleImpersonate),window.removeEventListener("ccl:open-project",this.handleOpenProject),window.removeEventListener("ccl:new-project",this.handleNewProject),window.removeEventListener("ccl:navigate",this.handleNavigate),window.removeEventListener("ccl:dashboard-prompt",this.handleDashboardPrompt)}updated(t){this.appState==="dashboard"&&(t.has("appState")||t.has("tab")||t.has("tenant"))&&this.mountDashboardView()}async bootstrap(){if(!Q()){this.appState="landing";return}const e=k(),s=Ue();if(this.user=We(),e&&s)try{const i=await lt.listTenants();this.tenantList=i;const a=i.find(r=>r.id===s);if(a){this.tenant=a,this.appState="dashboard";return}}catch{}try{this.tenantList=await lt.listTenants(),this.appState="workspace-picker"}catch{this.appState="auth"}}async handleLogin(t){const{token:e,user:s}=t.detail;ze(e),Be(s),this.user=s;try{this.tenantList=await lt.listTenants(),this.appState="workspace-picker"}catch{this.appState="workspace-picker"}}async handleSelectTenant(t){const e=t.detail;try{const{token:s}=await lt.tenantToken(e.id);Jt(s),Vt(e.id),this.tenant=e,this.appState="dashboard"}catch(s){console.error("Failed to get tenant token",s)}}async handleCreateTenant(t){try{const e=await F.create(t.detail.name),{token:s}=await lt.tenantToken(e.id);Jt(s),Vt(e.id),this.tenant=e,this.appState="dashboard"}catch(e){console.error("Failed to create tenant",e)}}handleSignOut(){Yt(),this.user=null,this.tenant=null,this.tenantList=[],this.appState="landing"}handleSwitchWorkspace(){this.appState="workspace-picker"}async startDashboardScaffold(t,e){const s=t.trim();if(s)try{const i=await N.scaffold({prompt:s,rootWorkingDirectory:e?.trim()||null}),r=`Scaffold: ${(s.split(/[.!?\n]/)[0]?.trim()||s).slice(0,120)}`;if(await L.create({title:r,description:s,projectId:i.project.id,assignedClawId:i.scaffold.clawId!=null?String(i.scaffold.clawId):void 0,priority:"high",status:"todo"}),i.scaffold.wip){this.selectedProjectId=i.project.id,this.tab="projects";return}this.selectedProjectId=i.project.id,this.tab="projects"}catch{this.pendingPrompt=s,this.tab="tasks"}}setTab(t){this.tab!==t&&(this.tab=t)}mountDashboardView(){const t=this.querySelector("#dashboard-view-host");if(!(t instanceof HTMLElement))return;const e=this.tenant?.id??"";let s;switch(this.tab){case"home":{const i=document.createElement("ccl-dashboard");i.tenantId=e,s=i;break}case"tasks":{const i=document.createElement("ccl-tasks");i.tenantId=e,this.pendingPrompt&&(i.openTaskPrompt=this.pendingPrompt,this.pendingPrompt=""),s=i;break}case"projects":{const i=document.createElement("ccl-projects");i.tenantId=e,this.selectedProjectId&&(i.selectedProjectId=this.selectedProjectId,this.selectedProjectId=""),this.openProjectCreate&&(i.openCreate=!0,this.openProjectCreate=!1),s=i;break}case"claws":{const i=document.createElement("ccl-claws");i.tenantId=e,s=i;break}case"skills":{const i=document.createElement("ccl-skills");i.tenantId=e,s=i;break}case"workspace":{const i=document.createElement("ccl-workspace");i.tenant=this.tenant,s=i;break}case"billing":{const i=document.createElement("ccl-workspace");i.tenant=this.tenant,i.initialTab="settings",s=i;break}case"logs":{const i=document.createElement("ccl-logs");i.tenantId=e,s=i;break}}t.replaceChildren(s)}loadTheme(){const t=localStorage.getItem("ccl-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;this.theme=t??(e?"dark":"light"),document.documentElement.dataset.theme=this.theme,this.navCollapsed=localStorage.getItem("ccl-nav-collapsed")==="1"}toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",document.documentElement.dataset.theme=this.theme,localStorage.setItem("ccl-theme",this.theme),this.requestUpdate()}toggleNav(){this.navCollapsed=!this.navCollapsed,localStorage.setItem("ccl-nav-collapsed",this.navCollapsed?"1":"0")}svgIcon(t){return`<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">${{home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',projects:'<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>',tasks:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',claws:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',skills:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',workspace:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>',logs:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',billing:'<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M17.66 17.66l1.41 1.41M6.34 6.34L4.93 4.93"/>',admin:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',panelLeft:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',chevronsLeft:'<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',chevronsRight:'<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>'}[t]??""}</svg>`}render(){return this.appState==="loading"?this.renderLoading():this.appState==="landing"?this.renderLanding():this.appState==="auth"?this.renderAuth():this.appState==="workspace-picker"?this.renderWorkspacePicker():this.appState==="admin"?this.renderAdmin():this.renderDashboard()}renderLoading(){return n`
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
    `}renderAuth(){return n`
      <ccl-auth
        @login=${this.handleLogin}
        @register=${this.handleLogin}
      ></ccl-auth>`}renderWorkspacePicker(){return n`
      <div>
        ${this.user?.isSuperadmin?n`
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
      </div>`}renderAdmin(){return n`<ccl-admin></ccl-admin>`}renderDashboard(){const t=this.navCollapsed,e=[{id:"home",label:"Dashboard",icon:"home"},{id:"projects",label:"Projects",icon:"projects"},{id:"tasks",label:"Tasks",icon:"tasks"}],s=[{id:"claws",label:"Claws",icon:"claws"},{id:"skills",label:"Skills",icon:"skills"}],i=[{id:"workspace",label:"Settings",icon:"settings"},{id:"billing",label:"Billing",icon:"billing"},{id:"logs",label:"Logs",icon:"logs"}],a=r=>n`
      <button
        class="nav-item ${this.tab===r.id?"active":""}"
        title="${r.label}"
        @click=${()=>this.setTab(r.id)}
      >
        <span .innerHTML=${this.svgIcon(r.icon)}></span>
        <span class="nav-item-label">${r.label}</span>
      </button>
    `;return n`
      <div class="shell ${t?"nav-collapsed":""}">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <div class="brand">
              <img class="brand-logo" src="/claw-logo.png" alt="CoderClawLink" onerror="this.style.display='none'">
              ${t?"":n`<span class="brand-name">CoderClawLink</span><span class="brand-badge">BETA</span>`}
            </div>
          </div>
          <div class="topbar-right">
            ${this.user?.isSuperadmin?n`
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
    `}};O.styles=Ke``;W([o()],O.prototype,"appState",2);W([o()],O.prototype,"tab",2);W([o()],O.prototype,"selectedProjectId",2);W([o()],O.prototype,"openProjectCreate",2);W([o()],O.prototype,"pendingPrompt",2);W([o()],O.prototype,"user",2);W([o()],O.prototype,"tenantList",2);W([o()],O.prototype,"tenant",2);W([o()],O.prototype,"theme",2);W([o()],O.prototype,"navCollapsed",2);O=W([w("ccl-app")],O);
//# sourceMappingURL=index-o8uu1SQl.js.map
