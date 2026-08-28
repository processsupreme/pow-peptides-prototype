export type Product = {
  slug: string;
  name: string;
  aliases: string[];
  strength: string;
  price: number;
  category: string;
  format: "Single compound" | "Blend" | "Research supply";
  inStock: boolean;
  subscription: boolean;
  coa: boolean;
  badge?: string;
  tone: "lime" | "yellow" | "red" | "blue";
};

export const products: Product[] = [
  { slug:"reta-glp-3", name:"Reta GLP-3", aliases:["reta","glp3"], strength:"10 mg", price:80, category:"Metabolic research", format:"Single compound", inStock:true, subscription:true, coa:true, badge:"Best seller", tone:"lime" },
  { slug:"ghk-cu", name:"GHK-Cu", aliases:["ghk cu","copper peptide"], strength:"100 mg", price:50, category:"Cosmetic research", format:"Single compound", inStock:true, subscription:true, coa:true, badge:"COA available", tone:"yellow" },
  { slug:"bpc-tb-500", name:"BPC / TB-500 blend", aliases:["bpc tb500","tb-500 blend"], strength:"20 mg", price:90, category:"Recovery research", format:"Blend", inStock:true, subscription:true, coa:true, badge:"Blend", tone:"red" },
  { slug:"bacteriostatic-water", name:"Bacteriostatic Water", aliases:["bac water","water"], strength:"10 mL", price:20, category:"Research supplies", format:"Research supply", inStock:true, subscription:false, coa:false, tone:"blue" },
  { slug:"tesamorelin", name:"Tesamorelin", aliases:["tesa"], strength:"10 mg", price:90, category:"Metabolic research", format:"Single compound", inStock:true, subscription:false, coa:false, badge:"New", tone:"lime" },
  { slug:"snap-8", name:"SNAP-8", aliases:["snap8"], strength:"10 mg", price:60, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"yellow" },
  { slug:"nad-mots-c-5-amino-1mq", name:"NAD+ / MOTS-c / 5-Amino-1MQ blend", aliases:["nad mots-c 5 amino 1mq"], strength:"120 mg", price:70, category:"Research compounds", format:"Blend", inStock:true, subscription:false, coa:false, badge:"Blend", tone:"red" },
  { slug:"ss-31", name:"SS-31", aliases:["ss31","elamipretide"], strength:"10 mg", price:50, category:"Longevity research", format:"Single compound", inStock:true, subscription:true, coa:true, tone:"blue" },
  { slug:"vitamin-b12", name:"Vitamin B12", aliases:["b12"], strength:"10 mg", price:55, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"lime" },
  { slug:"cartalax", name:"Cartalax", aliases:[], strength:"20 mg", price:70, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"yellow" },
  { slug:"epitalon", name:"Epitalon", aliases:[], strength:"10 mg", price:50, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"red" },
  { slug:"foxo4-dri", name:"FOXO4-DRI", aliases:["fox o4 dri","fox o4 dr1"], strength:"10 mg", price:140, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"blue" },
  { slug:"igf-1-lr3", name:"IGF-1 LR3", aliases:["igf1 lr3"], strength:"1 mg", price:80, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"lime" },
  { slug:"klow", name:"KLOW", aliases:[], strength:"80 mg", price:85, category:"Research compounds", format:"Blend", inStock:true, subscription:false, coa:false, badge:"Blend", tone:"yellow" },
  { slug:"klow-pro", name:"KLOW PRO", aliases:[], strength:"80 mg", price:130, category:"Research compounds", format:"Blend", inStock:true, subscription:false, coa:false, badge:"Blend", tone:"red" },
  { slug:"melanotan-ii", name:"Melanotan II", aliases:["melanotan 2"], strength:"10 mg", price:45, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"blue" },
  { slug:"nad-plus", name:"NAD+", aliases:["nad plus"], strength:"1000 mcg", price:55, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"lime" },
  { slug:"oxytocin", name:"Oxytocin", aliases:[], strength:"10 mg", price:50, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"yellow" },
  { slug:"pt-141", name:"PT-141", aliases:["pt141"], strength:"10 mg", price:50, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"red" },
  { slug:"selank-semax", name:"Selank / Semax blend", aliases:["semax selank"], strength:"20 mg", price:66, category:"Cognitive research", format:"Blend", inStock:true, subscription:false, coa:false, badge:"Blend", tone:"blue" },
  { slug:"selank", name:"Selank", aliases:[], strength:"10 mg", price:44, category:"Cognitive research", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"lime" },
  { slug:"semax", name:"Semax", aliases:[], strength:"10 mg", price:44, category:"Cognitive research", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"yellow" },
  { slug:"sermorelin", name:"Sermorelin", aliases:[], strength:"10 mg", price:60, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"red" },
  { slug:"tesamorelin-ipamorelin", name:"Tesamorelin / Ipamorelin blend", aliases:["tesa ipa blend"], strength:"16 mg total", price:99, category:"Research compounds", format:"Blend", inStock:true, subscription:false, coa:false, badge:"Blend", tone:"blue" },
  { slug:"testagen", name:"Testagen", aliases:[], strength:"20 mg", price:66, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"lime" },
  { slug:"thymosin-alpha-1", name:"Thymosin Alpha-1", aliases:["ta1"], strength:"10 mg", price:66, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"yellow" },
  { slug:"vesugen", name:"Vesugen", aliases:[], strength:"20 mg", price:66, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"red" },
  { slug:"vip", name:"VIP", aliases:[], strength:"10 mg", price:66, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"blue" },
  { slug:"kisspeptin-10", name:"Kisspeptin-10", aliases:["kisspeptin"], strength:"10 mg", price:55, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"lime" },
  { slug:"ipamorelin", name:"Ipamorelin", aliases:[], strength:"10 mg", price:33, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"yellow" },
  { slug:"cortexin", name:"Cortexin", aliases:["coretexin"], strength:"20 mg", price:70, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"red" },
  { slug:"chonluten", name:"Chonluten", aliases:[], strength:"20 mg", price:60, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"blue" },
  { slug:"dsip", name:"DSIP", aliases:[], strength:"10 mg", price:45, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"lime" },
  { slug:"mots-c", name:"MOTS-c", aliases:["motsc"], strength:"10 mg", price:35, category:"Longevity research", format:"Single compound", inStock:true, subscription:true, coa:false, tone:"yellow" },
  { slug:"aod-9604", name:"AOD-9604", aliases:["aod9604"], strength:"5 mg", price:55, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"red" },
  { slug:"cjc-1295-ipamorelin", name:"CJC-1295 / Ipamorelin blend", aliases:["cjc ipa blend"], strength:"10 mg", price:55, category:"Research compounds", format:"Blend", inStock:true, subscription:false, coa:false, badge:"Blend", tone:"blue" },
  { slug:"prime-191-gh", name:"Prime 191 GH", aliases:["prime 191 gf"], strength:"24 IU", price:80, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"lime" },
  { slug:"vilon", name:"Vilon", aliases:[], strength:"20 mg", price:70, category:"Research compounds", format:"Single compound", inStock:true, subscription:false, coa:false, tone:"yellow" },
];

export const coaRecords = [
  { product:"Reta GLP-3", lot:"DEMO-RETA-001", type:"Purity", date:"DEMO DATE", lab:"Sample laboratory · not a POW result", status:"Current", file:"DEMO RECORD", verification:"POW-DEMO-RETA", result:"DEMO VALUE", mass:"DEMO MASS", panels:["Identity","Purity","Mass"] },
  { product:"GHK-Cu", lot:"DEMO-GHK-002", type:"Heavy metals", date:"DEMO DATE", lab:"Sample laboratory · not a POW result", status:"Current", file:"DEMO RECORD", verification:"POW-DEMO-GHK", result:"DEMO VALUE", mass:"DEMO MASS", panels:["Identity","Heavy metals","Mass"] },
  { product:"BPC / TB-500", lot:"DEMO-BPC-003", type:"Sterility", date:"DEMO DATE", lab:"Sample laboratory · not a POW result", status:"Current", file:"DEMO RECORD", verification:"POW-DEMO-BPC", result:"DEMO VALUE", mass:"DEMO MASS", panels:["Identity","Sterility","Endotoxin"] },
  { product:"SS-31", lot:"DEMO-SS31-004", type:"Endotoxin", date:"DEMO DATE", lab:"Sample laboratory · not a POW result", status:"Archived", file:"DEMO RECORD", verification:"POW-DEMO-SS31", result:"DEMO VALUE", mass:"DEMO MASS", panels:["Identity","Endotoxin","Mass"] },
];

export const researchArticles = [
  { slug:"reading-a-certificate", kicker:"Testing 101", title:"How to read a certificate of analysis", summary:"A plain-language guide to lots, test types, attached files, and document status." },
  { slug:"handling-basics", kicker:"Lab handling", title:"Research handling basics", summary:"A placeholder overview awaiting POW-approved storage and handling instructions." },
  { slug:"lot-traceability", kicker:"Quality system", title:"Why lot traceability matters", summary:"How product records and testing documents stay connected in the prototype." },
];

export const opsCards = [
  ["Product & inventory","Normalized names and strengths","Supplied catalog prices","Stock by SKU / lot","Subscription eligibility","Volume tiers TODO"],
  ["Testing documents","Attach COA / SDS","Product and lot mapping","Current / archived status","Test type and lab","Publication approval"],
  ["Partner program","Partner approval","Commission rules TODO","Attribution window TODO","Adjustments / reversals","Payout status TODO"],
  ["Subscriptions","Cadence configuration","Discount rules TODO","Renewal queue","Failed payment recovery","Cancellation reporting"],
  ["Access & customer","Research profile fields","OTP / Google identity","Consent version","Support tools","Roles and permissions"],
  ["Content & promotion","Campaign slots","Promo rules TODO","Research library","Email capture TODO","Announcements"],
];
