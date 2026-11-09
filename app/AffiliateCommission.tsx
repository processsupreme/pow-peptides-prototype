"use client";
import {useState} from "react";
import {AFFILIATE_TIERS, remainingCommissionRate} from "./affiliate-commission";
import {COUPON_TIERS} from "./affiliate-coupons";

export default function AffiliateCommission({discount,onDiscount}:{discount:number;onDiscount:(percent:number)=>void}) {
  const [selected,setSelected] = useState(1);
  const tier = AFFILIATE_TIERS.find(row => row.id === selected)!;
  const remaining = remainingCommissionRate(selected,discount);
  return <section className="coupon-commission panel" aria-labelledby="coupon-commission-title">
    <header><h3 id="coupon-commission-title">Your discount comes out of your commission.</h3></header>
    <p>Customer discounts subtract percentage points from the affiliate’s tier rate. At Tier 1, a 10% customer discount changes your commission from 30% to 20%.</p>
    <div className="coupon-commission-controls"><label>Preview affiliate tier<select value={selected} onChange={event=>setSelected(Number(event.target.value))}>{AFFILIATE_TIERS.map(row=><option key={row.id} value={row.id}>Tier {row.id} · {row.percent}%</option>)}</select></label><label>Customer discount<select value={discount} onChange={event=>onDiscount(Number(event.target.value))}>{COUPON_TIERS.map(percent=><option key={percent} value={percent}>{percent}%</option>)}</select></label></div>
    <p className="coupon-commission-equation" role="status">{tier.percent}% − {discount} percentage points = <strong>{remaining >= 0 ? `${remaining}% commission rate` : "policy decision needed"}</strong></p>
    {remaining < 0 && <p>This discount exceeds the selected tier’s commission. Mike needs to confirm whether it is allowed and how the difference is handled. No negative payout is calculated.</p>}
    <div className="data-table"><table><caption>Affiliate commission tiers · customer coupon rates are separate</caption><thead><tr><th>Affiliate tier</th><th>Base commission</th><th>With {discount}% customer discount</th><th>Qualification</th></tr></thead><tbody>{AFFILIATE_TIERS.map(row=>{const rate=remainingCommissionRate(row.id,discount);return <tr key={row.id}><th scope="row">Tier {row.id}</th><td>{row.percent}%</td><td>{rate >= 0 ? `${rate}%` : "Needs policy decision"}</td><td>Mike to set thresholds</td></tr>})}</tbody></table></div>
    <p className="coupon-demo-note">Tier selection is a preview, not an account assignment. Dollar commissions await confirmation of the calculation base. No earnings or payouts are recorded. These direct-sale tier rates do not set downline commission rates.</p>
  </section>;
}
