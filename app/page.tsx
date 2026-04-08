export default function ChristinaMassageWebsite() {
  const services = [
    {
      title: "Klassische Massage",
      text: "Sanfte bis gezielte Griffe zur Lockerung von Muskulatur und zur spürbaren Entlastung im Alltag.",
    },
    {
      title: "Erfrischende Massage",
      text: "Belebende Anwendung für neue Energie, Leichtigkeit und ein frisches Körpergefühl.",
    },
    {
      title: "Rücken & Nacken",
      text: "Fokussierte Behandlung bei typischen Verspannungen im oberen Rücken- und Schulterbereich.",
    },
    {
      title: "Ganzkörpermassage",
      text: "Ganzheitliche Entspannung für Körper und Geist in ruhiger, natürlicher Atmosphäre.",
    },
    {
      title: "Fußmassage",
      text: "Wohltuende Anwendung zur Entspannung und Entlastung beanspruchter Füße.",
    },
    {
      title: "Lymphdrainage",
      text: "Sanfte, rhythmische Behandlung zur Unterstützung eines angenehmen Körpergefühls.",
    },
    {
      title: "Vagus-Stressabbau",
      text: "Ruhige Anwendung mit Fokus auf Loslassen, Nervensystem und tiefe Regeneration.",
    },
    {
      title: "Bauchmassage",
      text: "Achtsame Behandlung für Entspannung, innere Ruhe und ein harmonischeres Körpergefühl.",
    },
    {
      title: "Kopfmassage",
      text: "Wohltuend bei Stress, mentaler Anspannung und für kleine Ruheinseln im Alltag.",
    },
    {
      title: "Faszienmassage",
      text: "Gezielte Impulse zur Mobilisierung und für mehr Bewegungsfreiheit im Gewebe.",
    },
    {
      title: "Narbenbehandlung",
      text: "Behutsame Behandlung zur Unterstützung von Geschmeidigkeit und Wohlbefinden im betroffenen Bereich.",
    },
  ];

  const benefits = [
    {
      title: "Individuell abgestimmte Behandlungen",
      text: "Jede Massage wird achtsam auf deine Bedürfnisse abgestimmt, damit du genau die Entspannung und Unterstützung bekommst, die dir guttut.",
    },
    {
      title: "Ruhige Atmosphäre zum Wohlfühlen",
      text: "Eine angenehme, entspannte Umgebung lädt dazu ein, den Alltag loszulassen, zur Ruhe zu kommen und neue Energie zu tanken.",
    },
    {
      title: "Zeit für dich und dein Wohlbefinden",
      text: "Ob kurze Auszeit oder intensive Regeneration – hier steht dein persönliches Wohlbefinden im Mittelpunkt.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-stone-800">
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#f7f3ec]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div>
            <p className="text-lg font-semibold tracking-[0.04em] text-stone-800">
              Christina Massage
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
              Hohenpeißenberg
            </p>
          </div>

          <nav className="hidden gap-8 text-sm text-stone-600 md:flex">
            <a href="#leistungen" className="transition hover:text-stone-900">
              Leistungen
            </a>
            <a href="#preise" className="transition hover:text-stone-900">
              Preise
            </a>
            <a href="#ueber" className="transition hover:text-stone-900">
              Über mich
            </a>
            <a href="#kontakt" className="transition hover:text-stone-900">
              Kontakt
            </a>
          </nav>

          <a
            href="#kontakt"
            className="rounded-full bg-stone-800 px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            Anrufen oder WhatsApp
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(152,169,132,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(205,184,155,0.24),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28">
          <div>
            <div className="inline-flex rounded-full border border-[#d8cfc2] bg-white/60 px-4 py-2 text-sm text-stone-600 backdrop-blur">
              Modern · Natürlich · Entspannend
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-stone-900 md:text-6xl">
              Ankommen. Loslassen. Wohlfühlen.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 md:text-xl">
              Individuelle Massagen in Hohenpeißenberg für Entspannung,
              Regeneration und ein neues Gefühl von Leichtigkeit im Alltag.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="rounded-full bg-stone-800 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-stone-300/30 transition hover:-translate-y-0.5"
              >
                Anrufen oder WhatsApp
              </a>

              <a
                href="#leistungen"
                className="rounded-full border border-stone-300 bg-white/70 px-6 py-3 text-sm font-medium text-stone-800 transition hover:bg-white"
              >
                Behandlungen ansehen
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white/70 p-4 text-sm text-stone-700 shadow-sm">
                Moderne, natürliche Atmosphäre
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white/70 p-4 text-sm text-stone-700 shadow-sm">
                Individuell abgestimmte Behandlungen
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white/70 p-4 text-sm text-stone-700 shadow-sm">
                30 oder 60 Minuten wählbar
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white/70 p-4 text-sm text-stone-700 shadow-sm">
                Ruhige Praxis in Hohenpeißenberg
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white/70 p-4 shadow-[0_30px_80px_rgba(120,100,80,0.12)] backdrop-blur">
            <div className="overflow-hidden rounded-[1.6rem] bg-[#efe7da]">
              <img
                src="/massage-hero.png"
                alt="Entspannende Massage in ruhiger Atmosphäre"
                className="h-[340px] w-full object-cover"
              />

              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  Ruhe & Regeneration
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-stone-900">
                  Natürliches Wohlbefinden
                </h2>

                <p className="mt-4 leading-8 text-stone-600">
                  Gönn dir eine bewusste Auszeit vom Alltag. In ruhiger
                  Atmosphäre kannst du abschalten, neue Energie tanken und
                  deinem Körper genau die Aufmerksamkeit schenken, die er
                  braucht.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
                    <div className="text-sm text-stone-500">30 Minuten</div>
                    <div className="mt-2 text-2xl font-semibold text-stone-900">
                      30 €
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
                    <div className="text-sm text-stone-500">60 Minuten</div>
                    <div className="mt-2 text-2xl font-semibold text-stone-900">
                      60 €
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-stone-300 p-5 text-sm leading-7 text-stone-600">
                  Jede Behandlung ist darauf ausgerichtet, dir spürbare
                  Entlastung, Ruhe und ein nachhaltiges Wohlgefühl zu schenken.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
            Was dich bei Christina Massage erwartet
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
            Ein Ort für Entspannung, Achtsamkeit und individuelles Wohlbefinden
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.8rem] border border-stone-200 bg-white/80 p-7 shadow-sm transition hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-stone-900">
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-stone-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="leistungen" className="bg-white/45 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              Behandlungen
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              Individuelle Massagen für Wohlbefinden und Balance
            </h2>

            <p className="mt-5 text-lg leading-8 text-stone-600">
              Jede Behandlung ist darauf ausgerichtet, Entspannung,
              Leichtigkeit und Regeneration in den Mittelpunkt zu stellen.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-[1.8rem] border border-stone-200 bg-[#fcfaf6] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="inline-flex rounded-full bg-[#e6ddcf] px-3 py-1 text-xs uppercase tracking-[0.18em] text-stone-600">
                  Behandlung
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-stone-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-stone-600">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="preise" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              Preise
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-stone-900">
              Preise für deine Auszeit
            </h2>

            <p className="mt-4 leading-8 text-stone-600">
              Wähle die Behandlungsdauer, die am besten zu dir und deinen
              Bedürfnissen passt.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-stone-800 p-8 text-white shadow-sm">
              <div className="text-sm uppercase tracking-[0.28em] text-stone-300">
                30 Minuten
              </div>
              <div className="mt-4 text-4xl font-semibold">30 €</div>
              <p className="mt-4 leading-7 text-stone-300">
                Ideal für gezielte Anwendungen und kürzere Entspannungsphasen.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#9eab8d] p-8 text-stone-900 shadow-sm">
              <div className="text-sm uppercase tracking-[0.28em] text-stone-700">
                60 Minuten
              </div>
              <div className="mt-4 text-4xl font-semibold">60 €</div>
              <p className="mt-4 leading-7 text-stone-800">
                Perfekt für tiefere Regeneration und eine spürbare Auszeit vom
                Alltag.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="ueber" className="bg-[#efe7da] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              Über mich
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              Persönlich, achtsam und mit Gefühl für Ruhe
            </h2>
          </div>

          <div className="rounded-[2rem] bg-white/70 p-8 leading-8 text-stone-700 shadow-sm">
            Bei Christina Massage stehen Wohlbefinden, Achtsamkeit und eine
            angenehme Atmosphäre im Mittelpunkt. Jede Behandlung wird
            individuell abgestimmt, damit du dich vom ersten Moment an gut
            aufgehoben fühlst. Ziel ist es, dir einen Ort zu bieten, an dem du
            loslassen, regenerieren und neue Energie sammeln kannst.
          </div>
        </div>
      </section>

      <section id="kontakt" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
              Kontakt
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-stone-900 md:text-5xl">
              Anrufen oder WhatsApp
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
              Du möchtest eine Massage buchen oder hast Fragen zu einer
              Behandlung? Melde dich gerne telefonisch oder per WhatsApp.
            </p>

            <div className="mt-8 space-y-4 text-stone-700">
              <p>📍 Hohenpeißenberg</p>
              <p>📞 0172 2664648</p>
              <p>⏱ 30 Minuten – 30 € · 60 Minuten – 60 €</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-sm">
            <div className="text-sm uppercase tracking-[0.28em] text-stone-500">
              Schneller Kontakt
            </div>

            <h3 className="mt-3 text-2xl font-semibold text-stone-900">
              Direkt anfragen
            </h3>

            <p className="mt-4 leading-7 text-stone-600">
              Für eine schnelle Terminvereinbarung kannst du Christina Massage
              direkt anrufen oder per WhatsApp schreiben.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:01722664648"
                className="inline-block rounded-full bg-stone-800 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
              >
                Anrufen
              </a>

              <a
                href="https://wa.me/491722664648"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition hover:-translate-y-0.5"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white/50 px-6 py-8 text-sm text-stone-500 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Christina Massage</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-800">
              Impressum
            </a>
            <a href="#" className="hover:text-stone-800">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}