import { redirect } from "next/navigation";
export default async function Page({params}:{params:Promise<{partnerSlug:string}>}){const {partnerSlug}=await params;redirect(`/access?ref=${encodeURIComponent(partnerSlug)}`)}
