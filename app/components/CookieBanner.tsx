"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("christina-cookie-consent");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("christina-cookie-consent", "accepted");
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("christina-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-stone-300 bg-white p-4 shadow-2xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-stone-700">
          Diese Website verwendet Cookies, um die Benutzerfreundlichkeit zu
          verbessern. Mit der Nutzung der Website stimmst du der Verwendung zu.
        </p>

        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700"
          >
            Ablehnen
          </button>
          <button
            onClick={acceptCookies}
            className="rounded-full bg-[#405e3f] px-4 py-2 text-sm font-medium text-white"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}