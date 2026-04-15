export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[#f6efe5] text-stone-800">
      <header className="border-b border-[#6f7d58] bg-[#7a8662]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <a
            href="/"
            className="text-sm font-medium text-white hover:text-[#f5efe3]"
          >
            ← Zurück zur Startseite
          </a>

          <img
            src="/logo-christina-massage.png"
            alt="Christina Massage Logo"
            className="h-14 w-auto object-contain"
          />
        </div>
      </header>

      <main className="px-4 py-8 sm:px-6 md:px-10">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
            Datenschutz
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900 md:text-4xl">
            Datenschutzerklärung
          </h1>

          <div className="mt-8 space-y-8 text-sm leading-7 text-stone-700 md:text-base">
            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                1. Allgemeine Hinweise
              </h2>
              <p className="mt-3">
                Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges
                Anliegen. Personenbezogene Daten werden auf dieser Website nur
                im notwendigen Umfang verarbeitet. Die Verarbeitung erfolgt im
                Einklang mit den geltenden datenschutzrechtlichen Vorschriften,
                insbesondere der Datenschutz-Grundverordnung (DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                2. Verantwortliche Stelle
              </h2>
              <p className="mt-3">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="mt-3">
                <strong>Christina Massage</strong>
                <br />
                Bahnhofstraße 21
                <br />
                82383 Hohenpeißenberg
                <br />
                E-Mail: christina.massage.fdm@gmail.com
                <br />
                Telefon: +49 172 2664648
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                3. Erhebung und Verarbeitung personenbezogener Daten
              </h2>
              <p className="mt-3">
                Personenbezogene Daten werden nur dann erhoben, wenn Sie uns
                diese im Rahmen einer Kontaktaufnahme, einer Terminbuchung oder
                einer Registrierung freiwillig mitteilen.
              </p>
              <p className="mt-3">Dabei können insbesondere folgende Daten verarbeitet werden:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer</li>
                <li>gebuchte Leistung</li>
                <li>Datum und Uhrzeit des gewünschten Termins</li>
                <li>technische Verbindungsdaten bei Nutzung der Website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                4. Zwecke der Verarbeitung
              </h2>
              <p className="mt-3">
                Die Verarbeitung Ihrer Daten erfolgt insbesondere zu folgenden
                Zwecken:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Bereitstellung der Website</li>
                <li>Bearbeitung von Anfragen</li>
                <li>Verwaltung und Durchführung von Terminbuchungen</li>
                <li>Versand von Terminbestätigungen und Benachrichtigungen</li>
                <li>technische Sicherheit und Stabilität der Website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                5. Rechtsgrundlagen
              </h2>
              <p className="mt-3">
                Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf
                Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur Durchführung
                vorvertraglicher Maßnahmen und zur Erfüllung eines Vertrags,
                soweit die Daten für Terminbuchungen oder Anfragen erforderlich
                sind.
              </p>
              <p className="mt-3">
                Soweit eine Verarbeitung zur technischen Bereitstellung und
                Sicherheit der Website erfolgt, basiert sie auf Art. 6 Abs. 1
                lit. f DSGVO. Unser berechtigtes Interesse liegt in einer
                sicheren, stabilen und nutzerfreundlichen Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                6. Terminbuchung und Benutzerkonto
              </h2>
              <p className="mt-3">
                Auf unserer Website besteht die Möglichkeit, ein Benutzerkonto
                anzulegen und online Termine anzufragen. In diesem Zusammenhang
                werden die von Ihnen eingegebenen Daten gespeichert und zur
                Durchführung sowie Verwaltung Ihrer Buchung verarbeitet.
              </p>
              <p className="mt-3">
                Im Rahmen der Terminverwaltung können Buchungsstatus, gewählte
                Leistungen, Termindaten und Kontaktdaten gespeichert werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                7. Kontaktaufnahme per E-Mail oder WhatsApp
              </h2>
              <p className="mt-3">
                Wenn Sie uns per E-Mail oder WhatsApp kontaktieren, werden die
                von Ihnen mitgeteilten Daten zur Bearbeitung Ihrer Anfrage
                gespeichert und verarbeitet. Diese Daten werden nicht ohne Ihre
                Einwilligung an Dritte weitergegeben, sofern dies nicht zur
                Bearbeitung erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                8. Eingesetzte Dienstleister und Hosting
              </h2>
              <p className="mt-3">
                Diese Website wird über externe technische Dienstleister
                betrieben. Dabei kann es zur Verarbeitung personenbezogener
                Daten durch folgende Anbieter kommen:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Vercel</strong> zur Bereitstellung und zum Hosting der
                  Website
                </li>
                <li>
                  <strong>Supabase</strong> zur Verwaltung von Benutzerkonten,
                  Buchungen und Datenbankinhalten
                </li>
                <li>
                  <strong>Resend</strong> für den Versand von Termin- und
                  Benachrichtigungs-E-Mails
                </li>
                <li>
                  <strong>Google Maps</strong> zur Darstellung des Standorts
                </li>
              </ul>
              <p className="mt-3">
                Mit diesen Dienstleistern können Auftragsverarbeitungsverträge
                oder vergleichbare datenschutzrechtliche Garantien bestehen,
                soweit dies erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                9. Google Maps
              </h2>
              <p className="mt-3">
                Diese Website verwendet Google Maps zur Darstellung eines
                Standorts. Beim Laden der Karte können Informationen, darunter
                insbesondere Ihre IP-Adresse, an Google übermittelt werden.
              </p>
              <p className="mt-3">
                Die Nutzung von Google Maps erfolgt im Interesse einer
                ansprechenden Darstellung unseres Online-Angebots und einer
                leichten Auffindbarkeit des angegebenen Standorts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                10. Speicherdauer
              </h2>
              <p className="mt-3">
                Personenbezogene Daten werden nur so lange gespeichert, wie dies
                für die jeweiligen Verarbeitungszwecke erforderlich ist oder
                gesetzliche Aufbewahrungsfristen bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                11. Ihre Rechte
              </h2>
              <p className="mt-3">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
                jederzeit das Recht auf:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Auskunft über Ihre gespeicherten Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung Ihrer Daten</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerspruch gegen bestimmte Verarbeitungen</li>
              </ul>
              <p className="mt-3">
                Zudem haben Sie das Recht, sich bei einer zuständigen
                Datenschutz-Aufsichtsbehörde zu beschweren.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                12. SSL- bzw. TLS-Verschlüsselung
              </h2>
              <p className="mt-3">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                Übertragung vertraulicher Inhalte eine SSL- bzw.
                TLS-Verschlüsselung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-stone-900">
                13. Änderungen dieser Datenschutzerklärung
              </h2>
              <p className="mt-3">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                damit sie stets den aktuellen rechtlichen Anforderungen
                entspricht oder um Änderungen unserer Leistungen in der
                Datenschutzerklärung umzusetzen.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}