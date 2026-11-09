import POWApp from "../../POWApp";
import { powCream } from "../../pow-cream";

export const metadata = {
  title: `${powCream.name} — ${powCream.size} | POW! Peptides`,
  description: `${powCream.name}: ${powCream.formula}. ${powCream.size} jar, $${powCream.price}.`,
  openGraph: { title: powCream.name, description: `${powCream.formula} · ${powCream.size} · $${powCream.price} per jar`, images: [] },
  twitter: { title: powCream.name, description: `${powCream.formula} · ${powCream.size} · $${powCream.price} per jar`, images: [] },
};
export default function Page() { return <POWApp view="cream"/>; }
