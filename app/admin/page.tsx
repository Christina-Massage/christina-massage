"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

type BookingStatus = "requested" | "confirmed" | "cancelled";

type Booking = {
  id: string;
  full_name: string;
  email: string;
  service_name: string;
  duration_minutes: number;
  price_eur: number;
  booking_date: string;
  booking_time: string;
  status: BookingStatus;
};

type BlockedTime = {
  id: string;
  block_date: string;
  start_time: string;
  end_time: string;
  title: string;
  block_type: string;
  note: string | null;
};

function todayString() {
  return new Date().toISOString().split("T")[0];
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [selectedDate, setSelectedDate] = useState(todayString());
  const [message, setMessage] = useState("");

  const loadData = async (date: string) => {
    const { data: bookingsData } = await supabase
      .from("bookings")
      .select("*")
      .eq("booking_date", date)
      .order("booking_time");

    const { data: blocksData } = await supabase
      .from("blocked_times")
      .select("*")
      .eq("block_date", date)
      .order("start_time");

    setBookings((bookingsData ?? []) as Booking[]);
    setBlockedTimes((blocksData ?? []) as BlockedTime[]);
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        window.location.href = "/";
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!profile?.is_admin) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      await loadData(selectedDate);
      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (isAdmin) loadData(selectedDate);
  }, [selectedDate]);

  const updateStatus = async (bookingId: string, status: BookingStatus) => {
    const response = await fetch("/api/admin/update-booking-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId, status }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message || "Fehler beim Aktualisieren.");
      return;
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status } : b
      )
    );

    setMessage("Status erfolgreich aktualisiert.");
  };

  if (loading) return <div className="p-10">Lade...</div>;
  if (!isAdmin) return <div className="p-10">Kein Zugriff.</div>;

  return (
    <div className="min-h-screen bg-[#f6efe5] p-6 text-stone-800">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm underline">
          ← Zurück zur Startseite
        </Link>

        <h1 className="mt-4 text-3xl font-semibold">
          Admin – Terminverwaltung
        </h1>

        <div className="mt-4">
          <label className="block text-sm font-medium">Datum:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 rounded border px-3 py-2"
          />
        </div>

        {message && (
          <div className="mt-4 rounded bg-emerald-100 p-3 text-sm">
            {message}
          </div>
        )}

        <div className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border bg-white p-4 shadow-sm"
            >
              <p className="font-semibold">
                {booking.booking_time} – {booking.full_name}
              </p>
              <p className="text-sm">{booking.service_name}</p>
              <p className="text-sm">{booking.email}</p>
              <p className="text-xs mt-1">
                Status: <strong>{booking.status}</strong>
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() =>
                    updateStatus(booking.id, "confirmed")
                  }
                  className="rounded bg-emerald-600 px-3 py-2 text-white text-sm"
                >
                  Bestätigen
                </button>
                <button
                  onClick={() =>
                    updateStatus(booking.id, "cancelled")
                  }
                  className="rounded bg-red-600 px-3 py-2 text-white text-sm"
                >
                  Stornieren
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}