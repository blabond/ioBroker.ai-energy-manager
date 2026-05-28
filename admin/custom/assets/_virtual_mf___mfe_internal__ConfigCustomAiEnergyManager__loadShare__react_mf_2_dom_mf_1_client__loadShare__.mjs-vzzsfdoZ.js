import { a as e, i as t, r as n, t as r } from "./rolldown-runtime-BYbx6iT9.js";
import {
  U as i,
  W as a,
} from "./_virtual_mf___mfe_internal__ConfigCustomAiEnergyManager__loadShare___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5__loadShare__.mjs-Qmea7kmD.js";
var o = r((e) => {
    var n = (a(), t(i));
    ((e.createRoot = n.createRoot), (e.hydrateRoot = n.hydrateRoot));
  }),
  s = n({ createRoot: () => l, default: () => c, hydrateRoot: () => u }),
  c = e(o()),
  l = c.createRoot,
  u = c.hydrateRoot,
  d = `__mf_module_cache__`;
((globalThis[d] ||= { share: {}, remote: {} }),
  (globalThis[d].share ||= {}),
  (globalThis[d].remote ||= {}));
var f = globalThis[d],
  p = (e) => {
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
  m = f.share[`react-dom/client`];
(m === void 0 && ((m = p(s)), (f.share[`react-dom/client`] = m)),
  (() => {
    let e = m;
    for (let t = 0; t < 5; t++) {
      let t = e == null ? void 0 : e.default;
      if (!t || typeof t != `object`) return t ?? e;
      e = t;
    }
    return e;
  })());
var { createRoot: h, hydrateRoot: g } = m;
export { s as n, h as t };
