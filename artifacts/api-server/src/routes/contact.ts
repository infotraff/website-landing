import { Router } from 'express';
import { getUncachableGoogleSheetClient } from '../lib/googleSheets.js';
import { getUncachableResendClient } from '../lib/resend.js';

const router = Router();

const SPREADSHEET_ID = process.env.CONTACT_SPREADSHEET_ID || '';
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || 'info@infotraff.org';
const SHEET_NAME = 'Demo Requests';

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  industry?: string;
  message?: string;
}

async function appendToSheet(data: ContactPayload) {
  const sheets = await getUncachableGoogleSheetClient();

  const row = [
    new Date().toISOString(),
    data.name,
    data.company,
    data.email,
    data.phone || '',
    data.industry || '',
    data.message || '',
  ];

  if (!SPREADSHEET_ID) {
    console.warn('[contact] CONTACT_SPREADSHEET_ID not set — skipping Google Sheets append');
    return;
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    });
  } catch (err: any) {
    console.error('[contact] Google Sheets append failed:', err?.message);
  }
}

async function sendNotificationEmail(data: ContactPayload) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();

    const from = fromEmail || 'noreply@infotraff.org';

    await client.emails.send({
      from,
      to: [NOTIFY_EMAIL],
      replyTo: data.email,
      subject: `New Demo Request from ${data.name} — ${data.company}`,
      html: `
        <h2>New Demo Request</h2>
        <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif">
          <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Company</strong></td><td>${data.company}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td>${data.phone || '—'}</td></tr>
          <tr><td><strong>Industry</strong></td><td>${data.industry || '—'}</td></tr>
          <tr><td><strong>Message</strong></td><td>${data.message || '—'}</td></tr>
          <tr><td><strong>Submitted at</strong></td><td>${new Date().toUTCString()}</td></tr>
        </table>
      `,
    });

    await client.emails.send({
      from,
      to: [data.email],
      subject: 'We received your demo request — InfoTraff',
      html: `
        <p>Hi ${data.name},</p>
        <p>Thanks for reaching out to <strong>InfoTraff</strong>! We received your request and our team will get back to you within 24 hours to schedule your live demo.</p>
        <p>In the meantime, feel free to reply to this email with any questions.</p>
        <br/>
        <p>Best regards,<br/>The InfoTraff Team<br/><a href="https://infotraff.org">infotraff.org</a></p>
      `,
    });
  } catch (err: any) {
    console.error('[contact] Resend email failed:', err?.message);
  }
}

router.post('/contact', async (req, res) => {
  const { name, company, email, phone, industry, message } = req.body as ContactPayload;

  if (!name || !company || !email) {
    res.status(400).json({ error: 'name, company, and email are required' });
    return;
  }

  const payload: ContactPayload = { name, company, email, phone, industry, message };

  await Promise.all([appendToSheet(payload), sendNotificationEmail(payload)]);

  res.json({ success: true });
});

export default router;
