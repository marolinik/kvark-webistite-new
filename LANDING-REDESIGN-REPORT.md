# KVARK Landing Page Redesign — Final Report (2026-07-07)

## PHASE 2 UPDATE — Sovereign AI Insights content hub (same day)

**Result: Judge verdict PASS — 9.0/10** (authority 8.8 · return_value 9.0 · editorial 9.2) with explicit YES to "would a buyer come back for news/knowledge — trusted vendor?" after 2 judge rounds (8.9 → 9.0).

**What was built:**
- `/resources/insights` hub — 9 evidence-first articles across 5 categories (Briefing / Regulation / Open Models / Infrastructure / Guides), category filters, featured card
- Flagship format: **monthly sovereign-AI briefing** (July 2026 edition live, cross-linked to deep dives)
- Retention loop: email subscribe (posts to existing send-email backend, flagged `[Sovereign AI briefing subscription]`) + RSS feed (`/insights-feed.xml`) + homepage Insights section + footer/navbar links
- Article pages: TL;DR boxes, inline cross-links, sources & further reading (primary-source discipline), Article JSON-LD, per-article SEO meta, subscribe capture, related-articles rail
- All 10 new routes prerendered; `public/llms/insights.md` for LLM crawlers
- Content grounded in 3 research sweeps (buyer requirements, July-2026 news, 54-entry canonical resource library) — every claim dated + sourced; unverifiable items (e.g. an aggregator-only "€850k first NIS2 fine") were **removed** rather than kept

**NotebookLM** (no public API — cannot push into your notebook automatically): import-ready pack at `docs/notebooklm-source-pack.md` (54 annotated primary sources on in-house deployment, open-weight models, EU regulation, TCO) + `docs/sovereign-ai-news-july-2026.md` (dated news digest). Import via Add source → Website per URL.

**⚠️ Flag for review (phase 2):**
1. RSS feed is hand-maintained (`public/insights-feed.xml`) — update it when publishing new articles, or automate generation later.
2. Briefing subscriptions arrive as emails flagged `[Sovereign AI briefing subscription]` — someone must maintain the actual mailing list and send the monthly email.
3. Judges recommend named practitioner bylines (currently "KVARK Research") — assign real authors when ready; one field per article.
4. Next briefing is implicitly promised for August — keep the cadence or the trust mechanism inverts.

---


**Result: Judge verdict PASS — 9.0/10 overall** (content 8.8 · usability 9.2 · design 9.0) after 6 independent judge rounds (8.3 → 8.8 → 8.9 → 8.8 → 8.9 → **9.0 PASS**). Each judge was a fresh agent grading as a CISO/DPO buyer, a CRO expert, and a product designer against Glean/Mistral/Cohere/Zylon-tier pages.

Preview: dev server running at http://localhost:5199/ · `npm run build` passes (tsc, eslint, prerender all green).

## What was built (11-section landing, from 5)
1. **Hero** — "Enterprise AI that never leaves your walls" + sovereign-perimeter diagram (replaced stock Lottie), dual CTA, 4 proof bullets
2. **Trust bar** — Egzakta Group facts (2006, 240+, 350+, 100+) + labeled ecosystem logos
3. **Why sovereign** — shadow-AI urgency + 6 enterprise challenges (briefing p.4) + "EU region ≠ sovereignty" wedge
4. **Platform** — retained animation, renamed features (Semantic search, Context boards, Customer-facing AI), governed-LLM-gateway caption, fixed copy bugs incl. "Al assistant" typo
5. **Governance (dark)** — GDPR/EU AI Act/NIS2/DORA/CRA cards with article-level citations + evidence-grade audit-trail card + permission-aware banner
6. **Industries** — regulated-vertical tabs (Public Sector, FinServ, Healthcare, Critical Infra) w/ a11y-complete tab wiring
7. **Proof (dark)** — AOFI case study w/ attributed metrics (80% / 50–70% / 2× / 6mo→2wk) + traction facts
8. **TCO** — bar chart (−86% 5-yr, €448k vs €3,154k) w/ disclosed assumptions + LM TEK 4U8G server card
9. **Deployment** — Air-gapped/On-prem/Private-cloud cards + OSS stack transparency (DORA exit rights) + 4-phase methodology
10. **FAQ** — 8 procurement objections incl. honest certifications answer and deployment timeline
11. **Demo (dark)** — "What happens next" 3 steps, trimmed form (phone/comments optional, briefing checkbox), aria-live success panel, persistent errors w/ email fallback

## Trust-coherence hardening (the site practices what it preaches)
- **GTM consent-gated**: loads only after explicit opt-in (ConsentBanner); `pushEvent` also gated; withdrawal via footer "Cookie settings" (verified live)
- **Self-hosted Poppins** (@fontsource) — no pre-consent requests to Google
- **Privacy Policy**: new Cookies & Analytics section (GTM, Art. 6(1)(a), localStorage key, withdrawal); B2C template residue removed (booking/personalized-offers/bundled-consent/repeat-request overreach); demo-form data scoped away from marketing; https links; h1 fix
- **Accessibility**: AA contrast bumps (dark-section metadata → neutral-300), aria-labels/status/alert on form, tab keyboard nav, prefers-reduced-motion, scroll-margin for anchors, mobile field stacking, persistent mobile CTA

## Copy accuracy guardrails honored (from platform-code survey of D:\Projects\KVARK-main)
"Permission-aware, mirrors source ACLs (fail-closed)" not "datapoint-level"; "20+ prebuilt connectors" (24 in code) consistent everywhere; no invented certs/logos/quotes; no fake AI-Act-deadline urgency.

## ⚠️ Flag for review before launch
1. **Privacy Policy edits** (scoped-consent clauses, Art. 12(5) rewording, recipients pruning) — have legal review; edits were conservative/additive but it's a legal document.
2. **"We'll reply within one business day"** (form success) — confirm ops can honor.
3. **Backend**: form still posts to `/api/send-email.php`; phone/stateProvince now sent as empty strings, briefing request prefixed into `comment` — verify the PHP accepts optional phone.
4. Judge's remaining minors (nice-to-have): real role-attributed AOFI quote, 2× logo assets, features-diagram chip density.

## Artifacts
- Research: scratchpad `research-buyers.md`, `research-competitors.md`, `research-conversion.md`, `platform-facts.md`, `landing-spec.md`, `design-audit.md`
- Screenshots: scratchpad `v1–v6-*.jpeg` (desktop + mobile, all rounds)
- All 6 judge verdicts with full deduction lists are in the session transcript.
