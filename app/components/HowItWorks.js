'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    icon: '💬',
    title: 'Напишите боту в Telegram',
    desc: 'Найдите @hr_shift_bot в Telegram и нажмите Start. Введите имя и фамилию для регистрации.',
  },
  {
    num: '02',
    icon: '✅',
    title: 'Администратор одобряет заявку',
    desc: 'Запрос мгновенно приходит руководителю. Одно нажатие — и сотрудник добавлен в систему.',
  },
  {
    num: '03',
    icon: '📅',
    title: 'Смены назначаются автоматически',
    desc: 'Администратор планирует смены через удобный интерфейс, сотрудник получает уведомление.',
  },
  {
    num: '04',
    icon: '🕐',
    title: 'Учёт рабочего времени',
    desc: 'Начало и конец смены фиксируются в системе. Часы накапливаются и доступны в реальном времени.',
  },
  {
    num: '05',
    icon: '💰',
    title: 'Зарплата рассчитана и выгружена',
    desc: 'В конце месяца система автоматически считает итоговую зарплату. Экспорт в Excel за один клик.',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="how" ref={ref} style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <div style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20,
          padding: '5px 16px', marginBottom: 20, fontSize: 12, fontWeight: 600,
          color: 'var(--text-muted)', letterSpacing: '0.05em',
        }}>КАК ЭТО РАБОТАЕТ</div>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
          letterSpacing: '-0.02em', color: '#fff',
        }}>От регистрации до выплаты — 5 шагов</h2>
      </motion.div>

      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 31, top: 0, bottom: 0, width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent)',
        }} className="step-line" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'flex', gap: 24, marginBottom: 32, alignItems: 'flex-start',
            }}
          >
            {/* Step indicator */}
            <div style={{
              width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
              background: 'var(--surface)', border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', fontSize: 20, position: 'relative', zIndex: 1,
            }}>
              {step.icon}
            </div>
            {/* Content */}
            <div style={{
              flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 20, padding: '20px 24px',
              transition: 'background 0.2s',
            }}>
              <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, marginBottom: 6, letterSpacing: '0.05em' }}>
                ШАГ {step.num}
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{step.title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .step-line { left: 27px; }
        }
      `}</style>
    </section>
  );
}
