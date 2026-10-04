"use client";

import { useMemo, useSyncExternalStore } from "react";
import { COUPON_STORE_KEY, emptyCouponStore, parseCouponStore, type CouponStore } from "./affiliate-coupons";

const CHANGE_EVENT = "pow-coupons-change";
function subscribe(notify: () => void) {
  const changed = (event: StorageEvent) => { if (!event.key || event.key === COUPON_STORE_KEY) notify(); };
  window.addEventListener(CHANGE_EVENT, notify);
  window.addEventListener("storage", changed);
  return () => { window.removeEventListener(CHANGE_EVENT, notify); window.removeEventListener("storage", changed); };
}
function snapshot() { try { return localStorage.getItem(COUPON_STORE_KEY); } catch { return "storage-unavailable"; } }
const serverSnapshot = () => null;

export function readCouponInventory() { return parseCouponStore(localStorage.getItem(COUPON_STORE_KEY)); }
export function updateCouponInventory(update: (current: CouponStore) => CouponStore) {
  const state = update(readCouponInventory());
  localStorage.setItem(COUPON_STORE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return state;
}
export function useAffiliateCoupons() {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return useMemo(() => {
    try { return { state: parseCouponStore(raw), error: "" }; }
    catch { return { state: emptyCouponStore, error: "Demo coupon storage is unavailable or unreadable. Restore browser storage to continue; existing inventory has not been replaced." }; }
  }, [raw]);
}
