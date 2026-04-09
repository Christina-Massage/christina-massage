"use client";

import { useMemo, useRef, useState } from "react";

type Language = "de" | "hu";

type ServiceCard = {
  title: string;
  text: string;
};

export default function ChristinaMassageWebsite() {
  const [language, setLanguage] = useState<Language>("de");
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollServices = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.8;
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
        whatsappLink: "https://wa.me/491722664648",
        address: "Bahnhofstraße 21, 82383 Hohenpeißenberg",
      },
      nav: {
        services: "Angebot",
        special: "Sonderleistung",
        prices: "Preise",
        about: "Über mich",
        location: "Anfahrt",
        contact: "Kontakt",
      },
      hero: {
        badge: "Modern · Natürlich · Entspannend",
        title: "Ankommen. Loslassen. Wohlfühlen.",
        text:
          "Individuelle Massagen in Hohenpeißenberg für Entspannung, Regeneration und ein neues Gefühl von Leichtigkeit im Alltag.",
        primary: "Anrufen oder WhatsApp",
        secondary: "Angebot ansehen",
      },
      trustCards: [
        "Moderne, natürliche Atmosphäre",
        "Individuell abgestimmte Behandlungen",
        "30 oder 60 Minuten wählbar",
        "Ruhige Praxis in Hohenpeißenberg",
      ],
      heroCard: {
        eyebrow: "Ruhe & Regeneration",
        title: "Natürliches Wohlbefinden",
        text:
          "Gönn dir eine bewusste Auszeit vom Alltag. In ruhiger Atmosphäre kannst du abschalten, neue Energie tanken und deinem Körper genau die Aufmerksamkeit schenken, die er braucht.",
        item1: "30 Minuten",
        item1Price: "30 €",
        item2: "60 Minuten",
        item2Price: "60 €",
        note:
          "Jede Behandlung ist darauf ausgerichtet, dir spürbare Entlastung, Ruhe und ein nachhaltiges Wohlgefühl zu schenken.",
      },
      intro: {
        eyebrow: "Was dich bei Christina Massage erwartet",
        title:
          "Ein Ort für Entspannung, Achtsamkeit und individuelles Wohlbefinden",
        cards: [
          {
            title: "Individuell abgestimmte Behandlungen",
            text:
              "Jede Massage wird achtsam auf deine Bedürfnisse abgestimmt, damit du genau die Entspannung und Unterstützung bekommst, die dir guttut.",
          },
          {
            title: "Ruhige Atmosphäre zum Wohlfühlen",
            text:
              "Eine angenehme, entspannte Umgebung lädt dazu ein, den Alltag loszulassen, zur Ruhe zu kommen und neue Energie zu tanken.",
          },
          {
            title: "Zeit für dich und dein Wohlbefinden",
            text:
              "Ob kurze Auszeit oder intensive Regeneration – hier steht dein persönliches Wohlbefinden im Mittelpunkt.",
          },
        ],
      },
      services: {
        eyebrow: "Angebot",
        title: "Massagen für Wohlbefinden, Entspannung und Balance",
        text:
          "Mit den Pfeilen kannst du durch die verschiedenen Anwendungen klicken. Auf dem Handy kannst du einfach nach links und rechts wischen.",
        button: "Weiterlesen",
        items: [
          {
            title: "Klassische Massage",
            text:
              "Sanfte bis gezielte Griffe zur Lockerung von Muskulatur und zur spürbaren Entlastung im Alltag.",
          },
          {
            title: "Erfrischende Massage",
            text:
              "Belebende Anwendung für neue Energie, Leichtigkeit und ein frisches Körpergefühl.",
          },
          {
            title: "Rücken & Nacken",
            text:
              "Fokussierte Behandlung bei typischen Verspannungen im oberen Rücken- und Schulterbereich.",
          },
          {
            title: "Ganzkörpermassage",
            text:
              "Ganzheitliche Entspannung für Körper und Geist in ruhiger, natürlicher Atmosphäre.",
          },
          {
            title: "Fußmassage",
            text:
              "Wohltuende Anwendung zur Entspannung und Entlastung beanspruchter Füße.",
          },
          {
            title: "Lymphdrainage",
            text:
              "Sanfte, rhythmische Behandlung zur Unterstützung eines angenehmen Körpergefühls.",
          },
          {
            title: "Vagus-Stressabbau",
            text:
              "Ruhige Anwendung mit Fokus auf Loslassen, Nervensystem und tiefe Regeneration.",
          },
          {
            title: "Bauchmassage",
            text:
              "Achtsame Behandlung für Entspannung, innere Ruhe und ein harmonischeres Körpergefühl.",
          },
          {
            title: "Kopfmassage",
            text:
              "Wohltuend bei Stress, mentaler Anspannung und für kleine Ruheinseln im Alltag.",
          },
          {
            title: "Faszienmassage",
            text:
              "Gezielte Impulse zur Mobilisierung und für mehr Bewegungsfreiheit im Gewebe.",
          },
          {
            title: "Narbenbehandlung",
            text:
              "Behutsame Behandlung zur Unterstützung von Geschmeidigkeit und Wohlbefinden im betroffenen Bereich.",
          },
        ] as ServiceCard[],
      },
      special: {
        eyebrow: "Sonderleistung",
        title: "HIEMT Beckenboden-Training",
        text:
          "Eine besondere Zusatzleistung zur gezielten Unterstützung des Beckenbodens – diskret, modern und bequem in den Alltag integrierbar.",
        bullets: [
          "30 Minuten pro Sitzung",
          "Anwendung in Kleidung möglich",
          "Nicht-invasive Behandlung",
          "Fokus auf Aktivierung und Stärkung des Beckenbodens",
        ],
        trialLabel: "Probesitzung",
        trialPrice: "30 €",
        packLabel: "10er-Karte",
        packPrice: "28 € pro Sitzung",
        note:
          "Ideal für alle, die ihren Beckenboden gezielt stärken und ihr Körpergefühl nachhaltig verbessern möchten.",
      },
      prices: {
        eyebrow: "Preise",
        title: "Preise für deine Auszeit",
        text:
          "Wähle die Behandlungsdauer, die am besten zu dir und deinen Bedürfnissen passt.",
        card1: {
          title: "30 Minuten",
          price: "30 €",
          text:
            "Ideal für gezielte Anwendungen und kürzere Entspannungsphasen.",
        },
        card2: {
          title: "60 Minuten",
          price: "60 €",
          text:
            "Perfekt für tiefere Regeneration und eine spürbare Auszeit vom Alltag.",
        },
      },
      about: {
        eyebrow: "Über mich",
        title: "Persönlich, achtsam und mit Gefühl für Ruhe",
        text:
          "Bei Christina Massage stehen Wohlbefinden, Achtsamkeit und eine angenehme Atmosphäre im Mittelpunkt. Jede Behandlung wird individuell abgestimmt, damit du dich vom ersten Moment an gut aufgehoben fühlst. Ziel ist es, dir einen Ort zu bieten, an dem du loslassen, regenerieren und neue Energie sammeln kannst.",
      },
      location: {
        eyebrow: "Anfahrt",
        title: "So findest du mich",
        text:
          "Du findest Christina Massage in der Bahnhofstraße 21 in 82383 Hohenpeißenberg.",
      },
      contact: {
        eyebrow: "Kontakt",
        title: "Anrufen oder WhatsApp",
        text:
          "Du möchtest eine Massage buchen oder hast Fragen zu einer Behandlung? Melde dich gerne telefonisch oder per WhatsApp.",
        quickEyebrow: "Schneller Kontakt",
        quickTitle: "Direkt anfragen",
        quickText:
          "Für eine schnelle Terminvereinbarung kannst du Christina Massage direkt anrufen oder per WhatsApp schreiben.",
        call: "Anrufen",
        whatsapp: "WhatsApp",
        extra: "30 Minuten – 30 € · 60 Minuten – 60 €",
      },
      footer: {
        copyright: "© 2026 Christina Massage",
        imprint: "Impressum",
        privacy: "Datenschutz",
      },
      lang: {
        de: "DE",
        hu: "HU",
      },
    };

    const hu = {
      brand: {
        name: "Christina Massage",
        city: "Hohenpeißenberg",
        phoneDisplay: "0172 2664648",
        phoneLink: "01722664648",
        whatsappLink: "https://wa.me/491722664648",
        address: "Bahnhofstraße 21, 82383 Hohenpeißenberg",
      },
      nav: {
        services: "Ajánlat",
        special: "Különleges kezelés",
        prices: "Árak",
        about: "Rólam",
        location: "Megközelítés",
        contact: "Kapcsolat",
      },
      hero: {
        badge: "Modern · Természetes · Pihentető",
        title: "Érkezz meg. Lazíts. Töltődj fel.",
        text:
          "Egyéni masszázskezelések Hohenpeißenbergben a nyugalomért, regenerációért és a könnyedség új érzéséért a mindennapokban.",
        primary: "Hívás vagy WhatsApp",
        secondary: "Ajánlat megtekintése",
      },
      trustCards: [
        "Modern, természetes hangulat",
        "Személyre szabott kezelések",
        "30 vagy 60 perces időtartam",
        "Nyugodt rendelő Hohenpeißenbergben",
      ],
      heroCard: {
        eyebrow: "Nyugalom & regeneráció",
        title: "Természetes jóllét",
        text:
          "Ajándékozz magadnak egy tudatos kiszakadást a mindennapokból. Nyugodt környezetben kikapcsolhatsz, feltöltődhetsz, és megadhatod a testednek azt a figyelmet, amire szüksége van.",
        item1: "30 perc",
        item1Price: "30 €",
        item2: "60 perc",
        item2Price: "60 €",
        note:
          "Minden kezelés célja, hogy érezhető könnyebbséget, nyugalmat és tartós jó közérzetet adjon.",
      },
      intro: {
        eyebrow: "Amit a Christina Massage-nál megtapasztalhatsz",
        title: "Egy hely a nyugalomért, odafigyelésért és a személyes jóllétért",
        cards: [
          {
            title: "Személyre szabott kezelések",
            text:
              "Minden masszázs figyelmesen az igényeidhez igazodik, hogy pontosan azt a lazulást és támogatást kapd, amire szükséged van.",
          },
          {
            title: "Nyugodt, kellemes környezet",
            text:
              "A kellemes, pihentető hangulat segít elengedni a mindennapokat, megnyugodni és új energiát gyűjteni.",
          },
          {
            title: "Idő önmagadra és a jóllétedre",
            text:
              "Legyen szó rövid kikapcsolódásról vagy mélyebb regenerációról – itt a te jólléted áll a középpontban.",
          },
        ],
      },
      services: {
        eyebrow: "Ajánlat",
        title: "Masszázsok a jó közérzetért, pihenésért és egyensúlyért",
        text:
          "A nyilakkal végiglapozhatod a különböző kezeléseket. Telefonon egyszerűen húzz balra vagy jobbra.",
        button: "Tovább",
        items: [
          {
            title: "Klasszikus masszázs",
            text:
              "Gyengéd vagy célzott fogások az izmok lazítására és a mindennapi feszültség érezhető csökkentésére.",
          },
          {
            title: "Frissítő masszázs",
            text:
              "Élénkítő kezelés az új energia, könnyedség és felfrissülés érdekében.",
          },
          {
            title: "Hát- és nyakmasszázs",
            text:
              "Célzott kezelés a felső háti és vállövi feszültségek oldására.",
          },
          {
            title: "Teljes testmasszázs",
            text:
              "Átfogó relaxáció testnek és léleknek nyugodt, természetes környezetben.",
          },
          {
            title: "Talpmasszázs",
            text:
              "Kellemes kezelés a fáradt lábak pihentetésére és tehermentesítésére.",
          },
          {
            title: "Nyirokmasszázs",
            text:
              "Gyengéd, ritmikus kezelés a kellemesebb közérzet támogatására.",
          },
          {
            title: "Vagusz-stresszoldás",
            text:
              "Nyugtató kezelés az elengedés, az idegrendszer és a mély regeneráció támogatására.",
          },
          {
            title: "Hasi masszázs",
            text:
              "Figyelmes kezelés a belső nyugalomért és harmonikusabb testérzetért.",
          },
          {
            title: "Fejmasszázs",
            text:
              "Különösen kellemes stressz, mentális feszültség és a napi terhelés csökkentésére.",
          },
          {
            title: "Fascia masszázs",
            text:
              "Célzott impulzusok a mobilitás támogatására és a kötőszövet rugalmasságának javítására.",
          },
          {
            title: "Hegkezelés",
            text:
              "Kíméletes kezelés a rugalmasság és a komfortérzet támogatására az érintett területen.",
          },
        ] as ServiceCard[],
      },
      special: {
        eyebrow: "Különleges kezelés",
        title: "HIEMT medencefenék-tréning",
        text:
          "Kiemelt kiegészítő kezelés a medencefenék célzott támogatására – diszkréten, korszerűen és kényelmesen beilleszthetően a mindennapokba.",
        bullets: [
          "30 perc egy alkalom",
          "Ruhában is végezhető",
          "Nem invazív kezelés",
          "A medencefenék aktiválására és erősítésére fókuszál",
        ],
        trialLabel: "Próbaalkalom",
        trialPrice: "30 €",
        packLabel: "10 alkalmas bérlet",
        packPrice: "28 € / alkalom",
        note:
          "Ideális mindazoknak, akik célzottan szeretnék erősíteni a medencefeneküket és javítani a testérzetüket.",
      },
      prices: {
        eyebrow: "Árak",
        title: "Árak a te pihenésedhez",
        text:
          "Válaszd azt a kezelési időtartamot, amely leginkább megfelel neked és az igényeidnek.",
        card1: {
          title: "30 perc",
          price: "30 €",
          text: "Ideális célzott kezelésekhez és rövidebb kikapcsolódáshoz.",
        },
        card2: {
          title: "60 perc",
          price: "60 €",
          text:
            "Tökéletes a mélyebb regenerációhoz és a mindennapokból való valódi kiszakadáshoz.",
        },
      },
      about: {
        eyebrow: "Rólam",
        title: "Személyes, figyelmes és nyugalmat adó hozzáállás",
        text:
          "A Christina Massage-nál a jóllét, az odafigyelés és a kellemes hangulat áll a középpontban. Minden kezelést egyénre szabok, hogy már az első pillanattól biztonságban és jó kezekben érezd magad. A célom egy olyan hely megteremtése, ahol elengedhetsz, regenerálódhatsz és új energiát gyűjthetsz.",
      },
      location: {
        eyebrow: "Megközelítés",
        title: "Így találsz meg",
        text:
          "A Christina Massage a Bahnhofstraße 21. szám alatt található, 82383 Hohenpeißenberg.",
      },
      contact: {
        eyebrow: "Kapcsolat",
        title: "Hívás vagy WhatsApp",
        text:
          "Masszázst szeretnél foglalni vagy kérdésed van? Keress bátran telefonon vagy WhatsAppon.",
        quickEyebrow: "Gyors kapcsolat",
        quickTitle: "Közvetlen érdeklődés",
        quickText:
          "A gyors időpont-egyeztetéshez hívd a Christina Massage-t vagy írj WhatsAppon.",
        call: "Hívás",
        whatsapp: "WhatsApp",
        extra: "30 perc – 30 € · 60 perc – 60 €",
      },
      footer: {
        copyright: "© 2026 Christina Massage",
        imprint: "Impresszum",
        privacy: "Adatvédelem",
      },
      lang: {
        de: "DE",
        hu: "HU",
      },
    };

    return language === "de" ? de : hu;
  }, [language]);

  const contentAny = content as any;

  return (
    <div className="min-h-screen bg-[#f6ead8] text-stone-800">
      <header className="sticky top-0 z-50 border-b border-[#d8cdbf] bg-[#f6ead8]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div>
            <p className="text-lg font-semibold tracking-[0.04em] text-stone-900">
              {contentAny.brand.name}
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
              {contentAny.brand.city}
            </p>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-stone-700 lg:flex">
            <a href="#leistungen" className="transition hover:text-stone-900">
              {contentAny.nav.services}
            </a>
            <a href="#special" className="transition hover:text-stone-900">
              {contentAny.nav.special}
            </a>
            <a href="#preise" className="transition hover:text-stone-900">
              {contentAny.nav.prices}
            </a>
            <a href="#ueber" className="transition hover:text-stone-900">
              {contentAny.nav.about}
            </a>
            <a href="#anfahrt" className="transition hover:text-stone-900">
              {contentAny.nav.location}
            </a>
            <a href="#kontakt" className="transition hover:text-stone-900">
              {contentAny.nav.contact}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-stone-300 bg-white/80 p-1 sm:flex">
              <button
                onClick={() => setLanguage("de")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  language === "de"
                    ? "bg-stone-800 text-white"
                    : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                {contentAny.lang.de}
              </button>
              <button
                onClick={() => setLanguage("hu")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  language === "hu"
                    ? "bg-stone-800 text-white"
                    : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                {contentAny.lang.hu}
              </button>
            </div>

            <a
              href="#kontakt"
              className="rounded-full bg-[#405e3f] px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5"
            >
              {contentAny.hero.primary}
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl justify-end px-6 pb-3 sm:hidden lg:px-10">
          <div className="rounded-full border border-stone-300 bg-white/80 p-1">
            <button
              onClick={() => setLanguage("de")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                language === "de"
                  ? "bg-stone-800 text-white"
                  : "text-stone-700 hover:bg-stone-100"
              }`}
            >
              DE
            </button>
            <button
              onClick={() => setLanguage("hu")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                language === "hu"
                  ? "bg-stone-800 text-white"
                  : "text-stone-700 hover:bg-stone-100"
              }`}
            >
              HU
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(172,183,168,0.22),transparent_28%),radial-gradient(circle_at_left,rgba(205,184,155,0.2),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28">
          <div>
            <div className="inline-flex rounded-full border border-[#d8cfc2] bg-white/60 px-4 py-2 text-sm text-stone-600 backdrop-blur">
              {contentAny.hero.badge}
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-stone-900 md:text-6xl">
              {contentAny.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 md:text-xl">
              {contentAny.hero.text}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="rounded-full bg-[#405e3f] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-stone-300/30 transition hover:-translate-y-0.5"
              >
                {contentAny.hero.primary}
              </a>

              <a
                href="#leistungen"
                className="rounded-full border border-stone-300 bg-white/70 px-6 py-3 text-sm font-medium text-stone-800 transition hover:bg-white"
              >
                {contentAny.hero.secondary}
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              {contentAny.trustCards.map((item: string) => (
                <div
                  key={item}
                  className="rounded-2xl border border-stone-200 bg-white/70 p-4 text-sm text-stone-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white/70 p-4 shadow-[0_30px_80px_rgba(120,100,80,0.12)] backdrop-blur">
            <div className="overflow-hidden rounded-[1.6rem] bg-[#efe7da]">
              <img
                src="/massage-hero.png"
                alt="Massage"
                className="h-[340px] w-full object-cover"
              />

              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  {contentAny.heroCard.eyebrow}
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-stone-900">
                  {contentAny.heroCard.title}
                </h2>

                <p className="mt-4 leading-8 text-stone-600">
                  {contentAny.heroCard.text}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
                    <div className="text-sm text-stone-500">
                      {contentAny.heroCard.item1}
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-stone-900">
                      {contentAny.heroCard.item1Price}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
                    <div className="text-sm text-stone-500">
                      {contentAny.heroCard.item2}
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-stone-900">
                      {contentAny.heroCard.item2Price}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-stone-300 p-5 text-sm leading-7 text-stone-600">
                  {contentAny.heroCard.note}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
            {contentAny.intro.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
            {contentAny.intro.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {contentAny.intro.cards.map((item: ServiceCard) => (
            <div
              key={item.title}
              className="rounded-[1.8rem] border border-stone-200 bg-white/80 p-7 shadow-sm transition hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-stone-900">
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-stone-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="leistungen" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {contentAny.services.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {contentAny.services.title}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">
              {contentAny.services.text}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => scrollServices("left")}
              className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-300 bg-white/90 p-4 text-stone-700 shadow-md transition hover:bg-white lg:flex"
              aria-label="Zurück"
            >
              <span className="text-2xl leading-none">‹</span>
            </button>

            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {contentAny.services.items.map((service: ServiceCard) => (
                <div
                  key={service.title}
                  className="min-w-[88%] snap-center md:min-w-[78%] lg:min-w-[86%]"
                >
                  <div className="relative mx-auto grid min-h-[520px] overflow-hidden rounded-[2.2rem] bg-transparent md:grid-cols-[0.95fr_1.25fr]">
                    <div className="relative z-10 flex items-center justify-center px-8 py-10 md:px-10">
                      <div className="absolute left-0 top-1/2 hidden h-[280px] w-[420px] -translate-y-1/2 rounded-[2rem] bg-[#cfd5cb] md:block" />
                      <div className="relative z-10 w-full max-w-[360px] rounded-[2rem] bg-[#cfd5cb] p-10 text-center shadow-sm md:-mr-12">
                        <h3 className="text-4xl font-medium leading-tight text-stone-800">
                          {service.title}
                        </h3>
                        <p className="mt-6 leading-8 text-stone-700">
                          {service.text}
                        </p>
                        <a
                          href="#kontakt"
                          className="mt-8 inline-block rounded-none bg-[#405e3f] px-8 py-4 text-base font-medium text-white transition hover:-translate-y-0.5"
                        >
                          {contentAny.services.button}
                        </a>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(120,100,80,0.12)]">
                      <img
                        src="/massage-hero.png"
                        alt={service.title}
                        className="h-full min-h-[420px] w-full object-cover"
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
              aria-label="Weiter"
            >
              <span className="text-2xl leading-none">›</span>
            </button>
          </div>
        </div>
      </section>

      <section id="special" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="overflow-hidden rounded-[2.2rem] border border-stone-200 bg-white shadow-[0_30px_80px_rgba(120,100,80,0.12)]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-[#19202a]">
                <img
                  src="/hiemt-pad.jpg"
                  alt="HIEMT Gerät"
                  className="h-full min-h-[360px] w-full object-cover"
                />
              </div>

              <div className="bg-[#f8f5ef] p-8 md:p-10">
                <div className="inline-flex rounded-full bg-[#dfe6da] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-stone-700">
                  {contentAny.special.eyebrow}
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
                  {contentAny.special.title}
                </h2>

                <p className="mt-5 text-lg leading-8 text-stone-600">
                  {contentAny.special.text}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {contentAny.special.bullets.map((bullet: string) => (
                    <div
                      key={bullet}
                      className="rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-700 shadow-sm"
                    >
                      {bullet}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.6rem] bg-stone-800 p-6 text-white">
                    <div className="text-sm uppercase tracking-[0.18em] text-stone-300">
                      {contentAny.special.trialLabel}
                    </div>
                    <div className="mt-2 text-3xl font-semibold">
                      {contentAny.special.trialPrice}
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] bg-[#9eab8d] p-6 text-stone-900">
                    <div className="text-sm uppercase tracking-[0.18em] text-stone-700">
                      {contentAny.special.packLabel}
                    </div>
                    <div className="mt-2 text-3xl font-semibold">
                      {contentAny.special.packPrice}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-stone-300 p-5 text-sm leading-7 text-stone-600">
                  {contentAny.special.note}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="preise" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {contentAny.prices.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-stone-900">
              {contentAny.prices.title}
            </h2>

            <p className="mt-4 leading-8 text-stone-600">
              {contentAny.prices.text}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-stone-800 p-8 text-white shadow-sm">
              <div className="text-sm uppercase tracking-[0.28em] text-stone-300">
                {contentAny.prices.card1.title}
              </div>
              <div className="mt-4 text-4xl font-semibold">
                {contentAny.prices.card1.price}
              </div>
              <p className="mt-4 leading-7 text-stone-300">
                {contentAny.prices.card1.text}
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#9eab8d] p-8 text-stone-900 shadow-sm">
              <div className="text-sm uppercase tracking-[0.28em] text-stone-700">
                {contentAny.prices.card2.title}
              </div>
              <div className="mt-4 text-4xl font-semibold">
                {contentAny.prices.card2.price}
              </div>
              <p className="mt-4 leading-7 text-stone-800">
                {contentAny.prices.card2.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="ueber" className="bg-[#efe7da] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
            <img
              src="/christina-about.jpg"
              alt="Christina Portrait"
              className="h-full min-h-[460px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {contentAny.about.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {contentAny.about.title}
            </h2>

            <div className="mt-8 rounded-[2rem] bg-white/70 p-8 leading-8 text-stone-700 shadow-sm">
              {contentAny.about.text}
            </div>
          </div>
        </div>
      </section>

      <section id="anfahrt" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {contentAny.location.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {contentAny.location.title}
            </h2>
          </div>

        

          <div className="mx-auto -mt-6 max-w-6xl rounded-[2rem] bg-[#f8f1e6] px-4 pb-4 pt-10 shadow-sm">
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

      <section id="kontakt" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {contentAny.contact.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {contentAny.contact.title}
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
              {contentAny.contact.text}
            </p>

            <div className="mt-8 space-y-4 text-stone-700">
              <p>📍 {contentAny.brand.address}</p>
              <p>📞 {contentAny.brand.phoneDisplay}</p>
              <p>⏱ {contentAny.contact.extra}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-sm">
            <div className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {contentAny.contact.quickEyebrow}
            </div>

            <h3 className="mt-3 text-2xl font-semibold text-stone-900">
              {contentAny.contact.quickTitle}
            </h3>

            <p className="mt-4 leading-7 text-stone-600">
              {contentAny.contact.quickText}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${contentAny.brand.phoneLink}`}
                className="inline-block rounded-full bg-[#405e3f] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
              >
                {contentAny.contact.call}
              </a>

              <a
                href={contentAny.brand.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition hover:-translate-y-0.5"
              >
                {contentAny.contact.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white/50 px-6 py-8 text-sm text-stone-500 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>{contentAny.footer.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-800">
              {contentAny.footer.imprint}
            </a>
            <a href="#" className="hover:text-stone-800">
              {contentAny.footer.privacy}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}