# First-order email offer

The user requested an email popout offering **10% off the first order**, with email entry required before accessing the shopping menu. The supplied Dutch screenshot is a layout reference; POW's logo, typography, and black/white/lime identity remain in use.

## Prototype journey

1. Open `/` or a shopping deep link in a fresh browser profile. An email modal blocks interaction with the storefront. Empty or malformed email addresses do not unlock it; Escape and backdrop clicks do not dismiss it. Support remains reachable from the modal.
2. Enter a sample address such as `researcher@example.com`. The modal closes in place, preserving the URL, query, fragment, referral context, and cart. A header message confirms that the offer is unlocked.
3. Browse products or bundles and add merchandise. The cart and checkout show an itemized 10% first-order discount. No code is required.
4. Choose Venmo or Zelle and review a sample invoice with the same itemized savings. Returning to checkout and reporting payment leave the offer available and the cart intact. Customer-reported transfers are not confirmed payments; actual consumption is deferred to durable confirmed-order handling.
5. Reload or navigate to another shopping page: access remains unlocked. Existing used markers still suppress the offer, and a second email submission cannot reset them. Changes in another tab update eligibility through the storage event.


For a fresh walkthrough, clear `pow_demo_first_order_offer_v1` from local and session storage and the `pow_demo_offer` cookie, or use a fresh browser profile. This resets demo eligibility, not a real customer record.

## Scope and data

The gate covers the homepage, shop/product/category routes, bundles, box builder, bulk, comparison, subscriptions, rewards, cart, and checkout. Support, company/research/proof content, the existing access/OTP demo, account/partner views, referral redirect, and operations views keep their existing behavior. Following their shopping links still encounters the email gate. The gate renders before hydration with inert storefront content. A native POST fallback can unlock it before JavaScript loads or when scripts are unavailable; interactive cart and checkout features still require JavaScript. It uses a native modal, labeled email field, input validation, focus management, scroll locking, and a mobile layout. The checkout tariff popup waits until email access is unlocked.

Only `available` or `used` is stored in local storage, session storage, and a same-site session cookie. Persistence attempts are verified by reading the value back, including silent-write failures. A used marker takes precedence over stale available markers. The submitted email is neither saved nor transmitted. There is no mailing-list signup, email verification, email delivery, external integration, or marketing consent assertion. The same-origin `/api/demo-offer` route supports only the prototype access marker; it creates no customer record. The email field has no `name`, so native form submission sends the return destination without sending the address. Browser validation still requires an email. This is a presentation gate, not server-validated email registration. If all persistence options fail, the typed email remains visible with instructions to open the site in Safari or Chrome and allow storage. This is a browser-level presentation gate, not authentication or a secure restriction on server-rendered catalog data. Clearing all access markers or changing devices can reset the demo; genuine first-order eligibility is deferred.

## Embedded-browser recovery fix October 4 2026

The previous server-rendered form had only a React submit handler and no native action. Before hydration or with scripts unavailable, a valid submission used the browser’s default GET navigation, could include the email in the URL, and rendered the locked gate again. The screenshot alone does not establish the client’s exact browser cause. The fix removes that failure path and also addresses stale React input state after autofill by reading the actual input value on submission.

The native POST sets an anonymous demo-status cookie and redirects through a cookie-confirmation step. When the cookie is present, the destination page receives the unlocked state during server rendering. When cookies are rejected, a recovery page explains how to proceed instead of returning to a repeating gate. Return locations are limited to same-origin shopping pages; referral query parameters are preserved and an old `email` query parameter is removed. Normal hydrated submission remains in place without navigation, preserving the full URL and fragment. The fallback uses the same-origin referrer or submitted pathname; fragment restoration depends on native browser redirect handling and is not guaranteed. Used cookie markers remain used. Cross-origin submissions are rejected when an Origin header is present.

A checked email field in the browser is not verified email identity. No production account, email delivery, eligibility service, or customer data storage was added.

## Pricing

The requested 10% rate is approved. The prototype applies it to the merchandise subtotal, including supplied-price bundles, boxes, and cases, with cent rounding; it does not alter inventory or line-item base prices. Shipping and the 5% demo fee are not themselves discounted. The fee uses merchandise after the discount, and the approved $800 free-priority / $1,300 free-overnight thresholds use merchandise before the discount. These calculation choices are explicitly demonstrated and require final business-rule review before production. No expiration, minimum purchase, or recurring benefit is invented for the welcome offer. Affiliate coupons are a separate requested feature: the prototype applies the larger offer without stacking (affiliate wins ties), and manual payment reports do not consume either offer. Confirmed-order redemption remains to be connected. This interaction is a stated default pending POW policy approval; see [affiliate coupons](AFFILIATE_COUPONS.md).

Examples: an $80 first order has $8 savings, $3.60 demo fee, and $12 demo shipping, totaling $87.60. A $200 bundle has $20 savings, a $9 demo fee, and $12 demo priority shipping, totaling $201. The same bundle on a subsequent order totals $222. Overnight is $70 below $1,300 in merchandise; priority is free at $800.

## Before launch

Choose the signup storage/email delivery integration when production work begins, approve consent/privacy copy and offer terms, implement actual first-order eligibility and redemption against orders, and enforce any intended server-side access rules. Confirm merchandise eligibility (including bundles and subscription initial orders), fee basis, shipping threshold basis, and how existing customers are recognized. None of these provider decisions blocks the current prototype.

## Verification

Automated coverage includes gated and ungated routes, native form markup without an email submission field, offer transitions, repeat claims, denied and silently discarded storage writes, stale used/available conflicts, the complete native POST/cookie/redirect/SSR-unlock path, deep-link query preservation, redirect/origin restrictions, recovery with cookies blocked, request isolation, and exact totals/rounding. See PROJECT_STATUS.md for build and browser verification. The client’s exact iPhone in-app browser has not been reproduced, and these checks do not cover the complete mobile checkout journey.
