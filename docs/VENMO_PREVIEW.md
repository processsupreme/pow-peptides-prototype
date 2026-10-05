# Venmo and Zelle invoice checkout

Updated October 4, 2026. POW supplied an example of its current text-confirmation → invoice → manual Venmo/Zelle payment process and requested a website version. Checkout now demonstrates that manual invoice journey in place of the simulated Venmo approval dialog.

## Current implementation

- `/checkout` offers Venmo and Zelle, retains the existing contact/shipping form and affiliate code controls, and prepares an itemized sample invoice.
- The invoice snapshots product names, strengths, quantities, supplied unit prices, applied discount, the existing demo surcharge/shipping, and total. Every new invoice receives a UUID-based `POW-DEMO-…` reference. Returning to the invoice or reporting payment preserves that reference and amount.
- The payment contact is **(619) 439-3459**, transcribed from the user-supplied POW invoice. No customer identity, address, email, or invoice screenshot from that example was added to the repository. The supplied example's VIP rate, historical prices, shipping amount, branding, and invoice sequence do not replace the existing approved catalog and design.
- Customers can copy the contact number, sample amount, invoice reference, or complete sample invoice, and print/save a PDF using their browser. Copy success is shown only after the clipboard succeeds; failure tells the customer how to copy manually.
- Zelle instructions describe payment through the customer's bank, recipient verification, and including the invoice reference if a memo field is available. Venmo instructions require the actual business profile. No invented recipient URL, deep link, or payment QR is emitted.
- **Preview “I sent payment”** changes `awaiting_payment` to `payment_reported`, explicitly unverified. It never marks an order paid, redeems a coupon, uses the first-order offer, clears the cart, reserves inventory, or initiates fulfillment. There is no customer-side paid transition.
- One invoice snapshot is stored in this tab's session storage as `pow_demo_manual_invoice_v1`. It survives reloads and navigation in the same tab. The parser validates its version, status, line data, and totals; invalid data is not rendered as a valid invoice. Only allowlisted invoice fields are stored, never the checkout form. Storage denial or silent write failure shows a warning and keeps the invoice usable in memory.
- Returning to checkout retains the entered form details in React memory and offers reopening the previous sample invoice. A changed cart requires generating a new sample. Reloading does not restore personal details.

## Client walkthrough

1. Unlock the email offer with a synthetic address, add a product/bundle, and open `/checkout`.
2. Dismiss the existing tariff cameo, select **Fill sample details**, choose Zelle or Venmo, and check the existing acknowledgments.
3. Select **Review sample invoice**. Inspect line items, savings, total, unique reference, payment instructions, and copy/print controls.
4. Return to checkout and reopen the invoice. Reload while viewing it: its reference, amount, and status remain the same in this tab.
5. Check the simulated payment-report acknowledgment, then select **Preview “I sent payment”**. The state is **Awaiting POW! verification**, not paid. No message is delivered to POW.
6. Check the cart and first-order offer/affiliate inventory: they remain unchanged. Try the other payment method by returning to checkout and generating a new sample.

All views and exported invoices say **sample / do not pay**. This is not an active order intake or payment integration. Do not transfer money using this preview. No Venmo/Zelle authentication, bank connection, merchant SDK, email service, or server-side order storage is connected. The legacy illustrative tracking page is not linked to these invoices.

## Outstanding inputs for live wiring

Requested from the user during implementation:

1. Confirm the recipient name displayed for the supplied number in Zelle, and supply the actual Venmo business @username/profile link. A phone number cannot locate a Venmo business profile.
2. Identify where submitted orders should be delivered and managed: an existing order system, designated inbox, or staff dashboard. Do not assume the payment phone is also an authorized order-submission destination.

Once the destination is supplied, complete durable server-side order creation with server-authoritative item/discount totals, a stable order reference, retry/idempotency handling, and delivery to POW before presenting a payable invoice. POW's manual payment verification must be an authenticated staff action with an audit record; reporting payment from the customer page is not proof. Coupon reservation/redemption and welcome-offer eligibility must be tied to that durable order lifecycle. Confirm final shipping/fee/tax rules and recipient/account details before enabling live payments. Autoship and automatic recurring debits are not implemented by a manual transfer.

Provider references checked October 4, 2026:
- [Venmo: buying from business profiles](https://help.venmo.com/cs/articles/buying-from-business-profiles-on-venmo-vhel139) — business profiles cannot be located or paid using phone numbers/email addresses.
- [Zelle: small business use](https://www.zellepay.com/faq/small-business-using-zelle) — customers use supported banking services; receiving business enrollment depends on its financial institution.

These references describe general functionality, not confirmation of POW's account or catalog approval.

## Verification

Automated regressions cover both method controls, invoice/cart arithmetic across approved discount tiers and shipping boundaries, immutable snapshots, unique references, repeat payment reports, restoration validation, rejected paid states, no persisted customer fields, sample export warnings, and non-consumption of coupons/offers/cart on reports. See PROJECT_STATUS.md for final build and browser results. No real transfer, order delivery, bank app handoff, provider account identity, or staff verification has been tested.
