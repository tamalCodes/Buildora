# Prompt: Generate Agent Spec Files for Buildora V2

> Paste everything below the line into a fresh Claude session opened at the repo root
> (`/Users/tamalcodes/Gh/Buildora`). It produces a self-maintaining spec system that
> downstream agents read before doing any task.

---

## ROLE

You are a **principal engineer + AI context architect**. Your job is NOT to change app
code. Your job is to produce **spec files** — durable, machine-first context documents —
that any future Claude/agent reads *before* touching this codebase, so it acts with full
knowledge of the dependency graph, feature flows, and conventions without re-deriving them.

Optimize every spec for **agent consumption**, not human prose:
- High signal, zero filler. Tables and lists over paragraphs.
- Every claim grounded in a real file path. No invented APIs.
- Stable anchors (`<!-- anchor:id -->`) so future edits are surgical.
- Each spec ends with machine-checkable invariants an agent can self-verify against.

## INPUTS (read in this order, do not skip)

1. `CLAUDE.md` and `AGENTS.md` — declared conventions. Treat as intent; verify against code.
2. `graphify-out/GRAPH_REPORT.md` — community hubs (the feature/module clustering).
3. `graphify-out/graph.json` — the actual graph: `graph.hyperedges[]` (feature modules,
   relation + confidence + source_file) and node/edge lists. This is your **ground truth
   for how files link**. Parse it, don't eyeball it.
4. `graphify-out/manifest.json` — file inventory + mtimes (use for staleness checks).
5. `architecture.md` + `architecture/` — declared architecture.
6. The source tree itself: `apps/web/src/features/*`, `apps/api/src/*`,
   `packages/shared/src/*`. Code wins over docs on any conflict — flag the conflict.

> When graph.json and the code disagree, trust the code and record the discrepancy in the
> spec's "Drift" section. The graph is a snapshot from `graphify-out` mtime; it may be stale.

## METHOD

1. **Build a feature inventory** from `graph.json` hyperedges (each `relation:"implement"`
   hyperedge ≈ one feature module) cross-checked against `apps/web/src/features/*` dirs
   (auth, builders, explore, hackathons, legal, profile, projects, settings) and
   `apps/api/src/*` resources (auth, profile, health, lib).
2. For each feature, trace the **full vertical slice** using graph edges:
   UI component → hook (React Query) → service (`services/*`) → `apiClient` → API route →
   controller → validator (Zod) → mapper → Supabase → back through `ApiResponse<T>` →
   shared types in `packages/shared/src/types.ts`.
3. Record **consumption**: who imports whom, which shared components/types each feature
   reuses, and what is fanned-in vs fanned-out (use graph degree as the hint, verify imports).
4. Note **conventions actually followed** vs the ones declared in CLAUDE.md (naming,
   controller pattern, mapper pattern, guard HOCs, lazyImport code-splitting).

## OUTPUTS — write these files

Create under `agent-specs/`:

```
agent-specs/
  SPEC_INDEX.md              # router: which spec to read for which task + global invariants
  frontend/
    _FRONTEND_OVERVIEW.md    # web app shape, routing, services, shared UI, data-flow rules
    <feature>.spec.md        # one per web feature (auth, builders, explore, hackathons,
                             #   legal, profile, projects, settings)
  backend/
    _BACKEND_OVERVIEW.md     # express app, middleware, auth, supabase, error envelope
    <resource>.spec.md       # one per api resource (auth, profile, health)
  shared/
    contracts.spec.md        # packages/shared types + Zod schemas as the FE/BE contract
```

### Every spec file MUST use this template

```markdown
---
spec: <feature-or-resource name>
layer: frontend | backend | shared
owns: [ <glob paths this spec governs> ]
depends_on: [ <other spec names> ]
graph_source: graphify-out/graph.json#<hyperedge id or community>
generated_from_mtime: <newest mtime of owned files from manifest.json>
last_verified: <YYYY-MM-DD>
---

## Purpose
<2-3 lines: what this slice does in product terms.>

## File Map
| File | Role | Imports (key) | Imported by |
|------|------|---------------|-------------|
<every file this spec owns, with its job and graph-derived links>

## Data Flow
<the vertical slice as an ordered list or arrow chain: component → hook → service →
 route → controller → validator → mapper → supabase → ApiResponse<T> → shared type.
 Reference exact symbols and file:line.>

## Contracts
<request/response shapes, Zod schemas, shared types this slice produces/consumes.>

## Conventions In Force
<patterns an agent MUST follow when editing here, each tied to an existing example
 file:line so the agent can copy the pattern.>

## Extension Recipe
<step-by-step: "to add a new <thing> in this feature, touch these files in this order".>

## Invariants (self-check)
<bullet list of machine-checkable rules, e.g. "every controller calls
 getAuthenticatedUser before Supabase query"; "every service method is static";
 "no UI component imports supabase directly". Write them so a future agent can grep/verify.>

## Drift
<discrepancies found between graph.json / CLAUDE.md / architecture.md and actual code.
 Empty if none. This is where staleness is recorded.>
```

### SPEC_INDEX.md additionally contains
- A **task→spec routing table**: "working on X → read these specs first."
- **Global invariants** that span the whole repo (envelope shape, path aliases, auth flow,
  shared-types-as-single-source-of-truth).
- A **regeneration protocol** (see below).

## SELF-UPDATE PROTOCOL (put this verbatim into SPEC_INDEX.md)

> Specs are living. Before starting a task, an agent reads the relevant spec(s). After
> changing code, the agent MUST: (1) update the `File Map`, `Data Flow`, and `Contracts`
> sections of every spec whose `owns` globs matched a changed file; (2) bump `last_verified`;
> (3) append any new mismatch to `Drift`. If a change spans files no spec owns, create a new
> spec from the template and add it to SPEC_INDEX. A spec is stale when an owned file's mtime
> exceeds `generated_from_mtime` and `last_verified` predates the change — flag stale specs
> at task start instead of trusting them blindly.

## RULES

- Ground everything in real paths; if you can't find it, say so — never fabricate.
- Do not edit app code or the graphify output. Only write under `agent-specs/`.
- Prefer tables/lists; keep prose minimal. Target agent legibility, not human polish.
- Cite `file.ts:line` for every non-obvious claim.
- If `graph.json` is large, parse the relevant hyperedge by id rather than loading it whole.

## DELIVERABLE

After writing all files, print a summary table: spec name · files owned · #invariants ·
#drift items found. Then stop.
```
