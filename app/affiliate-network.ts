// Synthetic scenario only. No production attribution, commission, or payout policy.
export type NetworkMember = { id: string; name: string; sponsor: string | null; status: "active" | "invited" };
export type NetworkSale = { id: string; member: string; cents: number; status: "pending" | "confirmed" | "refunded" };
export type NetworkState = { version: 1; members: NetworkMember[]; sales: NetworkSale[] };
export const NETWORK_KEY = "pow_affiliate_network_demo_v1";
export function initialNetwork(): NetworkState {
  return { version: 1, members: [
    {id:"you", name:"Your sample account", sponsor:null, status:"active"},
    {id:"alex", name:"Alex · sample affiliate", sponsor:"you", status:"active"},
    {id:"jordan", name:"Jordan · sample affiliate", sponsor:"you", status:"active"},
    {id:"sam", name:"Sam · sample affiliate", sponsor:"alex", status:"active"},
    {id:"riley", name:"Riley · sample affiliate", sponsor:"alex", status:"invited"},
  ], sales: [
    {id:"NET-DEMO-001", member:"alex", cents:80000, status:"confirmed"},
    {id:"NET-DEMO-002", member:"jordan", cents:40000, status:"pending"},
    {id:"NET-DEMO-003", member:"sam", cents:60000, status:"confirmed"},
    {id:"NET-DEMO-004", member:"alex", cents:20000, status:"refunded"},
    {id:"NET-DEMO-005", member:"you", cents:30000, status:"confirmed"},
  ] };
}
export function descendants(state: NetworkState, sponsor: string): {member: NetworkMember; depth: number}[] {
  const result: {member: NetworkMember; depth: number}[] = [];
  const seen = new Set([sponsor]);
  const visit = (id: string, depth: number) => {
    for (const member of state.members.filter(row => row.sponsor === id)) {
      if (seen.has(member.id)) throw new Error("The sample network contains a cycle.");
      seen.add(member.id); result.push({member, depth}); visit(member.id, depth + 1);
    }
  };
  visit(sponsor, 1); return result;
}
export function networkSales(state: NetworkState, sponsor: string) {
  const team = descendants(state, sponsor);
  return state.sales.flatMap(sale => {
    const match = team.find(row => row.member.id === sale.member);
    return match ? [{...sale, name:match.member.name, depth:match.depth}] : [];
  });
}
export function estimateShare(cents: number, status: NetworkSale["status"], rate: string): number | null {
  if (!rate.trim()) return null;
  if (!/^\d{1,3}(\.\d{1,2})?$/.test(rate) || Number(rate) > 100) throw new Error("Enter a percentage from 0 to 100 with up to two decimal places.");
  return status === "confirmed" ? Math.round(cents * Number(rate) / 100) : 0;
}
export type NetworkAction = {type:"invite"; sponsor:string} | {type:"activate"; member:string} | {type:"sale"; member:string} | {type:"confirm" | "refund"; sale:string};
export function updateNetwork(state: NetworkState, action: NetworkAction): NetworkState {
  const next: NetworkState = structuredClone(state);
  if (action.type === "invite") {
    if (!next.members.some(row => row.id === action.sponsor && row.status === "active")) throw new Error("Choose an active sponsor.");
    if (next.members.length >= 40) throw new Error("This demo supports 40 sample members. Reset to start again.");
    let number = next.members.length + 1;
    while (next.members.some(row => row.id === `sample-${number}`)) number++;
    next.members.push({id:`sample-${number}`, name:`Sample affiliate ${number}`, sponsor:action.sponsor, status:"invited"});
  } else if (action.type === "activate" || action.type === "sale") {
    const member = next.members.find(row => row.id === action.member);
    if (!member) throw new Error("Sample member not found.");
    if (action.type === "activate") {
      if (member.status !== "invited") throw new Error("This member is already active.");
      member.status = "active";
    } else {
      if (member.status !== "active") throw new Error("Join the sample network before adding a sale.");
      if (next.sales.length >= 100) throw new Error("This demo supports 100 orders. Reset to start again.");
      let number = next.sales.length + 1;
      while (next.sales.some(row => row.id === `NET-DEMO-${String(number).padStart(3,"0")}`)) number++;
      next.sales.push({id:`NET-DEMO-${String(number).padStart(3,"0")}`, member:member.id, cents:20000, status:"pending"});
    }
  } else {
    const sale = next.sales.find(row => row.id === action.sale);
    if (!sale || (action.type === "confirm" ? sale.status !== "pending" : sale.status !== "confirmed")) throw new Error("That order cannot move to this status.");
    sale.status = action.type === "confirm" ? "confirmed" : "refunded";
  }
  return next;
}
export function parseNetwork(raw: string): NetworkState {
  const value = JSON.parse(raw) as NetworkState;
  if (!value || value.version !== 1 || !Array.isArray(value.members) || !Array.isArray(value.sales) || value.members.length > 40 || value.sales.length > 100) throw new Error("Invalid sample network.");
  const ids = new Set(value.members.map(row => row?.id));
  if (ids.size !== value.members.length || !ids.has("you")) throw new Error("Invalid sample members.");
  for (const row of value.members) {
    if (!row || typeof row.id !== "string" || !/^[a-z0-9-]+$/.test(row.id) || typeof row.name !== "string" || row.name.length > 80 || !["active","invited"].includes(row.status) || (row.id === "you" ? row.sponsor !== null || row.status !== "active" : !ids.has(row.sponsor as string))) throw new Error("Invalid sample member.");
    if (row.sponsor && value.members.find(parent => parent.id === row.sponsor)?.status !== "active") throw new Error("An invited member cannot sponsor others.");
  }
  if (descendants(value, "you").length !== value.members.length - 1) throw new Error("Disconnected sample network.");
  if (new Set(value.sales.map(row => row?.id)).size !== value.sales.length) throw new Error("Duplicate sample orders.");
  for (const row of value.sales) {
    if (!row || typeof row.id !== "string" || !/^NET-DEMO-\d+$/.test(row.id) || !ids.has(row.member) || value.members.find(member => member.id === row.member)?.status !== "active" || !Number.isSafeInteger(row.cents) || row.cents <= 0 || row.cents > 10000000 || !["pending","confirmed","refunded"].includes(row.status)) throw new Error("Invalid sample order.");
  }
  return value;
}
