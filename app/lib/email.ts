import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingEmailProps {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  duration: number;
}

export async function sendAdminNotification(data: BookingEmailProps) {
  await resend.emails.send({
    from: "Christina Massage <onboarding@resend.dev>", // später: buchung@christina-massage.com
    to: ["christina.massage.fdm@gmail.com"],
    subject: "Neue Terminbuchung",
    html: `
      <h2>Neue Terminbuchung</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>E-Mail:</strong> ${data.email}</p>
      <p><strong>Leistung:</strong> ${data.service}</p>
      <p><strong>Datum:</strong> ${data.date}</p>
      <p><strong>Uhrzeit:</strong> ${data.time}</p>
      <p><strong>Dauer:</strong> ${data.duration} Minuten</p>
      <p>
        <a href="https://christina-massage.com/admin">Zum Admin-Bereich</a>
      </p>
    `,
  });
}

export async function sendCustomerConfirmation(data: BookingEmailProps) {
  await resend.emails.send({
    from: "Christina Massage <onboarding@resend.dev>",
    to: [data.email],
    subject: "Terminbestätigung – Christina Massage",
    html: `
      <h2>Terminbestätigung</h2>
      <p>Liebe/r ${data.name},</p>
      <p>vielen Dank für Ihre Buchung. Ihr Termin wurde erfolgreich reserviert.</p>
      <p><strong>Leistung:</strong> ${data.service}</p>
      <p><strong>Datum:</strong> ${data.date}</p>
      <p><strong>Uhrzeit:</strong> ${data.time}</p>
      <p><strong>Dauer:</strong> ${data.duration} Minuten</p>
      <p><strong>Adresse:</strong> Bahnhofstraße 21, 82383 Hohenpeißenberg</p>
      <p>Bitte beachten Sie, dass Terminabsagen mindestens 24 Stunden im Voraus erfolgen müssen.</p>
      <p>Bei Fragen erreichen Sie uns unter 
        <a href="mailto:christina.massage.fdm@gmail.com">
          christina.massage.fdm@gmail.com
        </a>.
      </p>
      <p>Wir freuen uns auf Ihren Besuch!</p>
      <p><strong>Christina Massage</strong></p>
    `,
  });
}