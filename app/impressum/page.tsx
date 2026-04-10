"use client";

import { useState } from "react";
import { translations, Language } from "@/lib/translations";

export default function ImpressumPage() {
  const [lang, setLang] = useState<Language>("de");
  const t = translations[lang];

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex justify-end gap-2 mb-6">
        <button onClick={() => setLang("de")} className="px-3 py-1 bg-gray-200 rounded">DE</button>
        <button onClick={() => setLang("hu")} className="px-3 py-1 bg-gray-200 rounded">HU</button>
      </div>

      <h1 className="text-3xl font-bold mb-4">{t.imprint.title}</h1>
      <p className="whitespace-pre-line">{t.imprint.content}</p>
    </main>
  );
}