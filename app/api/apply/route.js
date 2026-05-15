export async function POST(req) {
  try {
    const { name, company, telegram, employees, comment } = await req.json();

    if (!name || !company || !telegram) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const ADMIN_ID = process.env.ADMIN_ID;

    if (!BOT_TOKEN || !ADMIN_ID) {
      console.error('Missing BOT_TOKEN or ADMIN_ID env vars');
      return Response.json({ error: 'Server config error' }, { status: 500 });
    }

    const text = [
      '🆕 *Новая заявка с лендинга*',
      '',
      `👤 *Имя:* ${name}`,
      `🏢 *Компания:* ${company}`,
      `📱 *Telegram:* ${telegram}`,
      employees ? `👥 *Сотрудников:* ${employees}` : '',
      comment ? `💬 *Комментарий:* ${comment}` : '',
    ].filter(Boolean).join('\n');

    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Telegram API error:', err);
      return Response.json({ error: 'Telegram send failed' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('Apply route error:', e);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
