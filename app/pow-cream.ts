// POW! Balm name, 2 oz size and $78 price supplied November 9, 2026.
// KP follows the latest supplied spelling; clarification versus earlier KPV is pending.
// Trademark registration, concentrations, stock and live availability remain unconfirmed.
export const powCream = {
  slug: "pow-cream",
  name: "POW! Balm",
  price: 78,
  size: "2 oz",
  formula: "Diphenhydramine + KP",
  description: "A little comfort, with a lot of POW! A 2 oz balm featuring Diphenhydramine + KP. POW! describes its patented formula as intended for localized skin comfort, targeting the stinging, welts, and itching that can follow an injection.",
  image: "/products/pow-balm-2oz-jar.png",
};

export function creamCartItem() {
  return {
    id: "pow-cream-jar", slug: powCream.slug, name: powCream.name,
    strength: `${powCream.formula} · ${powCream.size} · 1 jar`,
    unitPrice: powCream.price, qty: 1, tone: "lime" as const, unitLabel: "jar",
  };
}

// Update open carts to the supplied product details; saved invoices remain snapshots.
export function refreshCreamCartItem<T extends {id:string; qty:number}>(item:T):T {
  return item.id === "pow-cream-jar" ? {...item, ...creamCartItem(), qty:item.qty} : item;
}
