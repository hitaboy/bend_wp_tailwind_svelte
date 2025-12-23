typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
const In = 1, Ln = 4, qn = 8, jn = 16, zn = 1, Bn = 2, x = /* @__PURE__ */ Symbol(), tt = !1;
var Un = Array.isArray, Yn = Array.prototype.indexOf, Hn = Array.from, zt = Object.defineProperty, me = Object.getOwnPropertyDescriptor, Vn = Object.prototype, $n = Array.prototype, Gn = Object.getPrototypeOf, Tt = Object.isExtensible;
const ye = () => {
};
function Wn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Bt() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const E = 2, ct = 4, dt = 8, Kn = 1 << 24, W = 16, K = 32, ue = 64, Ge = 128, L = 512, S = 1024, F = 2048, U = 4096, B = 8192, $ = 16384, ht = 32768, se = 65536, At = 1 << 17, Ut = 1 << 18, Se = 1 << 19, Zn = 1 << 20, fe = 32768, nt = 1 << 21, vt = 1 << 22, X = 1 << 23, Ae = /* @__PURE__ */ Symbol("$state"), Jn = /* @__PURE__ */ Symbol("legacy props"), _e = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function Qn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Xn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function er() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function tr(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function nr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function rr(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function ir() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function sr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function fr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function lr() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function ur() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Yt(e) {
  return e === this.v;
}
function Ht(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Vt(e) {
  return !Ht(e, this.v);
}
let ar = !1, I = null;
function Ee(e) {
  I = e;
}
function _t(e, t = !1, n) {
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
function pt(e) {
  var t = (
    /** @type {ComponentContext} */
    I
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      rn(r);
  }
  return t.i = !0, I = t.p, /** @type {T} */
  {};
}
function $t() {
  return !0;
}
let pe = [];
function or() {
  var e = pe;
  pe = [], Wn(e);
}
function We(e) {
  if (pe.length === 0) {
    var t = pe;
    queueMicrotask(() => {
      t === pe && or();
    });
  }
  pe.push(e);
}
function Gt(e) {
  var t = _;
  if (t === null)
    return v.f |= X, e;
  if ((t.f & ht) === 0) {
    if ((t.f & Ge) === 0)
      throw e;
    t.b.error(e);
  } else
    xe(e, t);
}
function xe(e, t) {
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
const qe = /* @__PURE__ */ new Set();
let w = null, D = null, q = [], gt = null, rt = !1;
class j {
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
    q = [], this.apply();
    var n = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: []
    };
    for (const r of t)
      this.#f(r, n);
    this.is_fork || this.#o(), this.is_deferred() ? (this.#l(n.effects), this.#l(n.render_effects)) : (w = null, Ct(n.render_effects), Ct(n.effects), this.#u?.resolve()), D = null;
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
      var i = r.f, s = (i & (K | ue)) !== 0, a = s && (i & S) !== 0, l = a || (i & B) !== 0 || this.skipped_effects.has(r);
      if ((r.f & Ge) !== 0 && r.b?.is_pending() && (n = {
        parent: n,
        effect: r,
        effects: [],
        render_effects: []
      }), !l && r.fn !== null) {
        s ? r.f ^= S : (i & ct) !== 0 ? n.effects.push(r) : De(r) && ((r.f & W) !== 0 && this.#s.add(r), Ne(r));
        var f = r.first;
        if (f !== null) {
          r = f;
          continue;
        }
      }
      var u = r.parent;
      for (r = r.next; r === null && u !== null; )
        u === n.effect && (this.#l(n.effects), this.#l(n.render_effects), n = /** @type {EffectTarget} */
        n.parent), r = u.next, u = u.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #l(t) {
    for (const n of t)
      (n.f & F) !== 0 ? this.#s.add(n) : (n.f & U) !== 0 && this.#i.add(n), this.#a(n.deps), k(n, S);
  }
  /**
   * @param {Value[] | null} deps
   */
  #a(t) {
    if (t !== null)
      for (const n of t)
        (n.f & E) === 0 || (n.f & fe) === 0 || (n.f ^= fe, this.#a(
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
    w = this, this.apply();
  }
  deactivate() {
    w === this && (w = null, D = null);
  }
  flush() {
    if (this.activate(), q.length > 0) {
      if (cr(), w !== null && w !== this)
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
    if (qe.size > 1) {
      this.previous.clear();
      var t = D, n = !0, r = {
        parent: null,
        effect: null,
        effects: [],
        render_effects: []
      };
      for (const s of qe) {
        if (s === this) {
          n = !1;
          continue;
        }
        const a = [];
        for (const [f, u] of this.current) {
          if (s.current.has(f))
            if (n && u !== s.current.get(f))
              s.current.set(f, u);
            else
              continue;
          a.push(f);
        }
        if (a.length === 0)
          continue;
        const l = [...s.current.keys()].filter((f) => !this.current.has(f));
        if (l.length > 0) {
          var i = q;
          q = [];
          const f = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Map();
          for (const d of a)
            Wt(d, l, f, u);
          if (q.length > 0) {
            w = s, s.apply();
            for (const d of q)
              s.#f(d, r);
            s.deactivate();
          }
          q = i;
        }
      }
      w = null, D = t;
    }
    this.committed = !0, qe.delete(this);
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
      this.#i.delete(t), k(t, F), le(t);
    for (const t of this.#i)
      k(t, U), le(t);
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
    return (this.#u ??= Bt()).promise;
  }
  static ensure() {
    if (w === null) {
      const t = w = new j();
      qe.add(w), j.enqueue(() => {
        w === t && t.flush();
      });
    }
    return w;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    We(t);
  }
  apply() {
  }
}
function cr() {
  var e = re;
  rt = !0;
  var t = null;
  try {
    var n = 0;
    for (He(!0); q.length > 0; ) {
      var r = j.ensure();
      if (n++ > 1e3) {
        var i, s;
        dr();
      }
      r.process(q), ee.clear();
    }
  } finally {
    rt = !1, He(e), gt = null;
  }
}
function dr() {
  try {
    nr();
  } catch (e) {
    xe(e, gt);
  }
}
let H = null;
function Ct(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & ($ | B)) === 0 && De(r) && (H = /* @__PURE__ */ new Set(), Ne(r), r.deps === null && r.first === null && r.nodes === null && (r.teardown === null && r.ac === null ? an(r) : r.fn = null), H?.size > 0)) {
        ee.clear();
        for (const i of H) {
          if ((i.f & ($ | B)) !== 0) continue;
          const s = [i];
          let a = i.parent;
          for (; a !== null; )
            H.has(a) && (H.delete(a), s.push(a)), a = a.parent;
          for (let l = s.length - 1; l >= 0; l--) {
            const f = s[l];
            (f.f & ($ | B)) === 0 && Ne(f);
          }
        }
        H.clear();
      }
    }
    H = null;
  }
}
function Wt(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & E) !== 0 ? Wt(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (vt | W)) !== 0 && (s & F) === 0 && Kt(i, t, r) && (k(i, F), le(
        /** @type {Effect} */
        i
      ));
    }
}
function Kt(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (t.includes(i))
        return !0;
      if ((i.f & E) !== 0 && Kt(
        /** @type {Derived} */
        i,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function le(e) {
  for (var t = gt = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (rt && t === _ && (n & W) !== 0 && (n & Ut) === 0)
      return;
    if ((n & (ue | K)) !== 0) {
      if ((n & S) === 0) return;
      t.f ^= S;
    }
  }
  q.push(t);
}
function hr(e) {
  let t = 0, n = Me(0), r;
  return () => {
    Re() && (b(n), sn(() => (t === 0 && (r = Je(() => e(() => Ce(n)))), t += 1, () => {
      We(() => {
        t -= 1, t === 0 && (r?.(), r = void 0, Ce(n));
      });
    })));
  };
}
var vr = se | Se | Ge;
function _r(e, t, n) {
  new pr(e, t, n);
}
class pr {
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
  #w = hr(() => (this.#h = Me(this.#c), () => {
    this.#h = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, n, r) {
    this.#t = t, this.#n = n, this.#u = r, this.parent = /** @type {Effect} */
    _.b, this.#e = !!this.#n.pending, this.#s = yt(() => {
      _.b = this;
      {
        var i = this.#g();
        try {
          this.#i = V(() => r(i));
        } catch (s) {
          this.error(s);
        }
        this.#d > 0 ? this.#p() : this.#e = !1;
      }
      return () => {
        this.#o?.remove();
      };
    }, vr);
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
    t && (this.#f = V(() => t(this.#t)), j.enqueue(() => {
      var n = this.#g();
      this.#i = this.#_(() => (j.ensure(), V(() => this.#u(n)))), this.#d > 0 ? this.#p() : (Fe(
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
    return this.#e && (this.#o = Oe(), this.#t.before(this.#o), t = this.#o), t;
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
    var n = _, r = v, i = I;
    Y(this.#s), C(this.#s), Ee(this.#s.ctx);
    try {
      return t();
    } catch (s) {
      return Gt(s), null;
    } finally {
      Y(n), C(r), Ee(i);
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
    ), dn(this.#i, this.#a)), this.#f === null && (this.#f = V(() => t(this.#t)));
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   */
  #b(t) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#b(t);
      return;
    }
    this.#d += t, this.#d === 0 && (this.#e = !1, this.#f && Fe(this.#f, () => {
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
    this.#b(t), this.#c += t, this.#h && Ue(this.#h, this.#c);
  }
  get_effect_pending() {
    return this.#w(), b(
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
    var i = !1, s = !1;
    const a = () => {
      if (i) {
        ur();
        return;
      }
      i = !0, s && lr(), j.ensure(), this.#c = 0, this.#l !== null && Fe(this.#l, () => {
        this.#l = null;
      }), this.#e = this.has_pending_snippet(), this.#i = this.#_(() => (this.#v = !1, V(() => this.#u(this.#t)))), this.#d > 0 ? this.#p() : this.#e = !1;
    };
    var l = v;
    try {
      C(null), s = !0, n?.(t, a), s = !1;
    } catch (f) {
      xe(f, this.#s && this.#s.parent);
    } finally {
      C(l);
    }
    r && We(() => {
      this.#l = this.#_(() => {
        j.ensure(), this.#v = !0;
        try {
          return V(() => {
            r(
              this.#t,
              () => t,
              () => a
            );
          });
        } catch (f) {
          return xe(
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
function gr(e, t, n, r) {
  const i = Ke;
  if (n.length === 0 && e.length === 0) {
    r(t.map(i));
    return;
  }
  var s = w, a = (
    /** @type {Effect} */
    _
  ), l = br();
  function f() {
    Promise.all(n.map((u) => /* @__PURE__ */ wr(u))).then((u) => {
      l();
      try {
        r([...t.map(i), ...u]);
      } catch (d) {
        (a.f & $) === 0 && xe(d, a);
      }
      s?.deactivate(), Be();
    }).catch((u) => {
      xe(u, a);
    });
  }
  e.length > 0 ? Promise.all(e).then(() => {
    l();
    try {
      return f();
    } finally {
      s?.deactivate(), Be();
    }
  }) : f();
}
function br() {
  var e = _, t = v, n = I, r = w;
  return function(s = !0) {
    Y(e), C(t), Ee(n), s && r?.activate();
  };
}
function Be() {
  Y(null), C(null), Ee(null);
}
// @__NO_SIDE_EFFECTS__
function Ke(e) {
  var t = E | F, n = v !== null && (v.f & E) !== 0 ? (
    /** @type {Derived} */
    v
  ) : null;
  return _ !== null && (_.f |= Se), {
    ctx: I,
    deps: null,
    effects: null,
    equals: Yt,
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
function wr(e, t) {
  let n = (
    /** @type {Effect | null} */
    _
  );
  n === null && Qn();
  var r = (
    /** @type {Boundary} */
    n.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Me(
    /** @type {V} */
    x
  ), a = !v, l = /* @__PURE__ */ new Map();
  return Rr(() => {
    var f = Bt();
    i = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, f.reject).then(() => {
        u === w && u.committed && u.deactivate(), Be();
      });
    } catch (o) {
      f.reject(o), Be();
    }
    var u = (
      /** @type {Batch} */
      w
    );
    if (a) {
      var d = !r.is_pending();
      r.update_pending_count(1), u.increment(d), l.get(u)?.reject(_e), l.delete(u), l.set(u, f);
    }
    const h = (o, c = void 0) => {
      if (u.activate(), c)
        c !== _e && (s.f |= X, Ue(s, c));
      else {
        (s.f & X) !== 0 && (s.f ^= X), Ue(s, o);
        for (const [g, T] of l) {
          if (l.delete(g), g === u) break;
          T.reject(_e);
        }
      }
      a && (r.update_pending_count(-1), u.decrement(d));
    };
    f.promise.then(h, (o) => h(null, o || "unknown"));
  }), mt(() => {
    for (const f of l.values())
      f.reject(_e);
  }), new Promise((f) => {
    function u(d) {
      function h() {
        d === i ? f(s) : u(i);
      }
      d.then(h, h);
    }
    u(i);
  });
}
// @__NO_SIDE_EFFECTS__
function de(e) {
  const t = /* @__PURE__ */ Ke(e);
  return hn(t), t;
}
// @__NO_SIDE_EFFECTS__
function mr(e) {
  const t = /* @__PURE__ */ Ke(e);
  return t.equals = Vt, t;
}
function Zt(e) {
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
function yr(e) {
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
function bt(e) {
  var t, n = _;
  Y(yr(e));
  try {
    e.f &= ~fe, Zt(e), t = gn(e);
  } finally {
    Y(n);
  }
  return t;
}
function Jt(e) {
  var t = bt(e);
  if (e.equals(t) || (w?.is_fork || (e.v = t), e.wv = _n()), !ae)
    if (D !== null)
      (Re() || w?.is_fork) && D.set(e, t);
    else {
      var n = (e.f & L) === 0 ? U : S;
      k(e, n);
    }
}
let it = /* @__PURE__ */ new Set();
const ee = /* @__PURE__ */ new Map();
let Qt = !1;
function Me(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Yt,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function M(e, t) {
  const n = Me(e);
  return hn(n), n;
}
// @__NO_SIDE_EFFECTS__
function Er(e, t = !1, n = !0) {
  const r = Me(e);
  return t || (r.equals = Vt), r;
}
function R(e, t, n = !1) {
  v !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!z || (v.f & At) !== 0) && $t() && (v.f & (E | W | vt | At)) !== 0 && !G?.includes(e) && fr();
  let r = n ? ge(t) : t;
  return Ue(e, r);
}
function Ue(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    ae ? ee.set(e, t) : ee.set(e, n), e.v = t;
    var r = j.ensure();
    r.capture(e, n), (e.f & E) !== 0 && ((e.f & F) !== 0 && bt(
      /** @type {Derived} */
      e
    ), k(e, (e.f & L) !== 0 ? S : U)), e.wv = _n(), Xt(e, F), _ !== null && (_.f & S) !== 0 && (_.f & (K | ue)) === 0 && (N === null ? Mr([e]) : N.push(e)), !r.is_fork && it.size > 0 && !Qt && xr();
  }
  return t;
}
function xr() {
  Qt = !1;
  var e = re;
  He(!0);
  const t = Array.from(it);
  try {
    for (const n of t)
      (n.f & S) !== 0 && k(n, U), De(n) && Ne(n);
  } finally {
    He(e);
  }
  it.clear();
}
function Ce(e) {
  R(e, e.v + 1);
}
function Xt(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, i = 0; i < r; i++) {
      var s = n[i], a = s.f, l = (a & F) === 0;
      if (l && k(s, t), (a & E) !== 0) {
        var f = (
          /** @type {Derived} */
          s
        );
        D?.delete(f), (a & fe) === 0 && (a & L && (s.f |= fe), Xt(f, U));
      } else l && ((a & W) !== 0 && H !== null && H.add(
        /** @type {Effect} */
        s
      ), le(
        /** @type {Effect} */
        s
      ));
    }
}
function ge(e) {
  if (typeof e != "object" || e === null || Ae in e)
    return e;
  const t = Gn(e);
  if (t !== Vn && t !== $n)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Un(e), i = /* @__PURE__ */ M(0), s = ie, a = (l) => {
    if (ie === s)
      return l();
    var f = v, u = ie;
    C(null), Rt(s);
    var d = l();
    return C(f), Rt(u), d;
  };
  return r && n.set("length", /* @__PURE__ */ M(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, f, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && ir();
        var d = n.get(f);
        return d === void 0 ? d = a(() => {
          var h = /* @__PURE__ */ M(u.value);
          return n.set(f, h), h;
        }) : R(d, u.value, !0), !0;
      },
      deleteProperty(l, f) {
        var u = n.get(f);
        if (u === void 0) {
          if (f in l) {
            const d = a(() => /* @__PURE__ */ M(x));
            n.set(f, d), Ce(i);
          }
        } else
          R(u, x), Ce(i);
        return !0;
      },
      get(l, f, u) {
        if (f === Ae)
          return e;
        var d = n.get(f), h = f in l;
        if (d === void 0 && (!h || me(l, f)?.writable) && (d = a(() => {
          var c = ge(h ? l[f] : x), g = /* @__PURE__ */ M(c);
          return g;
        }), n.set(f, d)), d !== void 0) {
          var o = b(d);
          return o === x ? void 0 : o;
        }
        return Reflect.get(l, f, u);
      },
      getOwnPropertyDescriptor(l, f) {
        var u = Reflect.getOwnPropertyDescriptor(l, f);
        if (u && "value" in u) {
          var d = n.get(f);
          d && (u.value = b(d));
        } else if (u === void 0) {
          var h = n.get(f), o = h?.v;
          if (h !== void 0 && o !== x)
            return {
              enumerable: !0,
              configurable: !0,
              value: o,
              writable: !0
            };
        }
        return u;
      },
      has(l, f) {
        if (f === Ae)
          return !0;
        var u = n.get(f), d = u !== void 0 && u.v !== x || Reflect.has(l, f);
        if (u !== void 0 || _ !== null && (!d || me(l, f)?.writable)) {
          u === void 0 && (u = a(() => {
            var o = d ? ge(l[f]) : x, c = /* @__PURE__ */ M(o);
            return c;
          }), n.set(f, u));
          var h = b(u);
          if (h === x)
            return !1;
        }
        return d;
      },
      set(l, f, u, d) {
        var h = n.get(f), o = f in l;
        if (r && f === "length")
          for (var c = u; c < /** @type {Source<number>} */
          h.v; c += 1) {
            var g = n.get(c + "");
            g !== void 0 ? R(g, x) : c in l && (g = a(() => /* @__PURE__ */ M(x)), n.set(c + "", g));
          }
        if (h === void 0)
          (!o || me(l, f)?.writable) && (h = a(() => /* @__PURE__ */ M(void 0)), R(h, ge(u)), n.set(f, h));
        else {
          o = h.v !== x;
          var T = a(() => ge(u));
          R(h, T);
        }
        var m = Reflect.getOwnPropertyDescriptor(l, f);
        if (m?.set && m.set.call(d, u), !o) {
          if (r && typeof f == "string") {
            var oe = (
              /** @type {Source<number>} */
              n.get("length")
            ), y = Number(f);
            Number.isInteger(y) && y >= oe.v && R(oe, y + 1);
          }
          Ce(i);
        }
        return !0;
      },
      ownKeys(l) {
        b(i);
        var f = Reflect.ownKeys(l).filter((h) => {
          var o = n.get(h);
          return o === void 0 || o.v !== x;
        });
        for (var [u, d] of n)
          d.v !== x && !(u in l) && f.push(u);
        return f;
      },
      setPrototypeOf() {
        sr();
      }
    }
  );
}
var Ft, en, tn, nn;
function Sr() {
  if (Ft === void 0) {
    Ft = window, en = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    tn = me(t, "firstChild").get, nn = me(t, "nextSibling").get, Tt(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Tt(n) && (n.__t = void 0);
  }
}
function Oe(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Q(e) {
  return (
    /** @type {TemplateNode | null} */
    tn.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  return (
    /** @type {TemplateNode | null} */
    nn.call(e)
  );
}
function be(e, t) {
  return /* @__PURE__ */ Q(e);
}
function Xe(e, t = !1) {
  {
    var n = /* @__PURE__ */ Q(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Ze(n) : n;
  }
}
function we(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Ze(r);
  return r;
}
function kr() {
  return !1;
}
function Tr(e, t, n, r = !0) {
  r && n();
  for (var i of t)
    e.addEventListener(i, n);
  mt(() => {
    for (var s of t)
      e.removeEventListener(s, n);
  });
}
function wt(e) {
  var t = v, n = _;
  C(null), Y(null);
  try {
    return e();
  } finally {
    C(t), Y(n);
  }
}
function Ar(e) {
  _ === null && (v === null && tr(), er()), ae && Xn();
}
function Cr(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Z(e, t, n) {
  var r = _;
  r !== null && (r.f & B) !== 0 && (e |= B);
  var i = {
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
      Ne(i), i.f |= ht;
    } catch (l) {
      throw P(i), l;
    }
  else t !== null && le(i);
  var s = i;
  if (n && s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
  (s.f & Se) === 0 && (s = s.first, (e & W) !== 0 && (e & se) !== 0 && s !== null && (s.f |= se)), s !== null && (s.parent = r, r !== null && Cr(s, r), v !== null && (v.f & E) !== 0 && (e & ue) === 0)) {
    var a = (
      /** @type {Derived} */
      v
    );
    (a.effects ??= []).push(s);
  }
  return i;
}
function Re() {
  return v !== null && !z;
}
function mt(e) {
  const t = Z(dt, null, !1);
  return k(t, S), t.teardown = e, t;
}
function st(e) {
  Ar();
  var t = (
    /** @type {Effect} */
    _.f
  ), n = !v && (t & K) !== 0 && (t & ht) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      I
    );
    (r.e ??= []).push(e);
  } else
    return rn(e);
}
function rn(e) {
  return Z(ct | Zn, e, !1);
}
function Fr(e) {
  j.ensure();
  const t = Z(ue | Se, e, !0);
  return (n = {}) => new Promise((r) => {
    n.outro ? Fe(t, () => {
      P(t), r(void 0);
    }) : (P(t), r(void 0));
  });
}
function Or(e) {
  return Z(ct, e, !1);
}
function Rr(e) {
  return Z(vt | Se, e, !0);
}
function sn(e, t = 0) {
  return Z(dt | t, e, !0);
}
function Ye(e, t = [], n = [], r = []) {
  gr(r, t, n, (i) => {
    Z(dt, () => e(...i.map(b)), !0);
  });
}
function yt(e, t = 0) {
  var n = Z(W | t, e, !0);
  return n;
}
function V(e) {
  return Z(K | Se, e, !0);
}
function fn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = ae, r = v;
    Ot(!0), C(null);
    try {
      t.call(null);
    } finally {
      Ot(n), C(r);
    }
  }
}
function ln(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && wt(() => {
      i.abort(_e);
    });
    var r = n.next;
    (n.f & ue) !== 0 ? n.parent = null : P(n, t), n = r;
  }
}
function Pr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & K) === 0 && P(t), t = n;
  }
}
function P(e, t = !0) {
  var n = !1;
  (t || (e.f & Ut) !== 0) && e.nodes !== null && e.nodes.end !== null && (un(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), ln(e, t && !n), Ve(e, 0), k(e, $);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  fn(e);
  var i = e.parent;
  i !== null && i.first !== null && an(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function un(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Ze(e);
    e.remove(), e = n;
  }
}
function an(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Fe(e, t, n = !0) {
  var r = [];
  on(e, r, !0);
  var i = () => {
    n && P(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var a = () => --s || i();
    for (var l of r)
      l.out(a);
  } else
    i();
}
function on(e, t, n) {
  if ((e.f & B) === 0) {
    e.f ^= B;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && t.push(l);
    for (var i = e.first; i !== null; ) {
      var s = i.next, a = (i.f & se) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & K) !== 0 && (e.f & W) !== 0;
      on(i, t, a ? n : !1), i = s;
    }
  }
}
function Nr(e) {
  cn(e, !0);
}
function cn(e, t) {
  if ((e.f & B) !== 0) {
    e.f ^= B, (e.f & S) === 0 && (k(e, F), le(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & se) !== 0 || (n.f & K) !== 0;
      cn(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const a of s)
        (a.is_global || t) && a.in();
  }
}
function dn(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Ze(n);
      t.append(n), n = i;
    }
}
let re = !1;
function He(e) {
  re = e;
}
let ae = !1;
function Ot(e) {
  ae = e;
}
let v = null, z = !1;
function C(e) {
  v = e;
}
let _ = null;
function Y(e) {
  _ = e;
}
let G = null;
function hn(e) {
  v !== null && (G === null ? G = [e] : G.push(e));
}
let A = null, O = 0, N = null;
function Mr(e) {
  N = e;
}
let vn = 1, Pe = 0, ie = Pe;
function Rt(e) {
  ie = e;
}
function _n() {
  return ++vn;
}
function De(e) {
  var t = e.f;
  if ((t & F) !== 0)
    return !0;
  if (t & E && (e.f &= ~fe), (t & U) !== 0) {
    var n = e.deps;
    if (n !== null)
      for (var r = n.length, i = 0; i < r; i++) {
        var s = n[i];
        if (De(
          /** @type {Derived} */
          s
        ) && Jt(
          /** @type {Derived} */
          s
        ), s.wv > e.wv)
          return !0;
      }
    (t & L) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    D === null && k(e, S);
  }
  return !1;
}
function pn(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !G?.includes(e))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & E) !== 0 ? pn(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? k(s, F) : (s.f & S) !== 0 && k(s, U), le(
        /** @type {Effect} */
        s
      ));
    }
}
function gn(e) {
  var t = A, n = O, r = N, i = v, s = G, a = I, l = z, f = ie, u = e.f;
  A = /** @type {null | Value[]} */
  null, O = 0, N = null, v = (u & (K | ue)) === 0 ? e : null, G = null, Ee(e.ctx), z = !1, ie = ++Pe, e.ac !== null && (wt(() => {
    e.ac.abort(_e);
  }), e.ac = null);
  try {
    e.f |= nt;
    var d = (
      /** @type {Function} */
      e.fn
    ), h = d(), o = e.deps;
    if (A !== null) {
      var c;
      if (Ve(e, O), o !== null && O > 0)
        for (o.length = O + A.length, c = 0; c < A.length; c++)
          o[O + c] = A[c];
      else
        e.deps = o = A;
      if (Re() && (e.f & L) !== 0)
        for (c = O; c < o.length; c++)
          (o[c].reactions ??= []).push(e);
    } else o !== null && O < o.length && (Ve(e, O), o.length = O);
    if ($t() && N !== null && !z && o !== null && (e.f & (E | U | F)) === 0)
      for (c = 0; c < /** @type {Source[]} */
      N.length; c++)
        pn(
          N[c],
          /** @type {Effect} */
          e
        );
    return i !== null && i !== e && (Pe++, N !== null && (r === null ? r = N : r.push(.../** @type {Source[]} */
    N))), (e.f & X) !== 0 && (e.f ^= X), h;
  } catch (g) {
    return Gt(g);
  } finally {
    e.f ^= nt, A = t, O = n, N = r, v = i, G = s, Ee(a), z = l, ie = f;
  }
}
function Dr(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Yn.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  n === null && (t.f & E) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (A === null || !A.includes(t)) && (k(t, U), (t.f & L) !== 0 && (t.f ^= L, t.f &= ~fe), Zt(
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
      Dr(e, n[r]);
}
function Ne(e) {
  var t = e.f;
  if ((t & $) === 0) {
    k(e, S);
    var n = _, r = re;
    _ = e, re = !0;
    try {
      (t & (W | Kn)) !== 0 ? Pr(e) : ln(e), fn(e);
      var i = gn(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = vn;
      var s;
      tt && ar && (e.f & F) !== 0 && e.deps;
    } finally {
      re = r, _ = n;
    }
  }
}
function b(e) {
  var t = e.f, n = (t & E) !== 0;
  if (v !== null && !z) {
    var r = _ !== null && (_.f & $) !== 0;
    if (!r && !G?.includes(e)) {
      var i = v.deps;
      if ((v.f & nt) !== 0)
        e.rv < Pe && (e.rv = Pe, A === null && i !== null && i[O] === e ? O++ : A === null ? A = [e] : A.includes(e) || A.push(e));
      else {
        (v.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [v] : s.includes(v) || s.push(v);
      }
    }
  }
  if (ae) {
    if (ee.has(e))
      return ee.get(e);
    if (n) {
      var a = (
        /** @type {Derived} */
        e
      ), l = a.v;
      return ((a.f & S) === 0 && a.reactions !== null || wn(a)) && (l = bt(a)), ee.set(a, l), l;
    }
  } else n && (!D?.has(e) || w?.is_fork && !Re()) && (a = /** @type {Derived} */
  e, De(a) && Jt(a), re && Re() && (a.f & L) === 0 && bn(a));
  if (D?.has(e))
    return D.get(e);
  if ((e.f & X) !== 0)
    throw e.v;
  return e.v;
}
function bn(e) {
  if (e.deps !== null) {
    e.f ^= L;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & E) !== 0 && (t.f & L) === 0 && bn(
        /** @type {Derived} */
        t
      );
  }
}
function wn(e) {
  if (e.v === x) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (ee.has(t) || (t.f & E) !== 0 && wn(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Je(e) {
  var t = z;
  try {
    return z = !0, e();
  } finally {
    z = t;
  }
}
const Ir = -7169;
function k(e, t) {
  e.f = e.f & Ir | t;
}
const mn = /* @__PURE__ */ new Set(), ft = /* @__PURE__ */ new Set();
function Lr(e) {
  for (var t = 0; t < e.length; t++)
    mn.add(e[t]);
  for (var n of ft)
    n(e);
}
let Pt = null;
function je(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = e.composedPath?.() || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Pt = e;
  var a = 0, l = Pt === e && e.__root;
  if (l) {
    var f = i.indexOf(l);
    if (f !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var u = i.indexOf(t);
    if (u === -1)
      return;
    f <= u && (a = f);
  }
  if (s = /** @type {Element} */
  i[a] || e.target, s !== t) {
    zt(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var d = v, h = _;
    C(null), Y(null);
    try {
      for (var o, c = []; s !== null; ) {
        var g = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var T = s["__" + r];
          T != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && T.call(s, e);
        } catch (m) {
          o ? c.push(m) : o = m;
        }
        if (e.cancelBubble || g === t || g === null)
          break;
        s = g;
      }
      if (o) {
        for (let m of c)
          queueMicrotask(() => {
            throw m;
          });
        throw o;
      }
    } finally {
      e.__root = t, delete e.currentTarget, C(d), Y(h);
    }
  }
}
function yn(e) {
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
function Et(e, t) {
  var n = (t & zn) !== 0, r = (t & Bn) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = yn(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ Q(i)));
    var a = (
      /** @type {TemplateNode} */
      r || en ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Q(a)
      ), f = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      $e(l, f);
    } else
      $e(a, a);
    return a;
  };
}
function Nt() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = Oe();
  return e.append(t, n), $e(t, n), e;
}
function ke(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const qr = ["touchstart", "touchmove"];
function jr(e) {
  return qr.includes(e);
}
function lt(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = n + "");
}
function zr(e, t) {
  return Br(e, t);
}
const he = /* @__PURE__ */ new Map();
function Br(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: a = !0 }) {
  Sr();
  var l = /* @__PURE__ */ new Set(), f = (h) => {
    for (var o = 0; o < h.length; o++) {
      var c = h[o];
      if (!l.has(c)) {
        l.add(c);
        var g = jr(c);
        t.addEventListener(c, je, { passive: g });
        var T = he.get(c);
        T === void 0 ? (document.addEventListener(c, je, { passive: g }), he.set(c, 1)) : he.set(c, T + 1);
      }
    }
  };
  f(Hn(mn)), ft.add(f);
  var u = void 0, d = Fr(() => {
    var h = n ?? t.appendChild(Oe());
    return _r(
      /** @type {TemplateNode} */
      h,
      {
        pending: () => {
        }
      },
      (o) => {
        if (s) {
          _t({});
          var c = (
            /** @type {ComponentContext} */
            I
          );
          c.c = s;
        }
        i && (r.$$events = i), u = e(o, r) || {}, s && pt();
      }
    ), () => {
      for (var o of l) {
        t.removeEventListener(o, je);
        var c = (
          /** @type {number} */
          he.get(o)
        );
        --c === 0 ? (document.removeEventListener(o, je), he.delete(o)) : he.set(o, c);
      }
      ft.delete(f), h !== n && h.parentNode?.removeChild(h);
    };
  });
  return Ur.set(u, d), u;
}
let Ur = /* @__PURE__ */ new WeakMap();
class En {
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
      w
    );
    if (this.#e.has(t)) {
      var n = (
        /** @type {Key} */
        this.#e.get(t)
      ), r = this.#t.get(n);
      if (r)
        Nr(r), this.#n.delete(n);
      else {
        var i = this.#r.get(n);
        i && (this.#t.set(n, i.effect), this.#r.delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
      }
      for (const [s, a] of this.#e) {
        if (this.#e.delete(s), s === t)
          break;
        const l = this.#r.get(a);
        l && (P(l.effect), this.#r.delete(a));
      }
      for (const [s, a] of this.#t) {
        if (s === n || this.#n.has(s)) continue;
        const l = () => {
          if (Array.from(this.#e.values()).includes(s)) {
            var u = document.createDocumentFragment();
            dn(a, u), u.append(Oe()), this.#r.set(s, { effect: a, fragment: u });
          } else
            P(a);
          this.#n.delete(s), this.#t.delete(s);
        };
        this.#u || !r ? (this.#n.add(s), Fe(a, l, !1)) : l();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #i = (t) => {
    this.#e.delete(t);
    const n = Array.from(this.#e.values());
    for (const [r, i] of this.#r)
      n.includes(r) || (P(i.effect), this.#r.delete(r));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      w
    ), i = kr();
    if (n && !this.#t.has(t) && !this.#r.has(t))
      if (i) {
        var s = document.createDocumentFragment(), a = Oe();
        s.append(a), this.#r.set(t, {
          effect: V(() => n(a)),
          fragment: s
        });
      } else
        this.#t.set(
          t,
          V(() => n(this.anchor))
        );
    if (this.#e.set(r, t), i) {
      for (const [l, f] of this.#t)
        l === t ? r.skipped_effects.delete(f) : r.skipped_effects.add(f);
      for (const [l, f] of this.#r)
        l === t ? r.skipped_effects.delete(f.effect) : r.skipped_effects.add(f.effect);
      r.oncommit(this.#s), r.ondiscard(this.#i);
    } else
      this.#s();
  }
}
function Yr(e, t, ...n) {
  var r = new En(e);
  yt(() => {
    const i = t() ?? null;
    r.ensure(i, i && ((s) => i(s, ...n)));
  }, se);
}
function Mt(e, t, n = !1) {
  var r = new En(e), i = n ? se : 0;
  function s(a, l) {
    r.ensure(a, l);
  }
  yt(() => {
    var a = !1;
    t((l, f = !0) => {
      a = !0, s(f, l);
    }), a || s(!1, null);
  }, i);
}
function Hr(e, t, n = !1, r = !1, i = !1) {
  var s = e, a = "";
  Ye(() => {
    var l = (
      /** @type {Effect} */
      _
    );
    if (a !== (a = t() ?? "") && (l.nodes !== null && (un(
      l.nodes.start,
      /** @type {TemplateNode} */
      l.nodes.end
    ), l.nodes = null), a !== "")) {
      var f = a + "";
      n ? f = `<svg>${f}</svg>` : r && (f = `<math>${f}</math>`);
      var u = yn(f);
      if ((n || r) && (u = /** @type {Element} */
      /* @__PURE__ */ Q(u)), $e(
        /** @type {TemplateNode} */
        /* @__PURE__ */ Q(u),
        /** @type {TemplateNode} */
        u.lastChild
      ), n || r)
        for (; /* @__PURE__ */ Q(u); )
          s.before(
            /** @type {TemplateNode} */
            /* @__PURE__ */ Q(u)
          );
      else
        s.before(u);
    }
  });
}
function Vr(e, t) {
  return e == null ? null : String(e);
}
function et(e, t, n, r) {
  var i = e.__style;
  if (i !== t) {
    var s = Vr(t);
    s == null ? e.removeAttribute("style") : e.style.cssText = s, e.__style = t;
  }
  return r;
}
function Dt(e, t) {
  return e === t || e?.[Ae] === t;
}
function $r(e = {}, t, n, r) {
  return Or(() => {
    var i, s;
    return sn(() => {
      i = s, s = [], Je(() => {
        e !== n(...s) && (t(e, ...s), i && Dt(n(...i), e) && t(null, ...i));
      });
    }), () => {
      We(() => {
        s && Dt(n(...s), e) && t(null, ...s);
      });
    };
  }), e;
}
function It(e, t) {
  Tr(window, ["resize"], () => wt(() => t(window[e])));
}
function xn(e, t, n) {
  if (e == null)
    return t(void 0), ye;
  const r = Je(
    () => e.subscribe(
      t,
      // @ts-expect-error
      n
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
const ve = [];
function Sn(e, t = ye) {
  let n = null;
  const r = /* @__PURE__ */ new Set();
  function i(l) {
    if (Ht(e, l) && (e = l, n)) {
      const f = !ve.length;
      for (const u of r)
        u[1](), ve.push(u, e);
      if (f) {
        for (let u = 0; u < ve.length; u += 2)
          ve[u][0](ve[u + 1]);
        ve.length = 0;
      }
    }
  }
  function s(l) {
    i(l(
      /** @type {T} */
      e
    ));
  }
  function a(l, f = ye) {
    const u = [l, f];
    return r.add(u), r.size === 1 && (n = t(i, s) || ye), l(
      /** @type {T} */
      e
    ), () => {
      r.delete(u), r.size === 0 && n && (n(), n = null);
    };
  }
  return { set: i, update: s, subscribe: a };
}
function Gr(e) {
  let t;
  return xn(e, (n) => t = n)(), t;
}
let ze = !1, ut = /* @__PURE__ */ Symbol();
function at(e, t, n) {
  const r = n[t] ??= {
    store: null,
    source: /* @__PURE__ */ Er(void 0),
    unsubscribe: ye
  };
  if (r.store !== e && !(ut in n))
    if (r.unsubscribe(), r.store = e ?? null, e == null)
      r.source.v = void 0, r.unsubscribe = ye;
    else {
      var i = !0;
      r.unsubscribe = xn(e, (s) => {
        i ? r.source.v = s : R(r.source, s);
      }), i = !1;
    }
  return e && ut in n ? Gr(e) : b(r.source);
}
function kn() {
  const e = {};
  function t() {
    mt(() => {
      for (var n in e)
        e[n].unsubscribe();
      zt(e, ut, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [e, t];
}
function Wr(e) {
  var t = ze;
  try {
    return ze = !1, [e(), ze];
  } finally {
    ze = t;
  }
}
function ne(e, t, n, r) {
  var i = (n & qn) !== 0, s = (n & jn) !== 0, a = (
    /** @type {V} */
    r
  ), l = !0, f = () => (l && (l = !1, a = s ? Je(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), a), u;
  if (i) {
    var d = Ae in e || Jn in e;
    u = me(e, t)?.set ?? (d && t in e ? (y) => e[t] = y : void 0);
  }
  var h, o = !1;
  i ? [h, o] = Wr(() => (
    /** @type {V} */
    e[t]
  )) : h = /** @type {V} */
  e[t], h === void 0 && r !== void 0 && (h = f(), u && (rr(), u(h)));
  var c;
  if (c = () => {
    var y = (
      /** @type {V} */
      e[t]
    );
    return y === void 0 ? f() : (l = !0, y);
  }, (n & Ln) === 0)
    return c;
  if (u) {
    var g = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(y, te) {
        return arguments.length > 0 ? ((!te || g || o) && u(te ? c() : y), y) : c();
      })
    );
  }
  var T = !1, m = ((n & In) !== 0 ? Ke : mr)(() => (T = !1, c()));
  i && b(m);
  var oe = (
    /** @type {Effect} */
    _
  );
  return (
    /** @type {() => V} */
    (function(y, te) {
      if (arguments.length > 0) {
        const Ie = te ? b(m) : i ? ge(y) : y;
        return R(m, Ie), T = !0, a !== void 0 && (a = Ie), y;
      }
      return ae && T || (oe.f & $) !== 0 ? m.v : b(m);
    })
  );
}
const Te = Sn(0);
var Kr = /* @__PURE__ */ Et('<div class="flex items-center gap-4 p-4 bg-blue-500"><button class="px-4 py-2 bg-red-500 text-white rounded">-</button> <span class="text-2xl font-bold"> </span> <button class="px-4 py-2 bg-green-500 text-white rounded">+</button></div>');
function Zr(e, t) {
  _t(t, !0);
  const n = () => at(Te, "$sharedCount", r), [r, i] = kn();
  let s = ne(t, "initialCount", 3, 0), a = ne(t, "opening_times", 19, () => []);
  st(() => {
    console.log("Opening times:", a());
  }), st(() => {
    Te.set(s());
  });
  function l() {
    Te.update((g) => g + 1);
  }
  function f() {
    Te.update((g) => g - 1);
  }
  var u = Kr(), d = be(u);
  d.__click = f;
  var h = we(d, 2), o = be(h), c = we(h, 2);
  c.__click = l, Ye(() => lt(o, n())), ke(e, u), pt(), i();
}
Lr(["click"]);
const Tn = Sn(0);
let Lt = !1;
function Jr() {
  if (Lt || typeof window > "u") return;
  Lt = !0;
  let e = !1;
  const t = () => {
    e || (window.requestAnimationFrame(() => {
      Tn.set(window.scrollY), e = !1;
    }), e = !0);
  };
  window.addEventListener("scroll", t);
}
Jr();
var Qr = /* @__PURE__ */ Et('<div class="border-t border-green-500 w-full h-[1px] fixed left-0 z-10"></div> <div class="border-t border-red-500 w-full h-[1px] fixed left-0 z-10"></div> <div class="sticky top-1/2 w-min z-50 bg-zinc-200 p-3 bg-opacity-40 rounded"> </div>', 1), Xr = /* @__PURE__ */ Et('<div class="relative h-screen bg-orange-500 border-2 border-zinc-800"><!> <div class="parallax-content svelte-16cdfwk"><div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50"> </div> <img src="https://images.unsplash.com/photo-1765871319901-0aaafe3f1a2a?q=80&amp;w=2940&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sample unsplash" class="svelte-16cdfwk"/></div> <!></div>');
function ei(e, t) {
  _t(t, !0);
  const n = () => at(Tn, "$scrollY", i), r = () => at(Te, "$sharedCount", i), [i, s] = kn();
  let a = ne(
    t,
    "debug",
    3,
    !0
    // Show debug lines and progress indicator
  ), l = ne(
    t,
    "in_trigger",
    3,
    "80%"
    // Viewport position where animation starts
  ), f = ne(
    t,
    "out_trigger",
    3,
    "30px"
    // Viewport position where animation ends
  ), u = ne(
    t,
    "parallaxContent",
    3,
    () => {
    }
    // Render snippet function for advanced usage
  ), d = ne(
    t,
    "children",
    3,
    ""
    // HTML children from PHP templates
  ), h = /* @__PURE__ */ de(() => typeof a() == "string" ? a() === "true" || a() === "1" || a() === "yes" : a()), o, c = /* @__PURE__ */ M(0), g = /* @__PURE__ */ M(0), T = /* @__PURE__ */ M(0), m = /* @__PURE__ */ M(0), oe = /* @__PURE__ */ de(() => {
    let p = l();
    return typeof l() == "string" ? l().includes("px") ? p = parseFloat(l().replace("px", "")) : l().includes("%") && (p = b(m) * parseFloat(l().replace("%", "")) / 100, console.log(p)) : p = l() + "px", p;
  }), y = /* @__PURE__ */ de(() => {
    let p = f();
    return typeof f() == "string" ? f().includes("px") ? p = parseFloat(f().replace("px", "")) : f().includes("%") && (p = b(m) * parseFloat(f().replace("%", "")) / 100, console.log(p)) : p = f() + "px", p;
  }), te = /* @__PURE__ */ de(() => b(c) - b(oe)), Ie = /* @__PURE__ */ de(() => b(c) + b(g) - b(y)), Qe = /* @__PURE__ */ de(() => Math.min(Math.max((n() - b(te)) / (b(Ie) - b(te)), 0), 1));
  st(() => {
    typeof o < "u" && (R(c, o?.offsetTop, !0), R(g, o?.getBoundingClientRect().height, !0));
  });
  var Le = Xr(), xt = be(Le);
  {
    var An = (p) => {
      var J = Qr(), ce = Xe(J), kt = we(ce, 2), Nn = we(kt, 2), Mn = be(Nn);
      Ye(
        (Dn) => {
          et(ce, `top:${l() ?? ""};`), et(kt, `top:${f() ?? ""};`), lt(Mn, Dn);
        },
        [() => parseInt(b(Qe) * 100).toFixed()]
      ), ke(p, J);
    };
    Mt(xt, (p) => {
      b(h) && p(An);
    });
  }
  var St = we(xt, 2), Cn = be(St), Fn = be(Cn), On = we(St, 2);
  {
    var Rn = (p) => {
      var J = Nt(), ce = Xe(J);
      Hr(ce, d), ke(p, J);
    }, Pn = (p) => {
      var J = Nt(), ce = Xe(J);
      Yr(ce, u, () => b(Qe)), ke(p, J);
    };
    Mt(On, (p) => {
      d() ? p(Rn) : p(Pn, !1);
    });
  }
  $r(Le, (p) => o = p, () => o), Ye(() => {
    et(Le, `--perceptual: ${b(Qe) ?? ""};`), lt(Fn, r());
  }), It("innerWidth", (p) => R(T, p, !0)), It("innerHeight", (p) => R(m, p, !0)), ke(e, Le), pt(), s();
}
let ti = [
  { selector: ".bend-counter", component: Zr, children: !0 },
  { selector: ".bend-parallax", component: ei, children: !1 }
];
const qt = /* @__PURE__ */ new WeakSet();
function ni(e) {
  const t = {};
  return Array.from(e.attributes).forEach((n) => {
    if (n.name.startsWith("data-")) {
      const r = n.name.slice(5).replace(/-([a-z])/g, (i, s) => s.toUpperCase());
      try {
        t[r] = JSON.parse(n.value);
      } catch {
        t[r] = n.value;
      }
    }
  }), t;
}
function ot() {
  const e = [];
  return ti.forEach(({ selector: t, component: n }) => {
    document.querySelectorAll(t).forEach((i) => {
      if (qt.has(i))
        return;
      const s = ni(i);
      n.children && i.innerHTML.trim() && (s.children = i.innerHTML, i.innerHTML = "");
      const a = zr(n, {
        target: i,
        props: s
      });
      e.push(a), qt.add(i);
    });
  }), e;
}
function jt() {
  new MutationObserver(() => {
    ot();
  }).observe(document.body, {
    childList: !0,
    subtree: !0
  });
}
typeof window < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  ot(), jt();
}) : (ot(), jt()));
export {
  Zr as Counter,
  ei as Parallax,
  ot as mountComponents
};
