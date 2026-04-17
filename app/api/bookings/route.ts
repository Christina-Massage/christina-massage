import { NextResponse } from "next/server";

export async function POST() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    hasUrl: !!url,
    hasKey: !!key,
    url,
    keyPrefix: key ? key.slice(0, 20) : null,
    keyLength: key ? key.length : 0,
  });
}