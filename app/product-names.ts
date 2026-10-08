// Keep existing bookmarks and browser-held demo items usable after the label update.
export function currentProductSlug(slug: string) {
  return ({ "reta-glp-3": "superman", "prime-191-gh": "batman" } as Record<string, string>)[slug] ?? slug;
}

export function currentProductName(text: string) {
  return text.replace(/\breta(?: glp-3)?\b/gi, "Superman")
    .replace(/\bprime 191(?: gh| gf)?\b/gi, "Batman")
    .replace(/\bsuper man\b/gi, "Superman");
}
