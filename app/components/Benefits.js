'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const benefits = [
  {
    icon: '⚡',
    title: 'Быстрый старт',
    desc: 'Подключите бота и начните работу за 5 минут. Не нужно обучать команду.',
  },
  {
    icon: '📱',
    title: 'Telegram-нативно',
    desc: 'Сотрудники работают там, где уже проводят время — не нужны отдельные приложения.',
  },
  {
    icon: '🔔',
    title: 'Автоуведомления',
    desc: 'Напоминания о предстоящих сменах, изменениях расписания и начислениях — автоматически.',
  },
  {
    icon: '📊',
    title: 'Прозрачная аналитика',
    desc: 'Руководитель видит статистику по каждому сотруднику и отделу в одном дашборде.',
  },
  {
    icon: '🔒',
    title: 'Безопасно',
    desc: 'Данные сотрудников хранятся в защищённой базе данных. Доступ только у администраторов.',
  },
  {
    icon: '💼',
    title: 'Для любого бизнеса',
    desc: 'Кафе, магазины, склады, офисы — система гибко настраивается под структуру компании.',
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="benefits" ref={ref} style={{
      padding: '80px 24px',
      background: 'linear-gradient(to bottom, transparent, rgba(34,197,94,0.03) 50%, transparent)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
          }}>ПРЕИМУЩЕСТВА</div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
            letterSpacing: '-0.02em', color: '#fff',
          }}>Почему выбирают HR-Bot</h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 24, padding: '28px',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                cursor: 'default',
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'rgba(34,197,94,0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 16,
              }}>{b.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{b.title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
