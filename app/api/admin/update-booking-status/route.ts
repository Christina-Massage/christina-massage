import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendCustomerCancelledEmail,
  sendCustomerConfirmedEmail,
} from "@/app/lib/email";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseServer = createClient(supabaseUrl, anonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

type BookingStatus = "requested" | "confirmed" | "cancelled";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, status } = body as {
      bookingId: string;
      status: BookingStatus;
    };

    if (!bookingId || !status) {
      return NextResponse.json(
        { success: false, message: "Fehlende Daten." },
        { status: 400 }
      );
    }

    const { data: booking, error: fetchError } = await supabaseServer
      .from("bookings")
      .select(
        "id, full_name, email, service_name, booking_date, booking_time, duration_minutes, status"
      )
      .eq("id", bookingId)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json(
        {
          success: false,
          message: fetchError?.message || "Buchung nicht gefunden.",
        },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabaseServer
      .from("bookings")
      .update({ status })
      .eq("id", bookingId);

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          message: updateError.message || "Status konnte nicht geändert werden.",
        },
        { status: 500 }
      );
    }

    try {
      if (status === "confirmed") {
        await sendCustomerConfirmedEmail({
          name: booking.full_name,
          email: booking.email,
          service: booking.service_name,
          date: booking.booking_date,
          time: booking.booking_time,
          duration: booking.duration_minutes,
        });
      }

      if (status === "cancelled") {
        await sendCustomerCancelledEmail({
          name: booking.full_name,
          email: booking.email,
          service: booking.service_name,
          date: booking.booking_date,
          time: booking.booking_time,
          duration: booking.duration_minutes,
        });
      }
    } catch (mailError) {
      console.error("Status-Mail fehlgeschlagen:", mailError);
    }

    return NextResponse.json({
      success: true,
      message: "Status erfolgreich aktualisiert.",
    });
  } catch (err: any) {
    console.error("Admin status route error:", err);

    return NextResponse.json(
      {
        success: false,
        message: err?.message || "Serverfehler.",
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