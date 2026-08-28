export type Product = {
  slug: string;
  name: string;
  aliases: string[];
  strength: string;
  category: string;
  format: "Single compound" | "Blend" | "Research supply";
  inStock: boolean;
  subscription: boolean;
  coa: boolean;
  badge?: string;
  tone: "lime" | "yellow" | "red" | "blue";
};

export const products: Product[] = [
  { slug:"reta-glp-3", name:"Reta GLP-3", aliases:["reta","glp3"], strength:"10 mg", category:"Metabolic research", format:"Single compound", inStock:true, subscription:true, coa:true, badge:"Best seller", tone:"lime" },
  { slug:"ghk-cu", name:"GHK-Cu", aliases:["ghk cu","copper peptide"], strength:"100 mg", category:"Cosmetic research", format:"Single compound", inStock:true, subscription:true, coa:true, badge:"COA available", tone:"yellow" },
  { slug:"bpc-tb-500", name:"BPC / TB-500", aliases:["bpc tb500","tb-500 blend"], strength:"20 mg", category:"Recovery research", format:"Blend", inStock:true, subscription:true, coa:true, badge:"Blend", tone:"red" },
  { slug:"tesamorelin", name:"Tesamorelin", aliases:["tesa"], strength:"10 mg", category:"Metabolic research", format:"Single compound", inStock:true, subscription:false, coa:false, badge:"New", tone:"blue" },
  { slug:"ss-31", name:"SS-31", aliases:["ss31","elamipretide"], strength:"10 mg", category:"Longevity research", format:"Single compound", inStock:true, subscription:true, coa:true, tone:"lime" },
  { slug:"selank-semax", name:"Selank / Semax", aliases:["semax selank"], strength:"20 mg", category:"Cognitive research", format:"Blend", inStock:false, subscription:false, coa:false, badge:"Blend", tone:"yellow" },
  { slug:"mots-c", name:"MOTS-c", aliases:["motsc"], strength:"10 mg", category:"Longevity research", format:"Single compound", inStock:true, subscription:true, coa:false, tone:"red" },
  { slug:"bacteriostatic-water", name:"Bacteriostatic Water", aliases:["bac water","water"], strength:"10 mL", category:"Research supplies", format:"Research supply", inStock:true, subscription:false, coa:false, tone:"blue" },
];

export const coaRecords = [
  { product:"Reta GLP-3", lot:"POW-XXXX", type:"Purity", date:"MM/DD/YYYY", lab:"Independent lab TODO", status:"Current", file:"COA PDF TODO" },
  { product:"GHK-Cu", lot:"POW-XXXX", type:"Heavy metals", date:"MM/DD/YYYY", lab:"Independent lab TODO", status:"Current", file:"COA PDF TODO" },
  { product:"BPC / TB-500", lot:"POW-XXXX", type:"Sterility", date:"MM/DD/YYYY", lab:"Independent lab TODO", status:"Current", file:"COA PDF TODO" },
  { product:"SS-31", lot:"POW-XXXX", type:"Endotoxin", date:"MM/DD/YYYY", lab:"Independent lab TODO", status:"Archived", file:"COA PDF TODO" },
];

export const researchArticles = [
  { slug:"reading-a-certificate", kicker:"Testing 101", title:"How to read a certificate of analysis", summary:"A plain-language guide to lots, test types, attached files, and document status." },
  { slug:"handling-basics", kicker:"Lab handling", title:"Research handling basics", summary:"A placeholder overview awaiting POW-approved storage and handling instructions." },
  { slug:"lot-traceability", kicker:"Quality system", title:"Why lot traceability matters", summary:"How product records and testing documents stay connected in the prototype." },
];

export const opsCards = [
  ["Product & inventory","Normalized names and strengths","Retail price TODO","Stock by SKU / lot","Subscription eligibility","Volume tiers TODO"],
  ["Testing documents","Attach COA / SDS","Product and lot mapping","Current / archived status","Test type and lab","Publication approval"],
  ["Partner program","Partner approval","Commission rules TODO","Attribution window TODO","Adjustments / reversals","Payout status TODO"],
  ["Subscriptions","Cadence configuration","Discount rules TODO","Renewal queue","Failed payment recovery","Cancellation reporting"],
  ["Access & customer","Research profile fields","OTP / Google identity","Consent version","Support tools","Roles and permissions"],
  ["Content & promotion","Campaign slots","Promo rules TODO","Research library","Email capture TODO","Announcements"],
];
