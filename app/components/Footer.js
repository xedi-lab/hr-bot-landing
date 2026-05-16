'use client';
import WorkixLogo from './WorkixLogo';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 16,
    }}>
      <WorkixLogo size="sm" animate={false} />
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        © 2026 Workix. Telegram Mini App для учёта смен.
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Сделано с ❤️ для малого бизнеса
      </div>
    </footer>
  );
}
