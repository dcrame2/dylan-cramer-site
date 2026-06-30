import { redirect } from "next/navigation";

// The hub was merged into the homepage. Keep this route alive so any shared
// /hub link (e.g. an Instagram bio link) lands on the combined home page.
export default function Hub() {
  redirect("/");
}
