# GF Receipt Tracker - Setup Guide

## ✅ What's Been Built

A complete Next.js application for tracking gluten-free food costs with:

- **Authentication**: Simple password protection via middleware
- **Upload UI**: Mobile-first camera/file upload with preview
- **Claude Vision Analysis**: Receipt parsing and GF item identification
- **Google Sheets Integration**: Read baseline prices + append receipts
- **Review/Edit Screen**: Confirm and adjust Claude's analysis
- **Responsive Design**: Realeyes brand colors, mobile-optimized

## 📁 Project Structure

```
gf-tracker/
├── app/
│   ├── page.tsx                 ✅ Upload page
│   ├── login/page.tsx           ✅ Password gate
│   ├── review/page.tsx          ✅ Review/edit screen
│   ├── success/page.tsx         ✅ Confirmation page
│   ├── layout.tsx               ✅ Root layout with Lexend Deca
│   ├── globals.css              ✅ Tailwind + brand colors
│   └── api/
│       ├── auth/route.ts        ✅ Login endpoint
│       ├── analyze/route.ts     ✅ Claude Vision + pricing
│       └── sheets/route.ts      ✅ Google Sheets append
├── components/
│   ├── UploadForm.tsx           ✅ Camera/file upload
│   ├── ReviewScreen.tsx         ✅ Item list + totals
│   └── ItemEditor.tsx           ✅ Individual item editor
├── lib/
│   ├── types.ts                 ✅ TypeScript interfaces
│   ├── anthropic.ts             ✅ Claude Vision wrapper
│   ├── google-sheets.ts         ✅ Sheets API wrapper
│   └── prompts.ts               ✅ Receipt analysis prompt
├── middleware.ts                ✅ Password protection
└── .env.local                   ⏳ YOU NEED TO FILL THIS IN
```

## 🔧 Required Setup Steps

### 1. Fill in Environment Variables

**Edit `/Users/scott.jones/ai-workspace/gf-tracker/.env.local`:**

```env
# From Anthropic Console (https://console.anthropic.com/)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Already set (your Google Sheet)
GOOGLE_SHEETS_SPREADSHEET_ID=1MNzlZYcGzjXWZqUDbf-f3QY5Cx0sPoSWY5Ph7Xc--WY

# From your downloaded Google Cloud JSON key file
GOOGLE_SERVICE_ACCOUNT_EMAIL=gf-tracker-service@....iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Choose a password for the app
APP_PASSWORD=your_password_here

NODE_ENV=development
```

**⚠️ Important:**
- Keep the `\n` characters in the private key
- Wrap the private key in double quotes
- Don't commit `.env.local` to git (already in .gitignore)

### 2. Verify Google Sheet Setup

Make sure your Google Sheet has:

**Tab 1: "Receipts"** (Row 1 headers):
```
Date | Store | Item Name | Category | Total Price | Regular Equivalent Price | Deductible Amount | Is Inherently GF | Confidence | Receipt ID
```

**Tab 2: "Baseline Prices"** (Row 1 headers + sample data):
```
Category | Regular Equivalent Price | Notes
bread    | 3.50                    | Regular loaf
pasta    | 2.00                    | Standard pasta
crackers | 3.00                    | Regular crackers
cereal   | 4.50                    | Wheat-based cereal
snacks   | 3.50                    | Chips, pretzels
```

### 3. Start the Development Server

```bash
cd /Users/scott.jones/ai-workspace/gf-tracker
npm run dev
```

Open http://localhost:3000

### 4. Test the Flow

1. **Login**: Use the password you set in `APP_PASSWORD`
2. **Upload**: Take a photo or upload a receipt image
3. **Analyze**: Claude Vision identifies GF items
4. **Review**: Edit checkboxes if needed
5. **Submit**: Data saves to Google Sheets "Receipts" tab
6. **Success**: Confirmation page appears

## 🎨 Design Features

- **Realeyes Brand Colors**: Mint green (#27EABF), emerald green (#2DC0A2)
- **Lexend Deca Font**: Via Google Fonts
- **Mobile-First**: Touch-friendly, camera support
- **Responsive**: Works on phone, tablet, desktop

## 🔑 Key Implementation Details

### Receipt Analysis Flow

1. User uploads image → converts to base64
2. `/api/analyze` sends to Claude Vision
3. Claude returns structured JSON with GF items
4. Server fetches baseline prices from Google Sheets
5. Server calculates deductible amounts
6. Returns enriched data to client

### Deductible Calculation

```typescript
if (item.isInherentlyGF) {
  deductibleAmount = 0 // Produce, plain meat, etc.
} else {
  deductibleAmount = max(0, price - regularEquivalentPrice)
}
```

### Error Handling

- Claude API failures → user-friendly error message
- Google Sheets API → retry with exponential backoff (3 attempts)
- Invalid receipt images → clear error, ask to retake

## 📊 Cost Estimates

- **Claude Vision**: ~$0.009 per receipt
- **Google Sheets API**: Free (within quota)
- **Vercel Hosting**: Free tier sufficient

## 🚀 Deployment to Vercel

When ready to deploy:

```bash
# Push to GitHub
git add .
git commit -m "Initial commit: GF Receipt Tracker"
git remote add origin https://github.com/YOUR_USERNAME/gf-tracker.git
git push -u origin main

# Deploy to Vercel
# 1. Go to vercel.com
# 2. Import GitHub repo
# 3. Add environment variables (same as .env.local)
# 4. Deploy
```

## 🐛 Troubleshooting

### "Invalid password" on login
- Check `APP_PASSWORD` in `.env.local`
- Restart dev server after changing env vars

### "Failed to analyze receipt"
- Check `ANTHROPIC_API_KEY` is valid
- Check image is clear and receipt is visible
- Check Claude API quota/billing

### "Failed to save to Google Sheets"
- Verify service account email is correct
- Check private key has `\n` characters preserved
- Confirm Google Sheet is shared with service account (Editor access)
- Check spreadsheet ID matches

### "No baseline price found"
- Add missing categories to "Baseline Prices" tab
- Category names must match (case-insensitive)

## 📝 Next Steps

1. Fill in `.env.local` with your credentials
2. Run `npm run dev`
3. Test with a sample receipt
4. Add more baseline prices as needed
5. Deploy to Vercel when ready

## 🎯 Future Enhancements (Optional)

- Receipt history view
- Export to CSV/PDF
- Analytics dashboard
- Multi-user support
- Bulk upload

---

**Ready to test!** Fill in your `.env.local` and run `npm run dev`.
