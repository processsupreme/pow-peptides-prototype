// Supplied by Mike via the user November 9, 2026. Tier order is intentional.
// Qualification thresholds and the dollar calculation base are still pending.
export const AFFILIATE_TIERS = [
  {id:1, percent:30},
  {id:2, percent:20},
  {id:3, percent:25},
  {id:4, percent:15},
] as const;

export function remainingCommissionRate(tierId:number, customerDiscount:number) {
  const tier = AFFILIATE_TIERS.find(row => row.id === tierId);
  if (!tier || !Number.isFinite(customerDiscount) || customerDiscount < 0 || customerDiscount > 100) throw new Error("Invalid affiliate tier or discount.");
  // Subtract percentage points: 30% - 10 points = 20%, never 30% * 90%.
  return tier.percent - customerDiscount;
}
