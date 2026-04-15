import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// 👉 Hier deine echte E-Mail-Adresse eintragen
const ADMIN_EMAIL = "christina.massage.fdm@gmail.com";

type BookingMailData = {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  duration: number;
};

// Hilfsfunktion zur Spracherkennung (Deutsch oder Ungarisch)
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
    from: "Christina Massage <from: "Christina Massage <buchung@christina-massage.com>",>",
    to: ADMIN_EMAIL,
    subject: `Neue Terminbuchung – ${service} am ${date} um ${time}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color:#405e3f;">Neue Terminbuchung</h2>
        <p>Über die Website wurde ein neuer Termin angefragt.</p>

        <table style="border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Name:</td>
            <td style="padding: 6px 12px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">E-Mail:</td>
            <td style="padding: 6px 12px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Behandlung:</td>
            <td style="padding: 6px 12px;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Datum:</td>
            <td style="padding: 6px 12px;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Uhrzeit:</td>
            <td style="padding: 6px 12px;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Dauer:</td>
            <td style="padding: 6px 12px;">${duration} Minuten</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">
          Du kannst die Buchung im Admin-Bereich verwalten.
        </p>

        <p style="margin-top: 30px; color: #777;">
          Diese Nachricht wurde automatisch über die Website generiert.
        </p>
      </div>
    `,
  });
}

/* -------------------------------------------------------------------------- */
/*                       📩 E-Mail an den Kunden                              */
/* -------------------------------------------------------------------------- */
export async function sendCustomerConfirmation(data: BookingMailData) {
  const { name, email, service, date, time, duration } = data;

  const language = detectLanguage(service);

  const subject =
    language === "hu"
      ? `Időpont megerősítése – ${service}`
      : `Deine Terminbestätigung – ${service}`;

  const html =
    language === "hu"
      ? `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color:#405e3f;">Köszönjük a foglalást!</h2>
        <p>Kedves ${name},</p>
        <p>
          Örömmel értesítünk, hogy az időpontkérésed a 
          <strong>Christina Massage</strong> szolgáltatására sikeresen beérkezett.
        </p>

        <table style="border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Kezelés:</td>
            <td style="padding: 6px 12px;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Dátum:</td>
            <td style="padding: 6px 12px;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Időpont:</td>
            <td style="padding: 6px 12px;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Időtartam:</td>
            <td style="padding: 6px 12px;">${duration} perc</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">
          Az időpont legkésőbb 24 órával korábban díjmentesen lemondható. 
          Későbbi lemondás vagy meg nem jelenés esetén 10 € rendelkezésre állási díj kerülhet felszámításra.
        </p>

        <p style="margin-top: 20px;">
          Szeretettel várlak,<br/>
          <strong>Christina Massage</strong>
        </p>
      </div>
      `
      : `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color:#405e3f;">Vielen Dank für deine Buchung!</h2>
        <p>Liebe/r ${name},</p>
        <p>
          deine Terminanfrage bei <strong>Christina Massage</strong> ist erfolgreich eingegangen.
        </p>

        <table style="border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Behandlung:</td>
            <td style="padding: 6px 12px;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Datum:</td>
            <td style="padding: 6px 12px;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Uhrzeit:</td>
            <td style="padding: 6px 12px;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-weight: bold;">Dauer:</td>
            <td style="padding: 6px 12px;">${duration} Minuten</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">
          Termine können bis 24 Stunden vorher kostenfrei abgesagt werden. 
          Bei späterer Absage oder Nichterscheinen kann eine Ausfallpauschale von 10 € berechnet werden.
        </p>

        <p style="margin-top: 20px;">
          Ich freue mich darauf, dich bald begrüßen zu dürfen.<br/>
          <strong>Christina Massage</strong>
        </p>
      </div>
      `;

  return resend.emails.send({
    from: "Christina Massage <onboarding@resend.dev>",
    to: email,
    subject,
    html,
  });
}