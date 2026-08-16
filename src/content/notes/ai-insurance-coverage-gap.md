---
title: The AI insurance coverage gap
description: Your insurer just stopped covering AI failures. ISO added a generative-AI exclusion to commercial general liability in January 2026, and D&O and EPLI carriers are adding absolute AI exclusions. Documented controls are the only remaining mitigation.
pubDate: 2026-08-13
updatedDate: 2026-08-13
---

Your insurer just stopped covering AI failures; documented controls are the only remaining mitigation. In January 2026, ISO — the Insurance Services Office, which publishes the standard policy language most US commercial general liability carriers use — added a generative-AI exclusion to CGL policies. D&O and EPLI carriers followed with "absolute" AI exclusions covering governance failures. For a small business running AI in customer-facing workflows, this changes the risk math: the coverage that used to soften the blow when something went wrong is no longer part of the calculation.

## What actually changed in January 2026

Three things, at different layers of the coverage stack:

- **ISO's endorsement CG 21 68 (illustrative wording) added to standard commercial general liability.** The exclusion applies to bodily injury, property damage, and personal and advertising injury arising out of the use of generative AI. Carriers using ISO forms have been attaching it since Q1 2026 renewals; independent-form carriers are following with substantially similar language on their own timetables.
- **Directors & Officers policies adding "absolute" AI exclusions.** These target claims alleging that management failed to establish or enforce adequate AI governance. Broad wording. "Absolute" in insurance means no carve-backs — no exception for defense costs, no exception for regulatory investigations.
- **Employment Practices Liability carriers adding AI exclusions covering algorithmic hiring and management decisions.** Claims of AI-driven discrimination in hiring, promotion, or termination are being explicitly excluded from renewal quotes.

Not every carrier has moved yet. Not every policy in force today has the exclusion. The direction is one-way, and it's the direction every SMB owner should be planning around, not against.

## What "AI failure" means in this context

For an SMB, the failures the exclusions apply to are not sci-fi scenarios. They are:

- **A client-facing error.** An AI-drafted email sent to the wrong client with the wrong information. An AI-generated quote off by an order of magnitude. An AI-classified lead misrouted for weeks.
- **A discrimination claim.** An AI-assisted hiring or underwriting decision alleged to have produced disparate outcomes for a protected class.
- **A governance failure.** A shareholder derivative suit — or the small-firm equivalent, a member dispute — alleging that leadership failed to establish adequate AI controls before deploying a system that then caused harm.
- **A regulatory investigation.** A state attorney general, FTC, or state insurance department opening an inquiry into an AI-driven consumer harm.

Before the exclusions, some subset of the defense costs and settlement for each of these would have been carried by the CGL, D&O, or EPLI policy respectively. After the exclusions, that subset drops to zero for the AI-caused piece.

## What "documented controls" means

If the policy no longer softens the blow, the mitigation is upstream: prevent the harm, and — when something does go wrong — be able to show a plaintiff, a regulator, or a carrier that the firm operated the system with reasonable care.

Four documentation artifacts do most of the work:

- **An audit trail per AI decision.** Inputs the system received, output it produced, downstream action taken, and any human override, with timestamps. Retention set to match the longest applicable statute of limitations.
- **A monitoring posture for silent failures.** Alerts on the four silent-failure modes — bad output on green status, dropped triggers, stalled schedules, downstream data loss — with defined thresholds and defined escalation. Detail at [the honest failure modes of business AI agents](/notes/honest-failure-modes-of-business-ai-agents/) and the operational form at the [reliability standard](/reliability/).
- **A written escalation and incident response plan.** Who gets paged when a monitor fires, what the human takeover looks like, and how the incident is recorded and closed.
- **A written AI program describing the controls.** The policy document itself, updated when the systems change. For regulated verticals, this is also the artifact a state examiner will ask for — see [NAIC AI governance for a small insurance agency](/notes/naic-ai-governance-for-smb-insurance/) for the insurance-specific requirements.

None of the above prevents every possible AI failure. All of the above materially reduce both the probability of a claim and — critically — the plaintiff's or regulator's ability to argue the firm operated without reasonable care.

## What this note is not

This is not legal advice, and it is not insurance advice. Every SMB should walk its actual policies through with its broker and its counsel — the exclusion wording varies by carrier and by state, the renewal cycle matters, and some carriers are offering an affirmative AI endorsement (paid buy-back of coverage, sometimes conditional on documented governance) as an alternative to the blanket exclusion. Those conversations should happen at the next renewal, not deferred.

The point of this note is upstream of the policy conversation: whatever coverage the firm negotiates, the plausibility of the coverage response depends on the firm being able to show documented controls. A firm with no monitoring, no incident log, and no written program is a firm that, when something goes wrong, has fewer options with the carrier, more exposure to the plaintiff, and a harder conversation at the next renewal.

## What Phronimos does about it

The [Fractional AI Officer retainer](/services/fractional-ai-officer/) is what runs the monitoring posture, produces the audit trail, and maintains the written record. The [Agent Reliability Review](/ai-workflow-audit/) is the front-door engagement that inventories what a firm has in production today and produces a baseline for the same. Both are operational engagements — they produce the evidence a coverage conversation needs, and leave the coverage negotiation itself to the firm's broker and counsel.

---

*Last reviewed: 2026-08-13.*
