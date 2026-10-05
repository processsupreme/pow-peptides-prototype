export const FIRST_ORDER_OFFER_KEY = "pow_demo_first_order_offer_v1";
export const FIRST_ORDER_OFFER_COOKIE = "pow_demo_offer";
export type OfferStatus = "locked" | "available" | "used";
type OfferStorage = Pick<Storage, "getItem" | "setItem">;

export function parseOfferStatus(value: string | null | undefined): OfferStatus {
  return value === "available" || value === "used" ? value : "locked";
}

// Accessors are lazy: even obtaining localStorage can throw in an embedded browser.
export function resilientOfferStorage(sources: (() => OfferStorage)[]): OfferStorage {
  return {
    getItem(key) {
      let available = false;
      for (const source of sources) {
        try {
          const status = parseOfferStatus(source().getItem(key));
          if (status === "used") return "used";
          if (status === "available") available = true;
        } catch { /* Try the next browser persistence mechanism. */ }
      }
      return available ? "available" : null;
    },
    setItem(key, value) {
      let saved = false;
      for (const source of sources) {
        try {
          const storage = source();
          storage.setItem(key, value);
          // Some webviews silently discard writes instead of throwing.
          if (storage.getItem(key) === value) saved = true;
        } catch { /* A working fallback is sufficient. */ }
      }
      if (!saved) throw new Error("Browser storage is unavailable.");
    },
  };
}

export function readOfferCookie(cookie: string): OfferStatus {
  return parseOfferStatus(cookie.split(";").map(part => part.trim()).find(part => part.startsWith(`${FIRST_ORDER_OFFER_COOKIE}=`))?.slice(FIRST_ORDER_OFFER_COOKIE.length + 1));
}

export function offerCookie(status: Exclude<OfferStatus, "locked">, secure: boolean) {
  return `${FIRST_ORDER_OFFER_COOKIE}=${status}; Path=/; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export function readOfferStatus(storage: Pick<Storage, "getItem">): OfferStatus {
  const value = storage.getItem(FIRST_ORDER_OFFER_KEY);
  return parseOfferStatus(value);
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
