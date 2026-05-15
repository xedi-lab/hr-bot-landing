'use client';
import { motion } from 'framer-motion';
import Phone3D from './Phone3D';

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '100px 24px 80px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient bg */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 75% 45%, rgba(52,199,89,0.07) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', top: '15%', left: '-5%', width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(52,199,89,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>

        {/* ── Left ── */}
        <div style={{ flex: 1, maxWidth: 580 }}>

          {/* Tag */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.22)',
              borderRadius: 20, padding: '6px 14px', marginBottom: 30,
            }}>
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: '#34C759', display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#34C759', letterSpacing: '0.06em' }}>TELEGRAM MINI APP · НОВЫЙ СТАНДАРТ</span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            style={{ fontSize: 'clamp(38px, 4.5vw, 62px)', fontWeight: 900, lineHeight: 1.05,
              letterSpacing: '-0.035em', color: '#fff', marginBottom: 10 }}>
            Забудьте про Excel
          </motion.h1>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.14 }}
            style={{ fontSize: 'clamp(38px, 4.5vw, 62px)', fontWeight: 900, lineHeight: 1.05,
              letterSpacing: '-0.035em', marginBottom: 24,
              background: 'linear-gradient(90deg, #34C759 0%, #30D158 50%, #4CD964 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            и таблицы CRM
          </motion.h1>

          {/* Subtext */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 12, maxWidth: 500 }}>
            HR-Bot — это новый шаг для малого бизнеса. Расписание, учёт часов и расчёт зарплат работают сами — прямо внутри Telegram.
          </motion.p>

          {/* Value props */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 36 }}>
            {[
              'Смены назначаются и закрываются автоматически',
              'Зарплата считается по ставке без участия бухгалтера',
              'Сотрудники видят всё в Telegram — никаких новых приложений',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(52,199,89,0.15)',
                  border: '1px solid rgba(52,199,89,0.3)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 10, color: '#34C759', flexShrink: 0, fontWeight: 700 }}>✓</div>
                {text}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
            <motion.a href="#apply" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                background: '#34C759', color: '#000', fontWeight: 800, fontSize: 16,
                padding: '15px 32px', borderRadius: 16, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 0 36px rgba(52,199,89,0.28)',
              }}>
              Подключить бизнес <span style={{ fontSize: 18 }}>→</span>
            </motion.a>
            <motion.a href="#how" whileHover={{ scale: 1.03 }}
              style={{
                color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: 16,
                padding: '15px 26px', borderRadius: 16, textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
              Как работает
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.46 }}
            style={{ display: 'flex', gap: 0 }}>
            {[
              ['50+', 'команд уже используют'],
              ['0 мин', 'на обучение сотрудников'],
              ['∞', 'меньше ручной работы'],
            ].map(([num, label], i) => (
              <div key={i} style={{ flex: 1, paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', marginLeft: i > 0 ? 24 : 0 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, lineHeight: 1.3 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Phone ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-phone"
          style={{ flex: '0 0 auto' }}
        >
          <Phone3D tilt={true} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 960px) { .hero-phone { display: none; } }
      `}</style>
    </section>
  );
}
