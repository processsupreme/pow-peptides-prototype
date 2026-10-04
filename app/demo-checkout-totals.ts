// Prototype-only surcharge requested by POW. Never a live tax calculation.
export function demoCheckoutTotals(merchandise: number, firstOrderOffer = false, affiliatePercent = 0) {
  const merchandiseCents = Math.round(merchandise * 100);
  const percent = Math.max(firstOrderOffer ? 10 : 0, [10, 15, 20, 25].includes(affiliatePercent) ? affiliatePercent : 0);
  const discountCents = Math.round(merchandiseCents * percent / 100);
  const discountedCents = merchandiseCents - discountCents;
  const tariffCents = Math.round(discountedCents * 5 / 100);
  // Preserve the existing demo shipping threshold on the supplied merchandise price.
  const shippingCents = merchandiseCents >= 20000 || merchandiseCents === 0 ? 0 : 1200;
  return {
    discount: discountCents / 100,
    tariff: tariffCents / 100,
    shipping: shippingCents / 100,
    total: (discountedCents + tariffCents + shippingCents) / 100,
  };
}
