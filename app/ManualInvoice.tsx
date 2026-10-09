"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Match the prototype's native navigation fallback. */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { invoiceText, POW_PAYMENT_PHONE, POW_PAYMENT_PHONE_DISPLAY, type ManualInvoice as Invoice } from "./manual-invoice";

import { SHIPPING_OPTIONS } from "./demo-checkout-totals";
import { useOrders } from "./OrderManagement";
import { orderStages } from "./demo-orders";

const money = (amount: number) => `$${amount.toFixed(2)}`;

export default function ManualInvoice({ invoice, onReport, onBack, storageNotice }: {
  invoice: Invoice; onReport: () => void; onBack: () => void; storageNotice: string;
}) {
  const [notice, setNotice] = useState("");
  const [reported, setReported] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  const copy = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); setNotice(`${label} copied.`); }
    catch { setNotice(`Could not copy automatically. Select the ${label.toLowerCase()} shown here and copy it manually.`); }
  };
  const method = invoice.method === "venmo" ? "Venmo" : "Zelle";
  const awaitingReview = invoice.status === "payment_reported";
  const { orders } = useOrders();
  const order = orders.find(value => value.invoice.reference === invoice.reference);
  const confirmed = !!order && orderStages.indexOf(order.stage) >= 2;
  return <section className="manual-invoice-shell">
    <article className="manual-invoice">
      <header className="invoice-brand">
        <Image src="/brand-assets/svg/pow-logo-primary.svg" alt="POW! Peptides" width={240} height={100} unoptimized/>
        <span>SAMPLE INVOICE<br/>DO NOT PAY</span>
      </header>
      <div className="invoice-intro">
        <span className="impact-label">{confirmed ? "Payment confirmed · simulation" : awaitingReview ? "Awaiting POW! verification · demo" : "Awaiting payment · demo"}</span>
        <h1 ref={heading} tabIndex={-1}>{confirmed ? <>Payment confirmed.<br/><em>Follow your order.</em></> : awaitingReview ? <>Payment reported.<br/><em>Review comes next.</em></> : <>Your lineup.<br/><em>One invoice.</em></>}</h1>
        <p>{confirmed ? "The staff demo confirmed this sample payment. Follow fulfillment using the order link below. No real funds were received or verified." : awaitingReview ? "Your sample payment report is saved in this tab. POW! has not been notified, and no payment has been verified." : "Review the items and the payment steps below. This sample has not been sent to POW! and is not a request for payment."}</p>
      </div>
      <dl className="invoice-meta"><div><dt>Invoice reference / payment memo</dt><dd>{invoice.reference}</dd></div><div><dt>Created</dt><dd>{new Date(invoice.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</dd></div><div><dt>Payment method</dt><dd>{method}</dd></div></dl>
      <div className="invoice-line-items"><table><caption>Your itemized invoice</caption><thead><tr><th scope="col">Item / strength</th><th scope="col">Qty</th><th scope="col">Each</th><th scope="col">Total</th></tr></thead><tbody>{invoice.lines.map((line, index) => <tr key={index}><th scope="row">{line.name}<small>{line.strength}</small></th><td>{line.qty}</td><td>{money(line.unitPrice)}</td><td>{money(line.qty * line.unitPrice)}</td></tr>)}</tbody></table></div>
      <dl className="invoice-totals"><div><dt>Merchandise</dt><dd>{money(invoice.merchandise)}</dd></div>{invoice.discount > 0 && <div><dt>{invoice.discountLabel}</dt><dd>−{money(invoice.discount)}</dd></div>}<div><dt>Tariff fee · 5% (demo)</dt><dd>{money(invoice.tariff)}</dd></div><div><dt>{SHIPPING_OPTIONS[invoice.shippingMethod].label}</dt><dd>{invoice.shipping ? money(invoice.shipping) : "FREE"}</dd></div><div className="invoice-total"><dt>Sample total</dt><dd>{money(invoice.total)}</dd></div></dl>
      <p className="invoice-footnote">Tax is not calculated. Free priority shipping on $800+ orders; overnight is $70, free on $1,300+ orders. Thresholds use merchandise before discounts. Fulfillment remains simulated. No stock is reserved, no recurring charge is authorized, and no delivery date is promised.</p>
      <div className="invoice-tools"><a href={`/track-order?order=${encodeURIComponent(invoice.reference)}`}>Track this sample order</a><a href="/account/orders">My orders</a><button type="button" onClick={() => window.print()}>Print / save as PDF</button><button type="button" onClick={() => copy(invoiceText(invoice, confirmed), "Sample invoice")}>Copy sample invoice</button><button type="button" onClick={onBack}>Back to checkout</button></div>
    </article>
    <aside className="manual-payment-panel" aria-label={`${method} payment instructions`}>
      <span className="impact-label">{method} / manual payment</span>
      <h2>{confirmed ? "Payment confirmed." : awaitingReview ? "Pending review." : "Keep it simple."}</h2>
      <p className="invoice-demo-warning"><strong>Preview only — do not send money.</strong> Live orders and payment verification are not connected.</p>
      <div className="payment-copy-row"><span>Payment contact from POW! invoice</span><strong>{POW_PAYMENT_PHONE_DISPLAY}</strong><button type="button" onClick={() => copy(POW_PAYMENT_PHONE, "Payment number")}>Copy number</button></div>
      <div className="payment-copy-row"><span>Sample amount</span><strong>{money(invoice.total)}</strong><button type="button" onClick={() => copy(invoice.total.toFixed(2), "Sample amount")}>Copy amount</button></div>
      <div className="payment-copy-row"><span>Invoice reference for payment memo</span><strong className="invoice-reference">{invoice.reference}</strong><button type="button" onClick={() => copy(invoice.reference, "Invoice reference")}>Copy reference</button></div>
      {invoice.method === "zelle" ? <ol className="manual-payment-steps"><li>For a confirmed live invoice, open Zelle in your bank&apos;s app.</li><li>Add POW! using the enrolled payment number. Confirm the recipient name with POW! before sending.</li><li>Enter the invoice amount and include the invoice reference in the memo if your bank offers one.</li><li>POW! matches the received payment to your invoice before confirming the order.</li></ol> : <ol className="manual-payment-steps"><li>For a confirmed live invoice, open POW!&apos;s verified Venmo business profile.</li><li>Confirm the recipient, enter the invoice amount, and put the invoice reference in the payment note.</li><li>POW! matches the received payment to your invoice before confirming the order.</li></ol>}
      {invoice.method === "venmo" && <p className="payment-recipient-note">POW!&apos;s Venmo business profile link is still needed. Venmo business profiles cannot be found by phone number; this preview does not open a payment recipient.</p>}
      {invoice.method === "zelle" && <p className="payment-recipient-note">The enrolled recipient name still needs confirmation. No bank or Zelle payment is opened by this page.</p>}
      {confirmed ? <p className="invoice-awaiting" role="status">Sample payment confirmed by staff.<br/><small>This is a simulation. No real payment has been verified.</small></p> : !awaitingReview ? <div className="invoice-report"><label><input type="checkbox" checked={reported} onChange={event => setReported(event.target.checked)}/><span>Simulate that I sent the payment. This does not confirm receipt.</span></label><button className="manual-primary" type="button" disabled={!reported} onClick={onReport}>Preview “I sent payment” →</button></div> : <p className="invoice-awaiting" role="status">Payment reported · unverified<br/><small>Only POW! checking the received payment can confirm a live order. Your cart and discounts are unchanged.</small></p>}
      <p className="invoice-storage-note">The sample invoice stays in this tab; its item and status record also appears in the order dashboard in this browser. Contact and shipping details are not saved or sent. To change an invoice, return to checkout and generate a new sample.</p>
      {storageNotice && <p role="alert">{storageNotice}</p>}
      <p className="invoice-copy-status" role="status" aria-live="polite">{notice}</p>
    </aside>
  </section>;
}
