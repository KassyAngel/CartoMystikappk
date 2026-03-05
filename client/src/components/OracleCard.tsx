import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OracleCardProps {
  title: string;
  description: string;
  icon?: string;
  useImage?: boolean;
  imageSrc?: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

// Couleurs d'accent par type d'oracle — toutes dans la palette dark luxury
const ORACLE_ACCENTS: Record<string, { hue: string; rgb: string }> = {
  jour:      { hue: '#C9A84C', rgb: '201,168,76' },   // or
  tarot:     { hue: '#A87FC9', rgb: '168,127,201' },   // améthyste douce
  anges:     { hue: '#7FA8C9', rgb: '127,168,201' },   // bleu ciel pâle
  horoscope: { hue: '#C97FA8', rgb: '201,127,168' },   // rose poudré
  cristal:   { hue: '#7FC9A8', rgb: '127,201,168' },   // jade doux
  default:   { hue: '#C9A84C', rgb: '201,168,76' },
};

function getAccent(title: string) {
  const t = title.toLowerCase();
  if (t.includes('jour') || t.includes('daily')) return ORACLE_ACCENTS.jour;
  if (t.includes('tarot')) return ORACLE_ACCENTS.tarot;
  if (t.includes('ange')) return ORACLE_ACCENTS.anges;
  if (t.includes('horoscope') || t.includes('zodiaque')) return ORACLE_ACCENTS.horoscope;
  if (t.includes('cristal') || t.includes('rune')) return ORACLE_ACCENTS.cristal;
  return ORACLE_ACCENTS.default;
}

export default function OracleCard({ 
  title, description, icon, useImage, imageSrc,
  isSelected, onClick, className
}: OracleCardProps) {
  const [hovered, setHovered] = useState(false);
  const accent = getAccent(title);

  return (
    <div
      className={cn('oc-card', isSelected && 'oc-selected', className)}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        '--accent': accent.hue,
        '--accent-rgb': accent.rgb,
      } as any}
      data-testid={`oracle-${title.toLowerCase().replace(/\s+/g,'-')}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

        .oc-card {
          position: relative;
          width: 100%;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          -webkit-tap-highlight-color: transparent;
          font-family: 'Jost', sans-serif;
        }
        .oc-card:hover {
          border-color: rgba(var(--accent-rgb), 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 24px rgba(var(--accent-rgb),0.08);
        }
        .oc-card:active { transform: translateY(0) scale(0.99); }
        .oc-selected {
          border-color: rgba(var(--accent-rgb), 0.55) !important;
          background: rgba(var(--accent-rgb), 0.06) !important;
          box-shadow: 0 0 32px rgba(var(--accent-rgb),0.12) !important;
        }

        /* Shimmer au hover */
        .oc-shimmer {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0s;
        }
        .oc-card:hover .oc-shimmer {
          transform: translateX(100%);
          transition: transform 0.7s ease;
        }

        /* Indicateur latéral actif */
        .oc-indicator {
          position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          width: 2px; height: 0; background: var(--accent);
          border-radius: 0 2px 2px 0;
          transition: height 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .oc-selected .oc-indicator { height: 55%; }

        /* Corps */
        .oc-body {
          display: flex; align-items: center;
          padding: 18px 18px 18px 20px; gap: 16px;
          min-height: 88px;
        }

        /* Icône */
        .oc-icon-wrap {
          width: 48px; height: 48px; border-radius: 10px; flex-shrink: 0;
          background: rgba(var(--accent-rgb),0.08);
          border: 1px solid rgba(var(--accent-rgb),0.15);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .oc-card:hover .oc-icon-wrap {
          background: rgba(var(--accent-rgb),0.13);
          border-color: rgba(var(--accent-rgb),0.3);
          transform: scale(1.05);
        }
        .oc-icon-text { font-size: 22px; line-height: 1; }
        .oc-icon-img { width: 100%; height: 100%; object-fit: cover; }

        /* Textes */
        .oc-texts { flex: 1; min-width: 0; }
        .oc-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 16px; font-weight: 400; letter-spacing: 0.2px;
          color: #F7F2EA; margin-bottom: 4px; line-height: 1.2;
          transition: color 0.3s;
        }
        .oc-selected .oc-title { color: var(--accent); }
        .oc-desc {
          font-size: 12px; font-weight: 200; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.48); line-height: 1.55;
          transition: color 0.3s;
        }
        .oc-card:hover .oc-desc { color: rgba(247,242,234,0.65); }

        /* Check sélection */
        .oc-check {
          width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid rgba(var(--accent-rgb),0.4);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.6);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .oc-selected .oc-check {
          opacity: 1; transform: scale(1);
          border-color: var(--accent);
          background: rgba(var(--accent-rgb),0.1);
          box-shadow: 0 0 8px rgba(var(--accent-rgb),0.3);
        }
        .oc-check-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
        }
      `}</style>

      <div className="oc-indicator"/>
      <div className="oc-shimmer"/>

      <div className="oc-body">
        <div className="oc-icon-wrap">
          {useImage && imageSrc ? (
            <img src={imageSrc} alt={title} className="oc-icon-img"
              style={{ filter: 'brightness(1.05) contrast(1.05)' }}
            />
          ) : (
            <span className="oc-icon-text">{icon || '✦'}</span>
          )}
        </div>

        <div className="oc-texts">
          <div className="oc-title">{title}</div>
          <div className="oc-desc">{description}</div>
        </div>

        <div className="oc-check">
          <div className="oc-check-dot"/>
        </div>
      </div>
    </div>
  );
}