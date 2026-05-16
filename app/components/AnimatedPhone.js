'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated number counter
function CountUp({ target, duration = 1200, suffix = '' }) {
  const [val, setVal] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    setVal(0);
    startRef.current = performance.now();
    const animate = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * ease));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return <>{val.toLocaleString('ru-RU')}{suffix}</>;
}

const tabs = [
  { id: 'home', icon: '🏠', label: 'Главная' },
  { id: 'shifts', icon: '📅', label: 'Смены' },
  { id: 'payroll', icon: '💰', label: 'Расчёт' },
  { id: 'activity', icon: '📊', label: 'История' },
];

function HomeScreen({ visible }) {
  return (
    <div style={{ padding: '14px 12px' }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Пятница, 16 мая</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginTop: 2 }}>👋 Привет, Алексей!</div>
      </div>

      {/* Earnings card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{
          background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.05))',
          border: '1px solid rgba(34,197,94,0.3)', borderRadius: 16, padding: '14px',
          marginBottom: 10,
        }}
      >
        <div style={{ fontSize: 9, color: 'rgba(34,197,94,0.7)', marginBottom: 4, fontWeight: 600 }}>К ВЫПЛАТЕ В МАЕ</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#22c55e', letterSpacing: '-0.03em', lineHeight: 1 }}>
          {visible ? <CountUp target={24800} duration={1000} suffix=" ₽" /> : '0 ₽'}
        </div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 5 }}>96 ч · ставка 258 ₽/ч</div>
      </motion.div>

      {/* Next shift */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 13, padding: '11px 12px', marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 10,
        }}
      >
        <div style={{ fontSize: 22 }}>📅</div>
        <div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>Следующая смена</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Завтра, 09:00 – 18:00</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>Офис на Ленина</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
            boxShadow: '0 0 6px #22c55e',
          }} />
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ display: 'flex', gap: 8 }}
      >
        {[
          { icon: '🕐', val: visible ? <CountUp target={38} duration={900} suffix="ч" /> : '0ч', label: 'эта неделя' },
          { icon: '✅', val: visible ? <CountUp target={12} duration={800} /> : '0', label: 'смен в мае' },
          { icon: '⭐', val: '4.9', label: 'рейтинг' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12, padding: '10px 6px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, marginBottom: 2 }}>{s.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{s.val}</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const plannedShifts = [
  { date: '17 мая', day: 'Сб', time: '09:00–18:00', loc: 'Офис на Ленина', color: '#22c55e' },
  { date: '19 мая', day: 'Пн', time: '10:00–19:00', loc: 'Склад №2', color: '#3b82f6' },
  { date: '21 мая', day: 'Ср', time: '09:00–18:00', loc: 'Офис на Ленина', color: '#22c55e' },
  { date: '23 мая', day: 'Пт', time: '12:00–21:00', loc: 'ТЦ Галерея', color: '#f59e0b' },
];

function ShiftsScreen() {
  return (
    <div style={{ padding: '14px 12px' }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 12 }}>📅 Плановые смены</div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 10, fontWeight: 600 }}>МАЙ 2026 · 4 СМЕНЫ</div>
      {plannedShifts.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          style={{
            display: 'flex', gap: 10, alignItems: 'center',
            marginBottom: 8, padding: '10px 12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            borderLeft: `3px solid ${s.color}`,
          }}
        >
          <div style={{ textAlign: 'center', minWidth: 28 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.date.split(' ')[0]}</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)' }}>{s.day}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{s.time}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{s.loc}</div>
          </div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
        </motion.div>
      ))}
    </div>
  );
}

function PayrollScreen({ visible }) {
  return (
    <div style={{ padding: '14px 12px' }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 4 }}>💰 Расчёт зарплаты</div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Май 2026</div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        style={{
          background: 'linear-gradient(135deg, rgba(34,197,94,0.18), rgba(34,197,94,0.05))',
          border: '1px solid rgba(34,197,94,0.25)', borderRadius: 16,
          padding: '16px 14px', marginBottom: 12, textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 9, color: 'rgba(34,197,94,0.6)', marginBottom: 6, fontWeight: 600 }}>ИТОГО К ВЫПЛАТЕ</div>
        <div style={{ fontSize: 30, fontWeight: 900, color: '#22c55e', letterSpacing: '-0.03em' }}>
          {visible ? <CountUp target={24800} duration={1200} suffix=" ₽" /> : '0 ₽'}
        </div>
      </motion.div>

      {[
        ['Часов отработано', visible ? <CountUp target={96} duration={900} suffix=" ч" /> : '0'],
        ['Ставка', '258 ₽/ч'],
        ['Базовый расчёт', visible ? <CountUp target={24768} duration={1100} suffix=" ₽" /> : '0'],
        ['Корректировка', '+32 ₽'],
      ].map(([label, val], i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.07 }}
          style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
            fontSize: 10,
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
          <span style={{ color: '#fff', fontWeight: 700 }}>{val}</span>
        </motion.div>
      ))}
    </div>
  );
}

const activityItems = [
  { time: 'Сегодня 09:02', text: 'Смена началась', icon: '🟢', color: '#22c55e' },
  { time: 'Вчера 18:00', text: 'Смена завершена · 9ч', icon: '✅', color: '#22c55e' },
  { time: 'Вчера 09:01', text: 'Смена началась', icon: '🟢', color: '#22c55e' },
  { time: '15 мая 18:01', text: 'Смена завершена · 8ч', icon: '✅', color: '#22c55e' },
  { time: '15 мая', text: 'Назначена смена на 17 мая', icon: '📅', color: '#3b82f6' },
];

function ActivityScreen() {
  return (
    <div style={{ padding: '14px 12px' }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 12 }}>📊 История активности</div>
      {activityItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            marginBottom: 10, position: 'relative',
          }}
        >
          {/* Line */}
          {i < activityItems.length - 1 && (
            <div style={{
              position: 'absolute', left: 11, top: 22, width: 1, height: 'calc(100% + 2px)',
              background: 'rgba(255,255,255,0.06)',
            }} />
          )}
          <div style={{
            width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
            background: `${item.color}22`, border: `1px solid ${item.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, zIndex: 1,
          }}>{item.icon}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{item.text}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{item.time}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const SCREENS = {
  home: HomeScreen,
  shifts: ShiftsScreen,
  payroll: PayrollScreen,
  activity: ActivityScreen,
};

const TAB_DURATION = 3500; // ms per tab

export default function AnimatedPhone() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [notif, setNotif] = useState(false);

  // Auto-cycle tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setActiveTab(prev => (prev + 1) % tabs.length);
        setIsVisible(true);
      }, 200);
    }, TAB_DURATION);
    return () => clearInterval(interval);
  }, []);

  // Show notification on shifts tab
  useEffect(() => {
    if (tabs[activeTab].id === 'shifts') {
      const t = setTimeout(() => setNotif(true), 1500);
      return () => clearTimeout(t);
    } else {
      setNotif(false);
    }
  }, [activeTab]);

  const tab = tabs[activeTab];
  const Screen = SCREENS[tab.id];

  return (
    <div style={{ position: 'relative' }}>
      {/* Notification popup */}
      <AnimatePresence>
        {notif && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            style={{
              position: 'absolute', top: -56, left: 0, right: 0,
              background: 'rgba(30,30,30,0.95)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(20px)',
              borderRadius: 14, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
              zIndex: 10,
            }}
          >
            <div style={{
              width: 30, height: 30, borderRadius: 8, background: 'rgba(34,197,94,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0,
            }}>⚡</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Workix</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Назначена новая смена на 19 мая</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone shell */}
      <div style={{
        width: 230, background: '#0e0e0e', borderRadius: 42,
        padding: '14px 10px 10px',
        border: '1.5px solid rgba(255,255,255,0.1)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(34,197,94,0.06)',
        position: 'relative',
      }}>
        {/* Dynamic island */}
        <div style={{
          width: 70, height: 22, background: '#000', borderRadius: 20,
          margin: '0 auto 10px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 6,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }} />
          <div style={{ flex: 1, height: 2, background: '#111', borderRadius: 2 }} />
        </div>

        {/* Screen */}
        <div style={{
          background: '#141414', borderRadius: 32,
          minHeight: 390, overflow: 'hidden', position: 'relative',
        }}>
          {/* App top bar */}
          <div style={{
            padding: '10px 14px 8px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>Work</span>
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.03em', color: '#22c55e' }}>ix</span>
          </div>

          {/* Screen content */}
          <div style={{ minHeight: 350, overflowY: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Screen visible={isVisible} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom nav */}
          <div style={{
            display: 'flex', justifyContent: 'space-around',
            padding: '8px 4px 10px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(14,14,14,0.9)',
          }}>
            {tabs.map((t, i) => {
              const active = i === activeTab;
              return (
                <button
                  key={t.id}
                  onClick={() => { setActiveTab(i); setIsVisible(true); }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    padding: '4px 8px', borderRadius: 10,
                    transition: 'background 0.2s',
                    position: 'relative',
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="tab-bg"
                      style={{
                        position: 'absolute', inset: 0, borderRadius: 10,
                        background: 'rgba(34,197,94,0.12)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span style={{ fontSize: 16, position: 'relative' }}>{t.icon}</span>
                  <span style={{
                    fontSize: 7, fontWeight: active ? 700 : 500, position: 'relative',
                    color: active ? '#22c55e' : 'rgba(255,255,255,0.3)',
                    transition: 'color 0.2s',
                  }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Home indicator */}
        <div style={{
          width: 60, height: 3, background: 'rgba(255,255,255,0.15)',
          borderRadius: 2, margin: '8px auto 0',
        }} />
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        {tabs.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === activeTab ? 20 : 6, background: i === activeTab ? '#22c55e' : 'rgba(255,255,255,0.2)' }}
            transition={{ duration: 0.3 }}
            style={{ height: 6, borderRadius: 3, cursor: 'pointer' }}
            onClick={() => setActiveTab(i)}
          />
        ))}
      </div>
    </div>
  );
}
