"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Language = "de" | "hu";

type DurationOption = {
  duration: number;
  price: number;
};

type Service = {
  key: string;
  name: {
    de: string;
    hu: string;
  };
  options: DurationOption[];
};

const services: Service[] = [
  {
    key: "swedish",
    name: {
      de: "Schwedische Massage",
      hu: "Svédmasszázs",
    },
    options: [
      { duration: 60, price: 60 },
      { duration: 90, price: 90 },
      { duration: 120, price: 120 },
    ],
  },
  {
    key: "back-neck",
    name: {
      de: "Rücken / Nacken",
      hu: "Hát / Nyak",
    },
    options: [
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
      { duration: 75, price: 75 },
    ],
  },
  {
    key: "individual",
    name: {
      de: "Individualmassage",
      hu: "Egyéni masszázs",
    },
    options: [
      { duration: 60, price: 60 },
      { duration: 90, price: 90 },
      { duration: 120, price: 120 },
    ],
  },
  {
    key: "foot",
    name: {
      de: "Fußmassage",
      hu: "Talpmasszázs",
    },
    options: [
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
    ],
  },
  {
    key: "lymph",
    name: {
      de: "Lymphdrainage",
      hu: "Nyirokmasszázs",
    },
    options: [
      { duration: 60, price: 60 },
      { duration: 90, price: 90 },
    ],
  },
  {
    key: "vagus",
    name: {
      de: "Vagus / Stressabbau",
      hu: "Vagus / stresszoldás",
    },
    options: [
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
    ],
  },
  {
    key: "champi",
    name: {
      de: "Champi – Indische Kopfmassage",
      hu: "Champi – indiai fejmasszázs",
    },
    options: [
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
    ],
  },
  {
    key: "fdm",
    name: {
      de: "FDM Behandlung",
      hu: "FDM kezelés",
    },
    options: [{ duration: 60, price: 60 }],
  },
  {
    key: "flossing",
    name: {
      de: "Flossing",
      hu: "Flossing",
    },
    options: [
      { duration: 30, price: 30 },
      { duration: 45, price: 45 },
      { duration: 60, price: 60 },
    ],
  },
  {
    key: "cupping",
    name: {
      de: "Schröpfen",
      hu: "Köpölyözés",
    },
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

type StatusType = "success" | "error" | "info";

export default function BookingPage() {
  const router = useRouter();

  const [language, setLanguage] = useState<Language>("de");
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
  const [messageType, setMessageType] = useState<StatusType>("info");

  const t = useMemo(() => {
    return {
      back: language === "de" ? "Zurück zur Startseite" : "Vissza a főoldalra",
      onlineBooking:
        language === "de" ? "Online Buchung" : "Online foglalás",
      title: language === "de" ? "Termin buchen" : "Időpontfoglalás",
      subtitle:
        language === "de"
          ? "Wähle deine Behandlung, die passende Dauer und einen freien Termin."
          : "Válaszd ki a kezelést, az időtartamot és egy szabad időpontot.",
      liveConnected:
        language === "de" ? "Live verbunden" : "Élő kapcsolat",
      step1:
        language === "de" ? "1. Behandlung wählen" : "1. Kezelés kiválasztása",
      step2:
        language === "de" ? "2. Dauer auswählen" : "2. Időtartam kiválasztása",
      step3:
        language === "de"
          ? "3. Datum & Uhrzeit auswählen"
          : "3. Dátum és időpont kiválasztása",
      conditionsTitle:
        language === "de"
          ? "Buchungs- und Stornobedingungen"
          : "Foglalási és lemondási feltételek",
      conditionsText:
        language === "de"
          ? "Termine können bis 24 Stunden vorher kostenfrei abgesagt werden. Bei späterer Absage oder Nichterscheinen kann eine Ausfallpauschale von 10 € berechnet werden."
          : "Az időpontok legkésőbb 24 órával korábban díjmentesen lemondhatók. Későbbi lemondás vagy meg nem jelenés esetén 10 € rendelkezésre állási díj számítható fel.",
      authTitle:
        language === "de"
          ? "4. Einloggen oder registrieren"
          : "4. Bejelentkezés vagy regisztráció",
      authText:
        language === "de"
          ? "Vor der Buchung ist ein Konto nötig."
          : "Foglalás előtt fiók szükséges.",
      authButton:
        language === "de"
          ? "Einloggen / Registrieren"
          : "Bejelentkezés / Regisztráció",
      loggedInAs:
        language === "de" ? "Eingeloggt als" : "Bejelentkezve mint",
      loggedInText:
        language === "de"
          ? "Du kannst jetzt deinen Termin verbindlich anfragen."
          : "Most már véglegesítheted az időpontfoglalási kérelmedet.",
      logout: language === "de" ? "Logout" : "Kijelentkezés",
      acceptTerms:
        language === "de"
          ? "Ich akzeptiere die Buchungs- und Stornobedingungen. Eine kostenfreie Absage ist bis 24 Stunden vorher möglich. Bei späterer Absage oder Nichterscheinen kann eine Ausfallpauschale von 10 € berechnet werden."
          : "Elfogadom a foglalási és lemondási feltételeket. Az időpont legkésőbb 24 órával korábban díjmentesen lemondható. Későbbi lemondás vagy meg nem jelenés esetén 10 € díj számítható fel.",
      summary: language === "de" ? "Zusammenfassung" : "Összegzés",
      service: language === "de" ? "Behandlung" : "Kezelés",
      durationPrice:
        language === "de" ? "Dauer & Preis" : "Időtartam és ár",
      appointment: language === "de" ? "Termin" : "Időpont",
      choosePlease:
        language === "de" ? "Bitte wählen" : "Kérjük válassz",
      requestNow:
        language === "de" ? "Termin jetzt anfragen" : "Időpont kérése",
      saving: language === "de" ? "Wird gespeichert..." : "Mentés...",
      myBookings: language === "de" ? "Meine Termine" : "Időpontjaim",
      myBookingsText:
        language === "de"
          ? "Bereits gebuchte Termine kannst du unter /my-bookings verwalten und stornieren."
          : "A már lefoglalt időpontokat a /my-bookings oldalon kezelheted és lemondhatod.",
      close: language === "de" ? "Schließen" : "Bezárás",
      account: language === "de" ? "Konto" : "Fiók",
      register: language === "de" ? "Registrieren" : "Regisztráció",
      login: language === "de" ? "Einloggen" : "Bejelentkezés",
      name: language === "de" ? "Name" : "Név",
      email: "E-Mail",
      password: language === "de" ? "Passwort" : "Jelszó",
      fullNamePlaceholder:
        language === "de" ? "Vor- und Nachname" : "Teljes név",
      emailPlaceholder:
        language === "de" ? "deine@email.de" : "email@pelda.hu",
      passwordPlaceholder:
        language === "de" ? "Passwort" : "Jelszó",
      alreadyHaveAccount:
        language === "de"
          ? "Schon ein Konto? Jetzt einloggen"
          : "Van már fiókod? Bejelentkezés",
      noAccount:
        language === "de"
          ? "Noch kein Konto? Jetzt registrieren"
          : "Még nincs fiókod? Regisztráció",
      unavailable:
        language === "de" ? "Nicht verfügbar" : "Nem elérhető",
      selected: language === "de" ? "Ausgewählt" : "Kiválasztva",
      free: language === "de" ? "Frei" : "Szabad",
    };
  }, [language]);

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

  const setStatusMessage = (text: string, type: StatusType = "info") => {
    setMessage(text);
    setMessageType(type);
  };

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
        if (session.user.user_metadata?.full_name) {
          setFullName(session.user.user_metadata.full_name);
        }
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
    setStatusMessage("", "info");
    setLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        setStatusMessage(
          language === "de"
            ? "Bitte E-Mail und Passwort eingeben."
            : "Kérjük add meg az email címet és a jelszót.",
          "error"
        );
        return;
      }

      if (isRegisterMode) {
        if (!fullName.trim()) {
          setStatusMessage(
            language === "de"
              ? "Bitte deinen Namen eingeben."
              : "Kérjük add meg a nevedet.",
            "error"
          );
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { full_name: fullName.trim() },
          },
        });

        if (error) {
          setStatusMessage(error.message, "error");
          return;
        }

        setShowAuth(false);
        setStatusMessage(
          language === "de"
            ? "Registrierung erfolgreich. Falls E-Mail-Bestätigung aktiv ist, prüfe bitte dein Postfach."
            : "Sikeres regisztráció. Ha az email megerősítés aktív, kérjük ellenőrizd a postaládádat.",
          "success"
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setStatusMessage(error.message, "error");
          return;
        }

        setShowAuth(false);
        setStatusMessage(
          language === "de"
            ? "Erfolgreich eingeloggt."
            : "Sikeres bejelentkezés.",
          "success"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async () => {
    setStatusMessage("", "info");

    if (!bookingReady) {
      setStatusMessage(
        language === "de"
          ? "Bitte einloggen, AGB bestätigen und einen freien Termin auswählen."
          : "Kérjük jelentkezz be, fogadd el a feltételeket és válassz szabad időpontot.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setStatusMessage(
          language === "de"
            ? "Bitte zuerst einloggen."
            : "Kérjük először jelentkezz be.",
          "error"
        );
        return;
      }

      const finalName =
        fullName || user.user_metadata?.full_name || "Unbekannter Kunde";

      const serviceName = selectedService.name[language];

      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        full_name: finalName,
        email: user.email ?? email.trim(),
        service_name: serviceName,
        duration_minutes: selectedOption.duration,
        price_eur: selectedOption.price,
        booking_date: bookingDate,
        booking_time: selectedSlotTime,
        accepted_terms: acceptedTerms,
        status: "requested",
      });

      if (error) {
        if ((error as any).code === "23505") {
          setStatusMessage(
            language === "de"
              ? "Dieser Termin wurde gerade von jemand anderem gebucht. Bitte wähle eine andere Uhrzeit."
              : "Ezt az időpontot éppen most más foglalta le. Kérjük válassz másik időpontot.",
            "error"
          );
        } else {
          setStatusMessage(error.message, "error");
        }
        return;
      }

      setBookedSlots((prev) =>
        prev.includes(selectedSlotTime!) ? prev : [...prev, selectedSlotTime!]
      );

      try {
        await fetch("/api/send-booking-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: user.email ?? email.trim(),
            fullName: finalName,
            serviceName,
            duration: selectedOption.duration,
            price: selectedOption.price,
            bookingDate,
            bookingTime: selectedSlotTime,
            language,
          }),
        });
      } catch {
        // Mailversand ist optional und soll die Buchung nicht blockieren
      }

      setStatusMessage(
        language === "de"
          ? "Dein Termin wurde erfolgreich angefragt."
          : "Az időpontkérés sikeresen elküldve.",
        "success"
      );

      setSelectedSlotTime(null);
      setAcceptedTerms(false);

      setTimeout(() => {
        router.push("/my-bookings");
      }, 900);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAcceptedTerms(false);
    setStatusMessage(
      language === "de" ? "Erfolgreich ausgeloggt." : "Sikeres kijelentkezés.",
      "success"
    );
  };

  const messageStyles =
    messageType === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : messageType === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : "border-stone-200 bg-stone-50 text-stone-700";

  return (
    <div className="min-h-screen bg-[#f6efe5] text-stone-800">
      <header className="sticky top-0 z-50 border-b border-[#6f7d58] bg-[#7a8662]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="text-sm font-medium text-white hover:text-[#f5efe3]"
          >
            ← {t.back}
          </Link>

          <div className="flex flex-col items-center">
            <img
              src="/logo-christina-massage.png"
              alt="Christina Massage Logo"
              className="h-16 w-auto object-contain md:h-20"
            />
          </div>

          <div className="rounded-full border border-[#d8d0c2] bg-white/90 p-1">
            <button
              onClick={() => setLanguage("de")}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                language === "de"
                  ? "bg-stone-800 text-white"
                  : "text-stone-700"
              }`}
            >
              DE
            </button>
            <button
              onClick={() => setLanguage("hu")}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                language === "hu"
                  ? "bg-stone-800 text-white"
                  : "text-stone-700"
              }`}
            >
              HU
            </button>
          </div>
        </div>
      </header>

      <div className="min-h-[calc(100vh-88px)] p-6 md:p-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="border-b border-stone-200 px-6 py-5 md:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
                    {t.onlineBooking}
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
                    {t.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-stone-600 md:text-base">
                    {t.subtitle}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#eef3e6] px-4 py-3 text-sm font-medium text-[#556246]">
                  {t.liveConnected}
                </div>
              </div>
            </div>

            <div className="grid gap-8 px-6 py-6 md:px-8 md:py-8">
              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  {t.step1}
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {services.map((service, index) => (
                    <button
                      key={service.key}
                      onClick={() => {
                        setSelectedServiceIndex(index);
                        setSelectedOptionIndex(0);
                      }}
                      className={`rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                        index === selectedServiceIndex
                          ? "border-[#405e3f] bg-[#405e3f] text-white"
                          : "border-stone-200 bg-white text-stone-900"
                      }`}
                    >
                      <div className="text-base font-semibold">
                        {service.name[language]}
                      </div>
                      <div
                        className={`mt-2 text-sm ${
                          index === selectedServiceIndex
                            ? "text-white/70"
                            : "text-stone-500"
                        }`}
                      >
                        {service.options.map((o) => `${o.duration} Min`).join(" / ")}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  {t.step2}
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {selectedService.options.map((option, index) => (
                    <button
                      key={`${selectedService.key}-${option.duration}`}
                      onClick={() => setSelectedOptionIndex(index)}
                      className={`rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                        index === selectedOptionIndex
                          ? "border-[#567a57] bg-[#eef3e6] text-[#2e3a28]"
                          : "border-stone-200 bg-white text-stone-900"
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
                  <h2 className="text-lg font-semibold text-stone-900">
                    {t.step3}
                  </h2>

                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-700 outline-none focus:border-[#567a57]"
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
                            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400"
                            : selectedSlotTime === slot.time
                            ? "border-[#567a57] bg-[#eef3e6] text-[#2e3a28] shadow-sm"
                            : "border-stone-200 bg-white text-stone-900 hover:border-stone-400"
                        }`}
                      >
                        <div className="text-lg font-semibold">{slot.time}</div>
                        <div className="mt-1 text-xs uppercase tracking-wide">
                          {unavailable
                            ? t.unavailable
                            : selectedSlotTime === slot.time
                            ? t.selected
                            : t.free}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="font-semibold text-amber-900">
                  {t.conditionsTitle}
                </h3>
                <p className="mt-1 text-sm leading-6 text-amber-800">
                  {t.conditionsText}
                </p>
              </div>

              {!isLoggedIn ? (
                <div className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900">
                        {t.authTitle}
                      </h3>
                      <p className="mt-1 text-sm text-stone-600">
                        {t.authText}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowAuth(true);
                        setStatusMessage("", "info");
                      }}
                      className="rounded-2xl bg-[#405e3f] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      {t.authButton}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-[#cfd8bf] bg-[#eef3e6] p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2e3a28]">
                        {t.loggedInAs} {sessionEmail}
                      </h3>
                      <p className="mt-1 text-sm text-[#556246]">
                        {t.loggedInText}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-stone-800"
                    >
                      {t.logout}
                    </button>
                  </div>

                  <label className="mt-4 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded"
                    />
                    <span>{t.acceptTerms}</span>
                  </label>
                </div>
              )}

              {message && (
                <div className={`rounded-2xl border px-4 py-3 text-sm ${messageStyles}`}>
                  {message}
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-[#405e3f] p-6 text-white shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                {t.summary}
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-[#d6e2cf] bg-white/10 p-4">
                  <div className="text-sm text-white/70">{t.service}</div>
                  <div className="mt-1 text-lg font-semibold">
                    {selectedService.name[language]}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#d6e2cf] bg-white/10 p-4">
                  <div className="text-sm text-white/70">{t.durationPrice}</div>
                  <div className="mt-1 text-lg font-semibold">
                    {selectedOption.duration} Min
                  </div>
                  <div className="text-white/80">{selectedOption.price} €</div>
                </div>

                <div className="rounded-2xl border border-[#d6e2cf] bg-white/10 p-4">
                  <div className="text-sm text-white/70">{t.appointment}</div>
                  <div className="mt-1 text-lg font-semibold">
                    {bookingDate || "-"}
                  </div>
                  <div className="text-white/80">
                    {selectedSlotTime
                      ? `${selectedSlotTime} Uhr`
                      : t.choosePlease}
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookingSubmit}
                disabled={!bookingReady || loading}
                className={`mt-6 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  bookingReady && !loading
                    ? "bg-white text-[#405e3f] hover:opacity-90"
                    : "cursor-not-allowed bg-white/20 text-white/60"
                }`}
              >
                {loading ? t.saving : t.requestNow}
              </button>

              <Link
                href="/my-bookings"
                className="mt-4 block text-center text-sm underline text-white/80 hover:text-white"
              >
                {t.myBookings}
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-semibold text-stone-900">
                {t.myBookings}
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {t.myBookingsText}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
                  {t.account}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900">
                  {isRegisterMode ? t.register : t.login}
                </h2>
              </div>

              <button
                onClick={() => setShowAuth(false)}
                className="rounded-xl bg-stone-100 px-3 py-2 text-sm text-stone-700"
              >
                {t.close}
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-[#567a57]"
                    placeholder={t.fullNamePlaceholder}
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-[#567a57]"
                  placeholder={t.emailPlaceholder}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  {t.password}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-[#567a57]"
                  placeholder={t.passwordPlaceholder}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#405e3f] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading
                  ? t.saving
                  : isRegisterMode
                  ? t.register
                  : t.login}
              </button>
            </form>

            <button
              onClick={() => setIsRegisterMode((prev) => !prev)}
              className="mt-4 text-sm text-stone-600 underline"
            >
              {isRegisterMode ? t.alreadyHaveAccount : t.noAccount}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}