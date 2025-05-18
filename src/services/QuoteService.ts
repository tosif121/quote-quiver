import { Quote, QuoteCategory } from '../types/quote';
import { quotes } from '../data/quotes';

export class QuoteService {
  static getRandomQuote(category: QuoteCategory = 'all'): Quote {
    // Filter quotes by category if specified
    const filteredQuotes = category === 'all' 
      ? quotes 
      : quotes.filter(quote => quote.category === category);
    
    // Get a random quote from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
  }

  static getCategories(): QuoteCategory[] {
    // Get unique categories from quotes
    const categories = ['all', ...new Set(quotes.map(quote => quote.category))];
    return categories.filter(Boolean) as QuoteCategory[];
  }
}