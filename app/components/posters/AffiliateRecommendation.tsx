// Jeden konkrétní kontextový affiliate tip (ne obecný reklamní systém) —
// Dognet URL je definovaná jen tady, na jednom místě.
const ALLEGRO_A4_LABELS_URL =
  "https://go.dognet.com/?chid=CKj2CJ89&d1=ct25&d2=posters_allegro_a4_labels&url=https%3A%2F%2Fallegro.cz%2Fnabidka%2Fsamolepici-etikety-a4-210x297-mm-samolepky-bile-pro-tiskarnu-100ark-16431979414";

export default function AffiliateRecommendation() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="rounded-lg border border-line border-l-4 border-l-accent bg-surface p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Partnerský odkaz</p>
        <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
          Už víte, na co budete nálepky tisknout?
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-gray-300 sm:text-base">
          Můj tip: Tyhle samolepicí A4 archy by se na to mohly hodit.
        </p>
        <a
          href={ALLEGRO_A4_LABELS_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-ink hover:brightness-110 sm:text-base"
        >
          Zobrazit na Allegro
        </a>
      </div>
    </div>
  );
}
