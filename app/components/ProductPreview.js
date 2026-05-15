'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Phone3D from './Phone3D';

const sections = [
  {
    tag: 'Для сотрудника',
    title: 'Всё рабочее — в одном приложении',
    desc: 'Зарплата, смены, история — в кармане. Сотрудник всегда знает сколько заработал и когда выходить.',
    features: [
      { icon: '💰', text: 'Заработок и количество смен на главном экране' },
      { icon: '📅', text: 'Следующая смена и статус присутствия' },
      { icon: '🔔', text: 'Push-уведомления о новых сменах прямо в Telegram' },
      { icon: '📱', text: 'Открывается прямо внутри Telegram — без лишних приложений' },
    ],
    tabIndex: 0,
  },
  {
    tag: 'График смен',
    title: 'Расписание на весь месяц — визуально',
    desc: 'Все плановые смены видны сразу. Сотрудник знает когда и где работает — без звонков и уточнений.',
    features: [
      { icon: '🟢', text: 'Цветовые метки: плановые, в процессе, выполненные' },
      { icon: '📆', text: 'Навигация по месяцам вперёд и назад' },
      { icon: '✅', text: 'Подтверждение присутствия одним нажатием' },
      { icon: '⚡', text: 'Смена открывается и закрывается автоматически' },
    ],
    tabIndex: 1,
  },
  {
    tag: 'Расчёт зарплат',
    title: 'Считает сама — вы только проверяете',
    desc: 'Ставка × часы + корректировки = итог. Система считает сама, бухгалтер не нужен. Экспорт в Excel за один клик.',
    features: [
      { icon: '⚡', text: 'Автоматический расчёт по почасовой ставке' },
      { icon: '✏️', text: 'Ручные корректировки с комментарием' },
      { icon: '📋', text: 'Выгрузка в Excel — один клик, готовый файл' },
      { icon: '📆', text: 'История выплат по любому периоду' },
    ],
    tabIndex: 2,
  },
  {
    tag: 'Лента событий',
    title: 'Всё что происходит — в одном месте',
    desc: 'Кто вышел, кто опоздал, какие начисления прошли — полная история в реальном времени.',
    features: [
      { icon: '🟢', text: 'Автоматическая фиксация начала и конца смены' },
      { icon: '🔔', text: 'Мгновенные уведомления при изменениях' },
      { icon: '💰', text: 'История всех начислений по сотруднику' },
      { icon: '📊', text: 'Полная хронология событий за любой период' },
    ],
    tabIndex: 3,
  },
];

function Section({ sec, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const flip = index % 2 === 1;

  return (
    <div ref={ref} style={{
      display: 'flex', alignItems: 'center',
      gap: 'clamp(40px, 5vw, 90px)',
      marginBottom: 'clamp(80px, 10vw, 130px)',
      flexDirection: flip ? 'row-reverse' : 'row',
    }} className="product-row">

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: flip ? 28 : -28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ flex: 1 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.22)',
          borderRadius: 20, padding: '5px 14px', marginBottom: 18,
          fontSize: 11, fontWeight: 700, color: '#34C759', letterSpacing: '0.06em',
        }}>{sec.tag.toUpperCase()}</div>

        <h2 style={{
          fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 900,
          letterSpacing: '-0.025em', color: '#fff', marginBottom: 14, lineHeight: 1.12,
        }}>{sec.title}</h2>

        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 28 }}>
          {sec.desc}
        </p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sec.features.map((f, i) => (
            <motion.li key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.18 + i * 0.07 }}
              style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, flexShrink: 0,
              }}>{f.icon}</div>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, paddingTop: 5 }}>
                {f.text}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Phone side */}
      <motion.div
        initial={{ opacity: 0, x: flip ? -28 : 28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ flex: '0 0 auto' }}
        className="product-phone"
      >
        <Phone3D tilt={false} staticTab={sec.tabIndex} />
      </motion.div>
    </div>
  );
}

export default function ProductPreview() {
  return (
    <section id="features" style={{ padding: '60px 24px 0', maxWidth: 1180, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <div style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20,
          padding: '5px 16px', marginBottom: 20,
          fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em',
        }}>ВОЗМОЖНОСТИ</div>
        <h2 style={{
          fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 900,
          letterSpacing: '-0.03em', color: '#fff',
        }}>Один инструмент вместо десяти</h2>
      </div>

      {sections.map((sec, i) => (
        <Section key={i} sec={sec} index={i} />
      ))}

      <style>{`
        @media (max-width: 900px) {
          .product-row { flex-direction: column !important; gap: 32px; }
          .product-phone { display: none; }
        }
      `}</style>
    </section>
  );
}
