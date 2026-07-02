const APP_STORE_URL = "https://apps.apple.com/us/app/instacal/id6743951306";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.digitaldelight.InstaCal";

// Smart download link for bios and QR codes: sends each visitor straight to
// their platform's store, and everyone else to the InstaCal landing page.
export function GET(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";

  if (/android/i.test(ua)) {
    return Response.redirect(PLAY_STORE_URL, 302);
  }
  if (/iphone|ipad|ipod/i.test(ua)) {
    return Response.redirect(APP_STORE_URL, 302);
  }
  return Response.redirect(new URL("/instacal", request.url), 302);
}
