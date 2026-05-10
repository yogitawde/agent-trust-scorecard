# agent-trust-scorecard
A 6-dimension AI governance rubric for evaluating autonomous agent launch-readiness — grounded in NIST AI RMF and CMMI maturity standards. Built for senior PMs who need more than "does it work?

[Live Demo](https://r2dhq6.csb.app/)
---

## Why This Exists

Shipping an autonomous agent is not like shipping a feature. Agents plan, remember, and act across time. When they go wrong, the consequences are real — and often hard to reverse.

Most teams assess agent readiness informally. They ask "does it work?" instead of "is it trustworthy?" The Agent Trust Scorecard fills that gap. It gives PMs a structured, repeatable way to evaluate their agent before launch — and a shared language to align engineering, design, and leadership around what "ready" actually means.

---

## How It Works

Score your agent across 6 trust dimensions on a 1–5 rubric. Each level has a named maturity label and a plain-language description of what that looks like in practice. The scorecard produces an overall trust score and surfaces your weakest dimension as the priority focus area.

**Scoring scale — aligned to NIST AI RMF and CMMI maturity standards:**

| Level | Label | What it means |
|---|---|---|
| 1 | Undefined / None | No process, policy, or guardrail exists |
| 2 | Informal / Ad hoc | Exists by convention but not documented or enforced |
| 3 | Documented / Managed | Formally defined and consistently applied |
| 4 | Tested / Adaptive | Validated, measurable, and actively monitored |
| 5 | Optimized / Adaptive | Continuously improved, system-enforced, audit-ready |

---

## The 6 Trust Dimensions

### I — Intent Clarity
How clearly defined is the agent's purpose, goal, and scope?

A well-scoped agent has a documented purpose statement, explicit boundaries, and stakeholder alignment. Vague intent is the #1 root cause of agentic product failures — agents optimizing for the wrong thing, or expanding into unintended territory.

**Levels:** Undefined → Informal → Documented → Clear → Optimized

---

### M — Memory Safety
How responsibly is user data handled, retained, and protected?

Agents operate across sessions and accumulate context over time. Without deliberate memory design, they store more than they need, retain it longer than is safe, and give users no visibility or control. Memory design is a product decision, not just an engineering one.

**Levels:** Uncontrolled → Ad hoc → Managed → Controlled → Optimized

---

### P — Action Boundaries
How well-defined are the limits of what the agent can do autonomously?

Every agent action carries a blast radius. PMs must define what the agent can do, what it must flag for human review, and what it must never do — and document which actions are reversible vs. irreversible. This is the decision boundary that defines your trust model.

**Levels:** Unbounded → Informal limits → Categorized → Taxonomized → Optimized

---

### A — Autonomy Control
How much control do users and operators have over the agent's autonomy level?

Autonomy is not binary. It exists on a spectrum, and that spectrum should shift over time as trust is established. Users need the ability to adjust, override, and roll back autonomy — and the system should automatically recalibrate when trust signals degrade.

**Levels:** Fixed → Limited override → Configurable → Adaptive → Adaptive *(NIST AI RMF)*

---

### C — Transparency
How clearly does the agent communicate its reasoning, status, and decisions?

Agents that can't explain themselves get abandoned. Transparency is not a UX nicety — it is a trust primitive. PMs must design how the agent surfaces its plan, communicates uncertainty, handles failure, and gives users the ability to intervene and correct.

**Levels:** Black box → Minimal → Explained → Legible → Optimized

---

### T — Safety Rails
How robust are the guardrails against harmful or unintended agent behavior?

Safety in agentic systems is a product requirement, not an afterthought. PMs must define prohibited actions, test guardrails against adversarial inputs, document an incident response plan, and ensure a kill switch exists — and works.

**Levels:** None → Minimal → Basic rails → Tested → Optimized

---

## Scoring Interpretation

| Overall Score | Verdict | What to do |
|---|---|---|
| 4.0 – 5.0 | Ship-ready | Meets senior PM trust standards across all dimensions |
| 3.0 – 3.9 | Nearly there | Strong foundation — tighten weaker dimensions before launch |
| 2.0 – 2.9 | Needs work | Significant trust gaps — revisit before building further |
| 1.0 – 1.9 | Not ready | Critical foundations missing — pause and address first |

---

## How to Use This

**In pre-launch reviews:** Run through each dimension with your engineering and design partners. Use the rubric descriptions to reach a shared score — not one person's intuition.

**In PRD writing:** Use the 6 dimensions as a trust section in your agent PRD. Document current scores and target scores for launch.

**In stakeholder communication:** Use the overall score and focus area to frame launch readiness conversations with leadership. A score of 3.2 with a weak Safety Rails dimension is a clearer conversation than "we think it's mostly ready."

**In retrospectives:** Re-score after incidents. The dimension that dropped is usually where the gap was.

---

## Standards Alignment

This scorecard draws from the following frameworks:

- **NIST AI Risk Management Framework (AI RMF)** — governance tiers and adaptive autonomy language
- **CMMI Maturity Model** — 5-level maturity scale and "Optimized" Level 5 terminology
- **EU AI Act** — risk assessment requirements for high-risk AI systems
- **OWASP AI Security** — adversarial input and prompt injection considerations

---

## Part of the IMPACT Framework

This scorecard is a companion tool to the **IMPACT Framework** — a senior PM's framework for building autonomous agent products.

| Tool | Purpose |
|---|---|
| [IMPACT Framework](../impact-agentic-framework) | How to *design* a trustworthy agent |
| Agent Trust Scorecard | How to *evaluate* one before you ship |

---

## Related Tools

This scorecard is part of a growing series of AI governance tools for senior PMs building autonomous agent products.

| Tool | Purpose |
|---|---|
| [IMPACT Framework](https://github.com/yourname/impact-agentic-framework) | How to *design* a trustworthy autonomous agent |
| Agent Trust Scorecard ← you are here | How to *evaluate* one before you ship |

Each tool is standalone — but they're most powerful used together. Use IMPACT during discovery and scoping. Use the Agent Trust Scorecard when you're approaching launch.

---

## About

Built by a senior PM focused on agentic AI product development and AI governance. Designed to fill the gap between "does it work?" and "is it trustworthy?" — a distinction that matters more as agents become more capable.

---

*Fork it, adapt it, make it yours. Star the repo if you want to follow updates.*
