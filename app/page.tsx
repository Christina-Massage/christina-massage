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
        city: "Hohenpeißenberg",
        whatsappLink:
          "https://wa.me/491722664648?text=Hallo%20ich%20möchte%20einen%20Termin%20vereinbaren",
        hiemtWhatsappLink:
          "https://wa.me/491722664648?text=Hallo%20Christina,%20ich%20interessiere%20mich%20für%20eine%20individuelle%20Beratung%20zur%20HIEMT-Behandlung.",
      },
      nav: {
        about: "Über mich",
        services: "Massagen",
        special: "HIEMT",
        methods: "Ergänzende Leistungen",
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
          "Ich glaube, dass Massage mehr ist als nur eine körperliche Behandlung. Sie ist eine wertvolle Auszeit – ein Moment der Ruhe, in dem der Alltag von uns abfällt und wir inneren Frieden und Balance finden.",
        ],
        qualificationsTitle:
          "Mein beruflicher Werdegang und meine Qualifikationen",
        qualificationsText: [
          "Ich begann meine Karriere 2007 als Aerobic-Trainerin und erwarb dabei fundierte anatomische Kenntnisse. Meine Leidenschaft für Bewegung führte mich schnell zu Pilates, und 2016 wurde die Massage-Therapie zu meinem Beruf.",
          "Im Laufe meiner beruflichen Laufbahn habe ich unter anderem die schwedische Massage, Wellness-Massagen, die chinesische (Tui-Na) und die indische (Champi) Kopfmassage sowie Spezialtechniken wie Schröpftherapie, Flossing, Narbenbehandlung, Lymphdrainage und Vagus-Therapie erlernt.",
          "Der Ansatz des Faszien-Distorsionsmodells (FDM) ist zentral für meine Arbeit und trägt effektiv zur Linderung von Bindegewebsverspannungen bei. Ich betrachte den Menschen als Ganzes.",
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
              "Eine persönliche und flexible Behandlung, die exakt auf deine Beschwerden, Wünsche und körperlichen Bedürfnisse abgestimmt wird. Je nach Befund können auch FDM, Schröpfen oder Flossing ergänzend in die Behandlung integriert werden.",
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
        eyebrow: "Ergänzende Leistungen",
        title: "Therapeutische und ergänzende Behandlungen",
        text:
          "Diese Leistungen kannst du dir im Detail über den Info-Button ansehen. FDM, Flossing und Schröpfen werden je nach individuellem Bedarf in die Behandlung integriert.",
        info: "Info",
        items: [
          {
            key: "fdm",
            title: "FDM",
            text:
              "Innovatives Behandlungskonzept zur Therapie von Schmerzen und Bewegungseinschränkungen des Bewegungsapparates.",
            image: "/fdm.png",
          },
          {
            key: "flossing",
            title: "Flossing",
            text:
              "Moderne physiotherapeutische Methode zur gezielten Behandlung von Faszien, Muskeln und Gelenken.",
            image: "/flossing.png",
          },
          {
            key: "schroepfen",
            title: "Schröpfen",
            text:
              "Traditionelle Vakuumtherapie zur Förderung der Durchblutung, Entspannung der Muskulatur und Lösung von Verklebungen.",
            image: "/cupping.png",
          },
          {
            key: "scarTreatment",
            title: "Narbenbehandlung",
            text:
              "Gezielte Behandlung zur Verbesserung von Beweglichkeit, Gewebequalität und Funktion von Narben und verklebtem Gewebe.",
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
        pdfDe: "PDF Download DE",
        pdfHu: "PDF Download HU",
      },
      booking: {
        eyebrow: "Online Buchung",
        title: "Termin bequem online anfragen",
        text:
          "Wähle deine Behandlung, die passende Dauer und deinen Wunschtermin. Vor der Buchung ist eine Registrierung erforderlich.",
        button: "Zum Kalender",
      },
      location: {
        eyebrow: "Anfahrt",
        title: "So findest du mich",
        intro:
          "Ich freue mich darauf, Sie in meinem Studio begrüßen zu dürfen, wo Ihre Entspannung im Mittelpunkt steht.",
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
        city: "Hohenpeißenberg",
        whatsappLink:
          "https://wa.me/491722664648?text=Szia%2C%20időpontot%20szeretnék%20foglalni",
        hiemtWhatsappLink:
          "https://wa.me/491722664648?text=Szia%2C%20érdeklődni%20szeretnék%20a%20HIEMT%20kezelésről.",
      },
      nav: {
        about: "Rólam",
        services: "Masszázsok",
        special: "HIEMT",
        methods: "Kiegészítő kezelések",
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
          "A mozgás és a test harmóniája nemcsak a hivatásom, hanem az életszemléletem is. A sport és a mozgás szeretete gyermekkorom óta végigkíséri az életemet.",
          "Több mint 10 éve segítek vendégeimnek kiszakadni a mindennapi stresszből. Minden kezelés során az egyéni igények állnak a középpontban.",
          "Hiszem, hogy a masszázs több mint testi kezelés. Ez egy értékes énidő – a nyugalom pillanata.",
        ],
        qualificationsTitle: "Szakmai pályafutásom és képesítéseim",
        qualificationsText: [
          "Pályafutásomat 2007-ben aerobik edzőként kezdtem, ahol alapos anatómiai ismeretekre tettem szert.",
          "Szakmai pályafutásom során többek között elsajátítottam a svédmasszázst, wellness masszázsokat, a kínai és indiai fejmasszázst, valamint speciális technikákat is.",
          "Az FDM megközelítés központi szerepet játszik a munkámban, és az embert egészként szemlélem.",
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
              "Személyre szabott és rugalmas kezelés, amely pontosan az egyéni panaszokhoz és igényekhez igazodik. Szükség esetén FDM, köpölyözés vagy flossing is beépíthető a kezelésbe.",
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
          "Ezeket a kezeléseket részletesen is meg tudod nézni az információ gombbal. Az FDM, flossing és köpölyözés szükség szerint az egyéni kezelés része lehet.",
        info: "Információ",
        items: [
          {
            key: "fdm",
            title: "FDM",
            text:
              "Innovatív kezelési koncepció a mozgásszervi fájdalmak és mozgáskorlátozottság kezelésére.",
            image: "/fdm.png",
          },
          {
            key: "flossing",
            title: "Flossing",
            text:
              "Modern fizioterápiás módszer a fasciák, izmok és ízületek célzott kezelésére.",
            image: "/flossing.png",
          },
          {
            key: "schroepfen",
            title: "Köpölyözés",
            text:
              "Hagyományos vákuumterápia a vérkeringés javítására, izomlazításra és letapadások oldására.",
            image: "/cupping.png",
          },
          {
            key: "scarTreatment",
            title: "Hegkezelés",
            text:
              "Célzott kezelés a hegek mozgathatóságának, szöveti minőségének és funkciójának javítására.",
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
        pdfDe: "PDF letöltés DE",
        pdfHu: "PDF letöltés HU",
      },
      booking: {
        eyebrow: "Online foglalás",
        title: "Kényelmes online időpontkérés",
        text:
          "Válaszd ki a kezelést, az időtartamot és a kívánt időpontot. A foglaláshoz regisztráció szükséges.",
        button: "Naptár megnyitása",
      },
      location: {
        eyebrow: "Megközelítés",
        title: "Így találsz meg",
        intro:
          "Szeretettel várom Önt stúdiómban, ahol a pihenés és a feltöltődés áll a középpontban.",
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
              "Revolutionäre Lösung für die Gesundheit des Beckenbodens",
            paragraphs: [
              "Die Gesundheit der Beckenbodenmuskulatur ist für die Funktion unserer Beckenorgane von zentraler Bedeutung. Eine Schwächung dieser Muskulatur kann nicht nur unangenehm sein, sondern die Lebensqualität erheblich beeinträchtigen.",
              "Unser modernes HIEMT-System bietet eine komfortable, effektive und nicht-invasive Lösung für Frauen und Männer. Die Behandlung erfolgt bequem in Alltagskleidung, ohne Entkleiden und ohne direkten Körperkontakt.",
            ],
          },
          {
            heading: "Warum elektromagnetische Behandlung?",
            bullets: [
              "Sicher, schmerzfrei und nicht invasiv",
              "Für Frauen und Männer geeignet",
              "Hocheffiziente Aktivierung der Beckenbodenmuskulatur",
              "Diskret in normaler Kleidung",
              "Nur 30 Minuten pro Sitzung",
              "Keine Ausfallzeit",
            ],
          },
        ],
      },
      hu: {
        title: "HIEMT medencefenék-tréning",
        sections: [
          {
            heading: "Forradalmi megoldás a medencefenék egészségéért",
            paragraphs: [
              "A medencefenék izomzatának egészsége kulcsfontosságú a kismedencei szervek megfelelő működéséhez. Az izmok gyengülése az életminőséget is jelentősen befolyásolhatja.",
              "A modern HIEMT rendszer kényelmes, hatékony és nem invazív megoldást kínál nőknek és férfiaknak egyaránt. A kezelés utcai ruhában történik, fizikai kontaktus nélkül.",
            ],
          },
          {
            heading: "Miért válassza az elektromágneses kezelést?",
            bullets: [
              "Biztonságos, fájdalommentes és nem invazív",
              "Nők és férfiak számára is alkalmas",
              "Hatékony medencefenék-aktiválás",
              "Diszkrét, ruhában végezhető",
              "Csak 30 perc egy alkalom",
              "Nincs felépülési idő",
            ],
          },
        ],
      },
    }),
    []
  );

  const infoContent = useMemo<Record<string, { de: InfoEntry; hu: InfoEntry }>>(
    () => ({
      individual: {
        de: {
          title: "Individuelle Massage",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Die Individualmassage ist eine maßgeschneiderte Behandlung, die speziell auf die persönlichen Bedürfnisse, Beschwerden und Wünsche des Kunden abgestimmt wird.",
                "Im Gegensatz zu standardisierten Massageformen kombiniert sie verschiedene manuelle Techniken, um ein optimales therapeutisches und entspannendes Ergebnis zu erzielen.",
                "Je nach Befund und Bedarf können ergänzend auch FDM, Schröpfen oder Flossing in die Behandlung integriert werden. Diese Techniken gehören damit bei Bedarf zur individuellen Massage und werden vor Ort passend entschieden.",
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
                "Az egyéni masszázs egy személyre szabott kezelés, amelyet kifejezetten a kliens személyes igényeihez, betegségeihez és kívánságaihoz igazítanak.",
                "A standardizált masszázstechnikákkal ellentétben különféle manuális technikákat kombinál az optimális terápiás és relaxációs eredmények elérése érdekében.",
                "Szükség esetén az FDM, a köpölyözés vagy a flossing is beépíthető a kezelésbe, attól függően, hogy mire van szükség.",
              ],
            },
            {
              heading: "Az egyéni masszázs céljai",
              bullets: [
                "Az izomfeszültség egyénre szabott enyhítése",
                "Fájdalomcsillapítás specifikus betegségek esetén",
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
                "Simítás",
                "Gyúrás",
                "Dörzsölés",
                "Triggerpont terápia",
                "Nyújtások és mobilizációk",
                "Fasciális technikák",
              ],
            },
            {
              heading: "A kezelés időtartama",
              bullets: [
                "60 perc – Az egyes problémás területek célzott kezelése",
                "90 perc – Átfogó, személyre szabott masszázs",
                "120 perc – Intenzív teljes testes kezelés, amely a kellemetlenségek több területére összpontosít",
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
                "Die Nacken- und Rückenmassage ist eine gezielte Teilkörpermassage, die speziell auf die am häufigsten von Verspannungen betroffenen Bereiche des Körpers ausgerichtet ist.",
                "Durch langes Sitzen, Stress, einseitige Belastungen oder körperliche Überanstrengung entstehen häufig Muskelverhärtungen im Nacken-, Schulter- und Rückenbereich.",
                "Diese Massageform dient dazu, Schmerzen zu lindern, Verspannungen zu lösen und das allgemeine Wohlbefinden zu steigern.",
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
                "A nyak- és hátmasszázs egy célzott részleges testmasszázs, amely kifejezetten a feszültség által leggyakrabban érintett testrészekre összpontosít.",
                "A hosszan tartó ülés, a stressz, az ismétlődő megterhelés vagy a fizikai túlterhelés gyakran izomfeszültséghez vezet a nyakban, a vállakban és a hátban. Ez a fajta masszázs célja a fájdalom enyhítése, a feszültség oldása és az általános közérzet javítása.",
              ],
            },
            {
              heading: "Nyak- és hátmasszázs céljai",
              bullets: [
                "A nyak és a hát izomfeszültségének enyhítése",
                "A feszültség és a rossz testtartás okozta fájdalom csillapítása",
                "Az izmok vérkeringésének és oxigénellátásának elősegítése",
                "A nyak és a vállak mozgékonyságának javítása",
                "Stresszcsökkentés és mentális relaxáció",
                "Fejfájás és feszültség okozta fejfájás megelőzése",
                "Az egészséges testtartás támogatása",
              ],
            },
            {
              heading: "Tipikus masszázstechnikák",
              bullets: [
                "Simítás",
                "Gyúrás",
                "Dörzsölés",
                "Triggerpont terápia",
                "Nyújtások és mobilizációk",
              ],
            },
            {
              heading: "A kezelés időtartama",
              bullets: [
                "45 perc – Rövid, célzott kezelés akut feszültség esetén",
                "60 perc – Intenzívebb kezelés, amely a problémás területekre összpontosít",
                "75 perc – Átfogó és különösen pihentető terápia",
              ],
            },
            {
              heading: "Pozitív hatások",
              bullets: [
                "Izommerevség és fájdalom csökkentése",
                "Javuló testtartás",
                "Mozgástartomány növelése",
                "A paraszimpatikus idegrendszer aktiválása",
                "Ellazulás és belső béke elősegítése",
                "Javuló alvásminőség",
              ],
            },
            {
              heading: "Ellenjavallatok",
              bullets: [
                "Akut gyulladás vagy fertőzés",
                "Láz",
                "Friss vagy műtét utáni sérülések vagy műtétek",
                "Akut porckorongsérv",
                "Trombózis vagy súlyos érbetegség",
                "Nyílt sebek vagy bőrsérülések betegségek",
                "Súlyos neurológiai rendellenességek",
              ],
            },
          ],
        },
      },

      fdm: {
        de: {
          title: "FDM",
          sections: [
            {
              heading: "Allgemeine Beschreibung",
              paragraphs: [
                "Das Fascial Distortion Model (FDM) ist ein innovatives und wirkungsvolles Behandlungskonzept zur Therapie von Schmerzen und Bewegungseinschränkungen des Bewegungsapparates.",
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
                "Flossing ist eine komplexe physiotherapeutische Behandlung, die vor allem das Bindegewebe, die Muskeln und die Gelenke beeinflusst.",
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
                "Schröpfen ist eine traditionelle Therapieform, bei der durch Unterdruck die Durchblutung angeregt, Verspannungen gelöst und der Stoffwechsel aktiviert werden.",
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
                "A köpölyözés egy évezredes hagyományokra visszatekintő vákuumterápia, amely során vákuumot hoznak létre a bőr felszínén.",
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
                "Die Narbenbehandlung umfasst Maßnahmen zur ästhetischen und funktionellen Verbesserung des Narbengewebes.",
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
                "A hegkezelés a hegszövet esztétikai és funkcionális javítását célzó eljárások összessége.",
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
                "Die Champi Kopfmassage, auch bekannt als indische Kopfmassage, ist eine traditionelle Behandlung mit Ursprung in der indischen Heilkunst des Ayurveda.",
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-10">
          <nav className="hidden items-center gap-8 text-base text-white lg:flex">
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
            <p className="mt-1 text-sm uppercase tracking-[0.3em] text-[#f2ecdf]">
              {c.brand.city}
            </p>
          </div>

          <div className="hidden items-center gap-8 text-base text-white lg:flex">
            <a href="#zusatzangebote" className="hover:text-[#f5efe3]">{c.nav.methods}</a>
            <a href="#anfahrt" className="hover:text-[#f5efe3]">{c.nav.location}</a>
            <a
              href="/booking"
              className="rounded-full border border-[#f5efe3] px-5 py-2 text-base font-medium text-[#f5efe3] hover:bg-[#f5efe3] hover:text-[#556246]"
            >
              {c.nav.booking}
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl justify-end px-4 pb-2 lg:px-10">
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
                    <a href="/hiemt-de.pdf" download className="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50">
                      {c.special.pdfDe}
                    </a>
                    <a href="/hiemt-hu.pdf" download className="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50">
                      {c.special.pdfHu}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="pt-20 pb-2">
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
                      <div className="flex h-full min-h-[440px] w-full items-center justify-center bg-white">
                        <img
                          src={service.image}
                          alt={service.title}
                          className={`${
                            service.key === "champi"
                              ? "h-[280px] w-auto object-contain"
                              : service.key === "individual"
                              ? "max-h-[380px] w-auto object-contain p-4"
                              : "h-full w-full object-cover"
                          }`}
                        />
                      </div>
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

      <section id="zusatzangebote" className="bg-[#f8f2e9] pt-6 pb-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">{c.methods.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">{c.methods.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">{c.methods.text}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {c.methods.items.map((item: MethodCard) => (
              <div key={item.key} className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
                <div className="h-64 w-full bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`h-full w-full ${
                      item.key === "scarTreatment"
                        ? "object-contain bg-stone-50 p-3"
                        : "object-cover"
                    }`}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-stone-900">{item.title}</h3>
                  <p className="mt-5 leading-8 text-stone-600">{item.text}</p>
                  <div className="mt-6">
                    <button
                      onClick={() => setActiveInfo(item.key)}
                      className="rounded-none border border-[#405e3f] px-6 py-3 text-[#405e3f] transition hover:bg-[#eef3e6]"
                    >
                      {c.methods.info}
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
            <a href="/datenschutz" className="hover:text-stone-800">{c.footer.privacy}</a>
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