"use client";

import { useMemo, useRef, useState } from "react";

type Language = "de" | "hu";

type ServiceCard = {
  key: string;
  title: string;
  description: string;
  durations: string[];
  image: string;
};

type MethodCard = {
  key: string;
  title: string;
  text: string;
  price: string;
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
  const servicesSliderRef = useRef<HTMLDivElement | null>(null);
  const methodsSliderRef = useRef<HTMLDivElement | null>(null);

  const scrollSlider = (
    ref: React.MutableRefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.88;
    ref.current.scrollBy({
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
        email: "christina.massage.fdm@gmail.com",
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
          "Im Laufe meiner beruflichen Laufbahn habe ich unter anderem die schwedische Massage, Wellness-Massagen, die chinesische (Tui-Na) und die indische (Champi) Kopfmassage sowie Spezialtechniken wie Schröpftherapie, Flossing, Narbenbehandlung, Lymphdrainage und Vagus-Therapie erlernt.",
          "Der Ansatz des Faszien-Distorsionsmodells (FDM) ist zentral für meine Arbeit und trägt effektiv zur Linderung von Bindegewebsverspannungen bei. Mein Interesse an den Zusammenhängen zwischen den Körperteilen führte mich zur Viszeraltherapie, zur Behandlung des Leaky-Gut-Syndroms und zur Ernährung sowie zur ganzheitlichen Naturheilkunde.",
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
              "Klassische Ganz- oder Teilkörpermassage zur Entspannung, Lockerung der Muskulatur und Förderung des allgemeinen Wohlbefindens.",
            durations: ["60 Min · 60 €", "90 Min · 90 €", "120 Min · 120 €"],
            image: "/swedish.png",
          },
          {
            key: "backNeck",
            title: "Rücken- & Nackenmassage",
            description:
              "Gezielte Behandlung für Schulter-, Nacken- und Rückenbereich bei Verspannungen, Fehlhaltungen und stressbedingten Beschwerden.",
            durations: ["45 Min · 45 €", "60 Min · 60 €", "75 Min · 75 €"],
            image: "/back-neck.png",
          },
          {
            key: "individual",
            title: "Individuelle Massage",
            description:
              "Eine persönliche und flexible Behandlung, die exakt auf deine Beschwerden, Wünsche und körperlichen Bedürfnisse abgestimmt wird.",
            durations: ["60 Min · 60 €", "90 Min · 90 €", "120 Min · 120 €"],
            image: "/individual.png",
          },
          {
            key: "foot",
            title: "Fußmassage",
            description:
              "Wohltuende Behandlung zur Entlastung, Entspannung und Aktivierung stark beanspruchter Füße und Beine.",
            durations: ["45 Min · 45 €", "60 Min · 60 €"],
            image: "/foot.png",
          },
          {
            key: "lymph",
            title: "Lymphdrainage",
            description:
              "Besonders sanfte und rhythmische Behandlung zur Förderung des Lymphflusses und zur Reduktion von Schwellungen.",
            durations: ["60 Min · 60 €", "90 Min · 90 €"],
            image: "/lymph.png",
          },
          {
            key: "vagus",
            title: "Vagus / Stressabbau",
            description:
              "Sanfte und tief entspannende Behandlung zur Beruhigung des Nervensystems und zur Unterstützung innerer Balance.",
            durations: ["45 Min · 45 €", "60 Min · 60 €"],
            image: "/vagus.png",
          },
          {
            key: "champi",
            title: "Champi – Indische Kopfmassage",
            description:
              "Traditionelle ayurvedische Kopfmassage für tiefe Entspannung, mentale Ruhe und neue Energie.",
            durations: ["45 Min · 45 €", "60 Min · 60 €"],
            image: "/champi.png",
          },
        ] as ServiceCard[],
      },
      methods: {
        eyebrow: "Zusatzangebote",
        title: "Therapeutische und ergänzende Behandlungen",
        text:
          "Auch bei den Zusatzleistungen kannst du durch die Karten wischen und dir über den Info-Button detaillierte Beschreibungen ansehen.",
        info: "Info",
        items: [
          {
            key: "fdm",
            title: "FDM Behandlung",
            text:
              "Innovatives Behandlungskonzept zur Therapie von Schmerzen und Bewegungseinschränkungen des Bewegungsapparates.",
            price: "60 Min · 60 €",
            image: "/fdm.png",
          },
          {
            key: "flossing",
            title: "Flossing",
            text:
              "Moderne physiotherapeutische Methode zur gezielten Behandlung von Faszien, Muskeln und Gelenken.",
            price: "30 Min · 30 €",
            image: "/flossing.png",
          },
          {
            key: "schroepfen",
            title: "Schröpfen",
            text:
              "Traditionelle Vakuumtherapie zur Förderung der Durchblutung, Entspannung der Muskulatur und Lösung von Verklebungen.",
            price: "30 Min · 30 €",
            image: "/cupping.png",
          },
          {
            key: "scarTreatment",
            title: "Narbenbehandlung",
            text:
              "Gezielte Behandlung zur Verbesserung von Beweglichkeit, Gewebequalität und Funktion von Narben und verklebtem Gewebe.",
            price: "30 / 60 Min · 30 € / 60 €",
            image: "/Narbenbehandlung.png",
          },
        ] as MethodCard[],
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
        whatsappText:
          "Eine individuelle Beratung ist nur per WhatsApp möglich.",
        whatsappButton: "Beratung per WhatsApp",
        infoButton: "Mehr Informationen",
        infoTitle: "Mehr Informationen zur HIEMT-Behandlung",
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
          "Ich freue mich darauf, Sie in meinem Studio begrüßen zu dürfen, wo Ihre Entspannung im Mittelpunkt steht. Informationen zu Anfahrt und Parken finden Sie hier:",
        seoText:
          "Christina Massage befindet sich in Hohenpeißenberg und ist auch im Umkreis sehr gut erreichbar.",
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
      close: "Schließen",
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
        email: "christina.massage.fdm@gmail.com",
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
          "Pályafutásomat 2007-ben aerobik edzőként kezdtem, ahol alapos anatómiai ismeretekre tettem szert. A mozgás iránti szenvedélyem hamar a Pilates felé vezetett, majd 2016-ban a masszázsterápia lett a hivatásom.",
          "Szakmai pályafutásom során többek között elsajátítottam a svédmasszázst, wellness masszázsokat, a kínai (Tui-Na) és indiai (Champi) fejmasszázst, valamint speciális technikákat, mint a köpölyözés, flossing, hegkezelés, nyirokelvezetés és vagus-terápia.",
          "Az FDM megközelítés központi szerepet játszik a munkámban, és hatékonyan hozzájárul a kötőszöveti feszültségek enyhítéséhez. A test különböző részei közötti összefüggések iránti érdeklődésem a viszcerális terápiához, a Leaky-Gut szindróma kezeléséhez, a táplálkozáshoz és a holisztikus természetgyógyászathoz vezetett.",
          "Meggyőződésem, hogy a valódi gyógyuláshoz nem elegendő a tünetek elnyomása: fel kell tárnunk az okokat. Természetgyógyászként és masszőrként az embert egészként szemlélem.",
          "Hiszem, hogy a test, a lélek és a szellem egysége teremti meg a regeneráció alapját. Számomra a tanulás egy élethosszig tartó folyamat.",
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
              "Klasszikus teljes vagy résztest masszázs relaxációra, izomlazításra és az általános jó közérzet támogatására.",
            durations: ["60 perc · 60 €", "90 perc · 90 €", "120 perc · 120 €"],
            image: "/swedish.png",
          },
          {
            key: "backNeck",
            title: "Hát- és nyakmasszázs",
            description:
              "Célzott kezelés a váll, a nyak és a hát területére feszültség, helytelen tartás és stressz okozta panaszok esetén.",
            durations: ["45 perc · 45 €", "60 perc · 60 €", "75 perc · 75 €"],
            image: "/back-neck.png",
          },
          {
            key: "individual",
            title: "Egyéni masszázs",
            description:
              "Személyre szabott és rugalmas kezelés, amely pontosan az egyéni panaszokhoz és igényekhez igazodik.",
            durations: ["60 perc · 60 €", "90 perc · 90 €", "120 perc · 120 €"],
            image: "/individual.png",
          },
          {
            key: "foot",
            title: "Talpmasszázs",
            description:
              "Kellemes kezelés a lábak és a lábfejek tehermentesítésére, ellazítására és aktiválására.",
            durations: ["45 perc · 45 €", "60 perc · 60 €"],
            image: "/foot.png",
          },
          {
            key: "lymph",
            title: "Nyirokelvezetés",
            description:
              "Különösen gyengéd és ritmikus kezelés a nyirokkeringés támogatására és a duzzanatok csökkentésére.",
            durations: ["60 perc · 60 €", "90 perc · 90 €"],
            image: "/lymph.png",
          },
          {
            key: "vagus",
            title: "Vagus / stresszoldás",
            description:
              "Gyengéd és mélyen ellazító kezelés az idegrendszer nyugtatására és a belső egyensúly támogatására.",
            durations: ["45 perc · 45 €", "60 perc · 60 €"],
            image: "/vagus.png",
          },
          {
            key: "champi",
            title: "Champi – indiai fejmasszázs",
            description:
              "Hagyományos ájurvédikus fejmasszázs a mély relaxációért, mentális nyugalomért és új energiáért.",
            durations: ["45 perc · 45 €", "60 perc · 60 €"],
            image: "/champi.png",
          },
        ] as ServiceCard[],
      },
      methods: {
        eyebrow: "Kiegészítő kezelések",
        title: "Terápiás és kiegészítő kezelések",
        text:
          "A kiegészítő kezeléseknél is lapozhatsz a kártyák között, és az Információ gombbal részletes leírást is megnyithatsz.",
        info: "Információ",
        items: [
          {
            key: "fdm",
            title: "FDM kezelés",
            text:
              "Innovatív kezelési koncepció a mozgásszervi fájdalmak és mozgáskorlátozottság kezelésére.",
            price: "60 perc · 60 €",
            image: "/fdm.png",
          },
          {
            key: "flossing",
            title: "Flossing",
            text:
              "Modern fizioterápiás módszer a fasciák, izmok és ízületek célzott kezelésére.",
            price: "30 perc · 30 €",
            image: "/flossing.png",
          },
          {
            key: "schroepfen",
            title: "Köpölyözés",
            text:
              "Hagyományos vákuumterápia a vérkeringés javítására, izomlazításra és letapadások oldására.",
            price: "30 perc · 30 €",
            image: "/cupping.png",
          },
          {
            key: "scarTreatment",
            title: "Hegkezelés",
            text:
              "Célzott kezelés a hegek mozgathatóságának, szöveti minőségének és funkciójának javítására.",
            price: "30 / 60 perc · 30 € / 60 €",
            image: "/Narbenbehandlung.png",
          },
        ] as MethodCard[],
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
          "Szeretettel várom Önt stúdiómban, ahol a pihenés és a feltöltődés áll a középpontban. Az alábbiakban talál információkat a megközelítésről és a parkolásról:",
        seoText:
          "A Christina Massage Hohenpeißenbergben található, és a környező településekről is könnyen megközelíthető.",
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
      close: "Bezárás",
    };

    return language === "de" ? de : hu;
  }, [language]);

  const c = content as any;
    const hiemtInfo = useMemo<{ de: InfoEntry; hu: InfoEntry }>(
    () => ({
      de: {
        title: "HIEMT Beckenboden-Training",
        sections: [
          {
            heading:
              "Revolutionäre Lösung für die Gesundheit des Beckenbodens – schmerzfreie Rehabilitation in nur 30 Minuten",
            paragraphs: [
              "Die Gesundheit der Beckenbodenmuskulatur ist für die Funktion unserer Beckenorgane von zentraler Bedeutung. Eine Schwächung dieser Muskulatur kann nicht nur unangenehm sein, sondern die Lebensqualität erheblich beeinträchtigen.",
              "Vergessen Sie komplizierte Übungen: Unser modernes HIEMT-System bietet eine komfortable, äußerst effektive und nicht-invasive Lösung für Frauen und Männer. Die Behandlung erfolgt bequem in Alltagskleidung, ohne Entkleiden und ohne direkten Körperkontakt.",
            ],
          },
          {
            heading: "Warum elektromagnetische Behandlung?",
            bullets: [
              "Sicher: schmerzfrei, nicht invasiv und ohne Nebenwirkungen",
              "Für Frauen und Männer geeignet",
              "Maximale Effizienz: ein Behandlungszyklus kann intensiver sein als Tausende klassische Beckenbodenübungen",
              "Völlig diskret: Behandlung in normaler Kleidung, ohne körperlichen Kontakt",
              "Nur 30 Minuten pro Sitzung",
              "Keine Narkose, keine Operation, keine Ausfallzeit",
              "Nach der Behandlung kann der Alltag sofort fortgesetzt werden",
              "Nur ein leichtes Kribbeln oder Vibrationsgefühl statt Schmerzen",
              "Gezielte Aktivierung und Kräftigung der Beckenbodenmuskulatur",
              "Fortschrittliche nicht invasive Technologie ohne Gewebeschädigung",
              "FDA- und CE-zertifizierte, klinisch geprüfte Technologie",
              "Ergonomisches Design für angenehmes Sitzen während der Anwendung",
            ],
          },
          {
            heading: "Mögliche Ergebnisse",
            bullets: [
              "Vorbeugung oder Verbesserung von Blasen-, Gebärmutter- oder Enddarmabsenkung",
              "Reduktion von Urinverlust beim Husten, Niesen oder Lachen",
              "Aktivierung und Kräftigung des Beckenbodengewebes",
              "Wiederherstellung von Muskelspannung und Elastizität",
              "Verbesserung der Durchblutung und Nervenfunktion im Beckenboden",
              "Kräftigung des PC-Muskels zur Unterstützung von Sensibilität und Sexualfunktion",
            ],
          },
          {
            heading: "Für wen kann die HIEMT-Behandlung sinnvoll sein?",
            bullets: [
              "Bei Harnfunktionsstörungen wie Belastungsinkontinenz, Dranginkontinenz oder häufigem Wasserlassen",
              "Bei Stuhlentleerungsstörungen wie Verstopfung oder Stuhlinkontinenz",
              "Zur Rehabilitation nach der Geburt oder bei körperlichen Veränderungen",
              "Nach gynäkologischen Eingriffen zur Wiederherstellung des Beckenbodens",
              "Für Frauen mit Kinderwunsch als unterstützende Maßnahme",
              "Bei sexuellen Funktionsstörungen, z. B. bei Erektionsproblemen oder verminderter Empfindung",
              "Für Männer, die ihre Vitalität steigern und den Beckenboden stärken möchten",
              "Bei chronischen Beckenbeschwerden oder begleitenden Unterleibsbeschwerden",
            ],
          },
          {
            heading: "Wie funktioniert die Behandlung?",
            paragraphs: [
              "Das Gerät arbeitet mit HIEMT-Technologie, also einem hochintensiven fokussierten elektromagnetischen Feld. Dabei werden motorische Nervenzellen stimuliert, sodass es zu sehr intensiven Muskelkontraktionen kommt.",
              "Diese Muskelkontraktionen trainieren die gesamte Beckenbodenmuskulatur tiefgehend, kräftigen das Gewebe und fördern die natürliche Spannkraft und Elastizität. Die Technologie erreicht die Muskulatur bis in eine Tiefe von etwa 10 cm.",
              "Die Behandlung aktiviert gezielt den Beckenboden, verbessert dessen bewusste Kontrolle und fördert Koordination, Kraft und Regeneration des Gewebes.",
            ],
          },
          {
            heading: "Wofür ist die HIEMT-IntimPad-Behandlung gedacht?",
            paragraphs: [
              "Die HIEMT-Behandlung unterstützt insbesondere die Kräftigung einer geschwächten oder gelockerten Beckenbodenmuskulatur, zum Beispiel nach Schwangerschaft oder Geburt.",
              "Ziel ist die Verbesserung des Muskelzustands, die Wiederherstellung von Kontrolle und Spannkraft sowie die Unterstützung der physiologischen Funktionen.",
            ],
          },
          {
            heading: "Dauer und Behandlungszyklus",
            bullets: [
              "Eine Sitzung dauert 30 Minuten",
              "Empfohlen sind 2 bis 3 Sitzungen pro Woche",
              "Ein Behandlungszyklus umfasst in der Regel 6 bis 8 Sitzungen",
              "Die genaue Anzahl kann je nach Beschwerdebild individuell variieren",
            ],
          },
          {
            heading: "Wann zeigt sich die Wirkung?",
            bullets: [
              "Viele Menschen bemerken bereits nach 1 bis 2 Sitzungen erste Veränderungen",
              "Die Verbesserung setzt sich in den folgenden Wochen fort",
              "Empfohlen wird die vollständige Durchführung des Zyklus für ein stabileres Ergebnis",
              "Ein kompletter Zyklus wird meist innerhalb von 3 bis 4 Wochen abgeschlossen",
              "Bei Harninkontinenz kann sich die Lebensqualität deutlich verbessern",
            ],
          },
          {
            heading: "Wie lange hält die Wirkung an?",
            paragraphs: [
              "Klinische Beobachtungen zeigen, dass auch Monate nach einer vollständigen Behandlungsserie häufig noch positive Effekte vorhanden sind.",
              "Wie jeder Muskel kann auch die Beckenbodenmuskulatur mit der Zeit wieder schwächer werden, wenn sie nicht weiter aktiviert wird. Deshalb kann die Behandlung auch präventiv oder als regelmäßige Erhaltung sinnvoll sein.",
            ],
          },
          {
            heading: "Wie fühlt sich die Behandlung an?",
            bullets: [
              "Bequem und schmerzfrei",
              "Leichtes Pulsieren oder sanfte Vibration im Beckenbodenbereich",
              "Spürbare Muskelaktivität und Kontraktionen",
              "Das Empfinden kann individuell unterschiedlich sein und hängt auch von körperlichem und mentalem Zustand ab",
            ],
          },
          {
            heading: "Gibt es Strahlenbelastung?",
            paragraphs: [
              "Die HIEMT-Technologie ist keine Strahlentherapie. Elektromagnetische Felder begegnen uns auch im Alltag, etwa bei Mobiltelefonen oder Haushaltsgeräten.",
            ],
          },
          {
            heading: "Was ist bei IUD / Spirale zu beachten?",
            paragraphs: [
              "Bei metallhaltigen intrauterinen Verhütungsmitteln sollte vor einer Behandlung unbedingt ärztlich abgeklärt werden, ob die Anwendung geeignet ist.",
              "Aus Sicherheitsgründen wird in solchen Fällen empfohlen, vor der Behandlung Rücksprache zu halten, da Erwärmung oder Lageveränderungen theoretisch nicht ausgeschlossen werden können.",
            ],
          },
          {
            heading: "Kontraindikationen",
            bullets: [
              "Schwangerschaft",
              "Menstruation oder abnormale Gebärmutterblutungen",
              "Offene Wunden, Entzündungen oder starke Hämorrhoiden",
              "Thrombosen, Embolien oder schwere Lungen- und Gefäßerkrankungen",
              "Blutgerinnungsstörungen oder Antikoagulantientherapie",
              "Krebserkrankungen, unbehandelte Herzkrankheiten oder unbehandelter Bluthochdruck",
              "Demenz, Epilepsie oder schwere neurologische Erkrankungen",
              "Elektronische Implantate wie Pacemaker, Defibrillator, Neurostimulator oder Medikamentenpumpe",
              "Metallische Implantate oder Metallspiralen im Behandlungsbereich",
              "Frisch erfolgte Operationen im Beckenbereich",
              "Nach Schwangerschaftsabbruch erst nach ärztlicher Rücksprache und stabiler Heilungsphase",
            ],
          },
        ],
      },
      hu: {
        title: "HIEMT medencefenék-tréning",
        sections: [
          {
            heading:
              "Forradalmi megoldás a medencefenék egészségéért – fájdalommentes rehabilitáció 30 perc alatt",
            paragraphs: [
              "A medencefenék izomzatának egészsége kulcsfontosságú a kismedencei szervek megfelelő működéséhez. Az izmok gyengülése nemcsak kellemetlenséget okozhat, hanem az életminőséget is jelentősen befolyásolhatja.",
              "Felejtse el a bonyolult gyakorlatokat: modern HIEMT rendszerünk kényelmes, rendkívül hatékony és nem invazív megoldást kínál nőknek és férfiaknak egyaránt. A kezelés utcai ruhában történik, vetkőzés és fizikai kontaktus nélkül.",
            ],
          },
          {
            heading: "Miért válassza az elektromágneses kezelést?",
            bullets: [
              "Biztonságos, fájdalommentes és nem invazív",
              "Nők és férfiak számára egyaránt alkalmas",
              "Maximális hatékonyság a medencefenék célzott aktiválására",
              "Teljesen diszkrét, ruhában végezhető",
              "Csak 30 perc egy kezelés",
              "Nincs érzéstelenítés, műtét vagy felépülési idő",
              "A kezelés után azonnal folytathatók a napi teendők",
              "Csak enyhe bizsergő vagy vibrációs érzés tapasztalható",
              "A medencefenék izmainak célzott erősítése",
              "Fejlett, nem invazív technológia károsodás nélkül",
              "FDA- és CE-minősítéssel rendelkező, klinikailag igazolt technológia",
              "Ergonomikus kialakítás a kényelmes testtartás érdekében",
            ],
          },
          {
            heading: "Lehetséges eredmények",
            bullets: [
              "A hólyag, a méh vagy a végbél süllyedésének megelőzése vagy javítása",
              "A köhögés, tüsszentés vagy nevetés okozta vizeletszivárgás csökkentése",
              "A medencefenék szöveteinek aktiválása és erősítése",
              "Az izomfeszesség és rugalmasság helyreállítása",
              "A medencefenék vérkeringésének és idegműködésének javítása",
              "A PC-izom erősítése az érzékenység és a szexuális funkció támogatására",
            ],
          },
          {
            heading: "Kinek ajánlott?",
            bullets: [
              "Vizeletfunkciós zavarok esetén",
              "Székletürítési zavarok esetén",
              "Szülés utáni rehabilitációhoz",
              "Nőgyógyászati műtétek után",
              "Teherbe esni próbáló nők számára támogatásként",
              "Szexuális diszfunkciók esetén",
              "Férfiak számára vitalitásuk fokozására és a medencefenék erősítésére",
              "Krónikus kismedencei panaszok esetén",
            ],
          },
          {
            heading: "Hogyan működik?",
            paragraphs: [
              "A készülék HIEMT technológiával, azaz nagy intenzitású fókuszált elektromágneses mezővel dolgozik. Ennek során a motoros idegsejtek stimulálódnak, és intenzív izomösszehúzódások jönnek létre.",
              "Ezek az összehúzódások mélyen átdolgozzák a teljes medencefenék izomzatát, erősítik a szöveteket, valamint javítják a természetes tartást és rugalmasságot. A technológia kb. 10 cm mélységig hat.",
              "A kezelés célzottan aktiválja a medencefenék izmait, javítja azok tudatos irányítását, valamint támogatja a koordinációt, az erőt és a regenerációt.",
            ],
          },
          {
            heading: "Mire való a HIEMT kezelés?",
            paragraphs: [
              "A HIEMT kezelés különösen hasznos a terhesség vagy szülés után meggyengült, meglazult medencefenék izmok megerősítésére.",
              "Célja az izmok állapotának javítása, a kontroll és az izomfeszülés visszanyerése, valamint az élettani funkciók támogatása.",
            ],
          },
          {
            heading: "Kezelési idő és kúra",
            bullets: [
              "Egy alkalom 30 percet vesz igénybe",
              "Heti 2–3 alkalom javasolt",
              "Egy kezelési ciklus általában 6–8 alkalomból áll",
              "A pontos alkalomszám egyénileg eltérhet",
            ],
          },
          {
            heading: "Mikor jelentkezik a hatás?",
            bullets: [
              "Sokan már 1–2 kezelés után éreznek változást",
              "A javulás a következő hetekben fokozódhat",
              "Ajánlott a teljes ciklus elvégzése a stabilabb eredményért",
              "A teljes kúra általában 3–4 hét alatt befejezhető",
              "Vizeletinkontinencia esetén az életminőség jelentősen javulhat",
            ],
          },
          {
            heading: "Meddig tart a hatása?",
            paragraphs: [
              "Klinikai tapasztalatok alapján a teljes kezelési ciklus után hónapokkal is fennmaradhatnak a pozitív eredmények.",
              "A medencefenék izomzata ugyanúgy gyengülhet, mint bármely más izom, ha nem kap rendszeres ingerlést. Ezért a kezelés fenntartó céllal is alkalmazható.",
            ],
          },
          {
            heading: "Milyen érzés a kezelés?",
            bullets: [
              "Kényelmes és fájdalommentes",
              "Enyhe lüktetés vagy vibráció a medencefenék területén",
              "Érezhető izommunka és összehúzódások",
              "Az érzet egyénenként eltérő lehet",
            ],
          },
          {
            heading: "Van sugárzási kár?",
            paragraphs: [
              "A HIEMT technológia nem sugárterápia. Elektromágneses mezőkkel a mindennapokban is találkozunk, például telefonok vagy háztartási eszközök esetén.",
            ],
          },
          {
            heading: "Mire kell figyelni spirál esetén?",
            paragraphs: [
              "Fém tartalmú méhen belüli eszköz esetén a kezelés előtt mindenképpen orvosi egyeztetés javasolt.",
              "Biztonsági okból ilyen helyzetekben mindig előzetes szakmai konzultáció szükséges.",
            ],
          },
          {
            heading: "Ellenjavallatok",
            bullets: [
              "Terhesség",
              "Menstruáció vagy rendellenes méhvérzés",
              "Nyílt seb, gyulladás vagy súlyos aranyér",
              "Trombózis, embólia, súlyos ér- vagy tüdőbetegség",
              "Vérzékenység vagy véralvadásgátló kezelés",
              "Daganatos betegségek, kezeletlen szívbetegség vagy magas vérnyomás",
              "Demencia, epilepszia vagy súlyos neurológiai állapot",
              "Pacemaker, defibrillátor, idegstimulátor, gyógyszerpumpa vagy más elektronikus implantátum",
              "Fém implantátumok vagy fém spirál a kezelési területen",
              "Friss kismedencei műtét",
              "Terhességmegszakítás után csak orvosi jóváhagyással",
            ],
          },
        ],
      },
    }),
    []
  );

  const infoContent = useMemo<Record<string, { de: InfoEntry; hu: InfoEntry }>>(
    () => ({
      swedish: {
        de: {
          title: "Schwedische Massage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Schwedische Massage ist eine der bekanntesten und am weitesten verbreiteten Massageformen weltweit. Sie bildet die Grundlage vieler moderner Massagetechniken und dient in erster Linie der Entspannung, Lockerung der Muskulatur und Förderung des allgemeinen Wohlbefindens. Durch eine Kombination aus sanften und kräftigeren Grifftechniken wird der gesamte Körper harmonisiert und revitalisiert.",
                "Diese Massage eignet sich sowohl für Menschen mit Stress und Verspannungen als auch für diejenigen, die sich einfach eine wohltuende Auszeit vom Alltag gönnen möchten.",
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
                "Effleurage (Streichungen)",
                "Petrissage (Knetungen)",
                "Friktionen (Reibungen)",
                "Tapotement (Klopfungen)",
                "Vibrationen (Erschütterungen)",
              ],
            },
            {
              heading: "Ablauf einer Behandlung",
              bullets: [
                "Vorgespräch zur Klärung individueller Beschwerden und Wünsche",
                "Vorbereitung mit warmem Massageöl und entspannter Lagerung",
                "Beginn mit sanften Streichungen, dann intensivere Techniken",
                "Individuelle Anpassung von Druck und Tempo",
                "Kurze Ruhephase nach der Massage",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "60 Minuten: Teilkörpermassage",
                "90 Minuten: klassische Ganzkörpermassage",
                "120 Minuten: intensivere und besonders entspannende Behandlung",
              ],
            },
            {
              heading: "Für wen geeignet?",
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
                "A svédmasszázs a masszázs egyik legismertebb és legelterjedtebb formája. Számos modern masszázstechnika alapját képezi, elsősorban a relaxációt, az izmok ellazítását és az általános jó közérzet elősegítését szolgálja.",
                "A gyengéd és erősebb masszázstechnikák kombinációjával az egész test harmonizálódik és revitalizálódik. Ez a masszázs alkalmas stressztől és feszültségtől szenvedők számára, valamint azoknak, akik egyszerűen csak szeretnének egy pihentető szünetet élvezni és kiszakadni a mindennapi rohanó életükből.",
              ],
            },
            {
              heading: "A svédmasszázs céljai",
              bullets: [
                "A vérkeringés elősegítése",
                "Az izomfeszültség enyhítése",
                "A stressz csökkentése és a lelki ellazulás",
                "A szövetek oxigénellátásának javítása",
                "A nyirokkeringés támogatása",
                "Fokozott általános jólét",
                "A pihentető alvás elősegítése",
              ],
            },
            {
              heading: "Tipikus fogási technikák",
              bullets: [
                "Effleurage (simogatás)",
                "Petrissage (gyúrás)",
                "Súrlódás (dörzsölés)",
                "Tapotement (kopogtatás)",
                "Rezgések",
              ],
            },
            {
              heading: "Kezelési folyamat",
              bullets: [
                "Előzetes konzultáció az egyéni panaszok és kívánságok tisztázása érdekében",
                "Előkészítés meleg masszázsolajjal és kényelmes elhelyezkedéssel",
                "Kezdés gyengéd mozdulatokkal, majd intenzívebb technikákkal",
                "A nyomás és a tempó egyéni beállítása",
                "Rövid pihenőidő a masszázs után",
              ],
            },
            {
              heading: "A kezelés időtartama",
              bullets: [
                "60 perc – részleges testmasszázs",
                "90 perc – klasszikus teljes testes masszázs",
                "120 perc – intenzívebb és különösen pihentető kezelés",
              ],
            },
            {
              heading: "Kinek ajánlott?",
              bullets: [
                "Stresszel és mindennapi terhekkel küzdő emberek",
                "Izomfeszültséggel küzdő emberek",
                "Nyak- és hátfájással küzdő irodai dolgozók",
                "Sportolók regenerációra",
                "Bárki, aki pihenésre és jólétre vágyik",
              ],
            },
            {
              heading: "Pozitív hatások",
              bullets: [
                "A stresszhormon kortizol szintjének csökkentése",
                "Az endorfin felszabadulásának elősegítése",
                "A mobilitás javítása",
                "Az immunrendszer erősítése",
                "A test és lélek harmonizálása",
              ],
            },
            {
              heading: "Ellenjavallatok",
              bullets: [
                "Akut gyulladás vagy fertőzés",
                "Láz",
                "Friss sérülések vagy műtétek",
                "Trombózis vagy súlyos érrendszeri betegségek",
                "Nyílt sebek vagy bőrbetegségek",
                "Bizonyos szív- és érrendszeri betegségek",
              ],
            },
          ],
        },
      },

      backNeck: {
        de: {
          title: "Rücken- und Nackenmassage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Nacken- und Rückenmassage ist eine gezielte Teilkörpermassage, die speziell auf die am häufigsten von Verspannungen betroffenen Bereiche des Körpers ausgerichtet ist. Durch langes Sitzen, Stress, einseitige Belastungen oder körperliche Überanstrengung entstehen häufig Muskelverhärtungen im Nacken-, Schulter- und Rückenbereich.",
                "Diese Massageform dient dazu, Schmerzen zu lindern, Verspannungen zu lösen und das allgemeine Wohlbefinden zu steigern. Sie kombiniert klassische Massagetechniken mit individuell angepasstem Druck und eignet sich sowohl zur akuten Behandlung von Beschwerden als auch zur präventiven Entspannung.",
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
              heading: "Ablauf einer Behandlung",
              bullets: [
                "Vorgespräch zur Klärung individueller Beschwerden, Schmerzpunkte und Wünsche",
                "Vorbereitung in bequemer Bauchlage auf der Liege",
                "Verwendung von warmem Massageöl",
                "Fokus auf Nacken, Schultern sowie oberen und mittleren Rücken",
                "Kurze Ruhephase nach der Behandlung",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "45 Minuten: kurze, gezielte Behandlung bei akuten Verspannungen",
                "60 Minuten: intensivere Behandlung mit Fokus auf Problembereiche",
                "75 Minuten: umfassende und besonders entspannende Therapie",
              ],
            },
            {
              heading: "Für wen geeignet?",
              bullets: [
                "Menschen mit sitzender Tätigkeit",
                "Personen mit Stress und Alltagsbelastungen",
                "Menschen mit Nackensteife oder Rückenschmerzen",
                "Personen mit Spannungskopfschmerzen",
                "Sportler zur Regeneration",
                "Alle, die gezielte Entspannung suchen",
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
                "A hát- és nyakmasszázs egy célzott résztestmasszázs, amely kifejezetten a test leggyakrabban feszült területeire összpontosít. Hosszú ülés, stressz, egyoldalú terhelés vagy fizikai túlterhelés következtében gyakran alakul ki izomkeményedés a nyak, váll és hát területén.",
                "Ez a kezelési forma a fájdalom enyhítését, a feszültség oldását és az általános közérzet javítását szolgálja. Klasszikus masszázstechnikákat kombinál egyénileg igazított nyomással, így akut panaszok esetén és megelőzésként is ideális.",
              ],
            },
            {
              heading: "A hát- és nyakmasszázs céljai",
              bullets: [
                "A nyak- és hátizmok feszültségének oldása",
                "Fájdalomcsillapítás feszesség és helytelen tartás esetén",
                "A vérkeringés és az oxigénellátás javítása",
                "A nyak és váll mobilitásának javítása",
                "Stresszcsökkentés és mentális ellazulás",
                "A fejfájás és feszültségből eredő fejfájás megelőzése",
                "Az egészséges testtartás támogatása",
              ],
            },
            {
              heading: "Tipikus fogások",
              bullets: [
                "Effleurage (simítások)",
                "Petrissage (gyúrás)",
                "Frikciók (dörzsölések)",
                "Triggerpont kezelés",
                "Nyújtások és mobilizációk",
              ],
            },
            {
              heading: "A kezelés menete",
              bullets: [
                "Előzetes beszélgetés az egyéni panaszok és fájdalompontok tisztázására",
                "Kényelmes hason fekvő helyzet a kezelőágyon",
                "Meleg masszázsolaj használata",
                "Fókusz a nyakon, vállakon, felső és középső hátszakaszon",
                "Rövid pihenőidő a kezelés után",
              ],
            },
            {
              heading: "A kezelés időtartama",
              bullets: [
                "45 perc – rövid, célzott kezelés akut feszültségek esetén",
                "60 perc – intenzívebb kezelés a problémás területekre összpontosítva",
                "75 perc – átfogó és különösen pihentető kezelés",
              ],
            },
            {
              heading: "Kinek ajánlott?",
              bullets: [
                "Ülő munkát végző embereknek",
                "Stresszel és mindennapi terheléssel élőknek",
                "Nyakmerevségben vagy hátfájásban szenvedőknek",
                "Feszültség okozta fejfájás esetén",
                "Sportolóknak regenerációhoz",
                "Mindenkinek, aki célzott ellazulást keres",
              ],
            },
            {
              heading: "Pozitív hatások",
              bullets: [
                "Az izomkeménység és fájdalom csökkentése",
                "A testtartás javítása",
                "A mozgástartomány növelése",
                "A paraszimpatikus idegrendszer aktiválása",
                "A nyugalom és belső béke elősegítése",
                "Az alvásminőség javítása",
              ],
            },
            {
              heading: "Ellenjavallatok",
              bullets: [
                "Akut gyulladás vagy fertőzés",
                "Láz",
                "Friss sérülések vagy műtétek",
                "Akut porckorongsérv",
                "Trombózis vagy súlyos érrendszeri betegség",
                "Nyílt sebek vagy bőrbetegség",
                "Súlyos neurológiai betegségek",
              ],
            },
          ],
        },
      },

      individual: {
        de: {
          title: "Individuelle Massage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Individualmassage ist eine maßgeschneiderte Behandlung, die speziell auf die persönlichen Bedürfnisse, Beschwerden und Wünsche des Kunden abgestimmt wird. Im Gegensatz zu standardisierten Massageformen kombiniert sie verschiedene manuelle Techniken, um ein optimales therapeutisches und entspannendes Ergebnis zu erzielen.",
                "Diese Behandlung erfolgt ohne den Einsatz von Hot Stones und konzentriert sich ausschließlich auf die gezielte Anwendung manueller Grifftechniken. Dadurch kann besonders flexibel auf Verspannungen, Schmerzpunkte und individuelle Problemzonen eingegangen werden.",
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
              heading: "Ablauf einer Behandlung",
              bullets: [
                "Vorgespräch und Erfassung der individuellen Ziele",
                "Auswahl der passenden Körperbereiche und Techniken",
                "Beginn mit sanften Griffen, danach gezielte intensivere Behandlung",
                "Flexible Anpassung während der gesamten Behandlung",
                "Kurze Ruhephase nach der Massage",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "60 Minuten – gezielte Behandlung einzelner Problemzonen",
                "90 Minuten – umfassende, individuell angepasste Massage",
                "120 Minuten – intensive Ganzkörperbehandlung mit Fokus auf mehrere Beschwerdebereiche",
              ],
            },
            {
              heading: "Für wen geeignet?",
              bullets: [
                "Menschen mit spezifischen muskulären Beschwerden",
                "Personen mit Stress und hoher Alltagsbelastung",
                "Sportler zur Regeneration und Leistungssteigerung",
                "Menschen mit einseitigen Belastungen",
                "Personen, die eine flexible und persönliche Behandlung wünschen",
                "Alle, die tiefe Entspannung suchen",
              ],
            },
            {
              heading: "Positive Wirkungen",
              bullets: [
                "Individuell angepasste Schmerzlinderung",
                "Verbesserung der Körperwahrnehmung",
                "Förderung der Regeneration",
                "Aktivierung des parasympathischen Nervensystems",
                "Reduktion von Stress und innerer Unruhe",
                "Steigerung der Lebensqualität",
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
                "Schwere Herz-Kreislauf-Erkrankungen",
                "Akute Bandscheibenvorfälle",
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
                "Az egyéni masszázs egy személyre szabott kezelés, amelyet kifejezetten a kliens személyes igényeihez, betegségeihez és kívánságaihoz igazítanak. A standardizált masszázstechnikákkal ellentétben különféle manuális technikákat kombinál az optimális terápiás és relaxációs eredmények elérése érdekében.",
              ],
            },
            {
              heading: "Az egyéni masszázs céljai",
              bullets: [
                "Az izomfeszültség egyénre szabott enyhítése",
                "Fájdalomcsillapítás specifikus panaszok esetén",
                "A vérkeringés és az anyagcsere elősegítése",
                "A mobilitás javítása",
                "Stresszcsökkentés és mentális relaxáció",
                "A regeneráció támogatása fizikai megterhelés után",
                "Az általános jólét növelése",
              ],
            },
            {
              heading: "Tipikus technikák",
              bullets: [
                "Effleurage (simogatás)",
                "Petrissage (gyúrás)",
                "Frikció (dörzsölés)",
                "Triggerpont terápia",
                "Nyújtások és mobilizációk",
                "Fasciális technikák",
              ],
            },
            {
              heading: "A kezelés időtartama",
              bullets: [
                "60 perc – az egyes problémás területek célzott kezelése",
                "90 perc – átfogó, személyre szabott masszázs",
                "120 perc – intenzív teljes testes kezelés, amely több területre összpontosít",
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
                "Die Fußmassage ist eine wohltuende und zugleich therapeutische Behandlung, die sich auf die Entspannung und Aktivierung der Füße konzentriert. Unsere Füße tragen uns täglich durch den Alltag und sind dabei enormen Belastungen ausgesetzt.",
                "Durch gezielte Massagegriffe werden Verspannungen gelöst, die Durchblutung gefördert und das allgemeine Wohlbefinden gesteigert. Je nach Ausführung kann die Fußmassage sowohl tief entspannend als auch aktivierend und belebend wirken.",
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
                "45 Minuten – intensivere Massage mit zusätzlicher Mobilisation",
                "60 Minuten – umfassende Behandlung inklusive optionalem Fußbad",
              ],
            },
            {
              heading: "Kontraindikationen",
              bullets: [
                "Offene Wunden oder Hauterkrankungen an den Füßen",
                "Akute Entzündungen oder Infektionen",
                "Frische Verletzungen oder Operationen",
                "Thrombose oder schwere Gefäßerkrankungen",
                "Stark ausgeprägte Krampfadern im akuten Stadium",
                "Ansteckende Fußpilzerkrankungen",
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
                "A talpmasszázs egy nyugtató és terápiás kezelés, amely a lábak ellazítására és aktiválására összpontosít. Lábunk végigkísér minket a mindennapi életben, és hatalmas terhelésnek van kitéve.",
                "A célzott masszázstechnikák oldják a feszültséget, serkentik a vérkeringést és javítják az általános közérzetet.",
              ],
            },
            {
              heading: "A talpmasszázs céljai",
              bullets: [
                "A láb vérkeringésének serkentése",
                "Izomfeszültség enyhítése",
                "Test és lélek ellazítása",
                "Fáradt és nehéz lábak enyhítése",
                "Fizikai megterhelés utáni regeneráció támogatása",
                "Boka mozgásának javítása",
                "Általános közérzet növelése",
              ],
            },
            {
              heading: "A kezelés időtartama",
              bullets: [
                "45 perc – intenzívebb masszázs további mobilizációval",
                "60 perc – átfogó kezelés, opcionális lábfürdővel",
              ],
            },
            {
              heading: "Ellenjavallatok",
              bullets: [
                "Nyílt sebek vagy bőrbetegségek a lábon",
                "Akut gyulladás vagy fertőzés",
                "Frissen lezajlott sérülések vagy műtétek",
                "Trombózis vagy súlyos érrendszeri betegségek",
                "Súlyos visszér akut stádiumban",
                "Fertőző lábgomba",
              ],
            },
          ],
        },
      },
            lymph: {
        de: {
          title: "Lymphdrainage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Manuelle Lymphdrainage ist eine besonders sanfte und rhythmische Massagetechnik, die darauf abzielt, den Lymphfluss im Körper zu fördern und überschüssige Gewebsflüssigkeit abzutransportieren.",
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
                "Förderung der Entgiftung",
                "Tiefe Entspannung und Stressreduktion",
                "Verbesserung der Haut- und Gewebsstruktur",
              ],
            },
            {
              heading: "Dauer",
              bullets: [
                "60 Minuten – Standardbehandlung einer Region",
                "90 Minuten – umfassende Behandlung mehrerer Körperbereiche",
              ],
            },
          ],
        },
        hu: {
          title: "Nyirokelvezetés",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A manuális nyirokelvezetés (MLD) egy különösen gyengéd és ritmikus masszázstechnika, amelynek célja a nyirokkeringés elősegítése a testben és a felesleges szöveti folyadék eltávolítása.",
                "Célzott, körkörös és pumpáló mozdulatokkal aktiválódik a nyirokrendszer, ezáltal csökken a duzzanat és támogatja a szervezet méregtelenítő folyamatait.",
              ],
            },
            {
              heading: "A nyirokelvezetés céljai",
              bullets: [
                "Duzzanat csökkentése",
                "Nyirokelvezetés elősegítése",
                "Az immunrendszer támogatása",
                "Javított sebgyógyulás",
                "Duzzanat okozta fájdalomcsillapítás",
                "Méregtelenítés elősegítése",
                "Mély ellazulás és stresszcsökkentés",
                "Javított bőr- és szövetszerkezet",
              ],
            },
            {
              heading: "Kezelés időtartama",
              bullets: [
                "60 perc – egy terület standard kezelése",
                "90 perc – több testterület átfogó kezelése",
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
                "Die Vagus-Massage ist eine sanfte und tief entspannende Behandlung, die darauf abzielt, den Vagusnerv zu stimulieren. Der Vagusnerv ist der längste Nerv des parasympathischen Nervensystems und spielt eine zentrale Rolle bei der Regulation von Stress, Herzfrequenz, Verdauung und emotionalem Gleichgewicht.",
                "Durch gezielte, ruhige Berührungen im Bereich von Nacken, Hals, Kopf und Gesicht wird das parasympathische Nervensystem aktiviert – auch bekannt als der Ruhe- und Regenerationsmodus des Körpers. Dies führt zu tiefer Entspannung und unterstützt die natürliche Fähigkeit des Körpers, sich zu regenerieren.",
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
              heading: "Typische Grifftechniken",
              bullets: [
                "Sanfte Streichungen im Nacken- und Halsbereich",
                "Kreisende Bewegungen an den Schläfen",
                "Massage entlang der Schädelbasis",
                "Ohr- und Kiefermassage",
                "Atembegleitende Berührungen",
              ],
            },
            {
              heading: "Ablauf einer Behandlung",
              bullets: [
                "Vorgespräch zur Klärung individueller Bedürfnisse",
                "Bequeme Rückenlage auf der Massageliege",
                "Ruhige Atmosphäre mit gedämpftem Licht",
                "Sanfte rhythmische Berührungen an Nacken, Hals, Kopf und Gesicht",
                "Kurze Nachruhe nach der Behandlung",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "45 Minuten – intensivere Behandlung mit Fokus auf Nacken und Kopf",
                "60 Minuten – umfassende Vagus-Massage für maximale Entspannung",
              ],
            },
            {
              heading: "Für wen geeignet?",
              bullets: [
                "Menschen mit hohem Stresslevel",
                "Personen mit Schlafstörungen",
                "Menschen mit innerer Unruhe oder Angstgefühlen",
                "Personen mit Spannungskopfschmerzen",
                "Menschen mit Verdauungsbeschwerden",
                "Alle, die tiefe mentale und körperliche Entspannung suchen",
              ],
            },
            {
              heading: "Positive Wirkungen",
              bullets: [
                "Aktivierung des Ruhe- und Regenerationssystems",
                "Senkung von Stresshormonen",
                "Verbesserung der Herzfrequenzvariabilität",
                "Förderung eines erholsamen Schlafs",
                "Stabilisierung der emotionalen Balance",
                "Unterstützung der Selbstheilungskräfte",
                "Tiefes Gefühl von Sicherheit und Geborgenheit",
              ],
            },
            {
              heading: "Kontraindikationen",
              bullets: [
                "Akute Entzündungen oder Infektionen im Halsbereich",
                "Frische Operationen im Kopf- oder Nackenbereich",
                "Schwere Herzrhythmusstörungen",
                "Akute Thrombosen",
                "Unklare Schwellungen oder Schmerzen im Halsbereich",
                "Bestimmte neurologische Erkrankungen",
              ],
            },
          ],
        },
        hu: {
          title: "Vagus masszázs stresszcsökkentésre",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A vagus masszázs egy gyengéd és mélyen ellazító kezelés, amelynek célja a vagus ideg stimulálása.",
                "A nyak, a torok, a fej és az arc célzott, nyugtató érintésein keresztül aktiválódik a paraszimpatikus idegrendszer – más néven a test nyugalmi és regenerációs üzemmódja.",
              ],
            },
            {
              heading: "A vagus masszázs céljai",
              bullets: [
                "A stressz és a feszültség csökkentése",
                "A paraszimpatikus idegrendszer aktiválása",
                "A belső béke és nyugalom elősegítése",
                "Az alvásminőség javítása",
                "Az érzelmi egyensúly támogatása",
                "A pulzusszám szabályozása",
                "Az emésztés elősegítése",
                "A feszültség okozta fejfájás enyhítése",
              ],
            },
            {
              heading: "Kezelés időtartama",
              bullets: [
                "45 perc – intenzívebb kezelés, amely a nyakra és a fejre összpontosít",
                "60 perc – átfogó vagus masszázs a maximális ellazulásért",
              ],
            },
          ],
        },
      },

      champi: {
        de: {
          title: "Champi Kopfmassage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Champi Kopfmassage, auch bekannt als indische Kopfmassage, ist eine traditionelle Behandlung mit Ursprung in der indischen Heilkunst des Ayurveda. Der Begriff Champi leitet sich vom Hindi-Wort Chāmpnā ab, was so viel wie kneten oder massieren bedeutet.",
                "Diese Massage konzentriert sich auf Kopf, Nacken, Schultern und Gesicht und zielt darauf ab, Körper und Geist in Einklang zu bringen. Durch rhythmische und gezielte Grifftechniken wird die Durchblutung gefördert, Stress reduziert und ein tiefes Gefühl der Entspannung erzeugt.",
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
              heading: "Ayurvedischer Hintergrund",
              bullets: [
                "Kronenchakra (Sahasrara)",
                "Stirnchakra (Ajna)",
                "Halschakra (Vishuddha)",
              ],
            },
            {
              heading: "Typische Grifftechniken",
              bullets: [
                "Sanfte Streichungen",
                "Kreisende Bewegungen auf der Kopfhaut",
                "Knetungen von Nacken und Schultern",
                "Sanfte Zugbewegungen an den Haaren",
                "Massage von Schläfen und Stirn",
                "Gesichtsmassage",
              ],
            },
            {
              heading: "Ablauf einer Behandlung",
              bullets: [
                "Vorgespräch zur Klärung individueller Wünsche",
                "Massage im Sitzen oder Liegen",
                "Optional mit warmen ayurvedischen Ölen",
                "Gezielte Behandlung von Schultern, Nacken, Kopfhaut und Gesicht",
                "Kurze Ruhephase nach der Massage",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: [
                "45 Minuten – umfassende Massage von Kopf, Nacken und Schultern",
                "60 Minuten – intensive Behandlung inklusive Gesichtsmassage",
              ],
            },
            {
              heading: "Für wen geeignet?",
              bullets: [
                "Menschen mit Stress und mentaler Belastung",
                "Personen mit Spannungskopfschmerzen oder Migräne",
                "Menschen mit Nacken- und Schulterverspannungen",
                "Personen mit Schlafstörungen",
                "Menschen, die ihre Konzentration verbessern möchten",
                "Alle, die eine ganzheitliche Entspannungsbehandlung suchen",
              ],
            },
            {
              heading: "Positive Wirkungen",
              bullets: [
                "Tiefe mentale und körperliche Entspannung",
                "Verbesserung der Durchblutung der Kopfhaut",
                "Förderung von Haarwachstum und Haargesundheit",
                "Linderung von Stresssymptomen",
                "Verbesserung der Schlafqualität",
                "Harmonisierung des Energieflusses",
                "Steigerung des allgemeinen Wohlbefindens",
              ],
            },
            {
              heading: "Kontraindikationen",
              bullets: [
                "Akute Entzündungen oder Infektionen im Kopf- oder Nackenbereich",
                "Offene Wunden oder Hauterkrankungen auf der Kopfhaut",
                "Frische Operationen",
                "Fieber",
                "Schwere neurologische Erkrankungen",
                "Allergien gegen verwendete Öle",
              ],
            },
          ],
        },
        hu: {
          title: "Champi fejmasszázs",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A Champi fejmasszázs, más néven indiai fejmasszázs, egy hagyományos kezelés, amely az indiai ájurvéda gyógyító művészetéből ered.",
                "Ez a masszázs a fejre, a nyakra, a vállakra és az arcra összpontosít, célja a test és az elme harmonizálása.",
              ],
            },
            {
              heading: "A Champi fejmasszázs céljai",
              bullets: [
                "A test és az elme mély ellazulása",
                "A stressz csökkentése és a belső nyugtalanság enyhítése",
                "A vérkeringés fokozása a fejbőrben",
                "A hajnövekedés támogatása",
                "A feszültség okozta fejfájás enyhítése",
                "A koncentráció javítása",
                "Az energiaáramlás aktiválása a testben",
                "A pihentető alvás elősegítése",
              ],
            },
            {
              heading: "Kezelés időtartama",
              bullets: [
                "45 perc – a fej, a nyak és a vállak átfogó masszázsa",
                "60 perc – intenzív kezelés arcmasszázzsal",
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
                "Das Fascial Distortion Model (FDM) ist ein innovatives und wirkungsvolles Behandlungskonzept zur Therapie von Schmerzen und Bewegungseinschränkungen des Bewegungsapparates. Entwickelt wurde diese Methode vom amerikanischen Notfallmediziner Dr. Stephen Typaldos.",
                "Im Mittelpunkt des FDM steht die Annahme, dass viele Schmerzen und Funktionsstörungen auf Verformungen der Faszien zurückzuführen sind. Ein besonderes Merkmal ist die Interpretation der Körpersprache des Patienten, die Hinweise auf die zugrunde liegende Fasziendistorsion gibt.",
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
              heading: "Die sechs Fasziendistorsionen",
              bullets: [
                "Triggerband (TB)",
                "Hernierter Triggerpunkt (HTP)",
                "Kontinuumdistorsion (CD)",
                "Faltdistorsion (FD)",
                "Zylinderdistorsion (CyD)",
                "Tektonische Fixation (TF)",
              ],
            },
            {
              heading: "Typische Behandlungstechniken",
              bullets: [
                "Gezielter, teilweise intensiver Druck entlang der betroffenen Faszien",
                "Manuelle Reposition von Gewebestrukturen",
                "Mobilisation von Gelenken",
                "Behandlung von Triggerpunkten",
                "Fasziale Dehn- und Zugtechniken",
              ],
            },
            {
              heading: "Ablauf der Behandlung",
              bullets: [
                "Anamnese und Analyse",
                "Funktionelle Tests zur Identifikation der Distorsionen",
                "Gezielte manuelle Techniken zur Korrektur",
                "Funktionskontrolle nach der Behandlung",
                "Empfehlungen zu Bewegung, Dehnung und Flüssigkeitszufuhr",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: ["60 Minuten – intensive Behandlung komplexer Beschwerdebilder"],
            },
            {
              heading: "Für wen geeignet?",
              bullets: [
                "Menschen mit akuten oder chronischen Schmerzen",
                "Sportler bei Verletzungen oder Überlastungen",
                "Personen mit Bewegungseinschränkungen",
                "Menschen mit Gelenkbeschwerden",
                "Patienten mit Rücken-, Nacken- oder Schulterschmerzen",
                "Beschwerden wie Bänderdehnungen, Prellungen oder Sehnenreizungen",
              ],
            },
            {
              heading: "Positive Wirkungen",
              bullets: [
                "Häufig sofortige Schmerzlinderung",
                "Verbesserung der Beweglichkeit",
                "Wiederherstellung der Faszienfunktion",
                "Schnellere Regeneration",
                "Steigerung der Leistungsfähigkeit",
              ],
            },
            {
              heading: "Kontraindikationen",
              bullets: [
                "Frische Knochenbrüche",
                "Akute Entzündungen oder Infektionen",
                "Offene Wunden",
                "Schwere Osteoporose",
                "Blutgerinnungsstörungen",
                "Maligne Tumorerkrankungen ohne ärztliche Freigabe",
              ],
            },
          ],
        },
        hu: {
          title: "FDM kezelés",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A Fasciális Distorció Modell (FDM) egy innovatív és hatékony kezelési koncepció a mozgásszervi rendszer fájdalmának és mozgáskorlátozottságának terápiájára.",
                "Azon a feltételezésen alapul, hogy számos fájdalom és funkcionális rendellenesség a fascia torzulásainak köszönhető. A beteg testbeszédére építve gyors fájdalomcsillapítást és mozgásszabadságot eredményez, gyakran már egy-két kezelés után.",
              ],
            },
            {
              heading: "Az FDM kezelés céljai",
              bullets: [
                "Gyors fájdalomcsillapítás",
                "Javított mobilitás",
                "A fasciális funkció helyreállítása",
                "Akut és krónikus állapotok kezelése",
                "A sportteljesítmény támogatása",
                "Sérülések utáni regeneráció felgyorsítása",
              ],
            },
            {
              heading: "Miért különleges az FDM módszer?",
              bullets: [
                "Páciensközpontú diagnosztika",
                "Gyors eredmények",
                "Természetes megközelítés",
                "Hatékonyság akut sportsérüléseknél és krónikus panaszoknál",
              ],
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
                "Flossing ist eine komplexe physiotherapeutische Behandlung, die vor allem das Bindegewebe, die Muskeln und die Gelenke beeinflusst. Das Wesentliche der Behandlung ist die straffe Kompression mit einem speziellen Gummiband, das seine positive Wirkung durch mechanische und physiologische Effekte entfaltet.",
                "Die Anwendung wirkt sich gleichzeitig auf die Gewebestruktur, den Flüssigkeitsaustausch und die Schmerzwahrnehmung aus.",
              ],
            },
            {
              heading: "Wirkmechanismus von Flossing",
              bullets: [
                "Lösung mechanischer Verklebungen im Faszien- und Bindegewebe",
                "Schwammeffekt im Lymph- und Blutkreislauf",
                "Stimulation von Mechanorezeptoren zur Schmerzlinderung",
              ],
            },
            {
              heading: "Hauptanwendungsgebiete",
              bullets: [
                "Verbesserung der Gelenkbeweglichkeit",
                "Rehabilitation nach Verstauchungen und Zerrungen",
                "Schmerzlinderung bei akuten und chronischen Beschwerden",
                "Ödemreduktion und schnellere Abschwellung",
                "Mobilisation von Narbengewebe",
              ],
            },
            {
              heading: "Behandlungsdurchführung",
              bullets: [
                "Fixierung der Haut mit einem elastischen Band",
                "Lösung oberflächlicher Verklebungen durch aktive oder passive Bewegung",
                "Mobilisation von Narbengewebe",
                "Wiederholungstests und Übungsanleitung",
              ],
            },
            {
              heading: "Mögliche Nebenwirkungen",
              bullets: [
                "Kann kurzfristig schmerzhaft sein",
                "Kann Spannungsgefühl verursachen",
                "Kann Blutergüsse hervorrufen",
              ],
            },
            {
              heading: "Kontraindikationen",
              bullets: [
                "Latexallergie",
                "Frakturstelle",
                "Schwangerschaft im Bauch- und Taillenbereich",
                "Pergamenthaut",
                "Metastasierter Tumor",
                "Unbehandelter Bluthochdruck",
                "Akute Thrombose",
                "Akutes nässendes Ekzem",
                "Schwere Arteriosklerose",
              ],
            },
            {
              heading: "Dauer",
              bullets: [
                "30 Minuten – gezielte Behandlung",
                "Die Flossing-Behandlung kann bei Bedarf auch ergänzend in der Individualmassage eingesetzt werden",
              ],
            },
          ],
        },
        hu: {
          title: "Flossing",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A flossing egy komplex fizioterápiás kezelés, amely a kötőszövetet, az izmokat és az ízületeket érinti.",
                "A kezelés lényege egy speciális rugalmas szalag határozott nyomásában rejlik, amely mechanikai és fiziológiai mechanizmusokon keresztül fejti ki pozitív hatását.",
              ],
            },
            {
              heading: "Főbb alkalmazások",
              bullets: [
                "Ízületi mobilitás javítása",
                "Rándulások és húzódások utáni rehabilitáció",
                "Fájdalomcsillapítás akut és krónikus állapotokban",
                "Ödéma és duzzanat csökkentése",
                "Hegszövet mobilizálása",
              ],
            },
            {
              heading: "Kezelés időtartama",
              bullets: [
                "30 perc – célzott kezelés",
                "A floss kezelés az egyéni masszázsterápiában szükség szerint alkalmazható",
              ],
            },
          ],
        },
      },

      schroepfen: {
        de: {
          title: "Schröpfen",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Schröpfen ist eine traditionelle Therapieform, die seit Jahrhunderten in verschiedenen Kulturen angewendet wird. Ziel der Behandlung ist es, durch das Erzeugen eines Unterdrucks in speziellen Schröpfgläsern die Durchblutung anzuregen, Verspannungen zu lösen und den Stoffwechsel zu aktivieren.",
                "Die Schröpfgläser werden auf bestimmte Hautareale, meist am Rücken, aufgesetzt. Der entstehende Unterdruck hebt das Gewebe leicht an und stimuliert die darunterliegenden Strukturen.",
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
              heading: "Formen des Schröpfens",
              bullets: [
                "Trockenes Schröpfen",
                "Schröpfmassage (bewegliches Schröpfen)",
                "Blutiges Schröpfen nur im medizinischen Kontext",
              ],
            },
            {
              heading: "Wirkungsweise",
              bullets: [
                "Verbesserte Mikrozirkulation",
                "Lockerung von Muskel- und Faszienstrukturen",
                "Reflektorische Wirkung auf innere Organe",
                "Aktivierung des Lymphflusses",
                "Schmerzlindernde Effekte",
              ],
            },
            {
              heading: "Ablauf der Behandlung",
              bullets: [
                "Vorgespräch zur Klärung der Beschwerden",
                "Reinigung der Haut und Auswahl geeigneter Schröpfpunkte",
                "Erzeugung des Unterdrucks",
                "Einwirkzeit meist 5 bis 20 Minuten",
                "Kurze Nachruhe und Pflegehinweise",
              ],
            },
            {
              heading: "Dauer der Behandlung",
              bullets: ["30 Minuten – gezielte Behandlung einzelner Bereiche"],
            },
            {
              heading: "Für wen geeignet?",
              bullets: [
                "Menschen mit Muskelverspannungen",
                "Personen mit Rücken- und Nackenschmerzen",
                "Sportler zur Regeneration",
                "Menschen mit Stress und Erschöpfung",
                "Personen mit Durchblutungsstörungen",
                "Unterstützend bei Erkältungsneigung",
              ],
            },
            {
              heading: "Positive Wirkungen",
              bullets: [
                "Linderung von Schmerzen und Verspannungen",
                "Verbesserung der Durchblutung",
                "Förderung der Entgiftung",
                "Aktivierung des Immunsystems",
                "Unterstützung der Regeneration",
                "Tiefes Gefühl der Entspannung",
              ],
            },
            {
              heading: "Kontraindikationen",
              bullets: [
                "Blutgerinnungsstörungen oder Antikoagulantien",
                "Offene Wunden oder Hauterkrankungen",
                "Akute Entzündungen",
                "Fieber",
                "Schwere Herz-Kreislauf-Erkrankungen",
                "Schwangerschaft je nach Behandlungsregion",
                "Sehr empfindliche Haut",
              ],
            },
          ],
        },
        hu: {
          title: "Köpölyözés",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A köpölyözés egy évezredes hagyományokra visszatekintő vákuumterápia, amely során üveg-, szilikon- vagy műanyag csészékkel vákuumot hoznak létre a bőr felszínén.",
                "Ez a szívóhatás fokozza a helyi vér- és nyirokkeringést, oldja az izomcsomókat, lazítja a letapadt kötőszövetet, valamint segíti a méreganyagok eltávolítását.",
              ],
            },
            {
              heading: "Főbb alkalmazási területek és hatások",
              bullets: [
                "Izomlazítás",
                "Keringésjavítás",
                "Fájdalomcsillapítás",
                "Salaktalanítás",
                "Jó keringés – jó funkció – jó mozgásminta – minőségi gyógyulás",
              ],
            },
            {
              heading: "Köpölyözési technikák",
              bullets: [
                "Száraz / fix köpölyözés",
                "Csúszó / dinamikus köpölyözés",
              ],
            },
            {
              heading: "Fontos tudnivalók",
              paragraphs: [
                "A kezelés után gyakran lilás-kékes foltok keletkeznek, amelyek 2–3 nap alatt maguktól felszívódnak.",
              ],
            },
            {
              heading: "Ellenjavallatok",
              bullets: [
                "Véralvadási problémák",
                "Bőrbetegségek",
                "Nagy anyajegyek",
                "Idős pácienseknél pergamenbőr",
                "Akut trombózis",
                "Akut vénatágulat",
                "Daganatos betegségek",
                "Csontritkulás",
                "Terhesség",
              ],
            },
          ],
        },
      },

      scarTreatment: {
        de: {
          title: "Narbenbehandlung",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Narbenbehandlung umfasst Maßnahmen zur ästhetischen und funktionellen Verbesserung des Narbengewebes. Dazu gehören manuelle Techniken wie Massage und Mobilisation.",
                "Ziel ist es, Spannungen zu lösen, Verklebungen zu beseitigen, die Durchblutung zu fördern und die Beweglichkeit betroffener Gewebe zu verbessern.",
              ],
            },
            {
              heading: "Hauptmethoden",
              bullets: [
                "Manuelle Narbenbehandlung / Narbenmassage",
                "Schröpfen und Faszientechniken",
                "Arbeit mit Narbenstab und Kinesio-Tape",
              ],
            },
            {
              heading: "Wann sinnvoll?",
              bullets: [
                "Bei verklebten Operationsnarben",
                "Bei Ödemen nach Operationen",
                "Bei Narben nach Verbrennungen",
                "Bei schmerzhaften, spannenden oder geröteten Narben",
                "Wenn die Narbe die Beweglichkeit einschränkt",
              ],
            },
            {
              heading: "Mögliche Folgen unbehandelter Narben",
              bullets: [
                "Chronische Schmerzen",
                "Bewegungseinschränkungen",
                "Beschwerden im Lendenbereich",
                "Verdauungsprobleme",
                "Ödembildung",
              ],
            },
          ],
        },
        hu: {
          title: "Hegkezelés",
          sections: [
            {
              heading: "Általános leírás",
              paragraphs: [
                "A hegkezelés a hegszövet esztétikai és funkcionális javítását célzó eljárások összessége, amely magában foglalja a manuális technikákat, például a masszázst és a mobilizálást.",
                "Célja a feszülés oldása, a letapadások megszüntetése, a vérkeringés fokozása és a hegek láthatóságának csökkentése.",
              ],
            },
            {
              heading: "A hegkezelés főbb módszerei",
              bullets: [
                "Manuális hegkezelés / masszázs",
                "Köpölyözés és fascia technikák",
                "Hegkezelő pálca és kinesio tape alkalmazása",
              ],
            },
            {
              heading: "Mikor ajánlott?",
              bullets: [
                "Műtéti hegek letapadása esetén",
                "Műtét után fellépő ödéma esetén",
                "Égési sérülések utáni hegek kezelésére",
                "Feszülő, húzódó vagy fájdalmas hegek esetén",
                "Ha a heg korlátozza a mozgást",
              ],
            },
            {
              heading: "Kezeletlen hegek lehetséges következményei",
              bullets: [
                "Krónikus fájdalom",
                "Mozgáskorlátozottság",
                "Deréktáji panaszok",
                "Székrekedés",
                "Ödémásodás",
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-10">
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

        <div className="mx-auto flex max-w-7xl justify-end px-4 pb-3 lg:px-10">
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
        <img src="/massage-hero.png" alt="Massage Hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center lg:px-10">
          <h1 className="max-w-5xl text-4xl font-light tracking-wide text-white md:text-7xl">
            {c.hero.title}
          </h1>
          <div className="mt-8 h-px w-40 bg-white/50" />
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/90 md:text-2xl">
            {c.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="/booking" className="rounded-none border border-[#d6b36a] bg-[#d6b36a] px-10 py-4 text-base font-medium text-stone-900 transition hover:opacity-90">
              {c.hero.primary}
            </a>
            <a href={c.brand.whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-none border border-white/60 px-10 py-4 text-base font-medium text-white transition hover:bg-white/10">
              {c.hero.secondary}
            </a>
          </div>
        </div>
      </section>

      <section id="ueber" className="bg-[#f8f2e9] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">{c.about.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">{c.about.title}</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
              <img src="/christina-about.jpg" alt="Christina" className="h-[420px] w-full object-cover object-center md:h-[520px]" />
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
                <h3 className="text-2xl font-semibold text-stone-900">{c.about.qualificationsTitle}</h3>
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
                <img src="/hiemt-pad.jpg" alt="HIEMT Gerät" className="h-full min-h-[360px] w-full object-cover" />
              </div>

              <div className="bg-[#f8f5ef] p-8 md:p-10">
                <div className="inline-flex rounded-full bg-[#dfe6da] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-stone-700">
                  {c.special.eyebrow}
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">{c.special.title}</h2>
                <p className="mt-5 text-lg leading-8 text-stone-600">{c.special.text}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {c.special.bullets.map((bullet: string) => (
                    <div key={bullet} className="rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-700 shadow-sm">
                      {bullet}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.6rem] bg-[#567a57] p-6 text-white">
                    <div className="text-sm uppercase tracking-[0.18em] text-white/70">{c.special.trialLabel}</div>
                    <div className="mt-2 text-3xl font-semibold">{c.special.trialPrice}</div>
                  </div>
                  <div className="rounded-[1.6rem] bg-[#a8b79a] p-6 text-stone-900">
                    <div className="text-sm uppercase tracking-[0.18em] text-stone-700">{c.special.packLabel}</div>
                    <div className="mt-2 text-3xl font-semibold">{c.special.packPrice}</div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-stone-300 p-5 text-sm leading-7 text-stone-600">
                  {c.special.note}
                </div>

                <div className="mt-6 rounded-2xl border border-[#cfd8bf] bg-[#edf4e3] p-5">
                  <p className="text-sm font-medium text-[#4e5f3f]">{c.special.whatsappText}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={c.brand.hiemtWhatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-[#6f7d58] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5f6c4a]">
                      {c.special.whatsappButton}
                    </a>
                    <button onClick={() => setShowHiemtInfo(true)} className="inline-block rounded-full border border-[#6f7d58] px-6 py-3 text-sm font-semibold text-[#556246] transition hover:bg-[#eef3e6]">
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
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">{c.services.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">{c.services.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">{c.services.text}</p>
          </div>

          <div className="relative">
            <button type="button" onClick={() => scrollSlider(servicesSliderRef, "left")} className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-300 bg-white/90 p-4 text-stone-700 shadow-md transition hover:bg-white lg:flex">
              <span className="text-2xl leading-none">‹</span>
            </button>

            <div ref={servicesSliderRef} className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {c.services.items.map((service: ServiceCard) => (
                <div key={service.key} className="min-w-[92%] snap-center md:min-w-[78%] lg:min-w-[86%]">
                  <div className="relative mx-auto grid min-h-[540px] overflow-hidden rounded-[2.2rem] md:grid-cols-[0.95fr_1.25fr]">
                    <div className="relative z-10 flex items-center justify-center px-6 py-10 md:px-10">
                      <div className="absolute left-0 top-1/2 hidden h-[300px] w-[430px] -translate-y-1/2 rounded-[2rem] bg-[#cfd5cb] md:block" />
                      <div className="relative z-10 w-full max-w-[380px] rounded-[2rem] bg-[#cfd5cb] p-8 text-center shadow-sm md:-mr-12">
                        <h3 className="text-3xl font-medium leading-tight text-stone-800 md:text-4xl">{service.title}</h3>
                        <p className="mt-6 leading-8 text-stone-700">{service.description}</p>
                        <div className="mt-6 space-y-2 text-sm font-medium text-stone-700">
                          {service.durations.map((duration) => (
                            <div key={duration}>{duration}</div>
                          ))}
                        </div>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                          <a href="/booking" className="inline-block rounded-none bg-[#405e3f] px-8 py-4 text-base font-medium text-white transition hover:-translate-y-0.5">
                            {c.services.button}
                          </a>
                          <button onClick={() => setActiveInfo(service.key)} className="rounded-none border border-[#405e3f] px-8 py-4 text-base font-medium text-[#405e3f] transition hover:bg-[#eef3e6]">
                            {c.services.info}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(120,100,80,0.12)]">
                      <img src={service.image} alt={service.title} className="h-full min-h-[440px] w-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={() => scrollSlider(servicesSliderRef, "right")} className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-300 bg-white/90 p-4 text-stone-700 shadow-md transition hover:bg-white lg:flex">
              <span className="text-2xl leading-none">›</span>
            </button>
          </div>
        </div>
      </section>

      <section id="zusatzangebote" className="bg-[#f8f2e9] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">{c.methods.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">{c.methods.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">{c.methods.text}</p>
          </div>

          <div className="relative">
            <button type="button" onClick={() => scrollSlider(methodsSliderRef, "left")} className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-300 bg-white/90 p-4 text-stone-700 shadow-md transition hover:bg-white lg:flex">
              <span className="text-2xl leading-none">‹</span>
            </button>

            <div ref={methodsSliderRef} className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {c.methods.items.map((item: MethodCard) => (
                <div key={item.key} className="min-w-[92%] snap-center md:min-w-[70%] lg:min-w-[62%]">
                  <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
                    <img src={item.image} alt={item.title} className="h-64 w-full object-cover" />
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold text-stone-900 md:text-3xl">{item.title}</h3>
                      <p className="mt-5 leading-8 text-stone-600">{item.text}</p>
                      <div className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#405e3f]">{item.price}</div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button onClick={() => setActiveInfo(item.key)} className="rounded-none border border-[#405e3f] px-6 py-3 text-[#405e3f] transition hover:bg-[#eef3e6]">
                          {c.methods.info}
                        </button>
                        <a href="/booking" className="rounded-none bg-[#405e3f] px-6 py-3 text-white transition hover:opacity-90">
                          {c.booking.button}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={() => scrollSlider(methodsSliderRef, "right")} className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-300 bg-white/90 p-4 text-stone-700 shadow-md transition hover:bg-white lg:flex">
              <span className="text-2xl leading-none">›</span>
            </button>
          </div>
        </div>
      </section>

      <section id="booking" className="py-20">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="text-sm uppercase tracking-[0.28em] text-stone-500">{c.booking.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">{c.booking.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">{c.booking.text}</p>
          <a href="/booking" className="mt-10 inline-block rounded-full bg-[#567a57] px-8 py-4 text-base font-medium text-white hover:opacity-90">
            {c.booking.button}
          </a>
        </div>
      </section>

      <section id="expectations" className="bg-[#f8f2e9] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">{c.expectations.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">{c.expectations.title}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.expectations.items.map((item: any) => (
              <div key={item.title} className="rounded-[1.8rem] border border-stone-200 bg-white/80 p-7 shadow-sm">
                <h3 className="text-xl font-semibold text-stone-900">{item.title}</h3>
                <p className="mt-4 leading-7 text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="anfahrt" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">{c.location.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">{c.location.title}</h2>
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
              <img src="/entrance.jpeg" alt="Eingang Christina Massage" className="h-full w-full object-cover" />
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
              <p className="text-base leading-8 text-stone-700">{c.location.intro}</p>
              <p className="mt-4 text-base leading-8 text-stone-700">
                <strong>{c.location.seoText}</strong>
              </p>
              <div className="mt-6 space-y-3 text-base leading-7 text-stone-700">
                <p><strong>{c.location.addressLabel}</strong> Bahnhofstraße 21, 82383 Hohenpeißenberg</p>
                <p><strong>{c.location.entranceLabel}</strong> {c.location.entranceText}</p>
                <p><strong>{c.location.parkingLabel}</strong> {c.location.parkingText}</p>
                <p><strong>{c.location.arrivalLabel}</strong> {c.location.arrivalText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white/50 px-6 py-8 text-sm text-stone-500 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>{c.footer.text}</p>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-stone-800">{c.footer.imprint}</a>
            <a href="#" className="hover:text-stone-800">{c.footer.privacy}</a>
          </div>
        </div>
      </footer>

      {showHiemtInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-[#f8f5ef] p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[#7a8566]">HIEMT</p>
                <h3 className="mt-2 text-2xl font-semibold text-stone-900 md:text-3xl">{hiemtInfo[language].title}</h3>
              </div>
              <button onClick={() => setShowHiemtInfo(false)} className="rounded-full bg-white px-4 py-2 text-sm text-stone-700 shadow-sm">
                {c.close}
              </button>
            </div>
            <div className="mt-8 space-y-8">
              {hiemtInfo[language].sections.map((section, index) => (
                <div key={`${section.heading}-${index}`}>
                  <h4 className="text-lg font-semibold text-[#556246]">{section.heading}</h4>
                  {section.paragraphs && (
                    <div className="mt-4 space-y-4 text-sm leading-8 text-stone-700 md:text-base">
                      {section.paragraphs.map((paragraph, i) => (
                        <p key={`${paragraph}-${i}`}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {section.bullets && (
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700 md:text-base">
                      {section.bullets.map((bullet, i) => (
                        <li key={`${bullet}-${i}`} className="flex gap-3">
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
              <button onClick={() => setActiveInfo(null)} className="rounded-full bg-white px-4 py-2 text-sm text-stone-700 shadow-sm">
                {c.close}
              </button>
            </div>

            <div className="mt-6 space-y-6 text-stone-700">
              {infoContent[activeInfo][language].sections.map((section, index) => (
                <div key={`${section.heading}-${index}`}>
                  <h4 className="text-lg font-semibold text-[#405e3f]">{section.heading}</h4>
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