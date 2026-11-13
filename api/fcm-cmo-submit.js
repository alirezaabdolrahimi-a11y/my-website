export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ error: 'Email service is not configured' });
  const body = req.body || {};
  const allowed = ['solid', 'liquid', 'sterile'];
  if (!allowed.includes(body.formType) || !['en', 'fa', 'tr'].includes(body.language) || !body.fields || typeof body.fields !== 'object') {
    return res.status(400).json({ error: 'Invalid form payload' });
  }
  if (body.fields.website && String(body.fields.website).trim()) return res.status(200).json({ ok: true });
  delete body.fields.website;
  const fields = Object.entries(body.fields).map(([name, value]) => {
    const safeName = String(name).replace(/[<>]/g, '').slice(0, 100);
    const safeValue = (Array.isArray(value) ? value : [value]).map(v => String(v).slice(0, 4000)).join(', ');
    return '<tr><th style="text-align:left;padding:8px;border:1px solid #ddd">' + safeName + '</th><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">' + safeValue.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) + '</td></tr>';
  }).join('');
  const titles = { solid: 'Solid dosage forms', liquid: 'Non-sterile liquids', sterile: 'Sterile liquids / injectables' };
  const html = '<h2>New FCM &amp; CMO enquiry</h2><p>Form: ' + titles[body.formType] + ' | Language: ' + body.language.toUpperCase() + '</p><table style="border-collapse:collapse;width:100%">' + fields + '</table>';
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.FCM_EMAIL_FROM || 'NIAZ NET Website <onboarding@resend.dev>',
      to: ['info@niaznet.net'],
      subject: 'FCM & CMO enquiry — ' + titles[body.formType],
      html
    })
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend delivery failed:', response.status, detail.slice(0, 500));
    return res.status(502).json({ error: 'Email delivery failed' });
  }
  return res.status(200).json({ ok: true });
}