# Product research pages

Revised October 3, 2026 following client feedback on scientific depth and customer benefit framing. All 38 product families now have individual educational profiles rather than a category-based narrative fallback. These are original prototype drafts awaiting scientific and POW product-label review.

## Reference and implementation

The initial open Chrome reference was [Peptide Plugs’ HALO product page](https://peptideplugs.com/product/halo60/). Its overview, component explanations, mechanism discussion, research context, specifications, and documentation structure informed the requested depth. No competitor prose, photographs, formulas, prices, lab results, purity numbers, storage instructions, or treatment claims were imported. HALO is not added to POW’s catalog. The revision also directly compared overlapping [retatrutide](https://peptideplugs.com/product/reta-glp3-rt-10mg/), [SS-31](https://peptideplugs.com/product/ss-31-10mg/), and [tesamorelin](https://peptideplugs.com/product/tesamorelin-10mg/) pages. Their specific target explanations and compound comparisons exposed the first draft’s overemphasis on general limitations. Competitor pages are structural references, not scientific authorities.

`app/product-benefits.ts` owns the customer introductions, headlines, two benefit-interest cards per product, evidence labels, and plain-language expectations. `app/product-research.ts` contains scientific evidence notes, FAQs, and 47 research/reference records. `app/product-science.ts` contains 38 explicit scientific profiles: factual summaries, labeled pathway diagrams, three explanatory chapters each, and contextual study findings. `app/ProductResearch.tsx` renders these records with citations adjacent to each chapter. Customer-focused introductions and evidence labels appear beside the purchase controls. A lime overview explains why someone would be interested in the product before the scientific facts and diagrams. `app/POWApp.tsx` retains the purchase controls and inventory-backed specification, with six section anchors. Product metadata uses the customer headline and evidence label. New styles preserve the established POW black/white/lime identity and collapse the research columns on smaller screens.

Each profile includes:

- A customer introduction, a potential-benefit overview, and nearby evidence context. Unconfirmed formulas and research supplies receive practical specification cards instead of invented benefit promises.
- Scientific facts and a labeled pathway or research-context diagram below the customer overview.
- Three explanatory chapters describing molecular identity, pathway biology, study methods, results, and meaningful compound comparisons.
- Dated study findings identifying human, animal, cell, mechanistic, or manufacturer evidence; numerical results retain population, comparator, time frame, and relevant adverse-event context.
- A plain-language benefit qualification plus the detailed scientific evidence note, FAQs, and a separate product-documentation section. Repeated boundary paragraphs and duplicate research accordions were removed.
- Direct primary-source links or explicitly identified official references, manufacturer data, and comparator labels.

KLOW and KLOW PRO intentionally have no attributed ingredient study: the supplied inventory does not identify their formulas. Their pages explain the precise missing specification instead. Other pending identities are qualified rather than silently inferred. The existing optional PepGuide links remain secondary educational resources; they are not claimed as reviewed primary evidence.

## Customer framing

Lead with the customer interest: weight management, skin renewal, recovery, sleep, desire, or the relevant practical role. Explain that interest in ordinary language before discussing receptors and molecules. Human findings retain their actual population and preparation; preclinical findings are described as potential research benefits rather than personal outcomes. Evidence labels appear beside the buying controls, and the overview includes a short “What this means for you” explanation. Negative and mixed results remain visible for oxytocin, VIP, thymosin alpha-1, and DSIP. KLOW, KLOW PRO, and Prime 191 GH retain identity-pending explanations. No invented testimonials, personal-result timelines, comparative efficacy rankings, or treatment promises were added.

The current revision retains the previously checked primary-source science. The PT-141 trial and NIH B12 reference were rechecked for the new plain-language summaries. Product-specific sources are included in the shared bibliography even when used only in the benefit overview.

## Scientific scope

This is a selected educational bibliography, not a systematic review or a statement of the latest regulatory/development status. A source year identifies the study milestone, not the compound’s current phase. No dosing, administration, stacking protocol, or consumer treatment recommendation is included. New primary-source research adds retatrutide discovery/structures, BPC-157 vascular signaling, tesamorelin liver-fat outcomes, SS-31 ischemia experiments, thymosin alpha-1 dendritic-cell work, and VIP signaling experiments. IUPHAR supplies explicitly labeled receptor-reference context for oxytocin. Original abstracts were checked through NCBI PubMed and its official EFetch API. Research diagrams are summaries of identified experimental contexts, not guaranteed human effects; the three metabolic blend ingredients are shown in parallel, not as a proven sequential pathway. Clinical evidence is scoped to the actual population and preparation; cell studies using human cells are labeled cell studies. Ingredient studies do not establish blend synergy. Mixed or negative results are included for DSIP, oxytocin, thymosin alpha-1, and VIP.

SNAP-8 uses the original Lipotec technical sheet, explicitly marked manufacturer data. B12 uses NIH’s official reference. Water and Prime 191 GH use official comparator medicine labels strictly for identity/context, not as POW specifications. Thymosin alpha-1’s TESTS paper has a published correction ([BMJ correction](https://www.bmj.com/content/389/bmj.r1098)); the page states the qualitative trial conclusion without reproducing the corrected numerical hazard ratio.

## Product records still needed

| Listing | Missing detail / interpretive limit |
| --- | --- |
| All products | Actual lot identifiers, approved COA files, laboratory, methods, dates, identity, measured content, relevant safety tests, excipients, physical form, storage/transport and stability instructions |
| BPC / TB-500 | Component amounts and exact TB-500 sequence; thymosin beta-4 papers are context only |
| NAD+ / MOTS-c / 5-Amino-1MQ | Individual quantities and chemical forms; preserve 120 mg supplied total |
| KLOW and KLOW PRO | Both component lists and amounts; definition of the PRO distinction |
| Selank / Semax | Individual quantities; preserve 20 mg total |
| CJC-1295 / Ipamorelin | CJC form, DAC status, and component amounts |
| Tesa / Ipa | Preserve confirmed 13 mg / 3 mg, 16 mg total; mixture quality and behavior still require evidence |
| Vitamin B12 | Exact cobalamin form |
| Cortexin | Preparation composition, biological source, manufacturing identity; existing catalog category does not establish a single sequence |
| Prime 191 GH | Exact protein, expression/formulation, activity reference and any justified IU-to-mass relationship; preserve 24 IU |
| Cartalax, Testagen, Vesugen, Chonluten, Vilon | Confirm POW sequence matches the sequence discussed in the literature |
| Bacteriostatic water | Preservative identity/concentration, sterility record and compatibility |
| NAD+ | Preserve supplied **1000 mcg**, without changing it to 1000 mg |

No quantities, prices, counts, bundle rules, hosting identities, integrations, dependencies, or approved brand assets changed. Product-page COA controls now link to the documentation section and label real files as pending instead of displaying a misleading “Current COA” badge and a fake lot identifier. The separate COA Vault remains the existing clearly labeled simulation.

## Review walkthrough

Open `/shop/reta-glp-3`, complete the existing email gate with a synthetic address, and use the section links to browse potential benefits first, then mechanisms, evidence, vial/testing record, questions, and sources. Native FAQ disclosures work without custom JavaScript. Reta’s supplied strength selection continues to update its price and specification.

Compare `/shop/ghk-cu`, `/shop/snap-8`, `/shop/dsip`, `/shop/tesamorelin-ipamorelin`, `/shop/cjc-1295-ipamorelin`, and `/shop/klow-pro` to see different evidence levels and formula states. External study links open separately; internal source links lead to the bibliography entry.

## Verification and delivery

Automated coverage renders every catalog product, checks section destinations and linked references, distinguishes pending formulas from cited profiles, and preserves key identity/quantity qualifications. Existing inventory and commerce tests remain in place. Checks and coverage limits are recorded in `PROJECT_STATUS.md` after completion. Automated HTML checks do not certify scientific accuracy or replace qualified review. The first version (`0a4da9f`) and science-depth revision (`a5543b5`) were pushed and deployed at the user’s request. The customer-benefit revision is local until a separate release instruction; the existing Vercel Git connection can trigger hosted builds on push.
