# POW! Balm product concept

Updated November 9, 2026 from the user's supplied details: **POW! Balm, 2 oz, $78 per jar, Diphenhydramine + KP**. These replace the October 8 cream concept and selected $39 price. KP follows the latest spelling; confirmation against the earlier KPV wording remains open. No stock quantity has been supplied.

## Product copy

> A little comfort, with a lot of POW! A 2 oz balm featuring Diphenhydramine + KP. POW! describes its patented formula as intended for localized skin comfort, targeting the stinging, welts, and itching that can follow an injection.

The patent and intended-use statements remain attributed to POW. Patent documentation, ingredient concentrations, directions, final packaging, product evidence, and availability remain pending. The user requested a registered trademark symbol; registration confirmation is still needed before adding ®. A patent does not establish trademark registration. No registration, patent number, or clinical evidence was invented.

## Shopping behavior

- Homepage spotlight, shop feature, navigation, and `/shop/pow-cream` use the shared product record in `app/pow-cream.ts`. The existing URL and cart ID are retained for compatibility.
- Each addition places one $78, 2 oz jar in the local cart. Open carts containing the old $39 item refresh to current details while preserving quantities. Previously saved invoices and orders retain their historical snapshots.
- Existing welcome/affiliate discounts, demo fees, and shipping apply through the shared totals. No live sale, shipment, stock decrement, or payment is created. Supplied vial inventory remains untouched.

## November 9 image edit

- Current asset: `public/products/pow-balm-2oz-jar.png`.
- Built-in imagegen edited the prior jar concept to read **BALM**, **DIPHENHYDRAMINE + KP**, and **2 OZ**, preserving the jar, cream swirl, lid, studio background, and black/white/lime identity.
- No trademark symbol, patent badge, price, or medical claim appears on the label. The generated image was visually inspected; it is proposed packaging, not a manufactured-product photograph.
- The earlier asset and original approved brand artwork remain unchanged. The original October 8 provenance below records the superseded label.

## Image provenance

- Saved asset: `public/products/pow-cream-balm-jar.png` (1254 × 1254 PNG).
- Generated with the built-in imagegen tool; one request, no alternate variants.
- Reference: existing approved `public/brand-assets/png/pow-logo-primary-transparent.png`.
- This is AI-generated packaging concept imagery, not a photograph of an existing manufactured jar. The generated logo is visually consistent but not pixel-identical to the source; original approved brand assets were not modified. Final production packaging should use the original logo artwork.
- Inspected for the wide balm jar, visible cream, black lid, correct label text, black/white/lime colors, safe image edges, and absence of invented net weight or medicinal claims on the label.

Exact generation prompt:

```text
Use case: product-mockup
Asset type: square high-resolution ecommerce product image for a homepage spotlight and catalog.
Primary request: Create one photorealistic packaging concept for POW! cream. Use the supplied reference image only as the exact approved front-label logo; preserve its full white POW lettering, PEPTIDES text, black graphic geometry, electric-lime lightning stroke and electric-lime exclamation point intact.
Subject: One wide, low cream/balm jar with a white jar body and bold black wraparound label with electric-lime #A5EF2E accents. The jar is open, with creamy ivory balm visible and a subtle swirl. Its matte black screw lid rests slightly behind and to one side. No other products.
Label: Make the supplied POW! PEPTIDES logo prominent and intact on the front black label. Beneath the logo, render these exact secondary label lines cleanly and legibly: "CREAM" and "BENADRYL + KPV". These are the only extra label words.
Scene/backdrop: Warm white #F5F2E9 seamless studio background and surface, soft realistic grounding shadow.
Style/medium: Premium photorealistic ecommerce studio product mockup, realistic white jar plastic, matte black lid texture and rich creamy ivory balm.
Composition/framing: Square 2048 by 2048 composition, three-quarter front view with clear readable front label and visible open cream surface. Jar and lid fill the frame well, centered as a group, with safe margins on all edges.
Lighting/mood: Clean premium studio lighting, soft highlights, crisp label detail, professional catalog polish.
Constraints: This is generated packaging concept imagery. Match the bold black/white/electric-lime POW vial brand style. Preserve logo colors and geometry; no redesign.
Avoid: No vial, pill bottle, syringe, claims, patent badge, fake size or net weight, concentration, dosage, price, badges, unrelated text, watermark, additional objects, or superhero character likenesses.
```
