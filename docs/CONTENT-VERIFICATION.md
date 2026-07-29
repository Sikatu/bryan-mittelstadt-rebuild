# Content Verification System

Last updated: July 29, 2026

Phase 2 replaces informal TODO comments with a machine-readable evidence and approval ledger.

## Source of Truth

The canonical verification manifest is:

```text
src/content/content-verification.json
```

It contains:

- A source registry with public URLs, internal captures, and the pending client-approval source.
- One record for each material public claim, integration, or launch asset.
- A verification status.
- A publication state.
- The source IDs supporting the item.
- A concrete owner action whenever review or delivery is still required.

Typed access helpers are available in:

```text
src/content/verification.ts
```

## Status Definitions

| Status | Meaning |
|---|---|
| `verified-primary` | Supported by an authoritative or first-party primary source. |
| `confirmed-public` | Published on Bryan's official website or another identified public profile. |
| `client-review-required` | Traceable to public or legacy material but should be reconfirmed before launch. |
| `client-approved` | Explicitly approved by Bryan or an authorized representative. |
| `pending` | Required input or asset has not been supplied. |
| `intentionally-omitted` | Deliberately withheld from public display. |

## Publication States

| State | Meaning |
|---|---|
| `published` | Visible in the current rebuild. |
| `withheld` | Not displayed until approved or supplied. |
| `placeholder` | A temporary visual substitute is still present. |

## Validation

Run:

```bash
npm run audit:content
```

The audit validates:

- Unique source and record IDs.
- Valid statuses and publication states.
- Existing local source paths.
- Valid source references.
- Owner actions for pending and review-required items.
- No pending or intentionally omitted record marked as published.
- Traceability from public typed content configuration to the manifest.
- A summarized client approval queue and launch-blocker count.

The full project gate is:

```bash
npm run check
```

## Current Evidence Corrections

Phase 2 also makes two factual improvements:

- The public IMDb profile is now connected using its identified canonical URL.
- The Durango recognition uses the festival's published award category: Jury Award — Best Performance Actor, Narrative Feature.

## Approval Policy

Public copy can remain visible when it is traceable to Bryan's existing public material, but all `client-review-required` items must be approved or revised before the release candidate is frozen.

No record should be promoted to `client-approved` without explicit written approval from Bryan or an authorized representative.
