"use client";

import { useState } from "react";
import TemplatePicker from "./TemplatePicker";
import SupporterSection from "./SupporterSection";
import { TemplateId } from "../../lib/ai-photo-templates";

/**
 * Sdílí vybranou předlohu mezi TemplatePicker (výběr) a SupporterSection
 * (předvyplnění mailto odkazu) — proto jeden společný client wrapper místo
 * dvou nezávislých komponent.
 */
export default function AiFotkaSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(null);

  return (
    <>
      <TemplatePicker value={selectedTemplate} onChange={setSelectedTemplate} />
      <SupporterSection selectedTemplate={selectedTemplate} />
    </>
  );
}
