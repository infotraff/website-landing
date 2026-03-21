import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import { Resend } from 'resend';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getSheetsClient() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY not set');
  const key = JSON.parse(keyJson);
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY not set');
  return {
    client: new Resend(apiKey),
    fromEmail: process.env.RESEND_FROM_EMAIL || 'noreply@infotraff.org',
  };
}

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'InfoTraff API' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/contact', async (req, res) => {
  const { name, company, email, phone, industry, message } = req.body;

  if (!name || !company || !email) {
    res.status(400).json({ error: 'name, company, and email are required' });
    return;
  }

  const SPREADSHEET_ID = process.env.CONTACT_SPREADSHEET_ID;
  const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || 'info@infotraff.org';

  await Promise.all([
    (async () => {
      if (!SPREADSHEET_ID) return;
      try {
        const sheets = await getSheetsClient();
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Demo Requests!A1',
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          requestBody: {
            values: [[
              new Date().toISOString(),
              name, company, email,
              phone || '', industry || '', message || '',
            ]],
          },
        });
      } catch (e) {
        console.error('Sheets error:', e.message);
      }
    })(),
    (async () => {
      try {
        const { client, fromEmail } = getResendClient();
        await Promise.all([
          client.emails.send({
            from: fromEmail,
            to: [NOTIFY_EMAIL],
            replyTo: email,
            subject: `New Demo Request from ${name} — ${company}`,
            html: `<h2>New Demo Request</h2>
              <table cellpadding="8" style="font-family:sans-serif">
                <tr><td><b>Name</b></td><td>${name}</td></tr>
                <tr><td><b>Company</b></td><td>${company}</td></tr>
                <tr><td><b>Email</b></td><td><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td><b>Phone</b></td><td>${phone || '—'}</td></tr>
                <tr><td><b>Industry</b></td><td>${industry || '—'}</td></tr>
                <tr><td><b>Message</b></td><td>${message || '—'}</td></tr>
                <tr><td><b>Submitted</b></td><td>${new Date().toUTCString()}</td></tr>
              </table>`,
          }),
          client.emails.send({
            from: fromEmail,
            to: [email],
            subject: 'We received your demo request — InfoTraff',
            html: `<p>Hi ${name},</p>
              <p>Thanks for reaching out to <strong>InfoTraff</strong>! We received your request and our team will get back to you within 24 hours to schedule your live demo.</p>
              <br/>
              <p>Best regards,<br/>The InfoTraff Team<br/><a href="https://infotraff.org">infotraff.org</a></p>`,
          }),
        ]);
      } catch (e) {
        console.error('Email error:', e.message);
      }
    })(),
  ]);

  res.json({ success: true });
});

export default app;
