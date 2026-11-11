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
| Kilo Code fork | `main` / `775a0f5c1870fb5e4e45de1014f1e5b935eddecf` (27 Oct) | One M2 Swarm Foundation run passed on earlier commit `13ff9a7c...` (24 Oct), covering migration/schema, durable events, claims, reservations, recovery and process-race tests. That commit explicitly kept M3 worker dispatch out of scope. Current source contains M3 runtime/reviewer code, but its own qualification docs still require further focused CI and real provider-backed validation. | Public fork contains committed swarm-specific implementation and docs; M2 foundation has one earlier passing qualification run. M3 execution bridge is implemented in source but not qualified. Top-level README remains upstream-oriented. | Refresh the fork README/case study to link to the actual M2/M3 source and evidence; run the current M3-focused workflow/tests on latest main and capture real provider-backed workload evidence before any production-readiness claim. |
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


## Targeted failure-log inspection — 11 November 2026

The following details come from the actual failed-job logs, not only the workflow summary:

- **Omni aggregate CI:** job “Build & Qualify (Pinned Rust 1.95.0)” fails to compile `research/memory-model/domain_lifetimes.rs` at line 471 with `cannot find value object in this scope`. The log also shows the focused ownership test command passed 12/12 immediately before this compile failure. Do not attribute this isolated research-model compile error to all compiler front-end or production language components.
  - [Failed aggregate run](https://github.com/shreyashjagtap157/Omni---New/actions/runs/42590880366)
- **Mosaic fuzz-smoke:** the job passes `-Zsanitizer=address` and sanitizer-coverage flags to the stable `rustc 1.97.1` selected in the job; the compiler explicitly rejects `-Z` because nightly is required.
  - **Mosaic native sanitizer:** after several sanitizer smoke executables report success, the test target attempts to execute `../build/mosaic-low-memory-smoke`, which is absent, and `make test` exits 127. This points to a build/test-target dependency mismatch that needs reproduction; it is not evidence that all sanitizer scenarios failed.
  - [Nightly run](https://github.com/shreyashjagtap157/Mosaic/actions/runs/42995229092)
- **NexusAgent Security:** the Python dependency-audit job reports 13 known vulnerability findings for `filelock 4.0.12`, with `4.2.1` shown as the fix version. The workflow exits non-zero. Do not describe the security audit as passing until the resolved dependency graph and policy exceptions are rerun and reviewed.
  - [Security run](https://github.com/shreyashjagtap157/nexus-agent/actions/runs/42597084938)
- **UEP aggregate CI:** Maven's platform-server test task reports 258 tests, zero assertion failures and one error. The failing `ModularityTest.moduleBoundariesAreValid` identifies a direct dependency from module `identity` to `tenancy` through `LocalDevelopmentIdentityBootstrapper -> LocalTenantBootstrapService`; allowed targets for identity are `security` and `audit`. This is a concrete architecture-boundary violation, not a generic test failure. The log also includes database constraint errors emitted by negative-path integration tests; they should not be classified as separate failures without their test outcomes.
  - [UEP CI run](https://github.com/shreyashjagtap157/UEP/actions/runs/41776225411)
- **AetherOS reference validation:** host-reference tests shown before the final validation step pass, but `./check.sh` cannot execute `./tools/verify-reproducible-reference.sh` because the script has no executable permission; the job exits 126. Artifact upload then also finds no evidence directory. The immediate failure is the script invocation/file-mode contract; this does not invalidate the individual tests that passed earlier in the same job.
  - [Reference-validation run](https://github.com/shreyashjagtap157/AetherOS/actions/runs/39757872721)

These observations prioritize fixes in the source repositories, but this portfolio PR does not change those repositories. They are recorded so the portfolio can represent project maturity accurately and so future reviews can compare new runs against precise failure modes.


## 15. Kilo Code fork source-level qualification refinement — 2026-11-11

The earlier note that no fork-specific qualification evidence had been established was too broad. A source-tree and workflow inspection found committed swarm work in the public `shreyashjagtap157/kilocode` repository:

- Fork-specific design: `docs/swarm/AGENSH-INSPIRED-TEAM-COORDINATION.md`, `docs/swarm/M2-QUALIFICATION.md`, `docs/swarm/M3-USABILITY-QUALIFICATION.md`, and `docs/swarm/REAL-WORLD-VALIDATION.md`.
- M2 code: `packages/core/src/kilocode/swarm/sql.ts` plus OpenCode modules under `packages/opencode/src/kilocode/swarm/` for board communication, claims/fencing, dispatch, events, recovery, state, supervision, verification, and worker/session binding.
- M3 tests: `packages/opencode/test/kilocode/swarm/`, including runtime, recovery, worker, concurrency, verification, and related tests.
- The M2 workflow `.github/workflows/m2-swarm-foundation.yml` runs migration/schema checks, durable event/migration tests, swarm state/claim/reservation/recovery/process-race tests, swarm package tests, OpenCode typecheck, and generated-schema cleanliness checks.

One matching M2 workflow run was found in the inspected recent main-branch Actions results: [run 40116350112](https://github.com/shreyashjagtap157/kilocode/actions/runs/40116350112), successful on commit `13ff9a7c0a34ddf94418e23fe21981745e580b41` (24 October 2026). That commit message explicitly states M3 worker dispatch remains out of scope; the job validates M2 migration/schema, durable events/upgrades, claims, reservations, recovery and process races. It is not evidence that the later M3 execution bridge is qualified on the inspected `main` head `775a0f5c1870fb5e4e45de1014f1e5b935eddecf` (27 October).

The current `docs/swarm/M2-QUALIFICATION.md` calls M2 implemented and M3 under active qualification. It documents a Kilo-owned execution bridge that reuses the existing `SessionExecution.Service`, durable task/session bindings, lease/fence ownership, recovery and a separate reviewer task. It explicitly warns that lease expiry is not a physical kill switch and cannot prove that an already-running provider request stopped. Its remaining gates include production session-factory wiring, supervised lease renewal, active cancellation interruption, provider-result persistence fencing, restart recovery, concurrency/race qualification, and passing the full focused suite.

`docs/swarm/M3-USABILITY-QUALIFICATION.md` describes intended bounded specialist execution and lists real provider/model execution and CI as required proof. `docs/swarm/REAL-WORLD-VALIDATION.md` says mocked tests establish orchestration correctness but do not establish operational usefulness; a real configured provider workload, CI, and independent evidence/reviewer acceptance are required.

**Portfolio consequence:** the public repo contains more fork-specific work than the top-level README communicates. The case study may describe the committed M2 durable-state foundation and the M3 execution/reviewer architecture as source-level implementation under qualification, while explicitly stating that M3 is not yet fully qualified and that the sole located green M2 workflow belongs to an earlier commit.



## 16. Featured-project source and failing-gate refinement — 2026-11-11

This section records source-level checks and exact failures inspected after the initial repository sweep. These are observations from the named revisions/runs, not blanket qualification decisions.

### Mosaic-µ

The latest inspected head remains `794e76867e09d9bfa9d3c03cde7df4b5b5da971f` (22 October). The nightly workflow has repeatedly run against that same head; the 11 November run [42995229092](https://github.com/shreyashjagtap157/Mosaic/actions/runs/42995229092) failed in several jobs.

- The Rust cross-platform matrix fails Clippy with warnings denied in the `mosaic-core` test `exactness`: “adding items after statements is confusing” (the `clippy::items_after_statements` lint).
- The Miri job reports that `cargo-miri` is unavailable for `1.97.1-x86_64-unknown-linux-gnu`.
- The fuzz-smoke job passes sanitizer-only `-Z` flags to `rustc 1.97.1`; the compiler rejects them because `-Z` options require nightly.
- The repository's `rust-toolchain.toml` pins channel `1.97.1`. The actual CI logs show stable 1.97.1 even in jobs intended to run Miri/fuzz tooling. Resolve the toolchain-selection contract explicitly; do not call these fuzz/Miri gates successful.
- The native sanitizer `make test` invocation runs several smoke binaries successfully, but then tries to execute `../build/mosaic-low-memory-smoke`, which is not present, and exits 127. The Makefile declares a sanitized low-memory binary separately; the ordinary test target/recipe needs review.
- The three native cross-platform matrix jobs also fail during early Python requirements installation in the retrieved logs. The captured log does not contain enough pip diagnostic detail to attribute the failure to a specific dependency or platform.

The project still has meaningful implemented scope: byte-authoritative token handling, token/source spans, Unicode projections, native C runtime, Rust components, Python wrappers, deterministic packs, and a versioned TokenDocument serialization format. Its own CI topology differentiates PR, nightly and release/milestone gates; it explicitly says a milestone qualifies only the claimed subsystem and a public release qualifies every included subsystem. Keep the public status at candidate / release qualification blocked.

### Dynamic Neural Computation

The latest inspected head is `3157410c43994f79b2e5c90264e601ab30adad26` (22 October). Quality-gates run [39757898336](https://github.com/shreyashjagtap157/Dynamic-Neural-Computing/actions/runs/39757898336) completed with three matrix jobs passing (Ubuntu Python 3.12, Ubuntu Python 3.13, Windows Python 3.12) and Ubuntu Python 3.11 failing. The failing job reported **514 passed, 1 failed, 2 skipped**; the sole failure is `tests/test_phase3_observability.py::TestPhase3ExitCriteria::test_ec6_evaluation_trial_count`, where an exact float assertion expected `0.8` and received `0.8000000000000004`. This is a numerical-test contract defect, not evidence that the whole execution platform fails.

Source inspection confirms:
- `StructuralProjector.project()` first runs `DNCIRValidator.validate_graph()`; governed graphs require an `ExecutionContext`, which is independently validated before projection.
- The projector builds an adjacency graph over DATA/CONTROL/DEPENDENCY edges, uses deterministic Kahn topological ordering, and constructs a distinct `ExecutableDAG` carrying node contracts (idempotency, side effects, placement, security) and sorted edge data.
- `Checkpoint.validate()` currently checks snapshot presence, non-negative integer step index, non-null W/M/C/H components, and that `provenance_ref` is a string before setting `is_valid=True`. The docstring describes additional conditions (R completeness, event resolution, matching execution step and active invariants) that are not all performed in that method. Verify whether a separate admission path enforces those conditions before describing checkpoints as fully provenance- and invariant-qualified.

The repository's own status as of 1 August says its default `ReferenceExecutionCore` is deterministic test infrastructure, some durability/enterprise components are process-local references unless bound to qualified infrastructure, and Phase 16 readiness is NO-GO because external canary outcomes and independent human approvals are absent. Do not repeat stronger claims from older README paragraphs that say the “complete test suite” passes without aligning them to the newer 22 October matrix result.

### Universal Education Platform (UEP)

At head `51c4dd7ced6f79cb6c9dda63d3974bc7a44c3b99`, UEP CI [41776225411](https://github.com/shreyashjagtap157/UEP/actions/runs/41776225411) had passing web, vulnerability-scan and Keycloak staging-container jobs. Backend jobs on Java 18.4 and 17.11 both reached 258 tests, with zero assertion failures and one error: Spring Modulith rejects a dependency from the `identity` module to `tenancy` through `LocalDevelopmentIdentityBootstrapper -> LocalTenantBootstrapService`; identity's allowed targets are security and audit. This path is specifically the `local-native` bootstrap path, but its dependency still violates the enforced module boundary.

The repository-policy job ran `bash scripts/verify-repository.sh` and exited 1; the retrieved log did not expose its detailed diagnostic. The Windows local-presentation smoke job also exited 1; the retrieved log confirms the launcher was invoked but does not preserve sufficient child-process output to attribute a specific root cause. Keep those two as unresolved CI failures rather than guessing. UEP README status still says production qualification has not passed and target-workstation acceptance remains outstanding.

### Tensor Ring Decomposition

At head `33428ad3a2288b72716a2735772bb5641420ec5e`, the Tests workflow run [39757267864](https://github.com/shreyashjagtap157/tensor-ring-decomposition/actions/runs/39757267864) ended in `startup_failure`; the workflow-jobs API returned no runner jobs. The Security workflow run [39757266079](https://github.com/shreyashjagtap157/tensor-ring-decomposition/actions/runs/39757266079) failed, also with no runner-job detail available. This is not enough evidence to claim that a security scanner found vulnerabilities or that tests themselves failed.

The package metadata declares version `0.4.0`; `BENCHMARK_REPORT.md` describes `0.3.0`. The report says 60 model profiles were analyzed but only 9 have full quality metrics. Its compression maxima should not be presented as measured production performance or quality equivalence without reproducing the exact benchmark configuration. The project README itself says release readiness is not established.

### Evidence limits

Where a GitHub workflow is `startup_failure` or no job record/log is available, report that exact status; do not invent a test or vulnerability diagnosis. A source implementation, design document or passing subset of a matrix does not qualify the full product.


## 17. Omni and NexusAgent source-level case-study evidence — 2026-11-11

### Omni — normative grammar and implementation boundary

At inspected `main` head `27c55651d8d20c4d46d1fb28a3c440770b9d4363`:

- The normative Edition 1 grammar is in `spec/grammar/omni-edition1.ebnf`; its header explicitly identifies it as the normative grammar.
- `compiler/omni-parse/src/grammar_contract.rs` states that the bound Edition 1 EBNF predates the Candidate 2 Vibe-First amendment. It records the conflict across VIBE-GRAM-0001..0007 and LEX-0002 / GRAM-0002 / GRAM-0003, and states Candidate 2 is not in force; strict Edition 1 governs until the established process changes that.
- Contract tests explicitly keep newline trivia from terminating a statement, require semicolons for affected statement forms, reject unratified Vibe-first syntax in the default profile, and allow explicitly opted-in experimental profile probes. This is concrete executable specification-governance work, not evidence of a complete grammar implementation.
- The README's highlighted full-pipeline pass is tied to older commit `3902f6d...`; latest inspected head `27c55651...` has the aggregate CI failure described earlier. The README also lists effects, HIR lowering, complete MIR verification and machine/code-generation/runtime components as partial or incomplete.
- The current failing aggregate build is in the isolated research model `research/memory-model/domain_lifetimes.rs:471` (unresolved `object` name). Keep that research-prototype failure distinct from language front-end contract tests and other independently passing focused Rust checks.

Portfolio consequence: the strongest case-study narrative is specification-governed language implementation, normative grammar enforcement, explicit rejection of unratified syntax, and a staged Rust-first/self-hosting roadmap. Do not claim full-language conformance, a complete production compiler, or self-hosting.

### NexusAgent — executable multi-agent orchestration and security boundary

At inspected `master` head `27441a7822e827474b719f49fbffea96f10ee5c5`:

- `src/nexus_agent/team/runtime.py` implements a concurrent team runtime using `ThreadPoolExecutor` / `as_completed` and creates actual `AgentLoop` workers. Team storage, planning, event handling and specialist role models are separate modules.
- `tests/test_multi_agent_team.py` exercises three configured specialist profiles (Architect, Implementer, Reviewer) with distinct read/write permissions, parallelism of three, worker completion and synthesis; another test checks persisted team-board message types in `TeamStore`.
- These tests use a `FakeProvider` that returns canned role-plan, worker and synthesis responses. They demonstrate actual orchestration/runtime wiring and persistence under test doubles, but do not prove a successful real provider/model-backed workload.
- The inspected Security workflow uses strict `pip-audit` and has a narrow explicit ignore for `PYSEC-2026-2447` affecting an unused transitive diskcache path. The 9 November security run [42597084938](https://github.com/shreyashjagtap157/nexus-agent/actions/runs/42597084938) reports 13 known findings for `filelock 4.0.12`, with `4.2.1` listed as the fix version. The aggregate `Required` security job also fails. Do not mark security as green until the dependency resolution and policy are rerun.
- The runtime's workspace-tool factory includes filesystem write/delete/restore, shell, Git, browser, web, LSP and other tools. Case-study descriptions should discuss permission planning and tool boundaries rather than imply the agent has a narrow or read-only authority by default.

Portfolio consequence: describe a local-first, unreleased alpha platform with real agent-loop/team orchestration, persistence and test coverage under a fake provider. Keep provider-backed operational usefulness, security qualification and stable release status open.
