import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/my-bookings";

  if (!token_hash || !type) {
    return NextResponse.redirect(`${origin}/booking?error=missing_token`);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.auth.verifyOtp({
    type: type as "signup" | "recovery" | "email_change",
    token_hash,
  });

  if (error) {
    return NextResponse.redirect(`${origin}/booking?error=confirm_failed`);
  }

  return NextResponse.redirect(`${origin}${next}?confirmed=true`);
}