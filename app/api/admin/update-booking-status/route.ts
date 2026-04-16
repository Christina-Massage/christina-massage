import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendCustomerCancelledEmail,
  sendCustomerConfirmedEmail,
} from "@/app/lib/email";

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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile?.is_admin) {
      return NextResponse.json(
        { success: false, message: "Kein Admin-Zugriff." },
        { status: 403 }
      );
    }

    const { bookingId, status } = (await req.json()) as {
      bookingId: string;
      status: BookingStatus;
    };

    if (!bookingId || !status) {
      return NextResponse.json(
        { success: false, message: "Fehlende Daten." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId)
      .select(
        "id, full_name, email, service_name, booking_date, booking_time, duration_minutes, status"
      )
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    const booking = data as UpdatedBooking;

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