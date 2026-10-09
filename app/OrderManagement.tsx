"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation preserves the prototype's no-hydration fallback. */

import { useEffect, useState } from "react";
import { advanceOrder, findOrder, orderStages, readOrders, saveOrders, stageLabels, type DemoOrder, type OrderAction } from "./demo-orders";
import { SHIPPING_OPTIONS } from "./demo-checkout-totals";

const money = (value: number) => `$${value.toFixed(2)}`;
const orderLink = (order: DemoOrder) => `/track-order?order=${encodeURIComponent(order.invoice.reference)}`;

export function useOrders() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => {
      try { setOrders(readOrders()); setError(""); }
      catch { setError("Sample orders could not be loaded. Enable browser storage and reload. Existing records have not been replaced."); }
      setReady(true);
    };
    const timer = window.setTimeout(sync, 0);
    window.addEventListener("storage", sync); window.addEventListener("pow-orders-change", sync);
    return () => { window.clearTimeout(timer); window.removeEventListener("storage", sync); window.removeEventListener("pow-orders-change", sync); };
  }, []);
  return { orders, error, ready };
}

export function OrderDemoNotice() {
  return <p className="order-demo-note"><b>Connected order demo.</b> Sample records are shared between these pages in this browser. No real payment, shipment, email, or customer account is created. Use sample data only.</p>;
}

export function CustomerOrders({ compact = false }: { compact?: boolean }) {
  const { orders, error, ready } = useOrders();
  return <section className="order-module" aria-label="Customer order history">
    <div className="order-section-head"><div><span className="impact-label">Your orders</span><h2>{compact ? "Recent orders." : "Every order. One place."}</h2></div><a href="/track-order">Track an order →</a></div>
    <OrderDemoNotice/>{error && <p role="alert">{error}</p>}
    {!ready ? <p>Loading sample orders…</p> : !orders.length ? <p>No sample orders yet. <a href="/shop">Choose a product</a> and review a sample invoice at checkout.</p> :
      <div className="order-list">{(compact ? orders.slice(0, 3) : orders).map(order => <a className="order-row" href={orderLink(order)} key={order.invoice.reference}>
        <div><b>{order.invoice.reference}</b><small>{order.invoice.lines.map(line => `${line.qty} × ${line.name}`).join(" · ")}</small></div>
        <span className="order-status">{order.held ? "Needs attention" : stageLabels[order.stage]}</span><strong>{money(order.invoice.total)}</strong><span>View order →</span>
      </a>)}</div>}
    <p className="order-help">Delivered orders stay here. <a href="/ops">Open the staff demo</a> to walk through payment verification and USPS fulfillment.</p>
  </section>;
}

function OrderDetails({ order }: { order: DemoOrder }) {
  const invoice = order.invoice;
  return <article className="order-detail">
    <header><span className="impact-label">{order.held ? "Needs attention" : stageLabels[order.stage]}</span><h2>Your order.</h2><p className="order-reference">{invoice.reference}</p></header>
    {order.held && <p role="status" className="order-hold">POW! is reviewing this sample order before it moves forward. Contact support for help.</p>}
    <div className="order-facts"><div><span>Payment</span><b>{orderStages.indexOf(order.stage) >= 2 ? "Confirmed · simulation" : order.stage === "payment_reported" ? "Reported · awaiting review" : "Awaiting payment"}</b></div><div><span>Shipping selected</span><b>{SHIPPING_OPTIONS[invoice.shippingMethod].label}</b></div><div><span>Sample total</span><b>{money(invoice.total)}</b></div></div>
    <ol className="order-timeline">{order.events.map((event, index) => <li key={index}><span aria-hidden="true">✓</span><div><b>{stageLabels[event.stage]}</b><small>{new Date(event.at).toLocaleString("en-US")} · simulated event</small></div></li>)}</ol>
    <div className="order-shipment"><h3>USPS shipment</h3>{order.tracking ? <><p><b>{order.tracking}</b></p><p>Sample tracking reference. No USPS lookup or scan has occurred.</p></> : <p>Your tracking reference will appear after the label step.</p>}<p>Delivery estimate: not available in this demo.</p><a href="https://tools.usps.com/go/TrackAction" target="_blank" rel="noreferrer">Open USPS tracking for a real package ↗</a></div>
    <h3>Order items</h3><ul className="order-items">{invoice.lines.map((line, index) => <li key={index}><span><b>{line.qty} × {line.name}</b><small>{line.strength}</small></span><b>{money(line.qty * line.unitPrice)}</b></li>)}</ul>
    <dl className="order-totals"><div><dt>Merchandise</dt><dd>{money(invoice.merchandise)}</dd></div><div><dt>Discount</dt><dd>−{money(invoice.discount)}</dd></div><div><dt>Tariff fee · demo</dt><dd>{money(invoice.tariff)}</dd></div><div><dt>Shipping</dt><dd>{invoice.shipping ? money(invoice.shipping) : "FREE"}</dd></div><div><dt>Total · tax not calculated</dt><dd>{money(invoice.total)}</dd></div></dl>
    <nav className="order-links" aria-label="Order help"><a href="/account/orders">All my orders →</a><a href="/support">Contact POW! →</a></nav>
  </article>;
}

export function OrderTracking() {
  const { orders, error, ready } = useOrders();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const reference = new URLSearchParams(window.location.search).get("order");
      if (reference) { setQuery(reference); setSubmitted(reference); }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const found = submitted ? findOrder(orders, submitted) : undefined;
  return <div className="order-tracking-page"><section className="tracking-hero"><span className="impact-label">Customer order tracking</span><h1>Track the<br/><em>whole journey.</em></h1><p>From payment review to delivery. Follow your order in one place.</p>
    <form onSubmit={event => { event.preventDefault(); setSubmitted(query.trim()); }}><input required aria-label="Order number" placeholder="Order reference" value={query} onChange={event => setQuery(event.target.value)}/><button>Track order</button></form>
    <button className="order-sample-button" onClick={() => { setQuery("POW-DEMO-1001"); setSubmitted("POW-DEMO-1001"); }}>Try sample order POW-DEMO-1001 →</button></section>
    <div className="order-tracking-body"><OrderDemoNotice/>{error && <p role="alert">{error}</p>}{!ready ? <p>Loading sample orders…</p> : found ? <OrderDetails order={found}/> : <div className="order-empty" role="status"><h2>{submitted ? "Order not found here." : "Your order, at a glance."}</h2><p>{submitted ? "Check the reference or try the sample order. Demo orders are available only in the browser where they were created." : "Enter the reference from your sample invoice, or choose the sample order above."}</p><a href="/account/orders">View order history →</a></div>}</div>
  </div>;
}

const nextSteps: Partial<Record<DemoOrder["stage"], { action: OrderAction; label: string; instruction: string }>> = {
  awaiting_payment: { action: "confirm", label: "Simulate payment verification", instruction: "Match the amount and reference against the actual business payment record before confirming a live order." },
  payment_reported: { action: "confirm", label: "Simulate payment verification", instruction: "The customer reported a payment. Check the business payment record; this report is not proof of receipt." },
  payment_confirmed: { action: "pack", label: "Mark sample order packed", instruction: "Check the items and quantities. Follow approved packaging instructions and resolve address or stock issues before continuing." },
  packed: { action: "label", label: "Save sample USPS reference", instruction: "For a live order, buy the label through your existing USPS process and attach its tracking number. This demo accepts sample references only." },
  label_created: { action: "transit", label: "Simulate USPS acceptance", instruction: "A label does not mean USPS has the parcel. The next step demonstrates a carrier acceptance event." },
  in_transit: { action: "deliver", label: "Simulate delivery event", instruction: "The next step demonstrates a delivery scan. Completed orders remain in customer history." },
};

function StaffOrder({ order, onAction }: { order: DemoOrder; onAction: (action: OrderAction, tracking?: string) => boolean }) {
  const [confirmed, setConfirmed] = useState(false);
  const [tracking, setTracking] = useState("USPS-DEMO-1001");
  const [preview, setPreview] = useState(false);
  const step = nextSteps[order.stage];
  const verifying = step?.action === "confirm";
  return <div><OrderDetails order={order}/><section className="order-staff-actions"><span className="impact-label">Staff · next step</span><h2>{order.held ? "Resolve the hold." : step ? step.label : "Order complete."}</h2>
    <p>{order.held ? "Review the payment, address, or packing problem before releasing the order." : step?.instruction || "The delivered sample remains available to the customer and staff."}</p>
    {!order.held && step && <>
      {verifying && <label className="order-check"><input type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)}/> I understand this simulates checking received payment; no funds were verified.</label>}
      {step.action === "label" && <label className="order-input">Sample tracking reference<input value={tracking} onChange={event => setTracking(event.target.value.toUpperCase())}/></label>}
      <button className="button primary" disabled={verifying && !confirmed} onClick={() => { if (onAction(step.action, tracking)) setConfirmed(false); }}>{step.label}</button>
    </>}
    {order.stage !== "delivered" && <button className="button ghost" onClick={() => onAction(order.held ? "resume" : "hold")}>{order.held ? "Release sample hold" : "Put sample order on hold"}</button>}
    <button className="order-preview-toggle" onClick={() => setPreview(!preview)} aria-expanded={preview}>Preview customer email</button>
    {preview && <div className="order-email-preview"><b>Email preview · not sent</b><p>Subject: Your POW! order — {order.held ? "needs attention" : stageLabels[order.stage]}</p><p>Your order status is {order.held ? "under review" : stageLabels[order.stage].toLowerCase()}. View your items and latest updates using the link below.</p><a href={orderLink(order)}>View sample order →</a><small>Demo link works only in this browser. Secure customer links and email delivery will be connected for launch.</small></div>}
  </section></div>;
}

export function StaffOrders() {
  const { orders, error, ready } = useOrders();
  const [selected, setSelected] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const order = orders.find(value => value.invoice.reference === selected);
  const shown = orders.filter(value => (filter === "all" || (filter === "held" ? value.held : value.stage === filter)) && `${value.invoice.reference} ${value.invoice.lines.map(line => line.name).join(" ")}`.toLowerCase().includes(search.toLowerCase()));
  const change = (action: OrderAction, tracking?: string) => {
    if (!order) return false;
    try {
      const latest = readOrders();
      const current = latest.find(value => value.invoice.reference === order.invoice.reference);
      if (!current || current.stage !== order.stage || current.held !== order.held) throw new Error("This order changed in another tab. Review its current status and try again.");
      const updated = advanceOrder(current, action, new Date().toISOString(), tracking);
      saveOrders(latest.map(value => value.invoice.reference === current.invoice.reference ? updated : value));
      setNotice("Sample order updated. Customer history and tracking now show the same record. No email was sent."); return true;
    } catch (error) { setNotice(error instanceof Error ? error.message : "The sample update could not be saved."); return false; }
  };
  return <section className="order-module"><div className="order-section-head"><div><span className="impact-label">Payment → packing → USPS</span><h2>Run the order queue.</h2></div><a href="/account/orders">Customer view →</a></div><OrderDemoNotice/>
    <details className="order-runbook"><summary>How the team runs orders</summary><ol><li>Review the order and check the business payment record.</li><li>Confirm payment, then pick and pack the items.</li><li>Buy the USPS label using the existing shipping process.</li><li>Attach tracking; wait for carrier acceptance before calling it in transit.</li><li>Monitor delivery and keep completed orders in history.</li></ol><p>Use a hold for problems. All controls here simulate staff work; this is not a secured admin system.</p></details>
    <div className="order-queue-counts"><span><b>{orders.filter(value => orderStages.indexOf(value.stage) < 2).length}</b> Payment queue</span><span><b>{orders.filter(value => ["payment_confirmed", "packed", "label_created"].includes(value.stage)).length}</b> Fulfillment</span><span><b>{orders.filter(value => value.held).length}</b> Needs attention</span><span><b>{orders.filter(value => value.stage === "delivered").length}</b> Delivered</span></div>
    <div className="order-filters"><label>Find order<input type="search" placeholder="Reference or product" value={search} onChange={event => setSearch(event.target.value)}/></label><label>Status<select value={filter} onChange={event => setFilter(event.target.value)}><option value="all">All orders</option><option value="held">Needs attention</option>{orderStages.map(stage => <option value={stage} key={stage}>{stageLabels[stage]}</option>)}</select></label></div>
    {error && <p role="alert">{error}</p>}<p className="order-notice" role="status">{notice}</p>
    <div className="order-workspace"><div className="order-queue" aria-label="Order queue">{!ready ? <p>Loading sample orders…</p> : shown.length ? shown.map(value => <button className={selected === value.invoice.reference ? "selected" : ""} key={value.invoice.reference} onClick={() => { setSelected(value.invoice.reference); setNotice(""); }}><b>{value.invoice.reference}</b><small>{value.invoice.lines.map(line => `${line.qty} × ${line.name}`).join(" · ")}</small><span>{value.held ? "Needs attention" : stageLabels[value.stage]}</span><strong>{money(value.invoice.total)}</strong></button>) : <p>No orders match this filter.</p>}</div>
    {order ? <StaffOrder key={order.invoice.reference} order={order} onAction={change}/> : <div className="order-empty"><h3>Choose an order.</h3><p>Select a sample from the queue, or create one by reviewing an invoice at checkout. Every page uses the same sample record.</p><a href="/checkout">Go to checkout →</a></div>}</div>
  </section>;
}
