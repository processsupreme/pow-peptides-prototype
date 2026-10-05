"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { claimFirstOrderOffer, FIRST_ORDER_OFFER_KEY, isShoppingRoute, readOfferStatus, redeemFirstOrderOffer, resilientOfferStorage, readOfferCookie, offerCookie, type OfferStatus } from "./first-order-offer";

const browserStorage = resilientOfferStorage([
  () => localStorage,
  () => sessionStorage,
  () => ({
    getItem: () => readOfferCookie(document.cookie),
    setItem: (_key: string, value: string) => { if (value === "available" || value === "used") document.cookie = offerCookie(value, location.protocol === "https:"); },
  }),
]);

const OFFER_EVENT = "pow-offer-change";
const OfferContext = createContext({ status: "locked" as OfferStatus, gated: false, consume: () => {} });

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => { if (!event.key || event.key === FIRST_ORDER_OFFER_KEY) callback(); };
  window.addEventListener("storage", onStorage);
  window.addEventListener(OFFER_EVENT, callback);
  window.addEventListener("pageshow", callback);
  window.addEventListener("focus", callback);
  return () => { window.removeEventListener("storage", onStorage); window.removeEventListener(OFFER_EVENT, callback); window.removeEventListener("pageshow", callback); window.removeEventListener("focus", callback); };
}
function snapshot(): OfferStatus { return readOfferStatus(browserStorage); }

export function useEmailOffer() { return useContext(OfferContext); }

function EmailOfferDialog({ onUnlock, returnTo }: { onUnlock: (email: string) => void; returnTo: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const element = dialog.current;
    // The server renders an open gate; upgrade it to the native modal top layer.
    if (element && typeof element.showModal === "function") { element.close(); element.showModal(); }
    input.current?.focus({ preventScroll: true });
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { if (element && typeof element.close === "function") element.close(); document.body.style.overflow = previous; };
  }, []);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    try { onUnlock(input.current?.value.trim() || ""); }
    catch { setError("Your browser couldn’t remember your access. Open this link in Safari or Chrome, allow site storage, and try again. Your email is still in the field."); }
  };

  return <dialog open ref={dialog} className="email-offer-dialog" aria-labelledby="email-offer-title" aria-describedby="email-offer-description" onCancel={event => event.preventDefault()}>
    <div className="email-offer-art" aria-hidden="true"><span>YOUR FIRST ORDER</span><div className="email-offer-number">10<span>%</span></div><b>OFF.</b><span className="email-offer-art-footer">A LITTLE WELCOME.<br/>A WHOLE LOT OF POW!</span></div>
    <div className="email-offer-copy"><Image src="/brand-assets/svg/pow-logo-primary.svg" alt="POW! Peptides" width={230} height={110} unoptimized className="email-offer-logo"/>
      <span className="email-offer-eyebrow">YOUR INVITATION TO THE LINEUP</span>
      <h2 id="email-offer-title">First order.<br/><em>Extra POW!</em></h2>
      <p id="email-offer-description">Enter your email to unlock the menu and get <strong>10% off your first order.</strong></p>
      <form action="/api/demo-offer" method="post" onSubmit={submit}><input type="hidden" name="returnTo" value={returnTo}/><label htmlFor="pow-welcome-email">Email address</label><input ref={input} id="pow-welcome-email" type="email" required autoComplete="email" maxLength={254} pattern="[^\s@]+@[^\s@]+\.[^\s@]+" placeholder="you@example.com" onInput={() => setError("")} aria-describedby="email-offer-demo email-offer-error" aria-invalid={error ? true : undefined}/><button className="email-offer-submit" type="submit">Unlock the menu & save 10% <span aria-hidden="true">→</span></button><p id="email-offer-error" role="alert" className="email-offer-error">{error}</p></form>
      <p className="email-offer-terms">Applied automatically in your cart. Includes bundles. Merchandise only; shipping and fees are separate.</p>
      <p className="email-offer-demo" id="email-offer-demo"><b>Prototype signup.</b> Use a sample email. No signup email is sent, and your email is not stored or submitted. Access and offer use are remembered only in this browser.</p>
      <a className="email-offer-help" href="/support">Need help? Contact POW! ↗</a><noscript><p>You can unlock the menu with this form. Interactive shopping features require JavaScript.</p></noscript>
    </div>
  </dialog>;
}

export default function EmailOfferProvider({ children, initialStatus = "locked" }: { children: React.ReactNode; initialStatus?: OfferStatus }) {
  const pathname = usePathname() || "/";
  const status = useSyncExternalStore(subscribe, snapshot, () => initialStatus);
  useEffect(() => {
    // Mirror existing access into any newly available persistence mechanism.
    if (status !== "locked") {
      try { browserStorage.setItem(FIRST_ORDER_OFFER_KEY, status); } catch { /* Existing readable state remains usable. */ }
    }
  }, [status]);
  const gated = isShoppingRoute(pathname) && status === "locked";
  const content = useRef<HTMLDivElement>(null);
  const notify = () => window.dispatchEvent(new Event(OFFER_EVENT));
  const unlock = (email: string) => {
    claimFirstOrderOffer(browserStorage, email);
    notify();
    // Focus the page after React has removed the modal and inert state.
    requestAnimationFrame(() => content.current?.focus({ preventScroll: true }));
  };
  const consume = () => { redeemFirstOrderOffer(browserStorage); notify(); };

  return <OfferContext.Provider value={{ status, gated, consume }}><div ref={content} tabIndex={-1} inert={gated} className="email-gated-content">{children}</div>{gated && <EmailOfferDialog onUnlock={unlock} returnTo={pathname}/>}</OfferContext.Provider>;
}

export function FirstOrderOfferLine({ discount }: { discount: number }) {
  const { status } = useEmailOffer();
  if (status === "used") return <p className="first-order-used">Your first-order offer was used on this browser.</p>;
  if (status !== "available") return null;
  return <div className="first-order-discount"><span>First order · 10% off<small>Applied to merchandise</small></span><b>−${discount.toFixed(2)}</b></div>;
}
