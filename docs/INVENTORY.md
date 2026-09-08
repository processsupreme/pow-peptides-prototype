# Inventory and pricing

The user confirmed POW's supplied `Exisiting Invetory.docx` as the source of truth on September 8, 2026. The source document is retained locally; the approved product facts are maintained in `app/pow-inventory.json`. No credentials, customer information, or internal client costs are included.

## Data model

- Each existing product slug maps to an explicit list of variants with stable `id`, `strength`, `price` (USD per vial), and integer `stockCount` (vials).
- There are 38 product families, 39 variants, and 19,050 vials in this supplied snapshot. The snapshot date records receipt/confirmation, not an asserted warehouse audit date.
- `app/pow-data.ts` owns names, aliases, categories, imagery tones, and prototype flags. It derives the default strength/price from the first supplied variant, sums variant counts into product `stockCount`, and derives `inStock` from that total. There is no second handwritten price list.
- Reta GLP-3 has two variants: 10 mg, $80, 1,200 vials; and 20 mg, $105, 300 vials. All other products have one supplied variant.
- Tesamorelin / Ipamorelin includes the supplied composition of 13 mg / 3 mg (16 mg total). NAD+ remains 1000 mcg as explicitly supplied; no unit conversion to a different inventory strength is implied.
- Existing normalized product names and routes are preserved. The source's spelling variations are mapped to the existing families; naming confirmation, especially Prime 191 gf versus Prime 191 GH, remains separate from the confirmed numeric data.

## Website behavior

Catalog cards list supplied strengths, the starting price where multiple strengths exist, and total product stock. Product pages show only supplied variants, their exact price, and selected stock count. Cart merchandise totals multiply supplied prices by quantities without automatic volume discounts. Bulk cases and four-product boxes also use summed supplied prices without discounts or gifts. The existing bulk, comparison, subscription builder, and box selectors use the product's default supplied variant; both Reta strengths are purchasable from the product page.

The cart storage key was versioned for this change. Previous local demo carts are no longer loaded, preventing old prices or invented strengths from reappearing. Old storage is not deleted. This is still a no-charge prototype: inventory is not reserved or decremented, and shipping/fulfillment values remain labeled demonstrations. This stock snapshot does not establish a COA, lot release, live availability, or subscription eligibility.

## Maintaining the source

Update only from newly supplied or explicitly approved product data. Keep variant IDs stable for unchanged strengths; do not derive additional strengths, prices, discounts, or stock from a formula. Check the document's units and component amounts before normalizing its wording.

Run `npm run lint`, `npm test`, `npm run typecheck`, and `npm run vercel-build` on the Mac mini. The rendered-HTML suite includes an independent transcription of all 39 strength/price/count records and checks every product page. Update those expectations only when the authoritative input changes. Do not commit the private source document or local reconciliation artifacts.
