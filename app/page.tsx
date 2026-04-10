"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Language = "de" | "hu";

type MassageItem = {
  key: string;
  image: string;
  title: {
    de: string;
    hu: string;
  };
  description: {
    de: string;
    hu: string;
  };
  durations: string;
};

const massages: MassageItem[] = [
  {
    key: "swedish",
    image: "/images/swedish.png",
    title: {
      de: "Schwedische Massage",
      hu: "Svéd masszázs",
    },
    description: {
      de: "Klassische Ganzkörpermassage zur Lockerung der Muskulatur und zur tiefen Entspannung.",
      hu: "Klasszikus teljes testes masszázs az izmok lazítására és a mély relaxációért.",
    },
    durations: "60 / 90 / 120 Min",
  },
  {
    key: "back-neck",
    image: "/images/back-neck.png",
    title: {
      de: "Rücken / Nacken",
      hu: "Hát / Nyak",
    },
    description: {
      de: "Gezielte Behandlung für verspannte Schultern, Nacken und Rücken.",
      hu: "Célzott kezelés a feszült váll, nyak és hát területére.",
    },
    durations: "45 / 60 / 75 Min",
  },
  {
    key: "individual",
    image: "/images/individual.png",
    title: {
      de: "Individuelle Massage",
      hu: "Egyéni masszázs",
    },
    description: {
      de: "Individuell auf Beschwerden, Regeneration und Wohlbefinden abgestimmt.",
      hu: "Panaszokhoz, regenerációhoz és közérzethez igazított egyéni kezelés.",
    },
    durations: "60 / 90 / 120 Min",
  },
  {
    key: "foot",
    image: "/images/foot.png",
    title: {
      de: "Fußmassage",
      hu: "Talpmasszázs",
    },
    description: {
      de: "Wohltuende Fußbehandlung für Entspannung, Leichtigkeit und Ausgleich.",
      hu: "Kellemes talpkezelés a relaxációért, könnyedségért és egyensúlyért.",
    },
    durations: "45 / 60 Min",
  },
  {
    key: "lymph",
    image: "/images/lymph.png",
    title: {
      de: "Lymphdrainage",
      hu: "Nyirokdrenázs",
    },
    description: {
      de: "Sanfte Technik zur Unterstützung des Lymphflusses und zur Entlastung des Gewebes.",
      hu: "Gyengéd technika a nyirokkeringés támogatására és a szövetek tehermentesítésére.",
    },
    durations: "60 / 90 Min",
  },
  {
    key: "vagus",
    image: "/images/vagus.png",
    title: {
      de: "Vagus / Stressabbau",
      hu: "Vagus / Stresszcsökkentés",
    },
    description: {
      de: "Sanfte Behandlung für innere Ruhe, Entspannung und Nervensystem-Balance.",
      hu: "Gyengéd kezelés a belső nyugalomért, relaxációért és az idegrendszer egyensúlyáért.",
    },
    durations: "45 / 60 Min",
  },
  {
    key: "flossing",
    image: "/images/flossing.png",
    title: {
      de: "Flossing",
      hu: "Flossing",
    },
    description: {
      de: "Spezielle Technik zur Mobilisierung und Unterstützung von Gelenken und Gewebe.",
      hu: "Speciális technika az ízületek és a szövetek mobilizálására és támogatására.",
    },
    durations: "30 / 45 / 60 Min",
  },
  {
    key: "fdm",
    image: "/images/fdm.png",
    title: {
      de: "FDM Behandlung",
      hu: "FDM kezelés",
    },
    description: {
      de: "Gezielte manuelle Behandlung auf Basis des Faszien-Distorsionsmodells.",
      hu: "Célzott manuális kezelés a Fascia Disztorziós Modell alapján.",
    },
    durations: "60 Min",
  },
  {
    key: "cupping",
    image: "/images/cupping.png",
    title: {
      de: "Schröpfen",
      hu: "Köpölyözés",
    },
    description: {
      de: "Traditionelle Technik zur Anregung des Gewebes und zur Lösung von Spannungen.",
      hu: "Hagyományos technika a szövetek serkentésére és a feszültségek oldására.",
    },
    durations: "30 Min",
  },
];

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("de");
  const [currentSlide, setCurrentSlide] = useState(0);

  const t = useMemo(() => {
    return {
      navAbout: language === "de" ? "Über mich" : "Rólam",
      navMassages: language === "de" ? "Massagen" : "Masszázsok",
      navHiemt: "HIEMT",
      navExtras: language === "de" ? "Zusatzangebote" : "Kiegészítő kezelések",
      navDirections: language === "de" ? "Anfahrt" : "Megközelítés",
      navBooking: language === "de" ? "Termin buchen" : "Időpontfoglalás",

      heroBadge: language === "de" ? "Ganzheitlich · Individuell · Mit Ruhe" : "Holisztikus · Egyéni · Nyugodt",
      heroTitle:
        language === "de"
          ? "Massage, Entspannung und Wohlbefinden in Hohenpeißenberg"
          : "Masszázs, ellazulás és jó közérzet Hohenpeißenbergben",
      heroText:
        language === "de"
          ? "Individuell abgestimmte Behandlungen für Regeneration, Stressabbau und ein besseres Körpergefühl – in ruhiger, persönlicher Atmosphäre."
          : "Egyénre szabott kezelések a regenerációért, a stresszoldásért és a jobb testérzetért – nyugodt, személyes környezetben.",
      heroPrimary: language === "de" ? "Jetzt Termin buchen" : "Időpont foglalása",
      heroSecondary: language === "de" ? "Leistungen ansehen" : "Szolgáltatások megtekintése",

      servicesTitle: language === "de" ? "Leistungen" : "Szolgáltatások",
      servicesSubtitle:
        language === "de"
          ? "Wähle die Behandlung, die am besten zu deinen Bedürfnissen passt."
          : "Válaszd ki azt a kezelést, amely a legjobban illik az igényeidhez.",

      aboutTitle: language === "de" ? "Über mich" : "Rólam",
      aboutHeadline:
        language === "de"
          ? "Die Harmonie von Bewegung und Körper ist nicht nur mein Beruf, sondern meine Lebensphilosophie."
          : "A mozgás és a test harmóniája nemcsak a hivatásom, hanem az életfilozófiám is.",
      aboutText1:
        language === "de"
          ? "Die Liebe zu Sport und Bewegung prägt mein Leben seit meiner Kindheit. Meine berufliche Laufbahn begann 2007 als Trainerin, und seither fasziniert mich die erstaunliche Widerstandsfähigkeit des menschlichen Körpers."
          : "A sport és a mozgás iránti szeretet gyermekkorom óta meghatározza az életemet. Szakmai pályafutásomat 2007-ben edzőként kezdtem, és azóta is lenyűgöz az emberi test elképesztő ellenálló képessége.",
      aboutText2:
        language === "de"
          ? "Seit über 10 Jahren helfe ich meinen Gästen, dem Alltagsstress zu entfliehen. Bei jeder Behandlung stehen die individuellen Bedürfnisse im Mittelpunkt, um ein persönliches und ganzheitliches Massageerlebnis zu schaffen."
          : "Több mint 10 éve segítek vendégeimnek kiszakadni a mindennapi stresszből. Minden kezelés során az egyéni igények állnak a középpontban, hogy személyes és holisztikus masszázsélményt nyújtsak.",
      aboutText3:
        language === "de"
          ? "Ob Muskelentspannung, Stressabbau, Regeneration oder Erholung – jede Behandlung wird individuell angepasst. Für mich ist Massage mehr als nur eine körperliche Behandlung: Sie ist eine wertvolle Auszeit für Körper, Geist und Seele."
          : "Legyen szó izomlazításról, stresszcsökkentésről, regenerációról vagy pihenésről – minden kezelést egyénre szabok. Számomra a masszázs több mint testi kezelés: értékes énidő a test, a lélek és a szellem számára.",
      aboutCareerTitle:
        language === "de"
          ? "Mein beruflicher Werdegang und meine Qualifikationen"
          : "Szakmai pályafutásom és képesítéseim",
      aboutCareerText1:
        language === "de"
          ? "Ich begann meine Karriere 2007 als Aerobic-Trainerin und erwarb dabei fundierte anatomische Kenntnisse. Meine Leidenschaft für Bewegung führte mich schnell zu Pilates, und 2016 wurde die Massage-Therapie zu meinem Beruf."
          : "Pályafutásomat 2007-ben aerobic edzőként kezdtem, ahol alapos anatómiai ismeretekre tettem szert. A mozgás iránti szenvedélyem hamar a Pilates felé vezetett, majd 2016-ban a masszázsterápia lett a hivatásom.",
      aboutCareerText2:
        language === "de"
          ? "Im Laufe meiner Laufbahn habe ich unter anderem die schwedische Massage, Wellness-Massagen, Tui-Na, Champi-Kopfmassage, Schröpftherapie, Flossing, Narbenbehandlung, Lymphdrainage, Vagus-Therapie, FDM, Viszeraltherapie und ganzheitliche naturheilkundliche Ansätze erlernt."
          : "Szakmai pályafutásom során többek között elsajátítottam a svédmasszázst, wellness masszázsokat, a Tui-Na technikát, a Champi fejmasszázst, a köpölyözést, a flossingot, a hegkezelést, a nyirokdrenázst, a vagus-terápiát, az FDM-et, a viszcerális terápiát és a holisztikus természetgyógyászati megközelítéseket.",
      aboutCareerText3:
        language === "de"
          ? "Ich bin überzeugt, dass wahre Heilung nicht nur Symptome unterdrückt, sondern Ursachen erkennt. Deshalb betrachte ich den Menschen immer als Ganzes – in der Einheit von Körper, Geist und Seele."
          : "Meggyőződésem, hogy a valódi gyógyulás nem csupán a tünetek elnyomásáról szól, hanem az okok feltárásáról is. Ezért az embert mindig egészként szemlélem – a test, a lélek és a szellem egységében.",

      hiemtTitle: "HIEMT",
      hiemtSubtitle:
        language === "de"
          ? "Moderne Unterstützung für Beckenboden, Körpergefühl und gezielte Aktivierung."
          : "Modern támogatás a medencefenékhez, a testérzethez és a célzott aktiváláshoz.",
      hiemtFeature1: language === "de" ? "30 Minuten pro Sitzung" : "30 perc kezelésenként",
      hiemtFeature2: language === "de" ? "Anwendung nur in Kleidung" : "Használat ruhában",
      hiemtFeature3: language === "de" ? "Nicht-invasive Behandlung" : "Nem invazív kezelés",
      hiemtFeature4:
        language === "de"
          ? "Gezielte Aktivierung und Stärkung des Beckenbodens"
          : "A medencefenék célzott aktiválása és erősítése",
      hiemtTrial: language === "de" ? "Probesitzung" : "Próbaalkalom",
      hiemtCard: language === "de" ? "10er Karte" : "10 alkalmas bérlet",
      hiemtDescription:
        language === "de"
          ? "Ideal für alle, die ihren Beckenboden gezielt stärken und ihr Körpergefühl nachhaltig verbessern möchten."
          : "Ideális mindazoknak, akik célzottan szeretnék erősíteni a medencefeneket és tartósan javítani a testérzetüket.",
      hiemtWhatsappText:
        language === "de"
          ? "Eine individuelle Beratung ist nur per WhatsApp möglich."
          : "Egyéni tanácsadás kizárólag WhatsAppon lehetséges.",
      hiemtWhatsappButton:
        language === "de" ? "Beratung per WhatsApp" : "Tanácsadás WhatsAppon",

      extrasTitle: language === "de" ? "Zusatzangebote" : "Kiegészítő kezelések",
      extrasText:
        language === "de"
          ? "Ergänzend zu den Massagen biete ich weitere gezielte Anwendungen an – individuell abgestimmt auf deine Bedürfnisse."
          : "A masszázsok mellett további célzott kezeléseket is kínálok – egyénre szabva az igényeid szerint.",

      bookingTitle: language === "de" ? "Termin vereinbaren" : "Időpont egyeztetése",
      bookingText:
        language === "de"
          ? "Buche deinen Termin bequem online und finde die Behandlung, die zu dir passt."
          : "Foglalj időpontot kényelmesen online, és találd meg a hozzád illő kezelést.",
      bookingButton: language === "de" ? "Zum Buchungssystem" : "Foglalási rendszerhez",

      directionsTitle: language === "de" ? "Anfahrt" : "Megközelítés",
      directionsText:
        language === "de"
          ? "Bahnhofstraße 21, 82383 Hohenpeißenberg"
          : "Bahnhofstraße 21, 82383 Hohenpeißenberg",

      footerImprint: language === "de" ? "Impressum" : "Impresszum",
      footerPrivacy: language === "de" ? "Datenschutz" : "Adatvédelem",
      footerBooking: language === "de" ? "Termin buchen" : "Időpontfoglalás",
    };
  }, [language]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % massages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + massages.length) % massages.length);
  };

  const visibleMassages = [
    massages[currentSlide],
    massages[(currentSlide + 1) % massages.length],
    massages[(currentSlide + 2) % massages.length],
  ];

  return (
    <main className="bg-[#f5efe3] text-[#2f3528]">
      <header className="sticky top-0 z-50 border-b border-[#d5d0c2] bg-[#7d8b63]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
          <nav className="hidden items-center gap-8 text-sm text-[#f8f5ee] lg:flex">
            <a href="#about" className="transition hover:opacity-80">{t.navAbout}</a>
            <a href="#services" className="transition hover:opacity-80">{t.navMassages}</a>
            <a href="#hiemt" className="transition hover:opacity-80">{t.navHiemt}</a>
          </nav>

          <div className="flex flex-1 justify-center lg:flex-none">
            <a href="#" className="flex flex-col items-center">
              <Image
                src="/images/logo-christina-massage.png"
                alt="Christina Massage"
                width={120}
                height={70}
                className="h-auto w-[90px] md:w-[120px]"
              />
              <span className="mt-1 text-[10px] uppercase tracking-[0.35em] text-[#f6f1e8] md:text-xs">
                Hohenpeißenberg
              </span>
            </a>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <a href="#extras" className="text-sm text-[#f8f5ee] transition hover:opacity-80">
              {t.navExtras}
            </a>
            <a href="#directions" className="text-sm text-[#f8f5ee] transition hover:opacity-80">
              {t.navDirections}
            </a>
            <Link
              href="/booking"
              className="rounded-full border border-[#f3eee4] px-6 py-3 text-sm font-medium text-[#f8f5ee] transition hover:bg-[#f3eee4] hover:text-[#556246]"
            >
              {t.navBooking}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage("de")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                language === "de"
                  ? "bg-[#2f3528] text-white"
                  : "bg-[#e7e0d3] text-[#4c5740]"
              }`}
            >
              DE
            </button>
            <button
              onClick={() => setLanguage("hu")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                language === "hu"
                  ? "bg-[#2f3528] text-white"
                  : "bg-[#e7e0d3] text-[#4c5740]"
              }`}
            >
              HU
            </button>
          </div>
        </div>
      </header>
            <section className="border-b border-[#ddd5c7]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:px-8 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-[#c8c0ae] bg-[#ede6d8] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#6d7857]">
              {t.heroBadge}
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-[#34402b] md:text-5xl">
              {t.heroTitle}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5d6651] md:text-lg">
              {t.heroText}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-[#6f7d58] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#5f6c4a]"
              >
                {t.heroPrimary}
              </Link>

              <a
                href="#services"
                className="rounded-full border border-[#98a184] px-7 py-4 text-sm font-semibold text-[#566246] transition hover:bg-[#ebe4d8]"
              >
                {t.heroSecondary}
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[#d6cebf] bg-[#e9e2d4] shadow-sm">
            <Image
              src="/images/massage-hero.png"
              alt="Christina Massage Hero"
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="services" className="border-b border-[#ddd5c7]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[#7a8566]">
                {t.servicesTitle}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#34402b] md:text-4xl">
                {t.servicesSubtitle}
              </h2>
            </div>

            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="rounded-full border border-[#bfc5af] bg-white px-4 py-3 text-sm text-[#556246] transition hover:bg-[#eef1e8]"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="rounded-full border border-[#bfc5af] bg-white px-4 py-3 text-sm text-[#556246] transition hover:bg-[#eef1e8]"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {visibleMassages.map((massage) => (
              <article
                key={massage.key}
                className="overflow-hidden rounded-[2rem] border border-[#d8d0c2] bg-[#fbf8f2] shadow-sm"
              >
                <div className="relative h-[260px] w-full">
                  <Image
                    src={massage.image}
                    alt={massage.title[language]}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-[#34402b]">
                      {massage.title[language]}
                    </h3>
                    <span className="rounded-full bg-[#e8efdc] px-3 py-1 text-xs font-medium text-[#60704c]">
                      {massage.durations}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#5f6752]">
                    {massage.description[language]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-[#ddd5c7] bg-[#f8f3ea]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-[#d8d0c2] bg-white shadow-sm">
            <Image
              src="/images/christina-about.jpg"
              alt="Christina Dobozi"
              width={900}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[#7a8566]">
              {t.aboutTitle}
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#34402b] md:text-4xl">
              {t.aboutHeadline}
            </h2>

            <div className="mt-6 space-y-5 text-[15px] leading-8 text-[#59624d] md:text-base">
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
              <p>{t.aboutText3}</p>
            </div>

            <div className="mt-10 rounded-[2rem] border border-[#d5cfbf] bg-[#efe8db] p-6 md:p-8">
              <h3 className="text-xl font-semibold text-[#34402b]">
                {t.aboutCareerTitle}
              </h3>

              <div className="mt-5 space-y-5 text-[15px] leading-8 text-[#59624d] md:text-base">
                <p>{t.aboutCareerText1}</p>
                <p>{t.aboutCareerText2}</p>
                <p>{t.aboutCareerText3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hiemt" className="border-b border-[#ddd5c7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] border border-[#d8d0c2] bg-white shadow-sm">
            <Image
              src="/images/hiemt-pad.jpg"
              alt="HIEMT Pad"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[#7a8566]">
              {t.hiemtTitle}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#34402b] md:text-4xl">
              {t.hiemtSubtitle}
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#d9d1c3] bg-white p-5 text-[#4e5842]">
                {t.hiemtFeature1}
              </div>
              <div className="rounded-[1.5rem] border border-[#d9d1c3] bg-white p-5 text-[#4e5842]">
                {t.hiemtFeature2}
              </div>
              <div className="rounded-[1.5rem] border border-[#d9d1c3] bg-white p-5 text-[#4e5842]">
                {t.hiemtFeature3}
              </div>
              <div className="rounded-[1.5rem] border border-[#d9d1c3] bg-white p-5 text-[#4e5842]">
                {t.hiemtFeature4}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.8rem] bg-[#667f59] p-7 text-white">
                <div className="text-sm uppercase tracking-[0.24em] text-[#dfe8d0]">
                  {t.hiemtTrial}
                </div>
                <div className="mt-3 text-5xl font-semibold">30 €</div>
              </div>

              <div className="rounded-[1.8rem] bg-[#aebb9a] p-7 text-[#1e2419]">
                <div className="text-sm uppercase tracking-[0.24em] text-[#445036]">
                  {t.hiemtCard}
                </div>
                <div className="mt-3 text-5xl font-semibold">280 €</div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.8rem] border border-dashed border-[#cec6b7] bg-[#f8f3ea] p-6 text-[15px] leading-8 text-[#59624d]">
              {t.hiemtDescription}
            </div>

            <div className="mt-6 rounded-[1.8rem] border border-[#cfd8bf] bg-[#edf4e3] p-6">
              <p className="text-sm font-medium text-[#4e5f3f]">
                {t.hiemtWhatsappText}
              </p>

              <a
                href="https://wa.me/491722664648?text=Hallo%20Christina,%20ich%20interessiere%20mich%20für%20eine%20individuelle%20Beratung%20zur%20HIEMT-Behandlung."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-full bg-[#6f7d58] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f6c4a]"
              >
                {t.hiemtWhatsappButton}
              </a>
            </div>
          </div>
        </div>
      </section>
            <section id="extras" className="border-b border-[#ddd5c7] bg-[#f8f3ea]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.22em] text-[#7a8566]">
              {t.extrasTitle}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#34402b] md:text-4xl">
              {t.extrasText}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="overflow-hidden rounded-[2rem] border border-[#d8d0c2] bg-white shadow-sm">
              <div className="relative h-[220px] w-full">
                <Image
                  src="/images/flossing.png"
                  alt="Flossing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#34402b]">Flossing</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f6752]">
                  {language === "de"
                    ? "Gezielte Unterstützung für Mobilität, Gelenke und Gewebe."
                    : "Célzott támogatás a mobilitáshoz, az ízületekhez és a szövetekhez."}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#d8d0c2] bg-white shadow-sm">
              <div className="relative h-[220px] w-full">
                <Image
                  src="/images/fdm.png"
                  alt="FDM"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#34402b]">FDM</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f6752]">
                  {language === "de"
                    ? "Manuelle Behandlung mit Fokus auf fasziale Zusammenhänge."
                    : "Manuális kezelés a fasciális összefüggésekre fókuszálva."}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#d8d0c2] bg-white shadow-sm">
              <div className="relative h-[220px] w-full">
                <Image
                  src="/images/cupping.png"
                  alt="Schröpfen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#34402b]">
                  {language === "de" ? "Schröpfen" : "Köpölyözés"}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5f6752]">
                  {language === "de"
                    ? "Traditionelle Technik zur Anregung und Entlastung des Gewebes."
                    : "Hagyományos technika a szövetek serkentésére és tehermentesítésére."}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#d8d0c2] bg-white shadow-sm">
              <div className="relative h-[220px] w-full">
                <Image
                  src="/images/foot.png"
                  alt="Fußmassage"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#34402b]">
                  {language === "de" ? "Fußmassage" : "Talpmasszázs"}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5f6752]">
                  {language === "de"
                    ? "Wohltuende Behandlung für Entspannung und neue Leichtigkeit."
                    : "Kellemes kezelés a relaxációért és a könnyedségért."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8cfbf] bg-[#eae4d7]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <div className="overflow-hidden rounded-[2.25rem] border border-[#cfd4bf] bg-gradient-to-r from-[#637554] to-[#87956e] p-8 text-white md:p-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[#e6edd8]">
                Booking
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                {t.bookingTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#eef3e6] md:text-lg">
                {t.bookingText}
              </p>

              <Link
                href="/booking"
                className="mt-8 inline-flex rounded-full bg-[#f5efe3] px-7 py-4 text-sm font-semibold text-[#556246] transition hover:bg-white"
              >
                {t.bookingButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="directions" className="border-b border-[#ddd5c7]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[#7a8566]">
                {t.directionsTitle}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#34402b] md:text-4xl">
                Christina Massage
              </h2>
              <p className="mt-5 text-base leading-8 text-[#5f6752]">
                {t.directionsText}
              </p>

              <div className="mt-8 space-y-3 text-sm text-[#5f6752]">
                <p>+49 172 2664648</p>
                <p>dobozikriszta76@gmail.com</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#d8d0c2] bg-[#f8f3ea] p-6 text-[#5f6752] shadow-sm">
              <p className="leading-8">
                {language === "de"
                  ? "Die Anfahrt und Parkmöglichkeiten können zusätzlich im Footer oder später über eine eingebettete Karte ergänzt werden."
                  : "A megközelítés és a parkolási lehetőségek később beágyazott térképpel is kiegészíthetők."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2f3528] text-[#efe9db]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
          <div>
            <Image
              src="/images/logo-christina-massage.png"
              alt="Christina Massage"
              width={120}
              height={70}
              className="h-auto w-[110px]"
            />
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#d9d3c6]">
              {language === "de"
                ? "Individuelle Behandlungen für Entspannung, Regeneration und ein besseres Körpergefühl."
                : "Egyéni kezelések a relaxációért, a regenerációért és a jobb testérzetért."}
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.22em] text-[#b9c4a6]">
              Navigation
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#efe9db]">
              <a href="#about">{t.navAbout}</a>
              <a href="#services">{t.navMassages}</a>
              <a href="#hiemt">{t.navHiemt}</a>
              <a href="#extras">{t.navExtras}</a>
              <Link href="/booking">{t.footerBooking}</Link>
              <Link href="/impressum">{t.footerImprint}</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.22em] text-[#b9c4a6]">
              Kontakt
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#efe9db]">
              <p>Christina Dobozi</p>
              <p>Bahnhofstraße 21</p>
              <p>82383 Hohenpeißenberg</p>
              <p>+49 172 2664648</p>
              <p>dobozikriszta76@gmail.com</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/impressum"
                className="rounded-full border border-[#657254] px-4 py-2 text-sm transition hover:bg-[#3a4331]"
              >
                {t.footerImprint}
              </Link>
              <a
                href="#"
                className="rounded-full border border-[#657254] px-4 py-2 text-sm transition hover:bg-[#3a4331]"
              >
                {t.footerPrivacy}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}