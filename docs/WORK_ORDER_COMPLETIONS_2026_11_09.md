# POW! work-order completion notes — November 9, 2026

Published to the existing public prototype. These notes cover the latest balm, affiliate discount, and affiliate tier requests. Work-order IDs reference the previously reviewed board; no records or client messages were changed.

## POW-013 — POW! Balm product updates

**Completed:** Renamed the featured cream to POW! Balm and updated the supplied size to 2 oz, price to $78 per jar, and ingredient label to Diphenhydramine + KP. Updated the homepage spotlight, shop feature, product page, navigation, cart presentation, and new sample invoices. Created revised balm-jar concept artwork matching POW's existing black, white, and lime branding. Open carts refresh older balm details while previously saved invoice/order snapshots retain their original amounts.

**Review:** [Product page](https://pow-peptides-prototype.vercel.app/shop/pow-cream) · [Homepage spotlight](https://pow-peptides-prototype.vercel.app/#pow-cream) · [Product image](https://pow-peptides-prototype.vercel.app/products/pow-balm-2oz-jar.png).

**Still needed from Mike:** Confirm KP versus the earlier KPV spelling, trademark registration before adding ®, and supporting patent/formula/label documentation. The patent description is attributed to POW. The product image is packaging concept artwork, and checkout remains a demo.

## POW-005 — Affiliate discount / commission deduction

**Completed:** Added an interactive commission-rate preview to the affiliate coupon section. Customer discounts reduce the affiliate's base commission by the same number of percentage points: a 30% commission with a 10% customer discount becomes 20%, not 27%. Changing the discount updates the preview and the comparison across all four affiliate tiers. Discounts above the selected tier's commission display a policy-decision message rather than calculating a negative payout.

**Review:** [Affiliate coupon and commission preview](https://pow-peptides-prototype.vercel.app/partner/coupons).

**Still needed from Mike:** Confirm whether dollar commission uses merchandise value before or after the customer discount, and what happens when a discount exceeds the affiliate's commission rate. No real earnings or payouts are recorded.

## Affiliate tiers — addition to POW-005

**Completed:** Added four affiliate tiers exactly as supplied: Tier 1 at 30%, Tier 2 at 20%, Tier 3 at 25%, and Tier 4 at 15%. Affiliates can preview each tier's rate after a customer discount. Qualification thresholds are marked for Mike to set; no sales targets or automatic tier-assignment rules were invented. These direct-sale tiers are separate from the hypothetical downline calculator.

**Review:** [Four-tier table and selector](https://pow-peptides-prototype.vercel.app/partner/coupons).

**Still needed from Mike:** Qualification thresholds and rules for moving between tiers. Tier selection currently previews the model; it does not assign a real account tier.

## Delivery and verification

- Feature commit: `f45f745`; deployed source commit: `1b68b10`.
- Release branch: `release/balm-affiliate-2026-11-09`, pushed to the existing GitHub repository; no merge to main.
- Vercel deployment: `dpl_5XG8dECoaeAJNyhoHRQEy3Xg4NZL`, built on the Mini and uploaded as prebuilt output, then promoted.
- All 94 automated tests, lint (11 existing image warnings), Vinext build, and Next/TypeScript production build passed.
- Public coupon/product pages and product image verified. Live image matches the committed asset. Desktop Chrome verified Tier 4 with a 10% discount displays a 5% commission rate. Mobile layout and the full clicked checkout journey were not retested in this release.
- Git automatic deployments are suppressed by `git.deploymentEnabled: false` in this branch. Repository checks found no Actions workflows or webhooks; only the existing POW Vercel project was linked in the inspected team, with no deploy hooks. Post-push deployment inspection showed the CLI deployment and no new Git deployment.
