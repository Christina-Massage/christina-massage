import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendCustomerBookingRequestEmail,
  sendOwnerBookingRequestEmail,
} from "@/app/lib/email";
import {
  CalendarBlock,
  CalendarBooking,
  LAST_END_TIME_MINUTES,
  rangesOverlap,
  timeToMinutes,
} from "@/app/lib/booking-utils";

function isWeekend(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  const day = date.getDay();
  return day === 0 || day === 6;
}

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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      return NextResponse.json(
        { success: false, message: "Supabase Konfiguration fehlt." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, anonKey, {
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

    const availabilityResponse = await fetch(
      `${new URL(req.url).origin}/api/calendar-availability?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const availability = await availabilityResponse.json();

    if (!availabilityResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            availability?.message || "Verfügbarkeiten konnten nicht geladen werden.",
        },
        { status: 500 }
      );
    }

    const existingBookings = (availability.bookings || []) as CalendarBooking[];
    const blocks = (availability.blocks || []) as CalendarBlock[];

    const overlapsBooking = existingBookings.some((booking) => {
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

    const overlapsBlock = blocks.some((block) => {
      const blockStart = timeToMinutes(block.start_time);
      const blockEnd = timeToMinutes(block.end_time);
      return rangesOverlap(requestStart, requestEnd, blockStart, blockEnd);
    });

    if (overlapsBlock) {
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