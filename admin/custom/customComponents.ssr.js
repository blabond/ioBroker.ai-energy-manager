import { t as e } from './assets/vite-preload-helper-D5Yh7_hZ.js';
import { init as t } from '@module-federation/runtime';
var n;
async function r() {
    return (
        (n ??= e(
            () =>
                import(
                    `./assets/virtual_mf-exposes-ssr___mfe_internal__ConfigCustomAiEnergyManager__customComponents_js-SGG8BeSv.js`
                ).then(e => e.default ?? e),
            [],
            import.meta.url,
        )),
        n
    );
}
async function i(e = {}, n = []) {
    let r = t({ name: `ConfigCustomAiEnergyManager`, remotes: [], shared: {} }),
        i = { from: `ConfigCustomAiEnergyManager` };
    if (!(n.indexOf(i) >= 0)) {
        (n.push(i), r.initShareScopeMap(`default`, e));
        try {
            await Promise.all(
                await r.initializeSharing(`default`, { strategy: `version-first`, from: `build`, initScope: n }),
            );
        } catch (e) {
            console.error(`[Module Federation SSR]`, e);
        }
        return r;
    }
}
async function a(e) {
    let t = await r();
    if (!(e in t)) throw Error(`[Module Federation] Module ${e} does not exist in container.`);
    return t[e]().then(e => () => e);
}
export { a as get, i as init };
