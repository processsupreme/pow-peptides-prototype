import { isShoppingRoute, offerCookie, readOfferCookie } from "../../first-order-offer";

function safeDestination(value: string | null, origin: string) {
  try {
    const url = new URL(value || "/shop", origin);
    if (url.origin === origin && isShoppingRoute(url.pathname)) {
      // Clean up the old form's default GET submission, which could put email in the URL.
      url.searchParams.delete("email");
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch { /* Use the catalog when the submitted destination is invalid. */ }
  return "/shop";
}

// Progressive enhancement for delayed/blocked client scripts. The email input has
// no name, so native browser validation runs without sending the address here.
export async function POST(request: Request) {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) return new Response("Invalid origin", { status: 403 });
  const form = await request.formData();
  const supplied = form.get("returnTo");
  const destination = safeDestination(request.headers.get("referer") || (typeof supplied === "string" ? supplied : null), url.origin);
  const status = readOfferCookie(request.headers.get("cookie") || "") === "used" ? "used" : "available";
  return new Response(null, { status: 303, headers: {
    "Location": `/api/demo-offer?returnTo=${encodeURIComponent(destination)}`,
    "Set-Cookie": offerCookie(status, url.protocol === "https:"),
    "Cache-Control": "no-store",
  } });
}

export function GET(request: Request) {
  const url = new URL(request.url);
  if (readOfferCookie(request.headers.get("cookie") || "") !== "locked") {
    return new Response(null, { status: 303, headers: { "Location": safeDestination(url.searchParams.get("returnTo"), url.origin), "Cache-Control": "no-store" } });
  }
  // Verify the cookie before returning to the gate, so blocked cookies cannot loop.
  return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Open POW! in your browser</title><body style="margin:0;background:#111;color:white;font:18px/1.6 system-ui;padding:8vw"><main style="max-width:640px;margin:auto"><h1 style="color:#a5ed27">Let’s get you into POW!</h1><p>This preview browser could not remember your access. Open the original POW! link in Safari or Chrome, allow site cookies, and try again.</p><p>Your email was not sent or saved.</p><a style="color:#a5ed27" href="/shop">Try the shop again</a> · <a style="color:#a5ed27" href="/support">Contact POW!</a></main></body></html>`, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}
