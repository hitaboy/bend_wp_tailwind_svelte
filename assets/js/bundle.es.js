typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
const Pn = 1, Nn = 4, Mn = 8, Dn = 16, In = 1, Ln = 2, x = /* @__PURE__ */ Symbol(), et = !1;
var jn = Array.isArray, qn = Array.prototype.indexOf, Bn = Array.from, Dt = Object.defineProperty, be = Object.getOwnPropertyDescriptor, zn = Object.prototype, Un = Array.prototype, Yn = Object.getPrototypeOf, yt = Object.isExtensible;
const me = () => {
};
function Hn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function It() {
  var e, t, n = new Promise((r, s) => {
    e = r, t = s;
  });
  return { promise: n, resolve: e, reject: t };
}
const E = 2, lt = 4, ut = 8, Vn = 1 << 24, W = 16, K = 32, le = 64, Ge = 128, L = 512, S = 1024, F = 2048, U = 4096, z = 8192, $ = 16384, at = 32768, ie = 65536, Et = 1 << 17, Lt = 1 << 18, xe = 1 << 19, $n = 1 << 20, se = 32768, tt = 1 << 21, ot = 1 << 22, X = 1 << 23, Te = /* @__PURE__ */ Symbol("$state"), Gn = /* @__PURE__ */ Symbol("legacy props"), pe = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function Wn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Kn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Zn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Jn(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Qn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Xn(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function er() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function tr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function nr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function rr() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function ir() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function jt(e) {
  return e === this.v;
}
function qt(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Bt(e) {
  return !qt(e, this.v);
}
let sr = !1, I = null;
function ye(e) {
  I = e;
}
function ct(e, t = !1, n) {
  I = {
    p: I,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function dt(e) {
  var t = (
    /** @type {ComponentContext} */
    I
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Xt(r);
  }
  return t.i = !0, I = t.p, /** @type {T} */
  {};
}
function zt() {
  return !0;
}
let ge = [];
function fr() {
  var e = ge;
  ge = [], Hn(e);
}
function We(e) {
  if (ge.length === 0) {
    var t = ge;
    queueMicrotask(() => {
      t === ge && fr();
    });
  }
  ge.push(e);
}
function Ut(e) {
  var t = _;
  if (t === null)
    return v.f |= X, e;
  if ((t.f & at) === 0) {
    if ((t.f & Ge) === 0)
      throw e;
    t.b.error(e);
  } else
    Ee(e, t);
}
function Ee(e, t) {
  for (; t !== null; ) {
    if ((t.f & Ge) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    t = t.parent;
  }
  throw e;
}
const Ie = /* @__PURE__ */ new Set();
let b = null, D = null, j = [], ht = null, nt = !1;
class q {
  committed = !1;
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #e = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #r = 0;
  /**
   * The number of async effects that are currently in flight, _not_ inside a pending boundary
   */
  #n = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #u = null;
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #i = /* @__PURE__ */ new Set();
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  is_fork = !1;
  is_deferred() {
    return this.is_fork || this.#n > 0;
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    j = [], this.apply();
    var n = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: []
    };
    for (const r of t)
      this.#f(r, n);
    this.is_fork || this.#o(), this.is_deferred() ? (this.#l(n.effects), this.#l(n.render_effects)) : (b = null, xt(n.render_effects), xt(n.effects), this.#u?.resolve()), D = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {EffectTarget} target
   */
  #f(t, n) {
    t.f ^= S;
    for (var r = t.first; r !== null; ) {
      var s = r.f, i = (s & (K | le)) !== 0, u = i && (s & S) !== 0, l = u || (s & z) !== 0 || this.skipped_effects.has(r);
      if ((r.f & Ge) !== 0 && r.b?.is_pending() && (n = {
        parent: n,
        effect: r,
        effects: [],
        render_effects: []
      }), !l && r.fn !== null) {
        i ? r.f ^= S : (s & lt) !== 0 ? n.effects.push(r) : Me(r) && ((r.f & W) !== 0 && this.#s.add(r), Pe(r));
        var f = r.first;
        if (f !== null) {
          r = f;
          continue;
        }
      }
      var a = r.parent;
      for (r = r.next; r === null && a !== null; )
        a === n.effect && (this.#l(n.effects), this.#l(n.render_effects), n = /** @type {EffectTarget} */
        n.parent), r = a.next, a = a.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #l(t) {
    for (const n of t)
      (n.f & F) !== 0 ? this.#s.add(n) : (n.f & U) !== 0 && this.#i.add(n), this.#a(n.deps), T(n, S);
  }
  /**
   * @param {Value[] | null} deps
   */
  #a(t) {
    if (t !== null)
      for (const n of t)
        (n.f & E) === 0 || (n.f & se) === 0 || (n.f ^= se, this.#a(
          /** @type {Derived} */
          n.deps
        ));
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, n) {
    this.previous.has(t) || this.previous.set(t, n), (t.f & X) === 0 && (this.current.set(t, t.v), D?.set(t, t.v));
  }
  activate() {
    b = this, this.apply();
  }
  deactivate() {
    b === this && (b = null, D = null);
  }
  flush() {
    if (this.activate(), j.length > 0) {
      if (lr(), b !== null && b !== this)
        return;
    } else this.#r === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#t) t(this);
    this.#t.clear();
  }
  #o() {
    if (this.#n === 0) {
      for (const t of this.#e) t();
      this.#e.clear();
    }
    this.#r === 0 && this.#c();
  }
  #c() {
    if (Ie.size > 1) {
      this.previous.clear();
      var t = D, n = !0, r = {
        parent: null,
        effect: null,
        effects: [],
        render_effects: []
      };
      for (const i of Ie) {
        if (i === this) {
          n = !1;
          continue;
        }
        const u = [];
        for (const [f, a] of this.current) {
          if (i.current.has(f))
            if (n && a !== i.current.get(f))
              i.current.set(f, a);
            else
              continue;
          u.push(f);
        }
        if (u.length === 0)
          continue;
        const l = [...i.current.keys()].filter((f) => !this.current.has(f));
        if (l.length > 0) {
          var s = j;
          j = [];
          const f = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
          for (const h of u)
            Yt(h, l, f, a);
          if (j.length > 0) {
            b = i, i.apply();
            for (const h of j)
              i.#f(h, r);
            i.deactivate();
          }
          j = s;
        }
      }
      b = null, D = t;
    }
    this.committed = !0, Ie.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    this.#r += 1, t && (this.#n += 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(t) {
    this.#r -= 1, t && (this.#n -= 1), this.revive();
  }
  revive() {
    for (const t of this.#s)
      this.#i.delete(t), T(t, F), fe(t);
    for (const t of this.#i)
      T(t, U), fe(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#e.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#t.add(t);
  }
  settled() {
    return (this.#u ??= It()).promise;
  }
  static ensure() {
    if (b === null) {
      const t = b = new q();
      Ie.add(b), q.enqueue(() => {
        b === t && t.flush();
      });
    }
    return b;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    We(t);
  }
  apply() {
  }
}
function lr() {
  var e = ne;
  nt = !0;
  var t = null;
  try {
    var n = 0;
    for (He(!0); j.length > 0; ) {
      var r = q.ensure();
      if (n++ > 1e3) {
        var s, i;
        ur();
      }
      r.process(j), ee.clear();
    }
  } finally {
    nt = !1, He(e), ht = null;
  }
}
function ur() {
  try {
    Qn();
  } catch (e) {
    Ee(e, ht);
  }
}
let H = null;
function xt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & ($ | z)) === 0 && Me(r) && (H = /* @__PURE__ */ new Set(), Pe(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? sn(r) : r.fn = null), H?.size > 0)) {
        ee.clear();
        for (const s of H) {
          if ((s.f & ($ | z)) !== 0) continue;
          const i = [s];
          let u = s.parent;
          for (; u !== null; )
            H.has(u) && (H.delete(u), i.push(u)), u = u.parent;
          for (let l = i.length - 1; l >= 0; l--) {
            const f = i[l];
            (f.f & ($ | z)) === 0 && Pe(f);
          }
        }
        H.clear();
      }
    }
    H = null;
  }
}
function Yt(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & E) !== 0 ? Yt(
        /** @type {Derived} */
        s,
        t,
        n,
        r
      ) : (i & (ot | W)) !== 0 && (i & F) === 0 && Ht(s, t, r) && (T(s, F), fe(
        /** @type {Effect} */
        s
      ));
    }
}
function Ht(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (t.includes(s))
        return !0;
      if ((s.f & E) !== 0 && Ht(
        /** @type {Derived} */
        s,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          s,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function fe(e) {
  for (var t = ht = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (nt && t === _ && (n & W) !== 0 && (n & Lt) === 0)
      return;
    if ((n & (le | K)) !== 0) {
      if ((n & S) === 0) return;
      t.f ^= S;
    }
  }
  j.push(t);
}
function ar(e) {
  let t = 0, n = Ne(0), r;
  return () => {
    Re() && (g(n), en(() => (t === 0 && (r = Je(() => e(() => ke(n)))), t += 1, () => {
      We(() => {
        t -= 1, t === 0 && (r?.(), r = void 0, ke(n));
      });
    })));
  };
}
var or = ie | xe | Ge;
function cr(e, t, n) {
  new dr(e, t, n);
}
class dr {
  /** @type {Boundary | null} */
  parent;
  #e = !1;
  /** @type {TemplateNode} */
  #t;
  /** @type {TemplateNode | null} */
  #r = null;
  /** @type {BoundaryProps} */
  #n;
  /** @type {((anchor: Node) => void)} */
  #u;
  /** @type {Effect} */
  #s;
  /** @type {Effect | null} */
  #i = null;
  /** @type {Effect | null} */
  #f = null;
  /** @type {Effect | null} */
  #l = null;
  /** @type {DocumentFragment | null} */
  #a = null;
  /** @type {TemplateNode | null} */
  #o = null;
  #c = 0;
  #d = 0;
  #v = !1;
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #h = null;
  #b = ar(() => (this.#h = Ne(this.#c), () => {
    this.#h = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, n, r) {
    this.#t = t, this.#n = n, this.#u = r, this.parent = /** @type {Effect} */
    _.b, this.#e = !!this.#n.pending, this.#s = gt(() => {
      _.b = this;
      {
        var s = this.#g();
        try {
          this.#i = V(() => r(s));
        } catch (i) {
          this.error(i);
        }
        this.#d > 0 ? this.#p() : this.#e = !1;
      }
      return () => {
        this.#o?.remove();
      };
    }, or);
  }
  #m() {
    try {
      this.#i = V(() => this.#u(this.#t));
    } catch (t) {
      this.error(t);
    }
    this.#e = !1;
  }
  #y() {
    const t = this.#n.pending;
    t && (this.#f = V(() => t(this.#t)), q.enqueue(() => {
      var n = this.#g();
      this.#i = this.#_(() => (q.ensure(), V(() => this.#u(n)))), this.#d > 0 ? this.#p() : (Ce(
        /** @type {Effect} */
        this.#f,
        () => {
          this.#f = null;
        }
      ), this.#e = !1);
    }));
  }
  #g() {
    var t = this.#t;
    return this.#e && (this.#o = Fe(), this.#t.before(this.#o), t = this.#o), t;
  }
  /**
   * Returns `true` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_pending() {
    return this.#e || !!this.parent && this.parent.is_pending();
  }
  has_pending_snippet() {
    return !!this.#n.pending;
  }
  /**
   * @param {() => Effect | null} fn
   */
  #_(t) {
    var n = _, r = v, s = I;
    Y(this.#s), C(this.#s), ye(this.#s.ctx);
    try {
      return t();
    } catch (i) {
      return Ut(i), null;
    } finally {
      Y(n), C(r), ye(s);
    }
  }
  #p() {
    const t = (
      /** @type {(anchor: Node) => void} */
      this.#n.pending
    );
    this.#i !== null && (this.#a = document.createDocumentFragment(), this.#a.append(
      /** @type {TemplateNode} */
      this.#o
    ), un(this.#i, this.#a)), this.#f === null && (this.#f = V(() => t(this.#t)));
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   */
  #w(t) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#w(t);
      return;
    }
    this.#d += t, this.#d === 0 && (this.#e = !1, this.#f && Ce(this.#f, () => {
      this.#f = null;
    }), this.#a && (this.#t.before(this.#a), this.#a = null));
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(t) {
    this.#w(t), this.#c += t, this.#h && ze(this.#h, this.#c);
  }
  get_effect_pending() {
    return this.#b(), g(
      /** @type {Source<number>} */
      this.#h
    );
  }
  /** @param {unknown} error */
  error(t) {
    var n = this.#n.onerror;
    let r = this.#n.failed;
    if (this.#v || !n && !r)
      throw t;
    this.#i && (P(this.#i), this.#i = null), this.#f && (P(this.#f), this.#f = null), this.#l && (P(this.#l), this.#l = null);
    var s = !1, i = !1;
    const u = () => {
      if (s) {
        ir();
        return;
      }
      s = !0, i && rr(), q.ensure(), this.#c = 0, this.#l !== null && Ce(this.#l, () => {
        this.#l = null;
      }), this.#e = this.has_pending_snippet(), this.#i = this.#_(() => (this.#v = !1, V(() => this.#u(this.#t)))), this.#d > 0 ? this.#p() : this.#e = !1;
    };
    var l = v;
    try {
      C(null), i = !0, n?.(t, u), i = !1;
    } catch (f) {
      Ee(f, this.#s && this.#s.parent);
    } finally {
      C(l);
    }
    r && We(() => {
      this.#l = this.#_(() => {
        q.ensure(), this.#v = !0;
        try {
          return V(() => {
            r(
              this.#t,
              () => t,
              () => u
            );
          });
        } catch (f) {
          return Ee(
            f,
            /** @type {Effect} */
            this.#s.parent
          ), null;
        } finally {
          this.#v = !1;
        }
      });
    });
  }
}
function hr(e, t, n, r) {
  const s = Ke;
  if (n.length === 0 && e.length === 0) {
    r(t.map(s));
    return;
  }
  var i = b, u = (
    /** @type {Effect} */
    _
  ), l = vr();
  function f() {
    Promise.all(n.map((a) => /* @__PURE__ */ _r(a))).then((a) => {
      l();
      try {
        r([...t.map(s), ...a]);
      } catch (h) {
        (u.f & $) === 0 && Ee(h, u);
      }
      i?.deactivate(), Be();
    }).catch((a) => {
      Ee(a, u);
    });
  }
  e.length > 0 ? Promise.all(e).then(() => {
    l();
    try {
      return f();
    } finally {
      i?.deactivate(), Be();
    }
  }) : f();
}
function vr() {
  var e = _, t = v, n = I, r = b;
  return function(i = !0) {
    Y(e), C(t), ye(n), i && r?.activate();
  };
}
function Be() {
  Y(null), C(null), ye(null);
}
// @__NO_SIDE_EFFECTS__
function Ke(e) {
  var t = E | F, n = v !== null && (v.f & E) !== 0 ? (
    /** @type {Derived} */
    v
  ) : null;
  return _ !== null && (_.f |= xe), {
    ctx: I,
    deps: null,
    effects: null,
    equals: jt,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      x
    ),
    wv: 0,
    parent: n ?? _,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function _r(e, t) {
  let n = (
    /** @type {Effect | null} */
    _
  );
  n === null && Wn();
  var r = (
    /** @type {Boundary} */
    n.b
  ), s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = Ne(
    /** @type {V} */
    x
  ), u = !v, l = /* @__PURE__ */ new Map();
  return Ar(() => {
    var f = It();
    s = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, f.reject).then(() => {
        a === b && a.committed && a.deactivate(), Be();
      });
    } catch (o) {
      f.reject(o), Be();
    }
    var a = (
      /** @type {Batch} */
      b
    );
    if (u) {
      var h = !r.is_pending();
      r.update_pending_count(1), a.increment(h), l.get(a)?.reject(pe), l.delete(a), l.set(a, f);
    }
    const d = (o, c = void 0) => {
      if (a.activate(), c)
        c !== pe && (i.f |= X, ze(i, c));
      else {
        (i.f & X) !== 0 && (i.f ^= X), ze(i, o);
        for (const [w, y] of l) {
          if (l.delete(w), w === a) break;
          y.reject(pe);
        }
      }
      u && (r.update_pending_count(-1), a.decrement(h));
    };
    f.promise.then(d, (o) => d(null, o || "unknown"));
  }), pt(() => {
    for (const f of l.values())
      f.reject(pe);
  }), new Promise((f) => {
    function a(h) {
      function d() {
        h === s ? f(i) : a(s);
      }
      h.then(d, d);
    }
    a(s);
  });
}
// @__NO_SIDE_EFFECTS__
function he(e) {
  const t = /* @__PURE__ */ Ke(e);
  return an(t), t;
}
// @__NO_SIDE_EFFECTS__
function pr(e) {
  const t = /* @__PURE__ */ Ke(e);
  return t.equals = Bt, t;
}
function Vt(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      P(
        /** @type {Effect} */
        t[n]
      );
  }
}
function gr(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & E) === 0)
      return (t.f & $) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function vt(e) {
  var t, n = _;
  Y(gr(e));
  try {
    e.f &= ~se, Vt(e), t = hn(e);
  } finally {
    Y(n);
  }
  return t;
}
function $t(e) {
  var t = vt(e);
  if (e.equals(t) || (b?.is_fork || (e.v = t), e.wv = cn()), !ue)
    if (D !== null)
      (Re() || b?.is_fork) && D.set(e, t);
    else {
      var n = (e.f & L) === 0 ? U : S;
      T(e, n);
    }
}
let rt = /* @__PURE__ */ new Set();
const ee = /* @__PURE__ */ new Map();
let Gt = !1;
function Ne(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: jt,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function M(e, t) {
  const n = Ne(e);
  return an(n), n;
}
// @__NO_SIDE_EFFECTS__
function wr(e, t = !1, n = !0) {
  const r = Ne(e);
  return t || (r.equals = Bt), r;
}
function O(e, t, n = !1) {
  v !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!B || (v.f & Et) !== 0) && zt() && (v.f & (E | W | ot | Et)) !== 0 && !G?.includes(e) && nr();
  let r = n ? we(t) : t;
  return ze(e, r);
}
function ze(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    ue ? ee.set(e, t) : ee.set(e, n), e.v = t;
    var r = q.ensure();
    r.capture(e, n), (e.f & E) !== 0 && ((e.f & F) !== 0 && vt(
      /** @type {Derived} */
      e
    ), T(e, (e.f & L) !== 0 ? S : U)), e.wv = cn(), Wt(e, F), _ !== null && (_.f & S) !== 0 && (_.f & (K | le)) === 0 && (N === null ? Rr([e]) : N.push(e)), !r.is_fork && rt.size > 0 && !Gt && br();
  }
  return t;
}
function br() {
  Gt = !1;
  var e = ne;
  He(!0);
  const t = Array.from(rt);
  try {
    for (const n of t)
      (n.f & S) !== 0 && T(n, U), Me(n) && Pe(n);
  } finally {
    He(e);
  }
  rt.clear();
}
function ke(e) {
  O(e, e.v + 1);
}
function Wt(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, s = 0; s < r; s++) {
      var i = n[s], u = i.f, l = (u & F) === 0;
      if (l && T(i, t), (u & E) !== 0) {
        var f = (
          /** @type {Derived} */
          i
        );
        D?.delete(f), (u & se) === 0 && (u & L && (i.f |= se), Wt(f, U));
      } else l && ((u & W) !== 0 && H !== null && H.add(
        /** @type {Effect} */
        i
      ), fe(
        /** @type {Effect} */
        i
      ));
    }
}
function we(e) {
  if (typeof e != "object" || e === null || Te in e)
    return e;
  const t = Yn(e);
  if (t !== zn && t !== Un)
    return e;
  var n = /* @__PURE__ */ new Map(), r = jn(e), s = /* @__PURE__ */ M(0), i = re, u = (l) => {
    if (re === i)
      return l();
    var f = v, a = re;
    C(null), kt(i);
    var h = l();
    return C(f), kt(a), h;
  };
  return r && n.set("length", /* @__PURE__ */ M(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, f, a) {
        (!("value" in a) || a.configurable === !1 || a.enumerable === !1 || a.writable === !1) && er();
        var h = n.get(f);
        return h === void 0 ? h = u(() => {
          var d = /* @__PURE__ */ M(a.value);
          return n.set(f, d), d;
        }) : O(h, a.value, !0), !0;
      },
      deleteProperty(l, f) {
        var a = n.get(f);
        if (a === void 0) {
          if (f in l) {
            const h = u(() => /* @__PURE__ */ M(x));
            n.set(f, h), ke(s);
          }
        } else
          O(a, x), ke(s);
        return !0;
      },
      get(l, f, a) {
        if (f === Te)
          return e;
        var h = n.get(f), d = f in l;
        if (h === void 0 && (!d || be(l, f)?.writable) && (h = u(() => {
          var c = we(d ? l[f] : x), w = /* @__PURE__ */ M(c);
          return w;
        }), n.set(f, h)), h !== void 0) {
          var o = g(h);
          return o === x ? void 0 : o;
        }
        return Reflect.get(l, f, a);
      },
      getOwnPropertyDescriptor(l, f) {
        var a = Reflect.getOwnPropertyDescriptor(l, f);
        if (a && "value" in a) {
          var h = n.get(f);
          h && (a.value = g(h));
        } else if (a === void 0) {
          var d = n.get(f), o = d?.v;
          if (d !== void 0 && o !== x)
            return {
              enumerable: !0,
              configurable: !0,
              value: o,
              writable: !0
            };
        }
        return a;
      },
      has(l, f) {
        if (f === Te)
          return !0;
        var a = n.get(f), h = a !== void 0 && a.v !== x || Reflect.has(l, f);
        if (a !== void 0 || _ !== null && (!h || be(l, f)?.writable)) {
          a === void 0 && (a = u(() => {
            var o = h ? we(l[f]) : x, c = /* @__PURE__ */ M(o);
            return c;
          }), n.set(f, a));
          var d = g(a);
          if (d === x)
            return !1;
        }
        return h;
      },
      set(l, f, a, h) {
        var d = n.get(f), o = f in l;
        if (r && f === "length")
          for (var c = a; c < /** @type {Source<number>} */
          d.v; c += 1) {
            var w = n.get(c + "");
            w !== void 0 ? O(w, x) : c in l && (w = u(() => /* @__PURE__ */ M(x)), n.set(c + "", w));
          }
        if (d === void 0)
          (!o || be(l, f)?.writable) && (d = u(() => /* @__PURE__ */ M(void 0)), O(d, we(a)), n.set(f, d));
        else {
          o = d.v !== x;
          var y = u(() => we(a));
          O(d, y);
        }
        var k = Reflect.getOwnPropertyDescriptor(l, f);
        if (k?.set && k.set.call(h, a), !o) {
          if (r && typeof f == "string") {
            var ae = (
              /** @type {Source<number>} */
              n.get("length")
            ), m = Number(f);
            Number.isInteger(m) && m >= ae.v && O(ae, m + 1);
          }
          ke(s);
        }
        return !0;
      },
      ownKeys(l) {
        g(s);
        var f = Reflect.ownKeys(l).filter((d) => {
          var o = n.get(d);
          return o === void 0 || o.v !== x;
        });
        for (var [a, h] of n)
          h.v !== x && !(a in l) && f.push(a);
        return f;
      },
      setPrototypeOf() {
        tr();
      }
    }
  );
}
var St, Kt, Zt, Jt;
function mr() {
  if (St === void 0) {
    St = window, Kt = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    Zt = be(t, "firstChild").get, Jt = be(t, "nextSibling").get, yt(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), yt(n) && (n.__t = void 0);
  }
}
function Fe(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  return (
    /** @type {TemplateNode | null} */
    Zt.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  return (
    /** @type {TemplateNode | null} */
    Jt.call(e)
  );
}
function Ue(e, t) {
  return /* @__PURE__ */ Q(e);
}
function Qe(e, t = !1) {
  {
    var n = /* @__PURE__ */ Q(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Ze(n) : n;
  }
}
function Ae(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Ze(r);
  return r;
}
function yr() {
  return !1;
}
function Er(e, t, n, r = !0) {
  r && n();
  for (var s of t)
    e.addEventListener(s, n);
  pt(() => {
    for (var i of t)
      e.removeEventListener(i, n);
  });
}
function _t(e) {
  var t = v, n = _;
  C(null), Y(null);
  try {
    return e();
  } finally {
    C(t), Y(n);
  }
}
function xr(e) {
  _ === null && (v === null && Jn(), Zn()), ue && Kn();
}
function Sr(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Z(e, t, n) {
  var r = _;
  r !== null && (r.f & z) !== 0 && (e |= z);
  var s = {
    ctx: I,
    deps: null,
    nodes: null,
    f: e | F | L,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: r,
    b: r && r.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (n)
    try {
      Pe(s), s.f |= at;
    } catch (l) {
      throw P(s), l;
    }
  else t !== null && fe(s);
  var i = s;
  if (n && i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
  (i.f & xe) === 0 && (i = i.first, (e & W) !== 0 && (e & ie) !== 0 && i !== null && (i.f |= ie)), i !== null && (i.parent = r, r !== null && Sr(i, r), v !== null && (v.f & E) !== 0 && (e & le) === 0)) {
    var u = (
      /** @type {Derived} */
      v
    );
    (u.effects ??= []).push(i);
  }
  return s;
}
function Re() {
  return v !== null && !B;
}
function pt(e) {
  const t = Z(ut, null, !1);
  return T(t, S), t.teardown = e, t;
}
function Qt(e) {
  xr();
  var t = (
    /** @type {Effect} */
    _.f
  ), n = !v && (t & K) !== 0 && (t & at) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      I
    );
    (r.e ??= []).push(e);
  } else
    return Xt(e);
}
function Xt(e) {
  return Z(lt | $n, e, !1);
}
function Tr(e) {
  q.ensure();
  const t = Z(le | xe, e, !0);
  return (n = {}) => new Promise((r) => {
    n.outro ? Ce(t, () => {
      P(t), r(void 0);
    }) : (P(t), r(void 0));
  });
}
function kr(e) {
  return Z(lt, e, !1);
}
function Ar(e) {
  return Z(ot | xe, e, !0);
}
function en(e, t = 0) {
  return Z(ut | t, e, !0);
}
function Ye(e, t = [], n = [], r = []) {
  hr(r, t, n, (s) => {
    Z(ut, () => e(...s.map(g)), !0);
  });
}
function gt(e, t = 0) {
  var n = Z(W | t, e, !0);
  return n;
}
function V(e) {
  return Z(K | xe, e, !0);
}
function tn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = ue, r = v;
    Tt(!0), C(null);
    try {
      t.call(null);
    } finally {
      Tt(n), C(r);
    }
  }
}
function nn(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && _t(() => {
      s.abort(pe);
    });
    var r = n.next;
    (n.f & le) !== 0 ? n.parent = null : P(n, t), n = r;
  }
}
function Cr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & K) === 0 && P(t), t = n;
  }
}
function P(e, t = !0) {
  var n = !1;
  (t || (e.f & Lt) !== 0) && e.nodes !== null && e.nodes.end !== null && (rn(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), nn(e, t && !n), Ve(e, 0), T(e, $);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  tn(e);
  var s = e.parent;
  s !== null && s.first !== null && sn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function rn(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Ze(e);
    e.remove(), e = n;
  }
}
function sn(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Ce(e, t, n = !0) {
  var r = [];
  fn(e, r, !0);
  var s = () => {
    n && P(e), t && t();
  }, i = r.length;
  if (i > 0) {
    var u = () => --i || s();
    for (var l of r)
      l.out(u);
  } else
    s();
}
function fn(e, t, n) {
  if ((e.f & z) === 0) {
    e.f ^= z;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && t.push(l);
    for (var s = e.first; s !== null; ) {
      var i = s.next, u = (s.f & ie) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (s.f & K) !== 0 && (e.f & W) !== 0;
      fn(s, t, u ? n : !1), s = i;
    }
  }
}
function Fr(e) {
  ln(e, !0);
}
function ln(e, t) {
  if ((e.f & z) !== 0) {
    e.f ^= z, (e.f & S) === 0 && (T(e, F), fe(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, s = (n.f & ie) !== 0 || (n.f & K) !== 0;
      ln(n, s ? t : !1), n = r;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const u of i)
        (u.is_global || t) && u.in();
  }
}
function un(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : /* @__PURE__ */ Ze(n);
      t.append(n), n = s;
    }
}
let ne = !1;
function He(e) {
  ne = e;
}
let ue = !1;
function Tt(e) {
  ue = e;
}
let v = null, B = !1;
function C(e) {
  v = e;
}
let _ = null;
function Y(e) {
  _ = e;
}
let G = null;
function an(e) {
  v !== null && (G === null ? G = [e] : G.push(e));
}
let A = null, R = 0, N = null;
function Rr(e) {
  N = e;
}
let on = 1, Oe = 0, re = Oe;
function kt(e) {
  re = e;
}
function cn() {
  return ++on;
}
function Me(e) {
  var t = e.f;
  if ((t & F) !== 0)
    return !0;
  if (t & E && (e.f &= ~se), (t & U) !== 0) {
    var n = e.deps;
    if (n !== null)
      for (var r = n.length, s = 0; s < r; s++) {
        var i = n[s];
        if (Me(
          /** @type {Derived} */
          i
        ) && $t(
          /** @type {Derived} */
          i
        ), i.wv > e.wv)
          return !0;
      }
    (t & L) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    D === null && T(e, S);
  }
  return !1;
}
function dn(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !G?.includes(e))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & E) !== 0 ? dn(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? T(i, F) : (i.f & S) !== 0 && T(i, U), fe(
        /** @type {Effect} */
        i
      ));
    }
}
function hn(e) {
  var t = A, n = R, r = N, s = v, i = G, u = I, l = B, f = re, a = e.f;
  A = /** @type {null | Value[]} */
  null, R = 0, N = null, v = (a & (K | le)) === 0 ? e : null, G = null, ye(e.ctx), B = !1, re = ++Oe, e.ac !== null && (_t(() => {
    e.ac.abort(pe);
  }), e.ac = null);
  try {
    e.f |= tt;
    var h = (
      /** @type {Function} */
      e.fn
    ), d = h(), o = e.deps;
    if (A !== null) {
      var c;
      if (Ve(e, R), o !== null && R > 0)
        for (o.length = R + A.length, c = 0; c < A.length; c++)
          o[R + c] = A[c];
      else
        e.deps = o = A;
      if (Re() && (e.f & L) !== 0)
        for (c = R; c < o.length; c++)
          (o[c].reactions ??= []).push(e);
    } else o !== null && R < o.length && (Ve(e, R), o.length = R);
    if (zt() && N !== null && !B && o !== null && (e.f & (E | U | F)) === 0)
      for (c = 0; c < /** @type {Source[]} */
      N.length; c++)
        dn(
          N[c],
          /** @type {Effect} */
          e
        );
    return s !== null && s !== e && (Oe++, N !== null && (r === null ? r = N : r.push(.../** @type {Source[]} */
    N))), (e.f & X) !== 0 && (e.f ^= X), d;
  } catch (w) {
    return Ut(w);
  } finally {
    e.f ^= tt, A = t, R = n, N = r, v = s, G = i, ye(u), B = l, re = f;
  }
}
function Or(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = qn.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = t.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  n === null && (t.f & E) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (A === null || !A.includes(t)) && (T(t, U), (t.f & L) !== 0 && (t.f ^= L, t.f &= ~se), Vt(
    /** @type {Derived} **/
    t
  ), Ve(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Ve(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Or(e, n[r]);
}
function Pe(e) {
  var t = e.f;
  if ((t & $) === 0) {
    T(e, S);
    var n = _, r = ne;
    _ = e, ne = !0;
    try {
      (t & (W | Vn)) !== 0 ? Cr(e) : nn(e), tn(e);
      var s = hn(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = on;
      var i;
      et && sr && (e.f & F) !== 0 && e.deps;
    } finally {
      ne = r, _ = n;
    }
  }
}
function g(e) {
  var t = e.f, n = (t & E) !== 0;
  if (v !== null && !B) {
    var r = _ !== null && (_.f & $) !== 0;
    if (!r && !G?.includes(e)) {
      var s = v.deps;
      if ((v.f & tt) !== 0)
        e.rv < Oe && (e.rv = Oe, A === null && s !== null && s[R] === e ? R++ : A === null ? A = [e] : A.includes(e) || A.push(e));
      else {
        (v.deps ??= []).push(e);
        var i = e.reactions;
        i === null ? e.reactions = [v] : i.includes(v) || i.push(v);
      }
    }
  }
  if (ue) {
    if (ee.has(e))
      return ee.get(e);
    if (n) {
      var u = (
        /** @type {Derived} */
        e
      ), l = u.v;
      return ((u.f & S) === 0 && u.reactions !== null || _n(u)) && (l = vt(u)), ee.set(u, l), l;
    }
  } else n && (!D?.has(e) || b?.is_fork && !Re()) && (u = /** @type {Derived} */
  e, Me(u) && $t(u), ne && Re() && (u.f & L) === 0 && vn(u));
  if (D?.has(e))
    return D.get(e);
  if ((e.f & X) !== 0)
    throw e.v;
  return e.v;
}
function vn(e) {
  if (e.deps !== null) {
    e.f ^= L;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & E) !== 0 && (t.f & L) === 0 && vn(
        /** @type {Derived} */
        t
      );
  }
}
function _n(e) {
  if (e.v === x) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (ee.has(t) || (t.f & E) !== 0 && _n(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Je(e) {
  var t = B;
  try {
    return B = !0, e();
  } finally {
    B = t;
  }
}
const Pr = -7169;
function T(e, t) {
  e.f = e.f & Pr | t;
}
const pn = /* @__PURE__ */ new Set(), it = /* @__PURE__ */ new Set();
function Nr(e) {
  for (var t = 0; t < e.length; t++)
    pn.add(e[t]);
  for (var n of it)
    n(e);
}
let At = null;
function Le(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, s = e.composedPath?.() || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  At = e;
  var u = 0, l = At === e && e.__root;
  if (l) {
    var f = s.indexOf(l);
    if (f !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var a = s.indexOf(t);
    if (a === -1)
      return;
    f <= a && (u = f);
  }
  if (i = /** @type {Element} */
  s[u] || e.target, i !== t) {
    Dt(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var h = v, d = _;
    C(null), Y(null);
    try {
      for (var o, c = []; i !== null; ) {
        var w = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var y = i["__" + r];
          y != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && y.call(i, e);
        } catch (k) {
          o ? c.push(k) : o = k;
        }
        if (e.cancelBubble || w === t || w === null)
          break;
        i = w;
      }
      if (o) {
        for (let k of c)
          queueMicrotask(() => {
            throw k;
          });
        throw o;
      }
    } finally {
      e.__root = t, delete e.currentTarget, C(h), Y(d);
    }
  }
}
function gn(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function $e(e, t) {
  var n = (
    /** @type {Effect} */
    _
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function wt(e, t) {
  var n = (t & In) !== 0, r = (t & Ln) !== 0, s, i = !e.startsWith("<!>");
  return () => {
    s === void 0 && (s = gn(i ? e : "<!>" + e), n || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ Q(s)));
    var u = (
      /** @type {TemplateNode} */
      r || Kt ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Q(u)
      ), f = (
        /** @type {TemplateNode} */
        u.lastChild
      );
      $e(l, f);
    } else
      $e(u, u);
    return u;
  };
}
function Ct() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = Fe();
  return e.append(t, n), $e(t, n), e;
}
function Se(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const Mr = ["touchstart", "touchmove"];
function Dr(e) {
  return Mr.includes(e);
}
function wn(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = n + "");
}
function Ir(e, t) {
  return Lr(e, t);
}
const ve = /* @__PURE__ */ new Map();
function Lr(e, { target: t, anchor: n, props: r = {}, events: s, context: i, intro: u = !0 }) {
  mr();
  var l = /* @__PURE__ */ new Set(), f = (d) => {
    for (var o = 0; o < d.length; o++) {
      var c = d[o];
      if (!l.has(c)) {
        l.add(c);
        var w = Dr(c);
        t.addEventListener(c, Le, { passive: w });
        var y = ve.get(c);
        y === void 0 ? (document.addEventListener(c, Le, { passive: w }), ve.set(c, 1)) : ve.set(c, y + 1);
      }
    }
  };
  f(Bn(pn)), it.add(f);
  var a = void 0, h = Tr(() => {
    var d = n ?? t.appendChild(Fe());
    return cr(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (o) => {
        if (i) {
          ct({});
          var c = (
            /** @type {ComponentContext} */
            I
          );
          c.c = i;
        }
        s && (r.$$events = s), a = e(o, r) || {}, i && dt();
      }
    ), () => {
      for (var o of l) {
        t.removeEventListener(o, Le);
        var c = (
          /** @type {number} */
          ve.get(o)
        );
        --c === 0 ? (document.removeEventListener(o, Le), ve.delete(o)) : ve.set(o, c);
      }
      it.delete(f), d !== n && d.parentNode?.removeChild(d);
    };
  });
  return jr.set(a, h), a;
}
let jr = /* @__PURE__ */ new WeakMap();
class bn {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #e = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #t = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #r = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #n = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #u = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    this.anchor = t, this.#u = n;
  }
  #s = () => {
    var t = (
      /** @type {Batch} */
      b
    );
    if (this.#e.has(t)) {
      var n = (
        /** @type {Key} */
        this.#e.get(t)
      ), r = this.#t.get(n);
      if (r)
        Fr(r), this.#n.delete(n);
      else {
        var s = this.#r.get(n);
        s && (this.#t.set(n, s.effect), this.#r.delete(n), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), r = s.effect);
      }
      for (const [i, u] of this.#e) {
        if (this.#e.delete(i), i === t)
          break;
        const l = this.#r.get(u);
        l && (P(l.effect), this.#r.delete(u));
      }
      for (const [i, u] of this.#t) {
        if (i === n || this.#n.has(i)) continue;
        const l = () => {
          if (Array.from(this.#e.values()).includes(i)) {
            var a = document.createDocumentFragment();
            un(u, a), a.append(Fe()), this.#r.set(i, { effect: u, fragment: a });
          } else
            P(u);
          this.#n.delete(i), this.#t.delete(i);
        };
        this.#u || !r ? (this.#n.add(i), Ce(u, l, !1)) : l();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #i = (t) => {
    this.#e.delete(t);
    const n = Array.from(this.#e.values());
    for (const [r, s] of this.#r)
      n.includes(r) || (P(s.effect), this.#r.delete(r));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      b
    ), s = yr();
    if (n && !this.#t.has(t) && !this.#r.has(t))
      if (s) {
        var i = document.createDocumentFragment(), u = Fe();
        i.append(u), this.#r.set(t, {
          effect: V(() => n(u)),
          fragment: i
        });
      } else
        this.#t.set(
          t,
          V(() => n(this.anchor))
        );
    if (this.#e.set(r, t), s) {
      for (const [l, f] of this.#t)
        l === t ? r.skipped_effects.delete(f) : r.skipped_effects.add(f);
      for (const [l, f] of this.#r)
        l === t ? r.skipped_effects.delete(f.effect) : r.skipped_effects.add(f.effect);
      r.oncommit(this.#s), r.ondiscard(this.#i);
    } else
      this.#s();
  }
}
function qr(e, t, ...n) {
  var r = new bn(e);
  gt(() => {
    const s = t() ?? null;
    r.ensure(s, s && ((i) => s(i, ...n)));
  }, ie);
}
function Ft(e, t, n = !1) {
  var r = new bn(e), s = n ? ie : 0;
  function i(u, l) {
    r.ensure(u, l);
  }
  gt(() => {
    var u = !1;
    t((l, f = !0) => {
      u = !0, i(f, l);
    }), u || i(!1, null);
  }, s);
}
function Br(e, t, n = !1, r = !1, s = !1) {
  var i = e, u = "";
  Ye(() => {
    var l = (
      /** @type {Effect} */
      _
    );
    if (u !== (u = t() ?? "") && (l.nodes !== null && (rn(
      l.nodes.start,
      /** @type {TemplateNode} */
      l.nodes.end
    ), l.nodes = null), u !== "")) {
      var f = u + "";
      n ? f = `<svg>${f}</svg>` : r && (f = `<math>${f}</math>`);
      var a = gn(f);
      if ((n || r) && (a = /** @type {Element} */
      /* @__PURE__ */ Q(a)), $e(
        /** @type {TemplateNode} */
        /* @__PURE__ */ Q(a),
        /** @type {TemplateNode} */
        a.lastChild
      ), n || r)
        for (; /* @__PURE__ */ Q(a); )
          i.before(
            /** @type {TemplateNode} */
            /* @__PURE__ */ Q(a)
          );
      else
        i.before(a);
    }
  });
}
function zr(e, t) {
  return e == null ? null : String(e);
}
function Xe(e, t, n, r) {
  var s = e.__style;
  if (s !== t) {
    var i = zr(t);
    i == null ? e.removeAttribute("style") : e.style.cssText = i, e.__style = t;
  }
  return r;
}
function Rt(e, t) {
  return e === t || e?.[Te] === t;
}
function Ur(e = {}, t, n, r) {
  return kr(() => {
    var s, i;
    return en(() => {
      s = i, i = [], Je(() => {
        e !== n(...i) && (t(e, ...i), s && Rt(n(...s), e) && t(null, ...s));
      });
    }), () => {
      We(() => {
        i && Rt(n(...i), e) && t(null, ...i);
      });
    };
  }), e;
}
function Ot(e, t) {
  Er(window, ["resize"], () => _t(() => t(window[e])));
}
function mn(e, t, n) {
  if (e == null)
    return t(void 0), me;
  const r = Je(
    () => e.subscribe(
      t,
      // @ts-expect-error
      n
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
const _e = [];
function yn(e, t = me) {
  let n = null;
  const r = /* @__PURE__ */ new Set();
  function s(l) {
    if (qt(e, l) && (e = l, n)) {
      const f = !_e.length;
      for (const a of r)
        a[1](), _e.push(a, e);
      if (f) {
        for (let a = 0; a < _e.length; a += 2)
          _e[a][0](_e[a + 1]);
        _e.length = 0;
      }
    }
  }
  function i(l) {
    s(l(
      /** @type {T} */
      e
    ));
  }
  function u(l, f = me) {
    const a = [l, f];
    return r.add(a), r.size === 1 && (n = t(s, i) || me), l(
      /** @type {T} */
      e
    ), () => {
      r.delete(a), r.size === 0 && n && (n(), n = null);
    };
  }
  return { set: s, update: i, subscribe: u };
}
function Yr(e) {
  let t;
  return mn(e, (n) => t = n)(), t;
}
let je = !1, st = /* @__PURE__ */ Symbol();
function En(e, t, n) {
  const r = n[t] ??= {
    store: null,
    source: /* @__PURE__ */ wr(void 0),
    unsubscribe: me
  };
  if (r.store !== e && !(st in n))
    if (r.unsubscribe(), r.store = e ?? null, e == null)
      r.source.v = void 0, r.unsubscribe = me;
    else {
      var s = !0;
      r.unsubscribe = mn(e, (i) => {
        s ? r.source.v = i : O(r.source, i);
      }), s = !1;
    }
  return e && st in n ? Yr(e) : g(r.source);
}
function xn() {
  const e = {};
  function t() {
    pt(() => {
      for (var n in e)
        e[n].unsubscribe();
      Dt(e, st, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [e, t];
}
function Hr(e) {
  var t = je;
  try {
    return je = !1, [e(), je];
  } finally {
    je = t;
  }
}
function te(e, t, n, r) {
  var s = (n & Mn) !== 0, i = (n & Dn) !== 0, u = (
    /** @type {V} */
    r
  ), l = !0, f = () => (l && (l = !1, u = i ? Je(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), u), a;
  if (s) {
    var h = Te in e || Gn in e;
    a = be(e, t)?.set ?? (h && t in e ? (m) => e[t] = m : void 0);
  }
  var d, o = !1;
  s ? [d, o] = Hr(() => (
    /** @type {V} */
    e[t]
  )) : d = /** @type {V} */
  e[t], d === void 0 && r !== void 0 && (d = f(), a && (Xn(), a(d)));
  var c;
  if (c = () => {
    var m = (
      /** @type {V} */
      e[t]
    );
    return m === void 0 ? f() : (l = !0, m);
  }, (n & Nn) === 0)
    return c;
  if (a) {
    var w = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(m, oe) {
        return arguments.length > 0 ? ((!oe || w || o) && a(oe ? c() : m), m) : c();
      })
    );
  }
  var y = !1, k = ((n & Pn) !== 0 ? Ke : pr)(() => (y = !1, c()));
  s && g(k);
  var ae = (
    /** @type {Effect} */
    _
  );
  return (
    /** @type {() => V} */
    (function(m, oe) {
      if (arguments.length > 0) {
        const ce = oe ? g(k) : s ? we(m) : m;
        return O(k, ce), y = !0, u !== void 0 && (u = ce), m;
      }
      return ue && y || (ae.f & $) !== 0 ? k.v : g(k);
    })
  );
}
const qe = yn(0);
var Vr = /* @__PURE__ */ wt('<div class="flex items-center gap-4 py-4 bg-primary"><button class="px-4 py-2 bg-red-500 text-white rounded">-</button> <span class="text-2xl font-bold"> </span> <button class="px-4 py-2 bg-green-500 text-white rounded">+</button></div>');
function $r(e, t) {
  ct(t, !0);
  const n = () => En(qe, "$sharedCount", r), [r, s] = xn();
  let i = te(t, "initialCount", 3, 0);
  te(t, "opening_times", 19, () => []), Qt(() => {
    qe.set(i());
  });
  function u() {
    qe.update((c) => c + 1);
  }
  function l() {
    qe.update((c) => c - 1);
  }
  var f = Vr(), a = Ue(f);
  a.__click = l;
  var h = Ae(a, 2), d = Ue(h), o = Ae(h, 2);
  o.__click = u, Ye(() => wn(d, n())), Se(e, f), dt(), s();
}
Nr(["click"]);
const Sn = yn(0);
let Pt = !1;
function Gr() {
  if (Pt || typeof window > "u") return;
  Pt = !0;
  let e = !1;
  const t = () => {
    e || (window.requestAnimationFrame(() => {
      Sn.set(window.scrollY), e = !1;
    }), e = !0);
  };
  window.addEventListener("scroll", t);
}
Gr();
var Wr = /* @__PURE__ */ wt('<div class="border-t border-green-500 w-full h-[1px] fixed left-0 z-10"></div> <div class="border-t border-red-500 w-full h-[1px] fixed left-0 z-10"></div> <div class="sticky top-1/2 w-min z-50 bg-zinc-200 p-3 bg-opacity-40 rounded"> </div>', 1), Kr = /* @__PURE__ */ wt('<div class="relative h-screen"><!> <div class="parallax-content svelte-jw0cj5"><img src="https://images.unsplash.com/photo-1765871319901-0aaafe3f1a2a?q=80&amp;w=2940&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sample unsplash" class="svelte-jw0cj5"/></div> <!></div>');
function Zr(e, t) {
  ct(t, !0);
  const n = () => En(Sn, "$scrollY", r), [r, s] = xn();
  let i = te(
    t,
    "debug",
    3,
    !0
    // Show debug lines and progress indicator
  ), u = te(
    t,
    "in_trigger",
    3,
    "80%"
    // Viewport position where animation starts
  ), l = te(
    t,
    "out_trigger",
    3,
    "30px"
    // Viewport position where animation ends
  ), f = te(
    t,
    "parallaxContent",
    3,
    () => {
    }
    // Render snippet function for advanced usage
  ), a = te(
    t,
    "children",
    3,
    ""
    // HTML children from PHP templates
  ), h = /* @__PURE__ */ he(() => typeof i() == "string" ? i() === "true" || i() === "1" || i() === "yes" : i()), d, o = /* @__PURE__ */ M(0), c = /* @__PURE__ */ M(0), w = /* @__PURE__ */ M(0), y = /* @__PURE__ */ M(0), k = /* @__PURE__ */ he(() => {
    let p = u();
    return typeof u() == "string" ? u().includes("px") ? p = parseFloat(u().replace("px", "")) : u().includes("%") && (p = g(y) * parseFloat(u().replace("%", "")) / 100) : p = u() + "px", p;
  }), ae = /* @__PURE__ */ he(() => {
    let p = l();
    return typeof l() == "string" ? l().includes("px") ? p = parseFloat(l().replace("px", "")) : l().includes("%") && (p = g(y) * parseFloat(l().replace("%", "")) / 100) : p = l() + "px", p;
  }), m = /* @__PURE__ */ he(() => g(o) - g(k)), oe = /* @__PURE__ */ he(() => g(o) + g(c) - g(ae)), ce = /* @__PURE__ */ he(() => Math.min(Math.max((n() - g(m)) / (g(oe) - g(m)), 0), 1));
  Qt(() => {
    typeof d < "u" && (O(o, d?.offsetTop, !0), O(c, d?.getBoundingClientRect().height, !0));
  });
  var De = Kr(), bt = Ue(De);
  {
    var Tn = (p) => {
      var J = Wr(), de = Qe(J), mt = Ae(de, 2), Fn = Ae(mt, 2), Rn = Ue(Fn);
      Ye(
        (On) => {
          Xe(de, `top:${u() ?? ""};`), Xe(mt, `top:${l() ?? ""};`), wn(Rn, On);
        },
        [() => parseInt(g(ce) * 100).toFixed()]
      ), Se(p, J);
    };
    Ft(bt, (p) => {
      g(h) && p(Tn);
    });
  }
  var kn = Ae(bt, 4);
  {
    var An = (p) => {
      var J = Ct(), de = Qe(J);
      Br(de, a), Se(p, J);
    }, Cn = (p) => {
      var J = Ct(), de = Qe(J);
      qr(de, f, () => g(ce)), Se(p, J);
    };
    Ft(kn, (p) => {
      a() ? p(An) : p(Cn, !1);
    });
  }
  Ur(De, (p) => d = p, () => d), Ye(() => Xe(De, `--perceptual: ${g(ce) ?? ""};`)), Ot("innerWidth", (p) => O(w, p, !0)), Ot("innerHeight", (p) => O(y, p, !0)), Se(e, De), dt(), s();
}
let Jr = [
  { selector: ".bend-counter", component: $r, children: !0 },
  { selector: ".bend-parallax", component: Zr, children: !1 }
];
const Nt = /* @__PURE__ */ new WeakSet();
function Qr(e) {
  const t = {};
  return Array.from(e.attributes).forEach((n) => {
    if (n.name.startsWith("data-")) {
      const r = n.name.slice(5).replace(/-([a-z])/g, (s, i) => i.toUpperCase());
      try {
        t[r] = JSON.parse(n.value);
      } catch {
        t[r] = n.value;
      }
    }
  }), t;
}
function ft() {
  const e = [];
  return Jr.forEach(({ selector: t, component: n }) => {
    document.querySelectorAll(t).forEach((s) => {
      if (Nt.has(s))
        return;
      const i = Qr(s);
      n.children && s.innerHTML.trim() && (i.children = s.innerHTML, s.innerHTML = "");
      const u = Ir(n, {
        target: s,
        props: i
      });
      e.push(u), Nt.add(s);
    });
  }), e;
}
function Mt() {
  new MutationObserver(() => {
    ft();
  }).observe(document.body, {
    childList: !0,
    subtree: !0
  });
}
typeof window < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  ft(), Mt();
}) : (ft(), Mt()));
export {
  $r as Counter,
  Zr as Parallax,
  ft as mountComponents
};
