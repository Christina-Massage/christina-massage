import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY.");
}

if (!ownerEmail) {
  throw new Error("Missing OWNER_NOTIFICATION_EMAIL.");
}

const resend = new Resend(resendApiKey);
const FROM_EMAIL = "buchung@christina-massage.com";

type BookingMailData = {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  price?: number;
};

export async function sendCustomerBookingRequestEmail(data: BookingMailData) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Deine Buchungsanfrage bei Christina Massage",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Vielen Dank für deine Buchungsanfrage</h2>
        <p>Hallo ${data.name},</p>
        <p>deine Anfrage ist bei Christina Massage eingegangen.</p>
        <p>
          <strong>Behandlung:</strong> ${data.service}<br />
          <strong>Datum:</strong> ${data.date}<br />
          <strong>Uhrzeit:</strong> ${data.time}<br />
          <strong>Dauer:</strong> ${data.duration} Minuten<br />
          <strong>Preis:</strong> ${data.price ?? "-"} €
        </p>
        <p>Du erhältst eine weitere E-Mail, sobald dein Termin bestätigt wurde.</p>
      </div>
    `,
  });
}

export async function sendOwnerNewBookingEmail(data: BookingMailData) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ownerEmail,
    subject: "Neue Buchungsanfrage eingegangen",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Neue Buchungsanfrage</h2>
        <p>
          <strong>Name:</strong> ${data.name}<br />
          <strong>E-Mail:</strong> ${data.email}<br />
          <strong>Behandlung:</strong> ${data.service}<br />
          <strong>Datum:</strong> ${data.date}<br />
          <strong>Uhrzeit:</strong> ${data.time}<br />
          <strong>Dauer:</strong> ${data.duration} Minuten<br />
          <strong>Preis:</strong> ${data.price ?? "-"} €
        </p>
      </div>
    `,
  });
}

export async function sendCustomerConfirmedEmail(data: BookingMailData) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Dein Termin wurde bestätigt",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Dein Termin wurde bestätigt</h2>
        <p>Hallo ${data.name},</p>
        <p>dein Termin wurde bestätigt.</p>
        <p>
          <strong>Behandlung:</strong> ${data.service}<br />
          <strong>Datum:</strong> ${data.date}<br />
          <strong>Uhrzeit:</strong> ${data.time}<br />
          <strong>Dauer:</strong> ${data.duration} Minuten
        </p>
      </div>
    `,
  });
}

export async function sendCustomerCancelledEmail(data: BookingMailData) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Dein Termin wurde storniert",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Dein Termin wurde storniert</h2>
        <p>Hallo ${data.name},</p>
        <p>dein Termin wurde storniert.</p>
        <p>
          <strong>Behandlung:</strong> ${data.service}<br />
          <strong>Datum:</strong> ${data.date}<br />
          <strong>Uhrzeit:</strong> ${data.time}<br />
          <strong>Dauer:</strong> ${data.duration} Minuten
        </p>
      </div>
    `,
  });
}