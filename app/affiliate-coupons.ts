export const COUPON_STORE_KEY = "pow_demo_affiliate_coupons_v1";
export const COUPON_TIERS = [10, 15, 20, 25] as const;
export type CouponTier = typeof COUPON_TIERS[number];
export type CouponStatus = "available" | "issued" | "redeemed" | "revoked";
export type AffiliateCoupon = { id: string; affiliateId: string; code: string; percent: CouponTier; status: CouponStatus; recipientEmail?: string; orderId?: string };
export type AffiliateProfile = { id: string; name: string };
export type CouponStore = { profile: AffiliateProfile | null; coupons: AffiliateCoupon[] };
export const emptyCouponStore: CouponStore = { profile: null, coupons: [] };
export const normalizeEmail = (email: string) => email.trim().toLowerCase();
export const normalizeCoupon = (code: string) => code.trim().toUpperCase();
export const isDemoEmail = (email: string) => /^[^\s@]+@example\.com$/.test(normalizeEmail(email));

export function parseCouponStore(raw: string | null): CouponStore {
  if (!raw) return emptyCouponStore;
  const state = JSON.parse(raw) as CouponStore;
  if (!state || !Array.isArray(state.coupons) || (state.profile !== null && (!state.profile || typeof state.profile.id !== "string" || typeof state.profile.name !== "string"))) throw new Error("Coupon data could not be read.");
  const ids = new Set<string>();
  const codes = new Set<string>();
  for (const coupon of state.coupons) {
    if (!coupon || !state.profile || coupon.affiliateId !== state.profile.id || typeof coupon.id !== "string" || typeof coupon.code !== "string" || !COUPON_TIERS.includes(coupon.percent) || !["available", "issued", "redeemed", "revoked"].includes(coupon.status) || ids.has(coupon.id) || codes.has(coupon.code) || (coupon.status !== "available" && !isDemoEmail(coupon.recipientEmail || ""))) throw new Error("Coupon data could not be read.");
    ids.add(coupon.id); codes.add(coupon.code);
  }
  return state;
}

// Two of each tier is sample inventory, not a POW allotment or replenishment rule.
export function completeAffiliateSignup(state: CouponStore, uuid: () => string): CouponStore {
  if (state.profile) return state;
  const profile = { id: uuid(), name: "Sample affiliate" };
  const coupons = COUPON_TIERS.flatMap(percent => Array.from({ length: 2 }, () => {
    const id = uuid();
    return { id, affiliateId: profile.id, percent, code: `POW-${percent}-${id.replaceAll("-", "").toUpperCase()}`, status: "available" as const };
  }));
  return { profile, coupons };
}

export function issueCoupon(state: CouponStore, affiliateId: string, couponId: string, email: string): CouponStore {
  if (!isDemoEmail(email)) throw new Error("Use a sample customer address ending in @example.com.");
  const coupon = state.coupons.find(item => item.id === couponId && item.affiliateId === affiliateId);
  if (state.profile?.id !== affiliateId || !coupon || coupon.status !== "available") throw new Error("This code is no longer available to assign.");
  return { ...state, coupons: state.coupons.map(item => item.id === coupon.id ? { ...item, status: "issued", recipientEmail: normalizeEmail(email) } : item) };
}

export function revokeCoupon(state: CouponStore, affiliateId: string, couponId: string): CouponStore {
  const coupon = state.coupons.find(item => item.id === couponId && item.affiliateId === affiliateId);
  if (state.profile?.id !== affiliateId || !coupon || coupon.status !== "issued") throw new Error("Only an issued code on this profile can be revoked.");
  return { ...state, coupons: state.coupons.map(item => item.id === coupon.id ? { ...item, status: "revoked" } : item) };
}

export function validateCoupon(state: CouponStore, code: string, email: string, verifiedEmail: string): { coupon: AffiliateCoupon; error?: never } | { coupon?: never; error: string } {
  if (!isDemoEmail(email) || normalizeEmail(email) !== normalizeEmail(verifiedEmail)) return { error: "Verify the checkout email in the demo before applying a code." };
  const coupon = state.coupons.find(item => item.code === normalizeCoupon(code));
  if (!coupon || coupon.status !== "issued" || coupon.recipientEmail !== normalizeEmail(email)) return { error: "This code is unavailable or belongs to a different customer. Ask your affiliate for a code assigned to you." };
  return { coupon };
}

export function redeemCoupon(state: CouponStore, code: string, email: string, verifiedEmail: string, orderId: string): CouponStore {
  const result = validateCoupon(state, code, email, verifiedEmail);
  if (result.error) throw new Error(result.error);
  if (!orderId.trim()) throw new Error("An order reference is required.");
  return { ...state, coupons: state.coupons.map(item => item.id === result.coupon!.id ? { ...item, status: "redeemed", orderId } : item) };
}

export function selectOrderDiscount(firstOrder: boolean, affiliatePercent = 0) {
  const firstOrderPercent = firstOrder ? 10 : 0;
  // Prototype default pending POW policy: one offer, with the larger rate winning.
  if (COUPON_TIERS.includes(affiliatePercent as CouponTier) && affiliatePercent >= firstOrderPercent) return { source: "affiliate" as const, percent: affiliatePercent };
  return { source: firstOrder ? "first-order" as const : "none" as const, percent: firstOrderPercent };
}
