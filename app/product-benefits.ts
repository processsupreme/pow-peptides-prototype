/** Customer-facing summaries. Benefits are scoped to the cited material and evidence. */
export type ProductBenefits = {
  headline: string;
  intro: string;
  benefits: [string, string][];
  evidenceLabel: string;
  evidenceNote: string;
  sources: string[];
};

export const productBenefits: Record<string, ProductBenefits> = {
  'superman': {
    headline: 'Weight management. A different angle on appetite.',
    intro: 'Weight management is about more than willpower. Retatrutide is being researched for its potential to influence appetite and how the body uses energy. Human trials have reported substantial weight loss, making this one of the catalog’s most closely studied weight-management compounds.',
    benefits: [
      ['Weight reduction', 'A human obesity trial found greater average weight loss with retatrutide than with placebo over 48 weeks. That is the clearest benefit demonstrated in the research featured here.'],
      ['Appetite & energy balance', 'Its three-target approach brings together signals involved in food intake and energy use. The appeal is a broader approach to weight regulation; the detailed research below explains what each target contributes.'],
    ],
    evidenceLabel: 'Human weight-loss trial',
    evidenceNote: 'The trial studied an investigational preparation in adults with obesity, not POW’s vial. Gastrointestinal side effects and heart-rate increases were reported; individual outcomes are not predictable.',
    sources: ['reta', 'retaDiscovery'],
  },
  'ghk-cu': {
    headline: 'The building blocks behind skin renewal.',
    intro: 'Firmer-looking skin and tissue renewal are the reasons GHK-Cu attracts attention. This copper peptide is studied for its effects on collagen and the surrounding material that gives skin its structure. The interest centers on skin structure, tissue remodeling, and the biology of renewal.',
    benefits: [
      ['Skin structure & firmness', 'Collagen helps give skin its strength and structure. GHK-Cu studies have measured increased collagen accumulation in animal tissue models, explaining the interest in skin-quality benefits.'],
      ['Tissue renewal', 'Repair also involves removing and replacing older structural material. Cell research suggests GHK-Cu influences that remodeling process, alongside the production of new matrix components.'],
    ],
    evidenceLabel: 'Cell & animal research',
    evidenceNote: 'These findings explain the skin-renewal potential. They do not demonstrate firmer skin, fewer wrinkles, or faster healing in people using this research vial.',
    sources: ['ghk', 'ghkMatrix'],
  },
  'bpc-tb-500': {
    headline: 'Why recovery research keeps coming back to repair.',
    intro: 'Getting back to movement is what makes tissue-repair research compelling. BPC-157 and thymosin-beta literature explore how cells respond to injury, move into damaged areas, and rebuild tissue. POW’s BPC / TB-500 brings those research interests together in one blend.',
    benefits: [
      ['Tendon & connective-tissue research', 'BPC-157 experiments examine tendon-cell responses and signals involved in blood-vessel formation. These are early steps toward understanding whether tissue recovery could be improved.'],
      ['Wound-repair research', 'Thymosin beta-4 studies have measured cell migration and wound closure in preclinical models. That work explains the repair interest, although POW’s exact TB-500 sequence still needs confirmation.'],
    ],
    evidenceLabel: 'Ingredient-level cell & animal research',
    evidenceNote: 'Faster injury recovery in people and added benefit from this combination have not been established by the cited studies. The component amounts remain unconfirmed.',
    sources: ['bpc', 'bpcVascular', 'tb'],
  },
  'bacteriostatic-water': {
    headline: 'The supporting supply in a research setup.',
    intro: 'A research setup depends on its supporting materials as well as its main compound. Bacteriostatic water is a preserved liquid diluent, supplied here as a 10 mL unit. Its role is practical: serving as a solvent where the laboratory method specifies a compatible preserved water.',
    benefits: [
      ['A laboratory solvent', 'Water provides the liquid medium for compatible research preparations. The method and compound determine whether this particular type of diluent is appropriate.'],
      ['Preservative function', 'Bacteriostatic describes inhibition of bacterial growth. The preservative specification matters when selecting a diluent; it does not make every preparation sterile or universally compatible.'],
    ],
    evidenceLabel: 'Research supply · no wellness benefit',
    evidenceNote: 'POW-specific preservative content, sterility records, and compatibility instructions are pending. This listing does not provide preparation or administration directions.',
    sources: ['water'],
  },
  tesamorelin: {
    headline: 'A closer look at deep abdominal fat.',
    intro: 'Not all belly fat is the same. Tesamorelin research focuses on visceral fat—the fat around internal organs—with human trials reporting reductions in a specific patient population. That makes body composition the central reason people explore this compound.',
    benefits: [
      ['Less visceral fat in studied patients', 'Trials in people with HIV-associated abdominal fat accumulation found reductions in visceral fat. This is a targeted body-composition finding, rather than a claim about all types of weight loss.'],
      ['Liver-fat research', 'A separate trial also measured a reduction in liver fat. This adds another research question beyond waist appearance: how fat stored in different parts of the body responds.'],
    ],
    evidenceLabel: 'Human trials · specific patient population',
    evidenceNote: 'Results in people with HIV-associated fat accumulation cannot be assumed for general fat loss or POW’s vial. Glucose changes were also monitored in the research.',
    sources: ['tesa', 'tesaLiver'],
  },
  'snap-8': {
    headline: 'Expression lines are the focus.',
    intro: 'Smile lines and other expression-related wrinkles are what put SNAP-8 on the cosmetic research map. It was developed around the idea of influencing the signals involved in facial muscle contraction. The benefit being explored is smoother-looking skin in a topical formulation.',
    benefits: [
      ['Smoother-looking expression lines', 'The manufacturer’s cosmetic research examined wrinkle appearance in a cream evaluation. That is the relevant beauty benefit, rather than a broad claim about reversing skin aging.'],
      ['A targeted cosmetic approach', 'SNAP-8’s proposed action relates to the signaling behind repeated muscle movement. It addresses a different research question from collagen-focused ingredients such as GHK-Cu.'],
    ],
    evidenceLabel: 'Manufacturer data · topical cream',
    evidenceNote: 'The small cream study does not establish results for POW’s research vial or equivalence to a cosmetic procedure. It provides no evidence for injectable use.',
    sources: ['snap'],
  },
  'nad-mots-c-5-amino-1mq': {
    headline: 'Three angles on cellular energy and metabolism.',
    intro: 'Cellular energy and the way the body handles fuel are the themes behind this blend. NAD+, MOTS-c, and 5-Amino-1MQ each approach those questions differently: energy chemistry, metabolic signaling, and an enzyme linked to fat-cell metabolism.',
    benefits: [
      ['Energy at the cellular level', 'NAD+ participates in energy-related reactions, while MOTS-c studies examine how cells adapt to metabolic stress. Their appeal centers on understanding efficient fuel use and cellular resilience.'],
      ['Fat-metabolism research', '5-Amino-1MQ research has measured changes in fat-cell metabolism and body weight in obese mice. Those findings explain the body-composition interest in this ingredient.'],
    ],
    evidenceLabel: 'Separate ingredient studies · blend untested',
    evidenceNote: 'The sources do not show that this blend improves daily energy or causes weight loss in people. Component amounts and combined effects remain unconfirmed.',
    sources: ['nad', 'mots', 'nnmt'],
  },
  'ss-31': {
    headline: 'Energy research starts inside the cell.',
    intro: 'SS-31 is explored for its potential to help mitochondria—the cell’s energy-producing structures—function under stress. The central interest is preserving the machinery that makes usable energy, which is why this compound appears in discussions of cellular performance and resilience.',
    benefits: [
      ['Cellular energy production', 'Laboratory studies have measured improvements in mitochondrial respiration and ATP-related activity. ATP is the usable energy cells rely on to do their work.'],
      ['Resilience under stress', 'Animal injury models have examined whether SS-31 helps preserve mitochondrial structure and recover energy production. This is the foundation of its cellular-protection research.'],
    ],
    evidenceLabel: 'Mechanistic & animal evidence featured',
    evidenceNote: 'These studies do not demonstrate an everyday energy boost, improved workouts, or reduced fatigue from POW’s vial.',
    sources: ['ss31', 'ssIschemia'],
  },
  'vitamin-b12': {
    headline: 'An essential nutrient behind everyday function.',
    intro: 'Healthy nerves, red blood cells, and normal metabolism all depend on vitamin B12. Its connection to low energy matters most when B12 is deficient. Understanding that starting point makes the difference between correcting a nutritional problem and expecting an extra boost.',
    benefits: [
      ['Healthy nerves & blood cells', 'B12 is required for normal nervous-system function and healthy red blood cell formation. These are established roles of the nutrient, not speculative peptide benefits.'],
      ['Deficiency-related fatigue', 'B12 deficiency can contribute to tiredness and weakness. Correcting a confirmed deficiency addresses a different problem from trying to increase energy when B12 status is already adequate.'],
    ],
    evidenceLabel: 'Established nutrient roles',
    evidenceNote: 'Extra B12 has not been shown to improve energy or endurance in people with adequate status. POW’s cobalamin form and product specification still need confirmation.',
    sources: ['b12'],
  },
  cartalax: {
    headline: 'Cartilage is where the joint-health question begins.',
    intro: 'Maintaining comfortable movement makes cartilage research relevant to everyday life. Cartalax is associated with AED, a short peptide studied for its effects on cells developing cartilage-related characteristics. Its potential lies in early research on the tissue that helps joints work smoothly.',
    benefits: [
      ['Cartilage-building research', 'Cell experiments have measured increases in markers associated with cartilage formation. Those findings give researchers a way to explore how cartilage-producing cells develop.'],
      ['Aging-cell function', 'The research also examines how those responses change as cells age. The longer-term question is whether useful tissue-building functions can be preserved.'],
    ],
    evidenceLabel: 'Cell research · human benefit unproven',
    evidenceNote: 'Cartilage markers do not show pain relief, improved mobility, or cartilage regrowth in people. POW’s exact sequence also remains to be confirmed.',
    sources: ['cartalax', 'shortPeptides'],
  },
  epitalon: {
    headline: 'Healthy-aging interest, down to the cell.',
    intro: 'Epitalon draws interest from a big question: can the way cells age be influenced? Its early research examines telomeres, the protective ends of chromosomes, and the enzyme that maintains them. This is the cellular foundation behind its longevity reputation.',
    benefits: [
      ['Cellular aging research', 'Studies in cultured cells have reported changes in telomerase activity and telomere length. These measures help researchers investigate one aspect of cellular aging.'],
      ['Long-term cell maintenance', 'The potential being explored is preservation of cellular function over time. That is why Epitalon appears in healthy-aging discussions, even though a longer human lifespan has not been demonstrated here.'],
    ],
    evidenceLabel: 'Cell research · longevity unproven',
    evidenceNote: 'The cited findings do not establish age reversal, a younger appearance, or longer life in people.',
    sources: ['epitalon'],
  },
  'foxo4-dri': {
    headline: 'Aging research with a focus on worn-out cells.',
    intro: 'FOXO4-DRI explores whether removing certain senescent cells—cells that have stopped dividing but remain active—can improve tissue function. Its appeal lies in the possibility of changing the cellular environment that contributes to age-related decline.',
    benefits: [
      ['Senescent-cell clearance', 'Preclinical work investigates selectively eliminating some senescent cells. This approach aims at a specific feature of aging biology rather than masking a visible sign of aging.'],
      ['Tissue-function research', 'Mouse experiments measured changes in physical condition and kidney-related function. These are early findings behind interest in healthier aging, not established human outcomes.'],
    ],
    evidenceLabel: 'Experimental cell & animal research',
    evidenceNote: 'Human rejuvenation benefits and an acceptable human risk profile are not established by these studies.',
    sources: ['foxo'],
  },
  'igf-1-lr3': {
    headline: 'The growth signals behind tissue development.',
    intro: 'Muscle growth and recovery are why many people first encounter IGF-1 LR3. The research featured here goes back to the underlying question: how growth signals influence cells. LR3 is a modified IGF-1 analogue studied for a different interaction with proteins that regulate those signals.',
    benefits: [
      ['Cell-growth research', 'IGF-related signaling is involved in growth responses. Laboratory comparisons examine how LR3 changes cell activity relative to native IGF-1.'],
      ['Growth-factor availability', 'LR3 interacts differently with IGF-binding proteins. Researchers study that distinction because it can change how much growth signal is available to cells.'],
    ],
    evidenceLabel: 'Cell research · muscle benefit unproven',
    evidenceNote: 'The cited fibroblast study does not demonstrate muscle gain, improved strength, or faster workout recovery in people.',
    sources: ['igf'],
  },
  klow: {
    headline: 'Get to know KLOW.',
    intro: 'KLOW is POW’s 80 mg research blend. To explain what makes it useful and how it compares with other blends, we need its confirmed ingredient list. That formula is the missing piece in its benefit story.',
    benefits: [
      ['80 mg total blend', 'The supplied catalog confirms the total quantity per unit. The amount of each ingredient is still awaiting confirmation.'],
      ['Compare with KLOW PRO', 'KLOW and KLOW PRO are separate listings. Their shared total strength does not tell us whether the ingredients or intended research focus are the same.'],
    ],
    evidenceLabel: 'Formula pending',
    evidenceNote: 'Benefits will be described once POW confirms the ingredients. No repair, skin, or other outcome is attributed to an unknown formula.',
    sources: [],
  },
  'klow-pro': {
    headline: 'Meet KLOW PRO.',
    intro: 'KLOW PRO is a separate 80 mg blend in the POW lineup. Its name distinguishes it from KLOW; the confirmed formula will explain the meaningful difference. Ingredient details are needed before we can give you a useful benefit comparison.',
    benefits: [
      ['A separate blend listing', 'KLOW PRO has its own catalog entry and supplied price. It should be compared as a distinct product, even though the total quantity matches KLOW.'],
      ['The formula makes the difference', 'Ingredients and their amounts determine which research applies. Those details, including what distinguishes the PRO formula, are pending.'],
    ],
    evidenceLabel: 'Formula pending',
    evidenceNote: 'PRO does not establish stronger effects or superior results. POW’s formula is needed before assigning potential benefits.',
    sources: [],
  },
  'melanotan-ii': {
    headline: 'Pigmentation is the research focus.',
    intro: 'Skin pigmentation is the main reason Melanotan II attracts attention. Early human research observed pigment changes after exposure to this melanocortin peptide. That finding explains the tanning interest, but it does not establish a safe way to tan.',
    benefits: [
      ['Pigment-response research', 'An early, very small human study observed increased pigmentation in some participants. This is the direct appearance-related finding in the research featured here.'],
      ['Understanding skin signaling', 'Melanotan II acts within a signaling system involved in pigmentation and other body responses. Researchers examine those wider effects alongside changes in skin color.'],
    ],
    evidenceLabel: 'Very small early human study',
    evidenceNote: 'The pilot reported other effects as well. Darker pigmentation does not establish UV protection or safety, and no consumer tanning benefit is established for this vial.',
    sources: ['mt2'],
  },
  'nad-plus': {
    headline: 'An essential part of cellular energy.',
    intro: 'NAD+ helps cells carry out the reactions that turn fuel into usable energy. That essential role explains the interest in energy, vitality, and healthy aging. The key distinction is between what NAD+ naturally does in the body and what adding more has been shown to improve.',
    benefits: [
      ['Energy metabolism', 'NAD+ helps transfer electrons during metabolic reactions. It is part of the machinery cells use to process fuel, rather than a stimulant.'],
      ['Cellular maintenance research', 'Researchers study how NAD+ is used, replenished, and broken down. Understanding that turnover helps frame questions about cellular function as conditions change.'],
    ],
    evidenceLabel: 'Established biology · limited human study here',
    evidenceNote: 'The featured human pilot measured NAD+ and related metabolites, not improved fatigue, cognition, or longevity. POW’s supplied quantity remains 1000 mcg.',
    sources: ['nad'],
  },
  oxytocin: {
    headline: 'Connection and social behavior, explored.',
    intro: 'Feeling connected is what makes oxytocin research so compelling. This hormone is involved in social and reproductive biology, and researchers have examined whether it can influence social behavior. The results are more varied than the familiar “bonding hormone” nickname suggests.',
    benefits: [
      ['Social-response research', 'Studies explore whether oxytocin changes social behavior in defined situations and populations. The potential interest is connection; the outcome depends on much more than one hormone.'],
      ['A clearer view of the evidence', 'A large trial in children and adolescents with autism found no significant social-function benefit. Knowing that helps separate an appealing idea from a demonstrated result.'],
    ],
    evidenceLabel: 'Human evidence includes a negative trial',
    evidenceNote: 'More trust, stronger bonding, or better relationships cannot be promised from this product.',
    sources: ['oxy', 'oxyReceptor'],
  },
  'pt-141': {
    headline: 'Sexual desire is the central question.',
    intro: 'Low desire can affect more than the bedroom. PT-141, also known as bremelanotide, has been studied for improving sexual desire and reducing the distress associated with low desire. Human trials provide a concrete benefit story in a defined group of women.',
    benefits: [
      ['Improved desire in studied women', 'Two trials found improved sexual-desire scores in premenopausal women with hypoactive sexual desire disorder compared with placebo.'],
      ['Less distress about low desire', 'The same trials reported reduced distress related to low sexual desire. That emotional dimension is a separate, meaningful outcome alongside desire itself.'],
    ],
    evidenceLabel: 'Human trials · defined female population',
    evidenceNote: 'Nausea, flushing, and headache were more common with treatment. Findings do not apply to everyone or establish that POW’s vial matches the studied medicine.',
    sources: ['pt'],
  },
  'selank-semax': {
    headline: 'Calm and focus: two research questions.',
    intro: 'A calmer mind and clearer focus are the interests behind the Selank / Semax pairing. Selank research explores inhibitory signaling; Semax research examines signals involved in nerve-cell function. This blend brings together two research directions, with combined benefits still to be established.',
    benefits: [
      ['Calm-related signaling', 'Selank’s interaction with GABA-related signaling explains interest in how it might influence the nervous system’s response to stimulation. The featured evidence is preclinical.'],
      ['Brain-function research', 'Semax studies examine molecules involved in nerve-cell maintenance and response. They provide a biological starting point for cognitive research, rather than a measured focus benefit in people.'],
    ],
    evidenceLabel: 'Preclinical ingredient studies · blend untested',
    evidenceNote: 'The cited studies do not demonstrate anxiety relief, better focus, or an added effect from combining the ingredients. The blend ratio remains unconfirmed.',
    sources: ['selank', 'semax'],
  },
  selank: {
    headline: 'The research interest behind a calmer mind.',
    intro: 'Calmness is the benefit people often want to understand when exploring Selank. Its research examines GABA-related signaling, part of the nervous system’s inhibitory activity. That gives the interest a biological basis, while leaving the question of reliable human effects open.',
    benefits: [
      ['Calm-related research', 'GABA helps regulate inhibitory signaling in the nervous system. Selank experiments investigate how the peptide influences receptor interactions within that system.'],
      ['A distinct neurobiology focus', 'Selank’s featured research concentrates on GABA-related interactions. This differs from Semax’s nerve-cell signaling research and helps explain why the two are discussed separately.'],
    ],
    evidenceLabel: 'Preclinical evidence featured',
    evidenceNote: 'The receptor study does not demonstrate anxiety relief, better mood, or predictable calming effects in people using this vial.',
    sources: ['selank'],
  },
  semax: {
    headline: 'Focus and memory are the bigger questions.',
    intro: 'Sharper thinking is the appeal behind much of the interest in Semax. The research featured here looks at signals that help nerve cells function and respond to their environment. Those findings explain the cognitive research interest, without treating a molecular change as a proven mental edge.',
    benefits: [
      ['Brain-function research', 'Animal studies examine changes in NGF and BDNF, molecules involved in nerve-cell biology. These are part of the scientific foundation for investigating cognitive effects.'],
      ['Nerve-cell response', 'Researchers have measured different responses across brain regions and time points. This helps explore where and how the compound acts, before drawing conclusions about memory or attention.'],
    ],
    evidenceLabel: 'Animal evidence featured',
    evidenceNote: 'The cited study does not establish better focus, faster learning, or improved memory in people.',
    sources: ['semax'],
  },
  sermorelin: {
    headline: 'Exploring the body’s growth-hormone signal.',
    intro: 'Body composition and recovery are common reasons people look into growth-hormone research. Sermorelin is studied for stimulating the body’s release of growth hormone. The human evidence featured here concerns children with GH deficiency, so adult wellness benefits remain a separate question.',
    benefits: [
      ['Growth-hormone release', 'Sermorelin acts upstream of growth hormone, as a releasing signal. Researchers investigate the body’s response to that signal rather than treating it as growth hormone itself.'],
      ['Growth in a defined patient group', 'A study in children with growth-hormone deficiency measured increased growth velocity. That is a specific clinical outcome, not evidence of adult muscle gain or rejuvenation.'],
    ],
    evidenceLabel: 'Human pediatric evidence featured',
    evidenceNote: 'The cited study does not show improved adult recovery, sleep, body composition, or anti-aging outcomes from POW’s vial.',
    sources: ['sermorelin'],
  },
  'tesamorelin-ipamorelin': {
    headline: 'Body-composition research meets GH signaling.',
    intro: 'Tesa / Ipa pairs tesamorelin’s body-composition research with ipamorelin’s growth-hormone-release research. POW’s supplied blend contains 13 mg tesamorelin plus 3 mg ipamorelin. The interest is clear; whether pairing them improves outcomes remains a research question.',
    benefits: [
      ['Visceral-fat research', 'Tesamorelin alone has human trial evidence for reducing visceral fat in people with HIV-associated abdominal fat accumulation. This is the blend’s most concrete ingredient-level benefit story.'],
      ['Two GH-release pathways', 'The components are studied through different routes involved in growth-hormone release. That creates a research rationale for the pairing, but it does not establish stronger or more reliable results.'],
    ],
    evidenceLabel: 'Ingredient evidence · no blend trial here',
    evidenceNote: 'Single-ingredient findings cannot establish fat loss, muscle growth, or recovery benefits for this mixture. The supplied 13 mg / 3 mg split describes contents only.',
    sources: ['tesa', 'ipa'],
  },
  testagen: {
    headline: 'Look beyond the name when exploring hormone research.',
    intro: 'If you are exploring Testagen for testosterone or vitality, the useful starting point is what has actually been measured. The featured research examines a short peptide’s interactions with cells and DNA. It does not yet provide a human testosterone benefit story.',
    benefits: [
      ['Cellular signaling research', 'The associated KEDG sequence has been studied for cell entry and interactions with DNA models. These are early clues about biological activity.'],
      ['Hormone benefits remain a question', 'The available source does not measure improvements in testosterone, energy, or fertility. Those outcomes need direct studies rather than inference from the product name.'],
    ],
    evidenceLabel: 'Cell research · hormone benefit unproven',
    evidenceNote: 'POW’s sequence needs confirmation, and no testosterone-boosting claim is established for this vial.',
    sources: ['testagen'],
  },
  'thymosin-alpha-1': {
    headline: 'Immune balance is more complex than a boost.',
    intro: 'A well-functioning immune response is the interest behind thymosin alpha-1. Researchers study how it influences immune-cell communication and responses to illness. The goal is appropriate immune activity, not simply turning every response up.',
    benefits: [
      ['Immune-response research', 'Cell studies examine how thymosin alpha-1 influences cells that help coordinate immune responses. This provides a basis for studying its potential in specific disease settings.'],
      ['Condition-specific outcomes', 'Human trials ask whether those immune effects translate into meaningful benefits during illness. Results vary; the large sepsis trial featured here did not show a survival benefit.'],
    ],
    evidenceLabel: 'Cell research & mixed clinical evidence',
    evidenceNote: 'These studies do not establish fewer infections, general immune strengthening, or faster recovery from illness with POW’s vial.',
    sources: ['ta1Cell', 'ta1'],
  },
  vesugen: {
    headline: 'Healthy aging, examined through cell behavior.',
    intro: 'Vesugen is associated with KED, a short peptide explored in aging-cell research. Its interest lies in whether small signals can influence how cells respond as they age. The featured evidence measures cell-level changes rather than improvements in circulation or everyday function.',
    benefits: [
      ['Aging-cell research', 'Laboratory studies compare how KED affects regulatory signals in aging cell cultures. These signals help researchers understand changes in cellular function.'],
      ['Sequence-specific responses', 'Different short peptides produce different responses in the same research area. Studying those differences is a step toward identifying which effects might eventually matter for health.'],
    ],
    evidenceLabel: 'Cell evidence only in this profile',
    evidenceNote: 'Improved circulation, vascular health, or human longevity has not been demonstrated by the cited study. POW’s sequence remains unconfirmed.',
    sources: ['shortPeptides'],
  },
  vip: {
    headline: 'Breathing and inflammation are research interests.',
    intro: 'VIP is explored for its role in signals involved in respiratory and inflammatory responses. The appeal is the possibility of influencing how tissues respond during illness. Human research shows why that potential needs to be judged by actual patient outcomes.',
    benefits: [
      ['Respiratory-response research', 'VIP-related preparations have been investigated in serious respiratory illness. Researchers ask whether changing signaling can translate into better recovery.'],
      ['Cell-signaling research', 'Mechanistic studies examine how VIP communicates with cells. They explain biological activity, while clinical studies determine whether that activity produces a meaningful benefit.'],
    ],
    evidenceLabel: 'Mechanistic evidence & a negative human trial',
    evidenceNote: 'The featured aviptadil trial did not improve the measured clinical outcome. Easier breathing or improved lung health cannot be promised from POW’s vial.',
    sources: ['vipCell', 'vip'],
  },
  'kisspeptin-10': {
    headline: 'The upstream signals behind reproductive hormones.',
    intro: 'Hormonal and reproductive health are the reasons kisspeptin-10 draws interest. It acts early in the signaling chain that regulates reproductive hormones. Small human physiology studies have measured hormone responses, offering a concrete starting point for further research.',
    benefits: [
      ['Reproductive-hormone signaling', 'Human research has measured increases in luteinizing-hormone secretion after kisspeptin-10 exposure. LH helps regulate downstream reproductive hormone activity.'],
      ['Understanding hormone rhythms', 'Researchers also examine the timing and pattern of hormone release. This matters because a healthy endocrine system depends on coordinated signals, not just a higher single reading.'],
    ],
    evidenceLabel: 'Small human physiology studies',
    evidenceNote: 'A hormone response does not establish improved fertility, libido, or lasting hormone balance. The studied preparation is distinct from POW’s vial.',
    sources: ['kiss'],
  },
  ipamorelin: {
    headline: 'Growth-hormone release is the starting point.',
    intro: 'Recovery and body composition are often what bring people to ipamorelin. Its research explores stimulating growth-hormone release through a specific signaling pathway. That makes it a useful research subject, while the everyday benefits people ask about require their own evidence.',
    benefits: [
      ['GH-release research', 'Early studies measured a growth-hormone response to ipamorelin. This explains its classification as a secretagogue—a compound that stimulates release.'],
      ['Selective signaling', 'Preclinical comparisons examined GH release alongside other hormone responses. That helps describe the pathway, but selectivity alone does not establish better results or fewer risks in people.'],
    ],
    evidenceLabel: 'Preclinical pharmacology featured',
    evidenceNote: 'The cited study does not establish muscle gain, fat loss, improved sleep, or faster recovery from POW’s vial.',
    sources: ['ipa'],
  },
  cortexin: {
    headline: 'Brain function and neurological recovery, explored.',
    intro: 'Cortexin research asks whether a brain-derived peptide preparation can influence neurological function and recovery. That is the potential benefit behind the name. Because it is a preparation rather than one clearly defined molecule, its composition is essential to understanding which findings apply.',
    benefits: [
      ['Neurological-recovery research', 'Clinical literature includes investigation after ischemic stroke. Those condition-specific outcomes are different from claims about sharpening a healthy person’s memory or concentration.'],
      ['Brain-function models', 'Animal research examines behavior and tissue changes with specific polypeptide preparations. It helps explore possible effects and guide more focused questions.'],
    ],
    evidenceLabel: 'Preparation-specific human & animal studies',
    evidenceNote: 'The composition and source of POW material are pending. The cited preparations do not establish cognitive or recovery benefits for this vial.',
    sources: ['cortexin', 'cortexinIdentity'],
  },
  chonluten: {
    headline: 'Inflammatory responses, examined at the cell level.',
    intro: 'Chonluten is explored in research on how immune cells behave. The potential interest is influencing the cellular responses involved in inflammation. The featured work is an early laboratory step, rather than evidence that it improves breathing or treats a lung condition.',
    benefits: [
      ['Immune-cell behavior', 'Experiments examine the activity of cells used to model monocytes and macrophages, both important parts of the immune response.'],
      ['Inflammation-related research', 'Changes in cell behavior help researchers investigate how short peptides might influence inflammatory processes. A useful clinical effect still needs to be shown separately.'],
    ],
    evidenceLabel: 'Cell research',
    evidenceNote: 'The cited work does not demonstrate symptom relief, improved respiratory health, or human benefits from POW’s vial.',
    sources: ['chonluten'],
  },
  dsip: {
    headline: 'Better sleep is the question worth asking.',
    intro: 'Falling asleep more easily and sleeping more efficiently are the potential benefits investigated with DSIP. Unlike a sleep claim based only on a mechanism, its research includes small human trials. Their mixed results are central to understanding what to expect.',
    benefits: [
      ['Time to fall asleep', 'Older studies examined sleep latency—how long it takes to fall asleep. Some findings were favorable, but the small studies did not produce a consistent benefit story.'],
      ['Sleep efficiency', 'Researchers also measured how much time in bed was spent asleep. Objective changes did not consistently match participants feeling that they slept better.'],
    ],
    evidenceLabel: 'Small human trials · mixed results',
    evidenceNote: 'The research does not establish reliable insomnia relief, deeper sleep, or a more refreshed morning from POW’s vial.',
    sources: ['dsip', 'dsipEarlier'],
  },
  'mots-c': {
    headline: 'How cells adapt to fuel and stress.',
    intro: 'Metabolic flexibility—the ability to respond to changing energy demands—is the idea that makes MOTS-c interesting. This mitochondrial-derived peptide is studied for its role in metabolic signals, including glucose handling and cellular responses to stress.',
    benefits: [
      ['Metabolic-response research', 'Cell and animal studies investigate how MOTS-c influences fuel-related pathways and insulin sensitivity. These findings explain interest in metabolic health.'],
      ['Cellular resilience', 'Research also examines how MOTS-c helps coordinate cellular responses during metabolic stress. This is an early foundation for exploring how cells adapt to changing conditions.'],
    ],
    evidenceLabel: 'Cell & animal studies',
    evidenceNote: 'The cited work does not demonstrate weight loss, greater endurance, or improved daily energy in people using POW’s vial.',
    sources: ['mots', 'motsNucleus'],
  },
  'aod-9604': {
    headline: 'Fat metabolism is the research target.',
    intro: 'AOD-9604 attracts interest for its potential effects on fat metabolism. Researchers have examined whether a modified growth-hormone fragment can influence fat-related processes separately from the full hormone. The featured evidence comes from animal models.',
    benefits: [
      ['Fat-use research', 'Animal experiments have examined fat oxidation—using fat as fuel—and related metabolic responses. These are the findings behind its fat-loss research reputation.'],
      ['Body-weight research', 'Obese-mouse studies also measured weight responses under experimental conditions. The results help generate hypotheses for further study, rather than predict a human body-composition result.'],
    ],
    evidenceLabel: 'Animal evidence featured',
    evidenceNote: 'The cited study does not demonstrate human fat loss or show that this research vial reduces belly fat.',
    sources: ['aod'],
  },
  'cjc-1295-ipamorelin': {
    headline: 'Two approaches to growth-hormone signaling.',
    intro: 'Body composition and recovery are the benefits people often ask about when exploring CJC-1295 / Ipamorelin. The research rationale centers on two different ways of stimulating growth-hormone release. Demonstrating that signal is an earlier step than demonstrating those everyday benefits.',
    benefits: [
      ['GH-release research', 'Human research on a long-acting form of CJC-1295 measured increases in GH and IGF-1. POW’s precise CJC form must be confirmed before applying those findings.'],
      ['A second signaling route', 'Ipamorelin has a separate preclinical GH-release research record. Pairing the names explains the scientific interest, but does not establish a stronger response or better outcomes from the blend.'],
    ],
    evidenceLabel: 'Ingredient studies · CJC form pending',
    evidenceNote: 'The cited sources do not establish muscle gain, fat loss, better sleep, or recovery benefits for this mixture. Component quantities and DAC status remain unconfirmed.',
    sources: ['cjc', 'ipa'],
  },
  'batman': {
    headline: 'Know the material behind the label.',
    intro: 'Growth, body composition, and recovery are the reasons people explore GH-related products. Batman is POW’s 24 IU research listing, but its molecular identity has not been confirmed. That specification is necessary before explaining which growth-hormone findings apply.',
    benefits: [
      ['GH-related research interest', 'Growth hormone has defined biological roles, but a name alone cannot establish that this listing contains the same material as a studied somatropin preparation.'],
      ['A product-specific comparison', 'The useful next details are the sequence, activity standard, and formulation. Those facts allow a meaningful comparison without inventing a conversion or borrowing another product’s benefits.'],
    ],
    evidenceLabel: 'Product identity pending',
    evidenceNote: 'No muscle, recovery, fat-loss, or anti-aging benefit is assigned to this unconfirmed material.',
    sources: ['gh'],
  },
  vilon: {
    headline: 'A small peptide in the healthy-aging conversation.',
    intro: 'Vilon research explores whether a very short peptide can influence how aging cells function. The featured studies examine how DNA is organized and how cellular signals change. Those are early clues behind its healthy-aging interest, rather than demonstrated improvements in how a person feels.',
    benefits: [
      ['Cellular aging research', 'Experiments in cultured cells examine changes associated with aging. Researchers use these models to investigate whether some aspects of cell function can be influenced.'],
      ['Gene-access research', 'Vilon-related work has examined chromatin, the way DNA is packaged inside cells. Changes in that packaging can affect access to genetic information, which makes it a useful research endpoint.'],
    ],
    evidenceLabel: 'Cell evidence featured',
    evidenceNote: 'The cited studies do not establish rejuvenation, stronger immunity, or a longer human lifespan. POW’s sequence still needs confirmation.',
    sources: ['vilon', 'shortPeptides'],
  },
};
