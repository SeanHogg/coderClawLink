var Rn=Object.create;var Zt=Object.defineProperty;var zn=Object.getOwnPropertyDescriptor;var ye=(n,s)=>(s=Symbol[n])?s:Symbol.for("Symbol."+n),Tt=n=>{throw TypeError(n)};var be=(n,s,t)=>s in n?Zt(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t;var ve=(n,s)=>Zt(n,"name",{value:s,configurable:!0});var j=n=>[,,,Rn(n?.[ye("metadata")]??null)],fe=["class","method","getter","setter","accessor","field","value","get","set"],Et=n=>n!==void 0&&typeof n!="function"?Tt("Function expected"):n,Nn=(n,s,t,e,a)=>({kind:fe[n],name:s,metadata:e,addInitializer:d=>t._?Tt("Already initialized"):a.push(Et(d||null))}),On=(n,s)=>be(s,ye("metadata"),n[3]),i=(n,s,t,e)=>{for(var a=0,d=n[s>>1],h=d&&d.length;a<h;a++)s&1?d[a].call(t):e=d[a].call(t,e);return e},o=(n,s,t,e,a,d)=>{var h,p,m,x,b,v=s&7,z=!!(s&8),g=!!(s&16),B=v>3?n.length+1:v?z?1:2:0,lt=fe[v+5],Ot=v>3&&(n[B-1]=[]),Yt=n[B]||(n[B]=[]),Y=v&&(!g&&!z&&(a=a.prototype),v<5&&(v>3||!g)&&zn(v<4?a:{get[t](){return ge(this,d)},set[t](V){return me(this,d,V)}},t));v?g&&v<4&&ve(d,(v>2?"set ":v>1?"get ":"")+t):ve(a,t);for(var Vt=e.length-1;Vt>=0;Vt--)x=Nn(v,t,m={},n[3],Yt),v&&(x.static=z,x.private=g,b=x.access={has:g?V=>Ln(a,V):V=>t in V},v^3&&(b.get=g?V=>(v^1?ge:Un)(V,a,v^4?d:Y.get):V=>V[t]),v>2&&(b.set=g?(V,Gt)=>me(V,a,Gt,v^4?d:Y.set):(V,Gt)=>V[t]=Gt)),p=(0,e[Vt])(v?v<4?g?d:Y[lt]:v>4?void 0:{get:Y.get,set:Y.set}:a,x),m._=1,v^4||p===void 0?Et(p)&&(v>4?Ot.unshift(p):v?g?d=p:Y[lt]=p:a=p):typeof p!="object"||p===null?Tt("Object expected"):(Et(h=p.get)&&(Y.get=h),Et(h=p.set)&&(Y.set=h),Et(h=p.init)&&Ot.unshift(h));return v||On(n,a),Y&&Zt(a,t,Y),g?v^4?d:Y:a},l=(n,s,t)=>be(n,typeof s!="symbol"?s+"":s,t),Xt=(n,s,t)=>s.has(n)||Tt("Cannot "+t),Ln=(n,s)=>Object(s)!==s?Tt('Cannot use the "in" operator on this value'):n.has(s),ge=(n,s,t)=>(Xt(n,s,"read from private field"),t?t.call(n):s.get(n));var me=(n,s,t,e)=>(Xt(n,s,"write to private field"),e?e.call(n,t):s.set(n,t),t),Un=(n,s,t)=>(Xt(n,s,"access private method"),t);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const d of a)if(d.type==="childList")for(const h of d.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&e(h)}).observe(document,{childList:!0,subtree:!0});function t(a){const d={};return a.integrity&&(d.integrity=a.integrity),a.referrerPolicy&&(d.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?d.credentials="include":a.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function e(a){if(a.ep)return;a.ep=!0;const d=t(a);fetch(a.href,d)}})();const Ht=globalThis,ee=Ht.ShadowRoot&&(Ht.ShadyCSS===void 0||Ht.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),$e=new WeakMap;let wn=class{constructor(s,t,e){if(this._$cssResult$=!0,e!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=t}get styleSheet(){let s=this.o;const t=this.t;if(ee&&s===void 0){const e=t!==void 0&&t.length===1;e&&(s=$e.get(t)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),e&&$e.set(t,s))}return s}toString(){return this.cssText}};const jn=n=>new wn(typeof n=="string"?n:n+"",void 0,se),Bn=(n,...s)=>{const t=n.length===1?n[0]:s.reduce((e,a,d)=>e+(h=>{if(h._$cssResult$===!0)return h.cssText;if(typeof h=="number")return h;throw Error("Value passed to 'css' function must be a 'css' function result: "+h+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+n[d+1],n[0]);return new wn(t,n,se)},Hn=(n,s)=>{if(ee)n.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of s){const e=document.createElement("style"),a=Ht.litNonce;a!==void 0&&e.setAttribute("nonce",a),e.textContent=t.cssText,n.appendChild(e)}},we=ee?n=>n:n=>n instanceof CSSStyleSheet?(s=>{let t="";for(const e of s.cssRules)t+=e.cssText;return jn(t)})(n):n;const{is:Kn,defineProperty:Jn,getOwnPropertyDescriptor:Fn,getOwnPropertyNames:qn,getOwnPropertySymbols:Wn,getPrototypeOf:Yn}=Object,qt=globalThis,xe=qt.trustedTypes,Vn=xe?xe.emptyScript:"",Gn=qt.reactiveElementPolyfillSupport,Dt=(n,s)=>n,Kt={toAttribute(n,s){switch(s){case Boolean:n=n?Vn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,s){let t=n;switch(s){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ie=(n,s)=>!Kn(n,s),ke={attribute:!0,type:String,converter:Kt,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??=Symbol("metadata"),qt.litPropertyMetadata??=new WeakMap;let $t=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,t=ke){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(s,t),!t.noAccessor){const e=Symbol(),a=this.getPropertyDescriptor(s,e,t);a!==void 0&&Jn(this.prototype,s,a)}}static getPropertyDescriptor(s,t,e){const{get:a,set:d}=Fn(this.prototype,s)??{get(){return this[t]},set(h){this[t]=h}};return{get:a,set(h){const p=a?.call(this);d?.call(this,h),this.requestUpdate(s,p,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??ke}static _$Ei(){if(this.hasOwnProperty(Dt("elementProperties")))return;const s=Yn(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(Dt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Dt("properties"))){const t=this.properties,e=[...qn(t),...Wn(t)];for(const a of e)this.createProperty(a,t[a])}const s=this[Symbol.metadata];if(s!==null){const t=litPropertyMetadata.get(s);if(t!==void 0)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const a=this._$Eu(t,e);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const t=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const a of e)t.unshift(we(a))}else s!==void 0&&t.push(we(s));return t}static _$Eu(s,t){const e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){const s=new Map,t=this.constructor.elementProperties;for(const e of t.keys())this.hasOwnProperty(e)&&(s.set(e,this[e]),delete this[e]);s.size>0&&(this._$Ep=s)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Hn(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,t,e){this._$AK(s,e)}_$ET(s,t){const e=this.constructor.elementProperties.get(s),a=this.constructor._$Eu(s,e);if(a!==void 0&&e.reflect===!0){const d=(e.converter?.toAttribute!==void 0?e.converter:Kt).toAttribute(t,e.type);this._$Em=s,d==null?this.removeAttribute(a):this.setAttribute(a,d),this._$Em=null}}_$AK(s,t){const e=this.constructor,a=e._$Eh.get(s);if(a!==void 0&&this._$Em!==a){const d=e.getPropertyOptions(a),h=typeof d.converter=="function"?{fromAttribute:d.converter}:d.converter?.fromAttribute!==void 0?d.converter:Kt;this._$Em=a;const p=h.fromAttribute(t,d.type);this[a]=p??this._$Ej?.get(a)??p,this._$Em=null}}requestUpdate(s,t,e,a=!1,d){if(s!==void 0){const h=this.constructor;if(a===!1&&(d=this[s]),e??=h.getPropertyOptions(s),!((e.hasChanged??ie)(d,t)||e.useDefault&&e.reflect&&d===this._$Ej?.get(s)&&!this.hasAttribute(h._$Eu(s,e))))return;this.C(s,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,t,{useDefault:e,reflect:a,wrapped:d},h){e&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,h??t??this[s]),d!==!0||h!==void 0)||(this._$AL.has(s)||(this.hasUpdated||e||(t=void 0),this._$AL.set(s,t)),a===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,d]of this._$Ep)this[a]=d;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[a,d]of e){const{wrapped:h}=d,p=this[a];h!==!0||this._$AL.has(a)||p===void 0||this.C(a,void 0,d,p)}}let s=!1;const t=this._$AL;try{s=this.shouldUpdate(t),s?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw s=!1,this._$EM(),e}s&&this._$AE(t)}willUpdate(s){}_$AE(s){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(s){}firstUpdated(s){}};$t.elementStyles=[],$t.shadowRootOptions={mode:"open"},$t[Dt("elementProperties")]=new Map,$t[Dt("finalized")]=new Map,Gn?.({ReactiveElement:$t}),(qt.reactiveElementVersions??=[]).push("2.1.2");const ae=globalThis,Se=n=>n,Jt=ae.trustedTypes,Ae=Jt?Jt.createPolicy("lit-html",{createHTML:n=>n}):void 0,xn="$lit$",gt=`lit$${Math.random().toFixed(9).slice(2)}$`,kn="?"+gt,Zn=`<${kn}>`,ft=document,Pt=()=>ft.createComment(""),Rt=n=>n===null||typeof n!="object"&&typeof n!="function",ne=Array.isArray,Xn=n=>ne(n)||typeof n?.[Symbol.iterator]=="function",Qt=`[ 	
\f\r]`,_t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ee=/-->/g,Te=/>/g,yt=RegExp(`>|${Qt}(?:([^\\s"'>=/]+)(${Qt}*=${Qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,Ie=/"/g,Sn=/^(?:script|style|textarea|title)$/i,Qn=n=>(s,...t)=>({_$litType$:n,strings:s,values:t}),r=Qn(1),St=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),De=new WeakMap,bt=ft.createTreeWalker(ft,129);function An(n,s){if(!ne(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ae!==void 0?Ae.createHTML(s):s}const Cn=(n,s)=>{const t=n.length-1,e=[];let a,d=s===2?"<svg>":s===3?"<math>":"",h=_t;for(let p=0;p<t;p++){const m=n[p];let x,b,v=-1,z=0;for(;z<m.length&&(h.lastIndex=z,b=h.exec(m),b!==null);)z=h.lastIndex,h===_t?b[1]==="!--"?h=Ee:b[1]!==void 0?h=Te:b[2]!==void 0?(Sn.test(b[2])&&(a=RegExp("</"+b[2],"g")),h=yt):b[3]!==void 0&&(h=yt):h===yt?b[0]===">"?(h=a??_t,v=-1):b[1]===void 0?v=-2:(v=h.lastIndex-b[2].length,x=b[1],h=b[3]===void 0?yt:b[3]==='"'?Ie:_e):h===Ie||h===_e?h=yt:h===Ee||h===Te?h=_t:(h=yt,a=void 0);const g=h===yt&&n[p+1].startsWith("/>")?" ":"";d+=h===_t?m+Zn:v>=0?(e.push(x),m.slice(0,v)+xn+m.slice(v)+gt+g):m+gt+(v===-2?p:g)}return[An(n,d+(n[t]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),e]};class zt{constructor({strings:s,_$litType$:t},e){let a;this.parts=[];let d=0,h=0;const p=s.length-1,m=this.parts,[x,b]=Cn(s,t);if(this.el=zt.createElement(x,e),bt.currentNode=this.el.content,t===2||t===3){const v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(a=bt.nextNode())!==null&&m.length<p;){if(a.nodeType===1){if(a.hasAttributes())for(const v of a.getAttributeNames())if(v.endsWith(xn)){const z=b[h++],g=a.getAttribute(v).split(gt),B=/([.?@])?(.*)/.exec(z);m.push({type:1,index:d,name:B[2],strings:g,ctor:B[1]==="."?er:B[1]==="?"?sr:B[1]==="@"?ir:Wt}),a.removeAttribute(v)}else v.startsWith(gt)&&(m.push({type:6,index:d}),a.removeAttribute(v));if(Sn.test(a.tagName)){const v=a.textContent.split(gt),z=v.length-1;if(z>0){a.textContent=Jt?Jt.emptyScript:"";for(let g=0;g<z;g++)a.append(v[g],Pt()),bt.nextNode(),m.push({type:2,index:++d});a.append(v[z],Pt())}}}else if(a.nodeType===8)if(a.data===kn)m.push({type:2,index:d});else{let v=-1;for(;(v=a.data.indexOf(gt,v+1))!==-1;)m.push({type:7,index:d}),v+=gt.length-1}d++}}static createElement(s,t){const e=ft.createElement("template");return e.innerHTML=s,e}}function At(n,s,t=n,e){if(s===St)return s;let a=e!==void 0?t._$Co?.[e]:t._$Cl;const d=Rt(s)?void 0:s._$litDirective$;return a?.constructor!==d&&(a?._$AO?.(!1),d===void 0?a=void 0:(a=new d(n),a._$AT(n,t,e)),e!==void 0?(t._$Co??=[])[e]=a:t._$Cl=a),a!==void 0&&(s=At(n,a._$AS(n,s.values),a,e)),s}class tr{constructor(s,t){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){const{el:{content:t},parts:e}=this._$AD,a=(s?.creationScope??ft).importNode(t,!0);bt.currentNode=a;let d=bt.nextNode(),h=0,p=0,m=e[0];for(;m!==void 0;){if(h===m.index){let x;m.type===2?x=new Nt(d,d.nextSibling,this,s):m.type===1?x=new m.ctor(d,m.name,m.strings,this,s):m.type===6&&(x=new ar(d,this,s)),this._$AV.push(x),m=e[++p]}h!==m?.index&&(d=bt.nextNode(),h++)}return bt.currentNode=ft,a}p(s){let t=0;for(const e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(s,e,t),t+=e.strings.length-2):e._$AI(s[t])),t++}}class Nt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,t,e,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=s,this._$AB=t,this._$AM=e,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&s?.nodeType===11&&(s=t.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,t=this){s=At(this,s,t),Rt(s)?s===W||s==null||s===""?(this._$AH!==W&&this._$AR(),this._$AH=W):s!==this._$AH&&s!==St&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):Xn(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==W&&Rt(this._$AH)?this._$AA.nextSibling.data=s:this.T(ft.createTextNode(s)),this._$AH=s}$(s){const{values:t,_$litType$:e}=s,a=typeof e=="number"?this._$AC(s):(e.el===void 0&&(e.el=zt.createElement(An(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===a)this._$AH.p(t);else{const d=new tr(a,this),h=d.u(this.options);d.p(t),this.T(h),this._$AH=d}}_$AC(s){let t=De.get(s.strings);return t===void 0&&De.set(s.strings,t=new zt(s)),t}k(s){ne(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let e,a=0;for(const d of s)a===t.length?t.push(e=new Nt(this.O(Pt()),this.O(Pt()),this,this.options)):e=t[a],e._$AI(d),a++;a<t.length&&(this._$AR(e&&e._$AB.nextSibling,a),t.length=a)}_$AR(s=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);s!==this._$AB;){const e=Se(s).nextSibling;Se(s).remove(),s=e}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}}class Wt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,t,e,a,d){this.type=1,this._$AH=W,this._$AN=void 0,this.element=s,this.name=t,this._$AM=a,this.options=d,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=W}_$AI(s,t=this,e,a){const d=this.strings;let h=!1;if(d===void 0)s=At(this,s,t,0),h=!Rt(s)||s!==this._$AH&&s!==St,h&&(this._$AH=s);else{const p=s;let m,x;for(s=d[0],m=0;m<d.length-1;m++)x=At(this,p[e+m],t,m),x===St&&(x=this._$AH[m]),h||=!Rt(x)||x!==this._$AH[m],x===W?s=W:s!==W&&(s+=(x??"")+d[m+1]),this._$AH[m]=x}h&&!a&&this.j(s)}j(s){s===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}}class er extends Wt{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===W?void 0:s}}class sr extends Wt{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==W)}}class ir extends Wt{constructor(s,t,e,a,d){super(s,t,e,a,d),this.type=5}_$AI(s,t=this){if((s=At(this,s,t,0)??W)===St)return;const e=this._$AH,a=s===W&&e!==W||s.capture!==e.capture||s.once!==e.once||s.passive!==e.passive,d=s!==W&&(e===W||a);a&&this.element.removeEventListener(this.name,this,e),d&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}}class ar{constructor(s,t,e){this.element=s,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(s){At(this,s)}}const nr=ae.litHtmlPolyfillSupport;nr?.(zt,Nt),(ae.litHtmlVersions??=[]).push("3.3.2");const rr=(n,s,t)=>{const e=t?.renderBefore??s;let a=e._$litPart$;if(a===void 0){const d=t?.renderBefore??null;e._$litPart$=a=new Nt(s.insertBefore(Pt(),d),d,void 0,t??{})}return a._$AI(n),a};const re=globalThis;class N extends $t{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=rr(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return St}}N._$litElement$=!0,N.finalized=!0,re.litElementHydrateSupport?.({LitElement:N});const or=re.litElementPolyfillSupport;or?.({LitElement:N});(re.litElementVersions??=[]).push("4.2.2");const H=n=>(s,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,s)}):customElements.define(n,s)};const lr={attribute:!0,type:String,converter:Kt,reflect:!1,hasChanged:ie},dr=(n=lr,s,t)=>{const{kind:e,metadata:a}=t;let d=globalThis.litPropertyMetadata.get(a);if(d===void 0&&globalThis.litPropertyMetadata.set(a,d=new Map),e==="setter"&&((n=Object.create(n)).wrapped=!0),d.set(t.name,n),e==="accessor"){const{name:h}=t;return{set(p){const m=s.get.call(this);s.set.call(this,p),this.requestUpdate(h,m,n,!0,p)},init(p){return p!==void 0&&this.C(h,void 0,n,p),p}}}if(e==="setter"){const{name:h}=t;return function(p){const m=this[h];s.call(this,p),this.requestUpdate(h,m,n,!0,p)}}throw Error("Unsupported decorator location: "+e)};function k(n){return(s,t)=>typeof t=="object"?dr(n,s,t):((e,a,d)=>{const h=a.hasOwnProperty(d);return a.constructor.createProperty(d,e),h?Object.getOwnPropertyDescriptor(a,d):void 0})(n,s,t)}function c(n){return k({...n,state:!0,attribute:!1})}const En=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",oe="ccl-web-token",le="ccl-tenant-token",de="ccl-tenant-id",ce="ccl-user";function he(){return localStorage.getItem(oe)}function ot(){return localStorage.getItem(le)}function Tn(){return localStorage.getItem(de)}function _n(n){localStorage.setItem(oe,n)}function Ct(n){localStorage.setItem(le,n)}function te(n){localStorage.setItem(de,n)}function In(n){localStorage.setItem(ce,JSON.stringify(n))}function Dn(){const n=localStorage.getItem(ce);return n?JSON.parse(n):null}function Ft(){localStorage.removeItem(oe),localStorage.removeItem(le),localStorage.removeItem(de),localStorage.removeItem(ce)}class Mn extends Error{constructor(s,t){super(t),this.status=s}}async function S(n,s={}){const{token:t,...e}=s,a=t??ot()??he(),d=new Headers(e.headers);d.set("Content-Type","application/json"),a&&d.set("Authorization",`Bearer ${a}`);const h=await fetch(`${En}${n}`,{...e,headers:d});if(h.status===401&&(Ft(),window.dispatchEvent(new CustomEvent("ccl:unauthorized"))),!h.ok){let p=h.statusText;try{const m=await h.json();p=m.error??m.message??p}catch{}throw new Mn(h.status,p)}if(h.status!==204)return h.json()}const mt={async register(n,s){return S("/api/auth/web/register",{method:"POST",body:JSON.stringify({email:n,password:s}),token:null})},async login(n,s){return S("/api/auth/web/login",{method:"POST",body:JSON.stringify({email:n,password:s}),token:null})},async tenantToken(n){return S("/api/auth/tenant-token",{method:"POST",body:JSON.stringify({tenantId:n})})},async listTenants(){return S("/api/tenants")}},Mt={async create(n){return S("/api/tenants",{method:"POST",body:JSON.stringify({name:n})})},async get(n){return S(`/api/tenants/${n}`)},async inviteMember(n,s,t){return S(`/api/tenants/${n}/members`,{method:"POST",body:JSON.stringify({email:s,role:t})})},async removeMember(n,s){return S(`/api/tenants/${n}/members/${s}`,{method:"DELETE"})}},wt={async list(){return S("/api/projects")},async create(n){return S("/api/projects",{method:"POST",body:JSON.stringify(n)})},async update(n,s){return S(`/api/projects/${n}`,{method:"PATCH",body:JSON.stringify(s)})},async remove(n){return S(`/api/projects/${n}`,{method:"DELETE"})}},rt={async list(n){const s=new URLSearchParams;return n?.projectId&&s.set("projectId",n.projectId),n?.status&&s.set("status",n.status),n?.archived&&s.set("archived","true"),S(`/api/tasks${s.size?`?${s}`:""}`)},async create(n){return S("/api/tasks",{method:"POST",body:JSON.stringify(n)})},async update(n,s){return S(`/api/tasks/${n}`,{method:"PATCH",body:JSON.stringify(s)})},async remove(n){return S(`/api/tasks/${n}`,{method:"DELETE"})},async run(n,s){return S(`/api/tasks/${n}/executions`,{method:"POST",body:JSON.stringify({payload:s})})},async executions(n){return S(`/api/tasks/${n}/executions`)}},xt={async list(){return S("/api/claws")},async register(n){return S("/api/claws",{method:"POST",body:JSON.stringify({name:n})})},async remove(n){return S(`/api/claws/${n}`,{method:"DELETE"})},async status(n){return S(`/api/claws/${n}/status`)},wsUrl(n){const s=En.replace(/^http/,"ws"),t=ot()??"";return`${s}/api/claws/${n}/ws?token=${encodeURIComponent(t)}`}},pe={async list(){return S("/marketplace/skills")}},kt={async listTenant(){return S("/api/skill-assignments/tenant")},async assignTenant(n){return S("/api/skill-assignments/tenant",{method:"POST",body:JSON.stringify({slug:n})})},async unassignTenant(n){return S(`/api/skill-assignments/tenant/${n}`,{method:"DELETE"})},async assignClaw(n,s){return S(`/api/skill-assignments/claws/${n}`,{method:"POST",body:JSON.stringify({slug:s})})}},ue={async list(n){const s=new URLSearchParams;return n?.taskId&&s.set("taskId",n.taskId),n?.clawId&&s.set("clawId",n.clawId),S(`/api/executions${s.size?`?${s}`:""}`)}},Me=Object.freeze(Object.defineProperty({__proto__:null,ApiError:Mn,auth:mt,claws:xt,clearSession:Ft,executions:ue,getTenantId:Tn,getTenantToken:ot,getUser:Dn,getWebToken:he,marketplace:pe,projects:wt,setTenantId:te,setTenantToken:Ct,setUser:In,setWebToken:_n,skillAssignments:kt,tasks:rt,tenants:Mt},Symbol.toStringTag,{value:"Module"}));var je,Be,He,Ke,Je,Fe,qe,J;qe=[H("ccl-auth")];class pt extends(Fe=N,Je=[c()],Ke=[c()],He=[c()],Be=[c()],je=[c()],Fe){constructor(){super(...arguments);l(this,"mode",i(J,8,this,"login")),i(J,11,this);l(this,"email",i(J,12,this,"")),i(J,15,this);l(this,"password",i(J,16,this,"")),i(J,19,this);l(this,"loading",i(J,20,this,!1)),i(J,23,this);l(this,"error",i(J,24,this,"")),i(J,27,this)}createRenderRoot(){return this}async submit(t){if(t.preventDefault(),!(!this.email||!this.password)){this.loading=!0,this.error="";try{const a=await(this.mode==="login"?mt.login:mt.register)(this.email,this.password);this.dispatchEvent(new CustomEvent(this.mode,{detail:a,bubbles:!0,composed:!0}))}catch(e){this.error=e.message??"An error occurred"}finally{this.loading=!1}}}render(){return r`
      <div class="auth-shell">
        <div class="auth-card">
          <div class="auth-logo">
            <img src="/logo.png" alt="CoderClawLink" onerror="this.style.display='none'" style="width:36px;height:36px">
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
    `}}J=j(Fe),o(J,5,"mode",Je,pt),o(J,5,"email",Ke,pt),o(J,5,"password",He,pt),o(J,5,"loading",Be,pt),o(J,5,"error",je,pt),pt=o(J,0,"CclAuth",qe,pt),i(J,1,pt);var We,Ye,Ve,Ge,Ze,Xe,Qe,Ce,O;Ce=[H("ccl-workspace-picker")];class dt extends(Qe=N,Xe=[k({type:Array})],Ze=[k({type:Object})],Ge=[c()],Ve=[c()],Ye=[c()],We=[c()],Qe){constructor(){super(...arguments);l(this,"tenants",i(O,8,this,[])),i(O,11,this);l(this,"user",i(O,12,this,null)),i(O,15,this);l(this,"showCreate",i(O,16,this,!1)),i(O,19,this);l(this,"newName",i(O,20,this,"")),i(O,23,this);l(this,"creating",i(O,24,this,!1)),i(O,27,this);l(this,"error",i(O,28,this,"")),i(O,31,this)}createRenderRoot(){return this}selectTenant(t){this.dispatchEvent(new CustomEvent("select-tenant",{detail:t,bubbles:!0,composed:!0}))}async createTenant(t){if(t.preventDefault(),!!this.newName.trim()){this.creating=!0,this.error="";try{this.dispatchEvent(new CustomEvent("create-tenant",{detail:{name:this.newName.trim()},bubbles:!0,composed:!0}))}catch(e){this.error=e.message,this.creating=!1}}}signOut(){this.dispatchEvent(new CustomEvent("sign-out",{bubbles:!0,composed:!0}))}render(){return r`
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
    `}}O=j(Qe),o(O,5,"tenants",Xe,dt),o(O,5,"user",Ze,dt),o(O,5,"showCreate",Ge,dt),o(O,5,"newName",Ve,dt),o(O,5,"creating",Ye,dt),o(O,5,"error",We,dt),dt=o(O,0,"CclWorkspacePicker",Ce,dt),i(O,1,dt);var ts,es,ss,is,as,ns,rs,os,ls,ds,A;ds=[H("ccl-projects")];class Q extends(ls=N,os=[k()],rs=[c()],ns=[c()],as=[c()],is=[c()],ss=[c()],es=[c()],ts=[c()],ls){constructor(){super(...arguments);l(this,"tenantId",i(A,8,this,"")),i(A,11,this);l(this,"items",i(A,12,this,[])),i(A,15,this);l(this,"loading",i(A,16,this,!0)),i(A,19,this);l(this,"error",i(A,20,this,"")),i(A,23,this);l(this,"showModal",i(A,24,this,!1)),i(A,27,this);l(this,"editTarget",i(A,28,this,null)),i(A,31,this);l(this,"form",i(A,32,this,{name:"",description:""})),i(A,35,this);l(this,"saving",i(A,36,this,!1)),i(A,39,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.items=await wt.list()}catch(t){this.error=t.message}finally{this.loading=!1}}openCreate(){this.editTarget=null,this.form={name:"",description:""},this.showModal=!0}openEdit(t){this.editTarget=t,this.form={name:t.name,description:t.description??""},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await wt.update(this.editTarget.id,this.form);this.items=this.items.map(a=>a.id===e.id?e:a)}else{const e=await wt.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async remove(t){if(confirm(`Delete project "${t.name}"? This cannot be undone.`))try{await wt.remove(t.id),this.items=this.items.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}statusBadge(t){return r`<span class="badge ${{active:"badge-green",completed:"badge-blue",archived:"badge-gray",on_hold:"badge-yellow"}[t]??"badge-gray"}">${t.replace("_"," ")}</span>`}render(){return r`
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
    `}}A=j(ls),o(A,5,"tenantId",os,Q),o(A,5,"items",rs,Q),o(A,5,"loading",ns,Q),o(A,5,"error",as,Q),o(A,5,"showModal",is,Q),o(A,5,"editTarget",ss,Q),o(A,5,"form",es,Q),o(A,5,"saving",ts,Q),Q=o(A,0,"CclProjects",ds,Q),i(A,1,Q);const Lt=["todo","in_progress","in_review","done","blocked"],It={todo:"To Do",in_progress:"In Progress",in_review:"In Review",done:"Done",blocked:"Blocked"},Pe=["low","medium","high","critical"],cr={low:"badge-gray",medium:"badge-blue",high:"badge-yellow",critical:"badge-red"};var cs,hs,ps,us,vs,gs,ms,ys,bs,fs,$s,ws,xs,ks,Ss,As,Es,Ts,_s,Is,Ds,Ms,Ps,u;Ps=[H("ccl-tasks")];class M extends(Ms=N,Ds=[k()],Is=[c()],_s=[c()],Ts=[c()],Es=[c()],As=[c()],Ss=[c()],ks=[c()],xs=[c()],ws=[c()],$s=[c()],fs=[c()],bs=[c()],ys=[c()],ms=[c()],gs=[c()],vs=[c()],us=[c()],ps=[c()],hs=[c()],cs=[c()],Ms){constructor(){super(...arguments);l(this,"tenantId",i(u,8,this,"")),i(u,11,this);l(this,"items",i(u,12,this,[])),i(u,15,this);l(this,"projects",i(u,16,this,[])),i(u,19,this);l(this,"claws",i(u,20,this,[])),i(u,23,this);l(this,"loading",i(u,24,this,!0)),i(u,27,this);l(this,"error",i(u,28,this,"")),i(u,31,this);l(this,"view",i(u,32,this,"kanban")),i(u,35,this);l(this,"filterStatus",i(u,36,this,"")),i(u,39,this);l(this,"filterProject",i(u,40,this,"")),i(u,43,this);l(this,"filterPriority",i(u,44,this,"")),i(u,47,this);l(this,"search",i(u,48,this,"")),i(u,51,this);l(this,"showArchived",i(u,52,this,!1)),i(u,55,this);l(this,"showModal",i(u,56,this,!1)),i(u,59,this);l(this,"editTarget",i(u,60,this,null)),i(u,63,this);l(this,"form",i(u,64,this,{})),i(u,67,this);l(this,"saving",i(u,68,this,!1)),i(u,71,this);l(this,"drawerTask",i(u,72,this,null)),i(u,75,this);l(this,"drawerExecutions",i(u,76,this,[])),i(u,79,this);l(this,"drawerTab",i(u,80,this,"detail")),i(u,83,this);l(this,"running",i(u,84,this,!1)),i(u,87,this);l(this,"dragTaskId",i(u,88,this,"")),i(u,91,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.projects,this.claws]=await Promise.all([rt.list({archived:this.showArchived}),wt.list(),xt.list()])}catch(t){this.error=t.message}finally{this.loading=!1}}get filtered(){return this.items.filter(t=>!(this.filterStatus&&t.status!==this.filterStatus||this.filterProject&&t.projectId!==this.filterProject||this.filterPriority&&t.priority!==this.filterPriority||this.search&&!t.title.toLowerCase().includes(this.search.toLowerCase())))}tasksForStatus(t){return this.filtered.filter(e=>e.status===t)}openCreate(){this.editTarget=null,this.form={status:"todo",priority:"medium"},this.showModal=!0}openEdit(t,e){e?.stopPropagation(),this.editTarget=t,this.form={...t},this.showModal=!0}async save(t){t.preventDefault(),this.saving=!0;try{if(this.editTarget){const e=await rt.update(this.editTarget.id,this.form);this.items=this.items.map(a=>a.id===e.id?e:a),this.drawerTask?.id===e.id&&(this.drawerTask=e)}else{const e=await rt.create(this.form);this.items=[e,...this.items]}this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async remove(t,e){e.stopPropagation(),confirm(`Delete "${t.title}"?`)&&(await rt.remove(t.id),this.items=this.items.filter(a=>a.id!==t.id),this.drawerTask?.id===t.id&&(this.drawerTask=null))}async patchStatus(t,e){const a=await rt.update(t,{status:e});this.items=this.items.map(d=>d.id===t?a:d),this.drawerTask?.id===t&&(this.drawerTask=a)}async runTask(t,e){e.stopPropagation(),this.running=!0;try{const a=await rt.run(t.id),d=await rt.update(t.id,{status:"in_progress"});this.items=this.items.map(h=>h.id===d.id?d:h),this.drawerTask?.id===t.id&&(this.drawerTask=d,this.drawerExecutions=[a,...this.drawerExecutions])}catch(a){this.error=a.message}finally{this.running=!1}}async openDrawer(t){this.drawerTask=t,this.drawerTab="detail";try{this.drawerExecutions=await rt.executions(t.id)}catch{this.drawerExecutions=[]}}closeDrawer(){this.drawerTask=null}dragStart(t){this.dragTaskId=t}dragOver(t){t.preventDefault()}async drop(t,e){t.preventDefault(),this.dragTaskId&&(await this.patchStatus(this.dragTaskId,e),this.dragTaskId="")}projectName(t){return t?this.projects.find(e=>e.id===t)?.name??t:"—"}clawName(t){return t?this.claws.find(e=>e.id===t)?.name??t:"Unassigned"}priorityBadge(t){return r`<span class="badge ${cr[t]}">${t}</span>`}statusBadge(t){return r`<span class="badge ${{todo:"badge-gray",in_progress:"badge-blue",in_review:"badge-yellow",done:"badge-green",blocked:"badge-red"}[t]}">${It[t]}</span>`}formatDate(t){return t?new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"}):""}render(){return r`
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
          ${Lt.map(t=>r`<option value=${t}>${It[t]}</option>`)}
        </select>
        <select class="select" style="max-width:160px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterProject=t.target.value}}>
          <option value="">All projects</option>
          ${this.projects.map(t=>r`<option value=${t.id}>${t.name}</option>`)}
        </select>
        <select class="select" style="max-width:140px;height:32px;padding:4px 10px"
          @change=${t=>{this.filterPriority=t.target.value}}>
          <option value="">All priorities</option>
          ${Pe.map(t=>r`<option value=${t}>${t}</option>`)}
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
        ${Lt.map(t=>r`
          <div class="kanban-col"
            @dragover=${this.dragOver}
            @drop=${e=>this.drop(e,t)}>
            <div class="kanban-col-header">
              <div class="kanban-col-title">${It[t]}</div>
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
                  <div style="display:flex;gap:4px" @click=${a=>a.stopPropagation()}>
                    <button class="btn btn-ghost btn-sm" @click=${a=>this.openEdit(e,a)}>Edit</button>
                    <button class="btn btn-danger btn-sm" @click=${a=>this.remove(e,a)}>Delete</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}renderGantt(){const t=this.filtered.filter(g=>g.dueDate||g.createdAt);if(t.length===0)return r`<div class="empty-state"><div class="empty-state-title">No tasks with dates</div><div class="empty-state-sub">Set due dates on tasks to see the timeline</div></div>`;const e=t.map(g=>new Date(g.dueDate??g.createdAt)),a=new Date(Math.min(...e.map(g=>g.getTime()))),d=new Date(Math.max(...e.map(g=>g.getTime())));a.setDate(1),d.setMonth(d.getMonth()+1),d.setDate(0);const h=Math.ceil((d.getTime()-a.getTime())/864e5)+1,p=24,m=h*p,x=[],b=new Date(a);for(;b<=d;){const g=Math.floor((b.getTime()-a.getTime())/864e5),B=new Date(b.getFullYear(),b.getMonth()+1,0).getDate();x.push({label:b.toLocaleDateString(void 0,{month:"short",year:"2-digit"}),left:g*p,width:B*p}),b.setMonth(b.getMonth()+1),b.setDate(1)}const z=Math.floor((new Date().getTime()-a.getTime())/864e5)*p;return r`
      <div style="overflow-x:auto">
        <div style="min-width:${m+200}px">
          <!-- Month headers -->
          <div style="display:flex;margin-left:200px;border-bottom:1px solid var(--border)">
            ${x.map(g=>r`
              <div style="min-width:${g.width}px;padding:4px 8px;font-size:11px;color:var(--muted);border-right:1px solid var(--border)">${g.label}</div>
            `)}
          </div>
          <!-- Tasks -->
          <div style="position:relative">
            <!-- Today line -->
            ${z>=0&&z<=m?r`
              <div style="position:absolute;left:${200+z}px;top:0;bottom:0;width:2px;background:var(--accent);opacity:0.6;z-index:1"></div>
            `:""}

            ${t.map(g=>{const B=new Date(g.createdAt),lt=new Date(g.dueDate??g.createdAt),Ot=Math.floor((B.getTime()-a.getTime())/864e5),Yt=Math.max(1,Math.ceil((lt.getTime()-B.getTime())/864e5)),Y={done:"var(--ok)",in_progress:"var(--accent)",blocked:"var(--danger)",in_review:"var(--warn)",todo:"var(--muted)"};return r`
                <div style="display:flex;align-items:center;border-bottom:1px solid var(--border);height:40px">
                  <div style="width:200px;flex-shrink:0;padding:0 12px;font-size:12px;font-weight:500;color:var(--text);truncate">
                    ${g.title}
                  </div>
                  <div style="flex:1;position:relative;height:100%">
                    <div
                      style="position:absolute;top:8px;height:24px;
                        left:${Ot*p}px;
                        width:${Yt*p}px;
                        background:${Y[g.status]??"var(--muted)"};
                        opacity:0.8;border-radius:4px;cursor:pointer;
                        display:flex;align-items:center;padding:0 8px;
                        font-size:10px;font-weight:600;color:#fff;
                        white-space:nowrap;overflow:hidden"
                      @click=${()=>this.openDrawer(g)}
                      title="${g.title}"
                    >
                      ${g.key}
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
                  ${Lt.map(t=>r`<option value=${t}>${It[t]}</option>`)}
                </select>
              </div>
              <div class="field">
                <label class="label">Priority</label>
                <select class="select" .value=${this.form.priority??"medium"}
                  @change=${t=>{this.form={...this.form,priority:t.target.value}}}>
                  ${Pe.map(t=>r`<option value=${t}>${t}</option>`)}
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
            ${[["Project",this.projectName(t.projectId)],["Assigned",this.clawName(t.assignedClawId)],["Due date",this.formatDate(t.dueDate)||"None"],["Created",this.formatDate(t.createdAt)]].map(([e,a])=>r`
              <div style="display:flex;justify-content:space-between;font-size:13px">
                <span style="color:var(--muted)">${e}</span>
                <span style="color:var(--text)">${a}</span>
              </div>`)}
          </div>
        </div>

        <!-- Change status -->
        <div class="card">
          <div class="card-title" style="margin-bottom:10px">Move to</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${Lt.filter(e=>e!==t.status).map(e=>r`
              <button class="btn btn-secondary btn-sm"
                @click=${()=>this.patchStatus(t.id,e)}>${It[e]}</button>
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
        ${this.drawerExecutions.map(a=>r`
          <div class="card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span class="badge ${e[a.status]??"badge-gray"}">${a.status}</span>
              <span style="font-size:11px;color:var(--muted)">${this.formatDate(a.createdAt)}</span>
            </div>
            ${a.result?r`
              <div class="log-wrap" style="max-height:120px;overflow-y:auto;font-size:11px">${a.result}</div>
            `:""}
          </div>
        `)}
      </div>
    `}}u=j(Ms),o(u,5,"tenantId",Ds,M),o(u,5,"items",Is,M),o(u,5,"projects",_s,M),o(u,5,"claws",Ts,M),o(u,5,"loading",Es,M),o(u,5,"error",As,M),o(u,5,"view",Ss,M),o(u,5,"filterStatus",ks,M),o(u,5,"filterProject",xs,M),o(u,5,"filterPriority",ws,M),o(u,5,"search",$s,M),o(u,5,"showArchived",fs,M),o(u,5,"showModal",bs,M),o(u,5,"editTarget",ys,M),o(u,5,"form",ms,M),o(u,5,"saving",gs,M),o(u,5,"drawerTask",vs,M),o(u,5,"drawerExecutions",us,M),o(u,5,"drawerTab",ps,M),o(u,5,"running",hs,M),o(u,5,"dragTaskId",cs,M),M=o(u,0,"CclTasks",Ps,M),i(u,1,M);const Re=[800,1500,3e3,5e3,1e4,15e3];class Pn{constructor(s){this.opts=s,this.connect()}ws=null;attempt=0;destroyed=!1;pingInterval=null;connect(){this.destroyed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>{this.attempt=0,this.schedulePings(),this.opts.onEvent({type:"connected"})}),this.ws.addEventListener("message",s=>{let t;try{t=JSON.parse(s.data)}catch{t=s.data}if(t&&typeof t=="object"&&t.type==="claw_offline"){this.opts.onEvent({type:"claw_offline"});return}this.opts.onEvent({type:"message",data:t})}),this.ws.addEventListener("close",s=>{this.clearPings(),!this.destroyed&&(this.opts.onEvent({type:"disconnected",code:s.code,reason:s.reason}),this.scheduleReconnect())}),this.ws.addEventListener("error",()=>{}))}send(s){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(s))}destroy(){this.destroyed=!0,this.clearPings(),this.ws?.close(1e3,"destroyed"),this.ws=null}get readyState(){return this.ws?.readyState??WebSocket.CLOSED}schedulePings(){this.clearPings(),this.pingInterval=setInterval(()=>{this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"ping"}))},3e4)}clearPings(){this.pingInterval!==null&&(clearInterval(this.pingInterval),this.pingInterval=null)}scheduleReconnect(){const s=Re[Math.min(this.attempt,Re.length-1)];this.attempt++,setTimeout(()=>this.connect(),s)}}var Rs,zs,Ns,Os,Ls,Us,js,Bs,Hs,Ks,E;Ks=[H("ccl-claw-chat")];class C extends(Hs=N,Bs=[k()],js=[k()],Us=[c()],Ls=[c()],Os=[c()],Ns=[c()],zs=[c()],Rs=[c()],Hs){constructor(){super(...arguments);l(this,"clawId",i(E,8,this,"")),i(E,11,this);l(this,"wsUrl",i(E,12,this,"")),i(E,15,this);l(this,"messages",i(E,16,this,[])),i(E,19,this);l(this,"tools",i(E,20,this,[])),i(E,23,this);l(this,"input",i(E,24,this,"")),i(E,27,this);l(this,"connState",i(E,28,this,"connecting")),i(E,31,this);l(this,"session",i(E,32,this,"default")),i(E,35,this);l(this,"streaming",i(E,36,this,!1)),i(E,39,this);l(this,"gw",null);l(this,"msgEnd",null)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.scrollToBottom()}connect(){this.connState="connecting",this.gw=new Pn({url:this.wsUrl,onEvent:t=>this.handleGwEvent(t)})}handleGwEvent(t){if(t.type==="connected"){this.connState="connected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type!=="message")return;const e=t.data;switch(e.type){case"chat.message":{if(e.role==="user")this.messages=[...this.messages,{id:crypto.randomUUID(),role:"user",text:e.text??""}];else{const a=this.messages.at(-1);a?.role==="assistant"&&a.streaming?this.messages=[...this.messages.slice(0,-1),{...a,text:e.text??"",streaming:!1}]:this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.text??""}],this.streaming=!1}break}case"chat.delta":{const a=this.messages.at(-1);a?.role==="assistant"&&a.streaming?this.messages=[...this.messages.slice(0,-1),{...a,text:a.text+(e.delta??"")}]:(this.messages=[...this.messages,{id:crypto.randomUUID(),role:"assistant",text:e.delta??"",streaming:!0}],this.streaming=!0);break}case"tool.start":{this.tools=[...this.tools,{id:e.toolCallId??crypto.randomUUID(),name:e.toolName??"tool",input:e.toolInput,expanded:!1}];break}case"tool.result":{this.tools=this.tools.map(a=>a.id===e.toolCallId?{...a,result:e.toolResult}:a);break}case"chat.abort":this.streaming=!1;break}}send(){const t=this.input.trim();!t||this.connState!=="connected"||(this.gw?.send({type:"chat",message:t,session:this.session}),this.input="")}abort(){this.gw?.send({type:"chat.abort"}),this.streaming=!1}newChat(){this.messages=[],this.tools=[],this.streaming=!1,this.gw?.send({type:"session.new"})}scrollToBottom(){this.msgEnd?.scrollIntoView({behavior:"smooth"})}onKeydown(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}connDot(){return r`<span class="dot ${{connected:"dot-green",connecting:"dot-yellow",offline:"dot-red",disconnected:"dot-gray"}[this.connState]}"></span> ${this.connState}`}render(){return r`
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
    `}}E=j(Hs),o(E,5,"clawId",Bs,C),o(E,5,"wsUrl",js,C),o(E,5,"messages",Us,C),o(E,5,"tools",Ls,C),o(E,5,"input",Os,C),o(E,5,"connState",Ns,C),o(E,5,"session",zs,C),o(E,5,"streaming",Rs,C),C=o(E,0,"CclClawChat",Ks,C),i(E,1,C);const hr=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Ut(n,s={}){const t=await fetch(`${hr}${n}`,{...s,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ot()??""}`,...s.headers??{}}});if(!t.ok)throw new Error(await t.text());if(t.status!==204)return t.json()}const pr=["claude","openai","ollama","http"];var Js,Fs,qs,Ws,Ys,Vs,Gs,Zs,Xs,Qs,T;Qs=[H("ccl-claw-agents")];class tt extends(Xs=N,Zs=[k()],Gs=[k()],Vs=[c()],Ys=[c()],Ws=[c()],qs=[c()],Fs=[c()],Js=[c()],Xs){constructor(){super(...arguments);l(this,"clawId",i(T,8,this,"")),i(T,11,this);l(this,"wsUrl",i(T,12,this,"")),i(T,15,this);l(this,"agents",i(T,16,this,[])),i(T,19,this);l(this,"loading",i(T,20,this,!0)),i(T,23,this);l(this,"error",i(T,24,this,"")),i(T,27,this);l(this,"showModal",i(T,28,this,!1)),i(T,31,this);l(this,"form",i(T,32,this,{name:"",type:"claude",endpoint:"",apiKey:""})),i(T,35,this);l(this,"saving",i(T,36,this,!1)),i(T,39,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{this.agents=await Ut("/api/agents")}catch(t){this.error=t.message}finally{this.loading=!1}}async toggleActive(t){try{await Ut(`/api/agents/${t.id}`,{method:"PATCH",body:JSON.stringify({isActive:!t.isActive})}),this.agents=this.agents.map(e=>e.id===t.id?{...e,isActive:!e.isActive}:e)}catch(e){this.error=e.message}}async remove(t){if(confirm(`Delete agent "${t.name}"?`))try{await Ut(`/api/agents/${t.id}`,{method:"DELETE"}),this.agents=this.agents.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Ut("/api/agents",{method:"POST",body:JSON.stringify(this.form)});this.agents=[e,...this.agents],this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}render(){return r`
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
                    ${pr.map(t=>r`<option value=${t}>${t}</option>`)}
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
    `}}T=j(Xs),o(T,5,"clawId",Zs,tt),o(T,5,"wsUrl",Gs,tt),o(T,5,"agents",Vs,tt),o(T,5,"loading",Ys,tt),o(T,5,"error",Ws,tt),o(T,5,"showModal",qs,tt),o(T,5,"form",Fs,tt),o(T,5,"saving",Js,tt),tt=o(T,0,"CclClawAgents",Qs,tt),i(T,1,tt);const ur=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function ze(n,s={}){const t=await fetch(`${ur}${n}`,{...s,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ot()??""}`,...s.headers??{}}});if(t.status===404)return{};if(!t.ok)throw new Error(await t.text());if(t.status!==204)return t.json()}var Cs,ti,ei,si,ii,ai,ni,ri,oi,li,di,ci,f;ci=[H("ccl-claw-config")];class G extends(di=N,li=[k()],oi=[k()],ri=[c()],ni=[c()],ai=[c()],ii=[c()],si=[c()],ei=[c()],ti=[c()],Cs=[c()],di){constructor(){super(...arguments);l(this,"clawId",i(f,8,this,"")),i(f,11,this);l(this,"wsUrl",i(f,12,this,"")),i(f,15,this);l(this,"config",i(f,16,this,{})),i(f,19,this);l(this,"loading",i(f,20,this,!0)),i(f,23,this);l(this,"error",i(f,24,this,"")),i(f,27,this);l(this,"editing",i(f,28,this,!1)),i(f,31,this);l(this,"draft",i(f,32,this,{})),i(f,35,this);l(this,"saving",i(f,36,this,!1)),i(f,39,this);l(this,"newKey",i(f,40,this,"")),i(f,43,this);l(this,"newVal",i(f,44,this,"")),i(f,47,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await ze(`/api/claws/${this.clawId}/config`);this.config=t??{}}catch(t){this.error=t.message}finally{this.loading=!1}}startEdit(){this.draft={...this.config},this.editing=!0}cancel(){this.editing=!1,this.draft={}}async save(){this.saving=!0;try{await ze(`/api/claws/${this.clawId}/config`,{method:"PATCH",body:JSON.stringify(this.draft)}),this.config={...this.draft},this.editing=!1}catch(t){this.error=t.message}finally{this.saving=!1}}addField(){this.newKey.trim()&&(this.draft={...this.draft,[this.newKey.trim()]:this.newVal},this.newKey="",this.newVal="")}removeField(t){const e={...this.draft};delete e[t],this.draft=e}render(){const t=Object.entries(this.editing?this.draft:this.config);return r`
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
                  ${t.map(([e,a])=>r`
                    <tr>
                      <td><code style="font-family:var(--mono);font-size:12px">${e}</code></td>
                      <td>${this.editing?r`<input class="input" style="height:28px;padding:3px 8px" .value=${a}
                            @input=${d=>{this.draft={...this.draft,[e]:d.target.value}}}>`:r`<span style="font-family:var(--mono);font-size:12px">${a}</span>`}
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
    `}}f=j(di),o(f,5,"clawId",li,G),o(f,5,"wsUrl",oi,G),o(f,5,"config",ri,G),o(f,5,"loading",ni,G),o(f,5,"error",ai,G),o(f,5,"editing",ii,G),o(f,5,"draft",si,G),o(f,5,"saving",ei,G),o(f,5,"newKey",ti,G),o(f,5,"newVal",Cs,G),G=o(f,0,"CclClawConfig",ci,G),i(f,1,G);const vr=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Ne(n,s={}){const t=await fetch(`${vr}${n}`,{...s,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ot()??""}`,...s.headers??{}}});if(t.status===404||t.status===204)return null;if(!t.ok)throw new Error(await t.text());return t.json()}var hi,pi,ui,vi,gi,mi,yi,F;yi=[H("ccl-claw-sessions")];class ut extends(mi=N,gi=[k()],vi=[k()],ui=[c()],pi=[c()],hi=[c()],mi){constructor(){super(...arguments);l(this,"clawId",i(F,8,this,"")),i(F,11,this);l(this,"wsUrl",i(F,12,this,"")),i(F,15,this);l(this,"sessions",i(F,16,this,[])),i(F,19,this);l(this,"loading",i(F,20,this,!0)),i(F,23,this);l(this,"error",i(F,24,this,"")),i(F,27,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Ne(`/api/claws/${this.clawId}/sessions`);this.sessions=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async remove(t){if(confirm("Delete this session?"))try{await Ne(`/api/claws/${this.clawId}/sessions/${t.id}`,{method:"DELETE"}),this.sessions=this.sessions.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){return r`
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
    `}}F=j(mi),o(F,5,"clawId",gi,ut),o(F,5,"wsUrl",vi,ut),o(F,5,"sessions",ui,ut),o(F,5,"loading",pi,ut),o(F,5,"error",hi,ut),ut=o(F,0,"CclClawSessions",yi,ut),i(F,1,ut);const gr="modulepreload",mr=function(n,s){return new URL(n,s).href},Oe={},Le=function(s,t,e){let a=Promise.resolve();if(t&&t.length>0){let x=function(b){return Promise.all(b.map(v=>Promise.resolve(v).then(z=>({status:"fulfilled",value:z}),z=>({status:"rejected",reason:z}))))};const h=document.getElementsByTagName("link"),p=document.querySelector("meta[property=csp-nonce]"),m=p?.nonce||p?.getAttribute("nonce");a=x(t.map(b=>{if(b=mr(b,e),b in Oe)return;Oe[b]=!0;const v=b.endsWith(".css"),z=v?'[rel="stylesheet"]':"";if(e)for(let B=h.length-1;B>=0;B--){const lt=h[B];if(lt.href===b&&(!v||lt.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${b}"]${z}`))return;const g=document.createElement("link");if(g.rel=v?"stylesheet":gr,v||(g.as="script"),g.crossOrigin="",g.href=b,m&&g.setAttribute("nonce",m),document.head.appendChild(g),v)return new Promise((B,lt)=>{g.addEventListener("load",B),g.addEventListener("error",()=>lt(new Error(`Unable to preload CSS for ${b}`)))})}))}function d(h){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=h,window.dispatchEvent(p),!p.defaultPrevented)throw h}return a.then(h=>{for(const p of h||[])p.status==="rejected"&&d(p.reason);return s().catch(d)})};var bi,fi,$i,wi,xi,ki,Si,Ai,Ei,Ti,_;Ti=[H("ccl-claw-skills")];class et extends(Ei=N,Ai=[k()],Si=[k()],ki=[c()],xi=[c()],wi=[c()],$i=[c()],fi=[c()],bi=[c()],Ei){constructor(){super(...arguments);l(this,"clawId",i(_,8,this,"")),i(_,11,this);l(this,"wsUrl",i(_,12,this,"")),i(_,15,this);l(this,"assigned",i(_,16,this,[])),i(_,19,this);l(this,"available",i(_,20,this,[])),i(_,23,this);l(this,"loading",i(_,24,this,!0)),i(_,27,this);l(this,"error",i(_,28,this,"")),i(_,31,this);l(this,"showModal",i(_,32,this,!1)),i(_,35,this);l(this,"saving",i(_,36,this,!1)),i(_,39,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([this.loadAssigned(),pe.list().catch(()=>[])]);this.assigned=t,this.available=e}catch(t){this.error=t.message}finally{this.loading=!1}}async loadAssigned(){try{const{getTenantToken:t}=await Le(async()=>{const{getTenantToken:d}=await Promise.resolve().then(()=>Me);return{getTenantToken:d}},void 0,import.meta.url),e=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai",a=await fetch(`${e}/api/skill-assignments/claws/${this.clawId}`,{headers:{Authorization:`Bearer ${t()??""}`}});return a.ok?a.json():[]}catch{return[]}}async assign(t){this.saving=!0;try{await kt.assignClaw(this.clawId,t),this.assigned=await this.loadAssigned(),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}async unassign(t){try{const{getTenantToken:e}=await Le(async()=>{const{getTenantToken:d}=await Promise.resolve().then(()=>Me);return{getTenantToken:d}},void 0,import.meta.url),a=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";await fetch(`${a}/api/skill-assignments/claws/${this.clawId}/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${e()??""}`}}),this.assigned=this.assigned.filter(d=>d.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}render(){const t=this.assignedSlugs(),e=this.available.filter(a=>!t.has(a.slug));return r`
      <div style="padding:16px;display:grid;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Skills</div>
          <button class="btn btn-primary btn-sm" @click=${()=>{this.showModal=!0}}>Assign skill</button>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}
        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:this.assigned.length===0?r`<div class="empty-state"><div class="empty-state-title">No skills assigned</div><div class="empty-state-sub">Assign skills to give this claw extra capabilities</div></div>`:this.assigned.map(a=>r`
              <div class="card">
                <div class="card-header">
                  <div>
                    <div class="card-title">${a.name}</div>
                    <div style="font-size:11px;font-family:var(--mono);color:var(--muted)">${a.slug}</div>
                  </div>
                  <button class="btn btn-danger btn-sm" @click=${()=>this.unassign(a.slug)}>Unassign</button>
                </div>
              </div>
            `)}

        ${this.showModal?r`
          <div class="modal-backdrop" @click=${a=>{a.target===a.currentTarget&&(this.showModal=!1)}}>
            <div class="modal" style="max-width:500px">
              <div class="modal-title">Assign skill</div>
              <div class="modal-sub">Add a skill from the marketplace to this claw</div>
              ${e.length===0?r`<div style="color:var(--muted);font-size:13px;padding:16px 0">All available skills are already assigned</div>`:r`<div style="display:grid;gap:8px;max-height:360px;overflow-y:auto">
                    ${e.map(a=>r`
                      <div class="card" style="display:flex;align-items:center;gap:12px;cursor:pointer" @click=${()=>this.assign(a.slug)}>
                        ${a.icon?r`<img src="${a.icon}" style="width:32px;height:32px;border-radius:6px">`:r`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
                        <div>
                          <div style="font-size:13px;font-weight:600;color:var(--text-strong)">${a.name}</div>
                          <div style="font-size:11px;color:var(--muted)">${a.description??a.slug}</div>
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
    `}}_=j(Ei),o(_,5,"clawId",Ai,et),o(_,5,"wsUrl",Si,et),o(_,5,"assigned",ki,et),o(_,5,"available",xi,et),o(_,5,"loading",wi,et),o(_,5,"error",$i,et),o(_,5,"showModal",fi,et),o(_,5,"saving",bi,et),et=o(_,0,"CclClawSkills",Ti,et),i(_,1,et);var _i,Ii,Di,Mi,Pi,Ri,zi,Ni,L;Ni=[H("ccl-claw-usage")];class ct extends(zi=N,Ri=[k()],Pi=[k()],Mi=[c()],Di=[c()],Ii=[c()],_i=[c()],zi){constructor(){super(...arguments);l(this,"clawId",i(L,8,this,"")),i(L,11,this);l(this,"wsUrl",i(L,12,this,"")),i(L,15,this);l(this,"items",i(L,16,this,[])),i(L,19,this);l(this,"loading",i(L,20,this,!0)),i(L,23,this);l(this,"error",i(L,24,this,"")),i(L,27,this);l(this,"timeFilter",i(L,28,this,"week")),i(L,31,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{this.items=await ue.list({clawId:this.clawId})}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){const t=Date.now(),a={today:864e5,week:6048e5,month:2592e6,all:1/0}[this.timeFilter];return this.items.filter(d=>t-new Date(d.createdAt).getTime()<a)}stats(t){const e=t.length,a=t.filter(p=>p.status==="completed").length,d=t.filter(p=>p.status==="failed").length,h=t.filter(p=>p.status==="running").length;return{total:e,completed:a,failed:d,running:h}}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered(),e=this.stats(t),a={completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"};return r`
      <div style="padding:16px;display:grid;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:14px;font-weight:600;color:var(--text-strong)">Usage</div>
          <div style="display:flex;gap:4px">
            ${["today","week","month","all"].map(d=>r`
              <button class="btn btn-sm ${this.timeFilter===d?"btn-primary":"btn-ghost"}" @click=${()=>{this.timeFilter=d}}>
                ${d}
              </button>
            `)}
          </div>
        </div>

        ${this.error?r`<div class="error-banner">${this.error}</div>`:""}

        <div class="stat-grid">
          ${[["Total",e.total],["Completed",e.completed],["Failed",e.failed],["Running",e.running]].map(([d,h])=>r`
            <div class="stat-card">
              <div class="stat-value">${h}</div>
              <div class="stat-label">${d}</div>
            </div>
          `)}
        </div>

        ${this.loading?r`<div style="color:var(--muted);font-size:13px">Loading…</div>`:t.length===0?r`<div class="empty-state"><div class="empty-state-title">No executions</div></div>`:r`
              <div class="table-wrap">
                <table class="table">
                  <thead><tr><th>Task</th><th>Status</th><th>Duration</th><th>Started</th></tr></thead>
                  <tbody>
                    ${t.slice().reverse().map(d=>r`
                      <tr>
                        <td style="font-size:12px;font-family:var(--mono)">${d.taskId}</td>
                        <td><span class="badge ${a[d.status]??"badge-gray"}">${d.status}</span></td>
                        <td style="font-size:12px;color:var(--muted)">${this.duration(d)}</td>
                        <td style="font-size:12px;color:var(--muted)">${this.fmt(d.createdAt)}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>`}
      </div>
    `}}L=j(zi),o(L,5,"clawId",Ri,ct),o(L,5,"wsUrl",Pi,ct),o(L,5,"items",Mi,ct),o(L,5,"loading",Di,ct),o(L,5,"error",Ii,ct),o(L,5,"timeFilter",_i,ct),ct=o(L,0,"CclClawUsage",Ni,ct),i(L,1,ct);const yr=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function jt(n,s={}){const t=await fetch(`${yr}${n}`,{...s,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ot()??""}`,...s.headers??{}}});if(t.status===404||t.status===204)return null;if(!t.ok)throw new Error(await t.text());return t.json()}var Oi,Li,Ui,ji,Bi,Hi,Ki,Ji,Fi,qi,I;qi=[H("ccl-claw-cron")];class st extends(Fi=N,Ji=[k()],Ki=[k()],Hi=[c()],Bi=[c()],ji=[c()],Ui=[c()],Li=[c()],Oi=[c()],Fi){constructor(){super(...arguments);l(this,"clawId",i(I,8,this,"")),i(I,11,this);l(this,"wsUrl",i(I,12,this,"")),i(I,15,this);l(this,"jobs",i(I,16,this,[])),i(I,19,this);l(this,"loading",i(I,20,this,!0)),i(I,23,this);l(this,"error",i(I,24,this,"")),i(I,27,this);l(this,"showModal",i(I,28,this,!1)),i(I,31,this);l(this,"form",i(I,32,this,{name:"",schedule:"0 9 * * 1-5",taskId:""})),i(I,35,this);l(this,"saving",i(I,36,this,!1)),i(I,39,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await jt(`/api/claws/${this.clawId}/cron`);this.jobs=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await jt(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.jobs=this.jobs.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async remove(t){if(confirm(`Delete cron job "${t.name}"?`))try{await jt(`/api/claws/${this.clawId}/cron/${t.id}`,{method:"DELETE"}),this.jobs=this.jobs.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await jt(`/api/claws/${this.clawId}/cron`,{method:"POST",body:JSON.stringify(this.form)});e&&(this.jobs=[e,...this.jobs]),this.showModal=!1}catch(e){this.error=e.message}finally{this.saving=!1}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return r`
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
    `}}I=j(Fi),o(I,5,"clawId",Ji,st),o(I,5,"wsUrl",Ki,st),o(I,5,"jobs",Hi,st),o(I,5,"loading",Bi,st),o(I,5,"error",ji,st),o(I,5,"showModal",Ui,st),o(I,5,"form",Li,st),o(I,5,"saving",Oi,st),st=o(I,0,"CclClawCron",qi,st),i(I,1,st);const br=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Ue(n,s={}){const t=await fetch(`${br}${n}`,{...s,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ot()??""}`,...s.headers??{}}});if(t.status===404||t.status===204)return null;if(!t.ok)throw new Error(await t.text());return t.json()}var Wi,Yi,Vi,Gi,Zi,Xi,Qi,q;Qi=[H("ccl-claw-nodes")];class vt extends(Xi=N,Zi=[k()],Gi=[k()],Vi=[c()],Yi=[c()],Wi=[c()],Xi){constructor(){super(...arguments);l(this,"clawId",i(q,8,this,"")),i(q,11,this);l(this,"wsUrl",i(q,12,this,"")),i(q,15,this);l(this,"nodes",i(q,16,this,[])),i(q,19,this);l(this,"loading",i(q,20,this,!0)),i(q,23,this);l(this,"error",i(q,24,this,"")),i(q,27,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Ue(`/api/claws/${this.clawId}/nodes`);this.nodes=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async unpair(t){if(confirm(`Unpair node "${t.name??t.id}"?`))try{await Ue(`/api/claws/${this.clawId}/nodes/${t.id}`,{method:"DELETE"}),this.nodes=this.nodes.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}fmt(t){return t?new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}render(){return r`
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
    `}}q=j(Xi),o(q,5,"clawId",Zi,vt),o(q,5,"wsUrl",Gi,vt),o(q,5,"nodes",Vi,vt),o(q,5,"loading",Yi,vt),o(q,5,"error",Wi,vt),vt=o(q,0,"CclClawNodes",Qi,vt),i(q,1,vt);const fr=(typeof window<"u"&&window.API_URL)??"https://api.coderclaw.ai";async function Bt(n,s={}){const t=await fetch(`${fr}${n}`,{...s,headers:{"Content-Type":"application/json",Authorization:`Bearer ${ot()??""}`,...s.headers??{}}});if(t.status===404||t.status===204)return null;if(!t.ok)throw new Error(await t.text());return t.json()}const $r=["discord","slack","telegram","whatsapp","signal","googlechat","nostr"],wr={discord:[{key:"token",label:"Bot Token",type:"password"},{key:"guildId",label:"Guild ID"}],slack:[{key:"botToken",label:"Bot Token",type:"password"},{key:"appToken",label:"App Token",type:"password"}],telegram:[{key:"token",label:"Bot Token",type:"password"}],whatsapp:[{key:"phoneNumberId",label:"Phone Number ID"},{key:"accessToken",label:"Access Token",type:"password"}],signal:[{key:"phone",label:"Phone Number"}],googlechat:[{key:"serviceAccountKey",label:"Service Account Key (JSON)",type:"password"}],nostr:[{key:"privateKey",label:"Private Key (nsec)",type:"password"},{key:"relays",label:"Relay URLs (comma-separated)"}]};var Ci,ta,ea,sa,ia,aa,na,ra,oa,la,da,$;da=[H("ccl-claw-channels")];class Z extends(la=N,oa=[k()],ra=[k()],na=[c()],aa=[c()],ia=[c()],sa=[c()],ea=[c()],ta=[c()],Ci=[c()],la){constructor(){super(...arguments);l(this,"clawId",i($,8,this,"")),i($,11,this);l(this,"wsUrl",i($,12,this,"")),i($,15,this);l(this,"channels",i($,16,this,[])),i($,19,this);l(this,"loading",i($,20,this,!0)),i($,23,this);l(this,"error",i($,24,this,"")),i($,27,this);l(this,"showModal",i($,28,this,!1)),i($,31,this);l(this,"selectedType",i($,32,this,"discord")),i($,35,this);l(this,"form",i($,36,this,{})),i($,39,this);l(this,"saving",i($,40,this,!1)),i($,43,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("clawId")&&this.clawId&&this.load()}async load(){this.loading=!0;try{const t=await Bt(`/api/claws/${this.clawId}/channels`);this.channels=t??[]}catch(t){this.error=t.message}finally{this.loading=!1}}async toggle(t){try{await Bt(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"PATCH",body:JSON.stringify({enabled:!t.enabled})}),this.channels=this.channels.map(e=>e.id===t.id?{...e,enabled:!e.enabled}:e)}catch(e){this.error=e.message}}async remove(t){if(confirm(`Delete ${t.type} channel?`))try{await Bt(`/api/claws/${this.clawId}/channels/${t.id}`,{method:"DELETE"}),this.channels=this.channels.filter(e=>e.id!==t.id)}catch(e){this.error=e.message}}async save(t){t.preventDefault(),this.saving=!0;try{const e=await Bt(`/api/claws/${this.clawId}/channels`,{method:"POST",body:JSON.stringify({type:this.selectedType,config:this.form})});e&&(this.channels=[e,...this.channels]),this.showModal=!1,this.form={}}catch(e){this.error=e.message}finally{this.saving=!1}}statusDot(t){return r`<span class="dot ${{connected:"dot-green",error:"dot-red",stopped:"dot-gray",pending:"dot-yellow"}[t]??"dot-gray"}"></span>`}render(){const t=wr[this.selectedType]??[];return r`
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
                    ${$r.map(e=>r`<option value=${e}>${e}</option>`)}
                  </select>
                </div>
                ${t.map(e=>r`
                  <div class="field">
                    <label class="label">${e.label}</label>
                    <input class="input" type=${e.type??"text"} .value=${this.form[e.key]??""}
                      @input=${a=>{this.form={...this.form,[e.key]:a.target.value}}}>
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
    `}}$=j(la),o($,5,"clawId",oa,Z),o($,5,"wsUrl",ra,Z),o($,5,"channels",na,Z),o($,5,"loading",aa,Z),o($,5,"error",ia,Z),o($,5,"showModal",sa,Z),o($,5,"selectedType",ea,Z),o($,5,"form",ta,Z),o($,5,"saving",Ci,Z),Z=o($,0,"CclClawChannels",da,Z),i($,1,Z);var ca,ha,pa,ua,va,ga,ma,ya,U;ya=[H("ccl-claw-logs")];class ht extends(ma=N,ga=[k()],va=[k()],ua=[c()],pa=[c()],ha=[c()],ca=[c()],ma){constructor(){super(...arguments);l(this,"clawId",i(U,8,this,"")),i(U,11,this);l(this,"wsUrl",i(U,12,this,"")),i(U,15,this);l(this,"lines",i(U,16,this,[])),i(U,19,this);l(this,"level",i(U,20,this,"all")),i(U,23,this);l(this,"connState",i(U,24,this,"connecting")),i(U,27,this);l(this,"autoScroll",i(U,28,this,!0)),i(U,31,this);l(this,"gw",null);l(this,"logEnd",null)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.wsUrl&&this.connect()}disconnectedCallback(){super.disconnectedCallback(),this.gw?.destroy()}updated(t){t.has("wsUrl")&&this.wsUrl&&(this.gw?.destroy(),this.connect()),this.autoScroll&&this.logEnd?.scrollIntoView()}connect(){this.connState="connecting",this.gw=new Pn({url:this.wsUrl,onEvent:t=>{if(t.type==="connected"){this.connState="connected",this.gw?.send({type:"logs.subscribe"});return}if(t.type==="disconnected"){this.connState="disconnected";return}if(t.type==="claw_offline"){this.connState="offline";return}if(t.type!=="message")return;const e=t.data;e.type==="log"&&(this.lines=[...this.lines.slice(-2e3),{ts:e.ts??new Date().toISOString(),level:e.level??"info",msg:e.message??""}])}})}filtered(){return this.level==="all"?this.lines:this.lines.filter(t=>t.level===this.level)}levelClass(t){return{error:"log-line-error",warn:"log-line-warn",info:"log-line-info"}[t]??""}clear(){this.lines=[]}render(){const t=this.filtered();return r`
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
    `}}U=j(ma),o(U,5,"clawId",ga,ht),o(U,5,"wsUrl",va,ht),o(U,5,"lines",ua,ht),o(U,5,"level",pa,ht),o(U,5,"connState",ha,ht),o(U,5,"autoScroll",ca,ht),ht=o(U,0,"CclClawLogs",ya,ht),i(U,1,ht);const xr=[{id:"chat",label:"Chat"},{id:"agents",label:"Agents"},{id:"config",label:"Config"},{id:"sessions",label:"Sessions"},{id:"skills",label:"Skills"},{id:"usage",label:"Usage"},{id:"cron",label:"Cron"},{id:"nodes",label:"Nodes"},{id:"channels",label:"Channels"},{id:"logs",label:"Logs"}];var ba,fa,$a,wa,xa,ka,Sa,Aa,Ea,Ta,_a,Ia,Da,Ma,Pa,Ra,za,y;za=[H("ccl-claws")];class K extends(Ra=N,Pa=[k()],Ma=[c()],Da=[c()],Ia=[c()],_a=[c()],Ta=[c()],Ea=[c()],Aa=[c()],Sa=[c()],ka=[c()],xa=[c()],wa=[c()],$a=[c()],fa=[c()],ba=[c()],Ra){constructor(){super(...arguments);l(this,"tenantId",i(y,8,this,"")),i(y,11,this);l(this,"clawList",i(y,12,this,[])),i(y,15,this);l(this,"loading",i(y,16,this,!1)),i(y,19,this);l(this,"error",i(y,20,this,"")),i(y,23,this);l(this,"showRegisterModal",i(y,24,this,!1)),i(y,27,this);l(this,"registerName",i(y,28,this,"")),i(y,31,this);l(this,"registering",i(y,32,this,!1)),i(y,35,this);l(this,"registerError",i(y,36,this,"")),i(y,39,this);l(this,"newClaw",i(y,40,this,null)),i(y,43,this);l(this,"apiKeyCopied",i(y,44,this,!1)),i(y,47,this);l(this,"panelOpen",i(y,48,this,!1)),i(y,51,this);l(this,"activeClaw",i(y,52,this,null)),i(y,55,this);l(this,"activeTab",i(y,56,this,"chat")),i(y,59,this);l(this,"deleteConfirmId",i(y,60,this,null)),i(y,63,this);l(this,"deleting",i(y,64,this,!1)),i(y,67,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadClaws()}async loadClaws(){this.loading=!0,this.error="";try{this.clawList=await xt.list()}catch(t){this.error=t.message??"Failed to load claws"}finally{this.loading=!1}}openPanel(t){this.activeClaw=t,this.activeTab="chat",this.panelOpen=!0,document.body.style.overflow="hidden"}closePanel(){this.panelOpen=!1,document.body.style.overflow="",setTimeout(()=>{this.activeClaw=null},300)}async handleRegister(){if(this.registerName.trim()){this.registering=!0,this.registerError="";try{const t=await xt.register(this.registerName.trim());this.newClaw=t,this.clawList=[...this.clawList,t],this.registerName=""}catch(t){this.registerError=t.message??"Registration failed"}finally{this.registering=!1}}}closeRegisterModal(){this.showRegisterModal=!1,this.newClaw=null,this.registerName="",this.registerError="",this.apiKeyCopied=!1}async copyApiKey(){if(this.newClaw)try{await navigator.clipboard.writeText(this.newClaw.apiKey),this.apiKeyCopied=!0,setTimeout(()=>{this.apiKeyCopied=!1},2e3)}catch{}}async handleDelete(t){this.deleting=!0;try{await xt.remove(t),this.clawList=this.clawList.filter(e=>e.id!==t),this.deleteConfirmId=null,this.activeClaw?.id===t&&this.closePanel()}catch(e){this.error=e.message??"Delete failed"}finally{this.deleting=!1}}statusBadge(t){return t.status==="active"?r`<span class="badge badge-green">active</span>`:t.status==="suspended"?r`<span class="badge badge-red">suspended</span>`:r`<span class="badge badge-gray">${t.status}</span>`}connectedDot(t){const e=t.status==="active"&&t.connectedAt?"dot dot-green":"dot dot-gray";return r`<span class="${e}" title="${t.connectedAt?"connected":"offline"}"></span>`}renderRegisterModal(){return this.showRegisterModal?r`
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
    `}renderPanel(){if(!this.activeClaw)return r``;const t=this.activeClaw,e=xt.wsUrl(t.id);return r`
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
          ${xr.map(a=>r`
            <button style="padding:0.625rem 1rem;font-size:0.875rem;border:none;background:none;
              cursor:pointer;white-space:nowrap;
              border-bottom:2px solid ${this.activeTab===a.id?"var(--accent,#6366f1)":"transparent"};
              color:${this.activeTab===a.id?"var(--accent,#6366f1)":"var(--muted,#71717a)"};
              font-weight:${this.activeTab===a.id?"600":"400"}"
              @click=${()=>{this.activeTab=a.id}}
            >${a.label}</button>
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
    `}}y=j(Ra),o(y,5,"tenantId",Pa,K),o(y,5,"clawList",Ma,K),o(y,5,"loading",Da,K),o(y,5,"error",Ia,K),o(y,5,"showRegisterModal",_a,K),o(y,5,"registerName",Ta,K),o(y,5,"registering",Ea,K),o(y,5,"registerError",Aa,K),o(y,5,"newClaw",Sa,K),o(y,5,"apiKeyCopied",ka,K),o(y,5,"panelOpen",xa,K),o(y,5,"activeClaw",wa,K),o(y,5,"activeTab",$a,K),o(y,5,"deleteConfirmId",fa,K),o(y,5,"deleting",ba,K),K=o(y,0,"ClawsView",za,K),i(y,1,K);var Na,Oa,La,Ua,ja,Ba,Ha,Ka,Ja,P;Ja=[H("ccl-skills")];class nt extends(Ka=N,Ha=[k()],Ba=[c()],ja=[c()],Ua=[c()],La=[c()],Oa=[c()],Na=[c()],Ka){constructor(){super(...arguments);l(this,"tenantId",i(P,8,this,"")),i(P,11,this);l(this,"available",i(P,12,this,[])),i(P,15,this);l(this,"assigned",i(P,16,this,[])),i(P,19,this);l(this,"loading",i(P,20,this,!0)),i(P,23,this);l(this,"error",i(P,24,this,"")),i(P,27,this);l(this,"search",i(P,28,this,"")),i(P,31,this);l(this,"tab",i(P,32,this,"assigned")),i(P,35,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{const[t,e]=await Promise.all([pe.list().catch(()=>[]),kt.listTenant().catch(()=>[])]);this.available=t,this.assigned=e}catch(t){this.error=t.message}finally{this.loading=!1}}async assign(t){try{await kt.assignTenant(t),this.assigned=await kt.listTenant()}catch(e){this.error=e.message}}async unassign(t){try{await kt.unassignTenant(t),this.assigned=this.assigned.filter(e=>e.slug!==t)}catch(e){this.error=e.message}}assignedSlugs(){return new Set(this.assigned.map(t=>t.slug))}filteredAvailable(){const t=this.search.toLowerCase();return this.available.filter(e=>!t||e.name.toLowerCase().includes(t)||(e.description??"").toLowerCase().includes(t))}render(){const t=this.assignedSlugs();return r`
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
          .value=${this.search} @input=${a=>{this.search=a.target.value}}>

        ${e.length===0?r`<div class="empty-state"><div class="empty-state-title">No skills found</div></div>`:r`
            <div class="grid grid-3">
              ${e.map(a=>r`
                <div class="card">
                  <div class="card-header">
                    <div style="display:flex;align-items:center;gap:10px">
                      ${a.icon?r`<img src="${a.icon}" style="width:32px;height:32px;border-radius:6px">`:r`<div style="width:32px;height:32px;background:var(--accent-subtle);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>`}
                      <div>
                        <div class="card-title">${a.name}</div>
                        ${a.category?r`<span class="badge badge-gray" style="font-size:10px">${a.category}</span>`:""}
                      </div>
                    </div>
                  </div>
                  ${a.description?r`<div style="font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:12px">${a.description}</div>`:""}
                  ${t.has(a.slug)?r`<button class="btn btn-danger btn-sm" @click=${()=>this.unassign(a.slug)}>Remove</button>`:r`<button class="btn btn-primary btn-sm" @click=${()=>this.assign(a.slug)}>Add to workspace</button>`}
                </div>
              `)}
            </div>`}
      </div>
    `}}P=j(Ka),o(P,5,"tenantId",Ha,nt),o(P,5,"available",Ba,nt),o(P,5,"assigned",ja,nt),o(P,5,"loading",Ua,nt),o(P,5,"error",La,nt),o(P,5,"search",Oa,nt),o(P,5,"tab",Na,nt),nt=o(P,0,"CclSkills",Ja,nt),i(P,1,nt);const kr=["owner","manager","developer","viewer"];var Fa,qa,Wa,Ya,Va,Ga,Za,Xa,Qa,Ca,tn,w;tn=[H("ccl-workspace")];class X extends(Ca=N,Qa=[k({type:Object})],Xa=[c()],Za=[c()],Ga=[c()],Va=[c()],Ya=[c()],Wa=[c()],qa=[c()],Fa=[c()],Ca){constructor(){super(...arguments);l(this,"tenant",i(w,8,this,null)),i(w,11,this);l(this,"detail",i(w,12,this,null)),i(w,15,this);l(this,"loading",i(w,16,this,!0)),i(w,19,this);l(this,"error",i(w,20,this,"")),i(w,23,this);l(this,"tab",i(w,24,this,"members")),i(w,27,this);l(this,"showInvite",i(w,28,this,!1)),i(w,31,this);l(this,"inviteEmail",i(w,32,this,"")),i(w,35,this);l(this,"inviteRole",i(w,36,this,"developer")),i(w,39,this);l(this,"inviting",i(w,40,this,!1)),i(w,43,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}updated(t){t.has("tenant")&&this.tenant&&this.load()}async load(){if(this.tenant){this.loading=!0;try{this.detail=await Mt.get(this.tenant.id)}catch(t){this.error=t.message}finally{this.loading=!1}}}async invite(t){if(t.preventDefault(),!(!this.tenant||!this.inviteEmail)){this.inviting=!0;try{await Mt.inviteMember(this.tenant.id,this.inviteEmail,this.inviteRole),await this.load(),this.showInvite=!1,this.inviteEmail=""}catch(e){this.error=e.message}finally{this.inviting=!1}}}async removeMember(t){if(!(!this.tenant||!confirm("Remove this member?")))try{await Mt.removeMember(this.tenant.id,t),await this.load()}catch(e){this.error=e.message}}roleBadge(t){return r`<span class="badge ${{owner:"badge-red",manager:"badge-yellow",developer:"badge-blue",viewer:"badge-gray"}[t]??"badge-gray"}">${t}</span>`}render(){return r`
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
                    ${kr.filter(e=>e!=="owner").map(e=>r`<option value=${e}>${e}</option>`)}
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
    `}}w=j(Ca),o(w,5,"tenant",Qa,X),o(w,5,"detail",Xa,X),o(w,5,"loading",Za,X),o(w,5,"error",Ga,X),o(w,5,"tab",Va,X),o(w,5,"showInvite",Ya,X),o(w,5,"inviteEmail",Wa,X),o(w,5,"inviteRole",qa,X),o(w,5,"inviting",Fa,X),X=o(w,0,"CclWorkspace",tn,X),i(w,1,X);var en,sn,an,nn,rn,on,ln,dn,cn,hn,D;hn=[H("ccl-logs")];class it extends(cn=N,dn=[k()],ln=[c()],on=[c()],rn=[c()],nn=[c()],an=[c()],sn=[c()],en=[c()],cn){constructor(){super(...arguments);l(this,"tenantId",i(D,8,this,"")),i(D,11,this);l(this,"items",i(D,12,this,[])),i(D,15,this);l(this,"tasks",i(D,16,this,[])),i(D,19,this);l(this,"loading",i(D,20,this,!0)),i(D,23,this);l(this,"error",i(D,24,this,"")),i(D,27,this);l(this,"filterTask",i(D,28,this,"")),i(D,31,this);l(this,"filterStatus",i(D,32,this,"")),i(D,35,this);l(this,"expanded",i(D,36,this,null)),i(D,39,this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.loading=!0;try{[this.items,this.tasks]=await Promise.all([ue.list(),rt.list().catch(()=>[])])}catch(t){this.error=t.message}finally{this.loading=!1}}filtered(){return this.items.filter(t=>!(this.filterTask&&t.taskId!==this.filterTask||this.filterStatus&&t.status!==this.filterStatus))}taskTitle(t){return this.tasks.find(e=>e.id===t)?.title??t}statusColor(t){return{completed:"badge-green",failed:"badge-red",running:"badge-blue",pending:"badge-gray",cancelled:"badge-gray"}[t]??"badge-gray"}duration(t){if(!t.startedAt||!t.completedAt)return"—";const e=new Date(t.completedAt).getTime()-new Date(t.startedAt).getTime();return e<1e3?`${e}ms`:`${(e/1e3).toFixed(1)}s`}fmt(t){return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}render(){const t=this.filtered();return r`
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
    `}}D=j(cn),o(D,5,"tenantId",dn,it),o(D,5,"items",ln,it),o(D,5,"tasks",on,it),o(D,5,"loading",rn,it),o(D,5,"error",nn,it),o(D,5,"filterTask",an,it),o(D,5,"filterStatus",sn,it),o(D,5,"expanded",en,it),it=o(D,0,"CclLogs",hn,it),i(D,1,it);var pn,un,vn,gn,mn,yn,bn,fn,$n,R;$n=[H("ccl-app")];class at extends(fn=N,bn=[c()],yn=[c()],mn=[c()],gn=[c()],vn=[c()],un=[c()],pn=[c()],fn){constructor(){super(...arguments);l(this,"appState",i(R,8,this,"loading")),i(R,11,this);l(this,"tab",i(R,12,this,"tasks")),i(R,15,this);l(this,"user",i(R,16,this,null)),i(R,19,this);l(this,"tenantList",i(R,20,this,[])),i(R,23,this);l(this,"tenant",i(R,24,this,null)),i(R,27,this);l(this,"theme",i(R,28,this,"dark")),i(R,31,this);l(this,"navCollapsed",i(R,32,this,!1)),i(R,35,this);l(this,"handleUnauthorized",()=>{Ft(),this.user=null,this.tenant=null,this.appState="auth"})}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.loadTheme(),this.bootstrap(),window.addEventListener("ccl:unauthorized",this.handleUnauthorized)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ccl:unauthorized",this.handleUnauthorized)}async bootstrap(){if(!he()){this.appState="auth";return}const e=ot(),a=Tn();if(this.user=Dn(),e&&a)try{const d=await mt.listTenants();this.tenantList=d;const h=d.find(p=>p.id===a);if(h){this.tenant=h,this.appState="dashboard";return}}catch{}try{this.tenantList=await mt.listTenants(),this.appState=(this.tenantList.length>0,"workspace-picker")}catch{this.appState="auth"}}async handleLogin(t){const{token:e,user:a}=t.detail;_n(e),In(a),this.user=a;try{this.tenantList=await mt.listTenants(),this.appState="workspace-picker"}catch{this.appState="workspace-picker"}}async handleSelectTenant(t){const e=t.detail;try{const{token:a}=await mt.tenantToken(e.id);Ct(a),te(e.id),this.tenant=e,this.appState="dashboard"}catch(a){console.error("Failed to get tenant token",a)}}async handleCreateTenant(t){try{const e=await Mt.create(t.detail.name),{token:a}=await mt.tenantToken(e.id);Ct(a),te(e.id),this.tenant=e,this.appState="dashboard"}catch(e){console.error("Failed to create tenant",e)}}handleSignOut(){Ft(),this.user=null,this.tenant=null,this.tenantList=[],this.appState="auth"}handleSwitchWorkspace(){this.appState="workspace-picker"}setTab(t){this.tab=t}loadTheme(){const t=localStorage.getItem("ccl-theme");this.theme=t??"dark",document.documentElement.dataset.theme=this.theme}toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",document.documentElement.dataset.theme=this.theme,localStorage.setItem("ccl-theme",this.theme),this.requestUpdate()}icon(t){return r`<svg viewBox="0 0 24 24">${r([`<svg viewBox="0 0 24 24">${{projects:'<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>',tasks:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',claws:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',skills:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',workspace:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',logs:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',menu:'<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',chevron:'<polyline points="15 18 9 12 15 6"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'}[t]??""}</svg>`])}</svg>`}svgIcon(t){return`<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">${{projects:'<rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>',tasks:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',claws:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',skills:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',workspace:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',logs:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'}[t]??""}</svg>`}render(){return this.appState==="loading"?this.renderLoading():this.appState==="auth"?this.renderAuth():this.appState==="workspace-picker"?this.renderWorkspacePicker():this.renderDashboard()}renderLoading(){return r`
      <div class="auth-shell">
        <div style="text-align:center;color:var(--muted);font-size:14px">Loading…</div>
      </div>`}renderAuth(){return r`
      <ccl-auth
        @login=${this.handleLogin}
        @register=${this.handleLogin}
      ></ccl-auth>`}renderWorkspacePicker(){return r`
      <ccl-workspace-picker
        .tenants=${this.tenantList}
        .user=${this.user}
        @select-tenant=${this.handleSelectTenant}
        @create-tenant=${this.handleCreateTenant}
        @sign-out=${this.handleSignOut}
      ></ccl-workspace-picker>`}renderDashboard(){const t=[{id:"tasks",label:"Tasks",icon:"tasks"},{id:"projects",label:"Projects",icon:"projects"},{id:"claws",label:"Claws",icon:"claws"},{id:"skills",label:"Skills",icon:"skills"},{id:"workspace",label:"Workspace",icon:"workspace"},{id:"logs",label:"Logs",icon:"logs"}];return r`
      <div class="shell">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <div class="brand">
              <img class="brand-logo" src="/logo.png" alt="CoderClawLink" onerror="this.style.display='none'">
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
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round">
                ${this.theme==="dark"?r`<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`:r`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`}
              </svg>
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
          ${this.renderTabContent()}
        </main>
      </div>
    `}renderTabContent(){const t=this.tenant?.id??"";switch(this.tab){case"tasks":return r`<ccl-tasks .tenantId=${t}></ccl-tasks>`;case"projects":return r`<ccl-projects .tenantId=${t}></ccl-projects>`;case"claws":return r`<ccl-claws .tenantId=${t}></ccl-claws>`;case"skills":return r`<ccl-skills .tenantId=${t}></ccl-skills>`;case"workspace":return r`<ccl-workspace .tenant=${this.tenant}></ccl-workspace>`;case"logs":return r`<ccl-logs .tenantId=${t}></ccl-logs>`}}}R=j(fn),o(R,5,"appState",bn,at),o(R,5,"tab",yn,at),o(R,5,"user",mn,at),o(R,5,"tenantList",gn,at),o(R,5,"tenant",vn,at),o(R,5,"theme",un,at),o(R,5,"navCollapsed",pn,at),at=o(R,0,"CclApp",$n,at),l(at,"styles",Bn``),i(R,1,at);
//# sourceMappingURL=index-DmtbBV61.js.map
