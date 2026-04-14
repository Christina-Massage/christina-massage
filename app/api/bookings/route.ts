import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import {
  sendAdminNotification,
  sendCustomerConfirmation,
} from "@/app/lib/email";

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

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: user_id ?? null,
          full_name: name,
          email,
          service_name: service,
          duration_minutes: duration,
          price_eur: price,
          booking_date: date,
          booking_time: time,
          accepted_terms: accepted_terms ?? false,
          status: "requested",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase booking insert error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Fehler beim Speichern der Buchung.",
          code: (error as any).code ?? null,
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