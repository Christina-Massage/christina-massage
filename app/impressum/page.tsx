"use client";

import { useState } from "react";

type Language = "de" | "hu";

export default function ImpressumPage() {
  const [language, setLanguage] = useState<Language>("de");

  const content =
    language === "de"
      ? {
          title: "Impressum",
          body: `Angaben gemäß § 5 TMG

Christina Dobozi
Bahnhofstraße 21
82383 Hohenpeißenberg
Deutschland

Kontakt:
Telefon: +49 172 2664648
E-Mail: dobozikriszta76@gmail.com

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
Christina Dobozi
Bahnhofstraße 21
82383 Hohenpeißenberg

EU-Streitschlichtung:
Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
https://ec.europa.eu/consumers/odr/

Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`,
        }
      : {
          title: "Impresszum",
          body: `Szolgáltató adatai

Christina Dobozi
Bahnhofstraße 21
82383 Hohenpeißenberg
Németország

Kapcsolat:
Telefon: +49 172 2664648
E-mail: dobozikriszta76@gmail.com

Tartalomért felelős személy:
Christina Dobozi
Bahnhofstraße 21
82383 Hohenpeißenberg`,
        };

  return (
    <main className="min-h-screen bg-[#f6efe5] px-6 py-16 text-stone-800">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex justify-end gap-2">
          <button
            onClick={() => setLanguage("de")}
            className={`rounded-full px-4 py-2 text-sm ${
              language === "de"
                ? "bg-stone-800 text-white"
                : "bg-white text-stone-700"
            }`}
          >
            DE
          </button>
          <button
            onClick={() => setLanguage("hu")}
            className={`rounded-full px-4 py-2 text-sm ${
              language === "hu"
                ? "bg-stone-800 text-white"
                : "bg-white text-stone-700"
            }`}
          >
            HU
          </button>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold">{content.title}</h1>
          <div className="mt-6 whitespace-pre-line text-base leading-8 text-stone-700">
            {content.body}
          </div>
        </div>
      </div>
    </main>
  );
}