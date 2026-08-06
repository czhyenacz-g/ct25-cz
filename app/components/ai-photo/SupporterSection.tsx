import { photoTemplates, TemplateId } from "../../lib/ai-photo-templates";
import { buildSupporterMailtoHref, SUPPORTER_CONTACT_EMAIL, SUPPORTER_CONTACT_NAME } from "../../lib/supporter-mailto";

/**
 * Dobrovolná podpora — žádný veřejný formulář, žádný upload, žádná platba.
 * Jen mailto: odkaz, ručně domlouváno e-mailem. Vybraná scéna (pokud je)
 * se předvyplní do těla zprávy.
 */
export default function SupporterSection({ selectedTemplate }: { selectedTemplate: TemplateId | null }) {
  const selectedLabel = photoTemplates.find((t) => t.id === selectedTemplate)?.label ?? null;
  const mailtoHref = buildSupporterMailtoHref(selectedLabel);

  return (
    <section className="mt-8 rounded-lg border border-line bg-surface p-5">
      <h2 className="text-lg font-bold text-white">Chcete vlastní fotomontáž?</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-300">
        Automatické generování ještě připravujeme. Zájemcům, kteří dobrovolně podpoří provoz tohoto
        webu, může autor stránek zatím vytvořit podobnou fotomontáž ručně. Napište, jakou scénu jste
        si vybrali, a domluvíme další postup.
      </p>
      <p className="mt-3 text-xs text-gray-500">
        Jde o dobrovolnou podporu provozu webu, ne o placenou objednávku ani garantovaný okamžitý
        nárok — požadavky se zpracovávají ručně a podle dostupné kapacity, podrobnosti domluvíme
        e-mailem.
      </p>
      <p className="mt-3 text-sm text-gray-400">
        Kontakt: {SUPPORTER_CONTACT_NAME} ·{" "}
        <a href={`mailto:${SUPPORTER_CONTACT_EMAIL}`} className="text-accent underline hover:brightness-110">
          {SUPPORTER_CONTACT_EMAIL}
        </a>
      </p>
      <a
        href={mailtoHref}
        className="mt-4 inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink hover:brightness-110"
      >
        Mám zájem o vlastní fotomontáž
      </a>
    </section>
  );
}
