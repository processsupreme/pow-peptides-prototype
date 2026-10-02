"use client";

import { useState } from "react";
import { researchBundles, bundleContents, bundleCartItem } from "./pow-bundles";

export function BundleSpotlight({ compact = false }: { compact?: boolean }) {
  return <section className={`bundle-spotlight ${compact ? "compact" : ""}`} aria-labelledby="bundle-spotlight-title">
    <div><span className="bundle-eyebrow">POW! BUNDLES / THE FULL LINEUP</span><h2 id="bundle-spotlight-title">Big names.<br/><em>One bundle.</em></h2><p>Five research bundles. Three or four products. One price for the lineup.</p><a className="button primary" href="/bundles">Pick your bundle <span>↗</span></a></div>
    <div className="bundle-spotlight-list">{researchBundles.map((bundle, index) => <a href={`/bundles#${bundle.slug}`} key={bundle.slug}><span>0{index + 1}</span><b>{bundle.name.replace(" research bundle", "").replace(" bundle", "")}</b><strong>${bundle.price}</strong><span aria-hidden="true">↗</span></a>)}</div>
  </section>;
}

export default function ResearchBundles({ onAdd }: { onAdd: (item: ReturnType<typeof bundleCartItem>) => void }) {
  const [notice, setNotice] = useState("");
  const [addedSlug, setAddedSlug] = useState("");
  return <>
    <section className="research-bundles-head"><span className="bundle-eyebrow">THE POW! BUNDLE COLLECTION / 01—05</span><h1>Pick your<br/><em>lineup.</em></h1><div><p>Five distinct bundles. Every product listed up front. Choose your lineup and add the whole bundle in one hit.</p><span className="bundle-price-range">$200–$220 <small>PER BUNDLE</small></span></div><nav aria-label="Choose a research bundle">{researchBundles.map(bundle => <a key={bundle.slug} href={`#${bundle.slug}`}>{bundle.name.replace(" research bundle", "").replace(" bundle", "")} ↓</a>)}</nav></section>
    <div className="bundle-collection-note"><b>Research use only.</b> Bundle names identify the collections; they do not describe intended use or promised results. One vial of each listed product is shown in this no-charge demo.</div>
    <section className="research-bundles-grid" aria-label="Research bundles">{researchBundles.map((bundle, index) => <article className={`research-bundle-card research-bundle-card-${index + 1}`} id={bundle.slug} key={bundle.slug}>
      <header><span>COLLECTION / 0{index + 1}</span><span>{bundle.components.length} PRODUCTS</span></header>
      <div className="research-bundle-title"><span aria-hidden="true">0{index + 1}</span><h2>{bundle.name.replace(" research bundle", "").replace(" bundle", "")}<small>{bundle.name.includes("research") ? "Research bundle" : "Bundle"}</small></h2></div>
      <ul>{bundleContents(bundle).map(item => <li key={item.name}><span className="bundle-component-count">1×</span><div>{item.slug ? <a href={`/shop/${item.slug}`}>{item.name} ↗</a> : <b>{item.name}</b>}<span>{item.strength}</span>{item.pending && <small>Catalog details pending</small>}</div></li>)}</ul>
      <footer><div><span>COMPLETE BUNDLE</span><strong>${bundle.price}</strong></div><button className="button primary" onClick={() => { onAdd(bundleCartItem(bundle)); setAddedSlug(bundle.slug); setNotice(`${bundle.name} added to your test cart.`); }} aria-label={`Add ${bundle.name} to test cart`}>Add bundle <span aria-hidden="true">+</span></button>{addedSlug === bundle.slug && <a className="bundle-added-link" href="/cart">Added to test cart. View cart →</a>}</footer>
    </article>)}<aside className="bundle-custom-card"><img src="/brand-assets/svg/pow-icon-impact-reversed.svg" alt="POW!" width="88" height="88"/><span className="bundle-eyebrow">YOUR OWN LINEUP?</span><h2>Call the<br/>shots.</h2><p>Choose four products with the existing box builder. Individual catalog prices apply.</p><a className="button ghost" href="/build-a-box">Build your own box ↗</a></aside></section>
    <div className="bundle-cart-feedback"><p role="status" aria-live="polite" aria-atomic="true">{notice || "Bundle prices cover merchandise. Existing demo fees appear in your cart."}</p><a href="/cart">View test cart →</a></div>
  </>;
}
