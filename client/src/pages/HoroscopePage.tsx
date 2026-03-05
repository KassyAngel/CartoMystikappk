import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserSession } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { config } from '@/config';
import { showInterstitialAd } from '@/admobService';
import Prediction100Days from '@/components/Prediction100Days';

interface HoroscopePageProps {
  user: UserSession;
  onBack: () => void;
  onHome: () => void;
  onSaveReading?: (reading: any) => Promise<void>;
  isPremium?: boolean;
}

interface HoroscopeData {
  sign: string;
  date: string;
  description: string;
  mood: string;
  luckyNumber: string;
  luckyColor: string;
  compatibility: string;
  currentDate: string;
  love?: string;
  work?: string;
  finances?: string;
  health?: string;
  advice?: string;
}

const signMapping: Record<string, string> = {
  'Bélier': 'aries', 'Taureau': 'taurus', 'Gémeaux': 'gemini',
  'Cancer': 'cancer', 'Lion': 'leo', 'Vierge': 'virgo',
  'Balance': 'libra', 'Scorpion': 'scorpio', 'Sagittaire': 'sagittarius',
  'Capricorne': 'capricorn', 'Verseau': 'aquarius', 'Poissons': 'pisces'
};

// ✅ Streak conservé indéfiniment
const updateStreak = (): number => {
  const lastVisit = localStorage.getItem('horoscope_last_visit');
  const today = new Date();
  const todayString = today.toDateString();
  const currentStreak = parseInt(localStorage.getItem('horoscope_streak') || '0');
  if (!lastVisit) {
    localStorage.setItem('horoscope_last_visit', todayString);
    localStorage.setItem('horoscope_streak', '1');
    return 1;
  }
  const daysDiff = Math.floor((today.getTime() - new Date(lastVisit).getTime()) / 86400000);
  if (daysDiff === 0) return currentStreak;
  if (daysDiff === 1) {
    const n = currentStreak + 1;
    localStorage.setItem('horoscope_last_visit', todayString);
    localStorage.setItem('horoscope_streak', n.toString());
    return n;
  }
  // Absence > 1j : on conserve, on remet juste la date
  localStorage.setItem('horoscope_last_visit', todayString);
  return currentStreak;
};

const getXP = (): number => parseInt(localStorage.getItem('horoscope_xp') || '0');
const addXP = (pts: number): number => { const n = getXP() + pts; localStorage.setItem('horoscope_xp', n.toString()); return n; };
const getLevel = (xp: number): number => Math.floor(xp / 100) + 1;

const getBadges = (streak: number, t: (k: string) => string) => [
  { id:1, icon:'🔥', label:t('horoscope.badges.days7'),   unlocked: streak >= 7   },
  { id:2, icon:'⭐', label:t('horoscope.badges.days15'),  unlocked: streak >= 15  },
  { id:3, icon:'💎', label:t('horoscope.badges.days30'),  unlocked: streak >= 30  },
  { id:4, icon:'👑', label:t('horoscope.badges.days100'), unlocked: streak >= 100 },
];

const genLucky = (name: string, date: string, sign: string): string => {
  const seed = `${name}-${date}-${sign}`; let h = 0;
  for (let i = 0; i < seed.length; i++) { h = ((h << 5) - h) + seed.charCodeAt(i); h = h & h; }
  return String(Math.abs(h % 50) + 1);
};

const stableVar = (sign: string, cat: 'descriptions'|'love'|'work'|'finances'|'health'|'advice', date: string, t: (k: string) => string): string => {
  const counts: Record<string,number> = { descriptions:15, love:8, work:8, finances:8, health:8, advice:5 };
  const seed = `${sign}-${cat}-${date}`; let h = 0;
  for (let i = 0; i < seed.length; i++) { h = ((h << 5) - h) + seed.charCodeAt(i); h = h & h; }
  const k = `horoscope.data.${cat}.${sign}.${Math.abs(h) % counts[cat]}`;
  const v = t(k); return v !== k ? v : t(`horoscope.data.${cat}.fallback`) || 'Contenu non disponible';
};

// ✅ FIX dates multilingues : on génère la date via Intl selon la langue active
const SIGN_DATE_RANGES: Record<string, { startMonth: number; startDay: number; endMonth: number; endDay: number }> = {
  aries:       { startMonth:3,  startDay:21, endMonth:4,  endDay:19 },
  taurus:      { startMonth:4,  startDay:20, endMonth:5,  endDay:20 },
  gemini:      { startMonth:5,  startDay:21, endMonth:6,  endDay:20 },
  cancer:      { startMonth:6,  startDay:21, endMonth:7,  endDay:22 },
  leo:         { startMonth:7,  startDay:23, endMonth:8,  endDay:22 },
  virgo:       { startMonth:8,  startDay:23, endMonth:9,  endDay:22 },
  libra:       { startMonth:9,  startDay:23, endMonth:10, endDay:22 },
  scorpio:     { startMonth:10, startDay:23, endMonth:11, endDay:21 },
  sagittarius: { startMonth:11, startDay:22, endMonth:12, endDay:21 },
  capricorn:   { startMonth:12, startDay:22, endMonth:1,  endDay:19 },
  aquarius:    { startMonth:1,  startDay:20, endMonth:2,  endDay:18 },
  pisces:      { startMonth:2,  startDay:19, endMonth:3,  endDay:20 },
};

const LANG_LOCALE: Record<string, string> = {
  fr:'fr-FR', en:'en-US', es:'es-ES', de:'de-DE', it:'it-IT',
};

const getLocalizedDateRange = (sign: string, lang: string): string => {
  const range = SIGN_DATE_RANGES[sign];
  if (!range) return '';
  const locale = LANG_LOCALE[lang] || 'fr-FR';
  const year = 2000; // année fictive, seuls mois+jour comptent
  const fmt = (m: number, d: number) => new Date(year, m-1, d).toLocaleDateString(locale, { day:'numeric', month:'long' });
  return `${fmt(range.startMonth, range.startDay)} – ${fmt(range.endMonth, range.endDay)}`;
};

const trHoro = (h: HoroscopeData, sign: string, t: (k: string) => string, lang?: string) => {
  const tr = (p: string, v: string) => { const k = `horoscope.data.${p}.${v}`; return t(k) !== k ? t(k) : v; };
  const localizedDate = lang ? getLocalizedDateRange(sign, lang) : '';
  const dk = `horoscope.data.dates.${sign}`;
  const fallbackDate = t(dk) !== dk ? t(dk) : h?.date||'';
  return { ...h, mood: tr('moods',h?.mood), luckyColor: tr('colors',h?.luckyColor), compatibility: tr('compatibility',h?.compatibility), date: localizedDate || fallbackDate };
};

const stableMsg = (prefix: string, val: string, date: string, count: number, t: (k: string, v?: any) => string): string => {
  const seed = `${prefix}-${date}`; let h = 0;
  for (let i = 0; i < seed.length; i++) { h = ((h << 5) - h) + seed.charCodeAt(i); h = h & h; }
  return t(`horoscope.${prefix}.var${(Math.abs(h) % count) + 1}`, { [prefix]: val });
};

export default function HoroscopePage({ user, onBack, onSaveReading, isPremium = false }: HoroscopePageProps) {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [openSections, setOpenSections] = useState<number[]>([0]);
  const [_openedSectionsHistory, setOpenedSectionsHistory] = useState<Set<number>>(new Set([0]));
  const [hasSavedReading, setHasSavedReading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sectionOpenCount, setSectionOpenCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXP] = useState(0);
  const [showXPGain, setShowXPGain] = useState(false);
  const [xpGainAmount, setXPGainAmount] = useState(0);
  const [show100Reward, setShow100Reward] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [showPrediction100, setShowPrediction100] = useState(false);
  const [debugTapCount, setDebugTapCount] = useState(0);
  const [showDebugMenu, setShowDebugMenu] = useState(false);

  const englishSign = user.zodiacSign ? signMapping[user.zodiacSign.name] : 'aries';

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  useEffect(() => { if (debugTapCount === 3) { setShowDebugMenu(true); setDebugTapCount(0); } }, [debugTapCount]);
  useEffect(() => {
    const s = updateStreak(); setStreak(s); setXP(getXP());
    if (s > 0 && s % 100 === 0) { const k = `reward_${s}_shown`; if (!localStorage.getItem(k)) setTimeout(() => { setShow100Reward(true); localStorage.setItem(k,'true'); }, 2000); }
  }, []);

  const handleLogoTap = () => { setDebugTapCount(p => p + 1); setTimeout(() => setDebugTapCount(0), 2000); };

  const dbgReset = () => { if(confirm('Réinitialiser ?')){ ['horoscope_streak','horoscope_last_visit','horoscope_xp'].forEach(k=>localStorage.removeItem(k)); Object.keys(localStorage).forEach(k=>{ if(k.startsWith('horoscope_consulted_')||k.startsWith('horoscope_explored_')||k.startsWith('reward_')) localStorage.removeItem(k); }); setShowDebugMenu(false); window.location.reload(); }};

  const { data: horoscope, isLoading, isFetching, error, refetch } = useQuery<HoroscopeData>({
    queryKey: ['horoscope', englishSign],
    queryFn: async () => {
      setErrorMessage(null);
      const ctrl = new AbortController(); const tid = setTimeout(() => ctrl.abort(), 60000);
      try {
        const res = await fetch(`${config.apiBaseUrl}/api/horoscope/${englishSign}`, { method:'GET', headers:{'Content-Type':'application/json'}, credentials:'include', signal:ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const dk = `horoscope_consulted_${new Date().toDateString()}`;
        if (!localStorage.getItem(dk)) {
          const ol = getLevel(getXP()); const nx = addXP(10); const nl = getLevel(nx);
          setXP(nx); setXPGainAmount(10); setShowXPGain(true); localStorage.setItem(dk,'true');
          setTimeout(() => setShowXPGain(false), 2000);
          if (nl > ol) setTimeout(() => { setNewLevel(nl); setShowLevelUp(true); setTimeout(() => setShowLevelUp(false), 3000); }, 2500);
        }
        return data;
      } catch(e: any) {
        setErrorMessage(e.name === 'AbortError' ? t('horoscope.errors.timeout') : t('horoscope.errors.fetchFailed'));
        throw e;
      } finally { clearTimeout(tid); }
    },
    enabled: !!user.zodiacSign,
  });

  useEffect(() => {
    if (horoscope && !hasSavedReading && onSaveReading) {
      (async () => { try { const {sign:_s, ...horoscopeRest} = horoscope; await onSaveReading({ type:'horoscope', answer:JSON.stringify({sign:englishSign,...horoscopeRest,luckyNumber:genLucky(user.name,horoscope.currentDate,englishSign)}), date:new Date() }); setHasSavedReading(true); } catch(e){} })();
    }
  }, [horoscope,hasSavedReading,onSaveReading,englishSign,user.name]);

  const handleSectionOpen = async (title: string, index: number) => {
    if (isPremium) return;
    setOpenedSectionsHistory(prev => {
      const s = new Set(prev); s.add(index);
      if (s.size === 8) { const k = `horoscope_explored_${new Date().toDateString()}`; if (!localStorage.getItem(k)) { const ol=getLevel(getXP()); const nx=addXP(5); const nl=getLevel(nx); setXP(nx); setXPGainAmount(5); setShowXPGain(true); localStorage.setItem(k,'true'); setTimeout(()=>setShowXPGain(false),2000); if(nl>ol) setTimeout(()=>{ setNewLevel(nl); setShowLevelUp(true); setTimeout(()=>setShowLevelUp(false),3000); },2500); }}
      return s;
    });
    const nc = sectionOpenCount + 1; setSectionOpenCount(nc);
    if (nc === 2) setTimeout(async () => { try { await showInterstitialAd(`horoscope_section_${title}`); } catch(e){} }, 300);
  };

  const horoscopeSections = useMemo(() => {
    if (!horoscope || !user.zodiacSign) return { sections:[], personalLuckyNumber:'' };
    const th = trHoro(horoscope, englishSign, t, language);
    const ln = genLucky(user.name, horoscope.currentDate, englishSign);
    return {
      personalLuckyNumber: ln,
      sections: [
        { icon:'🔮', title:t('horoscope.predictions.title'), content:stableVar(englishSign,'descriptions',horoscope.currentDate,t) },
        { icon:'💕', title:t('horoscope.love.title'),        content:stableVar(englishSign,'love',horoscope.currentDate,t) },
        { icon:'💼', title:t('horoscope.work.title'),        content:stableVar(englishSign,'work',horoscope.currentDate,t) },
        { icon:'💰', title:t('horoscope.finances.title'),    content:stableVar(englishSign,'finances',horoscope.currentDate,t) },
        { icon:'😊', title:t('horoscope.mood.title'),        content:stableMsg('mood',th.mood,horoscope.currentDate,6,t) },
        { icon:'✨', title:t('horoscope.assets.title'),      content:`🎲 ${t('horoscope.assets.luckyNumber',{luckyNumber:ln})}\n\n🎨 ${t('horoscope.assets.luckyColor',{luckyColor:th.luckyColor})}` },
        { icon:'💞', title:t('horoscope.compatibility.title'), content:stableMsg('compatibility',th.compatibility,horoscope.currentDate,8,t) },
        { icon:'🌟', title:t('horoscope.advice.title'),      content:stableVar(englishSign,'advice',horoscope.currentDate,t) },
      ]
    };
  }, [horoscope,user.zodiacSign,user.name,englishSign,t,language]);

  const handleDiscoverPrediction = () => { if (!user?.zodiacSign) return; setShow100Reward(false); setTimeout(() => setShowPrediction100(true), 300); };

  const handleShare = async () => {
    if (!horoscope) return;
    const { personalLuckyNumber:ln } = horoscopeSections;
    const th = trHoro(horoscope,englishSign,t,language);
    const text = `${t(`zodiac.signs.${englishSign}`)}\n\n${stableVar(englishSign,'descriptions',horoscope.currentDate,t).substring(0,150)}...\n\n${t('horoscope.assets.luckyNumber',{luckyNumber:ln})}\n${t('horoscope.assets.luckyColor',{luckyColor:th.luckyColor})}\n\n${t('horoscope.share.footer')}`.trim();
    if (navigator?.share) { try { await navigator.share({text}); return; } catch(e:any) { if(e.name==='AbortError') return; } }
    try { await navigator.clipboard.writeText(text); alert(t('horoscope.share.copied')||'✅ Copié !'); } catch(e){}
  };

  if (!user?.zodiacSign) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#05030E',fontFamily:"'Jost',sans-serif",color:'#F7F2EA',padding:20}}>
      <div style={{textAlign:'center'}}>
        <p style={{color:'rgba(247,242,234,0.65)',marginBottom:24,fontSize:14}}>{t('horoscope.noSign')||'Aucun signe trouvé.'}</p>
        <button onClick={onBack} style={{padding:'12px 32px',background:'none',border:'1px solid rgba(201,168,76,0.5)',borderRadius:3,color:'#F0D98A',fontFamily:"'Jost',sans-serif",fontSize:11,letterSpacing:4,textTransform:'uppercase',cursor:'pointer'}}>{t('common.back')||'Retour'}</button>
      </div>
    </div>
  );

  if (showPrediction100) return <Prediction100Days user={user} streak={streak} onBack={() => setShowPrediction100(false)}/>;

  const { sections, personalLuckyNumber: _pln } = horoscopeSections;
  const level = getLevel(xp);
  const badges = getBadges(streak, t);

  const toggleSection = (index: number) => {
    setOpenSections(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev,index]);
    handleSectionOpen(sections[index]?.title||'', index);
  };

  return (
    <div className={`hp-root ${mounted ? 'hp-mounted' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        :root { --gold:#C9A84C; --gold-l:#F0D98A; --white:#F7F2EA; --bg:#05030E; }
        *{box-sizing:border-box;margin:0;padding:0;}

        .hp-root {
          min-height:100vh; display:flex; flex-direction:column;
          background:var(--bg); font-family:'Jost',sans-serif; color:var(--white);
          position:relative; overflow:hidden; padding-top:56px;
        }
        .hp-bg { position:absolute; inset:0; pointer-events:none;
          background: radial-gradient(ellipse 80% 45% at 50% -5%, rgba(80,40,160,0.22) 0%, transparent 60%),
                      radial-gradient(ellipse 40% 30% at 85% 75%, rgba(40,20,90,0.12) 0%, transparent 50%); }
        .hp-noise { position:absolute; inset:0; pointer-events:none; opacity:0.028;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px; }
        .hp-particles { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
        .hp-particle { position:absolute; border-radius:50%; background:white; animation:hppf var(--d,4s) ease-in-out infinite var(--dl,0s); }
        @keyframes hppf { 0%,100%{opacity:0} 40%,60%{opacity:var(--op,.15)} }

        /* Badges streak/date */
        .hp-streak {
          position:absolute; top:66px; left:16px; z-index:20;
          display:flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.04); border:1px solid rgba(201,168,76,0.22);
          border-radius:8px; padding:7px 12px; cursor:pointer;
          backdrop-filter:blur(4px);
        }
        .hp-streak-num { font-size:14px; font-weight:500; color:#F0D98A; line-height:1.1; }
        .hp-streak-lbl { font-size:9px; font-weight:300; letter-spacing:1px; color:rgba(247,242,234,0.5); }
        .hp-date-badge {
          position:absolute; top:68px; right:16px; z-index:20;
          background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.09);
          border-radius:20px; padding:5px 12px; backdrop-filter:blur(4px);
        }
        .hp-date-badge span { font-size:10px; font-weight:300; letter-spacing:1.5px; color:rgba(247,242,234,0.85); }

        /* Scroll */
        .hp-scroll {
          position:relative; z-index:10; flex:1; padding:0 16px 40px;
          overflow-y:auto; -webkit-overflow-scrolling:touch;
          opacity:0; transition:opacity 0.7s ease;
        }
        .hp-mounted .hp-scroll { opacity:1; transition-delay:0.2s; }

        /* Sign header */
        .hp-sign-block { text-align:center; padding:24px 24px 16px; }
        .hp-sign-symbol {
          display:inline-flex; align-items:center; justify-content:center;
          width:84px; height:84px; border-radius:50%;
          background:rgba(255,255,255,0.04); border:1px solid rgba(201,168,76,0.35);
          margin-bottom:14px; cursor:pointer;
          box-shadow:0 0 32px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
          transition:transform 0.4s ease;
        }
        .hp-sign-symbol:hover { transform:scale(1.06); }
        .hp-sign-emoji { font-size:44px; line-height:1; }
        .hp-sign-name {
          font-family:'Playfair Display',Georgia,serif;
          font-size:clamp(22px,6vw,30px); font-weight:300;
          color:#FDFAF4; margin-bottom:6px; letter-spacing:0.5px;
        }
        .hp-sign-dates { font-size:12px; font-weight:300; letter-spacing:2px; color:rgba(247,242,234,0.82); }

        .hp-line {
          width:1px; height:20px; margin:0 auto 18px;
          background:linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent);
        }

        /* XP card */
        .hp-xp-card {
          background:rgba(255,255,255,0.04); border:1px solid rgba(201,168,76,0.22);
          border-radius:10px; padding:16px 18px; margin-bottom:12px;
          box-shadow:inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .hp-xp-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
        .hp-xp-left { display:flex; align-items:center; gap:10px; }
        .hp-xp-icon { font-size:16px; color:#C9A84C; }
        .hp-xp-level { font-family:'Playfair Display',serif; font-size:15px; font-weight:400; color:#F0D98A; }
        .hp-xp-sub { font-size:11px; font-weight:300; color:rgba(247,242,234,0.78); margin-top:1px; }
        .hp-xp-today { font-size:11px; font-weight:300; letter-spacing:0.5px; color:#C9A84C; }
        .hp-xp-track { width:100%; height:2px; border-radius:1px; background:rgba(255,255,255,0.1); margin-bottom:6px; }
        .hp-xp-fill { height:100%; border-radius:1px; background:linear-gradient(90deg, #C9A84C, #F0D98A, #C9A84C); transition:width 1s ease; }
        .hp-xp-next { font-size:10px; font-weight:300; letter-spacing:1px; color:rgba(247,242,234,0.65); text-align:center; }

        /* Badges */
        .hp-badges-eyebrow {
          font-size:9px; font-weight:400; letter-spacing:3px; text-transform:uppercase;
          color:rgba(201,168,76,0.9); text-align:center; margin-bottom:10px;
        }
        .hp-badges-row { display:flex; justify-content:center; gap:10px; margin-bottom:18px; }
        .hp-badge {
          display:flex; flex-direction:column; align-items:center; gap:4px;
          padding:10px 12px; border-radius:8px;
          border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.03);
          opacity:0.35; transition:all 0.4s ease;
        }
        .hp-badge.on { opacity:1; border-color:rgba(201,168,76,0.35); background:rgba(201,168,76,0.07); box-shadow:0 0 14px rgba(201,168,76,0.08); }
        .hp-badge-icon { font-size:18px; line-height:1; }
        .hp-badge-lbl { font-size:9px; font-weight:300; letter-spacing:0.5px; color:rgba(247,242,234,0.7); }
        .hp-badge.on .hp-badge-lbl { color:#F0D98A; }

        /* Sections */
        .hp-section {
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1);
          border-radius:10px; overflow:hidden; margin-bottom:8px;
          transition:border-color 0.3s, box-shadow 0.3s;
        }
        .hp-section.open { border-color:rgba(201,168,76,0.3); box-shadow:0 0 18px rgba(201,168,76,0.06); }
        .hp-section-btn {
          width:100%; display:flex; align-items:center; justify-content:space-between;
          padding:15px 16px; gap:12px; background:none; border:none; cursor:pointer;
          text-align:left; transition:background 0.25s;
        }
        .hp-section-btn:hover { background:rgba(201,168,76,0.04); }
        .hp-section-left { display:flex; align-items:center; gap:10px; }
        .hp-section-icon { font-size:17px; line-height:1; }
        .hp-section-title {
          font-family:'Playfair Display',Georgia,serif; font-size:16px; font-weight:400;
          color:#FDFAF4; letter-spacing:0.2px; transition:color 0.3s;
        }
        .hp-section.open .hp-section-title { color:#F0D98A; }

        /* Chevron blanc visible */
        .hp-chevron {
          width:26px; height:26px; flex-shrink:0; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.3);
          color:rgba(255,255,255,0.95);
          transition:transform 0.3s, background 0.3s, border-color 0.3s, color 0.3s;
        }
        .hp-section:hover .hp-chevron { background:rgba(255,255,255,0.18); border-color:rgba(255,255,255,0.45); }
        .hp-section.open .hp-chevron { transform:rotate(180deg); background:rgba(201,168,76,0.18); border-color:rgba(201,168,76,0.55); color:#F0D98A; }
        .hp-chevron svg { width:13px; height:13px; stroke-width:2.5; }

        .hp-section-body { overflow:hidden; max-height:0; opacity:0; transition:max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s; }
        .hp-section-body.open { max-height:600px; opacity:1; }
        .hp-section-content {
          padding:2px 16px 16px 43px;
          font-family:'Playfair Display',serif; font-size:14px; font-style:italic; font-weight:300;
          color:rgba(247,242,234,0.92); line-height:1.9; white-space:pre-line;
        }

        /* Demain */
        .hp-tomorrow {
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09);
          border-radius:10px; padding:16px 18px; display:flex; align-items:flex-start; gap:14px;
          margin-bottom:18px;
        }
        .hp-tomorrow-sym { font-size:20px; color:#C9A84C; flex-shrink:0; margin-top:2px; line-height:1; }
        .hp-tomorrow-title { font-family:'Playfair Display',serif; font-size:15px; font-weight:400; color:#F0D98A; margin-bottom:4px; }
        .hp-tomorrow-desc { font-size:13px; font-weight:300; color:rgba(247,242,234,0.82); line-height:1.6; }

        /* Boutons */
        .hp-btn-gold {
          width:100%; padding:15px 24px;
          background:linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.07) 100%);
          border:1px solid rgba(201,168,76,0.55); border-radius:3px;
          font-family:'Jost',sans-serif; font-size:11px; font-weight:400;
          letter-spacing:4px; text-transform:uppercase;
          color:#F0D98A; cursor:pointer; transition:all 0.35s; display:block; text-align:center; margin-bottom:10px;
        }
        .hp-btn-gold:hover { border-color:#C9A84C; color:#fff8d0; box-shadow:0 0 24px rgba(201,168,76,0.16); }
        .hp-btn-ghost {
          width:100%; padding:14px 24px; background:none;
          border:1px solid rgba(255,255,255,0.22); border-radius:3px;
          font-family:'Jost',sans-serif; font-size:11px; font-weight:300;
          letter-spacing:3px; text-transform:uppercase;
          color:rgba(247,242,234,0.88); cursor:pointer; transition:all 0.3s; display:block; text-align:center;
        }
        .hp-btn-ghost:hover { border-color:rgba(255,255,255,0.45); color:#F7F2EA; }

        /* XP popup */
        .hp-xp-pop {
          position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:50;
          background:rgba(255,255,255,0.04); border:1px solid rgba(201,168,76,0.45);
          border-radius:3px; padding:10px 24px;
          font-family:'Jost',sans-serif; font-size:11px; font-weight:400;
          letter-spacing:3px; text-transform:uppercase; color:#F0D98A;
          animation:popIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes popIn { from{transform:translate(-50%,-50%) scale(0.8);opacity:0} to{transform:translate(-50%,-50%) scale(1);opacity:1} }

        @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hpSpin { to{transform:rotate(360deg)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes confettiExplode {
          0%{transform:translate(-50%,-50%) translate(0,0) rotate(0deg) scale(1);opacity:1}
          85%{opacity:1}
          100%{transform:translate(-50%,-50%) translate(calc(cos(var(--angle))*var(--distance)),calc(sin(var(--angle))*var(--distance))) rotate(var(--rotation)) scale(0);opacity:0}
        }
      `}</style>

      <div className="hp-bg"/><div className="hp-noise"/>
      <div className="hp-particles">
        {Array.from({length:28}).map((_,i) => (
          <div key={i} className="hp-particle" style={{ left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:`${Math.random()<.2?2:1}px`, height:`${Math.random()<.2?2:1}px`, '--d':`${3+Math.random()*5}s`, '--dl':`${Math.random()*5}s`, '--op':0.06+Math.random()*0.18 } as any}/>
        ))}
      </div>

      {/* Streak */}
      <div className="hp-streak" onClick={handleLogoTap}>
        <span style={{fontSize:18}}>🔥</span>
        <div><div className="hp-streak-num">{streak}</div><div className="hp-streak-lbl">{t('horoscope.streak.label')||'jours'}</div></div>
      </div>

      {/* Date */}
      <div className="hp-date-badge">
        <span>{new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}</span>
      </div>

      {/* Debug */}
      {showDebugMenu && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.92)',backdropFilter:'blur(8px)',zIndex:60,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(201,168,76,0.28)',borderRadius:12,padding:24,maxWidth:300,width:'100%'}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:'#F0D98A',textAlign:'center',marginBottom:18,letterSpacing:1}}>Debug</div>
            <div style={{display:'flex',gap:8,marginBottom:14}}>
              {[['STREAK',streak],['XP',xp]].map(([l,v]:any)=>(
                <div key={l} style={{flex:1,padding:10,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:6}}>
                  <div style={{fontSize:8,letterSpacing:2,color:'rgba(247,242,234,0.45)',marginBottom:4}}>{l}</div>
                  <div style={{fontSize:16,color:'#F0D98A',fontWeight:500}}>{v}</div>
                </div>
              ))}
            </div>
            {[['100j',()=>{localStorage.setItem('horoscope_streak','100');localStorage.setItem('horoscope_last_visit',new Date().toDateString());localStorage.removeItem('reward_100_shown');setShowDebugMenu(false);window.location.reload();}],
              ['200j',()=>{localStorage.setItem('horoscope_streak','200');localStorage.setItem('horoscope_last_visit',new Date().toDateString());localStorage.removeItem('reward_200_shown');setShowDebugMenu(false);window.location.reload();}],
              ['Reset',dbgReset],['Fermer',()=>setShowDebugMenu(false)]
            ].map(([l,fn]:any)=>(
              <button key={l} onClick={fn} style={{width:'100%',padding:'10px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:3,color:'rgba(247,242,234,0.75)',fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:2,textTransform:'uppercase',cursor:'pointer',marginBottom:6}}>{l}</button>
            ))}
          </div>
        </div>
      )}

      {/* 100-day reward */}
      {show100Reward && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.96)',backdropFilter:'blur(12px)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:360,height:360,background:'radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)',borderRadius:'50%'}}/>
            {Array.from({length:50}).map((_,i) => {
              const colors=['#C9A84C','#F0D98A','#E8C86A','#DDB95A'];
              const color=colors[Math.floor(Math.random()*colors.length)];
              return <div key={i} style={{position:'absolute',top:'50%',left:'50%',width:5,height:9,borderRadius:2,background:color,animation:`confettiExplode 5s ease-out ${Math.random()*0.4}s forwards`,'--angle':`${(i/50)*360}deg`,'--distance':`${160+Math.random()*120}px`,'--rotation':`${Math.random()*1080}deg`} as any}/>;
            })}
          </div>
          <div style={{position:'relative',maxWidth:380,width:'100%',zIndex:1}}>
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(201,168,76,0.32)',borderRadius:14,padding:28,opacity:0,animation:'fadeInUp 0.8s ease-out 1.2s forwards',textAlign:'center'}}>
              <div style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:72,height:72,borderRadius:'50%',background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.38)',marginBottom:18}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:'#F0D98A',fontWeight:300}}>{streak}</span>
              </div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:300,color:'#FDFAF4',marginBottom:5}}>{t('horoscope.reward100.title')||'Légende'}</div>
              <div style={{fontSize:12,fontWeight:300,letterSpacing:1,color:'rgba(247,242,234,0.6)',marginBottom:18}}>{streak} {t('horoscope.reward100.daysLabel')||'jours'}</div>
              <div style={{background:'rgba(0,0,0,0.25)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:8,padding:14,marginBottom:18,maxHeight:'32vh',overflowY:'auto'}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontStyle:'italic',fontWeight:300,color:'rgba(247,242,234,0.82)',lineHeight:1.9}}>{t('horoscope.reward100.message')||'Bravo !'}</p>
              </div>
              <button className="hp-btn-gold" onClick={handleDiscoverPrediction}>{t('horoscope.reward100.discover')||'Découvrir ma prédiction'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Level up */}
      {showLevelUp && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',backdropFilter:'blur(6px)',zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(201,168,76,0.32)',borderRadius:14,padding:32,textAlign:'center',animation:'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1)'}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:300,color:'#F0D98A',marginBottom:6}}>{t('horoscope.levelUp.title')||'Niveau supérieur'}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontStyle:'italic',color:'rgba(247,242,234,0.75)'}}>{t('horoscope.levelUp.newLevel',{level:newLevel})||`Niveau ${newLevel}`}</div>
          </div>
        </div>
      )}

      {/* XP gain */}
      {showXPGain && <div className="hp-xp-pop">+{xpGainAmount} XP</div>}

      <div className="hp-scroll">

        {(isLoading||isFetching) && (
          <div style={{textAlign:'center',padding:'60px 0'}}>
            <div style={{width:32,height:32,border:'1px solid rgba(201,168,76,0.35)',borderTopColor:'#C9A84C',borderRadius:'50%',margin:'0 auto 16px',animation:'hpSpin 1s linear infinite'}}/>
            <p style={{fontSize:11,letterSpacing:2,color:'rgba(247,242,234,0.5)',textTransform:'uppercase'}}>{t('horoscope.loading')||'Chargement'}</p>
          </div>
        )}

        {error && errorMessage && (
          <div style={{background:'rgba(255,80,80,0.06)',border:'1px solid rgba(255,80,80,0.2)',borderRadius:8,padding:16,marginBottom:16}}>
            <p style={{color:'rgba(255,150,150,0.85)',fontSize:13,marginBottom:10}}>{errorMessage}</p>
            <button onClick={()=>refetch()} style={{padding:'8px 20px',background:'none',border:'1px solid rgba(255,80,80,0.35)',borderRadius:3,color:'rgba(255,150,150,0.85)',fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:2,cursor:'pointer'}}>{t('horoscope.retry')||'Réessayer'}</button>
          </div>
        )}

        {horoscope && (
          <>
            {/* Sign header */}
            <div className="hp-sign-block">
              <div className="hp-sign-symbol" onClick={handleLogoTap}>
                <span className="hp-sign-emoji">{user.zodiacSign.symbol}</span>
              </div>
              <div className="hp-sign-name">{t(`zodiac.signs.${englishSign}`)}</div>
              <div className="hp-sign-dates">{trHoro(horoscope,englishSign,t,language).date}</div>
            </div>

            <div className="hp-line"/>

            {/* XP card */}
            <div className="hp-xp-card">
              <div className="hp-xp-top">
                <div className="hp-xp-left">
                  <span className="hp-xp-icon">✦</span>
                  <div>
                    <div className="hp-xp-level">{t('horoscope.level',{level})||`Niveau ${level}`}</div>
                    <div className="hp-xp-sub">{xp} / {level*100} XP</div>
                  </div>
                </div>
                <div className="hp-xp-today">+{Math.min(xp%100,15)} XP {t('horoscope.xpToday')||"aujourd'hui"}</div>
              </div>
              <div className="hp-xp-track"><div className="hp-xp-fill" style={{width:`${((xp%100)/100)*100}%`}}/></div>
              <div className="hp-xp-next">{100-(xp%100)} XP avant niveau {level+1}</div>
            </div>

            {/* Badges */}
            <div className="hp-badges-eyebrow">{t('horoscope.badges.title')||'Accomplissements'}</div>
            <div className="hp-badges-row">
              {badges.map(b => (
                <div key={b.id} className={`hp-badge ${b.unlocked?'on':''}`}>
                  <span className="hp-badge-icon">{b.icon}</span>
                  <span className="hp-badge-lbl">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Sections */}
            <div style={{marginBottom:16}}>
              {sections.map((section,index) => {
                const isOpen = openSections.includes(index);
                return (
                  <div key={index} className={`hp-section ${isOpen?'open':''}`} style={{opacity:0,animation:`slideUp 0.45s ease-out ${index*0.05}s forwards`}}>
                    <button className="hp-section-btn" onClick={()=>toggleSection(index)}>
                      <div className="hp-section-left">
                        <span className="hp-section-icon">{section.icon}</span>
                        <span className="hp-section-title">{section.title}</span>
                      </div>
                      <div className="hp-chevron">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </button>
                    <div className={`hp-section-body ${isOpen?'open':''}`}>
                      <div className="hp-section-content">{section.content}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Demain */}
            <div className="hp-tomorrow">
              <span className="hp-tomorrow-sym">◈</span>
              <div>
                <div className="hp-tomorrow-title">{t('horoscope.tomorrow.title')||'Reviens demain'}</div>
                <div className="hp-tomorrow-desc">{t('horoscope.tomorrow.description')||'Votre horoscope vous attend chaque jour.'}</div>
              </div>
            </div>

            {/* Boutons */}
            <button className="hp-btn-gold" onClick={handleShare}>{t('horoscope.share.button')||'Partager mon horoscope'}</button>
            <button className="hp-btn-ghost" onClick={onBack}>{t('horoscope.backButton')||'Retour'}</button>
          </>
        )}
      </div>
    </div>
  );
}