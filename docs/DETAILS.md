# Portfolio content source of truth

This document records the content permitted on the public portfolio. Repository README/status documents are authoritative for current engineering state and must be rechecked before future releases.

## Identity and contact

- **Professional name:** Shreyash Satish Jagtap.
- **Headline:** Engineering Intelligent Systems. Building New Possibilities.
- **Role label:** Backend and AI Systems Developer.
- **Location:** Pune, Maharashtra, India. Publish city-level location only; never publish a street address.
- **Email:** ssjagtap2016@gmail.com. A separate professional email has not yet been supplied.
- **Phone:** +91 80876 79022.
- **LinkedIn:** https://www.linkedin.com/in/shreyash-jagtap-48a359356/.
- **GitHub:** https://github.com/shreyashjagtap157.
- **Hosting URL:** The connected Cloudflare account has the free account subdomain `ssjagtap2016.workers.dev`; the existing `shreyash-portfolio` Worker has its `workers.dev` hostname enabled. Public URL: https://shreyash-portfolio.ssjagtap2016.workers.dev/. No custom domain purchase is required.

## Experience

- **Java Full Stack Developer with Generative AI (Intern)**, Puneri Pattern Pvt. Ltd., Pune — 17 June 2026 to present. Do not add unprovided project, impact, or performance metrics.
- **Django Backend Developer (Intern)**, Chordz Technologies — December 2024 to March 2026. Django REST Framework; 70+ API endpoints across projects, including 30+ for OldAgeHome.

## Education and certifications

- **B.E. Computer Science**, Pune Institute of Computer Technology (PICT), 2018–2022; CGPA 8.73.
- Anthropic Academy: Claude 101; Building with the Claude API; Claude Code in Action; Introduction to MCP.

## Skills

- **Languages:** Python, Java, Rust, TypeScript, JavaScript, C.
- **Backend and web:** Django, Django REST Framework, Spring Boot, React, PostgreSQL, REST API design.
- **AI and data:** LLM and MCP API integration, RAG, LangChain, LlamaIndex, PyTorch, YOLOv8, multi-agent orchestration.
- **Language and systems engineering:** compilers, specifications, tokenization, intermediate-representation design, symbolic reasoning, systems architecture.
- **Tooling:** Git, GitHub, Ansible, automated testing, CI/CD.

No skill proficiency levels have been supplied. Do not add stars, percentages, rankings, or expert-level labels.

## Selected projects

All listed repositories are under https://github.com/shreyashjagtap157/.

| Project | Repository | Accurate public description and maturity |
|---|---|---|
| Omni | `Omni---New` | Early-stage Rust implementation of the specification-governed Omni Edition 1 compiler and toolchain. Self-hosting is a roadmap goal, not an existing capability. |
| Helios | `Helios` | Concept and evolving specification only. Explicit knowledge, symbolic reasoning, managed memory, planning, and controlled actions. Frozen foundation models are considered only as isolated perception peripherals; their outputs remain untrusted observations, never facts or authority. No runtime implementation exists. |
| NexusAgent | `nexus-agent` | Local-first general-purpose multi-agent platform for coding, research, analysis, and automation, with specialist teams, tools, memory, MCP, and provider routing. Version 0.3.0-alpha.5 is an unreleased prerelease. |
| AetherOS | `AetherOS` | Operating-system architecture/specification and host reference prototype. Not a bootable kernel; the QEMU RISC-V64 product slice has not started. |
| Mosaic-µ | `Mosaic` | Byte-exact tokenizer/runtime candidate with C, Rust, and Python components, Unicode handling, and deterministic model packs. Full-release qualification is blocked; do not imply a qualified stable release. |
| Kilo Code fork | `kilocode` | Public fork of upstream Kilo Code. The top-level README remains upstream-oriented, but the public repository contains committed swarm-specific code under `packages/core/src/kilocode/swarm/` and `packages/opencode/src/kilocode/swarm/`, tests under `packages/opencode/test/kilocode/swarm/`, and qualification/design docs under `docs/swarm/`. M2 durable-state foundation has one passing focused run on an earlier 24 Oct commit; M3 execution/reviewer bridge is in source but its own docs still require current CI and a real provider-backed workload. NVIDIA NIM remains experimental unless separately verified. |
| Dynamic Neural Computing | `Dynamic-Neural-Computing` | Formal execution model and Python research/reference runtime. External production qualification and full tensor-native execution remain open. |
| Tensor Ring Decomposition | `tensor-ring-decomposition` | Python/PyTorch library with tensor-ring, ALS/SVD, and quantization-related implementations. Release readiness and benchmark claims require verification. |
| Universal Education Platform | `UEP` | Multi-tenant education/training operations platform using Java/Spring Boot, React, and database adapters. Production qualification has not passed; local Windows acceptance remains in progress. |
| Decentralized IoT Network | `decentralized-iot-network` | Multi-component prototype spanning firmware, backend, smart contracts, mobile, and dashboard work. End-to-end network operation and production deployment are not verified. |
| ACTSConnect | `ACTSConnect` | Student/alumni networking application with frontend and backend material. Repository layout and integration questions remain; production deployment is not verified. |
| OldAgeHome | `OldAgeHome` | Django elderly-care administration project. Multiple workflows are incomplete; clean setup and production security work remain. |
| MilkyWay | `MilkyWay` | Django milk-delivery/home-service application. Reproducible setup and production hardening remain; production deployment is not verified. |
| AI-OS | `ai-os` | Python research prototype exploring an AI-native OS experience, command registry, multimodal input, and plugin boundaries. Not a bootable OS. |

## Public representation rules

- Do not claim a project is production-ready merely because source code, modules, tests, or a prototype exist.
- Keep planned milestones separate from completed implementation.
- For Kilo Code, distinguish upstream product functionality from fork-specific public source. The public fork contains committed swarm implementation; document its exact M2/M3 maturity and qualification evidence, and keep NVIDIA NIM claims separate unless independently verified.
- For Helios, state clearly that it is concept/specification stage with no runtime implementation.
- Do not publish private operational data, credentials, API keys, customer data, internal service identifiers, or personal data from project repositories.
- Do not infer skill levels or impact metrics.

## Inventory reconciliation

The selected-work list contains exactly **14 repositories**: 4 languages/systems, 5 AI/agents, and 5 platforms/web. Every entry has a unique project ID and repository slug. This is a selected-work list, not a claim that these are the only repositories in the account.

## Repository-to-portfolio contradiction ledger

- **Helios:** the public Helios README still states that pretrained neural models and model-inference services must not be used. The newer direction discussed for Helios permits frozen foundation models strictly as perception-only peripherals, with provenance-bearing outputs treated as untrusted observations and all reasoning/memory/planning/action authorization remaining non-neural and symbolic. This is a real specification/documentation conflict in the separate Helios repository. The portfolio describes the newer intended direction but does not silently rewrite the canonical Helios README or master specification.
- **Kilo Code fork:** the fork's public README still primarily describes upstream Kilo Code. Portfolio wording therefore labels specialist-agent/NVIDIA NIM work as experimental fork work and does not claim it is upstream functionality or a released capability.

## Excluded content

- Earth-Aria and all other fiction; these are not portfolio projects.
- Empty/duplicate/small repositories unless explicitly approved later.
- Miner and PromptWars-Virtual-2 remain excluded until their owner confirms whether they belong.

## Résumé and outstanding owner confirmations

- Keep the résumé single-column and ATS-friendly.
- Do not mention CDAC ACTS in Java-targeted resumes or introductions.
- A professional email, optional headshot, skill proficiency levels, project inclusion choices, and custom-domain configuration are owner decisions; current deployment uses the free Cloudflare Worker hostname.


## Professional positioning and current engineering narrative — 2026-11-09

The portfolio describes Shreyash as a systems and software engineer whose work is research-led and evidence-driven. The intended sequence is to investigate a problem and relevant alternatives, make assumptions and constraints explicit, establish testable specifications, build an implementation that exercises those specifications, and qualify the resulting behavior with reproducible evidence. This is a description of the engineering approach, not a claim of a formal systems-architect job title.

The strongest recurring areas are programming-language and compiler engineering, systems architecture, symbolic cognitive computing, multi-agent platforms, and backend products. The public introduction should communicate the method as well as the technologies: research before commitment, explicit semantics and boundaries, implementation through controlled milestones, and verification against actual behavior.

### Omni — latest inspected repository evidence

- Latest inspected `main` commit: `27c55651d8d20c4d46d1fb28a3c440770b9d4363` (9 November 2026).
- The Rust, Clippy, security-audit, and CodeQL workflows for this head passed.
- The aggregate `Omni CI Pipeline` and a fuzz-dependency workflow failed on the same head. The current state is therefore mixed, not fully green.
- The repository README still names an earlier exact head (`3902f6d...`) as having passed a broader pipeline. That statement is not evidence for the newer `27c5565...` head; use live workflow runs for current claims.
- Formal foundation sign-off, complete-language conformance, production readiness, and self-hosting remain unresolved. The portfolio must not imply that green component checks qualify the full compiler.

### Project-inclusion boundary

AstraVCS is deliberately not added to the selected-work grid at this point. Its current public repository explicitly identifies itself as a documentation and project-handoff shell: the Rust workspace, Python reference implementation, tests, conformance programs, and original source history have not yet been imported. Historical audit figures are not fresh implementation evidence. Revisit portfolio inclusion only after the executable source is imported and independently revalidated.

The selected-work grid remains a curated 14-project list, not a claim that it contains every project or research workspace.


## Additional project-candidate assessment — 2026-11-11

The selected-work grid remains a curated 14-project inventory. A repository is not added solely because its README describes a broad feature set or a deployment URL.

### CivicGuide (repository: PromptWars-Virtual-2) — candidate for the next inclusion review

The README identifies the project as CivicGuide, a civic-tech election-process assistant. The inspected repository has a Next.js 16 / React 19 frontend, an Express 5 / TypeScript backend, shared types, English/Hindi/Marathi content, local browser persistence, geolocation-assisted guidance, and text-to-speech accessibility features. The README lists a Google Cloud Run URL.

The latest inspected repository commit is `f546d2c...` (2 May 2026). No GitHub Actions workflow runs were found. The listed Cloud Run URL could not be independently opened during the 11 November review. Therefore:
- Keep CivicGuide outside the public project grid until the actual deployed experience is independently verified.
- Verify clean frontend and backend installation/build/test commands.
- Inspect current roadmap/legal-content provenance, localization accuracy, privacy behavior, geolocation permission handling and accessibility.
- Establish the exact work personally authored and maintained before writing a case study.
- If accepted, give it a concise civic-tech/accessibility case study and preserve the distinction between repository claims and verified behavior.

### Miner — reviewed and not selected

The Miner repository's README describes an Android cryptocurrency-mining application. Its latest inspected code commit is 3 February 2026 and no Actions runs were found. It is not currently a strong fit for the portfolio's selected narrative of compiler, systems, symbolic-computing, agent-platform and backend engineering. Keep it excluded unless a specific, verifiable engineering contribution makes it materially valuable to the intended audience.

No selection decision above changes the existing 14-project inventory.


## Kilo Code fork evidence refinement — 2026-11-11

The public fork contains a substantial M2 durable-state foundation and an M3 execution bridge in the current source tree. The repository's own swarm qualification documents are more precise than its upstream-oriented top-level README. M2 has one located passing focused workflow on the earlier 24 October commit; M3 is still under qualification and requires current CI plus a real provider-backed workload. This does not establish production release or upstream Kilo Code functionality. See [PROJECT_EVIDENCE_REGISTER.md](PROJECT_EVIDENCE_REGISTER.md#15-kilo-code-fork-source-level-qualification-refinement--2026-11-11).


## Featured-project source-evidence update — 2026-11-11

The case-study audit now records:
- Mosaic's byte-authoritative tokenizer/TokenDocument work and the exact current nightly blockers (stable/nightly toolchain mismatch, Clippy in the exactness test, missing native low-memory test binary, and incomplete pip-install diagnostics).
- DNC's implemented StructuralProjector path and the discrepancy between the documented checkpoint validation contract and the checks in `Checkpoint.validate()`.
- UEP's implemented module boundaries and the concrete local-native identity-to-tenancy dependency violation.
- Tensor Ring's implementation scope, version mismatch and benchmark evidence limits.

No claim of production readiness is added. See [PROJECT_EVIDENCE_REGISTER.md](PROJECT_EVIDENCE_REGISTER.md#16-featured-project-source-and-failing-gate-refinement--2026-11-11).
