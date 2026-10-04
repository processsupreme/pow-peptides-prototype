# Affiliate coupon inventory

POW requested affiliate-owned inventories of 10%, 15%, 20%, and 25% discount codes, issued after signup and redeemable at checkout without unrestricted customer-to-customer reuse. This implementation demonstrates that journey locally. It does not activate live affiliates, send messages, verify identity, or create real orders.

## Walkthrough

1. On `/partners#apply`, complete the test application with synthetic details. Submission creates a **Sample affiliate** profile in this browser. Application fields are not stored or sent. The success state links to `/partner/coupons`.
2. Open **Coupon inventory** in the partner portal. Four ticket-style rate selectors show available counts. Two codes per rate are **sample quantities**, not an approved allotment. Repeating signup retains the same profile and remaining inventory.
3. Choose a percentage and assign a code to `researcher@example.com`. Only synthetic `@example.com` recipients are accepted. Assignment fixes the recipient; the code becomes **Issued**. Copy the displayed code and pass it to that intended recipient. Copying never sends a message. A failed clipboard operation provides a manual-copy fallback.
4. Inventory filters show Available, Issued, Redeemed, and Revoked. Available codes remain hidden until assignment. Revoking requires an inline confirmation; it disables that code permanently in the local demo and does not refill inventory.
5. In the **same browser**, unlock the shopping email gate, add a product or bundle, and open checkout. Dismiss the existing tariff popup. Fill sample details or enter the assigned sample email in Contact.
6. In **Have an affiliate code?**, start test email verification and enter the visibly supplied `123456`. This is explicitly simulated: nothing is sent, and this does not prove email ownership. Paste the issued code and apply it. The summary shows the affiliate percentage and savings. Changing the checkout email clears simulated verification and invalidates an applied code until the correct recipient is verified again. Remove a code to continue without it.
7. Preview payment. Cancel and payment-not-completed leave the coupon issued and the cart intact. Approval rereads the stored coupon, checks its recipient/status, and marks it Redeemed against the sample order `POW-DEMO-1001`; its affiliate ownership remains attached. Reusing or revoking that redeemed code fails. Return to the profile to inspect its state.
8. Try a revoked, unassigned, nonexistent, already used, or different-recipient code. It is rejected. Codes are case-insensitive; emails are trimmed and normalized. A changed recipient, code, discount, or total during payment preview requires a new review. A code revoked in another tab is revalidated on approval even if its storage event has not rendered yet.

## Prototype assumptions

- Two codes per tier at signup. POW must set actual allotments, who can access each rate, approval, replenishment, and expiry rules.
- One issued code per order, recipient-bound and single-use. No recipient reassignment; revoke a mistaken assignment and issue another available code.
- **Larger offer only; no stacking.** An affiliate code wins a tie with the 10% welcome offer. This is the stated prototype default pending POW approval. The first-order offer is considered used after the first successful demo order even when an affiliate offer supplied the savings.
- Discounts apply to merchandise including the supplied-price bundles, boxes, and cases. Base prices and inventory records are untouched. The existing demo 5% fee uses discounted merchandise; the $200 shipping threshold uses original merchandise. Final exclusions and subscription applicability remain undecided.
- Example: a $200 order with a 25% affiliate code has $50 savings, $7.50 demo fee, free demo shipping, and a $157.50 total. The welcome offer adds no further discount.
- Coupon ownership is recorded; no commission calculation or connection to the portal's separate illustrative ledger is invented. The existing sample order number/tracking fixture remains unchanged.

## Data and limits

`pow_demo_affiliate_coupons_v1` holds one synthetic affiliate profile, randomly generated codes, their percentages/statuses, synthetic recipient emails, and sample order references. The signup form's identity/contact fields are not persisted. The existing email gate continues to store only its own eligibility status. No production API, database, email delivery, analytics, or provider was added. Clearing this storage key resets the sample profile/inventory; it is not a production reset mechanism.

A local-storage reader keeps tabs updated and mutations reread current state. Invalid or unavailable storage reports an error instead of silently generating new inventory. Coupon redemption is rolled back if saving welcome-offer usage fails; the cart stays intact on an error. This browser-local model is **not a security boundary or an atomic multi-tab payment system**. Storage can be edited, cleared, or raced; separate browsers do not share inventory. The visible test verification code offers no identity protection. Do not give these demo codes to real customers.

It is impossible to prevent someone copying or forwarding a code string. The production protection is to make that forwarded string useless to anyone except the assigned, authenticated customer, and to redeem it only once. Email entry by itself is insufficient. Account/credential sharing cannot be categorically prevented by a coupon system.

## Required before live use

- Authenticate affiliates and authorize inventory access server-side. Generate unpredictable codes on the server; keep a durable ownership, recipient, status, and audit record. Return only the data appropriate to each role.
- Bind issuance to the intended customer and require actual verified email ownership or a verified customer account at redemption. Never trust a client-provided `verifiedEmail` flag. Rate-limit verification and code attempts; avoid exposing another recipient's identity in errors.
- Enforce eligibility, merchandise prices, percentage, no-stacking policy, and order association on the server. Use atomic redemption/reservation and idempotent confirmed-payment handling so concurrent checkouts cannot redeem twice. Define cancellation, failure, expiry, refund, and reversal behavior before implementation.
- Approve quantities, access to high-discount tiers, replenishment, expiry, exclusions, welcome-offer interaction, commission attribution, and customer-facing terms. Establish retention and role-appropriate display of recipient information.

These requirements do not select a provider and do not block the current interactive specification.

## Verification scope

Automated checks exercise signup idempotency, all four tiers, ownership, synthetic-recipient restrictions, immutable assignment, email matching and simulated-verification requirements, cancellation semantics at the domain layer, revocation, one-time redemption, corrupt storage, discount totals/rounding, and server-rendered portal/checkout entry points. Browser hydration, clipboard, clicked signup-to-checkout journeys, native modal focus, cross-tab races, and responsive visual layout require a later browser QA pass. No live identity, anti-fraud, payment, or delivery guarantee has been tested.
