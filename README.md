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
- `/bundles` — five POW-supplied research bundles at fixed $200/$220 prices, with component lists and additions to the local demo cart
- `/shop/[slug]` — 38 customer-focused product profiles with plain-language introductions, potential-benefit cards and evidence context first, followed by scientific facts, pathway diagrams, detailed chapters, study findings, FAQs, source links, and supplied vial specifications; see [product research scope and outstanding records](docs/PRODUCT_RESEARCH.md)
- `/categories/[slug]` — catalog category entry
- `/coa` — searchable and filterable COA vault
- `/research` and `/research/[slug]` — research library structure
- `/subscribe`, `/partners`, `/about`, `/support` — supporting public views
- `/account` and account subroutes — interactive customer account and autoship controls
- `/partner` and partner subroutes — Command Center, links, masked customers, commission ledger, payouts, creative, and rules
- `/r/[partnerSlug]` — referral entry that is captured before the gate
- `/ops` — connected sample order queue with payment verification, packing, USPS label/acceptance/delivery simulations, holds, and customer email previews
- `/account/orders` and `/track-order` — shared sample order history and tracking, connected to sample checkout invoices

## Prototype interactions

- Connected order management: reviewing a checkout invoice creates a sample order in this browser. Staff actions at `/ops` update customer history and tracking; a customer payment report cannot confirm funds or unlock packing. USPS label creation is separate from carrier acceptance. Email previews send nothing, and demo tracking references never query USPS. See [daily operating instructions and launch scope](docs/ORDER_OPERATIONS.md).

- Free priority shipping at $800; overnight selectable at checkout for $70, free at $1,300. Thresholds use merchandise before discounts; selected shipping follows the sample invoice. The $12 priority charge below $800 remains a demo assumption.
- Superman and Batman use the confirmed vial names, with unchanged inventory figures and redirects from the previous product routes.
- POW! Cream has a homepage spotlight, shop feature, and `/shop/pow-cream` product page with an AI-generated balm jar concept, original description, and selected $39-per-jar prototype price. It adds to the demo cart and sample invoice. Jar size, formulation details, patent documentation, and evidence remain pending; see [cream product concept](docs/CREAM_PRODUCT.md).
- Required email popout on shopping pages, with the requested 10% first-order offer applied to demo cart and checkout; returning access and one-time use are remembered in browser storage with a cookie fallback, and emails are not stored or sent. Native form submission also unlocks access when client scripts are unavailable. See [email offer walkthrough](docs/EMAIL_OFFER.md).
- Venmo/Zelle invoice checkout with the supplied POW payment contact, itemized sample invoices, unique memo references, copy/print tools, and a payment-reported state awaiting manual verification. Live order intake and recipient details are still needed; see [manual payment flow](docs/VENMO_PREVIEW.md).
- Mobile navigation and responsive layouts down to 320 px
- Referral capture in local storage before mock verification
- Gate form, OTP error, resend, success, reset, and Google demonstration
- Catalog search over names/aliases/categories, filters, name/newest/price sorting, clear, and empty state
- Product one-time/subscription selection, 2/4/6-week cadence, 1/3/5/10 quantity, volume progress, cart feedback, and accordions
- Product-specific PepGuide links are provided as independent educational references where an exact public profile was identified; external content is not treated as POW labeling or a substitute for approved science, specifications, or lot files
- COA search, test-type/status filters, empty state, and file placeholder feedback
- Customer skip, reschedule, cadence, quantity, pause/resume, cancel, reorder, and failed-payment states
- Partner link copy/builder, masked customer list, ledger filters, payout history, and creative library
- Signup creates a sample affiliate coupon profile at `/partner/coupons`: 10%, 15%, 20%, and 25% inventories, recipient assignment, copy/revoke controls, and recipient validation at checkout with simulated email verification; manual payment reports leave codes issued. See [coupon walkthrough and production protections](docs/AFFILIATE_COUPONS.md).
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
