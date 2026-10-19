# POW! work-order cross-reference — October 19, 2026

Reviewed the POW! work list, individual request details, completion descriptions, and associated October call/shipping notes. Compared them with this checkout, its tests, and the deployed partner portal, customer history, tracking, and staff queue. No work-order records were edited or messages sent.

The board contains 14 visible work orders: two in progress, three awaiting client review, and nine closed. There is no visible POW-007 entry. A board's completion status means the described prototype was delivered, not that production integrations are connected.

## Outstanding work

### POW-004 — Affiliate tree and downline sales share

The deployed partner portal had coupon and ledger previews but no sponsor tree or downline sales view. This branch adds `/partner/network`, available from the Network tab and a Command Center link.

- Select a synthetic affiliate to see their sponsor, direct recruits, full downline, and attributed sample sales.
- Simulate an invitation under an active sponsor, activate that recruit, and add a fictional $200 merchandise sale. Invited members cannot recruit or generate sales.
- Filter direct versus deeper-level sales. A member's own orders are excluded from that member's downline view.
- Simulate payment confirmation and refunds. Pending and refunded sales contribute nothing to the illustrative share.
- Enter a hypothetical percentage and earning depth. No rate is preselected or represented as an approved commission. The calculation basis and depth are explicitly illustrative; the percentage is not persisted.
- Membership and sample order state persist in this browser under `pow_affiliate_network_demo_v1`. Reset affects only this scenario. No invitation, payment, commission, or payout is sent or created.

The scenario is intentionally independent of the existing coupon inventory and staff checkout orders. Production still requires approved percentages and earning levels, eligibility/attribution/refund rules, approval and payout timing, authenticated accounts, shared storage, and a server-side ledger tied to verified orders. The client request still says the percentage is TBD.

**Delivery:** implemented locally on this branch; not published by this task. `/partner/network` on the current live deployment must not be presented as the completed new feature until a separate deployment succeeds.

### POW-006 — Zelle and Venmo details

Already implemented: selectable payment method, itemized sample invoice, memo/reference, manual payment report, and staff verification before fulfillment. See `ManualInvoice.tsx`, `manual-invoice.ts`, `OrderManagement.tsx`, and [order operations](ORDER_OPERATIONS.md).

Still required from POW!: verified Venmo business profile URL/handle, confirmation of the enrolled Zelle recipient name and identifier, and confirmation that the existing invoice instructions match the intended live workflow. The original notes also requested example invoice trails. Current code includes a previously supplied payment contact; it does not turn that contact into an unverified Venmo recipient or open a live payment. No new recipient information was found in the reviewed work-order material.

The sample checkout is at <https://pow-peptides-prototype.vercel.app/checkout>. Payment setup remains incomplete until those details and production verification responsibilities are confirmed.

## Delivered prototype cross-reference

| Work order | Board state at review | Existing implementation / review link |
| --- | --- | --- |
| POW-001 — product detail content | Closed | 38 product profiles with original research summaries, sources, benefit/evidence framing; `ProductResearch.tsx`, `product-science.ts`, `product-benefits.ts`; [shop](https://pow-peptides-prototype.vercel.app/shop). |
| POW-002 — email popout / 10% first order | Closed | Browser-local offer gate and fallback, `EmailOffer.tsx` and `first-order-offer.ts`; [homepage](https://pow-peptides-prototype.vercel.app/). No marketing provider connected. |
| POW-003 — supplied bundles | Closed | Five supplied bundles, fixed prices and cart items, `ResearchBundles.tsx` and `pow-bundles.ts`; [bundles](https://pow-peptides-prototype.vercel.app/bundles). |
| POW-005 — affiliate discount codes | Closed | Synthetic signup, recipient assignment, code validation and coupon inventory, `AffiliateCoupons.tsx` and `affiliate-coupons.ts`; [coupon demo](https://pow-peptides-prototype.vercel.app/partner/coupons). The work-order completion still uses an older branch-preview URL; use this main prototype URL for future client references. |
| POW-008 — free priority at $800 | Closed | Inclusive threshold in `demo-checkout-totals.ts`, propagated to cart/invoice; [checkout](https://pow-peptides-prototype.vercel.app/checkout). |
| POW-009 — $70 overnight / free at $1,300 | Closed | Selectable shipping and inclusive threshold in the same totals model; [checkout](https://pow-peptides-prototype.vercel.app/checkout). |
| POW-010 — customer tracking | Client checking | Shared sample order timeline, shipment reference, unknown-order state; `OrderManagement.tsx` and `demo-orders.ts`; [sample tracking](https://pow-peptides-prototype.vercel.app/track-order?order=POW-DEMO-1001). |
| POW-011 — Superman name | Closed | Storefront name/slug mapping and legacy redirect, `product-names.ts`; [Superman](https://pow-peptides-prototype.vercel.app/shop/superman). |
| POW-012 — Batman name | Closed | Same name/slug mapping and legacy redirect; [Batman](https://pow-peptides-prototype.vercel.app/shop/batman). |
| POW-013 — POW! cream | Closed | Homepage/shop spotlight, balm jar artwork, dedicated page, $39 demo price and cart/invoice integration; `CreamSpotlight.tsx`, `pow-cream.ts`; [cream](https://pow-peptides-prototype.vercel.app/shop/pow-cream). Formula, packaging and final product claims/pricing remain client confirmations. |
| POW-014 — My Orders | Client checking | Browser-local order history retains delivered orders; [My Orders](https://pow-peptides-prototype.vercel.app/account/orders). |
| POW-015 — staff dashboard | Client checking | Payment review → packing → label → carrier acceptance → delivery, holds and unsent notification previews; [staff dashboard](https://pow-peptides-prototype.vercel.app/ops). |

The closed items' source and existing regression checks support their prototype completion. This audit did not repeat every historic browser journey or validate production capabilities.

## Other open inputs and separate scope

- Shipping/labels: the October 12 questionnaire has no answers in the reviewed notes. Account/service ownership, ship-from/return details, actual USPS services, packaging weights/dimensions, printer, postage funding, staff duties, partial shipments, customer notifications and exception policies remain production inputs. Staff and customer order demos are already connected to each other locally.
- Dispatch wording: the October 8 notes supply weekday/weekend cutoff information, including Friday-to-Saturday dispatch. The recap asks for placement confirmation; the later questionnaire asks to confirm shipping days/cutoff and holiday handling. This audit does not invent a firm delivery promise or resolve the remaining after-cutoff/time-zone details.
- Shipping thresholds currently use pre-discount merchandise and the existing below-threshold priority fee. Threshold basis, destinations and the baseline fee still need production confirmation.
- Inventory: no standalone inventory work order appears in the reviewed list. The separate Process Supreme operations demo remains separate scope. The inventory/pricing prototype is preserved on its original local branch and excluded from this affiliate-only release. Do not count it as a production inventory integration or silently publish it as part of this audit.
- Production accounts, email/SMS, payment verification, real label purchasing and carrier events are deferred launch work. Existing demos cannot receive real orders or secure staff/customer data.

## Review the new network

1. Run the local app and open `/partner/network`.
2. Observe the unset commission rate. Enter any hypothetical rate and switch direct recruits / first two levels to compare the example calculation.
3. Confirm Jordan's pending sample order, then refund Alex's confirmed sample order; verify the estimate changes accordingly.
4. Select Alex, simulate inviting a recruit, select the new recruit, simulate joining, and add a sample sale.
5. Select Alex again to see the sale at level one, then the root account to see it at level two. Reload to verify membership/order persistence; the hypothetical rate returns to blank.
6. Reset the network demo after presenting it.

Validation results and delivery status are recorded in [project status](PROJECT_STATUS.md).
