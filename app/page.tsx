"use client";

import { useMemo, useRef, useState } from "react";

type Language = "de" | "hu";

type MassageItem = {
  title: string;
  description: string;
  durations: string[];
};

export default function ChristinaMassageWebsite() {
  const [language, setLanguage] = useState<Language>("de");
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollServices = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.88;
    sliderRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const content = useMemo(() => {
    const de = {
      brand: {
        name: "Christina Massage",
        city: "Hohenpeißenberg",
        phoneDisplay: "0172 2664648",
        phoneLink: "01722664648",
        whatsappLink:
          "https://wa.me/491722664648?text=Hallo%20ich%20möchte%20einen%20Termin%20vereinbaren",
        address: "Bahnhofstraße 21, 82383 Hohenpeißenberg",
      },
      nav: {
        about: "Über mich",
        services: "Massagen",
        special: "HIEMT",
        methods: "Zusatzangebote",
        expectations: "Warum Christina Massage",
        location: "Anfahrt",
        booking: "Termin buchen",
      },
      hero: {
        title: "Entspannung für Körper und Seele",
        subtitle:
          "Individuelle Behandlungen, ganzheitliche Begleitung und eine ruhige Atmosphäre für dein persönliches Wohlbefinden.",
        primary: "Termin buchen",
        secondary: "Anrufen oder WhatsApp",
      },
      about: {
        eyebrow: "Über mich",
        title: "Mit Erfahrung, Feingefühl und echter Aufmerksamkeit",
        text: [
          "Die Harmonie von Bewegung und Körper ist nicht nur mein Beruf, sondern meine Lebensphilosophie.",
          "Die Liebe zu Sport und Bewegung prägt mein Leben seit meiner Kindheit. Meine berufliche Laufbahn begann ich 2007 als Trainerin, und seither bin ich fasziniert von der erstaunlichen Widerstandsfähigkeit des menschlichen Körpers.",
          "Seit über 10 Jahren helfe ich meinen Gästen, dem Alltagsstress zu entfliehen. Bei jeder Behandlung stelle ich die individuellen Bedürfnisse in den Vordergrund, um ein persönliches Massageerlebnis zu schaffen.",
          "Ob Muskelentspannung, Stressabbau, Regeneration oder Erholung – ich passe jede Behandlung individuell an.",
          "Ich glaube, dass Massage mehr ist als nur eine körperliche Behandlung. Sie ist eine wertvolle Auszeit – ein Moment der Ruhe, in dem der Alltag von uns abfällt und wir inneren Frieden und Balance finden.",
          "Auch in meinem Leben lege ich Wert auf die Harmonie von Körper, Seele und Geist und begegne meinen Gästen mit dieser Philosophie.",
        ],
      },
      services: {
        eyebrow: "Massagen",
        title: "Massagen individuell auf dich abgestimmt",
        text:
          "Mit den Pfeilen kannst du durch die Behandlungen klicken. Auf dem Handy kannst du einfach wischen.",
        button: "Termin buchen",
        items: [
          {
            title: "Schwedische Massage",
            description:
              "Eine klassische Massage zur Lockerung der Muskulatur, zur Förderung der Durchblutung und für tiefgehende Entspannung.",
            durations: ["60 Min · 60 €", "90 Min · 90 €", "120 Min · 120 €"],
          },
          {
            title: "Rücken- & Nackenmassage",
            description:
              "Gezielte Behandlung bei Verspannungen im oberen Rücken-, Schulter- und Nackenbereich.",
            durations: ["45 Min · 45 €", "60 Min · 60 €", "75 Min · 75 €"],
          },
          {
            title: "Individuelle Massage",
            description:
              "Die Behandlung wird auf deine persönlichen Beschwerden, Wünsche und Bedürfnisse abgestimmt.",
            durations: ["60 Min · 60 €", "90 Min · 90 €", "120 Min · 120 €"],
          },
          {
            title: "Fußmassage",
            description:
              "Wohltuende Behandlung für beanspruchte Füße zur Entlastung und tiefen Entspannung.",
            durations: ["45 Min · 45 €", "60 Min · 60 €"],
          },
          {
            title: "Lymphdrainage",
            description:
              "Sanfte Behandlung zur Unterstützung des Lymphflusses und für ein leichteres Körpergefühl.",
            durations: ["60 Min · 60 €", "90 Min · 90 €"],
          },
          {
            title: "Vagus / Stressabbau",
            description:
              "Eine beruhigende Behandlung mit Fokus auf Regeneration, Nervensystem und Entspannung.",
            durations: ["45 Min · 45 €", "60 Min · 60 €"],
          },
          {
            title: "Champi – Indische Kopfmassage",
            description:
              "Sanfte und zugleich intensive Entspannung für Kopf, Nacken und Geist.",
            durations: ["45 Min · 45 €", "60 Min · 60 €"],
          },
        ] as MassageItem[],
      },
      methods: {
        eyebrow: "Zusatzangebote",
        title: "Therapeutische und ergänzende Behandlungen",
        cards: [
          {
            title: "FDM Behandlung",
            text:
              "Das Fasziendistorsionsmodell ist eine moderne und effektive Behandlungsmethode zur gezielten Linderung von Schmerzen im Bewegungsapparat. Durch spezifische manuelle Techniken werden Störungen und Verklebungen im Fasziengewebe gelöst, wodurch sich Beweglichkeit und Wohlbefinden deutlich verbessern können.",
            price: "60 Min · 60 €",
          },
          {
            title: "Flossing",
            text:
              "Flossing ist eine moderne physiotherapeutische Behandlung, die gezielt auf Faszien, Muskeln und Gelenke wirkt. Mithilfe eines speziellen Gummibandes wird das betroffene Körperareal kurzzeitig komprimiert und anschließend wieder entlastet. Dieser Prozess fördert die Durchblutung, löst Verklebungen im Gewebe und kann Schmerzen effektiv reduzieren. Die Behandlung unterstützt die Beweglichkeit, Regeneration und Schmerzlinderung – besonders bei Verspannungen, Bewegungseinschränkungen, Schwellungen oder Narbengewebe.",
            price: "30 / 45 / 60 Min · 30 € / 45 € / 60 €",
          },
          {
            title: "Schröpfen",
            text:
              "Schröpfen ist eine bewährte Methode zur Förderung der Durchblutung, zur Lösung von Verspannungen und zur Unterstützung des Stoffwechsels. Die Behandlung wirkt tief im Gewebe und kann besonders bei muskulären Beschwerden und hartnäckigen Spannungen sehr wohltuend sein.",
            price: "30 Min · 30 €",
          },
        ],
      },
      special: {
        eyebrow: "Sonderleistung",
        title: "HIEMT Beckenboden-Training",
        text:
          "Eine besondere Zusatzleistung zur gezielten Unterstützung des Beckenbodens – diskret, modern und bequem in den Alltag integrierbar.",
        bullets: [
          "30 Minuten pro Sitzung",
          "Anwendung nur in Kleidung",
          "Nicht-invasive Behandlung",
          "Gezielte Aktivierung und Stärkung des Beckenbodens",
        ],
        trialLabel: "Probesitzung",
        trialPrice: "30 €",
        packLabel: "10er Karte",
        packPrice: "280 €",
        note:
          "Ideal für alle, die ihren Beckenboden gezielt stärken und ihr Körpergefühl nachhaltig verbessern möchten.",
      },
      booking: {
        eyebrow: "Online Buchung",
        title: "Termin bequem online anfragen",
        text:
          "Wähle deine Behandlung, die passende Dauer und deinen Wunschtermin. Vor der Buchung ist eine Registrierung erforderlich.",
        button: "Zum Kalender",
      },
      expectations: {
        eyebrow: "Was dich bei Christina Massage erwartet",
        title: "Persönlich, ruhig und achtsam begleitet",
        items: [
          {
            title: "Individuelle Betreuung",
            text:
              "Jede Behandlung wird auf deine persönlichen Beschwerden und Bedürfnisse abgestimmt.",
          },
          {
            title: "Ganzheitlicher Blick",
            text:
              "Körper, Entspannung und Regeneration werden immer im Zusammenhang betrachtet.",
          },
          {
            title: "Ruhige Atmosphäre",
            text:
              "Ein Ort, an dem du loslassen, durchatmen und neue Energie tanken kannst.",
          },
        ],
      },
      location: {
        eyebrow: "Anfahrt",
        title: "So findest du mich",
      },
      footer: {
        text: "© 2026 Christina Massage",
      },
    };

    const hu = de;
    return language === "de" ? de : hu;
  }, [language]);

  const c = content as any;

  return (
    <div className="min-h-screen bg-[#f6efe5] text-stone-800">
      <header className="sticky top-0 z-50 border-b border-[#d9cfbf] bg-[#f6efe5]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <nav className="hidden items-center gap-8 text-sm text-stone-700 lg:flex">
            <a href="#ueber" className="hover:text-stone-900">{c.nav.about}</a>
            <a href="#leistungen" className="hover:text-stone-900">{c.nav.services}</a>
            <a href="#special" className="hover:text-stone-900">{c.nav.special}</a>
          </nav>

          <div className="flex flex-col items-center">
            <img
              src="/logo-christina-massage.png"
              alt="Christina Massage Logo"
              className="h-16 w-auto object-contain md:h-20"
            />
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-stone-500">
              {c.brand.city}
            </p>
          </div>

          <div className="hidden items-center gap-8 text-sm text-stone-700 lg:flex">
            <a href="#zusatzangebote" className="hover:text-stone-900">{c.nav.methods}</a>
            <a href="#anfahrt" className="hover:text-stone-900">{c.nav.location}</a>
            <a href="/booking" className="rounded-full border border-[#405e3f] px-5 py-2.5 font-medium text-[#405e3f] hover:bg-[#405e3f] hover:text-white">
              {c.nav.booking}
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl justify-end px-6 pb-3 lg:px-10">
          <div className="rounded-full border border-stone-300 bg-white/80 p-1">
            <button
              onClick={() => setLanguage("de")}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                language === "de" ? "bg-stone-800 text-white" : "text-stone-700"
              }`}
            >
              DE
            </button>
            <button
              onClick={() => setLanguage("hu")}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                language === "hu" ? "bg-stone-800 text-white" : "text-stone-700"
              }`}
            >
              HU
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(64,94,63,0.22),rgba(64,94,63,0.18))]" />
        <img
          src="/massage-hero.png"
          alt="Massage Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center lg:px-10">
          <h1 className="max-w-5xl text-4xl font-light tracking-wide text-white md:text-7xl">
            {c.hero.title}
          </h1>
          <div className="mt-8 h-px w-40 bg-white/50" />
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/90 md:text-2xl">
            {c.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/booking"
              className="rounded-none border border-[#d6b36a] bg-[#d6b36a] px-10 py-4 text-base font-medium text-stone-900 transition hover:opacity-90"
            >
              {c.hero.primary}
            </a>
            <a
              href={c.brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-none border border-white/60 px-10 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              {c.hero.secondary}
            </a>
          </div>
        </div>
      </section>

      <section id="ueber" className="bg-[#f8f2e9] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
            <img
              src="/christina-about.jpg"
              alt="Christina"
              className="h-full min-h-[520px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {c.about.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {c.about.title}
            </h2>

            <div className="mt-8 rounded-[2rem] bg-white/80 p-8 shadow-sm">
              <div className="space-y-5 text-base leading-8 text-stone-700">
                {c.about.text.map((paragraph: string) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="special" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="overflow-hidden rounded-[2.2rem] border border-stone-200 bg-white shadow-[0_30px_80px_rgba(120,100,80,0.12)]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-[#16212a]">
                <img
                  src="/hiemt-pad.jpg"
                  alt="HIEMT Gerät"
                  className="h-full min-h-[360px] w-full object-cover"
                />
              </div>

              <div className="bg-[#f8f5ef] p-8 md:p-10">
                <div className="inline-flex rounded-full bg-[#dfe6da] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-stone-700">
                  {c.special.eyebrow}
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
                  {c.special.title}
                </h2>

                <p className="mt-5 text-lg leading-8 text-stone-600">
                  {c.special.text}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {c.special.bullets.map((bullet: string) => (
                    <div
                      key={bullet}
                      className="rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-700 shadow-sm"
                    >
                      {bullet}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.6rem] bg-[#567a57] p-6 text-white">
                    <div className="text-sm uppercase tracking-[0.18em] text-white/70">
                      {c.special.trialLabel}
                    </div>
                    <div className="mt-2 text-3xl font-semibold">
                      {c.special.trialPrice}
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] bg-[#a8b79a] p-6 text-stone-900">
                    <div className="text-sm uppercase tracking-[0.18em] text-stone-700">
                      {c.special.packLabel}
                    </div>
                    <div className="mt-2 text-3xl font-semibold">
                      {c.special.packPrice}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-stone-300 p-5 text-sm leading-7 text-stone-600">
                  {c.special.note}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {c.services.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {c.services.title}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">
              {c.services.text}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => scrollServices("left")}
              className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-300 bg-white/90 p-4 text-stone-700 shadow-md transition hover:bg-white lg:flex"
            >
              <span className="text-2xl leading-none">‹</span>
            </button>

            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {c.services.items.map((service: MassageItem) => (
                <div
                  key={service.title}
                  className="min-w-[88%] snap-center md:min-w-[78%] lg:min-w-[86%]"
                >
                  <div className="relative mx-auto grid min-h-[540px] overflow-hidden rounded-[2.2rem] md:grid-cols-[0.95fr_1.25fr]">
                    <div className="relative z-10 flex items-center justify-center px-8 py-10 md:px-10">
                      <div className="absolute left-0 top-1/2 hidden h-[300px] w-[430px] -translate-y-1/2 rounded-[2rem] bg-[#cfd5cb] md:block" />
                      <div className="relative z-10 w-full max-w-[380px] rounded-[2rem] bg-[#cfd5cb] p-10 text-center shadow-sm md:-mr-12">
                        <h3 className="text-4xl font-medium leading-tight text-stone-800">
                          {service.title}
                        </h3>
                        <p className="mt-6 leading-8 text-stone-700">
                          {service.description}
                        </p>

                        <div className="mt-6 space-y-2 text-sm font-medium text-stone-700">
                          {service.durations.map((duration) => (
                            <div key={duration}>{duration}</div>
                          ))}
                        </div>

                        <a
                          href="/booking"
                          className="mt-8 inline-block rounded-none bg-[#405e3f] px-8 py-4 text-base font-medium text-white transition hover:-translate-y-0.5"
                        >
                          {c.services.button}
                        </a>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(120,100,80,0.12)]">
                      <img
                        src="/massage-hero.png"
                        alt={service.title}
                        className="h-full min-h-[440px] w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollServices("right")}
              className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-300 bg-white/90 p-4 text-stone-700 shadow-md transition hover:bg-white lg:flex"
            >
              <span className="text-2xl leading-none">›</span>
            </button>
          </div>
        </div>
      </section>

      <section id="zusatzangebote" className="bg-[#f8f2e9] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {c.methods.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {c.methods.title}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {c.methods.cards.map((card: any) => (
              <div
                key={card.title}
                className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-stone-900">
                  {card.title}
                </h3>
                <p className="mt-5 leading-8 text-stone-600">{card.text}</p>
                <div className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#405e3f]">
                  {card.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
            {c.booking.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
            {c.booking.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">
            {c.booking.text}
          </p>

          <a
            href="/booking"
            className="mt-10 inline-block rounded-full bg-[#405e3f] px-8 py-4 text-base font-medium text-white hover:opacity-90"
          >
            {c.booking.button}
          </a>
        </div>
      </section>

      <section id="expectations" className="bg-[#f8f2e9] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {c.expectations.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {c.expectations.title}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.expectations.items.map((item: any) => (
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-stone-200 bg-white/80 p-7 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-stone-900">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="anfahrt" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {c.location.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {c.location.title}
            </h2>
          </div>

          <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#f8f1e6] px-4 pb-4 pt-4 shadow-sm">
            <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm">
              <iframe
                src="https://www.google.com/maps?q=Bahnhofstraße%2021,%2082383%20Hohenpeißenberg&output=embed"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Standort Christina Massage"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white/50 px-6 py-8 text-sm text-stone-500 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>{c.footer.text}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-800">Impressum</a>
            <a href="#" className="hover:text-stone-800">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}