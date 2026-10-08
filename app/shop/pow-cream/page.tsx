import POWApp from "../../POWApp";
import { powCream } from "../../pow-cream";

export const metadata = {
  title: "POW! Cream — Benadryl + KPV | POW! Peptides",
  description: "Meet POW! Cream: Benadryl + KPV in a balm-style jar. Explore the product concept and $39 prototype price.",
  openGraph: { title: powCream.name, description: "Benadryl + KPV · balm-style cream · $39 per jar", images: [] },
  twitter: { title: powCream.name, description: "Benadryl + KPV · balm-style cream · $39 per jar", images: [] },
};
export default function Page() { return <POWApp view="cream"/>; }
