export interface ReceiptItem {
  name: string;
  price: number;
  isGF: boolean;
  category: string; // "bread", "pasta", "crackers", "cereal", "snacks", etc.
  isInherentlyGF: boolean; // true for rice, produce, plain meat
  regularEquivalentPrice: number;
  deductibleAmount: number; // price - regularEquivalentPrice (0 if inherentlyGF)
  confidence: "high" | "medium" | "low";
}

export interface AnalyzedReceipt {
  store: string;
  date: string; // YYYY-MM-DD format
  items: ReceiptItem[];
  receiptId?: string; // Generated UUID
}

export interface BaselinePrice {
  category: string;
  regularEquivalentPrice: number;
  notes?: string;
}

export interface SheetsRow {
  date: string;
  store: string;
  itemName: string;
  category: string;
  totalPrice: number;
  regularEquivalentPrice: number;
  deductibleAmount: number;
  isInherentlyGF: boolean;
  confidence: string;
  receiptId: string;
}

export interface ClaudeVisionResponse {
  store: string;
  date: string;
  items: Omit<ReceiptItem, 'regularEquivalentPrice' | 'deductibleAmount'>[];
}
