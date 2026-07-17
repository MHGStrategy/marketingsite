import 'dotenv/config';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const TIME_ZONE = 'America/New_York';

function getEtParts(date) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    dateString: `${map.year}-${map.month}-${map.day}`,
  };
}

function getEtDateString(date) {
  return getEtParts(date).dateString;
}

function getYesterdayEtDateString() {
  const { year, month, day } = getEtParts(new Date());
  const anchorUtc = new Date(Date.UTC(year, month - 1, day, 12));
  const previousUtc = new Date(anchorUtc.getTime() - 24 * 60 * 60 * 1000);
  return getEtDateString(previousUtc);
}

function requireEnv(keys) {
  const missing = keys.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

function getRecipients() {
  const raw = process.env.LEAD_SUMMARY_RECIPIENTS || '';
  const recipients = raw.split(',').map((entry) => entry.trim()).filter(Boolean);
  if (!recipients.length) {
    throw new Error('LEAD_SUMMARY_RECIPIENTS must contain at least one email.');
  }
  return recipients;
}

async function fetchLeadRows() {
  requireEnv([
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_SERVICE_ACCOUNT_KEY',
    'GOOGLE_SHEETS_SPREADSHEET_ID',
  ]);

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = google.sheets({ version: 'v4', auth });
  const sheetName = process.env.GOOGLE_SHEETS_CONTACT_SHEET_NAME || 'Contact Submissions';
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = `${sheetName}!A:H`;

  const response = await client.spreadsheets.values.get({ spreadsheetId, range });
  return response.data.values || [];
}

function formatLeadSummary(leads, targetDate) {
  const header = [
    `Daily lead summary for ${targetDate} (ET)`,
    `Total leads: ${leads.length}`,
    '',
  ];

  const entries = leads.flatMap((lead, index) => {
    return [
      `#${index + 1}`,
      `Submitted: ${lead.submittedAt}`,
      `Company: ${lead.companyName || '—'}`,
      `Name: ${lead.primaryContactName || '—'}`,
      `Email: ${lead.email || '—'}`,
      `Phone: ${lead.phone || '—'}`,
      `Website: ${lead.website || '—'}`,
      `Industry: ${lead.industry || '—'}`,
      `Message: ${lead.message || '—'}`,
      '',
    ];
  });

  return [...header, ...entries].join('\n');
}

async function sendSummaryEmail({ subject, text, recipients }) {
  requireEnv(['SMTP_USER', 'SMTP_PASS']);

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: recipients.join(','),
    subject,
    text,
  });
}

async function main() {
  const targetDate = getYesterdayEtDateString();
  const rows = await fetchLeadRows();

  const leads = rows
    .map((row) => {
      const submittedAt = row?.[0];
      if (!submittedAt) {
        return null;
      }
      const parsedDate = new Date(submittedAt);
      if (Number.isNaN(parsedDate.getTime())) {
        return null;
      }
      if (getEtDateString(parsedDate) !== targetDate) {
        return null;
      }
      return {
        submittedAt,
        companyName: row?.[1] || '',
        primaryContactName: row?.[2] || '',
        email: row?.[3] || '',
        phone: row?.[4] || '',
        website: row?.[5] || '',
        industry: row?.[6] || '',
        message: row?.[7] || '',
      };
    })
    .filter(Boolean);

  if (!leads.length) {
    console.log(`No leads for ${targetDate}. No email sent.`);
    return;
  }

  const recipients = getRecipients();
  const subject = `Daily Lead Summary — ${targetDate} ET`;
  const text = formatLeadSummary(leads, targetDate);

  await sendSummaryEmail({ subject, text, recipients });
  console.log(`Sent lead summary to ${recipients.length} recipient(s).`);
}

main().catch((error) => {
  console.error('Daily lead summary failed', error);
  process.exitCode = 1;
});
