export interface Quote {
  text: string;
  author: string;
  category?: string;
}

export type QuoteCategory = 'inspiration' | 'motivation' | 'success' | 'life' | 'wisdom' | 'Art' | "funny" | 'love' | 'friendship' | 'happiness' | 'knowledge' | 'Business'| 'Education'| 'Techonology'| 'History'| 'all';