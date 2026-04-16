import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Nicht autorisiert." },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      return NextResponse.json(
        { success: false, message: "Supabase Konfiguration fehlt." },
        { status: 500 }
      );
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const {
      data: { user },
      error: userError,
    } = await authClient.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, message: "Ungültige Sitzung." },
        { status: 401 }
      );
    }

    const adminClient = createClient(
      supabaseUrl,
      serviceRoleKey || anonKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const url = new URL(req.url);
    const month = url.searchParams.get("month");
    const date = url.searchParams.get("date");

    if (!month && !date) {
      return NextResponse.json(
        { success: false, message: "Bitte month oder date angeben." },
        { status: 400 }
      );
    }

    let fromDate = "";
    let toDate = "";

    if (month) {
      const [year, monthNumber] = month.split("-").map(Number);
      const start = new Date(year, monthNumber - 1, 1);
      const end = new Date(year, monthNumber, 0);

      const y1 = start.getFullYear();
      const m1 = `${start.getMonth() + 1}`.padStart(2, "0");
      const d1 = `${start.getDate()}`.padStart(2, "0");

      const y2 = end.getFullYear();
      const m2 = `${end.getMonth() + 1}`.padStart(2, "0");
      const d2 = `${end.getDate()}`.padStart(2, "0");

      fromDate = `${y1}-${m1}-${d1}`;
      toDate = `${y2}-${m2}-${d2}`;
    }

    if (date) {
      fromDate = date;
      toDate = date;
    }

    const { data: bookings, error: bookingsError } = await adminClient
      .from("bookings")
      .select(
        "id, booking_date, booking_time, duration_minutes, service_name, status"
      )
      .gte("booking_date", fromDate)
      .lte("booking_date", toDate)
      .in("status", ["requested", "confirmed"])
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true });

    if (bookingsError) {
      return NextResponse.json(
        { success: false, message: bookingsError.message },
        { status: 500 }
      );
    }

    const { data: blocks, error: blocksError } = await adminClient
      .from("blocked_times")
      .select("id, block_date, start_time, end_time, title, block_type, note")
      .gte("block_date", fromDate)
      .lte("block_date", toDate)
      .order("block_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (blocksError) {
      return NextResponse.json(
        { success: false, message: blocksError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      bookings: bookings ?? [],
      blocks: blocks ?? [],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Unbekannter Serverfehler.",
      },
      { status: 500 }
    );
  }
}