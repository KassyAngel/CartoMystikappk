import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Une fois ton image Leonardo prête :
const BUTTON_IMG = "/Image/nos-apps-btn.webp";
//const BUTTON_IMG: string | null = null;

const APPS = [
  {
    name: "TaroMystik",
    img: "/Image/apps/taromystik.webp",
    url: "https://play.google.com/store/apps/details?id=com.tarotmystik.app",
    desc: { fr: "Tirage de tarot", en: "Tarot readings" },
  },
  {
    name: "Affirmations+",
    img: "/Image/apps/affirmation-positive.webp",
    url: "https://play.google.com/store/apps/details?id=com.kcdev.affirmationspositives",
    desc: { fr: "Affirmations positives", en: "Positive affirmations" },
  },
  {
    name: "Rêves & Rituels",
    img: "/Image/apps/revesetrituels.webp",
    url: "https://play.google.com/store/apps/details?id=com.revesrituels.app",
    desc: { fr: "Rêves & rituels", en: "Dreams & rituals" },
  },
  {
    name: "Heures miroirs & Signes",
    img: "/Image/apps/heuresmiroirs.webp",
    url: "https://play.google.com/store/apps/details?id=com.heuresmiroirs.app",
    desc: { fr: "Heures miroirs & Signes", en: "Mirror Hours & Signs" },
  },
  {
    name: "AstralChat",
    img: "/Image/apps/Astralchat.webp",
    url: "https://play.google.com/store/apps/details?id=com.kcevent.astralchat",
    desc: { fr: "Voyance & Tarot", en: "Psychic readings & Tarot" },
  },
  {
    name: "NuméroMystik",
    img: "/Image/apps/numerologie.webp",
    url: "https://play.google.com/store/apps/details?id=com.kcdev.numeromystik",
    desc: {
      fr: "Numérologie, Pierres & Chakras",
      en: "Numerology, Stones & Chakras",
          },
    accent: "rgba(147,51,234,0.15)",
  },
];

export default function OtherAppsButton() {
  const { t, language } = useLanguage();
  const lang = language === "en" ? "en" : "fr";
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" style={{ zIndex: 20 }}>

      {/* ── Bouton forme carte tarot ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        aria-label={lang === "fr" ? "Nos autres apps" : "Our other apps"}
        style={{
          width: 36,
          height: 52,
          borderRadius: 6,
          background: "rgba(8,4,20,0.88)",
          border: "1px solid rgba(201,168,76,0.55)",
          boxShadow: "0 0 12px rgba(201,168,76,0.18), 0 2px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Coin décoratif haut-gauche */}
        <span style={{
          position: "absolute", top: 3, left: 3,
          width: 5, height: 5,
          borderTop: "1px solid rgba(201,168,76,0.5)",
          borderLeft: "1px solid rgba(201,168,76,0.5)",
          borderRadius: "1px 0 0 0",
        }} />
        {/* Coin décoratif bas-droite */}
        <span style={{
          position: "absolute", bottom: 3, right: 3,
          width: 5, height: 5,
          borderBottom: "1px solid rgba(201,168,76,0.5)",
          borderRight: "1px solid rgba(201,168,76,0.5)",
          borderRadius: "0 0 1px 0",
        }} />

        {BUTTON_IMG ? (
          <img src={BUTTON_IMG} alt="nos apps" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 5 }} />
        ) : (
          <>
            {/* Étoile à 8 branches SVG */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L8.2 5.5H13L9.4 8.1L10.6 12.5L7 10L3.4 12.5L4.6 8.1L1 5.5H5.8L7 1Z"
                fill="url(#starGold)"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="starGold" x1="1" y1="1" x2="13" y2="13" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F0D98A" />
                  <stop offset="100%" stopColor="#C9A84C" />
                </linearGradient>
              </defs>
            </svg>
            {/* Trois petits tirets = "menu" mystique */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[10, 7, 10].map((w, i) => (
                <div key={i} style={{
                  width: w, height: 1,
                  background: "rgba(201,168,76,0.55)",
                  borderRadius: 1,
                  alignSelf: "center",
                }} />
              ))}
            </div>
          </>
        )}
      </motion.button>

      {/* ── Popup ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 40,
                background: "rgba(4,2,12,0.65)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
            />

            {/* Carte popup dark/doré */}
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.92, y: -8, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ type: "spring", damping: 26, stiffness: 340 }}
              style={{
                position: "absolute",
                top: 60,
                right: 0,
                zIndex: 50,
                width: 240,
                borderRadius: 14,
                padding: 16,
                background: "rgba(8,4,20,0.97)",
                border: "1px solid rgba(201,168,76,0.28)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 24px rgba(201,168,76,0.06)",
              }}
            >
              {/* Ligne déco haut */}
              <div style={{
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
                marginBottom: 12,
              }} />

              {/* En-tête */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <p style={{
                    fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(201,168,76,0.7)", fontFamily: "Playfair Display, serif",
                    marginBottom: 3,
                  }}>
                    {lang === "fr" ? "Notre univers" : "Our universe"}
                  </p>
                  <p style={{
                    fontSize: 13, fontFamily: "Playfair Display, serif",
                    fontWeight: 400, color: "#F7F2EA",
                  }}>
                    {lang === "fr" ? "Nos autres apps" : "Our other apps"}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", flexShrink: 0,
                  }}
                >
                  <X size={11} style={{ color: "rgba(255,255,255,0.45)" }} />
                </button>
              </div>

              {/* Séparateur doré */}
              <div style={{
                height: 1,
                background: "linear-gradient(90deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08), transparent)",
                marginBottom: 10,
              }} />

              {/* Liste apps */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {APPS.map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 10px", borderRadius: 10,
                      background: "rgba(255,255,255,0.035)",
                      border: "1px solid rgba(201,168,76,0.10)",
                      textDecoration: "none",
                      transition: "all 0.22s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(201,168,76,0.07)";
                      e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.035)";
                      e.currentTarget.style.borderColor = "rgba(201,168,76,0.10)";
                    }}
                  >
                    {/* Icône app — forme carte */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 8, overflow: "hidden", flexShrink: 0,
                      border: "1px solid rgba(201,168,76,0.20)",
                    }}>
                      <img src={app.img} alt={app.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    {/* Texte */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: 12, fontFamily: "Playfair Display, serif",
                        color: "#F7F2EA", lineHeight: 1.2,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {app.name}
                      </p>
                      <p style={{
                        fontSize: 10, color: "rgba(201,168,76,0.55)",
                        marginTop: 2, fontStyle: "italic",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {app.desc[lang]}
                      </p>
                    </div>

                    {/* Flèche */}
                    <span style={{ fontSize: 14, color: "rgba(201,168,76,0.45)", lineHeight: 1, flexShrink: 0 }}>›</span>
                  </a>
                ))}
              </div>

              {/* Ligne déco bas + badge */}
              <div style={{
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
                margin: "12px 0 8px",
              }} />
              <p style={{
                textAlign: "center", fontSize: 8,
                fontFamily: "Playfair Display, serif",
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "rgba(201,168,76,0.3)",
              }}>
                KcDev
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}