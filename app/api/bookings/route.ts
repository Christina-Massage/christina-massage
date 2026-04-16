import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendCustomerBookingRequestEmail,
  sendOwnerBookingRequestEmail,
} from "@/app/lib/email";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function rangesOverlap(
  startA: number,
  endA: number,
  startB: number,
  endB: number
) {
  return startA < endB && endA > startB;
}

function isWeekend(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  const day = date.getDay();
  return day === 0 || day === 6;
}

const LAST_END_TIME_MINUTES = 20 * 60 + 15;

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Nicht autorisiert." },
        { status: 401 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, message: "Ungültige Sitzung." },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      user_id,
      name,
      email,
      service,
      date,
      time,
      duration,
      price,
      accepted_terms,
    } = body;

    if (
      !user_id ||
      !name ||
      !email ||
      !service ||
      !date ||
      !time ||
      !duration ||
      price == null
    ) {
      return NextResponse.json(
        { success: false, message: "Fehlende Buchungsdaten." },
        { status: 400 }
      );
    }

    if (user.id !== user_id) {
      return NextResponse.json(
        { success: false, message: "Ungültige Benutzerzuordnung." },
        { status: 403 }
      );
    }

    if (!accepted_terms) {
      return NextResponse.json(
        {
          success: false,
          message: "Die Buchungsbedingungen wurden nicht akzeptiert.",
        },
        { status: 400 }
      );
    }

    if (isWeekend(date)) {
      return NextResponse.json(
        {
          success: false,
          message: "Samstag und Sonntag sind keine buchbaren Tage.",
        },
        { status: 400 }
      );
    }

    const requestStart = timeToMinutes(time);
    const requestEnd = requestStart + Number(duration);

    if (requestEnd > LAST_END_TIME_MINUTES) {
      return NextResponse.json(
        {
          success: false,
          message: "Dieser Termin liegt außerhalb der verfügbaren Zeiten.",
        },
        { status: 400 }
      );
    }

    const { data: existingBookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("booking_time, duration_minutes")
      .eq("booking_date", date)
      .in("status", ["requested", "confirmed"]);

    if (bookingsError) {
      return NextResponse.json(
        { success: false, message: bookingsError.message },
        { status: 500 }
      );
    }

    const overlapsBooking = (existingBookings ?? []).some((booking) => {
      const bookingStart = timeToMinutes(booking.booking_time);
      const bookingEnd = bookingStart + booking.duration_minutes;
      return rangesOverlap(requestStart, requestEnd, bookingStart, bookingEnd);
    });

    if (overlapsBooking) {
      return NextResponse.json(
        { success: false, message: "Dieser Zeitraum ist bereits belegt." },
        { status: 409 }
      );
    }

    const { data: blockedTimes, error: blockedError } = await supabase
      .from("blocked_times")
      .select("start_time, end_time")
      .eq("block_date", date);

    if (blockedError) {
      return NextResponse.json(
        { success: false, message: blockedError.message },
        { status: 500 }
      );
    }

    const overlapsBlocked = (blockedTimes ?? []).some((block) => {
      const blockStart = timeToMinutes(block.start_time);
      const blockEnd = timeToMinutes(block.end_time);
      return rangesOverlap(requestStart, requestEnd, blockStart, blockEnd);
    });

    if (overlapsBlocked) {
      return NextResponse.json(
        { success: false, message: "Dieser Zeitraum ist blockiert." },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id,
          full_name: name,
          email,
          service_name: service,
          booking_date: date,
          booking_time: time,
          duration_minutes: Number(duration),
          price_eur: Number(price),
          accepted_terms: Boolean(accepted_terms),
          status: "requested",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    try {
      await sendCustomerBookingRequestEmail({
        name,
        email,
        service,
        date,
        time,
        duration: Number(duration),
        price: Number(price),
      });

      await sendOwnerBookingRequestEmail({
        name,
        email,
        service,
        date,
        time,
        duration: Number(duration),
        price: Number(price),
      });
    } catch (mailError) {
      console.error("E-Mail Fehler:", mailError);
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Buchung erfolgreich erstellt.",
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

export async function GET() {
  return NextResponse.json(
    { message: "Method GET not allowed. Use POST instead." },
    { status: 405 }
  );
}