import { google, sheets_v4 } from 'googleapis';

export type ContactPayload = {
  companyName: string;
  primaryContactName: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  message?: string;
  formSource?: string; // Identifies which form was used: "contact", "mhgmedia", "mhgmedia#contact"
};

type SheetsClient = {
  client: sheets_v4.Sheets;
  sheetName: string;
  spreadsheetId: string;
};

let cachedClient: SheetsClient | null = null;

const requiredEnvVars = ['GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_SERVICE_ACCOUNT_KEY', 'GOOGLE_SHEETS_SPREADSHEET_ID'] as const;

function buildSheetsClient(): SheetsClient {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required Google Sheets env vars: ${missing.join(', ')}`);
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string;
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string).replace(/\\n/g, '\n');
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID as string;
  const sheetName = process.env.GOOGLE_SHEETS_CONTACT_SHEET_NAME || 'Contact Submissions';

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = google.sheets({ version: 'v4', auth });

  return { client, sheetName, spreadsheetId };
}

function getSheetsClient() {
  if (!cachedClient) {
    cachedClient = buildSheetsClient();
  }
  return cachedClient;
}

export async function appendContactRow(payload: ContactPayload) {
  const { client, sheetName, spreadsheetId } = getSheetsClient();
  const submittedAt = new Date().toISOString();

  const values = [
    [
      submittedAt,
      payload.companyName?.trim() || '',
      payload.primaryContactName?.trim() || '',
      payload.email?.trim() || '',
      payload.phone?.trim() || '',
      payload.website?.trim() || '',
      payload.industry?.trim() || '',
      payload.message?.trim() || '',
    ],
  ];

  await client.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:H`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}

export async function appendContactRowToSheet(payload: ContactPayload, targetSheetName: string) {
  const { client, spreadsheetId } = getSheetsClient();
  const submittedAt = new Date().toISOString();

  const values = [
    [
      submittedAt,
      payload.formSource || 'unknown', // Form source column (second column)
      payload.companyName?.trim() || '',
      payload.primaryContactName?.trim() || '',
      payload.email?.trim() || '',
      payload.phone?.trim() || '',
      payload.website?.trim() || '',
      payload.industry?.trim() || '',
      payload.message?.trim() || '',
    ],
  ];

  await client.spreadsheets.values.append({
    spreadsheetId,
    range: `${targetSheetName}!A:I`, // Updated to include form source column
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}
