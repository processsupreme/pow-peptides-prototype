// Product concept and $39 prototype price selected at the user's request, October 8, 2026.
// No net weight, concentration, stock count, or live availability has been supplied.
export const powCream = {
  slug: "pow-cream",
  name: "POW! Cream",
  price: 39,
  formula: "Benadryl + KPV",
  description: "A little comfort, with a lot of POW! Benadryl and KPV come together in a balm-style cream designed for localized skin comfort. POW!’s product brief targets the stinging, welts, and itching that can follow an injection.",
  image: "/products/pow-cream-balm-jar.png",
};

export function creamCartItem() {
  return {
    id: "pow-cream-jar", slug: powCream.slug, name: powCream.name,
    strength: "Benadryl + KPV · balm-style cream · 1 jar",
    unitPrice: powCream.price, qty: 1, tone: "lime" as const, unitLabel: "jar",
  };
}
