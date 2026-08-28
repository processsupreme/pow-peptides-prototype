import assert from "node:assert/strict";
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
  ["/shop", "Power up your"],
  ["/shop/reta-glp-3", "Reta GLP-3"],
  ["/coa", "The proof behind"],
  ["/research", "Research sharper"],
  ["/subscribe", "Keep the"],
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
