# First-order email offer

The user requested an email popout offering **10% off the first order**, with email entry required before accessing the shopping menu. The supplied Dutch screenshot is a layout reference; POW's logo, typography, and black/white/lime identity remain in use.

## Prototype journey

1. Open `/` or a shopping deep link in a fresh browser profile. An email modal blocks interaction with the storefront. Empty or malformed email addresses do not unlock it; Escape and backdrop clicks do not dismiss it. Support remains reachable from the modal.
2. Enter a sample address such as `researcher@example.com`. The modal closes in place, preserving the URL, query, fragment, referral context, and cart. A header message confirms that the offer is unlocked.
3. Browse products or bundles and add merchandise. The cart and checkout show an itemized 10% first-order discount. No code is required.
4. Preview payment with sample details. Canceling or using the failed-payment example leaves the offer available. Successful simulated approval marks it used on this browser, clears the demo cart, and confirms the captured total and savings. A changed total or discount while previewing requires a fresh review.
5. Reload or navigate to another shopping page: access remains unlocked. A subsequent demo order uses regular supplied prices. A second email submission does not reset a used offer. Changes in another tab update the offer state through the storage event.

For a fresh walkthrough, clear only `pow_demo_first_order_offer_v1` in browser local storage, or use a fresh browser profile. This resets demo eligibility, not a real customer record.

## Scope and data

The gate covers the homepage, shop/product/category routes, bundles, box builder, bulk, comparison, subscriptions, rewards, cart, and checkout. Support, company/research/proof content, the existing access/OTP demo, account/partner views, referral redirect, and operations views keep their existing behavior. Following their shopping links still encounters the email gate. The gate renders before hydration with inert storefront content; JavaScript is required to unlock the demo. It uses a native modal, labeled email field, input validation, focus management, scroll locking, and a mobile layout. The checkout tariff popup waits until email access is unlocked.

Only `available` or `used` is stored under the new local-storage key. The submitted email is neither saved nor transmitted. There is no mailing-list signup, email verification, email delivery, external API call, or marketing consent assertion. Storage failure leaves the gate locked with a retry explanation. This is a browser-level presentation gate, not authentication or a secure restriction on server-rendered catalog data. Clearing storage or changing devices can reset the demo; genuine first-order eligibility is deferred.

## Pricing

The requested 10% rate is approved. The prototype applies it to the merchandise subtotal, including supplied-price bundles, boxes, and cases, with cent rounding; it does not alter inventory or line-item base prices. Shipping and the 5% demo fee are not themselves discounted. The fee uses merchandise after the discount, and the existing $200 demo shipping threshold uses merchandise before the discount. These calculation choices are explicitly demonstrated and require final business-rule review before production. No expiration, minimum purchase, or recurring benefit is invented for the welcome offer. Affiliate coupons are a separate requested feature: the prototype applies the larger offer without stacking (affiliate wins ties), and the welcome offer is used after the first successful demo order even when the affiliate discount wins. This interaction is a stated default pending POW policy approval; see [affiliate coupons](AFFILIATE_COUPONS.md).

Examples: an $80 first order has $8 savings, $3.60 demo fee, and $12 demo shipping, totaling $87.60. A $200 bundle has $20 savings and a $9 demo fee, totaling $189 with the existing demo shipping model. The same bundle on a subsequent order totals $210.

## Before launch

Choose the signup storage/email delivery integration when production work begins, approve consent/privacy copy and offer terms, implement actual first-order eligibility and redemption against orders, and enforce any intended server-side access rules. Confirm merchandise eligibility (including bundles and subscription initial orders), fee basis, shipping threshold basis, and how existing customers are recognized. None of these provider decisions blocks the current prototype.

## Verification

Automated coverage checks gated and ungated routes, input markup, inventory preservation, offer state transitions, repeat claims, storage failure, absence of email persistence in the state model, and exact totals/rounding. Browser hydration, keyboard interactions, cross-tab behavior, mobile visual layout, and the full clicked checkout journey are not automated or visually verified in this pass.
