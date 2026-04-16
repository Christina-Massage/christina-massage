import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

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

    const { data, error } = await supabase.from("bookings").insert([
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
    ]);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
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