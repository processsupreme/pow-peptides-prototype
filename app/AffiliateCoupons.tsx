"use client";

import { useState } from "react";
import { COUPON_TIERS, issueCoupon, revokeCoupon, type CouponStatus } from "./affiliate-coupons";
import { updateCouponInventory, useAffiliateCoupons } from "./useAffiliateCoupons";

export default function AffiliateCoupons() {
  const { state, error } = useAffiliateCoupons();
  const [tier, setTier] = useState<number>(10);
  const [filter, setFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [revoking, setRevoking] = useState("");
  const available = state.coupons.filter(coupon => coupon.percent === tier && coupon.status === "available");
  const visible = state.coupons.filter(coupon => filter === "all" || coupon.status === filter);
  const assign = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const next = updateCouponInventory(current => issueCoupon(current, state.profile?.id || "", available[0]?.id || "", email));
      const issued = next.coupons.find(coupon => coupon.id === available[0]?.id)!;
      setNotice(`${issued.percent}% code assigned to ${issued.recipientEmail}. Copy it from the inventory below.`);
      setEmail("");
    } catch (reason) { setNotice(reason instanceof Error ? reason.message : "Could not assign the code. Try again."); }
  };
  const copy = async (code: string) => {
    try { await navigator.clipboard.writeText(code); setNotice("Code copied. Share it only with the assigned customer; no message was sent."); }
    catch { setNotice("Clipboard unavailable. Select and copy the code shown in the inventory."); }
  };
  const revoke = (id: string) => {
    try { updateCouponInventory(current => revokeCoupon(current, state.profile!.id, id)); setRevoking(""); setNotice("Code revoked. It can no longer be used and has not been returned to available inventory."); }
    catch (reason) { setNotice(reason instanceof Error ? reason.message : "Could not revoke the code."); }
  };
  return <section className="affiliate-coupons" aria-labelledby="coupon-inventory-title">
    <header className="coupon-inventory-head"><div><span>YOUR AFFILIATE PROFILE / COUPONS</span><h2 id="coupon-inventory-title">Give a little<br/><em>POW!</em></h2><p>Assign a discount to one customer. Follow every code from your inventory to their checkout.</p></div><div className="coupon-policy-stamp"><b>ONE CUSTOMER.<br/>ONE USE.</b><span>Recipient email required</span></div></header>
    <p className="coupon-demo-note"><b>Local prototype.</b> Use sample @example.com addresses. Codes work only in this browser’s demo. Real sharing protection requires verified accounts and server-side redemption.</p>
    {error ? <p role="alert">{error}</p> : !state.profile ? <div className="coupon-empty"><h3>Your coupon inventory starts at signup.</h3><p>Complete the partner application demo to create your sample profile and receive sample codes at 10%, 15%, 20%, and 25%.</p><a className="button primary" href="/partners#apply">Complete demo signup →</a></div> : <>
      <div className="coupon-profile"><b>{state.profile.name}</b><span>Profile {state.profile.id.slice(0, 8)} · Sample allocation: 2 codes per tier</span></div>
      <div className="coupon-tier-grid">{COUPON_TIERS.map(percent => <button key={percent} type="button" aria-pressed={tier === percent} onClick={() => setTier(percent)}><b>{percent}%</b><span>{state.coupons.filter(coupon => coupon.percent === percent && coupon.status === "available").length} available</span></button>)}</div>
      <form className="coupon-issue-form" onSubmit={assign}><div><h3>Assign a {tier}% code.</h3><p>The recipient is fixed when issued. A forwarded code will fail the demo’s email match.</p></div><label>Customer email<input required type="email" placeholder="researcher@example.com" value={email} onChange={event => setEmail(event.target.value)}/></label><button className="button primary" disabled={!available.length}>{available.length ? "Assign code →" : "No codes left at this tier"}</button></form>
      <p className="coupon-notice" role="status" aria-live="polite">{notice}</p>
      <div className="coupon-list-head"><h3>Code inventory</h3><label>Status<select value={filter} onChange={event => setFilter(event.target.value)}><option value="all">All codes</option>{(["available", "issued", "redeemed", "revoked"] as CouponStatus[]).map(status => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</select></label></div>
      <div className="coupon-inventory-list">{visible.length ? visible.map(coupon => <article key={coupon.id}><div className="coupon-rate">{coupon.percent}%<small>OFF</small></div><div className="coupon-record"><span className={`coupon-status ${coupon.status}`}>{coupon.status}</span>{coupon.status === "available" ? <b>Assign a recipient to reveal this code</b> : <><code>{coupon.code}</code><span>{coupon.recipientEmail}</span></>}{coupon.orderId && <small>Redeemed · {coupon.orderId}</small>}</div><div className="coupon-record-actions">{coupon.status === "issued" && <><button type="button" onClick={() => copy(coupon.code)}>Copy code</button>{revoking === coupon.id ? <><span>Revoke this code?</span><button type="button" onClick={() => revoke(coupon.id)}>Confirm revoke</button><button type="button" onClick={() => setRevoking("")}>Keep code</button></> : <button type="button" onClick={() => setRevoking(coupon.id)}>Revoke</button>}</>}</div></article>) : <p>No codes with this status.</p>}</div>
      <p className="coupon-demo-note">Allotments, replenishment, expiry, and final promotion terms are still POW! decisions. Completing the demo signup again does not refill this inventory.</p><a className="text-link" href="/checkout">Open customer checkout demo →</a>
    </>}
  </section>;
}
