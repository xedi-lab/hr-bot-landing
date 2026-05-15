'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { DashboardScreen, PayrollScreen, StaffScreen } from './Phone3D';

const APP = {
  bg: '#1C1C1E', surface: '#2C2C2E', green: '#30D158',
  greenDim: 'rgba(48,209,88,0.15)', greenBorder: 'rgba(48,209,88,0.25)',
  textMuted: 'rgba(255,255,255,0.5)', separator: 'rgba(255,255,255,0.08)',
};

const sections = [
  {
    tag: 'Для сотрудника',
    title: 'Всё рабочее — в одном приложении',
    desc: 'Зарплата, смены, история — в кармане. Сотрудник всегда знает сколько заработал и когда выходить.',
    features: [
      { icon: '💰', text: 'Зарплата в реальном времени — без ожидания расчётного листа' },
      { icon: '📅', text: 'Следующая смена всегда на главном экране' },
      { icon: '📊', text: 'История всех смен и начислений по месяцам' },
      { icon: '🔔', text: 'Push-уведомления о новых сменах прямо в Telegram' },
    ],
    Screen: DashboardScreen,
    highlight: 'earnings',
  },
  {
    tag: 'Расчёт зарплат',
    title: 'Считает сама — вы только проверяете',
    desc: 'Система считает зарплату по ставке и отработанным часам, учитывает корректировки. Экспорт в Excel одним нажатием.',
    features: [
      { icon: '⚡', text: 'Автоматический расчёт по почасовой ставке' },
      { icon: '✏️', text: 'Ручные корректировки с комментарием' },
      { icon: '📋', text: 'Выгрузка в Excel за один клик' },
      { icon: '📆', text: 'История выплат по любому месяцу' },
    ],
    Screen: PayrollScreen,
    highlight: 'payroll',
  },
  {
    tag: 'Для администратора',
    title: 'Весь штат — как на ладони',
    desc: 'Одна панель для всей команды: видите кто сейчас на смене, сколько часов отработал каждый и кому сколько начислено.',
    features: [
      { icon: '👥', text: 'Список сотрудников с балансом и статусом' },
      { icon: '🟢', text: 'Онлайн-индикатор — кто сейчас на смене' },
      { icon: '📈', text: 'Аналитика по каждому сотруднику' },
      { icon: '⚙️', text: 'Управление ставками без перезапуска' },
    ],
    Screen: StaffScreen,
    highlight: 'staff',
  },
];

function PhoneFrame({ Screen, active }) {
  const [key, setKey] = useState(0);
  useEffect(() => { if (active) setKey(k => k + 1); }, [active]);

  return (
    <div style={{
      width: 240,
      background: 'linear-gradient(145deg, #2a2a2a, #111)',
      borderRadius: 44, padding: '12px 9px 9px',
      border: '1.5px solid rgba(255,255,255,0.12)',
      boxShadow: `
        0 0 0 1px rgba(255,255,255,0.04),
        0 40px 100px rgba(0,0,0,0.8),
        0 0 60px rgba(48,209,88,0.06)
      `,
      position: 'relative',
    }}>
      {/* Side buttons */}
      <div style={{ position: 'absolute', right: -3, top: 90, width: 3, height: 28, background: '#1e1e1e', borderRadius: '0 3px 3px 0' }} />
      <div style={{ position: 'absolute', left: -3, top: 74, width: 3, height: 20, background: '#1e1e1e', borderRadius: '3px 0 0 3px' }} />
      <div style={{ position: 'absolute', left: -3, top: 102, width: 3, height: 34, background: '#1e1e1e', borderRadius: '3px 0 0 3px' }} />
      <div style={{ position: 'absolute', left: -3, top: 144, width: 3, height: 34, background: '#1e1e1e', borderRadius: '3px 0 0 3px' }} />

      {/* Dynamic island */}
      <div style={{
        width: 80, height: 24, background: '#000', borderRadius: 14,
        margin: '0 auto 9px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #2a2a2a' }} />
        <div style={{ width: 22, height: 3, background: '#111', borderRadius: 3 }} />
      </div>

      {/* Screen */}
      <div style={{
        background: APP.bg, borderRadius: 34, height: 460,
        overflow: 'hidden', position: 'relative',
      }}>
        <AnimatePresence mode="wait">
          <motion.div key={key}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Screen animate={active} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Home bar */}
      <div style={{ width: 70, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, margin: '8px auto 1px' }} />
    </div>
  );
}

function Section({ sec, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const flip = index % 2 === 1;

  return (
    <div ref={ref} style={{
      display: 'flex', alignItems: 'center',
      gap: 'clamp(40px, 6vw, 100px)',
      marginBottom: 'clamp(80px, 10vw, 140px)',
      flexDirection: flip ? 'row-reverse' : 'row',
    }} className="product-row">

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: flip ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ flex: 1 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: APP.greenDim, border: `1px solid ${APP.greenBorder}`,
          borderRadius: 20, padding: '5px 14px', marginBottom: 20,
          fontSize: 11, fontWeight: 700, color: APP.green, letterSpacing: '0.06em',
        }}>{sec.tag.toUpperCase()}</div>

        <h2 style={{
          fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 900,
          letterSpacing: '-0.025em', color: '#fff', marginBottom: 16, lineHeight: 1.12,
        }}>{sec.title}</h2>

        <p style={{ fontSize: 17, color: APP.textMuted, lineHeight: 1.65, marginBottom: 32 }}>{sec.desc}</p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sec.features.map((f, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 10, background: APP.greenDim,
                border: `1px solid ${APP.greenBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }}>{f.icon}</div>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, paddingTop: 6 }}>{f.text}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, x: flip ? -30 : 30, rotateY: flip ? 8 : -8 }}
        animate={inView ? { opacity: 1, x: 0, rotateY: flip ? 3 : -3 } : {}}
        transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          flex: '0 0 auto',
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="product-phone"
      >
        <PhoneFrame Screen={sec.Screen} active={inView} />
      </motion.div>
    </div>
  );
}

export default function ProductPreview() {
  return (
    <section id="features" style={{ padding: '20px 24px 0', maxWidth: 1160, margin: '0 auto' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <div style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20,
          padding: '5px 16px', marginBottom: 20, fontSize: 12, fontWeight: 600,
          color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em',
        }}>ВОЗМОЖНОСТИ</div>
        <h2 style={{
          fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900,
          letterSpacing: '-0.025em', color: '#fff',
        }}>Реальное приложение. Реальные данные.</h2>
      </div>

      {sections.map((sec, i) => (
        <Section key={i} sec={sec} index={i} />
      ))}

      <style>{`
        @media (max-width: 860px) {
          .product-row { flex-direction: column !important; gap: 32px; }
          .product-phone { display: none; }
        }
      `}</style>
    </section>
  );
}
