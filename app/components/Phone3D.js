'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/* ─── Palette ─── */
const S = {
  bg: '#111113',
  card: 'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.09)',
  green: '#34C759',
  greenDim: 'rgba(52,199,89,0.14)',
  greenBorder: 'rgba(52,199,89,0.28)',
  blue: '#0A84FF',
  orange: '#FF9F0A',
  text: '#FFFFFF',
  textSec: 'rgba(255,255,255,0.5)',
  textMuted: 'rgba(255,255,255,0.25)',
  sep: 'rgba(255,255,255,0.07)',
};

/* ─── CountUp ─── */
function CountUp({ to, duration = 1100 }) {
  const [v, setV] = useState(to);
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    setV(0);
    let s = null, raf;
    const step = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <>{v.toLocaleString('ru-RU')}</>;
}

/* ─── Pill badge ─── */
function Badge({ color = S.green, children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: `${color}18`, border: `1px solid ${color}30`,
      borderRadius: 20, padding: '3px 9px',
      fontSize: 9, fontWeight: 700, color, letterSpacing: '0.04em',
    }}>{children}</span>
  );
}

/* ════════════════════════════════════════
   SCREEN 1 — DASHBOARD
════════════════════════════════════════ */
function DashScreen() {
  return (
    <div style={{ padding: '14px 14px 0', display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div style={{ fontSize: 10, color: S.textMuted }}>Пятница, 16 мая 2026</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: S.text }}>Привет, Алексей 👋</div>
          <Badge color={S.green}>● на смене</Badge>
        </div>
      </motion.div>

      {/* Main earnings card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        style={{
          background: `linear-gradient(135deg, rgba(52,199,89,0.2) 0%, rgba(52,199,89,0.06) 100%)`,
          border: `1px solid ${S.greenBorder}`, borderRadius: 20, padding: '16px',
          position: 'relative', overflow: 'hidden',
        }}>
        {/* bg glow */}
        <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(52,199,89,0.15)', filter: 'blur(20px)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(52,199,89,0.7)', letterSpacing: '0.07em', marginBottom: 6 }}>К ВЫПЛАТЕ В МАЕ</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 34, fontWeight: 900, color: S.green, letterSpacing: '-0.03em', lineHeight: 1 }}>
            <CountUp to={24800} duration={1200} />
          </span>
          <span style={{ fontSize: 18, fontWeight: 700, color: S.green }}>₽</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {[['96 ч', 'отработано'], ['258 ₽/ч', 'ставка'], ['↑ 12%', 'vs прошлый мес.']].map(([v, l]) => (
            <div key={l} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: '5px 9px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: S.green }}>{v}</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)' }}>{l}</div>
            </div>
          ))}
        </div>
        {/* pulse dot */}
        <motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 2.2 }}
          style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', background: S.green }} />
      </motion.div>

      {/* 3 stat cards */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: 8 }}>
        {[
          { icon: '📅', val: <CountUp to={12} duration={900} />, label: 'смен в мае' },
          { icon: '🕐', val: <><CountUp to={38} duration={1000} />ч</>, label: 'эта неделя' },
          { icon: '⭐', val: '4.9', label: 'рейтинг' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: S.card, border: `1px solid ${S.cardBorder}`, borderRadius: 16, padding: '12px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: S.text, lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 8, color: S.textMuted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Next shift */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
        style={{ background: S.card, border: `1px solid ${S.cardBorder}`, borderRadius: 16, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: S.greenDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>📅</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: S.textMuted, marginBottom: 2 }}>Следующая смена</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: S.text }}>Завтра, 09:00 – 18:00</div>
          <div style={{ fontSize: 10, color: S.textSec }}>Офис на Ленина · 9 ч</div>
        </div>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: S.green, boxShadow: `0 0 8px ${S.green}`, flexShrink: 0 }} />
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════
   SCREEN 2 — SCHEDULE
════════════════════════════════════════ */
const shifts = [
  { date: '17 мая', day: 'Сб', time: '09:00–18:00', loc: 'Офис', color: S.green, status: 'Плановая' },
  { date: '19 мая', day: 'Пн', time: '10:00–19:00', loc: 'Склад №2', color: S.blue, status: 'Плановая' },
  { date: '21 мая', day: 'Ср', time: '09:00–18:00', loc: 'Офис', color: S.green, status: 'Плановая' },
  { date: '23 мая', day: 'Пт', time: '08:00–17:00', loc: 'ТЦ Галерея', color: S.orange, status: 'Плановая' },
];
function ScheduleScreen() {
  return (
    <div style={{ padding: '14px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: S.text }}>График смен</div>
        <div style={{ fontSize: 10, color: S.textMuted, marginTop: 2 }}>Май 2026 · 4 плановых смены</div>
      </motion.div>

      {/* Month mini-strip */}
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        style={{ display: 'flex', gap: 6, overflowX: 'hidden' }}>
        {[15, 16, 17, 18, 19, 20, 21].map((d, i) => {
          const active = [17, 19, 21].includes(d);
          const today = d === 16;
          return (
            <div key={d} style={{
              flex: 1, textAlign: 'center', padding: '8px 4px', borderRadius: 12,
              background: active ? S.greenDim : today ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: active ? `1px solid ${S.greenBorder}` : '1px solid transparent',
            }}>
              <div style={{ fontSize: 8, color: S.textMuted, marginBottom: 3 }}>{['Пт', 'Сб', 'Вс', 'Пн', 'Вт', 'Ср', 'Чт'][i]}</div>
              <div style={{ fontSize: 13, fontWeight: today || active ? 800 : 400, color: active ? S.green : today ? S.text : S.textMuted }}>{d}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Shift list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {shifts.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
            style={{
              background: S.card, border: `1px solid ${S.cardBorder}`,
              borderRadius: 16, padding: '11px 12px',
              display: 'flex', alignItems: 'center', gap: 10,
              borderLeft: `3px solid ${s.color}`,
            }}>
            <div style={{ textAlign: 'center', minWidth: 30 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: S.text, lineHeight: 1 }}>{s.date.split(' ')[0]}</div>
              <div style={{ fontSize: 8, color: S.textMuted, marginTop: 2 }}>{s.day}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: S.text }}>{s.time}</div>
              <div style={{ fontSize: 9, color: S.textSec, marginTop: 2 }}>{s.loc}</div>
            </div>
            <Badge color={s.color}>{s.status}</Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   SCREEN 3 — PAYROLL
════════════════════════════════════════ */
function PayrollScreen() {
  return (
    <div style={{ padding: '14px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: S.text }}>Расчёт</div>
          <Badge color={S.green}>Май 2026</Badge>
        </div>
      </motion.div>

      {/* Big card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        style={{
          background: `linear-gradient(140deg, rgba(52,199,89,0.18), rgba(52,199,89,0.05))`,
          border: `1px solid ${S.greenBorder}`, borderRadius: 20, padding: '18px', textAlign: 'center',
        }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(52,199,89,0.7)', letterSpacing: '0.07em', marginBottom: 8 }}>ИТОГО К ВЫПЛАТЕ</div>
        <div style={{ fontSize: 38, fontWeight: 900, color: S.green, letterSpacing: '-0.04em', lineHeight: 1 }}>
          <CountUp to={24800} duration={1200} /> ₽
        </div>
        <div style={{ fontSize: 10, color: S.textMuted, marginTop: 8 }}>автоматически рассчитано системой</div>
      </motion.div>

      {/* Breakdown */}
      {[
        ['Часов отработано', '96 ч', null],
        ['Почасовая ставка', '258 ₽/ч', null],
        ['Базовый расчёт', '24 768 ₽', null],
        ['Корректировка', '+32 ₽', S.green],
        ['Итого', '24 800 ₽', S.green],
      ].map(([label, val, color], i) => (
        <motion.div key={label}
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '9px 0', borderBottom: i < 4 ? `1px solid ${S.sep}` : 'none',
          }}>
          <span style={{ fontSize: 12, color: i === 4 ? S.text : S.textSec, fontWeight: i === 4 ? 700 : 400 }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: color || S.text }}>{val}</span>
        </motion.div>
      ))}

      {/* Export btn */}
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        style={{
          background: 'rgba(255,255,255,0.07)', border: `1px solid ${S.cardBorder}`,
          borderRadius: 14, padding: '12px', textAlign: 'center',
          fontSize: 13, fontWeight: 700, color: S.text, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        }}>
        <span>📊</span> Экспорт в Excel
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════
   SCREEN 4 — ACTIVITY FEED
════════════════════════════════════════ */
const feed = [
  { icon: '🟢', text: 'Смена началась', sub: 'Сегодня 09:01 · Офис', color: S.green },
  { icon: '🔔', text: 'Назначена смена', sub: '19 мая · Склад №2', color: S.blue },
  { icon: '✅', text: 'Смена завершена · 9ч', sub: 'Вчера 18:00', color: S.green },
  { icon: '💰', text: 'Начислено 2 322 ₽', sub: '15 мая · за смену', color: S.orange },
  { icon: '✅', text: 'Смена завершена · 8ч', sub: '15 мая 18:01', color: S.green },
  { icon: '🔔', text: 'Напоминание о смене', sub: '14 мая · за 2 часа', color: S.blue },
];
function ActivityScreen() {
  return (
    <div style={{ padding: '14px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: S.text }}>Активность</div>
        <div style={{ fontSize: 10, color: S.textMuted, marginTop: 2 }}>История событий</div>
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 17, top: 22, bottom: 0, width: 1, background: S.sep }} />
        {feed.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 + i * 0.06 }}
            style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0' }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0, zIndex: 1,
              background: `${item.color}18`, border: `1px solid ${item.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>{item.icon}</div>
            <div style={{ flex: 1, paddingTop: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: S.text }}>{item.text}</div>
              <div style={{ fontSize: 9, color: S.textMuted, marginTop: 2 }}>{item.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   NAV TABS
════════════════════════════════════════ */
const TABS = [
  { icon: '🏠', label: 'Главная', Screen: DashScreen },
  { icon: '📅', label: 'График', Screen: ScheduleScreen },
  { icon: '💰', label: 'Расчёт', Screen: PayrollScreen },
  { icon: '⚡', label: 'События', Screen: ActivityScreen },
];

/* ════════════════════════════════════════
   iPHONE 17 PRO MAX FRAME
════════════════════════════════════════ */
export default function Phone3D({ tilt = true }) {
  const rotX = useMotionValue(tilt ? 7 : 0);
  const rotY = useMotionValue(tilt ? -13 : 0);
  const sX = useSpring(rotX, { stiffness: 90, damping: 20 });
  const sY = useSpring(rotY, { stiffness: 90, damping: 20 });

  const [tab, setTab] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!tilt) return;
    const fn = e => {
      rotX.set(7 - ((e.clientY / window.innerHeight) - 0.5) * 10);
      rotY.set(-13 + ((e.clientX / window.innerWidth) - 0.5) * 14);
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, [tilt]);

  useEffect(() => {
    const t = setInterval(() => {
      setTab(i => (i + 1) % TABS.length);
      setKey(k => k + 1);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const Screen = TABS[tab].Screen;

  return (
    <div style={{ position: 'relative', display: 'inline-block', userSelect: 'none' }}>
      {/* Floor glow */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ repeat: Infinity, duration: 3 }}
        style={{
          position: 'absolute', bottom: -50, left: '50%', transform: 'translateX(-50%)',
          width: 260, height: 80, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(52,199,89,0.22) 0%, transparent 70%)',
          filter: 'blur(22px)', pointerEvents: 'none',
        }} />

      <motion.div style={{ rotateX: sX, rotateY: sY, transformPerspective: 1400, transformStyle: 'preserve-3d' }}>
        {/* ── Titanium chassis ── */}
        <div style={{
          width: 290,
          background: 'linear-gradient(160deg, #4a4a4c 0%, #2e2e30 25%, #1c1c1e 60%, #141416 100%)',
          borderRadius: 56,
          padding: '16px 11px 12px',
          position: 'relative',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.14),
            inset 0 -1px 0 rgba(0,0,0,0.5),
            inset 1px 0 0 rgba(255,255,255,0.06),
            inset -1px 0 0 rgba(0,0,0,0.3),
            0 0 0 1px rgba(0,0,0,0.8),
            0 25px 70px rgba(0,0,0,0.75),
            0 60px 130px rgba(0,0,0,0.5),
            0 2px 6px rgba(0,0,0,0.6)
          `,
        }}>
          {/* Action button (left top) */}
          <div style={{ position: 'absolute', left: -4, top: 112, width: 4, height: 36,
            background: 'linear-gradient(to right, #1a1a1c, #2a2a2c)',
            borderRadius: '3px 0 0 3px',
            boxShadow: '-2px 0 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
          }} />
          {/* Volume up */}
          <div style={{ position: 'absolute', left: -4, top: 160, width: 4, height: 48,
            background: 'linear-gradient(to right, #1a1a1c, #2a2a2c)',
            borderRadius: '3px 0 0 3px',
            boxShadow: '-2px 0 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
          }} />
          {/* Volume down */}
          <div style={{ position: 'absolute', left: -4, top: 216, width: 4, height: 48,
            background: 'linear-gradient(to right, #1a1a1c, #2a2a2c)',
            borderRadius: '3px 0 0 3px',
            boxShadow: '-2px 0 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
          }} />
          {/* Power button (right) */}
          <div style={{ position: 'absolute', right: -4, top: 168, width: 4, height: 68,
            background: 'linear-gradient(to left, #1a1a1c, #2a2a2c)',
            borderRadius: '0 3px 3px 0',
            boxShadow: '2px 0 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
          }} />

          {/* Dynamic island */}
          <div style={{
            width: 100, height: 30, background: '#000', borderRadius: 18,
            margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.03)',
            position: 'relative',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0e0e0e', border: '1px solid #1a1a1a' }} />
            <div style={{ width: 30, height: 4, background: '#0e0e0e', borderRadius: 4 }} />
          </div>

          {/* Screen bezel */}
          <div style={{
            background: '#000',
            borderRadius: 44,
            padding: '1.5px',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)',
          }}>
            {/* Screen glass */}
            <div style={{
              background: S.bg,
              borderRadius: 43,
              height: 530,
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ position: 'absolute', inset: 0, overflowY: 'hidden' }}
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>

              {/* Bottom nav */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'rgba(17,17,19,0.88)', backdropFilter: 'blur(24px)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', padding: '9px 6px 20px',
              }}>
                {TABS.map((t, i) => {
                  const active = i === tab;
                  return (
                    <button key={i} onClick={() => { setTab(i); setKey(k => k + 1); }}
                      style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 0', position: 'relative' }}>
                      {active && (
                        <motion.div layoutId="nav-pill"
                          style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(52,199,89,0.12)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                      )}
                      <span style={{ fontSize: 18, position: 'relative' }}>{t.icon}</span>
                      <span style={{ fontSize: 8, fontWeight: active ? 700 : 400, color: active ? S.green : S.textMuted, position: 'relative' }}>
                        {t.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Glass glare */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(155deg, rgba(255,255,255,0.055) 0%, transparent 60%)',
                borderRadius: '43px 43px 0 0', pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* Home indicator */}
          <div style={{ width: 82, height: 4.5, background: 'rgba(255,255,255,0.24)', borderRadius: 3, margin: '11px auto 1px', boxShadow: '0 1px 2px rgba(0,0,0,0.4)' }} />
        </div>
      </motion.div>

      {/* Screen label */}
      <div style={{ textAlign: 'center', marginTop: 22 }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 12, fontWeight: 500 }}>
            {TABS[tab].label}
          </motion.div>
        </AnimatePresence>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          {TABS.map((_, i) => (
            <motion.button key={i} onClick={() => { setTab(i); setKey(k => k + 1); }}
              animate={{ width: i === tab ? 24 : 7, background: i === tab ? S.green : 'rgba(255,255,255,0.18)' }}
              transition={{ duration: 0.3 }}
              style={{ height: 7, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Re-exports for ProductPreview compatibility */
export const HomeScreen = DashScreen;
export const ScheduleScreenExport = ScheduleScreen;
export const ProfileScreen = PayrollScreen;
export const AdminScreen = ActivityScreen;
