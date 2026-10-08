// Prototype-only surcharge requested by POW. Never a live tax calculation.
export const SHIPPING_OPTIONS = {
  priority: { label: "Priority shipping", freeAt: 800, price: 12 },
  overnight: { label: "Overnight shipping", freeAt: 1300, price: 70 },
} as const;
export type ShippingMethod = keyof typeof SHIPPING_OPTIONS;

// Use pre-discount merchandise. The $12 priority charge remains a demo assumption.
export function shippingCharge(merchandise: number, method: ShippingMethod = "priority") {
  const cents = Math.round(merchandise * 100);
  const option = SHIPPING_OPTIONS[method];
  return cents === 0 || cents >= option.freeAt * 100 ? 0 : option.price;
}

export function demoCheckoutTotals(merchandise: number, firstOrderOffer = false, affiliatePercent = 0, shippingMethod: ShippingMethod = "priority") {
  const merchandiseCents = Math.round(merchandise * 100);
  const percent = Math.max(firstOrderOffer ? 10 : 0, [10, 15, 20, 25].includes(affiliatePercent) ? affiliatePercent : 0);
  const discountCents = Math.round(merchandiseCents * percent / 100);
  const discountedCents = merchandiseCents - discountCents;
  const tariffCents = Math.round(discountedCents * 5 / 100);
  const shippingCents = shippingCharge(merchandise, shippingMethod) * 100;
  return {
    discount: discountCents / 100,
    tariff: tariffCents / 100,
    shipping: shippingCents / 100,
    total: (discountedCents + tariffCents + shippingCents) / 100,
  };
}
