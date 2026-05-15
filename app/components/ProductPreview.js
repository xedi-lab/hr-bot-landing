'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function PhoneDashboard() {
  return (
    <div style={{
      width: 200, background: '#111', borderRadius: 32, padding: '10px 8px',
      border: '1.5px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ background: '#161616', borderRadius: 24, padding: '14px 10px', minHeight: 340 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 12 }}>📊 Аналитика</div>
        {/* Bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginBottom: 12 }}>
          {[60,80,45,90,70,55,85].map((h, i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
              <div style={{
                width: '100%', height: `${h}%`,
                background: i === 3 ? '#22c55e' : 'rgba(255,255,255,0.1)',
                borderRadius: '4px 4px 0 0',
              }} />
              <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>
                {['П','В','С','Ч','П','С','В'][i]}
              </span>
            </div>
          ))}
        </div>
        {/* Stats */}
        {[['Часов в неделю','42ч'],['Смен в месяц','18'],['Переработки','4ч']].map(([label, val]) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{label}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{val}</span>
          </div>
        ))}
        <div style={{
          marginTop: 14, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: 10, padding: '10px 12px',
        }}>
          <div style={{ fontSize: 8, color: '#22c55e88', marginBottom: 2 }}>Расчётный заработок</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#22c55e' }}>31 640 ₽</div>
        </div>
      </div>
    </div>
  );
}

function PhoneSchedule() {
  const days = [
    { d: 'Пн', shifts: [{ s: '9:00', e: '18:00', loc: 'Офис' }] },
    { d: 'Вт', shifts: [] },
    { d: 'Ср', shifts: [{ s: '12:00', e: '21:00', loc: 'Склад' }] },
    { d: 'Чт', shifts: [{ s: '9:00', e: '18:00', loc: 'Офис' }] },
    { d: 'Пт', shifts: [] },
  ];
  return (
    <div style={{
      width: 200, background: '#111', borderRadius: 32, padding: '10px 8px',
      border: '1.5px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ background: '#161616', borderRadius: 24, padding: '14px 10px', minHeight: 340 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 12 }}>📅 Расписание</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>Май 2026</div>
        {days.map(({ d, shifts }) => (
          <div key={d} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 4, fontWeight: 600 }}>{d}</div>
            {shifts.length === 0
              ? <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)', paddingLeft: 8 }}>Выходной</div>
              : shifts.map((sh, i) => (
                <div key={i} style={{
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: 8, padding: '6px 8px',
                  display: 'flex', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 9, color: '#22c55e', fontWeight: 600 }}>{sh.s}–{sh.e}</span>
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)' }}>{sh.loc}</span>
                </div>
              ))
            }
          </div>
        ))}
      </div>
    </div>
  );
}

const sections = [
  {
    tag: '📱 Для сотрудников',
    title: 'Всё под рукой в одном месте',
    desc: 'Сотрудники видят расписание, историю смен и начисленную зарплату прямо в Telegram — без звонков и бумажных журналов.',
    features: ['Просмотр плановых смен', 'История отработанных часов', 'Расчёт заработка в реальном времени', 'Уведомления об изменениях'],
    phone: <PhoneDashboard />,
    flip: false,
  },
  {
    tag: '📅 Расписание',
    title: 'Планируйте смены без головной боли',
    desc: 'Назначайте смены, указывайте место работы и автоматически уведомляйте команду — изменения моментально отражаются у сотрудников.',
    features: ['Плановые смены на любую дату', 'Несколько локаций и объектов', 'Автоматические Telegram-уведомления', 'Коллаборация нескольких администраторов'],
    phone: <PhoneSchedule />,
    flip: true,
  },
  {
    tag: '💰 Расчёт зарплат',
    title: 'Расчёт за секунды, выгрузка за клик',
    desc: 'Система сама считает итоговую зарплату с учётом ставки, переработок и корректировок. Экспорт в Excel одним нажатием.',
    features: ['Почасовая ставка на сотрудника', 'Ручные корректировки', 'Фильтр по месяцам', 'Экспорт в Excel'],
    phone: <PhoneDashboard />,
    flip: false,
  },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProductPreview() {
  return (
    <section id="features" style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
      {sections.map((sec, idx) => (
        <div key={idx} style={{
          display: 'flex', alignItems: 'center', gap: 60,
          marginBottom: 100, flexDirection: sec.flip ? 'row-reverse' : 'row',
        }} className="product-row">
          <FadeIn delay={0}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-block', background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 20, padding: '5px 14px', marginBottom: 20,
                fontSize: 12, fontWeight: 600, color: '#22c55e',
              }}>{sec.tag}</div>
              <h2 style={{
                fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800,
                letterSpacing: '-0.02em', color: '#fff', marginBottom: 16, lineHeight: 1.15,
              }}>{sec.title}</h2>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 28 }}>{sec.desc}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sec.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'rgba(34,197,94,0.15)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0,
                    }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }} className="product-phone">
              {sec.phone}
            </div>
          </FadeIn>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .product-row { flex-direction: column !important; gap: 32px; margin-bottom: 64px !important; }
          .product-phone { display: none; }
        }
      `}</style>
    </section>
  );
}
