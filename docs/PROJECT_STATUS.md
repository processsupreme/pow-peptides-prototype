# Project status and roadmap

## Inventory update September 8 2026

The user confirmed POW's supplied inventory as the authority for strengths, per-vial prices, and stock counts. `app/pow-inventory.json` now contains 39 explicit variants across 38 product families and 19,050 vials. Reta GLP-3 20 mg is $105 with 300 vials; 10 mg is $80 with 1,200 vials. Variant selection uses these records instead of generated strengths and proportional pricing. Product stock counts aggregate variants; detail pages show the selected strength's count. The supplied Tesamorelin / Ipamorelin 13 mg / 3 mg composition is recorded.

Automatic demo volume/bulk/bundle discounts and the unapproved free-water gift were removed so merchandise totals use supplied prices. A new local demo-cart key prevents old generated variants and placeholder prices from carrying into the updated checkout. Existing saved-product preferences are unaffected. Inventory counts remain a supplied snapshot; demo checkout does not reserve or decrement them. See `INVENTORY.md` for maintenance and limits.

The assessment below describes the earlier baseline. References below to generated strengths, scaled pricing, missing stock counts, and applied demo discounts are superseded by this update.

Assessed September 8, 2026, against source commit `6af4d12`. This pass documents and verifies the existing implementation; it adds no integrations or redesign. The approved identity is modern, bold superhero POW!, with an electric-lime exclamation point and black/white/lime styling. Preserve `public/brand-assets` and its asset guide, including its existing background guidance.

## Architecture

- Next.js App Router route files mostly delegate to the large client component `app/POWApp.tsx`. Native anchors provide full-page navigation. Shared styling is in `app/globals.css`; the 38-item catalog, COA examples, research index, and operations map are in `app/pow-data.ts`.
- React `19.2.6`, Next.js `16.2.6`, TypeScript `5.9.3`; Vinext `1.0.0-beta.2` / Vite `8.0.13` support the existing Sites/Cloudflare path. npm's version-3 lockfile is retained.
- Vercel builds with `next build`; Sites builds through Vinext, the Sites Vite plugin, and `worker/index.ts`. Preserve both configurations and their hosting identity.
- Drizzle is installed but `db/schema.ts` is empty, migrations have no entries, and D1/R2 bindings are disabled. `examples/d1` is opt-in sample code, not an active app API. No app API routes or production service calls implement the commerce flows.
- `app/chatgpt-auth.ts` contains unused Sites header-based identity helpers. It does not implement Google sign-in or protect the storefront/account/partner routes.
- Cart, saved products, recently viewed products, and referral strings use browser storage. Most other interaction state lives only in React and resets on navigation/reload.

## Route inventory

| Experience | Routes |
| --- | --- |
| Entry and referrals | `/access`, `/verify`, `/r/[partnerSlug]` |
| Catalog and shopping | `/`, `/shop`, `/shop/[slug]`, `/categories/[slug]`, `/compare`, `/build-a-box`, `/bulk`, `/cart`, `/checkout` |
| Repeat ordering and customer views | `/subscribe`, `/account/[[...section]]`, `/rewards`, `/track-order` |
| Research and proof | `/coa`, `/research`, `/research/[slug]` |
| Partner recruitment and portal | `/partners`, `/partner/[[...section]]` |
| Supporting views | `/about`, `/support`, `/guarantee`, `/ops` |

## Intended experiences: what exists and what is missing

| Experience | Implemented local behavior | Demonstrations / missing production capabilities |
| --- | --- | --- |
| Catalog and purchasing | 38 products; search, category/format/availability filters, sorting, product detail/strength selection, local cart quantities and totals, bundles, bulk quotes, checkout confirmation | Supplied base prices coexist with unapproved scaled variants and demo discounts/shipping. Checkout clears the local cart and shows a confirmation; it creates no durable order or payment. No live inventory, tax, shipping, fulfillment, refunds, or order platform. |
| Research entry | Required form fields with category choices Researcher, Clinic, University, Distributor, Other; acknowledgment; OTP error/resend/success UI; referral capture | OTP is hardcoded `123456`; no email is sent. Profile fields are not saved as an account. Google changes the UI to success without OAuth. No secure sessions, account ownership, eligibility enforcement, or access restriction. |
| Autoship every 2/4/6 weeks | Plan builder and product cadence/quantity controls; product cart item ID and display text include subscription cadence; account cadence, pause/resume/cancel update local state | Builder selections do not transfer to product view. Cart has no structured subscription contract. Account skip/date/quantity/reorder actions only show notices. No recurring billing, scheduler, payment recovery, persistent subscription, or fulfillment linkage. |
| Affiliate links and portal | Public link builder edits handle/destination/campaign; referral route passes handle into entry; browser captures referral; portal tabs, sample masked customers/orders, ledger filters and payout rows | Links use the prototype `powpeptides.com` domain, not the verified hosting URL. Referral redirect drops destination/campaign. Portal builder copies a fixed link. Customers/orders/commissions/payouts are samples, unconnected to shopping. No durable attribution, partner approval, commission calculation, payout processing, permissions, or audit trail. |

Other implemented surfaces include COA example search/filter/code matching, two full research guides, explicit coming-soon articles, and local rewards/support/application demonstrations. No certificate download or approved lot record is connected. Support, concierge, and partner application forms transmit nothing. `/ops` is a jobs-to-be-done map, not an admin system. Photography is represented by illustrated bottle placeholders using approved logos.

## Known gaps to carry into development

These findings come from source inspection; browser interaction testing was not part of this pass.

- Entry is optional: direct shop, customer, partner, and staff URLs remain accessible. Email verification writes `pow_verified`, but no returning-session read exists; Google success does not write that marker despite the success copy. The form category is not persisted.
- `/r/[partnerSlug]` redirects only to `/access?ref=...`, discarding `to` and `campaign`; successful entry always links to `/shop`. Referral capture has no expiry or approved attribution rule. Clipboard actions report success without awaiting/handling failures.
- `/categories/[slug]` ignores the slug. Account and partner catch-all sections ignore their route segments and initialize their default tabs. Unknown product slugs fall back to the first product instead of a not-found response.
- `/subscribe` carries only the product slug to the detail page. Product purchase mode/cadence survives in cart ID/display text, but lacks structured fields. The detail page offers subscription controls even when the catalog item is not marked eligible. Account controls are partly toast-only and are not linked to checkout state.
- Catalog/home labels such as “Current COA,” stock signals, and testing language are backed by static prototype flags rather than approved live evidence. Demo promotions, volume tiers, scaled strength prices, shipping promises, rewards and guarantee terms must not become production rules by accident. README's earlier blanket placeholder description is incomplete because newer journeys also contain explicit numeric demo assumptions.
- Most UI code shares one dense component file. Extracting components should accompany focused behavior work, with regression coverage, rather than an unrelated rewrite.
- The 39 tests assert server-rendered HTML and some source/CSS patterns. Missing coverage includes browser interaction, hydration, referral continuity, routing edge cases, access controls, structured cart state, and all real integrations.
- Dependency installation reports 23 advisories (17 high); no applicability assessment or remediation was done. Lint reports 10 image warnings. Plan a scoped advisory review before introducing production services.

## Prioritized roadmap

User clarification, September 8, 2026: the current deliverable is an interactive product specification. Delivery configuration and production integrations can wait until closer to launch. Their absence must not hold up prototype work; provider selection and finalized operational rules are not prerequisites for demonstrating the intended experience.

1. **Complete the research-entry demo — recommended first task.** Make category selection, simulated email verification, Google sign-in demonstration, returning demo sessions, and referral/destination continuity form one coherent journey. Clearly identify simulated verification and provide a reset path. Completion: a reviewer can follow entry from a referral through success to the intended destination, revisit the demo, and exercise error/retry states without live credentials or services. Document future identity requirements separately; which public content requires production gating remains undecided.
2. **Connect the purchasing and 2/4/6-week autoship demo.** Carry product, strength, purchase mode, cadence, and quantity consistently from builder through cart and simulated checkout into the customer account. Make skip, reschedule, quantity, pause/resume, cancellation, and failed-payment demonstrations visibly update synthetic state. Completion: reviewers can trace a sample purchase and repeat-order plan end to end, with no real payment, shipment, or recurring charge. Retain explicit labels for proposed pricing and operational assumptions.
3. **Connect the affiliate demo journey.** Preserve partner/campaign/destination in demo links and show how synthetic referred customers and orders relate to commission states and payout history. Make portal links and navigation behave consistently. Completion: a reviewer can follow a referral into shopping and understand the corresponding sample portal records. Leave rates, attribution windows, payout rules, and provider choices unresolved unless approved.
4. **Close prototype usability and specification gaps.** Address ignored route segments, invalid product paths, misleading success feedback, and demo/evidence labeling. Validate the relevant browser journeys and responsive/accessibility behavior. Keep approved brand assets and layouts; extract components only as useful for focused work. Record acceptance criteria and open questions alongside the demonstrated behavior.

## Deferred production work

These are future implementation requirements, not blockers for the product specification:

- Verify external build triggers and establish the eventual Mini-only push/delivery workflow while preserving hosting identity. Do not use a test push to discover remote behavior.
- Select production identity, email/Google, commerce/payment/subscription, storage, and affiliate services; implement secure sessions, authorization, durable records, payment-event handling, and payout reconciliation.
- Approve eligibility and policy copy, SKUs/prices, discounts, subscription rules, shipping/fulfillment ownership, affiliate attribution/rates/holds/reversals/payout terms, and operational support.
- Supply approved lot-matched COA/SDS files, publication rules, product photography, and scientific content; complete dependency advisory remediation and production validation before launch.

No provider, commission rate, discount, attribution window, eligibility rule, or launch date is selected by this roadmap. Outstanding POW inputs in `README.md` still apply.

## Baseline verification

On the verified Mac mini: lockfile installation passed; lint passed with 10 warnings; Vinext production build and all 39 tests passed; Vercel production build including TypeScript passed after local sandbox escalation; development `/` returned HTTP 200. Existing Vercel homepage also returned HTTP 200, without asserting deployed source parity. No product changes were needed. See `DEVELOPMENT.md` for reproducible commands and coverage limits.

The baseline feature branch is committed locally and not pushed because Vercel-side build triggers could not be positively verified. Nothing was merged or deployed. The baseline has been reported; subsequent planning follows the product-specification priorities above.
