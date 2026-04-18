/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
const t$2 = globalThis, e$2 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$4 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$3 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$2) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$2.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$3, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$2(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), h2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== h2 && e$1(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$3(t3), ...o$3(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2, e2 = false, h2) {
    var _a2;
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i2 ?? (i2 = r2.getPropertyOptions(t2)), !((i2.hasChanged ?? f$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(r2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    i2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null ? void 0 : p$1({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, i$1 = (t2) => t2, s$1 = t$1.trustedTypes, e = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$2, r$2 = `<${n$1}>`, l = document, c = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i2) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e ? e.createHTML(i2) : i2;
}
const N = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = v;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
    const x2 = c2 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$2 + x2) : s3 + o$2 + (-2 === d2 ? i3 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i2);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
          const i3 = v2[a2++], s2 = r2.getAttribute(t3).split(o$2), e3 = /([.?@])?(.*)/.exec(i3);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$2) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$2), i3 = t3.length - 1;
          if (i3 > 0) {
            r2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++) r2.append(t3[s2], c()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i3], c());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$1) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$2, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$2.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M(t2, i2, s2 = t2, e2) {
  var _a2, _b;
  if (i2 === E) return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = a(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = M(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class R {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? l).importNode(i2, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new Z(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class k {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = M(this, t2, i2), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i2);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = C.get(t2.strings);
    return void 0 === i2 && C.set(t2.strings, i2 = new S(t2)), i2;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new k(this.O(c()), this.O(c()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$1(t2).nextSibling;
      i$1(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M(this, t2, i2, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M(this, e3[s2 + n3], i2, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = M(this, t2, i2, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M(this, t2);
  }
}
const B = t$1.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k), (t$1.litHtmlVersions ?? (t$1.litHtmlVersions = [])).push("3.3.2");
const D = (t2, i2, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new k(i2.insertBefore(c(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = globalThis;
class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return E;
  }
}
i._$litElement$ = true, i["finalized"] = true, (_a = s.litElementHydrateSupport) == null ? void 0 : _a.call(s, { LitElement: i });
const o$1 = s.litElementPolyfillSupport;
o$1 == null ? void 0 : o$1({ LitElement: i });
(s.litElementVersions ?? (s.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n2({ ...r2, state: true, attribute: false });
}
const cardStyles = i$3`
  :host {
    --eight-sleep-primary: var(--primary-color, #03a9f4);
    --eight-sleep-warm: #ef5350;
    --eight-sleep-cool: #42a5f5;
    --eight-sleep-neutral: var(--secondary-text-color, #727272);
  }

  ha-card {
    padding: 16px;
    box-sizing: border-box;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .card-title {
    font-size: 1.2em;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .status-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.85em;
    background: var(--secondary-background-color);
  }

  .status-badge.heating {
    background: rgba(239, 83, 80, 0.15);
    color: var(--eight-sleep-warm);
  }

  .status-badge.cooling {
    background: rgba(66, 165, 245, 0.15);
    color: var(--eight-sleep-cool);
  }

  .status-badge.active {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .bed-container {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .bed-side {
    flex: 1;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: background 0.3s ease;
    border: 1px solid var(--divider-color, #e0e0e0);
    position: relative;
    overflow: hidden;
  }

  .bed-side.has-presence::before {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--success-color, #4caf50);
  }

  .bed-side-label {
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--secondary-text-color);
    margin-bottom: 8px;
  }

  .temperature-display {
    font-size: 2em;
    font-weight: 300;
    color: var(--primary-text-color);
    margin: 8px 0;
  }

  .temperature-indicator {
    font-size: 0.85em;
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .temperature-indicator.warming {
    color: var(--eight-sleep-warm);
  }

  .temperature-indicator.cooling {
    color: var(--eight-sleep-cool);
  }

  .target-temp {
    font-size: 0.85em;
    color: var(--secondary-text-color);
    margin-top: 8px;
  }

  .sleep-stats {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .sleep-stats-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .sleep-stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .sleep-side {
    padding: 12px;
    background: var(--card-background-color, #fff);
    border-radius: 8px;
  }

  .sleep-side-title {
    font-size: 0.85em;
    color: var(--secondary-text-color);
    margin-bottom: 8px;
  }

  .sleep-score {
    font-size: 1.4em;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .sleep-metric {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85em;
    color: var(--secondary-text-color);
    margin: 4px 0;
  }

  .sleep-metric-icon {
    width: 16px;
    text-align: center;
  }

  .alarms-section {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: var(--secondary-background-color);
    border-radius: 8px;
    font-size: 0.9em;
    color: var(--secondary-text-color);
  }

  .alarm-divider {
    color: var(--divider-color);
  }

  .room-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 12px;
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }

  .room-info-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .warning {
    color: var(--warning-color, #ff9800);
  }

  .error {
    color: var(--error-color, #f44336);
  }

  /* Compact mode */
  :host([compact]) .sleep-stats {
    padding: 12px;
  }

  :host([compact]) .bed-side {
    padding: 12px;
  }

  :host([compact]) .temperature-display {
    font-size: 1.6em;
  }

  :host([compact]) .sleep-stats-grid {
    gap: 8px;
  }

  /* Unavailable state */
  .unavailable {
    opacity: 0.5;
  }

  .unavailable-message {
    text-align: center;
    padding: 24px;
    color: var(--secondary-text-color);
  }
`;
const editorStyles = i$3`
  .editor-container {
    padding: 16px;
  }

  .editor-row {
    margin-bottom: 16px;
  }

  .editor-label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
  }

  .editor-input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  .editor-checkbox-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .editor-select {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }
`;
function formatTimeSlept(seconds) {
  if (seconds === null || seconds === void 0 || isNaN(seconds)) {
    return "--";
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  return `${hours}h ${minutes}m`;
}
function formatTemperature(value, unit, hass) {
  if (value === null || value === void 0 || isNaN(value)) {
    return "--°";
  }
  const targetUnit = unit || (hass == null ? void 0 : hass.config.unit_system.temperature) || "fahrenheit";
  const symbol = targetUnit === "celsius" ? "°C" : "°F";
  return `${Math.round(value)}${symbol}`;
}
function getSleepScoreColor(score) {
  if (score === null) return "var(--disabled-text-color, #999)";
  if (score >= 80) return "var(--success-color, #4caf50)";
  if (score >= 60) return "var(--warning-color, #ff9800)";
  return "var(--error-color, #f44336)";
}
function getTemperatureGradient(level) {
  if (level === null) return "var(--card-background-color, #fff)";
  const normalized = (level + 100) / 200;
  if (normalized < 0.4) {
    const intensity = 1 - normalized / 0.4;
    return `rgba(66, 165, 245, ${0.1 + intensity * 0.3})`;
  } else if (normalized > 0.6) {
    const intensity = (normalized - 0.6) / 0.4;
    return `rgba(239, 83, 80, ${0.1 + intensity * 0.3})`;
  }
  return "var(--card-background-color, #fff)";
}
function parseEntityState(state) {
  if (!state || state === "unavailable" || state === "unknown") {
    return null;
  }
  const num = parseFloat(state);
  return isNaN(num) ? null : num;
}
function getEntityState(hass, entityId) {
  if (!(hass == null ? void 0 : hass.states[entityId])) return null;
  const state = hass.states[entityId].state;
  if (state === "unavailable" || state === "unknown") return null;
  return state;
}
function getEntityAttribute(hass, entityId, attribute) {
  if (!(hass == null ? void 0 : hass.states[entityId])) return null;
  return hass.states[entityId].attributes[attribute] ?? null;
}
function extractSideData(hass, prefix, side) {
  const sensorPrefix = `sensor.${prefix}_${side}`;
  const binaryPrefix = `binary_sensor.${prefix}_${side}`;
  const climateEntity = `climate.${prefix}_${side}`;
  const hvacActionRaw = getEntityAttribute(hass, climateEntity, "hvac_action");
  let hvacAction = null;
  if (hvacActionRaw === "heating" || hvacActionRaw === "cooling" || hvacActionRaw === "idle" || hvacActionRaw === "off") {
    hvacAction = hvacActionRaw;
  }
  return {
    side,
    bedTemperature: parseEntityState(getEntityState(hass, `${sensorPrefix}_bed_temperature`) ?? void 0),
    targetTemperature: parseEntityState(getEntityState(hass, `${sensorPrefix}_target_heating_temp`) ?? void 0),
    heatingLevel: parseEntityState(getEntityState(hass, `${sensorPrefix}_bed_state`) ?? void 0),
    hvacAction,
    sleepScore: parseEntityState(getEntityState(hass, `${sensorPrefix}_current_sleep_quality_score`) ?? void 0),
    timeSlept: parseEntityState(getEntityState(hass, `${sensorPrefix}_time_slept`) ?? void 0),
    heartRate: parseEntityState(getEntityState(hass, `${sensorPrefix}_current_heart_rate`) ?? void 0),
    hrv: parseEntityState(getEntityState(hass, `${sensorPrefix}_current_hrv`) ?? void 0),
    breathRate: parseEntityState(getEntityState(hass, `${sensorPrefix}_current_breath_rate`) ?? void 0),
    nextAlarm: getEntityState(hass, `${sensorPrefix}_next_alarm`),
    presence: getEntityState(hass, `${binaryPrefix}_bed_presence`) === "on"
  };
}
function extractRoomData(hass, prefix) {
  const sensorPrefix = `sensor.${prefix}`;
  return {
    temperature: parseEntityState(getEntityState(hass, `${sensorPrefix}_room_temperature`) ?? void 0),
    hasWater: getEntityState(hass, `${sensorPrefix}_has_water`) === "on" || getEntityState(hass, `${sensorPrefix}_has_water`) === "true",
    isPriming: getEntityState(hass, `${sensorPrefix}_is_priming`) === "on" || getEntityState(hass, `${sensorPrefix}_is_priming`) === "true"
  };
}
function formatAlarmTime(isoString) {
  if (!isoString) return "--";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "--";
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return "--";
  }
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
let BedSideComponent = class extends i {
  constructor() {
    super(...arguments);
    this.temperatureUnit = "fahrenheit";
  }
  getIndicatorClass() {
    if (this.data.hvacAction === "heating") return "warming";
    if (this.data.hvacAction === "cooling") return "cooling";
    return "";
  }
  getIndicatorText() {
    if (this.data.hvacAction === "heating") return "(warming ↑)";
    if (this.data.hvacAction === "cooling") return "(cooling ↓)";
    if (this.data.hvacAction === "idle") return "(idle)";
    if (this.data.hvacAction === "off") return "(off)";
    return "";
  }
  render() {
    const bgColor = getTemperatureGradient(this.data.heatingLevel);
    return b`
      <div
        class="bed-side ${this.data.presence ? "has-presence" : ""}"
        style="background: ${bgColor}"
      >
        <div class="bed-side-label">${capitalize(this.data.side)} Side</div>
        <div class="temperature-display">
          ${formatTemperature(this.data.bedTemperature, this.temperatureUnit)}
        </div>
        ${this.data.hvacAction ? b`
          <div class="temperature-indicator ${this.getIndicatorClass()}">
            ${this.getIndicatorText()}
          </div>
        ` : A}
        ${this.data.targetTemperature !== null ? b`
          <div class="target-temp">
            Target: ${formatTemperature(this.data.targetTemperature, this.temperatureUnit)}
          </div>
        ` : A}
      </div>
    `;
  }
};
BedSideComponent.styles = i$3`
    :host {
      display: block;
      flex: 1;
    }

    .bed-side {
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      transition: background 0.3s ease;
      border: 1px solid var(--divider-color, #e0e0e0);
      position: relative;
      overflow: hidden;
      height: 100%;
      box-sizing: border-box;
    }

    .bed-side.has-presence::before {
      content: '👤';
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 14px;
    }

    .bed-side-label {
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .temperature-display {
      font-size: 2em;
      font-weight: 300;
      color: var(--primary-text-color);
      margin: 8px 0;
    }

    .temperature-indicator {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    .temperature-indicator.warming {
      color: #ef5350;
      animation: pulse 2s infinite;
    }

    .temperature-indicator.cooling {
      color: #42a5f5;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    .target-temp {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
  `;
__decorateClass$4([
  n2({ type: Object })
], BedSideComponent.prototype, "data", 2);
__decorateClass$4([
  n2({ type: String })
], BedSideComponent.prototype, "temperatureUnit", 2);
BedSideComponent = __decorateClass$4([
  t("eight-sleep-bed-side")
], BedSideComponent);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let SleepStatsComponent = class extends i {
  constructor() {
    super(...arguments);
    this.sidesData = [];
  }
  renderSideStats(data) {
    const hasAnyData = data.sleepScore !== null || data.timeSlept !== null || data.heartRate !== null;
    if (!hasAnyData) {
      return b`
        <div class="sleep-side">
          <div class="sleep-side-title">${capitalize(data.side)} Side</div>
          <div class="no-data">No sleep data</div>
        </div>
      `;
    }
    return b`
      <div class="sleep-side">
        <div class="sleep-side-title">${capitalize(data.side)} Side</div>
        ${data.sleepScore !== null ? b`
          <div class="sleep-score" style="color: ${getSleepScoreColor(data.sleepScore)}">
            Score: ${Math.round(data.sleepScore)}%
          </div>
        ` : A}
        ${data.timeSlept !== null ? b`
          <div class="sleep-metric">
            <span class="sleep-metric-icon">🛏️</span>
            <span>Slept: ${formatTimeSlept(data.timeSlept)}</span>
          </div>
        ` : A}
        ${data.heartRate !== null ? b`
          <div class="sleep-metric">
            <span class="sleep-metric-icon">❤️</span>
            <span>${Math.round(data.heartRate)} bpm</span>
          </div>
        ` : A}
        ${data.hrv !== null ? b`
          <div class="sleep-metric">
            <span class="sleep-metric-icon">📊</span>
            <span>HRV: ${Math.round(data.hrv)}ms</span>
          </div>
        ` : A}
        ${data.breathRate !== null ? b`
          <div class="sleep-metric">
            <span class="sleep-metric-icon">💨</span>
            <span>${Math.round(data.breathRate)}/min</span>
          </div>
        ` : A}
      </div>
    `;
  }
  render() {
    if (this.sidesData.length === 0) {
      return A;
    }
    return b`
      <div class="sleep-stats">
        <div class="sleep-stats-header">
          <span>🛏️</span>
          <span>Last Night</span>
        </div>
        <div class="sleep-stats-grid">
          ${this.sidesData.map((side) => this.renderSideStats(side))}
        </div>
      </div>
    `;
  }
};
SleepStatsComponent.styles = i$3`
    :host {
      display: block;
    }

    .sleep-stats {
      background: var(--secondary-background-color);
      border-radius: 12px;
      padding: 16px;
    }

    .sleep-stats-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .sleep-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
    }

    .sleep-side {
      padding: 12px;
      background: var(--card-background-color, #fff);
      border-radius: 8px;
    }

    .sleep-side-title {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .sleep-score {
      font-size: 1.4em;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .sleep-metric {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin: 4px 0;
    }

    .sleep-metric-icon {
      width: 16px;
      text-align: center;
      flex-shrink: 0;
    }

    .no-data {
      color: var(--disabled-text-color, #999);
      font-style: italic;
      text-align: center;
      padding: 12px;
    }
  `;
__decorateClass$3([
  n2({ type: Array })
], SleepStatsComponent.prototype, "sidesData", 2);
SleepStatsComponent = __decorateClass$3([
  t("eight-sleep-stats")
], SleepStatsComponent);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let AlarmDisplayComponent = class extends i {
  constructor() {
    super(...arguments);
    this.sidesData = [];
  }
  render() {
    const alarmsWithData = this.sidesData.filter((s2) => s2.nextAlarm !== null);
    if (alarmsWithData.length === 0) {
      return b`
        <div class="alarms-section">
          <span class="alarm-icon">⏰</span>
          <span class="no-alarms">No alarms set</span>
        </div>
      `;
    }
    return b`
      <div class="alarms-section">
        <span class="alarm-icon">⏰</span>
        <span>Alarms:</span>
        ${alarmsWithData.map((side, index) => b`
          ${index > 0 ? b`<span class="alarm-divider">│</span>` : A}
          <span class="alarm-item">
            <span>${capitalize(side.side)}</span>
            <span>${formatAlarmTime(side.nextAlarm)}</span>
          </span>
        `)}
      </div>
    `;
  }
};
AlarmDisplayComponent.styles = i$3`
    :host {
      display: block;
    }

    .alarms-section {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      padding: 12px;
      background: var(--secondary-background-color);
      border-radius: 8px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }

    .alarm-icon {
      flex-shrink: 0;
    }

    .alarm-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .alarm-divider {
      color: var(--divider-color);
    }

    .no-alarms {
      font-style: italic;
    }
  `;
__decorateClass$2([
  n2({ type: Array })
], AlarmDisplayComponent.prototype, "sidesData", 2);
AlarmDisplayComponent = __decorateClass$2([
  t("eight-sleep-alarms")
], AlarmDisplayComponent);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let EightSleepCardEditor = class extends i {
  setConfig(config) {
    this._config = config;
  }
  _valueChanged(ev) {
    if (!this._config) return;
    const target = ev.target;
    const configKey = target.dataset.configKey;
    if (!configKey) return;
    let value;
    if (target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }
    const newConfig = {
      ...this._config,
      [configKey]: value
    };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true
      })
    );
  }
  _sidesChanged(ev) {
    if (!this._config) return;
    const target = ev.target;
    const side = target.dataset.side;
    const checked = target.checked;
    const currentSides = this._config.sides || ["left", "right"];
    let newSides;
    if (checked && !currentSides.includes(side)) {
      newSides = [...currentSides, side].sort();
    } else if (!checked && currentSides.includes(side)) {
      newSides = currentSides.filter((s2) => s2 !== side);
    } else {
      return;
    }
    if (newSides.length === 0) {
      return;
    }
    const newConfig = {
      ...this._config,
      sides: newSides
    };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true
      })
    );
  }
  render() {
    if (!this._config) {
      return b`<div>No configuration</div>`;
    }
    const sides = this._config.sides || ["left", "right"];
    return b`
      <div class="editor-container">
        <div class="editor-row">
          <label class="editor-label">Entity Prefix</label>
          <input
            type="text"
            class="editor-input"
            .value=${this._config.entity_prefix || ""}
            data-config-key="entity_prefix"
            @input=${this._valueChanged}
            placeholder="eight_sleep"
          />
          <small style="color: var(--secondary-text-color); display: block; margin-top: 4px;">
            The prefix used for your Eight Sleep entities (e.g., "eight_sleep")
          </small>
        </div>

        <div class="editor-row">
          <label class="editor-label">Sides to Display</label>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="side-left"
              .checked=${sides.includes("left")}
              data-side="left"
              @change=${this._sidesChanged}
            />
            <label for="side-left">Left</label>
          </div>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="side-right"
              .checked=${sides.includes("right")}
              data-side="right"
              @change=${this._sidesChanged}
            />
            <label for="side-right">Right</label>
          </div>
        </div>

        <div class="editor-row">
          <label class="editor-label">Temperature Unit</label>
          <select
            class="editor-select"
            .value=${this._config.temperature_unit || ""}
            data-config-key="temperature_unit"
            @change=${this._valueChanged}
          >
            <option value="">Auto (from HA settings)</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="celsius">Celsius</option>
          </select>
        </div>

        <div class="editor-row">
          <label class="editor-label">Display Options</label>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="show-sleep-stats"
              .checked=${this._config.show_sleep_stats !== false}
              data-config-key="show_sleep_stats"
              @change=${this._valueChanged}
            />
            <label for="show-sleep-stats">Show Sleep Statistics</label>
          </div>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="show-alarms"
              .checked=${this._config.show_alarms !== false}
              data-config-key="show_alarms"
              @change=${this._valueChanged}
            />
            <label for="show-alarms">Show Alarms</label>
          </div>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="show-room-info"
              .checked=${this._config.show_room_info !== false}
              data-config-key="show_room_info"
              @change=${this._valueChanged}
            />
            <label for="show-room-info">Show Room Info</label>
          </div>
          <div class="editor-checkbox-row">
            <input
              type="checkbox"
              id="compact"
              .checked=${this._config.compact === true}
              data-config-key="compact"
              @change=${this._valueChanged}
            />
            <label for="compact">Compact Mode</label>
          </div>
        </div>
      </div>
    `;
  }
};
EightSleepCardEditor.styles = editorStyles;
__decorateClass$1([
  n2({ attribute: false })
], EightSleepCardEditor.prototype, "hass", 2);
__decorateClass$1([
  r()
], EightSleepCardEditor.prototype, "_config", 2);
EightSleepCardEditor = __decorateClass$1([
  t("eight-sleep-card-editor")
], EightSleepCardEditor);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let EightSleepCard = class extends i {
  constructor() {
    super(...arguments);
    this._sidesData = [];
    this._roomData = { temperature: null, hasWater: true, isPriming: false };
  }
  static getConfigElement() {
    return document.createElement("eight-sleep-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:eight-sleep-card",
      entity_prefix: "eight_sleep",
      sides: ["left", "right"],
      show_sleep_stats: true,
      show_alarms: true,
      show_room_info: true
    };
  }
  setConfig(config) {
    if (!config.entity_prefix) {
      throw new Error("Please define entity_prefix");
    }
    this._config = {
      sides: ["left", "right"],
      show_sleep_stats: true,
      show_alarms: true,
      show_room_info: true,
      compact: false,
      ...config
    };
    if (this._config.compact) {
      this.setAttribute("compact", "");
    } else {
      this.removeAttribute("compact");
    }
  }
  getCardSize() {
    var _a2, _b, _c, _d;
    let size = 3;
    if (((_a2 = this._config) == null ? void 0 : _a2.show_sleep_stats) !== false) size += 2;
    if (((_b = this._config) == null ? void 0 : _b.show_alarms) !== false) size += 1;
    if (((_c = this._config) == null ? void 0 : _c.show_room_info) !== false) size += 1;
    if ((_d = this._config) == null ? void 0 : _d.compact) size = Math.ceil(size * 0.7);
    return size;
  }
  willUpdate(changedProps) {
    super.willUpdate(changedProps);
    if (changedProps.has("hass") && this.hass && this._config) {
      this._updateData();
    }
  }
  _updateData() {
    if (!this.hass || !this._config) return;
    const prefix = this._config.entity_prefix;
    const sides = this._config.sides || ["left", "right"];
    this._sidesData = sides.map((side) => extractSideData(this.hass, prefix, side));
    this._roomData = extractRoomData(this.hass, prefix);
  }
  _getOverallStatus() {
    const heatingCount = this._sidesData.filter((s2) => s2.hvacAction === "heating").length;
    const coolingCount = this._sidesData.filter((s2) => s2.hvacAction === "cooling").length;
    if (heatingCount > 0 && coolingCount > 0) {
      return { text: "Active", icon: "⚡", class: "active" };
    } else if (heatingCount > 0) {
      return { text: "Heating", icon: "🔥", class: "heating active" };
    } else if (coolingCount > 0) {
      return { text: "Cooling", icon: "❄️", class: "cooling active" };
    } else if (this._sidesData.some((s2) => s2.hvacAction === "idle")) {
      return { text: "Idle", icon: "⏸️", class: "" };
    }
    return { text: "Off", icon: "⭘", class: "" };
  }
  _renderRoomInfo() {
    var _a2, _b, _c;
    if (((_a2 = this._config) == null ? void 0 : _a2.show_room_info) === false) return A;
    const tempUnit = ((_b = this._config) == null ? void 0 : _b.temperature_unit) || (((_c = this.hass) == null ? void 0 : _c.config.unit_system.temperature) === "°C" ? "celsius" : "fahrenheit");
    return b`
      <div class="room-info">
        ${this._roomData.temperature !== null ? b`
          <div class="room-info-item">
            <span>🌡️</span>
            <span>Room: ${formatTemperature(this._roomData.temperature, tempUnit)}</span>
          </div>
        ` : A}
        ${!this._roomData.hasWater ? b`
          <div class="room-info-item warning">
            <span>💧</span>
            <span>Low Water</span>
          </div>
        ` : A}
        ${this._roomData.isPriming ? b`
          <div class="room-info-item">
            <span>🔄</span>
            <span>Priming</span>
          </div>
        ` : A}
      </div>
    `;
  }
  render() {
    if (!this._config || !this.hass) {
      return b`
        <ha-card>
          <div class="unavailable-message">
            Card not configured
          </div>
        </ha-card>
      `;
    }
    const status = this._getOverallStatus();
    const tempUnit = this._config.temperature_unit || (this.hass.config.unit_system.temperature === "°C" ? "celsius" : "fahrenheit");
    return b`
      <ha-card>
        <div class="card-header">
          <div class="card-title">Eight Sleep Pod</div>
          <div class="status-badge ${status.class}">
            <span>${status.icon}</span>
            <span>${status.text}</span>
          </div>
        </div>

        <div class="bed-container">
          ${this._sidesData.map(
      (sideData) => b`
              <eight-sleep-bed-side
                .data=${sideData}
                .temperatureUnit=${tempUnit}
              ></eight-sleep-bed-side>
            `
    )}
        </div>

        ${this._config.show_sleep_stats !== false ? b`
          <eight-sleep-stats .sidesData=${this._sidesData}></eight-sleep-stats>
        ` : A}

        ${this._config.show_alarms !== false ? b`
          <eight-sleep-alarms .sidesData=${this._sidesData}></eight-sleep-alarms>
        ` : A}

        ${this._renderRoomInfo()}
      </ha-card>
    `;
  }
};
EightSleepCard.styles = cardStyles;
__decorateClass([
  n2({ attribute: false })
], EightSleepCard.prototype, "hass", 2);
__decorateClass([
  r()
], EightSleepCard.prototype, "_config", 2);
__decorateClass([
  r()
], EightSleepCard.prototype, "_sidesData", 2);
__decorateClass([
  r()
], EightSleepCard.prototype, "_roomData", 2);
EightSleepCard = __decorateClass([
  t("eight-sleep-card")
], EightSleepCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "eight-sleep-card",
  name: "Eight Sleep Card",
  description: "A custom card for displaying Eight Sleep bed status and sleep data",
  preview: true
});
export {
  EightSleepCard
};
