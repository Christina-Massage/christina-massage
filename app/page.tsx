"use client";

import { useMemo, useRef, useState } from "react";

type Language = "de" | "hu";

type MassageItem = {
  key: string;
  title: string;
  description: string;
  durations: string[];
  image: string;
};

type InfoSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type InfoEntry = {
  title: string;
  sections: InfoSection[];
};

export default function ChristinaMassageWebsite() {
  const [language, setLanguage] = useState<Language>("de");
  const [showHiemtInfo, setShowHiemtInfo] = useState(false);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
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
        phoneDisplay: "+49 172 2664648",
        phoneLink: "491722664648",
        whatsappLink:
          "https://wa.me/491722664648?text=Hallo%20ich%20möchte%20einen%20Termin%20vereinbaren",
        hiemtWhatsappLink:
          "https://wa.me/491722664648?text=Hallo%20Christina,%20ich%20interessiere%20mich%20für%20eine%20individuelle%20Beratung%20zur%20HIEMT-Behandlung.",
        address: "Bahnhofstraße 21, 82383 Hohenpeißenberg",
        email: "dobozikriszta76@gmail.com",
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
        title: "Fachkompetenz und Sicherheit – Für Ihr Gleichgewicht",
        text: [
          "Die Harmonie von Bewegung und Körper ist nicht nur mein Beruf, sondern meine Lebensphilosophie. Die Liebe zu Sport und Bewegung prägt mein Leben seit meiner Kindheit. Meine berufliche Laufbahn begann ich 2007 als Trainerin, und seither bin ich fasziniert von der erstaunlichen Widerstandsfähigkeit des menschlichen Körpers.",
          "Seit über 10 Jahren helfe ich meinen Gästen, dem Alltagsstress zu entfliehen. Bei jeder Behandlung stelle ich die individuellen Bedürfnisse in den Vordergrund, um ein persönliches Massageerlebnis zu schaffen. Ob Muskelentspannung, Stressabbau, Regeneration oder Erholung – ich passe jede Behandlung individuell an.",
          "Ich glaube, dass Massage mehr ist als nur eine körperliche Behandlung. Sie ist eine wertvolle Auszeit – ein Moment der Ruhe, in dem der Alltag von uns abfällt und wir inneren Frieden und Balance finden. Auch in meinem Leben lege ich Wert auf die Harmonie von Körper, Seele und Geist und begegne meinen Gästen mit dieser Philosophie.",
        ],
        qualificationsTitle:
          "Mein beruflicher Werdegang und meine Qualifikationen",
        qualificationsText: [
          "Ich begann meine Karriere 2007 als Aerobic-Trainerin und erwarb dabei fundierte anatomische Kenntnisse. Meine Leidenschaft für Bewegung führte mich schnell zu Pilates, und 2016 wurde die Massage-Therapie zu meinem Beruf. Seitdem habe ich mein Repertoire stetig erweitert, um meinen Klienten die bestmögliche Unterstützung zu bieten.",
          "Im Laufe meiner beruflichen Laufbahn habe ich unter anderem die schwedische Massage, Wellness-Massagen, die chinesische (Tui-Na) und die indische (Champi) Kopfmassage sowie Spezialtechniken wie Schröpftherapie, Flossing und Narbenbehandlung, Lymphdrainage und Vagus-Therapie erlernt.",
          "Der Ansatz des Faszien-Distorsionsmodells (FDM) ist zentral für meine Arbeit und trägt effektiv zur Linderung von Bindegewebsverspannungen bei. Mein Interesse an den Zusammenhängen zwischen den Körperteilen führte mich zur Viszeraltherapie, zur Behandlung des Leaky-Gut-Syndroms und zur Ernährung sowie zur ganzheitlichen Naturheilkunde (Reflexzonenmassage).",
          "Ich bin überzeugt, dass für eine wahre Heilung die Unterdrückung von Symptomen nicht ausreicht: Wir müssen die Ursachen aufdecken. Als Naturheilpraktikerin und Masseurin betrachte ich den Menschen als Ganzes.",
          "Ich glaube, dass die Einheit von Körper, Geist und Seele die Grundlage für die Regeneration des Körpers schafft. Für mich ist Lernen ein lebenslanger Prozess, denn so kann ich meinen Gästen stets mit aktuellem Wissen zur Erhaltung ihrer Gesundheit helfen.",
        ],
      },
      services: {
        eyebrow: "Massagen",
        title: "Massagen individuell auf dich abgestimmt",
        text:
          "Mit den Pfeilen kannst du durch die Behandlungen klicken. Auf dem Handy kannst du einfach wischen.",
        button: "Termin buchen",
        info: "Info",
        items: [
          {
            key: "swedish",
            title: "Schwedische Massage",
            description:
              "Eine klassische Massage zur Lockerung der Muskulatur, zur Förderung der Durchblutung und für tiefgehende Entspannung.",
            durations: ["60 Min · 60 €", "90 Min · 90 €", "120 Min · 120 €"],
            image: "/swedish.png",
          },
          {
            key: "backNeck",
            title: "Rücken- & Nackenmassage",
            description:
              "Gezielte Behandlung bei Verspannungen im oberen Rücken-, Schulter- und Nackenbereich.",
            durations: ["45 Min · 45 €", "60 Min · 60 €", "75 Min · 75 €"],
            image: "/back-neck.png",
          },
          {
            key: "individual",
            title: "Individualmassage",
            description:
              "Die Behandlung wird auf deine persönlichen Beschwerden, Wünsche und Bedürfnisse abgestimmt.",
            durations: ["60 Min · 60 €", "90 Min · 90 €", "120 Min · 120 €"],
            image: "/individual.png",
          },
          {
            key: "foot",
            title: "Fußmassage",
            description:
              "Wohltuende Behandlung für beanspruchte Füße zur Entlastung und tiefen Entspannung.",
            durations: ["45 Min · 45 €", "60 Min · 60 €"],
            image: "/foot.png",
          },
          {
            key: "lymph",
            title: "Lymphdrainage",
            description:
              "Sanfte Behandlung zur Unterstützung des Lymphflusses und für ein leichteres Körpergefühl.",
            durations: ["60 Min · 60 €", "90 Min · 90 €"],
            image: "/lymph.png",
          },
          {
            key: "vagus",
            title: "Vagus / Stressabbau",
            description:
              "Eine beruhigende Behandlung mit Fokus auf Regeneration, Nervensystem und Entspannung.",
            durations: ["45 Min · 45 €", "60 Min · 60 €"],
            image: "/vagus.png",
          },
          {
            key: "champi",
            title: "Champi – Indische Kopfmassage",
            description:
              "Sanfte und zugleich intensive Entspannung für Kopf, Nacken und Geist.",
            durations: ["45 Min · 45 €", "60 Min · 60 €"],
            image: "/massage-hero.png",
          },
        ] as MassageItem[],
      },
      methods: {
        eyebrow: "Zusatzangebote",
        title: "Therapeutische und ergänzende Behandlungen",
        info: "Info",
        cards: [
          {
            key: "fdm",
            title: "FDM Behandlung",
            text:
              "Das Fasziendistorsionsmodell ist eine moderne und effektive Behandlungsmethode zur gezielten Linderung von Schmerzen im Bewegungsapparat.",
            price: "60 Min · 60 €",
            image: "/fdm.png",
          },
          {
            key: "flossing",
            title: "Flossing",
            text:
              "Flossing ist eine moderne physiotherapeutische Behandlung, die gezielt auf Faszien, Muskeln und Gelenke wirkt.",
            price: "30 / 45 / 60 Min · 30 € / 45 € / 60 €",
            image: "/flossing.png",
          },
          {
            key: "schroepfen",
            title: "Schröpfen",
            text:
              "Traditionelle Therapieform zur Förderung der Durchblutung, Lösung von Verspannungen und Unterstützung des Stoffwechsels.",
            price: "30 Min · 30 €",
            image: "/cupping.png",
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
        whatsappText: "Eine individuelle Beratung ist nur per WhatsApp möglich.",
        whatsappButton: "Beratung per WhatsApp",
        infoButton: "Mehr Informationen",
        infoTitle: "Mehr Informationen zur HIEMT-Behandlung",
        infoSections: [
          {
            heading:
              "Revolutionäre Lösung für die Gesundheit des Beckenbodens – Schmerzfreie Rehabilitation in nur 30 Minuten",
            paragraphs: [
              "Die Gesundheit der Beckenbodenmuskulatur ist von entscheidender Bedeutung für die Funktion unserer Beckenorgane. Eine Schwächung dieser Muskulatur kann nicht nur unangenehm sein, sondern auch die Lebensqualität erheblich beeinträchtigen.",
              "Vergessen Sie komplizierte Übungen. Unsere moderne HIEMT-Technologie bietet eine komfortable, effektive und vollständig nicht-invasive Lösung – geeignet für Frauen und Männer gleichermaßen. Die Behandlung erfolgt bequem in Alltagskleidung und ohne direkten Körperkontakt.",
            ],
          },
          {
            heading: "Vorteile der elektromagnetischen Behandlung",
            bullets: [
              "Sicher, schmerzfrei und ohne bekannte Nebenwirkungen",
              "Für Frauen und Männer geeignet",
              "Eine Behandlungsserie ist intensiver als tausende klassische Beckenbodenübungen",
              "Diskret: Durchführung in Alltagskleidung, kein Entkleiden notwendig",
              "Jede Sitzung dauert nur 30 Minuten",
              "Keine Ausfallzeit – Alltag direkt danach möglich",
              "Leichtes Kribbeln oder Vibrieren statt Schmerzen",
              "Stärkung und Aktivierung der Beckenbodenmuskulatur",
              "Moderne nicht-invasive Technologie",
              "Ergonomische und komfortable Anwendung",
            ],
          },
          {
            heading: "Mögliche Ergebnisse",
            bullets: [
              "Unterstützung bei geschwächter Beckenbodenmuskulatur",
              "Verbesserung bei Belastungsinkontinenz, zum Beispiel beim Husten, Niesen oder Lachen",
              "Aktivierung und Stärkung der Muskulatur",
              "Verbesserung von Durchblutung und Nervenfunktion im Beckenbereich",
              "Unterstützung der Muskelspannung, Kontrolle und Elastizität",
            ],
          },
          {
            heading: "Für wen ist die Behandlung geeignet?",
            bullets: [
              "Bei Harnfunktionsstörungen wie Stress-, Drang- oder Mischinkontinenz",
              "Bei häufigem Wasserlassen oder überaktiver Blase",
              "Bei Beschwerden nach Schwangerschaft und Geburt",
              "Zur Unterstützung nach gynäkologischen Eingriffen",
              "Zur Unterstützung bei geschwächter Beckenbodenmuskulatur",
              "Bei sexuellen Funktionsstörungen",
              "Bei chronischen Beschwerden im Beckenbereich",
              "Auch für Männer zur Unterstützung von Vitalität, Beckenboden und Prostatafunktion",
            ],
          },
          {
            heading: "Wie funktioniert die HIEMT-Technologie?",
            paragraphs: [
              "Das Gerät arbeitet mit hochintensiver elektromagnetischer Energie, die motorische Nerven stimuliert und dadurch intensive Muskelkontraktionen auslöst.",
              "So wird die Beckenbodenmuskulatur tiefgehend aktiviert und trainiert. Ziel ist eine Verbesserung von Muskelkraft, Spannung, Kontrolle und Regeneration.",
            ],
          },
          {
            heading: "Dauer und Ablauf",
            bullets: [
              "Dauer pro Sitzung: 30 Minuten",
              "Empfohlen: 2 bis 3 Sitzungen pro Woche",
              "Ein Behandlungszyklus umfasst meist 6 bis 8 Sitzungen",
              "Die genaue Anzahl kann individuell variieren",
            ],
          },
          {
            heading: "Wann zeigt sich eine Wirkung?",
            bullets: [
              "Oft sind erste Veränderungen bereits nach 1 bis 2 Sitzungen spürbar",
              "Eine stabilere Wirkung zeigt sich nach Abschluss des gesamten Behandlungszyklus",
              "Der vollständige Zyklus wird meist innerhalb von 3 bis 4 Wochen durchgeführt",
            ],
          },
          {
            heading: "Wie fühlt sich die Behandlung an?",
            bullets: [
              "Angenehm und schmerzfrei",
              "Leichtes Kribbeln oder Vibrieren im Beckenbereich",
              "Spürbare Kontraktionen der Beckenbodenmuskulatur",
              "Die Wahrnehmung kann individuell unterschiedlich sein",
            ],
          },
          {
            heading: "Wichtige Hinweise",
            bullets: [
              "Nicht geeignet in der Schwangerschaft",
              "Nicht geeignet bei offenen Wunden oder akuten Entzündungen",
              "Nicht geeignet bei elektronischen Implantaten wie Herzschrittmachern",
              "Nicht geeignet bei bestimmten Metallimplantaten oder Spiralen",
              "Nach Operationen im Beckenbereich sollte vorher ärztlich Rücksprache gehalten werden",
            ],
          },
          {
            heading: "Abschluss",
            paragraphs: [
              "Übernehmen Sie wieder die Kontrolle und gewinnen Sie Ihr Selbstvertrauen zurück. Vereinbaren Sie noch heute einen Termin zur persönlichen Beratung.",
            ],
          },
        ] as InfoSection[],
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
        intro:
          "Ich freue mich darauf, Sie in meinem Massagestudio begrüßen zu dürfen, wo Ihre Entspannung im Mittelpunkt steht. Informationen zu Anfahrt und Parken finden Sie hier:",
        addressLabel: "Adresse:",
        entranceLabel: "Eingang:",
        parkingLabel: "Parken:",
        arrivalLabel: "Ankunft:",
        entranceText:
          "Der Eingang zum Studio befindet sich in der Wettersteinstraße, durch das Gartentor.",
        parkingText:
          "Direkt vor dem Tor stehen Ihnen zwei kostenlose Parkplätze zur Verfügung. Sollten diese belegt sein, finden Sie in den umliegenden Straßen problemlos weitere kostenfreie Parkmöglichkeiten.",
        arrivalText:
          "Bitte kommen Sie nach Ihrer Ankunft in den Warteraum und nehmen Sie dort Platz – ich bin gleich für Sie da.",
      },
      footer: {
        text: "© 2026 Christina Massage",
        imprint: "Impressum",
        privacy: "Datenschutz",
      },
    };

    const hu = {
      brand: {
        name: "Christina Massage",
        city: "Hohenpeißenberg",
        phoneDisplay: "+49 172 2664648",
        phoneLink: "491722664648",
        whatsappLink:
          "https://wa.me/491722664648?text=Szia%2C%20időpontot%20szeretnék%20foglalni",
        hiemtWhatsappLink:
          "https://wa.me/491722664648?text=Szia%2C%20érdeklődni%20szeretnék%20a%20HIEMT%20kezelésről.",
        address: "Bahnhofstraße 21, 82383 Hohenpeißenberg",
        email: "dobozikriszta76@gmail.com",
      },
      nav: {
        about: "Rólam",
        services: "Masszázsok",
        special: "HIEMT",
        methods: "Kiegészítő kezelések",
        expectations: "Miért Christina Massage",
        location: "Megközelítés",
        booking: "Időpontfoglalás",
      },
      hero: {
        title: "Harmónia testnek és léleknek",
        subtitle:
          "Egyéni kezelések, figyelmes kísérés és nyugodt környezet a személyes jóllétedért.",
        primary: "Időpontfoglalás",
        secondary: "Hívás vagy WhatsApp",
      },
      about: {
        eyebrow: "Rólam",
        title: "Szakértelem és biztonság – Az Ön egyensúlyáért",
        text: [
          "A mozgás és a test harmóniája nemcsak a hivatásom, hanem az életszemléletem is. A sport és a mozgás szeretete gyermekkorom óta végigkíséri az életemet. Pályafutásomat 2007-ben edzőként kezdtem, és azóta is lenyűgöz az emberi test csodálatos alkalmazkodóképessége.",
          "Több mint 10 éve segítek vendégeimnek kiszakadni a mindennapi stresszből. Minden kezelés során az egyéni igények állnak a középpontban. Legyen szó izomlazításról, stresszoldásról, regenerációról vagy feltöltődésről – minden kezelést személyre szabok.",
          "Hiszem, hogy a masszázs több mint testi kezelés. Ez egy értékes énidő – a nyugalom pillanata, amikor a hétköznapok terhe lekerül rólunk, és megtalálhatjuk a belső egyensúlyt. Saját életemben is fontos számomra a test, lélek és szellem harmóniája, és ugyanezzel a szemlélettel fordulok vendégeim felé.",
        ],
        qualificationsTitle: "Szakmai pályafutásom és képesítéseim",
        qualificationsText: [
          "Pályafutásomat 2007-ben aerobik edzőként kezdtem, ahol alapos anatómiai ismeretekre tettem szert. A mozgás iránti szenvedélyem hamar a Pilates felé vezetett, majd 2016-ban a masszázsterápia lett a hivatásom. Azóta folyamatosan bővítem tudásomat, hogy vendégeimnek a lehető legjobb támogatást nyújthassam.",
          "Szakmai pályafutásom során többek között elsajátítottam a svédmasszázst, wellness masszázsokat, a kínai (Tui-Na) és indiai (Champi) fejmasszázst, valamint speciális technikákat, mint a köpölyözés, flossing, hegkezelés, nyirokdrenázs és vagus-terápia.",
          "Az FDM megközelítés központi szerepet játszik a munkámban, és hatékonyan hozzájárul a kötőszöveti feszültségek enyhítéséhez. A test különböző részei közötti összefüggések iránti érdeklődésem a viszcerális terápiához, a Leaky-Gut szindróma kezeléséhez, a táplálkozáshoz és a holisztikus természetgyógyászathoz vezetett.",
          "Meggyőződésem, hogy a valódi gyógyuláshoz nem elegendő a tünetek elnyomása: fel kell tárnunk az okokat. Természetgyógyászként és masszőrként az embert egészként szemlélem.",
          "Hiszem, hogy a test, a lélek és a szellem egysége teremti meg a regeneráció alapját. Számomra a tanulás egy élethosszig tartó folyamat, így tudok vendégeimnek mindig naprakész tudással segíteni.",
        ],
      },
      services: {
        eyebrow: "Masszázsok",
        title: "Masszázsok személyre szabva",
        text:
          "A nyilakkal válthatsz a kezelések között, telefonon pedig egyszerűen lapozhatsz.",
        button: "Időpontfoglalás",
        info: "Információ",
        items: [
          {
            key: "swedish",
            title: "Svédmasszázs",
            description:
              "Klasszikus masszázs az izmok lazítására, a vérkeringés támogatására és a mély ellazulásért.",
            durations: ["60 perc · 60 €", "90 perc · 90 €", "120 perc · 120 €"],
            image: "/swedish.png",
          },
          {
            key: "backNeck",
            title: "Hát- és nyakmasszázs",
            description:
              "Célzott kezelés a felső háti, vállövi és nyaki feszültségek oldására.",
            durations: ["45 perc · 45 €", "60 perc · 60 €", "75 perc · 75 €"],
            image: "/back-neck.png",
          },
          {
            key: "individual",
            title: "Egyéni masszázs",
            description:
              "A kezelés a személyes panaszaidhoz és igényeidhez igazodik.",
            durations: ["60 perc · 60 €", "90 perc · 90 €", "120 perc · 120 €"],
            image: "/individual.png",
          },
          {
            key: "foot",
            title: "Talpmasszázs",
            description:
              "Kellemes kezelés a terhelt lábak tehermentesítésére és ellazítására.",
            durations: ["45 perc · 45 €", "60 perc · 60 €"],
            image: "/foot.png",
          },
          {
            key: "lymph",
            title: "Nyirokmasszázs",
            description:
              "Gyengéd kezelés a nyirokáramlás támogatására és a könnyedebb testérzetért.",
            durations: ["60 perc · 60 €", "90 perc · 90 €"],
            image: "/lymph.png",
          },
          {
            key: "vagus",
            title: "Vagus / stresszoldás",
            description:
              "Nyugodt kezelés a regeneráció, az idegrendszer és a belső egyensúly támogatására.",
            durations: ["45 perc · 45 €", "60 perc · 60 €"],
            image: "/vagus.png",
          },
          {
            key: "champi",
            title: "Champi – indiai fejmasszázs",
            description:
              "Gyengéd és mégis hatásos relaxáció fejre, nyakra és a belső nyugalomra.",
            durations: ["45 perc · 45 €", "60 perc · 60 €"],
            image: "/massage-hero.png",
          },
        ] as MassageItem[],
      },
            methods: {
        eyebrow: "Kiegészítő kezelések",
        title: "Terápiás és kiegészítő kezelések",
        info: "Információ",
        cards: [
          {
            key: "fdm",
            title: "FDM kezelés",
            text:
              "Az FDM egy modern manuális kezelési módszer, amely célzottan a fájdalmakra és a mozgáskorlátozottságokra hat.",
            price: "60 perc · 60 €",
            image: "/fdm.png",
          },
          {
            key: "flossing",
            title: "Flossing",
            text:
              "A flossing egy modern fizioterápiás kezelés, amely célzottan hat a fasciákra, izmokra és ízületekre.",
            price: "30 / 45 / 60 perc · 30 € / 45 € / 60 €",
            image: "/flossing.png",
          },
          {
            key: "schroepfen",
            title: "Köpölyözés",
            text:
              "Hagyományos kezelés a vérkeringés serkentésére, a feszültségek oldására és az anyagcsere támogatására.",
            price: "30 perc · 30 €",
            image: "/cupping.png",
          },
        ],
      },
      special: {
        eyebrow: "Különleges kezelés",
        title: "HIEMT medencefenék-tréning",
        text:
          "Különleges kiegészítő kezelés a medencefenék célzott támogatására – diszkréten, korszerűen és kényelmesen.",
        bullets: [
          "30 perc egy alkalom",
          "Alkalmazás csak ruhában",
          "Nem invazív kezelés",
          "A medencefenék célzott aktiválása és erősítése",
        ],
        trialLabel: "Próbaalkalom",
        trialPrice: "30 €",
        packLabel: "10 alkalmas bérlet",
        packPrice: "280 €",
        note:
          "Ideális mindazoknak, akik célzottan szeretnék erősíteni a medencefeneküket és javítani testérzetüket.",
        whatsappText: "Egyéni tanácsadás kizárólag WhatsAppon lehetséges.",
        whatsappButton: "Tanácsadás WhatsAppon",
        infoButton: "További információ",
        infoTitle: "További információk a HIEMT kezelésről",
        infoSections: [
          {
            heading:
              "Forradalmi megoldás a medencefenék egészségéért – Fájdalommentes rehabilitáció 30 perc alatt",
            paragraphs: [
              "A medencefenék izomzatának egészsége kulcsfontosságú a kismedencei szervek megfelelő működéséhez. Ennek az izomzatnak a gyengülése nemcsak kellemetlenséget okozhat, hanem az életminőséget is jelentősen befolyásolhatja.",
              "Felejtse el a bonyolult gyakorlatokat. A modern HIEMT technológia kényelmes, hatékony és teljesen nem invazív megoldást kínál nőknek és férfiaknak egyaránt. A kezelés kényelmesen, utcai ruhában történik, fizikai kontaktus nélkül.",
            ],
          },
          {
            heading: "Az elektromágneses kezelés előnyei",
            bullets: [
              "Biztonságos, fájdalommentes és ismert mellékhatások nélküli",
              "Nők és férfiak számára egyaránt alkalmazható",
              "Egy kezelési kúra intenzívebb lehet, mint több ezer hagyományos gátizomgyakorlat",
              "Diszkrét: utcai ruhában történik, nem kell levetkőzni",
              "Egy kezelés mindössze 30 percet vesz igénybe",
              "Nincs felépülési idő, utána azonnal folytatható a napi rutin",
              "Csak enyhe bizsergés vagy vibráló érzés tapasztalható",
              "A medencefenék izmainak erősítése és aktiválása",
              "Modern, nem invazív technológia",
              "Ergonomikus és kényelmes alkalmazás",
            ],
          },
          {
            heading: "Lehetséges eredmények",
            bullets: [
              "Segítség a meggyengült medencefenék izomzat esetén",
              "Javulás terheléses inkontinencia esetén, például köhögésnél, tüsszentésnél vagy nevetésnél",
              "Az izmok aktiválása és erősítése",
              "A kismedencei vérkeringés és idegi működés támogatása",
              "Az izomfeszülés, kontroll és rugalmasság javítása",
            ],
          },
          {
            heading: "Kinek ajánlott a kezelés?",
            bullets: [
              "Húgyúti funkciózavarok esetén, például stressz-, sürgető- vagy kevert inkontinenciánál",
              "Gyakori vizelés vagy túlműködő hólyag esetén",
              "Terhesség és szülés utáni regeneráció támogatására",
              "Nőgyógyászati beavatkozások utáni támogatásra",
              "Gyenge medencefenék izomzat esetén",
              "Szexuális funkciózavarok esetén",
              "Krónikus kismedencei panaszoknál",
              "Férfiak számára is a vitalitás, a medencefenék és a prosztatafunkció támogatására",
            ],
          },
          {
            heading: "Hogyan működik a HIEMT technológia?",
            paragraphs: [
              "A készülék nagy intenzitású elektromágneses energiával stimulálja a motoros idegeket, ezáltal intenzív izomösszehúzódásokat vált ki.",
              "Ennek köszönhetően a medencefenék izomzata mélyen aktiválódik és edződik. A cél az izomerő, az izomtónus, a kontroll és a regeneráció javítása.",
            ],
          },
          {
            heading: "Időtartam és kezelési menet",
            bullets: [
              "Egy kezelés időtartama: 30 perc",
              "Ajánlott: heti 2–3 alkalom",
              "Egy kezelési ciklus általában 6–8 alkalomból áll",
              "Az alkalmak száma egyénenként eltérhet",
            ],
          },
          {
            heading: "Mikor érezhető a hatása?",
            bullets: [
              "Sokan már 1–2 kezelés után éreznek változást",
              "A stabilabb eredmény a teljes kezelési ciklus után várható",
              "A teljes kúra általában 3–4 hét alatt elvégezhető",
            ],
          },
          {
            heading: "Milyen érzés a kezelés?",
            bullets: [
              "Kényelmes és fájdalommentes",
              "Enyhe bizsergés vagy vibrálás a kismedencei területen",
              "Érezhető izomösszehúzódások a medencefenékben",
              "Az érzékelés egyénenként eltérő lehet",
            ],
          },
          {
            heading: "Fontos tudnivalók",
            bullets: [
              "Terhesség alatt nem alkalmazható",
              "Nyílt seb vagy akut gyulladás esetén nem javasolt",
              "Elektronikus implantátum, például pacemaker esetén nem alkalmazható",
              "Bizonyos fémimplantátumok vagy spirál esetén nem javasolt",
              "Kismedencei műtét után előtte orvosi egyeztetés szükséges",
            ],
          },
          {
            heading: "Zárás",
            paragraphs: [
              "Szerezze vissza az irányítást és az önbizalmát. Jelentkezzen még ma személyes tanácsadásra.",
            ],
          },
        ] as InfoSection[],
      },
      booking: {
        eyebrow: "Online foglalás",
        title: "Kényelmes online időpontkérés",
        text:
          "Válaszd ki a kezelést, az időtartamot és a kívánt időpontot. A foglaláshoz regisztráció szükséges.",
        button: "Naptár megnyitása",
      },
      expectations: {
        eyebrow: "Amit a Christina Massage-nál megtapasztalhatsz",
        title: "Személyes, nyugodt és figyelmes kísérés",
        items: [
          {
            title: "Egyéni figyelem",
            text:
              "Minden kezelést a személyes panaszaidhoz és igényeidhez igazítok.",
          },
          {
            title: "Holisztikus szemlélet",
            text:
              "A test, a regeneráció és a nyugalom mindig összefüggésben kerülnek szemléletre.",
          },
          {
            title: "Nyugodt légkör",
            text:
              "Egy hely, ahol elengedhetsz, megpihenhetsz és új energiát gyűjthetsz.",
          },
        ],
      },
      location: {
        eyebrow: "Megközelítés",
        title: "Így találsz meg",
        intro:
          "Szeretettel várom Önt masszázsstúdiómban, ahol a pihenés és a feltöltődés áll a középpontban. Az alábbiakban talál információkat a megközelítésről és a parkolásról:",
        addressLabel: "Cím:",
        entranceLabel: "Bejárat:",
        parkingLabel: "Parkolás:",
        arrivalLabel: "Érkezés:",
        entranceText:
          "A stúdió bejárata a Wettersteinstraße felől, a kerti kapun keresztül érhető el.",
        parkingText:
          "Közvetlenül a kapu előtt két ingyenes parkolóhely áll rendelkezésre. Amennyiben ezek foglaltak, a környező utcákban további ingyenes parkolási lehetőségek találhatók.",
        arrivalText:
          "Kérjük, érkezés után fáradjon be a váróhelyiségbe, és foglaljon helyet – hamarosan Önhöz megyek.",
      },
      footer: {
        text: "© 2026 Christina Massage",
        imprint: "Impresszum",
        privacy: "Adatvédelem",
      },
    };

    return language === "de" ? de : hu;
  }, [language]);

  const c = content as any;

  const infoContent = useMemo<Record<string, { de: InfoEntry; hu: InfoEntry }>>(
    () => ({
      swedish: {
        de: {
          title: "Schwedische Massage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Schwedische Massage ist eine der bekanntesten und am weitesten verbreiteten Massageformen weltweit. Sie bildet die Grundlage vieler moderner Massagetechniken und dient in erster Linie der Entspannung, Lockerung der Muskulatur und Förderung des allgemeinen Wohlbefindens.",
                "Durch eine Kombination aus sanften und kräftigeren Grifftechniken wird der gesamte Körper harmonisiert und revitalisiert. Diese Massage eignet sich sowohl für Menschen mit Stress und Verspannungen als auch für diejenigen, die sich einfach eine wohltuende Auszeit vom Alltag gönnen möchten.",
              ],
            },
            {
              heading: "Ziele der Schwedischen Massage",
              bullets: [
                "Förderung der Durchblutung",
                "Lösung von Muskelverspannungen",
                "Stressabbau und mentale Entspannung",
                "Verbesserung der Sauerstoffversorgung des Gewebes",
                "Unterstützung des Lymphflusses",
                "Steigerung des allgemeinen Wohlbefindens",
                "Förderung eines erholsamen Schlafs",
              ],
            },
            {
              heading: "Typische Grifftechniken",
              bullets: [
                "Effleurage (Streichungen) – Sanfte, gleitende Bewegungen mit den Handflächen.",
                "Petrissage (Knetungen) – Muskeln werden angehoben, geknetet und gerollt.",
                "Friktionen (Reibungen) – Kreisende, tiefgehende Bewegungen mit den Fingern oder Daumen.",
                "Tapotement (Klopfungen) – Rhythmische Klopfbewegungen mit den Handkanten oder Fingerspitzen.",
                "Vibrationen – Feine, zitternde Bewegungen zur Lockerung der Muskulatur.",
              ],
            },
            {
              heading: "Ablauf einer Behandlung",
              bullets: [
                "Vorgespräch zur Klärung individueller Beschwerden und Wünsche",
                "Vorbereitung mit warmem Massageöl und bequemer Lagerung auf der Massageliege",
                "Beginn mit sanften Streichungen, anschließend intensivere Techniken",
                "Individuelle Anpassung von Druck und Tempo",
                "Kurze Ruhephase nach der Massage",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "60 Minuten – Teilkörpermassage",
                "90 Minuten – Klassische Ganzkörpermassage",
                "120 Minuten – Intensivere und besonders entspannende Behandlung",
              ],
            },
            {
              heading: "Für wen ist die Schwedische Massage geeignet?",
              bullets: [
                "Menschen mit Stress und Alltagsbelastungen",
                "Personen mit Muskelverspannungen",
                "Büroangestellte mit Nacken- und Rückenschmerzen",
                "Sportler zur Regeneration",
                "Alle, die Entspannung und Wohlbefinden suchen",
              ],
            },
            {
              heading: "Positive Wirkungen",
              bullets: [
                "Senkung des Stresshormons Cortisol",
                "Förderung der Endorphin-Ausschüttung",
                "Verbesserung der Beweglichkeit",
                "Stärkung des Immunsystems",
                "Harmonisierung von Körper und Geist",
              ],
            },
            {
              heading: "Kontraindikationen",
              bullets: [
                "Akute Entzündungen oder Infektionen",
                "Fieber",
                "Frische Verletzungen oder Operationen",
                "Thrombose oder schwere Gefäßerkrankungen",
                "Offene Wunden oder Hauterkrankungen",
                "Bestimmte Herz-Kreislauf-Erkrankungen",
              ],
            },
          ],
        },
        hu: {
          title: "Svédmasszázs",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A svédmasszázs az egyik legismertebb és legelterjedtebb masszázstípus világszerte. Elsődleges célja az izmok ellazítása, a vérkeringés javítása és az általános jó közérzet elősegítése.",
                "A kezelés gyengéd és erőteljes fogások kombinációjával harmonizálja és revitalizálja az egész testet.",
              ],
            },
            {
              heading: "A svédmasszázs céljai",
              bullets: [
                "A vérkeringés javítása",
                "Izomfeszültségek oldása",
                "Stresszcsökkentés és mentális ellazulás",
                "A szövetek oxigénellátásának javítása",
                "A nyirokkeringés támogatása",
                "Az általános közérzet fokozása",
                "A pihentető alvás elősegítése",
              ],
            },
          ],
        },
      },

      backNeck: {
        de: {
          title: "Nacken- und Rückenmassage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Nacken- und Rückenmassage ist eine gezielte Teilkörpermassage, die speziell auf die am häufigsten von Verspannungen betroffenen Bereiche des Körpers ausgerichtet ist.",
                "Durch langes Sitzen, Stress, einseitige Belastungen oder körperliche Überanstrengung entstehen häufig Muskelverhärtungen im Nacken-, Schulter- und Rückenbereich. Diese Massageform dient dazu, Schmerzen zu lindern, Verspannungen zu lösen und das allgemeine Wohlbefinden zu steigern.",
              ],
            },
            {
              heading: "Ziele der Nacken- und Rückenmassage",
              bullets: [
                "Lösung von Muskelverspannungen im Nacken- und Rückenbereich",
                "Schmerzlinderung bei Verspannungen und Fehlhaltungen",
                "Förderung der Durchblutung und Sauerstoffversorgung der Muskulatur",
                "Verbesserung der Beweglichkeit von Nacken und Schultern",
                "Stressabbau und mentale Entspannung",
                "Vorbeugung von Kopfschmerzen und Spannungskopfschmerzen",
                "Unterstützung einer gesunden Körperhaltung",
              ],
            },
            {
              heading: "Typische Grifftechniken",
              bullets: [
                "Effleurage (Streichungen)",
                "Petrissage (Knetungen)",
                "Friktionen (Reibungen)",
                "Triggerpunktbehandlung",
                "Dehnungen und Mobilisationen",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "45 Minuten – Kurze, gezielte Behandlung bei akuten Verspannungen",
                "60 Minuten – Intensivere Behandlung mit Fokus auf Problembereiche",
                "75 Minuten – Umfassende und besonders entspannende Therapie",
              ],
            },
            {
              heading: "Positive Wirkungen",
              bullets: [
                "Reduzierung von Muskelhärte und Schmerzen",
                "Verbesserung der Körperhaltung",
                "Steigerung des Bewegungsumfangs",
                "Aktivierung des parasympathischen Nervensystems",
                "Förderung von Entspannung und innerer Ruhe",
                "Verbesserung der Schlafqualität",
              ],
            },
            {
              heading: "Kontraindikationen",
              bullets: [
                "Akute Entzündungen oder Infektionen",
                "Fieber",
                "Frische Verletzungen oder Operationen",
                "Bandscheibenvorfälle im akuten Stadium",
                "Thrombose oder schwere Gefäßerkrankungen",
                "Offene Wunden oder Hauterkrankungen",
                "Schwere neurologische Erkrankungen",
              ],
            },
          ],
        },
        hu: {
          title: "Hát- és nyakmasszázs",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A hát- és nyakmasszázs egy célzott résztestmasszázs, amely a leggyakrabban feszültté váló területekre összpontosít.",
                "Segít az izomfeszültség oldásában, a fájdalom csökkentésében és az általános közérzet javításában.",
              ],
            },
          ],
        },
      },

      individual: {
        de: {
          title: "Individualmassage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Individualmassage ist eine maßgeschneiderte Behandlung, die speziell auf die persönlichen Bedürfnisse, Beschwerden und Wünsche des Kunden abgestimmt wird.",
                "Im Gegensatz zu standardisierten Massageformen kombiniert sie verschiedene manuelle Techniken, um ein optimales therapeutisches und entspannendes Ergebnis zu erzielen.",
              ],
            },
            {
              heading: "Ziele der Individualmassage",
              bullets: [
                "Individuelle Linderung von Muskelverspannungen",
                "Schmerzlinderung bei spezifischen Beschwerden",
                "Förderung der Durchblutung und des Stoffwechsels",
                "Verbesserung der Beweglichkeit",
                "Stressabbau und mentale Entspannung",
                "Unterstützung der Regeneration nach körperlicher Belastung",
                "Steigerung des allgemeinen Wohlbefindens",
              ],
            },
            {
              heading: "Typische Grifftechniken",
              bullets: [
                "Effleurage (Streichungen)",
                "Petrissage (Knetungen)",
                "Friktionen (Reibungen)",
                "Triggerpunktbehandlung",
                "Dehnungen und Mobilisationen",
                "Faszientechniken",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "60 Minuten – Gezielte Behandlung einzelner Problemzonen",
                "90 Minuten – Umfassende, individuell angepasste Massage",
                "120 Minuten – Intensive Ganzkörperbehandlung mit Fokus auf mehrere Beschwerdebereiche",
              ],
            },
          ],
        },
        hu: {
          title: "Egyéni masszázs",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "Az egyéni masszázs személyre szabott kezelés, amely a vendég egyéni panaszaihoz, igényeihez és kívánságaihoz igazodik.",
              ],
            },
          ],
        },
      },

      foot: {
        de: {
          title: "Fußmassage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Fußmassage ist eine wohltuende und zugleich therapeutische Behandlung, die sich auf die Entspannung und Aktivierung der Füße konzentriert.",
                "Unsere Füße tragen uns täglich durch den Alltag und sind dabei enormen Belastungen ausgesetzt. Durch gezielte Massagegriffe werden Verspannungen gelöst, die Durchblutung gefördert und das allgemeine Wohlbefinden gesteigert.",
              ],
            },
            {
              heading: "Ziele der Fußmassage",
              bullets: [
                "Förderung der Durchblutung der Füße",
                "Lösung von Muskelverspannungen",
                "Entspannung von Körper und Geist",
                "Linderung von müden und schweren Beinen",
                "Unterstützung der Regeneration nach körperlicher Belastung",
                "Verbesserung der Beweglichkeit der Fußgelenke",
                "Steigerung des allgemeinen Wohlbefindens",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "45 Minuten – Intensivere Massage mit zusätzlicher Mobilisation",
                "60 Minuten – Umfassende Behandlung inklusive optionalem Fußbad",
              ],
            },
            {
              heading: "Kontraindikationen",
              bullets: [
                "Offene Wunden oder Hauterkrankungen an den Füßen",
                "Akute Entzündungen oder Infektionen",
                "Frische Verletzungen oder Operationen",
                "Thrombose oder schweren Gefäßerkrankungen",
                "Stark ausgeprägten Krampfadern im akuten Stadium",
                "Ansteckenden Fußpilzerkrankungen",
              ],
            },
          ],
        },
        hu: {
          title: "Talpmasszázs",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A lábmasszázs egy kellemes és terápiás kezelés, amely a lábak ellazítására és aktiválására összpontosít.",
              ],
            },
          ],
        },
      },
            lymph: {
        de: {
          title: "Manuelle Lymphdrainage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Manuelle Lymphdrainage (MLD) ist eine besonders sanfte und rhythmische Massagetechnik, die darauf abzielt, den Lymphfluss im Körper zu fördern und überschüssige Gewebsflüssigkeit abzutransportieren.",
                "Durch gezielte, kreisförmige und pumpende Grifftechniken wird das Lymphsystem aktiviert, wodurch Schwellungen reduziert und die Entgiftung des Körpers unterstützt werden.",
              ],
            },
            {
              heading: "Ziele der Lymphdrainage",
              bullets: [
                "Reduktion von Schwellungen",
                "Förderung des Lymphabflusses",
                "Unterstützung des Immunsystems",
                "Verbesserung der Wundheilung",
                "Schmerzlinderung bei Schwellungen",
                "Förderung der Entgiftung des Körpers",
                "Tiefe Entspannung und Stressreduktion",
                "Verbesserung der Haut- und Gewebsstruktur",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "60 Minuten – Standardbehandlung einer Region",
                "90 Minuten – Umfassende Behandlung mehrerer Körperbereiche",
              ],
            },
          ],
        },
        hu: {
          title: "Manuális nyirokmasszázs",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A manuális nyirokmasszázs rendkívül gyengéd és ritmikus kezelés, amely támogatja a nyirokkeringést és a felesleges folyadék elszállítását.",
              ],
            },
          ],
        },
      },

      vagus: {
        de: {
          title: "Vagus-Massage zur Stressreduktion",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Vagus-Massage ist eine sanfte und tief entspannende Behandlung, die darauf abzielt, den Vagusnerv zu stimulieren.",
                "Durch gezielte, ruhige Berührungen im Bereich von Nacken, Hals, Kopf und Gesicht wird das parasympathische Nervensystem aktiviert – auch bekannt als der Ruhe- und Regenerationsmodus des Körpers.",
              ],
            },
            {
              heading: "Ziele der Vagus-Massage",
              bullets: [
                "Reduktion von Stress und Anspannung",
                "Aktivierung des parasympathischen Nervensystems",
                "Förderung von innerer Ruhe und Gelassenheit",
                "Verbesserung der Schlafqualität",
                "Unterstützung der emotionalen Balance",
                "Regulierung der Herzfrequenz",
                "Förderung der Verdauung",
                "Linderung von Spannungskopfschmerzen",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "45 Minuten – Intensivere Behandlung mit Fokus auf Nacken und Kopf",
                "60 Minuten – Umfassende Vagus-Massage für maximale Entspannung",
              ],
            },
          ],
        },
        hu: {
          title: "Vagus masszázs a stressz csökkentésére",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A vagus masszázs egy gyengéd és mélyen relaxáló kezelés, amelynek célja a bolygóideg stimulálása.",
              ],
            },
          ],
        },
      },

      champi: {
        de: {
          title: "Champi Kopfmassage (Indische Kopfmassage)",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Champi Kopfmassage, auch bekannt als indische Kopfmassage, ist eine traditionelle Behandlung mit Ursprung in der indischen Heilkunst des Ayurveda.",
                "Diese Massage konzentriert sich auf Kopf, Nacken, Schultern und Gesicht und zielt darauf ab, Körper und Geist in Einklang zu bringen.",
              ],
            },
            {
              heading: "Ziele der Champi Kopfmassage",
              bullets: [
                "Tiefe Entspannung von Körper und Geist",
                "Stressabbau und Reduktion innerer Unruhe",
                "Förderung der Durchblutung der Kopfhaut",
                "Unterstützung des Haarwachstums",
                "Linderung von Spannungskopfschmerzen",
                "Verbesserung der Konzentrationsfähigkeit",
                "Aktivierung des Energieflusses im Körper",
                "Förderung eines erholsamen Schlafs",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "45 Minuten – Umfassende Massage von Kopf, Nacken und Schultern",
                "60 Minuten – Intensive Behandlung inklusive Gesichtsmassage",
              ],
            },
          ],
        },
        hu: {
          title: "Champi fejmasszázs (Indiai fejmasszázs)",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A Champi fejmasszázs hagyományos ájurvédikus kezelés, amely a fejre, nyakra, vállakra és arcra összpontosít.",
              ],
            },
          ],
        },
      },

      fdm: {
        de: {
          title: "FDM – Fascial Distortion Model",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Das Fascial Distortion Model (FDM) ist ein innovatives und wirkungsvolles Behandlungskonzept zur Therapie von Schmerzen und Bewegungseinschränkungen des Bewegungsapparates.",
                "Im Mittelpunkt steht die Annahme, dass viele Schmerzen und Funktionsstörungen auf Verformungen der Faszien zurückzuführen sind.",
              ],
            },
            {
              heading: "Ziele der FDM-Behandlung",
              bullets: [
                "Schnelle Schmerzlinderung",
                "Verbesserung der Beweglichkeit",
                "Wiederherstellung der Faszienfunktion",
                "Behandlung von akuten und chronischen Beschwerden",
                "Unterstützung der sportlichen Leistungsfähigkeit",
                "Beschleunigung der Regeneration nach Verletzungen",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "60 Minuten – Intensive und umfassende Behandlung komplexer Beschwerdebilder",
              ],
            },
          ],
        },
        hu: {
          title: "FDM – Fascia Disztorziós Modell",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "Az FDM egy innovatív és hatékony kezelési módszer a mozgásszervi fájdalmak és mozgáskorlátozottságok enyhítésére.",
              ],
            },
            {
              heading: "A kezelés időtartama",
              bullets: ["60 perc – Intenzív és átfogó kezelés komplex panaszok esetén"],
            },
          ],
        },
      },

      flossing: {
        de: {
          title: "Flossing",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Flossing ist eine komplexe physiotherapeutische Behandlung, die vor allem das Bindegewebe, die Muskeln und die Gelenke beeinflusst.",
                "Das Wesentliche der Behandlung ist die straffe Kompression mit einem speziellen Gummiband, das seine positive Wirkung durch mechanische und physiologische Effekte entfaltet.",
              ],
            },
            {
              heading: "Hauptanwendungsgebiete",
              bullets: [
                "Verbesserung der Gelenkbeweglichkeit",
                "Rehabilitation nach Verstauchungen und Zerrungen",
                "Schmerzlinderung bei akuten und chronischen Beschwerden",
                "Reduktion von Ödemen und Schwellungen",
                "Mobilisation von Narbengewebe",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "30 Minuten – Gezielte Behandlung",
                "45 Minuten – Umfassendere Therapie",
                "60 Minuten – Intensive Behandlung komplexer Beschwerdebilder",
              ],
            },
          ],
        },
        hu: {
          title: "Flossing terápia",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A flossing egy komplex fizioterápiás kezelés, amely elsősorban a fasciákra, izmokra és ízületekre hat.",
              ],
            },
          ],
        },
      },

      schroepfen: {
        de: {
          title: "Schröpfen (Cupping Therapy)",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Schröpfen ist eine traditionelle Therapieform, die seit Jahrhunderten in verschiedenen Kulturen angewendet wird.",
                "Ziel der Behandlung ist es, durch das Erzeugen eines Unterdrucks in speziellen Schröpfgläsern die Durchblutung anzuregen, Verspannungen zu lösen und den Stoffwechsel zu aktivieren.",
              ],
            },
            {
              heading: "Ziele des Schröpfens",
              bullets: [
                "Förderung der Durchblutung",
                "Lösung von Muskelverspannungen",
                "Aktivierung des Stoffwechsels",
                "Unterstützung der Entgiftungsprozesse",
                "Schmerzlinderung",
                "Stimulation des Immunsystems",
                "Förderung der Regeneration",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: ["30 Minuten – Gezielte Behandlung einzelner Bereiche"],
            },
          ],
        },
        hu: {
          title: "Köpölyözés (Cupping terápia)",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A köpölyözés egy hagyományos terápiás módszer, amelyet évszázadok óta alkalmaznak.",
              ],
            },
          ],
        },
      },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-[#f6efe5] text-stone-800">
      <header className="sticky top-0 z-50 border-b border-[#6f7d58] bg-[#7a8662]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <nav className="hidden items-center gap-8 text-sm text-white lg:flex">
            <a href="#ueber" className="hover:text-[#f5efe3]">{c.nav.about}</a>
            <a href="#leistungen" className="hover:text-[#f5efe3]">{c.nav.services}</a>
            <a href="#special" className="hover:text-[#f5efe3]">{c.nav.special}</a>
          </nav>

          <div className="flex flex-col items-center">
            <img
              src="/logo-christina-massage.png"
              alt="Christina Massage Logo"
              className="h-16 w-auto object-contain md:h-20"
            />
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[#f2ecdf]">
              {c.brand.city}
            </p>
          </div>

          <div className="hidden items-center gap-8 text-sm text-white lg:flex">
            <a href="#zusatzangebote" className="hover:text-[#f5efe3]">{c.nav.methods}</a>
            <a href="#anfahrt" className="hover:text-[#f5efe3]">{c.nav.location}</a>
            <a
              href="/booking"
              className="rounded-full border border-[#f5efe3] px-5 py-2.5 font-medium text-[#f5efe3] hover:bg-[#f5efe3] hover:text-[#556246]"
            >
              {c.nav.booking}
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl justify-end px-6 pb-3 lg:px-10">
          <div className="rounded-full border border-[#d8d0c2] bg-white/90 p-1">
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
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              {c.about.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              {c.about.title}
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
              <img
                src="/christina-about.jpg"
                alt="Christina"
                className="h-[420px] w-full object-cover object-center md:h-[520px]"
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
                <div className="space-y-3 text-base leading-8 text-stone-700">
                  {c.about.text.map((paragraph: string) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#ddd3c2] bg-[#efe7da] p-6 shadow-sm md:p-8">
                <h3 className="text-2xl font-semibold text-stone-900">
                  {c.about.qualificationsTitle}
                </h3>
                <div className="mt-5 space-y-3 text-base leading-8 text-stone-700">
                  {c.about.qualificationsText.map((paragraph: string) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
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

                <div className="mt-6 rounded-2xl border border-[#cfd8bf] bg-[#edf4e3] p-5">
                  <p className="text-sm font-medium text-[#4e5f3f]">
                    {c.special.whatsappText}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={c.brand.hiemtWhatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full bg-[#6f7d58] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f6c4a]"
                    >
                      {c.special.whatsappButton}
                    </a>

                    <button
                      onClick={() => setShowHiemtInfo(true)}
                      className="inline-block rounded-full border border-[#6f7d58] px-6 py-3 text-sm font-semibold text-[#556246] transition hover:bg-[#eef3e6]"
                    >
                      {c.special.infoButton}
                    </button>
                  </div>
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
                  key={service.key}
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

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                          <a
                            href="/booking"
                            className="inline-block rounded-none bg-[#405e3f] px-8 py-4 text-base font-medium text-white transition hover:-translate-y-0.5"
                          >
                            {c.services.button}
                          </a>

                          <button
                            onClick={() => setActiveInfo(service.key)}
                            className="rounded-none border border-[#405e3f] px-8 py-4 text-base font-medium text-[#405e3f] transition hover:bg-[#eef3e6]"
                          >
                            {c.services.info}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(120,100,80,0.12)]">
                      <img
                        src={service.image}
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
                key={card.key}
                className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-stone-900">
                    {card.title}
                  </h3>
                  <p className="mt-5 leading-8 text-stone-600">{card.text}</p>
                  <div className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#405e3f]">
                    {card.price}
                  </div>

                  <button
                    onClick={() => setActiveInfo(card.key)}
                    className="mt-6 inline-block rounded-none border border-[#405e3f] px-6 py-3 text-[#405e3f] transition hover:bg-[#eef3e6]"
                  >
                    {c.methods.info}
                  </button>
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
            className="mt-10 inline-block rounded-full bg-[#567a57] px-8 py-4 text-base font-medium text-white hover:opacity-90"
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

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
              <img
                src="/entrance.jpg"
                alt="Eingang Christina Massage"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
              <p className="text-base leading-8 text-stone-700">
                {c.location.intro}
              </p>

              <div className="mt-6 space-y-3 text-base leading-7 text-stone-700">
                <p>
                  <strong>{c.location.addressLabel}</strong> Bahnhofstraße 21, 82383 Hohenpeißenberg
                </p>
                <p>
                  <strong>{c.location.entranceLabel}</strong> {c.location.entranceText}
                </p>
                <p>
                  <strong>{c.location.parkingLabel}</strong> {c.location.parkingText}
                </p>
                <p>
                  <strong>{c.location.arrivalLabel}</strong> {c.location.arrivalText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white/50 px-6 py-8 text-sm text-stone-500 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>{c.footer.text}</p>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-stone-800">
              {c.footer.imprint}
            </a>
            <a href="#" className="hover:text-stone-800">
              {c.footer.privacy}
            </a>
          </div>
        </div>
      </footer>

      {showHiemtInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-[#f8f5ef] p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[#7a8566]">
                  HIEMT
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-stone-900 md:text-3xl">
                  {c.special.infoTitle}
                </h3>
              </div>

              <button
                onClick={() => setShowHiemtInfo(false)}
                className="rounded-full bg-white px-4 py-2 text-sm text-stone-700 shadow-sm"
              >
                {language === "de" ? "Schließen" : "Bezárás"}
              </button>
            </div>

            <div className="mt-8 space-y-8">
              {c.special.infoSections.map((section: any) => (
                <div key={section.heading}>
                  <h4 className="text-lg font-semibold text-[#556246]">
                    {section.heading}
                  </h4>

                  {section.paragraphs && (
                    <div className="mt-4 space-y-4 text-sm leading-8 text-stone-700 md:text-base">
                      {section.paragraphs.map((paragraph: string) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {section.bullets && (
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700 md:text-base">
                      {section.bullets.map((bullet: string) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-[10px] h-2 w-2 rounded-full bg-[#6f7d58]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeInfo && infoContent[activeInfo] && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-[#f8f5ef] p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold text-stone-900">
                {infoContent[activeInfo][language].title}
              </h3>
              <button
                onClick={() => setActiveInfo(null)}
                className="rounded-full bg-white px-4 py-2 text-sm text-stone-700 shadow-sm"
              >
                {language === "de" ? "Schließen" : "Bezárás"}
              </button>
            </div>

            <div className="mt-6 space-y-6 text-stone-700">
              {infoContent[activeInfo][language].sections.map((section, index) => (
                <div key={`${section.heading}-${index}`}>
                  <h4 className="text-lg font-semibold text-[#405e3f]">
                    {section.heading}
                  </h4>

                  {section.paragraphs && (
                    <div className="mt-2 space-y-2">
                      {section.paragraphs.map((p, i) => (
                        <p key={`${p}-${i}`}>{p}</p>
                      ))}
                    </div>
                  )}

                  {section.bullets && (
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      {section.bullets.map((b, i) => (
                        <li key={`${b}-${i}`}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}