import type { Metadata } from "next";
import POWApp from "../../POWApp";
import { researchArticles } from "../../pow-data";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const article=researchArticles.find(x=>x.slug===slug);
  const title=article?`${article.title} — POW! Research`:`Research guide — POW! Peptides`;
  const description=article?.summary||"Product-neutral education from the POW! Research Library.";
  return {title,description,openGraph:{title,description,images:[]},twitter:{title,description,images:[]}};
}

export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <POWApp view="research" slug={slug}/>}
