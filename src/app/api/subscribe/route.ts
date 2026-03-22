import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  // --- Option 1: Resend (uncomment and add RESEND_API_KEY to .env.local) ---
  // const res = await fetch("https://api.resend.com/audiences/YOUR_AUDIENCE_ID/contacts", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email }),
  // });
  //
  // if (!res.ok) {
  //   return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  // }

  // --- For now: log the email (replace with Resend above when ready) ---
  console.log(`[subscribe] New email: ${email}`);

  return NextResponse.json({ success: true });
}
