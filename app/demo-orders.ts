import { createManualInvoice, parseManualInvoice, type ManualInvoice } from "./manual-invoice.ts";

export const ORDER_STORAGE_KEY = "pow_demo_orders_v1";
export const orderStages = ["awaiting_payment", "payment_reported", "payment_confirmed", "packed", "label_created", "in_transit", "delivered"] as const;
export type OrderStage = typeof orderStages[number];
export const stageLabels: Record<OrderStage, string> = {
  awaiting_payment: "Awaiting payment", payment_reported: "Payment review", payment_confirmed: "Preparing order",
  packed: "Packed", label_created: "Label created · USPS awaiting item", in_transit: "In transit", delivered: "Delivered",
};
export type OrderEvent = { stage: OrderStage; at: string };
export type DemoOrder = { invoice: ManualInvoice; stage: OrderStage; tracking: string; held: boolean; events: OrderEvent[] };
export type OrderAction = "report" | "confirm" | "pack" | "label" | "transit" | "deliver" | "hold" | "resume";

export function orderFromInvoice(invoice: ManualInvoice): DemoOrder {
  const checked = parseManualInvoice(JSON.stringify(invoice));
  if (!checked) throw new Error("The sample invoice could not be read.");
  return { invoice: checked, stage: checked.status, tracking: "", held: false, events: [{ stage: checked.status, at: checked.createdAt }] };
}

export function advanceOrder(order: DemoOrder, action: OrderAction, at: string, tracking = ""): DemoOrder {
  if (!Number.isFinite(Date.parse(at))) throw new Error("A valid event date is required.");
  if (action === "hold" || action === "resume") {
    if (order.stage === "delivered") throw new Error("Delivered orders stay in order history.");
    return { ...order, held: action === "hold" };
  }
  if (order.held) throw new Error("Resolve the order hold before continuing.");
  const transitions: Record<string, OrderStage> = {
    "awaiting_payment:report": "payment_reported", "awaiting_payment:confirm": "payment_confirmed",
    "payment_reported:confirm": "payment_confirmed", "payment_confirmed:pack": "packed",
    "packed:label": "label_created", "label_created:transit": "in_transit", "in_transit:deliver": "delivered",
  };
  const stage = transitions[`${order.stage}:${action}`];
  if (!stage) throw new Error("Complete the previous order step first.");
  // Synthetic tokens only: never send a made-up tracking number to a carrier.
  if (action === "label" && !/^USPS-DEMO-[A-Z0-9-]{4,40}$/.test(tracking)) throw new Error("Use a sample tracking reference beginning USPS-DEMO- (for example USPS-DEMO-1001).");
  return { ...order, stage, invoice: action === "report" ? { ...order.invoice, status: "payment_reported" } : order.invoice,
    tracking: action === "label" ? tracking : order.tracking, events: [...order.events, { stage, at: new Date(at).toISOString() }] };
}

export function upsertInvoice(orders: DemoOrder[], invoice: ManualInvoice): DemoOrder[] {
  const incoming = orderFromInvoice(invoice);
  const found = orders.find(order => order.invoice.reference === invoice.reference);
  if (!found) return [incoming, ...orders];
  // Reopening/reporting an old invoice must not reset staff fulfillment progress.
  if (found.stage !== "awaiting_payment" || invoice.status !== "payment_reported") return orders;
  return orders.map(order => order === found ? { ...order, stage: "payment_reported", invoice: incoming.invoice,
    events: [...order.events, { stage: "payment_reported", at: new Date().toISOString() }] } : order);
}

export function sampleOrders(): DemoOrder[] {
  const invoice = createManualInvoice({ lines: [{ name: "Superman", strength: "10 mg", qty: 1, unitPrice: 80 }],
    method: "zelle", shippingMethod: "priority", discountPercent: 0, discountLabel: "Discount" },
  "00000000-0000-0000-0000-000000001001", "2026-10-09T09:00:00.000Z");
  return [orderFromInvoice(invoice)];
}

export function findOrder(orders: DemoOrder[], query: string) {
  const normalized = query.trim().toUpperCase();
  const reference = normalized === "POW-DEMO-1001" ? sampleOrders()[0].invoice.reference : normalized;
  return orders.find(order => order.invoice.reference === reference);
}

export function parseOrders(raw: string | null): DemoOrder[] {
  if (raw === null) return sampleOrders();
  const saved = JSON.parse(raw);
  if (saved.version !== 1 || !Array.isArray(saved.orders) || saved.orders.length > 200) throw new Error("Sample order storage is unreadable.");
  const seen = new Set<string>();
  return saved.orders.map((value: DemoOrder) => {
    const invoice = parseManualInvoice(JSON.stringify(value.invoice));
    if (!invoice || seen.has(invoice.reference) || !orderStages.includes(value.stage) || typeof value.held !== "boolean" ||
      typeof value.tracking !== "string" || (value.tracking !== "" && !/^USPS-DEMO-[A-Z0-9-]{4,40}$/.test(value.tracking)) ||
      !Array.isArray(value.events) || !value.events.length || value.events.length > 20 ||
      value.events.some(event => !orderStages.includes(event.stage) || !Number.isFinite(Date.parse(event.at))) ||
      value.events.at(-1)?.stage !== value.stage ||
      (orderStages.indexOf(value.stage) >= 4 && !value.tracking)) throw new Error("Sample order storage is unreadable.");
    seen.add(invoice.reference);
    // Explicit projection excludes arbitrary fields and any customer details.
    return { invoice, stage: value.stage, held: value.held, tracking: value.tracking,
      events: value.events.map(({ stage, at }) => ({ stage, at })) };
  });
}

export function readOrders(): DemoOrder[] { return parseOrders(localStorage.getItem(ORDER_STORAGE_KEY)); }
export function saveOrders(orders: DemoOrder[]) {
  const raw = JSON.stringify({ version: 1, orders });
  parseOrders(raw);
  localStorage.setItem(ORDER_STORAGE_KEY, raw);
  if (localStorage.getItem(ORDER_STORAGE_KEY) !== raw) throw new Error("This browser did not save the sample orders.");
  window.dispatchEvent(new Event("pow-orders-change"));
}
export function recordInvoiceOrder(invoice: ManualInvoice) { saveOrders(upsertInvoice(readOrders(), invoice)); }
