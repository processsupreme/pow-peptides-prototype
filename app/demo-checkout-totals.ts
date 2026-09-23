// Prototype-only surcharge requested by POW. Never a live tax calculation.
export function demoCheckoutTotals(merchandise: number) {
  const merchandiseCents = Math.round(merchandise * 100);
  const tariffCents = Math.round(merchandiseCents * 5 / 100);
  // Preserve the existing demo shipping threshold, before the surcharge.
  const shippingCents = merchandiseCents >= 20000 || merchandiseCents === 0 ? 0 : 1200;
  return {
    tariff: tariffCents / 100,
    shipping: shippingCents / 100,
    total: (merchandiseCents + tariffCents + shippingCents) / 100,
  };
}
