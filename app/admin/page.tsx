"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Booking = {
  id: string;
  full_name: string;
  email: string;
  service_name: string;
  duration_minutes: number;
  price_eur: number;
  booking_date: string;
  booking_time: string;
  status: string;
  cancellation_note: string | null;
};

const statusOptions = [
  "requested",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
];

export default function AdminBookingsPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("");

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true });

    if (error) {
      setMessage(error.message);
    } else {
      setBookings(data ?? []);
    }
  };

  useEffect(() => {
    const loadAdminData = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Bitte zuerst einloggen.");
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        setMessage("Kein Zugriff. Du bist kein Admin.");
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      await loadBookings();
      setLoading(false);
    };

    loadAdminData();
  }, []);

  const updateStatus = async (bookingId: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Status aktualisiert.");
    loadBookings();
  };

  if (loading) {
    return <div className="p-8">Lade Admin-Daten...</div>;
  }

  if (!isAdmin) {
    return <div className="p-8">{message}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f6efe5] p-6 md:p-10">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-3xl font-semibold text-neutral-900">
          Admin Buchungen
        </h1>

        {message && (
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
            {message}
          </div>
        )}

        {bookings.length === 0 ? (
          <p className="mt-6 text-neutral-600">Noch keine Buchungen vorhanden.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">E-Mail</th>
                  <th className="px-4 py-3">Leistung</th>
                  <th className="px-4 py-3">Dauer</th>
                  <th className="px-4 py-3">Preis</th>
                  <th className="px-4 py-3">Datum</th>
                  <th className="px-4 py-3">Uhrzeit</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Storno-Hinweis</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-neutral-100">
                    <td className="px-4 py-3">{booking.full_name}</td>
                    <td className="px-4 py-3">{booking.email}</td>
                    <td className="px-4 py-3">{booking.service_name}</td>
                    <td className="px-4 py-3">{booking.duration_minutes} Min</td>
                    <td className="px-4 py-3">{booking.price_eur} €</td>
                    <td className="px-4 py-3">{booking.booking_date}</td>
                    <td className="px-4 py-3">{booking.booking_time}</td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                        className="rounded-xl border border-neutral-200 px-3 py-2"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">
                      {booking.cancellation_note || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}