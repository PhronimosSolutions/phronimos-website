---
title: AI consultant vs in-house hire vs platform — how to choose
description: A side-by-side of the three ways to buy AI capability, plus the fourth option most 5–50 person firms don't know they have.
pubDate: 2026-08-13
updatedDate: 2026-08-13
---

For a 5–50 person firm, the honest answer is: a consultant costs $10,000–$50,000 and leaves, an in-house AI engineer runs $140,000–$220,000 a year and takes months to hire, and a platform costs $30–$150 per user per month but hits a ceiling. The option most owners don't consider — a managed operator — sits between them at about $5,000 a month.

## What are the four real options?

There are technically dozens of shapes, but for a 5–50 person firm they collapse to four. Everything else is a variation on one of these.

| Option | Time to first working workflow | Ongoing cost | Ownership of code | Covers the 4 silent-failure modes | Ability to iterate |
|---|---|---|---|---|---|
| Consultant (build-and-leave) | 6–16 weeks | $0 direct (but drift compounds) | You own the artifact | No — monitoring is out of scope | High during build, zero after |
| In-house AI engineer | 4–8 months (hiring + first build) | $140k–$220k / yr fully loaded | You own everything | Yes if they build for it | High, if you can retain the person |
| Enterprise platform (Copilot Studio, Agentforce, etc.) | 4–12 weeks with an implementation partner | $30–$150 per user / mo + $25k–$100k partner fees | Vendor owns the runtime; you own the config | Partially — vendor tells you when their side is down, not when your workflow is wrong | Bounded by what the platform allows |
| Managed operator (Fractional AI Officer) | ~4 weeks from kickoff to first workflow live | $5,000 / mo | You own the workflows; the operator owns the operation of them | Yes — this is what the operator is paid to do | High, one to two active requests at a time |

The table is the piece to sit with. The rows aren't rank-orderable in the abstract — the right answer depends on what a firm actually has and actually needs.

## When does an in-house hire pencil out?

An in-house AI engineer makes sense when a firm has enough AI-adjacent work to keep one person busy full time — call it 30+ hours per week of genuinely engineering-shaped work — and can afford the 4–8 month gap between "we need someone" and "someone is shipping." For most 5–50 person firms, that math doesn't work. The demand is 2–4 workflows and a monitoring layer, which is 8–15 hours of steady-state work per week. Hiring for that is buying capacity you can't consume.

The other consideration is retention. A single AI engineer at a small firm is a single point of failure with an outside offer arriving quarterly. Losing them without a replacement in flight means the workflows they built quietly start rotting.

## When does a consultant make sense?

When the firm knows exactly what they want built, has the internal capability to operate and monitor it after handover, and has a specific budget for a one-time capital expenditure. That's a real profile — usually a firm with an existing operations lead who already runs systems and just needs the build capacity for six weeks.

The failure mode is buying a consultant because "we need AI" and expecting the artifact they hand over to keep working. It won't. The four silent-failure modes ([/reliability/](/reliability/)) start firing within weeks of go-live, and the consultant isn't there to catch them.

## When does an enterprise platform make sense?

When the firm is already deep in the vendor's ecosystem — a Salesforce shop rolling out Agentforce, a Microsoft 365 shop configuring Copilot Studio. The platform's leverage is that everything the workflow needs to touch is already inside the same tenancy. Auth, permissions, and data are handled.

The ceiling shows up in two places. First, workflows the platform doesn't natively support (external SaaS the vendor doesn't have a connector for, custom data sources, judgment-heavy steps) either can't be built or require expensive extensions. Second, when the workflow fails in a way the vendor's monitoring doesn't see — the platform tells you when *it* is down; it doesn't tell you when your workflow's output is wrong.

## What does the managed operator option actually look like?

A managed operator — sometimes called AgentOps, though the term isn't ours to own — is a fixed monthly retainer for someone who runs your AI workflows on your behalf. Not just building them: operating them. Monitoring for the four silent-failure modes, responding when they fire, maintaining the workflows as the underlying systems change, and rolling out the next workflow as capacity allows.

At Phronimos this is the Fractional AI Officer retainer, at $5,000 a month, sized to roughly one junior engineering hire's worth of capacity without the salary, benefits, or onboarding cost. Details on what it covers: [/services/fractional-ai-officer/](/services/fractional-ai-officer/).

## The one decision the table doesn't show

None of these options are mutually exclusive. A firm can run one workflow on Copilot Studio, have a Fractional AI Officer operate a second on custom infrastructure, and pull in a consultant for a specific one-time build. The trap is picking one option because it's the option and forcing every workflow through it. The workflows have shapes; match the option to the shape.

For a diagnostic on what your existing workflows actually need: [/ai-workflow-audit/](/ai-workflow-audit/). For the full price ladder side-by-side: [/pricing/](/pricing/).

---

*Last reviewed: 2026-08-13.*
