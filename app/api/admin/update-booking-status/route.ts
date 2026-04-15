import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendCustomerCancelledEmail,
  sendCustomerConfirmedEmail,
} from "@/app/lib/email";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

type BookingStatus = "requested" | "confirmed" | "cancelled";

type UpdatedBooking = {
  id: string;
  full_name: string;
  email: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  duration_minutes: number;
  status: string;
};

export async function POST(req: Request) {
  try {
    const { bookingId, status } = await req.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { success: false, message: "Fehlende Daten." },
        { status: 400 }
      );
    }

    // Aufruf der SQL-Funktion
    const { data, error } = await supabase.rpc(
      "admin_update_booking_status",
      {
        p_booking_id: bookingId,
        p_status: status,
      }
    );

    if (error) {
      console.error("RPC Error:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    const booking: UpdatedBooking | undefined =
      Array.isArray(data) && data.length > 0 ? data[0] : undefined;

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Buchung nicht gefunden." },
        { status: 404 }
      );
    }

    // E-Mail-Versand
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
      } else if (status === "cancelled") {
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
      console.error("E-Mail Fehler:", mailError);
    }

    return NextResponse.json({
      success: true,
      booking,
      message: "Status erfolgreich aktualisiert.",
    });
  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Serverfehler." },
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