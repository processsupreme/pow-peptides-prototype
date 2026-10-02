"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { claimFirstOrderOffer, FIRST_ORDER_OFFER_KEY, isShoppingRoute, readOfferStatus, redeemFirstOrderOffer, type OfferStatus } from "./first-order-offer";

const OFFER_EVENT = "pow-offer-change";
const OfferContext = createContext({ status: "locked" as OfferStatus, gated: false, consume: () => {} });

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => { if (!event.key || event.key === FIRST_ORDER_OFFER_KEY) callback(); };
  window.addEventListener("storage", onStorage);
  window.addEventListener(OFFER_EVENT, callback);
  return () => { window.removeEventListener("storage", onStorage); window.removeEventListener(OFFER_EVENT, callback); };
}
function snapshot(): OfferStatus { try { return readOfferStatus(localStorage); } catch { return "locked"; } }
function serverSnapshot(): OfferStatus { return "locked"; }

export function useEmailOffer() { return useContext(OfferContext); }

function EmailOfferDialog({ onUnlock }: { onUnlock: (email: string) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const element = dialog.current;
    // The server renders an open gate; upgrade it to the native modal top layer.
    element?.close();
    element?.showModal();
    input.current?.focus({ preventScroll: true });
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { element?.close(); document.body.style.overflow = previous; };
  }, []);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    try { onUnlock(email.trim()); }
    catch { setError("We couldn’t save your demo access. Allow browser storage and try again."); }
  };

  return <dialog open ref={dialog} className="email-offer-dialog" aria-labelledby="email-offer-title" aria-describedby="email-offer-description" onCancel={event => event.preventDefault()}>
    <div className="email-offer-art" aria-hidden="true"><span>YOUR FIRST ORDER</span><div className="email-offer-number">10<span>%</span></div><b>OFF.</b><span className="email-offer-art-footer">A LITTLE WELCOME.<br/>A WHOLE LOT OF POW!</span></div>
    <div className="email-offer-copy"><Image src="/brand-assets/svg/pow-logo-primary.svg" alt="POW! Peptides" width={230} height={110} unoptimized className="email-offer-logo"/>
      <span className="email-offer-eyebrow">YOUR INVITATION TO THE LINEUP</span>
      <h2 id="email-offer-title">First order.<br/><em>Extra POW!</em></h2>
      <p id="email-offer-description">Enter your email to unlock the menu and get <strong>10% off your first order.</strong></p>
      <form onSubmit={submit}><label htmlFor="pow-welcome-email">Email address</label><input ref={input} id="pow-welcome-email" name="email" type="email" required autoComplete="email" maxLength={254} pattern="[^\s@]+@[^\s@]+\.[^\s@]+" placeholder="you@example.com" value={email} onChange={event => { setEmail(event.target.value); setError(""); }} aria-describedby="email-offer-demo email-offer-error" aria-invalid={error ? true : undefined}/><button className="email-offer-submit" type="submit">Unlock the menu & save 10% <span aria-hidden="true">→</span></button><p id="email-offer-error" role="alert" className="email-offer-error">{error}</p></form>
      <p className="email-offer-terms">Applied automatically in your cart. Includes bundles. Merchandise only; shipping and fees are separate.</p>
      <p className="email-offer-demo" id="email-offer-demo"><b>Prototype signup.</b> Use a sample email. Nothing is sent or subscribed, and your email is not stored. Access and offer use are remembered only in this browser.</p>
      <a className="email-offer-help" href="/support">Need help? Contact POW! ↗</a><noscript><p>Enable JavaScript to unlock this demo menu.</p></noscript>
    </div>
  </dialog>;
}

export default function EmailOfferProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const status = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const gated = isShoppingRoute(pathname) && status === "locked";
  const content = useRef<HTMLDivElement>(null);
  const notify = () => window.dispatchEvent(new Event(OFFER_EVENT));
  const unlock = (email: string) => {
    claimFirstOrderOffer(localStorage, email);
    notify();
    // Focus the page after React has removed the modal and inert state.
    requestAnimationFrame(() => content.current?.focus({ preventScroll: true }));
  };
  const consume = () => { redeemFirstOrderOffer(localStorage); notify(); };

  return <OfferContext.Provider value={{ status, gated, consume }}><div ref={content} tabIndex={-1} inert={gated} className="email-gated-content">{children}</div>{gated && <EmailOfferDialog onUnlock={unlock}/>}</OfferContext.Provider>;
}

export function FirstOrderOfferLine({ discount }: { discount: number }) {
  const { status } = useEmailOffer();
  if (status === "used") return <p className="first-order-used">Your first-order offer was used on this browser.</p>;
  if (status !== "available") return null;
  return <div className="first-order-discount"><span>First order · 10% off<small>Applied to merchandise</small></span><b>−${discount.toFixed(2)}</b></div>;
}
