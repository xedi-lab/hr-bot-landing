export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14,
        }}>⚡</div>
        <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>HR-Bot</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        © 2026 HR-Bot. Telegram Mini App для учёта смен.
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Сделано с ❤️ для малого бизнеса
      </div>
    </footer>
  );
}
