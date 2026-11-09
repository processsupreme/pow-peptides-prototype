"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Keep the storefront's native navigation and email-gate fallback. */

import { useState } from "react";
import Image from "next/image";
import { creamCartItem, powCream } from "./pow-cream";

export default function CreamSpotlight({ onAdd, detail = false, compact = false }: {
  onAdd: (item: ReturnType<typeof creamCartItem>) => void; detail?: boolean; compact?: boolean;
}) {
  const [notice, setNotice] = useState("");
  const [added, setAdded] = useState(false);
  const Heading = detail ? "h1" : "h2";
  return <section className={`cream-spotlight${compact ? " cream-compact" : ""}`} id="pow-cream" aria-labelledby="cream-title">
    <div className="cream-copy">
      <span className="impact-label">{detail ? "POW! topical collection" : "In the spotlight / POW! topical collection"}</span>
      <Heading id="cream-title">{detail ? "POW!" : "Meet POW!"}<br/><em>balm.</em></Heading>
      <p className="cream-formula">{powCream.formula} · {powCream.size}</p>
      <p>{powCream.description}</p>
      <div className="cream-purchase"><div><strong>${powCream.price}</strong><span>per {powCream.size} jar</span></div><button className="button primary" onClick={() => {
        try { onAdd(creamCartItem()); setAdded(true); setNotice("POW! Balm added to your test cart."); }
        catch { setNotice("Your cart could not be saved. Allow browser storage and try again."); }
      }}>Add balm to test cart <span aria-hidden="true">+</span></button></div>
      <div className="cream-links">{!detail && <a href="/shop/pow-cream">Explore POW! Balm →</a>}{added && <a href="/cart">View test cart →</a>}</div>
      <p className="cream-cart-notice" role="status" aria-live="polite">{notice || "2 oz jar · no payment is collected in this demo."}</p>
      {!compact && <details className="cream-details"><summary>Formula & product details</summary><p>POW! describes this as a patented Diphenhydramine + KP formula in a 2 oz jar. Patent documentation, ingredient concentrations, directions, and product evidence are pending. The intended benefits come from POW!’s product brief and have not been independently verified.</p><p>The image shows a proposed balm jar design. Final packaging and availability are still to be confirmed.</p></details>}
    </div>
    <figure className="cream-art"><Image src={powCream.image} alt="POW! Balm jar with a black lid, white cream, and a black, white, and lime Diphenhydramine + KP label marked 2 oz — packaging concept" width={1254} height={1254} sizes="(max-width: 850px) 88vw, 44vw" unoptimized/><figcaption>POW! BALM / 2 OZ JAR CONCEPT</figcaption></figure>
  </section>;
}
