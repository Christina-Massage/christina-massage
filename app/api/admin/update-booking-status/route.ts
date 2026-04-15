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

type UpdatedBookingRow = {
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
    const body = await req.json();
    const { bookingId, status } = body as {
      bookingId: string;
      status: BookingStatus;
    };

    if (!bookingId || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Fehlende Daten.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer.rpc(
      "admin_update_booking_status",
      {
        p_booking_id: bookingId,
        p_status: status,
      }
    );

    if (error) {
      console.error("admin_update_booking_status rpc error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Status konnte nicht geändert werden.",
          code: (error as any)?.code ?? null,
          details: (error as any)?.details ?? null,
          hint: (error as any)?.hint ?? null,
        },
        { status: 500 }
      );
    }

    const booking = Array.isArray(data) ? (data[0] as UpdatedBookingRow | undefined) : undefined;

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Buchung nicht gefunden.",
        },
        { status: 404 }
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
      booking,
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