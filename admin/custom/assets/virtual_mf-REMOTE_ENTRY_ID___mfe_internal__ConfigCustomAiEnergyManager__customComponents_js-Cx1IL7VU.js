import { t as e } from "./preload-helper-D9f-kLWf.js";
import { t } from "./dist-BJHIkAFo.js";
typeof __VUE_HMR_RUNTIME__ > `u` &&
  (globalThis.__VUE_HMR_RUNTIME__ = {
    createRecord() {},
    rerender() {},
    reload() {},
  });
var n = `__mf_init__virtual:mf:__mfe_internal__ConfigCustomAiEnergyManager__mf_v__runtimeInit__mf_v__.js__`,
  r = globalThis[n];
if (!r) {
  let e,
    t,
    i = new Promise((n, r) => {
      ((e = n), (t = r));
    });
  ((r = globalThis[n] = { initPromise: i, initResolve: e, initReject: t }),
    typeof window > `u` &&
      e({
        loadRemote: function () {
          return Promise.resolve(void 0);
        },
        loadShare: function () {
          return Promise.resolve(void 0);
        },
      }));
}
var i = r.initResolve,
  a = `__mf_module_cache__`;
((globalThis[a] ||= { share: {}, remote: {} }),
  (globalThis[a].share ||= {}),
  (globalThis[a].remote ||= {}));
var o = globalThis[a],
  s = {},
  c = `default`,
  l = `__mfe_internal__ConfigCustomAiEnergyManager`,
  u,
  d,
  f = !1,
  p = (e) => new Promise((t) => setTimeout(t, e));
async function m(e) {
  for (let t = 0; ; t++)
    try {
      return await e();
    } catch (e) {
      if (!(typeof f == `function` && f(e)) || t >= 19) throw e;
      await p(250);
    }
}
async function h() {
  return (
    (u ||= m(() =>
      e(
        () =>
          import(
            `./_virtual_mf-localSharedImportMap___mfe_internal__ConfigCustomAiEnergyManager-rPEAYWJQ.js`
          ),
        [],
        import.meta.url,
      ),
    ).catch((e) => {
      throw ((u = void 0), e);
    })),
    u
  );
}
async function g() {
  return (
    (d ||= m(() =>
      e(() => import(`./virtualExposes-DkcK5u--.js`), [], import.meta.url),
    )
      .then((e) => e.default ?? e)
      .catch((e) => {
        throw ((d = void 0), e);
      })),
    d
  );
}
async function _(n = {}, r = []) {
  let { usedShared: a, usedRemotes: u } = await h();
  if (o.share.react === void 0) {
    let t = await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_emotion_mf_1_react__loadShare__.mjs-Z9kjHTfK.js`
          ).then((e) => (e.V(), e.B)),
        [],
        import.meta.url,
      ),
      n = ((e) => {
        let t = e;
        for (let e = 0; e < 5; e++) {
          let e = t == null ? void 0 : t.default;
          if (!e || typeof e != `object`) break;
          let n = Object.keys(t)
            .filter((e) => e !== `default`)
            .map((e) => t[e]);
          if (n.length > 0 && n.some((e) => e !== void 0)) break;
          t = e;
        }
        return t;
      })(t),
      r = n === t ? { ...t } : n;
    (Object.defineProperty(r, `__esModule`, { value: !0, enumerable: !1 }),
      (o.share.react = r));
  }
  if (o.share[`react-dom`] === void 0) {
    let t = await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5__loadShare__.mjs-DrYDIubK.js`
          ).then((e) => (e.W(), e.U)),
        [],
        import.meta.url,
      ),
      n = ((e) => {
        let t = e;
        for (let e = 0; e < 5; e++) {
          let e = t == null ? void 0 : t.default;
          if (!e || typeof e != `object`) break;
          let n = Object.keys(t)
            .filter((e) => e !== `default`)
            .map((e) => t[e]);
          if (n.length > 0 && n.some((e) => e !== void 0)) break;
          t = e;
        }
        return t;
      })(t),
      r = n === t ? { ...t } : n;
    (Object.defineProperty(r, `__esModule`, { value: !0, enumerable: !1 }),
      (o.share[`react-dom`] = r));
  }
  if (o.share[`@emotion/react`] === void 0) {
    let t = await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_emotion_mf_1_react__loadShare__.mjs-Z9kjHTfK.js`
          ).then((e) => e.s),
        [],
        import.meta.url,
      ),
      n = ((e) => {
        let t = e;
        for (let e = 0; e < 5; e++) {
          let e = t == null ? void 0 : t.default;
          if (!e || typeof e != `object`) break;
          let n = Object.keys(t)
            .filter((e) => e !== `default`)
            .map((e) => t[e]);
          if (n.length > 0 && n.some((e) => e !== void 0)) break;
          t = e;
        }
        return t;
      })(t),
      r = n === t ? { ...t } : n;
    (Object.defineProperty(r, `__esModule`, { value: !0, enumerable: !1 }),
      (o.share[`@emotion/react`] = r));
  }
  if (o.share[`@emotion/styled`] === void 0) {
    let t = await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_emotion_mf_1_styled__loadShare__.mjs-ggB3Dp4B.js`
          ).then((e) => e.n),
        [],
        import.meta.url,
      ),
      n = ((e) => {
        let t = e;
        for (let e = 0; e < 5; e++) {
          let e = t == null ? void 0 : t.default;
          if (!e || typeof e != `object`) break;
          let n = Object.keys(t)
            .filter((e) => e !== `default`)
            .map((e) => t[e]);
          if (n.length > 0 && n.some((e) => e !== void 0)) break;
          t = e;
        }
        return t;
      })(t),
      r = n === t ? { ...t } : n;
    (Object.defineProperty(r, `__esModule`, { value: !0, enumerable: !1 }),
      (o.share[`@emotion/styled`] = r));
  }
  if (o.share[`@iobroker/adapter-react-v5`] === void 0) {
    let t = await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5__loadShare__.mjs-DrYDIubK.js`
          ).then((e) => e.r),
        [],
        import.meta.url,
      ),
      n = ((e) => {
        let t = e;
        for (let e = 0; e < 5; e++) {
          let e = t == null ? void 0 : t.default;
          if (!e || typeof e != `object`) break;
          let n = Object.keys(t)
            .filter((e) => e !== `default`)
            .map((e) => t[e]);
          if (n.length > 0 && n.some((e) => e !== void 0)) break;
          t = e;
        }
        return t;
      })(t),
      r = n === t ? { ...t } : n;
    (Object.defineProperty(r, `__esModule`, { value: !0, enumerable: !1 }),
      (o.share[`@iobroker/adapter-react-v5`] = r));
  }
  if (o.share[`@mui/icons-material`] === void 0) {
    let t = await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5__loadShare__.mjs-DrYDIubK.js`
          ).then((e) => e.o),
        [],
        import.meta.url,
      ),
      n = ((e) => {
        let t = e;
        for (let e = 0; e < 5; e++) {
          let e = t == null ? void 0 : t.default;
          if (!e || typeof e != `object`) break;
          let n = Object.keys(t)
            .filter((e) => e !== `default`)
            .map((e) => t[e]);
          if (n.length > 0 && n.some((e) => e !== void 0)) break;
          t = e;
        }
        return t;
      })(t),
      r = n === t ? { ...t } : n;
    (Object.defineProperty(r, `__esModule`, { value: !0, enumerable: !1 }),
      (o.share[`@mui/icons-material`] = r));
  }
  if (o.share[`@mui/material`] === void 0) {
    let t = await e(
        () =>
          import(
            `./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5__loadShare__.mjs-DrYDIubK.js`
          ).then((e) => e.R),
        [],
        import.meta.url,
      ),
      n = ((e) => {
        let t = e;
        for (let e = 0; e < 5; e++) {
          let e = t == null ? void 0 : t.default;
          if (!e || typeof e != `object`) break;
          let n = Object.keys(t)
            .filter((e) => e !== `default`)
            .map((e) => t[e]);
          if (n.length > 0 && n.some((e) => e !== void 0)) break;
          t = e;
        }
        return t;
      })(t),
      r = n === t ? { ...t } : n;
    (Object.defineProperty(r, `__esModule`, { value: !0, enumerable: !1 }),
      (o.share[`@mui/material`] = r));
  }
  let d = t({
    name: l,
    remotes: u,
    shared: a,
    plugins: [],
    shareStrategy: `version-first`,
  });
  var f = s[c];
  if (((f ||= s[c] = { from: l }), !(r.indexOf(f) >= 0))) {
    (r.push(f), d.initShareScopeMap(`default`, n), i(d));
    try {
      await m(async () => {
        await Promise.all(
          await d.initializeSharing(`default`, {
            strategy: `version-first`,
            from: `build`,
            initScope: r,
          }),
        );
      });
    } catch (e) {
      console.error(`[Module Federation]`, e);
    }
    for (let [e, t] of Object.entries(a)) {
      var p, g;
      if (
        ((p = t.shareConfig) == null ? void 0 : p.import) !== !1 ||
        o.share[e] !== void 0
      )
        continue;
      let r = (e) => {
          let t = e;
          for (let e = 0; e < 5; e++) {
            let e = t == null ? void 0 : t.default;
            if (!e || typeof e != `object`) break;
            let n = Object.keys(t)
              .filter((e) => e !== `default`)
              .map((e) => t[e]);
            if (n.length > 0 && n.some((e) => e !== void 0)) break;
            t = e;
          }
          return t;
        },
        i = n == null ? void 0 : n[e],
        a = i && i[Object.keys(i)[0]];
      if (!a) continue;
      let s =
          a.lib ||
          (a.loading
            ? await a.loading
            : await ((g = a.get) == null ? void 0 : g.call(a))),
        c = typeof s == `function` ? s() : s,
        l = await Promise.resolve(c);
      o.share[e] = r(l);
    }
    return d;
  }
}
async function v(e) {
  let t = await g();
  if (!(e in t))
    throw Error(`[Module Federation] Module ${e} does not exist in container.`);
  return t[e]().then((e) => () => e);
}
export { _ as n, v as t };
