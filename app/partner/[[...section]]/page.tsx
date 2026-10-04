import POWApp from "../../POWApp";
export default async function Page({params}:{params:Promise<{section?:string[]}>}) {
  const {section}=await params;
  return <POWApp view="partner" slug={section?.[0]}/>;
}
