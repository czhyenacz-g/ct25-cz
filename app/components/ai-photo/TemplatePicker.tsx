"use client";

import { useId } from "react";
import Image from "next/image";
import { photoTemplates, TemplateId } from "../../lib/ai-photo-templates";

/**
 * Dvě velké klikatelné karty jako přístupná radio-group (skutečný
 * <input type="radio"> na kartu, jen vizuálně skrytý — klávesnice, čtečky
 * obrazovky i nativní chování fungují beze změny). Zvětšení/zvýraznění při
 * výběru jde přes transform/ring (box-shadow), takže nerozhazuje layout,
 * a respektuje prefers-reduced-motion přes motion-reduce:.
 *
 * Řízená komponenta (value/onChange) — výběr potřebuje znát i
 * AiFotkaSelector kvůli předvyplnění mailto odkazu v sekci podpory.
 */
export default function TemplatePicker({
  value,
  onChange,
}: {
  value: TemplateId | null;
  onChange: (id: TemplateId) => void;
}) {
  const groupName = useId();

  return (
    <fieldset>
      <legend className="text-lg font-bold text-white">Vyberte scénu</legend>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {photoTemplates.map((template) => {
          const isSelected = value === template.id;

          return (
            <label
              key={template.id}
              className={`block cursor-pointer rounded-lg border p-3 transition-colors motion-reduce:transition-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-ink ${
                isSelected ? "border-accent bg-surface" : "border-line bg-surface hover:border-accent/50"
              }`}
            >
              <input
                type="radio"
                name={groupName}
                value={template.id}
                checked={isSelected}
                onChange={() => onChange(template.id)}
                className="sr-only"
              />
              <div
                className={`overflow-hidden rounded-md transition-transform duration-200 motion-reduce:transition-none motion-reduce:transform-none ${
                  isSelected ? "scale-[1.02] ring-2 ring-accent ring-offset-2 ring-offset-surface" : ""
                }`}
              >
                <Image
                  src={template.imageUrl}
                  alt={template.alt}
                  width={template.width}
                  height={template.height}
                  sizes="(max-width: 640px) 100vw, 480px"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-3 text-center font-semibold text-white">{template.label}</p>
              <p className="mt-1 text-center text-xs font-medium text-accent" aria-hidden={!isSelected}>
                {isSelected ? "Vybráno" : " "}
              </p>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
