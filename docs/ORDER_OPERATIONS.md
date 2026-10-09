# POW! order management and USPS workflow

## Client request and proposed scope

POW currently has no order management system and ships through USPS. Build the staff system that receives orders and drives the customer order dashboard. POW supplies the people doing the work; the website supplies their queue, records, and next steps.

The proposed first release supports manual Venmo/Zelle reconciliation and USPS tracking entry. Staff can continue buying postage through their current method. Label purchasing inside the website and automatic carrier event synchronization are separate integration work, not prerequisites for demonstrating the process.

## Daily operating instructions

1. **Review new orders.** Check purchased items, quantities, shipping selection, customer contact, address, and invoice total. A submitted order starts awaiting payment; a customer saying they paid starts a review, not fulfillment.
2. **Verify payment.** The designated payment reviewer checks the business's actual Venmo or bank records. Match the amount and order reference. If the payment cannot be matched, hold the order and contact the customer. Never ship based solely on a screenshot or customer report.
3. **Prepare the order.** After payment is confirmed, the packer checks the items and quantities against the order. Follow POW's approved packaging and handling instructions. Missing stock or an address problem goes into the attention queue.
4. **Purchase the USPS label.** Use the team's existing label-buying method. Confirm destination, package weight/dimensions, and the appropriate service before purchasing. Customer-facing priority/overnight options still need to be mapped to actual USPS services and destination availability; the website price is not the postage cost.
5. **Attach tracking.** Record the tracking number against the correct order. This means a label exists; it does not mean USPS has accepted the package.
6. **Hand the package to USPS.** Retain the acceptance receipt where available. Carrier acceptance and later scans inform in-transit and delivered statuses. Until automated tracking is connected, the customer can follow the carrier link and staff can review carrier events manually.
7. **Monitor exceptions.** Review unpaid orders, unmatched payments, packing holds, and delayed or unsuccessful deliveries. Contact customers through the approved support channel. Refund, cancellation, lost-package, and reshipment policies need client approval.
8. **Retain completed orders.** Delivered orders stay in customer history with items, total, payment record, tracking, and dated status events.

One person may perform all staff roles initially. Each action should still be attributable to a staff account in the production system.

## Customer experience

- My Orders lists current and completed purchases.
- An order detail page shows the invoice, payment state, fulfillment timeline, selected shipping option, tracking information, and support action.
- A secure email link lets a customer reach one order without navigating the account dashboard.
- Payment reporting never changes an order to paid. Label creation never changes an order to in transit. Shipping fees and requested speed do not establish a delivery guarantee.

## Inputs we need from POW

We will propose the technical implementation. The client needs to provide business facts:

- Names and email addresses of staff who verify payments, pack orders, and handle customer questions.
- Confirmed business payment recipient details.
- Their current USPS label-buying method and business account owner; access later by invitation where supported.
- Ship-from/return address, package sizes and weights, and approved product handling instructions.
- Operating days, order cutoff, supported destinations, and approval of shipping service choices.
- Customer support email and approval of notification wording.
- Decisions on unpaid-order expiry, cancellations, refunds, damaged/lost packages, and reshipments.

Do not put real customer details, account credentials, or private business records in this public prototype repository.

## Prototype walkthrough

1. Open `/ops`, select the starter sample, acknowledge the simulation, and confirm its sample payment. Or add a product to the cart and review a sample checkout invoice to create another record.
2. Mark the order packed, attach `USPS-DEMO-1001`, simulate carrier acceptance, then simulate delivery. Holds prevent advancement until released.
3. Open the customer's order link or `/account/orders`. The same record and totals appear in the history and timeline. The old `POW-DEMO-1001` lookup remains an alias for the starter sample.
4. Open the customer email preview in staff controls. No email is sent; this link works in the same browser only and is not a secure production access mechanism.
5. Reload or open another tab on the same origin. Orders persist in local storage and changes synchronize. A storage error is shown instead of claiming an update was saved. Customer form fields are never copied to the order store.

Prototype limits: one shipment per order; synthetic tracking tokens only; no stock deduction, welcome-offer consumption, affiliate coupon redemption, or real payment reconciliation. Holds are reversible demo controls, not a production incident audit. No cancellation/refund workflow is implied. Account and staff areas have no authorization boundary, so use synthetic data exclusively. Cross-device access, secure emailed links, real carrier events, and notifications remain launch work.

## Launch implementation

Production requires durable order records, authenticated staff access, customer ownership checks, secure expiring order links, notification delivery, backups, and an audit trail. Payment reconciliation must be recorded server-side. USPS events must come from a supported carrier integration or an identified manual process. Label purchase, stock allocation, split shipments, returns/refunds, and subscription fulfillment need explicit scope and acceptance criteria.

The current prototype is not a production order management service. No staff notification, real payment verification, postage purchase, or carrier lookup is performed by the prototype.

## USPS reference

[USPS tracking status guidance](https://faq.usps.com/articles/Knowledge/Where-is-my-package), checked October 9, 2026, distinguishes label creation / USPS awaiting item from acceptance, transit, and delivery. The workflow preserves that distinction.
