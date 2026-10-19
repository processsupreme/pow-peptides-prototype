"use client";

import { useEffect, useState } from "react";
import { descendants, estimateShare, initialNetwork, NETWORK_KEY, networkSales, parseNetwork, updateNetwork, type NetworkAction, type NetworkMember, type NetworkState } from "./affiliate-network";

const money = (cents: number) => new Intl.NumberFormat("en-US", {style:"currency", currency:"USD"}).format(cents / 100);

export default function AffiliateNetwork() {
  const [state, setState] = useState(initialNetwork);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState("you");
  const [scope, setScope] = useState("all");
  const [rate, setRate] = useState("");
  const [depth, setDepth] = useState("1");
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    const load = () => {
      try { const raw = localStorage.getItem(NETWORK_KEY); setState(raw ? parseNetwork(raw) : initialNetwork()); setStorageError(""); }
      catch { setStorageError("Saved demo data could not be read. Showing the sample network; reset to recover. Changes may not persist."); }
      setReady(true);
    };
    load();
    const sync = (event: StorageEvent) => { if (event.key === NETWORK_KEY || event.key === null) load(); };
    window.addEventListener("storage", sync); return () => window.removeEventListener("storage", sync);
  }, []);
  const save = (next: NetworkState, message: string) => {
    try { localStorage.setItem(NETWORK_KEY, JSON.stringify(next)); setStorageError(""); }
    catch { setStorageError("Browser storage is unavailable. This change lasts only while this page stays open."); }
    setState(next); setNotice(message);
  };
  const change = (action: NetworkAction, message: string) => {
    try { save(updateNetwork(state, action), message); } catch (error) { setNotice(error instanceof Error ? error.message : "Could not update the sample network."); }
  };
  const member = state.members.find(row => row.id === selected) || state.members[0];
  const team = descendants(state, member.id);
  const sales = networkSales(state, member.id);
  const visibleSales = sales.filter(sale => scope === "all" || (scope === "direct" ? sale.depth === 1 : sale.depth > 1));
  const includedSales = sales.filter(sale => sale.depth <= Number(depth));
  let estimate: number | null = null;
  let rateError = "";
  try { estimateShare(0, "confirmed", rate); if (rate.trim()) estimate = includedSales.reduce((total, sale) => total + (estimateShare(sale.cents, sale.status, rate) || 0), 0); }
  catch (error) { rateError = (error as Error).message; }
  const choose = (id: string) => { setSelected(id); setScope("all"); setNotice(""); };
  const branch = (row: NetworkMember): React.ReactNode => <li key={row.id}><button type="button" aria-pressed={row.id === member.id} onClick={() => choose(row.id)}><span>{row.name}</span><small>{row.id === "you" ? "Root affiliate" : row.status === "invited" ? "Invitation pending · demo" : "Active · demo"}</small></button>{state.members.some(child => child.sponsor === row.id) && <ul>{state.members.filter(child => child.sponsor === row.id).map(branch)}</ul>}</li>;

  return <section className="affiliate-network" aria-label="Affiliate network demo">
    <header className="network-intro"><div><span className="impact-label">Your people. Your visibility.</span><h2>See your network grow.</h2><p>Follow who brought each affiliate in, explore their branch, and see the sales connected to it.</p></div><span className="prototype-label">INTERACTIVE DEMO</span></header>
    <p className="network-disclosure">All members and orders below are fictional. Invitations, sales, and payment changes are simulated in this browser. Commission rates are awaiting POW! approval; no earnings are owed or paid.</p>
    {storageError && <p role="alert" className="network-notice">{storageError}</p>}
    <div className="network-summary"><article><span>Direct recruits</span><strong>{team.filter(row => row.depth === 1).length}</strong><small>Under {member.name}</small></article><article><span>Total downline</span><strong>{team.length}</strong><small>Includes pending invitations</small></article><article><span>Confirmed sample sales</span><strong>{money(sales.filter(row => row.status === "confirmed").reduce((sum, row) => sum + row.cents, 0))}</strong><small>All downline levels · excludes refunds</small></article><article><span>Commission rate</span><strong>Not set</strong><small>Requires POW! approval</small></article></div>
    <div className="network-layout"><article className="panel network-tree"><header><h3>Who brought whom</h3></header><p>Select a member to explore their downline.</p><ul aria-label="Sample affiliate hierarchy">{branch(state.members[0])}</ul></article>
    <article className="panel network-member"><header><h3>{member.name}</h3></header><dl><div><dt>Sponsor</dt><dd>{state.members.find(row => row.id === member.sponsor)?.name || "Top of this sample network"}</dd></div><div><dt>Membership</dt><dd>{member.status === "active" ? "Active · demo" : "Invitation pending · demo"}</dd></div></dl><p>{member.status === "invited" ? "Simulate joining to activate this sample member. No invitation or account is created outside this demo." : member.sponsor === null ? "Invite a sample recruit, then select an active recruit to add a sale. Return here to see it in your downline." : "Try adding a recruit or a sample order. Select this member’s sponsor to see the effect on their downline."}</p><div className="network-actions">{member.status === "invited" ? <button disabled={!ready} onClick={() => change({type:"activate", member:member.id}, "Sample member joined. No real account was created.")}>Simulate joining</button> : <><button disabled={!ready} onClick={() => change({type:"invite", sponsor:member.id}, "Sample invitation added under this sponsor. No message was sent.")}>Simulate inviting a recruit</button>{member.sponsor !== null && <button disabled={!ready} onClick={() => change({type:"sale", member:member.id}, "Added a $200 fictional merchandise sale, awaiting simulated payment confirmation.")}>Add $200 sample sale</button>}</>}</div><p className="network-notice" role="status" aria-live="polite">{notice}</p></article></div>
    <article className="panel network-calculator"><header><h3>Explore a proposed sales share</h3><span>ESTIMATE ONLY</span></header><p>Enter a hypothetical rate to discuss with POW!. This does not set the program rate or create a commission balance.</p><div className="network-calculator-fields"><label>Hypothetical share (%)<input type="number" min="0" max="100" step="0.01" placeholder="Awaiting approval" value={rate} onChange={event => setRate(event.target.value)} aria-invalid={!!rateError} aria-describedby="network-rate-error"/></label><label>Illustrative earning depth<select value={depth} onChange={event => setDepth(event.target.value)}><option value="1">Direct recruits only</option><option value="2">First two levels</option><option value="99">All displayed levels</option></select></label><div><span>Illustrative share</span><strong>{estimate === null ? "Not calculated" : money(estimate)}</strong></div></div><p id="network-rate-error" role={rateError ? "alert" : undefined}>{rateError}</p><small>Based on confirmed sample merchandise amounts after discounts, excluding shipping, fees, tax, pending payments, refunds, and this member’s own sales. This basis and earning depth are examples, not approved rules. Estimates round per order.</small></article>
    <article className="panel"><header><h3>Sales under {member.name}</h3><label>Show sales<select aria-label="Filter downline sales" value={scope} onChange={event => setScope(event.target.value)}><option value="all">All downline</option><option value="direct">Direct recruits</option><option value="deeper">Deeper levels</option></select></label></header><div className="data-table"><table><caption>Fictional order activity · selected member’s own sales excluded</caption><thead><tr><th>Order / affiliate</th><th>Level</th><th>Merchandise</th><th>Payment state</th><th>Illustrative share</th><th>Try the workflow</th></tr></thead><tbody>{visibleSales.map(sale => <tr key={sale.id}><td><b>{sale.id}</b><small>{sale.name}</small></td><td>{sale.depth === 1 ? "Direct" : `Level ${sale.depth}`}</td><td>{money(sale.cents)}</td><td><span className={`status-chip ${sale.status === "confirmed" ? "approved" : sale.status === "refunded" ? "reversed" : "pending"}`}>{sale.status} · demo</span></td><td>{sale.depth > Number(depth) ? "Outside selected depth" : estimate === null ? "Rate not set" : money(estimateShare(sale.cents, sale.status, rate) || 0)}</td><td>{sale.status === "pending" ? <button disabled={!ready} onClick={() => change({type:"confirm", sale:sale.id}, `${sale.id}: payment confirmed in this scenario only.`)}>Simulate confirmation</button> : sale.status === "confirmed" ? <button disabled={!ready} onClick={() => change({type:"refund", sale:sale.id}, `${sale.id}: sample refund removed this sale from the estimate.`)}>Simulate refund</button> : "Excluded from estimate"}</td></tr>)}</tbody></table>{!visibleSales.length && <p className="network-empty">No sample sales in this view. Select an active recruit, add a sample sale, then return to their sponsor.</p>}</div></article>
    <details className="panel network-decisions"><summary>What POW! still needs to decide</summary><ul><li>Commission percentage and whether it changes by level.</li><li>How many downline levels earn a share, and whether direct sales earn separately.</li><li>Eligible products, discounts, renewals, and the sales amount used for calculations.</li><li>Attribution ownership, sponsor changes, cancellations, and refund rules.</li><li>Approval period, payout schedule, minimum payout, and staff access.</li></ul><p>Production needs authenticated partner accounts, approved membership, server-side attribution, and an auditable commission ledger linked to verified orders. This scenario does not change checkout, coupon discounts, or the staff order queue.</p></details>
    <button className="network-reset" disabled={!ready} onClick={() => {save(initialNetwork(), "Sample network reset. Only this network scenario was reset."); setSelected("you"); setScope("all"); setRate(""); setDepth("1");}}>Reset network demo</button>
  </section>;
}
