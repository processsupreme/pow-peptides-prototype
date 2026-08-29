import type { Metadata } from "next";
import POWApp from "../POWApp";

export const metadata:Metadata={title:"POW! Partner Network — Share the POW!",description:"Apply to the POW! Partner Network, create tracked affiliate links, share approved campaigns, and follow attributed activity from one partner portal.",openGraph:{title:"POW! Partner Network — Share the POW!",description:"A guided path from partner application to tracked referral links and attributed sales.",images:[]},twitter:{title:"POW! Partner Network — Share the POW!",description:"A guided path from partner application to tracked referral links and attributed sales.",images:[]}};
export default function Page(){return <POWApp view="partners"/>}
