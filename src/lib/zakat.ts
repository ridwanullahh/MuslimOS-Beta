/**
 * Zakat al-Mal calculator.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Zakat is 2.5% of qualifying wealth above the nisab threshold.
 * Nisab may be computed using gold (85g) or silver (595g) standard.
 */
export interface ZakatInput {
  cash: number;             // Cash + bank balances (in user's currency)
  goldGrams: number;        // Gold held (in grams)
  silverGrams: number;      // Silver held (in grams)
  investments: number;      // Stocks, mutual funds, etc.
  receivables: number;      // Money owed to you (likely to be repaid)
  inventory: number;        // Trade inventory / business stock
  liabilities: number;      // Outstanding debts due within the year
}

export interface ZakatResult {
  goldValue: number;
  silverValue: number;
  totalAssets: number;
  totalLiabilities: number;
  netWealth: number;
  nisabGold: number;        // threshold in user currency (using gold)
  nisabSilver: number;      // threshold in user currency (using silver)
  isAboveNisab: boolean;    // true if net wealth >= silver nisab (lower threshold — preferred)
  zakatDue: number;
}

export const ZAKAT_RATE = 0.025;            // 2.5%
export const NISAB_GOLD_GRAMS = 85;
export const NISAB_SILVER_GRAMS = 595;

// Reference prices (USD per gram) — used as default when user doesn't override.
// In production these should be fetched from a live API; we provide conservative static defaults.
export const GOLD_PRICE_PER_GRAM_USD = 65;     // ~$2000/oz in 2024
export const SILVER_PRICE_PER_GRAM_USD = 0.78; // ~$24/oz in 2024

export function calculateZakat(input: ZakatInput, goldPrice: number = GOLD_PRICE_PER_GRAM_USD, silverPrice: number = SILVER_PRICE_PER_GRAM_USD): ZakatResult {
  const goldValue = input.goldGrams * goldPrice;
  const silverValue = input.silverGrams * silverPrice;
  const totalAssets = input.cash + goldValue + silverValue + input.investments + input.receivables + input.inventory;
  const totalLiabilities = Math.max(0, input.liabilities);
  const netWealth = Math.max(0, totalAssets - totalLiabilities);
  const nisabGold = NISAB_GOLD_GRAMS * goldPrice;
  const nisabSilver = NISAB_SILVER_GRAMS * silverPrice;
  // Use the silver nisab (lower threshold — favored by many scholars for the benefit of the poor)
  const isAboveNisab = netWealth >= nisabSilver;
  const zakatDue = isAboveNisab ? Math.round(netWealth * ZAKAT_RATE * 100) / 100 : 0;
  return {
    goldValue, silverValue, totalAssets, totalLiabilities, netWealth,
    nisabGold, nisabSilver, isAboveNisab, zakatDue,
  };
}

/** Format currency — generic, no symbol since user currency is unknown. */
export function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
