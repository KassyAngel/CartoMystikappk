import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LegalMenu() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="p-2 rounded-full bg-purple-600/80 hover:bg-purple-700/90 backdrop-blur-sm transition-colors shadow-lg"
        aria-label={t("legal.menu.title")}
      >
        <svg 
          className="w-6 h-6 text-white" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {open && (
        <>
          {/* Overlay pour fermer en cliquant à l'extérieur */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)}
          />

          {/* Menu dropdown */}
          <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl bg-white/95 backdrop-blur-sm ring-1 ring-black/10 z-50 overflow-hidden">
            <a
              href="/mentions-legales.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors border-b border-gray-100"
            >
              📜 {t("legal.mentions")}
            </a>
            <a
              href="/politique-confidentialite.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
            >
              🔒 {t("legal.privacy")}
            </a>
          </div>
        </>
      )}
    </div>
  );
}