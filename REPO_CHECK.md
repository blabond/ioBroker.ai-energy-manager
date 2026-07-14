# Repository Check

Internal checklist based on the ioBroker adapter review for version 0.4.1 on 2026-07-13.
Revalidate affected entries whenever adapter behavior, objects, dependencies, admin UI, or release automation changes.

## Before Every Release

- [ ] Run `npm run translate` after adding or changing English admin texts.
- [ ] Run `npm run translate:check` and verify all 11 language files have identical key sets.
- [ ] Run `npm run check`, `npm run lint`, `npm run format:check`, and `npm test`.
- [ ] Run `npm run build:admin` and verify the generated admin UI is current.
- [ ] Review `npm outdated` and evaluate repository-checker dependency warnings.
- [ ] Keep `package.json`, `package-lock.json`, and `io-package.json` versions aligned for a release.
- [ ] Add English release notes below `README.md`'s `WORK IN PROGRESS` heading.
- [ ] Export and attach a current object dump when requesting another repository review.

## Current Passed Checks

- [x] README is English; German documentation is separate and referenced through `io-package.json`.
- [x] The adapter's own SmartEnergy backend does not require a separate manufacturer link.
- [x] The 512 x 512 adapter icon is unique and not the adapter-creator placeholder.
- [x] README contains no direct GitHub or raw npm installation instructions.
- [x] Runtime code has no OS-specific behavior and supports Linux, Windows, and macOS.
- [x] `adapterToken` is protected, encrypted, and sanitized before logging.
- [x] Own object IDs are static; selected foreign IDs come from the ioBroker object browser.
- [x] Own state IDs, names, descriptions, and all log messages are English.
- [x] No writable own states exist; backend writes pass strict target and type validation.
- [x] Admin UI text uses i18n and all 11 required language files exist.
- [x] Plain JavaScript sources live in the repository root and `lib/`; TypeScript only checks types.
- [x] `onStateChange` is required for telemetry integration and only processes foreign states with `ack === true`.
- [x] No unused `onObjectChange` handler is registered.
- [x] Backend HTTP calls use `fetch`, `AbortController`, and a configurable timeout.
- [x] Cloud polling uses a persistent per-installation random offset and a minimum interval of 10 seconds.
- [x] Configurable intervals are clamped to safe Node.js timer ranges.
- [x] Recurring work uses self-rescheduling `setTimeout` calls, preventing overlapping runs.
- [x] `package.json` has no install-time lifecycle hooks.
- [x] Runtime code does not modify npm-delivered source or admin directories.
- [x] The legacy `datapoints` fallback has been removed.
- [x] The API `User-Agent` derives its version from `package.json`.
- [x] Runtime-created states are declared in `io-package.json` and use valid roles and types.
- [x] Object structure checks report no errors or warnings.
- [x] The standard `test-and-release.yml` workflow and standard package/integration tests are present.

## Accepted Notes

- Dynamic i18n keys such as `` `${assignment.key}Help` `` can look unused to static scanners but are intentional.
- `cleanDecisionReason()` recognizes a backend-supplied German phrase; external data is exempt from the English-only rule.
- Repository warning `W4001` is expected until this adapter has been added to the latest repository.

## Automation

The `test-and-release.yml` autofix job runs `npm run translate` on pushes to `main` and commits generated translations with other formatting fixes. Every check run also executes the deterministic `npm run translate:check` parity check, so pull requests fail when a language file is missing or has stale keys.
