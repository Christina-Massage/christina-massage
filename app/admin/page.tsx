"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MonthlyCalendar from "@/app/components/booking/MonthlyCalendar";
import { supabase } from "../lib/supabase";
import {
  CalendarBlock,
  CalendarBooking,
  formatDateKey,
  getDailyEvents,
  getDayStatus,
  getMonthStart,
  getTodayString,
} from "@/app/lib/booking-utils";

type BookingStatus = "requested" | "confirmed" | "cancelled";

function monthKey(date: Date) {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}`;
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionEmail, setSessionEmail] = useState("");

  const [visibleMonth, setVisibleMonth] = useState(getMonthStart(new Date()));
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  const [monthBookings, setMonthBookings] = useState<CalendarBooking[]>([]);
  const [monthBlocks, setMonthBlocks] = useState<CalendarBlock[]>([]);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );

  const [blockDate, setBlockDate] = useState(getTodayString());
  const [startTime, setStartTime] = useState("13:00");
  const [endTime, setEndTime] = useState("14:00");
  const [title, setTitle] = useState("Mittagspause");
  const [blockType, setBlockType] = useState("pause");
  const [note, setNote] = useState("");
  const [isFullDay, setIsFullDay] = useState(false);

  const setStatusMessage = (
    text: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setMessage(text);
    setMessageType(type);
  };

  const messageStyles =
    messageType === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : messageType === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : "border-stone-200 bg-stone-50 text-stone-700";

  useEffect(() => {
    setBlockDate(selectedDate);
  }, [selectedDate]);

  const loadAdminMonth = async (baseMonth: Date) => {
    setLoading(true);

    const { data: monthData, error } = await supabase.auth.getSession();

    if (error || !monthData.session?.access_token) {
      setLoading(false);
      return;
    }

    const response = await fetch(
      `/api/calendar-availability?month=${monthKey(baseMonth)}`,
      {
        headers: {
          Authorization: `Bearer ${monthData.session.access_token}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setStatusMessage(
        result?.message || "Kalenderdaten konnten nicht geladen werden.",
        "error"
      );
      setMonthBookings([]);
      setMonthBlocks([]);
      setLoading(false);
      return;
    }

    setMonthBookings(result.bookings ?? []);
    setMonthBlocks(result.blocks ?? []);
    setLoading(false);
  };

  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        window.location.href = "/booking";
        return;
      }

      setSessionEmail(session.user.email ?? "");

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error || !profile?.is_admin) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      await loadAdminMonth(visibleMonth);
    };

    bootstrap();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    loadAdminMonth(visibleMonth);
  }, [visibleMonth, isAdmin]);

  const bookingsByDate = useMemo(() => {
    return monthBookings.reduce<Record<string, CalendarBooking[]>>((acc, item) => {
      acc[item.booking_date] = acc[item.booking_date]
        ? [...acc[item.booking_date], item]
        : [item];
      return acc;
    }, {});
  }, [monthBookings]);

  const blocksByDate = useMemo(() => {
    return monthBlocks.reduce<Record<string, CalendarBlock[]>>((acc, item) => {
      acc[item.block_date] = acc[item.block_date]
        ? [...acc[item.block_date], item]
        : [item];
      return acc;
    }, {});
  }, [monthBlocks]);

  const selectedDayBookings = bookingsByDate[selectedDate] || [];
  const selectedDayBlocks = blocksByDate[selectedDate] || [];
  const selectedDayEvents = getDailyEvents(selectedDayBookings, selectedDayBlocks);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/booking";
  };

  const updateBookingStatus = async (
    bookingId: string,
    status: BookingStatus
  ) => {
    setSaving(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setSaving(false);
        setStatusMessage("Nicht autorisiert.", "error");
        return;
      }

      const response = await fetch("/api/update-booking-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ bookingId, status }),
      });

      const result = await response.json();
      setSaving(false);

      if (!response.ok) {
        setStatusMessage(
          result?.message || "Status konnte nicht aktualisiert werden.",
          "error"
        );
        return;
      }

      setMonthBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );

      if (status === "confirmed") {
        setStatusMessage(
          "Buchung bestätigt und Bestätigungs-E-Mail gesendet.",
          "success"
        );
      } else if (status === "cancelled") {
        setStatusMessage(
          "Buchung storniert und Stornierungs-E-Mail gesendet.",
          "success"
        );
      } else {
        setStatusMessage("Buchungsstatus erfolgreich aktualisiert.", "success");
      }
    } catch {
      setSaving(false);
      setStatusMessage("Es ist ein unerwarteter Fehler aufgetreten.", "error");
    }
  };

  const createBlockedTime = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("", "info");

    const finalStart = isFullDay ? "00:00" : startTime;
    const finalEnd = isFullDay ? "23:59" : endTime;
    const finalType = isFullDay ? "full-day" : blockType;

    if (!blockDate || !finalStart || !finalEnd || !title.trim()) {
      setStatusMessage("Bitte alle Pflichtfelder ausfüllen.", "error");
      return;
    }

    if (!isFullDay && finalStart >= finalEnd) {
      setStatusMessage("Die Endzeit muss nach der Startzeit liegen.", "error");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("blocked_times")
      .insert([
        {
          block_date: blockDate,
          start_time: finalStart,
          end_time: finalEnd,
          title: title.trim(),
          block_type: finalType,
          note: note.trim() || null,
          created_by: user?.id ?? null,
        },
      ])
      .select()
      .single();

    setSaving(false);

    if (error) {
      setStatusMessage(error.message, "error");
      return;
    }

    setMonthBlocks((prev) => [...prev, data as CalendarBlock]);
    setStatusMessage("Sperrzeit erfolgreich angelegt.", "success");

    setTitle("Mittagspause");
    setBlockType("pause");
    setNote("");
    setIsFullDay(false);
    setStartTime("13:00");
    setEndTime("14:00");
  };

  const deleteBlockedTime = async (blockId: string) => {
    setSaving(true);

    const { error } = await supabase
      .from("blocked_times")
      .delete()
      .eq("id", blockId);

    setSaving(false);

    if (error) {
      setStatusMessage(error.message, "error");
      return;
    }

    setMonthBlocks((prev) => prev.filter((item) => item.id !== blockId));
    setStatusMessage("Sperrzeit gelöscht.", "success");
  };

  if (loading && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#f6efe5] px-6 py-16 text-stone-800">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          Admin-Bereich wird geladen...
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f6efe5] px-6 py-16 text-stone-800">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <h1 className="text-2xl font-semibold text-stone-900">
            Kein Zugriff
          </h1>
          <p className="mt-3 text-stone-600">
            Du bist nicht als Admin freigeschaltet.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-2xl bg-[#405e3f] px-5 py-3 text-sm font-semibold text-white"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6efe5] text-stone-800">
      <header className="sticky top-0 z-50 border-b border-[#6f7d58] bg-[#7a8662]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="text-sm font-medium text-white hover:text-[#f5efe3]"
          >
            ← Zurück zur Startseite
          </Link>

          <div className="flex flex-col items-center">
            <img
              src="/logo-christina-massage.png"
              alt="Christina Massage Logo"
              className="h-14 w-auto object-contain sm:h-16 md:h-20"
            />
          </div>

          <button
            onClick={handleLogout}
            className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-stone-800"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="px-4 py-6 sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-900">
              Monatskalender & Terminverwaltung
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              Eingeloggt als: <strong>{sessionEmail}</strong>
            </p>

            {message && (
              <div
                className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${messageStyles}`}
              >
                {message}
              </div>
            )}
          </div>

          <MonthlyCalendar
            visibleMonth={visibleMonth}
            selectedDate={selectedDate}
            onPrevMonth={() =>
              setVisibleMonth(
                new Date(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth() - 1,
                  1
                )
              )
            }
            onNextMonth={() =>
              setVisibleMonth(
                new Date(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth() + 1,
                  1
                )
              )
            }
            onSelectDate={(date) => setSelectedDate(date)}
            getDayMeta={(date) =>
              getDayStatus(
                date,
                bookingsByDate[date] || [],
                blocksByDate[date] || [],
                45
              )
            }
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-2xl font-semibold text-stone-900">
                Tagesdetails am {selectedDate}
              </h2>

              <div className="mt-5 space-y-4">
                {selectedDayEvents.length === 0 ? (
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
                    Für dieses Datum liegen noch keine Buchungen oder Sperrzeiten vor.
                  </div>
                ) : (
                  selectedDayEvents.map((event, index) => (
                    <div
                      key={`${event.type}-${event.start}-${index}`}
                      className={`rounded-2xl border p-4 ${
                        event.type === "booking"
                          ? "border-red-200 bg-red-50"
                          : "border-red-300 bg-red-100"
                      }`}
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="text-lg font-semibold text-stone-900">
                            {event.start} – {event.end}
                          </div>
                          <div className="mt-1 text-sm text-stone-700">
                            {event.title}
                          </div>
                          {event.subtitle && (
                            <div className="mt-1 text-sm text-stone-600">
                              {event.subtitle}
                            </div>
                          )}
                        </div>

                        {event.type === "booking" && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() =>
                                updateBookingStatus(
                                  (selectedDayBookings[index]?.id || "") as string,
                                  "confirmed"
                                )
                              }
                              disabled={saving || !selectedDayBookings[index]?.id}
                              className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                              Bestätigen
                            </button>
                            <button
                              onClick={() =>
                                updateBookingStatus(
                                  (selectedDayBookings[index]?.id || "") as string,
                                  "cancelled"
                                )
                              }
                              disabled={saving || !selectedDayBookings[index]?.id}
                              className="rounded-xl bg-red-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                              Stornieren
                            </button>
                          </div>
                        )}

                        {event.type === "block" && (
                          <button
                            onClick={() =>
                              deleteBlockedTime(
                                (selectedDayBlocks.find(
                                  (block) =>
                                    block.start_time === event.start &&
                                    block.end_time === event.end &&
                                    block.title === event.title
                                )?.id || "") as string
                              )
                            }
                            disabled={saving}
                            className="rounded-xl bg-red-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                          >
                            Löschen
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="text-2xl font-semibold text-stone-900">
                  Pause / Urlaub / WhatsApp-Termin blockieren
                </h2>

                <form onSubmit={createBlockedTime} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">
                      Datum
                    </label>
                    <input
                      type="date"
                      value={blockDate}
                      onChange={(e) => setBlockDate(e.target.value)}
                      className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-[#567a57]"
                    />
                  </div>

                  <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={isFullDay}
                      onChange={(e) => setIsFullDay(e.target.checked)}
                    />
                    Ganzen Tag blockieren
                  </label>

                  {!isFullDay && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                          Startzeit
                        </label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-[#567a57]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                          Endzeit
                        </label>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-[#567a57]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">
                      Titel
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-[#567a57]"
                      placeholder="z. B. Mittagspause oder WhatsApp-Termin"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">
                      Typ
                    </label>
                    <select
                      value={blockType}
                      onChange={(e) => setBlockType(e.target.value)}
                      className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-[#567a57]"
                    >
                      <option value="pause">Pause</option>
                      <option value="closed">Geschlossen</option>
                      <option value="vacation">Urlaub</option>
                      <option value="manual-booking">WhatsApp / Persönlicher Termin</option>
                      <option value="other">Sonstiges</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">
                      Notiz
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-[#567a57]"
                      rows={4}
                      placeholder="Optional"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full rounded-2xl bg-[#405e3f] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    Sperrzeit speichern
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}