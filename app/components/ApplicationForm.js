'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function ApplicationForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', company: '', telegram: '', employees: '', comment: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.company || !form.telegram) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
    padding: '14px 16px', color: '#fff', fontSize: 15, outline: 'none',
    transition: 'border-color 0.2s', fontFamily: 'inherit',
  };

  const labelStyle = { display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 500 };

  return (
    <section id="apply" ref={ref} style={{ padding: '80px 24px 120px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{
            display: 'inline-block', background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.25)', borderRadius: 20,
            padding: '5px 16px', marginBottom: 20, fontSize: 12, fontWeight: 600,
            color: '#22c55e', letterSpacing: '0.05em',
          }}>ПОДКЛЮЧЕНИЕ</div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
            letterSpacing: '-0.02em', color: '#fff', marginBottom: 14,
          }}>Попробуйте бесплатно</h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Оставьте заявку — мы свяжемся в течение 24 часов и поможем с настройкой.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 28, padding: '36px',
          }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '20px 0' }}
              >
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Заявка отправлена!</div>
                <div style={{ fontSize: 15, color: 'var(--text-muted)' }}>
                  Мы свяжемся с вами в Telegram в течение 24 часов.
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Ваше имя *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="Иван Иванов" required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Название компании *</label>
                    <input
                      name="company" value={form.company} onChange={handleChange}
                      placeholder="ООО Ромашка" required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Telegram *</label>
                    <input
                      name="telegram" value={form.telegram} onChange={handleChange}
                      placeholder="@username" required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Количество сотрудников</label>
                    <select
                      name="employees" value={form.employees} onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                      <option value="" style={{ background: '#222' }}>Выберите...</option>
                      <option value="1-5" style={{ background: '#222' }}>1–5 человек</option>
                      <option value="6-15" style={{ background: '#222' }}>6–15 человек</option>
                      <option value="16-50" style={{ background: '#222' }}>16–50 человек</option>
                      <option value="50+" style={{ background: '#222' }}>Более 50</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Комментарий (необязательно)</label>
                    <textarea
                      name="comment" value={form.comment} onChange={handleChange}
                      placeholder="Расскажите о вашем бизнесе и пожеланиях..."
                      rows={3}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                      onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {status === 'error' && (
                    <div style={{
                      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#f87171',
                    }}>
                      Ошибка отправки. Напишите нам напрямую в Telegram.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      background: status === 'loading' ? 'rgba(34,197,94,0.5)' : '#22c55e',
                      color: '#000', fontWeight: 700, fontSize: 16,
                      padding: '16px', borderRadius: 14, border: 'none',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      transition: 'opacity 0.2s, transform 0.15s',
                    }}
                    onMouseEnter={e => { if (status !== 'loading') e.target.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  >
                    {status === 'loading' ? 'Отправляем...' : 'Отправить заявку →'}
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
