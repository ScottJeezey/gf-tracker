# GF Receipt Tracker - Quick Guide

## What This Does

Takes photos of grocery receipts and automatically:
- Identifies gluten-free items
- Calculates tax deductions (GF premium over regular prices)
- Saves everything to our Google Sheet for tax time

---

## How to Access

### On Your Phone (iPhone)

**Website:** http://192.168.86.29:3000

**Requirements:**
- ✅ Your phone must be on the **"networko segundo" WiFi** (same as Scott's Mac)
- ✅ Scott's Mac must be **on and connected** to WiFi
- ✅ The app must be **running** on Scott's Mac (he'll make sure it's on)

**Password:** [Scott will tell you]

---

## Step-by-Step Usage

### 1. Open the Website
- Open **Safari** on your iPhone
- Go to: **http://192.168.86.29:3000**
- Enter the password

### 2. Upload a Receipt
- Tap the **upload area**
- Choose one of:
  - **Take Photo** (use camera right now)
  - **Photo Library** (choose existing photo)
- **Note:** Only image files (JPG, PNG, WEBP) are supported

### 3. Review the Results
- Wait ~5-10 seconds while Claude analyzes the receipt
- You'll see a list of all items with:
  - ✅ **Green checkmark** = Gluten-free
  - **Deductible amount** shown for GF items
- **Edit if needed:**
  - Uncheck items that aren't actually GF
  - Check items Claude missed

### 4. Save to Google Sheet
- Review the **Total Deductible Amount** at the bottom
- Tap **"Save to Google Sheets"**
- Wait for confirmation
- Done! ✅

### 5. Upload Another Receipt
- Tap **"Upload Another Receipt"**
- Repeat the process

---

## Tips & Tricks

### Best Practices
- **Clear photos work best** - make sure the receipt is flat and well-lit
- **Upload soon after shopping** - receipts fade over time
- **Review before saving** - Claude is smart but not perfect, always double-check

### What Gets Deducted?
✅ **YES - Deductible:**
- Gluten-free bread, pasta, crackers, cookies, etc. (the **premium** over regular price)

❌ **NO - Not Deductible:**
- Items that are naturally gluten-free (produce, plain meat, rice, milk)
- Regular (non-GF) items

### The app automatically knows which is which!

---

## Common Issues

### "Cannot connect to server"
- Make sure you're on **"networko segundo" WiFi**
- Check that Scott's Mac is **on and awake**
- Try refreshing the page

### "Analysis failed"
- The receipt photo might be too blurry
- Try taking a clearer photo
- Make sure the whole receipt is visible

### "Failed to save"
- This usually means a Google Sheets connection issue
- Try again in a moment
- If it keeps failing, text Scott

---

## Updating Baseline Prices

The app calculates deductions by comparing GF prices to regular prices. You can update these anytime!

**Google Sheet:** [GF Receipt Tracker](https://docs.google.com/spreadsheets/d/1MNzlZYcGzjXWZqUDbf-f3QY5Cx0sPoSWY5Ph7Xc--WY/edit)

### To Update Prices:
1. Open the Google Sheet (link above)
2. Go to the **"Baseline Prices"** tab
3. Find the category you want to update (e.g., "bread", "crackers")
4. Update the **"Regular Equivalent Price"** column
5. Save (automatic) - done! ✅

### To Add New Categories:
1. Go to the **"Baseline Prices"** tab
2. Add a new row at the bottom:
   - **Category:** Name it (lowercase, use hyphens for spaces: "pizza-crust")
   - **Regular Equivalent Price:** Average price of regular version
   - **Notes:** (optional) Reminder of what this is
3. The app will automatically use this for future receipts!

**Example:**
```
Category          | Regular Equivalent Price | Notes
pizza-crust       | 4.50                    | Regular frozen pizza crust
gluten-free-beer  | 8.00                    | 6-pack regular beer
```

### Current Categories:
The app recognizes these categories automatically:
- bread, pasta, crackers, cereal, snacks
- baking-mix, tortillas, pizza, cookies
- other (for inherently GF items like produce, meat, milk)

---

## Where's the Data?

All receipts are saved to our shared Google Sheet:
**[GF Receipt Tracker Sheet](https://docs.google.com/spreadsheets/d/1MNzlZYcGzjXWZqUDbf-f3QY5Cx0sPoSWY5Ph7Xc--WY/edit)**

**Two Tabs:**
- **"Receipts"** - All scanned items with deductions
- **"Baseline Prices"** - Reference prices (you can edit these!)

You can:
- View all past receipts
- See total deductibles by month
- Export for tax filing
- Update baseline prices anytime

---

## Questions?

Text Scott! 📱

---

**Last Updated:** March 2026
