import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'legal' | 'privacy' | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { language } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    return () => {
      if (iframeRef.current) iframeRef.current.src = 'about:blank';
    };
  }, []);

  if (!isOpen || !type) return null;

  const getFileName = () => {
    const fileName = type === 'legal'
      ? (language === 'fr' ? 'mentions-legales.html' : 'mentions-legales-en.html')
      : (language === 'fr' ? 'politique-confidentialite.html' : 'politique-confidentialite-en.html');
    const isNative = Capacitor.isNativePlatform();
    return isNative ? `./${fileName}` : `/${fileName}`;
  };

  const title = type === 'legal'
    ? (language === 'fr' ? 'Mentions Légales' : 'Legal Notice')
    : (language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy');

  return (
    <>
      {/* z-[500] — au-dessus du drawer (z-201) et de RestorePremiumModal (z-500 même niveau) */}
      <div
        className="fixed inset-0 bg-black/80 z-[500]"
        style={{backdropFilter:'blur(8px)'}}
        onClick={onClose}
      />
      <div className="fixed inset-4 md:inset-10 z-[501] rounded-sm overflow-hidden shadow-2xl"
        style={{border:'1px solid rgba(201,168,76,0.2)', background:'#080514'}}>

        {/* Header dark luxury */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 18px',
          borderBottom:'1px solid rgba(255,255,255,0.06)',
          background:'rgba(5,3,14,0.95)',
        }}>
          <span style={{
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize:'15px', fontWeight:300, fontStyle:'italic',
            color:'#E8D080', letterSpacing:'0.3px',
          }}>{title}</span>

          <button onClick={onClose} style={{
            width:28, height:28, borderRadius:6,
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.07)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', color:'rgba(247,242,234,0.5)',
            transition:'all 0.2s',
          }}
            onMouseEnter={e=>(e.currentTarget.style.color='rgba(247,242,234,0.9)')}
            onMouseLeave={e=>(e.currentTarget.style.color='rgba(247,242,234,0.5)')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Iframe */}
        <div style={{height:'calc(100% - 57px)', background:'#fff'}}>
          <iframe
            ref={iframeRef}
            src={getFileName()}
            style={{width:'100%', height:'100%', border:'none'}}
            title={title}
            sandbox="allow-same-origin allow-scripts"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}