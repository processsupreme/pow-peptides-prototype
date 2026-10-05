"use client";

import { useState } from "react";
import { isDemoEmail, normalizeCoupon, normalizeEmail } from "./affiliate-coupons";

type Props = {
  email: string; verifiedEmail: string; onVerify: (email: string) => void;
  appliedCode: string; percent?: number; error: string;
  onApply: (code: string) => string; onRemove: () => void;
};

export default function CheckoutCoupon({ email, verifiedEmail, onVerify, appliedCode, percent, error, onApply, onRemove }: Props) {
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [verification, setVerification] = useState("");
  const [notice, setNotice] = useState("");
  const verified = !!email && normalizeEmail(email) === verifiedEmail;
  return <section className="checkout-coupon" aria-labelledby="checkout-coupon-title">
    <span>A LITTLE EXTRA POW!</span><h2 id="checkout-coupon-title">Have an affiliate code?</h2>
    <p>One code. One intended customer. Use the email your affiliate assigned it to.</p>
    <div className="coupon-verification">
      <b>{verified ? "Email verified · simulated" : "First, verify your checkout email"}</b>
      <p>Local demo only. Use an @example.com address. No verification email is sent.</p>
      {!verified && <><button type="button" className="sample-details-button" onClick={() => {
        if (!isDemoEmail(email)) { setNotice("Enter a sample @example.com email in Contact first."); return; }
        setSent(true); setNotice("Demo verification ready. Enter 123456 below; no email was sent.");
      }}>{sent ? "Restart test verification" : "Start test email verification"}</button>
      {sent && <div className="coupon-input-row"><label>Demo verification code<input inputMode="numeric" autoComplete="off" value={verification} placeholder="123456" onChange={event => setVerification(event.target.value)}/></label><button type="button" onClick={() => {
        if (verification.trim() !== "123456") { setNotice("Incorrect demo code. Enter 123456 to simulate verification."); return; }
        onVerify(normalizeEmail(email)); setNotice("Email verification simulated. You can now apply your assigned code.");
      }}>Verify demo email</button></div>}</>}
    </div>
    <div className="coupon-input-row"><label>Affiliate discount code<input value={code} autoComplete="off" spellCheck={false} placeholder="POW-…" onChange={event => setCode(event.target.value)}/></label><button type="button" disabled={!verified || !code.trim()} onClick={() => {
      const result = onApply(normalizeCoupon(code)); setNotice(result || "Affiliate code applied to this order.");
    }}>Apply code</button></div>
    {appliedCode && <div className="coupon-applied"><span><b>{percent ? `${percent}% affiliate discount applied` : "Code needs attention"}</b><code>{appliedCode}</code></span><button type="button" onClick={() => { onRemove(); setNotice("Affiliate code removed. It remains available to its assigned customer."); }}>Remove</button></div>}
    <p role="status" aria-live="polite">{error || notice}</p>
    <small>Prototype default: the larger of your first-order offer or affiliate discount applies. Offers do not stack. Payment reports do not use a code; redemption requires a confirmed order.</small>
  </section>;
}
