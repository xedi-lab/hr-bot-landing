'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/* ── Real app design tokens ── */
const C = {
  bg: '#F2F2F7',
  card: '#FFFFFF',
  text: '#000000',
  textSec: '#8E8E93',
  textMuted: '#C7C7CC',
  green: '#34C759',
  greenBg: 'rgba(52,199,89,0.12)',
  blue: '#007AFF',
  blueBg: 'rgba(0,122,255,0.12)',
  separator: 'rgba(0,0,0,0.08)',
  tgHeader: '#1C1C1E',
};

const cardStyle = {
  background: C.card,
  borderRadius: 18,
  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
};

function CountUp({ to, duration = 1100, decimals = 0 }) {
  const [v, setV] = useState(to);
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    setV(0);
    let start = null, raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const val = to * (1 - Math.pow(1 - p, 3));
      setV(decimals ? parseFloat(val.toFixed(decimals)) : Math.round(val));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <>{decimals ? v.toFixed(decimals) : v.toLocaleString('ru-RU')}</>;
}

/* ── Telegram header ── */
function TgHeader() {
  return (
    <div style={{
      background: C.tgHeader, padding: '10px 14px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
    }}>
      <span style={{ color: '#fff', fontSize: 16, opacity: 0.7 }}>✕</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%', background: '#5AABF5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 800, color: '#fff',
        }}>H</div>
        <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>HR-BOT</span>
      </div>
      <span style={{ color: '#fff', fontSize: 16, opacity: 0.7 }}>···</span>
    </div>
  );
}

/* ── Bottom nav ── */
function BottomNav({ active }) {
  const tabs = [
    { icon: '🏠', label: 'Главная' },
    { icon: '📅', label: 'График' },
    { icon: '👤', label: 'Профиль' },
    { icon: '⚙️', label: 'Админ' },
  ];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
      borderTop: `1px solid ${C.separator}`,
      display: 'flex', padding: '8px 0 14px', flexShrink: 0,
    }}>
      {tabs.map((t, i) => {
        const isActive = i === active;
        return (
          <div key={i} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <span style={{
              fontSize: 9, fontWeight: isActive ? 700 : 400,
              color: isActive ? C.text : C.textSec,
            }}>{t.label}</span>
            {isActive && (
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.text, marginTop: 1 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCREEN 1 — ГЛАВНАЯ
══════════════════════════════════════════════════════ */
export function HomeScreen({ animate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <TgHeader />
      <div style={{ flex: 1, padding: '12px 12px 0', overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Greeting card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 }}
          style={{ ...cardStyle, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: C.textSec, marginBottom: 2 }}>Привет,</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: '-0.02em', lineHeight: 1 }}>Алексей</div>
            <div style={{ fontSize: 11, color: C.textSec, marginTop: 4 }}>ООО АИС</div>
          </div>
          <div style={{
            background: '#F2F2F7', borderRadius: 20, padding: '5px 10px',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.textMuted }} />
            <span style={{ fontSize: 11, color: C.textSec, fontWeight: 500 }}>Не на смене</span>
          </div>
        </motion.div>

        {/* 3 stats */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { val: animate ? <CountUp to={12} duration={800} /> : '0', label: 'Смен' },
            { val: animate ? <><CountUp to={14} duration={900} /><span style={{ fontSize: 13 }}>.2ч</span></> : '0', label: 'Часов' },
            { val: animate ? <><CountUp to={7106} duration={1100} /><span style={{ fontSize: 13 }}>₽</span></> : '0', label: 'Заработано' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.07 }}
              style={{ ...cardStyle, flex: 1, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: C.textSec, marginTop: 5 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ ...cardStyle, padding: '14px 16px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: C.textSec, letterSpacing: '0.06em', marginBottom: 10 }}>КАК ЭТО РАБОТАЕТ</div>
          {[
            ['Смена открывается', 'автоматически', ' по расписанию'],
            ['Подтверди присутствие', 'нажав кнопку', ''],
            ['В конце дня смена закроется', 'автоматически в 21:00', ''],
          ].map(([pre, bold, post], i) => (
            <div key={i} style={{ fontSize: 12, color: C.text, marginBottom: 7, lineHeight: 1.4 }}>
              {i + 1}. {pre} <strong>{bold}</strong>{post}
            </div>
          ))}
        </motion.div>
      </div>
      <BottomNav active={0} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCREEN 2 — ГРАФИК
══════════════════════════════════════════════════════ */
const calDays = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31],
];
const worked = [11, 12, 13]; // blue
const planned = [16, 17, 18, 21, 22, 25, 26, 29, 30]; // green

export function ScheduleScreen({ animate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <TgHeader />
      <div style={{ flex: 1, padding: '12px 12px 0', overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: '-0.02em' }}>График</div>

        {/* Calendar card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ ...cardStyle, padding: '12px' }}>
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ ...cardStyle, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>‹</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Май 2026</div>
            <div style={{ ...cardStyle, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>›</div>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 10, justifyContent: 'center' }}>
            {[['#34C759', 'Плановая'], ['#007AFF', 'Отработана'], ['#1A8C3A', 'Выполнена']].map(([color, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
                <span style={{ fontSize: 8.5, color: C.textSec }}>{label}</span>
              </div>
            ))}
          </div>
          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
            {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 9, fontWeight: 600, color: C.textSec, paddingBottom: 2 }}>{d}</div>
            ))}
          </div>
          {/* Days grid */}
          {calDays.map((week, wi) => (
            <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 2 }}>
              {week.map((day, di) => {
                const isWorked = day && worked.includes(day);
                const isPlanned = day && planned.includes(day);
                return (
                  <motion.div key={di}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={animate ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.15 + (wi * 7 + di) * 0.012 }}
                    style={{
                      height: 30, borderRadius: 8, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: 1,
                      background: isWorked ? C.blueBg : isPlanned ? C.greenBg : 'transparent',
                    }}
                  >
                    <span style={{
                      fontSize: 11, fontWeight: (isWorked || isPlanned) ? 700 : 400,
                      color: isWorked ? C.blue : isPlanned ? C.green : day ? '#8E8E93' : 'transparent',
                    }}>{day || ''}</span>
                    {(isWorked || isPlanned) && (
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: isWorked ? C.blue : '#1A8C3A' }} />
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>

        {/* Collapse button */}
        <div style={{ ...cardStyle, padding: '12px', textAlign: 'center', fontSize: 13, color: C.textSec, fontWeight: 500 }}>
          ↑ Свернуть
        </div>
      </div>
      <BottomNav active={1} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCREEN 3 — ПРОФИЛЬ
══════════════════════════════════════════════════════ */
export function ProfileScreen({ animate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <TgHeader />
      <div style={{ flex: 1, padding: '12px 12px 0', overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: '-0.02em' }}>Профиль</div>

        {/* Avatar card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 }}
          style={{ ...cardStyle, padding: '18px', textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: '#E5E5EA',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: C.text, margin: '0 auto 10px',
          }}>ДБ</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Даня Байманов</div>
          <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>ООО АИС</div>
        </motion.div>

        {/* Rate */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.12 }}
          style={{ ...cardStyle, padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: C.textSec }}>Ставка</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>4 999 ₽/час</span>
        </motion.div>

        {/* Period toggle */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.18 }}
          style={{ ...cardStyle, padding: '4px', display: 'flex', gap: 4 }}>
          {['Неделя', 'Месяц', '3 месяца'].map((p, i) => (
            <div key={p} style={{
              flex: 1, textAlign: 'center', padding: '8px 4px', borderRadius: 12, fontSize: 12,
              fontWeight: i === 1 ? 700 : 400,
              color: i === 1 ? C.text : C.textSec,
              background: i === 1 ? '#E5E5EA' : 'transparent',
            }}>{p}</div>
          ))}
        </motion.div>

        {/* Earnings card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.24 }}
          style={{ ...cardStyle, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.textSec, letterSpacing: '0.06em', marginBottom: 6 }}>ЗАРАБОТАНО</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: C.text, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {animate ? <CountUp to={7106} duration={1000} /> : '0'} ₽
          </div>
          <div style={{ fontSize: 11, color: C.textSec, marginTop: 5 }}>4 смен · 14.2 ч</div>
        </motion.div>

        {/* Bottom 2 cards */}
        <div style={{ display: 'flex', gap: 8 }}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.32 }}
            style={{ ...cardStyle, flex: 1, padding: '12px 14px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.textSec, letterSpacing: '0.05em', marginBottom: 5 }}>ПРОГНОЗ</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.text, letterSpacing: '-0.02em' }}>
              {animate ? <CountUp to={13768} duration={1100} /> : '0'} ₽
            </div>
            <div style={{ fontSize: 9, color: C.textSec, marginTop: 3 }}>до конца месяца</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.38 }}
            style={{ ...cardStyle, flex: 1, padding: '12px 14px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.textSec, letterSpacing: '0.05em', marginBottom: 5 }}>ПОСЕЩАЕМОСТЬ</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.green, letterSpacing: '-0.02em' }}>400%</div>
            <div style={{ fontSize: 9, color: C.textSec, marginTop: 3 }}>4 из 1 смен</div>
          </motion.div>
        </div>
      </div>
      <BottomNav active={2} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCREEN 4 — АДМИН
══════════════════════════════════════════════════════ */
export function AdminScreen({ animate }) {
  const menuItems = [
    { icon: '📊', title: 'Обзор дня', sub: '0 на смене' },
    { icon: '👥', title: 'Штат', sub: 'Сотрудники' },
    { icon: '💰', title: 'Расчёт', sub: '9 285 ₽/мес' },
    { icon: '⚡', title: 'Активность', sub: 'Лента событий' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <TgHeader />
      <div style={{ flex: 1, padding: '12px 12px 0', overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: '-0.02em' }}>Управление</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, color: C.textSec }}>Авто</span>
            <div style={{ ...cardStyle, padding: '4px 8px', display: 'flex', gap: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <span style={{ fontSize: 14 }}>☀️</span>
              <span style={{ fontSize: 14 }}>🌙</span>
            </div>
          </div>
        </div>

        {/* 2x2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {menuItems.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={animate ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.08 + i * 0.07 }}
              style={{ ...cardStyle, padding: '14px', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 12, color: C.textMuted }}>›</div>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: C.textSec }}>{item.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Full-width instruction */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.38 }}
          style={{ ...cardStyle, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>📖</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Инструкция</span>
          </div>
          <span style={{ fontSize: 14, color: C.textMuted }}>›</span>
        </motion.div>
      </div>
      <BottomNav active={3} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN 3D PHONE
══════════════════════════════════════════════════════ */
const SCREENS = [
  { Screen: HomeScreen, label: 'Главная' },
  { Screen: ScheduleScreen, label: 'График смен' },
  { Screen: ProfileScreen, label: 'Профиль сотрудника' },
  { Screen: AdminScreen, label: 'Панель администратора' },
];

export default function Phone3D({ tilt = true }) {
  const rotX = useMotionValue(tilt ? 6 : 0);
  const rotY = useMotionValue(tilt ? -12 : 0);
  const sRotX = useSpring(rotX, { stiffness: 100, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 100, damping: 22 });

  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  // Mouse parallax
  useEffect(() => {
    if (!tilt) return;
    const onMove = (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 2;
      const dy = (e.clientY / window.innerHeight - 0.5) * 2;
      rotX.set(6 - dy * 5);
      rotY.set(-12 + dx * 7);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [tilt]);

  // Auto-cycle
  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % SCREENS.length);
      setAnimKey(k => k + 1);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const { Screen } = SCREENS[idx];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)',
        width: 220, height: 60, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(52,199,89,0.2) 0%, transparent 70%)',
        filter: 'blur(18px)', pointerEvents: 'none',
      }} />

      <motion.div style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d', perspective: 1400 }}>
        {/* Phone chassis */}
        <div style={{
          width: 255,
          background: 'linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 40%, #111 100%)',
          borderRadius: 50,
          padding: '13px 9px 10px',
          border: '1px solid rgba(255,255,255,0.13)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.4),
            0 0 0 0.5px rgba(0,0,0,0.6),
            0 20px 60px rgba(0,0,0,0.7),
            0 60px 120px rgba(0,0,0,0.5),
            0 4px 12px rgba(0,0,0,0.4)
          `,
          position: 'relative',
        }}>
          {/* Physical buttons */}
          <div style={{ position: 'absolute', right: -3, top: 108, width: 4, height: 34, background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)', borderRadius: '0 3px 3px 0', boxShadow: '2px 0 4px rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', left: -3, top: 86, width: 4, height: 24, background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 4px rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', left: -3, top: 118, width: 4, height: 38, background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 4px rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', left: -3, top: 164, width: 4, height: 38, background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 4px rgba(0,0,0,0.4)' }} />

          {/* Dynamic island */}
          <div style={{
            width: 86, height: 26, background: '#000', borderRadius: 14,
            margin: '0 auto 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.04)',
          }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #2a2a2a' }} />
            <div style={{ width: 24, height: 3.5, background: '#111', borderRadius: 4 }} />
          </div>

          {/* Screen bezel */}
          <div style={{
            background: '#000', borderRadius: 40, padding: 2,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
          }}>
            {/* Screen */}
            <div style={{
              background: C.bg, borderRadius: 38,
              height: 490, overflow: 'hidden', position: 'relative',
            }}>
              <AnimatePresence mode="wait">
                <motion.div key={animKey}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}
                >
                  <Screen animate={true} />
                </motion.div>
              </AnimatePresence>

              {/* Screen glare */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '35%',
                background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
                borderRadius: '38px 38px 0 0', pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* Home bar */}
          <div style={{ width: 76, height: 4, background: 'rgba(255,255,255,0.22)', borderRadius: 2, margin: '10px auto 1px' }} />
        </div>
      </motion.div>

      {/* Label + dots */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 10, fontWeight: 500 }}
          >
            {SCREENS[idx].label}
          </motion.div>
        </AnimatePresence>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          {SCREENS.map((_, i) => (
            <motion.button key={i}
              onClick={() => { setIdx(i); setAnimKey(k => k + 1); }}
              animate={{ width: i === idx ? 22 : 7, background: i === idx ? '#34C759' : 'rgba(255,255,255,0.2)' }}
              style={{ height: 7, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
