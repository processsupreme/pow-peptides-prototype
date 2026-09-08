# Project status and roadmap

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

1. **Resolve Mini-only delivery and build triggers — recommended first task.** Inspect the existing Vercel project's actual Git settings and external integrations. Document a verified path for source pushes and Mini-built artifacts without remote compilation, preserving the current hosting identity. Completion: evidence establishes that a branch push cannot start an off-Mini build; any later deployment procedure is separately reviewed and authorized. No configuration change or deployment is included in this baseline.
2. **Define the production service boundaries and entry flow.** Obtain decisions on identity/email/Google, commerce/payment/subscription services, durable storage, roles, and approved access terms before connecting services. Review dependency advisories for the selected path. Specify research-category persistence and referral continuity; then implement and test a bounded entry flow with real verification, secure sessions and appropriate account/partner authorization. Completion criteria should include invalid/expired verification, returning sessions, Google cancellation, and referral preservation. Which public content needs gating remains a business decision.
3. **Deliver a durable purchase and 2/4/6-week autoship flow.** Confirm approved SKUs/prices, subscription eligibility, promotion/shipping rules, and operational ownership. Preserve structured mode/cadence/quantity from builder through cart into orders and subscriptions. Connect approved services in a test environment, with order persistence, payment-event deduplication, and account changes. Completion: a test order and recurring plan reconcile with customer state; skip/reschedule/pause/cancel and failed payments have verified outcomes.
4. **Connect affiliate attribution and reporting to real order events.** First approve attribution model/window, eligible revenue, renewals, rates, holds, reversals, payout schedule/minimum/method, and tax process. Preserve partner/campaign/destination across entry; implement scoped partner access, attributable customers/orders, commission events, and reconciled payout history. Test duplicate events, refunds, renewal credit, and access isolation.
5. **Complete launch content and operations.** Obtain approved product/eligibility/policy copy, lot-matched COA/SDS files and publication rules, photography, inventory/fulfillment/support ownership, and analytics requirements. Validate responsive/accessibility behavior and the full browser journeys, including the route defects above. Deployment remains a separate authorized action.

No provider, commission rate, discount, attribution window, eligibility rule, or launch date is selected by this roadmap. Outstanding POW inputs in `README.md` still apply.

## Baseline verification

On the verified Mac mini: lockfile installation passed; lint passed with 10 warnings; Vinext production build and all 39 tests passed; Vercel production build including TypeScript passed after local sandbox escalation; development `/` returned HTTP 200. Existing Vercel homepage also returned HTTP 200, without asserting deployed source parity. No product changes were needed. See `DEVELOPMENT.md` for reproducible commands and coverage limits.

The baseline feature branch is committed locally and not pushed because Vercel-side build triggers could not be positively verified. Nothing was merged or deployed. Continue with the next task only after this baseline is reported.
