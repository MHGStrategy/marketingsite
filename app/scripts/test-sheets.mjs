import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config({ path: '.env.local' });

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

async function main() {
  const clientEmail = requireEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  const privateKey = requireEnv('GOOGLE_SERVICE_ACCOUNT_KEY').replace(/\\n/g, '\n');
  const spreadsheetId = requireEnv('GOOGLE_SHEETS_SPREADSHEET_ID');
  const sheetName = process.env.GOOGLE_SHEETS_CONTACT_SHEET_NAME || 'Contact Submissions';

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const values = [
    [
      new Date().toISOString(),
      'Test Company',
      'Test User',
      'test@example.com',
      '123-456-7890',
      'https://example.com',
      'Test Industry',
      'Test message (connection check)',
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:H`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });

  console.log('✅ Test row appended. Check your sheet for the new entry.');
}

main().catch((error) => {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
});
