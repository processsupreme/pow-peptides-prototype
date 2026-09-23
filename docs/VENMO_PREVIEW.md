# Venmo checkout preview

Updated September 22, 2026. This is an interactive product specification, not a payment integration. The existing `/checkout` route demonstrates Venmo as its only payment option. No SDK, payment endpoint, transfer URL, QR code, merchant account, or credentials are connected. Do not describe this as activation by entering a Venmo username.

## Client walkthrough

1. Add a product from `/shop` and open `/checkout`.
   The cartoon tariff announcement opens on checkout entry. Dismiss it with **Got it**, the close button, or Escape. **Replay the announcement** opens it again. Its fictional quote is labeled as parody.
2. Select **Fill sample details** to populate synthetic contact and shipping values. These details are neither transmitted nor saved by the application.
3. Review the two acknowledgments, then select **Preview Venmo payment**.
4. The labeled POW! demonstration dialog shows the cart total, including the existing demo shipping estimate. It does not impersonate a Venmo login or open Venmo.
5. Cancel (or press Escape) to keep the cart and form intact. The payment-not-completed example also preserves both and permits another attempt.
6. Approve the demo payment to show the existing demonstration order confirmation and clear this browser's cart. No money, durable order, email, stock reservation, or fulfillment event is created.

The empty cart links back to shopping. Native required-field validation and the acknowledgments gate the preview. The dialog uses native modal focus containment and Escape handling. Prices and stock records are unchanged. Shipping, tax, and recurring billing remain unresolved prototype functionality.

The client's requested 5% demo surcharge is applied to merchandise before shipping, rounded once to the nearest cent. Cart, checkout, Venmo preview, and confirmation share the same total. Example: $80 merchandise + $4 surcharge + $12 demo shipping = $96. The fee is not stored as a cart item, so replaying the announcement, retrying payment, or reloading does not compound it. The existing $200 free-shipping threshold still uses merchandise alone. No government tariff or war status is verified; the quote is fictional and the surcharge remains part of the no-charge demonstration.

## What remains before a live launch

- The client supplies business identity/account information through the provider's secure process and obtains any required approval covering the actual catalog, intended buyers, and sales model. Legal eligibility and processor acceptance are separate questions.
- Select the permitted merchant checkout product. A Venmo business-profile username is not an integrated PayPal/Braintree checkout account. No provider has been selected or approved by this implementation.
- For eligible merchandise, separately implement and validate server-verified payments, durable orders, duplicate/retry handling, refunds, stock handling, tax/shipping rules, and operational ownership. Never treat a browser return, screenshot, or local confirmation as proof of payment.
- Confirm recurring-payment eligibility and requirements before promising automatic 2/4/6-week payments. This preview does not authorize future charges.
- Configure secrets outside source control and perform provider sandbox and launch verification. There is intentionally no environment-variable switch that turns this demonstration into live purchasing.

Provider reference: [Venmo website checkout](https://venmo.com/business/accept-venmo), [PayPal Venmo eligibility](https://developer.paypal.com/docs/checkout/pay-with-venmo/). These explain the general product and do not establish approval for POW!'s catalog.

## Verification scope

Run the existing lint, rendered-HTML suite, typecheck, and Vercel production build on the Mac mini. Rendered assertions cover Venmo-only presentation, setup disclosure, and absence of the former card token. They do not establish provider functionality or replace an interactive client walkthrough.

Local verification passed on the Mac mini: 42 rendered-HTML tests including the Vinext build, lint (zero errors; 10 pre-existing image warnings), typecheck, and the native Vercel production build. Browser interaction QA was not performed in this pass.

Cartoon surcharge update: all 44 tests passed, including fee rounding, empty-cart totals, and shipping threshold cases; both build paths and typecheck passed. Lint remained at zero errors and the same 10 pre-existing warnings. The generated cutout was visually inspected; browser interaction QA was not performed.
