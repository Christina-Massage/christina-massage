import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "christina.massage.fdm@gmail.com";

type BookingMailData = {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  duration: number;
};

// Einfache Spracherkennung anhand des Servicenamens
function detectLanguage(service: string): "de" | "hu" {
  const hungarianKeywords = [
    "masszázs",
    "kezelés",
    "hát",
    "nyak",
    "talp",
    "nyirok",
    "stressz",
    "heg",
  ];
  const lower = service.toLowerCase();
  return hungarianKeywords.some((word) => lower.includes(word))
    ? "hu"
    : "de";
}

/* -------------------------------------------------------------------------- */
/*                       📩 E-Mail an Christina (Admin)                       */
/* -------------------------------------------------------------------------- */
export async function sendAdminNotification(data: BookingMailData) {
  const { name, email, service, date, time, duration } = data;

  return resend.emails.send({
    from: "Christina Massage <buchung@christina-massage.com>",
    to: ADMIN_EMAIL,
    subject: `Neue Terminbuchung – ${service} am ${date} um ${time}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color:#405e3f;">Neue Terminbuchung</h2>
        <p>Über die Website wurde ein neuer Termin angefragt.</p>
        <table style="border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Name:</td><td>${name}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">E-Mail:</td><td>${email}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Behandlung:</td><td>${service}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Datum:</td><td>${date}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Uhrzeit:</td><td>${time}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Dauer:</td><td>${duration} Minuten</td></tr>
        </table>
        <p style="margin-top:20px;">Diese Nachricht wurde automatisch über die Website generiert.</p>
      </div>
    `,
  });
}

/* -------------------------------------------------------------------------- */
/*                       📩 E-Mail an den Kunden (Anfrage)                    */
/* -------------------------------------------------------------------------- */
export async function sendCustomerConfirmation(data: BookingMailData) {
  const { name, email, service, date, time, duration } = data;
  const language = detectLanguage(service);

  const subject =
    language === "hu"
      ? `Időpontkérés visszaigazolása – ${service}`
      : `Deine Terminanfrage – ${service}`;

  const html =
    language === "hu"
      ? `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color:#405e3f;">Köszönjük a foglalást!</h2>
        <p>Kedves ${name},</p>
        <p>Az időpontkérésed sikeresen beérkezett a <strong>Christina Massage</strong> részére.</p>
        <table style="border-collapse: collapse; margin-top: 16px;">
          <tr><td style="font-weight:bold;">Kezelés:</td><td>${service}</td></tr>
          <tr><td style="font-weight:bold;">Dátum:</td><td>${date}</td></tr>
          <tr><td style="font-weight:bold;">Időpont:</td><td>${time}</td></tr>
          <tr><td style="font-weight:bold;">Időtartam:</td><td>${duration} perc</td></tr>
        </table>
        <p style="margin-top:20px;">
          Az időpont legkésőbb 24 órával korábban díjmentesen lemondható.
        </p>
        <p>Szeretettel várlak,<br/><strong>Christina Massage</strong></p>
      </div>
      `
      : `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color:#405e3f;">Vielen Dank für deine Buchung!</h2>
        <p>Liebe/r ${name},</p>
        <p>Deine Terminanfrage bei <strong>Christina Massage</strong> ist erfolgreich eingegangen.</p>
        <table style="border-collapse: collapse; margin-top: 16px;">
          <tr><td style="font-weight:bold;">Behandlung:</td><td>${service}</td></tr>
          <tr><td style="font-weight:bold;">Datum:</td><td>${date}</td></tr>
          <tr><td style="font-weight:bold;">Uhrzeit:</td><td>${time}</td></tr>
          <tr><td style="font-weight:bold;">Dauer:</td><td>${duration} Minuten</td></tr>
        </table>
        <p style="margin-top:20px;">
          Termine können bis 24 Stunden vorher kostenfrei abgesagt werden.
        </p>
        <p>Ich freue mich auf deinen Besuch!<br/><strong>Christina Massage</strong></p>
      </div>
      `;

  return resend.emails.send({
    from: "Christina Massage <buchung@christina-massage.com>",
    to: email,
    subject,
    html,
  });
}

/* -------------------------------------------------------------------------- */
/*                       📩 Termin bestätigt                                  */
/* -------------------------------------------------------------------------- */
export async function sendCustomerConfirmedEmail(data: BookingMailData) {
  const { name, email, service, date, time, duration } = data;
  const language = detectLanguage(service);

  const subject =
    language === "hu"
      ? `Az időpontod megerősítve – ${service}`
      : `Dein Termin wurde bestätigt – ${service}`;

  const html =
    language === "hu"
      ? `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color:#405e3f;">Időpont megerősítve</h2>
        <p>Kedves ${name}, az alábbi időpontod megerősítésre került:</p>
        <p><strong>${date} ${time}</strong> – ${service} (${duration} perc)</p>
        <p>Szeretettel várlak!</p>
        <p><strong>Christina Massage</strong></p>
      </div>`
      : `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color:#405e3f;">Dein Termin ist bestätigt</h2>
        <p>Liebe/r ${name}, dein Termin wurde bestätigt:</p>
        <p><strong>${date} ${time}</strong> – ${service} (${duration} Minuten)</p>
        <p>Ich freue mich auf dich!</p>
        <p><strong>Christina Massage</strong></p>
      </div>`;

  return resend.emails.send({
    from: "Christina Massage <buchung@christina-massage.com>",
    to: email,
    subject,
    html,
  });
}

/* -------------------------------------------------------------------------- */
/*                       📩 Termin storniert                                  */
/* -------------------------------------------------------------------------- */
export async function sendCustomerCancelledEmail(data: BookingMailData) {
  const { name, email, service, date, time, duration } = data;
  const language = detectLanguage(service);

  const subject =
    language === "hu"
      ? `Az időpontod törölve – ${service}`
      : `Dein Termin wurde storniert – ${service}`;

  const html =
    language === "hu"
      ? `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color:#8b1e1e;">Időpont törölve</h2>
        <p>Kedves ${name}, az alábbi időpont törlésre került:</p>
        <p><strong>${date} ${time}</strong> – ${service}</p>
        <p>Új időpontot bármikor foglalhatsz a weboldalon.</p>
        <p><strong>Christina Massage</strong></p>
      </div>`
      : `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color:#8b1e1e;">Dein Termin wurde storniert</h2>
        <p>Liebe/r ${name}, dein Termin wurde storniert:</p>
        <p><strong>${date} ${time}</strong> – ${service}</p>
        <p>Du kannst jederzeit einen neuen Termin über die Website buchen.</p>
        <p><strong>Christina Massage</strong></p>
      </div>`;

  return resend.emails.send({
    from: "Christina Massage <buchung@christina-massage.com>",
    to: email,
    subject,
    html,
  });
}