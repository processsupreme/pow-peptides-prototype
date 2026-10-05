# Project status and roadmap

## Email gate recovery October 4 2026

Fixed a concrete failure path matching the reported email-reset loop: the old form had no native action, so submitting before hydration or without client scripts performed a default GET and returned to a fresh locked gate. The revised form uses a native POST fallback with an anonymous same-site access cookie and server-rendered initial state. It confirms the cookie before redirecting back to shopping; blocked cookies lead to recovery instructions rather than a loop. The email input is excluded from form submission and its actual DOM value is read for hydrated submission, avoiding stale React state with autofill.

Added verified local-storage, session-storage, and cookie fallbacks. Used offers win over stale available state, and failure of all storage mechanisms retains the entered email with a clear recovery message. Referral capture also tolerates denied storage so opening a referral link cannot crash the gate. No email or customer record is stored or sent, and the new endpoint only sets the existing prototype offer status. This remains a demo, not authentication or a live signup integration. See [email offer details](EMAIL_OFFER.md).

Validation: lint passed with 11 existing image-element warnings; the Vinext build and all 68 tests passed; the Next production build and TypeScript validation passed. Six new regressions cover fallback persistence, redeemed-state precedence, safe native form markup, the complete POST/cookie/redirect/SSR journey, origin/destination restrictions, and blocked-cookie recovery. Desktop Chrome verified typed-email unlock, retained referral context, navigation into the shop, and access after reload. A separate HTTP check against the built Next server verified the native fallback without executing client scripts. The client’s exact iPhone/browser environment and mobile keyboard/autofill behavior remain unconfirmed. No push or deployment has been performed for this fix.

## Customer benefit framing October 3 2026

Rewrote introductions for all 38 product families around customer interests and potential benefits. Added two scannable overview cards per listing, a visible evidence-level label beside purchase controls, and a short explanation of what the findings mean for the customer. Moved molecular facts and pathway diagrams below the overview, retained the detailed scientific chapters and primary sources, and updated navigation and metadata to match. The new overview uses the existing black/white/lime identity.

Clinical findings remain scoped to the studied population; preclinical topics are identified as research interests. Negative and mixed findings remain visible. Unknown KLOW / KLOW PRO formulas and Prime 191 GH identity receive factual overview cards instead of invented outcome claims. Inventory, assets, commerce, dependencies, and hosting configuration are unchanged.

Validation on the Mini: lint passed with 11 existing image-element warnings; the Vinext build and all 62 tests passed; the Next production build and TypeScript check passed. The Next CSS worker required the documented sandbox retry. Coverage verifies all 38 customer profiles, benefit-source destinations, evidence labels, and benefits preceding the scientific content. A local desktop browser check confirmed the GHK-Cu email gate, overview anchor, and rendered two-card layout; mobile and full commerce interactions were not re-tested. Generated Next environment-file churn was restored. The customer-copy revision was subsequently pushed and deployed as `fc82053` on October 4 at the user’s request. Both Vercel checks passed; live Reta, GHK-Cu, DSIP, and KLOW PRO benefit sections were verified.

## Product science depth revision October 3 2026

Client feedback identified that the initial descriptions were too light. Reworked all 38 records to lead with substantive information: scientific fact panels, labeled pathway diagrams, three explanatory chapters per product, and study findings rather than only study titles. Product-specific introductions now appear by the purchase controls. Added eight research/reference records for 47 total, including primary mechanistic experiments and structural work. Removed duplicate research accordions and repeated evidence-boundary blocks. Price, quantity, inventory, cart behavior, assets, and hosting configuration are unchanged.

Examples of added detail include GHK-Cu’s MMP/TIMP matrix-remodeling findings, SS-31’s cardiolipin–cytochrome c mechanism, retatrutide receptor comparisons and contextual trial results, Tesa / Ipa’s supplied mass proportions, and distinct molecular findings for the short peptides. KLOW / KLOW PRO still await POW formulas; no ingredients or mechanism were inferred. The missing formulas were requested while the rest of the work continued. See [research content scope](PRODUCT_RESEARCH.md).

Local validation: lint passed with the 11 existing image-element warnings; the Vinext build and all 62 tests passed; TypeScript passed; the Vercel build passed after the known local CSS-worker sandbox retry. Automated coverage checks all 38 records and citations, explicit formula states, scientific details and study context, and the existing inventory and commerce behavior. Responsive visual QA and browser interactions were not performed. Generated Next environment-file churn was restored. The science-depth revision was subsequently pushed and deployed as `a5543b5` on October 3 at the user’s explicit request. Vercel preview and production checks passed, and live Reta, GHK-Cu, and SS-31 content was verified. No merge into main occurred.

## Detailed product research October 3 2026

All 38 product pages now have original, product-specific research narratives, mechanism sections, evidence summaries, FAQs, and selected primary-source links. Six section links make the longer records navigable. Sources distinguish cell, animal, human, manufacturer, and comparator evidence. Unconfirmed formulas and identities remain explicit; no competitor claims or test results were copied. Product-page COA links now expose the pending documentation state rather than imply an available certificate. All supplied inventory and purchase behavior are preserved. See [research scope, references, and outstanding specifications](PRODUCT_RESEARCH.md).

Scientific and POW labeling review, actual lot documentation, and the noted formulation details remain outstanding. No production integrations or hosting configuration changed. Subsequently pushed and deployed at the user’s request as `0a4da9f` on October 3. Preview and production checks passed; live Reta, GHK-Cu, and KLOW PRO pages returned HTTP 200 with the revised sections. The existing production domain was retained, without merging into `main`.

Validation on the Mini: lint passed with 11 existing image-element warnings; the Vinext build passed and all 61 tests passed; TypeScript passed; the Vercel build passed after the documented local CSS-worker sandbox retry. Coverage includes rendered records for all 38 products, section anchors, citations, pending-formula states, and key identity/quantity distinctions, plus the existing inventory and commerce suite. Browser interaction and responsive visual QA were not performed. These checks do not replace scientific review. Generated Next environment-file churn was restored.

## Affiliate coupon inventory October 2 2026

Added a signup-to-coupon-to-checkout local demo. Test application completion creates a persistent synthetic affiliate profile and sample inventory of the requested 10%, 15%, 20%, and 25% codes. `/partner/coupons` opens the new portal tab directly. Affiliates assign a code to a synthetic recipient, copy it, filter by status, or revoke it. Checkout requires an explicit simulated email verification and rejects unassigned, mismatched, revoked, and redeemed codes. Successful simulated payment consumes the coupon; cancellation and failure preserve it.

Two codes per tier, merchandise eligibility, and larger-offer-only treatment of the welcome discount are labeled prototype assumptions awaiting final POW rules. Codes cannot prevent forwarding by themselves: live protection requires verified customer identity and atomic server-side redemption. All current state is editable local storage, restricted to synthetic recipient addresses, with no live service or commission automation. See [walkthrough, assumptions, and launch requirements](AFFILIATE_COUPONS.md). No inventory, hosting configuration, dependencies, or approved assets changed. This feature is local pending a separate push/deployment instruction.

Validation on the Mini: lint passed with 11 existing image-element warnings; the Vinext build and all 59 tests passed; TypeScript passed; and the Vercel build passed after retrying outside the sandbox for its local CSS-worker port binding. Automated tests cover coupon lifecycle, recipient restrictions, one-use redemption, revocation, arithmetic, and rendered entry points. Browser interaction and responsive visual QA were not performed; live identity and redemption are not implemented.

The preceding email-gate release (`a54bea5`) was pushed and promoted to the existing Vercel production site on October 2 at the user’s explicit request, with required checks passed and no merge into `main`.

## First-order email gate October 2 2026

Added a required email-entry popout on shopping routes with POW's approved branding, a large 10% offer, native modal behavior, input validation, inert storefront content, and a mobile layout. Successful sample-email entry unlocks the current destination and activates a separate 10% merchandise discount in cart, checkout, payment preview, and confirmation. Access persists locally; successful simulated payment consumes the offer once. Cancel/failure retains it. The tariff popup waits for the email gate to finish. Email addresses are not saved or sent; no signup, consent, authentication, or email service has been connected.

The requested offer rate is approved; the demo includes bundles and applies the existing 5% fee after discount while preserving the pre-discount $200 shipping threshold. Final eligibility, fee/shipping interaction, terms, real signup storage, and order-backed redemption remain launch decisions. See [email offer walkthrough and limits](EMAIL_OFFER.md). Inventory, hosting identities, dependencies, and existing cart storage are preserved. This feature is retained locally pending a separate deployment instruction. Local validation: lint passed with the same 11 image-element warnings, all 52 tests passed with the Vinext build, typecheck passed, and the Vercel build passed compilation and TypeScript after the documented sandbox port-binding retry. Coverage limits and a sample-email walkthrough are recorded in `EMAIL_OFFER.md`.

The preceding bundle release (`7f65da1`) was pushed and deployed to the existing Vercel production site on October 2 at the user's explicit request. Vercel's Git trigger remains enabled. Its separate check runners initially failed to find `package.json`; a clean redeploy passed both checks and production promotion required no bypass. No merge into `main` occurred.

## Research bundle collection October 2 2026

Added `/bundles` with five numbered comic-cover cards in the existing black/white/lime identity. Each card shows its products, inventory-backed strengths where known, supplied fixed price, and an add-to-test-cart action with immediate confirmation. A homepage spotlight, compact shop section, desktop/mobile navigation, and footer make the collection discoverable. In-page links lead directly to each bundle; known components link to their existing product records. The original four-product box builder remains available.

Bundle additions create a distinct fixed-price cart line. Repeated additions and cart quantity controls count complete bundles; removal, local persistence, contents, and pricing use the existing cart and simulated Venmo checkout. Cart bundle links return to the corresponding collection card. The existing 5% demo surcharge and shipping logic are unchanged. Bundle names are presented as collection labels, without health, cosmetic, performance, or intended-use claims.

Triple Threat's strength and catalog mapping, and Super Man's catalog mapping, need confirmation. Super Man retains the supplied 10 mg strength. One vial per listed product is a stated demo assumption; confirm quantities and shorthand mappings before production. See [inventory and bundle details](INVENTORY.md). No inventory counts, standalone prices, integrations, dependencies, approved brand assets, or hosting configuration were changed.

Validation on the Mini: `npm run lint` passed with 11 image-element warnings (10 existing, one for the reused brand icon); `npm test` passed all 48 tests and the Vinext build; `npm run typecheck` passed; `npm run vercel-build` passed compilation, TypeScript, and route generation. An initial Next build overlapped Vinext generation and failed on generated route types; stopping the dev server and running the Next build separately resolved it. Build paths should run sequentially because they share generated route files. Automated coverage includes rendered bundle contents, supplied prices, inventory strengths, discovery links, cart payload serialization, and checkout arithmetic. Browser hydration, clicks, responsive visual QA, and real commerce are not covered. Publishing and merging require a separate instruction; external Mini-only build triggers remain unverified, so this work is retained locally.

## Cartoon checkout cameo September 22 2026

Entering checkout opens a dismissible, replayable comic popup with an orange Donald Trump caricature and the client's supplied fictional tariff quote. The requested 5% demo surcharge is calculated on merchandise only, rounded to cents, and itemized in cart and checkout; the Venmo preview and confirmation use the same total. Shipping retains its existing merchandise-based threshold. The popup labels the quote as parody and the fee as a POW! demo surcharge, not a verified government tax. It respects reduced-motion settings. No actual payment or recurring fee is enabled, and there is no automatic determination of when a war ends. See [the checkout walkthrough](VENMO_PREVIEW.md) and [asset provenance](CARTOON_ASSET.md).

## Venmo preview September 22 2026

Checkout now presents Venmo as the only payment option, with sample contact details, a labeled simulated approval dialog, cancel/failure recovery, and a no-charge confirmation. All payment behavior remains local. The old static card token is removed. Business details, catalog eligibility/provider approval, and the live checkout/order integration remain outstanding; entering a Venmo username cannot activate payments. See [Venmo preview and walkthrough](VENMO_PREVIEW.md). Inventory, prices, hosting identity, and dependencies are unchanged.

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
