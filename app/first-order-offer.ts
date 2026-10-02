export const FIRST_ORDER_OFFER_KEY = "pow_demo_first_order_offer_v1";
export type OfferStatus = "locked" | "available" | "used";
type OfferStorage = Pick<Storage, "getItem" | "setItem">;

export function readOfferStatus(storage: Pick<Storage, "getItem">): OfferStatus {
  const value = storage.getItem(FIRST_ORDER_OFFER_KEY);
  return value === "available" || value === "used" ? value : "locked";
}

export function claimFirstOrderOffer(storage: OfferStorage, email: string): OfferStatus {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) throw new Error("Enter a valid email address to unlock the menu.");
  const status = readOfferStatus(storage) === "used" ? "used" : "available";
  // Store only demo eligibility. Never persist or transmit the submitted email.
  storage.setItem(FIRST_ORDER_OFFER_KEY, status);
  return status;
}

export function redeemFirstOrderOffer(storage: OfferStorage) {
  if (readOfferStatus(storage) === "available") storage.setItem(FIRST_ORDER_OFFER_KEY, "used");
}

export function isShoppingRoute(pathname: string) {
  return pathname === "/" || ["/shop", "/categories", "/bundles", "/build-a-box", "/bulk", "/compare", "/subscribe", "/rewards", "/cart", "/checkout"].some(route => pathname === route || pathname.startsWith(`${route}/`));
}
