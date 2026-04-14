import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendAdminNotification,
  sendCustomerConfirmation,
} from "@/app/lib/email";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseServer = createClient(supabaseUrl, anonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

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
        {
          success: false,
          message: "Fehlende Buchungsdaten.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer.rpc("create_booking", {
      p_user_id: user_id,
      p_full_name: name,
      p_email: email,
      p_service_name: service,
      p_duration_minutes: duration,
      p_price_eur: price,
      p_booking_date: date,
      p_booking_time: time,
      p_accepted_terms: accepted_terms ?? false,
    });

    if (error) {
      console.error("create_booking rpc error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Fehler beim Speichern der Buchung.",
          code: (error as any)?.code ?? null,
          details: (error as any)?.details ?? null,
          hint: (error as any)?.hint ?? null,
        },
        { status: 500 }
      );
    }

    try {
      await sendAdminNotification({
        name,
        email,
        service,
        date,
        time,
        duration,
      });
    } catch (adminMailError) {
      console.error("Admin-Mail fehlgeschlagen:", adminMailError);
    }

    try {
      await sendCustomerConfirmation({
        name,
        email,
        service,
        date,
        time,
        duration,
      });
    } catch (customerMailError) {
      console.error("Kunden-Mail fehlgeschlagen:", customerMailError);
    }

    return NextResponse.json(
      {
        success: true,
        data,
        message: "Buchung erfolgreich gespeichert.",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("API bookings route error:", err);

    return NextResponse.json(
      {
        success: false,
        message: err?.message || "Serverfehler bei der Buchung.",
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