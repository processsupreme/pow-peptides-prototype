import inventory from "./pow-inventory.json" with { type: "json" };

type BundleComponent = { name: string; slug?: keyof typeof inventory.products; strength?: string };
export type ResearchBundle = { slug: string; name: string; price: number; components: BundleComponent[] };

// Bundle names and fixed prices supplied by POW, October 2, 2026.
// Each listed component represents one vial in this local demonstration.
export const researchBundles: ResearchBundle[] = [
  { slug: "pilates", name: "Pilates research bundle", price: 200, components: [
    { name: "BPC-157 / TB-500", slug: "bpc-tb-500" }, { name: "GHK-Cu", slug: "ghk-cu" }, { name: "Tesa / Ipa", slug: "tesamorelin-ipamorelin" },
  ] },
  { slug: "goddess", name: "Goddess research bundle", price: 220, components: [
    { name: "GHK-Cu", slug: "ghk-cu" }, { name: "SNAP-8", slug: "snap-8" }, { name: "Epithalon", slug: "epitalon" }, { name: "KLOW", slug: "klow" },
  ] },
  { slug: "raver", name: "Raver research bundle", price: 200, components: [
    { name: "PT-141", slug: "pt-141" }, { name: "Oxytocin", slug: "oxytocin" }, { name: "Triple Threat" }, { name: "B12", slug: "vitamin-b12" },
  ] },
  { slug: "just-divorced", name: "Just divorced research bundle", price: 200, components: [
    { name: "Super Man", strength: "10 mg" }, { name: "KLOW", slug: "klow" }, { name: "GHK-Cu", slug: "ghk-cu" },
  ] },
  { slug: "benjamin-buttons", name: "Benjamin buttons bundle", price: 220, components: [
    { name: "GHK-Cu", slug: "ghk-cu" }, { name: "Epithalon", slug: "epitalon" }, { name: "SNAP-8", slug: "snap-8" }, { name: "Tesa / Ipa", slug: "tesamorelin-ipamorelin" },
  ] },
];

export function bundleContents(bundle: ResearchBundle) {
  return bundle.components.map(component => {
    const variant = component.slug ? inventory.products[component.slug][0] : undefined;
    return { ...component, strength: variant?.strength ?? component.strength ?? "Strength to be confirmed", pending: !variant };
  });
}

export function bundleCartItem(bundle: ResearchBundle) {
  return {
    id: `research-bundle-${bundle.slug}`, slug: bundle.slug, name: bundle.name,
    strength: bundleContents(bundle).map(item => `1 × ${item.name} · ${item.strength}${item.pending ? " (catalog details pending)" : ""}`).join(" / "),
    unitPrice: bundle.price, qty: 1, tone: "lime" as const, bundle: true, researchBundle: true,
  };
}
