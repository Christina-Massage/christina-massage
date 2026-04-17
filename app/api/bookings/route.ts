import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    console.log("URL:", url);
    console.log("KEY START:", key?.slice(0, 20));

    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .limit(1);

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

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
      !price
    ) {
      return NextResponse.json(
        { message: "Fehlende Pflichtfelder." },
        { status: 400 }
      );
    }

    if (!accepted_terms) {
      return NextResponse.json(
        { message: "AGB wurden nicht akzeptiert." },
        { status: 400 }
      );
    }

    const { data: existingBookings, error: existingBookingsError } =
      await supabaseAdmin
        .from("bookings")
        .select("id, booking_time, duration_minutes, status")
        .eq("booking_date", date)
        .in("status", ["requested", "confirmed"]);

    if (existingBookingsError) {
      return NextResponse.json(
        { message: existingBookingsError.message },
        { status: 500 }
      );
    }

    const { data: existingBlocks, error: existingBlocksError } =
      await supabaseAdmin
        .from("blocked_times")
        .select("id, start_time, end_time")
        .eq("block_date", date);

    if (existingBlocksError) {
      return NextResponse.json(
        { message: existingBlocksError.message },
        { status: 500 }
      );
    }

    const timeToMinutes = (value: string) => {
      const [hours, minutes] = value.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const rangesOverlap = (
      startA: number,
      endA: number,
      startB: number,
      endB: number
    ) => {
      return startA < endB && endA > startB;
    };

    const requestedStart = timeToMinutes(time);
    const requestedEnd = requestedStart + Number(duration);

    const overlapsBooking = (existingBookings ?? []).some((booking) => {
      const bookingStart = timeToMinutes(booking.booking_time);
      const bookingEnd = bookingStart + booking.duration_minutes;
      return rangesOverlap(requestedStart, requestedEnd, bookingStart, bookingEnd);
    });

    if (overlapsBooking) {
      return NextResponse.json(
        { message: "Dieser Termin wurde gerade bereits vergeben." },
        { status: 409 }
      );
    }

    const overlapsBlock = (existingBlocks ?? []).some((block) => {
      const blockStart = timeToMinutes(block.start_time);
      const blockEnd = timeToMinutes(block.end_time);
      return rangesOverlap(requestedStart, requestedEnd, blockStart, blockEnd);
    });

    if (overlapsBlock) {
      return NextResponse.json(
        { message: "Dieser Zeitraum ist blockiert." },
        { status: 409 }
      );
    }

    const { error: insertError } = await supabaseAdmin.from("bookings").insert([
      {
        user_id,
        full_name: name,
        email,
        service_name: service,
        booking_date: date,
        booking_time: time,
        duration_minutes: duration,
        price_eur: price,
        status: "requested",
        accepted_terms,
      },
    ]);

    if (insertError) {
      return NextResponse.json(
        { message: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Serverfehler." },
      { status: 500 }
    );
  }
}