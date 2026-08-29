import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname = "/") {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

for (const [pathname, expected] of [
  ["/", "Purity with a"],
  ["/access?ref=test-partner", "Access the"],
  ["/shop", "Shop the"],
  ["/shop/reta-glp-3", "Reta GLP-3"],
  ["/coa", "The proof behind"],
  ["/research", "Research sharper"],
  ["/subscribe", "Keep the"],
  ["/cart", "Your research"],
  ["/build-a-box", "Four heavy"],
  ["/checkout", "Finish the"],
  ["/track-order", "Track the"],
  ["/compare", "Two products"],
  ["/bulk", "More vials"],
  ["/rewards", "Every order"],
  ["/guarantee", "Proof before"],
  ["/account", "Your lab"],
  ["/partner", "Command center"],
  ["/ops", "POW! ops"],
]) {
  test(`renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.match(await response.text(), new RegExp(expected, "i"));
  });
}

test("ships finished metadata and removes the starter marker", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /POW! Peptides — Purity with a punch/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("keeps unresolved business data explicit", async () => {
  const response = await render("/shop/reta-glp-3");
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /\$80/);
  assert.match(html, /XX%/);
  assert.match(html, /POW-XXXX/);
  assert.doesNotMatch(html, /99(?:\.\d+)?%/);
});

test("renders the complete supplied catalog with exact strengths and prices", async () => {
  const response = await render("/shop");
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, />38<\/b> products/);
  for (const value of ["Reta GLP-3", "10 mg", "$80", "FOXO4-DRI", "$140", "Prime 191 GH", "24 IU", "Vilon", "20 mg", "$70"]) {
    assert.match(html, new RegExp(value.replace("$", "\\$")));
  }
});

test("frames the catalog as a shopping destination", async () => {
  const response = await render("/shop");
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /Shop the[\s\S]*heavy hitters/);
  assert.match(html, /START WITH A LANE/);
  assert.match(html, /Browse all 38 products/);
  assert.match(html, /href="\/shop\?category=Metabolic"/);
  assert.doesNotMatch(html, /Power up your[\s\S]*research/i);
});

test("keeps bacteriostatic water after every peptide and blend", async () => {
  const response = await render("/shop");
  const html = (await response.text()).replaceAll("<!-- -->", "");
  const water = html.lastIndexOf("Bacteriostatic Water");
  const lastPeptide = html.lastIndexOf("Vilon");
  assert.ok(water > lastPeptide, "the research supply should render after the compound catalog");
});

test("uses approved POW! artwork on product bottles", async () => {
  const response = await render("/shop");
  const html = await response.text();
  assert.match(html, /brand-assets\/svg\/pow-logo-primary\.svg/);
  assert.match(html, /mini-vial-cap/);
  assert.match(html, /mini-vial-label/);
  assert.doesNotMatch(html, /class="mini-vial"><i><\/i><b>POW!<\/b>/);
});

test("renders a three-bottle hero and stylized product signals", async () => {
  const home = await (await render("/" )).text();
  const shop = await (await render("/shop")).text();
  assert.equal((home.match(/hero-vial hero-vial--/g) || []).length, 3);
  assert.match(home, /GHK-Cu/);
  assert.match(home, /BPC \/ TB-500/);
  assert.match(shop, /stock-signal available/);
  assert.match(shop, /proof-signal verified/);
  assert.doesNotMatch(shop, /week autoship/);
});

test("keeps primary navigation independent of client-side routing", async () => {
  const source = await readFile(new URL("../app/POWApp.tsx", import.meta.url), "utf8");
  const home = await (await render("/")).text();
  assert.doesNotMatch(source, /from ["']next\/link["']/);
  assert.match(source, /function Link\(\{ children, \.\.\.props \}: React\.AnchorHTMLAttributes/);
  assert.match(home, /<a class="text-link" href="\/shop">View all compounds/);

  for (const pathname of ["/shop", "/coa", "/research", "/partners", "/account", "/subscribe", "/support"]) {
    assert.equal((await render(pathname)).status, 200, `${pathname} should be directly navigable`);
  }
});

test("builds out the proof, research, and subscription journeys", async () => {
  const coa = await (await render("/coa")).text();
  const research = await (await render("/research")).text();
  const subscribe = (await (await render("/subscribe")).text()).replaceAll("<!-- -->", "");
  assert.match(coa, /PRODUCT[\s\S]*LOT[\s\S]*TEST[\s\S]*FILE/);
  assert.match(research, /Featured guide/);
  assert.match(research, /Research essentials/);
  assert.match(subscribe, /BUILD A PROTOTYPE PLAN/);
  assert.match(subscribe, /Base order total/);
  assert.match(subscribe, /\$80/);
});

test("renders a high-detail, evidence-bounded product record", async () => {
  const reta = (await (await render("/shop/reta-glp-3")).text()).replaceAll("<!-- -->", "");
  const water = (await (await render("/shop/bacteriostatic-water")).text()).replaceAll("<!-- -->", "");
  assert.match(reta, /One molecule\. Three receptor pathways\./);
  assert.match(reta, /Why it is studied\./);
  assert.match(reta, /What sets it apart\./);
  assert.match(reta, /Inside the[\s\S]*research file/);
  assert.match(reta, /Product specification/);
  assert.match(reta, /\$8\.00 \/ mg/);
  assert.match(reta, /COA snapshot/);
  assert.match(reta, /Research profile/);
  assert.match(reta, /Evidence &amp; regulatory boundary/);
  assert.match(reta, /pepguide\.net\/peptides\/retatrutide/);
  assert.match(water, /Unit basis varies/);
  assert.match(water, /pepguide\.net\/peptides\/bacteriostatic-water/);
  assert.doesNotMatch(reta, /human dosing|recommended dose/i);
});

test("offers scalable strength variants without empty gallery controls", async () => {
  const response = await render("/shop/reta-glp-3");
  const html = (await response.text()).replaceAll("<!-- -->", "");
  const source = await readFile(new URL("../app/POWApp.tsx", import.meta.url), "utf8");
  assert.match(html, /Select strength/);
  for (const strength of ["10 mg", "20 mg", "30 mg"]) assert.match(html, new RegExp(`>${strength}<`));
  assert.match(html, /pricing scales proportionally/);
  assert.doesNotMatch(html, /aria-label="(?:Front|Detail|Label|Lot) view"/);
  assert.doesNotMatch(source, /className="thumbs"/);
  assert.doesNotMatch(source, /className="reference-card"/);
});

test("lets product story headings use the full page width", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.story-lead\{display:flex;flex-direction:column/);
  assert.match(css, /\.story-lead h2\{width:100%;max-width:none/);
  assert.doesNotMatch(css, /\.story-lead\{display:grid;grid-template-columns:\.8fr 1\.2fr/);
});

test("ships a connected, explicitly simulated commerce loop", async () => {
  const product = (await (await render("/shop/reta-glp-3")).text()).replaceAll("<!-- -->", "");
  const cart = (await (await render("/cart")).text()).replaceAll("<!-- -->", "");
  const box = (await (await render("/build-a-box")).text()).replaceAll("<!-- -->", "");
  const checkout = (await (await render("/checkout")).text()).replaceAll("<!-- -->", "");
  const tracking = (await (await render("/track-order")).text()).replaceAll("<!-- -->", "");
  const source = await readFile(new URL("../app/POWApp.tsx", import.meta.url), "utf8");
  assert.match(product, /2 VIALS 5% · 3–4 VIALS 10% · 5–9 VIALS 25% · 10\+ VIALS 40%/);
  assert.match(cart, /Prices, discount tiers[\s\S]*not final POW terms/);
  assert.match(box, /25% OFF[\s\S]*FREE WATER[\s\S]*FREE SHIPPING/);
  assert.match(checkout, /cannot collect a payment or create a real order/);
  assert.match(tracking, /POW-DEMO-1001/);
  assert.match(source, /pow_demo_cart/);
  assert.match(source, /addCartItem\(\{id:/);
});

test("labels all COA examples as demonstration data", async () => {
  const coa = (await (await render("/coa")).text()).replaceAll("<!-- -->", "");
  const data = await readFile(new URL("../app/pow-data.ts", import.meta.url), "utf8");
  assert.match(coa, /DEMONSTRATION DATA — NOT A POW CERTIFICATE OR TEST RESULT/);
  assert.match(coa, /POW-DEMO-RETA/);
  assert.match(coa, /DEMO-RETA-001/);
  assert.match(data, /Sample laboratory · not a POW result/);
  assert.doesNotMatch(coa, /99\.\d+%/);
});

test("builds the comparison, bulk, rewards, and guarantee journeys", async () => {
  const compare = (await (await render("/compare")).text()).replaceAll("<!-- -->", "");
  const bulk = (await (await render("/bulk")).text()).replaceAll("<!-- -->", "");
  const rewards = (await (await render("/rewards")).text()).replaceAll("<!-- -->", "");
  const guarantee = (await (await render("/guarantee")).text()).replaceAll("<!-- -->", "");
  const source = await readFile(new URL("../app/POWApp.tsx", import.meta.url), "utf8");

  assert.match(compare, /Product one[\s\S]*Product two/);
  assert.match(compare, /Strength[\s\S]*Base price[\s\S]*COA status/);
  assert.match(compare, /no giant product checklist and no hidden horizontal table/);
  assert.match(compare, /does not rank compounds or provide scientific or medical guidance/);
  assert.match(bulk, /10–49 VIALS[\s\S]*50\+ VIALS/);
  assert.match(bulk, /ADULT SIGNATURE[\s\S]*LOT-MATCHED DOCUMENTS/);
  assert.match(rewards, /Member[\s\S]*Insider[\s\S]*VIP[\s\S]*Founder/);
  assert.match(rewards, /100 = \$1/);
  assert.match(rewards, /client demo/);
  assert.match(guarantee, /proposed framework/);
  assert.match(guarantee, /Independent testing[\s\S]*Lot-specific proof[\s\S]*Protected fulfillment[\s\S]*Human support/);
  assert.match(source, /pow_demo_saved/);
  assert.match(source, /pow_recently_viewed/);
  assert.match(source, /concierge-launcher/);
});
