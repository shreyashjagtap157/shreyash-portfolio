# Portfolio project evidence register

**Review date:** 11 November 2026  
**Portfolio repository:** `shreyashjagtap157/shreyash-portfolio`  
**Portfolio baseline:** `main` at `129a6ebd44890f5b7eb73497678529e451b8d635`  
**Scope:** 14 selected repositories + 2 previously excluded candidates  

This is a point-in-time review of public repository metadata, READMEs and visible GitHub Actions runs. It is not a local build, source-level security audit, live product acceptance test or claim that every advertised feature is implemented. A workflow result applies only to its exact commit and scope. “No runs found” means no Actions runs were returned by the inspected endpoint; it is not proof that no tests exist or that CI never ran elsewhere.

## Selected projects

| Project | Default branch / latest inspected commit | Observed workflow evidence | Publicly supportable maturity | Next action before expanding claims |
|---|---|---|---|---|
| Omni | `main` / `27c55651d8d20c4d46d1fb28a3c440770b9d4363` (9 Nov) | Rust, Clippy, Security Audit and CodeQL passed; aggregate Omni CI and fuzz-dependency job failed on that head. | Early-stage Rust compiler/toolchain; full language qualification and self-hosting unresolved. | Refresh README's stale full-pipeline claim and resolve aggregate/fuzz failures before any broader qualification claim. |
| Helios | `main` / `cd9ebe2ea2cfc34e3c420d52035a602ca2563ed2` (2 Nov) | Documentation/governance validation passed. It does not test a runtime. | Concept/specification only; no runtime implementation. | Reconcile the strict pretrained-model prohibition with the newer perception-only proposal in canonical specifications before claiming it as an approved repository rule. |
| NexusAgent | `master` / `27441a7822e827474b719f49fbffea96f10ee5c5` (13 Oct) | General Actions and Rust component workflows passed 10 Nov; Security workflow failed 9 Nov. | Unreleased `0.3.0-alpha.5` prerelease. | Investigate security workflow and refresh repository status/commit evidence. |
| AetherOS | `main` / `b64f9f5f8f944285ef847d0ae429c1e438b96a1f` (22 Oct) | Latest inspected reference-validation runs failed. | Architecture/specification and host-reference prototype; not a bootable kernel. | Reproduce and fix the reference-validation failure; retain no-kernel qualification. |
| Mosaic-µ | `main` / `794e76867e09d9bfa9d3c03cde7df4b5b5da971f` (22 Oct) | Nightly runs 7–11 Nov failed on this head. | Tokenizer/runtime candidate; full release qualification blocked. | Inspect current nightly failure logs and distinguish passing subchecks from whole-candidate qualification. |
| Kilo Code fork | `main` / `775a0f5c1870fb5e4e45de1014f1e5b935eddecf` (27 Oct) | No recent successful fork-specific qualification run established in this review; returned recent workflow records were skipped on another observed head. | Local fork with experimental specialist-agent/swarm work. | Document fork-specific changes and evidence separately from upstream Kilo Code; add reliable fork-specific verification. |
| Dynamic Neural Computation | `main` / `3157410c43994f79b2e5c90264e601ab30adad26` (22 Oct) | Latest inspected DNC quality-gates run failed. | Python research/reference platform; external production qualification and full tensor-native execution open. | Reproduce the cross-platform test failure and record the external pilot NO-GO gate. |
| Tensor Ring Decomposition | `main` / `33428ad3a2288b72716a2735772bb5641420ec5e` (22 Oct) | Tests workflow startup failure; Security workflow failure. | Python/PyTorch implementation; release readiness not established. | Repair workflow startup and security failures; reconcile package/report version and reproduce benchmarks. |
| UEP | `main` / `51c4dd7ced6f79cb6c9dda63d3974bc7a44c3b99` (4 Nov) | Maven component and GitHub Actions workflows passed 9 Nov; aggregate UEP CI failed 4 Nov. | `0.15.0.0-SNAPSHOT`; local Windows acceptance and external services not production-qualified. | Complete target-workstation acceptance; do not equate component workflow passes with product qualification. |
| Decentralized IoT Network | `master` / `2283fb953d9e8848ddb056414c072b7bf34e08cf` (22 Oct) | Backend CI failed 22 Oct; latest load-test workflow found failed 5 Apr. | Multi-component prototype; end-to-end network operation not verified. | Re-run load tests with retained logs and independently verify device/backend/contract/mobile integration. |
| ACTSConnect | `master` / `05987f619ab5000265cae4f3725d29d6ad8f11fe` (22 Oct) | No Actions runs or releases found in inspected endpoint. | Development project; repository/submodule and end-to-end integration questions remain. | Reconcile canonical frontend/submodule layout and demonstrate clean integrated build. |
| OldAgeHome | `master` / `1621bdc27947ba9b151aa3145cbd29efbdca73b9` (22 Oct) | No Actions runs or releases found. | Django development project with incomplete workflows. | Restore an authoritative dependency manifest and review configuration/security before publishing stronger claims. |
| MilkyWay | `master` / `c16240ac389624458ffe73bd7c3e06d7aa63e9d6` (22 Oct) | No Actions runs or releases found. | Django development project; reproducible setup and production hardening remain open. | Restore versioned dependencies, review host/security configuration and privately classify tracked logs. |
| AI-OS | `master` / `b6a76eb7da6db959d43c28e57587a6d9134de093` (3 Feb) | Inspected CI run failed. | Python research prototype; not a bootable OS. | Refresh the project state and make a reproducible test/build gate available. |

## Additional candidates reviewed

| Candidate | Latest inspected commit | Evidence and assessment | Decision |
|---|---|---|---|
| CivicGuide (PromptWars-Virtual-2) | `master` / `f546d2cb01b20d764077fb53eba65ee7540a5531` (2 May) | README describes a civic-tech election-process assistant; inspected package manifests show Next.js 16 / React 19 frontend and Express 5 / TypeScript backend. README claims English/Hindi/Marathi, browser-local progress, geolocation and text-to-speech accessibility, and lists a Cloud Run URL. No Actions runs found; the live URL could not be opened by the review environment. | Keep as an inclusion candidate pending live deployment, build/test, accessibility, localization, privacy and personal-contribution verification. |
| Miner | `master` / `dec55d2983bdcf099bebd96fafe0f75ca8829b28` (3 Feb) | README describes an Android cryptocurrency-mining application. No Actions runs found in inspected endpoint. | Keep excluded for current portfolio focus; reconsider only if a specific verifiable contribution adds material value. |

## Global portfolio checks

- Portfolio baseline main: `129a6ebd44890f5b7eb73497678529e451b8d635`, PR #18 merge on 11 Nov.
- Portfolio CI run [43010941030](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/43010941030) passed on that exact main head.
- No open portfolio PRs were found at audit time.
- GitHub reported `main` as unprotected. Branch protection and required checks are a recommended hardening task, not yet configured.
- The five built-in locales each contain 230 keys with identical key sets. Each contains 14 project cards, 14 project-detail notes and 65 case-study keys. This checks structure, not translation quality.
- The selected grid remains 14 projects; CivicGuide was not added and Miner remains excluded.
- Worker v28 is the last verified production application release from PR #16. The PR #18 change was documentation-only and no deployment was performed for it.

## Evidence boundaries

Do not interpret a README's project description as runtime proof. Do not treat a component workflow as an aggregate product pass. Do not infer production deployment from a listed URL. Do not reuse historical benchmark counts or CI results as current without matching the exact commit/configuration. The next source-level audit should inspect relevant implementation files and workflow logs for projects prioritized by the public case studies.
