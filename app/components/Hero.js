'use client';
import { motion } from 'framer-motion';
import Phone3D from './Phone3D';

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '100px 24px 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(48,209,88,0.06) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'absolute', top: '10%', left: '-10%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(48,209,88,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1160, margin: '0 auto', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 40,
      }}>
        {/* Left */}
        <div style={{ flex: 1, maxWidth: 560 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.25)',
              borderRadius: 20, padding: '6px 14px', marginBottom: 28,
            }}>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: '#30D158', display: 'inline-block' }}
              />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#30D158', letterSpacing: '0.06em' }}>TELEGRAM MINI APP · В ПРЯМОМ ЭФИРЕ</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontSize: 'clamp(38px, 4.5vw, 60px)',
              fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.03em',
              color: '#fff', marginBottom: 22,
            }}
          >
            Учёт смен и зарплат{' '}
            <span style={{
              color: '#30D158',
              textShadow: '0 0 40px rgba(48,209,88,0.4)',
            }}>прямо в Telegram</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18 }}
            style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}
          >
            Автоматизируйте расписание, считайте зарплату и отправляйте уведомления сотрудникам — всё без звонков и таблиц.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.26 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}
          >
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                background: '#30D158', color: '#000', fontWeight: 800,
                fontSize: 16, padding: '15px 30px', borderRadius: 16,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 0 30px rgba(48,209,88,0.25)',
              }}
            >
              Подключить бизнес <span style={{ fontSize: 18 }}>→</span>
            </motion.a>
            <motion.a
              href="#how"
              whileHover={{ scale: 1.03 }}
              style={{
                color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: 16,
                padding: '15px 26px', borderRadius: 16, textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Как работает
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ display: 'flex', gap: 32 }}
          >
            {[['50+', 'команд'], ['1000+', 'смен в месяц'], ['99%', 'довольных']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{num}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Phone */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-phone"
          style={{ flex: '0 0 auto' }}
        >
          <Phone3D tilt={true} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .hero-phone { display: none; } }
      `}</style>
    </section>
  );
}
