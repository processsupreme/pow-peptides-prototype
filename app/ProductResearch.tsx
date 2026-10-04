import { productResearch, researchSources } from "./product-research";
import { productScience } from "./product-science";
import { productBenefits } from "./product-benefits";

export function researchSourceIds(slug: string) {
  const science = productScience[slug];
  return [...new Set([...productBenefits[slug].sources, ...science.chapters.flatMap(item => item.sources), ...science.studies.map(([source]) => source)])];
}

function SourceLinks({ ids }: { ids: string[] }) {
  return ids.length ? <p className="chapter-sources">Sources: {ids.map((id, index) => <a key={id} href={`#source-${id}`}>{index > 0 ? " · " : ""}{researchSources[id].title} ({researchSources[id].year}) ↗</a>)}</p> : null;
}

export function ResearchNavigation() {
  return <nav className="research-nav" aria-label="Product research sections"><span>GET TO KNOW IT</span>{[["overview", "Potential benefits"], ["mechanisms", "How it works"], ["evidence", "Study findings"], ["specifications", "Vial & testing"], ["questions", "Questions"], ["sources", "Sources"]].map(([id, label]) => <a key={id} href={`#${id}`}>{label} <span aria-hidden="true">↘</span></a>)}</nav>;
}

export function ProductBenefitsOverview({ slug }: { slug: string }) {
  const profile = productBenefits[slug];
  const pending = ["klow", "klow-pro", "prime-191-gh"].includes(slug);
  const supply = slug === "bacteriostatic-water";
  return <section id="overview" className="product-story benefit-story research-anchor" aria-labelledby="benefit-heading">
    <header className="story-lead"><span>01 / {pending ? "GET TO KNOW IT" : supply ? "THE PRACTICAL ROLE" : "WHY PEOPLE EXPLORE IT"}</span><h2 id="benefit-heading">{profile.headline}</h2><p>{pending ? "The confirmed details, and what is still needed to explain the benefits." : supply ? "What this supporting material contributes to a compatible research setup." : "The potential benefits that drive interest, and what the evidence means for you."}</p></header>
    <div className="benefit-grid">{profile.benefits.map(([title, body], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    <aside className="benefit-evidence" aria-label="Benefit evidence"><div><span>{profile.evidenceLabel}</span><h3>What this means for you</h3></div><div><p>{profile.evidenceNote}</p>{profile.sources.length > 0 && <a href="#evidence">See the study findings ↗</a>}</div></aside>
  </section>;
}

function ResearchFacts({ slug }: { slug: string }) {
  const science = productScience[slug];
  return <><dl className="science-facts" aria-label="Research profile">{science.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className="science-pathway"><span>{science.pathwayLabel}</span><ol aria-label="Research pathway">{science.pathway.map((step, index) => <li key={step}><small>0{index + 1}</small><b>{step}</b>{science.pathwayKind !== "parallel" && index < science.pathway.length - 1 && <i aria-hidden="true">→</i>}</li>)}</ol></div><p className="science-map-note">Scientific context describes the material in the cited literature. Vial contents and documentation are listed separately below.</p><SourceLinks ids={researchSourceIds(slug)}/></>;
}

export default function ProductResearch({ slug }: { slug: string }) {
  const profile = productResearch[slug];
  const science = productScience[slug];
  return <div className="research-expansion">
    <section id="mechanisms" className="mechanism-section research-anchor" aria-labelledby="mechanism-heading"><header className="research-section-heading"><span>02 / THE SCIENCE BEHIND THE INTEREST</span><h2 id="mechanism-heading">How it works.</h2><p>For the deeper dive: the pathways, experiments, and details behind the overview.</p></header><div className="science-overview"><ResearchFacts slug={slug}/></div><div className="science-chapters">{science.chapters.map(({ title, body, sources }, index) => <article key={title}><div className="science-chapter-title"><span>0{index + 1}</span><h3>{title}</h3></div><div><p>{body}</p><SourceLinks ids={sources}/></div></article>)}</div></section>
    <section id="evidence" className="evidence-section research-anchor" aria-labelledby="evidence-heading"><header className="research-section-heading"><span>03 / STUDY FINDINGS</span><h2 id="evidence-heading">What the research found.</h2><p>Results are shown with the study model and context.</p></header><div className="evidence-list">{science.studies.length ? science.studies.map(([source, finding]) => <article key={source}><div className="evidence-meta"><span>{researchSources[source].kind}</span><b>{researchSources[source].year}</b></div><div><h3>{researchSources[source].title}</h3><p>{finding}</p><a href={researchSources[source].url} target="_blank" rel="noreferrer">Read the source <span aria-hidden="true">↗</span></a></div></article>) : <article><div className="evidence-meta"><span>Formula pending</span></div><div><h3>Ingredient references await the formula.</h3><p>POW has supplied the total blend quantity. Ingredient-specific research will follow the confirmed component list.</p></div></article>}</div><aside className="evidence-boundary"><b>Evidence &amp; regulatory boundary</b><p>{profile.boundary}</p></aside></section>
  </div>;
}

export function ResearchReading({ slug }: { slug: string }) {
  const profile = productResearch[slug];
  const sourceIds = researchSourceIds(slug);
  return <div className="research-reading"><section id="questions" className="research-anchor research-faq" aria-labelledby="questions-heading"><header className="research-section-heading"><span>05 / USEFUL DISTINCTIONS</span><h2 id="questions-heading">Questions, answered.</h2></header>{profile.questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</section><section id="sources" className="research-anchor research-sources" aria-labelledby="sources-heading"><header className="research-section-heading"><span>06 / FOLLOW THE SOURCE</span><h2 id="sources-heading">Keep reading.</h2><p>Selected studies and reference material supporting this profile.</p></header>{sourceIds.length ? <ol>{sourceIds.map(id => <li key={id} id={`source-${id}`} className="research-anchor"><span>{researchSources[id].kind} · {researchSources[id].year}</span><a href={researchSources[id].url} target="_blank" rel="noreferrer">{researchSources[id].title} ↗</a></li>)}</ol> : <p>Product-specific references will follow confirmation of the formula. Current specification authority: POW’s supplied inventory.</p>}<p className="research-editorial-note">Original POW educational draft · selected literature, not a systematic review · scientific and product-label review pending.</p></section></div>;
}
