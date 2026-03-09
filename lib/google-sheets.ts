import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

// Initialize Google Sheets client
function getGoogleSheetsClient() {
  // Parse private key - handle various formats
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!;

  // Remove quotes if wrapped
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  // Replace literal \n with actual newlines
  privateKey = privateKey.replace(/\\n/g, '\n');

  // Log first/last few chars for debugging (without exposing full key)
  console.log('Private key format check:', {
    starts: privateKey.substring(0, 30),
    ends: privateKey.substring(privateKey.length - 30),
    hasNewlines: privateKey.includes('\n'),
    length: privateKey.length,
  });

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Retry helper with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2 ** i * 1000));
    }
  }
  throw new Error('Max retries exceeded');
}

// Fetch baseline prices from "Baseline Prices" tab
export async function getBaselinePrices(): Promise<Map<string, number>> {
  const sheets = getGoogleSheetsClient();

  try {
    return await retryWithBackoff(async () => {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Baseline Prices!A2:B', // Skip header row
      });

      const rows = response.data.values || [];
      const priceMap = new Map<string, number>();

      rows.forEach((row) => {
        if (row[0] && row[1]) {
          const category = row[0].toLowerCase().trim();
          const price = parseFloat(row[1]);
          if (!isNaN(price)) {
            priceMap.set(category, price);
          }
        }
      });

      return priceMap;
    });
  } catch (error) {
    console.error('Error fetching baseline prices:', error);
    return new Map();
  }
}

// Append receipt items to "Receipts" tab
export async function appendReceiptToSheet(items: any[]): Promise<boolean> {
  const sheets = getGoogleSheetsClient();

  try {
    return await retryWithBackoff(async () => {
      const values = items.map((item) => [
        item.date,
        item.store,
        item.itemName,
        item.category,
        item.totalPrice,
        item.regularEquivalentPrice,
        item.deductibleAmount,
        item.isInherentlyGF,
        item.confidence,
        item.receiptId,
      ]);

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Receipts!A:J',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });

      return true;
    });
  } catch (error) {
    console.error('Error appending to sheet:', error);
    return false;
  }
}
