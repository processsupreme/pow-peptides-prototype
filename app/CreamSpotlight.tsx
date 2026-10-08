import Image from "next/image";

export default function CreamSpotlight() {
  return <section className="cream-spotlight" id="pow-cream" aria-labelledby="cream-title">
    <div className="cream-copy">
      <span className="impact-label">In the spotlight / product preview</span>
      <h2 id="cream-title">Meet<br/>POW! <em>cream.</em></h2>
      <p className="cream-formula">Benadryl + KPV</p>
      <p>POW! describes its cream as a patented formula to help with injection-site stinging, welts, and itching.</p>
      <p className="cream-review-note">Product brief from POW! Patent details and evidence for these uses are pending review; this preview does not establish safety or effectiveness.</p>
      <details className="cream-details"><summary>Product details & availability</summary><p>Product photos, final description, size, ingredient concentrations, directions, and price are still being confirmed. Ordering is not yet available.</p></details>
    </div>
    <div className="cream-art" aria-label="POW! cream brand preview; product photography pending">
      <span>POW! SPOTLIGHT / 01</span>
      <Image src="/brand-assets/svg/pow-logo-primary.svg" alt="POW!" width={300} height={125} unoptimized/>
      <b>CREAM</b><strong>BENADRYL + KPV</strong>
      <div className="cream-pending"><span>Product photography coming</span><span>Price to be confirmed</span></div>
    </div>
  </section>;
}
