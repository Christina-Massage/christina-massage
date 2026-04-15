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

export async function sendAdminNotification(data: BookingMailData) {
  const { name, email, service, date, time, duration } = data;

  return resend.emails.send({
    from: "Christina Massage <onboarding@resend.dev>",
    to: ADMIN_EMAIL,
    subject: `Neue Buchung: ${service} am ${date} um ${time}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Neue Terminbuchung</h2>
        <p>Es wurde ein neuer Termin über die Website angefragt.</p>

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
          Bitte prüfe die Buchung im Admin-Bereich.
        </p>
      </div>
    `,
  });
}

export async function sendCustomerConfirmation(data: BookingMailData) {
  const { name, email, service, date, time, duration } = data;

  return resend.emails.send({
    from: "Christina Massage <onboarding@resend.dev>",
    to: email,
    subject: `Deine Terminbestätigung – ${service}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Vielen Dank für deine Buchung</h2>
        <p>Hallo ${name},</p>
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
          Falls du deinen Termin absagen musst, ist dies bis 24 Stunden vorher kostenfrei möglich.
          Bei späterer Absage oder Nichterscheinen kann eine Ausfallpauschale von 10 € berechnet werden.
        </p>

        <p>
          Liebe Grüße<br />
          <strong>Christina Massage</strong>
        </p>
      </div>
    `,
  });
}