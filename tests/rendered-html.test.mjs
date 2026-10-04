import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { FIRST_ORDER_OFFER_KEY, claimFirstOrderOffer, readOfferStatus, redeemFirstOrderOffer, isShoppingRoute } from "../app/first-order-offer.ts";
import { researchBundles, bundleContents, bundleCartItem } from "../app/pow-bundles.ts";
import { demoCheckoutTotals } from "../app/demo-checkout-totals.ts";

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
  ["/research/reading-a-certificate", "How to read a certificate"],
  ["/research/lot-traceability", "Why lot traceability matters"],
  ["/research/handling-basics", "coming soon"],
  ["/partners", "Build trust"],
  ["/subscribe", "Keep the"],
  ["/cart", "Your research"],
  ["/build-a-box", "Four heavy"],
  ["/bundles", "Pick your"],
  ["/checkout", "Finish the"],
  ["/track-order", "Track the"],
  ["/compare", "Two products"],
  ["/bulk", "More vials"],
  ["/rewards", "Shop. Earn"],
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
  assert.match(html, /Lot record pending/);
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
  assert.match(research, /Read guide →/);
  assert.match(research, /Article coming soon →/);
  assert.match(subscribe, /BUILD A PROTOTYPE PLAN/);
  assert.match(subscribe, /Base order total/);
  assert.match(subscribe, /\$80/);
});

test("publishes complete research guides and honest coming-soon states", async () => {
  const certificate = (await (await render("/research/reading-a-certificate")).text()).replaceAll("<!-- -->", "");
  const traceability = (await (await render("/research/lot-traceability")).text()).replaceAll("<!-- -->", "");
  const handling = (await (await render("/research/handling-basics")).text()).replaceAll("<!-- -->", "");

  assert.match(certificate, /LOT → TEST → RESULT → SPEC → REVIEW/);
  assert.match(certificate, /Separate the result from the specification/);
  assert.match(certificate, /Fast review checklist/);
  assert.match(certificate, /fda\.gov/);
  assert.doesNotMatch(certificate, /Know more[\s\S]*Research sharper/);

  assert.match(traceability, /VIAL → INVENTORY → TEST → ORDER → SHIPMENT/);
  assert.match(traceability, /Exceptions need their own status/);
  assert.match(traceability, /Give the customer a simple proof path/);

  assert.match(handling, /Article[\s\S]*coming soon/);
  assert.match(handling, /We(?:&#x27;|’)re not filling operational gaps with generic instructions/);
  assert.match(handling, /Approved storage ranges/);
  assert.match(handling, /Quality and legal approval/);
});

test("renders a high-detail, evidence-bounded product record", async () => {
  const reta = (await (await render("/shop/reta-glp-3")).text()).replaceAll("<!-- -->", "");
  const water = (await (await render("/shop/bacteriostatic-water")).text()).replaceAll("<!-- -->", "");
  assert.match(reta, /Weight management\. A different angle on appetite\./);
  assert.match(reta, /What each receptor contributes/);
  assert.match(reta, /Where it fits among incretin compounds/);
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

test("offers only supplied strength variants with exact prices and stock counts", async () => {
  const response = await render("/shop/reta-glp-3");
  const html = (await response.text()).replaceAll("<!-- -->", "");
  const source = await readFile(new URL("../app/POWApp.tsx", import.meta.url), "utf8");
  assert.match(html, /Select strength/);
  for (const strength of ["10 mg", "20 mg"]) assert.match(html, new RegExp(`>${strength}<`));
  assert.match(html, /20 mg, \$105 per vial, 300 vials in supplied inventory/);
  assert.match(html, /1,200 vials/);
  assert.doesNotMatch(html, />30 mg<|pricing scales proportionally/);
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
  assert.match(product, /POW SUPPLIED PRICING/);
  assert.doesNotMatch(product, /VIALS 5%|VIALS 40%/);
  assert.match(cart, /Product and bundle prices match POW/);
  assert.doesNotMatch(cart, /Volume savings|volume tier applied/);
  assert.match(box, /SUPPLIED PRICES/);
  assert.doesNotMatch(box, /25% OFF|FREE WATER|free water/);
  assert.match(checkout, /cannot collect a payment or create a real order/);
  assert.match(tracking, /POW-DEMO-1001/);
  assert.match(source, /pow_demo_cart/);
  assert.match(source, /addCartItem\(\{id:/);
});

test("presents Venmo-only checkout as an unconnected preview", async () => {
  const html = (await (await render("/checkout")).text()).replaceAll("<!-- -->", "");
  assert.match(html, /Pay with Venmo/);
  assert.match(html, /Only payment option/);
  assert.match(html, /Venmo setup pending/);
  assert.match(html, /Fill sample details/);
  assert.match(html, /A Venmo username alone does not activate checkout/);
  assert.match(html, /<dialog[^>]*aria-labelledby="venmo-preview-title"/);
  assert.match(html, /Approve demo payment/);
  assert.match(html, /Cancel and return to checkout/);
  assert.match(html, /Try payment-not-completed example/);
  assert.match(html, /disabled=""[^>]*>Preview Venmo payment/);
  assert.doesNotMatch(html, /4242|DEMO PAYMENT TOKEN|name="(?:card|cvv|venmoPassword)"|https:\/\/(?:www\.)?venmo\.com\/u\//);
});

test("calculates the demo tariff on merchandise once, excluding shipping", () => {
  assert.deepEqual(demoCheckoutTotals(0), { discount: 0, tariff: 0, shipping: 0, total: 0 });
  assert.deepEqual(demoCheckoutTotals(80), { discount: 0, tariff: 4, shipping: 12, total: 96 });
  assert.deepEqual(demoCheckoutTotals(199), { discount: 0, tariff: 9.95, shipping: 12, total: 220.95 });
  assert.deepEqual(demoCheckoutTotals(200), { discount: 0, tariff: 10, shipping: 0, total: 210 });
  assert.deepEqual(demoCheckoutTotals(240), { discount: 0, tariff: 12, shipping: 0, total: 252 });
  assert.deepEqual(demoCheckoutTotals(19.99), { discount: 0, tariff: 1, shipping: 12, total: 32.99 });
});

test("discloses the fictional tariff cameo and fee before the payment preview", async () => {
  const html = (await (await render("/checkout")).text()).replaceAll("<!-- -->", "");
  assert.match(html, /<dialog[^>]*aria-labelledby="tariff-title"/);
  assert.match(html, /Sorry, but because of the war there is a 5% tariff fee added to your order\. Once the war is over so is this additional fee\./);
  assert.match(html, /Parody · fictional quote/);
  assert.match(html, /not a government tax/);
  assert.match(html, /trump-comic-cutout\.png/);
  assert.match(html, /Replay the announcement/);
  assert.match(html, /Tariff fee · 5% \(demo\)/);
  assert.match(html, /Includes a 5% merchandise surcharge/);
  const cart = await (await render("/cart")).text();
  assert.match(cart, /Tariff fee · 5% \(demo\)/);
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
  assert.match(bulk, /No bulk discount is applied/);
  assert.doesNotMatch(bulk, /40%|50%/);
  assert.match(bulk, /ADULT SIGNATURE[\s\S]*LOT-MATCHED DOCUMENTS/);
  assert.match(rewards, /always free/);
  assert.match(rewards, /Join free/);
  assert.match(rewards, /1 PT \/ \$1/);
  assert.match(rewards, /\$5 off[\s\S]*500 points/);
  assert.match(rewards, /Member[\s\S]*Plus[\s\S]*Premier/);
  assert.match(rewards, /STATUS IS EARNED—NEVER PURCHASED/);
  assert.doesNotMatch(rewards, /\$99\.99|per month|Choose Founder/);
  assert.match(guarantee, /proposed framework/);
  assert.match(guarantee, /Independent testing[\s\S]*Lot-specific proof[\s\S]*Protected fulfillment[\s\S]*Human support/);
  assert.match(source, /pow_demo_saved/);
  assert.match(source, /pow_recently_viewed/);
  assert.match(source, /concierge-launcher/);
});

test("turns the partner network into a complete recruitment and onboarding journey", async () => {
  const partners = (await (await render("/partners")).text()).replaceAll("<!-- -->", "");
  assert.match(partners, /Build trust[\s\S]*Get credit/);
  assert.match(partners, /Apply[\s\S]*Get approved[\s\S]*Create your link[\s\S]*Share it[\s\S]*Track the sale/);
  assert.match(partners, /BUILD YOUR FIRST LINK/);
  assert.match(partners, /Email your list[\s\S]*Text opted-in customers[\s\S]*Post approved creative/);
  assert.match(partners, /CLICK → CUSTOMER → ORDER → COMMISSION/);
  assert.match(partners, /Start your partner[\s\S]*application/);
  assert.match(partners, /Open the command center/);
  assert.match(partners, /Attribution window, commission rates, eligible sales, payout timing/);
  assert.match(partners, /Only contact people who have opted in/);
});

// Independently transcribed from the supplied document: strength, dollars per vial, vial count.
const suppliedInventory = {
  "reta-glp-3": [["10 mg",80,1200],["20 mg",105,300]],
  "ghk-cu": [["100 mg",50,1200]], "bpc-tb-500": [["20 mg",90,400]],
  "bacteriostatic-water": [["10 mL",20,1200]], "tesamorelin": [["10 mg",90,500]],
  "snap-8": [["10 mg",60,400]], "nad-mots-c-5-amino-1mq": [["120 mg",70,400]],
  "ss-31": [["10 mg",50,500]], "vitamin-b12": [["10 mg",55,400]],
  "cartalax": [["20 mg",70,500]], "epitalon": [["10 mg",50,1200]],
  "foxo4-dri": [["10 mg",140,500]], "igf-1-lr3": [["1 mg",80,500]],
  "klow": [["80 mg",85,400]], "klow-pro": [["80 mg",130,250]],
  "melanotan-ii": [["10 mg",45,500]], "nad-plus": [["1000 mcg",55,500]],
  "oxytocin": [["10 mg",50,500]], "pt-141": [["10 mg",50,500]],
  "selank-semax": [["20 mg",66,500]], "selank": [["10 mg",44,250]],
  "semax": [["10 mg",44,250]], "sermorelin": [["10 mg",60,250]],
  "tesamorelin-ipamorelin": [["16 mg total",99,500]], "testagen": [["20 mg",66,250]],
  "thymosin-alpha-1": [["10 mg",66,250]], "vesugen": [["20 mg",66,250]],
  "vip": [["10 mg",66,250]], "kisspeptin-10": [["10 mg",55,500]],
  "ipamorelin": [["10 mg",33,250]], "cortexin": [["20 mg",70,250]],
  "chonluten": [["20 mg",60,250]], "dsip": [["10 mg",45,250]],
  "mots-c": [["10 mg",35,500]], "aod-9604": [["5 mg",55,500]],
  "cjc-1295-ipamorelin": [["10 mg",55,500]], "prime-191-gh": [["24 IU",80,1200]],
  "vilon": [["20 mg",70,250]],
};

test("matches every supplied variant, price and stock count without inventing inventory", async () => {
  const { products: inventory } = JSON.parse(await readFile(new URL("../app/pow-inventory.json", import.meta.url), "utf8"));
  const actual = Object.fromEntries(Object.entries(inventory).map(([slug, variants]) => [slug, variants.map(v => [v.strength,v.price,v.stockCount])]));
  assert.deepEqual(actual, suppliedInventory);
  const variants = Object.values(inventory).flat();
  assert.equal(variants.length, 39);
  assert.equal(new Set(variants.map(v => v.id)).size, 39);
  assert.equal(variants.reduce((sum, v) => sum + v.stockCount, 0), 19050);
});

test("renders the supplied default strength, price and count on every product page", async () => {
  for (const [slug, variants] of Object.entries(suppliedInventory)) {
    const html = (await (await render("/shop/" + slug)).text()).replaceAll("<!-- -->", "");
    const [strength, price, count] = variants[0];
    assert.ok(html.includes(strength), slug + " strength");
    assert.ok(html.includes("$" + price), slug + " price");
    assert.ok(html.includes(count.toLocaleString("en-US") + " vials"), slug + " stock");
    if (variants.length === 1) assert.doesNotMatch(html, /class="strength-options"/, slug + " must not invent strengths");
  }
  const blend = (await (await render("/shop/tesamorelin-ipamorelin")).text()).replaceAll("<!-- -->", "");
  assert.match(blend, /Tesamorelin 13 mg \/ Ipamorelin 3 mg/);
});


test("renders all five supplied research bundles with exact prices and contents", async () => {
  const html = (await (await render("/bundles")).text()).replaceAll("<!-- -->", "");
  for (const [slug, price, names] of [
    ["pilates", 200, ["BPC-157 / TB-500", "GHK-Cu", "Tesa / Ipa"]],
    ["goddess", 220, ["GHK-Cu", "SNAP-8", "Epithalon", "KLOW"]],
    ["raver", 200, ["PT-141", "Oxytocin", "Triple Threat", "B12"]],
    ["just-divorced", 200, ["Super Man", "KLOW", "GHK-Cu"]],
    ["benjamin-buttons", 220, ["GHK-Cu", "Epithalon", "SNAP-8", "Tesa / Ipa"]],
  ]) {
    const card = html.split(`id="${slug}"`)[1].split("</article>")[0];
    assert.ok(card.includes(`$${price}`));
    for (const name of names) assert.ok(card.includes(name), `${slug} contains ${name}`);
    assert.match(card, /Add bundle/);
  }
  assert.match(html, /Strength to be confirmed/);
  assert.match(html, /Catalog details pending/);
  assert.match(html, /do not describe intended use or promised results/);
});

test("keeps fixed bundle prices and component details through cart serialization and totals", () => {
  assert.deepEqual(researchBundles.map(bundle => bundle.price), [200, 220, 200, 200, 220]);
  const items = researchBundles.map(bundleCartItem);
  assert.equal(new Set(items.map(item => item.id)).size, 5);
  const restored = JSON.parse(JSON.stringify(items));
  assert.deepEqual(restored, items);
  for (const [index, item] of restored.entries()) {
    assert.equal(item.qty, 1);
    assert.equal(item.researchBundle, true);
    assert.equal(item.unitPrice, researchBundles[index].price);
    for (const component of bundleContents(researchBundles[index])) {
      assert.ok(item.strength.includes(component.name));
      assert.ok(item.strength.includes(component.strength));
    }
  }
  const subtotal = restored.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  assert.equal(subtotal, 1040);
  assert.equal(demoCheckoutTotals(subtotal).total, 1092);
  assert.equal(demoCheckoutTotals(items[0].unitPrice * 2).total, 420);
  assert.equal(bundleContents(researchBundles[0])[2].strength, "16 mg total");
  assert.equal(bundleContents(researchBundles[2])[2].slug, undefined);
  assert.equal(bundleContents(researchBundles[3])[0].strength, "10 mg");
  assert.equal(bundleContents(researchBundles[3])[0].slug, undefined);
});

test("makes bundles discoverable from home and shop without replacing the box builder", async () => {
  for (const path of ["/", "/shop"]) {
    const html = await (await render(path)).text();
    assert.match(html, /href="\/bundles"/);
    for (const bundle of researchBundles) assert.ok(html.includes(`/bundles#${bundle.slug}`));
  }
  const html = await (await render("/bundles")).text();
  assert.match(html, /href="\/build-a-box"/);
});


test("requires email entry on shopping routes and leaves support available", async () => {
  for (const path of ["/", "/shop", "/shop/ghk-cu", "/bundles", "/build-a-box", "/cart", "/checkout"]) {
    const html = (await (await render(path)).text()).replaceAll("<!-- -->", "");
    assert.match(html, /<dialog[^>]*open=""[^>]*aria-labelledby="email-offer-title"/);
    assert.match(html, /inert=""/);
    assert.match(html, /10% off your first order/);
    assert.match(html, /type="email"[^>]*required=""/);
    assert.match(html, /Unlock the menu &amp; save 10%/);
    assert.match(html, /your email is not stored/);
    assert.match(html, /href="\/support"/);
  }
  for (const path of ["/support", "/coa", "/research", "/access", "/partner", "/ops"]) {
    const html = await (await render(path)).text();
    assert.doesNotMatch(html, /aria-labelledby="email-offer-title"/);
  }
  assert.equal(isShoppingRoute("/categories/recovery"), true);
  assert.equal(isShoppingRoute("/shop/ghk-cu"), true);
  assert.equal(isShoppingRoute("/shopper"), false);
});

test("remembers access and consumes the first-order offer once without storing email", () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  assert.equal(readOfferStatus(storage), "locked");
  for (const email of ["", "bad", "a@b", "one two@example.com"]) assert.throws(() => claimFirstOrderOffer(storage, email));
  assert.equal(values.size, 0);
  assert.equal(claimFirstOrderOffer(storage, " researcher@example.com "), "available");
  assert.deepEqual([...values], [[FIRST_ORDER_OFFER_KEY, "available"]]);
  assert.equal(readOfferStatus(storage), "available");
  // Browsing, canceled previews, and repeat signup do not consume the offer.
  assert.equal(claimFirstOrderOffer(storage, "second@example.com"), "available");
  assert.equal(readOfferStatus(storage), "available");
  redeemFirstOrderOffer(storage);
  assert.equal(readOfferStatus(storage), "used");
  assert.equal(claimFirstOrderOffer(storage, "new@example.com"), "used");
  redeemFirstOrderOffer(storage);
  assert.deepEqual([...values], [[FIRST_ORDER_OFFER_KEY, "used"]]);
  values.set(FIRST_ORDER_OFFER_KEY, "corrupted");
  assert.equal(readOfferStatus(storage), "locked");
});

test("storage failures do not falsely claim that an email offer was saved", () => {
  const blocked = { getItem: () => null, setItem: () => { throw new Error("Storage blocked"); } };
  assert.throws(() => claimFirstOrderOffer(blocked, "researcher@example.com"), /Storage blocked/);
});

test("applies ten percent to first-order merchandise with cent rounding and existing shipping threshold", () => {
  assert.deepEqual(demoCheckoutTotals(0, true), { discount: 0, tariff: 0, shipping: 0, total: 0 });
  assert.deepEqual(demoCheckoutTotals(80, true), { discount: 8, tariff: 3.6, shipping: 12, total: 87.6 });
  assert.deepEqual(demoCheckoutTotals(199, true), { discount: 19.9, tariff: 8.96, shipping: 12, total: 200.06 });
  assert.deepEqual(demoCheckoutTotals(200, true), { discount: 20, tariff: 9, shipping: 0, total: 189 });
  assert.deepEqual(demoCheckoutTotals(220, true), { discount: 22, tariff: 9.9, shipping: 0, total: 207.9 });
  assert.deepEqual(demoCheckoutTotals(19.99, true), { discount: 2, tariff: .9, shipping: 12, total: 30.89 });
  assert.equal(demoCheckoutTotals(1040, true).discount, 104);
  assert.equal(demoCheckoutTotals(1040, true).total, 982.8);
  assert.equal(demoCheckoutTotals(200, false).total, 210);
});

// Coupon lifecycle uses synthetic addresses and local storage only.
const coupons = await import("../app/affiliate-coupons.ts");
function sampleInventory() {
  let sequence = 0;
  return coupons.completeAffiliateSignup(coupons.emptyCouponStore, () => `sample-${++sequence}`);
}
function issuedInventory(percent = 25) {
  const state = sampleInventory();
  const coupon = state.coupons.find(item => item.percent === percent);
  return { state: coupons.issueCoupon(state, state.profile.id, coupon.id, " Researcher@Example.com "), code: coupon.code, id: coupon.id };
}

test("affiliate signup creates all four approved tiers once without replenishing", () => {
  const state = sampleInventory();
  assert.deepEqual([...new Set(state.coupons.map(item => item.percent))], [10, 15, 20, 25]);
  assert.equal(state.coupons.length, 8);
  assert.equal(new Set(state.coupons.map(item => item.code)).size, 8);
  for (const tier of coupons.COUPON_TIERS) assert.equal(state.coupons.filter(item => item.percent === tier && item.status === "available").length, 2);
  const {state: issued} = issuedInventory();
  assert.equal(coupons.completeAffiliateSignup(issued, () => { throw Error("Must not refill"); }), issued);
  assert.deepEqual(coupons.parseCouponStore(JSON.stringify(issued)), issued);
});

test("codes require assignment, correct ownership, and a fixed synthetic recipient", () => {
  const initial = sampleInventory();
  const first = initial.coupons[0];
  assert.ok(coupons.validateCoupon(initial, first.code, "researcher@example.com", "researcher@example.com").error);
  assert.throws(() => coupons.issueCoupon(initial, "someone-else", first.id, "researcher@example.com"));
  assert.throws(() => coupons.issueCoupon(initial, initial.profile.id, first.id, "real@customer.com"));
  const {state, id, code} = issuedInventory();
  assert.equal(state.coupons.find(item => item.id === id).recipientEmail, "researcher@example.com");
  assert.throws(() => coupons.issueCoupon(state, state.profile.id, id, "other@example.com"));
  assert.ok(coupons.validateCoupon(state, code, "researcher@example.com", "").error);
  assert.ok(coupons.validateCoupon(state, code, "other@example.com", "other@example.com").error);
  assert.ok(coupons.validateCoupon(state, code, "other@example.com", "researcher@example.com").error);
  assert.equal(coupons.validateCoupon(state, ` ${code.toLowerCase()} `, "RESEARCHER@example.com", "researcher@example.com").coupon.id, id);
});

test("coupon validation and canceled previews preserve inventory; approval redeems once", () => {
  const {state, code, id} = issuedInventory();
  const original = JSON.stringify(state);
  for(let i=0;i<3;i++) assert.ok(coupons.validateCoupon(state, code, "researcher@example.com", "researcher@example.com").coupon);
  assert.equal(JSON.stringify(state), original);
  assert.throws(() => coupons.redeemCoupon(state, code, "other@example.com", "other@example.com", "ORDER-1"));
  assert.throws(() => coupons.redeemCoupon(state, code, "researcher@example.com", "researcher@example.com", ""));
  const redeemed = coupons.redeemCoupon(state, code, "researcher@example.com", "researcher@example.com", "ORDER-1");
  const coupon = redeemed.coupons.find(item => item.id === id);
  assert.equal(coupon.status, "redeemed"); assert.equal(coupon.orderId, "ORDER-1");
  assert.equal(coupon.affiliateId, state.profile.id);
  assert.throws(() => coupons.redeemCoupon(redeemed, code, "researcher@example.com", "researcher@example.com", "ORDER-2"));
  assert.throws(() => coupons.revokeCoupon(redeemed, state.profile.id, id));
});

test("revocation prevents checkout and does not refill inventory", () => {
  const {state, code, id} = issuedInventory();
  assert.throws(() => coupons.revokeCoupon(state, "someone-else", id));
  const revoked = coupons.revokeCoupon(state, state.profile.id, id);
  assert.equal(revoked.coupons.length, state.coupons.length);
  assert.equal(revoked.coupons.find(item => item.id === id).status, "revoked");
  assert.ok(coupons.validateCoupon(revoked, code, "researcher@example.com", "researcher@example.com").error);
  assert.throws(() => coupons.issueCoupon(revoked, state.profile.id, id, "researcher@example.com"));
});

test("unreadable or inconsistent inventories fail instead of silently granting new codes", () => {
  for(const raw of ["broken", "{}", "null", JSON.stringify({profile: null, coupons: [{}]})]) assert.throws(() => coupons.parseCouponStore(raw));
  const state = sampleInventory();
  state.coupons.push(state.coupons[0]);
  assert.throws(() => coupons.parseCouponStore(JSON.stringify(state)));
});

test("all approved affiliate discounts work without stacking with the welcome offer", () => {
  for(const tier of [10,15,20,25]) {
    assert.deepEqual(coupons.selectOrderDiscount(true, tier), {source: "affiliate", percent: tier});
    assert.deepEqual(demoCheckoutTotals(200, true, tier), demoCheckoutTotals(200, false, tier));
    assert.equal(demoCheckoutTotals(200, true, tier).discount, 2*tier);
  }
  assert.deepEqual(demoCheckoutTotals(200, true, 25), {discount:50,tariff:7.5,shipping:0,total:157.5});
  assert.deepEqual(demoCheckoutTotals(19.99, false, 15), {discount:3,tariff:.85,shipping:12,total:29.84});
  assert.equal(demoCheckoutTotals(200, true, 99).discount, 20);
  assert.deepEqual(coupons.selectOrderDiscount(false), {source:"none",percent:0});
});

test("exposes a direct coupon profile route and an explicitly simulated checkout identity step", async () => {
  const portal = (await (await render("/partner/coupons")).text()).replaceAll("<!-- -->", "");
  assert.match(portal, /Give a little/);
  assert.match(portal, /ONE CUSTOMER/);
  assert.match(portal, /Your coupon inventory starts at signup/);
  assert.match(portal, /href="\/partners#apply"/);
  const checkout = (await (await render("/checkout")).text()).replaceAll("<!-- -->", "");
  assert.match(checkout, /Have an affiliate code/);
  assert.match(checkout, /Start test email verification/);
  assert.match(checkout, /No verification email is sent/);
  assert.match(checkout, /Offers do not stack/);
});

test("every catalog product has a distinct research file with usable evidence links and section navigation", async () => {
  const { productResearch, researchSources } = await import("../app/product-research.ts");
  const { productScience } = await import("../app/product-science.ts");
  const { productBenefits } = await import("../app/product-benefits.ts");
  const { products: inventory } = JSON.parse(await readFile(new URL("../app/pow-inventory.json", import.meta.url), "utf8"));
  assert.deepEqual(Object.keys(productResearch).sort(), Object.keys(inventory).sort());
  assert.deepEqual(Object.keys(productScience).sort(), Object.keys(inventory).sort());
  assert.deepEqual(Object.keys(productBenefits).sort(), Object.keys(inventory).sort());
  assert.equal(new Set(Object.values(productBenefits).map(profile => profile.headline)).size, 38);
  for (const [slug, science] of Object.entries(productScience)) {
    const response = await render(`/shop/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = (await response.text()).replaceAll("<!-- -->", "");
    for (const section of ["overview", "mechanisms", "evidence", "specifications", "questions", "sources"]) {
      assert.ok(html.includes(`href="#${section}"`), `${slug}: link to ${section}`);
      assert.equal(html.split(`id="${section}"`).length - 1, 1, `${slug}: unique ${section} destination`);
    }
    for (const source of new Set([...productBenefits[slug].sources, ...science.chapters.flatMap(item => item.sources), ...science.studies.map(([id]) => id)])) {
      assert.ok(researchSources[source], `${slug}: source exists`);
      assert.ok(html.includes(`href="${researchSources[source].url.replaceAll("&", "&amp;")}"`), `${slug}: source link rendered`);
      assert.ok(html.includes(`id="source-${source}"`), `${slug}: reference destination exists`);
      assert.equal(new URL(researchSources[source].url).protocol, "https:");
    }
    if (!science.studies.length) {
      assert.ok(["klow", "klow-pro"].includes(slug));
      assert.match(html, /Formula pending/);
    }
    assert.match(html, /<details><summary>/);
    assert.ok(html.indexOf('class="pdp-description"') < html.indexOf('id="overview"'), `${slug}: plain-language introduction first`);
    assert.ok(html.indexOf('id="overview"') < html.indexOf('aria-label="Research pathway"'), `${slug}: benefits before mechanisms`);
    assert.ok(html.indexOf('aria-label="Benefit evidence"') < html.indexOf('id="mechanisms"'), `${slug}: evidence context travels with benefits`);
    assert.ok(html.includes(productBenefits[slug].evidenceLabel.replaceAll('&', '&amp;')), `${slug}: visible evidence level`);
    assert.match(html, /No numerical analytical results are claimed/);
    assert.doesNotMatch(html.split('<section class="product-section compact">')[0], /Lot POW-XXXX|>Current COA<|Record mapped\./);
  }
});

test("product research preserves unresolved identities and separates ingredient evidence from blends", async () => {
  const page = async slug => (await (await render(`/shop/${slug}`)).text()).replaceAll("<!-- -->", "");
  assert.match(await page("nad-plus"), /1000 mcg/);
  assert.match(await page("tesamorelin-ipamorelin"), /13 mg tesamorelin plus 3 mg ipamorelin/);
  assert.match(await page("cjc-1295-ipamorelin"), /Does this contain DAC/);
  assert.match(await page("bpc-tb-500"), /does not establish a 10 mg \/ 10 mg split/);
  assert.match(await page("cortexin"), /composition and source of POW material/i);
  assert.match(await page("prime-191-gh"), /without inventing a conversion/);
  assert.match(await page("snap-8"), /Manufacturer data/);
  assert.match(await page("oxytocin"), /no significant benefit/);
  assert.match(await page("dsip"), /without improved subjective sleep quality/);
  assert.match(await page("klow-pro"), /POW has not yet supplied the formulation difference/);
});


test("product descriptions explain concrete science and study findings instead of repeating generic cautions", async () => {
  const page = async slug => (await (await render(`/shop/${slug}`)).text()).replaceAll("<!-- -->", "");
  const reta = await page("reta-glp-3");
  const ghk = await page("ghk-cu");
  const ss = await page("ss-31");
  const tesa = await page("tesamorelin-ipamorelin");
  assert.match(reta, /338 adults/);
  assert.match(reta, /−8.7% to −24.2%/);
  assert.match(reta, /cry[o]-electron microscopy/);
  assert.match(ghk, /MMP-2/);
  assert.match(ghk, /TIMP-1 and TIMP-2/);
  assert.match(ss, /peroxidase/);
  assert.match(ss, /cristae/);
  assert.match(tesa, /81.25% tesamorelin and 18.75% ipamorelin/);
  assert.match(tesa, /does not convert a single-ingredient trial into a study of the mixture/);
  assert.match(reta, /class="pdp-description"/);
  assert.match(reta, /aria-label="Research pathway"/);
  assert.equal(reta.split('class="evidence-boundary"').length - 1, 1);
  assert.doesNotMatch(reta, /What the record does not prove/);
});
