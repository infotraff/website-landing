import { getUncachableGoogleSheetClient } from '../lib/googleSheets.js';

async function setupSheet() {
  const sheets = await getUncachableGoogleSheetClient();

  const spreadsheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: 'InfoTraff — Demo Requests' },
      sheets: [
        {
          properties: { title: 'Demo Requests', sheetId: 0 },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    'Timestamp',
                    'Full Name',
                    'Company / Organization',
                    'Work Email',
                    'Phone Number',
                    'Industry / Use Case',
                    'Message',
                  ].map((v) => ({ userEnteredValue: { stringValue: v } })),
                },
              ],
            },
          ],
        },
      ],
    },
  });

  const id = spreadsheet.data.spreadsheetId!;
  const url = spreadsheet.data.spreadsheetUrl!;

  console.log(`\n✅ Spreadsheet created!`);
  console.log(`   ID:  ${id}`);
  console.log(`   URL: ${url}`);
  console.log(`\nSet this env var:\n   CONTACT_SPREADSHEET_ID=${id}\n`);
}

setupSheet().catch(console.error);
