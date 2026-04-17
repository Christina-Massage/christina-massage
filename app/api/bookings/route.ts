import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function jsonError(message: string, status = 500, extra?: Record<string, unknown>) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...extra,
    },
    { status }
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

export async function POST(req: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return jsonError("Supabase ENV Variablen fehlen.", 500, {
        hasUrl: !!supabaseUrl,
        hasServiceRoleKey: !!supabaseServiceRoleKey,
      });
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

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
    } = body ?? {};

    if (
      !user_id ||
      !name ||
      !email ||
      !service ||
      !date ||
      !time ||
      duration === undefined ||
      price === undefined
    ) {
      return jsonError("Fehlende Pflichtfelder.", 400, {
        received: {
          user_id: !!user_id,
          name: !!name,
          email: !!email,
          service: !!service,
          date: !!date,
          time: !!time,
          duration: duration !== undefined,
          price: price !== undefined,
        },
      });
    }

    if (!accepted_terms) {
      return jsonError("AGB wurden nicht akzeptiert.", 400);
    }

    const numericDuration = Number(duration);
    const numericPrice = Number(price);

    if (
      Number.isNaN(numericDuration) ||
      numericDuration <= 0 ||
      Number.isNaN(numericPrice) ||
      numericPrice < 0
    ) {
      return jsonError("Dauer oder Preis sind ungültig.", 400);
    }

    const requestedStart = timeToMinutes(time);
    const requestedEnd = requestedStart + numericDuration;

    const { data: existingBookings, error: existingBookingsError } =
      await supabaseAdmin
        .from("bookings")
        .select("id, booking_time, duration_minutes, status")
        .eq("booking_date", date)
        .in("status", ["requested", "confirmed"]);

    if (existingBookingsError) {
      console.error("BOOKINGS SELECT ERROR:", existingBookingsError);
      return jsonError(existingBookingsError.message, 500);
    }

    const { data: existingBlocks, error: existingBlocksError } =
      await supabaseAdmin
        .from("blocked_times")
        .select("id, start_time, end_time, title, block_type")
        .eq("block_date", date);

    if (existingBlocksError) {
      console.error("BLOCKS SELECT ERROR:", existingBlocksError);
      return jsonError(existingBlocksError.message, 500);
    }

    const overlapsBooking = (existingBookings ?? []).some((booking) => {
      const bookingStart = timeToMinutes(booking.booking_time);
      const bookingEnd = bookingStart + Number(booking.duration_minutes);
      return rangesOverlap(requestedStart, requestedEnd, bookingStart, bookingEnd);
    });

    if (overlapsBooking) {
      return jsonError(
        "Dieser Termin wurde gerade bereits vergeben.",
        409
      );
    }

    const overlapsBlock = (existingBlocks ?? []).some((block) => {
      const blockStart = timeToMinutes(block.start_time);
      const blockEnd = timeToMinutes(block.end_time);
      return rangesOverlap(requestedStart, requestedEnd, blockStart, blockEnd);
    });

    if (overlapsBlock) {
      return jsonError("Dieser Zeitraum ist blockiert.", 409);
    }

    const insertPayload = {
      user_id,
      full_name: name,
      email,
      service_name: service,
      booking_date: date,
      booking_time: time,
      duration_minutes: numericDuration,
      price_eur: numericPrice,
      status: "requested",
      accepted_terms: true,
    };

    const { data: insertedBooking, error: insertError } = await supabaseAdmin
      .from("bookings")
      .insert([insertPayload])
      .select()
      .single();

    if (insertError) {
      console.error("BOOKING INSERT ERROR:", insertError);

      if (
        insertError.message?.includes("Invalid API key") ||
        insertError.message?.includes("invalid api key")
      ) {
        return jsonError(
          "Invalid API key",
          500,
          {
            debug: {
              supabaseUrlHost: supabaseUrl,
              serviceRolePrefix: supabaseServiceRoleKey.slice(0, 12),
            },
          }
        );
      }

      return jsonError(insertError.message, 500);
    }

    return NextResponse.json({
      success: true,
      message: "Buchung erfolgreich gespeichert.",
      booking: insertedBooking,
    });
  } catch (error: any) {
    console.error("API /api/bookings SERVER ERROR:", error);

    return jsonError(error?.message || "Serverfehler.", 500);
  }
}

export async function GET() {
  return jsonError("Method GET not allowed. Use POST instead.", 405);
}