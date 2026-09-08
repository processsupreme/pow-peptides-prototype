# POW! Peptides responsive prototype

An accessible, responsive front-end prototype built from the August 28, 2026 POW! wireframe handoff. It uses local mock state only and intentionally does not connect production commerce or identity services.

Product strengths, per-vial prices, and stock counts now use POW's September 8 supplied inventory, confirmed by the user as the source of truth. The catalog contains 38 product families and 39 stocked variants (19,050 vials). See [inventory maintenance](docs/INVENTORY.md). Placeholder strength generation and automatic merchandise discounts have been removed; checkout, fulfillment, and shipping remain demonstrations.

## Run locally

```bash
npm ci
npm run dev
```

Open the local URL shown in the terminal. Use `npm run build` for the deployment build.

All development and builds run on the Mac mini at `/Users/johnny/Projects/pow-peptides`; the MacBook Pro remotely operates the Mini. See [development workflow](docs/DEVELOPMENT.md) for the two build paths (`npm run build` for Sites and `npm run vercel-build` for Vercel), local checks, and the push restriction. See [project status and roadmap](docs/PROJECT_STATUS.md) for the current behavior, known gaps, and priorities.

## Core routes

- `/access` and `/verify` — research profile gate with form, OTP error/resend/success, Google prototype, returning-session marker, and referral preservation
- `/` — merchandising homepage
- `/shop` — complete 38-item searchable/filterable catalog with supplied strengths, prices, mobile filters, and empty state
- `/shop/reta-glp-3` — high-detail product record with purchase mode, cadence, quantity, cost basis, COA snapshot, research profile, handling/testing fields, external educational reference, cart feedback, and related products
- `/categories/[slug]` — catalog category entry
- `/coa` — searchable and filterable COA vault
- `/research` and `/research/[slug]` — research library structure
- `/subscribe`, `/partners`, `/about`, `/support` — supporting public views
- `/account` and account subroutes — interactive customer account and autoship controls
- `/partner` and partner subroutes — Command Center, links, masked customers, commission ledger, payouts, creative, and rules
- `/r/[partnerSlug]` — referral entry that is captured before the gate
- `/ops` — staff jobs-to-be-done map, clearly labeled as non-final admin software

## Prototype interactions

- Mobile navigation and responsive layouts down to 320 px
- Referral capture in local storage before mock verification
- Gate form, OTP error, resend, success, reset, and Google demonstration
- Catalog search over names/aliases/categories, filters, name/newest/price sorting, clear, and empty state
- Product one-time/subscription selection, 2/4/6-week cadence, 1/3/5/10 quantity, volume progress, cart feedback, and accordions
- Product-specific PepGuide links are provided as independent educational references where an exact public profile was identified; external content is not treated as POW labeling or a substitute for approved science, specifications, or lot files
- COA search, test-type/status filters, empty state, and file placeholder feedback
- Customer skip, reschedule, cadence, quantity, pause/resume, cancel, reorder, and failed-payment states
- Partner link copy/builder, masked customer list, ledger filters, payout history, and creative library
- Keyboard focus styles, semantic controls, safe table overflow, and reduced-motion behavior

## Intentionally untouched production integrations

- Database and durable storage
- Checkout, payments, tax, shipping, fulfillment, refunds, and recurring billing
- Authentication, Google OAuth, email/SMS OTP delivery, and session security
- COA/SDS file storage, document verification, and publication workflow
- Affiliate attribution service, commission automation, payout processor, and tax-document collection
- Inventory sync, order management, analytics, email, SMS, and support platforms
- Staff roles, permissions, audit history, and admin ownership

## POW inputs still required

- Final product descriptions, category review, aliases, and blend-ratio review
- Future updates to the confirmed inventory strengths, per-vial prices, and stock snapshot
- Volume tiers, subscription discounts, and promotion rules
- Product and packaging photography
- Current lots, approved COA/SDS files, labs, results, test dates, and publication rules
- Shipping, handling, fulfillment, returns, and support promises
- Eligibility, access, privacy, consent, medical, legal, and policy copy
- Commerce, payment, subscription, identity, and messaging platform decisions
- Partner attribution model, windows, eligible revenue, rates, holds, reversals, payout rules, payout method, and tax process
- Roles, permissions, operational owners, and analytics requirements
- Trademark and print-production specialist review of the approved identity

Unresolved discount, date, lot, policy, and operational values remain `XX%`, `MM/DD/YYYY`, `POW-XXXX`, or explicitly labeled TODOs. The current catalog displays the exact strengths and prices supplied by POW; no testing result or regulated claim is invented.
