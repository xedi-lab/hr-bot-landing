'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkixLogo from './WorkixLogo';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Возможности', href: '#features' },
    { label: 'Как работает', href: '#how' },
    { label: 'Преимущества', href: '#benefits' },
    { label: 'Контакт', href: '#apply' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <WorkixLogo size="md" animate={true} />
      </a>

      {/* Desktop links */}
      <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="desktop-nav">
        {links.map(l => (
          <a key={l.href} href={l.href} style={{
            color: 'var(--text-muted)', fontSize: 14, fontWeight: 500, padding: '6px 14px',
            borderRadius: 20, textDecoration: 'none', transition: 'color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.target.style.color = 'var(--text)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--text-muted)'; e.target.style.background = 'transparent'; }}
          >{l.label}</a>
        ))}
        <a href="#apply" style={{
          marginLeft: 8, background: 'var(--accent)', color: '#000', fontWeight: 600,
          fontSize: 14, padding: '8px 20px', borderRadius: 20, textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >Подключиться</a>
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="mobile-menu-btn"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: 8 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open
            ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
          }
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0,
              background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)', padding: '16px 24px 24px',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                color: 'var(--text)', fontSize: 17, fontWeight: 500, padding: '12px 0',
                textDecoration: 'none', borderBottom: '1px solid var(--border)',
              }}>{l.label}</a>
            ))}
            <a href="#apply" onClick={() => setOpen(false)} style={{
              marginTop: 12, background: 'var(--accent)', color: '#000', fontWeight: 700,
              fontSize: 16, padding: '14px 20px', borderRadius: 14, textDecoration: 'none',
              textAlign: 'center',
            }}>Подключиться →</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.header>
  );
}
