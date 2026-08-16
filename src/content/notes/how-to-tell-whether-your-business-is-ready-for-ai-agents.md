---
title: How to tell whether your business is ready for AI agents
description: A plain-language readiness checklist for a 5–50 person firm, plus the scorecard that turns it into a recommendation.
pubDate: 2026-08-13
updatedDate: 2026-08-13
---

A 5–50 person firm is ready for AI agents when five things are true: at least one recurring workflow is documented, the data the workflow touches is reasonably clean, a decision-maker can approve scope changes within a business day, there is budget for iteration rather than a single big-bang launch, and the firm is willing to run a bounded pilot before scaling. Miss any of these and the timeline stretches — miss two and the project usually stalls.

## Why does readiness matter?

Because the failure mode for AI adoption in a small firm is almost never model capability. It's the firm not being ready to operate the thing the model can now do. The question worth asking, before scoping any implementation, is whether the operational surface around the workflow can hold the workflow up. The checklist below is that question, broken into criteria that can be answered honestly in twenty minutes.

## The readiness checklist

Five criteria. Each is a yes or no. Three or more yeses is a green light for a first sprint. Fewer than three means the readiness gaps should be closed first, or a diagnostic review should scope the workflow more tightly than a full sprint.

### 1. Do you have at least one workflow you can describe end-to-end?

Not "we do intake" — that's a category, not a workflow. A workflow, for readiness purposes, is a specific sequence: this event triggers, then this person does this, then this happens in this tool, then this output goes to this destination. If the team can walk through it with a stopwatch, it's a workflow. If the answer is "it depends who's doing it that day," the process needs to be described before it can be automated. The description itself typically takes 2–4 hours per workflow.

### 2. Is the data the workflow reads and writes reasonably clean?

Reasonably, not perfectly. A CRM where 80% of contact records have a valid email is workable. A CRM where the industry field is filled in for 60% of accounts and the other 40% is blank is workable — as long as you know which is which. A CRM where the same customer exists three times under three spellings, none of which are linked, is not workable until it is. Data cleanliness is a rolling requirement — the workflow will surface data problems the team didn't know it had, and someone has to be willing to fix them.

### 3. Is there a decision-maker who can approve scope changes within a business day?

The single largest predictor of on-time delivery is decision-maker access. During a sprint, scope questions come up — an edge case surfaces, an integration turns out harder than expected, a stakeholder wants an added output. If the person who can decide is reachable within a business day, the sprint stays on schedule. If every decision waits for the next weekly meeting, a 4-week sprint becomes a 10-week sprint. This is a resourcing question, not a technical one.

### 4. Is there budget for iteration, or only for a one-time build?

The one-time-build model is where most SMB AI projects go to die. A workflow shipped and then abandoned starts drifting from reality the day it ships. Budget for iteration means at minimum a monthly maintenance envelope — either an in-house engineer with time carved out or a retainer with an outside operator. If the mental model is "we pay $10,000 and then it just runs," the firm isn't ready yet. That belief is what the four silent-failure modes exploit.

### 5. Is the firm willing to run a bounded pilot before scaling?

A bounded pilot is one workflow, in one part of the business, with a clearly defined success metric, run for at least 60 days before the second workflow is scoped. A firm that wants to "roll out AI across the whole company" as a first move is describing an outcome, not a plan. The pilot exists to surface everything the requirements doc missed — usually about a dozen things per workflow. Firms that skip the pilot skip the learning and pay for it in the second workflow.

## Readiness by scenario

| Firm profile | Typical readiness score | Recommended next step |
|---|---|---|
| Owner-operated, no documented processes, "I do it in my head" | 0–1 of 5 | Document 1–2 core workflows before any AI scoping — 4–8 hours of internal work |
| Small ops team, some SOPs, decision-maker is the owner | 2–3 of 5 | Agent Reliability Review to scope one workflow tightly; sprint only if the review confirms readiness |
| Ops manager in place, most workflows documented, clean-ish CRM | 3–4 of 5 | First sprint on the highest-leverage workflow; retainer starts at go-live |
| Ops manager + technical lead, integrations already in place | 5 of 5 | Sprint on 1–2 workflows; retainer starts at go-live; second sprint scoped at day 60 |

## What if the score is low?

The mistake is not to declare the firm "not ready" and stop. The mistake is to launch a full AI implementation and watch it stall. Low scores are addressable: workflows can be documented in a week of focused effort, data can be cleaned incrementally as a workflow surfaces problems, decision cadence can be tightened by naming an accountable owner for the project, and iteration budget can be created by starting smaller than initially planned.

The Agent Reliability Review is often the right first step for a low-score firm — not because it's the cheapest, but because it's the least-committing artifact that produces a real plan. It scopes one workflow, checks readiness explicitly, and either recommends a sprint or names the specific gaps to close first.

## The interactive version

The [Reliability Readiness Scorecard](/tools/reliability-readiness-scorecard/) is the interactive version of this checklist, expanded to ten questions that also cover whether agents are already in production, how you'd know if one silently failed, and what the blast radius of a failure would be. Results are on-screen, no email gate, formula visible below the fold.

For the full offer ladder — review, sprint, retainer — and how they compose: [/pricing/](/pricing/). For what the review actually checks: [/ai-workflow-audit/](/ai-workflow-audit/). For the reliability standard the retainer runs against: [/reliability/](/reliability/).

---

*Last reviewed: 2026-08-13.*
