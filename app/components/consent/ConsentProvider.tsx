"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  ConsentState,
  DEFAULT_CONSENT,
  acceptAllConsent,
  readStoredConsent,
  rejectAllConsent,
  writeStoredConsent,
} from "../../lib/consent";

interface ConsentContextValue {
  consent: ConsentState;
  /** null = ještě nerozhodnuto (zobrazit lištu), jinak uložená volba */
  hasDecided: boolean;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePartial: (partial: Pick<ConsentState, "analytics" | "marketing">) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [hasDecided, setHasDecided] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setConsent(stored);
      setHasDecided(true);
    }
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      hasDecided,
      isSettingsOpen,
      openSettings: () => setIsSettingsOpen(true),
      closeSettings: () => setIsSettingsOpen(false),
      acceptAll: () => {
        const next = acceptAllConsent();
        setConsent(next);
        setHasDecided(true);
        setIsSettingsOpen(false);
        writeStoredConsent(next);
      },
      rejectAll: () => {
        const next = rejectAllConsent();
        setConsent(next);
        setHasDecided(true);
        setIsSettingsOpen(false);
        writeStoredConsent(next);
      },
      savePartial: (partial) => {
        const next: ConsentState = {
          necessary: true,
          analytics: partial.analytics,
          marketing: partial.marketing,
          decidedAt: new Date().toISOString(),
        };
        setConsent(next);
        setHasDecided(true);
        setIsSettingsOpen(false);
        writeStoredConsent(next);
      },
    }),
    [consent, hasDecided, isSettingsOpen],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent musí být použit uvnitř ConsentProvider");
  return ctx;
}
