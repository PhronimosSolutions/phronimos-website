---
title: NAIC AI governance for a small insurance agency
description: The NAIC Model Bulletin has been adopted in 24 states and sets five requirements for any insurer or producer using AI. This is what a 5–50 person agency actually has to document.
pubDate: 2026-08-13
updatedDate: 2026-08-13
---

If an insurance agency uses AI anywhere in the workflow — quote intake, renewal triage, underwriting assistance, claims routing, customer messaging — the NAIC Model Bulletin on the Use of Artificial Intelligence Systems by Insurers is the regulatory frame. It has been adopted in 24 states as of mid-2026. The bulletin sets five requirements, and a small agency's job is to have written evidence of each one. Documented governance controls are the mitigation.

## What the NAIC Model Bulletin actually requires

Five requirements, each of which becomes a deliverable an agency needs to be able to show a regulator on request:

1. **A written AI program.** A document that describes how the firm uses AI, what systems are in scope, and what the internal policies are for evaluation, deployment, and monitoring. Not a slide deck. A written policy that a regulator can read.
2. **A governance and accountability structure.** A named person or role responsible for the AI program. Reporting lines. Who approves a new AI use, who monitors it after it ships, who gets called when it fails.
3. **Validation and testing.** Evidence that each AI system in use has been tested before deployment and continues to be tested after. This includes bias testing where the system touches consumer decisions.
4. **Record retention.** Logs of AI decisions, inputs and outputs, and the retention of those records for the period the state requires.
5. **Third-party vendor diligence with audit rights.** If the AI system comes from a vendor — including a general-purpose model provider, a workflow platform, or an integration partner — the agency's contract needs to include diligence documentation and the right to audit.

The bulletin does not tell an agency which AI tools to use or not use. It says: whatever you use, you need to be able to show you evaluated it, you're monitoring it, you have someone accountable for it, and you can produce records if asked.

## Why the "written program" requirement trips up small agencies

The written AI program is the requirement most 5–50 person agencies underestimate. The instinct is to treat it as a compliance checkbox — one page, get it in the binder, move on. The bulletin's actual expectation is that the program describes real practice: real evaluation criteria, a real monitoring posture, real incident response.

An agency that ships an AI-assisted quote workflow with no written program has three practical exposures: the state regulator on examination, the E&O carrier at renewal, and — increasingly — the carrier partner asking what AI is in the intake pipeline before they'll appoint the agency.

## What "documented controls" means in practice

Four things, at a minimum, per AI system in production:

- **What the system does, in plain language.** Which inputs it receives, what outputs it produces, which downstream systems consume those outputs, and what a human sees.
- **The monitoring posture.** How the firm knows the system is still behaving. This is where the four silent-failure modes — bad output on green status, dropped triggers, stalled schedules, downstream data loss — need actual alerts, not intentions. See [the honest failure modes of business AI agents](/notes/honest-failure-modes-of-business-ai-agents/).
- **The escalation path.** Who gets paged when something breaks, in what order, and what the human takeover looks like.
- **The evidence archive.** Logs of inputs, outputs, and human overrides, retained for the state's required period.

The [reliability standard](/reliability/) that Phronimos publishes — detection targets, response times, SLA credits — is the operational half of this. The written AI program is the policy half. An agency needs both.

## This is one vertical example among several

The NAIC bulletin is what applies if the firm is an insurance producer or carrier. Similar governance dynamics apply in other verticals with different regulators: state bar rules on AI use in legal work, HIPAA and the HHS AI guidance in healthcare, FTC unfair-practice enforcement across consumer-facing use. The specifics differ; the underlying requirement — a written program, a named owner, monitoring evidence, a retention policy, and vendor diligence — is the same shape. An SMB running AI in any regulated workflow needs some version of this documentation.

For insurance specifically, this is one of two regulatory forces pointing in the same direction. The other is the [AI insurance coverage gap](/notes/ai-insurance-coverage-gap/): the ISO commercial general liability generative-AI exclusion that took effect January 2026, and the D&O and EPLI carriers adding absolute AI exclusions. When a carrier stops covering AI failures, documented governance is what remains.

## What Phronimos does about it

The [Agent Reliability Review](/ai-workflow-audit/) inventories AI systems in production, tests each against the four silent-failure modes, and produces a monitoring posture that maps onto the NAIC bulletin's testing and record-retention requirements. The [Fractional AI Officer retainer](/services/fractional-ai-officer/) runs that monitoring posture on an ongoing basis and provides the audit-ready evidence archive. Neither is legal counsel — the written AI program itself is best drafted with the agency's compliance counsel, using Phronimos's technical documentation as an input.

---

*Last reviewed: 2026-08-13.*
