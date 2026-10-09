import { currentProductName } from "./product-names.ts";
import { demoCheckoutTotals, SHIPPING_OPTIONS, type ShippingMethod } from "./demo-checkout-totals.ts";

// Manual-payment journey specification. No payment or order is sent from this module.
export const POW_PAYMENT_PHONE = "6194393459";
export const POW_PAYMENT_PHONE_DISPLAY = "(619) 439-3459";
export const INVOICE_STORAGE_KEY = "pow_demo_manual_invoice_v1";
export type PaymentMethod = "venmo" | "zelle";
export type InvoiceLine = { name: string; strength: string; qty: number; unitPrice: number };
export type ManualInvoice = {
  version: 2;
  reference: string;
  createdAt: string;
  method: PaymentMethod;
  shippingMethod: ShippingMethod;
  status: "awaiting_payment" | "payment_reported";
  lines: InvoiceLine[];
  discountPercent: number;
  discountLabel: string;
  merchandise: number;
  discount: number;
  tariff: number;
  shipping: number;
  total: number;
};

function calculate(lines: InvoiceLine[], percent: number, shippingMethod: ShippingMethod) {
  const cents = lines.reduce((sum, line) => sum + Math.round(line.unitPrice * 100) * line.qty, 0);
  return { merchandise: cents / 100, ...demoCheckoutTotals(cents / 100, false, percent, shippingMethod) };
}

export function createManualInvoice(input: {
  lines: InvoiceLine[]; method: PaymentMethod; shippingMethod: ShippingMethod; discountPercent: number; discountLabel: string;
}, uniqueId: string, now: string): ManualInvoice {
  if (!/^(?:[a-f\d]{32}|[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12})$/i.test(uniqueId) || !Number.isFinite(Date.parse(now))) throw new Error("Could not create an invoice reference. Please try again.");
  if (!input.lines.length || input.lines.length > 200 || input.lines.some(line =>
    typeof line.name !== "string" || !line.name || line.name.length > 300 || typeof line.strength !== "string" || line.strength.length > 3000 ||
    !Number.isInteger(line.qty) || line.qty < 1 || line.qty > 10000 || !Number.isFinite(line.unitPrice) || line.unitPrice <= 0 || line.unitPrice > 100000
  )) throw new Error("Your cart contains an invalid item. Return to the cart and review it.");
  if (![0, 10, 15, 20, 25].includes(input.discountPercent) || !["venmo", "zelle"].includes(input.method)) throw new Error("Review your discount and payment method.");
  if (!["priority", "overnight"].includes(input.shippingMethod)) throw new Error("Choose a shipping method.");
  // Only explicit, non-personal fields enter browser storage. Never serialize the checkout form.
  const lines = input.lines.map(({ name, strength, qty, unitPrice }) => ({ name: currentProductName(name), strength: currentProductName(strength), qty, unitPrice }));
  return {
    version: 2, reference: `POW-DEMO-${uniqueId.replaceAll("-", "").toUpperCase()}`,
    createdAt: new Date(now).toISOString(), method: input.method, shippingMethod: input.shippingMethod, status: "awaiting_payment", lines,
    discountPercent: input.discountPercent, discountLabel: input.discountLabel,
    ...calculate(lines, input.discountPercent, input.shippingMethod),
  };
}

export function reportManualPayment(invoice: ManualInvoice): ManualInvoice {
  // Customer reporting is never payment verification. This deliberately has no "paid" transition.
  return { ...invoice, status: "payment_reported" };
}

export function parseManualInvoice(raw: string | null): ManualInvoice | null {
  if (!raw) return null;
  try {
    const saved = JSON.parse(raw);
    if (saved.version !== 2 || !/^POW-DEMO-[A-F\d]{32}$/.test(saved.reference) || !["awaiting_payment", "payment_reported"].includes(saved.status) || typeof saved.discountLabel !== "string" || saved.discountLabel.length > 100) return null;
    const checked = createManualInvoice(saved, saved.reference.slice(9), saved.createdAt);
    for (const key of ["merchandise", "discount", "tariff", "shipping", "total"] as const) if (saved[key] !== checked[key]) return null;
    return { ...checked, status: saved.status };
  } catch { return null; }
}

export function invoiceText(invoice: ManualInvoice, paymentConfirmed = false): string {
  return [
    "POW! PEPTIDES — SAMPLE INVOICE — DO NOT PAY",
    `Reference: ${invoice.reference}`, `Created: ${invoice.createdAt}`, `Method: ${invoice.method === "venmo" ? "Venmo" : "Zelle"}`,
    `Status: ${paymentConfirmed ? "Payment confirmed by staff (simulation); no real funds verified" : invoice.status === "payment_reported" ? "Payment reported (simulation); awaiting POW verification" : "Awaiting payment (simulation)"}`,
    "", ...invoice.lines.map(line => `${line.qty} × ${line.name} · ${line.strength} · $${line.unitPrice.toFixed(2)} each = $${(line.qty * line.unitPrice).toFixed(2)}`),
    "", `Merchandise: $${invoice.merchandise.toFixed(2)}`,
    `${invoice.discountLabel || "Discount"}: -$${invoice.discount.toFixed(2)}`,
    `Tariff fee (5%, demo): $${invoice.tariff.toFixed(2)}`, `${SHIPPING_OPTIONS[invoice.shippingMethod].label}: ${invoice.shipping ? `$${invoice.shipping.toFixed(2)}` : "FREE"}`,
    `Sample total: $${invoice.total.toFixed(2)}`, "Tax is not calculated.",
    "", `POW invoice payment contact: ${POW_PAYMENT_PHONE_DISPLAY}`,
    "This sample has not been sent to POW. No order or payment has been created. Do not send money for this sample invoice.",
  ].join("\n");
}
