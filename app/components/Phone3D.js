'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// Real app colors
const APP = {
  bg: '#1C1C1E',
  surface: '#2C2C2E',
  surface2: '#3A3A3C',
  text: '#FFFFFF',
  textSec: 'rgba(255,255,255,0.55)',
  textMuted: 'rgba(255,255,255,0.3)',
  green: '#30D158',
  greenDim: 'rgba(48,209,88,0.15)',
  greenBorder: 'rgba(48,209,88,0.25)',
  separator: 'rgba(255,255,255,0.08)',
};

function CountUp({ to, duration = 1000 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, duration]);
  return <>{v.toLocaleString('ru-RU')}</>;
}

// ─── DASHBOARD SCREEN ────────────────────────────────────────────────────────
export function DashboardScreen({ animate }) {
  return (
    <div style={{ background: APP.bg, minHeight: '100%', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ fontSize: 11, color: APP.textMuted, marginBottom: 2 }}>Пятница, 16 мая</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: APP.text }}>Привет, Алексей 👋</div>
      </div>

      {/* Main earnings card */}
      <div style={{ padding: '0 16px 12px' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            background: `linear-gradient(145deg, rgba(48,209,88,0.18), rgba(48,209,88,0.06))`,
            border: `1px solid ${APP.greenBorder}`,
            borderRadius: 20, padding: '18px 18px 14px',
          }}
        >
          <div style={{ fontSize: 10, color: APP.green, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 8 }}>К ВЫПЛАТЕ В МАЕ</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 34, fontWeight: 900, color: APP.green, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {animate ? <CountUp to={24800} duration={1100} /> : '0'}
            </span>
            <span style={{ fontSize: 18, fontWeight: 700, color: APP.green, marginBottom: 2 }}>₽</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[['96 ч', 'отработано'], ['258 ₽/ч', 'ставка']].map(([v, l]) => (
              <div key={l} style={{
                background: 'rgba(0,0,0,0.2)', borderRadius: 10, padding: '6px 10px',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: APP.green }}>{v}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{l}</div>
              </div>
            ))}
          </div>
          {/* Pulsing dot */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: 'absolute', top: 18, right: 18,
              width: 8, height: 8, borderRadius: '50%', background: APP.green,
            }}
          />
        </motion.div>
      </div>

      {/* Next shift */}
      <div style={{ padding: '0 16px 10px' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          style={{
            background: APP.surface, borderRadius: 16, padding: '14px',
            display: 'flex', gap: 12, alignItems: 'center',
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: APP.greenDim,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
          }}>📅</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: APP.textMuted, marginBottom: 2 }}>Следующая смена</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: APP.text }}>Завтра, 09:00 – 18:00</div>
            <div style={{ fontSize: 11, color: APP.textSec }}>Офис на Ленина · 9 часов</div>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: APP.green, boxShadow: `0 0 8px ${APP.green}` }} />
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 16px', display: 'flex', gap: 8 }}>
        {[
          { icon: '🕐', val: animate ? <CountUp to={38} duration={900} /> : '0', unit: 'ч', label: 'эта неделя' },
          { icon: '✅', val: animate ? <CountUp to={12} duration={800} /> : '0', unit: '', label: 'смен в мае' },
          { icon: '⭐', val: '4.9', unit: '', label: 'рейтинг' },
        ].map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.28 + i * 0.07 }}
            style={{
              flex: 1, background: APP.surface, borderRadius: 14,
              padding: '12px 8px', textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: APP.text, lineHeight: 1 }}>
              {s.val}{s.unit}
            </div>
            <div style={{ fontSize: 9, color: APP.textMuted, marginTop: 3 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bottom nav */}
      <BottomNav active={0} />
    </div>
  );
}

// ─── PAYROLL SCREEN ───────────────────────────────────────────────────────────
export function PayrollScreen({ animate }) {
  return (
    <div style={{ background: APP.bg, minHeight: '100%' }}>
      <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: APP.text }}>Расчёт зарплаты</div>
        <div style={{ fontSize: 12, color: APP.green, fontWeight: 600 }}>Май 2026</div>
      </div>

      <div style={{ padding: '0 16px 12px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={animate ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }}
          style={{
            background: `linear-gradient(145deg, rgba(48,209,88,0.2), rgba(48,209,88,0.05))`,
            border: `1px solid ${APP.greenBorder}`,
            borderRadius: 20, padding: '20px', textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 10, color: 'rgba(48,209,88,0.7)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 8 }}>ИТОГО К ВЫПЛАТЕ</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: APP.green, letterSpacing: '-0.03em' }}>
            {animate ? <CountUp to={24800} duration={1200} /> : '0'} ₽
          </div>
        </motion.div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {[
          ['Часов отработано', animate, 96, 'ч'],
          ['Ставка', false, null, '258 ₽/ч'],
          ['Базовый расчёт', animate, 24768, ' ₽'],
          ['Корректировка', false, null, '+32 ₽'],
        ].map(([label, cnt, target, suffix], i) => (
          <motion.div key={label}
            initial={{ opacity: 0, x: 12 }} animate={animate ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.18 + i * 0.08 }}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 0', borderBottom: `1px solid ${APP.separator}`,
            }}
          >
            <span style={{ fontSize: 14, color: APP.textSec }}>{label}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: APP.text }}>
              {cnt ? <>{<CountUp to={target} duration={1000} />}{suffix}</> : suffix}
            </span>
          </motion.div>
        ))}
      </div>

      <div style={{ padding: '14px 16px' }}>
        <motion.button
          initial={{ opacity: 0, y: 8 }} animate={animate ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{
            width: '100%', background: APP.green, border: 'none',
            borderRadius: 16, padding: '16px', fontSize: 15, fontWeight: 700,
            color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <span>📊</span> Экспорт в Excel
        </motion.button>
      </div>

      <BottomNav active={3} />
    </div>
  );
}

// ─── ADMIN STAFF SCREEN ───────────────────────────────────────────────────────
export function StaffScreen({ animate }) {
  const employees = [
    { name: 'Алексей Иванов', hours: 96, pay: 24800, status: 'active' },
    { name: 'Мария Петрова', hours: 80, pay: 20640, status: 'active' },
    { name: 'Дмитрий Сидоров', hours: 72, pay: 18576, status: 'shift' },
    { name: 'Анна Козлова', hours: 88, pay: 22704, status: 'active' },
  ];
  return (
    <div style={{ background: APP.bg, minHeight: '100%' }}>
      <div style={{ padding: '16px 16px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: APP.text }}>Штат</div>
        <div style={{
          background: APP.greenDim, border: `1px solid ${APP.greenBorder}`,
          borderRadius: 10, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: APP.green,
        }}>4 сотр.</div>
      </div>
      <div style={{ padding: '8px 16px 0' }}>
        {employees.map((emp, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -12 }} animate={animate ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.09 }}
            style={{
              background: APP.surface, borderRadius: 16, padding: '14px',
              marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: `hsl(${i * 70 + 100}, 40%, 35%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>{emp.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: APP.text, marginBottom: 2 }}>{emp.name}</div>
              <div style={{ fontSize: 10, color: APP.textMuted }}>{emp.hours} ч в мае</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: APP.green }}>
                {animate ? <CountUp to={emp.pay} duration={900 + i * 100} /> : '0'} ₽
              </div>
              <div style={{
                fontSize: 9, marginTop: 2,
                color: emp.status === 'shift' ? '#FF9F0A' : APP.green,
              }}>
                {emp.status === 'shift' ? '● на смене' : '● активен'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <BottomNav active={2} admin />
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ active, admin }) {
  const tabs = admin
    ? [['🏠', 'Главная'], ['📊', 'Аналитика'], ['👥', 'Штат'], ['💰', 'Расчёт']]
    : [['🏠', 'Главная'], ['📊', 'Активность'], ['👥', 'Штат'], ['💰', 'Расчёт'], ['❓', 'FAQ']];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(28,28,30,0.92)', backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${APP.separator}`,
      display: 'flex', padding: '8px 4px 18px',
    }}>
      {tabs.map(([icon, label], i) => (
        <div key={i} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          padding: '4px 0',
        }}>
          <div style={{
            width: i === active ? 36 : 28, height: 28, borderRadius: 10,
            background: i === active ? APP.greenDim : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, transition: 'all 0.2s',
          }}>{icon}</div>
          <span style={{
            fontSize: 9, fontWeight: i === active ? 700 : 400,
            color: i === active ? APP.green : APP.textMuted,
          }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN 3D PHONE ────────────────────────────────────────────────────────────
const SCREENS_LIST = [
  { component: DashboardScreen, label: 'Дашборд сотрудника' },
  { component: PayrollScreen, label: 'Расчёт зарплаты' },
  { component: StaffScreen, label: 'Панель администратора' },
];

export default function Phone3D({ tilt = true }) {
  const containerRef = useRef(null);
  const rotX = useMotionValue(tilt ? 8 : 0);
  const rotY = useMotionValue(tilt ? -14 : 0);
  const sRotX = useSpring(rotX, { stiffness: 120, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 120, damping: 20 });

  const [screen, setScreen] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  // Mouse parallax
  useEffect(() => {
    if (!tilt) return;
    const el = document.body;
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      rotX.set(8 - dy * 6);
      rotY.set(-14 + dx * 8);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [tilt]);

  // Auto-cycle screens
  useEffect(() => {
    const t = setInterval(() => {
      setScreen(s => (s + 1) % SCREENS_LIST.length);
      setAnimKey(k => k + 1);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const Screen = SCREENS_LIST[screen].component;

  return (
    <div ref={containerRef} style={{ position: 'relative', userSelect: 'none' }}>
      {/* Glow under phone */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 3 }}
        style={{
          position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
          width: 200, height: 80, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(48,209,88,0.25) 0%, transparent 70%)',
          filter: 'blur(20px)', pointerEvents: 'none',
        }}
      />

      {/* Phone */}
      <motion.div
        style={{
          rotateX: sRotX,
          rotateY: sRotY,
          transformStyle: 'preserve-3d',
          perspective: 1200,
        }}
      >
        <div style={{
          width: 260,
          background: 'linear-gradient(145deg, #2a2a2a, #111)',
          borderRadius: 48,
          padding: '14px 10px 10px',
          border: '1.5px solid rgba(255,255,255,0.15)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.04),
            0 30px 80px rgba(0,0,0,0.9),
            0 8px 20px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
          position: 'relative',
        }}>
          {/* Side buttons */}
          <div style={{ position: 'absolute', right: -3, top: 100, width: 3, height: 30, background: '#222', borderRadius: '0 3px 3px 0' }} />
          <div style={{ position: 'absolute', left: -3, top: 80, width: 3, height: 22, background: '#222', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', left: -3, top: 110, width: 3, height: 36, background: '#222', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', left: -3, top: 154, width: 3, height: 36, background: '#222', borderRadius: '3px 0 0 3px' }} />

          {/* Dynamic island */}
          <div style={{
            width: 90, height: 26, background: '#000', borderRadius: 16,
            margin: '0 auto 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #2a2a2a' }} />
            <div style={{ width: 28, height: 4, background: '#111', borderRadius: 4 }} />
          </div>

          {/* Screen area */}
          <div style={{
            background: APP.bg,
            borderRadius: 38,
            height: 500,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${screen}-${animKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Screen animate={true} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Home bar */}
          <div style={{
            width: 80, height: 4, background: 'rgba(255,255,255,0.25)',
            borderRadius: 2, margin: '10px auto 2px',
          }} />
        </div>
      </motion.div>

      {/* Screen label + dots */}
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 12, fontWeight: 500 }}
          >
            {SCREENS_LIST[screen].label}
          </motion.div>
        </AnimatePresence>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          {SCREENS_LIST.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setScreen(i); setAnimKey(k => k + 1); }}
              animate={{ width: i === screen ? 24 : 7, background: i === screen ? '#30D158' : 'rgba(255,255,255,0.2)' }}
              style={{ height: 7, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
