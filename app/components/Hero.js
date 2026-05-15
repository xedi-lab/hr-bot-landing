'use client';
import { motion } from 'framer-motion';
import AnimatedPhone from './AnimatedPhone';

function PhoneHeroOld() {
  return (
    <div style={{
      width: 220, background: '#111', borderRadius: 36, padding: '12px 10px',
      border: '1.5px solid rgba(255,255,255,0.12)', boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
      fontFamily: 'inherit',
    }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px 8px', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
        <span>9:41</span><span>●●●</span>
      </div>
      {/* Screen */}
      <div style={{ background: '#1a1a1a', borderRadius: 28, padding: '16px 12px', minHeight: 380 }}>
        {/* Greeting */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Добро пожаловать</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>👋 Алексей</div>
        </div>
        {/* Balance card */}
        <div style={{
          background: 'linear-gradient(135deg, #22c55e22, #22c55e08)',
          border: '1px solid #22c55e33',
          borderRadius: 16, padding: '12px 14px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 10, color: '#22c55e88', marginBottom: 4 }}>К выплате в этом месяце</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#22c55e', letterSpacing: '-0.03em' }}>24 800 ₽</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>96 часов · ставка 258 ₽/ч</div>
        </div>
        {/* Next shift */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: '10px 12px', marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ fontSize: 20 }}>📅</div>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>Следующая смена</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>Завтра, 09:00–18:00</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>Офис на Ленина</div>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[['🕐','38ч','эта нед.'],['✅','12','смен']].map(([ico,val,lbl]) => (
            <div key={lbl} style={{
              flex:1, background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'10px 8px', textAlign:'center',
            }}>
              <div style={{fontSize:14}}>{ico}</div>
              <div style={{fontSize:14,fontWeight:700,color:'#fff'}}>{val}</div>
              <div style={{fontSize:8,color:'rgba(255,255,255,0.35)'}}>{lbl}</div>
            </div>
          ))}
        </div>
        {/* Nav dots */}
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {['🏠','📊','👥','💰','❓'].map((ico, i) => (
            <div key={i} style={{
              fontSize: 16, opacity: i === 0 ? 1 : 0.35,
              padding: '4px 6px', borderRadius: 8,
              background: i === 0 ? 'rgba(34,197,94,0.15)' : 'transparent',
            }}>{ico}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '100px 24px 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1100, margin: '0 auto', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 60,
      }}>
        {/* Left: text */}
        <div style={{ flex: 1, maxWidth: 560 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: 20, padding: '6px 14px', marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', letterSpacing: '0.05em' }}>TELEGRAM MINI APP</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(36px, 5vw, 58px)',
              fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em',
              color: '#fff', marginBottom: 20,
            }}
          >
            Учёт смен и зарплат <span style={{ color: '#22c55e' }}>прямо в Telegram</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 36 }}
          >
            Автоматизируйте расписание, считайте зарплату и отправляйте уведомления сотрудникам — всё без лишних звонков и таблиц.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <a href="#apply" style={{
              background: '#22c55e', color: '#000', fontWeight: 700,
              fontSize: 16, padding: '14px 28px', borderRadius: 14,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'transform 0.15s, opacity 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Подключить для бизнеса <span>→</span>
            </a>
            <a href="#how" style={{
              color: 'var(--text-muted)', fontWeight: 600, fontSize: 16,
              padding: '14px 24px', borderRadius: 14, textDecoration: 'none',
              border: '1px solid var(--border)', transition: 'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              Как это работает
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <div style={{ display: 'flex' }}>
              {['👨‍💼','👩‍💼','👨‍🍳','👩‍🔧'].map((e, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `hsl(${i*60},40%,30%)`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  marginLeft: i > 0 ? -10 : 0, border: '2px solid var(--bg)',
                }}>{e}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>50+ команд уже используют</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>малый и средний бизнес по всей России</div>
            </div>
          </motion.div>
        </div>

        {/* Right: phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            flex: '0 0 auto',
            display: 'flex', justifyContent: 'center',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
          }}
          className="hero-phone"
        >
          <AnimatedPhone />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-phone { display: none; }
        }
      `}</style>
    </section>
  );
}
