# GF Receipt Tracker - Quick Guide

## What This Does

Takes photos of grocery receipts and automatically:
- Identifies gluten-free items
- Calculates tax deductions (GF premium over regular prices)
- Saves everything to our Google Sheet for tax time

---

## How to Access

### On Your Phone (iPhone) or Any Device

**Website:** https://gf-tracker.vercel.app

**Requirements:**
- ✅ Internet connection (works anywhere - WiFi or cellular!)
- ✅ That's it! No need for Scott's Mac to be on

**Password:** [Scott will tell you]

**Bookmark it!** Save this link to your iPhone home screen for easy access.

---

## Step-by-Step Usage

### 1. Open the Website
- Open **Safari** (or any browser) on your phone
- Go to: **https://gf-tracker.vercel.app**
- Enter the password
- **Tip:** Bookmark this page or add to home screen!

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
- Check your internet connection (WiFi or cellular)
- Try refreshing the page
- If the site is down, text Scott

### "Analysis failed"
- The receipt photo might be too blurry
- Try taking a clearer photo
- Make sure the whole receipt is visible

### "Failed to save"
- This usually means a Google Sheets connection issue
- Try again in a moment
- If it keeps failing, text Scott

---

## 📊 Managing Baseline Prices (IMPORTANT!)

The app calculates tax deductions by comparing **GF prices** to **regular prices**. You should update these prices regularly to get accurate deductions!

**📝 Google Sheet:** [Open GF Receipt Tracker Sheet](https://docs.google.com/spreadsheets/d/1MNzlZYcGzjXWZqUDbf-f3QY5Cx0sPoSWY5Ph7Xc--WY/edit)

---

### ✏️ How to Update Existing Prices

**When to do this:** Whenever regular prices change at your grocery store

1. Open the [Google Sheet](https://docs.google.com/spreadsheets/d/1MNzlZYcGzjXWZqUDbf-f3QY5Cx0sPoSWY5Ph7Xc--WY/edit)
2. Click the **"Baseline Prices"** tab (bottom of screen)
3. Find the category you want to update:
   - Example: "bread" is currently $3.50
4. Click on the price cell and type the new price
   - Example: Change to $4.00 if regular bread now costs more
5. Changes save automatically - you're done! ✅

**💡 Tip:** Check prices every few months or when you notice big changes at your store.

---

### ➕ How to Add New Food Categories

**When to do this:** When you buy a GF item that isn't in the current list

1. Open the [Google Sheet](https://docs.google.com/spreadsheets/d/1MNzlZYcGzjXWZqUDbf-f3QY5Cx0sPoSWY5Ph7Xc--WY/edit)
2. Go to the **"Baseline Prices"** tab
3. Scroll to the **bottom** and add a new row:

| Column | What to Enter | Example |
|--------|--------------|---------|
| **Category** | Name it (lowercase, use hyphens for spaces) | `pizza-crust` |
| **Regular Equivalent Price** | What the regular version costs | `4.50` |
| **Notes** | (Optional) Reminder for yourself | `Frozen pizza crust at Lowe's Foods` |

4. The app will **automatically** use this category for future receipts!

**Real Examples:**
```
Category          | Regular Equivalent Price | Notes
pizza-crust       | 4.50                    | Frozen pizza crust
gluten-free-beer  | 8.00                    | 6-pack regular beer
chicken-nuggets   | 5.00                    | Frozen breaded nuggets
```

---

### 📋 Current Categories Already Set Up

The app already knows these categories:
- **bread** - Loaves, rolls, buns
- **pasta** - Any pasta or noodles
- **crackers** - Crackers, rice cakes
- **cereal** - Breakfast cereals
- **snacks** - Chips, pretzels, snack bars
- **baking-mix** - Pancake mix, muffin mix, flour
- **tortillas** - Flour or corn tortillas
- **pizza** - Frozen pizzas
- **cookies** - Cookies, biscuits
- **other** - Everything else (mostly inherently GF items)

**Add more categories anytime you need them!**

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
