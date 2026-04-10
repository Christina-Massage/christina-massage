"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type DurationOption = {
  duration: number;
  price: number;
};

type Service = {
  name: string;
  options: DurationOption[];
};

const services: Service[] = [
  {
    name: "Schwedische Massage",
    options: [
      { duration: 60, price: 60 },
      { duration: 90, price: 90 },
      { duration: 120, price: 120 },
    ],
  },
  {
    name: "Rücken / Nacken",
    options: [
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
      { duration: 75, price: 75 },
    ],
  },
  {
    name: "Individuelle Massage",
    options: [
      { duration: 60, price: 60 },
      { duration: 90, price: 90 },
      { duration: 120, price: 120 },
    ],
  },
  {
    name: "Fußmassage",
    options: [
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
    ],
  },
  {
    name: "Lymphdrainage",
    options: [
      { duration: 60, price: 60 },
      { duration: 90, price: 90 },
    ],
  },
  {
    name: "Vagus / Stressabbau",
    options: [
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
    ],
  },
  {
    name: "Champi Indische Massage (Kopf)",
    options: [
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
    ],
  },
  {
    name: "FDM Behandlung",
    options: [{ duration: 60, price: 60 }],
  },
  {
    name: "Flossing",
    options: [
      { duration: 30, price: 30 },
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
    ],
  },
  {
    name: "Schröpfen",
    options: [{ duration: 30, price: 30 }],
  },
];

const slotTemplate = [
  { time: "10:00" },
  { time: "11:15" },
  { time: "12:30" },
  { time: "14:15" },
  { time: "15:30" },
  { time: "16:45" },
];

export default function BookingPage() {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionEmail, setSessionEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = `${today.getMonth() + 1}`.padStart(2, "0");
    const d = `${today.getDate()}`.padStart(2, "0");
    setBookingDate(`${y}-${m}-${d}`);
  }, []);

  const selectedService = services[selectedServiceIndex];
  const selectedOption = selectedService.options[selectedOptionIndex];

  const bookingReady = useMemo(() => {
    return isLoggedIn && acceptedTerms && !!selectedSlotTime && !!bookingDate;
  }, [isLoggedIn, acceptedTerms, selectedSlotTime, bookingDate]);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setIsLoggedIn(true);
        setSessionEmail(session.user.email ?? "");
        setEmail(session.user.email ?? "");
        if (session.user.user_metadata?.full_name) {
          setFullName(session.user.user_metadata.full_name);
        }
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setSessionEmail(session.user.email ?? "");
        setEmail(session.user.email ?? "");
      } else {
        setIsLoggedIn(false);
        setSessionEmail("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!bookingDate) return;

    const loadBookedSlots = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("booking_time")
        .eq("booking_date", bookingDate)
        .in("status", ["requested", "confirmed"]);

      if (!error && data) {
        setBookedSlots(data.map((item) => item.booking_time));
      }
    };

    loadBookedSlots();
  }, [bookingDate]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        setMessage("Bitte E-Mail und Passwort eingeben.");
        return;
      }

      if (isRegisterMode) {
        if (!fullName.trim()) {
          setMessage("Bitte deinen Namen eingeben.");
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        setShowAuth(false);
        setMessage(
          "Registrierung erfolgreich. Falls E-Mail-Bestätigung aktiv ist, prüfe bitte dein Postfach."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        setShowAuth(false);
        setMessage("Erfolgreich eingeloggt.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async () => {
    setMessage("");

    if (!bookingReady) {
      setMessage(
        "Bitte einloggen, AGB bestätigen und einen freien Termin auswählen."
      );
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Bitte zuerst einloggen.");
        return;
      }

      const finalName =
        fullName || user.user_metadata?.full_name || "Unbekannter Kunde";

      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        full_name: finalName,
        email: user.email ?? email,
        service_name: selectedService.name,
        duration_minutes: selectedOption.duration,
        price_eur: selectedOption.price,
        booking_date: bookingDate,
        booking_time: selectedSlotTime,
        accepted_terms: acceptedTerms,
        status: "requested",
      });

      if (error) {
        if ((error as any).code === "23505") {
          setMessage(
            "Dieser Termin wurde gerade von jemand anderem gebucht. Bitte wähle eine andere Uhrzeit."
          );
        } else {
          setMessage(error.message);
        }
        return;
      }

      setMessage("Termin erfolgreich angefragt.");
      setBookedSlots((prev) => [...prev, selectedSlotTime!]);
      setSelectedSlotTime(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAcceptedTerms(false);
    setMessage("Erfolgreich ausgeloggt.");
  };

  return (
    <div className="min-h-screen bg-[#f6efe5] p-6 md:p-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="border-b border-neutral-200 px-6 py-5 md:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Online Buchung
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
                  Termin buchen
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-neutral-600 md:text-base">
                  Wähle deine Behandlung, die passende Dauer und einen freien Termin.
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                Live verbunden
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-6 md:px-8 md:py-8">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                1. Behandlung wählen
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {services.map((service, index) => (
                  <button
                    key={service.name}
                    onClick={() => {
                      setSelectedServiceIndex(index);
                      setSelectedOptionIndex(0);
                    }}
                    className={`rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                      index === selectedServiceIndex
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white text-neutral-900"
                    }`}
                  >
                    <div className="text-base font-semibold">{service.name}</div>
                    <div
                      className={`mt-2 text-sm ${
                        index === selectedServiceIndex
                          ? "text-neutral-300"
                          : "text-neutral-500"
                      }`}
                    >
                      {service.options.map((o) => `${o.duration} Min`).join(" / ")}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                2. Dauer auswählen
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {selectedService.options.map((option, index) => (
                  <button
                    key={`${selectedService.name}-${option.duration}`}
                    onClick={() => setSelectedOptionIndex(index)}
                    className={`rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                      index === selectedOptionIndex
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                        : "border-neutral-200 bg-white text-neutral-900"
                    }`}
                  >
                    <div className="text-base font-semibold">
                      {option.duration} Min
                    </div>
                    <div className="mt-5 text-xl font-semibold">
                      {option.price} €
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-neutral-900">
                  3. Datum & Uhrzeit auswählen
                </h2>

                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm text-neutral-600 outline-none"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {slotTemplate.map((slot) => {
                  const unavailable = bookedSlots.includes(slot.time);

                  return (
                    <button
                      key={slot.time}
                      onClick={() => {
                        if (unavailable) return;
                        setSelectedSlotTime(slot.time);
                      }}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        unavailable
                          ? "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400"
                          : selectedSlotTime === slot.time
                          ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                          : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
                      }`}
                    >
                      <div className="text-lg font-semibold">{slot.time}</div>
                      <div className="mt-1 text-xs uppercase tracking-wide">
                        {unavailable
                          ? "Nicht verfügbar"
                          : selectedSlotTime === slot.time
                          ? "Ausgewählt"
                          : "Frei"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-amber-900">
                Buchungs- und Stornobedingungen
              </h3>
              <p className="mt-1 text-sm leading-6 text-amber-800">
                Termine können bis 24 Stunden vorher kostenfrei abgesagt werden.
                Bei späterer Absage oder Nichterscheinen kann eine Ausfallpauschale
                von 10 € berechnet werden.
              </p>
            </div>

            {!isLoggedIn ? (
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      4. Einloggen oder registrieren
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      Vor der Buchung ist ein Konto nötig.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowAuth(true);
                      setMessage("");
                    }}
                    className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Einloggen / Registrieren
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900">
                      Eingeloggt als {sessionEmail}
                    </h3>
                    <p className="mt-1 text-sm text-emerald-800">
                      Du kannst jetzt deinen Termin verbindlich anfragen.
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-neutral-800"
                  >
                    Logout
                  </button>
                </div>

                <label className="mt-4 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded"
                  />
                  <span>
                    Ich akzeptiere die Buchungs- und Stornobedingungen. Eine
                    kostenfreie Absage ist bis 24 Stunden vorher möglich. Bei
                    späterer Absage oder Nichterscheinen kann eine Ausfallpauschale
                    von 10 € berechnet werden.
                  </span>
                </label>
              </div>
            )}

            {message && (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
                {message}
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-neutral-900 p-6 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
              Zusammenfassung
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="text-sm text-neutral-400">Behandlung</div>
                <div className="mt-1 text-lg font-semibold">
                  {selectedService.name}
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="text-sm text-neutral-400">Dauer & Preis</div>
                <div className="mt-1 text-lg font-semibold">
                  {selectedOption.duration} Min
                </div>
                <div className="text-neutral-300">{selectedOption.price} €</div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="text-sm text-neutral-400">Termin</div>
                <div className="mt-1 text-lg font-semibold">{bookingDate || "-"}</div>
                <div className="text-neutral-300">
                  {selectedSlotTime ? `${selectedSlotTime} Uhr` : "Bitte wählen"}
                </div>
              </div>
            </div>

            <button
              onClick={handleBookingSubmit}
              disabled={!bookingReady || loading}
              className={`mt-6 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                bookingReady && !loading
                  ? "bg-white text-neutral-900 hover:opacity-90"
                  : "cursor-not-allowed bg-white/20 text-white/60"
              }`}
            >
              {loading ? "Wird gespeichert..." : "Termin jetzt anfragen"}
            </button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold text-neutral-900">
              Eigene Termine
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Bereits gebuchte Termine kannst du später unter <strong>/my-bookings</strong> verwalten und stornieren.
            </p>
          </div>
        </aside>
      </div>

      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                  Konto
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
                  {isRegisterMode ? "Registrieren" : "Einloggen"}
                </h2>
              </div>

              <button
                onClick={() => setShowAuth(false)}
                className="rounded-xl bg-neutral-100 px-3 py-2 text-sm text-neutral-700"
              >
                Schließen
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-400"
                    placeholder="Vor- und Nachname"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-400"
                  placeholder="deine@email.de"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Passwort
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-400"
                  placeholder="Passwort"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading
                  ? "Bitte warten..."
                  : isRegisterMode
                  ? "Registrieren"
                  : "Einloggen"}
              </button>
            </form>

            <button
              onClick={() => setIsRegisterMode((prev) => !prev)}
              className="mt-4 text-sm text-neutral-600 underline"
            >
              {isRegisterMode
                ? "Schon ein Konto? Jetzt einloggen"
                : "Noch kein Konto? Jetzt registrieren"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}