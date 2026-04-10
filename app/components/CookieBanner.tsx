"use client";

import CookieConsent from "react-cookie-consent";
import { useState } from "react";
import { translations, Language } from "@/lib/translations";

export default function CookieBanner() {
  const [lang] = useState<Language>("de");
  const t = translations[lang];

  return (
    <CookieConsent
      location="bottom"
      buttonText={t.cookie.accept}
      declineButtonText={t.cookie.decline}
      enableDeclineButton
      cookieName="christina-massage-cookie-consent"
      style={{ background: "#2f4f4f" }}
      buttonStyle={{ color: "#fff", background: "#4a7c59" }}
    >
      {t.cookie.text}
    </CookieConsent>
  );
}