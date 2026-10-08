# POW! Cream product concept

The user requested a product image in a balm/cream jar, original description, and a price decision on October 8, 2026. The selected prototype price is **$39 per jar**. This is a retail concept decision made at the user's direction, not a cost-based margin calculation. No jar size or stock quantity has been supplied.

## Product copy

**POW! Cream — Benadryl + KPV**

> A little comfort, with a lot of POW! Benadryl and KPV come together in a balm-style cream designed for localized skin comfort. POW!’s product brief targets the stinging, welts, and itching that can follow an injection.

The product accordion attributes the patent and intended-use description to POW and identifies the remaining documentation. No clinical results, concentrations, directions, or patent number were invented. Jar size, final formula/label, evidence, patent documentation, and actual availability remain unresolved. These do not block the local shopping demonstration.

## Shopping behavior

- Homepage spotlight immediately below the hero, compact shop feature, and `/shop/pow-cream` detail page use one product record in `app/pow-cream.ts`.
- Each addition places one $39 jar in the existing local cart. Repeated additions and cart quantity controls count jars. The cart uses the product image and says “per jar.”
- Existing welcome/affiliate discounts, fees, and selected shipping apply through the shared totals. Invoice snapshots retain the cream name, jar description, price, and quantity.
- No live sale, shipment, stock decrement, or payment is created. The supplied research-vial inventory remains untouched.

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
