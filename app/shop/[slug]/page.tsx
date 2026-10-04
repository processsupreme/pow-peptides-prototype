import type { Metadata } from "next";
import POWApp from "../../POWApp";
import { products } from "../../pow-data";
import { productResearch } from "../../product-research";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=products.find(x=>x.slug===slug)||products[0];const title=`${p.name} ${p.strength} — POW! Peptides`;const description=`${p.name}: ${productResearch[p.slug].headline} Explore research context, evidence limits, supplied vial specifications, and sources.`;return{title,description,openGraph:{title,description,images:[]},twitter:{title,description,images:[]}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <POWApp view="product" slug={slug}/>}
